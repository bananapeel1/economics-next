/**
 * PACKET 49 — business-growth teaching content: five chapters over the specification's four sub-topics
 * (`bus_spec.txt:1117-1142`), fifteen subsections, one recall each.
 *
 * WHAT THE LIVE SECTION TAUGHT, AND WHY IT IS RESHAPED. Two chapters: "Growth Methods" (organic growth;
 * mergers, takeovers and integration types) and "Growth Decisions" (reasons for staying small, alone
 * since packet 13 removed the demergers subsection on 14 Sep). No recall on the organic subsection, no
 * diagram, no taught objectives of growth, no problems arising from growth, no financial risks and
 * rewards (`specGap-01/02/03`, `structure-01/02/03/05`). Half the quiz and three of the five practice
 * items tested what no subsection taught (`topFix-01`, `quiz-01..04`, `structure-01`).
 *
 * THE FIVE CHAPTERS follow the specification's order: why businesses grow (1a), organic growth (1b, 2a,
 * 2b), mergers and takeovers (3a bullets 1-4), the risks and rewards of inorganic growth (3a bullet 5,
 * 3b, and a worked judgement between the two routes), and the problems arising from growth (4a-4c).
 * The live "Reasons for Staying Small" chapter is not rebuilt: it is not a 3.3.2 requirement (see
 * `_packet49-util.mjs`), and one pointer to 2.3.5 replaces it.
 */
import { SECTION, subId, id, FIRM, sgd, sgdm, units, pct } from './_packet49-util.mjs';

const F = FIRM;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const flow = (resultType, steps, result) => ({ type: 'flow', resultType, steps: steps.map(([title, subtitle]) => ({ title, subtitle })), result });

export const B1 = 'Why Businesses Grow';
export const B2 = 'Organic Growth';
export const B3 = 'Mergers and Takeovers';
export const B4 = 'Inorganic Growth: Risks and Rewards';
export const B5 = 'Problems Arising From Growth';

/* ══ Chapter 1 — Why businesses grow (3.3.2 · 1a) ══════════════════════════ */

const internalEos = sub('internal-economies-of-scale', {
  title: 'Internal Economies of Scale',
  keyIdea: 'Economies of scale are the fall in cost per unit as a business grows. Internal economies come from the firm\'s own size: how it buys, produces, manages, borrows and markets.',
  body: [
    p('The **objectives of growth** are what a business hopes size will bring. The first is **economies of scale**: as output rises, the **cost per unit** (average cost) falls, because many costs rise more slowly than output does.'),
    p('**Internal economies of scale** arise inside the business, from its own size. Five kinds are usually named. **Purchasing**: large orders win discounts from suppliers. **Technical**: a larger firm can afford bigger, more efficient equipment and spread its cost over more units. **Managerial**: it can employ specialists, such as a full-time buyer or accountant, instead of managers who do a bit of everything.'),
    p('**Financial**: lenders see a large firm as less risky, so it can borrow more, and more cheaply. **Marketing**: the cost of a campaign is spread over more sales, so each sale carries less of it.'),
    p(`${F.name}, a Singapore bakery-café chain, supplies its ${units(F.cafes)} cafés from one central bakery. Its flour order is large enough to win a discount a single café never could, and the cost of its head-office team and its advertising is shared across every café.`),
    p('Economies of scale lower cost per unit, not total cost. A bigger firm spends more in total; each unit simply costs less to make and sell.'),
  ],
  realExample: { emoji: '🚢', text: 'A shipping line in Hong Kong ordered container ships twice the size of its old ones. Each voyage cost more to run, but it carried so many more containers that the cost of moving each one fell sharply.' },
  misconception: 'Students write that economies of scale mean a bigger firm has lower costs. Its total costs rise as it grows; it is the cost of each unit that falls, and only while output rises faster than costs do.',
  examMatters: 'Name the particular economy the case gives evidence for, such as bulk buying or a larger machine, and explain how it lowers cost per unit for that business rather than listing all five.',
  recall: {
    type: 'match',
    prompt: 'Match each saving to the internal economy of scale it shows:',
    pairs: [
      { left: 'A supermarket chain pays less per carton of milk because it orders by the lorry-load', right: 'Purchasing economy', why: 'Big orders give the buyer bargaining power, so each unit it buys costs less.' },
      { left: 'A car maker installs a robot line that only pays off at very high output', right: 'Technical economy', why: 'Costly equipment lowers cost per unit when it is spread over a very large output.' },
      { left: 'A hotel group hires a full-time expert to negotiate its energy contracts', right: 'Managerial economy', why: 'Size pays for specialists who do one job well.' },
      { left: 'A large airline pays a lower interest rate than a small one', right: 'Financial economy', why: 'Lenders charge less to a firm they see as a safer borrower.' },
      { left: 'A national television advert costs the same whether it sells for 50 shops or 500', right: 'Marketing economy', why: 'A fixed promotion cost is shared across more sales.' },
    ],
  },
});

const externalEos = sub('external-economies-of-scale', {
  title: 'External Economies of Scale',
  keyIdea: 'External economies of scale are cost savings a firm gains because its whole industry has grown in an area, not because the firm itself is bigger.',
  body: [
    p('**External economies of scale** come from outside the business. When an industry grows and gathers in one place, every firm there can gain, whatever its own size.'),
    p('The main sources are a **pool of skilled labour**, because workers have already been trained by other firms and local colleges teach the industry\'s skills; **specialist suppliers** and repair firms that set up nearby because the industry is big enough to support them; and **shared infrastructure**, such as roads, ports and research centres built with the industry in mind.'),
    p(`Singapore's food industry supports firms that service ovens, print packaging and train bakers. ${F.name} can hire a qualified pastry chef, or get an oven repaired within a day, because so many food businesses operate nearby. A bakery in a remote town would pay more for both.`),
    p('The difference matters when a firm is deciding how to grow. Internal economies grow with the firm; external economies depend on where it operates and on the health of its industry, neither of which it controls.'),
  ],
  realExample: { emoji: '🔧', text: 'Makers of surgical instruments clustered in one Pakistani city share specialist steel suppliers, polishing workshops and a pool of skilled workers, so even small firms there can produce at low cost.' },
  misconception: 'Students think external economies of scale come from the firm growing larger. They come from the industry growing around it: a small firm in a busy cluster can enjoy them while a large firm in a remote location may not.',
  examMatters: 'Decide whether a saving comes from the firm\'s own size or from its industry and location; that reason decides whether it is internal or external, and whether the firm can control it.',
  recall: {
    type: 'classify',
    prompt: 'Sort each saving by where it comes from:',
    groups: [
      { name: 'Internal: the firm\'s own size', items: ['A discount for ordering flour by the tonne', 'A cheaper loan secured on the firm\'s many buildings', 'One head-office accounts team serving every branch'], why: 'Each saving exists because this business is large, wherever it is located.' },
      { name: 'External: the industry around it', items: ['A nearby polytechnic produces qualified chefs every year', 'Oven engineers open workshops close to the food factories', 'A new port road cuts delivery times for every local firm'], why: 'Each saving exists because the industry is large in that place, whatever this firm\'s size.' },
    ],
  },
});

const powerShare = sub('market-power-share-and-profitability', {
  title: 'Market Power, Market Share and Profitability',
  keyIdea: 'Beyond lower costs, firms grow to gain market power over customers and suppliers, a larger market share and brand recognition, and higher profitability.',
  body: [
    p('Economies of scale are one objective of growth. Businesses grow for three further reasons.'),
    p('**Increased market power over customers and suppliers.** A larger firm buys more, so its suppliers depend on its orders and accept lower prices or longer payment terms. With fewer rivals left, customers have fewer alternatives, so the firm can hold or raise its prices.'),
    p('**Increased market share and brand recognition.** Market share is a firm\'s sales as a percentage of all sales in its market. More outlets and more advertising make its name familiar, and a familiar brand wins customers who would not try an unknown one.'),
    p('**Increased profitability.** Lower costs, firmer prices and more sales can all raise profit. Growth is usually judged on this objective in the end: size that adds nothing to profit has achieved little for the owners.'),
    p(`${F.name} has ${pct(F.share)} of Singapore's bakery-café market and makes a profit of ${sgdm(F.profit)} a year. By growing it hopes to bargain harder with its flour supplier, become the chain shoppers think of first, and turn both into higher profit.`),
  ],
  realExample: { emoji: '🚕', text: 'A ride-hailing company in Southeast Asia grew until most drivers in its cities worked through its app. Its size let it set the commission drivers paid, and its name became the word passengers used for booking a ride.' },
  misconception: 'Students treat a bigger market share as the same thing as higher profit. A firm can buy share by cutting prices or spending heavily on promotion and end up less profitable; share helps only if it brings power over prices or lower costs.',
  examMatters: 'Link each objective to the case: which supplier the firm would have power over, which customers would recognise its brand, and what that would do to its profit.',
  recall: {
    type: 'classify',
    prompt: 'Sort each gain by the objective of growth it serves:',
    groups: [
      { name: 'Power over customers and suppliers', items: ['A supplier agrees to wait 90 days for payment to keep a big buyer', 'Filmgoers in a town with one cinema left pay dearer tickets'], why: 'Others depend on the firm, so it can set the terms.' },
      { name: 'Share and a known name', items: ['The chain takes 12 of every 100 dollars spent in its market, up from 8', 'Shoppers pick its bread because they know the label'], why: 'The firm wins a bigger slice of spending and a name buyers trust.' },
      { name: 'Profitability', items: ['Costs fall faster than prices, so the margin on each sale widens', 'Each new branch adds more to profit than it costs to run'], why: 'These show the gains reaching the bottom line, which is what growth is finally judged on.' },
    ],
  },
});

/* ══ Chapter 2 — Organic growth (3.3.2 · 1b, 2a, 2b) ═══════════════════════ */

const routes = sub('organic-and-inorganic-growth', {
  title: 'Organic and Inorganic Growth',
  keyIdea: 'Organic growth is a business expanding from within, using its own resources. Inorganic growth is expanding by joining with another business through a merger or takeover.',
  body: [
    p('There are two routes to a bigger business. **Organic growth**, also called internal growth, means expanding from within: selling more, opening new sites or launching new products, using the firm\'s own resources and profits.'),
    p('**Inorganic growth**, also called external growth, means expanding by combining with another business through a **merger** or a **takeover**. The firm grows at once by acquiring sales, staff and assets that someone else built.'),
    p('The distinction between inorganic and organic growth is about how the extra capacity is obtained, not about how fast it arrives or how it is paid for. A firm that borrows to build its own new factory is still growing organically; a firm that buys a rival with cash it has saved is still growing inorganically.'),
    p(`${F.name} faces exactly this choice. It can open ${units(F.newCafes)} cafés of its own over two years, or buy ${F.rival}, a rival chain with ${units(F.rivalCafes)} cafés, in a single deal.`),
  ],
  realExample: { emoji: '✈️', text: 'Two budget airlines in Southeast Asia chose different routes: one added aircraft and routes step by step from its own profits, while the other bought a smaller rival, with its aircraft and landing slots, in one deal.' },
  misconception: 'Students call any growth paid for with borrowed money inorganic. The route decides it, not the finance: building new outlets of your own with a loan is organic, and buying another business outright is inorganic.',
  examMatters: 'Classify the growth in the case by whether the business builds the new capacity itself or acquires another business, and quote the evidence in the case that shows which.',
  recall: {
    type: 'classify',
    prompt: 'Sort each expansion by the route it takes:',
    groups: [
      { name: 'Organic', items: ['A noodle chain opens five more branches with its own profits', 'A phone maker designs a cheaper model for students', 'A bookshop starts selling through its own website'], why: 'The business builds each new capacity itself, without joining another firm.' },
      { name: 'Inorganic', items: ['A bank buys a smaller rival together with its branches', 'Two insurers agree to combine into one company', 'A steel maker buys the mine that supplies its iron ore'], why: 'The business grows by acquiring, or joining with, a business someone else built.' },
    ],
  },
});

const methods = sub('methods-of-organic-growth', {
  title: 'Methods of Growing Organically',
  keyIdea: 'A business grows organically by adding outlets or capacity, launching new products, entering new markets or selling online, each built with its own resources.',
  body: [
    p('The methods of growing organically all build on what the business already has. **More outlets and capacity**: more shops or branches, a bigger factory, longer opening hours. **New products**: developing items to sell to existing customers.'),
    p('**New markets**: selling existing products to new customers, in a new region, a new country or a new group of buyers. **Selling online**: a website, an app or a delivery platform that reaches customers who never visit a shop.'),
    p('Some firms spread their name faster by letting other businesses run outlets under it, through franchising or licensing; franchising as a form of business is covered in 2.3.1.'),
    p(`${F.name} is using several of these at once. Its plan is ${units(F.newCafes)} new cafés over two years at ${sgd(F.fitOut)} each, paid for from retained profit. It has added an app for office deliveries, and it has agreed to sell frozen dough to supermarkets, a new market for something it already makes.`),
    p('Each method uses resources the firm already has or can build step by step. That is what makes organic growth controllable, and also what makes it slow.'),
  ],
  realExample: { emoji: '🧋', text: 'A tea-shop chain in Kuala Lumpur grew from 12 outlets to 60 without buying anyone: it opened branches near universities, added a bottled-tea range for supermarkets and launched its own delivery app.' },
  misconception: 'Students think organic growth only means opening more branches. Launching a product, entering a new country and selling online are organic too, because the firm builds each of them itself.',
  examMatters: 'Choose the method that suits the firm in the case, given its products, customers and resources, and explain why it would work for that firm, rather than listing every method.',
  recall: {
    type: 'match',
    prompt: 'Match each plan to the method of organic growth it uses:',
    pairs: [
      { left: 'A juice maker sells its existing drinks in Nigeria for the first time', right: 'Entering a new market', why: 'The product is unchanged; the customers are new.' },
      { left: 'A gym chain adds yoga classes for the members it already has', right: 'Launching a new product', why: 'Existing customers are offered something the firm did not sell before.' },
      { left: 'A hardware store lets customers order through its own app', right: 'Selling online', why: 'A digital channel reaches buyers who would not come to the shop.' },
      { left: 'A bakery chain builds a second, larger central kitchen', right: 'Adding capacity', why: 'The firm can now produce more of what it already makes.' },
    ],
  },
});

const organicProsCons = sub('organic-growth-advantages-and-disadvantages', {
  title: 'Organic Growth: Advantages and Disadvantages',
  keyIdea: 'Organic growth is lower-risk and keeps control and culture intact, but it is slow, limited by the firm\'s own finance, and may let rivals reach the market first.',
  body: [
    p('**Advantages of organic growth.** The owners keep **control**: they choose each new site and product and can pause if one disappoints. Growth builds on what the firm already knows, so the risk of each step is lower. The **culture** stays the same, because no other workforce has to be absorbed. It can often be financed from **retained profit**, so no new debt is needed.'),
    p('**Disadvantages of organic growth.** It is **slow**: each outlet has to be found, fitted out and filled with customers. It is **limited by the finance** the business can generate, so growth may not keep up with the market. Rivals that grow faster, especially by takeover, may win the best sites, the biggest customers and the economies of scale first.'),
    flow('neutral', [
      ['Profit is kept in the business', 'no new debt'],
      ['A few new cafés open each year', 'each one tested before the next'],
      ['Growth is steady but slow', 'rivals may move faster'],
    ], 'Lower risk, paid for in time'),
    p(`For ${F.name}, ${units(F.newCafes)} new cafés keep the risk small and its kitchens working the way they always have. But the plan reaches only ${units(F.cafesAfterOrganic)} cafés in two years, while buying ${F.rival} would reach ${units(F.cafesAfterTakeover)} at once.`),
  ],
  realExample: { emoji: '💊', text: 'A family-run pharmacy chain in Nairobi grew only as fast as its profits allowed, opening two or three branches a year. It never took on debt, but a better-funded rival bought up the best high-street sites first.' },
  misconception: 'Students write that organic growth is always the safest choice. Each step is lower-risk, but growing too slowly in a fast-moving market can leave a firm too small to compete, which is a risk of its own.',
  examMatters: 'Weigh the speed organic growth gives up against the control it keeps, using the case: how fast the market is moving, and whether the firm can fund enough growth from its own profits.',
  recall: {
    type: 'classify',
    prompt: 'Sort each point about growing organically into an advantage or a disadvantage:',
    groups: [
      { name: 'Advantage', items: ['A single disappointing branch can be closed without harming the others', 'No second workforce with different habits must be merged in', 'The expansion can be paid for without a bank loan'], why: 'Each keeps risk, debt or disruption low because the firm grows one step at a time on its own terms.' },
      { name: 'Disadvantage', items: ['A quicker rival secures the prime locations', 'The pace of expansion is capped by what the firm earns', 'Reaching the size the market rewards takes many years'], why: 'Each is a cost of slowness: the firm can only grow as fast as its own resources allow.' },
    ],
  },
});

/* ══ Chapter 3 — Mergers and takeovers (3.3.2 · 3a, bullets 1-4) ════════════ */

const mAndA = sub('mergers-and-takeovers', {
  title: 'Mergers and Takeovers',
  keyIdea: 'In a merger two firms agree to combine into one on roughly equal terms; in a takeover one firm buys control of another by acquiring over half of its shares.',
  body: [
    p('**Mergers and takeovers** are the two ways of growing inorganically. The distinction between mergers and takeovers is about how control changes. In a **merger**, two businesses agree to join into a single firm, usually on roughly equal terms, and the owners of both swap their shares for shares in the combined business.'),
    p('In a **takeover**, also called an acquisition, one business buys a **controlling interest** in another: more than half of its voting shares. The target\'s directors may welcome the bid, a friendly takeover, or oppose it, a hostile one. In a hostile bid the buyer goes directly to the shareholders, and normally has to pay them well above what their shares were worth before the bid.'),
    p('**Reasons for mergers and takeovers.** Speed: capacity, customers and staff arrive at once. Market power and market share: a rival bought is a rival removed. Cost savings from combining, such as one head office and bigger orders, sometimes called synergy. Access to products, brands, skills or markets the firm lacks. Securing supplies or outlets. Spreading risk across more than one market.'),
    p(`Buying ${F.rival} would give ${F.name} ${units(F.rivalCafes)} cafés, their customers and their bakers at once, lift its share of the market from ${pct(F.share)} to ${pct(F.shareAfter)}, and let one central bakery supply both chains.`),
  ],
  realExample: { emoji: '🏦', text: 'Two regional banks in the Gulf merged to form one of the region\'s largest lenders. Neither bought the other: the owners of both received shares in the new bank, and branches serving the same neighbourhoods were closed.' },
  misconception: 'Students use "merger" and "takeover" as if they mean the same thing. A merger is an agreed combination of roughly equal partners; a takeover is one firm buying control of another, which can happen against the target\'s wishes.',
  examMatters: 'When firms in the case combine, decide whether it is a merger or a takeover from how control changes, then explain the reason for the deal that the case gives evidence for.',
  recall: {
    type: 'reorder',
    prompt: 'Put the stages of a takeover in order, from choosing a target to the savings it is meant to bring:',
    criterion: 'chronological: each stage can only happen once the one before it has',
    correctOrder: [
      'A buyer picks out a rival worth owning',
      'It bids for the shares at a price above their market value',
      'Enough owners sell, and control passes to the buyer',
      'The two firms merge their offices, buying and systems',
      'Costs fall below what the two firms spent apart',
    ],
    why: [
      'Nothing can be offered until there is a target.',
      'Owners need a reason to sell, so the bid comes at a premium.',
      'Only once the buyer holds over half the shares can it run the target.',
      'Combining operations is possible only after control has passed.',
      'The savings come from the combined operations, so they arrive last, if at all.',
    ],
  },
});

const integration = sub('horizontal-and-vertical-integration', {
  title: 'Horizontal and Vertical Integration',
  keyIdea: 'Horizontal integration joins firms at the same stage of production. Vertical integration joins firms at different stages: backward towards suppliers, forward towards customers.',
  body: [
    p('Every product passes through **stages of production**: raw materials, processing or manufacturing, distribution, and selling to the consumer. A merger or takeover is classified by where the two businesses sit in that chain.'),
    p('**Horizontal integration** combines two firms at the **same stage** of the same industry, usually rivals. It brings market share, market power and economies of scale most directly, and it is the kind a country\'s competition authority is most likely to examine.'),
    p('**Vertical integration** combines firms at **different stages** of the same chain. **Backward** vertical integration moves towards the raw materials: owning a supplier secures supplies, controls quality and removes the supplier\'s profit margin from the buyer\'s costs. **Forward** vertical integration moves towards the consumer: owning a distributor or retailer secures outlets and brings the firm closer to its customers.'),
    p(`For ${F.name}, buying ${F.rival} is horizontal, since both run bakery-cafés. Buying ${F.mill}, which supplies its flour, would be backward vertical; buying a delivery company that carries its dough to supermarkets would be forward vertical.`),
  ],
  realExample: { emoji: '🌴', text: 'A palm oil refiner in Malaysia bought plantations to secure its supply of fruit, and later bought a cooking-oil brand sold in supermarkets, extending the business in both directions along the same chain.' },
  misconception: 'Students label any takeover of a supplier or customer as horizontal because the two firms already work together. Horizontal means the same stage of production; a supplier or a customer is at a different stage, so the integration is vertical.',
  examMatters: 'Place both firms in the chain from raw materials to consumer, state which stage each occupies, and name the direction; then explain what that kind of integration gives this particular buyer.',
  recall: {
    type: 'classify',
    prompt: 'A chocolate maker is weighing six deals. Sort each by the direction it moves the firm in the chain:',
    groups: [
      { name: 'Backward, towards its inputs', items: ['Buying a cocoa plantation in Ghana', 'Buying the firm that prints its wrappers'], why: 'Each target supplies something the chocolate maker uses.' },
      { name: 'Same stage', items: ['Buying a rival chocolate maker', 'Joining with a sweet factory of similar size'], why: 'Each target makes the same kind of product at the same stage.' },
      { name: 'Forward, towards its buyers', items: ['Buying a chain of sweet shops', 'Buying the wholesaler that delivers to supermarkets'], why: 'Each target stands between the chocolate maker and the people who eat its products.' },
    ],
  },
});

const conglomerates = sub('conglomerates', {
  title: 'Conglomerates',
  keyIdea: 'A conglomerate is a business that owns firms in unrelated markets. Growing this way spreads risk, but gives little of the cost savings a linked takeover brings.',
  body: [
    p('A **conglomerate** is a business made up of firms operating in unrelated markets. **Conglomerate integration** is a merger or takeover between businesses with no link in the chain of production: neither supplies, buys from nor competes with the other.'),
    p('**Why grow this way?** Chiefly to **spread risk**: if demand falls in one market, profits from the others keep the group going. It can also put spare cash to work, or buy a way into a growing market the firm could not enter from scratch.'),
    p('**The drawbacks.** Few cost savings are available, because the businesses share no suppliers, factories or customers. Managers may not understand the markets they have bought into. And investors can often spread their own risk more cheaply by holding shares in several firms, so the stock market may value a conglomerate at less than its parts would be worth separately.'),
    p(`If the owners of ${F.name} bought a laundry chain, that would be conglomerate integration. It would protect them if the café market weakened, but the laundries would share nothing with the bakeries except their owners.`),
  ],
  realExample: { emoji: '🏗️', text: 'A family-owned group in Nigeria runs cement plants, sugar refineries and a salt business side by side. A slump in building work hurts one division, while food sales keep the group\'s cash flowing.' },
  misconception: 'Students assume a conglomerate gains the same economies of scale as a horizontal takeover. With no shared production, suppliers or customers, most of those savings are not available; its main gain is spreading risk.',
  examMatters: 'When a buyer in the case enters an unrelated market, weigh the risk it spreads against the savings and expertise it gives up, and say which matters more for that business.',
  recall: {
    type: 'fillin',
    prompt: 'Name the type of integration in each deal:',
    template: [
      'A car maker buying a steel mill is ___ vertical integration.',
      'A car maker buying a chain of car showrooms is ___ vertical integration.',
      'A car maker buying a rival car maker is ___ integration.',
    ],
    answers: ['backward', 'forward', 'horizontal'],
    hints: ['moving up the chain to an input it uses', 'moving down the chain to where the product is sold', 'both firms do the same job in the chain'],
    distractors: ['conglomerate', 'organic'],
  },
});

/* ══ Chapter 4 — Inorganic growth: risks and rewards (3.3.2 · 3a bullet 5, 3b) ═ */

const riskReward = sub('financial-risks-and-rewards', {
  title: 'Financial Risks and Rewards of a Takeover',
  keyIdea: 'A takeover\'s rewards are the profit and cost savings it adds; its risks are paying too much, the cost of financing the deal, and savings that never appear.',
  body: [
    p('**Financial rewards.** The buyer gains the target\'s profit, plus any cost savings from running the two businesses as one. Greater market power may also raise prices or lower input costs. If these gains are worth more than the deal cost, the owners are better off.'),
    p('**Financial risks.** The buyer usually pays a **premium**: more than the value of the target\'s net assets, and more than its shares were trading at, to persuade the owners to sell. If the expected profit and savings do not arrive, that premium is lost. A deal financed by **borrowing** adds interest that must be paid whatever happens, and raises gearing. One financed by issuing new shares **dilutes** the existing owners\' control and their share of future profit.'),
    p('A worked case. A gym chain pays S$50m for a rival whose net assets are worth S$32m, a premium of S$18m. The rival earns S$4m a year, and combining the two should save S$1m a year. The chain borrows S$30m at 5%, so interest is S$1.5m a year, and the yearly gain after interest is S$3.5m, provided the savings arrive.'),
    p('So the reward is uncertain and arrives over years, while the premium and the debt are fixed on the day the deal is signed.'),
  ],
  realExample: { emoji: '🥟', text: 'A listed food group in Hong Kong paid well above market value for an overseas snack brand. Its sales fell short of the forecast, and within three years the group had written off most of the premium as a loss.' },
  misconception: 'Students assume a takeover pays off if the target is profitable. What matters is whether the profit and savings gained are worth more than the price and the cost of financing it; a profitable target bought for too much can still lose the buyer money.',
  examMatters: 'Where the case gives figures, set the yearly gain (the target\'s profit plus any savings, less interest) against the price paid, and judge how certain each part of that gain is.',
  recall: {
    type: 'fillin',
    prompt: 'Work out the figures for this deal:',
    template: [
      'A firm pays S$45m for a business whose net assets are worth S$30m, so the premium is S$___m.',
      'It borrows S$20m of the price at 5% a year, so the yearly interest is S$___m.',
    ],
    answers: ['15', '1'],
    hints: ['the price paid less the value of what is bought', 'the amount borrowed times the rate'],
    distractors: ['75', '4'],
  },
});

const inorganicProsCons = sub('inorganic-growth-advantages-and-disadvantages', {
  title: 'Inorganic Growth: Advantages and Disadvantages',
  keyIdea: 'Inorganic growth is fast and brings market share, skills and economies of scale at once, but it is costly, risky and hard to integrate.',
  body: [
    p('**Advantages of inorganic growth.** It is **fast**: a firm can double in size in one deal. It buys an established **market share**, customers and brand, and may remove a rival. It brings **skills, products or technology** the buyer lacks, and it can deliver economies of scale sooner than building capacity would.'),
    p('**Disadvantages of inorganic growth.** It is **expensive**, and the premium may never be recovered. It is **risky**, because the buyer knows its target less well than its own business. **Integration** is hard: two sets of systems, pay scales and ways of working must become one, and where the two cultures clash, staff leave and the expected savings shrink. A deal between rivals may also be blocked, or allowed only on conditions, by the competition authority.'),
    flow('bad', [
      ['Takeover completed', 'two workforces, two ways of working'],
      ['Cultures clash', 'experienced staff leave'],
      ['Savings shrink', 'customers notice the disruption'],
    ], 'The price paid becomes harder to recover'),
    p(`${F.rival} would take ${F.name} to ${units(F.cafesAfterTakeover)} cafés at once, but its bakers are used to their own recipes and routines, and ${F.name}'s standardised kitchens may not suit them.`),
  ],
  realExample: { emoji: '🛫', text: 'When two airlines in Southeast Asia merged, joining their booking systems and pay scales took several years. Cabin crew from each airline kept working different rosters long after the deal.' },
  misconception: 'Students write that takeovers fail mainly because of culture clash. It is one reason among several: paying too much, overestimating the savings and poor planning of the integration are just as common.',
  examMatters: 'Balance the speed and market share a takeover brings against its cost and the difficulty of combining the two businesses, using what the case says about each firm.',
  recall: {
    type: 'classify',
    prompt: 'Sort each outcome of a takeover into an advantage or a disadvantage for the buyer:',
    groups: [
      { name: 'Advantage', items: ['Its share of the market doubles in a single deal', 'A rival that kept cutting prices disappears', 'The target\'s patented recipes now belong to the buyer'], why: 'Each gives the buyer size, power or know-how faster than it could build them.' },
      { name: 'Disadvantage', items: ['Two incompatible computer systems must be joined', 'The price includes a large sum above the target\'s asset value', 'The regulator insists that some shops be sold'], why: 'Each adds cost, risk or conditions that organic growth would have avoided.' },
    ],
  },
});

const worked = sub('organic-or-inorganic-worked-judgement', {
  title: 'Organic or Inorganic? A Worked Judgement',
  keyIdea: 'Choosing between organic and inorganic growth depends on how fast the market is moving, what the firm can afford, and how well the two businesses would fit.',
  body: [
    p('A question on growth often asks for a judgement: should this business grow organically or by taking over another? A strong answer weighs both routes against the firm\'s circumstances and says what the choice depends on.'),
    p(`**For organic growth at ${F.name}.** Fifteen new cafés over two years are paid for from retained profit, with no debt. Each café can be placed where ${F.name} chooses and run its way, and if one site disappoints, the next can be changed.`),
    p(`**For the takeover.** ${F.rival} brings ${units(F.rivalCafes)} cafés, a larger share of the market and trained staff at once. Baking for ${units(F.cafesAfterTakeover)} cafés in one central bakery should lower the cost of each loaf, and a rival would be gone.`),
    p('**The judgement.** The takeover is better only if its extra speed and share are worth the premium and the debt. That depends most on whether the savings from combining actually arrive, which depends in turn on how readily the rival\'s bakers adapt. If rivals are racing for sites, speed matters more and the takeover is stronger; if not, organic growth delivers much of the gain for less risk.'),
  ],
  realExample: { emoji: '🏥', text: 'A pharmacy chain in the Gulf grew organically for years, then bought a smaller rival when a change in health rules opened its market quickly. For that one decision, speed mattered more than control.' },
  misconception: 'Students pick one route and argue it is always better. Neither is: organic growth is safer but slower, inorganic growth faster but riskier, and the right choice changes with the market and the firm.',
  examMatters: 'End with the condition your judgement depends on, such as whether the savings from combining are likely to be achieved, rather than a flat recommendation.',
  recall: {
    type: 'match',
    prompt: 'Match each situation to the route it most favours, and why:',
    pairs: [
      { left: 'Competitors are snapping up the best locations in a booming market', right: 'Takeover, because speed matters most', why: 'Waiting to build outlets one by one would leave the best sites to rivals.' },
      { left: 'The firm has savings but its bank will not lend it more', right: 'Organic, because no debt is needed', why: 'Growth can be funded from profit the firm already holds.' },
      { left: 'The target\'s staff work in a completely different way', right: 'Organic, because combining would be hard', why: 'A culture clash would eat into the savings a deal is meant to bring.' },
      { left: 'The firm needs expertise it would take years to develop', right: 'Takeover, because it buys the skill', why: 'Acquiring a business that already has the skill is faster than training it.' },
    ],
  },
});

/* ══ Chapter 5 — Problems arising from growth (3.3.2 · 4a-4c) ══════════════ */

const diseconomies = sub('diseconomies-of-scale', {
  title: 'Diseconomies of Scale',
  keyIdea: 'Diseconomies of scale are rises in cost per unit when a business grows too large, caused by problems of coordination, communication and motivation.',
  body: [
    p('Growth does not lower costs for ever. Beyond some size, **diseconomies of scale** set in: cost per unit starts to **rise** as the business grows, because it becomes harder to run.'),
    p('**Coordination.** With more sites, products and departments, it is harder to keep everyone working to one plan, so duplication and waste creep in. **Communication.** Messages pass through more people and more layers, so they arrive later and are more often misunderstood. **Motivation.** In a very large organisation staff can feel like a small, unnoticed part of the whole, so effort falls and absence and staff turnover rise.'),
    p('Together, economies and diseconomies explain why cost per unit tends to fall as a firm grows, level out, and eventually rise. Growth pays only while the savings from size outweigh the extra cost of managing it.'),
    p(`After a takeover, ${F.name} would have ${units(F.cafesAfterTakeover)} cafés and ${units(F.staffAfter)} staff under two brands. If café managers wait longer for decisions and staff at the former ${F.rival} cafés feel overlooked, the cost of each loaf sold could rise even while the central bakery bakes each loaf more cheaply.`),
  ],
  realExample: { emoji: '🏨', text: 'A fast-growing budget hotel group in India opened hundreds of properties in a few years. Standards varied from hotel to hotel, complaints rose, and head office had to hire whole teams just to inspect its own sites.' },
  misconception: 'Students think diseconomies of scale mean total costs rise as a firm grows. Total costs always rise with output; diseconomies mean the cost of each unit rises, because the business has become harder to coordinate and motivate.',
  examMatters: 'Identify the cause of diseconomies the case gives evidence for, whether coordination, communication or motivation, and explain how it would raise cost per unit for that business.',
  recall: {
    type: 'match',
    prompt: 'Match each problem in a large firm to the cause of diseconomies of scale it shows:',
    pairs: [
      { left: 'Two regional offices each pay a consultant to study the same problem', right: 'Weak coordination', why: 'Nobody sees the whole business, so work is duplicated.' },
      { left: 'A new price list reaches branches a week late and partly wrong', right: 'Slow, distorted communication', why: 'Information loses time and accuracy as it passes through more hands.' },
      { left: 'Factory workers in a 5,000-person firm stop suggesting improvements', right: 'Falling motivation', why: 'People who feel unnoticed put in less effort and ideas.' },
    ],
  },
});

const communication = sub('internal-communication', {
  title: 'Internal Communication',
  keyIdea: 'As a business grows, internal communication gets harder: more layers and more people slow messages down and distort them, and managers lose touch with the front line.',
  body: [
    p('**Internal communication** is the passing of information within a business: instructions down, feedback and ideas up, and coordination across departments. A small firm does most of it face to face. Growth makes it harder in three ways.'),
    p('**More layers of hierarchy.** Each extra layer of management between the top and the front line is one more point where a message can be delayed, shortened or misread. **More people and sites.** Information must reach more staff in more places, often in writing, so it travels more slowly and is discussed less. **More specialist departments.** Each develops its own priorities and jargon, so departments talk to each other less.'),
    flow('bad', [
      ['A new layer of managers', 'between head office and the cafés'],
      ['Messages take longer and lose detail', 'front-line problems reach the top late'],
      ['Decisions are slower and less informed', 'mistakes are repeated'],
    ], 'Costs and customer complaints rise'),
    p(`${F.name} has ${units(F.layersNow)} layers of management today; running ${units(F.cafesAfterTakeover)} cafés would take ${units(F.layersAfter)}. A café manager who reports that customers dislike a new recipe would then wait while the message passes through two more people before anyone acts on it.`),
    p('Firms respond with clear reporting lines, regular briefings, shared digital systems, and by letting local managers decide without waiting for head office.'),
  ],
  realExample: { emoji: '📡', text: 'A bank in Kenya with branches across the country found that product changes decided in Nairobi reached rural branches weeks late. It set up a weekly video briefing for every branch manager, and complaints about wrong information fell.' },
  misconception: 'Students assume more technology solves communication problems in a large firm. Email and apps move messages faster, but they do not remove layers of hierarchy or make people read and act on what they receive.',
  examMatters: 'Explain how the growth in the case, whether more layers, more sites or more staff, damages communication, and what that does to decisions, costs or customers for that business.',
  recall: {
    type: 'classify',
    prompt: 'Sort each change by its likely effect on communication in a growing firm:',
    groups: [
      { name: 'Makes it worse', items: ['Two more tiers of managers are added between the chief executive and the shops', 'Staff at newly opened sites get instructions only by email', 'The marketing and finance teams move to different buildings'], why: 'Each puts more distance, more steps or less discussion between the people who need to share information.' },
      { name: 'Makes it better', items: ['Store managers may change staff rotas without asking head office', 'Every Monday, all branch managers join a short video call', 'One shared system shows stock levels at every site'], why: 'Each shortens the path a message travels or lets people see the same information directly.' },
    ],
  },
});

const overtrading = sub('overtrading', {
  title: 'Overtrading',
  keyIdea: 'Overtrading is growing faster than working capital can support: the firm pays for stock, staff and sites before customers pay, and runs short of cash while still profitable.',
  body: [
    p('**Overtrading** happens when a business expands too quickly for the cash it has available. It takes on more orders, sites or staff than its **working capital** can fund, so it cannot pay suppliers and wages on time, even though it may be making a profit on paper.'),
    p('The cause is timing. Growth means paying out first, for materials, wages and new premises, while the revenue from the extra sales arrives later, especially when customers are given credit. The faster the growth, the larger that gap. Profit is not cash, and a business that cannot pay its bills can fail however full its order book is.'),
    p(`${F.name}'s supermarket deal shows the risk. The supermarkets pay for frozen dough ${units(F.customerDays)} days after delivery, but ${F.mill} must be paid within ${units(F.supplierDays)} days. If ${F.name} also pays for new cafés out of its cash, it could run short of money to pay its suppliers at the very time its sales and profit are rising.`),
    p('**Avoiding it.** Forecast cash flow before expanding; grow in steps; arrange an overdraft or longer-term finance before it is needed; and negotiate shorter credit for customers or longer credit from suppliers.'),
  ],
  realExample: { emoji: '🪑', text: 'A furniture maker in Vietnam won a large order from an overseas retailer that paid 90 days after delivery. It bought timber and hired workers at once, and within two months could not pay its timber supplier, though the order itself was profitable.' },
  misconception: 'Students think only unprofitable firms run out of cash. Overtrading hits firms whose sales and profits are growing, because the cash to fund the growth is paid out before the revenue from it comes in.',
  examMatters: 'Show the timing gap from the case, when the firm pays out and when it is paid, and explain why that gap matters more the faster the business grows.',
  recall: {
    type: 'fillin',
    prompt: 'Complete each statement about funding growth:',
    template: [
      'A caterer pays for food within 15 days but its office clients pay after 45 days, so each order must be funded for ___ days.',
      'If those clients paid after 20 days instead, the gap to be funded would shrink to ___ days.',
    ],
    answers: ['30', '5'],
    hints: ['the gap between paying out and being paid', 'the same subtraction with the shorter wait'],
    distractors: ['60', '35'],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [internalEos, externalEos, powerShare],
    takeaway: [
      'Economies of scale lower cost per unit, not total cost.',
      'Internal economies come from the firm\'s size; external ones from its industry.',
      'Firms also grow for market power, market share, brand recognition and profit.',
    ],
  },
  {
    title: B2,
    subs: [routes, methods, organicProsCons],
    takeaway: [
      'Organic growth builds from within; inorganic growth joins another business.',
      'Organic methods: outlets and capacity, new products, new markets, online sales.',
      'Organic growth keeps control and lowers risk, but it is slow.',
    ],
  },
  {
    title: B3,
    subs: [mAndA, integration, conglomerates],
    takeaway: [
      'A merger is agreed between equals; a takeover buys control.',
      'Horizontal: same stage. Vertical: backward to suppliers, forward to customers.',
      'A conglomerate spreads risk but shares few cost savings.',
    ],
  },
  {
    title: B4,
    subs: [riskReward, inorganicProsCons, worked],
    takeaway: [
      'Set the profit and savings gained against the price and the cost of finance.',
      'Takeovers are fast but costly; combining the two firms is where savings are won.',
      'Culture clash is one reason takeovers disappoint; overpaying is another.',
    ],
  },
  {
    title: B5,
    subs: [diseconomies, communication, overtrading],
    takeaway: [
      'Past some size, coordination, communication and motivation push unit costs up.',
      'More layers and more sites slow messages down and distort them.',
      'Overtrading: growth outruns cash, and a profitable firm can fail.',
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
 * THE LEAF MAP, BY HAND. 16 leaves at `bus_spec.txt:1121-1142` (18 rows in `spec-items.json`).
 * Every ledger id's corrected citation runs through this table rather than through its "3.2.x".
 */
export const LEAF_MAP = {
  'BUS-3.3.2-1a-1': ['internal-economies-of-scale', 'external-economies-of-scale'],
  'BUS-3.3.2-1a-2': ['market-power-share-and-profitability'],
  'BUS-3.3.2-1a-3': ['market-power-share-and-profitability'],
  'BUS-3.3.2-1a-4': ['market-power-share-and-profitability'],
  'BUS-3.3.2-1b': ['organic-and-inorganic-growth'],
  'BUS-3.3.2-2a': ['methods-of-organic-growth'],
  'BUS-3.3.2-2b': ['organic-growth-advantages-and-disadvantages'],
  'BUS-3.3.2-3a-1': ['mergers-and-takeovers'],
  'BUS-3.3.2-3a-2': ['mergers-and-takeovers'],
  'BUS-3.3.2-3a-3': ['horizontal-and-vertical-integration'],
  'BUS-3.3.2-3a-4': ['conglomerates'],
  'BUS-3.3.2-3a-5': ['financial-risks-and-rewards'],
  'BUS-3.3.2-3b': ['inorganic-growth-advantages-and-disadvantages', 'organic-or-inorganic-worked-judgement'],
  'BUS-3.3.2-4a': ['diseconomies-of-scale'],
  'BUS-3.3.2-4b': ['internal-communication'],
  'BUS-3.3.2-4c': ['overtrading'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, TITLED AS THE CHAPTER (structure-08: the live notes had three topics,
 * one of them the off-specification "Reasons for Staying Small"), with no misconception field.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3.3.2 · 1a',
    keyIdea: 'The objectives of growth: economies of scale, market power, market share and brand recognition, and profitability.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Economies of scale</strong> — the fall in cost per unit as a business grows.'),
        def('<strong>Internal economies of scale</strong> — savings from the firm\'s own size: purchasing, technical, managerial, financial, marketing.'),
        def('<strong>External economies of scale</strong> — savings from the growth of the industry in an area: skilled labour, specialist suppliers, shared infrastructure.'),
        def('<strong>Market share</strong> — a firm\'s sales ÷ total sales in the market × 100.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Bigger orders, bigger machines, specialist managers, cheaper loans and shared advertising → lower cost per unit.'),
        mech('Size → suppliers and customers depend on the firm → market power over prices and terms.'),
        link('Share and brand recognition matter only if they raise profitability.'),
        link('Not every firm aims to grow: how a small business competes is covered in 2.3.5.'),
      ] },
    ],
    takeaway: ['Cost per unit falls, not total cost.', 'Internal or external: whose size?', 'Share is not the same as profit.'],
  },
  {
    title: B2,
    meta: '3.3.2 · 1b, 2a-2b',
    keyIdea: 'Organic growth builds from within; it keeps control and lowers risk but is slow and limited by the firm\'s own finance.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Organic (internal) growth</strong> — expanding from within, using the firm\'s own resources.'),
        def('<strong>Inorganic (external) growth</strong> — expanding by merger or takeover.'),
        def('<strong>Methods of growing organically</strong> — more outlets and capacity, new products, new markets, selling online.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('For: control, lower risk, culture unchanged, financed from retained profit.'),
        mech('Against: slow, limited by the firm\'s own finance, rivals may grow faster.'),
        link(`${F.name}: ${units(F.newCafes)} cafés at ${sgd(F.fitOut)} each, ${sgdm(F.organicCost)} from retained profit.`),
      ] },
    ],
    takeaway: ['The route decides it, not the finance.', 'Four routes, all built from within.', 'Safe step by step, slow overall.'],
  },
  {
    title: B3,
    meta: '3.3.2 · 3a',
    keyIdea: 'Mergers and takeovers, why firms make them, and how integration is classified by the stages of production.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Merger</strong> — two firms agree to combine into one on roughly equal terms.'),
        def('<strong>Takeover</strong> — one firm buys a controlling interest (over half the voting shares) in another; friendly or hostile.'),
        def('<strong>Horizontal integration</strong> — same stage of production. <strong>Vertical integration</strong> — different stages: backward (towards suppliers) or forward (towards customers).'),
        def('<strong>Conglomerate</strong> — a business owning firms in unrelated markets.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Reasons: speed, market power and share, cost savings from combining, new products or skills, secure supplies or outlets, spreading risk.'),
        mech('Backward: secure supply, control quality, remove the supplier\'s margin. Forward: secure outlets, get closer to customers.'),
        link('A conglomerate spreads risk but shares few cost savings.'),
      ] },
    ],
    takeaway: ['How does control change?', 'Place both firms in the chain.', 'Unrelated means risk spread, few savings.'],
  },
  {
    title: B4,
    meta: '3.3.2 · 3a, 3b',
    keyIdea: 'A takeover adds profit and savings but costs a premium and often debt; whether it beats organic growth depends on speed, finance and fit.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Premium</strong> — the amount paid above the value of the target\'s net assets (or its share price before the bid).'),
        def('<strong>Yearly gain</strong> — the target\'s profit + savings from combining − interest on money borrowed for the deal.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Rewards: added profit, cost savings, market power. Risks: overpaying, interest and gearing, dilution, savings that never arrive.'),
        mech('For inorganic growth: fast, instant share, skills. Against: costly, risky, hard to integrate, may be blocked by the competition authority.'),
        link('The judgement turns on whether the savings from combining are achieved.'),
      ] },
    ],
    takeaway: ['Gain against price and finance.', 'Speed against integration.', 'Name the condition.'],
  },
  {
    title: B5,
    meta: '3.3.2 · 4a-4c',
    keyIdea: 'Growth brings its own problems: diseconomies of scale, harder internal communication and overtrading.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Diseconomies of scale</strong> — a rise in cost per unit as a firm grows too large.'),
        def('<strong>Internal communication</strong> — information passed within the business: down, up and across.'),
        def('<strong>Overtrading</strong> — expanding faster than working capital can support, so the firm runs short of cash.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Causes of diseconomies: weaker coordination, slower and distorted communication, lower motivation.'),
        mech('Overtrading: pay out first (stock, wages, sites), get paid later (credit) → cash gap grows with the speed of growth.'),
        link('Overtrading as a cause of business failure also appears in 2.3.3.'),
      ] },
    ],
    takeaway: ['Unit costs can rise with size.', 'More layers, slower messages.', 'Profit is not cash.'],
  },
];
