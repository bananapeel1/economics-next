/**
 * PACKET 42 — resource-management teaching content. FOUR chapters, one to each of the
 * specification's own sub-topics, twenty-six subsections, one subsection to a step.
 *
 * `audit/raw/bus_spec.txt:965-1002`, IAL 2.3.4, Unit 2 (WBS12). 28 substantive leaves.
 *
 *   1  Production, Productivity and Efficiency   1a-1e   10 subsections
 *   2  Capacity Utilisation                      2a-2c    5
 *   3  Inventory Control                         3a-3f    6
 *   4  Quality Management                        4a-4d    5
 *
 * ── WHY THE CHAPTERS ARE THE SUB-TOPICS, AND WHAT THAT FIXES ───────────────
 *
 * The live four blocks are Methods of Production · Productivity and Efficiency · Inventory
 * Management · Quality Management, and three separate ids are the same defect underneath:
 *
 *   `structure-05` — block 2 is titled "Inventory Management" and half of it is lean production,
 *     kaizen, cell production and time-based management. Its proposed remedy ("retitle Stock
 *     Control and Lean Production") is refused on Rule 2, and the defect is fixed a layer below
 *     the wording: **lean production and waste minimisation are 3e and 3f, inside sub-topic 3**,
 *     so they belong in this chapter and keep it honest to its title. **Kaizen is 4c** and moves
 *     to chapter 4. **Cell is a bullet of 1a** and moves to chapter 1, which is `specGap-04`.
 *     Nothing is deleted; three things are filed where the specification files them.
 *
 *   `structure-06` — kaizen is taught twice, and quality circles exists only as the aliasing
 *     clause "kaizen circles or quality circles". Kaizen is now taught once, at 4c. Quality
 *     circles is its own subsection at **4a**, not 4c: the specification's 4a reads
 *     "Quality: control / assurance / circles" (`:996-999`), so circles is the third bullet of
 *     4a and the ledger item's own "2.4.4c" is wrong twice over.
 *
 *   `structure-04` — the live blocks pair two subsections to a step. Every chapter below is a
 *     list of subsections and the deck gives each one its own step.
 *
 * ── WHAT IS REMOVED RATHER THAN CORRECTED ──────────────────────────────────
 *
 * `accuracy-01` and `topFix-03` report the live JIT example: Toyota "had to halt production at 14
 * factories because its JIT system had no buffer stock of chips to fall back on" during the 2021
 * semiconductor shortage. `topFix-03` asks for it to be CORRECTED. Packet 15's rule, endorsed by
 * packet 40 and restated in the packet-42 spec, is that a dated assertion about a named company
 * which this programme cannot re-check is **removed, not corrected** — a corrected version is
 * still an assertion nobody here can check. So the claim is gone, and the JIT trade-off is taught
 * from this section's own arithmetic instead: a saving of $4,725 a month against $18,000 for one
 * stopped day. The same rule removes `topFix-03`'s other three unsourced claims (Rolls-Royce, a
 * "40%" figure attributed to JLR, BrewDog) — the whole section is authored, so none survives.
 *
 * The corrupted `realExample.emoji` on the lean-production subsection (U+FFFD + "icing") cannot
 * survive either: every emoji below is written fresh and the runner asserts no replacement
 * character anywhere in the bundle.
 *
 * ── RULE 2 IN ONE SENTENCE ─────────────────────────────────────────────────
 *
 * Nothing in this file says stock control, buffer stock, re-order level, lead time, stock-out or
 * seven wastes. Those words live on the 3a drawing and nowhere else; `_packet42-util.mjs`
 * explains why and the runner enforces it.
 */
import {
  SECTION, subId, id, BIZ, usd, units, pct, pts, num, days,
  METHODS, PRODUCTIVITY_FACTORS, PRODUCTIVITY_WAYS, EFFICIENCY_FACTORS, EFFICIENCY_WAYS,
  POOR_INVENTORY, WASTE_KINDS, RAISE_UTILISATION, RELIEVE_UTILISATION,
} from './_packet42-util.mjs';

const B = BIZ;
const blockId = (title) => id('block', title);

/*
 * EVERY RECALL IS MINTED FROM ITS SUBSECTION, never from an array position (packet 2's decision).
 * `shuffled` is never written: the renderer ignores it and CONTENT-GATE says to delete it when a
 * reorder is touched.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });

export const B1 = 'Production, Productivity and Efficiency';
export const B2 = 'Capacity Utilisation';
export const B3 = 'Inventory Control';
export const B4 = 'Quality Management';

/* ══ Chapter 1 — Production, Productivity and Efficiency (2.3.4 · 1a-1e) ═══ */

const jobAndBatch = sub('job-and-batch-production', {
  title: 'Job and Batch Production',
  keyIdea: 'Job production makes one item at a time to a customer\'s own specification; batch production makes a group of identical items, then changes the equipment over.',
  body: [
    p(`There are **four** methods of production: ${METHODS.join(', ')}. The first two are the low-volume end, and the choice between them is about how many identical items are wanted at once.`),
    p(`**Job production** makes one item at a time, finished before the next is started, to a specification the customer set. A hand-built frame sized to one rider is job production: output is low, the worker needs a wide range of skill, and each item costs a great deal — but the customer is buying something nobody else has.`),
    p(`**Batch production** makes a group of identical items together, then changes the machinery over for a different group. ${B.firm} sprays ${units(200)} frames in one colour, cleans the guns, and sprays the next ${units(200)} in another. Between those runs nothing is produced, and that changeover is the cost of the flexibility.`),
    { type: 'flow', resultType: 'neutral', steps: [
      { title: 'One item, one customer, one specification', subtitle: 'job production: highest skill, highest cost each' },
      { title: 'A group of identical items, then a changeover', subtitle: 'batch production: flexible, with downtime between groups' },
      { title: 'The question that decides it', subtitle: 'how many identical items does the buyer want at once?' },
    ] },
  ],
  realExample: { emoji: '🔧', text: `A ${B.firm} customer orders a frame in a size the catalogue does not carry. One welder builds it over three days — job production — while the paint shop works through a batch of ${units(200)} standard frames.` },
  misconception: `Students read "batch" as "small". Batch is about running identical items TOGETHER, not about quantity: a bakery batching a thousand loaves and a workshop batching twenty brackets are using the same method. What defines it is the changeover, and that is what makes it dearer per item than continuous production.`,
  examMatters: `A question that gives a firm's order book is telling you which method fits. Single items to different specifications point at job; repeat orders for groups of the same item point at batch. Say which feature of the ORDERS decided it.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each order by the method of production it calls for:',
    groups: [
      { name: 'Job production', items: ['A wheelchair built to one rider\'s measurements', 'A bridge designed for one river crossing'], why: 'Each is a single item to a specification that will never be used again, so nothing can be repeated from the last one.' },
      { name: 'Batch production', items: ['Four hundred school shirts in one size, then four hundred in the next', 'A morning run of white paint followed by an afternoon run of grey'], why: 'Identical items are made together and the equipment is then changed over, which is the feature that separates batch from both neighbours.' },
    ],
  },
});

const flowAndCell = sub('flow-and-cell-production', {
  title: 'Flow and Cell Production',
  keyIdea: 'Flow production moves every item through the same sequence of stages continuously; cell production breaks that line into teams, each finishing a whole part of the product.',
  body: [
    p(`**Flow production** is continuous. Every item passes through the same stages in the same order with no changeover, so output is high and each item is cheap — ${B.firm} assembles its standard ${B.product} this way. The price is rigidity: one design, heavy investment up front, and a fault at one stage halts everything behind it.`),
    p(`**Cell** is the fourth bullet of 1a and is the one most answers leave out. The line is broken into teams, and each team — each cell — takes responsibility for a complete part of the product: the wheel cell builds wheels start to finish, the drivetrain cell builds drivetrains. Output still flows, but the work is grouped by what is being finished rather than by a single operation repeated all day.`),
    p(`What a cell changes is where the judgement sits. A team that finishes a whole wheel can see what it has made, catch its own faults and reorganise its own bench; a worker fitting one part all day cannot. Movement between stages falls, and so does the time a half-finished item spends waiting.`),
  ],
  realExample: { emoji: '⚙️', text: `${B.firm} splits its assembly line into four cells. The wheel cell cuts the time a half-built wheel spends waiting between operations, and starts finding its own faults before the wheel reaches the frame.` },
  misconception: `Students meet "cell" for the first time inside a paragraph about lean production and file it as a lean technique rather than as a method of production. Cell sits beside job, batch and flow: it is a way of ORGANISING production, and a firm can choose it the way it chooses the other three.`,
  examMatters: `When a question asks for methods of production, four are available and most answers give three. Naming cell, and saying what it does that a straight line does not, is a cheap way to separate an answer from the ones beside it.`,
  recall: {
    type: 'match',
    prompt: 'Match each method of production to the feature that identifies it:',
    pairs: [
      { left: 'Job', right: 'One item is completed to its own specification before the next is begun', why: 'Nothing is repeated, which is why the skill needed is wide and the cost of each item is high.' },
      { left: 'Batch', right: 'Identical items are made as a group and the equipment is then changed over', why: 'The changeover is the defining feature: it buys flexibility and costs production time.' },
      { left: 'Flow', right: 'Items move continuously through the same sequence of stages', why: 'Continuity is what drives the cost of each item down and what makes a single fault expensive.' },
      { left: 'Cell', right: 'A team completes a whole part of the product rather than one operation on all of it', why: 'The work is grouped by what is finished rather than by the operation, which is what moves judgement onto the team.' },
    ],
  },
});

const choosingAMethod = sub('choosing-a-method-of-production', {
  title: 'Choosing a Method of Production',
  keyIdea: 'The method follows the order book: how many identical items are wanted, how different each customer\'s requirement is, and how much capital the business can put up front.',
  body: [
    p(`No method is better than another in the abstract. Three things decide it, and an answer that names them is doing the analysis rather than listing the four methods again.`),
    p(`**Volume.** The higher the number of identical items, the further towards flow it pays to move, because heavy fixed investment is only worth making if there is enough output to spread it over. ${B.firm} makes ${units(B.output, B.products)} a month on a line built for ${units(B.maxOutput)}; a workshop making thirty would never build that line.`),
    p(`**How different each order is.** Where every customer wants something different, flow is impossible and job is the only honest answer. Where the differences are in colour or size rather than in design, batch handles them.`),
    p(`**Capital available.** Flow needs the money up front and returns it slowly. A business that cannot raise it is choosing between job and batch whatever the volume argument says.`),
  ],
  realExample: { emoji: '📋', text: `${B.firm} runs all four at once: job for special frames, batch in the paint shop, flow on the main line, and cells inside the flow. The method follows the work, not the factory.` },
  misconception: `Students write that flow production is "the most efficient method". It is the lowest cost per item only when the volume is there to spread the fixed investment over. At a low volume, flow is the most expensive of the four, because the line has to be paid for whether it runs or not.`,
  examMatters: `A recommendation question about production methods is marked on the link to the firm's own circumstances. Two sentences on the volume and the variety in the case in front of you are worth more than a paragraph describing all four methods in general.`,
  recall: {
    type: 'classify',
    prompt: 'Group each circumstance by whether it pushes a business towards flow production or away from it:',
    groups: [
      { name: 'Towards flow', items: ['A supermarket chain contracts for the same bottle every week for three years', 'A development bank offers to fund half the cost of new machinery'], why: 'Both make the heavy fixed investment worth spreading: one supplies the volume, the other supplies the money.' },
      { name: 'Away from flow', items: ['Buyers expect to choose their own fabric and trim', 'The whole range is redrawn twice a year'], why: 'Both destroy the assumption flow rests on, which is that one design will be made the same way for a long time.' },
    ],
  },
});

const measuringProductivity = sub('measuring-productivity', {
  title: 'Measuring Productivity',
  keyIdea: 'Productivity is output per unit of input per time period — normally output per worker per period — and it is not the same thing as output.',
  body: [
    p(`Productivity is **output per unit of input per time period**. All three parts matter: an output, an input it is divided by, and a period it is measured over. Leave out the period and the figure means nothing.`),
    p(`${B.firm} makes ${units(B.output, B.products)} a month with ${units(B.workers)} production workers. Labour productivity is ${units(B.output)} ÷ ${units(B.workers)} = **${num(B.outputPerWorker)} ${B.products} a worker a month**.`),
    p(`The same arithmetic works on any input. Output per machine hour, output per square metre of floor space and output per litre of paint are all productivity measures; labour is simply the one an exam question usually hands you the data for.`),
    { type: 'flow', resultType: 'good', steps: [
      { title: 'Take the output over a stated period', subtitle: `${units(B.output, B.products)} in the month` },
      { title: 'Divide by the input being measured', subtitle: `${units(B.workers)} production workers` },
      { title: 'Report it with the period attached', subtitle: `${num(B.outputPerWorker)} ${B.products} a worker a month` },
    ] },
  ],
  realExample: { emoji: '📐', text: `${B.firm} reports ${units(B.output, B.products)} one month and ${units(B.output + 200, B.products)} the next, having hired ${units(20)} more workers. Output rose; productivity fell from ${num(B.outputPerWorker)} to ${num(Math.round((B.output + 200) / (B.workers + 20) * 100) / 100)} a worker.` },
  misconception: `Productivity and production are treated as the same word. Production is how much came out. Productivity is how much came out for each unit of input. A business can raise production and lower productivity at the same time — hire enough extra people and it will — and the pair of figures tells you something the first one alone hides.`,
  examMatters: `A Calculate item gives an output and an input, and the marks go to the working as well as the answer. Write the division out, then label the result with its unit and its period: "${num(B.outputPerWorker)} ${B.products} a worker a month" scores where "${num(B.outputPerWorker)}" alone is hard to award.`,
  recall: {
    type: 'fillin',
    prompt: 'A workshop makes 7,200 chairs in a year with 24 workers. The next year it makes 8,400 with 30. Complete the comparison:',
    template: [
      'Year one: 7,200 ÷ 24 = ___ chairs a worker a year.',
      'Year two: 8,400 ÷ 30 = ___ chairs a worker a year.',
      'Total output rose, and output a worker went down by ___ chairs.',
    ],
    answers: ['300', '280', '20'],
    hints: ['divide the first year\'s output by its workforce', 'divide the second year\'s output by its workforce', 'the gap between the two figures you just worked out'],
    distractors: ['350', '240', '1200'],
  },
});

const factorsInfluencingProductivity = sub('factors-influencing-productivity', {
  title: 'Factors Influencing Productivity',
  keyIdea: 'Output per worker depends on skill, equipment, how the work is organised, motivation, and the reliability of what arrives — and most of those are decisions the business made.',
  body: [
    p(`Several things influence productivity, and the useful way to hold them is that almost none of them is about how hard anyone is working.`),
    p(`**Skill and training.** A worker who has been taught the job does it right the first time; the time not spent correcting work is output.`),
    p(`**Equipment.** The same worker on a better jig produces more, and the age of the machine is often the whole explanation of a gap between two factories.`),
    p(`**Organisation of the work.** Time spent walking, waiting or looking for a part is time not producing. Chapter 3 costs that out for ${B.firm} at ${usd(B.waitingAndMovingMonthly)} a month.`),
    p(`**Motivation and reward.** How the work is paid for, and whether anyone sees the result, changes the output of identical workers on identical equipment.`),
    p(`**The reliability of what arrives.** A line waiting for a delivery produces nothing, and a part that arrives faulty costs the time to find out.`),
  ],
  realExample: { emoji: '🧰', text: `${B.firm} retrains its assembly staff and replaces the frame jigs. Output per worker rises from ${num(B.outputPerWorker)} to ${num(B.outputPerWorkerUp)} a month — ${pct(B.productivityRisePct)} — with the same ${units(B.workers)} people and the same hours.` },
  misconception: `Students write that higher productivity means workers working harder. Look at the list: four of the five factors are things the business controls and the worker does not. A firm that blames productivity on effort has usually not looked at its own equipment, layout or training budget.`,
  examMatters: `"Factors influencing productivity" is a knowledge-and-application question, so each factor needs a sentence tying it to the business in the case. Three factors applied beat five factors named.`,
  recall: {
    type: 'classify',
    prompt: 'A bottling plant lists four reasons its output per worker is low. Sort them by whether the business itself controls the cause:',
    groups: [
      { name: 'The business controls it', items: ['Nobody was shown how to set the capping head', 'Crates are stacked ten metres from where they are filled', 'The filler was bought second-hand and runs at half speed'], why: 'Training, layout and equipment are all purchases or decisions the firm makes, which is why four of the five factors sit on this side.' },
      { name: 'It comes from outside', items: ['A third of bottle deliveries arrive short', 'A power cut stops the line for an afternoon'], why: 'Both land on the plant\'s own output figure although the failure happened somewhere the firm cannot instruct.' },
    ],
  },
});

const improvingProductivityAndCompetitiveness = sub('improving-productivity-and-competitiveness', {
  title: 'Improving Productivity, and Why It Makes a Business Competitive',
  keyIdea: 'Raising output per worker lowers the labour cost carried by each unit, and that lower unit cost is what lets a business cut price, raise margin, or both.',
  body: [
    p(`The ways to improve productivity follow straight from the factors: ${PRODUCTIVITY_WAYS.join('; ')}.`),
    p(`What makes them worth doing is what higher productivity does to the cost of each unit. ${B.firm} pays ${usd(B.wagePerWorker)} a worker a month. At ${num(B.outputPerWorker)} ${B.products} a worker that is ${usd(B.wagePerWorker)} ÷ ${num(B.outputPerWorker)} = **${usd(B.labourPerUnit)} of labour in every ${B.product}**. At ${num(B.outputPerWorkerUp)} it is ${usd(B.labourPerUnitUp)} — a fall of ${usd(B.labourSavingPerUnit)} with nobody paid less and nobody working longer.`),
    p(`That ${usd(B.labourSavingPerUnit)} is the competitiveness. It can go into a lower price, and the business wins orders it was losing; it can stay in the margin, and the business funds the next improvement; or it can be split. What it cannot do is nothing.`),
    { type: 'flow', resultType: 'good', steps: [
      { title: 'Train the workers and improve the equipment', subtitle: `output a worker ${num(B.outputPerWorker)} to ${num(B.outputPerWorkerUp)}` },
      { title: 'The same wage bill is spread over more output', subtitle: `${usd(B.labourPerUnit)} of labour a ${B.product} becomes ${usd(B.labourPerUnitUp)}` },
      { title: 'Unit cost falls, and the business can price or invest', subtitle: `${usd(B.labourSavingPerUnit)} a ${B.product} to spend` },
    ] },
  ],
  realExample: { emoji: '🚲', text: `${B.rival} sells at the same price with an average cost of ${usd(B.rivalAverageCost)}. Every ${usd(1)} ${B.firm} takes out of its own unit cost closes that gap without touching the price on the ticket.` },
  misconception: `Students treat a productivity gain as automatically a cost saving. It is a saving per UNIT, and only if the extra output is sold. A business that raises output per worker by a fifth and cannot sell the extra ${B.products} has raised its inventory, not its competitiveness.`,
  examMatters: `The link between productivity and competitiveness is a chain, and each link is worth a mark: output per worker rises, so labour cost per unit falls, so the firm can cut price or widen margin, so it wins share. Write the chain; do not assert the conclusion.`,
  recall: {
    type: 'reorder',
    prompt: 'Put the chain from a training programme to a larger market share in the order in which each step causes the next:',
    correctOrder: [
      'Workers are trained and the jigs they use are replaced',
      'Each worker completes more units in the same month',
      'An unchanged wage bill spread over more units means less labour cost in each one',
      'Prices can go below a competitor whose unit cost has not moved',
    ],
    criterion: 'each step is the direct cause of the one after it, from the money spent to the order won',
    why: [
      'Nothing changes until something is done to the skill or the equipment; this is the only step that costs money.',
      'A trained worker on a better jig produces more in the same time, which is the productivity gain itself.',
      'The wage bill did not change, so dividing it by a larger output is what turns the gain into a lower cost per unit.',
      'A lower cost per unit is what makes a lower price affordable, and the price is what the customer actually chooses between.',
    ],
  },
});

const efficiencyAtMinimumAverageCost = sub('efficiency-at-minimum-average-cost', {
  title: 'Efficiency: Production at Minimum Average Cost',
  keyIdea: 'Efficiency is production at minimum average cost, so the test is not how fast a business works but whether its cost per unit is as low as it can be.',
  body: [
    p(`Efficiency has a precise test: **production at minimum average cost**. Average cost is total cost divided by output, and a business is efficient when it is producing at the output where that figure is lowest.`),
    p(`${B.firm} has fixed costs of ${usd(B.fixedCosts)} a month and a variable cost of ${usd(B.variableCost)} a ${B.product}. At ${units(B.output, B.products)}: total cost ${usd(B.fixedCosts)} + ${usd(B.variableCost * B.output)} = ${usd(B.totalCost(B.output))}, so average cost is ${usd(B.avgAtOutput)}.`),
    p(`At ${units(B.maxOutput, B.products)} the same fixed costs are spread further: total cost ${usd(B.totalCost(B.maxOutput))}, average cost **${usd(B.avgAtCapacity)}**. The fixed cost carried by each ${B.product} has fallen from ${usd(B.fixedPerUnitAtOutput)} to ${usd(B.fixedPerUnitAtCapacity)}, and nothing about the way anybody works has changed.`),
    p(`So the two words separate cleanly. **Productivity** is an output-per-input figure. **Efficiency** is a cost-per-unit figure. Raising productivity is one route to efficiency; using the capacity already paid for is another, and chapter 2 is entirely about that one.`),
  ],
  realExample: { emoji: '📉', text: `${B.firm} sells ${units(B.maxOutput - B.output)} more ${B.products} in a month without hiring anyone or buying anything. Average cost falls ${usd(B.avgAtOutput - B.avgAtCapacity)} a ${B.product}, purely because the ${usd(B.fixedCosts)} is divided by more.` },
  misconception: `Efficiency and productivity are used as synonyms. They answer different questions and can move in opposite directions: a business that buys an expensive machine may raise output per worker sharply and raise its average cost at the same time, because the machine has to be paid for. Use the specification's own test — is average cost at its minimum? — and the two stay apart.`,
  examMatters: `When a question uses the word "efficiency", the mark scheme is looking for cost per unit. Quote the definition — production at minimum average cost — and then show a cost per unit falling. An answer that only says output rose has answered about production.`,
  recall: {
    type: 'fillin',
    prompt: 'A bakery has fixed costs of $9,000 a month and a variable cost of $2 a loaf. Complete the calculation:',
    template: [
      'At 3,000 loaves the total cost is $15,000, so average cost is $___ a loaf.',
      'At 6,000 loaves the total cost is $21,000, so average cost is $___ a loaf.',
      'Doubling the output therefore cut the cost of making each loaf by $___.',
    ],
    answers: ['5', '3.50', '1.50'],
    hints: ['divide the first total by the first output', 'divide the second total by the second output', 'the gap between the two figures above'],
    distractors: ['7', '2', '6'],
  },
});

const improvingEfficiency = sub('factors-and-ways-to-improve-efficiency', {
  title: 'What Moves Efficiency, and How to Improve It',
  keyIdea: 'Five things move average cost: scale, capacity used, what is corrected or held, input prices, and the method chosen. Every way of improving efficiency acts on one of them.',
  body: [
    p(`What influences efficiency is a short list: ${EFFICIENCY_FACTORS.join('; ')}.`),
    p(`The ways to improve it are the same five read as instructions: ${EFFICIENCY_WAYS.join('; ')}.`),
    p(`They are not equal. **Raising output towards existing capacity** is free and takes average cost from ${usd(B.avgAtOutput)} to ${usd(B.avgAtCapacity)}. **Removing waste** is worth ${usd(B.wastePerUnit)} a ${B.product}. **Raising output per worker** is worth ${usd(B.labourSavingPerUnit)} but takes training and equipment. **Cutting capacity** works, and is hard to reverse.`),
    p(`Take the first three together and average cost at ${units(B.output, B.products)} falls to ${usd(B.avgAfterWasteAndProductivity)} — below ${B.rival}'s ${usd(B.rivalAverageCost)}, on the same output, at the same wage.`),
  ],
  realExample: { emoji: '🧮', text: `${B.firm} does the cheap thing first and fills unused capacity with subcontract work, taking ${usd(B.fixedPerUnitAtOutput - B.fixedPerUnitWithSubcontract)} off the fixed cost carried by every ${B.product}.` },
  misconception: `Students answer "improve efficiency" with "cut costs", which is the conclusion rather than the method. Cutting a cost that was buying something — training, maintenance, quality checks — usually raises average cost later, when the thing it was buying stops arriving. The ways above all raise output for a cost or remove a cost that was buying nothing.`,
  examMatters: `An Analyse or Assess item on efficiency wants a ranked answer, not a list. Say which route is cheapest to start, which is largest, and which is hardest to undo, and you have built the judgement the higher marks need.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each action by whether it lowers average cost or only looks as though it does:',
    groups: [
      { name: 'Lowers average cost', items: ['Running a second shift on a press that currently stands idle all afternoon', 'Moving two benches together so parts stop being carried between them'], why: 'Each raises output or removes a cost that was buying nothing, so the cost per unit genuinely falls.' },
      { name: 'Only looks as though it does', items: ['Deferring the annual service on the main press', 'Ending the induction programme for new recruits'], why: 'Each removes a cost that was buying something, so the saving shows up now and the breakdowns and the scrap show up later.' },
    ],
  },
});

const labourAndCapitalIntensive = sub('labour-and-capital-intensive-production', {
  title: 'Labour-Intensive and Capital-Intensive Production',
  keyIdea: 'Labour-intensive production carries its cost in wages that vary with output; capital-intensive production carries it in fixed charges — so the better choice depends on the volume.',
  body: [
    p(`The useful version of the distinction is about WHERE the cost sits. Labour-intensive production puts most of the cost into wages, which rise and fall with output. Capital-intensive production puts it into equipment, which has to be paid for whether the line runs or not.`),
    p(`${B.firm} today: ${units(B.workers)} workers, fixed costs ${usd(B.fixedCosts)}, variable cost ${usd(B.variableCost)} a ${B.product}, output per worker ${num(B.outputPerWorker)}. The automated alternative: ${units(B.autoWorkers)} workers, fixed costs ${usd(B.autoFixed)}, variable cost ${usd(B.autoVariableCost)} a ${B.product}, output per worker ${num(B.autoOutputPerWorker)}.`),
    p(`The automated line is ${usd(B.autoExtraFixed)} a month dearer in fixed charges and ${usd(B.variableGap)} a ${B.product} cheaper to run. So the two cost the same at ${usd(B.autoExtraFixed)} ÷ ${usd(B.variableGap)} = **${units(B.crossoverOutput, B.products)} a month**, where both give an average cost of ${usd(B.avgLabourAtCrossover)}.`),
    p(`Below that output the labour-intensive method is cheaper — at ${units(B.output, B.products)} it is ${usd(B.avgAtOutput)} against ${usd(B.avgAutoAtOutput)}. Above it the capital-intensive one is — at ${units(B.maxOutput, B.products)} it is ${usd(B.avgAutoAtCapacity)} against ${usd(B.avgAtCapacity)}. Notice that the automated line has three times the output per worker at BOTH outputs and is still the wrong answer at one of them.`),
  ],
  realExample: { emoji: '🏭', text: `${B.firm} models the automated line and finds the crossover at ${units(B.crossoverOutput, B.products)}. It is selling ${units(B.output)}, so it keeps the labour-intensive line and revisits the decision if orders pass ${units(B.crossoverOutput)}.` },
  misconception: `Students treat capital-intensive as the modern, obviously better choice. It is better above a volume and worse below it, and the volume can be calculated. A firm that automates at ${units(B.output, B.products)} a month here pays ${usd(B.avgAutoAtOutput - B.avgAtOutput)} more for every one it makes.`,
  examMatters: `This is one of the few places in Unit 2 where an evaluative answer can carry a calculation. Working out the output at which the two methods cost the same, and comparing it with what the business actually sells, is a judgement backed by arithmetic rather than by adjectives.`,
  recall: {
    type: 'fillin',
    prompt: 'A printer compares a manual method (fixed costs $20,000 a month, variable $8 a unit) with an automated one (fixed costs $50,000 a month, variable $3 a unit). Complete the comparison:',
    template: [
      'The automated method costs $30,000 more in fixed charges and saves $___ on every unit.',
      'Dividing one by the other, the two methods cost the same at ___ units a month.',
      'Below that output the ___ method is the cheaper of the two.',
    ],
    answers: ['5', '6000', 'manual'],
    hints: ['the gap between the two variable costs', 'divide the fixed gap by the variable gap', 'the one with the lower fixed charges'],
    distractors: ['11', '3750', 'automated'],
  },
});

const shortLeadInTimes = sub('short-product-lead-in-times', {
  title: 'Competitive Advantage from Short Product Lead-In Times',
  keyIdea: 'The lead-in time is the gap between deciding to make a product and having it on sale, and shortening it wins sales a rival never gets a chance at.',
  body: [
    p(`**Short product lead-in times** are a source of competitive advantage. The lead-in time is the period between a design being signed off and the first unit reaching a customer: designing, tooling, testing, training, and filling the first orders.`),
    p(`${B.firm} took ${num(B.leadInMonthsBefore)} months to bring its last model to market. Working the design and the tooling at the same time instead of one after the other, and letting the cells prove the build as they go, takes the next one to ${num(B.leadInMonthsAfter)} — **${num(B.leadInMonthsSaved)} months earlier**.`),
    p(`Those ${num(B.leadInMonthsSaved)} months are the advantage, and they are worth counting. The new model sells ${units(B.newModelMonthlyUnits)} a month at a contribution of ${usd(B.contribution)}, so arriving early earns ${usd(B.leadInContributionMonthly)} a month that the business would otherwise never have seen: ${usd(B.leadInContributionTotal)} in total.`),
    p(`The advantage is wider than the money. A business first into a market sets the price other entrants have to argue with, gets the first run of customer feedback, and can be improving the second version while a rival is still tooling up for its first.`),
  ],
  realExample: { emoji: '⏱️', text: `${B.firm} reaches the market ${num(B.leadInMonthsSaved)} months before ${B.rival} with a comparable ${B.product}. By the time ${B.rival} arrives, ${B.firm} has sold ${units(B.newModelMonthlyUnits * B.leadInMonthsSaved)} and is shipping a revised version.` },
  misconception: `Students confuse the lead-in time with the time a supplier takes to deliver. The specification's phrase is a PRODUCT lead-in time: it is about how quickly a business can get a new product to market, not about how quickly parts arrive. The second one belongs to chapter 3.`,
  examMatters: `Lead-in times are a small corner of this topic and often the one nobody revises, which makes them a cheap mark. If a case mentions how long a firm takes to launch, the examiner has put it in front of you on purpose.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each consequence by whether a shorter product lead-in time causes it directly:',
    groups: [
      { name: 'A direct consequence', items: ['Earning from the new product in months the rival is still tooling up', 'Setting the price the later entrants have to argue with'], why: 'Both follow from arriving in the market first, which is the only thing a shorter lead-in time actually buys.' },
      { name: 'Not a consequence of it', items: ['Paying less for components', 'Holding less inventory on the shop floor'], why: 'Both are real advantages but they come from buying and from inventory control, not from how quickly a design reached the market.' },
    ],
  },
});

/* ══ Chapter 2 — Capacity Utilisation (2.3.4 · 2a-2c) ══════════════════════ */

const measuringCapacityUtilisation = sub('measuring-capacity-utilisation', {
  title: 'Measuring Capacity Utilisation',
  keyIdea: 'Capacity utilisation is current output divided by maximum possible output, times 100 — and the answer moves when either figure moves.',
  body: [
    p(`The formula in full is **current output ÷ maximum possible output × 100**.`),
    p(`${B.firm} makes ${units(B.output, B.products)} a month on a factory that can make ${units(B.maxOutput)} at normal hours. Utilisation is ${units(B.output)} ÷ ${units(B.maxOutput)} × 100 = **${pct(B.utilisation)}**.`),
    p(`The figure is a ratio of two numbers, so read both. ${units(B.maxOutput - B.output)} ${B.products} of capacity are standing idle, and the fixed costs of that idle quarter are being paid anyway — ${usd(B.fixedPerUnitAtOutput)} of fixed cost sits in each ${B.product} instead of the ${usd(B.fixedPerUnitAtCapacity)} it would be at full output.`),
    { type: 'flow', resultType: 'neutral', steps: [
      { title: 'Take the output actually produced', subtitle: units(B.output, B.products) },
      { title: 'Divide by what the business could produce', subtitle: units(B.maxOutput, B.products) },
      { title: 'Multiply by one hundred', subtitle: pct(B.utilisation) },
    ] },
  ],
  realExample: { emoji: '🏗️', text: `${B.firm} quotes ${pct(B.utilisation)} to its bank. The bank asks what the ${units(B.maxOutput - B.output)} idle ${B.products} cost, and the answer is ${usd(B.spareCapacityCostMonthly)} a month of fixed charges carried by output that is not there.` },
  misconception: `Students say a figure above 100% is impossible. The denominator is maximum output under NORMAL conditions, so a business running extra shifts or overtime can report more than 100% — and when it does, the figure is telling you it is operating beyond what it planned for, not that the arithmetic has broken.`,
  examMatters: `This is the most reliably examined calculation in 2.3.4. Show the division and the × 100, and state the answer as a percentage. An unlabelled decimal such as 0.75 is not the answer the command word asked for.`,
  recall: {
    type: 'fillin',
    prompt: 'A hotel with 250 rooms let 190 of them last night. Complete the calculation:',
    template: [
      '190 ÷ 250 × 100 = ___%.',
      'The rooms that earned nothing number ___.',
      'If 50 rooms close for refurbishment and 190 are still let, the figure becomes ___%.',
    ],
    answers: ['76', '60', '95'],
    hints: ['do the division, then multiply by a hundred', 'subtract the lettings from the room count', 'work out the new room count before dividing again'],
    distractors: ['24', '190', '124'],
  },
});

const underUtilisation = sub('implications-of-under-utilisation', {
  title: 'Implications of Under-Utilisation',
  keyIdea: 'Spare capacity means fixed costs are spread over fewer units, so average cost is higher — and it carries consequences for staff and for the way the business is seen.',
  body: [
    p(`Under-utilisation and over-utilisation each carry their own implications. Take under-utilisation first, because it is the one with a number attached.`),
    p(`**Higher average cost.** ${B.firm}'s ${usd(B.fixedCosts)} of fixed costs is carried by ${units(B.output, B.products)} instead of ${units(B.maxOutput)}: ${usd(B.fixedPerUnitAtOutput)} each instead of ${usd(B.fixedPerUnitAtCapacity)}. That is ${usd(B.spareCapacityCostPerUnit)} a ${B.product}, or **${usd(B.spareCapacityCostMonthly)} a month**, bought and not used.`),
    p(`**Effect on staff.** People with not enough to do know it. Morale falls, the best of them start looking, and the possibility of redundancy is in every conversation — which makes the workforce harder to keep exactly when the business may need it back.`),
    p(`**How it is read from outside.** Idle space and quiet machines tell a lender, a supplier and a potential customer the same thing about demand.`),
    p(`**And one genuine advantage.** Slack means a large rush order can be accepted, maintenance can happen, and a new model can be built without stopping anything. Under-utilisation is a cost, not a catastrophe.`),
  ],
  realExample: { emoji: '📦', text: `${B.firm} at ${pct(B.utilisation)} accepts an unexpected order for ${units(400, B.products)} at three weeks' notice. A factory at ${pct(B.peakUtilisation)} would have had to refuse it.` },
  misconception: `Students describe low utilisation as pure loss. The spare capacity is the reason a rush order can be taken, maintenance can be done and a new product can be trialled. The honest position is that it costs ${usd(B.spareCapacityCostPerUnit)} a ${B.product} here and buys the ability to say yes.`,
  examMatters: `An implications question is marked on consequences, not on description. "Utilisation is low" earns nothing; "utilisation is low, so the ${usd(B.fixedCosts)} of fixed costs is spread over ${units(B.output)} rather than ${units(B.maxOutput)}, adding ${usd(B.spareCapacityCostPerUnit)} to each ${B.product}" earns the chain.`,
  recall: {
    type: 'match',
    prompt: 'Match each consequence of persistent spare capacity to the reason it happens:',
    pairs: [
      { left: 'Average cost per unit is higher', right: 'The same fixed costs are divided among fewer units', why: 'Nothing about the way each unit is made has changed; only the number sharing the fixed bill has.' },
      { left: 'Skilled staff begin to leave', right: 'Visible idleness makes redundancy look likely', why: 'People act on what a quiet factory implies about next year, not on what was announced.' },
      { left: 'A large rush order can be accepted', right: 'There is unused capacity to put it through', why: 'This is the one consequence that works in the firm\'s favour, and it is why zero slack is not the target.' },
      { left: 'A lender asks harder questions', right: 'Idle capacity is read from outside as weak demand', why: 'The figure is public in a way the order book is not, so it becomes the outsider\'s evidence.' },
    ],
  },
});

const overUtilisation = sub('implications-of-over-utilisation', {
  title: 'Implications of Over-Utilisation',
  keyIdea: 'Running close to the maximum spreads fixed costs furthest, and at the same time removes the slack that maintenance, mistakes and new orders need.',
  body: [
    p(`Now the other direction, over-utilisation. In ${B.firm}'s peak month output reaches ${units(B.peakOutput, B.products)}: ${units(B.peakOutput)} ÷ ${units(B.maxOutput)} × 100 = **${pct(B.peakUtilisation)}**.`),
    p(`**The gain is real.** Fixed cost per ${B.product} is at its lowest, and this is the output at which average cost approaches its minimum. That is the whole reason a business wants high utilisation.`),
    p(`**Quality suffers.** Maintenance is postponed and staff work longer. The proportion needing correction rises from ${pct(B.reworkRate)} to ${pct(B.peakReworkRate)} — ${units(B.peakExtraRework)} more ${B.products} put right at ${usd(B.reworkCostLate)} each, **${usd(B.peakReworkCost)}** in the month.`),
    p(`**There is no room for anything going wrong.** A machine breakdown or a late delivery cannot be absorbed, so it becomes a late delivery to a customer — ${usd(B.latePenalty)} of penalties in that month — and an order that arrives unexpectedly has to be refused.`),
    p(`**Staff and equipment are run hard.** Sustained overtime produces tiredness and absence, and deferred maintenance eventually produces the breakdown it was deferring.`),
  ],
  realExample: { emoji: '🔥', text: `In the peak month ${B.firm} runs at ${pct(B.peakUtilisation)}, pays ${usd(B.peakReworkCost)} to correct the extra faults and ${usd(B.latePenalty)} in late-delivery penalties — ${usd(B.peakReworkCost + B.latePenalty)} against the fixed-cost saving it was chasing.` },
  misconception: `Students write that a business should aim for 100% utilisation. At 100% there is no time for maintenance, no cover for a breakdown, no capacity for an unexpected order and no slack for a mistake. Most businesses aim for a band a little below it, and this section's figures show why.`,
  examMatters: `The implications of over-utilisation are the half most answers skip, because high utilisation sounds like good news. An answer that gives the cost saving AND the quality, reliability and staff consequences is answering the whole question.`,
  recall: {
    type: 'classify',
    prompt: 'A factory moves from 78% to 98% utilisation. Sort each outcome by whether it helps or harms the business:',
    groups: [
      { name: 'Helps', items: ['Fixed costs are spread across more units than before', 'Equipment already paid for is finally earning'], why: 'Both follow from producing more on the same fixed base, which is the gain high utilisation is wanted for.' },
      { name: 'Harms', items: ['A breakdown now delays customer orders directly', 'Planned maintenance is postponed to keep the line running'], why: 'Both follow from having no slack left, so nothing can absorb a problem and the problems compound.' },
    ],
  },
});

const raisingUtilisation = sub('ways-of-raising-capacity-utilisation', {
  title: 'Ways of Raising Capacity Utilisation',
  keyIdea: 'A business with spare capacity can raise the top of the fraction by selling more or taking in other people\'s work, or lower the bottom of it by cutting the capacity itself.',
  body: [
    p(`Capacity utilisation can be improved when it is too low **and** when it is too high. This subsection is the under-utilisation half, and there are only two places to act: the output, or the capacity.`),
    p(`**Sell more.** ${RAISE_UTILISATION[0]}. The answer everybody gives, and the slowest of the three.`),
    p(`**Take in work.** ${RAISE_UTILISATION[1]}. ${B.firm} takes in ${units(B.subcontractIn)} frames a month for another assembler: output ${units(B.outputWithSubcontract)}, utilisation ${pct(B.utilisationWithSubcontract)}, and fixed cost per ${B.product} down from ${usd(B.fixedPerUnitAtOutput)} to ${usd(B.fixedPerUnitWithSubcontract)}.`),
    p(`**Cut the capacity.** ${RAISE_UTILISATION[2]}. This is the one students forget, and it is the one that moves the figure fastest, because it moves the denominator. Closing one of ${B.firm}'s four lines takes maximum output from ${units(B.maxOutput)} to ${units(B.maxAfterClosure)}: the same ${units(B.output, B.products)} is now ${pct(B.utilisationAfterClosure)}, a rise of ${pts(B.utilisationRisePts)}, with nothing extra sold to anybody.`),
    p(`That last case is where marks are lost. Utilisation rose because the capacity fell. Average cost fell too, to ${usd(B.avgAfterClosure)}, since the closed line's charges went with it — but the business can no longer make more than ${units(B.maxAfterClosure)}, and that is expensive to reverse.`),
  ],
  realExample: { emoji: '✂️', text: `${B.firm} closes one line and reports utilisation up from ${pct(B.utilisation)} to ${pct(B.utilisationAfterClosure)}. Not one extra ${B.product} was sold; the factory simply got smaller.` },
  misconception: `Students read every rise in capacity utilisation as a rise in demand. It is a fraction, and cutting the denominator raises it just as reliably as raising the numerator. Before praising an improved figure, check whether the business sold more or closed something.`,
  examMatters: `A Calculate item that changes the capacity rather than the output is the standard twist here. Recompute the denominator first, and then say in one sentence what really happened — a common mark is for noticing that output did not change.`,
  recall: {
    type: 'fillin',
    prompt: 'A plant makes 6,000 units a month with a maximum of 10,000. It then closes a line, taking the maximum to 7,500. Complete the calculation:',
    template: [
      'Before the closure: 6,000 ÷ 10,000 × 100 = ___%.',
      'After the closure: 6,000 ÷ 7,500 × 100 = ___%.',
      'The number of units sold changed by ___.',
    ],
    answers: ['60', '80', 'nothing'],
    hints: ['divide by the original maximum', 'divide by the new maximum', 'compare the two output figures in the question'],
    distractors: ['75', '125', '1,500'],
  },
});

const relievingOverUtilisation = sub('ways-of-relieving-over-utilisation', {
  title: 'Ways of Relieving Over-Utilisation',
  keyIdea: 'A business too close to its maximum can send work out, add hours, add capacity or manage the demand — and the four differ in speed and in how long they commit it.',
  body: [
    p(`The over-utilisation half. A business running too close to its maximum has four answers available, and they differ in how quickly they work and in how long they commit it.`),
    p(`**Send work out.** ${RELIEVE_UTILISATION[0]}. ${B.firm} subcontracts ${units(B.subcontractOut)} of the peak ${units(B.peakOutput)}, bringing its own output to ${units(B.inHouseAtPeak)} and utilisation to ${pct(B.utilisationAfterRelief)}. It works immediately and commits nothing, and it hands a competitor the work and the margin.`),
    p(`**Add hours.** ${RELIEVE_UTILISATION[1]}. Fast, and reversible, and it raises the cost of each unit and eventually produces the tiredness and absence that caused the problem.`),
    p(`**Add capacity.** ${RELIEVE_UTILISATION[2]}. The only permanent answer, and the only one that cannot be undone if the demand turns out to be temporary.`),
    p(`**Manage the demand.** ${RELIEVE_UTILISATION[3]}. Raising the price rations orders and protects margin; scheduling moves them into quiet months. Both turn away business the firm could have had.`),
    p(`The choice turns on one question: is the extra demand permanent? Temporary peaks are answered with hours and subcontractors; a permanent rise with capacity.`),
  ],
  realExample: { emoji: '🤝', text: `${B.firm} sends ${units(B.subcontractOut)} ${B.products} a month to a subcontractor for the three peak months rather than building a fifth line it would run at ${pct(B.utilisation)} for the other nine.` },
  misconception: `Students answer over-utilisation with "expand the factory" every time. Expansion is the right answer only if the demand lasts. A business that builds capacity for a three-month peak spends the other nine months explaining a utilisation figure that has fallen.`,
  examMatters: `The evaluative sentence this material is built for is about permanence. Two answers that both name subcontracting are separated by the one that says why it fits a temporary peak and why capacity would not.`,
  recall: {
    type: 'match',
    prompt: 'Match each way of relieving over-utilisation to the circumstance it suits:',
    pairs: [
      { left: 'Subcontract work out', right: 'A short peak, where committing to anything permanent would be wrong', why: 'It can be switched off at the end of the peak, which is exactly what a permanent solution cannot do.' },
      { left: 'Overtime and temporary staff', right: 'A few weeks of extra orders that staff can absorb', why: 'It is the fastest to arrange and the one whose cost rises the longer it runs.' },
      { left: 'Invest in more capacity', right: 'Demand that has risen and is expected to stay risen', why: 'It is the only answer that is still working in three years, and the only one that cannot be reversed cheaply.' },
      { left: 'Raise the price', right: 'Orders exceeding what the business can make even with help', why: 'It rations demand rather than meeting it, which protects delivery and margin at the cost of turning work away.' },
    ],
  },
});

/* ══ Chapter 3 — Inventory Control (2.3.4 · 3a-3f) ═════════════════════════ */

const readingTheDiagram = sub('reading-an-inventory-control-diagram', {
  title: 'Reading an Inventory Control Diagram',
  keyIdea: 'An inventory control diagram plots what is held against time as a repeating sawtooth: a steady fall as items are used, and a vertical jump when a delivery lands.',
  body: [
    p(`**Interpreting an inventory control diagram** means reading four things off a chart rather than describing one in words.`),
    p(`${B.firm} fits ${num(B.tyresPerUnit)} tyres to every ${B.product} and makes ${units(B.output)} a month over ${num(B.workingDays)} working days, so it uses ${units(B.output * B.tyresPerUnit)} ÷ ${num(B.workingDays)} = **${units(B.tyresPerDay)} tyres a day**. That usage rate is the slope of every falling line on the chart.`),
    p(`The store holds at most ${units(B.maxInventory)} tyres and never plans to drop below ${units(B.bufferInventory)}. The difference is what each delivery brings: ${units(B.maxInventory)} − ${units(B.bufferInventory)} = **${units(B.orderQuantity)} tyres**, and at ${units(B.tyresPerDay)} a day that lasts ${days(B.cycleDays)} — which is why the pattern repeats every ${days(B.cycleDays)}.`),
    p(`A supplier takes ${days(B.deliveryDelayDays)} to deliver, so the order goes out while ${days(B.deliveryDelayDays)} of usage still sits above the planned floor: ${units(B.bufferInventory)} + ${num(B.deliveryDelayDays)} × ${units(B.tyresPerDay)} = **${units(B.orderPoint)} tyres**. That horizontal line is where each order is placed.`),
    { type: 'flow', resultType: 'neutral', steps: [
      { title: 'The line falls at the usage rate', subtitle: `${units(B.tyresPerDay)} tyres a day` },
      { title: 'It crosses the order line and an order goes out', subtitle: units(B.orderPoint, 'tyres') },
      { title: 'It keeps falling for the delivery delay', subtitle: `${days(B.deliveryDelayDays)}, down to ${units(B.bufferInventory)}` },
      { title: 'The delivery lands and the line jumps', subtitle: `${units(B.orderQuantity)} tyres, back to ${units(B.maxInventory)}` },
    ] },
  ],
  realExample: { emoji: '📊', text: `${B.firm}'s store manager reads one month off the chart: two deliveries of ${units(B.orderQuantity)} tyres, ${days(B.cycleDays)} apart, each ordered ${days(B.deliveryDelayDays)} before it landed.` },
  misconception: `Students read the vertical jumps as the important part of the chart and ignore the slope. The slope is the usage rate, and it is what every question actually turns on: change it and the order point, the interval between deliveries and the days of cover all change with it.`,
  examMatters: `The diagram is examined by being handed to you with one value missing. Work out the daily usage first — it unlocks every other figure — and read the horizontal lines as levels rather than as events.`,
  recall: {
    type: 'fillin',
    prompt: 'A workshop uses 90 components a day, never plans to hold fewer than 500, and its supplier takes 6 days. Complete the reading:',
    template: [
      'Usage over the delivery period is 6 × 90 = ___ components.',
      'The order must therefore go out while ___ components are still held.',
      'If each delivery brings 1,800 components, the pattern repeats every ___ days.',
    ],
    answers: ['540', '1040', '20'],
    hints: ['multiply the days by the daily usage', 'add that to the planned floor of 500', 'divide the delivery size by the daily usage'],
    distractors: ['600', '500', '15'],
  },
});

const bufferInventory = sub('buffer-inventory', {
  title: 'Buffer Inventory',
  keyIdea: 'Buffer inventory is the amount a business plans never to go below, held so that a late delivery or an unexpected order does not stop production.',
  body: [
    p(`**Buffer inventory** is a decision rather than a leftover. ${B.firm} sets its buffer at ${units(B.bufferInventory)} tyres, which at ${units(B.tyresPerDay)} a day is ${days(B.bufferCoverDays)} of production.`),
    p(`It is bought with two things. **Cash**, because ${units(B.bufferInventory)} tyres sitting on a shelf is money the business cannot use for anything else. And **holding cost**: across the whole cycle ${B.firm} holds an average of ${units(B.averageInventory)} tyres at ${usd(B.holdingCostPerTyre)} a tyre a month, so storage, insurance and handling come to ${usd(B.holdingCostMonthly)} a month.`),
    p(`What it buys is time. A supplier who is ${days(3)} late costs nothing at all, because there is ${days(B.bufferCoverDays)} of cover below the planned floor. The same delay with no buffer stops the line, and one stopped day costs ${units(B.outputPerDay, B.products)} at a contribution of ${usd(B.contribution)} each — **${usd(B.stoppageCost)}**.`),
    p(`So the size of the buffer follows from two things the business can actually estimate: how unreliable its suppliers are, and how expensive a stoppage is. A cheap component from a distant supplier gets a large buffer; an expensive one from next door gets a small one.`),
  ],
  realExample: { emoji: '🛞', text: `A tyre delivery to ${B.firm} arrives ${days(3)} late. The line does not stop, because the buffer holds ${days(B.bufferCoverDays)} of tyres — and the ${usd(B.holdingCostMonthly)} a month it costs to hold has just avoided ${usd(B.stoppageCost)}.` },
  misconception: `Students treat buffer inventory as a mistake to be eliminated. It is insurance, and like any insurance it is worth what it prevents. The right question is never "how do we get rid of it" but "how much is a stopped line worth, and how unreliable are the people delivering to us".`,
  examMatters: `A question on buffer inventory wants a cost on both sides. Name what holding it costs — cash tied up plus storage — and what not holding it risks, and the evaluation writes itself.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each situation by the size of buffer inventory it justifies:',
    groups: [
      { name: 'A larger buffer', items: ['A component shipped from three weeks away', 'A line where one missing part halts every other stage'], why: 'Both raise what a shortage costs or how long it would last, and the buffer is bought to cover exactly that.' },
      { name: 'A smaller buffer', items: ['A part delivered daily by a supplier in the same town', 'An item that loses value quickly while it sits'], why: 'Both lower the risk of running short or raise the cost of holding, so the insurance is worth less than it costs.' },
    ],
  },
});

const poorInventoryControl = sub('implications-of-poor-inventory-control', {
  title: 'Implications of Poor Inventory Control',
  keyIdea: 'Holding too little stops production and loses orders; holding too much ties up cash, costs storage and lets items spoil — and the failure runs in both directions.',
  body: [
    p(`Poor inventory control is worth its own treatment because "poor" means two opposite things.`),
    p(`**Holding too little.** ${POOR_INVENTORY[0]}. ${B.firm} loses ${units(B.outputPerDay, B.products)} for every day the line waits — ${usd(B.stoppageCost)} of contribution — and ${POOR_INVENTORY[4]}.`),
    p(`**Holding too much.** ${POOR_INVENTORY[1]}. ${POOR_INVENTORY[2]}: ${B.firm}'s own holding bill is ${usd(B.holdingCostMonthly)} a month. And ${POOR_INVENTORY[3]} — a tyre that has sat through a model change may be worth nothing at all.`),
    p(`Both failures show up as the same symptom on a profit statement — a lower margin — which is why a business has to look at what it is holding rather than at what it is earning. The diagram in this chapter is the instrument for that.`),
  ],
  realExample: { emoji: '🗃️', text: `${B.firm} finds ${units(900)} tyres for a wheel size it stopped fitting two models ago. They cost money to buy, ${usd(B.holdingCostPerTyre)} a month each to keep, and will be sold for scrap.` },
  misconception: `Students assume poor inventory control means running out. Running out is half of it. Holding too much is the half that quietly destroys margin: the cash is gone, the storage is paid, and nothing about the profit statement says which shelf it went to.`,
  examMatters: `An 8- or 10-mark item on inventory rewards both directions. Give one consequence of too little and one of too much, each with a cost or a lost sale attached, and the balance the command word wants is already on the page.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each symptom by which failure of inventory control it points to:',
    groups: [
      { name: 'Holding too little', items: ['Assembly stopped twice last month waiting for one part', 'A customer cancelled after a promised date was missed'], why: 'Both are consequences of not having something when it was needed, which is the shortage direction.' },
      { name: 'Holding too much', items: ['A third of the warehouse holds parts for a discontinued model', 'The insurance premium on the store has doubled'], why: 'Both are costs of keeping items rather than of lacking them, which is the excess direction.' },
    ],
  },
});

const justInTime = sub('just-in-time', {
  title: 'Just in Time',
  keyIdea: 'Just in time means items arrive as they are needed rather than being held in advance — which removes almost all the holding cost and removes almost all the protection with it.',
  body: [
    p(`Under **just in time (JIT)**, materials are ordered to arrive at the moment production needs them, so what is held falls to a fraction of what a conventional cycle holds.`),
    p(`${B.firm} costed the change. Today it holds an average of ${units(B.averageInventory)} tyres, costing ${usd(B.holdingCostMonthly)} a month. Under daily deliveries with one day of cover it would hold an average of ${units(B.jitAverageInventory)}, costing ${usd(B.jitHoldingCostMonthly)} — a saving of **${usd(B.jitSavingMonthly)} a month**, plus the cash released and the floor space freed.`),
    p(`Now the other side, from the same figures. With ${days(1)} of cover instead of ${days(B.bufferCoverDays)}, a supplier who is two days late stops the line for a day: ${units(B.outputPerDay, B.products)} not made, at ${usd(B.contribution)} of contribution each, is **${usd(B.stoppageCost)}**. That single day costs ${num(B.stoppageMonthsOfSaving)} months of the saving it was bought with.`),
    p(`So JIT trades a certain, small, monthly saving against an uncertain, large, occasional loss. What it demands is suppliers who are close, frequent and dependable, and a business able to change over quickly enough to work in small quantities.`),
  ],
  realExample: { emoji: '🚚', text: `${B.firm} moves its tyres to daily delivery and keeps ${days(B.bufferCoverDays)} of cover on brake parts, which come from further away. The saving is smaller than the full JIT figure, and so is the exposure.` },
  misconception: `Students write that JIT means holding no inventory at all. It minimises what is held rather than eliminating it, and what is left is whatever the supply chain can be trusted with — almost never zero: ${B.firm}'s own JIT case still holds ${days(1)}. A business that reads "zero" and orders nothing has not adopted JIT, it has removed its own insurance.`,
  examMatters: `Every JIT question is an evaluation, whatever the command word. The saving is easy to state and easy to calculate; the mark that separates answers is the condition — reliable, frequent, nearby supply — and what happens when that condition fails.`,
  recall: {
    type: 'match',
    prompt: 'Match each feature of just-in-time production to what it produces for the business:',
    pairs: [
      { left: 'Materials arrive as production needs them', right: 'Holding costs and tied-up cash fall sharply', why: 'Nothing sits on a shelf being insured, stored and handled, which is where the saving comes from.' },
      { left: 'Very little is held in reserve', right: 'A late delivery stops production almost at once', why: 'The protection that a reserve provides has been sold for the saving, so the exposure is the same decision seen from the other side.' },
      { left: 'Deliveries are frequent and small', right: 'Suppliers must be close, dependable and willing', why: 'The method rests on the supply chain, so the firm has taken on a dependency it does not control.' },
      { left: 'Faults cannot be hidden behind a reserve', right: 'Problems surface immediately and have to be fixed', why: 'This is the advantage that is not about cost: with no cushion, a quality problem is visible the day it happens.' },
    ],
  },
});

const wasteMinimisation = sub('waste-minimisation', {
  title: 'Waste Minimisation',
  keyIdea: 'Waste is anything the customer would not pay for — items held, work corrected, time waiting and moving — and removing it lowers cost without lowering what is delivered.',
  body: [
    p(`**Waste minimisation** has a test that makes it usable, and it is simple: would the customer pay for this if they could see it? Everything that fails the test is waste, whether or not it appears as a cost line.`),
    p(`${B.firm} measured three kinds in one month. **${WASTE_KINDS[0].replace(/^./, (c) => c.toUpperCase())}**: ${usd(B.holdingCostMonthly)} of storage, insurance and handling. **${WASTE_KINDS[1].replace(/^./, (c) => c.toUpperCase())}**: ${units(B.reworkUnits, B.products)} put right at ${usd(B.reworkCostLate)} each, ${usd(B.reworkCostMonthly)}. **${WASTE_KINDS[2].replace(/^./, (c) => c.toUpperCase())}**: ${usd(B.waitingAndMovingMonthly)} of paid time in which nothing was produced.`),
    p(`Together that is **${usd(B.wasteMonthly)} a month**, or ${usd(B.wastePerUnit)} on every ${B.product} made. Removing it takes average cost from ${usd(B.avgAtOutput)} to ${usd(B.avgAfterWaste)} without a single change to the ${B.product} the customer receives.`),
    p(`That last clause is what separates waste minimisation from cost cutting. Taking out a quality check or a training day lowers cost and lowers what arrives; taking out thirty metres of unnecessary carrying lowers cost and changes nothing the customer can see.`),
  ],
  realExample: { emoji: '🧹', text: `${B.firm} moves two benches together and removes ${usd(1400)} a month of carrying time. The ${B.product} is identical, the price is identical, and the cost of making it is not.` },
  misconception: `Students equate waste with scrap material. Most of the money is in the two kinds nobody throws away: items held that did not need holding, and paid time in which nothing was produced. ${B.firm}'s scrapped material is not even the largest of the three lines above.`,
  examMatters: `Use the customer test explicitly in an answer — "the customer would not pay for the time this part spent being carried" — because it is what turns a list of wastes into analysis, and it is a sentence markers can credit.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each activity by whether a customer would knowingly pay for it:',
    groups: [
      { name: 'Waste, by the customer test', items: ['Storing parts for six weeks before they are used', 'Carrying half-built units between two distant benches', 'Rebuilding a unit that failed its final check'], why: 'None of the three adds anything the customer receives, so each is cost the product carries for nothing.' },
      { name: 'Not waste', items: ['Fitting and tensioning the wheels', 'Designing the next model'], why: 'The first is the product being made and the second is what there will be to sell next year; both buy something the customer eventually pays for.' },
    ],
  },
});

const leanProduction = sub('competitive-advantage-from-lean-production', {
  title: 'Competitive Advantage from Lean Production',
  keyIdea: 'Lean production is the whole approach that removing waste and holding less belong to, and its competitive advantage is a lower cost per unit reached without lowering quality.',
  body: [
    p(`Before the **competitive advantage from lean production**, be clear what lean production is: an approach that treats anything not adding value for the customer as something to be removed. Just in time and waste minimisation are two of its instruments, not alternatives to it.`),
    p(`For ${B.firm} the advantage is a number. Removing ${usd(B.wasteMonthly)} of waste takes average cost to ${usd(B.avgAfterWaste)}; adding chapter 1's productivity gain takes it to **${usd(B.avgAfterWasteAndProductivity)}**, against ${B.rival}'s ${usd(B.rivalAverageCost)}.`),
    p(`${usd(B.advantagePerUnit)} a ${B.product} is what ${B.firm} can now do something with: undercut ${B.rival} and keep its margin, or match its price and earn more on each sale. Nothing the customer receives has changed.`),
    p(`Lean also buys advantages that are not costs: less cash locked up, less space needed, problems surfacing at once instead of hiding behind a reserve, and quicker changes of product.`),
    p(`The honest caution: lean removes the slack that absorbs shocks. A business that has taken out its buffers, its spare capacity and its spare time cannot survive a supplier failure.`),
  ],
  realExample: { emoji: '🏁', text: `${B.firm} reaches ${usd(B.avgAfterWasteAndProductivity)} a ${B.product} against ${B.rival}'s ${usd(B.rivalAverageCost)} and uses ${usd(B.advantagePerUnit)} of it to cut its price, winning a contract it had been losing on price alone.` },
  misconception: `Students use "lean" and "just in time" as the same word. JIT is one technique inside lean, which also covers waste minimisation, cell working, continuous improvement and quality at the source. A business can run JIT and be nowhere near lean, and it can be lean while still holding a deliberate buffer.`,
  examMatters: `3f says competitive ADVANTAGE, so the answer has to end at the market, not at the factory. Follow the chain to a price the business can now charge or a margin it can now earn, and add the risk sentence — the highest marks here go to answers that price the fragility as well as the saving.`,
  recall: {
    type: 'match',
    prompt: 'Match each element of lean production to the advantage it delivers:',
    pairs: [
      { left: 'Removing activities the customer would not pay for', right: 'A lower cost per unit with the product unchanged', why: 'This is the whole definition working: cost leaves and nothing the buyer receives does.' },
      { left: 'Holding far less between stages', right: 'Cash and floor space released for something else', why: 'Inventory is money and area at the same time, so cutting it returns both.' },
      { left: 'Working in small quantities', right: 'The ability to change what is made more quickly', why: 'A short run can be switched; a long one has to be finished, which is why flexibility comes with small quantities.' },
      { left: 'No reserve to hide behind', right: 'Problems become visible the day they happen', why: 'It is an advantage and an exposure in one feature, which is why the evaluation of lean always has two sides.' },
    ],
  },
});

/* ══ Chapter 4 — Quality Management (2.3.4 · 4a-4d) ════════════════════════ */

const controlAndAssurance = sub('quality-control-and-quality-assurance', {
  title: 'Quality Control and Quality Assurance',
  keyIdea: 'Quality control inspects the output after it has been made; quality assurance builds the checking into every stage so that faults are prevented rather than found.',
  body: [
    p(`Three things sit under quality: **control**, **assurance** and **circles**. The first two are the pair students most often blur, and the difference is WHEN the checking happens.`),
    p(`**Quality control** inspects what has been produced. ${B.firm} checks every ${B.product} at the end of the line and finds ${pct(B.reworkRate)} of ${units(B.output)} — ${units(B.reworkUnits)} ${B.products} — needing correction at ${usd(B.reworkCostLate)} each: **${usd(B.reworkCostMonthly)} a month**. The fault is caught, and everything spent building it has already been spent.`),
    p(`**Quality assurance** builds the checking into each stage, so the person doing the work is responsible for what leaves their bench. ${B.firm}'s rate falls to ${pct(B.assuranceRate)} — ${units(B.assuranceUnits)} ${B.products} — and each correction costs ${usd(B.reworkCostEarly)} instead of ${usd(B.reworkCostLate)}, because it is caught before more work is added: **${usd(B.assuranceCostMonthly)} a month**, a saving of ${usd(B.qualitySavingMonthly)}.`),
    p(`And there is a third figure neither system puts on a production report. ${pct(B.escapeRate)} of ${B.products} still reach a customer faulty — ${units(B.escapeUnits)} a month at ${usd(B.warrantyCostPerUnit)} to replace and deliver, **${usd(B.warrantyCostMonthly)}** — before anything is counted for the customer who does not come back.`),
  ],
  realExample: { emoji: '🔎', text: `${B.firm} moves the wheel check from the end of the line into the wheel cell. A mis-tensioned wheel is now found before the frame, the brakes and an hour of assembly have been added to it.` },
  misconception: `Students say quality assurance means there is no inspection. Checking still happens; it happens at every stage and is done by the person doing the work, rather than at the end by an inspector. What assurance removes is the separate inspection department, not the checking.`,
  examMatters: `The distinction is marked on timing and responsibility: control is after the event by an inspector, assurance is during by the worker. Add a cost consequence — a fault found later costs more because more has been added to it — and the answer is doing analysis rather than defining.`,
  recall: {
    type: 'fillin',
    prompt: 'A canning factory uses all three. Complete the description of what each one is:',
    template: [
      'Quality control rejects finished tins at the end of the belt, so it is ___: the fault has already been paid for.',
      'Quality assurance has each operator sign off their own stage, so it is ___: the fault is stopped before it travels.',
      'Total Quality Management reaches the accounts office too, so it is ___ rather than a production system.',
    ],
    answers: ['reactive', 'preventive', 'cultural'],
    hints: ['it acts after the event', 'it acts before the event', 'it is about how the whole organisation behaves'],
    distractors: ['optional', 'automatic'],
  },
});

const qualityCircles = sub('quality-circles', {
  title: 'Quality Circles',
  keyIdea: 'A quality circle is a small group of the people who do the work, meeting regularly to identify problems in their own area and propose solutions to them.',
  body: [
    p(`**Circles** is the third of those three, beside control and assurance, and it is a distinct thing rather than another name for continuous improvement.`),
    p(`A quality circle is a small voluntary group — typically the people who work on one process — that meets regularly, chooses a problem in its own area, investigates it, and takes a proposal to management. It has three defining features: the members do the work themselves, they choose what to look at, and their output is a recommendation.`),
    p(`Why it works is that the knowledge is already in the room. The person fitting wheels all day knows which jig slips and which delivery arrives short; nobody else in the business does. The circle is a way of getting that knowledge somewhere it can be acted on.`),
    p(`Why it fails is equally predictable. A circle whose proposals are never implemented stops proposing; a circle that management appoints and directs is a meeting. It needs time set aside — which costs the business production — and it needs the answer to at least some proposals to be yes.`),
  ],
  realExample: { emoji: '💬', text: `${B.firm}'s wheel cell meets for an hour each Friday. Its first proposal — reposition the tyre rack so the fitter stops turning away from the bench — removes forty seconds from each wheel, and is implemented the next week.` },
  misconception: `Students treat quality circles as a way of announcing a quality target. A circle does not set targets; it identifies problems and proposes solutions, and the people in it are the people who do the work. A group of managers discussing quality is not a quality circle.`,
  examMatters: `Circles are the part of 4a most answers omit entirely, so naming them and giving the three features — the workers themselves, their own choice of problem, a proposal to management — is straightforward knowledge marks that many candidates leave on the table.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each group by whether it is a quality circle:',
    groups: [
      { name: 'A quality circle', items: ['Six assembly workers meeting weekly to investigate a recurring fault on their own line', 'A packing team choosing which of its own problems to study next'], why: 'In each case the people who do the work chose the problem themselves and will take a proposal upward.' },
      { name: 'Not a quality circle', items: ['A board meeting agreeing a target for defect rates', 'An external consultant auditing the factory'], why: 'Neither is made up of the people doing the work, and neither is choosing its own problem from inside the process.' },
    ],
  },
});

const tqm = sub('total-quality-management', {
  title: 'Total Quality Management',
  keyIdea: 'Total Quality Management makes quality the responsibility of everyone in the business, with each department treating the next one as its customer.',
  body: [
    p(`In **Total Quality Management**, the word carrying the meaning is "total". Control and assurance are systems inside production. TQM extends the same responsibility to purchasing, to design, to despatch and to the office, on the argument that a fault in any of them reaches the customer just as surely.`),
    p(`Its working idea is the internal customer: every department treats the next department in the chain as a customer whose requirements must be met exactly. Purchasing is not finished when the tyres are bought; it is finished when the tyres the wheel cell needed arrive on the day it needed them.`),
    p(`What it takes is the part students underestimate. TQM needs training across the whole business, people at every level authorised to stop something being passed on, and years rather than months before the change in habit is real. It is a change in culture, and culture is slow.`),
    p(`What it returns, where it works, is fewer faults reaching anybody: fewer corrections inside the factory and fewer of the ${units(B.escapeUnits)} ${B.products} a month that currently reach a customer wrong and cost ${usd(B.warrantyCostMonthly)}.`),
  ],
  realExample: { emoji: '🔗', text: `${B.firm} asks its despatch team what it needs from assembly. The answer — ${B.products} presented wheels-forward so the packing straps go on without turning them — has nothing to do with quality as production defined it, and takes four minutes off every dispatch.` },
  misconception: `Students reach for TQM whenever an extract mentions faults, as though it could be switched on this quarter. Its cost arrives first and its return late, which is why it is abandoned more often than disproved. A fault rate that must fall before the next order ships is a different question.`,
  examMatters: `A question comparing TQM with quality control is asking about scope and cost. TQM is wider and slower and needs training everybody; control is narrow and immediate and needs inspectors. Say which suits the business in front of you and why, and the judgement mark is there.`,
  recall: {
    type: 'match',
    prompt: 'Match each feature of Total Quality Management to what it requires of the business:',
    pairs: [
      { left: 'Quality is everyone\'s responsibility, not production\'s', right: 'Training for departments that never handled the product', why: 'The responsibility cannot be extended to people who have not been shown what it means for their own work.' },
      { left: 'Each department treats the next as its customer', right: 'Departments must agree what they need from each other', why: 'The idea only bites once requirements are stated, which is a conversation most businesses have never had.' },
      { left: 'Anyone may stop a fault being passed on', right: 'Authority pushed down to the people doing the work', why: 'A worker without that authority can only report the fault onward, which is the system TQM replaces.' },
      { left: 'Progress is measured over years rather than quarters', right: 'A programme dropped after twelve months has bought the cost and none of the return', why: 'This is why TQM fails more often than it is wrong: the approach is sound and the business gives up before it lands.' },
    ],
  },
});

const kaizen = sub('continuous-improvement', {
  title: 'Continuous Improvement (Kaizen)',
  keyIdea: 'Kaizen is continuous improvement in small steps, made by the people who do the work, so that the standard is raised repeatedly rather than occasionally.',
  body: [
    p(`**Continuous improvement (Kaizen)** claims that a great many small improvements, made continuously by the people doing the work, are worth more than occasional large projects — and are far cheaper, because each step is small enough to try.`),
    p(`The cycle has four stages and they run in a fixed order: **identify** a problem in the work; **test** a change on a small scale; **implement** it if it worked; **standardise** it so that it becomes the way the job is done, which is where the next cycle starts from.`),
    p(`The fourth stage is the one that does the work and the one businesses skip. An improvement that is not written into the standard way of working is an improvement that leaves with the person who made it. Standardising is what stops the process sliding back, and it is what makes the next improvement start from a higher floor.`),
    p(`${B.firm}'s ${usd(B.waitingAndMovingMonthly)} of waiting and moving did not leave in one decision. It left in a sequence of changes — a rack moved, a bench turned, a delivery rescheduled — each one small, each one proposed by whoever was standing there.`),
  ],
  realExample: { emoji: '🪜', text: `${B.firm}'s assembly team makes eleven small changes in a quarter. No single one saves more than ${usd(200)} a month; together they are most of the ${usd(B.waitingAndMovingMonthly)} that waiting and moving used to cost.` },
  misconception: `Students dismiss kaizen because no single change is worth much, and a repositioned rack reads as trivial beside a new machine. The size of a step is the point of it, not the objection to it: small enough to try is cheap enough to undo. Judge kaizen on what a year of steps adds up to.`,
  examMatters: `Kaizen answers are strongest when they name the standardise step, because that is where the difference between continuous improvement and a suggestion scheme actually lies. An answer that stops at "staff suggest improvements" has described half of it.`,
  recall: {
    type: 'reorder',
    prompt: 'A packing team runs one kaizen cycle. Put its four moves in the order the team worked through them, from noticing the problem to making the change permanent:',
    correctOrder: [
      'A packer identifies that the tape dispenser is out of reach',
      'One bench tries the new position for a week',
      'All six packing stations are changed once the trial has worked',
      'The written work instruction is updated so the new position is standard',
    ],
    criterion: 'the order the team actually worked through, from noticing the problem to writing the improvement into the standard',
    why: [
      'Nothing can be improved until somebody names what is wrong, and the naming comes from the person doing the work.',
      'The change is tried on one bench first because a small trial is cheap to reverse when it turns out not to help.',
      'Rolling it out to the rest only makes sense once the trial has shown it works, which is what keeps the cycle cheap.',
      'Writing it into the instruction is what stops the process sliding back, and it is the floor the next cycle starts from.',
    ],
  },
});

const qualityAdvantage = sub('competitive-advantage-from-quality-management', {
  title: 'Competitive Advantage from Quality Management',
  keyIdea: 'Managing quality lowers the cost of putting things right and raises what customers will pay and how often they return — but it costs money up front and takes time to show.',
  body: [
    p(`There are two routes to **competitive advantage from quality management**: one through cost and one through price.`),
    p(`**Through cost.** Moving from inspection at the end to checking at each stage takes ${B.firm}'s correction bill from ${usd(B.reworkCostMonthly)} to ${usd(B.assuranceCostMonthly)} a month — ${usd(B.qualitySavingMonthly)} — and cuts into the ${usd(B.warrantyCostMonthly)} it pays for the ${units(B.escapeUnits)} ${B.products} that still reach customers faulty.`),
    p(`**Through price and repeat business.** A reputation for ${B.products} that do not come back supports a higher price, wins the retailers who care about returns, and brings customers back for their next one. That is the larger effect and the one no production report measures.`),
    p(`**Against it.** Assurance needs training and time; TQM needs both for years; circles cost production hours. The returns arrive later than the costs, which is why quality programmes are abandoned in their first year more often than they are found not to work.`),
    p(`So the judgement is about the market. Where customers can see quality and switch on it, the investment returns. Where they buy on price alone, a business can spend heavily on quality and be undercut by a rival that did not.`),
  ],
  realExample: { emoji: '🏆', text: `A retailer moves its orders to ${B.firm} after two seasons without a warranty return. The price ${B.firm} quoted was not the lowest it received.` },
  misconception: `Students treat better quality as automatically better business. It is an investment, and like any investment it has to earn more than it cost in a market that will pay for it. In a market buying purely on price, the money spent on quality is money a competitor did not spend.`,
  examMatters: `This is a competitive advantage question, so the answer ends in the market. Give the cost route and the price route, then say which one matters more for the business in the case and why — that comparison is where the evaluation marks live.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each outcome by whether it is an argument for investing in quality management or a caution against it:',
    groups: [
      { name: 'An argument for it', items: ['Fewer units returned under warranty each month', 'Retailers choosing a supplier on reliability rather than price'], why: 'Each turns quality into money, one by removing a cost and one by winning an order.' },
      { name: 'A caution against it', items: ['Training costs arriving long before any saving does', 'A market in which buyers compare only the price'], why: 'Each is a reason the investment may not return, which is what an evaluation has to weigh rather than assume away.' },
    ],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [
      jobAndBatch, flowAndCell, choosingAMethod,
      measuringProductivity, factorsInfluencingProductivity, improvingProductivityAndCompetitiveness,
      efficiencyAtMinimumAverageCost, improvingEfficiency,
      labourAndCapitalIntensive, shortLeadInTimes,
    ],
    takeaway: [
      'Four methods, not three: job, batch, flow and cell.',
      'Productivity is output per input; efficiency is minimum average cost.',
      'Capital-intensive is cheaper only above a volume you can calculate.',
    ],
  },
  {
    title: B2,
    subs: [measuringCapacityUtilisation, underUtilisation, overUtilisation, raisingUtilisation, relievingOverUtilisation],
    takeaway: [
      'Current output over maximum possible output, times one hundred.',
      'The figure also rises when the capacity falls, so check which moved.',
      'Full utilisation has no room for maintenance, mistakes or a rush order.',
    ],
  },
  {
    title: B3,
    subs: [readingTheDiagram, bufferInventory, poorInventoryControl, justInTime, wasteMinimisation, leanProduction],
    takeaway: [
      'Read the slope first: usage a day unlocks every other figure.',
      'Buffer inventory is insurance, and it is worth what it prevents.',
      'JIT minimises what is held; it does not eliminate it.',
    ],
  },
  {
    title: B4,
    subs: [controlAndAssurance, qualityCircles, tqm, kaizen, qualityAdvantage],
    takeaway: [
      'Control inspects after; assurance checks during; TQM makes it everyone\'s.',
      'A quality circle is the workers, choosing their own problem.',
      'Kaizen without the standardise step is a suggestion box.',
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
 * THE LEAF MAP, BY HAND. 28 substantive leaves at `bus_spec.txt:965-999` (32 rows in
 * `spec-items.json`, four of them the `requirement` parents). Every one is named against the
 * subsection that teaches it, and the corrected citation for every ledger id runs through this
 * table rather than through the id's own "2.4.x" numbering.
 */
export const LEAF_MAP = {
  'BUS-2.3.4-1a-1': ['job-and-batch-production'],
  'BUS-2.3.4-1a-2': ['job-and-batch-production'],
  'BUS-2.3.4-1a-3': ['flow-and-cell-production'],
  'BUS-2.3.4-1a-4': ['flow-and-cell-production'],
  'BUS-2.3.4-1b-1': ['measuring-productivity'],
  'BUS-2.3.4-1b-2': ['factors-influencing-productivity'],
  'BUS-2.3.4-1b-3': ['improving-productivity-and-competitiveness'],
  'BUS-2.3.4-1b-4': ['improving-productivity-and-competitiveness'],
  'BUS-2.3.4-1c-1': ['efficiency-at-minimum-average-cost'],
  'BUS-2.3.4-1c-2': ['factors-and-ways-to-improve-efficiency'],
  'BUS-2.3.4-1c-3': ['factors-and-ways-to-improve-efficiency'],
  'BUS-2.3.4-1d': ['labour-and-capital-intensive-production'],
  'BUS-2.3.4-1e': ['short-product-lead-in-times'],
  'BUS-2.3.4-2a': ['measuring-capacity-utilisation'],
  'BUS-2.3.4-2b': ['implications-of-under-utilisation', 'implications-of-over-utilisation'],
  'BUS-2.3.4-2c': ['ways-of-raising-capacity-utilisation', 'ways-of-relieving-over-utilisation'],
  'BUS-2.3.4-3a': ['reading-an-inventory-control-diagram'],
  'BUS-2.3.4-3b': ['buffer-inventory'],
  'BUS-2.3.4-3c': ['implications-of-poor-inventory-control'],
  'BUS-2.3.4-3d': ['just-in-time'],
  'BUS-2.3.4-3e': ['waste-minimisation'],
  'BUS-2.3.4-3f': ['competitive-advantage-from-lean-production'],
  'BUS-2.3.4-4a-1': ['quality-control-and-quality-assurance'],
  'BUS-2.3.4-4a-2': ['quality-control-and-quality-assurance'],
  'BUS-2.3.4-4a-3': ['quality-circles'],
  'BUS-2.3.4-4b': ['total-quality-management'],
  'BUS-2.3.4-4c': ['continuous-improvement'],
  'BUS-2.3.4-4d': ['competitive-advantage-from-quality-management'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE, so the two
 * surfaces cannot diverge. Making the notes titles BE the block titles satisfies
 * `depth.notes-titles` by construction.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these only after publication (DECISIONS, 16 September). Verify them
 * against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2.3.4 · 1a-1e',
    keyIdea: 'Four methods of production, a measure of output per input, a cost test for efficiency, and the volume at which capital beats labour.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Job</strong> — one item at a time to a customer\'s own specification. <strong>Batch</strong> — a group of identical items, then a changeover.'),
        def('<strong>Flow</strong> — continuous movement through the same stages. <strong>Cell</strong> — teams each completing a whole part of the product.'),
        def('<strong>Productivity</strong> — output per unit of input per time period.'),
        def('<strong>Efficiency</strong> — production at minimum average cost.'),
        def('<strong>Product lead-in time</strong> — the gap between a design being signed off and the first unit being sold.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Productivity: ${units(B.output, B.products)} ÷ ${units(B.workers)} workers = ${num(B.outputPerWorker)} a worker a month; training takes it to ${num(B.outputPerWorkerUp)}, which is ${pct(B.productivityRisePct)}.`),
        mech(`Competitiveness: ${usd(B.wagePerWorker)} ÷ ${num(B.outputPerWorker)} = ${usd(B.labourPerUnit)} of labour a ${B.product}, falling to ${usd(B.labourPerUnitUp)}.`),
        mech(`Efficiency: fixed ${usd(B.fixedCosts)} + variable ${usd(B.variableCost)} gives ${usd(B.avgAtOutput)} at ${units(B.output)} and ${usd(B.avgAtCapacity)} at ${units(B.maxOutput)}.`),
        mech(`Labour against capital: ${usd(B.autoExtraFixed)} of extra fixed cost ÷ ${usd(B.variableGap)} of variable saving = ${units(B.crossoverOutput, B.products)}, where both cost ${usd(B.avgLabourAtCrossover)}.`),
        mech(`Lead-in: ${num(B.leadInMonthsBefore)} months to ${num(B.leadInMonthsAfter)} earns ${usd(B.leadInContributionMonthly)} a month for ${num(B.leadInMonthsSaved)} months.`),
        link('Productivity is an output figure and efficiency is a cost figure; a machine can raise one and the other at the same time in opposite directions.'),
      ] },
    ],
    takeaway: [
      'Name four methods, not three: cell is a bullet of 1a.',
      'Output per input per period — all three, or the figure means nothing.',
      'The crossover output can be calculated, so calculate it.',
    ],
  },
  {
    title: B2,
    meta: '2.3.4 · 2a-2c',
    keyIdea: 'One formula, two directions of failure, and two sets of remedies — because it runs under AND over.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Capacity utilisation</strong> — current output ÷ maximum possible output × 100.'),
        def('<strong>Under-utilisation</strong> — producing below the maximum, so fixed costs are spread over fewer units.'),
        def('<strong>Over-utilisation</strong> — producing so close to the maximum that there is no slack for maintenance, error or an extra order.'),
        def('<strong>Rationalisation</strong> — cutting the capacity itself, which raises utilisation by lowering the denominator.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${units(B.output)} ÷ ${units(B.maxOutput)} × 100 = ${pct(B.utilisation)}; fixed cost a ${B.product} ${usd(B.fixedPerUnitAtOutput)} against ${usd(B.fixedPerUnitAtCapacity)} at full output.`),
        mech(`Spare capacity costs ${usd(B.spareCapacityCostPerUnit)} a ${B.product}, ${usd(B.spareCapacityCostMonthly)} a month.`),
        mech(`At ${pct(B.peakUtilisation)} the correction rate rises from ${pct(B.reworkRate)} to ${pct(B.peakReworkRate)}: ${usd(B.peakReworkCost)}, plus ${usd(B.latePenalty)} of penalties.`),
        mech(`Raising it: subcontract work in takes output to ${units(B.outputWithSubcontract)} and utilisation to ${pct(B.utilisationWithSubcontract)}.`),
        mech(`Or closing a line takes the maximum to ${units(B.maxAfterClosure)}, so the same ${units(B.output)} reads ${pct(B.utilisationAfterClosure)}.`),
        link('The figure is a fraction. Before praising a rise, ask which of the two numbers moved.'),
      ] },
    ],
    takeaway: [
      'Show the division and the × 100, and answer in per cent.',
      'A figure above 100% means beyond normal hours, not an error.',
      'Temporary peak: hours and subcontractors. Permanent rise: capacity.',
    ],
  },
  {
    title: B3,
    meta: '2.3.4 · 3a-3f',
    keyIdea: 'A diagram to read, a buffer to size, two ways to get it wrong, and the approach that treats holding anything as a cost.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Inventory control</strong> — managing how much is held so production never waits and nothing is held for longer than it need be.'),
        def('<strong>Buffer inventory</strong> — the amount the business plans never to go below, held against late delivery or unexpected demand.'),
        def('<strong>Just in time</strong> — materials arriving as production needs them rather than being held in advance.'),
        def('<strong>Waste minimisation</strong> — removing anything the customer would not knowingly pay for.'),
        def('<strong>Lean production</strong> — the approach those two belong to: remove everything that does not add value for the customer.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Usage: ${units(B.output)} × ${num(B.tyresPerUnit)} tyres ÷ ${num(B.workingDays)} days = ${units(B.tyresPerDay)} a day, which is the slope of the chart.`),
        mech(`Each delivery is ${units(B.maxInventory)} − ${units(B.bufferInventory)} = ${units(B.orderQuantity)} tyres, lasting ${days(B.cycleDays)}.`),
        mech(`The order goes out at ${units(B.bufferInventory)} + ${num(B.deliveryDelayDays)} × ${units(B.tyresPerDay)} = ${units(B.orderPoint)} tyres.`),
        mech(`JIT: holding ${usd(B.holdingCostMonthly)} a month falls to ${usd(B.jitHoldingCostMonthly)}, a saving of ${usd(B.jitSavingMonthly)}; one stopped day costs ${usd(B.stoppageCost)}.`),
        mech(`Waste: ${usd(B.holdingCostMonthly)} held + ${usd(B.reworkCostMonthly)} corrected + ${usd(B.waitingAndMovingMonthly)} waiting and moving = ${usd(B.wasteMonthly)}, ${usd(B.wastePerUnit)} a ${B.product}.`),
        link(`Lean takes average cost to ${usd(B.avgAfterWasteAndProductivity)} against a competitor's ${usd(B.rivalAverageCost)} — and removes the slack that absorbed shocks.`),
      ] },
    ],
    takeaway: [
      'Work out usage a day first; every other figure follows from it.',
      'A buffer is insurance priced against what a stoppage costs.',
      'JIT trades a small certain saving for a large occasional loss.',
    ],
  },
  {
    title: B4,
    meta: '2.3.4 · 4a-4d',
    keyIdea: 'When the checking happens, who is responsible for it, and whether the market will pay for the difference.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Quality control</strong> — inspecting output after it has been made.'),
        def('<strong>Quality assurance</strong> — building checking into every stage, so the worker is responsible for their own output.'),
        def('<strong>Quality circles</strong> — small voluntary groups of the people who do the work, choosing and investigating their own problems.'),
        def('<strong>Total Quality Management</strong> — quality as the responsibility of the whole business, each department treating the next as its customer.'),
        def('<strong>Kaizen</strong> — continuous improvement in small steps: identify, test, implement, standardise.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Control: ${pct(B.reworkRate)} of ${units(B.output)} = ${units(B.reworkUnits)} at ${usd(B.reworkCostLate)} each = ${usd(B.reworkCostMonthly)} a month.`),
        mech(`Assurance: ${pct(B.assuranceRate)} = ${units(B.assuranceUnits)} at ${usd(B.reworkCostEarly)} each = ${usd(B.assuranceCostMonthly)}, saving ${usd(B.qualitySavingMonthly)}.`),
        mech(`What escapes: ${pct(B.escapeRate)} = ${units(B.escapeUnits)} a month at ${usd(B.warrantyCostPerUnit)} = ${usd(B.warrantyCostMonthly)}, before any lost customer is counted.`),
        mech('Circles: the workers themselves, their own choice of problem, a proposal upward. Not a management meeting.'),
        mech('Kaizen: the fourth stage does the work. An improvement not standardised leaves with the person who made it.'),
        link('Quality is an investment, and it returns only where customers can see it and will switch on it.'),
      ] },
    ],
    takeaway: [
      'Control is after by an inspector; assurance is during by the worker.',
      'Circles is the third bullet of 4a and is nearly always omitted.',
      'TQM is culture, so it is slow, and slowness is why it gets abandoned.',
    ],
  },
];
