/**
 * PACKET 49 — business-growth assessment: the quiz bank, the practice set, the flashcards, the common
 * mistakes and the extras.
 *
 * ── THE BANK ───────────────────────────────────────────────────────────────
 *
 * The live bank was 10 items, and 5 of them (economies of scale, diseconomies, overtrading twice,
 * external economies) tested what no subsection taught (`quiz-01..04`, `structure-01`). Every concept
 * below is taught in a subsection first, and every item is tagged with the chapter that teaches it; the
 * runner derives `quizIndices` from the tag (`topFix-01`, `structure-01`). Keys are written first and
 * DEALT into a position from a hash of the stem (packet 36); no explanation names an option by letter or
 * position, and every explanation says why each distractor is wrong (`quiz-04`).
 *
 *   - The live Disney/Fox item (a dated, real-firm example) is gone and the name is banned.
 *   - THE CHECK-IN RULE (CONTENT-GATE, 26 Sep). A block's pinned items are written about what that
 *     block's diagram does NOT show: chapter 1's diagram draws the six sources of economies of scale, so
 *     its pins are on market power, share, brand and profit, and the economy-naming items are the three
 *     unpinned pre-test items; chapter 3's draws the integration types, so its pins are on mergers versus
 *     takeovers and the reasons for them, and the integration-naming items sit in chapter 4 (spaced), whose
 *     diagram does not draw them; chapter 5's draws the cost curve, so its pins are on the causes of
 *     diseconomies, communication and overtrading.
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * DECISIONS.md Settled, 26 Sep 2026: practice is shaped like the real paper for the topic's unit. 3.3.2
 * is Unit 3 (WBS13): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and Sections B and C
 * are one 20-mark Evaluate essay each, from sources (`audit/raw/ial-paper-structure.json`,
 * business.units_3_4). So seven items on ONE source, `EXTRACT`.
 *
 *   - `practice-01`: the Ansoff Assess 10 is gone (Ansoff is 3.3.1; 10 is the Units 1-2 Assess tariff).
 *   - `practice-02`: the barriers-to-entry item is gone (not in bus_spec.txt; "Outline" is not IAL).
 *   - `topFix-05`: the two replacements the item names are both here, re-tariffed to the paper: an
 *     Explain 4 on a problem of growth, and "Assess the financial risks and rewards … of a takeover"
 *     at 12. Every item above 6 marks carries a levels scheme (Level 1-4 naming knowledge, application,
 *     analysis and evaluation). The CMA, "MegaRetail" and "southern England" are gone and banned.
 *   - The guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`,
 *     CONTENT-GATE step 6).
 *   - `Discuss` asks for a brief assessment and never a conclusion (V036).
 */
import { id, hash8, FIRM, sgd, sgdm, cents, units, pct } from './_packet49-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet49-content.mjs';

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
  qi(null, 'As a business grows, economies of scale mean that:',
    ['its cost per unit falls', 'its total costs fall', 'it must raise its prices', 'its profit must rise'],
    'Economies of scale describe a fall in the cost of each unit as output rises. Total costs still rise as the firm produces more, prices need not change, and lower unit costs raise profit only if prices and sales hold up.'),
  qi(null, 'A hospital group spreads the cost of one very expensive scanner across thousands of patients a year. This is:',
    ['a technical economy of scale', 'a purchasing economy of scale', 'an external economy of scale', 'a diseconomy of scale'],
    'Spreading the cost of large, specialised equipment over a high output is a technical economy. A purchasing economy comes from bulk-buying discounts, an external economy from the industry around the firm, and a diseconomy is a rise in unit cost.'),
  qi(null, 'Which of these is an external economy of scale?',
    ['a local college training workers for the whole industry', 'a bulk discount on the firm\'s raw materials', 'a lower interest rate on the firm\'s own loans', 'an advertising cost spread over more of its sales'],
    'An external economy comes from the industry growing in an area, such as a college that trains workers every nearby firm can hire. Bulk discounts, cheaper borrowing and spreading advertising all come from the firm\'s own size, so they are internal.'),

  /* ── Chapter 1: market power, share, brand, profit (the diagram draws the sources of economies) ── */
  qi(B1, 'A bakery chain buys half of everything its flour supplier produces. Which objective of growth does this most help it achieve?',
    ['market power over a supplier', 'brand recognition', 'an external economy of scale', 'a larger market share'],
    'A supplier that depends on one buyer for half its sales must accept that buyer\'s terms, which is market power over a supplier. Shoppers never see the flour contract, so brand recognition is unaffected; the saving comes from the firm\'s own size, so it is not external; and market share is measured by sales, not purchases.'),
  qi(B1, 'A firm sells S$36m a year in a market where S$240m is spent in total. Its market share is:',
    ['15%', '6.7%', '36%', '85%'],
    'Market share is the firm\'s sales divided by all sales in the market, times 100: 36 ÷ 240 × 100. Dividing the market by the firm\'s sales gives 6.7, a ratio rather than a share; 36 treats the sales figure itself as a percentage; and 85 is the share held by everyone else.'),
  qi(B1, 'Why might a firm that doubles its market share by cutting prices become less profitable?',
    ['the lower price may cut its profit on each sale', 'its brand becomes less well known', 'its cost per unit must rise', 'its suppliers gain power over it'],
    'Winning share with lower prices can shrink the profit made on every unit by more than the extra sales add. Selling more makes a brand better known, not less; higher output tends to lower unit costs; and a bigger buyer gains power over suppliers rather than losing it.'),
  qi(B1, 'Brand recognition helps a growing firm mainly because:',
    ['shoppers tend to choose names they already know', 'it lowers the cost of its raw materials', 'it removes the need to advertise', 'it lets the firm borrow more cheaply'],
    'A familiar name wins customers who would not risk an unknown one, which supports sales and prices. It does not change what inputs cost, a firm still has to advertise to keep its name familiar, and cheaper borrowing is a financial economy of scale.'),

  /* ── Chapter 2: organic growth (the diagram draws the four routes) ── */
  qi(B2, 'Which of these is a disadvantage of organic growth?',
    ['it is limited by the finance the firm can generate', 'it means absorbing another firm\'s workforce', 'it usually involves paying a premium', 'it removes a competitor from the market'],
    'Organic growth moves only as fast as the firm\'s own profit and borrowing allow. Absorbing a workforce and paying a premium are features of a takeover, and removing a rival is an advantage a takeover can bring, not a drawback of growing from within.'),
  qi(B2, 'Why is organic growth usually described as lower-risk than a takeover?',
    ['each step builds on what the firm already knows', 'it is always financed by borrowing', 'it guarantees economies of scale', 'rivals cannot copy it'],
    'Growing from within extends the firm\'s existing products, sites and skills one step at a time, so each step is easier to judge and to stop. It is often funded from retained profit rather than loans, it guarantees nothing about unit costs, and rivals can copy a new product or outlet.'),
  qi(B2, 'A market is growing fast and rivals are buying the best sites. The main danger of growing only organically is that the firm:',
    ['is left too small to compete', 'changes its culture too quickly', 'pays too much for its growth', 'loses control of its new sites'],
    'Organic growth is slow, so in a fast-moving market a firm that relies on it can be outgrown and lose the best locations. A culture changes little when no other workforce is absorbed, overpaying is a takeover risk, and control is exactly what organic growth keeps.'),

  /* ── Chapter 3: mergers and takeovers (the diagram draws the integration types) ── */
  qi(B3, 'What is the main difference between a merger and a takeover?',
    ['a takeover is one firm buying control of another', 'a merger always joins firms in different industries', 'a takeover must be agreed by both boards', 'a merger is paid for with borrowed money'],
    'In a takeover one business buys over half of another\'s voting shares, while a merger is an agreed combination of roughly equal partners. Mergers can join firms in the same industry, a hostile takeover goes ahead without the target board\'s agreement, and neither is defined by how it is financed.'),
  qi(B3, 'A company buys 55% of a rival\'s voting shares after the rival\'s directors rejected its offer. This is:',
    ['a hostile takeover', 'a friendly takeover', 'a merger', 'organic growth'],
    'Buying control against the wishes of the target\'s directors is a hostile takeover. A friendly takeover has the directors\' support, a merger is agreed by both sides as equals, and buying another business is inorganic, not organic, growth.'),
  qi(B3, 'Why does a takeover bidder usually offer more than the target\'s shares were trading at?',
    ['to persuade enough owners to sell', 'because the law sets a minimum premium', 'to cut the interest on its loans', 'to avoid gaining economies of scale'],
    'Owners have no reason to sell for what they could already get on the market, so the bidder offers a premium to win over enough of them. No law fixes the premium, paying more raises rather than cuts the finance needed, and economies of scale are something a buyer wants, not avoids.'),
  qi(B3, 'Which is most likely to be the main reason for a conglomerate takeover?',
    ['to spread risk across unrelated markets', 'to secure supplies of raw materials', 'to remove a direct competitor', 'to gain large purchasing economies'],
    'A conglomerate joins businesses with no link in the chain of production, so its chief gain is that a slump in one market is offset by the others. Securing supplies is backward vertical integration, removing a competitor is horizontal, and unrelated businesses share few inputs to buy in bulk.'),
  qi(B3, 'Which is most likely to stop a takeover delivering the savings expected from it?',
    ['the two workforces refuse to adopt one way of working', 'the buyer pays for it from retained profit', 'the target has a well-known brand', 'the market is growing quickly'],
    'Savings come from running the two businesses as one, which fails if staff keep working in their old, incompatible ways. Paying from retained profit avoids interest, a strong brand is part of what is bought, and a growing market helps rather than hinders the combined firm.'),

  /* ── Chapter 4: risks and rewards (the diagram lists them, with no figures and no integration types) ── */
  qi(B4, 'A firm pays S$50m for a business whose net assets are worth S$35m. The premium it pays is:',
    ['S$15m', 'S$85m', 'S$35m', 'S$50m'],
    'The premium is the price paid less the value of the net assets bought: 50 − 35. Adding the two figures gives 85, and the other two options are simply the asset value and the price, neither of which is the amount paid above what the business is worth.'),
  qi(B4, 'A takeover paid for by issuing new shares to outside investors mainly risks:',
    ['diluting the existing owners\' control', 'a rise in the interest the firm must pay', 'the loss of the target\'s brand', 'a fall in the firm\'s market share'],
    'New shares mean the existing owners hold a smaller part of the business, and so a smaller say and a smaller share of profit. Interest arises from borrowing, not from selling shares, and neither the target\'s brand nor the buyer\'s market share is lost by the choice of finance.'),
  qi(B4, 'A bakery buys the mill that supplies its flour. This is:',
    ['backward vertical integration', 'forward vertical integration', 'horizontal integration', 'conglomerate integration'],
    'The mill is an earlier stage of the same chain, so buying it moves the bakery back towards its raw materials. Forward integration would move towards the customer, horizontal would join another bakery, and a conglomerate deal would join an unrelated business.'),
  qi(B4, 'A drinks maker\'s takeover of a chain of bars that stock its drinks is:',
    ['forward vertical integration', 'backward vertical integration', 'horizontal integration', 'conglomerate integration'],
    'The bars are a later stage of the chain, between the drinks maker and the consumer, so the move is forward. Backward would mean buying a supplier, horizontal another drinks maker, and conglomerate a business outside the chain.'),
  qi(B4, 'A firm borrows S$5m to build a second factory of its own. This growth is:',
    ['organic, because it builds the capacity itself', 'inorganic, because it is paid for with a loan', 'inorganic, because it adds a new site', 'horizontal integration'],
    'Whether growth is organic depends on how the capacity is obtained, not how it is financed: the firm builds the factory itself. A loan or a new site does not make growth inorganic, and integration means joining with another business, which has not happened here.'),

  /* ── Chapter 5: problems arising from growth (the diagram draws the cost curve only) ── */
  qi(B5, 'Which of these is a cause of diseconomies of scale?',
    ['messages passing through more layers of management', 'bulk discounts on raw materials', 'cheaper loans from banks', 'spreading advertising over more sales'],
    'More layers slow and distort communication, one of the problems that can push cost per unit up in a large firm. Bulk discounts, cheaper loans and spreading advertising are all economies of scale, which push cost per unit down.'),
  qi(B5, 'Adding layers of management to a growing firm is most likely to:',
    ['slow decisions as messages pass through more people', 'lower the cost of each unit it produces', 'raise the motivation of front-line staff', 'reduce the need for internal communication'],
    'Each extra layer is another point where information waits or is misread, so decisions take longer. It adds cost rather than lowering it, tends to leave front-line staff feeling further from those who decide, and increases the communication needed.'),
  qi(B5, 'Staff at a firm with 20,000 employees say their effort goes unnoticed, and absence is rising. This is a diseconomy caused by:',
    ['poor motivation', 'poor coordination', 'bulk purchasing', 'overtrading'],
    'Feeling like an unnoticed part of a huge organisation lowers effort and raises absence, which is the motivation problem of size. Coordination is about keeping departments working to one plan, bulk purchasing lowers costs, and overtrading is a shortage of cash.'),
  qi(B5, 'Which action would best help a fast-growing firm avoid overtrading?',
    ['arranging extra finance before it expands', 'giving its customers longer to pay', 'buying extra stock well in advance', 'recruiting staff ahead of new orders'],
    'Overtrading is a shortage of cash to fund growth, so securing finance before expanding closes the gap. Longer credit for customers delays cash coming in, while buying stock early and recruiting ahead of orders both pay cash out sooner, and all three make the shortage worse.'),
  qi(B5, 'A firm\'s sales and profit are rising fast, but it cannot pay its suppliers on time. The most likely explanation is that:',
    ['it pays out for growth before customers pay it', 'its products have become unprofitable', 'it has too few customers', 'its prices are too high to sell'],
    'Growth means paying for materials, wages and premises before the revenue from the extra sales arrives, so a profitable firm can run short of cash. Rising profit rules out unprofitable products, and rising sales rule out too few customers or prices that do not sell.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

/*
 * THE SOURCE. One extract carries every item, so a student meets the same firm seven times. Every
 * figure the items need is here. The Calculate item's two unit costs are printed ONLY here: no body,
 * notes, diagram, flashcard or recall carries S$0.80, S$0.62 or 22.5% (the runner checks).
 */
export const EXTRACT = `Source A. ${F.name} is a chain of ${units(F.cafes)} bakery-cafés in ${F.home} with ${units(F.staff)} staff and a central bakery that supplies every café. Last year its sales were ${sgdm(F.sales)} and its profit ${sgdm(F.profit)}, and it held ${pct(F.share)} of the country's bakery-café market. The central bakery makes ${units(F.loavesNow)} loaves a day at a cost of ${cents(F.unitCostNow)} a loaf; new ovens would let it make ${units(F.loavesAfter)} a day at ${cents(F.unitCostAfter)} a loaf. The directors are choosing between two ways to grow. Plan A is to open ${units(F.newCafes)} cafés over two years, each costing ${sgd(F.fitOut)}, paid for from retained profit. Plan B is to take over ${F.rival}, a rival with ${units(F.rivalCafes)} cafés and ${pct(F.rivalShare)} of the market, for ${sgdm(F.price)}. ${F.rival}'s net assets are worth ${sgdm(F.netAssets)} and it makes a profit of ${sgdm(F.rivalProfit)} a year; combining the two chains is expected to save ${sgdm(F.savings)} a year. ${F.name} would borrow ${sgdm(F.borrowed)} of the price at ${pct(F.rate)} a year. After the takeover the business would have ${units(F.staffAfter)} staff and ${units(F.layersAfter)} layers of management instead of ${units(F.layersNow)}. ${F.name} has also agreed to sell frozen dough to supermarkets, which pay ${units(F.customerDays)} days after delivery, while its flour supplier, ${F.mill}, must be paid within ${units(F.supplierDays)} days. The mill, which ${F.name} pays ${sgdm(F.flourBill)} a year, is for sale.`;

export const PRACTICE = [
  pr(B1, 'Calculate', 4, `${EXTRACT} Calculate the percentage fall in the cost of a loaf at ${F.name}'s central bakery if it installs the new ovens. (4 marks)`,
    'Find the fall in the cost of one loaf first, then express it as a percentage of the ORIGINAL cost, not the new one. Show each step on its own line and give the answer to one decimal place with its unit.\n'
    + `Fall in cost per loaf: ${cents(F.unitCostNow)} − ${cents(F.unitCostAfter)} = ${cents(F.unitCostNow - F.unitCostAfter)} (1 mark). Divide by the original cost: ${cents(F.unitCostNow - F.unitCostAfter)} ÷ ${cents(F.unitCostNow)} (1 mark). Multiply by 100 (1 mark). Answer: ${pct(F.unitCostFallPct)} (1 mark). Dividing by the new cost of ${cents(F.unitCostAfter)} gives about 29%, which overstates the fall.`),

  pr(B2, 'Explain', 4, `${EXTRACT} Explain one disadvantage to ${F.name} of growing organically through Plan A. (4 marks)`,
    'The question asks for ONE disadvantage, so choose the one the source gives most evidence for and develop it rather than listing several. Say what the disadvantage is, show it with the source, and explain what it means for the business.\n'
    + `Knowledge: a disadvantage of organic growth, such as its slow pace or its dependence on the firm's own finance (1 mark). Application: Plan A adds ${units(F.newCafes)} cafés over two years, reaching ${units(F.cafesAfterOrganic)}, while Plan B would reach ${units(F.cafesAfterTakeover)} at once (1 mark). Analysis: while ${F.name} grows café by café, ${F.rival} remains a rival competing for the same customers and sites (1 mark). Analysis: so ${F.name} gains market share and economies of scale more slowly, which may leave it weaker against rivals that grow faster (1 mark). An answer that lists advantages of Plan B without a disadvantage of Plan A scores the knowledge mark at most.`),

  pr(B3, 'Discuss', 8, `${EXTRACT} Discuss the likely benefits to ${F.name} of taking over ${F.mill}. (8 marks)`,
    'Start by identifying what kind of integration this is, then work out what owning its supplier would give the business. Think about how certain each benefit is, and leave space for a brief assessment of how much they matter.\n'
    + `Level 1: describes takeovers or integration in general terms, with little use of the source. Level 2: identifies backward vertical integration and a benefit, with some application: ${F.name} spends ${sgdm(F.flourBill)} a year on flour from the mill. Level 3: analysis of benefits: the mill's profit margin on that flour stays inside ${F.name}; supply of its main input is secured as it grows; quality can be controlled; and flour is no longer bought on 30-day terms from an outside supplier, easing the cash pressure of the supermarket deal. Level 4: a brief assessment weighing these, for example that the benefits depend on how much of the ${sgdm(F.flourBill)} is the mill's margin, and that running a mill needs skills a café chain may lack. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B4, 'Assess', 12, `${EXTRACT} Assess the financial risks and rewards to ${F.name} of taking over ${F.rival}. (12 marks)`,
    'Use the source to put figures on both the rewards and the risks, then weigh them against each other. Think about which figures are certain and which depend on things going to plan, because this command word needs a supported judgement rather than a list.\n'
    + `Level 1: knowledge of the risks or rewards of a takeover, described generally. Level 2: application to ${F.name}: the premium is ${sgdm(F.price)} − ${sgdm(F.netAssets)} = ${sgdm(F.premium)}; interest is ${pct(F.rate)} of ${sgdm(F.borrowed)} = ${sgdm(F.interest)} a year; the yearly gain is ${sgdm(F.rivalProfit)} + ${sgdm(F.savings)} − ${sgdm(F.interest)} = about ${sgdm(F.yearlyGain)}. Level 3: analysis of both sides: rewards include ${F.rival}'s profit, the savings from one central bakery and bulk flour buying, and a market share of ${pct(F.shareAfter)} that strengthens its position with suppliers; risks include losing the ${sgdm(F.premium)} premium if the savings do not arrive, interest that must be paid even if sales fall, and higher gearing. Level 4: evaluation reaching a supported judgement, for example that the rewards outweigh the risks only if the ${sgdm(F.savings)} of savings is achieved, which depends on combining the two chains smoothly.\n`
    + `A strong answer, in outline: the yearly gain of about ${sgdm(F.yearlyGain)} looks attractive against a ${sgdm(F.profit)} profit, but part of it rests on savings that are only expected, while the premium and the interest are certain; so the deal is financially sound only if the two chains can be combined as planned.`),

  pr(B5, 'Assess', 12, `${EXTRACT} Assess the likely problems ${F.name} may face as a result of growing to ${units(F.cafesAfterTakeover)} cafés through Plan B. (12 marks)`,
    'Pick out the problems of growth the source gives evidence for, explain how each would affect costs, decisions or cash, and consider how serious and how avoidable each one is. Decide which problem is most important before you write.\n'
    + `Level 1: knowledge of problems arising from growth, described generally. Level 2: application to ${F.name}: staff rise from ${units(F.staff)} to ${units(F.staffAfter)} and management layers from ${units(F.layersNow)} to ${units(F.layersAfter)}; supermarkets pay after ${units(F.customerDays)} days while flour is paid for within ${units(F.supplierDays)}. Level 3: analysis: more layers slow and distort internal communication, so café problems reach decision-makers later; a larger, two-brand workforce is harder to coordinate and motivate, so diseconomies of scale may raise cost per unit; and paying suppliers and interest before supermarkets pay could leave the firm short of cash, a risk of overtrading. Level 4: evaluation reaching a supported judgement, for example that overtrading is the most urgent risk because it can stop the firm paying its bills, but that it is also the most avoidable, by arranging finance before expanding.\n`
    + 'A strong answer, in outline: communication and diseconomies will raise costs gradually, while a cash shortage could strike quickly; so the most serious problem is overtrading, unless the firm secures extra finance first.'),

  pr(B4, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.name} should grow organically through Plan A or by taking over ${F.rival} through Plan B. (20 marks)`,
    'Work out what each plan would give the business and what each would cost or risk, using the source. Then weigh the speed and size of Plan B against the control and lower risk of Plan A, and finish with a judgement that says what the choice depends on.\n'
    + `Level 1: describes organic and inorganic growth in general terms. Level 2: knowledge and application: Plan A adds ${units(F.newCafes)} cafés for ${sgdm(F.organicCost)} from retained profit, with no debt; Plan B adds ${units(F.rivalCafes)} cafés and ${pct(F.rivalShare)} of the market at once for ${sgdm(F.price)}, including a ${sgdm(F.premium)} premium and ${sgdm(F.borrowed)} of borrowing. Level 3: analysis of both sides: Plan B brings market share, market power and economies of scale in the central bakery sooner, and removes a rival; but the premium may not be recovered, interest of ${sgdm(F.interest)} a year is payable whatever happens, and combining two workforces may cause diseconomies and communication problems. Plan A keeps control and culture but is slower. Level 4: evaluation reaching a supported judgement, for example that Plan B is better only if the expected ${sgdm(F.savings)} of yearly savings is achieved and rivals are competing hard for sites; otherwise Plan A delivers most of the gain for far less risk.\n`
    + 'A strong answer, in outline: Plan B is faster and bigger, Plan A safer and cheaper; the takeover is worth its premium and debt only if the savings from combining arrive, so the decision turns on how well the two chains would fit together.'),

  pr(B5, 'Evaluate', 20, `${EXTRACT} Evaluate whether growth is likely to increase ${F.name}'s profitability. (20 marks)`,
    'Consider the ways the source suggests growth could raise profit and the ways it could hold profit back or cut it. Weigh the two, using figures from the source where you can, and finish with a judgement that says what the outcome depends on.\n'
    + `Level 1: describes the objectives or problems of growth in general terms. Level 2: knowledge and application: new ovens would cut the cost of a loaf from ${cents(F.unitCostNow)} to ${cents(F.unitCostAfter)}; a takeover would add ${sgdm(F.rivalProfit)} of profit and ${sgdm(F.savings)} of savings but cost ${sgdm(F.interest)} a year in interest. Level 3: analysis of both sides: economies of scale in the central bakery and bulk flour buying lower cost per unit, and a larger market share gives power over suppliers and a better-known brand; against this, more layers of management and a bigger workforce risk diseconomies of scale, and the gap between paying suppliers and being paid by supermarkets risks overtrading. Level 4: evaluation reaching a supported judgement, for example that growth is likely to raise profitability while the business stays close to its lowest cost per unit, provided it manages communication across the larger business and arranges finance to cover the cash gap.\n`
    + 'A strong answer, in outline: economies of scale and market power push profitability up, diseconomies and financing costs push it down; the balance is likely to be positive for this business, but only if the problems of size are managed as it grows.'),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What are economies of scale?', 'The fall in cost per unit as a business grows and its output rises.'),
  fc('Do economies of scale lower total cost?', 'No. Total costs rise with output; it is the cost of each unit that falls.'),
  fc('Name the five internal economies of scale.', 'Purchasing, technical, managerial, financial and marketing.'),
  fc('What is a purchasing economy of scale?', 'A lower price per unit of input, won by buying in bulk.'),
  fc('What is a technical economy of scale?', 'Using larger, more efficient equipment whose cost is spread over a large output.'),
  fc('What is a financial economy of scale?', 'A large firm can borrow more cheaply, because lenders see it as less risky.'),
  fc('What are external economies of scale?', 'Cost savings from the growth of the whole industry in an area: skilled labour, specialist suppliers, shared infrastructure.'),
  fc('Name the four objectives of growth.', 'Economies of scale; market power over customers and suppliers; market share and brand recognition; profitability.'),
  fc('How does growth give market power over suppliers?', 'A large buyer\'s orders matter so much to its suppliers that they accept lower prices or longer payment terms.'),
  fc('How is market share calculated?', 'The firm\'s sales ÷ total sales in the market × 100.'),
  fc('What is organic growth?', 'Expanding from within, using the firm\'s own resources: new outlets, capacity, products, markets or online sales.'),
  fc('What is inorganic growth?', 'Expanding by joining with another business, through a merger or a takeover.'),
  fc('Is a new factory built with a bank loan organic growth?', 'Yes. The route decides it, not the finance: the firm builds the capacity itself.'),
  fc('Give two advantages and two disadvantages of organic growth.', 'For: control is kept, and each step is lower-risk. Against: it is slow, and limited by the firm\'s own finance.'),
  fc('What is the difference between a merger and a takeover?', 'A merger is an agreed combination of roughly equal firms; a takeover is one firm buying over half of another\'s voting shares.'),
  fc('What is a hostile takeover?', 'A takeover the target\'s directors oppose, won by appealing to the shareholders directly.'),
  fc('Give four reasons for mergers and takeovers.', 'Speed; market power and share; cost savings from combining; gaining products, skills or markets (also securing supplies or outlets, and spreading risk).'),
  fc('What is horizontal integration?', 'Combining two firms at the same stage of production in the same industry.'),
  fc('What is backward vertical integration?', 'Buying a firm at an earlier stage of the chain, such as a supplier, moving towards the raw materials.'),
  fc('What is forward vertical integration?', 'Buying a firm at a later stage of the chain, such as a distributor or retailer, moving towards the consumer.'),
  fc('What is a conglomerate?', 'A business made up of firms in unrelated markets. It spreads risk but shares few cost savings.'),
  fc('What is the premium in a takeover?', 'The amount paid above the value of the target\'s net assets, or above its share price before the bid.'),
  fc('Name three financial risks of a takeover.', 'Paying too much; interest and higher gearing if it is financed by borrowing; savings from combining that never arrive.'),
  fc('Give two advantages and two disadvantages of inorganic growth.', 'For: fast, and brings market share and skills at once. Against: costly, and hard to integrate two businesses.'),
  fc('What are diseconomies of scale?', 'A rise in cost per unit when a firm grows too large, from weaker coordination, communication and motivation.'),
  fc('Why does growth make internal communication harder?', 'More layers of management, more people and sites, and more specialist departments slow messages and distort them.'),
  fc('What is overtrading?', 'Expanding faster than working capital can support, so the firm runs short of cash even while profitable.'),
  fc('How can a growing firm avoid overtrading?', 'Forecast cash flow, grow in steps, arrange finance before expanding, and manage credit terms with customers and suppliers.'),
];

/* ══ Common mistakes — the fields lib/mistakes-shape.js reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Confusing organic and inorganic growth',
    'Calling any expansion paid for with a loan inorganic, or any quick expansion a takeover.',
    'The route decides it: building new capacity yourself is organic, however it is financed; joining with another business through a merger or takeover is inorganic.',
    'Quote the evidence in the case that shows whether the business built the capacity itself or acquired it.'),
  mk('Mixing up the types of integration',
    'Calling a takeover of a supplier horizontal because the two firms already work together.',
    'Horizontal means the same stage of production. A supplier sits at an earlier stage, so buying it is backward vertical; buying a distributor or retailer is forward vertical.',
    'Place both firms on the chain from raw materials to consumer before naming the type, as the chapter\'s diagram does.'),
  mk('Saying economies of scale lower total costs',
    'Writing that a bigger firm has lower costs because of economies of scale.',
    'Total costs rise as output rises. Economies of scale lower the cost of each unit, and only up to the point where diseconomies set in.',
    'Always write "cost per unit" or "average cost" when you explain an economy of scale.'),
  mk('Forgetting that profitable firms can overtrade',
    'Assuming only loss-making firms run out of cash.',
    'Growing firms pay for materials, wages and premises before the revenue from their extra sales arrives, so a profitable business can run out of cash.',
    'Show the timing gap from the case: when the firm pays out and when its customers pay.'),
  mk('Judging a takeover only by the target\'s profit',
    'Arguing that a takeover is a good idea because the target is profitable.',
    'The target\'s profit and the savings from combining have to be weighed against the price, including any premium, and the cost of financing the deal.',
    'Where the case gives figures, set the yearly gain (profit plus savings, less interest) against the price paid.'),
  mk('Blaming every failed takeover on culture clash',
    'Stating that takeovers fail because of culture clash, and stopping there.',
    'Culture clash is one reason among several. Overpaying, overestimating the savings and poor planning of the integration are just as common.',
    'Name the reason the case gives evidence for, and explain how it would reduce the savings or raise the costs of the deal.'),
  mk('Stating that growth is always beneficial',
    'Arguing that growth is good for a business without weighing its problems.',
    'Growth can bring diseconomies of scale, harder internal communication and overtrading, each of which can wipe out the benefits of size.',
    'Balance the objectives of growth against the problems it brings, and say what the outcome depends on for this business.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The first chain is what the one reorder drills (`reorder.source` finds a sequence the section teaches
 * in an extras chain, in the same order). It sits on the Extras tab, not on the recall's own step, so
 * the recall is not answerable by scrolling up. ExtrasTab prints evaluation `content` as plain text, so
 * no evaluation paragraph carries Markdown (packet 51's Verify B step 29).
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From choosing a target to the savings a takeover promises',
      steps: [
        'A buyer picks out a rival worth owning.',
        'It bids for the shares at a price above their market value.',
        'Enough owners sell, and control passes to the buyer.',
        'The two firms merge their offices, buying and systems.',
        'Costs fall below what the two firms spent apart.',
      ],
      result: 'Every stage before the last costs money for certain; the saving at the end is only expected.',
    },
    {
      title: 'How economies of scale lower cost per unit',
      steps: [
        'The business grows and its output rises.',
        'It buys in bulk and uses larger, more efficient equipment.',
        'Fixed costs such as head office and advertising are shared across more units.',
        'Cost per unit falls.',
      ],
      result: 'Lower unit costs let the firm cut prices or earn a wider margin.',
    },
    {
      title: 'How diseconomies of scale erode the gains of growth',
      steps: [
        'The business keeps growing, adding sites, staff and layers of management.',
        'Messages slow down and coordination weakens.',
        'Staff feel distant from decisions, and effort falls.',
        'Cost per unit starts to rise.',
      ],
      result: 'Past some size, the costs of managing the business outweigh the savings from its scale.',
    },
    {
      title: 'How a profitable firm runs out of cash',
      steps: [
        `${F.name} wins supermarket orders for frozen dough.`,
        `It pays ${F.mill} for extra flour within ${units(F.supplierDays)} days.`,
        `The supermarkets pay ${units(F.customerDays)} days after delivery.`,
        'Cash runs short while the orders are still profitable.',
      ],
      result: 'The faster the orders grow, the larger the gap that has to be financed.',
    },
  ],
  evaluation: [
    {
      title: 'Is bigger always better?',
      content: `Not always. Growth lowers cost per unit while economies of scale outweigh the problems of size, and it gives market power, share and brand recognition. But beyond some point, weaker coordination, slower communication and falling motivation push cost per unit back up, and growing too fast can leave a profitable firm short of cash. For ${F.name}, a central bakery supplying ${units(F.cafesAfterTakeover)} cafés should lower the cost of each loaf, but ${units(F.layersAfter)} layers of management and ${units(F.staffAfter)} staff under two brands make the business harder to run. The judgement depends on whether the firm can manage its larger size well enough to keep the savings.`,
    },
    {
      title: 'Organic or inorganic growth?',
      content: `Organic growth keeps control, keeps the culture and avoids a premium, but it is slow and limited by the firm's own profit. Inorganic growth brings size, share and skills at once, but costs more, carries more risk and must combine two businesses. For ${F.name}, Plan A reaches ${units(F.cafesAfterOrganic)} cafés in two years without debt; Plan B reaches ${units(F.cafesAfterTakeover)} at once, with a ${sgdm(F.premium)} premium and ${sgdm(F.borrowed)} of borrowing. The takeover is the better route only where speed matters more than control and the savings from combining are likely to be achieved.`,
    },
    {
      title: 'Are takeovers worth the risk?',
      content: `The rewards of a takeover, the target's profit and the savings from combining, arrive over years and are not guaranteed. Much of the risk, the premium and the debt, is fixed on the day the deal is signed. A takeover is most likely to pay where the buyer knows the target's market well, pays a price close to what the business is worth, and has a clear plan for combining the two workforces. Where any of those is missing, the premium is often lost.`,
    },
  ],
};
