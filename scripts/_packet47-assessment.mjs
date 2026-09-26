/**
 * PACKET 47 — global-markets-expansion assessment: the quiz bank, the practice set, the flashcards,
 * the common mistakes and the extras.
 *
 * ── THE BANK IS AUTHORED AGAINST THE FIVE CHAPTERS ─────────────────────────
 *
 * `quiz-01` and `quiz-02`: the live bank's push-factor and off-shoring items were correct and
 * untaught. The rebuilt content teaches both (push-factors, off-shoring-and-outsourcing), and every
 * item below is tagged with the chapter that teaches it; the runner derives `quizIndices` from the
 * tag (`topFix-03`, `structure-02`) and refuses a quizzed term no subsection teaches (`structure-01`).
 * Keys are written first and DEALT into a position from a hash of the stem (packet 36), and no
 * explanation names an option by letter or position, because F074 reshuffles at render.
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * `DECISIONS.md` Settled, 26 Sep 2026: practice is shaped like the real paper for the topic's unit.
 * 4.3.2 is Unit 4 (WBS14): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and
 * Sections B and C are one 20-mark Evaluate essay each, from sources (`audit/raw/ial-paper-
 * structure.json`, business.units_3_4). So seven items on ONE source, `EXTRACT`.
 *
 *   - `practice-01` asks to replace the 6-mark Analyse. It is right that 6 is not in this paper;
 *     its own tariff list ("8, 10, 12 Assess") is not. Appendix 6 (`bus_spec.txt:2218-2250`) gives
 *     Discuss 8 and Assess 12 for Units 3/4 — `topFix-04`'s "8-mark Assess" does not exist either.
 *     Built: Discuss 8 and two Assess 12s.
 *   - `topFix-04` / `practice-02`: every stem names Lumora and the source; no guidance mentions a
 *     generic strategy (banned by the runner); items above 6 marks carry levels descriptors naming
 *     knowledge, application, analysis and evaluation, and end in a short model answer in outline.
 *     Items at 4 marks carry point allocations, as Appendix marking does at that tariff.
 *   - The guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`,
 *     CONTENT-GATE step 6). The live five were one paragraph each.
 *   - `Discuss` asks for a brief assessment and never a conclusion (V036).
 */
import { id, hash8, FIRM, usd, usdm, units, fxu, rate, pct, num } from './_packet47-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet47-content.mjs';

const F = FIRM;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

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
  /* ── the pre-test pool: three, unpinned, FIRST, answerable from chapter one ── */
  qi(null, 'A firm decides to sell abroad because sales in its home market have stopped growing. This reason is:',
    ['a push factor', 'a pull factor', 'off-shoring', 'outsourcing'],
    'A market that has stopped growing is a problem at home, which is what makes it a push factor. A pull factor is an attraction of the foreign market, and off-shoring and outsourcing describe where and by whom work is done, not why a firm sells abroad.'),
  qi(null, 'Which of these is a pull factor for selling in another country?',
    ['Spreading fixed costs over a larger output', 'A new rival cutting prices at home', 'Home sales flat for several years', 'Most homes already owning the product'],
    'Lower average cost from a larger output is an opportunity the foreign market offers, so it pulls. A rival cutting prices is competition, and flat sales or a product most homes already own describe a saturated market; all three push from home.'),
  qi(null, 'A firm pays another company in its own country to run its payroll. The firm has:',
    ['outsourced the activity', 'off-shored the activity', 'merged with the company', 'extended its life cycle'],
    'Another business now does the work, which is outsourcing; because it stays in the same country, nothing has been off-shored. A merger would combine the two firms, and the product life cycle is about a product\'s sales over time.'),

  /* ── Chapter 1 ── */
  qi(B1, 'Fixed costs are $2m a year and variable cost is $10 a unit. Raising output from 100,000 to 200,000 units changes average cost:',
    ['from $30 to $20', 'from $20 to $10', 'from $30 to $25', 'from $12 to $11'],
    'Average cost is variable cost plus fixed cost per unit: $10 plus $20 at the lower output, and $10 plus $10 at the higher one. The fixed cost is spread over twice as many units, which is the economy of scale a larger market offers.'),
  qi(B1, 'Competition acts as a push factor because:',
    ['rivals at home squeeze a firm\'s share and margins', 'foreign customers pay higher prices', 'exporting spreads the fixed costs', 'customers abroad have higher incomes'],
    'Competition is pressure from other sellers in the home market, which makes staying there less rewarding. Higher prices, spread fixed costs and richer customers abroad are all attractions of the foreign market, so they pull rather than push.'),
  qi(B1, 'A firm makes 60% of its sales at home and 40% abroad. Home sales fall 10% and exports do not change. Total sales fall by:',
    ['6%', '10%', '4%', '16%'],
    'Only the home share falls: a tenth of sixty per cent of sales is six per cent of the total. That the fall is smaller than the fall at home is the risk spreading a second market provides.'),
  qi(B1, 'A mobile phone maker builds and runs its own factory in another country. This is:',
    ['off-shoring without outsourcing', 'outsourcing without off-shoring', 'both off-shoring and outsourcing', 'a takeover of a foreign rival'],
    'The work has moved abroad, which is off-shoring, but the firm still owns and runs it, so nothing has been outsourced. Outsourcing would need another business to do the work, and no rival has been bought.'),
  qi(B1, 'Selling a product abroad extends its life cycle when the product is:',
    ['declining at home but new to the foreign market', 'redesigned before it goes abroad', 'growing in both markets at once', 'priced higher abroad than at home'],
    'The extension comes from a market where the product is still at an early stage while it declines at home. Redesigning it is a different decision, growth in both markets needs no extension, and the price abroad does not decide the stage.'),
  qi(B1, 'Assembly labour is $9 a unit at home and $4 abroad, but shipping each unit back costs $2. Off-shoring saves:',
    ['$3 a unit', '$5 a unit', '$7 a unit', '$2 a unit'],
    'The labour saving is $5, and the freight takes $2 of it back, leaving $3. Quoting the labour gap alone ignores a cost the move creates.'),

  /* ── Chapter 2 ── */
  qi(B2, 'Household disposable income is $5,000 and grows 10% a year. After two years it is:',
    ['$6,050', '$6,000', '$5,500', '$6,100'],
    'Growth compounds: $5,000 rises to $5,500 after one year, and a tenth of that is added again to reach $6,050. Adding a tenth of the original twice ignores the compounding.'),
  qi(B2, 'Which of these is evidence about a country\'s ease of doing business?',
    ['Registering a company takes nine permits', 'Household incomes grew 6% last year', 'The currency fell a tenth against the dollar', 'Two local brands share most of the market'],
    'The number of permits measures the time and cost of trading legally. Income growth is a disposable income factor, the currency is an exchange rate factor, and a market shared by two brands is about rivalry.'),
  qi(B2, 'Three retail chains sell 80% of all appliances in a country. Applying Porter\'s five forces, this signals:',
    ['strong buyer power, holding prices down', 'strong supplier power, raising costs', 'a high threat of substitute products', 'weak rivalry among existing sellers'],
    'A few large customers buying most of the output can press for low prices, which is buyer power. The retailers are the manufacturer\'s customers, not its suppliers, and nothing here concerns substitutes or the number of rival makers.'),
  qi(B2, 'A firm may prefer a poorer country with fast-growing incomes to a richer one with flat incomes because:',
    ['more households will soon afford the product', 'import permits there are cheaper', 'the richer market buys fewer imports', 'its infrastructure is better developed'],
    'Growth decides how many new buyers appear; a fast rise carries more households past the price of the product. Permits, import habits and infrastructure are separate factors, and nothing in the comparison says anything about them.'),
  qi(B2, 'Political instability matters to a firm entering a market mainly because:',
    ['the rules may change before it earns a return', 'it raises the value of the local currency', 'it shortens the product life cycle', 'it removes the threat of new entrants'],
    'A firm commits money on the assumption that laws, taxes and trade rules will stay in place; instability is the risk that they will not. None of the other three follows from political change.'),

  /* ── Chapter 3 ── */
  qi(B3, 'At one site labour is $4 and other costs $8 a unit, a 25% tariff applies to those two, and freight is $1. The delivered cost per unit is:',
    ['$16', '$13', '$15', '$12'],
    'Labour and other costs make $12; the tariff adds a quarter of that, $3, to reach $15; freight brings the delivered cost to $16. Leaving out the tariff or the freight understates what each unit costs to put in front of a customer.'),
  qi(B3, 'Producing inside a trade bloc matters to a firm because:',
    ['its output avoids the bloc\'s external tariff', 'wages are equal in every member country', 'every member uses the same exchange rate', 'governments inside it offer no incentives'],
    'Members trade with one another free of the tariff that goods from outside must pay. Wages, currencies and incentives all differ between members, so none of the other three is a feature of a bloc.'),
  qi(B3, 'A factory costing $12m is expected to earn $1.8m a year. Its return on investment is:',
    ['15%', '12%', '18%', '6.67%'],
    'Return on investment is the annual return divided by the outlay: one point eight over twelve is fifteen per cent. The other figures come from dividing the wrong way or misplacing the decimal point.'),
  qi(B3, 'A $3m grant is offered towards a $15m factory expected to earn $2.4m a year. The return on the firm\'s own money moves from:',
    ['16% to 20%', '16% to 19%', '15% to 20%', '20% to 24%'],
    'Two point four over fifteen is sixteen per cent; with the grant the firm puts in twelve, and two point four over twelve is twenty. The profit is unchanged; the money at risk is smaller.'),
  qi(B3, 'For a furniture maker that uses large amounts of timber, the location factor likely to matter most is:',
    ['natural resources near the site', 'the level of disposable income', 'the threat of substitutes', 'the growth of household incomes'],
    'A bulky raw material is expensive to move, so producing near it lowers cost and supply risk. Disposable income and its growth are about a country as a MARKET, and substitutes are one of the five forces.'),

  /* ── Chapter 4 ── */
  qi(B4, 'A country lets foreign firms own at most 49% of any bank. For a foreign bank entering it, the reason for a joint venture is:',
    ['a government or legal requirement', 'reducing competition in banking', 'acquiring the partner\'s patents', 'economies of scale in lending'],
    'The ownership cap means a local partner must hold the majority, so the law, not a choice, dictates the form. The other reasons may be present, but none of them is what the cap creates.'),
  qi(B4, 'Compared with taking over a foreign firm outright, forming a joint venture with it means the firm must:',
    ['share decisions and profit with its partner', 'buy all of the partner\'s shares', 'give up its own separate business', 'pay the whole cost of the project'],
    'The partners own the new business together, so control and profit are shared as well as cost. Buying every share would be a takeover, each parent keeps its own business, and splitting the cost is one of the reasons for the arrangement rather than something it rules out.'),
  qi(B4, 'A firm buys 60% of a rival\'s shares although the rival\'s board opposed the bid. This is:',
    ['a hostile takeover', 'an agreed merger', 'a joint venture', 'an outsourcing contract'],
    'This is a hostile takeover: control has passed to the buyer through a majority of the shares, against the board\'s wishes. A merger is agreed by both sides, a joint venture creates a new business, and outsourcing buys a service rather than a firm.'),
  qi(B4, 'Buying a wholesaler that already supplies 5,000 shops mainly gives the buyer:',
    ['access to a distribution network', 'ownership of a patent', 'a more favourable exchange rate', 'a government incentive'],
    'The wholesaler\'s relationships and delivery routes reach customers the buyer could not reach quickly itself. A patent, an exchange rate and an incentive are not what a wholesaler holds.'),
  qi(B4, 'Which reason for a cross-border deal fits a joint venture better than a takeover?',
    ['Sharing the cost and risk of a large project', 'Gaining full control of a rival\'s brand', 'Removing a competitor from the market', 'Owning all of a target\'s patents'],
    'In a joint venture each partner pays part of the cost and bears part of any loss. Full control, removing a rival and owning every patent all need the target to become part of the buyer, which is what a takeover does.'),
  qi(B4, 'A firm based outside a trade bloc buys a manufacturer inside it. The main reason is to:',
    ['sell inside the bloc free of its external tariff', 'raise the value of its home currency', 'shorten its product life cycle', 'increase its buyers\' bargaining power'],
    'Production inside the bloc reaches every member without the common external tariff that its exports from outside would pay. A deal cannot move a currency, and the other two would harm the buyer.'),

  /* ── Chapter 5 ── */
  qi(B5, 'The home currency rises from $1 = 2 units to $1 = 2.5 units. A $40 export held at its dollar price now costs buyers abroad:',
    ['100 units', '80 units', '16 units', '20 units'],
    'Forty dollars at two and a half units each is one hundred units, up from eighty. Dividing instead of multiplying gives the small figures, which would mean the product got cheaper abroad as the currency rose.'),
  qi(B5, 'A firm imports a part priced at 120 units. The rate moves from $1 = 3 units to $1 = 4 units. The part\'s dollar cost:',
    ['falls from $40 to $30', 'rises from $30 to $40', 'falls from $360 to $480', 'stays at $40'],
    'One hundred and twenty units cost forty dollars at three to the dollar and thirty at four: each dollar now buys more of the supplier\'s currency. Multiplying gives figures that rise, which is the wrong direction for a stronger dollar.'),
  qi(B5, 'A rise in the value of the home currency is most likely to help a firm that:',
    ['imports most of its inputs and sells at home', 'exports most of its output', 'earns profit abroad and converts it home', 'competes with imports in its home market'],
    'Imported inputs become cheaper while home prices are unaffected. Exporters face higher prices abroad or lower receipts, converted profit is worth less, and imports competing at home become cheaper.'),
  qi(B5, 'Non-price competitiveness means winning sales through:',
    ['quality, design, reliability and service', 'a lower price than rivals charge', 'a weaker home currency', 'paying lower wages than rivals'],
    'Non-price competitiveness is differentiating the product so customers choose it for reasons other than price. A lower price, a weaker currency and lower wages all work through cost and price.'),
  qi(B5, 'A shortage of skilled engineers is most likely to weaken a firm\'s international competitiveness by:',
    ['raising wage costs and delaying new products', 'lowering the price of imported inputs', 'strengthening the home currency', 'reducing the number of rival firms'],
    'Scarce engineers cost more and unfilled posts delay launches, which hurts both price and non-price competitiveness. The other three are not effects of a shortage of skills.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

/*
 * THE SOURCE. One extract carries every item, so a student meets the same firm seven times, and
 * `PracticeQuestionsTab.jsx` prints the shared opening once. Every figure the items need is here.
 */
export const EXTRACT = `Source A. ${F.name} makes ${F.products} in ${F.home}. For three years its home sales have been flat at ${units(F.homeSales)} a year at ${usd(F.price)} each, and two low-priced importers now share the same supermarket shelves. Its fixed costs are ${usdm(F.fixed)} a year and each cooker costs ${usd(F.variable)} in materials, labour and energy. The directors plan to export ${units(F.exportSales)} cookers a year to Belmar, where household disposable income is ${usd(F.belmar.income)} and rising ${pct(F.belmar.growth)} a year, three supermarket chains sell most small appliances, and foreign firms may own no more than 49% of a distribution business. They are also choosing a site for a new ${usdm(F.outlay)} factory expected to earn ${usdm(F.annualReturn)} a year. Inside the trade bloc that includes Belmar, labour would cost ${usd(F.siteIn.labour)} a cooker and freight ${usd(F.siteIn.freight)}. Outside it, labour would cost ${usd(F.siteOut.labour)} and freight ${usd(F.siteOut.freight)}, cookers entering the bloc pay a ${pct(F.siteOut.tariffPct)} tariff, and the government offers a ${usdm(F.grant)} grant. Other costs are ${usd(F.siteIn.other)} a cooker at either site. The exchange rate is ${rate(F.e0)} of Belmar's currency, and engineers and technicians are in short supply in ${F.home}.`;

export const PRACTICE = [
  pr(B1, 'Explain', 4, `${EXTRACT} Explain one push factor that may have led ${F.name} to plan exports. (4 marks)`,
    'The question asks for ONE push factor, so choose the one the source gives most evidence for and develop it rather than naming both. Remember that a push factor is a problem at home, not an opportunity abroad, and finish on why that problem makes selling abroad attractive.\n'
    + `Knowledge: a push factor is a condition in the home market that drives a firm abroad, such as a saturated market or competition (1 mark). Application: home sales have been flat at ${units(F.homeSales)} a year for three years, or two low-priced importers now share its shelves (1 mark). Analysis: with no growth at home, extra sales can only come from taking customers off rivals, or the importers are squeezing its share and margin (1 mark). Analysis: selling in Belmar adds customers without fighting the same rivals for the same shoppers, keeping the factory busy (1 mark). An answer about Belmar's rising incomes has described a pull factor and scores only the knowledge mark.`),

  pr(B1, 'Calculate', 4, `${EXTRACT} Calculate the change in ${F.name}'s average cost per cooker if it produces ${units(F.totalSales)} a year instead of ${units(F.homeSales)}. (4 marks)`,
    'Work out average cost at each output separately, and remember what stays the same when output rises and what does not. Show each division on its own line, then state the change and its direction.\n'
    + `At ${units(F.homeSales)}: fixed cost per cooker is ${usdm(F.fixed)} ÷ ${units(F.homeSales)} = $12 (1 mark), so average cost is ${usd(F.variable)} + $12 = ${usd(F.avgHome)} (1 mark). At ${units(F.totalSales)}: ${usdm(F.fixed)} ÷ ${units(F.totalSales)} = $8, so average cost is ${usd(F.avgTotal)} (1 mark). Average cost falls by ${usd(F.avgHome - F.avgTotal)} a cooker, about ${pct(((F.avgHome - F.avgTotal) / F.avgHome) * 100)} (1 mark). An answer that spreads the fixed cost only over the ${units(F.exportSales)} exported cookers has missed that the saving applies to every cooker.`),

  pr(B5, 'Discuss', 8, `${EXTRACT} The exchange rate moves to ${rate(F.e1)} of Belmar's currency. Discuss the likely impact of this change on ${F.name}. (8 marks)`,
    'Decide first which way the dollar has moved and what that means for a firm that sells abroad. Then think about the choice the firm faces over its export price, and look for anything in the source that would soften or sharpen the effect. Leave space for a brief assessment of how serious the impact is.\n'
    + `Level 1: states that the currency has changed and that exports are affected, with little use of the source. Level 2: knowledge and application — the dollar has appreciated by ${pct(F.appreciationPct)}; a ${usd(F.price)} cooker rises from ${fxu(F.foreignPrice0)} to ${fxu(F.foreignPrice1)} in Belmar, or earns ${usd(F.heldReceipt)} if the Belmar price is held. Level 3: analysis of the chain — a higher price in a market where three chains hold buyer power is likely to cost volume, so the ${units(F.exportSales)} plan and its scale economies are at risk, while a held price cuts the margin on each export; any inputs bought in Belmar's currency become cheaper. Level 4: a brief assessment weighing the competing effects, for example that the impact depends on how sensitive Belmar's shoppers are to price and whether the factory site inside the bloc lets costs be paid in the same currency. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B2, 'Assess', 12, `${EXTRACT} Assess the attractiveness of Belmar as a market for ${F.name}. (12 marks)`,
    'Use the market factors and the five forces the source gives evidence for, not every factor you know. Build arguments on both sides, and decide before you write what your judgement will turn on, because this command word needs a supported judgement rather than a list.\n'
    + `Level 1: knowledge of market factors or the five forces, described generally. Level 2: application to Belmar — disposable income of ${usd(F.belmar.income)} rising ${pct(F.belmar.growth)} a year means more households each year can afford a ${usd(F.price)} cooker; three chains selling most appliances give buyers strong bargaining power. Level 3: analysis of both sides — growth brings new buyers, and a basic cooker at an early stage of its life cycle there suits a market where incomes are still low; against that, buyer power squeezes the margin, and the ownership cap limits control of distribution. Level 4: evaluation reaching a supported judgement, for example that Belmar is attractive for volume and scale but less so for margin unless ${F.name} can reach shoppers without depending on the three chains.\n`
    + 'A strong answer, in outline: Belmar\'s fast income growth makes it a growing market for an affordable cooker; but powerful buyers and the limit on foreign ownership mean the profit per cooker may be thin; so it is attractive if the aim is volume and lower average cost, and the judgement depends on securing distribution.'),

  pr(B4, 'Assess', 12, `${EXTRACT} Assess the reasons why ${F.name} might form a joint venture with a distributor in Belmar. (12 marks)`,
    'Find the reasons the source actually supports — one of them may leave the firm no real choice — and weigh them against what a joint venture costs. Finish with a judgement on which reason is strongest, and say why.\n'
    + 'Level 1: knowledge of what a joint venture is or of general reasons for one. Level 2: application — foreign firms may own no more than 49% of a distribution business, so a legal requirement makes a local partner necessary; a Belmar distributor already reaches the shops, giving access to a distribution network and local knowledge. Level 3: analysis — the partner\'s network gets cookers onto shelves quickly, which the export plan depends on, and knowledge of the three chains may improve the terms; against that, shared control means shared profit, slower decisions and a partner who may later sell a rival\'s product. Level 4: evaluation with a supported judgement, for example that the legal requirement is decisive because it removes the alternative of owning distribution outright, so the real question is choosing the right partner.\n'
    + 'A strong answer, in outline: the ownership cap makes a partner a legal requirement; the partner also brings a distribution network and local knowledge the firm lacks; the costs are shared control and profit; the legal requirement is the strongest reason because it settles the form, and the other two decide whether the venture succeeds.'),

  pr(B3, 'Evaluate', 20, `${EXTRACT} Evaluate which of the two sites ${F.name} should choose for its new factory. (20 marks)`,
    'Compare the two sites on the same basis before anything else: what each cooker costs to make and deliver to a customer inside the bloc, and what the firm must invest. Then bring in the factors the source mentions that do not show up in those figures, and finish with a recommendation that says what would change it.\n'
    + `Level 1: describes location factors with little reference to the source. Level 2: knowledge and application — inside the bloc a cooker costs ${usd(F.siteIn.labour)} + ${usd(F.siteIn.other)} + ${usd(F.siteIn.freight)} = ${usd(F.landedIn)} delivered; outside it ${usd(F.siteOut.labour + F.siteOut.other)} plus a ${usd(F.tariffOut)} tariff plus ${usd(F.siteOut.freight)} freight = ${usd(F.landedOut)}. Level 3: analysis — the cheaper wage is outweighed by the tariff and freight, so the bloc site is ${usd(F.landedOut - F.landedIn)} a cooker cheaper on ${units(F.exportSales)} exports; but the grant cuts the outside site's outlay to ${usdm(F.outlay - F.grant)}, lifting the return from ${pct(F.roi)} to ${pct(F.roiGrant)} on the same ${usdm(F.annualReturn)}. Level 4: evaluation — weighs a one-off grant against a cost gap that lasts the life of the factory, considers skills, infrastructure and stability not given in the source, and reaches a perceptive recommendation with conditions.\n`
    + `A strong answer, in outline: the bloc site wins on delivered cost; the grant makes the other site's return look better but only for as long as the tariff gap does not erode the ${usdm(F.annualReturn)} forecast; recommend the bloc site, unless the grant is large enough, or the firm's sales outside the bloc large enough, that the tariff matters less.`),

  pr(B5, 'Evaluate', 20, `${EXTRACT} Evaluate whether exchange rate movements or skill shortages pose the greater threat to ${F.name}'s international competitiveness. (20 marks)`,
    'Treat competitiveness as having two sides — price and non-price — and ask which threat damages which side, and for how long. Use the source to judge how exposed this firm is to each, then reach a conclusion that says what would make you change it.\n'
    + `Level 1: describes exchange rates or skill shortages in general terms. Level 2: knowledge and application — an appreciation to ${rate(F.e1)} would take a ${usd(F.price)} cooker from ${fxu(F.foreignPrice0)} to ${fxu(F.foreignPrice1)} in Belmar; the shortage of engineers and technicians raises wages and can delay new models. Level 3: analysis of both — the currency affects price competitiveness on every export and can reverse; the skill shortage raises costs and weakens non-price competitiveness (quality, new designs) for as long as it lasts, and affects home sales too. Level 4: evaluation — judges which is greater for this firm, for example that the exchange rate is the larger short-run threat to an exporter competing on price with powerful buyers, while the skill shortage is the more lasting threat, especially if the factory is built at home; the conclusion states the condition that would change it.\n`
    + 'A strong answer, in outline: the exchange rate hits price competitiveness quickly and can be managed by producing inside the bloc; the skill shortage hits both price and quality and cannot be hedged; so the skill shortage is the greater long-term threat unless the new factory is built abroad, where the currency becomes the larger risk.'),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is a push factor?', 'A condition in the home market that drives a firm abroad. The two named here are a saturated market and competition.'),
  fc('What is a saturated market?', 'A market where most people who want the product already have it, so sales can grow only by replacement or by taking customers from rivals.'),
  fc('How is competition a push factor?', 'Rivals at home take share and force prices down, so growing abroad, away from the same rivals, becomes more attractive.'),
  fc('What is a pull factor?', 'An opportunity abroad that draws a firm in: increased sales and profitability, risk spreading and economies of scale.'),
  fc('How does selling abroad spread risk?', 'Sales no longer depend on one economy. A downturn at home hits only part of total sales if other markets hold up.'),
  fc('Why does exporting lower average cost at home too?', 'Fixed costs are spread over all units made, so a larger output lowers the cost of every unit, including those sold at home.'),
  fc('Off-shoring or outsourcing: what is the difference?', 'Off-shoring is WHERE — the activity moves to another country. Outsourcing is WHO — another firm does it. A firm can do both at once.'),
  fc('What is cost competitiveness?', 'The ability to produce at a cost that lets a firm match or beat rivals\' prices; off-shoring and outsourcing are two routes to it.'),
  fc('How does selling abroad extend the product life cycle?', 'A product declining at home can be at an early stage in a market where few people own it yet, so its sales last longer.'),
  fc('Name the five factors for assessing a country as a market.', 'Levels and growth of disposable income; ease of doing business; infrastructure; political stability; exchange rates.'),
  fc('Why do both the level and the growth of income matter?', 'The level says who can afford the product now; the growth says how many more will be able to soon.'),
  fc('What is ease of doing business?', 'The time and cost of trading legally in a country: permits, registration, enforcing contracts and getting paid.'),
  fc('What are Porter\'s five forces?', 'Rivalry among existing firms, threat of new entrants, buyer power, supplier power and threat of substitutes.'),
  fc('How are the five forces used to assess a potential market?', 'Rate each force for that market; strong forces mean the profit a newcomer can expect is low, whatever the market\'s size.'),
  fc('Name the nine factors for assessing a production location.', 'Costs of production; skills and availability of labour force; infrastructure; location in trade bloc; government incentives; ease of doing business; political stability; natural resources; likely return on investment.'),
  fc('Why can a low-wage site be the dearer one?', 'Delivered cost per unit includes tariffs and freight. A tariff on goods entering a bloc can cost more than the wage gap saves.'),
  fc('Why does location inside a trade bloc matter?', 'Goods made inside move to other members without the common external tariff that goods from outside pay.'),
  fc('What government incentives attract a factory?', 'Grants, tax holidays, cheap land and special economic zones. They can end, and some carry conditions.'),
  fc('How is return on investment calculated?', 'Annual return ÷ the money invested × 100. A grant raises it by reducing the money the firm puts in.'),
  fc('Merger, takeover or joint venture?', 'Merger: two firms become one. Takeover: one firm controls another. Joint venture: partners create a new business they own together.'),
  fc('Name the ten reasons for global mergers, takeovers or joint ventures.', 'Spreading risk and economies of scale; new markets/trade blocs; brands/patents; resources/supplies; global competitiveness; reducing competition; local knowledge; government or legal requirement; supply chains/distribution networks; sharing costs/risks.'),
  fc('When is a joint venture a legal requirement?', 'When a country limits foreign ownership in an industry or requires a local partner, so no other route is allowed.'),
  fc('What does a distribution network give a buyer?', 'Established links to wholesalers, retailers and delivery routes that get the product to customers without years of building them.'),
  fc('What does an appreciation of the home currency do to an exporter?', 'Its price abroad rises if it holds its home price, or its home-currency receipt falls if it holds the foreign price.'),
  fc('What does an appreciation do to an importer?', 'Imported inputs cost less in the home currency, so its costs fall.'),
  fc('Why does repatriated profit change with the exchange rate?', 'Profit earned in a foreign currency is worth fewer home-currency units when the home currency is stronger.'),
  fc('How can a firm reduce exchange rate risk?', 'Buy inputs in the currency it earns, produce inside the market, agree a rate in advance with a bank, or invoice in its own currency.'),
  fc('What is international competitiveness?', 'The ability to win sales against foreign rivals, on price (cost) or on non-price factors such as quality, design and service.'),
  fc('How do skill shortages affect international competitiveness?', 'Scarce skills raise wages and leave posts unfilled, lifting costs and delaying products, which weakens both price and non-price competitiveness.'),
];

/* ══ Common mistakes — the fields MistakesTab.jsx reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Calling every reason to go abroad a push factor',
    'Writing that rising incomes in the target country "push" the firm to export.',
    'A push factor is a problem at home (a saturated market, competition); an attraction abroad (sales, profit, scale, risk spreading) is a pull factor. Many decisions have both.',
    'Label each reason push or pull before developing it; the label tells you where the evidence should come from.'),
  mk('Treating off-shoring and outsourcing as the same thing',
    'Describing a firm that builds its own factory abroad as having "outsourced" production.',
    'Off-shoring is about location; outsourcing is about ownership. The firm running its own foreign factory has off-shored but not outsourced.',
    'Ask two questions of the case: where is the work done, and who does it?'),
  mk('Comparing wages instead of delivered cost',
    'Choosing the site with the lowest wage as the cheapest place to produce.',
    'Delivered cost per unit adds materials, energy, freight and any tariff. A tariff on goods entering a trade bloc can outweigh a lower wage.',
    'Add every cost line the case gives into one figure per unit for each site before comparing.'),
  mk('Listing the five forces without rating them',
    'Naming rivalry, entrants, buyers, suppliers and substitutes, then moving on.',
    'The forces only assess a market when each is rated for that market and the ratings lead to a conclusion about likely profit.',
    'Pick the forces the case gives evidence for, rate each high or low, and say what they imply for price.'),
  mk('Calling every cross-border deal a merger',
    'Describing a firm buying a majority of a rival\'s shares as a merger.',
    'That is a takeover. A merger is agreed and creates one combined firm; a joint venture creates a new business both partners own while they carry on separately.',
    'Identify which of the three the case describes before giving reasons, because the reasons differ.'),
  mk('Reading a strong currency as good news for every firm',
    'Writing that an appreciation "strengthens" a firm, whatever it does.',
    'An appreciation hurts exporters (dearer abroad or lower receipts) and helps importers (cheaper inputs). A firm that does both must net the two.',
    'Work out the export effect and the import effect with the figures given, then judge the net impact.'),
  mk('Treating skill shortages only as a wage problem',
    'Saying a shortage of engineers raises costs, and stopping there.',
    'Shortages also delay products and lower quality, which weakens non-price competitiveness — often the more lasting damage.',
    'Follow the shortage to both price and non-price competitiveness, and weigh the firm\'s options for closing the gap.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The three chains below are what the three reorders drill (`reorder.source` finds a sequence the
 * section teaches in an extras chain, in the same order). They sit on the Extras tab, not on the
 * recall's own step, so the recall is not answerable by scrolling up.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'Extending a product\'s life cycle abroad',
      steps: [
        'Customers at home move to newer models, and sales of the product there begin to fall.',
        'The firm looks for a country where few households own the product yet.',
        'It launches the same model there, and sales abroad grow.',
        'Growth abroad offsets decline at home, so the model sells for years longer.',
      ],
      result: 'The product is unchanged; the market is new. The extra years earn a margin on development costs that were paid long ago.',
    },
    {
      title: 'From an export plan to a lower average cost',
      steps: [
        `${F.name} adds ${units(F.exportSales)} exports to ${units(F.homeSales)} home sales.`,
        `Fixed costs of ${usdm(F.fixed)} are now shared by ${units(F.totalSales)} cookers instead of ${units(F.homeSales)}.`,
        `Fixed cost per cooker falls from $12 to $8, so average cost falls from ${usd(F.avgHome)} to ${usd(F.avgTotal)}.`,
        'Every cooker, including those sold at home, is now cheaper to make.',
      ],
      result: 'Economies of scale are a pull factor that also strengthens the firm at home.',
    },
    {
      title: 'Working out the likely return on a new factory',
      steps: [
        `Estimate the yearly profit the factory should earn: ${usdm(F.annualReturn)}.`,
        `Take any grant off the cost of building it: ${usdm(F.outlay)} less ${usdm(F.grant)} is ${usdm(F.outlay - F.grant)}.`,
        `Divide the yearly profit by the firm's own money: ${pct(F.roiGrant)}, against ${pct(F.roi)} with no grant.`,
        'Weigh that percentage against the chance it is not earned in that country.',
      ],
      result: 'Return on investment is where the location factors meet; its reliability depends on the ones that are hardest to put a figure on.',
    },
    {
      title: 'From a stronger dollar to lost export sales',
      steps: [
        `The dollar rises from ${rate(F.e0)} to ${rate(F.e1)}.`,
        `A cooker still priced at ${usd(F.price)} now costs buyers abroad ${fxu(F.foreignPrice1)} of their currency, not ${fxu(F.foreignPrice0)}.`,
        'Customers in Belmar switch to cheaper local cookers.',
        `The exporter sells fewer units there — or holds the local price and earns ${usd(F.heldReceipt)} a cooker instead.`,
      ],
      result: 'An appreciation costs an exporter volume or margin; the same movement makes its imported parts cheaper.',
    },
  ],
  evaluation: [
    {
      title: 'Which market: the richer one or the faster-growing one?',
      content: `A richer market is not automatically the better one. Tarsia's households have ${usd(F.tarsia.income)} to spend against Belmar's ${usd(F.belmar.income)}, but Belmar's incomes are growing ${pct(F.belmar.growth)} a year against ${pct(F.tarsia.growth)}. Three things decide it. THE PRODUCT: an affordable, basic cooker suits the market where incomes are crossing the point at which it becomes affordable; a premium model suits the richer one. THE FORCES: a large market with three dominant retailers can leave less profit than a smaller one with many outlets. THE RISKS: fast growth is worth less if the rules, the infrastructure or the currency cannot be relied on. The strongest conclusion names the product and the force that decide it.`,
    },
    {
      title: 'Merger, takeover or joint venture?',
      content: 'The three routes trade control against cost and risk. A takeover gives full control of brands, patents and networks, and costs the most. A merger shares ownership but still combines the firms entirely. A joint venture shares the cost and the risk, brings the partner\'s local knowledge and networks, and is sometimes the only legal route — at the price of shared profit and slower decisions. The deciding question is what the firm needs: to own an asset outright, or to use it in one market.',
    },
    {
      title: 'Is a stronger home currency a threat?',
      content: `It depends on which side of the firm is larger. ${F.name}'s exports would cost ${fxu(F.foreignPrice1)} instead of ${fxu(F.foreignPrice0)} after a ${pct(F.appreciationPct)} appreciation, but a part invoiced at ${fxu(F.componentUnits)} would fall from ${usd(F.componentCost0)} to ${usd(F.componentCost1)}. A firm that exports much and imports little loses; one that imports most of its inputs may gain. Producing inside the market it sells to, or buying in the currency it earns, shrinks the question.`,
    },
  ],
};
