/**
 * PACKET 16 — meeting-customer-needs: quiz, practice, flashcards, common mistakes, extras.
 *
 * Quiz: 32 items, every one on material the Learn Mode body now teaches, 29 reachable through a block's
 * quizIndices and exactly three left unpinned, because PreTest.jsx takes the first three unreserved items
 * in array order (packet 15's rule). Four March duplicates go — q10 of q0, q12 of q5, q15 of q9, q18 of
 * q4 (topFix-05) — and the two ambiguous items are rewritten rather than deleted: q3's stem could not
 * separate quota from stratified because the discriminator (random selection INSIDE the subgroup) was
 * absent from it (quiz-01), and q16 asked for "quantitative" from a stem with no number in it (quiz-02).
 * The two essay-command stems, "To what extent…" and "Evaluate the claim…", become practice questions'
 * territory and are replaced by items an MCQ can actually mark.
 *
 * Practice: IAL BUSINESS command words and their own tariffs from Appendix 6 — Define 2, Calculate 4,
 * Construct 4, Explain 4, Analyse 6, Discuss 8, Assess 10 (Units 1-2), Evaluate 20. There is no Outline
 * in IAL Business and no Examine (that is Economics), so the March Outline (4) is re-commanded, and
 * Define (4) and Explain (6) carried tariffs the subject does not use. All five March ids are kept.
 * Guidance above 6 marks is levels-shaped and allocates no points. The tariffs rise across the section —
 * 2, 4, 4, 6, 8, 4, 10, 20 — which is the difficulty ramp structure-12 asked for.
 */
import { id, PRICE, INPUT_COST, MARKET_LAST, MARKET_NOW, ZURI_SALES, POPULATION, SURVEY_N, growthPct, sharePct, valueAdded, likelyBuyers, weeklyRevenue, BRANDS, GAP } from './_packet16-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet16-content.mjs';

// One money format for the whole section, so $108,000 is never $108000 on one surface and
// $108,000 on another (packet 16's Layer 6 caught exactly that).
const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation, keptId?]
const Q = [
  /* ══ unpinned: the pre-test, FIRST in array order ══════════════════════════
   * PreTest.jsx takes the first three items no block has reserved, in array order (F079), so these
   * three ARE the pre-test. They sit FIRST rather than last because of what packet 16's walkthrough
   * found: GET /api/sections/[id] serves a signed-out or free student only PREVIEW_LIMITS.quiz
   * items (F086) — and that is most of the funnel. With the unpinned items at the END of a 37-item
   * array, the two a free student received were both PINNED ones, so the pre-test asked a question
   * the chapter-1 check-in asked again minutes later: exactly the defect F079 removed for Pro
   * students and left in place for everyone else. First in the array, the free student's slice is
   * drawn from the pre-test's own pool.
   *
   * One item from the market, one from research and one from positioning, so the three represent
   * the whole section, and none of them is a question a block shows again.
   */
  [null, 'Which of the following best describes a niche market?',
    ['A market serving the widest possible range of customers', 'A small, clearly defined segment with particular needs', 'A market in which only one firm is permitted to sell', 'A market in which the government sets the price'], 1,
    'A niche is a small, clearly defined segment inside a larger market whose particular needs the standardised product does not meet. A single permitted seller is a monopoly, which is a different idea.',
    'meeting-customer-needs:quiz:1ece65fa'],
  [null, 'Which type of market research collects new, first-hand data?',
    ['Secondary research', 'Desk research', 'Primary research', 'Published research'], 2,
    'Primary research gathers original data directly, through surveys, interviews, focus groups or product trials. Secondary, desk and published research all reuse data somebody else has already collected.',
    'meeting-customer-needs:quiz:402eedd2'],
  [null, 'Adding value to a product means:',
    ['Raising the selling price of the product', 'Reducing the cost of producing the product', 'Increasing what the customer will pay above the input cost', 'Expanding the product into a new market'], 2,
    'Adding value raises what the customer is willing to pay above the cost of bought-in inputs, through branding, design, convenience or service. Raising the price on its own changes nothing the customer values.',
    'meeting-customer-needs:quiz:f73b8424'],
  /* ══ Block 1 ══ */
  [B1, 'Which of these is a characteristic of a mass market?',
    ['A standardised product sold to the widest possible range of customers', 'A specialised product designed for one group of customers', 'A product sold only through specialist retailers', 'A product with a very high profit margin on each unit'], 0,
    'A mass market is served by one standardised product aimed at everybody. The other three describe a niche: specialised, narrowly distributed and sold at a wide margin on low volume.'],
  [B1, 'Why can a mass-market producer usually charge a lower price than a niche producer?',
    ['Its customers are less interested in quality', 'Its fixed costs are spread over a much larger output', 'It pays its suppliers later than a niche producer does', 'It spends nothing on advertising its products'], 1,
    'High volume spreads design, machinery and advertising costs over far more units, so average cost per unit falls and a lower price still covers costs. Mass-market firms typically advertise more, not less.',
    'meeting-customer-needs:quiz:88cf6b0d'],
  [B1, `The chilled-juice market was worth ${money(MARKET_LAST)} million last year and ${money(MARKET_NOW)} million this year. What was market growth?`,
    ['20%', '8%', '25%', '80%'], 2,
    `Market growth = (new size − old size) ÷ old size × 100 = (${MARKET_NOW} − ${MARKET_LAST}) ÷ ${MARKET_LAST} × 100 = ${growthPct()}%. Dividing by the new size instead gives 20%, and ${MARKET_NOW} − ${MARKET_LAST} = 8 is the change in dollars, not the percentage.`],
  [B1, `Zuri Juice sold ${money(ZURI_SALES)} million in a chilled-juice market worth ${money(MARKET_NOW)} million. What is Zuri's market share?`,
    ['6%', '40%', '24%', '15%'], 3,
    `Market share = firm's sales ÷ total market sales × 100 = ${ZURI_SALES} ÷ ${MARKET_NOW} × 100 = ${sharePct()}%. The sales figure and the market figure are dollar amounts, not percentages, so neither is the answer on its own.`],
  [B1, 'A firm\'s sales rise by 10% while its market grows by 25%. What has happened to its market share?',
    ['It has fallen, because the market grew faster', 'It has risen, because sales are higher', 'It is unchanged, because both figures rose', 'It cannot be worked out from this information'], 0,
    'Share is the firm\'s sales as a proportion of the market. If the market grows faster than the firm, the firm holds a smaller slice of a bigger cake, so share falls even though sales rose.'],
  [B1, 'How does strong brand loyalty most directly help a firm\'s pricing?',
    ['It reduces the cost of the materials the firm buys in', 'It guarantees that the firm will never lose customers', 'It forces competitors to raise their prices too', 'It makes demand less sensitive to price, so a rise loses fewer customers'], 3,
    'Loyal customers stop comparing alternatives, so demand becomes less price-sensitive and a price rise costs the firm less volume than it would an unbranded rival. Branding affects demand, not the cost of inputs.'],

  /* ══ Block 2 ══ */
  [B2, 'Which of these best describes a dynamic market?',
    ['A market subject to rapid and continuous change', 'A market in which total sales are rising each year', 'A market with a large number of competing firms', 'A market in which prices are set by a regulator'], 0,
    'Dynamic means changing rapidly and continuously, in any direction — a market can be dynamic while it shrinks or fragments. Growth is one kind of change, not the definition.',
    'meeting-customer-needs:quiz:650cb1d8'],
  [B2, 'A market shifts towards online selling. What is the most likely immediate effect on new firms?',
    ['Entry becomes harder because websites are expensive to run', 'Entry becomes easier because a shop lease is no longer needed', 'Entry is unaffected because customers buy the same products', 'Entry becomes impossible without an established brand'], 1,
    'Online selling replaces a large fixed cost — premises — with a much smaller one, so entering becomes cheaper and new sellers appear. Established brands make entry harder, but they do not make it impossible.'],
  [B2, 'A cheaper, simpler version of a product brings in customers who previously could not afford it. This is an example of:',
    ['A firm gaining share from its direct competitors', 'A market becoming less dynamic over time', 'A firm differentiating its product from rivals', 'Innovation causing the market itself to grow'], 3,
    'The number of customers in the market has risen, so the market is larger than before. Gaining share is taking customers from rivals within a market of the same size, which is a different mechanism.'],
  [B2, 'What is the key difference between risk and uncertainty?',
    ['Risk affects small firms and uncertainty affects large ones', 'Risk always has negative outcomes and uncertainty does not', 'Risk has outcomes that can be listed and given probabilities', 'Risk applies to costs and uncertainty applies to revenues'], 2,
    'Risk describes a situation where the possible outcomes are known and odds can be attached, so it can be planned for or insured. With uncertainty the outcomes cannot be listed at all. Both affect firms of any size.',
    'meeting-customer-needs:quiz:43a4fd68'],
  [B2, 'Which of these is best described as uncertainty rather than risk for a juice maker?',
    ['Fruit prices varying with each year\'s harvest', 'A new flavour selling less well than forecast', 'A delivery van needing repair during the year', 'A new law banning the type of bottle it uses'], 3,
    'A change in the law is not an unlikely event with known odds; it is an outcome nobody could list in advance. The other three recur, so past data supports a probability and the firm can plan or insure for them.'],
  [B2, 'Which of these is most likely to keep competition in a market weak over the long run?',
    ['A patent held by one of the firms in the market', 'Products that customers regard as very similar', 'A large number of firms already selling there', 'Prices that customers can compare online easily'], 0,
    'A patent legally prevents rivals copying, so new firms cannot enter with the same product and the level of competition stays low. Similar products, many firms and transparent prices all intensify competition rather than restraining it.'],

  /* ══ Block 3 ══ */
  [B3, 'What makes a piece of data primary rather than secondary?',
    ['It contains numbers rather than opinions', 'It was collected by or for this business for its own question', 'It was collected more recently than one year ago', 'It came from customers rather than from competitors'], 1,
    'Primary and secondary is about origin: who collected it and why. Whether it is numbers or opinions is the separate quantitative-qualitative distinction, and age does not change which category data falls into.',
    'meeting-customer-needs:quiz:b64a1844'],
  [B3, 'A business reads a published industry report to estimate the size of its market. This is:',
    ['Primary quantitative research', 'Primary qualitative research', 'Secondary qualitative research', 'Secondary quantitative research'], 3,
    'The report was written by somebody else for their own purpose, so it is secondary, and market size is a number, so it is quantitative. Both dimensions have to be read separately from the stem.',
    'meeting-customer-needs:quiz:ac7d7840'],
  [B3, 'A firm runs a focus group to find out why shoppers choose a rival\'s bottle. The data collected is:',
    ['Primary and qualitative', 'Primary and quantitative', 'Secondary and qualitative', 'Secondary and quantitative'], 0,
    'The firm commissioned the group itself, so the data is primary, and reasons expressed in customers\' own words are qualitative. A focus group is a small discussion, so it cannot produce a reliable percentage.',
    'meeting-customer-needs:quiz:216aa499'],
  [B3, `A survey of ${SURVEY_N} shoppers finds 18% would buy a bottle weekly at ${money(PRICE)}. The target market holds ${POPULATION.toLocaleString('en-GB')} shoppers. How many weekly buyers does this suggest?`,
    ['108', '9,000', '90,000', '500,000'], 2,
    `Apply the proportion to the population: ${POPULATION.toLocaleString('en-GB')} × 0.18 = ${likelyBuyers().toLocaleString('en-GB')} weekly buyers. ${money(weeklyRevenue())} is the weekly revenue that follows once buyers are multiplied by price, and ${POPULATION.toLocaleString('en-GB')} is the whole population, not the buyers in it.`,
    'meeting-customer-needs:quiz:223b9183'],
  [B3, 'Why should a demand figure scaled up from a survey be treated as an upper estimate?',
    ['Because surveys are always carried out on the wrong people', 'Because percentages cannot be applied to a population', 'Because people buy more than they say they will', 'Because stated intention overstates what people actually buy'], 3,
    'People overstate willingness to buy when nothing is at stake, so scaled intention exceeds realised sales. Scaling a proportion to a population is the correct method; the caution is about the proportion, not the arithmetic.'],
  [B3, 'Which use of market research is a firm making when it studies how shoppers decide between two bottles on a shelf?',
    ['Gaining insight into consumer behaviour', 'Quantifying likely demand for a product', 'Identifying the size of the total market', 'Anticipating a change in the law'], 0,
    'Studying how a choice is made is insight into consumer behaviour, the third use the specification names. Quantifying demand would require a number of likely buyers, which watching a shelf does not give.'],

  /* ══ Block 4 ══ */
  [B4, 'Which primary research method measures what customers actually did rather than what they say they would do?',
    ['A product trial in a limited area', 'A questionnaire sent to a large sample', 'A focus group discussing the product', 'A telephone interview with regular buyers'], 0,
    'In a product trial customers pay real money, so the firm records actual and repeat purchases. The other three record stated intention or opinion, which is why scaled survey figures need discounting.'],
  [B4, 'A firm wants to know why customers stopped buying its drink. Which method suits it best?',
    ['A questionnaire asking customers to rate the drink out of ten', 'A count of weekly sales taken from its own till data', 'A published report on the size of the drinks market', 'Focus groups exploring what changed for former customers'], 3,
    'The question is a "why", which needs qualitative depth in customers\' own words. A rating and a sales count measure the fall without explaining it, and a market report describes the market rather than these customers.',
    'meeting-customer-needs:quiz:7a335778'],
  [B4, 'A firm reads competitors\' websites, trade-press articles and government trade data before entering a market. This is:',
    ['Primary research, because the firm did the reading itself', 'Secondary research, because others collected the data', 'Primary research, because the data is about competitors', 'Secondary research, because the data is all quantitative'], 1,
    'All three sources were produced by somebody else for their own purposes, which makes the data secondary however the firm uses it. Who did the reading and whether the data is numerical are both irrelevant to the category.',
    'meeting-customer-needs:quiz:9f72813d'],
  [B4, 'Which sampling method divides the population into subgroups and then selects at random within each one?',
    ['Random sampling', 'Quota sampling', 'Stratified sampling', 'Convenience sampling'], 2,
    'Stratified sampling divides into subgroups and then selects at random inside each. Quota sampling also uses subgroups and proportionate targets, but fills them with whoever is available, so the selection inside the group is not random.',
    'meeting-customer-needs:quiz:b2defef3'],
  [B4, 'An interviewer is told to question 40 shoppers aged under 30 and 60 aged over 30, choosing whoever passes. This is:',
    ['Stratified sampling, because targets are proportionate', 'Random sampling, because shoppers pass unpredictably', 'Convenience sampling, because the interviewer stands in one place', 'Quota sampling, because the targets are filled by availability'], 3,
    'Targets per subgroup filled with whoever is available is quota sampling. It is not random: which shoppers get asked depends on the interviewer\'s choices, which is exactly what distinguishes it from stratified sampling.'],
  [B4, 'A firm surveys 10,000 people but recruits all of them outside one shopping centre. The main weakness of this research is:',
    ['The sample is too small to be reliable', 'The sample is biased towards one type of shopper', 'Quantitative data cannot answer questions about opinions', 'Secondary data would have been cheaper to collect'], 1,
    'Everyone excluded by the recruitment channel is excluded from the result, so the sample misrepresents the population however large it is. Size narrows random error; it does nothing about bias.'],

  /* ══ Block 5 ══ */
  [B5, 'A firm develops a new drink because its laboratory perfected the formula, then looks for customers. This is:',
    ['Market orientation', 'Product orientation', 'Market segmentation', 'Product differentiation'], 1,
    'The starting point is the firm\'s own capability and the customer is sought afterwards, which is product orientation. A market-oriented firm would have researched what customers wanted before developing the formula.',
    'meeting-customer-needs:quiz:645de10d'],
  [B5, 'Which market is product orientation most likely to suit?',
    ['A market where customers can describe exactly what they want', 'A market where the product changes very little over time', 'A market driven by technology customers do not yet know about', 'A market where the cheapest producer always wins'], 2,
    'Where the product does not exist yet, customers cannot specify it, so research reports only on what they already know. Markets where customers can articulate their wants reward market orientation instead.',
    'meeting-customer-needs:quiz:3632e8d7'],
  [B5, 'What does a market map show a business?',
    ['The positions of competing products on two variables', 'The total value of sales in the market', 'The profit margin each competitor earns', 'The future growth rate of the market'], 0,
    'A market map plots rivals against two variables customers choose by, showing positioning and revealing gaps. It says nothing about market value, margins or future growth, which need other sources.',
    'meeting-customer-needs:quiz:07dc69f1'],
  [B5, `On Zuri's map, Halo sells ${BRANDS[4].juice}% juice at ${money(BRANDS[4].price)} and Zuri sells ${BRANDS[2].juice}% at ${money(BRANDS[2].price)}. Nobody sells ${GAP.juice}% at ${money(GAP.price)}. What does that empty position tell Zuri?`,
    ['That customers definitely want a high-juice drink at that price', 'That no competitor currently occupies that position', 'That a high-juice drink cannot be made at that price', 'That the market is too small to be worth entering'], 1,
    'A gap shows only that no rival is there. Whether customers want it, and whether it can be produced at that price, are separate questions that research into demand and into costs has to answer.'],

  /* ══ Block 6 ══ */
  [B6, 'Which of these is a behavioural base for market segmentation?',
    ['The age and income of the customer', 'The region the customer lives in', 'The customer\'s lifestyle and values', 'How often the customer buys the product'], 3,
    'Purchase frequency is something the customer does, which is what behavioural segmentation records. Age and income are demographic, region is geographic, and lifestyle and values are psychographic.',
    'meeting-customer-needs:quiz:7234296b'],
  [B6, 'What is the difference between segmentation and targeting?',
    ['Segmentation divides the market; targeting chooses which group to serve', 'Segmentation chooses a group; targeting advertises to it', 'Segmentation is for niche markets; targeting is for mass markets', 'Segmentation uses research; targeting uses judgement alone'], 0,
    'Segmentation is the analysis that identifies distinct groups. Targeting is the decision that follows about which of them to serve, and positioning then decides how the product is presented to the group chosen.'],
  [B6, 'Which competitive advantage would be hardest for a rival to copy?',
    ['A 10% cut in the selling price', 'A redesigned label on the bottle', 'A free gift given away with each purchase', 'An exclusive contract with the only local grower'], 3,
    'An exclusive supply contract cannot be matched while it runs, so the advantage lasts. A price cut, a label and a promotion can all be copied within a single production run, which is why they win customers only briefly.'],
  [B6, 'What is the purpose of product differentiation?',
    ['To reduce the cost of producing each unit', 'To make the product less substitutable for a rival\'s', 'To increase the size of the total market', 'To divide customers into distinct groups'], 1,
    'Differentiation stops customers treating the product as interchangeable with a rival\'s, so demand becomes less price-sensitive and the firm gains room on price. Dividing customers into groups is segmentation.',
    'meeting-customer-needs:quiz:50eda97f'],
  [B6, `Zuri's bought-in inputs cost ${money(INPUT_COST)} a bottle and the bottle sells for ${money(PRICE)}. What is the value added per bottle?`,
    [money(PRICE), money(INPUT_COST), money(valueAdded()), '$1.65'], 2,
    `Value added = selling price − cost of bought-in materials = ${money(PRICE)} − ${money(INPUT_COST)} = ${money(valueAdded())} per bottle. Adding the two figures instead gives $1.65, and neither figure on its own is the difference between them.`],
  [B6, 'Why is the value added on a product not the same as the profit on it?',
    ['Value added must still cover wages, rent, energy and marketing', 'Value added is measured before tax and profit after it', 'Value added counts only the branding, not the materials', 'Value added is calculated for the market, not for one firm'], 0,
    'Value added is price minus bought-in materials only. Every other cost the firm bears comes out of it, and profit is what remains afterwards, which is why the two figures are never equal.'],

];

export const QUIZ = Q.map(([block, question, options, correctIndex, explanation, keptId]) => ({
  id: keptId || id('quiz', question), block, question, options, correctIndex, explanation,
}));

/* ── practice ──────────────────────────────────────────────────────────────── */
// [block, command, marks, question, guidance]. Tariffs are the subject's own (WBS11 Appendix 6);
// above 6 marks the guidance is levels-shaped and allocates no points. The reasoning tariff rises
// across the section — 2, 4, 4 · 6 · 8 · 10 · 20 — with the Construct in block 5 as a drawing skill
// rather than a step up in difficulty. That ramp is what structure-12 asked for.
const P = [
  [B1, 'Define', 2, 'Define the term \'niche market\'. (2 marks)',
    'Both halves are needed: a small, clearly defined segment of a larger market, serving customers whose particular needs the mass-market product does not meet. "A small market" is half a definition: it gives the size and not the unmet need. An example is application and belongs in a 4-mark Explain, not here — the command is Define, and Define is 2 marks in IAL Business (WBS11 Appendix 6).',
    'meeting-customer-needs:practice:98b42c70'],
  [B1, 'Explain', 4, 'Explain one benefit to a business of operating in a niche market. (4 marks)',
    'One benefit, developed, not two asserted. Knowledge: a niche is a small segment with particular needs the mass-market product does not meet. Application: name the benefit — less direct competition, or a premium price, or strong customer loyalty — and attach it to a business. Analysis: take it two steps. Less direct competition means fewer close substitutes, so the customer has nowhere obvious to switch, so the firm can hold a higher price without losing volume, so the margin on each unit is wider. A candidate who names three benefits and develops none has written a list, and the command Explain asks for a chain (WBS11 Appendix 6).',
    'meeting-customer-needs:practice:b455326f'],
  [B1, 'Calculate', 4, `The chilled-juice market was worth ${money(MARKET_LAST)} million last year and ${money(MARKET_NOW)} million this year. Zuri Juice sold ${money(ZURI_SALES)} million this year. Calculate Zuri's market share and the market's growth rate. (4 marks)`,
    `Show both formulas, both substitutions and both answers with a percentage sign. Market share = firm's sales ÷ total market sales × 100 = ${ZURI_SALES} ÷ ${MARKET_NOW} × 100 = ${sharePct()}%. Market growth = (new size − old size) ÷ old size × 100 = (${MARKET_NOW} − ${MARKET_LAST}) ÷ ${MARKET_LAST} × 100 = ${growthPct()}%. Two errors are common and both are avoidable: dividing the change by the NEW size instead of the old one, which gives 20%, and dividing Zuri's sales by last year's market, which mixes two periods. Show the workings: Appendix 6 says workings should be given for a Calculate.`],

  [B2, 'Analyse', 6, 'Analyse one way in which the growth of online retailing has affected competition in a market you have studied. (6 marks)',
    'One chain, followed through, with the market named. Knowledge: online retailing means selling directly to customers over the internet rather than through a shop. Application: name the market and the change in it. Analysis: build the links in order — selling online removes the need for premises, so the fixed cost of entering falls, so new sellers can enter with less capital, so the number of rivals rises and customers can compare every price in seconds, so established firms must either cut price or give customers a visible reason to pay more. Analyse is a chain of reasoning and explicitly does not include evaluation (WBS11 Appendix 6), so a judgement about whether this is good or bad is not what the question asked for; the links are.',
    'meeting-customer-needs:practice:0eb9b618'],

  [B3, 'Discuss', 8, `Zuri Juice surveyed ${SURVEY_N} shoppers and 18% said they would buy a high-juice bottle weekly at ${money(PRICE)}. Its target market holds ${POPULATION.toLocaleString('en-GB')} shoppers. Discuss the usefulness of this research in estimating likely demand. (8 marks)`,
    `Levels-marked: the assessment is brief but it must be there. Knowledge and application: show the scaling — ${POPULATION.toLocaleString('en-GB')} × 0.18 = ${likelyBuyers().toLocaleString('en-GB')} weekly buyers, and × ${money(PRICE)} = ${money(weeklyRevenue())} a week — and say what Zuri would use it for: how much to produce, how much stock to hold, whether the revenue covers the cost. Reasoning in context: the figure gives a scale that judgement alone cannot, and it was measured at one stated price, which is what makes it usable for this decision. Brief assessment, showing awareness of competing factors: stated intention overstates purchase, because nothing was at stake when the question was answered; ${SURVEY_N} responses carry a margin of error; the 18% was measured at ${money(PRICE)} and says nothing about another price; and the market may move before production starts. The judgement is the shape of the answer: the figure is a ceiling on demand rather than a forecast of it, and it is most useful as the upper end of a range Zuri plans against.`,
    'meeting-customer-needs:practice:8ed4a524'],

  [B4, 'Assess', 10, 'Zuri Juice has one month and a small budget before it decides whether to launch a new bottle. Assess the most appropriate method of primary research for it to use. (10 marks)',
    'Levels-marked, with a supported judgement at the end; a balanced answer that never decides cannot reach the top level. Knowledge and application: set out the realistic options against the two constraints in the stem — a survey, a focus group, interviews, a product trial — and say what each would produce for Zuri specifically. Reasoning: develop at least two. A survey is the only option that yields a percentage Zuri can scale to its market, it is cheap per response, and it measures intention rather than purchase. A product trial measures what customers actually did, including repeat purchase, and a month is too short for a meaningful trial and the trial itself costs stock. Competing factors: the budget rules out interviews at scale; a focus group would explain preferences richly but cannot size the opportunity; the month rules out anything sequential. Judgement: name one method, justify it against both constraints and the decision being taken, and say what its weakness means for how the result should be treated — for example, a survey chosen for speed and cost, with the answer discounted because it measures what people say.',
    'meeting-customer-needs:practice:b6acf450'],

  [B5, 'Construct', 4, `Construct a market map for the chilled-juice market using price and juice content as the two axes, plotting Tamu (${money(BRANDS[0].price)}, ${BRANDS[0].juice}%), Mkali (${money(BRANDS[1].price)}, ${BRANDS[1].juice}%), Zuri (${money(BRANDS[2].price)}, ${BRANDS[2].juice}%), Safi (${money(BRANDS[3].price)}, ${BRANDS[3].juice}%) and Halo (${money(BRANDS[4].price)}, ${BRANDS[4].juice}%), and mark one gap. (4 marks)`,
    `Label the horizontal axis "Price" and the vertical axis "Juice content", each with its direction — low to high — and a scale that covers the five points. Plot and name all five brands in the positions given; an unnamed point does not identify a competitor. Mark one empty position clearly and label it as a gap: the obvious one is high juice content at a middle price, around ${GAP.juice}% at ${money(GAP.price)}, where no brand sits. Construct is 4 marks and asks for an accurately labelled diagram (WBS11 Appendix 6): the labelling and the accuracy of the plotting are the answer, not commentary written beside it.`],

  [B6, 'Evaluate', 20, 'Evaluate whether adding value or charging a lower price is the better way for a business to build a competitive advantage. (20 marks)',
    `Levels-marked, and the conclusion must choose and say under what conditions; an answer that lists both sides and stops cannot reach the top levels. Knowledge and application: define competitive advantage as a reason customers choose this firm over rivals, define value added as selling price minus the cost of bought-in materials — ${money(PRICE)} − ${money(INPUT_COST)} = ${money(valueAdded())} on a bottle — and set out the two routes, differentiation and cost leadership. Reasoning, developed in chains: adding value through branding, design, convenience or service makes the product less substitutable, so demand becomes less price-sensitive, so the firm holds its price when a rival cuts, and the wider margin funds the next improvement. A lower price wins volume immediately, spreads fixed costs over more units and can deter entry. Competing factors: a price cut is the easiest thing in the market for a rival to copy, so it wins customers briefly and then stops working, and it is sustainable only where the firm's costs are genuinely lower rather than its margin merely thinner; adding value costs money before it earns any, needs the difference to be visible and valued by customers, and can be imitated in time as well. Judgement: decide, and make the decision conditional — on whether the firm has a genuine cost advantage, on whether its customers can see and will pay for the difference, and on how quickly rivals in this market copy. Say which condition matters most and why.`],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance, keptId]) => ({
  id: keptId || id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
// Cards are rewritten in place and never deleted while the concept survives: the ids are stable and
// progress rows point at them (the packet-13 rule). Twenty-three March cards keep theirs. THREE are
// dropped, because the March table shipped the same three chain cards twice — `d4f3b3f5` and
// `d4f3b3f5-2` carry identical fronts, and so do `c595009e` / `-2` and `5624639c` / `-2`. A duplicate
// pair is not a card a student can learn from; the `-2` copies go and the originals stay.
// Twelve new cards cover what this packet adds: market size, share and growth, brands, online
// retailing, innovation, the three uses of research, product trials, the four secondary sources, the
// three sampling methods, differentiation and the value-added arithmetic.
const kept = (cid, front, back) => ({ id: `meeting-customer-needs:card:${cid}`, front, back });
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  kept('3137d826', 'What is a mass market?', 'The <strong>largest segment</strong> of a market, served by a <strong>standardised product</strong> aimed at the widest possible range of customers. High volume, low margin, wide distribution, heavy competition.'),
  kept('d80ed71f', 'What is a niche market?', 'A <strong>small, clearly defined segment</strong> of a larger market whose particular needs the mass-market product does not meet. Low volume, high margin, specialised product, concentrated risk.'),
  card('How do you calculate market share?', '<strong>Market share (%) = firm\'s sales ÷ total market sales × 100.</strong> Zuri Juice: $6m ÷ $40m × 100 = <strong>15%</strong>. Both figures must cover the same period.'),
  card('How do you calculate market growth?', '<strong>Market growth (%) = (new market size − old market size) ÷ OLD market size × 100.</strong> The chilled-juice market: (40 − 32) ÷ 32 × 100 = <strong>25%</strong>. Dividing by the new size is the common error and gives 20%.'),
  card('A firm\'s sales rise 10% while its market grows 25%. What has happened to its share?', 'It has <strong>fallen</strong>. Share is the firm\'s sales as a proportion of the market, so a market growing faster than the firm leaves the firm with a smaller slice of a bigger cake.'),
  card('What is a brand, and what does brand loyalty do?', 'A brand is the <strong>reputation and set of associations a name carries</strong> — the logo only triggers it. Loyalty makes demand <strong>less price-sensitive</strong>, cuts the cost of winning the same customers back, and makes the market <strong>harder to enter</strong> for a name that means nothing yet.'),
  kept('254570c2', 'What is a dynamic market?', 'A market subject to <strong>rapid and continuous change</strong> in tastes, technology, competition or regulation. Change in <em>any</em> direction counts: shrinking and fragmenting are dynamic too.'),
  card('Name four ways online retailing changes a market.', '<strong>Entry costs fall</strong> (a website instead of a lease), <strong>reach widens</strong> (sell beyond one location), <strong>prices become transparent</strong> (customers compare in seconds), and <strong>data arrives with the sale</strong> (research as a by-product of trading).'),
  card('How does innovation cause market growth?', 'Two distinct mechanisms. <strong>New customers</strong>: a cheaper or simpler version reaches people the old product priced out. <strong>New uses</strong>: a product does something the old one could not, creating demand that did not exist at any price. Neither is share moving between existing firms.'),
  card('What is the difference between an invention and an innovation?', 'An <strong>invention</strong> is a new idea. An <strong>innovation</strong> is an idea brought to market and <strong>adopted</strong>. Only innovation changes a market, which is why the specification names it and not invention.'),
  kept('a0a34aa5', 'What is the difference between risk and uncertainty?', '<strong>Risk</strong>: the outcomes can be listed and given probabilities, so it can be planned for, priced or insured. <strong>Uncertainty</strong>: the outcomes cannot be listed at all, so only flexibility — reserves, alternatives, slack — helps.'),
  card('What decides how intense competition in a market is?', 'Three things: <strong>how many</strong> rivals there are, <strong>how similar</strong> their products are, and <strong>how easily</strong> a new firm can enter. Capital, an established brand, patents, exclusive supply and licences decide the last one, and so decide tomorrow\'s level of competition. The Economics papers call these <strong>barriers to entry</strong>.'),
  kept('4c6e65d6', 'What is primary data?', 'Data collected <strong>first-hand by or for the business</strong>, to answer its own question. It fits exactly and no rival holds it; it costs more and takes longer.'),
  kept('122a1a4c', 'What is secondary data?', 'Data <strong>already collected by somebody else</strong> for a different purpose. Cheap and immediate; it may cover the wrong group, period or question, and rivals can read it too.'),
  kept('1c26d0bd', 'What is quantitative data?', '<strong>Numerical</strong> data — counts, percentages, shares — that can be measured, compared and charted. It measures the opportunity; it does not explain it.'),
  kept('e115a778', 'What is qualitative data?', '<strong>Non-numerical</strong> data — opinions, motivations, reactions, the words customers use. It explains why a number is what it is, and a handful of strong opinions is not a market.'),
  card('What are the three uses of market research the specification names?', 'To <strong>identify and anticipate customer needs and wants</strong>; to <strong>quantify likely demand</strong>; and to <strong>gain insight into consumer behaviour</strong>. Identifying is about now, anticipating is about next, and insight is about how customers decide.'),
  card('How do you quantify likely demand from a survey?', 'Apply the proportion who said they would buy to the target population, then multiply by price. Zuri: 500,000 × 0.18 = <strong>90,000</strong> weekly buyers; × $1.20 = <strong>$108,000</strong> a week. Then <strong>discount it</strong>: stated intention overstates purchase, so the figure is a ceiling, not a forecast.'),
  card('Name the four methods of primary market research.', '<strong>Surveys/questionnaires</strong> (breadth, and the only one producing a scalable percentage), <strong>focus groups/consumer panels</strong> (depth from a few), <strong>face-to-face/telephone interviews</strong> (most detail, most cost), and <strong>product trials/test marketing</strong>.'),
  card('What is test marketing, and why is it different from the other methods?', 'Selling the product in a <strong>limited area or to a limited group</strong> before full launch and measuring real sales. It is the only primary method that records <strong>behaviour rather than intention</strong> — customers pay real money, so the firm sees the repeat-purchase rate, not the stated one. It is slow, and it warns rivals.'),
  card('Name the four sources of secondary market research.', '<strong>Websites and social media</strong>, <strong>newspapers, magazines, TV and radio</strong>, <strong>reports</strong> (industry, government, company accounts — usually the only source of market size and share) and <strong>databases</strong>. Ask of each: who collected it, why, and when?'),
  kept('8e42e372', 'What is random sampling?', 'Every member of the population has an <strong>equal chance</strong> of being selected. It removes the researcher\'s bias entirely, and it needs a complete list of the population, which few firms have.'),
  kept('812f1790', 'What is stratified sampling?', 'The population is divided into subgroups, then people are chosen <strong>at random within each subgroup</strong>, in proportion to its size. The most representative method, and the most work to organise.'),
  kept('fcfc2afd', 'What is quota sampling?', 'Subgroups with a <strong>target number</strong> for each, filled with <strong>whoever is available</strong>. Fast and cheap; the selection inside each group is not random, so the interviewer\'s choices shape the result.'),
  card('Stratified and quota sampling both use subgroups. What is the discriminator?', 'What happens <strong>inside</strong> each subgroup. Stratified selects <strong>at random</strong>; quota takes <strong>whoever is to hand</strong>. That one difference is what makes the first representative and the second quick, and it is what an exam item on sampling usually turns on.'),
  card('Does a bigger sample make research better?', 'Only against <strong>random error</strong>. Size does nothing about <strong>bias</strong>: a sample recruited through one channel excludes everyone that channel misses, however many people it reaches. A biased sample of 10,000 is worth less than an unbiased sample of 500.'),
  kept('b8aaeabe', 'What is a product-oriented business?', 'One that starts from <strong>what it can make well</strong> — an engineering strength, a recipe, a design — and finds customers afterwards. Suits technology-led markets; risks a superb product nobody wants.'),
  kept('1557f0c8', 'What is a market-oriented business?', 'One that starts from <strong>research into what customers want</strong> and designs to it. Suits fast-changing consumer markets; risks incremental improvement only, because research reports on what already exists.'),
  kept('b107d412', 'What is a market map?', 'A plot of the products in a market on <strong>two axes</strong>, each a variable customers choose by — price against quality, for example. It shows a firm\'s position relative to rivals and reveals <strong>gaps</strong>.'),
  kept('94975726', 'Give three limitations of a market map.', 'It shows <strong>two variables at a time</strong>; it plots <strong>perceptions</strong>, which change; and a <strong>gap is not an opportunity</strong> — it may be empty because nobody wants that position, or because it cannot be produced at that price. Only research into demand settles it.'),
  kept('080e37d5', 'What is market segmentation?', 'Dividing a broad market into <strong>smaller groups sharing needs, characteristics or behaviour</strong>, so a product and a message can be aimed at one group rather than averaged across all of them.'),
  kept('3472c964', 'Name the four bases for market segmentation.', '<strong>Demographic</strong> (age, gender, income, occupation, family size), <strong>geographic</strong> (country, region, urban or rural, climate), <strong>psychographic</strong> (lifestyle, values, attitudes) and <strong>behavioural</strong> (purchase frequency, occasion, loyalty, benefit sought).'),
  card('What is the difference between segmentation, targeting and positioning?', '<strong>Segmentation</strong> divides the market into groups. <strong>Targeting</strong> chooses which group to serve. <strong>Positioning</strong> decides how the product is presented to the group chosen. Confusing the first two is the most common error on this topic.'),
  kept('6d565d2d', 'What is competitive advantage?', 'A reason customers choose <strong>this firm over its rivals</strong>, arising either from <strong>lower costs</strong> or from <strong>differentiation</strong>. It is worth having only for as long as rivals cannot copy it.'),
  card('What makes a competitive advantage sustainable?', 'That copying it is <strong>slow, expensive or impossible</strong> — a brand built over decades, a patent, an exclusive supply agreement, a distribution network, scale a smaller rival cannot reach. A price cut, a new label or a promotion can be matched within one production run.'),
  kept('50eda97f', 'What is the purpose of product differentiation?', 'To make the product <strong>less substitutable</strong> for a rival\'s. Customers stop comparing on price alone, so demand becomes less price-sensitive and the firm keeps customers when a rival undercuts it. The difference must be <strong>visible</strong> and <strong>valued</strong>, or it is cost with no return.'),
  kept('45589007', 'What is value added?', '<strong>Selling price − the cost of bought-in materials and components</strong>, per unit. Zuri: $1.20 − $0.45 = <strong>$0.75</strong> a bottle.'),
  card('Why is value added not the same as profit?', 'Value added must still cover <strong>wages, rent, energy, distribution and marketing</strong>; profit is what remains of it afterwards. Price minus <em>total</em> costs is profit; price minus <em>bought-in materials</em> is value added.'),
  card('Name five ways a business can add value.', '<strong>Branding</strong>, <strong>design and packaging</strong>, <strong>convenience</strong>, <strong>customer service</strong> and <strong>customisation</strong>. Each costs something, so adding value pays only when the rise in what the customer will pay exceeds the cost of causing it.'),
  kept('d4f3b3f5', 'Trace the chain from a market map to a product a business can sell.', 'Choose two variables customers actually use to choose → plot every competitor → identify a position nobody occupies → <strong>research whether there is demand there</strong> → quantify it and discount for stated intention → launch only if the revenue covers the cost. The research step is the one students skip, and it is the one that decides whether the gap is an opportunity.'),
  kept('c595009e', 'Trace the effect of a business failing to adapt to a changing market.', 'A change reaches the market → customer expectations reset around the new option → the firm defends its existing sales instead of changing the offer → customers who wanted the new option leave → share moves to the firms that adapted → the firm is left with a shrinking part of a market that may itself have grown.'),
  kept('5624639c', 'Trace the chain from market research to competitive advantage.', 'Research identifies a need the market does not meet → the product is designed to meet it → the difference is visible to customers and valued by them → the product becomes <strong>less substitutable</strong> → demand is less price-sensitive → the firm holds a wider margin → the margin funds the next improvement, which is what keeps the advantage from being copied.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
// The five March mistakes are genuine student errors (structure-11 says so, and it is right), so they
// are kept by id and rewritten against the new body rather than replaced. Three are added for material
// this packet teaches for the first time: market share against sales growth, the stratified/quota
// discriminator, and treating a scaled survey figure as a forecast.
const mistake = (cid, title, mistakeText, correction, examTip) => ({
  id: cid ? `meeting-customer-needs:mistake:${cid}` : id('mistake', title), title, mistake: mistakeText, correction, examTip,
});

export const MISTAKES = [
  mistake('d6707b64', 'Confusing Risk and Uncertainty',
    'Students use "risk" and "uncertainty" as synonyms, or treat uncertainty as simply a larger amount of risk.',
    'The difference is whether a probability exists at all. Risk means the possible outcomes can be listed and given odds, so the firm can plan, price or insure. Uncertainty means the outcomes cannot be listed, so only flexibility helps — cash reserves, a wider range, a shorter supply chain.',
    'When a case study lists things that might go wrong, sort them into the two categories before you evaluate. Say which are quantifiable and which are not, rather than treating the whole list as one thing.'),
  mistake('ee0ff01a', 'Assuming Niche Markets Are Always Better',
    'Students argue that a business should choose a niche because margins are higher, without weighing what the niche costs it.',
    'A niche caps total revenue however well it is served, and a firm designed around one small group has little to fall back on if that group shrinks or a larger rival enters. A mass market offers volume and scale economies at a thinner margin. Neither is better in general.',
    'Make the recommendation conditional on the firm in the case: its resources, the level of competition it would face, and how specific the customer need is.'),
  mistake('508d97cc', 'Confusing Primary and Secondary With Quantitative and Qualitative',
    'Students treat "primary" as meaning numbers and "secondary" as meaning opinions, or decide the category from the method rather than from who collected the data.',
    'The two dimensions are independent. Primary or secondary is about WHO collected it and why; quantitative or qualitative is about WHAT KIND of data it is. Till data is primary and quantitative, a focus group is primary and qualitative, a published report is secondary and quantitative, a magazine review is secondary and qualitative.',
    'Read both dimensions out of the stem separately before choosing an option. Most items on this topic are testing exactly the pairing, and the four options are usually the four combinations.'),
  mistake('8e6af17b', 'Treating a Gap in the Market as an Opportunity',
    'Students read an empty position on a market map as proof that customers are waiting there.',
    'A gap shows only that no competitor occupies that position. It may be empty because nobody wants it, or because it cannot be produced profitably at that price. Research into demand is what turns a gap into an opportunity.',
    'In a mapping question, recommend the position AND say how the business would test demand at it. The recommendation without the test is only half an answer, and the assessment a Discuss or Assess asks for is the other half.'),
  mistake('c494488a', 'Confusing Adding Value With Raising the Price',
    'Students write that a business adds value by charging more for the same product.',
    'Value added is selling price minus the cost of bought-in materials, and it rises only when the customer\'s willingness to pay rises. Raising the price without changing anything the customer values loses customers instead. Branding, design, convenience, service and customisation are what raise willingness to pay; the higher price follows from them.',
    'Say what the business changes and why the customer would pay more for it, then state the value added as a figure per unit if the data allows: $1.20 − $0.45 = $0.75.'),
  mistake(null, 'Reading Rising Sales as Rising Market Share',
    'Students conclude that a firm whose sales rose has gained market share.',
    'Share is the firm\'s sales as a proportion of the whole market. If the market grew faster than the firm, share has fallen despite higher sales. A firm growing 10% in a market growing 25% is losing ground.',
    'Compare the two growth rates before making any claim about share, and calculate share at both dates if the figures are given.'),
  mistake(null, 'Missing the Difference Between Stratified and Quota Sampling',
    'Students say stratified sampling is the one that divides the population into subgroups, and choose it whenever a stem mentions subgroups.',
    'Both methods divide the population into subgroups, and both aim at proportionate numbers. The discriminator is what happens inside each subgroup: stratified selects AT RANDOM within it, quota fills a target with whoever is available.',
    'Look for the words that describe the selection inside the group — "at random", or "whoever passes", "whoever is available". If the stem does not say, the item cannot distinguish the two and neither can you.'),
  mistake(null, 'Treating a Scaled Survey Result as a Sales Forecast',
    'Students scale a survey percentage up to the population and present the answer as the number of units the business will sell.',
    'Stated intention overstates purchase, because nothing was at stake when the question was answered. The sample carries a margin of error, the proportion was measured at one price only, and the market moves before production starts. The scaled figure is a ceiling on demand, not a forecast of it.',
    'Show the scaling, state the figure with its unit, then add one sentence on why it is an over-estimate. That sentence is where the assessment marks in a Discuss or an Assess actually sit.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */
// structure-10: the March chains included two that were not causal — "Research customer needs →
// Design product to match → Launch with confidence" asserts an outcome rather than deriving one, and
// a two-step chain is not a chain. Every chain below has at least four steps and each step follows
// from the one before it.
export const EXTRAS = {
  chains: [
    {
      title: 'Why a mass-market firm can undercut a niche firm',
      steps: [
        'A standardised product is sold to the widest possible range of customers.',
        'Output per design is very high, so machinery runs continuously and inputs are bought in bulk.',
        'Design, machinery and advertising costs are spread over far more units, so average cost per unit falls.',
        'The firm can set a price a low-volume rival cannot match and still cover its costs.',
      ],
      result: 'Scale, not a better product, is what lets a mass-market firm compete on price — and the thin margin on each unit is what it pays for that.',
    },
    {
      title: 'How online retailing reshapes competition',
      steps: [
        'Selling online removes the need for premises, so the fixed cost of entering falls.',
        'New sellers enter the market with far less capital than a shop would have required.',
        'Customers compare every seller\'s price in seconds, so a premium has to be visible to survive.',
        'Established firms must cut price or give customers a reason to pay more.',
      ],
      result: 'A technology that changed one cost ends by changing the number of rivals, the transparency of prices and the strategy of every firm already there.',
    },
    {
      title: 'How brand loyalty turns into a margin',
      steps: [
        'The brand promise is kept consistently, purchase after purchase.',
        'Customers stop comparing alternatives and the brand becomes the default choice.',
        'Demand becomes less sensitive to price, so a rise loses fewer customers than it would a rival.',
        'The firm charges a premium and spends less winning the same customers back.',
      ],
      result: 'A wider margin on a product a rival could copy — and a market that is harder to enter for any name that means nothing to customers yet.',
    },
    {
      title: 'From a gap on the map to a decision',
      steps: [
        'Two variables customers actually choose by are put on the axes and every rival is plotted.',
        'A position no competitor occupies appears on the map.',
        'Research tests whether customers want a product at that position, and at what price.',
        'The proportion who say they would buy is scaled to the population and discounted for stated intention.',
      ],
      result: 'A number the business can plan production and cash flow against — or the discovery that the gap was empty because nobody wanted it.',
    },
    {
      title: 'How to work out a market share',
      steps: [
        'Find the total sales of the whole market for the period.',
        'Take the firm\'s own sales for the same period, so the two figures are comparable.',
        'Divide the firm\'s sales by the total market sales to get the proportion it holds.',
        'Multiply by 100 and write the answer as a percentage.',
      ],
      result: 'Zuri: $6m ÷ $40m × 100 = 15%. Compare that share with the market\'s own growth before claiming the firm is gaining ground.',
    },
    {
      title: 'What a product trial tells a business that a survey cannot',
      steps: [
        'Choose a limited area or group to sell in, which decides what the result represents.',
        'Put the product on sale there at a real price, so customers commit real money.',
        'Measure actual sales and repeat purchases, not stated intention.',
        'Adjust price, packaging or recipe on the evidence, or abandon the launch.',
      ],
      result: 'Behaviour rather than intention — which is why a trial is the one primary method that does not need discounting for what people say.',
    },
    {
      title: 'Why differentiation protects a firm in a price war',
      steps: [
        'The product is made distinguishable in a way customers can see and value.',
        'It stops being a straight substitute for a rival\'s, so the comparison is no longer price alone.',
        'Demand becomes less price-sensitive, so fewer customers switch when a rival undercuts.',
        'The firm holds its price and its margin while the price-cutting rival loses its own.',
      ],
      result: 'A defence that a price cut can never provide, because a price cut is the one move every competitor can copy the same week.',
    },
  ],
  evaluation: [
    {
      title: 'Research reduces uncertainty; it does not remove it',
      content: 'A scaled survey figure is a ceiling on demand rather than a forecast: stated intention overstates purchase, the sample carries a margin of error, the proportion was measured at one price, and the market moves before production starts. The judgement is about how much weight to put on the number, not whether to have one.',
    },
    {
      title: 'A niche strategy concentrates risk as well as margin',
      content: 'Serving one small group caps total revenue however well it is served, and leaves the firm with little to fall back on if tastes shift or a larger rival decides the niche is worth entering. The premium and the exposure are the same fact seen from two sides.',
    },
    {
      title: 'An advantage built on price is the easiest one to copy',
      content: 'A price cut wins customers within days and can be matched within days. Cost leadership is durable only where the firm\'s costs are genuinely lower, rather than its margin merely thinner — and where they are not, the cut is a transfer from profit to customers that a rival can end at will.',
    },
    {
      title: 'Adding value costs before it earns',
      content: 'Branding, design, service and customisation all raise costs immediately and raise willingness to pay only if customers can see the difference and think it worth paying for. Value added that nobody notices is cost added to the product and nothing added to the price.',
    },
  ],
};
