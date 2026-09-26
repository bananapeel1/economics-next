/**
 * PACKET 43 — economic-growth assessment: the quiz bank, the practice items, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE PINS ARE DERIVED, WHICH IS `structure-05` AND `structure-06` ──────────
 *
 * The live section pins quiz `[0] [1] [2] [3] [4] [5]` — the first six items, one per block, the
 * identity sequence `pins.identity` exists to catch — so eighteen of twenty-four items are reached
 * only by the pre-test's draw or the Quiz tab (`structure-06`). Its practice pins reach three of
 * five items, and give the trade-cycle chapter "Define economic growth" (`structure-05`). Here
 * every item carries its own chapter, the indices are DERIVED from those tags by the runner, and
 * exactly three items are left unpinned — the pre-test's slice size (packet 15).
 *
 * ── THE PRACTICE SET IS REPLACED, BECAUSE FOUR OF FIVE CARRY AN IMPOSSIBLE TARIFF ──
 *
 *     Define 4     practice-01: Define is 2 (Appendix 6, `econ_spec.txt:2703`)
 *     Explain 6    no ledger id names it: Explain is 4; 6 is Analyse's tariff
 *     Assess 10    practice-02: neither the command word nor the tariff exists in IAL Economics,
 *                  and "FDI in developing countries" is 4.3.6 (Unit 4)
 *     Outline 4    topFix-03: not a command word in this specification
 *     Evaluate 20  valid, KEPT in substance — and now reached, pinned to the costs chapter
 *
 * Ten items cover all nine (command, tariff) pairs Appendix 6 defines, every chapter has at least
 * one, and every item above 6 marks carries a Level ladder in its guidance — 1-3 for Examine 8, 1-4 for
 * Discuss 14 and Evaluate 20, the convention packets 37, 40 and 42 shipped — with no point allocation
 * and no "levels-marked" marking claim (DECISIONS 2026-09-16 item 3) (`topFix-03`, `practice-02`).
 * FDI is asked about in 2.3.5's own terms — a cause of POTENTIAL growth (1d-1) — not as development.
 *
 * ── NO GUIDANCE OPENS WITH ITS MARK SCHEME (practice.opening) ─────────────────
 *
 * `InlinePractice.jsx` prints `guidance.split('\n')[0]` above the answer box in guided mode. Every
 * first paragraph below is a scaffold with no figure, no mark allocation and no answer.
 */
import { SECTION, id, hash8, ECON, bn, pct, mn, usd } from './_packet43-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet43-content.mjs';

const E = ECON;
const bn2 = (n) => `$${n.toFixed(2)}bn`;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * THE KEY IS DEALT INTO A POSITION by ranking the items on a hash of their own stem (packet 36), so
 * the histogram is a property of construction. No explanation names an option by position or
 * letter: the dealing moves the key after the explanation was written (packet 26).
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
  /* ── the pre-test pool: three items, unpinned, FIRST, answerable from chapter 1 ── */
  qi(null, 'Which of these is an example of potential economic growth?',
    ['A rise in the output the economy could produce with every resource employed', 'A rise in real output as laid-off workers are rehired', 'A switch of resources from one good to another at full employment', 'A rise in the price level with no change in real output'],
    'Potential growth is a rise in productive capacity, which is what the economy could produce with everything employed. Rehiring idle workers raises actual output towards capacity without raising capacity, and switching resources between goods at full employment is a reallocation.'),
  qi(null, 'On a production possibility frontier, actual growth that uses spare capacity is shown by:',
    ['a movement from inside the frontier towards it', 'a movement along the frontier', 'an outward shift of the frontier', 'an inward shift of the frontier'],
    'An economy with idle resources sits inside its frontier, and putting them to work moves it towards the frontier. A movement along the frontier is a reallocation at full capacity, and an outward shift is potential growth.'),
  qi(null, 'With spare capacity in the economy, a rise in which of these would cause actual growth through aggregate demand?',
    ['Export sales', 'Import purchases', 'Household saving', 'Income tax paid'],
    'Exports are a component of aggregate demand, so more foreign orders mean more demand for domestic output, which firms with spare capacity can meet by producing more. Imports, saving and taxes are withdrawals: a rise in any of them reduces aggregate demand.'),

  /* ── Chapter 1 — actual and potential growth ────────────────────────────── */
  qi(B1, 'Real GDP rises by 3% in a year in which productive capacity rises by 2.5%. This is:',
    ['actual growth faster than potential growth', 'potential growth faster than actual growth', 'a movement along the production possibility frontier', 'a rise in the price level with no rise in output'],
    'Real GDP measures actual output and capacity measures potential output, so output rising faster than capacity means actual growth is outrunning potential growth. It can do so only while there is spare capacity to use up.'),
  qi(B1, 'Which is most likely to raise real output WITHOUT raising the price level?',
    ['A rise in aggregate demand when there is plenty of spare capacity', 'A rise in aggregate demand when the economy is at full capacity', 'A rise in aggregate demand when capacity is running short', 'A fall in aggregate demand when there is plenty of spare capacity'],
    'Where the Keynesian long-run AS curve is flat, firms have idle workers and machines and can supply more at the same prices. At full capacity extra demand can only raise prices, and where capacity is running short it raises both output and prices.'),
  qi(B1, 'Consumption is $300bn, investment $70bn, government spending $100bn, exports $180bn and imports $160bn. Aggregate demand is:',
    ['$490bn', '$810bn', '$650bn', '$470bn'],
    'Aggregate demand adds consumption, investment and government spending to net exports, which is exports minus imports: 300 plus 70 plus 100 plus 20. Adding imports instead of subtracting them, or leaving them out, counts foreign-produced goods as domestic demand.'),
  qi(B1, 'Export-led growth is growth that is:',
    ['driven mainly by rising sales to other economies', 'measured by the size of the trade surplus', 'caused by replacing imports with domestic goods', 'limited to economies that export raw materials'],
    'The phrase describes what drives growth: foreign demand for the economy\'s output. It says nothing about the trade balance, and a heavy exporter that imports many components can run a deficit while its growth is still export-led.'),
  qi(B1, 'Which is a reason international trade can raise an economy\'s rate of growth?',
    ['Export earnings pay for imported capital goods', 'Imports add directly to aggregate demand', 'Exports shrink the size of the market firms serve', 'Trade removes the need for domestic investment'],
    'Foreign currency earned by exporting pays for machinery and technology the economy cannot make itself, which raises capacity as well as output. Imports are a withdrawal from aggregate demand, and selling abroad enlarges rather than shrinks the market.'),

  /* ── Chapter 2 — the causes of potential growth ─────────────────────────── */
  qi(B2, 'Which is foreign direct investment that raises an economy\'s productive capacity?',
    ['A foreign firm building a new factory in the country', 'A foreign fund buying shares with no control of the firm', 'A foreign buyer purchasing an existing office tower', 'Foreign tourists spending more on hotel rooms'],
    'Direct investment means a foreign firm acquiring productive assets it controls, and a new factory is new capital that raises capacity. Buying shares without control, or buying an asset that already exists, changes ownership without adding to what the economy can produce.'),
  qi(B2, 'Investment spending affects economic growth because it:',
    ['raises AD when spent and capacity when installed', 'raises capacity only after the loan is repaid', 'raises AD but never affects capacity', 'lowers AD because it is financed by saving'],
    'Spending on capital goods is a component of aggregate demand the moment it happens, which adds to actual growth. The capital itself adds to capacity once it is working, which is potential growth.'),
  qi(B2, 'Which of these is a process innovation?',
    ['A factory adopts a method that cuts waste per unit', 'A firm launches a new flavour of soft drink', 'A retailer opens a second shop in another city', 'A bank raises the interest rate it pays savers'],
    'A process innovation is a new way of producing something that already exists, so a method that uses less material per unit raises output per unit of input. A new drink is a product innovation, and a second shop or a higher interest rate is not an innovation at all.'),
  qi(B2, 'Net migration of working-age people into an economy is most likely to:',
    ['raise its total potential output', 'lower its productive capacity', 'raise its output per worker automatically', 'leave its potential output unchanged'],
    'More people able and willing to work means the economy can produce more in total. Whether output per worker rises depends on how productive the new workers are and how much capital each has, so it is not automatic.'),
  qi(B2, 'How does a greater degree of competition raise potential growth?',
    ['Firms must raise productivity or lose customers to rivals', 'Prices rise, so firms can afford more investment', 'Firms merge, so they can share their spare capacity', 'Consumers spend more, so aggregate demand rises'],
    'Where rivals can take their customers, firms have to cut waste and adopt better methods, and weak firms exit, releasing resources to better users. That raises what the economy can produce, which is a supply-side effect rather than a rise in spending.'),
  qi(B2, 'An economy has 20 million workers, each producing $25,000 of output a year. Its productive capacity is:',
    ['$500bn', '$50bn', '$5,000bn', '$250bn'],
    'Capacity is the number of workers times output per worker: 20 million times $25,000 is $500,000 million, which is $500bn. The other figures come from slipping a power of ten or halving one of the two inputs.'),
  qi(B2, 'The labour force grows by 0.5% a year and output per worker by 2% a year. Potential output grows by about:',
    ['2.5%', '2%', '1.5%', '0.5%'],
    'Capacity is workers times output per worker, so its growth rate is roughly the sum of the two growth rates. Reading only the productivity figure, or only the labour force figure, leaves out half of what raises capacity.'),

  /* ── Chapter 3 — the benefits of growth ─────────────────────────────────── */
  qi(B3, 'Real GDP rises by 3% while the population rises by 4%. Real GDP per head has:',
    ['fallen', 'risen by 3%', 'risen by 7%', 'not changed'],
    'Output per person falls when the number of people grows faster than output, so the average person has fewer goods and services than before despite the rise in real GDP. That is why living standards are judged per head.'),
  qi(B3, 'An economy grows at 1.5% a year while its trend rate is 2.5%. Unemployment is most likely to:',
    ['rise, because output grows more slowly than capacity', 'fall, because output is still growing', 'stay unchanged, because growth is positive', 'fall, because productivity is rising'],
    'Capacity grows because the labour force and output per worker grow. When output grows more slowly than that, firms can meet demand without taking on all the workers the economy is adding, so unemployment rises even though output is growing.'),
  qi(B3, `Tax revenue is ${pct(E.taxShare)} of GDP. Real GDP rises from ${bn(E.actual[E.at(3)])} to ${bn(E.actual[E.at(4)])} and no tax rate changes. Revenue rises by about:`,
    [bn(E.taxTo - E.taxFrom), bn(E.actual[E.at(4)] - E.actual[E.at(3)]), bn(E.taxTo), '$0'],
    `The same share applied to a larger GDP raises more revenue, an increase of ${bn(E.taxTo - E.taxFrom)}. The tax base grew, so revenue rose with no change in any tax rate; the rise in GDP itself is not the rise in revenue.`),
  qi(B3, 'Why does economic growth tend to raise levels of investment?',
    ['Firms expect rising sales to use new capacity', 'Interest rates always fall when output grows', 'Consumer spending falls, which frees up funds', 'Governments require firms to invest more'],
    'Firms invest when they expect extra capacity to be used and paid for, and rising sales supply that expectation along with the profits to fund it. Nothing guarantees that interest rates fall during growth.'),
  qi(B3, 'Which benefit could a growing economy\'s government gain without raising any tax rate?',
    ['More revenue to spend on public services', 'A fall in the price level', 'A larger surplus on the balance of trade', 'Lower real incomes for taxpayers'],
    'Revenue rises because incomes, profits and spending — what is taxed — are all larger, and that revenue can pay for better schools, hospitals and roads. Growth does not normally lower the price level or improve the trade balance, and it raises rather than lowers real incomes.'),

  /* ── Chapter 4 — the costs of growth ────────────────────────────────────── */
  qi(B4, 'An economy at full capacity chooses to produce more capital goods. The opportunity cost is:',
    ['the consumer goods it can no longer produce now', 'the extra capital goods it produces', 'the money spent on the capital goods', 'the consumer goods it will gain in future'],
    'Opportunity cost is the next best alternative given up. At full capacity, resources moved to capital goods come out of consumer goods, so today\'s forgone consumption is the cost; the future consumption is the reward.'),
  qi(B4, 'Choosing more capital goods today is most likely to mean:',
    ['lower consumption now and higher consumption later', 'higher consumption now and higher consumption later', 'lower consumption now and lower consumption later', 'no change in consumption at any time'],
    'Fewer consumer goods can be produced while resources go to capital goods, but the extra capital shifts the frontier further out, so more can be consumed later. It is a trade-off between current and future living standards.'),
  qi(B4, 'Why does real GDP overstate the gain from growth that pollutes?',
    ['The damage is not subtracted from measured output', 'Real GDP counts the pollution twice', 'Real GDP leaves out all factory output', 'Pollution lowers the measured price level'],
    'Real GDP adds up the value of goods and services produced and takes nothing off for the harm pollution does to people who did not produce or buy the output. The output is counted in full while the damage is left out.'),
  qi(B4, 'Rapid growth is most likely to worsen the balance of trade because:',
    ['rising incomes raise spending on imports', 'rising incomes raise spending on exports', 'growth lowers the price of domestic goods', 'growth cuts imports of machinery'],
    'Households spend part of any rise in income on goods from abroad, and growing firms buy imported materials and machinery. Exports depend on the incomes of other economies, so they do not rise in step with domestic incomes.'),
  qi(B4, `Exports rise from ${bn(E.tradeEarly.X)} to ${bn(E.tradeLate.X)} and imports from ${bn(E.tradeEarly.M)} to ${bn(E.tradeLate.M)}. The balance of trade has moved from:`,
    [`a ${bn(E.balanceEarly)} surplus to an ${bn(-E.balanceLate)} deficit`, `a ${bn(E.balanceEarly)} deficit to an ${bn(-E.balanceLate)} surplus`, `a ${bn(E.balanceEarly)} surplus to a ${bn(E.balanceEarly - E.balanceLate)} deficit`, `an ${bn(-E.balanceLate)} surplus to a ${bn(E.balanceEarly)} deficit`],
    `The balance is exports minus imports: ${bn(E.tradeEarly.X)} minus ${bn(E.tradeEarly.M)} is a surplus of ${bn(E.balanceEarly)}, and ${bn(E.tradeLate.X)} minus ${bn(E.tradeLate.M)} is a deficit of ${bn(-E.balanceLate)}. The ${bn(E.balanceEarly - E.balanceLate)} figure is the size of the swing, not the deficit.`),
  qi(B4, 'Growth raises the poorest fifth\'s income by 5% and the richest fifth\'s by 20%. Which statement is correct?',
    ['Both are better off and inequality has increased', 'The poorest fifth are worse off than before', 'Inequality has fallen because both groups gained', 'Neither group\'s real income has changed'],
    'Both groups\' incomes rose, so both are better off than before, but the richer group\'s rose faster, so the gap between them widened. Inequality is about the spread of incomes, not whether the lowest incomes rose.'),
  qi(B4, 'Growth is most likely to bring rising inflation when:',
    ['aggregate demand grows faster than capacity', 'productive capacity grows faster than demand', 'there is a large amount of spare capacity', 'output per worker rises faster than wages'],
    'Once spare capacity is used up, extra demand meets firms that cannot produce more, so they raise prices. Capacity growing faster than demand, plenty of spare capacity, or productivity outpacing wages all ease the pressure on prices instead.'),

  /* ── Chapter 5 — output gaps ────────────────────────────────────────────── */
  qi(B5, 'The trend rate of growth is best described as:',
    ['the long-run growth rate of productive capacity', 'the growth rate in the most recent year', 'the highest growth rate the economy has reached', 'the growth rate of the price level'],
    'The trend is the average path over a long period, which is the rate at which potential output grows. Any one year can be above or below it, and the price level is a different measure altogether.'),
  qi(B5, 'Potential output is $500bn and actual output is $490bn. The output gap is:',
    ['negative, 2% of potential output', 'positive, 2% of potential output', 'negative, 10% of potential output', 'positive, $10bn'],
    'The gap is actual minus potential output: $490bn minus $500bn is minus $10bn, and $10bn is 2% of $500bn. Actual output below potential makes it a negative gap.'),
  qi(B5, 'An economy\'s output gap is negative and getting larger. Which must be true?',
    ['Actual output is growing more slowly than potential output', 'Real output is falling', 'The economy has had two quarters of negative growth', 'Inflation is rising rapidly'],
    'A negative gap widens whenever output grows more slowly than capacity, which can happen while output is still rising. Falling output is one way for it to widen, not the only one, and weak demand usually slows inflation rather than raising it.'),
  qi(B5, 'Which combination is most consistent with a positive output gap?',
    ['Labour shortages and rising inflation', 'High unemployment and falling inflation', 'Spare capacity and weak investment', 'Unsold stock and widespread price cuts'],
    'In a positive gap demand is pressing against capacity, so firms struggle to recruit and costs and prices rise. High unemployment, idle capacity and unsold stock are the marks of a negative gap.'),
  qi(B5, 'A large negative output gap is most likely to allow:',
    ['aggregate demand to rise without much rise in the price level', 'the price level to rise without any rise in demand', 'output to stay above capacity permanently', 'unemployment to fall with no rise in output'],
    'With idle workers and machines, firms can meet extra demand by producing more rather than by raising prices, because the Keynesian long-run AS curve is flat there. That room is why an economy can grow faster than its trend for a while without inflation.'),
  qi(B5, 'Output gaps are hard to measure mainly because:',
    ['potential output can only be estimated', 'actual output is never measured', 'real GDP ignores the price level', 'capacity is set by the government'],
    'Actual output is measured, if imperfectly; potential output is what the economy could produce and is never observed, so it has to be estimated from assumptions about the trend. Real GDP is adjusted for prices, which is what makes it real.'),
  qi(B5, 'Assuming capacity has grown at 2%, 2.5% or 3% a year gives the same year\'s output gap as +1%, 0% or −1%. This shows that:',
    ['the gap depends on how capacity is estimated', 'actual output was measured three times', 'the economy grew at three different rates', 'the output gap is always zero on average'],
    'The actual output figure is the same in every case; only the assumed growth of capacity differs. Because potential output is estimated, a different assumption produces a different gap, and even a different sign.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  /*
   * ORDER IS A DECISION (structure-05). A check-in shows ONE practice item — the first unused index
   * of its pin (`resolvePinnedItem`, components/learn-mode/utils.js:111-113) — so each chapter's
   * FIRST item is the one Learn Mode surfaces: Define 2 (worked), Analyse 6, Examine 8, Evaluate 20,
   * Discuss 14 (independent). The live section never surfaced its 20-mark item. The second item of
   * each chapter is reached from the Practice tab.
   */
  pr(B1, 'Define', 2, "Define the term 'potential economic growth'. (2 marks)",
    `A definition has two parts to it, so say what increases and then say what that thing means. Be careful not to define actual growth by mistake: the two terms are the pair most often swapped.\nAn increase in an economy's productive capacity (1 mark), meaning the real output it could produce if all its resources were fully and efficiently employed (1 mark). "An increase in real GDP" defines actual growth and earns nothing here; "when LRAS shifts right" or "when the PPF shifts out" describes how it is shown, which can support a definition but does not replace one.`),

  pr(B1, 'Explain', 4, 'Explain how an increase in exports may lead to actual economic growth. (4 marks)',
    `This asks for an impact, so it needs a chain of two linked steps, not a single assertion. Decide which part of aggregate demand exports belong to before you start, and say what has to be true of the economy for extra demand to become extra output.\nKnowledge and understanding: exports are a component of aggregate demand, so a rise in exports raises AD (1 mark). Application: foreign buyers ordering more means domestic firms receive more orders for their output (1 mark). Analysis, first stage: where there is spare capacity, firms meet the orders by producing more, so real output rises (1 mark). Analysis, second stage: the incomes earned are partly spent again, so AD and output rise by more than the first rise in exports — the multiplier of topic 2.3.4 (1 mark). An answer that says exports rise so GDP rises has the knowledge and none of the chain.`),

  pr(B2, 'Analyse', 6, 'Analyse how foreign direct investment may increase an economy\'s potential growth. (6 marks)',
    `Analyse asks for depth rather than breadth, so choose one route by which FDI raises capacity and follow it all the way, rather than listing several. Keep the two sides of the economy separate: the spending is demand today, and the thing it builds is capacity later — potential growth is about the second.\nKnowledge and understanding: foreign direct investment is investment by a foreign firm in productive assets it controls, such as a new plant (1 mark). Application: it adds to the host economy's stock of capital, often bringing technology and finance local firms could not supply (1 mark). Analysis, first stage: with more and better capital, each worker can produce more, so labour productivity rises (2 marks). Analysis, second stage: higher productivity raises the output the economy could produce with all resources employed, so long-run aggregate supply shifts right and the frontier moves out (2 marks). Credit is available for a second route, such as local suppliers adopting the foreign firm's methods, if it is carried through to capacity. A foreign purchase of existing shares or buildings adds no capacity and earns nothing.`),

  pr(B2, 'Calculate', 4, `${E.country} has ${mn(E.workers)} workers, each producing ${usd(E.outputPerWorker)} of output a year. Next year its labour force grows by ${pct(E.labourGrowth)} and output per worker by ${pct(E.productivityGrowth)}. Calculate the percentage growth in ${E.country}'s productive capacity, to two decimal places. (4 marks)`,
    `Productive capacity is the number of workers multiplied by what each produces, so work out this year's figure and next year's figure separately before comparing them. Keep the units straight throughout: workers are in millions and output per worker is in dollars.\nStage 1 — this year's capacity: ${mn(E.workers)} × ${usd(E.outputPerWorker)} = ${bn(E.capacityCheck)} (1 mark). Stage 2 — next year's inputs: ${mn(E.nextWorkers)} workers and ${usd(E.nextOutputPerWorker)} per worker (1 mark). Stage 3 — next year's capacity: ${mn(E.nextWorkers)} × ${usd(E.nextOutputPerWorker)} = ${bn2(E.nextCapacity)} (1 mark). Stage 4 — growth: (${bn2(E.nextCapacity)} − ${bn(E.capacityCheck)}) ÷ ${bn(E.capacityCheck)} × 100 = ${E.capacityGrowth.toFixed(2)}% (1 mark). Adding the two growth rates gives 2.5%, which is close but not the answer to two decimal places; the product of the two growth factors is exact.`),

  pr(B3, 'Examine', 8, 'Examine the likely benefits of economic growth for firms. (8 marks)',
    `Examine asks for a chain of reasoning and a brief assessment, so develop one or two benefits fully rather than listing several, and then say what might limit them. Think about which firms gain most, and about what happens to firms' costs as well as their sales.\nLevel 1 asserts that growth is good for firms, with no mechanism and no qualification. Level 2 explains one benefit as a chain: rising real incomes raise household spending, so most firms sell more, and because many costs do not rise in step with sales, profits rise. Level 3 develops a second chain and connects the two: firms expecting growth to continue invest to meet future demand, funded by the higher retained profits, and the investment raises both demand now and the firms' capacity later. The brief assessment that lifts an answer to the top of the range recognises that the benefits are uneven and can be offset: when growth runs ahead of capacity, wages and input costs rise and squeeze margins; a growing market attracts new entrants and imports; and firms selling goods people buy less of as they get richer may lose sales.`),

  pr(B3, 'Calculate', 2, `Tax revenue in an economy is ${pct(E.taxShare)} of GDP. Real GDP rises from ${bn(E.actual[E.at(3)])} to ${bn(E.actual[E.at(4)])} and no tax rate changes. Calculate the increase in tax revenue. (2 marks)`,
    `Work out revenue at each level of GDP using the same share, then compare the two, rather than trying to find the increase in one step. Set out each line so that the method is visible.\nRevenue before: ${pct(E.taxShare)} × ${bn(E.actual[E.at(3)])} = ${bn(E.taxFrom)}; revenue after: ${pct(E.taxShare)} × ${bn(E.actual[E.at(4)])} = ${bn(E.taxTo)} (1 mark). Increase: ${bn(E.taxTo)} − ${bn(E.taxFrom)} = ${bn(E.taxTo - E.taxFrom)} (1 mark). An answer of ${bn(E.actual[E.at(4)] - E.actual[E.at(3)])} has found the rise in GDP, not in revenue.`),

  pr(B4, 'Evaluate', 20, 'Evaluate whether economic growth is always desirable for an economy. (20 marks)',
    `Evaluate asks you to reach a judgement supported by multi-stage chains, so decide early what your judgement will depend on — the source of the growth, how fast it is compared with capacity, who receives the gains. A judgement with no stated conditions is an assertion. Plan where a diagram would make one of your chains clearer.\nLevel 1 lists benefits or costs of growth with little support. Level 2 explains one side with chains: rising real GDP per head raises living standards; firms producing more need more workers, so unemployment falls; rising profits fund investment; a larger tax base raises revenue with no change in tax rates, paying for improved public services. Level 3 develops both sides, the costs as fully as the benefits: at full capacity, more capital goods now means fewer consumer goods now, the opportunity cost of future growth, shown with two points on a production possibility frontier; pollution and depletion are not subtracted from GDP; rising incomes pull in imports, pushing the balance of trade into deficit; gains can concentrate among some skills, owners or regions, increasing inequality; and demand growing faster than capacity brings inflation. Level 4 reaches a supported judgement by questioning the word "always". Growth driven by rising capacity raises output while easing inflation, whereas growth driven by demand beyond capacity does not last; growth that changes how goods are produced can cut the damage per unit of output; and the benefits and costs fall on different people and at different times. A judgement naming the kind of growth that is desirable and the conditions under which it is not, supported by the chains above it, is what the command word asks for; a list of benefits followed by a list of costs is not.`),

  pr(B4, 'Explain', 4, 'Explain why rapid economic growth may lead to a balance of trade deficit. (4 marks)',
    `This asks for a reason, so build a two-step chain from growth to the trade balance. Be clear which of the two flows — exports or imports — your chain moves, and in which direction.\nKnowledge and understanding: the balance of trade is the value of exports minus the value of imports (1 mark). Application: rapid growth means real incomes are rising quickly (1 mark). Analysis, first stage: households spend part of their extra income on imported goods, and expanding firms buy more imported materials and machinery, so imports rise (1 mark). Analysis, second stage: exports depend on other economies' incomes and do not rise in step, so imports outgrow exports and the balance moves into deficit (1 mark). A developed alternative — domestic prices rising faster than trading partners', making exports less competitive — earns the same credit if carried through to the balance.`),

  pr(B5, 'Discuss', 14, 'Discuss whether a positive output gap is a problem for an economy. (14 marks)',
    `Discuss asks for chains of reasoning and for different viewpoints to be recognised, so set out what a positive gap looks like and then weigh the view that it is a problem against the view that it is not. The strongest answers ask how large the gap is, how long it lasts, and how sure anyone can be that it exists.\nLevel 1 states that a positive gap means actual output is above potential output, with little development. Level 2 explains how that is possible for a while — through overtime, extra shifts and postponed maintenance — and follows one consequence as a chain. Level 3 develops the problems as chains: demand pressing against capacity raises wages and input costs, so inflation rises and erodes real incomes and savings; domestic firms cannot meet demand, so imports rise and the balance of trade worsens; postponed maintenance and exhausted workers reduce future output; and the central bank is likely to raise interest rates, slowing the economy sharply. Level 4 recognises the other viewpoint: in the short run employment and incomes are high, a small gap may close on its own, and some of the pressure may prompt investment that raises capacity. The critical assessment the top level needs should turn on measurement: potential output is estimated, not observed, so a gap reported as positive may be smaller, or even negative, once capacity is re-estimated — and policy taken against a gap that does not exist does harm of its own.`),

  pr(B5, 'Draw', 4, 'Draw an AD/AS diagram, using a Keynesian long-run aggregate supply curve, to show an economy with a negative output gap. (4 marks)',
    `Decide first which shape of aggregate supply curve you need and where on it an economy with spare capacity sits. Label the axes before anything else, and mark full-capacity output so that the gap has two ends to measure between.\nAxes labelled price level (vertical) and real output (horizontal) (1 mark). A Keynesian long-run AS curve drawn flat, then rising, then vertical at full-capacity output, labelled Yf (1 mark). AD drawn crossing the AS curve to the left of Yf, with the equilibrium output labelled Ye (1 mark). The distance between Ye and Yf identified as the negative output gap (1 mark). Placing AD where it crosses the vertical section shows an economy at full capacity, with no negative gap.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('Define actual economic growth.', 'An increase in real GDP — more goods and services produced, measured at constant prices.'),
  fc('Define potential economic growth.', 'An increase in productive capacity: the real output an economy could produce if all its resources were fully and efficiently employed.'),
  fc('How is actual growth from spare capacity shown on a PPF?', 'As a movement from a point inside the frontier towards it. A movement ALONG the frontier is reallocation, not growth.'),
  fc('How is potential growth shown?', 'As an outward shift of the production possibility frontier, or a rightward shift of the long-run aggregate supply curve.'),
  fc('What causes actual growth?', 'An increase in any component of aggregate demand — consumption, investment, government spending or net exports — while there is spare capacity to meet it.'),
  fc('Why does it matter whether there is spare capacity when AD rises?', 'With spare capacity, extra demand raises output; near full capacity it raises output and prices; at full capacity only prices.'),
  fc('What is export-led growth?', 'Growth driven mainly by rising exports — foreign demand for the economy\'s output.'),
  fc('Give three reasons trade matters for growth.', 'A bigger market than the home economy; economies of scale from longer production runs; foreign currency to pay for imported capital goods. Competition with the best producers abroad is a fourth.'),
  fc('Name the four causes of potential growth.', 'Domestic investment and foreign direct investment; innovation; growth in the size of the labour force, including net migration; the degree of competition.'),
  fc('What is foreign direct investment?', 'Investment by a foreign firm in productive assets it controls, such as a new plant. It adds capital, and often brings technology and finance.'),
  fc('Why does investment affect both actual and potential growth?', 'The spending is part of aggregate demand when it happens; the capital adds to capacity once it is installed.'),
  fc('Distinguish process from product innovation.', 'Process innovation is a new way of producing an existing good, raising output per unit of input. Product innovation is a new good or service.'),
  fc('How does net migration affect potential output?', 'Working-age migrants add to the labour force at once, raising total potential output. Output per head depends on their productivity.'),
  fc('How does the degree of competition raise potential growth?', 'Firms facing rivals must cut waste and adopt better methods or lose customers; weak firms exit and their resources move to better users.'),
  fc('Why does productivity matter for the RATE of growth?', 'The labour force can only grow so fast; productivity growth has no such ceiling, and it compounds. At about 2.5% a year output doubles in about 28 years; at about 1.5%, about 46.'),
  fc('List the six possible benefits of growth.', 'Higher living standards; lower unemployment; increased profits for firms; higher levels of investment; increased tax revenues; improved public services.'),
  fc('Why does tax revenue rise during growth?', 'Incomes, profits and spending — the tax base — all grow, so revenue rises even with no change in tax rates.'),
  fc('List the five possible costs of growth.', 'Opportunity costs; environmental costs; balance of trade deficits; increased inequality; inflation.'),
  fc('What is the opportunity cost of growth?', 'Producing more capital goods now means fewer consumer goods now — current living standards given up for higher future ones.'),
  fc('Why can growth lead to a balance of trade deficit?', 'Rising incomes raise spending on imports, output is diverted from exports to the home market, and domestic prices may rise faster than trading partners\'.'),
  fc('When is inflation a cost of growth?', 'When aggregate demand grows faster than capacity. Growth that comes from rising capacity can ease inflation instead.'),
  fc('What is the trend rate of growth?', 'The long-run average growth rate of an economy\'s productive capacity. Actual growth is above it in some years and below it in others.'),
  fc('Define the output gap.', 'Actual output minus potential output, usually as a percentage of potential output. Negative when actual is below potential; positive when it is above.'),
  fc('Is a negative output gap the same as falling output?', 'No. The gap widens whenever output grows more slowly than capacity, which can happen while output is still rising.'),
  fc('Characteristics of a positive output gap?', 'Labour shortages, rising inflation, capacity used at full stretch, lengthening delivery times, rising imports.'),
  fc('Characteristics of a negative output gap?', 'Higher unemployment, low inflation, spare capacity, weak investment.'),
  fc('Why are output gaps hard to measure?', 'Potential output is never observed and must be estimated; the trend rate can change unnoticed; GDP data are revised; some spare capacity is hidden from the unemployment figures.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

/*
 * `structure-07`: three live misconceptions were exam technique ("students forget to explain the
 * cause") or scope notes, not beliefs. Every one below is a belief about the economics that is
 * wrong; technique lives in `examMatters`.
 */
const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Calling a movement along the PPF growth',
    '"Actual growth is shown by a movement along the production possibility frontier."',
    'A movement along the frontier happens at full capacity: more of one good means less of the other, so total output cannot rise. It shows reallocation and its opportunity cost.',
    'Show actual growth from spare capacity as a move from a point inside the frontier towards it, and potential growth as an outward shift.'),
  mk('Treating any rise in AD as growth',
    '"An increase in aggregate demand always increases real output."',
    'Extra demand becomes extra output only while there is spare capacity. Near full capacity much of it raises the price level, and at full capacity all of it does.',
    'Say where the economy is standing: with spare capacity, AD-led growth raises output; close to capacity, it mainly raises prices.'),
  mk('Assuming more workers means higher living standards',
    '"Net migration raises the labour force, so living standards rise."',
    'A larger labour force raises total output. Output per head rises only if the extra workers are at least as productive, with enough capital each.',
    'Separate total output from output per head, and link living standards to productivity.'),
  mk('Reading a trade deficit during growth as failure',
    '"The trade balance has gone into deficit, so the economy is doing badly."',
    'In rapid growth, imports rise BECAUSE incomes and investment are rising. The deficit is a possible cost to be financed, not proof of weakness.',
    'Ask what the imports are and whether the deficit can be financed and will persist.'),
  mk('Saying growth causes inflation',
    '"Economic growth leads to inflation."',
    'Growth that comes from rising capacity can lower inflation. It is demand growing faster than capacity that raises the price level.',
    'Tie inflation to capacity: growth above the trend rate uses up spare capacity, so further increases in AD raise prices.'),
  mk('Reading a negative output gap as shrinking output',
    '"A negative output gap means the economy is shrinking."',
    'The gap is the LEVEL of output against capacity. It widens whenever output grows more slowly than capacity, even if output is still rising.',
    'Compare the growth rate with the trend rate to see which way the gap is moving, and state the gap with its sign.'),
  mk('Treating a positive output gap as success',
    '"A positive output gap is good because output and employment are high."',
    'Output above potential cannot be sustained. It brings labour shortages, inflation and rising imports, and usually ends with policy slowing the economy.',
    'Describe a positive gap as overheating: a short-run gain with costs that arrive later.'),
  mk('Treating rising inequality as the poor getting poorer',
    '"Growth increased inequality, so the poorest are worse off."',
    'Inequality is the gap between incomes. The poorest can be better off than before while their share of total income falls.',
    'Distinguish what happened to each group\'s income from what happened to the gap between them.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'Export-led growth, from a foreign order to higher capacity',
      steps: [
        `Foreign buyers order more of ${E.country}'s electronics. Exports are an injection, so aggregate demand rises — ${bn(E.exportRise)} of new demand before any multiplier effect.`,
        'With spare capacity, firms meet the orders by producing more, so real output rises: actual growth.',
        'Longer production runs let firms benefit from economies of scale, which cuts average cost and makes the exports more competitive still.',
        'The foreign currency earned pays for imported machinery the economy cannot make itself.',
        'The new machinery raises what each worker can produce, so capacity rises too: potential growth.',
      ],
      result: 'Trade drove both kinds of growth — demand first, capacity after. The same chain runs in reverse when the economies buying the exports slow down, which is the risk built into the strategy.',
    },
    {
      title: 'Rapid growth and the balance of trade',
      steps: [
        'Real incomes in the economy rise quickly as growth runs above its trend.',
        'Households and firms spend more of their extra income on goods from abroad.',
        'Import spending grows faster than export earnings, which depend on other economies\' incomes.',
        `The trade balance moves from surplus into deficit: ${E.country}'s ${bn(E.balanceEarly)} surplus in Year 3 became a ${bn(-E.balanceLate)} deficit by Year 7.`,
      ],
      result: 'A balance of trade deficit is a possible cost of growth, not proof of failure. It matters when it persists and has to be financed by borrowing from abroad.',
    },
    {
      title: 'Growth above trend, from a negative gap to a positive one',
      steps: [
        `In Year 3 output is ${bn(E.neg.actual)} against a capacity of ${bn(E.neg.potential)}: a negative gap of ${pct(E.neg.gapPct, { signed: true })}, with idle workers and machines.`,
        `From Year 4 AD rises faster than capacity, and output grows ${pct(E.growth[E.at(4)])} a year against a trend of ${pct(E.trendRate)}.`,
        'Spare capacity is used up without much rise in prices, and by Year 5 the gap has closed.',
        `Growth stays above trend, and by Year 7 output is ${bn(E.pos.actual)} against ${bn(E.pos.potential)}: a positive gap of ${pct(E.pos.gapPct, { signed: true })}.`,
        'Firms compete for scarce workers, wages and input costs rise, and inflation rises with them.',
      ],
      result: 'The same growth rate was harmless while there was slack and inflationary once there was none. What decides it is the level of output against capacity, which is what the output gap measures.',
    },
    {
      title: 'Foreign direct investment and potential growth',
      steps: [
        'A foreign firm builds a new plant. The construction spending is investment, part of aggregate demand now.',
        'The plant opens, adding to the stock of capital and bringing production methods local firms did not have.',
        'Local suppliers and workers learn the new methods, so productivity rises beyond the plant itself.',
        'The economy can produce more with the same resources: long-run aggregate supply shifts right.',
      ],
      result: 'FDI raised actual growth while the plant was being built and potential growth once it was working. Buying existing shares or buildings would have done neither.',
    },
  ],
  evaluation: [
    {
      title: 'It depends on where the economy is standing',
      content: 'The same rise in aggregate demand does very different things with spare capacity and at full capacity. With a negative output gap it is mostly extra output and jobs; with a positive gap it is mostly inflation and imports. Any judgement on demand-led growth should say how much slack there is — and since that is an estimate, how confident anyone can be about it.',
    },
    {
      title: 'The source of growth decides its costs',
      content: 'Growth driven by rising capacity — investment, innovation, productivity — raises output while easing inflation and can reduce the damage per unit of output. Growth driven by demand beyond capacity brings inflation, trade deficits and a later slowdown. Asking where growth comes from is usually the strongest evaluation of whether its costs outweigh its benefits.',
    },
    {
      title: 'Now or later',
      content: 'Faster growth in future usually costs consumption today: resources moved into capital goods are not available for consumer goods. How much present consumption to give up is a judgement about current against future living standards, and different households and governments reasonably make it differently.',
    },
    {
      title: 'Possible, not certain',
      content: 'Every benefit and every cost in this topic is a POSSIBLE one. Growth need not reduce unemployment if it is below trend, need not raise public services if revenue is spent badly, need not widen inequality if it creates jobs for lower-paid workers, and need not damage the environment if it changes how goods are produced. Naming the condition is what turns a list into an argument.',
    },
  ],
};
