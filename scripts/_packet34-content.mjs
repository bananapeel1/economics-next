/**
 * PACKET 34 — causes-effects-globalisation, Learn Mode content and Notes.
 *
 * IAL Economics Unit 4 (WEC14), topic 4.3.1, `audit/raw/econ_spec.txt:1586-1625`. Three sub-topics,
 * 22 substantive leaves, FIVE blocks and twenty-six subsections, one idea each, in the
 * specification's own order: what globalisation looks like, what caused it, FDI by TNCs, the
 * possible benefits, the possible costs.
 *
 * FIVE BLOCKS AND NOT THREE, AND THE THIRD OF THE OLD THREE IS NOT REPLACED. The live section is
 * "What is Globalisation?", "Multinational Corporations" and "Trade Blocs" — six subsections and
 * three steps for a topic that carries a 20-mark essay. Trade Blocs is 4.3.2 and leaves; sub-topic 2
 * splits into causes and FDI because 2a and 2b are different questions; sub-topic 3 splits into
 * benefits and costs because the specification lists them as 3a and 3b. Specification order holds
 * end to end, which is how `structure-03` and `structure-04` are fixed at the root rather than
 * patched. Five blocks is packet 31's shape: `2 + 5 = 7` against `FREE_QUIZ_MAX` 10, with room for
 * the three-question pre-test.
 *
 * ════ THE WORD IS TNC, EVERYWHERE, AND THAT IS A MEASUREMENT ════
 *
 * `TNC` is 7 hits in `econ_spec.txt` and `MNC` is 0; the Business specification is the other way
 * round. The live section is titled "Multinational Corporations" and its quiz asks about TNCs, which
 * `topFix-03` correctly reports as a mismatch — and then asks for the two to be introduced as
 * equivalents. This section uses the Economics specification's own word and no other.
 *
 * ════ NO FLOW BODY IN THIS SECTION ════
 *
 * `lib/learn-steps.js:10` renders a subsection's recall BELOW its teaching on the same step, so a
 * reorder built from a flow box on that step has its answer printed above it. Packet 26's conclusion
 * is that paraphrasing makes it easier to copy rather than harder, because the words change and the
 * order does not. So every reorder here is sourced from an extras chain, which lives in another tab.
 *
 * ════ EVERY RECALL APPLIES THE IDEA TO FIGURES OR TO A NEW CASE ════
 *
 * Packet 29's Verify B found 24 of 43 steps carrying a recall answerable by scrolling up, almost all
 * of them fill-ins whose template was the key idea minus a word. The arithmetic spine is what makes
 * that avoidable here: a fill-in asking what Tamira's tax take becomes after a licence fee cannot be
 * answered by rereading the paragraph above it.
 */
import {
  subId, SECTION, hash8, money, bn, mn, qty, pct, round2,
  TAMIRA, DEVICE, NORVELL, CHARACTERISTICS, CAUSES, BENEFITS, COSTS,
} from './_packet34-util.mjs';

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

const T = TAMIRA, D = DEVICE, N = NORVELL;

export const B1 = 'What Globalisation Looks Like';
export const B2 = 'What Caused It';
export const B3 = 'FDI by TNCs';
export const B4 = 'The Possible Benefits';
export const B5 = 'The Possible Costs';

/* ══ Block 1 — Characteristics of globalisation (4.3.1 · 1) ═══════════════ */

const whatGlobalisationIs = (() => {
  const sid = subId('what-globalisation-is');
  return {
    id: sid,
    title: 'What Globalisation Is',
    keyIdea: 'Globalisation is the growing integration of national economies into one world economy. The specification asks you to measure it, name its causes and weigh its effects.',
    body: [
      { type: 'paragraph', text: `Economies become integrated when what happens in one starts to depend on what happens in the others — through the goods they trade, the firms that produce in both, and the people who move between them. That is a **process**, not an event: it has been going on for centuries and it has run faster in the last fifty years than before.` },
      { type: 'paragraph', text: `The specification is precise about what it wants. Topic 4.3.1 has three parts and they are three different questions: what globalisation **looks like**, what **caused** it, and what its **effects** are. An answer that describes the first when the question asked the second has not been unlucky; it has answered a different question.` },
      { type: 'paragraph', text: `This chapter is the first of the three. It is also the shortest, because a characteristic is something you can point at and count — and counting is what separates an economic answer about globalisation from a conversational one.` },
      { type: 'paragraph', text: `Throughout this section the same small open economy carries the figures: **${T.name}**, whose output is ${bn(T.last.gdp)} and whose trade is ${bn(T.last.trade)}. It is not a real country, so nothing about it has to be remembered — everything about it can be worked out.` },
    ],
    realExample: { emoji: '🌍', text: `A device sold in one country, assembled in a second from components made in a third, by a firm registered in a fourth. Four economies are involved in one purchase, and each of them records part of it.` },
    misconception: `Students write that globalisation means "the world becoming more connected". That is true, and it is not yet economics: it can be written without knowing any. The specification's three characteristics are countable — trade against output, firms and their investment, and people.`,
    examMatters: `Appendix 6 defines Define as requiring knowledge and understanding only — the meaning of a term, concept or phrase — for 2 marks. A definition of globalisation needs the integration AND what is being integrated; "countries trading more" is only half of it.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each observation by whether it is evidence of globalisation as this topic measures it, or something else:`,
      groups: [
        { name: 'Evidence', items: [`A country's imports and exports grow faster than its output for a decade`, 'A firm opens a factory in a country it used to export to', 'A quarter of the workers in one industry were born abroad'] },
        { name: 'Not evidence', items: ['A country\'s output grows and its trade grows at the same rate', 'A firm sells more at home than it did last year'] },
      ],
      why: [
        'Each one is a characteristic the specification names: trade rising against output, firms and their investment crossing borders, and people moving between countries.',
        'Both describe an economy getting bigger without becoming more integrated with anywhere else — the proportions are unchanged, and it is the proportions that this topic measures.',
      ],
    }),
  };
})();

const tradeProportionOfGdp = (() => {
  const sid = subId('trade-as-a-proportion-of-gdp');
  return {
    id: sid,
    title: 'Trade as a Proportion of GDP',
    keyIdea: `The first characteristic is a ratio, not a total. ${T.name}'s trade has risen from ${pct(T.first.openness)} of its output to ${pct(T.last.openness)}, because trade compounds at ${pct(T.tradePct)} a year and output at ${pct(T.gdpPct)}.`,
    body: [
      { type: 'paragraph', text: `Almost every country trades more than it did fifty years ago, and almost every country also produces more. So the total is the wrong number: it would rise even if nothing about the economy had become more integrated. The characteristic the specification names is trade **as a proportion of GDP**.` },
      { type: 'paragraph', text: `Work it out for ${T.name}. Fifty years ago its output was ${bn(T.first.gdp)} and its trade ${bn(T.first.trade)}, so trade was ${bn(T.first.trade)} ÷ ${bn(T.first.gdp)} × 100 = ${pct(T.first.openness)} of output. Today output is ${bn(T.last.gdp)} and trade is ${bn(T.last.trade)}: ${pct(T.last.openness)}.` },
      { type: 'paragraph', text: `Nothing in that calculation is a judgement. Output is ${qty(T.gdpMultiple)} times what it was and trade is ${qty(T.tradeMultiple)} times, and the ratio rises for that reason alone. Two compound growth rates two percentage points apart do the whole of it.` },
      { type: 'paragraph', text: `The ratio can also fall, and it does — in a year when world demand collapses, trade falls faster than output. A characteristic is a **trend**, and a trend is not a promise about next year.` },
    ],
    realExample: { emoji: '📈', text: `A small coastal economy that imports its fuel and exports its electronics can easily trade more than its whole annual output, because both halves of the trade are counted and neither is subtracted.` },
    misconception: `Students say a ratio above 100% is impossible because a country cannot trade more than it produces. It can: exports and imports are added together, and imports are not part of output at all. The ratio measures openness, not a share of anything.`,
    examMatters: `Appendix 6 defines Calculate as assessing quantitative skills through a calculation involving several stages based on given data, and advises showing workings. Two stages here — the sum of exports and imports, then the division — so both belong on the page.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Another economy exports ${bn(30)} and imports ${bn(26)} in a year when its GDP is ${bn(80)}:`,
      template: [
        `Its openness this year is ___`,
        `Next year trade grows a tenth and output a twentieth, so the ratio ___`,
        `Had both grown a tenth, the ratio would have ___`,
      ],
      answers: [pct(70), 'rises', 'held'],
      hints: ['both flows over output, as a percentage', 'compare the two growth rates', 'what happens when the two rates are equal'],
      distractors: [pct(37.5), 'falls', 'doubled'],
    }),
  };
})();

const transnationalCompanies = (() => {
  const sid = subId('transnational-companies');
  return {
    id: sid,
    title: 'Transnational Companies',
    keyIdea: 'A transnational company produces in more than one country. Exporting from one country to another does not make a firm transnational; owning the production in both does.',
    body: [
      { type: 'paragraph', text: `The specification's second characteristic is the "increase in importance of transnational companies (TNCs) and foreign direct investment (FDI)". Those are two things and this subsection is the first of them.` },
      { type: 'paragraph', text: `A **transnational company** owns and runs production in several countries. The test is where the production is, not where the customers are: a firm that makes everything in one country and sells worldwide is an exporter, however large. A firm with a plant in three countries is transnational even if each plant sells only locally.` },
      { type: 'paragraph', text: `Why it matters for this topic is that a TNC's internal decisions become international trade. When **${N.name}** ships components from its ${T.name} plant to its assembly plant elsewhere, both countries record trade — and no customer has bought anything yet. A large share of world trade is firms trading with themselves.` },
      { type: 'paragraph', text: `That is also what makes them significant enough for the specification to name them twice: once as a characteristic here, and again as a cause, because a firm that splits its production across borders creates trade that would not otherwise exist.` },
    ],
    realExample: { emoji: '🏭', text: `An electronics firm making components in one country, assembling them in a second and running its design office in a third is transnational three times over, and every movement between the three is recorded as trade.` },
    misconception: `Students call any big firm with foreign customers a TNC. Size and exports are not the test. Production in more than one country is, and a small firm with two small plants in two countries passes it while a huge exporter with one plant does not.`,
    examMatters: `Appendix 6 defines Explain as requiring knowledge, understanding and application when explaining a term or characteristic, and a two-stage chain of reasoning when explaining a reason or impact. "TNCs have grown" is neither until it reaches what that growth did.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Decide for each firm whether it is transnational or not, by asking where the production is:`,
      groups: [
        { name: 'Transnational', items: ['Runs a bakery in one country and a second bakery over the border', 'Weaves cloth in one economy and sews it into shirts in another'] },
        { name: 'Not transnational', items: ['One factory at home and buyers in forty countries', 'Imports its cotton and weaves all of it at home', 'Owned by shareholders in a dozen countries'] },
      ],
      why: [
        'Production is owned and run in more than one country, which is the whole of the test, and the size of the firm does not enter it.',
        'Each of these crosses a border with something — goods out, goods in, or ownership — while all the production stays in one place.',
      ],
    }),
  };
})();

const foreignDirectInvestment = (() => {
  const sid = subId('foreign-direct-investment');
  return {
    id: sid,
    title: 'Foreign Direct Investment',
    keyIdea: 'FDI is investment that buys productive assets in another country and the control of them. Money crossing a border is not enough: the word doing the work is direct.',
    body: [
      { type: 'paragraph', text: `**Foreign direct investment** is spending by a firm on productive assets in another country — a plant, machinery, land, or enough of an existing company to run it. ${N.name}'s ${mn(N.capital / 1_000_000)} plant in ${T.name} is FDI.` },
      { type: 'paragraph', text: `The distinction that carries marks is **control**. A saver in one country who buys a few shares in a firm in another has sent money abroad and bought no say in what the firm does; the firm's managers decide, as they did before. That is why the specification's word is *direct*: the investor directs the asset.` },
      { type: 'paragraph', text: `Control is also what makes FDI hard to reverse. Shares can be sold in an afternoon; a plant cannot. So a country receiving FDI receives something that is expected to stay — and a firm making it is making a bet on that country for years, which is why the reasons for FDI are worth a sub-topic of their own.` },
      { type: 'paragraph', text: `Two forms are common: building something new, or buying a firm that already exists. Both are FDI, because both end with the investor running productive assets abroad. What differs is whether the country gains new capacity or a new owner for old capacity.` },
    ],
    realExample: { emoji: '🏗️', text: `A firm that builds a plant abroad and a firm that buys the local competitor have both made foreign direct investment. Only the first has added a factory to the country; the second has changed who owns one.` },
    misconception: `Students treat any foreign money as FDI, including loans and small shareholdings. Neither buys control, so neither is direct investment. Ask who decides what the asset does next: if the answer is still somebody local, no direct investment has taken place.`,
    examMatters: `Appendix 6 defines Define as giving the meaning of a term for 2 marks, and this term has two parts to give: investment in productive assets in another economy, and a controlling interest in them.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each transaction to whether it is foreign direct investment, and to the reason:`,
      pairs: [
        { left: `A firm spends ${mn(N.capital / 1_000_000)} building a plant abroad`, right: 'FDI — productive assets abroad, and it runs them' },
        { left: 'A firm buys the whole of a company in another country', right: 'FDI — it has bought control of assets already there' },
        { left: 'A saver buys a small parcel of shares in a foreign firm', right: 'Not FDI — money crossed a border, control did not' },
        { left: 'A bank lends to a firm in another country', right: 'Not FDI — a loan is repaid, not directed' },
      ],
      why: [
        'New productive capacity abroad, owned and directed by the investor: the clearest case of the term.',
        'The capacity already existed, but the investor now decides what it does, and control is the test rather than novelty.',
        'The shareholding is too small to direct anything, so the managers who decided before still decide.',
        'A lender is owed money and has no say in what the borrower produces, so nothing has been directed.',
      ],
    }),
  };
})();

const migration = (() => {
  const sid = subId('migration');
  return {
    id: sid,
    title: 'Migration',
    keyIdea: 'The third characteristic is people. More of them cross borders to work than did fifty years ago, and the movement follows the same forces as the goods and the money.',
    body: [
      { type: 'paragraph', text: `The specification's third characteristic is the "increase in migration". Goods move to where they are wanted, capital moves to where it earns most, and so does labour — the three are the same phenomenon in three markets.` },
      { type: 'paragraph', text: `What drives it is a gap. Where wages for the same work differ between two countries by more than the cost and difficulty of moving, some people move; where the gap closes or the barriers rise, fewer do. That is why migration rose alongside cheaper transport and open borders, which are two of this topic's causes.` },
      { type: 'paragraph', text: `Migration also feeds the other two characteristics. A ${T.name} plant that cannot fill ${qty(N.jobs)} skilled posts locally can fill some of them from abroad, and a firm choosing where to invest counts the workers it can reach, not the ones inside one border.` },
      { type: 'paragraph', text: `Keep the scope tight. Here migration is a **characteristic** — a sign that economies are more integrated. What migration does to inequality within and between countries, and to a developing economy's growth, are questions for the topics that own them.` },
    ],
    realExample: { emoji: '✈️', text: `A construction boom in one economy draws workers from several others, and the flow reverses within a year of the boom ending. The movement followed the wage gap, in both directions.` },
    misconception: `Students write that migration is a cause of globalisation. The specification lists it under characteristics, not causes, and the causes it does list — liberalisation, blocs, political change, transport and communications, TNCs — are what made all three characteristics possible, migration included.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning, focused on depth rather than breadth, and says it does not include evaluation. A chain on migration must reach an economic effect; whether that effect is good is a different command word.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each statement by whether it belongs to this topic's characteristics or to a different topic:`,
      groups: [
        { name: 'A characteristic here', items: ['More people work outside the country they were born in than fifty years ago', 'Workers move towards the largest wage gaps, and stop when they close'] },
        { name: 'Another topic', items: ['Migration widens the gap between the richest and poorest tenth of a country', 'Losing trained workers slows a developing economy\'s growth'] },
      ],
      why: [
        'Both describe the movement itself, which is what the specification lists as the third characteristic of globalisation.',
        'Both are about what migration DOES to inequality or to development, and those are the questions the inequality and development topics ask.',
      ],
    }),
  };
})();

/* ══ Block 2 — Causes of globalisation (4.3.1 · 2a) ═══════════════════════ */

const tradeLiberalisation = (() => {
  const sid = subId('trade-liberalisation');
  return {
    id: sid,
    title: 'Trade Liberalisation',
    keyIdea: `Trade liberalisation is the reduction or removal of barriers to trade between countries. Remove the barrier on ${T.name}'s device and its price falls from ${money(D.homePrice)} to ${money(D.openPrice)}.`,
    body: [
      { type: 'paragraph', text: `The specification's first cause is **trade liberalisation**: barriers between countries coming down. A barrier is anything that makes a foreign good dearer or harder to sell than a domestic one — a tax on imports is the commonest, and the detail of how such barriers work belongs to the topic on trade and the global economy.` },
      { type: 'paragraph', text: `What matters here is the size of the effect. ${T.name}'s own maker sells the device at ${money(D.homePrice)}. The same device can be bought from abroad for ${money(D.openPrice)}, but a tax on imports had made the imported one dearer than the home-made one, so none arrived and the price stayed at ${money(D.homePrice)}.` },
      { type: 'paragraph', text: `Remove the tax and the price falls to ${money(D.openPrice)}. At ${money(D.homePrice)}, ${qty(D.qBefore)} devices were bought; at ${money(D.openPrice)}, ${qty(D.qAfter)} are. Liberalisation did not merely redirect the ${qty(D.qBefore)} — it added ${qty(D.qAfter - D.qBefore)} buyers who could not afford one at the old price.` },
      { type: 'paragraph', text: `This is the cause that does most of the work in this topic, because every later effect runs through it: the lower price, the wider market, the firm that closes, the workers displaced. The chapters on benefits and costs are largely a ledger of what this one paragraph set off.` },
    ],
    realExample: { emoji: '📉', text: `An economy that had taxed imported machinery removes the tax. Within a year its own manufacturers have re-equipped with cheaper machines and the workshop that had assembled the old ones has closed. Both happened for the same reason.` },
    misconception: `Students treat liberalisation as a decision one country makes about its own imports. Most of it is agreed between countries, each lowering barriers in exchange for the other doing the same — which is why the next cause, trading blocs, is a cause at all.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning when explaining a reason or impact. Here the two stages are the barrier coming off and the price falling; stopping at "trade increases" has skipped the mechanism that makes it increase.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A country taxes imported bicycles so heavily that none are imported, and its own makers charge ${money(240)}. The tax is removed and bicycles arrive at ${money(160)}. Demand is ${qty(20000)} at the old price and ${qty(44000)} at the new one:`,
      template: [
        `The price paid by buyers falls by ___`,
        `The number of bicycles bought rises by ___ thousand`,
        `The buyers who appear only after the fall could not afford one at ___`,
      ],
      answers: [money(80), '24', money(240)],
      hints: ['subtract the new price from the old', 'the difference between the two quantities, in thousands', 'the price that had been keeping them out'],
      distractors: [money(400), '44', money(160)],
    }),
  };
})();

const tradingBlocs = (() => {
  const sid = subId('trading-blocs');
  return {
    id: sid,
    title: 'The Growth of Trading Blocs',
    keyIdea: 'The second cause: more trading blocs, and larger ones. A bloc is a group of countries that agree to lower the barriers between themselves, so more trade happens under one.',
    body: [
      { type: 'paragraph', text: `A **trading bloc** is a group of countries that has agreed to reduce barriers to trade between its members. The specification lists the "increased number and size of trading blocs" as the second factor contributing to globalisation in the last fifty years.` },
      { type: 'paragraph', text: `As a cause, the mechanism is the one from the previous subsection, applied to many countries at once and by agreement rather than unilaterally. Each new bloc, and each enlargement of an existing one, moves another slice of world trade inside an arrangement where barriers are lower than outside it.` },
      { type: 'paragraph', text: `Size compounds the effect. A bloc of three small economies lowers barriers on a little trade; the same agreement across a dozen economies including large ones covers a great deal more. That is why the specification names the number **and** the size.` },
      { type: 'paragraph', text: `How blocs differ from one another, what membership costs and what it gains, and how blocs sit alongside the World Trade Organization, are the subject of the topic on trade and the global economy. Here the bloc is a cause, and one sentence of mechanism is what the leaf asks for.` },
    ],
    realExample: { emoji: '🤝', text: `A group of neighbouring economies agrees to charge each other nothing on manufactured goods. Within a decade the share of each member's trade that goes to the others has roughly doubled, without any of them changing what they charge the rest of the world.` },
    misconception: `Students use a bloc's existence as an explanation by itself — "trade grew because of trading blocs". The bloc is a container; what raises trade is the lower barrier inside it. An answer that names the mechanism can be marked; one that names the bloc cannot.`,
    examMatters: `Appendix 6 defines Analyse as requiring an explanation which includes a chain of reasoning, focusing on depth rather than breadth. Listing five causes is breadth; taking one of them from the agreement to the extra trade is the depth that is being asked for.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Two economies each trade ${bn(40)} with the world, of which ${bn(6)} is with each other. They form a bloc and remove the barriers between them; trade with each other reaches ${bn(15)} while trade with everyone else is unchanged:`,
      template: [
        `Each economy's total trade is now ___`,
        `If neither economy's GDP changed, trade as a proportion of GDP has ___`,
        `The mechanism that raised it was a lower ___ between the members`,
      ],
      answers: [bn(49), 'risen', 'barrier'],
      hints: ['the unchanged part plus the new figure for trade with the partner', 'compare the new total with the old one', 'what a bloc agreement actually changes'],
      distractors: [bn(55), 'fallen', 'price'],
    }),
  };
})();

const politicalChange = (() => {
  const sid = subId('political-change');
  return {
    id: sid,
    title: 'Political Change',
    keyIdea: 'The specification names two: the breakdown of the Soviet system and the opening up of China. Each brought a closed economy into the world market as producer and as buyer.',
    body: [
      { type: 'paragraph', text: `The third cause is **political change**, and the specification is specific about which: the breakdown of the Soviet system and the opening up of China. Both were political decisions with economic consequences that dwarf most economic policies.` },
      { type: 'paragraph', text: `An economy that is closed trades little by design: its prices, its output and its investment are decided internally. When it opens, three things arrive at once. Its producers can sell abroad; its consumers can buy from abroad; and firms elsewhere can invest in it, which is where much of the world's FDI went next.` },
      { type: 'paragraph', text: `The scale is what makes this a cause of **globalisation** rather than a change in two countries. Whole national workforces and consumer markets entered the world market everyone else was already trading in, and the volume of world trade rose because of it.` },
      { type: 'paragraph', text: `Notice what the cause actually is. The politics changed first; the economics followed. That is the opposite of the usual direction in this course, and it is worth saying in an answer, because it explains why the change was so fast.` },
    ],
    realExample: { emoji: '🚪', text: `An economy that had produced almost entirely for itself permits foreign firms to build plants and its own firms to export. Within a generation it is among the largest traders in the world, and the goods it makes are in every other country's imports.` },
    misconception: `Students describe this cause as "countries becoming more democratic". The specification's claim is narrower and economic: economies that had been closed to trade and investment opened to both. The form of government is not what the leaf names.`,
    examMatters: `Appendix 6 defines Examine as requiring a chain of reasoning and a brief assessment of the arguments, for 8 marks. On this cause, the assessment is about relative importance: political change opened economies that liberalisation alone would never have reached.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each thing that happened when a closed economy opened to what it added to the world economy:`,
      pairs: [
        { left: 'Its factories were allowed to sell abroad', right: 'A large new source of exports' },
        { left: 'Its households could buy imported goods', right: 'A large new market for other countries' },
        { left: 'Foreign firms could build plants inside it', right: 'A new destination for FDI' },
        { left: 'Its workers could be employed by foreign firms', right: 'A large addition to the labour available' },
      ],
      why: [
        'Production that had served only the home market became supply to everyone else, which is why world trade volumes jumped rather than drifted.',
        'The same opening works in both directions: exporters elsewhere gained customers they had never been able to reach.',
        'Capital goes where the return is highest, and an economy that had been closed to it was, by definition, short of it.',
        'The world market for labour grew by the size of the opening economy, which is the part that shows up later in wages and in inequality.',
      ],
    }),
  };
})();

const transportAndCommunications = (() => {
  const sid = subId('transport-and-communications');
  const before = round2((100 * N.freightBefore) / N.cheapGoodFactory);
  const after = round2((100 * N.freightAfter) / N.cheapGoodFactory);
  /* The same fall, against a good whose value makes it a rounding error. */
  const deviceShare = round2((100 * (N.freightBefore - N.freightAfter)) / D.openPrice);
  return {
    id: sid,
    title: 'Cheaper Transport and Communications',
    keyIdea: `The fourth cause changes what CAN be traded rather than what is allowed to be. At ${money(N.freightBefore)} a unit, freight on a ${money(N.cheapGoodFactory)} good is ${pct(before)} of its price; at ${money(N.freightAfter)} it is ${pct(after)}.`,
    body: [
      { type: 'paragraph', text: `The fourth cause the specification names is the **reduced cost of transport and communications**. It is the only one of the five that is not a decision by a government: standard steel boxes, larger ships and instant communication made distance cheaper, and nobody had to agree to it.` },
      { type: 'paragraph', text: `Its effect is different in kind from liberalisation's. A lower barrier makes a traded good cheaper; cheaper freight decides **which goods are traded at all**. A good costing ${money(N.cheapGoodFactory)} to make arrives at ${money(N.cheapGoodFactory + N.freightBefore)} when freight is ${money(N.freightBefore)} — ${pct(before)} of its price in shipping — and at ${money(N.cheapGoodFactory + N.freightAfter)} when freight is ${money(N.freightAfter)}.` },
      { type: 'paragraph', text: `The same fall matters far less to a valuable good. On a device selling at ${money(D.openPrice)}, the difference between ${money(N.freightBefore)} and ${money(N.freightAfter)} of freight is a rounding error. So falling transport costs bring **low-value, bulky** goods into world trade first, and that is most of what changed.` },
      { type: 'paragraph', text: `Communications did the same to coordination. A firm can run a plant it cannot visit, which is the condition for the fifth cause and for splitting production across countries.` },
    ],
    realExample: { emoji: '🚢', text: `Fresh produce, furniture and bottled drinks are traded across oceans today and were not two generations ago. None of them became more valuable; the cost of moving them fell until it stopped being most of the price.` },
    misconception: `Students write that cheaper transport "made trade cheaper", which is true and thin. The point that carries an answer is the composition: the goods that started being traded are the ones where freight had been a large share of the price, and they are a different set of goods from the ones traded before.`,
    examMatters: `Appendix 6 defines Analyse as requiring an explanation which includes a chain of reasoning and says any relevant data provided needs to be interpreted. A chain here should use the freight figures rather than assert that costs fell.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Freight falls from ${money(N.freightBefore)} to ${money(N.freightAfter)} a unit. Two goods are considered: one costing ${money(N.cheapGoodFactory)} to make, one costing ${money(D.openPrice)}:`,
      template: [
        `For the cheap good, freight falls from ${pct(before)} of its factory price to ___`,
        `For the expensive good, the same ${money(N.freightBefore - N.freightAfter)} fall is worth ___ of the ${money(D.openPrice)} it sells for`,
        `So the fall in freight matters most to goods that are ___ in value`,
      ],
      answers: [pct(after), pct(deviceShare), 'low'],
      hints: ['the new freight over the same factory price', 'divide the fall by the selling price of the device', 'which of the two changed its tradability'],
      distractors: [pct(150), pct(4.3), 'high'],
    }),
  };
})();

const riseOfTncs = (() => {
  const sid = subId('the-rise-of-tncs');
  return {
    id: sid,
    title: 'The Rise of TNCs',
    keyIdea: 'The fifth cause is the increased significance of TNCs. A firm that splits one product\'s production across countries creates trade that would not exist otherwise.',
    body: [
      { type: 'paragraph', text: `The specification's fifth factor is the **increased significance of TNCs**. They appeared in chapter 1 as a characteristic; here they are a cause, and the two are not the same claim. As a characteristic, there are more of them. As a cause, what they DO raises trade.` },
      { type: 'paragraph', text: `A TNC decides where each stage of production happens. Once components are made in one country and assembled in another, the components cross a border as trade, and so does the finished good. One product, two border crossings, and no consumer has bought anything extra.` },
      { type: 'paragraph', text: `That has a consequence for the measurement in chapter 1. If a ${money(N.deliveredValue)} device has ${money(N.componentValue)} of components made abroad, the trade recorded is ${money(N.componentValue)} + ${money(N.deliveredValue)} = ${money(N.grossTrade)} — more than the device is worth. Splitting production raises measured trade faster than it raises output, which is part of why the ratio in chapter 1 rose so steeply.` },
      { type: 'paragraph', text: `The other half of a TNC's significance is that it moves capital as well as goods, which is the subject of the next chapter. A firm choosing where to put a plant is making the investment the second characteristic counts.` },
    ],
    realExample: { emoji: '🔩', text: `A single appliance whose motor, casing and electronics are made in three different economies and assembled in a fourth is recorded four times in world trade statistics before anybody buys it once.` },
    misconception: `Students say TNCs cause globalisation "by selling all over the world". Selling abroad is exporting, which firms have done for centuries. What is new is production split across borders, so that a firm's internal shipments become international trade.`,
    examMatters: `Appendix 6 defines Examine as requiring knowledge, analysis and evaluation with a brief assessment of the arguments, for 8 marks. The assessment on this cause is whether TNCs caused the trade or merely responded to barriers that were already falling.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A machine sells for ${money(400)}. Its parts are made abroad and are worth ${money(200)}; the rest of the value is added where it is assembled, and the finished machine is then exported:`,
      template: [
        `The trade recorded across the two crossings is ___`,
        `That is ___ times the value of the machine`,
        `The number of machines anybody ended up owning is ___`,
      ],
      answers: [money(600), qty(1.5), 'one'],
      hints: ['the parts coming in, and the whole machine going out', 'divide the recorded trade by the selling price', 'count the machines, not the crossings'],
      distractors: [money(400), qty(2.67), 'two'],
    }),
  };
})();

const whyTradeGrewFaster = (() => {
  const sid = subId('why-trade-grew-faster-than-output');
  return {
    id: sid,
    title: 'Why Trade Grew Faster Than Output',
    keyIdea: `The five causes are not five separate stories. Together they explain the one number chapter 1 measured: why ${T.name}'s trade went from ${pct(T.first.openness)} of output to ${pct(T.last.openness)}.`,
    body: [
      { type: 'paragraph', text: `A good answer on this topic connects the causes to the characteristics rather than listing both. Chapter 1 measured a ratio rising; this chapter has named five things that raised it, and they do not all work the same way.` },
      { type: 'bullets', items: [
        `**Two of them lower a barrier**: liberalisation, and the blocs that liberalise between members. Goods that were already worth trading start being traded.`,
        `**One opens a new economy**: political change. Producers, buyers and investment destinations that were outside the world market come into it.`,
        `**One changes what is worth trading**: cheaper transport and communications. Goods too cheap to be worth moving become worth moving.`,
        `**One changes how goods are made**: TNCs splitting production, so the same output crosses more borders.`,
      ] },
      { type: 'paragraph', text: `Only the last of those raises trade **without** raising the amount produced or consumed anywhere. That is the one to reach for when a question asks why trade grew *faster* than output rather than simply why it grew.` },
      { type: 'paragraph', text: `And the causes reinforce each other. Cheap freight is worth little behind a high barrier; an open economy attracts TNCs; and a TNC with production in three countries wants the barriers between them low.` },
    ],
    realExample: { emoji: '🧩', text: `An economy lowers its import taxes, joins a bloc with its neighbours, and within a decade hosts the component plants of three foreign firms. Each of the three causes made the next one more likely, and its trade-to-output ratio doubled.` },
    misconception: `Students answer "why has trade grown faster than output?" by listing the causes of trade growth. Most of those raise output as well, so they cannot explain a rising ratio on their own. The answer has to include something that raises the numerator without the denominator.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical and coherent chains of reasoning with reference to context, the validity and significance of arguments considered, and a recognition of different viewpoints. Ranking these five causes is exactly that kind of question.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: `Put the stages in causal order, from the political decision to the number chapter 1 measured:`,
      correctOrder: [
        'An economy that had been closed to trade and investment opens',
        'Its neighbours agree with it to lower the barriers between them',
        'Foreign firms build component plants inside it, because the barriers are now low and freight is cheap',
        'Components leave for assembly elsewhere, and the finished goods come back past the same border',
        'Trade rises faster than output, so trade as a proportion of GDP climbs',
      ],
      why: [
        'Nothing else on the list can happen while the economy is closed, so this is the step everything after it depends on.',
        'Lowering a barrier is an agreement between economies that are already trading, so it follows the opening rather than causing it.',
        'A firm invests once the barriers are low and the shipping is cheap: the investment is a response to the first two steps, not a cause of them.',
        'The split production is what turns one firm\'s internal logistics into recorded trade across two crossings.',
        'The ratio is the consequence of everything above it, which is why it is the measurement rather than the cause.',
      ],
    }),
  };
})();

/* ══ Block 3 — FDI by TNCs (4.3.1 · 2b) ═══════════════════════════════════ */

const reasonsForFdi = (() => {
  const sid = subId('reasons-for-fdi');
  return {
    id: sid,
    title: 'Reasons for FDI',
    keyIdea: 'A firm invests abroad to reach a market, lower a cost, secure a supply or get inside a barrier. Every reason is something it cannot do as cheaply from home.',
    body: [
      { type: 'paragraph', text: `The specification's leaf 2b is "FDI by TNCs", and its first half is the **reasons**. Exporting is the alternative, so every reason has to explain why owning production abroad beats shipping to it.` },
      { type: 'bullets', items: [
        `**To reach a market.** Producing inside a country avoids the cost of shipping to it, and avoids any barrier at its border.`,
        `**To lower a cost.** Wages, land, energy or materials may be cheaper where the production goes, and the saving is permanent rather than one-off.`,
        `**To secure a supply.** A firm that depends on one input buys the source rather than bargaining for it every year.`,
        `**To use what the other country has.** Skills, suppliers already in place, or a location close to other markets.`,
      ] },
      { type: 'paragraph', text: `${N.name} builds in ${T.name} for the first two: the plant serves a market it had been shipping to, and it makes components that go on to be assembled elsewhere. ${mn(N.capital / 1_000_000)} is a large commitment, and the firm makes it because both advantages are expected to last.` },
      { type: 'paragraph', text: `What none of the reasons is, is generosity. FDI is an investment, chosen against the alternative of exporting or of investing somewhere else — which is exactly why a recipient country has to look hard at what it is getting.` },
    ],
    realExample: { emoji: '🧭', text: `A firm that had exported to a fast-growing region builds a plant there once the shipping cost and the delay have grown larger than the cost of running a second factory.` },
    misconception: `Students give "cheap labour" as the reason for all FDI. A great deal of the world's FDI goes to high-wage economies, where the attraction is the market, the skills or the suppliers. Say which reason applies to the case in front of you.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning when explaining a reason. The two stages are the advantage the firm gains and the decision it changes: an advantage nobody acts on explains nothing.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each situation to the reason for FDI it points to, by asking what the firm could not do from home:`,
      pairs: [
        { left: 'Shipping to the region now costs more than running a second plant', right: 'To reach the market' },
        { left: 'The one mine supplying a key input raises its price every year', right: 'To secure the supply' },
        { left: 'A tax on imports makes the exported version uncompetitive', right: 'To get inside the barrier' },
        { left: 'Skilled assembly workers are plentiful there and scarce at home', right: 'To use what the other country has' },
      ],
      why: [
        'The comparison is between shipping and producing locally, and the shipping bill has crossed the cost of the factory.',
        'Ownership replaces bargaining: the firm stops being a customer of the input and becomes its owner.',
        'The barrier applies at the border, so production on the other side of it is not caught by the barrier at all.',
        'The advantage is in the other country and cannot be moved, so the firm has to go to it.',
      ],
    }),
  };
})();

const impactOnRecipient = (() => {
  const sid = subId('the-impact-on-the-recipient-country');
  return {
    id: sid,
    title: 'The Impact on the Recipient Country',
    keyIdea: `The second half of leaf 2b. ${N.name}'s plant pays ${mn(N.wageBill / 1_000_000)} in wages, ${mn(N.suppliers / 1_000_000)} to local suppliers and ${mn(N.revenue / 1_000_000)} in tax — and each of the three can be smaller than it first appears.`,
    body: [
      { type: 'paragraph', text: `A country that receives FDI receives capital it did not have to save for. What it does with the economy is best counted rather than asserted, so count ${N.name}'s plant in ${T.name}.` },
      { type: 'bullets', items: [
        `**Employment.** ${qty(N.jobs)} jobs at ${money(N.wage)} a year, so ${mn(N.wageBill / 1_000_000)} of wages that are then spent locally.`,
        `**Orders for local firms.** ${mn(N.suppliers / 1_000_000)} a year buying materials and services from suppliers in ${T.name}.`,
        `**Tax.** ${mn(N.profitTax / 1_000_000)} on profit at ${pct(N.taxRate)}, plus ${mn(N.incomeTax / 1_000_000)} of income tax on the wages: ${mn(N.revenue / 1_000_000)} in all.`,
        `**Skills and technology.** Workers trained on equipment the country did not have, and suppliers made to meet a standard they had not met before.`,
      ] },
      { type: 'paragraph', text: `Those are the gross figures and they are real. The next subsection is about why the net figure is smaller — because every one of the four has a leak, and an answer that stops at ${mn(N.revenue / 1_000_000)} of tax has not finished.` },
    ],
    realExample: { emoji: '🧾', text: `A new plant's first year is counted by the country as jobs and tax, and by the local suppliers as the first orders they have had that required documented quality standards. The second of those outlasts the plant.` },
    misconception: `Students count the jobs and stop. A plant's effect on a country runs through the wages spent locally, the orders placed with local firms and the tax paid — and each of those is a different size from the headline. The employment figure is the easiest to find and the least informative.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning, focused on depth rather than breadth, with any data interpreted. A chain on employment should reach what the wages do next, rather than listing four impacts one line each.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A second plant elsewhere employs ${qty(900)} at ${money(5000)}, buys ${mn(11)} from local suppliers, and makes ${mn(20)} of profit taxed at ${pct(20)}:`,
      template: [
        `Its wage bill is ___`,
        `Its profit tax is ___`,
        `Adding the supplier orders, the money reaching the local economy each year before any tax is ___`,
      ],
      answers: [mn(4.5), mn(4), mn(15.5)],
      hints: ['multiply the headcount by the wage', 'a fifth of the profit', 'wages and supplier orders together'],
      distractors: [mn(45), mn(5), mn(35.5)],
    }),
  };
})();

const whatTheRecipientDoesNotGet = (() => {
  const sid = subId('what-the-recipient-does-not-get');
  return {
    id: sid,
    title: 'What the Recipient Does Not Get',
    keyIdea: 'Profits leave, imported inputs shrink the local orders, the best posts may come with the firm and a local competitor may close. The impact is the gross minus all four.',
    body: [
      { type: 'paragraph', text: `The specification asks for **the impact** of FDI on recipient countries, and an impact has two signs. Each of the gains in the last subsection has a matching leak.` },
      { type: 'bullets', items: [
        `**The profit belongs to the investor.** ${mn(N.profit / 1_000_000)} of profit is earned in ${T.name} and owned abroad. What stays is the tax on it, and the next chapter shows how even that can be reduced.`,
        `**Imported inputs.** If the plant buys its components abroad, the local orders are a fraction of the output, and the country is hosting an assembly line rather than an industry.`,
        `**The best posts.** Where the senior and technical roles come with the firm, the training effect is smaller than the headcount suggests.`,
        `**Displaced local firms.** A plant that outsells local producers can close them, and those jobs come off the ${qty(N.jobs)}.`,
      ] },
      { type: 'paragraph', text: `None of that makes FDI bad. It makes the honest question a **net** one, and the specification's word for what a country receives — impact — is neutral on purpose.` },
    ],
    realExample: { emoji: '🕳️', text: `A plant employing two thousand people imports almost every component and assembles them for export. The country's trade figures rise on both sides, and the value that stays behind is the wages and little else.` },
    misconception: `Students treat repatriated profit as something improper. It is the return on the investment and the reason the investment was made; a country that forbade it would receive no FDI. The economic question is whether what stays — wages, orders, tax, skills — is worth what leaves.`,
    examMatters: `Appendix 6 defines Examine as requiring a chain of reasoning and a brief assessment of the arguments, for 8 marks. Here the assessment is the netting: an examined answer weighs the gains against the leaks rather than listing both.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each consequence of a foreign plant by whether the value stays in the host economy or leaves it:`,
      groups: [
        { name: 'Stays', items: ['Wages paid to local workers', 'Orders placed with local suppliers', 'Tax paid on the profit', 'Workers trained on the new equipment'] },
        { name: 'Leaves', items: ['Profit paid to the owners abroad', 'Components bought from the firm\'s other plants'] },
      ],
      why: [
        'Each of these is income or capability received by people and firms inside the country, and it is spent or used there.',
        'Both are payments out of the country: one to the owners, one to suppliers who are somewhere else, and neither adds to local income.',
      ],
    }),
  };
})();

const judgingAnFdiProject = (() => {
  const sid = subId('judging-an-fdi-project');
  return {
    id: sid,
    title: 'Judging an FDI Project',
    keyIdea: 'The test is not whether a project has benefits. It is whether what stays exceeds what the country gave up, including the next best use of the same land, workers and concessions.',
    body: [
      { type: 'paragraph', text: `Leaf 2b ends with the impact on recipient countries, and the judgement needs a comparison rather than a list. Three questions settle most cases.` },
      { type: 'bullets', items: [
        `**Against what?** The alternative is rarely nothing: the land, the workers and any tax concession had another use, and the project's gain is the difference.`,
        `**For how long?** A plant that stays twenty years and one that leaves when a concession expires are different projects with the same opening figures.`,
        `**How deep?** A plant buying ${mn(N.suppliers / 1_000_000)} locally builds an industry around it; one importing every part does not, and the difference shows up only after the first year.`,
      ] },
      { type: 'paragraph', text: `Apply that to ${N.name}: ${mn(N.revenue / 1_000_000)} of tax and ${mn(N.wageBill / 1_000_000)} of wages a year is a real gain, and a tax concession worth more than ${mn(N.revenue / 1_000_000)} a year would have wiped it out before a single worker was hired.` },
      { type: 'paragraph', text: `This is the shape of every evaluation in this section, and it is worth practising here where the numbers are small: state what is gained, state what it cost or displaced, and say which is larger and why.` },
    ],
    realExample: { emoji: '⚖️', text: `Two economies compete for the same plant by offering tax holidays. The one that wins collects no profit tax for a decade, and the gain is reduced to the wages and the supplier orders — which may still be worth it, and may not.` },
    misconception: `Students conclude that FDI is "good for developing countries" or "bad for them" as a general rule. The specification asks about the impact on recipient countries, which differs by project. A judgement without the comparison behind it is an opinion.`,
    examMatters: `Appendix 6 defines Evaluate as requiring multi-stage chains of reasoning with reference to context, a recognition of different viewpoints, and informed judgements. The context is the project's own figures; the judgement is which side of them is larger.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: `Put the steps of judging a project in the order you would work through them, from what arrives to what it was worth:`,
      correctOrder: [
        'Count what the project brings in a year: wages, supplier orders and tax',
        'Subtract what leaves: the profit paid abroad and the inputs bought abroad',
        'Take off what the country gave up to get it, including any tax concession',
        'Ask how long the plant is expected to stay, and what happens when the concession ends',
        'Compare the remainder with the next best use of the same land, workers and money',
      ],
      why: [
        'The gross figures are the only ones published, so they are where any judgement has to start — and where a weak answer stops.',
        'What leaves is subtracted before anything else, because it is part of the same year\'s flows and is usually the largest single deduction.',
        'A concession is a cost the country chose to pay, so it belongs in the same calculation rather than in a separate argument about fairness.',
        'The duration converts one year\'s net figure into the total, and a project that leaves early can turn a positive year into a negative decade.',
        'An alternative is what makes the judgement economic: a positive net gain still fails if the same resources would have produced more elsewhere.',
      ],
    }),
  };
})();

/* ══ Block 4 — Possible benefits of globalisation (4.3.1 · 3a) ════════════ */

const growthAndTaxRevenue = (() => {
  const sid = subId('growth-and-tax-revenue');
  return {
    id: sid,
    title: 'Economic Growth and Tax Revenue',
    keyIdea: `The first two benefits, and they are connected: output rises, and a government taxing that output collects more. One plant adds ${mn(N.revenue / 1_000_000)} a year to ${T.name}'s revenue.`,
    body: [
      { type: 'paragraph', text: `The specification lists six possible benefits. The first is **increased economic growth**: trade lets a country produce what it is relatively good at and buy the rest, and investment from abroad adds capital that domestic saving did not have to supply.` },
      { type: 'paragraph', text: `The second, **increased tax revenue**, follows from the first but is not the same claim. A larger economy has more to tax: profits, incomes and spending all rise. ${T.name} collects ${mn(N.profitTax / 1_000_000)} from ${N.name}'s profit and ${mn(N.incomeTax / 1_000_000)} from its workers' pay — ${mn(N.revenue / 1_000_000)} from one plant.` },
      { type: 'paragraph', text: `Revenue matters because of what it buys. A government with ${mn(N.revenue / 1_000_000)} more can fund the schooling and infrastructure that raise output later, which is how the benefit compounds rather than arriving once.` },
      { type: 'paragraph', text: `Both benefits are written as **possible**, and the specification means it. Growth can be concentrated in one region or one industry, and revenue can be given away in concessions or moved offshore — which is the fourth cost, two chapters from now.` },
    ],
    realExample: { emoji: '🏫', text: `An economy whose tax take rises with its exports builds secondary schools with the proceeds, and the workers those schools produce are the reason the next round of investment arrives.` },
    misconception: `Students write that globalisation "creates growth" as though the mechanism were automatic. Name it: specialisation and trade raise output, and investment raises capacity. A claim with no mechanism is the same claim in every essay and adds nothing to any of them.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning and says any relevant data provided needs to be interpreted. Interpreting here means using the revenue figures rather than restating that revenue rose.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${T.name} taxes profit at ${pct(N.taxRate)} and wages at ${pct(N.incomeTaxRate)}. A second investor arrives with ${qty(600)} jobs at ${money(N.wage)} and profit of ${mn(12)}:`,
      template: [
        `The income tax on its wages is ___`,
        `The tax on its profit is ___`,
        `Its total contribution to revenue is ___`,
      ],
      answers: [mn(0.36), mn(3), mn(3.36)],
      hints: ['a tenth of six hundred wages', 'a quarter of the profit', 'the two added'],
      distractors: [mn(3.6), mn(2.4), mn(4.2)],
    }),
  };
})();

const economiesOfScale = (() => {
  const sid = subId('economies-of-scale');
  return {
    id: sid,
    title: 'Economies of Scale',
    keyIdea: `The third benefit. A world market spreads the same fixed cost over more units: ${money(D.homePrice)} a device at ${qty(D.homeQ)} becomes ${money(D.openPrice)} at ${qty(D.worldQ)}, on the same ${money(D.variable)} variable cost.`,
    body: [
      { type: 'paragraph', text: `**Economies of scale** mean a lower average cost as output rises. Globalisation supplies them by supplying customers: a firm selling into one country is limited by that country's demand, and a firm selling into fifty is not.` },
      { type: 'paragraph', text: `The arithmetic is the whole of the idea. ${T.name}'s own maker spends ${mn(D.homeFixed / 1_000_000)} on the plant however many devices it makes, and ${money(D.variable)} on materials and labour for each one. At ${qty(D.homeQ)} devices the fixed cost works out at ${money(D.homeFixedPerUnit)} a device, so the average cost is ${money(D.homeFixedPerUnit)} + ${money(D.variable)} = ${money(D.homePrice)}.` },
      { type: 'paragraph', text: `A producer selling worldwide spends ${mn(D.worldFixed / 1_000_000)} — twice as much — but sells ${qty(D.worldQ)} devices. Its fixed cost per device is ${money(D.worldFixedPerUnit)}, so its average cost is ${money(D.openPrice)}. The materials and labour cost ${money(D.variable)} in both cases.` },
      { type: 'paragraph', text: `That last sentence is the one to remember. The imported device is not cheaper because the people who made it were paid less; it is cheaper because ${mn(D.worldFixed / 1_000_000)} divided by ${qty(D.worldQ)} is a smaller number than ${mn(D.homeFixed / 1_000_000)} divided by ${qty(D.homeQ)}.` },
    ],
    realExample: { emoji: '🏗️', text: `A firm designing a new engine spends the same on the design whether it sells a hundred thousand or two million. Only the second market makes the design worth doing at a price ordinary buyers will pay.` },
    misconception: `Students explain cheaper imports by cheaper foreign labour every time. Here the labour and materials cost ${money(D.variable)} on both sides and the whole difference is the fixed cost per unit. Check which cost actually differs before reaching for wages.`,
    examMatters: `Appendix 6 defines Calculate as a calculation involving several stages based on given data, and advises showing workings. Average cost from a fixed cost and an output is two stages: the division, then the addition of the variable cost.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A third producer spends ${mn(18)} on its plant, ${money(D.variable)} a unit on materials and labour, and sells ${qty(300000)} units:`,
      template: [
        `Its fixed cost per unit is ___`,
        `Its average cost is ___`,
        `Against the ${money(D.openPrice)} producer it is ___ competitive`,
      ],
      answers: [money(60), money(90), 'less'],
      hints: ['divide the plant cost by the units', 'add the materials and labour to that', 'compare the two average costs'],
      distractors: [money(6), money(120), 'more'],
    }),
  };
})();

const lowerPricesConsumerSurplus = (() => {
  const sid = subId('lower-prices-and-consumer-surplus');
  return {
    id: sid,
    title: 'Lower Prices and Higher Consumer Surplus',
    keyIdea: `Consumer surplus is what buyers would have paid minus what they do pay. When the device falls from ${money(D.homePrice)} to ${money(D.openPrice)}, surplus rises from ${mn(D.csBefore / 1_000_000)} to ${mn(D.csAfter / 1_000_000)}.`,
    body: [
      { type: 'paragraph', text: `The fourth benefit has two halves and the second is the one students skip. Lower prices are easy: the device costs ${money(D.openPrice)} instead of ${money(D.homePrice)}. **Consumer surplus** is what that is worth.` },
      { type: 'paragraph', text: `Some buyers would have paid far more than ${money(D.homePrice)}; others only just managed it. Surplus is the total of every buyer's willingness to pay, minus what they all actually handed over. At ${money(D.homePrice)}, with ${qty(D.qBefore)} devices sold, it comes to ${mn(D.csBefore / 1_000_000)}.` },
      { type: 'paragraph', text: `At ${money(D.openPrice)} it is ${mn(D.csAfter / 1_000_000)}, and the gain of ${mn(D.csGain / 1_000_000)} arrives two ways. The ${qty(D.qBefore)} people already buying save ${money(D.fall)} each: ${mn(D.toExisting / 1_000_000)}. And ${qty(D.qAfter - D.qBefore)} people who were priced out now buy, gaining ${mn(D.toNew / 1_000_000)} between them — less each, because the device is worth only a little more to them than the ${money(D.openPrice)} they pay.` },
      { type: 'paragraph', text: `This is the one benefit in the list that can be drawn, and drawing it is the fastest way to be sure of it: the surplus is the area under the demand curve and above the price.` },
    ],
    realExample: { emoji: '🛒', text: `A household that had saved for a year to buy one appliance can afford two once the price halves, and a household that could never afford one buys its first. Both gains are surplus; only the second shows up as a new sale.` },
    misconception: `Students say consumer surplus is the money consumers save. That is only the first part — the ${mn(D.toExisting / 1_000_000)} going to people who were already buying. The buyers who appear because the price fell gain too, and leaving them out understates the benefit by ${mn(D.toNew / 1_000_000)}.`,
    examMatters: `Appendix 6 defines Draw as assessing quantitative skills through an accurately labelled diagram, for 4 marks, and says students may have to decide the type of diagram. Here that decision is a demand curve with both prices marked.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A market's demand is ${qty(40000)} at ${money(90)} and ${qty(80000)} at ${money(60)}. The price falls from ${money(90)} to ${money(60)}:`,
      template: [
        `The ${qty(40000)} buyers who were already buying gain ___ between them`,
        `The ${qty(40000)} new buyers gain ___ between them`,
        `So the total gain in consumer surplus is ___`,
      ],
      answers: [mn(1.2), mn(0.6), mn(1.8)],
      hints: ['the fall in price times the old quantity', 'half the fall times the extra quantity', 'the two parts added'],
      distractors: [mn(2.4), mn(0.9), mn(3.6)],
    }),
  };
})();

const moreChoice = (() => {
  const sid = subId('more-choice');
  return {
    id: sid,
    title: 'More Choice',
    keyIdea: 'The fifth benefit. One country supports the few varieties its own demand can pay for; a world market supports varieties no single country could have sustained.',
    body: [
      { type: 'paragraph', text: `**More choice** is the specification's fifth benefit, and it follows from the same arithmetic as the third. Every variety of a good carries its own fixed cost — its own design, its own tooling, its own marketing.` },
      { type: 'paragraph', text: `In a market of ${qty(D.qBefore)} buyers, a variety wanted by one buyer in twenty has ${qty(D.qBefore / 20)} customers to cover that fixed cost, and probably does not exist. Open the market to the world and the same one-in-twenty taste has enough buyers behind it to be worth producing.` },
      { type: 'paragraph', text: `So the gain is not only more of the same thing. It is goods that no closed economy would ever have made, available to people whose demand was too small to be served on its own — which is why the benefit is largest for small economies and for unusual tastes.` },
      { type: 'paragraph', text: `The cost of it sits in the next chapter: the producers who used to serve the local taste now compete with everybody, and some of them do not survive it.` },
    ],
    realExample: { emoji: '🎛️', text: `A small economy's electronics shops stock a dozen models where there had been two, and the two that were made locally are no longer among them.` },
    misconception: `Students treat choice as a pleasant extra rather than an economic gain. It is a gain because it lets people buy what actually suits them instead of the nearest available substitute, and the difference between the two is worth money — which is the same surplus the previous subsection measured.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning when explaining an impact. The two stages here are the larger market covering a variety's fixed cost, and the variety therefore existing.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Designing one extra variety costs ${mn(2)}, and the firm covers that from a margin of ${money(20)} a unit. One buyer in twenty wants this variety:`,
      template: [
        `The variety has to sell ___ thousand units before the design is paid for`,
        `Where the whole market is ${qty(400000)} buyers, one in twenty is ___ thousand`,
        `So the firm makes this variety only if the market it can reach is ___`,
      ],
      answers: ['100', '20', 'bigger'],
      hints: ['divide the design cost by the margin, in thousands', 'a twentieth of the market, in thousands', 'compare the buyers it can reach with the units it must sell'],
      distractors: ['40', '80', 'smaller'],
    }),
  };
})();

const higherLivingStandards = (() => {
  const sid = subId('higher-living-standards');
  return {
    id: sid,
    title: 'Higher Living Standards',
    keyIdea: 'The sixth benefit is what the others add up to: more goods, cheaper, with more choice. It is also the one that says nothing about who receives them.',
    body: [
      { type: 'paragraph', text: `**Higher living standards** is the last of the six possible benefits, and it is a summary rather than a separate mechanism. Growth raises income; lower prices raise what a given income buys; more choice raises how well what is bought fits what was wanted.` },
      { type: 'paragraph', text: `The usual measure is output per head. ${T.name}'s output has risen ${qty(T.gdpMultiple)} times in fifty years, and if its population had not changed, that is ${qty(T.gdpMultiple)} times as much produced for each person.` },
      { type: 'paragraph', text: `The gap between that and a living standard is where the evaluation lives. Output per head is an **average**, and an average rises when the top rises alone. The device falling from ${money(D.homePrice)} to ${money(D.openPrice)} is evidence for the benefit; the worker whose job went with the local maker is evidence for the cost.` },
      { type: 'paragraph', text: `So the honest form of this benefit is conditional: living standards rise **on average**, and whether they rise for a particular group is the question the next chapter opens.` },
    ],
    realExample: { emoji: '🏘️', text: `An economy where average output per person has doubled in twenty years may contain a region whose main employer closed in year three and never reopened. Both statements are true of the same country.` },
    misconception: `Students use rising GDP per head as proof that everyone is better off. It is an average: it cannot distinguish an economy where every income doubled from one where half doubled twice over. Say what it measures before using it as evidence.`,
    examMatters: `Appendix 6 defines Evaluate as requiring multi-stage chains of reasoning and a critical assessment of the evidence, leading to informed judgements. Treating an average as evidence about individuals is exactly the assessment of evidence that is being asked for.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each piece of evidence by whether it supports the claim that living standards rose for most people, or only that the average rose:`,
      groups: [
        { name: 'Supports most people', items: ['The price of goods bought by nearly every household fell by a third', 'Wages rose in every region and every industry'] },
        { name: 'Only the average', items: ['National output divided by population is twice what it was', 'Total exports tripled in a decade', 'The number of very high incomes rose sharply'] },
      ],
      why: [
        'Each one is about a change that reaches households across the distribution, so it says something the average cannot.',
        'Each of these is a total or a mean, and any of them can rise while most households see nothing at all.',
      ],
    }),
  };
})();

/* ══ Block 5 — Possible costs of globalisation (4.3.1 · 3b) ═══════════════ */

const displacedWorkers = (() => {
  const sid = subId('displaced-workers');
  return {
    id: sid,
    title: 'Displaced Workers',
    keyIdea: `The first cost. When ${T.name}'s device maker cannot sell at ${money(D.homePrice)} against an imported ${money(D.openPrice)}, it closes, and its ${qty(D.homeWorkers)} workers lose jobs that paid ${money(D.homeWage)}.`,
    body: [
      { type: 'paragraph', text: `The same price fall that gave buyers ${mn(D.csGain / 1_000_000)} of surplus took the domestic producer's market. It had been selling ${qty(D.qBefore)} devices at ${money(D.homePrice)}; at ${money(D.openPrice)} it cannot cover its ${money(D.homePrice)} average cost, so it stops.` },
      { type: 'paragraph', text: `The specification's term is **displaced workers**, and displaced is precise. The jobs are not destroyed in total — the economy is buying more devices than before, and ${N.name}'s plant is hiring ${qty(N.jobs)} people. They are destroyed **here**, in this industry, for these workers.` },
      { type: 'paragraph', text: `Three things decide how costly that is. Whether the new jobs are where the old ones were; whether the skills transfer; and how long the gap lasts. A machine operator of twenty years' standing does not become an electronics assembler in a fortnight, and may never do it at the same wage.` },
      { type: 'paragraph', text: `So the cost is real even when the totals look fine. ${qty(D.homeWorkers)} people bear a loss that the ${qty(D.qAfter)} buyers of cheaper devices do not see, and the fact that the country gained overall is no answer to any of the ${qty(D.homeWorkers)}.` },
    ],
    realExample: { emoji: '🏚️', text: `A town built around one factory loses it to cheaper imports. The country's shoppers gain a little each; the town loses its wages, its suppliers and, within a decade, its younger workers.` },
    misconception: `Students write that trade "creates as many jobs as it destroys". Even where the totals match, the jobs created are usually in different industries, different places and at different skill levels. The totals are not the cost; the mismatch is.`,
    examMatters: `Appendix 6 defines Examine as requiring a chain of reasoning and a brief assessment of the arguments, for 8 marks. On displacement, the assessment is the mismatch: how many of the displaced can reach the new jobs, and how quickly.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `The closing maker employed ${qty(D.homeWorkers)} people at ${money(D.homeWage)}. Two years later ${qty(300)} of them are working at ${money(D.reWage)} and the rest have not found work:`,
      template: [
        `The wages lost by the ${qty(D.homeWorkers)} were ___ a year`,
        `The wages the ${qty(300)} now earn come to ___ a year`,
        `So the annual income lost to this group is still ___`,
      ],
      answers: [mn(2.5), mn(0.9), mn(1.6)],
      hints: ['headcount times the old wage', 'the re-employed, at their new wage', 'the difference between the two'],
      distractors: [mn(1.5), mn(1.5), mn(0.6)],
    }),
  };
})();

const exploitationOfWorkers = (() => {
  const sid = subId('exploitation-of-workers');
  return {
    id: sid,
    title: 'Exploitation of Workers',
    keyIdea: 'The second cost. Where a firm can choose between countries and a worker cannot choose between employers, the terms of that bargain favour the firm.',
    body: [
      { type: 'paragraph', text: `The specification lists the **exploitation of workers** among the possible costs. The economics of it is about bargaining power rather than about intent.` },
      { type: 'paragraph', text: `A TNC deciding where to build compares several countries. Each of those countries is competing for the same plant, and one of the things they can compete on is how little they require of the employer — hours, safety, the right to organise. A government that insists may lose the investment to one that does not.` },
      { type: 'paragraph', text: `On the other side, a worker with one employer within reach has no comparable choice. Where the alternative is no work at all, a wage and a set of conditions that would be rejected elsewhere are accepted here, and the gap between what the work produces and what the worker receives is wide.` },
      { type: 'paragraph', text: `The counter-argument belongs in the same answer, because it is strong: the jobs are usually better than the local alternative, which is why people take them, and wages in fast-growing export industries have risen over time. The cost is real and it is not the whole story, which is what "possible" in the specification's heading is doing.` },
    ],
    realExample: { emoji: '🧷', text: `Two economies bid for the same assembly plant. The one that wins has the lower minimum standards, and the jobs it gains still pay more than the farm work they replaced.` },
    misconception: `Students argue this cost by asserting that firms are greedy, which explains nothing that is not also true of firms at home. The mechanism is competition between governments for investment and the absence of alternatives for workers. Name both, and the argument survives a counter-argument.`,
    examMatters: `Appendix 6 defines Discuss as requiring chains of reasoning, the validity of arguments considered, and a recognition of different viewpoints. This cost cannot be discussed properly without the viewpoint that the jobs beat the alternative.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each feature of the bargain to the side it strengthens, and to the reason:`,
      pairs: [
        { left: 'The firm can build in any of six countries', right: 'The firm: it has alternatives' },
        { left: 'The worker has one large employer within travelling distance', right: 'The firm: the worker has none' },
        { left: 'Several firms are already competing for workers in the area', right: 'The worker: leaving is now possible' },
        { left: 'The plant needs a skill that takes two years to learn', right: 'The worker: replacing them is expensive' },
      ],
      why: [
        'Bargaining power is the ability to walk away, and a firm choosing between countries can walk away from any one of them.',
        'The same test applied to the worker: with one employer reachable, refusing the terms means not working.',
        'Competition for labour gives the worker the alternative the first two rows removed, which is what actually raises wages.',
        'A skill the employer cannot quickly replace is the worker\'s own version of having an alternative, and it works the same way.',
      ],
    }),
  };
})();

const environmentalImpact = (() => {
  const sid = subId('the-environmental-impact-of-trade');
  return {
    id: sid,
    title: 'The Environmental Impact of Increased Trade',
    keyIdea: `The third cost. ${T.name}'s trade is ${qty(T.tradeMultiple)} times what it was fifty years ago, and every unit of it has to be moved — so the cost falls on people who are not party to the transaction.`,
    body: [
      { type: 'paragraph', text: `The specification's third cost is the **environmental impact of increased trade**, and the word to hold on to is *increased*. The point is not that ships pollute; it is that fifty years of trade growing faster than output means far more moving than there would otherwise have been.` },
      { type: 'paragraph', text: `${T.name}'s trade has gone from ${bn(T.first.trade)} to ${bn(T.last.trade)}: ${qty(T.tradeMultiple)} times as much, against output ${qty(T.gdpMultiple)} times as much. The extra movement is the difference between those two multiples, and the fourth cause — cheap freight — is what made it worth doing.` },
      { type: 'paragraph', text: `Two other channels belong here. Production moving to where it is cheapest can move it to where the rules are loosest, so the same output creates more damage than before. And higher output everywhere uses more of everything, which is the growth benefit read from the other side.` },
      { type: 'paragraph', text: `Economically, the cost falls on people outside the transaction: the buyer of the ${money(D.openPrice)} device and the firm that sold it settle a price between them, and neither pays for what the shipping did. That is the whole reason this is a cost of globalisation rather than a cost to the shipper.` },
    ],
    realExample: { emoji: '🚛', text: `A component that crosses two oceans before it is fitted has been moved because moving it was cheaper than making it nearby. Nothing in that decision counted what the movement did.` },
    misconception: `Students write that "globalisation causes pollution", which is too broad to mark. The specification's claim is about increased trade: more goods moving further, plus production relocating to where rules are looser. Either mechanism can be argued; the general claim cannot.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning with any relevant data interpreted, and says it does not include evaluation. A chain here runs from cheaper freight to more movement to the damage; whether the trade is still worth it is a different command word.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Over the same fifty years, ${T.name}'s trade rose ${qty(T.tradeMultiple)} times and its output ${qty(T.gdpMultiple)} times:`,
      template: [
        `Trade has grown ___ than output`,
        `The reason the extra movement was worth doing is that ___ became cheaper`,
        `The cost of that movement is borne by people who are ___ to the transaction`,
      ],
      answers: ['faster', 'freight', 'outside'],
      hints: ['compare the two multiples', 'the fourth cause in chapter 2', 'neither the buyer nor the seller'],
      distractors: ['more slowly', 'labour', 'party'],
    }),
  };
})();

const transferPricing = (() => {
  const sid = subId('transfer-pricing');
  return {
    id: sid,
    title: 'Loss of Tax Revenue from Transfer Pricing',
    keyIdea: `The fourth cost. A transfer price is what one part of a firm charges another. Set it high enough and ${mn(N.profit / 1_000_000)} of profit is taxed at ${pct(N.lowRate)} rather than ${pct(N.taxRate)}.`,
    body: [
      { type: 'paragraph', text: `A TNC's parts trade with each other constantly, and somebody has to put a price on it. That price is the **transfer price**, and unlike a market price it is chosen inside the firm.` },
      { type: 'paragraph', text: `Watch what it does to ${T.name}. The plant makes ${mn(N.profit / 1_000_000)} of profit, which at ${pct(N.taxRate)} would be ${mn(N.profitTax / 1_000_000)} of tax. Now another part of the same group, in a country taxing profit at ${pct(N.lowRate)}, charges the plant ${mn(N.licence / 1_000_000)} a year for the right to use the group's designs.` },
      { type: 'paragraph', text: `The plant's profit is now ${mn(N.shiftedHome / 1_000_000)}, taxed at ${pct(N.taxRate)}: ${mn(N.taxHome / 1_000_000)}. The ${mn(N.licence / 1_000_000)} is taxed at ${pct(N.lowRate)}: ${mn(N.taxAway / 1_000_000)}. The group pays ${mn(N.groupTax / 1_000_000)} instead of ${mn(N.profitTax / 1_000_000)}, and ${T.name} is ${mn(N.revenueLost / 1_000_000)} short.` },
      { type: 'paragraph', text: `Nothing moved. The same plant made the same devices with the same workers; only where the profit was declared changed. That is why this cost sits beside "increased tax revenue" in the benefits — the second benefit and the fourth cost are the same flow, and this is the part of it that leaves.` },
    ],
    realExample: { emoji: '📄', text: `A group charges its own factories a fee for the use of a brand, set by the group and paid to the group. The factories' profits fall by the fee in every country that taxes profit heavily.` },
    misconception: `Students describe transfer pricing as smuggling or as an accounting error. It is neither: the transaction is real and declared. The economic problem is that the price is set by one side of the trade, so the profit can be declared wherever the firm prefers.`,
    examMatters: `Appendix 6 defines Calculate as a calculation involving several stages based on given data, and advises showing workings. Two rates and two profits here, so a full answer shows the split before the total.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A plant makes ${mn(50)} of profit in a country taxing at ${pct(20)}. It is charged ${mn(30)} by a part of the same group in a country taxing at ${pct(5)}:`,
      template: [
        `Tax paid where the plant is: ___`,
        `Tax paid on the fee: ___`,
        `Compared with taxing all ${mn(50)} at ${pct(20)}, the host country loses ___`,
      ],
      answers: [mn(4), mn(1.5), mn(6)],
      hints: ['a fifth of what is left after the fee', 'five per cent of the fee', 'the difference between ten million and what the host still collects'],
      distractors: [mn(10), mn(2.5), mn(4.5)],
    }),
  };
})();

const incomeInequality = (() => {
  const sid = subId('income-inequality-within-countries');
  return {
    id: sid,
    title: 'Increased Income Inequality Within Countries',
    keyIdea: `The fifth cost, and the specification says within. The ${qty(N.jobs)} workers in the new plant earn ${money(N.wage)} while the displaced earn ${money(D.reWage)} — a gap of two to one where there had been none.`,
    body: [
      { type: 'paragraph', text: `Globalisation does not raise or lower every income in a country together. It raises the incomes of people whose skills the world market wants and lowers those whose work competes with imports, so the spread inside one country widens.` },
      { type: 'paragraph', text: `Count it in ${T.name}. Before, the device maker's ${qty(D.homeWorkers)} workers earned ${money(D.homeWage)}, about the same as everyone else. After, ${N.name}'s ${qty(N.jobs)} workers earn ${money(N.wage)}, and those of the displaced who found work earn ${money(D.reWage)}. The ratio between the two groups has gone from one to one to ${qty(round2(N.wage / D.reWage))} to one.` },
      { type: 'paragraph', text: `Two other channels push the same way. Owners of capital can invest wherever returns are highest and workers usually cannot follow, so the return to capital rises against the return to labour. And a government whose revenue is under pressure from transfer pricing has less to redistribute with.` },
      { type: 'paragraph', text: `Note what the leaf does **not** say. It is about inequality **within** countries; whether globalisation widened or narrowed the gap **between** countries is a different question, and this topic does not ask it.` },
    ],
    realExample: { emoji: '📊', text: `In one economy, wages in the exporting industries rise for a decade while wages in the industries competing with imports do not move at all. Average wages rise, and the distance between the two groups doubles.` },
    misconception: `Students use inequality and poverty as the same word. An economy where every income rises but the top rises faster has more inequality and less poverty. The specification's cost is the widening gap; say which of the two you are arguing about.`,
    examMatters: `Appendix 6 defines Evaluate as requiring multi-stage chains of reasoning and informed judgements. Evaluating this cost means weighing a widening gap against rising incomes at both ends, which is a judgement rather than a fact.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each change by whether it widens the gap inside a country or narrows it:`,
      groups: [
        { name: 'Widens', items: ['Wages rise fast in an exporting industry and not at all elsewhere', 'The return to capital rises while wages stay flat', 'Tax revenue falls, so less is redistributed'] },
        { name: 'Narrows', items: ['Displaced workers are retrained into the new industries', 'Cheaper imports make up a larger share of poorer households\' spending'] },
      ],
      why: [
        'Each moves one group up or another group down without moving the other, which is what widening a distribution means.',
        'Both reach the people at the bottom: one by moving them into the better-paid work, the other by raising what their income buys.',
      ],
    }),
  };
})();

const tncInfluenceOnPolicy = (() => {
  const sid = subId('tnc-influence-on-domestic-policy');
  return {
    id: sid,
    title: 'The Influence of TNCs on Domestic Economic Policy',
    keyIdea: `The sixth cost. A firm that can move its plant does not have to argue against a policy: raising ${T.name}'s profit tax by ${pct(N.proposedRate - N.taxRate)} gains ${mn(N.riseGain / 1_000_000)} and risks the ${mn(N.departureCost / 1_000_000)} the plant already pays.`,
    body: [
      { type: 'paragraph', text: `The specification's last cost is the **influence of TNCs on domestic economic policy**. The mechanism is not bribery; it is the credible possibility of leaving.` },
      { type: 'paragraph', text: `${T.name}'s government considers raising profit tax from ${pct(N.taxRate)} to ${pct(N.proposedRate)}. On ${N.name}'s ${mn(N.profit / 1_000_000)} of profit that is ${mn(N.riseGain / 1_000_000)} more a year. But the plant currently pays ${mn(N.profitTax / 1_000_000)} of profit tax and ${mn(N.incomeTax / 1_000_000)} of income tax through its workers: ${mn(N.departureCost / 1_000_000)} that stops if it goes.` },
      { type: 'paragraph', text: `Set the two against each other: ${mn(N.riseGain / 1_000_000)} gained if the plant stays, ${mn(N.departureCost / 1_000_000)} lost if it goes. The rise breaks even when the chance of losing the plant is ${mn(N.riseGain / 1_000_000)} ÷ (${mn(N.riseGain / 1_000_000)} + ${mn(N.departureCost / 1_000_000)}) = ${pct(N.breakEvenOdds)}, so anything above that and the policy costs money. The firm does not need to threaten anything: the arithmetic makes the argument, and the government can see it as clearly as the firm can.` },
      { type: 'paragraph', text: `The same logic reaches environmental rules, employment law and public spending, and it is stronger where one employer is large relative to the economy. A country with fifty such plants can afford to lose one; a country with one cannot.` },
    ],
    realExample: { emoji: '🏛️', text: `A government reviewing its industrial policy finds that the largest employer in the region could relocate within two years. No meeting is needed for that fact to shape what is proposed.` },
    misconception: `Students describe this cost as corruption. Corruption is a payment; this is a calculation. A firm with a credible alternative location changes a government's arithmetic without doing anything improper, and that is what makes the cost hard to legislate against.`,
    examMatters: `Appendix 6 defines Evaluate as requiring reference to context and a critical assessment of the evidence, leading to informed judgements. The context is the two figures: what the policy gains and what it risks.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A plant pays ${mn(6)} of tax a year. The government considers a rule that would raise ${mn(1)} more from it but might make it relocate:`,
      template: [
        `The gain if the plant stays is ___`,
        `The loss if it goes is ___`,
        `So the rule breaks even when the chance of it leaving is ___`,
      ],
      answers: [mn(1), mn(6), pct(14.3)],
      hints: ['the extra revenue named in the question', 'everything the plant pays today, all of which stops', 'the gain over the gain plus the loss'],
      distractors: [mn(7), mn(5), pct(85.7)],
    }),
  };
})();

/* ══ The block plan ═══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [whatGlobalisationIs, tradeProportionOfGdp, transnationalCompanies, foreignDirectInvestment, migration], takeaway: [
    'Globalisation is integration, and the specification measures it three ways.',
    `Trade as a PROPORTION of GDP: ${pct(T.first.openness)} to ${pct(T.last.openness)} in fifty years.`,
    'A TNC produces in more than one country. Exporting from one does not count.',
    'FDI buys productive assets abroad AND the control of them. A small shareholding does not.',
    'Migration is listed as a characteristic here; its effects belong to other topics.',
  ] },
  { title: B2, subs: [tradeLiberalisation, tradingBlocs, politicalChange, transportAndCommunications, riseOfTncs, whyTradeGrewFaster], takeaway: [
    'Five causes, and they do not all work the same way.',
    `Liberalisation and blocs lower a barrier: the device falls from ${money(D.homePrice)} to ${money(D.openPrice)}.`,
    'Political change opened economies that no amount of liberalisation could have reached.',
    'Cheaper freight changes WHICH goods are worth trading, starting with the cheap ones.',
    'Only split production raises trade without raising output — which is why the ratio climbed.',
  ] },
  { title: B3, subs: [reasonsForFdi, impactOnRecipient, whatTheRecipientDoesNotGet, judgingAnFdiProject], takeaway: [
    'Firms invest abroad to reach a market, cut a cost, secure a supply or get inside a barrier.',
    `The gross impact: ${mn(N.wageBill / 1_000_000)} of wages, ${mn(N.suppliers / 1_000_000)} of orders, ${mn(N.revenue / 1_000_000)} of tax.`,
    'Every one of those has a leak: profit leaves, inputs may be imported, local firms may close.',
    'The judgement is net, and against the next best use of the same resources.',
  ] },
  { title: B4, subs: [growthAndTaxRevenue, economiesOfScale, lowerPricesConsumerSurplus, moreChoice, higherLivingStandards], takeaway: [
    'Six possible benefits, and the specification means possible.',
    `Scale, not cheap labour: ${money(D.variable)} of materials and labour on both sides of the price gap.`,
    `Consumer surplus rises ${mn(D.csGain / 1_000_000)} — ${mn(D.toExisting / 1_000_000)} to existing buyers, ${mn(D.toNew / 1_000_000)} to new ones.`,
    'Choice is an economic gain because the nearest substitute is worth less than the right good.',
    'Living standards rise on AVERAGE, which is not a claim about anybody in particular.',
  ] },
  { title: B5, subs: [displacedWorkers, exploitationOfWorkers, environmentalImpact, transferPricing, incomeInequality, tncInfluenceOnPolicy], takeaway: [
    `Displacement is local: ${qty(D.homeWorkers)} jobs here, against jobs elsewhere in another industry.`,
    'Exploitation is about bargaining power: the firm has alternatives and the worker may not.',
    `Trade is ${qty(T.tradeMultiple)} times what it was, and every unit of it moves.`,
    `Transfer pricing moves ${mn(N.licence / 1_000_000)} of profit and costs ${T.name} ${mn(N.revenueLost / 1_000_000)} of tax.`,
    `Inequality WITHIN countries; and a firm that can leave changes policy without saying anything.`,
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
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, CARRYING THE SAME FIGURES FROM THE SAME MODULE, so
 * the two surfaces cannot drift apart without the build failing. `depth.notes-titles` requires every
 * Notes title to be taught in Learn Mode, which holds by construction when the titles ARE the block
 * titles.
 *
 * A WARNING FOR VERIFY B: notes are a free surface and ship in the server-rendered page from the
 * `data` column, so a `?draft=1` walk shows these notes only after publication. Verify them against
 * the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3 leaves',
    keyIdea: 'What globalisation is, and the three things the specification counts to measure it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Globalisation</strong> — the growing integration of national economies into one world economy, through trade, firms, capital and people.'),
        def('<strong>Trade as a proportion of GDP</strong> — exports plus imports, divided by output. A ratio, so it can exceed 100%.'),
        def('<strong>Transnational company (TNC)</strong> — a firm that owns and runs production in more than one country. Exporting is not enough.'),
        def('<strong>Foreign direct investment (FDI)</strong> — investment in productive assets in another country, together with control of them.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Trade rises against output because it compounds faster: ${pct(T.tradePct)} a year against ${pct(T.gdpPct)} takes ${T.name} from ${pct(T.first.openness)} to ${pct(T.last.openness)}.`),
        mech('A TNC\'s internal shipments are recorded as international trade, so the firm\'s own logistics show up in the first characteristic.'),
        mech('Control is what separates FDI from any other money crossing a border: a lender and a small shareholder direct nothing.'),
        link('Migration is listed here as a characteristic. What it does to inequality and to development are questions for the topics that own them.'),
      ] },
    ],
    takeaway: [
      'Integration, measured three ways: trade against output, firms and their investment, people.',
      'The ratio, not the total — and a ratio above 100% is normal for a small open economy.',
      'FDI = productive assets abroad + control.',
    ],
  },
  {
    title: B2,
    meta: '5 leaves',
    keyIdea: 'The five factors the specification names, and which part of the ratio each one moves.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Trade liberalisation</strong> — the reduction or removal of barriers to trade between countries.'),
        def('<strong>Trading bloc</strong> — a group of countries that has agreed to lower the barriers to trade between its members.'),
        def('<strong>Political change</strong> — in this topic, the breakdown of the Soviet system and the opening up of China.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Liberalisation: the barrier comes off, the price falls from ${money(D.homePrice)} to ${money(D.openPrice)}, and quantity rises from ${qty(D.qBefore)} to ${qty(D.qAfter)}.`),
        mech('Blocs apply the same mechanism by agreement and to many countries at once; the number AND the size both matter.'),
        mech('Political change brings producers, consumers and investment destinations into a market they had been outside.'),
        mech(`Freight decides what is worth moving: ${pct(round2((100 * N.freightBefore) / N.cheapGoodFactory))} of a ${money(N.cheapGoodFactory)} good's price, against ${pct(round2((100 * N.freightAfter) / N.cheapGoodFactory))} after.`),
        link(`TNCs split production, so a ${money(N.deliveredValue)} device generates ${money(N.grossTrade)} of recorded trade. That is the only cause that raises trade without raising output.`),
      ] },
    ],
    takeaway: [
      'Two lower a barrier, one opens an economy, one changes what is worth moving, one changes how goods are made.',
      'Only split production raises the ratio directly.',
      'The causes reinforce each other: cheap freight is worth little behind a high barrier.',
    ],
  },
  {
    title: B3,
    meta: '2 leaves',
    keyIdea: `Why firms invest abroad, and what a recipient country actually receives once the leaks are subtracted.`,
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Reasons for FDI</strong> — to reach a market, to lower a cost, to secure a supply, to use what the other country has, or to get inside a barrier.'),
        def('<strong>Impact on the recipient</strong> — wages, orders for local suppliers, tax, and skills, minus profit paid abroad and inputs bought abroad.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${N.name}: ${mn(N.capital / 1_000_000)} of capital, ${qty(N.jobs)} jobs at ${money(N.wage)}, ${mn(N.suppliers / 1_000_000)} to local suppliers, ${mn(N.revenue / 1_000_000)} of tax.`),
        mech(`The leaks: ${mn(N.profit / 1_000_000)} of profit is owned abroad, imported inputs shrink the local orders, and a displaced local producer comes off the job total.`),
        link('The judgement is net and comparative: against the alternative use of the same land, workers and concessions, and over the years the plant is expected to stay.'),
      ] },
    ],
    takeaway: [
      'Every reason for FDI is something the firm could not do as well by exporting.',
      'Count the gross, subtract what leaves, subtract what was given up, then compare.',
      'The employment figure is the easiest to find and the least informative.',
    ],
  },
  {
    title: B4,
    meta: '6 leaves',
    keyIdea: 'The six possible benefits, and the arithmetic behind the two that can be calculated.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>The six benefits</strong> — ${BENEFITS.map(([k]) => k.toLowerCase()).join('; ')}.`),
        def('<strong>Economies of scale</strong> — a lower average cost as output rises, because the fixed cost is spread over more units.'),
        def('<strong>Consumer surplus</strong> — the difference between what buyers would have been willing to pay and what they actually pay.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Scale: ${mn(D.homeFixed / 1_000_000)} ÷ ${qty(D.homeQ)} + ${money(D.variable)} = ${money(D.homePrice)}, against ${mn(D.worldFixed / 1_000_000)} ÷ ${qty(D.worldQ)} + ${money(D.variable)} = ${money(D.openPrice)}. The variable cost is the same on both sides.`),
        mech(`Surplus: ${mn(D.csBefore / 1_000_000)} at ${money(D.homePrice)} becomes ${mn(D.csAfter / 1_000_000)} at ${money(D.openPrice)} — ${mn(D.toExisting / 1_000_000)} to the ${qty(D.qBefore)} already buying, ${mn(D.toNew / 1_000_000)} to the ${qty(D.qAfter - D.qBefore)} who were priced out.`),
        mech(`Tax revenue: ${mn(N.profitTax / 1_000_000)} on profit plus ${mn(N.incomeTax / 1_000_000)} on wages from one plant.`),
        link('Living standards is the summary of the other five, and it is an average — which is where the evaluation starts.'),
      ] },
    ],
    takeaway: [
      'Cheaper imports are a scale effect here, not a wage effect.',
      `Surplus rises twice: existing buyers save, and priced-out buyers arrive.`,
      'An average rising is not evidence about any particular household.',
    ],
  },
  {
    title: B5,
    meta: '6 leaves',
    keyIdea: 'The six possible costs, and why four of them are about who receives the gains rather than whether there are any.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>The six costs</strong> — ${COSTS.map(([k]) => k.toLowerCase()).join('; ')}.`),
        def('<strong>Transfer price</strong> — the price one part of a firm charges another part of the same firm.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Displacement: the ${money(D.homePrice)} producer closes, ${qty(D.homeWorkers)} jobs go, and the new jobs are in another industry and may be somewhere else.`),
        mech('Exploitation: governments compete for the plant and workers may have one employer within reach, so the bargain is one-sided in both directions.'),
        mech(`Transfer pricing: a ${mn(N.licence / 1_000_000)} fee turns ${mn(N.profitTax / 1_000_000)} of tax into ${mn(N.taxHome / 1_000_000)} at home plus ${mn(N.taxAway / 1_000_000)} abroad. Nothing moved but the paperwork.`),
        mech(`Inequality WITHIN a country: ${money(N.wage)} in the new plant against ${money(D.reWage)} for a re-employed displaced worker.`),
        link(`Policy influence: a rise worth ${mn(N.riseGain / 1_000_000)} against ${mn(N.departureCost / 1_000_000)} at risk breaks even at ${pct(N.breakEvenOdds)}. No threat is needed.`),
      ] },
    ],
    takeaway: [
      'The costs are concentrated where the benefits are spread, which is why they are felt more.',
      'Transfer pricing is legal, declared, and takes the second benefit back.',
      'A firm that can move changes policy by arithmetic rather than by argument.',
    ],
  },
];
