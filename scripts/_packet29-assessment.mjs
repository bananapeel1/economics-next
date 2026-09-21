/**
 * PACKET 29 — market-structures-contestability: quiz, practice, flashcards, common mistakes, extras.
 *
 * THE LIVE BANK IS 12 QUIZ ITEMS AND FIVE PRACTICE QUESTIONS FOR 54 LEAVES, AND FOUR OF THE TWELVE
 * TEST MATERIAL THE SECTION NEVER TAUGHT. `structure-06` measured what that does to the pre-test:
 * three items drawn from a bank in which four are untaught gives a 75% chance a signed-out student
 * meets something the section has not covered, in the first thing it shows them. That is the single
 * strongest piece of evidence in the audit for the founder's "the pre-test demotivates" hypothesis,
 * and it is not a pre-test problem — it is a coverage problem wearing a pre-test's clothes. Every
 * item below is pinned to a chapter that teaches it, and the three pre-test items come first in the
 * array because `PreTest.jsx` slices the unreserved pool at three.
 *
 * `practice-01` IS TWO CLAUSES AND ONLY ONE OF THEM CAN BE BUILT. It says the 20-mark game-theory
 * model answer credits "game theory explains real-world phenomena such as price rigidity — the
 * kinked demand curve model", when the section's own common mistakes warn against conflating the
 * two. Right, and moot: `kinked` is 0 hits in econ_spec.txt and the model is gone from this section
 * entirely (see _packet29-content.mjs). Its second clause says IAL 20-markers are "levels-marked
 * (KAA + evaluation levels)" and asks for the split to be shown. That is true of the real mark
 * scheme and is BANNED from student-facing prose by this programme's own `MARK_CLAIM` check, which
 * keys on `levels-marked` and `KAA` — packet 20 found "is levels-marked" shipped eight times. So
 * every guidance below says what the COMMAND WORD requires per Appendix 6, which is citable, and
 * what a particular marker does appears nowhere.
 *
 * EVERY EXPLANATION NAMES ITS OPTION BY CONTENT AND NEVER BY POSITION (packet 26). Items are
 * authored key-first, `placeKeys` deals the key into a slot and F074 shuffles again at render, so
 * "the second option" describes whatever happens to land there — and in packet 26 that meant six
 * explanations telling a student who got the item RIGHT why their answer was wrong. No rule in the
 * repository reads an explanation as a reference to anything, so the runner bans the phrasing.
 *
 * THE EXTRAS CHAINS EXIST FOR THE REORDER RECALLS AND NOT THE OTHER WAY ROUND. `topFix-04` asks for
 * "reorder recalls from the existing flows", and `lib/learn-steps.js:10` renders a recall below the
 * teaching on the same step — so a reorder whose sequence is a flow box on that screen is a
 * copy-from-screen task, which is the defect packet 26 was rejected for and packet 27 reproduced in
 * paraphrase. Rewording does not fix it: the words change and the ORDER, which is the only thing a
 * reorder tests, is still printed above. So this section has NO flow bodies at all, and all six
 * reorders are sourced from the chains below, which live in the Extras tab and not on the step.
 */
import {
  id, hash8, money, qty, pct, elasticity, round2,
  COSTS, MWANGI, NILE, ZAHRA, NATURAL, PD, MONOPSONY, CR, GAME, PRICING,
  BARRIERS, NON_PRICE, CONTESTABLE,
} from './_packet29-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7, B8 } from './_packet29-content.mjs';

const M = MWANGI, NI = NILE, Z = ZAHRA, NAT = NATURAL, MS = MONOPSONY, G = GAME, PR = PRICING;

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
   * All three are answerable from chapter 1, which every student reaches before anything else, and
   * none tests a structure the section has not yet described. That is the direct answer to
   * `structure-06`: the pre-test can no longer contain an untaught item, because the pool it draws
   * from is the section's own opening chapter.
   */
  qi(null, 'Allocative efficiency is reached at the output where:',
    ['price equals marginal cost', 'average cost is at its lowest', 'the firm earns the largest possible profit', 'marginal revenue equals zero'],
    'Price measures the value of the last unit to the buyer and marginal cost measures what the resources used on it would otherwise have produced, so P = MC is the condition for the last unit to be worth exactly what it cost. Producing at the lowest average cost is PRODUCTIVE efficiency, which is a different test.'),
  qi(null, 'A firm is described as X-inefficient. This means that:',
    ['its costs are above the lowest attainable level for the output it produces', 'it is producing at an output where average cost is not at its minimum', 'it is charging a price above its marginal cost', 'it has chosen not to invest in the newer technology that its rivals have adopted'],
    'X-inefficiency puts the firm ABOVE its own average cost curve — waste at whatever output has been chosen. Producing at the wrong output is productive inefficiency, which leaves the firm on the curve at the wrong point; charging above marginal cost is allocative inefficiency.'),
  qi(null, `Five firms in a market hold ${CR.firms.map(([, s]) => pct(s)).join(', ')}. The three-firm concentration ratio is:`,
    [pct(CR.cr3), pct(CR.cr5), pct(CR.firms[0][1]), pct(round2(CR.cr3 / 3))],
    `An n-firm concentration ratio adds the market shares of the largest n firms: ${CR.firms.slice(0, 3).map(([, s]) => pct(s)).join(' + ')} = ${pct(CR.cr3)}. Adding the next two firms gives the FIVE-firm ratio of ${pct(CR.cr5)}, and ${pct(round2(CR.cr3 / 3))} is the average of the three shares rather than their total.`),

  /* ── Block 1 · Efficiency and concentration ───────────────────────────── */
  qi(B1, 'Which kind of efficiency cannot be shown as a point on a single static diagram?',
    ['Dynamic efficiency', 'Allocative efficiency', 'Productive efficiency', 'None of them — all three can be marked on one diagram'],
    'Dynamic efficiency is a claim about how the cost curves MOVE over time as a firm invests and innovates, so it cannot be a point on a diagram drawn at one moment. Allocative efficiency is marked where price meets marginal cost and productive efficiency at the bottom of the average cost curve.'),
  qi(B1, `A firm could produce at an average cost of ${money(COSTS.minAc)} and is actually producing at the same output for ${money(32)}. The ${money(round2(32 - COSTS.minAc))} difference is:`,
    ['X-inefficiency', 'productive inefficiency', 'allocative inefficiency', 'a diseconomy of scale'],
    `The output has not changed, so the firm has not chosen the wrong point on its cost curve — it is sitting ABOVE the curve, which is X-inefficiency. A diseconomy of scale would raise the curve itself as the firm grew, and allocative inefficiency is about the gap between price and marginal cost.`),
  qi(B1, 'Two markets both have a five-firm concentration ratio of 80%. It follows that:',
    ['they may still have very different three-firm ratios and behave differently', 'the largest firm in each has the same market share', 'both markets are oligopolies with identical conduct', 'neither of the two markets could be contestable, because both are concentrated'],
    `A five-firm ratio is one number and many shapes produce it: ${pct(CR.cr3)} plus two small firms, or five near-equals with a three-firm ratio of ${pct(CR.twin.cr3)}. The ratio counts who holds the market, so it cannot say what the largest firm holds, how the firms behave, or whether a firm outside could enter.`),
  qi(B1, 'Which of these makes a market structure likely to deliver productive efficiency?',
    ['Free entry combined with an identical product, so a firm with higher costs is undercut', 'A high concentration ratio, because large firms have lower costs', 'High barriers to entry, because the firm can plan for the long term', 'A differentiated product, because a firm able to charge more can cover its costs more easily'],
    'Pressure is what delivers productive efficiency: where entry is free and the product identical, a firm that lets costs drift is undercut and loses everything. Large scale can lower costs without forcing a firm to reach the lowest attainable one, and barriers remove the pressure rather than adding to it.'),

  /* ── Block 2 · Perfect competition ────────────────────────────────────── */
  qi(B2, 'A perfectly competitive firm faces a horizontal demand curve because:',
    ['its product is identical to every other firm’s and it is too small to affect the market price', 'the market demand curve for this product is itself horizontal at the going price', 'it has agreed with its rivals to charge the same price as all of them', 'buyers have no information at all about the alternative suppliers'],
    'A homogeneous product means a firm asking more sells nothing, and being small means it can sell its whole output at the going price — so the line it faces is horizontal at that price. The MARKET demand curve still slopes downward; the two curves are different things.'),
  qi(B2, `${M.name} faces a market price of ${money(M.shortRun.price)} a ${M.unit}. Its marginal cost reaches ${money(M.shortRun.price)} at ${qty(M.shortRun.q)} ${M.units} ${M.per} and its average cost there is ${money(M.shortRun.ac)}. Its profit is:`,
    [money(M.shortRun.profit), money(M.shortRun.revenue), money(round2(M.shortRun.perUnit)), money(0)],
    `Profit is the margin a ${M.unit} multiplied by the output: (${money(M.shortRun.price)} ${'−'} ${money(M.shortRun.ac)}) × ${qty(M.shortRun.q)} = ${money(M.shortRun.profit)}. ${money(M.shortRun.revenue)} is total revenue before any cost is taken off, and ${money(round2(M.shortRun.perUnit))} is the margin on one ${M.unit} rather than the total.`),
  qi(B2, 'In long-run equilibrium under perfect competition:',
    ['price, marginal revenue, marginal cost and average cost are all equal at the minimum of average cost', 'price is equal to marginal cost and remains above average cost at that output', 'average cost has reached its minimum and price is still above it', 'marginal revenue has fallen to zero at the chosen output'],
    `Entry continues while supernormal profit remains, so it stops only where price has been driven to the lowest average cost — and at the bottom of the average cost curve marginal cost equals average cost as well. For ${M.name} that is ${money(M.minAc)} at ${qty(M.longRun.q)} ${M.units}, with all four measures equal.`),
  qi(B2, `A firm's minimum average variable cost is ${money(M.minAvc)} and its minimum average cost is ${money(M.minAc)}. At a price of ${money(20)} in the short run it should:`,
    ['keep producing, because the price covers its variable cost and contributes to the fixed cost', 'shut down, because the price is below average cost and it is making a loss', 'shut down, because the price is below the long-run break-even price', 'keep producing, because the price is above the level at which it would earn supernormal profit'],
    `At ${money(20)} the firm is making a loss, since the price is below average cost. But the fixed cost is owed whether it produces or not, so the comparison that matters is with average VARIABLE cost of ${money(M.minAvc)}: above that, every ${M.unit} leaves something towards the fixed cost, so producing loses less than stopping.`),
  qi(B2, 'Why is perfect competition usually judged the weakest of the four structures on dynamic efficiency?',
    ['Firms earn only normal profit in the long run, so there is no surplus to fund research', 'Firms are too small to understand new technology', 'Consumers in such markets do not want improved products', 'Marginal cost is above average cost at the equilibrium output'],
    'A structure whose long-run equilibrium leaves nothing above the normal return has nothing to invest, and perfect information means any improvement is available to every rival at once, so nothing is captured by whoever made it. The incentive to ADOPT a cost-lowering method remains strong, which is a different thing.'),

  /* ── Block 3 · Monopolistic competition ───────────────────────────────── */
  qi(B3, 'Monopolistic competition differs from perfect competition in exactly one assumption. That assumption is:',
    ['the product is differentiated rather than identical', 'there are few firms rather than many', 'entry to the market is blocked by barriers that the incumbent firms control', 'firms do not aim to maximise profit'],
    'Many firms, free entry and profit maximisation are all carried over unchanged. Differentiation is the single change, and it is enough to tilt the firm’s demand curve downward, which is what alters every result that follows.'),
  qi(B3, 'A shop sells a bag of rice identical to the one next door but offers free delivery. This is:',
    ['distribution differentiation', 'physical differentiation', 'marketing differentiation', 'not differentiation, because the product is identical'],
    'Where and how a product can be bought is part of what the buyer is choosing, which is distribution differentiation — and it works precisely because the product itself is unchanged. Physical differentiation would alter the rice; marketing differentiation would alter the name or the packaging.'),
  qi(B3, `${NI.name} maximises profit where MR = MC at ${qty(NI.short.q)} ${NI.units} ${NI.per}, facing the demand curve P = ${NI.short.a} ${'−'} ${NI.b}Q. The price it charges is:`,
    [money(NI.short.price), money(NI.short.mr), money(NI.short.ac), money(NI.long.price)],
    `The price is read off the DEMAND curve at the profit-maximising output: ${NI.short.a} ${'−'} ${NI.b} × ${qty(NI.short.q)} = ${money(NI.short.price)}. Reading it off the marginal revenue curve instead gives ${money(NI.short.mr)}, which is the commonest error here; ${money(NI.short.ac)} is average cost at that output.`),
  qi(B3, 'In long-run equilibrium a monopolistically competitive firm’s demand curve is tangent to its average cost curve:',
    ['on the falling part of the average cost curve, to the left of its minimum', 'exactly at the minimum point of the average cost curve', 'on the rising part of the curve, to the right of its minimum', 'at the output where marginal cost reaches its own lowest point'],
    `A downward-sloping straight line can only touch a U-shaped curve where that curve is also sloping down, so the tangency is necessarily left of the minimum. For ${NI.name} it is ${qty(NI.long.q)} ${NI.units} against a lowest-cost output of ${qty(NI.productiveOutput)}, and the gap of ${qty(NI.excessCapacity)} is the excess capacity.`),
  qi(B3, 'Excess capacity in monopolistic competition means that:',
    ['the firm produces less than the output at which its average cost would be lowest', 'the firm has bought machinery and floor space that it has never once put to any use', 'the firm could sell more at the current price but chooses not to', 'average cost is above marginal cost at every output'],
    `It is the gap between the long-run output and the productively efficient output — ${qty(NI.excessCapacity)} ${NI.units} for ${NI.name} — and it follows from where the tangency falls rather than from any management decision. What consumers get in exchange is variety.`),

  /* ── Block 4 · Barriers to entry and exit ─────────────────────────────── */
  qi(B4, 'What distinguishes oligopoly from the other three market structures?',
    ['Each firm’s best decision depends on what it expects named rivals to do', 'It always contains exactly three or four competing firms', 'Its firms always end up charging one another’s prices, whatever their own costs are', 'Its product is always identical from one firm to the next'],
    'Interdependence is the defining feature: a perfectly competitive firm has too many rivals to plan around any one of them, a monopoly has none, and a monopolistically competitive firm plans around none in particular. There is no fixed number of firms, and the product may be identical or differentiated.'),
  qi(B4, `An incumbent's average cost is ${money(PR.incumbentAc)} a unit and an entrant would face ${money(PR.entrantAc)}. Setting a price of ${money(PR.limit)} is an example of:`,
    ['limit pricing', 'predatory pricing', 'price leadership', 'a price war'],
    `The price is below the average cost an ENTRANT would face and above the incumbent's own, so the incumbent still earns ${money(PR.limitMarginIncumbent)} a unit while entry cannot pay — which is limit pricing. A predatory price would be below the incumbent's own average variable cost and would lose it money.`),
  qi(B4, 'Which barrier to entry has a fixed expiry date built into it?',
    ['A patent', 'Economies of scale', 'Sunk costs', 'Branding'],
    'A patent confers an exclusive right for a defined period, after which the method becomes available to anyone and the barrier disappears. The other three last as long as the technology, the nature of the assets or the brand itself does.'),
  qi(B4, 'A firm considering entry finds that the equipment it would need can be sold on easily in a world market. This means that:',
    ['the entry cost is largely not sunk, so the market is easier to contest', 'the entry cost is high, so the market is harder to contest', 'there are no barriers to entry of any kind in this market', 'economies of scale must be absent from this industry'],
    'What matters is how much of the entry cost could be recovered on the way out, not how large it is: equipment with a resale market makes entry a reversible experiment rather than a commitment. Other barriers may still be present, and scale economies are a separate question.'),

  /* ── Block 5 · Interdependence and collusion ──────────────────────────── */
  qi(B5, `Two firms choose between holding and cutting price. Holding pays each ${qty(G.holdHold[0])}; the firm that cuts alone gets ${qty(G.cutHold[0])} while the other gets ${qty(G.cutHold[1])}; both cutting pays each ${qty(G.cutCut[0])}. Cutting is:`,
    ['a dominant strategy for both firms', 'the best choice only if the rival holds its price', 'the best choice only if the rival also cuts', 'never worth doing for either firm'],
    `Check each of the rival's choices in turn. If the rival holds, cutting pays ${qty(G.cutHold[0])} against ${qty(G.holdHold[0])}; if the rival cuts, cutting pays ${qty(G.cutCut[0])} against ${qty(G.holdCut[0])}. Better in both cases makes it dominant — and both firms reasoning this way end at ${qty(G.cutCut[0])} each, ${qty(G.jointLoss)} worse between them than holding.`),
  qi(B5, 'In the equilibrium of that game both firms cut their price. The outcome is:',
    ['the best each firm can do given what the other is doing, and worse for both than cooperating', 'the best available outcome for both firms', 'unstable, because either firm could improve by raising its price alone', 'impossible, because both firms would rather cooperate'],
    `Neither firm can improve by changing its own choice alone, which is what makes it an equilibrium — but both holding would have paid each of them ${qty(G.holdHold[0])} rather than ${qty(G.cutCut[0])}. Wanting to cooperate is not enough when cutting pays better whatever the other does.`),
  qi(B5, 'Which condition makes a collusive agreement HARDER to sustain?',
    ['Discounts negotiated privately with individual buyers', 'A small number of firms in the market', 'Published prices that every firm can check', 'Costs that are similar across the firms'],
    'Collusion survives on detection: a discount nobody else can see cannot be punished, so the temptation to cheat goes unchecked. Few firms, visible prices and similar costs all make an agreement easier to reach and easier to police.'),
  qi(B5, 'Prices in a market move together, but investigators find no agreement of any kind between the firms. This is consistent with:',
    ['tacit collusion through price leadership', 'an illegal cartel that has covered its tracks', 'perfect competition, in which all firms charge the same price', 'predatory pricing by the largest firm'],
    'Price leadership needs no communication: one firm moves and each of the others follows because following is what is best for it, so prices move together with nothing to find. That is exactly why parallel pricing is not by itself evidence of an agreement.'),

  /* ── Block 6 · Price and non-price competition ────────────────────────── */
  qi(B6, `A firm whose average variable cost is ${money(PR.incumbentAvc)} a unit sells at ${money(PR.predatory)}, intending to raise the price once a rival has left. This is:`,
    ['predatory pricing', 'limit pricing', 'non-price competition', 'productive efficiency'],
    `The price is below the SELLER's own average variable cost, so it loses ${money(Math.abs(PR.predatoryLossPerUnit))} a unit on the variable costs alone — a deliberate loss no firm would accept except for what it does to a rival. A limit price stays above the seller's own cost and is profitable throughout.`),
  qi(B6, 'Which of these is NOT one of the five forms of non-price competition the specification names?',
    ['Limit pricing', 'Endorsement', 'Product placement', 'After-sales service'],
    'The five are advertising and branding, quality, endorsement, product placement and after-sales service. Limit pricing is a form of PRICE competition — it works by setting a price below the level at which entry would pay.'),
  qi(B6, 'Why do oligopolists often prefer non-price competition to cutting price?',
    ['A price cut is matched within days, while a reputation takes rivals years to copy', 'Non-price competition is cheaper than a price cut', 'Competition law prohibits changing prices in a concentrated market', 'A price cut cannot increase the quantity a firm sells'],
    'Interdependence is the reason: a visible price cut is matched and leaves everybody with the same customers and less money, while quality, a service network or a trusted name gives an advantage that lasts and makes demand less elastic. Advertising budgets are often larger than the price cut would have cost.'),
  qi(B6, 'A price war ends when one of the firms leaves the market. For consumers the likely long-run result is:',
    ['a more concentrated market, in which the price may settle above where it started', 'a permanently lower price, since the surviving firm has proved it can supply cheaply', 'no change at all, because the remaining firms still compete', 'lower quality but the same price as before the war'],
    'The gain to consumers lasts while the war does. A firm leaving removes a competitor, so the market is more concentrated afterwards and the survivor faces less pressure — which is why a war that removes a rival can end with a higher price than the one it began at.'),

  /* ── Block 7 · Monopoly ───────────────────────────────────────────────── */
  qi(B7, `A monopolist faces P = ${Z.a} ${'−'} ${Z.b}Q with a constant marginal cost of ${money(Z.mc)}. Its profit-maximising output is:`,
    [`${qty(Z.qm)} ${Z.units}`, `${qty(Z.qc)} ${Z.units}`, `${qty(round2(Z.a / Z.b))} ${Z.units}`, `${qty(round2(Z.a / (2 * Z.b)))} ${Z.units}`],
    `Marginal revenue is ${Z.a} ${'−'} ${Z.b * 2}Q, so MR = MC gives ${Z.a} ${'−'} ${Z.b * 2}Q = ${Z.mc} and Q = ${qty(Z.qm)}. Setting the DEMAND curve equal to marginal cost instead gives ${qty(Z.qc)}, which is the competitive output, and ${qty(round2(Z.a / (2 * Z.b)))} is where marginal revenue reaches zero.`),
  qi(B7, `That monopolist produces ${qty(Z.qm)} ${Z.units} and charges ${money(Z.pm)}. A competitive industry with the same costs would produce ${qty(Z.qc)} at ${money(Z.mc)}. The welfare loss is:`,
    /* NOT `money(Z.csMonopoly)` as a distractor: consumer surplus at the monopoly output is also
     * $288, so the item shipped two identical options and `quiz.dup-options` refused it. The whole
     * FALL in consumer surplus is the better distractor anyway — it is the figure a student reaches
     * by forgetting that most of the fall is transferred rather than lost. */
    [money(Z.dwl), money(Z.profit), money(round2(Z.csCompetition - Z.csMonopoly)), money(round2(Z.pm - Z.mc))],
    `The loss is the triangle between the demand curve and marginal cost over the output withheld: ½ × ${qty(Z.withheld)} × ${money(round2(Z.pm - Z.mc))} = ${money(Z.dwl)}. ${money(Z.profit)} is the monopolist's profit, which is TRANSFERRED from consumers rather than lost, and ${money(round2(Z.pm - Z.mc))} is the gap between price and marginal cost on one ${Z.unit}.`),
  qi(B7, 'A market is a natural monopoly when:',
    ['long-run average cost is still falling at an output as large as the whole market', 'one firm has been granted a legal monopoly by the state', 'the firm is very large compared with others in the economy', 'the product has no close substitute available at any price that a buyer might be offered'],
    `The test is where minimum efficient scale falls relative to market size: if average cost is still falling at the size of the whole market, splitting output between firms raises the cost of supply. A network costing ${money(NAT.networkCost)} a day plus ${money(NAT.perUnit)} a unit gives ${money(NAT.one)} for one firm serving ${qty(NAT.market)} units and ${money(NAT.two)} for two serving half each.`),
  qi(B7, 'Third-degree price discrimination requires that the groups charged different prices:',
    ['cannot resell to each other and differ in their price elasticity of demand', 'face different costs of supply from the seller', 'are of roughly similar size to one another in the seller’s principal market', 'both have inelastic demand for the product'],
    `Different elasticities are what make two prices more profitable than one, and no resale is what stops the two prices collapsing into one. A difference in the COST of supply would make the price difference something other than discrimination, and if both groups had inelastic demand there would be no reason to charge either of them less.`),
  qi(B7, `A monopolist sells in two separable markets at the same marginal cost. Market A has an elasticity of demand of ${elasticity(-PD.less.ped)} and market B ${elasticity(-PD.more.ped)}. The firm will charge:`,
    ['the higher price in market A, where demand is less elastic', 'the higher price in market B, where demand is more elastic', 'the same price in both, since marginal cost is the same', 'a price below marginal cost in market B to build its share'],
    `The less elastic market is the one whose buyers will not switch, so it bears the higher price: ${money(PD.less.price)} against ${money(PD.more.price)} here. The identical marginal cost is exactly why the price difference is discrimination rather than a difference in cost.`),

  /* ── Block 8 · Monopsony and contestability ───────────────────────────── */
  qi(B8, `The supply of labour to a monopsonist is w = ${money(MS.w0)} + ${MS.slope}L. Its marginal cost of labour is:`,
    [`${money(MS.w0)} + ${MS.slope * 2}L`, `${money(MS.w0)} + ${MS.slope}L`, `${money(MS.w0 * 2)} + ${MS.slope}L`, `${money(MS.w0)} ${'−'} ${MS.slope}L`],
    `To hire one more worker the single buyer must raise the wage for EVERY worker it already employs, not only the last, so the marginal cost of labour rises at twice the gradient of the supply curve. The supply curve itself is the AVERAGE cost of labour.`),
  qi(B8, `That monopsonist employs ${qty(MS.mono.l)} workers, where the marginal cost of labour equals the marginal revenue product. The wage it pays is:`,
    [money(MS.mono.wage), money(MS.mono.mrp), money(MS.comp.wage), money(MS.w0)],
    `The wage is read off the SUPPLY curve at that employment level: ${money(MS.w0)} + ${MS.slope} × ${qty(MS.mono.l)} = ${money(MS.mono.wage)}. ${money(MS.mono.mrp)} is what the last worker adds and is what the marginal cost of labour has risen to; ${money(MS.comp.wage)} is what a competitive market for the same labour would pay.`),
  qi(B8, 'A minimum wage set between the monopsony wage and the competitive wage would:',
    ['raise both the wage and the number employed', 'raise the wage and lower the number employed', 'lower both the wage and the number employed', 'have no effect, because the firm is already at its profit-maximising employment'],
    `A monopsonist already employs below the competitive level — ${qty(MS.mono.l)} against ${qty(MS.comp.l)} here — because hiring one more raises the wage bill for everyone. A floor in that range removes that disincentive, so wage and employment can rise together, which could not happen in a competitive labour market.`),
  qi(B8, 'A contestable market is best identified by:',
    ['how easily a firm outside the market could enter AND leave without loss', 'the number of firms currently selling in it', 'the size of the largest firm’s market share', 'whether the firms in it are earning supernormal profit'],
    'Contestability is a question about outsiders, not insiders: the threat of entry disciplines incumbents, and it is only credible where a firm that entered and did badly could leave without losing what it spent. A market can hold one firm and be highly contestable, or a dozen and barely be so.'),
  qi(B8, 'Why do sunk costs matter more than the total cost of entry in judging contestability?',
    ['A cost that cannot be recovered on leaving makes entry a commitment rather than an experiment', 'Sunk costs are always larger than the recoverable part of what a firm spends on entering a market', 'Sunk costs are the only costs a new entrant has to pay before trading', 'Regulators measure barriers to entry using sunk costs alone'],
    'A firm weighs what entry costs IF IT GOES WRONG. Where the assets can be sold or redeployed a failed entry costs the difference; where they cannot it costs everything — so a market needing a large fleet of standard vehicles can be more contestable than one needing a modest but entirely sunk advertising campaign.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */
/*
 * EIGHT ITEMS, ONE A CHAPTER, AND ALL EIGHT ECONOMICS COMMAND WORDS EXACTLY ONCE: Define 2,
 * Calculate 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20 — the census at
 * audit/raw/tariff-census.json, subject `economics`. There is no Assess and no 10- or 12-mark
 * question in this subject; the live bank carries an "Assess monopoly (10)" and `structure-04`
 * records the practice fallback dealing it to the wrong chapter. `accuracy-05` corrects the section's
 * "25-mark essays" to 20, which is right, and adds that Section B sub-questions "top out at 12",
 * which is not: the Economics census has no 12-mark command at all and Discuss is 14.
 *
 * EVERY GUIDANCE OPENS WITH A PARAGRAPH THAT ALLOCATES NO MARKS (`practice.opening`). `InlinePractice`
 * in GUIDED mode prints the FIRST paragraph above the answer box and hides the rest behind "See full
 * guidance", so a one-paragraph guidance prints the whole mark scheme over an empty box asking the
 * student to produce it. The opening is planning advice; the marks are in the second paragraph.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Calculate', 4, `Five firms in a market hold these shares: ${CR.firms.map(([n, s]) => `${n} ${pct(s)}`).join(', ')}. Calculate the three-firm and five-firm concentration ratios, and state what the pair of figures shows about this market that either one alone does not. (4 marks)`,
    'Two calculations and an interpretation, so decide before you start what the second ratio is for — it is not simply a bigger version of the first. Appendix 6 advises showing workings for a Calculate, and here the workings are one addition each, so the space is better spent on the sentence at the end. Be careful to quote each answer with the value of n it belongs to.\n'
    + `CR3 = ${CR.firms.slice(0, 3).map(([, s]) => pct(s)).join(' + ')} = ${pct(CR.cr3)} (1 mark). CR5 = ${pct(CR.cr3)} + ${pct(CR.firms[3][1])} + ${pct(CR.firms[4][1])} = ${pct(CR.cr5)} (1 mark). The pair shows that the largest three firms hold most of the market and the next two add only ${pct(round2(CR.cr5 - CR.cr3))} between them (1 mark), so this is a market with a clear top tier rather than five near-equals — a second market with a CR5 of ${pct(CR.twin.cr5)} could have a CR3 of only ${pct(CR.twin.cr3)} (1 mark). An answer that gives both numbers and no comparison has the two calculation marks and neither interpretation mark.`),

  pr(B2, 'Draw', 4, `Draw a diagram to show a perfectly competitive firm in long-run equilibrium, labelling the price, the output and the area of profit. (4 marks)`,
    'Decide what has to be TRUE of the picture before you draw a line, because this diagram is defined by things touching rather than by things crossing. Appendix 6 defines Draw as requiring students to construct an ACCURATELY LABELLED diagram using quantitative skills, so the labelling is not decoration on top of the drawing — it is what the command word asks for. Sketch the cost curves first and put the price line in last.\n'
    + `Axes labelled price and cost against quantity, with a U-shaped average cost curve and a marginal cost curve cutting it from below at its minimum (1 mark). The demand curve is a HORIZONTAL line at the market price, labelled AR = MR = P, and it must sit exactly at the lowest point of average cost (1 mark). Output is marked where that line meets marginal cost, which is the same point (1 mark). The profit area is nil, and the diagram should say so: at ${money(M.minAc)} and ${qty(M.longRun.q)} ${M.units}, price equals average cost, so only normal profit is earned (1 mark). Drawing the price line above average cost gives the SHORT-run diagram and cannot pick up the last two marks.`),

  pr(B3, 'Explain', 4, 'Explain why a firm in monopolistic competition produces at an output below the one at which its average cost would be lowest. (4 marks)',
    'An Explain of a reason needs a two-stage chain, so plan both links before you write. One link is about the SHAPE of the demand curve this firm faces and one is about where a line of that shape can touch a U-shaped curve. The conclusion is geometric rather than behavioural, so resist the temptation to explain it by what the firm wants.\n'
    + `Because its product is differentiated, the firm faces a downward-sloping demand curve rather than a horizontal one (1 mark). Free entry means supernormal profit is competed away, so in the long run the demand curve is pushed down until it is tangent to the average cost curve (1 mark). A downward-sloping line can only be tangent to a U-shaped curve at a point where that curve is also falling (1 mark), so the tangency lies to the left of the minimum and the firm produces below the lowest-cost output — ${qty(NI.long.q)} ${NI.units} against ${qty(NI.productiveOutput)}, an excess capacity of ${qty(NI.excessCapacity)} (1 mark). An answer that says the firm "chooses" to produce less has missed that the position of the tangency leaves it no choice.`),

  pr(B4, 'Define', 2, "Define the term 'sunk cost'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Before you write, settle which of the two halves of this term does the work: plenty of costs have already been paid, and only some of them are sunk. An example on its own will not substitute for either half.\n'
    + 'A sunk cost is spending that has already been incurred (1 mark) and that cannot be recovered if the firm leaves the market (1 mark). An answer that says "a cost that has already been paid" has the first half only, and it is the weaker half: what makes a sunk cost a barrier to entry is the irrecoverability, which is why advertising is almost entirely sunk while a fleet of standard vehicles of the same value is barely sunk at all.'),

  pr(B5, 'Analyse', 6, 'Analyse why a cartel agreement between a small number of firms is difficult to sustain. (6 marks)',
    'An Analyse wants depth rather than breadth, so take one chain all the way rather than listing several reasons that are each true. The chain has to explain why a firm that WANTS the agreement to hold still has a reason to break it, and that reason is arithmetic — so decide which comparison of payoffs carries you from the agreement to its collapse. Appendix 6 says a diagram is credited where appropriate, and a payoff matrix counts.\n'
    + `A cartel restricts total output to raise the price, so each member's quota is below the output it would choose at that price (1 mark). The high cartel price is exactly what makes selling above quota attractive (1 mark), so each member gains by exceeding its quota while the others keep to theirs (1 mark) — in the two-firm game, ${qty(G.temptation)} more than sticking to the agreement (1 mark). Every member faces the same incentive, and each knows the others do (1 mark), so unless cheating can be detected and punished the agreement unravels and the firms end at the competitive-style outcome of ${qty(G.cutCut[0])} each rather than ${qty(G.holdHold[0])} (1 mark). A chain that stops at "firms are tempted to cheat" has asserted the conclusion without the price that creates the temptation.`),

  pr(B6, 'Examine', 8, 'Examine the costs and benefits of non-price competition to consumers. (8 marks)',
    'Appendix 6 says Examine needs a chain of reasoning AND a brief assessment of the arguments, with depth preferred to breadth — so two well-developed effects will do more than four named ones, and the assessment at the end is not optional. Decide in advance which two of the five forms of non-price competition you will use, and make sure one of them cuts the other way.\n'
    + `On the benefit side: non-price competition raises product quality and reliability, because a firm that cannot win on price competes on what the product does; after-sales service and warranties reduce the risk of buying, which has a value of its own; and choice widens while buyers learn more about what is available. On the cost side: advertising is paid for in the price, so consumers fund it whether or not it tells them anything useful, and some of it persuades rather than informs — raising a firm's demand without making anybody better off. It also raises fixed costs, which becomes a barrier to entry and shields the incumbents from the price competition consumers would gain from.\n`
    + `The assessment the command word asks for turns on one distinction: whether the spending changes the PRODUCT or only its IMAGE. Quality and after-sales service leave the buyer with something; advertising against a near-identical rival largely does not. Two effects taken all the way, one from each side, with that judgement at the end, does more than the five forms listed.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the view that a monopoly always acts against the interests of consumers. (20 marks)',
    'Appendix 6 defines Evaluate as needing multi-stage chains of reasoning with reference to context, and a critical assessment so that informed judgements may be made. The word doing the work in this question is "always", so plan the answer around what would have to be true for the exception to hold rather than around a list of advantages and disadvantages. Pick a market before you start writing and keep returning to it; a judgement with no context cannot be more than a preference.\n'
    + `The case for the view. A profit-maximising monopolist sets MR = MC, and marginal revenue lies below average revenue, so price necessarily exceeds marginal cost: with P = ${Z.a} ${'−'} ${Z.b}Q and MC of ${money(Z.mc)}, output is ${qty(Z.qm)} ${Z.units} at ${money(Z.pm)} against a competitive ${qty(Z.qc)} at ${money(Z.mc)}. Consumer surplus falls from ${money(Z.csCompetition)} to ${money(Z.csMonopoly)} — part transferred to the firm as profit of ${money(Z.profit)}, and ${money(Z.dwl)} lost to nobody at all. With no entry to discipline it the firm has no need of the lowest attainable cost either, so X-inefficiency is likely on top of the allocative loss.\n`
    + `The case against. Where average cost falls across the whole range of market demand, one firm supplies more cheaply than several: a network costing ${money(NAT.networkCost)} a day gives ${money(NAT.one)} a unit for one firm serving ${qty(NAT.market)} units and ${money(NAT.two)} for two serving half each, so competition would raise the price rather than lower it. Supernormal profit is also where dynamic efficiency is funded, and a firm protected from imitation can capture the return on an innovation, so a higher price now may buy a better or cheaper product later. And price discrimination, which looks like pure exploitation, can serve a group that a single price would have excluded.\n`
    + `The judgement. "Always" is too strong, and the reason is specific rather than general: the static loss is certain and measurable while the offsetting arguments are conditional, because a monopolist MAY pass on scale economies and MAY invest and is obliged to do neither. So the conclusion depends on the market — a natural monopoly under an effective price cap is a different case from a legal monopoly in a market that would support several firms — which is why policy usually regulates the conditions rather than breaking the firm up.`),

  pr(B8, 'Discuss', 14, 'Discuss the significance of sunk costs for the contestability of a market. (14 marks)',
    'Appendix 6 says Discuss needs chains of reasoning developed with reference to context, the validity and significance of the concepts considered, and a recognition of different viewpoints. The concept here is context-dependent by its nature, because the same asset is sunk in one market and not in another — so name a market early and let the examples do the arguing. Plan one paragraph on the mechanism and one on what limits it.\n'
    + `Sunk costs are spending that cannot be recovered on leaving the market, so they determine what entry costs IF IT FAILS rather than what it costs to attempt. Where they are low, entry is a reversible experiment: a firm can enter while incumbents' profit is above normal, take some of it and leave, carrying its assets to the next market — and the mere possibility of that holds the incumbents' price down towards a limit price, so profit tends to normal even with very few firms in the market. This is why sunk costs matter more than the total cost of entry: a market needing a large fleet of resaleable vehicles can be more contestable than one needing a modest but entirely unrecoverable advertising campaign.\n`
    + `Against that, and this is where the judgement lies. Sunk costs are not fixed by the technology alone — incumbents can raise them deliberately through brand spending, capacity built ahead of demand and long exclusive contracts — so a market that was contestable can be made less so, and the discipline is not self-sustaining. Nor is low contestability always against the consumer interest: where the improvement consumers want needs patient investment, a firm that cannot hold supernormal profit will not make it. So the significance of sunk costs is real and conditional: decisive for whether the threat of entry is credible, and not by itself a verdict on the market.`),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
/*
 * `structure-01` and `specGap-01` between them record that the live 18 flashcards cover four
 * structures and say nothing about monopsony, natural monopoly, X-inefficiency, concentration ratios
 * or the barriers taxonomy — five of the eight sub-topics. These are one or more a leaf group, in
 * specification order, and every figure comes from the same module as the teaching text.
 */
const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is allocative efficiency, and what is its condition?', 'Producing the mix of goods buyers value most, reached where price equals marginal cost — so the last unit is worth exactly what it cost to make.'),
  card('What is productive efficiency?', `Producing at the lowest attainable average cost: the bottom of the AC curve, identifiable because marginal cost cuts average cost there. For this section's firm, ${money(COSTS.minAc)} at ${qty(COSTS.atMinAc.q)} ${COSTS.units}.`),
  card('What is dynamic efficiency?', 'Investment and innovation lowering costs or improving the product over time — the cost curves MOVING, which no single static diagram can show. It has to be funded, usually from profit above the normal level.'),
  card('What is X-inefficiency, and how does it differ from productive inefficiency?', 'X-inefficiency is costs ABOVE the lowest attainable level for the output chosen — the firm sits above its own cost curve. Productive inefficiency is the wrong point ON the curve.'),
  card('How is an n-firm concentration ratio calculated?', `Rank firms by market share and add the largest n. Here CR3 = ${pct(CR.cr3)} and CR5 = ${pct(CR.cr5)}. Always quote the answer with its n; a ratio without one says nothing.`),
  card('What does a concentration ratio NOT tell you?', 'The shape of the market (two markets can share a CR5 and differ in CR3), how the firms behave, and whether firms outside could enter — which is contestability.'),
  card('What are the five assumptions of perfect competition?', 'Many small buyers and sellers; a homogeneous product; free entry and exit; perfect information; profit maximisation. Together they leave the firm facing a horizontal demand curve at the market price.'),
  card('Why is AR = MR = P for a perfectly competitive firm only?', 'Its product is identical to every other firm’s and it is too small to affect the price, so it can sell any quantity at the going price and nothing at more. So MR = MC becomes P = MC.'),
  card('What is the signature of long-run equilibrium in perfect competition?', `P = MR = MC = AC, all four equal at the minimum of average cost — ${money(M.minAc)} at ${qty(M.longRun.q)} ${M.units} here — with normal profit only and no reason to enter or leave.`),
  card('What is normal profit?', 'The return that just keeps the owners’ resources in this industry. It is counted INSIDE the average cost curve, so it shows as zero profit on a diagram and is not zero reward.'),
  card('Where is the short-run shutdown point, and why there?', `At the minimum of average variable cost — ${money(M.minAvc)} here. The fixed cost is owed whether the firm produces or not, so producing only has to beat stopping: at that price the loss equals the fixed ${money(M.tfc)} either way.`),
  card('What changes between perfect and monopolistic competition?', 'One assumption: the product is differentiated rather than identical. Many firms, free entry and profit maximisation all carry over. The firm’s demand curve becomes downward-sloping and highly elastic.'),
  card('What are the three types of product differentiation?', 'Physical (product features), marketing (advertising, packaging) and distribution (shop, online, telephone). The last two work on products that are physically identical.'),
  card('Where is the long-run tangency in monopolistic competition?', `Where the demand curve just touches average cost, on the FALLING part of AC and left of its minimum — ${qty(NI.long.q)} ${NI.units} at ${money(NI.long.price)}. A downward-sloping line cannot be tangent at the minimum.`),
  card('What is excess capacity?', `The gap between the long-run output and the output at which average cost would be lowest: ${qty(NI.excessCapacity)} ${NI.units} here. It is a consequence of where the tangency falls, and variety is what consumers get for it.`),
  card('What makes oligopoly different from the other three structures?', 'Interdependence: each firm’s best decision depends on what it expects named rivals to do, and it knows they are doing the same. So the structure has no single predicted outcome.'),
  card('What are the six barriers to entry and exit the specification names?', BARRIERS.map(([k]) => k).join(', ') + '. All six belong to the oligopoly requirement, and monopoly is the case where they are strongest.'),
  card('What is limit pricing?', `A price set below the average cost an ENTRANT would face and above the seller’s own, so entry cannot pay while the incumbent still profits: ${money(PR.limit)} against an entrant’s ${money(PR.entrantAc)} and its own ${money(PR.incumbentAc)}.`),
  card('Why are sunk costs a barrier to ENTRY?', 'Because they are a barrier to EXIT. A firm can spend the money; what deters it is knowing the money is gone if the venture fails. The test is what share of the entry cost is recoverable, not how large it is.'),
  card('In a two-firm, two-outcome game, what is a dominant strategy?', `A choice that is better whatever the rival does. Here cutting beats holding against either choice (${qty(G.cutHold[0])} > ${qty(G.holdHold[0])}, and ${qty(G.cutCut[0])} > ${qty(G.holdCut[0])}), so both cut and both do worse than if both had held.`),
  card('What conditions make collusion easier to sustain?', 'Few firms, similar costs, stable demand, cheating that is easy to detect, and a standardised product. It fails as those reverse, and because price fixing is illegal in most jurisdictions.'),
  card('What is the difference between a cartel and price leadership?', 'A cartel is OVERT collusion — a formal agreement to fix price or output, which can be prosecuted on evidence of the agreement. Price leadership is TACIT: one firm moves, the others follow, and there is nothing to find.'),
  card('Which four groups does the specification name for the costs and benefits of collusion?', 'Producers, consumers, workers and governments. Note that price and non-price competition has a DIFFERENT list: firms, consumers, employees and suppliers.'),
  card('What separates predatory pricing from limit pricing?', `Whose cost the price is below. Predatory is below the SELLER's own average variable cost, so it loses money deliberately (${money(PR.predatory)} against ${money(PR.incumbentAvc)}); limit pricing is below an ENTRANT's average cost and is profitable throughout.`),
  card('What are the five forms of non-price competition?', NON_PRICE.map(([k]) => k).join(', ') + '. A price cut is matched within days; a reputation or a service network takes rivals years to copy.'),
  card('What are the assumptions of monopoly?', 'One seller, no close substitute, high barriers to entry and exit, profit maximisation. The firm’s demand curve IS the market demand curve, which is what gives it a choice of price.'),
  card('How do you find a monopolist’s price and output?', `Set MR = MC to find the OUTPUT, then read the price off the DEMAND curve above it — never off MR. With P = ${Z.a} ${'−'} ${Z.b}Q and MC ${money(Z.mc)}: Q = ${qty(Z.qm)} ${Z.units}, P = ${money(Z.pm)}.`),
  card('What is the welfare loss of a monopoly?', `The triangle between the demand curve and marginal cost over the output withheld: ½ × ${qty(Z.withheld)} × ${money(round2(Z.pm - Z.mc))} = ${money(Z.dwl)} here. The firm's ${money(Z.profit)} profit is TRANSFERRED from consumers; this part is lost to everybody.`),
  card('What is a natural monopoly, and what follows for policy?', `A market where long-run average cost falls across the whole range of demand, so one firm supplies more cheaply than several: ${money(NAT.one)} a unit against ${money(NAT.two)} if the market is split. Regulate rather than break up.`),
  card('What are the three conditions for third-degree price discrimination?', 'Market power to set a price; separable groups with DIFFERENT price elasticities of demand; and no resale between the groups. The cost of separating and enforcing must be less than the extra profit.'),
  card('Which group pays more under third-degree price discrimination?', `The group with the LESS elastic demand — the buyers who will not switch. Here ${money(PD.less.price)} where elasticity is ${elasticity(-PD.less.ped)}, against ${money(PD.more.price)} where it is ${elasticity(-PD.more.ped)}.`),
  card('How does a monopsonist decide how much to buy, and what does it pay?', `It buys where the marginal cost of the input equals its marginal revenue product, then reads the price off the SUPPLY curve: ${qty(MS.mono.l)} ${MS.input} at ${money(MS.mono.wage)}, against ${qty(MS.comp.l)} at ${money(MS.comp.wage)} competitively.`),
  card('Why does the marginal cost of an input rise twice as fast as its supply curve for a single buyer?', 'Because to get one more unit the buyer must raise the price for EVERY unit it already buys, not only the last. The supply curve is the AVERAGE cost of the input; the marginal cost lies above it.'),
  card('Why can a minimum wage raise employment in a monopsonised labour market?', `Because the firm already employs below the competitive level (${qty(MS.mono.l)} against ${qty(MS.comp.l)}) to avoid raising the wage for everybody. A floor between ${money(MS.mono.wage)} and ${money(MS.comp.wage)} removes that disincentive.`),
  card('What are the characteristics of a contestable market?', CONTESTABLE.map(([k]) => k.toLowerCase()).join('; ') + '. Easy EXIT matters as much as easy entry, because a firm that cannot leave without loss hesitates to enter.'),
  card('What is hit-and-run entry, and what does it require?', 'Entering while incumbents’ profit is above normal, taking some of it and leaving when it is competed away. It requires LOW SUNK COSTS, and its mere possibility holds the incumbents’ price down.'),
  card('What does contestability do to profit and price, and why?', 'Profit tends to the normal level and price towards a limit price, however few firms are in the market, because supernormal profit is a visible signal and acting on it is cheap. The threat is enough; no entrant need appear.'),
  card('Why is the contestability of a market not permanent?', 'Because it depends on sunk costs staying low, and incumbents can raise them deliberately — heavy brand spending, capacity ahead of demand, long exclusive contracts. A market that was contestable can be made less so.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */
/*
 * `structure-08` judges the live misconceptions genuine and makes one specific request: "monopolies
 * always bad" and "perfect competition always ideal" overlap, and the second should be replaced — its
 * own suggestion being "students draw monopoly price from the MR curve". Both taken: the overlapping
 * pair becomes one entry about the word "always", and the MR-curve error is built as its own.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  /*
   * LAYER 6 COUNTED THE MISTAKES AGAINST THE BLOCKS AND FOUND CHAPTER 1 UNCOVERED. With eight
   * entries and eight chapters the table reads as a one-to-one mapping, and it silently had two for
   * Monopoly, two for Perfect Competition and none for Efficiency and Concentration — the chapter
   * whose two ideas students conflate most often. This is that entry, and it is first because the
   * confusion it describes runs through every chapter after it.
   */
  mistake('Using the two static efficiencies interchangeably',
    'Writing that a firm "is efficient" or "is inefficient" without saying which test, or answering an allocative-efficiency question with the lowest point of average cost.',
    `They ask different questions and they fall at different outputs. Productive efficiency is about COST and is a property of the cost curves alone: the lowest attainable average cost, ${money(COSTS.minAc)} at ${qty(COSTS.atMinAc.q)} ${COSTS.units} for this section's grower. Allocative efficiency is about the MIX of goods and depends on the PRICE: it holds where P = MC, which at a market price of ${money(M.shortRun.price)} is ${qty(M.shortRun.q)} ${COSTS.units} and at another price would be somewhere else. A firm can pass either test and fail the other.`,
    'Name the test before you judge the firm, and name what each one compares: average cost against its own minimum, or price against marginal cost.'),
  mistake('Reading the monopoly price off the marginal revenue curve',
    'Finding the output where MR = MC, going straight up to the MR curve and calling that height the price.',
    `MR = MC locates the OUTPUT and nothing else. The price is what buyers will pay for that quantity, which is on the DEMAND curve. For a monopolist facing P = ${Z.a} ${'−'} ${Z.b}Q with marginal cost ${money(Z.mc)}, the output is ${qty(Z.qm)} ${Z.units} and the price is ${money(Z.pm)}; reading it off MR gives ${money(Z.mc)}, which is marginal cost, and makes the firm look as though it earned nothing.`,
    'Go up from the profit-maximising quantity to AR, then across to the price axis. On a monopoly diagram the price is always the higher of the two heights above that output, and the gap between them is exactly why price exceeds marginal cost.'),
  mistake('Treating normal profit as making no money',
    'Writing that a firm earning normal profit "makes no profit" and concluding that it will leave the industry.',
    'Normal profit is total revenue exactly covering total cost, and that cost figure already includes what the owners could have earned elsewhere. A firm earning it is covering every cost it has, including its owners’ required return, so there is no better use of those resources and no reason to leave.',
    'Write that normal profit is the minimum return needed to keep the firm in this line of business, and that it shows as zero on the profit line because the return is counted inside the average cost curve.'),
  mistake('Reading "monopolistic competition" as a kind of monopoly',
    'Answering a question on monopolistic competition with high barriers to entry, one dominant firm and long-run supernormal profit.',
    'The name is misleading and the structure is nearly the opposite. Monopolistic competition has MANY firms, FREE entry and normal profit in the long run. The only feature it shares with monopoly is a downward-sloping demand curve, and in monopolistic competition that curve is highly elastic because substitutes are close.',
    'Read the name as "competition among many differentiated sellers". If an answer has barriers to entry or lasting supernormal profit in it, the question was about oligopoly or monopoly.'),
  mistake('Confusing predatory pricing with limit pricing',
    'Calling any unusually low price by a large firm predatory, or describing a limit price as a loss the incumbent absorbs.',
    `The two differ in whose cost the price is below. A predatory price is below the SELLER's own average variable cost — ${money(PR.predatory)} against an average variable cost of ${money(PR.incumbentAvc)} — so the firm is deliberately losing ${money(Math.abs(PR.predatoryLossPerUnit))} a unit to remove a rival. A limit price is below an ENTRANT's average cost and above the incumbent's own, so the incumbent earns ${money(PR.limitMarginIncumbent)} a unit throughout and never makes a loss.`,
    'Name the cost the price is being compared with before you name the practice. Below the seller’s own average variable cost: predatory. Below an entrant’s average cost but above the seller’s own: limit pricing.'),
  mistake('Shutting a firm down as soon as it makes a loss',
    'Concluding that a firm whose price is below average cost should stop producing immediately.',
    `A loss means the price is below average cost, but in the short run the fixed cost is owed whether the firm produces or not, so producing only has to beat stopping. While the price is above average variable cost, every unit sold leaves something towards the fixed cost. At ${money(M.minAvc)} the two come to exactly the same thing: the loss is ${money(Math.abs(M.shutdown.profit))} either way.`,
    'In the short run compare price with average VARIABLE cost and produce while P ≥ AVC. In the long run there is no fixed cost left to contribute towards, so the test becomes P ≥ AC.'),
  mistake('Assuming collusion succeeds whenever firms want it to',
    'Writing that a few firms in a market "will collude" and treating the high price as the predicted outcome.',
    `Wanting to collude is not the constraint; holding the agreement together is. Every member gains by breaking it while the others keep it — ${qty(G.temptation)} more in the two-firm game — so an arrangement nobody can police collapses whatever the firms intended. That is why collusion needs few firms, similar costs, stable demand and detectable cheating.`,
    'Say what makes collusion more or less likely in THIS market, and name detection as the condition. Oligopoly permits collusive and non-collusive behaviour equally, which is why interdependence predicts no single outcome.'),
  mistake('Defining a contestable market by low barriers to entry alone',
    'Writing that a market is contestable "because it is easy for new firms to enter".',
    'Exit matters as much as entry. A firm deciding whether to enter is weighing what entry costs IF IT FAILS, so where the spending cannot be recovered the entry is a commitment rather than an experiment — and it will hesitate. That is why the specification asks separately for the significance of sunk costs, and why a market with modest but entirely sunk entry costs can be less contestable than one with large recoverable ones.',
    'Give both conditions and then name the sunk costs: easy entry, easy exit, and assets that can be sold or redeployed. Hit-and-run entry is only possible where all three hold.'),
  mistake('Concluding that monopoly is "always" against the consumer interest',
    'Answering a 20-mark question on monopoly with the welfare loss, X-inefficiency and a recommendation to break the firm up.',
    `The static case is strong and measurable — here ${money(Z.dwl)} a day of welfare loss on top of the ${money(Z.profit)} transferred from consumers. But where average cost falls across the whole market, one firm supplies at ${money(NAT.one)} a unit where two would need ${money(NAT.two)}, so splitting it raises the price; and supernormal profit is where dynamic efficiency is funded. Neither exception is automatic, which is what keeps them arguments rather than conclusions.`,
    'Set the certain static loss against the conditional dynamic gain and say what the judgement depends on in the market you have chosen. That is why policy usually regulates a monopoly’s price or removes its barrier rather than breaking it up.'),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */
/*
 * SIX CHAINS, ONE FOR EACH REORDER RECALL, AND THEY LIVE HERE BECAUSE THAT IS THE POINT. `topFix-04`
 * asks for reorders built from the section's flows; `lib/learn-steps.js:10` renders a recall beneath
 * the teaching on the same step, so a reorder sourced from a flow on that step has its answer
 * printed above it in order. Packet 25 banned the verbatim form, packet 27 reproduced it five times
 * in paraphrase and Layer 6 caught three. The fix is structural: this section authors NO flow bodies,
 * and every reorder's sequence is taught in a chain in the Extras tab, which a student reaches
 * separately and never sees beside the recall.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a high price to normal profit in perfect competition',
      steps: [
        `The market price is ${money(M.shortRun.price)} a ${M.unit}, and each grower produces where marginal cost reaches it: ${qty(M.shortRun.q)} ${M.units} ${M.per}.`,
        `Average cost at that output is ${money(M.shortRun.ac)}, so each grower earns supernormal profit of ${money(M.shortRun.profit)}.`,
        'Perfect information means every firm outside the industry can see that profit, and free entry means nothing stops them acting on it.',
        'New growers enter, so the industry supply curve shifts right and the market price falls.',
        'Each grower’s horizontal demand line falls with the market price, and its supernormal profit shrinks.',
        `Entry stops only when supernormal profit has gone — at the lowest average cost, ${money(M.minAc)}.`,
      ],
      result: `Long-run equilibrium at ${qty(M.longRun.q)} ${M.units} and ${money(M.minAc)}, where P = MR = MC = AC and profit is ${money(M.longRun.profit)}. Had the price started below ${money(M.minAc)}, exit would have driven it up to the same place.`,
    },
    {
      title: 'How entry removes a differentiated firm’s supernormal profit',
      steps: [
        `${NI.name} maximises profit where MR = MC at ${qty(NI.short.q)} ${NI.units}, charging ${money(NI.short.price)} off its demand curve and earning ${money(NI.short.profit)}.`,
        'Firms outside the market see that profit, and low barriers mean they can begin trading.',
        'What they bring to market is not an identical product but a CLOSE SUBSTITUTE, so each existing firm loses some customers to them.',
        'The remaining customers are also more willing to switch, so the firm’s demand curve both shifts left and becomes flatter.',
        `Entry continues until the demand curve just touches the average cost curve at one point: P = ${NI.long.a} ${'−'} ${NI.b}Q, tangent at ${qty(NI.long.q)} ${NI.units}.`,
        `At that tangency price equals average cost at ${money(NI.long.price)}, so profit is ${money(NI.long.profit)} and entry stops.`,
      ],
      result: `The tangency sits on the FALLING part of average cost, so the firm produces ${qty(NI.excessCapacity)} ${NI.units} below the lowest-cost output of ${qty(NI.productiveOutput)} and its price ${money(NI.long.price)} stays above marginal cost ${money(NI.long.mc)}. Neither static efficiency holds, and variety is what the market gets instead.`,
    },
    {
      title: 'Why a cartel comes apart',
      steps: [
        'The members agree to restrict total output so that the price rises towards the level a single monopolist would charge.',
        'Each member is given a quota, and that quota is below the output it would choose for itself at the agreed price.',
        `The high price is what makes selling above quota attractive: in the two-firm game, breaking the agreement while the other keeps it pays ${qty(G.temptation)} more than sticking to it.`,
        'Every member faces the same incentive, and each knows the others face it too.',
        'A member that exceeds its quota pushes total output up and the price down, and the loss falls on the members who kept to theirs.',
        'Unless the cheating can be detected and punished, the members who kept the agreement stop keeping it.',
      ],
      result: `Total output returns towards the competitive level and the firms end at ${qty(G.cutCut[0])} each rather than the ${qty(G.holdHold[0])} the agreement promised — ${qty(G.jointLoss)} worse between them. Which is why collusion survives on detection rather than on intention.`,
    },
    {
      title: 'Why a single buyer pays less than a competitive market would',
      steps: [
        `The supply of ${MS.input} slopes upward: more are willing to work at a higher wage, w = ${money(MS.w0)} + ${MS.slope}L.`,
        'The buyer is the only one in the market, so that supply curve is the AVERAGE cost of what it buys.',
        'To attract one more worker it must raise the wage for every worker it already employs, not only for the last one.',
        `So the MARGINAL cost of labour rises at twice the gradient of supply: ${money(MS.w0)} + ${MS.slope * 2}L, lying above the supply curve at every level.`,
        `The buyer hires while that marginal cost is below the marginal revenue product, stopping where the two are equal at ${qty(MS.mono.l)} ${MS.input}.`,
        `The wage it then pays is whatever will attract that many workers, read off the SUPPLY curve: ${money(MS.mono.wage)}.`,
      ],
      result: `A competitive market for the same labour would settle where supply meets marginal revenue product: ${qty(MS.comp.l)} ${MS.input} at ${money(MS.comp.wage)}. So the monopsonist employs ${qty(MS.jobGap)} fewer at ${money(MS.wageGap)} a worker less, and the last worker it hires adds ${money(MS.mono.mrp)} while being paid ${money(MS.mono.wage)}.`,
    },
    {
      title: 'How the threat of entry disciplines an incumbent',
      steps: [
        'An incumbent in a market with low sunk costs raises its price and begins to earn profit above the normal level.',
        'Perfect information means firms outside the market can see that profit, and low barriers mean entering is cheap.',
        'Because exit is also easy, entering is a reversible experiment rather than a commitment, so a firm is willing to try it.',
        'A new firm enters, takes some of the profitable business and competes the excess profit away.',
        'When the profit is gone the entrant leaves, carrying its assets to another market — hit-and-run entry.',
        `Foreseeing all of this, the incumbent holds its price low enough that entering would not be worth the trouble: a limit price of ${money(PR.limit)} rather than the profit-maximising one.`,
      ],
      result: 'Profit tends towards the normal level and price towards a limit price even with very few firms in the market, and no entrant has to appear for it to happen. The discipline lasts only while sunk costs stay low — which incumbents can change, by spending on a brand, building capacity ahead of demand or signing long exclusive contracts.',
    },
    {
      title: 'How a price war starts and how it ends',
      steps: [
        'One firm lowers its price to win customers from its rivals, knowing the cut is visible to them within hours.',
        `The rivals match the cut to keep their own customers, because cutting is the better reply whatever the first firm does: ${qty(G.cutCut[0])} against ${qty(G.holdCut[0])}.`,
        'The first firm now has its original market share back, and is selling it at a lower price than before.',
        'So it cuts again, and the rivals match again, and each round leaves every firm selling at a price none of them chose.',
        `Losses mount for whichever firm has the highest costs or the shallowest reserves, and eventually that firm withdraws or is bought.`,
        'Or one firm raises its price and waits to see whether the others follow it back up — price leadership, doing the opposite job.',
      ],
      result: 'Consumers gain while the war lasts. If it ends with a firm leaving, the market is more concentrated afterwards and the survivors face less pressure, so the price can settle above where it began — which is why a price war is not simply a benefit to consumers.',
    },
  ],
  /*
   * TWO JUDGEMENT FRAMES, AND THEY GO UNDER `evaluation` WITH A `content` STRING — NOT UNDER
   * `chains` WITH A `points` ARRAY. `ExtrasTab.jsx:29` renders every entry of `data.chains` and
   * `:62` calls `chain.steps.map(...)` on it with no guard, so a chain carrying `points` instead of
   * `steps` throws a TypeError and takes the whole Extras tab down. Packet 28's third chain does
   * exactly that; it is staged and not published, so no student has met it, and it would go live at
   * the ship checkpoint. Measured by running `ExtrasTab`'s own expression over both bundles: its
   * chain 2 throws, all six below render. Filed for the founder rather than fixed here, because
   * editing another packet's module leaves its staged draft stale (DECISIONS, 16 September), and
   * the runner carries a check so this section cannot repeat it.
   *
   * `evaluation` entries render as `{title, content}` with the content in a single paragraph, which
   * is why these are prose rather than lists. `reorder.source` only offers `chains[].steps` as a
   * candidate sequence, so neither of these can accidentally source a reorder — correct, since
   * neither is an order.
   */
  evaluation: [
    {
      title: 'Is this concentrated market actually a problem?',
      content: `Five questions, and the concentration ratio only answers the first. What is the ratio, and for which n? A CR3 of ${pct(CR.cr3)} beside a CR5 of ${pct(CR.cr5)} describes a market with a clear top tier; a CR5 of ${pct(CR.twin.cr5)} with a CR3 of only ${pct(CR.twin.cr3)} describes five near-equals, and the two behave differently. Are the firms interdependent in practice — do their prices move together, and is there any sign of an agreement or of one firm leading? Could a firm outside enter, and leave again: what share of the entry cost would be recoverable, and has an incumbent been raising it deliberately through brand spending or capacity built ahead of demand? Is this structure the cheapest way to supply the market at all — where average cost falls across the whole of demand, splitting output raises the price rather than lowering it. And what is the profit being used for? Supernormal profit funding investment is a different case from supernormal profit sitting beside costs nothing is forcing down.`,
    },
    {
      title: 'Choosing the right efficiency test for the question',
      content: `Four tests, and naming the wrong one wastes the answer. If the question is about the price a buyer pays against what the last unit cost to make, the test is allocative efficiency and the comparison is P against MC. If it is about whether the output is being produced as cheaply as it could be, the test is productive efficiency and the answer is a point on the average cost curve — the bottom of it. If it is about waste, overtime nobody checks or costs that nothing forces down, the test is X-inefficiency, and the firm is sitting above its cost curve rather than at the wrong point on it. And if it is about the product or the cost improving over time, the test is dynamic efficiency, which no single diagram can show — so the argument has to be about what funds the improvement and whether the firm has any reason to make it. A structure can fail one test and pass another, which is why an answer calling a market "inefficient" without naming the test has not yet said anything.`,
    },
  ],
};
