/**
 * PACKET 44 — aggregate-supply teaching content. Five blocks in the specification's own sub-topic
 * order, eighteen subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1026-1049`. Sub-topic 3 is split across three chapters — the shapes,
 * then the six LRAS shifters in two halves — so no chapter is twice another's length (packet 31's
 * decision, 17 September):
 *
 *   1  The Characteristics of AS                          1a, 1b, 1c      3 subsections
 *   2  What Shifts Short-Run AS                           2a-1, 2a-2, 2a-3  4
 *   3  The Shapes of Long-Run AS                          3a-1, 3a-2      4
 *   4  Long-Run AS: Technology, Productivity and Skills   3b-1, 3b-2, 3b-3  3
 *   5  Long-Run AS: Regulation, Population and Competition 3b-4, 3b-5, 3b-6 4
 *
 * ── WHAT THE LIVE SECTION TAUGHT THAT IS NOT HERE, AND WHERE IT LIVES ────────
 *
 * Blocks 2 and 3 of the live section ("Macroeconomic Equilibrium", "AD/AS Analysis of
 * Macroeconomic Events") are 2.3.4 · 3 (`:1074-1077`), `national-income`; the live `output-gaps`
 * subsection is 2.3.5 · 4 (`:1121-1125`), `economic-growth`. `audit/SPEC-OWNERSHIP.md` gains the row
 * and each is POINTED AT here with a budget the runner counts (`POINTER_ONLY` in the util). That is
 * `structure-08` resolved by its correct numbers, and it makes `topFix-05` and `structure-05` —
 * stagflation and the rightward-AD analysis each taught twice — unrepresentable rather than
 * removed: neither is this section's leaf, so neither is taught here even once.
 *
 * The live "self-correcting mechanism" is kept, and moved to where the specification puts it. It is
 * the classical explanation of why the classical LRAS is vertical (3a-2, `:1042`), so it is taught in
 * `classical-lras` on one diagram carrying AD, SRAS and LRAS together — `topFix-03`'s missing
 * diagram and `specGap-07`'s "short run and long run on one diagram".
 *
 * ── THE TWO CONFLATIONS THE LEDGER NAMED ────────────────────────────────────
 *
 * `structure-09` and `topFix-05`: the live SRAS takeaway said "near full capacity the SRAS curve
 * becomes steeper", which is the KEYNESIAN LONG-RUN curve's property put on the short-run curve. The
 * two slopes have different causes — costs fixed by contract, against resources running out — and
 * `keynesian-lras` says so in its misconception, so the conflation is refuted where a student meets it.
 * The straw-man misconception ("Keynesians say markets never work") is gone.
 */
import {
  SECTION, subId, id, ECON, bn, mn, pct, idx, money,
  SRAS_FACTORS, LRAS_FACTORS,
} from './_packet44-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position.
 * `shuffled` is never written: the renderer ignores it and CONTENT-GATE says to delete it.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'The Characteristics of AS';
export const B2 = 'What Shifts Short-Run AS';
export const B3 = 'The Shapes of Long-Run AS';
export const B4 = 'Long-Run AS: Technology, Productivity and Skills';
export const B5 = 'Long-Run AS: Regulation, Population and Competition';

/* ══ Block 1 — The Characteristics of AS (2.3.3 · 1a, 1b, 1c) ══════════════ */

const conceptOfAs = (() => {
  const sid = subId('concept-of-as');
  return {
    id: sid,
    title: 'What Aggregate Supply Is',
    keyIdea: 'Aggregate supply is the total real output that all the firms in an economy plan to produce at each possible price level, over a given period.',
    body: [
      { type: 'paragraph', text: `The concept of **aggregate supply (AS)** adds up the planned output of every producer in the economy and asks one question of the total: how much would they produce at each possible **price level**?` },
      { type: 'paragraph', text: `The price level is the average of all prices in the economy, written as an index. Output is **real national output**: goods and services valued at constant prices, so a rise means more was produced, not the same things costing more.` },
      { type: 'paragraph', text: `So an AS diagram looks like a supply diagram and is not one. A market supply curve asks what happens when ONE price rises while everything else stays put. On an AS diagram every price moves together — including, sooner or later, the prices firms pay for labour and materials — which is what makes time matter.` },
      { type: 'paragraph', text: `So the topic works with two time horizons. In the **short run**, some input costs are fixed: wages agreed in contracts, rents agreed in leases. In the **long run**, every input cost has had time to adjust. ${E.country}, ${E.what}, has firms that together plan to supply ${bn(E.capacity)} of real output at a price level of ${idx(E.P0)}.` },
    ],
    realExample: { emoji: '🏭', text: `Every firm in ${E.country} — the electronics assemblers, the rice farms, the port and the hairdressers — contributes to one number: ${bn(E.capacity)} of real output a year at a price level of ${idx(E.P0)}.` },
    misconception: 'Students label an AS diagram "price" and "quantity", as if it were one market. The axes are the price level and real national output. With single-market labels, a movement along the curve reads as one good becoming dearer, which is not what the curve shows.',
    examMatters: 'Appendix 6 gives Define 2 marks. For aggregate supply the two parts are the total planned output of all firms in the economy, and "at each price level" — leave out the price level and you have defined national output, not a supply curve.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each term on an AS diagram to what it means:',
      pairs: [
        { left: 'The price level', right: 'Rises when food, fuel and rents all get dearer together', why: 'It is the vertical axis: an average over every price, not the price of one good.' },
        { left: 'Real national output', right: 'Rises when factories make more, even if nothing costs more', why: 'Valued at constant prices, it moves only when more is actually made.' },
        { left: 'The short run', right: 'A hotel\'s cleaners are still on this year\'s agreed pay', why: 'Some costs are fixed, which is what gives the short-run curve its slope.' },
        { left: 'The long run', right: 'Every lease and pay deal has since been renegotiated', why: 'Once costs have adjusted, only the economy\'s resources limit what it can produce.' },
      ],
      distractors: ['Rises when one shop raises one price'],
    }),
  };
})();

const srasCurve = (() => {
  const sid = subId('sras-curve');
  return {
    id: sid,
    title: 'Why the SRAS Curve Slopes Upward',
    keyIdea: 'In the short run some costs are fixed, so a higher price level raises what firms earn on each unit faster than what it costs them, and they choose to produce more.',
    body: [
      { type: 'paragraph', text: `The **short-run aggregate supply (SRAS)** curve slopes upward from left to right: the higher the price level, the more real output firms plan to supply.` },
      { type: 'paragraph', text: `The reason is the costs that have not moved yet. Suppose prices across the economy rise by 4% while the wages in this year's contracts stay where they were. Each unit sold now earns more above what it costs to make, so producing extra units pays: firms add shifts and take on orders they would have turned down.` },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'The price level rises', subtitle: 'Firms can sell their output for more' },
        { title: 'Contracted wages stay fixed', subtitle: 'Costs per unit have not caught up yet' },
        { title: 'Profit on each unit rises', subtitle: 'Producing more becomes worthwhile' },
        { title: 'Firms expand output', subtitle: 'A movement up along the SRAS curve' },
      ] },
      { type: 'paragraph', text: `In ${E.country}, the SRAS curve passes through ${bn(E.capacity)} at a price level of ${idx(E.P0)}. At a price level of ${idx(E.P1)}, with costs unchanged, firms plan to supply ${bn(E.Ymove)}.` },
      { type: 'paragraph', text: `The slope is a short-run property. As contracts are renegotiated, wages and other costs catch up with the price level, and the reason to produce more disappears — which is where the long run begins.` },
    ],
    realExample: { emoji: '🪑', text: `A furniture workshop in ${E.country} sells tables at prices that rise with everything else, while its carpenters are paid the rates agreed in January. Each table now earns more above its cost, so the owner adds a Saturday shift.` },
    misconception: 'Students write that SRAS slopes upward "because firms want more profit". Firms always want more profit. The slope needs the reason a higher price level delivers it: some costs, especially contracted wages, have not yet risen, so each unit earns more above its cost.',
    examMatters: 'An Explain asks for a two-stage chain (Appendix 6). Here the stages are: the price level rises while some costs are fixed, so profit per unit rises; therefore firms supply more. The fixed costs are the link, and without them the answer has no second stage.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the rise in the price level to the extra output:',
      correctOrder: [
        'Prices of finished goods climb 4% across the economy this quarter',
        'A garment maker still pays sewing staff the rates fixed in last year\'s wages deal',
        'Each shirt it sells now earns a wider profit over its cost',
        'The owner decides to expand output by running the machines on Sundays',
      ],
      criterion: 'each step is caused by the one before it',
      why: [
        'The chain starts with the price level, the variable on the axis.',
        'Contracted wages have not moved, which is the short-run condition that matters.',
        'Higher prices over unchanged costs widen the margin on each unit.',
        'A wider margin makes extra output worthwhile — a movement along the SRAS curve.',
      ],
    }),
  };
})();

const movementAndShift = (() => {
  const sid = subId('movement-and-shift');
  return {
    id: sid,
    title: 'A Movement Along or a Shift',
    keyIdea: 'A change in the price level moves the economy along the AS curve. A change in anything else that alters what firms will supply at a given price level shifts the whole curve.',
    body: [
      { type: 'paragraph', text: `**A movement along** the curve is caused by the variable on its own axis. In ${E.country}, a price level of ${idx(E.P1)} instead of ${idx(E.P0)} takes planned output from ${bn(E.capacity)} to ${bn(E.Ymove)} along the same SRAS curve. Nothing about firms' costs has changed; only the price level has.` },
      { type: 'paragraph', text: `**A shift** is caused by anything that changes how much firms will supply at an UNCHANGED price level. If costs rise, firms supply less at every price level and the curve moves left; if costs fall, it moves right. Chapter 2 names the three causes the specification lists for the short-run curve, and chapters 4 and 5 the six for the long-run curve.` },
      { type: 'paragraph', text: `The rule is the same for the long-run curve. A change in the price level is a movement along the LRAS; a change in the economy's productive capacity is a shift. On a vertical long-run curve that has a sharp consequence: a movement along it changes the price level and leaves real output exactly where it was. Only a shift of the LRAS changes how much the economy can produce.` },
    ],
    realExample: { emoji: '📰', text: `Two headlines from ${E.country}. "Prices up 4%, factories run extra shifts" is a movement along SRAS. "Oil up 20%, factories cut output at every price" is a shift of SRAS to the left.` },
    misconception: 'Students say "a higher price level shifts the SRAS curve up". The price level is on the vertical axis, so a change in it can only move the economy along the curve. A shift needs a cause that is not on either axis — a change in costs or in productive capacity.',
    examMatters: 'On a Draw question the two are drawn differently: a movement is an arrow along one curve between two labelled points; a shift is a second curve, labelled SRAS₁ or LRAS₁, with the direction marked. Appendix 6 asks for an accurately labelled diagram, and an unlabelled second curve is not one.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each event into a movement along the AS curve or a shift of the AS curve:',
      groups: [
        { name: 'A movement along the curve', items: ['The general price level rises and firms produce more', 'A lower price level leads firms to cut back production', 'On a vertical LRAS, the price level rises and output is unchanged'], why: 'In each case the cause is the price level itself, which is on the axis — so the economy slides along the curve it is already on.' },
        { name: 'A shift of the curve', items: ['The world price of fuel doubles', 'Imported components cost more after the currency falls', 'The labour force grows by a million workers'], why: 'Each changes how much firms can or will supply at an unchanged price level, so the whole curve moves.' },
      ],
    }),
  };
})();

/* ══ Block 2 — What Shifts Short-Run AS (2.3.3 · 2a) ═════════════════════ */

const energyAndRawMaterials = (() => {
  const sid = subId('raw-materials-and-energy');
  return {
    id: sid,
    title: 'Costs of Raw Materials and Energy',
    keyIdea: 'Dearer raw materials or energy raise firms\' costs at every level of output, so at each price level they supply less and the SRAS curve shifts left.',
    body: [
      { type: 'paragraph', text: `Almost every firm buys energy and materials: fuel, electricity, cotton, steel. When their prices rise, the cost of producing each unit rises at every level of output, which is what makes it a SHIFT rather than a movement.` },
      { type: 'paragraph', text: `How far the curve moves depends on how large a share of costs the input is. In ${E.country}, energy and raw materials are ${pct(E.energyShare * 100)} of firms' costs. A ${pct(E.energyRise)} rise in their price raises unit costs by ${pct(E.energyShare * 100)} × ${pct(E.energyRise)} = ${pct(E.energyCost)}. To supply the same output as before, firms now need prices about ${pct(E.energyCost)} higher, so the SRAS curve moves up by ${E.energyCost} points of the price level index.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Energy prices rise', subtitle: 'Fuel and power cost more' },
        { title: 'Unit costs rise', subtitle: 'At every level of output' },
        { title: 'Firms supply less', subtitle: 'At each price level' },
        { title: 'SRAS shifts left', subtitle: 'Or, read vertically, up' },
      ] },
      { type: 'paragraph', text: `Read horizontally, at the old price level of ${idx(E.P0)} firms now plan ${bn(E.Yenergy)} instead of ${bn(E.capacity)}. A fall in energy prices shifts SRAS right. Where the new curve meets aggregate demand is the question topic 2.3.4 answers.` },
    ],
    realExample: { emoji: '⛽', text: 'Economies that import most of the oil they use, such as Singapore and Pakistan, see costs rise across almost every industry when the world oil price climbs — transport, electricity and plastics all at once.' },
    misconception: 'Students treat a jump in the oil price as a shift of the long-run curve. It changes what production costs, not what the economy is able to produce: the same workers, machines and land are still there. It is an SRAS shift, and it reverses if the price falls back.',
    examMatters: 'An Analyse question on a cost shock earns its application marks from the size of the input in costs. Stating that energy is a large share of costs for the economy in the question — and so the shift is large — is a stage of reasoning; saying "costs rise" is not.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the event to the shift of the curve:',
      correctOrder: [
        'World wheat and energy prices jump after a poor harvest and a fuel shortage',
        'A bakery chain now pays more for flour and for the gas in its ovens, loaf by loaf',
        'At the prices it was charging, the bakeries now supply fewer loaves than before',
        'Repeated across the economy, the whole SRAS curve shifts to the left',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain begins with the input prices — the cause from outside the diagram.',
        'The rise shows up as a higher cost for every unit made, whatever the output.',
        'With costs up at every output, less is supplied at each price level.',
        'Summed over all firms, that is a leftward shift of short-run AS, not a movement along it.',
      ],
    }),
  };
})();

const exchangeRates = (() => {
  const sid = subId('exchange-rates');
  return {
    id: sid,
    title: 'Exchange Rates',
    keyIdea: 'A fall in the currency makes imported raw materials, parts and fuel dearer in local money, so SRAS shifts left. A rise in the currency makes them cheaper, and SRAS shifts right.',
    body: [
      { type: 'paragraph', text: `Many firms buy inputs from abroad: microchips, machine parts, fuel, cloth. They pay for them in foreign currency, so the **exchange rate** decides what those inputs cost in local money.` },
      { type: 'paragraph', text: `When the currency **depreciates** — each unit of it buys less foreign currency — the same imported inputs cost more at home. In ${E.country}, imported inputs are ${pct(E.importShare * 100)} of firms' costs. A depreciation that makes them ${pct(E.importRise)} dearer raises unit costs by ${pct(E.fxCost)}, and at a price level of ${idx(E.P0)} firms now supply ${bn(E.Yfx)} rather than ${bn(E.capacity)}: SRAS shifts left.` },
      { type: 'paragraph', text: `An **appreciation** does the reverse. Imported inputs become cheaper, unit costs fall, and at the same price level firms supply ${bn(E.Yappreciate)}: SRAS shifts right. The more a country's firms rely on imported inputs, the larger the shift a given change in the exchange rate produces.` },
      { type: 'paragraph', text: `The same fall in the currency also changes what foreign buyers pay for the country's exports. That is a change in the net trade balance, which belongs to aggregate demand (topic 2.3.2), not to aggregate supply. Keep the two effects apart; they are on different curves.` },
    ],
    realExample: { emoji: '📱', text: 'When a currency falls sharply, firms that assemble phones from imported chips, or sew garments from imported cloth, find their costs have risen before they have sold a single extra unit.' },
    misconception: 'Students write that a depreciation shifts SRAS right "because exports become more competitive". Cheaper exports are an AD effect. On the supply side a depreciation raises the local cost of imported inputs, which shifts SRAS left — the opposite direction.',
    examMatters: 'In a question about the exchange rate, say which curve each effect acts on before drawing. Appendix 6 wants an Analyse answer to follow one chain in depth; an answer that draws the AD effect and the SRAS effect on one unlabelled shift has followed neither.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by what it does to firms\' costs and so to the SRAS curve:',
      groups: [
        { name: 'Raises costs: SRAS shifts left', items: [`${E.country}'s currency falls, and imported microchips cost more`, 'Imported fertiliser becomes dearer after a depreciation', 'The world price of copper wire doubles'], why: 'Each raises the local cost of an input at every level of output, so less is supplied at each price level.' },
        { name: 'Lowers costs: SRAS shifts right', items: [`${E.country}'s currency rises, and imported fuel costs less`, 'An appreciation cuts the cost of imported machine parts', 'Electricity charges for factories fall'], why: 'Each lowers the cost of producing a unit, so firms supply more at every price level.' },
      ],
    }),
  };
})();

const taxRates = (() => {
  const sid = subId('tax-rates');
  return {
    id: sid,
    title: 'Tax Rates',
    keyIdea: 'A higher tax on what firms produce or sell, or on the workers they employ, adds to the cost of supplying each unit, so SRAS shifts left. A cut shifts it right.',
    body: [
      { type: 'paragraph', text: `Some taxes are paid on every unit supplied: a sales tax, an excise duty on fuel or cigarettes, an import duty on components. Others are paid on every worker employed, such as a payroll tax on employers. Either way, the tax is part of what it costs a firm to supply its output.` },
      { type: 'paragraph', text: `So a rise in **tax rates** of this kind works exactly like a rise in energy costs. In ${E.country}, a tax rise that adds ${pct(E.taxCost)} to the cost of supplying each unit shifts SRAS up by ${E.taxCost} points; at a price level of ${idx(E.P0)} firms supply ${bn(E.Ytax)} instead of ${bn(E.capacity)}. A cut in the rate shifts SRAS right.` },
      { type: 'paragraph', text: `Not every tax acts here. A tax on households' income changes how much they can spend, which is aggregate demand (topic 2.3.2). The question to ask of any tax is who pays it, and whether it is a cost of producing output.` },
      { type: 'paragraph', text: `Some taxes also matter over the long run, by changing the reward for working or investing. That is a different mechanism with a different curve — the long-run curve — and chapter 5 teaches it with government regulations.` },
    ],
    realExample: { emoji: '🧾', text: 'When a government raises a sales tax such as GST, every firm selling taxed goods has to charge more simply to keep the same amount per unit it received before.' },
    misconception: 'Students say "any tax cut shifts AS right". A cut in income tax on households raises their disposable income, which shifts AD. For the SRAS curve the tax has to fall on firms\' costs: on each unit they supply, or on each worker they employ.',
    examMatters: 'An Explain on a tax change earns its second stage by naming the channel: the tax is paid per unit or per worker, so it raises the cost of supplying output at every level. Name the tax, then the cost, then the shift.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each tax change to the way it reaches the economy:',
      pairs: [
        { left: 'Excise duty on diesel is raised', right: 'Every delivery costs firms more to make, so SRAS moves left', why: 'The duty is paid on each litre, so it is a cost of supplying at every level of output.' },
        { left: 'A payroll tax on employers is cut', right: 'Each worker becomes cheaper to employ, so SRAS moves right', why: 'A tax on employing people is a cost of production; cutting it lowers unit costs.' },
        { left: 'Income tax on households is cut', right: 'Households have more to spend: a demand change, not supply', why: 'The tax falls on income, not on production, so it acts through spending — topic 2.3.2.' },
      ],
      distractors: ['Capacity rises at once, so the LRAS curve moves right'],
    }),
  };
})();

const oneMechanism = (() => {
  const sid = subId('three-causes-one-mechanism');
  return {
    id: sid,
    title: 'Three Causes, One Mechanism',
    keyIdea: 'All three SRAS shifters work through unit costs. Work out how much unit costs change, and the size and direction of the shift follow.',
    body: [
      { type: 'paragraph', text: `The specification lists three factors for the short-run curve: ${SRAS_FACTORS.join(', ')}. They look different, and they are one mechanism. Each changes the **cost of producing a unit** at every level of output, and the curve moves up by that percentage of the price level.` },
      { type: 'paragraph', text: `That makes combinations easy. If ${E.country}'s oil price rise (+${pct(E.energyCost)} on unit costs) arrives together with a depreciation (+${pct(E.fxCost)}), unit costs rise by ${pct(E.energyCost + E.fxCost)} and at a price level of ${idx(E.P0)} firms supply ${bn(E.srasAt(E.P0, -(E.energyLeft + E.fxLeft)))}. Changes can also cancel: an appreciation (−${pct(E.fxCost)}) alongside a tax rise (+${pct(E.taxCost)}) leaves unit costs ${pct(E.fxCost - E.taxCost)} lower, a small shift to the right.` },
      { type: 'paragraph', text: `What none of the three changes is the economy's **productive capacity** — how much it could make with the workers, machines and land it has. That is why they are short-run shifters: when the oil price falls back, or the currency recovers, the curve returns. The long-run curve moves only when capacity itself changes, which is chapters 3 to 5.` },
    ],
    realExample: { emoji: '🧮', text: `A ${E.country} electronics assembler faces dearer chips after a depreciation and dearer power after an oil price rise in the same quarter. Its accountants add the two effects on the cost of each unit; the economy's SRAS curve adds them in the same way.` },
    misconception: 'Students list the three SRAS factors as three unrelated facts, and then cannot say what happens when two arrive at once. Every one of them works through the cost of producing each unit, so their effects add, and opposite changes offset.',
    examMatters: 'A Calculate question on a cost shock gives shares and price changes: multiply each share by its price change and add them. Appendix 6 wants the workings shown, so write each product before the total.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work out the combined effect on unit costs, then the direction of the shift:',
      template: [
        'Energy is a fifth of a country\'s production costs and its price rises 15%.',
        'At the same time imported parts, a tenth of costs, become 20% dearer.',
        'Unit costs rise by ___% in total,',
        'so at an unchanged price level firms supply ___ output than before.',
      ],
      answers: ['5', 'less'],
      hints: ['a fifth of fifteen, plus a tenth of twenty', 'a rise in costs at every level of production'],
      distractors: ['35', 'more', '3'],
    }),
  };
})();

/* ══ Block 3 — The Shapes of Long-Run AS (2.3.3 · 3a) ═════════════════════ */

const longRunAs = (() => {
  const sid = subId('long-run-as');
  return {
    id: sid,
    title: 'What the Long-Run AS Curve Shows',
    keyIdea: 'The LRAS curve shows what the economy can produce once every cost has adjusted: its productive capacity, set by the quantity and quality of its resources.',
    body: [
      { type: 'paragraph', text: `In the long run, wages and other input costs catch up with the price level. The reason the short-run curve slopes upward — costs that have not moved yet — is gone. What is left to limit output is the economy's resources: its labour, capital, land and enterprise, and how productively they are used.` },
      { type: 'paragraph', text: `That limit is the economy's **productive capacity**. In ${E.country} it can be written as a product: ${mn(E.labour)} workers, each producing ${money(E.perWorker)} of output a year, is a capacity of ${bn(E.capacity)}. The **long-run aggregate supply (LRAS)** curve is drawn at that level of real output.` },
      { type: 'paragraph', text: `Two things can therefore move the LRAS curve: a change in HOW MANY work, or in HOW MUCH each of them produces. Every one of the six factors the specification lists acts through one of those two terms, and chapters 4 and 5 take them in turn.` },
      { type: 'paragraph', text: `What the curve looks like on its way to capacity is where economists disagree. The specification names two shapes: **classical** and **Keynesian**. The next two subsections draw each, and the fourth says what the disagreement is about.` },
    ],
    realExample: { emoji: '⚙️', text: `${E.country}'s capacity is not a target or a forecast. It is arithmetic: ${mn(E.labour)} people at work, each producing ${money(E.perWorker)} a year, makes ${bn(E.capacity)} of output possible.` },
    misconception: 'Students treat LRAS as "SRAS, but later". The two curves answer different questions. SRAS is about how firms respond to prices while some costs are fixed; LRAS is about the most the economy\'s resources can produce once costs have adjusted.',
    examMatters: 'When a question names a long-run factor, start from capacity: say which term — the number of workers or output per worker — the factor changes. It makes the chain explicit, which is what an Explain earns its second mark for (Appendix 6).',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it describes the short-run AS curve or the long-run AS curve:',
      groups: [
        { name: 'Short-run AS', items: ['Rests on wages that contracts have fixed for now', 'Moves when the oil price rises and moves back when it falls', 'Slopes upward because margins widen as prices rise'], why: 'The short-run curve is about firms responding to prices while some of their costs have not caught up.' },
        { name: 'Long-run AS', items: ['Drawn once every cost has had time to adjust', 'Grows when a country trains its workforce', 'Moves when the labour force grows'], why: 'The long-run curve is productive capacity, so only a change in resources, or in how well they are used, moves it.' },
      ],
    }),
  };
})();

const classicalLras = (() => {
  const sid = subId('classical-lras');
  return {
    id: sid,
    title: 'The Classical LRAS: Vertical at Capacity',
    keyIdea: 'Classical economists argue that wages and prices are flexible, so in the long run output returns to capacity whatever the price level. The LRAS curve is vertical.',
    body: [
      { type: 'paragraph', text: `On the **classical** view, the LRAS curve is a vertical line at productive capacity — ${bn(E.capacity)} in ${E.country}. A higher price level does not raise long-run output, because wages and other costs rise with it and the extra profit per unit disappears. Only a change in resources moves the line.` },
      { type: 'paragraph', text: `The short run is allowed to differ. With wages fixed, firms can push output above capacity for a while — the move to ${bn(E.Ymove)} in chapter 1 was that — or fall below it. The classical claim is that neither lasts, because wages adjust.` },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: `AD falls by ${bn(E.adFall)}`, subtitle: `Short run: output ${bn(E.Ysr)}, price level ${idx(E.Psr)}` },
        { title: 'Unemployment rises', subtitle: 'Output is below capacity' },
        { title: 'Wages and costs fall', subtitle: `SRAS shifts right by ${bn(E.srasRecovery)}` },
        { title: 'Output returns to capacity', subtitle: `${bn(E.Ylr)} at a price level of ${idx(E.Plr)}` },
      ] },
      { type: 'paragraph', text: `The diagram for this chapter draws all three curves at once. It starts where AD, SRAS and LRAS meet at ${bn(E.capacity)} and ${idx(E.P0)}. In the long run the fall in demand has lowered the price level and left real output where it began, which is exactly what a vertical LRAS says.` },
    ],
    realExample: { emoji: '📉', text: `When ${E.country}'s export orders collapse, factories lay off workers. On the classical view, as wage contracts come up for renewal, workers accept lower pay, costs fall, and firms rehire until output is back at ${bn(E.capacity)} — at a lower price level.` },
    misconception: 'Students say a vertical LRAS means the price level cannot change. It is output that cannot change in the long run; the price level can go anywhere. A movement along a vertical LRAS is a change in the price level with real output unchanged.',
    examMatters: 'A Draw on the classical model needs AD, SRAS and a vertical LRAS, the short-run point and the long-run point both marked, and the SRAS shift labelled. Appendix 6 asks for accurate labels, and the two equilibria are what the diagram exists to show.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the classical adjustment in order, from the fall in spending to the return to capacity:',
      correctOrder: [
        'Export orders collapse and aggregate demand falls',
        'Factories sell less, lay off workers, and unemployment rises',
        'As contracts renew, jobless workers accept lower wages and costs fall',
        'Output climbs back to capacity, now at a lower price level',
      ],
      criterion: 'cause to effect: each stage of the adjustment is caused by the one before it',
      why: [
        'The shock comes first: spending falls, so the economy moves down its short-run curve.',
        'Lower sales mean less output and fewer jobs, below capacity.',
        'Classical economists argue wages are flexible, so unemployment pushes pay and costs down — SRAS shifts right.',
        'Once costs have fallen enough, firms produce at capacity again: the long-run curve is vertical.',
      ],
    }),
  };
})();

const keynesianLras = (() => {
  const sid = subId('keynesian-lras');
  return {
    id: sid,
    title: 'The Keynesian LRAS: Three Ranges',
    keyIdea: 'Keynesian economists draw the curve flat while many resources are idle, rising as bottlenecks appear, and vertical once capacity is reached.',
    body: [
      { type: 'paragraph', text: `The **Keynesian** LRAS curve has three ranges, each with its own reason.` },
      { type: 'bullets', items: [
        `**Horizontal.** Below ${bn(E.kFlatUntil)} in ${E.country}, many workers and machines are idle. Firms can hire them at the going wage without bidding costs up, so output can rise with the price level unchanged at ${idx(E.kFlatP)}.`,
        '**Rising.** Nearer capacity, some industries run short first: skilled engineers, ship berths, components. Firms bid for scarce resources, costs rise, and more output comes only with a higher price level.',
        `**Vertical.** At capacity, ${bn(E.capacity)}, every resource is in use. Output cannot rise any further, whatever happens to the price level.`,
      ] },
      { type: 'paragraph', text: `Behind the flat range is a claim about wages. Keynesians argue that money wages are "sticky downwards": workers and employers resist cuts, so when demand falls, wages do not drop quickly enough to restore output. An economy can therefore sit on the flat range, well below capacity, for a long time.` },
      { type: 'paragraph', text: `The vertical range is common ground: at capacity, classical and Keynesian curves agree. The disagreement is about everywhere to the left of it.` },
    ],
    realExample: { emoji: '🏗️', text: `In a slump, a quarter of ${E.country}'s building cranes stand idle and site workers are looking for jobs. A new project can hire them at the going rate — the flat range. Two years into a boom, the same project has to outbid other sites for every crane driver — the rising range.` },
    misconception: 'Students draw the Keynesian curve as an SRAS curve that steepens. The two slopes have different causes. SRAS slopes up because some costs are fixed by contract; the Keynesian curve rises because resources start to run out as capacity nears. Keep them as two curves.',
    examMatters: 'On a Draw question the three ranges must be visible and named: flat, rising, vertical at capacity. Appendix 6 asks for accurate labelling, and a single smooth upward line has lost the flat range, which is the whole of the Keynesian argument.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each range of the Keynesian LRAS curve to what is happening in the economy:',
      pairs: [
        { left: 'The horizontal range', right: 'Idle workers and machines can be hired at the going wage', why: 'With resources unused, more output does not need higher costs, so the price level need not rise.' },
        { left: 'The rising range', right: 'Some industries run short of skilled staff and parts first', why: 'Bottlenecks force firms to bid for scarce inputs, so output rises only with the price level.' },
        { left: 'The vertical range', right: 'Every resource is employed, so no more can be produced', why: 'At capacity, a higher price level cannot raise real output at all.' },
      ],
      distractors: ['Wages fall quickly until output is back at capacity'],
    }),
  };
})();

const twoShapes = (() => {
  const sid = subId('two-shapes-compared');
  return {
    id: sid,
    title: 'Why the Two Shapes Disagree',
    keyIdea: 'The shapes differ because the two schools disagree about how quickly wages adjust. That decides whether a fall in demand costs output for months or for years.',
    body: [
      { type: 'paragraph', text: `Both shapes end vertical at capacity. They differ in one assumption: how quickly money wages and other costs adjust when demand changes.` },
      { type: 'bullets', items: [
        '**Classical:** wages are flexible. Unemployment pushes them down, costs fall, and output returns to capacity by itself. The long-run curve is vertical everywhere.',
        '**Keynesian:** wages are sticky downwards. Unemployment can persist, so the economy can stay well below capacity. The long-run curve is flat where resources are idle.',
      ] },
      { type: 'paragraph', text: `The consequence shows when demand changes. On a classical curve, in the long run a change in demand moves only the price level. On the flat range of a Keynesian curve, it moves real output and leaves the price level alone. How much a change in demand becomes output rather than prices is topic 2.3.4's question; the shape of the curve it meets is this topic's.` },
      { type: 'paragraph', text: `Neither shape is simply right. The classical case is strongest over long periods and where wages are renegotiated often; the Keynesian case is strongest in a deep downturn, when many resources are idle and wage cuts are resisted.` },
    ],
    realExample: { emoji: '⚖️', text: `After ${E.country}'s export collapse, a classical economist expects wages to fall and output to recover within a few years. A Keynesian economist expects wages to hold and idle factories to stay idle unless demand returns.` },
    misconception: 'Students treat the two shapes as a fact and a mistake. They rest on different assumptions about wages, and an evaluative answer says which assumption fits the economy in the question — how deep the downturn is, how often wages are renegotiated.',
    examMatters: 'In a Discuss or Evaluate answer, the two shapes are the "different viewpoints" Appendix 6 asks for. Name the assumption each rests on, then judge which fits the context — that judgement is what reaches the top level.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each claim by which view of the long-run AS curve it belongs to:',
      groups: [
        { name: 'The classical view', items: ['Unemployment pushes wages down until jobs return', 'Output returns to capacity without help', 'A fall in spending ends in lower prices, not lower output'], why: 'All three follow from flexible wages: costs adjust, so output is pulled back to capacity.' },
        { name: 'The Keynesian view', items: ['Workers resist pay cuts even in a deep slump', 'A deep slump can last many years with no recovery in jobs', 'With many resources unused, extra demand becomes extra output'], why: 'All three follow from wages that are sticky downwards, which is why the curve is flat below capacity.' },
      ],
    }),
  };
})();

/* ══ Block 4 — Long-Run AS: Technology, Productivity and Skills (3b-1 to 3b-3) ══ */

const technology = (() => {
  const sid = subId('state-of-technology');
  return {
    id: sid,
    title: 'The State of Technology',
    keyIdea: 'Better technology lets the same workers, machines and land produce more. Capacity rises and the LRAS curve shifts right.',
    body: [
      { type: 'paragraph', text: `**The state of technology** is the knowledge and methods an economy has for turning inputs into output. A better method means the same resources produce more: an automated assembly line, a drought-resistant seed, software that routes deliveries.` },
      { type: 'paragraph', text: `It acts on the second term of capacity — output per worker. In ${E.country}, a new assembly process that raises output per worker by ${pct(E.techRise)} takes it from ${money(E.perWorker)} to ${money(E.perWorkerTech)}. With the same ${mn(E.labour)} workers, capacity rises from ${bn(E.capacity)} to ${bn(E.capTech)}, and the LRAS curve shifts right by ${bn(E.capTech - E.capacity)}.` },
      { type: 'paragraph', text: `Two cautions. New technology usually has to be built into new machines, so it arrives as firms invest, and the curve moves gradually rather than overnight. And unlike a fall in energy prices, it does not reverse: once a better method is known, the capacity it adds stays.` },
    ],
    realExample: { emoji: '📲', text: 'In Kenya, mobile money lets a market trader pay a supplier from a phone instead of spending half a day travelling to a bank. The same trader, with the same stock, can do more business in a week.' },
    misconception: 'Students say new technology shifts only the short-run curve, because it lowers costs. It does lower costs, and it also raises what the economy can produce with its existing resources. That is a change in capacity, so the LRAS curve shifts right.',
    examMatters: 'An Explain on technology earns its chain by naming the term it changes: more output per worker, so capacity rises, so LRAS shifts right. Appendix 6 asks for two linked stages; "technology improves the economy" is neither.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the chain from better technology to the long-run curve:',
      template: [
        'A textile mill installs looms that weave twice as fast, with the same staff.',
        'What each ___ produces has gone up,',
        'so the most the economy could make — its productive ___ — is higher,',
        'and the vertical long-run curve moves to the ___.',
      ],
      answers: ['worker', 'capacity', 'right'],
      hints: ['the person operating the loom', 'the most it can produce with its resources', 'the direction of more real output'],
      distractors: ['left', 'demand', 'price'],
    }),
  };
})();

const productivity = (() => {
  const sid = subId('productivity');
  return {
    id: sid,
    title: 'Productivity',
    keyIdea: 'Productivity is output per worker, or per hour worked. Capacity is workers times output per worker, so higher productivity raises capacity with no extra workers.',
    body: [
      { type: 'paragraph', text: `**Productivity** is output per unit of input — most often output per worker, or per hour worked. It is not the same as output: an economy that hires more people produces more, but if each produces the same as before, productivity has not changed.` },
      { type: 'paragraph', text: `Because capacity is the number of workers times output per worker, productivity is one of the two things capacity is made of. In ${E.country}, firms install more machinery per worker and output per worker rises ${pct(E.prodRise)}, from ${money(E.perWorker)} to ${money(E.perWorkerProd)}. Capacity rises from ${bn(E.capacity)} to ${bn(E.capProd)} with exactly the same labour force: the LRAS curve shifts right.` },
      { type: 'paragraph', text: `Productivity rises for several reasons: more capital per worker, better technology, better skills, and better organisation of work. That is why it appears in the specification's list alongside technology and education — it is the measure through which they reach capacity. A fall in productivity, say from old and poorly maintained machinery, shifts LRAS left.` },
    ],
    realExample: { emoji: '🚜', text: `A ${E.country} rice farm that swaps hand-planting for a small transplanting machine grows more rice with the same three workers. Output per worker has risen, and so has what the farm could produce.` },
    misconception: 'Students treat a rise in output as a rise in productivity. Output can rise because more people are working, with each producing no more than before. Productivity rises only when output per worker, or per hour, rises.',
    examMatters: 'A Calculate question may give the labour force and output per worker and ask for capacity, or give capacity and ask for productivity. Appendix 6 asks for workings: write capacity = workers × output per worker before substituting.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Calculate capacity from the labour force and output per worker:',
      template: [
        'An economy has 5 million workers, each producing $40 thousand of output a year.',
        'Its productive capacity is $___bn a year.',
        'If output per worker rises by a tenth, capacity becomes $___bn.',
      ],
      answers: ['200', '220'],
      hints: ['the number of workers times what each produces', 'ten per cent more than the figure before'],
      distractors: ['400', '240', '45'],
    }),
  };
})();

const educationSkills = (() => {
  const sid = subId('education-and-skills');
  return {
    id: sid,
    title: 'Education and Skills',
    keyIdea: 'Education and training raise what each worker can do, so productivity and capacity rise and LRAS shifts right — but only after a delay, because skills take years to build.',
    body: [
      { type: 'paragraph', text: `Workers who can read a technical manual, repair a machine or write software produce more with the same equipment. **Education and skills** — schooling, apprenticeships, training at work — raise output per worker, and so raise capacity.` },
      { type: 'paragraph', text: `In ${E.country}, a training programme reaches ${mn(E.trained)} of its ${mn(E.labour)} workers and makes each of them ${pct(E.skillRise)} more productive. Capacity rises by ${mn(E.trained)} × ${money(E.perWorker)} × ${pct(E.skillRise)} = ${bn(E.capSkills - E.capacity)}, to ${bn(E.capSkills)}.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Training is funded', subtitle: 'Courses, apprenticeships, schooling' },
        { title: 'Workers gain skills', subtitle: 'Years later, as they finish' },
        { title: 'Output per worker rises', subtitle: 'Fewer errors, faster repairs' },
        { title: 'LRAS shifts right', subtitle: 'Capacity has grown' },
      ] },
      { type: 'paragraph', text: `The delay matters. A school place funded this year produces a more skilled worker a decade later, so the effect on LRAS is slow and cannot be switched on quickly. Skills also have to match what firms need: training in skills nobody hires for raises nothing.` },
    ],
    realExample: { emoji: '🎓', text: 'Singapore\'s SkillsFuture scheme gives adults credit to spend on approved training courses, so workers can add skills mid-career rather than only at school.' },
    misconception: 'Students write that government spending on education shifts LRAS right straight away. In the year it is spent it is part of aggregate demand. The supply effect arrives only when the trained workers are at work, which can be years later.',
    examMatters: 'In an Evaluate question on education, the time lag is the strongest evaluation point available: the effect on LRAS is real but slow, so it cannot solve a problem that needs solving this year.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the training decision to the shift of the LRAS curve:',
      correctOrder: [
        'A government pays for a two-year technician training course',
        'Graduates join factories with maintenance skills they lacked before',
        'Each technician repairs machines faster, so output per worker rises',
        'More can now be produced than before, so the long-run curve moves out',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the decision to train, which is where the delay begins.',
        'Only when the trained workers are at work does anything change on the supply side.',
        'Their skills raise output per worker — the productivity term of capacity.',
        'Higher output per worker is higher capacity, so the long-run curve moves right.',
      ],
    }),
  };
})();

/* ══ Block 5 — Long-Run AS: Regulation, Population and Competition (3b-4 to 3b-6) ══ */

const regulationsAndTax = (() => {
  const sid = subId('regulations-and-tax');
  return {
    id: sid,
    title: 'Government Regulations and Tax',
    keyIdea: 'Rules and taxes change what is worth doing over years. Rules whose cost adds no output, and taxes that blunt the reward for work and investment, hold LRAS back.',
    body: [
      { type: 'paragraph', text: `**Government regulations** decide how easy it is to start a firm, hire a worker, build a factory or export a shipment. Every form and licence takes time that could have gone into production. Where rules add cost and nothing to output — a licence that takes eight months, four forms per worker hired — capacity is lower than it could be.` },
      { type: 'paragraph', text: `Not every rule holds capacity back. Courts that enforce contracts, clear property rights and product standards that buyers trust let firms invest and trade with confidence, and they raise capacity. The question is whether a rule's cost is repaid in output.` },
      { type: 'paragraph', text: `**Tax** acts here through incentives rather than through the cost of each unit. A high tax on income from work cuts the reward for extra hours, or for joining the labour force at all. A high tax on profits cuts the return on a new factory, so less capital is added per worker; tax allowances for investment do the opposite.` },
      { type: 'paragraph', text: `One tax can therefore act on both curves: at once, as a cost of each unit (SRAS, chapter 2), and over time, through what it rewards (LRAS). Which regulations and taxes a government should change, and how well such policies work, is topic 2.3.6.` },
    ],
    realExample: { emoji: '📋', text: 'Several governments have cut the number of separate licences a new business needs, so an entrepreneur can open in days rather than months — resources that went on queues and paperwork go into production instead.' },
    misconception: 'Students write that all regulation shifts LRAS left. Rules that protect property, enforce contracts and set trusted standards make investment safer and raise capacity. Only rules whose cost is not repaid in output hold it back.',
    examMatters: 'When a question names a tax, decide first which mechanism it asks about: the cost of supplying each unit now (SRAS), or the reward for working and investing over years (LRAS). Appendix 6 rewards a chain that names its mechanism.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each government rule or tax by its likely effect on productive capacity:',
      groups: [
        { name: 'Tends to raise capacity', items: ['Courts that enforce business contracts within weeks', 'A tax allowance on spending for new machinery', 'A stable tax code that firms can plan around'], why: 'Each makes producing or investing safer or more rewarding, so more capital and effort go into production.' },
        { name: 'Tends to hold capacity back', items: ['A building permit that takes eight months to approve', 'A top tax rate that takes most of any overtime pay', 'Four separate forms for every worker a firm hires'], why: 'Each adds cost or blunts reward without adding output, so resources are wasted or work is discouraged.' },
      ],
    }),
  };
})();

const demography = (() => {
  const sid = subId('demography');
  return {
    id: sid,
    title: 'Demography',
    keyIdea: 'Demography — the size and age structure of the population — decides how many people are of working age. An ageing population shrinks that share and holds LRAS back.',
    body: [
      { type: 'paragraph', text: `The labour force is not the population. It is the people of **working age** who are in work or looking for it. So it is the working-age population times the **participation rate** — the share of them who take part. In ${E.country}: ${mn(E.workingAge)} × ${pct(E.participation * 100)} = ${mn(E.labour)}.` },
      { type: 'paragraph', text: `**Demography** acts on the first term. As a population ages, more people pass retirement age and fewer young people replace them. If ${E.country}'s working-age population falls by ${mn(E.ageingLoss)}, its labour force falls to ${mn(E.labourAgeing)} and its capacity to ${bn(E.capAgeing)}: the LRAS curve shifts left, or grows more slowly than it would have.` },
      { type: 'paragraph', text: `Participation can offset it. If childcare and flexible hours raise participation from ${pct(E.participation * 100)} to ${pct(E.participation2 * 100)} of the same ${mn(E.workingAge)}, the labour force becomes ${mn(E.labourParticipation)} and capacity ${bn(E.capParticipation)}.` },
      { type: 'paragraph', text: `Births work slowly. A rise in the birth rate adds to the labour force only when those children reach working age, fifteen or more years later — and in the meantime it adds people who consume but do not yet produce.` },
    ],
    realExample: { emoji: '👵', text: 'Japan and Hong Kong have ageing populations, with a rising share of people past retirement age; Nigeria\'s population is young, with a large share about to reach working age.' },
    misconception: 'Students write that a bigger population always means more capacity. It does only if the extra people are of working age and take part in the labour force. A population that grows by living longer can have a smaller labour force than before.',
    examMatters: 'In an Analyse question on an ageing population, the chain has two stages: fewer people of working age, so a smaller labour force; so less can be produced, and LRAS shifts left. Appendix 6 wants the stages linked, not listed.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work out the labour force from the working-age population and the participation rate:',
      template: [
        'A country has 30 million people of working age, and 70% of them are in the labour force.',
        'Its labour force is ___ million.',
        'If participation rises to 80%, the labour force grows by ___ million.',
      ],
      answers: ['21', '3'],
      hints: ['the working-age population times the share taking part', 'ten more percentage points of the same thirty million'],
      distractors: ['24', '9', '30'],
    }),
  };
})();

const netMigration = (() => {
  const sid = subId('net-migration');
  return {
    id: sid,
    title: 'Net Migration',
    keyIdea: 'Net migration is immigration minus emigration. A net inflow of working-age people adds to the labour force and shifts LRAS right; a skilled outflow shifts it left.',
    body: [
      { type: 'paragraph', text: `**Net migration** is the number of people moving into a country minus the number leaving it. What matters for LRAS is its effect on the two terms of capacity: how many work, and what each produces.` },
      { type: 'paragraph', text: `Migrants are more often of working age than the population as a whole, so an inflow adds more to the labour force than to the population. In ${E.country}, a net inflow of ${mn(E.netMigrants)} working-age people, all in the labour force, raises capacity from ${bn(E.capacity)} to ${bn(E.capMigration)}.` },
      { type: 'paragraph', text: `The skills they bring matter too. An inflow of engineers or nurses raises output per worker as well as the number of workers. An outflow does the reverse: when trained doctors, engineers and technicians **emigrate**, the economy loses both workers and some of its most productive ones, and the LRAS curve shifts left.` },
      { type: 'paragraph', text: `Immigration and emigration at the same time can cancel out in numbers and still change capacity, if those leaving are more skilled than those arriving — or less.` },
    ],
    realExample: { emoji: '✈️', text: 'The Gulf economies, such as the UAE and Qatar, rely on large numbers of migrant workers in construction and services. Nigeria and Kenya have seen many trained doctors and nurses emigrate to work abroad.' },
    misconception: 'Students treat migration only as a change in population, or only as extra spending on the demand side. Its supply effect is on the labour force and on skills: a net inflow of working-age people raises how much the economy can produce.',
    examMatters: 'For a Discuss on migration, weigh the number effect against the skills effect. Appendix 6 wants a critical assessment, and "net migration is zero, so nothing changes" is the claim a strong answer tests rather than accepts.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each migration change to its effect on the long-run AS curve:',
      pairs: [
        { left: 'Each year far more people of working age arrive than leave', right: 'The headcount at work rises, and capacity with it', why: 'Capacity is workers times output per worker, and the number of workers has grown.' },
        { left: 'A country\'s newly qualified doctors move abroad in large numbers', right: 'Both the number and the average skill of workers fall', why: 'Both terms of capacity fall — how many work, and what the average worker produces.' },
        { left: 'As many arrive as leave, but those arriving are better qualified', right: 'Headcount unchanged, yet output per worker climbs', why: 'Net migration is zero in numbers, but the skills mix has improved.' },
      ],
      distractors: ['Capacity cannot change while net migration is zero'],
    }),
  };
})();

const competitionPolicy = (() => {
  const sid = subId('competition-policy');
  return {
    id: sid,
    title: 'Competition Policy',
    keyIdea: 'Competition policy stops price-fixing and mergers that dominate a market. Firms facing rivals must cut costs and innovate, so resources are used better and LRAS shifts right.',
    body: [
      { type: 'paragraph', text: `**Competition policy** is the set of rules, and the authority that enforces them, that keep markets competitive. It fines cartels that fix prices, blocks mergers that would leave one firm dominating a market, and removes barriers that stop new firms from entering.` },
      { type: 'paragraph', text: `The supply-side case is about pressure. A firm protected from rivals can survive with high costs and old methods. A firm that could lose its customers to a cheaper rival has to cut waste, adopt better methods and invest in new products. Across an economy, that pressure raises output per worker.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Rivals can compete', subtitle: 'Cartels fined, barriers removed' },
        { title: 'Firms must cut costs', subtitle: 'Or lose customers to cheaper rivals' },
        { title: 'Resources used better', subtitle: 'Less waste, better methods, innovation' },
        { title: 'LRAS shifts right', subtitle: 'Higher output per worker' },
      ] },
      { type: 'paragraph', text: `Competition also moves resources: workers and capital leave firms that cannot compete and go to firms that use them more productively. The effect is slow and hard to see in any one year, and it depends on the authority actually enforcing the rules.` },
    ],
    realExample: { emoji: '⚖️', text: 'Competition authorities such as the Competition Commission of Pakistan and Kenya\'s Competition Authority can fine firms that fix prices and can block mergers that would dominate a market.' },
    misconception: 'Students say competition policy "lowers prices, so it shifts AD". Lower prices are a result, not the supply-side mechanism. The LRAS effect comes from firms being forced to cut costs and innovate, which raises what the economy\'s resources produce.',
    examMatters: 'An Explain on competition policy needs the mechanism, not the name: rivalry forces firms to cut costs and innovate, so output per worker rises, so LRAS shifts right. Appendix 6 gives the second mark to the linked stage.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the competition ruling to the shift of the LRAS curve:',
      correctOrder: [
        'A competition authority fines a cement cartel and ends its price-fixing, so rivals can compete',
        'Each cement maker must now cut costs or lose customers to cheaper rivals',
        'Plants replace old kilns and cut waste, so resources are used better',
        'Cement output per worker rises across the industry, and the LRAS curve shifts right',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'Competition policy acts first, removing the protection the cartel gave its members.',
        'Facing rivals, each firm has to compete on cost.',
        'Cutting costs means better methods and less waste — resources used better.',
        'More output from the same inputs is higher capacity, so the long-run curve moves right.',
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [conceptOfAs, srasCurve, movementAndShift],
    takeaway: [
      'AS is total planned real output at each price level.',
      'SRAS slopes up because some costs are fixed in the short run.',
      'Price level changes move along the curve; anything else shifts it.',
    ],
  },
  {
    title: B2,
    subs: [energyAndRawMaterials, exchangeRates, taxRates, oneMechanism],
    takeaway: [
      'Raw materials, energy, the exchange rate and taxes on production all act through unit costs.',
      'A depreciation shifts SRAS left through dearer imported inputs.',
      'SRAS shifters do not change capacity, so they can reverse.',
    ],
  },
  {
    title: B3,
    subs: [longRunAs, classicalLras, keynesianLras, twoShapes],
    takeaway: [
      'LRAS is productive capacity: workers times output per worker.',
      'Classical: vertical, because wages are flexible.',
      'Keynesian: flat, then rising, then vertical at capacity.',
    ],
  },
  {
    title: B4,
    subs: [technology, productivity, educationSkills],
    takeaway: [
      'Technology and skills act through output per worker.',
      'Productivity is output per worker, not output.',
      'Education shifts LRAS only once the trained are at work.',
    ],
  },
  {
    title: B5,
    subs: [regulationsAndTax, demography, netMigration, competitionPolicy],
    takeaway: [
      'A rule holds capacity back only if its cost is not repaid in output.',
      'Demography and net migration act through the size of the labour force.',
      'Competition forces firms to cut costs, which raises output per worker.',
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
 * THE LEAF MAP, BY HAND. 14 leaves at `econ_spec.txt:1026-1049`, every one named against the
 * subsection that teaches it. The three `requirement` rows (2a, 3a, 3b) group bullets and are not
 * leaves; the runner re-reads the oracle and asserts both counts.
 */
export const LEAF_MAP = {
  'ECON-2.3.3-1a': ['concept-of-as'],
  'ECON-2.3.3-1b': ['sras-curve', 'long-run-as'],
  'ECON-2.3.3-1c': ['movement-and-shift'],
  'ECON-2.3.3-2a-1': ['raw-materials-and-energy', 'three-causes-one-mechanism'],
  'ECON-2.3.3-2a-2': ['exchange-rates', 'three-causes-one-mechanism'],
  'ECON-2.3.3-2a-3': ['tax-rates', 'three-causes-one-mechanism'],
  'ECON-2.3.3-3a-1': ['keynesian-lras', 'two-shapes-compared'],
  'ECON-2.3.3-3a-2': ['classical-lras', 'two-shapes-compared'],
  'ECON-2.3.3-3b-1': ['state-of-technology'],
  'ECON-2.3.3-3b-2': ['productivity'],
  'ECON-2.3.3-3b-3': ['education-and-skills'],
  'ECON-2.3.3-3b-4': ['regulations-and-tax'],
  'ECON-2.3.3-3b-5': ['demography', 'net-migration'],
  'ECON-2.3.3-3b-6': ['competition-policy'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE, so the two
 * surfaces cannot diverge and `depth.notes-titles` cannot fire. Notes ship from the `data` column,
 * so a `?draft=1` walk shows these only after publication (DECISIONS, 16 September).
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2.3.3 · 1a, 1b, 1c',
    keyIdea: 'What aggregate supply is, why the short-run curve slopes upward, and the difference between moving along a curve and moving the curve.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Aggregate supply (AS)</strong> — the total real output all firms in an economy plan to produce at each price level, over a period.'),
        def('<strong>Short-run aggregate supply (SRAS)</strong> — aggregate supply while some input costs, such as contracted wages, are fixed.'),
        def('<strong>Movement along</strong> — caused by a change in the price level. <strong>Shift</strong> — caused by anything else that changes supply at a given price level.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Price level up, contracted wages fixed, profit per unit up, output up: ${E.country} supplies ${bn(E.Ymove)} at ${idx(E.P1)} against ${bn(E.capacity)} at ${idx(E.P0)}.`),
        mech('Axes: the price level (an index) vertically, real national output horizontally.'),
        link('On a vertical LRAS, a movement along changes only the price level.'),
      ] },
    ],
    takeaway: [
      'Two parts to the definition: total planned output, at each price level.',
      'The fixed costs are the reason for the slope.',
      'Price level on the axis means a movement, never a shift.',
    ],
  },
  {
    title: B2,
    meta: '2.3.3 · 2a',
    keyIdea: 'The three factors the specification lists for the short-run curve, and the single mechanism they share.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Unit cost</strong> — the cost of producing one unit of output. Every SRAS shifter changes it at every level of output.'),
        def('<strong>Depreciation</strong> — a fall in the value of the currency; imported inputs cost more in local money. <strong>Appreciation</strong> is the reverse.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Energy ${pct(E.energyShare * 100)} of costs × a ${pct(E.energyRise)} rise = unit costs up ${pct(E.energyCost)}: at ${idx(E.P0)}, ${bn(E.Yenergy)} instead of ${bn(E.capacity)}.`),
        mech(`Imported inputs ${pct(E.importShare * 100)} of costs × ${pct(E.importRise)} dearer = up ${pct(E.fxCost)}: ${bn(E.Yfx)}. An appreciation: ${bn(E.Yappreciate)}.`),
        mech(`A tax adding ${pct(E.taxCost)} to the cost of each unit: ${bn(E.Ytax)}.`),
        link('A tax on households\' income acts on AD (topic 2.3.2), not on SRAS.'),
      ] },
    ],
    takeaway: [
      'Share of costs × price change = change in unit costs.',
      'Costs up: SRAS left. Costs down: SRAS right.',
      'Capacity is unchanged, so the shift can reverse.',
    ],
  },
  {
    title: B3,
    meta: '2.3.3 · 3a',
    keyIdea: 'What the long-run curve measures, the classical and Keynesian shapes, and the assumption about wages that separates them.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Long-run aggregate supply (LRAS)</strong> — the real output the economy can produce once every cost has adjusted: its productive capacity.'),
        def('<strong>Classical LRAS</strong> — vertical at capacity, because wages and prices are flexible.'),
        def('<strong>Keynesian LRAS</strong> — horizontal while resources are idle, rising as bottlenecks appear, vertical at capacity.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: ${mn(E.labour)} workers × ${money(E.perWorker)} = ${bn(E.capacity)} of capacity.`),
        mech(`Classical adjustment: AD falls ${bn(E.adFall)}; short run ${bn(E.Ysr)} at ${idx(E.Psr)}; wages fall, SRAS right ${bn(E.srasRecovery)}; long run ${bn(E.Ylr)} at ${idx(E.Plr)}.`),
        link('Sticky money wages are the Keynesian reason an economy can stay below capacity.'),
      ] },
    ],
    takeaway: [
      'Vertical LRAS: output fixed in the long run, the price level free.',
      'Three ranges on the Keynesian curve, each with its own reason.',
      'The disagreement is about how fast wages adjust.',
    ],
  },
  {
    title: B4,
    meta: '2.3.3 · 3b',
    keyIdea: 'Three of the six LRAS factors, all acting on output per worker.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>The state of technology</strong> — the methods available for turning inputs into output.'),
        def('<strong>Productivity</strong> — output per worker, or per hour worked.'),
        def('<strong>Education and skills</strong> — what training and schooling let each worker do.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Technology: output per worker up ${pct(E.techRise)}, capacity ${bn(E.capacity)} → ${bn(E.capTech)}.`),
        mech(`More machinery per worker: output per worker up ${pct(E.prodRise)}, capacity ${bn(E.capProd)}.`),
        mech(`Training ${mn(E.trained)} workers to be ${pct(E.skillRise)} more productive: capacity ${bn(E.capSkills)}.`),
        link('Education is aggregate demand in the year it is spent and aggregate supply only when the trained are at work.'),
      ] },
    ],
    takeaway: [
      'Capacity = workers × output per worker.',
      'These three raise the second term.',
      'The effects are lasting but slow.',
    ],
  },
  {
    title: B5,
    meta: '2.3.3 · 3b',
    keyIdea: 'The other three LRAS factors: the rules firms work under, the number of people who work, and the pressure of rivals.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Government regulations and tax</strong> — rules and taxes that change the cost and the reward of producing and investing over time.'),
        def('<strong>Demography</strong> — the size and age structure of the population. <strong>Net migration</strong> — immigration minus emigration.'),
        def('<strong>Competition policy</strong> — rules and an authority that stop price-fixing, block dominating mergers and remove barriers to entry.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Labour force = working-age population × participation: ${mn(E.workingAge)} × ${pct(E.participation * 100)} = ${mn(E.labour)}.`),
        mech(`Ageing: ${mn(E.ageingLoss)} fewer of working age, capacity ${bn(E.capAgeing)}. Net inflow of ${mn(E.netMigrants)}: capacity ${bn(E.capMigration)}.`),
        mech('Competition: rivals force cost-cutting and innovation, so output per worker rises.'),
        link('Choosing and judging supply-side policies is topic 2.3.6.'),
      ] },
    ],
    takeaway: [
      'Some rules raise capacity; only unrepaid costs hold it back.',
      'People of working age who take part, not population, set the labour force.',
      'Competition acts through output per worker.',
    ],
  },
];
