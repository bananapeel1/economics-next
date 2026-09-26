/**
 * PACKET 56 — global-industries-mncs teaching content: four chapters over the specification's three
 * items (`bus_spec.txt:1453-1487`), seventeen subsections, one step each, and one recall per subsection.
 *
 * WHY FOUR CHAPTERS FOR THREE ITEMS. Item 1 ("The impact of MNCs") has two lettered lines of different
 * scale — the local economy (1a, three bullets) and the national economy (1b, seven bullets) — and the
 * live section's one "impact" chapter taught neither to the depth the bullets ask. One chapter each.
 * Items 2 (ethics, 2a-2d) and 3 (controlling MNCs, 3a) are a chapter each, which is topFix-01's third
 * block and structure-07's honest titles.
 *
 *   1 MNCs and the Local Economy        foundation + 1a × 3   (structure-03, specGap-08)
 *   2 MNCs and the National Economy     1b × 7                (topFix-02, specGap-05/06/07, accuracy-01)
 *   3 International Business Ethics     2a, 2b, 2c, 2d        (topFix-01, specGap-02/03/04, specThin-01)
 *   4 Controlling MNCs                  3a × 7                (topFix-01, specGap-01, quiz-03)
 *
 * THE RAMP (structure-03): chapter 1 opens by defining MNC, subsidiary, host/home country and FDI
 * before any of them is used; "arm's length" is defined in the one subsection that uses it; each
 * chapter moves from what happens to how to judge it, and examMatters differs by subsection
 * (structure-05) rather than repeating "it depends on governance".
 */
import { SECTION, subId, id, FIRM, usd, usdm, units, pct } from './_packet56-util.mjs';

const F = FIRM;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const bullets = (items) => ({ type: 'bullets', items });

export const B1 = 'MNCs and the Local Economy';
export const B2 = 'MNCs and the National Economy';
export const B3 = 'International Business Ethics';
export const B4 = 'Controlling MNCs';

/* ══ Chapter 1 — MNCs and the local economy (4.3.4 · 1a) ═══════════════════ */

const foundation = sub('mncs-subsidiaries-and-fdi', {
  title: 'MNCs, Subsidiaries and FDI',
  keyIdea: 'A multinational corporation (MNC) owns and controls operations in more than one country; setting them up or buying them is foreign direct investment (FDI).',
  body: [
    p(`A **multinational corporation (MNC)** is a business that owns and controls operations, such as factories, offices or shops, in more than one country. Its head office is in its **home country**, and every other country where it runs operations is a **host country** for that MNC.`),
    p(`An operation abroad is usually set up as a **subsidiary**: a company owned by the MNC but registered where it operates, so it obeys that country's laws and pays its taxes.`),
    p(`Setting up or buying such an operation is **foreign direct investment (FDI)**: money put into a lasting business abroad that the investor owns and runs. Buying a few shares in a foreign firm is not FDI, because it brings no control.`),
    p(`${F.name}, a sportswear MNC with its head office in ${F.homeRegion}, spent ${usdm(F.fdi)} building a shoe factory in ${F.host}, a lower-income country. Every impact in this topic, good or bad, starts from a decision like that one.`),
  ],
  realExample: { emoji: '🚗', text: 'Japanese carmakers own assembly plants across South-East Asia, each set up as a local company that employs local workers and buys from local suppliers.' },
  misconception: 'Students write that any firm selling abroad is an MNC. A firm that only exports from its home country is not one; an MNC owns and controls operations in other countries.',
  examMatters: 'Define MNC and FDI briefly in your own words, then use the case\'s own figures, such as the size of the investment and the jobs it creates, instead of general points about globalisation.',
  recall: {
    type: 'fillin',
    prompt: 'Name each term:',
    template: [
      'For a carmaker from Japan, its plant in Thailand is in a ___ country, where it employs local staff.',
      'The plant is registered in Thailand but owned by the carmaker: a ___.',
      'The money spent building a plant the carmaker will own and run is ___.',
    ],
    answers: ['host', 'subsidiary', 'foreign direct investment'],
    hints: ['where the operation is, not the head office', 'a company another company owns and controls', 'lasting investment that brings ownership and control'],
    distractors: ['home', 'franchise'],
  },
});

const labour = sub('local-labour-wages-and-conditions', {
  title: 'Local Labour, Wages and Working Conditions',
  keyIdea: 'An MNC creates local jobs and often pays above local wages, but the jobs may be routine, and working conditions depend on its standards and the local law.',
  body: [
    p(`**Job creation** is the most visible impact on **local labour**. ${F.name}'s factory employs ${units(F.workers)} people in ${F.host}, many of whom used to work on farms or in informal jobs with no regular pay.`),
    p(`**Wages** are often higher than local employers pay, because an MNC wants reliable, trained workers who stay. ${F.name} pays ${usd(F.wage)} a month against a local factory average of ${usd(F.localWage)}: a **wage premium** of ${pct(F.premiumPct)}.`),
    p('**Working conditions** can be better too: regular hours, safety equipment, training and sick pay, especially where the MNC applies its home standards. They can be worse where it chose the country for low costs and weak labour laws: long shifts, pressure to hit targets and little job security.'),
    p('The kind of job matters. Senior engineering and management posts are sometimes filled by staff sent from the home country, leaving local workers the routine assembly work, which can disappear if the MNC later finds a cheaper location.'),
  ],
  realExample: { emoji: '🧵', text: 'Foreign-owned garment and electronics factories in South and South-East Asia usually pay more than farm work, yet many are still criticised for long hours and low pay by international standards.' },
  misconception: 'Students treat a wage above the local average as proof that workers are treated well. Pay can beat local rates while hours, safety and job security stay poor; wages are one part of the impact on labour, not all of it.',
  examMatters: 'Compare the wage in the case with the local figure, not the home country\'s: what matters to a worker in the host country is what the other jobs open to them pay.',
  recall: {
    type: 'classify',
    prompt: 'Sort each effect of a new foreign-owned plant into a gain or a risk for local workers.',
    groups: [
      { name: 'Gain for local workers', items: ['Monthly pay above what nearby employers offer', 'Training in how to run modern machines', 'Hundreds of new posts in a town with few'], why: 'Each leaves local workers better off than the work they had before.' },
      { name: 'Risk for local workers', items: ['Managers\' posts filled by staff flown in from abroad', 'Twelve-hour shifts to meet export orders', 'Closure if a neighbouring country offers lower costs'], why: 'Each limits or threatens what local workers gain from the plant.' },
    ],
  },
});

const localBusiness = sub('local-businesses', {
  title: 'Local Businesses: Suppliers and Rivals',
  keyIdea: 'An MNC can help local businesses by buying from them and bringing customers, or harm them by taking their skilled staff and their customers.',
  body: [
    p('An MNC\'s arrival affects **local businesses** in opposite ways, and a case usually shows both.'),
    p(`**Suppliers can gain.** ${F.name}'s factory buys ${usdm(F.localPurchases)} a year of materials, packaging, transport and catering from firms in ${F.host}. Those firms grow and hire, and meeting the MNC's standards for quality and delivery makes them better at selling to others too.`),
    p('**Nearby shops and services can gain** from the wages the MNC\'s workers spend: food stalls, transport, housing and banks near the site see more customers.'),
    p('**Rivals can lose.** A local firm making the same product now competes with a global brand that has lower costs from scale and more to spend on advertising. It may also lose its best workers to the MNC\'s higher pay. When local firms are squeezed out of a market they used to serve, this is called **crowding out**.'),
    p('Which effect is larger depends on how much the MNC buys locally rather than importing, and on whether local firms supply it or compete with it.'),
  ],
  realExample: { emoji: '🔩', text: 'Where a foreign carmaker builds a plant, local makers of seats, wiring and parts often grow around it, while small local brands of the same product struggle to match its prices.' },
  misconception: 'Students assume local businesses always lose when an MNC arrives. Suppliers and the shops near the site often gain; the loss falls mainly on firms that compete with the MNC for customers or for staff.',
  examMatters: 'Split the local firms in the case into suppliers and rivals before you judge; the same MNC can help one group and harm the other.',
  recall: {
    type: 'match',
    prompt: 'Match each local business to the most likely effect of a new foreign-owned factory on it.',
    pairs: [
      { left: 'A firm that makes cardboard boxes', right: 'Wins a large, regular customer', why: 'The factory needs packaging for everything it ships, so a nearby box maker can win the order.' },
      { left: 'A local shoemaker selling in the same towns', right: 'Faces a rival with a global brand and scale', why: 'It competes with the MNC for the same buyers.' },
      { left: 'A café by the factory gates', right: 'Serves more workers with money to spend', why: 'Its trade rises with the number of people paid nearby.' },
      { left: 'A workshop whose machinists are offered more elsewhere', right: 'Loses staff it spent years training', why: 'Higher MNC pay draws away the workers the workshop invested in.' },
    ],
  },
});

const community = sub('local-community-and-environment', {
  title: 'The Local Community and Environment',
  keyIdea: 'An MNC can bring roads, power, schools and clinics to the area around it, but also pollution, congestion and competition for land and water.',
  body: [
    p('The **local community** is everyone living near the operation, not just the people who work there.'),
    p('**Gains** often include new or better roads, power and water supplies built to serve the site, and schools, clinics or training centres the MNC funds to attract staff and win local support. More work nearby can also keep young people from leaving the area.'),
    p('**Costs** fall on the **local environment** and on daily life: smoke and dust from the site, waste water in rivers, heavy lorries on village roads, and land or water taken that farmers used. Rents can rise when many new workers arrive.'),
    p(`Residents near ${F.name}'s factory have gained a paved road and a clinic, but they complain about dye in the river and smoke from the boilers. Whether they are better off overall depends on the MNC's own standards and on how firmly the local authority enforces its rules.`),
  ],
  realExample: { emoji: '⛏️', text: 'Mining companies working in remote regions often build roads, clinics and schools for nearby villages, and are often in dispute with the same villages over polluted water and lost land.' },
  misconception: 'Students count only the MNC\'s own employees when judging its local impact. Families who never work at the site still breathe its air, use its roads and drink water from the river it drains into.',
  examMatters: 'Name the part of the community affected and how, such as farmers losing water or families gaining a clinic, rather than calling the MNC simply good or bad for the area.',
  recall: {
    type: 'classify',
    prompt: 'Sort each effect on the villages around a new mine into a gain or a cost for the community.',
    groups: [
      { name: 'Gain for the community', items: ['A health centre open to every family in the valley', 'A tarred road to the nearest market town', 'Electricity reaching homes along the new power line'], why: 'They improve life for residents whether or not they work at the mine.' },
      { name: 'Cost for the community', items: ['Dust settling on crops beside the pit', 'Wells drying up as the mine pumps groundwater', 'Trucks through the village day and night'], why: 'They make life harder for residents, including those who earn nothing from the mine.' },
    ],
  },
});

/* ══ Chapter 2 — MNCs and the national economy (4.3.4 · 1b) ════════════════ */

const growth = sub('economic-growth-and-fdi-flows', {
  title: 'Economic Growth and FDI Flows',
  keyIdea: 'FDI flowing into a country adds to what it can produce, and so to economic growth; flows that slow down or leave work the other way.',
  body: [
    p('**Economic growth** is a rise in the value of the goods and services a country produces. An MNC adds to it directly, through what its own operation produces, and indirectly, through the firms its spending keeps busy.'),
    p('**FDI flows** are the money MNCs invest in a country (inflows) or take out of it (outflows) over a period. An inflow builds new capacity: factories, mines, hotels, offices. Where local savings are too small to fund such projects, FDI can be the largest source of new investment.'),
    p(`${F.name}'s ${usdm(F.fdi)} was an inflow to ${F.host}. It created a factory producing ${usdm(F.exportsYr)} of shoes a year that did not exist before, and that output counts directly in ${F.host}'s growth.`),
    p('The growth is not guaranteed to last. FDI goes where costs are low and rules are stable, so it can slow or reverse if wages rise, a neighbour offers better terms or the government changes the rules. A country that relies on a few MNCs relies on their decisions.'),
  ],
  realExample: { emoji: '🏭', text: 'Countries that attract electronics and car plants often see factory output rise within a few years, and can lose that growth when production moves to a cheaper neighbour.' },
  misconception: 'Students describe FDI as any foreign money entering the country. FDI is investment in a business the foreign firm owns and runs; that ownership is why it builds lasting capacity, and why the profit it earns belongs to the MNC.',
  examMatters: 'Link the FDI in the case to what it builds and what that adds to output, then ask how secure the flow is: what would make the MNC invest more, or leave?',
  recall: {
    type: 'reorder',
    prompt: 'Put these in cause-to-effect order, from an MNC\'s investment to the extra tax the government receives.',
    criterion: 'cause to effect, from the investment to the tax it brings in',
    correctOrder: [
      'An MNC builds a factory with foreign direct investment',
      'Its factory hires local workers and orders from local suppliers',
      'Workers and suppliers earn and spend more income',
      'Government collects more tax on the extra income and spending',
    ],
    why: [
      'Nothing else happens until the investment creates the operation.',
      'A working factory needs staff and materials, so it hires and buys locally.',
      'The wages and orders become income for households and firms, who spend it.',
      'Higher incomes and spending are what income and sales taxes are charged on.',
    ],
  },
});

const bop = sub('balance-of-payments', {
  title: 'The Balance of Payments',
  keyIdea: 'An MNC affects a host country\'s balance of payments through the money it brings in and sends out: FDI and exports in, imports and profits out.',
  body: [
    p('The **balance of payments** records all the money flowing into and out of a country from trade and investment. An MNC creates flows in both directions, and its impact is the balance between them.'),
    bullets([
      '**Into the host country:** the FDI itself, and the earnings from goods the MNC exports.',
      '**Out of the host country:** payments for components it imports, and the profits it sends back to its head office, called **repatriated profits**.',
    ]),
    p(`${F.name} exports ${usdm(F.exportsYr)} of shoes a year from ${F.host}, imports ${usdm(F.importsYr)} of components and sends ${usdm(F.profitsHome)} of profit home. Together these yearly flows bring in a net ${usdm(F.netFlow)}, on top of the ${usdm(F.fdi)} it invested once.`),
    p('Repatriated profit is a real cost to the host, but it does not by itself show that the host loses overall. Over the life of a profitable factory the profit sent home will usually add up to more than the original investment, while the host keeps the wages, the local purchases, the taxes and the factory itself.'),
    p('The balance is weaker when an MNC imports most of what it uses, sells mainly to the host\'s own buyers rather than abroad, or sends all of its profit home.'),
  ],
  realExample: { emoji: '🚢', text: 'Export-processing zones in many lower-income countries are built so that foreign-owned factories earn foreign currency by selling abroad, which helps the country pay for its own imports.' },
  misconception: 'Students conclude that a host country loses once the profit an MNC has sent home is larger than what it invested. That comparison leaves out the wages, local orders, taxes and capacity the host keeps, so it cannot settle the question.',
  examMatters: 'Add up what comes in and what goes out using the case\'s figures before judging, and say which flow could change: more local buying, or more profit sent home.',
  recall: {
    type: 'classify',
    prompt: 'Sort each flow by its direction for the host country\'s balance of payments.',
    groups: [
      { name: 'Money into the host country', items: ['A foreign bank buys and expands a local bank', 'A car plant ships vehicles to buyers abroad', 'A hotel group builds a resort with money raised overseas'], why: 'Money arrives from abroad, as investment or as export earnings.' },
      { name: 'Money out of the host country', items: ['A subsidiary pays its parent company a yearly dividend', 'A plant buys engines from its sister plant overseas', 'A mine pays a foreign shipper to bring in machinery'], why: 'Money leaves to pay for imports or to return profit to the owner abroad.' },
    ],
  },
});

const techCulture = sub('technology-skills-and-business-culture', {
  title: 'Technology, Skills and Business Culture',
  keyIdea: 'MNCs bring technology and skills that can spread to local firms, and ways of running a business, known as business culture, that can spread too.',
  body: [
    p('**Technology and skills transfer** happens when an MNC brings machines, methods and know-how the host country lacked, and they spread beyond the MNC. Workers trained on modern equipment move to local firms or start their own; suppliers learn quality methods to meet the MNC\'s standards; local managers copy what works.'),
    p(`In ${F.host}, supervisors trained by ${F.name} in quality control have left to run local workshops, taking the methods with them.`),
    p('Transfer is limited when the MNC keeps research and design at home, brings its own engineers, or guards its technology closely. The host then gets the jobs but not the know-how.'),
    p('**Business culture** is the shared way firms in a country are run: how decisions are made, how staff are managed and promoted, and what counts as acceptable practice. MNCs can change it, bringing merit-based promotion, written contracts, safety rules and anti-bribery policies that local firms adopt. They can also bring long-hours working and aggressive sales targets, or clash with local customs such as family-run management.'),
  ],
  realExample: { emoji: '⚙️', text: 'Across East Asia, local suppliers to foreign car and electronics makers adopted methods such as just-in-time delivery and quality circles, and some later became exporters themselves.' },
  misconception: 'Students assume the technology inside an MNC\'s factory benefits the host country automatically. It does so only if it spreads, through trained workers, suppliers and imitation; kept inside the MNC, it mainly benefits the MNC.',
  examMatters: 'For technology and culture, show the route by which the change reaches local firms, such as a worker who moves or a supplier who adapts, and what could block it.',
  recall: {
    type: 'classify',
    prompt: 'Sort each change into technology and skills transfer or a change in business culture.',
    groups: [
      { name: 'Technology and skills transfer', items: ['Engineers trained on robotic welding join a local firm', 'A local supplier learns a new quality-testing method', 'Local technicians learn to repair imported machines'], why: 'Know-how or equipment the host lacked spreads beyond the MNC.' },
      { name: 'Business culture', items: ['Local firms start promoting staff on results, not family ties', 'Written contracts replace spoken deals with suppliers', 'Refusing to pay bribes becomes normal in the industry'], why: 'These change how firms are run and what counts as acceptable, not what they can make.' },
    ],
  },
});

const consumers = sub('host-country-consumers', {
  title: 'Consumers in the Host Country',
  keyIdea: 'MNCs can give host-country consumers more choice, better quality and lower prices, but can also push out local products and later use their market power.',
  body: [
    p('The impact on **consumers** here means consumers in the host country, not in the MNC\'s home market.'),
    p('**Gains**: more choice, as global brands appear beside local ones; better quality and safety; and lower prices where the MNC\'s scale cuts costs or its arrival forces local rivals to compete harder. Goods that were imported and expensive may be made locally and sold for less.'),
    p('**Risks**: if the MNC drives local rivals out, consumers may later face fewer choices and higher prices from one dominant firm. Local products and tastes can disappear. And much of what an export factory makes is never offered to local consumers at all.'),
    p(`Most of ${F.name}'s shoes are exported, so ${F.host}'s consumers gain little from them directly. Its effect on them comes mainly through the wages it pays, which let its workers buy more.`),
  ],
  realExample: { emoji: '🛒', text: 'When foreign supermarket chains enter a country, shoppers often gain lower prices and a wider range, while small family grocers nearby lose trade.' },
  misconception: 'Students write about cheaper goods for shoppers in the MNC\'s home country when the question is about the host country. Ask who buys where the MNC operates, and what changes for them.',
  examMatters: 'Check whether the MNC in the case sells to local buyers or exports; if it exports, its effect on local consumers is mostly indirect, through incomes.',
  recall: {
    type: 'match',
    prompt: 'Match each change after an MNC enters a market to what it means for consumers in that country.',
    pairs: [
      { left: 'A global grocery chain opens in the capital', right: 'More brands on the shelves', why: 'It stocks international brands next to local ones.' },
      { left: 'A drugs maker starts producing locally instead of importing', right: 'Cheaper medicines', why: 'Making them locally avoids freight and import costs.' },
      { left: 'Local rivals close and one foreign brand is left', right: 'Prices that may rise later', why: 'With no competitor left, the survivor can charge more.' },
      { left: 'A food MNC applies the hygiene rules it uses at home', right: 'Safer food to buy', why: 'Its own standards may be stricter than local rules.' },
    ],
  },
});

const tax = sub('tax-revenues-and-transfer-pricing', {
  title: 'Tax Revenues and Transfer Pricing',
  keyIdea: 'An MNC pays tax in each country on the profit it reports there; transfer pricing can move that profit, and the tax on it, to a low-tax country.',
  body: [
    p('**Tax revenues** from an MNC include tax on its profits, income tax paid by its workers, and taxes on its sales and imports. In many lower-income countries a large MNC is one of the biggest taxpayers.'),
    p('But an MNC can influence where its profit is reported. **Transfer pricing** is how it sets the prices its own companies charge each other, for example when a factory sells to the group\'s trading company. Because both sides have the same owner, the price can be set to leave the profit where tax is lowest.'),
    p(`${F.name}'s factory makes a pair of shoes for ${usd(F.costPair)}. Unrelated firms trade similar pairs at ${usd(F.armsLength)}, the **arm's length price**. Instead the factory sells to ${F.trading}, based in ${F.lowTax}, for ${usd(F.transferPrice)}. ${F.host} taxes profit at ${pct(F.taxHost)} but sees only ${usd(F.profitHostPair)} of profit a pair; the other ${usd(F.shiftedPair)} is reported in ${F.lowTax}, taxed at ${pct(F.taxLow)}. On ${units(F.pairs)} pairs a year, ${F.host} collects ${usdm(F.hostTaxActual)} instead of ${usdm(F.hostTaxArms)}.`),
    p('This is **tax avoidance**, which is legal unless the prices break the host\'s rules. Many governments now check an MNC\'s internal prices against what unrelated firms would pay, and tax the difference.'),
  ],
  realExample: { emoji: '🧾', text: 'Tax authorities in many countries now have specialist teams whose job is to check the prices MNCs charge between their own subsidiaries.' },
  misconception: 'Students call transfer pricing tax evasion. Setting prices between subsidiaries is legal and normal; used to shift profit it is avoidance, and it becomes evasion only when it breaks the law, such as by faking invoices.',
  examMatters: 'Work out the profit reported in each country at the internal price and at the arm\'s length price; the gap, times the host\'s tax rate, is the tax the host loses.',
  recall: {
    type: 'fillin',
    prompt: 'Complete how a group with plants in a 30% tax country and a 10% tax country shifts profit:',
    template: [
      'The price a factory charges its own group\'s sales company is called a ___.',
      'To cut tax, the plant in the 30% country charges the sales company in the 10% country a price ___ than an outside buyer would pay.',
      'The 30% country then collects ___ tax from the plant.',
    ],
    answers: ['transfer price', 'lower', 'less'],
    hints: ['a price set inside one group', 'below what an unrelated firm would pay', 'the profit it can tax has shrunk'],
    distractors: ['higher', 'more', 'market price'],
  },
});

/* ══ Chapter 3 — International business ethics (4.3.4 · 2a-2d) ═════════════ */

const stakeholders = sub('stakeholder-conflicts', {
  title: 'Stakeholder Conflicts',
  keyIdea: 'Many MNC decisions help one group of stakeholders at another\'s expense; business ethics is about how the firm weighs those conflicts, not only about obeying the law.',
  body: [
    p('**International business ethics** asks whether an MNC\'s decisions are morally right, not only legal and profitable. The hardest cases are **stakeholder conflicts**: one decision that helps one group and harms another.'),
    p('An MNC has more stakeholders, spread across more countries, than a domestic firm: owners at home, workers and suppliers in several host countries, local communities, consumers worldwide and governments on every side.'),
    p(`Suppose ${F.name} considers moving its clothing orders from well-run suppliers to cheaper ones that pay less and cut corners on safety. Its **shareholders** see the saving as extra profit. **Workers** at the cheaper suppliers face lower pay and more danger. **Consumers** pay less but may be buying goods made in ways they would object to. The **host government** sees jobs move from one region to another.`),
    p('No option suits everyone, so a judgement has to say whose interest should come first and why: for example, that a short-term saving is not worth a risk to workers\' lives, or to the brand once the conditions become known.'),
  ],
  realExample: { emoji: '⚖️', text: 'Plans to close a factory in one country and reopen in a cheaper one regularly set owners, who gain from lower costs, against workers and towns that lose their jobs.' },
  misconception: 'Students list the stakeholders an MNC affects and stop there, as if naming them were the analysis. The ethical question is the conflict between them: who gains, who loses, and whether the firm can justify that trade-off.',
  examMatters: 'Pick the two stakeholders whose interests clash most in the case, show the clash with its evidence, and say which interest should win and on what grounds.',
  recall: {
    type: 'match',
    prompt: 'Match each stakeholder to what it most wants when an MNC thinks about switching to a cheaper supplier.',
    pairs: [
      { left: 'Shareholders', right: 'A bigger return on their investment', why: 'A cheaper supplier raises profit, and so what the owners receive.' },
      { left: 'Workers at the supplier', right: 'Fair pay and a safe workplace', why: 'Their income and safety are what a cheaper supplier puts at risk.' },
      { left: 'Customers abroad', right: 'Good value from a brand they can trust', why: 'They want low prices, but many also care how products are made.' },
      { left: 'The host government', right: 'Employment and revenue kept in the country', why: 'It depends on the work and the tax the MNC brings.' },
    ],
  },
});

const environment = sub('environmental-considerations', {
  title: 'Environmental Considerations',
  keyIdea: 'Environmental ethics asks what an MNC releases into the air, water and land, and whether its use of resources can continue without harming the future.',
  body: [
    p('**Emissions** are gases and particles released into the air: carbon dioxide from burning fuel, smoke from boilers and furnaces, fumes from vehicles. **Waste disposal** is what happens to everything left over, such as waste water, chemicals, packaging and scrap. Disposed of cheaply, waste ends up in rivers, in landfill or burned in the open.'),
    p('An MNC may be tempted to follow the host country\'s rules where they are weaker than at home, because cleaner equipment and treatment plants cost money. That saves cost but moves the harm onto local people and, with greenhouse gases, onto everyone.'),
    p(`Residents near ${F.name}'s factory report dye in the river and smoke from the boilers. Cleaner boilers and a water-treatment plant would cost ${usdm(F.cleanKit)}.`),
    p('**Sustainability** means meeting today\'s needs without harming the ability of future generations to meet theirs. For an MNC it means using water, energy, timber and land at a rate that can continue, cutting waste and emissions over time, and designing products that last or can be recycled.'),
  ],
  realExample: { emoji: '🌍', text: 'Many large manufacturers now publish yearly figures for their carbon emissions, water use and waste, and set targets to reduce them, partly because investors and customers ask for them.' },
  misconception: 'Students assume an MNC that obeys the host country\'s environmental law has no ethical question to answer. Where that law is weaker than at home, obeying it can still mean polluting in ways the firm could not at home.',
  examMatters: 'Weigh the cost of cleaner methods against the harm avoided and the damage to the brand if the pollution becomes public, using any figures the case gives.',
  recall: {
    type: 'classify',
    prompt: 'Sort each practice by the environmental consideration it concerns.',
    groups: [
      { name: 'Emissions', items: ['Smoke from coal-fired boilers', 'Exhaust from a fleet of diesel lorries'], why: 'Released into the air as gases or particles.' },
      { name: 'Waste disposal', items: ['Used chemicals poured down a drain', 'Scrap rubber buried in a landfill site'], why: 'What is left over, and how the firm gets rid of it.' },
      { name: 'Sustainability', items: ['Pumping groundwater faster than rain refills it', 'Switching to cotton grown with less water'], why: 'Whether its use of resources can continue into the future.' },
    ],
  },
});

const supplyChain = sub('supply-chain-considerations', {
  title: 'Supply Chain Considerations',
  keyIdea: 'An MNC is judged on conditions at the suppliers that make its goods, not only in its own factories: pay, safety, exploitation and child labour.',
  body: [
    p('Many MNCs own few of the factories that make their products. They buy through **supply chains** of independent suppliers, often in low-wage countries, who buy from others in turn.'),
    p('**Pay and working conditions**: suppliers pushed to cut prices may pay below a living wage, demand unpaid overtime, or skip safety measures such as fire exits and sound buildings.'),
    p('**Exploitation of labour** goes further: forced overtime, wages held back, identity papers kept by the employer, workers not free to leave. **Child labour** is work by children that harms their health or schooling. It is most common in the lower tiers of a supply chain, in small workshops and farms far from any inspector.'),
    p(`${F.name} buys clothing from ${units(F.suppliers)} supplier factories in ${F.host}. An inspection found children working at ${units(F.childSuppliers)} of them.`),
    p('An MNC can lower these risks through the prices it pays and the checks it makes: visits without warning, wage and hours records, proof of age, and private interviews with workers. None of it works if it then demands prices that only exploitation can meet.'),
  ],
  realExample: { emoji: '🏚️', text: 'Factory fires and building collapses in garment-producing countries have killed workers making clothes for international brands, and led many brands to publish their supplier lists and fund independent safety inspections.' },
  misconception: 'Students write that an MNC is not responsible for conditions in factories it does not own. Buyers, campaigners and the law increasingly hold the brand responsible, because its orders and prices shape what suppliers can afford to pay.',
  examMatters: 'Separate the MNC\'s own workplaces from its suppliers\', then say what the MNC controls through its orders, prices and inspections, and what it cannot.',
  recall: {
    type: 'match',
    prompt: 'Match each problem at a supplier to the check most likely to uncover it.',
    pairs: [
      { left: 'Children working in the sewing room', right: 'Checking every worker\'s proof of age', why: 'Age documents show directly whether workers are old enough.' },
      { left: 'Pay below the legal minimum', right: 'Comparing wage records with hours worked', why: 'The records show what each worker was paid for the time worked.' },
      { left: 'Fire exits locked during shifts', right: 'Visiting the factory without warning', why: 'A visit with notice lets managers unlock the doors first.' },
      { left: 'Workers too afraid to report abuse', right: 'Interviewing staff where managers cannot hear', why: 'Workers speak freely only away from the people they fear.' },
    ],
  },
});

const marketing = sub('marketing-considerations', {
  title: 'Marketing Considerations',
  keyIdea: 'Marketing ethics covers what an MNC says on its labels and how it promotes: misleading claims and marketing that exploits or offends are both unethical.',
  body: [
    p('**Misleading product labelling** gives buyers a false impression of what they are buying: health claims the product cannot support, "natural" or "eco" on products that are neither, or details that leave out what buyers would want to know. Claiming environmental benefits a product does not have is known as **greenwashing**.'),
    p(`${F.name} sells a range labelled "eco" in which ${pct(F.recycledPct)} of the material is recycled. Nothing on the label is false, but a buyer could reasonably assume far more.`),
    p('**Inappropriate marketing activities** are promotions that are unethical even when every claim is true: advertising unhealthy food or costly goods to children, pushing a product where it is harmful or unaffordable, using images that exploit or offend, or paying for endorsements buyers do not know are paid.'),
    p('MNCs face a particular risk, because a label or advert accepted in one country can be judged misleading or offensive in another, and a complaint in one market can be seen in all of them.'),
  ],
  realExample: { emoji: '🏷️', text: 'Regulators in several countries have made firms withdraw "green" and "natural" claims they could not support, and some now publish guidance on what such words must mean.' },
  misconception: 'Students think a label is ethical as long as each statement on it is true. A label made of true statements can still mislead, through what it stresses and what it leaves out.',
  examMatters: 'Say who is misled or harmed and how, such as a buyer paying extra for a green claim or a child targeted by an advert, and what it could cost the brand.',
  recall: {
    type: 'classify',
    prompt: 'Sort each case into misleading product labelling or an inappropriate marketing activity.',
    groups: [
      { name: 'Misleading product labelling', items: ['"Made with natural extracts" on a mostly synthetic cream', 'A "light" claim on a drink with more sugar than its rivals', 'A green tree logo on a bottle made from new plastic'], why: 'The pack itself gives a false impression of the product.' },
      { name: 'Inappropriate marketing activity', items: ['Cartoon adverts for sweets during children\'s programmes', 'Influencers paid to praise a phone without saying so', 'Free samples of formula milk handed to new mothers'], why: 'The promotion is unethical in whom it targets or how it persuades, whatever the pack says.' },
    ],
  },
});

/* ══ Chapter 4 — Controlling MNCs (4.3.4 · 3a) ═════════════════════════════ */

const power = sub('power-and-political-influence', {
  title: 'The Power of MNCs and Political Influence',
  keyIdea: 'Large MNCs are hard to control because of their size, their ability to move, and their political influence over the governments meant to regulate them.',
  body: [
    p('**Controlling MNCs** means making them act in the interests of the countries and people they affect, not only their owners. Several factors decide how far that is possible, starting with the **power of the MNC** itself.'),
    p('That power comes from size, since the largest MNCs have yearly sales greater than the national income of many countries; from mobility, since an MNC can move production, profit or jobs elsewhere; and from how much a host government relies on its jobs, exports and tax.'),
    p('**Political influence** is how an MNC uses that power over governments: lobbying ministers and officials, offering or withholding investment, and negotiating special terms, such as years of reduced tax, before it arrives. A government competing with its neighbours for FDI may weaken its own rules to win it.'),
    p(`When ${F.name} says its second factory, costing ${usdm(F.secondPlant)} with ${units(F.secondJobs)} jobs, will go to whichever country offers better terms, it is using this influence.`),
  ],
  realExample: { emoji: '🏛️', text: 'Governments competing for large factories often offer years of reduced tax, cheap land and relaxed rules, and the MNC chooses between the offers.' },
  misconception: 'Students treat a government as always able to control an MNC by passing a law. A small or poor country that relies on an MNC\'s jobs and tax may choose not to, and the MNC can move to one that will not.',
  examMatters: 'Before judging how well an MNC can be controlled, weigh its power in the case: how much the host relies on it, and how easily it could leave.',
  recall: {
    type: 'classify',
    prompt: 'Sort each fact about an MNC into a source of its power or a use of its political influence.',
    groups: [
      { name: 'Power of the MNC', items: ['It employs a tenth of the country\'s factory workers', 'It could shift production to three other countries', 'Its turnover exceeds the host government\'s budget'], why: 'These are what the MNC has: size, mobility and importance to the host.' },
      { name: 'Political influence', items: ['It lobbies ministers to delay a new safety law', 'It warns that a tax rise would end new investment', 'It hires retired ministers as advisers'], why: 'These are how it uses its power to shape what a government decides.' },
    ],
  },
});

const legal = sub('legal-control', {
  title: 'Legal Control',
  keyIdea: 'Legal control uses laws in the host country, laws in the home country and agreements between countries; each is limited by enforcement and by the MNC\'s ability to move.',
  body: [
    p('**Legal control** is the use of law to limit what an MNC may do. It works at three levels.'),
    bullets([
      '**Host-country law**: minimum wages, health and safety, pollution limits, competition law and tax rules, including rules on the prices an MNC\'s companies charge each other. It is only as strong as the government\'s will and ability to enforce it.',
      '**Home-country law**: some countries make firms answer at home for what they do abroad, such as bribing foreign officials or failing to check suppliers for forced labour.',
      '**International agreements**: rules many countries sign up to, such as trade rules, labour standards and an agreed minimum rate of tax on the profits of the largest MNCs, which reduces the gain from reporting profit in low-tax countries.',
    ]),
    p('Each level has limits. A host country may lack inspectors; a home country\'s courts may struggle to gather evidence abroad; an agreement binds only the countries that sign and enforce it. Where one country\'s rules are strict, an MNC can move to one where they are not, which is why cooperation between countries matters.'),
  ],
  realExample: { emoji: '📜', text: 'Several countries now require large companies to report what they do to find and stop forced labour in their supply chains, wherever the suppliers are.' },
  misconception: 'Students assume a strict law in the host country settles the matter. A law that is not enforced, or that the MNC escapes by moving, controls nothing.',
  examMatters: 'Name the level of law in the case, host, home or international, and the reason it might fail here: weak enforcement, evidence abroad, or an MNC able to move.',
  recall: {
    type: 'fillin',
    prompt: 'Name the level of legal control each rule works at:',
    template: [
      'Inspectors from the country where a foreign-owned plant operates fine it for dumping waste: ___ law.',
      'A firm is prosecuted where its head office is for bribing an official abroad: ___ law.',
      'Many governments sign up to a shared minimum tax rate on large firms: a rule set by ___.',
    ],
    answers: ['host-country', 'home-country', 'international agreement'],
    hints: ['where the operation is', 'where the MNC comes from', 'many countries acting together'],
    distractors: ['self-regulation', 'consumer pressure'],
  },
});

const pressure = sub('consumer-pressure-pressure-groups-social-media', {
  title: 'Consumer Pressure, Pressure Groups and Social Media',
  keyIdea: 'Buyers, campaign groups and social media can change an MNC\'s behaviour faster than law, by threatening the sales and reputation it depends on.',
  body: [
    p('**Consumer pressure** works through what people buy. Boycotts, switching to rival brands and demanding ethical products all hit sales, and an MNC with a valuable brand has most to lose.'),
    p('**Pressure groups** are organisations that campaign on an issue, such as workers\' rights, the environment or health. They investigate MNCs, publish reports, organise protests, lobby governments for new laws, and sometimes work with firms to raise standards.'),
    p('**Social media** speeds all of this up. A photo from inside a supplier can reach millions of buyers in days without a newspaper or a government involved, campaigns can be organised cheaply across many countries at once, and an MNC\'s replies are judged in public.'),
    p(`When footage from one of ${F.name}'s suppliers spread online, the brand faced calls for a boycott in several of its biggest markets.`),
    p('The limits: many buyers say they care but still buy on price; attention moves on quickly; and firms that sell to other businesses rather than to the public have little brand to protect.'),
  ],
  realExample: { emoji: '📱', text: 'Campaigns spread on social media have led clothing, food and electronics brands to publish lists of their suppliers and to drop suppliers found using child or forced labour.' },
  misconception: 'Students assume consumer pressure always works because boycotts get attention. It works only while enough buyers actually change what they buy, and only on firms whose sales depend on their public reputation.',
  examMatters: 'Say which of the three the case shows and how it reaches the MNC\'s sales or reputation; then ask how long the pressure is likely to last.',
  recall: {
    type: 'reorder',
    prompt: 'Put these in cause-to-effect order, from what happens at a supplier to the MNC changing its behaviour.',
    criterion: 'cause to effect, from the supplier to the MNC\'s response',
    correctOrder: [
      'A worker films unsafe conditions at a supplier',
      'Footage spreads widely on social media',
      'Buyers boycott the brand and pressure groups campaign',
      'Head office changes its supplier rules to protect sales',
    ],
    why: [
      'Nothing can spread until someone records what is happening.',
      'Shared online, the video reaches buyers and campaigners within days.',
      'Once they have seen it, buyers stop buying and groups organise pressure.',
      'Falling sales and a damaged brand give the MNC a reason to act.',
    ],
  },
});

const selfReg = sub('self-regulation', {
  title: 'Self-Regulation',
  keyIdea: 'Self-regulation is an MNC or its industry setting and checking its own standards; it can go further than the law, but it relies on the firm choosing to enforce it.',
  body: [
    p('**Self-regulation** means an MNC, or its whole industry, sets its own rules of behaviour and checks they are followed, without waiting for the law to require it.'),
    p('Common forms are a **code of conduct** suppliers must sign, covering pay, hours, safety and child labour; regular audits of suppliers; industry-wide standards and labels that members agree to meet; and published reports on the firm\'s social and environmental record.'),
    p('It has real advantages. It can apply the same standards in every country, including where local law is weak, and it can move faster than governments. Firms that do it well protect their brands and can charge more for products buyers trust.'),
    p(`Its weakness is that the firm writes, checks and reports on its own rules. Audits can be announced in advance, codes can be ignored when they cost money, and reports can dwell on good news. ${F.name}'s supplier code already banned child labour, yet children were found at ${units(F.childSuppliers)} of its suppliers.`),
    p('Self-regulation is most believable when someone independent checks it, such as an outside auditor or a pressure group, and when breaking it has consequences.'),
  ],
  realExample: { emoji: '✅', text: 'Industry groups in sectors such as clothing, coffee and timber run certification schemes whose labels tell buyers that independent auditors have checked the standards behind a product.' },
  misconception: 'Students treat a published code of conduct as evidence that an MNC behaves ethically. A code shows what the firm has promised; only independent checks, and consequences for breaking it, show whether it is kept.',
  examMatters: 'Judge self-regulation by who checks it and what happens when it is broken, using the case\'s evidence, rather than by what the code says.',
  recall: {
    type: 'classify',
    prompt: 'Sort each rule into self-regulation or legal control.',
    groups: [
      { name: 'Self-regulation', items: ['A brand\'s own ban on overtime above sixty hours a week', 'An industry label that members agree to earn', 'A firm\'s yearly report on its own supplier audits'], why: 'The firm or its industry sets and checks the rule itself.' },
      { name: 'Legal control', items: ['A national minimum wage for factory workers', 'A court fine for polluting a river', 'Emission limits set by a host government'], why: 'A government imposes the rule and punishes those who break it.' },
    ],
  },
});

/* ══ The plan ══════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [foundation, labour, localBusiness, community],
    takeaway: [
      'An MNC owns operations abroad; building or buying them is FDI.',
      'Local workers and suppliers often gain; rival firms can lose staff and buyers.',
      'The community can gain facilities and still bear the pollution.',
    ],
  },
  {
    title: B2,
    subs: [growth, bop, techCulture, consumers, tax],
    takeaway: [
      'FDI adds capacity and output, but it can leave as easily as it came.',
      'Weigh exports and FDI in against imports and profit sent home.',
      'Know-how and business culture help the host only if they spread.',
      'Transfer pricing can move profit, and the tax on it, out of the host.',
    ],
  },
  {
    title: B3,
    subs: [stakeholders, environment, supplyChain, marketing],
    takeaway: [
      'Ethics is about conflicts between stakeholders, not only about the law.',
      'Emissions, waste and resource use are judged against the future too.',
      'An MNC answers for its suppliers\' workers and for what its labels imply.',
    ],
  },
  {
    title: B4,
    subs: [power, legal, pressure, selfReg],
    takeaway: [
      'Size, mobility and political influence make MNCs hard to control.',
      'Law works at host, home and international level, if it is enforced.',
      'Buyers, campaigners and social media hit sales; codes need outside checks.',
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
 * THE LEAF MAP, BY HAND. 25 leaves at `bus_spec.txt:1458-1487` (30 rows in `spec-items.json`).
 */
export const LEAF_MAP = {
  'BUS-4.3.4-1a-1': ['local-labour-wages-and-conditions'],
  'BUS-4.3.4-1a-2': ['local-businesses'],
  'BUS-4.3.4-1a-3': ['local-community-and-environment'],
  'BUS-4.3.4-1b-1': ['economic-growth-and-fdi-flows'],
  'BUS-4.3.4-1b-2': ['economic-growth-and-fdi-flows'],
  'BUS-4.3.4-1b-3': ['balance-of-payments'],
  'BUS-4.3.4-1b-4': ['technology-skills-and-business-culture'],
  'BUS-4.3.4-1b-5': ['host-country-consumers'],
  'BUS-4.3.4-1b-6': ['technology-skills-and-business-culture'],
  'BUS-4.3.4-1b-7': ['tax-revenues-and-transfer-pricing'],
  'BUS-4.3.4-2a': ['stakeholder-conflicts'],
  'BUS-4.3.4-2b-1': ['environmental-considerations'],
  'BUS-4.3.4-2b-2': ['environmental-considerations'],
  'BUS-4.3.4-2c-1': ['supply-chain-considerations'],
  'BUS-4.3.4-2c-2': ['supply-chain-considerations'],
  'BUS-4.3.4-2d-1': ['marketing-considerations'],
  'BUS-4.3.4-2d-2': ['marketing-considerations'],
  'BUS-4.3.4-3a-1': ['power-and-political-influence'],
  'BUS-4.3.4-3a-2': ['power-and-political-influence'],
  'BUS-4.3.4-3a-3': ['legal-control'],
  'BUS-4.3.4-3a-4': ['consumer-pressure-pressure-groups-social-media'],
  'BUS-4.3.4-3a-5': ['consumer-pressure-pressure-groups-social-media'],
  'BUS-4.3.4-3a-6': ['consumer-pressure-pressure-groups-social-media'],
  'BUS-4.3.4-3a-7': ['self-regulation'],
};

/* ══ Notes — one topic per chapter, titled as the chapter, no misconception field ═ */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4.3.4 · 1a',
    keyIdea: 'What an MNC and FDI are, and how one factory affects local workers, local firms and the community around it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>MNC</strong> — a business that owns and controls operations in more than one country. <strong>Subsidiary</strong> — a company it owns, registered where it operates.'),
        def('<strong>FDI</strong> — investment in a lasting business abroad that the investor owns and runs; a few shares with no control are not FDI.'),
        def('<strong>Crowding out</strong> — local firms squeezed out of a market by the MNC\'s scale, brand and pay.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Wages: ${usd(F.wage)} a month against a local ${usd(F.localWage)} is a ${pct(F.premiumPct)} premium — pay, not conditions.`),
        mech(`Local firms: ${usdm(F.localPurchases)} a year of orders for suppliers; lost staff and buyers for rivals.`),
        link('The community includes people who never work at the site.'),
      ] },
    ],
    takeaway: ['Define, then apply the case figures.', 'Suppliers and rivals, separately.', 'Gains and costs for the community.'],
  },
  {
    title: B2,
    meta: '4.3.4 · 1b',
    keyIdea: 'Seven national effects: growth, FDI flows, the balance of payments, technology and skills, consumers, business culture and tax revenues.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>FDI flows</strong> — money MNCs invest in (inflows) or take out of (outflows) a country over a period.'),
        def('<strong>Balance of payments</strong> — the record of money flowing into and out of a country from trade and investment.'),
        def('<strong>Business culture</strong> — the shared way firms are run: decisions, management, promotion and acceptable practice.'),
        def('<strong>Transfer price</strong> — the price one part of an MNC charges another. <strong>Arm\'s length price</strong> — what unrelated firms would charge.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Flows: ${usdm(F.exportsYr)} exports − ${usdm(F.importsYr)} imports − ${usdm(F.profitsHome)} profit home = ${usdm(F.netFlow)} a year in.`),
        mech(`Tax: at ${usd(F.transferPrice)} not ${usd(F.armsLength)}, ${F.host} taxes ${usd(F.profitHostPair)} a pair, not ${usd(F.profitArmsPair)}; it collects ${usdm(F.hostTaxActual)}, not ${usdm(F.hostTaxArms)}.`),
        link('Profit sent home is one cost among several effects, not proof the host loses.'),
      ] },
    ],
    takeaway: ['Add up the flows.', 'Show how know-how spreads.', 'Price gap × tax rate = tax lost.'],
  },
  {
    title: B3,
    meta: '4.3.4 · 2a-2d',
    keyIdea: 'Four ethical considerations for an MNC: stakeholder conflicts, the environment, the supply chain and marketing.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Stakeholder conflict</strong> — one decision that helps one group and harms another.'),
        def('<strong>Emissions</strong> — gases and particles released into the air. <strong>Waste disposal</strong> — how leftovers are got rid of. <strong>Sustainability</strong> — meeting today\'s needs without harming future generations\'.'),
        def('<strong>Child labour</strong> — work by children that harms their health or schooling. <strong>Greenwashing</strong> — claiming environmental benefits a product does not have.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Cheaper supplier → higher profit for owners → lower pay and more risk for workers.'),
        link('Legal is not the same as ethical: a weaker host law still permits harm.'),
      ] },
    ],
    takeaway: ['Name the clash, then judge it.', 'Suppliers count.', 'True statements can still mislead.'],
  },
  {
    title: B4,
    meta: '4.3.4 · 3a',
    keyIdea: 'Seven factors in controlling MNCs: their power, political influence, legal control, consumer pressure, pressure groups, social media and self-regulation.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Political influence</strong> — lobbying, promising or withholding investment, and negotiating special terms with governments.'),
        def('<strong>Legal control</strong> — host-country law, home-country law and international agreements.'),
        def('<strong>Self-regulation</strong> — codes, audits and industry standards the firm or its industry sets and checks itself.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Pressure: evidence → shared online → boycotts and campaigns → falling sales → the MNC acts.'),
        link('Every control is limited by enforcement and by the MNC\'s ability to move.'),
      ] },
    ],
    takeaway: ['Weigh the MNC\'s power first.', 'Law needs enforcement.', 'Codes need outside checks.'],
  },
];
