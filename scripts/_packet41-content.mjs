/**
 * PACKET 41 — external-influences content: five chapters, twenty-four subsections, one per step.
 *
 * `audit/raw/bus_spec.txt:1009-1029`. The chapter order is the specification's own three
 * sub-topics, with sub-topic 1's five bullets split across three chapters so that no chapter is
 * three times the size of another: Inflation and Exchange Rates · Interest Rates, Taxation and
 * Government Spending · The Business Cycle · Legislation · The Competitive Environment.
 *
 * ════ WHAT `structure-05` AND `structure-06` ASKED FOR, AND WHAT THEY GET ════
 *
 * `structure-05` is the difficulty ramp: *"the section opens with Economics theory (CPI, cost-push
 * vs demand-pull) before the business-relevant chain"*. The section now opens on what an external
 * influence IS and on the four lines of a firm's own trading that any of them can land on, so the
 * first thing a student meets is the frame every later chapter is hung on. The inflation TYPOLOGY
 * is not demoted to an aside; it is gone, because `cost-push` and `demand-pull` are 0 hits in
 * `bus_spec.txt` and belong to `econ_spec.txt:917-918`. What replaces it is the thing 2.3.5 · 1a
 * actually asks for: the effect on the business, and the response.
 *
 * `structure-06` is that chapter 1 bundled exchange rates, interest rates and taxation into one
 * chapter, leaving "taxation" as a step on its own with an unused recall slot, and that the
 * Legislation chapter taught 2 of the 6 areas the specification names while the quiz and the
 * practice tested the other four. Both are structural and both are fixed structurally: every one
 * of the 12 leaves at `:1013-1030` has at least one subsection of its own, every subsection carries
 * a recall, and the runner fails the build if any leaf's subsection is missing.
 *
 * ════ THE RECALLS, AND THE ONE THING THAT DECIDES WHERE THEY GO ════
 *
 * `structure-01` is that this section ships ZERO recalls and ZERO diagrams across twelve
 * subsections — "pure reading plus one MCQ per block". There are twenty-four recalls here, in all
 * four contract types, and the placement rule is not taste:
 *
 *   **A recall whose answer is printed on its own step is a recognition task.** `recall.recoverable`
 *   is INFO, so neither `npm run validate` nor this runner's own 0-new-DEBT gate can see it, and
 *   `audit/recall-census-baseline.json` has NO row for this section — which per DECISIONS (packet
 *   2.7) holds it to ZERO rather than to a lenient default. So the two sequences `topFix-04` names
 *   are taught as EXTRAS CHAINS and drilled as reorders on a LATER step: `reorder.source` looks at
 *   every chain in the section, while `recall.recoverable` is scoped to the subsection, and the two
 *   rules are satisfied at once only by separating the teaching step from the drilling step.
 *   Every fill-in asks for a figure the student has to work out rather than a word to copy down.
 *
 * ════ ONE CLAUSE OF `topFix-04` IS REFUSED ════
 *
 * It asks for "a SPICED fillin". SPICED is a UK-GCE sterling mnemonic, 0 hits in `bus_spec.txt`,
 * and its own first letter is the UK frame `accuracy-01` and `topFix-02` exist to remove. The
 * underlying leaf — `BUS-2.3.5-1a-2`, "exchange rates (appreciation, depreciation)" — is taught in
 * two subsections and drilled in a fill-in that asks for the two arithmetic consequences rather
 * than for the letters of a rhyme. The reasoning is in `_packet41-util.mjs`'s header.
 */
import {
  SECTION, subId, money, qty, pct, pts, fx, units, yrs, sentence, andList,
  FIRM, ECONOMIC_INFLUENCES, LEGISLATION_AREAS, COMPETITION_DIMENSIONS, IP_RIGHTS,
} from './_packet41-util.mjs';

const F = FIRM;

const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const blockId = (title) => `${SECTION}:block:${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const B1 = 'Inflation and Exchange Rates';
export const B2 = 'Interest Rates, Taxation and Government Spending';
export const B3 = 'The Business Cycle';
export const B4 = 'Legislation';
export const B5 = 'The Competitive Environment';

export const BLOCKS = [B1, B2, B3, B4, B5];

/* ══ Chapter 1 — Inflation and Exchange Rates (2.3.5 · 1a) ════════════════ */

const whatAnExternalInfluenceIs = (() => {
  const sid = subId('what-an-external-influence-is');
  return {
    id: sid,
    title: 'What an External Influence Is',
    keyIdea: 'An external influence is a change outside the business that the business cannot stop and has to answer. 2.3.5 asks for both halves: the effect, and the response.',
    body: [
      { type: 'paragraph', text: `The stem of 2.3.5 · 1a is worth reading twice: "the effect on businesses of, **and how they can best respond to**, changes in". Half the marks in this topic are in the second clause. A change nobody can prevent is not the end of an answer; it is the start of one.` },
      { type: 'paragraph', text: `Every influence in this topic reaches a business through one of four lines: **what it can charge**, **how many it sells**, **what its inputs cost**, or **what it pays to borrow**. Naming the line is what turns a general worry into an analysis, and it is the difference between "inflation is bad for business" and an answer worth marks.` },
      { type: 'paragraph', text: `${F.name} ${F.what}. It sells ${qty(F.units0)} ${F.unit}s at ${money(F.price)}, each costing ${money(F.unitCost)} to make, and everything else costs ${money(F.operatingExpenses)} a year. That leaves ${money(F.operatingProfit)} of operating profit — ${pct(F.opMargin)} of revenue, and the cushion every shock in this topic has to fit inside.` },
    ],
    realExample: { emoji: '🪑', text: `A furniture maker in Malaysia and a software firm in Kenya meet the same fall in their currency and answer it differently, because one of them buys its inputs abroad and the other does not.` },
    misconception: `Students treat an external influence as a verdict — good for business, bad for business — and stop there. The same change helps one firm and hurts another in the same street, and whether it does depends on where that firm sells, what it buys and how much it has borrowed. The verdict is the last line of an answer, never the first.`,
    examMatters: `Appendix 6 defines Analyse as a brief chain of reasoning with interpretation where data is given. The chain in this topic always has the same shape: the change, the line of the business it lands on, the size of the effect, and what the firm does next.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A chair maker is hit by six separate changes. Sort each one by which part of its trading the change reaches first:',
      groups: [
        { name: 'What it can charge or sell', items: ['A rival opens a showroom on the same road', 'Office tenants cancel their fit-out plans'] },
        { name: 'What its inputs cost', items: ['The fabric supplier raises its list prices', 'A new rule requires dust extraction on every saw'] },
        { name: 'What it pays to borrow', items: ['The rate on its overdraft is reset upwards', 'Lenders shorten the term they will offer'] },
      ],
      why: [
        'Both of these change the demand side of the trade: one takes customers away, the other removes the reason to buy at all, and neither touches what a chair costs to make.',
        'Both raise what it costs to produce the same chair, so they land between revenue and gross profit however the firm prices.',
        'Neither changes the trading at all. They change the cost of the money the business has already borrowed, which is taken off below the operating profit line.',
      ],
    }),
  };
})();

const theRateOfInflation = (() => {
  const sid = subId('the-rate-of-inflation');
  return {
    id: sid,
    title: 'The Rate of Inflation',
    keyIdea: 'Inflation is a sustained rise in the general level of prices. For a business it is two things at once: its own costs rising, and what its customers can afford falling.',
    body: [
      { type: 'paragraph', text: `The first bullet of 2.3.5 · 1a is **the rate of inflation** — not the level of prices, the rate at which they rise. A business does not feel a price level; it feels its suppliers' invoices getting bigger faster than it expected, and it feels customers pushing back.` },
      { type: 'paragraph', text: `The arithmetic is why it hurts more than the headline number looks. Inflation of ${pct(F.inflation)} on ${F.name}'s ${money(F.costOfSales)} of cost of sales is ${money(F.inflationCostRise)}. If it holds its price, operating profit falls from ${money(F.operatingProfit)} to ${money(F.inflationProfit)} — a fall of ${pct(F.inflationProfitFall)}.` },
      { type: 'paragraph', text: `**A cost rise is multiplied by the margin it lands on.** ${pct(F.inflation)} on the costs became ${pct(F.inflationProfitFall)} on the profit because the profit is only ${pct(F.opMargin)} of revenue. The thinner the margin, the larger the multiple — which is why the same inflation closes one firm and irritates another.` },
      { type: 'paragraph', text: `And wages are a price too. A claim of ${pct(F.inflation)} on a wage bill of ${money(F.wages)} adds ${money(F.wageClaim)}, taking the same year to ${money(F.inflationProfitWithWages)}. Staff who accept no rise take a pay cut in what their money buys, which is why the claim comes.` },
    ],
    realExample: { emoji: '🧾', text: `A café that reprints its menu twice a year spends more on printing and more on the staff hours to reprice everything — small costs that only exist because prices are moving.` },
    misconception: `Students write that inflation means a business can charge more, so it gains. It can charge more only if its customers will pay more, and the same inflation is eating what those customers earn. Revenue and costs both move, and the question is always which moves first and by how much.`,
    examMatters: `Appendix 6 defines Calculate as a calculation based on given data with workings shown. An inflation question usually gives a cost line and a rate: apply the rate to the line, then carry the figure down to the profit the data supports.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A rival chair maker has revenue of $1,000,000, cost of sales of $600,000 and other operating expenses of $300,000. Input prices rise by 10% and it holds both its price and its volume. Work out where it lands, in thousands of dollars:`,
      template: [
        'Its cost of sales becomes $___ thousand',
        'Its operating profit was $___ thousand and is now $___ thousand',
        'So a tenth on its inputs has taken ___ of its profit',
      ],
      answers: ['660', '100', '40', '60%'],
      hints: ['add a tenth to the line the price rise lands on', 'the figure the two subtractions left before anything moved', 'the same two subtractions with the new middle line', 'compare the two profit figures and say how far it fell'],
      distractors: ['540', '10%'],
    }),
  };
})();

const respondingToInflation = (() => {
  const sid = subId('responding-to-inflation');
  return {
    id: sid,
    title: 'Responding to Inflation',
    keyIdea: 'There are four answers to rising input prices: raise the price, absorb it, buy differently, or take cost out. Each one costs the business something different.',
    body: [
      { type: 'paragraph', text: `**Pass it on.** ${F.name} needs ${money(F.inflationCostRise)} more revenue to stand still, which on ${money(F.revenue)} is a price rise of ${pct(F.priceRiseToHold)}. That works when customers have nowhere cheaper to go and fails when they have.` },
      { type: 'paragraph', text: `**Absorb it.** Holding the price protects the customer list and costs ${money(F.operatingProfit - F.inflationProfit)} of profit. It is a decision to buy market share with money, and it can only be afforded for as long as the cushion lasts.` },
      { type: 'paragraph', text: `**Buy differently.** Fixing a supply contract for a year, ordering earlier, switching to a cheaper grade of material, or finding a second supplier. Each one trades flexibility for certainty, and a contract fixed just before prices fall is a loss rather than a saving.` },
      { type: 'paragraph', text: `**Take cost out.** Redesigning the ${F.unit} to use less material, cutting waste, or raising output an hour. This is the only response that leaves the business permanently better off, and the only one that takes months rather than a morning.` },
    ],
    realExample: { emoji: '🔁', text: `A bakery in Lagos that fixed its flour price for twelve months protected a year of margin, and then watched a competitor buy at the lower price that arrived in month four.` },
    misconception: `Students answer "raise prices" and stop. Whether that works is a question about the customers, not about the costs: a firm whose buyers can switch easily loses volume faster than it gains margin, and the honest answer names which kind of business this one is before choosing.`,
    examMatters: `Appendix 6 defines Discuss as chains of reasoning in context with a brief assessment showing awareness of competing arguments. Two responses weighed against each other, in this firm's circumstances, is what the command word is built around.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each response to rising input prices with the thing the business gives up by choosing it:',
      pairs: [
        { left: 'Raising the price to cover the whole increase', right: 'Customers who can buy the same thing cheaper elsewhere' },
        { left: 'Holding the price and living on a thinner cushion', right: 'The money that would have paid for next year\'s machine' },
        { left: 'Signing a twelve-month supply contract', right: 'The chance to buy at a lower price if one appears' },
        { left: 'Redesigning the product to use less material', right: 'Months of work before any of it shows up' },
      ],
      why: [
        'The increase reaches the buyer in full, so every buyer with an alternative is being invited to take it.',
        'Nothing changes on the shelf and everything changes in the bank: the profit that funded investment is what pays for the decision.',
        'Certainty is bought by giving up the upside, which is the whole trade and the reason it can turn out badly.',
        'It is the only response that lowers the cost permanently, and the price of that is that it cannot be done this week.',
      ],
      distractors: ['The supplier relationship, which ends immediately'],
    }),
  };
})();

const exchangeRates = (() => {
  const sid = subId('exchange-rates');
  return {
    id: sid,
    title: 'Exchange Rates',
    keyIdea: 'An exchange rate is the price of one currency in another. An appreciation makes imports cheaper and exports dearer abroad; a depreciation does the opposite.',
    body: [
      { type: 'paragraph', text: `The specification's own bracket at :1014 names the two directions: **appreciation** (the home currency buys more) and **depreciation** (it buys less). ${F.name}'s timber and fabric are invoiced abroad at ${units(F.importInvoice)} a year. At ${fx(F.e0)} that is ${money(F.importedMaterials)}.` },
      { type: 'paragraph', text: `A **depreciation** to ${fx(F.e1)} — ${pct(F.depreciationPct)} down — leaves the invoice the same and the bill at ${money(F.importAtE1)}. That is ${pct(F.importRisePct)} dearer, not ${pct(F.depreciationPct)}, and the asymmetry is arithmetic rather than bad luck: a fall of a fifth in what the money buys is a rise of a quarter in what the same goods cost.` },
      { type: 'paragraph', text: `The export side moves the other way. ${F.name} sells ${units(F.exportInvoice)} abroad, worth ${money(F.exportRevenue)} at the old rate and ${money(F.exportAtE1)} at the new one, without changing the price its foreign customers pay. Net, the depreciation takes operating profit from ${money(F.operatingProfit)} to ${money(F.depProfit)}.` },
      { type: 'paragraph', text: `An **appreciation** to ${fx(F.e2)} reverses both: imports ${pct(F.importFallPct)} cheaper at ${money(F.importAtE2)}, exports worth ${money(F.exportAtE2)}, and operating profit ${money(F.appProfit)}. The same movement is good news and bad news inside one firm.` },
    ],
    realExample: { emoji: '🚢', text: `An exporter in Vietnam and an importer in the Gulf read the same overnight currency move on opposite pages of the same newspaper, and both are right.` },
    misconception: `Students learn that a falling currency is good for a country's businesses and apply it to every firm. It is good for one that earns abroad and buys at home, and it is expensive for one that buys abroad. A firm that does both, like most manufacturers, has to net the two off before it knows anything.`,
    examMatters: `Appendix 6 defines Calculate as working from given data. Two rates and one invoice are enough for the whole question: divide the foreign invoice by each rate and the difference between the answers is the effect.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A workshop imports 900,000 units of leather a year. Its home currency moves from $1 = 3.00 units to $1 = 2.50 units. Work out what happens, to the nearest dollar and the nearest whole per cent:`,
      template: [
        'The leather used to cost $___ thousand and now costs $___ thousand',
        'The home currency has fallen by ___',
        'But the leather bill has risen by ___',
      ],
      answers: ['300', '360', '16.7%', '20%'],
      hints: ['divide the foreign invoice by the first rate', 'divide the same invoice by the second rate', 'compare the two rates, taking the first as the base', 'compare the two bills, taking the first as the base'],
      distractors: ['2700', '50%'],
    }),
  };
})();

const respondingToACurrencyMovement = (() => {
  const sid = subId('responding-to-a-currency-movement');
  return {
    id: sid,
    title: 'Responding to a Currency Movement',
    keyIdea: 'A firm answers a currency movement by changing where it buys, where it sells, or what it agrees in advance. Nothing it does changes the rate.',
    body: [
      { type: 'paragraph', text: `**Source at home.** Replacing imported material with a domestic supplier removes the exposure completely. It usually costs more per unit at today's rate, which is exactly why it was not done before, and it takes time to qualify a new supplier.` },
      { type: 'paragraph', text: `**Agree the rate in advance.** A firm can fix the rate for a future payment with its bank. It knows its cost with certainty and gives up the gain if the rate moves its way — the same trade as a fixed supply contract, made with a different counterparty.` },
      { type: 'paragraph', text: `**Reprice abroad, or do not.** After a depreciation ${F.name} can keep its foreign price and take ${money(F.exportAtE1 - F.exportRevenue)} more revenue, or cut the foreign price to win volume. The first is margin, the second is share, and a firm with spare capacity has a reason to prefer the second.` },
      { type: 'paragraph', text: `**Sell in more than one place.** A business earning in several currencies is hurt by some movements and helped by others in the same year. That is not cleverness, it is arithmetic, and it is the most durable answer available.` },
    ],
    realExample: { emoji: '🧭', text: `A manufacturer in Indonesia that buys abroad and sells only at home carries the whole movement; one that also exports a third of its output nets most of it off without doing anything.` },
    misconception: `Students treat fixing the rate in advance as free insurance. It is a decision to give up the favourable half of the range, and a firm that fixed before a movement in its favour has made a loss it will be asked to explain, even though the decision was reasonable when it was made.`,
    examMatters: `Appendix 6 defines Assess as a well-contextualised chain leading to a supported judgement. A judgement about a currency response has to say which exposure this firm actually has before recommending anything.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these four firms by whether a fall in the home currency helps or hurts them overall:',
      groups: [
        { name: 'Helped overall', items: ['A tea grower that sells its whole crop abroad and buys nothing from abroad', 'A hotel whose guests fly in and whose staff and food are local'] },
        { name: 'Hurt overall', items: ['A phone repairer that buys every part abroad and sells only in its own town', 'An airline that sells tickets at home and pays for fuel and aircraft abroad'] },
      ],
      why: [
        'Each of these earns abroad and spends at home, so the same movement raises what comes in and leaves what goes out where it was.',
        'Each of these spends abroad and earns at home, so the movement raises the bill and does nothing at all for the revenue.',
      ],
    }),
  };
})();

/* ══ Chapter 2 — Interest Rates, Taxation and Government Spending ═════════ */

const interestRates = (() => {
  const sid = subId('interest-rates');
  return {
    id: sid,
    title: 'Interest Rates',
    keyIdea: 'An interest rate is the price of borrowing. It reaches a business twice: through what its own debt costs, and through what its customers can afford to borrow.',
    body: [
      { type: 'paragraph', text: `The channel every student names is the firm's own borrowing. ${F.name} owes ${money(F.loan)}. At ${pct(F.interestRate)} the interest is ${money(F.interest)}; ${pts(F.rateRise)} more takes it to ${money(F.interestAfter)}. Operating profit does not move at all, because interest is taken off below it — what is left for the owners falls from ${money(F.profitForYear)} to ${money(F.pfyAfterRate)}.` },
      { type: 'paragraph', text: `The channel almost nobody names is demand, and it is the larger one. Offices and cafés buy furniture out of budgets that are themselves borrowed. A ${pct(F.rateDemandFall)} fall in orders takes revenue to ${money(F.rateRevenue)} and operating profit to ${money(F.rateDemandProfit)}.` },
      { type: 'paragraph', text: `Compare the two. The borrowing channel costs ${money(F.interestExtra)}; the demand channel costs ${money(F.demandChannel)}, more than three times as much. Both together leave ${money(F.rateBothProfit)}.` },
      { type: 'paragraph', text: `A third effect is slower and matters more over years: **a higher rate raises the return a project must clear before it is worth doing**, so machines are not replaced and extensions are not built. Nothing appears on this year's statement, and the firm is smaller in five years than it would have been.` },
    ],
    realExample: { emoji: '🏗️', text: `A builder's order book empties months before its own loan repayment changes, because its customers decide first and its bank reprices later.` },
    misconception: `Students write that a rate rise only matters to businesses with debt. A firm with no borrowing at all still loses the customers who cannot borrow, and for most businesses that is the bigger number. Debt decides how much worse it gets, not whether it happens.`,
    examMatters: `Appendix 6 defines Analyse as a brief chain of reasoning. Two chains exist here and they are not the same length: say which one this business is exposed to, and why, before following it.`,
    /*
     * A REORDER, AND ITS SEQUENCE IS TAUGHT IN AN EXTRAS CHAIN RATHER THAN ON THIS STEP. This is
     * the chain `topFix-04` names. `reorder.source` reads every chain in the section and
     * `recall.recoverable` reads only this subsection, so the two rules are satisfied together
     * only by teaching the sequence somewhere the student is not currently standing.
     */
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these in the order a rise in the lending rate reaches a furniture maker, from the decision the lender makes to the effect on the order book:',
      correctOrder: [
        'The rate lenders charge on new and variable borrowing is reset upwards',
        'Loans and overdrafts already taken out cost more to service each month',
        'Customers postpone the purchases they were going to borrow to make',
        'Orders thin, and the revenue that goes with them is larger than the extra interest',
      ],
      why: [
        'Nothing has happened to any business yet: this is a decision about the price of money, taken outside every firm it will reach.',
        'The firm feels its own debt first because the repayment changes on a date somebody can point at.',
        'This is the step almost every answer misses, and it is where the money actually goes: the customer decides before the lender reprices anything else.',
        'It comes last because it is a consequence of the step above it, and it arrives as a quiet order book rather than as a letter from a bank.',
      ],
    }),
  };
})();

const respondingToARateRise = (() => {
  const sid = subId('responding-to-a-rate-rise');
  return {
    id: sid,
    title: 'Responding to a Rate Rise',
    keyIdea: 'A business answers a rate rise by changing what it owes, what it charges for credit, or what it plans to build. The demand it loses is the part it cannot answer directly.',
    body: [
      { type: 'paragraph', text: `**Change the debt.** Repaying early, refinancing at a fixed rate, or moving from an overdraft to a term loan all reduce the exposure. Fixing the rate buys certainty and costs the saving if rates fall, which is the same trade as every other kind of insurance in this topic.` },
      { type: 'paragraph', text: `**Fund from profit instead.** Money that is not borrowed costs no interest, and a firm with a strong year can buy the machine outright. What it gives up is the cash cushion, and running a business on a thin cushion is how a survivable shock becomes a fatal one.` },
      { type: 'paragraph', text: `**Help the customer borrow.** Offering instalments, a trade-in, or a longer payment period moves the financing problem from the buyer to the seller. It wins orders a rival will lose and it lengthens the wait to be paid.` },
      { type: 'paragraph', text: `**Postpone what can be postponed.** A higher rate genuinely does make some investments not worth doing, and stopping one is a decision rather than a failure. The judgement is whether the project is being postponed or quietly abandoned.` },
    ],
    realExample: { emoji: '🧮', text: `A machinery dealer that offers twelve monthly payments wins the order from a rival quoting cash on delivery, and waits a year to be paid for it.` },
    misconception: `Students recommend repaying debt as if it were always right. Repaying uses the cash that keeps the business alive between shocks, and a firm that clears its loan and then cannot pay a supplier has answered the smaller problem with the money that was protecting it from the larger one.`,
    examMatters: `Appendix 6 defines Evaluate as fully developed chains leading to a perceptive conclusion proposing a solution or recommendation. A recommendation here has to survive the case where rates fall again next year.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each response to a rate rise with the cost the business accepts by choosing it:',
      pairs: [
        { left: 'Fixing the rate on the loan for five years', right: 'The saving if rates come back down' },
        { left: 'Repaying the borrowing out of the bank balance', right: 'The cushion that pays suppliers in a bad month' },
        { left: 'Letting customers pay in instalments', right: 'A long wait before the money actually arrives' },
        { left: 'Postponing the new production line', right: 'Capacity a growing rival will have and this firm will not' },
      ],
      why: [
        'Certainty is bought by giving up the favourable half of the range, which is what every fixed rate is.',
        'The debt is smaller and so is the money that keeps the business trading between one shock and the next.',
        'The order is won and the cash is not: the firm has taken over the financing its customer could no longer get.',
        'Nothing is spent and nothing is built, and the gap shows up only when demand returns.',
      ],
      distractors: ['The interest already paid in earlier years'],
    }),
  };
})();

const taxation = (() => {
  const sid = subId('taxation');
  return {
    id: sid,
    title: 'Taxation',
    keyIdea: 'Taxes reach a business in three different places: on its profits, on its payroll, and on the price its customers pay. Only one of them is the one students think of.',
    body: [
      { type: 'paragraph', text: `**On profit.** A profits tax is charged after the last line of the statement, so it changes what the owners keep and not how the business trades. ${F.name} keeps ${money(F.keptAfterTax0)} of its ${money(F.profitForYear)} at ${pct(F.profitTax0)} and ${money(F.keptAfterTax1)} at ${pct(F.profitTax1)}.` },
      { type: 'paragraph', text: `**On employing people.** An employer payroll charge is a cost of having staff, so it sits inside the operating expenses. Moving from ${pct(F.payrollRate)} to ${pct(F.payrollRate1)} of a ${money(F.wages)} wage bill adds ${money(F.payrollExtra)} and takes operating profit to ${money(F.payrollProfit)} before any customer has noticed anything.` },
      { type: 'paragraph', text: `**On the sale.** An indirect tax is added to the price the buyer pays. Raising it from ${pct(F.salesTax0)} to ${pct(F.salesTax1)} moves a ${money(F.price)} ${F.unit} from ${money(F.buyerPrice0)} to ${money(F.buyerPrice1)} — ${pct(F.buyerPriceRise)} dearer to the customer while the firm still receives ${money(F.price)}. The firm can hold the shelf price instead, and pay for the difference out of its own margin.` },
      { type: 'paragraph', text: `The three land in three different places, and an answer that treats "a tax rise" as one thing cannot say which. Taxes also fund what the next subsection is about, which is why the specification names them in the same bullet.` },
    ],
    realExample: { emoji: '🏷️', text: `A restaurant facing a higher sales tax either reprints the menu at a higher price or keeps the price and earns less on every cover. Both are visible to the customer; only one is visible on the menu.` },
    misconception: `Students treat every tax as a cost to the business. An indirect tax is collected from the customer and passed on, so its effect on the firm is whatever it does to the quantity sold — which can be nothing at all if the customers have nowhere else to eat.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by details. Naming which of the three taxes has changed is the detail: the cause is the same word and the effects are in three different places.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these effects by which of the three places a tax reaches a business first:',
      groups: [
        { name: 'The profits of the owners', items: ['Less is left to reinvest once the owners have settled what they owe', 'A foreign investor compares this country with the one next door'] },
        { name: 'The cost of employing people', items: ['Hiring a tenth worker becomes dearer than hiring the ninth was', 'Overtime is offered instead of a new contract'] },
        { name: 'The price the customer pays', items: ['The shelf price rises although the firm receives no more', 'Fewer units are sold at the higher till price'] },
      ],
      why: [
        'Both sit below every trading decision: the firm produced and sold exactly as it would have, and only the share the owners keep has moved.',
        'Both are decisions about headcount, which is where a charge on the payroll bites before it reaches anything else.',
        'Both happen at the till. The firm collects the tax and hands it on, so what it feels is whatever the higher till price does to the quantity.',
      ],
    }),
  };
})();

const governmentSpending = (() => {
  const sid = subId('government-spending');
  return {
    id: sid,
    title: 'Government Spending',
    keyIdea: 'Government spending reaches businesses as orders, as infrastructure, as subsidies and as the incomes of the people who are paid by it.',
    body: [
      { type: 'paragraph', text: `The same bullet at :1016 names **taxation and government spending** together, and the spending half is the one the live section never taught. It arrives in four ways, and the first is the most direct: the state is a customer.` },
      { type: 'paragraph', text: `**Public orders.** ${F.name} sells ${money(F.publicRevenue)} a year of ${F.unit}s into government offices and schools. A ${pct(F.publicCut)} cut to that budget removes ${money(F.publicLost)} of revenue and takes operating profit to ${money(F.publicCutProfit)}; the same rise the other way gives ${money(F.publicRiseProfit)}.` },
      { type: 'paragraph', text: `**Infrastructure.** Roads, ports, power and broadband change what it costs every business to trade, and they create years of orders for the firms that build them. A workshop two hours from a new port is a different business the day it opens.` },
      { type: 'paragraph', text: `**Subsidies and grants.** A ${money(F.trainingGrant)} training grant lowers the cost of taking on apprentices; an export grant lowers the cost of reaching a new market. **Incomes.** Public salaries and pensions are spent in shops, so a spending programme reaches firms that never sell to the state at all.` },
    ],
    realExample: { emoji: '🛣️', text: `A new highway in Kenya raises the value of every workshop along it and lowers it for the town the traffic now bypasses.` },
    misconception: `Students assume government spending only matters to firms that hold public contracts. Most of it reaches business indirectly: through the roads goods travel on, and through the wages of people who then buy things. A shop with no public customers still trades in an economy the spending has changed.`,
    examMatters: `Appendix 6 defines Assess as a well-contextualised chain leading to a supported judgement. The judgement in a spending question is usually about dependence: how much of this firm's revenue is one decision away from disappearing.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A uniform maker has revenue of $1,500,000, of which $500,000 is school orders. Its cost of sales is 60% of revenue and its other operating expenses are $450,000. The schools budget is cut by 40%. Work it out, in thousands of dollars:`,
      template: [
        'It loses $___ thousand of revenue',
        'Its operating profit falls from $___ thousand to $___ thousand',
        'The share of its revenue that depended on one budget decision was ___',
      ],
      answers: ['200', '150', '70', 'a third'],
      hints: ['apply the cut to the part of the revenue it applies to', 'the two subtractions before the cut', 'the same two subtractions on the smaller revenue', 'compare the school orders with the whole of the revenue'],
      distractors: ['600', 'a tenth'],
    }),
  };
})();

/* ══ Chapter 3 — The Business Cycle ═══════════════════════════════════════ */

const theBusinessCycle = (() => {
  const sid = subId('the-business-cycle');
  return {
    id: sid,
    title: 'The Business Cycle',
    keyIdea: 'The business cycle is the repeated swing of an economy\'s output around its long-run path: boom, downturn, slump and recovery, in that order and without a timetable.',
    body: [
      { type: 'paragraph', text: `The last bullet of 2.3.5 · 1a is **the business cycle**. Output does not grow smoothly. It runs ahead of its long-run path, falls back below it, and climbs again, and the four phases have names a business can act on.` },
      { type: 'paragraph', text: `In a **boom**, output is above the path: order books are full, staff are hard to hire and wages and input prices rise. In a **downturn**, growth slows and orders thin. In a **slump**, output is below the path, unemployment rises and firms fail. In a **recovery**, orders return before confidence does.` },
      { type: 'paragraph', text: `What matters commercially is that the phases are **recognised late and never scheduled**. A business finds out it was in a downturn from its own order book, months before anybody publishes a number, and no phase announces how long it will last.` },
      { type: 'paragraph', text: `The cycle is not a fifth influence sitting beside the other four — it is the thing that moves them together. Inflation, interest rates, tax revenue and government spending all shift with the phase, which is why a whole-economy question is rarely about only one of them.` },
    ],
    realExample: { emoji: '📉', text: `A recruitment agency sees a downturn first, because hiring is the first spending a nervous employer stops and the last it restarts.` },
    misconception: `Students describe the cycle as regular, as if a boom lasted a set number of years. It is a shape, not a timetable: the phases vary in length and depth, and a business that planned on a fixed cycle has made a forecast the economy never agreed to.`,
    examMatters: `Appendix 6 defines Explain as cause or effect supported by details. Naming the phase and then the mechanism — orders, prices, hiring — is the detail that separates an explanation from a description of the picture.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each phase of the cycle with the problem a manufacturer most often complains about during it:',
      pairs: [
        { left: 'Output above its long-run path', right: 'Skilled staff cannot be hired at the wage that was budgeted' },
        { left: 'Growth slowing from a high level', right: 'Quotes are still going out and fewer of them turn into orders' },
        { left: 'Output below its long-run path', right: 'Machines stand idle and customers ask for longer to pay' },
        { left: 'Output climbing back towards the path', right: 'Orders arrive faster than the firm can rehire for them' },
      ],
      why: [
        'When everybody is busy, the scarce thing is people, and the wage is bid up by the firm that needs them most.',
        'Interest is still there and commitment is not, which is the signature of the phase before the fall rather than the fall itself.',
        'Demand has gone and the fixed costs have not, and the customers still trading are managing their own cash.',
        'The turn catches firms that cut too deep, and hiring and training take months that the order book does not allow.',
      ],
    }),
  };
})();

const whichBusinessesTheCycleHitsHardest = (() => {
  const sid = subId('which-businesses-the-cycle-hits-hardest');
  return {
    id: sid,
    title: 'Which Businesses the Cycle Hits Hardest',
    keyIdea: 'A swing in the whole economy becomes a much bigger swing for firms selling things that can be postponed, and a much smaller one for firms selling things that cannot.',
    body: [
      { type: 'paragraph', text: `The economy's output moves by a few per cent. Individual firms move by far more, and the difference is what they sell. Anything a customer can put off for a year — furniture, machinery, a new car, a holiday — swings hardest. Anything bought weekly whatever happens barely moves.` },
      { type: 'paragraph', text: `${F.name} is in the first group. A ${pct(F.economySwing)} movement in the economy shows up as roughly ${pct(F.orderSwing)} in its order book, about ${qty(F.amplification)} times as much. In a boom that is ${money(F.boomProfit)} of operating profit; in a bad year it is ${money(F.recessionProfit)}.` },
      { type: 'paragraph', text: `Fixed costs are the second multiplier. ${money(F.operatingExpenses)} a year is owed whether ${F.name} sells ${qty(F.units0)} ${F.unit}s or none, so the swing in profit is far wider than the swing in revenue. A fall of ${pct(F.slumpFall)} in orders leaves ${money(F.slumpProfit)} — a loss.` },
      { type: 'paragraph', text: `**The firm's revenue only has to fall to ${money(F.breakEvenRevenue)} for the profit to reach zero**, which is a quarter of the way down. Knowing that number is what tells a business how much of the cycle it can survive.` },
    ],
    realExample: { emoji: '🍜', text: `A noodle stall and a kitchen-fitting company in the same city meet the same downturn. One loses a few customers; the other loses its year.` },
    misconception: `Students write that a recession is bad for all businesses. Discount retailers, repairers and basic food sellers often grow in one, because customers trade down towards them. The question is never whether the economy shrank; it is what happens to this firm's particular customers.`,
    examMatters: `Appendix 6 defines Analyse as a brief chain with interpretation where data is given. The chain is the phase, then what kind of purchase this firm sells, then what its fixed costs do to the result.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these businesses by whether a downturn hits them harder or more gently than the economy as a whole:',
      groups: [
        { name: 'Hit harder than the economy', items: ['A firm fitting out new offices', 'A dealer in imported sports cars', 'A travel agency selling long-haul holidays'] },
        { name: 'Hit more gently, or helped', items: ['A shoe repairer on a busy street', 'A stall selling rice and cooking oil', 'A discount clothing chain'] },
      ],
      why: [
        'Every one of these sells something a customer can decide to do next year instead, and postponing it costs the customer nothing.',
        'Each of these is either bought whatever happens or is what people move towards when they are being careful, so the downturn sends customers in rather than away.',
      ],
    }),
  };
})();

const planningThroughTheCycle = (() => {
  const sid = subId('planning-through-the-cycle');
  return {
    id: sid,
    title: 'Planning Through the Cycle',
    keyIdea: 'A business cannot forecast the cycle, so it prepares for it instead: flexible costs, a cash reserve, and a spread of customers who do not all stop at once.',
    body: [
      { type: 'paragraph', text: `This is the response half of the cycle bullet, and it starts from an admission: nobody in the firm knows when the turn comes. **The question is never what the economy will do — it is what this business can survive if it does the worst thing.**` },
      { type: 'paragraph', text: `**Make the costs bend.** Agency staff, overtime instead of headcount, rented rather than bought equipment, and subcontracting all cost more per unit in a good year and less in a bad one. That premium is the price of the option to shrink.` },
      { type: 'paragraph', text: `**Hold a reserve.** Cash held through a boom earns very little and is what pays the wages in the quarter when orders stop. A firm that invested the last of it at the top of the cycle is the one that fails at the bottom.` },
      { type: 'paragraph', text: `**Spread the customers.** ${F.name} earns ${money(F.exportRevenue)} abroad and ${money(F.publicRevenue)} from public orders, and those three markets do not turn on the same day. **Prepare in the boom.** Everything above is cheap to arrange when trading is good and impossible to arrange when it is not.` },
    ],
    realExample: { emoji: '🧯', text: `A factory that kept a quarter's wages in reserve through three good years spent it in one bad one and stayed open; the rival that bought a second site did not.` },
    misconception: `Students treat planning for a downturn as pessimism that costs the business growth. It is the purchase of an option, and the premium is real: flexible capacity earns less in a boom. The judgement is how much of that premium this firm's customers make worth paying.`,
    examMatters: `Appendix 6 defines Evaluate as fully developed chains leading to a perceptive conclusion proposing a solution. A conclusion here has to name what the preparation costs in the good years, not only what it saves in the bad one.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four phases of the business cycle in the order an economy passes through them, starting from output at its highest point above the long-run path:',
      correctOrder: [
        'Output is above the long-run path: order books full, staff scarce, input prices rising',
        'Growth slows: quotes still go out, fewer of them become orders, stock builds up',
        'Capacity stands idle below the long-run path, customers pay slowly and firms fail',
        'Orders return before confidence does, and rehiring lags the recovery in demand',
      ],
      why: [
        'This is the top of the swing, where capacity runs out and every cost the firm buys is being bid for by somebody else.',
        'The fall starts with commitment rather than interest, so the first measurable sign is a lower conversion rate rather than a quieter phone.',
        'Once output is below the path, the fixed costs that were an advantage on the way up are what closes the weakest firms.',
        'Demand turns first and employment last, which is why the phase feels worse from inside the firm than the numbers say.',
      ],
    }),
  };
})();

/* ══ Chapter 4 — Legislation (2.3.5 · 2a) ═════════════════════════════════ */

const consumerProtection = (() => {
  const sid = subId('consumer-protection');
  return {
    id: sid,
    title: 'Consumer Protection',
    keyIdea: 'Consumer protection sets a floor under what a buyer can expect: goods that work, descriptions that are true, and a remedy when they are not.',
    body: [
      { type: 'paragraph', text: `Every market this specification's students sit in has consumer protection rules, and they are built on the same three ideas: goods must be **of satisfactory quality**, must **match how they were described**, and must be **fit for the purpose they were sold for**. When they are not, the buyer has a remedy — repair, replacement or refund.` },
      { type: 'paragraph', text: `What matters for 2.3.5 is the effect on the business, not the name of the rule. It sets a cost floor: inspection before despatch, a returns process, and money set aside for claims. ${F.name} spends ${money(F.consumerAnnual)} a year on exactly that.` },
      { type: 'paragraph', text: `It also constrains the marketing. A claim on a label or in an advertisement becomes a promise the firm can be held to, so "lasts a lifetime" is a legal commitment rather than a phrase. Rules on unfair terms make the small print enforceable only if it is fair.` },
      { type: 'paragraph', text: `And it is not only a cost. A floor that every seller has to meet takes the advantage away from the firm that was cutting corners, which is worth most to the business that was already honest.` },
    ],
    realExample: { emoji: '📦', text: `An online seller that lists a desk as solid wood and ships veneer has to take it back at its own cost, and the return freight is larger than the margin on the sale.` },
    misconception: `Students write that consumer protection just adds cost. It adds cost unevenly: the firm already inspecting its output spends almost nothing new, and the firm that was not has to build a process. The advantage moves towards quality, which is the point of the rule.`,
    examMatters: `Appendix 6 defines Explain as cause or effect supported by details. The detail is a specific business consequence — an inspection step, a returns budget, a claim that had to be withdrawn — not the title of a statute.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each thing a seller does wrong with the consumer-protection idea it breaches:',
      pairs: [
        { left: 'A kettle that stops working in the third week', right: 'Goods must be of satisfactory quality' },
        { left: 'A jacket advertised as waterproof that is only shower-resistant', right: 'Goods must match the description given' },
        { left: 'A ladder sold for roof work that is rated for indoor use', right: 'Goods must be fit for the stated purpose' },
        { left: 'A clause hidden in small print removing every remedy', right: 'Contract terms must be fair to be enforceable' },
      ],
      why: [
        'Nothing was misdescribed and nothing was misused: it simply did not last as long as a reasonable buyer would expect.',
        'The item may work perfectly at what it does. The breach is the gap between the words used to sell it and the thing delivered.',
        'The description may even be accurate; the failure is that it was sold for a job it cannot safely do.',
        'This is about the agreement rather than the goods, which is why it is the one of the four a buyer can raise before anything has gone wrong.',
      ],
    }),
  };
})();

const employeeProtection = (() => {
  const sid = subId('employee-protection');
  return {
    id: sid,
    title: 'Employee Protection',
    keyIdea: 'Employee protection sets minimum terms for the people a business employs: a wage floor, a written contract, limits on hours, notice, and freedom from discrimination.',
    body: [
      { type: 'paragraph', text: `The second area at :1022 is **employee protection**, and across the markets these students sit in it covers the same ground: a **minimum wage**, a **written statement of terms**, **limits on working hours**, **notice and fair dismissal**, **leave**, and **protection from discrimination** in hiring, pay and promotion.` },
      { type: 'paragraph', text: `The first-order effect is cost. ${F.name} spends ${money(F.employeeAnnual)} a year on contracts, record-keeping, training and the administration of leave, and a wage floor raises the bill directly for any firm paying near it.` },
      { type: 'paragraph', text: `The second-order effects go both ways. Dismissal rules make hiring a slower decision, so a firm uses overtime or agency staff before it adds a contract. Against that, protected and better-paid staff leave less often, and the cost of replacing a trained worker is months of output.` },
      { type: 'paragraph', text: `The constraint that surprises students is on **flexibility**: a business cannot simply shorten hours in a downturn, so employment law is part of why the cycle is expensive for firms with large permanent workforces.` },
    ],
    realExample: { emoji: '🧑‍🏭', text: `A workshop in Pakistan that raised its lowest wage above the floor lost fewer trained sewers, and stopped paying to retrain replacements twice a year.` },
    misconception: `Students treat employee protection as a pure cost to the employer. Turnover is also a cost, and it is invisible: a firm that loses a trained worker pays for recruitment, for training, and for everything that worker would have produced meanwhile. The two costs are traded against each other, not just added up.`,
    examMatters: `Appendix 6 defines Discuss as chains of reasoning in context with a brief assessment of competing arguments. The competing argument here is almost always cost against retention, and both sides have to be applied to the firm in the source.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these consequences of stronger employee protection by whether they raise or lower a firm\'s costs:',
      groups: [
        { name: 'Raises costs', items: ['A wage floor lifts the bottom of the pay scale', 'Every new hire needs a written statement and a record', 'Shortening hours in a quiet month needs agreement'] },
        { name: 'Lowers costs', items: ['Trained staff stay longer and are replaced less often', 'Fewer disputes end in a tribunal or a settlement', 'A better-run workplace attracts applicants without advertising'] },
      ],
      why: [
        'Each of these is money the firm did not previously spend, and the first one reaches every employer paying anywhere near the floor.',
        'Each of these removes a cost the firm was already paying without counting it, which is why the net effect is an argument rather than an arithmetic.',
      ],
    }),
  };
})();

const healthAndSafety = (() => {
  const sid = subId('health-and-safety');
  return {
    id: sid,
    title: 'Health and Safety',
    keyIdea: 'Health and safety law makes a business responsible for the risks its own work creates: assess them, remove what can be removed, and guard what cannot.',
    body: [
      { type: 'paragraph', text: `The fifth area at :1024 is **health and safety**, and it is the one the live section mentioned once inside a sentence about something else. It is a duty to the people doing the work: **assess the risk**, **remove it where possible**, **guard and train where it is not**, **supply protective equipment**, and **record what happened when something goes wrong**.` },
      { type: 'paragraph', text: `For ${F.name} that is ${money(F.hsCapital)} of guards and extraction on the saws, then ${money(F.hsAnnual)} a year of training, inspection and equipment. It is the smallest of its four compliance budgets and the one with the largest thing behind it.` },
      { type: 'paragraph', text: `**An accident is far more expensive than the prevention.** A serious one stops the cutting line for ${qty(F.accidentDays)} trading days. At ${money(F.dailyRevenue)} of revenue a day that is ${money(F.accidentCost)} of output — ${qty(F.accidentMultiple)} times the entire annual safety budget — before any fine, insurance increase or claim.` },
      { type: 'paragraph', text: `The effects reach beyond cost: the layout of the workshop, the speed a line can run, who may operate what, and the time it takes to bring a new worker to full output.` },
    ],
    realExample: { emoji: '🦺', text: `A factory that fitted guards to its presses lost a week of output installing them, and has not lost a week to an injury since.` },
    misconception: `Students describe safety rules as paperwork that slows production down. The comparison that decides it is not rules against no rules; it is the cost of prevention against the cost of the accident, and the accident takes output, people and insurance terms all at once.`,
    examMatters: `Appendix 6 defines Calculate as working from given data. A safety question often gives a daily revenue and a number of days lost: the comparison the answer needs is that figure against the annual cost of prevention.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A bottling plant trades 300 days a year and takes $9,000,000 of revenue. It spends $45,000 a year on safety. An accident closes the line for 8 days. Work out the comparison, to the nearest dollar:`,
      template: [
        'A trading day is worth $___ thousand of revenue',
        'Eight days lost costs $___ thousand',
        'That is ___ times what a year of prevention costs',
      ],
      answers: ['30', '240', '5.3'],
      hints: ['spread the year evenly over the days it trades', 'multiply the daily figure by the days the line stood still', 'divide the lost output by the annual safety spending'],
      distractors: ['1125', '0.19'],
    }),
  };
})();

const environmentalProtection = (() => {
  const sid = subId('environmental-protection');
  return {
    id: sid,
    title: 'Environmental Protection',
    keyIdea: 'Environmental rules make a business pay for effects it used to pass on: emissions, waste, packaging and the materials it takes out of the ground.',
    body: [
      { type: 'paragraph', text: `The third area at :1023 is **environmental protection**. A firm's production has effects that land on people who are not its customers — smoke, effluent, noise, waste, packaging — and the rules move the cost of those effects back onto the firm that creates them.` },
      { type: 'paragraph', text: `They arrive as **limits** (what may be emitted or dumped), **permits** (an operation that needs approval before it starts), **charges** (on waste, packaging or emissions), **standards** (what a product must meet to be sold) and **responsibility for disposal** at the end of a product's life.` },
      { type: 'paragraph', text: `${F.name} fitted ${money(F.envCapital)} of dust extraction and waste separation and spends ${money(F.envAnnual)} a year on certified timber and disposal. Certified timber costs more per cubic metre and is the only kind several of its export customers will now accept.` },
      { type: 'paragraph', text: `**That last sentence is the whole evaluation.** The same rule is a cost to a firm selling on price and a qualification to a firm selling on reputation, and which one it is depends on the market the business has chosen to be in.` },
    ],
    realExample: { emoji: '🌿', text: `A tannery required to treat its effluent spent a year's profit on the plant, and then won a contract from a European buyer that had refused to deal with it before.` },
    misconception: `Students write that environmental rules simply raise costs and make firms uncompetitive. They raise costs for everyone selling in that market, including importers, and for some firms they create the standard that gets them through a buyer's door. The effect depends on who the customer is.`,
    examMatters: `Appendix 6 defines Assess as a contextualised chain leading to a supported judgement. The judgement is rarely "costly" or "beneficial" on its own: it turns on whether this firm's customers are the kind that will pay for the standard.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these environmental requirements by whether they change what a firm may PRODUCE or what it may SELL:',
      groups: [
        { name: 'Limits on production', items: ['A cap on what may be released from the chimney', 'A permit needed before the plant may run at night', 'A charge on every tonne sent to landfill'] },
        { name: 'Limits on the product', items: ['An efficiency rating the appliance must reach to be listed', 'Packaging that must be recyclable in the market it is sold in', 'The seller must collect the item again when the buyer finishes with it'] },
      ],
      why: [
        'Each of these bites on the process inside the factory gate, so the firm can comply by changing how it makes the same thing.',
        'Each of these attaches to the item itself, so complying means redesigning what is sold rather than how it is made.',
      ],
    }),
  };
})();

const competitionPolicy = (() => {
  const sid = subId('competition-policy');
  return {
    id: sid,
    title: 'Competition Policy',
    keyIdea: 'Competition policy stops firms replacing competition with agreement: no price fixing, no abuse of a dominant position, and mergers that must be approved.',
    body: [
      { type: 'paragraph', text: `The fourth area at :1024 is **competition policy**. Every market these students sit in has one, and the names of the bodies differ while the four prohibitions do not.` },
      { type: 'paragraph', text: `**Agreements between rivals** — fixing a price, dividing a market, rigging a tender, agreeing to hold back output — are the core prohibition, because they give the customer the appearance of choice and none of the substance. **Abuse of a dominant position** catches a large firm using its size to shut rivals out: pricing below cost to drive one under, or tying a product nobody wanted to one they did.` },
      { type: 'paragraph', text: `**Mergers above a size threshold need approval**, which can be refused or made conditional on selling part of the business. **Protection for smaller firms** covers the terms a large buyer may impose on its suppliers.` },
      { type: 'paragraph', text: `For ${F.name} the effect is practical: it may not agree a price with the ${qty(F.smallRivals)} workshops it competes with, and it may complain if a larger rival prices below cost to remove it. Policy is a protection as well as a restriction.` },
    ],
    realExample: { emoji: '⚖️', text: `Three suppliers bidding for the same school contract who agree in advance who will win are rigging the tender, whatever they call the conversation.` },
    misconception: `Students describe competition policy as something done to big firms only. Two small rivals agreeing a price over coffee are doing the thing the rule is aimed at, and the size of the firm changes the penalty rather than whether the conduct is prohibited.`,
    examMatters: `Appendix 6 defines Explain as cause or effect supported by details. Naming which of the four prohibitions the conduct falls under is the detail; "it is against competition law" is the claim it was meant to support.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each piece of conduct with the part of competition policy it runs into:',
      pairs: [
        { left: 'Two rivals agree in advance what each will quote', right: 'Agreements between competitors' },
        { left: 'The largest seller prices below cost until a new rival closes', right: 'Abuse of a dominant position' },
        { left: 'The two biggest firms in a market propose to combine', right: 'Merger approval' },
        { left: 'A large buyer changes agreed terms after delivery', right: 'Protection of smaller suppliers' },
      ],
      why: [
        'Nothing about the market has changed except that the choice offered to the customer is now a performance.',
        'The conduct would be unremarkable from a small firm; what makes it a breach is that the firm is large enough for it to work.',
        'This is decided before anything happens, because a market that has lost its competition is hard to put back.',
        'The conduct is between two businesses rather than aimed at a consumer, and the imbalance rather than the market share is the issue.',
      ],
    }),
  };
})();

const intellectualPropertyRights = (() => {
  const sid = subId('intellectual-property-rights');
  return {
    id: sid,
    title: 'Intellectual Property Rights',
    keyIdea: 'Intellectual property rights let a business stop others copying what it created. The three the specification names protect different things and last for very different times.',
    body: [
      { type: 'paragraph', text: `The sixth area at :1025 brackets three rights, and they are not interchangeable. **A patent protects a new invention or process.** It has to be applied for, is examined before it is granted, and lasts up to ${yrs(F.patentYears)} from filing. In exchange the invention is published, so everyone can read how it works and nobody may use it.` },
      { type: 'paragraph', text: `**Copyright protects a created work** — drawings, photographs, catalogues, text, software. It arises automatically the moment the work is made, needs no registration and no fee, and lasts for decades. It protects the expression, never the idea: a rival may build a similar chair and may not copy the drawings of this one.` },
      { type: 'paragraph', text: `**A trademark protects a brand identifier** — a name, a logo, a slogan. It is registered in each market where it is used and can be renewed without limit for as long as it is used, which makes it the only one of the three that need never expire.` },
      { type: 'paragraph', text: `For a business they do three jobs: **exclude** a copier, **licence** the right to someone else for a fee, and **carry value on the balance sheet**. ${F.name}'s folding mechanism is patented, and a rival pays ${money(F.licenceFee)} a year to use it.` },
    ],
    realExample: { emoji: '💡', text: `A drinks maker can protect its bottle shape and its name indefinitely by registration, and loses exclusivity over the recipe the day its patent expires.` },
    misconception: `Students use the three words as synonyms and write that a firm "patents its brand name". A brand name is registered as a trademark; a patent is for an invention and expires; copyright covers the material the brand is presented with. Naming the wrong right makes the rest of the answer unusable.`,
    examMatters: `Appendix 6 defines Define as requiring a term or phrase to be defined. Two marks means two things — what the right protects, and how it is obtained or how long it lasts — rather than the same statement twice.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these things a furniture maker owns by which right protects each one:',
      groups: [
        { name: 'Patent', items: ['A hinge mechanism nobody has built before', 'A process that cures glue in half the usual time'] },
        { name: 'Copyright', items: ['The photographs in this season\'s catalogue', 'The assembly instructions printed in the box'] },
        { name: 'Trademark', items: ['The name painted on the delivery vans', 'The symbol stamped under every seat'] },
      ],
      why: [
        'Both are new technical solutions, which is the only thing examined and granted for a fixed term in exchange for publication.',
        'Both are created works rather than inventions or names, so protection exists from the moment they are made and no application is involved.',
        'Both identify who made the goods rather than saying anything about how they work, and both can be renewed for as long as the business uses them.',
      ],
    }),
  };
})();

const respondingToLegislation = (() => {
  const sid = subId('responding-to-legislation');
  return {
    id: sid,
    title: 'Responding to Legislation',
    keyIdea: 'Compliance is a cost with a return. A business decides how much to spend on it by comparing the spend with what breaking the rule would cost.',
    body: [
      { type: 'paragraph', text: `Add up what ${F.name} spends on the six areas: ${money(F.consumerAnnual)} on consumer protection, ${money(F.employeeAnnual)} on employment, ${money(F.hsAnnual)} on safety and ${money(F.envAnnual)} on the environment. That is ${money(F.compliance)} a year, ${pct(F.compliancePctRevenue)} of revenue and ${pct(F.compliancePctProfit)} of the operating profit.` },
      { type: 'paragraph', text: `Set against that, what non-compliance costs: fines, claims, the output lost while a line is stopped, insurance that reprices, contracts that are withdrawn, and the customers who read about it. Those costs are larger, arrive without warning, and land in one year rather than being spread across ten.` },
      { type: 'paragraph', text: `The responses that work are the dull ones: **design compliance in** rather than bolting it on, **train the people who do the work**, **document what was done**, and **treat a rule with a lead time as a project with a deadline**. A firm that redesigns once spends less than one that inspects for ever.` },
      { type: 'paragraph', text: `And the strategic answer is to notice who else the rule applies to. A standard that every seller in the market must meet, including importers, removes the advantage of the cheapest corner-cutter — so the firm that was already meeting it has just been handed something.` },
    ],
    realExample: { emoji: '📋', text: `A food producer that rebuilt its packaging line to meet a new labelling rule spent once; the rival that kept relabelling by hand is still paying for it every week.` },
    misconception: `Students conclude that businesses should do the minimum the rules require. The minimum is a defensible choice and it is not automatically the cheapest one: the firm that spends a little more to design the requirement into the product stops paying the recurring cost of working around it.`,
    examMatters: `Appendix 6 defines Evaluate as fully developed chains leading to a perceptive conclusion proposing a solution or recommendation. A conclusion about compliance has to compare the spend with the cost of the failure it prevents, and say which firms the rule helps.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A bakery has revenue of $2,000,000 and operating profit of $180,000. It spends $30,000 a year on compliance. A hygiene failure would close it for 15 of its 250 trading days. Work out the comparison, to one decimal place where needed:`,
      template: [
        'Compliance takes ___ of its revenue and ___ of its operating profit',
        'Fifteen days closed would cost it $___ thousand of revenue',
        'So prevention costs ___ of what one failure would take away',
      ],
      answers: ['1.5%', '16.7%', '120', 'a quarter'],
      hints: ['the spending against the top line', 'the same spending against the profit line', 'spread the revenue over the trading days, then multiply', 'compare the annual spending with the revenue lost'],
      distractors: ['3%', '300'],
    }),
  };
})();

/* ══ Chapter 5 — The Competitive Environment (2.3.5 · 3a, 3b) ═════════════ */

const competitorNumbers = (() => {
  const sid = subId('competitor-numbers');
  return {
    id: sid,
    title: 'Competitor Numbers',
    keyIdea: 'How many firms a business competes with decides how much of its price it controls and how quickly a good year is copied.',
    body: [
      { type: 'paragraph', text: `The first of the three dimensions at :1028 is **numbers**. ${F.name} competes with ${qty(F.smallRivals)} small workshops and ${qty(F.largeRivals)} large importers, and sells ${qty(F.units0)} of the ${qty(F.marketUnits)} ${F.unit}s bought in its market — a share of ${pct(F.share)}.` },
      { type: 'paragraph', text: `**More rivals means less control of the price.** A buyer with forty quotes to choose from sets the price; the seller accepts it. Customers also find it easy to switch, so a poor delivery costs the order rather than an apology.` },
      { type: 'paragraph', text: `Numbers are not fixed, and what holds them down is how hard the market is to enter. Where the equipment is cheap and no licence is needed, a good year attracts entrants: ${qty(F.newEntrants)} new workshops opened in ${F.name}'s market last year, and all of them are now quoting against it.` },
      { type: 'paragraph', text: `**Fewer rivals is not automatically comfortable.** A firm facing two large competitors rather than forty small ones has fewer quotes against it and much more to lose from each one, because a single lost customer can be a tenth of the year.` },
    ],
    realExample: { emoji: '🛵', text: `A city with a dozen delivery apps and one with two are different businesses to be in: the first competes on price every day, the second on whatever the other one is not doing.` },
    misconception: `Students assume that fewer competitors is always better for a firm. It concentrates the risk: when there are two rivals rather than forty, each customer is a much larger share of the order book and each competitive move is aimed directly at this business.`,
    examMatters: `Appendix 6 defines Analyse as a brief chain with interpretation where data is given. Given a number of rivals and a market share, the chain runs from how many quotes a buyer can get to how much price the firm controls.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A market buys 80,000 units a year. One firm sells 6,400 of them and three rivals sell 12,000 each. Work out where it stands, to one decimal place where needed:`,
      template: [
        'The firm\'s share of the market is ___',
        'The three rivals together hold ___',
        'The rest of the market, held by everybody else, is ___',
      ],
      answers: ['8%', '45%', '47%'],
      hints: ['its own sales against the whole market', 'add the three together first, then compare with the market', 'what is left once the first two figures are taken out'],
      distractors: ['15%', '53%'],
    }),
  };
})();

const competitorSize = (() => {
  const sid = subId('competitor-size');
  return {
    id: sid,
    title: 'Competitor Size',
    keyIdea: 'A larger competitor buys cheaper, spends more on reaching customers, and can lose money for longer. Size is an advantage in cost and in endurance.',
    body: [
      { type: 'paragraph', text: `The second dimension at :1029 is **size** — the size of the competitors, which is a different question from how many of them there are. ${F.name} buys timber by the pallet; the large importer buys it by the container, and its cost of sales is ${money(F.rivalUnitCost)} a ${F.unit} against ${money(F.unitCost)}, a gap of ${pct(F.scaleGap)}.` },
      { type: 'paragraph', text: `That gap is not skill. It comes from **buying power**, from spreading a fixed cost — a designer, a delivery fleet, a website — over far more units, and from being able to run specialised equipment at full capacity.` },
      { type: 'paragraph', text: `**Endurance is the second advantage and the more dangerous one.** A large rival can sell below cost in one town while the rest of its business pays for it. A small firm losing money in its only market is losing money everywhere it operates.` },
      { type: 'paragraph', text: `What size costs is speed. A big firm changes a specification through a process; a small one changes it on the workshop floor on Tuesday. That is the gap a smaller business sells into, and the last subsection of this chapter is about how.` },
    ],
    realExample: { emoji: '📦', text: `A regional grocer and a national chain pay different prices for the same case of rice, and the difference is decided in the buying office rather than in either shop.` },
    misconception: `Students treat a large rival's lower price as proof it is better run. Much of the gap is bought with volume rather than earned with efficiency, which matters because it tells a small firm that copying the price is hopeless and that competing on something else is not.`,
    examMatters: `Appendix 6 defines Assess as a contextualised chain leading to a supported judgement. A judgement about a larger rival has to separate the part of its advantage that comes from size from the part a smaller firm could actually match.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each advantage a large competitor has with the reason its size produces it:',
      pairs: [
        { left: 'It pays less for the same materials', right: 'It orders in quantities a supplier will discount' },
        { left: 'It advertises where a small firm cannot afford to', right: 'The cost is spread over far more units sold' },
        { left: 'It can trade at a loss in one town for a year', right: 'Profits made elsewhere pay for the loss' },
        { left: 'It runs machines a small firm could never fill', right: 'Its volume keeps specialised equipment busy' },
      ],
      why: [
        'The discount is a function of the order size rather than of how well either firm is run.',
        'The same campaign costs the same money and is divided by a much larger number of sales.',
        'This is the advantage that decides price wars, because it is about how long a loss can be carried rather than how big it is.',
        'Equipment that only pays at high output is unavailable to a firm that cannot reach the output, whatever it would cost to buy.',
      ],
      distractors: ['Its staff are individually more productive'],
    }),
  };
})();

const competitorBehaviour = (() => {
  const sid = subId('competitor-behaviour');
  return {
    id: sid,
    title: 'Competitor Behaviour',
    keyIdea: 'What rivals actually do — cut prices, advertise, launch, lock in distributors — matters more week to week than how many of them there are or how big they are.',
    body: [
      { type: 'paragraph', text: `The third dimension at :1030 is **behaviour**, and it is the one a business feels on a Monday morning. Rivals cut prices, launch new models, advertise, extend guarantees, sign exclusive deals with distributors, and undercut on delivery time.` },
      { type: 'paragraph', text: `**A price war is the behaviour to be able to price.** If the large importer cuts to ${money(F.warPrice)} and ${F.name} matches, each ${F.unit} leaves ${money(F.warContribution)} rather than ${money(F.contribution)} towards the ${money(F.operatingExpenses)} of fixed costs. At the same volume that is ${money(F.matchProfit)} — a loss.` },
      { type: 'paragraph', text: `**Holding the price and losing customers is usually the better of two bad options.** Losing ${pct(F.holdVolumeFall)} of its volume at the old price leaves ${money(F.holdProfit)}, which is small and is not a loss. The arithmetic says so: matching needs ${qty(F.breakEvenUnitsWar)} ${F.unit}s to break even against ${qty(F.breakEvenUnits)} before, ${pct(F.warVolumeNeeded)} more sales in the middle of a price war.` },
      { type: 'paragraph', text: `Non-price behaviour is answered differently. An exclusive distribution deal is answered by finding another route to the customer, and a rival's new model by having one of your own ready.` },
    ],
    realExample: { emoji: '🏷️', text: `A stationery supplier that matched a national chain's discount on every line spent a year working for nothing and finished it with the same customers it started with.` },
    misconception: `Students recommend matching a price cut because the firm will otherwise lose sales. It will, and losing a fifth of the volume at the old price is usually better than keeping all of it at the new one. No cost falls when a price is cut, so the whole reduction comes out of the profit.`,
    examMatters: `Appendix 6 defines Calculate as working from given data, with workings shown. A price-war question is answered by working out the profit both ways and comparing them, not by arguing about market share.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these steps in the order a business works through them when a rival cuts its price, from the first thing to establish to the decision:',
      correctOrder: [
        'Establish how much each sale leaves once its own materials are paid for',
        'Work out how many sales are needed at the lower price to cover the fixed costs',
        'Estimate how much volume is lost by holding the old price instead',
        'Compare the profit on each route and choose the less bad one',
      ],
      why: [
        'Nothing later can be worked out until this is known: it is the figure the fixed costs have to be recovered from.',
        'A lower price leaves less per sale, so the number needed rises — and seeing how far it rises is what makes the decision obvious.',
        'The alternative has to be priced too, and it costs customers rather than margin, which is the comparison the decision turns on.',
        'Both routes are worse than yesterday, so the answer is the smaller loss and not a way of avoiding one.',
      ],
    }),
  };
})();

const aChangingCompetitiveEnvironment = (() => {
  const sid = subId('a-changing-competitive-environment');
  return {
    id: sid,
    title: 'A Changing Competitive Environment',
    keyIdea: 'Competitive environments change in four ways: new firms enter, existing ones merge, a substitute arrives, or the established firms start behaving differently.',
    body: [
      { type: 'paragraph', text: `Numbers, size and behaviour are all moving all the time, and 2.3.5 · 3a is about the EFFECTS of that. **New entrants** add capacity that has to be filled, so prices fall before anybody has decided to cut them. **Mergers** turn two medium rivals into one large one and change both the numbers and the sizes at once.` },
      { type: 'paragraph', text: `**A substitute** is the change that does the most damage, because it is the one a firm is not watching for. It does not come from a rival in the same trade: it is a different way of getting the same job done, and it can remove a market rather than taking share in it.` },
      { type: 'paragraph', text: `**Changed behaviour** is the fourth. A rival that has been comfortable for years and is suddenly discounting, advertising and hiring has usually been bought, refinanced or given a target, and the change will outlast the campaign.` },
      { type: 'paragraph', text: `The responses are the same four every time: **differentiate** so the comparison is harder, **cut cost** so a lower price is survivable, **move** to a segment the change does not reach, or **specialise** far enough that the entrant is not selling the same thing. What a business must not do is answer a permanent change with a temporary discount.` },
    ],
    realExample: { emoji: '📼', text: `Video rental shops were not beaten by a better video rental shop. Streaming removed the trip to the shop, which was the thing the whole business existed to provide.` },
    misconception: `Students watch for competitors that look like the business. The dangerous change usually arrives from outside the trade, because it competes with the job the customer was hiring the product to do rather than with the product itself.`,
    examMatters: `Appendix 6 defines Discuss as chains of reasoning in context with a brief assessment of competing arguments. The competing arguments are usually the four responses, and the assessment turns on whether the change is temporary or permanent.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in a competitive environment with the effect it has on the firms already in the market:',
      pairs: [
        { left: 'Six new workshops open in one year', right: 'Capacity has to be filled, so prices fall before anyone chooses to cut them' },
        { left: 'Two medium-sized rivals combine', right: 'One competitor now has the buying power neither had alone' },
        { left: 'A cheaper way of doing the same job appears', right: 'The market itself can shrink rather than be shared out' },
        { left: 'A quiet rival begins discounting and advertising heavily', right: 'Something has changed behind it, and the pressure will outlast the campaign' },
      ],
      why: [
        'Nobody has decided anything about price: the extra output has to go somewhere and the price is what gives way.',
        'The numbers fall and the sizes rise in the same week, which is why this change is felt on two dimensions at once.',
        'This is the change that is not a competitor at all, which is exactly why it is the one nobody is watching.',
        'The behaviour is a symptom. Answering the discount without asking what produced it treats a permanent change as a temporary one.',
      ],
    }),
  };
})();

const howASmallBusinessCompetes = (() => {
  const sid = subId('how-a-small-business-competes');
  return {
    id: sid,
    title: 'How a Small Business Competes',
    keyIdea: 'A small firm competes on the things size makes difficult: a narrow specialism, speed, closeness to the customer, and a reputation it owns.',
    body: [
      { type: 'paragraph', text: `:1031 asks directly for **ways for a small business to compete in a competitive market**, and the first rule is negative: not on price. A rival buying ${pct(F.scaleGap)} cheaper wins any contest decided by the number on the quote.` },
      { type: 'paragraph', text: `**Specialise.** A **niche** is a segment too small to interest a large firm and large enough to fill a workshop. ${F.name}'s bespoke café fit-outs sell ${qty(F.nicheUnits)} ${F.unit}s at ${money(F.nichePrice)} against a list price of ${money(F.price)}, and leave ${money(F.nicheGain)} more than the same ${F.unit}s sold as standard stock.` },
      { type: 'paragraph', text: `**Be quick and flexible.** A change agreed on the workshop floor on Tuesday takes a large competitor a month. **Be close to the customer.** The owner answering the phone knows the last order and can decide on the call, which is a service a process cannot buy.` },
      { type: 'paragraph', text: `**Own a reputation.** Design, quality and after-sales service protected by a registered trademark cannot be bought in volume. **Buy together.** Small firms in a buying group narrow the cost gap without giving up any of the above.` },
    ],
    realExample: { emoji: '🧵', text: `A tailor in Colombo competing with imported suits sells a fitting the importer cannot offer, at a price the importer would not bother with.` },
    misconception: `Students advise small firms to cut costs and match the price. The cost gap is bought with volume the small firm does not have, so matching is a race it loses by arithmetic. Everything that works runs the other way: charge more for something the large rival cannot supply.`,
    examMatters: `Appendix 6 defines Evaluate as fully developed chains leading to a perceptive conclusion proposing a solution or recommendation. A recommendation for a small firm has to name the segment and say why a larger rival would not follow it there.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A small bakery sells 1,200 celebration cakes a year at $60 each, costing $25 each to make, against a supermarket selling standard cakes at $18. Its fixed costs are $30,000. Work it out:`,
      template: [
        'Each celebration cake leaves $___ towards the fixed costs',
        'Twelve hundred of them leave $___ thousand, so the year\'s profit is $___ thousand',
        'It can charge more than three times the supermarket price because it sells something the supermarket does not: a cake made ___',
      ],
      answers: ['35', '42', '12', 'to order'],
      hints: ['the price less what one costs to make', 'multiply that by the number sold', 'take the fixed costs off the figure you just found', 'say what a standard cake on a shelf cannot be'],
      distractors: ['43', '72'],
    }),
  };
})();

/* ══ The chapter plan ═════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [whatAnExternalInfluenceIs, theRateOfInflation, respondingToInflation, exchangeRates, respondingToACurrencyMovement],
    takeaway: [
      'Name the line of the business the change lands on.',
      'A cost rise is multiplied by the margin it lands on.',
      'A fifth off the currency is a quarter onto an import bill.',
      'The same movement helps the exporter and hurts the importer.',
    ],
  },
  {
    title: B2,
    subs: [interestRates, respondingToARateRise, taxation, governmentSpending],
    takeaway: [
      'A rate rise reaches customers before it reaches the loan.',
      'Interest is taken off below the operating profit line.',
      'Taxes land in three places; say which one moved.',
      'Government spending reaches firms that never sell to it.',
    ],
  },
  {
    title: B3,
    subs: [theBusinessCycle, whichBusinessesTheCycleHitsHardest, planningThroughTheCycle],
    takeaway: [
      'Boom, downturn, slump, recovery — a shape, not a timetable.',
      'Postponable purchases swing far more than the economy does.',
      'Fixed costs widen the swing in profit beyond the swing in sales.',
      'Prepare in the boom; nothing can be arranged in the slump.',
    ],
  },
  {
    title: B4,
    subs: [consumerProtection, employeeProtection, healthAndSafety, environmentalProtection, competitionPolicy, intellectualPropertyRights, respondingToLegislation],
    takeaway: [
      'Answer with the effect on the business, never a statute name.',
      'A patent expires; a trademark need never expire.',
      'Prevention is cheaper than the accident it prevents.',
      'A standard everyone must meet can be an advantage.',
    ],
  },
  {
    title: B5,
    subs: [competitorNumbers, competitorSize, competitorBehaviour, aChangingCompetitiveEnvironment, howASmallBusinessCompetes],
    takeaway: [
      'Numbers decide price control; size decides who can endure.',
      'No cost falls when a price is cut, so profit takes all of it.',
      'The dangerous change usually arrives from outside the trade.',
      'A small firm charges more for what size cannot supply.',
    ],
  },
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

export const ATTACH_SLUGS = SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, ''));

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE. `structure-07`
 * and `structure-06` are the two ends of one defect — the quiz and the practice tested legislation
 * the content never taught, and the takeaways summarised material the specification does not
 * contain. Making the notes titles BE the chapter titles and the figures BE this module's figures
 * means the two surfaces cannot diverge again, and `depth.notes-titles` is satisfied by
 * construction rather than by checking.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these notes only after publication (DECISIONS, 16 September). Verify them
 * against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2.3.5 · 1a',
    keyIdea: 'What a rising price level and a moving currency do to one firm\'s costs, revenue and margin, and the four answers to each.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Inflation</strong> — a sustained rise in the general level of prices, measured as a rate.'),
        def('<strong>Appreciation</strong> — the home currency buys more foreign currency than before.'),
        def('<strong>Depreciation</strong> — the home currency buys less than before.'),
        def('<strong>External influence</strong> — a change outside the firm that it cannot prevent and has to answer.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.name}: ${pct(F.inflation)} on ${money(F.costOfSales)} of cost of sales is ${money(F.inflationCostRise)}, and operating profit falls ${money(F.operatingProfit)} → ${money(F.inflationProfit)}, a fall of ${pct(F.inflationProfitFall)}.`),
        mech(`Holding profit needs ${pct(F.priceRiseToHold)} on the price. A wage claim of ${pct(F.inflation)} adds ${money(F.wageClaim)} and leaves ${money(F.inflationProfitWithWages)}.`),
        mech(`${fx(F.e0)} → ${fx(F.e1)} is ${pct(F.depreciationPct)} down and ${pct(F.importRisePct)} up on the import bill: ${money(F.importedMaterials)} → ${money(F.importAtE1)}. Exports ${money(F.exportRevenue)} → ${money(F.exportAtE1)}. Net operating profit ${money(F.depProfit)}.`),
        link('A cost rise is multiplied by the reciprocal of the operating margin. A thin margin turns a small cost rise into a large profit fall.'),
      ] },
    ],
    takeaway: [
      'Say which line of the business the change reaches.',
      'Passing it on works only if the customers have nowhere to go.',
      'A firm that both imports and exports has to net the two off.',
    ],
  },
  {
    title: B2,
    meta: '2.3.5 · 1a',
    keyIdea: 'The two channels a rate rise travels down, the three places a tax lands, and the four ways public spending reaches a firm.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Interest rate</strong> — the price of borrowing, paid by the firm and by its customers.'),
        def('<strong>Employer payroll charge</strong> — a tax on employing people, inside the operating expenses.'),
        def('<strong>Indirect tax</strong> — a tax added to the price the buyer pays at the till.'),
        def('<strong>Public procurement</strong> — the state buying goods and services as a customer.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${pts(F.rateRise)} on ${money(F.loan)} costs ${money(F.interestExtra)} and leaves operating profit untouched. A ${pct(F.rateDemandFall)} fall in orders costs ${money(F.demandChannel)} — more than three times as much.`),
        mech(`Profit tax ${pct(F.profitTax0)} → ${pct(F.profitTax1)}: kept ${money(F.keptAfterTax0)} → ${money(F.keptAfterTax1)}. Payroll charge ${pct(F.payrollRate)} → ${pct(F.payrollRate1)}: operating profit ${money(F.payrollProfit)}. Sales tax ${pct(F.salesTax0)} → ${pct(F.salesTax1)}: the buyer pays ${money(F.buyerPrice0)} → ${money(F.buyerPrice1)}.`),
        mech(`Public orders ${money(F.publicRevenue)}; a ${pct(F.publicCut)} cut removes ${money(F.publicLost)} and leaves ${money(F.publicCutProfit)}.`),
        link('Orders, infrastructure, subsidies and the incomes of public employees — only the first requires a public contract.'),
      ] },
    ],
    takeaway: [
      'A firm with no borrowing still loses the customers who had some.',
      'An indirect tax is collected from the customer, not paid by the firm.',
      'Dependence on one budget is the risk worth naming.',
    ],
  },
  {
    title: B3,
    meta: '2.3.5 · 1a',
    keyIdea: 'The four phases, why a small swing in the economy is a large swing for some firms, and what preparation costs in a good year.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Business cycle</strong> — the repeated swing of output around its long-run path.'),
        def('<strong>Boom</strong> — output above the path: full order books, scarce staff, rising input prices.'),
        def('<strong>Slump</strong> — output below the path: idle capacity, slow payment, failures.'),
        def('<strong>Recovery</strong> — output climbing back, with orders returning before hiring does.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`A ${pct(F.economySwing)} movement in the economy is about ${pct(F.orderSwing)} in this firm's orders, ${qty(F.amplification)} times as much: boom ${money(F.boomProfit)}, bad year ${money(F.recessionProfit)}.`),
        mech(`${money(F.operatingExpenses)} of fixed costs is owed at any volume, so a ${pct(F.slumpFall)} fall in orders gives ${money(F.slumpProfit)}. Profit reaches zero at revenue of ${money(F.breakEvenRevenue)}.`),
        link('Flexible costs, a cash reserve and a spread of customers are all cheap to arrange in a boom and impossible to arrange in a slump.'),
      ] },
    ],
    takeaway: [
      'Postponable purchases amplify the cycle; weekly ones damp it.',
      'Some firms grow in a downturn as customers trade down to them.',
      'Know the revenue at which this firm\'s profit reaches zero.',
    ],
  },
  {
    title: B4,
    meta: '2.3.5 · 2a',
    keyIdea: 'What each of the six areas requires, what compliance costs this firm, and why the same rule is a burden to one business and a door to another.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>The six areas</strong> — ${andList(LEGISLATION_AREAS)}.`),
        def('<strong>Patent</strong> — a new invention, applied for and examined, protected up to 20 years from filing.'),
        def('<strong>Copyright</strong> — a created work, protected automatically from the moment it is made, for decades.'),
        def('<strong>Trademark</strong> — a brand identifier, registered per market, renewable without limit.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Compliance: ${money(F.consumerAnnual)} + ${money(F.employeeAnnual)} + ${money(F.hsAnnual)} + ${money(F.envAnnual)} = ${money(F.compliance)}, which is ${pct(F.compliancePctRevenue)} of revenue and ${pct(F.compliancePctProfit)} of operating profit.`),
        mech(`One serious accident stops the line ${qty(F.accidentDays)} days: ${money(F.accidentCost)} of output, ${qty(F.accidentMultiple)} times a whole year of prevention.`),
        mech('Competition policy prohibits four things: agreements between rivals, abuse of a dominant position, unapproved mergers above a threshold, and unfair terms imposed on smaller suppliers.'),
        link('A standard every seller must meet, importers included, removes the advantage of the cheapest corner-cutter.'),
      ] },
    ],
    takeaway: [
      'Answer with the effect on the firm, never the name of an Act.',
      'Name which of the three intellectual property rights applies.',
      'Compare the compliance spend with what a failure would cost.',
    ],
  },
  {
    title: B5,
    meta: '2.3.5 · 3a, 3b',
    keyIdea: 'Numbers, size and behaviour, the four ways an environment changes, and the ways a small firm can compete without matching a price.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>The three dimensions</strong> — competitor ${andList(COMPETITION_DIMENSIONS)}.`),
        def('<strong>Price war</strong> — rivals cutting price against each other, with no cost falling alongside.'),
        def('<strong>Substitute</strong> — a different way of doing the job the customer was buying the product for.'),
        def('<strong>Niche</strong> — a segment too small to interest a large rival and large enough to fill a small firm.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${qty(F.smallRivals)} small rivals and ${qty(F.largeRivals)} large ones; ${qty(F.units0)} of ${qty(F.marketUnits)} units is a ${pct(F.share)} share; ${qty(F.newEntrants)} entrants last year.`),
        mech(`Scale gap: ${money(F.rivalUnitCost)} against ${money(F.unitCost)} a unit, ${pct(F.scaleGap)}. Matching a cut to ${money(F.warPrice)} gives ${money(F.matchProfit)}; holding the price and losing ${pct(F.holdVolumeFall)} of volume gives ${money(F.holdProfit)}.`),
        mech(`Break-even moves from ${qty(F.breakEvenUnits)} units to ${qty(F.breakEvenUnitsWar)} — ${pct(F.warVolumeNeeded)} more sales needed, in the middle of a price war.`),
        link(`The niche: ${qty(F.nicheUnits)} units at ${money(F.nichePrice)} leave ${money(F.nicheGain)} more than the same units sold as standard stock.`),
        link('If you have met Porter\'s five forces elsewhere: it is taught at 3.3.1 in Unit 3 and applied to market entry at 4.3.2 in Unit 4. It is not part of 2.3.5, which asks for competitor numbers, size and behaviour.'),
      ] },
    ],
    takeaway: [
      'More rivals means less control of the price, not just more quotes.',
      'Size buys cost and endurance; it does not buy speed.',
      'Do not answer a permanent change with a temporary discount.',
    ],
  },
];
