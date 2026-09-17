/**
 * PACKET 28 — revenue-costs-profits, Learn Mode content and Notes.
 *
 * Economics Unit 3 (WEC13), IAL topic 3.3.2, audit/raw/econ_spec.txt:1294-1358 — a span that crosses a
 * page break and resumes at :1346 as "3.3.2 Revenue, costs and profits (continued)", where sub-topic 4
 * lives. SEVEN blocks, twenty subsections, one idea each, in the specification's own order.
 *
 * SEVEN AND NOT EIGHT, deliberately. `freeQuizPayload()` spends PREVIEW_LIMITS.quiz (2) on the Quiz
 * tab and then one pin per block, all bounded by FREE_QUIZ_MAX (10), so at eight blocks a signed-out
 * student's pre-test drops from three questions to two (DECISIONS, 16 September). Six of the seven
 * chapters are one specification sub-topic each; sub-topic 2 is split into the product curves and the
 * cost measures because it is twelve leaves and the two halves are taught in different units.
 *
 * FIVE SCOPE DECISIONS THE SPECIFICATION SETTLED BEFORE A WORD WAS WRITTEN (see NEXT.md):
 *
 *   - X-INEFFICIENCY IS THIS SECTION'S OWN, AND TWO FINDINGS SAY IT IS NOT. `structure-04` and
 *     `specGap-07` both ask for "allocative, productive, dynamic, X-inefficiency" to be moved out as
 *     3.3.3 material. Three of the four are: econ_spec.txt:1364-1366 is topic 3.3.3 · 1a, packet 29's
 *     section, which `contextFor` resolves to 3.3.3 with 54 leaves. But `X-inefficiency` is :1339,
 *     which is 3.3.2 · 3f-3 — one of exactly three sources of diseconomies of scale, a requirement of
 *     THIS section. Obeying as written would have deleted a leaf the section already under-taught.
 *     That is the dangerous shape of finding packet 19 met and packet 25 met twice: a "this is out of
 *     scope" claim needs the same spec check as a "this is missing" one.
 *   - PROFIT MAXIMISATION IS NOT TAUGHT HERE, AND TWO FINDINGS ASK FOR IT. `topFix-04` wants reorder
 *     recalls built from "the profit-max four-step method" and "the supernormal-profit-entry chain",
 *     and `structure-01` names the same two. `profit maximisation` is :1278 and :1285, topic 3.3.1 · 3
 *     — `types-sizes-businesses`, packet 20, built on 16 September — and "profit-maximising
 *     equilibrium" is :1374, :1383 and :1426, all 3.3.3. 3.3.2 · 4 asks for the DISTINCTION between
 *     normal profit, supernormal profit and losses, and for the shutdown points. Both are taught here
 *     at a GIVEN price and a GIVEN output, which is all either requirement needs. A finding can ask
 *     you to build another section's topic as easily as it can ask you to delete your own.
 *   - "PRICE TAKER" AND "PRICE MAKER" ARE NOT WORDS THE SPECIFICATION HAS. Both are 0 in
 *     econ_spec.txt, and `perfect competition` is one hit, at 3.3.3 · 3. `structure-06` is right that
 *     the constant-price case should come first and wrong about what to call the two cases; 1a asks
 *     for the relationship between the three revenue measures, and the relationship differs according
 *     to whether the price changes with output. So both cases are taught, in the specification's own
 *     terms, and neither label appears. Eighth instance of the packet 13/16/17/18/20/22/23/24/25 rule.
 *   - NOR ARE "ECONOMIES OF SCOPE", "ACCOUNTING PROFIT" OR "ECONOMIC PROFIT". All three are 0 in
 *     econ_spec.txt and all three were in the March flashcards (`structure-05`). `specGap-06` asks for
 *     accounting against economic profit and says it is "unsure whether explicitly on the IAL 3.3.2
 *     spec". It is not: 4a names normal profit, supernormal profit and losses. What the distinction is
 *     FOR is taught — that the cost normal profit covers includes what the owners could earn elsewhere
 *     — under the specification's own heading.
 *   - THE DISECONOMIES ARE COMMUNICATION, COORDINATION AND X-INEFFICIENCY. `specGap-01` gives them as
 *     "communication, coordination, motivation". `motivation` is one hit in econ_spec.txt, at :294, in
 *     prose about the specification itself. The same finding calls 3d-5 "purchasing/bulk-buying";
 *     `bulk` is 0 and the specification's word is purchasing.
 *
 * Money is in dollars throughout. Every figure belongs to Nadira Textiles or Bahri Bottling and is
 * derived in _packet28-util.mjs. Real examples name a kind of firm and carry NO year, NO named company
 * and NO figure — which is how `accuracy-01` and `accuracy-02` are answered: an airline pricing claim
 * that was backwards and an AI firm said to be earning supernormal profit while it reported losses
 * were both dated claims about a real market that this repository cannot check, so the shape goes with
 * them (packet 15's rule, packet 25's application).
 */
import {
  subId, SECTION, hash8, money, qty, elasticity, round2,
  NADIRA, BAHRI, LONGRUN, INTERNAL_SOURCES, EXTERNAL_SOURCES, DISECONOMY_SOURCES,
} from './_packet28-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (lib/content-validator.mjs:458, :478), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here, so a reason cannot
 * drift away from the item it explains and a missing one is a length mismatch rather than a silent
 * undefined.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const N = NADIRA, B = BAHRI, L = LONGRUN;

export const B1 = 'Total, Average and Marginal Revenue';
export const B2 = 'Revenue and Price Elasticity of Demand';
export const B3 = 'Diminishing Returns and the Product Curves';
export const B4 = 'The Seven Cost Measures';
export const B5 = 'The Long Run, LRAC and Minimum Efficient Scale';
export const B6 = 'Economies and Diseconomies of Scale';
export const B7 = 'Profits, Losses and the Shutdown Points';

/* ══ Block 1 — Total, average and marginal revenue (3.3.2 · 1a) ═════════════ */

const totalRevenue = (() => {
  const sid = subId('total-revenue');
  return {
    id: sid,
    title: 'Total Revenue',
    keyIdea: `Total revenue is price multiplied by quantity: everything the firm takes in from selling, before a single cost is taken off.`,
    body: [
      { type: 'paragraph', text: `**Total revenue** is what a firm receives from selling its output. One formula, and it is the one the specification opens the topic with: **TR = P × Q**.` },
      { type: 'paragraph', text: `Nothing has been paid out yet. Revenue is not profit, is not what the owners keep and is not money in the bank — it is the top line, and every cost in the rest of this topic is taken off it.` },
      { type: 'paragraph', text: `${N.name} sells ${N.good} by the ${N.unit}. At ${money(N.ar(4))} a ${N.unit} it sells ${qty(4)} ${N.units} ${N.per}, so total revenue is ${money(N.ar(4))} × ${qty(4)} = ${money(N.tr(4))}. Drop the price to ${money(N.ar(10))} and it sells ${qty(10)}, so total revenue is ${money(N.trMax)}.` },
      { type: 'paragraph', text: `That second figure is the interesting one. Cutting the price more than doubled what the firm takes in — and cutting it again, to ${money(N.ar(16))}, brings total revenue back down to ${money(N.tr(16))}. Total revenue rises, peaks and falls as the price comes down, and the rest of this chapter is about why.` },
    ],
    realExample: { emoji: '🧾', text: `A market trader who sells out by midday has high revenue and may have set the price too low; a trader with stock left at closing time may have set it too high. Neither knows from the day's takings alone, because takings are a product of two numbers that move in opposite directions.` },
    misconception: `Students treat total revenue as what the firm "makes" and go on to talk about profit. Revenue is the whole amount received, before any cost at all. Instead write: total revenue is price times quantity, and profit is what is left after total cost has been taken off it.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation, and advises showing workings. Quantitative skill QS6 at International Advanced Level is to calculate cost, revenue and profit, marginal, average and totals, so a revenue figure is something you will be asked to produce rather than only to discuss.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the three revenue formulae this chapter is built on:',
      template: [
        'Total revenue = P × ___',
        'Average revenue = total revenue ÷ Q, which always equals the ___',
        'Marginal revenue = the change in total revenue from selling ___ more unit',
      ],
      answers: ['quantity', 'price', 'one'],
      hints: ['what P is multiplied by', 'what average revenue always turns out to be', 'how many extra units a MARGINAL measure is about'],
      distractors: ['cost', 'profit', 'two'],
    }),
  };
})();

const averageRevenue = (() => {
  const sid = subId('average-revenue');
  return {
    id: sid,
    title: 'Average Revenue Is the Price',
    keyIdea: `Average revenue is total revenue divided by quantity, which is always the price — so the firm's demand curve and its average revenue curve are the same line.`,
    body: [
      { type: 'paragraph', text: `**Average revenue** is total revenue divided by quantity: **AR = TR ÷ Q**. Put TR = P × Q into it and the Q cancels, leaving **AR = P**. Average revenue is the price, always, and not sometimes.` },
      { type: 'paragraph', text: `Start with the easier case. Suppose the firm can sell as much as it likes at one price — the price does not change however much it produces. Then every ${N.unit} brings in the same amount, so the average brings in that amount and so does the next one: **AR = MR = P**, and all three are one horizontal line.` },
      { type: 'paragraph', text: `Now the case ${N.name} is in. To sell more ${N.units} it has to lower the price, and not only on the extra ${N.unit} — on all of them. Its demand line is **P = ${N.a} ${'−'} ${N.b}Q**, so average revenue falls as output rises, and the AR curve slopes downward.` },
      { type: 'paragraph', text: `The useful consequence: a firm's **demand curve is its average revenue curve** — one line with two names, because the price buyers will pay for a quantity is exactly the revenue per unit the firm gets.` },
    ],
    realExample: { emoji: '🎟️', text: `A stallholder at a busy market is close to the first case: whatever they bring, they sell at the going rate. The only workshop of its kind in a town is in the second: to shift more work it must quote lower, to everybody.` },
    misconception: `Students treat average revenue as something separate from price and look for a different figure. AR = TR ÷ Q = (P × Q) ÷ Q = P. Instead: read the demand curve as the average revenue curve, and stop looking for a second number.`,
    examMatters: `Appendix 6 defines Define (2 marks) as requiring students to give the meaning of a term, concept or phrase. Two marks for average revenue means the formula and the fact that it equals price, not the formula twice in different words.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by which case it describes:',
      groups: [
        { name: 'Price does not change with output', items: ['AR = MR = P at every quantity', 'The revenue curves are horizontal', 'Selling one more costs nothing on the units already sold'] },
        { name: 'Price must fall to sell more', items: ['MR lies below AR at every quantity above zero', 'The AR curve slopes downward', 'Selling one more means a lower price on every unit'] },
      ],
      why: [
        'With the price fixed, every unit and the next unit bring in the same amount, so the three measures coincide.',
        'Lowering the price to sell one more applies to all the earlier units too, so what the extra unit adds is less than its price.',
      ],
    }),
  };
})();

const marginalRevenue = (() => {
  const sid = subId('marginal-revenue');
  const step = N.schedule.find((r) => r.q === 10);
  return {
    id: sid,
    title: 'Marginal Revenue Falls Twice as Fast',
    keyIdea: `Marginal revenue is the change in total revenue from one more unit sold; on a straight-line demand curve it falls at twice the gradient and is zero where total revenue peaks.`,
    body: [
      { type: 'paragraph', text: `**Marginal revenue** is the change in total revenue from selling **one more ${N.unit}**: **MR = ΔTR ÷ ΔQ**. It answers "what did that last sale add?", which is not "what did it sell for?".` },
      { type: 'paragraph', text: `When the price must fall to sell more, the last sale adds its own price and takes a little from every ${N.unit} already sold — so marginal revenue is below the price at every quantity above zero.` },
      { type: 'paragraph', text: `On a straight-line demand curve the arithmetic is exact: if **AR = a ${'−'} bQ** then **MR = a ${'−'} 2bQ**, the same starting point and twice the gradient. For ${N.name}, AR = ${N.a} ${'−'} ${N.b}Q and MR = ${N.a} ${'−'} ${N.b * 2}Q.` },
      { type: 'flow', steps: [
        { title: 'The firm lowers its price to sell one more', subtitle: 'the lower price applies to every unit' },
        { title: 'The extra unit adds its price', subtitle: 'a gain' },
        { title: 'Every earlier unit now sells for less', subtitle: 'a loss, growing with output' },
        { title: 'Marginal revenue is the gain minus the loss', subtitle: `below the price, falling twice as fast` },
      ], result: `At ${qty(N.trMaxQ)} ${N.units} the two cancel: MR = ${money(0)}, and TR is greatest at ${money(N.trMax)}`, resultType: 'good' },
      { type: 'paragraph', text: `Past that point MR is negative: one more ${N.unit} takes total revenue **down**, the loss on the earlier ${N.units} now exceeding the price of the extra one.` },
    ],
    realExample: { emoji: '📉', text: `A workshop may find a bigger contract priced so low that it drags down what the firm can charge everyone else: worth something alone, and less than nothing once the other quotes are counted.` },
    misconception: `Students write that marginal revenue falls "because the firm sells more". Selling more does not by itself lower revenue per unit: it falls because the extra sale requires a lower price on the units already sold. Instead: name that price cut.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning: the price cut applying to all units, then the gain on the extra unit being smaller than the loss on the rest.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the relationship for a straight-line demand curve, and read it off ${N.name}'s figures:`,
      template: [
        `If AR = a ${'−'} bQ then MR = a ${'−'} ___bQ`,
        `Marginal revenue is ${money(0)} where total revenue is at its ___`,
        `Beyond that quantity marginal revenue is ___`,
      ],
      answers: ['2', 'greatest', 'negative'],
      hints: ['the factor that makes the gradient twice as steep', 'the top of the total revenue curve', 'what sign a number below zero has'],
      distractors: ['3', 'lowest', 'constant'],
    }),
  };
})();

/* ══ Block 2 — Revenue and price elasticity of demand (3.3.2 · 1b) ══════════ */

const pedAndRevenue = (() => {
  const sid = subId('ped-and-revenue');
  return {
    id: sid,
    title: 'Elastic, Unit Elastic, Inelastic',
    keyIdea: `Price elasticity of demand tells you what a price change does to total revenue, and it is the same fact as the sign of marginal revenue.`,
    body: [
      { type: 'paragraph', text: `**Price elasticity of demand** measures how responsive quantity demanded is to a change in price. It is negative, because the two move in opposite directions, and what matters is how far from zero it is.` },
      { type: 'bullets', items: [
        `**Below ${elasticity(-1)}** — demand is elastic. Quantity responds more than price does, so cutting the price **raises** total revenue.`,
        `**Exactly ${elasticity(-1)}** — unit elastic. The two changes cancel and total revenue does not move; this is where total revenue is at its greatest.`,
        `**Between ${elasticity(-1)} and zero** — demand is inelastic. Quantity barely responds, so cutting the price **lowers** total revenue.`,
      ] },
      { type: 'paragraph', text: `Read "below ${elasticity(-1)}" as further from zero: ${elasticity(-3)} is below ${elasticity(-1)}, and ${elasticity(-0.33)} is above it. The minus sign is not a size.` },
      { type: 'paragraph', text: `Now put this beside the last chapter. Where demand is elastic, marginal revenue is **positive** and selling more adds to total revenue. Where it is inelastic, marginal revenue is **negative** and selling more subtracts. Where it is unit elastic, marginal revenue is ${money(0)}.` },
      { type: 'paragraph', text: `These are not two topics that happen to agree. They are one fact about the next ${N.unit} sold, written two ways — which is why the specification puts elasticity inside the revenue requirement rather than beside it.` },
    ],
    realExample: { emoji: '🚌', text: `A bus operator cutting fares on a route people can walk instead may fill the buses and take more money. The same cut on a route with no alternative fills nothing extra and simply collects less from the same passengers.` },
    misconception: `Students say a price cut always increases revenue because more is sold. More is always sold; whether revenue rises depends on whether the extra quantity outweighs the lower price on every unit. Instead: state the elasticity first, then the revenue effect follows from it.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning, diagrams where appropriate, and depth rather than breadth. A chain that stops at "demand is elastic" has not reached the revenue, which is what the question asked about.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each value of price elasticity of demand to what a PRICE CUT does:',
      pairs: [
        { left: elasticity(-3), right: 'total revenue rises' },
        { left: elasticity(-1), right: 'total revenue does not change' },
        { left: elasticity(-0.33), right: 'total revenue falls' },
      ],
      why: [
        'Further from zero than one, so quantity responds more than price and the extra sales more than replace the lower price.',
        'The two percentage changes are equal and opposite, so what is gained on quantity is exactly lost on price.',
        'Closer to zero than one, so quantity hardly responds and the lower price is collected on almost the same number of units.',
      ],
    }),
  };
})();

const calculatingPed = (() => {
  const sid = subId('calculating-ped');
  const e = N.elastic, i = N.inelastic;
  const pcQ = (x) => `+${round2((x.q1 - x.q0) / x.q0 * 100)}%`;
  const pcP = (x) => `${elasticity(round2((x.p1 - x.p0) / x.p0 * 100))}%`;
  return {
    id: sid,
    title: 'Calculating PED, and the Revenue Effect',
    keyIdea: `PED is the percentage change in quantity demanded divided by the percentage change in price, each measured against the value it started from.`,
    body: [
      { type: 'paragraph', text: `The formula is **PED = %ΔQ ÷ %ΔP**, and each percentage change is measured against the value it started from. Two worked cases, both on ${N.name}'s single demand line, both a ${money(2)} price cut.` },
      { type: 'paragraph', text: `**The elastic end.** Price falls from ${money(e.p0)} to ${money(e.p1)}, so quantity rises from ${qty(e.q0)} to ${qty(e.q1)} ${N.units}. %ΔQ = ${pcQ(e)}. %ΔP = ${pcP(e)}. PED = ${pcQ(e)} ÷ ${pcP(e)} = **${elasticity(e.ped)}**. Total revenue moves from ${money(e.tr0)} to ${money(e.tr1)} — it **rises**.` },
      { type: 'paragraph', text: `**The inelastic end.** Price falls from ${money(i.p0)} to ${money(i.p1)}, so quantity rises from ${qty(i.q0)} to ${qty(i.q1)} ${N.units}. %ΔQ = ${pcQ(i)}. %ΔP = ${pcP(i)}. PED = **${elasticity(i.ped)}**. Total revenue moves from ${money(i.tr0)} to ${money(i.tr1)} — it **falls**.` },
      { type: 'paragraph', text: `Both cuts are ${money(2)}. Both start from a total revenue of ${money(e.tr0)}. One ends ${money(e.tr1 - e.tr0)} up and the other ${money(i.tr0 - i.tr1)} down, and the only difference is where on the demand line the firm was standing when it cut.` },
      { type: 'paragraph', text: `That is why elasticity is not a property of a **good**. It is a property of a **point**: the same demand line is elastic at the top and inelastic at the bottom.` },
    ],
    realExample: { emoji: '🏷️', text: `A shop running the same percentage discount across everything it sells will find the discount pays for itself on some shelves and not on others, without anything about the shop or the discount having changed.` },
    misconception: `Students calculate the percentage changes against the new values, or against an average, and get a different answer from the mark scheme. Unless a question asks for the midpoint method, measure each change against the value it started from. Instead: write the two starting values down first and divide by those.`,
    examMatters: `Quantitative skill QS8 is to make calculations of elasticity and interpret the result, so the number alone is not the answer: saying whether demand is elastic and what that does to revenue is the part that carries the question. Appendix 6 advises showing workings for a Calculate.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four stages of a PED calculation into the order you carry them out:',
      correctOrder: [
        'Write down the price and quantity before the change',
        'Work out each percentage change against its own starting value',
        'Divide the quantity percentage by the price percentage',
        'Say whether demand is elastic or inelastic, and what that does to revenue',
      ],
      why: [
        'Both percentages are measured against these two figures, so nothing can be worked out until they are written down.',
        'Each change is divided by the value it started from, and mixing the two starting values is the commonest error.',
        'PED is the quantity response over the price response, in that order — the other way round gives the reciprocal.',
        'A number on its own answers nothing: the question is about the revenue, and the number is the route to it.',
      ],
    }),
  };
})();

/* ══ Block 3 — Diminishing returns and the product curves (2a, 2b, 2d) ═════ */

const diminishingReturns = (() => {
  const sid = subId('diminishing-returns');
  return {
    id: sid,
    title: 'The Law of Diminishing Returns',
    keyIdea: `In the short run at least one factor is fixed, so adding more of a variable factor eventually adds less and less extra output.`,
    body: [
      { type: 'paragraph', text: `The **short run** is the period in which at least one factor of production cannot be changed. For ${B.name} that factor is the plant: it can hire another worker today and it cannot build another plant today.` },
      { type: 'paragraph', text: `The **law of diminishing returns** says that as more of a variable factor is added to a fixed one, the extra output from each additional unit of the variable factor eventually falls. The specification also calls this **diminishing marginal productivity**, and derives the whole short-run cost picture from it.` },
      { type: 'paragraph', text: `Watch it happen. The first worker at ${B.name} has the plant to themselves and produces ${qty(B.at(4).q)} ${B.units}. The second adds ${qty(B.at(10).mp)} — more than the first, because two people can share the tasks. The third adds ${qty(B.at(15).mp)}. The fourth adds ${qty(B.at(18).mp)}. The fifth adds ${qty(B.at(20).mp)}.` },
      { type: 'paragraph', text: `Nothing has changed about the workers. They are equally capable and equally willing. What has changed is how much plant each of them has to work with, and that is the whole of the mechanism: **the fixed factor is being spread thinner**.` },
      { type: 'paragraph', text: `Note the word **eventually**. Returns can rise first, and here they do — the second worker adds more than the first. Diminishing returns set in from the third onward.` },
    ],
    realExample: { emoji: '🍳', text: `A second cook in a small kitchen roughly doubles what comes out. A fourth is queueing for the same hob, and a fifth is standing in the way of the other four. The kitchen, not the cook, is what ran out.` },
    misconception: `Students say output falls under diminishing returns. Total output usually keeps rising; it is the EXTRA output from each additional worker that falls. Instead: say marginal product falls, and be clear that total product can still be increasing while it does.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning. Here the first stage is that a factor is fixed and the second is that each extra worker therefore has less of it to work with.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the law as the specification states it:',
      template: [
        'In the ___ run at least one factor of production is fixed',
        'As more of a ___ factor is added to it',
        'The extra output from each additional unit eventually ___',
      ],
      answers: ['short', 'variable', 'falls'],
      hints: ['the period in which the plant cannot be changed', 'the opposite of fixed', 'the direction that makes these returns "diminishing"'],
      distractors: ['long', 'marginal', 'rises'],
    }),
  };
})();

const productCurves = (() => {
  const sid = subId('product-curves');
  const peak = Math.max(...B.rows.filter((r) => r.mp != null).map((r) => r.mp));
  return {
    id: sid,
    title: 'Marginal Product and Average Product',
    keyIdea: `Marginal product is the extra output from one more worker; average product is output per worker; and marginal product crosses average product at average product's highest point.`,
    body: [
      { type: 'paragraph', text: `Two measures, both about the variable factor. **Marginal product** is the extra output from one more worker: **MP = ΔTP ÷ ΔL**. **Average product** is output per worker: **AP = TP ÷ L**.` },
      { type: 'paragraph', text: `At ${B.name}: marginal product rises to ${qty(peak)} ${B.units} at the second worker, then falls to ${qty(B.at(15).mp)}, ${qty(B.at(18).mp)} and ${qty(B.at(20).mp)}. Average product rises to ${B.at(10).ap} and holds it at the third worker, then falls to ${B.at(18).ap} and ${B.at(20).ap}.` },
      { type: 'paragraph', text: `Look at the third worker. Marginal product is ${B.at(15).mp} and average product is ${B.at(15).ap} — they are **equal**, and that is exactly where average product stops rising.` },
      { type: 'flow', steps: [
        { title: 'The next worker adds more than the current average', subtitle: 'so the average is pulled up' },
        { title: 'The next worker adds exactly the average', subtitle: 'so the average does not move — its highest point' },
        { title: 'The next worker adds less than the average', subtitle: 'so the average is pulled down' },
      ], result: `Marginal product cuts average product from above, at average product's highest point`, resultType: 'good' },
      { type: 'paragraph', text: `This is not a fact about ${B.name}'s numbers. It is true of **any** average and its marginal: a value above the average raises it, a value below lowers it, and a value equal to it leaves it alone. The same argument returns twice more in the next chapter, for cost.` },
    ],
    realExample: { emoji: '🏏', text: `A batter's average rises when they score more than it and falls when they score less. Nobody has to calculate anything for that to be true — it follows from what an average is.` },
    misconception: `Students learn "marginal cuts average at its minimum" and apply it to product curves, where average product has a maximum rather than a minimum. The rule is that marginal cuts average at its TURNING POINT. Instead: work out from the pulling-up and pulling-down argument which way the curve turns.`,
    examMatters: `Quantitative skill QS4 is to construct and interpret a range of standard graphical forms and QS9 is to interpret information in tabular and numerical forms — and a product schedule is both.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four stages of the hiring process into the order in which they occur as workers are added to a fixed plant:',
      correctOrder: [
        'Every new worker adds more than the one before',
        'One worker adds exactly what the workforce averages',
        'Later hires each add less than the hire before',
        'The final worker adds almost nothing to total output',
      ],
      why: [
        'Early on there is plenty of plant per worker and tasks can be shared, so extra output per worker is still growing.',
        'At this point the extra output equals output per worker, which is where output per worker stops rising.',
        'The fixed plant is now spread thinner with every hire, so each one has less to work with than the last.',
        'Total output has nearly levelled off, and another hire adds cost without adding anything worth having.',
      ],
    }),
  };
})();

const productToCost = (() => {
  const sid = subId('product-to-cost');
  const peakRow = B.rows.find((r) => r.mp === Math.max(...B.rows.filter((x) => x.mp != null).map((x) => x.mp)));
  return {
    id: sid,
    title: 'From Product to Cost',
    keyIdea: `Marginal cost is the wage divided by marginal product and average variable cost the wage divided by average product, so the cost curves are the product curves upside down.`,
    body: [
      { type: 'paragraph', text: `The specification asks for the short-run cost curves to be **derived** from diminishing marginal productivity rather than drawn beside it. Here is how.` },
      { type: 'paragraph', text: `Each worker at ${B.name} costs ${money(B.wage)} ${B.per}. The cost of the extra ${B.units} a worker brings is that wage spread over however many that is: **MC = wage ÷ MP**. Spread over output per worker instead: **AVC = wage ÷ AP**.` },
      { type: 'paragraph', text: `Check the second worker, where marginal product peaks at ${qty(peakRow.mp)}: MC = ${money(B.wage)} ÷ ${qty(peakRow.mp)} = ${money(peakRow.mc)}, the **lowest** marginal cost in the table. Check the third, where average product peaks at ${B.at(15).ap}: AVC = ${money(B.wage)} ÷ ${B.at(15).ap} = ${money(B.at(15).avc)}, the **lowest** AVC.` },
      { type: 'bullets', items: [
        `**Marginal product and marginal cost** move opposite ways. MP highest ⇒ MC lowest; MP falling ⇒ MC rising.`,
        `**Average product and average cost** — the wage links AP to average VARIABLE cost, AVC = wage ÷ AP, so AVC turns where AP turns. Average TOTAL cost carries falling fixed cost too, so it turns later.`,
        `**Total product and total cost**: total cost is ${money(B.tfc)} plus ${money(B.wage)} a worker, rising in equal steps while total product rises in unequal ones. Where output climbs fast, cost per ${B.unit} is low.`,
      ] },
      { type: 'paragraph', text: `So the U-shaped cost curves are not a separate thing to memorise: they are the product curves seen from the cost side.` },
    ],
    realExample: { emoji: '🔁', text: `A delivery round done in an hour and a half costs half as much per parcel as the same round taking three. Nothing about the fuel or the wage changed — only how much got done.` },
    misconception: `Students explain rising marginal cost by saying inputs get dearer. Here the wage never changes: marginal cost rises because each worker adds fewer units to spread it over. Instead: attribute it to falling marginal product.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning and depth rather than breadth. The specification's chain is diminishing marginal productivity, then rising marginal cost, then the curve shapes.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each relationship the specification names to what it means:',
      pairs: [
        { left: 'Marginal product and marginal cost', right: `MC = wage ÷ MP` },
        { left: 'Average product and average cost', right: `AVC = wage ÷ AP` },
        { left: 'Total product and total cost', right: `TC = fixed cost + wage × workers` },
      ],
      why: [
        'The wage buys one worker and the worker brings the marginal product, so the cost of one more unit is the wage shared over those units.',
        'The same wage shared over output per worker gives variable cost per unit, which is why AVC turns where AP turns.',
        'Total cost climbs by the wage with every hire while total product climbs by whatever that hire adds, which is not the same each time.',
      ],
    }),
  };
})();

/* ══ Block 4 — The seven cost measures (3.3.2 · 2c) ═════════════════════════ */

const totalCosts = (() => {
  const sid = subId('total-costs');
  return {
    id: sid,
    title: 'Total, Fixed and Variable Cost',
    keyIdea: `Total cost is fixed cost plus variable cost; fixed cost does not change with output and variable cost does.`,
    body: [
      { type: 'paragraph', text: `Three totals, one formula: **TC = TFC + TVC**.` },
      { type: 'bullets', items: [
        `**Total fixed cost** does not change with output. ${B.name} pays ${money(B.tfc)} ${B.per} for its plant whether it makes ${qty(0)} ${B.units} or ${qty(B.at(20).q)}.`,
        `**Total variable cost** changes with output. Here it is the wage bill: ${money(B.wage)} a worker, so ${money(B.at(15).tvc)} for three workers.`,
        `**Total cost** is the two added: at ${qty(B.ref.q)} ${B.units}, ${money(B.tfc)} + ${money(B.ref.tvc)} = ${money(B.ref.tc)}.`,
      ] },
      { type: 'paragraph', text: `The word **fixed** means fixed with respect to **output**, not fixed forever and not unavoidable. A rent can rise; it is still a fixed cost, because it does not rise when the firm makes one more ${B.unit}.` },
      { type: 'paragraph', text: `And fixed costs exist only in the short run. In the long run every factor can change — the plant can be sold, not renewed or replaced by a bigger one — so in the long run **there are no fixed costs at all**. That distinction does more work in this topic than any other, and the last chapter turns on it.` },
    ],
    realExample: { emoji: '🏢', text: `A workshop's rent, insurance and the loan on its machinery arrive whether it runs one shift or three. Its materials and the wages of the shift arrive only if the shift runs. The first set is why closing for a week is not free.` },
    misconception: `Students call any large or unavoidable cost fixed. The test is not size and not whether it can be escaped: it is whether the cost changes when output changes. Instead: ask what happens to this cost if the firm makes one more unit, and classify on the answer.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation and advises showing workings. QS6 at International Advanced Level is to calculate cost, revenue and profit — marginal, average and totals — so all seven of this chapter's measures are examinable as arithmetic.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each cost ${B.name} pays into fixed or variable:`,
      groups: [
        { name: 'Fixed cost', items: ['The rent on the plant', 'Insurance for the year', 'Interest on the loan that bought the machinery'] },
        { name: 'Variable cost', items: ['The wage of a worker hired for the day', 'Bottles and caps', 'Electricity used running the line'] },
      ],
      why: [
        'None of these changes when one more crate is made, which is the only test that matters.',
        'Each of these arrives because a crate was made, and stops arriving if production stops.',
      ],
    }),
  };
})();

const averageCosts = (() => {
  const sid = subId('average-costs');
  return {
    id: sid,
    title: 'The Three Averages',
    keyIdea: `Average cost is total cost per unit, and it is average fixed cost plus average variable cost — a sum that holds at every level of output.`,
    body: [
      { type: 'paragraph', text: `Divide each total by output and three more measures appear. **AC = TC ÷ Q**, **AFC = TFC ÷ Q**, **AVC = TVC ÷ Q** — and because TC = TFC + TVC, it follows that **AC = AFC + AVC** at every output without exception.` },
      { type: 'paragraph', text: `**Average fixed cost falls at every level of output, always.** The numerator never changes and the denominator only grows: ${money(B.tfc)} over ${qty(4)} ${B.units} is ${money(B.at(4).afc)} each, over ${qty(20)} it is ${money(B.at(20).afc)}. It approaches zero and never arrives.` },
      { type: 'paragraph', text: `**Average variable cost falls, flattens and rises.** It is the wage divided by average product, so it turns where average product turns: lowest at ${money(B.minAvc)}, at ${qty(10)} and ${qty(15)} ${B.units}, then rising.` },
      { type: 'paragraph', text: `**Average cost is the two added together.** Early on the fall in AFC dominates and AC drops steeply, from ${money(B.at(4).ac)} to ${money(B.at(10).ac)}. Later the rise in AVC takes over and AC turns up. So AC reaches its lowest point — ${money(B.minAc)}, at ${qty(15)} and ${qty(18)} ${B.units} — **after** AVC reaches its own, and the gap between the two curves is average fixed cost, narrowing as output grows.` },
      { type: 'paragraph', text: `Check the arithmetic on any row: at ${qty(B.ref.q)} ${B.units}, ${money(B.ref.afc)} + ${money(B.ref.avc)} = ${money(B.ref.ac)}.` },
    ],
    realExample: { emoji: '🎭', text: `A theatre's staging cost is the same whether forty people come or four hundred, so cost per seat collapses as the hall fills. Once it is full, extra performances need extra crew and cost per seat climbs again.` },
    misconception: `Students draw average fixed cost as a curve that flattens out at some positive level, or turns up. It cannot turn up: a constant divided by a growing number falls forever. Instead: draw it falling towards the horizontal axis without ever touching it.`,
    examMatters: `Appendix 6 defines Draw as requiring a diagram, and a cost diagram with AC and AVC drawn as parallel curves is not a diagram of these measures: the vertical gap between them is average fixed cost, so it must narrow as output rises.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the three average measures, then check them on ${B.name} at ${qty(B.ref.q)} ${B.units}:`,
      template: [
        `Average cost = total cost ÷ ___`,
        `Average fixed cost always ___ as output rises`,
        `${money(B.ref.afc)} + ${money(B.ref.avc)} = ${'$'}___`,
      ],
      answers: ['quantity', 'falls', String(B.ref.ac)],
      hints: ['what every average in this chapter is divided by', 'the direction a constant divided by a growing number moves', 'average fixed cost plus average variable cost'],
      distractors: ['workers', 'rises', String(B.ref.avc)],
    }),
  };
})();

const marginalCost = (() => {
  const sid = subId('marginal-cost');
  const cut = B.at(18);
  return {
    id: sid,
    title: 'Marginal Cost and Where It Cuts',
    keyIdea: `Marginal cost is the cost of one more unit, and it passes through average variable cost and average cost at the lowest point of each.`,
    body: [
      { type: 'paragraph', text: `**Marginal cost** is the addition to total cost from one more ${B.unit}: **MC = ΔTC ÷ ΔQ**. Since fixed cost does not change, ${money(B.tfc)} of ${B.name}'s total cost has no effect on it at all.` },
      { type: 'paragraph', text: `Down ${B.name}'s table marginal cost runs ${money(B.at(4).mc)}, ${money(B.at(10).mc)}, ${money(B.at(15).mc)}, ${money(cut.mc)}, ${money(B.at(20).mc)}. It falls while marginal product is rising and climbs once diminishing returns set in — the mirror image, through the wage.` },
      { type: 'paragraph', text: `Now the property every cost diagram turns on. Between ${qty(B.ref.q)} and ${qty(cut.q)} ${B.units}, marginal cost is ${money(cut.mc)} — and average cost is ${money(B.ref.ac)} at ${qty(B.ref.q)} ${B.units} and ${money(cut.ac)} at ${qty(cut.q)}. Marginal cost has met average cost exactly where average cost is at its lowest, ${money(B.minAc)}.` },
      { type: 'paragraph', text: `The reason is the pulling argument from the product curves, unchanged. While the next ${B.unit} costs **less** than the current average, it pulls the average down. Once it costs **more**, it pulls the average up. So the average can only stop falling at the moment the two are equal.` },
      { type: 'paragraph', text: `It happens twice on one diagram: marginal cost cuts **average variable cost** at ${money(B.minAvc)}, its lowest point, and then cuts **average cost** at ${money(B.minAc)}, its lowest point — and AC's minimum is further right, because average fixed cost is still falling and holding AC down after AVC has turned.` },
    ],
    realExample: { emoji: '📚', text: `Adding a student to a class of twenty costs almost nothing and lowers cost per head. Adding one to a class of thirty-one means a second room and a second teacher, and cost per head jumps.` },
    misconception: `Students draw marginal cost crossing average cost part-way up its rising section, or crossing AVC and AC at the same output. Neither is possible. Instead: put each crossing at the lowest point of the curve it crosses, AVC's to the LEFT of AC's.`,
    examMatters: `Appendix 6 defines Draw as requiring a diagram. On a short-run cost diagram the two crossings are the markable features, in that order from left to right.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the rule that governs every marginal and average pair in this topic:',
      template: [
        'While the next unit costs LESS than the average, the average ___',
        'While the next unit costs MORE than the average, the average ___',
        'So marginal cost cuts average cost at average cost\'s ___ point',
      ],
      answers: ['falls', 'rises', 'lowest'],
      hints: ['what a below-average value does to an average', 'what an above-average value does to an average', 'the turning point of a U-shaped curve'],
      distractors: ['steadies', 'doubles', 'highest'],
    }),
  };
})();

/* ══ Block 5 — The long run, LRAC and MES (2d-4, 3a, 3b) ═══════════════════ */

const shortRunLongRun = (() => {
  const sid = subId('short-run-long-run');
  return {
    id: sid,
    title: 'Short Run and Long Run',
    keyIdea: `The short run is the period in which at least one factor is fixed; the long run is the period in which all factors can be varied, so there are no fixed costs.`,
    body: [
      { type: 'paragraph', text: `The two periods are not lengths of time. They are defined by **what can change**.` },
      { type: 'bullets', items: [
        `**Short run** — at least one factor is fixed. ${B.name} can hire and release workers; it cannot change the plant. Output is raised by working the existing plant harder, which is why diminishing returns bite.`,
        `**Long run** — every factor can be varied, including the plant. Output is raised by building the plant the output needs. Nothing is fixed, so **there are no fixed costs**.`,
      ] },
      { type: 'paragraph', text: `How long that is depends on the industry, not the calendar. For a firm renting a small unit the long run may be a month; for one building a refinery, a decade.` },
      { type: 'paragraph', text: `The consequence for costs is the one the specification names at 2d. Every short-run average cost curve belongs to **one plant size**, and the long-run curve is the lower edge of all of them: for each output, the cost of making it in the plant best suited to it.` },
      { type: 'paragraph', text: `So the long-run curve can never lie **above** a short-run one: the firm can always keep the plant it has, so the short run is one of its options.` },
    ],
    realExample: { emoji: '🏗️', text: `A bakery doubling output this month adds a night shift to the ovens it owns; one doubling output over three years installs more ovens. The second is cheaper per loaf, and the first is the only one available today.` },
    misconception: `Students give the short run a fixed length — six months, a year — and apply it to every firm. The definition is about the fixed factor, so it differs by industry. Instead: say which factor is fixed and for how long.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain. "Long run" alone is not a stage: the marks are for saying that all factors can be varied and therefore that the plant itself is a choice.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement into the period it describes:',
      groups: [
        { name: 'Short run', items: ['At least one factor cannot be changed', 'Diminishing returns apply', 'Fixed costs are owed whatever the output'] },
        { name: 'Long run', items: ['Every factor including the plant can be varied', 'Economies of scale apply', 'There are no fixed costs'] },
      ],
      why: [
        'The fixed factor is the definition, and everything else here follows from it: more of a variable factor on a fixed one, and a cost that does not move with output.',
        'With the plant itself a choice, cost per unit depends on the scale the firm builds for, and nothing is owed regardless of output.',
      ],
    }),
  };
})();

const lracAndMes = (() => {
  const sid = subId('lrac-and-mes');
  return {
    id: sid,
    title: 'LRAC and Minimum Efficient Scale',
    keyIdea: `Long-run average cost falls where there are economies of scale and rises where there are diseconomies; minimum efficient scale is the lowest output at which it reaches its minimum.`,
    body: [
      { type: 'paragraph', text: `The long-run average cost curve has three stretches, two of them named by what causes them.` },
      { type: 'bullets', items: [
        `**Falling** — economies of scale. Cost per ${B.unit} drops as the firm builds bigger: at ${B.name}, from ${money(L.lrac(10))} at ${qty(10)} ${B.units} ${B.per} to ${money(L.floor)} at ${qty(L.mes)}.`,
        `**At its minimum** — the curve reaches ${money(L.floor)} and holds it from ${qty(L.mes)} to ${qty(L.flatTo)} ${B.units}.`,
        `**Rising** — diseconomies of scale. Beyond ${qty(L.flatTo)} ${B.units} cost per ${B.unit} climbs again, to ${money(L.lrac(90))} at ${qty(90)}.`,
      ] },
      { type: 'paragraph', text: `**Minimum efficient scale** is the **lowest** output at which long-run average cost reaches its minimum: ${qty(L.mes)} ${B.units} ${B.per} here, not ${qty(L.flatTo)}, although cost per ${B.unit} is the same there. It is the smallest the firm can be and still have all its economies of scale.` },
      { type: 'paragraph', text: `That is why it matters: it says how big a firm must be to compete on cost. Where it is small relative to the market many firms reach it; where it is large, few can.` },
      { type: 'paragraph', text: `And note what is **not** happening here. Along the long-run curve nothing is fixed at all, so the rising stretch is not diminishing returns arriving.` },
    ],
    realExample: { emoji: '⚙️', text: `Cement, steel and glass are made in very large plants because cost per tonne falls to a scale most firms cannot reach. A sandwich shop reaches its own minimum efficient scale with one kitchen, which is why there are so many.` },
    misconception: `Students read minimum efficient scale as the output where the firm is at its most profitable, or as the whole flat stretch. It is neither: it is the lowest output at which average cost reaches its minimum. Instead: find the minimum cost, then read off the FIRST output that achieves it.`,
    examMatters: `Appendix 6 defines Define (2 marks) as giving the meaning of a term. For minimum efficient scale, both marks are in the wording: the lowest output, and at which long-run average cost is at its minimum.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four stages of a long-run average cost curve into the sequence a growing firm meets:',
      correctOrder: [
        'Unit cost falls steeply as the firm builds bigger',
        'The lowest attainable cost per unit is reached',
        'That level holds over a range of outputs',
        'Costs per unit climb as the firm becomes harder to run',
      ],
      why: [
        'This is the economies-of-scale stretch, where each increase in scale spreads a cost over more units.',
        'The first output at which the minimum is reached is what minimum efficient scale names.',
        'Nothing further is gained from size here, and nothing is yet lost to it.',
        'Diseconomies of scale: the firm has grown past the point where its own organisation keeps up.',
      ],
    }),
  };
})();

/* ══ Block 6 — Economies and diseconomies of scale (3c, 3d, 3e, 3f) ════════ */

const internalOrExternal = (() => {
  const sid = subId('internal-or-external');
  return {
    id: sid,
    title: 'Internal or External?',
    keyIdea: `An internal economy of scale comes from this firm growing; an external one comes from the industry around it growing.`,
    body: [
      { type: 'paragraph', text: `An **economy of scale** is a fall in long-run average cost that comes from producing on a larger scale. The specification's first requirement here is the distinction between two kinds, and it turns on one question: **whose growth caused the saving?**` },
      { type: 'bullets', items: [
        `**Internal** — the saving comes from **this firm** growing. It arrives whether or not anything else in the industry changes, and it goes with the firm wherever it moves.`,
        `**External** — the saving comes from **the industry** growing, usually in one place. A firm that has not grown at all can gain one; a firm that leaves the area loses it however large it is.`,
      ] },
      { type: 'paragraph', text: `The test is quick. Ask whether the firm would still have the saving if it stayed exactly the size it is. If yes, it is external. Ask whether it would still have it if every other firm in the industry disappeared. If yes, it is internal.` },
      { type: 'paragraph', text: `The distinction matters because the two are not equally reliable. An internal economy is the firm's own: it earned it and it keeps it. An external one belongs to a place and a moment, and can be lost to a road closing, a training college shutting or the other firms leaving — none of which the firm controls.` },
    ],
    realExample: { emoji: '🧵', text: `A textile firm that installs a bigger loom has lowered its own cost per metre. A textile firm in a town where a new technical college starts training weavers has also lowered its cost per metre, and did nothing to cause it.` },
    misconception: `Students classify by size — big firm, internal; small firm, external. Size is not the test: a small firm in a strong industrial district enjoys external economies, and a large isolated firm enjoys none. Instead: ask whose growth produced the saving.`,
    examMatters: `Appendix 6 defines Explain as requiring a two-stage chain. Naming an economy of scale is not a stage: the two are what the firm does differently at a larger scale, and why that lowers cost per unit.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each saving by whose growth caused it:',
      groups: [
        { name: 'Internal economy of scale', items: ['A bigger machine that only pays at high output', 'A lower rate of interest on a larger loan', 'A full-time specialist the firm can now justify'] },
        { name: 'External economy of scale', items: ['A college nearby now trains workers for this industry', 'A new rail head serves the industrial district', 'Firms in the district share research findings'] },
      ],
      why: [
        'Each of these arrives because THIS firm is larger, and the firm keeps it wherever it goes.',
        'Each of these arrives because the industry around the firm has grown, and a firm that has not grown at all can gain it.',
      ],
    }),
  };
})();

const internalSources = (() => {
  const sid = subId('internal-sources');
  return {
    id: sid,
    title: 'Six Sources of Internal Economies',
    keyIdea: `The specification names six: financial, technical, managerial, marketing, purchasing and risk bearing.`,
    body: [
      { type: 'paragraph', text: `Six, and the list is closed. Each is a cost that does not grow in step with output — it is paid once, borrowed once or hired once, and then spread.` },
      { type: 'bullets', items: INTERNAL_SOURCES.map(([name, , long]) => `**${name}** — ${long}.`) },
      { type: 'paragraph', text: `Learn them as six, with the mechanism attached to each. A question asking for two wants two named sources and what each does to cost per unit; naming four without explaining any is worth less.` },
      { type: 'paragraph', text: `Notice what they share. In every case the cost is **lumpy** — a loan, a machine, a manager, a campaign, an order, a product range — and a cost that rises exactly in step with output produces no economy of scale at all.` },
    ],
    realExample: { emoji: '🏭', text: `A drinks firm opening a second line buys its bottles on one larger contract, runs one campaign across both lines and borrows against a bigger balance sheet. Three of the six, from one decision.` },
    misconception: `Students list sources without a mechanism — "technical economies of scale, so costs fall". The name is not the explanation. Instead: say what the firm does differently at a larger scale and why that lowers cost PER UNIT rather than in total.`,
    examMatters: `Appendix 6 defines Explain (4 marks) as requiring knowledge, understanding and application with a two-stage chain. Four marks is two sources, each taken as far as its effect on cost per unit.`,
    recall: recall(sid, {
      type: 'match',
      /*
       * FIVE OF THE SIX, AND THE PROMPT SAYS SO. `recall.count` allows a match no more than five
       * pairs, and a six-item list therefore cannot be drilled whole — so the prompt names the
       * shortfall rather than letting a student count five against a chapter that says six twice.
       * The one left out is FINANCIAL, which is the most self-evident of the six; risk bearing stays
       * in, because it is the one an answer most often omits.
       */
      prompt: 'Match five of the six internal economies of scale to what produces each:',
      pairs: INTERNAL_SOURCES.slice(1).map(([name, short]) => ({ left: name, right: short })),
      why: INTERNAL_SOURCES.slice(1).map(([, , long]) => `${long.charAt(0).toUpperCase()}${long.slice(1)}.`),
    }),
  };
})();

const externalSources = (() => {
  const sid = subId('external-sources');
  return {
    id: sid,
    title: 'Three Sources of External Economies',
    keyIdea: `The specification names three: the availability of skilled labour, access to transport links, and shared knowledge.`,
    body: [
      { type: 'paragraph', text: `Three, and each belongs to a **place** rather than to a firm. They appear where an industry concentrates.` },
      { type: 'bullets', items: EXTERNAL_SOURCES.map(([name, , long]) => `**${name}** — ${long}.`) },
      { type: 'paragraph', text: `They arrive together, which is why industries cluster and then keep clustering: the firms attract the workers, the workers attract more firms, and the transport and the training follow the demand. A firm arriving late gains all three on its first day.` },
      { type: 'paragraph', text: `And they can be lost without the firm doing anything. If the industry contracts, the trained workers move away, the freight service is cut and the shared research base closes — so a firm's cost per unit can rise while its own output, its own plant and its own management are exactly as they were.` },
    ],
    realExample: { emoji: '🗺️', text: `Where an industry has concentrated for decades, a new entrant finds experienced workers already in the area, suppliers already delivering daily and a technical college already teaching the right skills. None of that is anything the entrant built.` },
    misconception: `Students treat external economies as a firm being lucky, with no mechanism. Each one is a real cost that falls: less spent on training, less on freight, less on research. Instead: name the cost line the external economy reduces.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning and depth rather than breadth. A chain about external economies has to reach the firm's own average cost, since that is what an economy of scale is defined as lowering.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the three sources of external economies of scale the specification names:',
      template: [
        'Availability of ___ labour',
        'Access to ___ links',
        '___ knowledge',
      ],
      answers: ['skilled', 'transport', 'Sharing'],
      hints: ['the kind of worker an established industry leaves behind it', 'what a port, a rail head or a trunk road provide', 'what firms in one place do with what they learn'],
      distractors: ['cheap', 'supply', 'Hiding'],
    }),
  };
})();

const diseconomies = (() => {
  const sid = subId('diseconomies');
  return {
    id: sid,
    title: 'Three Sources of Diseconomies',
    keyIdea: `The specification names three sources of diseconomies of scale: communication problems, coordination problems and X-inefficiency.`,
    body: [
      { type: 'paragraph', text: `A **diseconomy of scale** is a rise in long-run average cost that comes from producing on a larger scale. The specification names three sources, and all three are about the firm becoming harder to run rather than about anything it buys getting dearer.` },
      { type: 'bullets', items: DISECONOMY_SOURCES.map(([name, , long]) => `**${name}** — ${long}.`) },
      { type: 'paragraph', text: `**X-inefficiency** is worth pausing on: costs drifting above the lowest level the firm could attain, not because anybody decided to waste anything but because in a large organisation nothing in particular forces them down.` },
      { type: 'paragraph', text: `Now the distinction students most often lose. **Diminishing returns** are a **short-run** effect: one factor is fixed and the variable factor is spread thinner. **Diseconomies of scale** are a **long-run** effect: nothing is fixed, the firm has built bigger, and the organisation itself is the problem.` },
      { type: 'paragraph', text: `They look alike on a diagram and share nothing underneath. If a question names a fixed factor it is the short run; if the firm has grown, it is the long run.` },
    ],
    realExample: { emoji: '📨', text: `In a firm of ten, a problem reaches the person who can fix it the same morning. In a firm of ten thousand it crosses four departments first, arrives changed, and by then two of them have solved it separately and differently.` },
    misconception: `Students explain diseconomies by saying workers become less productive as the firm grows, which is the diminishing-returns argument in the wrong period. Instead: name communication, coordination or costs drifting above the attainable minimum.`,
    examMatters: `Appendix 6 defines Discuss as requiring a critical assessment with different viewpoints. Whether a firm should keep growing needs both sides of this curve, and which effect dominates over what range of output.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each description into the effect it belongs to:',
      groups: [
        { name: 'Diminishing returns', items: ['A short-run effect', 'At least one factor is fixed', 'More workers share the same plant'] },
        { name: 'Diseconomies of scale', items: ['A long-run effect', 'Every factor including the plant has grown', 'Messages cross more people and arrive changed'] },
      ],
      why: [
        'The fixed factor is the cause, so this can only happen in the period where something cannot be changed.',
        'Nothing is fixed here: the firm has built bigger and its own organisation is what pushes cost per unit up.',
      ],
    }),
  };
})();

/* ══ Block 7 — Profits, losses and the shutdown points (4a, 4b) ════════════ */

const profitTypes = (() => {
  const sid = subId('profit-types');
  return {
    id: sid,
    title: 'Normal Profit, Supernormal Profit and Losses',
    keyIdea: `Normal profit is where total revenue exactly covers total cost; above that is supernormal profit and below it is a loss.`,
    body: [
      { type: 'paragraph', text: `Three outcomes, one comparison: **total revenue against total cost**, or equivalently **average revenue against average cost**.` },
      { type: 'bullets', items: [
        `**Normal profit** — TR = TC, so AR = AC. The firm covers everything, including what its owners could have earned elsewhere — the **opportunity cost** of staying in this business. That last part is why it counts as a profit at all.`,
        `**Supernormal profit** — TR > TC, so AR > AC: a return over and above what was needed to keep the firm in this line of business.`,
        `**Losses** — TR < TC, so AR < AC. Not enough to cover everything.`,
      ] },
      { type: 'paragraph', text: `${B.name} makes ${qty(B.ref.q)} ${B.units} ${B.per} at a total cost of ${money(B.ref.tc)}, so average cost is ${money(B.ref.ac)}. Read three prices against it:` },
      { type: 'bullets', items: [
        `At ${money(B.supernormal.price)} a ${B.unit}: revenue ${money(B.supernormal.revenue)}, cost ${money(B.ref.tc)}, **supernormal profit of ${money(B.supernormal.profit)}**.`,
        `At ${money(B.normal.price)}: revenue ${money(B.normal.revenue)} against cost ${money(B.ref.tc)} — exactly equal, so **normal profit**.`,
        `At ${money(B.shortRunLoss.price)}: revenue ${money(B.shortRunLoss.revenue)} against cost ${money(B.ref.tc)}, a **loss of ${money(Math.abs(B.shortRunLoss.profit))}**.`,
      ] },
      { type: 'paragraph', text: `Notice that normal profit shows as **zero** on the middle line. It is not zero reward — the reward is already inside the cost figure, and that is the hardest idea in this chapter.` },
    ],
    realExample: { emoji: '⚖️', text: `Someone who leaves a salaried job to run a workshop has to earn that salary back before the workshop is worth running. One earning exactly that is doing fine, and earning no supernormal profit.` },
    misconception: `Students read normal profit as the firm making no profit and conclude it will close. It covers every cost including what the owners could earn elsewhere, so there is no better use of their money. Instead: say it is the minimum return needed to keep the firm in this line of business.`,
    examMatters: `Appendix 6 defines Define (2 marks) as giving the meaning of a term. For normal profit the two marks are the equality and what that cost includes — the opportunity cost of the owners' money and effort, which is the part most answers leave out.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each comparison to what the firm is earning:',
      pairs: [
        { left: 'AR above AC', right: 'supernormal profit' },
        { left: 'AR equal to AC', right: 'normal profit' },
        { left: 'AR below AC', right: 'a loss' },
      ],
      why: [
        'Every unit brings in more than it costs, so there is a return over and above what was needed to keep the firm here.',
        'Revenue covers cost exactly, and that cost already includes what the owners could have earned elsewhere.',
        'Revenue does not cover cost, and the next chapter decides whether the firm should still be producing.',
      ],
    }),
  };
})();

const shortRunShutdown = (() => {
  const sid = subId('short-run-shutdown');
  const s = B.shortRunLoss, d = B.shutdown;
  return {
    id: sid,
    title: 'The Short-Run Shutdown Point',
    keyIdea: `In the short run a firm keeps producing while price covers average variable cost, because the fixed cost is owed whether it produces or not.`,
    body: [
      { type: 'paragraph', text: `A loss-making firm has a decision, and it is not the obvious one. In the short run the fixed cost is owed **either way**: ${B.name} pays ${money(B.tfc)} ${B.per} for its plant even with the line switched off.` },
      { type: 'paragraph', text: `So the comparison is not "am I making a loss?" but **"which loss is smaller?"**. Shutting down costs the fixed cost, ${money(B.tfc)}. Producing costs whatever the loss turns out to be.` },
      { type: 'paragraph', text: `**At ${money(s.price)} a ${B.unit}.** Revenue ${money(s.revenue)}, total cost ${money(B.ref.tc)}, a loss of ${money(Math.abs(s.profit))}. That is worse than nothing and **better than ${money(B.tfc)}**. Each ${B.unit} covers its own variable cost of ${money(B.ref.avc)} and leaves ${money(s.price - B.ref.avc)} towards the fixed cost — ${money(s.contribution)} in all. So the firm keeps producing.` },
      { type: 'paragraph', text: `**At ${money(d.price)} a ${B.unit}.** Revenue ${money(d.revenue)}, a loss of ${money(Math.abs(d.profit))} — **worse than the ${money(B.tfc)}** of shutting down. Each ${B.unit} now fails to cover even its own variable cost, so every one made adds to the loss. The firm shuts down.` },
      { type: 'paragraph', text: `**The short-run shutdown point is where price equals average variable cost**, ${money(B.ref.avc)} here. Above it, producing contributes something towards the fixed cost. Below it, producing makes matters worse.` },
    ],
    realExample: { emoji: '🏨', text: `A seaside hotel that opens through a quiet winter at rates well below its yearly running cost is not being foolish. The building is paid for either way, and winter guests cover the heating and the staff with something over.` },
    misconception: `Students say a firm making a loss should shut down immediately. In the short run that costs the whole fixed cost, which is often the larger loss. Instead: compare the loss from producing with the fixed cost, and shut down only when price is below average variable cost.`,
    examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning and depth rather than breadth. The chain is the fixed cost being owed either way, then the contribution each unit makes, then the comparison of two losses.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four steps of the short-run shutdown decision into the order in which a firm works through them:',
      correctOrder: [
        'Note that the fixed cost is owed whether or not anything is produced',
        'Ask whether the price covers variable cost per unit',
        'Work out what each unit leaves towards the fixed cost',
        'Compare the loss from producing with the loss from stopping',
      ],
      why: [
        'This is what makes stopping expensive rather than free, and it is the step most answers skip.',
        'Variable cost per unit is the only cost that responds to the decision, so it is the only one the price has to beat.',
        'Whatever is left over after variable cost is what producing contributes, and it is the reason to keep going.',
        'The decision is between two losses rather than between a loss and nothing, and the smaller one wins.',
      ],
    }),
  };
})();

const longRunShutdown = (() => {
  const sid = subId('long-run-shutdown');
  return {
    id: sid,
    title: 'The Long-Run Shutdown Point',
    keyIdea: `In the long run there are no fixed costs, so a firm leaves the industry when price is below average cost.`,
    body: [
      { type: 'paragraph', text: `In the long run **every** factor can be varied, so the plant is no longer owed: the lease ends, the machinery can be sold, nothing is renewed. There are **no fixed costs**.` },
      { type: 'paragraph', text: `That removes the reason for producing at a loss: with nothing owed regardless, there is no fixed cost to contribute towards. The comparison becomes revenue against **total** cost.` },
      { type: 'paragraph', text: `**The long-run shutdown point is where price equals average cost** — ${money(B.ref.ac)} for ${B.name}. Below that the firm leaves the industry.` },
      { type: 'flow', steps: [
        { title: 'Price above average cost', subtitle: 'supernormal profit: the firm stays and would expand' },
        { title: 'Price equal to average cost', subtitle: 'normal profit: covering everything, including what the owners could earn elsewhere' },
        { title: 'Price between average variable cost and average cost', subtitle: 'short run, keep producing; long run, leave' },
        { title: 'Price below average variable cost', subtitle: 'shut down at once, in either period' },
      ], result: `Two rules, two periods: short run, produce while price covers ${money(B.ref.avc)}; long run, stay while price covers ${money(B.ref.ac)}`, resultType: 'good' },
      { type: 'paragraph', text: `Row three is the same firm at the same price being told two different things, and both are right: the rules answer whether to run the plant this month, and whether to be in this industry at all.` },
    ],
    realExample: { emoji: '🚪', text: `A workshop covering its wages and materials but not the lease will keep working to the end of the lease and then not renew it. Nothing changed about the workshop on the day it closed except which costs were still owed.` },
    misconception: `Students apply the average variable cost rule to the long run and conclude a firm covering its variable costs never leaves. In the long run there are no fixed costs, so the test is average cost. Instead: name the period first, then choose the rule that belongs to it.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a judgement and different viewpoints. Whether a loss-making firm should close usually turns on how long the fixed commitment has left to run — a matter of period rather than arithmetic.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the two shutdown rules and the reason they differ:',
      template: [
        `In the SHORT run, shut down if price is below average ___ cost`,
        `In the LONG run, leave if price is below average ___ cost`,
        `They differ because in the long run there are no ___ costs`,
      ],
      answers: ['variable', 'total', 'fixed'],
      hints: ['the only cost that responds to the decision in the short run', 'everything the firm pays, per unit', 'what disappears once every factor can be varied'],
      distractors: ['marginal', 'external', 'average'],
    }),
  };
})();

/* ══ The blocks ═══════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [totalRevenue, averageRevenue, marginalRevenue], takeaway: [
    'TR = P × Q. AR = TR ÷ Q, which is always the price. MR = the change in TR from one more unit.',
    'A firm\'s demand curve IS its average revenue curve — one line with two names.',
    `Where the price must fall to sell more, MR = a ${'−'} 2bQ — twice AR's gradient, zero at peak TR.`,
  ] },
  { title: B2, subs: [pedAndRevenue, calculatingPed], takeaway: [
    `Elastic (below ${elasticity(-1)}): a price cut RAISES total revenue and MR is positive.`,
    `Inelastic (between ${elasticity(-1)} and zero): a price cut LOWERS total revenue and MR is negative.`,
    'PED = %ΔQ ÷ %ΔP, each measured against its starting value.',
    'Elasticity is a property of a POINT on a demand curve, not of a good.',
  ] },
  { title: B3, subs: [diminishingReturns, productCurves, productToCost], takeaway: [
    'Short run: one factor fixed, so a variable factor eventually adds LESS extra output.',
    'Marginal product cuts average product at average product\'s HIGHEST point.',
    'MC = wage ÷ MP and AVC = wage ÷ AP: the cost curves are the product curves from the cost side.',
  ] },
  { title: B4, subs: [totalCosts, averageCosts, marginalCost], takeaway: [
    'TC = TFC + TVC, and dividing each by output gives AC = AFC + AVC at every level of output.',
    'Average fixed cost falls forever and never reaches zero.',
    'The gap between AC and AVC IS average fixed cost, so it narrows as output grows.',
    `MC cuts AVC at ${money(B.minAvc)} and AC at ${money(B.minAc)}, each at its lowest point, AVC's first.`,
  ] },
  { title: B5, subs: [shortRunLongRun, lracAndMes], takeaway: [
    'The two periods are defined by WHAT CAN CHANGE, not by a length of time.',
    'In the long run every factor can be varied, so there are no fixed costs.',
    'LRAC is the lower edge of every short-run curve, so it can never lie above one.',
    `Minimum efficient scale is the LOWEST output reaching the LRAC minimum: ${qty(L.mes)}, not ${qty(L.flatTo)}.`,
  ] },
  { title: B6, subs: [internalOrExternal, internalSources, externalSources, diseconomies], takeaway: [
    'Internal economies come from THIS firm growing; external ones from the INDUSTRY around it.',
    'Six internal: financial, technical, managerial, marketing, purchasing, risk bearing.',
    'Three external: skilled labour, transport links, shared knowledge.',
    'Three diseconomies: communication, coordination, X-inefficiency — all LONG run.',
  ] },
  { title: B7, subs: [profitTypes, shortRunShutdown, longRunShutdown], takeaway: [
    'Normal profit: AR = AC, the cost already including what the owners could earn elsewhere.',
    `Short run: shut down below average variable cost (${money(B.ref.avc)}). The fixed ${money(B.tfc)} is owed either way.`,
    `Long run: leave below average cost (${money(B.ref.ac)}) — there are no fixed costs left to cover.`,
  ] },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

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
 * `structure-05` is that the March notes and the March Learn Mode content taught different sections:
 * eight note headings including "Long-Run Cost Curves", which did cover economies of scale, and
 * "Alternative Objectives on a Diagram", which is 3.3.1 · 3 and belongs to `types-sizes-businesses`.
 * The notes below are one per chapter, in the same order, carrying the same figures from the same
 * module — so the two surfaces cannot drift apart without the build failing.
 *
 * AND A WARNING FOR VERIFY B: notes are a FREE surface and ship in the server-rendered page from the
 * `data` column, so a `?draft=1` walk shows THESE notes only after publication. Until then the page
 * shows the March headings beside this packet's Learn Mode (DECISIONS, 16 September). Verify the notes
 * against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3 leaves',
    keyIdea: 'The three revenue measures and the relationship between them.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Total revenue</strong> — TR = P × Q. Everything received from selling, before any cost.'),
        def('<strong>Average revenue</strong> — AR = TR ÷ Q, which always equals the price. The demand curve IS the AR curve.'),
        def('<strong>Marginal revenue</strong> — MR = ΔTR ÷ ΔQ: the change in total revenue from selling one more unit.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Where the price does not change with output: AR = MR = P, all three a horizontal line.`),
        mech(`Where the price must fall to sell more: MR lies below AR, because the lower price applies to every unit already being sold.`),
        mech(`On a straight-line demand curve AR = a ${'−'} bQ and MR = a ${'−'} 2bQ — twice the gradient. For ${N.name}, AR = ${N.a} ${'−'} ${N.b}Q and MR = ${N.a} ${'−'} ${N.b * 2}Q.`),
        link(`MR = ${money(0)} at ${qty(N.trMaxQ)} ${N.units}, where TR is greatest at ${money(N.trMax)}. Beyond it MR is negative and selling more takes TR down.`),
      ] },
    ],
    takeaway: [
      'AR is the price. The demand curve and the AR curve are one line.',
      'MR falls twice as fast as AR and is zero where TR peaks.',
      'Revenue is the top line: no cost has been taken off it.',
    ],
  },
  {
    title: B2,
    meta: '1 leaf',
    keyIdea: 'Price elasticity of demand and its relationship to the revenue measures, including calculations.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Price elasticity of demand</strong> — PED = %ΔQ ÷ %ΔP, each percentage measured against the value it started from. Always negative.'),
        def(`<strong>Elastic</strong> — below ${elasticity(-1)}. <strong>Unit elastic</strong> — ${elasticity(-1)}. <strong>Inelastic</strong> — between ${elasticity(-1)} and zero.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Elastic: a price cut RAISES total revenue, and marginal revenue is positive.'),
        mech('Unit elastic: total revenue does not move, and marginal revenue is zero. This is where TR is at its greatest.'),
        mech('Inelastic: a price cut LOWERS total revenue, and marginal revenue is negative.'),
        mech(`Worked, on one demand line: ${money(N.elastic.p0)} → ${money(N.elastic.p1)} gives PED ${elasticity(N.elastic.ped)} and TR ${money(N.elastic.tr0)} → ${money(N.elastic.tr1)}. ${money(N.inelastic.p0)} → ${money(N.inelastic.p1)} gives PED ${elasticity(N.inelastic.ped)} and TR ${money(N.inelastic.tr0)} → ${money(N.inelastic.tr1)}.`),
        link('Elasticity is a property of a POINT, not of a good: the same line is elastic at the top and inelastic at the bottom.'),
      ] },
    ],
    takeaway: [
      'PED and the sign of MR are the same fact about the next unit sold.',
      'Measure each percentage change against the value it started from.',
      'The number is not the answer; the revenue effect is.',
    ],
  },
  {
    title: B3,
    meta: '5 leaves',
    keyIdea: 'Diminishing marginal productivity, and how the short-run cost curves are derived from it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Law of diminishing returns</strong> — as more of a variable factor is added to a fixed factor, the extra output from each additional unit eventually falls. Also called diminishing marginal productivity.'),
        def('<strong>Marginal product</strong> — MP = ΔTP ÷ ΔL. <strong>Average product</strong> — AP = TP ÷ L.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${B.name}: total product ${B.rows.map((r) => qty(r.q)).join(', ')} ${B.units} for ${B.rows.length - 1} workers. Marginal product rises to ${Math.max(...B.rows.filter((r) => r.mp != null).map((r) => r.mp))} then falls; average product peaks at ${B.at(15).ap}.`),
        mech('Marginal product cuts average product at average product\'s HIGHEST point: a value above an average pulls it up, a value below pulls it down, a value equal leaves it alone.'),
        mech(`MC = wage ÷ MP and AVC = wage ÷ AP, so MC is lowest where MP is highest (${money(B.at(10).mc)}) and AVC is lowest where AP is highest (${money(B.minAvc)}).`),
        mech(`TC = ${money(B.tfc)} + ${money(B.wage)} × workers: total cost climbs in equal steps while total product climbs in unequal ones.`),
        link('The U-shaped cost curves are not separate: they are the product curves seen from the cost side.'),
      ] },
    ],
    takeaway: [
      'It is the EXTRA output that falls, not total output.',
      'The fixed factor being spread thinner is the whole mechanism.',
      'Rising marginal cost comes from falling marginal product, not from a rising wage.',
    ],
  },
  {
    title: B4,
    meta: '7 leaves',
    keyIdea: 'The seven cost measures and how each relates to the others.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>TC = TFC + TVC</strong>. Fixed cost does not change with output; variable cost does.'),
        def('<strong>AC = TC ÷ Q</strong>, <strong>AFC = TFC ÷ Q</strong>, <strong>AVC = TVC ÷ Q</strong>, and therefore <strong>AC = AFC + AVC</strong>.'),
        def('<strong>MC = ΔTC ÷ ΔQ</strong> — the cost of one more unit. Fixed cost does not affect it at all.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${B.name} at ${qty(B.ref.q)} ${B.units}: TFC ${money(B.tfc)}, TVC ${money(B.ref.tvc)}, TC ${money(B.ref.tc)}; AFC ${money(B.ref.afc)}, AVC ${money(B.ref.avc)}, AC ${money(B.ref.ac)}. ${money(B.ref.afc)} + ${money(B.ref.avc)} = ${money(B.ref.ac)}.`),
        mech(`Average fixed cost falls at every output and never reaches zero: ${money(B.at(4).afc)} at ${qty(4)} ${B.units}, ${money(B.at(20).afc)} at ${qty(20)}.`),
        mech(`MC cuts AVC at its lowest point ${money(B.minAvc)} and AC at its lowest point ${money(B.minAc)} — AC's minimum lying further right because AFC is still falling and holding AC down.`),
        link('The vertical gap between AC and AVC is average fixed cost, so the two curves converge and are never parallel.'),
      ] },
    ],
    takeaway: [
      'Fixed means fixed with respect to OUTPUT, not unavoidable and not large.',
      'AC = AFC + AVC holds at every single level of output.',
      'Marginal cuts average at the turning point, because of what an average is.',
    ],
  },
  {
    title: B5,
    meta: '3 leaves',
    keyIdea: 'The relationship between short-run and long-run costs, the LRAC curve, and minimum efficient scale.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Short run</strong> — at least one factor is fixed. <strong>Long run</strong> — every factor can be varied, so there are no fixed costs.'),
        def('<strong>Minimum efficient scale</strong> — the LOWEST output at which long-run average cost is at its minimum.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Each short-run average cost curve belongs to one plant size; LRAC is the lower edge of all of them, so LRAC can never lie above a short-run curve.'),
        mech(`${B.name}'s LRAC falls from ${money(L.lrac(10))} at ${qty(10)} ${B.units} to ${money(L.floor)} at ${qty(L.mes)}, holds ${money(L.floor)} to ${qty(L.flatTo)}, then rises to ${money(L.lrac(90))} at ${qty(90)}.`),
        mech(`Falling = economies of scale; rising = diseconomies of scale (3a). Minimum efficient scale is ${qty(L.mes)} ${B.units} ${B.per} — the FIRST output achieving the minimum, not the last.`),
        link('Minimum efficient scale relative to the size of the market decides how many firms can compete on cost.'),
      ] },
    ],
    takeaway: [
      'The two periods are about what can change, not about how long.',
      'LRAC is an envelope: the firm can always keep the plant it has.',
      'Minimum efficient scale is the LOWEST such output.',
    ],
  },
  {
    title: B6,
    meta: '13 leaves',
    keyIdea: 'Internal and external economies of scale, their sources, and the sources of diseconomies.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Internal economy of scale</strong> — a fall in long-run average cost caused by THIS firm growing.'),
        def('<strong>External economy of scale</strong> — a fall in long-run average cost caused by the INDUSTRY around the firm growing.'),
        def('<strong>Diseconomy of scale</strong> — a rise in long-run average cost caused by producing on a larger scale.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Six internal sources: ${INTERNAL_SOURCES.map(([n]) => n.toLowerCase()).join(', ')}.`),
        mech(`Three external sources: ${EXTERNAL_SOURCES.map(([n]) => n.toLowerCase()).join('; ')}.`),
        mech(`Three sources of diseconomies: communication problems, coordination problems, X-inefficiency.`),
        mech('Every internal economy is a LUMPY cost — a loan, a machine, a manager, a campaign, an order, a product range — paid once and then spread. A cost that rises in step with output produces none.'),
        link('Diseconomies of scale are LONG run and come from the firm being hard to run. Diminishing returns are SHORT run and come from a factor being fixed. They look the same on a diagram and share nothing underneath.'),
      ] },
    ],
    takeaway: [
      'Ask whose growth caused the saving: the firm\'s, or the industry\'s.',
      'Name the source AND the mechanism; the name alone is not an explanation.',
      'X-inefficiency is the third source of diseconomies, and it belongs to 3.3.2.',
    ],
  },
  {
    title: B7,
    meta: '2 leaves',
    keyIdea: 'Normal profit, supernormal profit and losses, and the two shutdown points.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Normal profit</strong> — TR = TC, so AR = AC. The minimum return needed to keep the firm in this line of business; it shows as zero profit because the return is already inside the cost.'),
        def('<strong>Supernormal profit</strong> — TR > TC, so AR > AC: anything above normal profit.'),
        def('<strong>Losses</strong> — TR < TC, so AR < AC.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${B.name} at ${qty(B.ref.q)} ${B.units}, TC ${money(B.ref.tc)}: at ${money(B.supernormal.price)} a ${B.unit}, ${money(B.supernormal.profit)} supernormal profit; at ${money(B.normal.price)}, normal profit; at ${money(B.shortRunLoss.price)}, a loss of ${money(Math.abs(B.shortRunLoss.profit))}; at ${money(B.shutdown.price)}, a loss of ${money(Math.abs(B.shutdown.profit))}.`),
        mech(`SHORT-RUN shutdown point: price below average variable cost (${money(B.ref.avc)}). The fixed ${money(B.tfc)} is owed either way, so the choice is between two losses — producing at ${money(B.shortRunLoss.price)} loses ${money(Math.abs(B.shortRunLoss.profit))} against ${money(B.tfc)} for stopping.`),
        mech(`LONG-RUN shutdown point: price below average cost (${money(B.ref.ac)}). In the long run there are no fixed costs, so there is nothing to contribute towards.`),
        link(`Between ${money(B.ref.avc)} and ${money(B.ref.ac)} the two rules disagree, and both are right: keep producing this month, leave the industry eventually.`),
      ] },
    ],
    takeaway: [
      'Normal profit is not zero reward — the reward is inside the cost.',
      'Short run: compare price with AVC. Long run: compare price with AC.',
      'Shutting down is not free in the short run; it costs the fixed cost.',
    ],
  },
];
