/**
 * PACKET 46 — growth-development teaching content. Seven blocks in the specification's own order,
 * thirty-four subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1899-1968`. The live section was three blocks of two subsections each
 * (structure-04): "Growth vs Development", "Development Strategies" — a two-way market/intervention
 * split that dropped the spec's "other strategies" and "international institutions" (structure-09,
 * topFix-02) — and "Sustainability", which is 0 hits in the Economics specification (topFix-04). The
 * rebuild follows the specification's own lettering, so the Learn tab, the Notes tab and every
 * diagram use one map of the topic (structure-06):
 *
 *   1  Measuring Development                               1a, 1b, 1c              4 subsections
 *   2  Constraints: Commodities, Savings and Currency      2a-1 .. 2a-5            5
 *   3  Constraints: People, Debt, Credit and Infrastructure 2a-6 .. 2a-10          5
 *   4  Non-Economic Constraints                            2b-1 .. 2b-5            3
 *   5  Market-Orientated Strategies                        3a-1 .. 3a-6            5
 *   6  Interventionist Strategies                          3b-1 .. 3b-6            6
 *   7  Other Strategies and International Institutions     3c-1 .. 3c-5, 3d-1 .. 3d-3  6
 *
 * Seven is the ceiling, not a choice: the pre-test takes three unpinned items and each chapter's
 * check-in one more, and `FREE_QUIZ_MAX` is 10 (`lib/preview-limits.js:62`).
 *
 * ── THE CONTRADICTION topFix-05 NAMED ─────────────────────────────────────────
 *
 * The live block 1 said "growth is necessary but not sufficient for development" and, a paragraph
 * later, that targeted health and education spending "can improve development outcomes even at
 * relatively low GDP levels". `growth-and-development` says what both halves support: sustained
 * growth makes lasting development far easier to pay for, and it neither guarantees development nor
 * is its only route. Its misconception names the contradiction so a student meets it refuted.
 */
import {
  SECTION, subId, id, ECON, bn, pct, ix, money,
} from './_packet46-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);
const kg = (p) => `$${p.toFixed(2)}`;

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position.
 * `shuffled` is never written: the renderer ignores it and CONTENT-GATE says to delete it.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'Measuring Development';
export const B2 = 'Constraints: Commodities, Savings and Currency';
export const B3 = 'Constraints: People, Debt, Credit and Infrastructure';
export const B4 = 'Non-Economic Constraints';
export const B5 = 'Market-Orientated Strategies';
export const B6 = 'Interventionist Strategies';
export const B7 = 'Other Strategies and International Institutions';

/* ══ Block 1 — Measuring Development (4.3.6 · 1a, 1b, 1c) ════════════════════ */

const growthAndDevelopment = (() => {
  const sid = subId('growth-and-development');
  return {
    id: sid,
    title: 'Growth and Development',
    keyIdea: 'Economic growth is a rise in real output. Economic development is a rise in the quality of people\'s lives, which growth can help pay for but does not guarantee.',
    body: [
      { type: 'paragraph', text: '**Economic growth** is an increase in real GDP: more goods and services produced. **Economic development** is broader — longer and healthier lives, more schooling, higher incomes shared across the population, and more freedom to choose how to live. The topic covers developing, emerging and developed economies, because every economy has both a growth rate and a level of development.' },
      { type: 'paragraph', text: 'The two are linked in both directions. Growth raises the tax revenue a government can spend on clinics and schools, and the income households can spend on food and housing. Development feeds back: healthier, better-educated workers produce more.' },
      { type: 'paragraph', text: 'The link is not automatic, so state it carefully. Growth does not guarantee development: if the extra income goes to a few, output can rise while most lives barely change. Nor is development wholly waiting on growth: cheap public-health measures and schooling can lengthen and improve lives at low incomes. What holds is that sustained growth makes lasting development far easier to pay for.' },
    ],
    realExample: { emoji: '🌍', text: 'Oil made Equatorial Guinea\'s income per head one of the highest in Africa, yet on health and schooling it ranks far below what that income would predict. Sri Lanka has long had longer lives and more schooling than its income per head would suggest.' },
    misconception: 'Students write that growth is "necessary" for development and then, a paragraph later, that health and schooling improved in a poor economy without much growth. Both cannot be true. Write that growth helps pay for development and is neither a guarantee of it nor its only route.',
    examMatters: 'Appendix 6 gives Define 2 marks. For economic development the two parts are an improvement in living standards and welfare, and a measure beyond income, such as life expectancy or schooling. "A rise in GDP" alone defines growth, not development.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change into economic growth or economic development:',
      groups: [
        { name: 'Economic growth', items: ['Car factories turn out 5% more vehicles than last year', 'A new copper mine adds to the value of output at constant prices', 'Hotels sell more nights to visitors, measured in real terms'], why: 'Each is a rise in the quantity of goods and services produced — real output — whatever it does to people\'s lives.' },
        { name: 'Economic development', items: ['Children in rural areas stay in school three years longer', 'Fewer babies die before their first birthday', 'Households in a slum are connected to piped water'], why: 'Each improves the quality of people\'s lives directly — health, schooling, living conditions — whether or not output has risen.' },
      ],
    }),
  };
})();

const hdiComponents = (() => {
  const sid = subId('hdi-components');
  return {
    id: sid,
    title: 'The HDI: Three Components and How They Are Measured',
    keyIdea: 'The HDI combines health, education and income, each scaled from 0 to 1 between two goalposts and then averaged, so one number summarises human development.',
    body: [
      { type: 'paragraph', text: 'The **Human Development Index (HDI)**, published by the United Nations Development Programme, combines three components, each measured by an indicator:' },
      { type: 'bullets', items: [
        '**Health**: life expectancy at birth.',
        '**Education**: mean years of schooling of adults aged 25 and over, and expected years of schooling for a child starting school.',
        '**Income**: gross national income (GNI) per head, at purchasing power parity (PPP), so that a dollar buys the same amount everywhere.',
      ] },
      { type: 'paragraph', text: `Each indicator becomes an index between 0 and 1 by placing it between a minimum and a maximum "goalpost". For health the goalposts are ${E.leMin} and ${E.leMax} years, so ${E.country}'s life expectancy of ${E.lifeExp} gives (${E.lifeExp} − ${E.leMin}) ÷ (${E.leMax} − ${E.leMin}) = ${ix(E.healthIx)}. Its education index is ${ix(E.eduIx)}, and its income index, measured on a log scale, is ${ix(E.incomeIx)}.` },
      { type: 'paragraph', text: `The HDI is the **geometric mean** of the three: the cube root of their product. For ${E.country}, ∛(${ix(E.healthIx)} × ${ix(E.eduIx)} × ${ix(E.incomeIx)}) = ${ix(E.hdi)}. A geometric mean punishes a weak dimension, so short lives cannot be made up for with high income. Scores of 0.800 and above count as very high human development; below 0.550, low.` },
    ],
    realExample: { emoji: '📊', text: 'Switzerland and Norway usually sit at the top of the HDI table, above 0.95; Niger, Chad and South Sudan sit near the bottom, at around 0.4.' },
    misconception: 'Students list GDP per head as the income dimension. The HDI uses GNI per head at purchasing power parity, adjusted for what money buys at home, on a log scale, so an extra $1,000 counts for more in a poor country than in a rich one.',
    examMatters: 'A Define of the HDI earns its 2 marks (Appendix 6) from a composite index and its three components. "Health, education and wealth" loses the third: the HDI measures income, not wealth.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each HDI dimension to the statistic that measures it:',
      pairs: [
        { left: 'Health', right: 'A baby born this year can expect to reach 68', why: 'Life expectancy at birth is the health indicator.' },
        { left: 'Education, looking back', right: 'People aged 25 or older spent 7 years in school on average', why: 'Mean years of schooling measures the schooling adults actually received.' },
        { left: 'Education, looking ahead', right: 'A six-year-old can expect 13 years in the classroom', why: 'Expected years of schooling measures what today\'s children are likely to get.' },
        { left: 'Income', right: 'Earnings per person, adjusted for local prices, come to $4,200', why: 'GNI per head at purchasing power parity is the income indicator.' },
      ],
      distractors: ['Total output of the economy rose by 4% this year'],
    }),
  };
})();

const hdiStrengthsLimits = (() => {
  const sid = subId('hdi-strengths-limits');
  return {
    id: sid,
    title: 'Advantages and Limitations of the HDI',
    keyIdea: 'The HDI compares living standards more fully than income alone, but it is an average, it leaves out much that matters, and its data are weakest where development is lowest.',
    body: [
      { type: 'paragraph', text: 'The HDI\'s **advantages** for comparing living standards between countries and over time: it goes beyond income, so a country that turns income into long lives and schooling ranks higher than one that does not; it uses data most countries collect; the same 0-to-1 scale applies to every country and can be tracked from one report to the next; and the geometric mean stops one strong dimension hiding a weak one.' },
      { type: 'paragraph', text: 'Its **limitations**:' },
      { type: 'bullets', items: [
        'It is an average: two countries with the same HDI can differ hugely in how evenly income, health and schooling are shared.',
        'It leaves things out — political freedom, safety, the environment, unpaid work, and the quality rather than the years of schooling.',
        'Its data are weakest where development is lowest: births, deaths and incomes go unrecorded, and GNI misses the informal economy.',
        'Over time, a change in the method or the goalposts can move a score with nothing changing on the ground.',
      ] },
      { type: 'paragraph', text: 'So the HDI is strongest for broad comparisons, such as a country near 0.9 against one near 0.4, and weakest for ranking two countries a few thousandths apart or for saying who inside a country has gained.' },
    ],
    realExample: { emoji: '🗺️', text: 'India\'s national HDI hides a wide gap between its states: Kerala\'s life expectancy and literacy are close to those of far richer countries, while states such as Bihar lag well behind.' },
    misconception: 'Students treat a rise in the HDI as proof that everyone is better off. It is a national average, so it can rise because the better-off live longer and earn more while the poorest are unchanged.',
    examMatters: 'An Examine on the HDI (8 marks, Appendix 6) wants advantages and limitations weighed, not listed. Tie each to the comparison asked: between countries, the averaging and the data bite; over time, changes in the method do.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement about the HDI into an advantage or a limitation for comparing living standards:',
      groups: [
        { name: 'Advantage', items: ['A country that turns modest earnings into long lives scores well', 'Every country is placed on one common scale', 'High income cannot disguise poor schooling'], why: 'Each is a reason the HDI compares lives better than income per head does.' },
        { name: 'Limitation', items: ['A rise can come entirely from the richest fifth', 'Nothing in it reflects whether people can vote freely', 'Deaths in remote villages may never be recorded'], why: 'Each is a way the single number can mislead about how people actually live.' },
      ],
    }),
  };
})();

const otherMeasures = (() => {
  const sid = subId('other-measures');
  return {
    id: sid,
    title: 'Other Measures of Development',
    keyIdea: 'Six single indicators — farm labour, clean water, energy use, internet, mobile phones and doctors — each show one part of development the HDI misses or measures indirectly.',
    body: [
      { type: 'paragraph', text: 'The specification names six other measures of development. Each is a single statistic, easy to collect and compare, and each tracks something the HDI does not:' },
      { type: 'bullets', items: [
        '**The percentage of adult male labour in agriculture**: the higher it is, the less the economy has moved from farming into industry and services, where output per worker is higher.',
        '**Access to clean water**: the share of people with safe drinking water, which cuts disease and frees the hours spent fetching it.',
        '**Energy consumption per capita**: rises with industry, transport and household appliances.',
        '**Access to internet per thousand of population**: connection to information, markets and services.',
        '**Access to mobile phones per thousand of population**: in many poor economies, the first link to banking and prices.',
        '**Access to doctors per thousand of population**: the capacity of the health system.',
      ] },
      { type: 'paragraph', text: 'Their strength is that each is concrete and specific; their weakness is that each shows only one part of the picture. A country can have many mobile phones and few doctors. Used together, and alongside the HDI, they show where development is lagging.' },
    ],
    realExample: { emoji: '📱', text: 'In Kenya, mobile phones spread far faster than bank branches, so mobile phones per thousand of population say more about access to payments there than the number of banks does.' },
    misconception: 'Students treat high energy consumption per capita as automatically good. It measures industrial and household activity, not wellbeing: a cold country uses more per person than a warm one at the same living standard, and waste raises it too.',
    examMatters: 'A 4-mark Explain on an indicator (Appendix 6) needs its link to development, not only its name: say what a rise shows about people\'s lives, then why it may overstate or understate development.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each indicator to the gap in development it would reveal:',
      pairs: [
        { left: 'Adult male labour in agriculture', right: 'Most men still work small plots with hand tools', why: 'A high share in farming shows the economy has not yet moved into higher-output sectors.' },
        { left: 'Access to clean water', right: 'Families walk an hour for water that makes children ill', why: 'Safe water is about disease and time, both part of living standards.' },
        { left: 'Doctors per thousand of population', right: 'One clinic serves a whole district and has no physician', why: 'It measures the health system\'s capacity rather than health itself.' },
        { left: 'Internet access per thousand of population', right: 'Farmers cannot check crop prices in city markets online', why: 'Connection to information and markets is what internet access tracks.' },
      ],
      distractors: ['The country\'s total exports fell last year'],
    }),
  };
})();

/* ══ Block 2 — Constraints: Commodities, Savings and Currency (2a-1 .. 2a-5) ═ */

const commodityPrices = (() => {
  const sid = subId('commodity-prices');
  return {
    id: sid,
    title: 'Volatility of Commodity Prices',
    keyIdea: 'An economy that earns most of its export revenue from one or two commodities sees its income, tax revenue and investment swing with their world prices.',
    body: [
      { type: 'paragraph', text: 'Commodity prices — copper, oil, coffee, cocoa — swing sharply because both demand and supply are price inelastic in the short run: a mine or a coffee tree cannot change its output quickly, and buyers cannot quickly do without. A small shift in demand, or a poor harvest, moves the price a long way.' },
      { type: 'paragraph', text: `The damage is done by the **volatility of commodity prices**, not only by low prices. In ${E.country}, copper earns ${pct(E.copperShare * 100)} of export revenue. A ${pct(E.copperFall)} fall in its world price cuts export earnings by ${pct(E.copperShare * 100)} × ${pct(E.copperFall)} = ${pct(E.exportFallPct)}: ${bn(E.exportFallBn)} of the ${bn(E.exports)} it earns abroad.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'The world copper price falls', subtitle: 'Demand weakens abroad' },
        { title: 'Export earnings drop', subtitle: 'By the share times the fall' },
        { title: 'Tax revenue and incomes fall', subtitle: 'The government cuts spending' },
        { title: 'Investment is postponed', subtitle: 'Growth slows' },
      ] },
      { type: 'paragraph', text: 'Because nobody can predict the next swing, planning is hard. Projects started in a boom are abandoned in the slump, and a government that borrowed against high prices must cut spending when they fall.' },
    ],
    realExample: { emoji: '⛏️', text: 'Zambia earns most of its export revenue from copper and Nigeria most of its from oil; when those world prices fall, government budgets and the value of each currency fall with them.' },
    misconception: 'Students write that a commodity exporter is harmed only when prices are low. A boom also does harm when it ends: spending and borrowing are planned on boom revenues, and it is the swing that makes planning impossible.',
    examMatters: 'An Analyse needs linked stages (Appendix 6). From a price fall, go through export earnings, then tax revenue or incomes, then investment — and use the commodity\'s share of exports to size the effect.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the price fall to the slower growth:',
      correctOrder: [
        'The world price of cocoa drops by a third in a single season',
        'Export earnings shrink, since cocoa is most of what the country sells abroad',
        'Farmers\' incomes drop and the government collects less tax revenue from the trade',
        'Planned roads and processing plants are postponed, so the economy grows more slowly',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the price, set on world markets outside the country\'s control.',
        'With cocoa most of its exports, a lower price means much lower export earnings.',
        'Less revenue from the crop means lower incomes for growers and less tax for the state.',
        'With less income and revenue, investment is put off, and growth slows.',
      ],
    }),
  };
})();

const prebischSinger = (() => {
  const sid = subId('prebisch-singer');
  return {
    id: sid,
    title: 'Primary Product Dependency: Prebisch-Singer',
    keyIdea: 'The Prebisch-Singer hypothesis says primary product prices tend to fall relative to manufactures over time, so a primary exporter must sell ever more to buy the same imports.',
    body: [
      { type: 'paragraph', text: '**Primary product dependency** means relying on unprocessed goods — crops, minerals, fuels — for most export earnings. The **Prebisch-Singer hypothesis** argues that this is a trap as well as a risk: over the long run, the prices of primary products tend to fall relative to the prices of manufactured goods and services.' },
      { type: 'paragraph', text: 'Two reasons are given. As world incomes rise, spending on food and raw materials rises more slowly than spending on manufactures and services, because demand for primary products is income inelastic. And manufacturers can turn productivity gains into higher profits and wages, while competitive commodity markets pass gains on as lower prices.' },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'World incomes rise', subtitle: 'Spending shifts to manufactures' },
        { title: 'Primary prices fall relatively', subtitle: 'Income inelastic demand' },
        { title: 'Terms of trade decline', subtitle: 'Exports buy fewer imports' },
        { title: 'Capital goods cost more exports', subtitle: 'Investment is harder to afford' },
      ] },
      { type: 'paragraph', text: `The result is a decline in primary exporters' **terms of trade**: the price of exports relative to the price of imports. If ${E.country}'s export price index falls to ${E.exportPriceIx} while its import price index rises to ${E.importPriceIx}, its terms of trade are ${E.exportPriceIx} ÷ ${E.importPriceIx} × 100 = ${E.tot}, so each tonne of copper buys a quarter less imported machinery. How the terms of trade are calculated in general is topic 4.3.2.` },
    ],
    realExample: { emoji: '🍫', text: 'Ghana and Côte d\'Ivoire grow most of the world\'s cocoa but receive only a small part of what finished chocolate sells for; the processing, branding and retailing happen mainly in richer economies.' },
    misconception: 'Students say Prebisch-Singer means commodity prices always fall. It is a long-run tendency in RELATIVE prices, with booms along the way. A commodity boom does not refute it; a decades-long rise in commodity prices relative to manufactures would.',
    examMatters: 'The specification names the hypothesis in 2a, so use the name. An Explain earns its application from a figure: a lower terms of trade index shows the country must export more to buy the same imports.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the Prebisch-Singer argument in order, from rising world incomes to the dearer machinery:',
      correctOrder: [
        'Households around the world grow richer and spend the extra mostly on manufactured goods',
        'Demand for tea and metals grows only slowly, so their prices slide relative to factory goods',
        'A tonne of the country\'s tea buys fewer imported goods, and its terms of trade decline',
        'Each new tractor from abroad now takes more tea to pay for, so farms buy fewer of them',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The argument begins with rising world incomes, spent mostly away from primary products.',
        'Income inelastic demand means primary prices lag behind manufactures.',
        'Relatively cheaper exports and dearer imports are a fall in the terms of trade.',
        'Capital goods cost more exports, which holds back investment.',
      ],
    }),
  };
})();

const harrodDomar = (() => {
  const sid = subId('harrod-domar');
  return {
    id: sid,
    title: 'The Savings Gap: Harrod-Domar',
    keyIdea: 'In the Harrod-Domar model, growth equals the savings ratio divided by the capital-output ratio, so a country that saves too little cannot invest enough to grow fast.',
    body: [
      { type: 'paragraph', text: 'The **Harrod-Domar model** explains growth by investment. Savings fund investment; investment adds to the stock of capital; more capital produces more output; higher output raises incomes, and part of those incomes is saved again.' },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Savings', subtitle: 'Income not spent' },
        { title: 'Investment', subtitle: 'Savings lent to firms' },
        { title: 'A larger capital stock', subtitle: 'Machines, roads, power' },
        { title: 'Higher output and income', subtitle: 'Some of it saved again' },
      ] },
      { type: 'paragraph', text: `The model fits in one line: growth rate = savings ratio ÷ capital-output ratio. The capital-output ratio is how many dollars of capital it takes to produce a dollar of output a year. ${E.country} saves ${pct(E.s)} of GDP and needs $${E.k} of capital per $1 of output, so it grows at ${E.s} ÷ ${E.k} = ${pct(E.g)}. Its population grows ${pct(E.popGrowth)} a year, so income per head rises only about ${pct(E.perHead)} a year.` },
      { type: 'paragraph', text: `To grow at ${pct(E.gTarget)} it would need to save ${E.gTarget} × ${E.k} = ${pct(E.sNeeded)} of GDP. The difference, ${E.savingsGap} percentage points or about ${bn(E.savingsGapBn)} a year, is the **savings gap**. Poor households save little because most income goes on necessities, which is why the model points to foreign savings: FDI, aid and borrowing.` },
    ],
    realExample: { emoji: '🏗️', text: 'South Korea and Singapore saved and invested around a third or more of their GDP for decades while growing fast, the pattern the model predicts.' },
    misconception: 'Students treat the model as a complete theory of growth. It assumes the capital-output ratio is fixed and that savings are invested productively. Capital without skilled workers to run it, or lost to corruption, adds to the capital stock on paper and to output far less.',
    examMatters: 'A Calculate (4) on Harrod-Domar earns its marks from shown workings (Appendix 6): state g = s ÷ k, substitute, give the growth rate, and where population growth is given, subtract it for growth per head.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Use the Harrod-Domar model to complete the working for a new country:',
      template: [
        'It saves 15% of GDP with a capital-output ratio of 3, so it grows at ___ a year.',
        'To grow at 7% a year instead, it would need to save ___ of GDP.',
        'If its capital-output ratio rose to 4 with saving unchanged, its growth rate would ___.',
      ],
      answers: ['5%', '21%', 'fall'],
      hints: ['the savings ratio divided by the capital-output ratio', 'the target growth rate times the capital-output ratio', 'more capital is now needed for each dollar of output'],
      distractors: ['45%', '18%', 'rise'],
    }),
  };
})();

const foreignCurrencyGap = (() => {
  const sid = subId('foreign-currency-gap');
  return {
    id: sid,
    title: 'The Foreign Currency Gap',
    keyIdea: 'A foreign currency gap opens when a country cannot earn enough foreign currency from exports to pay for the imports and debt payments its growth needs.',
    body: [
      { type: 'paragraph', text: 'Growth in a developing economy needs imports it cannot yet make for itself: machinery, fuel, medicines, spare parts. They are paid for in foreign currency, usually dollars, which the country earns mainly by exporting.' },
      { type: 'paragraph', text: `The **foreign currency gap** is the shortfall between the foreign currency a growth plan needs and the foreign currency the country earns. ${E.country} earns ${bn(E.exports)} a year from exports, but its plan needs ${bn(E.importNeeds)} of imports: a gap of ${bn(E.fxGap)}. FDI, aid or borrowing abroad can fill it; otherwise it closes the hard way, by cutting imports and the investment that needed them.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Export earnings are low', subtitle: 'A few low-value exports' },
        { title: 'Imports cannot be paid for', subtitle: 'Machinery and fuel are rationed' },
        { title: 'Investment projects stall', subtitle: 'Factories lack equipment' },
        { title: 'Growth slows', subtitle: 'Exports stay low' },
      ] },
      { type: 'paragraph', text: 'It reinforces the savings gap: a country that saved enough in its own currency still could not turn those savings into imported machines without dollars. Other constraints feed it — a fall in commodity prices cuts export earnings, and debt payments abroad use up foreign currency before any imports are bought.' },
    ],
    realExample: { emoji: '⛽', text: 'Sri Lanka once ran so short of foreign currency that it could not pay for enough imported fuel and medicines; queues for petrol stretched for kilometres and hospitals postponed operations.' },
    misconception: 'Students confuse the foreign currency gap with the savings gap. The savings gap is too little saving in the country\'s own currency; the foreign currency gap is too little foreign currency to buy imports. A country can close one and still face the other.',
    examMatters: 'In an Analyse, tie the gap to a specific import: without dollars a power station cannot import its turbines, so electricity stays short and firms cannot expand. That chain is analysis; "the country lacks money" is not.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each constraint to the situation that shows it:',
      pairs: [
        { left: 'The savings gap', right: 'Households spend almost all their income on food and rent', why: 'Too little is saved at home to fund the investment growth needs.' },
        { left: 'The foreign currency gap', right: 'A factory has the local money for a new machine but no dollars to import it', why: 'The shortfall is in foreign currency, which only exports, inflows or borrowing abroad supply.' },
        { left: 'Capital flight', right: 'Wealthy families move their deposits into accounts overseas', why: 'Savings leave the country instead of being invested in it.' },
        { left: 'Commodity price volatility', right: 'Export earnings swing by a fifth from one year to the next', why: 'Unstable world prices make export revenue unstable.' },
      ],
    }),
  };
})();

const capitalFlight = (() => {
  const sid = subId('capital-flight');
  return {
    id: sid,
    title: 'Capital Flight',
    keyIdea: 'Capital flight is money moved out of a country by its own residents, taking savings and foreign currency that could have funded investment at home.',
    body: [
      { type: 'paragraph', text: '**Capital flight** is a large outflow of money by a country\'s own residents and firms: deposits moved to foreign banks, export profits kept abroad, wealth taken out before the currency falls. It happens when people fear their money is unsafe at home — from inflation, a collapsing currency, confiscation, political instability or taxes they want to avoid.' },
      { type: 'paragraph', text: `It hits growth twice. Savings that leave cannot fund domestic investment, so the savings gap widens; and they leave as foreign currency, so the foreign currency gap widens too. In ${E.country}, ${pct(E.flightPct)} of GDP — ${bn(E.flightBn)} a year — leaves this way. With a capital-output ratio of ${E.k}, investing it at home would add ${E.flightPct} ÷ ${E.k} = ${E.flightGrowthLost} percentage points a year to growth.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Confidence falls', subtitle: 'Fear of inflation or instability' },
        { title: 'Residents move money abroad', subtitle: 'Deposits and profits leave' },
        { title: 'Savings and foreign currency drain', subtitle: 'Both gaps widen' },
        { title: 'Investment and growth fall', subtitle: 'Which confirms the fear' },
      ] },
      { type: 'paragraph', text: 'It can feed on itself: an outflow weakens the currency and the banks, which gives the remaining savers a reason to leave too. Tackling it means removing the reason to flee — stable prices, secure property, honest government — rather than only banning transfers.' },
    ],
    realExample: { emoji: '💵', text: 'When confidence in Argentina\'s peso has collapsed, households have repeatedly turned their savings into US dollars, held abroad or as cash at home, rather than keep them in Argentine banks.' },
    misconception: 'Students treat capital flight as foreign investors leaving. The term is used above all for a country\'s own residents moving their savings out, which is why it drains domestic savings as well as foreign currency.',
    examMatters: 'Capital flight is a constraint here (2a) and, in 4.3.3, a factor moving floating exchange rates. In a development answer keep the chain on savings and investment; in an exchange-rate answer, on the supply of the currency.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the loss of confidence to the fall in investment:',
      correctOrder: [
        'Rumours of a coming currency collapse spread, and confidence among savers drains away',
        'Business owners transfer their deposits abroad into dollar accounts',
        'Banks at home have fewer savings to lend, and dollars drain out of the country',
        'Firms cancel expansion plans for lack of finance, so investment falls',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The trigger is fear about the safety of money kept at home.',
        'Fear turns into action: savings are moved abroad.',
        'Money that leaves is lost to domestic lending and to the country\'s foreign currency.',
        'With less finance available, firms invest less and growth slows.',
      ],
    }),
  };
})();

/* ══ Block 3 — Constraints: People, Debt, Credit and Infrastructure (2a-6 .. 2a-10) ═ */

const demographicFactors = (() => {
  const sid = subId('demographic-factors');
  return {
    id: sid,
    title: 'Demographic Factors',
    keyIdea: 'The size and age distribution of a population, and migration, decide how many people each worker supports and how fast income per head can rise.',
    body: [
      { type: 'paragraph', text: `**Demographic factors** are the size of the population, its age distribution and migration. A fast-growing population means output must grow just as fast for income per head to stand still: ${E.country}'s ${pct(E.g)} growth and ${pct(E.popGrowth)} population growth leave about ${pct(E.perHead)} a year for rising living standards.` },
      { type: 'paragraph', text: `The age distribution acts through the **dependency ratio**: the number of people under 15 and over 64 for every 100 of working age. In ${E.country}, ${E.under15}% are under 15, ${E.working}% are aged 15 to 64 and ${E.over64}% are over 64, so the ratio is (${E.under15} + ${E.over64}) ÷ ${E.working} × 100 = ${E.dependency}. Each worker's output supports almost one dependant, and school places for so many children absorb savings that could have built factories.` },
      { type: 'paragraph', text: 'A young population can become an advantage later: as birth rates fall, today\'s children become a large working-age population with fewer dependants, if there are jobs and skills for them. Developed economies face the reverse — an ageing population and fewer workers for each pensioner. Migration changes both size and structure; chapter 4 returns to it.' },
    ],
    realExample: { emoji: '👶', text: 'Niger has one of the youngest populations in the world, with around half its people under 15; Japan has one of the oldest, with close to three in ten over 65.' },
    misconception: 'Students say a large population is always a constraint. What constrains is fast growth relative to output and a high dependency ratio; a large working-age population with jobs and skills is a source of growth.',
    examMatters: 'When data are given, show the dependency ratio as a calculation — (young + old) ÷ working age × 100 — and then say what it means for saving and public spending. The figure without the consequence is description, not analysis.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work out the dependency ratio for a different country:',
      template: [
        'It has 30% of its people under 15 and 10% over 64, so ___ of them are of working age.',
        'Its dependency ratio is then about ___ dependants per hundred of working age.',
        'A steady fall in the birth rate would make this ratio ___ over the next fifteen years.',
      ],
      answers: ['60%', '67', 'shrink'],
      hints: ['what is left after the young and the old', 'young plus old, divided by working age, times a hundred', 'fewer young dependants for each worker'],
      distractors: ['40%', '150', 'grow'],
    }),
  };
})();

const debt = (() => {
  const sid = subId('debt');
  return {
    id: sid,
    title: 'Debt: Household and Overseas',
    keyIdea: 'Debt constrains development when repayments absorb the income, tax revenue or foreign currency that would otherwise pay for consumption, public services and investment.',
    body: [
      { type: 'paragraph', text: 'The specification names two kinds of debt. **Household debt** is what families owe, often to moneylenders at high interest where banks do not reach. Repayments cut what is left for food, school fees and medicine, and one bad harvest can turn a loan into a debt that is never cleared.' },
      { type: 'paragraph', text: `**Overseas debt** is what a country's government and firms owe abroad, usually in dollars. It must be serviced — interest paid and loans repaid — in foreign currency. ${E.country} pays ${bn(E.debtService)} a year on its overseas debt, ${pct(E.debtServiceShare)} of its ${bn(E.exports)} export earnings, before a single machine or medicine is imported.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Overseas debt is serviced', subtitle: 'Interest and repayments in dollars' },
        { title: 'Foreign currency is used up', subtitle: 'Less left for imports' },
        { title: 'Public spending is squeezed', subtitle: 'Tax revenue goes to creditors' },
        { title: 'Health, schools and roads suffer', subtitle: 'Development slows' },
      ] },
      { type: 'paragraph', text: 'The burden grows if the currency falls, because the same dollar debt costs more in local money, or if world interest rates rise. Borrowing is not the problem in itself: a loan that builds a port earning more than its interest pays for itself. Debt constrains when its cost exceeds what it produced.' },
    ],
    realExample: { emoji: '🏦', text: 'Before the Heavily Indebted Poor Countries initiative cancelled much of their debt, several African governments were spending more on servicing overseas debt than on health care.' },
    misconception: 'Students treat all overseas borrowing as harmful. A loan that finances an investment earning more than its interest raises growth; debt constrains when it funds consumption or failed projects and must still be repaid.',
    examMatters: 'When an extract gives debt service as a share of export earnings, use it: it shows how much foreign currency is gone before imports are paid for, which is the application an Analyse needs.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the debt payments to the effect on development:',
      correctOrder: [
        'Every year the government must service its overseas loans in dollars',
        'Much of the country\'s foreign currency goes to creditors, leaving little for imports',
        'The finance ministry cuts public spending to keep up the payments',
        'Rural clinics close and new schools go unbuilt, so development slows',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the obligation: payments due abroad, in foreign currency.',
        'Dollars paid to creditors are dollars not available for imports.',
        'Tax revenue used for repayments cannot be spent at home.',
        'Cuts fall on the services that make up development.',
      ],
    }),
  };
})();

const creditBanking = (() => {
  const sid = subId('credit-and-banking');
  return {
    id: sid,
    title: 'Access to Credit and Banking',
    keyIdea: 'Without banks to collect savings and lend them, households cannot save safely and small firms cannot borrow to grow, so savings sit idle and good projects go unfunded.',
    body: [
      { type: 'paragraph', text: 'A banking system does two jobs a developing economy needs: it gathers many small savings safely, and it lends them to people with projects. Where most people have no bank account and no **access to credit and banking**, both jobs fail.' },
      { type: 'paragraph', text: 'Savings are kept as cash, livestock or jewellery, where they earn nothing and fund nothing. Small firms and farmers cannot borrow to buy a machine, seed or stock, because they have no collateral — no land title or formal records — for a bank to lend against. Those who must borrow turn to moneylenders at very high interest.' },
      { type: 'paragraph', text: 'This is the savings gap seen from below: even the saving that does happen fails to reach investment. Mobile banking and microfinance, a strategy in chapter 5, are two answers.' },
    ],
    realExample: { emoji: '📲', text: 'In Kenya, M-Pesa lets people save, send and receive money by mobile phone without a bank account; within a few years most adults were using it, in a country where bank branches are scarce outside the towns.' },
    misconception: 'Students write that poor people cannot save. Many save a great deal relative to income; what they lack is a safe place that pays interest and a channel that turns those savings into loans for someone else.',
    examMatters: 'For an Explain (4, Appendix 6), link credit to investment in two stages: no collateral, so no bank loan; no loan, so no machine and no rise in output. "A lack of banks" with no investment link is a single assertion.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each problem to the reason it holds back investment:',
      pairs: [
        { left: 'No land title', right: 'A farmer has nothing a bank will accept as security', why: 'Collateral is what lets a bank lend to someone it does not know.' },
        { left: 'Wealth held as goats and gold', right: 'Value that exists but cannot be lent to anyone else', why: 'Savings outside a bank never reach a borrower with a project.' },
        { left: 'Moneylenders\' interest', right: 'Only projects with enormous returns are worth borrowing for', why: 'Very high interest rules out ordinary productive investment.' },
        { left: 'No bank branch within a day\'s travel', right: 'Depositing a small sum costs more than it would earn', why: 'Distance makes formal saving too costly for small amounts.' },
      ],
    }),
  };
})();

const infrastructure = (() => {
  const sid = subId('infrastructure');
  return {
    id: sid,
    title: 'Infrastructure',
    keyIdea: 'Poor roads, ports, power and water raise every firm\'s costs and cut people off from markets, so infrastructure gaps hold back investment across the whole economy.',
    body: [
      { type: 'paragraph', text: '**Infrastructure** is the physical capital an economy shares: roads, railways, ports, power, water and telecommunications. It is a constraint when it is missing or unreliable, because it raises the cost of everything else:' },
      { type: 'bullets', items: [
        'Unreliable power forces firms to run diesel generators or stop work.',
        'Poor roads raise transport costs and cut farmers off from city markets, so crops rot or sell for less.',
        'Congested ports delay exports and imports, tying up money in goods waiting on the dock.',
        'No piped water or sanitation spreads disease and takes hours of work each day.',
      ] },
      { type: 'paragraph', text: 'Infrastructure is expensive, lasts decades and pays back slowly, which is why private firms rarely build it alone and poor governments, short of savings and foreign currency, struggle to. Its absence also deters FDI: a foreign firm choosing where to build looks first at power, ports and roads. Chapter 6 turns it into a strategy.' },
    ],
    realExample: { emoji: '💡', text: 'South Africa\'s rolling power cuts, known as load-shedding, have forced factories, mines and shops to stop work or run their own generators for hours at a time.' },
    misconception: 'Students list infrastructure as a constraint without the mechanism. Say which cost it raises, for whom: a missing road raises a farmer\'s transport cost and lowers the price she receives, which weakens her incentive to grow more.',
    examMatters: 'Infrastructure appears twice in 4.3.6: as a constraint (2a) and as an interventionist strategy (3b). In a constraints answer explain the cost; in a strategies answer weigh the benefit against the cost, the time and the financing.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each problem by the kind of infrastructure missing: transport, or power and water:',
      groups: [
        { name: 'Transport', items: ['Tomatoes rot on a farm because the track floods every wet season', 'Containers wait three weeks at the quay before unloading', 'A bus to the district market takes most of a day'], why: 'Each is about moving goods or people — roads, ports and vehicles.' },
        { name: 'Power and water', items: ['A textile mill loses a shift whenever the grid fails', 'Girls spend hours each morning carrying buckets from a well', 'A clinic cannot keep vaccines cold overnight'], why: 'Each is about a utility piped or wired to homes and firms.' },
      ],
    }),
  };
})();

const educationSkills = (() => {
  const sid = subId('education-skills');
  return {
    id: sid,
    title: 'Education and Skills',
    keyIdea: 'A workforce with little schooling and few skills produces little per worker, cannot run modern equipment and deters firms that need trained staff.',
    body: [
      { type: 'paragraph', text: '**Education and skills** set how much each worker can produce. Where many adults have had only a few years of school, literacy and numeracy are low, and the skills to operate, maintain or manage modern equipment are scarce.' },
      { type: 'paragraph', text: 'This constrains growth in three ways. Output per worker stays low, so incomes stay low. Imported machinery is underused because too few people can run and repair it, so the capital-output ratio is worse than it need be. And foreign firms that need trained workers build elsewhere.' },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Few years of schooling', subtitle: 'Low literacy and numeracy' },
        { title: 'Low skills in the workforce', subtitle: 'Machines underused' },
        { title: 'Low output per worker', subtitle: 'Low wages and profits' },
        { title: 'Little saved or invested', subtitle: 'Too little to pay for schooling' },
      ] },
      { type: 'paragraph', text: 'It is also a cycle: poor households need children to work, so they leave school early; low-skilled adults earn little, so they cannot pay for their own children\'s schooling. The quality of what is taught matters as much as the years spent in class.' },
    ],
    realExample: { emoji: '📚', text: 'Surveys in several low-income countries have found many children who have completed years of primary school still unable to read a simple sentence, which is why years of schooling alone can overstate skills.' },
    misconception: 'Students treat education only as a constraint. The specification also names developing human capital as a strategy (3b): in a constraints answer show how low skills hold output back; in a strategies answer weigh the cost and the long delay.',
    examMatters: 'An Analyse on skills needs the link to output: low skills, so low output per worker, so low incomes and low saving. Two linked stages with a figure from the extract are worth more than a list of reasons.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this cycle in order, from the short schooling to the too-little saving:',
      correctOrder: [
        'Most children leave school after only six years to work on the family farm',
        'Few adults have the skills to read a manual or repair a pump',
        'Each worker produces little, so wages stay low',
        'Families have little left over to save or to pay school fees',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The cycle starts with how long children stay in school.',
        'Short schooling leaves a workforce with few skills.',
        'Low skills mean low output per worker, and low pay.',
        'Low pay leaves nothing to save or to spend on the next generation\'s schooling.',
      ],
    }),
  };
})();

/* ══ Block 4 — Non-Economic Constraints (2b-1 .. 2b-5) ═══════════════════════ */

const corruptionGovernance = (() => {
  const sid = subId('corruption-governance');
  return {
    id: sid,
    title: 'Corruption and Poor Governance',
    keyIdea: 'Corruption and poor governance raise the cost and risk of investing, divert public money from its purpose and weaken the rules that let people trade and invest with confidence.',
    body: [
      { type: 'paragraph', text: '**Corruption** is the abuse of public office for private gain: bribes for licences and contracts, officials skimming public spending, favours for the connected. **Poor governance** is the wider failure of the state to do its job — slow, unreliable courts, contracts that cannot be enforced, property that can be seized, policies that change without warning.' },
      { type: 'paragraph', text: 'Both act as a tax on investment. A firm that must pay bribes for a permit, or cannot rely on a court to enforce a contract, needs a higher expected return before it invests, so less is invested. Public money meant for roads and clinics is diverted, so the same budget buys less. Foreign firms invest elsewhere.' },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Bribes and unreliable courts', subtitle: 'Investing becomes costly and risky' },
        { title: 'Less is invested', subtitle: 'Firms and foreign investors hold back' },
        { title: 'Public money is diverted', subtitle: 'Fewer roads and clinics' },
        { title: 'Growth and development slow', subtitle: 'Resources are wasted' },
      ] },
      { type: 'paragraph', text: 'Corruption also leaves the economy producing inside its production possibility frontier: resources are wasted on bribes and on projects chosen for favours rather than returns.' },
    ],
    realExample: { emoji: '⚖️', text: 'Transparency International\'s Corruption Perceptions Index ranks countries by how corrupt their public sectors are perceived to be; several of the world\'s poorest countries sit near the bottom.' },
    misconception: 'Students treat corruption as a moral point only. The economic case is the mechanism: it raises the cost and risk of investing and diverts resources, so less is produced from the same inputs.',
    examMatters: 'For an Examine, weigh corruption against another constraint: it is hard to measure and some fast-growing economies have had plenty, so ask whether it stops growth or only makes it more costly.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each case into corruption or poor governance:',
      groups: [
        { name: 'Corruption', items: ['An official demands a payment before issuing a trading licence', 'A road contract goes to the minister\'s cousin at twice the cost', 'Customs officers wave goods through in return for cash'], why: 'In each, someone uses public office for private gain.' },
        { name: 'Poor governance', items: ['A contract dispute takes eight years to reach a decision', 'Import rules change three times in a year without warning', 'Land ownership is unrecorded, so plots are fought over'], why: 'In each, the state fails to provide reliable rules — nobody need be taking a bribe.' },
      ],
    }),
  };
})();

const conflictTerrorism = (() => {
  const sid = subId('conflict-terrorism');
  return {
    id: sid,
    title: 'Civil Wars and Terrorism',
    keyIdea: 'Civil wars and terrorism destroy capital, kill and displace workers, deter investment and divert public spending to security, shrinking what an economy can produce.',
    body: [
      { type: 'paragraph', text: '**Civil wars** are the most destructive constraint on development. Fighting destroys roads, power stations, factories and homes; kills, injures and displaces workers; closes schools and clinics; and turns government spending from development to the army. The economy\'s production possibility frontier shifts inward.' },
      { type: 'paragraph', text: '**Terrorism** does less physical damage to economies but spreads fear. Attacks on markets, schools and transport keep people at home; tourists and foreign investors stay away; firms pay for security and insurance. The damage is concentrated in the regions affected, often already the poorest.' },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Fighting destroys capital', subtitle: 'Roads, factories and power' },
        { title: 'Workers are killed or flee', subtitle: 'Skills are lost' },
        { title: 'Investors and tourists stay away', subtitle: 'Nobody invests in a war zone' },
        { title: 'The frontier shifts inward', subtitle: 'Output and incomes fall' },
      ] },
      { type: 'paragraph', text: 'The effects outlast the fighting. Rebuilding takes decades, children who missed school become low-skilled adults, and a country that has had one war is at greater risk of another.' },
    ],
    realExample: { emoji: '🕊️', text: 'Syria\'s civil war destroyed much of its housing, power supply and industry and forced millions to flee the country. In north-east Nigeria, attacks by Boko Haram have closed schools and kept farmers from their fields.' },
    misconception: 'Students write that rebuilding after a war boosts growth, so war raises GDP. Measured growth can be fast after a war because output starts from a collapsed level; the capital, skills and lives lost leave the economy far below where it would have been.',
    examMatters: 'Use a production possibility frontier: an inward shift for the capital and labour destroyed. It separates war, a loss of capacity, from corruption, waste inside the frontier.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the fighting to the fall in output:',
      correctOrder: [
        'Shelling destroys the main bridge and the power station',
        'Skilled workers such as engineers and teachers flee across the border',
        'Foreign investors cancel a planned mine and tourists stop coming',
        'The country produces far less than before, and incomes fall',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The first loss is physical capital.',
        'Then people: those with skills are often the first able to leave.',
        'With capital and workers gone and risk high, nobody invests.',
        'Less capital, fewer workers and no investment mean lower output: an inward shift of the frontier.',
      ],
    }),
  };
})();

const migration = (() => {
  const sid = subId('migration');
  return {
    id: sid,
    title: 'Migration',
    keyIdea: 'Migration can drain a country of its young and skilled workers, but it also sends back remittances in foreign currency and, sometimes, migrants with new skills.',
    body: [
      { type: 'paragraph', text: 'The specification lists **migration** twice: as a demographic factor (2a) and as a non-economic factor (2b), because people move for economic reasons and for others — war, persecution, disaster, family.' },
      { type: 'paragraph', text: 'Its costs to a developing economy come mainly from **emigration of the skilled**, often called a brain drain. Doctors, nurses, engineers and teachers trained at public expense leave for higher pay abroad, taking their skills and the cost of their education with them. The working-age share falls, and services such as health care lose the people they depend on.' },
      { type: 'paragraph', text: '**Remittances** flow the other way: money migrants send home raises household incomes, pays for schooling and health care, and arrives in foreign currency, easing the foreign currency gap. Some migrants return with savings, skills and contacts. Within a country, moving from farms to towns takes workers to where output per worker is higher — the engine of the Lewis model in chapter 7.' },
    ],
    realExample: { emoji: '✈️', text: 'Remittances are more than a fifth of GDP in Nepal and Tajikistan, while Zimbabwe and Nigeria have lost large numbers of doctors and nurses to health services abroad.' },
    misconception: 'Students treat emigration as purely a loss. Weigh it: skilled workers lost against remittances in foreign currency, and ask who leaves — a doctor leaving a country with few doctors costs far more than an unemployed worker finding work abroad.',
    examMatters: 'Migration is both a constraint and a support. An Examine that says which effect is larger, for which country, and why, has the brief assessment Appendix 6 asks for.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each migration event to its effect on development:',
      pairs: [
        { left: 'A nurse takes a hospital job abroad', right: 'A rural clinic loses its only trained staff', why: 'Emigration of the skilled removes scarce services.' },
        { left: 'A builder working abroad sends money home monthly', right: 'His family can pay school fees and buy medicine', why: 'Remittances raise household incomes directly.' },
        { left: 'Money from relatives abroad arrives in dollars', right: 'The central bank has more foreign exchange for imports', why: 'Remittances ease the foreign currency gap.' },
        { left: 'A young farmer moves to a city factory job', right: 'Output per worker rises as he leaves the land', why: 'Moving from low- to high-productivity work is the Lewis model\'s engine.' },
      ],
      distractors: ['The dependency ratio falls to zero'],
    }),
  };
})();

/* ══ Block 5 — Market-Orientated Strategies (3a-1 .. 3a-6) ═══════════════════ */

const tradeLiberalisation = (() => {
  const sid = subId('trade-liberalisation');
  return {
    id: sid,
    title: 'Trade Liberalisation',
    keyIdea: 'Trade liberalisation removes barriers to trade so a country can specialise, reach bigger markets and buy cheaper inputs, while exposing its firms to foreign competition.',
    body: [
      { type: 'paragraph', text: '**Trade liberalisation** is the reduction or removal of barriers to trade, such as tariffs, quotas and export restrictions. How each barrier works is topic 4.3.2; here the question is its impact as a development strategy.' },
      { type: 'paragraph', text: 'The case for it: firms can export to much larger markets and specialise in what the country does relatively well; imported machinery and components become cheaper; consumers get lower prices and more choice; and import competition pushes domestic firms to become more efficient. More exports also narrow the foreign currency gap.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Barriers to trade are removed', subtitle: 'Imports and exports flow freely' },
        { title: 'Firms specialise and export', subtitle: 'Larger markets' },
        { title: 'Export earnings rise', subtitle: 'The foreign currency gap narrows' },
        { title: 'More imported capital', subtitle: 'Investment and growth rise' },
      ] },
      { type: 'paragraph', text: 'The case against: infant industries can be wiped out by established foreign rivals; a country may be pushed further into the primary products Prebisch-Singer warns about; the government loses revenue from import duties; and workers in industries that close lose out while exporters gain.' },
    ],
    realExample: { emoji: '🚢', text: 'Vietnam cut its trade barriers and joined the World Trade Organization, and has since become one of the world\'s leading exporters of phones, clothing and furniture.' },
    misconception: 'Students assume liberalisation helps every developing country equally. Its impact depends on what the country can export: an economy with manufacturing capacity gains markets, while one that exports a single crop may simply become more dependent on it.',
    examMatters: 'A Discuss (14, Appendix 6) on liberalisation needs both sides and a judgement that depends on the country: its exports, its infant industries and how much revenue it raises from import duties.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the removal of barriers to the rise in investment:',
      correctOrder: [
        'The government scraps import licences and cuts duties on trade',
        'Garment makers win orders from buyers in much larger foreign markets',
        'Export earnings climb, and the country has more dollars to spend',
        'Factories buy new sewing machines from abroad, and investment rises',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The strategy itself: barriers are removed.',
        'Open markets abroad let exporters specialise and sell more.',
        'More sales abroad mean more foreign currency earned.',
        'Foreign currency pays for imported capital, so investment rises.',
      ],
    }),
  };
})();

const promotingFdi = (() => {
  const sid = subId('promoting-fdi');
  return {
    id: sid,
    title: 'Promotion of FDI',
    keyIdea: 'Foreign direct investment brings capital, technology and foreign currency that a poor economy lacks, helping to fill the savings and foreign currency gaps.',
    body: [
      { type: 'paragraph', text: '**Foreign direct investment (FDI)** is investment by a firm in productive assets in another country — a factory, a mine, a hotel, or a stake large enough to give it control. Governments promote it with tax breaks, special economic zones with good infrastructure, and fewer limits on foreign ownership and on sending profits home.' },
      { type: 'paragraph', text: `In Harrod-Domar terms, FDI adds foreign savings to domestic ones. If ${E.country} attracts FDI of ${pct(E.fdi)} of GDP on top of its own ${pct(E.s)} saving, investment is ${pct(E.s + E.fdi)} and growth rises from ${pct(E.g)} to ${E.s + E.fdi} ÷ ${E.k} = ${pct(E.gWithFdi)}. FDI also arrives in foreign currency and brings technology, management skills and access to the investor's export markets.` },
      { type: 'paragraph', text: 'The costs: profits are repatriated to the parent company, so part of the income leaves; tax breaks mean the host collects little; foreign firms may hire local people only for low-skilled jobs; and a mine or plantation can leave environmental damage and little else when it closes. The benefit depends on the links the investment makes with local firms and workers.' },
    ],
    realExample: { emoji: '🏭', text: 'Samsung\'s factories in Vietnam employ tens of thousands of workers and have made phones one of the country\'s largest exports.' },
    misconception: 'Students count FDI as a benefit simply because money comes in. Ask what it builds and what flows back out: repatriated profits, tax holidays and imported inputs can leave the host with far less than the headline figure.',
    examMatters: 'When an extract gives FDI as a share of GDP, add it to domestic saving to show the rise in investment, then evaluate with the profits sent home.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Use the Harrod-Domar model to work out what FDI does for a different country:',
      template: [
        'It saves 9% of GDP and attracts FDI worth 6% of GDP, so it invests ___ of GDP.',
        'With a capital-output ratio of 3, it now grows at ___ a year.',
        'The foreign firm\'s profits sent back to its home country are said to be ___.',
      ],
      answers: ['15%', '5%', 'repatriated'],
      hints: ['domestic saving plus the inflow', 'investment divided by the capital-output ratio', 'returned to where the owner is based'],
      distractors: ['45%', 'reinvested', '3%'],
    }),
  };
})();

const subsidiesPrivatisation = (() => {
  const sid = subId('subsidies-privatisation');
  return {
    id: sid,
    title: 'Removing Subsidies and Privatisation',
    keyIdea: 'Removing government subsidies and privatising state firms free public money and let prices and profits guide resources, at the cost of higher prices and lost jobs for some.',
    body: [
      { type: 'paragraph', text: '**Removal of government subsidies** means ending payments that hold prices below cost — for fuel, electricity, food or loss-making state firms. Subsidies are often costly and badly targeted: cheap fuel benefits most those who own cars and generators. Removing them frees revenue for health, schools and infrastructure, and lets prices signal what things really cost.' },
      { type: 'paragraph', text: 'The cost falls on the poor when they bought the subsidised good: food and transport prices jump, and unrest can follow. The strongest version removes a subsidy gradually and spends part of the saving on direct payments to poor households.' },
      { type: 'paragraph', text: '**Privatisation** is the transfer of state-owned firms to private owners — telecoms, banks, airlines, utilities. The profit motive and competition are expected to raise efficiency and investment; the sale raises revenue; and loss-making firms stop draining the budget. The risks are that a state monopoly becomes a private one that raises prices, that firms are sold cheaply to the well-connected, and that jobs are cut.' },
    ],
    realExample: { emoji: '⛽', text: 'When Nigeria ended its long-standing petrol subsidy, the pump price roughly tripled within weeks; the government saved billions of dollars a year, and transport and food costs rose sharply for households.' },
    misconception: 'Students assume privatisation always raises efficiency. Ownership changes the incentive; competition and regulation decide whether efficiency rises or a private monopoly simply raises prices.',
    examMatters: 'These are two separate bullets in 3a. Evaluate subsidy removal by who received the subsidy\'s benefit, and privatisation by whether the market is competitive or regulated after the sale.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each effect into a likely benefit or a likely cost of removing subsidies and privatising state firms:',
      groups: [
        { name: 'Likely benefit', items: ['Money saved on cheap fuel pays for new clinics', 'A sold-off telecoms firm invests in a mobile network', 'Electricity bills now show how scarce power is'], why: 'Each frees public money or lets prices and profits steer resources to better uses.' },
        { name: 'Likely cost', items: ['Bus fares double for workers who commute to the city', 'The new owner of the water company raises charges with no rival to undercut it', 'Staff at the old state airline are laid off'], why: 'Each is a burden on households or workers, or a monopoly left unchecked.' },
      ],
    }),
  };
})();

const floatingExchange = (() => {
  const sid = subId('floating-exchange-rates');
  return {
    id: sid,
    title: 'Floating Exchange Rate Systems',
    keyIdea: 'Under a floating exchange rate the market sets the currency\'s value, so it can fall to restore competitiveness without using reserves, but it can swing and raise import costs.',
    body: [
      { type: 'paragraph', text: 'A **floating exchange rate system** lets supply and demand in the currency market set the currency\'s value, with no target defended by the central bank. How floating, managed and fixed systems differ as such is topic 4.3.3; here the question is what floating does for development.' },
      { type: 'paragraph', text: `The case for it is adjustment without reserves. When ${E.country}'s copper earnings fall, demand for its currency falls and the currency depreciates. Its exports become cheaper abroad and imports dearer, which helps close the foreign currency gap without the central bank spending reserves it does not have. A currency held too high by the state, by contrast, makes exporters uncompetitive and encourages capital flight.` },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Export earnings fall', subtitle: 'Demand for the currency falls' },
        { title: 'The currency depreciates', subtitle: 'No reserves spent' },
        { title: 'Exports become cheaper abroad', subtitle: 'Imports dearer' },
        { title: 'The trade gap narrows', subtitle: 'Over time' },
      ] },
      { type: 'paragraph', text: 'The case against: floating currencies can swing sharply, which makes planning hard. A depreciation raises the price of imported fuel, food and machinery, adding to inflation, and raises the local-currency cost of any debt owed in dollars.' },
    ],
    realExample: { emoji: '💱', text: 'When Egypt let its pound float, it lost around half its value against the dollar within weeks; its exports and holidays became cheaper for foreigners, while imported food and fuel became much dearer for Egyptians.' },
    misconception: 'Students write that a depreciation always improves the trade balance at once. Import prices rise immediately while export volumes take time to respond, and a country whose exports are commodities priced in dollars sells little more when its currency is cheaper.',
    examMatters: 'Floating (3a) and managed (3b) exchange rates are separate strategies. A strong evaluation compares them for the country in the question: the size of its reserves, its dollar debts and how far its exports respond to price.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the fall in export earnings to the narrower trade gap:',
      correctOrder: [
        'A drought halves the coffee crop and export earnings fall',
        'Fewer buyers need the local currency, so on the open market it depreciates',
        'Its shirts and beach holidays become cheaper for foreign buyers',
        'Over a year or two, sales abroad pick up and the trade gap narrows',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'Lower export earnings mean less demand for the currency.',
        'With no central bank target, the market lets the value fall.',
        'A cheaper currency makes the country\'s goods cheaper in other currencies.',
        'Export volumes respond with a lag, and the gap narrows.',
      ],
    }),
  };
})();

const microfinance = (() => {
  const sid = subId('microfinance');
  return {
    id: sid,
    title: 'Microfinance Schemes',
    keyIdea: 'Microfinance lends small sums to poor people without collateral, often through groups, so they can start or expand a small business and escape moneylenders.',
    body: [
      { type: 'paragraph', text: '**Microfinance schemes** provide small loans, savings accounts and insurance to people that banks will not serve. Loans are tiny — often a few hundred dollars — and are often made to groups, usually of women, who guarantee each other\'s repayment in place of collateral.' },
      { type: 'paragraph', text: 'A loan buys the sewing machine, the stock for a market stall or the seed for a harvest, so output and income rise. Repayment rates have often been high, because group members check on each other. Because lenders usually aim to cover their costs, it is a market-orientated strategy rather than aid, and a direct answer to poor access to credit (2a).' },
      { type: 'paragraph', text: 'The limits: most loans fund very small businesses that stay very small; interest rates can be high because tiny loans are costly to administer; some borrowers use loans for consumption and fall into debt; and careful studies have found modest effects on average incomes. It helps households manage money and survive shocks more than it transforms economies.' },
    ],
    realExample: { emoji: '🧵', text: 'Bangladesh\'s Grameen Bank, founded by Muhammad Yunus, lends mainly to poor women in groups; the model has been copied in dozens of countries.' },
    misconception: 'Students present microfinance as a cure for poverty on its own. The evidence suggests it widens choices for poor households but rarely creates large firms or lifts whole regions; it complements infrastructure and education rather than replacing them.',
    examMatters: 'Say which constraint a strategy addresses — microfinance answers access to credit and banking — because that link is the application an Examine or a Discuss needs.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of a microfinance scheme to the problem it solves:',
      pairs: [
        { left: 'Group lending', right: 'Borrowers with no land to offer as security', why: 'Members guarantee each other, which replaces collateral.' },
        { left: 'Very small loans', right: 'A stall owner who needs $150 of stock, not $15,000', why: 'Banks find tiny loans too costly; microfinance is built for them.' },
        { left: 'Savings accounts for the poor', right: 'Cash kept under a mattress that earns nothing and can be stolen', why: 'A safe place to save is part of access to banking.' },
        { left: 'Weekly repayments in small amounts', right: 'Income that arrives a little at a time from daily sales', why: 'Repayments sized to daily income make borrowing manageable.' },
      ],
      distractors: ['A government that cannot import fuel'],
    }),
  };
})();

/* ══ Block 6 — Interventionist Strategies (3b-1 .. 3b-6) ═════════════════════ */

const humanCapital = (() => {
  const sid = subId('human-capital');
  return {
    id: sid,
    title: 'Development of Human Capital',
    keyIdea: 'Investing in people\'s education, training and health raises what each worker can produce — one of the surest routes to growth and development, and one of the slowest.',
    body: [
      { type: 'paragraph', text: '**Human capital** is the knowledge, skills and health that make people productive. The **development of human capital** is an interventionist strategy because markets provide too little of it: poor families cannot borrow against their children\'s future earnings, and much of the benefit goes to the rest of society.' },
      { type: 'paragraph', text: 'The state intervenes by building and staffing schools, making primary and secondary education free, funding vocational training, vaccinating children and running clinics. Each raises output per worker and attracts investors who need trained staff — and each counts as development in itself, raising two of the HDI\'s three components.' },
      { type: 'paragraph', text: 'The drawbacks are cost and time. A school built now produces a more skilled worker ten or fifteen years later, so a government facing a crisis may cut it first. Quality matters as much as quantity, and a country that trains doctors and engineers it cannot employ may lose them to emigration.' },
    ],
    realExample: { emoji: '🎓', text: 'South Korea\'s government pushed near-universal primary and then secondary education in the decades before its rapid industrialisation, so its factories had a literate workforce when they needed one.' },
    misconception: 'Students write that spending on education raises growth straight away. In the year it is spent it is government spending; its effect on output arrives when the trained people are working.',
    examMatters: 'Human capital is both a constraint (education and skills, 2a) and a strategy (3b). In a strategy question, evaluate with the delay, the quality of provision and whether the economy can employ the skills it creates.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the case for investing in human capital:',
      template: [
        'A vaccination campaign raises the ___ dimension of the HDI.',
        'Free secondary education raises the expected years a child spends in ___.',
        'Because a pupil enrolled today joins the workforce years later, the payoff comes after a long ___.',
      ],
      answers: ['health', 'school', 'lag'],
      hints: ['measured by life expectancy at birth', 'where lessons are taught', 'the delay between the cost and the benefit'],
      distractors: ['income', 'factory', 'boom'],
    }),
  };
})();

const protectionism = (() => {
  const sid = subId('protectionism');
  return {
    id: sid,
    title: 'Protectionism',
    keyIdea: 'Protectionism shields domestic industries from imports so they can grow, but it raises prices, invites retaliation and can shelter firms that never become competitive.',
    body: [
      { type: 'paragraph', text: '**Protectionism** as a development strategy means restricting imports so that domestic industries can grow. Its instruments, such as tariffs and quotas, and their effect on consumers and producers are topic 4.3.2; here the question is whether it promotes development.' },
      { type: 'paragraph', text: 'The main argument is the **infant industry** case: a new industry has high costs until it grows large and learns, and it cannot survive competition from established foreign firms while it does. Protection buys it time. The wider strategy, **import substitution**, aims to make at home what was imported, saving foreign currency and building an industrial base and jobs.' },
      { type: 'paragraph', text: 'The risks are serious. Consumers and firms pay more for protected goods, including machinery. Sheltered firms may never become efficient, because protection meant to be temporary becomes permanent. Trading partners retaliate against the country\'s exports, and a small home market limits how far an industry can grow. Protection works best when it is temporary, targeted and tied to firms eventually exporting.' },
    ],
    realExample: { emoji: '🚗', text: 'South Korea protected its car and steel industries while requiring firms to export, and firms such as Hyundai became world exporters; many Latin American import-substitution industries, protected with no export test, stayed small and costly.' },
    misconception: 'Students treat protectionism and free trade as opposites where one must be right. The evidence points to conditions: temporary protection linked to export targets has worked; permanent protection of a small market usually has not.',
    examMatters: 'Keep any diagram brief and spend the answer on the infant industry argument and its conditions, which is where the evaluation lies.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each outcome into a likely benefit or a likely risk of protecting a new industry:',
      groups: [
        { name: 'Likely benefit', items: ['A local tyre maker survives long enough to cut its costs', 'The country spends fewer dollars on imported steel', 'Thousands of factory jobs open in a new industrial zone'], why: 'Each is the infant industry or import substitution case working as intended.' },
        { name: 'Likely risk', items: ['Farmers pay more for tractors made by the sheltered producer', 'A neighbour taxes the country\'s fruit exports in return', 'Thirty years on, the sheltered firm still cannot compete abroad'], why: 'Each is a cost of protection: dearer inputs, retaliation, or an infant that never grows up.' },
      ],
    }),
  };
})();

const managedExchange = (() => {
  const sid = subId('managed-exchange-rates');
  return {
    id: sid,
    title: 'Managed Exchange Rates',
    keyIdea: 'Under a managed exchange rate the central bank buys and sells currency to steer its value, keeping it stable or deliberately low, which needs reserves and can be costly to defend.',
    body: [
      { type: 'paragraph', text: 'A **managed exchange rate** is set by the market but steered by the central bank, which buys or sells its own currency with its reserves of foreign currency, or changes interest rates, to keep the value within a range. The mechanics of intervention are topic 4.3.3.' },
      { type: 'paragraph', text: 'As a development strategy it can do two things. It can bring **stability**: exporters, importers and investors can plan when the rate does not swing, and inflation from import prices is contained. And it can keep the currency **deliberately low**, making exports competitive and imports dearer, which encourages export industries — the path several East Asian economies took.' },
      { type: 'paragraph', text: 'The costs: holding the currency down means selling it for foreign currency, which adds to the money supply and risks inflation; holding it up needs reserves a poor country may not have, and speculators may bet against a rate they think cannot be defended. A rate held too high for too long makes exports uncompetitive and invites capital flight.' },
    ],
    realExample: { emoji: '🏛️', text: 'China managed the value of its currency for decades, keeping it stable against the dollar and, for long periods, low enough to make its exports very competitive.' },
    misconception: 'Students think a managed rate lets a government pick any value it wants. It can hold a value only as long as it has the reserves, or accepts the interest rates, needed to defend it.',
    examMatters: 'Compare it with floating (3a) for the country in the question: a managed rate needs reserves, so it suits an economy with a strong export surplus better than one with a foreign currency gap.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each central bank action to its purpose:',
      pairs: [
        { left: 'Selling dollars from reserves to buy its own currency', right: 'Stopping the currency falling below its target range', why: 'Buying its own currency raises demand for it, holding the value up.' },
        { left: 'Buying dollars with newly created local money', right: 'Keeping the currency low so exports stay cheap abroad', why: 'Selling its own currency adds to supply, holding the value down.' },
        { left: 'Raising interest rates', right: 'Attracting foreign savers to hold the currency', why: 'Higher returns raise demand for the currency.' },
        { left: 'Announcing a narrow band for the rate', right: 'Letting exporters plan their prices months ahead', why: 'Stability is one of the two aims of managing the rate.' },
      ],
    }),
  };
})();

const infrastructureDevelopment = (() => {
  const sid = subId('infrastructure-development');
  return {
    id: sid,
    title: 'Infrastructure Development',
    keyIdea: 'Governments build roads, ports, power and water because private firms build too little; done well it lowers every firm\'s costs, done badly it leaves debt and unused assets.',
    body: [
      { type: 'paragraph', text: '**Infrastructure development** as a strategy is the state building or financing roads, railways, ports, power stations, water supply and telecommunications — the gaps chapter 3 described. The case for intervention is that infrastructure is costly, pays back slowly and benefits many who do not pay for it, so private firms build too little.' },
      { type: 'paragraph', text: 'The benefits spread through the economy: lower transport and energy costs raise firms\' output; farmers reach markets; the country becomes more attractive to FDI; and construction itself creates jobs and income.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'The state builds a road and power line', subtitle: 'Financed by taxes, loans or aid' },
        { title: 'Costs fall for firms and farms', subtitle: 'Markets come within reach' },
        { title: 'Output and investment rise', subtitle: 'Including FDI' },
        { title: 'Incomes and tax revenue grow', subtitle: 'Repaying the cost' },
      ] },
      { type: 'paragraph', text: 'The risks: projects are expensive and often financed by overseas borrowing, adding to debt; they can be chosen for prestige or for contractors\' profits; and they need maintenance budgets that are often missing, so roads crumble within years. The test is whether the extra output a project enables exceeds its full cost.' },
    ],
    realExample: { emoji: '🚆', text: 'Kenya\'s railway from the port of Mombasa to Nairobi, financed mainly by Chinese loans, cut journey times for freight, but its cost and debt repayments have been widely debated.' },
    misconception: 'Students count spending on infrastructure as automatically raising growth. It raises capacity only if it is used and maintained; an unused airport or an unmaintained road adds debt, not output.',
    examMatters: 'Tie infrastructure to a specific cost it lowers, then evaluate with how it is financed. A project paid for with overseas loans links straight back to the debt constraint in 2a.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the new power line to the higher tax revenue:',
      correctOrder: [
        'Engineers connect a rural district to the national power grid',
        'Workshops stop paying for diesel generators, so their costs fall',
        'A food processor opens a plant nearby, and output rises',
        'Wages, profits and tax revenue in the district grow',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The intervention: the state extends the grid.',
        'Cheaper, reliable power cuts firms\' costs.',
        'Lower costs make new investment and more output worthwhile.',
        'More output raises incomes, and part returns as tax revenue.',
      ],
    }),
  };
})();

const jointVentures = (() => {
  const sid = subId('joint-ventures');
  return {
    id: sid,
    title: 'Promoting Joint Ventures with TNCs',
    keyIdea: 'A joint venture pairs a transnational company with a local firm or the state, so capital and technology come in while local owners keep a share of profits and learn.',
    body: [
      { type: 'paragraph', text: 'A **transnational corporation (TNC)** operates in many countries. **Promoting joint ventures with TNCs** means encouraging, or requiring, a foreign firm that wants to produce in the country to do so in partnership with a local firm or the state, sharing ownership, profits and decisions.' },
      { type: 'paragraph', text: 'It is interventionist because the government shapes the terms of FDI rather than leaving them to the market. The aim is to capture more of the benefit: local partners learn the technology and management methods, more of the profit stays in the country, and the TNC has a reason to build local suppliers and skills. For a mineral-rich country, a joint venture with the state keeps a share of the resource\'s value at home.' },
      { type: 'paragraph', text: 'The risks: some TNCs will not invest on those terms and go elsewhere; local partners chosen for connections may add little; and disputes over control can slow decisions. It works best where the country has something the TNC needs — a large market or a valuable resource — so it can set terms.' },
    ],
    realExample: { emoji: '💎', text: 'For decades China required foreign car makers to produce in joint ventures with Chinese firms, as Volkswagen did with SAIC; Botswana\'s diamonds are mined by Debswana, owned equally by the government and De Beers.' },
    misconception: 'Students treat a joint venture as the same as any FDI. The difference is ownership and control: a local partner shares the profits and the decisions, which is what gives the host its gains in technology and income.',
    examMatters: 'In an evaluation, weigh what the country gains from the partnership against the investment it may deter; its bargaining power — market size or resources — is what the judgement should rest on.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of a joint venture to what the host country gains from it:',
      pairs: [
        { left: 'Local engineers work alongside the foreign staff', right: 'Know-how that stays after the foreign staff leave', why: 'Shared operation is how technology transfers.' },
        { left: 'The state owns half the mine', right: 'Half the profits are paid to the government', why: 'Shared ownership keeps profits in the country.' },
        { left: 'The partnership buys parts from nearby suppliers', right: 'Domestic firms grow by supplying the plant', why: 'Local purchasing creates links to local firms.' },
        { left: 'A local director sits on every board decision', right: 'A say in how much is reinvested in the country', why: 'Shared control lets the host influence reinvestment.' },
      ],
    }),
  };
})();

const bufferStocks = (() => {
  const sid = subId('buffer-stocks');
  return {
    id: sid,
    title: 'Buffer Stock Schemes',
    keyIdea: 'A buffer stock scheme buys a commodity when its price falls to a floor and sells it when the price rises to a ceiling, keeping producers\' prices and incomes within a band.',
    body: [
      { type: 'paragraph', text: '**Buffer stock schemes** stabilise the price of a commodity, often a crop grown by many poor farmers. An agency sets a **floor** and a **ceiling** price. When a good harvest pushes the price towards the floor, it buys and stores the surplus; when a poor harvest pushes it towards the ceiling, it sells from the store.' },
      { type: 'paragraph', text: `Take coffee with a floor of ${kg(E.floor)} and a ceiling of ${kg(E.ceiling)} a kilogram. A bumper harvest of ${E.qGood} thousand tonnes would drive the price to ${kg(E.pGood)}; to hold it at ${kg(E.floor)}, the agency buys the ${E.buyGood} thousand tonnes buyers do not want at that price. After a poor harvest of ${E.qPoor} thousand tonnes the price would reach ${kg(E.pPoor)}, so the agency sells ${E.sellPoor} thousand tonnes from store to hold it at ${kg(E.ceiling)}.` },
      { type: 'paragraph', text: 'It reduces the volatility of farm incomes and so makes investment and planning easier. But it needs money to buy stock and places to store it; a floor set too high means the agency buys year after year until its funds run out; perishable crops cannot be stored for long; and many producer countries must agree for an international scheme to work.' },
    ],
    realExample: { emoji: '☕', text: 'The International Tin Council ran a buffer stock to support the tin price until it ran out of money to keep buying; the price collapsed and the scheme ended.' },
    misconception: 'Students say a buffer stock fixes the price. It holds the price inside a band, and only while the agency has money to buy and stock to sell; a run of good harvests exhausts the first, and a run of poor ones the second.',
    examMatters: 'Draw a vertical supply curve for each harvest with the floor and ceiling marked, and show the quantity bought or sold as the gap between supply and demand at the floor or the ceiling.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A cocoa scheme sets a floor of $3 a kilogram, where buyers want 500 thousand tonnes. Complete the working:',
      template: [
        'A bumper harvest brings 560 thousand tonnes to market, so the agency buys ___ thousand tonnes.',
        'At the floor price that costs the agency $___ million.',
        'If harvests stay large for years, the agency eventually runs out of ___.',
      ],
      answers: ['60', '180', 'money'],
      hints: ['the harvest minus what buyers want at the floor', 'the tonnes bought, in kilograms, times the floor price', 'what it needs to go on buying at the floor'],
      distractors: ['1,500', 'stock', '40'],
    }),
  };
})();

/* ══ Block 7 — Other Strategies and International Institutions (3c, 3d) ═══════ */

const lewisModel = (() => {
  const sid = subId('lewis-model');
  return {
    id: sid,
    title: 'Industrialisation: The Lewis Dual-Sector Model',
    keyIdea: 'The Lewis model sees development as moving surplus workers from low-productivity farming into a modern sector whose reinvested profits create jobs until the surplus runs out.',
    body: [
      { type: 'paragraph', text: 'The **Lewis structural dual-sector model** splits a developing economy in two. The **traditional sector**, mostly subsistence farming, has so many workers that some add almost nothing to output: remove them and the harvest barely falls. This is **surplus labour**. The **modern sector** — factories, mines and services in towns — has capital and much higher output per worker.' },
      { type: 'paragraph', text: `**Industrialisation** in the model works like this. The modern sector hires from the surplus at a wage a little above farm incomes — in ${E.country}, ${money(E.modernWage)} a day against ${money(E.subsistence)} — so it can expand without pushing wages up. Its profits are high; reinvested, they grow the capital stock, so it hires more: ${E.lewisJobs.join(' million, then ')} million workers.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Surplus labour on the farms', subtitle: 'Adds almost nothing to output' },
        { title: 'Workers migrate to factories', subtitle: 'At a wage just above farm incomes' },
        { title: 'Profits are reinvested', subtitle: 'More capital, more jobs' },
        { title: 'Surplus labour runs out', subtitle: 'Wages begin to rise' },
      ] },
      { type: 'paragraph', text: `When the surplus is used up — the **Lewis turning point**, at ${E.turningPoint} million workers in ${E.country} — the modern sector must pay more to attract workers, and wages rise across the economy. Critics note that profits may be sent abroad rather than reinvested, factories may use labour-saving machines, and migrants can arrive in cities faster than jobs.` },
    ],
    realExample: { emoji: '🏙️', text: 'China\'s growth moved hundreds of millions of people from farms into city factories, often described in Lewis\'s terms; rising factory wages in its coastal provinces have been read as a sign of the turning point.' },
    misconception: 'Students write that surplus labour means unemployment. In the model the surplus workers are occupied on family farms; the point is that their extra output there is close to zero, so moving them costs the farm almost nothing.',
    examMatters: 'The specification names industrialisation with the Lewis model in brackets (3c), so use the model: two sectors, surplus labour, reinvestment, the turning point. Evaluate with what it assumes.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the Lewis process in order, from the surplus labour on farms to the rise in wages:',
      correctOrder: [
        'A family farm has surplus hands it does not need for the harvest',
        'The youngest son takes a factory job in town at a wage just above what the land earned him',
        'Profits from the factory pay for a second production line, and more workers are hired',
        'With no spare workers left in the villages, factories must raise wages to hire',
      ],
      criterion: 'the stages of the process: each happens because of the one before',
      why: [
        'The model starts with labour whose extra output on the farm is close to zero.',
        'A modern-sector wage slightly above farm incomes draws that labour to the towns.',
        'High profits, reinvested, expand the modern sector\'s capital and its demand for workers.',
        'Once the surplus is gone, extra workers must be bid away: the turning point.',
      ],
    }),
  };
})();

const tourism = (() => {
  const sid = subId('tourism');
  return {
    id: sid,
    title: 'Development of Tourism',
    keyIdea: 'Tourism earns foreign currency and creates labour-intensive jobs from a country\'s natural and cultural assets, but its income can leak abroad and it is vulnerable to shocks.',
    body: [
      { type: 'paragraph', text: 'The **development of tourism** turns beaches, wildlife, mountains and heritage into export earnings: a visitor spending dollars in the country is an export of services. Governments promote it with airports, hotels, marketing and easier visas.' },
      { type: 'paragraph', text: 'Its benefits: foreign currency to ease the foreign currency gap; many jobs for people with modest skills, in hotels, transport, guiding and crafts; demand for local farms and firms; and infrastructure that residents use too.' },
      { type: 'paragraph', text: 'Its drawbacks: much of the spending can **leak** abroad, to foreign-owned hotel chains, airlines and imported food; jobs are often seasonal and low-paid; tourism collapses after an attack, a disease outbreak or a recession in the countries visitors come from; and it can damage the environment and push up land prices for local people. A country dependent on tourism faces volatility much like a commodity exporter.' },
    ],
    realExample: { emoji: '🏝️', text: 'In the Maldives, tourism is around a quarter of GDP directly and far more indirectly, so when international travel stopped during the pandemic its economy shrank by about a third in a year.' },
    misconception: 'Students count all tourist spending as income for the host. Spending on a foreign-owned resort, imported food and a foreign airline leaks abroad; the gain is what stays in local wages, local purchases and taxes.',
    examMatters: 'Evaluate tourism with leakages and volatility, which link it back to the constraints in 2a. The share of spending that stays local is what the judgement should turn on.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each dollar a tourist spends into money that stays in the country or money that leaks abroad:',
      groups: [
        { name: 'Stays in the country', items: ['Wages paid to a local safari guide', 'Fruit the hotel buys from nearby farms', 'The airport tax collected by the government'], why: 'Each is income earned by residents or revenue for the host government.' },
        { name: 'Leaks abroad', items: ['Profits of the foreign company that owns the resort', 'Imported wine served at the hotel bar', 'The fare paid to a foreign airline'], why: 'Each pays a foreign owner or supplier, so it adds nothing to the host\'s income.' },
      ],
    }),
  };
})();

const primaryIndustries = (() => {
  const sid = subId('primary-industries');
  return {
    id: sid,
    title: 'Development of Primary Industries',
    keyIdea: 'Developing farming, mining, forestry and fishing uses a country\'s natural advantages and can fund wider development, if the revenue is invested and the resource well managed.',
    body: [
      { type: 'paragraph', text: 'The **development of primary industries** means raising output and value in agriculture, mining, forestry and fishing — the sectors where many developing economies have their advantage. It can mean better seeds, irrigation and storage for farmers; new mines and oil fields; or processing more output at home before it is exported.' },
      { type: 'paragraph', text: 'Its benefits: higher farm output raises the incomes of the poorest, since most of them work on the land; mineral revenue can pay for infrastructure, schools and health; and exports earn foreign currency. Processing at home — roasting coffee, refining copper — keeps more of the value.' },
      { type: 'paragraph', text: 'Its drawbacks are the constraints of chapter 2: dependence on a few primary products exposes the country to volatile prices and, on the Prebisch-Singer argument, to declining terms of trade. Mining creates few jobs for the capital it uses, can damage land and water, and its revenue invites corruption. The strategy works where revenue is invested and the economy diversifies.' },
    ],
    realExample: { emoji: '🌾', text: 'Botswana used its diamond revenue to pay for roads, schools and clinics, and grew from one of the poorest countries at independence into an upper-middle-income economy.' },
    misconception: 'Students set primary industries against development. Many rich economies began with farming or mining; the question is whether the income is invested in diversifying the economy or captured by a few.',
    examMatters: 'Say which constraint this strategy eases (foreign currency) and which it can worsen (volatility, the terms of trade); weighing the two for the country in the question is the evaluation.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each primary-industry project to the development gain it aims for:',
      pairs: [
        { left: 'Irrigation for smallholder farms', right: 'Two harvests a year instead of one for the poorest households', why: 'Most of the poor farm, so higher yields raise their incomes directly.' },
        { left: 'A copper refinery beside the mine', right: 'More of the metal\'s value earned inside the country', why: 'Processing adds value before export.' },
        { left: 'Cold stores at a fishing port', right: 'Catch sold later at a better price instead of spoiling', why: 'Storage cuts waste and steadies income.' },
        { left: 'A state fund built from oil revenue', right: 'Money for schools and roads after the wells run dry', why: 'Investing resource revenue diversifies the economy.' },
      ],
      distractors: ['A rise in the price of imported cars'],
    }),
  };
})();

const aidDebtRelief = (() => {
  const sid = subId('aid-debt-relief');
  return {
    id: sid,
    title: 'Aid and Debt Relief',
    keyIdea: 'Aid and debt relief add foreign resources a poor country lacks; whether they promote development depends on what they are spent on and the conditions attached.',
    body: [
      { type: 'paragraph', text: '**Aid** is the transfer of resources to a developing country on better terms than the market offers: grants, loans at low interest, food, equipment or expertise. It may come from one government or through institutions such as the World Bank. **Tied aid** must be spent on goods from the donor country.' },
      { type: 'paragraph', text: `In Harrod-Domar terms, aid fills the savings and foreign currency gaps. If ${E.country} invests aid worth ${pct(E.aid)} of GDP on top of its ${pct(E.s)} saving, growth rises from ${pct(E.g)} to ${E.s + E.aid} ÷ ${E.k} = ${pct(E.gWithAid)}. Humanitarian aid saves lives in a disaster; development aid can fund clinics, vaccination and schools directly.` },
      { type: 'paragraph', text: `**Debt relief** cancels or reduces a country's overseas debt, freeing the foreign currency and tax revenue that servicing absorbed. If ${E.country}'s debt service fell from ${pct(E.debtServiceShare)} to ${pct(E.debtShareAfter)} of its ${bn(E.exports)} export earnings, ${bn(E.reliefFreed)} a year would be freed. Critics argue aid can create dependency, be captured by corrupt officials or serve the donor's interests, and that relief can reward past overborrowing.` },
    ],
    realExample: { emoji: '🤝', text: 'Under the Heavily Indebted Poor Countries initiative and the relief that followed it, more than 30 countries, most of them in Africa, had much of their overseas debt cancelled on condition that the savings went on reducing poverty.' },
    misconception: 'Students treat aid as either always good or always wasted. The evidence depends on the type: humanitarian aid and health programmes such as vaccination have clear effects, while large budget transfers to weak governments have much weaker ones.',
    examMatters: 'When a question gives aid as a share of GDP, add it to domestic saving to show the Harrod-Domar effect, then evaluate with where the money goes and who controls it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work out what aid and debt relief do for a different country:',
      template: [
        'It saves 8% of GDP with a capital-output ratio of 2, so it grows at ___ a year.',
        'Aid worth 2% of GDP, all of it invested, lifts growth to ___ a year.',
        'If debt service falls from 25% to 10% of $10bn of export earnings, $___bn a year is freed.',
      ],
      answers: ['4%', '5%', '1.5'],
      hints: ['the savings ratio divided by the capital-output ratio', 'saving plus aid, divided by the capital-output ratio', 'the fall in the share, times export earnings'],
      distractors: ['16%', '2.5', '10%'],
    }),
  };
})();

const worldBankImf = (() => {
  const sid = subId('world-bank-imf');
  return {
    id: sid,
    title: 'The World Bank and the IMF',
    keyIdea: 'The World Bank lends for long-term development projects; the International Monetary Fund lends short-term to countries in balance of payments crisis, usually with conditions.',
    body: [
      { type: 'paragraph', text: '**The World Bank** is an international institution owned by its member governments. It lends for long-term development: roads, power, water, schools, health systems and reforms of how governments work. Its International Development Association gives grants and loans at very low interest to the poorest countries.' },
      { type: 'paragraph', text: '**The International Monetary Fund (IMF)** exists to keep the international monetary system stable. It lends to countries that cannot pay for their imports or debts — a balance of payments crisis, the foreign currency gap in its sharpest form — and it monitors and advises its members.' },
      { type: 'paragraph', text: 'IMF loans usually come with **conditions**: cutting the budget deficit, removing subsidies, raising interest rates, letting the currency fall, privatising. Supporters argue the conditions fix the causes of the crisis and restore confidence, so private lenders and investors return. Critics argue they cut spending on health and education when the poor most need it, deepen recessions and impose one model on very different economies.' },
    ],
    realExample: { emoji: '🌐', text: 'Pakistan and Sri Lanka have both turned to the IMF when they ran short of foreign currency; the loans came with conditions to raise tax revenue and cut energy subsidies.' },
    misconception: 'Students confuse the two institutions. The World Bank finances long-term development; the IMF lends short-term to countries in a balance of payments crisis. Both are owned by member governments and both lend with conditions.',
    examMatters: 'The specification asks for their role (3d). An Evaluate on the IMF weighs the stability its loans restore against the social cost of its conditions, for the country in the question.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each activity into the World Bank\'s role or the IMF\'s role:',
      groups: [
        { name: 'The World Bank', items: ['A 30-year loan to build a hydroelectric dam', 'A grant to train rural health workers in the poorest countries', 'Finance for a new national road network'], why: 'Each is long-term finance for development projects.' },
        { name: 'The IMF', items: ['An emergency loan to a country that cannot pay for its imports', 'A condition that the borrower cuts its budget deficit', 'A yearly check on a member economy\'s policies'], why: 'Each is about short-term stability: crisis lending, conditions and surveillance.' },
      ],
    }),
  };
})();

const ngos = (() => {
  const sid = subId('ngos');
  return {
    id: sid,
    title: 'Non-Government Organisations',
    keyIdea: 'NGOs are independent, non-profit organisations that deliver aid and services directly to communities, often reaching people that governments and markets miss.',
    body: [
      { type: 'paragraph', text: '**Non-government organisations (NGOs)** are independent of governments and do not seek profit. They include international charities such as Oxfam and Médecins Sans Frontières and local organisations such as BRAC in Bangladesh. They are funded by donations, grants from governments and, sometimes, their own enterprises.' },
      { type: 'paragraph', text: 'Their role in development: delivering emergency relief; running schools, clinics, clean-water and microfinance projects; training farmers; and campaigning, for example for debt relief. Working at community level, they can reach remote villages and target the poorest, often at lower cost and with less corruption than state programmes.' },
      { type: 'paragraph', text: 'Their limits: they work on a small scale compared with governments; their funding is uncertain and can follow donors\' priorities rather than local needs; many projects stop when the NGO leaves; and running services alongside the state can weaken it. They complement governments and the international institutions rather than replace them.' },
    ],
    realExample: { emoji: '🏥', text: 'BRAC began as a small relief effort in Bangladesh and now runs schools, health programmes and microfinance serving millions of people across Asia and Africa.' },
    misconception: 'Students treat NGOs as the solution governments failed to find. Their strength is reach and targeting at small scale; national problems such as infrastructure or macroeconomic stability still need governments and institutions.',
    examMatters: 'The role of NGOs is its own bullet in 3d. Compare them with the World Bank and the IMF on scale, targeting and accountability — that comparison is the evaluation an essay on institutions needs.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement into a strength or a limitation of NGOs in development:',
      groups: [
        { name: 'Strength', items: ['A charity health worker reaches a village with no road', 'Donations go straight to the families who lost their homes', 'A local group knows which households are poorest'], why: 'Each reflects reach and targeting at community level.' },
        { name: 'Limitation', items: ['The water project stops when the grant runs out after three years', 'A donor\'s favourite cause gets funded before what villagers need', 'The charity runs ten clinics where the country needs a thousand'], why: 'Each reflects small scale, uncertain funding or donor-driven priorities.' },
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [growthAndDevelopment, hdiComponents, hdiStrengthsLimits, otherMeasures],
    takeaway: [
      'Growth is more output; development is better lives.',
      'HDI: health, education and income, combined by a geometric mean.',
      'The HDI is an average with patchy data; six other indicators fill gaps.',
    ],
  },
  {
    title: B2,
    subs: [commodityPrices, prebischSinger, harrodDomar, foreignCurrencyGap, capitalFlight],
    takeaway: [
      'Commodity dependence brings volatile earnings and, on Prebisch-Singer, falling terms of trade.',
      'Harrod-Domar: growth = savings ratio ÷ capital-output ratio.',
      'Capital flight widens both the savings gap and the foreign currency gap.',
    ],
  },
  {
    title: B3,
    subs: [demographicFactors, debt, creditBanking, infrastructure, educationSkills],
    takeaway: [
      'A high dependency ratio leaves little to save.',
      'Overseas debt service uses up foreign currency before imports.',
      'Without credit, infrastructure and skills, investment stalls.',
    ],
  },
  {
    title: B4,
    subs: [corruptionGovernance, conflictTerrorism, migration],
    takeaway: [
      'Corruption and poor governance raise the cost and risk of investing.',
      'Civil wars shift the frontier inward; terrorism deters investors.',
      'Migration costs skills but returns remittances.',
    ],
  },
  {
    title: B5,
    subs: [tradeLiberalisation, promotingFdi, subsidiesPrivatisation, floatingExchange, microfinance],
    takeaway: [
      'Markets and prices steer resources; the state steps back.',
      'FDI and exports fill the savings and foreign currency gaps.',
      'Each gain has losers: infant industries, the poor, workers.',
    ],
  },
  {
    title: B6,
    subs: [humanCapital, protectionism, managedExchange, infrastructureDevelopment, jointVentures, bufferStocks],
    takeaway: [
      'The state acts where markets under-provide or prices swing.',
      'Protection and managed rates work only if temporary or affordable.',
      'Buffer stocks hold prices in a band while money and stock last.',
    ],
  },
  {
    title: B7,
    subs: [lewisModel, tourism, primaryIndustries, aidDebtRelief, worldBankImf, ngos],
    takeaway: [
      'Lewis: surplus labour moves to industry until the turning point.',
      'Tourism, primary industries, aid and debt relief each help and leak.',
      'World Bank: long-term projects. IMF: crisis loans. NGOs: local reach.',
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
 * THE LEAF MAP, BY HAND. 43 leaves at `econ_spec.txt:1899-1968`, each named against the subsection
 * that teaches it. The seven `requirement` rows group bullets and are not leaves; the runner re-reads
 * the oracle and asserts both counts.
 */
export const LEAF_MAP = {
  'ECON-4.3.6-1a': ['hdi-components'],
  'ECON-4.3.6-1b': ['hdi-strengths-limits'],
  'ECON-4.3.6-1c-1': ['other-measures'],
  'ECON-4.3.6-1c-2': ['other-measures'],
  'ECON-4.3.6-1c-3': ['other-measures'],
  'ECON-4.3.6-1c-4': ['other-measures'],
  'ECON-4.3.6-1c-5': ['other-measures'],
  'ECON-4.3.6-1c-6': ['other-measures'],
  'ECON-4.3.6-2a-1': ['commodity-prices'],
  'ECON-4.3.6-2a-2': ['prebisch-singer'],
  'ECON-4.3.6-2a-3': ['harrod-domar'],
  'ECON-4.3.6-2a-4': ['foreign-currency-gap'],
  'ECON-4.3.6-2a-5': ['capital-flight'],
  'ECON-4.3.6-2a-6': ['demographic-factors'],
  'ECON-4.3.6-2a-7': ['debt'],
  'ECON-4.3.6-2a-8': ['credit-and-banking'],
  'ECON-4.3.6-2a-9': ['infrastructure'],
  'ECON-4.3.6-2a-10': ['education-skills'],
  'ECON-4.3.6-2b-1': ['corruption-governance'],
  'ECON-4.3.6-2b-2': ['corruption-governance'],
  'ECON-4.3.6-2b-3': ['conflict-terrorism'],
  'ECON-4.3.6-2b-4': ['migration'],
  'ECON-4.3.6-2b-5': ['conflict-terrorism'],
  'ECON-4.3.6-3a-1': ['trade-liberalisation'],
  'ECON-4.3.6-3a-2': ['promoting-fdi'],
  'ECON-4.3.6-3a-3': ['subsidies-privatisation'],
  'ECON-4.3.6-3a-4': ['subsidies-privatisation'],
  'ECON-4.3.6-3a-5': ['floating-exchange-rates'],
  'ECON-4.3.6-3a-6': ['microfinance'],
  'ECON-4.3.6-3b-1': ['human-capital'],
  'ECON-4.3.6-3b-2': ['protectionism'],
  'ECON-4.3.6-3b-3': ['managed-exchange-rates'],
  'ECON-4.3.6-3b-4': ['infrastructure-development'],
  'ECON-4.3.6-3b-5': ['joint-ventures'],
  'ECON-4.3.6-3b-6': ['buffer-stocks'],
  'ECON-4.3.6-3c-1': ['lewis-model'],
  'ECON-4.3.6-3c-2': ['tourism'],
  'ECON-4.3.6-3c-3': ['primary-industries'],
  'ECON-4.3.6-3c-4': ['aid-debt-relief'],
  'ECON-4.3.6-3c-5': ['aid-debt-relief'],
  'ECON-4.3.6-3d-1': ['world-bank-imf'],
  'ECON-4.3.6-3d-2': ['world-bank-imf'],
  'ECON-4.3.6-3d-3': ['ngos'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, SAME TITLES, SAME ORDER, SAME MODULE — structure-06's "two different
 * maps of the same topic" cannot recur, and `depth.notes-titles` cannot fire. Notes ship from the
 * `data` column, so a `?draft=1` walk shows these only after publication (DECISIONS, 16 September).
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4.3.6 · 1a, 1b, 1c',
    keyIdea: 'How development differs from growth, how the HDI is built and where it falls short, and the six other measures of development the specification names.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Economic development</strong> — an improvement in living standards and welfare: health, education, income and freedom, not output alone.'),
        def('<strong>Human Development Index (HDI)</strong> — a composite index of health (life expectancy at birth), education (mean and expected years of schooling) and income (GNI per head at PPP).'),
        def('<strong>Other measures</strong> — adult male labour in agriculture; access to clean water; energy consumption per capita; internet, mobile phones and doctors per thousand of population.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Health index = (${E.lifeExp} − ${E.leMin}) ÷ (${E.leMax} − ${E.leMin}) = ${ix(E.healthIx)}; HDI = ∛(${ix(E.healthIx)} × ${ix(E.eduIx)} × ${ix(E.incomeIx)}) = ${ix(E.hdi)}.`),
        mech('Geometric mean: a weak dimension pulls the index down more than an arithmetic mean would.'),
        link('Measures of poverty and inequality within a country are topic 4.3.4.'),
      ] },
    ],
    takeaway: [
      'Growth helps pay for development; it does not guarantee it.',
      'An average hides who gains; the data are weakest where it matters most.',
      'Use single indicators alongside the HDI, not instead of it.',
    ],
  },
  {
    title: B2,
    meta: '4.3.6 · 2a (commodity prices to capital flight)',
    keyIdea: 'Five economic constraints that all come down to too little saving, too little foreign currency, or earnings that swing.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Prebisch-Singer hypothesis</strong> — primary product prices tend to fall relative to manufactures over time, so primary exporters\' terms of trade decline.'),
        def('<strong>Harrod-Domar model</strong> — growth = savings ratio ÷ capital-output ratio. The <strong>savings gap</strong> is the saving needed for a target growth rate minus actual saving.'),
        def('<strong>Foreign currency gap</strong> — the foreign currency a growth plan needs minus what the country earns. <strong>Capital flight</strong> — residents moving their money abroad.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Copper ${pct(E.copperShare * 100)} of exports × a ${pct(E.copperFall)} price fall = export earnings down ${pct(E.exportFallPct)}.`),
        mech(`Terms of trade ${E.exportPriceIx} ÷ ${E.importPriceIx} × 100 = ${E.tot}. Harrod-Domar ${E.s} ÷ ${E.k} = ${pct(E.g)}; ${pct(E.gTarget)} needs ${pct(E.sNeeded)}: a gap of ${E.savingsGap} points.`),
        mech(`Exports ${bn(E.exports)} against import needs of ${bn(E.importNeeds)}: a foreign currency gap of ${bn(E.fxGap)}.`),
      ] },
    ],
    takeaway: [
      'Volatility, not only low prices, makes planning impossible.',
      'Harrod-Domar points to foreign savings to fill the gap.',
      'Capital flight drains savings and foreign currency at once.',
    ],
  },
  {
    title: B3,
    meta: '4.3.6 · 2a (demography to education and skills)',
    keyIdea: 'Five constraints on the people, the finance and the physical capital an economy needs to grow.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Dependency ratio</strong> — people under 15 and over 64 per 100 of working age.'),
        def('<strong>Household debt</strong> — what families owe; <strong>overseas debt</strong> — what a country owes abroad, serviced in foreign currency.'),
        def('<strong>Access to credit and banking</strong> — whether people can save safely and borrow for productive projects.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${E.country}: (${E.under15} + ${E.over64}) ÷ ${E.working} × 100 = ${E.dependency} dependants per hundred.`),
        mech(`Debt service ${bn(E.debtService)} = ${pct(E.debtServiceShare)} of export earnings, gone before any import is bought.`),
        mech('No collateral, no loan, no machine: the savings gap seen from below.'),
      ] },
    ],
    takeaway: [
      'Fast population growth eats the rise in output.',
      'Debt constrains when its cost exceeds what it produced.',
      'Missing infrastructure and skills raise every cost.',
    ],
  },
  {
    title: B4,
    meta: '4.3.6 · 2b',
    keyIdea: 'Corruption, poor governance, civil wars, migration and terrorism: constraints that are not economic in origin but act through investment and capacity.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Corruption</strong> — abuse of public office for private gain. <strong>Poor governance</strong> — the state failing to provide reliable rules, courts and policy.'),
        def('<strong>Brain drain</strong> — emigration of skilled workers. <strong>Remittances</strong> — money migrants send home.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Corruption: a hidden tax on investment, and production inside the frontier.'),
        mech('Civil war: capital destroyed and workers lost — the frontier shifts inward.'),
        link('Migration also appears as a demographic factor in 2a.'),
      ] },
    ],
    takeaway: [
      'Name the mechanism, not just the moral point.',
      'War shrinks capacity; corruption wastes it.',
      'Migration both costs and returns resources.',
    ],
  },
  {
    title: B5,
    meta: '4.3.6 · 3a',
    keyIdea: 'Six market-orientated strategies: open trade, attract investment, withdraw subsidies and state ownership, let the currency float, and bring credit to the poor.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Trade liberalisation</strong> — removing barriers to trade. <strong>FDI</strong> — a foreign firm investing in productive assets it controls.'),
        def('<strong>Privatisation</strong> — selling state-owned firms to private owners. <strong>Floating exchange rate</strong> — a value set by the market.'),
        def('<strong>Microfinance</strong> — small loans and savings for people banks will not serve, often through groups.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`FDI of ${pct(E.fdi)} plus saving of ${pct(E.s)}: growth ${pct(E.g)} → ${pct(E.gWithFdi)}.`),
        mech('Falling export earnings → depreciation → cheaper exports, with no reserves spent.'),
        link('How trade barriers work is 4.3.2; exchange rate systems as such are 4.3.3.'),
      ] },
    ],
    takeaway: [
      'Each strategy answers a named constraint.',
      'Gains depend on links to local firms and on competition.',
      'The costs fall on identifiable groups.',
    ],
  },
  {
    title: B6,
    meta: '4.3.6 · 3b',
    keyIdea: 'Six interventionist strategies: invest in people and infrastructure, protect and steer, and stabilise commodity prices.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Human capital</strong> — the skills, knowledge and health that make people productive.'),
        def('<strong>Managed exchange rate</strong> — market-set but steered by the central bank. <strong>Joint venture</strong> — a TNC and a local partner sharing ownership.'),
        def('<strong>Buffer stock scheme</strong> — buying at a floor price and selling at a ceiling price to hold the price in a band.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Coffee: bumper harvest of ${E.qGood}k tonnes → ${kg(E.pGood)}; the agency buys ${E.buyGood}k tonnes to hold ${kg(E.floor)}.`),
        mech(`Poor harvest of ${E.qPoor}k tonnes → ${kg(E.pPoor)}; the agency sells ${E.sellPoor}k tonnes to hold ${kg(E.ceiling)}.`),
        mech('Infant industry: protection buys time to cut costs, if it is temporary.'),
      ] },
    ],
    takeaway: [
      'Intervention fills gaps markets leave.',
      'Every scheme needs money, reserves or time.',
      'Temporary and targeted beats permanent and general.',
    ],
  },
  {
    title: B7,
    meta: '4.3.6 · 3c, 3d',
    keyIdea: 'Industrialisation through the Lewis model, tourism, primary industries, aid and debt relief — and the World Bank, the IMF and NGOs.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Lewis dual-sector model</strong> — surplus labour moves from traditional farming to a modern sector until the turning point.'),
        def('<strong>Aid</strong> — resources on better-than-market terms. <strong>Debt relief</strong> — cancelling or reducing overseas debt.'),
        def('<strong>World Bank</strong> — long-term development finance. <strong>IMF</strong> — short-term crisis lending with conditions. <strong>NGOs</strong> — independent non-profits.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Lewis: a wage of ${money(E.modernWage)} against ${money(E.subsistence)} on the farm; jobs grow ${E.lewisJobs.join(' → ')} million until the turning point at ${E.turningPoint} million.`),
        mech(`Aid of ${pct(E.aid)}: growth ${pct(E.g)} → ${pct(E.gWithAid)}. Debt relief ${pct(E.debtServiceShare)} → ${pct(E.debtShareAfter)}: ${bn(E.reliefFreed)} freed.`),
        link('Tourism and primary industries share the commodity exporter\'s volatility.'),
      ] },
    ],
    takeaway: [
      'Lewis depends on reinvested profits and jobs for migrants.',
      'Aid and relief work where the money reaches services.',
      'The institutions differ in time scale, conditions and reach.',
    ],
  },
];
