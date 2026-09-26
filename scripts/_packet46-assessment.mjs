/**
 * PACKET 46 — growth-development assessment: the quiz bank, the practice set, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED ──────────────────────────────────────────
 *
 * The live bank is twelve items. structure-03 names five that test content the section never
 * taught: Q3 (the Lewis turning point), Q4 and Q11 (Dutch disease — 0 hits in the specification),
 * Q7 (capital flight), Q10 (a Harrod-Domar assumption). Q11 also carried joke distractors ("Dutch
 * colonial trade policies"). Dutch disease is gone; the Lewis model, capital flight and the
 * Harrod-Domar model each have a subsection now, so the items that test them are taught first
 * (quiz-01, quiz-02, topFix-03). Every item is authored against a chapter, and the runner refuses a
 * quiz term no subsection teaches and a near-duplicate stem (token Jaccard ≥ 0.5).
 *
 * ── THE PINS ARE DERIVED ─────────────────────────────────────────────────────
 *
 * Every item carries its block; `quizIndices` / `practiceIndices` are derived from the tag by the
 * runner, so a chapter's check-in cannot show another chapter's item (structure-02).
 *
 * ── THE PRACTICE SET FOLLOWS THE WEC14 PAPER ─────────────────────────────────
 *
 * The live five were "Define (4)", "Explain … (6)", "Assess … (10)", "Evaluate (20)" and "Outline
 * (4)" — four of five illegal in IAL Economics (topFix-05 named two; "Assess" and the Explain at 6
 * are the same defect). DECISIONS 2026-09-26 shapes practice on the unit's real paper. WEC14 is
 * B: one data question 2/4/6/8/14 (Define or Calculate, Explain, Analyse, Examine, Discuss) and C:
 * two 20-mark essays from three (`audit/raw/ial-paper-structure.json`, economics.units_3_4). The
 * set is those five tariffs, a Calculate at each of Appendix 6's two tariffs, and three 20-mark
 * Evaluates — so a student can practise every part the paper sets, and choose two of three essays.
 * No Draw: WEC14's paper has no Draw part. Guidance above 6 marks is levels, never marks per point.
 */
import { id, hash8, ECON, bn, pct, ix } from './_packet46-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet46-content.mjs';

const E = ECON;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST AND THE KEY IS THEN DEALT INTO A POSITION by ranking the
 * items on a hash of their own stem (packet 36). No explanation names an option by position or by
 * letter, because the dealing moves the key after the explanation was written.
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
  /* ── the pre-test pool: three items, unpinned, FIRST, all answerable from chapter one ── */
  qi(null, 'Which of these is one of the three components of the Human Development Index?',
    ['life expectancy at birth', 'the unemployment rate', 'the inflation rate', 'the budget balance'],
    'The HDI combines health, measured by life expectancy at birth, with education and income. Unemployment, inflation and the budget balance are measures of macroeconomic performance, not of human development.'),
  qi(null, 'Economic development differs from economic growth because development:',
    ['covers health and education, not just output', 'measures only the rise in real GDP', 'happens only in high-income economies', 'is measured at current prices'],
    'Growth is a rise in real output. Development is a rise in the quality of people\'s lives — longer lives, more schooling, higher incomes shared more widely — which growth can help pay for but does not guarantee.'),
  qi(null, 'The HDI combines its three dimension indices by taking:',
    ['their geometric mean', 'their simple sum', 'the highest of the three', 'their ratio to GDP'],
    'The HDI is the cube root of the product of the three indices. A geometric mean means a very weak dimension pulls the index down more than it would in an ordinary average.'),

  /* ── Block 1 · Measuring Development ──────────────────────────────────── */
  qi(B1, 'A country\'s life expectancy at birth is 50 years. Using HDI goalposts of 20 and 85 years, its health index is:',
    ['0.462', '0.588', '0.769', '0.500'],
    'The index is the distance above the minimum as a share of the whole range: (50 − 20) ÷ (85 − 20) = 30 ÷ 65 = 0.462. Dividing 50 by 85, or by 65, ignores the minimum goalpost.'),
  qi(B1, 'Why does the HDI use a geometric rather than an arithmetic mean?',
    ['a very low score in one dimension pulls it down more', 'it gives income twice the weight of health', 'it is simpler to calculate by hand', 'it removes the need for goalposts'],
    'With a geometric mean, high income cannot make up for very short lives. An arithmetic mean would let a strong dimension hide a weak one; the goalposts are still needed to scale each dimension beforehand.'),
  qi(B1, 'Which is a limitation of the HDI when comparing living standards between countries?',
    ['it is an average that hides how evenly gains are shared', 'it measures income alone', 'it cannot be calculated for developing countries', 'it ignores life expectancy'],
    'A national average can rise because the better-off gain while the poorest do not. The HDI measures three dimensions, not income alone, and life expectancy is one of them.'),
  qi(B1, 'A high percentage of adult male labour in agriculture suggests an economy that:',
    ['has not yet shifted much into industry and services', 'has a highly mechanised farm sector', 'uses a great deal of energy per capita', 'has many doctors per thousand of population'],
    'Output per worker is usually far higher in industry and services, so a large share of men working the land shows the structural shift that comes with development has not gone far.'),
  qi(B1, 'Growth without development is most likely when:',
    ['the income from growth goes mainly to a small elite', 'life expectancy and schooling both rise', 'real GDP falls for two years in a row', 'the HDI rises faster than GDP'],
    'If extra income is captured by a few, output can rise while health, schooling and most people\'s incomes barely change. Rising life expectancy and schooling are development.'),

  /* ── Block 2 · Constraints: Commodities, Savings and Currency ─────────── */
  /* Fix round 2 (founder ruling, 26 Sep): this is the chapter-2 check-in's item. Its diagram prints "12" eight times,
     including "Export earnings" / "$12bn", and the old key, 10%, was the only option near it. The key is now 52% (0.8 ×
     65%), 23 or more from every number that diagram prints, and it sits inside the options. 48% (what earnings fall
     to, not by) is nearest the diagram's 12 and "a quarter" (25), and 80% (the share alone) is nearest its 75, 90, 100
     and 120. 65% is the price fall alone. Worded so its hash keeps the old rank: no other item's key moves. */
  qi(B2, 'A country earns 80% of its export revenue from copper, and the world copper price falls by 65%. Its export earnings fall by:',
    ['52%', '65%', '48%', '80%'],
    'The fall in earnings is the good\'s share of exports times the fall in its price: 0.8 × 65% = 52%. Using the price fall alone, 65%, assumes copper is all the country exports; 48% is what earnings fall to, not by; and 80% is copper\'s share, not the fall.'),
  qi(B2, 'The Prebisch-Singer hypothesis predicts that, over the long run, the terms of trade of primary product exporters will:',
    ['decline', 'improve', 'stay constant', 'double'],
    'Primary product prices tend to fall relative to manufactures, so each unit of exports buys fewer imports: the terms of trade decline.'),
  qi(B2, 'One reason given for the Prebisch-Singer hypothesis is that demand for primary products is:',
    ['income inelastic', 'price elastic', 'income elastic', 'perfectly elastic'],
    'As world incomes rise, spending on food and raw materials rises more slowly than spending on manufactures and services, so primary prices lag behind.'),
  qi(B2, 'In the Harrod-Domar model, a country saving 20% of GDP with a capital-output ratio of 5 grows at:',
    ['4%', '25%', '100%', '15%'],
    'Growth = savings ratio ÷ capital-output ratio = 20 ÷ 5 = 4%. Multiplying the two, or subtracting one from the other, has no meaning in the model.'),
  qi(B2, 'A foreign currency gap exists when:',
    ['export earnings fall short of the imports growth needs', 'domestic saving is below the investment needed', 'the government spends more than it collects in tax', 'imports are smaller than exports'],
    'The gap is a shortage of foreign currency to pay for imports such as machinery and fuel. Too little domestic saving is the savings gap, a different constraint.'),
  qi(B2, 'Capital flight is best described as:',
    ['residents moving their savings out of the country', 'foreign aid being withdrawn by donors', 'a fall in the price of capital goods', 'machinery wearing out faster than it is replaced'],
    'Capital flight is money moved abroad by a country\'s own residents and firms, usually out of fear for its safety at home. It drains both domestic savings and foreign currency.'),

  /* ── Block 3 · Constraints: People, Debt, Credit and Infrastructure ────── */
  /* Fix round (founder ruling, 26 Sep): this is the chapter-3 check-in's item, shown under the diagram that works
     (42 + 4) ÷ 54 × 100 = 85. The old stem (40/5/55, key 82) was the only option near 85, so it could be picked by
     proximity. Now a different case, a falling birth rate. The key, 33, is 9 or more from every number the diagram
     prints, and 31, 27 and 133 are named errors: working age taken as 100 − 20, the over-64s left out of the
     dependants, the whole population over working age. The stem gives no working-age share, so the student finds it
     (as the chapter's recall drills). Worded so its hash keeps the old rank: no other item's key moves. */
  qi(B3, 'An emerging economy\'s birth rate has fallen: 20% of its people are under 15 and 5% are over 64. Its dependency ratio is approximately:',
    ['33', '31', '27', '133'],
    'Working age is what is left: 100 − 20 − 5 = 75%. The dependency ratio is (young + old) ÷ working age × 100 = 25 ÷ 75 × 100 = 33. Taking working age as 80% forgets to take out the over-64s and gives 31; leaving the over-64s out of the dependants gives 27; dividing the whole population by the working age gives 133.'),
  qi(B3, 'Overseas debt constrains development mainly because servicing it:',
    ['uses up foreign currency and tax revenue', 'raises the savings ratio at home', 'lowers the capital-output ratio', 'increases the country\'s export earnings'],
    'Interest and repayments are paid in foreign currency, often from tax revenue, before any imports or public services are paid for.'),
  qi(B3, 'Why do small farmers in many developing economies find it hard to borrow from banks?',
    ['they have no collateral such as a land title', 'interest rates are set at zero', 'banks may lend only to exporters', 'their incomes are too high to qualify'],
    'Without a land title or formal records, a farmer has nothing a bank can lend against, so many turn to moneylenders at very high interest.'),
  qi(B3, 'Unreliable electricity supply constrains growth mainly because it:',
    ['raises firms\' costs and interrupts production', 'lowers the price of imported fuel', 'increases the dependency ratio', 'raises the savings ratio'],
    'Firms must stop work or run their own generators, which raises costs at every level of output and deters investment, including FDI.'),
  qi(B3, 'Low levels of education and skills constrain growth mainly by:',
    ['keeping output per worker low', 'raising the savings ratio', 'increasing export prices', 'reducing the population'],
    'A workforce with little schooling produces little per worker and cannot run or repair modern equipment, so incomes and investment stay low.'),

  /* ── Block 4 · Non-Economic Constraints ───────────────────────────────── */
  qi(B4, 'Corruption constrains investment mainly because it:',
    ['raises the cost and risk of investing', 'lowers the tax rate on profits', 'makes contracts easier to enforce', 'increases the supply of credit'],
    'Bribes and unreliable decisions act like a tax on investment: a firm needs a higher expected return before it invests, so less is invested.'),
  qi(B4, 'Which is an example of poor governance rather than corruption?',
    ['courts taking years to settle a contract dispute', 'an official demanding a bribe for a licence', 'a contract given to a minister\'s relative', 'customs officers taking cash to let goods through'],
    'Slow courts are a failure of the state to provide reliable rules; nobody need be taking a bribe. The other three are abuses of public office for private gain.'),
  qi(B4, 'On a production possibility frontier, a civil war that destroys factories and roads is best shown as:',
    ['an inward shift of the frontier', 'a movement along the frontier', 'an outward shift of the frontier', 'a point beyond the frontier'],
    'Capital and workers are lost, so the economy can produce less of everything: its frontier shifts inward.'),
  qi(B4, 'The loss of doctors who emigrate from a developing country is partly offset when emigrants:',
    ['send remittances home in foreign currency', 'raise the dependency ratio', 'reduce the country\'s exports', 'widen the savings gap'],
    'Remittances raise household incomes and ease the foreign currency gap, which is why emigration is weighed, not simply counted as a loss.'),
  qi(B4, 'Terrorism reduces growth in the regions it affects mainly by:',
    ['deterring investors and tourists', 'raising the price of exports abroad', 'increasing the number of doctors', 'lowering the dependency ratio'],
    'Fear keeps people at home and keeps investors and tourists away, and firms pay for security; the damage is concentrated where the attacks happen.'),

  /* ── Block 5 · Market-Orientated Strategies ───────────────────────────── */
  qi(B5, 'Trade liberalisation is most likely to narrow a developing economy\'s foreign currency gap by:',
    ['raising export earnings as firms reach larger markets', 'reducing imports of machinery and fuel', 'raising import duties on manufactures', 'banning foreign ownership of firms'],
    'Open markets let exporters sell more abroad, which earns the foreign currency that pays for imports. Raising duties and banning foreign ownership are the opposite of liberalisation.'),
  qi(B5, 'A country saves 11% of GDP and receives FDI of 4% of GDP. With a capital-output ratio of 3, Harrod-Domar predicts growth of:',
    ['5%', '3.7%', '1.3%', '45%'],
    'Investment is domestic saving plus FDI: 11% + 4% = 15% of GDP. Growth = 15 ÷ 3 = 5%. Using saving alone gives 3.7%, and multiplying gives 45%.'),
  qi(B5, 'Which is a likely cost of promoting FDI for the host country?',
    ['profits are repatriated to the parent company', 'domestic investment rises', 'technology is transferred to local firms', 'export markets become accessible'],
    'Part of the income from FDI flows back to the foreign owner. The other three are benefits the strategy aims for.'),
  qi(B5, 'Removing a fuel subsidy is most likely to:',
    ['free government revenue but raise transport costs', 'lower the price of fuel for households', 'increase the budget deficit', 'reduce the price of food'],
    'The government stops paying to hold the price down, so it saves money, and the price households and firms pay rises to its true cost.'),
  qi(B5, 'Under a floating exchange rate, a fall in a country\'s export earnings will tend to:',
    ['depreciate its currency, making exports cheaper', 'appreciate its currency, making imports cheaper', 'leave the exchange rate unchanged', 'use up the central bank\'s reserves'],
    'Less demand for the currency lowers its market value. No reserves are spent, because the central bank is not defending a target.'),
  qi(B5, 'Microfinance schemes often lend to groups of borrowers because:',
    ['members guarantee each other in place of collateral', 'groups qualify for lower tax rates', 'banks are required to lend to groups', 'groups can borrow in foreign currency'],
    'Poor borrowers have no collateral, so the group\'s joint responsibility for repayment takes its place, and members check on each other.'),

  /* ── Block 6 · Interventionist Strategies ─────────────────────────────── */
  qi(B6, 'The infant industry argument for protection says a new industry needs shelter because:',
    ['its costs are high until it grows and learns', 'it can never match imports on cost', 'it pays no tax', 'consumers prefer imported goods'],
    'A new industry is small and inexperienced, so its costs start high. Temporary protection gives it time to grow and cut them; the argument fails if it can never compete.'),
  qi(B6, 'A central bank sells its dollar reserves to buy its own currency. It is trying to:',
    ['stop its currency falling', 'make its exports cheaper', 'increase its reserves', 'raise the money supply'],
    'Buying its own currency raises demand for it and holds its value up, which uses reserves.'),
  qi(B6, 'A coffee buffer stock has a floor of $2 a kilogram. A bumper harvest would push the price to $1.50. The agency will:',
    ['buy coffee to hold the price at the floor', 'sell coffee from its stock', 'do nothing, as the price is inside the band', 'raise the ceiling price'],
    'Below the floor, the agency buys the surplus that buyers do not want at the floor price, so the market price stays at the floor.'),
  qi(B6, 'Why do governments, rather than private firms, build most infrastructure in developing economies?',
    ['it pays back slowly and benefits many who do not pay', 'private firms are not allowed to build roads', 'infrastructure brings no benefit to anyone', 'governments pay lower wages'],
    'Infrastructure is costly, lasts decades and its benefits spread to people who do not pay for them, so private firms build too little of it.'),
  qi(B6, 'In a joint venture between a TNC and a local firm, the host country gains mainly because:',
    ['local partners share profits and technology', 'the TNC pays no tax', 'imports of machinery are banned', 'the currency stops moving'],
    'Shared ownership keeps part of the profit in the country, and working alongside the TNC transfers technology and management methods.'),
  qi(B6, 'Developing human capital raises growth mainly by:',
    ['increasing output per worker', 'raising the dependency ratio', 'reducing export earnings', 'lowering the savings ratio'],
    'Education, training and health make each worker more productive, and attract investors who need trained staff — with a long delay before the effect arrives.'),

  /* ── Block 7 · Other Strategies and International Institutions ─────────── */
  qi(B7, 'In the Lewis dual-sector model, surplus labour refers to farm workers whose:',
    ['extra output is close to zero', 'wages are above factory wages', 'jobs are in the modern sector', 'skills are in short supply'],
    'There are so many workers on the land that removing some barely reduces the harvest, so they can move to the modern sector at almost no cost to farm output.'),
  qi(B7, 'In the Lewis model, the modern sector keeps expanding because:',
    ['its profits are reinvested in more capital', 'the government sets a minimum wage', 'farm output rises each year', 'workers return to the farms'],
    'High profits, reinvested, grow the capital stock, which raises the modern sector\'s demand for workers at an unchanged wage.'),
  qi(B7, 'The Lewis turning point is reached when:',
    ['surplus labour runs out and wages start to rise', 'the traditional sector grows faster than industry', 'profits are no longer reinvested', 'all workers leave the modern sector'],
    'While surplus labour lasts, the modern sector can hire at a constant wage. Once it is used up, it must bid workers away from farming, so wages rise.'),
  qi(B7, 'Tourism earnings leak abroad when visitors:',
    ['stay in foreign-owned hotels and eat imported food', 'hire local guides for safari trips', 'pay the government\'s airport tax on departure', 'buy fruit grown on nearby farms at market'],
    'Money paid to foreign owners and suppliers leaves the country. Wages for local guides, taxes and purchases from local farms stay.'),
  qi(B7, 'The IMF differs from the World Bank mainly because the IMF:',
    ['lends short-term to countries in balance of payments crises', 'finances long-term projects such as dams', 'is owned by private shareholders', 'lends only to developed economies'],
    'The IMF provides crisis lending with conditions; the World Bank lends for long-term development projects. Both are owned by member governments.'),
  qi(B7, 'Debt relief promotes development mainly by:',
    ['freeing money that went on servicing debt', 'raising the country\'s interest rates', 'increasing its overseas borrowing', 'lowering its export earnings'],
    'Cancelled debt no longer absorbs foreign currency and tax revenue, which can then pay for imports, health and schooling.'),
  qi(B7, 'A strength of NGOs in delivering development projects is that they:',
    ['can reach and target the poorest communities directly', 'operate on a far larger scale than governments', 'can set a country\'s interest rates', 'lend to countries in currency crises'],
    'Working at community level, NGOs can reach remote villages and target the poorest. Their scale is small, and crisis lending is the IMF\'s role.'),
  qi(B7, 'Developing primary industries risks worsening which constraint?',
    ['dependence on volatile commodity prices', 'a shortage of surplus labour', 'a low dependency ratio', 'too much foreign currency'],
    'More reliance on crops and minerals exposes export earnings to swings in their world prices and, on the Prebisch-Singer argument, to declining terms of trade.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

/*
 * EVERY GUIDANCE IS TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx` prints
 * `guidance.split('\n')[0]` above the empty answer box in guided mode. The opening carries no
 * figure, no mark allocation and no answer. Nothing above 6 marks allocates points (topFix-05).
 */
const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'Human Development Index'. (2 marks)",
    `Two marks means two separate points. Decide what kind of measure the HDI is, and then what goes into it — listing the parts without saying they are combined into one index is only half an answer.\nThe HDI is a composite index of human development, published by the United Nations (1 mark), that combines three dimensions: health, measured by life expectancy at birth; education, measured by mean and expected years of schooling; and income, measured by GNI per head at purchasing power parity (1 mark). "Health, education and wealth" does not earn the second mark: the third dimension is income.`),

  pr(B1, 'Calculate', 2, `A country's life expectancy at birth is ${E.lifeExpQ} years. Calculate its HDI health index, using the goalposts of ${E.leMin} and ${E.leMax} years. (2 marks)`,
    `Calculate asks for the working as well as the answer (Appendix 6). Before any arithmetic, decide where the country sits between the two goalposts — the index is the distance above the minimum as a share of the whole range.\nHealth index = (actual − minimum) ÷ (maximum − minimum) = (${E.lifeExpQ} − ${E.leMin}) ÷ (${E.leMax} − ${E.leMin}) = ${E.lifeExpQ - E.leMin} ÷ ${E.leMax - E.leMin} (1 mark) = ${ix(E.healthIxQ)} (1 mark). Dividing ${E.lifeExpQ} by ${E.leMax} ignores the minimum goalpost.`),

  pr(B2, 'Explain', 4, 'Explain how dependence on primary products can constrain a developing economy\'s growth, with reference to the Prebisch-Singer hypothesis. (4 marks)',
    `Appendix 6 wants linked stages for an Explain. Start from what happens to the prices of primary products relative to manufactures over time, and carry the chain through to what the country can afford to import.\nKnowledge: the Prebisch-Singer hypothesis states that the prices of primary products tend to fall over time relative to the prices of manufactured goods (1 mark). Reason: demand for primary products is income inelastic, so as world incomes rise spending on them grows more slowly (1 mark). Analysis: the terms of trade of a primary exporter therefore decline, so each unit of exports buys fewer imports (1 mark). Analysis: machinery and other capital goods cost more exports, so investment and growth are constrained (1 mark).`),

  pr(B2, 'Calculate', 4, 'A country saves 20% of its GDP and has a capital-output ratio of 5. Its population grows by 2.5% a year. Calculate, using the Harrod-Domar model, its annual rate of growth of GDP and of GDP per head. (4 marks)',
    `Calculate asks for workings (Appendix 6). Write down the model's equation before substituting anything, and read the question again for the second figure it asks for: growth of GDP and growth per head are different answers.\nGrowth = savings ratio ÷ capital-output ratio = 20% ÷ 5 (1 mark) = 4% a year (1 mark). Growth of GDP per head ≈ growth of GDP − population growth = 4% − 2.5% (1 mark) = 1.5% a year (1 mark). Multiplying 20 by 5 instead of dividing is the common error.`),

  pr(B3, 'Analyse', 6, 'Analyse how a high dependency ratio may constrain growth and development in a developing economy. (6 marks)',
    `Appendix 6 wants depth for an Analyse: one route followed through several linked stages. Decide first which dependants the question means — a young population and an ageing one constrain through different channels.\nKnowledge: the dependency ratio is the number of people under 15 and over 64 for every 100 of working age (1 mark). Application: in a young, fast-growing population a large share of income goes on feeding and schooling children (1 mark). Analysis, first stage: households have little left to save, so savings available for investment are low (1 mark). Analysis, second stage: in the Harrod-Domar model, lower saving means lower investment and slower growth (1 mark). Analysis, third stage: the government must fund school places and clinics for a rising number of children, leaving less for infrastructure (1 mark). Development: income per head grows slowly when population growth absorbs most of the rise in output (1 mark).`),

  pr(B4, 'Examine', 8, 'Examine the impact of corruption and poor governance on growth and development in developing economies. (8 marks)',
    `Appendix 6 wants a chain of reasoning and a brief assessment for an Examine, so save room for a judgement. Separate the two factors before writing: taking bribes is not the same failure as courts that cannot enforce a contract.\nLevel 1 states that corruption harms growth, with little explanation. Level 2 explains a chain: bribes and unreliable courts raise the cost and risk of investing, so less is invested and growth slows. Level 3 develops two chains with application — public money diverted from roads and clinics, so development suffers directly; foreign investors choosing other countries, so the savings and foreign currency gaps stay open. The brief assessment that lifts an answer to the top of the range weighs how much it matters: some economies have grown fast despite corruption, and its effect depends on whether it is predictable or arbitrary and on how much investment it touches.`),

  pr(B5, 'Discuss', 14, 'Discuss the likely impact of trade liberalisation on growth and development in a developing economy. (14 marks)',
    `Appendix 6 wants chains of reasoning, different viewpoints and a critical assessment. Plan the case for and the case against before writing, and decide what your judgement will depend on — the kind of goods the economy exports is the obvious place to start.\nLevel 1 describes liberalisation with little explanation. Level 2 explains one side: larger export markets and cheaper imported inputs raise export earnings and investment, narrowing the foreign currency gap. Level 3 develops both sides with application: for it, specialisation, competition and cheaper capital goods; against it, infant industries wiped out by established rivals, deeper dependence on primary products and declining terms of trade, lost revenue from import duties, and workers in closing industries. Level 4 reaches a supported judgement that follows from the argument: liberalisation tends to help an economy with manufacturing capacity and diversified exports more than one that exports a single commodity, and it works best phased in, with support for the industries and workers that lose out.`),

  pr(B6, 'Evaluate', 20, 'Evaluate the view that interventionist strategies are more effective than market-orientated strategies in promoting growth and development in developing economies. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. Plan the strongest case for each approach before writing, and decide in advance what your judgement will turn on, so that the conclusion follows from the argument rather than appearing at the end.\nLevel 1 lists strategies with little explanation. Level 2 explains how one or two strategies work — for example, human capital raising output per worker, or FDI adding to investment. Level 3 develops both approaches with chains and application: interventionist strategies fill gaps markets leave (infrastructure, schooling, stable commodity prices) but need money, reserves and honest administration; market-orientated strategies raise efficiency and draw in foreign savings but can deepen inequality and dependence on primary products. Level 4 reaches a supported judgement: the most defensible is conditional — interventionist strategies are strongest where markets are missing and the state is capable, market-orientated ones where markets function and governance is weak, and most successful developing economies combined the two, protecting and investing while pushing firms to export.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the extent to which industrialisation, as described by the Lewis dual-sector model, can promote development in a developing economy. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. Start from what the model assumes, because every strong evaluation of it tests those assumptions against the economy in the question.\nLevel 1 describes industrialisation with little explanation. Level 2 explains the model: surplus labour in traditional farming moves to a modern sector paying a wage just above farm incomes, and reinvested profits keep creating jobs. Level 3 develops the process and its limits: output per worker rises as labour moves, incomes and tax revenue grow, and the turning point raises wages; against that, profits may be sent abroad or spent, factories may use labour-saving machines, and migrants can arrive in cities faster than jobs, leaving unemployment and slums. Level 4 reaches a supported judgement: industrialisation promotes development where profits are reinvested, industry is labour-intensive and workers have the skills to move — conditions that depend on human capital, infrastructure and governance as much as on the model itself.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the role of the World Bank, the International Monetary Fund and non-government organisations in promoting growth and development. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. The three institutions do different jobs, so plan what each is for before judging how well it does it.\nLevel 1 describes one institution with little explanation. Level 2 explains their roles: the World Bank finances long-term development projects; the IMF lends short-term to countries in balance of payments crises; NGOs deliver aid and services directly to communities. Level 3 develops their effects on both sides: World Bank projects build infrastructure and human capital but can add to debt and suit donors' priorities; IMF loans restore stability and confidence but their conditions can cut health and education spending and deepen recessions; NGOs reach the poorest at low cost but on a small scale and with uncertain funding. Level 4 reaches a supported judgement: their contributions complement one another, and their effectiveness depends on the country's governance and on whether conditions and projects fit its circumstances.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is the difference between economic growth and economic development?', 'Growth is a rise in real GDP. Development is a rise in the quality of people\'s lives — health, education, income shared widely — which growth can help pay for but does not guarantee.'),
  fc('Name the three components of the HDI and their indicators.', 'Health: life expectancy at birth. Education: mean and expected years of schooling. Income: GNI per head at purchasing power parity.'),
  fc('How is a dimension index calculated for the HDI?', '(Actual − minimum goalpost) ÷ (maximum − minimum). For health the goalposts are 20 and 85 years.'),
  fc('How are the three HDI indices combined?', 'By a geometric mean: the cube root of their product. A very weak dimension pulls the index down more than an arithmetic mean would.'),
  fc('Give two advantages of the HDI for comparing living standards.', 'It goes beyond income, and it puts every country on the same 0-to-1 scale that can be tracked over time.'),
  fc('Give three limitations of the HDI.', 'It is an average that hides inequality; it leaves out freedom, safety and the quality of schooling; its data are weakest in the poorest countries.'),
  fc('Name the six other measures of development in the specification.', 'Adult male labour in agriculture; access to clean water; energy consumption per capita; internet, mobile phones and doctors per thousand of population.'),
  fc('What does a high share of adult male labour in agriculture suggest?', 'The economy has not shifted far from farming into industry and services, where output per worker is higher.'),
  fc('Why is commodity price volatility a constraint?', 'Export earnings, tax revenue and incomes swing with world prices, so investment is postponed and planning is hard.'),
  fc('How do you estimate the fall in export earnings from a commodity price fall?', 'Multiply the commodity\'s share of export earnings by the fall in its price: 60% × 25% = 15%.'),
  fc('State the Prebisch-Singer hypothesis.', 'Over the long run the prices of primary products tend to fall relative to manufactures, so primary exporters\' terms of trade decline.'),
  fc('Why might primary product prices fall relative to manufactures?', 'Demand for primary products is income inelastic, and manufacturers turn productivity gains into profits and wages rather than lower prices.'),
  fc('State the Harrod-Domar growth equation.', 'Growth rate = savings ratio ÷ capital-output ratio. Saving 12% with a ratio of 4 gives 3% growth.'),
  fc('What is the savings gap?', 'The saving needed for a target growth rate minus actual saving. Growth of 6% at a ratio of 4 needs 24%; saving 12% leaves a gap of 12 points.'),
  fc('Give two criticisms of the Harrod-Domar model.', 'It assumes a fixed capital-output ratio, and that savings are invested productively; capital without skills or lost to corruption adds little output.'),
  fc('What is the foreign currency gap?', 'The shortfall between the foreign currency a growth plan needs for imports and debt payments and what the country earns from exports.'),
  fc('What is capital flight and why does it constrain growth?', 'Residents moving their money abroad. It drains domestic savings and foreign currency, widening both gaps.'),
  fc('How is the dependency ratio calculated?', '(People under 15 + people over 64) ÷ people of working age × 100.'),
  fc('How does a high dependency ratio constrain development?', 'Each worker supports more dependants, so less is saved, and public money goes on school places rather than investment.'),
  fc('Distinguish household debt from overseas debt.', 'Household debt is what families owe, often to moneylenders. Overseas debt is what a country owes abroad and must service in foreign currency.'),
  fc('Why does a lack of access to credit and banking constrain growth?', 'Savings sit idle as cash or livestock, and small firms with no collateral cannot borrow to invest.'),
  fc('How does poor infrastructure constrain growth?', 'Unreliable power, poor roads and congested ports raise every firm\'s costs, cut people off from markets and deter FDI.'),
  fc('Distinguish corruption from poor governance.', 'Corruption is abuse of public office for private gain. Poor governance is the state failing to provide reliable rules, courts and policy.'),
  fc('How does a civil war appear on a production possibility frontier?', 'As an inward shift: capital is destroyed and workers are killed or flee, so less of everything can be produced.'),
  fc('Give one cost and one benefit of emigration for a developing country.', 'Cost: skilled workers lost (brain drain). Benefit: remittances sent home in foreign currency.'),
  fc('Name the six market-orientated strategies in the specification.', 'Trade liberalisation, promotion of FDI, removal of government subsidies, privatisation, floating exchange rate systems, microfinance schemes.'),
  fc('How does FDI affect growth in the Harrod-Domar model?', 'It adds foreign savings to domestic saving. Saving 12% plus FDI of 6% raises investment to 18% and growth from 3% to 4.5% at a ratio of 4.'),
  fc('Give one argument for and one against removing a fuel subsidy.', 'For: it frees government revenue for health and schools. Against: transport and food costs rise sharply for the poor.'),
  fc('How does microfinance lend without collateral?', 'Through groups whose members guarantee each other\'s repayment.'),
  fc('Name the six interventionist strategies in the specification.', 'Development of human capital, protectionism, managed exchange rates, infrastructure development, promoting joint ventures with TNCs, buffer stock schemes.'),
  fc('What is the infant industry argument?', 'A new industry has high costs until it grows and learns, so it needs temporary protection from established foreign rivals.'),
  fc('How does a buffer stock scheme work?', 'An agency buys the commodity when its price falls to a floor and sells from store when it rises to a ceiling.'),
  fc('Why do buffer stock schemes often fail?', 'A floor set too high means the agency keeps buying until its money runs out; perishable goods cannot be stored.'),
  fc('What is a joint venture with a TNC?', 'A foreign firm producing in partnership with a local firm or the state, sharing ownership, profits and decisions.'),
  fc('Name the other strategies listed in 3c.', 'Industrialisation (the Lewis model), development of tourism, development of primary industries, debt relief and aid.'),
  fc('Summarise the Lewis dual-sector model.', 'Surplus labour moves from traditional farming to a modern sector at a wage just above farm incomes; reinvested profits create more jobs until the turning point.'),
  fc('What is the Lewis turning point?', 'The point at which surplus labour is used up, so the modern sector must raise wages to attract more workers.'),
  fc('What are tourism leakages?', 'Tourist spending that goes to foreign owners and suppliers — foreign hotel chains, airlines, imported food — rather than staying in the host economy.'),
  fc('What is tied aid?', 'Aid that must be spent on goods and services from the donor country.'),
  fc('What does debt relief free up?', 'The foreign currency and tax revenue that servicing overseas debt used to absorb.'),
  fc('What is the role of the World Bank?', 'To lend for long-term development — infrastructure, schools, health — with grants and very cheap loans to the poorest countries.'),
  fc('What is the role of the IMF?', 'To keep the international monetary system stable, lending short-term with conditions to countries in balance of payments crises.'),
  fc('What are NGOs and what is their role?', 'Independent non-profit organisations that deliver aid and services directly to communities and campaign for change.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Treating growth and development as the same thing',
    '"Real GDP rose 6%, so the country has developed."',
    'A rise in output says nothing about who received it or whether lives got longer and healthier. If the gains go to a few, output rises while development barely moves.',
    'Say what happened to health, schooling and the spread of income as well as to output, and use the HDI or another indicator to show it.'),

  mk('Calling the HDI\'s third dimension "wealth"',
    '"The HDI measures health, education and wealth."',
    'The third dimension is income: GNI per head at purchasing power parity, on a log scale. Wealth is a stock of assets and is not in the index.',
    'Name all three indicators: life expectancy at birth; mean and expected years of schooling; GNI per head at PPP.'),

  mk('Listing HDI limitations without tying them to the comparison',
    '"The HDI ignores inequality, freedom and the environment."',
    'A list is description. The question asks how well the HDI compares living standards, so each limitation needs a consequence for that comparison.',
    'Say which comparison the limitation distorts — between countries, the averaging and the data; over time, changes in the method — and how.'),

  mk('Multiplying instead of dividing in Harrod-Domar',
    '"Saving 20% with a capital-output ratio of 5 gives growth of 100%."',
    'The model divides: growth is the savings ratio over the capital-output ratio, so 20 ÷ 5 = 4%. A higher capital-output ratio means capital is less productive, which lowers growth.',
    'Write g = s ÷ k before substituting, and check that a larger capital-output ratio gives a smaller growth rate.'),

  mk('Confusing the savings gap with the foreign currency gap',
    '"The country lacks money for investment, which is the foreign currency gap."',
    'The savings gap is too little saving at home; the foreign currency gap is too little foreign currency for imports. A country can have enough of one and too little of the other.',
    'Name which gap, and the import or the investment it blocks. Say which source — FDI, aid, borrowing or exports — would fill it.'),

  mk('Evaluating a strategy without naming the constraint it addresses',
    '"Microfinance is good because it helps the poor."',
    'Every strategy in 3a-3d answers one or more constraints in 2a-2b. Without the link, the answer cannot say when the strategy will work.',
    'Pair each strategy with its constraint — microfinance with access to credit, FDI with the savings gap — then judge whether it fits the country in the question.'),

  mk('Confusing the World Bank with the IMF',
    '"The World Bank lends to countries in a currency crisis."',
    'Crisis lending to countries that cannot pay for their imports is the IMF\'s role. The World Bank finances long-term development projects.',
    'World Bank: long-term projects. IMF: short-term balance of payments support with conditions. NGOs: local delivery.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

/*
 * `ExtrasTab.jsx` maps `chain.steps`, so every chain has `steps` and a `title`, and every evaluation
 * frame a `content` string (V028, packet 28). The one environmental-cost card is topFix-04's
 * "short evaluation card": environmental costs of growth are 2.3.5's leaf (econ_spec.txt:1117), so
 * the card points there rather than teaching sustainability, which the specification never names.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a copper price fall to slower growth',
      steps: [
        `The world copper price falls ${pct(E.copperFall)}. Copper is ${pct(E.copperShare * 100)} of ${E.country}'s export earnings.`,
        `Export earnings fall by ${pct(E.copperShare * 100)} × ${pct(E.copperFall)} = ${pct(E.exportFallPct)}: ${bn(E.exportFallBn)} of ${bn(E.exports)}.`,
        `With less foreign currency, the foreign currency gap of ${bn(E.fxGap)} widens.`,
        'Tax revenue from the mines falls, and the government postpones roads and schools.',
        'Firms cannot import the machinery they planned to buy, so investment and growth fall.',
      ],
      result: 'A commodity price fall hits growth through export earnings, tax revenue and foreign currency at once — which is why volatility of commodity prices is the first economic constraint the specification lists.',
    },
    {
      title: 'The Harrod-Domar savings gap, in figures',
      steps: [
        `${E.country} saves ${pct(E.s)} of GDP; its capital-output ratio is ${E.k}.`,
        `Growth = ${E.s} ÷ ${E.k} = ${pct(E.g)}. Population grows ${pct(E.popGrowth)}, so income per head rises about ${pct(E.perHead)}.`,
        `A target of ${pct(E.gTarget)} needs saving of ${E.gTarget} × ${E.k} = ${pct(E.sNeeded)}: a gap of ${E.savingsGap} points, ${bn(E.savingsGapBn)} a year.`,
        `FDI of ${pct(E.fdi)} raises growth to ${pct(E.gWithFdi)}; aid of ${pct(E.aid)}, invested, to ${pct(E.gWithAid)}.`,
        `Capital flight of ${pct(E.flightPct)} of GDP costs ${E.flightGrowthLost} points of growth a year.`,
      ],
      result: 'The model turns every constraint and strategy on saving and investment into a growth figure. Its weakness is the assumption that the capital-output ratio stays fixed — capital without skills, infrastructure or honest management is far less productive.',
    },
    {
      title: 'The Lewis process, stage by stage',
      steps: [
        'Traditional farming holds surplus labour: workers whose extra output is close to zero.',
        `The modern sector offers ${'$'}${E.modernWage} a day against ${'$'}${E.subsistence} on the farm, and workers migrate.`,
        'Its profits are high; reinvested, they add capital and create more jobs at the same wage.',
        `Employment grows from ${E.lewisJobs[0]} to ${E.lewisJobs[E.lewisJobs.length - 1]} million as the process repeats.`,
        `At ${E.turningPoint} million the surplus is gone: the turning point, after which wages rise.`,
      ],
      result: 'The model makes development a structural change — labour moving from low- to high-productivity work. Whether it happens depends on reinvested profits, labour-intensive industry and jobs arriving as fast as migrants.',
    },
    {
      title: 'A buffer stock through a good and a bad year',
      steps: [
        `The band for coffee is ${'$'}${E.floor.toFixed(2)} to ${'$'}${E.ceiling.toFixed(2)} a kilogram.`,
        `A bumper harvest of ${E.qGood} thousand tonnes would push the price to ${'$'}${E.pGood.toFixed(2)}.`,
        `The agency buys ${E.buyGood} thousand tonnes, holding the price at ${'$'}${E.floor.toFixed(2)}.`,
        `A poor harvest of ${E.qPoor} thousand tonnes would push it to ${'$'}${E.pPoor.toFixed(2)}.`,
        `The agency sells ${E.sellPoor} thousand tonnes from store, holding it at ${'$'}${E.ceiling.toFixed(2)}.`,
      ],
      result: 'Farm incomes are steadier than the harvests. The scheme lasts only while good years and bad years roughly balance; a run of bumper harvests leaves the agency buying until its money runs out.',
    },
  ],
  evaluation: [
    {
      title: 'Market-orientated or interventionist?',
      content: 'Neither list wins in general, and an answer that declares one correct has missed the point. **Each strategy answers a constraint, and each needs conditions to work.** Market-orientated strategies raise efficiency and draw in foreign savings where markets function; interventionist strategies fill gaps where markets are missing, but need money, reserves and capable, honest administration. The strongest judgements name the constraint that binds hardest in the country in question — savings, foreign currency, skills, infrastructure or governance — and choose the strategy that relaxes it.',
    },
    {
      title: 'Does the source of growth matter for development?',
      content: 'Growth from a mine and growth from schools and small firms can raise GDP by the same amount and change lives very differently. **Ask who receives the income, what it is spent on, and whether it lasts.** Growth concentrated in a capital-intensive sector with few jobs may leave health and schooling unchanged; growth that raises output per worker across many people usually improves them. Growth can also carry environmental costs — pollution, lost forests, degraded land — which are a cost of economic growth in topic 2.3.5 and a reason to weigh how growth is achieved, not only how fast.',
    },
    {
      title: 'Aid, debt relief and the institutions: help or dependency?',
      content: 'The evidence depends on the type of help. **Humanitarian aid and health programmes have clear effects; large transfers to weak governments have much weaker ones.** Debt relief frees foreign currency and revenue but can reward overborrowing; IMF loans restore stability at the cost of conditions that can cut health and education spending; NGOs reach the poorest but at small scale. A strong evaluation asks what the money is spent on, who controls it, and whether it builds the capacity to grow without it.',
    },
  ],
};
