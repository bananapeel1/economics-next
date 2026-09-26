/**
 * PACKET 44 — aggregate-supply assessment: the quiz bank, the practice items, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED ──────────────────────────────────────────
 *
 * `topFix-05` names five duplicate pairs in the live bank (Q11=Q1, Q13=Q5, Q14=Q4, Q19=Q8, Q24~Q18)
 * and asks for Q20 to be rewritten to name the Keynesian model. Eleven of the live 25 also test
 * equilibrium, AD/AS events and output gaps, which this section no longer teaches because they are
 * 2.3.4's and 2.3.5's leaves. Pruning five and editing one would leave a bank that tests topics its
 * own section does not teach, so the bank is authored from scratch against the five chapters, and
 * the runner refuses near-duplicate stems (`quiz.near-dup`, token Jaccard ≥ 0.5) as it builds.
 *
 * ── THE PINS ARE DERIVED, WHICH IS `topFix-02`, `structure-01` AND `structure-02` ─
 *
 * The live LRAS block's inline quiz was an SRAS-shift question, and the SRAS block's inline practice
 * was "Define LRAS (4)". Hand-mapping indices fixes one instance; tagging every item with its own
 * block and deriving `quizIndices` / `practiceIndices` from the tag makes the defect
 * unrepresentable. `structure-02`'s code half is already true on this branch AND on origin/main:
 * `lib/checkin-placement.js:51` resolves `practiceIndices` against the RAW practice order, not the
 * marks-sorted copy, so a pin names the item it was authored against.
 *
 * ── THE PRACTICE SET IS REPLACED ─────────────────────────────────────────────
 *
 * Appendix 6 (`econ_spec.txt:2696-2745`) is the whole IAL Economics taxonomy: Define 2, Calculate
 * 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live five are
 * "Define (4)" — `practice-01`; "Explain … (6)"; "Assess … (10)"; "Outline … (4)"; and one valid
 * Evaluate (20) whose subject, AS against AD as a route to growth, is 2.3.4's. Nine items here: one
 * per command word and both Calculate tariffs, every one on this section's own leaves.
 */
import { id, hash8, ECON, bn, mn, pct, idx, money } from './_packet44-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet44-content.mjs';

const E = ECON;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST AND THE KEY IS THEN DEALT INTO A POSITION by ranking the
 * items on a hash of their own stem (packet 36). No explanation names an option by position or by
 * letter, because the dealing moves the key after the explanation was written.
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
  /* ── the pre-test pool: three items, unpinned, FIRST, all answerable from chapter one ── */
  qi(null, 'On an aggregate supply diagram, the vertical axis measures:',
    ['the price level', 'the price of one good', 'the interest rate', 'the level of employment'],
    'Aggregate supply is drawn against the average of all prices in the economy, written as an index. The price of a single good belongs on a market supply diagram, which is exactly the confusion the axis label exists to prevent.'),
  qi(null, 'In the short run, the aggregate supply curve slopes upward mainly because:',
    ['some costs, such as contracted wages, have not yet risen', 'firms always want to earn more profit', 'households buy more goods whenever prices rise', 'the economy\'s resources have grown over time'],
    'A higher price level raises what each unit earns while wages fixed in contracts stay put, so profit per unit rises and extra output pays. Wanting profit explains nothing on its own, households buying more is the demand side, and a growth in resources would shift the curve rather than explain its slope.'),
  qi(null, 'A rise in the general price level, with nothing else changing, causes:',
    ['a movement along the SRAS curve', 'a rightward shift of SRAS', 'a leftward shift of SRAS', 'a shift of the LRAS curve'],
    'The price level is on the vertical axis, so a change in it moves the economy along the curve it is already on. A shift needs a cause that is not on either axis, such as a change in costs or in productive capacity.'),

  /* ── Block 1 · The Characteristics of AS ─────────────────────────────────── */
  qi(B1, 'Real national output is used on the horizontal axis because it is:',
    ['valued at constant prices', 'measured only for goods, not services', 'counted after tax has been paid', 'valued at the prices of the current year'],
    'Constant prices strip out changes in the price level, so a rise in real output means more goods and services were actually produced. Current-year prices would mix up producing more with the same things costing more.'),
  qi(B1, 'Which of these would shift the SRAS curve rather than cause a movement along it?',
    ['A rise in the price of imported fuel', 'A rise in the general price level', 'A fall in the general price level', 'Firms supplying more as prices rise'],
    'Dearer fuel raises costs at every level of output, so firms supply less at each price level and the whole curve moves. The other three describe the price level changing, or firms responding to it, which is a movement along the curve.'),
  qi(B1, 'Which statement about the short run and the long run in AS analysis is correct?',
    ['In the long run, every input cost has time to adjust', 'In the short run, every input cost adjusts at once', 'The long run is always exactly one year', 'In the long run, wages are fixed by contract'],
    'The two horizons are defined by costs, not by the calendar. In the short run some costs, such as contracted wages, are fixed; in the long run all of them have caught up with the price level.'),
  qi(B1, 'Prices across an economy rise by 4% while wages in current contracts are unchanged. Firms are most likely to:',
    ['increase output, because profit per unit has risen', 'reduce output, because costs have risen', 'leave output unchanged, because wages are fixed', 'reduce output, because demand has fallen'],
    'Selling prices have risen over costs that have not moved, so each unit earns more and producing extra units becomes worthwhile. Costs have not risen, and fixed wages are the reason output rises rather than a reason it stays put.'),
  qi(B1, 'On a vertical LRAS curve, a rise in the price level leads to:',
    ['no change in real output', 'a rise in real output', 'a fall in real output', 'a rightward shift of LRAS'],
    'A change in the price level is a movement along the curve, and along a vertical curve real output does not change at all. Only a change in productive capacity, which is a shift, moves long-run output.'),

  /* ── Block 2 · What Shifts Short-Run AS ──────────────────────────────────── */
  /* Packet 44 fix round: 20% × 10% = 2% sat under the check-in's tax view, "Tax adds 2% to the
   * cost of each unit" (audit/runs/packet-44/leak-probe.mjs). 40% × 10% = 4% is on no B2 surface.
   * The three fix-round stems are worded so each hashes into its predecessor's rank: placeKeys deals
   * every key by rank, so any other wording would re-deal the keys of 18 unchanged, published items. */
  qi(B2, 'Energy accounts for 40% of firms\' costs and the price of energy rises by 10%. By how much do unit costs rise?',
    ['4%', '10%', '40%', '50%'],
    'The rise in unit costs is the input\'s share of costs times the rise in its price: 0.4 × 10% = 4%. Using the price rise alone assumes energy is the whole of firms\' costs, and adding the two figures has no meaning.'),
  qi(B2, 'A depreciation of a country\'s currency is most likely to shift SRAS:',
    ['left, because imported inputs cost more', 'right, because exports become cheaper abroad', 'right, because imported inputs cost less', 'left, because the price level has risen'],
    'After a depreciation each unit of the currency buys less foreign currency, so imported materials and parts cost more at home and unit costs rise. Cheaper exports are an effect on aggregate demand, and a change in the price level would be a movement rather than a shift.'),
  qi(B2, 'Which tax change would shift the SRAS curve to the right?',
    ['A cut in excise duty on diesel', 'A cut in income tax for households', 'A rise in a payroll tax on employers', 'A rise in the sales tax rate'],
    'Duty on diesel is paid on every litre firms use, so cutting it lowers the cost of supplying output at every level. An income tax cut for households raises their spending, which is aggregate demand, and the two rises would shift SRAS the other way.'),
  qi(B2, 'Why is a rise in the world price of oil an SRAS shift rather than an LRAS shift?',
    ['It changes costs, not the economy\'s resources', 'It changes the price level, not costs', 'It affects exporting firms alone', 'It is permanent once it happens'],
    'The same workers, machines and land are still there after the oil price rises, so productive capacity is unchanged; what has changed is the cost of using them. That is also why the shift reverses if the price falls back.'),
  qi(B2, 'An appreciation cuts unit costs by 3% while a new tax raises them by 2%. The SRAS curve:',
    ['shifts right slightly', 'shifts left slightly', 'does not move', 'shifts left by 5 points'],
    'All three SRAS shifters act through unit costs, so their effects add: −3% + 2% = −1%. Unit costs are a little lower at every level of output, so firms supply slightly more at each price level.'),
  qi(B2, 'The size of the SRAS shift caused by a rise in an input\'s price depends mostly on:',
    ['that input\'s share of firms\' costs', 'the size of the labour force', 'the level of aggregate demand', 'the rate of income tax'],
    'A price rise in an input that is a small part of costs barely moves unit costs, while the same rise in a large one moves them a lot. The labour force and income tax concern other curves, and aggregate demand does not move the supply curve at all.'),

  /* ── Block 3 · The Shapes of Long-Run AS ─────────────────────────────────── */
  /* Packet 44 fix round (founder, 26 Sep): the spine's 40m × $20,000 = $800bn is printed in this
   * check-in's own caption and checklist, so the item transfers the rule to new figures. */
  qi(B3, `An economy has ${mn(25)} workers, each producing ${money(30000)} a year. Its productive capacity, per year, is:`,
    ['$750bn', '$75bn', '$7,500bn', '$30bn'],
    'Capacity is the number of workers times output per worker: 25 million × $30,000 = $750,000 million, which is $750bn. The other figures come from dropping or adding a factor of ten in the conversion.'),
  qi(B3, 'On the classical view, the LRAS curve is vertical because:',
    ['wages and prices adjust, so output returns to capacity', 'firms never change their output', 'the price level cannot change in the long run', 'aggregate demand is always at capacity'],
    'Classical economists argue that costs catch up with the price level, removing any lasting reason to produce more or less than capacity. Output is fixed in the long run; the price level is free to move, which is why the claim about prices has it backwards.'),
  qi(B3, 'In the classical model, after a fall in AD the economy returns to capacity because:',
    ['falling wages and costs shift SRAS to the right', 'the government raises its spending', 'LRAS shifts left to meet demand', 'the price level rises back to its old level'],
    'Unemployment pushes money wages down as contracts renew, costs fall, and SRAS moves right until it meets the lower AD curve at capacity. The adjustment needs no government action, and the price level ends lower, not back where it was.'),
  qi(B3, 'The horizontal range of the Keynesian LRAS curve exists because:',
    ['idle resources can be hired without raising costs', 'wages fall quickly when unemployment is high', 'every resource is already employed', 'firms cannot sell any more output'],
    'With many workers and machines unused, firms can bring them into production at the going wage, so output rises with no pressure on costs or the price level. Quickly falling wages is the classical assumption, and full use of resources describes the vertical range.'),
  qi(B3, 'Why does the Keynesian curve start to rise before the economy reaches capacity?',
    ['Some industries hit bottlenecks first', 'Wages are fixed by contract in the short run', 'Imported inputs become cheaper', 'The labour force begins to shrink'],
    'Resources do not run out everywhere at once: skilled workers or components become scarce in some industries earlier than in others, and firms bid up their price. Fixed contract wages explain the slope of SRAS, which is a different curve with a different cause.'),
  qi(B3, 'Keynesians argue an economy can stay below capacity for a long time because money wages:',
    ['are sticky downwards', 'fall faster than prices', 'are set by the central bank', 'always rise with output'],
    'If workers and employers resist pay cuts, costs do not fall when demand falls, so nothing pushes output back towards capacity. That single assumption is what separates the flat Keynesian range from the vertical classical line.'),
  qi(B3, 'The classical and Keynesian LRAS curves agree:',
    ['at capacity, where both are vertical', 'at low output, where both are flat', 'at every level of output', 'at no level of output'],
    'Once every resource is in use, neither school thinks output can rise further, so both curves are vertical there. The disagreement is entirely about the range below capacity.'),

  /* ── Block 4 · Technology, Productivity and Skills ───────────────────────── */
  qi(B4, 'Productivity is best defined as:',
    ['output per worker or per hour worked', 'the total output of the economy', 'the number of people in work', 'the profit earned per worker'],
    'Productivity divides output by an input, most often workers or hours. Total output can rise simply because more people are working, which leaves productivity unchanged.'),
  qi(B4, 'Output rises because more people are employed, with output per worker unchanged. Productivity has:',
    ['stayed the same', 'risen with output', 'fallen as hiring rose', 'risen by the same share as output'],
    'Productivity is output per worker, and that figure has not moved: the extra output came from extra workers. Confusing a rise in output with a rise in productivity is the commonest error in this topic.'),
  qi(B4, 'Government spending on education is likely to shift LRAS right:',
    ['after a delay, once trained workers are at work', 'immediately, in the year it is spent', 'only if the currency appreciates', 'only if the price level rises'],
    'In the year it is spent, education spending is part of aggregate demand. Its supply-side effect arrives when the people it trains are working and producing more, which can take years.'),
  qi(B4, 'New technology raises output per worker by 5% with the labour force unchanged. Productive capacity:',
    ['rises by 5%', 'is unchanged', 'rises by less than 5% because prices fall', 'falls by 5%'],
    'Capacity is workers times output per worker. The number of workers is unchanged and output per worker has risen by 5%, so capacity rises by 5%; the price level does not enter the calculation.'),
  qi(B4, 'Which of these raises capacity through output per worker rather than the number of workers?',
    ['Firms installing more machinery per worker', 'A net inflow of working-age migrants', 'A higher participation rate', 'A rise in the retirement age'],
    'More capital for each worker to use raises what each produces. Migration, participation and the retirement age all change how many people work, which is the other term of capacity.'),

  /* ── Block 5 · Regulation, Population and Competition ────────────────────── */
  /* Packet 44 fix round (founder, 26 Sep): the spine's 50m × 80% = 40m is this check-in's own
   * checklist line, so the item transfers the rule to new figures. */
  qi(B5, `A country has a working-age population of ${mn(60)}; ${pct(75)} of them participate. What is its labour force?`,
    [mn(45), mn(60), mn(15), mn(75)],
    `The labour force is the working-age population times the participation rate: ${mn(60)} × ${pct(75)} = ${mn(45)}. The working-age population itself counts people who are neither working nor looking for work.`),
  qi(B5, 'An ageing population is most likely to shift LRAS:',
    ['left, as the working-age share falls', 'right, as workers gain experience', 'left, because prices rise', 'right, because demand for care rises'],
    'As more people pass retirement age and fewer replace them, the labour force shrinks relative to the population, so less can be produced. Rising prices and rising demand for care are effects on other curves, not on capacity.'),
  qi(B5, 'Which of these would shift LRAS to the left?',
    ['Large-scale emigration of trained engineers', 'A net inflow of working-age migrants', 'A rise in the participation rate', 'Courts that enforce contracts faster'],
    'Emigration of skilled workers cuts both the number of workers and the average output of those who remain. The other three add workers or make investment safer, which raises capacity.'),
  qi(B5, 'Competition policy shifts LRAS right mainly because:',
    ['firms facing rivals must cut costs and innovate', 'it lowers the price level directly', 'it raises government spending', 'it increases the size of the population'],
    'Firms that could lose customers to a cheaper rival have to cut waste and adopt better methods, so the same resources produce more. Lower prices are a result of that, not the supply-side mechanism.'),
  qi(B5, 'Which regulation is most likely to raise productive capacity?',
    ['Clear property rights that courts enforce', 'A licence that takes eight months to issue', 'Four forms for each worker hired', 'A rule banning new firms from a market'],
    'Enforced property rights let firms invest knowing they will keep the return, so more capital is built. The other three add cost or block rivals without adding any output.'),
  qi(B5, 'A tax allowance for investment in new machinery affects LRAS by:',
    ['raising the capital each worker has to use', 'lowering the cost of each unit sold today', 'increasing the working-age population', 'reducing imports of machinery'],
    'Making investment more rewarding means more machinery is built, so output per worker rises over time. A lower cost of each unit sold today would be a short-run effect on SRAS, which is a different mechanism.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

/*
 * NINE ITEMS: one for each of Appendix 6's eight command words, plus both Calculate tariffs.
 *
 * EVERY GUIDANCE IS TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx` prints
 * `guidance.split('\n')[0]` above the empty answer box in guided mode. The opening carries no
 * figure, no mark allocation and no answer. Nothing above 6 marks allocates points.
 */
const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'aggregate supply'. (2 marks)",
    `Two marks means two separate things to say. Decide what is being added up, and then what it is being measured against — a definition that leaves out the second has described a total, not a curve.\nAggregate supply is the total real output that all firms in an economy plan to produce (1 mark) at each possible price level over a given period (1 mark). An answer that says only "total output" or "total supply in the economy" has the first mark and not the second.`),

  pr(B1, 'Explain', 4, 'Explain why the short-run aggregate supply curve slopes upward. (4 marks)',
    `Appendix 6 wants a chain of reasoning here, so plan linked stages rather than one assertion. Decide first what is fixed in the short run, because the whole explanation hangs on it.\nKnowledge: the SRAS curve shows planned real output at each price level while some input costs are fixed (1 mark). Application: in the short run, costs such as money wages set in contracts do not rise when the price level rises (1 mark). Analysis, first stage: a higher price level therefore raises the revenue from each unit above its unchanged cost, so profit per unit rises (1 mark). Analysis, second stage: producing extra units becomes worthwhile, so firms expand output, which is a movement up along the curve (1 mark). "Firms want more profit" with no fixed costs has no chain.`),

  pr(B2, 'Calculate', 2, 'Energy and raw materials make up 40% of firms\' costs. Their price rises by 15%. Calculate the percentage change in firms\' unit costs. (2 marks)',
    `Appendix 6 defines Calculate as working from given data with the workings shown. Before multiplying anything, ask how much of a firm's costs the input actually is — the question gives you that for a reason.\nChange in unit costs = share of costs × change in the input's price = 0.4 × 15% (1 mark) = a 6% rise (1 mark). The common error is to answer 15%, which assumes energy and raw materials are the whole of firms' costs.`),

  pr(B2, 'Calculate', 4, 'Imported inputs make up 25% of firms\' costs and energy makes up 20%. The currency depreciates so that imported inputs cost 12% more, while the price of energy falls by 5%. Calculate the overall change in unit costs and state the direction in which the SRAS curve shifts. (4 marks)',
    `Two inputs are moving in opposite directions, so work out each effect separately before combining them, and keep the signs. The question also asks for a direction, which is a separate mark from the arithmetic.\nImported inputs: 0.25 × 12% = +3% (1 mark). Energy: 0.20 × (−5%) = −1% (1 mark). Overall change in unit costs = +3% − 1% = +2% (1 mark). Unit costs have risen at every level of output, so the SRAS curve shifts left (1 mark). A candidate who adds 12% and 5% without the shares, or ignores the sign of the energy change, has only the direction mark available.`),

  pr(B2, 'Analyse', 6, 'Analyse the likely effect of a depreciation of a country\'s currency on its short-run aggregate supply. (6 marks)',
    `Appendix 6 wants depth for an Analyse: one route, followed through several linked stages, with a diagram where it helps. Stay on the supply side of the diagram; a depreciation also affects demand, and the question has not asked about it.\nKnowledge: a depreciation means each unit of the currency buys less foreign currency (1 mark). Application: firms that import raw materials, components or fuel pay more for them in local currency (1 mark). Analysis, first stage: unit costs rise at every level of output, by the imported inputs' share of costs times the rise in their price (1 mark). Analysis, second stage: at each price level firms now supply less, so the SRAS curve shifts left (1 mark). Analysis, third stage: the more an economy's firms rely on imported inputs, the larger the shift, so an economy that imports most of its oil or components is hit harder (1 mark). A correctly labelled diagram showing SRAS to SRAS₁ to the left, with the price level and real national output on the axes (1 mark).`),

  pr(B3, 'Draw', 4, 'Draw a diagram to show the classical long-run aggregate supply curve and the effect of a fall in aggregate demand in the short run and in the long run. (4 marks)',
    `Appendix 6 defines Draw as requiring an accurately labelled diagram. Decide first how many curves the question needs: it asks about the short run and the long run, so the diagram has to show both, and each needs its own marked point.\nOne mark for the axes: price level on the vertical, real national output on the horizontal. One mark for a vertical LRAS at capacity, with AD and an upward-sloping SRAS meeting it at the starting point. One mark for AD shifting left to AD₁ and the short-run point marked, with output below capacity and a lower price level. One mark for SRAS shifting right to SRAS₁ as wages and costs fall, with the long-run point on the LRAS at the original output and a lower price level still.`),

  pr(B3, 'Discuss', 14, 'Discuss whether the classical or the Keynesian shape of the long-run aggregate supply curve better describes an economy in a deep downturn. (14 marks)',
    `Appendix 6 wants coherent chains of reasoning, different viewpoints and a critical assessment. Plan both viewpoints before writing, and decide what your judgement will depend on — the phrase "deep downturn" in the question is the context your judgement should use.\nLevel 1 describes one or both shapes with little explanation. Level 2 explains the classical curve — vertical at capacity because wages and prices are flexible — and the Keynesian curve — flat while resources are idle, rising as bottlenecks appear, vertical at capacity. Level 3 develops the assumption that separates them: whether money wages fall when unemployment is high, and so whether output returns to capacity by itself. It uses a diagram of each and explains what the economy in the question would look like on it. Level 4 reaches a supported judgement. The strongest is conditional: in a deep downturn, with many resources idle and pay cuts resisted, the flat Keynesian range fits the evidence better; over a longer period, as contracts are renegotiated, the classical adjustment becomes more plausible. Recognising that both schools agree at capacity, and disagree only below it, is the clearest sign of understanding available.`),

  pr(B4, 'Examine', 8, 'Examine the likely effects of increased spending on education and training on an economy\'s long-run aggregate supply. (8 marks)',
    `Appendix 6 says an Examine needs a chain of reasoning and a brief assessment of the arguments, so leave room at the end for a judgement. The question is about long-run supply, so the chain has to reach capacity, not stop at spending.\nLevel 1 states that education raises LRAS with little explanation. Level 2 explains the chain: training raises workers' skills, so output per worker rises; capacity is the labour force times output per worker, so capacity rises and LRAS shifts right. Level 3 develops it with a diagram and application — which workers, which skills, how large a share of the labour force — and notes that in the year it is spent the money is part of aggregate demand. The brief assessment that lifts an answer to the top of the range weighs the time lag, since a school place funded now produces a more skilled worker years later, and whether the skills taught match what firms need; training in skills nobody hires for raises nothing.`),

  pr(B5, 'Evaluate', 20, 'Evaluate the view that an ageing population will inevitably reduce a country\'s long-run aggregate supply. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. The word to argue with is "inevitably". Plan a case for the view and a case against it, and decide in advance what your judgement will depend on, so the conclusion follows from the argument.\nLevel 1 asserts that an older population produces less, with little support. Level 2 explains the mechanism: the labour force is the working-age population times the participation rate, and an ageing population shrinks the working-age share, so the labour force and capacity fall and LRAS shifts left. Level 3 develops both sides. For the view: fewer workers is fewer people producing, and a rising share of retired people cannot be offset quickly. Against it: participation can rise — through childcare, flexible hours or a later retirement age; net migration can add working-age people; and higher productivity, from technology, capital and skills, can raise output per worker faster than the labour force shrinks. Level 4 reaches a supported judgement. The strongest is conditional: ageing puts pressure on the labour-force term of capacity, but whether LRAS falls depends on whether participation, migration and productivity respond — so the effect is likely rather than inevitable, and larger in economies where migration is restricted and productivity growth is slow.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('Define aggregate supply.', 'The total real output that all firms in an economy plan to produce at each possible price level, over a given period.'),
  fc('What goes on each axis of an AS diagram?', 'The price level, an index, on the vertical axis; real national output on the horizontal. Not price and quantity: this is the whole economy.'),
  fc('What separates the short run from the long run in AS?', 'In the short run some input costs, such as contracted wages, are fixed. In the long run every cost has had time to adjust.'),
  fc('Why does SRAS slope upward?', 'A higher price level raises revenue per unit while some costs are fixed, so profit per unit rises and firms supply more.'),
  fc('What causes a movement along an AS curve?', 'A change in the price level, which is on the axis. Anything else that changes supply at a given price level shifts the curve.'),
  fc('What happens to real output when the price level rises along a vertical LRAS?', 'Nothing. A movement along a vertical curve changes only the price level; only a shift changes long-run output.'),
  fc('Name the three factors the specification lists for SRAS.', 'Changes in the costs of raw materials and energy, in exchange rates, and in tax rates.'),
  fc('How do all three SRAS shifters work?', 'Through unit costs. Each changes the cost of producing a unit at every level of output, so their effects add and opposite changes offset.'),
  fc('How do you calculate the change in unit costs from an input price rise?', 'Multiply the input\'s share of costs by the rise in its price. Energy at 25% of costs rising 20% raises unit costs by 5%.'),
  fc('What does a depreciation do to SRAS?', 'Imported inputs cost more in local currency, so unit costs rise and SRAS shifts left. An appreciation shifts it right.'),
  fc('A depreciation makes exports cheaper. Which curve is that?', 'Aggregate demand, through the net trade balance. The supply-side effect of a depreciation is through dearer imported inputs.'),
  fc('Which taxes shift SRAS?', 'Taxes that are a cost of producing: taxes per unit sold, such as excise duty or a sales tax, and taxes per worker, such as an employer\'s payroll tax.'),
  fc('Does a cut in household income tax shift SRAS?', 'No. It raises disposable income and spending, which is aggregate demand.'),
  fc('Why can an SRAS shift reverse?', 'It changes costs, not capacity. When the oil price falls back or the currency recovers, costs fall and the curve returns.'),
  fc('What does the LRAS curve show?', 'The economy\'s productive capacity: what its resources can produce once every cost has adjusted.'),
  fc('How can capacity be written as a calculation?', 'The labour force times output per worker. Forty million workers each producing $20,000 a year is $800bn.'),
  fc('Why is the classical LRAS vertical?', 'Wages and prices are flexible, so in the long run output returns to capacity whatever the price level.'),
  fc('On the classical view, what brings output back to capacity after AD falls?', 'Unemployment pushes wages and costs down, so SRAS shifts right until output is back at capacity, at a lower price level.'),
  fc('Name the three ranges of the Keynesian LRAS curve.', 'Horizontal while many resources are idle, rising as bottlenecks appear, and vertical at capacity.'),
  fc('Why is the Keynesian curve flat at low output?', 'Idle workers and machines can be hired at the going wage without raising costs, so output can rise with the price level unchanged.'),
  fc('What does "sticky downwards" mean for wages?', 'Money wages resist cuts even when unemployment is high, so costs do not fall and output need not return to capacity.'),
  fc('Where do the classical and Keynesian curves agree?', 'At capacity, where both are vertical. They disagree only about the range below it.'),
  fc('Why do SRAS and the Keynesian curve slope upward for different reasons?', 'SRAS slopes up because some costs are fixed by contract. The Keynesian curve rises because resources start to run short as capacity nears.'),
  fc('Name the six factors the specification lists for LRAS.', 'Changes in the state of technology, productivity, education and skills, government regulations and tax, demography and net migration, and competition policy.'),
  fc('Define productivity.', 'Output per unit of input, usually per worker or per hour worked. A rise in output from hiring more people is not a rise in productivity.'),
  fc('How does better technology shift LRAS?', 'It lets the same resources produce more, so output per worker and capacity rise and LRAS shifts right.'),
  fc('Why does education shift LRAS only after a delay?', 'The skills take years to build, and the effect arrives only when the trained workers are at work. In the year it is spent it is aggregate demand.'),
  fc('Can a regulation raise capacity?', 'Yes. Enforced contracts, clear property rights and trusted standards make investment safer. Only rules whose cost is not repaid in output hold capacity back.'),
  fc('How does tax affect LRAS, as opposed to SRAS?', 'Through incentives over years: the reward for working and for investing. On SRAS a tax acts as a cost of each unit supplied now.'),
  fc('What is the labour force?', 'The working-age population times the participation rate: those of working age in work or looking for it.'),
  fc('How does an ageing population affect LRAS?', 'The working-age share falls, so the labour force and capacity fall — unless participation, migration or productivity make up for it.'),
  fc('Define net migration.', 'Immigration minus emigration. A net inflow of working-age people raises the labour force and shifts LRAS right.'),
  fc('Can net migration of zero change capacity?', 'Yes, if those arriving are more or less skilled than those leaving: the number of workers is unchanged but output per worker is not.'),
  fc('How does competition policy shift LRAS?', 'It stops price-fixing and dominating mergers, so firms facing rivals must cut costs and innovate, raising output per worker.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Shifting SRAS for a change in the price level',
    '"The price level rose, so I shifted the SRAS curve up."',
    'The price level is on the vertical axis, so a change in it moves the economy along the curve it is already on. Drawing a shift for it double-counts the change and usually gives the wrong new position.',
    'Ask whether the cause is on an axis. If it is the price level, draw a movement along the curve. If it is costs or capacity, draw a new curve and label it.'),

  mk('Putting a depreciation on the wrong side of the diagram',
    '"The currency fell, exports are cheaper, so SRAS shifts right."',
    'Cheaper exports raise the net trade balance, which is aggregate demand. On the supply side a depreciation makes imported inputs dearer, which raises unit costs and shifts SRAS left — the opposite direction.',
    'Separate the two channels before drawing: demand through exports and imports of finished goods, supply through the cost of imported inputs. Say which one the question is asking about.'),

  mk('Using the input price rise as the rise in unit costs',
    `"Oil rose ${pct(E.energyRise)}, so unit costs rose ${pct(E.energyRise)}."`,
    `Energy is only part of what firms pay for. In ${E.country} it is ${pct(E.energyShare * 100)} of costs, so a ${pct(E.energyRise)} rise in its price raises unit costs by ${pct(E.energyCost)}, not ${pct(E.energyRise)}.`,
    'Multiply the input\'s share of costs by the change in its price, and show the workings. When two inputs move, do each one and then add, keeping the signs.'),

  mk('Drawing the Keynesian curve as a steepening SRAS curve',
    '"The Keynesian AS curve is the SRAS curve getting steeper near capacity."',
    'The two curves slope upward for different reasons. SRAS slopes up because some costs are fixed by contract; the Keynesian long-run curve rises because resources start to run out. Merging them loses the flat range, which is the whole Keynesian argument.',
    'Draw the Keynesian curve with three labelled ranges — flat, rising, vertical at capacity — and give each its reason. Keep SRAS as a separate curve if the question needs one.'),

  mk('Reading a vertical LRAS as a fixed price level',
    '"LRAS is vertical, so the price level cannot change in the long run."',
    'It is output that is fixed in the long run on the classical view. The price level can move freely: a fall in demand, once wages have adjusted, leaves output at capacity and the price level lower.',
    'Say what is fixed and what is free: real output is set by capacity, and the price level is set by where AD meets the vertical line.'),

  mk('Treating a rise in output as a rise in productivity',
    '"More people are working and output has risen, so productivity has increased."',
    'Productivity is output per worker. If output rose because more people are employed, each producing the same as before, productivity has not changed — the labour force term of capacity rose, not the productivity term.',
    'Divide before you describe: compare output per worker, or per hour, before and after. Name which term of capacity — workers, or output per worker — the change acted on.'),

  mk('Claiming education shifts LRAS straight away',
    '"The government spent more on schools this year, so LRAS shifted right this year."',
    'In the year it is spent, education spending is part of aggregate demand. The supply effect comes only when the trained people are at work and more productive, which can be years later.',
    'Put the time lag in the chain explicitly, and use it as evaluation: the effect on capacity is real but slow.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

/*
 * `ExtrasTab.jsx` maps `chain.steps`, so every chain has `steps` and a `title`, and every evaluation
 * frame a `content` string (V028, packet 28).
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From an oil price rise to a shift in SRAS',
      steps: [
        `The world oil price rises ${pct(E.energyRise)}. ${E.country} imports almost all of the oil it uses.`,
        `Energy and raw materials are ${pct(E.energyShare * 100)} of firms' costs, so unit costs rise by ${pct(E.energyShare * 100)} × ${pct(E.energyRise)} = ${pct(E.energyCost)}.`,
        `To supply the same output, firms need prices about ${pct(E.energyCost)} higher: the SRAS curve moves up by ${E.energyCost} points.`,
        `Read horizontally, at a price level of ${idx(E.P0)} firms now plan ${bn(E.Yenergy)} instead of ${bn(E.capacity)}.`,
        `Nothing has happened to ${E.country}'s workers, machines or land, so capacity — and the LRAS curve — is unchanged.`,
      ],
      result: 'A cost shock shifts the short-run curve and leaves the long-run curve alone, which is why it can reverse. What the new SRAS curve does to the price level and real output depends on where it meets aggregate demand, which is the next topic\'s question.',
    },
    {
      title: 'The classical adjustment, step by step',
      steps: [
        `${E.country} starts where AD, SRAS and a vertical LRAS all meet: ${bn(E.capacity)} at a price level of ${idx(E.P0)}.`,
        `Export orders collapse and AD falls by ${bn(E.adFall)}. In the short run the economy slides down its SRAS curve to ${bn(E.Ysr)} at a price level of ${idx(E.Psr)}.`,
        'Output is below capacity, so workers are laid off and unemployment rises.',
        'As wage contracts come up for renewal, workers accept lower pay. Costs fall, and SRAS shifts right.',
        `SRAS keeps moving until it has shifted by ${bn(E.srasRecovery)} and meets the lower AD curve at capacity: ${bn(E.Ylr)} at a price level of ${idx(E.Plr)}.`,
      ],
      result: `In the long run the fall in demand has lowered the price level from ${idx(E.P0)} to ${idx(E.Plr)} and left real output where it began. That is what a vertical LRAS curve means, and the whole of the classical case rests on the fourth step — wages that fall when unemployment rises.`,
    },
    {
      title: 'Why the same slump looks different on a Keynesian curve',
      steps: [
        'Demand falls by the same amount as in the classical story.',
        'Firms cut output and lay off workers, exactly as before.',
        'Now workers and employers resist cuts in money wages, so costs do not fall.',
        'With costs unchanged, nothing pushes SRAS to the right, and output stays below capacity.',
        'The economy settles on the flat range of the Keynesian curve, with idle workers and machines.',
      ],
      result: 'The two schools agree about the first two steps and disagree about the third. Whether wages are flexible or sticky downwards decides whether a slump corrects itself or persists, and that is the question an evaluation of the two shapes has to answer for the economy in front of it.',
    },
    {
      title: 'Capacity as a product: which term does each factor move?',
      steps: [
        `Capacity = labour force × output per worker = ${mn(E.labour)} × ${money(E.perWorker)} = ${bn(E.capacity)}.`,
        `Technology raises output per worker by ${pct(E.techRise)}: capacity ${bn(E.capTech)}.`,
        `Training ${mn(E.trained)} workers to be ${pct(E.skillRise)} more productive: capacity ${bn(E.capSkills)}.`,
        `An ageing population removes ${mn(E.ageingLoss)} of working age: the labour force is ${mn(E.labourAgeing)} and capacity ${bn(E.capAgeing)}.`,
        `A net inflow of ${mn(E.netMigrants)} working-age migrants: capacity ${bn(E.capMigration)}.`,
      ],
      result: 'Every one of the six LRAS factors acts through one of the two terms. Technology, productivity, education and competition act mainly on output per worker; demography and net migration mainly on the number of workers; regulations and tax can act on either. Naming the term is the second stage of every LRAS chain.',
    },
  ],
  evaluation: [
    {
      title: 'Classical or Keynesian: which shape fits?',
      content: 'Neither shape is simply right, and an answer that declares one correct has missed what the disagreement is about. **Both agree at capacity, and disagree below it about how quickly wages adjust.** The classical case is strongest over long periods and in economies where pay is renegotiated often and unemployment pushes wages down. The Keynesian case is strongest in a deep downturn, when many resources are idle and workers and employers resist pay cuts. A strong judgement names the assumption, then says which one fits the economy in the question — how deep the slump is, how long it has lasted, how flexible its labour market is.',
    },
    {
      title: 'How reliable are supply-side improvements?',
      content: 'Every LRAS factor works, and almost all of them work slowly. **Technology spreads as firms invest, education pays off when the trained are at work, and competition changes firms\' behaviour over years.** Demography moves over decades. That makes the long-run curve hard to shift quickly and hard to measure: a rise in capacity is not observed directly, only inferred from output that keeps growing without prices rising faster. The strongest evaluation of any LRAS factor is about time and scale — how long before it acts, and how large a share of the labour force or of output per worker it touches.',
    },
  ],
};
