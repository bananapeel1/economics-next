/**
 * PACKET 34 — causes-effects-globalisation: quiz, practice, flashcards, common mistakes, extras.
 *
 * ════ WHAT THE LIVE BANK DOES, AND WHY ALMOST NONE OF IT SURVIVES ════
 *
 *   - `structure-05`: the quiz tests vocabulary the section never teaches — "race to the bottom"
 *     (two items, plus a practice guidance and an extras chain), the characteristics of
 *     globalisation, greenfield against merger FDI, and `TNC` itself, which the body never expands.
 *     Three of those four are fixed by REMOVAL, because `race to the bottom` and `greenfield` are
 *     0 hits in `econ_spec.txt`; the fourth is fixed by teaching the characteristics, which are
 *     leaf 1a-c and had no subsection.
 *   - `structure-02`: no block carries `quizIndices` or `practiceIndices`, so no chapter check-in
 *     can show a question about its own chapter. Every item below carries a `block` tag and the
 *     runner DERIVES the indices from it, which makes the identity mapping unrepresentable.
 *   - `topFix-02`: the Trade Blocs block has no quiz item, practice question or diagram anywhere in
 *     the section. That block is 4.3.2 and is not rebuilt here, so the finding goes with it.
 *   - `topFix-05` asks for the practice set to be rewritten and is right about three things and
 *     wrong about one. Right: `Outline` is not an IAL command word, `Define` is 2 marks and not 4,
 *     and the set should reach an 8-mark item. Wrong: it asks for "6/4 for a 10-mark Assess", and
 *     **IAL Economics has no Assess and no 10-mark tariff** — `audit/raw/tariff-census.json`,
 *     `econ_spec.txt:2700-2747`. The live `Assess (10)` is replaced by `Examine (8)`, which is the
 *     command word that actually carries a brief assessment in this subject.
 *
 * EIGHT PRACTICE ITEMS, ONE PER ECONOMICS COMMAND WORD. `Draw (4)` is the one worth noting: the
 * census defines it as constructing an accurately labelled diagram using quantitative skills, and
 * this topic has exactly one drawable leaf — 3a-4, lower prices and higher consumer surplus. The
 * section's one demand-curve diagram and its one Draw question are the same artefact.
 *
 * EVERY EXPLANATION NAMES ITS OPTION BY CONTENT AND NEVER BY POSITION (packet 26). Items are
 * authored key-first, `placeKeys` deals the key into a slot, and F074 shuffles again at render.
 *
 * AND EVERY GUIDANCE SAYS WHAT THE COMMAND WORD REQUIRES PER APPENDIX 6, which is citable, and
 * nothing about how a script is marked: `MARK_CLAIM` catches marks being earned or lost, and packet
 * 20 found "is levels-marked" shipped eight times before anybody looked for it.
 */
import {
  id, hash8, money, bn, mn, qty, pct, round2,
  TAMIRA, DEVICE, NORVELL, CHARACTERISTICS, CAUSES, BENEFITS, COSTS,
} from './_packet34-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet34-content.mjs';

const T = TAMIRA, D = DEVICE, N = NORVELL;

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position. Hand-picking
 * positions produces exactly the lumpy distribution `quiz.histogram` looks for; ranking items by a
 * hash of their own stem and taking the rank modulo four gives an even spread that is stable across
 * builds and that nobody had to choose.
 */
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
   * All three are answerable from chapter 1, which every student reaches before anything else.
   * `PreTest.jsx` slices the unreserved pool at three, so the pool IS the opening chapter and
   * cannot contain material the section has not reached — the root fix for an untaught pre-test.
   */
  qi(null, 'Trade as a proportion of GDP is a better measure of globalisation than the total value of trade because:',
    ['it can rise only if trade grows faster than output', 'it is easier to calculate from published figures', 'it excludes imports, which are not part of output', 'it is unaffected by changes in prices'],
    'The total rises whenever an economy grows, whether or not it has become more integrated with anywhere else. The ratio isolates the integration: it moves only when trade and output grow at different rates. Imports are included in the measure, and both figures are measured in money, so prices affect them.'),

  qi(null, 'A firm makes everything in one country and sells to customers in forty. This firm is:',
    ['an exporter, but not transnational', 'transnational, because it sells in forty countries', 'transnational, because its customers are foreign', 'a foreign direct investor in forty countries'],
    'The test for a transnational company is where the production is owned and run, not where the customers are. All of this firm\'s production is in one country, so it is an exporter however large it is. Selling abroad is not investing abroad either, so nothing here is FDI.'),

  qi(null, 'Which of the following counts as foreign direct investment?',
    ['A firm buying a controlling stake in a company abroad', 'A bank lending to a firm in another country', 'A saver buying a few shares in a foreign firm', 'A firm exporting machinery to a foreign customer'],
    'Direct investment means productive assets abroad together with control of them, and a controlling stake buys exactly that. A loan is repaid and directs nothing; a small shareholding leaves the existing managers deciding; an export sells a good rather than acquiring an asset.'),

  /* ── Block 1 · characteristics ─────────────────────────────────────────── */
  qi(B1, `An economy exports ${bn(24)}, imports ${bn(20)} and produces ${bn(80)}. Trade as a proportion of GDP is:`,
    [pct(55), pct(30), pct(5), pct(44)],
    `Exports and imports are added, not netted off: ${bn(24)} + ${bn(20)} = ${bn(44)}. Dividing by output and multiplying by one hundred gives ${bn(44)} ÷ ${bn(80)} = ${pct(55)}. Using exports alone gives thirty per cent, and taking the difference between the two flows gives five — neither is what the measure asks for.`),

  qi(B1, 'Which of these is NOT one of the three characteristics of globalisation the specification names?',
    ['A rising rate of inflation', 'Trade rising as a proportion of GDP', 'Growing importance of TNCs and FDI', 'An increase in migration'],
    `The specification names three characteristics: trade as a proportion of GDP, the importance of transnational companies and foreign direct investment, and migration. Prices can rise for many domestic reasons and say nothing by themselves about how integrated an economy has become.`),

  qi(B1, 'A small economy reports trade worth 120% of its GDP. This tells you that:',
    ['it trades heavily and both flows are counted', 'its figures contain an error', 'it exports more than it produces', 'its imports are larger than its output'],
    'Exports and imports are added together, and imports are not part of output at all, so the ratio has no reason to stop at one hundred per cent. A figure above 100% is normal for a small open economy and is not evidence of an error or of either flow separately exceeding output.'),

  qi(B1, 'In this topic, migration is listed as:',
    ['a characteristic of globalisation', 'a cause of globalisation', 'a benefit of globalisation', 'a cost of globalisation'],
    'The specification puts the increase in migration under characteristics, alongside trade as a proportion of GDP and the growth of TNCs and FDI. The causes it lists are liberalisation, trading blocs, political change, transport and communications, and TNCs — migration is not among them.'),

  /* ── Block 2 · causes ──────────────────────────────────────────────────── */
  qi(B2, `A country removes a tax on imported devices. The price falls from ${money(D.homePrice)} to ${money(D.openPrice)} and sales rise from ${qty(D.qBefore)} to ${qty(D.qAfter)}. The extra ${qty(D.qAfter - D.qBefore)} devices are bought by people who:`,
    [`could not afford one at ${money(D.homePrice)}`, 'switched from a rival product', 'were already buying one each year', 'are buying for resale abroad'],
    `A demand curve says how many buyers there are at each price. Lowering the price to ${money(D.openPrice)} brings in everyone whose willingness to pay lies between the two prices — they were not buying before because the device cost more than it was worth to them. The ${qty(D.qBefore)} who were already buying simply pay less.`),

  qi(B2, 'Which cause of globalisation changes which goods are worth trading at all, rather than how much of an already-traded good is traded?',
    ['The falling cost of transport', 'Trade liberalisation', 'The growth of trading blocs', 'Political change in formerly closed economies'],
    `Freight is a share of a good's price, and a large share for a cheap good. When it falls, goods that were too cheap to be worth moving become worth moving — a different set of goods enters trade. Lower barriers and open economies raise the volume of trade in goods that were already worth shipping.`),

  qi(B2, 'The political change the specification names as a cause of globalisation is:',
    ['the breakdown of the Soviet system and the opening up of China', 'the spread of elected government across Asia, Africa and Latin America', 'the founding of the World Trade Organization', 'the ending of colonial rule in the twentieth century'],
    'The specification is specific: the breakdown of the Soviet system and the opening up of China. Both brought economies that had been largely closed into the world market as producers, as buyers and as destinations for investment. The other changes listed are real events that this leaf does not name.'),

  qi(B2, `A TNC makes ${money(N.componentValue)} of components in one country and ships them to a second, where the finished ${money(N.deliveredValue)} device is made and exported. The trade recorded is:`,
    [money(N.grossTrade), money(N.deliveredValue), money(N.componentValue), money(N.deliveredValue - N.componentValue)],
    `Both crossings are recorded: ${money(N.componentValue)} of components out, then ${money(N.deliveredValue)} of finished device out. That is ${money(N.grossTrade)} of trade generated by one ${money(N.deliveredValue)} product, which is how splitting production across borders raises measured trade faster than output.`),

  /* ── Block 3 · FDI by TNCs ─────────────────────────────────────────────── */
  qi(B3, 'A firm that has exported to a region for years builds a factory there once shipping costs exceed the cost of running a second plant. Its reason for the FDI is:',
    ['to serve the market more cheaply than by exporting', 'to secure a supply of a scarce raw material', 'to acquire a competitor and reduce competition', 'to take advantage of lower wage rates'],
    'The firm compared two ways of reaching the same customers and found that producing locally now costs less than shipping to them. Nothing in the case is about inputs, about buying a rival, or about wages — each of those is a different reason for FDI and would show up as a different comparison.'),

  qi(B3, `${N.name}'s plant employs ${qty(N.jobs)} at ${money(N.wage)} and pays income tax at ${pct(N.incomeTaxRate)} on the wages. The income tax collected is:`,
    [mn(N.incomeTax / 1_000_000), mn(N.wageBill / 1_000_000), mn(N.profitTax / 1_000_000), mn(N.revenue / 1_000_000)],
    `The wage bill is ${qty(N.jobs)} × ${money(N.wage)} = ${mn(N.wageBill / 1_000_000)}, and a tenth of that is ${mn(N.incomeTax / 1_000_000)}. The wage bill itself is not tax; the tax on profit is a separate ${mn(N.profitTax / 1_000_000)}, and the two together are what the government collects from the plant.`),

  qi(B3, 'Which of these is a value that LEAVES the recipient economy?',
    ['Profit paid to the owners abroad', 'Wages paid to local workers', 'Orders placed with local suppliers', 'Tax paid on the profit earned locally'],
    'The return on the investment belongs to the investor and is paid out of the country. Wages, supplier orders and tax are all received by people, firms and government inside the country, and are spent or used there. Netting the outflow against the inflows is what turns a gross impact into an honest one.'),

  qi(B3, 'The best test of whether an FDI project benefits a recipient country is:',
    ['what it leaves behind, net of the next best alternative', 'the number of jobs it creates in its first year', 'the size of the investment the firm announces', 'whether the firm is larger than the country\'s own producers'],
    'A project with a positive effect can still be the wrong project if the land, workers and tax concessions it used would have produced more elsewhere. Headline jobs, announced capital and the size of the investor are all figures available before anything has happened, and none of them nets anything off.'),

  /* ── Block 4 · possible benefits ───────────────────────────────────────── */
  qi(B4, `Two producers each pay ${money(D.variable)} a unit for materials and labour. One spends ${mn(D.homeFixed / 1_000_000)} on its plant and makes ${qty(D.homeQ)} units; the other spends ${mn(D.worldFixed / 1_000_000)} and makes ${qty(D.worldQ)}. The second is cheaper per unit because:`,
    ['its fixed cost is spread over more units', 'it pays its workers less', 'its materials are of lower quality', 'it spends less on its plant in total'],
    `The materials and labour cost ${money(D.variable)} for both, so wages and materials cannot be the difference. What differs is ${mn(D.homeFixed / 1_000_000)} ÷ ${qty(D.homeQ)} = ${money(D.homeFixedPerUnit)} against ${mn(D.worldFixed / 1_000_000)} ÷ ${qty(D.worldQ)} = ${money(D.worldFixedPerUnit)}. The larger producer spends more on its plant in total, not less.`),

  qi(B4, 'Consumer surplus is:',
    ['what buyers would have paid, minus what they do pay', 'the money consumers save when a price falls', 'the profit a producer makes on each unit sold', 'the difference between the highest and lowest price'],
    'Surplus is the gap between willingness to pay and the price actually paid, summed over every buyer. The saving made when a price falls is only part of the change in surplus, because buyers who were priced out and now buy gain as well. Producer profit is a different quantity altogether.'),

  qi(B4, `A price falls from ${money(90)} to ${money(60)}. ${qty(40000)} buyers were already buying and ${qty(40000)} more now do. The gain in consumer surplus is:`,
    [mn(1.8), mn(1.2), mn(2.4), mn(0.6)],
    `The buyers already in the market gain the full ${money(30)} fall: ${qty(40000)} × ${money(30)} = ${mn(1.2)}. The new buyers gain less each, because the good is worth only a little more to them than the new price, and their gain is half the fall times their number: ${mn(0.6)}. Together that is ${mn(1.8)}.`),

  qi(B4, 'Globalisation increases choice mainly because:',
    ['a larger market can cover the fixed cost of more varieties', 'firms are required to offer more models', 'consumers in rich countries demand variety', 'transport costs no longer affect which goods are sold'],
    'Every variety carries its own design and tooling costs, and a variety wanted by a small share of buyers needs a large market before those costs are covered. Opening the market supplies the buyers. Nothing requires firms to offer variety, and transport costs still matter — falling ones are one of the causes.'),

  qi(B4, 'A country\'s output per head doubles over twenty years. This shows that:',
    ['the average rose, and averages hide who received it', 'every household is twice as well off', 'income inequality has fallen', 'the poorest households gained as much as the richest'],
    'Output per head is a mean, so it rises when the top rises alone just as surely as when everybody rises together. It is evidence about the average and about nothing else; the distribution behind it needs a separate measurement, and this topic\'s fifth cost is precisely that the distribution can widen.'),

  /* ── Block 5 · possible costs ──────────────────────────────────────────── */
  qi(B5, `${T.name}'s device maker closes when imports arrive at ${money(D.openPrice)}. The specification calls its ${qty(D.homeWorkers)} workers displaced rather than simply unemployed because:`,
    ['the jobs went from one industry, not from the economy', 'they will all be re-employed within a year', 'they chose to leave when the price fell', 'the firm was making a loss before the imports arrived'],
    `Displacement is about where the work went: the economy is buying more devices than before and other industries are hiring, but the jobs in this industry and for these workers are gone. Whether they are re-employed, and how quickly, depends on skills and location — which is the cost the term is pointing at.`),

  qi(B5, 'A government is reluctant to raise minimum workplace standards because a large employer could build its next plant elsewhere. This is an example of:',
    ['the influence of a TNC on domestic policy', 'the exploitation of workers by a TNC', 'trade liberalisation reducing barriers to imports', 'the displacement of workers by imports'],
    'The firm has changed what the government is willing to propose, which is the sixth cost the specification lists. No worker has yet been employed on worse terms, no barrier has moved and no import has displaced anybody: the effect is on the policy, before anything else happens.'),

  qi(B5, 'The environmental cost the specification attaches to globalisation is the impact of:',
    ['increased trade', 'increased population', 'increased taxation', 'increased migration'],
    `The leaf is the environmental impact of increased trade: more goods moving further, because moving them became cheap. ${T.name}'s trade is ${qty(T.tradeMultiple)} times what it was fifty years ago against output ${qty(T.gdpMultiple)} times, and the gap between those two multiples is the extra movement.`),

  qi(B5, `A plant earning ${mn(50)} of profit where tax is ${pct(20)} is charged ${mn(30)} by a part of the same group where tax is ${pct(5)}. The host country now collects:`,
    [mn(4), mn(10), mn(1.5), mn(5.5)],
    `The fee is a cost to the plant, so the profit taxed at home falls to ${mn(20)} and the tax to ${mn(4)}. Taxing the whole ${mn(50)} would have raised ${mn(10)}; the ${mn(1.5)} collected on the fee is paid to the other country, not to this one.`),

  qi(B5, 'Globalisation is said to increase income inequality within a country because:',
    ['incomes rise where exports grow and fall where imports compete', 'it lowers every wage in the economy', 'it raises the incomes of poorer countries faster than richer ones', 'it reduces the total income available to be shared'],
    'The effect works through which industry a person works in: demand for what the world wants rises, and work competing with cheaper imports loses. Total income rises rather than falls, and how incomes compare BETWEEN countries is a separate question this leaf does not ask.'),

  qi(B5, 'Transfer pricing reduces a host country\'s tax revenue because:',
    ['the price is set inside the firm, not by a market', 'the goods are smuggled across the border undeclared', 'the firm refuses to pay the tax it is charged', 'the host country has agreed to exempt the firm'],
    'A transfer price is a real, declared payment between two parts of the same firm, and the firm sets it. Set high enough, it moves the profit to wherever the rate is lowest without moving any production. Nothing is concealed, refused or exempted, which is what makes the cost hard to legislate against.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'foreign direct investment'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Before writing, ask what separates this from any other money crossing a border — plenty of money does, and only some of it is direct investment. An example will not substitute for either half.\n'
    + 'Foreign direct investment is spending by a firm on productive assets in another country (1 mark) — a plant, machinery, land, or a holding in an existing company — together with control of those assets (1 mark), which is what the word direct is doing. An answer that says "investing money abroad" has neither half: it does not say what is bought, and it does not say who then decides what the asset does.'),

  pr(B1, 'Calculate', 4, `An economy exports ${bn(66)} and imports ${bn(54)} in a year when its GDP is ${bn(150)}. Ten years earlier the same figures were ${bn(20)}, ${bn(16)} and ${bn(72)}. Calculate trade as a proportion of GDP in each year, and the change between them. (4 marks)`,
    'Four figures to combine and two to compare, so set the work out as two calculations of the same kind rather than one long one. Appendix 6 advises showing workings for a Calculate, and here the workings are where the credit is. Decide first what goes on the top of the fraction — the two trade flows are added, not netted off — and keep both years in the same units.\n'
    + `Trade today is ${bn(66)} + ${bn(54)} = ${bn(120)} (1 mark), which against GDP is ${bn(120)} ÷ ${bn(150)} × 100 = ${pct(80)} (1 mark). Ten years earlier trade was ${bn(20)} + ${bn(16)} = ${bn(36)}, which against ${bn(72)} is ${pct(50)} (1 mark). The change is ${pct(80)} − ${pct(50)} = 30 percentage points (1 mark). Two slips are common: netting exports against imports, which measures the trade balance and not openness; and reporting the change as "60% higher", which is a ratio of two ratios and answers a different question.`),

  pr(B2, 'Explain', 4, 'Explain one factor that has contributed to increased globalisation in the last fifty years. (4 marks)',
    'One factor, taken properly, beats four listed. Appendix 6 says that explaining a reason or impact requires a two-stage chain of reasoning, so decide before you write what your two stages are: what the factor changed, and what that change did to trade. Choose the factor you can be most concrete about rather than the one that sounds largest.\n'
    + 'A full answer names the factor from the specification\'s list — trade liberalisation, the growth of trading blocs, political change, cheaper transport and communications, or the increased significance of TNCs (1 mark) — and then takes it in two stages. For cheaper transport: freight is a share of a good\'s delivered price (1 mark), and when it falls, goods whose value is low relative to their bulk become worth moving for the first time (1 mark), so the range of goods traded widens as well as the volume (1 mark). An answer that stops at "transport got cheaper so trade rose" has one stage and an assertion where the second should be.'),

  pr(B3, 'Analyse', 6, 'Analyse the impact of foreign direct investment by a transnational company on a developing economy that receives it. (6 marks)',
    'Appendix 6 says an Analyse focuses on depth rather than breadth and does not include evaluation, so this is one chain followed all the way rather than a list of effects with a verdict at the end. Pick the channel you can trace furthest — employment, supplier orders, tax or skills — and ask at each step what the money or the capability does next. Resist the urge to conclude.\n'
    + 'A strong chain on employment runs: the plant hires local workers (1 mark), which raises household incomes in the area (1 mark), which is spent locally, so demand for other local goods and services rises (1 mark), and those firms hire in turn (1 mark). The chain can then reach the tax take on both the wages and the additional activity (1 mark), and the skills the workers acquire, which stay in the economy even if the plant does not (1 mark). A chain that reaches "so the economy benefits" without any of the intermediate steps has asserted the conclusion; one that lists employment, tax, skills and technology in a line each has chosen breadth, which this command word specifically does not ask for.'),

  pr(B4, 'Draw', 4, `A country's demand for a device is ${qty(D.qBefore)} units at ${money(D.homePrice)} and ${qty(D.qAfter)} units at ${money(D.openPrice)}, and demand is linear. Draw a diagram showing the consumer surplus at each price and label the gain. (4 marks)`,
    'Appendix 6 defines Draw as constructing an accurately labelled diagram using quantitative skills, and says students may have to decide the type of diagram. Decide that first, then plot the two points you are given before drawing anything through them. The labels are the command word rather than decoration on top of it, so leave room for them.\n'
    + `Axes with price on the vertical and quantity on the horizontal, and a straight demand curve through the two given points (1 mark). Both prices marked with horizontal lines to the curve and down to their quantities: ${money(D.homePrice)} at ${qty(D.qBefore)} and ${money(D.openPrice)} at ${qty(D.qAfter)} (1 mark). Consumer surplus at the higher price shaded as the triangle between the demand curve and the ${money(D.homePrice)} line, which extended to the vertical axis gives a choke price of ${money(D.choke)} (1 mark). The gain shaded as the area between the two price lines and under the curve, labelled as the trapezium made of ${money(D.fall)} × ${qty(D.qBefore)} to existing buyers plus half of ${money(D.fall)} × ${qty(D.qAfter - D.qBefore)} to new ones (1 mark). The commonest error is to shade only the rectangle, which leaves out the new buyers entirely.`),

  pr(B4, 'Examine', 8, 'Examine the benefits of globalisation for consumers in a small open economy. (8 marks)',
    'Appendix 6 says an Examine requires a chain of reasoning and a brief assessment of the arguments, so plan one developed chain and a short weighing rather than a survey. Consumers are the group named, so effects that reach them through their incomes need to be traced to them rather than assumed. Decide in advance which benefit you think is largest for a small economy, because the assessment at the end is what separates Examine from Analyse.\n'
    + 'A developed chain: opening the market exposes domestic producers to suppliers selling at a lower average cost, because a world market spreads a fixed cost over far more units than a small domestic one can. Prices fall to the level the outside supplier can sustain. Consumers already buying gain the full fall on every unit; consumers who were priced out at the old price now buy, gaining the difference between what the good is worth to them and the new price. Choice widens for the same reason prices fall — a variety wanted by a small share of buyers finds enough buyers once the market is the world rather than one country — and for a small economy that effect is larger than for a large one, because its own market could support very few varieties.\n'
    + 'The brief assessment, which is what the command word adds: the gains are real but they are gains to consumers as consumers, and the same people are also workers. Where a household\'s income came from the industry the imports displaced, the price fall is set against a lost wage and may not compensate it. The honest answer is that consumers in aggregate gain, that the gain is largest for the goods a small economy could never have produced efficiently, and that the distribution of the gain within the country is a separate question from its size.'),

  pr(B5, 'Discuss', 14, 'Discuss the costs of globalisation for an economy that has recently opened to trade and foreign investment. (14 marks)',
    'Appendix 6 says a Discuss needs logical and coherent chains of reasoning with reference to context, the validity and significance of the arguments considered, and a recognition of different viewpoints. That means two or three costs developed properly and weighed against each other, not all six named. Choose costs that fit an economy that has recently opened, and say which of them bites first and which bites longest.\n'
    + 'Displacement is the one that arrives first. Producers who had been protected face suppliers selling below their average cost and close, and the workers are concentrated in one industry and often one region, while the jobs that appear are in other industries and may need other skills. The significance of this cost depends almost entirely on mobility: where retraining is available and the new industries are nearby, it is a transition, and where they are not, it is permanent.\n'
    + 'Two costs work on the government rather than on households. Transfer pricing lets a firm declare its profit wherever the rate is lowest, so the tax take from foreign investment is smaller than the profit earned would suggest, and the revenue lost is revenue that would have funded the retraining the first cost requires. A firm that can relocate also shapes what policy is proposed at all, because a government weighing a tax rise or a stricter rule compares what it would raise against everything the firm currently pays. Neither of those is illegal and neither is announced, which is what makes them hard to answer.\n'
    + 'Against all of it: the costs are concentrated and the benefits are diffuse, which makes the costs more visible rather than larger. The same opening delivers lower prices to every household, larger markets for exporters and capital the economy did not have to save for. A judgement that weighs the two has to say which is bigger for THIS economy — and the answer turns on whether displaced workers can move to the new industries and whether the state can still collect enough tax to help them if they cannot.'),

  pr(B5, 'Evaluate', 20, 'Evaluate the view that the benefits of globalisation for a developing economy outweigh the costs. (20 marks)',
    'Appendix 6 says an Evaluate requires multi-stage chains of reasoning with reference to context and a critical assessment of the evidence leading to informed judgements, so this needs a position and a reason for holding it. Plan two benefits and two costs you can develop rather than the full list of twelve, and decide in advance what your answer depends on — the strongest answers name the condition that would change the verdict. Use one consistent example economy throughout.\n'
    + 'The case for: opening raises output because the economy specialises where it is relatively efficient and buys the rest, and foreign investment adds capital that domestic saving did not have to supply. Prices fall where an outside producer sells at a lower average cost, and the gain to consumers runs both to those already buying and to those who were priced out. Tax revenue rises with output and with the profits and wages of new plants, and revenue is what funds the schooling and infrastructure that raise output again later. For a developing economy in particular the scale effect is large, because its own market is too small to support efficient production of most manufactured goods.\n'
    + 'The case against: the losses are concentrated. Producers that had been protected close, and their workers are in one industry and often one region while the new jobs are elsewhere and need other skills. Inequality within the country widens, because the return to skills the world wants rises while work competing with imports does not. The tax gain is smaller than it looks once profit is declared elsewhere through transfer pricing, and a government that depends on one large investor finds its policy shaped by the possibility of that investor leaving. Each of these bites hardest in exactly the economy the question names, because a developing economy has fewer alternative employers, thinner retraining provision and less administrative capacity to police a transfer price.\n'
    + 'The judgement: on the evidence, the benefits are larger in aggregate and the costs are larger for particular groups, so the view is defensible but incomplete as stated. What decides it in practice is whether the state can do two things — move displaced workers into the growing industries, and collect enough of the tax the growth generates to pay for that. Where it can, the aggregate gain and the individual gains point the same way. Where it cannot, an economy can have rising output per head, a doubled trade ratio and a region that never recovered, all at once, and pointing at the average is no answer to the region. The condition, not the sign, is what an examined judgement here should turn on.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */

const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('Define globalisation.', 'The growing integration of national economies into one world economy — through trade in goods and services, firms producing in several countries, capital moving between them, and people migrating.'),
  card('Name the three characteristics of globalisation.', `${CHARACTERISTICS.map(([k]) => k.toLowerCase()).join('; ')}. All three are countable, which is what separates an economic answer from a conversational one.`),
  card('How is trade as a proportion of GDP calculated?', `(exports + imports) ÷ GDP × 100. The two flows are ADDED, not netted off, and the result can exceed 100% because imports are not part of output. ${T.name}: ${bn(T.last.trade)} ÷ ${bn(T.last.gdp)} = ${pct(T.last.openness)}.`),
  card('Why does trade as a proportion of GDP rise?', `Because trade compounds faster than output. In ${T.name}, ${pct(T.tradePct)} a year against ${pct(T.gdpPct)} takes the ratio from ${pct(T.first.openness)} to ${pct(T.last.openness)} in fifty years, with neither series ever falling.`),
  card('What is a transnational company?', 'A firm that owns and runs production in more than one country. The test is where production is, not where the customers are: a firm exporting to forty countries from one plant is an exporter, not a TNC.'),
  card('What is foreign direct investment?', 'Investment in productive assets in another country together with control of them. A loan directs nothing and a small shareholding leaves the existing managers deciding, so neither is FDI.'),
  card('Name the five causes of increased globalisation.', `${CAUSES.map(([k]) => k.toLowerCase()).join('; ')} — the specification\'s list for the last fifty years.`),
  card('What does trade liberalisation do to price and quantity?', `It removes a barrier, so the price falls to what outside suppliers can sustain and quantity rises. ${T.name}'s device: ${money(D.homePrice)} to ${money(D.openPrice)}, and ${qty(D.qBefore)} to ${qty(D.qAfter)} units.`),
  card('Why are trading blocs a CAUSE of globalisation?', 'Because each new or enlarged bloc moves more world trade inside an agreement where barriers between members are lower. The number and the size both matter. How blocs differ from one another belongs to the topic on trade and the global economy.'),
  card('Which political changes does the specification name?', 'The breakdown of the Soviet system and the opening up of China. Both brought economies that had been largely closed into the world market as producers, as buyers, and as destinations for investment.'),
  card('Why does cheaper transport change WHICH goods are traded?', `Because freight is a share of a good's price and a large share for a cheap one. At ${money(N.freightBefore)} a unit, freight on a ${money(N.cheapGoodFactory)} good is ${pct(round2((100 * N.freightBefore) / N.cheapGoodFactory))} of its factory price; at ${money(N.freightAfter)} it is ${pct(round2((100 * N.freightAfter) / N.cheapGoodFactory))}.`),
  card('How do TNCs raise measured trade without raising output?', `By splitting production across borders. A ${money(N.deliveredValue)} device with ${money(N.componentValue)} of imported components generates ${money(N.grossTrade)} of recorded trade across two crossings, and nobody has consumed anything extra.`),
  card('Name four reasons for FDI.', 'To reach a market more cheaply than by exporting; to lower a cost; to secure a supply; and to use what the other country has — skills, suppliers or location. Getting inside a trade barrier is the fifth.'),
  card('What is the impact of FDI on a recipient country?', `Gross: wages, orders for local suppliers, tax and skills. ${N.name} in ${T.name} pays ${mn(N.wageBill / 1_000_000)} of wages, ${mn(N.suppliers / 1_000_000)} to suppliers and ${mn(N.revenue / 1_000_000)} of tax. Net: subtract the profit paid abroad, any imported inputs and any local producer displaced.`),
  card('Name the six possible benefits of globalisation.', `${BENEFITS.map(([k]) => k.toLowerCase()).join('; ')}.`),
  card('How do economies of scale make an imported good cheaper?', `The fixed cost is spread over more units. ${mn(D.homeFixed / 1_000_000)} ÷ ${qty(D.homeQ)} + ${money(D.variable)} = ${money(D.homePrice)}, against ${mn(D.worldFixed / 1_000_000)} ÷ ${qty(D.worldQ)} + ${money(D.variable)} = ${money(D.openPrice)}. The variable cost is identical, so this is not a wage effect.`),
  card('Define consumer surplus.', `The difference between what buyers would have been willing to pay and what they actually pay, summed over all buyers. It is the area under the demand curve and above the price.`),
  card('How does a price fall raise consumer surplus twice over?', `Existing buyers save the full fall on every unit — ${money(D.fall)} × ${qty(D.qBefore)} = ${mn(D.toExisting / 1_000_000)} — and buyers who were priced out start buying, gaining half the fall times their number: ${mn(D.toNew / 1_000_000)}. Total ${mn(D.csGain / 1_000_000)}.`),
  card('Why does a larger market give more choice?', 'Every variety carries its own fixed design and tooling cost. A taste held by one buyer in twenty has too few buyers to cover it in one country and enough in a world market, so varieties appear that no closed economy would have produced.'),
  card('Name the six possible costs of globalisation.', `${COSTS.map(([k]) => k.toLowerCase()).join('; ')}.`),
  card('Why are workers called DISPLACED rather than unemployed?', `Because the jobs have gone from one industry and one place, not from the economy. ${T.name}'s ${qty(D.homeWorkers)} device workers lose ${money(D.homeWage)} jobs while ${qty(N.jobs)} jobs appear in another industry that may need other skills and be somewhere else.`),
  card('What is a transfer price, and how does it cost a country tax?', `The price one part of a firm charges another. A ${mn(N.licence / 1_000_000)} fee from a ${pct(N.lowRate)} jurisdiction turns ${mn(N.profitTax / 1_000_000)} of tax at ${pct(N.taxRate)} into ${mn(N.taxHome / 1_000_000)} at home plus ${mn(N.taxAway / 1_000_000)} abroad — ${mn(N.revenueLost / 1_000_000)} short, with no production moved.`),
  card('Why does globalisation widen inequality WITHIN a country?', `Incomes rise where the world wants the skills and fall where work competes with imports. ${money(N.wage)} in the new plant against ${money(D.reWage)} for a re-employed displaced worker is a gap of ${qty(round2(N.wage / D.reWage))} to one where there had been none.`),
  card('How does a TNC influence domestic economic policy without threatening anything?', `By being able to leave. A tax rise worth ${mn(N.riseGain / 1_000_000)} against ${mn(N.departureCost / 1_000_000)} already being paid breaks even at a ${pct(N.breakEvenOdds)} chance of departure, and the government can do that arithmetic itself.`),
  card('What does "possible" mean in the specification\'s benefits and costs?', 'That each one is contingent. Growth can be concentrated in one region, revenue can be given away or moved offshore, and living standards are an average. Which of the twelve applies is the question a data-response extract is asking.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */

const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Measuring globalisation by the total value of trade',
    '"Trade has grown enormously, so the economy has globalised."',
    `A growing economy trades more without becoming any more integrated. The characteristic the specification names is trade as a PROPORTION of GDP, and it moves only when the two grow at different rates: ${T.name}'s ratio rose from ${pct(T.first.openness)} to ${pct(T.last.openness)} because trade compounds at ${pct(T.tradePct)} and output at ${pct(T.gdpPct)}.`,
    'Divide before concluding. If the ratio is flat, the economy has grown and not integrated, however large the trade figure is.'),

  mistake('Calling any large firm with foreign customers a TNC',
    '"It sells in sixty countries, so it is a transnational company."',
    'The test is where production is owned and run. A firm with one plant and customers everywhere is an exporter; a firm with two small plants in two countries is transnational. Size is not part of the definition and neither is the customer list.',
    'Ask where the factories are. If they are all in one country, the firm is an exporter whatever its sales map looks like.'),

  mistake('Explaining cheaper imports by cheaper foreign labour',
    `"The imported device costs ${money(D.openPrice)} instead of ${money(D.homePrice)} because wages abroad are lower."`,
    `It may be, and here it is not: both producers pay ${money(D.variable)} a unit for materials and labour. The whole difference is the fixed cost per unit — ${money(D.homeFixedPerUnit)} at ${qty(D.homeQ)} units against ${money(D.worldFixedPerUnit)} at ${qty(D.worldQ)}. Reaching for wages skips the economies of scale the specification actually lists.`,
    'Check which cost differs before naming one. If the variable cost is the same on both sides, the answer is scale.'),

  mistake('Treating consumer surplus as the money consumers save',
    `"The price fell by ${money(D.fall)} and ${qty(D.qBefore)} people were buying, so consumers gained ${mn(D.toExisting / 1_000_000)}."`,
    `That is the gain to buyers who were already in the market and it leaves out the ${qty(D.qAfter - D.qBefore)} who start buying because the price fell. They gain the difference between what the device is worth to them and the ${money(D.openPrice)} they pay: ${mn(D.toNew / 1_000_000)} more, and the true gain is ${mn(D.csGain / 1_000_000)}.`,
    'Draw it. The saving is the rectangle and the new buyers are the triangle beside it, and the question asks for both.'),

  mistake('Using rising output per head as evidence about households',
    '"Output per head doubled, so people are twice as well off."',
    'Output per head is a mean and rises when the top rises alone. This topic\'s fifth cost is precisely that the distribution can widen at the same time, so the average is consistent with a region whose main employer closed and never reopened.',
    'Say what the measure measures: average output rose. Any claim about particular households needs evidence about the distribution.'),

  mistake('Calling transfer pricing illegal',
    '"The firm avoided tax illegally by moving its profits offshore."',
    `The transaction is real and declared: one part of a firm charges another for designs, brands or components, and the price is set inside the firm. That is why a ${mn(N.licence / 1_000_000)} fee can turn ${mn(N.profitTax / 1_000_000)} of tax into ${mn(N.groupTax / 1_000_000)} without anything being concealed — and why the cost is hard to answer with enforcement alone.`,
    'Describe the mechanism, not a crime: the price is set by one side of the trade, so the profit can be declared wherever the rate is lowest.'),

  mistake('Answering "why did trade grow FASTER than output?" with the causes of trade growth',
    '"Trade grew faster than output because barriers fell and transport got cheaper."',
    'Most of those causes raise output as well as trade, so on their own they cannot explain a rising ratio. The cause that raises the numerator without the denominator is production split across borders: the same device crossing two borders is recorded twice and consumed once.',
    'Name something that raises trade without raising what is produced or consumed. Split production is the one on the specification\'s list.'),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */

/*
 * FOUR CHAINS, AND TWO OF THEM ARE THE SOURCE OF THE SECTION'S TWO REORDERS. No subsection in this
 * section has a `flow` body, so `reorder.source` has only these chains to draw on — which is the
 * arrangement packets 29 and 30 arrived at: the sequence a reorder tests is taught in the Extras
 * tab and never printed above the widget on the same step.
 *
 * `V028` is why every chain carries `steps`: `ExtrasTab.jsx` reads the field and a chain without it
 * took the whole tab down.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How one economy opening turns into a rising trade ratio',
      steps: [
        'An economy that had been closed to trade and to foreign investment opens to both.',
        'Its neighbours agree with it to lower the barriers between them, so the goods each already made become cheaper to sell to the others.',
        `Foreign firms build component plants inside it, because the barriers are now low and freight has fallen to ${money(N.freightAfter)} a unit.`,
        `Components leave for assembly elsewhere — ${money(N.componentValue)} a device — and the finished ${money(N.deliveredValue)} device crosses a border again.`,
        `Trade rises faster than output, so trade as a proportion of GDP climbs: ${pct(T.first.openness)} to ${pct(T.last.openness)} over fifty years.`,
      ],
      result: `Four of the specification's five causes appear in that sequence, and the order is not interchangeable: nothing else on the list can happen while the economy is closed, and the ratio at the end is the consequence of everything above it. Only the fourth step raises recorded trade without raising what anybody produces or consumes, which is why it is the step to reach for when the question is about the RATIO rather than the volume.`,
    },
    {
      title: 'Judging an FDI project, in the order the figures arrive',
      steps: [
        `Count what the project brings in a year: ${mn(N.wageBill / 1_000_000)} of wages, ${mn(N.suppliers / 1_000_000)} of orders for local suppliers and ${mn(N.revenue / 1_000_000)} of tax.`,
        `Subtract what leaves: the ${mn(N.profit / 1_000_000)} of profit owned abroad, and any components the plant buys from the group rather than locally.`,
        'Subtract what the country gave up to get it — the land, the site preparation and any tax concession offered to win the plant.',
        'Ask how long the plant is expected to stay, and what happens when the concession ends, because one year net times twenty is a different number from one year net times three.',
        'Compare the remainder with the next best use of the same land, workers and money, which is the comparison that makes the judgement economic rather than rhetorical.',
      ],
      result: `A project can pass every step and still be the wrong project, and the step most answers skip is the last. ${N.name}'s ${mn(N.revenue / 1_000_000)} of tax is a real gain against no plant at all; against a concession worth more than ${mn(N.revenue / 1_000_000)} a year it is a loss, and the announcement of ${mn(N.capital / 1_000_000)} of capital tells you nothing about which case you are in.`,
    },
    {
      title: `Where ${T.name}'s ${mn(N.profitTax / 1_000_000)} of tax went`,
      steps: [
        `${N.name}'s plant earns ${mn(N.profit / 1_000_000)} of profit in ${T.name}, where profit is taxed at ${pct(N.taxRate)}: ${mn(N.profitTax / 1_000_000)}.`,
        `Another part of the same group, in a country taxing profit at ${pct(N.lowRate)}, owns the designs the plant uses.`,
        `It charges the plant ${mn(N.licence / 1_000_000)} a year for the right to use them. The fee is a real, declared payment between two parts of one firm.`,
        `${T.name} now taxes ${mn(N.shiftedHome / 1_000_000)} at ${pct(N.taxRate)}: ${mn(N.taxHome / 1_000_000)}. The fee is taxed where it lands, at ${pct(N.lowRate)}: ${mn(N.taxAway / 1_000_000)}.`,
        `The group pays ${mn(N.groupTax / 1_000_000)} instead of ${mn(N.profitTax / 1_000_000)}, and ${T.name} is ${mn(N.revenueLost / 1_000_000)} short of what it expected.`,
      ],
      result: `The same plant made the same devices with the same workers, and the only thing that moved was where the profit was declared. That is why the second benefit and the fourth cost are the same flow read in opposite directions — and why a country's answer to it has to be a rule about the PRICE rather than about the tax rate.`,
    },
    {
      title: 'The same price fall, from two chairs',
      steps: [
        `A tax on imported devices is removed, and the price falls from ${money(D.homePrice)} to ${money(D.openPrice)}.`,
        `The ${qty(D.qBefore)} households already buying save ${money(D.fall)} each: ${mn(D.toExisting / 1_000_000)} between them.`,
        `${qty(D.qAfter - D.qBefore)} households that could not afford a device at ${money(D.homePrice)} now buy one, gaining ${mn(D.toNew / 1_000_000)} between them.`,
        `${T.name}'s own device maker cannot cover a ${money(D.homePrice)} average cost at a ${money(D.openPrice)} price, and closes.`,
        `Its ${qty(D.homeWorkers)} workers lose ${money(D.homeWage)} jobs; those who find work in the growing industries do so at a different wage, and those who do not find any lose all of it.`,
      ],
      result: `${mn(D.csGain / 1_000_000)} of gain spread across a whole country against ${qty(D.homeWorkers)} concentrated losses is the shape of almost every argument in this topic. The aggregate is positive and the distribution is not, and an answer that reports only one of those two has reported half the effect. It is also why the same event appears in the benefits chapter and the costs chapter without contradiction.`,
    },
  ],
  /*
   * `evaluation` entries render as `{title, content}` with the content in one paragraph, which is
   * why these are prose rather than lists — and `reorder.source` only offers `chains[].steps` as a
   * candidate sequence, so neither of these can accidentally source a reorder.
   */
  evaluation: [
    {
      title: 'Deciding which cost or benefit matters most in a particular economy',
      content: `The specification gives twelve possible effects and an essay has room for four, so the question that actually decides a grade is which four. Four tests, in this order. First, what does this economy SELL? An economy exporting manufactures into a world market gets the scale and consumer-surplus benefits at full strength — ${money(D.homePrice)} to ${money(D.openPrice)} on a device is ${mn(D.csGain / 1_000_000)} of surplus in one market — while an economy exporting one commodity gets very little of either, because its price is set elsewhere and its scale was never the constraint. Second, what does it have that the world wants and cannot move? Where that is minerals or location, FDI arrives on the investor's terms and the influence cost is large; where it is a skilled workforce, the firm is the one with less choice, and wages rather than concessions do the competing. Third, can displaced workers reach the new jobs? This is the test that decides whether displacement is a transition or a permanent regional loss, and it turns on retraining, on distance and on how different the skills are — a ${money(D.homeWage)} machine operator does not become an electronics assembler by being told that the economy has gained. Fourth, can the state collect? Every benefit that runs through the government — the second, and most of what answers the first, third and fifth costs — depends on revenue that transfer pricing can move offshore, and a country that cannot police a ${mn(N.licence / 1_000_000)} licence fee has fewer tools than the argument assumes. An answer that names which of those four applies to the economy in the extract, and says what would have to be true for the verdict to reverse, has done what the command word asks.`,
    },
    {
      title: 'Why the same event appears as a benefit and as a cost',
      content: `Nothing in this topic is a benefit or a cost in itself, and the twelve items on the specification's two lists are not twelve events: several are one event seen from two chairs. The clearest is the price fall. A device falling from ${money(D.homePrice)} to ${money(D.openPrice)} is the fourth benefit — ${mn(D.csGain / 1_000_000)} of consumer surplus, ${mn(D.toExisting / 1_000_000)} to households already buying and ${mn(D.toNew / 1_000_000)} to households that could not afford one — and it is also the first cost, because the producer that had been charging ${money(D.homePrice)} cannot cover its average cost at the new price and its ${qty(D.homeWorkers)} workers lose ${money(D.homeWage)} jobs. Both are true, both are consequences of the same tariff removal, and neither cancels the other. The same doubling appears in tax: the second benefit is the ${mn(N.revenue / 1_000_000)} a foreign plant pays, and the fourth cost is the ${mn(N.revenueLost / 1_000_000)} of it that a licence fee can move to a ${pct(N.lowRate)} jurisdiction — one flow, counted twice, in opposite directions. What this means for an answer is practical rather than philosophical. First, do not argue that a cost is not really a cost because the economy gained overall: the gain is aggregate and the loss is particular, and the ${qty(D.homeWorkers)} are not consoled by the arithmetic. Second, when a question asks whether globalisation has benefited an economy, the honest structure is not benefits-then-costs but effect-by-effect, saying for each who gained, who lost and by how much. Third, the specification's own word is "possible" in both headings, and it is doing real work: whether the price fall is mostly benefit or mostly cost in a particular country depends on how many people worked in the industry that closed and how quickly they can work somewhere else.`,
    },
  ],
};
