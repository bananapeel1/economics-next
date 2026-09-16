/**
 * PACKET 20 — types-sizes-businesses: quiz, practice, flashcards, common mistakes, extras.
 *
 * Quiz: 34 items, every one on material the Learn Mode body now teaches, 31 reachable through a
 * block's quizIndices and exactly three left unpinned — and those three FIRST in the array, because a
 * signed-out student is sent only PREVIEW_LIMITS.quiz items and PreTest.jsx slices whatever it is
 * given (packet 16). The March bank had 10 items of which 4 were reachable, and two of those tested
 * material the section never taught: co-operatives and constraints on growth (quiz-01, structure-06).
 * Both are now taught, so both questions stand — the fix was to the content, not to the bank.
 * All ten March ids are kept; `33b5aa78` is re-worded only to drop "public limited company (plc)",
 * which is not a term in the IAL Economics specification.
 *
 * Practice: IAL ECONOMICS command words and their own tariffs from Appendix 6 — Define 2,
 * Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. There is no Assess
 * and no 10-mark tariff in this subject, so the March `Assess 10` on the principal-agent problem is
 * not re-tariffed but re-commanded as an Examine (8); its id survives. `Define 4` becomes `Define 2`
 * and `Explain 6` becomes `Explain 4`, which is topFix-05's tariff clause. Guidance above 6 marks is
 * levels-shaped and allocates no points. All five March practice ids are kept.
 */
import { id, FIRM, price, total, units, arAt, mrAt, acAt, trAt, tcAt, profitAt, A, B, MC, FIXED, Q_PROFIT, Q_REVENUE, Q_VOLUME, SIZE_FIRMS } from './_packet20-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet20-content.mjs';

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation, keptId?]
const Q = [
  /* ══ unpinned: the pre-test, FIRST in array order ══════════════════════════
   * PreTest.jsx takes the first three items no block has reserved, in array order (F079). They sit
   * FIRST because a free or signed-out student's quiz is sliced server-side (F086): with the unpinned
   * items at the END, the items that student received were PINNED ones, so the pre-test asked a
   * question a chapter check-in asked again minutes later. One from types, one from growth and one
   * from objectives, so the three sample the whole section.
   */
  [null, 'A business owned by its members, in which each member has one vote regardless of how much capital they have contributed, is:',
    ['A joint venture', 'A not-for-profit organisation', 'A state-owned enterprise', 'A co-operative'], 3,
    'One member, one vote is the defining feature of a co-operative, and it is what stops control following capital. A joint venture is jointly owned by parent firms in proportion to their stakes, and a not-for-profit is defined by what happens to its surplus rather than by how it votes.'],
  [null, 'A supermarket chain buys the farm that supplies its vegetables. This is an example of:',
    ['Forward vertical integration', 'Horizontal integration', 'Backward vertical integration', 'Conglomerate integration'], 2,
    'The supermarket has moved back along its own supply chain towards the source of its inputs, which is backward vertical integration. Forward would mean moving towards the final customer, and horizontal would mean buying another supermarket at the same stage.'],
  [null, 'The divorce of ownership from control matters for business objectives because:',
    ['Owners and managers may pursue different objectives', 'Managers are legally prevented from owning shares', 'Owners always know more about the firm than managers do', 'It removes the need for the firm to make a profit'], 0,
    'The separation puts the firm in the hands of agents whose objectives — size, growth, security — are not the owners\' objective of profit, and the owners cannot fully observe what the agents do. Managers commonly do hold shares, and the information advantage runs the other way.'],

  /* ══ Block 1 — Types of Business ══ */
  [B1, 'A state-owned enterprise is best defined as an organisation that is:',
    ['Used mainly by members of the public', 'Owned by the government on behalf of citizens', 'Not permitted to charge for its services', 'Required to make a loss'], 1,
    'The public sector is defined by state ownership, not by who its customers are or what it charges. A supermarket serves the public and is private; a state-owned enterprise may charge for what it provides and may cover its costs.'],
  [B1, 'The distinction between a for-profit and a not-for-profit organisation rests on:',
    ['Whether it earns more than it spends', 'Whether it employs paid staff', 'Where any surplus may go', 'Whether it is owned by the government'], 2,
    'A not-for-profit may run a surplus and generally must, or it would close. What it cannot do is distribute that surplus to owners: it is retained for the organisation\'s purpose. Both types employ paid staff and both may be privately owned.'],
  [B1, 'Two firms create a separate company to develop a new aircraft engine, while continuing to trade independently in every other market. This is:',
    ['A merger', 'A demerger', 'A takeover', 'A joint venture'], 3,
    'A joint venture creates a new jointly-owned organisation for one purpose and leaves both parents standing. A merger or takeover would combine the firms themselves, and a demerger splits one firm rather than bringing two together.'],
  [B1, 'Which of the following is NOT a reason firms form joint ventures?',
    ['Sharing the cost of a project too large for one firm', 'Combining expertise neither firm has alone', 'Gaining access to a market that is otherwise closed', 'Removing a competitor from the market'], 3,
    'Removing a competitor is the gain from horizontal integration, where the two firms actually combine. In a joint venture both parents remain independent and may still compete with each other everywhere outside the venture.'],
  [B1, 'A co-operative distributes its surplus to members mainly in proportion to:',
    ['The capital each member has contributed', 'How much each member has traded with it', 'How long each member has belonged', 'The number of votes each member holds'], 1,
    'Benefit follows use in a co-operative, just as ownership and control do. Distributing in proportion to capital is what a company does, and every member holds exactly one vote, so votes cannot vary at all.',
    'types-sizes-businesses:quiz:33b5aa78'],

  /* ══ Block 2 — The Size of Businesses ══ */
  [B2, 'A refinery employs few people but uses a great deal of capital, while a cleaning contractor employs thousands and owns very little. This shows that:',
    ['Measures of business size can rank the same firms differently', 'The refinery is the smaller business', 'Capital employed is the only valid measure of size', 'Neither firm is a large corporation'], 0,
    'Employees and capital employed put these two firms in opposite orders, which is why an answer has to say which measure it is using. Neither measure is the correct one; they measure different things.'],
  [B2, 'Which of the following is NOT one of the usual measures of the size of a business?',
    ['Number of employees', 'Turnover', 'Capital employed', 'Age of the business'], 3,
    'The age of a business says nothing about how large that business is: a new firm can be very large and an old one very small. Number of employees, turnover, capital employed and market share are the measures in use.'],
  [B2, 'A firm restoring antique clocks remains small mainly because:',
    ['Its owner lacks ambition', 'Regulation prevents it from expanding', 'It cannot obtain any finance at all', 'The size of its market is limited'], 3,
    'There is a limited number of antique clocks and of people wanting them restored, so growth has nowhere to go however the firm is run. The other options describe different constraints, none of which the example gives any evidence for.'],
  [B2, 'Which of the following is a reason firms grow rather than a reason they stay small?',
    ['Demand is for a personal service delivered face to face', 'The owner prefers to keep control of the business', 'Fixed costs can be spread over a larger output', 'The market is a small and specialised niche'], 2,
    'Spreading fixed costs over more units lowers the cost each unit carries, which is the clearest argument for growing. The other three are reasons firms tend to remain small.'],

  /* ══ Block 3 — How Businesses Grow ══ */
  [B3, 'Horizontal integration is best described as a merger or takeover between firms:',
    ['At the same stage of production in the same industry', 'At different stages of the same supply chain', 'In completely unrelated markets', 'Of very different sizes within the same industry'], 0,
    'Same STAGE is what makes it horizontal; same industry is not enough, because a roastery and a coffee farm are both in coffee and are at different stages. Different stages of one chain is vertical, unrelated markets is conglomerate, and the relative size of the two firms has nothing to do with the classification.',
    'types-sizes-businesses:quiz:d9389500'],
  [B3, 'A firm that acquires one of its suppliers is an example of:',
    ['Forward vertical integration', 'Backward vertical integration', 'Horizontal integration', 'Organic growth'], 1,
    'Moving towards the source of its inputs is backward vertical integration, and what it secures is supply, quality and input cost. Forward would take the firm towards its customers instead.',
    'types-sizes-businesses:quiz:501af66f'],
  [B3, 'The main difference between a merger and a takeover is:',
    ['Whether the firms are in the same industry', 'Whether any money changes hands', 'Whether the combined firm changes its name', 'Whether both sets of owners agree to it'], 3,
    'A merger is agreed by both sides; a takeover is one firm buying control, which the target\'s owners may resist. Industry, name and payment vary in both cases and settle nothing.'],
  [B3, 'A publisher buys a chain of bookshops. The gain most specific to this direction of integration is:',
    ['Removing a competitor from the publishing market', 'Securing a guaranteed outlet to the final customer', 'Spreading risk across unrelated markets', 'Reducing the cost of paper'], 1,
    'Buying the stage that used to buy from it is forward vertical integration, and what that secures is access to the market plus the retailer\'s margin. Removing a competitor would need a horizontal deal, and paper is a backward concern.'],
  [B3, 'A ceramics manufacturer acquires an insurance business. The principal gain available from this deal is:',
    ['Savings from combining the two operations', 'Securing the supply of an input', 'Diversification of the group\'s profits', 'Removal of a competitor'], 2,
    'There is no operational connection between ceramics and insurance, so none of the usual gains exists. What remains is diversification: profits in unrelated markets rarely fall at the same time.'],
  [B3, 'Which of the following is a disadvantage specific to vertical integration?',
    ['The firm loses the discipline of buying from whoever is cheapest', 'The market contains one fewer competitor', 'Profits become more volatile because the markets are unrelated', 'The firm gains no operational expertise from the deal'], 0,
    'Owning the stage it used to buy from means the firm now supplies itself, so it no longer tests its input cost against what an outside supplier would charge. Removing a competitor is horizontal; unrelated markets and the absence of operational gains are both conglomerate.'],
  [B3, 'Organic growth differs from external growth because organic growth:',
    ['Requires no investment by the firm', 'Cannot take a firm into a new market', 'Is always more profitable', 'Builds new capacity rather than buying it'], 3,
    'Organic growth expands the firm\'s own operations, which is why it is slower and easier to control; it is funded expansion, not free. It can take a firm into a new market, just not quickly.'],

  /* ══ Block 4 — Constraints on Growth and Its Impact ══ */
  [B4, 'Which of the following is a constraint on business growth?',
    ['Access to finance', 'Horizontal integration', 'Spreading fixed costs over more output', 'Organic growth'], 0,
    'The specification names four constraints: size of market, access to finance, owner objectives, and government regulation and bureaucracy. The other three are ways a firm grows or reasons it wants to, which is the opposite of a constraint.',
    'types-sizes-businesses:quiz:9aecaf69'],
  [B4, 'A profitable firm with a large potential market chooses not to expand because its owner does not want to delegate or borrow. The constraint here is:',
    ['Size of market', 'Access to finance', 'Owner objectives', 'Government regulation'], 2,
    'Nothing external is stopping this firm: the market is large and it is profitable. The constraint is what the person who decides actually wants, which is why an answer treating every firm as trying to grow cannot explain it.'],
  [B4, 'Compliance with government regulation tends to weigh more heavily on a small firm because:',
    ['Small firms break more rules', 'Small firms pay higher rates of tax', 'Regulations apply only above a certain size', 'Much of the cost of compliance is fixed'], 3,
    'Somebody must read the rules and file the returns whether the firm has ten employees or ten thousand, so a largely fixed cost is spread over far less output in a small firm. Many obligations do begin at thresholds, but the rules themselves apply at every size.'],
  [B4, 'Which of the following is a cost of growth for the firm itself?',
    ['Fixed costs are spread over more units', 'Suppliers offer better terms', 'Decisions pass through more layers before anyone acts', 'Borrowing becomes cheaper'], 2,
    'Coordination is what gets harder as a firm grows: more people, sites and layers mean decisions take longer to make and longer to reach whoever must act on them. The other three are gains from size.'],
  [B4, 'A cost saving from the growth of a firm is most likely to reach consumers as a lower price when:',
    ['The firm has removed all its competitors', 'The firm still faces rivals who would take its business', 'The firm is a state-owned enterprise', 'The saving comes from lower wages'], 1,
    'Lower costs make a lower price possible; competitive pressure is what makes it happen. Where growth has removed the rivals, there is nothing forcing the saving to be passed on and it stays with the firm.'],

  /* ══ Block 5 — Demergers ══ */
  [B5, 'A demerger is best defined as:',
    ['The sale of a division to another firm in exchange for a cash payment', 'The separation of part of a business into a company owned by the same owners', 'The closure of a division that has stopped being profitable', 'A merger that a competition authority has ordered to be reversed'], 1,
    'In a demerger nothing is sold and no buyer appears: the business divides and its existing owners end up holding two companies. Selling a division to another firm is a divestment, which is the distinction the question is testing.'],
  [B5, 'Which of the following is most likely to be a reason for a demerger?',
    ['Two very different businesses compete for one management\'s attention', 'The firm wishes to remove a competitor', 'The firm wants to secure the supply of an input', 'The firm wants to enter a new country'], 0,
    'Focus is the commonest reason to split: each business ends up run by people whose whole job it is. The other three are reasons to combine with another firm, not to divide.',
    'types-sizes-businesses:quiz:810f53a2'],
  [B5, 'An impact of a demerger on workers is that:',
    ['Workers receive a pay rise when the company splits', 'Promotion paths get longer in the smaller companies', 'Central functions duplicated by the split are cut', 'Workers become owners of the company they work for'], 2,
    'The split needs only one of each shared department in each company, so central functions are where the cuts fall. Promotion paths get shorter in a smaller organisation, not longer.'],

  /* ══ Block 6 — Business Objectives ══ */
  [B6, 'Profit maximisation occurs where:',
    ['Total revenue is at its maximum', 'Marginal cost equals marginal revenue', 'Average revenue equals average cost', 'Marginal revenue is zero'], 1,
    'Profit is largest where the last unit adds exactly what it costs, which is MC = MR. Revenue at its maximum is MR = 0 and produces a larger output; AR = AC is sales volume maximisation and leaves no profit at all.',
    'types-sizes-businesses:quiz:e7732a08'],
  [B6, 'A firm wishing to make its total revenue as large as possible should produce the output at which:',
    ['Marginal revenue is zero', 'Marginal cost equals marginal revenue', 'Average revenue equals average cost', 'Total cost is at its minimum'], 0,
    'Revenue stops rising when the next unit adds nothing to it, which is MR = 0. Past that point the price has to fall by more than the extra units bring in, so revenue falls.',
    'types-sizes-businesses:quiz:fb81a6c7'],
  [B6, 'A firm that aims to sell the maximum number of units while still covering all its costs is pursuing:',
    ['Profit maximisation', 'Revenue maximisation', 'Sales volume maximisation', 'Satisficing'], 2,
    'Selling as much as possible subject to covering costs is sales volume maximisation, and its formula is AR = AC — the price per unit exactly equals the cost per unit, so profit is zero.',
    'types-sizes-businesses:quiz:8b3606f9'],
  [B6, `${FIRM} faces P = ${A} − ${B}Q and a constant marginal cost of ${price(MC)}. Her profit-maximising output is:`,
    [`${units(Q_PROFIT)}`, `${units(Q_REVENUE)}`, `${units(Q_VOLUME)}`, `${units(5)}`],
    0,
    `Marginal revenue is ${A} − ${2 * B}Q, so setting it equal to ${MC} gives Q = ${Q_PROFIT}. That output sells at ${price(arAt(Q_PROFIT))} and returns a profit of ${total(profitAt(Q_PROFIT))}; ${units(Q_REVENUE)} is where revenue peaks and ${units(Q_VOLUME)} is where profit reaches zero.`],
  [B6, 'Compared with profit maximisation, sales volume maximisation always produces:',
    ['A larger output at a lower price', 'A smaller output at a higher price', 'The same output at a lower price', 'A larger output at a higher price'], 0,
    'Selling more units requires a lower price along a downward-sloping demand curve, and the volume objective pushes output past both the profit-maximising and the revenue-maximising levels until profit reaches zero.'],
  [B6, 'Satisficing behaviour by firms is best explained by:',
    ['Managers being unable to calculate the costs of the firm they run', 'The need to reach an outcome acceptable to groups with conflicting aims', 'A legal requirement limiting the profit a large firm may keep', 'The complete absence of competition in the firm\'s own market'], 1,
    'Owners, managers, employees, customers and suppliers want different things, and maximising any one objective pushes the others to the limit of what they will accept. Satisficing settles for an outcome each finds good enough.',
    'types-sizes-businesses:quiz:bf7e5868'],
  [B6, 'The principal-agent problem arises because:',
    ['Agents are dishonest and deliberately mislead the owners', 'Principals and agents have different objectives and unequal information', 'Agents own a larger share of the firm than the principals do', 'Principals have no legal right to give instructions to agents'], 1,
    'Nothing about the problem requires dishonesty. The owner wants profit, the manager gains from size and growth, and the owner cannot fully observe what the manager does — that combination is enough.',
    'types-sizes-businesses:quiz:6581f923'],
];

export const QUIZ = Q.map(([block, question, options, correctIndex, explanation, keptId]) => ({
  id: keptId || id('quiz', question), block, question, options, correctIndex, explanation,
}));

/* ── practice ──────────────────────────────────────────────────────────────── */
// IAL ECONOMICS tariffs only (econ_spec.txt:2704-2747). Every block carries at least one item, and
// the indices are authored against the RAW practice array, which is what LearnModeTab.jsx resolves
// pins against since packet 2 (structure-01). Guidance above 6 marks allocates no points, because
// those tariffs are levels-marked.
const P = [
  [B1, 'Define', 2, 'Define the term \'co-operative\'. (2 marks)',
    'Two things, one sentence: a co-operative is owned by its members, who are the people that use it — its customers, workers or producers — and each member has one vote regardless of what they have contributed. "A business owned by a group" is not enough, because it misses the feature that separates a co-operative from a company. Examples are application and belong in a 4-mark Explain; Define is 2 marks in IAL Economics (WEC13 Appendix 6).'],
  [B1, 'Explain', 4, 'Explain two reasons why two firms might form a joint venture rather than merge. (4 marks)',
    'Two reasons, each developed rather than listed, and each turning on the fact that both parents survive. Shared cost and risk: a project too large or too uncertain for one firm becomes affordable when the outlay is split, and neither firm has to commit its whole business to it. Access to a closed market: partnering with a firm already established somewhere can be the only practical route in, and the visiting firm keeps its independence everywhere else. An answer that describes the gains from merging has answered a different question.'],
  [B2, 'Explain', 4, 'Explain two reasons why some firms tend to remain small. (4 marks)',
    'Two of the reasons the specification points to, each followed through to why the firm does not grow. The size of the market: where demand is for something specialised or local, there are only so many customers in existence and growth has nowhere to go. Owner objectives: growth means borrowing, delegating and answering to others, and an owner who values independence may decline it, which is the reason where nothing external is stopping the firm at all. Saying only that small firms "cannot compete" gets the causation backwards.'],
  [B3, 'Explain', 4, 'Explain the difference between forward and backward vertical integration. (4 marks)',
    'Name the direction from the acquirer\'s own position in the supply chain, and say what each secures. Backward: the firm acquires its supplier, moving towards the source of its inputs, which secures supply, controls quality at source and removes the supplier\'s margin. Forward: the firm acquires its customer, moving towards the final buyer, which guarantees an outlet and captures the retailer\'s margin. Students often decide the direction from which firm is larger; size has nothing to do with it.'],
  [B3, 'Analyse', 6, 'Analyse the likely impact on consumers of a horizontal merger between two firms in the same market. (6 marks)',
    'A chain of reasoning, not a list. One route: the two firms were competitors, so the merger removes one from the market; the combined firm therefore faces less pressure on its price; consumers pay more and have one fewer alternative to switch to. The other route runs the opposite way and is equally valid: duplicated head offices and networks are removed, average cost falls, and where rivals remain the saving can reach consumers as a lower price. Naming the direction is the first link, not the answer.',
    'types-sizes-businesses:practice:6660d5bb'],
  [B4, 'Examine', 8, 'Examine two constraints on the growth of a business. (8 marks)',
    'Two constraints from the four the specification names, each with its mechanism and a consequence for the firm. Access to finance: a small firm has less retained profit, fewer assets to offer as security and no record to show, so it borrows on worse terms or is refused — and the expansion does not happen even though it would have been viable. Government regulation and bureaucracy: much of the cost of compliance is fixed and some obligations begin at thresholds, so the step up in size costs more than the size itself. Develop two rather than naming four.'],
  [B4, 'Discuss', 14, 'Discuss the impact of the growth of firms on workers and consumers. (14 marks)',
    'Both groups, both directions, and a judgement that rests on something. For workers: higher pay, training and career paths in a larger firm, against the duplicated jobs a merger removes and the greater distance from whoever decides. For consumers: lower costs, a wider range and greater reach, against less choice and less pressure to pass any saving on. The judgement worth reaching is conditional — how the firm grew, since organic growth adds capacity while a horizontal merger combines capacity that already existed, and whether competition survived it, since that is what turns a lower cost into a lower price.'],
  [B5, 'Define', 2, 'Define the term \'demerger\'. (2 marks)',
    'Say what happens to ownership, or the definition describes a divestment equally well. A demerger separates part of a business into an independent company whose shares go to the parent\'s existing owners: no buyer appears and no payment is received. "When a firm splits up" does not distinguish it from a sale. Define is 2 marks in IAL Economics (WEC13 Appendix 6), not 4.',
    'types-sizes-businesses:practice:4e3aff14'],
  [B5, 'Explain', 4, 'Explain two possible reasons why a firm might choose to demerge. (4 marks)',
    'Two reasons, each developed. Focus: two businesses with different customers, risks and time horizons compete for one management\'s attention, and separated, each is run by people whose whole job it is. Valuation: investors who want one of the businesses have to buy both, so neither is valued on its own terms, and separating them lets each raise money on the terms that suit it. A third route is coordination — a group assembled by acquisition can become too complex to run — and any two developed properly will do.',
    'types-sizes-businesses:practice:713cf058'],
  [B6, 'Calculate', 4, `${FIRM} faces the demand curve P = ${A} − ${B}Q, where Q is output in thousands of units a month, and a constant marginal cost of ${price(MC)}. Calculate her profit-maximising output and the price she would charge. (4 marks)`,
    `Show the working, because a Calculate involves several stages (WEC13 Appendix 6). Marginal revenue has twice the slope of a linear demand curve, so MR = ${A} − ${2 * B}Q. Profit is maximised where MC = MR: ${A} − ${2 * B}Q = ${MC}, so ${2 * B}Q = ${A - MC} and Q = ${Q_PROFIT}, which is ${units(Q_PROFIT)} a month. Substitute back into the DEMAND curve, not into MR, for the price: P = ${A} − ${B} × ${Q_PROFIT} = ${price(arAt(Q_PROFIT))}. Reading the price off the MR line instead of the demand curve gives ${price(mrAt(Q_PROFIT))}.`],
  [B6, 'Draw', 4, 'Draw a diagram showing a firm\'s average revenue, marginal revenue and marginal cost curves, and label the profit-maximising output and price. (4 marks)',
    'An accurately labelled diagram (WEC13 Appendix 6). It needs: output on the horizontal axis and price and cost in dollars a unit on the vertical, both labelled; a downward-sloping AR curve; an MR curve drawn twice as steep, starting from the same point on the vertical axis; a marginal cost curve; the output labelled where MC cuts MR; and the price read UP from that output to the AR curve, not to the MR curve. Reading the price off MR instead of AR is what turns an otherwise correct diagram into the wrong price.'],
  [B6, 'Examine', 8, 'Examine the significance of the divorce of ownership from control for the objectives a large firm pursues. (8 marks)',
    'The mechanism and its consequence. The mechanism: owners are many and dispersed, so the firm is run by managers appointed to act for them; those managers gain from size, growth and revenue while the owners want profit; and the owners see reports the managers prepared rather than the firm itself. The consequence: the firm pursues an outcome acceptable to both rather than maximum profit, which is satisficing, and it may sit closer to revenue maximisation than to MC = MR. Working the point on a firm\'s own figures — what an output chosen for size costs the owners in profit — turns the theory into an argument about that firm.',
    'types-sizes-businesses:practice:a5f0810d'],
  [B6, 'Evaluate', 20, 'Evaluate the view that large firms pursue revenue maximisation rather than profit maximisation. (20 marks)',
    'A supported judgement, argued both ways. For: the divorce of ownership from control gives managers objectives of their own, and revenue is visible, immediate and what they are often rewarded on; a firm buying market share may accept lower profit deliberately. Against: owners narrow the gap with share-based pay and profit-linked bonuses; a firm that persistently earns less than it could becomes a target for whoever thinks they could run it better; and the choice is rarely either objective in its pure form, since satisficing describes a compromise between them. The strongest judgement is conditional — on how dispersed the ownership is, on how managers are paid, and on whether the firm is under competitive pressure — rather than a verdict that every large firm behaves one way.',
    'types-sizes-businesses:practice:aced507f'],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance, keptId]) => ({
  id: keptId || id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
/*
 * Cards are rewritten in place and never deleted while the concept survives: the ids are stable and
 * progress rows point at them (the packet-13 rule). Ten March cards keep theirs and are rewritten.
 * EIGHT are repurposed rather than dropped, because what they defined is not in this specification:
 * `bd72e711` (sole trader), `85b1210e` (partnership), `2c6cd9d7` (private limited company),
 * `21d65d80` (public limited company), `16d1fae3` (limited liability) and `c92e4de5` (unlimited
 * liability) return zero occurrences between them in econ_spec.txt, and `b80e4d64`/`c9d44ea8`
 * (economies and diseconomies of scale) are 3.3.2's material. Each id now carries a leaf of 1a or 2
 * that this section does teach. Ten new cards cover what the packet adds.
 */
const kept = (cid, front, back) => ({ id: `types-sizes-businesses:card:${cid}`, front, back });
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  kept('bd72e711', 'What is a private sector organisation?', 'An organisation owned by <strong>private individuals or firms</strong>, who supply the capital, carry the risk of losing it and set the objectives. A loss must be met by borrowing, shrinking or closing.'),
  kept('85b1210e', 'What is a state-owned enterprise?', 'An organisation owned by the <strong>government on behalf of citizens</strong> — the public sector. Its objectives are set politically, and it can be kept running on public money if the service is judged worth more than it costs.'),
  kept('2c6cd9d7', 'What is a not-for-profit organisation?', 'An organisation whose surplus <strong>cannot be distributed to owners</strong> and must be retained for its purpose. It may — and usually must — earn more than it spends, or it would close.'),
  kept('21d65d80', 'What is a co-operative?', 'An organisation owned and controlled by its <strong>members</strong>, who are the customers, workers or producers that use it. <strong>One member, one vote</strong>, and the surplus is shared in proportion to use rather than to capital.'),
  kept('16d1fae3', 'What is a joint venture?', 'A separate organisation set up and <strong>jointly owned by two or more firms</strong> for one project. Both parents keep their independence everywhere else, which is what distinguishes it from a merger.'),
  kept('c92e4de5', 'How is the size of a business measured?', 'By <strong>number of employees</strong>, <strong>turnover</strong>, <strong>capital employed</strong> or <strong>market share</strong>. They can rank the same firms differently, so an answer has to name the measure it is using.'),
  kept('b80e4d64', 'Why do some firms tend to remain small?', 'The <strong>size of the market</strong>, demand for a <strong>niche</strong> or personal service that resists standardisation, <strong>owner objectives</strong>, and lack of <strong>access to finance</strong>. Small size is a limit or a choice, not a failure.'),
  kept('c9d44ea8', 'Name the four constraints on business growth.', '<strong>Size of market</strong>; <strong>access to finance</strong>; <strong>owner objectives</strong>; and <strong>government regulation and bureaucracy</strong>. Owner objectives is the one where nothing external is stopping the firm.'),
  kept('db721933', 'What is organic growth?', 'Expansion generated by the firm\'s <strong>own activity</strong> — more outlets, more products, more markets — rather than by acquiring another firm. Slower than buying capacity, and easier to fund and control.'),
  kept('2cf34254', 'What is external growth?', 'Growth by combining with another firm. A <strong>merger</strong> is agreed by both sets of owners; a <strong>takeover</strong> is one firm buying control, agreed or resisted. Either way the capacity already exists, so the growth is immediate.'),
  kept('9b09d285', 'What is horizontal integration?', 'A merger or takeover between firms at the <strong>same stage of production in the same industry</strong>. It removes a competitor and raises market share, which is why it draws the attention of competition authorities.'),
  kept('594b9175', 'What is vertical integration?', 'A merger or takeover between firms at <strong>different stages of the same supply chain</strong>. <strong>Backward</strong> is towards the supplier and secures supply; <strong>forward</strong> is towards the customer and secures an outlet.'),
  kept('d00467a8', 'What is a conglomerate merger?', 'A merger or takeover between firms in <strong>unrelated markets</strong>. Nothing operational is shared, so <strong>diversification</strong> is the only gain: profits in unrelated markets rarely fall at the same time.'),
  kept('218c3234', 'What is profit maximisation, and what is its formula?', 'Producing the output at which profit is largest. The formula is <strong>MC = MR</strong>: make every unit whose addition to revenue is at least its addition to cost, and stop where the two are equal.'),
  kept('3d668220', 'What is revenue maximisation, and what is its formula?', 'Making total revenue as large as possible, regardless of cost. The formula is <strong>MR = 0</strong>. It gives a <strong>larger</strong> output and a lower price than profit maximisation, and less profit.'),
  kept('512aec09', 'What is sales volume maximisation, and what is its formula?', 'Selling as many units as possible while still covering all costs. The formula is <strong>AR = AC</strong>, so profit is <strong>zero</strong>. It is not the same as revenue maximisation: it sells more units for less revenue.'),
  kept('995c9f7f', 'What is satisficing?', 'Aiming for an outcome that is <strong>satisfactory to every stakeholder</strong> rather than the maximum of any one thing. It arises from conflicting objectives and from information nobody has in full.'),
  kept('6f34dcdb', 'What is the principal-agent problem?', 'The <strong>principal</strong> (the owner) wants profit; the <strong>agent</strong> (the manager) is appointed to deliver it but gains from size and growth, and knows more than the principal can observe. Different objectives plus unequal information.'),
  card('What is the difference between the public sector and services the public uses?', 'The <strong>public sector</strong> is defined by <strong>state ownership</strong>, not by who the customers are. A supermarket serves the public and is entirely private.'),
  card('What is the difference between a demerger and a divestment?', 'A <strong>demerger</strong> splits a business into a separate company owned by the <strong>same owners</strong> — no buyer, no payment. A <strong>divestment</strong> sells a division to <strong>another firm</strong> for cash. The test is whether anyone bought it.'),
  card('Name the four directions a firm can grow by merger or takeover.', '<strong>Horizontal</strong> (same stage), <strong>backward vertical</strong> (towards the supplier), <strong>forward vertical</strong> (towards the customer) and <strong>conglomerate</strong> (unrelated markets).'),
  card('Why is "same industry" not enough to make an integration horizontal?', 'Because a roastery and a coffee farm are both in coffee and are at <strong>different stages</strong> of the chain, which makes that deal vertical. Horizontal needs the same STAGE of production.'),
  card('Give one advantage and one disadvantage specific to vertical integration.', '<strong>For:</strong> it secures supply and quality (backward) or a guaranteed outlet (forward). <strong>Against:</strong> it loses the discipline of buying from whoever is cheapest, and by refusing to deal with rivals it can attract a regulator without ever having removed a competitor.'),
  card('Why do firms grow?', 'To spread <strong>fixed costs</strong> over more output, to gain <strong>market power</strong> over price and suppliers, to <strong>spread risk</strong> across products and markets, and because <strong>managers</strong> gain from size even where owners do not.'),
  card('What is the impact of the growth of firms on workers?', '<strong>For:</strong> higher pay, career paths, training and more security. <strong>Against:</strong> a merger removes duplicated jobs, work is narrower, and the decision-maker is further away. Organic growth adds jobs; a horizontal merger combines jobs that existed.'),
  card('When does a cost saving from growth actually reach consumers?', 'Only where the firm <strong>still faces competition</strong>. Lower cost makes a lower price <strong>possible</strong>; a rival ready to take the business is what makes it <strong>happen</strong>.'),
  card('Give three reasons for a demerger.', '<strong>Focus</strong> — two businesses compete for one management\'s attention. <strong>Coordination</strong> — a group assembled by acquisition becomes too complex. <strong>Valuation</strong> — investors who want one part must buy both. A regulator may also require it.'),
  card('What is the impact of a demerger on businesses?', '<strong>For:</strong> focused management, and each company can be valued and funded on its own terms. <strong>Against:</strong> costs that were shared must be <strong>duplicated</strong>, and neither has the other to fall back on.'),
  card('Why does the divorce of ownership from control matter for business objectives?', 'Because the firm is run by managers whose objectives — size, growth, revenue — are not the owners\' objective of profit, and the owners cannot fully observe them. The result is a <strong>compromise</strong> rather than maximum profit.'),
  card('How do owners try to close the principal-agent gap?', 'By making the agent an owner too: <strong>share-based pay</strong>, <strong>profit-linked bonuses</strong> and reporting to independent boards. Each narrows the gap; none closes it, because the information stays unequal.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
/*
 * Four March mistakes, three kept and rewritten. `663cc5e9` defined the limited/unlimited liability
 * confusion, which cannot be a mistake in a section whose specification never uses either term; the
 * id now carries the demerger/divestment confusion, which is this section's real concept trap and the
 * one the March content itself got wrong (accuracy-01). Three new.
 */
const mistake = (cid, title, mistakeText, correction, examTip) => ({
  id: cid ? `types-sizes-businesses:mistake:${cid}` : id('mistake', title), title, mistake: mistakeText, correction, examTip,
});

export const MISTAKES = [
  mistake('663cc5e9', 'Calling a Sale of a Division a Demerger',
    'Students describe a firm selling a division to another company as a demerger, which is the error the section itself used to make.',
    'A demerger separates part of a business into an independent company whose shares go to the parent\'s EXISTING owners: nobody buys it and no payment is received. Selling a division to another firm is a divestment — the division changes owner and cash comes back.',
    'Say what happens to ownership. "The firm split up" describes both, so it defines neither; the test is whether anyone bought it.'),
  mistake('52e3a00d', 'Naming the Wrong Direction of Integration',
    'Students call any deal between two firms in the same industry horizontal, or decide the direction from which firm is larger.',
    'Horizontal means the same STAGE of production — a roastery and a coffee farm are both in coffee and are at different stages, so that deal is vertical. The direction of a vertical deal is named from the acquirer\'s own position: backward towards its supplier, forward towards its customer. Size is irrelevant.',
    'Draw the supply chain before naming anything, put the acquirer on it, and then say which way along it the deal goes.'),
  mistake('69e537e9', 'Treating the Principal-Agent Problem as Dishonesty',
    'Students write that managers "cheat" the owners, or that the problem would disappear if managers were more honest.',
    'The problem needs only two things: the agent has objectives of their own — size, growth, security — and the principal cannot fully observe what the agent does. An entirely honest manager who believes a larger firm is a better firm still produces the divergence.',
    'State the two ingredients — different objectives, unequal information — and then show what the firm does differently as a result.'),
  mistake('fdf8912e', 'Assuming Every Firm Is Trying to Grow',
    'Students explain small size as failure, and leave out the constraint where nothing external is stopping the firm at all.',
    'The specification names four constraints: size of market, access to finance, owner objectives, and government regulation and bureaucracy. Owner objectives is the one that breaks the assumption — a profitable firm in a large market may simply have an owner who does not want to delegate, borrow or answer to anyone.',
    'When a question asks why a firm has not grown, check the owner\'s objectives before reaching for finance or the market.'),
  mistake(null, 'Confusing Revenue Maximisation With Sales Volume Maximisation',
    'Students treat "selling the most" and "earning the most revenue" as the same objective, and give both the same formula.',
    `They are different outputs. Revenue maximisation sets MR = 0; sales volume maximisation sets AR = AC and pushes output further, until profit reaches zero. Past the revenue-maximising output the price falls faster than the extra units make up for, so ${FIRM} earns ${total(trAt(Q_VOLUME))} selling ${units(Q_VOLUME)} against ${total(trAt(Q_REVENUE))} selling only ${units(Q_REVENUE)}.`,
    'Learn the three formulae as a set — MC = MR, MR = 0, AR = AC — and check which quantity each one gives before writing about any of them.'),
  mistake(null, 'Calling a Firm Large Without Naming the Measure',
    'Students describe a firm as large or small as though size were a single property, and default to the number of employees.',
    'Size is measured by number of employees, turnover, capital employed or market share, and the measures can rank the same firms in opposite orders. A refinery employs few people and uses enormous capital; a cleaning contractor is the other way round. Both are large corporations on the measure that suits them.',
    'Name the measure in the sentence: "large by capital employed" says something, and "large" on its own does not.'),
  mistake(null, 'Assuming Growth Automatically Benefits Consumers',
    'Students write that a larger firm has lower costs and therefore charges lower prices, treating the second half as following from the first.',
    'Lower cost makes a lower price POSSIBLE; competition is what makes it happen. Where the growth removed the rivals, nothing forces the saving to be passed on and it stays with the firm — which is exactly why competition authorities examine horizontal mergers.',
    'Make the link conditional: say whether the firm still faces rivals, and let the answer about consumers follow from that.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */

export const EXTRAS = {
  chains: [
    {
      title: 'Why a horizontal merger may raise the price consumers pay',
      steps: [
        'Two firms at the same stage of the same industry combine into one.',
        'The market now contains one fewer competitor than it did before.',
        'The combined firm faces less pressure to hold its price down.',
        'Consumers pay more and have one fewer alternative to switch to.',
      ],
      result: 'This is why a competition authority tests a horizontal merger against the harm to consumers rather than against the gain to the firm',
    },
    {
      title: 'Why being small keeps a firm small',
      steps: [
        'A small firm has few assets to offer as security and a short trading record.',
        'A lender judges it riskier, so it charges more or refuses the loan.',
        'A viable expansion goes unfunded, because the finance costs more than it would return.',
        'The firm stays small, so the next loan is priced exactly the same way.',
      ],
      result: 'Access to finance is a constraint that reproduces itself: nothing in the chain moves the firm out of the position that caused it',
    },
    {
      title: `Why ${FIRM}'s objective changes her price`,
      steps: [
        `Maximising profit means MC = MR, which gives ${units(Q_PROFIT)} at ${price(arAt(Q_PROFIT))} and ${total(profitAt(Q_PROFIT))} of profit.`,
        `Maximising revenue means MR = 0, which gives ${units(Q_REVENUE)} at ${price(arAt(Q_REVENUE))} — more revenue, ${total(profitAt(Q_REVENUE))} of profit.`,
        `Maximising sales volume means AR = AC, which gives ${units(Q_VOLUME)} at ${price(arAt(Q_VOLUME))} and no profit at all.`,
        'Each objective picks a different point on the same demand curve, so the price falls as the objective moves down the list.',
      ],
      result: 'The objective is not a detail about a firm\'s character: it determines the output, the price and the profit',
    },
    {
      title: 'How the divorce of ownership from control changes what a firm does',
      steps: [
        'A firm grows too large for its owners to run it themselves.',
        'Managers are appointed as agents to run it on the owners\' behalf.',
        'Those managers gain from size, growth and revenue, which the owners do not.',
        'Neither objective is pursued to its limit, and the firm satisfices instead.',
      ],
      result: 'Satisficing is not a separate theory bolted on to the others — it is what the principal-agent problem produces',
    },
  ],
  evaluation: [
    {
      title: 'A horizontal merger is not automatically bad for consumers',
      content: 'Removing a competitor reduces the pressure on price, but the same merger removes duplicated head offices, networks and systems, and spreads the remaining fixed costs over a larger output. Where enough rivals survive, that saving can reach consumers as a lower price. The judgement therefore turns on how much competition is left afterwards, which is the test a competition authority applies — and why approval is often conditional on selling parts of the business to someone else.',
    },
    {
      title: 'The gains from a merger are expected; the costs are certain',
      content: 'Every argument for a merger is a forecast: the synergies, the savings, the market that will open. The costs of combining two workforces, two sets of systems and two managements are incurred whatever happens. That asymmetry is worth stating in any evaluation of a growth strategy, and it is what a later demerger of the same businesses is an admission of.',
    },
    {
      title: 'Whether growth helps workers depends on how the firm grew',
      content: 'Organic growth adds capacity, so it generally adds jobs, and a larger firm can pay more and train more. A horizontal merger combines capacity that already existed, so the duplication it removes is largely people. An answer that treats "growth" as one thing cannot reach a judgement on workers at all; naming the method first is what makes the judgement possible.',
    },
    {
      title: 'Profit maximisation may still describe a firm that looks like a revenue maximiser',
      content: 'A firm accepting low profits while it builds market share may be maximising profit over a longer horizon rather than pursuing revenue for its own sake. The two are hard to tell apart from outside, which is why the stronger evaluation rests on something observable — how dispersed the ownership is, how managers are paid, and whether the firm is under competitive pressure — rather than on the pattern of profits alone.',
    },
  ],
};
