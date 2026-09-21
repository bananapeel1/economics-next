/**
 * PACKET 16 — meeting-customer-needs, Learn Mode content and Notes.
 *
 * Business Unit 1 (WBS11), IAL topic 1.3.1, audit/raw/bus_spec.txt:504-544. Six blocks in the
 * specification's own order — the market, dynamic markets and risk, what research is for, the methods,
 * orientation and mapping, positioning — and one subsection per skill, so no step carries two ideas.
 * That is the packet's answer to 101 of 123 starts stopping on step 0: fifteen crowded steps become
 * twenty-one small ones.
 *
 * The block ORDER was already right. structure-06 called it scrambled on UK GCE numbering; in IAL,
 * product and market orientation is 3a and segmentation is 3c, both inside Market positioning
 * (bus_spec.txt:538, :541), which is where the March section already had them. What was wrong was the
 * weighting: sampling — three leaves — had a whole block, while market size and share, brands, online
 * retailing and the secondary sources had nothing in Learn Mode at all.
 *
 * Ids: the thirteen March subsections that survive keep theirs (a progress row points at them); seven
 * are new. Recall ids are `<subsection id>:recall`.
 *
 * Money is in dollars throughout. No UK-only institution frames an example (locale.institution) and no
 * sentence asserts what examiners do. One fictional firm, Zuri Juice, carries every worked figure
 * across body, diagrams, notes and assessment.
 */
import { subId, SECTION, hash8, MARKET_LAST, MARKET_NOW, ZURI_SALES, INPUT_COST, PRICE, SURVEY_N, POPULATION, growthPct, sharePct, valueAdded, likelyBuyers, weeklyRevenue, BRANDS, GAP } from './_packet16-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });
// One money format for the whole section, so $108,000 is never $108000 on one surface and
// $108,000 on another (packet 16's Layer 6 caught exactly that).
const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);

/* ══ Block 1 — The Market: Mass and Niche (1.3.1 · 1a) ═════════════════════ */

const massMarkets = (() => {
  const sid = subId('mass-markets'); // March id, kept
  return {
    id: sid,
    title: 'Mass Markets',
    keyIdea: 'A mass market is the largest part of a market, served by a standardised product aimed at the widest possible range of customers — scale bought at the price of customisation.',
    body: [
      { type: 'paragraph', text: 'A **mass market** is the broadest segment of a market. The product is **standardised**: one recipe, one design, one specification sold to everyone, with the marketing varied rather than the product. Soft drinks, mobile handsets and washing powder are sold this way.' },
      { type: 'paragraph', text: 'The **characteristic** that follows is volume. Selling millions of identical units lets a firm buy inputs in bulk, run machinery continuously and spread its design and advertising costs over a huge output, so the **average cost per unit falls**. That is what lets a mass-market firm compete on price.' },
      { type: 'bullets', items: [
        '**Standardised product** — small differences between what any two customers receive.',
        '**Wide distribution** — available in most retailers rather than a few specialists.',
        '**High volume, low margin** — a small profit on each unit, multiplied by a very large number of units.',
        '**Heavy competition** — the prize is large, so well-funded rivals are already there.',
      ] },
      { type: 'paragraph', text: 'The trade-off is real. A mass-market firm cannot easily charge a premium, because a customer who dislikes the price can switch to a near-identical rival, and it must keep spending on advertising simply to hold the share it has.' },
    ],
    realExample: { emoji: '🥤', text: 'Coca-Cola sells a standardised drink across most countries in the world, varying the advertising rather than the recipe. The scale is what lets it negotiate hard with bottlers and spread one advertising campaign over an enormous output.' },
    misconception: 'Students write that mass markets are always more profitable than niche markets. Volume is not margin: fierce price competition and heavy marketing costs can leave a thin profit on each unit. Write instead: mass markets offer high revenue through volume, but competition compresses the margin on every unit sold.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) on "mass market" needs both halves — the widest range of customers, and a standardised product. Naming a firm is application, and belongs in a 4-mark Explain rather than a definition.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the chain that makes a mass market worth serving:',
      template: [
        'One ___ product is sold to the widest possible range of customers',
        '→ The firm produces a very high ___ of identical units',
        '→ Fixed spending is spread more thinly, so average ___ per unit falls',
      ],
      answers: ['standardised', 'volume', 'cost'],
      hints: ['every customer receives essentially the same thing', 'how many units leave the factory, not how much each earns', 'what falls when output rises and fixed costs stay put'],
      distractors: ['premium', 'margin'],
    }),
  };
})();

const nicheMarkets = (() => {
  const sid = subId('niche-markets'); // March id, kept
  return {
    id: sid,
    title: 'Niche Markets',
    keyIdea: 'A niche market is a small, clearly defined part of a larger market whose particular needs the standardised mass-market product does not meet.',
    body: [
      { type: 'paragraph', text: 'A **niche market** is a small segment inside a larger one, defined by a need the mass-market product leaves unsatisfied. Left-handed tools, prayer-friendly travel, professional-grade cookware and cars built to order are all niches within much larger markets.' },
      { type: 'paragraph', text: 'Its **characteristics** are the mirror image of the mass market. Output is low, the product is specialised, distribution is narrow, and because the customer values the specialisation and has few alternatives, the firm can charge a **premium price** and earn a wide margin on each unit.' },
      { type: 'bullets', items: [
        '**Specialised product** — designed around one group\'s particular requirements.',
        '**Low volume, high margin** — few units, but a large profit on each one.',
        '**Less direct competition** — the segment is too small to attract the largest firms.',
        '**Concentrated risk** — one small group of customers, so a change in their tastes hits the whole business.',
      ] },
      { type: 'paragraph', text: 'Size is the constraint. A niche caps total revenue however well the firm serves it, and a business that has designed everything around one group has little to fall back on if that group shrinks or a larger rival decides the niche is worth entering after all.' },
    ],
    realExample: { emoji: '⌚', text: 'Rolex makes a small number of watches a year against the tens of millions a mass-market electronics firm ships, and sells them at prices no mass-market brand could ask. Scarcity and specialisation, not volume, are what the customer is paying for.' },
    misconception: 'Students claim that niche markets are only for small businesses. Large firms run niches too — a luxury brand inside a volume carmaker is a niche served by a very large company. Write instead: niche marketing is a strategy about the segment served, not a statement about the size of the firm serving it.',
    examMatters: 'Mass and niche are almost always examined as a comparison. Name the characteristic and its consequence in the same sentence — "standardised, so unit costs fall" against "specialised, so a premium can be charged" — rather than listing features of each in turn.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each business into the type of market it is serving:',
      groups: [
        { name: 'Mass market', items: ['A soft-drink maker selling one recipe worldwide', 'A supermarket own-brand washing powder', 'A phone maker shipping one model to 60 countries'], why: 'One standardised product aimed at the widest possible range of customers, competing on volume and price' },
        { name: 'Niche market', items: ['A bakery making only gluten-free bread', 'A tailor making cricket bats to order', 'A travel agent booking only diving holidays'], why: 'A small, clearly defined group whose particular need the standardised product does not meet, served at a premium' },
      ],
    }),
  };
})();

const marketSizeShareGrowth = (() => {
  const sid = subId('market-size-share-and-growth');
  const growth = growthPct(), share = sharePct();
  return {
    id: sid,
    title: 'Market Size, Share and Growth',
    keyIdea: 'Market size says whether a market is worth entering, market share says whether a firm is winning inside it, and market growth says whether the whole market is expanding.',
    body: [
      { type: 'paragraph', text: '**Market size** is the total sales in a market over a period, measured either by **volume** (units sold) or by **value** (sales revenue). It answers one question: is this market large enough to be worth serving?' },
      { type: 'paragraph', text: '**Market share** is the proportion of that total held by one firm or product, as a percentage. **Market growth** is the percentage change in market size between two periods. Both are calculations the paper can ask for (QS2, WBS11 Appendix 7).' },
      { type: 'subheading', text: 'Worked example: Zuri Juice' },
      { type: 'bullets', items: [
        `The chilled-juice market was worth ${money(MARKET_LAST)} million last year and ${money(MARKET_NOW)} million this year.`,
        `Market growth = (${MARKET_NOW} − ${MARKET_LAST}) ÷ ${MARKET_LAST} × 100 = **${growth}%**.`,
        `Zuri Juice sold ${money(ZURI_SALES)} million this year.`,
        `Market share = ${ZURI_SALES} ÷ ${MARKET_NOW} × 100 = **${share}%**.`,
      ] },
      { type: 'paragraph', text: 'Read the two together. A rising share in a growing market is the strongest position there is, because the firm is taking a bigger slice of a bigger cake. A rising share of a shrinking market may simply mean the firm is the last one left.' },
    ],
    realExample: { emoji: '📈', text: 'Streaming services report subscriber numbers every quarter for exactly this reason: investors want to know whether a company is growing faster than the market it sits in, which share alone cannot tell them.' },
    misconception: 'Students treat rising sales as rising market share. They are different: if a firm\'s sales rise 10% while the market rises 25%, its share has fallen. Write instead: compare the firm\'s growth with the market\'s growth before claiming the firm is gaining ground.',
    examMatters: `A Calculate (4 marks, WBS11 Appendix 6) expects the formula, the substitution and the answer with its unit — a percentage sign, not a bare ${share}. Then use the number: Calculate is a quantitative skill (QS2, WBS11 Appendix 7), and the question after it always asks what the figure means.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these steps in the order you would carry them out to work out a firm\'s market share:',
      correctOrder: [
        'Find the total sales of the whole market for the period',
        'Take the firm\'s own sales for the same period',
        'Divide the firm\'s sales by the total market sales',
        'Multiply by 100 and write the answer as a percentage',
      ],
      why: [
        'Share is a share of something, so the total has to be known first',
        'The two figures must cover the same period, or the ratio means nothing',
        'Dividing gives the proportion the firm holds, as a decimal',
        'Multiplying by 100 turns the proportion into the percentage the question asks for',
      ],
    }),
  };
})();

const branding = (() => {
  const sid = subId('branding-and-brand-loyalty');
  return {
    id: sid,
    title: 'Branding and Brand Loyalty',
    keyIdea: 'A brand is what a name promises in the customer\'s mind. Kept consistently it becomes loyalty, and loyalty is what lets a firm charge more than an identical rival.',
    body: [
      { type: 'paragraph', text: '**Branding** is the process of building a distinctive name, design and reputation so that customers can tell one product from another and know what to expect from it. In a mass market, where the products themselves are close to identical, the brand is often the only thing separating them.' },
      { type: 'paragraph', text: '**Brand loyalty** is the result: a customer who buys the same brand repeatedly without re-examining the alternatives each time. Three things follow from it, and each one is a chain an answer can develop.' },
      { type: 'flow', steps: [
        { title: 'Consistent quality and identity', subtitle: 'the brand promise is kept, purchase after purchase' },
        { title: 'Customers stop comparing', subtitle: 'the brand becomes the default choice' },
        { title: 'Demand becomes less price-sensitive', subtitle: 'a price rise loses fewer customers' },
        { title: 'The firm charges a premium', subtitle: 'and spends less on winning the same buyers back' },
      ], result: 'A margin a rival with the same product cannot match', resultType: 'good' },
      { type: 'paragraph', text: 'A strong brand also makes a market **harder to enter**. A new firm with an equally good product must spend heavily, for years, to persuade customers to try something whose name means nothing to them — which is why branding is listed as a characteristic of mass markets rather than a piece of decoration.' },
    ],
    realExample: { emoji: '👟', text: 'Sportswear firms sponsor athletes and teams for decades rather than advertising the shoes themselves. What is being bought is the association; the shoe is close enough to a rival\'s that the association is the difference.' },
    misconception: 'Students describe a brand as a logo. The logo is only the marker: the brand is the expectation the customer attaches to it, built by consistent quality. Write instead: a brand is the reputation a name carries, and the logo is what triggers it.',
    examMatters: 'Branding connects to adding value and to competitive advantage later in this topic. An answer that says "the brand is strong" has asserted; an answer that says "the brand makes demand less price-sensitive, so the firm can raise price without losing volume" has analysed.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each effect of a strong brand to the reason it happens:',
      pairs: [
        { left: 'A premium price can be charged', right: 'Loyal customers stop comparing alternatives', why: 'Demand becomes less price-sensitive, so a higher price loses fewer buyers than it would for an unbranded rival' },
        { left: 'Marketing costs fall over time', right: 'Repeat buyers do not need winning back', why: 'Persuasion is a one-off cost for a loyal customer and a recurring one for a switcher' },
        { left: 'New entrants find it harder', right: 'A new name means nothing to customers', why: 'The entrant must fund years of advertising before its product is even considered at all' },
        { left: 'New products launch more cheaply', right: 'Trust in the name transfers to them', why: 'Customers extend an existing expectation to the new item, so less has to be spent establishing it' },
      ],
      distractors: ['Production costs fall because output is standardised'],
    }),
  };
})();

/* ══ Block 2 — Dynamic Markets, Competition and Risk (1.3.1 · 1b, 1c, 1d) ══ */

const onlineRetailing = (() => {
  const sid = subId('dynamic-markets'); // March id, kept
  return {
    id: sid,
    title: 'Online Retailing and How Markets Change',
    keyIdea: 'A dynamic market changes rapidly and continuously, and online retailing is the clearest cause of it: the shop between producer and customer disappears.',
    body: [
      { type: 'paragraph', text: 'A **dynamic market** is one in which conditions change rapidly and continuously — consumer tastes, technology, the number of rivals, the rules firms operate under. Most markets are dynamic to some degree; the question in an exam answer is always *how* a named market is changing, not whether it is.' },
      { type: 'paragraph', text: '**Online retailing** — selling directly to customers over the internet rather than through a shop — has changed markets in four ways that a chain of reasoning can follow.' },
      { type: 'bullets', items: [
        '**Entry costs fall.** A seller needs a website rather than a lease, so new rivals appear quickly.',
        '**Reach widens.** A small producer can sell nationally or across borders from one location.',
        '**Prices become transparent.** Customers compare every seller in seconds, so a price premium must be justified by something they can see.',
        '**Data arrives with the sale.** Every order records who bought what, when — market research as a by-product of trading.',
      ] },
      { type: 'paragraph', text: '**How markets change** is therefore not random: technology alters costs and reach, that alters who can enter, and that forces the firms already there to respond on price, product or service.' },
    ],
    realExample: { emoji: '📦', text: 'Mobile money and online marketplaces let small producers in East Africa and South Asia sell beyond their own town for the first time, reaching customers who previously had no way to find them and no way to pay at a distance.' },
    misconception: 'Students say a dynamic market is one where sales are growing. Growth is only one kind of change: a market can be dynamic while shrinking, fragmenting or being taken over by a new technology. Write instead: a dynamic market is one subject to rapid and continuous change, in any direction.',
    examMatters: 'Name the change, then follow it to a decision. "Online retailing grew" is context; "it cut entry costs, so three rivals appeared, so Zuri had to justify its price" is the chain an Analyse (6 marks, WBS11 Appendix 6) wants.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these in order from cause to effect, showing how online retailing changes a market:',
      correctOrder: [
        'Selling online removes the need for a shop lease',
        'The cost of entering the market falls',
        'New sellers enter and customers compare prices easily',
        'Established firms must cut price or differentiate',
      ],
      why: [
        'The technology comes first: it changes what a seller needs in order to trade at all',
        'Lower fixed costs are what actually make the market easier to enter',
        'More sellers and transparent prices are what the easier entry produces',
        'The response of the incumbents is the last link, and it is the one the question usually asks about',
      ],
    }),
  };
})();

const innovationAndAdapting = (() => {
  const sid = subId('innovation-market-growth-adapting');
  return {
    id: sid,
    title: 'Innovation, Market Growth and Adapting to Change',
    keyIdea: 'Innovation grows a market by bringing in customers it did not previously have; adapting to change is what decides which of the existing firms is still there afterwards.',
    body: [
      { type: 'paragraph', text: '**Innovation** is a new or improved product, or a new way of producing or delivering one. It drives **market growth** in two distinct ways, and an answer is stronger for separating them.' },
      { type: 'bullets', items: [
        '**New customers.** A cheaper or simpler version reaches people the old product priced out, so the market gets bigger rather than the shares changing.',
        '**New uses.** A product that does something the old one could not creates demand that did not exist at any price.',
      ] },
      { type: 'paragraph', text: '**Adapting to change** is the other half. A firm can change its product, its market, its route to customers, or nothing. Doing nothing is a decision too, and it is the one that ends businesses: the pattern is rarely that a firm could not see the change, but that it saw it and defended the sales it already had.' },
      { type: 'flow', steps: [
        { title: 'An innovation reaches the market', subtitle: 'a new product, or a new way of delivering one' },
        { title: 'Customer expectations reset', subtitle: 'the new option becomes the standard of comparison' },
        { title: 'Firms choose: adapt or defend', subtitle: 'change the offer, or protect existing sales' },
        { title: 'Share moves to those that adapted', subtitle: 'and the market itself may be larger than before' },
      ], result: 'Growth for the market, and a redistribution of it between firms', resultType: 'neutral' },
    ],
    realExample: { emoji: '🎬', text: 'Video rental chains and film studios both saw streaming coming. Those that treated it as a new route to customers grew; those that treated it as a threat to existing revenue defended that revenue and lost the market.' },
    misconception: 'Students treat innovation and invention as the same thing. An invention is a new idea; an innovation is an idea brought to market and adopted. Write instead: innovation is what reaches customers, which is why it, and not invention on its own, changes a market.',
    examMatters: 'A question about a market that has grown usually wants the mechanism. Say whether growth came from new customers entering the market or from existing customers buying more, and use the market-growth percentage to anchor it.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in a market to the adaptation it forces on a firm already trading there:',
      pairs: [
        { left: 'Customers shift to buying online', right: 'Build a direct sales channel of its own', why: 'The route to the customer has moved, so the firm needs its own route rather than a better shop' },
        { left: 'A rival launches a cheaper version', right: 'Justify the price with a visible difference', why: 'Once a cheaper option exists, a premium survives only if the customer can see what it buys' },
        { left: 'The market grows and new firms enter', right: 'Defend the position with a stronger brand', why: 'Growth attracts entrants, and loyalty is what stops them taking existing customers' },
        { left: 'Tastes move to healthier products', right: 'Reformulate the product range', why: 'The change is in what customers want from the product itself, so the product has to change' },
      ],
    }),
  };
})();

const competition = (() => {
  const sid = subId('competition'); // March id, kept
  return {
    id: sid,
    title: 'How Competition Affects the Market',
    keyIdea: 'The level of competition in a market decides how much freedom a firm has over its price, and therefore how much it must compete on everything else.',
    body: [
      { type: 'paragraph', text: '**Competition** exists where two or more firms sell to the same customers. How intense it is depends on three things: **how many** rivals there are, **how similar** their products are, and **how easily** a new firm can enter.' },
      { type: 'paragraph', text: 'Where competition is intense, a firm has little room on price: raise it and customers move to a near-identical substitute. So it competes on the things price cannot be competed on — **quality**, **service**, **design**, **brand** and **speed of delivery**. Where competition is weak, the firm has room on price, and less pressure to improve anything.' },
      { type: 'paragraph', text: 'What keeps competition weak is how hard it is to **enter**: the capital needed to start, an established brand, an exclusive supply agreement, a patent, a licence. Today\'s level of competition is temporary; tomorrow\'s is decided by how easily the next firm can arrive. You will meet these called **barriers to entry**, the term the Economics papers use.' },
      { type: 'bullets', items: [
        '**For customers:** more choice, lower prices, faster improvement.',
        '**For the firm:** thinner margins, higher marketing costs, constant pressure to differentiate.',
        '**For the market:** weak firms exit, and the survivors are more efficient than they were.',
      ] },
    ],
    realExample: { emoji: '✈️', text: 'When low-fare airlines entered European and South-East Asian routes, established carriers did not only cut fares; they unbundled meals and baggage so that the headline price could fall while the total charge did not. Competition changed the product, not just the price.' },
    misconception: 'Students write that competition is simply bad for a business and should be avoided. It compresses margins and it also forces the efficiency and the differentiation that make a firm hard to displace later. Write instead: competition lowers short-term margins and strengthens the firms that respond to it.',
    examMatters: 'Answer for both sides when a question asks about the effect of competition. A response covering only the firm, or only the customer, has answered half of it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the description of how competition shapes a market:',
      template: [
        'Competition is intense when rivals are many and their products are ___',
        '→ A firm then has little freedom over ___, because customers can switch easily',
        '→ So it competes on quality, service and ___ instead',
        '→ Competition stays weak only where a new firm finds it hard to ___',
      ],
      answers: ['similar', 'price', 'brand', 'enter'],
      hints: ['close enough that a customer treats one as a substitute for another', 'the variable a firm can no longer raise without losing customers', 'the reputation a name carries, from the previous chapter', 'what a firm must do before it can sell in a market at all'],
      distractors: ['cheap', 'expand'],
    }),
  };
})();

const riskAndUncertainty = (() => {
  const sid = subId('risk-vs-uncertainty'); // March id, kept
  return {
    id: sid,
    title: 'Risk and Uncertainty',
    keyIdea: 'Risk is not knowing which outcome will happen out of a set you can list and put odds on; uncertainty is not being able to list the outcomes at all.',
    body: [
      { type: 'paragraph', text: '**Risk** describes a situation where the possible outcomes are known and a probability can be attached to each. A firm launching a product knows it may succeed or fail, and market research, past launches and sales data let it estimate the chances. Because risk can be quantified, it can be **planned for**: insured against, hedged, or priced into the decision.' },
      { type: 'paragraph', text: '**Uncertainty** describes a situation where the outcomes themselves cannot be listed, so no probability can be attached. A new technology that makes the product obsolete, a sudden change in the law, a disease outbreak: these are not unlikely events with known odds, they are events nobody had on the list.' },
      { type: 'bullets', items: [
        '**Risk:** outcomes known, odds estimable, plans possible, insurance available.',
        '**Uncertainty:** outcomes unknown, odds impossible, only flexibility helps.',
        '**The practical difference:** you manage risk with a number and uncertainty with slack — cash reserves, a wider product range, a shorter supply chain.',
      ] },
      { type: 'paragraph', text: 'Entrepreneurs accept both in exchange for **profit**, the reward for bearing them. An answer that calls everything a risk has claimed everything can be planned for, which is the assumption that makes a plan fragile.' },
    ],
    realExample: { emoji: '☕', text: 'A café chain can forecast the ordinary variation in daily footfall from its own sales history and staff to it. What it could not forecast was city centres emptying for months at a time: the same business faced both a quantifiable risk and an unlistable uncertainty.' },
    misconception: 'Students use risk and uncertainty as synonyms, or say uncertainty just means more risk. The difference is whether a probability exists at all. Write instead: risk can be estimated and insured; uncertainty cannot be estimated, so it is met with flexibility rather than a plan.',
    examMatters: 'When a case study lists things that might go wrong, sort them before writing. Say which are quantifiable risks and which are genuine uncertainties, and why, rather than treating the whole list as one category.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the two definitions. The terms are not interchangeable:',
      template: [
        'Risk: the possible outcomes are known and a ___ can be attached to each',
        '→ So the firm can plan for it, price it, or ___ against it',
        '→ Uncertainty: the outcomes cannot be ___ at all, so no odds exist',
        '→ So the only defence is ___ — reserves, alternatives, a shorter supply chain',
      ],
      answers: ['probability', 'insure', 'listed', 'flexibility'],
      hints: ['the number between 0 and 1 that says how likely an outcome is', 'what a firm pays a premium to do with a quantifiable danger', 'what you cannot do to outcomes nobody has thought of', 'what a firm keeps when it cannot plan for something specific'],
      distractors: ['forecast', 'certainty'],
    }),
  };
})();

/* ══ Block 3 — What Market Research Is For (1.3.1 · 2a) ════════════════════ */

const primaryAndSecondaryData = (() => {
  const sid = subId('primary-and-secondary-data');
  return {
    id: sid,
    title: 'Primary and Secondary Data',
    keyIdea: 'The split is about who collected the data and why: primary data is gathered by this firm for this question, secondary data was gathered by somebody else for a different one.',
    body: [
      { type: 'paragraph', text: '**Primary data** is collected first-hand, by or for the business, to answer the question it actually has. **Secondary data** already exists: somebody else collected it, for their own purpose, and the business is reusing it. The methods themselves come later — the distinction is about origin, not about how the data was gathered.' },
      { type: 'bullets', items: [
        '**Primary — fits exactly.** The firm writes the questions and owns the answers, so no rival holds them.',
        '**Primary — costs more.** It must be designed, run and analysed before any decision can be made.',
        '**Secondary — fast and cheap.** Much of it is free and available today.',
        '**Secondary — not collected for you.** It may cover the wrong group, period or question, and rivals can read it too.',
      ] },
      { type: 'paragraph', text: 'In practice a business uses both, in that order: secondary data first, to size the market for almost nothing, then primary research on the question it cannot answer — whether these customers will buy this product at this price.' },
      { type: 'paragraph', text: 'That sequence is also the answer to "which is better". Neither is, in general: the judgement is about which question the business is actually facing.' },
    ],
    realExample: { emoji: '🧾', text: 'A firm entering a new country usually starts with published trade and population data, which costs nothing, and only commissions its own survey once it has narrowed the decision to one or two segments worth the expense.' },
    misconception: 'Students say primary research is always better because it is original. Fit and cost are the test, not originality. Write instead: primary data answers the firm\'s exact question but costs more, so most firms use secondary data first.',
    examMatters: 'A question naming a small firm with little money is asking you to weigh cost against fit. Say which data the decision needs before naming a method: an expensive method answering the wrong question is not a recommendation.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each source into primary or secondary data, by who collected it and why:',
      groups: [
        { name: 'Primary data', items: ['A questionnaire the firm ran in its own stores', 'A focus group the firm commissioned', 'Sales recorded at the firm\'s own tills'], why: 'Collected by or for this business to answer its own question, so it fits exactly and no rival holds it' },
        { name: 'Secondary data', items: ['A published industry report', 'National population statistics', 'A rival\'s annual accounts'], why: 'Collected by somebody else for their own purpose, so it is cheap and immediate but may not fit the question being asked' },
      ],
    }),
  };
})();

const quantAndQual = (() => {
  const sid = subId('qualitative-vs-quantitative'); // March id, kept
  return {
    id: sid,
    title: 'Quantitative and Qualitative Data',
    keyIdea: 'Quantitative data tells a firm how many and how much; qualitative data tells it why. The two answer different questions, and either alone leaves a decision half-made.',
    body: [
      { type: 'paragraph', text: '**Quantitative data** is numerical: it can be counted, averaged, compared and put on a chart. Sales figures, market share, the percentage of shoppers who say they would buy — all quantitative. Its strength is that it **measures**, so a firm can size an opportunity and track whether a decision worked.' },
      { type: 'paragraph', text: '**Qualitative data** is non-numerical: opinions, motivations, reactions, the words customers use about a product. Its strength is that it **explains**, so a firm learns why a number is what it is.' },
      { type: 'bullets', items: [
        '**Quantitative asks:** how many, how much, how often, what share.',
        '**Qualitative asks:** why, what stopped you, what would change your mind.',
        '**Quantitative risk:** a number with no explanation invites the wrong conclusion.',
        '**Qualitative risk:** a handful of strong opinions is not a market, and cannot be generalised.',
      ] },
      { type: 'paragraph', text: 'The two cut across primary and secondary. A firm\'s own till data is primary and quantitative; its own focus group is primary and qualitative; a published market report is secondary and quantitative; a magazine review is secondary and qualitative. Exam items often test exactly that pairing, so read both dimensions of the stem before answering.' },
    ],
    realExample: { emoji: '🎧', text: 'A streaming service can see exactly which songs listeners skip, which is quantitative and precise. It still runs listening sessions to learn why a track gets skipped, because the skip count cannot distinguish boredom from a bad recommendation.' },
    misconception: 'Students say qualitative data is less useful because it cannot be graphed. What cannot be graphed can still explain, and explanation is what turns a number into a decision. Write instead: quantitative data measures the opportunity, qualitative data explains it, and a firm needs both.',
    examMatters: 'A stem that gives a percentage or a count is describing quantitative data; a stem about attitudes, opinions or reasons is describing qualitative data. Check the origin separately: who collected it decides primary or secondary, independently of whether it is numbers or words.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each source to the cell of the grid it belongs in — who collected it, and what kind of data it is:',
      pairs: [
        { left: 'Sales recorded at the firm\'s own tills', right: 'Primary and quantitative', why: 'The firm collected it itself, and a count of sales is a number' },
        { left: 'A focus group the firm commissioned', right: 'Primary and qualitative', why: 'Commissioned by the firm, and it produces reasons in the customers\' own words' },
        { left: 'A published report on market size', right: 'Secondary and quantitative', why: 'Somebody else measured it for their own purpose, and market size is a figure' },
        { left: 'A review of the drink in a magazine', right: 'Secondary and qualitative', why: 'Somebody else wrote it for their own purpose, and an opinion is not a number' },
      ],
    }),
  };
})();

const identifyingNeeds = (() => {
  const sid = subId('identifying-anticipating-customer-needs');
  return {
    id: sid,
    title: 'Identifying and Anticipating Customer Needs',
    keyIdea: 'Research identifies and anticipates customer needs and wants, and gains insight into consumer behaviour. Only the first of those is about today.',
    body: [
      { type: 'paragraph', text: 'The specification lists what research is *for*, and the three uses are genuinely different jobs. The first is to **identify and anticipate customer needs and wants**: to find out what customers require now, and what they are likely to require next.' },
      { type: 'paragraph', text: '**Identifying** is present tense — asking, observing and measuring what is wanted today. **Anticipating** is forward-looking: reading the direction of a trend, so the product is ready when the demand arrives rather than a year afterwards. A firm that only identifies is always launching into a market that has already moved.' },
      { type: 'paragraph', text: 'The third use is to **gain insight into consumer behaviour** — understanding not what customers buy but how they decide: what they compare, what they will not compromise on, what makes them switch. This is where qualitative work earns its cost, and it is what turns a list of preferences into a reason.' },
      { type: 'bullets', items: [
        '**Identify** — what do customers want now? Surveys, till data, complaints.',
        '**Anticipate** — where is that going? Trends, growth figures, what is happening in a comparable market elsewhere.',
        '**Insight into behaviour** — how do they choose? Focus groups, interviews, watching people shop.',
      ] },
    ],
    realExample: { emoji: '🛒', text: 'Supermarkets reposition stock after watching how shoppers actually move through a store, rather than asking them what route they take. What people do and what they report doing are different, which is why observation exists as a method.' },
    misconception: 'Students treat "needs" and "wants" as one word. A need is something the customer must have; a want is a preference about how it is met. Write instead: research identifies the need the product serves and the want that decides which version of it the customer buys.',
    examMatters: 'A question asking how research helps a specific business is asking which of the three uses matters here. A start-up usually needs identification; an established firm in a dynamic market usually needs anticipation. Name the use, then say why this firm needs that one.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the three uses the specification gives for market research data:',
      template: [
        'To ___ and anticipate customer needs and wants',
        '→ To ___ likely demand before committing to production',
        '→ To gain ___ into consumer behaviour: how customers actually decide',
      ],
      answers: ['identify', 'quantify', 'insight'],
      hints: ['to find out what is wanted now, before predicting what will be wanted next', 'to put a number on it rather than a judgement', 'understanding of the reasons behind a choice'],
      distractors: ['forecast', 'segment'],
    }),
  };
})();

const quantifyingDemand = (() => {
  const sid = subId('quantifying-likely-demand');
  const buyers = likelyBuyers(), weekly = weeklyRevenue();
  return {
    id: sid,
    title: 'Quantifying Likely Demand',
    keyIdea: 'Quantifying likely demand turns an opinion about a market into a number the business can plan production and cash flow around — and into a figure that can be shown to be wrong.',
    body: [
      { type: 'paragraph', text: 'The second use of research is to **quantify likely demand**: to estimate how many units will sell, at what price, in a given period. The firm needs the number to decide how much to make, how much stock to hold, and whether the revenue covers the cost.' },
      { type: 'paragraph', text: 'The method is a proportion scaled up to a population. Worked for Zuri Juice:' },
      { type: 'flow', steps: [
        { title: `Ask a sample at a stated price`, subtitle: `${SURVEY_N} shoppers, ${money(PRICE)} a bottle: 18% would buy weekly` },
        { title: 'Apply the percentage to the market', subtitle: `${POPULATION.toLocaleString('en-GB')} × 0.18 = ${buyers.toLocaleString('en-GB')} weekly buyers` },
        { title: 'Multiply the buyers by the price', subtitle: `${buyers.toLocaleString('en-GB')} × ${money(PRICE)} = ${money(weekly)} a week` },
        { title: 'Discount for stated intention', subtitle: 'what people say they will buy exceeds what they buy' },
      ], result: 'An upper estimate of demand, to plan production and cash flow against', resultType: 'neutral' },
      { type: 'paragraph', text: 'Then treat the answer as a **ceiling, not a forecast**. People overstate what they will buy when nothing is at stake; a sample of 600 carries a margin of error; the 18% was measured at one price only; and the market moves before production starts. It is the best estimate available, and still an estimate.' },
    ],
    realExample: { emoji: '📉', text: 'New food and drink products fail at a high rate despite testing well before launch. The gap between what people say in a survey and what they put in a basket is the commonest reason a demand figure turns out too high.' },
    misconception: 'Students treat a survey percentage as the sales forecast. Intention is not purchase. Write instead: scaling a survey result gives an upper estimate of demand, which should be discounted for the gap between what people say and what they do.',
    examMatters: 'Show the scaling in two steps — proportion to population, then units by price — with the unit on each. Then add one line on why the figure over-estimates: Discuss and Assess both require an assessment of competing factors (WBS11 Appendix 6), and that line is the assessment.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these steps in the order you would carry them out to quantify likely demand from a survey:',
      correctOrder: [
        'Ask a sample whether they would buy, at a stated price',
        'Work out the percentage of the sample who said yes',
        'Apply that percentage to the size of the target market',
        'Multiply the buyers by the price to get likely revenue',
        'Discount the figure for the gap between intention and purchase',
      ],
      why: [
        'The price has to be stated, because willingness to buy is meaningless without one',
        'The raw count is useless until it is expressed as a proportion of those asked',
        'Scaling the proportion to the population is what turns a sample into a market estimate',
        'Units become money only when multiplied by the price they were tested at',
        'The discount comes last because it is applied to the finished estimate, and without it the figure is a ceiling presented as a forecast',
      ],
    }),
  };
})();

/* ══ Block 4 — Research Methods and Sampling (1.3.1 · 2b, 2c, 2d) ══════════ */

const primaryMethods = (() => {
  const sid = subId('primary-research'); // March id, kept
  return {
    id: sid,
    title: 'Methods of Primary Research',
    keyIdea: 'Surveys count, focus groups explain, interviews go deep, and a product trial replaces all three with a record of what people actually did.',
    body: [
      { type: 'paragraph', text: 'The specification names four methods of primary research, each answering a different kind of question.' },
      { type: 'bullets', items: [
        '**Surveys and questionnaires** — fixed questions put to many people. Cheap per response and the only method producing a percentage worth scaling; the answers are only as good as the questions.',
        '**Focus groups and consumer panels** — a small group discussing a product with a moderator; a panel is the same group revisited, so it shows how opinion moves. Rich, but a dominant voice can pull the group.',
        '**Face-to-face and telephone interviews** — one respondent at a time, with follow-up questions: most detail per person, and most cost per person.',
        '**Product trials and test marketing** — selling in a limited area before full launch and measuring real sales.',
      ] },
      { type: 'paragraph', text: 'A **product trial** (or **test marketing**) is the only method recording behaviour rather than intention. Customers pay real money, so the firm sees the repeat-purchase rate rather than the stated one, and can change price or packaging before a national launch. It is slow, and it warns rivals.' },
      { type: 'paragraph', text: 'Choosing is a question of budget, time and what is being decided: a price needs a number, a reaction needs words, a launch decision needs a trial.' },
    ],
    realExample: { emoji: '🍔', text: 'Fast-food chains sell a new item in selected cities before deciding on a wider launch, and decide on measured repeat purchases there rather than on what testers said about the recipe.' },
    misconception: 'Students describe a focus group as "a big survey". It is the opposite — a handful of people talking — which is why it explains well and measures badly. Write instead: a focus group gives depth from a few people, a survey gives breadth from many.',
    examMatters: 'A recommendation names the method and the constraint it fits. "Use a survey" is a choice; "use a survey, because the decision needs a percentage that can be scaled and the budget will not cover interviews" is a recommendation.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of a product trial in the order a business carries them out, from first to last:',
      correctOrder: [
        'Choose a limited area or group to sell in',
        'Put the product on sale there at a real price',
        'Measure actual sales and repeat purchases',
        'Adjust price, packaging or recipe, or abandon the launch',
      ],
      why: [
        'The area has to be chosen first, because it decides what the result will represent',
        'Selling at a real price is what makes the result behaviour rather than intention',
        'Repeat purchase is the measure that matters: trying once is curiosity, buying twice is demand',
        'Acting on the measurement is the point of the trial, and it is what a full launch cannot undo',
      ],
    }),
  };
})();

const secondaryMethods = (() => {
  const sid = subId('secondary-research'); // March id, kept
  return {
    id: sid,
    title: 'Methods of Secondary Research',
    keyIdea: 'The four secondary sources trade currency, cost and credibility differently, so the question about each is the same: who collected this, when, and why?',
    body: [
      { type: 'paragraph', text: 'The specification names four sources of secondary data. All are cheap and immediate; they differ in how far they can be trusted and how current they are.' },
      { type: 'bullets', items: [
        '**Websites and social media** — a rival\'s site shows its range and prices; a firm\'s own social analytics show who follows it. Free and current; a rival\'s site is promotional, and a following is not the market.',
        '**Newspapers, magazines, television and radio** — reporting on an industry, new entrants and changes in the law. Broad and current, written to interest a general audience rather than to measure.',
        '**Reports** — industry and government reports, trade-association figures, company accounts. The most rigorous source and usually the only one giving market size and share; all describe the past.',
        '**Databases** — structured records that can be queried: national statistics, trade data, the firm\'s own transaction records. Only as good as what was entered.',
      ] },
      { type: 'paragraph', text: 'Two questions settle the value of any of them. **Who collected it, and why?** A source with an interest in the answer needs corroborating. **When?** In a dynamic market a two-year-old figure describes a market that no longer exists.' },
      { type: 'paragraph', text: 'A firm\'s own transaction records are **primary** data even though they sit in a database: the database is where data lives, and primary or secondary is about who put it there.' },
    ],
    realExample: { emoji: '🗄️', text: 'Trade statistics published by national statistics offices are free and cover whole economies, and firms use them to size an export market before spending anything on research of their own.' },
    misconception: 'Students say secondary data is unreliable because somebody else collected it. Some of it is more reliable than anything a small firm could collect alone. Write instead: its reliability depends on who collected it and when.',
    examMatters: 'When a stem names a source, say what it is good for and what it cannot show, in that order. A rival\'s website gives prices and range, not sales volumes; a report gives market size, not this week\'s reaction to a product.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the description of the four secondary sources:',
      template: [
        'A rival\'s ___ shows its range and prices, but is written to sell',
        '→ Newspapers, magazines, TV and ___ cover changes in an industry for a general audience',
        '→ Industry and government ___ are the usual source of market size and share figures',
        '→ A ___ holds structured records that can be queried, and is only as good as what was entered',
      ],
      answers: ['website', 'radio', 'reports', 'database'],
      hints: ['the page a company publishes about itself', 'the fourth broadcast medium named in the specification', 'the published documents that carry market size and share', 'where structured records are stored so they can be searched'],
      distractors: ['survey', 'interview'],
    }),
  };
})();

const sampling = (() => {
  const sid = subId('types-of-sampling'); // March id, kept
  return {
    id: sid,
    title: 'Sampling Methods',
    keyIdea: 'A sample stands in for a population, so how it is chosen decides whether the result describes the market or only the people who were asked.',
    body: [
      { type: 'paragraph', text: '**Sampling** is selecting a small group from a **population** — everyone the firm is interested in — because asking all of them is impossible. The specification names three methods, and the difference between two of them is easy to miss.' },
      { type: 'bullets', items: [
        '**Random sampling** — every member of the population has an equal chance of selection. Removes the researcher\'s bias, and needs a full list of the population, which few firms have.',
        '**Stratified sampling** — the population is divided into subgroups, then people are chosen **at random within each subgroup**, in proportion to its size. Most representative, most work.',
        '**Quota sampling** — subgroups again, with a target number for each, filled with **whoever is available**. Fast and cheap, and the interviewer\'s choices shape who is in it.',
      ] },
      { type: 'paragraph', text: 'Stratified and quota both divide the population into subgroups and both aim at proportionate numbers. The discriminator is what happens **inside** each subgroup: stratified selects at random, quota takes whoever is to hand. That one difference is what makes the first representative and the second quick.' },
      { type: 'paragraph', text: '**Sample size and bias** decide what the result is worth. A larger sample narrows the margin of error and costs more. Bias is separate: a sample drawn from one area or age group misrepresents the population however large it is.' },
    ],
    realExample: { emoji: '📋', text: 'Opinion polls that recruit through one channel only — a phone list, a single social platform, shoppers in one district — have a long record of missing the result however many people they reach.' },
    misconception: 'Students assume a bigger sample is automatically better. Size narrows random error and does nothing about bias. Write instead: a biased sample of 10,000 is less useful than an unbiased sample of 500, because size cannot correct a wrong selection.',
    examMatters: 'Link the method to the constraint in the case. A firm with a customer database can sample randomly; a firm stopping people in a street is running a quota sample whatever it calls it.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each sampling method to how it actually selects the people who are asked:',
      pairs: [
        { left: 'Random sampling', right: 'Every member of the population has an equal chance', why: 'Selection is by chance from the whole list, which is why it needs a complete list to work at all' },
        { left: 'Stratified sampling', right: 'Subgroups first, then chosen at random within each', why: 'The randomness inside each subgroup is what makes it representative rather than merely proportionate' },
        { left: 'Quota sampling', right: 'Subgroups first, then whoever is available fills the target', why: 'The proportions are controlled and the selection inside them is not, so the interviewer\'s choices shape the result' },
      ],
      distractors: ['Every tenth customer entering the store is asked'],
    }),
  };
})();

/* ══ Block 5 — Orientation and Market Mapping (1.3.1 · 3a, 3b) ═════════════ */

const orientation = (() => {
  const sid = subId('product-vs-market-orientation'); // March id, kept
  return {
    id: sid,
    title: 'Product and Market Orientation',
    keyIdea: 'Orientation is about where a business starts: a product-oriented firm starts from what it can make, a market-oriented firm starts from what customers have told it they want.',
    body: [
      { type: 'paragraph', text: 'A **product-oriented** business begins with its own capability — an engineering strength, a recipe, a design — makes the best version it can, and then finds customers for it. A **market-oriented** business begins with research, establishes what customers want, and designs to that.' },
      { type: 'bullets', items: [
        '**Product orientation** starts with capability: build what we are best at, then find the buyers.',
        '**Market orientation** starts with evidence: research what is wanted, then build that.',
      ] },
      { type: 'bullets', items: [
        '**Product orientation suits** markets driven by technology, where customers cannot describe a product that does not exist yet. The risk is a superb product nobody wants.',
        '**Market orientation suits** consumer markets that change quickly, where the customer knows what is missing. The risk is incremental improvement only, because research reports on what exists.',
      ] },
      { type: 'paragraph', text: 'Most firms are somewhere between the two, and the judgement in an answer is about **degree** and **context**, not about which is correct. A firm with deep technical capability in a fast-moving consumer market needs both: the research to know which problem to solve, and the capability to solve it in a way rivals cannot copy.' },
    ],
    realExample: { emoji: '🔧', text: 'Firms that build industrial machinery are usually product-oriented — the buyer cannot specify a process that has not been invented. Firms that sell packaged food are usually market-oriented, because the customer knows exactly what they want and will say so.' },
    misconception: 'Students write that product orientation is outdated and market orientation always better. Breakthrough products rarely come out of asking customers what they want, because customers describe what they already know. Write instead: the right orientation depends on the market — technology-led markets reward product orientation, fast-changing consumer markets reward market orientation.',
    examMatters: 'When a case describes a firm that invents, do not label it "wrong for not researching". Say what its orientation costs it and what it buys, and make the judgement conditional on the market it sells into.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision by the orientation it shows:',
      groups: [
        { name: 'Product-oriented', items: ['Launching a drink because the lab perfected the formula', 'Spending on research and development before any survey', 'Keeping a recipe unchanged because it is the best made'], why: 'The starting point is the firm\'s own capability, and the customer is sought afterwards' },
        { name: 'Market-oriented', items: ['Adding a low-sugar version after customer requests', 'Changing the bottle size shoppers said was awkward', 'Choosing a flavour from survey results'], why: 'The starting point is evidence about what customers want, and the product is designed to fit it' },
      ],
    }),
  };
})();

const marketMapping = (() => {
  const sid = subId('market-mapping'); // March id, kept
  const gapBrands = BRANDS.map((b) => b.name).join(', ');
  return {
    id: sid,
    title: 'Market Mapping',
    keyIdea: 'A market map plots rivals on two variables customers choose by. A gap is a position nobody occupies: a question about demand, not yet an answer.',
    body: [
      { type: 'paragraph', text: '**Market mapping** (also called perceptual mapping) plots the products in a market on two axes, each a variable customers choose by: price against quality, traditional against modern. Each rival becomes a point, and the shape of the market becomes visible.' },
      { type: 'paragraph', text: 'The map does two jobs: it shows **where a firm sits relative to its rivals**, and it shows **gaps** — positions no product occupies.' },
      { type: 'subheading', text: 'Worked example: Zuri Juice' },
      { type: 'bullets', items: [
        `Five chilled-juice brands are plotted on price against juice content: ${gapBrands}.`,
        `Tamu and Mkali sit low on both; Halo is high on both; Safi charges ${money(BRANDS[3].price)} for ${BRANDS[3].juice}% juice; Zuri sits in the middle at ${money(BRANDS[2].price)} for ${BRANDS[2].juice}%.`,
        `The gap is **high juice content at a middle price** — around ${GAP.juice}% juice at about ${money(GAP.price)}. Nobody is there.`,
      ] },
      { type: 'paragraph', text: 'Now the limits, because this is where answers are won and lost. A gap means **no competitor**, not **customers waiting**: it may be empty because nobody wants it, or because it cannot be made at that price. Testing it is what quantifying likely demand is for. A map also shows two variables at a time, and plots **perceptions**, which change.' },
    ],
    realExample: { emoji: '🚗', text: 'Carmakers chart their own ranges against rivals precisely so that two of their own models are not sold into the same square. A map is as useful for avoiding an overlap inside a range as for finding a space outside it.' },
    misconception: 'Students treat a gap as a guaranteed opportunity. It may be empty because nobody wants it, or because it cannot be made at that price. Write instead: a gap shows where no competitor is; only research into demand shows whether a business should be there.',
    examMatters: 'A Construct (4 marks, WBS11 Appendix 6) asks for an accurately labelled diagram: both axes with the variable and its direction, every competitor plotted and named, the gap marked. Commentary written beside the diagram is not part of what Construct asks for.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these steps in the order a business carries them out when it uses a market map to find an opportunity:',
      correctOrder: [
        'Choose two variables customers actually use to choose',
        'Plot every competitor\'s position on the two axes',
        'Identify a position no competitor occupies',
        'Research whether there is demand at that position',
      ],
      why: [
        'The axes decide what the map can show; the wrong two variables make every later step meaningless',
        'The rivals have to be on the map before an empty space can be seen',
        'A gap is what the completed map reveals, and it is a question rather than a conclusion',
        'Demand is what turns an empty position into an opportunity, and only research can establish it',
      ],
    }),
  };
})();

/* ══ Block 6 — Segmentation, Advantage and Value (1.3.1 · 3c-3f) ═══════════ */

const segmentation = (() => {
  const sid = subId('market-segmentation'); // March id, kept
  return {
    id: sid,
    title: 'Market Segmentation',
    keyIdea: 'Segmentation divides a market into groups whose members want the same thing, so that a product and a message can be aimed at one group instead of averaged across all of them.',
    body: [
      { type: 'paragraph', text: '**Market segmentation** is dividing a broad market into smaller groups of customers who share needs, characteristics or behaviour. The purpose is aim: a product designed for the average of a whole market often suits nobody in it particularly well.' },
      { type: 'bullets', items: [
        '**Demographic** — age, gender, income, occupation, family size, religion.',
        '**Geographic** — country, region, city or rural, climate.',
        '**Psychographic** — lifestyle, values, attitudes, personality.',
        '**Behavioural** — how often they buy, what occasion they buy for, how loyal they are, which benefit they are buying.',
      ] },
      { type: 'paragraph', text: 'Segmentation earns its cost when the segments are **measurable** (the firm can size them), **reachable** (there is a way to advertise to them), **different** from each other in what they want, and **large enough** to be served profitably. A segment failing any of those four is a description rather than a market.' },
      { type: 'paragraph', text: 'It has limits. Over-segmenting produces groups too small to serve at a profit and a product range too complex to run. And segmentation is only as good as the research behind it: badly defined segments produce precisely aimed products aimed at the wrong people.' },
    ],
    realExample: { emoji: '🏨', text: 'Large hotel groups run separate brands for business travellers, families and budget-conscious younger guests rather than one chain for everybody. The buildings, the prices and the advertising differ because the three groups want different things from the same night\'s sleep.' },
    misconception: 'Students use segmentation and targeting as the same word. Segmentation divides the market into groups; targeting is the later decision about which of those groups to serve. Write instead: segmentation identifies the groups, targeting chooses between them, and positioning decides how the product is presented to the one chosen.',
    examMatters: 'Pick one base and justify it against the case, rather than listing all four. The mark is for the reasoning that connects the base to this firm\'s product and this firm\'s customers.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each base for segmentation to the variable it divides customers by:',
      pairs: [
        { left: 'Demographic', right: 'Age, income and family size', why: 'These are measurable facts about who the customer is, which is what demographic data records' },
        { left: 'Geographic', right: 'Region, climate and city or rural', why: 'Where the customer lives changes both what they need and how they can be reached' },
        { left: 'Psychographic', right: 'Lifestyle, values and attitudes', why: 'These describe how a customer sees the world, which two people of the same age and income may not share' },
        { left: 'Behavioural', right: 'Purchase frequency, occasion and loyalty', why: 'These describe what the customer actually does, observed rather than asked' },
      ],
      distractors: ['Cost of raw materials per unit'],
    }),
  };
})();

const competitiveAdvantage = (() => {
  const sid = subId('competitive-advantage'); // March id, kept
  return {
    id: sid,
    title: 'Competitive Advantage',
    keyIdea: 'A competitive advantage is a reason customers choose this firm over its rivals, and it is worth having only for as long as rivals cannot copy it.',
    body: [
      { type: 'paragraph', text: '**Competitive advantage** is whatever makes a customer choose one firm over another. It comes from one of two places: **lower costs**, which allow a lower price at the same margin, or **differentiation**, which allows a higher price because the product offers something rivals do not.' },
      { type: 'paragraph', text: 'The word that carries the marks is **sustainable**. An advantage a rival can copy next month is a head start, not an advantage. What makes one durable is that copying it is slow, expensive or impossible.' },
      { type: 'bullets', items: [
        '**Hard to copy:** a brand built over decades, a patent, an exclusive supply agreement, a distribution network, scale a smaller rival cannot reach.',
        '**Easy to copy:** a price cut, a packaging change, a promotion, a feature any competent rival can add to the next production run.',
      ] },
      { type: 'paragraph', text: 'Advantages also decay. Markets change, patents expire, rivals invest, and the thing customers valued stops being scarce. A firm holding one has to keep spending on it — which is why competitive advantage appears in evaluation questions as a judgement about how long, rather than whether.' },
    ],
    realExample: { emoji: '📦', text: 'The largest online retailers combine scale, a delivery network built over many years and the convenience of stored payment details. Any one of the three could be matched by a determined rival; all three at once is what has proved hard.' },
    misconception: 'Students say being cheapest is a competitive advantage. It is one only if the firm\'s costs are genuinely lower; otherwise it is the same product sold at a worse margin, which a rival can end at will. Write instead: cost leadership is an advantage only when it rests on genuinely lower costs, not on accepting a smaller profit.',
    examMatters: 'Name the source of the advantage and say why a rival cannot copy it quickly. "Good customer service" is an assertion; "service from staff trained over two years, which a new entrant cannot assemble quickly" is the analysis.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each advantage by how easily a rival could copy it:',
      groups: [
        { name: 'Hard to copy', items: ['A brand customers have trusted for thirty years', 'A patent on the bottling process', 'An exclusive contract with the only local grower'], why: 'Copying is slow, expensive or legally blocked, so the advantage survives a rival deciding to match it' },
        { name: 'Easy to copy', items: ['A 10% price cut', 'A redesigned label', 'A free gift with every purchase'], why: 'A rival can match it within one production run, so it wins customers briefly and then stops working' },
      ],
    }),
  };
})();

const differentiation = (() => {
  const sid = subId('product-differentiation');
  return {
    id: sid,
    title: 'The Purpose of Product Differentiation',
    keyIdea: 'Differentiation exists to break the comparison: a product customers cannot line up against a rival on price alone is a product whose price the firm partly controls.',
    body: [
      { type: 'paragraph', text: '**Product differentiation** is making a product distinguishable from its rivals — in design, features, quality, service, packaging or brand. The specification asks for its **purpose**, and the purpose is precise: to make the product **less substitutable**.' },
      { type: 'paragraph', text: 'Where two products are identical, the only question a customer asks is which is cheaper, and the firms are forced into a price war neither wins. Differentiation replaces that question with a different one — which of these do I prefer — and a customer who prefers one will pay more for it.' },
      { type: 'flow', steps: [
        { title: 'The product is made distinguishable', subtitle: 'design, feature, service or brand' },
        { title: 'It stops being a straight substitute', subtitle: 'the comparison is no longer price alone' },
        { title: 'Demand becomes less price-sensitive', subtitle: 'some customers will not switch for a small saving' },
        { title: 'The firm gains room on price', subtitle: 'and a defence against a rival\'s price cut' },
      ], result: 'A margin that survives the next price war', resultType: 'good' },
      { type: 'paragraph', text: 'Two conditions decide whether it works: customers must **see** the difference, and must **value** it enough to pay for it. Differentiation meeting neither is cost added to the product and nothing added to the price.' },
    ],
    realExample: { emoji: '🧴', text: 'Bottled-water brands sell a product that is chemically almost identical between them. What differs is the bottle, the source story and the brand, which is enough to sustain very different prices on a shelf where the products sit side by side.' },
    misconception: 'Students treat differentiation as "being different". Being different is easy and mostly useless; the purpose is to be different in a way customers notice and pay for. Write instead: differentiation succeeds when the difference is visible to the customer and worth money to them.',
    examMatters: 'Connect differentiation to price. An answer that stops at "it makes the product stand out" has described; an answer that continues "so demand is less price-sensitive and the firm can hold its price when a rival cuts" has analysed, which is what an Analyse (6 marks, WBS11 Appendix 6) requires.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the purpose of product differentiation:',
      template: [
        'Differentiation makes a product less ___ for a rival\'s',
        '→ Customers stop comparing on ___ alone and start comparing on preference',
        '→ So fewer of them ___ when a rival undercuts the firm',
      ],
      answers: ['substitutable', 'price', 'switch'],
      hints: ['able to be swapped for something else without the customer minding', 'the one variable identical products can be compared on', 'what a customer does when they move to a rival'],
      distractors: ['expensive', 'complain'],
    }),
  };
})();

const addingValue = (() => {
  const sid = subId('adding-value'); // March id, kept
  const va = valueAdded();
  return {
    id: sid,
    title: 'Adding Value',
    keyIdea: 'Value added is the difference between what a business pays for its inputs and what the customer pays for the finished product — and it is where profit comes from.',
    body: [
      { type: 'paragraph', text: '**Adding value** is raising the worth of a product to the customer above the cost of the bought-in materials and components used to make it. **Value added** is that difference, and it is measured, not asserted.' },
      { type: 'subheading', text: 'Worked example: Zuri Juice' },
      { type: 'bullets', items: [
        `Bought-in inputs per bottle — fruit, bottle, label, cap — cost ${money(INPUT_COST)}.`,
        `The bottle sells for ${money(PRICE)}.`,
        `Value added = ${money(PRICE)} − ${money(INPUT_COST)} = **${money(va)}** per bottle.`,
      ] },
      { type: 'paragraph', text: 'That ' + money(va) + ' is not profit. It has to cover wages, rent, energy, distribution and marketing first; profit is what remains of it. But no business earns a profit without adding value, which is why the concept sits under positioning rather than accounting.' },
      { type: 'bullets', items: [
        '**Branding** — the same drink in a trusted name sells for more.',
        '**Design and packaging** — a bottle that is easier to carry or reseal.',
        '**Convenience** — chilled and sold where the customer already is.',
        '**Customer service** — reliable delivery a retailer can plan around.',
        '**Customisation** — a size or a mix the buyer specifies.',
      ] },
      { type: 'paragraph', text: 'Each method costs something, so adding value pays only when the rise in what the customer will pay exceeds the cost of causing it.' },
    ],
    realExample: { emoji: '☕', text: 'A coffee shop buys beans, water and a cup for a fraction of what it charges for the drink. The difference is bought by the roasting, the service, the seating and the location — and it pays for all of them before any of it becomes profit.' },
    misconception: 'Students treat adding value as raising the price. Raising the price alone adds no value and loses customers. Write instead: adding value raises what the customer is willing to pay by changing the product or the experience, and the higher price follows from that rather than causing it.',
    examMatters: `A Calculate (4 marks, WBS11 Appendix 6) on value added is selling price minus the cost of bought-in materials, per unit — not price minus total costs, which is profit. State the unit: ${money(va)} per bottle.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the value-added calculation for one bottle of Zuri Juice:',
      template: [
        'Value added is the selling price minus the cost of bought-in ___',
        `→ For one bottle of Zuri Juice that is ${money(PRICE)} − ${money(INPUT_COST)} = ___`,
        '→ Value added is not ___: it must first cover wages, rent, energy and marketing',
      ],
      answers: ['materials', money(va), 'profit'],
      hints: ['what the firm buys in from suppliers and then transforms', 'the difference between the two figures on that line', 'what is left once every other cost has been paid'],
      distractors: ['revenue', 'labour'],
    }),
  };
})();

/* ══ assembly ══════════════════════════════════════════════════════════════ */

export const B1 = 'The Market: Mass and Niche';
export const B2 = 'Dynamic Markets, Competition and Risk';
export const B3 = 'What Market Research Is For';
export const B4 = 'Research Methods and Sampling';
export const B5 = 'Orientation and Market Mapping';
export const B6 = 'Segmentation, Advantage and Value';

const BLOCKS = [
  {
    title: B1,
    sections: [massMarkets, nicheMarkets, marketSizeShareGrowth, branding],
    takeaway: [
      'A mass market trades customisation for volume; a niche market trades volume for a premium.',
      `Zuri holds ${sharePct()}% of a chilled-juice market that grew ${growthPct()}% this year.`,
      'A brand is an expectation, and loyalty to it is what makes demand less price-sensitive.',
    ],
  },
  {
    title: B2,
    sections: [onlineRetailing, innovationAndAdapting, competition, riskAndUncertainty],
    takeaway: [
      'A dynamic market changes rapidly and continuously — in any direction, not only upward.',
      'Online retailing lowers entry costs, widens reach, exposes prices and generates data.',
      'Competition decides a firm\'s freedom over price; how hard entry is decides how long it lasts.',
      'Risk has outcomes you can list and put odds on. Uncertainty does not, so it needs slack.',
    ],
  },
  {
    title: B3,
    sections: [primaryAndSecondaryData, quantAndQual, identifyingNeeds, quantifyingDemand],
    takeaway: [
      'Primary or secondary is about who collected it; quantitative or qualitative is about what kind.',
      'Research identifies needs, quantifies likely demand and gives insight into behaviour.',
      `Scaling 18% of ${SURVEY_N} shoppers gives ${likelyBuyers().toLocaleString('en-GB')} weekly buyers — a ceiling, not a forecast.`,
    ],
  },
  {
    title: B4,
    sections: [primaryMethods, secondaryMethods, sampling],
    takeaway: [
      'Surveys count, focus groups explain, and a product trial measures what customers did.',
      'Secondary sources are cheap and immediate; ask who collected each one, and when.',
      'Stratified and quota sampling both use subgroups; only stratified selects at random inside them.',
    ],
  },
  {
    title: B5,
    sections: [orientation, marketMapping],
    takeaway: [
      'Product orientation starts from what the firm can make, market orientation from research.',
      'A market map plots rivals on two variables and reveals the positions nobody occupies.',
      'A gap is a question about demand, not an answer: research is what turns it into an opportunity.',
    ],
  },
  {
    title: B6,
    sections: [segmentation, competitiveAdvantage, differentiation, addingValue],
    takeaway: [
      'Segmentation divides, targeting chooses a segment, positioning decides how it is presented.',
      'A competitive advantage is worth having only for as long as rivals cannot copy it.',
      'Differentiation makes a product less substitutable, which gives the firm room on price.',
      `Value added is ${money(PRICE)} − ${money(INPUT_COST)} = ${money(valueAdded())}, and it pays every other cost before profit.`,
    ],
  },
];

export const SUBSECTIONS = BLOCKS.flatMap((b) => b.sections);

/**
 * @param {{diagramIds: Record<string,string>, quizIndices: Record<string,number[]>, practiceIndices: Record<string,number[]>}} pins
 */
export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  return BLOCKS.map((b) => ({
    id: blockId(b.title),
    title: b.title,
    sections: b.sections,
    takeaway: b.takeaway,
    ...(diagramIds[b.title] ? { diagramId: diagramIds[b.title] } : {}),
    quizIndices: quizIndices[b.title],
    practiceIndices: practiceIndices[b.title],
  }));
}

/* ══ Notes ═════════════════════════════════════════════════════════════════ */
/*
 * Six Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match against
 * every one of them — the March "Branding" topic had no Learn Mode block at all, which is the finding
 * that rule was written for. Notes carry the specification's own phrasing where the coverage rule needs
 * it (packet 14's rule): `spec.uncovered` is lexical, so a leaf worded "newspapers/magazines/TV/radio"
 * needs those words together in one field, and the sentence still has to teach.
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const exam = (text) => ({ type: 'imp', text, tag: 'exam' });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '4 concepts + formulas',
    keyIdea: 'Markets are described by how broadly they are served, how big they are, how much of them one firm holds, and how fast the whole thing is growing.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Mass market</strong> — the largest segment of a market, served by a standardised product aimed at the widest possible range of customers. Characteristics: high volume, low margin, wide distribution, heavy competition.'),
        def('<strong>Niche market</strong> — a small, clearly defined segment whose particular needs the mass-market product does not meet. Characteristics: low volume, high margin, specialised product, concentrated risk.'),
        def('<strong>Market size</strong> — total sales in a market over a period, by volume (units) or by value (revenue).'),
        def('<strong>Market share</strong> — the proportion of total market sales held by one firm, as a percentage.'),
        def('<strong>Market growth</strong> — the percentage change in market size between two periods.'),
        def('<strong>Brand</strong> — the reputation and set of associations a name carries, which is what turns repeat purchase into brand loyalty.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Volume lets a mass-market firm spread fixed costs over a huge output, so <strong>average cost per unit falls</strong> and it can compete on price.'),
        mech('Specialisation lets a niche firm charge a <strong>premium</strong>, because the customer values the fit and has few alternatives.'),
        mech('Brand loyalty makes demand <strong>less price-sensitive</strong>, so a price rise loses fewer customers, and makes the market <strong>harder to enter</strong> for anyone whose name means nothing yet.'),
        exam('A rising share of a growing market is the strongest position there is; a rising share of a shrinking market may only mean the firm is the last one left.'),
      ] },
    ],
    formulas: [
      { label: 'MARKET SHARE', text: "Market share (%) = (Firm's sales ÷ Total market sales) × 100" },
      { label: 'MARKET GROWTH', text: 'Market growth (%) = ((New market size − Old market size) ÷ Old market size) × 100' },
    ],
    takeaway: [
      'Mass and niche are a trade-off between volume and margin, not a ranking.',
      `Zuri Juice: ${money(ZURI_SALES)}m of a ${money(MARKET_NOW)}m market is a ${sharePct()}% share, in a market that grew ${growthPct()}%.`,
      'A brand is an expectation kept consistently; the logo only triggers it.',
    ],
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) needs the formula, the substitution and the answer with a percentage sign — and then the number has to be used, or only the calculation marks are available.',
  },
  {
    title: B2,
    meta: '4 concepts',
    keyIdea: 'Dynamic markets change continuously; online retailing and innovation are the two changes the specification names, and competition and uncertainty are what they leave firms facing.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Dynamic market</strong> — a market subject to rapid and continuous change in tastes, technology, competition or regulation. Change in any direction counts, including contraction.'),
        def('<strong>Online retailing</strong> — selling directly to customers over the internet rather than through a shop, which cuts entry costs, widens reach, makes prices transparent and produces data with every order.'),
        def('<strong>Innovation</strong> — a new or improved product, or a new way of making or delivering one, brought to market and adopted. An invention that nobody adopts changes no market.'),
        def('<strong>Risk</strong> — outcomes that can be listed and given probabilities, so they can be planned for, priced or insured.'),
        def('<strong>Uncertainty</strong> — outcomes that cannot be listed or given probabilities, so only flexibility helps.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('<strong>Innovation and market growth</strong>: a cheaper or simpler version brings in customers the old product priced out, so the market gets bigger rather than the shares changing.'),
        mech('<strong>Adapting to change</strong>: when expectations reset, share moves to the firms that changed the offer and away from those that defended existing sales.'),
        mech('Competition intensity depends on the <strong>number</strong> of rivals, how <strong>similar</strong> the products are, and how easily a new firm can <strong>enter</strong>.'),
        link('What makes entry hard — capital, brand, patents, exclusive supply, licences — decides tomorrow\'s level of competition, not today\'s. The Economics papers call these <strong>barriers to entry</strong>.'),
      ] },
    ],
    takeaway: [
      'Name the change and follow it to a decision; "the market is dynamic" on its own is context, not analysis.',
      'Growth from new customers and growth from new uses are different mechanisms and should be separated.',
      'Sort a list of things that might go wrong into risks and uncertainties before evaluating it.',
    ],
    misconception: 'A dynamic market is not the same as a growing one. Shrinking, fragmenting and being displaced by a new technology are all dynamic.',
  },
  {
    title: B3,
    meta: '3 concepts',
    keyIdea: 'Primary or secondary is about who collected the data; quantitative or qualitative is about what kind it is. The specification then names three jobs research is for.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Primary data</strong> — collected first-hand by or for the business to answer its own question. Fits exactly, costs more, and no rival holds it.'),
        def('<strong>Secondary data</strong> — already collected by somebody else for a different purpose. Cheap and immediate, and may cover the wrong group, period or question.'),
        def('<strong>Quantitative data</strong> — numerical: counts, percentages, shares. It measures.'),
        def('<strong>Qualitative data</strong> — opinions, motivations and reactions. It explains.'),
      ] },
      { title: 'WHAT RESEARCH IS FOR', items: [
        mech('To <strong>identify and anticipate customer needs and wants</strong>: what is wanted now, and what will be wanted next.'),
        mech('To <strong>quantify likely demand</strong>: scale the proportion who say they would buy up to the target population, multiply by price, then discount for the gap between intention and purchase.'),
        mech('To <strong>gain insight into consumer behaviour</strong>: how customers decide, what they compare, what makes them switch.'),
        exam('The two dimensions cross: till data is primary and quantitative, a focus group is primary and qualitative, a published report is secondary and quantitative, a magazine review is secondary and qualitative.'),
      ] },
    ],
    formulas: [
      { label: 'LIKELY DEMAND', text: 'Likely buyers = Target population × Proportion who say they would buy' },
      { label: 'LIKELY REVENUE', text: 'Likely revenue = Likely buyers × Price' },
    ],
    takeaway: [
      `Zuri: ${POPULATION.toLocaleString('en-GB')} shoppers × 18% = ${likelyBuyers().toLocaleString('en-GB')} weekly buyers; × ${money(PRICE)} = ${money(weeklyRevenue())} a week.`,
      'Treat a scaled survey figure as a ceiling, and say so — that sentence is where the evaluation marks are.',
      'Most firms use secondary data first and buy primary data only for the question it cannot answer.',
    ],
    examMatters: 'Read both dimensions of a stem: who collected it decides primary or secondary, and whether it is numbers or words decides quantitative or qualitative. The two are independent of each other.',
  },
  {
    title: B4,
    meta: '3 concepts',
    keyIdea: 'The specification names four primary methods, four secondary sources and three sampling methods. Each method answers a different question, and the sampling method decides whether the answer describes the market.',
    blocks: [
      { title: 'METHODS OF PRIMARY RESEARCH', items: [
        def('<strong>Surveys/questionnaires</strong> — fixed questions put to many people; the only method producing a percentage worth scaling.'),
        def('<strong>Focus groups/consumer panels</strong> — a small group discussing a product; a panel is the same group revisited, so it shows how opinion moves.'),
        def('<strong>Face-to-face/telephone interviews</strong> — one respondent at a time with follow-up questions: most detail, most cost per person.'),
        def('<strong>Product trials/test marketing</strong> — selling in a limited area before full launch and measuring real sales and repeat purchases. The only method that records behaviour rather than intention.'),
      ] },
      { title: 'METHODS OF SECONDARY RESEARCH', items: [
        def('<strong>Websites/social media</strong> — a rival\'s range and prices, and a firm\'s own follower analytics. Free and current; promotional, and a following is not the market.'),
        def('<strong>Newspapers/magazines/TV/radio</strong> — reporting on an industry, entrants and regulation. Broad and current, written to interest a general audience rather than to measure.'),
        def('<strong>Reports</strong> — industry, government and company reports, the usual source of market size and share. Rigorous, sometimes expensive, and always about the past.'),
        def('<strong>Databases</strong> — structured records that can be queried, including the firm\'s own transaction records, which are primary data held in a database.'),
      ] },
      { title: 'SAMPLING', items: [
        mech('<strong>Random</strong> — equal chance for every member of the population; needs a complete list.'),
        mech('<strong>Stratified</strong> — subgroups, then random selection <em>within</em> each, in proportion to size.'),
        mech('<strong>Quota</strong> — subgroups and targets, then whoever is available fills them; selection inside the group is not random.'),
        exam('Stratified and quota both divide into subgroups and both aim at proportionate numbers. The discriminator is random selection inside the subgroup.'),
      ] },
    ],
    takeaway: [
      'Recommend a method against the constraint: budget, time and what is being decided.',
      'A product trial beats a survey when there is time for one, because it measures what people did.',
      'Sample size narrows random error; it does nothing about bias.',
    ],
    examMatters: 'Name what a source is good for and what it cannot show, in that order. A rival\'s website gives prices and range; it cannot give sales volumes.',
  },
  {
    title: B5,
    meta: '2 concepts',
    keyIdea: 'Orientation is where a business starts — its own capability or the customer\'s stated want — and a market map is the tool that shows where its product sits against everyone else\'s.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Product orientation</strong> — starting from what the firm can make well, then finding customers. Suits technology-led markets; risks a superb product nobody wants.'),
        def('<strong>Market orientation</strong> — starting from research into what customers want, then designing to it. Suits fast-changing consumer markets; risks incremental improvement only.'),
        def('<strong>Market mapping</strong> — plotting products on two axes that customers choose by, to show positioning and reveal gaps.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('A map shows <strong>relative position</strong>: who a firm actually competes with, which is not always who it thinks.'),
        mech('A <strong>gap</strong> is a position no competitor occupies. It may be empty because nobody wants it, or because it cannot be produced at that price.'),
        exam(`Zuri's market: Tamu and Mkali low on price and juice content, Halo high on both, Safi at ${money(BRANDS[3].price)} for ${BRANDS[3].juice}%, Zuri at ${money(BRANDS[2].price)} for ${BRANDS[2].juice}%. The gap is about ${GAP.juice}% juice at ${money(GAP.price)}.`),
        link('Testing a gap is what quantifying likely demand is for: the two topics are one decision.'),
      ] },
    ],
    takeaway: [
      'Most firms sit between the two orientations; the judgement is about degree and market, not about which is correct.',
      'Label both axes with the variable and its direction: Construct asks for an accurately labelled diagram.',
      'A map plots perceptions, shows two variables at a time, and both of those are limitations worth stating.',
    ],
    misconception: 'A gap in the market is not a guaranteed opportunity. It shows where no competitor is, not where customers are waiting.',
  },
  {
    title: B6,
    meta: '4 concepts + formula',
    keyIdea: 'Segmentation chooses who to serve, differentiation and competitive advantage decide why they choose you, and value added is what the whole thing is measured in.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Market segmentation</strong> — dividing a market into groups sharing needs, characteristics or behaviour. Bases: demographic, geographic, psychographic, behavioural.'),
        def('<strong>Competitive advantage</strong> — a reason customers choose this firm over rivals, from lower costs or from differentiation. Worth having only while it cannot be copied.'),
        def('<strong>Product differentiation</strong> — making a product distinguishable from rivals. Its purpose is to make it less substitutable.'),
        def('<strong>Value added</strong> — selling price minus the cost of bought-in materials and components, per unit.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Segmentation pays when segments are <strong>measurable, reachable, different and large enough</strong>; failing any one of those makes a description rather than a market.'),
        mech('Differentiation makes demand <strong>less price-sensitive</strong>, so the firm keeps customers when a rival undercuts it.'),
        mech('An advantage is durable when copying it is slow, expensive or impossible — a brand of decades, a patent, an exclusive supply, a distribution network.'),
        exam(`Value added is not profit: ${money(valueAdded())} a bottle must cover wages, rent, energy, distribution and marketing before any of it is profit.`),
      ] },
    ],
    formulas: [
      { label: 'VALUE ADDED', text: 'Value added per unit = Selling price − Cost of bought-in materials' },
    ],
    takeaway: [
      'Segmentation divides, targeting chooses, positioning presents.',
      'Name the source of a competitive advantage and say why a rival cannot copy it quickly.',
      `Zuri: ${money(PRICE)} − ${money(INPUT_COST)} = ${money(valueAdded())} of value added on every bottle.`,
    ],
    examMatters: 'A Calculate on value added is price minus bought-in materials per unit, not price minus total costs, which is profit. State the unit in the answer.',
  },
];
