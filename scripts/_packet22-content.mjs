/**
 * PACKET 22 — marketing-mix-strategy, Learn Mode content and Notes.
 *
 * Business Unit 1 (WBS11), IAL topic 1.3.3 Marketing mix and strategy, audit/raw/bus_spec.txt:596-670.
 * 46 leaves, the largest section in the programme. Seven blocks in the specification's own order —
 * objectives and the mix, the life cycle and the portfolio, strategy and the customer, design,
 * promotion and branding, pricing, distribution — and one subsection per idea, so no step carries two:
 * fifteen crowded steps become thirty-three small ones, plus seven check-ins.
 *
 * THE NUMBERING TRAP THAT THREE FINDINGS REST ON. `1.3.3` IS the IAL topic number and title
 * (bus_spec.txt:596), and the app already carries both. The ledger's "1.3.1 Product/service design …
 * 1.3.5 Marketing strategy" are UK GCE Theme 1 numbers; in IAL they are sub-topics 2, 3, 4, 5 and 1 of
 * topic 1.3.3 itself. So structure-04 (rename or split the section) is refused, and structure-05's
 * prescribed order is the UK GCE one — the section's existing order already follows the IAL spec, and
 * reordering it would have been the defect rather than the fix. See the packet 22 spec in NEXT.md.
 *
 * VOCABULARY DECISIONS, each settled against the specification before a word was written:
 *
 *   - "ABOVE THE LINE" AND "BELOW THE LINE" ARE NOT IN THE BUSINESS SPECIFICATION. Zero occurrences
 *     each, as are ATL, BTL, public relations, sales promotion, personal selling and direct marketing.
 *     3a is "Types of promotion." with NO bullets, so the specification sets an open requirement and
 *     supplies no taxonomy for it. The section teaches the types through the vehicles the
 *     specification does name — advertising, sponsorship, social media (3d) and viral marketing (3e) —
 *     plus plainly described others, and names the ATL/BTL labels ONCE, as an aside, never assessed.
 *     topFix-02's "ATL/BTL sort" classify exercise is built on the spec's own vocabulary instead.
 *   - THE BRANDING TAXONOMY GOES THE SAME WAY. "individual brand", "family brand", "corporate brand",
 *     "own brand" and "manufacturer brand" are zero occurrences each; 3b is "Types of branding." with
 *     no bullets. specGap-01 and structure-09 ask for that taxonomy by name; the leaf is real and is
 *     built, but as a mechanism in plain English — what the brand sits on, and whose name it is — with
 *     the labels named once and never tested.
 *   - THE PRODUCT LIFE CYCLE AND THE BOSTON MATRIX ARE THE OPPOSITE CASE, AND ARE TREATED
 *     DIFFERENTLY. "maturity", "decline", "saturation", "star", "cash cow", "question mark" and "dog"
 *     are also zero — but 1b and 1c name THE TOOLS THEMSELVES as requirements, and a named tool cannot
 *     be examined without its own parts. Their stages and quadrants are taught in full. The
 *     distinction this section draws: the specification naming a TOOL means teach its labels; the
 *     specification naming an OPEN CATEGORY means teach the mechanism in the specification's words.
 *   - "RATIONAL" IS ZERO IN bus_spec.txt. specGap-10 asks for "rational vs emotional decision-making"
 *     under 1f; rational decision making is Economics 1.3.2 sub-topic 1 (econ_spec.txt:580) and
 *     packet 17's material. 1f is "Consumer behaviour – how businesses develop customer loyalty", and
 *     the em-dash makes loyalty the content of the requirement. Loyalty is what is taught.
 *   - THE PRICING FACTORS ARE THE SPECIFICATION'S SIX, NOT THE MARCH SEVEN (accuracy-02, :653-660):
 *     number of USPs/amount of differentiation, price elasticity of demand, LEVEL of competition in
 *     the business environment, strength of brand, stage in the product life cycle, and costs and the
 *     need to make a profit. "State of the economy" is zero occurrences and goes.
 *   - THE CHANNELS ARE "FOUR STAGE", "THREE STAGE" AND "TWO STAGE" (:665-668), which settles
 *     specGap-11's "unsure" in the specification's favour. The March "zero-level/one-level/two-level"
 *     and the intensive/selective/exclusive taxonomy (zero occurrences; the one hit is
 *     capital-intensive PRODUCTION at :983) both go — quiz-01 was right.
 *   - "ANSOFF" APPEARS TWICE, BOTH IN UNITS 3 AND 4 (:1098, :1435). It must not appear here.
 *
 * Ids: the March subsection ids that survive keep theirs, because a progress row points at them.
 *
 * Money is in dollars throughout. No UK-only institution frames an example. No real example carries a
 * year or a figure — the March section attached "a $3 billion valuation through direct distribution
 * alone" to a firm that has operated physical stores for years (accuracy-01), and an unmoored number
 * is the shape of error this rule exists to prevent.
 */
import { subId, SECTION, hash8, money, units, el, pc, share, minus, UNIT_COST, MARKET, TODAY_P, TODAY_Q, PRICES, qU, qB, revU, revB, profitU, profitB, shareU, shareB, pedU, pedB, addedValue, MARKUPS, costPlus, PSYCH_P, CHANNELS, chainOf, shelfOf, zolaKeeps, U_REV_PEAK, U_PROFIT_PEAK, B_REV_PEAK, B_PROFIT_PEAK, U_CHOKE, B_CHOKE } from './_packet22-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

export const B1 = 'Marketing Objectives and the Marketing Mix';
export const B2 = 'The Product Life Cycle and the Portfolio';
export const B3 = 'Marketing Strategy and the Customer';
export const B4 = 'Product and Service Design';
export const B5 = 'Promotion and Branding';
export const B6 = 'Pricing Strategies';
export const B7 = 'Distribution';

/* ══ Block 1 — Marketing objectives and the marketing mix (1.3.3 · 1a, 1d) ══ */

const whatAMarketingObjectiveIs = (() => {
  const sid = subId('marketing-objectives'); // March id, kept
  return {
    id: sid,
    title: 'What a Marketing Objective Is',
    keyIdea: 'A marketing objective is a target for what the marketing is meant to achieve, stated so plainly that the business can tell afterwards whether it hit it.',
    body: [
      { type: 'paragraph', text: 'A **marketing objective** is a goal the business sets for its marketing: something it wants to be true at the end of a period that is not true now. "Sell more" is not one, because two people can disagree about whether it happened. "Reach 15% of the bottles bought in the region by the end of next year" is one, because they cannot.' },
      { type: 'paragraph', text: 'The specification names **three** marketing objectives, and this chapter takes one subsection each: **increase market share**, **increase revenue**, and **building a brand**. They are separate targets, and the rest of this chapter shows that they do not point at the same price.' },
      { type: 'subheading', text: 'Zola, a maker of reusable steel bottles' },
      { type: 'paragraph', text: `Zola sells its bottle at ${money(TODAY_P)} and shifts ${units(TODAY_Q)} a year. Buyers in its region take ${units(MARKET)} bottles a year in total, from every maker together. One bottle costs Zola ${money(UNIT_COST)} to make. Every figure in this section comes from those four numbers.` },
    ],
    realExample: { emoji: '🎯', text: 'A drinks brand that says it wants to "grow awareness" cannot tell at the year end whether it succeeded. One that says it wants to be stocked by a named number of retailers can, and can say who is accountable for it.' },
    misconception: 'Students write an objective as a wish — "increase sales", "become the market leader". An objective a business can manage has a measure and a deadline attached. Write instead: the target, the number, and the date it is measured on.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. For a marketing objective that means naming it as a target for marketing AND saying it is measurable — a definition with only the first half is half a definition.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the three marketing objectives the specification names:',
      template: [
        'increase market ___',
        'increase ___',
        'building a ___',
      ],
      answers: ['share', 'revenue', 'brand'],
      hints: ['the slice of the whole market a business holds', 'price multiplied by the number sold', 'the name and reputation buyers pay for'],
      distractors: ['profit', 'awareness'],
    }),
  };
})();

const increasingMarketShare = (() => {
  const sid = subId('increasing-market-share');
  return {
    id: sid,
    title: 'Increasing Market Share',
    keyIdea: `Market share is the business's own sales as a percentage of the whole market's, so it rises only by taking bottles from a rival or by growing faster than the market does.`,
    body: [
      { type: 'paragraph', text: '**Market share** is what fraction of everything bought in a market comes from this business. It is a percentage, and it is worked out the same way every time:' },
      { type: 'flow', steps: [
        `Count what the business sold: ${units(TODAY_Q)} bottles`,
        `Count what the whole market bought: ${units(MARKET)} bottles`,
        `Divide the first by the second: ${units(TODAY_Q)} ÷ ${units(MARKET)}`,
        `Express it as a percentage: ${share(shareU(TODAY_P))}`,
      ], result: `Zola holds ${share(shareU(TODAY_P))} of its market`, resultType: 'neutral' },
      { type: 'paragraph', text: `Share is a **relative** measure, and that is what makes it a demanding objective: Zola can sell more bottles than last year and still lose share, if every rival grew faster. Cutting the price is the direct route — at ${money(12)} Zola would sell ${units(qU(12))} bottles, which is ${share(shareU(12))} of the market — but the next two subsections show what that costs.` },
    ],
    realExample: { emoji: '📊', text: 'A phone maker that reports record sales in a year when the whole market grew faster has lost market share. Both statements are true at once, which is why a business tracks the share as well as the count.' },
    misconception: 'Students treat rising sales and rising market share as the same news. They are the same only if the market itself stood still. Check what the whole market did before judging the share.',
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) requires you to perform a calculation based on given data, and says workings should be given. For a market share that means showing the division as well as the percentage.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete Zola\'s market share at two prices, against a market of ' + units(MARKET) + ' bottles:',
      template: [
        `at ${money(TODAY_P)} Zola sells ${units(TODAY_Q)} bottles, so its share is ______`,
        `at ${money(12)} it would sell more, and its share would be ______`,
        'which is the sales divided by the ______, as a percentage',
      ],
      answers: [share(shareU(TODAY_P)), share(shareU(12)), 'whole market'],
      hints: ['divide today\'s sales by the market and multiply by a hundred', 'a lower price sells more, so the share is larger', 'the denominator: everything every seller sold'],
      distractors: [share(shareU(16)), 'unit cost'],
    }),
  };
})();

const increasingRevenue = (() => {
  const sid = subId('increasing-revenue');
  return {
    id: sid,
    title: 'Increasing Revenue',
    keyIdea: 'Revenue is price multiplied by quantity, so a price cut that wins share can leave revenue lower — the two objectives are not the same objective.',
    body: [
      { type: 'paragraph', text: '**Revenue** is the money the sales bring in: the price multiplied by the number sold. Nothing is taken off it — costs come later, and revenue is the top line rather than what the business keeps.' },
      { type: 'paragraph', text: `This is where the first two objectives come apart. Zola's sales at each price, its share, and the revenue each price brings:` },
      { type: 'bullets', items: [
        `${money(12)}: ${units(qU(12))} bottles · share ${share(shareU(12))} · revenue **${money(revU(12))}**`,
        `${money(16)}: ${units(qU(16))} bottles · share ${share(shareU(16))} · revenue **${money(revU(16))}**`,
        `${money(TODAY_P)}: ${units(qU(TODAY_P))} bottles · share ${share(shareU(TODAY_P))} · revenue **${money(revU(TODAY_P))}**`,
        `${money(24)}: ${units(qU(24))} bottles · share ${share(shareU(24))} · revenue **${money(revU(24))}**`,
      ] },
      { type: 'paragraph', text: `Read the two columns against each other. Market share is largest at the **lowest** price and falls all the way up. Revenue does not: it rises to ${money(U_REV_PEAK)} and falls again, so **${money(U_REV_PEAK)} is the revenue-maximising price** while the share-maximising price is the lowest one Zola will go to. A business chasing share and a business chasing revenue set different prices, and a business that has not said which it is chasing cannot price at all.` },
      { type: 'paragraph', text: `Note the ${money(12)} and ${money(TODAY_P)} rows: the same revenue, ${money(revU(12))}, from ${units(qU(12))} bottles or from ${units(qU(TODAY_P))}. Revenue alone cannot tell those two businesses apart.` },
    ],
    realExample: { emoji: '💵', text: 'A cinema chain that discounts heavily on a quiet weekday fills more seats and takes less money than it would have at the full price. Whether that is a good decision depends on which objective it set.' },
    misconception: 'Students assume that selling more always means earning more. Revenue is price times quantity, and a price cut moves both — one up, one down. Work the multiplication before saying which way revenue went.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) requires a brief explanation of cause or effect supported by details or examples. A price cut raising share while lowering revenue is a cause and an effect, and the figures are the detail.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each price to what it is the best price for, using the table above:',
      pairs: [
        { left: money(12), right: 'The largest market share', why: `The lowest price sells the most bottles, ${units(qU(12))}, which is the largest slice of the ${units(MARKET)} the market buys` },
        { left: money(U_REV_PEAK), right: 'The largest revenue', why: `Revenue rises to ${money(revU(U_REV_PEAK))} here and falls on either side, so this is the top of the curve rather than a step on the way up` },
        { left: money(24), right: 'Neither share nor revenue', why: 'The highest price gives the smallest share and a revenue below the peak, so it can only be justified by an objective this chapter has not reached yet' },
      ],
      distractors: ['The lowest unit cost'],
    }),
  };
})();

const buildingABrand = (() => {
  const sid = subId('building-a-brand');
  return {
    id: sid,
    title: 'Building a Brand',
    keyIdea: 'Building a brand is an objective in its own right because a brand changes what the business can charge, which is why it is worth spending on before it pays.',
    body: [
      { type: 'paragraph', text: 'The third objective the specification names is **building a brand**. It sits oddly beside the other two at first: share and revenue are numbers this year, and a brand is built over several. That is the point of naming it separately — it is the objective a business pursues when it is willing to give up something now for what the brand lets it do later.' },
      { type: 'paragraph', text: `What a brand does is change the shape of demand rather than its level. A well-built brand does not necessarily sell more bottles today at ${money(TODAY_P)}; what it changes is how many Zola loses when it raises the price. Block 5 works that pivot out with the figures, and shows the three benefits the specification lists: **added value**, the **ability to charge premium prices**, and **reduced price elasticity of demand**.` },
      { type: 'paragraph', text: `The cost is that the spending is real and immediate while the return is later and uncertain. A business that sets building a brand as its objective is accepting a worse year now, and it needs to say so out loud — otherwise the same spending looks like a failure to hit the other two objectives.` },
    ],
    realExample: { emoji: '🏷️', text: 'A supermarket own-label tin and a branded tin of the same beans, made in the same factory, sit on the same shelf at different prices. The gap is what the brand is worth to the shopper, and it took years of spending to open.' },
    misconception: 'Students treat a brand as the logo. The logo is how a brand is recognised, not what it is: a brand is the expectation a buyer already has before the product is taken off the shelf.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires a coherent, well contextualised chain of reasoning with balanced assessment leading to a supported judgement. Judging a brand-building objective means weighing what it costs this year against what it changes later.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each result by which marketing objective it is evidence of: Increase Market Share, Increase Revenue, or Building a Brand.',
      groups: [
        { name: 'Increase Market Share', why: 'A measure of this business against the whole market, so it can only be read by comparing the two', items: ['Bottles sold, as a percentage of all bottles bought', 'Two rivals lose stockists to Zola in the same year'] },
        { name: 'Increase Revenue', why: 'Price multiplied by quantity, which is a figure from this business alone', items: ['The money taken at the till this year', 'Sales value rises after a price rise'] },
        { name: 'Building a Brand', why: 'Evidence about what buyers will accept, which shows up in what the business can charge rather than in this year\'s count', items: ['Buyers stay after a price rise', 'Shoppers name the bottle unprompted'] },
      ],
    }),
  };
})();

const theMarketingMix = (() => {
  const sid = subId('the-marketing-mix-4ps'); // March id, kept
  return {
    id: sid,
    title: 'The Marketing Mix',
    keyIdea: 'The marketing mix is the set of decisions a business controls about its product, its price, how it promotes it and where it is sold, and the four have to agree with each other.',
    body: [
      { type: 'paragraph', text: 'The **marketing mix** is the name for the decisions a business actually controls when it takes a product to market. There are four of them, and the rest of this section is one block each:' },
      { type: 'bullets', items: [
        '**Product** — what it is, what it does, what it looks like and what it costs to make. Block 4.',
        '**Promotion** — how buyers are told about it and what they come to think of the name. Block 5.',
        '**Price** — what is charged, and on what basis. Block 6.',
        '**Place** — how it physically reaches the buyer. Block 7.',
      ] },
      { type: 'paragraph', text: `The reason they are taught as a **mix** rather than a list is that a decision in one constrains the others. Zola cannot charge ${money(24)} for a bottle sold from an unbranded carton in a discount shop, and it cannot sell a hand-finished bottle at ${money(12)} through a four-stage channel that takes most of the price. A mix "works" when a buyer meets the same message in all four.` },
      { type: 'paragraph', text: 'That is also the trap in an exam answer. Asked to evaluate a marketing decision, a weak answer changes one element and stops. A strong one says what the change forces in the other three.' },
    ],
    realExample: { emoji: '🧩', text: 'A car sold as a budget runabout and advertised on price is a coherent mix. The same car with a luxury launch event and a premium showroom is not — buyers read the mismatch as a reason to distrust the claim.' },
    misconception: 'Students describe the four elements one at a time and never connect them, which is what the word "mix" is warning against. Say what each decision forces the other three to be.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. For the marketing mix that means the set of controllable decisions a business makes to sell a product, not a recital of the four names.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each of Zola\'s decisions to the element of the marketing mix it belongs to:',
      pairs: [
        { left: 'A wider lid so it takes ice cubes', right: 'Product', why: 'What the thing itself is — its function, its look and what it costs to make' },
        { left: 'A sponsorship of a regional running series', right: 'Promotion', why: 'How buyers are told about it, and what they come to expect from the name' },
        { left: `A mark-up of ${MARKUPS[2]}% on the unit cost`, right: 'Price', why: 'What is charged, and on what basis the figure was arrived at' },
        { left: 'A listing with a national retail chain', right: 'Place', why: 'How the bottle physically reaches the buyer who will use it' },
      ],
    }),
  };
})();

/* ══ Block 2 — The product life cycle and the portfolio (1.3.3 · 1b, 1c) ════ */
/*
 * "maturity", "decline" and "saturation" are zero occurrences in bus_spec.txt, and so are "star",
 * "cash cow", "question mark" and "dog". They are taught anyway, and the reason is the distinction
 * this packet draws: 1b and 1c name THE TOOLS, and a tool the specification requires cannot be
 * examined without its own parts. That is a different case from 3a and 3b, which name open
 * categories and leave the taxonomy to the textbook — see the header.
 */

const theStagesOfTheProductLifeCycle = (() => {
  const sid = subId('product-life-cycle'); // March id, kept
  return {
    id: sid,
    title: 'The Stages of the Product Life Cycle',
    keyIdea: 'The product life cycle tracks a product\'s sales from launch to withdrawal in four stages, and its use is that the right price, promotion and place are different in each.',
    body: [
      { type: 'paragraph', text: 'The **product life cycle** is a picture of what happens to one product\'s sales over its lifetime. It has four stages, and a business uses it to decide what the rest of the mix should be doing right now.' },
      { type: 'flow', steps: [
        { title: 'Introduction', subtitle: 'Sales start from nothing. Spending is heavy and the product is usually making a loss' },
        { title: 'Growth', subtitle: 'Sales climb quickly as the product is found. This is where it starts to pay back' },
        { title: 'Maturity', subtitle: 'Sales level off. Rivals have arrived, and profit is at its highest because the launch spending has stopped' },
        { title: 'Decline', subtitle: 'Sales fall as buyers move on. The business chooses between extending the life and withdrawing' },
      ], result: 'Four stages, and a different job for the mix in each', resultType: 'neutral' },
      { type: 'paragraph', text: 'Two things are worth noticing on the curve. **Profit is not sales**: it lags behind, starts negative, and peaks before sales do, because the price is falling by the time the volume is at its highest. And the stages have **no fixed length** — a fashion item can pass through all four in a season while a staple food stays in maturity for decades.' },
    ],
    realExample: { emoji: '📼', text: 'The physical video rental shop passed through every stage: a novelty, then a rapid climb, then a long plateau of high street branches, then a fall as streaming arrived. The stages were the same; only the speed differed.' },
    misconception: 'Students read the curve as a timetable and write that a product "must" be in decline after a set number of years. The cycle describes a pattern of sales, not a schedule — a product is in the stage its sales say it is in.',
    examMatters: 'A Construct (4 marks, WBS11 Appendix 6) requires you to draw an accurately labelled diagram, and says the type of diagram may be stated or left to you. A life-cycle curve needs both axes labelled, the four stages marked, and sales and profit drawn as separate lines.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four stages of the product life cycle into the order a product meets them, from launch onwards:',
      correctOrder: ['Introduction', 'Growth', 'Maturity', 'Decline'],
      why: [
        'Sales begin from nothing and the spending has not been recovered yet',
        'The climb, once enough buyers have found the product to carry it',
        'Sales stop climbing and settle, which is where profit is highest',
        'Sales fall away, and the business decides between extending and withdrawing',
      ],
      criterion: 'the order of a product\'s sales over its lifetime',
    }),
  };
})();

const extensionStrategies = (() => {
  const sid = subId('extension-strategies');
  return {
    id: sid,
    title: 'Extension Strategies',
    keyIdea: 'An extension strategy is a change made to hold a product in maturity for longer, and it works by giving an existing buyer a new reason to buy rather than by finding a new product.',
    body: [
      { type: 'paragraph', text: 'An **extension strategy** is what a business does when sales start to fall and it would rather not withdraw the product. The point is to push the decline back, and every version of it does that the same way: by changing something about the product or its mix without changing what the product fundamentally is.' },
      { type: 'bullets', items: [
        'Change the **product** a little — a new size, a new flavour, a new colour for the season.',
        'Find a **new group of buyers** for the thing that already exists.',
        'Find a **new use** for it, so existing buyers buy it more often.',
        'Change the **price** or the **promotion**, so it reaches buyers who passed it by before.',
        'Change the **place** — a channel the product was never sold through.',
      ] },
      { type: 'paragraph', text: 'Read that list against the mix in block 1 and the connection is the examinable part: an extension strategy is a change to one of the four elements, made deliberately at a particular point on the curve. It is cheaper than a new product because the development is already paid for, and it is limited for the same reason — there is only so much life in a product buyers have started leaving.' },
    ],
    realExample: { emoji: '🥣', text: 'A breakfast cereal sold for decades to children is re-promoted to adults as a late-night snack. The cereal is unchanged; the buyer and the occasion are new, and the decline is pushed back.' },
    misconception: 'Students describe an extension strategy as launching a new product. A new product starts a new life cycle. An extension keeps the existing one in maturity, which is why it costs less and achieves less.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a brief chain of reasoning, explanation and/or justification, and does not include evaluation. Say which element of the mix changes, what that does to sales, and why the change reaches a buyer the product was losing.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each of these changes by whether it extends the existing product\'s life or starts a new life cycle.',
      groups: [
        { name: 'Extension Strategy', why: 'The product is the same one; something around it has been changed to reach a buyer it was losing', items: ['A seasonal colour of the same bottle', 'The same bottle promoted to cyclists', 'A lower price to reach a new group of buyers'] },
        { name: 'A New Life Cycle', why: 'A different product, with its own introduction stage and its own launch spending to recover', items: ['An insulated flask, newly developed', 'A water filter sold under the same name'] },
      ],
    }),
  };
})();

const theBostonMatrix = (() => {
  const sid = subId('boston-matrix'); // March id, kept
  return {
    id: sid,
    title: 'The Boston Matrix',
    keyIdea: 'The Boston Matrix places every product on two axes — the growth of its market and the share the business holds — so that four quadrants say what each product is for.',
    body: [
      { type: 'paragraph', text: 'The **Boston Matrix** is a grid for looking at all of a business\'s products at once rather than one at a time. Each product is placed on two measures:' },
      { type: 'bullets', items: [
        '**Market growth** — is the market this product sells into getting bigger, or standing still? Up the side of the grid.',
        '**Market share** — does this business hold a large or a small slice of that market? Across the bottom.',
      ] },
      { type: 'paragraph', text: 'That gives four boxes, and the names are the tool\'s own:' },
      { type: 'flow', steps: [
        { title: 'Question mark', subtitle: 'Growing market, small share. Might become anything; needs cash to find out' },
        { title: 'Star', subtitle: 'Growing market, large share. The success, but a growing market has to be defended, so it consumes cash too' },
        { title: 'Cash cow', subtitle: 'Flat market, large share. Little needs spending on it, so it produces the cash the others use' },
        { title: 'Dog', subtitle: 'Flat market, small share. Neither growing nor funding anything' },
      ], result: 'Two questions about every product, and four answers', resultType: 'neutral' },
      { type: 'paragraph', text: 'The grid is worth having because those four boxes have different **cash** stories, which the next subsection uses. A business with nothing but question marks runs out of money; a business with nothing but cash cows has no future to spend it on.' },
    ],
    realExample: { emoji: '🧮', text: 'A household-goods group selling detergent, a new cordless vacuum, an old brand of soap and a growing range of cleaning wipes has one of each box on its shelves at the same time.' },
    misconception: 'Students read the horizontal axis as "sales" and place a product by how much of it the business sells. Both axes are about the market: how fast it is growing, and how much of it this business holds.',
    examMatters: 'A Construct (4 marks, WBS11 Appendix 6) requires an accurately labelled diagram. A Boston Matrix needs both axes named and their direction right — growth up the side, share across the bottom — before any product is placed on it.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each pair of readings to the quadrant of the Boston Matrix it places the product in:',
      pairs: [
        { left: 'Growing market, large share', right: 'Star', why: 'The success of the portfolio, though a growing market must be defended, so it spends as well as earns' },
        { left: 'Flat market, large share', right: 'Cash cow', why: 'Nothing needs spending to hold a position in a market that is not growing, so the cash comes out' },
        { left: 'Growing market, small share', right: 'Question mark', why: 'The market is worth being in but this business is not yet established in it, so it needs cash before it says anything' },
        { left: 'Flat market, small share', right: 'Dog', why: 'Neither growing nor funding: the box that forces a decision about whether to keep the product at all' },
      ],
    }),
  };
})();

const managingThePortfolio = (() => {
  const sid = subId('managing-the-portfolio');
  return {
    id: sid,
    title: 'Managing the Portfolio',
    keyIdea: 'A product portfolio is managed by using the cash one product throws off to fund another, which is why a balanced portfolio matters more than any single product in it.',
    body: [
      { type: 'paragraph', text: 'A **product portfolio** is simply every product a business sells, looked at together. The Boston Matrix is how it is read; managing it is what the business does next, and the whole of that is about **where the cash goes**.' },
      { type: 'flow', steps: [
        'A cash cow sells steadily into a market that is not growing, so it needs little spending',
        'The cash it produces is more than it needs for itself',
        'That cash is spent on question marks, to buy them share while their market is still growing',
        'A question mark that wins share becomes a star, and a star in a market that stops growing becomes the next cash cow',
      ], result: 'Today\'s cash cow pays for tomorrow\'s', resultType: 'neutral' },
      { type: 'paragraph', text: 'Two judgements sit on top of that. A **dog** is not automatically withdrawn: it may cover its own costs, or be the reason a retailer stocks the rest of the range. And a business cannot fund every question mark at once — choosing which to back is the decision the grid exists to inform.' },
      { type: 'paragraph', text: 'The link to the life cycle is direct: a product moves round the grid as its market matures, so a portfolio is balanced only if its products are at **different stages**.' },
    ],
    realExample: { emoji: '🔄', text: 'A software firm funds an unprofitable new product for years out of the licence income from an older one that almost sells itself. The old product is not the exciting one, and without it the new one would never have been built.' },
    misconception: 'Students write that dogs should always be divested. Sometimes they should; a dog that covers its costs, completes a range or holds a retailer relationship is worth keeping, and the answer has to say which case this one is.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires balanced, wide-ranging assessment leading to a supported judgement. Judging what to do with a product means weighing what it earns now against what the same money would do elsewhere in the portfolio.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the cash story the portfolio is managed by:',
      template: [
        'the ______ sells into a flat market and produces more cash than it needs',
        'that cash is spent on ______, to buy share while their markets still grow',
        'one of those that wins share becomes a ______, and funds the next generation in its turn',
      ],
      answers: ['cash cow', 'question marks', 'star'],
      hints: ['large share of a market that has stopped growing', 'growing market, small share, and an unanswered question', 'growing market and a large share of it'],
      distractors: ['dog', 'portfolio'],
    }),
  };
})();

/* ══ Block 3 — Marketing strategy and the customer (1.3.3 · 1e, 1f) ═════════ */

const massMarkets = (() => {
  const sid = subId('mass-markets');
  return {
    id: sid,
    title: 'Mass Markets',
    keyIdea: 'A mass market strategy sells one product to as many buyers as possible, which makes each sale cheap to serve and each buyer easy to lose.',
    body: [
      { type: 'paragraph', text: 'A **mass market** is one where the product is aimed at most buyers rather than a particular group. The strategy that goes with it follows from the volume: the product is standardised, the price is competitive, the promotion is broad, and the product is placed wherever most people shop.' },
      { type: 'paragraph', text: 'The advantage is **cost**. Making one version in large numbers brings the cost of each one down, and a business selling into a mass market can accept a small margin on each bottle because there are so many of them.' },
      { type: 'paragraph', text: `The disadvantage is that everyone else can see the same opportunity. A mass market is crowded, buyers compare on price, and a business with nothing to distinguish it competes on the one thing it least wants to. Zola at ${money(12)} would hold ${share(shareU(12))} of its market — the largest share on its schedule — and would be earning ${money(addedValue(12))} a bottle to do it.` },
    ],
    realExample: { emoji: '🛒', text: 'A supermarket own-label washing powder is a mass market product: one formulation, a low price, wide distribution and promotion that talks about value rather than identity.' },
    misconception: 'Students equate a mass market with a large business. The size of the market is about how many buyers are targeted, not how big the seller is — a small firm can sell a standard product into a mass market, and a large one can run several niches.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) requires a brief explanation of cause or effect supported by details or examples. The cause is the volume; the effects are the lower unit cost and the pressure on price.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what follows from selling into a mass market:',
      template: [
        'the product is ______, so one version serves every buyer',
        'making so many brings the ______ cost of each one down',
        'but buyers compare on ______, because little else separates the sellers',
      ],
      answers: ['standardised', 'unit', 'price'],
      hints: ['the opposite of made-to-order', 'the cost of producing a single item', 'the thing a crowded market competes on'],
      distractors: ['premium', 'total'],
    }),
  };
})();

const nicheMarkets = (() => {
  const sid = subId('niche-markets');
  return {
    id: sid,
    title: 'Niche Markets',
    keyIdea: 'A niche strategy serves a small group whose needs the mass market does not meet, which allows a higher price and limits how far the business can grow.',
    body: [
      { type: 'paragraph', text: 'A **niche market** is a small part of a larger market with a need the standard product does not answer. The strategy inverts every element of the mass market one: the product is specialised, the price is higher, the promotion is narrow and direct, and the product is placed where that particular group looks.' },
      { type: 'paragraph', text: 'The advantage is the **price**. Buyers in a niche are choosing the product because it does something for them that the mass-market alternative does not, so price is not the first thing they compare, and the margin on each sale is wider.' },
      { type: 'paragraph', text: `Two limits come with it, and a good evaluation names both. The market is **small**, so there is a ceiling on sales however well the business does. And it is **concentrated**: a business depending on one group of buyers is exposed if their tastes move or a larger rival decides the niche is now worth entering.` },
    ],
    realExample: { emoji: '🎸', text: 'A maker of left-handed instruments serves buyers the mass manufacturers barely address. The buyers pay more and stay loyal, and there will never be very many of them.' },
    misconception: 'Students write that niche markets are always more profitable because the margin is higher. A wide margin on a small number of sales can earn less than a thin margin on a large number — the comparison is margin times volume, not margin alone.',
    examMatters: 'A Discuss (8 marks, WBS11 Appendix 6) requires logical chains of reasoning in context, showing causes and effects, with a brief assessment showing awareness of competing arguments. A niche strategy has a clear benefit and two clear limits, which is the shape of that assessment.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each feature by the strategy it belongs to: Mass Market or Niche Market.',
      groups: [
        { name: 'Mass Market', why: 'One standard product for as many buyers as possible, where the advantage comes from volume', items: ['A standardised product', 'A low unit cost from high volume', 'Broad promotion to a general audience'] },
        { name: 'Niche Market', why: 'A specialised product for a small group whose needs the standard one misses', items: ['A higher price the buyers accept', 'A ceiling on how many can be sold', 'Promotion aimed at one group directly'] },
      ],
    }),
  };
})();

const b2bAndB2c = (() => {
  const sid = subId('b2b-vs-b2c'); // March id, kept
  return {
    id: sid,
    title: 'Business to Business and Business to Consumer',
    keyIdea: 'Selling to a business and to a household are different strategies: one buys in quantity on a case that must be justified, the other buys one at a time for itself.',
    body: [
      { type: 'paragraph', text: '**Business to business (B2B)** means the customer is another business. **Business to consumer (B2C)** means the customer is the person who will use the product. The specification names both because the mix that works for one does not work for the other.' },
      { type: 'bullets', items: [
        '**How many, and how often.** A B2B buyer orders in quantity and repeatedly; a B2C buyer takes one and may never return. So a single B2B account is worth protecting in a way a single consumer is not.',
        '**Who decides.** A B2B purchase is usually justified to somebody else, so the winning argument is about cost, reliability and terms. A B2C buyer answers to nobody.',
        '**How the price is set.** A B2B price is often negotiated per account and varies with quantity. A B2C price is published and the same for everyone.',
        '**How it is sold.** B2B promotion is direct, to named buyers; B2C promotion goes to an audience the business cannot name.',
      ] },
      { type: 'paragraph', text: `Zola sells both ways, and the same bottle carries two mixes: a negotiated price per case to a retail chain, and ${money(TODAY_P)} on its own site. Block 7 shows what each does to the money Zola keeps.` },
    ],
    realExample: { emoji: '🤝', text: 'A coffee roaster supplies cafés by the sack on agreed terms and sells small bags from its own shop. Same coffee, two prices, two kinds of relationship.' },
    misconception: 'Students write that B2B marketing is "rational" and B2C is "emotional". A business buyer still has preferences and a consumer still compares prices. The reliable difference is that a B2B purchase usually has to be justified to someone else, which changes what the argument has to contain.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a brief chain of reasoning, and includes interpretation if it is applied to given data. Name the type of customer, say what that changes about the mix, and follow it to the effect on the business.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each decision to the kind of selling it belongs to, and note what makes it so:',
      pairs: [
        { left: 'The price is negotiated per account, by quantity', right: 'The buyer orders repeatedly and in volume', why: 'A repeat buyer ordering in bulk has something to negotiate with, and the seller has a reason to let it' },
        { left: 'One published price, the same for everyone', right: 'Each buyer takes one, and there is nothing to negotiate', why: 'Individual purchases leave nothing to bargain over, and a single published price is far cheaper to run' },
        { left: 'The case is built on reliability of supply and terms', right: 'The purchase has to be justified to somebody else', why: 'The argument has to survive being repeated by the buyer to whoever approves the spending' },
        { left: 'Promotion goes to an audience the seller cannot name', right: 'The buyers are too many to approach individually', why: 'Consumers are dispersed and anonymous to the seller, so the message has to go out broadly' },
      ],
    }),
  };
})();

const developingCustomerLoyalty = (() => {
  const sid = subId('customer-loyalty'); // March id, kept
  return {
    id: sid,
    title: 'Developing Customer Loyalty',
    keyIdea: 'A loyal customer is one who does not re-open the decision, which is worth more than the discount that bought them, because keeping a buyer costs less than finding one.',
    body: [
      { type: 'paragraph', text: '**Customer loyalty** is a buyer returning without shopping around again. The specification asks how businesses develop it, and the honest answer is that most of it is not the loyalty scheme.' },
      { type: 'flow', steps: [
        { title: 'The product does what it promised', subtitle: 'Repeatedly, so there is no reason to look elsewhere. Everything else is built on this' },
        { title: 'Something goes wrong and is put right', subtitle: 'A problem handled well binds a buyer more tightly than one that never happened' },
        { title: 'The buyer is recognised', subtitle: 'A reward, a tier, an offer that acknowledges the history — this is where a scheme belongs' },
        { title: 'Leaving would cost something', subtitle: 'A balance built up, a set-up that would have to be redone, a relationship worth keeping' },
      ], result: 'Loyalty is earned in that order, and a scheme cannot substitute for the first step', resultType: 'neutral' },
      { type: 'paragraph', text: 'What it is worth to the business is concrete: a returning buyer costs nothing to find, buys more often, and is less likely to leave over a price rise — which links straight to the pricing block, because the same loyalty that holds a buyer is what lets the business charge more without losing them.' },
    ],
    realExample: { emoji: '☕', text: 'A coffee shop where the staff know the order is holding customers on something a rival cannot copy by launching a card. The card is the visible part; the recognition is what is actually working.' },
    misconception: 'Students treat points and discounts as loyalty. A buyer who returns only while the discount lasts is buying a discount, not showing loyalty — and the business is paying for sales it might have had anyway.',
    examMatters: 'An Evaluate (20 marks, WBS11 Appendix 6) requires fully developed chains of reasoning and a perceptive conclusion proposing a solution or recommendation. Evaluating a loyalty scheme means asking what the business would have sold without it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four stages of one customer becoming loyal into the order they can happen in, from the first purchase to the hardest tie to break:',
      correctOrder: [
        'The product does what it promised, every time',
        'They return without shopping around again',
        'Their history with the business is recognised and rewarded',
        'Leaving would now cost them something they have built up',
      ],
      why: [
        'Nothing else holds a buyer whose product disappoints them, so this is the floor rather than a step',
        'Loyalty is the return itself: until it happens there is nothing to recognise and nothing to reward',
        'A scheme acknowledges a history that already exists; it cannot manufacture one',
        'A balance, a tier or a set-up accumulates only after several returns, which makes it the last tie and the hardest to break',
      ],
      criterion: 'the order one customer meets them in, from the first purchase onwards',
    }),
  };
})();

/* ══ Block 4 — Product and service design (1.3.3 · 2a, 2b) ══════════════════ */

const theDesignMix = (() => {
  const sid = subId('the-design-mix'); // March id, kept
  return {
    id: sid,
    title: 'The Design Mix',
    keyIdea: 'The design mix is the three-way trade-off between what a product does, how it looks and what it costs to make, and moving one of the three always moves another.',
    body: [
      { type: 'paragraph', text: 'The **design mix** is the specification\'s name for the three things being decided whenever a product is designed:' },
      { type: 'bullets', items: [
        '**Function** — what the product has to do, and how well. For Zola\'s bottle: does it keep a drink cold, does it survive being dropped, does it leak in a bag?',
        '**Aesthetics** — how it looks, feels and sounds. The shape, the finish, the weight in the hand, the sound the lid makes.',
        '**Cost/economic manufacture** — whether it can be made at a cost that leaves a margin at the price it will sell for.',
      ] },
      { type: 'paragraph', text: `The three pull against each other, and that is what makes it a **mix** rather than a checklist. A wider lid improves function and costs more to seal. A hand-polished finish improves aesthetics and slows the line. Zola's bottle costs ${money(UNIT_COST)} to make, and every design decision is finally a question about whether the buyer will pay for what it adds.` },
      { type: 'paragraph', text: 'Which of the three leads is a strategic choice, not a design one. A budget product leads on cost and accepts less of the other two; a luxury product leads on aesthetics and can afford to; a piece of safety equipment leads on function and is not permitted to trade it away.' },
    ],
    realExample: { emoji: '✏️', text: 'A pen that writes reliably, feels solid and costs very little to make is a design success in all three. Most products get two of the three and choose which one to give up.' },
    misconception: 'Students treat the three as separate decisions to be listed. They are one decision with three consequences — say what improving one costs in the other two, because that trade-off is the answer.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) requires a brief explanation of cause or effect supported by details. Naming the three elements is knowledge; saying what raising one does to another is the explanation being asked for.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each design decision by the element of the design mix it is mainly serving.',
      groups: [
        { name: 'Function', why: 'What the product has to do, and how reliably it does it', items: ['A seal that survives being dropped', 'A lid wide enough to take ice'] },
        { name: 'Aesthetics', why: 'How the product looks, feels and sounds to the person holding it', items: ['A matt finish in a seasonal colour', 'A weight that feels substantial in the hand'] },
        { name: 'Cost/economic manufacture', why: 'Whether it can be made at a cost that leaves a margin at the selling price', items: ['One body shape across the whole range', 'A steel thickness chosen to cut waste'] },
      ],
    }),
  };
})();

const designingForResourceDepletion = (() => {
  const sid = subId('designing-for-resource-depletion');
  return {
    id: sid,
    title: 'Designing for Resource Depletion',
    keyIdea: 'Concern over resource depletion changes the design mix itself: waste minimisation, re-use and recycling become part of what the product must do, not an afterthought.',
    body: [
      { type: 'paragraph', text: 'The specification asks how the elements of the design mix change to reflect social trends, and names **concern over resource depletion** first — the worry that materials are being used up faster than they are replaced. Three design responses come out of it:' },
      { type: 'flow', steps: [
        { title: 'Waste minimisation', subtitle: 'Design so that less material is used and less is thrown away making it — thinner sections, fewer parts, packaging cut back' },
        { title: 'Re-use', subtitle: 'Design so the product itself is used again rather than replaced. A refillable bottle exists to displace single-use ones' },
        { title: 'Recycling', subtitle: 'Design so the materials can be recovered at the end — one material rather than several bonded together, and parts that come apart' },
      ], result: 'Three design responses to one trend, and each is a change to the design mix', resultType: 'neutral' },
      { type: 'paragraph', text: `Notice where these land in the design mix. Recyclability is a **function** requirement the product did not have before. A recycled finish is an **aesthetic** decision buyers now read as a signal. And all three touch **cost** — sometimes raising it, sometimes lowering it, because using less material is cheaper as well as cleaner.` },
      { type: 'paragraph', text: 'For a business like Zola the trend is the market rather than a constraint on it: the whole product exists because buyers wanted to stop buying single-use bottles.' },
    ],
    realExample: { emoji: '♻️', text: 'A drinks maker that moves from a bottle bonded to a plastic sleeve to one printed directly on the glass has made a recycling decision inside the design, not a change to the label.' },
    misconception: 'Students write that designing for the environment always raises costs. Waste minimisation lowers them by definition — less material bought and less thrown away — and it is re-use and recycling that can cut either way.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a brief chain of reasoning. Start from the trend, name the element of the design mix it changes, and follow it to what the business gains or gives up.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the three design responses to concern over resource depletion:',
      template: [
        'waste ______: use less material and throw less away making it',
        '______: design the product to be used again rather than replaced',
        '______: design so the materials can be recovered at the end of its life',
      ],
      answers: ['minimisation', 're-use', 'recycling'],
      hints: ['making the amount of waste as small as possible', 'using the same product a second time', 'recovering the material to make something else'],
      distractors: ['depletion', 'sourcing'],
    }),
  };
})();

const ethicalSourcing = (() => {
  const sid = subId('social-trends-ethical-sourcing'); // March id, kept
  return {
    id: sid,
    title: 'Ethical Sourcing',
    keyIdea: 'Ethical sourcing is a decision about where materials come from and how the people making them are treated, and it reaches the design mix through cost and through the claim.',
    body: [
      { type: 'paragraph', text: '**Ethical sourcing** is the second social trend the specification names under the design mix. It means choosing suppliers on how they operate as well as on price: the conditions people work in, what they are paid, and what the extraction of the material does to the place it comes from.' },
      { type: 'paragraph', text: 'It reaches the design mix in two directions at once. It usually raises the **cost** of the materials, because the cheapest supplier is rarely the most scrupulous one. And it changes what the business may honestly say about the product, which is worth something in **promotion** and worth a great deal if the claim later turns out to be false.' },
      { type: 'paragraph', text: 'The evaluation is about what the business is buying with the extra cost. A buyer who would have paid anyway is a cost with no return. A buyer who chose this product because of it is a sale that would not have happened. And the protection against a supply scandal is worth something whether or not any buyer ever notices.' },
    ],
    realExample: { emoji: '🌍', text: 'A clothing firm that publishes the list of factories it uses has made a sourcing decision it cannot quietly reverse. That is the cost of the claim, and also what makes the claim worth anything.' },
    misconception: 'Students write that ethical sourcing is simply more expensive and leave it there. The question is what the extra cost buys — a price buyers will pay, a risk avoided, a claim that can be made — and an answer that never gets to that has only stated the cost.',
    examMatters: 'A Discuss (8 marks, WBS11 Appendix 6) requires logical chains of reasoning in context with a brief assessment showing awareness of competing arguments. The competing arguments here are the certain cost now against the uncertain return later.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each consequence of sourcing ethically to what it does for the business:',
      pairs: [
        { left: 'Suppliers audited on conditions and pay', right: 'A higher material cost', why: 'The cheapest supplier is rarely the most scrupulous, so choosing on more than price costs more' },
        { left: 'A claim the business can make honestly', right: 'Something to promote', why: 'It is only worth promoting while it is true, which is exactly why it costs something to be able to say it' },
        { left: 'A supply chain that has been looked at', right: 'A risk that does not arrive', why: 'The value shows up as the scandal that never happens, which is real and invisible at the same time' },
      ],
      distractors: ['A lower unit cost'],
    }),
  };
})();

/* ══ Block 5 — Promotion and branding (1.3.3 · 3a-3e) ═══════════════════════ */
/*
 * 3a "Types of promotion." and 3b "Types of branding." carry NO bullets in the specification, so no
 * taxonomy is prescribed and the textbook ones return zero occurrences — above/below the line, ATL,
 * BTL, public relations, sales promotion, personal selling, direct marketing, individual brand,
 * family brand, corporate brand, own brand. Both leaves are taught through the vehicles and
 * distinctions the specification DOES name (3d: USPs/differentiation, advertising, sponsorship,
 * social media; 3e: viral marketing, social media, emotional branding), with the textbook labels
 * named once as an aside and never assessed. This is packet 16's "barriers to entry" treatment.
 */

const typesOfPromotion = (() => {
  const sid = subId('types-of-promotion'); // March id, kept
  return {
    id: sid,
    title: 'Types of Promotion',
    keyIdea: 'Promotion is how a business tells buyers the product exists and gives them a reason to choose it, and the types differ in reach, cost and whether the effect can be measured.',
    body: [
      { type: 'paragraph', text: '**Promotion** is the element of the mix that carries the message. The specification asks for the types without prescribing a list, so the useful way to hold them is by what each one is good at:' },
      { type: 'bullets', items: [
        '**Advertising** — a paid message placed where an audience will meet it. Wide reach; expensive, and hard to attribute a sale to.',
        '**Sponsorship** — paying to be associated with an event or a team. Buys the association rather than the argument.',
        '**Social media** — the business\'s own channels. Cheap to run, two-way, and the audience is earned rather than bought.',
        '**Price promotions** — a discount or a multi-buy. Moves volume immediately, and teaches buyers to wait for the next one.',
        '**Direct contact with buyers** — a salesperson, an email to a named customer. Expensive per person, and the only type that can answer a question.',
      ] },
      { type: 'paragraph', text: 'The choice between them is about reach against precision, and about whether the effect can be **measured**. A discount code can be counted exactly; a sponsorship cannot. That does not make it worse — it makes it harder to defend.' },
      { type: 'paragraph', text: 'You may meet these split into two groups labelled "above the line" and "below the line" in other textbooks. Those labels are not in this specification, and nothing in this course requires them.' },
    ],
    realExample: { emoji: '📣', text: 'A running-shoe brand sponsors a marathon, advertises around the broadcast, posts the footage on its own channels and discounts last season\'s stock. Four types, one campaign.' },
    misconception: 'Students rank the types and write that advertising is the most effective. Each buys something different — reach, association, conversation, volume — and the right one depends on what the business needs.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) requires a brief explanation of cause or effect supported by details or examples. Name the type, say who it reaches, and follow that to the effect on sales or on the brand.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each activity by what the business is mainly buying with it.',
      groups: [
        { name: 'Reach', why: 'Paid placement in front of a large audience, where the cost per person is low and the attribution is weak', items: ['A paid message around a televised event', 'A poster campaign across a city'] },
        { name: 'Association', why: 'Paying to be linked with something the audience already values, which buys the association rather than an argument', items: ['Backing a regional running series', 'Supplying the bottles at a stadium'] },
        { name: 'Immediate volume', why: 'A change to the price for a period, which moves units now and trains buyers to expect the next one', items: ['A multi-buy for the summer', 'An introductory discount code'] },
      ],
    }),
  };
})();

const typesOfBranding = (() => {
  const sid = subId('types-of-branding');
  return {
    id: sid,
    title: 'Types of Branding',
    keyIdea: 'Branding decisions are about what the brand sits on and whose name it is, and each choice trades the reach of a shared name against the risk of sharing it.',
    body: [
      { type: 'paragraph', text: 'A **brand** is the expectation a buyer already has before the product is picked up. The specification asks for the types of branding without listing them, and the two questions that actually separate them are these:' },
      { type: 'subheading', text: 'What does the brand sit on?' },
      { type: 'paragraph', text: 'It can sit on **one product**, so that the product succeeds or fails on its own and a problem with it touches nothing else. Or it can sit on **the whole range**, so that a new product arrives already trusted — and so that one bad product damages every other. The second is cheaper to build and more dangerous to hold.' },
      { type: 'subheading', text: 'Whose name is it?' },
      { type: 'paragraph', text: 'It can be the **maker\'s** name, which is what Zola sells under. Or it can be the **seller\'s** name, where a retailer puts its own name on goods made by someone else — usually at a lower price, because the buyer is not paying for the maker\'s brand. A manufacturer sometimes does both at once: its own brand on the shelf, and an unbranded version made for the retailer beside it.' },
      { type: 'paragraph', text: 'Other textbooks label these individual, family, corporate and own-label branding. Those labels are not in this specification; the decisions behind them are what matters and what this course asks about.' },
    ],
    realExample: { emoji: '🥫', text: 'A food manufacturer sells soup under its own name and makes a near-identical soup for a supermarket to sell under the supermarket\'s name. The second earns less per tin and fills the factory.' },
    misconception: 'Students write that a single brand across everything is always stronger. It is stronger and more exposed: the shared name carries a new product for free, and carries a failure just as efficiently.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. A brand is the expectation attached to a name — not the logo, and not the product itself.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each branding decision to what the business is accepting by making it:',
      pairs: [
        { left: 'The brand sits on one product only', right: 'A failure touches nothing else', why: 'The product stands alone, so it has to be built from nothing and cannot damage anything beside it' },
        { left: 'The brand sits on the whole range', right: 'A new product arrives already trusted', why: 'The reputation transfers, which is cheap — and transfers in the other direction just as easily' },
        { left: 'The maker\'s name is on the product', right: 'The maker keeps what the name is worth', why: 'The buyer is paying for the maker\'s reputation, so the maker captures the premium it earns' },
        { left: 'The seller\'s name is on the product', right: 'A lower price and a filled factory', why: 'The buyer is not paying for the maker\'s brand, so the price is lower and the maker is selling volume rather than name' },
      ],
    }),
  };
})();

const theBenefitsOfStrongBranding = (() => {
  const sid = subId('benefits-of-strong-branding');
  return {
    id: sid,
    title: 'The Benefits of Strong Branding',
    keyIdea: `A strong brand is worth having because it makes demand less sensitive to price, and the ability to charge more and the value added are both consequences of that one change.`,
    body: [
      { type: 'paragraph', text: 'The specification names three benefits of strong branding. They are usually listed as three separate things; they are better understood as one change with three consequences. Zola\'s own figures show it.' },
      { type: 'paragraph', text: `Before the brand was built, Zola's sales fell away steeply when it raised its price. After, they fall more gently. Both lines pass through ${money(TODAY_P)} and ${units(TODAY_Q)} bottles, so the brand has not changed what Zola sells today — it has changed what a price rise costs.` },
      { type: 'bullets', items: [
        `**Reduced price elasticity of demand.** At ${money(TODAY_P)}, price elasticity of demand was ${el(pedU(TODAY_P))}; with the brand it is ${el(pedB(TODAY_P))}. Demand has become less sensitive to price, which is what the whole benefit rests on.`,
        `**The ability to charge premium prices.** Raise the price to ${money(24)}. Without the brand Zola would sell ${units(qU(24))} bottles and make ${money(profitU(24))}; with it, ${units(qB(24))} bottles and ${money(profitB(24))}. The price rise **loses** money without the brand and **makes** money with it.`,
        `**Added value.** At ${money(TODAY_P)} a bottle that costs ${money(UNIT_COST)} to make, the value added on each one is ${money(addedValue(TODAY_P))}. Holding a higher price without losing the buyers is how a brand raises it.`,
      ] },
      { type: 'paragraph', text: `That is why building a brand is an objective in its own right: it moves the profit-maximising price from ${money(U_PROFIT_PEAK)} to ${money(B_PROFIT_PEAK)}.` },
    ],
    realExample: { emoji: '👟', text: 'Two pairs of trainers of similar construction sell at very different prices in the same shop. The buyers of the dearer pair are not unaware of the cheaper one; the brand is what stops the comparison being decisive.' },
    misconception: 'Students write that a strong brand means selling more. It need not: it may sell the same number today and lose fewer of them when the price goes up. That is the benefit.',
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) requires a calculation based on given data, with workings given. Added value is the selling price less what was bought in to make it, and the working is that subtraction.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete what the brand changes for Zola, using the two lines through ${money(TODAY_P)}:`,
      template: [
        `price elasticity of demand at ${money(TODAY_P)}, before the brand: ______`,
        `price elasticity of demand at ${money(TODAY_P)}, after it: ______`,
        `so the profit-maximising price moves from ${money(U_PROFIT_PEAK)} to ______`,
      ],
      answers: [el(pedU(TODAY_P)), el(pedB(TODAY_P)), money(B_PROFIT_PEAK)],
      hints: ['the steeper fall in sales, so the larger figure in size', 'the gentler fall, so the smaller figure in size', 'the price at which the branded line makes the most profit'],
      distractors: [el(pedU(24)), money(U_REV_PEAK)],
    }),
  };
})();

const uspsAndDifferentiation = (() => {
  const sid = subId('usps-and-differentiation');
  return {
    id: sid,
    title: 'USPs and Differentiation',
    keyIdea: 'A unique selling point is the one thing a buyer cannot get from the alternatives, and it is the foundation of a brand because it is the part a rival cannot simply copy.',
    body: [
      { type: 'paragraph', text: 'A **unique selling point (USP)** is something about a product that competing products do not offer. **Differentiation** is the wider word: everything that makes buyers see this product as different from the others, whether or not any single feature is unique.' },
      { type: 'paragraph', text: 'The specification puts USPs and differentiation first among the ways to build a brand, and the order is not arbitrary. Advertising, sponsorship and social media all carry a message; a USP is what there is to say. A business with nothing to differentiate it is paying to broadcast a claim its rivals could make word for word.' },
      { type: 'bullets', items: [
        'It can be **the product** — something it does that the others do not.',
        'It can be **the service** — a guarantee, a repair, a delivery promise nobody else makes.',
        'It can be **who the business is** — where it makes things, how it treats suppliers, who owns it.',
      ] },
      { type: 'paragraph', text: `The hard part is that a USP has a life. A feature that is unique is copied; what is left afterwards is whether buyers still associate it with the business that had it first. That association is the brand, and it is why the ways to build a brand are taught together rather than as alternatives.` },
    ],
    realExample: { emoji: '🔑', text: 'A luggage maker whose lifetime guarantee is genuinely lifetime has a selling point that rivals can copy only by taking on the same cost. That is what makes it hold.' },
    misconception: 'Students name a low price as a USP. A price is the easiest thing in the market to match, and matching it costs a rival nothing but margin. A USP has to be something copying is expensive.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. A unique selling point is a feature competing products do not offer — the word doing the work is "unique", and a definition without it defines a feature.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each claim by whether it could work as a unique selling point.',
      groups: [
        { name: 'Could be a USP', why: 'Copying it would cost a rival something real, so it survives being noticed', items: ['A lifetime guarantee honoured without a receipt', 'A body made from steel recovered in the region', 'A repair service that returns the same bottle'] },
        { name: 'Could not', why: 'Any rival can match it by the end of the week, and matching it costs them nothing but margin', items: ['The lowest price on the shelf', 'A wide range of colours'] },
      ],
    }),
  };
})();

const advertisingSponsorshipSocialMedia = (() => {
  const sid = subId('advertising-sponsorship-social-media');
  return {
    id: sid,
    title: 'Advertising, Sponsorship and Social Media',
    keyIdea: 'The three vehicles build a brand differently: advertising states the claim, sponsorship borrows an association, and social media lets buyers carry the message.',
    body: [
      { type: 'paragraph', text: 'After USPs, the specification names three ways of building a brand. Each does a different job, and a brand is usually built with all three.' },
      { type: 'flow', steps: [
        { title: 'Advertising', subtitle: 'The business states its own claim, in its own words, to an audience it has paid to reach. Complete control of the message; the audience knows it was paid for' },
        { title: 'Sponsorship', subtitle: 'The business pays to stand beside something the audience already values. No claim is made, so nothing has to be believed — the association does the work' },
        { title: 'Social media', subtitle: 'The business runs its own channel and buyers pass the message on. The cheapest reach available and the only one it does not fully control' },
      ], result: 'Stated, borrowed, or passed on — three routes to the same expectation', resultType: 'neutral' },
      { type: 'paragraph', text: 'The trade-off running through all three is **control against credibility**. The more completely a business controls a message, the more obviously it is the business speaking, and the less weight a buyer gives it. A recommendation from another buyer is believed precisely because the business could not write it.' },
      { type: 'paragraph', text: `For Zola the three are sequenced rather than chosen between: sponsorship of a regional running series puts the bottle where buyers already are, advertising states what it does, and the channel carries what buyers say about it afterwards.` },
    ],
    realExample: { emoji: '🏃', text: 'A sportswear brand sponsors an athlete, advertises the shoe they wear, and reposts what runners say about it. The sponsorship makes the advertisement plausible and the reposts make it credible.' },
    misconception: 'Students treat social media as free. The channel costs nothing to open and a great deal to run — the content, the time, the replies — and an abandoned channel is worse than none, because it is evidence.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a brief chain of reasoning without evaluation. Name the vehicle, say what it does to what buyers expect of the brand, and follow that to the effect on sales or on price.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these three ways of building a brand into order of how much control the business has over the message, from most to least:',
      correctOrder: ['Advertising', 'Sponsorship', 'What buyers post about the brand'],
      why: [
        'The business writes every word and chooses where it appears, which is total control',
        'The business chooses what to stand beside but not what happens there or what is said about it',
        'The business controls nothing at all, which is exactly why a buyer believes it',
      ],
      criterion: 'how much of the message the business itself decides',
    }),
  };
})();

const changesToReflectSocialTrends = (() => {
  const sid = subId('viral-marketing'); // March id, kept
  return {
    id: sid,
    title: 'Changes to Reflect Social Trends',
    keyIdea: 'Viral marketing, social media and emotional branding all move the message from something the business states to something the buyer carries or feels.',
    body: [
      { type: 'paragraph', text: 'The specification names three ways branding and promotion have changed to reflect social trends. They are related: each moves the work away from the business asserting something.' },
      { type: 'bullets', items: [
        '**Viral marketing** — content made to be passed on, so the reach costs nothing once the content exists. Unreliable by nature: a business can make something worth sharing and cannot make it spread.',
        '**Social media** — the shift from buying an audience to building one: continuous rather than a campaign, and public when it goes wrong.',
        '**Emotional branding** — building the brand on how the product makes a buyer feel, or on what buying it says about them, rather than on what it does.',
      ] },
      { type: 'paragraph', text: '**Emotional branding** is the deepest of the three. A product sold on function competes on function, and can be beaten by a better one. A product a buyer identifies with is not being compared on the same terms at all — which is the reduced sensitivity to price the last subsection measured.' },
      { type: 'paragraph', text: 'The risk is symmetrical: a brand built on what buyers feel is damaged by anything that makes them feel differently, and that need not be about the product.' },
    ],
    realExample: { emoji: '📱', text: 'A campaign built around a short clip people sent to each other reached an audience the business could not have bought. The clip was deliberate; the sending was not.' },
    misconception: 'Students write that a business can "make a campaign go viral". It can make something worth sharing. Whether it spreads is decided by the people who see it, which is why viral reach is planned for as a possibility and never as a budget line.',
    examMatters: 'An Evaluate (20 marks, WBS11 Appendix 6) requires a full awareness of the validity and significance of competing factors, leading to a conclusion proposing a recommendation. A promotion strategy resting on reach the business cannot control is a judgement about risk, not about cost.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the three changes the specification names under branding and promotion:',
      template: [
        '______ marketing: content made to be passed on by the people who see it',
        '______ media: building an audience rather than buying one, continuously and in public',
        '______ branding: built on how the product makes the buyer feel, not on what it does',
      ],
      answers: ['viral', 'social', 'emotional'],
      hints: ['it spreads from person to person the way an infection does', 'the channels buyers already talk to each other on', 'about feeling rather than function'],
      distractors: ['premium', 'direct'],
    }),
  };
})();

/* ══ Block 6 — Pricing strategies (1.3.3 · 4a, 4b, 4c) ══════════════════════ */

const costPlusPricing = (() => {
  const sid = subId('cost-plus-pricing');
  return {
    id: sid,
    title: 'Cost Plus Pricing',
    keyIdea: 'Cost plus sets the price by adding a mark-up to what the product costs to make, which guarantees a margin on every sale and takes no account of what buyers would have paid.',
    body: [
      { type: 'paragraph', text: '**Cost plus** pricing starts from the unit cost and adds a percentage. The specification calls it "mark-up on unit cost", and the arithmetic is one line: price = unit cost × (1 + mark-up).' },
      { type: 'paragraph', text: `Zola's bottle costs ${money(UNIT_COST)} to make. Three mark-ups give three prices:` },
      { type: 'bullets', items: [
        `**${MARKUPS[0]}%**: ${money(UNIT_COST)} × 1.${MARKUPS[0]} = **${money(costPlus(MARKUPS[0]))}**`,
        `**${MARKUPS[1]}%**: ${money(UNIT_COST)} × ${1 + MARKUPS[1] / 100} = **${money(costPlus(MARKUPS[1]))}**`,
        `**${MARKUPS[2]}%**: ${money(UNIT_COST)} × ${1 + MARKUPS[2] / 100} = **${money(costPlus(MARKUPS[2]))}**`,
      ] },
      { type: 'paragraph', text: `Those are the same three prices block 1 put beside Zola's sales, which makes the strength and the weakness visible at once. The strength is that every one of them covers the cost with a known margin, and it can be worked out for a range of hundreds of products without researching any of them.` },
      { type: 'paragraph', text: `The weakness is that nothing in the arithmetic looks at the buyer. The ${MARKUPS[2]}% mark-up gives ${money(costPlus(MARKUPS[2]))}, which happens to be where Zola's profit is highest — but the method did not know that, and a mark-up of ${MARKUPS[0]}% would have given ${money(costPlus(MARKUPS[0]))} with the same confidence. Cost plus can only be as good as the mark-up it is handed.` },
    ],
    realExample: { emoji: '🧾', text: 'A builders\' merchant with thousands of lines prices nearly all of them on a standard mark-up. Researching demand for every washer and bracket would cost more than the pricing could ever be worth.' },
    misconception: 'Students write that cost plus guarantees a profit. It guarantees a margin on each sale made — if the price it produces is above what buyers will pay, the sales do not happen and the margin is on nothing.',
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) requires a calculation based on given data, and says workings should be given. For cost plus, show the mark-up applied to the unit cost as well as the price it produces.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Apply cost plus to Zola's unit cost of ${money(UNIT_COST)}:`,
      template: [
        `a mark-up of ${MARKUPS[0]}% gives a price of ______`,
        `a mark-up of ${MARKUPS[1]}% gives a price of ______`,
        `a mark-up of ${MARKUPS[2]}% gives a price of ______`,
      ],
      answers: [money(costPlus(MARKUPS[0])), money(costPlus(MARKUPS[1])), money(costPlus(MARKUPS[2]))],
      hints: ['half as much again as the cost', 'double the cost', 'two and a half times the cost'],
      distractors: [money(UNIT_COST), money(24)],
    }),
  };
})();

const skimmingAndPenetration = (() => {
  const sid = subId('skimming-and-penetration');
  return {
    id: sid,
    title: 'Skimming and Penetration',
    keyIdea: 'Skimming launches high and comes down; penetration launches low and goes up. They are opposite answers to the same question about what a launch is for.',
    body: [
      { type: 'paragraph', text: 'Two of the pricing strategies the specification names are about **launching**, and they are mirror images.' },
      { type: 'flow', steps: [
        { title: 'Price skimming', subtitle: `Launch high — say ${money(24)} — and take the buyers who will pay most. Lower it in steps as they run out` },
        { title: 'What it needs', subtitle: 'Something buyers cannot get elsewhere yet, and a group who want it early enough to pay for being first' },
        { title: 'Penetration pricing', subtitle: `Launch low — say ${money(12)} — to win share quickly, then raise the price once buyers are established` },
        { title: 'What it needs', subtitle: 'A market where share is worth having early, and buyers who will stay when the price goes up' },
      ], result: 'High then down, or low then up', resultType: 'neutral' },
      { type: 'paragraph', text: `The choice follows from what the launch is trying to buy. Skimming buys **margin** while the product is unmatched: it recovers development spending fastest and signals that the product is worth something. Penetration buys **share**: at ${money(12)} Zola would hold ${share(shareU(12))} of its market against ${share(shareU(TODAY_P))} at ${money(TODAY_P)}.` },
      { type: 'paragraph', text: 'Each has a characteristic failure. Skimming invites rivals in, because a high price is an advertisement for the opportunity. Penetration is hard to reverse: buyers recruited by a low price are the ones most likely to leave when it rises.' },
    ],
    realExample: { emoji: '📺', text: 'A new television technology launches at a price only enthusiasts pay and is a fraction of it three years later. The early buyers were not overcharged; they bought being early, which is what they were paying for.' },
    misconception: 'Students write that penetration pricing is for new businesses and skimming for large ones. Both are launch strategies for a new product, and the same business uses each on different products depending on whether it has something rivals cannot match.',
    examMatters: 'A Discuss (8 marks, WBS11 Appendix 6) requires logical chains of reasoning in context with a brief assessment showing awareness of competing arguments. Skimming against penetration is that assessment in its clearest form.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each condition by the launch strategy it points towards.',
      groups: [
        { name: 'Price skimming', why: 'Launch high and come down, which needs buyers who will pay for being early and a product rivals cannot match yet', items: ['A feature no rival can offer yet', 'Buyers who want it before anyone else', 'Heavy development spending to recover'] },
        { name: 'Penetration pricing', why: 'Launch low and raise later, which needs a market where early share is worth buying', items: ['A market where buyers rarely switch once settled', 'A rival about to launch something similar', 'A unit cost that falls sharply with volume'] },
      ],
    }),
  };
})();

const predatoryAndCompetitivePricing = (() => {
  const sid = subId('predatory-and-competitive-pricing');
  return {
    id: sid,
    title: 'Predatory and Competitive Pricing',
    keyIdea: 'Competitive pricing matches the market and accepts it; predatory pricing prices below cost to remove a rival, which is a different act with a different risk.',
    body: [
      { type: 'paragraph', text: 'Two more of the named strategies are about **rivals** rather than buyers, and the distinction between them is sharper than it looks.' },
      { type: 'paragraph', text: '**Competitive pricing** sets the price at or near what everyone else charges. It is what a business does when nothing distinguishes its product enough to hold a gap — the price is taken from the market rather than set. It is safe, it requires no research, and it hands the initiative to whoever moves first.' },
      { type: 'paragraph', text: `**Predatory pricing** sets the price **below cost**, deliberately, to make the market unprofitable for a rival until the rival leaves. The price is then raised. It is not a low price; it is a loss taken on purpose, which is why the business doing it has to be able to afford the loss for longer than the target can.` },
      { type: 'paragraph', text: 'Two things follow. The strategy only pays if the rival actually leaves and stays out — otherwise the losses were spent for nothing. And it is restricted by competition law in many countries, because the buyer\'s gain is temporary and the loss of a competitor is not.' },
    ],
    realExample: { emoji: '⚖️', text: 'A large retailer that prices one line below cost where a small local rival has opened, and at the usual price everywhere else, is showing the pattern that distinguishes predatory pricing from a sale.' },
    misconception: 'Students call any very low price predatory. The test is whether the price is below cost and aimed at removing a rival. A low price from a business with genuinely lower costs is competition working, not predation.',
    examMatters: 'An Explain (4 marks, WBS11 Appendix 6) requires a brief explanation of cause or effect supported by details. The detail that separates these two is the relationship between the price and the cost.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each pricing decision to what it tells you about the business making it:',
      pairs: [
        { left: 'The price is set at what rivals charge', right: 'Competitive pricing', why: 'Nothing distinguishes the product enough to hold a gap, so the price is taken from the market rather than set' },
        { left: 'The price is set below the cost of making it', right: 'Predatory pricing', why: 'A loss taken deliberately, which only makes sense if it removes somebody and the price can then be raised' },
        { left: 'The price is set by adding to the unit cost', right: 'Cost plus pricing', why: 'The price looks at the cost and not at the market, which is the method\'s strength and its weakness at once' },
      ],
      distractors: ['Price skimming'],
    }),
  };
})();

const psychologicalPricing = (() => {
  const sid = subId('psychological-pricing');
  return {
    id: sid,
    title: 'Psychological Pricing',
    keyIdea: 'Psychological pricing sets a price to change how large it seems rather than how large it is, which is why a penny can matter more than a dollar.',
    body: [
      { type: 'paragraph', text: `**Psychological pricing** chooses the price for the impression it makes. The familiar version is the price just under a round number: Zola's bottle at ${money(PSYCH_P)} rather than ${money(TODAY_P)}. The difference is one cent, and the first figure the buyer reads is different.` },
      { type: 'paragraph', text: 'It works in both directions, which is the part students miss. A price set **just under** a round number says value. A price set at a **round, high** number says quality — a business that prices at forty dollars rather than thirty-nine ninety-nine is telling the buyer it is not competing on price.' },
      { type: 'paragraph', text: 'The limit is what it can do. The penny changes how the price is read; it does not change what the buyer can afford or whether the product is worth having. It is a finishing decision, applied to a price that some other strategy has already chosen.' },
      { type: 'paragraph', text: `And it must agree with the rest of the mix. ${money(PSYCH_P)} on a bottle promoted as a premium product is a mismatch a buyer reads as a contradiction — which is block 1's point about the mix, arriving in the pricing block.` },
    ],
    realExample: { emoji: '🏷️', text: 'A supermarket shelf of prices ending in 99 sits a few aisles from a delicatessen counter pricing in whole units. Both are psychological pricing; they are saying opposite things on purpose.' },
    misconception: 'Students write that psychological pricing means always ending a price in 99. The strategy is about what the number signals, and a round number on a premium product is the same strategy making the opposite signal.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. Psychological pricing sets the price for how it is perceived — a definition that says only "ending in 99" describes one example of it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what psychological pricing is doing:',
      template: [
        `${money(PSYCH_P)} rather than ${money(TODAY_P)} makes the price seem ______`,
        'a round, high price instead signals ______',
        'either way it changes how the price is ______, not what it buys',
      ],
      answers: ['lower', 'quality', 'read'],
      hints: ['the first digit the buyer sees has changed', 'what a business says when it declines to shave the price', 'perceived rather than paid'],
      distractors: ['higher', 'value'],
    }),
  };
})();

const choosingAStrategyOne = (() => {
  const sid = subId('factors-determining-pricing'); // March id, kept
  return {
    id: sid,
    title: 'Choosing a Strategy: Differentiation, Elasticity and Competition',
    keyIdea: 'The first three factors the specification names all ask the same question from different angles: how free is this business to set its own price?',
    body: [
      { type: 'paragraph', text: 'The specification lists **six** factors that determine the most appropriate pricing strategy. This subsection takes the first three, and the next takes the rest. All six are about the same thing: how much room the business has.' },
      { type: 'bullets', items: [
        '**Number of USPs / amount of differentiation.** The more a product offers that rivals do not, the less a buyer can substitute away, and the more freely the price can be set. A product identical to four others has almost no room at all.',
        `**Price elasticity of demand.** How much quantity moves when the price does. Zola's is ${el(pedU(TODAY_P))} unbranded and ${el(pedB(TODAY_P))} branded — the same product, and the second can hold a price rise that the first cannot.`,
        '**Level of competition in the business environment.** How many rivals there are and how close their products come. Competitive pricing is the honest answer to a crowded market; a business alone in a niche need not take the price it is handed.',
      ] },
      { type: 'paragraph', text: 'Read the three together and they are one question asked three ways: differentiation is *why* buyers might not substitute, elasticity is the *measurement* of whether they do, and the level of competition is *what they could substitute to*. A strong answer on pricing connects them rather than listing them.' },
    ],
    realExample: { emoji: '🔬', text: 'A laboratory instrument with no direct substitute is priced on what it is worth to the buyer. A ream of plain paper is priced on what the shop across the road charges. The difference is the room.' },
    misconception: 'Students list the factors and stop, which answers a question about knowledge and not one about pricing. Say which factor dominates for this business and why the others matter less.',
    examMatters: 'An Analyse (6 marks, WBS11 Appendix 6) requires a brief chain of reasoning, and includes interpretation where it is applied to given data. Take one factor, say what it does to the room the business has, and follow it to the strategy that becomes appropriate.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each of the first three pricing factors to what it tells the business:',
      pairs: [
        { left: 'Number of USPs / amount of differentiation', right: 'Why a buyer might not substitute away', why: 'What the product offers that the alternatives do not is the reason a price gap can be held at all' },
        { left: 'Price elasticity of demand', right: 'Whether buyers actually do substitute, measured', why: 'It turns the question of room into a number, which is what makes a price change predictable' },
        { left: 'Level of competition in the business environment', right: 'What buyers could substitute to', why: 'Room depends on the alternatives that exist, however good this product is in itself' },
      ],
      distractors: ['How many people the business employs'],
    }),
  };
})();

const choosingAStrategyTwo = (() => {
  const sid = subId('choosing-a-strategy-brand-plc-costs');
  return {
    id: sid,
    title: 'Choosing a Strategy: Brand, Life Cycle and Costs',
    keyIdea: 'The remaining three factors are the ones that change over time: a brand is built, a product ages through its life cycle, and costs set the floor no strategy may go under for long.',
    body: [
      { type: 'paragraph', text: 'The other three factors the specification names are the ones that move while the business is watching:' },
      { type: 'bullets', items: [
        `**Strength of brand.** Block 5 measured it: the same bottle at the same price, with price elasticity of demand of ${el(pedU(TODAY_P))} before the brand and ${el(pedB(TODAY_P))} after. A strong brand makes a premium price survivable.`,
        '**Stage in the product life cycle.** Skimming and penetration are launch strategies; competitive pricing belongs to maturity, when rivals have arrived and the product is no longer new; a price cut in decline is part of deciding whether to extend or withdraw.',
        `**Costs and the need to make a profit.** The floor. Zola's ${money(UNIT_COST)} unit cost is what every strategy in this chapter has to clear eventually — predatory pricing is the one that goes under it deliberately, and even that is temporary.`,
      ] },
      { type: 'paragraph', text: 'Two of these connect earlier blocks, which is the point of putting them last. The **brand** factor is why building a brand was worth naming as an objective; the **life cycle** factor is why the life cycle was taught before pricing.' },
      { type: 'paragraph', text: 'The six together answer the question a pricing item actually asks: not "what strategies exist" but "which fits this business, now, with this product".' },
    ],
    realExample: { emoji: '📉', text: 'A games console launched at a price few could justify sells for much less by the end of its life. Nothing about the manufacturing changed that much; the stage in the life cycle did.' },
    misconception: 'Students write that a business should always price above cost. Over the life of a product, yes — but penetration pricing and predatory pricing both accept a period below it on purpose, and the second is defined by it.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires a well contextualised chain of reasoning with balanced, wide-ranging assessment leading to a supported judgement. Choosing a pricing strategy is that question: weigh the factors against each other and say which decides it here.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four pricing decisions into the order a product meets them over its life cycle, from launch onwards:',
      correctOrder: [
        `Launch at ${money(24)} to take the buyers who will pay most`,
        'Lower the price in steps as those buyers run out',
        'Match the market once rivals are established',
        'Cut the price as sales fall, or withdraw the product',
      ],
      why: [
        'Skimming belongs to introduction, when nothing else offers what this does',
        'The price comes down through growth, as the buyers who would pay most are used up',
        'Competitive pricing belongs to maturity, where rivals have arrived and nothing separates the products',
        'In decline the price is part of the decision about extending the life or ending it',
      ],
      criterion: 'the stage of the product life cycle each one belongs to',
    }),
  };
})();

const onlineSalesAndComparisonSites = (() => {
  const sid = subId('online-sales-comparison-sites');
  return {
    id: sid,
    title: 'Online Sales and Price Comparison Sites',
    keyIdea: 'Selling online and comparison sites both make prices easier to compare, which narrows the room every pricing strategy in this chapter depends on.',
    body: [
      { type: 'paragraph', text: 'The specification names two changes in pricing that reflect social trends: **online sales** and **price comparison sites**. They pull in the same direction, and understanding why is worth more than describing either.' },
      { type: 'flow', steps: [
        'A buyer who had to visit shops could compare a few prices at the cost of an afternoon',
        'Selling online puts every seller\'s price within reach of the same buyer in a minute',
        'A comparison site removes even that minute, and sorts the sellers by price',
        'A price that was invisible to most buyers is now the first thing they see',
      ], result: 'The cost of comparing prices has fallen to almost nothing', resultType: 'neutral' },
      { type: 'paragraph', text: `Everything in this chapter follows from that. Price elasticity of demand rises when substitutes are easy to find, so the **room** the six factors describe gets narrower. Competitive pricing becomes closer to automatic. And the value of everything that is **not** price — a USP, a brand, a service — goes up, because it is the only thing a comparison site cannot sort on.` },
      { type: 'paragraph', text: 'There is a second effect worth naming. Prices online can be changed continuously and at no cost, so a business can adjust them far more often than a printed price list ever allowed — and buyers can see the changes.' },
    ],
    realExample: { emoji: '🔎', text: 'An insurance market where most buyers now arrive through a comparison site sees products redesigned so that the headline price can be listed low, with the differences moved into what the cover excludes.' },
    misconception: 'Students write that comparison sites always mean lower prices. They mean prices that are easier to compare, which pushes sellers to differentiate on what the site cannot show — and sometimes to make the product harder to compare instead.',
    examMatters: 'An Evaluate (20 marks, WBS11 Appendix 6) requires fully developed chains of reasoning showing a range of effects, with a perceptive conclusion proposing a solution or recommendation. The range here is what easy comparison does to price, to branding and to product design at once.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each consequence by whether easier price comparison makes it more or less valuable to a business.',
      groups: [
        { name: 'More valuable', why: 'The things a comparison site cannot sort on, which is where a business can still hold a gap', items: ['A unique selling point rivals cannot match', 'A strong brand buyers ask for by name', 'A service that comes with the product'] },
        { name: 'Less valuable', why: 'Advantages that only worked while buyers found comparing prices difficult', items: ['Being the only seller a buyer walks past', 'A price a buyer had no easy way to check'] },
      ],
    }),
  };
})();

/* ══ Block 7 — Distribution (1.3.3 · 5a, 5b) ════════════════════════════════ */
/*
 * The specification's words at :665-668 are "four stage", "three stage" and "two stage", which
 * settles specGap-11's "unsure" and retires the March "zero-level/one-level/two-level". The
 * intensive/selective/exclusive taxonomy the March quiz tested (quiz-01) is zero occurrences — the
 * single hit for "intensive" is capital-intensive PRODUCTION at :983 — and does not appear here.
 */

const fourStageChannels = (() => {
  const sid = subId('distribution-channels'); // March id, kept
  return {
    id: sid,
    title: 'What a Channel Is, and the Four Stage Channel',
    keyIdea: 'A distribution channel is the route a product takes from its maker to its user, and every stage on that route takes a share of the price the user finally pays.',
    body: [
      { type: 'paragraph', text: '**Distribution** is the "place" element of the marketing mix: how the product physically reaches the person who will use it. A **distribution channel** is the route it takes, and the specification names three by the number of stages on them.' },
      { type: 'paragraph', text: 'The longest is the **four stage** channel: **producer to wholesaler to retailer to consumer**. Each stage buys from the one before and sells to the one after at a higher price, so the price grows along the route.' },
      { type: 'flow', steps: [
        { title: `Zola makes the bottle for ${money(UNIT_COST)}`, subtitle: `and sells it to a wholesaler for ${money(chainOf(CHANNELS[0])[0])}` },
        { title: `The wholesaler sells it on at ${money(chainOf(CHANNELS[0])[1])}`, subtitle: 'for breaking bulk, holding stock and supplying many small retailers' },
        { title: `The retailer sells it at ${money(shelfOf(CHANNELS[0]))}`, subtitle: 'for the shelf, the location and the sale itself' },
      ], result: `The consumer pays ${money(shelfOf(CHANNELS[0]))}, and Zola keeps ${money(zolaKeeps(CHANNELS[0]))} of it`, resultType: 'neutral' },
      { type: 'paragraph', text: `Zola keeps ${money(zolaKeeps(CHANNELS[0]))} a bottle — the least of any channel. What it buys with the rest is **reach**: a wholesaler supplies hundreds of small retailers Zola could never sell to one at a time, and it does the holding of stock and the chasing of payment as well.` },
    ],
    realExample: { emoji: '📦', text: 'A confectionery maker reaches thousands of corner shops through wholesalers. Selling to each shop directly would cost more in order-taking and delivery than the shops are worth.' },
    misconception: 'Students describe the intermediaries as adding cost for nothing. They are paid for work the producer would otherwise do itself — holding stock, breaking bulk, reaching small buyers — and the question is whether they do it more cheaply than the producer could.',
    examMatters: 'A Define (2 marks, WBS11 Appendix 6) requires you to define the term. A distribution channel is the route a product takes from producer to consumer — the definition is the route, not a list of the three types.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four stage channel into the order the specification names it, from the maker to the user:',
      correctOrder: ['Producer', 'Wholesaler', 'Retailer', 'Consumer'],
      why: [
        'The business that makes the product and sells it on in bulk',
        'Buys in bulk and breaks it down, supplying many small retailers',
        'Holds the stock a consumer can actually walk up to',
        'The person who uses the product, and who pays the price every earlier stage has added to',
      ],
      criterion: 'the order the product physically moves in',
    }),
  };
})();

const threeAndTwoStageChannels = (() => {
  const sid = subId('three-and-two-stage-channels');
  return {
    id: sid,
    title: 'Three Stage and Two Stage Channels',
    keyIdea: 'Removing a stage gives the producer more of the price and more of the work, which is the trade every shorter channel makes.',
    body: [
      { type: 'paragraph', text: 'The other two channels the specification names are the four stage one with stages taken out.' },
      { type: 'paragraph', text: `The **three stage** channel is **producer to retailer to consumer**. Zola sells to the retailer at ${money(chainOf(CHANNELS[1])[0])}, the retailer sells at ${money(shelfOf(CHANNELS[1]))}, and Zola keeps ${money(zolaKeeps(CHANNELS[1]))} — double what the four stage channel left it. In exchange Zola deals with each retailer itself.` },
      { type: 'paragraph', text: `The **two stage** channel is **producer to consumer**: Zola sells direct, at ${money(shelfOf(CHANNELS[2]))}, and keeps ${money(zolaKeeps(CHANNELS[2]))}. Nobody else takes a share, and nobody else does any of the work either — the site, the payments, the delivery and the returns are all Zola's.` },
      { type: 'paragraph', text: `Set the three side by side and one thing stands out. The four stage and three stage channels both put the bottle in front of the consumer at **${money(shelfOf(CHANNELS[1]))}** — the same shelf price. What differs is how much of it reaches Zola: ${money(zolaKeeps(CHANNELS[0]))} against ${money(zolaKeeps(CHANNELS[1]))}. The channel decision is rarely about what the consumer pays; it is about who does the work and who keeps the margin.` },
    ],
    realExample: { emoji: '🏭', text: 'A furniture maker that sells through showrooms and also runs its own website earns very different amounts on the same sofa, and does very different amounts of work for each sale.' },
    misconception: 'Students write that a shorter channel means a lower price for the consumer. It means more of the price reaches the producer. Whether any of that is passed on is a separate decision, and often it is not.',
    examMatters: 'A Calculate (4 marks, WBS11 Appendix 6) requires a calculation based on given data with workings given. Applying a mark-up at each stage in turn is that working, and the answer is the price at the end of the chain.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Work the three stage channel through, from Zola's unit cost of ${money(UNIT_COST)}:`,
      template: [
        `Zola sells to the retailer at a ${CHANNELS[1].steps[0].markup}% mark-up: ______`,
        `the retailer adds ${CHANNELS[1].steps[1].markup}%, so the consumer pays ______`,
        'and Zola keeps, on each bottle: ______',
      ],
      answers: [money(chainOf(CHANNELS[1])[0]), money(shelfOf(CHANNELS[1])), money(zolaKeeps(CHANNELS[1]))],
      hints: ['half as much again as the unit cost', `the retailer's mark-up applied to what it paid`, `what Zola receives, less the ${money(UNIT_COST)} it cost to make`],
      distractors: [money(shelfOf(CHANNELS[2])), money(zolaKeeps(CHANNELS[0]))],
    }),
  };
})();

const matchingTheChannelToTheProduct = (() => {
  const sid = subId('matching-channel-to-product');
  return {
    id: sid,
    title: 'Matching the Channel to the Product',
    keyIdea: 'The right channel follows from what the product needs at the point of sale and how many buyers there are to reach, which is why a business often runs more than one.',
    body: [
      { type: 'paragraph', text: 'No channel is best. Which one fits depends on three things about the product and its buyers:' },
      { type: 'bullets', items: [
        '**How many buyers, and how spread out.** A product bought by everyone needs the reach the longer channels give. A product bought by a few hundred businesses does not.',
        '**What has to happen at the point of sale.** A product that needs explaining, fitting or demonstrating cannot be left to a shelf. One that sells itself can.',
        '**What the margin will carry.** A long channel needs enough margin to pay every stage. A product with a thin margin cannot afford three sets of hands.',
      ] },
      { type: 'paragraph', text: `This is why businesses run several channels at once, and why the decision is properly a mix decision. Zola sells direct at ${money(shelfOf(CHANNELS[2]))} to buyers who come to it, and through retailers at ${money(shelfOf(CHANNELS[1]))} to buyers who would never have found it — and the two prices have to be close enough that neither insults the other.` },
      { type: 'paragraph', text: 'That is the risk of multiple channels: a producer selling direct is competing with the retailers it also supplies. Price the direct channel too low and the retailers stop stocking it, which costs more reach than the direct sales were worth.' },
    ],
    realExample: { emoji: '👟', text: 'A shoe brand that opens its own online store while still supplying sports shops has to price carefully in both. The shops can see the website, and they have other brands to stock.' },
    misconception: 'Students write that selling direct is always better because the producer keeps more. It keeps more per sale and makes fewer sales, and it takes on work it may be worse at than the retailer was.',
    examMatters: 'An Assess (10 marks, WBS11 Appendix 6) requires a well contextualised chain of reasoning, balanced and wide ranging, leading to a supported judgement. A channel decision is margin against reach, and the judgement says which matters more for this product.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each product by the channel it points towards.',
      groups: [
        { name: 'A longer channel', why: 'Many buyers, spread widely, buying something that needs no explanation at the point of sale', items: ['A snack bought on impulse anywhere', 'A household battery', 'A bottled drink sold nationally'] },
        { name: 'A shorter channel', why: 'Few buyers, or a sale that needs the producer present, or a margin that will not pay three sets of hands', items: ['A machine that must be installed and configured', 'A product sold to a few hundred businesses'] },
      ],
    }),
  };
})();

const changesInDistributionMethods = (() => {
  const sid = subId('changes-in-distribution'); // March id, kept
  return {
    id: sid,
    title: 'Changes in Distribution Methods',
    keyIdea: 'Distribution has changed by making short channels possible at scale, which lets a producer reach buyers directly without the retail network it once needed.',
    body: [
      { type: 'paragraph', text: 'The specification\'s last requirement in this topic is **changes in distribution methods**. The change that matters is that the two stage channel — producer straight to consumer — became practical for products and businesses it was never available to before.' },
      { type: 'bullets', items: [
        '**Selling online.** A producer can now reach buyers anywhere without a shop, which is what made the short channel possible at scale.',
        '**Delivery instead of collection.** Once someone else will carry the product to the door, a producer does not need a network of places for buyers to walk into.',
        '**Selling access rather than the object.** Some products are now supplied as an ongoing service — a subscription, a stream — so the distribution question becomes one of access.',
        '**Several channels at once.** Most businesses now sell through more than one route and have to keep them from undercutting each other.',
      ] },
      { type: 'paragraph', text: 'What has *not* happened is the disappearance of the longer channels. Retailers and wholesalers still do work the producer would otherwise pay for, and for a low-value product bought casually they do it more cheaply. The change widened the choice rather than settling it.' },
      { type: 'paragraph', text: 'A short channel moves work as well as margin: a producer selling direct takes on the stock, the payments, the delivery and the returns.' },
    ],
    realExample: { emoji: '🚚', text: 'A mattress maker selling directly to buyers online took on warehousing, delivery and returns that furniture shops had handled for a century. The margin came with the work attached.' },
    misconception: 'Students write that online selling has ended the need for retailers. Buying a chocolate bar through a producer\'s website would cost more in delivery than the bar — the longer channel still wins wherever the value is low and the buying is casual.',
    examMatters: 'A Discuss (8 marks, WBS11 Appendix 6) requires logical chains of reasoning in context showing causes and effects, with a brief assessment showing awareness of competing arguments. The competing argument here is the work that moves with the margin.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in distribution to what it allowed a producer to do:',
      pairs: [
        { left: 'Selling online', right: 'Reach buyers without a shop', why: 'Removing the need for a physical place is what made the two stage channel workable at any scale' },
        { left: 'Delivery to the buyer', right: 'Stop needing places for buyers to walk into', why: 'Once the product travels to the buyer, the network of locations a retailer provided is no longer the only route' },
        { left: 'Supplying access rather than the object', right: 'Distribute without shipping anything', why: 'A subscription or a stream is supplied continuously, so the distribution question stops being about moving a thing' },
      ],
      distractors: ['Remove the need to hold stock'],
    }),
  };
})();

/* ══ Assembly ══════════════════════════════════════════════════════════════ */

const BLOCKS = [
  {
    title: B1,
    sections: [whatAMarketingObjectiveIs, increasingMarketShare, increasingRevenue, buildingABrand, theMarketingMix],
    takeaway: [
      'Three marketing objectives: market share, revenue, building a brand.',
      `Market share is largest at the lowest price; revenue peaks at ${money(U_REV_PEAK)}. They are not the same objective.`,
      'Revenue is price times quantity, so a price cut moves both — one up, one down.',
      'The mix is product, promotion, price and place; each constrains the other three.',
    ],
  },
  {
    title: B2,
    sections: [theStagesOfTheProductLifeCycle, extensionStrategies, theBostonMatrix, managingThePortfolio],
    takeaway: [
      'The life cycle runs introduction, growth, maturity, decline — and profit peaks before sales do.',
      'An extension holds a product in maturity; it does not start a new cycle.',
      'The Boston Matrix places products on market growth and market share, giving four quadrants.',
      'A portfolio is managed by cash, and a dog is not automatically withdrawn.',
    ],
  },
  {
    title: B3,
    sections: [massMarkets, nicheMarkets, b2bAndB2c, developingCustomerLoyalty],
    takeaway: [
      'A mass market buys volume and low unit cost, and pays for it by competing on price.',
      'A niche buys margin and loyalty, and pays for it with a ceiling on sales and concentrated risk.',
      'A B2B purchase usually has to be justified to somebody else, which is what changes the mix.',
      'Loyalty is the product working, then recovery, then recognition — in that order.',
    ],
  },
  {
    title: B4,
    sections: [theDesignMix, designingForResourceDepletion, ethicalSourcing],
    takeaway: [
      'Function, aesthetics and cost: improving one is paid for at another.',
      'Concern over resource depletion reaches design as waste minimisation, re-use and recycling.',
      'Waste minimisation lowers cost by definition; re-use and recycling can go either way.',
      'Ethical sourcing raises the material cost and buys a claim, a buyer and a risk avoided.',
    ],
  },
  {
    title: B5,
    sections: [typesOfPromotion, typesOfBranding, theBenefitsOfStrongBranding, uspsAndDifferentiation, advertisingSponsorshipSocialMedia, changesToReflectSocialTrends],
    takeaway: [
      'Promotion types differ in reach, precision and whether the effect can be measured.',
      'A brand decision is what it sits on and whose name it is.',
      `Strong branding takes price elasticity from ${el(pedU(TODAY_P))} to ${el(pedB(TODAY_P))}, and the premium follows.`,
      'USPs come first among the ways to build a brand, because they are what there is to say.',
      'Viral, social and emotional: the message moves from stated to felt.',
    ],
  },
  {
    title: B6,
    sections: [costPlusPricing, skimmingAndPenetration, predatoryAndCompetitivePricing, psychologicalPricing, choosingAStrategyOne, choosingAStrategyTwo, onlineSalesAndComparisonSites],
    takeaway: [
      `Cost plus adds a mark-up to unit cost: ${money(UNIT_COST)} at ${MARKUPS[2]}% gives ${money(costPlus(MARKUPS[2]))}. It never looks at the buyer.`,
      'Skimming launches high and comes down; penetration launches low and goes up.',
      'Predatory pricing is below cost and aimed at a rival, not merely low.',
      'Six factors decide the strategy, and all six are about room to price.',
      'Online sales and comparison sites make prices easy to compare, which narrows that room.',
    ],
  },
  {
    title: B7,
    sections: [fourStageChannels, threeAndTwoStageChannels, matchingTheChannelToTheProduct, changesInDistributionMethods],
    takeaway: [
      'The three channels are four stage, three stage and two stage, named for the stages on the route.',
      `Both retail channels reach the consumer at ${money(shelfOf(CHANNELS[1]))}; Zola keeps ${money(zolaKeeps(CHANNELS[0]))} or ${money(zolaKeeps(CHANNELS[1]))}.`,
      'A shorter channel gives the producer more margin and more work, not the consumer a lower price.',
      'Selling online made the two stage channel practical; longer ones still pay.',
    ],
  },
];

export const SUBSECTIONS = BLOCKS.flatMap((b) => b.sections);

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
 * Seven Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match
 * against every one of them. Notes carry the specification's own phrasing where the coverage rule
 * needs it (packet 14's rule): `spec.uncovered` is lexical and matches whole tokens, so a leaf worded
 * "Changes in the elements of the design mix to reflect social trends" needs those words together in
 * one field, and the sentence must still teach. None of them carries ATL, BTL, or a branding
 * taxonomy the specification does not contain.
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const exam = (text) => ({ type: 'imp', text, tag: 'exam' });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '3 objectives + the mix',
    keyIdea: 'The specification names three marketing objectives — increase market share, increase revenue, building a brand — and they do not point at the same price.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Marketing objective</strong> — a measurable target a business sets for its marketing, with a deadline attached.'),
        def('<strong>Market share</strong> — this business\'s sales as a percentage of the whole market\'s sales.'),
        def('<strong>Revenue</strong> — price multiplied by quantity sold. Nothing is taken off it.'),
        def('<strong>The concept of &lsquo;marketing mix&rsquo;</strong> — the set of controllable decisions about product, promotion, price and place.'),
      ] },
      { title: 'MARKETING OBJECTIVES (1a)', items: [
        mech(`<strong>Increase market share</strong> — ${units(TODAY_Q)} ÷ ${units(MARKET)} = ${share(shareU(TODAY_P))}. It is relative, so sales can rise while share falls.`),
        mech(`<strong>Increase revenue</strong> — ${money(TODAY_P)} × ${units(TODAY_Q)} = ${money(revU(TODAY_P))}. Revenue peaks at ${money(U_REV_PEAK)}, not at the lowest price.`),
        mech('<strong>Building a brand</strong> — a longer-run objective that changes what the business can charge rather than what it sells today.'),
      ] },
      { title: 'THE FOUR ELEMENTS (1d)', items: [
        mech('<strong>Product</strong> what it is · <strong>Promotion</strong> how buyers hear of it · <strong>Price</strong> what is charged · <strong>Place</strong> how it reaches them.'),
        link('A decision in one constrains the other three — that is what makes it a mix rather than a list.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('Asked to evaluate a marketing decision, say what the change forces in the other three elements. An answer that changes one and stops has described, not evaluated.'),
      ] },
    ],
  },
  {
    title: B2,
    meta: '2 models',
    keyIdea: 'The product life cycle and extension strategies describe one product over time; the Boston Matrix and the product portfolio describe all of them at once.',
    blocks: [
      { title: 'THE PRODUCT LIFE CYCLE AND EXTENSION STRATEGIES (1b)', items: [
        mech('<strong>Introduction</strong> sales from nothing, usually a loss · <strong>Growth</strong> sales climb · <strong>Maturity</strong> sales level, profit highest · <strong>Decline</strong> sales fall.'),
        mech('Profit lags sales, starts negative and peaks <em>before</em> sales do.'),
        mech('<strong>Extension strategies</strong> hold a product in maturity by changing one element of the mix — a new size, a new group of buyers, a new use, a new price, a new channel.'),
      ] },
      { title: 'THE BOSTON MATRIX AND THE PRODUCT PORTFOLIO (1c)', items: [
        mech('Two axes: <strong>market growth</strong> up the side, <strong>market share</strong> across the bottom.'),
        mech('<strong>Question mark</strong> growing market, small share · <strong>Star</strong> growing, large · <strong>Cash cow</strong> flat, large · <strong>Dog</strong> flat, small.'),
        mech('The cash cow funds the question marks. A question mark that wins share becomes a star; a star in a settling market becomes the next cash cow.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('A dog is not automatically divested. Say whether this one covers its costs, completes a range or holds a retailer relationship before recommending anything.'),
        exam('A Construct (4 marks) needs both axes labelled before any product is placed.'),
      ] },
    ],
  },
  {
    title: B3,
    meta: '4 market types + loyalty',
    keyIdea: 'Marketing strategies appropriate for different types of market: mass markets, niche markets, business to business (B2B) and business to consumer (B2C).',
    blocks: [
      { title: 'MARKETING STRATEGIES FOR DIFFERENT TYPES OF MARKET (1e)', items: [
        mech('<strong>Mass markets</strong> — one standardised product for most buyers. Low unit cost from volume; competition on price.'),
        mech('<strong>Niche markets</strong> — a specialised product for a small group. Higher price and loyalty; a ceiling on sales and concentrated risk.'),
        mech('<strong>Business to business (B2B)</strong> — repeat orders in quantity, negotiated prices, a case that has to be justified to somebody else.'),
        mech('<strong>Business to consumer (B2C)</strong> — individual purchases, one published price, promotion to an audience the seller cannot name.'),
      ] },
      { title: 'CONSUMER BEHAVIOUR: HOW BUSINESSES DEVELOP CUSTOMER LOYALTY (1f)', items: [
        mech('The product does what it promised → a problem is put right → the buyer is recognised → leaving would cost something.'),
        mech('A loyal buyer costs nothing to find, buys more often, and is less likely to leave over a price rise.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('A niche is not automatically more profitable. Compare margin × volume, not margin alone.'),
        exam('Evaluating a loyalty scheme means asking what the business would have sold without it.'),
      ] },
    ],
  },
  {
    title: B4,
    meta: '3 elements + 2 trends',
    keyIdea: 'The design mix is function, aesthetics and cost/economic manufacture, and changes in the elements of the design mix to reflect social trends run through resource depletion and ethical sourcing.',
    blocks: [
      { title: 'DESIGN MIX (2a)', items: [
        def('<strong>Function</strong> — what the product has to do, and how reliably.'),
        def('<strong>Aesthetics</strong> — how it looks, feels and sounds.'),
        def('<strong>Cost/economic manufacture</strong> — whether it can be made at a cost that leaves a margin at the selling price.'),
        mech('The three trade against each other. Which one leads is a strategic choice, not a design one.'),
      ] },
      { title: 'CHANGES TO REFLECT SOCIAL TRENDS (2b)', items: [
        mech('<strong>Concern over resource depletion: designing for waste minimisation, re-use and recycling</strong> — use less material, design the product to be used again, design so materials can be recovered.'),
        mech('<strong>Ethical sourcing</strong> — choosing suppliers on conditions and pay as well as price. Raises material cost; buys a claim, a buyer and a risk avoided.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('Waste minimisation <em>lowers</em> cost by definition — less material bought, less thrown away. It is re-use and recycling that can cut either way.'),
      ] },
    ],
  },
  {
    title: B5,
    meta: '5 requirements',
    keyIdea: 'Types of promotion and types of branding, the benefits of strong branding, ways to build a brand, and changes in branding and promotion to reflect social trends.',
    blocks: [
      { title: 'TYPES OF PROMOTION (3a) AND TYPES OF BRANDING (3b)', items: [
        mech('<strong>Promotion</strong> — advertising (reach), sponsorship (association), social media (conversation), price promotions (immediate volume), direct contact (answers questions).'),
        mech('<strong>Branding</strong> — what the brand sits on (one product, or the whole range) and whose name it is (the maker\'s, or the seller\'s).'),
        link('The specification lists no taxonomy for either, so the decisions are what is examinable, not a set of labels.'),
      ] },
      { title: 'THE BENEFITS OF STRONG BRANDING (3c)', items: [
        mech(`<strong>Added value</strong> — ${money(TODAY_P)} less the ${money(UNIT_COST)} bought in = ${money(addedValue(TODAY_P))} a bottle.`),
        mech(`<strong>Ability to charge premium prices</strong> — at ${money(24)} the unbranded line sells ${units(qU(24))} bottles and makes ${money(profitU(24))} of <em>profit</em>; the branded one sells ${units(qB(24))} and makes ${money(profitB(24))}. Revenue is a different figure: ${money(revU(24))} against ${money(revB(24))}.`),
        mech(`<strong>Reduced price elasticity of demand</strong> — ${el(pedU(TODAY_P))} before the brand, ${el(pedB(TODAY_P))} after, at the same price and the same sales.`),
      ] },
      { title: 'WAYS TO BUILD A BRAND (3d) AND CHANGES TO REFLECT SOCIAL TRENDS (3e)', items: [
        mech('<strong>Unique selling points (USPs)/differentiation</strong> — what there is to say. <strong>Advertising</strong> states it, <strong>sponsorship</strong> borrows an association, <strong>the use of social media</strong> lets buyers carry it.'),
        mech('<strong>Viral marketing</strong> — content made to be passed on; the spread cannot be bought. <strong>Social media</strong> — an audience built rather than purchased. <strong>Emotional branding</strong> — built on how the buyer feels, not on what the product does.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('A strong brand need not sell more today. It loses fewer buyers when the price rises, which is worth more.'),
        exam('A low price is not a USP: any rival can match it by the end of the week.'),
      ] },
    ],
  },
  {
    title: B6,
    meta: '6 strategies + 6 factors',
    keyIdea: 'Types of pricing strategy, the factors that determine the most appropriate pricing strategy for a particular situation, and changes in pricing to reflect social trends.',
    blocks: [
      { title: 'TYPES OF PRICING STRATEGY (4a)', items: [
        mech(`<strong>Cost plus (mark-up on unit cost)</strong> — ${money(UNIT_COST)} at ${MARKUPS[0]}%/${MARKUPS[1]}%/${MARKUPS[2]}% gives ${money(costPlus(MARKUPS[0]))}/${money(costPlus(MARKUPS[1]))}/${money(costPlus(MARKUPS[2]))}.`),
        mech('<strong>Price skimming</strong> — launch high, come down as the buyers who pay most run out.'),
        mech('<strong>Penetration</strong> — launch low to win share, raise once buyers are established.'),
        mech('<strong>Predatory</strong> — below cost, to remove a rival. Restricted by competition law in many countries.'),
        mech('<strong>Competitive</strong> — at or near what rivals charge; the price is taken from the market rather than set.'),
        mech(`<strong>Psychological</strong> — ${money(PSYCH_P)} to seem lower, or a round high price to signal quality.`),
      ] },
      { title: 'FACTORS THAT DETERMINE THE MOST APPROPRIATE PRICING STRATEGY (4b)', items: [
        mech('<strong>Number of USPs/amount of differentiation</strong> · <strong>price elasticity of demand</strong> · <strong>level of competition in the business environment</strong>.'),
        mech('<strong>Strength of brand</strong> · <strong>stage in the product life cycle</strong> · <strong>costs and the need to make a profit</strong>.'),
        link('All six are one question: how much room does this business have to set its own price?'),
      ] },
      { title: 'CHANGES IN PRICING TO REFLECT SOCIAL TRENDS (4c)', items: [
        mech('<strong>Online sales</strong> and <strong>price comparison sites</strong> both cut the cost of comparing prices to almost nothing, which narrows the room and raises the value of everything that is not price.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('Cost plus guarantees a margin on each sale made, not a profit. If the price is above what buyers pay, the margin is on nothing.'),
        exam('A Calculate (4 marks) requires workings. Show the mark-up applied to the unit cost, not just the price.'),
      ] },
    ],
  },
  {
    title: B7,
    meta: '3 channels + change',
    keyIdea: 'Distribution channels — four stage, three stage and two stage — and changes in distribution methods.',
    blocks: [
      { title: 'DISTRIBUTION CHANNELS (5a)', items: [
        mech(`<strong>Four stage: producer to wholesaler to retailer to consumer</strong> — ${chainOf(CHANNELS[0]).map(money).join(' → ')}. Zola keeps ${money(zolaKeeps(CHANNELS[0]))}.`),
        mech(`<strong>Three stage: producer to retailer to consumer</strong> — ${chainOf(CHANNELS[1]).map(money).join(' → ')}. Zola keeps ${money(zolaKeeps(CHANNELS[1]))}.`),
        mech(`<strong>Two stage: producer to consumer</strong> — ${money(shelfOf(CHANNELS[2]))} direct. Zola keeps ${money(zolaKeeps(CHANNELS[2]))}, and does all the work.`),
        link(`The four stage and three stage channels reach the consumer at the same ${money(shelfOf(CHANNELS[1]))}. What differs is how much of it reaches the producer.`),
      ] },
      { title: 'CHANGES IN DISTRIBUTION METHODS (5b)', items: [
        mech('Selling online · delivery instead of collection · supplying access rather than the object · several channels at once.'),
        mech('The longer channels have not disappeared: for a low-value product bought casually, a wholesaler and a retailer still do the work more cheaply than the producer could.'),
      ] },
      { title: 'IN AN ANSWER', items: [
        exam('A shorter channel means more of the price reaches the producer, not a lower price for the consumer. Whether any is passed on is a separate decision.'),
        exam('A producer selling direct while supplying retailers is competing with its own stockists — price the direct channel carefully.'),
      ] },
    ],
  },
];
