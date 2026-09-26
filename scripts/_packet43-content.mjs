/**
 * PACKET 43 — economic-growth teaching content. Five chapters, twenty-one subsections, one
 * subsection to a step, in the specification's own order.
 *
 * `audit/raw/econ_spec.txt:1094-1125`:
 *
 *   1  Actual and Potential Growth        1a, 1b, 1c        3 subsections
 *   2  The Causes of Potential Growth     1d (4 bullets), 1e 5
 *   3  The Benefits of Growth             2a (6 bullets)    3
 *   4  The Costs of Growth                3a (5 bullets)    5
 *   5  Output Gaps                        4a-4d             5
 *
 * ── WHAT THE LIVE SECTION TAUGHT, AND WHERE IT WENT ─────────────────────────
 *
 *   Block 1 "Actual vs Potential"      → chapter 1, with `accuracy-01` fixed: actual growth from
 *                                        spare capacity is a move from INSIDE the frontier towards
 *                                        it; a move ALONG it is reallocation, not growth.
 *   Block 2 "Output Gaps"              → chapter 5, now carrying 4a (trend, `specGap-02`) and 4d.
 *   Block 3 "The Business (Trade) Cycle" → NOT REBUILT. "cycle", "boom", "slump" and "trough" are
 *                                        0 hits in econ_spec.txt; "recession" is 2.3.1 · 1g. What
 *                                        2.3.5 asks about fluctuation is 4a and 4c, both built.
 *   Block 4 "Causes"                   → chapters 1 (1b, 1c) and 2 (1d, 1e). The live block taught
 *                                        two of the four 1d causes; FDI and the degree of
 *                                        competition were MISSING (spec-coverage.json).
 *   Block 5 "Costs and Benefits"       → chapters 3 and 4, one subsection per bullet pair or
 *                                        bullet. Opportunity cost, balance of trade deficits and
 *                                        inflation join the costs (`specGap-04/05/06`); profits and
 *                                        investment get their own step (`specGap-03`).
 *   Block 6 "Growth and AD/AS"         → MERGED (`structure-02`, `topFix-05`): its AD half is
 *                                        chapter 1's second step and its LRAS half is chapter 2's
 *                                        diagram. Nothing it taught is taught twice.
 *
 * ── ONE AGGREGATE SUPPLY MODEL (`topFix-04`) ────────────────────────────────
 *
 * The live section says AD growth lands on "the elastic section of SRAS". An upward-sloping
 * short-run curve has no flat section; the curve with one is the KEYNESIAN long-run AS curve of
 * topic 2.3.3 (`:1041`). Every AD/AS statement here is made on that one curve, named.
 */
import {
  SECTION, subId, id, ECON, bn, pct, mn, usd, round1,
  POTENTIAL_CAUSES, BENEFITS, COSTS,
} from './_packet43-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);
const bn2 = (n) => `$${n.toFixed(2)}bn`;
const yr = (y) => `Year ${y}`;
const g = (y) => pct(E.growth[E.at(y)]);

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position.
 * `shuffled` is never written: the renderer ignores it (CONTENT-GATE).
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'Actual and Potential Growth';
export const B2 = 'The Causes of Potential Growth';
export const B3 = 'The Benefits of Growth';
export const B4 = 'The Costs of Growth';
export const B5 = 'Output Gaps';

/* ══ Chapter 1 — Actual and Potential Growth (1a, 1b, 1c) ═══════════════════ */

const actualAndPotential = (() => {
  const sid = subId('actual-and-potential-growth');
  return {
    id: sid,
    title: 'Actual and Potential Growth',
    keyIdea: 'Actual growth is a rise in the real output an economy produces; potential growth is a rise in the output it could produce with all its resources in use.',
    body: [
      { type: 'paragraph', text: `**Actual growth** is an increase in real GDP: more goods and services produced than last year, measured at constant prices. **Potential growth** is an increase in an economy's productive capacity — the real output it could produce if all its resources were fully and efficiently employed.` },
      { type: 'paragraph', text: `On a production possibility frontier the two look different. An economy with idle workers and machines sits at a point **inside** the frontier. Actual growth that uses those idle resources is a movement from inside the PPF **towards** the frontier. Potential growth is an **outward shift** of the frontier itself.` },
      { type: 'paragraph', text: `A movement **along** the frontier is neither: it is a reallocation — more of one good, less of the other — not growth.` },
      { type: 'paragraph', text: `The two can diverge. In ${E.country}, ${E.what}, potential output grows at a steady ${pct(E.trendRate)} a year. In ${yr(3)} its capacity was ${bn(E.neg.potential)}, but real GDP was only ${bn(E.neg.actual)}: ${bn(-E.neg.gapBn)} of output the economy could have produced and did not. Actual growth can outrun potential growth while that slack lasts; after that, only potential growth lets output keep rising.` },
    ],
    realExample: { emoji: '🏭', text: `When lockdowns ended, many economies grew unusually fast for a year or so as shops, factories and workers that had stood idle came back into use. Most of that was actual growth recovering lost ground, not new capacity.` },
    misconception: `Students describe actual growth as "a movement along the PPF". A movement along the frontier moves resources from one good to another with the economy already at full capacity, so total output cannot rise. Actual growth that uses spare capacity is a movement from inside the frontier towards it.`,
    examMatters: `Appendix 6 gives Define 2 marks for the meaning of a term, so "potential growth" needs both halves: an increase in productive capacity, and what capacity means — the output possible with all resources employed.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by what it does to Loriana\'s production possibilities:',
      groups: [
        { name: 'Actual growth only', items: ['Laid-off factory workers are rehired as orders return', 'Hotels that stood half empty fill up again'], why: 'Each puts resources that already existed back to work, so output rises towards the frontier without moving it.' },
        { name: 'Potential growth', items: ['A new port doubles how many containers can be handled', 'Workers learn to operate faster machinery'], why: 'Each raises what the economy COULD produce with everything employed, which shifts the frontier outward.' },
        { name: 'Neither — a reallocation', items: ['Farmland is switched from rice to palm oil at full employment'], why: 'With every resource already in use, more of one good means less of another: a movement along the frontier, not growth.' },
      ],
    }),
  };
})();

const actualFromAD = (() => {
  const sid = subId('actual-growth-from-aggregate-demand');
  return {
    id: sid,
    title: 'Actual Growth and Aggregate Demand',
    keyIdea: 'A rise in any component of aggregate demand raises real output — as long as there is spare capacity for firms to produce more.',
    body: [
      { type: 'paragraph', text: `Aggregate demand has four components: consumption, investment, government spending and net exports, AD = C + I + G + (X − M). In ${yr(3)} Loriana's were ${bn(E.C)}, ${bn(E.I)}, ${bn(E.G)} and ${bn(E.X)} − ${bn(E.M)}, which sum to ${bn(E.AD)} — exactly its real GDP that year.` },
      { type: 'paragraph', text: `**Actual growth is caused by an increase in any of the four.** Households spend more, firms buy more machinery, the government builds more or foreign buyers order more, and firms respond by producing more. The multiplier, topic 2.3.4, means the final rise in AD is larger than the first round of spending.` },
      { type: 'paragraph', text: `Whether the extra spending becomes extra output depends on where the economy stands. On a Keynesian long-run AS curve (topic 2.3.3) there are three ranges:` },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Plenty of spare capacity', subtitle: 'the curve is flat: AD rises, output rises, the price level does not' },
        { title: 'Capacity running short', subtitle: 'the curve rises: output and the price level both rise' },
        { title: 'Full capacity', subtitle: 'the curve is vertical: only the price level rises' },
      ] },
      { type: 'paragraph', text: `So demand can close a gap between actual and potential output, but it cannot push output past capacity for long. Loriana's ${bn(-E.neg.gapBn)} of slack in ${yr(3)} was room for AD-led growth; the same rise in AD at full capacity would have been inflation.` },
    ],
    realExample: { emoji: '🛍️', text: `Household spending is the largest component of AD in most economies, which is why a change in consumer confidence moves real GDP so quickly — a rise feeds straight into retail sales, services and the jobs that supply them.` },
    misconception: `Students write that a rise in AD always raises real output. It does only while there is spare capacity. Near full capacity most of the rise shows up as a higher price level, and at full capacity all of it does.`,
    examMatters: `An Explain asking HOW a component causes growth is a reason, so Appendix 6 wants a two-stage chain: the component rises, AD shifts right, and with spare capacity firms raise output.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each event to the component of aggregate demand it raises first:',
      pairs: [
        { left: 'A mobile network buys new transmission masts', right: 'Investment (I)', why: 'Spending by firms on capital goods is investment, whatever the goods are for.' },
        { left: 'Tourists from abroad book more hotel rooms in Loriana', right: 'Net exports (X − M)', why: 'A foreign buyer paying for a domestic service is an export, even though the service is used inside the country.' },
        { left: 'The government hires more teachers', right: 'Government spending (G)', why: 'Wages the state pays for services it provides are government spending on goods and services.' },
        { left: 'Households spend more of their income on meals out', right: 'Consumption (C)', why: 'Spending by households on goods and services for their own use is consumption.' },
      ],
    }),
  };
})();

const exportLed = (() => {
  const sid = subId('export-led-growth');
  return {
    id: sid,
    title: 'International Trade and Export-Led Growth',
    keyIdea: 'Export-led growth is growth driven by selling to the rest of the world, whose demand is not limited by how much the home economy can spend.',
    body: [
      { type: 'paragraph', text: `**Export-led growth** is growth in which rising exports are the main driver. Exports are an injection into the circular flow, so a rise in export demand raises AD: a ${bn(E.exportRise)} increase in foreign orders is ${bn(E.exportRise)} more AD before any multiplier effect.` },
      { type: 'paragraph', text: `International trade matters for growth for reasons beyond that first injection:` },
      { type: 'bullets', items: [
        '**A bigger market.** A small economy selling only at home runs out of buyers; selling to the world, its firms can keep expanding.',
        '**Economies of scale.** Longer production runs lower average cost, which makes the exports more competitive still.',
        '**Foreign currency.** Export earnings pay for imported machinery and technology the economy cannot make itself, which raises capacity too.',
        '**Competition.** Firms that sell abroad must match the best producers anywhere, which pushes their productivity up.',
      ] },
      { type: 'paragraph', text: `The strategy has a weakness built into it. Growth that depends on foreign demand stops when that demand does: a downturn in the economies that buy the exports, a rise in the exchange rate or new trade barriers abroad all reach the exporter's output directly.` },
    ],
    realExample: { emoji: '🚢', text: `South Korea, Taiwan and Singapore grew rapidly for decades by making manufactures for world markets rather than only for their own households, and Vietnam has since followed a similar route with electronics assembly.` },
    misconception: `Students define export-led growth as "exporting more than you import". It is about what DRIVES growth, not the trade balance: an exporter importing components and machinery on a large scale can run a trade deficit while its growth is still led by exports.`,
    examMatters: `An Explain question on why trade matters for growth wants the reason, not a list of exporters: name one mechanism — market size, scale, foreign currency for capital goods — and follow it to higher output (Appendix 6: a two-stage chain for a reason).`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Loriana\'s electronics firms win large new orders from abroad. Complete the reasoning:',
      template: [
        'Because the orders come from abroad, they add to spending on Loriana\'s output as an ___.',
        'Longer production runs let firms benefit from ___, which cuts their average cost.',
        'The foreign currency earned can pay for imported ___, which raises capacity as well as output.',
      ],
      answers: ['injection', 'economies of scale', 'capital goods'],
      hints: ['the opposite of a withdrawal such as saving or imports', 'what falls as output grows when the business is bigger', 'machinery and equipment used to make other things'],
      distractors: ['withdrawal', 'diseconomies of scale', 'consumer goods'],
    }),
  };
})();

/* ══ Chapter 2 — The Causes of Potential Growth (1d, 1e) ════════════════════ */

const investmentAndFDI = (() => {
  const sid = subId('investment-and-fdi');
  return {
    id: sid,
    title: 'Domestic Investment and FDI',
    keyIdea: 'Investment adds to the stock of capital, so the same workers can produce more. It raises demand today and capacity tomorrow.',
    body: [
      { type: 'paragraph', text: `**Domestic investment** is spending by firms on capital goods — factories, machinery, vehicles, software. Each addition to the capital stock gives workers more and better tools, so the economy can produce more: long-run AS shifts right and the frontier moves out.` },
      { type: 'paragraph', text: `**Foreign direct investment (FDI)** is investment by a firm based abroad in productive assets it controls — building a plant, buying a controlling stake in a local firm. As a cause of potential growth it adds to capacity like domestic investment, and it often brings two things with it that local firms could not easily supply:` },
      { type: 'bullets', items: [
        '**Technology and methods** the host economy did not have, which local suppliers and workers learn from.',
        '**Finance on a scale** domestic savings could not provide, so projects happen that otherwise would not.',
      ] },
      { type: 'paragraph', text: `Investment works on both sides of the economy, at different times. The spending is part of AD the moment it happens, so it adds to actual growth now. The capacity it creates arrives only when the plant opens, which is when it adds to potential growth.` },
      { type: 'paragraph', text: `Not every inflow counts. A foreign buyer purchasing an existing office block changes who owns it, not what the economy can produce.` },
    ],
    realExample: { emoji: '🔬', text: `Penang in Malaysia hosts semiconductor plants built by foreign firms such as Intel. They brought capital, production methods and training that grew a cluster of local suppliers around them.` },
    misconception: `Students treat any money arriving from abroad as investment that raises growth. What raises capacity is new productive assets. Buying shares with no control adds no machine, and a foreign takeover of an existing firm adds capacity only if the new owner then invests or brings better methods.`,
    examMatters: `When a question names FDI, say which side of the economy you are on. The spending raises AD now; the plant raises capacity later. Mixing the two in one sentence loses the chain Appendix 6 asks an Analyse answer for.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by whether it raises Loriana\'s capacity or changes ownership only:',
      groups: [
        { name: 'Raises capacity', items: ['A Japanese car maker builds a new assembly plant in Loriana', 'A local bank installs software that processes loans twice as fast', 'A shipping line from abroad adds cranes to an under-equipped port'], why: 'Each adds new capital that lets the same workers produce more, which is what shifts long-run AS.' },
        { name: 'Changes ownership only', items: ['A foreign pension fund buys shares in a Lorianan supermarket chain', 'An investor from abroad buys an existing office tower'], why: 'Nothing new is built or installed; the same assets produce the same output under a different owner.' },
      ],
    }),
  };
})();

const innovation = (() => {
  const sid = subId('innovation');
  return {
    id: sid,
    title: 'Innovation',
    keyIdea: 'Innovation is putting new ideas to work — new products and new processes. A new process lets the same resources produce more.',
    body: [
      { type: 'paragraph', text: `**Innovation** is the commercial use of a new idea. It comes in two forms that matter differently for growth:` },
      { type: 'bullets', items: [
        '**Process innovation** — a new way of making an existing good or delivering a service. Output per worker rises, so capacity rises with no extra workers or machines.',
        '**Product innovation** — a new good or service. It creates new markets and new spending, and often a new industry of suppliers around it.',
      ] },
      { type: 'paragraph', text: `Of the four causes of potential growth, innovation is the one without an obvious limit. An economy can only add so many workers, and piling ever more machines onto the same workers yields less and less from each one. A better method of production can be used again and again without being used up.` },
      { type: 'paragraph', text: `Innovation depends on the other causes. It usually needs investment to put it to use, skilled workers to operate it, and competition to force firms to adopt it instead of waiting. That is why the causes are best explained as linked rather than as a list.` },
    ],
    realExample: { emoji: '📱', text: `Mobile money services such as M-Pesa in Kenya let traders and farmers pay, get paid and save by phone without a bank branch nearby. The same people could now trade with customers they could not reach before.` },
    misconception: `Students equate innovation with new gadgets. Much of the innovation that raises growth is invisible to consumers — a better way of routing deliveries, scheduling a factory or approving a loan — and it raises output per worker without any new product appearing.`,
    examMatters: `If you use innovation as your cause of potential growth, name the process and the output it raises. "Technology improves" is an assertion; "a faster loading method lets the same dock workers handle more containers" is a chain.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each innovation by whether it is mainly a new PRODUCT or a new PROCESS:',
      groups: [
        { name: 'Process innovation', items: ['A garment factory switches to computer-guided cutting that wastes less cloth', 'A courier firm uses software to plan routes that save a third of the driving', 'A hospital introduces a scheduling system that treats more patients a day'], why: 'Each produces something that already existed, with fewer resources per unit — output per worker rises.' },
        { name: 'Product innovation', items: ['A food firm launches a drink that did not exist before', 'A bank offers a savings account that works only through a phone'], why: 'Each is a new thing to buy. It creates new demand and new markets rather than a cheaper way to make an old one.' },
      ],
    }),
  };
})();

const labourForce = (() => {
  const sid = subId('labour-force-and-net-migration');
  return {
    id: sid,
    title: 'A Growing Labour Force and Net Migration',
    keyIdea: 'More people able and willing to work means more potential output. Net migration is one of the ways the labour force grows.',
    body: [
      { type: 'paragraph', text: `The **labour force** is everyone of working age who is either in work or looking for it. If it grows, the economy can produce more even with unchanged technology and capital per worker, so potential output rises.` },
      { type: 'paragraph', text: `It can grow in three ways:` },
      { type: 'bullets', items: [
        '**Natural increase** — more young people reaching working age than older people retiring.',
        '**Higher participation** — more of the existing population choosing to work, for example as childcare becomes easier to find.',
        '**Net migration** — more workers arriving from abroad than leaving. Migrants of working age add to the labour force at once, without the years of schooling a new generation needs first.',
      ] },
      { type: 'paragraph', text: `In ${yr(3)} Loriana has ${mn(E.workers)} workers. A labour force growing ${pct(E.labourGrowth)} a year adds about ${Math.round((E.nextWorkers - E.workers) * 1e6).toLocaleString('en-GB')} people a year able to produce.` },
      { type: 'paragraph', text: `A larger labour force raises TOTAL output. Whether it raises output per person — the thing that decides living standards — depends on how productive the extra workers are and how much capital each one has.` },
    ],
    realExample: { emoji: '🏗️', text: `In Gulf economies such as Qatar and the United Arab Emirates, migrant workers make up the great majority of the labour force. Construction and services there could not have been staffed from the national population alone.` },
    misconception: `Students assume a bigger labour force automatically raises living standards. It raises total real GDP, but if the extra workers have less capital each, or are less productive, real GDP per head can stay flat or even fall.`,
    examMatters: `Name the cause precisely: this cause is growth in the SIZE of the labour force, including net migration. An answer about better-trained workers is making the productivity point, which is a different cause.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Two economies each have 10 million workers. In Economy X, 200,000 more people arrive to work than leave. In Economy Y, the same workers learn to produce more each hour. Complete:',
      template: [
        'Economy X\'s potential output grows because of ___.',
        'Economy Y\'s potential output grows because of higher ___.',
        'Only Y is certain to raise real output per ___.',
      ],
      answers: ['net migration', 'productivity', 'worker'],
      hints: ['arrivals minus departures', 'output for each unit of input', 'what the total is divided by in Y\'s case'],
      distractors: ['natural increase', 'participation', 'firm'],
    }),
  };
})();

const competition = (() => {
  const sid = subId('degree-of-competition');
  return {
    id: sid,
    title: 'The Degree of Competition',
    keyIdea: 'Where firms face strong competition, they must cut costs and improve products to survive, which raises the economy\'s capacity over time.',
    body: [
      { type: 'paragraph', text: `The **degree of competition** is how strongly firms in a market are pressed by rivals. It is a cause of potential growth because it changes what firms do with the resources they have.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Rivals can take customers', subtitle: 'a firm that does not improve loses sales' },
        { title: 'Firms cut waste and adopt better methods', subtitle: 'costs fall and productivity rises' },
        { title: 'Weaker firms shrink or exit', subtitle: 'their workers and capital move to better users' },
        { title: 'Capacity rises', subtitle: 'the same resources produce more' },
      ] },
      { type: 'paragraph', text: `Where competition is weak — a protected monopoly, a market closed to imports — a firm can survive while producing inefficiently, and has little reason to spend on new methods. Its workers and machines produce less than they could.` },
      { type: 'paragraph', text: `Governments raise the degree of competition by removing barriers to entry, opening markets to trade and acting against firms that collude. Topic 2.3.6 treats these as supply-side policies; here the point is the mechanism they rely on.` },
    ],
    realExample: { emoji: '📶', text: `When India opened its mobile telecoms market to new entrants, competition drove call and data prices down sharply and pushed operators to extend their networks to millions of new customers.` },
    misconception: `Students treat competition as something that only lowers prices for consumers. The growth effect is on the SUPPLY side: firms pressed by rivals become more productive, which is why the degree of competition is listed as a cause of potential growth.`,
    examMatters: `Competition as a cause needs its mechanism spelled out, because on its own it sounds like a market-structure point. Link it to productivity or innovation, then to capacity, then to long-run AS.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each market change to the way it raises capacity:',
      pairs: [
        { left: 'A state airline loses its monopoly on domestic routes', right: 'It must cut costs or lose passengers to new carriers', why: 'The threat of losing customers is what forces a former monopolist to use its resources better.' },
        { left: 'Tariffs on imported steel are removed', right: 'Local mills must match foreign producers\' efficiency', why: 'Opening to trade brings the most efficient producers anywhere into the market, raising the bar for local firms.' },
        { left: 'The least efficient bakeries in a town close after a rival opens', right: 'Their premises and staff move to more productive uses', why: 'Exit is part of the mechanism: resources leave firms that used them badly.' },
      ],
    }),
  };
})();

const productivity = (() => {
  const sid = subId('productivity-and-the-growth-rate');
  return {
    id: sid,
    title: 'Productivity and the Rate of Growth',
    keyIdea: 'Productivity is output per worker. Over the long run it decides how fast potential output grows — and small differences compound into large ones.',
    body: [
      { type: 'paragraph', text: `**Labour productivity** is output per worker (or per worker-hour). Capacity is the number of workers times what each can produce. In ${yr(3)} Loriana's ${mn(E.workers)} workers each produce ${usd(E.outputPerWorker)} a year: ${mn(E.workers)} × ${usd(E.outputPerWorker)} = ${bn(E.capacityCheck)}, its potential output.` },
      { type: 'paragraph', text: `Next year the labour force grows ${pct(E.labourGrowth)} and productivity grows ${pct(E.productivityGrowth)}, so capacity becomes ${mn(E.nextWorkers)} × ${usd(E.nextOutputPerWorker)} = ${bn2(E.nextCapacity)}: growth of ${E.capacityGrowth.toFixed(2)}%, almost exactly its ${pct(E.trendRate)} trend. Four fifths of it came from productivity.` },
      { type: 'paragraph', text: `That is why productivity matters so much for the **rate** of growth. The labour force can only grow so fast. Productivity growth has no such ceiling, and it compounds:` },
      { type: 'bullets', items: [
        `At about ${pct(E.capacityGrowth)} a year, output doubles in about ${Math.round(E.doublingFast)} years.`,
        `If productivity growth halved to ${pct(E.slowProductivity)}, growth would be about ${pct(E.slowRate)} and doubling would take about ${Math.round(E.doublingSlow)} years.`,
      ] },
      { type: 'paragraph', text: `The other causes — investment, innovation, a skilled labour force and competition — mostly raise growth BY raising productivity, which is why it is the thread that links them.` },
    ],
    realExample: { emoji: '🇯🇵', text: `Japan's working-age population has been shrinking for decades, so most of its growth has had to come from raising output per worker rather than from adding workers.` },
    misconception: `Students write that productivity rises when people work longer hours. Longer hours raise output per worker per year but not output per HOUR. Productivity growth that lasts comes from better tools, skills and methods, not from more hours.`,
    examMatters: `Calculate questions on productivity are multi-stage (Appendix 6): workers times output per worker gives capacity, and the percentage change gives growth. Show each stage, because marks follow the workings.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy has 5 million workers each producing $30,000 a year. Complete:',
      template: [
        'Its productive capacity is $___bn.',
        'If output per worker rises 3% and the labour force does not change, capacity becomes $___bn.',
        'The growth came entirely from higher ___.',
      ],
      answers: ['150', '154.5', 'productivity'],
      hints: ['multiply the number of workers by what each produces', 'with no extra workers, capacity grows at the same rate as output per worker', 'output per worker'],
      distractors: ['35', '153', 'employment'],
    }),
  };
})();

/* ══ Chapter 3 — The Benefits of Growth (2a) ═════════════════════════════════ */

const livingStandardsUnemployment = (() => {
  const sid = subId('living-standards-and-unemployment');
  return {
    id: sid,
    title: 'Living Standards and Unemployment',
    keyIdea: 'Growth in real output raises the goods and services available per person, and firms producing more need more workers.',
    body: [
      { type: 'paragraph', text: `**Higher living standards.** When real GDP grows faster than the population, real output per head rises: on average each person has more goods and services. That is the most direct benefit of growth and the reason governments pursue it. How far a rise in real GDP per head reflects living standards — distribution, leisure, the quality of what is produced — is topic 2.3.1's question.` },
      { type: 'paragraph', text: `**Lower unemployment.** Firms hire workers because they want to produce. When real output grows, firms need more workers, so unemployment tends to fall.` },
      { type: 'paragraph', text: `The link depends on how fast output grows compared with the economy's capacity. In ${yr(2)} and ${yr(3)} Loriana grew ${g(3)} a year — positive growth, but below its ${pct(E.trendRate)} trend. Productivity growth meant firms could produce that extra output without hiring everyone the growing labour force added, so unemployment rose. When growth rose to ${g(4)} a year from ${yr(4)}, unemployment fell.` },
      { type: 'paragraph', text: `So the benefit is not "growth reduces unemployment" in all cases: growth reduces unemployment when it is fast enough to absorb both the new workers and the productivity gains.` },
    ],
    realExample: { emoji: '🇸🇬', text: `Singapore went from the income per head of a developing economy to among the highest in the world within two generations, as decades of rapid growth raised real output per person.` },
    misconception: `Students write that any positive growth lowers unemployment. Growth below the rate at which capacity is growing can leave unemployment RISING, because productivity and a growing labour force let output rise without enough extra jobs.`,
    examMatters: `For living standards, say "real GDP per head" rather than "GDP": the two words that are missing are exactly the two that make the benefit true.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Each economy grows. Sort them by what is most likely to happen to unemployment:',
      groups: [
        { name: 'Unemployment likely to fall', items: ['Growth is well above its trend rate for three years in a row', 'Output rises quickly as idle factories reopen after a downturn'], why: 'Output is rising faster than capacity, so firms must take on more workers to produce it.' },
        { name: 'Unemployment may rise', items: ['Growth is positive but well below its trend rate', 'Output rises slowly while new machines let each worker produce much more'], why: 'Capacity and output per worker are rising faster than output, so firms can meet demand without hiring the workers the economy is adding.' },
      ],
    }),
  };
})();

const firmsProfitsInvestment = (() => {
  const sid = subId('profits-and-investment');
  return {
    id: sid,
    title: 'Profits and Investment',
    keyIdea: 'Growing incomes mean growing sales, so profits rise; and firms expecting demand to keep growing invest to meet it.',
    body: [
      { type: 'paragraph', text: `**Increased profits for firms.** As real incomes rise, households spend more, so most firms sell more. Because many costs — premises, equipment, management — do not rise in step with sales, profit per unit tends to rise as well as total profit.` },
      { type: 'paragraph', text: `**Higher levels of investment.** Firms invest when they expect the extra capacity to be used and paid for. Growth supplies both conditions: rising sales make expansion necessary, and rising profits provide the retained earnings to fund it and the confidence to borrow.` },
      { type: 'paragraph', text: `The two benefits feed each other, and they feed back into growth. Investment is a component of AD, so it adds to output as it is spent; and the new capital adds to capacity when it is installed. Faster growth today tends to raise potential growth tomorrow.` },
      { type: 'paragraph', text: `Growth does not benefit every firm equally. When growth runs ahead of capacity, wages and input prices rise, squeezing margins; growing markets attract new entrants and imports; and firms whose products people buy less of as they get richer can see sales fall.` },
    ],
    realExample: { emoji: '📈', text: `Share prices of retailers, banks and builders tend to move with forecasts of economic growth, because investors know those firms' profits depend on how fast household incomes rise.` },
    misconception: `Students assume growth is good news for every firm. Rising wages and material costs, new rivals attracted by the growing market, and falling demand for goods people buy less of as incomes rise can all leave individual firms worse off.`,
    examMatters: `An Examine answer on the benefits for firms needs a chain AND a brief assessment (Appendix 6). The assessment is usually that costs rise too, or that the benefit depends on the kind of good the firm sells.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Loriana\'s economy grows quickly for three years. Sort each firm by what growth is likely to do to its profits:',
      groups: [
        { name: 'Profits likely to rise', items: ['A chain of restaurants in the capital', 'A car dealership selling mid-priced models', 'A builder of new apartment blocks'], why: 'Each sells things households buy more of as their real incomes rise, so sales grow faster than costs.' },
        { name: 'Profits may be squeezed', items: ['A low-cost bus operator whose passengers switch to cars', 'A factory whose skilled workers are being hired away by expanding rivals'], why: 'Growth either moves demand away from what the firm sells or raises what it must pay for inputs — the costs of growth reaching the firm.' },
      ],
    }),
  };
})();

const taxAndPublicServices = (() => {
  const sid = subId('tax-revenues-and-public-services');
  return {
    id: sid,
    title: 'Tax Revenues and Public Services',
    keyIdea: 'Growth raises tax revenue without any rise in tax rates, which lets a government improve public services without taking a bigger share of incomes.',
    body: [
      { type: 'paragraph', text: `**Increased tax revenues.** Taxes are levied on incomes, profits and spending, and growth raises all three. So revenue rises even when no tax RATE changes. Loriana collects taxes worth ${pct(E.taxShare)} of GDP: as real GDP grew from ${bn(E.actual[E.at(3)])} in ${yr(3)} to ${bn(E.actual[E.at(4)])} in ${yr(4)}, revenue rose from ${bn(E.taxFrom)} to ${bn(E.taxTo)} with no tax increase at all.` },
      { type: 'paragraph', text: `Some spending falls at the same time. Where a government pays unemployment support, fewer people out of work means less spent on it, so the budget can improve from both sides.` },
      { type: 'paragraph', text: `**Improved public services.** That extra revenue can pay for more and better schools, hospitals, roads and water systems — or the same services with lower tax rates, or less borrowing. Growth is how a government expands public services without asking households to give up a larger share of their income.` },
      { type: 'paragraph', text: `The benefit is possible, not automatic. A government can spend the extra revenue badly, or on things that do not improve services, and some public spending — on pensions, for instance — rises with an ageing population whatever the growth rate.` },
    ],
    realExample: { emoji: '🛣️', text: `Indonesia and India have both used the revenue of growing economies to fund large programmes of road, port and rail building, which then add to the capacity those economies grow from.` },
    misconception: `Students write that tax revenue rises during growth because the government raises taxes. Revenue rises because the tax BASE grows — more income, more profit, more spending — at unchanged rates.`,
    examMatters: `A Calculate question on tax revenue usually gives a share of GDP and two GDP figures. Apply the share to each figure and subtract; say that no tax rate changed, because that is the economics behind the arithmetic.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Taxes in an economy raise 20% of GDP. Real GDP grows from $200bn to $210bn and no tax rate changes. Complete:',
      template: [
        'Tax revenue rises from $40bn to $___bn.',
        'The government\'s revenue grew because its ___ grew, with every rate unchanged.',
        'Spending on unemployment support is likely to ___ at the same time.',
      ],
      answers: ['42', 'tax base', 'fall'],
      hints: ['apply the same share to the new GDP figure', 'the incomes, profits and spending that taxes are charged on', 'fewer people need it when firms are hiring'],
      distractors: ['50', 'tax rate', 'rise'],
    }),
  };
})();

/* ══ Chapter 4 — The Costs of Growth (3a) ════════════════════════════════════ */

const opportunityCosts = (() => {
  const sid = subId('opportunity-costs');
  return {
    id: sid,
    title: 'Opportunity Costs',
    keyIdea: 'Faster growth tomorrow usually means consuming less today: resources used for capital goods are not available for consumer goods.',
    body: [
      { type: 'paragraph', text: `Growth has an **opportunity cost** — what must be given up to get it. An economy at full capacity that wants more capital goods (machines, infrastructure, training) must produce fewer consumer goods now.` },
      { type: 'paragraph', text: `On a frontier with capital goods on one axis and consumer goods on the other, an economy choosing point **B** (more capital goods) rather than point **A** (more consumer goods) gives up consumer goods today. The reward comes later: more capital means a frontier that shifts further out, so future consumption can be higher than it would have been.` },
      { type: 'paragraph', text: `This is a trade-off between **current and future living standards**. Households alive today accept lower consumption so that they, or the next generation, can consume more later. How far to trade one against the other is a judgement, not a calculation, and it is one reason governments and households disagree about how fast to grow.` },
      { type: 'paragraph', text: `The opportunity cost also falls on other uses of resources. Land used for factories is not available for farming or parks; hours spent working are not available for leisure. A rise in real GDP that comes from longer working weeks has been bought with time.` },
    ],
    realExample: { emoji: '🏗️', text: `China's very high rate of investment for several decades meant households consumed a much smaller share of national output than in most economies — a deliberate choice of future capacity over present consumption.` },
    misconception: `Students assume choosing more capital goods leaves living standards permanently lower. It lowers consumption NOW; because the frontier then shifts out further, consumption later can be higher than it would otherwise have been.`,
    examMatters: `Opportunity cost is the cost of growth that needs a diagram most. Two points on one frontier, labelled, with the consumer goods given up marked, earns what a paragraph alone struggles to.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each growth decision to what it costs today:',
      pairs: [
        { left: 'A government builds a new rail line instead of cutting taxes', right: 'Households have less income to spend now', why: 'Resources used for the railway are not available to produce the consumer goods lower taxes would have bought.' },
        { left: 'A family business keeps its profits in the firm to buy machinery', right: 'The owners take less out to spend', why: 'Retained profit invested in capital goods is profit not spent on consumption.' },
        { left: 'Farmland near a city is rezoned for factories', right: 'Less food is grown near the city', why: 'The land cannot be used for both; the forgone crop is the opportunity cost of the factories.' },
        { left: 'Workers take on a second shift to raise output', right: 'Less leisure time', why: 'Output from longer hours is bought with hours no longer free, a cost GDP does not record.' },
      ],
    }),
  };
})();

const environmentalCosts = (() => {
  const sid = subId('environmental-costs');
  return {
    id: sid,
    title: 'Environmental Costs',
    keyIdea: 'Producing more usually means using more resources and creating more waste — unless growth changes HOW goods are produced.',
    body: [
      { type: 'paragraph', text: `**Environmental costs** of growth come in two kinds:` },
      { type: 'bullets', items: [
        '**Pollution** — emissions to air and water, waste and noise. These are external costs: they fall on people other than the producer and are not in the market price.',
        '**Depletion** — using up non-renewable resources such as oil and minerals, or renewable ones faster than they regrow, such as forests and fish stocks.',
      ] },
      { type: 'paragraph', text: `Neither is subtracted from real GDP. A factory that pollutes a river adds its output to GDP and nothing is taken off for the damage, so growth measured by GDP overstates the gain in welfare.` },
      { type: 'paragraph', text: `The link between growth and damage is not fixed. It depends on the resources used per unit of output, which can fall: cleaner technologies, a shift from industry towards services, and regulation can all let output rise while emissions fall. Growth also pays for cleaner technology, which a poorer economy may not be able to afford.` },
      { type: 'paragraph', text: `So the cost is a POSSIBLE cost. Growth driven by heavy industry and fossil fuels is likely to be costly to the environment; growth driven by services and cleaner production need not be.` },
    ],
    realExample: { emoji: '🌫️', text: `Rapid industrial growth in cities such as Delhi and Beijing has been accompanied by severe air pollution. Beijing's air has improved markedly since coal burning and heavy industry were moved out of the city.` },
    misconception: `Students write that growth always harms the environment. The damage depends on what is produced and how: output per unit of resource can rise, and some economies have grown while cutting emissions.`,
    examMatters: `Name the environmental cost precisely — which pollution, which resource — and say why the market does not price it. A general "growth is bad for the planet" earns little in an Examine or Discuss answer.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each consequence of Loriana\'s growth into the kind of environmental cost it is:',
      groups: [
        { name: 'Pollution', items: ['Smog from new power stations drifts over the capital', 'A river downstream of new factories can no longer be fished', 'Landfill sites fill with packaging from rising retail sales'], why: 'Each is waste put into the air, water or land that harms people who did not produce or buy the output.' },
        { name: 'Depletion', items: ['Offshore gas fields are emptied faster to supply industry', 'Forest is cleared for plantations faster than it can regrow'], why: 'Each uses up a resource faster than it can be replaced, leaving less for future production.' },
      ],
    }),
  };
})();

const balanceOfTrade = (() => {
  const sid = subId('balance-of-trade-deficits');
  return {
    id: sid,
    title: 'Balance of Trade Deficits',
    keyIdea: 'Rising incomes pull in imports, and when growth outpaces trading partners\' growth, the balance of trade can fall into deficit.',
    body: [
      { type: 'paragraph', text: `The **balance of trade** is the value of exports of goods and services minus the value of imports. Growth tends to push it towards deficit for three reasons:` },
      { type: 'bullets', items: [
        '**Imports rise with income.** Households spend part of any rise in income on imported goods, and faster-growing firms buy more imported materials and machinery.',
        '**Exports are diverted.** Firms that can sell everything at home in a fast-growing market have less reason to sell abroad.',
        '**Prices rise.** If growth runs ahead of capacity and domestic prices rise faster than trading partners\', exports become less competitive and imports more so.',
      ] },
      { type: 'paragraph', text: `In ${yr(3)} Loriana exported ${bn(E.tradeEarly.X)} and imported ${bn(E.tradeEarly.M)}, a trade surplus of ${bn(E.balanceEarly)}. By ${yr(7)}, after four years of growth above trend, exports were ${bn(E.tradeLate.X)} but imports had risen to ${bn(E.tradeLate.M)}: a **balance of trade deficit** of ${bn(-E.balanceLate)}.` },
      { type: 'paragraph', text: `A deficit has to be financed — by borrowing from abroad or selling assets to foreign owners — so a persistent one can become a constraint on growth itself. Whether it matters depends on what the imports are: machinery that raises capacity is a different matter from consumer goods.` },
    ],
    realExample: { emoji: '🇵🇰', text: `Pakistan has repeatedly seen imports of fuel and machinery surge during spells of rapid growth, widening its trade deficit until foreign currency ran short and growth had to be slowed.` },
    misconception: `Students treat a trade deficit as a sign that an economy is doing badly. During rapid growth it is often the opposite: imports rise BECAUSE incomes and investment are rising. The question is whether it can be financed and whether it persists.`,
    examMatters: `Keep the direction of each effect clear: rising incomes raise imports (M up); diverted output and higher prices lower exports (X down). Both widen the deficit, but by different routes, and an Explain answer should name one fully.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the causal chain from rapid growth to a balance of trade deficit in order, from cause to effect:',
      correctOrder: [
        'Loriana\'s real GDP climbs well above its trend',
        'Shoppers and factories buy more foreign-made goods',
        'Spending abroad outpaces what foreigners spend on Lorianan output',
        'The surplus on traded goods and services turns negative',
      ],
      why: [
        'The chain starts with growth itself: higher real incomes.',
        'Part of every extra dollar of income is spent on imports, and growing firms buy imported inputs.',
        'Exports depend on OTHER economies\' incomes, so they do not rise in step with domestic ones.',
        'When imports outgrow exports for long enough, the balance turns negative.',
      ],
    }),
  };
})();

const increasedInequality = (() => {
  const sid = subId('increased-inequality');
  return {
    id: sid,
    title: 'Increased Inequality',
    keyIdea: 'Growth raises average income, but the gains can go mainly to some people, regions or skills — widening the gap even as most incomes rise.',
    body: [
      { type: 'paragraph', text: `**Increased inequality** is a possible cost of growth: the gap between higher and lower incomes widens. Growth does not arrive evenly.` },
      { type: 'bullets', items: [
        '**By skill.** Growth driven by new technology raises the pay of workers who can use it faster than the pay of those it replaces.',
        '**By ownership.** Rising profits go to those who own firms and shares, who are mostly already better off.',
        '**By region.** Growth concentrates where firms, ports and cities already are, so some regions pull ahead of others.',
      ] },
      { type: 'paragraph', text: `Inequality can widen while nearly everyone gets richer. If the poorest fifth's income rises 5% and the richest fifth's rises 20%, both are better off than before, but the distance between them has grown. Whether that is a cost depends on why inequality matters to you: people judge their living standards partly against others, and a widening gap can weaken support for the policies that sustain growth.` },
      { type: 'paragraph', text: `The cost is not inevitable. Growth that creates many jobs for lower-paid workers, or that is paired with spending on education, can narrow the gap.` },
    ],
    realExample: { emoji: '🗺️', text: `China's rapid growth widened the income gap between its richer coastal provinces and poorer inland ones for many years, even as incomes rose across the country.` },
    misconception: `Students write that if inequality increases, the poor must be worse off. Inequality is about the GAP: the poorest can be better off in absolute terms while their share of total income falls.`,
    examMatters: `Say which kind of inequality you mean — between skills, owners and workers, or regions — and give the mechanism. It turns an assertion into analysis.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'In an economy, the poorest fifth\'s real income rises from $4,000 to $4,200, and the richest fifth\'s from $40,000 to $48,000. Complete, about the poorest fifth and then the two together:',
      template: [
        'Their ___ income has risen, while their share of the total has fallen.',
        'The gap between the two groups has ___.',
        'So growth has made the distribution of income more ___, even though both groups gained.',
      ],
      answers: ['absolute', 'widened', 'unequal'],
      hints: ['measured on its own, not compared with anyone else\'s', 'compare $36,000 with the new difference', 'the opposite of evenly spread'],
      distractors: ['relative', 'narrowed', 'equal'],
    }),
  };
})();

const inflationCost = (() => {
  const sid = subId('inflation-from-growth');
  return {
    id: sid,
    title: 'Inflation',
    keyIdea: 'When aggregate demand grows faster than the economy\'s capacity, firms cannot raise output fast enough, so prices rise instead.',
    body: [
      { type: 'paragraph', text: `**Inflation** is a cost of growth when growth runs faster than capacity. Actual growth driven by rising AD can use up spare capacity; once it is used up, extra demand meets firms that cannot produce more, so they raise prices. This is demand-pull inflation, which topic 2.3.1 defines.` },
      { type: 'paragraph', text: `Rapid growth also raises costs. Firms competing for scarce workers bid up wages, and materials and energy become dearer as more is demanded. Firms pass the higher costs on in prices.` },
      { type: 'paragraph', text: `The inflation in turn damages growth. It erodes the real value of savings and fixed incomes, makes exports less competitive, and — when it is unpredictable — makes firms wary of the long-term investment that future growth depends on. Governments and central banks respond by slowing demand, which slows growth.` },
      { type: 'paragraph', text: `Growth driven by rising capacity has the opposite effect. When potential output grows, the same demand meets a larger capacity and the price level falls, or rises more slowly. That is why the SOURCE of growth decides whether inflation is a cost of it.` },
    ],
    realExample: { emoji: '🇹🇷', text: `Economies that push growth well beyond capacity with cheap credit, as Turkey did, have tended to end up with high inflation and a falling currency, which then forced growth to slow.` },
    misconception: `Students write that economic growth causes inflation. Growth driven by rising capacity can LOWER inflation; it is demand growing faster than capacity that raises the price level.`,
    examMatters: `Tie the inflation cost to capacity every time: "growth above the trend rate uses up spare capacity, so further increases in AD raise the price level" is the chain; "growth causes inflation" is not.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each source of growth by what it is likely to do to inflation:',
      groups: [
        { name: 'Likely to add to inflation', items: ['Credit-fuelled household spending in an economy already at full capacity', 'A surge in government spending when unemployment is already very low'], why: 'Each raises AD when output cannot rise much further, so the extra demand is met by higher prices.' },
        { name: 'Likely to ease inflation', items: ['A wave of investment that doubles the output of the steel industry', 'A new process that lets each factory worker produce a quarter more'], why: 'Each raises capacity, so the same demand meets more supply and upward pressure on prices falls.' },
      ],
    }),
  };
})();

/* ══ Chapter 5 — Output Gaps (4a-4d) ══════════════════════════════════════════ */

const trendGrowth = (() => {
  const sid = subId('actual-growth-and-the-trend');
  return {
    id: sid,
    title: 'Actual Growth and the Long-Term Trend',
    keyIdea: 'The trend rate of growth is how fast potential output grows over the long run. Actual growth is faster in some years and slower in others.',
    body: [
      { type: 'paragraph', text: `The **trend rate of growth** is the average rate at which an economy's real output grows over a long period — in practice, the rate at which its productive capacity grows. Actual growth in any one year can be above or below it.` },
      { type: 'paragraph', text: `Loriana's potential output grows at a steady ${pct(E.trendRate)} a year. Its actual growth does not:` },
      { type: 'bullets', items: [
        `${yr(2)} and ${yr(3)}: ${g(2)} a year — below trend.`,
        `${yr(4)} to ${yr(7)}: ${g(4)} a year — above trend.`,
        `${yr(8)} and ${yr(9)}: ${g(8)} a year — below trend again.`,
      ] },
      { type: 'paragraph', text: `The difference between the actual growth rate and the trend rate tells you which way the economy is moving relative to capacity. Growth below trend means output is falling further behind what the economy could produce, even though it is still growing. Growth above trend means output is catching up with capacity, and can overtake it.` },
      { type: 'paragraph', text: `Over the nine years actual output starts and ends exactly on the trend: the years above and below trend cancel out. That is what "trend" means — the path the ups and downs are around.` },
    ],
    realExample: { emoji: '📉', text: `Many high-income economies have seen their trend rate of growth fall over recent decades as productivity growth slowed, so a growth rate once thought weak is now close to their long-run average.` },
    misconception: `Students assume that positive growth means an economy is doing well against its capacity. Growth of ${g(2)} in an economy whose trend is ${pct(E.trendRate)} loses ground against capacity every year it continues.`,
    examMatters: `When a question gives a growth rate, compare it with the trend before judging it. "Growth slowed from 3.5% to 1.5%" means little until you say whether 1.5% is above or below trend.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy\'s trend rate of growth is 3%. Complete:',
      template: [
        'A year of 1% growth makes the shortfall of output against capacity ___.',
        'In a year when it grows 5%, output moves ___ capacity.',
        'Over many years, actual growth averages out at about ___%.',
      ],
      answers: ['larger', 'towards', '3'],
      hints: ['capacity grows faster than output that year', 'growth faster than capacity closes the distance', 'the long-run rate'],
      distractors: ['smaller', 'away from', '1'],
    }),
  };
})();

const positiveNegativeGaps = (() => {
  const sid = subId('positive-and-negative-output-gaps');
  return {
    id: sid,
    title: 'Positive and Negative Output Gaps',
    keyIdea: 'An output gap is the difference between actual and potential output. Negative means output is below capacity; positive means it is above.',
    body: [
      { type: 'paragraph', text: `The **output gap** is actual real output minus potential output, usually given as a percentage of potential output.` },
      { type: 'bullets', items: [
        `A **negative output gap**: actual output is BELOW potential. In ${yr(3)} Loriana produced ${bn(E.neg.actual)} against a capacity of ${bn(E.neg.potential)} — a gap of ${bn(E.neg.gapBn)}, or ${pct(E.neg.gapPct, { signed: true })}.`,
        `A **positive output gap**: actual output is ABOVE potential. In ${yr(7)} it produced ${bn(E.pos.actual)} against ${bn(E.pos.potential)} — a gap of ${pct(E.pos.gapPct, { signed: true })}.`,
      ] },
      { type: 'paragraph', text: `Output above "potential" sounds impossible, but potential output is what the economy can produce at a sustainable rate of use. For a while it can produce more — overtime, extra shifts, machines run without maintenance, people who would not normally work drawn in. It cannot keep it up, which is why a positive gap does not last.` },
      { type: 'paragraph', text: `The sign of the gap and the growth rate are different things. Loriana's gap was negative in ${yr(3)} while it was growing at ${g(3)}. A negative output gap is not a recession, which topic 2.3.1 defines as two consecutive quarters of negative growth.` },
    ],
    realExample: { emoji: '🧮', text: `International organisations such as the IMF and the OECD publish estimated output gaps for many economies, and central banks use such estimates when deciding whether demand needs to be restrained or supported.` },
    misconception: `Students read a negative output gap as a sign that the economy is shrinking. It means output is below capacity; the economy can be growing, only more slowly than its capacity is.`,
    examMatters: `State the gap with its sign and its reference: "actual output is 2% below potential output" is complete; "the output gap is 2%" leaves the reader to guess the direction.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each economy to its output gap:',
      pairs: [
        { left: 'Capacity $400bn, real GDP $392bn', right: 'Negative gap of 2%', why: 'Actual is below potential by $8bn, which is 2% of $400bn.' },
        { left: 'Capacity $400bn, real GDP $408bn', right: 'Positive gap of 2%', why: 'Actual exceeds potential by $8bn — possible for a while through overtime and extra shifts.' },
        { left: 'Capacity $400bn, real GDP $400bn', right: 'Zero: the two are equal', why: 'Actual output equals potential, so there is no gap.' },
        { left: 'Capacity $400bn, real GDP $380bn', right: 'Negative gap of 5%', why: 'A $20bn shortfall against $400bn of capacity is 5%.' },
      ],
    }),
  };
})();

const positiveGapCharacteristics = (() => {
  const sid = subId('characteristics-of-a-positive-gap');
  return {
    id: sid,
    title: 'Characteristics of a Positive Output Gap',
    keyIdea: 'In a positive output gap, the economy is running hotter than it can sustain: jobs are plentiful, but prices and wages are under upward pressure.',
    body: [
      { type: 'paragraph', text: `A **positive output gap** has a recognisable set of characteristics, all following from demand pressing against capacity:` },
      { type: 'bullets', items: [
        '**Low unemployment and labour shortages.** Firms struggle to recruit and pay overtime to the workers they have.',
        '**Rising inflation.** Demand exceeds what firms can supply at current prices, and wages and input costs rise.',
        '**Very high use of capacity.** Machinery runs continuously, maintenance is postponed, and delivery times lengthen.',
        '**A worsening trade balance.** Domestic firms cannot meet demand, so more of it goes to imports.',
      ] },
      { type: 'paragraph', text: `Several look like success, and in the short run some are: more people are in work and incomes are rising. The problem is that they cannot last. Postponed maintenance and exhausted workers cut future output, and the rising inflation usually leads the central bank to raise interest rates, slowing demand.` },
      { type: 'paragraph', text: `A positive gap is therefore a warning as much as a result. Economies that let it grow large tend to face a sharper slowdown later than those whose output stays close to capacity.` },
    ],
    realExample: { emoji: '👷', text: `As economies reopened after the pandemic, many reported record job vacancies, lengthening delivery times and rising inflation — the signs of demand running ahead of what their capacity could supply.` },
    misconception: `Students treat a positive output gap as good news because output and employment are high. It is output ABOVE what the economy can sustain, and it brings inflation and a slowdown with it.`,
    examMatters: `In a data question, a positive gap is usually shown indirectly — vacancies rising, inflation above target, capacity use at a high. Identify it from the indicators and name the gap.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each indicator by the kind of output gap it points to:',
      groups: [
        { name: 'Positive output gap', items: ['Firms report record difficulty filling vacancies', 'Delivery times lengthen as factories run all night', 'Wage settlements rise faster than a year ago'], why: 'Each shows demand pressing against the economy\'s capacity to supply it.' },
        { name: 'Negative output gap', items: ['Factories run one shift instead of three', 'Firms cut prices to shift unsold stock'], why: 'Each shows capacity going unused because demand is too weak to employ it.' },
      ],
    }),
  };
})();

const negativeGapCharacteristics = (() => {
  const sid = subId('characteristics-of-a-negative-gap');
  return {
    id: sid,
    title: 'Characteristics of a Negative Output Gap',
    keyIdea: 'In a negative output gap, resources stand idle: unemployment is high, inflation is low, and firms have spare capacity.',
    body: [
      { type: 'paragraph', text: `A **negative output gap** has the opposite characteristics, all following from demand too weak to use the economy's capacity:` },
      { type: 'bullets', items: [
        '**Higher unemployment.** Firms produce less than they could, so they need fewer workers.',
        '**Low or falling inflation.** With spare capacity and unsold stock, firms have little power to raise prices and workers little power to push up wages.',
        '**Spare capacity.** Factories run below capacity, offices and shops stand empty.',
        '**Weak investment.** Firms that already have unused machines have little reason to buy more.',
      ] },
      { type: 'paragraph', text: `The cost is output lost for good: Loriana's ${bn(-E.neg.gapBn)} gap in ${yr(3)} is goods and services that were never produced. A long negative gap can also lower capacity itself, as unemployed workers lose skills and firms cancel investment.` },
      { type: 'paragraph', text: `The same fact creates room for growth. An economy with a negative gap can grow faster than its trend for a while without inflation — which is what Loriana did from ${yr(4)} — because AD can rise into the flat range of the Keynesian long-run AS curve.` },
    ],
    realExample: { emoji: '🏚️', text: `After financial crises, many economies have run below capacity for years, with unemployment high, inflation low and investment weak, even as their output slowly recovered.` },
    misconception: `Students write that a negative output gap means prices are falling. Inflation is LOWER than it would be, and may be falling, but the price level usually keeps rising slowly; falling prices are a separate and rarer problem.`,
    examMatters: `The strongest point about a negative gap is that it leaves room: AD can rise without inflation. It is the link between chapter 1's AD-led growth and this chapter, and it is often the evaluation an answer needs.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy has a large negative output gap. Complete the description:',
      template: [
        'Unemployment is likely to be ___ than it would be at full capacity.',
        'Inflation is likely to be ___, because firms cannot easily raise prices.',
        'A rise in aggregate demand is likely to raise real ___ more than prices.',
      ],
      answers: ['higher', 'low', 'output'],
      hints: ['firms producing less need fewer workers', 'spare capacity weakens pricing power', 'there are idle resources to put to work'],
      distractors: ['lower', 'accelerating', 'wages'],
    }),
  };
})();

const measuringGaps = (() => {
  const sid = subId('measuring-output-gaps');
  return {
    id: sid,
    title: 'Why Output Gaps Are Hard to Measure',
    keyIdea: 'Actual output can be measured; potential output cannot be observed, only estimated — so every output gap is an estimate, and estimates differ.',
    body: [
      { type: 'paragraph', text: `An output gap is actual output minus potential output. The first can be measured; the second cannot. **Potential output is never observed** — it is what the economy COULD produce — so it has to be estimated, and every estimate rests on assumptions.` },
      { type: 'bullets', items: [
        '**The trend is uncertain.** Estimates project past growth forward, but the trend rate can change — when productivity growth slows, for example — and the change is only visible years later.',
        '**Data are revised.** First estimates of GDP are often revised, so the actual output figure moves too.',
        '**Hidden slack.** Workers who have given up looking, or who work fewer hours than they want, are spare capacity that unemployment figures miss.',
        '**Methods disagree.** Different statistical methods give different answers for the same year.',
      ] },
      { type: 'paragraph', text: `The size of the error matters. In ${yr(E.judgeYear)} Loriana produced ${bn(E.actual[E.at(E.judgeYear)])}. If capacity has grown at ${pct(E.ESTIMATES[1].rate)} since ${yr(E.refYear)}, the gap is ${pct(E.ESTIMATES[1].gapPct)}. If it has grown at ${pct(E.ESTIMATES[0].rate)}, the gap is ${pct(E.ESTIMATES[0].gapPct, { signed: true })}; at ${pct(E.ESTIMATES[2].rate)}, ${pct(E.ESTIMATES[2].gapPct, { signed: true })}. The same economy could need restraining, nothing, or support.` },
    ],
    realExample: { emoji: '🔍', text: `Estimates of output gaps made at the time are often revised substantially once later data arrive, and the estimates published by different official bodies for the same economy and year can disagree on whether the gap was positive or negative.` },
    misconception: `Students treat the output gap as a figure that is measured like GDP. Only actual output is measured; potential output is an estimate, so a gap reported to one decimal place carries far more uncertainty than it appears to.`,
    examMatters: `Measurement difficulty is the evaluation most output-gap questions invite. Name one specific difficulty and say what it does to a policy decision — a gap wrongly estimated as negative invites stimulus into an economy already at capacity.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each difficulty to how it can mislead an estimate of the output gap:',
      pairs: [
        { left: 'Productivity growth has quietly slowed', right: 'Capacity is overstated, so the gap looks more negative than it is', why: 'An estimate that projects the old, faster trend forward puts potential output too high.' },
        { left: 'Many part-time workers want full-time hours', right: 'Spare capacity is missed, so the gap looks smaller than it is', why: 'Underemployed workers are unused labour that the unemployment rate does not count.' },
        { left: 'Last year\'s GDP is later revised up', right: 'Actual output was higher, so the gap was less negative', why: 'A revision moves the measured half of the calculation, not only the estimated half.' },
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [actualAndPotential, actualFromAD, exportLed],
    takeaway: [
      'Actual growth is more real output; potential growth is more capacity.',
      'Actual growth from spare capacity moves from inside the PPF towards it.',
      'Any AD component can cause actual growth, while spare capacity lasts.',
      'Export-led growth is driven by world demand, and depends on it.',
    ],
  },
  {
    title: B2,
    subs: [investmentAndFDI, innovation, labourForce, competition, productivity],
    takeaway: [
      'Four causes: investment and FDI, innovation, the labour force, competition.',
      'Investment raises AD when it is spent and capacity when it is installed.',
      'A bigger labour force raises total output; per head depends on productivity.',
      'Productivity growth decides the long-run rate, and it compounds.',
    ],
  },
  {
    title: B3,
    subs: [livingStandardsUnemployment, firmsProfitsInvestment, taxAndPublicServices],
    takeaway: [
      'Six possible benefits, from living standards to public services.',
      'Growth lowers unemployment only when it outpaces capacity growth.',
      'Profits and investment rise together, and investment feeds future growth.',
      'Tax revenue rises with the tax base, with no rise in tax rates.',
    ],
  },
  {
    title: B4,
    subs: [opportunityCosts, environmentalCosts, balanceOfTrade, increasedInequality, inflationCost],
    takeaway: [
      'Five possible costs: opportunity, environment, trade, inequality, inflation.',
      'More capital goods now means fewer consumer goods now, and more later.',
      'Rising incomes pull in imports, pushing the balance of trade into deficit.',
      'Inflation is a cost when demand outgrows capacity, not of growth as such.',
    ],
  },
  {
    title: B5,
    subs: [trendGrowth, positiveNegativeGaps, positiveGapCharacteristics, negativeGapCharacteristics, measuringGaps],
    takeaway: [
      'The trend rate is how fast capacity grows over the long run.',
      'Output gap = actual minus potential output, as a share of potential.',
      'Positive gap: labour shortages and inflation. Negative: idle resources.',
      'Potential output is estimated, never observed, so every gap is uncertain.',
    ],
  },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);
export const BLOCKS = BLOCK_PLAN.map((b) => b.title);

/** `diagramIds[title]` is a diagram id, or `null` for "decided: no diagram" (packet 2.91). */
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
 * THE LEAF MAP, BY HAND. 23 leaves at `econ_spec.txt:1099-1125`, every one named against the
 * subsection that teaches it. The runner asserts this map against `audit/raw/spec-items.json`.
 */
export const LEAF_MAP = {
  'ECON-2.3.5-1a': ['actual-and-potential-growth'],
  'ECON-2.3.5-1b': ['actual-growth-from-aggregate-demand'],
  'ECON-2.3.5-1c': ['export-led-growth'],
  'ECON-2.3.5-1d-1': ['investment-and-fdi'],
  'ECON-2.3.5-1d-2': ['innovation'],
  'ECON-2.3.5-1d-3': ['labour-force-and-net-migration'],
  'ECON-2.3.5-1d-4': ['degree-of-competition'],
  'ECON-2.3.5-1e': ['productivity-and-the-growth-rate'],
  'ECON-2.3.5-2a-1': ['living-standards-and-unemployment'],
  'ECON-2.3.5-2a-2': ['living-standards-and-unemployment'],
  'ECON-2.3.5-2a-3': ['profits-and-investment'],
  'ECON-2.3.5-2a-4': ['profits-and-investment'],
  'ECON-2.3.5-2a-5': ['tax-revenues-and-public-services'],
  'ECON-2.3.5-2a-6': ['tax-revenues-and-public-services'],
  'ECON-2.3.5-3a-1': ['opportunity-costs'],
  'ECON-2.3.5-3a-2': ['environmental-costs'],
  'ECON-2.3.5-3a-3': ['balance-of-trade-deficits'],
  'ECON-2.3.5-3a-4': ['increased-inequality'],
  'ECON-2.3.5-3a-5': ['inflation-from-growth'],
  'ECON-2.3.5-4a': ['actual-growth-and-the-trend'],
  'ECON-2.3.5-4b': ['positive-and-negative-output-gaps'],
  'ECON-2.3.5-4c': ['characteristics-of-a-positive-gap', 'characteristics-of-a-negative-gap'],
  'ECON-2.3.5-4d': ['measuring-output-gaps'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, TITLED WITH THE BLOCK TITLE (depth.notes-titles
 * by construction). Notes ship from the `data` column, so a `?draft=1` walk shows these only after
 * publication; verify them against the `draft` column.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const NOTES = [
  {
    title: B1,
    meta: '2.3.5 · 1a-1c',
    keyIdea: 'Two kinds of growth, one picture of each, and what drives the first.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Actual growth</strong> — an increase in real GDP.'),
        def('<strong>Potential growth</strong> — an increase in productive capacity: the real output possible with all resources employed.'),
        def('<strong>Export-led growth</strong> — growth driven mainly by rising exports.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('<strong>On the PPF</strong> — actual growth from spare capacity is a move from inside the frontier towards it; potential growth shifts the frontier out; a move along it is reallocation.'),
        mech(`<strong>AD = C + I + G + (X − M)</strong> — ${bn(E.C)} + ${bn(E.I)} + ${bn(E.G)} + (${bn(E.X)} − ${bn(E.M)}) = ${bn(E.AD)} in Loriana, ${yr(3)}.`),
        mech('<strong>Three ranges</strong> — on a Keynesian long-run AS curve, extra AD raises output where the curve is flat, output and prices where it rises, and only prices where it is vertical.'),
        mech('<strong>Why trade matters</strong> — a bigger market, economies of scale, foreign currency for capital goods, and competition.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('The multiplier behind the size of an AD shift is topic 2.3.4.'),
        link('Chapter 2 is what makes potential output grow.'),
      ] },
    ],
  },
  {
    title: B2,
    meta: '2.3.5 · 1d, 1e',
    keyIdea: 'The four causes of potential growth, and the productivity thread that links them.',
    blocks: [
      { title: 'THE FOUR CAUSES', items: POTENTIAL_CAUSES.map((c) => def(`<strong>${cap(c.replace(/\.$/, ''))}</strong>`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Investment, twice</strong> — the spending is AD now; the new capital is capacity when installed. FDI adds technology and finance local firms lack.'),
        mech('<strong>Process innovation</strong> — the same resources produce more, and an idea is not used up.'),
        mech('<strong>Net migration</strong> — adds working-age people at once. Total output rises; output per head depends on productivity.'),
        mech('<strong>Competition</strong> — rivals force firms to cut waste and adopt better methods; weak firms exit.'),
        mech(`<strong>Productivity</strong> — ${mn(E.workers)} × ${usd(E.outputPerWorker)} = ${bn(E.capacityCheck)}. With ${pct(E.labourGrowth)} more workers and ${pct(E.productivityGrowth)} more output each, capacity grows about ${pct(E.capacityGrowth)} and doubles in about ${Math.round(E.doublingFast)} years.`),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('The shapes of the long-run AS curve are topic 2.3.3.'),
        link('Chapter 3 is what growth brings; chapter 4 what it costs.'),
      ] },
    ],
  },
  {
    title: B3,
    meta: '2.3.5 · 2a',
    keyIdea: 'Six possible benefits, in three linked pairs.',
    blocks: [
      { title: 'THE SIX', items: BENEFITS.map((b) => def(`<strong>${cap(b.replace(/\.$/, ''))}</strong>`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Per head</strong> — living standards rise when real GDP grows faster than the population.'),
        mech(`<strong>Jobs follow output</strong> — but growth below trend (${g(3)} against ${pct(E.trendRate)}) can leave unemployment rising.`),
        mech('<strong>Profits then investment</strong> — rising sales raise profits, and firms expecting growth invest, which adds to capacity.'),
        mech(`<strong>The tax base</strong> — at ${pct(E.taxShare)} of GDP, revenue rose from ${bn(E.taxFrom)} to ${bn(E.taxTo)} with no rise in tax rates.`),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('Whether real GDP per head measures living standards is topic 2.3.1.'),
        link('Every benefit is POSSIBLE: chapter 4 is what can offset it.'),
      ] },
    ],
  },
  {
    title: B4,
    meta: '2.3.5 · 3a',
    keyIdea: 'Five possible costs, each with the condition under which it bites.',
    blocks: [
      { title: 'THE FIVE', items: COSTS.map((c) => def(`<strong>${cap(c.replace(/\.$/, ''))}</strong>`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Current against future</strong> — more capital goods now means fewer consumer goods now and a frontier further out later.'),
        mech('<strong>Environment</strong> — pollution and depletion are not subtracted from GDP; the damage per unit of output can fall.'),
        mech(`<strong>Trade</strong> — imports rise with income: Loriana's ${bn(E.balanceEarly)} surplus in ${yr(3)} became a ${bn(-E.balanceLate)} deficit by ${yr(7)}.`),
        mech('<strong>Inequality</strong> — the gap can widen while nearly everyone gets richer.'),
        mech('<strong>Inflation</strong> — when AD grows faster than capacity; capacity-led growth eases it.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('Demand-pull inflation is defined in topic 2.3.1.'),
        link('Chapter 5 is how to tell whether growth is running ahead of capacity.'),
      ] },
    ],
  },
  {
    title: B5,
    meta: '2.3.5 · 4a-4d',
    keyIdea: 'Actual against trend, the sign of the gap, what each gap looks like, and why it is an estimate.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Trend rate of growth</strong> — the long-run growth rate of potential output: ${pct(E.trendRate)} a year in Loriana.`),
        def('<strong>Output gap</strong> — actual output minus potential output, as a percentage of potential.'),
        def('<strong>Negative output gap</strong> — actual output below potential. <strong>Positive output gap</strong> — actual output above it.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`<strong>Below trend, gap widens</strong> — ${g(3)} growth took Loriana to ${bn(E.neg.actual)} against ${bn(E.neg.potential)} in ${yr(3)}: ${pct(E.neg.gapPct, { signed: true })}.`),
        mech(`<strong>Above trend, gap closes and turns</strong> — ${g(4)} a year took it to ${pct(E.pos.gapPct, { signed: true })} by ${yr(7)}.`),
        mech('<strong>Positive gap</strong> — labour shortages, rising inflation, capacity at full stretch, imports rising.'),
        mech('<strong>Negative gap</strong> — unemployment, low inflation, idle capacity, weak investment.'),
        mech(`<strong>An estimate</strong> — assume a ${pct(E.ESTIMATES[0].rate)}, ${pct(E.ESTIMATES[1].rate)} or ${pct(E.ESTIMATES[2].rate)} trend and ${yr(E.judgeYear)}'s gap is ${pct(E.ESTIMATES[0].gapPct, { signed: true })}, ${pct(E.ESTIMATES[1].gapPct)} or ${pct(E.ESTIMATES[2].gapPct, { signed: true })}.`),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('A negative gap is not a recession: recession, two consecutive quarters of negative growth, is topic 2.3.1.'),
        link('What governments do about a gap is topic 2.3.6.'),
      ] },
    ],
  },
];
