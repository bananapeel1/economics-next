/**
 * PACKET 42 — resource-management assessment: the quiz bank, the practice items, the flashcards,
 * the common mistakes and the extras.
 *
 * ── THE BANK IS AUTHORED, NOT EDITED, AND THAT IS THE FOUNDER'S RULING ────
 *
 * `topFix-01` and `quiz-02` report a bank-wide answer-position bias. Counted directly on
 * `correctIndex` across the live 25 items: **23 at index 1, 2 at index 2, none at 0 or 3.** The
 * ledger items and the 22 September `DECISIONS.md` entry all say "22 of 25"; the figure is wrong
 * by one in three places and the substance is unchanged.
 *
 * `DECISIONS.md:57-59` had assigned this to packet 8. The founder ruled on 22 September that
 * packet 42 takes it, on the grounds that packet 8 holds no open ledger items, that the twin
 * (`C-entrepreneurs-leaders-quiz-01`) was closed by packet 35's from-zero rebuild on 18 September,
 * and that the original objection — "not an in-place fix" — does not apply to a bank that is being
 * authored rather than edited. That ruling is what this file implements: the key is written first
 * and DEALT into a position from a hash of the item's own stem, so a hand-picked position is
 * unrepresentable rather than corrected.
 *
 * AND NO EXPLANATION MAY NAME A POSITION OR A LETTER (packet 26, `DECISIONS.md:1653`). The dealing
 * moves the key after the explanation was written, and F074 shuffles the options again at render
 * independently of the authored order, so a positional reference is wrong twice over. Every
 * explanation below names an option by its CONTENT.
 *
 * ── THE PINS ARE DERIVED, WHICH IS `quiz-01`, `structure-01` AND `structure-07` ──
 *
 * `structure-01` and `quiz-01` report that block 0's and block 1's `quizIndices` are swapped: the
 * methods-of-production block serves a capacity-utilisation question and vice versa. Read directly
 * off the live corpus, `content[0].quizIndices` is `[0]` and `quiz[0]` asks "What is its capacity
 * utilisation?", while `content[1].quizIndices` is `[1]` and `quiz[1]` asks which method suits
 * custom wedding cakes — confirmed by the stems, not by the finding text.
 *
 * `structure-07` reports that practice items 2, 3 and 4 are surfaced by no block at all
 * (`practiceIndices` across the four blocks is `[undefined, [0], [1], undefined]` against five
 * items). Both are the same defect: a hand-written pin. Every item below carries the chapter it
 * belongs to and the runner derives the indices from that tag, so a swap and an orphan are both
 * unrepresentable.
 *
 * `topFix-05` also asks for specific placements ("surface Q2/Q3 inline on Block 3 and Q4 on
 * Block 1"). Those are positions in the LIVE four-block structure, which this packet replaces with
 * the specification's own four sub-topics. The placements do not carry over and are not used; the
 * requirement underneath them — every practice item reachable from the chapter it belongs to — is
 * met by the derivation.
 *
 * ── THE TARIFFS ARE THE CENSUS'S, AND TWO CLAUSES OF `topFix-05` ARE REFUSED ──
 *
 * Appendix (`bus_spec.txt:2220-2251`), cross-checked against `audit/raw/tariff-census.json`:
 * Define 2 · Calculate 4 · Construct 4 · Explain 4 · Analyse 6 · Discuss 8 · Assess 10 (Units 1/2)
 * or 12 (Units 3/4) · Evaluate 20. This is Unit 2, so Assess is 10.
 *
 *   - `practice-01` is RIGHT: the live "Define the term 'capacity utilisation'. (4 marks)" is not
 *     an IAL format. Define carries 2.
 *   - `topFix-05`'s tariffs check out on marks: Calculate 4, Analyse 6, Explain 4 all match.
 *   - `topFix-05`'s clause "replace point-scores with Level 1-4 descriptors" is REFUSED for the
 *     low-tariff items. Appendix marking runs on points at 6 marks and below and on levels above,
 *     which is the convention packets 36 and 40 shipped and their verifiers confirmed. A 2-mark
 *     Define with four level descriptors would be a worse mark scheme, not a more authentic one.
 *   - `topFix-05`'s clause "add a short stimulus to Q2/Q3" is built as a SELF-CONTAINED mini-case
 *     inside the stem, with this section's own figures. `DECISIONS.md` (Open) records that
 *     Business extract sourcing is unresolved and blocks work that depends on
 *     `content/data-response/`; `ls content/data-response/` confirms `resource-management` is not
 *     one of the six that exist. A mini-case in the prompt is a different shape from a sourced
 *     extract, and packet 36 built its eleven practice items the same way for the sibling Unit 2
 *     section. Nothing here touches that pipeline or that open decision.
 *   - `Discuss` asks for "a brief assessment", never a "conclusion" — that word belongs to
 *     Evaluate (V036, filed by packet 35 against an inherited guard that enforced the opposite).
 */
import { id, hash8, BIZ, usd, units, pct, pts, num, days } from './_packet42-util.mjs';
import { B1, B2, B3, B4 } from './_packet42-content.mjs';

const B = BIZ;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * THE KEY IS DEALT, NOT PLACED. Items are ranked on a hash of their own stem and the rank modulo
 * four is the slot the key moves into, so the distribution across 0-3 is a property of the bank's
 * construction rather than a thing somebody balanced afterwards. Packet 36's mechanism, used here
 * because the founder's 22 September ruling asks for exactly this.
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
   * ALL THREE ARE ANSWERABLE FROM CHAPTER ONE, which every student reaches before anything else.
   * A pre-test may only ask what the section is about to teach.
   */
  qi(null, 'Productivity is best described as:',
    ['output per unit of input per time period',
      'the total amount a business produces in a year',
      'the proportion of output that passes inspection',
      'the share of capacity a business is currently using'],
    'The specification\'s own wording has all three parts: an output, the input it is divided by, and the period it is measured over. Total output is production rather than productivity, the proportion passing inspection is a quality measure, and the share of capacity in use is capacity utilisation.'),
  qi(null, 'Which of these is a method of production named in the specification?',
    ['Cell', 'Kaizen', 'Assurance', 'Outsourcing'],
    'The four methods are job, batch, flow and cell, and cell is the one most answers omit. Kaizen is continuous improvement, assurance is an approach to quality, and outsourcing is a decision about who does the work rather than how it is organised.'),
  qi(null, 'A business makes 3,000 units a month on equipment that could make 4,000. Its capacity utilisation is:',
    ['75%', '25%', '133%', '1,000 units'],
    'Current output divided by maximum possible output, multiplied by a hundred, gives seventy-five per cent. Twenty-five per cent is the share standing idle, the figure above a hundred inverts the division, and a figure in units has not been converted to a percentage at all.'),

  /* ── Chapter 1 · Production, Productivity and Efficiency ───────────────── */
  qi(B1, 'A workshop builds one wheelchair at a time to each user\'s measurements. This is:',
    ['job production', 'batch production', 'flow production', 'cell production'],
    'Each item is completed to its own specification before the next is started, which is what job production means. Batch would make a group of identical chairs together, flow would move every chair through the same stages continuously, and a cell would be a team completing one whole part of the product.'),
  qi(B1, 'What distinguishes batch production from flow production?',
    ['Production stops for a changeover between groups of identical items',
      'Each item is made to a different customer\'s specification',
      'The work is organised into teams that finish a whole component',
      'Output per worker is always higher'],
    'The changeover between groups is the defining feature, and it is what buys flexibility at the cost of production time. Individual specifications describe job production, teams finishing whole components describe cell, and output per worker depends on the circumstances rather than on the method alone.'),
  qi(B1, 'Cell production differs from a straight assembly line because:',
    ['a team completes a whole part of the product rather than one repeated operation',
      'every item is made to a customer\'s own specification',
      'production runs continuously with no changeover',
      'inspection is carried out only at the end of the line'],
    'Work is grouped by what gets finished rather than by the operation, which is what moves responsibility and judgement onto the team. Individual specifications are job production, continuous running with no changeover is flow, and where inspection happens is a quality decision rather than a method of production.'),
  qi(B1, `A factory makes ${units(7200)} units a year with ${units(24)} workers. Labour productivity is:`,
    ['300 units a worker a year', '7,200 units a year', '24 units a worker', '288 units a worker a year'],
    'Output divided by the input, with the period attached: seven thousand two hundred over twenty-four is three hundred a worker a year. The total output alone is production, the workforce figure alone is an input, and the fourth figure does not come from this division at all.'),
  qi(B1, 'A business hires twenty more workers and total output rises by 5%. Productivity has:',
    ['fallen, because output rose by less than the workforce did',
      'risen, because output is higher than before',
      'stayed the same, because both figures rose',
      'risen, because more workers means more output'],
    'Productivity is output per worker, so a workforce growing faster than output pushes the ratio down. The three alternatives all read a rise in total output as a rise in productivity, which is exactly the confusion between production and productivity.'),
  qi(B1, 'Which of these is a factor influencing productivity?',
    ['The age and quality of the equipment workers use',
      'The price the finished product sells for',
      'The number of competitors in the market',
      'The proportion of sales made on credit'],
    'Equipment is one of the five factors, alongside training, organisation of the work, motivation and the reliability of supply. Selling price, the number of competitors and credit terms all affect profit without changing how much output each worker produces.'),
  qi(B1, 'Efficiency is defined as:',
    ['production at minimum average cost',
      'output per unit of input per time period',
      'producing as much as the equipment allows',
      'the proportion of output free from defects'],
    'Efficiency is a cost test: a business is efficient when its cost per unit is as low as it can be. Output per input is productivity, producing all the equipment allows is full capacity utilisation, and a defect-free proportion is a quality measure.'),
  qi(B1, `A firm has fixed costs of ${usd(B.fixedCosts)} a month and a variable cost of ${usd(B.variableCost)} a unit. Raising output from ${units(B.output)} to ${units(B.maxOutput)} takes average cost from ${usd(B.avgAtOutput)} to:`,
    [usd(B.avgAtCapacity), usd(B.variableCost), usd(B.avgAtOutput), usd(B.fixedPerUnitAtOutput)],
    `Total cost at the higher output is ${usd(B.fixedCosts)} plus ${usd(B.variableCost * B.maxOutput)}, and dividing by ${units(B.maxOutput)} gives the answer. The variable cost alone ignores the fixed costs entirely, the unchanged figure would mean the fixed costs had not been spread any further, and the remaining option is the fixed cost carried by each unit at the lower output.`),
  qi(B1, 'A capital-intensive method has higher fixed costs and a lower variable cost than a labour-intensive one. It is cheaper per unit:',
    ['above the output at which the two methods cost the same',
      'at every level of output, because it is more automated',
      'below the output at which the two methods cost the same',
      'only when wages are rising'],
    'The extra fixed cost has to be spread, so the saving per unit only overtakes it once output is high enough — and that output can be calculated by dividing the fixed gap by the variable gap. Being cheaper at every output would make the choice trivial, being cheaper at low output reverses the arithmetic, and rising wages change where the crossing sits rather than removing it.'),
  qi(B1, 'A short product lead-in time gives a business a competitive advantage because:',
    ['it earns from a new product in the months a rival is still preparing to launch',
      'it reduces the cost of the components bought in',
      'it lowers the amount of inventory held on the shop floor',
      'it removes the need to check quality at each stage'],
    'A shorter lead-in time is time in the market that a slower competitor does not get, so the advantage is sales earned before anyone else can compete for them. Component prices come from purchasing, inventory levels come from inventory control, and quality checking is a separate decision altogether.'),

  /* ── Chapter 2 · Capacity Utilisation ──────────────────────────────────── */
  qi(B2, `A hotel with ${units(250)} rooms let ${units(190)} last night. Capacity utilisation was:`,
    ['76%', '24%', '60 rooms', '132%'],
    'One hundred and ninety divided by two hundred and fifty, times a hundred. The second figure is the share standing empty, the third is the number of empty rooms rather than a percentage, and the last inverts the division.'),
  qi(B2, 'Which is a consequence of persistent under-utilisation of capacity?',
    ['Fixed costs are spread over fewer units, raising average cost',
      'Maintenance has to be postponed to keep the line running',
      'The business has no room to accept an unexpected order',
      'Overtime payments raise the cost of each unit'],
    'Spare capacity means the same fixed costs are divided among less output, which is the defining cost of under-utilisation. Postponed maintenance, refusing extra orders and overtime are all consequences of running too close to the maximum, not too far below it.'),
  qi(B2, 'A firm running at 98% of capacity is most likely to find that:',
    ['a breakdown reaches the customer as a late delivery',
      'its fixed cost per unit rises sharply above the industry average',
      'its equipment stands idle for long periods of every week',
      'it has ample time for planned maintenance between runs'],
    'At that level there is no slack, so anything going wrong passes straight through to the customer. Fixed cost per unit is at its lowest rather than rising, the equipment is working rather than idle, and time for maintenance is precisely what has been used up.'),
  qi(B2, 'A business closes one production line. Output is unchanged, but reported capacity utilisation rises. This is because:',
    ['maximum possible output has fallen',
      'demand for the product has increased sharply',
      'the remaining workers are each producing more',
      'fixed costs carried by each unit have risen'],
    'Utilisation is a fraction and cutting the denominator raises it just as reliably as raising the numerator. Nothing in the question says demand or output per worker changed, and fixed costs per unit fall rather than rise when the closed line\'s charges go with it.'),
  qi(B2, 'Which measure raises capacity utilisation without needing any extra customers of the firm\'s own?',
    ['Taking in subcontract work for another business',
      'Cutting the selling price',
      'Increasing the advertising budget',
      'Extending the warranty offered'],
    'Subcontract work fills the same equipment with somebody else\'s orders, so output rises without the firm having to win demand for its own product. Lower prices, more advertising and a longer warranty are all attempts to win exactly that demand.'),
  qi(B2, 'A business expects a three-month seasonal peak that will take it above its capacity. The best response is usually to:',
    ['subcontract the extra work out for the length of the peak',
      'build an additional production line',
      'raise prices permanently to reduce demand',
      'accept every order and deliver late'],
    'A temporary peak calls for a response that can be switched off at the end of it, and subcontracting commits nothing beyond the three months. Building a line commits capacity that would stand idle for the other nine, a permanent price rise turns away business that was profitable, and late delivery loses customers rather than managing demand.'),
  qi(B2, 'Reporting capacity utilisation above 100% means that:',
    ['output has exceeded what the business planned for under normal conditions',
      'the calculation has been done incorrectly',
      'the business is operating at minimum average cost',
      'the maximum possible output has been recalculated'],
    'The denominator is maximum output under normal hours, so extra shifts or overtime can push the figure past a hundred — and when they do it is a warning about how the business is running, not an arithmetic error. Nothing about it guarantees minimum average cost, and no recalculation is implied.'),

  /* ── Chapter 3 · Inventory Control ─────────────────────────────────────── */
  qi(B3, 'On an inventory control diagram, the slope of each falling line represents:',
    ['the rate at which items are used',
      'the size of each delivery',
      'the time a supplier takes to deliver',
      'the amount the business plans never to go below'],
    'The line falls as items are consumed, so its gradient is the usage rate — and every other figure on the chart depends on it. The size of a delivery is the vertical jump, the supplier\'s delay is a horizontal distance, and the planned floor is a horizontal level.'),
  qi(B3, `A workshop uses ${units(80)} components a day and its supplier takes ${days(5)}. It plans never to hold fewer than ${units(400)}. It should place each order when the level reaches:`,
    ['800 components', '400 components', '480 components', '1,200 components'],
    'Usage over the delivery period is five days at eighty a day, which is four hundred, and that has to be added to the planned floor of four hundred. Ordering at the floor itself leaves nothing for the delay, and the two remaining figures do not come from adding usage to the floor.'),
  qi(B3, 'Buffer inventory is best described as:',
    ['the amount a business plans never to go below',
      'the quantity ordered each time a delivery is placed',
      'the maximum the store can physically hold',
      'the inventory left unsold at the end of a period'],
    'It is a deliberate floor held against a late delivery or unexpected demand, which is why its size follows from supplier reliability and the cost of a stoppage. The quantity per delivery, the physical maximum and the unsold remainder are three different figures.'),
  qi(B3, 'Which is a consequence of holding too much inventory?',
    ['Cash is tied up and storage has to be paid for',
      'Production halts while the line waits for a part',
      'Customers cancel orders after a promised date is missed',
      'The business cannot meet an unexpectedly large order'],
    'Excess is the quiet failure: the money has been spent, the storage is being paid, and items may be superseded before they are used. The other three are all consequences of holding too little, which is the opposite direction of the same defect.'),
  qi(B3, `A firm holding an average of ${units(B.averageInventory)} tyres at ${usd(B.holdingCostPerTyre)} a tyre a month moves to just in time and holds an average of ${units(B.jitAverageInventory)}. The monthly saving on holding costs is:`,
    [usd(B.jitSavingMonthly), usd(B.holdingCostMonthly), usd(B.jitHoldingCostMonthly), usd(B.stoppageCost)],
    `The bill falls from ${usd(B.holdingCostMonthly)} to ${usd(B.jitHoldingCostMonthly)}, and the saving is the difference between them. The first two figures are the before and after bills themselves, and the remaining option is what one stopped day would cost, which is the other side of the trade rather than the saving.`),
  qi(B3, 'The main risk a business takes on when it adopts just in time is that:',
    ['a late delivery stops production almost immediately',
      'holding costs rise as more is kept in store',
      'quality problems become harder to detect',
      'the business must order in larger quantities'],
    'With very little held in reserve there is nothing to absorb a supplier failure, which is the same decision that produced the saving seen from the other side. Holding costs fall rather than rise, quality problems surface sooner rather than later because no reserve hides them, and orders become smaller and more frequent.'),
  qi(B3, 'Under waste minimisation, which of these counts as waste?',
    ['Time spent carrying half-built units between distant benches',
      'Fitting and tensioning the wheels',
      'Designing next season\'s model',
      'Paying the workers who assemble the product'],
    'The test is whether a customer would knowingly pay for it, and carrying something fails it. Fitting the wheels is the product being made, design is what there will be to sell next year, and assembly wages buy the work the customer is paying for.'),
  qi(B3, 'The competitive advantage lean production offers is:',
    ['a lower cost per unit with nothing the customer receives changed',
      'a higher selling price for the same product',
      'a larger buffer against supplier failure',
      'a guarantee that no unit will be defective'],
    'Removing activity the customer would not pay for takes cost out without taking anything out of the product, which is what makes it an advantage rather than a cut. Lean does not raise the price, it reduces the buffer rather than enlarging it, and it guarantees nothing about defects.'),

  /* ── Chapter 4 · Quality Management ────────────────────────────────────── */
  qi(B4, 'Quality control differs from quality assurance because quality control:',
    ['inspects output after it has been produced',
      'makes every worker responsible for their own output',
      'extends responsibility for quality to every department',
      'consists of voluntary groups choosing their own problems'],
    'Control is inspection after the event, usually by someone other than the person who did the work. Making each worker responsible during the work is assurance, extending it to every department is Total Quality Management, and voluntary problem-solving groups are quality circles.'),
  qi(B4, `A firm inspecting at the end finds ${pct(B.reworkRate)} of ${units(B.output)} units faulty at ${usd(B.reworkCostLate)} each. Its monthly correction bill is:`,
    [usd(B.reworkCostMonthly), usd(B.assuranceCostMonthly), usd(B.warrantyCostMonthly), usd(B.reworkCostLate)],
    `Four per cent of ${units(B.output)} is ${units(B.reworkUnits)} units, and each costs ${usd(B.reworkCostLate)} to put right. The remaining figures are the bill under checking at each stage, the cost of the units that still reach customers, and the cost of correcting a single unit.`),
  qi(B4, 'A quality circle is:',
    ['a small voluntary group of workers investigating problems in their own area',
      'a board committee setting targets for defect rates',
      'an external auditor reviewing the production process',
      'the stage of the kaizen cycle in which a change is tested'],
    'The defining features are that the members do the work themselves, they choose the problem, and their output is a proposal. A committee setting targets does not do the work, an external auditor is not from inside the process, and the testing stage belongs to a different idea entirely.'),
  qi(B4, 'The "total" in Total Quality Management refers to:',
    ['quality being the responsibility of every department, not only production',
      'the total number of defects being reduced to zero',
      'inspecting the total output rather than a sample',
      'the total cost of quality being calculated each month'],
    'The word means the whole organisation, with each department treating the next as its customer. It promises no particular defect rate, it is not a statement about sample size, and it is not an accounting exercise.'),
  qi(B4, 'Which stage of the kaizen cycle stops an improvement being lost again?',
    ['Standardising it as the documented way the job is done',
      'Identifying the problem in the current process',
      'Testing the change on one bench or one shift',
      'Implementing it across the whole process'],
    'Writing the change into the standard way of working is what stops the process sliding back and gives the next cycle a higher floor. Identifying, testing and implementing all happen first and all leave with the person who made them if nothing is standardised.'),
  qi(B4, 'A business considering investing in quality management should recognise that:',
    ['the costs arrive before any of the returns do',
      'the returns are immediate wherever it is introduced',
      'it removes the need to inspect anything at any stage',
      'it always lowers total costs within the first month'],
    'Training and time are spent now and the savings and reputation arrive later, which is why programmes are abandoned more often than they are found not to work — and in a market buying purely on price, the spending may never return. The three alternatives each promise something quality management does not.'),
  qi(B4, 'Which figure is most likely to be missing from a factory\'s own production report?',
    ['The cost of units that reached customers faulty',
      'The number of units corrected before despatch',
      'The proportion of output failing final inspection',
      'The cost of reworking a unit at the end of the line'],
    'What happens after the product leaves is recorded somewhere else, if at all, which is why the cost of poor quality is routinely understated. The other three are all measured inside the factory as a matter of course.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */
/*
 * ALL EIGHT BUSINESS COMMAND WORDS AT UNIT 2 CENSUS TARIFFS, with Calculate and Explain used twice
 * so every chapter carries at least one item. Guidance is two paragraphs: the FIRST is the
 * scaffold a student sees above an empty box in guided mode, and carries no figure, no mark
 * allocation and no answer (`practice.opening`, CONTENT-GATE step 6). The mark scheme starts at
 * paragraph two. Points at 6 marks and below; levels above.
 */
const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'productivity'. (2 marks)",
    `Two marks means two separate things to say, and the second must not be a rewording of the first. The specification's own wording has three components in it, so decide which of them is the definition and which is the qualification before you write.\nOne mark for output per unit of input. One mark for per time period, or for naming the input the output is divided by. An answer that says only "how much a business produces" has described production rather than productivity and earns neither mark.`),

  pr(B1, 'Calculate', 4, `${B.firm} employs ${units(B.workers)} production workers and makes ${units(B.output, B.products)} a month. After a training programme the same workforce makes ${units(B.workers * B.outputPerWorkerUp, B.products)} a month. Calculate the percentage change in labour productivity. (4 marks)`,
    `The Appendix asks for a calculation from given data with workings shown, so set each stage out on its own line rather than presenting one number. Work out what the measure is before and after separately, and be careful what the percentage is a percentage OF — the denominator is the original figure, not the new one.\nStage one: productivity before is ${units(B.output)} ÷ ${units(B.workers)} = ${num(B.outputPerWorker)} ${B.products} a worker a month (1 mark). Stage two: productivity after is ${units(B.workers * B.outputPerWorkerUp)} ÷ ${units(B.workers)} = ${num(B.outputPerWorkerUp)} (1 mark). Stage three: the change is ${num(B.outputPerWorkerUp - B.outputPerWorker)} ${B.products} a worker (1 mark). Stage four: as a percentage of the original, ${num(B.outputPerWorkerUp - B.outputPerWorker)} ÷ ${num(B.outputPerWorker)} × 100 = ${pct(B.productivityRisePct)} (1 mark). Dividing by the new figure instead of the original is the standard error and costs the final mark even where every earlier stage is right.`),

  pr(B1, 'Explain', 4, `Explain one way in which a rise in labour productivity can make a business more competitive. (4 marks)`,
    `The Appendix asks an Explain for a brief chain of cause and effect supported by detail or an example, not for a list. The question says ONE way, so choosing a second costs you the space to develop the first. Decide which cost the productivity gain acts on, and follow it as far as the customer.\nKnowledge: productivity is output per worker per period (1 mark). Application: the same wage bill is now spread over more units, so the labour cost carried by each unit falls — ${usd(B.wagePerWorker)} ÷ ${num(B.outputPerWorker)} = ${usd(B.labourPerUnit)} becoming ${usd(B.wagePerWorker)} ÷ ${num(B.outputPerWorkerUp)} = ${usd(B.labourPerUnitUp)} (1 mark). Analysis, first stage: a lower cost per unit means the business can charge less without losing margin (1 mark). Analysis, second stage: a lower price wins orders from rivals whose unit cost has not moved, or the same price earns more on each sale (1 mark). An answer asserting that higher productivity "makes the business more efficient" has restated the question rather than explained it.`),

  pr(B1, 'Analyse', 6, `${B.firm} is considering replacing its labour-intensive assembly line with an automated one. Analyse the factors it should take into account. (6 marks)`,
    `The Appendix wants a brief chain of reasoning with interpretation where data is involved, and explicitly excludes evaluation — so develop the factors rather than reaching a recommendation. Two factors taken properly to their consequences score better here than four named. Look for the factor that can be settled with arithmetic rather than with an opinion.\nLevel of response is not used at this tariff; marks are awarded for developed points. Knowledge: a capital-intensive method carries its cost in fixed charges and a labour-intensive one in wages that vary with output (1 mark). Application: the automated line costs ${usd(B.autoExtraFixed)} more a month in fixed charges and ${usd(B.variableGap)} less on each ${B.product} (1 mark). Analysis, first chain: dividing the fixed difference by the variable difference gives the output at which the two cost the same, ${units(B.crossoverOutput, B.products)} a month, so at the current ${units(B.output)} the existing line is cheaper (2 marks). Analysis, second chain: the decision therefore depends on expected demand rather than on the technology, and on the flexibility lost — an automated line committed to one design is harder to change than a workforce (2 marks). Credit is available for noting that output per worker is higher on the automated line at every output, and that this does not settle the question, which is the distinction between productivity and efficiency.`),

  pr(B2, 'Calculate', 4, `${B.firm} makes ${units(B.output, B.products)} a month on equipment with a maximum possible output of ${units(B.maxOutput)}. It then closes one line, taking maximum possible output to ${units(B.maxAfterClosure)}, and its monthly output is unchanged. Calculate its capacity utilisation before and after the closure. (4 marks)`,
    `The Appendix asks for workings, so show each division and each multiplication rather than two bare percentages. Read the question twice before starting: one of the two figures in the formula changes and the other does not, and identifying which is which is most of the task.\nStage one: before, ${units(B.output)} ÷ ${units(B.maxOutput)} × 100 (1 mark) = ${pct(B.utilisation)} (1 mark). Stage two: after, ${units(B.output)} ÷ ${units(B.maxAfterClosure)} × 100 (1 mark) = ${pct(B.utilisationAfterClosure)} (1 mark). A mark is available in the working for recognising that current output is the same in both calculations. The common error is to assume the rise means more was sold; nothing in the question says output changed, and an answer that says so has misread the data it was given.`),

  pr(B2, 'Explain', 4, `Explain one implication for ${B.firm} of operating at ${pct(B.peakUtilisation)} of capacity. (4 marks)`,
    `The Appendix asks for a brief chain of cause and effect supported by detail. High utilisation sounds like good news, so decide first whether you are going to explain a benefit or a cost, and then stay with it — an answer that starts on one and drifts to the other develops neither.\nKnowledge: capacity utilisation is current output as a percentage of maximum possible output (1 mark). Application: at this level almost the whole of the equipment is in use and there is very little slack (1 mark). Analysis, first stage: choosing the cost route, maintenance is postponed and staff work longer, so the proportion needing correction rises from ${pct(B.reworkRate)} to ${pct(B.peakReworkRate)} (1 mark). Analysis, second stage: that is ${units(B.peakExtraRework)} extra ${B.products} at ${usd(B.reworkCostLate)} each, ${usd(B.peakReworkCost)} in the month, before ${usd(B.latePenalty)} of late-delivery penalties (1 mark). The benefit route earns the same marks: fixed cost a ${B.product} is at its lowest, which is why high utilisation was wanted, developed to the effect on average cost.`),

  pr(B3, 'Construct', 4, `${B.firm} uses ${units(B.tyresPerDay)} tyres a day, holds a maximum of ${units(B.maxInventory)}, plans never to hold fewer than ${units(B.bufferInventory)}, and its supplier takes ${days(B.deliveryDelayDays)}. Construct an inventory control diagram for one full cycle, labelled with these figures. (4 marks)`,
    `The Appendix defines Construct as an accurately labelled diagram, so the labels carry marks in their own right and an unlabelled sketch earns almost nothing. Decide what each axis measures before drawing anything, and work out the daily usage rate first — it is the gradient of every line you are about to draw, and getting it wrong bends the whole chart.\nOne mark for the axes: quantity held on the vertical, time in days on the horizontal, both labelled. One mark for the falling line drawn at the usage rate from ${units(B.maxInventory)}, with the vertical jump where a delivery arrives. One mark for the two horizontal levels drawn and labelled: the planned floor at ${units(B.bufferInventory)} and the level at which an order is placed at ${units(B.orderPoint)}, which is the floor plus ${num(B.deliveryDelayDays)} days of usage. One mark for the supply period marked between the order and the arrival, and for the cycle length of ${days(B.cycleDays)} being consistent with a delivery of ${units(B.orderQuantity)} at ${units(B.tyresPerDay)} a day. A diagram whose order level sits at the floor itself has left nothing for the delivery period and loses two of the four.`),

  pr(B3, 'Discuss', 8, `${B.firm} holds an average of ${units(B.averageInventory)} tyres at ${usd(B.holdingCostPerTyre)} a tyre a month. Moving to just-in-time delivery would take the average held to ${units(B.jitAverageInventory)}, but would leave only ${days(1)} of cover. One stopped day costs ${usd(B.stoppageCost)} in lost contribution. Discuss whether ${B.firm} should adopt just in time. (8 marks)`,
    `The Appendix wants logical chains of reasoning in context showing causes and effects, plus a brief assessment showing awareness of competing arguments. Plan two chains before writing — one for the saving and one for the exposure — and leave the last few lines for the assessment, which is where this tariff is won or lost. The figures in the stem let you compare the two sides directly rather than describing them.\nLevel 1 describes just in time with little reference to the figures. Level 2 works one side properly: the holding bill falls from ${usd(B.holdingCostMonthly)} to ${usd(B.jitHoldingCostMonthly)}, a saving of ${usd(B.jitSavingMonthly)} a month, plus cash released and floor space freed. Level 3 develops both sides and connects them: with ${days(1)} of cover a supplier two days late stops the line, and a single stopped day at ${usd(B.stoppageCost)} costs ${num(B.stoppageMonthsOfSaving)} months of the saving it was bought with. The brief assessment the top of the range needs weighs the two against the probability of a failure — how reliable and how close the suppliers are, whether more than one can supply the same part, and how quickly the line could restart — and says which way the balance falls for this business. An answer that states the saving and stops has given one chain and no assessment.`),

  pr(B4, 'Assess', 10, `${B.firm} currently inspects every ${B.product} at the end of the line, correcting ${units(B.reworkUnits)} a month at ${usd(B.reworkCostLate)} each. It is considering moving to quality assurance, under which the rate would fall to ${pct(B.assuranceRate)} and each correction would cost ${usd(B.reworkCostEarly)}. Assess whether it should do so. (10 marks)`,
    `The Appendix asks at this tariff for a coherent chain of reasoning, well contextualised, with balanced and wide-ranging assessment leading to a supported judgement — so the judgement is required rather than optional, and it has to rest on something in the stem. Decide in advance what your judgement will turn on, because an assessment that lists advantages and disadvantages and then picks one has not supported anything.\nLevel 1 describes the two approaches. Level 2 applies the figures: the correction bill falls from ${usd(B.reworkCostMonthly)} to ${usd(B.assuranceCostMonthly)}, a saving of ${usd(B.qualitySavingMonthly)} a month, and fewer faults escape to customers — currently ${units(B.escapeUnits)} a month at ${usd(B.warrantyCostPerUnit)} each. Level 3 develops both sides in context: against the change, assurance needs training for every worker, time that is not spent producing, and a period during which the rate has not yet fallen; and the responsibility only transfers if workers are genuinely authorised to stop passing a fault on. Level 4 reaches a supported judgement. The strongest available rests on the comparison in the stem — a correction costs ${usd(B.reworkCostLate)} at the end and ${usd(B.reworkCostEarly)} at the stage it happened, so the saving comes from WHEN the fault is found as much as from how many there are — and makes the recommendation conditional on the training being funded properly rather than announced.`),

  pr(B4, 'Evaluate', 20, `Evaluate whether adopting lean production would be the best way for ${B.firm} to gain a competitive advantage over ${B.rival}, whose average cost is ${usd(B.rivalAverageCost)} a ${B.product}. (20 marks)`,
    `The Appendix wants fully developed chains of reasoning, a full awareness of the validity and significance of competing arguments, and a perceptive conclusion proposing a solution or a recommendation. The word worth arguing with is "best", not "lean", so plan an alternative route to the same advantage and decide what your recommendation will turn on before you write a line. A comparison of two routes that reach a similar place is a stronger structure here than a list of benefits.\nLevel 1 asserts that lean production lowers costs, with little support. Level 2 explains the mechanism with the section's figures: removing ${usd(B.wasteMonthly)} a month of holding, correction and waiting takes average cost from ${usd(B.avgAtOutput)} to ${usd(B.avgAfterWaste)}, and the productivity gain takes it to ${usd(B.avgAfterWasteAndProductivity)} — below ${B.rival}'s ${usd(B.rivalAverageCost)}, with nothing the customer receives changed. Level 3 develops the competing arguments. For lean: it is the only route that lowers cost without lowering what is delivered, it releases cash and space, and it makes the business quicker to change what it makes. Against it: it removes the slack that absorbs a supplier failure, one stopped day costs ${usd(B.stoppageCost)} against a monthly holding saving of ${usd(B.jitSavingMonthly)}, and every element of it can be copied by ${B.rival}, which removes the advantage while leaving both firms more fragile. Level 4 sets it against alternatives: filling the ${units(B.maxOutput - B.output)} ${B.products} of idle capacity is free and takes average cost to ${usd(B.avgAtCapacity)} on the existing method; quality management wins orders on reliability rather than on price; and a shorter product lead-in time competes on time instead of cost. The conclusion the top of the range needs proposes a sequence rather than a winner — use the capacity that is already paid for first because it costs nothing, then take out the waste, and treat the buffer reduction as a separate decision to be made only where the supply is reliable enough to survive it.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('Name the four methods of production.', 'Job, batch, flow and cell. Cell is the one most answers omit, and it is a bullet of 1a like the other three.'),
  fc('What is job production?', 'Making one item at a time, finished before the next is started, to a specification the customer set. Highest skill needed, highest cost each.'),
  fc('What defines batch production?', 'Identical items are made as a group and the equipment is then changed over for the next group. The changeover is the defining feature and the cost of the flexibility.'),
  fc('What is flow production?', 'Continuous movement of every item through the same sequence of stages, with no changeover. Lowest cost per unit, heaviest investment, least flexible.'),
  fc('What is cell production?', 'The line is broken into teams, each completing a whole part of the product rather than one repeated operation. It moves judgement and fault-finding onto the team.'),
  fc('Give the specification\'s definition of productivity.', 'Output per unit of input per time period. All three parts matter: without the period the figure means nothing.'),
  fc('How is labour productivity calculated?', 'Output divided by the number of workers, over a stated period. Report it with the unit and the period attached.'),
  fc('Name five factors influencing productivity.', 'Skill and training; the quality and age of equipment; how the work is organised and laid out; motivation and reward; the reliability of what arrives from suppliers.'),
  fc('How does higher productivity make a business more competitive?', 'The same wage bill is spread over more units, so labour cost per unit falls. That allows a lower price, a wider margin, or both.'),
  fc('Give the specification\'s definition of efficiency.', 'Production at minimum average cost. It is a cost-per-unit test, not an output-per-input one.'),
  fc('How do productivity and efficiency differ?', 'Productivity is output per unit of input. Efficiency is cost per unit at its minimum. A business can raise one and worsen the other, which an expensive machine routinely does.'),
  fc('Name three ways to improve efficiency.', 'Raise output towards capacity already paid for; remove waste that adds cost without adding value; raise output per worker. Cutting capacity works too, and is the hardest to reverse.'),
  fc('What is the distinction between labour- and capital-intensive production?', 'Where the cost sits. Labour-intensive carries it in wages that vary with output; capital-intensive carries it in fixed charges that are paid whether the line runs or not.'),
  fc('How do you find the output at which two production methods cost the same?', 'Divide the difference in fixed costs by the difference in variable cost per unit. Below that output the low-fixed-cost method is cheaper; above it the other one is.'),
  fc('What is a product lead-in time?', 'The gap between a design being signed off and the first unit reaching a customer. Shortening it earns from a new product in months a rival is still preparing.'),
  fc('Give the capacity utilisation formula.', 'Current output ÷ maximum possible output × 100. Answer as a percentage, and show the division.'),
  fc('Name three implications of under-utilisation.', 'Fixed costs spread over fewer units, so average cost is higher; staff morale and retention suffer; outsiders read idle capacity as weak demand. It does buy the ability to accept a rush order.'),
  fc('Name three implications of over-utilisation.', 'Maintenance is postponed and quality falls; nothing can absorb a breakdown, so problems reach the customer; staff and equipment are run hard. Fixed cost per unit is at its lowest, which is the gain.'),
  fc('Name three ways of raising capacity utilisation.', 'Sell more; take in subcontract work for another business; cut the capacity itself. The third moves the figure fastest, because it moves the denominator.'),
  fc('Name four ways of relieving over-utilisation.', 'Subcontract work out; add hours through overtime or temporary staff; invest in more capacity; manage the demand by pricing or scheduling.'),
  fc('Can capacity utilisation exceed 100%?', 'Yes. The denominator is maximum output under normal conditions, so extra shifts or overtime can pass it — and when they do the figure is a warning, not an error.'),
  fc('What does the slope of the line on an inventory control diagram show?', 'The rate at which items are used. Work it out first: every other figure on the chart follows from it.'),
  fc('How is the level at which an order is placed worked out?', 'Add the usage over the supplier\'s delivery period to the amount the business plans never to go below.'),
  fc('What is buffer inventory, and what decides its size?', 'The amount planned never to be gone below, held against late delivery or unexpected demand. Its size follows from supplier reliability and from what a stoppage would cost.'),
  fc('Name four implications of poor inventory control.', 'Production stops waiting for one item; cash is tied up; storage and insurance are paid on what is held; items deteriorate or are superseded. Orders are lost to a competitor who could deliver.'),
  fc('What is just in time?', 'Materials arriving as production needs them rather than being held in advance. It minimises what is held; it does not eliminate it.'),
  fc('What does just in time require of a business?', 'Suppliers who are close, frequent and dependable, quick changeovers so small quantities are workable, and an acceptance that a supply failure reaches production immediately.'),
  fc('What is the test for waste?', 'Would the customer knowingly pay for it? Holding, correcting, waiting and moving all fail it; making the product and designing the next one do not.'),
  fc('What is lean production?', 'An approach that treats anything not adding value for the customer as something to remove. Just in time and waste minimisation are instruments inside it, not alternatives to it.'),
  fc('What is the competitive advantage from lean production?', 'A lower cost per unit with nothing the customer receives changed — which can be taken as a lower price or a wider margin — plus cash and space released and faster changes of product.'),
  fc('What is the risk in lean production?', 'It removes the slack that absorbed shocks. A business with no buffer, no spare capacity and no spare time has no way of surviving a supplier failure.'),
  fc('How do quality control and quality assurance differ?', 'Timing and responsibility. Control inspects after production, usually by an inspector. Assurance builds checking into each stage and makes the worker responsible for their own output.'),
  fc('What is a quality circle?', 'A small voluntary group of the people who do the work, meeting regularly to choose a problem in their own area, investigate it, and propose a solution to management.'),
  fc('What is Total Quality Management?', 'Quality as the responsibility of the whole business, with each department treating the next as its customer. It is a change in culture, so it is slow and needs training everywhere.'),
  fc('What are the four stages of kaizen?', 'Identify, test, implement, standardise. The fourth is the one businesses skip and the one that stops the process sliding back.'),
  fc('Where does the competitive advantage from quality management come from?', 'Two routes: lower correction and warranty costs, and a reputation that supports a higher price and repeat business. Both arrive after the costs do.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */
/*
 * `structure-09` NAMES WHICH OF THE LIVE FIVE TO KEEP AND WHICH TO REPLACE, and it is right on
 * both. Kept because students actually write them: productivity confused with production, JIT read
 * as zero inventory, lean used as a synonym for JIT, 100% utilisation treated as the target, and
 * "just cut prices" as an answer to spare capacity. Replaced as filler: "TQM guarantees zero
 * defects", "QC is a bad method businesses should never use" and "kaizen is a one-off project" —
 * the first survives only as the misconception field on the TQM subsection, where it belongs.
 * Added, as the item asks: utilisation above 100%, assurance read as "no inspection at all", and
 * higher productivity read as working harder.
 */
const mk = (title, quote, why, fix) => ({ id: id('mistake', title), title, quote, why, fix });

export const MISTAKES = [
  mk('Using productivity and production as the same word',
    '"Output rose by 5%, so productivity improved."',
    'Production is how much came out. Productivity is how much came out for each unit of input. Hire enough extra people and a business raises the first while lowering the second, which is exactly the case an examiner sets.',
    'Before writing either word, ask whether the figure has been divided by anything. If it has not, it is production.'),

  mk('Reading just in time as holding nothing at all',
    '"Under JIT the business holds no inventory."',
    `It means holding as little as the supply chain can be trusted with, which is almost never zero. ${B.firm}'s own JIT case still keeps ${days(1)} of cover, and the misconception matters because it turns the evaluation into a caricature.`,
    'Write "minimises" rather than "eliminates", and give the amount that is still held. The sentence that scores is about how much, not whether.'),

  mk('Using lean and just in time as the same thing',
    '"The firm adopted lean, meaning it switched to JIT delivery."',
    'JIT is one technique inside lean production, which also covers waste minimisation, working in cells, continuous improvement and quality at the source. A business can run JIT and be nowhere near lean, and it can be lean while deliberately holding a buffer.',
    'Name lean as the approach and JIT as one instrument of it. A sentence that puts the two in a hierarchy shows the examiner you know the difference.'),

  mk('Treating 100% capacity utilisation as the target',
    '"The business should aim for 100% utilisation."',
    `At the maximum there is no time for maintenance, no cover for a breakdown, no room for an unexpected order and no slack for a mistake. ${B.firm} at ${pct(B.peakUtilisation)} pays ${usd(B.peakReworkCost)} in extra corrections and ${usd(B.latePenalty)} in penalties in a single month.`,
    'Say what the slack is for. A business aiming a little below the maximum is buying maintenance, flexibility and the ability to say yes.'),

  mk('Believing capacity utilisation cannot exceed 100%',
    '"The report says 104%, so there must be a mistake in the data."',
    'The denominator is maximum output under NORMAL conditions. Extra shifts, overtime or a temporary line can take actual output past it, and the resulting figure is telling you the business is running beyond what it planned for.',
    'Read a figure above 100% as information rather than as an error: it is the clearest single signal that capacity needs expanding or demand needs managing.'),

  mk('Answering spare capacity with "cut the price"',
    '"Utilisation is low, so the business should reduce its prices."',
    'A price cut is one attempt at one of three routes, and it is the one that costs margin on every unit already being sold. Taking in subcontract work fills the same equipment without touching the price, and cutting capacity raises the figure without selling anything.',
    'Give all three routes — raise demand, take in other work, reduce capacity — and then say which fits the business. A single-route answer cannot reach the higher marks.'),

  mk('Reading quality assurance as "no inspection"',
    '"Under quality assurance nobody checks the product any more."',
    'Checking still happens; it happens at every stage and is done by the person doing the work, rather than at the end by a separate inspector. What assurance removes is the inspection department, not the inspection.',
    'Contrast WHEN and WHO rather than whether: control is after the event by an inspector, assurance is during the work by the worker.'),

  mk('Explaining higher productivity as workers working harder',
    '"Productivity rose because the workforce put in more effort."',
    'Four of the five factors influencing productivity are things the business controls and the worker does not: training, equipment, the layout of the work, and the reliability of what arrives. Effort is rarely the variable that moved.',
    'Name the factor the business changed. An answer that credits effort has skipped the analysis the question was asking for.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The chains are the same material as the teaching, in causal form, so a student meeting them on
 * the Notes tab meets nothing `content[]` did not teach. `specGap-07` reports the opposite
 * condition on the live section — the competitive advantage from lean production living in the
 * extras chains and never reaching Learn Mode content — so this packet builds the chapter 3
 * subsection for it AND keeps the chain, and the runner asserts that every teaching term used
 * here appears in some subsection's body.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a training programme to a won order',
      steps: [
        `${B.firm} trains its assembly staff and replaces the frame jigs.`,
        `Output a worker rises from ${num(B.outputPerWorker)} to ${num(B.outputPerWorkerUp)} ${B.products} a month — ${pct(B.productivityRisePct)} — with the same ${units(B.workers)} people.`,
        `The wage bill has not changed, so ${usd(B.wagePerWorker)} spread over ${num(B.outputPerWorkerUp)} instead of ${num(B.outputPerWorker)} takes labour cost from ${usd(B.labourPerUnit)} to ${usd(B.labourPerUnitUp)} a ${B.product}.`,
        `${B.firm} can now price ${usd(B.labourSavingPerUnit)} lower and earn what it earned before.`,
      ],
      result: `The chain runs through cost per unit, not through output. That is why a productivity gain the business cannot sell is not a competitiveness gain: the extra ${B.products} become inventory, and the cost per unit only falls if they are made and sold.`,
    },
    {
      title: 'How closing a line raises capacity utilisation',
      steps: [
        `${B.firm} makes ${units(B.output, B.products)} a month against a maximum of ${units(B.maxOutput)}: ${pct(B.utilisation)}.`,
        `It closes one of four lines. Maximum possible output falls to ${units(B.maxAfterClosure)}.`,
        `Output is unchanged at ${units(B.output)}, so utilisation is now ${pct(B.utilisationAfterClosure)} — up ${pts(B.utilisationRisePts)}.`,
        `The closed line's fixed charges go with it, so average cost falls from ${usd(B.avgAtOutput)} to ${usd(B.avgAfterClosure)}.`,
      ],
      result: `Both figures improved and nothing was sold to anybody. It is a real gain — the fixed costs are genuinely lower — and it is bought by giving up the ability to make more than ${units(B.maxAfterClosure)}, which is expensive to reverse. Before praising a rise in utilisation, ask which of the two numbers in the fraction moved.`,
    },
    {
      title: 'Reading one cycle off the inventory control diagram',
      steps: [
        `${B.firm} fits ${num(B.tyresPerUnit)} tyres to each ${B.product} and makes ${units(B.output)} over ${num(B.workingDays)} working days: ${units(B.tyresPerDay)} tyres a day.`,
        `The store starts full at ${units(B.maxInventory)} and the line falls at that daily rate.`,
        `At ${units(B.orderPoint)} an order goes out, because the supplier takes ${days(B.deliveryDelayDays)} and ${num(B.deliveryDelayDays)} × ${units(B.tyresPerDay)} of usage has to be covered above the ${units(B.bufferInventory)} floor.`,
        `The delivery of ${units(B.orderQuantity)} lands as the level reaches ${units(B.bufferInventory)}, and the pattern repeats every ${days(B.cycleDays)}.`,
      ],
      result: `Every figure on the chart comes from the usage rate. Double the output and the slope steepens, the order goes out higher up, and the cycle shortens — which is why a question that changes production volume changes every label on the diagram at once.`,
    },
    {
      title: 'The just-in-time trade, priced both ways',
      steps: [
        `Today ${B.firm} holds an average of ${units(B.averageInventory)} tyres at ${usd(B.holdingCostPerTyre)} each a month: ${usd(B.holdingCostMonthly)}.`,
        `Daily delivery with ${days(1)} of cover takes the average to ${units(B.jitAverageInventory)} and the bill to ${usd(B.jitHoldingCostMonthly)} — a saving of ${usd(B.jitSavingMonthly)} a month.`,
        `A supplier two days late now stops the line for a day: ${units(B.outputPerDay, B.products)} not made.`,
        `At ${usd(B.contribution)} of contribution each, that day costs ${usd(B.stoppageCost)}.`,
      ],
      result: `One stopped day costs ${num(B.stoppageMonthsOfSaving)} months of the saving. That is the whole evaluation of just in time in one ratio, and it is why the answer depends on how reliable the suppliers are rather than on how attractive the saving looks. A business with two nearby suppliers and a four-hour restart should take the trade; one with a single distant supplier should not.`,
    },
    {
      title: 'Where the waste was, and what removing it was worth',
      steps: [
        `${B.firm} costs three kinds in one month: ${usd(B.holdingCostMonthly)} held, ${usd(B.reworkCostMonthly)} corrected, ${usd(B.waitingAndMovingMonthly)} waiting and moving.`,
        `That is ${usd(B.wasteMonthly)} a month, or ${usd(B.wastePerUnit)} on every ${B.product} made.`,
        `Removing it takes average cost from ${usd(B.avgAtOutput)} to ${usd(B.avgAfterWaste)} with nothing the customer receives changed.`,
        `Adding the productivity gain takes it to ${usd(B.avgAfterWasteAndProductivity)}, against ${B.rival}'s ${usd(B.rivalAverageCost)}.`,
      ],
      result: `Scrapped material is not even the largest of the three lines. Most of the money is in things nobody throws away — items held that did not need holding, and paid time in which nothing was produced — which is why waste minimisation is a measurement exercise before it is a cost-cutting one.`,
    },
    {
      title: 'What quality costs by the route chosen',
      steps: [
        `Inspecting at the end: ${pct(B.reworkRate)} of ${units(B.output)} is ${units(B.reworkUnits)} ${B.products} at ${usd(B.reworkCostLate)} each — ${usd(B.reworkCostMonthly)} a month.`,
        `Checking at each stage: the rate falls to ${pct(B.assuranceRate)} and a correction costs ${usd(B.reworkCostEarly)} rather than ${usd(B.reworkCostLate)} — ${usd(B.assuranceCostMonthly)}.`,
        `The saving is ${usd(B.qualitySavingMonthly)} a month, and it comes from WHEN the fault is found as much as from how many there are.`,
        `${pct(B.escapeRate)} still reach a customer: ${units(B.escapeUnits)} a month at ${usd(B.warrantyCostPerUnit)}, ${usd(B.warrantyCostMonthly)}.`,
      ],
      result: `The third figure is the one no production report contains, and at ${usd(B.warrantyCostMonthly)} it is six times the correction bill the factory can see. A business judging its quality system on its own production numbers is judging it on the smaller half of the problem.`,
    },
    {
      title: 'One turn of the kaizen cycle',
      steps: [
        'A packer identifies that the tape dispenser sits out of reach at every station.',
        'The new position is tried at one bench for a week, where it is cheap to reverse.',
        'All six packing stations are changed once the trial has shown that it works.',
        'The written work instruction is updated, so the new position is the standard the next cycle starts from.',
      ],
      result: `Four stages, and the fourth is the one businesses skip. An improvement that is not written into the standard leaves with the person who made it, and the process slides back to where it was. ${B.firm}'s ${usd(B.waitingAndMovingMonthly)} of waiting and moving left in a sequence of turns like this one, not in a single decision.`,
    },
  ],
  evaluation: [
    {
      title: 'Is higher capacity utilisation always good news?',
      content: `Almost every data-response question on capacity utilisation turns on this, and the answer is that it depends on three things an answer can actually name. **Which number moved.** Utilisation is a fraction: ${B.firm} took it from ${pct(B.utilisation)} to ${pct(B.utilisationAfterClosure)} by closing a line, with output unchanged, so a rise is not evidence of demand. **How close to the maximum it now is.** Fixed cost a ${B.product} is lowest at capacity, which is the gain, and at ${pct(B.peakUtilisation)} there is no room for maintenance, a breakdown or an extra order — ${usd(B.peakReworkCost)} of extra corrections and ${usd(B.latePenalty)} of penalties in one month. **Whether the demand behind it lasts.** A permanent rise justifies capacity; a three-month peak justifies overtime and subcontractors, and a business that builds for a peak spends the rest of the year explaining a figure that has fallen. The strongest single sentence available is that the useful target is a band below the maximum rather than the maximum itself, because the last few points of utilisation are bought with the slack that absorbs everything going wrong.`,
    },
    {
      title: 'Should a business adopt lean production?',
      content: `The case for it is a number and the case against it is a probability, which is what makes the question hard. **For.** Removing ${usd(B.wasteMonthly)} a month of holding, correction and waiting takes ${B.firm}'s average cost from ${usd(B.avgAtOutput)} to ${usd(B.avgAfterWaste)} with the ${B.product} unchanged; cash and floor space are released; and working in small quantities makes the business quicker to change what it makes, which is the same capability that shortens a product lead-in time. **Against.** Lean removes the slack that absorbed shocks: one stopped day costs ${usd(B.stoppageCost)} against a monthly holding saving of ${usd(B.jitSavingMonthly)}. It needs suppliers a small business may not be able to demand reliability from. And every element of it can be copied, which removes the advantage while leaving both firms more fragile than they were. **Against the alternatives.** Filling the ${units(B.maxOutput - B.output)} ${B.products} of idle capacity costs nothing and reaches ${usd(B.avgAtCapacity)} on the existing method. Quality management wins orders on reliability rather than price. **The judgement.** Separate the two halves of lean: removing waste that adds no value is close to free and should be done whatever the supply chain looks like, while reducing the buffer is a bet on supplier reliability and should be made only where that reliability can be demonstrated. An answer that treats lean as one decision has missed the distinction the figures are pointing at.`,
    },
  ],
};
