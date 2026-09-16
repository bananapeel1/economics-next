/**
 * PACKET 20 — types-sizes-businesses, Learn Mode content and Notes.
 *
 * Economics Unit 3 (WEC13), IAL topic 3.3.1, audit/raw/econ_spec.txt:1245-1287. Six blocks in the
 * specification's own order and one subsection per skill, so no step carries two ideas: eight crowded
 * steps become twenty-four small ones, plus six check-ins.
 *
 * Four scope decisions the specification settled before a word was written (see NEXT.md):
 *
 *   - THE LEGAL-FORMS BLOCK GOES. "Sole trader", "limited liability" and "shareholder" return ZERO
 *     occurrences in the whole Economics specification; "partnership" and "plc" occur once each, on the
 *     acknowledgements pages (:2419, :2407). The specification's list at 1a is private sector
 *     organisations, state-owned enterprises (public sector), for-profit and not-for-profit
 *     organisations, co-operatives and joint ventures (:1250-1254) — and four of those five were absent
 *     from the March section while two subsections taught UK company law. Block 1 is now that list.
 *     Ownership and control survive as ordinary English in 3b, because the divorce of ownership from
 *     control cannot be stated without them; they are not offered as examinable terms.
 *   - "CHARITIES" AND "SOCIAL ENTERPRISES" ARE NOT SPECIFICATION WORDS — zero occurrences each. The
 *     spec says "for-profit and not-for-profit organisations", so that is what is taught, and a charity
 *     appears once as a plain-English illustration rather than as a taxonomy to learn (specGap-03).
 *   - ECONOMIES OF SCALE BELONG TO 3.3.2. Long-run cost curves, minimum efficient scale, internal and
 *     external economies and the sources of each are 3.3.2 sub-topic 3 (:1320-1345) and are packet 28's
 *     work. Only the demerger half of the March block 4 is on-spec here (topFix-03, structure-04).
 *   - BUSINESS OBJECTIVES GO LAST, where the specification puts them. That fixes structure-03 at the
 *     root: the divorce of ownership from control is taught after the reader knows what a company and
 *     an owner are, instead of being invoked two blocks before it is explained.
 *
 * Ids: five March subsections keep theirs, so an existing progress row still points at teaching that
 * continues — profit-maximisation, organic-growth, alternative-objectives (now Revenue Maximisation),
 * external-growth-mergers (now Mergers and Takeovers) and diseconomies-demergers (now Reasons for
 * Demergers). The two legal-forms ids and economies-of-scale are gone, because what they taught is gone.
 *
 * Money is in dollars throughout. No UK-only institution frames an example, no example carries a year
 * or a figure, and no sentence asserts what a paper asks or what a marker does.
 */
import { subId, SECTION, hash8, FIRM, price, total, units, arAt, mrAt, trAt, tcAt, acAt, profitAt, MC, FIXED, A, B, Q_PROFIT, Q_REVENUE, Q_VOLUME, OBJECTIVES } from './_packet20-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

export const B1 = 'Types of Business';
export const B2 = 'The Size of Businesses';
export const B3 = 'How Businesses Grow';
export const B4 = 'Constraints on Growth and Its Impact';
export const B5 = 'Demergers';
export const B6 = 'Business Objectives';

/* ══ Block 1 — Types of Business (3.3.1 · 1a) ══════════════════════════════ */

const privateAndPublicSector = (() => {
  const sid = subId('private-and-public-sector');
  return {
    id: sid,
    title: 'Private Sector and Public Sector Organisations',
    keyIdea: 'The first division the specification draws is by who owns the organisation: private individuals and companies, or the state.',
    body: [
      { type: 'paragraph', text: 'Every organisation in an economy can be placed by **who owns it**. That single question separates the two sectors, and it matters because ownership is what settles whose objectives the organisation pursues.' },
      { type: 'bullets', items: [
        '**Private sector organisations** are owned by private individuals or by other private firms. The owners put the capital in, carry the risk of losing it, and decide what the organisation is for.',
        '**State-owned enterprises (public sector)** are owned by the government on behalf of citizens. They are funded from taxation, from borrowing, or from what they charge, and their objectives are set politically rather than by an owner seeking a return.',
      ] },
      { type: 'paragraph', text: 'The difference shows up most clearly in what happens to a loss. A private sector firm that cannot cover its costs must borrow, shrink or close. A state-owned enterprise can be kept running on public money if the government judges the service worth more than it costs — which is a decision about society, not about the enterprise.' },
      { type: 'paragraph', text: 'Neither sector is defined by what it produces. Railways, postal services, airlines and utilities are run privately in some economies and by the state in others, and the same industry can move between sectors as governments change.' },
    ],
    realExample: { emoji: '🚆', text: 'Rail networks are state-owned in some economies and operated by private companies in others, carrying the same passengers over the same track. What differs is who owns the operator and therefore whose objectives it serves.' },
    misconception: 'Students write that the public sector means services the public uses. It does not: a supermarket serves the public and is private. Write instead: the public sector is defined by state ownership, not by who the customers are.',
    examMatters: 'A Define (2 marks, WEC13 Appendix 6) requires the meaning of the term. For a state-owned enterprise that means naming the owner — the government — and not merely describing the service it provides.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each organisation into the sector its OWNERSHIP puts it in:',
      groups: [
        { name: 'Private sector', items: ['A family-owned bakery', 'A supermarket chain owned by investors'], why: 'Ownership rests with private individuals or firms, who supplied the capital and carry the risk' },
        { name: 'Public sector', items: ['A national postal service owned by the government', 'A state-owned electricity generator'], why: 'The state owns it on behalf of citizens, so its objectives are set politically rather than by an owner seeking a return' },
      ],
    }),
  };
})();

const forProfitAndNotForProfit = (() => {
  const sid = subId('for-profit-and-not-for-profit');
  return {
    id: sid,
    title: 'For-Profit and Not-for-Profit Organisations',
    keyIdea: 'The second division is by purpose: whether any surplus is taken out by owners, or must stay inside the organisation.',
    body: [
      { type: 'paragraph', text: 'Ownership says who holds an organisation. **Purpose** says what it is holding it for, and the specification draws that line between for-profit and not-for-profit organisations.' },
      { type: 'bullets', items: [
        '**For-profit organisations** exist to generate a surplus that can be distributed to their owners. Revenue above cost is a return on the capital the owners risked.',
        '**Not-for-profit organisations** may also earn more than they spend — they must, to survive — but the surplus cannot be taken out. It is retained and spent on the purpose the organisation was set up to serve.',
      ] },
      { type: 'paragraph', text: 'The distinction is about the **destination of the surplus**, not about its existence. A not-for-profit that consistently spends more than it earns closes exactly as a firm does, so it must watch costs and revenues with the same care.' },
      { type: 'paragraph', text: 'For economics the consequence is a different objective function. A for-profit firm can be modelled as choosing the output that maximises profit. A not-for-profit chooses the output that does most for its purpose subject to covering its costs, which can mean serving customers a profit-maximising firm would refuse.' },
    ],
    realExample: { emoji: '🏥', text: 'A hospital run as a charity and a hospital run for profit may treat the same conditions with the same equipment. The difference appears in what happens to money left over at the end of the year, and in which patients each can afford to accept.' },
    misconception: 'Students write that not-for-profit organisations do not make a profit. They may run a surplus and often must. Write instead: a not-for-profit cannot distribute its surplus to owners, so it is retained for the organisation\'s purpose.',
    examMatters: 'An Explain (4 marks, WEC13 Appendix 6) on a not-for-profit requires a two-stage chain: state where the surplus must go, then follow that to a decision the organisation makes differently from a for-profit firm.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction the specification draws at 1a:',
      template: [
        'A ___ organisation may distribute its surplus to the owners who risked the capital',
        'A ___ organisation must retain any surplus and spend it on its purpose',
        'The line between them is drawn by the ___ of the surplus, not by whether one exists',
      ],
      answers: ['for-profit', 'not-for-profit', 'destination'],
      hints: ['the surplus leaves the organisation', 'the surplus stays inside it', 'where the money goes'],
      distractors: ['public sector', 'size'],
    }),
  };
})();

const cooperatives = (() => {
  const sid = subId('co-operatives');
  return {
    id: sid,
    title: 'Co-operatives',
    keyIdea: 'A co-operative is owned by the people who use it — its members — and each member has one vote however much they have put in.',
    body: [
      { type: 'paragraph', text: 'A **co-operative** is an organisation owned and controlled by its members, who are also the people it serves. The members may be the customers who buy from it, the workers who run it, or the producers who supply it.' },
      { type: 'bullets', items: [
        '**Ownership follows use.** You become an owner by joining and trading with the organisation, rather than by buying a stake in it on a market.',
        '**One member, one vote.** Control is shared equally among members, so it does not concentrate in whoever has contributed the most capital. This is the feature that most sharply separates a co-operative from a company.',
        '**The surplus is distributed by use**, typically in proportion to how much each member traded with the co-operative, rather than in proportion to capital.',
      ] },
      { type: 'paragraph', text: 'Because control and benefit both follow use, a co-operative tends to pursue what its members want from it — a reliable price for producers, lower prices for consumers, stable work for employees — rather than the largest possible return on capital.' },
      { type: 'paragraph', text: 'The structure has a cost. Raising large amounts of capital is harder when new investors cannot buy control, so co-operatives are common where the capital required is modest and the shared interest is strong, such as farming, retail and financial services.' },
    ],
    realExample: { emoji: '🌾', text: 'Farming co-operatives let many small growers market and process their crop together. Each grower keeps their own farm and gets access to storage, bargaining power and processing that none of them could fund alone.' },
    misconception: 'Students treat a co-operative as simply a small or friendly business. Size is not the point. Write instead: a co-operative is defined by member ownership and one member one vote, which is why control does not follow capital.',
    examMatters: 'An Explain (4 marks, WEC13 Appendix 6) on a co-operative requires the ownership structure and a consequence of it. The voting rule is the mechanism that makes the consequence follow.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of a co-operative to what it produces:',
      pairs: [
        { left: 'Members own it by using it', right: 'The owners are the customers, workers or suppliers', why: 'Ownership is acquired by trading with the organisation rather than by buying a stake on a market' },
        { left: 'One member, one vote', right: 'Control does not follow the size of the stake', why: 'Voting power is equal, so whoever contributed most capital cannot take control' },
        { left: 'Surplus shared by use', right: 'The benefit goes to those who traded most', why: 'Distribution is in proportion to trade rather than in proportion to capital' },
      ],
      distractors: ['Shares are bought and sold on a stock exchange'],
    }),
  };
})();

const jointVentures = (() => {
  const sid = subId('joint-ventures');
  return {
    id: sid,
    title: 'Joint Ventures',
    keyIdea: 'A joint venture is a separate organisation two firms create together for one purpose, while each stays independent everywhere else.',
    body: [
      { type: 'paragraph', text: 'A **joint venture** is a new organisation set up and jointly owned by two or more existing firms, formed to pursue a specific project. The parent firms share the capital, the control and the returns from that project, and remain entirely separate businesses in everything else.' },
      { type: 'paragraph', text: 'That last clause is what distinguishes it from the growth methods later in this section. A merger combines two firms into one; a joint venture leaves both standing and creates a third thing beside them.' },
      { type: 'bullets', items: [
        '**Shared cost and shared risk.** A project too large or too uncertain for one firm becomes affordable when the outlay and the possible loss are split.',
        '**Combined and complementary expertise.** Each parent contributes something the other lacks — a technology, a distribution network, knowledge of a market.',
        '**Access to a market that is otherwise closed.** Partnering with a firm already established in a country can be the only practical route in, and some governments require it.',
      ] },
      { type: 'paragraph', text: 'The costs are the mirror image. Two owners must agree, so decisions are slower; the returns are shared rather than kept; and each parent must hand over knowledge to a firm that may later compete with it.' },
    ],
    realExample: { emoji: '🚗', text: 'Carmakers routinely build assembly plants abroad as joint ventures with a local manufacturer. The visiting firm brings the design and the process; the local partner brings the site, the workforce and the knowledge of how to sell there.' },
    misconception: 'Students describe a joint venture as a type of merger. Nothing is combined: both parents survive unchanged. Write instead: a joint venture creates a separate jointly-owned organisation for one purpose, leaving the parent firms independent.',
    examMatters: 'An Analyse (6 marks, WEC13 Appendix 6) requires a chain of reasoning, so a joint venture answer should follow one motive through to an effect on the firm, rather than listing three motives without developing any of them.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it describes a joint venture or a merger:',
      groups: [
        { name: 'Joint venture', items: ['Both firms carry on as separate businesses', 'A third organisation is created for one project'], why: 'The parents remain independent and jointly own something new beside them' },
        { name: 'Merger', items: ['Two firms become a single business', 'One set of owners controls everything afterwards'], why: 'The firms are combined, so the separate businesses no longer exist' },
      ],
    }),
  };
})();

/* ══ Block 2 — The Size of Businesses (3.3.1 · 2a, 2e) ═════════════════════ */

const smesAndLargeCorporations = (() => {
  const sid = subId('smes-and-large-corporations');
  return {
    id: sid,
    title: 'SMEs and Large Corporations',
    keyIdea: 'Size is measured by more than one yardstick — employees, turnover, capital employed and market share — and the yardsticks can disagree.',
    body: [
      { type: 'paragraph', text: 'The specification divides firms into **SMEs (small- and medium-size enterprises)** and **large corporations**. Before that division can be used, size has to be measured, and there is more than one way to measure it.' },
      { type: 'bullets', items: [
        '**Number of employees** — the most commonly quoted measure, and the one that decides which regulations apply in most economies.',
        '**Turnover** — annual sales revenue, which captures how much business the firm actually does.',
        '**Capital employed** — the value of the assets the firm uses, which reflects how much had to be invested to operate at all.',
        '**Market share** — the firm\'s sales as a proportion of the whole market, which measures size relative to rivals rather than in absolute terms.',
      ] },
      { type: 'paragraph', text: 'The measures can point in opposite directions. An oil refinery employs few people and uses enormous capital; a cleaning contractor employs thousands and owns very little. Calling either one "large" depends entirely on the yardstick chosen.' },
      { type: 'paragraph', text: 'Where the boundary between an SME and a large corporation falls is set by each government, usually for the purpose of deciding which firms qualify for support or lighter regulation. The specification names the categories and not a threshold, so an answer should name the measure it is using rather than quote a figure.' },
    ],
    realExample: { emoji: '⛽', text: 'A refinery and a supermarket chain can report similar turnover while one employs a few hundred people and the other employs tens of thousands. Both are large corporations; the measure that says so is different in each case.' },
    misconception: 'Students assume employee numbers settle the question. A capital-intensive firm can be enormous with a small workforce. Write instead: state which measure of size is being used, because turnover, employees, capital employed and market share can rank the same firms differently.',
    examMatters: 'A Define (2 marks, WEC13 Appendix 6) on an SME needs the category and the basis on which firms are put in it. Naming the measure is what turns a vague answer into the meaning of the term.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each measure of business size to what it actually captures:',
      pairs: [
        { left: 'Number of employees', right: 'How much labour the firm uses', why: 'It counts people, so it understates a firm that runs on machinery rather than staff' },
        { left: 'Turnover', right: 'How much business the firm does in a year', why: 'It measures sales revenue, regardless of how many people or how much capital produced them' },
        { left: 'Capital employed', right: 'How much had to be invested to operate', why: 'It values the assets in use, which is what makes a capital-intensive firm look large' },
        { left: 'Market share', right: 'How large the firm is compared with its rivals', why: 'It is relative rather than absolute, so a firm can be small in output and large in its market' },
      ],
    }),
  };
})();

const whySomeFirmsStaySmall = (() => {
  const sid = subId('why-some-firms-stay-small');
  return {
    id: sid,
    title: 'Why Some Firms Stay Small',
    keyIdea: 'Staying small is usually a choice or a limit, not a failure: the market may be tiny, the product may resist standardisation, or the owner may not want the firm to grow.',
    body: [
      { type: 'paragraph', text: 'Most firms in most economies are small and stay small. The specification asks for the reasons, and none of them is that the firm tried to grow and could not.' },
      { type: 'bullets', items: [
        '**The size of the market.** Some markets are simply small — a specialist repair service, a local trade. A firm cannot grow past the number of customers that exist.',
        '**Niche markets.** Where demand is for something specific and personal, the firm that serves it well cannot standardise what it does without losing the very thing customers pay for.',
        '**Owner objectives.** An owner may prefer control, independence and predictable hours to a larger business. Growth means delegating, borrowing and answering to others.',
        '**Access to finance.** Expansion has to be funded. A small firm with few assets to offer as security borrows on worse terms than a large one, and may not be able to borrow at all.',
        '**Personal service and local knowledge.** Where customers buy the relationship as much as the product, size actively works against the firm.',
      ] },
      { type: 'paragraph', text: 'These reasons are why small firms survive alongside large ones in the same industry rather than being driven out. They are serving demand the large firm cannot serve profitably — which is also why the two sizes often do not compete directly at all.' },
    ],
    realExample: { emoji: '✂️', text: 'Barbers, plumbers and independent restaurants remain small in economies of every size. The service is delivered in person, the customer base is local, and a second branch does not make the first one cheaper to run.' },
    misconception: 'Students treat small size as evidence of failure. Growth is one strategy among several. Write instead: many firms remain small because the market is small, the product resists standardisation, or the owner has chosen not to grow.',
    examMatters: 'An Examine (8 marks, WEC13 Appendix 6) requires knowledge, application and analysis. Two reasons developed into consequences for the firm go further than five reasons named.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each firm by the reason it stays small:',
      groups: [
        { name: 'The market itself is small', items: ['A restorer of antique clocks', 'A supplier of parts for one type of vintage tractor'], why: 'There is a limited number of customers in existence, so growth has nowhere to go' },
        { name: 'The owner chooses not to grow', items: ['A baker who turns down a second site to keep working mornings', 'A designer who refuses contracts that would mean hiring staff'], why: 'The constraint is the owner\'s own objectives, not the market or the money' },
        { name: 'Finance is not available', items: ['A workshop refused a loan because it has no assets to offer as security', 'A new firm whose owners cannot raise the capital for a bigger site'], why: 'The expansion is wanted and viable but cannot be funded' },
      ],
    }),
  };
})();

const whyOtherFirmsGrow = (() => {
  const sid = subId('why-other-firms-grow');
  return {
    id: sid,
    title: 'Why Other Firms Grow',
    keyIdea: 'Firms grow to spread fixed costs over more output, to gain power over price, to spread risk, and because managers benefit from running something larger.',
    body: [
      { type: 'paragraph', text: 'Against every reason for staying small there is a reason for growing, and the specification asks for both halves of the comparison.' },
      { type: 'bullets', items: [
        '**Lower average cost.** Fixed costs do not rise with output, so spreading them over more units brings the cost per unit down.',
        '**Market power.** A larger share of the market gives a firm more influence over its price and better terms from suppliers, who need its business more than it needs theirs.',
        '**Spreading risk.** A firm selling several products in several markets is not ruined when one of them collapses.',
        '**Access to finance.** Larger firms have more assets to offer as security, so they borrow more cheaply — which makes further growth easier still.',
        '**Managerial motives.** Growth can serve the managers who run a firm even where it does little for its owners, which is the thread picked up in the final chapter.',
      ] },
      { type: 'paragraph', text: `Imani Ceramics illustrates the first reason without any theory of cost curves. Her fixed costs are ${total(FIXED)} a month whatever she produces. Spread over ${units(Q_PROFIT)} that is ${price((FIXED / Q_PROFIT))} a unit; spread over ${units(Q_VOLUME)} it is ${price(FIXED / Q_VOLUME)}. Nothing about the fixed cost changed — only the number of units sharing it.` },
    ],
    realExample: { emoji: '📦', text: 'Delivery networks grow because a depot, a sorting system and a fleet cost much the same whether they handle a thousand parcels a day or ten thousand. The second thousand is far cheaper to carry than the first.' },
    misconception: 'Students write that growth always reduces average cost. It reduces the fixed cost per unit, which is not the whole of average cost. Write instead: growth spreads fixed costs over more units, and whether average cost falls depends on what happens to the other costs.',
    examMatters: 'A Discuss (14 marks, WEC13 Appendix 6) is levels-marked and wants both sides weighed and a judgement reached. Setting a reason for growing directly against a reason for staying small is the comparison the question is asking for.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the arithmetic that explains why a larger output can cost less per unit, using Imani's fixed costs of ${total(FIXED)} a month:`,
      template: [
        `Spread over ${units(Q_PROFIT)}, the fixed cost per unit is ___`,
        `Spread over ${units(Q_VOLUME)}, the fixed cost per unit is ___`,
        'The fixed cost itself has ___',
      ],
      answers: [price(FIXED / Q_PROFIT), price(FIXED / Q_VOLUME), 'not changed'],
      hints: [`${total(FIXED)} divided by ${units(Q_PROFIT)}`, `${total(FIXED)} divided by ${units(Q_VOLUME)}`, 'only the number of units sharing it has changed'],
      distractors: [price(MC), price(FIXED / 5), 'fallen'],
    }),
  };
})();

/* ══ Block 3 — How Businesses Grow (3.3.1 · 2b, 2c) ════════════════════════ */

const organicGrowth = (() => {
  const sid = subId('organic-growth'); // March id, kept
  return {
    id: sid,
    title: 'Organic Growth',
    keyIdea: 'Organic growth is a firm getting bigger by selling more of what it already does — slower than buying a rival, and far easier to control.',
    body: [
      { type: 'paragraph', text: '**Organic growth**, also called internal growth, is expansion generated by the firm\'s own activity: more customers, more outlets, more products, more markets. Nothing is bought; the firm builds it.' },
      { type: 'bullets', items: [
        '**Opening new outlets or capacity** — the same format repeated in more places, funded out of retained profit or borrowing.',
        '**Selling more to existing customers** — through advertising, a wider range, or better distribution.',
        '**Entering new markets** — taking the existing product to buyers who could not previously reach it.',
      ] },
      { type: 'paragraph', text: 'Organic growth is **slower** than buying another firm, because capacity has to be built and customers won one at a time. That slowness is also its defence: the firm grows only as fast as it can fund and manage, so the risk of overreaching is smaller.' },
      { type: 'paragraph', text: 'It also keeps the firm whole. There is no second workforce to absorb and no second set of systems to reconcile, so the methods that made the firm work go into each new outlet intact.' },
      { type: 'paragraph', text: 'The limit is time and the size of the market. A firm that needs to be large quickly, or that needs something it does not have — a technology, a brand, a position in another country — cannot get there organically at all.' },
    ],
    realExample: { emoji: '☕', text: 'Coffee chains have grown largely by opening more of their own shops rather than by buying competitors. Each new site is the same format, run by the same systems, funded from what the existing sites earn.' },
    misconception: 'Students describe organic growth as growth without investment. It is funded expansion; what makes it organic is that the capacity is built rather than bought. Write instead: organic growth expands the firm\'s own operations, as opposed to acquiring another firm\'s.',
    examMatters: 'An Explain (4 marks, WEC13 Appendix 6) on organic growth needs the method and a consequence of it. The consequence that does the most work is the pace, because pace is what the other growth methods are chosen to change.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each expansion by whether the firm built it or bought it:',
      groups: [
        { name: 'Organic growth', items: ['Opening twelve new branches over three years', 'Launching a new product range developed in-house'], why: 'The capacity is created by the firm\'s own activity, so it grows only as fast as it can build and fund' },
        { name: 'External growth', items: ['Acquiring a competitor and its outlets', 'Merging with a firm in a neighbouring country'], why: 'The capacity already exists and changes hands, which is why it is immediate' },
      ],
    }),
  };
})();

const mergersAndTakeovers = (() => {
  const sid = subId('external-growth-mergers'); // March id, kept
  return {
    id: sid,
    title: 'Mergers and Takeovers',
    keyIdea: 'External growth combines two firms — by agreement in a merger, by purchase in a takeover — and the direction of that combination is what the next three chapters classify.',
    body: [
      { type: 'paragraph', text: 'Where organic growth builds, **external growth** combines. Two firms that were separate become one, and the firm grows overnight by however much the other firm was worth.' },
      { type: 'bullets', items: [
        '**A merger** is an agreement between two firms to combine into a single new business. Both sets of owners consent and both usually keep a stake in what results.',
        '**A takeover (acquisition)** is one firm buying control of another. The buyer decides; the firm bought becomes part of it. A takeover can be agreed by the target\'s owners or resisted by them.',
      ] },
      { type: 'paragraph', text: 'The practical difference is **who chooses**. A merger needs both sides to want it; a takeover needs only the buyer and enough of the target\'s owners willing to sell. That is why an agreed merger tends to be announced jointly and a contested takeover is fought in public.' },
      { type: 'paragraph', text: 'Both are immediate. Capacity, customers, staff, brands and technology transfer on completion rather than being built over years — which is the whole attraction, and the source of every problem in the chapter on advantages and disadvantages.' },
      { type: 'paragraph', text: 'What matters for economics is not the legal form but the **direction**: whether the two firms were at the same stage of production, at different stages, or in unrelated markets. Those three directions are the next three chapters.' },
    ],
    realExample: { emoji: '🤝', text: 'Airlines have combined both ways: some through agreed mergers producing a single carrier under a new name, others through one airline buying another outright and absorbing its routes and fleet.' },
    misconception: 'Students use merger and takeover interchangeably. Write instead: a merger is agreed between both firms and a takeover is a purchase of control, which may be agreed or resisted.',
    examMatters: 'A Define (2 marks, WEC13 Appendix 6) that distinguishes a takeover from a merger must name who consents. Saying only that two firms combine describes both and defines neither.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction between the two forms of external growth:',
      template: [
        'In a ___, both sets of owners agree to combine into one new business',
        'In a ___, one firm buys control of another and decides for itself',
        'Either way the growth is ___, because the capacity already exists',
      ],
      answers: ['merger', 'takeover', 'immediate'],
      hints: ['both sides choose it', 'only the buyer needs to choose it', 'contrast it with the pace of organic growth'],
      distractors: ['joint venture', 'gradual'],
    }),
  };
})();

const horizontalIntegration = (() => {
  const sid = subId('horizontal-integration');
  return {
    id: sid,
    title: 'Horizontal Integration',
    keyIdea: 'Horizontal integration combines two firms at the same stage of the same industry — the most direct way to buy market share.',
    body: [
      { type: 'paragraph', text: '**Horizontal integration** is a merger or takeover between two firms **at the same stage of production in the same industry**. A coffee roastery buying another coffee roastery; one airline buying another airline.' },
      { type: 'paragraph', text: 'The firms were competitors, so combining them removes a competitor and adds its customers. That is the point, and it is why this is the direction that most often attracts the attention of a competition regulator.' },
      { type: 'bullets', items: [
        '**Market share rises immediately** by the whole of the other firm\'s share, and with it the combined firm\'s influence over price.',
        '**Duplicated costs can be removed.** Two head offices, two delivery networks and two sets of systems become one, which spreads the remaining fixed costs over the combined output.',
        '**Expertise is acquired ready-made** — the other firm\'s methods, brands and skilled staff arrive with it.',
      ] },
      { type: 'paragraph', text: 'The cost is concentration. Fewer firms in a market means less choice for consumers and less pressure on the combined firm to keep prices down or quality up. Competition authorities in most economies can block a horizontal merger, or permit it only if parts of the business are sold to someone else.' },
      { type: 'paragraph', text: 'Removing duplicated costs also means removing the people doing duplicated jobs, which is why this direction produces the sharpest effects on workers.' },
    ],
    realExample: { emoji: '✈️', text: 'When two airlines serving overlapping routes combine, the new carrier can run one booking system, one maintenance operation and one headquarters — and passengers on the overlapping routes have one airline to choose from where there were two.' },
    misconception: 'Students say horizontal integration means firms in the same industry. Same industry is not enough — a roastery and a coffee farm are both in coffee. Write instead: horizontal integration combines firms at the same STAGE of production.',
    examMatters: 'An Analyse (6 marks, WEC13 Appendix 6) requires a chain of reasoning. Identifying the direction is the first link, not the answer: follow it through to concentration, price or cost before stopping.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in order, from the merger to the reason a regulator may intervene:',
      correctOrder: [
        'Two firms at the same stage of the same industry combine',
        'One fewer competitor remains in the market than before',
        'The combined firm has more influence over the price it charges',
        'A competition authority examines whether consumers are worse off',
      ],
      why: [
        'This is what makes the integration horizontal rather than vertical or conglomerate',
        'The firms were rivals, so combining them removes one from the market',
        'Less competition means less pressure to hold the price down',
        'Consumer harm is the test a competition authority applies, so it comes last',
      ],
    }),
  };
})();

const verticalIntegration = (() => {
  const sid = subId('vertical-integration');
  return {
    id: sid,
    title: 'Forward and Backward Vertical Integration',
    keyIdea: 'Vertical integration combines firms at different stages of the same supply chain: backward towards the supplier, forward towards the customer.',
    body: [
      { type: 'paragraph', text: '**Vertical integration** is a merger or takeover between firms at **different stages of the same supply chain**. The direction is named from the point of view of the firm doing the acquiring, and the reference point is the customer.' },
      { type: 'bullets', items: [
        '**Backward vertical integration** — the firm acquires its **supplier**, moving back towards the source of its inputs. A roastery buying a coffee farm.',
        '**Forward vertical integration** — the firm acquires its **customer**, moving forward towards the final buyer. A roastery buying a chain of cafés.',
      ] },
      { type: 'subheading', text: 'What each direction secures' },
      { type: 'paragraph', text: '**Backward** integration secures **supply**: the input arrives at cost rather than at a supplier\'s price, quantity is guaranteed when the market is tight, and quality is controlled at the source instead of inspected on arrival.' },
      { type: 'paragraph', text: '**Forward** integration secures **access to the market**: the firm gets a guaranteed outlet, the retailer\'s margin becomes its own, and it controls how the product is presented and priced to the final customer.' },
      { type: 'paragraph', text: 'Both directions can also shut rivals out. A firm that owns the only local supplier, or the only chain of outlets, can refuse to deal with competitors or charge them more than it charges itself — which is why vertical mergers are examined by regulators even though the firms were never competitors.' },
    ],
    realExample: { emoji: '🎬', text: 'Streaming services that began by licensing films from studios now produce their own. Buying or building the production stage is backward integration: the input is secured, and rivals can no longer bid for it.' },
    misconception: 'Students decide the direction from which firm is larger. Size is irrelevant. Write instead: name the direction from the acquirer\'s position in the chain — backward towards its supplier, forward towards its customer.',
    examMatters: 'An Explain (4 marks, WEC13 Appendix 6) asking for an impact requires a two-stage chain. Naming the direction and then what it secures — supply for backward, market access for forward — is the two stages.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each acquisition by its direction along the supply chain:',
      groups: [
        { name: 'Backward vertical', items: ['A roastery buys a coffee farm', 'A carmaker buys a battery manufacturer'], why: 'The acquirer moves towards the source of its inputs, which secures supply, quality and cost' },
        { name: 'Forward vertical', items: ['A roastery buys a chain of cafés', 'A publisher buys a chain of bookshops'], why: 'The acquirer moves towards the final buyer, which secures an outlet and the margin earned on it' },
        { name: 'Horizontal', items: ['A roastery buys another roastery', 'A carmaker buys a rival carmaker'], why: 'The two firms are at the same stage, so nothing moves along the chain at all' },
      ],
    }),
  };
})();

const conglomerateIntegration = (() => {
  const sid = subId('conglomerate-integration');
  return {
    id: sid,
    title: 'Conglomerate Integration',
    keyIdea: 'Conglomerate integration combines firms in unrelated markets, so the gain is diversification rather than anything to do with the product.',
    body: [
      { type: 'paragraph', text: '**Conglomerate integration** is a merger or takeover between firms in **unrelated markets**. There is no shared stage of production and no supply chain connecting them: a ceramics manufacturer buying an insurance business.' },
      { type: 'paragraph', text: 'Since the firms have nothing in common operationally, none of the usual gains is available. There is no rival removed, no supply secured, no outlet acquired. What remains is **diversification**.' },
      { type: 'bullets', items: [
        '**Spreading risk.** Profits from unrelated markets rarely fall at the same time, so a bad year in one is cushioned by the other. The combined firm is steadier than either part.',
        '**Using a resource across markets.** Capital, management capacity or a distribution network built for one business can be put to work in another.',
        '**Escaping a market in decline.** A firm whose own market is shrinking can move its capital somewhere with more future rather than fight for a larger share of less.',
      ] },
      { type: 'paragraph', text: 'The weakness is the same feature read the other way. Managers who understand one industry are running another they do not, so the acquired business is often managed worse than it was before — and diversification is something the owners could have done for themselves, by holding stakes in both firms separately, without paying a premium for either.' },
    ],
    realExample: { emoji: '🧳', text: 'Large groups have combined businesses as unlike as hotels, engineering and food processing. What holds such a group together is the flow of capital between the parts, not anything about what the parts make.' },
    misconception: 'Students treat conglomerate integration as the safest kind because risk is spread. Risk to the firm falls; the risk of managing an unfamiliar business badly rises. Write instead: diversification steadies profits but removes the expertise the other directions rely on.',
    examMatters: 'A Discuss (14 marks, WEC13 Appendix 6) is levels-marked and wants a judgement. The strongest line on a conglomerate merger weighs the steadier profit against the loss of expertise, rather than listing both and stopping.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each type of integration to the gain that is specific to it:',
      pairs: [
        { left: 'Horizontal', right: 'A competitor is removed and market share rises', why: 'The firms were at the same stage, so one of them was a rival until the merger' },
        { left: 'Backward vertical', right: 'The supply of an input is secured at cost', why: 'The acquirer now owns the stage that used to sell to it' },
        { left: 'Forward vertical', right: 'A guaranteed outlet to the final customer', why: 'The acquirer now owns the stage that used to buy from it' },
        { left: 'Conglomerate', right: 'Profits are steadier because the markets are unrelated', why: 'Nothing operational is shared, so diversification is the only gain left' },
      ],
    }),
  };
})();

const advantagesAndDisadvantages = (() => {
  const sid = subId('advantages-and-disadvantages-of-integration');
  return {
    id: sid,
    title: 'Advantages and Disadvantages of Each Type',
    keyIdea: 'Each direction has its own case for and against, and the specification asks for them type by type rather than as one list about mergers in general.',
    body: [
      { type: 'paragraph', text: 'The specification asks for the advantages and disadvantages of **each type** of merger or takeover. They are not the same, because what each direction buys is not the same.' },
      { type: 'subheading', text: 'Horizontal' },
      { type: 'paragraph', text: '**For:** market share and influence over price rise at once; duplicated head offices, systems and networks can be removed; the rival\'s brands and skilled staff arrive ready-made. **Against:** competition authorities may block it or force parts to be sold; consumers face less choice; the removal of duplication is the removal of jobs.' },
      { type: 'subheading', text: 'Vertical' },
      { type: 'paragraph', text: '**For (backward):** supply, quality and input cost are secured at the source. **For (forward):** an outlet is guaranteed and the retailer\'s margin is captured. **Against:** the firm now runs a business it may not understand; it loses the discipline of buying from whoever is cheapest; and by refusing to deal with rivals it can attract a regulator even though it never removed a competitor.' },
      { type: 'subheading', text: 'Conglomerate' },
      { type: 'paragraph', text: '**For:** profits are steadier because unrelated markets rarely fall together, and capital can be moved to where the returns are better. **Against:** no operational gains exist at all, and managers run an industry they do not know.' },
      { type: 'paragraph', text: 'One caution applies to all three. The gains are **expected** at the time of the deal and the costs are certain, which is why so many mergers do not deliver what was claimed for them.' },
    ],
    realExample: { emoji: '⚖️', text: 'Competition authorities in many economies have approved large horizontal mergers only on condition that specific outlets or routes are sold to a rival, so that the market keeps a competitor it would otherwise have lost.' },
    misconception: 'Students write one list of merger advantages and apply it everywhere. Write instead: name the direction first, because securing supply is an argument for vertical integration and says nothing about a conglomerate.',
    examMatters: 'An Evaluate (20 marks, WEC13 Appendix 6) is levels-marked and requires a supported judgement. Arguing the case for the specific direction in the extract, and against it, goes further than a general case about mergers.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each argument by the type of integration it actually belongs to:',
      groups: [
        { name: 'Horizontal', items: ['A competition authority may require outlets to be sold', 'Two head offices become one'], why: 'Both follow from the firms having been rivals at the same stage' },
        { name: 'Vertical', items: ['The firm no longer buys from whoever is cheapest', 'Quality is controlled at the source of the input'], why: 'Both follow from owning a different stage of the same chain' },
        { name: 'Conglomerate', items: ['Profits are steadier because the markets are unrelated', 'Managers run an industry they do not know'], why: 'Both follow from there being no operational connection between the businesses' },
      ],
    }),
  };
})();

/* ══ Block 4 — Constraints on Growth and Its Impact (3.3.1 · 2d, 2f) ═══════ */

const sizeOfMarketAndFinance = (() => {
  const sid = subId('size-of-market-and-access-to-finance');
  return {
    id: sid,
    title: 'Size of Market and Access to Finance',
    keyIdea: 'The first two constraints are external: a firm cannot sell to customers who do not exist, and it cannot expand with money it cannot raise.',
    body: [
      { type: 'paragraph', text: 'The specification lists four constraints on business growth. The first two are imposed on the firm from outside, and neither can be overcome by wanting to grow more.' },
      { type: 'subheading', text: 'The size of the market' },
      { type: 'paragraph', text: 'A firm can only grow as large as the demand it serves. Where the market is small — a specialist product, a thinly populated region, a service delivered in person — the ceiling is reached quickly however well the firm is run.' },
      { type: 'paragraph', text: 'A firm that has hit this ceiling has two ways past it, and both change what the firm is: sell something different, or sell somewhere different. Both are riskier than growing within a market it already understands.' },
      { type: 'subheading', text: 'Access to finance' },
      { type: 'paragraph', text: 'Expansion has to be paid for before it earns anything. The firm can use **retained profit**, limited to what it has already made; it can **borrow**, which usually requires assets to offer as security; or it can **bring in new owners**, which means giving up a share of control.' },
      { type: 'paragraph', text: 'Each route is harder for a small firm, so it borrows on worse terms than a large one — or is refused. The constraint compounds: being small is itself the reason finance is expensive, which is the reason the firm stays small.' },
    ],
    realExample: { emoji: '🏦', text: 'Lenders routinely ask a small firm\'s owners to guarantee a loan personally, because the business itself has too few assets to stand behind it. A large firm borrows against its own balance sheet and pays less for the money.' },
    misconception: 'Students treat access to finance as meaning the firm has no money. It means finance is unavailable on terms that make expansion worth doing. Write instead: the firm cannot raise the capital cheaply enough for the expansion to pay.',
    examMatters: 'An Analyse (6 marks, WEC13 Appendix 6) wants depth rather than breadth. One constraint followed from cause to consequence for the firm goes further than all four named.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in order to show why being small makes staying small more likely:',
      correctOrder: [
        'A small firm has few assets and a short trading record',
        'Lenders judge it riskier and charge more, or refuse it',
        'The expansion cannot be funded on terms that make it worthwhile',
        'Nothing about its position has changed, so the next loan is priced the same way',
      ],
      why: [
        'This is the firm\'s starting position, not a consequence of anything in the chain',
        'Security and record are what a lender prices, so both raise the cost of borrowing',
        'A viable expansion still does not happen if the finance costs more than it returns',
        'Nothing about the firm\'s position has changed, so the constraint repeats',
      ],
    }),
  };
})();

const ownerObjectivesAndRegulation = (() => {
  const sid = subId('owner-objectives-and-regulation');
  return {
    id: sid,
    title: 'Owner Objectives, Regulation and Bureaucracy',
    keyIdea: 'The other two constraints are the owner\'s own choice, and the cost of complying with rules that get heavier as a firm gets larger.',
    body: [
      { type: 'subheading', text: 'Owner objectives' },
      { type: 'paragraph', text: 'Not every owner wants a larger business. Growth means borrowing, delegating, hiring managers and answering to lenders or new owners, and an owner who values independence or predictable hours may decline all of it.' },
      { type: 'paragraph', text: 'This constraint is different in kind: nothing is stopping the firm. The market may be large and the finance available, and the firm still does not grow, because the person who decides does not want it to.' },
      { type: 'subheading', text: 'Government regulation and bureaucracy' },
      { type: 'paragraph', text: 'Rules on employment, safety, reporting, tax and the environment apply to firms of every size, but the burden does not fall evenly. Much of the cost of complying is **fixed** — someone must read the rules and file the returns whether the firm has ten employees or ten thousand.' },
      { type: 'bullets', items: [
        '**Thresholds.** Many obligations begin at a given number of employees or level of turnover, so growing past one adds a cost in a single step.',
        '**Time as well as money.** Approvals, licences and planning decisions delay an expansion even where the firm can afford them.',
        '**Competition rules.** A firm large enough to affect a market faces scrutiny a small firm never encounters.',
      ] },
      { type: 'paragraph', text: 'The effect is to make the step up in size more expensive than the size itself, which is why firms sometimes stop just below a threshold rather than cross it.' },
    ],
    realExample: { emoji: '📋', text: 'In many economies a firm crossing an employee threshold acquires reporting and consultation duties overnight. The extra staff member is cheap; the obligations that arrive with them are not.' },
    misconception: 'Students say regulation stops firms growing. It raises the cost of growing, and falls hardest at the thresholds. Write instead: compliance costs are largely fixed, so they weigh more heavily on a smaller firm and jump when a threshold is crossed.',
    examMatters: 'An Examine (8 marks, WEC13 Appendix 6) requires the mechanism and its consequence. For regulation the mechanism is that compliance cost is largely fixed; the consequence is that it bears on the smaller firm.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the four constraints on business growth the specification lists:',
      template: [
        'Size of ___ — the firm cannot sell to customers who do not exist',
        'Access to ___ — the expansion cannot be paid for on terms that make it worthwhile',
        'Owner ___ — the person who decides does not want a larger business',
        'Government regulation and ___ — the cost of compliance is largely fixed',
      ],
      answers: ['market', 'finance', 'objectives', 'bureaucracy'],
      hints: ['the number of customers in existence', 'the money to expand with', 'what the owner actually wants', 'the paperwork that comes with the rules'],
      distractors: ['competition', 'demand', 'taxation'],
    }),
  };
})();

const impactOfGrowthOnBusinesses = (() => {
  const sid = subId('impact-of-growth-on-businesses');
  return {
    id: sid,
    title: 'The Impact of Growth on Businesses',
    keyIdea: 'Growth changes the firm itself: lower fixed costs per unit and more market power, against harder coordination and a longer distance between decision and consequence.',
    body: [
      { type: 'paragraph', text: 'The specification asks for the **impact of growth of firms on businesses, workers and consumers**. This chapter takes the firm; the next takes the other two.' },
      { type: 'subheading', text: 'What growth gives the firm' },
      { type: 'bullets', items: [
        '**Fixed costs spread further.** The same premises, systems and management serve more output, so each unit carries less of them.',
        '**More power in its markets.** A larger buyer gets better terms from suppliers; a larger seller has more influence over its price.',
        '**Cheaper finance.** More assets and a longer record mean better borrowing terms.',
        '**More resilience.** A firm selling several products in several markets survives the loss of any one of them.',
      ] },
      { type: 'subheading', text: 'What growth costs the firm' },
      { type: 'bullets', items: [
        '**Coordination gets harder.** More people, sites and layers mean decisions take longer to make and longer to reach whoever must act on them.',
        '**Control weakens.** The owner cannot see everything, so the firm runs on reported numbers rather than on what is actually happening.',
        '**Motivation can fall.** An employee whose contribution is one part of a very large total may find it harder to see that it matters.',
      ] },
      { type: 'paragraph', text: 'Both columns follow from the same change in size, so a firm does not choose one. The question is which column grows faster — which is why some industries are dominated by a few enormous firms and others by many small ones.' },
    ],
    realExample: { emoji: '🏗️', text: 'A construction firm that doubles in size gets better prices on materials and needs a layer of managers it did not need before. Both arrive together.' },
    misconception: 'Students write that growth makes a firm more efficient. It changes which costs matter: fixed costs per unit fall while coordination costs rise. Write instead: growth spreads fixed costs and complicates coordination, and the net effect depends on the firm.',
    examMatters: 'A Discuss (14 marks, WEC13 Appendix 6) is levels-marked and wants both sides and a judgement. Two effects developed on each side, weighed against each other, is the shape the command word asks for.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each consequence of growth by whether it helps the firm or hinders it:',
      groups: [
        { name: 'Helps the firm', items: ['Fixed costs are spread over more units', 'Suppliers offer better terms to a larger buyer'], why: 'Both come from size itself and reduce the cost of doing business' },
        { name: 'Hinders the firm', items: ['Decisions pass through more layers before anyone acts', 'The owner relies on reports rather than seeing the work'], why: 'Both come from the same size and make the firm harder to run' },
      ],
    }),
  };
})();

const impactOfGrowthOnWorkersAndConsumers = (() => {
  const sid = subId('impact-of-growth-on-workers-and-consumers');
  return {
    id: sid,
    title: 'The Impact of Growth on Workers and Consumers',
    keyIdea: 'Growth cuts both ways for workers and for consumers, and which way it falls depends on whether the growth added capacity or merely combined it.',
    body: [
      { type: 'subheading', text: 'Workers' },
      { type: 'bullets', items: [
        '**For:** a larger firm can pay more, offers a career path between roles and sites, trains more, and is more secure to work for than a firm depending on one product.',
        '**Against:** growth by merger removes duplicated jobs; work in a large firm is more specialised and can be more repetitive; and the distance between an employee and the person deciding their future is greater.',
      ] },
      { type: 'paragraph', text: 'Which side dominates depends on **how** the firm grew. Organic growth adds capacity, so it usually adds jobs. A horizontal merger combines capacity that already existed, so the duplication it removes is largely people.' },
      { type: 'subheading', text: 'Consumers' },
      { type: 'bullets', items: [
        '**For:** lower costs per unit can be passed on as lower prices; a larger firm can fund research and offer a wider range; and it can serve places a small firm could not reach.',
        '**Against:** fewer competitors means less pressure to pass those savings on at all, less choice, and less reason to keep quality up.',
      ] },
      { type: 'paragraph', text: 'The consumer case therefore turns on one question: does the firm still face competition? Lower costs reach the consumer as lower prices only if a rival would otherwise take the business. Where growth has removed the rivals, the saving stays with the firm — which is exactly what a competition authority exists to test.' },
    ],
    realExample: { emoji: '🛒', text: 'Large retail chains reach prices a single shop cannot match, and where one chain ends up alone in a small town the prices on its shelves need not stay there.' },
    misconception: 'Students write that growth benefits consumers through lower prices. Lower costs make lower prices possible; competition is what makes them happen. Write instead: the saving reaches consumers only where the firm still faces rivals who would otherwise take the business.',
    examMatters: 'An Evaluate (20 marks, WEC13 Appendix 6) is levels-marked and requires a supported judgement. The condition — whether competition survives the growth — is a stronger basis for judgement than asserting that consumers gain or lose.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in order to show when a cost saving from growth actually reaches consumers:',
      correctOrder: [
        'Growth spreads the firm\'s fixed costs over more units',
        'Each unit becomes cheaper to produce than it was',
        'A rival stands ready to take the business if the price stays high',
        'The firm cuts its price and the consumer gains',
      ],
      why: [
        'The saving has to exist before anything can be passed on',
        'Lower cost per unit is what creates room for a lower price',
        'Competitive pressure is the condition, and without it the chain stops here',
        'The price cut is the consequence of the pressure, not of the saving alone',
      ],
    }),
  };
})();

/* ══ Block 5 — Demergers (3.3.1 · 2g) ══════════════════════════════════════ */

const reasonsForDemergers = (() => {
  const sid = subId('diseconomies-demergers'); // March id, kept
  return {
    id: sid,
    title: 'Reasons for Demergers',
    keyIdea: 'A demerger splits part of a firm off into a separate company owned by the same shareholders — which is not the same as selling it to somebody else.',
    body: [
      { type: 'paragraph', text: 'A **demerger** is the separation of part of a business into an independent company. The parent firm does not receive a payment: the new company\'s shares go to the parent\'s existing owners, who end up holding two companies where they held one.' },
      { type: 'paragraph', text: 'That is the distinction the specification is asking for, and it is the one most often lost. Selling a division **to another firm** is a **divestment** or sell-off: the division changes owner and cash comes in. In a demerger nothing is sold and no new owner appears — the business is simply split in two.' },
      { type: 'subheading', text: 'Why a firm demerges' },
      { type: 'bullets', items: [
        '**Focus.** Two businesses with different customers, risks and time horizons compete for one management\'s attention. Split, each is run by people whose whole job it is.',
        '**Coordination.** A group that has grown by acquisition can become too complex to run, and separating the parts removes the layers built to hold them together.',
        '**Value.** Investors who want one of the businesses must buy both, so neither may be valued properly.',
        '**Regulation.** A competition authority may require a firm to separate part of its business as the condition of approving something else.',
      ] },
      { type: 'paragraph', text: 'A demerger is therefore not a reversal of a failed merger so much as an admission that two businesses are worth more apart than together.' },
    ],
    realExample: { emoji: '💊', text: 'GSK separated its consumer healthcare business into Haleon, a company listed in its own right whose shares went to GSK\'s existing shareholders. Nobody bought it: the group was divided, and its owners held two companies afterwards.' },
    misconception: 'Students describe selling a division to another company as a demerger. Write instead: a demerger splits a business into a separate company owned by the same shareholders; a sale to another firm is a divestment.',
    examMatters: 'A Define (2 marks, WEC13 Appendix 6) on a demerger must say what happens to ownership. Saying only that a firm splits up does not separate a demerger from a divestment.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each event by whether it is a demerger or a divestment:',
      groups: [
        { name: 'Demerger', items: ['A division becomes a separate listed company owned by the same shareholders', 'A group splits in two and its owners hold shares in both'], why: 'No buyer appears and no payment is received: the business is divided, not sold' },
        { name: 'Divestment', items: ['A division is sold to a competitor for cash', 'A group sells a subsidiary to an investment firm'], why: 'The division changes owner and the seller receives a payment for it' },
      ],
    }),
  };
})();

const impactOfDemergers = (() => {
  const sid = subId('impact-of-demergers');
  return {
    id: sid,
    title: 'The Impact of Demergers',
    keyIdea: 'Splitting a firm sharpens focus and loses shared costs — and the same split can mean redundancy for one worker and more choice for a consumer.',
    body: [
      { type: 'paragraph', text: 'The specification asks for the impact of demergers on **businesses, workers and consumers**, so each is taken in turn.' },
      { type: 'subheading', text: 'Businesses' },
      { type: 'bullets', items: [
        '**For:** each company is run by a management that understands it; capital is allocated to its own business rather than across an argument; and each can be valued and funded separately.',
        '**Against:** costs that were shared must be duplicated — two head offices, two sets of systems, two boards — and neither company has the other to fall back on in a bad year.',
      ] },
      { type: 'subheading', text: 'Workers' },
      { type: 'bullets', items: [
        '**For:** promotion prospects improve in a smaller organisation, and the connection between work done and results seen is shorter.',
        '**Against:** central functions are often cut in the split, and employees in a business no longer supported by a larger group carry more risk if it struggles.',
      ] },
      { type: 'subheading', text: 'Consumers' },
      { type: 'bullets', items: [
        '**For:** two focused firms may serve their markets better than one distracted group, and where the demerger restores a competitor, prices face pressure again.',
        '**Against:** the duplicated overheads have to be paid for, and any saving the combined group had been passing on is gone.',
      ] },
      { type: 'paragraph', text: 'The pattern across all three is the same trade: **focus against shared cost**. Whether it is worth making depends on how little the two businesses had in common.' },
    ],
    realExample: { emoji: '🔀', text: 'When a group separates a fast-growing division from a slow, stable one, each ends up able to raise money on the terms that suit it — the grower for expansion, the steady business for income — which the combined group could not do at once.' },
    misconception: 'Students treat a demerger as damage control after a failed merger. Write instead: a demerger trades shared costs for focus, and it is worth doing when the two businesses gain little from being run together.',
    examMatters: 'An Examine (8 marks, WEC13 Appendix 6) wants the mechanism and a consequence for a named group. Taking businesses, workers or consumers in turn keeps the answer on the group the question asked about.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each group to the trade a demerger makes for them:',
      pairs: [
        { left: 'The businesses', right: 'Focused management, against duplicated overheads', why: 'Each company gains its own management and loses the costs it used to share' },
        { left: 'Workers', right: 'Shorter promotion paths, against cuts to central functions', why: 'A smaller organisation opens routes upward and needs only one of each shared department' },
        { left: 'Consumers', right: 'A restored competitor, against the cost of the duplication', why: 'Competition can return where the split creates two rivals, but the extra overheads are still paid for' },
      ],
    }),
  };
})();

/* ══ Block 6 — Business Objectives (3.3.1 · 3a, 3b, 3c) ════════════════════ */
/*
 * One firm carries all three objectives and their formulae, so the reader compares three outputs of
 * the same business rather than three unrelated diagrams. Every figure is generated in
 * _packet20-util.mjs from P = 60 − 2Q, MR = 60 − 4Q, MC = 20 and TC = 20Q + 72.
 */

const profitMaximisation = (() => {
  const sid = subId('profit-maximisation'); // March id, kept
  return {
    id: sid,
    title: 'Profit Maximisation',
    keyIdea: `Profit is largest where MC = MR — the last unit worth making is the one that adds exactly what it costs.`,
    body: [
      { type: 'paragraph', text: `**Profit maximisation** is the objective economics assumes a firm pursues. Its formula is **MC = MR**: produce every unit whose addition to revenue is at least its addition to cost, and stop at the one where the two are equal.` },
      { type: 'paragraph', text: `${FIRM} sells tiles. Her demand curve is **P = ${A} − ${B}Q**, so her marginal revenue is **MR = ${A} − ${2 * B}Q**, and each extra unit costs her **${price(MC)}** to make.` },
      { type: 'bullets', items: [
        `**Setting MC = MR:** ${A} − ${2 * B}Q = ${MC}, so Q = **${units(Q_PROFIT)}** a month.`,
        `**The price that sells it:** P = ${A} − ${B} × ${Q_PROFIT} = **${price(arAt(Q_PROFIT))}**.`,
        `**Revenue:** ${price(arAt(Q_PROFIT))} × ${units(Q_PROFIT)} = ${total(trAt(Q_PROFIT))}. **Costs:** ${total(tcAt(Q_PROFIT))}. **Profit: ${total(profitAt(Q_PROFIT))}.**`,
      ] },
      { type: 'paragraph', text: `Why stop there? At ${units(Q_PROFIT)} the next unit would add ${price(mrAt(Q_PROFIT + 1))} to revenue and ${price(MC)} to cost, so making it would reduce profit. Below ${units(Q_PROFIT)} the opposite holds and the unit is worth making. The equality marks the turning point, which is why it is the formula.` },
      { type: 'paragraph', text: `No other output in this section beats ${total(profitAt(Q_PROFIT))}, and the next two chapters show what the firm gives up by choosing one.` },
    ],
    realExample: { emoji: '🏭', text: 'A manufacturer deciding whether to run an extra shift compares what the shift\'s output will sell for against what the shift costs to run. That comparison is MC against MR, made in the language of the factory floor.' },
    misconception: 'Students write that profit is maximised where revenue is highest or where cost is lowest. Neither is true: the largest gap between them is what matters. Write instead: profit is maximised where MC = MR, which is not where revenue peaks.',
    examMatters: 'A Calculate (4 marks, WEC13 Appendix 6) involves several stages from given data and expects the working to be shown. Setting MC = MR, solving for Q and then substituting back for the price is three stages, each of which is a line of that working.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: `Put these steps in the order you would work through to find ${FIRM}'s profit-maximising price:`,
      correctOrder: [
        `Write marginal revenue from the demand curve: MR = ${A} − ${2 * B}Q`,
        `Set MR equal to marginal cost: ${A} − ${2 * B}Q = ${MC}`,
        `Solve for the output: Q = ${units(Q_PROFIT)}`,
        `Substitute that output into the demand curve to get the price: ${price(arAt(Q_PROFIT))}`,
      ],
      why: [
        'MR has to exist before it can be set equal to anything, and it comes from the demand curve',
        'The condition is the equality, so it is written before it is solved',
        'Solving the equality gives the quantity, which is what the condition determines',
        'The demand curve turns that quantity into the price the market will pay for it',
      ],
    }),
  };
})();

const revenueMaximisation = (() => {
  const sid = subId('alternative-objectives'); // March id, kept
  return {
    id: sid,
    title: 'Revenue Maximisation',
    keyIdea: `Revenue is largest where MR = 0 — past that point another unit takes more off the price than it brings in.`,
    body: [
      { type: 'paragraph', text: '**Revenue maximisation** is the objective of making total revenue as large as possible, without regard to cost. Its formula is **MR = 0**: keep selling while the next unit still adds something to revenue, and stop when it adds nothing.' },
      { type: 'bullets', items: [
        `**Setting MR = 0:** ${A} − ${2 * B}Q = 0, so Q = **${units(Q_REVENUE)}** a month.`,
        `**The price:** P = ${A} − ${B} × ${Q_REVENUE} = **${price(arAt(Q_REVENUE))}**.`,
        `**Revenue: ${total(trAt(Q_REVENUE))}** — more than the ${total(trAt(Q_PROFIT))} the profit-maximising output brought in.`,
        `**Profit: ${total(profitAt(Q_REVENUE))}**, against ${total(profitAt(Q_PROFIT))}. The extra ${total(trAt(Q_REVENUE) - trAt(Q_PROFIT))} of revenue cost ${total(profitAt(Q_PROFIT) - profitAt(Q_REVENUE))} of profit.`,
      ] },
      { type: 'paragraph', text: `The two objectives pull in the same direction up to a point and then separate. Between ${units(Q_PROFIT)} and ${units(Q_REVENUE)} every extra unit still adds revenue, so a revenue maximiser keeps going — but each of those units costs ${price(MC)} and adds less than that to revenue, so profit falls the whole way.` },
      { type: 'subheading', text: 'Why a firm would want this' },
      { type: 'paragraph', text: 'Revenue is visible, immediate and easy to measure, and managers are often rewarded on it. A firm may also be buying market share, betting that customers won now are worth more than the profit given up — which is a reason to accept lower profit, not a reason to ignore it.' },
    ],
    realExample: { emoji: '📦', text: 'Online retailers have expanded for long periods on thin profits, reinvesting the cash they generated into warehouses, delivery and new product lines. The objective was revenue and growth, not the largest profit available that year.' },
    misconception: 'Students write that a firm maximising revenue is maximising profit "in the long run". It may be pursuing growth deliberately, which is a different objective. Write instead: revenue maximisation produces a larger output and a lower price than MC = MR, and less profit.',
    examMatters: 'An Explain (4 marks, WEC13 Appendix 6) on revenue maximisation needs the formula and its consequence: MR = 0 gives a larger output than MC = MR, so the price is lower and profit is not the largest available.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete ${FIRM}'s comparison between the two objectives:`,
      template: [
        `Profit maximisation uses the formula ___, giving ${units(Q_PROFIT)} at ${price(arAt(Q_PROFIT))}`,
        `Revenue maximisation uses the formula ___, giving ${units(Q_REVENUE)} at ${price(arAt(Q_REVENUE))}`,
        'Revenue maximisation therefore produces a ___ output at a lower price',
      ],
      answers: ['MC = MR', 'MR = 0', 'larger'],
      hints: ['the last unit adds exactly what it costs', 'the next unit would add nothing to revenue', 'compare the two quantities'],
      distractors: ['AR = AC', 'smaller', 'MC = 0'],
    }),
  };
})();

const salesVolumeMaximisation = (() => {
  const sid = subId('sales-volume-maximisation');
  return {
    id: sid,
    title: 'Sales Volume Maximisation',
    keyIdea: `Sales volume maximisation sells as many units as possible while still covering every cost, which is where AR = AC and profit is zero.`,
    body: [
      { type: 'paragraph', text: '**Sales volume maximisation** is the objective of selling the largest possible number of units, subject to the firm still covering its costs. Its formula is **AR = AC**: the price the firm receives per unit is exactly the cost per unit, so nothing is left over.' },
      { type: 'bullets', items: [
        `**Setting AR = AC:** ${A} − ${B}Q = ${MC} + ${FIXED}/Q, which solves to Q = **${units(Q_VOLUME)}**.`,
        `**The price:** **${price(arAt(Q_VOLUME))}** — and the average cost at that output is **${price(acAt(Q_VOLUME))}**, the same figure, which is what the condition requires.`,
        `**Revenue: ${total(trAt(Q_VOLUME))}. Costs: ${total(tcAt(Q_VOLUME))}. Profit: ${total(profitAt(Q_VOLUME))}.**`,
      ] },
      { type: 'subheading', text: 'The difference students most often miss' },
      { type: 'paragraph', text: `Selling the most units and earning the most revenue are **not the same objective**. ${FIRM}'s revenue at ${units(Q_VOLUME)} is ${total(trAt(Q_VOLUME))} — which is ${total(trAt(Q_REVENUE) - trAt(Q_VOLUME))} **less** than the ${total(trAt(Q_REVENUE))} she earns selling the fewer ${units(Q_REVENUE)}. Past the revenue-maximising output the price falls faster than the extra units make up for.` },
      { type: 'paragraph', text: `So the three objectives give three different outputs — ${units(Q_PROFIT)}, ${units(Q_REVENUE)} and ${units(Q_VOLUME)} — three different prices, and three different profits: ${total(profitAt(Q_PROFIT))}, ${total(profitAt(Q_REVENUE))} and ${total(profitAt(Q_VOLUME))}. Which is right depends entirely on what the firm is trying to do.` },
    ],
    realExample: { emoji: '🎟️', text: 'A venue that would rather play to a full room than an empty one prices seats to fill it, accepting that the last seats sold contribute almost nothing beyond covering what they cost.' },
    misconception: 'Students treat revenue maximisation and sales volume maximisation as the same objective. They are not: the volume objective sells more units for less revenue. Write instead: revenue maximisation sets MR = 0; sales volume maximisation sets AR = AC and takes profit to zero.',
    examMatters: 'A Calculate (4 marks, WEC13 Appendix 6) may use a prescribed formula. For sales volume maximisation the formula is AR = AC, and showing that the price and the average cost come to the same figure is what demonstrates the condition holds.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each business objective to its formula and what it produces:',
      pairs: [
        { left: 'Profit maximisation', right: `MC = MR — ${units(Q_PROFIT)} at ${price(arAt(Q_PROFIT))}`, why: `The last unit adds exactly what it costs, which leaves the largest profit of ${total(profitAt(Q_PROFIT))}` },
        { left: 'Revenue maximisation', right: `MR = 0 — ${units(Q_REVENUE)} at ${price(arAt(Q_REVENUE))}`, why: `The next unit would add nothing to revenue, so revenue peaks here at ${total(trAt(Q_REVENUE))}` },
        { left: 'Sales volume maximisation', right: `AR = AC — ${units(Q_VOLUME)} at ${price(arAt(Q_VOLUME))}`, why: `The price exactly covers the cost per unit, so this is the most she can sell without a loss` },
      ],
      distractors: ['AC at its lowest point'],
    }),
  };
})();

const satisficing = (() => {
  const sid = subId('satisficing');
  return {
    id: sid,
    title: 'Satisficing',
    keyIdea: 'Satisficing is aiming for an outcome good enough to keep every interested party content, rather than the maximum of any one thing.',
    body: [
      { type: 'paragraph', text: 'The specification lists **behavioural theories: satisficing** alongside the three maximising objectives. **Satisficing** means settling for an outcome that is satisfactory rather than pursuing the maximum — and it is the objective that best describes what large firms actually do.' },
      { type: 'paragraph', text: 'The reason is that a firm has more than one group to keep content, and their wants conflict.' },
      { type: 'bullets', items: [
        '**Owners** want a return on the capital they risked.',
        '**Managers** want security, resources and a manageable workload.',
        '**Employees** want pay, conditions and stability.',
        '**Customers** want a low price and high quality; **suppliers** want the opposite of what the firm wants from them.',
      ] },
      { type: 'paragraph', text: 'Maximising profit means pushing every one of those groups to the limit of what it will accept. Satisficing means finding a position where each is content enough not to act — the owners get an acceptable return rather than the largest possible, and the firm buys stability with the profit it did not pursue.' },
      { type: 'paragraph', text: 'Satisficing also reflects what managers can actually know. Finding the maximum requires information about demand and cost that nobody has in full, so a target that is clearly good enough is a decision a manager can make and defend, while the true maximum is not.' },
    ],
    realExample: { emoji: '🎯', text: 'Firms commonly set a target profit for the year and stop pressing once it is in sight, rather than squeezing suppliers and staff for the last available margin. The target is satisfactory; the maximum was never calculated.' },
    misconception: 'Students describe satisficing as laziness or as failing to maximise. It is a deliberate response to conflicting groups and incomplete information. Write instead: satisficing aims at an outcome acceptable to all the firm\'s stakeholders rather than at the maximum of one of them.',
    examMatters: 'An Explain (4 marks, WEC13 Appendix 6) on satisficing needs the definition and a reason a firm would choose it. Conflicting stakeholder objectives is the reason that leads directly into the divorce of ownership from control.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the account of satisficing the specification asks for:',
      template: [
        'Satisficing aims at an outcome that is ___ rather than at a maximum',
        'It arises because the firm\'s ___ want different things from it',
        'It is also a response to ___ information, since nobody can locate the true maximum',
      ],
      answers: ['satisfactory', 'stakeholders', 'incomplete'],
      hints: ['good enough, in one word', 'owners, managers, employees, customers, suppliers', 'what nobody has all of'],
      distractors: ['maximum', 'perfect'],
    }),
  };
})();

const divorceOfOwnershipFromControl = (() => {
  const sid = subId('divorce-of-ownership-from-control');
  return {
    id: sid,
    title: 'The Divorce of Ownership from Control',
    keyIdea: 'In a large firm the owners do not run it, and the managers who do have objectives of their own. That is the principal-agent problem, and why the objectives compete.',
    body: [
      { type: 'paragraph', text: 'In a small firm the owner is the manager, so there is one objective. In a large firm the owners are many and dispersed, and the firm is run by managers employed to act on their behalf. That separation is the **divorce of ownership from control**.' },
      { type: 'paragraph', text: 'The relationship it creates is the **principal-agent problem**. The **principal** — the owner — wants one outcome. The **agent** — the manager — is appointed to deliver it but has objectives of their own.' },
      { type: 'bullets', items: [
        '**The objectives differ.** Owners want profit. Managers gain from size, growth and revenue, which bring higher pay and more security.',
        '**The information is unequal.** The manager knows what the firm could achieve; the owner sees a report the manager prepared.',
        '**The result is a compromise.** Neither objective is pursued to its limit, which is what satisficing describes.',
      ] },
      { type: 'paragraph', text: `This is why the three objectives are a real choice rather than an arithmetic exercise. ${FIRM} at ${units(Q_PROFIT)} makes ${total(profitAt(Q_PROFIT))} for her owners; at ${units(Q_REVENUE)} she makes ${total(profitAt(Q_REVENUE))} but is a visibly larger business. A manager paid for growth and an owner paid from profit will not choose the same output.` },
      { type: 'paragraph', text: 'Owners narrow the gap with share-based pay and profit-linked bonuses. None of it closes it, because the information stays unequal.' },
    ],
    realExample: { emoji: '📊', text: 'Firms commonly pay senior managers partly in shares of the company they run, so that a decision good for the manager is more likely to be good for the owners too.' },
    misconception: 'Students write that the principal-agent problem means managers are dishonest. It needs only different objectives and unequal information. Write instead: the agent is pursuing their own objectives, which the principal cannot fully observe.',
    examMatters: 'An Evaluate (20 marks, WEC13 Appendix 6) is levels-marked and requires a supported judgement. Linking the divorce of ownership from control to the objective the firm actually chose is what turns theory into an argument about that firm.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages in order to explain how the divorce of ownership from control changes a firm\'s objective:',
      correctOrder: [
        'A firm grows large enough that its owners cannot run it themselves',
        'Managers are appointed to run the firm on the owners\' behalf',
        'Those managers gain from size and growth, which the owners do not',
        'The firm pursues an outcome acceptable to both rather than maximum profit',
      ],
      why: [
        'Separation only arises once the firm is too large for its owners to run',
        'Appointing an agent to act for a principal is what creates the relationship',
        'Different objectives plus unequal information is the principal-agent problem itself',
        'A compromise between the two is what satisficing describes',
      ],
    }),
  };
})();

/* ══ the blocks ════════════════════════════════════════════════════════════ */
/*
 * Block sizes 4 · 3 · 6 · 4 · 2 · 5, deliberately uneven. structure-03's real complaint was not the
 * number of chapters but that they were interchangeable and that Business Objectives came first,
 * invoking the principal-agent problem two blocks before the divorce of ownership from control was
 * explained. The specification's own order fixes that at the root.
 */
const BLOCKS = [
  {
    title: B1,
    sections: [privateAndPublicSector, forProfitAndNotForProfit, cooperatives, jointVentures],
    takeaway: [
      'Private sector organisations are privately owned; state-owned enterprises belong to the government.',
      'For-profit and not-for-profit differ by where the surplus may go, not by whether one exists.',
      'A co-operative is owned by its members and gives each of them one vote.',
      'A joint venture is a new jointly-owned organisation; both parent firms stay independent.',
    ],
  },
  {
    title: B2,
    sections: [smesAndLargeCorporations, whySomeFirmsStaySmall, whyOtherFirmsGrow],
    takeaway: [
      'SMEs and large corporations: name the measure — employees, turnover, capital employed or share.',
      'Firms stay small because the market is small, the owner chooses to, or finance is unavailable.',
      'Firms grow to spread fixed costs, gain market power, spread risk and borrow more cheaply.',
      'Growth is one strategy among several, not the default every firm is attempting.',
    ],
  },
  {
    title: B3,
    sections: [organicGrowth, mergersAndTakeovers, horizontalIntegration, verticalIntegration, conglomerateIntegration, advantagesAndDisadvantages],
    takeaway: [
      'Organic growth builds capacity; a merger or takeover buys capacity that already exists.',
      'Horizontal integration combines the same stage; vertical combines different stages of one chain.',
      'Backward vertical goes towards the supplier, forward vertical towards the customer.',
      'Conglomerate integration combines unrelated markets, so diversification is the only gain.',
      'The advantages and disadvantages differ by type — name the direction before arguing.',
    ],
  },
  {
    title: B4,
    sections: [sizeOfMarketAndFinance, ownerObjectivesAndRegulation, impactOfGrowthOnBusinesses, impactOfGrowthOnWorkersAndConsumers],
    takeaway: [
      'Four constraints: size of market, access to finance, owner objectives, regulation and bureaucracy.',
      'Compliance costs are largely fixed, so they weigh most on the smaller firm and jump at a threshold.',
      'Growth spreads fixed costs and complicates coordination; both arrive together.',
      'A cost saving reaches consumers only where competition survives the growth.',
    ],
  },
  {
    title: B5,
    sections: [reasonsForDemergers, impactOfDemergers],
    takeaway: [
      'A demerger splits a business into a separate company owned by the same shareholders.',
      'Selling a division to another firm is a divestment, not a demerger.',
      'Firms demerge for focus, simpler coordination, a clearer valuation, or because a regulator says so.',
      'The trade for businesses, workers and consumers is the same one: focus against shared cost.',
    ],
  },
  {
    title: B6,
    sections: [profitMaximisation, revenueMaximisation, salesVolumeMaximisation, satisficing, divorceOfOwnershipFromControl],
    takeaway: [
      `Profit maximisation: MC = MR. For ${FIRM}, ${units(Q_PROFIT)} at ${price(arAt(Q_PROFIT))}, profit ${total(profitAt(Q_PROFIT))}.`,
      `Revenue maximisation: MR = 0. ${units(Q_REVENUE)} at ${price(arAt(Q_REVENUE))}, revenue ${total(trAt(Q_REVENUE))}.`,
      `Sales volume maximisation: AR = AC. ${units(Q_VOLUME)} at ${price(arAt(Q_VOLUME))}, profit ${total(profitAt(Q_VOLUME))}.`,
      'Satisficing settles for an outcome acceptable to all stakeholders rather than a maximum.',
      'The divorce of ownership from control is why the three objectives compete at all.',
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
 * Six Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match against
 * every one. Notes carry the specification's own phrasing where the coverage rule needs it (packet
 * 14's rule): `spec.uncovered` is lexical and matches whole tokens, so a leaf worded "state-owned
 * enterprises (public sector)" needs those words in one field, and the sentence must still teach.
 *
 * The March Notes had seven topics, two of them — Economies of Scale and Diseconomies of Scale — on
 * 3.3.2's material. Both are gone with the block they supported (structure-04).
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '5 organisation types',
    keyIdea: 'The specification divides organisations twice: by who owns them, and by what may be done with any surplus.',
    blocks: [
      { title: 'BY OWNERSHIP', items: [
        def('<strong>Private sector organisations</strong> — owned by private individuals or firms, who supply the capital, carry the risk and set the objectives.'),
        def('<strong>State-owned enterprises (public sector)</strong> — owned by the government on behalf of citizens, with objectives set politically rather than by an owner seeking a return.'),
      ] },
      { title: 'BY PURPOSE', items: [
        def('<strong>For-profit and not-for-profit organisations</strong> — the line is the destination of the surplus: distributed to owners, or retained for the organisation\'s purpose.'),
        def('<strong>Co-operatives</strong> — owned by their members, who are the customers, workers or producers that use them. One member, one vote, and the surplus is shared by use rather than by capital.'),
        def('<strong>Joint ventures</strong> — a separate organisation jointly owned by two or more firms for one project. Both parents remain independent, which is what distinguishes it from a merger.'),
      ] },
      { title: 'WHY IT MATTERS', items: [
        mech('Ownership settles whose objectives the organisation pursues, which is why the same industry behaves differently in different sectors.'),
        link('The objectives themselves are the last chapter of this section.'),
      ] },
    ],
    takeaway: [
      'Public sector means state-owned, not "used by the public".',
      'A not-for-profit may run a surplus; it just cannot distribute it.',
      'A co-operative separates control from capital: one member, one vote.',
    ],
    examMatters: 'A Define (2 marks, WEC13 Appendix 6) requires the meaning of the term, so name the owner. For a joint venture, say that the parent firms stay separate.',
  },
  {
    title: B2,
    meta: '4 measures + both sides of 2e',
    keyIdea: 'Size has four measures that can disagree, and the specification asks why some firms remain small and others grow.',
    blocks: [
      { title: 'MEASURING SIZE', items: [
        def('<strong>SMEs (small- and medium-size enterprises)</strong> and <strong>large corporations</strong> — the categories the specification names. Where the boundary falls is set by each government.'),
        mech('Four measures: number of employees, turnover, capital employed, market share. A capital-intensive firm is large on one and small on another, so state which is being used.'),
      ] },
      { title: 'REASONS SOME FIRMS TEND TO REMAIN SMALL', items: [
        mech('The size of the market, niche demand that resists standardisation, owner objectives, lack of access to finance, and personal service that size would destroy.'),
      ] },
      { title: 'AND OTHERS GROW', items: [
        mech(`Fixed costs spread over more output — ${total(FIXED)} a month is ${price(FIXED / Q_PROFIT)} a unit over ${units(Q_PROFIT)} and ${price(FIXED / Q_VOLUME)} over ${units(Q_VOLUME)} — plus market power over price and suppliers, risk spread across products and markets, cheaper finance, and managers who gain from size.`),
        link('Growth is constrained as well as motivated — the four constraints are in chapter 4.'),
      ] },
    ],
    takeaway: [
      'Name the measure of size before calling a firm large.',
      'Staying small is usually a limit or a choice, never simply failure.',
      'Spreading fixed costs is the growth argument that needs no theory of cost curves.',
    ],
    examMatters: 'An Examine (8 marks, WEC13 Appendix 6) requires the mechanism and its consequence. Two reasons developed beat five named.',
  },
  {
    title: B3,
    meta: '2 methods + 4 directions',
    keyIdea: 'A firm grows by building or by combining, and the four directions of combination are what the specification classifies.',
    blocks: [
      { title: 'HOW BUSINESSES GROW', items: [
        def('<strong>Organic growth</strong> — expansion generated by the firm\'s own activity. Slower, funded as it goes, and it keeps the firm whole.'),
        def('<strong>Merger/takeover</strong> — a merger is agreed by both sets of owners; a takeover is one firm buying control, agreed or resisted. Either way the capacity already exists.'),
      ] },
      { title: 'THE FOUR DIRECTIONS', items: [
        def('<strong>Horizontal integration</strong> — same stage, same industry. Removes a competitor and raises market share.'),
        def('<strong>Backward vertical integration</strong> — towards the supplier. Secures supply, quality and input cost.'),
        def('<strong>Forward vertical integration</strong> — towards the customer. Secures an outlet and captures the retailer\'s margin.'),
        def('<strong>Conglomerate integration</strong> — unrelated markets. Diversification is the only gain available.'),
      ] },
      { title: 'ADVANTAGES AND DISADVANTAGES OF EACH TYPE OF MERGER/TAKEOVER', items: [
        mech('Horizontal: share and removed duplication, against regulators, less choice and lost jobs. Vertical: security of supply or of access, against running a business the firm does not know and losing the discipline of buying from whoever is cheapest. Conglomerate: steadier profit, against no operational gain and unfamiliar management.'),
        mech('The gains are expected at the time of the deal and the costs are certain, which is why so many mergers do not deliver what was claimed for them.'),
      ] },
    ],
    takeaway: [
      'Same STAGE is horizontal; same industry is not enough.',
      'Name the direction from the acquirer: backward to the supplier, forward to the customer.',
      'Argue the advantages of the specific direction, not of mergers in general.',
    ],
    examMatters: 'An Analyse (6 marks, WEC13 Appendix 6) requires a chain of reasoning. Naming the direction is the first link, not the answer.',
  },
  {
    title: B4,
    meta: '4 constraints + 3 groups affected',
    keyIdea: 'Four things constrain business growth, and growth itself lands on businesses, workers and consumers in both directions.',
    blocks: [
      { title: 'CONSTRAINTS ON BUSINESS GROWTH', items: [
        def('<strong>Size of market</strong> — the firm cannot sell to customers who do not exist.'),
        def('<strong>Access to finance</strong> — a small firm has less retained profit, fewer assets as security and no record, so it borrows dearer or not at all.'),
        def('<strong>Owner objectives</strong> — nothing is stopping the firm; the person who decides does not want it larger.'),
        def('<strong>Government regulation and bureaucracy</strong> — compliance cost is largely fixed and jumps at thresholds, so the step up in size costs more than the size does.'),
      ] },
      { title: 'IMPACT OF GROWTH OF FIRMS ON BUSINESSES, WORKERS AND CONSUMERS', items: [
        mech('<strong>Businesses:</strong> fixed costs spread, market power, cheaper finance and resilience — against harder coordination, weaker control and lower motivation.'),
        mech('<strong>Workers:</strong> higher pay, career paths, training and security — against duplicated jobs removed in a merger, narrower work, and greater distance from the decision-maker.'),
        mech('<strong>Consumers:</strong> lower costs, wider range and greater reach — against less choice and less pressure to pass any saving on.'),
        link('The consumer case turns on one condition: does the firm still face competition?'),
      ] },
    ],
    takeaway: [
      'Owner objectives is the constraint where nothing external is stopping the firm.',
      'Organic growth adds jobs; a horizontal merger removes duplicated ones.',
      'Lower cost makes a lower price possible; competition is what makes it happen.',
    ],
    examMatters: 'A Discuss (14 marks, WEC13 Appendix 6) is levels-marked and wants both sides weighed and a judgement reached.',
  },
  {
    title: B5,
    meta: 'reasons + 3 groups affected',
    keyIdea: 'A demerger splits a business in two without selling it, and the trade it makes is focus against shared cost.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Demerger</strong> — part of a business is separated into an independent company whose shares go to the parent\'s existing owners. No buyer, no payment.'),
        def('<strong>Divestment</strong> — a division is sold to another firm for cash. The division changes owner, which a demerger does not.'),
      ] },
      { title: 'REASONS FOR DEMERGERS', items: [
        mech('Focus, because two businesses compete for one management\'s attention. Coordination, because a group assembled by acquisition becomes too complex to run. Valuation, because investors who want one part must buy both. Regulation, where an authority requires a separation.'),
      ] },
      { title: 'IMPACT OF DEMERGERS ON BUSINESSES, WORKERS AND CONSUMERS', items: [
        mech('<strong>Businesses:</strong> focused management and separate funding, against duplicated overheads and no other division to fall back on.'),
        mech('<strong>Workers:</strong> shorter promotion paths, against cuts to central functions and more exposure if the business struggles.'),
        mech('<strong>Consumers:</strong> better-served markets and possibly a restored competitor, against the cost of the duplication.'),
      ] },
    ],
    takeaway: [
      'A demerger divides; a divestment sells. The test is whether anyone bought it.',
      'The same trade runs through all three groups: focus against shared cost.',
      'It is worth doing when the two businesses gained little from being run together.',
    ],
    examMatters: 'A Define (2 marks, WEC13 Appendix 6) on a demerger must say what happens to ownership, or it describes a divestment equally well.',
  },
  {
    title: B6,
    meta: '3 objectives + formulae + satisficing',
    keyIdea: 'Three objectives, three formulae, three different outputs from the same firm — and the divorce of ownership from control is why the choice is contested.',
    blocks: [
      { title: 'DIFFERENT BUSINESS OBJECTIVES AND THEIR FORMULAE', items: [
        def(`<strong>Profit maximisation</strong> — the formula is <strong>MC = MR</strong>. For ${FIRM}: ${units(Q_PROFIT)} at ${price(arAt(Q_PROFIT))}, profit ${total(profitAt(Q_PROFIT))}.`),
        def(`<strong>Revenue maximisation</strong> — the formula is <strong>MR = 0</strong>. ${units(Q_REVENUE)} at ${price(arAt(Q_REVENUE))}, revenue ${total(trAt(Q_REVENUE))}, profit ${total(profitAt(Q_REVENUE))}.`),
        def(`<strong>Sales volume maximisation</strong> — the formula is <strong>AR = AC</strong>. ${units(Q_VOLUME)} at ${price(arAt(Q_VOLUME))}, profit ${total(profitAt(Q_VOLUME))}.`),
        mech(`Selling the most units is not earning the most revenue: ${total(trAt(Q_VOLUME))} at ${units(Q_VOLUME)} against ${total(trAt(Q_REVENUE))} at ${units(Q_REVENUE)}.`),
      ] },
      { title: 'BEHAVIOURAL THEORIES: SATISFICING', items: [
        def('<strong>Satisficing</strong> — aiming at an outcome that is satisfactory to every stakeholder rather than the maximum of any one thing.'),
        mech('It arises because owners, managers, employees, customers and suppliers want different things, and because nobody has the information to locate a true maximum.'),
      ] },
      { title: 'THE DIVORCE OF OWNERSHIP FROM CONTROL: THE PRINCIPAL-AGENT PROBLEM', items: [
        mech('The <strong>principal</strong> owns and wants profit; the <strong>agent</strong> runs the firm and gains from size, growth and revenue. The agent also knows more than the principal can observe.'),
        mech('Different objectives plus unequal information means neither is pursued to its limit — which is the significance of the divorce of ownership from control for business objectives.'),
        link('Owners narrow the gap with share-based pay, profit-linked bonuses and independent boards. None of it closes the gap, because the information stays unequal.'),
      ] },
    ],
    takeaway: [
      'MC = MR for profit, MR = 0 for revenue, AR = AC for sales volume.',
      'Revenue maximisation and sales volume maximisation are different objectives with different outputs.',
      'Satisficing is the compromise the principal-agent problem produces.',
    ],
    examMatters: 'A Calculate (4 marks, WEC13 Appendix 6) involves several stages and expects working. An Evaluate (20 marks) is levels-marked and requires a supported judgement.',
  },
];
