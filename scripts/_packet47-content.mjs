/**
 * PACKET 47 — global-markets-expansion teaching content: five chapters in the specification's own
 * five sub-topics (`bus_spec.txt:1372-1410`), seventeen subsections, one step each, and one
 * recall per subsection.
 *
 * WHAT THE LIVE SECTION TAUGHT AND WHY NONE OF IT SURVIVES AS A SUBSECTION. Two chapters, four
 * subsections: exporting/licensing/franchising, joint ventures and FDI as entry modes, Ansoff in a
 * global context, and PESTLE with the Bartlett-Ghoshal typology. Measured against `:1372-1410`, not
 * one of the four is a 4.3.2 bullet (see `_packet47-util.mjs` for the counts), while the quiz,
 * flashcards and mistakes already tested the real bullets — `structure-01`'s mismatch. `topFix-01`
 * asks for the rewrite and to "reuse the existing flashcards/common_mistakes as the source": their
 * SUBJECTS are reused (push, off-shoring vs outsourcing, PLC extension, country factors, exchange
 * rates, skill shortages); their named real firms and dated claims are not.
 *
 * `topFix-01` proposes three chapters. The specification has five sub-topics, and packets 42 and 44
 * both rebuilt to the specification's own sub-topics; so does this one. Its block-3 clause "cost
 * vs differentiation" is `specGap-08`, built at 5b (see util).
 *
 * `topFix-02` asks to "demote Ansoff and PESTLE to one-paragraph 'link to Unit 3' callouts". Both
 * are Unit 3 tools (3.3.1 · 2a and 4a), but the GLOBAL use of Ansoff is 4.3.3 · 1d (`:1435`) — a
 * different Unit 4 section, `global-marketing` (packet 55). So each gets ONE sentence, carrying its
 * topic numbers, inside the subsection where a student would otherwise reach for it (the country
 * factors), and nothing more. The runner holds the budget.
 */
import {
  SECTION, subId, id, FIRM, usd, usdm, units, fxu, rate, pct, num,
  MARKET_FACTORS, LOCATION_FACTORS,
} from './_packet47-util.mjs';

const F = FIRM;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const flow = (resultType, steps, result) => ({ type: 'flow', resultType, steps: steps.map(([title, subtitle]) => ({ title, subtitle })), result });

export const B1 = 'Conditions That Prompt Trade';
export const B2 = 'Assessing a Country as a Market';
export const B3 = 'Assessing a Country as a Production Location';
export const B4 = 'Global Mergers, Takeovers and Joint Ventures';
export const B5 = 'Global Expansion and Uncertainty';

/* ══ Chapter 1 — Conditions that prompt trade (4.3.2 · 1a-1d) ════════════ */

const pushFactors = sub('push-factors', {
  title: 'Push Factors: Saturated Markets and Competition',
  keyIdea: 'A push factor is a condition at home that drives a business to look abroad: a market that has stopped growing, or competition that squeezes its share and margins.',
  body: [
    p(`A **push factor** comes from the home market and makes staying there less attractive. There are two to know.`),
    p(`A **saturated market** is one where almost everyone who wants the product already owns it, so sales can only come from replacement or from taking customers off rivals. ${F.name}, a ${F.homeAdj} appliance maker, has sold ${units(F.homeSales, F.products)} a year at home for three years running. Its factory could make more, but the home market will not buy more.`),
    p(`**Competition** pushes in a different way. When new rivals arrive, or existing ones cut prices, a firm's share and its margin both come under pressure at home. Selling abroad lets it grow where it is not fighting the same rivals for the same customers, and it keeps the factory busy when home orders are being lost.`),
    p(`The two often arrive together: a saturated market is exactly where firms fight hardest over the customers who are left.`),
  ],
  realExample: { emoji: '🍚', text: `${F.name}'s home sales have been flat at ${units(F.homeSales)} a year, and two low-priced importers have taken space on the same supermarket shelves. Both push factors are present at once.` },
  misconception: `Students treat any reason for going abroad as a push factor. A push factor is a problem AT HOME; an opportunity ABROAD, such as a large and growing market, is a pull factor. The same decision can have both, and a good answer says which is which.`,
  examMatters: `When a case says sales are "flat" or "mature", name the push factor as a saturated market and explain what it means for growth, rather than only saying the firm "wants more sales".`,
  recall: {
    type: 'classify',
    prompt: 'Sort each situation by the push factor it shows: saturated market or competition.',
    groups: [
      { name: 'Saturated market', items: ['Nine in ten homes already own a washing machine', 'A soap brand has sold the same volume for five years', 'Mobile phone sales at home are now only replacements'], why: 'Demand has reached its ceiling, so extra sales at home can only be taken from someone else.' },
      { name: 'Competition', items: ['A new rival halves its prices on the same shelves', 'Two importers win the supermarket contract a firm used to hold', 'A local rival opens a larger factory next door'], why: 'The pressure comes from other sellers taking share or forcing prices down, not from demand having stopped growing.' },
    ],
  },
});

const pullFactors = sub('pull-factors', {
  title: 'Pull Factors: Sales, Profit, Risk and Scale',
  keyIdea: 'A pull factor is an opportunity abroad that draws a firm in: more sales and profit, risk spread across markets, and lower average costs from producing on a larger scale.',
  body: [
    p(`A **pull factor** is the attraction of the foreign market itself. There are two pairs to know.`),
    p(`**Increased sales and profitability.** A new market adds customers the home market no longer has. ${F.name} plans to export ${units(F.exportSales, F.products)} a year at ${usd(F.exportPrice)} each after freight. Its profit rises from ${usdm(F.profitHome)} to ${usdm(F.profitTotal)}, because the extra sales carry no extra fixed cost.`),
    p(`**Economies of scale.** Fixed costs of ${usdm(F.fixed)} spread over ${units(F.homeSales)} units are $12 a cooker; over ${units(F.totalSales)} they are $8. With variable cost at ${usd(F.variable)}, average cost falls from ${usd(F.avgHome)} to ${usd(F.avgTotal)} — on every cooker, including those sold at home.`),
    p(`**Risk spreading.** A firm that sells in one country depends on one economy. If home sales fall ${pct(F.downturn)} in a downturn and exports hold up, ${F.name}'s total sales fall by ${pct(F.spreadFallPct)} rather than ${pct(F.downturn)}. Markets that do not move together cushion each other.`),
  ],
  realExample: { emoji: '📈', text: `A juice maker in Nigeria starts selling in Ghana. The extra volume lets it run its bottling line on a second shift, which cuts the cost of every bottle it sells at home too.` },
  misconception: `Students write that economies of scale make the EXPORTED units cheaper. They make every unit cheaper, because the fixed cost is shared by all of them — which is why exporting can strengthen a firm's position in its home market as well.`,
  examMatters: `Profitability is a pull factor only if the extra revenue exceeds the extra cost of serving the market. Show the arithmetic where the case gives it, and say what could stop the gain arriving.`,
  recall: {
    type: 'fillin',
    prompt: 'Decide whether each reason is a push factor or a pull factor:',
    template: [
      'A paint maker goes abroad because shoppers at home stopped buying more paint: a ___ factor.',
      'A paint maker goes abroad because a larger output will lower its cost per tin: a ___ factor.',
    ],
    answers: ['push', 'pull'],
    hints: ['the problem is in the home market', 'the attraction is what the move offers'],
    distractors: ['cost', 'risk'],
  },
});

const offshoring = sub('off-shoring-and-outsourcing', {
  title: 'Cost Competitiveness: Off-shoring and Outsourcing',
  keyIdea: 'Off-shoring moves an activity to another country; outsourcing hands it to another firm. Either can cut costs, and a firm can do both at once.',
  body: [
    p(`**Cost competitiveness** is the ability to produce at a cost that lets a firm match or beat rivals' prices. Two routes to it cross borders.`),
    p(`**Off-shoring** is about LOCATION: the activity moves to another country, and the firm may still own it. **Outsourcing** is about OWNERSHIP: another business is paid to do it, at home or abroad. When a firm pays a foreign company to do the work, it has done both.`),
    p(`${F.name}'s assembly labour costs ${usd(F.labourHome)} a cooker at home and ${usd(F.labourAbroad)} in a neighbouring country, plus ${usd(F.freightAssembly)} to ship the cooker back. Off-shoring assembly saves ${usd(F.offshoreSaving)} a cooker — about a sixth of the ${usd(F.avgTotal)} average cost.`),
    p(`The saving is not free. Distance slows the response to a fault, quality is harder to watch, and an outsourced supplier may also work for rivals.`),
  ],
  realExample: { emoji: '🧵', text: `A Pakistani shirt brand keeps design in Lahore, off-shores cutting to its own plant in Bangladesh, and outsources its customer helpline to a call-centre firm in the Philippines.` },
  misconception: `Students use off-shoring and outsourcing as synonyms. A firm that builds its own factory abroad has off-shored but not outsourced; a firm that hires a local cleaning contractor has outsourced but not off-shored. Test each case on the two questions: where, and who.`,
  examMatters: `If the case gives unit costs, net the freight and any extra quality cost off the labour saving before calling the move "cheaper". The net figure is the cost competitiveness gained.`,
  recall: {
    type: 'fillin',
    prompt: 'Name what each move is — off-shoring or outsourcing:',
    template: [
      'A toy firm shuts its home factory and runs its own plant in Vietnam instead: ___.',
      'A hotel group at home pays a local laundry company to wash all its sheets: ___.',
    ],
    answers: ['off-shoring', 'outsourcing'],
    hints: ['the work has crossed a border but is still the firm\'s own', 'another business now does the work, in the same country'],
    distractors: ['exporting', 'insourcing'],
  },
});

const plc = sub('extending-the-product-life-cycle', {
  title: 'Extending the Product Life Cycle Abroad',
  keyIdea: 'A product in decline at home can still be new somewhere else, so launching it abroad keeps its sales going and earns more from what was already spent developing it.',
  body: [
    p(`Every product passes through introduction, growth, maturity and decline. What stage it is in depends on the market: a model that most homes in one country already own may be something few homes own in another.`),
    p(`${F.name}'s basic single-pot cooker is in decline at home as customers trade up to multi-cookers. In Belmar, where far fewer households own a cooker at all, the same model is at the start of its growth.`),
    p(`Selling it there **extends the product life cycle**: sales abroad rise while sales at home fall, so the model's total sales last years longer. The development, tooling and design costs were paid long ago, so each extra year of sales earns a margin on an investment that is already covered.`),
    p(`The limit is fit. A model that is declining because it is out of date may meet the same judgement abroad, and it may need changes to plugs, voltage or labelling before it can be sold.`),
  ],
  realExample: { emoji: '📺', text: `A Kenyan maker of basic feature phones sees sales fall at home as smartphones take over, and finds buyers for the same handset in rural markets across the region.` },
  misconception: `Students think extending the life cycle means the product has been improved. The product can be exactly the same; what has changed is the market. The extension comes from finding customers for whom it is still new.`,
  examMatters: `Say which stage the product is in at home and which it is in abroad. The whole argument rests on the two being different, so an answer that does not name both has not made it.`,
  recall: {
    type: 'reorder',
    prompt: 'Put these in the order they happen, from the decline at home to the longer life:',
    criterion: 'chronological: each stage follows the one before it in time',
    correctOrder: [
      'Customers at home switch to newer models and the product\'s sales there start to fall',
      'A search begins for a country where few households yet own the product',
      'Launched there, the same model\'s sales abroad begin to grow',
      'Rising sales abroad offset falling sales at home, so the model sells for years longer',
    ],
    why: [
      'Decline at home is what starts the search.',
      'The firm needs a market where the product is at an earlier stage.',
      'Launching there puts the product into growth in that market.',
      'Growth abroad set against decline at home is what extends the life cycle.',
    ],
  },
});

/* ══ Chapter 2 — Assessing a country as a market (4.3.2 · 2a-2b) ═════════ */

const incomeAndEase = sub('income-and-ease-of-doing-business', {
  title: 'Disposable Income and Ease of Doing Business',
  keyIdea: 'Whether people can afford the product now, whether they will be able to afford it soon, and how much time and cost it takes to trade there legally.',
  body: [
    p(`Five factors are used to judge a country as a market: ${MARKET_FACTORS.join(', ')}. The first two decide whether there are customers and whether they can be reached at a reasonable cost.`),
    p(`**Levels and growth of disposable income.** The level says how many households can afford the product today; the growth says how many will be able to soon. Average household disposable income in Tarsia is ${usd(F.tarsia.income)}, growing ${pct(F.tarsia.growth)} a year. In Belmar it is ${usd(F.belmar.income)}, growing ${pct(F.belmar.growth)}. After ${F.years} years that is ${usd(F.tarsia10)} against ${usd(F.belmar10)}: Tarsia is richer, but Belmar is where the number of new buyers is rising fastest.`),
    p(`**Ease of doing business** is how simple it is to register a company, obtain import permits, enforce a contract and get paid. Every delay is a cost before a single sale is made, and a slow court system makes an unpaid invoice hard to recover.`),
  ],
  realExample: { emoji: '🏪', text: `A Malaysian snack firm compares two neighbours: in one, an import permit takes a week; in the other, three months and several agents' fees. It starts in the first, although the second has more people.` },
  misconception: `Students read a high income level as the whole answer. A rich market that is saturated offers fewer new customers than a poorer market where incomes are climbing past the point at which the product becomes affordable.`,
  examMatters: `Compare the two countries on the same factor, using the figures given, and say which factor matters most for THIS product. A cheap staple and a luxury good weigh income very differently.`,
  recall: {
    type: 'match',
    prompt: 'Match each piece of evidence to the market factor it tells a firm about:',
    pairs: [
      { left: 'Wages after tax have risen 7% a year for a decade', right: 'Growth of disposable income', why: 'It measures how fast spending power is rising, not how high it is now.' },
      { left: 'Half of households earn enough to buy the product today', right: 'Level of disposable income', why: 'It is a snapshot of who can afford it now.' },
      { left: 'Registering a company takes nine separate permits', right: 'Ease of doing business', why: 'It is the time and cost of trading there legally.' },
    ],
  },
});

const infraStabilityRates = sub('infrastructure-stability-and-exchange-rates', {
  title: 'Infrastructure, Political Stability and Exchange Rates',
  keyIdea: 'Can goods be delivered reliably, will the rules stay the same long enough to earn a return, and what will the foreign revenue be worth once it is changed back?',
  body: [
    p(`**Infrastructure** is the roads, ports, power and telecoms a market runs on. Poor roads raise delivery costs and damage goods; weak internet limits online sales; an unreliable power supply limits how many households can use an electrical product at all.`),
    p(`**Political stability** is the confidence that laws, taxes and trade rules will not change suddenly. Instability raises the risk of new import restrictions, unrest that closes shops, or a government that stops honouring contracts. A firm facing that risk wants a higher expected return before it commits.`),
    p(`**Exchange rates** decide what the foreign revenue is worth at home. If Belmar's currency is expected to weaken against the dollar, every sale made there will bring back fewer dollars unless prices are raised — and raising them loses customers.`),
    p(`These factors also shape a PESTLE analysis, the Unit 3 tool for the external environment (3.3.1); here each is judged on its own, with the evidence in front of you.`),
  ],
  realExample: { emoji: '⚡', text: `An air-conditioner maker finds strong demand in a hot, fast-growing market, but power cuts there run to several hours a day. It sells solar-ready models first.` },
  misconception: `Students assume a volatile exchange rate always makes a market unattractive. What matters is the direction and whether the firm can manage it — invoicing in its own currency, or buying inputs in the same currency it earns.`,
  examMatters: `Link each factor to a cost or a risk for the specific firm. "Political instability is bad" earns little; saying what could happen to THIS firm's sales or assets, and how likely it is, is the argument.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each finding by the market factor it belongs under: infrastructure, political stability or exchange rates.',
    groups: [
      { name: 'Infrastructure', items: ['Only one port can take container ships', 'Mobile coverage outside the capital is patchy'], why: 'Both are about the physical systems goods and information move through.' },
      { name: 'Political stability', items: ['An election may bring a party that promises to nationalise retailers', 'Import rules have been rewritten three times this decade'], why: 'Both are about whether the rules the firm plans around will last.' },
      { name: 'Exchange rates', items: ['The local currency has lost a fifth of its value against the dollar', 'Forecasters expect the currency to strengthen next year'], why: 'Both change what revenue earned there is worth once converted.' },
    ],
  },
});

const fiveForces = sub('porters-five-forces-in-a-new-market', {
  title: 'Applying Porter\'s Five Forces to a Potential Market',
  keyIdea: 'Before entering, a firm can judge how profitable the market is likely to be from five competitive pressures, not just from how big it is.',
  body: [
    p(`**Application of Porter's five forces in assessing potential markets** means rating each force for a market before entering it. The five forces are rivalry among existing firms, the threat of new entrants, the bargaining power of buyers, the bargaining power of suppliers and the threat of substitutes. The stronger they are, the less profit a newcomer can expect.`),
    p(`Applied to ${F.name} and Belmar: **rivalry** is moderate, with two local brands; the **threat of new entrants** is high, because tariffs on cookers are low and others could follow; **buyer power** is high, since three supermarket chains sell most small appliances and can demand low prices; **supplier power** is low, because ${F.name} brings its own components; the **threat of substitutes** is moderate, as many households still cook rice in a pot on the stove.`),
    p(`The result is a market with growing demand but thin margins unless ${F.name} can reach customers without depending on the three chains.`),
  ],
  realExample: { emoji: '🛒', text: `A Gulf dairy firm considering a new market finds just two retailers controlling most sales. Strong buyer power, not the size of the market, is what decides that its margins there would be thin.` },
  misconception: `Students list the five forces and stop. The tool is only useful when each force is rated for the particular market and the ratings are turned into a conclusion about likely profitability.`,
  examMatters: `Pick the two or three forces the case gives evidence for, rate each, and say what they imply for price and profit in that market. A complete list with no ratings is description.`,
  recall: {
    type: 'match',
    prompt: 'Match each finding about a new market to the force it strengthens:',
    pairs: [
      { left: 'Two retail groups buy almost every fridge sold in the country', right: 'Bargaining power of buyers', why: 'A few large customers can push the price they pay down.' },
      { left: 'Any foreign maker can start selling there next month', right: 'Threat of new entrants', why: 'Low barriers make it easy for others to follow the firm in.' },
      { left: 'Street stalls sell cooked rice cheaply on every corner', right: 'Threat of substitutes', why: 'A different product meets the same need.' },
      { left: 'Only one firm makes the heating element the cooker needs', right: 'Bargaining power of suppliers', why: 'A sole supplier can raise its price.' },
    ],
  },
});

/* ══ Chapter 3 — Assessing a country as a production location (4.3.2 · 3a) ═ */

const costsAndLabour = sub('costs-and-labour-force', {
  title: 'Costs of Production and the Labour Force',
  keyIdea: 'The cheapest wage is not the cheapest place to produce: what matters is the cost of each finished unit delivered to the customer, and whether the right workers exist.',
  body: [
    p(`Nine factors are used to judge a country as a place to produce: ${LOCATION_FACTORS.join(', ')}. The first two decide what each unit will cost to make.`),
    p(`**Costs of production** include labour, materials, energy, rent and the cost of getting the product to market. ${F.name} compares two sites for a new factory. Inside the trade bloc its main customers belong to: labour ${usd(F.siteIn.labour)}, other costs ${usd(F.siteIn.other)}, freight ${usd(F.siteIn.freight)} — ${usd(F.landedIn)} a cooker delivered. Outside the bloc: labour ${usd(F.siteOut.labour)}, other costs ${usd(F.siteOut.other)}, a ${pct(F.siteOut.tariffPct)} tariff of ${usd(F.tariffOut)} and freight ${usd(F.siteOut.freight)} — ${usd(F.landedOut)}. The lower wage loses.`),
    p(`**Skills and availability of labour force.** A low wage is no saving if workers cannot be found, or need months of training, or leave for better-paid jobs. Output per worker matters as much as pay per worker.`),
  ],
  realExample: { emoji: '🏭', text: `A garment exporter pays less per hour in its new country, but output per machinist is lower and staff turnover is high. After training costs, a finished shirt costs more than it did before the move.` },
  misconception: `Students equate low wages with low costs. Labour cost per UNIT is wage divided by output per worker, and it is only one line of the delivered cost; tariffs and freight can wipe out a wage gap.`,
  examMatters: `When a case gives costs for two sites, add every line to a delivered cost per unit before comparing. Then ask whether the cheaper site can supply the workers the plan needs.`,
  recall: {
    type: 'fillin',
    prompt: 'Work out the delivered cost of one unit at each site:',
    template: [
      'Site one: labour $3, materials $9, a 10% tariff on those two, freight $2. Delivered cost: $___.',
      'Site two, inside the bloc: labour $5, materials $9, no tariff, freight $1. Delivered cost: $___.',
    ],
    answers: ['15.20', '15'],
    hints: ['add a tenth to twelve, then the freight', 'no duty to add, just the three lines'],
    distractors: ['14', '12'],
  },
});

const blocIncentivesInfra = sub('trade-bloc-incentives-and-infrastructure', {
  title: 'Trade Bloc Location, Government Incentives and Infrastructure',
  keyIdea: 'Producing inside a trade bloc avoids its tariffs; incentives cut the outlay; infrastructure decides whether inputs arrive and output leaves on time.',
  body: [
    p(`**Location in trade bloc.** Goods made inside a trade bloc move between its members without tariffs, while goods from outside pay the common external tariff. That is the ${usd(F.tariffOut)} a cooker that made ${F.name}'s cheaper-labour site the dearer one.`),
    p(`**Government incentives.** Governments compete for factories with grants, tax holidays, cheap land and special economic zones. A ${usdm(F.grant)} grant towards ${F.name}'s ${usdm(F.outlay)} factory cuts the money it must find by a quarter. Incentives can end, though, and some come with conditions on local hiring or exporting.`),
    p(`**Infrastructure.** A factory needs reliable power, water, roads and a port. Every power cut stops a production line; every day a container waits at a congested port is a day of stock tied up and a customer waiting.`),
  ],
  realExample: { emoji: '🚢', text: `An electronics assembler chooses a site next to a new deep-water port in a special economic zone: no duty on imported parts, five years without profit tax, and ships leaving twice a week.` },
  misconception: `Students treat incentives as free money that settles the decision. An incentive lowers the cost of one year or one outlay; the factory will run for twenty. A site chosen for a grant and nothing else can cost far more than the grant over its life.`,
  examMatters: `Weigh the incentive against the lasting factors. The strongest judgements say how long the advantage lasts and what happens to the site's case once it has gone.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each feature of a possible factory site into the factor it is evidence of: trade bloc, government incentives or infrastructure.',
    groups: [
      { name: 'Location in trade bloc', items: ['Output can be sold to ten neighbouring countries duty-free', 'Parts from outside the region pay a 12% common tariff'], why: 'Both depend on which side of the bloc\'s border the factory is on.' },
      { name: 'Government incentives', items: ['The state waives import duty on the plant\'s machinery', 'The state pays for half of the land'], why: 'Both are offers made by a government to attract the investment.' },
      { name: 'Infrastructure', items: ['The grid has three power cuts a week', 'A new rail line runs to the port'], why: 'Both are about the physical networks the factory depends on.' },
    ],
  },
});

const stabilityResourcesReturn = sub('stability-resources-and-return-on-investment', {
  title: 'Ease of Business, Stability, Natural Resources and Return',
  keyIdea: 'A factory is a long commitment, so the rules must last, the inputs must be close, and the likely return has to justify the risk of putting money in one country.',
  body: [
    p(`**Ease of doing business** and **political stability** matter more for a factory than for a market, because a factory cannot be withdrawn quickly. Permits, inspections and the security of the firm's property all bear on it for years.`),
    p(`**Natural resources.** A firm whose product uses a raw material heavily — timber, minerals, cotton, water — cuts transport costs and supply risk by producing near the source.`),
    p(`**Likely return on investment** brings the other factors together. ${F.name}'s factory is expected to earn ${usdm(F.annualReturn)} a year on an outlay of ${usdm(F.outlay)}: a return of ${pct(F.roi)} a year. The ${usdm(F.grant)} grant lifts it to ${pct(F.roiGrant)}, because the same profit is earned on ${usdm(F.outlay - F.grant)} of the firm's own money.`),
    p(`The word that matters is **likely**. A higher expected return in an unstable country may be worth less than a lower one in a stable country, because it is less likely to be earned.`),
  ],
  realExample: { emoji: '🌲', text: `A furniture maker builds its new plant close to forests it can buy timber from, accepting slower permits there because the raw material no longer has to cross a border.` },
  misconception: `Students compare return on investment figures as if they were certain. They are forecasts: the return has to be read alongside the risks that could stop it arriving, especially political ones.`,
  examMatters: `Treat the return figure as the conclusion the other factors feed into, not as a separate point. Say which factor makes the forecast more or less reliable.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each finding about a possible factory country into the factor it is evidence of: ease of doing business, political stability or natural resources.',
    groups: [
      { name: 'Ease of doing business', items: ['A building permit takes fourteen months and a dozen separate approvals', 'A new company can be registered online in a single day'], why: 'Both are about the time and cost of meeting the rules, whoever is in power.' },
      { name: 'Political stability', items: ['The army has taken power twice in the last ten years', 'Three governments have fallen in the last four years'], why: 'Both are about whether the government, and the rules it sets, will last as long as the factory.' },
      { name: 'Natural resources', items: ['Cotton is grown within fifty kilometres of the site', 'Every tonne of timber the plant needs would have to be shipped in'], why: 'Both are about how close the raw materials are to where the product is made.' },
    ],
  },
});

/* ══ Chapter 4 — Reasons for global mergers, takeovers or JVs (4.3.2 · 4a-4j) ═ */

const whatTheyAre = sub('mergers-takeovers-and-joint-ventures', {
  title: 'Mergers, Takeovers and Joint Ventures Across Borders',
  keyIdea: 'A merger joins two firms into one, a takeover puts one firm under another\'s control, and a joint venture creates a new business that both partners own.',
  body: [
    p(`Growing abroad by building everything from scratch is slow. Combining with a business that already operates there is faster, and there are three ways to do it.`),
    p(`A **merger** is two firms agreeing to combine into a single business, usually with the owners of both sharing the new company. A **takeover** (an acquisition) is one firm buying enough of another's shares to control it; the target may or may not agree. After either, the two businesses are one.`),
    p(`A **joint venture** is different: two or more firms each put in money and skills to create a NEW business, which they own and run together, while each parent carries on separately. Nothing is bought outright, and the venture can be limited to one product or one country.`),
    p(`So mergers and takeovers are permanent and total; a joint venture is shared and can be partial. That difference is what the reasons in this chapter turn on.`),
  ],
  realExample: { emoji: '🤝', text: `A Saudi builder and a Korean engineering firm form a joint venture to bid for desalination plants. Each keeps its own business; the venture owns only the new plants.` },
  misconception: `Students call any cross-border deal a merger. If one firm pays to control the other, it is a takeover; if a new company is set up with both as owners, it is a joint venture. The word decides who controls what afterwards.`,
  examMatters: `Say which of the three the case describes before giving reasons for it. Several reasons — such as sharing costs — apply to a joint venture far more than to a takeover.`,
  recall: {
    type: 'match',
    prompt: 'Match each arrangement to what exists once the deal is done:',
    pairs: [
      { left: 'Merger', right: 'One combined company owned by both sets of shareholders', why: 'Both firms agree to become a single business together.' },
      { left: 'Takeover', right: 'One firm now controls the other through its shares', why: 'Control passes to the buyer, whether or not the target agreed.' },
      { left: 'Joint venture', right: 'A new business owned by two firms that both carry on', why: 'The partners stay separate and share only the venture.' },
    ],
  },
});

const growthReasons = sub('reasons-to-grow-and-compete', {
  title: 'Reasons: Scale, New Markets, Brands and Competitiveness',
  keyIdea: 'Firms combine across borders to spread risk and gain scale, to get inside new markets and trade blocs, to acquire brands and patents, and to stay globally competitive.',
  body: [
    p(`**Spreading risk and economies of scale.** Two firms selling in different countries are less exposed to one economy, and the combined output spreads fixed costs further — the same logic as exporting, reached in one step.`),
    p(`**Entering new markets/trade blocs.** Buying a firm inside a trade bloc gives the buyer local production, so its output sells inside the bloc without the common external tariff, and it gets the target's customers on day one.`),
    p(`**Acquiring national/international brand names/patents.** A brand takes decades to build and a patent cannot be copied. Buying the firm that owns them is often the only way to get them.`),
    p(`**Maintaining/increasing global competitiveness.** When rivals are growing to global scale, a firm that stays national may find its costs and its research budget too small to keep up; combining is a way to stay in the race.`),
  ],
  realExample: { emoji: '🏷️', text: `A Chinese appliance group buys a long-established European brand. It gains a name shoppers there already trust, patents on its motors, and factories inside the European Union.` },
  misconception: `Students assume a bigger combined firm is automatically more competitive. Scale lowers some costs, but combining two firms with different cultures and systems can raise others, and many cross-border deals fail to deliver the savings promised.`,
  examMatters: `Tie the reason to evidence in the case: a named brand, a patent, a bloc the buyer is outside. A reason with no link to the case is a list item.`,
  recall: {
    type: 'match',
    prompt: 'Match each deal to the reason for it that the case points to:',
    pairs: [
      { left: 'A tyre maker outside a trade bloc buys a rival with factories inside it', right: 'Entering new markets and trade blocs', why: 'Producing inside the bloc avoids its common external tariff.' },
      { left: 'A drinks firm buys a company for its famous century-old label', right: 'Acquiring a brand name', why: 'The brand is the asset; it could not be built quickly.' },
      { left: 'A drug firm buys a start-up that owns a new vaccine formula', right: 'Acquiring patents', why: 'The protected formula can only be obtained by owning its holder.' },
      { left: 'Two regional carmakers combine to match the research budgets of global rivals', right: 'Maintaining global competitiveness', why: 'Neither alone could keep pace with rivals of global scale.' },
    ],
  },
});

const accessReasons = sub('reasons-supplies-knowledge-and-networks', {
  title: 'Reasons: Supplies, Local Knowledge and Distribution',
  keyIdea: 'Some deals are about what the partner already has: secure supplies, knowledge of the local market, and supply chains or distribution networks that took years to build.',
  body: [
    p(`**Securing resources/supplies.** A firm that depends on one raw material or component can buy or partner with the business that produces it, so rivals cannot outbid it and a shortage does not stop its own production.`),
    p(`**Making use of local knowledge.** A local firm knows what customers there want, how to deal with officials, and which suppliers to trust. That is expensive to learn from outside and is a common reason for a joint venture rather than going alone.`),
    p(`**Accessing supply chains/distribution networks.** A supply chain is the set of suppliers, warehouses and transport links that gets inputs in and products out. A distribution network is the wholesalers, retailers and delivery routes that get a product to customers. A firm entering Belmar alone would need to persuade shop by shop; a partner that already supplies ten thousand outlets gets the cooker onto their shelves at once.`),
  ],
  realExample: { emoji: '🚚', text: `A Kenyan tea packer forms a joint venture with an Egyptian food wholesaler, whose trucks already visit thousands of grocery stores the packer could never reach on its own.` },
  misconception: `Students treat distribution as something any firm can quickly set up. Building relationships with thousands of retailers, and the trucks and warehouses to serve them, can take longer than any other part of entering a market.`,
  examMatters: `Name the specific asset the partner brings and why the firm could not quickly build it itself. That comparison is what turns a reason into an argument.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each deal by the reason behind it: securing supplies, local knowledge, or distribution networks.',
    groups: [
      { name: 'Securing resources/supplies', items: ['A chocolate maker buys a cocoa cooperative\'s processing plant', 'A battery firm takes a stake in a lithium mine'], why: 'Each makes the buyer\'s input safe from rivals and shortages.' },
      { name: 'Making use of local knowledge', items: ['A foreign bank partners with a local lender that understands the regulators', 'A fashion chain teams up with a local firm that knows which styles sell'], why: 'The partner supplies understanding the newcomer lacks.' },
      { name: 'Accessing distribution networks', items: ['A soft-drink firm buys a wholesaler that serves ten thousand kiosks', 'A cosmetics brand partners with a chain of pharmacies'], why: 'The partner already reaches the customers.' },
    ],
  },
});

const defensiveReasons = sub('reasons-competition-law-and-shared-risk', {
  title: 'Reasons: Less Competition, Legal Requirements, Shared Costs',
  keyIdea: 'A deal can remove a rival, it can be the only legal way to operate in a country, and it can split the cost and risk of a project too big for one firm.',
  body: [
    p(`**Reducing competition.** Buying a rival removes it. With fewer sellers, the combined firm faces less pressure on price, although competition authorities may block a deal that goes too far.`),
    p(`**Government or legal requirement.** Some countries do not allow a foreign firm to operate in certain industries unless it has a local partner, or they cap foreign ownership at a share such as 49%. In those markets, a joint venture is not one option among several; it is the only legal way in.`),
    p(`**Sharing costs/risks.** A new plant, mine or research programme may cost more than one firm wants to risk. In a joint venture each partner pays part of the cost and bears part of any loss — at the price of sharing the profit and the decisions.`),
  ],
  realExample: { emoji: '⚖️', text: `A European retailer wants to open stores in a country where foreign firms may own at most half of a retail business. It forms a joint venture with a local partner that holds the other half.` },
  misconception: `Students present joint ventures as always the safer choice. Shared control means slower decisions and disputes over strategy and profit, and a partner may learn enough to become a competitor.`,
  examMatters: `If the case mentions an ownership limit or a rule about local partners, that is the reason — the firm has no choice. Recognising a legal requirement, rather than listing advantages, is what the evidence points to.`,
  recall: {
    type: 'fillin',
    prompt: 'Name the reason behind each deal:',
    template: [
      'A cement firm buys the only other kiln in the region so it can stop cutting its prices: ___.',
      'A law says foreigners may own no more than 49% of a telecoms firm, so an operator takes a local partner: ___.',
      'Two oil firms each pay half of a deep-sea well that would be too risky for either alone: ___.',
    ],
    answers: ['reducing competition', 'legal requirement', 'sharing costs'],
    hints: ['one fewer seller to undercut it', 'the state has left no alternative', 'splitting the bill and the possible loss'],
    distractors: ['local knowledge', 'economies of scale'],
  },
});

/* ══ Chapter 5 — Global expansion and uncertainty (4.3.2 · 5a-5b) ═════════ */

const exchangeExporters = sub('exchange-rates-and-exporters', {
  title: 'Exchange Rate Movements and Exporters',
  keyIdea: 'When the home currency appreciates, exports become dearer abroad or earn less at home; when it depreciates, the reverse. The firm chooses which of the two it absorbs.',
  body: [
    p(`Movements in exchange rates have an impact on businesses that sell abroad. An exchange rate is the price of one currency in another; ${F.name} sells a ${usd(F.price)} cooker in Belmar at ${rate(F.e0)}, so the Belmar price is ${fxu(F.foreignPrice0)}.`),
    p(`The dollar **appreciates** to ${rate(F.e1)}, a rise of ${pct(F.appreciationPct)}. ${F.name} now has two choices. It can keep its ${usd(F.price)} price, and the Belmar price rises to ${fxu(F.foreignPrice1)}, so buyers turn to local brands. Or it can hold the Belmar price at ${fxu(F.foreignPrice0)}, and each sale now brings back only ${usd(F.heldReceipt)}. Either way the appreciation costs it sales or margin.`),
    flow('bad', [
      ['The home currency appreciates', 'each dollar buys more of the foreign currency'],
      ['The export price abroad rises, or the margin shrinks', 'the firm chooses which'],
      ['Sales volume or profit per unit falls', 'price competitiveness abroad is weaker'],
    ], 'An appreciation hurts exporters; a depreciation helps them, by the same mechanism in reverse.'),
    p(`How much it hurts depends on how sensitive Belmar's buyers are to price, and on whether rivals face the same change.`),
  ],
  realExample: { emoji: '💱', text: `A Thai rice exporter sees its currency strengthen by a tenth in a year. It holds its prices abroad to keep customers, and its profit per tonne falls instead.` },
  misconception: `Students write that a strong currency is good for business. It is good for importers and bad for exporters; a firm that does both needs to net the two effects off before deciding.`,
  examMatters: `Show the new foreign price or the new home-currency receipt with the figures given, then say which option the firm is likely to take and why.`,
  recall: {
    type: 'reorder',
    prompt: 'Put the effects of a rise in the home currency in causal order, from the rate change to the firm\'s sales:',
    criterion: 'cause to effect: each step is caused by the one before it',
    correctOrder: [
      'The dollar rises from 4 to 5 units of the buyer\'s currency',
      'An unchanged dollar price now costs the overseas buyer more of their currency',
      'Customers abroad switch to cheaper local cookers',
      'Fewer units are sold there by the exporter',
    ],
    why: [
      'The appreciation is the starting cause.',
      'Converted at the new rate, the same dollar price is higher abroad.',
      'A higher price abroad makes rivals relatively cheaper.',
      'Lost customers show up as a fall in export volume.',
    ],
  },
});

const exchangeImporters = sub('exchange-rates-importers-and-profits', {
  title: 'Exchange Rate Movements, Imported Inputs and Overseas Profits',
  keyIdea: 'An appreciation makes imported inputs cheaper but shrinks the home value of profits earned abroad; a depreciation does the opposite. Most global firms feel both.',
  body: [
    p(`The same movement has a second side. ${F.name} buys a heating element invoiced at ${fxu(F.componentUnits)}. At ${rate(F.e0)} that is ${usd(F.componentCost0)}; at ${rate(F.e1)} it is ${usd(F.componentCost1)}. The appreciation that hurt its exports lowers its costs.`),
    p(`Profit earned by a subsidiary abroad is converted back too. A Belmar operation earning ${fxu(F.subsidiaryProfitUnits)} is worth ${usdm(F.repatriated0)} at the old rate and ${usdm(F.repatriated1)} at the new one, although nothing about its performance has changed.`),
    p(`Firms reduce the uncertainty in several ways: buying inputs in the currency they earn in, producing inside the market they sell to, agreeing a rate in advance with a bank, or invoicing in their own currency so the buyer carries the risk. None of these changes the rate; each changes who bears it.`),
  ],
  realExample: { emoji: '🔌', text: `An Indian electronics firm imports chips priced in dollars and sells phones in rupees. When the rupee weakens, its costs rise while its prices are fixed in shops, and its margin narrows.` },
  misconception: `Students treat the exchange rate as affecting only prices abroad. A firm's costs move too whenever it imports, and the value of its foreign profit moves whenever it converts it home.`,
  examMatters: `For a firm that exports and imports, work out both effects before judging the net impact. The side with the larger sums decides whether the movement helps or hurts overall.`,
  recall: {
    type: 'fillin',
    prompt: 'Work out the home-currency cost of the imported part:',
    template: [
      'A fabric roll is invoiced at 90 units of the supplier\'s currency.',
      'At $1 = 3 units it costs $___.',
      'After the dollar strengthens to $1 = 4.5 units it costs $___.',
    ],
    answers: ['30', '20'],
    hints: ['ninety shared out at three per dollar', 'the same ninety at the stronger rate'],
    distractors: ['270', '405', '25'],
  },
});

const skillShortages = sub('skill-shortages-and-competitiveness', {
  title: 'Skill Shortages and International Competitiveness',
  keyIdea: 'When the skills a firm needs are scarce, wages and delays rise, so its costs climb and its quality or innovation can slip — weakening it against rivals in other countries.',
  body: [
    p(`**International competitiveness** is a firm's ability to win sales against rivals from other countries. It has two sides: **price competitiveness**, which rests on cost competitiveness, and **non-price competitiveness** — differentiating the product through quality, design, reliability and service.`),
    p(`A **skill shortage** is when employers cannot find enough workers with the skills they need. Its impact reaches both sides. On price: firms bid for the few skilled workers, so when technicians are scarce ${F.name}'s technician pay rises from ${usd(F.techWage0)} to ${usd(F.techWage1)} a month, a ${pct(F.techWageRise)} rise that feeds into unit costs. On non-price: unfilled posts delay new models, and less-skilled staff make more faults, so quality and innovation fall behind.`),
    flow('bad', [
      ['Skilled workers are scarce', 'more vacancies than qualified applicants'],
      ['Wages rise and posts go unfilled', 'unit costs up, projects delayed'],
      ['Price and non-price competitiveness weaken', 'rivals abroad win orders'],
    ], 'A firm can respond by training its own staff, recruiting abroad, automating, or moving the work to where the skills are.'),
  ],
  realExample: { emoji: '🛠️', text: `A Nigerian engineering firm cannot hire enough welders. It pays overtime, delays two contracts, and loses a third to a rival in a country with a larger trained workforce.` },
  misconception: `Students treat skill shortages as a cost problem only. The deeper damage is often to non-price competitiveness: a firm that cannot hire designers and engineers falls behind on the quality and new products that let it charge more.`,
  examMatters: `Follow the shortage through to a specific loss of competitiveness — a higher price, a later launch, a quality problem — and then weigh the firm's options for closing the gap.`,
  recall: {
    type: 'classify',
    prompt: 'Sort each effect of a skill shortage by the side of competitiveness it weakens: price or non-price.',
    groups: [
      { name: 'Price competitiveness', items: ['Overtime pay pushes up the cost of each unit', 'Recruiting from abroad adds agency fees to every hire', 'Rising wages for scarce engineers raise the firm\'s costs'], why: 'Each raises the cost of production, which limits how low the price can go.' },
      { name: 'Non-price competitiveness', items: ['A new model launches a year late for lack of designers', 'Faults rise because inexperienced staff fill skilled posts', 'After-sales repairs take weeks longer'], why: 'Each weakens quality, design or service — the ways a firm differentiates itself.' },
    ],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [pushFactors, pullFactors, offshoring, plc],
    takeaway: [
      'Push is a problem at home; pull is an opportunity abroad.',
      'Scale abroad lowers the cost of every unit, including those sold at home.',
      'Off-shoring is where; outsourcing is who. A firm can do both.',
    ],
  },
  {
    title: B2,
    subs: [incomeAndEase, infraStabilityRates, fiveForces],
    takeaway: [
      'Income level says who can buy now; growth says who can buy soon.',
      'Each factor is a cost or a risk for this firm, not a general statement.',
      'Rate the five forces for the market; do not just list them.',
    ],
  },
  {
    title: B3,
    subs: [costsAndLabour, blocIncentivesInfra, stabilityResourcesReturn],
    takeaway: [
      'Compare delivered cost per unit, not wages.',
      'A tariff can cost more than a lower wage saves.',
      'Return on investment is a forecast; judge how likely it is.',
    ],
  },
  {
    title: B4,
    subs: [whatTheyAre, growthReasons, accessReasons, defensiveReasons],
    takeaway: [
      'Merger and takeover make one firm; a joint venture makes a new one.',
      'Ten reasons: tie each one to evidence in the case.',
      'Where the law demands a local partner, the joint venture is not a choice.',
    ],
  },
  {
    title: B5,
    subs: [exchangeExporters, exchangeImporters, skillShortages],
    takeaway: [
      'A rising home currency hurts exporters and helps importers.',
      'Net the export and import effects before judging the impact.',
      'Skill shortages weaken both price and non-price competitiveness.',
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
 * THE LEAF MAP, BY HAND. 33 leaves at `bus_spec.txt:1376-1410` (37 rows in `spec-items.json`).
 * Every ledger id's corrected citation runs through this table rather than through its "4.2.x".
 */
export const LEAF_MAP = {
  'BUS-4.3.2-1a-1': ['push-factors'],
  'BUS-4.3.2-1a-2': ['push-factors'],
  'BUS-4.3.2-1b-1': ['pull-factors'],
  'BUS-4.3.2-1b-2': ['pull-factors'],
  'BUS-4.3.2-1c': ['off-shoring-and-outsourcing'],
  'BUS-4.3.2-1d': ['extending-the-product-life-cycle'],
  'BUS-4.3.2-2a-1': ['income-and-ease-of-doing-business'],
  'BUS-4.3.2-2a-2': ['income-and-ease-of-doing-business'],
  'BUS-4.3.2-2a-3': ['infrastructure-stability-and-exchange-rates'],
  'BUS-4.3.2-2a-4': ['infrastructure-stability-and-exchange-rates'],
  'BUS-4.3.2-2a-5': ['infrastructure-stability-and-exchange-rates'],
  'BUS-4.3.2-2b': ['porters-five-forces-in-a-new-market'],
  'BUS-4.3.2-3a-1': ['costs-and-labour-force'],
  'BUS-4.3.2-3a-2': ['costs-and-labour-force'],
  'BUS-4.3.2-3a-3': ['trade-bloc-incentives-and-infrastructure'],
  'BUS-4.3.2-3a-4': ['trade-bloc-incentives-and-infrastructure'],
  'BUS-4.3.2-3a-5': ['trade-bloc-incentives-and-infrastructure'],
  'BUS-4.3.2-3a-6': ['stability-resources-and-return-on-investment'],
  'BUS-4.3.2-3a-7': ['stability-resources-and-return-on-investment'],
  'BUS-4.3.2-3a-8': ['stability-resources-and-return-on-investment'],
  'BUS-4.3.2-3a-9': ['stability-resources-and-return-on-investment'],
  'BUS-4.3.2-4a': ['reasons-to-grow-and-compete'],
  'BUS-4.3.2-4b': ['reasons-to-grow-and-compete'],
  'BUS-4.3.2-4c': ['reasons-to-grow-and-compete'],
  'BUS-4.3.2-4d': ['reasons-supplies-knowledge-and-networks'],
  'BUS-4.3.2-4e': ['reasons-to-grow-and-compete'],
  'BUS-4.3.2-4f': ['reasons-competition-law-and-shared-risk'],
  'BUS-4.3.2-4g': ['reasons-supplies-knowledge-and-networks'],
  'BUS-4.3.2-4h': ['reasons-competition-law-and-shared-risk'],
  'BUS-4.3.2-4i': ['reasons-supplies-knowledge-and-networks'],
  'BUS-4.3.2-4j': ['reasons-competition-law-and-shared-risk'],
  'BUS-4.3.2-5a': ['exchange-rates-and-exporters', 'exchange-rates-importers-and-profits'],
  'BUS-4.3.2-5b': ['skill-shortages-and-competitiveness'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, TITLED AS THE CHAPTER (`depth.notes-titles` by construction). The
 * live notes duplicated the off-specification entry-mode and Ansoff material (`structure-07`); these
 * cover the specification's own bullets, and carry no misconception field, so none can repeat a
 * subsection's misconception (`structure-08`).
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4.3.2 · 1a-1d',
    keyIdea: 'Push factors at home, pull factors abroad, off-shoring and outsourcing for cost, and a longer life for a product that is new elsewhere.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Push factor</strong> — a condition in the home market that drives a firm abroad: a saturated market, or competition.'),
        def('<strong>Pull factor</strong> — an opportunity abroad: increased sales and profitability, risk spreading and economies of scale.'),
        def('<strong>Off-shoring</strong> — moving an activity to another country. <strong>Outsourcing</strong> — paying another firm to do it.'),
        def('<strong>Extending the product life cycle</strong> — selling a product that is declining at home in a market where it is still new.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Scale: ${usdm(F.fixed)} fixed ÷ ${units(F.homeSales)} = $12 a unit; ÷ ${units(F.totalSales)} = $8. Average cost ${usd(F.avgHome)} → ${usd(F.avgTotal)}.`),
        mech(`Profit: ${usdm(F.profitHome)} → ${usdm(F.profitTotal)} with ${units(F.exportSales)} exports at ${usd(F.exportPrice)}.`),
        mech(`Risk spreading: a ${pct(F.downturn)} fall at home is a ${pct(F.spreadFallPct)} fall in total when a third of sales are abroad.`),
        link('The same move can have a push and a pull behind it; say which is which.'),
      ] },
    ],
    takeaway: ['Push at home, pull abroad.', 'Scale cuts the cost of every unit.', 'Where versus who.'],
  },
  {
    title: B2,
    meta: '4.3.2 · 2a-2b',
    keyIdea: 'Five factors say whether a country is worth selling in; Porter\'s five forces say how much profit it is likely to leave.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Market factors</strong> — ${MARKET_FACTORS.join('; ')}.`),
        def('<strong>Ease of doing business</strong> — the time and cost of trading legally: permits, contracts, getting paid.'),
        def('<strong>Porter\'s five forces</strong> — rivalry, threat of entry, buyer power, supplier power, threat of substitutes.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Income: Tarsia ${usd(F.tarsia.income)} growing ${pct(F.tarsia.growth)}, Belmar ${usd(F.belmar.income)} growing ${pct(F.belmar.growth)}. In ${F.years} years: ${usd(F.tarsia10)} against ${usd(F.belmar10)}.`),
        mech('Strong forces mean thin margins: few big buyers, easy entry and close substitutes all hold the price down.'),
        link('Every factor becomes an argument only when tied to a cost or risk for the firm in the case.'),
        link('Selling an existing product in a new country is what Ansoff\'s matrix calls market development — a Unit 3 tool (3.3.1), applied to global marketing decisions in 4.3.3.'),
      ] },
    ],
    takeaway: ['Level now, growth next.', 'Rate the forces, then conclude.', 'Tie each factor to this firm.'],
  },
  {
    title: B3,
    meta: '4.3.2 · 3a',
    keyIdea: 'Nine factors, one question: what will each unit cost to make and deliver from here, and how likely is the return?',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Location factors</strong> — ${LOCATION_FACTORS.join('; ')}.`),
        def('<strong>Government incentives</strong> — grants, tax holidays, cheap land and special economic zones offered to attract investment.'),
        def('<strong>Return on investment</strong> — annual profit ÷ the money invested × 100.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Delivered cost: inside the bloc ${usd(F.landedIn)}; outside it ${usd(F.landedOut)} after a ${usd(F.tariffOut)} tariff, despite the lower wage.`),
        mech(`Return: ${usdm(F.annualReturn)} ÷ ${usdm(F.outlay)} = ${pct(F.roi)}; with the ${usdm(F.grant)} grant, ÷ ${usdm(F.outlay - F.grant)} = ${pct(F.roiGrant)}.`),
        link('A factory cannot be moved quickly, so stability matters more here than for a market.'),
      ] },
    ],
    takeaway: ['Delivered cost per unit decides.', 'Incentives end; sites stay.', 'Likely, not promised.'],
  },
  {
    title: B4,
    meta: '4.3.2 · 4a-4j',
    keyIdea: 'Three ways to combine across borders and the ten reasons for doing it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Merger</strong> — two firms combine into one. <strong>Takeover</strong> — one firm gains control of another. <strong>Joint venture</strong> — partners create a new business they own together.'),
        def('<strong>Reasons</strong> — spreading risk and economies of scale; new markets and trade blocs; brands and patents; resources and supplies; global competitiveness; reducing competition; local knowledge; government or legal requirement; supply chains and distribution networks; sharing costs and risks.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Inside a trade bloc: production there sells to every member without the common external tariff.'),
        mech('Ownership caps: where a foreign firm may own at most a minority stake, a joint venture is the only legal route.'),
        link('Several reasons (sharing costs, local knowledge) fit a joint venture better than a takeover.'),
      ] },
    ],
    takeaway: ['One firm, or a new shared one.', 'Tie the reason to the case.', 'The law can decide the form.'],
  },
  {
    title: B5,
    meta: '4.3.2 · 5a-5b',
    keyIdea: 'Exchange rate movements shift prices, costs and repatriated profit; skill shortages weaken price and non-price competitiveness.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Appreciation</strong> — the home currency buys more foreign currency. <strong>Depreciation</strong> — it buys less.'),
        def('<strong>International competitiveness</strong> — winning sales against foreign rivals, on price (cost) or on quality, design and service (non-price).'),
        def('<strong>Skill shortage</strong> — too few workers with the skills employers need.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Exporter: ${rate(F.e0)} → ${rate(F.e1)} takes a ${usd(F.price)} cooker from ${fxu(F.foreignPrice0)} to ${fxu(F.foreignPrice1)}, or cuts the receipt to ${usd(F.heldReceipt)}.`),
        mech(`Importer: a ${fxu(F.componentUnits)} part falls from ${usd(F.componentCost0)} to ${usd(F.componentCost1)}. Overseas profit of ${fxu(F.subsidiaryProfitUnits)} falls from ${usdm(F.repatriated0)} to ${usdm(F.repatriated1)}.`),
        mech(`Skills: scarce technicians' pay ${usd(F.techWage0)} → ${usd(F.techWage1)} a month.`),
      ] },
    ],
    takeaway: ['Strong currency: exporters lose, importers gain.', 'Net both sides.', 'Skills hit cost and quality.'],
  },
];
