/**
 * PACKET 41 — external-influences: the quiz bank, twelve practice items, the flashcards, the
 * common mistakes and the extras.
 *
 * ════ THE QUIZ ════
 *
 * `topFix-01`, `quiz-02`, `quiz-03`, `structure-02` and `structure-04` are five readings of one
 * bank, and every one of them is answered structurally rather than by hand, because a hand fix
 * leaves the next edit free to reintroduce the defect.
 *
 *   - *`structure-02`: the inline quiz mapping is wrong for EVERY block.* The Inflation chapter
 *     showed the exchange-rate question, the exchange-rate chapter showed the recession question,
 *     and so on down all five. Every pin here is DERIVED from the item's own `block` tag (packet
 *     30's method), so a chapter cannot show a question about another chapter's content and no
 *     hand-maintained index array exists to drift.
 *   - *`structure-04`: only 5 of 25 items are ever surfaced inline; 20 are seen only in the
 *     pre-test/post-test lottery.* Twenty-five of the twenty-eight items below are pinned to the
 *     chapter that teaches them, so a student meets them in Learn Mode rather than by chance.
 *   - *`structure-04`, second half, and `quiz-03`: the five hedged "Evaluate/To what extent" MCQs
 *     (Q20-Q24) can appear in the three-question pre-test and are guessable.* No stem here opens
 *     with an essay command word — `quiz.essay-stem` would refuse it — and the three unpinned
 *     pre-test items are all answerable from the opening chapter, which every student reaches
 *     before anything else.
 *   - *`quiz-02`: Q5's option "increasing inventory to prepare for future price rises" is also a
 *     legitimate response to anticipated inflation, so the item has two defensible answers.* It is
 *     right, and buying ahead is TAUGHT here as one of the four responses rather than being used
 *     as a distractor. No item in this bank asks "which is the best response"; the items about
 *     responses ask what a named response DOES, which has one answer.
 *   - *`topFix-01`: the Q15 currency typo.* Already closed as `quiz-01`, confirmed outside this
 *     packet. It cannot recur: every rate in this bank is printed by `fx()` from the two numbers
 *     in `_packet41-util.mjs`, so a quotation that is not a quotation of anything is not writable.
 *
 * ════ THE PRACTICE ════
 *
 * `practice-01` and `topFix-05`. The live 20-marker is *"Evaluate the view that businesses should
 * always prioritise shareholders over other stakeholders"* — a stakeholders and objectives
 * question, pinned to no chapter, marked per point rather than by levels, and with no source. It
 * is replaced, not repaired.
 *
 * **Both of `topFix-05`'s structural demands are met and one of its tariffs is refused.** All
 * twelve items below are anchored to `EXTRACT`, a short source about one international firm,
 * because PROTOCOL.md's canonical table says Business Units 1 and 2 are entirely source-based.
 * Guidance is two paragraphs throughout: the first is the scaffold a student sees above an empty
 * box in guided mode and carries no figure, no mark allocation and no answer; the mark scheme is
 * paragraph two onward (`practice.opening`). Items above 6 marks are levelled and carry no point
 * allocation (`practice.levels`).
 *
 * The refusal: `topFix-05` asks for a "10/12-mark Assess". **Appendix 6 (`bus_spec.txt:2238-2245`)
 * carries 12 for Units 3 and 4 only** — "Assess 10 [Units 1/2], 12 [Units 3/4]". This is WBS12.
 * Both Assess items here are 10, and a packet that had taken the finding at its word would have
 * shipped a tariff that does not exist on this paper. Packet 36 refused the same clause on the
 * same line; it is recorded again because the finding text is still in the ledger.
 *
 * Every statement about what a command word requires is a statement about APPENDIX 6, which is
 * citable, and never a claim about what a marker credits (`MARK_CLAIM`, packet 17, re-affirmed by
 * packets 29, 30, 35 and 36). `accuracy-02` and `accuracy-03` are both of that shape — "you must
 * know the key provisions", "examiners frequently use Porter's Five Forces" — and neither survives.
 */
import {
  id, hash8, money, qty, pct, pts, fx, units, yrs, andList,
  FIRM, LEGISLATION_AREAS, COMPETITION_DIMENSIONS, IP_RIGHTS,
} from './_packet41-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet41-content.mjs';

const F = FIRM;

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position. The live
 * bank's `quiz.histogram` finding is what hand-picked positions produce; ranking items by a hash of
 * their own stem and taking the rank modulo four gives an even spread that is stable across builds
 * and that nobody had to choose.
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
   * All three are answerable from the opening chapter, which every student reaches before anything
   * else. Packet 38's Verify B found the signed-out pre-test asking about chapters the student has
   * not opened on 22 of 43 live sections; this is the half of that a content packet can control.
   */
  qi(null, 'An external influence on a business is best described as:',
    ['a change outside the business that it cannot prevent and has to respond to',
      'a decision taken by the owners that affects the whole business',
      'any cost that the business is unable to reduce this year',
      'a change in the way the business organises its own production'],
    'The test is whether the business could have stopped it happening. A currency movement or a new rule arrives whatever the firm does; what it chooses in reply is the response, which is the second half of what this topic asks about.'),
  qi(null, 'Inflation is best defined as:',
    ['a sustained rise in the general level of prices',
      'a rise in the price of the goods one business buys',
      'the amount by which wages rise in a year',
      'a fall in the value of one currency against another'],
    'It is a rate at which prices in general are rising, not a movement in one firm\'s own input prices and not a movement between two currencies. Wages are one price among many and rise with inflation rather than defining it.'),
  qi(null, 'A business responds to an external influence rather than simply reporting it because:',
    ['the requirement names the effect and the response as two halves of one thing',
      'a change is reversed once enough businesses act together against it',
      'responding removes the effect of the change entirely',
      'the change only affects businesses that choose to react to it'],
    'The requirement is written as the effect on businesses of, and how they can best respond to, changes. A response rarely removes the effect and never reverses the change; it decides how much of it reaches the profit.'),

  /* ── Chapter 1 · Inflation and Exchange Rates ─────────────────────────── */
  qi(B1, `A firm has revenue of ${money(F.revenue)}, cost of sales of ${money(F.costOfSales)} and other operating expenses of ${money(F.operatingExpenses)}. Input prices rise ${pct(F.inflation)} and it holds its price and volume. Its operating profit becomes:`,
    [money(F.inflationProfit), money(F.operatingProfit), money(F.inflatedCostOfSales), money(F.inflationProfitWithWages)],
    `Only the cost of sales moves: ${money(F.costOfSales)} becomes ${money(F.inflatedCostOfSales)}, which is ${money(F.inflationCostRise)} more, and the whole of it comes off the profit because nothing else changed. The figure it started from was ${money(F.operatingProfit)}, and the lowest option assumes a wage claim the question never mentioned.`),
  qi(B1, `Why does ${pct(F.inflation)} on the cost of sales take ${pct(F.inflationProfitFall)} off the operating profit?`,
    ['because the profit is a small share of revenue, so a cost rise is a large share of the profit',
      'because inflation raises every cost the business has, not only the cost of sales',
      'because the business has to raise wages by the same percentage',
      'because customers buy fewer units once prices rise'],
    'The multiplier is the size of the profit relative to the revenue. A cost rise is a fixed number of dollars, and the smaller the cushion it lands in, the larger a share of that cushion it is. The other three describe further effects that this calculation deliberately held still.'),
  qi(B1, 'A business facing rising input prices decides to sign a twelve-month fixed-price supply contract. What it gives up is:',
    ['the lower price if input prices fall during the year',
      'the ability to change its own selling price',
      'any discount for buying in larger quantities',
      'the right to change supplier at the end of the year'],
    'A fixed price removes the uncertainty in both directions, so the cost of certainty is the favourable half of the range. The contract says nothing about what the firm charges its own customers, about quantity discounts, or about what happens when it expires.'),
  qi(B1, `A firm imports material invoiced at ${units(F.importInvoice)}. The rate moves from ${fx(F.e0)} to ${fx(F.e1)}. The bill in home currency:`,
    [`rises from ${money(F.importedMaterials)} to ${money(F.importAtE1)}`,
      `falls from ${money(F.importedMaterials)} to ${money(F.importAtE2)}`,
      `stays at ${money(F.importedMaterials)}, because the invoice is unchanged`,
      `rises from ${money(F.importedMaterials)} to ${money(F.exportAtE1)}`],
    `Each home dollar now buys fewer of the units the invoice is written in, so more dollars are needed to settle the same invoice: divide the foreign invoice by each rate and compare. The bill falls only if the home currency has strengthened, and an unchanged invoice is exactly why the home-currency cost has to move.`),
  qi(B1, `A home currency falls by ${pct(F.depreciationPct)}. The cost of goods invoiced abroad rises by:`,
    [pct(F.importRisePct), pct(F.depreciationPct), pct(F.depreciationPct / 2), pct(F.depreciationPct * 2)],
    `The two percentages are taken from different bases, which is why they are never the same number. A fall of a fifth in what the money buys means the same goods take a quarter more money, and the effect of a rise runs the other way and is smaller than the rise itself.`),

  /* ── Chapter 2 · Interest Rates, Taxation and Government Spending ─────── */
  qi(B2, `A firm owes ${money(F.loan)} and its borrowing rate rises by ${pts(F.rateRise)}. Its operating profit:`,
    [`is unchanged, because interest is taken off below that line`,
      `falls by ${money(F.interestExtra)}, the extra interest`,
      `falls by ${money(F.interest)}, the whole interest bill`,
      `falls by ${money(F.demandChannel)}, because customers buy less`],
    `Interest sits between operating profit and what is left for the owners, so the trading result is the same however the business was financed. The extra ${money(F.interestExtra)} reduces the line below, and the demand effect is a separate chain that needs the firm's customers to have changed their minds.`),
  qi(B2, 'For most businesses, the larger effect of a rise in interest rates comes through:',
    ['customers who postpone purchases they would have borrowed for',
      'the cost of servicing the firm\'s own borrowing',
      'the higher return the firm earns on cash in the bank',
      'the wages the firm has to pay to keep its staff'],
    'A firm with no debt at all still loses the customers who cannot borrow, and for most firms that is much the bigger number. Servicing its own debt is the channel every answer names and the smaller one; interest received and wages are unaffected by the demand chain entirely.'),
  qi(B2, 'An employer payroll charge on wages is different from a tax on profits because it:',
    ['is a cost of employing people and sits inside the operating expenses',
      'is collected from the customer at the point of sale',
      'is only paid by businesses that make a profit that year',
      'is charged after the last line of the statement'],
    'A charge on wages is a cost of production, so it reduces the operating profit whatever the year turns out like. A tax on profits is charged after the last line and only where there is a profit, and neither of them is collected at the till.'),
  qi(B2, `An indirect tax on sales rises from ${pct(F.salesTax0)} to ${pct(F.salesTax1)}. A ${money(F.price)} item now costs the buyer:`,
    [money(F.buyerPrice1), money(F.buyerPrice0), money(F.price), money(F.nichePrice)],
    `The tax is added to the price the seller sets, so the till price moves while the firm still receives ${money(F.price)}. The lower figure is the old till price and the middle one is what the business keeps either way; what the firm actually feels is whatever the higher till price does to the quantity sold.`),
  qi(B2, 'A shop that has never held a public contract is still affected by a cut in government spending because:',
    ['the people paid by the state spend less in shops like it',
      'it will have to pay a higher rate of tax to make up the difference',
      'public contracts are the only reliable source of business revenue',
      'the cut applies to private businesses in the same proportion'],
    'Public salaries and pensions are spent in ordinary shops, so the spending reaches firms that never sell to the state. A spending cut is not a tax rise and does not apply to a private firm\'s own budget at all.'),

  /* ── Chapter 3 · The Business Cycle ───────────────────────────────────── */
  qi(B3, 'In which phase of the business cycle is a manufacturer most likely to report that it cannot hire the skilled staff it needs?',
    ['When output is above its long-run path',
      'When growth is slowing from a high level',
      'When output is below its long-run path',
      'When output is climbing back towards the path'],
    'Labour is scarce when everybody is busy, so the wage is bid up by whichever firm needs the worker most. In the phases below the path there are people looking for work, and in a recovery the shortage is beginning rather than acute.'),
  qi(B3, 'Why does a small movement in an economy\'s output produce a much larger movement in a furniture maker\'s orders?',
    ['because buying furniture can be put off for a year at no cost to the buyer',
      'because furniture makers have higher costs than most other businesses',
      'because furniture prices rise faster than prices in general',
      'because furniture is bought mainly by other businesses'],
    'A purchase that can be postponed is postponed first, so the swing in this kind of demand is far wider than the swing in the economy. Who the buyer is and what the seller\'s costs are decide how painful that swing is, not how large it is.'),
  qi(B3, `A firm has fixed costs of ${money(F.operatingExpenses)} and keeps ${money(F.contribution)} from each ${money(F.price)} ${F.unit} after its materials. Its profit reaches zero at annual revenue of:`,
    [money(F.breakEvenRevenue), money(F.operatingExpenses), money(F.revenue), money(F.recessionProfit)],
    `Each ${F.unit} leaves ${money(F.contribution)} of its ${money(F.price)} price, so the fixed costs are covered once enough of them have been sold: ${qty(F.breakEvenUnits)} of them, which at ${money(F.price)} each is the revenue in the key. The fixed-cost figure on its own is not a revenue, and the other two are this firm\'s actual result in a normal and a bad year.`),
  qi(B3, 'Which business is most likely to grow during a downturn?',
    ['A shop selling discounted clothing',
      'A company fitting out new offices',
      'An agency selling long-haul holidays',
      'A dealer in imported sports cars'],
    'Customers being careful with money move towards the cheaper option rather than stopping altogether, so a discounter gains the trade the others lose. The other three all sell purchases a worried customer can simply decide not to make this year.'),

  /* ── Chapter 4 · Legislation ──────────────────────────────────────────── */
  qi(B4, 'A retailer describes a jacket as waterproof when it is only shower-resistant. The consumer-protection idea this breaches is that goods must:',
    ['match the description they were sold under',
      'be of satisfactory quality',
      'be fit for the purpose stated by the buyer',
      'carry a written guarantee of their performance'],
    'The jacket may be well made and may work perfectly at what it does, so nothing about its quality is in question. The breach is the gap between the words used to sell it and the thing delivered, and no separate written guarantee is needed for that to matter.'),
  qi(B4, 'Which is a genuine cost to an employer of stronger employee protection?',
    ['Written terms and records for every person hired',
      'Losing trained staff more often than before',
      'Paying to advertise posts that used to fill themselves',
      'Higher prices charged by its own suppliers'],
    'Contracts, records and the administration around them are new spending the firm did not previously do. Better protection tends to reduce turnover and recruitment spending rather than raise them, and what suppliers charge is a different question entirely.'),
  qi(B4, `A plant trades ${qty(300)} days a year on revenue of ${money(9000000)} and spends ${money(45000)} a year on safety. An accident closes the line for ${qty(8)} days. The output lost is:`,
    [money(240000), money(45000), money(30000), money(360000)],
    `A trading day is worth ${money(30000)}, so eight of them is the figure in the key — more than five times what a whole year of prevention costs. The safety budget and the value of a single day are both given in the question rather than being the answer to it.`),
  qi(B4, 'Which environmental requirement constrains what a business may SELL rather than how it may produce?',
    ['An efficiency rating the product must reach to be listed',
      'A cap on what the chimney may release',
      'A permit required before the plant may run at night',
      'A charge on each tonne sent to landfill'],
    'A rating attaches to the item itself, so complying means redesigning what is sold. The other three all bite on the process inside the factory gate, where the firm can comply by changing how it makes the same thing.'),
  qi(B4, 'Two small rivals agree in advance what each will quote for the same contract. Competition policy treats this as:',
    ['an agreement between competitors, which is prohibited whatever their size',
      'acceptable, because neither firm is large enough to dominate the market',
      'abuse of a dominant position by whichever firm wins',
      'a merger, and therefore something that needs approval first'],
    'The prohibition is aimed at the conduct rather than at the size of the firms doing it; being small changes the penalty and not whether the rule applies. Abuse of a dominant position needs a firm large enough for the conduct to work, and nothing here combines two businesses.'),
  qi(B4, 'Which intellectual property right can be renewed without limit for as long as the business uses it?',
    ['A trademark', 'A patent', 'Copyright in the product drawings', 'A design filed at the same time as the patent'],
    `A registered brand identifier can be renewed for as long as it is in use, which makes it the only one of these that need never expire. A patent runs up to ${yrs(F.patentYears)} from filing and copyright lasts for decades and then ends.`),

  /* ── Chapter 5 · The Competitive Environment ──────────────────────────── */
  qi(B5, 'A business competing with forty small rivals rather than two large ones is most likely to find that:',
    ['it controls very little of the price it charges',
      'each individual customer is a large share of its order book',
      'competitive moves are aimed directly at it',
      'it can raise prices without losing any customers'],
    'A buyer who can collect forty quotes sets the price and the seller accepts it. Concentrated risk and moves aimed at one firm are what a market with two rivals produces, and no market with forty sellers lets one of them raise prices freely.'),
  qi(B5, `A larger rival's cost of sales is ${money(F.rivalUnitCost)} a ${F.unit} against a small firm's ${money(F.unitCost)}. The main reason is that it:`,
    ['buys in quantities its suppliers will discount',
      'employs people who work harder for the same wage',
      'pays less tax on the profit it makes on each unit',
      'sells at a higher price and so can afford better materials'],
    'Most of the gap comes from the order size rather than from how well either firm is run, which matters because it tells the smaller firm that matching the price is arithmetic it loses. Tax is charged after this line and a higher selling price would not lower a cost.'),
  qi(B5, `A rival cuts its price to ${money(F.warPrice)}. A firm whose materials cost ${money(F.unitCost)} a ${F.unit} and whose fixed costs are ${money(F.operatingExpenses)} would need to sell, to break even at the lower price:`,
    [`${qty(F.breakEvenUnitsWar)} ${F.unit}s, against ${qty(F.breakEvenUnits)} before`,
      `${qty(F.breakEvenUnits)} ${F.unit}s, the same number as before`,
      `${qty(F.units0)} ${F.unit}s, the number it already sells`,
      `${qty(F.holdUnits)} ${F.unit}s, because volume falls with the price`],
    `Each sale now leaves ${money(F.warContribution)} instead of ${money(F.contribution)}, so the fixed costs need many more of them: divide the fixed costs by what one sale leaves at each price. The number cannot stay where it was, and the lower figures are what the firm sells rather than what it would need to.`),
  qi(B5, 'Holding the old price and losing a fifth of the volume often beats matching a rival\'s price cut because:',
    ['no cost falls when a price is cut, so the whole reduction comes off the profit',
      'customers who leave over price always come back within the year',
      'a lower price damages the reputation of the product permanently',
      'the rival will be forced to withdraw its cut once volume moves'],
    'Cutting a price reduces the revenue on every unit while the materials still cost what they cost, so the reduction lands entirely on the profit. Losing volume at least takes the material cost away with it. The other three are assertions about what rivals and customers will do next.'),
  qi(B5, 'The most effective way for a small firm to compete with a much larger rival is usually to:',
    ['specialise in a segment too small for the larger firm to pursue',
      'match the larger firm\'s price on its best-selling lines',
      'advertise in the same places the larger firm advertises',
      'extend its range until it carries everything the larger firm carries'],
    'A narrow segment can be large enough to fill a small workshop and too small to interest a firm that needs volume. The other three all compete on exactly the ground the larger firm\'s size was bought for.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */
/*
 * `practice.no-command`, `practice.command` and `practice.tariff` are all BLOCK, and the tariffs
 * are Appendix 6's own: Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8,
 * Assess 10 (Units 1 and 2), Evaluate 20. The runner parses that table OUT of `bus_spec.txt` rather
 * than importing `lib/ial-marking.js`, because a check that reads what the fix read cannot see the
 * fix's blind spot — which is how `topFix-05`'s "10/12-mark Assess" is refused against the
 * document rather than against a comment.
 */
const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

/*
 * THE SOURCE. Business Units 1 and 2 are entirely source-based (PROTOCOL.md's canonical table), and
 * `practice-01`'s complaint is that the live 20-marker has no case-study context although every IAL
 * 20-marker is a data response. One extract carries every item, so a student meets the same firm
 * twelve times and the later questions can assume the earlier figures.
 */
export const EXTRACT = `Source A. ${F.name} ${F.what}. Last year it sold ${qty(F.units0)} ${F.unit}s at ${money(F.price)} each. Cost of sales was ${money(F.costOfSales)}, of which ${money(F.importedMaterials)} was timber and fabric invoiced abroad at ${fx(F.e0)}. Other operating expenses were ${money(F.operatingExpenses)}, including ${money(F.compliance)} of compliance spending. It owes ${money(F.loan)} at ${pct(F.interestRate)}. ${money(F.exportRevenue)} of its revenue is exported and ${money(F.publicRevenue)} is sold to government offices and schools. It competes with ${qty(F.smallRivals)} small workshops and ${qty(F.largeRivals)} large importers.`;

export const PRACTICE = [
  pr(B1, 'Define', 2, `${EXTRACT} Define the term 'inflation'. (2 marks)`,
    'Two marks means two separate things to say, and the second is not the first in other words. Settle what is rising, and then whether one movement is enough to count. An answer that says "prices going up" has offered one of the two and left the examiner to supply the rest.\n'
    + 'Inflation is a sustained rise in the general level of prices (1 mark), measured as a rate over a period rather than as a single increase (1 mark). An answer naming a rise in the prices one business pays has described a cost increase rather than inflation, and an answer describing a fall in the value of one currency against another has defined a depreciation.'),

  pr(B1, 'Calculate', 4, `${EXTRACT} The home currency moves to ${fx(F.e1)}. Calculate the new home-currency cost of the imported timber and fabric, and the percentage by which it has risen. (4 marks)`,
    'Start by turning the money figure you have been given back into the currency the invoice is actually written in, because that is the number that does not move. Then do the same division twice, once at each rate. Give the percentage from the right base, and say which figure you divided by.\n'
    + `The invoice is ${money(F.importedMaterials)} × ${qty(F.e0)} = ${units(F.importInvoice)} (1 mark). At the new rate the cost is ${units(F.importInvoice)} ÷ ${qty(F.e1)} = ${money(F.importAtE1)} (1 mark). The rise is ${money(F.importAtE1 - F.importedMaterials)} (1 mark), which on the original ${money(F.importedMaterials)} is ${pct(F.importRisePct)} (1 mark). An answer giving ${pct(F.depreciationPct)} has quoted the fall in the currency rather than the rise in the bill; the two are taken from different bases and are never the same number.`),

  pr(B1, 'Analyse', 6, `${EXTRACT} Analyse the likely effect on ${F.name}'s operating profit of a ${pct(F.depreciationPct)} fall in the home currency. (6 marks)`,
    'This firm is exposed on two sides at once, so an answer that follows only one of them has answered half the question. Work out which side is the larger before deciding what the overall effect is, and be careful to hold constant the things the question has not changed. Finish on the profit line rather than on the currency.\n'
    + `The chain: the imported material is invoiced abroad, so a weaker home currency raises its cost from ${money(F.importedMaterials)} to ${money(F.importAtE1)}, a rise of ${money(F.importAtE1 - F.importedMaterials)} (up to 3 marks for this chain developed). Against that, the ${money(F.exportRevenue)} of exports is worth ${money(F.exportAtE1)} at the new rate if the foreign price is held, a gain of ${money(F.exportAtE1 - F.exportRevenue)} (up to 3 marks). Netting the two gives operating profit of ${money(F.depProfit)} against ${money(F.operatingProfit)}. Appendix 6 states that Analyse requires a brief chain of reasoning with interpretation where data is given and does not include evaluation, so a judgement about what the firm should now do is not what is being asked for here.`),

  pr(B2, 'Calculate', 4, `${EXTRACT} Its borrowing rate rises by ${pts(F.rateRise)} and its orders fall ${pct(F.rateDemandFall)}. Calculate its operating profit and the profit left after interest. (4 marks)`,
    'Two things have moved and they land on two different lines, so decide which is which before calculating anything. Remember which costs move with the volume and which do not. Label both answers: two unlabelled numbers cannot be told apart.\n'
    + `Revenue falls to ${money(F.rateRevenue)} and cost of sales falls with the volume to ${money(F.rateRevenue * (F.unitCost / F.price))} (1 mark), leaving operating profit of ${money(F.rateDemandProfit)} once the unchanged ${money(F.operatingExpenses)} is taken off (1 mark). Interest becomes ${money(F.loan)} × ${pct(F.interestRate + F.rateRise)} = ${money(F.interestAfter)} (1 mark), so what is left is ${money(F.rateBothProfit)} (1 mark). An answer that reduces the other operating expenses along with the orders has treated a fixed cost as a variable one, which is what makes the swing in profit wider than the swing in revenue.`),

  pr(B2, 'Explain', 4, `${EXTRACT} Explain one way in which a cut in government spending could affect ${F.name}. (4 marks)`,
    'One way, developed all the way to the profit, beats four ways named. Choose the route the source actually supports for this firm, and then follow it step by step rather than asserting the outcome. The marks are for the chain, not for the number of possibilities listed.\n'
    + `Any one of these, developed: public offices and schools buy ${money(F.publicRevenue)} of its output, so a cut to those budgets removes revenue directly — a ${pct(F.publicCut)} cut is ${money(F.publicLost)} of revenue and takes operating profit to ${money(F.publicCutProfit)} (up to 4 marks); or public employees whose incomes fall spend less with its private customers, who then order fewer ${F.unit}s; or infrastructure that is postponed leaves its delivery costs where they were rather than lowering them. Appendix 6 states that Explain requires a brief explanation of cause or effect supported by details or examples, so the marks follow one mechanism through rather than rewarding the number of mechanisms named.`),

  pr(B2, 'Evaluate', 20, `${EXTRACT} A rise in interest rates, a fall in the home currency and a downturn in the economy are all thought possible next year. Evaluate whether the rise in interest rates is the greatest threat to ${F.name}. (20 marks)`,
    'This is a comparison, so it has to end with a ranking rather than with three descriptions. Build each threat properly first: what it does, how much of the cushion it takes, and how quickly. Then look for what separates them — some of these reach the firm through more than one route, and one of them can be survived for a year while another cannot. Watch for the threat that the question invites you to over-weight.\n'
    + 'The three threats are not independent: a downturn usually arrives with lower rates rather than higher ones, and a falling currency is often what a downturn does to a small economy, so an answer that treats them as three separate coins being tossed has missed how the cycle moves the other influences together.\n'
    + `Level 1 describes interest rates, currency movements and downturns with no reference to this firm. Level 2 applies each to the source: the rate rise costs ${money(F.interestExtra)} directly, the currency fall costs ${money(F.importAtE1 - F.importedMaterials)} of import cost against a ${money(F.exportAtE1 - F.exportRevenue)} export gain, and a downturn of the size this kind of demand usually shows takes operating profit towards ${money(F.recessionProfit)}. Level 3 develops the competing chains against each other: the rate rise has a second and larger route through customers who borrow, worth about ${money(F.demandChannel)}, so the case for it being the greatest threat is stronger than the ${money(F.interestExtra)} suggests; against that, the firm exports and the currency effect partly nets itself off, while the downturn takes revenue with nothing offsetting it and the fixed ${money(F.operatingExpenses)} does not move. Level 4 reaches the perceptive conclusion Appendix 6 states the command word requires: a ranking with a reason, most defensibly that the downturn is the greatest threat because it removes the revenue the other two are only redistributing, that the rate rise ranks second because most of its damage is the same demand effect arriving by another road, and that the recommendation would change if the firm's borrowing were much larger relative to its ${money(F.operatingProfit)} of operating profit.`),

  pr(B3, 'Construct', 4, `${EXTRACT} Construct a labelled diagram of the business cycle showing the four phases an economy passes through. (4 marks)`,
    'Decide first what each axis measures, because a picture with unlabelled axes cannot show a cycle in anything. There is a line the wave moves around, and leaving it out is the most common way this diagram goes wrong. Label the phases where they actually occur rather than in a list beside the drawing.\n'
    + 'A correct diagram has output on the vertical axis and time on the horizontal (1 mark), an upward-sloping long-run path drawn through the middle of the wave (1 mark), and an output line oscillating above and below that path (1 mark). A further mark is available for the four phases labelled in the right places: above the path, slowing, below the path, and climbing back. Appendix 6 states that Construct requires an accurately labelled diagram, so an unlabelled wave, however correct its shape, cannot receive the labelling marks.'),

  pr(B3, 'Assess', 10, `${EXTRACT} Assess how ${F.name} should prepare for a downturn in the economy. (10 marks)`,
    'Preparation is not free, so the answer has to say what each measure costs in a good year as well as what it saves in a bad one. Start from what makes this firm unusually exposed, because a general list of prudent habits is not an assessment of anything. The command word asks how it should prepare, which means the answer has to prefer some measures to others.\n'
    + `Level 1 lists sensible measures with no reference to the source. Level 2 applies them: this firm sells a purchase customers can postpone and carries ${money(F.operatingExpenses)} of costs that do not fall with the orders, so its profit reaches zero once revenue falls to ${money(F.breakEvenRevenue)} — a quarter of the way down. Level 3 builds competing chains: flexible capacity, a cash reserve and a spread of customers across exports, public orders and private buyers all reduce the exposure, and each costs something — agency and rented capacity cost more per ${F.unit} in a good year, cash held earns very little, and a spread of markets costs the focus that made the firm good at one. Level 4 reaches the supported judgement Appendix 6 states the command word requires: which measures this firm should buy first and why its own figures say so, most defensibly the reserve, because a firm with ${money(F.exportRevenue)} of exports and ${money(F.publicRevenue)} of public orders already has some of the spread and none of the cushion.`),

  pr(B4, 'Define', 2, `${EXTRACT} Define the term 'patent'. (2 marks)`,
    'Two marks, two distinct statements, and the easiest second one is about time or about how the right is obtained. Be precise about what a patent covers, because the whole mark is lost by describing one of the other two rights. An answer that says "it protects an idea" has described none of the three accurately.\n'
    + `A patent is a right protecting a new invention or process from being copied (1 mark), granted on application for a limited period of up to ${yrs(F.patentYears)} from filing (1 mark). An answer describing protection for a brand name or logo has defined a trademark, and one describing automatic protection for a created work has defined copyright.`),

  pr(B4, 'Discuss', 8, `${EXTRACT} It must fit dust extraction and buy certified timber to meet new environmental requirements. Discuss whether this legislation will harm the business. (8 marks)`,
    'The answer the question invites is the wrong one, so be careful. Work out what the requirement actually costs before deciding anything, and then ask who else in this market it applies to and what it might make possible. Treat "harm" as a question about this firm\'s competitive position rather than only about its costs this year.\n'
    + `Level 1 describes environmental legislation and its costs without applying it to the source. Level 2 builds one chain: the requirement is capital spending plus a recurring cost, and the certified timber costs more per cubic metre, so the compliance line of ${money(F.compliance)} rises and the ${money(F.operatingProfit)} of operating profit falls. Level 3 builds the competing chain and reaches the brief assessment Appendix 6 states the command word requires — the requirement applies to every seller in this market including the ${qty(F.largeRivals)} large importers, so the relative position may not change at all; several export customers now buy only certified timber, so the spending is a qualification for the ${money(F.exportRevenue)} of export revenue rather than only a cost; and against that, the firm has ${money(F.operatingProfit)} of cushion and the capital spending has to be found from somewhere. The assessment has to say whether this firm is harmed rather than list the two sides.`),

  pr(B5, 'Analyse', 6, `${EXTRACT} A large importer cuts its price to ${money(F.warPrice)}. Analyse the effect on ${F.name} of matching that price. (6 marks)`,
    'Settle first what a sale actually leaves this firm once its own materials are paid for, because everything else follows from that figure. Then be careful about which costs move when a price is cut and which do not. Carry the chain to the profit rather than stopping at the price.\n'
    + `The chain: no cost falls when a price is cut, so each ${F.unit} leaves ${money(F.warContribution)} instead of ${money(F.contribution)} (up to 2 marks). At the same volume of ${qty(F.units0)}, that is ${money(F.units0 * F.warContribution)} against fixed costs of ${money(F.operatingExpenses)}, so matching gives ${money(F.matchProfit)} — a loss (up to 2 marks). Break-even moves from ${qty(F.breakEvenUnits)} ${F.unit}s to ${qty(F.breakEvenUnitsWar)}, so the firm would need ${pct(F.warVolumeNeeded)} more sales in the middle of a price war simply to stand still (up to 2 marks). Appendix 6 states that Analyse requires a brief chain of reasoning and does not include evaluation, so a recommendation about what the firm should do instead belongs in a different question.`),

  pr(B5, 'Assess', 10, `${EXTRACT} Assess the ways in which ${F.name} could compete against the large importers without matching their prices. (10 marks)`,
    'Begin by establishing why matching the price is not available, because that is what makes the rest of the question worth asking. Then take the alternatives one at a time and say what each would actually require of this firm rather than naming it. The command word asks for a weighing, so the answer needs a reason for preferring one route.\n'
    + `Level 1 lists ways a small firm can compete with no reference to the source. Level 2 applies them: the importers' scale gives them a cost advantage of around ${pct(F.scaleGap)} a ${F.unit}, so a contest decided on price is lost by arithmetic, and the firm's own routes are specialisation, speed and flexibility, closeness to the customer, and a reputation it can protect. Level 3 develops the competing chains: bespoke work sells at ${money(F.nichePrice)} against a list price of ${money(F.price)} and leaves ${money(F.nicheGain)} more on ${qty(F.nicheUnits)} ${F.unit}s than standard stock would, but it needs different skills and cannot be scaled; speed and flexibility cost the long production runs that keep the unit cost down; and a protected design has to be worth protecting before the registration means anything. Level 4 reaches the supported judgement Appendix 6 states the command word requires: which route this firm should take and what in the source says so, with the strongest answers noting that the ${money(F.exportRevenue)} of exports shows it can already sell on something other than the lowest price.`),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */
/*
 * `structure-06` and `structure-07` again, from the other end: the live flashcards and notes
 * covered material `content[]` never taught. Every card below is generated from the same module
 * the teaching text is, and the runner refuses to build if a card leans on a term no subsection
 * teaches.
 */
const card = (front, back) => ({ id: id('card', front), front, back });

export const FLASHCARDS = [
  card('What is an external influence?', 'A change outside the business that it cannot prevent and has to answer. 2.3.5 asks for both halves: the effect on the business, and how it can best respond.'),
  card('Which four lines of a business does an external influence reach?', 'What it can charge, how many it sells, what its inputs cost, and what it pays to borrow. Naming the line is what turns a worry into an analysis.'),
  card('Define inflation.', 'A sustained rise in the general level of prices, measured as a rate. It is not a rise in one firm\'s own input prices, and it is not a movement between two currencies.'),
  card('Why does a small rise in costs produce a large fall in profit?', `Because the profit is a small share of revenue. ${pct(F.inflation)} on ${F.name}'s ${money(F.costOfSales)} of cost of sales is ${money(F.inflationCostRise)}, which is ${pct(F.inflationProfitFall)} of its ${money(F.operatingProfit)} operating profit.`),
  card('What are the four responses to rising input prices?', `Pass it on, absorb it, buy differently, or take cost out. Passing it on needs a ${pct(F.priceRiseToHold)} price rise here; absorbing it costs ${money(F.operatingProfit - F.inflationProfit)}; only taking cost out leaves the firm permanently better off.`),
  card('Why does inflation produce wage claims?', `Because a wage held still is a pay cut in what it buys. A claim of ${pct(F.inflation)} on a ${money(F.wages)} wage bill adds ${money(F.wageClaim)} and takes the year to ${money(F.inflationProfitWithWages)}.`),
  card('Define appreciation and depreciation.', 'An appreciation is the home currency buying more foreign currency than before; a depreciation is it buying less. The specification brackets both words beside "exchange rates".'),
  card('What does a depreciation do to an importer?', `It raises the home-currency cost of an invoice that has not changed. ${money(F.importedMaterials)} of material invoiced at ${fx(F.e0)} costs ${money(F.importAtE1)} at ${fx(F.e1)}.`),
  card('Why is a 20% fall in a currency a 25% rise in an import bill?', 'Because the two percentages are taken from different bases. A fall of a fifth in what the money buys means the same goods take a quarter more money, and the asymmetry is arithmetic rather than bad luck.'),
  card('What does a depreciation do to an exporter?', `It raises the home-currency value of a foreign price that has not changed: ${money(F.exportRevenue)} of exports is worth ${money(F.exportAtE1)}. The firm can keep the gain as margin or cut the foreign price to win volume.`),
  card('How does a firm respond to a currency movement?', 'Source at home, agree the rate in advance with its bank, reprice abroad or hold the foreign price, and sell in more than one market. Nothing it does changes the rate.'),
  card('What are the two channels an interest rate rise travels down?', `The firm's own borrowing, and its customers' borrowing. Here the first costs ${money(F.interestExtra)} and the second costs ${money(F.demandChannel)} — more than three times as much.`),
  card('Why does an interest rate rise leave operating profit unchanged?', `Because interest is taken off below that line. Operating profit stays at ${money(F.operatingProfit)} and what is left for the owners falls from ${money(F.profitForYear)} to ${money(F.pfyAfterRate)}.`),
  card('What is the slow effect of a higher interest rate?', 'It raises the return a project must clear before it is worth doing, so machines are not replaced and extensions are not built. Nothing shows on this year\'s statement and the firm is smaller in five years.'),
  card('How does a business respond to a rate rise?', 'Change the debt, fund from profit instead, help the customer borrow, or postpone what can be postponed. The demand it loses is the part it cannot answer directly.'),
  card('Where do the three kinds of tax land on a business?', `On profits, after the last line of the statement; on the payroll, inside the operating expenses; and on the sale, at the till. Here they are ${money(F.keptAfterTax1)} kept, ${money(F.payrollProfit)} of operating profit, and a till price of ${money(F.buyerPrice1)}.`),
  card('Why is an indirect tax not simply a cost to the business?', `It is collected from the customer and handed on: the till price moves from ${money(F.buyerPrice0)} to ${money(F.buyerPrice1)} while the firm still receives ${money(F.price)}. What it feels is whatever the higher price does to the quantity.`),
  card('What are the four ways government spending reaches a business?', `Public orders, infrastructure, subsidies and grants, and the incomes of the people the state pays. Only the first requires a public contract; ${F.name} holds ${money(F.publicRevenue)} of those.`),
  card('What happens when a public budget this firm supplies is cut?', `A ${pct(F.publicCut)} cut to its ${money(F.publicRevenue)} of public orders removes ${money(F.publicLost)} of revenue and takes operating profit from ${money(F.operatingProfit)} to ${money(F.publicCutProfit)}.`),
  card('Name the four phases of the business cycle.', 'Boom, downturn, slump and recovery: output above its long-run path, growth slowing, output below the path, and output climbing back. It is a shape, not a timetable.'),
  card('Why does a small swing in the economy become a large swing in some firms?', `Because they sell purchases that can be postponed. A ${pct(F.economySwing)} movement in the economy is about ${pct(F.orderSwing)} in this firm's orders, ${qty(F.amplification)} times as much.`),
  card('How do fixed costs widen the swing in profit?', `They are owed at any volume. ${money(F.operatingExpenses)} a year means a boom gives ${money(F.boomProfit)}, a bad year ${money(F.recessionProfit)}, and a ${pct(F.slumpFall)} fall in orders gives ${money(F.slumpProfit)} — a loss.`),
  card('Which businesses grow in a downturn?', 'Discount retailers, repairers and sellers of everyday basics, because customers trade down towards them. A recession is never bad for every business in the same market.'),
  card('How does a firm prepare for a cycle it cannot forecast?', `Flexible costs, a cash reserve, and a spread of customers who do not all stop at once. All three are cheap to arrange in a boom and impossible in a slump, and each costs something in the good years.`),
  card('What does consumer protection require of a seller?', 'That goods are of satisfactory quality, match their description, and are fit for the purpose sold for, with a remedy when they are not, and that contract terms are fair enough to be enforceable.'),
  card('What does employee protection cover?', 'A minimum wage, a written statement of terms, limits on hours, notice and fair dismissal, leave, and protection from discrimination in hiring, pay and promotion.'),
  card('What is the hidden benefit of employee protection to an employer?', 'Lower turnover. Replacing a trained worker costs recruitment, training and everything that worker would have produced meanwhile, and that cost is invisible until it is counted.'),
  card('What does health and safety law require?', 'Assess the risk, remove it where possible, guard and train where it cannot be removed, supply protective equipment, and record what happened when something goes wrong.'),
  card('Why is safety spending cheaper than the accident?', `One serious accident stops this firm's line for ${qty(F.accidentDays)} trading days: ${money(F.accidentCost)} of output at ${money(F.dailyRevenue)} a day, ${qty(F.accidentMultiple)} times a whole year of prevention, before any fine or claim.`),
  card('How does environmental legislation reach a business?', 'As limits on emissions and waste, permits to operate, charges on waste and packaging, product standards, and responsibility for disposal at the end of a product\'s life.'),
  card('When is an environmental requirement an advantage?', `When the firm's customers will pay for the standard. Certified timber costs more per cubic metre and is the only kind several of ${F.name}'s export customers will now accept.`),
  card('What does competition policy prohibit?', 'Agreements between rivals such as price fixing and tender rigging, abuse of a dominant position, mergers above a size threshold without approval, and unfair terms imposed on smaller suppliers.'),
  card('Is competition policy only aimed at large firms?', `No. Two small rivals agreeing a price are doing the thing the rule is aimed at; size changes the penalty rather than whether the conduct is prohibited. It also protects ${F.name} from a larger rival pricing below cost.`),
  card('What does a patent protect, and for how long?', `A new invention or process, applied for and examined, for up to ${yrs(F.patentYears)} from filing. In exchange the invention is published, so everyone can read how it works and nobody may use it.`),
  card('What does copyright protect, and how is it obtained?', 'A created work — drawings, photographs, catalogues, text, software. It arises automatically the moment the work is made, with no registration and no fee, and lasts for decades. It protects the expression, never the idea.'),
  card('What does a trademark protect, and for how long?', 'A brand identifier: a name, a logo, a slogan. It is registered in each market where it is used and renewable without limit while it is used, which makes it the only one of the three that need never expire.'),
  card('What three jobs do intellectual property rights do for a business?', `They exclude a copier, they can be licensed to somebody else for a fee, and they carry value on the balance sheet. A rival pays ${F.name} ${money(F.licenceFee)} a year to use its patented mechanism.`),
  card('What does compliance cost this firm, and what does it buy?', `${money(F.compliance)} a year, ${pct(F.compliancePctRevenue)} of revenue and ${pct(F.compliancePctProfit)} of operating profit. Against that: fines, claims, lost output, repriced insurance and withdrawn contracts, all arriving in one year without warning.`),
  card('Why can a rule that costs money still help a business?', 'Because it applies to every seller in the market, importers included. A standard everyone must meet removes the advantage of the firm that was cutting the corner, which is worth most to the one already meeting it.'),
  card('What does the NUMBER of competitors decide?', `How much of the price the firm controls and how quickly a good year is copied. ${F.name} faces ${qty(F.smallRivals)} small workshops and ${qty(F.largeRivals)} large importers, and holds ${pct(F.share)} of the market.`),
  card('Why is facing two large rivals not more comfortable than facing forty small ones?', 'Because the risk concentrates. Each customer is a much larger share of the order book and each competitive move is aimed directly at this business rather than at the market in general.'),
  card('Where does a large competitor\'s cost advantage come from?', `Buying power, fixed costs spread over more units, and specialised equipment kept busy. Here it is ${money(F.rivalUnitCost)} a ${F.unit} against ${money(F.unitCost)}, a gap of ${pct(F.scaleGap)} — bought with volume rather than earned with efficiency.`),
  card('What is a large rival\'s second advantage, and why is it worse?', 'Endurance. It can sell below cost in one town while the rest of its business pays for it, and a small firm losing money in its only market is losing money everywhere it operates.'),
  card('What happens if a small firm matches a price war?', `Each ${F.unit} leaves ${money(F.warContribution)} instead of ${money(F.contribution)}. At the same volume that is ${money(F.matchProfit)} — a loss — and break-even moves from ${qty(F.breakEvenUnits)} to ${qty(F.breakEvenUnitsWar)} ${F.unit}s.`),
  card('Why is holding the price and losing volume usually better?', `Because no cost falls when a price is cut, so the whole reduction lands on the profit. Losing ${pct(F.holdVolumeFall)} of volume at the old price leaves ${money(F.holdProfit)}, which is small and is not a loss.`),
  card('What are the four ways a competitive environment changes?', 'New firms enter, existing ones merge, a substitute arrives, or the established firms start behaving differently. The substitute does the most damage because nobody is watching for it.'),
  card('Why is a substitute more dangerous than a rival?', 'Because it is a different way of doing the job the customer was hiring the product for, so it can remove a market rather than taking share in it. It never looks like the business it displaces.'),
  card('Name the ways a small business can compete in a competitive market.', 'Specialise in a segment too small for a large rival, be quick and flexible, stay close to the customer, own a reputation protected by a trademark, and buy together with other small firms. Not on price.'),
  card('Why can a small firm charge more for bespoke work?', `Because a large rival cannot supply it at any price it would accept. ${qty(F.nicheUnits)} ${F.unit}s at ${money(F.nichePrice)} leave ${money(F.nicheGain)} more than the same ${F.unit}s sold as standard stock at ${money(F.price)}.`),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */
/*
 * `structure-08` says five of the live misconceptions are genuine student errors and three read as
 * filler or moralising — "businesses should pay as little tax as possible by moving abroad", "more
 * competition is always better for consumers", "barriers to entry are always created deliberately".
 * It is right about all three, and it is right about the five as well: "inflation is always bad",
 * "a strong pound is good", "higher interest rates are always bad", "recessions are bad for all"
 * and "legislation just increases costs" are each a sentence a student actually writes. Four of
 * them are carried forward here, internationalised; the fifth — the strong-pound one — is carried
 * as a claim about a currency rather than about sterling. The three filler entries are not carried.
 *
 * Each entry below is a specific wrong sentence with the arithmetic that refutes it.
 */
/*
 * THE FIELD NAMES ARE THE ONES A COMPONENT ACTUALLY READS, AND THAT IS A FINDING IN ITSELF.
 *
 * Packets 24 through 36 all author a mistake as `{ title, looks_like, why, instead }`. **Nothing in
 * this repository renders any of those three fields.** `components/MistakesTab.jsx` — on
 * `origin/main` and in this worktree alike — prints `item.title`, `item.mistake`, `item.correction`
 * and `item.examTip`, and `grep -rn looks_like components lib app` returns nothing on either. The
 * live corpus agrees: all 188 authored mistakes in `audit/content-sections/` carry
 * `{title, mistake, correction}` and 145 of them also carry `examTip`.
 *
 * So a mistake authored in the inherited shape renders a card with a heading and TWO EMPTY BODIES,
 * which is V035's shape exactly. It was found here by walking the staged bundle for every distinct
 * key and grepping `origin/main` for each — a different method from reading the components and
 * looking for the fields you already expect, which is what rule 3 asks for and what would have
 * missed it. The runner parses `MistakesTab.jsx` for the fields it renders and asserts this
 * builder emits those, so the mapping cannot drift back.
 *
 *   looks_like → `mistake`     the wrong sentence a student writes
 *   why        → `correction`  the refutation, with the arithmetic that settles it
 *   instead    → `examTip`     what to do instead
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, mistake: looksLike, correction: why, examTip: instead });

export const MISTAKES = [
  mistake('Treating inflation as straightforwardly bad for every business',
    '"Inflation is bad for business because it increases all the costs a firm has to pay."',
    `It raises what the firm can charge as well as what it pays, and which one moves first decides the outcome. What is reliably true is the multiplier: ${pct(F.inflation)} on ${money(F.costOfSales)} of cost of sales is ${money(F.inflationCostRise)}, which is ${pct(F.inflationProfitFall)} of a ${money(F.operatingProfit)} operating profit.`,
    'Say which line moves, by how much, and whether the customers will accept a price rise. A firm whose buyers have nowhere else to go is in a different position from one whose buyers have forty quotes.'),

  mistake('Assuming a stronger currency is good news for a business',
    '"A stronger currency is good for the firm because its money is worth more abroad."',
    `It is good for the importing half and bad for the exporting half of the same firm. An appreciation to ${fx(F.e2)} cuts ${F.name}'s import bill to ${money(F.importAtE2)} and cuts the home-currency value of its exports to ${money(F.exportAtE2)}; the net is ${money(F.appProfit)} of operating profit against ${money(F.operatingProfit)}.`,
    'Ask where the firm earns and where it spends before deciding which direction helps it. A firm that does both has to net the two off, and the answer is a number rather than a direction.'),

  mistake('Quoting the currency movement instead of the cost movement',
    `"The currency fell ${pct(F.depreciationPct)}, so the imported materials cost ${pct(F.depreciationPct)} more."`,
    `The two percentages have different bases and are never equal. A fall of ${pct(F.depreciationPct)} in what the money buys is a rise of ${pct(F.importRisePct)} in what the same invoice costs: ${money(F.importedMaterials)} becomes ${money(F.importAtE1)}.`,
    'Divide the foreign invoice by each rate and compare the two home-currency figures. The percentage comes out of that comparison rather than out of the rates.'),

  mistake('Thinking a rate rise only matters to firms that have borrowed',
    '"The rise in interest rates will not affect this business because it has no debt."',
    `A firm with no borrowing still loses the customers who had some. Here the firm's own debt costs ${money(F.interestExtra)} more and the demand channel costs ${money(F.demandChannel)} — more than three times as much, and it reaches a business with no loan at all.`,
    'Follow both chains and say which one this firm is exposed to. Debt decides how much worse the rate rise gets, not whether it happens.'),

  mistake('Treating every tax as a cost the business pays',
    '"A rise in sales tax increases the firm\'s costs and reduces its profit margin."',
    `An indirect tax is collected from the customer and handed on: the till price moves from ${money(F.buyerPrice0)} to ${money(F.buyerPrice1)} while the firm still receives ${money(F.price)}. A charge on the payroll is a cost — ${money(F.payrollExtra)} more here — and a tax on profits is charged after the last line of the statement.`,
    'Name which of the three taxes has moved before saying where it lands. The word "tax" covers three different effects in three different places.'),

  mistake('Writing that a recession is bad for all businesses',
    '"During a recession, demand falls and all businesses suffer a reduction in sales."',
    `Discount sellers, repairers and basic food retailers often grow, because customers trade down towards them. What is true is that firms selling postponable purchases swing far more than the economy: ${pct(F.economySwing)} in the economy is about ${pct(F.orderSwing)} in this firm's orders.`,
    'Ask what this firm sells and who buys it. The question is never whether the economy shrank; it is what happened to this firm\'s particular customers.'),

  mistake('Saying that legislation simply increases costs',
    '"New regulations increase costs and make businesses less competitive."',
    `They raise costs for every seller in that market, importers included, so the relative position often does not move. And compliance is ${money(F.compliance)} a year here against a single accident costing ${money(F.accidentCost)} of lost output — ${qty(F.accidentMultiple)} times a whole year of prevention.`,
    'Ask who else the rule applies to and what it makes possible. A standard everyone must meet takes the advantage away from whoever was cutting the corner.'),

  mistake('Using patent, copyright and trademark as interchangeable words',
    '"The company patented its brand name to stop competitors copying it."',
    `A brand name is registered as a trademark, renewable without limit; a patent is for a new invention and runs up to ${yrs(F.patentYears)} from filing; copyright arises automatically in a created work and protects the expression rather than the idea.`,
    'Name the right that matches the thing being protected: an invention, a created work, or an identifier. Naming the wrong one makes the rest of the answer unusable.'),

  mistake('Recommending that a small firm match a larger rival\'s price',
    '"To compete, the small firm should reduce its prices to the level the importer is charging."',
    `The cost gap is bought with volume: ${money(F.rivalUnitCost)} a ${F.unit} against ${money(F.unitCost)}. Matching a cut to ${money(F.warPrice)} gives ${money(F.matchProfit)} — a loss — and moves break-even from ${qty(F.breakEvenUnits)} to ${qty(F.breakEvenUnitsWar)} ${F.unit}s.`,
    'Recommend charging more for something the larger rival cannot supply. Bespoke work at ${nichePrice} leaves more than the same units sold as standard stock, and no amount of volume gets it for a large firm.'.replace('${nichePrice}', money(F.nichePrice))),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */
/*
 * `structure-09`: the live cost-push flow duplicates the inflation flow in the subsection before
 * it, and the business-cycle flow is a better diagram than text chain. Both are answered here. The
 * inflation duplication cannot recur because the typology it duplicated is gone; the cycle is a
 * diagram in `_packet41-diagrams.mjs` AND a chain here, and the chain exists because it is what
 * `reorder.source` reads to confirm the cycle reorder drills a sequence the section teaches.
 *
 * TWO OF THESE FOUR CHAINS ARE LOAD-BEARING. `topFix-04` asks for reorders on the interest-rate
 * transmission and on the phases of the cycle. Teaching each sequence HERE rather than on the step
 * that drills it is what lets the reorder be a retrieval task instead of a reading comprehension
 * one, and the runner asserts the correspondence in both directions.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How a rise in the lending rate reaches a furniture maker',
      steps: [
        'The rate lenders charge on new and variable borrowing is reset upwards, and no business has done anything yet.',
        `Loans and overdrafts already taken out cost more to service each month: ${money(F.loan)} at ${pct(F.interestRate + F.rateRise)} rather than ${pct(F.interestRate)} is ${money(F.interestAfter)} against ${money(F.interest)}.`,
        'Customers postpone the purchases they were going to borrow to make, because the same monthly payment now buys less.',
        `Orders thin, and the revenue that goes with them is larger than the extra interest: ${money(F.demandChannel)} of operating profit against ${money(F.interestExtra)}.`,
      ],
      result: `The chain has four steps and almost every answer stops at the second. That is the mistake worth naming: the firm's own debt is the channel with a date on it, and the customers' borrowing is the channel with the money in it. A business with no loan at all still loses the third and fourth steps, which is why "we have no debt" is not an answer to a rate rise. Both together leave ${money(F.rateBothProfit)}.`,
    },
    {
      title: 'How an economy moves through the four phases of the cycle',
      steps: [
        'Output runs above its long-run path: order books are full, skilled staff are scarce, and wages and input prices are bid up.',
        'Growth slows from that high level: quotes still go out, fewer of them turn into orders, and finished stock begins to build.',
        'Capacity stands idle below the long-run path: customers stretch their payment terms, and the weakest firms fail.',
        'Orders return before confidence does, and rehiring lags the recovery in demand by months.',
      ],
      result: `The order is fixed and the timetable is not, which is the whole commercial point. No phase announces how long it will last and each one is recognised late — a business finds out it was in a downturn from its own conversion rate, months before anybody publishes a number. And the fixed costs that felt like an advantage in the first step are what closes firms in the third: ${money(F.operatingExpenses)} a year is owed at any volume, which is why a ${pct(F.slumpFall)} fall in orders leaves ${money(F.slumpProfit)}.`,
    },
    {
      title: 'How a fall in the home currency reaches the profit line',
      steps: [
        `The rate moves from ${fx(F.e0)} to ${fx(F.e1)}, a fall of ${pct(F.depreciationPct)} in what a home dollar buys.`,
        `The foreign invoice has not changed — it is still ${units(F.importInvoice)} — so settling it takes ${money(F.importAtE1)} rather than ${money(F.importedMaterials)}, a rise of ${pct(F.importRisePct)}.`,
        `The foreign price of the exports has not changed either, so ${units(F.exportInvoice)} of export sales is worth ${money(F.exportAtE1)} rather than ${money(F.exportRevenue)}.`,
        `Netting the two: ${money(F.exportAtE1 - F.exportRevenue)} gained and ${money(F.importAtE1 - F.importedMaterials)} lost leaves operating profit at ${money(F.depProfit)}.`,
      ],
      result: `Two things are worth taking out of this. First, the percentages in steps one and two are different because they are taken from different bases, and a student who quotes ${pct(F.depreciationPct)} as the rise in the bill has quoted the wrong one. Second, the same movement is good news and bad news inside one firm, so "a weaker currency helps exporters" is the beginning of an answer about this business rather than the whole of one. An appreciation to ${fx(F.e2)} reverses both and gives ${money(F.appProfit)}.`,
    },
    {
      title: 'Deciding whether to match a rival\'s price cut',
      steps: [
        `Establish how much each sale leaves once its own materials are paid for: ${money(F.price)} less ${money(F.unitCost)} is ${money(F.contribution)}, and at ${money(F.warPrice)} it is ${money(F.warContribution)}.`,
        `Work out how many sales are needed at the lower price to cover the fixed costs: ${money(F.operatingExpenses)} ÷ ${money(F.warContribution)} is ${qty(F.breakEvenUnitsWar)} ${F.unit}s, against ${qty(F.breakEvenUnits)} before.`,
        `Estimate how much volume is lost by holding the old price instead: losing ${pct(F.holdVolumeFall)} of ${qty(F.units0)} leaves ${qty(F.holdUnits)} ${F.unit}s and ${money(F.holdProfit)}.`,
        `Compare the profit on each route and choose the less bad one: ${money(F.matchProfit)} against ${money(F.holdProfit)}.`,
      ],
      result: `Both routes are worse than yesterday, and the decision is which loss to take rather than how to avoid one. The step that decides it is the second: matching requires ${pct(F.warVolumeNeeded)} MORE sales than the firm makes today, in the middle of a price war, simply to stand still. That is why the instinct to protect volume is usually wrong — no cost falls when a price is cut, so the whole reduction comes out of the profit, while losing volume at least takes the material cost away with it.`,
    },
  ],
  evaluation: [
    {
      title: 'Ranking three threats to one business',
      content: `A 20-mark question that names three external influences is asking which one matters most, and the ranking has to be argued rather than asserted. Four things decide it, in this order. FIRST, how much of the cushion each one takes: ${F.name} has ${money(F.operatingProfit)} of operating profit, and a ${pct(F.depreciationPct)} currency fall takes ${money(F.importAtE1 - F.importedMaterials)} of import cost while returning ${money(F.exportAtE1 - F.exportRevenue)} on exports, a rate rise of ${pts(F.rateRise)} takes ${money(F.interestExtra)} directly, and a downturn of the size this kind of demand usually shows takes operating profit towards ${money(F.recessionProfit)}. SECOND, how many routes each one travels: the rate rise looks small at ${money(F.interestExtra)} and reaches the firm again through customers who borrow, worth about ${money(F.demandChannel)}, which is the step most answers miss. THIRD, whether anything offsets it: the currency movement partly nets itself off because this firm exports ${money(F.exportRevenue)}, and the downturn has nothing offsetting it at all. FOURTH, whether the firm can survive it for a year: the revenue at which profit reaches zero is ${money(F.breakEvenRevenue)}, a quarter of the way down, and that is the number that separates a bad year from a closure. The three are also not independent — a downturn usually arrives with lower rates rather than higher ones — so an answer that treats them as three separate coin tosses has missed how the cycle moves the other influences together.`,
    },
    {
      title: 'When legislation is a cost and when it is a door',
      content: `Almost every answer to a legislation question reaches the same conclusion — it raises costs and reduces competitiveness — and that conclusion is only half right. The cost is real: ${money(F.compliance)} a year at ${F.name}, ${pct(F.compliancePctRevenue)} of revenue and ${pct(F.compliancePctProfit)} of the operating profit, plus capital spending like the ${money(F.envCapital)} of extraction and the ${money(F.hsCapital)} of guarding. Three things decide whether it is more than that. THE FIRST IS WHO ELSE IT APPLIES TO. A rule that binds every seller in the market, importers included, moves nobody's relative position; it removes the advantage of whichever firm was cutting the corner, and the firm already meeting the standard has just been handed something it could not have bought. THE SECOND IS WHAT THE CUSTOMER WANTS. Certified timber is a cost against a buyer who compares prices and a qualification against a buyer who will not deal without it, which is why the same spending is a burden for the ${money(F.revenue - F.exportRevenue)} of domestic sales and an entry ticket for the ${money(F.exportRevenue)} of exports. THE THIRD IS THE COST OF THE FAILURE IT PREVENTS. One serious accident stops the line for ${qty(F.accidentDays)} days and ${money(F.accidentCost)} of output, ${qty(F.accidentMultiple)} times a year of prevention, before any fine, claim or repriced insurance. The conclusion worth writing is therefore conditional: legislation is a cost to a firm competing on price in a market where the rule is not enforced on everyone, and an advantage to a firm competing on quality in a market where it is. Which of those this business is, is the thing the source tells you.`,
    },
  ],
};
