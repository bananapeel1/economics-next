/**
 * PACKET 31 — financial-planning, Learn Mode content and Notes.
 *
 * Business Unit 2 (WBS12), IAL topic 2.3.2, audit/raw/bus_spec.txt:885-914. FIVE blocks — the
 * specification's own five sub-topics, in its own order — twenty-five subsections, one idea each.
 *
 * FIVE AND NOT SIX, AND FOR ONCE THE BLOCK COUNT COSTS NOTHING. `freeQuizPayload()` takes the
 * chapter pins FIRST since packet 2.5 and only then tops the Quiz tab up to `PREVIEW_LIMITS.quiz`,
 * so five chapters spend five of `FREE_QUIZ_MAX` (10), the tab's two come out of those five, and
 * `PRETEST_HEADROOM` (3) is paid in full. The ceiling is ten chapters now, not the eight packet 29
 * priced. The specification's five sub-topics are also the right pedagogy here — each one is a
 * different piece of arithmetic — so nothing had to be traded.
 *
 * THE LIVE SECTION HAS FIVE BLOCKS TOO, AND THAT IS NOT WHAT WAS WRONG WITH IT. Thirteen
 * subsections carried twenty-one leaves, so `structure-03` measured step weight swinging from one
 * subsection to two subsections plus five widgets, and four leaves were missing altogether. The fix
 * is more steps, not denser ones — packet 16's 15 → 21 and packet 17's 18 → 24, and here 13 → 25.
 *
 * WHAT IS REMOVED, AND NEITHER REMOVAL IS ASKED FOR BY ANY FINDING:
 *
 *   - **`Improving Cash Flow`.** `structure-06` says "improving cash flow is 2.3.3 Liquidity
 *     content" and it is right: 2.3.2 · 4b is "Use and limitations of cash-flow forecasts", and
 *     "ways to improve liquidity, including assets, supplier credit terms, factoring, inventory JIT"
 *     is 2.3.3 · 2b at :935-937, `managing-finance`. The finding proposes cross-linking; a
 *     subsection teaching another section's leaf is not cross-linked, it is deleted. The
 *     specification's own 4b — what the forecast is FOR and what it cannot tell you — takes its step.
 *   - **`Profit and Loss`.** No finding mentions it. Profit calculation is 2.3.3 · 1a (gross,
 *     operating, net), and "the distinction between profit and cash" is 2.3.3 · 2a. What this
 *     section owns is profit as the vertical GAP between revenue and total cost at a given output,
 *     which is `3e` read off the chart and computed from `1a` and `1b`. An audit item tells you what
 *     is MISSING and never what is PRESENT and should not be — the tenth and eleventh instances.
 *
 * AND WHAT IS NOT WRITTEN, from the rule-2 greps (see `_packet31-util.mjs`): no moving averages, no
 * extrapolation, no total contribution, no semi-variable or stepped costs, no "break-even output".
 * Each is a leaf another section owns, and the runner refuses on all of them.
 *
 * RECALLS. Fourteen over twenty-five subsections, against the 0.5 `depth.recalls` wants. Every one
 * applies the idea to FIGURES or to a new case, because packet 29's Verify B found 24 of 43 steps
 * carrying a recall answerable by scrolling up and not one of them was a reorder — the defect was a
 * property of the screen, not of the recall type. The three reorders are sourced from extras chains
 * (packet 27's decision) and no subsection carrying a `flow` body carries a reorder.
 */
import {
  SECTION, subId, id, money, qty, pct, signed, round2,
  PLANT, CHANGES, CHANGE, CUT, FORECAST, CASHFLOW, BUDGET,
  FORECAST_DIFFICULTIES, BREAKEVEN_LIMITS, CASHFLOW_USES, CASHFLOW_LIMITS,
  BUDGET_PURPOSES, BUDGET_DIFFICULTIES,
} from './_packet31-util.mjs';

export const B1 = 'Sales, Revenue and Costs';
export const B2 = 'Sales Forecasting';
export const B3 = 'Break-Even';
export const B4 = 'Cash Flow';
export const B5 = 'Budgets';
export const BLOCK_TITLES = [B1, B2, B3, B4, B5];

const P = PLANT;

/** A recall with an id derived from its subsection, so `pickSpacedRecall` has a stable key. */
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

/* ══════════════════════════════════════════════════════════════════════════════
   BLOCK 1 — Sales, Revenue and Costs (2.3.2 · 1a, 1b, 1c)
   ══════════════════════════════════════════════════════════════════════════ */

/* `1a`. Two quantities, and the specification names them separately for a reason: a firm can sell
   more cases and take less money. That is the whole of subsection 1.5, so it is set up here. */
const volumeRevenue = (() => {
  const sid = subId('sales-volume-and-revenue');
  return {
    id: sid,
    title: 'Sales Volume and Sales Revenue',
    keyIdea: `Sales volume is how many units are sold; sales revenue is what they were sold for. Revenue is price multiplied by volume, so the two can move in opposite directions.`,
    body: [
      { type: 'paragraph', text: `**Sales volume** counts things. **Sales revenue** counts money. The specification lists them together and it lists them as two calculations, because a firm that reports "sales are up" has told you nothing until you know which one it meant.` },
      { type: 'paragraph', text: `**Sales revenue = selling price × sales volume.** ${P.name} sells ${P.good} by the ${P.unit} at ${money(P.price)}. At ${qty(P.actual)} ${P.units} ${P.per} its revenue is ${money(P.tr(P.actual))}.` },
      { type: 'paragraph', text: `Because revenue is a product of two numbers, a change in one can be undone by a change in the other. Sell ${qty(24000)} ${P.units} at ${money(5.4)} and the volume is up by a fifth while the revenue is ${money(CUT.tr)} — up by only ${money(CUT.revenueGain)}. Sell ${qty(24000)} at ${money(4.8)} and the volume is up a fifth while the revenue has FALLEN to ${money(round2(4.8 * 24000))}.` },
      { type: 'paragraph', text: `So the two questions a firm asks are different questions: how many can we sell, and what will we take for them. Everything in this chapter is one or the other.` },
    ],
    realExample: { emoji: '🧃', text: `A juice bottler that wins a supermarket listing reports a jump in volume and a fall in revenue per case at the same time, because the listing was won on price. Both statements are about the same quarter.` },
    misconception: `Students treat "sales" as one number, so a question about improving sales revenue gets an answer about selling more units. Read which of the two the question names: they are separate calculations and a firm can raise one while lowering the other.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, with workings shown. Show the multiplication, not only the product: ${money(P.price)} × ${qty(P.actual)} is the working and ${money(P.tr(P.actual))} is the answer.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `One month the plant took ${money(117000)} at ${money(6.5)} a ${P.unit}. Work back:`,
      template: [
        `Sales volume that month was ___ thousand ${P.units}`,
        `At the usual ${money(P.price)} the same money would need a volume of ___ thousand`,
        `So the higher price needed ___ ${P.units} for the same revenue`,
      ],
      answers: ['18', '19.5', 'fewer'],
      hints: ['divide the money by the price', 'the same money at the lower price', 'compare the two volumes'],
      distractors: ['21', 'more'],
    }),
  };
})();

/* `1b`, first half. Fixed and variable, and the definition is about the PERIOD as much as the cost —
   which is where `3f`'s second limitation comes from, so it is planted here. */
const fixedVariable = (() => {
  const sid = subId('fixed-and-variable-costs');
  return {
    id: sid,
    title: 'Fixed and Variable Costs',
    keyIdea: `A fixed cost does not change when output changes; a variable cost does. The split is a statement about a period of time, not about the kind of cost.`,
    body: [
      { type: 'paragraph', text: `A **fixed cost** does not change when output changes. ${P.name} pays ${money(P.fc)} ${P.per} in rent, insurance and salaried staff whether it bottles ${qty(0)} ${P.units} or ${qty(25000)}.` },
      { type: 'paragraph', text: `A **variable cost** changes directly with output. Every ${P.unit} needs ${money(P.vcu)} of concentrate, bottles, caps and power. Make one more ${P.unit} and ${money(P.vcu)} more is spent; make none and none is spent.` },
      { type: 'paragraph', text: `The word that does the work in both definitions is OUTPUT. A cost is not fixed because it is large or because it arrives monthly — it is fixed because output does not move it.` },
      { type: 'paragraph', text: `And the split holds only for a stated period. Over a month the rent is fixed. Over three years the plant could move to a smaller building, and then the rent is a choice like any other. This is why chapter 3 lists "costs split cleanly in two" as an assumption rather than a fact.` },
    ],
    realExample: { emoji: '🏭', text: `A bottling line's electricity bill has a standing charge that arrives whether the line runs and a unit charge that only arrives when it does. One bill, and the two halves sit on different lines of the cost table.` },
    misconception: `Students sort by the size or the timing of the payment — rent is monthly so it is fixed, materials arrive weekly so they are variable. The test is output: hold output at zero and ask whether the cost still has to be paid.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or an example. A cost named fixed needs the reason it does not move with output, not a list of costs that usually are.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort these into fixed and variable for one month at the plant:`,
      groups: [
        { name: 'Fixed for the month', items: ['Factory rent', 'Insurance premium', 'Salaried supervisor'], why: 'The same amount is owed at zero output as at full output.' },
        { name: 'Variable with output', items: ['Bottles and caps', 'Drink concentrate', 'Power to run the line'], why: 'One more case needs one more case worth of packaging, concentrate and power.' },
      ],
    }),
  };
})();

/* `1b`, second half. Total and average, and the average cost at the break-even point is the price —
   the identity that ties this chapter to chapter 3 and the reason the table has the column. */
const totalAverage = (() => {
  const sid = subId('total-and-average-costs');
  return {
    id: sid,
    title: 'Total Costs and Average Costs',
    keyIdea: `Total cost is fixed plus variable at that output. Average cost is total cost divided by output, and it falls as output rises because the fixed cost is spread wider.`,
    body: [
      { type: 'paragraph', text: `**Total cost = fixed costs + total variable costs.** At ${qty(P.actual)} ${P.units} the plant's variable costs are ${money(P.vcu)} × ${qty(P.actual)} = ${money(P.tvc(P.actual))}, so total cost is ${money(P.fc)} + ${money(P.tvc(P.actual))} = ${money(P.tc(P.actual))}.` },
      { type: 'paragraph', text: `**Average cost = total cost ÷ output.** At ${qty(P.actual)} ${P.units} that is ${money(P.tc(P.actual))} ÷ ${qty(P.actual)} = ${money(P.ac(P.actual))} a ${P.unit}.` },
      { type: 'paragraph', text: `Average cost falls as output rises, and the reason is entirely in the fixed half. The variable cost per ${P.unit} is ${money(P.vcu)} at every output. The ${money(P.fc)} is what gets divided: ${money(round2(P.fc / 10000))} a ${P.unit} at ${qty(10000)} ${P.units}, ${money(round2(P.fc / P.actual))} at ${qty(P.actual)}, ${money(round2(P.fc / 25000))} at ${qty(25000)}.` },
      { type: 'paragraph', text: `One row of the chapter's table is worth marking now. At ${qty(P.bep)} ${P.units} average cost is ${money(P.ac(P.bep))} — exactly the selling price. A firm whose average cost equals its price is taking in precisely what it spends, and chapter 3 calls that output the break-even point.` },
    ],
    realExample: { emoji: '📦', text: `A plant running one shift instead of two has a higher cost per case than the same plant at full use. The equipment and the building cost the same either way; there are simply fewer cases to divide them between.` },
    misconception: `Students say average cost falls "because of economies of scale". At this level the arithmetic is simpler and more useful: the fixed cost is being divided by a bigger number. Nothing about the variable cost per unit has changed.`,
    examMatters: `Appendix 6 defines Calculate as requiring workings. An average cost answer with no total cost line above it cannot be followed, because the marker cannot see which output was divided into which total.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Work the plant's per-${P.unit} figures at ${qty(12000)} ${P.units}:`,
      template: [
        `Fixed cost a ${P.unit} is $___`,
        `Add the ${money(P.vcu)} variable cost and average cost is $___`,
        `That is ___ the selling price, so ${qty(12000)} ${P.units} loses money`,
      ],
      answers: ['3.00', '6.60', 'above'],
      hints: ['the monthly fixed costs over the output', 'the two per-case figures together', 'compare it with $6.00'],
      distractors: ['2.40', 'below'],
    }),
  };
})();

/* `1c`, first half: volumes. The specification says volumes AND revenues and `specThin-01` quotes
   only the second — the pair is the point, and it takes two subsections to make it. */
const improvingVolumes = (() => {
  const sid = subId('improving-sales-volumes');
  return {
    id: sid,
    title: 'Ways of Improving Sales Volumes',
    keyIdea: `Volume is raised by giving more buyers a reason to buy: a lower price, a wider distribution, a change to the product, or promotion that reaches people who had not considered it.`,
    body: [
      { type: 'paragraph', text: `Raising **volume** means selling more ${P.units}. Four routes, and they are not equally available to every firm.` },
      { type: 'bullets', items: [
        `**Lower the price.** The most direct route and the one with a cost attached, which is the next subsection.`,
        `**Widen distribution.** The same product in more places: a new region, a wholesaler, an online channel. Volume rises with no change to the price.`,
        `**Change the product.** A smaller ${P.unit} for a market that cannot afford the large one, or a reformulation for buyers who had a reason not to buy.`,
        `**Promote it.** Advertising and in-store work reach buyers who had not considered the product rather than persuading existing ones to pay more.`,
      ] },
      { type: 'paragraph', text: `Two of the four cost money up front and none of them is free. A wider distribution needs a discount to the wholesaler; a reformulation needs development; promotion is spent before any extra ${P.unit} is sold. So each route has to be judged against the extra revenue it brings, which is the comparison chapter 3 gives the tools for.` },
    ],
    realExample: { emoji: '🛒', text: `A drinks bottler that adds a small single-serve pack alongside its multipack reaches buyers who were never going to carry a multipack home. The product changed; the price per litre went up rather than down.` },
    misconception: `Students answer every "improve sales" question with "advertise more". Name the route AND say who buys as a result: promotion reaches new buyers, distribution reaches new places, and a price cut reaches people for whom the old price was the obstacle.`,
    examMatters: `Appendix 6 defines Explain as requiring cause or effect supported by details or an example. "Advertise more" is not a cause; "advertise in the region the new depot serves, so the buyers who can now be supplied know the product exists" is.`,
  };
})();

/* `1c`, second half: revenues, and the case where the two part company. This is the subsection the
   whole of `1a` was set up for, and its figures are the ones chapter 4's month 2 runs on. */
const improvingRevenues = (() => {
  const sid = subId('improving-sales-revenues');
  return {
    id: sid,
    title: 'Ways of Improving Sales Revenues',
    keyIdea: `Revenue can be raised by a higher price or by more volume, and a price cut does both at once in opposite directions. Whether revenue rises depends on how much volume answers.`,
    body: [
      { type: 'paragraph', text: `Revenue is price × volume, so there are two levers and they pull against each other. Raise the price and each ${P.unit} earns more while fewer are sold. Cut it and more are sold while each earns less.` },
      { type: 'paragraph', text: `Take the plant's cut from ${money(P.price)} to ${money(CUT.price)}, which lifts volume from ${qty(P.actual)} to ${qty(CUT.q)} ${P.units}. Revenue goes from ${money(P.tr(P.actual))} to ${money(CUT.tr)} — up ${money(CUT.revenueGain)}. The cut worked on revenue.` },
      { type: 'paragraph', text: `Now the other half. Those extra ${qty(CUT.q - P.actual)} ${P.units} carried ${money(P.vcu)} of variable cost each, so total cost went from ${money(P.tc(P.actual))} to ${money(CUT.tc)}. Profit is revenue less total cost: ${money(CUT.tr)} − ${money(CUT.tc)} = ${money(CUT.profit)}, against ${money(P.profit(P.actual))} before. **Revenue up ${money(CUT.revenueGain)}, profit down ${money(CUT.profitLoss)}.**` },
      { type: 'paragraph', text: `This is why the specification names volumes and revenues as two things, and why neither is the same as a third thing the firm actually wants. A route that improves revenue is worth having; it is not automatically worth taking.` },
    ],
    realExample: { emoji: '🏷️', text: `A bottler that runs a promotional price for a quarter reports its best revenue quarter and a worse operating result than the quarter before it. Both figures are correct and they are measuring different things.` },
    misconception: `Students assume higher revenue means higher profit, so "ways of improving sales revenues" becomes "ways of making more money". Revenue is one side of the calculation. The cases worth writing about are the ones where the two sides move opposite ways.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, and interpretation where it is applied to given data. The chain here has three links: lower price, higher volume, and the variable cost the higher volume brings with it.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Try a different cut: ${money(5.5)} a ${P.unit}, selling ${qty(24000)}. Work it per ${P.unit}:`,
      template: [
        `Average cost at ${qty(24000)} ${P.units} is $___ a ${P.unit}`,
        `Revenue a ${P.unit} less average cost a ${P.unit} is $___`,
        `Multiply by ${qty(24000)} and profit ___ the ${money(12000)} it was`,
      ],
      answers: ['5.10', '0.40', 'undershoots'],
      hints: ['total cost over the output', 'the two per-case figures compared', 'which side of $12,000 the answer lands'],
      distractors: ['5.40', 'beats'],
    }),
  };
})();

/* ══════════════════════════════════════════════════════════════════════════════
   BLOCK 2 — Sales Forecasting (2.3.2 · 2a, 2b, 2c)
   ══════════════════════════════════════════════════════════════════════════ */

/* `2a`. Purpose, and the purpose is what the rest of the section does with the number. */
const forecastPurpose = (() => {
  const sid = subId('purpose-of-sales-forecasts');
  return {
    id: sid,
    title: 'Purpose of Sales Forecasts',
    keyIdea: `A sales forecast is an estimate of future sales volume, and it is the first figure in the section: break-even, cash flow and every budget are built on top of it.`,
    body: [
      { type: 'paragraph', text: `A **sales forecast** is an estimate of how much will be sold in a future period. It is a volume, usually by month, and it is the figure everything else in this section starts from.` },
      { type: 'paragraph', text: `Follow it through the plant. The forecast says ${qty(FORECAST.base)} ${P.units} ${P.per}. That figure decides how much concentrate to order and how many shifts to roster; it is the output the break-even calculation is compared against; it is the receipts line of the cash-flow forecast; and it is the revenue line of the budget.` },
      { type: 'paragraph', text: `So the forecast is not a prediction the firm makes and files. It is a **planning figure**, and a wrong one is wrong four times over: too much concentrate, a margin of safety that was never there, a cash-flow forecast that promised receipts the firm will not get, and a budget every department is measured against.` },
      { type: 'paragraph', text: `That is also the honest answer to "how accurate does it need to be". Accurate enough that the decisions it drives would not have been different — which is a lower bar for a shift roster than for a decision to buy a second line.` },
    ],
    realExample: { emoji: '📅', text: `A bottler orders concentrate three months ahead because the supplier ships by sea. The order is placed against a forecast, so the forecast is a commitment of cash long before any of it is sold.` },
    misconception: `Students describe a forecast as a guess at next year's sales and stop. Say what it is FOR: every other figure in this topic is derived from it, which is why its difficulties matter more than its arithmetic.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term or phrase. Two marks for a sales forecast is the estimate and the period it covers, which are two things and not one said twice.`,
  };
})();

/* `2b-1`. Consumer trends. The spec's own phrase — `consumer trends` is a single hit at :896 and
   `seasonality` belongs to 1.3.2, so it is an example here and not a concept. */
const consumerTrends = (() => {
  const sid = subId('consumer-trends');
  return {
    id: sid,
    title: 'Consumer Trends',
    keyIdea: `A consumer trend is a lasting change in what buyers want, and it moves a forecast because the past sales the forecast started from were made under the old preference.`,
    body: [
      { type: 'paragraph', text: `The first of the specification's three factors. A **consumer trend** is a change in what buyers want that persists — not a good week, and not a seasonal swing that comes back the following year.` },
      { type: 'paragraph', text: `The plant's market is moving from sweetened drinks to lower-sugar ones. Half its range is sweetened, so the forecast for those lines is too high: last month's sales were made by buyers some of whom have now changed what they reach for. The adjustment is ${qty(Math.abs(FORECAST.factors[0].effect))} ${P.units} off the base.` },
      { type: 'paragraph', text: `Direction is not the whole of it. A trend can also be an opportunity that a forecast built on the past cannot see: the low-sugar half of the same range is being carried by the same trend upwards, and a forecast that adjusts one line and not the other is wrong twice.` },
      { type: 'paragraph', text: `The hard part is telling a trend from a wobble, and the test is whether the reason for it is still true next year. A change in what people think a drink is for outlasts a hot month.` },
    ],
    realExample: { emoji: '🥤', text: `A bottler whose sweetened range had grown for a decade sees it flatten while its unsweetened line grows. Nothing about either product changed; what buyers wanted from the category did.` },
    misconception: `Students use "consumer trends" as a label for anything to do with demand, including a competitor's price cut. A trend is a change in what buyers WANT. A rival's action is the third factor and is a change in what buyers are offered.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning without evaluation. The chain is trend, then the product line it touches, then the direction the forecast moves — three links and no judgement at the end.`,
  };
})();

/* `2b-2`. Economic variables. One example each of income and rates, both effects on VOLUME, because
   the leaf is about the forecast and not about macroeconomics. */
const economicVariables = (() => {
  const sid = subId('economic-variables');
  return {
    id: sid,
    title: 'Economic Variables',
    keyIdea: `Incomes, interest rates and exchange rates change how much buyers can spend and what the product costs them, so they move a forecast the firm has done nothing to cause.`,
    body: [
      { type: 'paragraph', text: `The second factor. **Economic variables** are conditions outside the firm that change what buyers can spend or what the product costs them. Three matter for a forecast.` },
      { type: 'bullets', items: [
        `**Incomes.** Real incomes in the plant's region are rising, so a bottled drink is bought more often. The adjustment is ${signed(FORECAST.factors[1].effect)?.replace('$', '')} — ${qty(FORECAST.factors[1].effect)} ${P.units} ONTO the base.`,
        `**Interest rates.** A rise leaves households with less after their borrowing is served, which shows up first in things bought casually rather than planned.`,
        `**Exchange rates.** The plant imports its concentrate, so a weaker local currency raises its costs, and a stronger one makes an imported rival cheaper on the shelf.`,
      ] },
      { type: 'paragraph', text: `Notice that all three arrive as a change in VOLUME on the forecast even when they start as a change in a price or a cost. That is the discipline of this chapter: a forecast is a number of ${P.units}, so every factor has to be turned into ${P.units} before it can be used.` },
      { type: 'paragraph', text: `And the firm does not choose any of them. A forecast that ignores economic variables is not optimistic, it is incomplete.` },
    ],
    realExample: { emoji: '💱', text: `A bottler importing concentrate and selling locally is exposed twice: a weaker local currency raises what it pays and leaves its buyers no better off. Neither effect is anything it did.` },
    misconception: `Students write that a recession means lower sales for everyone. Say which variable and which direction for THIS product: a cheap everyday item can hold its volume in a downturn while a large pack does not.`,
    examMatters: `Appendix 6 defines Explain as requiring cause or effect supported by details. The detail that earns the second half is the route: rates to disposable income to this product's volume, not rates to "demand falls".`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A rise in the local currency makes the plant's imported concentrate cheaper and an imported rival cheaper too. Reason it through:`,
      template: [
        `The plant's variable cost a ${P.unit} ___`,
        `Its contribution a ${P.unit} therefore ___`,
        `But the rival's shelf price ___ as well, so the forecast may still need cutting`,
      ],
      answers: ['falls', 'rises', 'drops'],
      hints: ['what a cheaper import does to the cost of a case', 'price less variable cost, with the price unmoved', 'the same exchange rate, on somebody else\'s costs'],
      distractors: ['climbs', 'holds'],
    }),
  };
})();

/* `2b-3`. Actions of competitors — the factor students collapse into the other two. */
const competitorActions = (() => {
  const sid = subId('actions-of-competitors');
  return {
    id: sid,
    title: 'Actions of Competitors',
    keyIdea: `A rival's price, product or distribution changes what the same buyers are offered, so a forecast built on the firm's own plans can be wrong without the firm changing anything.`,
    body: [
      { type: 'paragraph', text: `The third factor, and the one a firm most often leaves out of its own forecast, because a forecast is usually built from the firm's plans and a competitor is not in them.` },
      { type: 'paragraph', text: `A rival is opening a plant in the plant's own region. It will compete for the same shelf space, and the adjustment is ${qty(Math.abs(FORECAST.factors[2].effect))} ${P.units} off the base — the largest of the three.` },
      { type: 'paragraph', text: `A competitor can move a forecast four ways: a lower price, a new product, wider distribution, or promotion that reaches the same buyers first. The effect on the forecast is the same in kind each time — some of the volume the firm assumed was going to be sold by someone else.` },
      { type: 'paragraph', text: `The three factors together are why the revised figure is not simply the base one adjusted downwards. One of them adds and two subtract: ${qty(FORECAST.base)} ${signed(FORECAST.factors[0].effect).replace('$', '').replace('−', '− ')} ${signed(FORECAST.factors[1].effect).replace('$', '').replace('+', '+ ')} ${signed(FORECAST.factors[2].effect).replace('$', '').replace('−', '− ')} = ${qty(FORECAST.revised)} ${P.units}.` },
    ],
    realExample: { emoji: '🚚', text: `A regional bottler's volume falls the quarter a national brand starts delivering to the same wholesalers. Its own price, product and promotion were unchanged all quarter.` },
    misconception: `Students treat a competitor's action as a consumer trend, because both end in lower sales. They are different factors with different answers: a trend is answered by changing the product, a competitor by changing the offer.`,
    examMatters: `Appendix 6 defines Analyse as including interpretation where it is applied to given data. Applied to a forecast table, that means saying which line moved and by how much, not that the forecast "may be inaccurate".`,
    recall: recall(sid, {
      type: 'match',
      prompt: `All three factors are now taught. Match each change to which of them it is:`,
      pairs: [
        { left: 'Households steadily switch to unsweetened drinks', right: 'A consumer trend', why: 'A trend is a change in what buyers WANT, and it outlasts the year it starts in.' },
        { left: 'A rival wins the plant\'s largest wholesaler', right: 'An action of a competitor', why: 'A competitor changes what buyers are OFFERED, so the answer is to change the offer.' },
        { left: 'Interest rates rise and borrowing costs more', right: 'An economic variable', why: 'An economic variable changes what buyers can SPEND, and no firm chooses it.' },
        { left: 'A rival launches a pack the plant does not make', right: 'An action of a competitor, not a trend', why: 'Still the competitor factor, however much it looks like a change in taste.' },
      ],
      distractors: ['A difficulty of forecasting'],
    }),
  };
})();

/* `2c`. Difficulties, as the specification's own leaf — and the last one hands block 4 its limits. */
const forecastDifficulties = (() => {
  const sid = subId('difficulties-of-sales-forecasting');
  return {
    id: sid,
    title: 'Difficulties of Sales Forecasting',
    keyIdea: `A forecast is hard because there may be no history to reason from, the three factors move together, the forecaster is not neutral, and better information costs money.`,
    body: [
      { type: 'paragraph', text: `The specification asks for the difficulties in their own right, and they are not a list of ways the number can be wrong. They are reasons why it cannot be made much better.` },
      { type: 'bullets', items: FORECAST_DIFFICULTIES.map(([h, w]) => `**${h}.** ${w.charAt(0).toUpperCase()}${w.slice(1)}.`) },
      { type: 'paragraph', text: `The third one is worth slowing down for, because it is the only one that is about a person. A forecast prepared to support a decision already taken is pulled towards the figure that supports it, and nobody in the process has to be dishonest for that to happen.` },
      { type: 'paragraph', text: `These four are also the limitations of everything built on the forecast. Chapter 4's receipts line and chapter 5's revenue budget are both this number, so both inherit all four.` },
    ],
    realExample: { emoji: '🆕', text: `A bottler launching an unfamiliar flavour has no past sales for it at all, so the forecast is built from a comparable product in another market and a judgement about how close the two are.` },
    misconception: `Students answer this with "the forecast may be wrong", which is a restatement rather than a difficulty. Name the reason it is hard — no history, factors that interact, a forecaster with an interest, research that costs — and then say what that does to the decision.`,
    examMatters: `Appendix 6 defines Discuss as requiring chains of reasoning in context with a brief assessment showing awareness of competing factors. An eight-mark Discuss on forecasting needs two of these difficulties developed, not four named.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Suppose the competitor's plant is delayed, so only the other two factors apply to the ${qty(FORECAST.base)}-case base:`,
      template: [
        `The revised forecast would be ___ thousand ${P.units}`,
        `That is ___ thousand above the full three-factor figure`,
        `So the factor that moved the base furthest was the ___ one`,
      ],
      answers: ['19.2', '3', 'competitor'],
      hints: ['apply the trend and the income effect only', 'the size of the effect left out', 'which of the three was largest'],
      distractors: ['16.2', 'income'],
    }),
  };
})();

/* ══════════════════════════════════════════════════════════════════════════════
   BLOCK 3 — Break-Even (2.3.2 · 3a, 3b, 3c, 3d, 3e, 3f)
   ══════════════════════════════════════════════════════════════════════════ */

/* `3a`. The specification gives the formula, so the subsection's job is what the number MEANS. */
const contribution = (() => {
  const sid = subId('contribution-per-unit');
  return {
    id: sid,
    title: 'Contribution per Unit',
    keyIdea: `Contribution is selling price minus variable cost per unit. It is what one more unit leaves behind towards the fixed costs once its own costs are covered.`,
    body: [
      { type: 'paragraph', text: `**Contribution = selling price − variable cost per unit.** For the plant: ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)} a ${P.unit}.` },
      { type: 'paragraph', text: `The name says what it is for. Each ${P.unit} pays its own variable cost out of its own price, and what is left over CONTRIBUTES to the fixed costs. Sell one ${P.unit} and the plant is ${money(P.contribution)} nearer to covering the ${money(P.fc)}.` },
      { type: 'paragraph', text: `So contribution is not profit. Until the whole ${money(P.fc)} has been covered there is no profit at all, however many ${P.units} have contributed. It is the rate at which the fixed cost is being paid off.` },
      { type: 'paragraph', text: `Because it is a per-${P.unit} figure, only two things change it: the price and the variable cost per ${P.unit}. A change in the fixed costs leaves the contribution exactly where it was — which is why the three change cases later in this chapter behave differently from one another.` },
    ],
    realExample: { emoji: '🧮', text: `A bottler asked to quote for a one-off export order checks the contribution per case before the price: as long as the price covers the variable cost with something left over, the order helps pay costs the plant already owes.` },
    misconception: `Students read contribution as profit per unit, so they multiply it out and call the answer profit. It is what is left towards the fixed costs. Nothing is profit until the fixed costs are covered.`,
    examMatters: `Appendix 6 defines Calculate as requiring workings shown. Contribution is a subtraction and the subtraction is the working: a bare ${money(P.contribution)} cannot be followed, because the marker cannot see which two figures produced it.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `The plant is asked to quote ${money(4.9)} a ${P.unit} on an export order. Its variable cost is unchanged:`,
      template: [
        `Contribution on this order is ___ a ${P.unit}`,
        `That is ___ than the ${money(P.contribution)} on its usual price`,
        `Each ${P.unit} sold at ${money(4.9)} still leaves something towards the ___ costs`,
      ],
      answers: ['$1.30', 'lower', 'fixed'],
      hints: ['price less the variable cost per case', 'compare the two contributions', 'what contribution contributes to'],
      distractors: ['$2.40', 'higher', 'variable'],
    }),
  };
})();

/* `3b-1`. The specification states break-even as an EQUALITY of totals, and that is the definition
   the subsection teaches; `3c` then turns it into the division. Two leaves, two subsections. */
const breakEvenPoint = (() => {
  const sid = subId('the-break-even-point');
  return {
    id: sid,
    title: 'The Break-Even Point',
    keyIdea: `The break-even point is the output at which total fixed costs plus total variable costs equal total revenue, so the firm makes neither a profit nor a loss.`,
    body: [
      { type: 'paragraph', text: `The specification states it as an equality: **total fixed costs + total variable costs = total revenue.** The output at which that is true is the **break-even point**.` },
      { type: 'paragraph', text: `Check it on the plant at ${qty(P.bep)} ${P.units}. Revenue is ${money(P.price)} × ${qty(P.bep)} = ${money(P.trAtBep)}. Costs are ${money(P.fc)} + ${money(P.vcu)} × ${qty(P.bep)} = ${money(P.fc)} + ${money(P.tvc(P.bep))} = ${money(P.tc(P.bep))}. The two are the same number, so the plant makes neither a profit nor a loss.` },
      { type: 'paragraph', text: `This is also the row flagged in chapter 1. Average cost at ${qty(P.bep)} ${P.units} is ${money(P.tc(P.bep))} ÷ ${qty(P.bep)} = ${money(P.ac(P.bep))}, which is the selling price. A firm breaking even is one whose average cost has fallen to its price.` },
      { type: 'paragraph', text: `Neither a profit nor a loss is not the same as nothing happening. The ${money(P.fc)} of fixed costs has been paid in full, and so has every ${money(P.vcu)} of variable cost. Break-even is the point at which the firm has covered everything it owes and no more.` },
    ],
    realExample: { emoji: '⚖️', text: `A bottling plant commissioning a second line asks how many cases the line has to sell before it stops costing money. The answer is an output, not a date, and it is the same question as this one.` },
    misconception: `Students describe break-even as the point where the firm "starts making money" and write it as a revenue. It is an OUTPUT — a number of units — at which two totals are equal. The revenue at that output is a different figure.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term. Break-even point defined without the words output or units has not said what kind of quantity it is.`,
  };
})();

/* `3c`. The formula, and the reason the division works — which is contribution from two subsections
   back doing the job its name promised. */
const usingContribution = (() => {
  const sid = subId('using-contribution-to-find-break-even');
  return {
    id: sid,
    title: 'Using Contribution to Find the Break-Even Point',
    keyIdea: `The break-even point is fixed costs divided by contribution per unit, because contribution is the amount each unit pays towards the fixed costs.`,
    body: [
      { type: 'paragraph', text: `Checking an output to see whether it breaks even is slow. The specification asks for the shortcut, and the shortcut is the contribution: **break-even point = fixed costs ÷ contribution per unit.**` },
      { type: 'paragraph', text: `For the plant: ${money(P.fc)} ÷ ${money(P.contribution)} = ${qty(P.bep)} ${P.units}. The same answer as the equality, in one step.` },
      { type: 'paragraph', text: `The division works because of what contribution is. Each ${P.unit} pays ${money(P.contribution)} towards the fixed costs, so the question "how many ${P.units} to cover ${money(P.fc)}" is a division and nothing more. If the formula is remembered without that sentence, it is remembered upside down as often as not.` },
      { type: 'paragraph', text: `And now the three cases the specification's interpretation bullet is really about. Change ONE figure at a time and the break-even point moves: ${CHANGES.map((c) => `${c.label.toLowerCase()} and it goes to ${qty(c.bep)}`).join('; ')}. A rise in fixed costs moves it by a different amount from a rise in variable cost, because the first changes the numerator and the second changes the divisor.` },
    ],
    realExample: { emoji: '📉', text: `A bottler told its concentrate will cost more next year recalculates before it renegotiates: a rise in the variable cost per case raises the break-even point more than the same money added to the rent would.` },
    misconception: `Students divide fixed costs by the selling price, or by the variable cost. The divisor is the CONTRIBUTION, because that is the part of the price that is available to pay the fixed costs at all.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data with workings. A break-even answer needs the contribution line first: ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)}, then ${money(P.fc)} ÷ ${money(P.contribution)}.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A fourth case: the plant renegotiates its rent and fixed costs FALL to ${money(33600)} ${P.per}.`,
      template: [
        `The break-even point becomes ___ thousand ${P.units}`,
        `It has moved ___`,
        `At ${qty(P.actual)} ${P.units} the margin of safety is now ___% of output`,
      ],
      answers: ['14', 'down', '30'],
      hints: ['the new fixed costs over the unchanged contribution', 'which way, against 15,000', 'the margin as a share of the output'],
      distractors: ['up', '25'],
    }),
  };
})();

/* `3d`. Measured in units, and its own chapter's forecast gives it a second figure to compare with. */
const marginOfSafety = (() => {
  const sid = subId('margin-of-safety');
  return {
    id: sid,
    title: 'Margin of Safety',
    keyIdea: `The margin of safety is current or forecast output minus the break-even point: how far sales can fall, in units, before the firm stops covering its costs.`,
    body: [
      { type: 'paragraph', text: `**Margin of safety = actual or forecast output − break-even point.** For the plant at ${qty(P.actual)} ${P.units}: ${qty(P.actual)} − ${qty(P.bep)} = ${qty(P.mos)} ${P.units}.` },
      { type: 'paragraph', text: `It is measured in ${P.units}, like the break-even point itself, and it answers one question: how much can go wrong before this stops working. ${qty(P.mos)} ${P.units} is ${pct(P.mosPct)} of the plant's output, so sales could fall by a quarter and it would still be covering its costs.` },
      { type: 'paragraph', text: `The figure is only as good as the output it starts from, which is why chapter 2 matters here. Apply the three forecast factors and output becomes ${qty(FORECAST.revised)} ${P.units}, so the margin of safety falls from ${qty(P.mos)} to ${qty(FORECAST.mos)} — from ${pct(P.mosPct)} of output to ${pct(round2((FORECAST.mos / FORECAST.revised) * 100))}. The break-even point never moved.` },
      { type: 'paragraph', text: `That is the useful shape of this idea. A margin of safety can shrink because the break-even point rose OR because the output fell, and the two have different answers: the first is a cost or price problem, the second is a demand problem.` },
    ],
    realExample: { emoji: '🛟', text: `A bottler with two thirds of its volume going to one wholesaler reads its margin of safety differently from one selling to thirty: the same number of cases is less reassuring when one customer can remove most of it.` },
    misconception: `Students give the margin of safety as a money figure, usually the profit. It is a quantity of output. If a question asks for it in money, it wants the revenue or the profit at that output, and it will say so.`,
    examMatters: `Appendix 6 defines Calculate as requiring workings. A margin of safety answer shows the break-even point being worked out first, because the margin is a subtraction from it and cannot be checked without it.`,
  };
})();

/* `3e`. The leaf that cannot be taught without the picture — which is `structure-01`, and the
   picture is the block's pinned diagram, shown at the check-in. */
const interpretingChart = (() => {
  const sid = subId('interpreting-a-break-even-chart');
  return {
    id: sid,
    title: 'Interpreting a Break-Even Chart',
    keyIdea: `The revenue line starts at the origin and the cost line at the fixed costs. They cross at the break-even point, and the gap between them is the profit or the loss.`,
    body: [
      { type: 'paragraph', text: `The specification asks for **interpretation** of break-even charts. Reading one is a matter of knowing where each line starts and what the space between them means.` },
      { type: 'paragraph', text: `**The revenue line starts at the origin.** Nothing sold is nothing earned, so at zero output revenue is zero. It rises by ${money(P.price)} for every ${P.unit}.` },
      { type: 'paragraph', text: `**The total cost line starts at the fixed costs.** At zero output the plant still owes ${money(P.fc)}, so the line begins at ${money(P.fc)} on the money axis and rises by ${money(P.vcu)} a ${P.unit} — more gently than the revenue line, which is why they meet.` },
      { type: 'paragraph', text: `**They cross at the break-even point**, ${qty(P.bep)} ${P.units} and ${money(P.trAtBep)}. Left of the crossing revenue is below costs and the vertical gap is a loss; right of it the gap is a profit. At ${qty(P.actual)} ${P.units} the gap is ${money(P.tr(P.actual))} − ${money(P.tc(P.actual))} = ${money(P.profit(P.actual))}, which is the profit read straight off the chart.` },
      { type: 'paragraph', text: `The margin of safety is on the output axis, not in the money: the distance from ${qty(P.bep)} to ${qty(P.actual)}. Two different questions, read in two different directions.` },
    ],
    realExample: { emoji: '📊', text: `A lender reviewing a bottling plant's proposal looks first at how far the current output sits to the right of the crossing, because that distance is the room the plant has before the loan stops being serviced.` },
    misconception: `Students draw the total cost line from the origin, which makes the fixed costs vanish and puts the crossing in the wrong place. The cost line starts at the fixed costs, because those are owed before a single unit is made.`,
    examMatters: `Appendix 6 defines Analyse as including interpretation when applied to given diagrams or data. Interpreting this chart means naming the output at the crossing and the gap at a stated output — reading values off it, not describing what the lines look like.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `On the plant's chart, sort each reading by where you look for it:`,
      groups: [
        { name: 'Read on the output axis', items: [`The break-even point`, `The margin of safety`, `Output at the crossing`], why: 'Quantities of OUTPUT, so they are positions or distances along the horizontal axis.' },
        { name: 'Read as a vertical gap', items: [`The profit at ${qty(P.actual)} ${P.units}`, `The loss at ${qty(10000)} ${P.units}`, `The fixed costs at zero output`], why: 'Amounts of MONEY, so they are heights or the gap between two heights.' },
      ],
    }),
  };
})();

/* `3f`. Limitations, and the first two are assumptions the chart makes rather than mistakes. */
const breakEvenLimits = (() => {
  const sid = subId('limitations-of-break-even-analysis');
  return {
    id: sid,
    title: 'Limitations of Break-Even Analysis',
    keyIdea: `Break-even analysis assumes one price, a clean split between fixed and variable costs, and that everything made is sold — and it holds all three still.`,
    body: [
      { type: 'paragraph', text: `The useful limitations are not "it might be wrong". They are the assumptions the straight lines are made of.` },
      { type: 'bullets', items: BREAKEVEN_LIMITS.map(([h, w]) => `**${h}.** ${w.charAt(0).toUpperCase()}${w.slice(1)}.`) },
      { type: 'paragraph', text: `The second reaches furthest. Chapter 1 defined fixed and variable for a stated period, and over a long enough period every cost is a choice — so a break-even point worked out for a month cannot judge a three-year decision.` },
      { type: 'paragraph', text: `None of this makes the analysis useless. The three change cases are what it is good at. The limitation is in treating one point as a forecast rather than as a comparison.` },
    ],
    realExample: { emoji: '🧊', text: `A bottler that discounts heavily for large orders has no single selling price, so its revenue line is not straight and its chart puts the crossing further left than the discounted reality does.` },
    misconception: `Students list limitations that are really forecasting difficulties — "the sales figures may be wrong". Those belong to chapter 2. A limitation of break-even analysis is something the METHOD assumes: one price, two kinds of cost, everything sold.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a full awareness of the validity of competing factors leading to a conclusion that proposes a solution or recommendation. A twenty-mark answer here has to say what the firm should do given the limitation, not only that it exists.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: `Put the steps of a break-even calculation in the order they have to be done:`,
      items: [
        `Start from the selling price and the variable cost per ${P.unit}`,
        `Take one from the other to get the contribution per ${P.unit}`,
        `Divide the fixed costs by that contribution`,
        `Measure from the answer to current output for the margin of safety`,
      ],
      correctOrder: [
        `Start from the selling price and the variable cost per ${P.unit}`,
        `Take one from the other to get the contribution per ${P.unit}`,
        `Divide the fixed costs by that contribution`,
        `Measure from the answer to current output for the margin of safety`,
      ],
      why: [
        'Both are per-unit figures and nothing else can be worked out without them.',
        'The contribution is the divisor, so it has to exist before the division.',
        'This is the break-even point, and the margin of safety is measured from it.',
        'The margin is a distance from the break-even point, so it can only come last.',
      ],
    }),
  };
})();

/* ══════════════════════════════════════════════════════════════════════════════
   BLOCK 4 — Cash Flow (2.3.2 · 4a, 4b)
   ══════════════════════════════════════════════════════════════════════════ */

/* `4a`, construction. The credit mechanic is the reason building one is an exercise. */
const constructingCashFlow = (() => {
  const sid = subId('constructing-a-cash-flow-forecast');
  return {
    id: sid,
    title: 'Constructing a Cash-Flow Forecast',
    keyIdea: `A cash-flow forecast lists receipts and payments month by month. Net cash flow is receipts minus payments, and the closing balance is the opening balance plus that.`,
    body: [
      { type: 'paragraph', text: `A **cash-flow forecast** is a table of money in and money out, month by month. Five lines, and they are always in the same order.` },
      { type: 'paragraph', text: `**Opening balance** is the cash the firm starts the month with. **Receipts** is money actually arriving. **Payments** is money actually leaving. **Net cash flow** is receipts − payments. **Closing balance** is opening balance + net cash flow — and it becomes the next month's opening balance, which is the line that makes the table a forecast rather than three separate months.` },
      { type: 'paragraph', text: `The word doing the work is ACTUALLY. The plant gives its customers ${CASHFLOW.creditDays} days to pay, so month 1's receipts are not month 1's sales — they are the ${qty(CASHFLOW.rows[0].priorVolume)} ${P.units} sold the month before, at ${money(CASHFLOW.rows[0].priorPrice)}, which is ${money(CASHFLOW.rows[0].receipts)}. Meanwhile month 1's payments are for month 1's output: ${money(P.fc)} fixed plus ${money(P.vcu)} × ${qty(CASHFLOW.rows[0].volume)} = ${money(CASHFLOW.rows[0].payments)}.` },
      { type: 'paragraph', text: `Net cash flow for month 1 is therefore ${money(CASHFLOW.rows[0].receipts)} − ${money(CASHFLOW.rows[0].payments)} = ${money(CASHFLOW.rows[0].net)}, and a ${money(CASHFLOW.openingBalance)} opening balance closes at ${money(CASHFLOW.rows[0].closing)}. Nothing about the plant's trading went wrong in that month.` },
    ],
    realExample: { emoji: '🗓️', text: `A bottler paying its concentrate supplier on delivery and collecting from wholesalers a month later carries the gap itself. The size of that gap is a line on the forecast, not an opinion about the customers.` },
    misconception: `Students put sales on the receipts line in the month of the sale. A forecast is about when money moves, so a sale on credit appears in the month it is PAID. Getting this wrong shifts every closing balance after it.`,
    examMatters: `Appendix 6 defines Construct as requiring an accurately labelled diagram, and says the type may be stated or chosen. Constructing a cash-flow forecast means the five labelled lines in order, with the closing balance carried into the next column.`,
  };
})();

/* `4a`, interpretation. The point of the table is the line you read across. */
const interpretingCashFlow = (() => {
  const sid = subId('interpreting-a-cash-flow-forecast');
  return {
    id: sid,
    title: 'Interpreting a Cash-Flow Forecast',
    keyIdea: `The line to read is the closing balance across the months: where it goes negative, and how deep, is the question the forecast was built to answer.`,
    body: [
      { type: 'paragraph', text: `A constructed forecast is read along ONE line. The closing balance for the plant's three months runs ${CASHFLOW.rows.map((r) => money(r.closing)).join(', then ')}.` },
      { type: 'paragraph', text: `Two things are worth saying about that sequence. It goes negative in month ${CASHFLOW.rows.findIndex((r) => r.closing < 0) + 1} and it is negative again in month ${CASHFLOW.rows.filter((r) => r.closing < 0).length === 2 ? 2 : 3}, and the worst point is ${money(CASHFLOW.lowest.closing)}. A negative closing balance means the plant needs cash it does not have — an overdraft, a delayed payment, or an owner putting money in.` },
      { type: 'paragraph', text: `And it recovers on its own by month 3, without the plant doing anything differently. ${money(CASHFLOW.rows[2].receipts)} arrives — the month-2 sales being paid for — against ${money(CASHFLOW.rows[2].payments)} of payments, so the closing balance comes back to ${money(CASHFLOW.rows[2].closing)}.` },
      { type: 'paragraph', text: `That shape is the whole argument for building the table. A shortfall that is visible three months ahead and known to be temporary is a conversation with a bank. The same shortfall discovered in the month it happens is an emergency, and it is the same ${money(Math.abs(CASHFLOW.lowest.closing))}.` },
    ],
    realExample: { emoji: '🔍', text: `A bottler's worst cash month is often the one after its best trading month, because the materials for the extra output were paid for before any of the extra sales were collected.` },
    misconception: `Students read a negative closing balance as a loss. It is a shortage of cash. The trading in those months was unremarkable; what moved was the timing of the money.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning and, applied to given data, interpretation. Interpreting this table means naming the month, the figure and the consequence — not that cash flow "could be a problem".`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Extend the forecast. Month 4 opens where month 3 closed, with receipts of ${money(120000)} and payments of ${money(108000)}:`,
      template: [
        `Net cash flow in month 4 is $___ thousand`,
        `The closing balance is $___ thousand`,
        `Four months in, the plant holds ___ than it started with`,
      ],
      answers: ['12', '25.2', 'less'],
      hints: ['receipts less payments for that month', 'month 3\'s closing balance plus it', `compare it with ${money(CASHFLOW.openingBalance)}`],
      distractors: ['21.6', 'more'],
    }),
  };
})();

/* `4a`, the change. `C-planning-raising-finance-specGap-05` asks for calculations based on changes
   in the cash-flow variables, and the change is chapter 3's, read on a second surface. */
const changingCashFlow = (() => {
  const sid = subId('changing-one-cash-flow-variable');
  return {
    id: sid,
    title: 'Changing One Cash-Flow Variable',
    keyIdea: `Change one figure and every closing balance after it changes, because each month's closing balance is the next month's opening balance.`,
    body: [
      { type: 'paragraph', text: `A forecast is most useful when it is asked a question. Change ONE variable, leave everything else alone, and read the closing balance line again.` },
      { type: 'paragraph', text: `Take the change from chapter 3: concentrate costs ${money(0.4)} more a ${P.unit}, so variable cost goes from ${money(P.vcu)} to ${money(CHANGE.vcu.vcu)}. Payments rise in every month, by ${money(0.4)} times that month's output. Month 1's payments go from ${money(CASHFLOW.rows[0].payments)} to ${money(CASHFLOW.changed[0].payments)}.` },
      { type: 'paragraph', text: `Now the closing balance line: ${CASHFLOW.changed.map((r) => money(r.closing)).join(', then ')}. All three are negative, the worst is ${money(CASHFLOW.changedLowest.closing)}, and month 3 no longer recovers. The same ${money(0.4)} raised the break-even point from ${qty(P.bep)} to ${qty(CHANGE.vcu.bep)} ${P.units} in chapter 3.` },
      { type: 'paragraph', text: `One changed figure, read on two surfaces, answering two different questions: how much must we sell to cover our costs, and will we have the cash to get there. A firm needs both answers and neither one implies the other.` },
    ],
    realExample: { emoji: '🧾', text: `A bottler told its concentrate price will rise runs the new figure through both the break-even calculation and the cash-flow forecast before it replies, because the two answers can point to different decisions.` },
    misconception: `Students change a figure in one month and leave the later months alone. The closing balance is carried forward, so a change in month 1 moves every month after it even if nothing else changes.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation from given data with workings. A change case needs the changed line shown as well as the answer, because the marker has to see which variable moved.`,
  };
})();

/* `4b`. Use AND limitations — the leaf the removed "Improving Cash Flow" subsection was standing on. */
const cashFlowUses = (() => {
  const sid = subId('use-and-limitations-of-cash-flow-forecasts');
  return {
    id: sid,
    title: 'Use and Limitations of Cash-Flow Forecasts',
    keyIdea: `A forecast is used to arrange finance early, time the spending a firm controls and price its credit terms. Its limit is that every receipt on it is itself a forecast.`,
    body: [
      { type: 'paragraph', text: `The specification pairs the uses with the limitations, and that is the point: the same table is valuable and unreliable for the same reason.` },
      { type: 'paragraph', text: `**What it is for.**` },
      { type: 'bullets', items: CASHFLOW_USES.map(([h, w]) => `**${h}.** ${w.charAt(0).toUpperCase()}${w.slice(1)}.`) },
      { type: 'paragraph', text: `**What it cannot do.**` },
      { type: 'bullets', items: CASHFLOW_LIMITS.map(([h, w]) => `**${h}.** ${w.charAt(0).toUpperCase()}${w.slice(1)}.`) },
      { type: 'paragraph', text: `The first limitation connects this chapter to chapter 2: every figure on the receipts line is a sales forecast, so all four difficulties are in this table too — and compounded, because a forecast wrong about the amount is usually wrong about the timing.` },
    ],
    realExample: { emoji: '🏦', text: `A lender asked for an overdraft three months before it is needed is being shown a plan. The same lender asked in the week the balance turns negative is being asked to rescue something.` },
    misconception: `Students treat a cash-flow forecast as a record of what happened. It is a forecast, and its receipts line is built on the sales forecast from chapter 2 — so it inherits every difficulty that number has.`,
    examMatters: `Appendix 6 defines Assess as requiring a balanced and wide-ranging assessment showing awareness of competing factors, leading to a supported judgement. A ten-mark Assess of a forecast needs a use and a limitation, and then a view on which matters more for this firm.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: `Order what the plant does with the forecast, from building it to acting on it:`,
      items: [
        `Forecast the sales volume for each month`,
        `Turn the sales into receipts using the credit terms`,
        `Set the payments against each month's output`,
        `Carry the closing balance into the next month`,
        `Arrange finance for the month the balance turns negative`,
      ],
      correctOrder: [
        `Forecast the sales volume for each month`,
        `Turn the sales into receipts using the credit terms`,
        `Set the payments against each month's output`,
        `Carry the closing balance into the next month`,
        `Arrange finance for the month the balance turns negative`,
      ],
      why: [
        'Nothing on the table can be filled in before the volume is estimated.',
        'A sale becomes a receipt only when it is paid, so the credit terms decide the month.',
        'Payments follow what is PRODUCED, which is not what is collected.',
        'This is the step that makes three separate months into one forecast.',
        'The action comes last, and it is the reason for building the table at all.',
      ],
    }),
  };
})();

/* ══════════════════════════════════════════════════════════════════════════════
   BLOCK 5 — Budgets (2.3.2 · 5a, 5b, 5c, 5d)
   ══════════════════════════════════════════════════════════════════════════ */

/* `5a`. Four purposes, and the fourth is the one students never name. */
const budgetPurposes = (() => {
  const sid = subId('purposes-of-budgets');
  return {
    id: sid,
    title: 'Purposes of Budgets',
    keyIdea: `A budget is an agreed plan in figures for a future period. It is used to plan, to control spending as it happens, to motivate whoever agreed it, and to allocate a fixed total.`,
    body: [
      { type: 'paragraph', text: `A **budget** is a financial plan for a future period, agreed in advance. The plant's ${BUDGET.month} budget says revenue ${money(BUDGET.lines[0].budget)}, variable costs ${money(BUDGET.lines[1].budget)}, fixed costs ${money(BUDGET.lines[2].budget)}.` },
      { type: 'paragraph', text: `It does four jobs, and they are genuinely different jobs.` },
      { type: 'bullets', items: BUDGET_PURPOSES.map(([h, w]) => `**${h}.** ${w.charAt(0).toUpperCase()}${w.slice(1)}.`) },
      { type: 'paragraph', text: `Control is the one that makes a budget worth the work. A set of annual accounts tells a firm what happened after it can do anything about it; a monthly budget compared with the actual figures tells it in time to act, which is what chapter 5's variance analysis is for.` },
      { type: 'paragraph', text: `And the fourth job is the one students leave out. When the total is fixed, giving one department more means giving another less, so a budget forces a choice that would otherwise be avoided.` },
    ],
    realExample: { emoji: '📋', text: `A bottling plant's maintenance and marketing managers both want the same unallocated sum. The budget is where that is settled, and it is settled once rather than argued about monthly.` },
    misconception: `Students describe a budget as a limit on spending. It is a plan, and a plan for revenue as much as for costs — a sales budget is a target to reach, not a ceiling to stay under.`,
    examMatters: `Appendix 6 defines Explain as requiring cause or effect with details or an example. A purpose explained needs the mechanism: control works because the comparison happens monthly, while there is still time to change something.`,
  };
})();

/* `5b-1`. Historical, and its weakness is what `5b-2` exists to answer. */
const historicalBudgets = (() => {
  const sid = subId('budgets-based-on-historical-figures');
  return {
    id: sid,
    title: 'Budgets Based on Historical Figures',
    keyIdea: `A historical budget starts from last period's actual figures and adjusts them. It is quick and it carries forward whatever was in last period's spending, justified or not.`,
    body: [
      { type: 'paragraph', text: `The specification names two types of budget. The first starts from what happened: last period's actual figures, adjusted for what is expected to change. The plant's ${money(BUDGET.lines[2].budget)} fixed-cost budget is last month's figure with an expected rent increase in it.` },
      { type: 'paragraph', text: `**Why firms use it.** It is fast, the figures already exist, and it is easy to explain to whoever has to accept it. For a cost that genuinely does not move much, starting from last month is not lazy — it is correct.` },
      { type: 'paragraph', text: `**What it carries forward.** Everything in last period's spending comes with it, including the part nobody could now justify. A line that was set for a product the plant no longer makes is adjusted by the same percentage as the rest, year after year, because nobody is ever asked what it is for.` },
      { type: 'paragraph', text: `So the weakness is not inaccuracy. A historical budget is usually close to right. It is that the method never asks whether the base it starts from deserved to be there, which is exactly the question the second type is built around.` },
    ],
    realExample: { emoji: '🗂️', text: `A plant's stationery and subscriptions line rises by the same few per cent every year and nobody in the building can say what is on it. That is a historical budget working exactly as designed.` },
    misconception: `Students say a historical budget "uses old data and is therefore wrong". It is usually close. The objection is that it never tests the base — a figure can be accurate and unjustified at the same time.`,
    examMatters: `Appendix 6 defines Assess as requiring a balanced assessment leading to a supported judgement. Assessing a budgeting method means the case for the speed as well as the case against the inherited base, then a view for this firm.`,
  };
})();

/* `5b-2`. Zero based. The spec's own spelling is "zero based"; the hyphen is for readability. */
const zeroBasedBudgets = (() => {
  const sid = subId('zero-based-budgets');
  return {
    id: sid,
    title: 'Zero-Based Budgets',
    keyIdea: `A zero-based budget starts every line at nothing and each one has to be justified from scratch. It tests what a historical budget assumes, and it costs a great deal of time.`,
    body: [
      { type: 'paragraph', text: `The second type. The specification calls it **zero based**, and the name is literal: every line starts at nothing and every amount asked for has to be justified from the beginning, whatever it was last period.` },
      { type: 'paragraph', text: `**What it finds.** Spending that survived because nobody questioned it. If the plant's marketing manager has to argue for the whole figure rather than for the increase, the parts that cannot be argued for do not get funded. That is the one thing a historical budget can never do.` },
      { type: 'paragraph', text: `**What it costs.** Time, and a lot of it. Every line means a case prepared, a meeting and a decision, across every department, for a budget that may be very close to last year's anyway. A firm that did this monthly would do little else.` },
      { type: 'paragraph', text: `Which is why the real choice is not one method or the other. A firm can budget historically as a rule and take one area to zero base each year — the speed where the base is sound, the scrutiny where it is doubtful.` },
    ],
    realExample: { emoji: '0️⃣', text: `A plant that zero bases its maintenance budget once discovers a service contract for equipment that was sold two years earlier. The historical method had been adjusting that line upwards the whole time.` },
    misconception: `Students write that zero-based budgeting "sets the budget to zero". It sets the STARTING POINT to zero: the department still gets a budget, but it gets one it has argued for rather than one it inherited.`,
    examMatters: `Appendix 6 defines Evaluate as requiring a perceptive conclusion that proposes a solution or recommendation. The recommendation here is rarely one method for everything, and a conclusion that picks one without saying where it applies has not weighed the cost.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each budgeting problem to the method that answers it:`,
      pairs: [
        { left: 'A spending line nobody can justify', right: 'Zero based', why: 'Starting from zero forces the case to be made rather than inherited.' },
        { left: 'A budget needed quickly, for a stable cost', right: 'Based on historical figures', why: 'The figures already exist, and a stable cost does not need re-arguing.' },
        { left: 'Managers who will not accept the target', right: 'Involve them in setting it', why: 'A figure somebody agreed to is a target they own; an imposed one is not.' },
        { left: 'Actual spending drifting above plan', right: 'Variance analysis, monthly', why: 'The monthly comparison catches drift while there is still time to act.' },
      ],
      distractors: ['Raise the budget'],
    }),
  };
})();

/* `5c`. The calculation `structure-07` says the section ends without, and the one that answers the
   section's own "favourable always means good" misconception with arithmetic. */
const varianceAnalysis = (() => {
  const sid = subId('variance-analysis');
  return {
    id: sid,
    title: 'Variance Analysis',
    keyIdea: `A variance is the difference between a budgeted figure and the actual one: favourable when it helps profit, adverse when it hurts it. None means anything alone.`,
    body: [
      { type: 'paragraph', text: `A **variance** is the difference between what was budgeted and what happened. It is called **favourable** when it helps profit and **adverse** when it hurts profit — which means the same arithmetic reads opposite ways on a revenue line and a cost line.` },
      { type: 'paragraph', text: `Revenue above budget is favourable. Cost above budget is adverse. So a variance is never just a number: it is a number and a word, and getting the word wrong inverts the meaning.` },
      { type: 'paragraph', text: `The plant's ${BUDGET.month}: revenue was budgeted at ${money(BUDGET.lines[0].budget)} and came in at ${money(BUDGET.lines[0].actual)}, a variance of ${money(BUDGET.lines[0].variance)} **favourable**. Variable costs were budgeted at ${money(BUDGET.lines[1].budget)} and came in at ${money(BUDGET.lines[1].actual)} — ${money(BUDGET.lines[1].variance)} **adverse**. Fixed costs were ${money(BUDGET.lines[2].variance)} **adverse**.` },
      { type: 'paragraph', text: `Now add them up the way they affect profit: ${money(BUDGET.lines[0].variance)} favourable less ${money(BUDGET.lines[1].variance)} and ${money(BUDGET.lines[2].variance)} adverse is ${money(BUDGET.profit.variance)} **adverse** — and the profit variance is exactly that. Budgeted ${money(BUDGET.profit.budget)}, actual ${money(BUDGET.profit.actual)}.` },
      { type: 'paragraph', text: `**The best revenue month was the worse profit month.** The extra ${P.units} were sold at a lower price and they carried their variable costs with them, which is the price cut from chapter 1 arriving on the budget. A favourable variance on one line is not good news until the other lines have been read.` },
    ],
    realExample: { emoji: '🔀', text: `A bottler celebrating a record sales month finds the same month's profit below budget. Both reports are right, and the variance table is the only place the two are reconciled.` },
    misconception: `Students read favourable as good and adverse as bad, and stop. A favourable sales variance won by discounting brings an adverse cost variance with it. Read the lines together and check that they reconcile to the profit variance.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning and, on given data, interpretation. Interpreting a variance table means linking the lines — this favourable one caused that adverse one — rather than describing each in turn.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Suppose the fixed costs had come in at ${money(34800)} instead of ${money(BUDGET.lines[2].actual)}, with the other two lines unchanged:`,
      template: [
        `The fixed-cost variance would be $___ thousand`,
        `and it would be ___`,
        `Profit would still miss its budget, by $___ thousand`,
      ],
      answers: ['1.2', 'favourable', '3.6'],
      hints: ['the difference from the budgeted figure', 'which way it moves profit', 'net the three variances against each other'],
      distractors: ['2.4', 'adverse'],
    }),
  };
})();

/* `5d`. Difficulties, and the first one closes the loop back to chapter 2. */
const budgetDifficulties = (() => {
  const sid = subId('difficulties-of-budgeting');
  return {
    id: sid,
    title: 'Difficulties of Budgeting',
    keyIdea: `A budget is built on a sales forecast, it rewards spending the whole allowance, it demotivates when the target is set too high, and it takes real time to negotiate.`,
    body: [
      { type: 'paragraph', text: `The difficulties of budgeting are a leaf in their own right, and not the same as the drawbacks of one method.` },
      { type: 'bullets', items: BUDGET_DIFFICULTIES.map(([h, w]) => `**${h}.** ${w.charAt(0).toUpperCase()}${w.slice(1)}.`) },
      { type: 'paragraph', text: `The first closes the loop this section opened. A variance measured against a forecast that was wrong tells the firm about its forecasting, not about its performance.` },
      { type: 'paragraph', text: `The second, firms create for themselves. If underspending means a smaller allowance next year, the rational thing to do in month twelve is spend the balance — so a rule meant to control spending has produced some.` },
      { type: 'paragraph', text: `None of these is a reason not to budget. They are reasons to read a variance as the start of a question, which is where this section began: every figure in it rests on the one before.` },
    ],
    realExample: { emoji: '⏳', text: `A department that comes in under budget two years running finds its allowance cut, and spends to the limit in the third. Nothing in the process was dishonest and the incentive was doing exactly what it was set up to do.` },
    misconception: `Students give "the budget might be wrong" as a difficulty. Say why it is hard to get right — it inherits the sales forecast, it changes how people behave, and it costs time — and then what the firm should do about it.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context with a brief assessment showing awareness of competing arguments. Two difficulties developed with what the firm should do beats four listed.`,
  };
})();

/* ══════════════════════════════════════════════════════════════════════════════
   the blocks
   ══════════════════════════════════════════════════════════════════════════ */

export const SUBSECTIONS = {
  [B1]: [volumeRevenue, fixedVariable, totalAverage, improvingVolumes, improvingRevenues],
  [B2]: [forecastPurpose, consumerTrends, economicVariables, competitorActions, forecastDifficulties],
  [B3]: [contribution, breakEvenPoint, usingContribution, marginOfSafety, interpretingChart, breakEvenLimits],
  [B4]: [constructingCashFlow, interpretingCashFlow, changingCashFlow, cashFlowUses],
  [B5]: [budgetPurposes, historicalBudgets, zeroBasedBudgets, varianceAnalysis, budgetDifficulties],
};

const TAKEAWAYS = {
  [B1]: [
    `Sales revenue is price × volume, so the two can move opposite ways`,
    `A cost is fixed if output does not move it — for a stated period`,
    `Average cost falls because the fixed cost is spread wider`,
    `A price cut can raise revenue and lower profit at the same time`,
  ],
  [B2]: [
    `A forecast is a volume, and every other figure here is built on it`,
    `Three factors move it: consumer trends, economic variables, competitors`,
    `They do not all push the same way, so apply them one at a time`,
    `Its difficulties are inherited by the cash-flow forecast and the budget`,
  ],
  [B3]: [
    `Contribution is price less variable cost per unit, not profit per unit`,
    `Break-even point = fixed costs ÷ contribution per unit`,
    `Margin of safety is output less break-even, measured in units`,
    `The cost line starts at the fixed costs; the gap between lines is profit`,
  ],
  [B4]: [
    `Receipts are money arriving, not sales made — credit terms decide when`,
    `Closing balance is opening plus net cash flow, carried into next month`,
    `Change one variable and every month after it changes`,
    `Its receipts line is a sales forecast, so it inherits those difficulties`,
  ],
  [B5]: [
    `A budget plans, controls, motivates and allocates a fixed total`,
    `Historical is fast and inherits its base; zero based tests it and costs time`,
    `A variance is a number and a word: favourable or adverse`,
    `Variances reconcile to the profit variance — read them together`,
  ],
};

/**
 * The blocks, with the pins injected. Every index comes from the assessment item's own `block` tag
 * (see the runner), so a question cannot be pinned to a chapter that does not teach it —
 * `structure-02` is a pin pointing at another chapter's question and this is the shape of fix that
 * makes it unrepresentable rather than corrected.
 */
export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  return BLOCK_TITLES.map((title) => ({
    title,
    sections: SUBSECTIONS[title],
    takeaway: TAKEAWAYS[title],
    diagramId: diagramIds[title],
    quizIndices: quizIndices[title],
    practiceIndices: practiceIndices[title],
  }));
}

/**
 * Notes. One topic a chapter, titled so `depth.notes-titles` resolves against the Learn Mode block
 * titles — the rule fires when a Notes topic shares fewer than half its content words with any
 * block or subsection title, which is how "Branding" ended up taught on one tab and not the other.
 */
export const NOTES = BLOCK_TITLES.map((title, i) => ({
  title,
  order: i,
  content: SUBSECTIONS[title].map((s) => `**${s.title}.** ${s.keyIdea}`).join('\n\n'),
}));

export const ATTACH_SLUGS = BLOCK_TITLES;
