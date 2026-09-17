/**
 * PACKET 28 — revenue-costs-profits: quiz, practice, flashcards, common mistakes and chains.
 *
 * WHAT THE MARCH BANK GOT WRONG, and which findings about it were right.
 *
 * THE QUIZ TESTED THREE THINGS THE SECTION NEVER TAUGHT. `quiz-01` (q4, types of internal economies
 * of scale), `quiz-02` (q5, internal against external) and `quiz-03` (q7, the shutdown rule) all name
 * the same defect from the other side: the bank was written against the specification and the Learn
 * Mode content was not, so a student who used Learn Mode met those items for the first time in the
 * pre-test. The fix is to TEACH them — 3d is six leaves, 3e is three and 4b is one — not to delete
 * the questions. `quiz-03` also notes that q7's distractor D, "MC > MR at all output levels", is
 * nonsensical rather than plausibly wrong; every distractor in this bank is a mistake a student
 * actually makes.
 *
 * PRACTICE IS TEN ITEMS AND ALL EIGHT IAL ECONOMICS COMMAND WORDS. The March five carried:
 *   - "Define the term 'marginal revenue'. (4 marks)". Define is a 2-mark command word in Economics
 *     (`topFix-05` is right about this).
 *   - "Outline the conditions under which a firm will shut down in the short run. (4 marks)". Outline
 *     is not an IAL command word in either subject.
 *   - "Assess the relevance of the law of diminishing returns … (10 marks)". `topFix-05` asks for its
 *     guidance to be re-presented as levels-based KAA and Evaluation. It is not re-presented: ASSESS
 *     IS A BUSINESS COMMAND WORD AND ECONOMICS HAS NO 10-MARK TARIFF. The Economics ladder is Define 2,
 *     Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20, and the runner
 *     checks every item against `audit/raw/tariff-census.json` for this subject. The item is replaced.
 *   - nothing at all on revenue measures beyond a definition, on elasticity, on the cost formulae or
 *     on minimum efficient scale.
 *
 * EVERY GUIDANCE IS AT LEAST TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx`
 * prints `guidance.split('\n')[0]` above the answer box in guided mode, which `getPracticeMode` gives
 * to every item except the first and last of a section — so a one-paragraph guidance is the whole mark
 * scheme printed over the empty box asking the student to write it. That is `practice.opening`, and it
 * fires on 160 items across the repository; none of them is here. In a topic this numerical the rule
 * bites harder than usual: an opening paragraph may not contain a worked calculation either, which is
 * why the Calculate items' openings say which stages to work in and never what they come to.
 */
import { id, hash8, money, qty, elasticity, round2, NADIRA, BAHRI, LONGRUN, INTERNAL_SOURCES, EXTERNAL_SOURCES, DISECONOMY_SOURCES } from './_packet28-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet28-content.mjs';

const N = NADIRA, B = BAHRI, L = LONGRUN;
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
  /* ── the pre-test pool: three items, unpinned, FIRST in the array ── */
  qi(null, 'Average revenue is always equal to:',
    ['the price', 'marginal revenue, at every level of output', 'total revenue, at the quantity where it is greatest', 'total cost divided by quantity'],
    'AR = TR ÷ Q and TR = P × Q, so the quantity cancels and average revenue is the price at every output. It equals marginal revenue only where the price does not change with output, and it has nothing to do with cost.'),
  qi(null, 'The law of diminishing returns applies:',
    ['in the short run, because at least one factor is fixed', 'in the long run, because the firm has grown too large to manage', 'in both periods, whenever output rises', 'only when the wage a firm pays is rising'],
    'Diminishing returns need a fixed factor for the variable factor to be spread over, and a fixed factor is what defines the short run. In the long run every factor can be varied, so rising cost per unit there is diseconomies of scale instead.'),
  qi(null, 'A firm earns normal profit when:',
    ['total revenue is exactly equal to total cost', 'it makes no money at all from its activity', 'its total revenue is greater than its total variable cost', 'it earns the same profit as other firms in its industry'],
    'Normal profit is TR = TC, and the cost figure already includes what the owners could have earned elsewhere. It shows as zero profit and is not zero reward, which is why a firm earning it has no reason to leave.'),

  /* ── Block 1 · Total, average and marginal revenue ── */
  qi(B1, `A firm faces the demand curve AR = ${N.a} ${'−'} ${N.b}Q. Its marginal revenue curve is:`,
    [`MR = ${N.a} ${'−'} ${N.b * 2}Q`, `MR = ${N.a} ${'−'} ${N.b}Q`, `MR = ${N.a / 2} ${'−'} ${N.b}Q`, `MR = ${N.a} ${'−'} ${N.b / 2}Q`],
    `If AR = a ${'−'} bQ then MR = a ${'−'} 2bQ. Same starting point, twice the gradient — because selling one more unit requires a lower price on every unit already being sold.`),
  qi(B1, 'Total revenue is at its greatest at the output where:',
    ['marginal revenue is zero', 'average revenue is zero', 'marginal revenue is at its greatest', 'average revenue equals marginal revenue'],
    `While marginal revenue is positive, one more unit adds to total revenue; once it is negative, one more unit subtracts. The turning point is where it is exactly ${money(0)}, which for this firm is ${qty(N.trMaxQ)} ${N.units} and ${money(N.trMax)}.`),
  qi(B1, 'A firm that can sell any quantity it likes at the same price has revenue curves such that:',
    ['AR = MR = P at every output', 'MR lies below AR at every output above zero', 'AR slopes downward and MR slopes upward', 'MR is zero at every output'],
    'With the price unchanged by output, each extra unit brings in exactly the price and takes nothing away from the units already sold, so the average and the marginal are both the price and all three are one horizontal line.'),
  qi(B1, `${N.name} sells ${qty(6)} ${N.units} ${N.per} at ${money(N.ar(6))} each. Its total revenue is:`,
    [money(N.tr(6)), money(N.ar(6)), money(N.tr(6) / 2), money(N.trMax)],
    `TR = P × Q = ${money(N.ar(6))} × ${qty(6)} = ${money(N.tr(6))}. Notice that this is not the firm's greatest revenue: at ${qty(N.trMaxQ)} ${N.units} it takes ${money(N.trMax)}, despite the lower price.`),

  /* ── Block 2 · Revenue and price elasticity of demand ── */
  qi(B2, `A firm cuts its price and total revenue rises. Price elasticity of demand at that point must be:`,
    [`below ${elasticity(-1)}`, `between ${elasticity(-1)} and zero`, `exactly ${elasticity(-1)}`, 'positive'],
    `Revenue rising after a price cut means quantity responded more than price did, which is elastic demand: below ${elasticity(-1)}, meaning further from zero. Closer to zero than that a cut lowers revenue, and at ${elasticity(-1)} exactly it leaves revenue unchanged.`),
  qi(B2, `Price falls from ${money(N.elastic.p0)} to ${money(N.elastic.p1)} and quantity demanded rises from ${qty(N.elastic.q0)} to ${qty(N.elastic.q1)} ${N.units}. Price elasticity of demand is:`,
    [elasticity(N.elastic.ped), elasticity(-0.33), elasticity(-1), elasticity(-20)],
    `%ΔQ = +${round2((N.elastic.q1 - N.elastic.q0) / N.elastic.q0 * 100)}% and %ΔP = ${elasticity(round2((N.elastic.p1 - N.elastic.p0) / N.elastic.p0 * 100))}%, so PED = ${elasticity(N.elastic.ped)}. Each percentage is measured against the value it started from; total revenue rises from ${money(N.elastic.tr0)} to ${money(N.elastic.tr1)}, as elastic demand requires.`),
  qi(B2, 'Price elasticity of demand along a straight-line demand curve:',
    ['changes at every point, from elastic at the top to inelastic at the bottom', 'is the same everywhere, because the gradient is constant', 'is elastic at the bottom and inelastic at the top', 'is undefined except where the curve crosses an axis'],
    `Elasticity is the gradient combined with the ratio of price to quantity, and that ratio falls all the way down the line. On ${N.name}'s line the same ${money(2)} cut raises revenue at one end and lowers it at the other.`),

  /* ── Block 3 · Diminishing returns and the product curves ── */
  qi(B3, 'Marginal product crosses average product at:',
    ['the highest point of average product', 'the lowest point of average product', 'the highest point of marginal product', 'the output where total product stops rising'],
    'A value above an average pulls it up and a value below pulls it down, so the average can only stop rising at the moment the two are equal. Average product turns downward there, so the crossing is at its highest point.'),
  qi(B3, `At ${B.name} the wage is ${money(B.wage)} a worker ${B.per}. When a worker's marginal product is ${qty(B.at(10).mp)} ${B.units}, marginal cost is:`,
    [money(B.at(10).mc), money(B.wage), money(B.at(15).mc), money(B.at(4).mc)],
    `MC = wage ÷ MP = ${money(B.wage)} ÷ ${qty(B.at(10).mp)} = ${money(B.at(10).mc)}. This is the firm's lowest marginal cost, because ${qty(B.at(10).mp)} is its highest marginal product — the two move in opposite directions through the wage.`),
  qi(B3, 'Under diminishing returns, as more workers are added to a fixed plant:',
    ['total output keeps rising while the extra output from each worker falls', 'total output falls with every additional worker', 'both total output and output per worker rise throughout', 'the wage the firm has to pay each worker rises'],
    'It is the marginal product that falls, not total product. Total output usually keeps rising for some way after diminishing returns have set in, which is why "output falls" is the commonest wrong answer here.'),

  /* ── Block 4 · The seven cost measures ── */
  qi(B4, 'Marginal cost passes through average cost at:',
    ['the lowest point of average cost', 'the lowest point of average fixed cost', 'the output where average variable cost starts to rise', 'the output where marginal cost is at its own lowest'],
    `While the next unit costs less than the average it pulls the average down, and once it costs more it pulls the average up, so they can only be equal where the average turns. For ${B.name} both are ${money(B.minAc)}.`),
  qi(B4, 'Average fixed cost:',
    ['falls as output rises and never reaches zero', 'is constant at every level of output', 'falls at first and then rises', 'is zero once fixed costs have been paid'],
    `AFC = TFC ÷ Q, so a constant is divided by a growing number: it falls forever and approaches zero without arriving. At ${B.name} it runs from ${money(B.at(4).afc)} at ${qty(4)} ${B.units} to ${money(B.at(20).afc)} at ${qty(20)}.`),
  qi(B4, `${B.name} makes ${qty(B.ref.q)} ${B.units} ${B.per}. Its average fixed cost is ${money(B.ref.afc)} and its average variable cost is ${money(B.ref.avc)}. Its average cost is:`,
    [money(B.ref.ac), money(B.ref.avc), money(B.ref.tc), money(B.ref.afc)],
    `AC = AFC + AVC at every level of output, because TC = TFC + TVC and all three are divided by the same quantity. ${money(B.ref.afc)} + ${money(B.ref.avc)} = ${money(B.ref.ac)}, which is also ${money(B.ref.tc)} ÷ ${qty(B.ref.q)}.`),
  qi(B4, 'Which of these is a fixed cost for a bottling firm?',
    ['the annual insurance on the plant', 'the bottles and caps used on the line', 'the wage of a worker hired for one day', 'the electricity used running the line'],
    'The test is whether the cost changes when output changes, not whether it is large or unavoidable. Insurance arrives whether the line runs or not; the other three arrive only because crates were made.'),

  /* ── Block 5 · The long run, LRAC and minimum efficient scale ── */
  qi(B5, 'Minimum efficient scale is:',
    ['the lowest output at which long-run average cost is at its minimum', 'the output at which a firm makes the most profit', 'the smallest output at which a firm can cover its variable costs', 'the output at which short-run and long-run average cost are equal'],
    `It is a cost concept and not a profit one. For ${B.name} long-run average cost reaches ${money(L.floor)} at ${qty(L.mes)} ${B.units} ${B.per} and stays there to ${qty(L.flatTo)}; minimum efficient scale is the FIRST of those outputs.`),
  qi(B5, 'In the long run:',
    ['every factor of production can be varied, so there are no fixed costs', 'the plant is fixed and only labour can be varied', 'at least five years have passed since the firm was founded', 'a firm can no longer change the scale at which it produces'],
    'The two periods are defined by what can change, not by a length of time. How long the long run takes differs completely between an industry renting small units and one that has to build a refinery.'),
  qi(B5, 'The long-run average cost curve can never lie above a short-run average cost curve because:',
    ['in the long run keeping the existing plant is always one of the options', 'long-run costs are always lower than short-run costs at every output', 'fixed costs are excluded from the long-run calculation', 'the long run assumes the firm has reached minimum efficient scale'],
    'The long run contains the short run as a special case: a firm that can change everything can also choose to change nothing. So it can never be forced into a higher cost than a short run would have given it.'),

  /* ── Block 6 · Economies and diseconomies of scale ── */
  qi(B6, 'Which of these is an example of a TECHNICAL economy of scale?',
    ['a machine that only pays for itself at high output spreads its cost over more units', 'a larger firm borrows at a lower rate of interest than a small one', 'a supplier quotes a lower price a unit for a larger order', 'a full-time specialist manager becomes worth employing'],
    'The six internal sources are financial, technical, managerial, marketing, purchasing and risk bearing. The other three options here are the financial, purchasing and managerial economies, each with its own mechanism.'),
  qi(B6, 'External economies of scale differ from internal ones because they:',
    ['arise from the growth of the industry rather than of the firm itself', 'are always larger than internal economies of scale', 'only ever affect firms that are already very large', 'arise from a firm buying its inputs from outside suppliers'],
    'The test is whose growth caused the saving. A firm that has not grown at all can gain an external economy when the industry around it grows, and it loses one by moving away however large it is — which is what makes them less reliable than internal economies.'),
  qi(B6, 'Which of these is one of the three sources of diseconomies of scale the specification names?',
    ['X-inefficiency', 'a rise in the wage the firm has to pay', 'the law of diminishing returns', 'a fall in demand for the product'],
    'The three are communication problems, coordination problems and X-inefficiency, and all three are about the firm becoming harder to run. Diminishing returns are a short-run effect from a fixed factor and are not a diseconomy of scale.'),
  qi(B6, 'A firm in the long run finds its average cost per unit rising as it grows. This is:',
    ['diseconomies of scale', 'the law of diminishing returns', 'an external economy of scale', 'average fixed cost rising'],
    'In the long run nothing is fixed, so diminishing returns cannot be the cause — they need a fixed factor for the variable factor to be spread over. And average fixed cost cannot rise, because in the long run there is none.'),

  /* ── Block 7 · Profits, losses and the shutdown points ── */
  qi(B7, 'In the short run a firm should shut down if:',
    ['price is below average variable cost', 'price is below average cost', 'it is making a loss of any size', 'price is below average fixed cost'],
    `The fixed cost is owed whether the firm produces or not, so the comparison is between two losses. While price covers average variable cost, each unit leaves something towards the fixed cost; below it, each unit adds to the loss.`),
  qi(B7, `A firm's average cost is ${money(B.ref.ac)} and its average variable cost is ${money(B.ref.avc)}, on fixed costs of ${money(B.tfc)} ${B.per}. Facing a price of ${money(B.shortRunLoss.price)}, in the short run it should:`,
    [`keep producing, losing ${money(Math.abs(B.shortRunLoss.profit))} rather than ${money(B.tfc)}`, `shut down, because it is making a loss of ${money(Math.abs(B.shortRunLoss.profit))}`, `keep producing, because it is making a profit of ${money(Math.abs(B.shortRunLoss.profit))}`, `shut down, because price is below average cost of ${money(B.ref.ac)}`],
    `Revenue is ${money(B.shortRunLoss.revenue)} against a cost of ${money(B.ref.tc)}, so the loss is ${money(Math.abs(B.shortRunLoss.profit))} — smaller than the ${money(B.tfc)} it would lose by stopping. Price ${money(B.shortRunLoss.price)} is above average variable cost ${money(B.ref.avc)}, so each ${B.unit} contributes towards the fixed cost.`),
  qi(B7, 'In the long run a firm leaves the industry if price is below:',
    ['average cost', 'average variable cost', 'average fixed cost', 'marginal cost'],
    'In the long run every factor can be varied, so there are no fixed costs and nothing to contribute towards. The comparison becomes revenue against total cost, which is the average cost test.'),
  qi(B7, 'A firm is earning supernormal profit. This means:',
    ['average revenue is above average cost', 'average revenue is above average variable cost', 'it is earning more than it did last year', 'total revenue is above total fixed cost'],
    'Supernormal profit is a return over and above normal profit, which is where AR = AC. Covering average variable cost only keeps the firm producing in the short run; it is a long way below supernormal profit.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'marginal revenue'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Before you write, settle what KIND of quantity this term names, because the two marks hang off that choice and an answer that gets it wrong cannot pick either of them up on the way.\n'
    + 'Marginal revenue is the change in total revenue (1 mark) resulting from the sale of one additional unit of output (1 mark). An answer that says "the revenue from the last unit sold" gives the first half and not the second, because it does not make clear that the figure is a change in the TOTAL and not the price the last unit fetched — which are different numbers whenever the price has to fall to sell more.'),

  pr(B1, 'Calculate', 4, `${N.name} faces the demand curve P = ${N.a} ${'−'} ${N.b}Q, where Q is ${N.units} ${N.per}. Calculate its total revenue at ${qty(6)} ${N.units}, its marginal revenue at that output, and the output at which total revenue is greatest. (4 marks)`,
    'Three figures are wanted and the third depends on knowing a relationship rather than on substituting into a formula, so do the first two first and let them show you what the third needs. Appendix 6 advises showing workings for a Calculate, and here the workings are what let a marker follow you to the third figure even if the arithmetic slips on the way. Write the demand equation down before you start substituting into it.\n'
    + `Price at ${qty(6)} ${N.units} is ${N.a} ${'−'} ${N.b} × ${qty(6)} = ${money(N.ar(6))} (1 mark), so total revenue is ${money(N.ar(6))} × ${qty(6)} = ${money(N.tr(6))} (1 mark). Marginal revenue on a straight-line demand curve is MR = ${N.a} ${'−'} ${N.b * 2}Q, so at ${qty(6)} ${N.units} it is ${money(N.mr(6))} (1 mark). Total revenue is greatest where marginal revenue is ${money(0)}: ${N.a} ${'−'} ${N.b * 2}Q = 0 gives Q = ${qty(N.trMaxQ)} ${N.units} (1 mark), where total revenue is ${money(N.trMax)}. Setting AR rather than MR to zero is the commonest error and gives ${qty(N.qAtPrice(0))} ${N.units}, the output at which the firm takes nothing at all.`),

  pr(B2, 'Calculate', 2, `${N.name} cuts its price from ${money(N.inelastic.p0)} to ${money(N.inelastic.p1)} a ${N.unit} and the quantity it sells rises from ${qty(N.inelastic.q0)} to ${qty(N.inelastic.q1)} ${N.units} ${N.per}. Calculate the price elasticity of demand. (2 marks)`,
    'Two marks, and the second is for the number rather than the method, so the method has to be visible for the first one to be safe. Be careful which value each percentage change is measured against: taking either of them against the new figure instead of the starting one gives an answer close enough to look right and far enough to be wrong. Quantitative skill QS8 asks for the calculation and the interpretation, so decide before you finish what the number tells you.\n'
    + `%ΔQ = (${qty(N.inelastic.q1)} ${'−'} ${qty(N.inelastic.q0)}) ÷ ${qty(N.inelastic.q0)} = +${round2((N.inelastic.q1 - N.inelastic.q0) / N.inelastic.q0 * 100)}% and %ΔP = (${money(N.inelastic.p1)} ${'−'} ${money(N.inelastic.p0)}) ÷ ${money(N.inelastic.p0)} = ${elasticity(round2((N.inelastic.p1 - N.inelastic.p0) / N.inelastic.p0 * 100))}% (1 mark). PED = ${elasticity(N.inelastic.ped)} (1 mark). Demand is inelastic here, so the price cut lowers total revenue, from ${money(N.inelastic.tr0)} to ${money(N.inelastic.tr1)}. Dropping the minus sign loses nothing on its own but makes the interpretation impossible to state.`),

  pr(B2, 'Explain', 4, 'Explain why a firm facing inelastic demand for its product would not raise its total revenue by cutting its price. (4 marks)',
    'An Explain of a reason needs a two-stage chain, so plan both links before writing. The first link is about what inelastic demand means for the size of the quantity response; the second is about what that does to the two numbers total revenue is made of. Keep the percentage changes as percentages throughout — this answer collapses the moment it starts comparing a number of units with a number of dollars.\n'
    + 'Inelastic demand means price elasticity of demand lies between zero and minus one, so the percentage rise in quantity demanded is smaller than the percentage fall in price (1 mark). Total revenue is price multiplied by quantity, so a cut changes both (1 mark). The gain from selling more units is smaller than the loss from charging less on every unit (1 mark), so total revenue falls rather than rises (1 mark). An answer that says "demand is inelastic so revenue falls" has asserted the conclusion without the middle two links, which are where the marks are.'),

  pr(B3, 'Analyse', 6, "Analyse how the law of diminishing returns shapes a firm's short-run marginal cost curve. (6 marks)",
    'An Analyse wants depth rather than breadth, so take one chain all the way rather than describing several things that are true. The chain has to cross from output to cost at some point, and the crossing is the part most answers leave out: decide in advance which single quantity carries you from one side to the other. Appendix 6 says a diagram is credited where appropriate, and here it is.\n'
    + 'In the short run at least one factor is fixed, so adding more of the variable factor to it eventually raises output by less each time: marginal product falls (1 mark). The firm pays the same wage for each worker whatever that worker adds (1 mark). Marginal cost is therefore the wage divided by marginal product (1 mark), so as marginal product falls, marginal cost rises (1 mark). Where marginal product is at its highest, marginal cost is at its lowest (1 mark), which is what gives the short-run marginal cost curve its falling-then-rising shape (1 mark). A chain that stops at "so costs rise" has not said which cost or why the wage matters.'),

  pr(B4, 'Draw', 4, "Draw a short-run cost diagram showing average cost, average variable cost and marginal cost, and label the two points at which marginal cost crosses an average. (4 marks)",
    'Decide the order of the features before you draw a single curve: two of them are crossings and a crossing cannot be placed until both curves through it exist. Think about what the vertical gap between two of these three curves represents, because that decides whether they may be drawn parallel. Label every curve and both axes — an unlabelled curve on a cost diagram is not creditable however accurate its shape.\n'
    + `Axes labelled, with costs per unit on the vertical axis and output on the horizontal (1 mark). A U-shaped average variable cost curve and a U-shaped average cost curve above it, converging as output rises because the gap between them is average fixed cost (1 mark). A marginal cost curve that falls and then rises more steeply than either average (1 mark). Marginal cost crossing average variable cost at the lowest point of AVC and average cost at the lowest point of AC, with AVC's crossing to the LEFT of AC's, both marked (1 mark). Drawing AC and AVC parallel is the commonest error: it says average fixed cost never falls, and average fixed cost always falls.`),

  pr(B5, 'Explain', 4, 'Explain why a firm with a high minimum efficient scale relative to the size of its market is likely to face few competitors. (4 marks)',
    'A two-stage chain again, and the two stages are about two different firms: the one that has reached this scale and the one that has not. Work out first what minimum efficient scale actually says about a firm\'s costs, then ask what that means for anybody producing below it. Keep "cost per unit" and "total cost" apart throughout — a smaller firm has a lower total cost and that is not the point.\n'
    + 'Minimum efficient scale is the lowest output at which long-run average cost reaches its minimum (1 mark). A firm producing below it has not yet taken all the available economies of scale, so its cost per unit is higher than that of a firm at or above it (1 mark). If minimum efficient scale is large relative to the market, only a few firms can reach that output, because the market cannot absorb the output of many such firms (1 mark). Any firm that stays below it is permanently at a cost disadvantage and cannot match the larger firms\' prices while covering its costs (1 mark).'),

  pr(B6, 'Examine', 8, 'Examine the effects on a firm of growing beyond its minimum efficient scale. (8 marks)',
    'Both directions are in play here and the question does not tell you which wins, so the answer has to hold two things at once: what continued growth still offers and what it starts to cost. Sort out first which of the effects you want to discuss are long-run effects, because an effect that needs a fixed factor does not belong in this answer at all. Appendix 6 says an Examine needs a brief assessment as well as a chain of reasoning, so leave room at the end to weigh the two sides.\n'
    + 'The chain: beyond minimum efficient scale the firm has already taken every available economy of scale, so long-run average cost no longer falls with size. Over a range it holds steady, and further growth changes nothing about cost per unit while it does bring a larger market presence, more secure supply contracts and a broader spread of risk. Past that range diseconomies of scale set in: communication problems, as a message crosses more people and arrives later and changed; coordination problems, as the effort of keeping more parts in step grows faster than output; and X-inefficiency, as costs drift above the lowest attainable level because nothing inside a large organisation forces them down. Long-run average cost then rises, and the firm is producing each unit for more than a smaller rival would. The brief assessment should weigh how flat that range is in this industry — where it is wide, growth is nearly costless and the strategic gains dominate — and should note that the diseconomies are organisational rather than technical, so a firm that restructures may postpone them. It is worth being clear that none of this is the law of diminishing returns, which needs a fixed factor and belongs to the short run.'),

  pr(B7, 'Discuss', 14, 'Discuss whether a firm making a loss should continue to produce in the short run. (14 marks)',
    'Start by working out what a firm actually gives up by stopping, in the period the question names — the answer to that is what decides whether this question is as easy as it looks. A Discuss asks for a critical assessment and different viewpoints, so settle in advance which cost figure divides the two cases and what would move a firm from one side of it to the other. Plan the structure before writing: the rule, the case for staying, the case for stopping, and what the decision really turns on.\n'
    + `The mechanism first: in the short run at least one factor is fixed, so the fixed cost is owed whether or not anything is produced. The choice is therefore between two losses rather than between a loss and nothing. ${B.name} making ${qty(B.ref.q)} ${B.units} ${B.per} has a total cost of ${money(B.ref.tc)}, of which ${money(B.tfc)} is fixed, so average cost is ${money(B.ref.ac)} and average variable cost is ${money(B.ref.avc)}. At a price of ${money(B.shortRunLoss.price)} revenue is ${money(B.shortRunLoss.revenue)} and the loss is ${money(Math.abs(B.shortRunLoss.profit))} — less than the ${money(B.tfc)} lost by stopping, because each ${B.unit} covers its own variable cost and leaves ${money(B.shortRunLoss.price - B.ref.avc)} towards the fixed cost. At ${money(B.shutdown.price)} the loss is ${money(Math.abs(B.shutdown.profit))}, worse than stopping, because each ${B.unit} now fails to cover even its variable cost. The rule follows: produce while price is at or above average variable cost. The case for continuing goes beyond the arithmetic — a firm that stops loses skilled staff it will have to rehire and retrain, loses customers to rivals, and may find restarting costs more than the difference it saved. The case against is that "short run" can quietly become permanent: a firm covering variable costs and nothing else is replacing none of its capital, so it is running down the plant it is waiting to use. Different viewpoints: a lender wants the loss minimised this quarter, a workforce wants the plant kept open, and an owner who has to decide whether to renew the lease is already thinking in the long run, where the test is average cost of ${money(B.ref.ac)} rather than average variable cost. The judgement should turn on how long the low price is expected to last relative to how long the fixed commitment has left to run.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the view that a firm earning only normal profit is performing badly. (20 marks)',
    'Everything here turns on what the term in the question actually means, so establish that first and test the view against it rather than against the ordinary sense of the words — but do not stop at a definition, because a definition is not an evaluation and the view has a real argument underneath it. Think about what a firm earning exactly this is and is not able to do, and over what period. A judgement is required, so decide in advance what would have to be true for the view to hold, and say so explicitly rather than concluding that it depends.\n'
    + 'Against the view: normal profit is where total revenue exactly covers total cost, and that cost figure already includes what the owners could have earned by putting their money and effort into the next best alternative. A firm earning exactly that is covering every cost it has, including the return its owners require to stay, so there is no better use available for those resources and no reason for anybody to leave. Zero on the profit line is not zero reward; it is the reward already counted as a cost. A firm earning normal profit is also earning more than one making a loss and more than one covering only its variable costs, and it is under no pressure to close. For the view: normal profit leaves nothing over. A firm with no supernormal profit has no retained earnings to invest in new capital, no cushion against a bad year, and has to borrow or raise capital for anything it wants to do — on terms set by lenders who can see the accounts. Over time that matters, because rivals earning supernormal profit can fund improvements from their own revenue and pull ahead, so a firm earning normal profit indefinitely may be sliding rather than standing still. The judgement should distinguish between a position and a trajectory: normal profit is a perfectly sound position and a poor trajectory if it persists, so the view is wrong as a statement about performance now and defensible as a statement about prospects. What would have to be true for the view to hold is that the industry requires continuing investment to stay competitive; where it does not, a firm can earn normal profit indefinitely and be doing exactly what it should. A strong answer will add that the size of normal profit is not fixed — it is whatever the owners could earn elsewhere, so it rises and falls with the alternatives, and a firm earning normal profit in a period of high returns elsewhere is earning a great deal.'),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
/*
 * `structure-05` names the March flashcards as one of the places the section contradicted itself:
 * they covered economies of scope and accounting against economic profit, neither of which is in
 * econ_spec.txt at all, while the Learn Mode content taught neither. Every card below is a leaf of
 * 3.3.2 and every figure in one comes from _packet28-util.mjs.
 */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is total revenue?', 'TR = P × Q — everything a firm receives from selling its output, before any cost is taken off.'),
  card('What is average revenue, and what does it always equal?', 'AR = TR ÷ Q, which always equals the price. The firm\'s demand curve IS its average revenue curve.'),
  card('What is marginal revenue?', 'The change in total revenue from selling one more unit: MR = ΔTR ÷ ΔQ.'),
  card(`If AR = a ${'−'} bQ, what is MR?`, `MR = a ${'−'} 2bQ — the same starting point and twice the gradient, because selling one more unit needs a lower price on every unit already sold.`),
  card('Where is total revenue at its greatest?', `Where marginal revenue is ${money(0)}, and where price elasticity of demand is ${elasticity(-1)}. For ${N.name}, ${qty(N.trMaxQ)} ${N.units} and ${money(N.trMax)}.`),
  card('How is price elasticity of demand calculated?', 'PED = %ΔQ ÷ %ΔP, with each percentage change measured against the value it started from. It is always negative.'),
  card('What does a price CUT do to total revenue?', `Elastic (below ${elasticity(-1)}): TR rises. Unit elastic (${elasticity(-1)}): TR unchanged. Inelastic (between ${elasticity(-1)} and zero): TR falls.`),
  card('State the law of diminishing returns.', 'As more of a variable factor is added to a fixed factor, the extra output from each additional unit eventually falls. Also called diminishing marginal productivity.'),
  card('What are marginal product and average product?', 'MP = ΔTP ÷ ΔL, the extra output from one more worker. AP = TP ÷ L, output per worker.'),
  card('Where does marginal product cross average product?', 'At average product\'s HIGHEST point — because a value above an average pulls it up and a value below pulls it down.'),
  card('How do marginal product and marginal cost relate?', 'MC = wage ÷ MP. Marginal cost is lowest where marginal product is highest, and rises as marginal product falls.'),
  card('How do average product and average variable cost relate?', 'AVC = wage ÷ AP, so average variable cost is lowest where average product is highest.'),
  card('What is the relationship between total product and total cost?', `TC = total fixed cost + wage × workers, so total cost rises in equal steps while total product rises in unequal ones. Where output climbs fast, cost per unit is low.`),
  card('Name the seven cost measures and how they relate.', 'TC = TFC + TVC; AC = TC ÷ Q; AFC = TFC ÷ Q; AVC = TVC ÷ Q; MC = ΔTC ÷ ΔQ. And AC = AFC + AVC at every output.'),
  card('How does average fixed cost behave as output rises?', 'It falls at every level of output and never reaches zero — a constant divided by a growing number. It can never be flat and can never turn up.'),
  card('How does average variable cost behave as output rises?', `It falls, flattens and rises, turning exactly where average product turns. At ${B.name} its lowest point is ${money(B.minAvc)}.`),
  card('Where does marginal cost cross the average curves?', `At the lowest point of each: average variable cost at ${money(B.minAvc)}, then average cost at ${money(B.minAc)}. AVC's crossing is always to the LEFT of AC's.`),
  card('What is the difference between the short run and the long run?', 'In the short run at least one factor is fixed. In the long run every factor can be varied, so there are no fixed costs.'),
  card('Why can LRAC never lie above a short-run average cost curve?', 'In the long run the firm can always choose to keep the plant it has, so the short run is one of its options and it can never be forced to pay more.'),
  card('What is minimum efficient scale?', `The LOWEST output at which long-run average cost is at its minimum. For ${B.name}, ${qty(L.mes)} ${B.units} ${B.per} at ${money(L.floor)}.`),
  card('What is the difference between an internal and an external economy of scale?', 'Internal comes from THIS firm growing; external comes from the INDUSTRY around it growing. Ask whose growth caused the saving.'),
  card('Name the six sources of internal economies of scale.', INTERNAL_SOURCES.map(([n]) => n.toLowerCase()).join(', ') + '.'),
  card('Name the three sources of external economies of scale.', EXTERNAL_SOURCES.map(([n]) => n.toLowerCase()).join('; ') + '.'),
  /* Not lower-cased: the specification writes X-inefficiency, and the other three surfaces do too. */
  card('Name the three sources of diseconomies of scale.', DISECONOMY_SOURCES.map(([n], i) => (i === 2 ? n : n.toLowerCase())).join(', ') + '.'),
  card('What is X-inefficiency?', 'Costs drifting above the lowest level the firm could attain, because in a large organisation nothing in particular forces them down. It is the third source of diseconomies of scale.'),
  card('How do diseconomies of scale differ from diminishing returns?', 'Diseconomies are a LONG-run effect from the firm being too large to run well. Diminishing returns are a SHORT-run effect from one factor being fixed.'),
  card('What is normal profit?', 'TR = TC, so AR = AC. The minimum return needed to keep the firm in this line of business — it shows as zero profit because the return is already inside the cost.'),
  card('What is supernormal profit?', 'TR > TC, so AR > AC: a return over and above what was needed to keep the firm in this line of business.'),
  card('What is the short-run shutdown point?', `Where price equals average variable cost (${money(B.ref.avc)} at ${B.name}). Below it every unit made adds to the loss; above it each unit contributes towards the fixed cost.`),
  card('What is the long-run shutdown point?', `Where price equals average cost (${money(B.ref.ac)} at ${B.name}). In the long run there are no fixed costs, so there is nothing to contribute towards.`),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Reading normal profit as making no money',
    'Writing that a firm earning normal profit "is not making any profit" and concluding that it will close down.',
    'Normal profit is total revenue exactly covering total cost, and that cost figure already includes what the owners could have earned elsewhere. A firm earning it is covering every cost it has, including its owners\' required return, so there is no better use of those resources and no reason to leave.',
    'Write that normal profit is the minimum return needed to keep the firm in this line of business, and that it shows as zero on the profit line because the return is counted inside the cost.'),

  mistake('Shutting down as soon as a loss appears',
    `Writing that a loss-making firm should stop producing at once, without comparing the two losses.`,
    `In the short run the fixed cost is owed either way, so stopping is not free: it costs ${money(B.tfc)}. ${B.name} at ${money(B.shortRunLoss.price)} a ${B.unit} loses ${money(Math.abs(B.shortRunLoss.profit))} by producing, which is the SMALLER of the two losses, because each ${B.unit} covers its variable cost of ${money(B.ref.avc)} and leaves ${money(B.shortRunLoss.price - B.ref.avc)} towards the fixed cost.`,
    'Compare the loss from producing with the fixed cost. Shut down in the short run only when price is below average variable cost; use average cost for the long-run test.'),

  mistake('Drawing average cost and average variable cost as parallel curves',
    'A cost diagram in which AC sits a constant distance above AVC all the way across.',
    'The vertical gap between them IS average fixed cost, and average fixed cost falls at every level of output. Parallel curves therefore assert that a constant divided by a growing number stays the same. The same error puts the two marginal-cost crossings at the same output, when AVC\'s is always to the left of AC\'s.',
    'Draw the two curves converging as output rises, and put marginal cost through the lowest point of AVC first and the lowest point of AC second.'),

  mistake('Confusing diminishing returns with diseconomies of scale',
    'Explaining a rise in long-run average cost by saying the extra workers become less productive.',
    'That is the diminishing-returns argument, and it needs a FIXED factor for the variable factor to be spread over. In the long run nothing is fixed. The specification\'s three sources of diseconomies are communication problems, coordination problems and X-inefficiency, and all three are about the firm becoming harder to run rather than about any factor running short.',
    'Name the period first. Fixed factor mentioned: short run, diminishing returns. Firm has grown: long run, diseconomies of scale — then name which of the three.'),

  mistake('Reading minimum efficient scale as the most profitable output',
    'Writing that a firm produces at minimum efficient scale because that is where its profit is greatest.',
    `Minimum efficient scale is a COST concept: the lowest output at which long-run average cost is at its minimum. It says nothing about revenue, so it cannot say anything about profit. It is also the FIRST output achieving that minimum — for ${B.name}, ${qty(L.mes)} ${B.units} ${B.per} and not ${qty(L.flatTo)}, although cost per ${B.unit} is the same at both.`,
    'Define it as the lowest output at which long-run average cost reaches its minimum, and use it to say how big a firm must be to compete on cost.'),

  mistake('Saying a price cut raises revenue because more is sold',
    'Concluding that cutting the price increases total revenue, without establishing the elasticity first.',
    `More is always sold; whether revenue rises depends on whether the extra quantity outweighs the lower price charged on every unit. On ${N.name}'s own demand line the same ${money(2)} cut takes revenue from ${money(N.elastic.tr0)} up to ${money(N.elastic.tr1)} at one end and from ${money(N.inelastic.tr0)} down to ${money(N.inelastic.tr1)} at the other.`,
    'State the elasticity first and let the revenue effect follow from it: elastic, revenue rises; inelastic, revenue falls.'),
];

/* ══ Extras — chains and evaluation lines ═════════════════════════════════ */
export const EXTRAS = {
  chains: [
    {
      title: 'From a fixed factor to the shape of the cost curves',
      steps: [
        'At least one factor is fixed, so this is the short run and the plant cannot be changed.',
        `Each extra worker has less plant to work with, so marginal product eventually falls — ${B.rows.filter((r) => r.mp != null).map((r) => qty(r.mp)).join(', ')} ${B.units}.`,
        `Each worker costs the same ${money(B.wage)} whatever they add, so marginal cost is that wage divided by marginal product.`,
        `Marginal cost is therefore lowest where marginal product is highest (${money(B.at(10).mc)}) and rises as marginal product falls.`,
        `While marginal cost is below average cost it pulls the average down; once above, it pulls the average up.`,
      ],
      result: `Marginal cost cuts average variable cost at ${money(B.minAvc)} and average cost at ${money(B.minAc)}, each at its own lowest point — which is where the U shape comes from.`,
    },
    {
      title: 'From a price to the decision to produce',
      steps: [
        `${B.name} makes ${qty(B.ref.q)} ${B.units} ${B.per} at a total cost of ${money(B.ref.tc)}: average cost ${money(B.ref.ac)}, average variable cost ${money(B.ref.avc)}.`,
        `Compare the price with average cost. Above ${money(B.ref.ac)} the firm earns supernormal profit; at ${money(B.ref.ac)} exactly, normal profit; below it, a loss.`,
        `If it is a loss, compare the price with average variable cost, because the fixed ${money(B.tfc)} is owed either way.`,
        `Above ${money(B.ref.avc)}, each ${B.unit} leaves something towards the fixed cost, so producing loses less than stopping.`,
        `Below ${money(B.ref.avc)}, each ${B.unit} adds to the loss, so producing loses more than stopping.`,
      ],
      result: `Short run: produce while price is at or above ${money(B.ref.avc)}. Long run: stay in the industry while price is at or above ${money(B.ref.ac)}, because there are no fixed costs left to contribute towards.`,
    },
    {
      title: 'Is growing larger worth it?',
      points: [
        'How far the firm is from minimum efficient scale: below it, growth lowers cost per unit and the case is straightforward.',
        'How wide the flat stretch is in this industry: where it is wide, growth beyond minimum efficient scale costs nothing per unit and may buy security of supply and a broader spread of risk.',
        'Whether the diseconomies are organisational or technical. Communication and coordination problems can be postponed by restructuring; they are not a law of nature.',
        'Whether the firm is relying on external economies it does not control — trained labour, transport, a shared research base — all of which can be lost without the firm doing anything.',
      ],
    },
  ],
};
