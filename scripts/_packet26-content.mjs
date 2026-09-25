/**
 * PACKET 26 — government-intervention, Learn Mode content and Notes.
 *
 * Economics Unit 1 (WEC11), IAL topic 1.3.6, audit/raw/econ_spec.txt:798-831. EIGHT blocks and
 * THIRTY-ONE subsections, where the March section had eight blocks and seventeen. The chapter list is
 * not the specification's own sub-topic list this time, because 1b is eight methods and one chapter
 * each would be ten chapters with 1a and government failure — past the point where a signed-out
 * student stops being served a check-in question (DECISIONS, 16 September). The split is by what the
 * tool DOES to the market, and every one of 1b's eight bullets keeps a named home.
 *
 * SEVEN SCOPE DECISIONS THE SPECIFICATION SETTLED BEFORE A WORD WAS WRITTEN (see NEXT.md):
 *
 *   - "DISTORTION OF PRICE SIGNALS" IS NOT A CAUSE OF GOVERNMENT FAILURE IN THIS SPECIFICATION, AND
 *     TWO FINDINGS ASK FOR IT. `specGap-01` and `topFix-05` both say to "add the spec-named
 *     government-failure causes (distortion of price signals, excessive administrative costs)".
 *     `price signal` is 0 in econ_spec.txt and `distortion of price signals` is 0. 2b is a closed
 *     list of five at :827-831 and that phrase is UK GCE 9EC0 1.4.2. Refused. The other half is real:
 *     excessive administrative costs (:830) appeared only in passing and is now a subsection.
 *   - AND TWO CAUSES THAT ARE PRESENT BELONG TO ANOTHER UNIT. Nothing in the audit says so. The March
 *     section taught REGULATORY CAPTURE (:1520 — topic 3.3.5, Unit 3, and packet 48's section) and
 *     POLITICAL SHORT-TERMISM (`short-termism` 0) as causes of government failure at 1.3.6, where the
 *     list is closed at five. An audit item tells you what is MISSING, never what is PRESENT and
 *     should not be. Third instance after packets 20 and 25.
 *   - THE 20-MARK EVALUATE STAYS, AND TWO FINDINGS ASK FOR IT TO GO. `practice-01` says "20-mark
 *     essays are WEC13/WEC14 format; WEC11 Section B tops out at 14 marks" and `topFix-04` asks for
 *     the change. The census gives Economics Evaluate = 20 with no unit note (:2741-2747) and
 *     PROTOCOL's paper table has WEC11 Section D as one 20-mark essay from a choice of two. Obeying
 *     would have deleted the section's hardest item. What IS wrong with that item is real and is
 *     fixed: its guidance allocated points where a tariff above 6 is levels-marked.
 *   - "PRICE CEILING" AND "PRICE FLOOR" ARE NOT THE NAMES OF ANYTHING HERE. Both 0 in econ_spec.txt
 *     (packet 24's finding) and both were BLOCK TITLES. The specification's phrase at :809 is
 *     "maximum and minimum (guaranteed) prices" — and note that `maximum price` and `minimum price`
 *     each grep 0 for the same reason `social cost` did in packet 25: the words are there and the
 *     two-word phrase is not.
 *   - NUDGE THEORY IS NOT ON THIS SPECIFICATION AND THE FINDING'S NUMBER IS UK GCE. `accuracy-02` is
 *     right that nudge theory and libertarian paternalism are off-spec (`nudge` 0, `libertarian` 0,
 *     `choice architecture` 0) and wrong that the IAL home is "1.2.10" — no IAL topic has a middle
 *     digit but 3. It is 1.3.2 · 1b (:580-587), which packet 17 already teaches. What IS this
 *     section's is 1b-8, provision of information, taught here as a shift in demand.
 *   - BUFFER STOCKS ARE UNIT 4. `specGap-07` is unsure; `buffer stock` is one hit, at :1958, in
 *     4.3.6. Quiz Q21 is deleted rather than taught to. The 1.3.6 route into a commodity market is
 *     1b-3 applied to 1c-8, which is what chapter 7 builds.
 *   - INCIDENCE IS 1.3.4 AND IS CROSS-REFERENCED, NOT RETAUGHT. `specGap-02` asks for "a
 *     cross-reference to 1.2.9", a number this specification does not contain. Incidence is 1.3.4 ·
 *     4b and 4d (:713, :716), which packet 24 teaches in a subsection and a Calculate of its own.
 *
 * Money is in dollars throughout. Every figure belongs to Osira coal, Osira clinics or Osira flats
 * and is derived in _packet26-util.mjs. Real examples name real policies in real places and carry NO
 * year and NO figure (packet 15's accuracy-01 rule) — which is also how `accuracy-01` is answered:
 * the March claim that London capped the number of black cabs is false, and it is removed rather than
 * corrected, along with all nine of the section's UK examples (`structure-08`).
 */
import {
  subId, SECTION, hash8, money, qty, CITY, MINUS,
  COAL, CLINIC, FLATS, valueAt, meet,
} from './_packet26-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const C = COAL, L = CLINIC, F = FLATS;

export const B1 = 'Why Governments Intervene';
export const B2 = 'Indirect Taxation';
export const B3 = 'Subsidies';
export const B4 = 'Maximum and Minimum Prices';
export const B5 = 'Permits, Property Rights and Regulation';
export const B6 = 'State Provision and Information';
export const B7 = 'Where Governments Intervene';
export const B8 = 'Government Failure';

/* ══ Block 1 — Why Governments Intervene (1.3.6 · 1a) ══════════════════════ */

const whatInterventionIsFor = (() => {
  const sid = subId('what-intervention-is-for');
  return {
    id: sid,
    title: 'What Intervention Is For',
    keyIdea: 'The purpose of government intervention is to move the quantity traded towards the socially optimal level, and the reason it is not already there is market failure.',
    body: [
      { type: 'paragraph', text: 'The specification opens this topic with one line: **the purpose of government intervention, including reference to market failure**. The second half of that line is doing the work. A government intervening in a market is not a separate subject from the last topic — it is the answer to it.' },
      { type: 'paragraph', text: `In ${C.name}, buyers and sellers settle at ${qty(C.marketQ)} ${C.units} ${C.per} at ${money(C.marketP)}. Every ${C.unit} burnt puts ${money(C.externalCost)} of cost on people who are not in the deal, and nothing in the price carries it. Count it and the quantity worth making falls to ${qty(C.optimumQ)}. The triangle between the two is ${money(C.welfareLoss)} ${C.per} of welfare that nobody is getting.` },
      { type: 'paragraph', text: `That number is what every method in this topic is aimed at, and the honest test of each: an intervention is worth making if it removes more of that ${money(C.welfareLoss)} than it costs to run.` },
      { type: 'paragraph', text: 'Two things follow. An answer that says a government intervened "to correct market failure" has named the aim without naming the failure. And an answer that assumes the intervention worked has skipped the only question worth asking.' },
    ],
    realExample: { emoji: '🏛️', text: 'Almost every government taxes tobacco, and the treaty most have signed commits them to using tax and price measures to reduce smoking. The tax is not there to raise money, although it does: it is there because the price of a cigarette does not carry what smoking costs everybody else.' },
    misconception: 'Students write that governments intervene because a price is too high or a market is unfair. Neither is market failure as this specification defines it. Instead write: the market produces too much or too little compared with the socially optimal level.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring knowledge, understanding and application, and — when explaining a reason or impact — a two-stage chain of reasoning. Naming the failure is the first stage; saying which way the quantity is wrong is the second.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the line this topic opens with:',
      template: [
        'The purpose of government intervention is to move the ___ traded',
        '→ towards the socially ___ level',
        '→ and the reason it is not there already is market ___',
      ],
      answers: ['quantity', 'optimal', 'failure'],
      hints: ['not the price: the thing market failure is defined against', 'the specification\'s own word for the best level for society', 'what the last topic was about, and what 1a tells you to refer to'],
      distractors: ['price', 'affordable', 'competition'],
    }),
  };
})();

const theEightMethods = (() => {
  const sid = subId('the-eight-methods');
  return {
    id: sid,
    title: 'The Eight Methods',
    keyIdea: 'The specification lists eight methods of intervention and no more, and three of them work on the price, one on the quantity, and four on the rules or on what people know.',
    body: [
      { type: 'paragraph', text: 'There are eight, and the list is closed. Each chapter after this one takes a group of them and shows what it does to a market.' },
      { type: 'bullets', items: [
        '**Indirect taxation (ad valorem and specific)** — makes the good dearer to sell, so less is sold.',
        '**Subsidies** — makes it cheaper to supply, so more is sold.',
        '**Maximum and minimum (guaranteed) prices** — fixes the price by law and lets the quantity fall where it falls.',
        '**Tradeable pollution permits** — fixes the quantity and lets the price fall where it falls.',
        '**Extension of property rights** — gives somebody a claim they can defend or sell.',
        '**State provision** — the government supplies the good itself.',
        '**Regulation** — a rule, a limit or a standard, enforced.',
        '**Provision of information** — changes what buyers and sellers know, and nothing else.',
      ] },
      { type: 'paragraph', text: 'Read the list for the shape rather than the detail. Three work on the **price**. One works on the **quantity**. Four work on the **rules or on what people know**. That division is the one this section keeps returning to, because a tool that sets a price cannot also set a quantity, and a government usually wants both.' },
    ],
    realExample: { emoji: '🧰', text: 'A government facing a polluting industry has four of these at once: tax it, cap it, make the harm actionable in court, or regulate the process. All four can reach the same quantity, and they put the money in four different places.' },
    misconception: 'Students treat the list as a menu of things to mention. It is a list of things that act differently. Instead: when you name a method, say in the same sentence whether it works by changing a price, a quantity, or what somebody knows.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as requiring students to give the meaning of a term, concept or phrase. Each of these eight can be the term, so each needs a sentence you could write from memory.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each method by what it sets directly.',
      groups: [
        { name: 'Sets a price', items: ['indirect taxation', 'subsidies', 'maximum and minimum prices'] },
        { name: 'Sets a quantity', items: ['tradeable pollution permits'] },
        { name: 'Sets a rule, or what is known', items: ['extension of property rights', 'state provision', 'regulation', 'provision of information'] },
      ],
      why: [
        'Each of these changes what a buyer or a seller faces per unit, and the quantity then settles wherever the two sides take it',
        'This one fixes how many units may be traded and lets the price settle wherever buyers take it — the mirror image of the first group',
        'None of these names a price or a quantity: they change who may do what, who supplies it, or what people know before they choose',
      ],
    }),
  };
})();

const judgingAnIntervention = (() => {
  const sid = subId('judging-an-intervention');
  return {
    id: sid,
    title: 'Judging an Intervention',
    keyIdea: 'An intervention is judged on whether the welfare it recovers exceeds what it costs to run, not on whether it moved the quantity in the right direction.',
    body: [
      { type: 'paragraph', text: 'Every evaluation question in this topic is the same question, and it is worth having the steps before meeting a single policy.' },
      { type: 'flow', steps: [
        { title: 'Say which way the quantity is wrong, and by how much', subtitle: `${qty(C.marketQ)} ${C.units} against a social optimum of ${qty(C.optimumQ)}` },
        { title: 'Put a number on what that costs in welfare', subtitle: `the triangle: ${money(C.welfareLoss)} ${C.per}` },
        { title: 'Say what the policy does to the quantity', subtitle: 'and whether it reaches the optimum, falls short, or overshoots' },
        { title: 'Set the welfare recovered against what the policy costs', subtitle: 'running it, and any new problem it creates' },
      ], result: 'A judgement with a number in it', resultType: 'good' },
      { type: 'paragraph', text: 'Step four is where most answers stop early. A policy that moves the quantity the right way is not automatically worth having: it has to be **administered, monitored and enforced**, and somebody has to know the number it is set from.' },
      { type: 'paragraph', text: 'It also tells you what to do where nothing is failing at all — a rent that is simply out of reach. There is no triangle to recover, so the case has to be made on other grounds, and saying so beats pretending the triangle exists.' },
    ],
    realExample: { emoji: '⚖️', text: 'The hardest part in practice is step two. A government can see that a market produces too much of something; putting a defensible number on how much too much is a research problem, and that is the number the policy is set from.' },
    misconception: 'Students evaluate a policy by listing advantages and disadvantages. That produces two lists and no judgement. Instead: say what the policy does to the quantity, what that is worth, and what it costs — and the judgement is then the comparison, not an opinion added at the end.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as requiring logical and coherent multi-stage chains of reasoning with reference to context, a recognition of different viewpoints, and informed judgements. The four steps above are one such chain, and the judgement is the last of them.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each step of the judgement to the mistake made by skipping it.',
      pairs: [
        { left: 'Saying which way the quantity is wrong', right: 'a tool that pushes it further the wrong way' },
        { left: 'Putting a number on the welfare lost', right: 'nothing to weigh the cost of the policy against' },
        { left: 'Working out where the policy lands the quantity', right: 'crediting a policy with its intention' },
        { left: 'Setting the gain against the cost of running it', right: 'two lists of advantages and no judgement' },
      ],
      why: [
        'A tool that raises quantity is useless where quantity is already too high, so the direction has to come first',
        'A direction alone cannot be compared with a cost; the triangle is what turns the error into money',
        'A policy is not its intention: it lands the quantity somewhere, which may be short of the optimum or past it',
        'The comparison IS the judgement, so an answer that stops before it has described rather than judged',
      ],
    }),
  };
})();

/* ══ Block 2 — Indirect Taxation (1.3.6 · 1b-1) ════════════════════════════ */

const howAnIndirectTaxMovesAMarket = (() => {
  const sid = subId('how-an-indirect-tax-moves-a-market');
  return {
    id: sid,
    title: 'How an Indirect Tax Moves a Market',
    keyIdea: `An indirect tax is paid by the seller per unit sold, so it lifts the curve sellers act on by the tax and the quantity falls: ${money(C.tax)} a ${C.unit} takes ${C.name} from ${qty(C.marketQ)} ${C.units} to ${qty(C.taxedQ)}.`,
    body: [
      { type: 'paragraph', text: `An **indirect tax** is charged on a transaction rather than on a person's income, and it is collected from the seller. Every ${C.unit} sold now costs the seller what it cost before plus the tax, so the price they need in order to supply any given quantity rises by exactly that much.` },
      { type: 'flow', steps: [
        { title: 'The tax is added to what each unit costs to sell', subtitle: `${money(C.tax)} a ${C.unit}, whoever hands the money over` },
        { title: 'Sellers need a higher price for every quantity', subtitle: 'so the curve they act on rises by the tax' },
        { title: 'At the old price, fewer units are worth supplying', subtitle: 'and buyers are not willing to pay more for the same amount' },
        { title: 'The market settles at a lower quantity', subtitle: `${qty(C.taxedQ)} ${C.units} ${C.per}, down from ${qty(C.marketQ)}` },
      ], result: `Quantity falls to the social optimum`, resultType: 'good' },
      { type: 'paragraph', text: `Set the tax at the external cost and something exact happens: the curve sellers act on becomes the same line as **MSC**, the curve that counts every cost. That is the whole argument for setting it there, and it is why ${money(C.tax)} is the number and not a round figure chosen for convenience.` },
    ],
    realExample: { emoji: '🚬', text: 'Taxes on tobacco, alcohol and fuel are the three every country has. All three are goods whose use puts costs on people other than the buyer, and in all three the tax is charged per unit or as a share of the price rather than on anybody\'s income.' },
    misconception: 'Students say an indirect tax shifts demand, because the price rises and people buy less. It is collected from the seller, so it moves supply; the fall in quantity is a movement ALONG demand. Instead write: the tax raises the curve sellers act on.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as assessing quantitative skills and requiring an accurately labelled diagram. What has to be labelled here is the two prices and the new quantity.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it describes a SHIFT of a curve or a MOVEMENT along one.',
      groups: [
        { name: 'A shift of the curve', items: ['the price sellers need for every quantity rises by the tax', 'the curve firms act on becomes the same line as MSC'] },
        { name: 'A movement along the curve', items: ['buyers take a smaller quantity at the higher price', 'the units at the margin stop being worth making'] },
      ],
      why: [
        'The tax changes what supplying any quantity costs, so the whole supply curve moves; nothing about demand has changed',
        'Buyers and the marginal units respond to the new price on curves that have not moved — which is why a tax does not shift demand',
      ],
    }),
  };
})();

const specificAndAdValorem = (() => {
  const sid = subId('specific-and-ad-valorem');
  return {
    id: sid,
    title: 'Specific and Ad Valorem',
    keyIdea: 'A specific tax is a fixed sum per unit and shifts supply in parallel; an ad valorem tax is a percentage of the price and pivots supply so the gap widens as the price rises.',
    body: [
      { type: 'paragraph', text: 'The specification names both forms in the same bullet, and they are not interchangeable. The difference is what the tax is charged **on**.' },
      { type: 'paragraph', text: `A **specific** tax is a sum of money per unit: ${money(C.tax)} a ${C.unit}, the same on a cheap ${C.unit} and an expensive one. Every point on the supply curve rises by ${money(C.tax)}, so the new curve is **parallel** to the old one. That is the tax drawn in this chapter.` },
      { type: 'paragraph', text: 'An **ad valorem** tax is a percentage of the price. On a cheap unit a percentage is a small amount of money; on an expensive unit the same percentage is a large one. So the curve does not rise evenly — it **pivots** away from its foot, and the vertical gap between old and new widens as you move up it.' },
      { type: 'paragraph', text: 'Both raise the price buyers pay and lower what sellers keep. The choice between them is about where you want the weight of the tax to fall. A percentage falls hardest on the expensive end of a market, which is sometimes the point and sometimes the problem.' },
    ],
    realExample: { emoji: '🧾', text: 'Most countries run both at once. A general sales tax or value-added tax is ad valorem and applies across the board; the extra duties on fuel, alcohol and tobacco are usually specific, charged per litre, per unit of alcohol or per cigarette.' },
    misconception: 'Students draw an ad valorem tax as a parallel shift, because a parallel shift is what they practised. The two shapes are the examinable difference between the two forms. Instead: if the question says percentage, pivot the curve; if it names a sum per unit, shift it in parallel.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as requiring an accurately labelled diagram, and says students may be required to decide on a type of diagram. Deciding correctly between a parallel shift and a pivot is part of that decision.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each statement to the form of indirect tax it describes.',
      pairs: [
        { left: 'A sum of money charged on every unit sold', right: 'a specific tax' },
        { left: 'A percentage of the price charged on each sale', right: 'an ad valorem tax' },
        { left: 'The new supply curve is parallel to the old one', right: 'the shift a specific tax makes' },
        { left: 'The gap widens as you move up the supply curve', right: 'the shift an ad valorem tax makes' },
      ],
      why: [
        'The amount does not depend on the price, so it is the same number of dollars everywhere on the curve',
        'The amount is a share of the price, so it grows with the price of the unit being taxed',
        'Adding the same amount at every quantity moves every point by the same distance, which is what parallel means',
        'A percentage of a bigger number is a bigger number, so the vertical distance grows as the price rises',
      ],
    }),
  };
})();

const theTwoPricesAndTheRevenue = (() => {
  const sid = subId('the-two-prices-and-the-revenue');
  return {
    id: sid,
    title: 'Two Prices, and the Revenue',
    keyIdea: `Once a tax is on there are two prices: buyers pay ${money(C.buyerP)} and sellers keep ${money(C.sellerP)}. The gap is the tax, and the revenue is that gap times the quantity traded AFTER the tax.`,
    body: [
      { type: 'paragraph', text: `Before the tax there was one price, ${money(C.marketP)}. After it there are two, and reading them off correctly is most of the arithmetic in this topic.` },
      { type: 'bullets', items: [
        `**Pc**, the price buyers pay: ${money(C.buyerP)}. Read it off demand at the new quantity.`,
        `**Pp**, the price sellers keep: ${money(C.sellerP)}. Read it off the ORIGINAL supply curve at the new quantity.`,
        `The gap between them is ${money(C.tax)}, the tax. It always is — that is what the tax is.`,
        `Revenue is ${money(C.tax)} × ${qty(C.taxedQ)} = **${money(C.revenue)} ${C.per}**, using the quantity traded after the tax and not the ${qty(C.marketQ)} traded before it.`,
      ] },
      { type: 'paragraph', text: `How the ${money(C.tax)} divides between the two sides is the **incidence**, and it is not half and half here: the price buyers pay rose by ${money(C.consumerIncidence)} and what sellers keep fell by ${money(C.producerIncidence)}. Which side carries more depends on which side can move away from the price more easily, and that rule is proved in topic **1.3.4 · 4b**, where the specification puts it.` },
      { type: 'paragraph', text: `What 1.3.6 adds is what the ${money(C.revenue)} is for. It can be spent on the harm, on anything else, or on cutting another tax — and which a government does is a fair evaluation point.` },
    ],
    realExample: { emoji: '🔁', text: 'Some governments commit the revenue from an environmental tax to the problem that justified it and some put it into general funds. The economics of the tax is the same either way; the politics of keeping it is not.' },
    misconception: 'Students calculate revenue using the quantity before the tax, because that is the number the question gave them first. The tax is only collected on units actually sold. Instead: find the new quantity first, then multiply.',
    examMatters: 'Appendix 6 defines Calculate (2 or 4 marks, WEC11) as requiring a calculation involving several stages based on given data, and advises students to show workings. Setting out the new quantity on its own line before multiplying is what makes the stages visible.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the reading of the ${money(C.tax)} tax:`,
      template: [
        `Buyers pay Pc, read off demand at the new quantity: ${money(C.buyerP)}`,
        `→ sellers keep Pp, read off the ___ supply curve: ${money(C.sellerP)}`,
        `→ the gap between the two prices is the ___`,
        `→ revenue is that gap times the quantity traded ___ it`,
      ],
      answers: ['original', 'tax', 'after'],
      hints: ['not the shifted one: the curve that says what supplying actually costs', 'the thing the two prices are separated by, by definition', 'the word that decides whether you multiply by ' + qty(C.taxedQ) + ' or ' + qty(C.marketQ)],
      distractors: ['shifted', 'subsidy', 'before'],
    }),
  };
})();

const evaluatingAnIndirectTax = (() => {
  const sid = subId('evaluating-an-indirect-tax');
  return {
    id: sid,
    title: 'Evaluating an Indirect Tax',
    keyIdea: 'A tax reaches the right quantity only if it is set from the right external cost and demand responds; where demand barely responds it raises money and changes little.',
    body: [
      { type: 'paragraph', text: 'Three things decide whether a tax does what it was set to do, and all three can be argued either way, which is what makes this a good evaluation question.' },
      { type: 'paragraph', text: `**The number it is set from.** The tax has to equal the external cost, and somebody has to have measured that cost. Guess it low and the quantity stays above the optimum; guess it high and it goes below. Setting ${money(C.wrongTax)} where the truth is ${money(C.externalCost)} takes ${C.name} to ${qty(C.wrongQ)} ${C.units}, further from the optimum than doing nothing.` },
      { type: 'paragraph', text: '**How much demand responds.** If buyers have no close alternative, a tax raises the price and barely moves the quantity. The revenue is large and the behaviour is unchanged — which is a reasonable outcome if revenue was the point and a failure if it was not.' },
      { type: 'paragraph', text: '**Who ends up paying.** Where demand responds little, most of the tax reaches buyers. A tax on a necessity therefore takes a larger share of a small income than of a large one, and that is a real cost to set against the welfare recovered.' },
    ],
    realExample: { emoji: '⛽', text: 'Fuel duty is the standard case of all three at once. The external cost is genuinely hard to measure, demand in the short run responds very little, and the burden falls heavily on households who cannot change how they travel.' },
    misconception: 'Students write that a tax "puts the external cost into the price" and treat the job as done. Whether it does depends on a number somebody had to estimate. Instead: say what the tax is set at, what it would have to equal, and what happens if the two differ.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring a chain of reasoning, depth rather than breadth, and a brief assessment of the arguments. Two of these three, taken properly, beats all three listed.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each outcome by whether it strengthens or weakens the case for the tax.',
      groups: [
        { name: 'Strengthens the case', items: ['the external cost has been measured carefully', 'buyers have a close substitute available', 'the revenue is spent on the harm'] },
        { name: 'Weakens the case', items: ['the external cost is a rough guess', 'demand barely responds to price', 'the good is a necessity for poorer households'] },
      ],
      why: [
        'Each of these makes it more likely that the tax lands the quantity near the optimum, or that what it raises does further good',
        'Each of these means the tax either misses the quantity it was aimed at or does harm alongside whatever it recovers',
      ],
    }),
  };
})();

/* ══ Block 3 — Subsidies (1.3.6 · 1b-2) ════════════════════════════════════ */

const howASubsidyMovesAMarket = (() => {
  const sid = subId('how-a-subsidy-moves-a-market');
  return {
    id: sid,
    title: 'How a Subsidy Moves a Market',
    keyIdea: `A subsidy is paid to the supplier per unit, so it lowers the curve suppliers act on and the quantity rises: ${money(L.subsidy)} a ${L.unit} takes ${L.name} to ${qty(L.subsidisedQ)} ${L.units}.`,
    body: [
      { type: 'paragraph', text: `A subsidy is a tax with the sign reversed, used where a market produces **too little**. In ${L.name}, every consultation does ${money(L.externalBenefit)} of good to people who are not the patient, and none of it reaches the price.` },
      { type: 'paragraph', text: `So the demand curve shows what patients themselves will pay, and **MSB** sits ${money(L.externalBenefit)} above it. The market settles at ${qty(L.marketQ)} ${L.units} ${L.per}; the quantity worth having is ${qty(L.optimumQ)}. The gap is ${money(L.welfareGain)} ${L.per} of benefit that is available and is not being taken.` },
      { type: 'flow', steps: [
        { title: 'The government pays suppliers per unit supplied', subtitle: `${money(L.subsidy)} a ${L.unit}` },
        { title: 'Suppliers need less from the buyer for any quantity', subtitle: 'so the curve they act on falls by the subsidy' },
        { title: 'More units are worth supplying at any price', subtitle: 'and buyers move down their unchanged demand curve' },
        { title: 'The market settles at a larger quantity', subtitle: `${qty(L.subsidisedQ)} ${L.units} ${L.per}, up from ${qty(L.marketQ)}` },
      ], result: 'Quantity rises to the social optimum', resultType: 'good' },
      { type: 'paragraph', text: 'Set the subsidy at the external benefit and the quantity lands on the optimum, for the same reason a tax set at the external cost does. Both are putting into the price something the price was leaving out.' },
    ],
    realExample: { emoji: '💉', text: 'Vaccination is the clearest case. A person vaccinated is protected, and so is everybody they would have infected. Left to the price the second half counts for nothing, which is why almost no government leaves it there.' },
    misconception: 'Students say a subsidy shifts demand, because more is bought. The payment goes to the supplier, so it moves supply; the rise in quantity is a movement ALONG demand. Instead write: the subsidy lowers the curve suppliers act on, and buyers move down their unchanged demand curve to a larger quantity.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain of reasoning when explaining a reason or impact. Stage one is the payment lowering the supply curve; stage two is the quantity rising towards the optimum.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each figure by whether it is a price, a quantity, or an amount per unit.',
      groups: [
        { name: 'A price', items: [money(L.marketP) + ' before the subsidy', money(L.buyerP) + ' paid by buyers', money(L.providerP) + ' received by providers'] },
        { name: 'A quantity', items: [qty(L.marketQ) + ' ' + L.units, qty(L.subsidisedQ) + ' ' + L.units] },
        { name: 'An amount per unit', items: [money(L.subsidy) + ' a ' + L.unit, money(L.externalBenefit) + ' of benefit to others'] },
      ],
      why: [
        'Each of these is read off the vertical axis: what somebody hands over or takes home for one ' + L.unit,
        'Each of these is read off the horizontal axis: how many ' + L.units + ' change hands ' + L.per,
        'Each of these is a gap between two things on the vertical axis, so it is a rate rather than a total or a level',
      ],
    }),
  };
})();

const whatASubsidyCosts = (() => {
  const sid = subId('what-a-subsidy-costs-and-who-gains');
  return {
    id: sid,
    title: 'What It Costs, and Who Gains',
    keyIdea: `The subsidy costs ${money(L.cost)} ${L.per} and splits between the two sides the way a tax does: buyers gain ${money(L.consumerGain)} and providers ${money(L.producerGain)}.`,
    body: [
      { type: 'paragraph', text: `As with a tax there are two prices. Buyers pay **${money(L.buyerP)}**, read off demand at the new quantity. Providers receive **${money(L.providerP)}** — the ${money(L.buyerP)} from the buyer plus the ${money(L.subsidy)} from the government. The gap between the two prices is the subsidy.` },
      { type: 'paragraph', text: `The gain divides the same way the tax burden divided, and for the same reason. The price buyers pay fell by ${money(L.consumerGain)} and what providers receive rose by ${money(L.producerGain)}: two to one. Whichever side finds it harder to move away from the price gets more of it, whether the government is taking money or handing it out.` },
      { type: 'paragraph', text: `The cost is the rectangle: ${money(L.subsidy)} × ${qty(L.subsidisedQ)} = **${money(L.cost)} ${L.per}**, at the quantity supplied **after** the subsidy, because that is how many units are paid on. Note that this is money the government does not have for anything else — the **opportunity cost** — and it is the first thing a good evaluation of any subsidy reaches for.` },
      { type: 'paragraph', text: `Set that against what it buys: ${money(L.welfareGain)} ${L.per} of welfare that was available and was not being taken. The comparison is the judgement, and here it is not obviously favourable, which is exactly why it is worth making rather than assuming.` },
    ],
    realExample: { emoji: '🧮', text: 'A subsidy is one of the few interventions whose cost appears in a budget as a single line. That visibility is why subsidies are cut in a way that regulations, which cost firms rather than governments, generally are not.' },
    misconception: 'Students calculate the cost using the quantity before the subsidy. The payment is made on every unit actually supplied, which is the larger number. Instead: find the new quantity first, then multiply.',
    examMatters: 'Appendix 6 defines Calculate (2 or 4 marks, WEC11) as requiring a calculation in several stages from given data, and advises showing workings. The stages here are the new quantity, then the rectangle.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the reading of the ${money(L.subsidy)} subsidy:`,
      template: [
        `Buyers pay ${money(L.buyerP)}, read off demand at the new quantity`,
        `→ providers receive ${money(L.providerP)}: the buyer's price plus the ___`,
        `→ the cost to the government is that amount times the quantity supplied ___`,
        `→ and the money spent is not available for anything else: its ___ cost`,
      ],
      answers: ['subsidy', 'after', 'opportunity'],
      hints: ['the amount the government adds to whatever the buyer hands over', 'the word that decides whether you multiply by ' + qty(L.subsidisedQ) + ' or ' + qty(L.marketQ), 'the cost of the next best thing the money could have done'],
      distractors: ['tax', 'before', 'administrative'],
    }),
  };
})();

const evaluatingASubsidy = (() => {
  const sid = subId('evaluating-a-subsidy');
  return {
    id: sid,
    title: 'Evaluating a Subsidy',
    keyIdea: 'A subsidy is judged on whether it reaches the people it was meant for, what it costs against what else that money could do, and whether the market can be weaned off it.',
    body: [
      { type: 'paragraph', text: 'Subsidies are easy to start and hard to stop, and both halves of that sentence are evaluation points.' },
      { type: 'paragraph', text: `**Does it reach the intended people?** A subsidy on a good goes to everybody who buys it, including everybody who would have bought it anyway. Some of the ${money(L.cost)} ${L.per} buys the ${qty(L.subsidisedQ - L.marketQ)} extra ${L.units} the policy was for; the rest lowers the price of the ${qty(L.marketQ)} that were already happening.` },
      { type: 'paragraph', text: '**What else could the money do?** A subsidy competes with every other use of public money, including other interventions in this topic. Provision of information, in the next chapter but one, reaches the same quantity in this market and costs almost nothing.' },
      { type: 'paragraph', text: '**Can it be removed?** Prices settle around a subsidy: suppliers plan on it, buyers budget on it, and removing it is a price rise that people notice. A subsidy meant as a temporary correction can become a permanent line in a budget that no government finds a good moment to cut.' },
    ],
    realExample: { emoji: '🛢️', text: 'Fuel subsidies in several Asian economies, Malaysia and Indonesia among them, have been large enough to matter to the national budget and politically difficult to unwind. Both have moved towards targeting the payment at households who need it rather than at the fuel itself.' },
    misconception: 'Students argue that a subsidy is better than a tax because nobody is worse off. Everybody who pays tax is worse off, and the money had another use. Instead: name the opportunity cost of the spending, and say what it buys.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as requiring chains of reasoning with reference to context, consideration of the validity and significance of arguments, and a recognition of different viewpoints. On a subsidy, the objection to weigh is what else the money could have done.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each weakness of a subsidy to the reason it arises.',
      pairs: [
        { left: 'Much of the money changes nothing', right: 'it pays for units that would have happened anyway' },
        { left: 'Other public spending is crowded out', right: 'the money has an opportunity cost' },
        { left: 'It is hard to withdraw later', right: 'buyers and suppliers have planned around the price' },
        { left: 'Suppliers may keep part of it', right: 'the gain splits between the two sides of the market' },
      ],
      why: [
        `The payment is made on every unit supplied, and only ${qty(L.subsidisedQ - L.marketQ)} of the ${qty(L.subsidisedQ)} are new`,
        'Every dollar spent here is a dollar not spent on the next best use, and that use may have done more good',
        'A price people have arranged their lives around is a price a government finds hard to raise, whatever the original justification',
        'Who gains more depends on how easily each side can move away from the price, exactly as with a tax',
      ],
    }),
  };
})();

/* ══ Block 4 — Maximum and Minimum Prices (1.3.6 · 1b-3) ═══════════════════ */

const aMaximumPrice = (() => {
  const sid = subId('a-maximum-price');
  return {
    id: sid,
    title: 'A Maximum Price',
    keyIdea: `A maximum price is a legal ceiling that binds only if it is set below the market price, and it creates excess demand: ${money(F.maxPrice)} in ${F.name} leaves ${qty(F.demanded)} ${F.units} wanted and ${qty(F.supplied)} offered.`,
    body: [
      { type: 'paragraph', text: `${CITY}'s rental market clears at ${money(F.marketP)} a month with ${qty(F.marketQ)} ${F.units} let. Nothing is failing here in the sense of the last topic: no external cost, no external benefit. The complaint is that ${money(F.marketP)} is more than many households can pay.` },
      { type: 'paragraph', text: `So the government sets a maximum of ${money(F.maxPrice)}. It has to be **below** ${money(F.marketP)} to do anything: a maximum above the market price is a rule nobody meets.` },
      { type: 'bullets', items: [
        `At ${money(F.maxPrice)}, tenants want **${qty(F.demanded)}** ${F.units} — cheaper flats attract more people.`,
        `At ${money(F.maxPrice)}, landlords offer **${qty(F.supplied)}** — some let their property go to other uses.`,
        `The difference is **excess demand of ${qty(F.excessDemand)} ${F.units}**, and the price is no longer allowed to remove it.`,
        `${qty(F.supplied)} households pay ${money(F.saving)} a month less than before; ${qty(F.pricedOut)} who had a flat at ${money(F.marketP)} no longer have one.`,
      ] },
      { type: 'paragraph', text: 'That last line is the part students leave out. A maximum price does not only transfer money to tenants: it reduces how many flats are let, so the helped and the harmed are both tenants.' },
      { type: 'paragraph', text: 'And the excess demand has to be settled. Where price may not decide who gets a flat, something else does: waiting, who you know, or payments on the side.' },
    ],
    realExample: { emoji: '🏠', text: 'Rent controls exist in many cities and are argued about in all of them. The argument is rarely about whether they lower rents for people who hold a controlled flat; it is about how many there are and who ends up in them.' },
    misconception: 'Students say a maximum price makes a good more affordable, full stop. It lowers the price and reduces the quantity available, so it makes the good cheaper for those who get it and unavailable to some who previously did. Instead: give both numbers.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as requiring an accurately labelled diagram. Here that means two quantities at the controlled price, one off demand and one off supply, with the gap named.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the reading of the ${money(F.maxPrice)} maximum price:`,
      template: [
        `A maximum price only binds if it is set ___ the market price`,
        `→ at ${money(F.maxPrice)}, quantity demanded is ${qty(F.demanded)} and quantity supplied is ${qty(F.supplied)}`,
        `→ the gap of ${qty(F.excessDemand)} is excess ___`,
        `→ and the price is no longer allowed to ___ it`,
      ],
      answers: ['below', 'demand', 'remove'],
      hints: ['the side of the equilibrium a ceiling has to sit on to be felt', 'which of the two quantities is the larger one at the capped price', 'what a price normally does to a gap between the two quantities'],
      distractors: ['above', 'supply', 'raise'],
    }),
  };
})();

const aMinimumPrice = (() => {
  const sid = subId('a-minimum-guaranteed-price');
  return {
    id: sid,
    title: 'A Minimum (Guaranteed) Price',
    keyIdea: `A minimum price is a legal floor that binds only above the market price, and it creates excess supply: ${money(C.minPrice)} in ${C.name} leaves ${qty(C.minDemanded)} ${C.units} wanted and ${qty(C.minSupplied)} offered.`,
    body: [
      { type: 'paragraph', text: `A minimum price is the mirror image, and it binds only **above** the market price. In ${C.name} the market price is ${money(C.marketP)}; a minimum of ${money(C.minPrice)} is felt, a minimum below ${money(C.marketP)} would not be.` },
      { type: 'flow', steps: [
        { title: 'The price is fixed at a level above where the market cleared', subtitle: `${money(C.minPrice)} a ${C.unit}, against ${money(C.marketP)}` },
        { title: 'Buyers move up their demand curve and take less', subtitle: `${qty(C.minDemanded)} ${C.units}, down from ${qty(C.marketQ)}` },
        { title: 'Sellers move up their supply curve and offer more', subtitle: `${qty(C.minSupplied)} ${C.units}` },
        { title: 'The difference cannot be sold at the guaranteed price', subtitle: `excess supply of ${qty(C.minExcessSupply)} ${C.units}` },
      ], result: 'A price held up, and coal nobody has bought', resultType: 'bad' },
      { type: 'paragraph', text: `The specification calls these **guaranteed** prices, and the word explains the other half. In an agricultural market a guaranteed price is a promise: growers may sell at it, and if nobody else buys, a public agency does. The ${qty(C.minExcessSupply)} ${C.units} then have to be stored or disposed of, and that cost belongs in the evaluation.` },
      { type: 'paragraph', text: 'Two motives use one tool. A floor on a harmful good reduces consumption; a guaranteed crop price gives growers an income they can plan on. The diagram is identical; what is being judged is not.' },
    ],
    realExample: { emoji: '🌾', text: 'India announces minimum support prices for a list of crops each season and buys at them through a public agency. Growers know the floor before they plant, which is the point: the policy is aimed at the swing as much as the level.' },
    misconception: 'Students say a minimum price guarantees producers a higher income. It guarantees a higher price on what is sold, and less is sold. Whether income rises depends on how much less, and on who buys what is left.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning and diagrams where appropriate, focusing on depth rather than breadth. A chain that stops at "the price is higher" has stopped before the two quantities, which is where the analysis is.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what makes a minimum price bite, and what "guaranteed" adds:',
      template: [
        'A minimum price does nothing unless it is set ___ the market price',
        '→ the word ___ means a public agency buys what nobody else takes at it',
        '→ and the gap between the two quantities is excess ___',
      ],
      answers: ['above', 'guaranteed', 'supply'],
      hints: ['the side of the equilibrium a floor has to sit on to be felt', 'the specification\'s own word, in brackets, at 1b', 'which of the two quantities is the larger one at the floor'],
      distractors: ['below', 'indexed', 'demand'],
    }),
  };
})();

const aMinimumPriceOrATax = (() => {
  const sid = subId('a-minimum-price-or-a-tax');
  return {
    id: sid,
    title: 'A Minimum Price, or a Tax?',
    keyIdea: `A minimum price and a tax can put buyers at the same price and quantity, and the extra ${money(C.tax)} a ${C.unit} still goes to sellers under one and the government under the other.`,
    body: [
      { type: 'paragraph', text: `This is the comparison worth having in your head before any question about a harmful good, and in ${C.name} the two policies are numerically identical on the buyer's side.` },
      { type: 'bullets', items: [
        `**A ${money(C.tax)} tax**: buyers pay ${money(C.buyerP)}, sellers keep ${money(C.sellerP)}, quantity ${qty(C.taxedQ)}, and the government collects **${money(C.revenue)} ${C.per}**.`,
        `**A ${money(C.minPrice)} minimum price**: buyers pay ${money(C.minPrice)} — the same — and take the same ${qty(C.minDemanded)} ${C.units}. Sellers receive ${money(C.sellerUnderMinimum)}, which is ${money(C.tax)} more than under the tax, and the government collects **nothing**.`,
        `**And there is excess supply.** At ${money(C.minPrice)} sellers want to supply ${qty(C.minSupplied)}, so ${qty(C.minExcessSupply)} ${C.units} are offered and not sold. The tax produces no such gap.`,
      ] },
      { type: 'paragraph', text: `So on the consumption side the two are the same policy, and everywhere else they are not. The tax hands the government ${money(C.revenue)} ${C.per} it can spend on the harm; the minimum price hands the same amount to the sellers of the thing causing it.` },
      { type: 'paragraph', text: 'That is not automatically an argument for the tax. A minimum price is simpler to enforce and needs no estimate of an external cost. Which of those you weigh most heavily is the judgement.' },
    ],
    realExample: { emoji: '🥃', text: 'Where governments have set floors on alcohol prices, the extra money paid by drinkers stays with retailers and producers. That is one of the main objections raised against the policy, and it is about where the money goes.' },
    misconception: 'Students treat a minimum price and a tax as two ways of doing the same thing. They are the same for the buyer and completely different for everybody else. Instead: say who receives the extra amount per unit, and whether excess supply appears.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring a chain of reasoning, depth rather than breadth, and a brief assessment. Comparing two policies on one market is a natural chain, and the assessment is which difference matters most.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each outcome to the policy it belongs to.',
      pairs: [
        { left: `The government collects ${money(C.revenue)} ${C.per}`, right: 'revenue, which only the tax raises' },
        { left: `Sellers receive ${money(C.sellerUnderMinimum)} a ${C.unit}`, right: 'the whole price, which only the floor gives them' },
        { left: `${qty(C.minExcessSupply)} ${C.units} are offered and not sold`, right: 'excess supply, which only the floor creates' },
        { left: `Sellers keep ${money(C.sellerP)} a ${C.unit}`, right: 'what is left once the tax is taken' },
      ],
      why: [
        'The tax is collected on every unit sold, which is what gives the government something to spend on the harm',
        'A floor raises what sellers get for what they sell, and no part of the rise is taken away from them',
        'Only a price held above the clearing level produces a quantity offered that exceeds the quantity wanted',
        `What sellers keep under a tax is the buyer's price less the tax, which is ${money(C.tax)} below what the floor would have given them`,
      ],
    }),
  };
})();

const evaluatingPriceControls = (() => {
  const sid = subId('evaluating-price-controls');
  return {
    id: sid,
    title: 'Evaluating Price Controls',
    keyIdea: 'A price control fixes a price and gives up control of the quantity, so every evaluation of one is about what happens to the gap the price is no longer allowed to close.',
    body: [
      { type: 'paragraph', text: 'Both controls share one weakness: a price is how a market decides **who** gets the good. Fix it and the market still has to decide, by other means.' },
      { type: 'paragraph', text: `Under a maximum price the gap is excess demand — ${qty(F.excessDemand)} ${F.units} in ${F.name} — and it gets settled by waiting, by who applies first, by who is already known to the landlord, or by payments made outside the official price. None of those is fairer than price, and some are considerably less so.` },
      { type: 'paragraph', text: `Under a minimum price the gap is excess supply — ${qty(C.minExcessSupply)} ${C.units} — and somebody has to deal with it. If the government has guaranteed the price it buys what is left, and the storage bill is a cost of the policy that never appears on the diagram.` },
      { type: 'paragraph', text: 'Against that, both controls do something no other tool on the list does: they take effect immediately and need no estimate of an external cost. Where a government must act now and cannot measure what it would need to measure, that counts for a great deal.' },
    ],
    realExample: { emoji: '⏳', text: 'Public housing systems that let below the market rent almost all operate a waiting list, and the length of the list is the excess demand made visible. It is the clearest illustration there is that a controlled price does not remove a gap; it changes what settles it.' },
    misconception: 'Students evaluate a control by saying it helps consumers or helps producers. It helps the ones who are served and does nothing for the ones who are not. Instead: name the gap, say who is on the wrong side of it, and say what settles it.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as requiring the validity and significance of arguments to be considered, supported by chains of reasoning, with a recognition of different viewpoints. On price controls the two viewpoints are usually the served and the unserved.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each consequence by which control produces it.',
      groups: [
        { name: 'A maximum price', items: ['waiting lists form', 'fewer units are supplied than before', 'informal payments appear alongside the official price'] },
        { name: 'A minimum price', items: ['what is not sold has to be stored or disposed of', 'more units are supplied than are wanted', 'sellers receive more per unit than before'] },
      ],
      why: [
        'A price held below the clearing level leaves more buyers than units, so something other than price has to choose between them',
        'A price held above the clearing level leaves more units than buyers, so something has to be done with the difference',
      ],
    }),
  };
})();

/* ══ Block 5 — Permits, Property Rights and Regulation (1b-4, 1b-5, 1b-7) ══ */

const howAPermitSchemeWorks = (() => {
  const sid = subId('how-a-permit-scheme-works');
  return {
    id: sid,
    title: 'How a Permit Scheme Works',
    keyIdea: `Permits fix the quantity and let the price settle — the mirror image of a tax. A cap at ${qty(C.capQ)} ${C.units} puts buyers at ${money(C.capBuyerP)}, where the tax put them.`,
    body: [
      { type: 'paragraph', text: 'A permit scheme starts from the opposite end. Rather than naming a price and waiting to see what quantity results, the government names the quantity and lets the price settle.' },
      { type: 'flow', steps: [
        { title: 'The government decides how much may be emitted in total', subtitle: `enough for ${qty(C.capQ)} ${C.units} ${C.per}` },
        { title: 'That many permits are issued, and no more', subtitle: 'sold at auction, or handed to existing firms' },
        { title: 'A firm may not produce without holding a permit', subtitle: 'so supply becomes a vertical line at the cap' },
        { title: 'Firms that can cut cheaply sell their permits to firms that cannot', subtitle: 'and the permit finds a price' },
      ], result: `A fixed quantity, and a permit worth ${money(C.permitPrice)}`, resultType: 'good' },
      { type: 'paragraph', text: `Read the price off the picture. With only ${qty(C.capQ)} ${C.units} available, buyers bid up to ${money(C.capBuyerP)}, what demand says the last ${C.unit} is worth. Producing it still costs ${money(C.capCostP)}, and the gap, **${money(C.permitPrice)}**, is what a permit sells for.` },
      { type: 'paragraph', text: `And ${money(C.permitPrice)} is the tax. A tax set at the external cost and a cap set at the optimum land on the same quantity and the same buyer's price, from opposite directions. Trading makes the cap cheap to meet: cuts happen where they cost least.` },
    ],
    realExample: { emoji: '🏭', text: 'The European Union runs a permit market covering power stations and heavy industry, and China operates a national scheme for its power sector. In both, the government sets the total and the market sets what a permit is worth.' },
    misconception: 'Students say permits let rich firms pollute as much as they like. The total is fixed by the number of permits, so one firm emitting more means another emitting less. Instead: trading changes WHO cuts, never how much.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning and diagrams where appropriate. The chain here runs from a fixed number of permits, to a vertical supply curve, to a price bid up by buyers, to a permit price equal to the gap.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each outcome by whether the cap decides it or the trading decides it.',
      groups: [
        { name: 'The cap decides it', items: ['how much is emitted in total', 'how many ' + C.units + ' are produced ' + C.per, 'the price buyers end up paying'] },
        { name: 'Trading decides it', items: ['which firms make the cuts', 'what a permit is worth', 'how much the whole cut costs the industry'] },
      ],
      why: [
        'The number of permits fixes the quantity, and with demand unchanged the price follows from it — none of this is affected by who ends up holding them',
        'Trading moves the cuts to whoever can make them most cheaply and prices the right to emit, without changing the total by a single ' + C.unit,
      ],
    }),
  };
})();

const aPermitIsAPropertyRight = (() => {
  const sid = subId('a-permit-is-a-property-right');
  return {
    id: sid,
    title: 'A Permit Is a Property Right',
    keyIdea: 'Extension of property rights means giving somebody a claim over a resource that they can defend or sell, so that a cost falling outside a deal starts falling inside one.',
    body: [
      { type: 'paragraph', text: 'The specification lists **extension of property rights** as a method of intervention in its own right, and it is the one on the list that does the least and can achieve the most. The government does not set a price, a quantity or a rule. It decides **who owns what**.' },
      { type: 'paragraph', text: 'An external cost exists because somebody is affected by something they have no say over. Give them a claim over the river, or the fish in their waters, and whoever causes the harm must buy their agreement or answer for it. The cost is now inside the deal.' },
      { type: 'paragraph', text: 'A tradeable permit is exactly this. A permit is a legally protected right to emit a stated amount, which can be defended, bought and sold. That is why permits can be traded at all, and it is why these two bullets sit together.' },
      { type: 'paragraph', text: 'It works where the claim can be defined and enforced, and it does not work otherwise. Nobody can own the upper atmosphere and no court can police it, which is why this tool is used for rivers, fisheries and land, and not for the climate.' },
    ],
    realExample: { emoji: '🗺️', text: 'Land titling programmes in several countries register ownership of plots that were farmed without formal title. A registered owner can be compensated when the land is damaged, borrow against it, and has a reason to look after it — none of which was true when nobody held a defensible claim.' },
    misconception: 'Students treat property rights as a legal detail rather than an intervention. Assigning a right changes who has to pay whom, and therefore what gets produced. Instead: say who is given the claim and what they can now do with it.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain when explaining a reason or impact. Stage one is the claim being assigned; stage two is the cost now entering somebody\'s calculation who was previously ignoring it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what extending property rights does:',
      template: [
        'Somebody is given a ___ over a resource that they can defend or sell',
        '→ so a cost that fell ___ the deal now falls inside one',
        '→ and a tradeable permit is one, which is why it can be ___',
      ],
      answers: ['claim', 'outside', 'traded'],
      hints: ['what ownership actually consists of: something you can assert against other people', 'where an external cost falls, by definition', 'what a right you hold can be done with, and a rule you obey cannot'],
      distractors: ['price', 'inside', 'enforced'],
    }),
  };
})();

const regulation = (() => {
  const sid = subId('regulation');
  return {
    id: sid,
    title: 'Regulation',
    keyIdea: 'Regulation is a rule, a limit or a standard backed by enforcement: it can reach the same quantity as a tax or a cap, but everybody has to meet it in the same way.',
    body: [
      { type: 'paragraph', text: 'Regulation is the most used method on the list and the least interesting to draw, because it does not work through the price at all. A rule says what may or may not be done, and a penalty makes it stick.' },
      { type: 'bullets', items: [
        '**A limit** — no more than this much may be emitted, sold or built.',
        '**A standard** — anything sold must meet this specification.',
        '**A ban** — this may not be done at all.',
        '**A requirement** — this must be disclosed, fitted or tested.',
      ] },
      { type: 'paragraph', text: `Any of these can reach the ${qty(C.optimumQ)} ${C.units} a tax or a cap reaches. What is different is that a rule applies the same way to every firm, so the cuts do not go to whoever can make them most cheaply. A cap with trading finds that firm automatically; a rule does not look for it.` },
      { type: 'paragraph', text: 'Against that, a rule is quick, it is understood by people who have never heard of an external cost, and for some problems it is the only sensible tool. Nobody proposes a tax on unsafe wiring set at the expected cost of the fires.' },
    ],
    realExample: { emoji: '📋', text: 'Vehicle emissions standards are regulation in its purest form: a car may not be sold unless it meets the limit, whatever the manufacturer would have preferred to build and whatever buyers would have preferred to pay.' },
    misconception: 'Students treat regulation as the weak option compared with a market tool. It is the right tool wherever the harm is large, the behaviour is clear-cut, and nobody should be able to buy their way out of it. Instead: say what the rule targets and why a price would be the wrong instrument here.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring a chain of reasoning, depth rather than breadth, and a brief assessment. Comparing a rule with a price on the same problem is a chain; the assessment is when each is right.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each form of regulation to what it does.',
      pairs: [
        { left: 'No more than this much may be emitted', right: 'a limit' },
        { left: 'Anything sold must meet this specification', right: 'a standard' },
        { left: 'This may not be done at all', right: 'a ban' },
        { left: 'This must be disclosed before sale', right: 'a requirement' },
      ],
      why: [
        'A limit names a quantity and stops there, leaving the firm to decide how to stay under it',
        'A standard names a property the product must have, so it constrains what is made rather than how much',
        'A ban removes the choice altogether, which is the right instrument where no amount of the activity is acceptable',
        'A requirement compels an action rather than forbidding one, and is often about what the buyer gets to know',
      ],
    }),
  };
})();

const evaluatingPermitsRightsAndRules = (() => {
  const sid = subId('evaluating-permits-rights-and-rules');
  return {
    id: sid,
    title: 'Evaluating Permits, Rights and Rules',
    keyIdea: 'All three set a quantity or a rule rather than a price, so all three need the government to know a number a tax does not, and all three have to be monitored and enforced.',
    body: [
      { type: 'paragraph', text: 'These three share a weakness that the price-based tools do not have, and it is worth naming precisely because it is where a 14- or 20-mark answer finds its judgement.' },
      { type: 'paragraph', text: `**A tax can be adjusted; a quantity cannot be approximately right.** If a tax is set a little low, the quantity is a little too high and the tax can be raised. A cap set in the wrong place is simply in the wrong place: the government has to know the optimal quantity is ${qty(C.optimumQ)} ${C.units} before it issues a single permit.` },
      { type: 'paragraph', text: '**Somebody has to watch.** A permit scheme needs emissions measured, a property right needs courts that work, and a rule needs inspections. All three cost money that never appears on the diagram, and all three fail quietly if the monitoring is weak.' },
      { type: 'paragraph', text: '**Who gets the rights matters enormously.** Permits sold at auction raise revenue for the government; permits handed to existing firms hand them the same amount instead. The quantity is identical either way, and the distribution is not.' },
    ],
    realExample: { emoji: '🔍', text: 'Permit markets generally require firms to report emissions and to have those reports checked by an outside auditor. That machinery is a real cost of the scheme, and it exists because a scheme without it would be a set of promises.' },
    misconception: 'Students say a cap is better than a tax because it guarantees the outcome. It guarantees the quantity only if the government picked the right one and can enforce it. Instead: say what the government has to know, and what happens if it is wrong.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as requiring multi-stage chains of reasoning with reference to context and informed judgements. A judgement between a tax and a cap usually turns on which fact is easier to establish, not on which diagram is neater.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it favours a tax or a cap with tradeable permits.',
      groups: [
        { name: 'Favours a tax', items: ['the right quantity is not known', 'the rate can be adjusted after seeing the effect', 'emissions cannot be measured firm by firm'] },
        { name: 'Favours a cap', items: ['a definite total must not be exceeded', 'the cost of cutting varies a lot between firms', 'the revenue from auctioning is wanted up front'] },
      ],
      why: [
        'A tax names a price and tolerates being slightly wrong, so it suits a problem where the target quantity is uncertain or unenforceable',
        'A cap names the quantity and makes trading do the rest, so it suits a problem with a hard total and cheap cuts hiding somewhere in the industry',
      ],
    }),
  };
})();

/* ══ Block 6 — State Provision and Information (1b-6, 1b-8) ════════════════ */

const stateProvision = (() => {
  const sid = subId('state-provision');
  return {
    id: sid,
    title: 'State Provision',
    keyIdea: 'State provision takes the good out of the market: the government supplies it and funds it from taxation, so the quantity is set by a budget rather than by a price.',
    body: [
      { type: 'paragraph', text: 'Every other method so far has left the market to do the supplying and changed the conditions it works under. State provision does not. The government becomes the supplier, and what buyers pay at the point of use can be anything, including nothing.' },
      { type: 'paragraph', text: 'That changes what decides the quantity. In a market the quantity is where demand meets supply. Under state provision it is whatever the budget pays for, and if the free price attracts more demand than the budget supplies, something other than price has to ration it — the same problem a maximum price has, for the same reason.' },
      { type: 'paragraph', text: `Set against the subsidy, the difference is who is reached. A ${money(L.subsidy)} subsidy lowers the price to ${money(L.buyerP)}, which still excludes anybody who cannot find ${money(L.buyerP)}. Provision at no charge excludes nobody on price — a strong case wherever those who most need the good can least pay.` },
      { type: 'paragraph', text: 'The case against is that a supplier with no competitor and no price to read has less to tell it what to produce and less pressure to produce it cheaply. Both halves are arguable, which is why this is a standard evaluation question.' },
    ],
    realExample: { emoji: '🏫', text: 'Sri Lanka has provided schooling free at the point of use for generations, and its literacy rate has long been among the highest in its income group. Hong Kong houses a large share of its population in public rental flats let well below the market rent.' },
    misconception: 'Students say state provision makes a good free. It makes it free at the point of use and paid for out of taxation; somebody pays, and the quantity is limited by how much. Instead: say who pays and what sets the quantity.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as requiring students to give the meaning of a term. State provision is the government supplying a good directly and funding it from taxation, rather than paying somebody else to supply it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what state provision does:',
      template: [
        'The government supplies the good ___ rather than changing the market',
        '→ it is funded from ___, so the price at the point of use can be nothing',
        '→ and the quantity is set by a ___ rather than by a price',
      ],
      answers: ['itself', 'taxation', 'budget'],
      hints: ['the word that separates this from a subsidy, where somebody else still supplies it', 'where the money comes from when the user is not paying', 'what decides how much there is when the price no longer does'],
      distractors: ['cheaply', 'borrowing', 'market'],
    }),
  };
})();

const provisionOfInformation = (() => {
  const sid = subId('provision-of-information');
  return {
    id: sid,
    title: 'Provision of Information',
    keyIdea: `Provision of information moves demand rather than paying for anything, and takes ${L.name} to ${qty(meet(L.msb, L.mpc))} ${L.units} with nothing spent on the good.`,
    body: [
      { type: 'paragraph', text: `Some markets produce the wrong quantity because one side does not know something. The last topic calls that an **information gap**, and where the gap is the whole problem, closing it is the whole solution.` },
      { type: 'flow', steps: [
        { title: 'Buyers are not aware of a benefit or a cost', subtitle: `in ${L.name}, the ${money(L.externalBenefit)} that a check-up saves everybody else` },
        { title: 'The government publishes what is known', subtitle: 'a campaign, a label, a required disclosure' },
        { title: 'Buyers value the good more highly than before', subtitle: 'so the demand curve shifts to the right' },
        { title: 'The market settles at a larger quantity on its own', subtitle: `${qty(meet(L.msb, L.mpc))} ${L.units} ${L.per}, at ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))}` },
      ], result: 'The optimum reached, with nothing spent on the good', resultType: 'good' },
      { type: 'paragraph', text: `Compare that with the subsidy. Both land on ${qty(L.subsidisedQ)} ${L.units}. Under the subsidy buyers pay ${money(L.buyerP)} and the government pays ${money(L.cost)} ${L.per}; under information buyers pay ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))} and the government pays for a campaign. Information is cheaper and asks more of the buyer.` },
      { type: 'paragraph', text: 'It works only if the gap really was information. If people know and still do not act, demand does not move and the money is gone. That is the honest limit of the tool.' },
    ],
    realExample: { emoji: '🏷️', text: 'Required labelling is the most common form: energy ratings on appliances, nutrition panels on food, fuel consumption on new cars. In each case the government supplies no good and pays for no purchase; it requires a fact to be visible at the moment of choosing.' },
    misconception: 'Students treat an information campaign as a weaker version of a subsidy. It is a different tool: it moves demand, where a subsidy moves supply, and it reaches the optimum with buyers paying MORE rather than less. Instead: say which curve moves, and why.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning and diagrams where appropriate. The chain here is short and must be complete: information closes the gap, demand shifts right, the quantity rises without a payment.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each method you have met so far to the curve it moves.',
      pairs: [
        { left: 'An indirect tax', right: 'supply, upward' },
        { left: 'A subsidy', right: 'supply, downward' },
        { left: 'Provision of information', right: 'demand, to the right' },
        { left: 'A maximum price', right: 'neither — it fixes the price instead' },
      ],
      why: [
        'The tax is collected from the seller, so it raises the price needed to bring any quantity forward',
        'The payment goes to the supplier, so it lowers the price they need from the buyer',
        'Nothing is paid and nothing is supplied: what changes is what buyers know, and therefore what they will pay',
        'A control names a price by law and lets the two quantities fall where they fall, so no curve moves at all',
      ],
    }),
  };
})();

const evaluatingProvision = (() => {
  const sid = subId('evaluating-provision');
  return {
    id: sid,
    title: 'Evaluating Provision',
    keyIdea: 'State provision reaches everybody and costs a budget; information costs almost nothing and reaches only people who will act on it.',
    body: [
      { type: 'paragraph', text: 'These two sit at opposite ends of the same question: how much does the government do itself, and how much does it leave to the market once the market knows what it is doing?' },
      { type: 'paragraph', text: '**State provision reaches people nothing else reaches.** A household with no money is served by a free clinic and by nothing else on this list — not by a subsidy, which still leaves a price, and not by a campaign, which tells them about something they cannot buy. Where the failure is that people cannot pay, provision is the only tool that meets it directly.' },
      { type: 'paragraph', text: '**And it has to be paid for and rationed.** The budget sets the quantity, taxation pays for it, and where free access attracts more demand than the budget supplies, waiting does the rationing.' },
      { type: 'paragraph', text: `**Information is the cheapest tool on the whole list and the least reliable.** When it works it reaches the optimum for the cost of a campaign, as ${L.name} does. When the gap was not information, it changes nothing and the money is gone. Its usual place in an answer is alongside another tool rather than instead of one.` },
    ],
    realExample: { emoji: '🚭', text: 'Anti-smoking policy is almost never information alone. Countries that have reduced smoking most have combined required warnings and campaigns with taxation and with rules about where smoking is allowed — three tools from this list working on the same market at once.' },
    misconception: 'Students choose one tool and defend it. Real policy usually uses several, and saying which combination and why is a stronger answer than defending a single instrument. Instead: name the tools, say what each does that the others cannot, and judge the combination.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as requiring chains of reasoning with reference to context and a recognition of different viewpoints. On provision the viewpoints are usually the taxpayer and the person who cannot pay.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each situation to the tool that fits it best.',
      pairs: [
        { left: 'People cannot afford the good at any market price', right: 'state provision' },
        { left: 'People could afford it and do not know it helps them', right: 'provision of information' },
        { left: 'People know and can afford it, and still buy too little', right: 'a subsidy' },
        { left: 'People know, and the harm falls on everybody else', right: 'an indirect tax' },
      ],
      why: [
        'Nothing that leaves a price attached reaches somebody with no money, which is what makes provision the only fit',
        'The gap is knowledge, so the cheapest correction is to close it and let the market do the rest',
        'The gap is neither money nor knowledge but the benefit landing on other people, so the price has to be lowered',
        'The problem is a cost the price does not carry, and a tax is the tool that puts it there',
      ],
    }),
  };
})();

/* ══ Block 7 — Where Governments Intervene (1.3.6 · 1c) ════════════════════ */
/*
 * The March section taught none of 1c's eight as a context: commodities were absent entirely
 * (`specGap-09`), energy was named once and never explained (`specThin-01`), and the others appeared
 * only as the country an example came from. 1c is the list of settings the paper's extract may come
 * from, so it is taught as recognition — which failure is in front of you — and closed by the
 * comparison `specGap-05` asks for.
 */

const healthEducationAndHousing = (() => {
  const sid = subId('health-education-and-housing');
  return {
    id: sid,
    title: 'Health, Education and Housing',
    keyIdea: 'Health and education are under-consumed because much of the benefit falls on other people. Housing is different: the quantity may be right and the price still out of reach.',
    body: [
      { type: 'paragraph', text: 'The specification lists eight contexts in which governments may intervene. Being able to say what usually goes wrong in each one is worth more than another policy definition, because the extract in front of you will be set in one of them.' },
      { type: 'paragraph', text: `**Health.** An illness treated early is an illness not passed on, so the benefit of a consultation is partly other people's. Markets therefore under-supply it, as ${L.name} does at ${qty(L.marketQ)} ${L.units} against an optimum of ${qty(L.optimumQ)}. Subsidies, state provision and information are all used, usually together.` },
      { type: 'paragraph', text: '**Education.** The same shape, over a longer period. A person who is educated earns more, and the people around them are more productive too — and the benefit arrives decades after the cost, which is a second reason a market under-supplies it. State provision is the most common answer.' },
      { type: 'paragraph', text: `**Housing.** The odd one out, and worth noticing. There may be no external cost and no external benefit at all: the market may be building and letting exactly the right number of ${F.units} at a price a lot of households cannot reach. That is a distribution problem rather than a 1.3.5 problem, and the tools reached for are maximum prices and state provision.` },
    ],
    realExample: { emoji: '🏘️', text: 'Hong Kong intervenes in all three at once: heavily subsidised public healthcare, free compulsory schooling, and public rental housing for a large share of the population. The three interventions are aimed at three different problems.' },
    misconception: 'Students answer "market failure" to every context, including housing. Where nothing is failing in the 1.3.5 sense there is no welfare triangle to recover, and the case for intervening has to be made on other grounds. Instead: say which of the two kinds of problem you are looking at.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring knowledge, understanding and application. Application here means naming the context and what goes wrong in it, not restating the definition of an externality.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each context by the kind of problem a government is usually responding to.',
      groups: [
        { name: 'A benefit the price leaves out', items: ['health', 'education'] },
        { name: 'A price out of reach', items: ['housing', 'a staple food after a poor harvest'] },
      ],
      why: [
        'In both of these the buyer gains, and so do people who are not part of the transaction, so the market quantity is below the optimum',
        'Here the quantity may be right and the price may still be unaffordable, which is a different problem needing a different justification',
      ],
    }),
  };
})();

const transportEnvironmentAndEnergy = (() => {
  const sid = subId('transport-environment-and-energy');
  return {
    id: sid,
    title: 'Transport, Environment and Energy',
    keyIdea: 'These three are the cost side of the list: congestion, emissions and fuel all put costs on people outside the transaction, so the market produces too much.',
    body: [
      { type: 'paragraph', text: 'Where health and education are markets producing too little, these three are markets producing too much, and the tools are the ones that raise a price or cap a quantity.' },
      { type: 'paragraph', text: '**Transport.** Every additional vehicle adds to the time everyone else spends in traffic and to what everyone else breathes. Neither cost reaches the driver. Governments charge for road use, limit the number of vehicles, and provide public transport directly.' },
      { type: 'paragraph', text: `**Environment.** The purest case of an external cost of production, and the one ${C.name} is drawn from: ${money(C.externalCost)} a ${C.unit} falling on people who buy no ${C.good}. Taxes, permits and the extension of property rights are all used here, and permits are used here more than anywhere else.` },
      { type: 'paragraph', text: '**Energy.** Both directions at once, which is what makes it the hardest of the eight. Fossil fuels carry external costs, so the case is for taxing them. Energy is also a necessity whose price hits poorer households hardest, so the political pressure is to subsidise it. Many governments have done both to different fuels in the same year.' },
    ],
    realExample: { emoji: '🚗', text: 'Singapore requires a certificate, limited in number and sold at auction, before a vehicle can be registered. It is a permit scheme applied to congestion rather than to emissions: the government fixes the quantity of vehicles and lets bidding set what the right to own one costs.' },
    misconception: 'Students treat energy as a straightforward case for a tax. It is the context where the external cost argument and the affordability argument point in opposite directions, which is why it makes good exam material. Instead: name both pressures and say which you weigh more heavily.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring a chain of reasoning, depth rather than breadth, and a brief assessment of the arguments. Energy is a context where two chains genuinely conflict, and the assessment is the point of the question.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each context to the intervention most associated with it.',
      pairs: [
        { left: 'Vehicles competing for limited road space', right: 'a limit on the number of vehicles' },
        { left: 'Emissions from heavy industry', right: 'tradeable pollution permits' },
        { left: 'A fuel whose price hits poorer households hardest', right: 'a subsidy, or a payment to those households' },
        { left: 'A river a factory discharges into', right: 'extension of property rights' },
      ],
      why: [
        'The harm rises with the number of vehicles, so fixing that number attacks the cost directly',
        'The total matters more than where the cuts happen, and the cuts are far cheaper for some firms than others',
        'The problem here is not that too much is used but that the price is out of reach, so the answer is about money rather than quantity',
        'A defensible claim over the water turns a cost falling on others into a cost the factory has to settle',
      ],
    }),
  };
})();

const agricultureAndCommodities = (() => {
  const sid = subId('agriculture-and-commodities');
  return {
    id: sid,
    title: 'Agriculture and Commodities',
    keyIdea: 'In agricultural and commodity markets the problem is usually how far the price swings rather than where it sits, and the tool reached for is a guaranteed minimum price.',
    body: [
      { type: 'paragraph', text: 'The last two contexts go together, because one feature causes trouble in both. Supply cannot be adjusted quickly: a crop is planted months before it is sold. Demand for a staple barely moves with price.' },
      { type: 'paragraph', text: 'Put an inflexible supply beside an unresponsive demand and a small change in the harvest produces a large change in the price. A good year can pay a grower less than a bad one. A bad year can put a staple out of reach of the people who eat it.' },
      { type: 'paragraph', text: 'So the tool is usually a **guaranteed minimum price**, announced before planting: growers may sell at that price, and a public agency buys whatever is not sold at it. What it buys is the excess supply the floor creates, and storing or disposing of that is a cost of the policy — as is the risk of holding the price above what the crop is worth year after year.' },
      { type: 'paragraph', text: 'Governments also hold reserves of staple grains and fuel, and restrict exports when domestic prices spike. Both hold a domestic price below the world price, at the expense of the growers selling into it.' },
    ],
    realExample: { emoji: '🌾', text: 'India announces minimum support prices for a list of crops ahead of each season and procures at them through a public agency, so a grower knows the floor before deciding what to plant. Several governments restricted grain exports when world prices spiked, protecting domestic buyers and costing domestic sellers.' },
    misconception: 'Students say a guaranteed price raises farmers\' incomes. It raises the price of what is sold, and it produces more than buyers want at that price. Whether income rises depends on how much is bought, and by whom. Instead: say who buys the difference.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning, with any relevant data interpreted. Where the data is a series of prices, the chain starts from why they move so far.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete why commodity prices swing so far:',
      template: [
        'Supply cannot be adjusted ___, because the crop was planted months ago',
        '→ demand for a staple barely responds to the ___ being asked',
        '→ so a small change in the harvest produces a ___ swing',
      ],
      answers: ['quickly', 'price', 'large'],
      hints: ['the thing a grower cannot do once the seed is in the ground', 'the variable demand is unresponsive to, which is what makes the swing big', 'the size of the price move that follows from both curves being steep'],
      distractors: ['cheaply', 'harvest', 'small'],
    }),
  };
})();

const choosingTheTool = (() => {
  const sid = subId('choosing-the-tool-for-the-failure');
  return {
    id: sid,
    title: 'Choosing the Tool',
    keyIdea: 'Every tool needs the government to know something before it can be set, so the real question is not which tool is best but which fact can actually be established.',
    body: [
      { type: 'paragraph', text: 'At 14 and 20 marks the command words require a judgement, not a definition: whether a subsidy was the right choice here, which means comparing it with the alternatives on the same market.' },
      { type: 'paragraph', text: 'The column that decides it is usually the one nobody writes down.' },
      { type: 'bullets', items: [
        `**A tax** needs the external cost. Get it wrong by ${money(C.wrongTax - C.externalCost)} a ${C.unit} in ${C.name} and the quantity lands at ${qty(C.wrongQ)} ${C.units} — as far below the optimum as the free market was above it.`,
        '**A cap** needs the right quantity, exactly, before a single permit is issued.',
        '**A maximum price** needs to know who is being priced out, and accepts excess demand as the cost of helping them.',
        '**A subsidy** needs the external benefit, and a budget.',
        '**Information** needs the gap to be knowledge and nothing else.',
      ] },
      { type: 'paragraph', text: 'So the ordering runs: what is failing, which tools address it, what does each need known, and which of those can this government establish? A judgement built that way has already answered the objection that another tool was better.' },
      { type: 'paragraph', text: 'And it leads into the last chapter: a tool set from a fact nobody had is how an intervention leaves a market worse.' },
    ],
    realExample: { emoji: '🧭', text: 'Governments facing the same problem in different countries frequently pick different tools, and the difference is usually administrative rather than economic: what can be measured, what can be collected, and what can be enforced.' },
    misconception: 'Students compare tools by listing advantages and disadvantages of each. That produces two lists and no comparison. Instead: pick the market, say what each tool would need to be set from, and judge on which of those is knowable.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as requiring multi-stage chains of reasoning with reference to context, recognition of different viewpoints, and informed judgements. Comparing what two tools require is a chain; saying which requirement this government can meet is the judgement.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four questions in the order you would work through them, from naming the failure to reaching a judgement.',
      correctOrder: [
        'Name what is failing, and which way the quantity is wrong',
        'List the tools from 1b that act on that kind of failure',
        'Say what each of those needs the government to know',
        'Judge on which of those facts can actually be established here',
      ],
      why: [
        'A tool that raises quantity is useless where quantity is already too high, so the failure has to be named before anything is selected',
        'Only some of the eight act on any given failure, and narrowing to those is what keeps an answer from becoming a list',
        'This is the column that separates the tools once they all point the same way',
        'The tool whose requirement this government can meet is the one that will actually work, and saying so is the judgement',
      ],
    }),
  };
})();

/* ══ Block 8 — Government Failure (1.3.6 · 2a, 2b) ═════════════════════════ */
/*
 * ONE SUBSECTION PER SPEC BULLET. `specGap-01` exists because the causes were skimped: two of the
 * five were taught, two that belong to Unit 3 were taught in their place, and excessive
 * administrative costs appeared only in passing. A bullet each is the answer to that, and it is why
 * this chapter is six subsections where the others are three or four.
 */

const whatGovernmentFailureIs = (() => {
  const sid = subId('what-government-failure-is');
  return {
    id: sid,
    title: 'What Government Failure Is',
    keyIdea: 'Government failure is intervention that results in a net welfare loss: the intervention costs society more than the market failure it was aimed at.',
    body: [
      { type: 'paragraph', text: 'The specification defines it in one line, and the line is a measurement rather than a complaint: **government failure is intervention that results in a net welfare loss**. Not intervention that is unpopular, not intervention that is expensive, and not intervention that fails to fix everything.' },
      { type: 'paragraph', text: `The word doing the work is **net**. The intervention has to be weighed against what would have happened without it. In ${C.name} the free market loses ${money(C.welfareLoss)} ${C.per}. An intervention that recovers ${money(C.welfareLoss)} and costs less than that to run is a success even if people dislike it; one that recovers less than it costs is a failure even if everybody approves.` },
      { type: 'paragraph', text: `Here is the clearest case, and it is arithmetic. Set the tax at ${money(C.wrongTax)} a ${C.unit} when the external cost is ${money(C.externalCost)}. Quantity falls to ${qty(C.wrongQ)} ${C.units} — ${qty(C.optimumQ - C.wrongQ)} **below** the optimum of ${qty(C.optimumQ)}, exactly as far as the free market was above it. The welfare loss is ${money(C.wrongLoss)} ${C.per}: the same number as before the government did anything.` },
      { type: 'paragraph', text: 'The intervention moved the loss instead of removing it, and it costs something to administer. That is a net welfare loss, and nobody was corrupt or lazy. One number was wrong.' },
    ],
    realExample: { emoji: '📉', text: 'The hardest thing about identifying government failure in practice is that the comparison is with something that did not happen. Nobody observes the market that would have existed without the policy, which is why the argument about any particular intervention is rarely settled.' },
    misconception: 'Students use "government failure" for any intervention with a drawback. Every intervention has drawbacks; failure means the drawbacks outweigh what was gained. Instead write: intervention that results in a net welfare loss, and say what is on each side of the comparison.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as requiring students to give the meaning of a term, concept or phrase. For government failure that means the net welfare loss, not a list of things governments do badly.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition this chapter opens with:',
      template: [
        'Government failure is ___ that results in',
        '→ a ___ welfare loss',
        '→ which means it is judged against what would have happened ___ it',
      ],
      answers: ['intervention', 'net', 'without'],
      hints: ['the thing being judged: not a market, and not a policy that was never introduced', 'the word that makes this a comparison rather than a cost', 'the comparison the word "net" forces you to make'],
      distractors: ['regulation', 'total', 'after'],
    }),
  };
})();

const informationGaps = (() => {
  const sid = subId('information-gaps');
  return {
    id: sid,
    title: 'Information Gaps',
    keyIdea: 'Every tool in this topic has to be set from a number, and a government that does not have that number sets the tool in the wrong place.',
    body: [
      { type: 'paragraph', text: 'The first cause the specification lists is the one that produced the overshoot in the last subsection. A government intervening needs to know something it usually cannot observe directly.' },
      { type: 'flow', steps: [
        { title: 'The policy has to be set from a number', subtitle: 'an external cost, an optimal quantity, a benefit per unit' },
        { title: 'That number cannot be read off anywhere', subtitle: 'it has to be estimated, and estimates have ranges' },
        { title: 'The tool is set from the estimate', subtitle: `a tax of ${money(C.wrongTax)} where the truth was ${money(C.externalCost)}` },
        { title: 'The quantity lands somewhere other than the optimum', subtitle: `${qty(C.wrongQ)} ${C.units}, and the loss is back` },
      ], result: 'A welfare loss produced by the correction', resultType: 'bad' },
      { type: 'paragraph', text: 'And the gap is not always about the number. A government may not know how a market will respond, which firms can cut most cheaply, or who is actually served by a subsidy. All of those are information gaps in the sense 2b means, and all of them put a tool in the wrong place.' },
      { type: 'paragraph', text: 'Notice that this is the same failure the last topic listed on the market\'s side. Information gaps make markets produce the wrong quantity; they make governments correct by the wrong amount. Being a government confers no advantage here.' },
    ],
    realExample: { emoji: '📊', text: 'Estimating the external cost of an activity means valuing things nobody buys and sells: an hour of somebody\'s time, a stretch of river, a change in the risk of illness. Serious estimates of the same external cost frequently differ by a factor of several.' },
    misconception: 'Students treat an information gap as the government not doing its research. Usually the number does not exist to be found: it is an estimate of something nobody trades. Instead: say what would have to be known and why it is hard to establish.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain of reasoning when explaining a reason or impact. Stage one is the missing number; stage two is where the quantity lands because of it.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Information gaps appear on both sides of this topic. Sort each one by whose gap it is.',
      groups: [
        { name: 'A gap the MARKET has', items: ['a buyer cannot see what a used car has had done to it', 'a patient cannot judge the treatment they are offered'] },
        { name: 'A gap the GOVERNMENT has', items: ['nobody has measured what a ' + C.unit + ' of ' + C.good + ' costs the neighbours', 'which firms could cut most cheaply is not known', 'who a subsidy actually reaches is not tracked'] },
      ],
      why: [
        'This is the source of market failure in the previous topic: one side of a transaction knows something the other needs',
        'This is the first cause at 2b: the tool has to be set from a figure nobody can observe, so it is set from an estimate and lands away from the optimum',
      ],
    }),
  };
})();

const lackOfIncentives = (() => {
  const sid = subId('lack-of-incentives');
  return {
    id: sid,
    title: 'Lack of Incentives',
    keyIdea: 'A supplier who need not win customers and cannot keep a saving has less reason to control costs, so a state-supplied good may cost more to produce than the same good in a market.',
    body: [
      { type: 'paragraph', text: 'The second cause is about what happens to costs when the pressure that normally holds them down is absent.' },
      { type: 'paragraph', text: 'A firm in a market keeps what it saves and loses customers if its price drifts above its rivals\'. Both of those are reasons to look for savings. A state provider has neither: there are no rivals to lose customers to, and a saving usually goes back to the budget rather than staying with the department that found it.' },
      { type: 'paragraph', text: 'So the same good may cost more to produce under state provision than it would have cost in a market, and that extra cost is a welfare loss in its own right — resources used up producing something that could have been produced with fewer. It is a cost of the intervention that the diagram of the intervention does not show.' },
      { type: 'paragraph', text: 'This is an argument about degree, not villains: the pressure that would have found the saving is simply absent. Set it against what provision achieves — reaching people no priced tool reaches.' },
    ],
    realExample: { emoji: '🧾', text: 'Governments that contract firms to run a public service are importing this pressure: a contract that can be lost at renewal supplies the incentive a permanent department lacks. Whether it does depends on whether losing it is a real possibility.' },
    misconception: 'Students argue that state providers are inefficient because the people working in them do not try. The argument has nothing to do with effort; it is about which savings anybody has a reason to look for. Instead: name the pressure that is missing and say what it would otherwise have done.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring a chain of reasoning, depth rather than breadth, and a brief assessment of the arguments. This cause is a chain about incentives, and the assessment is what it is worth against the access provision buys.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of a market to the pressure it creates on costs.',
      pairs: [
        { left: 'A rival offering the same good more cheaply', right: 'customers leave unless costs are controlled' },
        { left: 'A saving that stays with whoever found it', right: 'somebody has a reason to look for it' },
        { left: 'No rival and no customer who can leave', right: 'nothing punishes a cost that drifts upward' },
        { left: 'A saving that returns to a central budget', right: 'nobody gains by finding it' },
      ],
      why: [
        'The threat of losing buyers is what makes a cost that is out of line expensive to the firm carrying it',
        'Keeping what you save is the direct reward that makes searching for savings worth the effort',
        'Without either the threat or the reward, a rising cost has no consequence for the people in a position to notice it',
        'A saving that is taken away is a saving nobody in the department is better off for having made',
      ],
    }),
  };
})();

const unintendedConsequences = (() => {
  const sid = subId('unintended-consequences');
  return {
    id: sid,
    title: 'Unintended Consequences',
    keyIdea: 'People respond to an intervention, and what they do next is often the thing that undoes it: a price that is not allowed to ration is rationed some other way.',
    body: [
      { type: 'paragraph', text: 'The third cause is the one that catches well-designed policies. A market is people, and people respond to a change in the rules by doing something the rules did not anticipate.' },
      { type: 'paragraph', text: `The maximum price in ${F.name} is the standard case. Excess demand of ${qty(F.excessDemand)} ${F.units} does not evaporate because the price is not allowed to remove it. It is settled by waiting, by who is known to the landlord, by a payment made outside the official rent, or by the property being let for something other than housing. None of those was the intention and all of them follow from it.` },
      { type: 'paragraph', text: 'A minimum price does the same on the other side. Sellers offer more than is wanted, and if a government has guaranteed the price it now owns a quantity it did not want to buy, with a storage bill nobody costed.' },
      { type: 'paragraph', text: 'The general form is worth holding on to: **an intervention changes what it is worth doing, and people then do it**. An answer that predicts one of those responses before naming the drawback is doing the analysis the question wants.' },
    ],
    realExample: { emoji: '🚪', text: 'Where rents are controlled, landlords quite often find other uses for a property — selling it, letting it to visitors by the night, or leaving it empty. Each of those reduces the stock of rented housing further, which is the opposite of what the control was for.' },
    misconception: 'Students list unintended consequences as a risk without saying what the response would be. The mark is in the mechanism. Instead: name who responds, what they do, and why the policy gave them a reason to do it.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning and depth rather than breadth. One consequence traced properly from the incentive that produced it is worth more than four named.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each response by the policy that produced it.',
      groups: [
        { name: 'A maximum price', items: ['waiting lists form for the good', 'landlords find other uses for the property', 'payments are made outside the official price'] },
        { name: 'A guaranteed minimum price', items: ['more is produced than buyers want', 'a public agency ends up storing what it bought', 'growers plant more of the supported crop than before'] },
      ],
      why: [
        'Holding a price below the clearing level leaves more buyers than units, and everything here is a way that gap gets settled',
        'Holding a price above the clearing level leaves more units than buyers, and everything here follows from somebody having to take them',
      ],
    }),
  };
})();

const excessiveAdministrativeCosts = (() => {
  const sid = subId('excessive-administrative-costs');
  return {
    id: sid,
    title: 'Excessive Administrative Costs',
    keyIdea: 'Designing, administering, monitoring and enforcing an intervention costs money, and where that exceeds the welfare recovered it is a net loss whatever the quantity does.',
    body: [
      { type: 'paragraph', text: 'The fourth cause is the simplest and the most often left out of an answer, because it is the one part of an intervention that never appears on the diagram.' },
      { type: 'paragraph', text: `In ${C.name} the whole prize is ${money(C.welfareLoss)} ${C.per}. That is the ceiling on what any intervention here can be worth. A permit scheme that requires every firm's emissions to be measured, reported and audited could easily cost more than that to run — and if it does, it is a net welfare loss even when it puts the quantity exactly on ${qty(C.optimumQ)} ${C.units}.` },
      { type: 'bullets', items: [
        '**Designing it** — establishing the number the tool is set from.',
        '**Administering it** — collecting a tax, paying a subsidy, issuing permits.',
        '**Monitoring it** — measuring what is actually happening.',
        '**Enforcing it** — inspecting, prosecuting, and dealing with avoidance.',
      ] },
      { type: 'paragraph', text: 'Which is why the tools differ so much in practice. A tax uses machinery a government already has. A permit scheme needs measurement built from nothing. Information is almost free. That difference is frequently what decides the choice, and it belongs in any answer comparing them.' },
    ],
    realExample: { emoji: '🗃️', text: 'Schemes that pay households for a change in behaviour often spend a large share of the budget on checking who qualifies. Where the checking costs more than the payments, the scheme is a net loss however well the payments work.' },
    misconception: 'Students mention administrative costs as a throwaway line at the end of an evaluation. It is a number that can be compared with the welfare gain, and comparing it is the evaluation. Instead: say what the intervention is worth at most, and what running it would take.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as requiring the validity and significance of arguments to be considered and supported by chains of reasoning. Administrative cost is a significance argument: it can be decisive where the welfare at stake is small.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the test this cause supplies:',
      template: [
        `The most an intervention here can be worth is the welfare loss it removes: ${money(C.welfareLoss)} ${C.per}`,
        '→ against that stands the cost of designing, administering, monitoring and ___ it',
        '→ if the second exceeds the first it is a ___ welfare loss',
        '→ even if the quantity lands exactly on the ___',
      ],
      answers: ['enforcing', 'net', 'optimum'],
      hints: ['what has to happen to a rule after it is written, or it is only a suggestion', 'the word in the specification\'s own definition of government failure', 'the quantity the policy was aimed at, which reaching is not by itself enough'],
      distractors: ['publicising', 'total', 'market'],
    }),
  };
})();

const moralHazardCause = (() => {
  const sid = subId('moral-hazard-as-a-cause');
  return {
    id: sid,
    title: 'Moral Hazard',
    keyIdea: 'Where an intervention protects somebody from the cost of a risk, they take more of that risk, and the protection then costs more than it was set up to cost.',
    body: [
      { type: 'paragraph', text: 'The last cause on the list is one you have already met on the market\'s side in the previous topic: **moral hazard** is being protected from the consequences of a risk and taking more of it as a result.' },
      { type: 'paragraph', text: 'It appears here because a government protecting people is doing what an insurer does. A guaranteed floor price protects against the price falling, so more of the crop is planted, including on land where it is a poor bet, and the agency buys more than it expected.' },
      { type: 'paragraph', text: 'What makes this a cause of government failure rather than a cost of the policy is the direction. The protection does not merely cost money; it **increases the thing it was protecting against**, so the bill grows over time and the behaviour it was responding to gets worse rather than better.' },
      { type: 'paragraph', text: 'The usual answer is to protect partly rather than completely: a floor below the expected price rather than at it, a guarantee with a limit, cover with a share of the loss left where it was. Partial protection keeps some of the consequence attached to the decision, which is the whole point.' },
    ],
    realExample: { emoji: '🛡️', text: 'Deposit guarantees are the standard case. They are there to stop a panic spreading from one bank to the whole system, and they also mean depositors have no reason to ask whether their bank is lending carefully. Governments respond by regulating the lending instead, which is another tool from this list.' },
    misconception: 'Students confuse moral hazard with the intervention being expensive. Expense is a cost; moral hazard is the protection making the risk more likely, so the cost keeps rising. Instead: name whose behaviour changes and how the protection changed it.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as requiring multi-stage chains of reasoning and informed judgements. Moral hazard is a multi-stage chain by nature: protection, then a change in behaviour, then a cost that was not in the original estimate.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each protection to the behaviour it can change.',
      pairs: [
        { left: 'A guaranteed floor price for a crop', right: 'more of it is planted, on worse land' },
        { left: 'A promise that a bank will not be allowed to fail', right: 'riskier lending than otherwise' },
        { left: 'Compensation for flood damage to property', right: 'building where flooding is likely' },
        { left: 'Cover that leaves part of the loss with you', right: 'care is still worth taking' },
      ],
      why: [
        'The floor removes the risk of the price falling, so land that would have been too risky to plant becomes worth planting',
        'If the consequences of a bad loan are borne by somebody else, the return on a risky loan looks better than it is',
        'A cost that will be met by somebody else does not enter the decision about where to build',
        'Leaving part of the consequence attached is what stops the protection changing the behaviour, which is why partial cover is the usual answer',
      ],
    }),
  };
})();

/* ══ Assembly ═════════════════════════════════════════════════════════════ */

export const SUBSECTIONS = [
  whatInterventionIsFor, theEightMethods, judgingAnIntervention,
  howAnIndirectTaxMovesAMarket, specificAndAdValorem, theTwoPricesAndTheRevenue, evaluatingAnIndirectTax,
  howASubsidyMovesAMarket, whatASubsidyCosts, evaluatingASubsidy,
  aMaximumPrice, aMinimumPrice, aMinimumPriceOrATax, evaluatingPriceControls,
  howAPermitSchemeWorks, aPermitIsAPropertyRight, regulation, evaluatingPermitsRightsAndRules,
  stateProvision, provisionOfInformation, evaluatingProvision,
  healthEducationAndHousing, transportEnvironmentAndEnergy, agricultureAndCommodities, choosingTheTool,
  whatGovernmentFailureIs, informationGaps, lackOfIncentives, unintendedConsequences,
  excessiveAdministrativeCosts, moralHazardCause,
];

const BLOCK_PLAN = [
  { title: B1, subs: [whatInterventionIsFor, theEightMethods, judgingAnIntervention], takeaway: [
    'Intervention aims at the QUANTITY, and market failure is why it is wrong.',
    'Eight methods, no more: three set a price, one sets a quantity, four set rules or knowledge.',
    `Judge on welfare recovered against cost of running it, not on direction of travel.`,
  ] },
  { title: B2, subs: [howAnIndirectTaxMovesAMarket, specificAndAdValorem, theTwoPricesAndTheRevenue, evaluatingAnIndirectTax], takeaway: [
    'A tax lifts the curve SELLERS act on; buyers move along an unchanged demand curve.',
    'Specific shifts in parallel; ad valorem pivots and widens as the price rises.',
    `Two prices after the tax, ${money(C.tax)} apart, and revenue uses the quantity AFTER it.`,
  ] },
  { title: B3, subs: [howASubsidyMovesAMarket, whatASubsidyCosts, evaluatingASubsidy], takeaway: [
    'A subsidy lowers the curve SUPPLIERS act on; the quantity rises along demand.',
    `Cost is ${money(L.subsidy)} × the quantity AFTER the subsidy: ${money(L.cost)} ${L.per}.`,
    'Much of the money pays for units that would have happened anyway.',
  ] },
  { title: B4, subs: [aMaximumPrice, aMinimumPrice, aMinimumPriceOrATax, evaluatingPriceControls], takeaway: [
    'A maximum binds only BELOW the market price, a minimum only ABOVE it.',
    'Read TWO quantities at the controlled price: one off demand, one off supply.',
    'A tax and a minimum price can look identical to buyers and send the money to different people.',
  ] },
  { title: B5, subs: [howAPermitSchemeWorks, aPermitIsAPropertyRight, regulation, evaluatingPermitsRightsAndRules], takeaway: [
    `A cap fixes quantity and lets price settle: ${money(C.permitPrice)} a permit, the same as the tax.`,
    'Trading changes WHO cuts, never how much is cut in total.',
    'All three need a number or a fact a tax does not, and all three need enforcing.',
  ] },
  { title: B6, subs: [stateProvision, provisionOfInformation, evaluatingProvision], takeaway: [
    'State provision sets the quantity by BUDGET, so something other than price rations it.',
    'Information shifts DEMAND, so the quantity rises and so does the price.',
    'Provision reaches people no priced tool reaches; information is cheapest and least reliable.',
  ] },
  { title: B7, subs: [healthEducationAndHousing, transportEnvironmentAndEnergy, agricultureAndCommodities, choosingTheTool], takeaway: [
    'Eight contexts, and the first job is saying which kind of problem is in front of you.',
    'Housing and energy are the two where affordability argues against the cost side.',
    'Choose the tool by which fact the government can actually establish.',
  ] },
  { title: B8, subs: [whatGovernmentFailureIs, informationGaps, lackOfIncentives, unintendedConsequences, excessiveAdministrativeCosts, moralHazardCause], takeaway: [
    'Government failure is a NET welfare loss, judged against what would have happened without it.',
    'Five causes and no more, in the specification\'s own words. A sixth belongs to another topic.',
    `Setting the tax at ${money(C.wrongTax)} instead of ${money(C.externalCost)} leaves the same ${money(C.wrongLoss)} loss, on the other side.`,
  ] },
];

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

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '1 leaf',
    keyIdea: 'The purpose of government intervention, including reference to market failure.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Government intervention</strong> — action by a government intended to move the quantity traded towards the socially optimal level.'),
        def('<strong>Socially optimal level of output</strong> — the quantity at which every cost and every benefit is counted, not only those buyers and sellers feel.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`The prize is measurable. ${C.name}: market ${qty(C.marketQ)} ${C.units} ${C.per} at ${money(C.marketP)}, optimum ${qty(C.optimumQ)} at ${money(C.optimumP)}, welfare loss <strong>${money(C.welfareLoss)} ${C.per}</strong>.`),
        mech('The eight methods (1b): indirect taxation (ad valorem and specific); subsidies; maximum and minimum (guaranteed) prices; tradeable pollution permits; extension of property rights; state provision; regulation; provision of information.'),
        mech('Three set a price, one sets a quantity, four set a rule or what is known. A tool that sets one cannot set the other.'),
        link('An intervention is worth making if it recovers more welfare than it costs to run. That comparison is the evaluation, and the cost of running it never appears on the diagram.'),
      ] },
    ],
    takeaway: [
      'Name the failure before naming the policy.',
      'Eight methods and no ninth.',
      'Direction of travel is not the test; net welfare is.',
    ],
  },
  {
    title: B2,
    meta: '1 leaf',
    keyIdea: 'Indirect taxation (ad valorem and specific) as a method of intervention.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Indirect tax</strong> — a tax on a transaction, collected from the seller, rather than on income.'),
        def('<strong>Specific tax</strong> — a fixed sum per unit; shifts supply in PARALLEL.'),
        def('<strong>Ad valorem tax</strong> — a percentage of the price; PIVOTS supply, and the gap widens as the price rises.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Set at the external cost, the curve sellers act on becomes MSC. ${C.name}: ${money(C.tax)} a ${C.unit} takes quantity from ${qty(C.marketQ)} to <strong>${qty(C.taxedQ)}</strong>.`),
        mech(`Two prices after the tax. Pc = <strong>${money(C.buyerP)}</strong> off demand; Pp = <strong>${money(C.sellerP)}</strong> off the ORIGINAL supply curve. The gap is the tax.`),
        mech(`Incidence: buyers ${money(C.consumerIncidence)}, sellers ${money(C.producerIncidence)} — two to one. The RULE is 1.3.4 · 4b, taught in <em>Price Determination</em>.`),
        mech(`Revenue = ${money(C.tax)} × ${qty(C.taxedQ)} = <strong>${money(C.revenue)} ${C.per}</strong>, using the quantity AFTER the tax.`),
        link('Evaluation turns on three things: whether the external cost was measured, how much demand responds, and who ends up paying. Where demand barely responds it raises money and changes little.'),
      ] },
    ],
    takeaway: [
      'The tax moves SUPPLY. The fall in quantity is a movement along demand.',
      'Specific = parallel. Ad valorem = pivot.',
      `Revenue uses ${qty(C.taxedQ)}, not ${qty(C.marketQ)}.`,
    ],
  },
  {
    title: B3,
    meta: '1 leaf',
    keyIdea: 'Subsidies as a method of intervention.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Subsidy</strong> — a payment to the supplier per unit supplied, lowering the curve suppliers act on.'),
        def('<strong>Opportunity cost of a subsidy</strong> — the next best use of the money, which is what it has to be judged against.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${L.name}: external benefit ${money(L.externalBenefit)} a ${L.unit}, market ${qty(L.marketQ)} ${L.units} ${L.per} at ${money(L.marketP)}, optimum ${qty(L.optimumQ)} at ${money(L.optimumP)}, welfare gain forgone <strong>${money(L.welfareGain)} ${L.per}</strong>.`),
        mech(`A ${money(L.subsidy)} subsidy takes quantity to <strong>${qty(L.subsidisedQ)}</strong>. Buyers pay ${money(L.buyerP)}; providers receive ${money(L.providerP)}.`),
        mech(`The gain splits as the tax burden splits: buyers ${money(L.consumerGain)}, providers ${money(L.producerGain)} — two to one.`),
        mech(`Cost = ${money(L.subsidy)} × ${qty(L.subsidisedQ)} = <strong>${money(L.cost)} ${L.per}</strong>, at the quantity AFTER the subsidy.`),
        link(`Only ${qty(L.subsidisedQ - L.marketQ)} of the ${qty(L.subsidisedQ)} ${L.units} are new; the rest of the money lowers the price of consultations that were already happening.`),
      ] },
    ],
    takeaway: [
      'The subsidy moves SUPPLY; buyers move down an unchanged demand curve.',
      `Cost uses ${qty(L.subsidisedQ)}, not ${qty(L.marketQ)}.`,
      'Easy to start, hard to stop: prices settle around it.',
    ],
  },
  {
    title: B4,
    meta: '1 leaf',
    keyIdea: 'Maximum and minimum (guaranteed) prices as a method of intervention.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Maximum price</strong> — a legal ceiling. Binds only if set BELOW the market price. Produces excess demand.'),
        def('<strong>Minimum (guaranteed) price</strong> — a legal floor. Binds only if set ABOVE the market price. Produces excess supply.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.name}: market ${money(F.marketP)} a month, ${qty(F.marketQ)} ${F.units}. A maximum of ${money(F.maxPrice)} gives ${qty(F.demanded)} wanted and ${qty(F.supplied)} offered: <strong>excess demand ${qty(F.excessDemand)}</strong>. ${qty(F.pricedOut)} who rented before no longer do.`),
        mech(`${C.name}: a minimum of ${money(C.minPrice)} gives ${qty(C.minDemanded)} wanted and ${qty(C.minSupplied)} offered: <strong>excess supply ${qty(C.minExcessSupply)}</strong>.`),
        mech(`Minimum price against tax, same market: buyers pay ${money(C.minPrice)} under BOTH. Under the tax the extra ${money(C.tax)} a ${C.unit} goes to the government (${money(C.revenue)} ${C.per}); under the floor it goes to SELLERS, and there is excess supply as well.`),
        link('A price is how a market decides WHO gets the good. Fix it and something else decides: waiting, who is known, or payments outside the official price.'),
      ] },
    ],
    takeaway: [
      'Two quantities at the controlled price, not one.',
      'Maximum below, minimum above. A control on the wrong side does nothing.',
      'Same buyer price as a tax; completely different destination for the money.',
    ],
  },
  {
    title: B5,
    meta: '3 leaves',
    keyIdea: 'Tradeable pollution permits, extension of property rights, and regulation as methods of intervention.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Tradeable pollution permits</strong> — a fixed total of rights to emit, issued and then bought and sold.'),
        def('<strong>Extension of property rights</strong> — giving somebody a claim over a resource that they can defend or sell.'),
        def('<strong>Regulation</strong> — a rule, limit, standard or ban, backed by enforcement.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`A cap at ${qty(C.capQ)} ${C.units} makes supply vertical. Buyers bid to ${money(C.capBuyerP)}; the last ${C.unit} costs ${money(C.capCostP)} to make; a permit is worth the gap, <strong>${money(C.permitPrice)}</strong>.`),
        mech(`That is the tax. A tax names a price and lets quantity settle; a cap names a quantity and lets price settle. Same quantity, same buyer price, different recipient of the ${money(C.permitPrice)}.`),
        mech('Trading changes WHO cuts, never the total. Cuts go to whoever can make them most cheaply, and nobody has to work out who that is.'),
        mech('A permit IS a property right: a claim that can be defended, bought and sold. That is why permits are tradeable at all.'),
        link('All three need a fact a tax does not: the right quantity, who owns what, the right limit. All three need monitoring and enforcement, and who is GIVEN the rights decides who keeps the money.'),
      ] },
    ],
    takeaway: [
      'Cap and tax reach the same point from opposite directions.',
      'Trading changes who cuts, not how much.',
      'Rights work where a claim can be defined and enforced, and not otherwise.',
    ],
  },
  {
    title: B6,
    meta: '2 leaves',
    keyIdea: 'State provision and provision of information as methods of intervention.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>State provision</strong> — the government supplies the good itself, funded from taxation.'),
        def('<strong>Provision of information</strong> — making a fact available or requiring it to be displayed; changes what is known and nothing else.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Under state provision the quantity is set by a BUDGET, not by a price, so free access with a limited budget has to be rationed some other way.'),
        mech(`Information moves DEMAND. In ${L.name}, closing the gap takes demand from MPB to MSB and the market reaches <strong>${qty(meet(L.msb, L.mpc))} ${L.units}</strong> at ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))}.`),
        mech(`Same quantity as the ${money(L.subsidy)} subsidy — with buyers paying ${money(valueAt(L.mpc, meet(L.msb, L.mpc)))} instead of ${money(L.buyerP)}, and ${money(L.cost)} ${L.per} not spent.`),
        link('Provision reaches people no priced tool reaches. Information is the cheapest tool on the list and works only if the gap really was knowledge.'),
      ] },
    ],
    takeaway: [
      'Provision: budget sets quantity, taxation pays, rationing by something other than price.',
      'Information moves demand, so the price RISES rather than falls.',
      'If people know and still do not act, the campaign changes nothing.',
    ],
  },
  {
    title: B7,
    meta: '8 leaves',
    keyIdea: 'Contexts in which governments may intervene: health, housing, education, transport, environment, energy, agriculture and commodities.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Context</strong> — the setting an exam extract is drawn from. 1c lists eight, and the first job is to say which kind of problem is in front of you.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('<strong>Health, education</strong> — much of the benefit falls on other people, so the market under-supplies. Subsidy, state provision, information.'),
        mech('<strong>Housing</strong> — there may be no externality at all: the quantity may be right and the price out of reach. Maximum price, state provision.'),
        mech('<strong>Transport, environment</strong> — costs fall on people outside the transaction, so the market over-supplies. Tax, permits, property rights, regulation.'),
        mech('<strong>Energy</strong> — the hardest, because both arguments apply at once: external costs argue for taxing it, affordability argues for subsidising it.'),
        mech('<strong>Agriculture, commodities</strong> — supply is inflexible and demand unresponsive, so prices swing hard. Guaranteed minimum prices, reserves, export restrictions.'),
        link('Choosing between tools: name the failure, list the tools that act on it, say what each needs the government to know, and judge on which of those facts can actually be established.'),
      ] },
    ],
    takeaway: [
      'Eight contexts; say which kind of problem before naming a tool.',
      'Housing and energy are where affordability cuts against the cost argument.',
      'The deciding column is what the government has to KNOW.',
    ],
  },
  {
    title: B8,
    meta: '6 leaves',
    keyIdea: 'Government failure as intervention that results in a net welfare loss, and its five causes.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Government failure</strong> — intervention that results in a NET welfare loss, judged against what would have happened without it.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Drawn: a tax of ${money(C.wrongTax)} where the external cost is ${money(C.externalCost)} takes ${C.name} to <strong>${qty(C.wrongQ)} ${C.units}</strong>, ${qty(C.optimumQ - C.wrongQ)} below the optimum — as far below as the free market was above. Welfare loss <strong>${money(C.wrongLoss)} ${C.per}</strong>: the same number as before the government acted.`),
        mech('<strong>Information gaps</strong> — the tool has to be set from a number nobody can observe, so it is set from an estimate and lands away from the optimum.'),
        mech('<strong>Lack of incentives</strong> — no rival to lose customers to and no saving to keep, so costs are less tightly controlled than in a market.'),
        mech('<strong>Unintended consequences</strong> — people respond to the new incentives; excess demand under a maximum price is settled by waiting, by who is known, or by payments outside the official price.'),
        mech(`<strong>Excessive administrative costs</strong> — designing, administering, monitoring and enforcing. The whole prize in ${C.name} is ${money(C.welfareLoss)} ${C.per}; a scheme costing more than that is a net loss even at the right quantity.`),
        mech('<strong>Moral hazard</strong> — protection from a risk increases the risk taken, so the bill grows over time. The answer is partial protection.'),
        link('Five causes and no more. A cause that is not on this list — however plausible it sounds — belongs to another topic or to another specification, and an answer built on one has spent its words outside what the paper can ask.'),
      ] },
    ],
    takeaway: [
      'NET: the comparison is with what would have happened without the intervention.',
      'Five causes, in the specification\'s own words.',
      'The best case is arithmetic: the same loss, on the other side of the optimum.',
    ],
  },
];
