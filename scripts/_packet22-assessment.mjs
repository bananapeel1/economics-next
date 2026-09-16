/**
 * PACKET 22 — marketing-mix-strategy: quiz, practice, flashcards, common mistakes, extras.
 *
 * Quiz: 34 items, every one on material the Learn Mode body now teaches, 31 reachable through a
 * block's quizIndices and exactly three left unpinned — and those three FIRST in the array, because a
 * signed-out student is sent only PREVIEW_LIMITS.quiz items and PreTest.jsx slices whatever it is
 * given (packet 16). The March bank had 25 with quizIndices [0],[1],[2],[3],[4],[5] — the
 * `pins.identity` tell — so five of six chapters showed a question about something they had not
 * taught (structure-01), two of them on material the section never taught at all.
 *
 * TWO MARCH ITEMS ARE DROPPED RATHER THAN REWRITTEN. q14 and q17 tested an
 * intensive/selective/exclusive distribution taxonomy that returns ZERO occurrences in the Business
 * specification — the single hit for "intensive" is capital-intensive PRODUCTION at bus_spec.txt:983
 * (quiz-01). The specification's own words for 5a are four stage, three stage and two stage, and
 * those are what is tested here.
 *
 * Practice: IAL BUSINESS command words and their own tariffs from Appendix 6, verified against
 * audit/raw/tariff-census.json — Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8,
 * Assess 10 (Units 1-2), Evaluate 20. All eight appear here. The March set had "Define the term USP
 * (4 marks)" when Define is 2 (practice-01) and "Explain … (6 marks)" when Explain is 4 and 6 is
 * Analyse (practice-02) — and the USP it asked a student to define was never taught in the section
 * at all. USPs are now 3d-1 and have their own subsection.
 *
 * topFix-04 asks for guidance written as "KAA levels". `KAA` returns ZERO occurrences in
 * bus_spec.txt; guidance above 6 marks is levels-shaped, allocates no points (`practice.levels`), and
 * is written from Appendix 6's own description of the command word, which is citable.
 *
 * No item anywhere in this file uses "above the line", "below the line", ATL, BTL, SMART, or a
 * branding taxonomy the specification does not contain. An assessment item is where off-spec
 * vocabulary does real damage, because a student who learns the wrong word here will write it.
 */
import { id, money, units, el, share, minus, UNIT_COST, MARKET, TODAY_P, TODAY_Q, PRICES, qU, qB, revU, profitU, profitB, shareU, pedU, pedB, addedValue, MARKUPS, costPlus, PSYCH_P, CHANNELS, chainOf, shelfOf, zolaKeeps, U_REV_PEAK, U_PROFIT_PEAK, B_PROFIT_PEAK } from './_packet22-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet22-content.mjs';

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation, keptId?]
const Q = [
  /* ══ unpinned: the pre-test, FIRST in array order ══════════════════════════
   * PreTest.jsx takes the first three items no block has reserved, in array order (F079). They sit
   * FIRST because GET /api/sections/[id] caps a free or signed-out student's quiz at
   * PREVIEW_LIMITS.quiz (F086), so unpinned items at the END mean the pre-test asks a question a
   * chapter check-in asks again minutes later. One from the mix, one from branding and one from
   * distribution, so the three sample the whole section.
   */
  [null, 'The marketing mix is best described as:',
    ['The four types of market a business can sell into', 'The decisions a business controls about product, promotion, price and place', 'The stages a product passes through from launch to withdrawal', 'The mix of customers a business sells to'], 1,
    'The mix is the set of controllable decisions a business makes to sell a product. The stages from launch to withdrawal are the product life cycle, and the types of market are a separate requirement.'],
  [null, 'A strong brand is most valuable to a business because it:',
    ['Guarantees a larger number of sales each year', 'Removes the need to advertise the product', 'Makes demand less sensitive to a change in price', 'Lowers the cost of making the product'], 2,
    'Reduced price elasticity of demand is the change a strong brand makes, and the ability to charge a premium price follows from it. A brand may sell the same number today and simply lose fewer of them when the price rises.'],
  [null, 'In a three stage distribution channel, the product passes from the producer to the:',
    ['Wholesaler, then to the consumer', 'Consumer directly', 'Retailer, then to the consumer', 'Wholesaler, then the retailer, then the consumer'], 2,
    'A three stage channel is producer to retailer to consumer. Producer to consumer is two stage, and the chain through a wholesaler as well is four stage.'],

  /* ══ Block 1 — Marketing objectives and the marketing mix ══ */
  [B1, 'Which three marketing objectives does the specification name?',
    ['Increase profit, increase revenue, cut costs', 'Increase market share, increase revenue, building a brand', 'Increase market share, increase awareness, cut costs', 'Increase sales, build a brand, enter new markets'], 1,
    'The three named objectives are increasing market share, increasing revenue and building a brand. Profit and cost are business objectives rather than marketing ones, and awareness is a means to an objective rather than one of them.'],
  [B1, `A business sells ${units(TODAY_Q)} units in a market where ${units(MARKET)} units are bought in total. Its market share is:`,
    [share(shareU(TODAY_P)), '8.3%', '20%', '60%'], 0,
    `Market share is the business's own sales divided by the whole market's, as a percentage: ${units(TODAY_Q)} ÷ ${units(MARKET)} = ${share(shareU(TODAY_P))}. The other figures come from dividing the wrong way round or from a different row of the schedule.`],
  [B1, 'A business increases its sales for the year but its market share falls. This can only happen if:',
    ['It cut its price during the year', 'Its costs rose faster than its sales', 'The whole market grew faster than its sales did', 'It sold to fewer customers than before'], 2,
    'Market share is relative, so it falls whenever the market grows faster than the business does. A price cut, a cost rise and the number of customers all say nothing on their own about what the rest of the market was doing.'],
  [B1, `Zola sells ${units(qU(12))} bottles at ${money(12)} and ${units(qU(TODAY_P))} at ${money(TODAY_P)}. Its revenue at the two prices is:`,
    [`Higher at ${money(12)}`, `Higher at ${money(TODAY_P)}`, 'The same at both', 'Impossible to compare without the cost'], 2,
    `Revenue is price times quantity: ${money(12)} × ${units(qU(12))} and ${money(TODAY_P)} × ${units(qU(TODAY_P))} both give ${money(revU(12))}. The same revenue can come from a large number of cheap sales or a small number of dear ones, which is why revenue alone does not describe a business.`],
  [B1, 'A business changes its product to a premium design but leaves its price, promotion and distribution unchanged. The main problem is that:',
    ['The product will now cost more to make', 'The four elements of the mix no longer agree with each other', 'Market share will fall in the first year', 'The product life cycle will restart'], 1,
    'A mix works when a buyer meets the same message in all four elements. A premium product sold cheaply through the same channels tells the buyer two different things, and the mismatch itself is read as a reason to distrust the claim.'],

  /* ══ Block 2 — The product life cycle and the portfolio ══ */
  [B2, 'The four stages of the product life cycle, in order, are:',
    ['Growth, introduction, maturity, decline', 'Introduction, growth, maturity, decline', 'Introduction, maturity, growth, decline', 'Launch, expansion, saturation, withdrawal'], 1,
    'A product is introduced, grows, matures and declines. Launch, expansion, saturation and withdrawal simply rename the stages, and the other two orders put growth and maturity the wrong way round.'],
  [B2, 'On a product life cycle diagram, profit:',
    ['Rises and falls exactly with sales', 'Starts negative and peaks before sales do', 'Is highest at the moment of launch', 'Stays constant through maturity'], 1,
    'Profit lags sales, starts below zero while launch spending is being recovered, and peaks in maturity before sales reach their own peak — because the price is falling by the time volume is highest.'],
  [B2, 'A business sells a breakfast cereal to children and begins promoting the same cereal to adults as an evening snack. This is:',
    ['A new product launch', 'An extension strategy', 'A penetration pricing strategy', 'A change to the design mix'], 1,
    'The product is unchanged and a new group of buyers has been found for it, which holds it in maturity rather than starting a new cycle. A new product would have its own introduction stage and its own launch spending to recover.'],
  [B2, 'On the Boston Matrix, a product in a market that is growing quickly but where the business holds only a small share is:',
    ['A star', 'A cash cow', 'A dog', 'A question mark'], 3,
    'High market growth with low market share is a question mark: the market is worth being in, and the business is not yet established in it, so cash is needed before the product says anything definite.'],
  [B2, 'A business is considering withdrawing a product in the dog quadrant. Before deciding it should check whether the product:',
    ['Has ever been profitable in the past', 'Could be moved into a growing market', 'Covers its own costs or completes a range a retailer stocks', 'Has a higher market share than any rival'], 2,
    'A dog is not automatically withdrawn. One that covers its costs, completes a range or holds a retailer relationship earns its place, and the matrix exists to inform that judgement rather than to make it.'],

  /* ══ Block 3 — Marketing strategy and the customer ══ */
  [B3, 'Which of these is characteristic of a mass market strategy?',
    ['A specialised product at a higher price', 'A standardised product with a low unit cost from volume', 'Promotion aimed at one small group of buyers', 'A ceiling on how many units can be sold'], 1,
    'A mass market sells one standard product to as many buyers as possible, which brings the unit cost down. A specialised product at a higher price, promotion aimed at one small group, and a ceiling on sales all describe a niche strategy instead.'],
  [B3, 'A business argues that its niche strategy must be more profitable than a rival\'s mass market one because its margin on each sale is larger. This reasoning is:',
    ['Correct, because margin is what determines profit', 'Correct, because niche buyers are more loyal', 'Wrong, because profit is margin multiplied by volume', 'Wrong, because niche products always cost more to make'], 2,
    'A wide margin on a small number of sales can earn less than a thin margin on a large number. The comparison is margin times volume, and loyalty and unit cost do not settle it either.'],
  [B3, 'The most reliable difference between selling to a business and selling to a consumer is that a business purchase:',
    ['Ignores how the product looks or feels', 'Usually has to be justified to somebody else', 'Involves a larger quantity than a consumer buys', 'Is settled by negotiating on price'], 1,
    'A business buyer typically answers to someone else, so the argument has to survive being repeated. Business buyers still have preferences, and larger orders and negotiated prices are common without being reliable.'],
  [B3, 'A customer returns to a business only while a discount code is running. This shows that:',
    ['The loyalty scheme is working as intended', 'The business has built genuine customer loyalty', 'The business is paying for sales it may have had anyway', 'The product must be better than its rivals'], 2,
    'A buyer who returns only while the discount lasts is buying a discount rather than showing loyalty, and the business may be paying for purchases that would have happened without it. Loyalty is built on the product working first.'],

  /* ══ Block 4 — Product and service design ══ */
  [B4, 'The three elements of the design mix are:',
    ['Product, price and place in the marketing mix', 'Function, aesthetics and cost/economic manufacture', 'Quality, durability and the price charged', 'Design, materials and method of manufacture'], 1,
    'The design mix is function, aesthetics and cost/economic manufacture. Product, price and place are three of the four elements of the marketing mix, which is a different requirement.'],
  [B4, 'A business redesigns its packaging so that it uses less card and produces less offcut waste. The effect on cost is that it:',
    ['Rises, because sustainable design costs more', 'Falls, because less material is bought and less thrown away', 'Stays the same, because the product is unchanged', 'Cannot be determined without the sales figures'], 1,
    'Waste minimisation lowers cost by definition: less material is bought and less is discarded in making it. Re-use and recycling are the responses that can move cost either way.'],
  [B4, 'A luxury watchmaker chooses a hand-finished case that slows production. In design mix terms it has:',
    ['Improved function at the expense of aesthetics', 'Improved aesthetics at the expense of cost', 'Improved cost at the expense of function', 'Improved all three at once'], 1,
    'A hand-finished case is an aesthetic decision paid for in cost and output. The design mix is one decision with three consequences, and moving towards one element is paid for at another.'],
  [B4, 'A business that sources ethically finds no buyer mentions it. The spending has still bought it:',
    ['A lower material cost', 'A guaranteed rise in market share', 'Protection against a supply scandal', 'A unique selling point by definition'], 2,
    'The value of a supply chain that has been examined shows up as the scandal that does not happen, which is real and invisible at once. Ethical sourcing raises the material cost, and it is a selling point only if buyers care about it.'],

  /* ══ Block 5 — Promotion and branding ══ */
  [B5, 'A business wants promotion whose effect on sales it can measure exactly. It should choose:',
    ['A sponsorship of a local sports team', 'A discount code used at the checkout', 'A poster campaign across the city', 'A change to the product packaging'], 1,
    'A code used at the checkout can be counted exactly. A sponsorship and a poster campaign reach people whose purchases cannot be traced back to them, and packaging is a product decision rather than a type of promotion.'],
  [B5, 'A business puts one name on every product it sells. The main risk is that:',
    ['Each product must be advertised separately', 'A problem with one product damages all the others', 'The products cannot be priced differently', 'New products take longer to launch'], 1,
    'A shared name carries a new product for free and carries a failure just as efficiently. Products under one name can still be priced separately and launch faster, which is the benefit being traded against the risk.'],
  [B5, 'The three benefits of strong branding the specification names are:',
    ['Lower production costs, higher output and better product quality', 'Added value, the ability to charge premium prices, and reduced price elasticity of demand', 'Higher market share, higher revenue and higher profit each year', 'Advertising, sponsorship and the use of social media'], 1,
    'Added value, premium prices and reduced price elasticity of demand are the specification\'s three. Advertising, sponsorship and social media are ways to BUILD a brand rather than benefits of having one, and the rest are outcomes that may or may not follow.'],
  [B5, 'Which of these is most likely to work as a unique selling point?',
    ['The lowest price on the shelf that week', 'A wide choice of colours across the range', 'A lifetime guarantee honoured without a receipt', 'A large advertising budget behind it'], 2,
    'A selling point holds only if copying it would cost a rival something real. A price can be matched by the end of the week at no cost but margin, colours are easy to add, and an advertising budget is not a feature of the product.'],
  [B5, 'A business says it will "make its next campaign go viral". The problem with this plan is that:',
    ['Viral marketing is more expensive than advertising', 'Whether content spreads is decided by the people who see it', 'Viral marketing only works for products aimed at young buyers', 'Social media cannot be measured'], 1,
    'A business can make something worth sharing; it cannot make it spread. That is why viral reach is planned for as a possibility rather than as a budget line.'],

  /* ══ Block 6 — Pricing strategies ══ */
  [B6, `A business has a unit cost of ${money(UNIT_COST)} and applies a mark-up of ${MARKUPS[1]}%. Its price is:`,
    [money(costPlus(MARKUPS[0])), money(costPlus(MARKUPS[1])), money(costPlus(MARKUPS[2])), money(UNIT_COST)], 1,
    `Cost plus is the unit cost multiplied by one plus the mark-up: ${money(UNIT_COST)} × ${1 + MARKUPS[1] / 100} = ${money(costPlus(MARKUPS[1]))}. The other prices come from the ${MARKUPS[0]}% and ${MARKUPS[2]}% mark-ups, or from adding no mark-up at all.`],
  [B6, 'A business launches a product at a high price and lowers it in steps over the following two years. This is:',
    ['Penetration pricing', 'Predatory pricing', 'Price skimming', 'Psychological pricing'], 2,
    'Skimming launches high to take the buyers who will pay most and comes down as they run out. Penetration is the mirror image, starting low to win share.'],
  [B6, 'What distinguishes predatory pricing from simply charging a low price?',
    ['The price is set below the cost of production to remove a rival', 'The price is lower than every competitor charges', 'The price is only offered to new customers', 'The price ends in .99 to look smaller'], 0,
    'Predatory pricing is a loss taken deliberately to make the market unprofitable for a rival. A low price from a business with genuinely lower costs is competition working, not predation.'],
  [B6, `A business prices a product at ${money(PSYCH_P)} rather than ${money(TODAY_P)}. It is relying on the fact that:`,
    ['The cost of production has fallen by one cent', 'Buyers read the first digit before the rest', 'A lower price always raises revenue', 'Rivals cannot match a price ending in .99'], 1,
    'Psychological pricing changes how large the price seems rather than how large it is. The same strategy works in reverse: a round, high price signals that the business is not competing on price.'],
  [B6, 'Which of these is one of the six factors the specification names as determining the most appropriate pricing strategy?',
    ['The number of people the business employs', 'The age of the business in years', 'Stage in the product life cycle', 'The legal structure the business has chosen'], 2,
    'The six are the number of USPs or amount of differentiation, price elasticity of demand, the level of competition in the business environment, the strength of brand, the stage in the product life cycle, and costs and the need to make a profit.'],

  /* ══ Block 7 — Distribution ══ */
  [B7, 'A four stage distribution channel runs:',
    ['Producer to retailer to wholesaler to consumer', 'Producer to wholesaler to retailer to consumer', 'Producer to consumer to retailer', 'Wholesaler to producer to retailer to consumer'], 1,
    'The specification\'s wording is producer to wholesaler to retailer to consumer. The wholesaler buys in bulk and breaks it down for retailers, so it comes before the retailer in the chain.'],
  [B7, `Zola can sell to a retailer at ${money(chainOf(CHANNELS[1])[0])}, who sells at ${money(shelfOf(CHANNELS[1]))}, or through a wholesaler and a retailer who also reach the consumer at ${money(shelfOf(CHANNELS[0]))}. The difference between the two channels is:`,
    ['What the consumer pays', 'How much of the price reaches Zola', 'The quality of the bottle', 'How quickly the bottle is delivered'], 1,
    `The consumer pays ${money(shelfOf(CHANNELS[1]))} either way. What differs is how much reaches the producer: ${money(zolaKeeps(CHANNELS[1]))} through the shorter chain against ${money(zolaKeeps(CHANNELS[0]))} through the longer one.`],
  [B7, 'A producer that starts selling directly to consumers online will:',
    ['Always be able to charge a lower price', 'Keep more of each sale and take on more of the work', 'No longer need to hold any stock', 'Reach more buyers than through retailers'], 1,
    'A shorter channel gives the producer more of the price and the stock, payments, delivery and returns that the retailer used to absorb. Whether any of the margin is passed on is a separate decision, and reach usually falls rather than rises.'],
];

/*
 * CORRECT-ANSWER POSITION. Each item above was authored with the correct option wherever it read
 * most naturally, which put the answer at 2 / 20 / 11 / 1 across the four positions — the
 * construction tell `quiz.histogram` measures (no bucket above 40% or below 10%). Learn Mode
 * shuffles options at render (packet 8), so this changes nothing a STUDENT sees; it is the stored
 * data that carries the tell, and a reader of the table can see the pattern even when a renderer
 * hides it. Each item's options are rotated so the correct answer lands on a target that cycles
 * 0, 1, 2, 3 down the array. Rotation keeps the options in their authored RELATIVE order, and no
 * explanation in this file refers to an option by its position — the three that did were rewritten
 * to name the option instead.
 */
const rotate = (arr, k) => arr.map((_, i) => arr[(i + k) % arr.length]);
export const QUIZ = Q.map(([block, question, options, correctIndex, explanation, keptId], n) => {
  const target = n % 4;
  const k = (correctIndex - target + options.length) % options.length;
  return { id: keptId || id('quiz', question), block, question, options: rotate(options, k), correctIndex: target, explanation };
});

/* ── practice ──────────────────────────────────────────────────────────────── */
// [block, command, marks, question, guidance, keptId?]
// All eight IAL Business command words at their census tariffs. Guidance above 6 marks is
// levels-shaped and allocates no points (`practice.levels`).
const P = [
  [B1, 'Define', 2, 'Define the term \'marketing objective\'. (2 marks)',
    'Two things in one sentence: a target a business sets for its marketing, stated so that it can be measured. A definition with only the first half — "something the marketing is trying to do" — leaves out what separates an objective from a wish. An example is application and belongs in a 4-mark Explain; Define carries 2 marks in IAL Business (WBS11 Appendix 6).'],
  [B1, 'Calculate', 4, `A business sells ${units(TODAY_Q)} bottles in a year. The whole market buys ${units(MARKET)} bottles. Calculate its market share, and calculate its revenue if each bottle sells for ${money(TODAY_P)}. (4 marks)`,
    `Show both workings. Market share = ${units(TODAY_Q)} ÷ ${units(MARKET)} × 100 = ${share(shareU(TODAY_P))}. Revenue = ${money(TODAY_P)} × ${units(TODAY_Q)} = ${money(revU(TODAY_P))}. Divide the business's own sales by the whole market's, not the other way round, and keep revenue as price times quantity with nothing taken off it — costs belong to a different calculation. Workings should be given for a Calculate (WBS11 Appendix 6).`],
  [B2, 'Construct', 4, 'Construct a product life cycle diagram for a product now in maturity, showing both sales and profit and marking where an extension strategy would be applied. (4 marks)',
    'Construct requires an accurately labelled diagram (WBS11 Appendix 6), so the labels are the answer rather than decoration. The diagram needs: time on the horizontal axis and sales/profit on the vertical, both labelled; the four stages marked and named — introduction, growth, maturity, decline; a sales curve rising then falling; a separate profit curve that starts BELOW the axis, crosses it during growth and peaks before sales do; and the extension applied at the point where sales begin to level off, drawn as the sales curve being held up rather than as a second curve starting from nothing.'],
  [B3, 'Discuss', 8, 'Discuss whether a business entering the reusable bottle market should adopt a niche strategy rather than a mass market one. (8 marks)',
    'Levels-marked: the quality of the chain from knowledge to application to analysis decides the level, not the number of points made. Knowledge: a niche serves a small group whose needs the standard product misses; a mass market sells one standardised product to as many buyers as possible. Application: use the business in the extract — its size, its product, its rivals. Analysis: the niche allows a higher price because buyers are not choosing on price, and a wider margin on each sale; the mass market brings the unit cost down through volume. Then weigh the limits — the niche has a ceiling on sales and concentrated risk if tastes move or a larger rival enters, and the mass market means competing on price against businesses with lower costs. A Discuss requires a brief assessment showing awareness of competing arguments (WBS11 Appendix 6), so end with which fits THIS business and why.'],
  [B4, 'Explain', 4, 'Explain one way in which improving the aesthetics of a product may affect the other two elements of the design mix. (4 marks)',
    'One way, explained with a reason and a detail — not a list of three. A hand-finished case improves aesthetics; it takes longer to produce, so the cost of making each unit rises, which is the cost/economic manufacture element moving in response. It may also affect function: a finish chosen for its look can be less hard-wearing than one chosen for durability. Explain requires a brief explanation of cause or effect supported by details or examples (WBS11 Appendix 6), and the cause here is the trade-off, not the decision.'],
  [B5, 'Assess', 10, 'Assess whether building a strong brand is the best use of a marketing budget for a business selling reusable bottles. (10 marks)',
    `Levels-marked and judged on the chain, not on the number of points. Knowledge: the three benefits of strong branding are added value, the ability to charge premium prices and reduced price elasticity of demand. Application: use the business's own figures from the extract. Analysis: a brand that makes demand less price sensitive lets the business hold a price rise it could not otherwise hold — ${money(profitU(24))} against ${money(profitB(24))} at the same price, on this section's figures — which is worth more than the extra volume a discount would buy. Then assess the other side: brand spending is certain and immediate while the return is later and uncertain; the same money spent on distribution reaches buyers who have never seen the product; and a brand built on how buyers feel is damaged by things that have nothing to do with the product. Assess requires balanced, wide-ranging assessment leading to a supported judgement (WBS11 Appendix 6), so name the condition under which the answer changes.`],
  [B6, 'Evaluate', 20, 'Evaluate which pricing strategy a business should adopt when launching a reusable bottle into a market where several established rivals already sell a similar product. (20 marks)',
    `Levels-marked and judged on the weighing. Build the case for each candidate against the six factors the specification names — the number of USPs or amount of differentiation, price elasticity of demand, the level of competition in the business environment, the strength of brand, the stage in the product life cycle, and costs and the need to make a profit. Several established rivals with a similar product means little differentiation, a weak brand at launch and price elastic demand, which points away from skimming: there is nothing rivals cannot match, so a high price invites them to undercut it rather than rewarding the early buyer. Penetration fits the conditions but is hard to reverse, because buyers recruited by a low price are the ones most likely to leave when it rises. Competitive pricing is the honest reading of a crowded market and concedes the initiative. Cost plus guarantees a margin on each sale and ignores whether the sale happens. Then take it further: the pricing decision cannot be made alone, because a price only holds if the product, promotion and distribution support it, and the real recommendation may be to build a selling point before launching at all. Evaluate requires a perceptive conclusion proposing a solution or recommendation (WBS11 Appendix 6) — supporting one from the extract rather than restating the options is what separates the top level.`],
  [B7, 'Analyse', 6, `A producer can reach consumers at ${money(shelfOf(CHANNELS[1]))} through a retailer, keeping ${money(zolaKeeps(CHANNELS[1]))} a unit, or sell directly at ${money(shelfOf(CHANNELS[2]))} and keep ${money(zolaKeeps(CHANNELS[2]))}. Analyse the factors the producer should consider before choosing to sell directly. (6 marks)`,
    `Developed reasoning rather than a list, and no evaluation is required. Start from what the figures say: selling directly keeps ${money(zolaKeeps(CHANNELS[2]))} a unit against ${money(zolaKeeps(CHANNELS[1]))}, which is more of the price on every sale made. Then take it somewhere. The retailer was doing work the producer now takes on — holding stock, taking payment, delivering, handling returns — so the extra margin arrives with costs attached. Reach falls, because a retailer's shelf is seen by buyers who will never visit the producer's site. And a producer selling directly while still supplying retailers is competing with its own stockists, who can drop the product. Analyse requires a brief chain of reasoning and includes interpretation where it is applied to given data (WBS11 Appendix 6), so use both figures rather than quoting one.`],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance, keptId]) => ({
  id: keptId || id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
// Cards are rewritten in place and never deleted while the concept survives, because progress rows
// point at them (the packet-13 rule). Three March cards were exact duplicates of others and go; the
// cards carrying ATL/BTL and the individual/family/corporate labels are rewritten rather than
// dropped, because the requirement underneath each one — 3a and 3b — is on the specification.
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  card('Name the three marketing objectives the specification lists.', 'Increase <strong>market share</strong>; increase <strong>revenue</strong>; <strong>building a brand</strong>. They are separate targets and they do not point at the same price.'),
  card('How is market share calculated?', 'The business\'s own sales divided by the <strong>whole market\'s</strong> sales, as a percentage. It is a <strong>relative</strong> measure, so sales can rise while share falls if the market grew faster.'),
  card('What is revenue, and how does it differ from market share?', 'Revenue is <strong>price × quantity</strong>. Market share is largest at the lowest price; revenue rises to a peak and falls again, so the two objectives set different prices.'),
  card('What is the marketing mix?', 'The set of decisions a business <strong>controls</strong>: <strong>product</strong>, <strong>promotion</strong>, <strong>price</strong> and <strong>place</strong>. A decision in one constrains the other three — which is why it is a mix and not a list.'),
  card('Name the four stages of the product life cycle.', '<strong>Introduction</strong> — sales from nothing, usually a loss. <strong>Growth</strong> — sales climb. <strong>Maturity</strong> — sales level off, profit highest. <strong>Decline</strong> — sales fall away.'),
  card('Why is the profit curve not the same shape as the sales curve?', 'Profit <strong>lags</strong> sales: it starts negative while launch spending is recovered, crosses zero in growth, and <strong>peaks before sales do</strong>, because the price is falling by the time volume is highest.'),
  card('What is an extension strategy?', 'A change to one element of the mix that holds a product in <strong>maturity</strong> for longer — a new size, a new group of buyers, a new use, a new price, a new channel. It does not start a new life cycle.'),
  card('What are the two axes of the Boston Matrix?', '<strong>Market growth</strong> up the side and <strong>market share</strong> across the bottom. Both are about the market, not about how much the business sells.'),
  card('Name the four quadrants of the Boston Matrix.', '<strong>Star</strong> (growing market, large share) · <strong>Question mark</strong> (growing, small) · <strong>Cash cow</strong> (flat, large) · <strong>Dog</strong> (flat, small).'),
  card('How is a product portfolio managed?', 'By <strong>cash</strong>. The cash cow needs little spending and funds the question marks; a question mark that wins share becomes a star, and a star whose market settles becomes the next cash cow.'),
  card('Should a dog always be withdrawn?', 'No. A dog that <strong>covers its own costs</strong>, completes a range a retailer stocks, or matters to buyers the business wants to keep earns its place. The matrix informs the judgement rather than making it.'),
  card('Name the four types of market the specification lists for marketing strategy.', '<strong>Mass markets</strong>, <strong>niche markets</strong>, <strong>business to business (B2B)</strong> and <strong>business to consumer (B2C)</strong>.'),
  card('What are the advantages and limits of a mass market strategy?', 'A standardised product in high volume brings the <strong>unit cost</strong> down. The market is crowded and buyers compare on <strong>price</strong>, which is the one thing a business with nothing to distinguish it least wants to compete on.'),
  card('What are the advantages and limits of a niche strategy?', 'Buyers choose it for what the standard product does not do, so the <strong>price</strong> holds and the margin is wider. Against that: a <strong>ceiling</strong> on sales, and concentrated risk if tastes move or a larger rival enters.'),
  card('What is the most reliable difference between B2B and B2C?', 'A B2B purchase is usually <strong>justified to somebody else</strong>, so the argument has to survive being repeated — which is why it turns on cost, reliability and terms. A consumer answers to nobody.'),
  card('How do businesses develop customer loyalty?', 'The product does what it promised → a problem is <strong>put right</strong> when it happens → the returning buyer is <strong>recognised</strong> → leaving would <strong>cost</strong> something. A scheme belongs at the third step and cannot substitute for the first.'),
  card('Why is a loyal customer worth more than the discount that bought them?', 'They cost <strong>nothing to find</strong>, buy more often, and are <strong>less likely to leave over a price rise</strong>. A buyer who returns only while a discount runs is buying the discount, not showing loyalty.'),
  card('Name the three elements of the design mix.', '<strong>Function</strong> — what it must do. <strong>Aesthetics</strong> — how it looks and feels. <strong>Cost/economic manufacture</strong> — whether it can be made at a cost that leaves a margin.'),
  card('Why is the design mix a trade-off?', 'Improving one element is paid for at another: a better finish costs output, a wider lid costs sealing. Which element <strong>leads</strong> is a strategic choice — budget leads on cost, luxury on aesthetics, safety equipment on function.'),
  card('How does concern over resource depletion change the design mix?', 'Through <strong>waste minimisation</strong> (use less material), <strong>re-use</strong> (design it to be used again) and <strong>recycling</strong> (design so materials can be recovered). Recyclability becomes a function requirement the product did not have.'),
  card('Does designing for the environment always raise costs?', 'No. <strong>Waste minimisation lowers</strong> cost by definition — less material bought, less thrown away. It is <strong>re-use and recycling</strong> that can move cost either way, and <strong>ethical sourcing</strong> that reliably raises it.'),
  card('What is ethical sourcing, and what does the extra cost buy?', 'Choosing suppliers on <strong>conditions and pay</strong> as well as price. It buys a claim the business can honestly make, a buyer who chose it for that reason, and a <strong>supply scandal that does not happen</strong>.'),
  card('Name the main types of promotion and what each one buys.', '<strong>Advertising</strong> — reach. <strong>Sponsorship</strong> — association. <strong>Social media</strong> — conversation. <strong>Price promotions</strong> — immediate volume. <strong>Direct contact</strong> — the only type that can answer a question.'),
  card('What two questions separate the types of branding?', 'What the brand <strong>sits on</strong> — one product, or the whole range — and <strong>whose name</strong> it is: the maker\'s, or the seller\'s. A shared name carries a new product for free and carries a failure just as efficiently.'),
  card('Name the three benefits of strong branding.', '<strong>Added value</strong>; the <strong>ability to charge premium prices</strong>; <strong>reduced price elasticity of demand</strong>. The third is the change, and the first two follow from it.'),
  card('What does a strong brand actually change about demand?', `Not its level — its <strong>sensitivity to price</strong>. On this section's figures, price elasticity at ${money(TODAY_P)} moves from <strong>${el(pedU(TODAY_P))}</strong> to <strong>${el(pedB(TODAY_P))}</strong>, and the profit-maximising price moves from ${money(U_PROFIT_PEAK)} to <strong>${money(B_PROFIT_PEAK)}</strong>.`),
  card('What is added value?', `The selling price <strong>less what was bought in</strong> to make the product. At ${money(TODAY_P)} a bottle costing ${money(UNIT_COST)} to make, the value added is <strong>${money(addedValue(TODAY_P))}</strong>.`),
  card('Name the four ways to build a brand the specification lists.', '<strong>Unique selling points (USPs)/differentiation</strong>; <strong>advertising</strong>; <strong>sponsorship</strong>; <strong>the use of social media</strong>. USPs come first because they are what there is to say.'),
  card('What makes something a genuine USP?', 'That <strong>copying it would cost a rival something real</strong>. A low price is not a USP: any rival can match it by the end of the week for nothing but margin.'),
  card('How do advertising, sponsorship and social media differ?', 'Advertising <strong>states</strong> the claim with total control. Sponsorship <strong>borrows</strong> an association and makes no claim. Social media lets buyers <strong>carry</strong> it — the least control and the most credibility.'),
  card('Name the three changes in branding and promotion to reflect social trends.', '<strong>Viral marketing</strong> — content made to be passed on. <strong>Social media</strong> — an audience built rather than bought. <strong>Emotional branding</strong> — built on how the buyer feels, not on what the product does.'),
  card('Can a business make a campaign go viral?', 'It can make something <strong>worth sharing</strong>. Whether it spreads is decided by the people who see it, so viral reach is planned for as a possibility and never as a budget line.'),
  card('Name the six types of pricing strategy.', '<strong>Cost plus</strong> (mark-up on unit cost) · <strong>price skimming</strong> · <strong>penetration</strong> · <strong>predatory</strong> · <strong>competitive</strong> · <strong>psychological</strong>.'),
  card('How is a cost plus price calculated?', `Unit cost × (1 + mark-up). ${money(UNIT_COST)} at ${MARKUPS[0]}%, ${MARKUPS[1]}% and ${MARKUPS[2]}% gives <strong>${money(costPlus(MARKUPS[0]))}</strong>, <strong>${money(costPlus(MARKUPS[1]))}</strong> and <strong>${money(costPlus(MARKUPS[2]))}</strong>. Nothing in it looks at the buyer.`),
  card('What is the difference between skimming and penetration?', 'Skimming launches <strong>high</strong> and comes down as the buyers who pay most run out; penetration launches <strong>low</strong> to win share and raises the price later. Skimming invites rivals in; penetration is hard to reverse.'),
  card('What makes pricing predatory rather than just low?', 'The price is set <strong>below cost</strong>, deliberately, to make the market unprofitable for a rival until it leaves. A low price from genuinely lower costs is competition working. Predatory pricing is restricted by competition law in many countries.'),
  card('Name the six factors that determine the most appropriate pricing strategy.', '<strong>Number of USPs/amount of differentiation</strong> · <strong>price elasticity of demand</strong> · <strong>level of competition in the business environment</strong> · <strong>strength of brand</strong> · <strong>stage in the product life cycle</strong> · <strong>costs and the need to make a profit</strong>.'),
  card('What do online sales and price comparison sites change about pricing?', 'They cut the <strong>cost of comparing prices</strong> to almost nothing, which raises price elasticity of demand and narrows the room every strategy depends on — and raises the value of everything a comparison site <strong>cannot</strong> sort on.'),
  card('Name the three distribution channels the specification lists.', '<strong>Four stage</strong>: producer to wholesaler to retailer to consumer. <strong>Three stage</strong>: producer to retailer to consumer. <strong>Two stage</strong>: producer to consumer.'),
  card('What does a shorter distribution channel actually change?', 'How much of the price reaches the <strong>producer</strong>, and how much of the <strong>work</strong> it does. It does not automatically mean a lower price for the consumer — whether any margin is passed on is a separate decision.'),
  card('Why do longer channels still exist?', 'Wholesalers and retailers do work the producer would otherwise pay for — <strong>holding stock, breaking bulk, reaching small buyers</strong> — and for a low-value product bought casually they do it more cheaply than the producer could.'),
  card('Name the main changes in distribution methods.', '<strong>Selling online</strong>; <strong>delivery</strong> instead of collection; supplying <strong>access</strong> rather than the object (subscriptions, streaming); and running <strong>several channels at once</strong>, which means competing with your own stockists.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
/*
 * structure-10 is a no-change observation: "Misconceptions are genuinely good … Not filler." The
 * substance of the fifteen it praises is carried forward rather than discarded — vague objectives,
 * the rigid life cycle, always-divest dogs, the 4Ps in isolation, points as loyalty, the design mix
 * as separate decisions, ethical costs, brand as logo, virality on demand, penetration for
 * everything, cost-only pricing and "direct is best" all survive, either here or as a subsection's
 * own misconception field.
 */
const mistake = (title, mistakeText, correction, examTip) => ({
  id: id('mistake', title), title, mistake: mistakeText, correction, examTip,
});

export const MISTAKES = [
  mistake('Treating Market Share and Revenue as the Same Objective',
    'Students write that a price cut which wins market share must also raise revenue, because more units were sold.',
    `Revenue is price times quantity, and a price cut moves both — one up, one down. On this section's figures a business sells ${units(qU(12))} bottles at ${money(12)} and ${units(qU(TODAY_P))} at ${money(TODAY_P)}, and the revenue is ${money(revU(12))} either way. Market share is largest at the lowest price; revenue peaks at ${money(U_REV_PEAK)}; profit peaks at ${money(U_PROFIT_PEAK)}. Three objectives, three prices.`,
    'Work the multiplication before saying which way revenue went. If the question names an objective, say which price that objective points at, and whether the other objectives point somewhere else.'),
  mistake('Reading the Product Life Cycle as a Timetable',
    'Students write that a product "must" be in decline because it has been on sale for several years, or that maturity lasts a fixed period.',
    'The cycle describes a pattern of sales, not a schedule. A fashion item can pass through all four stages in a season while a staple food stays in maturity for decades. A product is in the stage its sales say it is in, and the evidence is the direction sales are moving.',
    'Quote the sales figures in the extract before naming the stage. An answer that names a stage from the product\'s age has not used the data it was given.'),
  mistake('Withdrawing Every Dog',
    'Students see a product in the dog quadrant and recommend divesting it, every time, without looking at what it does for the business.',
    'A dog may cover its own costs, complete a range a retailer insists on stocking, or matter to buyers the business wants to keep. It may also be a former cash cow whose market is still large. The matrix raises the question; it does not answer it.',
    'Say which case this dog is before recommending anything, and name what the business would lose by dropping it as well as what it would save.'),
  mistake('Listing the Marketing Mix Instead of Mixing It',
    'Students describe product, then promotion, then price, then place, one at a time, and never connect them — which is exactly what the word "mix" warns against.',
    'A decision in one element constrains the other three. A premium product cannot be sold cheaply through a discount channel without the buyer reading the mismatch as a reason to distrust the claim. Asked to evaluate a marketing decision, the marks are in what the change FORCES elsewhere.',
    'After naming a change to one element, write one sentence on what each of the other three now has to be. That sentence is the difference between describing the mix and using it.'),
  mistake('Calling a Low Price a Unique Selling Point',
    'Students offer "it is the cheapest" as a USP, or as the differentiation factor in a pricing answer.',
    'A price is the easiest thing in any market to match, and matching it costs a rival nothing but margin. A selling point holds only where copying it would cost something real — a guarantee that has to be honoured, a material that has to be sourced, a service that has to be staffed.',
    'Test any claimed USP by asking what it would cost a rival to copy it by the end of the month. If the answer is "nothing", it is not a selling point and it will not support a price.'),
  mistake('Believing a Brand Must Raise Sales',
    'Students write that a successful brand-building campaign will increase the number of units sold, and judge the campaign a failure if sales are flat.',
    `A brand changes the SHAPE of demand rather than its level. On this section's figures both demand lines pass through the same ${money(TODAY_P)} and the same ${units(TODAY_Q)} bottles — today's sales are identical. What changed is that the rise to ${money(24)} costs ${units(qB(24) - qU(24))} fewer bottles than it would have without the brand — ${units(TODAY_Q - qB(24))} lost rather than ${units(TODAY_Q - qU(24))} — turning ${money(profitU(24))} of profit into ${money(profitB(24))}.`,
    'Judge brand spending by what happens when the price moves, not by this year\'s volume. A brand that lets a business hold a price rise has paid for itself without selling one extra unit.'),
  mistake('Thinking Cost Plus Guarantees a Profit',
    'Students write that cost plus pricing means the business cannot make a loss, because the mark-up is added to the cost.',
    `Cost plus guarantees a margin on each sale that is MADE. Nothing in the arithmetic asks whether buyers will pay the price it produces: ${money(UNIT_COST)} at ${MARKUPS[2]}% gives ${money(costPlus(MARKUPS[2]))} with exactly the same confidence as ${MARKUPS[0]}% gives ${money(costPlus(MARKUPS[0]))}. If the price is above what the market will pay, the margin is on nothing.`,
    'When an answer recommends cost plus, say what would tell the business its mark-up was wrong. That is the weakness the method has, and naming it is what turns knowledge into evaluation.'),
  mistake('Assuming a Shorter Channel Means a Cheaper Product',
    'Students write that cutting out the wholesaler or the retailer passes the saving on to the consumer.',
    `It passes more of the price to the PRODUCER. On this section's figures the four stage and three stage channels both reach the consumer at ${money(shelfOf(CHANNELS[1]))}; what differs is whether the producer keeps ${money(zolaKeeps(CHANNELS[0]))} or ${money(zolaKeeps(CHANNELS[1]))}. And the margin arrives with work attached — stock, payments, delivery and returns that the retailer used to absorb.`,
    'Separate two questions: what the consumer pays, and who keeps it. A channel answer that only discusses the shelf price has answered the wrong one.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */

export const EXTRAS = {
  chains: [
    {
      title: 'How a marketing objective becomes a price',
      steps: [
        'The business says which objective it is pursuing.',
        `Share points at the lowest price it will accept; revenue points at ${money(U_REV_PEAK)}; profit points at ${money(U_PROFIT_PEAK)}.`,
        'The pricing strategy is then chosen to reach that price.',
        'The rest of the mix is set so the price is credible.',
      ],
      result: 'A business that has not named its objective cannot price, because three objectives give three answers',
    },
    {
      title: 'How building a brand reaches the price list',
      steps: [
        'Spending on USPs, advertising, sponsorship and social media builds what buyers expect of the name.',
        `Demand becomes less sensitive to price: elasticity at ${money(TODAY_P)} moves from ${el(pedU(TODAY_P))} to ${el(pedB(TODAY_P))}.`,
        `A price rise now costs fewer sales, so ${money(24)} turns from a ${money(profitU(24))} outcome into ${money(profitB(24))}.`,
        `The profit-maximising price moves from ${money(U_PROFIT_PEAK)} to ${money(B_PROFIT_PEAK)}.`,
      ],
      result: 'Reduced price elasticity is the benefit; the premium price and the added value are its consequences',
    },
    {
      title: 'How a stage in the life cycle chooses a pricing strategy',
      steps: [
        'At introduction the product is new and rivals have nothing like it, so skimming or penetration fits.',
        'Through growth the early buyers run out and the price comes down in steps.',
        'In maturity rivals are established and little separates the products, so pricing becomes competitive.',
        'In decline the price is part of the choice between an extension strategy and withdrawal.',
      ],
      result: 'Stage in the product life cycle is one of the six pricing factors because the right strategy changes as the product ages',
    },
    {
      title: 'How a channel decision reaches the producer\'s margin',
      steps: [
        `Each stage buys from the one before and adds a mark-up: ${chainOf(CHANNELS[0]).map(money).join(' → ')} on the four stage route.`,
        `The consumer pays ${money(shelfOf(CHANNELS[0]))} — the same as through the three stage route.`,
        `But the producer receives ${money(chainOf(CHANNELS[0])[0])} rather than ${money(chainOf(CHANNELS[1])[0])}, so it keeps ${money(zolaKeeps(CHANNELS[0]))} instead of ${money(zolaKeeps(CHANNELS[1]))}.`,
        'The longer route buys reach: a wholesaler supplies retailers the producer could never sell to one at a time.',
      ],
      result: 'The channel decision is margin against reach, not a decision about what the consumer pays',
    },
    {
      title: 'How easy price comparison changes what a business invests in',
      steps: [
        'Online sales and comparison sites cut the cost of comparing prices to almost nothing.',
        'Substitutes become easy to find, so price elasticity of demand rises.',
        'The room to hold a price above a rival\'s narrows, and competitive pricing becomes closer to automatic.',
        'What a comparison site cannot sort on — a USP, a brand, a service — becomes the only place a gap can be held.',
      ],
      result: 'Easier comparison raises the value of everything that is not price',
    },
  ],
};
