/**
 * PACKET 21 — measures-economic-performance, Learn Mode content and Notes.
 *
 * Economics Unit 2 (WEC12), IAL topic 2.3.1 Measures of economic performance,
 * audit/raw/econ_spec.txt:884-974. FORTY-EIGHT leaves — twice any section built so far — so ten
 * blocks in the specification's own order and 45 subsections, one per idea.
 *
 * FIVE SCOPE DECISIONS THE SPECIFICATION SETTLED BEFORE A WORD WAS WRITTEN. Each is set against the
 * line that settles it in the packet 21 spec in NEXT.md.
 *
 *   - NOTHING IN THE SPECIFICATION ASKS HOW GDP IS MEASURED. "expenditure method", "income method",
 *     "output method", "value added" and "gross value added" each return ZERO occurrences in
 *     econ_spec.txt, and GDP itself appears at only seven lines in the whole document — five of them
 *     inside 2.3.1 sub-topic 1, none about measurement. 2.3.4 National income asks for the circular
 *     flow, injections and withdrawals, equilibrium and the multiplier, not the three approaches
 *     either, and C + I + G + (X−M) is 2.3.2's components of AGGREGATE DEMAND. So the March block
 *     "Three Methods of Measuring GDP" — three of the section's 24 subsections — was the UK GCE
 *     syllabus, and it is gone. No ledger item asked about it; the audit asked only to improve its
 *     exercises.
 *   - RPI AND CPIH ARE NOT IN THE SPECIFICATION. Zero occurrences each. The March section spent a
 *     subsection, a reorder, three flashcards and a quiz explanation on the differences between them,
 *     and got the differences wrong (quiz-01, topFix-05). 2c asks for the LIMITATIONS OF THE CPI, and
 *     that is what block 4 teaches — with the arithmetic of a re-weighted basket rather than a
 *     borrowed vocabulary, because the specification supplies no words for those limitations and
 *     "substitution bias" is another zero (specGap-03).
 *   - THE HUMAN DEVELOPMENT INDEX IS UNIT 4. econ_spec.txt:1904-1907, topic 4.3.6. It sat inside this
 *     Unit 2 section's GDP-limitations block (structure-08). 1i asks instead for indicators of
 *     national happiness and wellbeing, and for the relationship between real incomes and subjective
 *     happiness, and those are what block 3 teaches.
 *   - QUANTITATIVE EASING IS UNIT 4 AND THE LIQUIDITY TRAP IS NOWHERE. econ_spec.txt:1725, topic
 *     4.3.3, and zero occurrences. A full March subsection on both went with them; 2f's three causes
 *     of deflation replace it.
 *   - THE CAPITAL AND FINANCIAL ACCOUNTS ARE NAMED AND NOT TAUGHT. 4a asks for the components of the
 *     balance of payments "with particular reference to the current account"; the other two accounts
 *     are 4.3.3, Unit 4 (specGap-07 asked for an explainer, and half of that is out of scope).
 *
 * Andara carries every figure. Money is in dollars throughout — the March section mixed dollars and
 * pounds (`locale.currency`) and framed the topic in the UK, 42 UK-framed mentions against 28 from
 * anywhere else, with six UK institutions by name. None of those appears here, and neither does any
 * dated claim about a real economy: topFix-05 listed six that nothing in this repository could check,
 * and all six are removed rather than corrected.
 *
 * Nor does any sentence say what an examiner expects. Sixteen live `claim.uncited` BLOCK findings
 * were all one shape — "Examiners expect…", "Examiners reward…", "Examiners want you to…". Every
 * `examMatters` here says what the COMMAND WORD requires, which Appendix 6 states and which is
 * therefore citable.
 *
 * Ids: fifteen March subsection ids are kept, because a progress row points at them (the packet-13
 * rule), and each is kept only where the new subsection teaches the same thing.
 */
import {
  subId, SECTION, hash8, money, bn, pc, rate, idx, minus, r2,
  YEARS, NOMINAL, GDP_INDEX, POP, realAt, perCapitaAt, realGrowth, nominalGrowth, perCapitaGrowth,
  OIL, oilValue, OIL_VOLUME_CHANGE, OIL_VALUE_CHANGE,
  BASKET, HOUSEHOLD_BASKET, weighted, weightSum, CPI, CPI_HOUSEHOLD, INFLATION, INFLATION_HOUSEHOLD,
  CPI_SERIES, INFLATION_Y3, PPI, PPI_CHANGE, SAVINGS, SAVINGS_RATE, savingsNominal, savingsReal,
  WORKING_AGE, EMPLOYED, UNEMPLOYED, LABOUR_FORCE, INACTIVE, UNDEREMPLOYED,
  unemploymentRate, employmentRate, inactivityRate,
  MIGRATION, mWorkingAge, mLabourForce, mEmployed, mUnemployed, mUnemploymentRate,
  BOP, tradeInGoodsAndServices, currentAccount,
} from './_packet21-util.mjs';
import { QUARTERS, PPP_ROWS, atMarket, atPPP, FLOOR_DEMAND, FLOOR_SUPPLY, FLOOR_GAP } from './_packet21-diagrams.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
/*
 * A match recall's `why` line belongs to its PAIR: the validator reads `pairs.map(p => p.why)`
 * (lib/content-validator.mjs:459), and a top-level array of them scores "0 of 4 pair lines" however
 * many it holds. Authoring them as one list beside the pairs keeps the pairing readable — the nth
 * reason sits under the nth pair — so the list is zipped in here rather than repeated inline.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (out.type === 'match' && Array.isArray(out.why)) {
    out.pairs = out.pairs.map((pair, i) => ({ ...pair, why: out.why[i] }));
    delete out.why;
  }
  return out;
};
const sub = (slug, body) => ({ id: subId(slug), ...body(subId(slug)) });

export const B1 = 'Measuring National Output';
export const B2 = 'Comparing Growth';
export const B3 = 'What GDP Leaves Out';
export const B4 = 'Measuring Inflation';
export const B5 = 'Causes of Inflation and Deflation';
export const B6 = 'Effects of Inflation and Deflation';
export const B7 = 'Measuring Employment and Unemployment';
export const B8 = 'Causes of Unemployment';
export const B9 = 'Effects of Unemployment';
export const B10 = 'The Balance of Payments';

const TOTAL = BASKET.reduce((n, g) => n + weighted(g), 0);

/* ══ Block 1 — Measuring National Output (1a, 1b, 1c) ═══════════════════════ */

const whatRealGdpMeasures = sub('gdp-definition', (sid) => ({   // March id, kept
  title: 'What Real GDP Measures',
  keyIdea: 'Gross Domestic Product is the total output produced inside a country over a period, and it is the RATE OF CHANGE of real GDP that measures economic growth.',
  body: [
    { type: 'paragraph', text: '**Gross Domestic Product (GDP)** is the total value of the goods and services produced inside a country over a period of time, usually a year. It is a flow, not a stock: it counts what was produced during the year, not what the country owns.' },
    { type: 'paragraph', text: `**Economic growth** is not the level of GDP. It is the **rate of change of real GDP** — how much larger or smaller output is than it was. Andara produced ${bn(realAt(0))} of output in year 1 and ${bn(realAt(1))} in year 2, so it grew by ${pc(realGrowth(1))}.` },
    { type: 'bullets', items: [
      '**Inside the country** — output produced within the borders counts, whoever owns the business producing it.',
      '**Over a period** — a GDP figure without a period attached says nothing.',
      '**Real** — measured at constant prices, so a rise means more was produced rather than that prices went up.',
    ] },
    { type: 'paragraph', text: 'GDP is also used as a measure of **living standards**, on the reasoning that a country producing more has more to go round. That use is the one with the most conditions attached, and block 3 is about them.' },
  ],
  realExample: { emoji: '🏭', text: 'A car plant owned by a foreign company, producing cars in Andara, adds to Andara\'s GDP. The output happened inside the country, which is what the measure counts.' },
  misconception: 'Students treat a high GDP as high growth. A country can have a very large GDP and a growth rate of zero, and a small economy can grow quickly. The level and the rate of change are different measurements and questions ask for one or the other.',
  examMatters: 'A Define (2 marks, WEC12 Appendix 6) requires the meaning of a term. For GDP that is the total output produced inside a country over a period; naming the period and the boundary is what makes it a definition rather than a gesture.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the definition the whole section is built on:',
    template: [
      'GDP is the total value of goods and services produced ___ a country',
      'measured over a stated ___',
      'and economic growth is the rate of ___ of real GDP',
    ],
    answers: ['inside', 'period', 'change'],
    hints: ['the boundary that decides what counts', 'a year, a quarter — the window the figure covers', 'growth is a movement, not a level'],
    distractors: ['owned by', 'level'],
  }),
}));

const gniIncomeRatherThanOutput = sub('gni-income-rather-than-output', (sid) => ({
  title: 'GNI: Income Rather Than Output',
  keyIdea: 'Gross National Income measures the income received by a country\'s residents wherever it was earned, so it differs from GDP by exactly the income that crosses the border.',
  body: [
    { type: 'paragraph', text: '**Gross National Income (GNI)** is the alternative measure of national income the specification names. It counts the income received by a country\'s **residents**, wherever in the world it was earned.' },
    { type: 'paragraph', text: 'GDP draws its boundary around the **territory**; GNI draws it around the **residents**. Start from GDP, add the income residents earn abroad, subtract the income that foreign owners earn inside the country, and you have GNI.' },
    { type: 'bullets', items: [
      'A country whose firms own a lot abroad tends to have **GNI above GDP**.',
      'A country where much of the industry is foreign-owned tends to have **GNI below GDP**, because the profits leave.',
      'For most large economies the two are close, and either can be used — but a question naming one is asking about that one.',
    ] },
    { type: 'paragraph', text: 'The distinction matters most where the gap is large. Two countries can produce the same output and have very different incomes available to the people who live in them, and that is the gap GNI is designed to show.' },
  ],
  realExample: { emoji: '✈️', text: 'Profits a resident firm earns on a factory it owns in another country are income to a resident that was not produced at home. They raise GNI and leave GDP untouched.' },
  misconception: 'Students write that GNI counts the income of a country\'s citizens. It counts the income of its RESIDENTS — the people and firms based there — which is not the same group and is the word the measure is defined on.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) of a distinction requires knowledge, understanding and application. Name the boundary each measure draws, then say which direction the gap runs for the economy in the question and why.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each item into whether it is counted in Andara\'s GDP or in its GNI:',
    groups: [
      { name: "Counted in Andara's GDP", why: 'GDP counts output produced inside the territory, whoever owns the producer', items: [
        'A foreign-owned factory producing goods in Andara',
        'A restaurant in Andara owned by a resident',
      ] },
      { name: "Counted in Andara's GNI", why: 'GNI counts income received by residents, wherever in the world it was earned', items: [
        'Profits an Andaran firm earns from its operations overseas',
        'Wages an Andaran resident earns while working abroad',
        'Rent an Andaran resident receives on a property abroad',
      ] },
    ],
  }),
}));

const realAndNominal = sub('real-vs-nominal-gdp', (sid) => ({   // March id, kept
  title: 'Real and Nominal',
  keyIdea: 'Nominal GDP is measured at the prices of the year it happened; real GDP is measured at constant prices, so only real GDP can tell you whether output changed.',
  body: [
    { type: 'paragraph', text: '**Nominal GDP** is output valued at the prices of the year in which it was produced. **Real GDP** is output valued at the prices of one fixed year, so the effect of price changes is taken out.' },
    { type: 'paragraph', text: `Andara's year 3 is the case that settles why the distinction exists. Nominal GDP rose from ${bn(NOMINAL[1])} to ${bn(NOMINAL[2])} — a rise of ${pc(nominalGrowth(2))}. Real GDP fell from ${bn(realAt(1))} to ${bn(realAt(2))} — ${pc(realGrowth(2))}. Both figures are correct and they point in opposite directions.` },
    { type: 'flow', steps: [
      { title: 'Prices rose over the year', subtitle: `the price index went from ${idx(GDP_INDEX[1])} to ${idx(GDP_INDEX[2])}` },
      { title: 'The same output would sell for more', subtitle: 'so the money figure rises even if nothing extra is made' },
      { title: 'Less was actually produced', subtitle: 'the fall shows once the figures are put at the same prices' },
      { title: 'Only the real figure measures growth', subtitle: `real GDP ${pc(realGrowth(2))}, so year 3 is a contraction` },
    ], result: 'A rising nominal figure is not evidence of growth', resultType: 'bad' },
    { type: 'paragraph', text: 'This is why the specification defines economic growth on **real** GDP. A measure that rises whenever prices rise cannot answer the question growth is asked to answer.' },
  ],
  realExample: { emoji: '📈', text: 'A shop reports that its sales in dollars are up on last year. Until you know what happened to its prices, you do not know whether it sold more.' },
  misconception: 'Students describe nominal GDP as "wrong" and real GDP as "right". Both are accurate measurements of different things. Nominal GDP is the right figure for a question about money spent; real GDP is the right figure for a question about output.',
  examMatters: 'An Analyse (6 marks, WEC12 Appendix 6) requires a developed chain of reasoning. Taking a nominal rise, a price rise and a real fall through in that order is the chain; stating that they differ is not.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these steps in the causal order that explains how Andara\'s nominal GDP rose in a year when its output fell, from the price change to the conclusion:',
    correctOrder: [
      'Prices across the economy rose over the year',
      'The same output would therefore sell for more dollars',
      'Nominal GDP rose even though less was produced',
      'Valued at constant prices, real GDP is seen to have fallen',
    ],
    why: [
      'The price change is the outside event; nothing in the chain caused it',
      'Valuing unchanged output at higher prices is what raises the money figure',
      'So the nominal figure moves for a reason that has nothing to do with output',
      'Holding prices constant is the only way to see what happened to output itself',
    ],
  }),
}));

const totalAndPerCapita = sub('gdp-per-capita', (sid) => ({   // March id, kept
  title: 'Total and Per Capita',
  keyIdea: 'Total GDP measures the size of an economy; GDP per capita divides it by the population, and the two can move in completely different directions.',
  body: [
    { type: 'paragraph', text: '**Total GDP** is the whole figure. **GDP per capita** is that figure divided by the population — the output per person. For a question about living standards it is almost always the per capita figure that matters, because a country can produce more simply by having more people in it.' },
    { type: 'paragraph', text: `Andara's year 2 shows what the division does. Real GDP rose ${pc(realGrowth(1))}, from ${bn(realAt(0))} to ${bn(realAt(1))}. The population rose from ${POP[0]}m to ${POP[1]}m, which is also ${pc(realGrowth(1))}. Real GDP per capita was ${money(perCapitaAt(0))} before and ${money(perCapitaAt(1))} after: a change of ${pc(perCapitaGrowth(1))}.` },
    { type: 'paragraph', text: `The economy grew by every headline measure and the average person was **exactly as well off as before**. In year 3 the two move together instead: output fell ${pc(realGrowth(2))} with the population unchanged, so per capita output fell ${pc(perCapitaGrowth(2))} as well, to ${money(perCapitaAt(2))}.` },
    { type: 'bullets', items: [
      'Growth **above** the rate of population growth raises output per person.',
      'Growth **equal to** it leaves output per person where it was.',
      'Growth **below** it lowers output per person while the total still rises.',
    ] },
  ],
  realExample: { emoji: '👥', text: 'A fast-growing economy with a fast-growing population can report years of solid growth in which the output available per person barely moves.' },
  misconception: 'Students treat growth in total GDP as growth in living standards. Andara\'s year 2 is the counter-example: the total rose 4% and output per person did not move at all, because the population rose at the same rate.',
  examMatters: 'A Calculate (2 or 4 marks, WEC12 Appendix 6) requires a calculation from given data, and workings should be shown. GDP per capita is real GDP divided by population; show the division before the answer.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the reasoning about Andara\'s year 2:',
    template: [
      `Real GDP rose by ${pc(realGrowth(1))} and the population rose by the ___ percentage`,
      `so real GDP per capita changed by ___`,
      'which shows that total growth alone cannot measure living ___',
    ],
    answers: ['same', '0%', 'standards'],
    hints: ['the two rates were not different', 'the figure that made the two years identical per person', 'what GDP per capita is used as a proxy for'],
    distractors: ['double', 'costs'],
  }),
}));

const valueAndVolume = sub('value-and-volume', (sid) => ({
  title: 'Value and Volume',
  keyIdea: 'Volume is how much was produced; value is what it was worth. The two can move in opposite directions, so a figure in dollars cannot tell you what happened to output.',
  body: [
    { type: 'paragraph', text: 'The third distinction the specification draws between measures of GDP and GNI is **value against volume**. A **volume** measure counts quantities — barrels, tonnes, units. A **value** measure counts what those quantities were worth in money.' },
    { type: 'paragraph', text: `An exporter shipped ${OIL[0].barrels}m barrels at ${money(OIL[0].price)} a barrel in year 1, earning ${bn(oilValue(0))}. In year 2 it shipped ${OIL[1].barrels}m barrels at ${money(OIL[1].price)}, earning ${bn(oilValue(1))}.` },
    { type: 'bullets', items: [
      `**Volume ${pc(OIL_VOLUME_CHANGE)}** — more was produced and more was shipped.`,
      `**Value ${pc(OIL_VALUE_CHANGE)}** — less money came in for it.`,
      'Both statements are true of the same year, and a report quoting only one of them is incomplete.',
    ] },
    { type: 'paragraph', text: 'The relationship to real and nominal is close but not identical. Real and nominal are about the **prices used to value output**; value and volume are about **what is being counted at all** — money, or quantity. A volume measure needs no price index because it never uses prices.' },
  ],
  realExample: { emoji: '🛢️', text: 'An oil exporter can raise production, fill more tankers and report lower export earnings, because the price a barrel sells for fell faster than output rose.' },
  misconception: 'Students use "value" and "real" as though they meant the same thing. A value measure is in money and can be either real or nominal; a volume measure is in quantities and is neither, because no price enters it.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) of a distinction requires the meaning of each term joined to why it matters. The reason value and volume are distinguished is that they can move in opposite directions.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each figure to what it is a measure of:',
    pairs: [
      { left: `${OIL[1].barrels}m barrels shipped`, right: 'a volume measure' },
      { left: `${bn(oilValue(1))} of export earnings`, right: 'a value measure' },
      { left: `${bn(realAt(2))} of output at year 1 prices`, right: 'a real value measure' },
      { left: `${bn(NOMINAL[2])} of output at year 3 prices`, right: 'a nominal value measure' },
    ],
    why: [
      'Barrels are a quantity, so no price enters the figure at all',
      'Earnings are in money, so the figure depends on the price as well as the quantity',
      'A value measure held at the prices of one fixed year is a real measure',
      'A value measure at the prices of the year itself is a nominal measure',
    ],
    distractors: ['a population measure'],
  }),
}));

/* ══ Block 2 — Comparing Growth (1d, 1e, 1f, 1g) ════════════════════════════ */

const comparingBetweenCountries = sub('uses-of-gdp-data', (sid) => ({   // March id, kept
  title: 'Comparing Growth Between Countries',
  keyIdea: 'Comparing GDP or GNI growth across countries needs one currency, one basis and a per capita figure, and each of those choices changes the answer.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **comparison of GDP and GNI rates of growth between countries and over time**. Both halves are harder than they look, and the first is a matter of making the figures comparable at all.' },
    { type: 'bullets', items: [
      '**One currency.** Two countries measure output in their own money, so one has to be converted. Which exchange rate is used to convert changes the result, which is why the next subsection exists.',
      '**One basis.** Compare real with real. A country with fast inflation will out-grow everyone on nominal figures alone.',
      '**Per capita where the question is about people.** A large country will produce more in total than a small one whatever is happening to the people in it.',
      '**Growth rates, or levels — not both at once.** A country growing at 6% from a low level can still produce far less per person than one growing at 1%.',
    ] },
    { type: 'paragraph', text: 'None of this makes comparison useless. It makes the comparison a set of choices that an answer has to state, because a figure quoted without them can support almost any conclusion.' },
  ],
  realExample: { emoji: '🌍', text: 'Two economies report the same growth rate for the year. One has a rising population and one a falling population, and the output available per person moves in opposite directions.' },
  misconception: 'Students compare growth rates as though a higher rate always meant a richer country. A growth rate is a change, not a level, and the fastest-growing economies are often those starting from the lowest output per person.',
  examMatters: 'A Discuss (14 marks, WEC12 Appendix 6) requires an argument supported by a chain of reasoning, with different viewpoints recognised. Naming what a comparison holds constant is one such viewpoint, and the figures needed to state it are given in the data.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each adjustment into whether it is needed to compare two countries in one year, or to compare one country across years:',
    groups: [
      { name: 'Comparing two countries', why: 'The problem is that the two economies are measured in different money and are different sizes', items: [
        'Convert both figures into a single currency',
        'Divide each figure by its population',
      ] },
      { name: 'Comparing one country over time', why: 'The problem is that prices in that country changed between the years', items: [
        'Value both years at the prices of one fixed year',
        'Check whether the population changed between the years',
      ] },
    ],
  }),
}));

const comparingOverTime = sub('comparing-growth-over-time', (sid) => ({
  title: 'Comparing Growth Over Time',
  keyIdea: 'Comparing a country with its own past needs the same constant prices, the same definitions and the same period length, and the base year chosen changes how large the growth looks.',
  body: [
    { type: 'paragraph', text: 'Comparing one country across years removes the currency problem and leaves three others.' },
    { type: 'bullets', items: [
      '**The same prices.** Both years valued at the prices of one fixed **base year**, or the comparison measures inflation instead of growth.',
      '**The same definitions.** What is counted in the national accounts can be revised, and a revision that raises the figure raises the growth rate in the year it lands.',
      '**The same length of period.** A quarterly change and an annual change are not comparable figures, however similar they look.',
    ] },
    { type: 'paragraph', text: `The base year is the choice with the largest effect. Andara's figures use year 1 as the base, so its index is ${idx(GDP_INDEX[0])} and its real and nominal figures are identical in that year — ${bn(NOMINAL[0])} either way. Rebase on year 2 and every real figure changes, although the growth RATES between the years do not.` },
    { type: 'paragraph', text: 'The further apart the years, the weaker the comparison, because more of what an economy produces has changed. Comparing this year with last is a comparison between similar things; comparing this year with fifty years ago is not.' },
  ],
  realExample: { emoji: '🗓️', text: 'A statistics agency rebases its national accounts onto a more recent year. Every real figure in the series changes, and the growth rates between the years do not.' },
  misconception: 'Students treat the base year as part of the growth rate. Changing it changes every level in the series and leaves the percentage changes between years alone, which is the point of measuring growth as a rate.',
  examMatters: 'An Examine (8 marks, WEC12 Appendix 6) requires a chain of reasoning, the data given to be interpreted, and a brief assessment of the arguments — the lowest tariff here that asks for evaluation. A comparison across time and what it holds constant is exactly that shape of question.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the requirements of a comparison across years:',
    template: [
      'Both years must be valued at the prices of one fixed ___ year',
      'the definitions behind the figures must be the ___',
      'and the two periods compared must be of equal ___',
    ],
    answers: ['base', 'same', 'length'],
    hints: ['the year the index is set to 100 in', 'unchanged between the two figures', 'a quarter against a year is not a fair pair'],
    distractors: ['current', 'currency'],
  }),
}));

const purchasingPowerParities = sub('purchasing-power-parities', (sid) => ({
  title: 'Purchasing Power Parities',
  keyIdea: 'A purchasing power parity converts currencies at what the money actually buys rather than at the market rate, which is why it is used to compare living standards.',
  body: [
    { type: 'paragraph', text: 'Converting at the **market exchange rate** tells you what a currency trades for. It does not tell you what that currency buys at home, and for a comparison of living standards it is what it buys that matters.' },
    { type: 'paragraph', text: 'A **purchasing power parity (PPP)** is the conversion rate at which a given basket of goods costs the same in both countries. Purchasing power parities are used for international comparisons of real GDP and GNI, because converting at PPP compares incomes by what they can be spent on.' },
    { type: 'paragraph', text: `Berewa's average income is ${PPP_ROWS[1].local.toLocaleString('en-GB')} in its own currency. At the market rate that is ${money(atMarket(PPP_ROWS[1]))} — half Andara's ${money(atMarket(PPP_ROWS[0]))}. At PPP it is ${money(atPPP(PPP_ROWS[1]))}, the same as Andara's. The incomes are identical in what they buy and look twice apart at the market rate.` },
    { type: 'bullets', items: [
      'Prices for things that cannot be traded across borders — housing, haircuts, local services — tend to be **lower** in lower-income countries.',
      'So a market rate, which is set mostly by traded goods and by financial flows, **understates** those countries\' real incomes.',
      'PPP figures are estimates, built from a basket someone had to choose, so they carry their own uncertainty.',
    ] },
  ],
  realExample: { emoji: '🧺', text: 'The same basket of food, rent and transport costs far less in one country than another. The income needed to buy it is lower, and a conversion at the market rate misses that entirely.' },
  misconception: 'Students describe PPP as "the correct exchange rate". It is not a rate anyone trades at; it is a conversion built for comparison, and its accuracy depends on the basket it was built from.',
  examMatters: 'A Define (2 marks, WEC12 Appendix 6) requires the meaning of the term. A purchasing power parity is the rate at which a given basket of goods costs the same in two countries — the basket is what makes it a definition.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each conversion to what it tells you about an income:',
    pairs: [
      { left: 'Converted at the market exchange rate', right: 'what the money would trade for abroad' },
      { left: 'Converted at purchasing power parity', right: 'what the money actually buys at home' },
      { left: 'Not converted at all', right: 'a figure that cannot be compared across countries' },
    ],
    why: [
      'The market rate is set by trade and by financial flows, not by the cost of living',
      'A PPP is built so that the same basket costs the same in both places',
      'Two figures in two different currencies are not a comparison until one is converted',
    ],
    distractors: ['the rate of inflation last year'],
  }),
}));

const positiveAndNegativeGrowth = sub('positive-and-negative-growth-rates', (sid) => ({
  title: 'Positive and Negative Growth Rates',
  keyIdea: 'A positive growth rate means real output is larger than it was; a negative growth rate means it is smaller — not that growth has slowed.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the distinction between **positive and negative economic growth rates**, and it is the distinction that a single word most often destroys.' },
    { type: 'bullets', items: [
      `**A positive growth rate** means real output is **larger** than in the period before. Andara's year 2 was ${pc(realGrowth(1))}.`,
      `**A negative growth rate** means real output is **smaller** than in the period before. Andara's year 3 was ${pc(realGrowth(2))}: the economy produced ${bn(r2(realAt(1) - realAt(2)))} less than the year before.`,
    ] },
    { type: 'paragraph', text: 'A growth rate that **falls** from 4% to 2% is still positive. The economy is still larger than it was; it grew by less than before. Output has not fallen at any point, and describing that as a fall in output is wrong by the length of the whole increase.' },
    { type: 'paragraph', text: 'The words that mark the difference are worth fixing: growth **slowing** is a fall in the rate, and growth **turning negative** is a fall in output. A data-response answer that uses one for the other has misread the table it was given.' },
  ],
  realExample: { emoji: '📉', text: 'An economy reports growth of 3% one year and 1% the next. It is larger in both years, and larger at the end than at the start, even though the second figure is worse news than the first.' },
  misconception: 'Students read a falling growth rate as a shrinking economy. Output is still rising whenever the rate is positive; only a negative rate means the economy produced less than it did before.',
  examMatters: 'A Calculate (2 or 4 marks, WEC12 Appendix 6) requires a calculation based on given data, with workings shown. A growth rate is the change in real GDP divided by the earlier figure, multiplied by 100, and the sign is part of the answer.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each description of a REAL growth rate into whether real output rose or fell over the period:',
    groups: [
      { name: 'Real output rose', why: 'The growth rate is positive, so the economy is larger than it was', items: [
        'Real growth of 4.0%',
        'Real growth slowed from 4.0% to 1.0%',
        'Real growth of 0.8%',
      ] },
      { name: 'Real output fell', why: 'The growth rate is negative, so the economy produced less than it did before', items: [
        'Real growth of −2.5%',
        `Real GDP went from ${bn(realAt(1))} to ${bn(realAt(2))}`,
      ] },
    ],
  }),
}));

const recession = sub('recession', (sid) => ({
  title: 'Recession',
  keyIdea: 'The specification defines a recession as two consecutive quarters of negative economic growth — a definition about quarters, not about how bad the year felt.',
  body: [
    { type: 'paragraph', text: 'A **recession** is defined by the specification as **two consecutive quarters of negative economic growth**. Every word of that is load-bearing.' },
    { type: 'bullets', items: [
      '**Two** — one bad quarter is not a recession, however large the fall.',
      '**Consecutive** — the two quarters must follow one another. Two negative quarters with a positive one between them do not meet the definition.',
      '**Quarters** — the measurement is quarterly, so an annual figure alone cannot tell you whether the definition was met.',
      '**Negative growth** — output smaller than the quarter before, not growth that has merely slowed.',
    ] },
    /*
     * The step TITLES carry the words, because `reorder.source` reads a flow step's title and
     * nothing else (lib/content-validator.mjs:347). With the quarters as titles and the description
     * in the subtitle, this flow shared no word with the reorder below it and the sequence counted
     * as one the section never taught.
     */
    { type: 'flow', steps: [
      { title: 'Output is still rising in Q1', subtitle: `growth of ${pc(QUARTERS[0])}, so the count has not started` },
      { title: 'The first negative quarter arrives in Q2', subtitle: `${pc(QUARTERS[1])}: output smaller than the quarter before` },
      { title: 'A second consecutive negative quarter in Q3', subtitle: `${pc(QUARTERS[2])} — the definition is met here` },
      { title: 'Q4 is negative again, inside the same recession', subtitle: `${pc(QUARTERS[3])} — meeting the two-quarter count does not end a recession, it only identifies one` },
    ], result: `Those four quarters are Andara's year 3, whose annual real growth was ${pc(realGrowth(2))}`, resultType: 'neutral' },
    { type: 'paragraph', text: 'Because the definition is mechanical, it can be met by a shallow fall and missed by a deep one that happens to be interrupted. That is a known weakness of it, and it is not a reason to answer with a different definition.' },
  ],
  realExample: { emoji: '📊', text: 'A statistics agency publishes its second consecutive quarter of negative growth. The definition is met that morning, whatever anyone had been calling the situation the week before.' },
  misconception: 'Students call any bad year a recession. The definition counts quarters: two negative ones in a row. A year with one sharp negative quarter and three positive ones is not a recession by this measure.',
  examMatters: 'A Define (2 marks, WEC12 Appendix 6) requires the meaning of a term. For recession that is the number of quarters, that they are consecutive, and that the growth is negative; dropping any of the three leaves a description rather than a definition.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these quarters in the order they occurred through Andara\'s year 3, from the first quarter to the last:',
    correctOrder: [
      `Output still rising: growth of ${pc(QUARTERS[0])}`,
      `The first negative quarter: ${pc(QUARTERS[1])}`,
      `A second consecutive negative quarter: ${pc(QUARTERS[2])}`,
      `Negative again, still inside the same recession: ${pc(QUARTERS[3])}`,
    ],
    why: [
      'A positive quarter cannot be part of the run the definition counts',
      'The run of negative quarters has to start somewhere, and this is where',
      'Two in a row is the definition, so it is met at the end of this quarter',
      'Meeting the count identifies a recession; it does not end one',
    ],
  }),
}));

/* ══ Block 3 — What GDP Leaves Out (1h, 1i) ═════════════════════════════════ */

const limitationsOfGdp = sub('limitations-of-gdp', (sid) => ({   // March id, kept
  title: 'Limitations of GDP and GNI',
  keyIdea: 'GDP and GNI count output that passes through a market, so every limitation is something real that either never reaches a market or is not visible in a total.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **limitations of using GDP and GNI to compare living standards between countries and over time**. They fall into two groups, and saying which group a limitation is in is most of the analysis.' },
    { type: 'subheading', text: 'Things the total never counted' },
    { type: 'bullets', items: [
      '**Unpaid work** — care, housework, subsistence farming. The work is done and no market records it, so a country where more of it is paid for will look richer on the same real activity.',
      '**Undeclared activity** — work that is deliberately not recorded. It is a larger share of some economies than others.',
      '**Resources used up** — output that depletes a forest or a fishery counts in full, and the loss does not appear anywhere.',
    ] },
    { type: 'subheading', text: 'Things a total cannot show' },
    { type: 'bullets', items: [
      '**Distribution** — the same GDP per capita can be shared evenly or very unevenly.',
      '**What the output was** — spending to repair damage adds to GDP exactly as spending on something new does.',
      '**Leisure** — a country producing the same output in fewer hours is better off, and the figure is identical.',
    ] },
    { type: 'paragraph', text: 'None of this makes GDP the wrong measure. It makes it a measure of **output**, used as a proxy for living standards and needing to be argued for whenever it is used that way.' },
  ],
  realExample: { emoji: '🏠', text: 'When work that was done unpaid at home starts being bought from a business instead, measured GDP rises. The same work is being done, by more people, for money.' },
  misconception: 'Students conclude that GDP is useless as a measure of living standards. It is a good measure of output and an imperfect proxy for living standards. "Imperfect and stated why" is an argument; "useless" is a refusal to make one.',
  examMatters: 'An Evaluate (20 marks, WEC12 Appendix 6) requires arguments weighed and a supported judgement. Limitations listed are knowledge; a judgement about whether they matter in the country in the extract is what the command word asks for.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each limitation into whether it is output the total never counted, or something a total cannot show:',
    groups: [
      { name: 'Never counted', why: 'The activity is real and never passes through a market the accounts can see', items: [
        'Care given to a relative without payment',
        'Work paid in cash and not declared',
      ] },
      { name: 'A total cannot show it', why: 'The activity is counted correctly; the single figure simply cannot reveal this about it', items: [
        'How evenly income is shared between people',
        'Whether the spending repaired damage or created something new',
        'How many hours had to be worked to produce it',
      ] },
    ],
  }),
}));

const wellbeingIndicators = sub('wellbeing-indicators', (sid) => ({
  title: 'Indicators of National Happiness and Wellbeing',
  keyIdea: 'Wellbeing indicators measure how life is experienced rather than what was produced, and they are collected alongside GDP rather than instead of it.',
  body: [
    { type: 'paragraph', text: 'Because GDP measures output and is used as a proxy for how people live, statistics agencies also collect **indicators of national happiness and wellbeing** — measures of the experience itself.' },
    { type: 'bullets', items: [
      '**Reported life satisfaction** — people are asked directly how satisfied they are with life as a whole.',
      '**Life expectancy** — how long people can expect to live, which captures health and safety in one figure.',
      '**Education** — typically years of schooling, or how many complete a stage of it.',
      '**Leisure** — time not spent working, which GDP cannot see at all.',
      '**Reported health** — how well people say they are, which differs from how well they are recorded as being.',
    ] },
    { type: 'paragraph', text: 'Two features separate these from GDP. They **ask** rather than count, so they capture what a person thinks of their own life and inherit everything that makes self-reporting unreliable. And several are **bounded**: satisfaction on a scale of ten cannot keep rising the way output can, so a country near the top of the scale can improve and barely move.' },
    { type: 'paragraph', text: 'They are used **alongside** GDP. A country with rising output and falling life expectancy is telling you something that neither figure says on its own.' },
  ],
  realExample: { emoji: '🙂', text: 'A national survey asks people to rate their satisfaction with life from zero to ten. The average it produces is a number no measure of output could have generated.' },
  misconception: 'Students present wellbeing indicators as replacements for GDP. They measure something different, are collected less often, and rest on what people say. The argument is for using them with GDP, not instead of it.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) requires understanding applied to a context. Naming an indicator is knowledge; saying what it captures that GDP cannot, for the country in the question, is the application.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete what separates a wellbeing indicator from a measure of output:',
    template: [
      'A wellbeing indicator ___ people rather than counting production',
      'so it captures what a person thinks of their own ___',
      'and it is used ___ GDP rather than in place of it',
    ],
    answers: ['asks', 'life', 'alongside'],
    hints: ['a survey does this; a national accounts team does not', 'the thing being rated out of ten', 'both figures together, not one or the other'],
    distractors: ['counts', 'instead of'],
  }),
}));

const incomeAndHappiness = sub('real-incomes-and-subjective-happiness', (sid) => ({
  title: 'Real Incomes and Subjective Happiness',
  keyIdea: 'Subjective happiness rises with real income and flattens as income grows, so extra income adds most where there is least of it.',
  body: [
    { type: 'paragraph', text: 'The specification asks for **the relationship between real incomes and subjective happiness**, and the shape of that relationship is the answer.' },
    { type: 'paragraph', text: 'Across countries and across people within a country, higher **real income** goes with higher **reported happiness**. The relationship is positive, and it is not a straight line: it **rises steeply at low incomes and flattens as income grows**.' },
    { type: 'bullets', items: [
      `At ${money(12000)} a year, extra income buys things that change a life — food security, shelter, healthcare — and reported satisfaction moves sharply.`,
      `At ${money(48000)}, the same extra income buys more of what someone already has, and satisfaction moves far less.`,
      'The line rises throughout: more income does not make people less happy. It adds less and less.',
    ] },
    { type: 'paragraph', text: 'Two reasons are usually given. People compare themselves with those around them, so what matters is partly **relative** income and a rise everyone shares changes little. And people **adjust** to a new level of income and return towards the satisfaction they reported before.' },
    { type: 'paragraph', text: 'For the purpose of this topic, the consequence is exact: real GDP per capita tracks happiness closely where incomes are low and loosely where they are high, which is precisely where GDP is most often used to compare living standards.' },
  ],
  realExample: { emoji: '📈', text: 'A survey finds that the difference in reported satisfaction between the poorest and middle-income groups is far larger than the difference between middle and highest.' },
  misconception: 'Students say that money does not buy happiness. The evidence says it buys a great deal of it at low incomes and progressively less at high ones. "It adds less as there is more of it" is the finding; "it makes no difference" is not.',
  examMatters: 'A Discuss (14 marks, WEC12 Appendix 6) requires an argument with different viewpoints recognised. The flattening of this relationship is the evidence for and against using GDP per capita as a proxy, depending on the income level of the country in question.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each feature of the relationship to what it means for using GDP per capita as a proxy for living standards:',
    pairs: [
      { left: 'The line rises everywhere', right: 'higher real income does go with higher reported happiness' },
      { left: 'It is steep at low incomes', right: 'GDP per capita tracks wellbeing closely in a low-income country' },
      { left: 'It flattens at high incomes', right: 'GDP per capita tracks wellbeing loosely in a high-income country' },
      { left: 'People compare themselves with others', right: 'a rise everyone shares changes reported happiness little' },
    ],
    why: [
      'A positive relationship is the reason the proxy is used at all',
      'Where income is scarce, extra income changes what a life contains',
      'Where income is plentiful, extra income buys more of what is already there',
      'Relative position is unchanged when every income rises together',
    ],
  }),
}));

/* ══ Block 4 — Measuring Inflation (2a, 2b, 2c, 2d) ═════════════════════════ */

const inflationDeflationDisinflation = sub('inflation-deflation-disinflation', (sid) => ({
  title: 'Inflation, Deflation and Disinflation',
  keyIdea: 'Inflation is a sustained rise in the general price level, deflation a sustained fall in it, and disinflation a fall in the RATE of inflation while prices are still rising.',
  body: [
    { type: 'paragraph', text: 'Three terms, two of which students routinely swap.' },
    { type: 'bullets', items: [
      '**Inflation** — a sustained rise in the **general price level**. Prices on average are higher than they were.',
      '**Deflation** — a sustained **fall** in the general price level. Prices on average are lower than they were.',
      '**Disinflation** — a fall in the **rate** of inflation. Prices are still rising, and rising more slowly than before.',
    ] },
    { type: 'paragraph', text: `Andara's index makes the third concrete. It was ${idx(CPI_SERIES[0])} in year 1, ${idx(CPI_SERIES[1])} in year 2 and ${idx(CPI_SERIES[2])} in year 3. Inflation was ${pc(INFLATION)} and then ${pc(INFLATION_Y3)}: prices rose in **both** years, and the rate fell. Year 3 is inflation and disinflation at the same time.` },
    { type: 'paragraph', text: 'Deflation would need the index itself to go **below** the year before. It never does here. The test is simple: look at the index, not the rate. A falling rate with a rising index is disinflation; a falling index is deflation.' },
    { type: 'paragraph', text: '"Sustained" does real work in all three definitions. A single month of higher prices caused by a bad harvest is not inflation; the word describes a continuing movement in the general level, not a change in one price.' },
  ],
  realExample: { emoji: '🧮', text: 'A country reports that inflation has fallen from 6% to 2%. Prices are higher than they were a year ago in both figures; what has fallen is the speed at which they are climbing.' },
  misconception: 'Students call falling inflation "deflation". Falling inflation is disinflation and prices are still rising. Deflation is the price index itself falling, which is a different situation with different causes and different effects.',
  examMatters: 'A Define (2 marks, WEC12 Appendix 6) requires the meaning of the term. Each of these three needs "the general price level" and a direction; without "general" the definition describes one product rather than an economy.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each description of a price index into inflation, disinflation or deflation:',
    groups: [
      { name: 'Inflation', why: 'The index is higher than it was, so the general price level rose', items: [
        `The index rose from ${idx(CPI_SERIES[0])} to ${idx(CPI_SERIES[1])}`,
        'The index rose by 8% over the year',
      ] },
      { name: 'Disinflation', why: 'The index is still rising and the rate at which it rises has fallen', items: [
        `The index rose ${pc(INFLATION)} one year and ${pc(INFLATION_Y3)} the next`,
        'Inflation fell from 6% to 2%',
      ] },
      { name: 'Deflation', why: 'The index itself is lower than it was, so the general price level fell', items: [
        'The index fell from 104 to 102',
      ] },
    ],
  }),
}));

const buildingACpi = sub('cpi-construction', (sid) => ({   // March id, kept
  title: 'Building a Consumer Price Index',
  keyIdea: 'A consumer price index tracks the cost of a fixed basket of goods and services, with each group weighted by how much of their spending households give it.',
  body: [
    { type: 'paragraph', text: 'Inflation is measured with a **consumer price index (CPI)**, and the specification asks for the calculation "including role of weighted basket of goods and services". The weights are the part that does the work.' },
    { type: 'flow', steps: [
      { title: 'Survey households to find what they spend on', subtitle: 'which fixes the representative basket of goods and services' },
      { title: 'Give each group a weight from its share of spending', subtitle: 'so a group matters in proportion to what is spent on it' },
      { title: 'Multiply each group\u2019s weight by its price index', subtitle: 'each index set to 100 in the base year' },
      { title: 'Add the results and divide by the total weight', subtitle: 'which returns the figure to the scale of an index' },
    ], result: 'A weighted average, so a price rise counts for as much as the spending behind it', resultType: 'good' },
    { type: 'paragraph', text: `For Andara: food carries a weight of ${BASKET[0].weight} and its prices are at ${idx(BASKET[0].index)}, housing ${BASKET[1].weight} at ${idx(BASKET[1].index)}, transport ${BASKET[2].weight} at ${idx(BASKET[2].index)}, and everything else ${BASKET[3].weight} at ${idx(BASKET[3].index)}. The weights add to ${weightSum(BASKET)}.` },
    { type: 'paragraph', text: `Without weights, any price would count as much as every price. Work two contributions out: food rose ${BASKET[0].index - 100}% on a weight of ${BASKET[0].weight}, transport ${BASKET[2].index - 100}% on a weight of ${BASKET[2].weight}. Both add **exactly 2.4** of the index's 5.8 points — a bigger price rise on a smaller share of spending lands in the same place.` },
  ],
  realExample: { emoji: '🛒', text: 'A basket is reviewed each year and items are added and removed as spending changes. The index continues, and what it is measuring has quietly moved.' },
  misconception: 'Students think the index tracks every price in the economy. It tracks a chosen basket, weighted by spending. That is the reason it can be calculated at all and the source of most of its limitations.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) of a process requires the steps joined by reasons. The reason for weighting is that spending is not spread evenly, so an unweighted average would misrepresent what households face.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put the steps of building a consumer price index in the order they are carried out, from the survey to the finished index:',
    correctOrder: [
      'Survey households to find what they spend their money on',
      'Give each group of goods a weight from its share of spending',
      'Multiply each group\'s weight by its price index',
      'Add the results and divide by the total weight',
    ],
    why: [
      'Nothing can be weighted until it is known what households actually buy',
      'The weight has to exist before it can be applied to anything',
      'Applying the weight to the price index is what makes the average weighted',
      'Dividing by the total weight returns the result to the scale of an index',
    ],
  }),
}));

const calculatingInflation = sub('measuring-inflation', (sid) => ({   // March id, kept
  title: 'Calculating Inflation from the Index',
  keyIdea: 'The index is a level and inflation is its percentage change, so the arithmetic is the weighted average first and the percentage change second.',
  body: [
    { type: 'paragraph', text: 'Two calculations, in order. First the index for the year, then the rate of inflation from it.' },
    { type: 'subheading', text: 'The index' },
    { type: 'paragraph', text: `Multiply each weight by its price index and add: ${BASKET.map((g) => `${g.weight} × ${idx(g.index)}`).join(' + ')} = ${TOTAL.toLocaleString('en-GB')}. Divide by the total weight: ${TOTAL.toLocaleString('en-GB')} ÷ ${weightSum(BASKET)} = **${idx(CPI)}**.` },
    { type: 'subheading', text: 'The rate' },
    { type: 'paragraph', text: `Inflation is the percentage change in the index. The base year was ${idx(CPI_SERIES[0])}, so the arithmetic is (${idx(CPI)} − ${idx(CPI_SERIES[0])}) ÷ ${idx(CPI_SERIES[0])} × 100 = **${pc(INFLATION)}**. When the base year is 100, the rate reads straight off the index — but only in that year.` },
    { type: 'paragraph', text: `In any later year the subtraction is from the **previous year's index**, not from 100. From ${idx(CPI_SERIES[1])} to ${idx(CPI_SERIES[2])} the rate is (${idx(CPI_SERIES[2])} − ${idx(CPI_SERIES[1])}) ÷ ${idx(CPI_SERIES[1])} × 100 = ${pc(INFLATION_Y3)}, not the ${pc(r2(CPI_SERIES[2] - 100))} that subtracting 100 would give.` },
    { type: 'paragraph', text: 'That second slip is the commonest in the topic, and it is invisible in the base year — which is exactly why it survives to the year where it matters.' },
  ],
  realExample: { emoji: '🔢', text: `An index moves from ${idx(CPI_SERIES[1])} to ${idx(CPI_SERIES[2])}. Reading the rate as ${pc(r2(CPI_SERIES[2] - 100))} treats the base year as this year, and overstates inflation three times over.` },
  misconception: 'Students subtract 100 from the index whatever year it is. That gives the change since the BASE year, not the rate of inflation over the last one. Divide by the previous year\'s index, not by 100.',
  examMatters: 'A Calculate (2 or 4 marks, WEC12 Appendix 6) requires a calculation from given data with workings shown. Setting out the weighted total, the division and the percentage change separately is what makes a slip in one of them visible.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the arithmetic for a year that is not the base year:',
    template: [
      'Subtract the ___ year\'s index, not 100',
      'divide by that same ___',
      `so from ${idx(CPI_SERIES[1])} to ${idx(CPI_SERIES[2])} the rate is ___`,
    ],
    answers: ['previous', 'figure', pc(INFLATION_Y3)],
    hints: ['the year immediately before the one being measured', 'whatever was subtracted is what you divide by', 'the correct answer, not the one subtracting 100 gives'],
    distractors: ['base', pc(r2(CPI_SERIES[2] - 100))],
  }),
}));

const limitationsOfCpi = sub('limitations-of-the-cpi', (sid) => ({
  title: 'Limitations of the CPI',
  keyIdea: 'A consumer price index is an average over a chosen basket with fixed weights, so it can be an accurate national figure and a poor description of any particular household.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **limitations of the CPI as a measure of the rate of inflation**. Every one of them follows from how the index is built, so each can be derived rather than memorised.' },
    { type: 'subheading', text: 'It is an average over one basket' },
    { type: 'paragraph', text: `Take Andara's four price changes and re-weight them to a household that spends ${HOUSEHOLD_BASKET[0].weight} of every hundred dollars on food instead of ${BASKET[0].weight}, and ${HOUSEHOLD_BASKET[3].weight} instead of ${BASKET[3].weight} on everything else. Nothing about the prices changes. The index comes out at **${idx(CPI_HOUSEHOLD)}** rather than ${idx(CPI)} — inflation of ${pc(INFLATION_HOUSEHOLD)} against the national ${pc(INFLATION)}.` },
    { type: 'paragraph', text: 'The national figure is not wrong. It is an average, and a household weighted differently from the average experiences something different — usually one spending most of its income on essentials.' },
    { type: 'subheading', text: 'The rest' },
    { type: 'bullets', items: [
      '**The basket is fixed between reviews**, so it lags what people are buying.',
      '**Quality changes are hard to price.** A product that costs more and does more has not simply become dearer.',
      '**Buyers change what they buy** when a price rises; a fixed basket assumes they do not.',
      '**It is a sample** of prices and of households, so it carries sampling error.',
    ] },
  ],
  realExample: { emoji: '🍚', text: 'Food prices rise sharply and the prices of other goods do not. A household that spends nearly half its income on food faces far higher inflation than the national figure reports.' },
  misconception: 'Students treat a limitation as evidence the index is wrong. It measures what it was built to measure: the average change in the cost of a chosen basket. The limitation is the gap between that and the question asked of it.',
  examMatters: 'An Examine (8 marks, WEC12 Appendix 6) requires a chain of reasoning, the data given to be interpreted, and a brief assessment of the arguments — the lowest tariff here that asks for evaluation. Here it is the relationship between how the index is constructed and what it can therefore fail to capture.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each feature of how the index is built to the limitation it produces:',
    pairs: [
      { left: 'Weights come from average spending', right: 'no individual household need experience the figure' },
      { left: 'The basket is fixed between reviews', right: 'it lags changes in what people buy' },
      { left: 'Prices are collected from a sample', right: 'the figure carries sampling error' },
      { left: 'A product is tracked as one item', right: 'a change in its quality is hard to separate from its price' },
    ],
    why: [
      'An average describes the group and not the members of it',
      'Between reviews the basket describes spending that has already moved on',
      'Any survey of a sample estimates rather than counts',
      'A better product at a higher price has not simply become more expensive',
    ],
  }),
}));

const producerPriceIndex = sub('producer-price-index', (sid) => ({
  title: 'The Producer Price Index',
  keyIdea: 'The producer price index measures prices at the factory gate rather than the shop, so it moves before the consumer index and is watched as an indicator of future trends.',
  body: [
    { type: 'paragraph', text: 'The specification names the **producer (wholesale) price index as an indicator of future trends in the rate of inflation**. It measures the prices of goods as they leave the producer, before any retailer has touched them.' },
    { type: 'bullets', items: [
      '**Input prices** — what firms pay for materials, energy and components.',
      '**Output prices** — what firms charge for finished goods leaving the factory.',
    ] },
    { type: 'paragraph', text: `It leads the consumer index because a cost has to reach a firm before it can reach a shelf. Andara's producer index rose ${pc(PPI_CHANGE)} over the year while its consumer index rose ${pc(INFLATION)}; the cost pressure is in the system and has not fully arrived in shops.` },
    { type: 'paragraph', text: 'That makes it an **indicator**, not a forecast. Firms do not always pass a cost on: they may absorb it, and a cost rise that reverses quickly may never reach a consumer price at all. The lead time varies too, so the size and timing of the pass-through are both uncertain.' },
    { type: 'paragraph', text: 'It is used because it arrives **early**. A policymaker who waits for the consumer index to move is responding to something that began months before.' },
  ],
  realExample: { emoji: '🏗️', text: 'The cost of steel and energy rises sharply. Producer prices move within weeks and the goods made from them reach shops months later, at prices set after the cost was already known.' },
  misconception: 'Students treat a rise in the producer index as inflation that has already happened. It is a price firms paid or charged, not a price a household paid, and it may be absorbed before it reaches one.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) requires a two-stage chain when a reason is asked for. The chain is: producer prices rise, so firms\' costs rise, so the prices they later charge consumers are more likely to rise.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these stages in the order a cost travels through an economy, from the raw material to the shopper:',
    correctOrder: [
      'A raw material becomes more expensive',
      'The producer price index records higher input prices',
      'Firms raise the prices of the finished goods they sell on',
      'Shoppers meet those higher prices, and the consumer price index records them',
    ],
    why: [
      'The material is bought before anything is made from it',
      'This index measures prices at the point firms trade, which is where the rise lands first',
      'A cost reaches a consumer only once a firm has decided to pass it on',
      'The consumer index is the last measure to move, which is why the producer index leads it',
    ],
  }),
}));

/* ══ Block 5 — Causes of Inflation and Deflation (2e, 2f) ═══════════════════ */

const demandPull = sub('demand-pull-inflation', (sid) => ({   // March id, kept
  title: 'Demand-Pull Inflation',
  keyIdea: 'Demand-pull inflation comes from a rise in aggregate demand that output cannot meet, so the price level and real output both rise.',
  body: [
    { type: 'paragraph', text: '**Demand-pull inflation** is the first of the three causes the specification names. Aggregate demand rises; the economy cannot immediately produce more to meet it; prices rise instead.' },
    { type: 'flow', steps: [
      { title: 'Aggregate demand rises', subtitle: 'more is wanted at every price level' },
      { title: 'Output cannot rise as fast', subtitle: 'workers, materials and machinery are already in use' },
      { title: 'Buyers compete for what exists', subtitle: 'and sellers find they can charge more' },
      { title: 'The price level rises', subtitle: 'along with real output, because some extra is produced' },
    ], result: 'Both the price level and real output end higher — the pairing that names demand as the cause', resultType: 'neutral' },
    { type: 'paragraph', text: 'On a diagram with the **price level** on the vertical axis and **real output** on the horizontal, aggregate demand shifts right along an unchanged short-run aggregate supply curve. The new intersection sits up and to the right.' },
    { type: 'paragraph', text: 'The pairing is what identifies the cause. Prices and output rising **together** means demand moved. It is the only one of the four cases in this chapter where a student can be told inflation is happening and also that the economy is growing.' },
    { type: 'paragraph', text: 'How much goes into prices rather than output depends on how much spare capacity there is. An economy with idle factories and unemployed workers produces more and raises prices less.' },
  ],
  realExample: { emoji: '🔥', text: 'Spending across an economy rises quickly while factories are already running near their limit. Order books lengthen, and prices rise because output cannot.' },
  misconception: 'Students say demand-pull inflation means demand is "too high". Demand is too high relative to what can currently be produced — the same level of demand causes no inflation at all in an economy with spare capacity.',
  examMatters: 'A Draw (4 marks, WEC12 Appendix 6) requires an accurately labelled diagram. That means both axes named — price level and real output — both curves labelled, the original kept beside the new one, and the two price levels read off.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these stages of demand-pull inflation in the causal order they happen, from the change in demand to the effect on prices:',
    correctOrder: [
      'Aggregate demand rises across the economy',
      'Output cannot rise as fast, because resources are already in use',
      'Buyers compete for the output that exists',
      'The price level rises, and real output rises a little too',
    ],
    why: [
      'The rise in demand is the outside change that starts the chain',
      'If output could rise to meet it there would be no price pressure at all',
      'Competition between buyers is what actually lets sellers raise prices',
      'Both moving upward together is the signature of a demand cause',
    ],
  }),
}));

const costPush = sub('cost-push-inflation', (sid) => ({   // March id, kept
  title: 'Cost-Push Inflation',
  keyIdea: 'Cost-push inflation comes from a rise in the cost of producing each unit, so the price level rises while real output falls.',
  body: [
    { type: 'paragraph', text: '**Cost-push inflation** starts on the supply side. The cost of producing each unit rises, so less is worth supplying at every price level and firms raise prices to cover it.' },
    { type: 'bullets', items: [
      '**Raw materials and energy** become dearer, often from outside the country entirely.',
      '**Wages** rise faster than output per worker, so each unit costs more in labour.',
      '**Imported inputs** become dearer, which raises costs for every firm that uses them.',
      '**Indirect taxes** on production add to the cost of supplying each unit.',
    ] },
    { type: 'paragraph', text: 'On the same axes, short-run aggregate supply shifts up and to the left along an unchanged aggregate demand curve. The price level rises and real output **falls**.' },
    { type: 'paragraph', text: 'That is the pairing that separates it from demand-pull, and it is the reason cost-push is the harder case. Prices are rising and the economy is producing less at the same time, so anything done to bring prices down tends to reduce output further.' },
    { type: 'paragraph', text: 'Identifying the cause from the data is the skill. Inflation with output rising is demand-pull; inflation with output falling is cost-push. The diagram is how that inference is shown.' },
  ],
  realExample: { emoji: '⛽', text: 'The cost of energy rises sharply. Every firm that uses it faces higher costs per unit, and prices rise across goods that have nothing else in common.' },
  misconception: 'Students attribute cost-push inflation to firms being greedy. The firm faces a higher cost for each unit it makes; unless it raises the price, the least profitable units stop being worth producing. That is the mechanism, and it works whatever the firm would prefer.',
  examMatters: 'An Analyse (6 marks, WEC12 Appendix 6) requires a developed chain. Cost rises, so supplying each unit costs more, so less is supplied at each price level, so the price level rises and output falls — four links, not one assertion.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each situation into whether the inflation described is demand-pull or cost-push:',
    groups: [
      { name: 'Demand-pull', why: 'The price level and real output both rise, which only a rise in aggregate demand produces', items: [
        'Prices rise while output and employment also rise',
        'Spending rises quickly in an economy already near capacity',
      ] },
      { name: 'Cost-push', why: 'The price level rises while real output falls, which only a rise in costs produces', items: [
        'Prices rise while output falls and unemployment rises',
        'Imported energy becomes far more expensive',
        'Wages rise faster than output per worker',
      ] },
    ],
  }),
}));

const moneySupplyGrowth = sub('growth-of-the-money-supply', (sid) => ({
  title: 'Excessive Growth of the Money Supply',
  keyIdea: 'If the quantity of money in an economy grows much faster than its output, there is more money chasing the same goods and the price level rises.',
  body: [
    { type: 'paragraph', text: 'The third cause the specification names is **excessive growth of the money supply**. The **money supply** is the total quantity of money circulating in an economy — cash, and the deposits people can spend from.' },
    { type: 'flow', steps: [
      { title: 'The money supply grows quickly', subtitle: 'there is more money in circulation than before' },
      { title: 'Output does not grow with it', subtitle: 'the same quantity of goods and services is available' },
      { title: 'More money chases the same goods', subtitle: 'spending rises without production rising' },
      { title: 'The general price level rises', subtitle: 'each unit of money buys less than it did' },
    ], result: 'What matters is money growth ABOVE the growth of output, not money growth by itself', resultType: 'neutral' },
    { type: 'paragraph', text: 'The word **excessive** carries the argument. An economy producing more needs more money to buy it; money growing in line with output causes no inflation at all. It is the excess over what output requires that raises prices.' },
    { type: 'paragraph', text: 'The effect is clearest when it is large. Where the money supply grows very much faster than output, inflation is rapid and the link between the two is hard to dispute; where the difference is small, other causes are usually doing more of the work.' },
    { type: 'paragraph', text: 'It is closely related to demand-pull. Extra money is spent, and spending is aggregate demand — which is why the two are often seen together rather than as rivals.' },
  ],
  realExample: { emoji: '💵', text: 'An economy whose money supply grows far faster than its output sees prices rise across everything at once, in a way no single shortage could explain.' },
  misconception: 'Students say that printing money always causes inflation. Money growing in line with output does not: the extra money is needed to buy the extra goods. It is money growing faster than output that raises prices.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) of a cause requires a two-stage chain. Here: the money supply grows faster than output, so more money is spent on an unchanged quantity of goods, so the price level rises.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the condition under which money growth raises the price level:',
    template: [
      'Inflation follows when the money supply grows faster than ___',
      'because more money is then spent on an unchanged quantity of ___',
      'so each unit of money ___ less than it did',
    ],
    answers: ['output', 'goods', 'buys'],
    hints: ['what the economy actually produces', 'the things the money is spent on', 'what happens to the purchasing power of a dollar'],
    distractors: ['prices', 'costs'],
  }),
}));

const deflationFallingAd = sub('causes-of-deflation', (sid) => ({   // March id, kept
  title: 'Deflation from Falling Aggregate Demand',
  keyIdea: 'When aggregate demand falls, there is output nobody is buying, so the price level falls and real output falls with it — the damaging kind of deflation.',
  body: [
    { type: 'paragraph', text: 'The specification names three causes of deflation, and the first is **falling aggregate demand (AD)**. It is the mirror of demand-pull and the most serious of the three.' },
    { type: 'flow', steps: [
      { title: 'Aggregate demand falls', subtitle: 'less is wanted at every price level' },
      { title: 'Firms cannot sell what they produce', subtitle: 'stock builds up and orders are cut' },
      { title: 'Prices are cut to shift it', subtitle: 'and the general price level falls' },
      { title: 'Output and employment fall too', subtitle: 'because less is being produced, not just sold cheaper' },
    ], result: 'Falling prices alongside falling output: deflation with a shrinking economy behind it', resultType: 'bad' },
    { type: 'paragraph', text: 'On the diagram, aggregate demand shifts left along an unchanged short-run aggregate supply curve. Both the price level and real output end lower.' },
    { type: 'paragraph', text: 'What makes it self-reinforcing is what buyers do next. If prices are expected to keep falling, **waiting is rewarded**: a purchase delayed is a purchase made more cheaply. Delayed spending is a further fall in aggregate demand, and the process can feed itself.' },
    { type: 'paragraph', text: 'This is why deflation is treated as a problem rather than as cheaper shopping. The falling prices are a symptom of an economy producing and employing less.' },
  ],
  realExample: { emoji: '🏚️', text: 'Households across an economy cut spending at the same time. Shops discount to clear stock, and the discounts are a sign of the orders that were cancelled behind them.' },
  misconception: 'Students treat falling prices as good news for consumers. When the cause is falling demand, the same process is cutting the hours and jobs those consumers are paid from, and the purchasing power gained is smaller than the income lost.',
  examMatters: 'A Draw (4 marks, WEC12 Appendix 6) requires an accurately labelled diagram. The original AD curve stays on the page beside AD₂; a shift is only visible against where the curve was.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these stages in the causal order that runs from a fall in demand to a falling price level, from the first cause to the final effect:',
    correctOrder: [
      'Aggregate demand falls across the economy',
      'Firms cannot sell everything they have produced',
      'Prices are cut to clear the stock',
      'The general price level falls and output falls with it',
    ],
    why: [
      'The fall in spending is the outside change that starts the chain',
      'Unsold stock is what a fall in demand looks like from inside a firm',
      'Cutting the price is the firm\'s response to output it cannot sell',
      'Both falling together is what separates this from deflation caused by supply',
    ],
  }),
}));

const deflationRisingAs = sub('deflation-from-rising-aggregate-supply', (sid) => ({
  title: 'Deflation from an Increase in Aggregate Supply',
  keyIdea: 'When aggregate supply increases, the price level falls and real output rises — the same falling prices with an entirely different economy behind them.',
  body: [
    { type: 'paragraph', text: 'The second cause the specification names is an **increase in aggregate supply (AS)**. The cost of producing each unit falls, so more is supplied at every price level.' },
    { type: 'bullets', items: [
      '**New technology** lowers what each unit costs to produce.',
      '**Cheaper inputs** — materials, energy, imported components — do the same.',
      '**More productive workers** lower the labour cost of each unit.',
    ] },
    { type: 'paragraph', text: 'Short-run aggregate supply shifts down and to the right along an unchanged aggregate demand curve. The price level falls and real output **rises**.' },
    { type: 'paragraph', text: 'This is the case that makes the diagram worth drawing. Prices are falling in this subsection and the last one, and the two situations have almost nothing in common: here output is rising, firms are selling more and employment is likely rising too.' },
    { type: 'paragraph', text: 'Told only that the price level is falling, you cannot say which of the two an economy is in. **Real output is what separates them** — falling in one, rising in the other — which is why a data question on deflation gives you an output figure and expects it to be used.' },
  ],
  realExample: { emoji: '🖥️', text: 'A technology becomes far cheaper to produce. Its price falls year after year while the quantity produced and sold rises, which is falling prices and a growing industry at once.' },
  misconception: 'Students treat all deflation as damaging. Deflation caused by rising aggregate supply comes with rising output and rising employment. The direction of prices is the same and the economy behind it is the opposite.',
  examMatters: 'An Analyse (6 marks, WEC12 Appendix 6) requires a developed chain of reasoning. Naming which curve moved, and using the output figure to justify that claim, is the reasoning the command word is asking for.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each pair of observations to the cause that produced it:',
    pairs: [
      { left: 'Price level up, real output up', right: 'demand-pull inflation' },
      { left: 'Price level up, real output down', right: 'cost-push inflation' },
      { left: 'Price level down, real output down', right: 'deflation from falling aggregate demand' },
      { left: 'Price level down, real output up', right: 'deflation from an increase in aggregate supply' },
    ],
    why: [
      'Only a rise in aggregate demand moves both upward together',
      'Only a rise in costs raises prices while output falls',
      'Only a fall in aggregate demand takes both downward together',
      'Only an increase in aggregate supply lowers prices while output rises',
    ],
  }),
}));

const deflationMoneyFall = sub('deflation-from-a-fall-in-the-money-supply', (sid) => ({
  title: 'Deflation from a Fall in the Money Supply',
  keyIdea: 'If the quantity of money in an economy shrinks, there is less money available to spend on the same output, so spending falls and the price level falls with it.',
  body: [
    { type: 'paragraph', text: 'The third cause of deflation the specification names is a **fall in the money supply**. It is the mirror of excessive money growth, and it works through the same channel in reverse.' },
    { type: 'flow', steps: [
      { title: 'The money supply falls', subtitle: 'less money is circulating than before' },
      { title: 'There is less available to spend', subtitle: 'on an unchanged quantity of goods and services' },
      { title: 'Spending across the economy falls', subtitle: 'which is a fall in aggregate demand' },
      { title: 'The general price level falls', subtitle: 'as firms cut prices against weaker spending' },
    ], result: 'A monetary cause that arrives as a fall in aggregate demand, and does the same damage', resultType: 'bad' },
    { type: 'paragraph', text: 'Money can leave an economy without anyone deciding to remove it. If banks lend less, fewer new deposits are created and the quantity of money can shrink on its own; repaying debt without new borrowing has the same effect.' },
    { type: 'paragraph', text: 'It matters because it is **self-reinforcing in the same direction as the damage**. Falling prices raise the real value of money already owed, so borrowers owe more in real terms than they expected, which makes them cut spending further.' },
    { type: 'paragraph', text: 'This is the third and last cause of deflation the specification lists, and it belongs with the first: both arrive as falling aggregate demand, and both come with falling output rather than rising output.' },
  ],
  realExample: { emoji: '🏦', text: 'Banks across an economy cut back their lending sharply. Fewer new deposits are created, there is less money to spend, and prices fall against weaker spending.' },
  misconception: 'Students expect the money supply to change only when a central authority changes it. Most money in a modern economy is bank deposits, so the quantity of it moves whenever lending does.',
  examMatters: 'A Discuss (14 marks, WEC12 Appendix 6) requires an argument supported by a chain of reasoning, with different viewpoints recognised. The relationship between money and prices is the clearest available example: strong where money growth is large, contested where it is small.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the chain from a shrinking money supply to falling prices:',
    template: [
      'Less money circulating means less available to ___',
      'so aggregate ___ falls across the economy',
      'and firms cut ___ against weaker spending',
    ],
    answers: ['spend', 'demand', 'prices'],
    hints: ['what money is for, from a household\'s point of view', 'the curve that moves left on the diagram', 'what a firm cuts when it cannot sell its stock'],
    distractors: ['save', 'supply'],
  }),
}));

/* ══ Block 6 — Effects of Inflation and Deflation (2g) ══════════════════════ */

const effectsOnConsumersWorkers = sub('effects-of-inflation', (sid) => ({   // March id, kept
  title: 'Effects on Consumers and Workers',
  keyIdea: 'Inflation lowers what a fixed sum of money buys, so consumers lose purchasing power and workers lose unless pay keeps up; deflation reverses both and takes jobs with it.',
  body: [
    { type: 'subheading', text: 'Consumers' },
    { type: 'paragraph', text: `Inflation means a given sum buys less. A saver with ${money(SAVINGS)} earning ${rate(SAVINGS_RATE)} has ${money(savingsNominal())} at the end of the year, and with prices ${pc(INFLATION)} higher that buys what ${money(savingsReal())} bought before. The balance rose and the saver lost.` },
    { type: 'paragraph', text: 'Deflation does the reverse: the same money buys more. The gain comes with a reason to **delay** purchases, because waiting makes them cheaper, and delayed spending is what deepens a deflation.' },
    { type: 'subheading', text: 'Workers' },
    { type: 'bullets', items: [
      '**Pay that rises more slowly than prices is a pay cut** in what it buys, however it looks on a payslip.',
      '**Pay is negotiated in advance**, so a worker who agrees a rise before an unexpected inflation carries the loss.',
      '**Under deflation, pay is cut directly or jobs are cut instead** — money wages are difficult to reduce, so employers tend to reduce the number of people paid them.',
    ] },
    { type: 'paragraph', text: 'Inflation that is **expected** does far less damage to both groups, because it can be written into interest rates and pay settlements in advance. It is the **unexpected** part that moves purchasing power between people.' },
  ],
  realExample: { emoji: '🧾', text: 'A worker receives a 3% pay rise in a year when prices rise by more. The payslip is larger and the weekly shop takes a bigger share of it.' },
  misconception: 'Students say inflation makes everyone poorer. It reduces the purchasing power of money, which moves real income between people rather than removing it: someone repaying a fixed debt gains exactly what the lender loses.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) requires a two-stage chain when an impact is asked for. Name the group, state what happens to the purchasing power of the money they hold or are paid, then give the consequence for them.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the saver\'s year, using Andara\'s figures:',
    template: [
      `${money(SAVINGS)} at ${rate(SAVINGS_RATE)} interest leaves a ___ balance than before`,
      `but prices rose ${pc(INFLATION)}, which is ___ than the interest rate`,
      'so in real terms the saver ___',
    ],
    answers: ['larger', 'faster', 'lost'],
    hints: ['the direction the bank statement moved', 'compare the two percentages', 'the outcome once prices are taken into account'],
    distractors: ['smaller', 'gained'],
  }),
}));

const effectsOnFirms = sub('effects-on-firms-investment-competitiveness', (sid) => ({
  title: 'Effects on Firms, Investment and Competitiveness',
  keyIdea: 'Inflation makes costs and prices harder to plan, which discourages investment, and inflation faster than trading partners\' makes exports dearer, which costs competitiveness.',
  body: [
    { type: 'subheading', text: 'Firms' },
    { type: 'bullets', items: [
      '**Planning is harder.** A firm quoting a price for delivery next year has to guess what its costs will be.',
      '**Costs and prices move at different times.** A firm whose inputs rise before it can raise its own prices absorbs the difference.',
      '**Repricing takes real resources** — relabelling, reissuing catalogues, renegotiating contracts.',
      '**Under deflation, revenue falls and debts do not.** A loan is fixed in money terms, so falling prices raise its real weight.',
    ] },
    { type: 'subheading', text: 'Investment' },
    { type: 'paragraph', text: 'An investment is money spent now for returns over years. Inflation makes those returns **uncertain**, and uncertainty discourages the commitment. Deflation discourages it differently: if prices and revenues are expected to fall, waiting is the better decision, so projects are postponed rather than cancelled.' },
    { type: 'paragraph', text: 'Both directions therefore reduce investment, which is the reason the specification lists it separately from firms.' },
    { type: 'subheading', text: 'Competitiveness' },
    { type: 'paragraph', text: 'A country whose prices rise **faster than its trading partners\'** finds its exports dearer in foreign markets and imported goods relatively cheaper at home. The comparison is what matters: inflation of 5% harms competitiveness against partners at 2% and helps it against partners at 8%.' },
  ],
  realExample: { emoji: '🏭', text: 'A manufacturer postpones a new production line because it cannot forecast what the machinery, the energy or its own selling prices will cost by the time it is running.' },
  misconception: 'Students say inflation always makes a country uncompetitive. It is inflation relative to trading partners that matters. The same rate can improve competitiveness or damage it depending entirely on what is happening elsewhere.',
  examMatters: 'An Examine (8 marks, WEC12 Appendix 6) requires a chain of reasoning, the data given to be interpreted, and a brief assessment of the arguments — the lowest tariff here that asks for evaluation. Inflation and investment is one: both a rising and a falling price level discourage investment, and the reasons are different.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each effect into whether it happens when prices are rising or when prices are falling:',
    groups: [
      { name: 'When prices are rising', why: 'The problems come from costs and revenues being uncertain and moving at different times', items: [
        'Returns on an investment become harder to forecast',
        'Exports become dearer than trading partners\' goods',
        'Catalogues and contracts have to be reissued',
      ] },
      { name: 'When prices are falling', why: 'The problems come from revenue falling while money debts stay fixed, and from waiting being rewarded', items: [
        'A fixed loan becomes heavier in real terms',
        'Projects are postponed because waiting is cheaper',
      ] },
    ],
  }),
}));

const effectsOnGovernment = sub('effects-on-government-and-income-distribution', (sid) => ({
  title: 'Effects on the Government and Income Distribution',
  keyIdea: 'Inflation raises tax receipts and erodes the real value of government debt, and it moves real income from savers and fixed incomes to borrowers; deflation reverses both.',
  body: [
    { type: 'subheading', text: 'The government' },
    { type: 'bullets', items: [
      '**Tax receipts rise** with inflation, because most taxes are charged on money amounts — spending, incomes, profits.',
      '**The real value of existing debt falls.** A debt fixed in money terms is repaid in money that buys less than when it was borrowed.',
      '**Spending obligations rise too**, since wages, pensions and support payments have to keep pace or be cut in real terms.',
      '**Deflation reverses all three**, which is the harder position: receipts fall while the real weight of the debt rises.',
    ] },
    { type: 'subheading', text: 'Income distribution' },
    { type: 'paragraph', text: 'Unexpected inflation moves real income between people rather than destroying it, and the direction is predictable.' },
    { type: 'bullets', items: [
      '**Borrowers gain.** A fixed debt is repaid in money worth less than the money borrowed.',
      '**Lenders and savers lose** by exactly what borrowers gain, unless the interest rate anticipated the inflation.',
      '**Fixed incomes lose**, because a payment fixed in money terms buys less each year.',
      '**Those whose pay tracks prices are protected**, and their bargaining position decides whether it does.',
    ] },
    { type: 'paragraph', text: 'Since low-income households tend to hold more of their wealth as cash and savings and to depend more on fixed payments, inflation tends to fall hardest on them — which is why the specification lists distribution separately.' },
  ],
  realExample: { emoji: '🏛️', text: 'A government that borrowed at a fixed rate finds the real burden of that debt shrinking through a period of high inflation, while its tax receipts rise in money terms.' },
  misconception: 'Students say inflation is bad for the government. Inflation raises the money value of tax receipts and shrinks the real value of debt already owed. The costs to a government come from the spending it must also raise and from what inflation does to the wider economy.',
  examMatters: 'An Evaluate (20 marks, WEC12 Appendix 6) requires arguments weighed and a judgement supported. Inflation creating gainers and losers at the same time is the structure such a question is built on: say who, and by how much.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each group into whether unexpected inflation makes them better off or worse off:',
    groups: [
      { name: 'Better off', why: 'They owe or receive a sum fixed in money terms that is now worth less to pay', items: [
        'A household repaying a fixed-rate loan',
        'A government that borrowed at a fixed rate',
      ] },
      { name: 'Worse off', why: 'They hold or receive a sum fixed in money terms that now buys less', items: [
        'A saver whose interest rate is below the rate of inflation',
        'A pensioner on a payment fixed in money terms',
        'A lender who agreed the rate before the inflation',
      ] },
    ],
  }),
}));

const effectsOnCurrentAccount = sub('effects-on-the-current-account', (sid) => ({
  title: 'Effects on the Current Account',
  keyIdea: 'Inflation faster than trading partners\' makes exports dearer and imports relatively cheaper, which worsens the current account of the balance of payments.',
  body: [
    { type: 'paragraph', text: 'The last of the eight effects the specification names is on **the current account of the balance of payments**, and it follows directly from competitiveness.' },
    { type: 'flow', steps: [
      { title: 'Prices rise faster than trading partners\'', subtitle: 'the comparison is what matters, not the rate itself' },
      { title: 'Exports become dearer abroad', subtitle: 'foreign buyers face a higher price for the same goods' },
      { title: 'Imports become relatively cheaper at home', subtitle: 'domestic buyers switch towards them' },
      { title: 'Export earnings fall and import spending rises', subtitle: 'so the current account moves towards deficit' },
    ], result: 'The effect on trade is where the effect on competitiveness is actually measured', resultType: 'neutral' },
    { type: 'paragraph', text: 'How large the movement is depends on **how responsive buyers are**. Where a country exports goods that are easily replaced, a small price difference moves a lot of trade; where it exports something hard to substitute, higher prices may cost it very little.' },
    { type: 'paragraph', text: 'Deflation runs the mechanism backwards. Prices falling faster than trading partners\' makes exports cheaper abroad and improves the current account — one of the few unambiguous benefits of deflation, and one bought at the cost of the falling output that usually accompanies it.' },
    { type: 'paragraph', text: 'Note the order of the reasoning: inflation affects competitiveness, and competitiveness affects the current account. An answer that jumps straight from inflation to the trade balance has left out the step that explains it.' },
  ],
  realExample: { emoji: '🚢', text: 'An exporter of goods that foreign buyers can source elsewhere loses orders after a period of faster inflation at home, without having changed anything about the product.' },
  misconception: 'Students write that inflation worsens the current account. It does so only if it is faster than trading partners\' inflation. A country with inflation lower than everyone it trades with becomes more competitive while its own prices rise.',
  examMatters: 'An Analyse (6 marks, WEC12 Appendix 6) requires a developed chain of reasoning. The chain here has four links — relative inflation, export prices, buyer response, the current account — and dropping the first makes the conclusion wrong rather than merely brief.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these stages in the causal order that runs from faster inflation to a worse current account, from the price change to the trade effect:',
    correctOrder: [
      'Prices at home rise faster than in the countries traded with',
      'Exports become dearer for foreign buyers',
      'Foreign buyers switch to cheaper alternatives elsewhere',
      'Export earnings fall and the current account moves towards deficit',
    ],
    why: [
      'It is the comparison with trading partners that starts the chain, not the rate alone',
      'A higher home price is what a foreign buyer actually sees',
      'How many switch depends on how easily the goods can be replaced',
      'The trade balance is where the loss of competitiveness is finally measured',
    ],
  }),
}));

/* ══ Block 7 — Measuring Employment and Unemployment (3a, 3d, 3e, 3f) ═══════ */

const iloDefinition = sub('measuring-unemployment', (sid) => ({   // March id, kept
  title: 'The ILO Definition',
  keyIdea: 'The International Labour Organization definition counts someone as unemployed only if they are without a job, available to start and actively seeking work — all three at once.',
  body: [
    { type: 'paragraph', text: 'The specification asks how unemployment is measured **using the International Labour Organization (ILO) definition**. A person is counted as unemployed if they are:' },
    { type: 'bullets', items: [
      '**without a job** — no paid work at all in the reference period;',
      '**available to start work** — able to begin within a short, defined period;',
      '**actively seeking work** — having taken specific steps to find it.',
    ] },
    { type: 'paragraph', text: 'All three must hold **at once**. Someone who fails any one of them is not unemployed on this measure, and the two ways of failing it lead to different groups.' },
    { type: 'bullets', items: [
      'Failing the **first** test means having some paid work, so the person is **employed** — however few the hours.',
      'Failing the **second or third** means not being in the labour market at the moment, so the person is **economically inactive**.',
    ] },
    { type: 'paragraph', text: 'The definition is used because it is the **same everywhere**, which is what makes unemployment comparable between countries. Measures built from who is claiming a particular national benefit are not, since the rules differ from country to country and change over time.' },
    { type: 'paragraph', text: 'It is collected by a survey of households rather than from administrative records, so it captures people whatever their entitlement to support — and it carries sampling error like any survey.' },
  ],
  realExample: { emoji: '📋', text: 'A survey asks whether someone did any paid work last week, whether they could start within a fortnight and what steps they took to look. Three answers decide which group they are counted in.' },
  misconception: 'Students count anyone without a full-time job as unemployed. Any paid work makes a person employed on this definition, and someone not looking for work is inactive rather than unemployed, however much they would like a job in principle.',
  examMatters: 'A Define (2 marks, WEC12 Appendix 6) requires the meaning of a term, and the meaning of unemployment here is all three conditions at once. Giving one or two describes a group the measure does not count.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each person into the group the ILO definition puts them in:',
    groups: [
      { name: 'Unemployed', why: 'Without a job, available to start, and actively seeking work — all three at once', items: [
        'No paid work, applying for jobs, could start next week',
      ] },
      { name: 'Employed', why: 'They have some paid work, which fails the first condition however few the hours', items: [
        'Working six hours a week and looking for more',
        'Working full-time',
      ] },
      { name: 'Economically inactive', why: 'Not seeking work or not available to start, so not in the labour market at present', items: [
        'Not working and not looking, caring for a relative full-time',
        'A full-time student not seeking work',
      ] },
    ],
  }),
}));

const underemployment = sub('unemployment-and-underemployment', (sid) => ({
  title: 'Unemployment and Underemployment',
  keyIdea: 'Underemployment is working less, or below your skills, when you want more work — and because it is still work, it changes no unemployment figure at all.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **distinction between unemployment and underemployment**, and the distinction is sharp because the measurement is.' },
    { type: 'bullets', items: [
      '**Unemployed** — no paid work, available, and actively seeking. Counted as unemployed.',
      '**Underemployed** — in paid work, and wanting more of it or work that uses more of their skills. Counted as **employed**.',
    ] },
    { type: 'paragraph', text: 'Underemployment takes two forms: working **fewer hours** than wanted, and working in a job that uses **less skill or qualification** than the worker has. Both are a shortfall against what the person could do.' },
    { type: 'paragraph', text: `In Andara, ${UNDEREMPLOYED}m of the ${EMPLOYED}m employed work part-time and want full-time work. Every one of them has paid work, so every one is counted as employed. The unemployment rate is ${rate(unemploymentRate())} with them in the figures and ${rate(unemploymentRate())} without them.` },
    { type: 'paragraph', text: 'That is why underemployment is measured **separately**. An economy where unemployment is low and underemployment is high has a labour market in worse condition than the unemployment rate alone suggests, and no unemployment figure can show it. It is a genuine waste of resources that the headline measure is not built to see.' },
  ],
  realExample: { emoji: '⏳', text: 'A qualified engineer working part-time in a shop while looking for engineering work is employed on every measure, and the skills are idle just the same.' },
  misconception: 'Students expect underemployment to raise the unemployment rate. It cannot: underemployed people have paid work, so they are employed. Underemployment is a separate measure, which is exactly why it is collected.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) of a distinction requires both terms and why they are separated. The reason is that the unemployment rate cannot capture underemployment, so the two measures together say more than either alone.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete why underemployment moves no unemployment figure:',
    template: [
      'An underemployed person is in paid ___',
      'so the ILO definition counts them as ___',
      `and Andara's unemployment rate stays at ___`,
    ],
    answers: ['work', 'employed', rate(unemploymentRate())],
    hints: ['the thing they have some of, and want more of', 'the group with any paid work at all', 'unchanged by the 0.9m entirely'],
    distractors: ['hours', 'inactive'],
  }),
}));

const theThreeRates = sub('employment-unemployment-inactivity-rates', (sid) => ({
  title: 'Employment, Unemployment and Inactivity Rates',
  keyIdea: 'The unemployment rate is measured against the labour force and the employment and inactivity rates against the whole working-age population, so the three do not add to 100.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **significance of changes in rates of employment, unemployment and economic inactivity**, and the first thing to get right is what each is divided by.' },
    { type: 'paragraph', text: `Andara's working-age population is ${WORKING_AGE}m: ${EMPLOYED}m employed, ${UNEMPLOYED}m unemployed and ${INACTIVE}m economically inactive. The **labour force** is the employed plus the unemployed — ${LABOUR_FORCE}m — and excludes the inactive entirely.` },
    { type: 'bullets', items: [
      `**Unemployment rate** = ${UNEMPLOYED} ÷ ${LABOUR_FORCE} × 100 = **${rate(unemploymentRate())}** — against the **labour force**.`,
      `**Employment rate** = ${EMPLOYED} ÷ ${WORKING_AGE} × 100 = **${rate(employmentRate())}** — against the **working-age population**.`,
      `**Inactivity rate** = ${INACTIVE} ÷ ${WORKING_AGE} × 100 = **${rate(inactivityRate())}** — against the **working-age population**.`,
    ] },
    { type: 'paragraph', text: 'Because the denominators differ, the three rates do **not** add to 100, and none of them can be worked out from the others alone.' },
    { type: 'paragraph', text: 'The significance is that the unemployment rate can move for reasons that are not about jobs. If unemployed people **stop looking**, they leave the labour force and become inactive: the unemployment rate **falls** and not one extra person is in work. Reading the employment and inactivity rates alongside it is the only way to tell that apart from a genuine improvement.' },
  ],
  realExample: { emoji: '📉', text: 'An unemployment rate falls over a year in which employment did not rise. The people missing from the numerator moved into inactivity, not into jobs.' },
  misconception: 'Students add the three rates and expect 100. The unemployment rate is measured against the labour force and the other two against the whole working-age population, so the sum has no meaning.',
  examMatters: 'A Calculate (2 or 4 marks, WEC12 Appendix 6) requires a calculation from given data with workings shown. Write the denominator down before dividing; the commonest error in this topic is dividing the unemployed by the working-age population.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each rate to the figure it is measured against:',
    pairs: [
      { left: 'Unemployment rate', right: `the labour force, ${LABOUR_FORCE}m` },
      { left: 'Employment rate', right: `the working-age population, ${WORKING_AGE}m` },
      { left: 'Inactivity rate', right: `the working-age population, ${WORKING_AGE}m, counting those outside the labour force` },
    ],
    why: [
      'Only people in the labour market can be unemployed within it',
      'The employment rate asks what share of everyone of working age is in work',
      'The inactive are outside the labour force, so the labour force cannot be the denominator',
    ],
    distractors: ['the total population of the country'],
  }),
}));

const netMigration = sub('net-migration', (sid) => ({
  title: 'Net Migration',
  keyIdea: 'Net migration changes the labour force and employment at the same time, so employment can rise and the unemployment rate rise with it.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **significance of net migration for employment and unemployment** — one requirement covering both, because migration moves the numerator and the denominator together.' },
    { type: 'paragraph', text: `Suppose ${MIGRATION.workingAge}m people of working age arrive in Andara over a year. ${MIGRATION.joinLabourForce}m of them look for work, so they join the labour force; ${MIGRATION.findWork}m find it within the year.` },
    { type: 'bullets', items: [
      `**Working-age population**: ${WORKING_AGE}m → ${mWorkingAge()}m.`,
      `**Labour force**: ${LABOUR_FORCE}m → ${mLabourForce()}m.`,
      `**Employed**: ${EMPLOYED}m → ${mEmployed()}m — more people in work than before.`,
      `**Unemployment rate**: ${rate(unemploymentRate())} → ${rate(mUnemploymentRate())} — higher than before.`,
    ] },
    { type: 'paragraph', text: 'Both statements describe the same year. Employment rose and the unemployment rate rose, because the labour force grew faster than employment did. Neither figure is misleading; they answer different questions.' },
    { type: 'paragraph', text: 'Over a longer period the arithmetic is not the whole story. Arrivals **spend** as well as work, which raises aggregate demand and the labour firms need; they may fill shortages that were holding output back; and where their skills match what employers want, the effect on unemployment is smaller than a one-year snapshot suggests.' },
  ],
  realExample: { emoji: '🧳', text: 'An economy takes in workers over a year in which employment grows. Its unemployment rate is higher at the end than at the start, and more people are working than ever.' },
  misconception: 'Students say that migration raises unemployment. It raises the labour force and usually raises employment too; whether the RATE rises depends on which grows faster, and over time arrivals add to demand as well as to supply.',
  examMatters: 'A Discuss (14 marks, WEC12 Appendix 6) requires an argument supported by reasoning, with different viewpoints recognised. The one-year arithmetic and the longer-run demand effect are two such viewpoints, and a good answer holds both.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these steps in the order they follow from arrivals to the unemployment rate, from the migration itself to the effect on the rate:',
    correctOrder: [
      `People of working age arrive: ${MIGRATION.workingAge}m of them`,
      `Some look for work and join the labour force: ${MIGRATION.joinLabourForce}m`,
      `Fewer find work within the year: ${MIGRATION.findWork}m`,
      `The labour force grew faster than employment, so the rate rises to ${rate(mUnemploymentRate())}`,
    ],
    why: [
      'Arrival is the event; nothing in the chain caused it',
      'Only those seeking work enter the labour force, which is the denominator',
      'Employment is the part of the labour force that found a job',
      'The rate depends on which of the two grew faster, not on either alone',
    ],
  }),
}));

/* ══ Block 8 — Causes of Unemployment (3b) ══════════════════════════════════ */

const frictional = sub('types-of-unemployment', (sid) => ({   // March id, kept
  title: 'Frictional Unemployment',
  keyIdea: 'Frictional unemployment is the time between leaving one job and starting another, and it exists in every economy including a fully healthy one.',
  body: [
    { type: 'paragraph', text: '**Frictional unemployment** is the unemployment that exists because matching a worker to a job takes time. The jobs exist and the workers exist; they have not yet found one another.' },
    { type: 'bullets', items: [
      'Someone who has left a job and is looking for a better one.',
      'Someone entering the labour market for the first time after finishing education.',
      'Someone returning after a period away from work.',
    ] },
    { type: 'paragraph', text: 'It is **short-term and voluntary in character**, and it resolves on its own as the match is made. An economy with none at all would be one in which nobody ever changed job — which would be worse, not better, because moving to a job that suits you better is how output per worker rises.' },
    { type: 'paragraph', text: 'What changes the amount of it is how easily information moves. Better job information, simpler applications and more effective matching all shorten the gap. A generous system of support during the gap can lengthen it, because it makes waiting for a better match affordable — which is not automatically a bad outcome if the match is better.' },
    { type: 'paragraph', text: 'It is the benign case. A question asking whether unemployment is a problem should separate this from the three that follow, because the answer for this one is largely no.' },
  ],
  realExample: { emoji: '🔎', text: 'A worker leaves one job on Friday and starts another six weeks later. For those six weeks they are unemployed on every measure, and nothing in the economy has gone wrong.' },
  misconception: 'Students treat all unemployment as a failure. Frictional unemployment is the cost of having a labour market in which people can move, and an economy with none would be one where nobody ever changed jobs.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) requires understanding applied to a context. Naming the type is knowledge; saying what the evidence in the extract shows — the length of the spell, whether jobs are available — is the application.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete what frictional unemployment is and is not:',
    template: [
      'Frictional unemployment is the time taken to ___ a worker to a job',
      'so the jobs and the workers both ___',
      'and it tends to be ___ in duration',
    ],
    answers: ['match', 'exist', 'short'],
    hints: ['what a labour market does between the two sides', 'neither side is missing here', 'it resolves once the pairing is made'],
    distractors: ['train', 'permanent'],
  }),
}));

const seasonal = sub('seasonal-unemployment', (sid) => ({
  title: 'Seasonal Unemployment',
  keyIdea: 'Seasonal unemployment follows the yearly cycle of the work itself, so it is predictable, repeats, and disappears when the season returns.',
  body: [
    { type: 'paragraph', text: '**Seasonal unemployment** happens because the demand for certain work runs on a **yearly cycle**. The work is not there in the off-season, and it returns on schedule.' },
    { type: 'bullets', items: [
      '**Agriculture** — labour is needed at planting and harvest and not between them.',
      '**Tourism** — resorts employ heavily in season and very little outside it.',
      '**Construction** — work that depends on the weather stops in the months that do not allow it.',
    ] },
    { type: 'paragraph', text: 'It differs from frictional unemployment in being **predictable and recurring**. Everyone concerned knows roughly when it starts and when it ends, which is why it is the one type that can be planned for by workers, firms and governments alike.' },
    { type: 'paragraph', text: 'Because it repeats on a known cycle, unemployment figures are usually published **seasonally adjusted**: the regular yearly pattern is taken out so that a change can be read as a real change rather than as the arrival of a season. Comparing an unadjusted figure with the same month a year earlier does the same job more crudely.' },
    { type: 'paragraph', text: 'It becomes a serious problem only where a region depends heavily on one seasonal industry, so that the off-season is an annual fall in income for the whole area rather than for a few workers within a varied economy.' },
  ],
  realExample: { emoji: '🏖️', text: 'A coastal town employs thousands through the summer and a fraction of that through the winter. The pattern is the same every year and everyone plans around it.' },
  misconception: 'Students read a rise in unemployment between two months as a worsening economy. Much of a month-to-month change is the season arriving, which is why figures are seasonally adjusted before they are compared.',
  examMatters: 'An Analyse (6 marks, WEC12 Appendix 6) requires a developed chain. Using a seasonally adjusted figure, or comparing with the same month a year earlier, is the step that makes a claim about a change defensible.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each spell of unemployment into whether it is frictional or seasonal:',
    groups: [
      { name: 'Frictional', why: 'The gap is the time taken to match a worker to a job that already exists', items: [
        'A graduate applying for first jobs',
        'A worker who left one job and is choosing between offers',
      ] },
      { name: 'Seasonal', why: 'The work itself runs on a yearly cycle and returns on schedule', items: [
        'A fruit picker between harvests',
        'A ski instructor in the summer',
        'A builder in the months that stop outdoor work',
      ] },
    ],
  }),
}));

const structural = sub('structural-unemployment', (sid) => ({
  title: 'Structural Unemployment',
  keyIdea: 'Structural unemployment is a mismatch between the skills or location of workers and the jobs that exist, so it persists even when there are vacancies to fill.',
  body: [
    { type: 'paragraph', text: '**Structural unemployment** is caused by a **mismatch**. There are jobs and there are workers, and the workers cannot take the jobs — because they lack the skills, or because the jobs are somewhere else.' },
    { type: 'bullets', items: [
      '**Occupational immobility** — the worker\'s skills are not the skills the available jobs need, and acquiring new ones takes years.',
      '**Geographical immobility** — the jobs are in another region, and housing costs, family ties or the cost of moving prevent it.',
    ] },
    { type: 'paragraph', text: 'It is caused by **change in the structure of the economy**: an industry declines, a technology replaces a set of tasks, or production moves abroad. The jobs that go do not return, and the jobs that appear ask for something different.' },
    { type: 'paragraph', text: 'This makes it the **long-lasting** type, and the one where the damage compounds. Skills decay; the longer someone is out of work the harder work becomes to get; and where an industry was concentrated, a whole region can carry it for a generation.' },
    { type: 'paragraph', text: 'It is also the type that vacancies cannot fix. An economy can have high structural unemployment and unfilled jobs at the same time, which is the clearest evidence that the problem is the mismatch rather than a shortage of demand.' },
  ],
  realExample: { emoji: '🏗️', text: 'An industry that employed most of a region closes over a decade. New jobs appear elsewhere in the country and ask for skills the region\'s workers were never trained in.' },
  misconception: 'Students treat structural unemployment as a shortage of jobs. The jobs may exist in numbers; they ask for different skills or sit elsewhere. That is why raising demand alone does not remove it.',
  examMatters: 'An Examine (8 marks, WEC12 Appendix 6) requires a chain of reasoning, the data given to be interpreted, and a brief assessment of the arguments — the lowest tariff here that asks for evaluation. The relationship between unemployment and unfilled vacancies is the one that identifies a structural cause, and an extract giving both is asking for exactly that inference.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these stages in the order in which structural unemployment develops, from the change in the economy to the lasting effect:',
    correctOrder: [
      'An industry declines or its production moves elsewhere',
      'The jobs it provided disappear and do not return',
      'Different skills, or a different region, are what the new jobs ask for',
      'Workers stay unemployed although vacancies exist',
    ],
    why: [
      'The change in the structure of the economy is what starts it',
      'A decline that reversed would leave frictional unemployment, not structural',
      'The mismatch is created here: it is about what the new jobs ask for',
      'Unemployment alongside unfilled vacancies is the signature of a mismatch',
    ],
  }),
}));

const demandDeficiency = sub('demand-deficiency-unemployment', (sid) => ({
  title: 'Demand-Deficiency Unemployment',
  keyIdea: 'Demand-deficiency unemployment comes from too little aggregate demand across the whole economy, so it affects every industry at once and rises in a downturn.',
  body: [
    { type: 'paragraph', text: '**Demand-deficiency unemployment** is caused by a shortage of **aggregate demand** — total spending across the whole economy — rather than by anything about particular workers or particular industries.' },
    { type: 'flow', steps: [
      { title: 'Aggregate demand falls', subtitle: 'households and firms across the economy spend less' },
      { title: 'Firms cannot sell what they produce', subtitle: 'orders fall and stock builds up' },
      { title: 'Firms cut production', subtitle: 'because there is no point making what will not sell' },
      { title: 'Workers are laid off across industries', subtitle: 'and their lost income cuts spending further' },
    ], result: 'The cause is economy-wide, so the unemployment appears everywhere at once', resultType: 'bad' },
    { type: 'paragraph', text: 'Two features identify it. It is **general** — unemployment rises across industries that have nothing in common, which no mismatch could produce. And it moves **with the economy**: it rises through a downturn and falls as output recovers.' },
    { type: 'paragraph', text: `Andara's year 3 is the setting for it. Real output fell ${pc(realGrowth(2))} across two consecutive quarters of negative growth, and unemployment caused by that fall is demand-deficiency unemployment by definition.` },
    { type: 'paragraph', text: 'The last step of the chain is what makes it dangerous: workers who lose income spend less, which reduces aggregate demand further. Unlike frictional unemployment, it does not resolve itself simply by waiting.' },
  ],
  realExample: { emoji: '📉', text: 'Spending falls across an economy at once. Manufacturers, shops and service firms with no supplier in common all cut staff in the same quarter.' },
  misconception: 'Students explain demand-deficiency unemployment by saying a firm did badly. The cause is a fall in spending across the whole economy, which is why it shows up in industries that have nothing to do with one another.',
  examMatters: 'An Evaluate (20 marks, WEC12 Appendix 6) requires arguments weighed and a supported judgement. Which cause of unemployment an economy faces changes what would remove it, so identifying the cause from the data is where such an answer has to start.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these stages in the causal order that runs from falling spending to workers losing jobs, from the first cause to the final effect:',
    correctOrder: [
      'Aggregate demand falls across the whole economy',
      'Firms find they cannot sell everything they produce',
      'Production is cut back, because output that will not sell is not worth making',
      'Workers are laid off across unrelated industries',
    ],
    why: [
      'The fall in total spending is the economy-wide change that starts it',
      'Unsold output is how a demand shortage first reaches a firm',
      'Cutting production is the decision that turns unsold stock into fewer jobs',
      'Unemployment across unrelated industries is what identifies the cause as general',
    ],
  }),
}));

const realWageInflexibility = sub('real-wage-inflexibility', (sid) => ({
  title: 'Real-Wage Inflexibility',
  keyIdea: 'Real-wage unemployment exists where wages are held above the level at which everyone willing to work would be hired, so firms want fewer workers than are offering themselves.',
  body: [
    { type: 'paragraph', text: 'The fifth cause the specification names is **real wage inflexibility**: the case where the wage itself, rather than a shortage of demand or a mismatch of skills, leaves people without work.' },
    { type: 'paragraph', text: 'At a higher real wage firms want **fewer** workers, because each must produce enough to cover the cost of employing them, and **more** people want to work. If the wage cannot fall, those two quantities need not meet.' },
    { type: 'paragraph', text: `On a labour-market diagram, a wage floor above the level at which the two are equal leaves firms wanting ${FLOOR_DEMAND}m workers while ${FLOOR_SUPPLY}m want to work at that wage. The gap of **${FLOOR_GAP}m** is unemployment caused by the wage, not by the workers.` },
    { type: 'paragraph', text: 'Wages are held up by a minimum wage set above that level, by collectively agreed pay, by contracts fixed in money terms, and by a reluctance to cut money wages that means firms cut staff instead.' },
    { type: 'paragraph', text: 'It is the most **contested** of the five, and the disagreement is worth stating rather than resolving. Wages above that level may raise output per worker, and cutting them lowers the income of those who do most of the spending. That the mechanism exists does not settle how much unemployment it explains.' },
  ],
  realExample: { emoji: '📐', text: 'A wage floor is set above the level at which everyone willing to work would be hired. Some workers earn more than they otherwise would, and fewer are employed than at the lower wage.' },
  misconception: 'Students dismiss this cause by saying that cutting wages would make workers poorer. That is an argument about removing the floor, not a reason the mechanism does not operate. Both belong in an answer.',
  examMatters: 'A Discuss (14 marks, WEC12 Appendix 6) requires different viewpoints recognised. This is the clearest case in the topic: the mechanism is straightforward and what follows from it is disputed, and an answer that gives only one side has left out what the command word asks for.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each cause of unemployment to the evidence that would identify it:',
    pairs: [
      { left: 'Frictional', right: 'short spells, and jobs available to move into' },
      { left: 'Structural', right: 'long spells alongside unfilled vacancies needing other skills' },
      { left: 'Demand deficiency', right: 'unemployment rising across unrelated industries at once' },
      { left: 'Real-wage inflexibility', right: 'more people wanting work at the going wage than firms will hire' },
    ],
    why: [
      'A short gap with jobs available is a matching delay, not a shortage',
      'Vacancies that go unfilled while people are unemployed prove a mismatch',
      'A cause common to unrelated industries has to be economy-wide',
      'A gap at a wage that will not fall points at the wage rather than at demand',
    ],
  }),
}));

/* ══ Block 9 — Effects of Unemployment (3c) ═════════════════════════════════ */

const effectsOnConsumersAndWorkers = sub('effects-on-consumers-and-workers', (sid) => ({
  title: 'Effects on Consumers and Workers',
  keyIdea: 'Unemployment removes income from the people it affects and lowers spending by those still in work, and its cost to a worker outlasts the spell itself.',
  body: [
    { type: 'subheading', text: 'Consumers' },
    { type: 'bullets', items: [
      '**Lost income for those affected**, so their spending falls immediately and sharply.',
      '**Caution among those still in work.** The fear of losing a job changes what people buy even when their income has not changed, so consumer spending falls by more than the lost wages alone.',
      '**Less spending means fewer sales**, which is how one firm\'s redundancies reach another firm\'s order book.',
    ] },
    { type: 'subheading', text: 'Workers' },
    { type: 'paragraph', text: 'The cost to the worker has an immediate part and a lasting one. The immediate part is the lost income. The lasting part is that **skills decay** while unused, and the longer the spell the harder the next job is to get — so a long spell of unemployment lowers a worker\'s earnings for years after it ends.' },
    { type: 'bullets', items: [
      '**Bargaining position weakens**, because a worker who has been out of work accepts less.',
      '**The effect is unequal.** Those with fewer qualifications and less recent experience are unemployed longer.',
      '**The damage outlasts the recovery**, which is why unemployment is treated as more serious than the same fall in output spread evenly.',
    ] },
  ],
  realExample: { emoji: '🧍', text: 'A worker out of work for a year takes a job below their previous level and earns less than they did for years afterwards. The spell ended; the cost of it did not.' },
  misconception: 'Students count the cost of unemployment as the wages lost during it. The lasting damage — skills that decayed, the weaker position on returning, lower earnings for years — is usually larger than the income lost in the spell itself.',
  examMatters: 'An Analyse (6 marks, WEC12 Appendix 6) requires a developed chain. Lost income, lower spending, fewer sales elsewhere and further job losses is the chain; naming the groups affected is not.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete why unemployment costs more than the wages lost during it:',
    template: [
      'Skills ___ while they are not being used',
      'so the longer the spell the harder the next job is to ___',
      'and earnings stay lower for ___ after the spell ends',
    ],
    answers: ['decay', 'get', 'years'],
    hints: ['what happens to an unused ability over time', 'the outcome an application is aiming at', 'the damage outlasts the unemployment by a long way'],
    distractors: ['improve', 'weeks'],
  }),
}));

const effectsOnFirmsUnemployment = sub('unemployment-effects-on-firms', (sid) => ({
  title: 'Effects on Firms',
  keyIdea: 'Unemployment gives firms a smaller market to sell into and cheaper, more available labour to hire from, so the effect on any one firm depends on which matters more to it.',
  body: [
    { type: 'paragraph', text: 'Firms are the one group in the specification\'s list for whom unemployment cuts **both ways**, and saying so is the analysis.' },
    { type: 'subheading', text: 'Against the firm' },
    { type: 'bullets', items: [
      '**A smaller market.** Unemployed households spend less, and employed households spend cautiously, so sales fall.',
      '**Falling demand hits some firms hardest.** Firms selling goods buyers can postpone — cars, furniture, holidays — lose most.',
      '**Investment is harder to justify** when the market is shrinking, so capacity is not added.',
    ] },
    { type: 'subheading', text: 'For the firm' },
    { type: 'bullets', items: [
      '**Labour is easier to find.** More applicants for each vacancy, and a better chance of finding the right one.',
      '**Wage pressure is weaker**, so the cost of employing each worker rises more slowly.',
      '**Turnover falls**, because workers are less willing to leave a job when others are scarce.',
    ] },
    { type: 'paragraph', text: 'Which side dominates depends on the firm. For most, the lost sales outweigh the cheaper labour: a firm cannot be saved by low wages if there is nobody to sell to. For a firm whose costs are mostly labour and whose market is holding up, the balance can go the other way.' },
  ],
  realExample: { emoji: '🏪', text: 'A firm hiring during a downturn finds far more applicants for each post, and its sales figures fall in the same quarter.' },
  misconception: 'Students say unemployment is simply bad for firms. It also delivers cheaper and more available labour. The answer is which effect is larger for the firm in question, which is a judgement to be made from the evidence given.',
  examMatters: 'An Examine (8 marks, WEC12 Appendix 6) requires a chain of reasoning, the data given to be interpreted, and a brief assessment of the arguments — the lowest tariff here that asks for evaluation. Unemployment and firms is a relationship with effects in both directions, which is why it suits that command word.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each consequence of high unemployment into whether it works against a firm or for it:',
    groups: [
      { name: 'Against the firm', why: 'These reduce what the firm can sell', items: [
        'Households have less income to spend',
        'Buyers postpone purchases they can put off',
      ] },
      { name: 'For the firm', why: 'These reduce what the firm has to pay or makes hiring easier', items: [
        'More applicants for each vacancy',
        'Weaker pressure to raise wages',
        'Fewer workers leaving for other jobs',
      ] },
    ],
  }),
}));

const effectsOnPublicFinances = sub('effects-on-public-finances', (sid) => ({
  title: 'Effects on Public Finances',
  keyIdea: 'Unemployment hits public finances from both sides at once: less is collected in tax and more is paid out in support, from the same budget.',
  body: [
    { type: 'paragraph', text: 'The specification names **public finances** as one of the six groups, and the reason it is listed separately is that unemployment moves both sides of the account in the wrong direction at the same time.' },
    { type: 'subheading', text: 'Less collected' },
    { type: 'bullets', items: [
      '**Income tax** falls, because fewer people are earning.',
      '**Taxes on spending** fall, because households with less income buy less.',
      '**Taxes on profits** fall, because firms selling into a weaker market earn less.',
    ] },
    { type: 'subheading', text: 'More paid out' },
    { type: 'bullets', items: [
      '**Support for the unemployed** rises directly with the number of people claiming it.',
      '**Other support rises too**, as households on lower incomes qualify for help they did not need before.',
    ] },
    { type: 'paragraph', text: 'The two together mean the gap between what a government receives and what it spends widens **without any decision having been taken**. Borrowing rises to cover the difference, which raises the interest that must be paid in later years.' },
    { type: 'paragraph', text: 'There is a further cost that no account records: the **tax that would have been paid** by people who are working, on output that is not being produced. It never appears as a figure and it is larger than the support paid out.' },
  ],
  realExample: { emoji: '🏛️', text: 'A rise in unemployment widens a government\'s deficit in the same quarter, without a single change to a tax rate or a spending plan.' },
  misconception: 'Students count only the support paid to unemployed people. The larger figure is usually the tax no longer collected — income tax, spending taxes and taxes on profits all fall together.',
  examMatters: 'An Explain (4 marks, WEC12 Appendix 6) of an impact requires a two-stage chain. Fewer people earning, so less income tax collected, so a wider gap between receipts and spending — the middle step is the one most often left out.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each effect of rising unemployment on public finances into whether it reduces receipts or raises spending:',
    groups: [
      { name: 'Reduces receipts', why: 'Less income and less spending in the economy means less tax collected', items: [
        'Fewer people paying income tax',
        'Households buying less, so less tax on spending',
        'Firms earning less, so less tax on profits',
      ] },
      { name: 'Raises spending', why: 'More households qualify for support, so more is paid out', items: [
        'More people claiming support for the unemployed',
        'More households qualifying for help on low incomes',
      ] },
    ],
  }),
}));

const resourceUtilisation = sub('resource-utilisation-and-the-ppf', (sid) => ({
  title: 'Effects on Resource Utilisation and the PPF',
  keyIdea: 'Unemployment means an economy is producing inside its production possibility frontier: the resources exist, the output is possible, and it is not being made.',
  body: [
    { type: 'paragraph', text: 'The specification names **resource utilisation and the production possibility frontier** as an effect of unemployment, and it is the one that states the cost in terms of output rather than income.' },
    { type: 'paragraph', text: 'A **production possibility frontier** shows the combinations of goods an economy could produce if all its resources were fully used. A point **on** the frontier uses everything available. A point **inside** it does not.' },
    { type: 'paragraph', text: 'Unemployment is labour that could be producing and is not, so an economy with unemployed workers is at a point **inside its own frontier**. It is producing less of everything than it could, and the gap between the point and the frontier is output that was possible and was not made.' },
    { type: 'bullets', items: [
      '**The frontier has not moved.** Nothing has been destroyed — the workers, the machinery and the materials all still exist.',
      '**The lost output is not recoverable.** A year of output not produced is gone, even though the capacity to produce it remains.',
      '**Long unemployment can move the frontier inward**, because skills decay and machinery left idle is not replaced. A temporary loss becomes a permanent one.',
    ] },
    { type: 'paragraph', text: 'This is the argument that unemployment is a cost to **everyone** rather than to the unemployed alone. The output that is not made is output nobody consumes.' },
  ],
  realExample: { emoji: '🏭', text: 'A factory runs one shift instead of three. The building, the machines and the trained workers all exist, and two shifts of output are simply not produced.' },
  misconception: 'Students draw unemployment as a frontier shifted inward. The frontier is what the economy COULD produce and it has not moved; unemployment is a point inside it. Only when skills and capital are lost for good does the frontier itself move.',
  examMatters: 'A Draw (4 marks, WEC12 Appendix 6) requires an accurately labelled diagram. Both axes labelled with the goods, the frontier drawn and labelled, and the economy marked at a point clearly inside it — not on it and not beyond it.',
  recall: recall(sid, {
    type: 'match',
    prompt: 'Match each position on a production possibility frontier diagram to what it means for an economy:',
    pairs: [
      { left: 'A point on the frontier', right: 'all available resources are being used' },
      { left: 'A point inside the frontier', right: 'resources exist that are not being used' },
      { left: 'A point beyond the frontier', right: 'not attainable with the resources available' },
      { left: 'The frontier itself moving outward', right: 'the economy can now produce more than before' },
    ],
    why: [
      'Full utilisation is what the frontier is defined as',
      'Unemployment puts an economy here: possible output that is not made',
      'The frontier marks the limit of what the resources allow',
      'A change in what is possible is a change in the frontier, not a change in the point',
    ],
  }),
}));

const effectsOnSociety = sub('effects-on-society', (sid) => ({
  title: 'Effects on Society',
  keyIdea: 'Unemployment carries costs to health, to families and to whole regions that no national accounting figure records, which is why the specification lists society separately.',
  body: [
    { type: 'paragraph', text: 'The last of the six the specification names is **society**, and it is listed separately because these costs appear in no economic total at all.' },
    { type: 'bullets', items: [
      '**Health.** Long unemployment is associated with worse physical and mental health, which raises the cost of healthcare and lowers what people can produce when work returns.',
      '**Families.** Lost income and the strain of insecurity reach everyone in a household, including children whose outcomes are affected for years.',
      '**Regions.** Where unemployment is concentrated, local businesses lose their customers and close, which removes more jobs from the same place.',
      '**Social cohesion.** Areas with sustained high unemployment tend to see more of the problems that follow from lost income and lost routine.',
    ] },
    { type: 'paragraph', text: 'Two features make these costs distinctive. They are **persistent** — they outlast the unemployment that caused them, sometimes by a generation. And they are **concentrated**, falling on particular places and particular families rather than being spread across a population.' },
    { type: 'paragraph', text: 'That concentration is the reason a national figure understates them. The same total unemployment spread evenly across a country does far less damage than the same total concentrated in a few regions, and no unemployment rate can tell the two apart.' },
  ],
  realExample: { emoji: '🏘️', text: 'A town loses its largest employer. Shops, cafés and services that depended on those wages close over the following years, and the town\'s unemployment outlasts the closure by a generation.' },
  misconception: 'Students treat social effects as too vague to include. They are the part of the cost that no figure captures, and naming them specifically — health, children\'s outcomes, regional decline — is what separates an answer that considers them from one that gestures at them.',
  examMatters: 'An Evaluate (20 marks, WEC12 Appendix 6) requires arguments weighed and a judgement supported. Costs that no figure records are exactly what a judgement has to weigh, and saying that they are unmeasured is part of weighing them.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete why the social costs of unemployment are understated by a national figure:',
    template: [
      'These costs appear in no economic ___',
      'they ___ the unemployment that caused them',
      'and they are ___ in particular places rather than spread evenly',
    ],
    answers: ['total', 'outlast', 'concentrated'],
    hints: ['the kind of figure GDP and the unemployment rate are', 'they are still there long after the jobs return', 'a few regions carry most of them'],
    distractors: ['survey', 'shortened'],
  }),
}));

/* ══ Block 10 — The Balance of Payments (4a, 4b, 4c) ════════════════════════ */

const bopComponents = sub('current-account-components', (sid) => ({   // March id, kept
  title: 'Components of the Balance of Payments',
  keyIdea: 'The balance of payments records every transaction between a country and the rest of the world, in three accounts, of which the current account is the one this topic is about.',
  body: [
    { type: 'paragraph', text: 'The **balance of payments** is the record of all transactions between a country and the rest of the world over a period. The specification asks for its **components, with particular reference to the current account**.' },
    { type: 'bullets', items: [
      '**The current account** — trade in goods, trade in services, primary income and secondary income.',
      '**The capital account** — transfers of assets between countries, studied in Unit 4.',
      '**The financial account** — purchases and sales of assets across the border, also Unit 4.',
    ] },
    { type: 'paragraph', text: 'The other two accounts are studied in Unit 4. Knowing that the current account is **one component and not the whole** is what this requirement asks for, and it is the part most often missed.' },
    { type: 'subheading', text: 'Inside the current account' },
    { type: 'bullets', items: [
      '**Trade in goods** — physical products exported and imported.',
      '**Trade in services** — services sold across borders, such as transport, tourism and financial services.',
      '**Primary income** — income earned from assets abroad, and paid to foreign owners of assets at home.',
      '**Secondary income** — transfers with nothing received in return, such as money sent home by workers abroad.',
    ] },
    { type: 'paragraph', text: `Andara's four parts are ${bn(BOP.goods)}, ${bn(BOP.services)}, ${bn(BOP.primary)} and ${bn(BOP.secondary)}, which add to a current account of ${bn(currentAccount())}.` },
  ],
  realExample: { emoji: '🚢', text: 'A cargo of machinery leaving a port is trade in goods. The insurance sold to the shipping company is trade in services. Both are in the current account and they are not the same line of it.' },
  misconception: 'Students use "balance of payments" and "current account" as though they meant the same thing. The current account is one of three components, and a question naming one is not asking about the other.',
  examMatters: 'A Define (2 marks, WEC12 Appendix 6) requires the meaning of a term. For the balance of payments that is a record of transactions between a country and the rest of the world over a period; naming only trade leaves out most of it.',
  recall: recall(sid, {
    type: 'classify',
    prompt: 'Sort each transaction into the part of the current account it is recorded in:',
    groups: [
      { name: 'Trade in goods', why: 'A physical product crossing the border', items: [
        'Machinery exported to another country',
        'Oil imported from abroad',
      ] },
      { name: 'Trade in services', why: 'A service sold across a border, with nothing physical moving', items: [
        'Insurance sold to a foreign shipping company',
        'Spending by foreign tourists',
      ] },
      { name: 'Income', why: 'Money received or paid without a good or service moving in return', items: [
        'Profits earned on a factory owned abroad',
        'Money sent home by a worker overseas',
      ] },
    ],
  }),
}));

const tradeInGoodsAndServicesSub = sub('trade-in-goods-and-services', (sid) => ({
  title: 'Trade in Goods and Services',
  keyIdea: 'The trade in goods and services balance is exports minus imports of both, and a country can run a surplus on it while the current account as a whole is in deficit.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **distinction between deficits and surpluses in the trade in goods and services balance**. It is the two trade lines of the current account added together.' },
    { type: 'bullets', items: [
      '**A surplus** — more is earned from exporting goods and services than is spent importing them.',
      '**A deficit** — more is spent importing them than is earned exporting them.',
    ] },
    { type: 'paragraph', text: `Andara exported ${bn(BOP.goods)} more in goods than it imported, and spent ${bn(Math.abs(BOP.services))} more on services than it earned from them. Its trade in goods and services balance is ${bn(BOP.goods)} + ${bn(BOP.services)} = **${bn(tradeInGoodsAndServices())}**, a surplus.` },
    { type: 'paragraph', text: 'That the two lines can point in opposite directions is the ordinary case rather than an oddity. A country can be a large exporter of goods and a net importer of services, or the other way round, and the balance is the sum of both.' },
    { type: 'paragraph', text: `The reason this is distinguished from the current account is coming next: Andara's trade balance is a **surplus of ${bn(tradeInGoodsAndServices())}** and its current account is a **deficit of ${bn(Math.abs(currentAccount()))}**. Both describe the same year and the same country.` },
  ],
  realExample: { emoji: '📦', text: 'A country sells more goods abroad than it buys and pays out more for foreign services than it earns from its own. Its trade balance is the two figures added, not either one of them.' },
  misconception: 'Students treat the trade balance as the balance of trade in goods alone. The specification names trade in goods AND services, so both lines are in it, and a country whose two lines point in opposite directions is the normal case.',
  examMatters: 'A Calculate (2 or 4 marks, WEC12 Appendix 6) requires a calculation from given data with workings shown. Add the goods balance and the services balance, keeping the sign of each; the sign is where this calculation is usually lost.',
  recall: recall(sid, {
    type: 'fillin',
    prompt: 'Complete the calculation of Andara\'s trade in goods and services balance:',
    template: [
      `Trade in goods is ${bn(BOP.goods)} and trade in services is ___`,
      'adding the two, keeping the sign of each, gives ___',
      'which is a ___',
    ],
    answers: [bn(BOP.services), bn(tradeInGoodsAndServices()), 'surplus'],
    hints: ['the negative one of the two trade lines', 'the sum of the two figures above', 'the word for a positive balance'],
    distractors: [bn(BOP.primary), 'deficit'],
  }),
}));

const currentAccountBalances = sub('current-account-deficit', (sid) => ({   // March id, kept
  title: 'Current Account Deficits and Surpluses',
  keyIdea: 'The current account is trade in goods and services plus primary and secondary income, so the income lines can turn a trade surplus into a current-account deficit.',
  body: [
    { type: 'paragraph', text: 'The specification asks for the **distinction between balance of payments deficits and surpluses on the current account**, and the distinction from the trade balance is where the marks are.' },
    { type: 'paragraph', text: `Andara's current account adds four figures: ${bn(BOP.goods)} in goods, ${bn(BOP.services)} in services, ${bn(BOP.primary)} in primary income and ${bn(BOP.secondary)} in secondary income. Together they give **${bn(currentAccount())}** — a deficit.` },
    { type: 'flow', steps: [
      { title: `Trade in goods and services: ${bn(tradeInGoodsAndServices())}`, subtitle: 'a surplus, on the two trade lines alone' },
      { title: `Primary income: ${bn(BOP.primary)}`, subtitle: 'more paid to foreign owners of assets here than earned on assets abroad' },
      { title: `Secondary income: ${bn(BOP.secondary)}`, subtitle: 'more transferred out than received' },
      { title: `Current account: ${bn(currentAccount())}`, subtitle: 'the income lines outweigh the trade surplus' },
    ], result: 'A trade surplus and a current-account deficit, in the same country in the same year', resultType: 'neutral' },
    { type: 'bullets', items: [
      '**A current account deficit** means more was paid out to the rest of the world than came in, on all four lines.',
      '**A surplus** means the opposite.',
      '**Neither is automatically good or bad.** A deficit means a country is buying more from abroad than it sells there, which can come from strong demand at home as easily as from weak exports.',
    ] },
  ],
  realExample: { emoji: '🌐', text: 'A country whose industry is largely foreign-owned pays out profits year after year. Its exports can exceed its imports and its current account can still be in deficit.' },
  misconception: 'Students conclude that a current account deficit means a country is uncompetitive. It can equally mean domestic demand is strong, so imports are high. The deficit is a fact about a balance; what caused it is a separate question the extract has to answer.',
  examMatters: 'An Evaluate (20 marks, WEC12 Appendix 6) requires arguments weighed and a judgement supported. Whether a current account deficit matters depends on its size, how long it has lasted and what is behind it, and a judgement that names those conditions is what the command word asks for.',
  recall: recall(sid, {
    type: 'reorder',
    prompt: 'Put these lines in the order they are added to reach Andara\'s current account balance, from the trade lines to the final figure:',
    correctOrder: [
      `Trade in goods and services: ${bn(tradeInGoodsAndServices())}`,
      `Primary income is added next: ${bn(BOP.primary)}`,
      `Secondary income follows it: ${bn(BOP.secondary)}`,
      `All four lines together give ${bn(currentAccount())}`,
    ],
    why: [
      'The two trade lines are added first and give a surplus on their own',
      'Primary income is the first of the two income lines and is negative here',
      'Secondary income is the last line before the total',
      'The total is a deficit, although the trade lines alone were a surplus',
    ],
  }),
}));

/* ── the blocks ────────────────────────────────────────────────────────────── */

const BLOCKS = [
  [B1, 'Real GDP measures output produced inside a country, and the three distinctions the specification draws — real and nominal, total and per capita, value and volume — each change what a figure means.', [whatRealGdpMeasures, gniIncomeRatherThanOutput, realAndNominal, totalAndPerCapita, valueAndVolume], [
    'Economic growth is the rate of change of REAL GDP, not the level of it.',
    'GNI counts residents’ income; GDP counts output produced inside the territory.',
    `Real GDP fell ${pc(realGrowth(2))} in a year when nominal GDP rose ${pc(nominalGrowth(2))}.`,
    'Growth equal to population growth leaves output per person exactly where it was.',
  ]],
  [B2, 'Comparing growth needs one currency, one basis and one length of period, and the specification defines both a negative growth rate and a recession precisely enough to be tested on.', [comparingBetweenCountries, comparingOverTime, purchasingPowerParities, positiveAndNegativeGrowth, recession], [
    'Between countries: one currency, real figures, and per capita where the question is about people.',
    'PPP converts at what money buys, not at what it trades for.',
    'A falling growth rate is still growth; a negative rate is a fall in output.',
    'A recession is TWO CONSECUTIVE quarters of negative growth.',
  ]],
  [B3, 'GDP counts output that passes through a market, so its limitations are either output it never counted or things a single total cannot show — and wellbeing is measured alongside it, not instead of it.', [limitationsOfGdp, wellbeingIndicators, incomeAndHappiness], [
    'Unpaid work, undeclared activity and resources used up are never counted.',
    'Distribution, what the spending was for and leisure cannot be seen in a total.',
    'Wellbeing indicators ask rather than count, and are used alongside GDP.',
    'Happiness rises with real income and flattens: extra income adds most where there is least.',
  ]],
  [B4, 'A consumer price index is a weighted average over a chosen basket, which is what makes it calculable and what produces every one of its limitations.', [inflationDeflationDisinflation, buildingACpi, calculatingInflation, limitationsOfCpi, producerPriceIndex], [
    'Disinflation is a falling RATE with a rising index; deflation is a falling index.',
    'Weight × index for each group, added, divided by the total weight.',
    'Outside the base year, divide by the PREVIOUS year’s index, not by 100.',
    `The same price changes re-weighted gave ${pc(INFLATION_HOUSEHOLD)} against the national ${pc(INFLATION)}.`,
  ]],
  [B5, 'Three causes of inflation and three of deflation, and the pair of movements in the price level and real output tells you which one you are looking at.', [demandPull, costPush, moneySupplyGrowth, deflationFallingAd, deflationRisingAs, deflationMoneyFall], [
    'Price level up with output up is demand-pull; up with output down is cost-push.',
    'Money growth causes inflation only where it EXCEEDS the growth of output.',
    'Price level down with output down is falling AD; down with output up is rising AS.',
    'Real output is what separates the two deflations; the price movement is identical.',
  ]],
  [B6, 'The specification names eight groups affected by a change in the price level, and the two directions are not simply opposites of one another.', [effectsOnConsumersWorkers, effectsOnFirms, effectsOnGovernment, effectsOnCurrentAccount], [
    `${money(SAVINGS)} at ${rate(SAVINGS_RATE)} buys what ${money(savingsReal())} bought, when inflation is ${pc(INFLATION)}.`,
    'Investment falls under BOTH inflation and deflation, for different reasons.',
    'Unexpected inflation moves real income from savers and fixed incomes to borrowers.',
    'Competitiveness turns on inflation RELATIVE to trading partners, not on the rate itself.',
  ]],
  [B7, 'The ILO definition decides who is counted, and the three rates are measured against two different denominators, so they do not add to 100.', [iloDefinition, underemployment, theThreeRates, netMigration], [
    'Without a job, available to start, actively seeking — all three at once.',
    'The underemployed have paid work, so they are employed and move no rate.',
    `Unemployment ${rate(unemploymentRate())} against the labour force; employment ${rate(employmentRate())} against the working-age population.`,
    'Employment and the unemployment rate can rise in the same year.',
  ]],
  [B8, 'Five causes, and the evidence that identifies each is different — which matters because what would remove one will not remove another.', [frictional, seasonal, structural, demandDeficiency, realWageInflexibility], [
    'Frictional and seasonal resolve on their own; the other three do not.',
    'Structural unemployment sits alongside unfilled vacancies, which is how you spot it.',
    'Demand deficiency appears across unrelated industries at once.',
    `A wage floor above the clearing level left ${FLOOR_GAP}m unemployed in the diagram.`,
  ]],
  [B9, 'Six groups, and the two most often missed are the ones that state the cost as lost output rather than lost income.', [effectsOnConsumersAndWorkers, effectsOnFirmsUnemployment, effectsOnPublicFinances, resourceUtilisation, effectsOnSociety], [
    'The lasting cost to a worker is larger than the income lost during the spell.',
    'For firms it cuts both ways: a smaller market against cheaper, more available labour.',
    'Public finances are hit twice — less tax collected and more support paid.',
    'Unemployment is a point INSIDE the frontier; the frontier itself has not moved.',
  ]],
  [B10, 'The current account is one component of the balance of payments and has four lines, so a trade surplus and a current-account deficit can describe the same year.', [bopComponents, tradeInGoodsAndServicesSub, currentAccountBalances], [
    'Three components: current, capital and financial. This topic is the current account.',
    'Trade in goods and services is the two trade lines added, signs kept.',
    `Andara: a trade surplus of ${bn(tradeInGoodsAndServices())} inside a current account deficit of ${bn(Math.abs(currentAccount()))}.`,
    'Neither a deficit nor a surplus is automatically good or bad.',
  ]],
];

export const SUBSECTIONS = BLOCKS.flatMap(([, , subs]) => subs);

export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  return BLOCKS.map(([title, takeawayIntro, sections, takeaway]) => ({
    id: blockId(title),
    title,
    keyIdea: takeawayIntro,
    sections,
    takeaway,
    diagramId: diagramIds[title],
    quizIndices: quizIndices[title],
    practiceIndices: practiceIndices[title],
  }));
}

/* ── Notes ─────────────────────────────────────────────────────────────────── */

const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });

export const NOTES = [
  {
    title: B1,
    meta: '2 measures + 3 distinctions',
    keyIdea: 'Economic growth is the rate of change of real GDP, and the specification draws three distinctions between measures of GDP and GNI.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>GDP</strong> — the total value of goods and services produced inside a country over a period.'),
        def('<strong>GNI</strong> — the income received by a country’s residents, wherever in the world it was earned.'),
        def('<strong>Economic growth</strong> — the rate of change of <strong>real</strong> GDP.'),
      ] },
      { title: 'THE THREE DISTINCTIONS (1c)', items: [
        mech('<strong>Real and nominal</strong> — real is at constant prices, nominal at the prices of the year itself. Only real measures output.'),
        mech('<strong>Total and per capita</strong> — per capita divides by population. Growth equal to population growth leaves it unchanged.'),
        mech('<strong>Value and volume</strong> — value is in money, volume in quantities. They can move in opposite directions.'),
      ] },
    ],
    takeaway: [
      `Real GDP: ${bn(realAt(0))} → ${bn(realAt(1))} → ${bn(realAt(2))}, growth ${pc(realGrowth(1))} then ${pc(realGrowth(2))}.`,
      `Per capita: ${money(perCapitaAt(0))} → ${money(perCapitaAt(1))} → ${money(perCapitaAt(2))}.`,
      `Value against volume: ${pc(OIL_VOLUME_CHANGE)} volume, ${pc(OIL_VALUE_CHANGE)} value, same year.`,
    ],
    misconception: 'A rising nominal GDP is not growth: Andara’s year 3 rose in money and fell in output.',
  },
  {
    title: B2,
    meta: '2 comparisons + 2 definitions',
    keyIdea: 'Comparisons need figures made comparable first, and both a negative growth rate and a recession have exact definitions.',
    blocks: [
      { title: 'MAKING FIGURES COMPARABLE', items: [
        mech('<strong>Between countries</strong> — one currency, real figures, per capita where the question is about people.'),
        mech('<strong>Over time</strong> — one base year, unchanged definitions, equal periods.'),
        mech('<strong>PPP</strong> — the rate at which a given basket costs the same in both countries.'),
      ] },
      { title: 'TWO DEFINITIONS', items: [
        def('<strong>Negative economic growth</strong> — real output smaller than the period before. Not a slower rate.'),
        def('<strong>Recession</strong> — two <strong>consecutive</strong> quarters of negative economic growth.'),
      ] },
    ],
    takeaway: [
      'A growth rate falling from 4% to 2% is still growth.',
      `Berewa: ${money(atMarket(PPP_ROWS[1]))} at the market rate, ${money(atPPP(PPP_ROWS[1]))} at PPP.`,
      'Two negative quarters separated by a positive one is not a recession.',
    ],
    misconception: 'Subtracting 100 from an index gives the change since the base year, not this year’s inflation.',
  },
  {
    title: B3,
    meta: '2 groups of limitation + wellbeing',
    keyIdea: 'GDP counts marketed output, so its limitations are output never counted and things a total cannot show.',
    blocks: [
      { title: 'NEVER COUNTED', items: [
        mech('<strong>Unpaid work</strong> — care, housework, subsistence farming.'),
        mech('<strong>Undeclared activity</strong> — work deliberately not recorded.'),
        mech('<strong>Resources used up</strong> — depletion counts as output and never as a loss.'),
      ] },
      { title: 'A TOTAL CANNOT SHOW IT', items: [
        mech('<strong>Distribution</strong> — the same average, shared evenly or not.'),
        mech('<strong>What the output was</strong> — repairing damage counts like anything else.'),
        mech('<strong>Leisure</strong> — the same output in fewer hours is a better outcome and an identical figure.'),
      ] },
      { title: 'WELLBEING (1i)', items: [
        mech('<strong>Indicators</strong> — life satisfaction, life expectancy, education, leisure, reported health.'),
        mech('<strong>Income and happiness</strong> — positive and flattening: extra income adds most where there is least.'),
      ] },
    ],
    takeaway: [
      'GDP is a good measure of output and an imperfect proxy for living standards.',
      'Wellbeing indicators ask rather than count, and are used alongside GDP.',
      'The flattening is why GDP per capita tracks wellbeing better in low-income countries.',
    ],
    misconception: '"GDP is useless" is a refusal to argue; "imperfect, and here is why" is the argument.',
  },
  {
    title: B4,
    meta: '3 terms + the calculation + 5 limitations',
    keyIdea: 'A consumer price index is a weighted average over a chosen basket, and every limitation follows from that construction.',
    blocks: [
      { title: 'THREE TERMS (2a)', items: [
        def('<strong>Inflation</strong> — a sustained rise in the general price level.'),
        def('<strong>Deflation</strong> — a sustained fall in the general price level.'),
        def('<strong>Disinflation</strong> — a fall in the <strong>rate</strong> of inflation, with prices still rising.'),
      ] },
      { title: 'THE CALCULATION (2b)', items: [
        mech('Weight each group by its share of spending; multiply weight by price index; add; divide by the total weight.'),
        mech(`Andara: ${TOTAL.toLocaleString('en-GB')} ÷ ${weightSum(BASKET)} = ${idx(CPI)}, so inflation is ${pc(INFLATION)}.`),
        mech('Outside the base year, divide by the <strong>previous year’s</strong> index, not by 100.'),
      ] },
      { title: 'LIMITATIONS (2c) AND THE PPI (2d)', items: [
        mech('An average over one basket: re-weighted to a household spending more on food it was ' + idx(CPI_HOUSEHOLD) + '.'),
        mech('Fixed between reviews · quality changes hard to price · buyers change what they buy · a sample.'),
        mech('<strong>Producer price index</strong> — prices at the factory gate, which move before consumer prices do.'),
      ] },
    ],
    takeaway: [
      `${idx(CPI)} nationally against ${idx(CPI_HOUSEHOLD)} for a household weighted differently.`,
      'Disinflation: prices rising, rate falling. Deflation: index falling.',
      `The producer index rose ${pc(PPI_CHANGE)} while the consumer index rose ${pc(INFLATION)}.`,
    ],
    misconception: 'Falling inflation is disinflation, and prices are still rising.',
  },
  {
    title: B5,
    meta: '3 causes of inflation + 3 of deflation',
    keyIdea: 'The pair of movements in the price level and real output identifies which cause is operating.',
    blocks: [
      { title: 'CAUSES OF INFLATION (2e)', items: [
        mech('<strong>Demand-pull</strong> — AD rises; price level up, real output up.'),
        mech('<strong>Cost-push</strong> — costs per unit rise, SRAS left; price level up, real output down.'),
        mech('<strong>Excessive money growth</strong> — the money supply grows faster than output; more money, same goods.'),
      ] },
      { title: 'CAUSES OF DEFLATION (2f)', items: [
        mech('<strong>Falling AD</strong> — price level down, real output down. Self-reinforcing if buyers wait.'),
        mech('<strong>Increase in AS</strong> — price level down, real output <strong>up</strong>.'),
        mech('<strong>Fall in the money supply</strong> — less to spend, so AD falls and prices with it.'),
      ] },
    ],
    takeaway: [
      'Up/up = demand-pull. Up/down = cost-push.',
      'Down/down = falling AD. Down/up = rising AS.',
      'Money growth matters only where it exceeds the growth of output.',
    ],
    misconception: 'All deflation is not damaging: deflation from rising AS comes with rising output.',
  },
  {
    title: B6,
    meta: '8 groups, both directions',
    keyIdea: 'A change in the price level moves real income between groups rather than removing it, and the two directions are not mirror images.',
    blocks: [
      { title: 'THE EIGHT (2g)', items: [
        mech('<strong>Consumers</strong> — money buys less; under deflation, more, and waiting is rewarded.'),
        mech('<strong>The government</strong> — receipts rise with inflation and the real debt shrinks; deflation reverses both.'),
        mech('<strong>Firms</strong> — planning is harder; under deflation revenue falls while money debts do not.'),
        mech('<strong>Workers</strong> — pay behind prices is a real pay cut; under deflation, pay or jobs are cut.'),
        mech('<strong>Income distribution</strong> — unexpected inflation moves income from savers and fixed incomes to borrowers.'),
        mech('<strong>Investment</strong> — discouraged by BOTH, for different reasons.'),
        mech('<strong>Competitiveness</strong> — turns on inflation relative to trading partners.'),
        mech('<strong>The current account</strong> — dearer exports and relatively cheaper imports move it towards deficit.'),
      ] },
    ],
    takeaway: [
      `${money(SAVINGS)} at ${rate(SAVINGS_RATE)} became ${money(savingsNominal())} and buys what ${money(savingsReal())} bought.`,
      'Expected inflation does far less damage than unexpected inflation.',
      'Inflation lower than trading partners’ IMPROVES competitiveness.',
    ],
    misconception: 'Inflation does not make everyone poorer: a borrower gains what a lender loses.',
  },
  {
    title: B7,
    meta: '1 definition + 3 rates',
    keyIdea: 'The ILO definition decides who is counted; the three rates use two different denominators.',
    blocks: [
      { title: 'THE ILO DEFINITION (3a)', items: [
        def('Without a job · available to start work · actively seeking work. <strong>All three at once.</strong>'),
        mech('Any paid work makes a person <strong>employed</strong>. Not seeking or not available makes them <strong>inactive</strong>.'),
      ] },
      { title: 'THE RATES (3d, 3e, 3f)', items: [
        mech(`<strong>Unemployment rate</strong> = unemployed ÷ <strong>labour force</strong> = ${rate(unemploymentRate())}.`),
        mech(`<strong>Employment rate</strong> = employed ÷ <strong>working-age population</strong> = ${rate(employmentRate())}.`),
        mech(`<strong>Inactivity rate</strong> = inactive ÷ <strong>working-age population</strong> = ${rate(inactivityRate())}.`),
        mech('<strong>Underemployment</strong> — in work and wanting more of it. Counted as employed, so it moves no rate.'),
        mech(`<strong>Net migration</strong> — raises the labour force and employment together; the rate went ${rate(unemploymentRate())} → ${rate(mUnemploymentRate())}.`),
      ] },
    ],
    takeaway: [
      'The three rates do not add to 100, because the denominators differ.',
      'Unemployed people who stop looking become inactive and the rate falls.',
      'More people in work and a higher unemployment rate can both be true.',
    ],
    misconception: 'Underemployment cannot raise the unemployment rate: the underemployed have paid work.',
  },
  {
    title: B8,
    meta: '5 causes',
    keyIdea: 'Each cause has different evidence behind it, and what removes one will not remove another.',
    blocks: [
      { title: 'THE FIVE (3b)', items: [
        mech('<strong>Frictional</strong> — time taken to match a worker to a job. Short; resolves itself.'),
        mech('<strong>Seasonal</strong> — the work runs on a yearly cycle. Predictable; figures are seasonally adjusted.'),
        mech('<strong>Structural</strong> — a mismatch of skills or location. Long-lasting; sits beside unfilled vacancies.'),
        mech('<strong>Demand deficiency</strong> — too little aggregate demand. Appears across unrelated industries at once.'),
        mech('<strong>Real wage inflexibility</strong> — a wage held above the level at which all willing workers are hired.'),
      ] },
    ],
    takeaway: [
      'Unemployment alongside unfilled vacancies means a mismatch, not a shortage of jobs.',
      'A cause common to unrelated industries has to be economy-wide.',
      `At the wage floor: ${FLOOR_DEMAND}m wanted, ${FLOOR_SUPPLY}m willing, ${FLOOR_GAP}m unemployed.`,
    ],
    misconception: 'Frictional unemployment is not a failure: an economy with none is one where nobody changes jobs.',
  },
  {
    title: B9,
    meta: '6 groups',
    keyIdea: 'Unemployment is a loss of output as well as a loss of income, and the costs outlast the spell.',
    blocks: [
      { title: 'THE SIX (3c)', items: [
        mech('<strong>Consumers</strong> — lost income, and caution among those still in work.'),
        mech('<strong>Firms</strong> — a smaller market against cheaper, more available labour.'),
        mech('<strong>Workers</strong> — skills decay, and earnings stay lower for years afterwards.'),
        mech('<strong>Public finances</strong> — less tax collected AND more support paid.'),
        mech('<strong>Resource utilisation and the PPF</strong> — the economy produces at a point <strong>inside</strong> its frontier.'),
        mech('<strong>Society</strong> — health, families and regions; costs no figure records.'),
      ] },
    ],
    takeaway: [
      'The frontier has not moved; the economy is at a point inside it.',
      'The tax not collected usually exceeds the support paid out.',
      'Social costs are persistent and concentrated, so a national figure understates them.',
    ],
    misconception: 'Unemployment does not shift the frontier inward unless skills and capital are lost for good.',
  },
  {
    title: B10,
    meta: '3 components + 4 lines',
    keyIdea: 'The current account is one component of the balance of payments and has four lines, so the trade balance and the current account can disagree.',
    blocks: [
      { title: 'COMPONENTS (4a)', items: [
        mech('<strong>Current account</strong> — trade in goods, trade in services, primary income, secondary income.'),
        mech('<strong>Capital account</strong> and <strong>financial account</strong> — named here; studied in Unit 4.'),
      ] },
      { title: 'THE TWO DISTINCTIONS (4b, 4c)', items: [
        mech(`<strong>Trade in goods and services</strong> = ${bn(BOP.goods)} + ${bn(BOP.services)} = ${bn(tradeInGoodsAndServices())}, a surplus.`),
        mech(`<strong>Current account</strong> = that plus ${bn(BOP.primary)} and ${bn(BOP.secondary)} = ${bn(currentAccount())}, a deficit.`),
        mech('A deficit means more paid out than came in. Neither a deficit nor a surplus is automatically good or bad.'),
      ] },
    ],
    takeaway: [
      'The current account is not the whole balance of payments.',
      'Keep the sign of each line when adding them.',
      'A trade surplus and a current-account deficit can be the same country in the same year.',
    ],
    misconception: 'A current account deficit can come from strong demand at home as easily as from weak exports.',
  },
];
