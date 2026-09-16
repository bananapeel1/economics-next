/**
 * PACKET 19 — planning-raising-finance, Learn Mode content and Notes.
 *
 * Business Unit 2 (WBS12), IAL topic 2.3.1, audit/raw/bus_spec.txt:844-877. Five blocks in the
 * specification's own order and one subsection per idea, so no step carries two: twelve crowded
 * steps become twenty-four small ones, plus five check-ins.
 *
 * Five scope decisions the specification settled before a word was written (see NEXT.md):
 *
 *   - CASH-FLOW FORECASTS ARE NOT IN THIS SECTION. specGap-05 and topFix-02 ask for a subsection on
 *     constructing and interpreting one. In IAL that is 2.3.2 · 4 (`bus_spec.txt:907-908`,
 *     "Construction and interpretation of simple cash-flow forecasts", "Use and limitations of
 *     cash-flow forecasts"), which the `financial-planning` section owns. Teaching it here would
 *     take a leaf from another section, so the packet instead DELETES the untaught "Define cash
 *     flow" practice item that was the defect those items actually saw.
 *   - FRANCHISING AND SOCIAL ENTERPRISE ARE IN SCOPE, not out of it. quiz-01, quiz-02 and
 *     specGap-07 all say they belong to Unit 1 and should be dropped from the quiz. They are IAL
 *     2.3.1 · 4b (`:872-873`), one of the four uncovered leaves, so they are TAUGHT here and the
 *     quiz items stay — q5's nonsense distractor is what needed fixing, not its topic.
 *   - "FORMS OF BUSINESS" IS NOT A UNIT 1 RECAP. 4a, 4b and 4c are three leaves of this topic. The
 *     block stays and grows.
 *   - THE APP'S "2.3.1" IS ALREADY THE IAL NUMBER AND TITLE. specGap-01 calls the mapping unsure and
 *     cites 2.1.1-2.1.4, which is UK GCE numbering. Nothing is renumbered.
 *   - BLOCK ORDER FOLLOWS THE SPECIFICATION. structure-03 asks for forms of business and liability
 *     BEFORE external finance, because the March section taught share capital before Ltd and plc
 *     existed. The dependency is real; the prescribed reordering is not, because the spec's order is
 *     Planning · Internal · External · Forms · Liability. It is fixed along the spec's own seam
 *     instead: 3b-2 teaches share capital as a METHOD (selling part of the ownership for permanent
 *     capital), and the question of WHICH BUSINESSES MAY USE IT is 5b, where the spec puts it.
 *
 * Money is in dollars throughout. Every figure belongs to Yusra Foods and is derived in
 * _packet19-util.mjs. Real examples name real firms from the IAL centres' own markets and carry no
 * year and no figure (packet 15's accuracy-01 rule, after the invented Tesla narrative here).
 */
import { subId, SECTION, hash8, money, pc, NEED, OWNER_CAPITAL, FAMILY, BANK_LOAN, ANGEL, STACK, stackTotal, FOUNDER_SHARES, ANGEL_SHARES, ANGEL_PRICE, FLOAT_SHARES, FLOAT_PRICE, floatRaised, sharesAfterAngel, sharesAfterFloat, FOUNDER_AFTER_ANGEL, ANGEL_AFTER_ANGEL, FOUNDER_AFTER_FLOAT, ANGEL_AFTER_FLOAT, PUBLIC_AFTER_FLOAT, PROFIT_AFTER_TAX, DIVIDENDS, retained, DEPOSIT_RATE, retainedOpportunityCost, VAN_SALE, LOAN_YEARS, LOAN_MONTHLY, loanRepaid, loanInterest, OVERDRAFT_LIMIT, MACHINE_PRICE, LEASE_MONTHLY, LEASE_MONTHS, leaseTotal, leasePremium, SUPPLY_MONTHLY, CREDIT_DAYS, tradeCreditHeld, GRANT, P2P, CROWD, PARTNER_FIRM } from './_packet19-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

export const B1 = 'Planning';
export const B2 = 'Internal Finance';
export const B3 = 'External Finance';
export const B4 = 'Forms of Business';
export const B5 = 'Liability';

/* ══ Block 1 — Planning (2.3.1 · 1a, 1b) ═══════════════════════════════════ */

const contentsOfBusinessPlans = (() => {
  const sid = subId('contents-of-business-plans'); // March id, kept
  return {
    id: sid,
    title: 'What a Business Plan Contains',
    keyIdea: 'A business plan is a written document setting out what the business will sell, to whom, how it will operate and what it expects to earn and spend.',
    body: [
      { type: 'paragraph', text: 'A **business plan** is a formal written document that describes a business idea and the evidence behind it. There is no single legal format, but a plan a lender or investor will read covers the same ground every time, because each section answers a question someone putting money in will ask.' },
      { type: 'subheading', text: 'The sections a plan carries' },
      { type: 'bullets', items: [
        '**The idea and the objectives** — what is sold, to whom, and what the business is trying to achieve over the first years.',
        '**Market research** — evidence that buyers exist: the size of the market, who the competitors are and what makes this offer different.',
        '**The marketing plan** — price, promotion, place and the product itself, and why that combination suits the buyers just described.',
        '**Operations** — premises, equipment, suppliers and staff, and what each will cost.',
        '**Financial forecasts** — expected revenue, costs and funding requirement, with the assumptions that produced them stated.',
      ] },
      { type: 'paragraph', text: `Yusra Foods, a dried-fruit snack manufacturer, wrote each of these before it opened. The financial section set the number the rest of this chapter turns on: a funding requirement of ${money(NEED)} for premises and a first production line.` },
    ],
    realExample: { emoji: '📋', text: 'Grab began as a business plan written for a university competition, setting out a taxi-booking idea for South-East Asian cities and the research behind it. The plan named the market before the company existed.' },
    misconception: 'Students list every section of a plan and stop there, as though the list were the answer. A plan is judged on the evidence inside the sections, not on having them. Write instead: the market research section matters because it shows the demand is real, not merely hoped for.',
    examMatters: 'A Define (2 marks, WBS12 Appendix 6) on a business plan needs the document AND its purpose: a written statement of objectives, strategy and financial forecasts, used to guide the business and to obtain finance. Naming only the document is half a definition.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item into the section of a business plan it belongs to: Market Research or Financial Forecasts.',
      groups: [
        { name: 'Market Research', why: 'Evidence about buyers and rivals — who will buy, how many there are and who else is selling to them', items: ['The size of the snack market', 'A list of competing brands', 'A survey of what buyers pay now'] },
        { name: 'Financial Forecasts', why: 'Expected money in and out, and the funding the plan is asking for', items: ['Expected revenue for year one', 'The cost of the production line', `The ${money(NEED)} funding requirement`] },
      ],
    }),
  };
})();

const usingAPlanToRunTheBusiness = (() => {
  const sid = subId('purpose-of-business-plans'); // March id, kept
  return {
    id: sid,
    title: 'Using a Plan to Run the Business',
    keyIdea: 'Inside the business, a plan forces decisions to be thought through before money is committed, and gives targets that later performance can be measured against.',
    body: [
      { type: 'paragraph', text: 'The specification asks for the **relevance and uses** of a business plan. It has two audiences, and the first is the owner. Writing the plan is the first time the idea has to survive contact with numbers.' },
      { type: 'flow', steps: [
        { title: 'Set objectives', subtitle: 'What the business is for, in measurable terms' },
        { title: 'Test them against research', subtitle: 'Is there a market at that price?' },
        { title: 'Cost the operation', subtitle: 'Premises, equipment, staff, suppliers' },
        { title: 'Compare against results', subtitle: 'Each month, plan beside actual' },
      ], result: 'Decisions made deliberately, and drift visible early enough to correct', resultType: 'good' },
      { type: 'paragraph', text: 'The discipline is the point. An owner who has costed the operation knows which assumption the whole thing depends on, and watches that one. Yusra Foods knew its plan broke if the production line cost more than budgeted, so the equipment quote was fixed before the premises were signed.' },
      { type: 'paragraph', text: 'A plan also gives a **benchmark**. Without one, a disappointing month is just a feeling; against a forecast it is a number, and the owner can ask which assumption was wrong rather than whether things feel slow.' },
    ],
    realExample: { emoji: '🧭', text: 'Careem\'s founders planned city by city, setting targets for each market before entering it, so a city that missed its targets could be identified as a problem rather than absorbed into a general sense that growth was slower than hoped.' },
    misconception: 'Students write that a plan guarantees success. It does not: it makes assumptions explicit and testable. Write instead: a plan improves decisions by forcing the assumptions to be stated, so a wrong one can be found and corrected.',
    examMatters: 'An Explain (4 marks, WBS12 Appendix 6) asks for a reason developed into a consequence. "It sets targets" is the reason; "so a shortfall is identified in month two rather than month eight" is the development that completes it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four stages of writing and using a plan into the order the chapter sets out, from first to last:',
      correctOrder: [
        'Set measurable objectives for the business',
        'Test the objectives against market research',
        'Cost the premises, equipment and staff',
        'Compare the monthly results against the forecast',
      ],
      why: [
        'Nothing can be researched or costed until it is clear what the business is trying to do',
        'The research says whether buyers exist at the price the objectives assume',
        'Costing comes after the market is confirmed, because the scale of the operation depends on the demand found',
        'The comparison can only happen once the business is trading and a forecast exists to compare with',
      ],
    }),
  };
})();

const usingAPlanToObtainFinance = (() => {
  const sid = subId('using-a-plan-to-obtain-finance');
  return {
    id: sid,
    title: 'Using a Plan to Obtain Finance',
    keyIdea: 'The plan\'s second audience is outside the business: a lender or investor who has not had the idea and must decide from the document whether to risk money on it.',
    body: [
      { type: 'paragraph', text: 'The second of the two **uses** is external. A bank deciding on Yusra Foods\' loan and an investor deciding on its shares have the same problem: they know nothing about the business that the plan does not tell them.' },
      { type: 'paragraph', text: 'What each looks for differs, and the difference is worth learning because it explains why one plan can succeed with one and fail with the other.' },
      { type: 'bullets', items: [
        '**A lender** is asking whether it will be repaid. It reads the forecasts for the money available to meet the repayments, and looks for assets it could claim if the business fails.',
        '**An equity investor** is asking how large the business can become, because a share of a small profitable firm is worth little. It reads the market research for the size of the opportunity.',
        '**Both** read the assumptions. A forecast with no stated basis tells a reader nothing about the business and something about the owner.',
      ] },
      { type: 'paragraph', text: `Yusra Foods took the same plan to both. The bank lent ${money(BANK_LOAN)} against the production line it could repossess; the business angel put in ${money(ANGEL)} because the market section showed a market far larger than the first line could serve.` },
    ],
    realExample: { emoji: '🏦', text: 'Jollibee grew from a single ice cream parlour in Manila into a listed international chain, financed at each stage by outsiders who had to be shown the scale of the opportunity before they would fund the next step.' },
    misconception: 'Students write that lenders and investors want the same thing from a plan. They want different things: repayment against security, and growth in the value of a shareholding. Write instead: the plan must answer the question its reader is actually asking.',
    examMatters: 'An Analyse (6 marks, WBS12 Appendix 6) wants a chain of reasoning applied to the business in the source. Naming the reader, then what that reader needs from the plan, then the decision it leads to, is the chain the command word asks for.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each reader of the business plan to what that reader is looking for in it:',
      pairs: [
        { left: 'A bank considering a loan', right: 'Evidence the repayments can be met', why: 'A lender gets interest and its money back, so its question is whether the business can pay — not how large it might become' },
        { left: 'A business angel considering shares', right: 'Evidence the market is large', why: 'An equity investor is paid by the business growing in value, so a small but safe business is of little use to it' },
        { left: 'The owner running the business', right: 'Targets to measure results against', why: 'The internal use: the plan becomes the benchmark that makes a disappointing month a number rather than a feeling' },
      ],
      distractors: ['A guarantee that the business will succeed'],
    }),
  };
})();

const limitsOfABusinessPlan = (() => {
  const sid = subId('limits-of-a-business-plan');
  return {
    id: sid,
    title: 'The Limits of a Plan',
    keyIdea: 'A plan is built from assumptions about an unknown future, so it dates quickly and misleads if it is read as a forecast of what will happen rather than what is expected.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **relevance**, and relevance has two sides. A plan that is never revisited becomes a description of a business that no longer exists, and an evaluation question wants that limitation as clearly as it wants the benefits.' },
      { type: 'bullets', items: [
        '**The figures are assumptions.** Every number in a forecast rests on a judgement about price, volume or cost. A plan is only as good as the weakest of them.',
        '**Conditions move.** A competitor, a supplier\'s price or a change in what buyers want can outdate a plan written months earlier.',
        '**Optimism is built in.** The person writing the plan wants the business to happen, which is not a neutral position from which to estimate demand.',
        '**It cannot compensate for weak execution.** A well-written plan and a poorly run operation produce a failed business with good documentation.',
      ] },
      { type: 'paragraph', text: 'None of this makes planning pointless — it makes a plan a **working document**. Yusra Foods rewrote its forecasts once the first year\'s trading gave it real figures to replace the estimates, which is the response the limitation calls for.' },
    ],
    realExample: { emoji: '🔄', text: 'Shopify began as a plan for an online snowboard shop and became a platform for other people\'s shops, because the founders revised the plan around what they learned building the first one rather than defending it.' },
    misconception: 'Students treat "the plan may be wrong" as a complete evaluation. On its own it is a statement, not a judgement. Write instead: the plan may be wrong, which matters most in a fast-changing market and least where costs and demand are stable, so the value of planning depends on the conditions the business faces.',
    examMatters: 'An Evaluate (20 marks, WBS12 Appendix 6) requires a supported judgement, which means the answer must come down somewhere and say what the judgement depends on. A balanced list of benefits and limitations with no conclusion has not evaluated anything.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the evaluation this chapter closes on:',
      template: [
        'Every figure in a plan rests on an ___ about the future',
        'A plan written months ago can be ___ by a change in the market',
        'The response is to treat the plan as a ___ document and revise it',
      ],
      answers: ['assumption', 'outdated', 'working'],
      hints: ['what a forecast is built from when the fact is not yet available', 'what happens to information overtaken by events', 'the opposite of a document written once and filed'],
      distractors: ['guarantee', 'final'],
    }),
  };
})();

/* ══ Block 2 — Internal Finance (2.3.1 · 2a, 2b, 2c) ═══════════════════════ */

const ownerCapital = (() => {
  const sid = subId('owner-capital'); // March id, kept
  return {
    id: sid,
    title: "Owner's Capital: Personal Savings",
    keyIdea: "Owner's capital is money the owner puts in from personal savings: the first finance almost every business has, and the finance every other provider looks for before committing.",
    body: [
      { type: 'paragraph', text: 'The specification opens internal finance with **owner\'s capital: personal savings** — money the owner already has and chooses to put into the business. It comes first in the spec and first in practice, because a start-up has no profits to retain and no assets to sell.' },
      { type: 'paragraph', text: `The founder of Yusra Foods put in ${money(OWNER_CAPITAL)} of savings, a quarter of the ${money(NEED)} needed. That figure did more than fund the premises: it was the reason the bank and the angel took the rest of the plan seriously.` },
      { type: 'bullets', items: [
        '**No interest and no repayment date.** The money is not borrowed, so nothing has to be paid back on a schedule.',
        '**No ownership given up.** The owner\'s stake is unchanged because no shares have been issued to anyone else.',
        '**It is limited by personal wealth.** However good the idea, the amount available stops where the savings stop.',
        '**The risk is personal.** Money in the business is money not in the owner\'s own account if the business fails.',
      ] },
      { type: 'paragraph', text: 'That last point is what outside providers read it as. An owner who has put in savings loses personally if the business fails, so the commitment is visible — which is why lenders ask what the owner has contributed before deciding.' },
    ],
    realExample: { emoji: '💼', text: 'Zhang Yin started Nine Dragons Paper with her own savings and a partner\'s, building a recycled-paper business from a personal stake long before any outside finance was involved.' },
    misconception: 'Students describe owner\'s capital as free money. It is free of interest, not free of cost: those savings could have been earning a return elsewhere, and they are lost if the business fails. Write instead: it carries no interest but it does carry the owner\'s personal risk.',
    examMatters: 'A Define (2 marks, WBS12 Appendix 6) on owner\'s capital needs the source AND that it is internal: money invested by the owner from personal savings, rather than obtained from outside the business.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: "Complete the description of owner's capital:",
      template: [
        "Owner's capital comes from the owner's personal ___",
        'It requires no interest and no ___ of ownership',
        'Its size is limited by the owner\'s personal ___',
      ],
      answers: ['savings', 'dilution', 'wealth'],
      hints: ['money already set aside before the business existed', 'what issuing shares to someone else does to a stake', 'how much the owner has in total, which sets the ceiling'],
      distractors: ['profit', 'guarantee'],
    }),
  };
})();

const retainedProfit = (() => {
  const sid = subId('retained-profit'); // March id, kept
  return {
    id: sid,
    title: 'Retained Profit',
    keyIdea: 'Retained profit is what is left after tax and dividends and is kept rather than distributed: the main internal source for a business already trading profitably.',
    body: [
      { type: 'paragraph', text: '**Retained profit** is what remains of profit after tax has been paid and any dividends distributed to shareholders. The business keeps it and can reinvest it. It is internal because it comes from the business\'s own trading, not from anyone outside it.' },
      { type: 'subheading', text: 'Yusra Foods in its third year' },
      { type: 'flow', steps: [
        { title: `Profit after tax ${money(PROFIT_AFTER_TAX)}`, subtitle: 'What the year left once tax was paid' },
        { title: `Dividends ${money(DIVIDENDS)}`, subtitle: 'Distributed to the founder and the angel' },
        { title: `Retained ${money(retained())}`, subtitle: 'Kept in the business to reinvest' },
      ], result: 'Finance with no interest, no repayment date and no new shareholder', resultType: 'good' },
      { type: 'paragraph', text: `The ${money(retained())} paid for the second production line without a lender's approval or an investor's terms. That speed is the real advantage: an owner can decide to reinvest and act, where a loan application takes weeks and an equity round takes months.` },
      { type: 'paragraph', text: 'The limitation is who can use it. A start-up has no profit to retain, so this source is closed to exactly the businesses that need finance most, and a loss-making firm has nothing to keep.' },
    ],
    realExample: { emoji: '🏭', text: 'Huawei has long funded research from profits it retains rather than from public shareholders, which is possible only because the trading is already profitable enough to leave something after distributions.' },
    misconception: 'Students write that retained profit is the same as cash in the bank. It is not: profit can be tied up in stock or owed by customers. Write instead: retained profit is an accounting figure, and a business can have retained profit without having the cash to spend.',
    examMatters: 'An Explain (4 marks, WBS12 Appendix 6) on retained profit needs the reason and its consequence: no interest is charged, so the full amount reaches the investment rather than part of it servicing a debt.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the three stages of arriving at retained profit into the order the figures follow, from the year\'s profit to the amount kept:',
      correctOrder: [
        `Profit after tax of ${money(PROFIT_AFTER_TAX)}`,
        `Dividends of ${money(DIVIDENDS)} distributed to shareholders`,
        `${money(retained())} retained in the business`,
      ],
      why: [
        'The starting figure: what the trading year left once tax was paid',
        'Distribution happens before the remainder can be called retained, because retained profit is what is left after it',
        'The residual, and the only part of the profit available to reinvest',
      ],
    }),
  };
})();

const opportunityCostOfRetainedProfit = (() => {
  const sid = subId('opportunity-cost-of-retained-profit');
  return {
    id: sid,
    title: 'What Retained Profit Really Costs',
    keyIdea: 'Retained profit charges no interest, but it is not free: the money could have been distributed to owners or used elsewhere, and that forgone alternative is its opportunity cost.',
    body: [
      { type: 'paragraph', text: 'It is common to read that retained profit "has no cost". It has no **interest** cost, which is not the same thing. Every source of finance costs something, and the cost of this one is the best alternative use that has been given up.' },
      { type: 'paragraph', text: `Yusra Foods retained ${money(retained())}. Placed on deposit at ${pc(DEPOSIT_RATE)} a year instead, that money would have returned ${money(retainedOpportunityCost())} — so the second production line has to earn more than ${money(retainedOpportunityCost())} a year before it has beaten simply leaving the money alone.` },
      { type: 'bullets', items: [
        '**To the shareholders**, the cost is the dividend not received. They accept it only while the reinvestment promises more than they could earn with the cash themselves.',
        '**To the business**, the cost is every other use of the same money — paying down the loan, holding a cash reserve, or the deposit above.',
        '**The comparison that matters** is the return on the investment against that alternative, not against zero.',
      ] },
      { type: 'paragraph', text: 'This is why a profitable business still borrows. If a loan costs less than the return the money can earn inside the business, using retained profit instead is the more expensive choice, not the cheaper one.' },
    ],
    realExample: { emoji: '⚖️', text: 'Shareholders in listed companies frequently press for higher dividends rather than further reinvestment, which is exactly this argument: the owners judging that they can use the money better than the business can.' },
    misconception: 'Students write that retained profit is the cheapest source of finance because there is no interest. Cheapest by interest is not cheapest by cost. Write instead: retained profit has no interest charge, but its opportunity cost is the return the money could have earned elsewhere.',
    examMatters: 'An Assess (10 marks, WBS12 Appendix 6) requires a judgement supported by the context given. Pricing the alternative — what the money would have earned elsewhere — turns "retained profit is cheap" into a comparison the judgement can rest on.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the argument that retained profit is not free:',
      template: [
        `Retained profit carries no ___ charge`,
        'Its real cost is the ___ cost of the next best use of the money',
        `On deposit at ${pc(DEPOSIT_RATE)} a year, ${money(retained())} would have returned ${money(retainedOpportunityCost())} — so the reinvestment must ___ that`,
      ],
      answers: ['interest', 'opportunity', 'beat'],
      hints: ['what a lender charges and an owner does not', 'the economics term for the best alternative given up', 'what the investment has to do to the alternative return to be worth making'],
      distractors: ['dividend', 'fixed'],
    }),
  };
})();

const saleOfAssets = (() => {
  const sid = subId('sale-of-assets'); // March id, kept
  return {
    id: sid,
    title: 'Sale of Assets',
    keyIdea: 'A business can raise cash by selling assets it owns, which suits equipment no longer needed but permanently removes whatever the asset was contributing.',
    body: [
      { type: 'paragraph', text: 'The third internal source is **sale of assets**: turning something the business owns into cash. It is internal because the value was already inside the business; selling only changes the form it is held in.' },
      { type: 'paragraph', text: `Yusra Foods sold an ageing delivery van for ${money(VAN_SALE)} when it moved to a contracted distributor. The van was no longer needed, so the sale released cash without costing the business anything it was using.` },
      { type: 'bullets', items: [
        '**Best case: a genuinely surplus asset.** Equipment replaced by something better, or space no longer occupied. The cash is raised at no operating cost.',
        '**Worse case: an asset still in use.** The cash arrives and the capability leaves with it, which limits what the business can do afterwards.',
        '**Sale and leaseback** sells an asset and immediately rents it back, so the business keeps using it and gains the cash — but pays rent from then on.',
        '**It is one-off.** An asset can be sold once. It is not a source a business can return to.',
      ] },
      { type: 'paragraph', text: 'A business selling assets it still needs is often a business that could not raise finance any other way, which is why the reason for the sale matters as much as the amount raised.' },
    ],
    realExample: { emoji: '🏢', text: 'Airlines across Asia and the Gulf routinely sell aircraft to leasing companies and lease them back, raising cash from assets they continue to fly every day.' },
    misconception: 'Students treat sale and leaseback as free money because the business keeps the asset. It keeps the use, not the ownership, and pays rent for it. Write instead: sale and leaseback converts an owned asset into cash plus an ongoing rental cost.',
    examMatters: 'An Analyse (6 marks, WBS12 Appendix 6) wants the chain followed through: the asset sold, the cash raised, and what the business can no longer do — or must now rent — as a result.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each situation by whether selling the asset costs the business a capability it was using: Surplus Asset or Asset Still in Use.',
      groups: [
        { name: 'Surplus Asset', why: 'The business was not using it, so the cash is raised without giving up any capability', items: ['A van replaced by a contracted distributor', 'An empty warehouse after a move', 'Machinery left idle since an upgrade'] },
        { name: 'Asset Still in Use', why: 'The cash arrives but the capability goes with it, or has to be rented back', items: ['The only delivery vehicle, sold to pay suppliers', 'The factory, sold and leased back'] },
      ],
    }),
  };
})();

/* ══ Block 3 — External Finance (2.3.1 · 3a six sources, 3b seven methods) ══ */
/*
 * The specification asks two separate questions and the March section answered neither fully: 3a is
 * WHO the money comes from (six named sources) and 3b is WHAT FORM it takes (seven named methods),
 * each "and their suitability for different circumstances". Leasing, trade credit and grants were
 * uncovered leaves (specGap-03) and peer-to-peer, business angels and other businesses appeared only
 * in a quiz option (specGap-02, specGap-08). All thirteen are taught here, and the suitability
 * clause both leaves carry gets the chapter's last subsection to itself.
 */

const sourcesAndMethods = (() => {
  const sid = subId('sources-and-methods');
  return {
    id: sid,
    title: 'Sources and Methods: Two Different Questions',
    keyIdea: 'A source is who the money comes from; a method is the form the money takes. The same source can offer several methods, and the same method can come from several sources.',
    body: [
      { type: 'paragraph', text: 'The specification splits external finance into **sources** and **methods**, and the distinction is worth getting right before either list is learned, because answers that confuse them lose the thread of the question.' },
      { type: 'bullets', items: [
        '**A source** is the party providing the money: family and friends, banks, peer-to-peer funding, business angels, crowd funding, or other businesses.',
        '**A method** is the arrangement the money arrives under: a loan, share capital, venture capital, an overdraft, leasing, trade credit or a grant.',
        '**They combine.** A bank is a source; it offers loans, overdrafts and leasing as methods. A loan is a method; it can come from a bank, from family, or from a peer-to-peer platform.',
      ] },
      { type: 'paragraph', text: 'Underneath both lists sits one question that decides everything else: is the money **borrowed** or is part of the **ownership** being sold? Borrowed money is repaid with interest and the owner\'s stake is untouched. Money raised by issuing shares is never repaid, but the buyer now owns part of the business and shares in its profits and decisions.' },
      { type: 'paragraph', text: `Yusra Foods used both at the start: ${money(BANK_LOAN)} borrowed from a bank and ${money(ANGEL)} from an angel who received shares for it.` },
    ],
    realExample: { emoji: '🔀', text: 'A supermarket chain can be financed by a bank loan, by shares held by the public and by credit from the suppliers who stock its shelves, all at the same time — three methods from three kinds of source.' },
    misconception: 'Students write "venture capital" when asked to name a source and "business angel" when asked for a method. Write instead: the angel is the source, the shares are the method — name the party for a source and the arrangement for a method.',
    examMatters: 'A Define (2 marks, WBS12 Appendix 6) on external finance needs the boundary stated: finance obtained from outside the business, rather than generated by its own trading or assets.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item by what the specification calls it: a Source of finance (who provides it) or a Method of finance (the form it takes).',
      groups: [
        { name: 'Source', why: 'The party the money comes from — the specification lists six of these under 3a', items: ['A business angel', 'Family and friends', 'A peer-to-peer platform'] },
        { name: 'Method', why: 'The arrangement the money arrives under — the specification lists seven of these under 3b', items: ['An overdraft', 'Trade credit', 'A grant', 'Leasing'] },
      ],
    }),
  };
})();

const familyFriendsOtherBusinesses = (() => {
  const sid = subId('family-friends-other-businesses');
  return {
    id: sid,
    title: 'Family and Friends, and Other Businesses',
    keyIdea: 'Family and friends lend or invest on terms no commercial provider would offer, and other businesses invest where the money buys a trading relationship as well as a return.',
    body: [
      { type: 'paragraph', text: 'Two of the six sources provide money for reasons that are not purely financial, which is why their terms are unlike anything a bank offers.' },
      { type: 'subheading', text: 'Family and friends' },
      { type: 'paragraph', text: `Yusra Foods raised ${money(FAMILY)} this way. The money arrived quickly, with no credit check and at no interest, because the providers were backing a person rather than assessing a proposal. The cost is not financial: a business failure becomes a family problem, and informal arrangements with nothing written down are the ones that turn into disputes.` },
      { type: 'subheading', text: 'Other businesses' },
      { type: 'paragraph', text: `Later, a regional distributor lent Yusra Foods ${money(PARTNER_FIRM)} on long terms, tied to a supply agreement. A business putting money into another business usually wants something beyond the return — secure supply, access to a market, or a closer tie to a customer it expects to grow.` },
      { type: 'bullets', items: [
        '**The advantage** is terms no commercial provider would match, and a provider who may bring customers or expertise with the money.',
        '**The risk** is a relationship that now has money in it — and, with another business, an investor whose interests are not only in your profits.',
      ] },
    ],
    realExample: { emoji: '🤝', text: 'Alibaba\'s early funding included an investment from SoftBank, another business taking a stake rather than a bank making a loan, and the relationship shaped the company for years afterwards.' },
    misconception: 'Students treat money from family as risk-free because there is no interest. The risk moves rather than disappearing: it becomes a personal one. Write instead: the financial cost is low but a failure damages a relationship that money cannot restore.',
    examMatters: 'An Explain (4 marks, WBS12 Appendix 6) on a source needs a reason developed: family finance is quick because no credit assessment is required, so a business needing money within days can use it where a bank could not respond in time.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each source to the reason it provides money on terms a bank would not:',
      pairs: [
        { left: 'Family and friends', right: 'They are backing a person they trust', why: 'The decision rests on the relationship, not on a credit assessment, which is why the money can arrive quickly and cheaply' },
        { left: 'Another business', right: 'It wants a trading relationship as well as a return', why: 'Secure supply or access to a customer can be worth more to the investor than the financial return alone' },
        { left: 'A bank', right: 'It wants interest and security for its money', why: 'A commercial lender has no interest in the business beyond being repaid, so it prices the risk and takes security' },
      ],
      distractors: ['They want to run the business day to day'],
    }),
  };
})();

const banksAndBusinessAngels = (() => {
  const sid = subId('banks-and-business-angels');
  return {
    id: sid,
    title: 'Banks and Business Angels',
    keyIdea: 'A bank lends against evidence of repayment and security; a business angel invests personal money in a young business for a shareholding, and brings experience with it.',
    body: [
      { type: 'paragraph', text: 'These two sources sit on opposite sides of the borrow-or-sell-ownership divide, and a start-up frequently needs both.' },
      { type: 'subheading', text: 'Banks' },
      { type: 'paragraph', text: `A bank is the most familiar source and the most demanding. It wants a plan, evidence that the repayments can be met, and usually **security** — an asset it can claim if they are not. Yusra Foods borrowed ${money(BANK_LOAN)} against its production line. The bank's return is fixed, so it gains nothing if the business does unusually well, which is precisely why it will not accept much risk.` },
      { type: 'subheading', text: 'Business angels' },
      { type: 'paragraph', text: `A **business angel** is a wealthy individual investing personal money in a young business for a share of it. Yusra Foods' angel paid ${money(ANGEL)} for ${ANGEL_SHARES.toLocaleString('en-GB')} shares. An angel accepts a risk no bank would, because a shareholding rises without limit if the business succeeds — and typically brings industry experience and contacts that a young business values as much as the money.` },
      { type: 'bullets', items: [
        '**A bank suits** a business with security to offer and predictable trading, and leaves ownership untouched.',
        '**An angel suits** a business with no assets and high potential, and costs part of the ownership permanently.',
      ] },
    ],
    realExample: { emoji: '👼', text: 'Many technology firms across South-East Asia raise their first outside money from individual investors who previously built companies of their own, rather than from banks that would have found no assets to lend against.' },
    misconception: 'Students write that angels lend money to start-ups. Angels buy shares; they are not repaid. Write instead: a business angel invests in exchange for a shareholding, so the money is never repaid and the return comes from the stake growing in value.',
    examMatters: 'An Analyse (6 marks, WBS12 Appendix 6) on choosing between them should follow one chain fully — the business has no security, so a bank will not lend, so the finance must come from an investor accepting risk for a share of the ownership.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each feature by whether it describes a Bank Loan or a Business Angel.',
      groups: [
        { name: 'Bank Loan', why: 'Borrowed money: repaid with interest, secured where possible, and leaving the ownership unchanged', items: ['Requires security over an asset', 'Repaid in fixed instalments', 'The provider gains nothing if the business thrives'] },
        { name: 'Business Angel', why: 'Sold ownership: never repaid, accepting high risk in exchange for a stake that can rise without limit', items: ['Receives shares in the business', 'Often brings industry experience', 'Accepts the risk of a business with no assets'] },
      ],
    }),
  };
})();

const peerToPeerAndCrowdFunding = (() => {
  const sid = subId('peer-to-peer-and-crowd-funding');
  return {
    id: sid,
    title: 'Peer-to-Peer Funding and Crowd Funding',
    keyIdea: 'Both raise money from many people online: peer-to-peer lends and is repaid with interest, while crowd funding gives backers shares, a reward or the product.',
    body: [
      { type: 'paragraph', text: 'Two of the six sources exist because online platforms made it practical to raise money from many people at once rather than from one institution. They are easy to confuse and the specification names them separately.' },
      { type: 'subheading', text: 'Peer-to-peer funding' },
      { type: 'paragraph', text: `**Peer-to-peer funding** is lending. A platform matches a business with many individual lenders, each providing part of the total, and the business repays with interest exactly as it would repay a bank. Yusra Foods raised ${money(P2P)} this way for a packaging upgrade. It is borrowed money: no ownership changes hands.` },
      { type: 'subheading', text: 'Crowd funding' },
      { type: 'paragraph', text: `**Crowd funding** collects small amounts from a large number of people, usually through an online campaign. What the backers receive varies: shares in the business, a reward, or the product itself before it is made. Yusra Foods pre-sold ${money(CROWD)} of a new product line to backers who received the first cases.` },
      { type: 'bullets', items: [
        '**Crowd funding proves demand.** A campaign that reaches its target has shown that buyers will pay, which no forecast can.',
        '**Both can fail publicly.** A campaign that misses its target does so in view of the customers the business was trying to attract.',
      ] },
    ],
    realExample: { emoji: '🌐', text: 'Consumer hardware companies routinely launch products by pre-selling them to backers online, financing the first production run from customers rather than from a lender.' },
    misconception: 'Students use peer-to-peer and crowd funding as the same thing. Peer-to-peer is always a loan that is repaid with interest; crowd funding may give away shares, rewards or product. Write instead: name what the provider receives, because that is what separates them.',
    examMatters: 'An Explain (4 marks, WBS12 Appendix 6) on crowd funding can develop its second effect: the campaign is public, so reaching the target both raises the money and demonstrates demand to other providers.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction between the two online sources:',
      template: [
        'Peer-to-peer funding is a form of ___ that is repaid with interest',
        'Crowd funding backers may instead receive shares, rewards or the ___',
        'A successful campaign also demonstrates that ___ exists before the first unit is made',
      ],
      answers: ['lending', 'product', 'demand'],
      hints: ['the money is borrowed, not invested for a stake', 'what a backer gets when the campaign pre-sells rather than sells shares', 'what a business normally has to forecast rather than prove'],
      distractors: ['interest', 'security'],
    }),
  };
})();

const bankLoansOverdrafts = (() => {
  const sid = subId('bank-loans-overdrafts'); // March id, kept
  return {
    id: sid,
    title: 'Loans and Overdrafts',
    keyIdea: 'A loan is a fixed sum repaid over an agreed period and suits a known long-term cost; an overdraft covers a short-term shortfall up to a limit and is charged only on what is used.',
    body: [
      { type: 'paragraph', text: 'The first two **methods** are both borrowing from a bank, and they are built for opposite jobs.' },
      { type: 'paragraph', text: `A **loan** is a fixed sum, repaid in instalments over an agreed term with interest. Yusra Foods' ${money(BANK_LOAN)} runs for ${LOAN_YEARS} years at ${money(LOAN_MONTHLY)} a month: ${money(loanRepaid())} repaid in total, of which ${money(loanInterest())} is interest. The repayment is known in advance, which makes it plannable, and the term can be matched to the life of whatever it bought.` },
      { type: 'paragraph', text: `An **overdraft** lets the business spend beyond its account balance up to an agreed limit — ${money(OVERDRAFT_LIMIT)} for Yusra Foods — and interest is charged only on the amount actually used. It is built for a gap: the weeks between paying a supplier and being paid by a customer.` },
      { type: 'bullets', items: [
        '**Match the term to the purpose.** A machine lasting years is paid for by a loan lasting years.',
        '**An overdraft is repayable on demand.** The bank can withdraw it, so it cannot fund anything long-term.',
        '**Using an overdraft for a long-term purchase** is the classic error: it can be pulled before the asset has earned anything back.',
      ] },
    ],
    realExample: { emoji: '🏦', text: 'Agricultural businesses commonly run an overdraft between planting and harvest and hold a separate long-term loan for land or machinery — the same firm using both methods for the jobs each is built for.' },
    misconception: 'Students write that an overdraft is cheaper than a loan because interest is only charged on what is used. The rate is higher, so it is cheaper only for a short, small shortfall. Write instead: an overdraft costs less overall only where the borrowing is brief; over a long period a loan is the cheaper method.',
    examMatters: 'A Calculate (4 marks, WBS12 Appendix 6) may ask for the total repaid or the interest on a loan. Show the working — monthly repayment, number of months, total — because the method is what a calculation question is testing.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each financing need to the method built for it:',
      pairs: [
        { left: 'A production line to be used for years', right: 'A long-term bank loan', why: 'The repayment term can be matched to the years of use, so the asset earns while it is being paid for' },
        { left: 'A six-week gap before customers pay', right: 'An overdraft', why: 'Interest is charged only on what is used and only while it is used, which suits a short and uncertain shortfall' },
        { left: 'A permanent increase in capital with no repayment', right: 'Issuing share capital', why: 'Share capital is never repaid, which is what distinguishes it from every borrowing method' },
      ],
      distractors: ['Trade credit from a supplier'],
    }),
  };
})();

const shareCapital = (() => {
  const sid = subId('share-capital'); // March id, kept
  return {
    id: sid,
    title: 'Share Capital and Venture Capital',
    keyIdea: 'Share capital is money raised by selling part of the ownership, so it is never repaid; venture capital is share capital provided by a fund investing in high-growth businesses.',
    body: [
      { type: 'paragraph', text: '**Share capital** is raised by issuing shares: an investor pays money and receives part of the ownership. It is permanent — the business never repays it — and in exchange the shareholder takes a share of the profits and a say in decisions.' },
      { type: 'subheading', text: 'What issuing shares does to ownership' },
      { type: 'paragraph', text: `The founder of Yusra Foods held all ${FOUNDER_SHARES.toLocaleString('en-GB')} shares. The angel's ${money(ANGEL)} bought ${ANGEL_SHARES.toLocaleString('en-GB')} new shares at ${money(ANGEL_PRICE)} each, taking the total to ${sharesAfterAngel().toLocaleString('en-GB')}. The founder still holds the same number of shares but now ${pc(FOUNDER_AFTER_ANGEL())} of the company rather than ${pc(100)}. That is **dilution**: the stake shrinks because the company grew, not because anything was taken away.` },
      { type: 'paragraph', text: '**Venture capital** is the same method from a particular kind of source: a fund that invests other people\'s money in businesses with high growth potential, usually taking a substantial stake and a seat at the table. It arrives in larger amounts than an angel can provide and with more conditions attached.' },
      { type: 'bullets', items: [
        '**No repayment and no interest**, so a business with no profits yet can still be financed.',
        '**Ownership is permanently reduced**, and with it the founder\'s control over decisions.',
        '**Which businesses may issue shares at all** depends on their legal form — the question this section returns to in the final chapter.',
      ] },
    ],
    realExample: { emoji: '📈', text: 'Venture capital funds backed Sea Limited and Grab through several rounds before either listed publicly, taking large stakes in businesses that were not yet profitable.' },
    misconception: 'Students write that dilution means the founder loses shares. The founder keeps every share; there are simply more shares in existence. Write instead: dilution reduces the percentage held, not the number of shares held.',
    examMatters: 'A Calculate (4 marks, WBS12 Appendix 6) may ask for a shareholding after a new issue. Divide the shares held by the new total in issue — the denominator is what changes, and using the old one is the error the question is testing for.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the arithmetic of the angel\'s investment:',
      template: [
        `The angel paid ${money(ANGEL)} for ${ANGEL_SHARES.toLocaleString('en-GB')} shares at ${money(ANGEL_PRICE)} each`,
        `Shares in issue rose from ${FOUNDER_SHARES.toLocaleString('en-GB')} to ${sharesAfterAngel().toLocaleString('en-GB')}, because new shares were ___`,
        `The founder's stake fell from 100% to ___`,
        'Share capital is never ___, unlike every borrowing method',
      ],
      answers: ['issued', pc(FOUNDER_AFTER_ANGEL()), 'repaid'],
      hints: ['what a company does to create shares that did not exist before', 'divide the founder\'s shares by the new total', 'what a loan must be and share capital never is'],
      distractors: [pc(50), 'borrowed'],
    }),
  };
})();

const leasingTradeCreditGrants = (() => {
  const sid = subId('leasing-trade-credit-grants');
  return {
    id: sid,
    title: 'Leasing, Trade Credit and Grants',
    keyIdea: 'Leasing rents an asset instead of buying it, trade credit delays payment to suppliers, and a grant is money that need not be repaid but comes with conditions attached.',
    body: [
      { type: 'paragraph', text: 'The last three **methods** all provide finance without a sum of money being borrowed at all, which is why they are easy to overlook when a question asks how a business could fund something.' },
      { type: 'subheading', text: 'Leasing' },
      { type: 'paragraph', text: `**Leasing** pays to use an asset rather than to own it. Yusra Foods' packing machine costs ${money(MACHINE_PRICE)} to buy or ${money(LEASE_MONTHLY)} a month to lease for ${LEASE_MONTHS} months — ${money(leaseTotal())} in total, or ${money(leasePremium())} more than buying. The premium buys the avoidance of a ${money(MACHINE_PRICE)} outlay the business may not have, and maintenance is usually included.` },
      { type: 'subheading', text: 'Trade credit' },
      { type: 'paragraph', text: `**Trade credit** is a supplier agreeing to be paid later — ${CREDIT_DAYS} days for Yusra Foods on ${money(SUPPLY_MONTHLY)} of deliveries a month, so up to ${money(tradeCreditHeld())} of materials is held before any cash leaves. It is interest-free, but suppliers may offer discounts for early payment, and late payment damages the relationship the business depends on.` },
      { type: 'subheading', text: 'Grants' },
      { type: 'paragraph', text: `A **grant** is money that does not have to be repaid, usually from a government or development agency supporting a particular activity. Yusra Foods received a ${money(GRANT)} export development grant conditional on hiring two staff. Grants are competitive, slow to obtain and restricted to the purpose stated.` },
    ],
    realExample: { emoji: '🚚', text: 'Logistics firms commonly lease their vehicle fleets rather than owning them, converting a large purchase into a monthly cost and leaving maintenance with the lessor.' },
    misconception: 'Students describe a grant as free money. It is free of repayment, not free of conditions or of the effort to obtain one. Write instead: a grant need not be repaid but is restricted to a stated purpose, and the application competes against others.',
    examMatters: 'A Calculate (4 marks, WBS12 Appendix 6) on leasing wants the comparison completed: the total of the lease payments set against the purchase price, and the difference stated as the extra cost of leasing.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each method to what the business gives up in exchange for the finance:',
      pairs: [
        { left: 'Leasing', right: 'A higher total cost, and ownership of the asset', why: `The lease payments come to ${money(leaseTotal())} against a ${money(MACHINE_PRICE)} purchase price, and the asset is never owned` },
        { left: 'Trade credit', right: 'Early-payment discounts, and supplier goodwill if late', why: 'The finance is interest-free, so what is given up is the discount and the strength of the relationship' },
        { left: 'A grant', right: 'Freedom over how the money is spent', why: 'A grant need not be repaid, but it is restricted to the purpose it was awarded for and carries conditions' },
      ],
      distractors: ['Part of the ownership of the business'],
    }),
  };
})();

const matchingFinanceToCircumstances = (() => {
  const sid = subId('matching-finance-to-circumstances');
  return {
    id: sid,
    title: 'Matching Finance to the Circumstances',
    keyIdea: 'Suitability is what both external finance leaves ask for: the purpose, the amount, the time period and the acceptable cost to control decide the choice.',
    body: [
      { type: 'paragraph', text: 'The specification asks for sources and methods **and their suitability for different circumstances**, which is the part an answer is judged on. Four questions decide it.' },
      { type: 'flow', steps: [
        { title: 'What is it for?', subtitle: 'A short gap, or an asset lasting years?' },
        { title: 'How much is needed?', subtitle: 'Small sums rule out an equity round' },
        { title: 'For how long?', subtitle: 'Match the term to the purpose' },
        { title: 'At what cost to control?', subtitle: 'Borrow, or sell part of the ownership?' },
      ], result: 'A source and method chosen for the situation, not by habit', resultType: 'good' },
      { type: 'paragraph', text: `Run the four over Yusra Foods' opening ${money(NEED)}. Premises and a production line last years, so the finance must be long-term: an overdraft is ruled out immediately. The amount far exceeds the founder's ${money(OWNER_CAPITAL)} of savings, so outside money is required. The bank lends ${money(BANK_LOAN)} against the line but not the whole sum; ${money(FAMILY)} comes from family on terms no commercial provider would offer; and the last ${money(ANGEL)} must come from someone accepting risk without security — which costs ownership.` },
      { type: 'paragraph', text: 'That is why the package has four parts rather than one. The weak answer names a single "best" source; there is no such thing, because the four questions have different answers for different businesses.' },
    ],
    realExample: { emoji: '🧩', text: 'A manufacturer expanding into a new market will typically hold a long-term loan for the factory, an overdraft for seasonal stock and supplier credit for materials, each chosen for a different need.' },
    misconception: 'Students conclude that one source is best overall — retained profit, because it looks cheapest. The question is always which source suits this purpose, this amount and this period. Write instead: the appropriate source depends on the circumstances, and name which circumstance decides it.',
    examMatters: 'An Assess (10 marks, WBS12 Appendix 6) requires a judgement supported by the context in the source. Naming the circumstance that decides it — the purpose, the amount, the period or the owner\'s willingness to give up control — is what turns a comparison into a judgement.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four questions that decide suitability into the order the chapter asks them, from purpose to control:',
      correctOrder: [
        'What is the finance for?',
        'How much is needed?',
        'Over what period is it needed?',
        'Which cost to control is acceptable?',
      ],
      why: [
        'The purpose comes first because it determines whether the need is short-term or long-term',
        'The amount is asked once the purpose is known, since the purpose sets the scale',
        'The term follows from the purpose and amount, and must be matched to the life of what is bought',
        'The control question is asked last because it decides between borrowing and issuing shares once the other three are settled',
      ],
    }),
  };
})();

/* ══ Block 4 — Forms of Business (2.3.1 · 4a, 4b, 4c) ══════════════════════ */
/*
 * specGap-07 calls this block an out-of-spec Unit 1 recap and asks for it to be labelled as one;
 * quiz-01 and quiz-02 ask for the franchising and social enterprise quiz items to be deleted as
 * untaught Unit 1 content. All three are refuted by the spec text: 4a, 4b and 4c are three leaves of
 * 2.3.1 (`bus_spec.txt:870-875`), and 4b — franchising, social enterprise, lifestyle businesses and
 * online businesses — was one of the four leaves with no coverage at all. It is taught here.
 */

const soleTradersPartnerships = (() => {
  const sid = subId('sole-traders-partnerships'); // March id, kept
  return {
    id: sid,
    title: 'Sole Trader and Partnership',
    keyIdea: 'A sole trader is one owner and a partnership two or more; neither is separate in law from its owners, which is what limits the finance available to them.',
    body: [
      { type: 'paragraph', text: 'The specification names three forms in 4a, and the first two share the feature that matters: the business has no separate legal identity. In law the owner and the business are the same person.' },
      { type: 'paragraph', text: 'A **sole trader** is a single owner. Setting up requires almost nothing, the owner keeps all the profit and answers to nobody, and decisions can be made the same day. Against that, the owner carries every loss personally and the business is limited to what one person can fund and do.' },
      { type: 'paragraph', text: 'A **partnership** is two or more owners trading together, usually under an agreement setting out shares of profit and responsibility. Partners bring more capital and complementary skills — one may know the product and another the market — but decisions must now be agreed, profits are divided, and in a general partnership each partner can be held responsible for the others\' business debts.' },
      { type: 'bullets', items: [
        '**Both are quick and cheap to establish**, with little public disclosure of their affairs.',
        '**Neither can issue shares**, because there is no company whose ownership could be divided into them.',
        '**Both leave the owners personally responsible** for the debts of the business, which the final chapter examines.',
      ] },
    ],
    realExample: { emoji: '🛠️', text: 'Most workshops, clinics and market traders anywhere in the world operate as sole traders or partnerships: the forms are the default for a business that needs no outside capital.' },
    misconception: 'Students write that a partnership means the partners share the losses equally. Responsibility depends on the agreement, and in a general partnership a partner can be pursued for the whole debt. Write instead: the agreement divides profits, but liability for business debts can fall on any partner.',
    examMatters: 'An Explain (4 marks, WBS12 Appendix 6) on a partnership needs a reason developed into a consequence: two owners bring more capital, so the business can start at a scale a single owner could not fund.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each feature by the form it describes: Sole Trader or Partnership.',
      groups: [
        { name: 'Sole Trader', why: 'One owner: full control and all the profit, limited by what one person can fund', items: ['Keeps all of the profit', 'Makes decisions without consulting anyone', 'Limited to one person\'s capital'] },
        { name: 'Partnership', why: 'Two or more owners: more capital and complementary skills, but shared profits and shared decisions', items: ['Profits divided by agreement', 'Brings together different skills', 'Decisions must be agreed between owners'] },
      ],
    }),
  };
})();

const privateLimitedCompanies = (() => {
  const sid = subId('private-public-limited-companies'); // March id, kept
  return {
    id: sid,
    title: 'Private Limited Company (Ltd)',
    keyIdea: 'A private limited company is a separate legal entity owned by shareholders, whose shares are sold privately rather than offered to the public.',
    body: [
      { type: 'paragraph', text: 'The third form in 4a is the **private limited company (Ltd)**, and it differs from the first two in a way that changes everything about its finance: the company is a separate legal person. It owns the assets, owes the debts and signs the contracts in its own name.' },
      { type: 'paragraph', text: 'Ownership is divided into **shares**, held privately — sold to people the existing owners agree to, not to the public. This is what let Yusra Foods take the angel\'s investment: there were shares to sell, and a sole trader would have had nothing to offer.' },
      { type: 'bullets', items: [
        '**It can raise share capital**, which is the practical reason many growing businesses incorporate.',
        '**The owners\' liability is limited** to what they paid for their shares, which the final chapter examines in full.',
        '**It must file accounts** and register its officers, so its affairs become partly public.',
        '**Shares cannot be sold freely.** A shareholder wanting to leave needs a buyer the other owners accept.',
      ] },
      { type: 'paragraph', text: 'The costs are real: incorporation, ongoing filing and public accounts a competitor can read. Businesses accept them when the finance a company can raise, or the protection it gives, is worth more than the disclosure it requires.' },
    ],
    realExample: { emoji: '🏢', text: 'Family firms across Asia and the Gulf frequently incorporate as private companies while keeping every share inside the family, taking the separate legal identity without opening ownership to outsiders.' },
    misconception: 'Students write that a private limited company can sell shares to the public. It cannot — that is what makes it private. Write instead: an Ltd sells shares privately to people the existing shareholders approve, while only a plc may offer shares to the public.',
    examMatters: 'A Define (2 marks, WBS12 Appendix 6) on a private limited company needs both halves: a separate legal entity owned by shareholders, whose shares are not offered to the public.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what incorporating as a private limited company changes:',
      template: [
        'The company becomes a ___ legal entity from its owners',
        'Ownership is divided into ___ that can be sold privately',
        'In exchange, the company must ___ its accounts publicly',
      ],
      answers: ['separate', 'shares', 'file'],
      hints: ['the opposite of the owner and the business being the same person in law', 'what ownership is divided into once a company exists', 'what a company must do with its accounts each year'],
      distractors: ['personal', 'hide'],
    }),
  };
})();

const franchising = (() => {
  const sid = subId('franchising');
  return {
    id: sid,
    title: 'Franchising',
    keyIdea: 'A franchisee pays a fee and royalties to trade under an established brand and proven model, buying lower risk with independence and a share of revenue.',
    body: [
      { type: 'paragraph', text: '**Franchising** is the first of the forms in 4b. A **franchisor** owns a brand and a business model and licenses them; a **franchisee** pays to trade under that brand in a particular place, following the franchisor\'s system.' },
      { type: 'subheading', text: 'What each side gets' },
      { type: 'bullets', items: [
        '**The franchisee** gets a known brand, a proven format, training and often supply arrangements — so it starts with customers who already recognise the name.',
        '**The franchisor** expands using the franchisees\' capital rather than its own, which is a form of finance: growth funded by the people opening the outlets.',
        '**The franchisee pays** an initial fee and continuing royalties, usually a percentage of revenue, whether or not the outlet is profitable.',
        '**The franchisee gives up independence.** Prices, products, suppliers and appearance are set by the franchisor.',
      ] },
      { type: 'paragraph', text: 'For an entrepreneur, the trade is lower risk for lower freedom and a permanently smaller share of the revenue. For the brand owner, it is the fastest way to grow a network without funding every site — which is why franchising appears in a topic about raising finance at all.' },
    ],
    realExample: { emoji: '🍔', text: 'Large restaurant chains across Asia and the Middle East are built almost entirely from franchised outlets, each funded by the local operator rather than by the brand that owns the name.' },
    misconception: 'Students write that a franchisee owns the brand. The franchisee owns the outlet and licenses the brand, and the licence can end. Write instead: the franchisee buys the right to use the brand and model, not the brand itself.',
    examMatters: 'An Analyse (6 marks, WBS12 Appendix 6) on franchising should follow one chain: the franchisee trades under a known name, so it attracts customers from the first day, so the risk of failure is lower than for a new independent business.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each party in a franchise to what the arrangement gives them:',
      pairs: [
        { left: 'The franchisee', right: 'An established brand and a proven model', why: 'It starts with recognition and a format that already works, which is what lowers the risk of opening' },
        { left: 'The franchisor', right: 'Expansion funded by other people\'s capital', why: 'Each outlet is paid for by its operator, so the network grows without the brand owner financing every site' },
        { left: 'Both parties', right: 'A continuing share of the outlet\'s revenue', why: 'Royalties flow from franchisee to franchisor for as long as the agreement runs, tying both to the outlet\'s sales' },
      ],
      distractors: ['Complete independence over pricing'],
    }),
  };
})();

const socialEnterpriseLifestyleOnline = (() => {
  const sid = subId('social-enterprise-lifestyle-online');
  return {
    id: sid,
    title: 'Social Enterprise, Lifestyle and Online Businesses',
    keyIdea: 'These three forms are defined by their purpose or their setting rather than their legal status: a social aim, a life the owner wants, or a business that trades online.',
    body: [
      { type: 'paragraph', text: 'The rest of 4b names three more forms. Unlike sole trader or company, these describe what the business is **for** or **where it trades**, not its legal structure — each can be a sole trader or a company underneath.' },
      { type: 'subheading', text: 'Social enterprise' },
      { type: 'paragraph', text: 'A **social enterprise** trades to achieve a social or environmental aim, reinvesting most of its surplus into that purpose rather than distributing it to owners. It is a business, not a charity: it earns revenue by selling. Its finance differs — grants and mission-aligned investors are open to it, while investors seeking maximum returns are not.' },
      { type: 'subheading', text: 'Lifestyle businesses' },
      { type: 'paragraph', text: 'A **lifestyle business** is run to support the life the owner wants rather than to grow as large as possible. Growth is a choice it declines. Its finance is usually the owner\'s capital and retained profit, because outside investors want growth the owner is not seeking.' },
      { type: 'subheading', text: 'Online businesses' },
      { type: 'paragraph', text: 'An **online business** trades through a website or platform rather than premises. Start-up costs are lower and the market is wider from day one, but competition is immediate and visible, and the business depends on platforms whose terms it does not control.' },
    ],
    realExample: { emoji: '🌱', text: 'Grameen Bank was built to extend credit to borrowers banks would not serve, earning revenue from lending while pursuing a purpose that shaped which investors would fund it.' },
    misconception: 'Students write that a social enterprise cannot make a profit. It can and usually must; what differs is where the surplus goes. Write instead: a social enterprise reinvests most of its surplus into its social aim rather than distributing it to owners.',
    examMatters: 'An Explain (4 marks, WBS12 Appendix 6) on a lifestyle business needs the consequence stated: the owner is not seeking growth, so equity investors who require it are not a realistic source of finance.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each business by the form it is: Social Enterprise, Lifestyle Business or Online Business.',
      groups: [
        { name: 'Social Enterprise', why: 'Trades commercially but exists for a social or environmental aim, reinvesting most of its surplus into it', items: ['A bakery employing and training former prisoners', 'A lender serving borrowers banks refuse'] },
        { name: 'Lifestyle Business', why: 'Run at the scale the owner wants rather than the largest scale possible', items: ['A diving school the owner keeps to one boat', 'A consultant who declines work beyond four days a week'] },
        { name: 'Online Business', why: 'Trades through a website or platform rather than premises, with lower start-up costs and immediate competition', items: ['A shop selling only through a marketplace platform', 'A software service sold by subscription'] },
      ],
    }),
  };
})();

const growthToPlcAndFlotation = (() => {
  const sid = subId('growth-to-plc-and-flotation');
  return {
    id: sid,
    title: 'Growth to plc and Stock Market Flotation',
    keyIdea: 'A public limited company may offer its shares to the public, and flotation raises large sums at the cost of opening ownership, and control, to buyers the founders do not choose.',
    body: [
      { type: 'paragraph', text: 'Leaf 4c is the last step: **growth to a public limited company (plc) and stock market flotation**. A plc may offer its shares to the public, which no other form may do. **Flotation** is the act of listing those shares on a stock exchange so anyone can buy them.' },
      { type: 'subheading', text: 'Yusra Foods floats' },
      { type: 'paragraph', text: `The company issues ${FLOAT_SHARES.toLocaleString('en-GB')} new shares at ${money(FLOAT_PRICE)} each, raising ${money(floatRaised())} — more than the whole original funding package. Shares in issue rise to ${sharesAfterFloat().toLocaleString('en-GB')}, so the founder's stake falls from ${pc(FOUNDER_AFTER_ANGEL())} to ${pc(FOUNDER_AFTER_FLOAT())}, the angel's from ${pc(ANGEL_AFTER_ANGEL())} to ${pc(ANGEL_AFTER_FLOAT())}, and the public holds ${pc(PUBLIC_AFTER_FLOAT())}.` },
      { type: 'bullets', items: [
        '**Access to capital on a different scale**, and the ability to return to the market for more.',
        '**Existing shareholders can sell.** An angel or founder finally has a way to turn a stake into cash.',
        '**Ownership is open.** Anyone may buy, including a competitor, and a founder below half the shares can be outvoted.',
        '**Disclosure and cost.** A listed company reports publicly and continuously, and flotation itself is expensive.',
      ] },
      { type: 'paragraph', text: `Note what the founder's ${pc(FOUNDER_AFTER_FLOAT())} means: the largest single holding, but not a majority. Control now depends on other shareholders agreeing.` },
    ],
    realExample: { emoji: '🔔', text: 'Saudi Aramco and Alibaba both listed shares publicly after long periods in private hands, raising sums no private investor could have provided and accepting public reporting in exchange.' },
    misconception: 'Students write that flotation means selling the company. It means selling a part of it, and how much control is lost depends on what proportion is sold. Write instead: flotation transfers a stated proportion of the ownership, and the founder may remain the largest shareholder.',
    examMatters: 'A Calculate (4 marks, WBS12 Appendix 6) on flotation may ask for the sum raised or a stake afterwards. Multiply the new shares by the issue price for the first; divide a holding by the enlarged total for the second.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of Yusra Foods\' ownership into the order they happened, from formation to flotation:',
      correctOrder: [
        `The founder holds all ${FOUNDER_SHARES.toLocaleString('en-GB')} shares`,
        `An angel buys ${ANGEL_SHARES.toLocaleString('en-GB')} new shares, taking the founder to ${pc(FOUNDER_AFTER_ANGEL())}`,
        `${FLOAT_SHARES.toLocaleString('en-GB')} shares are sold to the public at flotation`,
        `Dilution leaves the founder holding ${pc(FOUNDER_AFTER_FLOAT())}, no longer a majority`,
      ],
      why: [
        'Before any outside investment, the founder owns the whole company',
        'The first dilution: shares in issue rise and the founder holds the same number of a larger total',
        'Flotation comes last, because only a company that has already grown reaches a public listing',
        'The consequence of the second dilution, and the reason control becomes a matter of agreement with others',
      ],
    }),
  };
})();

/* ══ Block 5 — Liability (2.3.1 · 5a, 5b) ══════════════════════════════════ */

const unlimitedVsLimitedLiability = (() => {
  const sid = subId('unlimited-vs-limited-liability'); // March id, kept
  return {
    id: sid,
    title: 'Unlimited Liability and What It Means',
    keyIdea: 'Where a business has no separate legal identity, its debts are the owner\'s debts, so a failure can reach the owner\'s personal assets without limit.',
    body: [
      { type: 'paragraph', text: '**Unlimited liability** follows from the point made in chapter 4: a sole trader or partnership is not separate from its owners in law. If the business cannot pay a debt, the debt does not stop at the business — it is already the owner\'s.' },
      { type: 'paragraph', text: 'A supplier owed money by a sole trader is owed money by that person, and can pursue their savings, their car and in some circumstances their home. There is no ceiling: the amount at risk is the size of the debt, not the size of the investment.' },
      { type: 'flow', steps: [
        { title: 'The business cannot pay', subtitle: 'Debts exceed what the business holds' },
        { title: 'Creditors pursue the owner', subtitle: 'Owner and business are the same in law' },
        { title: 'Personal assets are at risk', subtitle: 'Savings, vehicle, potentially the home' },
      ], result: 'Losses limited only by the size of the debt, not by what was invested', resultType: 'bad' },
      { type: 'paragraph', text: 'This changes behaviour long before any failure. An owner facing unlimited liability takes fewer risks, borrows less, and may turn down expansion that a company would pursue — so liability shapes not only the consequences of failure but the decisions taken every day.' },
    ],
    realExample: { emoji: '⚠️', text: 'Owners of unincorporated businesses that fail commonly lose personal savings alongside the business, because the creditors were always the owner\'s creditors rather than the firm\'s.' },
    misconception: 'Students write that unlimited liability means the owner loses everything invested. Everything invested is the limited case; unlimited means the loss is not capped by what was invested at all. Write instead: unlimited liability puts personal assets beyond the investment at risk.',
    examMatters: 'A Define (2 marks, WBS12 Appendix 6) on unlimited liability needs the cause and the effect: the owner is not legally separate from the business, so is personally responsible for its debts in full.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the three stages of an unlimited liability failure into the order they occur, from the debt to the personal loss:',
      correctOrder: [
        'The business cannot pay what it owes',
        'Creditors pursue the owner personally',
        'Personal assets are used to settle the debt',
      ],
      why: [
        'The starting point: debts exceed the assets the business holds',
        'They can do so because the owner and the business are the same person in law, with no separation to stop at',
        'The final consequence, and the one a limited company exists to prevent',
      ],
    }),
  };
})();

const limitedLiabilityAdvantages = (() => {
  const sid = subId('limited-liability-advantages-disadvantages');
  return {
    id: sid,
    title: 'Limited Liability: Advantages and Disadvantages',
    keyIdea: 'Limited liability caps a shareholder\'s loss at what they paid for their shares, which encourages investment and risk-taking, but it is paid for with disclosure and is not absolute.',
    body: [
      { type: 'paragraph', text: 'Leaf 5a asks for the **implications of limited and unlimited liability, including advantages and disadvantages**. Limited liability means a shareholder can lose what they paid for their shares and no more; the company owes its debts, and the company is not the shareholder.' },
      { type: 'bullets', items: [
        '**It makes outside investment possible.** Nobody would buy shares in a business they have never run if the debts could follow them home.',
        '**It encourages risk-taking**, because the downside is known in advance while the upside is not capped.',
        '**Disclosure is the price.** A company files accounts and registers its officers, so competitors and customers can read its affairs.',
        '**It costs money and time** to incorporate and to keep filing.',
      ] },
      { type: 'paragraph', text: 'It is also **not absolute**, and this is the part students most often miss. A bank lending to a small company will usually require a **personal guarantee** from the owner — a promise to pay personally if the company does not — which puts the owner back where an unlimited liability business started, for that debt.' },
      { type: 'paragraph', text: 'So limited liability protects shareholders from the company\'s creditors generally, but an owner who signs a guarantee has agreed to set it aside for the lender who asked.' },
    ],
    realExample: { emoji: '🛡️', text: 'Shareholders in a listed company that collapses lose the value of their shares and nothing more, which is why millions of people are willing to hold shares in businesses they take no part in running.' },
    misconception: 'Students write that limited liability protects the owner from all business debts. A personal guarantee is a common exception. Write instead: limited liability caps the shareholder\'s loss at their investment, unless they have personally guaranteed a particular debt.',
    examMatters: 'An Assess (10 marks, WBS12 Appendix 6) requires a supported judgement in context. The personal guarantee is what lets an answer judge rather than list: the protection is real for investors and much weaker for an owner-manager borrowing from a bank.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what limited liability does and does not do:',
      template: [
        'A shareholder can lose no more than the amount ___ for their shares',
        'This makes outside ___ possible in businesses the buyer does not run',
        'A bank may still require a personal ___ from an owner-manager',
      ],
      answers: ['paid', 'investment', 'guarantee'],
      hints: ['what the shareholder handed over when the shares were bought', 'what someone does when they buy shares rather than lend', 'the promise that puts an owner back on the hook for one debt'],
      distractors: ['borrowed', 'account'],
    }),
  };
})();

const choosingAppropriateFinance = (() => {
  const sid = subId('choosing-appropriate-finance'); // March id, kept
  return {
    id: sid,
    title: 'Finance Appropriate to Each Form',
    keyIdea: 'Legal form decides which finance a business can reach: only a company can issue shares, so an unincorporated business must borrow or use its own resources.',
    body: [
      { type: 'paragraph', text: 'Leaf 5b is what this section has been building towards: **finance appropriate for limited and unlimited liability businesses**. Legal form closes some doors outright.' },
      { type: 'subheading', text: 'An unlimited liability business' },
      { type: 'bullets', items: [
        '**Cannot issue shares at all** — there is no company whose ownership divides into them, so every equity source is closed.',
        '**Relies on owner\'s capital and retained profit**, both limited by the owner\'s wealth and its own trading.',
        '**Can borrow**, but a lender facing an owner with no legal shield wants security or a personal commitment.',
        '**Uses trade credit, leasing and overdrafts** freely, since none requires a share to be issued.',
      ] },
      { type: 'subheading', text: 'A limited liability business' },
      { type: 'bullets', items: [
        '**Can issue share capital** — privately as an Ltd, publicly once a plc — which opens angels, venture capital and flotation.',
        '**Borrows more easily**, because filed accounts and its own assets make it a more legible borrower.',
        '**Still meets personal guarantees** where the lender wants more than a small company can offer.',
      ] },
      { type: 'paragraph', text: `Yusra Foods' history is the whole leaf in one line: ${money(OWNER_CAPITAL)} of the founder's savings and ${money(FAMILY)} from family while it was small, then incorporation, then ${money(ANGEL)} from an angel — which required shares, which required a company.` },
    ],
    realExample: { emoji: '🚪', text: 'A partnership wanting outside equity has to incorporate first, which is why growing professional firms and family businesses so often become companies at the point they need capital they cannot supply themselves.' },
    misconception: 'Students write that a sole trader could raise venture capital if the investor agreed. It is not a matter of agreement: there are no shares to buy. Write instead: equity finance requires a company, so an unincorporated business must incorporate before it can raise it.',
    examMatters: 'An Evaluate (20 marks, WBS12 Appendix 6) requires a supported judgement. The strongest structure here weighs what incorporating opens — equity finance, easier borrowing, capped loss — against what it costs, and says which matters more for the business in the source and why.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each source of finance by whether an unlimited liability business can use it: Available to a Sole Trader or Requires a Company.',
      groups: [
        { name: 'Available to a Sole Trader', why: 'None of these requires shares to exist, so an unincorporated business can use them all', items: ['Owner\'s capital', 'A secured bank loan', 'Trade credit', 'Leasing'] },
        { name: 'Requires a Company', why: 'Each of these is paid for with shares, and only a company has ownership divided into shares to sell', items: ['A business angel\'s investment', 'Venture capital', 'Stock market flotation'] },
      ],
    }),
  };
})();

/* ══ Assembly ══════════════════════════════════════════════════════════════ */
/*
 * Five chapters in the specification's own order, block sizes 4 · 4 · 8 · 5 · 3. The sizes are
 * deliberately uneven: external finance carries thirteen of the topic's twenty-three leaves, so it
 * gets eight subsections and planning gets four. One subsection is one step (the step-0 rule), so
 * twelve crowded March steps become twenty-four small ones plus five check-ins.
 */
const BLOCKS = [
  {
    title: B1,
    sections: [contentsOfBusinessPlans, usingAPlanToRunTheBusiness, usingAPlanToObtainFinance, limitsOfABusinessPlan],
    takeaway: [
      'A plan states the idea, the evidence, the operation and the numbers.',
      'It has two readers: the owner running it and the provider funding it.',
      'Its figures are assumptions, so it must be revised, not filed.',
    ],
  },
  {
    title: B2,
    sections: [ownerCapital, retainedProfit, opportunityCostOfRetainedProfit, saleOfAssets],
    takeaway: [
      "Owner's capital comes first and is limited by the owner's own wealth.",
      'Retained profit charges no interest but has an opportunity cost.',
      'Sale of assets is one-off, and costly if the asset was still in use.',
    ],
  },
  {
    title: B3,
    sections: [sourcesAndMethods, familyFriendsOtherBusinesses, banksAndBusinessAngels, peerToPeerAndCrowdFunding, bankLoansOverdrafts, shareCapital, leasingTradeCreditGrants, matchingFinanceToCircumstances],
    takeaway: [
      'A source is who provides the money; a method is the form it takes.',
      'Borrowed money is repaid; share capital is not, but costs ownership.',
      'Suitability is decided by purpose, amount, time period and control.',
    ],
  },
  {
    title: B4,
    sections: [soleTradersPartnerships, privateLimitedCompanies, franchising, socialEnterpriseLifestyleOnline, growthToPlcAndFlotation],
    takeaway: [
      'A company is separate in law; a sole trader and partnership are not.',
      'Franchising funds the franchisor with the franchisee\'s own capital.',
      'Flotation raises the most and opens ownership to buyers nobody chose.',
    ],
  },
  {
    title: B5,
    sections: [unlimitedVsLimitedLiability, limitedLiabilityAdvantages, choosingAppropriateFinance],
    takeaway: [
      'Unlimited liability is not capped by what the owner invested.',
      'Limited liability ends where a personal guarantee begins.',
      'Only a company can issue shares, so form decides the finance available.',
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
 * Five Notes topics, one per Learn Mode chapter, so `depth.notes-titles` has a title to match
 * against each. Notes carry the specification's own phrasing where the coverage rule needs it
 * (packet 14's rule): `spec.uncovered` is lexical, so the four leaves that had no coverage at all —
 * leasing, grants, 4b's four forms and 5a's implications of limited and unlimited liability — are
 * worded here as the specification words them, and the sentence must still teach.
 */
const def = (text) => ({ type: 'def', text });
const mech = (text) => ({ type: 'mech', text });
const exam = (text) => ({ type: 'imp', text, tag: 'exam' });
const link = (text) => ({ type: 'link', text });

export const NOTES = [
  {
    title: B1,
    meta: '5 sections + 2 uses',
    keyIdea: 'What a business plan contains, and the relevance and uses of a business plan to the owner who writes it and the provider who reads it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Business plan</strong> — a written document setting out the objectives of a business, the strategy for reaching them and the financial forecasts behind it.'),
        def('<strong>Content of a business plan</strong> — the idea and objectives, market research, the marketing plan, operations, and financial forecasts with their assumptions stated.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('<strong>Relevance and uses of a business plan</strong>, internally: it forces assumptions to be stated and costed before money is committed, and becomes the benchmark later results are measured against.'),
        mech('Externally, the plan answers the question its reader is asking. A <strong>lender</strong> reads it for evidence the repayments can be met and for security; an <strong>equity investor</strong> reads it for the size of the opportunity.'),
        link('The limitation is that every figure is an assumption about an unknown future, so a plan dates and must be revised rather than defended.'),
        exam('An Evaluate (20 marks, WBS12 Appendix 6) requires a supported judgement: make the case, state the limits, and come down somewhere.'),
      ] },
    ],
    takeaway: [
      'The plan is judged on its evidence, not on having every section.',
      'Lender: can it repay? Investor: how large can it get?',
      'A plan is a working document, not a prediction.',
    ],
  },
  {
    title: B2,
    meta: '3 sources',
    keyIdea: 'Internal finance comes from the business itself: owner\'s capital from personal savings, retained profit, and the sale of assets.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Owner\'s capital: personal savings</strong> — money the owner invests in the business from their own resources, carrying no interest and no repayment date.'),
        def('<strong>Retained profit</strong> — profit remaining after tax and dividends, kept in the business to reinvest rather than distributed to owners.'),
        def('<strong>Sale of assets</strong> — raising cash by selling something the business owns; <strong>sale and leaseback</strong> sells the asset and rents it back, keeping the use and the cash but adding a rental cost.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Retained profit is free of <strong>interest</strong>, not free of <strong>cost</strong>. Its opportunity cost is the best alternative use given up: ${money(retained())} kept back would have returned ${money(retainedOpportunityCost())} at ${pc(DEPOSIT_RATE)} a year.`),
        mech('Internal finance is closed to the businesses that most need finance: a start-up has no profit to retain and few assets to sell.'),
        link('A business selling assets it still uses raises cash and loses capability, which is why the reason for a sale matters as much as the amount.'),
      ] },
    ],
    takeaway: [
      'Internal finance needs no approval, so it is the fastest to use.',
      'No interest is not no cost: price the alternative use.',
      'A start-up cannot retain profit it has not yet made.',
    ],
  },
  {
    title: B3,
    meta: '6 sources + 7 methods',
    keyIdea: 'Sources of finance and their suitability for different circumstances, and methods of finance and their suitability for different circumstances.',
    blocks: [
      { title: 'THE SIX SOURCES', items: [
        def('<strong>Family and friends</strong> — quick, cheap and informal, because the provider is backing a person rather than assessing a proposal. The risk moves from financial to personal.'),
        def('<strong>Banks</strong> — lend against evidence of repayment and usually security; the return is fixed, so little risk is accepted.'),
        def('<strong>Peer-to-peer funding</strong> — many individual lenders matched to a business through an online platform, repaid with interest like any loan.'),
        def('<strong>Business angels</strong> — wealthy individuals investing personal money in young businesses for a shareholding, often bringing industry experience with it.'),
        def('<strong>Crowd funding</strong> — small amounts from a large number of backers through an online campaign, who may receive shares, a reward or the product itself.'),
        def('<strong>Other businesses</strong> — money from another firm that usually also buys a trading relationship: secure supply, market access, or a closer tie to a growing customer.'),
      ] },
      { title: 'THE SEVEN METHODS', items: [
        def('<strong>Loans</strong> — a fixed sum repaid in instalments over an agreed term with interest; the term can be matched to the life of the asset bought.'),
        def('<strong>Share capital</strong> — money raised by issuing shares. Never repaid, and the buyer takes part of the ownership and the profits.'),
        def('<strong>Venture capital</strong> — share capital from a fund investing in high-growth businesses, in larger amounts and with more conditions than an angel.'),
        def('<strong>Overdrafts</strong> — spending beyond the account balance to an agreed limit, charged only on what is used and repayable on demand.'),
        def('<strong>Leasing</strong> — paying to use an asset rather than to own it, converting a large purchase into a monthly cost and usually including maintenance.'),
        def('<strong>Trade credit</strong> — a supplier agreeing to be paid later, so stock is held before cash leaves. Interest-free, but early-payment discounts are given up.'),
        def('<strong>Grants</strong> — money that need not be repaid, awarded for a stated purpose and carrying conditions; competitive and slow to obtain.'),
      ] },
      { title: 'SUITABILITY', items: [
        mech(`Four questions decide it: the <strong>purpose</strong>, the <strong>amount</strong>, the <strong>time period</strong>, and the acceptable cost to <strong>control</strong>. Yusra Foods' ${money(NEED)} needed four different answers, which is why the package had four parts.`),
        mech(`Leasing against buying, priced: ${money(MACHINE_PRICE)} to buy, or ${money(LEASE_MONTHLY)} a month for ${LEASE_MONTHS} months — ${money(leaseTotal())} in total, a premium of ${money(leasePremium())} for avoiding the outlay.`),
        exam('A Calculate (4 marks, WBS12 Appendix 6) requires the working shown, because the method is what is being tested.'),
      ] },
    ],
    takeaway: [
      'Name the party for a source; name the arrangement for a method.',
      'Match the term of the finance to the life of what it buys.',
      'There is no best source — only one that suits these circumstances.',
    ],
  },
  {
    title: B4,
    meta: '3 leaves, 7 forms',
    keyIdea: 'Sole trader, partnership and private limited company; franchising, social enterprise, lifestyle businesses and online businesses; and growth to public limited companies and stock market flotation.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Sole trader</strong> — one owner, not separate in law from the business, keeping all profit and carrying every loss personally.'),
        def('<strong>Partnership</strong> — two or more owners trading together under an agreement dividing profit and responsibility, with no separate legal identity.'),
        def('<strong>Private limited company (Ltd)</strong> — a separate legal entity owned by shareholders, whose shares are sold privately rather than to the public.'),
        def('<strong>Franchising</strong> — a franchisee pays an initial fee and continuing royalties to trade under a franchisor\'s brand and proven business model, giving up independence over how the outlet is run.'),
        def('<strong>Social enterprise</strong> — a business trading to achieve a social or environmental aim, reinvesting most of its surplus into that purpose rather than distributing it.'),
        def('<strong>Lifestyle businesses</strong> — run at the scale that suits the owner rather than the largest scale possible, so growth is declined rather than pursued.'),
        def('<strong>Online businesses</strong> — trading through a website or platform rather than premises: lower start-up costs and a wider market, with immediate competition and dependence on platforms.'),
        def('<strong>Growth to public limited companies (plc) and stock market flotation</strong> — a plc may offer shares to the public, and flotation lists them on an exchange so anyone may buy.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Issuing shares dilutes a percentage, not a holding. The founder kept ${FOUNDER_SHARES.toLocaleString('en-GB')} shares throughout and went from 100% to ${pc(FOUNDER_AFTER_ANGEL())} to ${pc(FOUNDER_AFTER_FLOAT())}, because the total in issue grew to ${sharesAfterAngel().toLocaleString('en-GB')} and then ${sharesAfterFloat().toLocaleString('en-GB')}.`),
        mech('Franchising is a finance method for the franchisor: the network grows on the franchisees\' capital rather than the brand owner\'s.'),
        link('Below half the shares, a founder may still hold more than anyone else and can still be outvoted, so control becomes a matter of agreement with others.'),
      ] },
    ],
    takeaway: [
      'Only a company has shares, so only a company can sell them.',
      'An Ltd sells shares privately; a plc may sell to the public.',
      'Dilution reduces the percentage held, never the shares held.',
    ],
  },
  {
    title: B5,
    meta: '2 leaves',
    keyIdea: 'The implications of limited and unlimited liability, including advantages and disadvantages, and the finance appropriate for limited and unlimited liability businesses.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Unlimited liability</strong> — the owner is not legally separate from the business, so is personally responsible for its debts in full, without a ceiling set by what was invested.'),
        def('<strong>Limited liability</strong> — a shareholder can lose no more than the amount paid for their shares, because the company owes its debts in its own name.'),
        def('<strong>Personal guarantee</strong> — a promise by an owner to pay a company debt personally, which sets limited liability aside for that debt.'),
      ] },
      { title: 'IMPLICATIONS: ADVANTAGES AND DISADVANTAGES', items: [
        mech('Limited liability makes outside investment possible, because a buyer who takes no part in running the business can know the maximum they can lose before they buy.'),
        mech('It is paid for with disclosure: a company files accounts and registers its officers, so competitors and customers can read its affairs.'),
        mech('Unlimited liability shapes decisions long before any failure — less borrowing, fewer risks, expansion declined — because the downside has no ceiling.'),
      ] },
      { title: 'FINANCE APPROPRIATE TO EACH', items: [
        mech('An <strong>unlimited liability</strong> business cannot issue shares at all, so every equity source is closed. It depends on owner\'s capital, retained profit, secured borrowing, trade credit, leasing and overdrafts.'),
        mech('A <strong>limited liability</strong> business can issue share capital — privately as an Ltd, publicly once a plc — which opens business angels, venture capital and flotation, and borrows more easily against filed accounts.'),
        exam('An Assess (10 marks, WBS12 Appendix 6) requires a judgement supported by the context given, not a balanced list.'),
      ] },
    ],
    takeaway: [
      'Unlimited means uncapped, not "everything you invested".',
      'Limited liability ends where a personal guarantee begins.',
      'To raise equity, an unincorporated business must incorporate first.',
    ],
  },
];
