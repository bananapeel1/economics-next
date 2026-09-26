/**
 * PACKET 48 — government-intervention-firms teaching content. Six chapters in the specification's own
 * order, twenty-eight subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1485-1535`, IAL 3.3.5 "Government intervention":
 *
 *   1  Controlling Monopolies and Mergers          1a, 1b-1..6        6 subsections
 *   2  Promoting Competition and Contestability     1c-1..5            5
 *   3  Protecting Suppliers and Employees           1d-1..6            5
 *   4  The Impact and Limits of Intervention        1e, 1f-1..4        4
 *   5  Wage Controls in Labour Markets              2a, 2b-1, 2b-2     4
 *   6  Taxes, Mobility and Fair Treatment          2b-3, 2b-4, 2b-5   4
 *
 * ── WHAT THE LIVE SECTION TAUGHT, AND WHAT HAPPENED TO IT ───────────────────
 *
 * Live (republished 25 Sep): three chapters, six subsections — the CMA and merger control,
 * anti-competitive behaviour, RPI−X, privatisation and nationalisation, government failure, and the
 * minimum wage. The economics of merger control, price caps, rate-of-return regulation and the two
 * ownership changes is kept and re-framed for an IAL candidate: CPI − X (checklist 3), competition
 * authorities from the candidates' own markets (topFix-05), the 20-mark Evaluate (accuracy-01). The
 * leniency paragraph leaned on game theory (3.3.3 · 5c) and is not carried. "Government failure" is
 * Unit 1 (1.3.6 · 2) and is no longer a subsection here: 3.3.5 · 1f asks for FOUR named limits, and
 * chapter 4 teaches each of them. The minimum wage stays and is BUILT OUT — rule before exception —
 * because packet 45 moved it here (`audit/SPEC-OWNERSHIP.md`), which reverses `topFix-03`'s
 * "consider moving the minimum-wage subsection to 3.3.4" and `structure-05`'s "minimum wage is
 * 3.3.4 content": 3.3.5 · 2b names "minimum wage controls" at `:1530`.
 */
import {
  SECTION, subId, id, NAT, TEL, CEM, LAB, MON, TOP, money, hr, k, h, pct,
} from './_packet48-util.mjs';

const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'Controlling Monopolies and Mergers';
export const B2 = 'Promoting Competition and Contestability';
export const B3 = 'Protecting Suppliers and Employees';
export const B4 = 'The Impact and Limits of Intervention';
export const B5 = 'Wage Controls in Labour Markets';
export const B6 = 'Taxes, Mobility and Fair Treatment';

/* ══ Block 1 — Controlling Monopolies and Mergers (3.3.5 · 1a, 1b) ════════ */

const caseForIntervention = (() => {
  const sid = subId('case-for-intervention');
  return {
    id: sid,
    title: 'The Case for Government Intervention in Product Markets',
    keyIdea: 'A firm with market power can charge more, produce less and let quality slip. Government intervenes to protect consumers, suppliers and employees from that power.',
    body: [
      { type: 'paragraph', text: 'The **case for government intervention** in product markets rests on what firms with market power can do when nothing stops them. A monopoly restricts output to raise its price (topic 3.3.3 shows why), so consumers pay more, buy less and have less choice, and there is a **welfare loss**. With no rival to lose customers to, it also has less reason to keep costs down or quality up.' },
      { type: 'bullets', items: [
        '**Natural monopolies**: one network, such as water pipes or a power grid, supplies the market at the lowest average cost, so the state regulates the single supplier rather than breaking it up.',
        '**Mergers and takeovers** can create market power that did not exist before.',
        '**Powerful buyers** can squeeze the suppliers and employees they buy from.',
        '**Barriers to entry** keep rivals out, so the market cannot correct itself.',
      ] },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Market power', subtitle: 'Few or no rivals' },
        { title: 'Higher price, lower output', subtitle: 'And less pressure on costs' },
        { title: 'Welfare loss and less choice', subtitle: 'The case for intervening' },
      ] },
      { type: 'paragraph', text: 'Chapter 4 sets the other side: intervention has limits of its own, so the case is always that intervention does better than the market it corrects, not that it is perfect.' },
    ],
    realExample: { emoji: '🚰', text: 'Almost every city has one water network, because laying a second set of pipes down each street would double the cost. So water tariffs are set or approved by a regulator, not left to the owner.' },
    misconception: 'Students treat every large firm as a reason to intervene. Size is not the problem: the case rests on market power being used to raise prices, cut output or quality, or squeeze suppliers and workers.',
    examMatters: 'Appendix 6 gives Explain 4 marks. For the case for intervention, the two stages are what the firm does with its power and who loses: consumers through price and choice, suppliers through the prices they are paid.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each problem in a product market to the intervention built to deal with it:',
      pairs: [
        { left: 'The only electricity grid in a country', right: 'a cap on what it may charge', why: 'A single network cannot be made competitive, so its price is controlled directly.' },
        { left: 'The two largest mobile networks plan to combine', right: 'a review under merger law', why: 'A combination that removes a rival is examined before it happens.' },
        { left: 'A state bus company faces no rival bidders', right: 'inviting private firms to bid for the routes', why: 'Competition FOR the contract replaces competition in the market.' },
        { left: 'A dominant grocery chain delays paying small farmers', right: 'rules on how large buyers treat suppliers', why: 'The power here is the buyer\'s, so the remedy restricts the buyer.' },
      ],
    }),
  };
})();

const priceRegulation = (() => {
  const sid = subId('price-regulation');
  const N = NAT;
  return {
    id: sid,
    title: 'Price Regulation: Capping the Price',
    keyIdea: 'Price regulation sets the most a monopoly may charge. A CPI − X cap lets the price rise by inflation minus X, so the firm keeps what it saves by cutting costs.',
    body: [
      { type: 'paragraph', text: `**Price regulation** sets a maximum price. Take ${'Tellmar'}\'s water network, a natural monopoly (topic 3.3.3): left alone it sets marginal revenue equal to marginal cost and charges ${money(N.mono.P)} a unit for ${k(N.mono.Q)} units a day, above its average cost of ${money(N.mono.AC)}.` },
      { type: 'bullets', items: [
        `**A cap at average cost**, ${money(N.avg.P)}: output rises to ${k(N.avg.Q)} units and the firm earns normal profit.`,
        `**A cap at marginal cost**, ${money(N.marg.P)}: output of ${k(N.marg.Q)} and allocative efficiency, but price is below the average cost of ${money(N.marg.AC)}, so the firm loses ${money(N.marg.loss)} thousand a day and needs a subsidy to stay open.`,
      ] },
      { type: 'paragraph', text: `Most regulators then let the cap change each year by **CPI − X**: the rate of inflation in consumer prices minus an efficiency factor, X. With inflation at ${pct(N.cpi)} and X at ${pct(N.X)}, the price may rise by ${pct(N.allowed)}, from ${money(N.avg.P)} to ${money(N.nextCap)}. A firm that cuts its costs faster than X keeps the difference as profit, so the cap gives it a reason to become more efficient.` },
      { type: 'paragraph', text: 'Setting X is the hard part. Too low, and the firm earns high profits at its customers\' expense; too high, and it cannot afford to maintain the network.' },
    ],
    realExample: { emoji: '⚡', text: 'Electricity and water regulators across Asia, Africa and the Gulf set the tariffs network companies may charge, and review them every few years against the companies\' costs.' },
    misconception: 'Students say that under CPI − X prices must fall. The cap limits how fast the price may RISE. It falls in money terms only when X is larger than inflation; otherwise it falls in real terms.',
    examMatters: 'A Calculate on a price cap carries 2 marks (Appendix 6): one for the allowed percentage change, inflation minus X, and one for the new price.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the price-cap working and what follows from it:',
      template: [
        'Consumer prices climb 6% over the year and the network\'s X is 4%, so its capped tariff may go up by ___ per cent.',
        'Whatever the network saves beyond X on its running costs, it keeps as extra ___.',
        'Set X far too high and the operator cannot fund ___ in pipes and pumps.',
      ],
      answers: ['2', 'profit', 'investment'],
      hints: ['inflation less the efficiency factor', 'what shareholders receive', 'spending on new equipment'],
      distractors: ['10', 'revenue', 'subsidy'],
    }),
  };
})();

const profitRegulation = (() => {
  const sid = subId('profit-regulation');
  const N = NAT;
  return {
    id: sid,
    title: 'Profit Regulation: Capping the Rate of Return',
    keyIdea: 'Profit regulation caps the rate of return a monopoly may earn on its capital. It protects investment but rewards spending, so costs tend to rise.',
    body: [
      { type: 'paragraph', text: `**Profit regulation**, or rate-of-return regulation, lets the firm set prices that cover its costs plus an allowed return on the capital it has invested. With an allowed return of ${pct(N.rate)} on a capital base of ${money(N.base)} million, the firm may earn ${money(N.allowedProfit)} million a year.` },
      { type: 'paragraph', text: `The attraction is certainty: investors know they will earn a fair return, so a network that needs heavy investment can raise the money. The weakness is incentives. Any rise in costs is passed on in prices, so there is little reason to cut them. And because the profit allowed grows with the capital base, adding ${money(N.added)} million of equipment raises allowed profit to ${money(N.allowedAfter)} million, whether or not the equipment was needed (textbooks call this the Averch-Johnson effect).` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Return fixed on capital', subtitle: `${pct(N.rate)} of the capital base` },
        { title: 'More capital, more profit', subtitle: 'An incentive to over-invest' },
        { title: 'Costs above the efficient level', subtitle: 'Productive inefficiency' },
      ] },
      { type: 'paragraph', text: 'A price cap reverses the incentive: the firm keeps what it saves. That is why many regulators moved from profit regulation to CPI − X caps, reviewed every few years.' },
    ],
    realExample: { emoji: '🏗️', text: 'Regulated utilities paid a return on their assets have been accused of "gold-plating": building grander plants and networks than customers needed, because every dollar of assets earns a return.' },
    misconception: 'Students think capping profit must make a firm efficient. It does the opposite: with profit guaranteed on whatever capital is used and costs passed on, the firm has little reason to control either.',
    examMatters: 'An Examine (8 marks, Appendix 6) comparing price and profit regulation needs the incentive in each and a judgement: which matters more depends on whether the industry most needs cost cutting or new investment.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the regulator\'s rule to its result:',
      correctOrder: [
        'Regulators guarantee a percentage return on each dollar of capital',
        'Managers see that extra capital lifts permitted profit',
        'The utility installs equipment it does not strictly require',
        'Supplying each unit costs more than an efficient network would',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the rule: profit is tied to the capital employed.',
        'So the firm can raise its allowed profit by raising its capital.',
        'It over-invests in equipment beyond what supply requires.',
        'Unneeded capital raises cost per unit: productive inefficiency.',
      ],
    }),
  };
})();

const qualityAndTargets = (() => {
  const sid = subId('quality-and-targets');
  return {
    id: sid,
    title: 'Quality Standards and Performance Targets',
    keyIdea: 'A capped monopoly can protect its profit by cutting quality. Quality standards set the minimum it must deliver; performance targets reward or penalise how well it does.',
    body: [
      { type: 'paragraph', text: 'A price cap has a weakness: the cheapest way to cut costs is often to cut quality. So regulators add two further measures to control monopolies.' },
      { type: 'bullets', items: [
        '**Quality standards**: a minimum level the product must meet, set in law or licence — drinking water within safe limits, electricity at a steady voltage, buses that pass safety checks. Falling below it is a breach, and can be fined.',
        '**Performance targets**: measurable goals, often raised each year, with rewards for beating them and penalties for missing them — trains on time, leaks repaired, calls answered, new homes connected. A firm that misses them may have to compensate customers or accept a lower cap.',
      ] },
      { type: 'paragraph', text: 'Both raise quality and protect choice where consumers cannot switch supplier. Both also raise the firm\'s costs, so price may rise or profit fall, and a target can be gamed: a firm measured on how quickly it answers calls may answer quickly and fix nothing.' },
    ],
    realExample: { emoji: '🚆', text: 'Rail and metro operators in many cities work to published punctuality targets, and operators that miss them can face penalties or have to refund passengers.' },
    misconception: 'Students use the two terms as if they meant the same thing. A standard is a floor the product must not fall below; a target is a level of performance to reach, with a reward or penalty attached.',
    examMatters: '3.3.5 · 1e asks for the impact of each measure. For these two, name the gain in quality and the cost that may show up in price or profit.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each rule into a quality standard or a performance target:',
      groups: [
        { name: 'Quality standard', items: ['Tap water may contain no more than a set level of lead', 'Every electricity meter must be certified accurate', 'Each bus must carry a working fire extinguisher'], why: 'A floor the product must meet at all times; falling below it is a breach.' },
        { name: 'Performance target', items: ['Reduce pipe leakage each year or pay a penalty', 'Earn a bonus for connecting new homes faster than last year', 'Refund passengers when fewer trains than promised run on time'], why: 'A measured level of performance to reach, with a reward or penalty attached.' },
      ],
    }),
  };
})();

const referral = (() => {
  const sid = subId('referral-to-authorities');
  return {
    id: sid,
    title: 'Referral to Regulatory Authorities',
    keyIdea: 'A firm, a market or a deal can be referred to a competition authority, which investigates and can fine firms or order them to change how they behave.',
    body: [
      { type: 'paragraph', text: '**Referral to regulatory authorities** means passing a case to a body with the power to investigate it: a competition authority, such as Hong Kong\'s Competition Commission or the Competition Commission of Pakistan, or a regulator for one industry. A case can be referred by government, by another regulator, or after complaints from customers or rival firms.' },
      { type: 'paragraph', text: 'The authority looks for behaviour that damages competition:' },
      { type: 'bullets', items: [
        '**Cartels**: rivals agreeing to fix prices, share out customers or rig bids, so the market behaves as if one firm ran it.',
        '**Abuse of a dominant position**: a firm with a large market share pricing below cost to drive out a rival and then raising prices (predatory pricing), or refusing to supply retailers that stock a rival (exclusive dealing).',
      ] },
      { type: 'paragraph', text: 'If it finds either, the authority can fine the firms, order the conduct to stop, or require changes to contracts. The threat of referral also deters firms that have not yet been caught. The impact is on price and choice: rivals stay in the market, and consumers keep the lower prices that competition brings.' },
    ],
    realExample: { emoji: '📱', text: 'The Korea Fair Trade Commission fined Google for using its control of Android to stop phone makers adopting rival versions, one of many cases brought by authorities in Asia against digital platforms.' },
    misconception: 'Students say that being dominant is illegal. Competition law allows a firm to win a large share by being better; what it forbids is abusing that position to keep rivals out.',
    examMatters: 'For an Explain (4 marks, Appendix 6) on a competition authority, give the behaviour it investigates and the effect on consumers of stopping it.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each piece of conduct to what a competition authority would call it:',
      pairs: [
        { left: 'Three cement makers secretly agree a common price list', right: 'a cartel', why: 'Rivals acting together to fix prices remove competition between them.' },
        { left: 'The leading airline sells seats below cost on one route until a newcomer quits', right: 'predatory pricing', why: 'Pricing to eliminate a rival, then recovering the losses, abuses dominance.' },
        { left: 'A dominant drinks supplier refuses to deliver to shops that stock a rival brand', right: 'exclusive dealing', why: 'It uses its position to deny a rival access to customers.' },
      ],
      distractors: ['a performance target'],
    }),
  };
})();

const mergerControl = (() => {
  const sid = subId('merger-control');
  return {
    id: sid,
    title: 'Legislation to Control Mergers and Takeovers',
    keyIdea: 'Merger law lets an authority review a deal before or after it happens, and clear it, clear it with conditions, or block it if it would substantially lessen competition.',
    body: [
      { type: 'paragraph', text: '**Legislation to control mergers and takeovers** requires deals above a size threshold to be reviewed by the competition authority. The test most authorities apply is whether the deal would **substantially lessen competition**: fewer rivals, and so higher prices, less choice or lower quality.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Notification', subtitle: 'The firms tell the authority' },
        { title: 'First-phase screening', subtitle: 'Are there obvious concerns?' },
        { title: 'In-depth investigation', subtitle: 'Would competition be substantially lessened?' },
        { title: 'Decision', subtitle: 'Clear, clear with remedies, or block' },
      ] },
      { type: 'paragraph', text: 'Remedies let a deal go ahead on conditions: selling off stores or brands to a rival, or promises about prices and access. The authority weighs the loss of competition against any gains, such as economies of scale that lower costs.' },
    ],
    realExample: { emoji: '🚗', text: 'When Grab bought Uber\'s South-East Asian business, Singapore\'s competition authority found the deal had reduced competition in ride-hailing, fined both firms and imposed conditions to help new rivals enter.' },
    misconception: 'Students assume every merger is harmful. Most are cleared: a merger of firms in different markets, or one that creates real cost savings and leaves strong rivals, may lower prices.',
    examMatters: 'Appendix 6 wants a critical assessment in a Discuss (14 marks). For a merger, weigh the higher prices that fewer rivals allow against the lower costs a larger firm may achieve.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of a merger review in chronological order, from first contact to the ruling:',
      correctOrder: [
        'Both companies send notification of the planned deal',
        'Officials run a quick screening for obvious threats to rivalry',
        'A detailed investigation tests whether rivalry would fall substantially',
        'Clearance, conditions or a ban: the decision is announced',
      ],
      criterion: 'chronological: the order the steps happen in',
      why: [
        'Nothing can be reviewed until the authority is told about the deal.',
        'A short first look decides whether a full inquiry is needed.',
        'Only deals that raise concerns go on to the in-depth test.',
        'The decision comes last, once the evidence is in.',
      ],
    }),
  };
})();

/* ══ Block 2 — Promoting Competition and Contestability (3.3.5 · 1c) ═══════ */

const smallBusinessFdi = (() => {
  const sid = subId('small-business-and-fdi');
  return {
    id: sid,
    title: 'Tax Incentives and Grants for Small Businesses and FDI',
    keyIdea: 'Tax incentives and grants help new small firms start and foreign firms invest, adding rivals to a market and so pushing prices down and widening choice.',
    body: [
      { type: 'paragraph', text: 'Governments use **tax incentives and grants to promote small businesses and FDI** (foreign direct investment, when a firm from abroad sets up or buys a business in the country). Both add rivals to a market, which is how they promote competition.' },
      { type: 'bullets', items: [
        '**Small businesses**: a lower rate of tax on the first slice of profit, start-up grants, and loans the state guarantees, so a new firm can survive its first years.',
        '**FDI**: tax holidays, grants towards a first factory, and land in special economic zones, so a multinational chooses this country.',
      ] },
      { type: 'paragraph', text: 'More firms mean more pressure on price and more choice; a foreign entrant also brings new technology that pushes incumbents to become more efficient. The costs: tax revenue forgone, money spent on firms that would have come anyway, and grants that keep weak firms alive.' },
    ],
    realExample: { emoji: '🏭', text: 'Malaysia, Vietnam and the UAE all offer tax holidays and other incentives in special economic zones to attract foreign manufacturers.' },
    misconception: 'Students count every grant as promoting competition. A grant that keeps one firm alive in a market it already dominates protects that firm; it promotes competition only if it adds rivals.',
    examMatters: 'An Explain (4 marks, Appendix 6) needs the measure and how it adds competition: more firms, so lower prices and more choice.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each measure by who it is aimed at:',
      groups: [
        { name: 'New small firms', items: ['A reduced tax rate on the first slice of a firm\'s earnings', 'A start-up grant for a first workshop', 'A bank loan the state guarantees for a young firm'], why: 'Each lowers the cost of starting and surviving for a new domestic business.' },
        { name: 'Foreign investors', items: ['No profit tax for ten years on a new overseas-owned plant', 'A grant towards a car maker\'s first factory in the country', 'Cheap land in an export zone for an overseas manufacturer'], why: 'Each is designed to win a location decision by a firm based abroad.' },
      ],
    }),
  };
})();

const deregulation = (() => {
  const sid = subId('deregulation');
  return {
    id: sid,
    title: 'Deregulation',
    keyIdea: 'Deregulation removes rules that keep firms out of a market or limit what they may do. Lower barriers to entry let new rivals in, which pushes prices down.',
    body: [
      { type: 'paragraph', text: '**Deregulation** is removing or relaxing rules that restrict competition: a legal monopoly, a cap on the number of licences, controls on the routes or prices firms may offer. Removing them lowers barriers to entry.' },
      { type: 'paragraph', text: 'The market becomes more contestable (topic 3.3.3 covers what makes a market contestable): incumbents know that high prices will draw rivals in, so they keep prices down even before anyone enters. When rivals do enter, price falls, choice widens and incumbents have to cut costs.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Entry rules relaxed', subtitle: 'Licence limit removed' },
        { title: 'New firms enter', subtitle: 'Or threaten to' },
        { title: 'Prices fall, choice widens', subtitle: 'Incumbents cut costs' },
      ] },
      { type: 'paragraph', text: 'Not every rule is a barrier to remove. Some protect safety, so deregulation can lower quality if standards go with the entry rules; new firms may also serve only the profitable routes and leave the rest.' },
    ],
    realExample: { emoji: '✈️', text: 'Opening air routes within South-East Asia to more airlines let low-cost carriers such as AirAsia grow, and fares on many routes fell as they did.' },
    misconception: 'Students treat deregulation and privatisation as the same thing. Deregulation changes the rules on who may compete; privatisation changes who owns a firm. Either can happen without the other.',
    examMatters: '3.3.5 · 1e asks for impacts. For deregulation give price and choice, then the risk to quality where the rules removed were protecting it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the rule change to what travellers get:',
      correctOrder: [
        'Ministers relax the entry rules that capped airline licences',
        'A budget carrier moves to enter the busiest routes',
        'Long-established airlines cut fares to hold on to passengers',
        'Travellers pay less and pick from more flights',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the barrier to entry being removed.',
        'With the barrier gone, a new firm can enter.',
        'The incumbent responds to the new rival by cutting its prices.',
        'The result for consumers: lower prices and more choice.',
      ],
    }),
  };
})();

const privatisation = (() => {
  const sid = subId('privatisation');
  const T = TEL;
  return {
    id: sid,
    title: 'Privatisation',
    keyIdea: 'Privatisation sells a state-owned firm to private owners. The profit motive can cut costs, but on its own it turns a public monopoly into a private one.',
    body: [
      { type: 'paragraph', text: '**Privatisation** is the transfer of a firm from state to private ownership, usually by selling its shares. The case for it: owners who want profit push managers to cut costs, the firm can raise money from investors rather than the government, and the sale raises revenue.' },
      { type: 'paragraph', text: `Take ${'Tellmar'}\'s state telecoms company, the only supplier. Its marginal cost is ${money(T.state.mc)}, and it charges ${money(T.state.P)} a month to ${T.state.Q} million subscribers. Privatised, it cuts marginal cost to ${money(T.privat.mc)} — but it is still the only supplier, so it sets MR = MC again and charges ${money(T.privat.P)} to ${T.privat.Q} million. The lower costs mostly become profit.` },
      { type: 'paragraph', text: `The big change comes from competition. If the market is also opened to rival networks, price is driven down towards marginal cost: ${money(T.open.P)}, with ${T.open.Q} million subscribers. So privatisation promotes competition only when it comes with deregulation, or with regulation of a firm that remains a natural monopoly.` },
    ],
    realExample: { emoji: '📞', text: 'Many countries sold their state telephone companies and then licensed rival mobile networks; the fall in call prices came with the rivals.' },
    misconception: 'Students write that privatisation always improves efficiency. A private monopoly may cut costs but keep prices high, and a natural monopoly sold without a regulator is simply a private monopoly.',
    examMatters: 'An Evaluate on privatisation carries 20 marks (Appendix 6). Judge it on price, profit, efficiency, quality and choice, and say what it depends on: whether competition or regulation comes with it.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each reform into privatisation or deregulation:',
      groups: [
        { name: 'Privatisation', items: ['Shares in the national airline are sold on the stock exchange', 'The state power company is sold to a private buyer', 'The government port operator is floated to investors'], why: 'Each changes who OWNS the firm, from the state to private shareholders.' },
        { name: 'Deregulation', items: ['The legal ban on private bus companies is lifted', 'Licences to run mobile networks are opened to newcomers', 'Controls on domestic air fares are abolished'], why: 'Each removes a RULE that restricted entry or conduct; ownership is untouched.' },
      ],
    }),
  };
})();

const tendering = (() => {
  const sid = subId('competitive-tendering');
  return {
    id: sid,
    title: 'Competitive Tendering for Public Sector Contracts',
    keyIdea: 'Competitive tendering invites private firms to bid to supply a public service. Firms compete for the contract, even where only one can supply the service.',
    body: [
      { type: 'paragraph', text: '**Competitive tendering for public sector contracts** means the government or a city sets out the service it wants — rubbish collection, school meals, a new road, a bus route — and invites firms to bid. The contract goes to the bid that offers the best value against the specification.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Service specified', subtitle: 'What, where, to what standard' },
        { title: 'Contractors submit offers', subtitle: 'Sealed bids' },
        { title: 'Cheapest compliant offer chosen', subtitle: 'Best value wins' },
        { title: 'Contract runs, with penalties', subtitle: 'For poor service' },
      ] },
      { type: 'paragraph', text: 'Only one firm may run the service, but several compete to be that firm: competition **for** the market rather than **in** it. The bidding drives the cost to the taxpayer down, and the in-house provider, if it bids, has to become as efficient as the private bidders.' },
      { type: 'paragraph', text: 'The risks are on quality and honesty. A firm may win with a low bid and then cut corners, so contracts need penalties for poor service. Bidders may collude and rig the bids. And a contract long enough to justify investment is also long enough for the winner to become the only credible bidder next time.' },
    ],
    realExample: { emoji: '🚌', text: 'Singapore contracts its bus routes out by tender: the state owns the buses, a public council sets the fares, and operators bid to run packages of routes.' },
    misconception: 'Students say tendering privatises the service. Ownership and control can stay with the state; what changes is that the right to supply is won by competing for it.',
    examMatters: 'For an Explain (4 marks, Appendix 6), give the mechanism, competition for the market, and one effect on cost or quality.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps of a tender in chronological order, from the council\'s plan to the service running:',
      correctOrder: [
        'Council officers define exactly which refuse service is needed',
        'Private contractors send in sealed offers',
        'Whichever offer meets every requirement at least cost wins',
        'Winners collect the rubbish, paying penalties for missed rounds',
      ],
      criterion: 'chronological: the order the steps happen in',
      why: [
        'A tender starts with the buyer defining what it wants.',
        'Firms can only bid once they know the specification.',
        'The bids are compared against the specification and one wins.',
        'The contract then governs the service, with penalties for failure.',
      ],
    }),
  };
})();

const tradeLiberalisation = (() => {
  const sid = subId('trade-liberalisation');
  return {
    id: sid,
    title: 'Trade Liberalisation',
    keyIdea: 'Trade liberalisation cuts tariffs, quotas and other barriers to imports, so domestic firms face foreign rivals: prices fall and choice widens, but high-cost firms may close.',
    body: [
      { type: 'paragraph', text: '**Trade liberalisation** is the removal or reduction of barriers to trade: tariffs on imports, quotas that limit how much may come in, and rules that favour domestic suppliers. It promotes competition by letting foreign firms sell into the market.' },
      { type: 'bullets', items: [
        '**Price and choice**: imports add supply and new products, so prices fall and consumers can pick from more brands.',
        '**Efficiency**: domestic firms must match their foreign rivals\' costs and quality or lose customers.',
        '**Profit and jobs**: firms that cannot compete lose profit and may close, and their workers may be unemployed for some time.',
      ] },
      { type: 'paragraph', text: 'That last point is why governments often liberalise gradually, and why the next chapter looks at the opposite measure: barriers to entry of foreign firms.' },
    ],
    realExample: { emoji: '🌏', text: 'Members of the ASEAN Free Trade Area removed most tariffs on goods traded among themselves, opening each member\'s market to firms from the others.' },
    misconception: 'Students assume everyone in the country gains from freer trade. Consumers and exporters usually do; firms and workers in industries that cannot compete with imports lose.',
    examMatters: 'An Analyse (6 marks, Appendix 6) needs linked stages: lower barriers, more imports, lower prices, pressure on domestic costs.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what happens when a country cuts its import barriers on televisions:',
      template: [
        'Removing the tax on imported television sets lowers the ___ that shoppers pay.',
        'Overseas brands arriving on the shelves widen consumers\' ___.',
        'Local set makers that cannot match the newcomers\' costs may be forced to ___.',
      ],
      answers: ['price', 'choice', 'close'],
      hints: ['what a buyer hands over at the till', 'the range of options open to a buyer', 'shut down for good'],
      distractors: ['quota', 'wage', 'export'],
    }),
  };
})();

/* ══ Block 3 — Protecting Suppliers and Employees (3.3.5 · 1d) ═════════════ */

const localSourcing = (() => {
  const sid = subId('local-sourcing');
  return {
    id: sid,
    title: 'Local Sourcing of Raw Materials and Components',
    keyIdea: 'Local sourcing rules make firms buy a share of their inputs from domestic suppliers. Local suppliers and their workers gain; the firms\' costs, and often prices, rise.',
    body: [
      { type: 'paragraph', text: '**Local sourcing of raw materials and components** is often required by local-content rules: a car assembler must buy a set share of its parts from domestic suppliers, or an oil company must hire local contractors and staff.' },
      { type: 'paragraph', text: 'The aim is to protect suppliers and employees: domestic parts makers win orders they would lose to cheaper imports, their workers keep their jobs, and skills build up in the country.' },
      { type: 'bullets', items: [
        '**Price and profit**: if local inputs cost more, the firm\'s costs rise, so it raises its price, accepts lower profit, or both.',
        '**Efficiency and quality**: protected suppliers face less pressure to improve, so costs can stay high and quality low.',
        '**Choice**: foreign investors may go elsewhere if the rule is strict.',
      ] },
    ],
    realExample: { emoji: '🛢️', text: 'Nigeria\'s oil and gas industry works under local-content rules that require companies to use Nigerian firms and workers for a share of their contracts and jobs.' },
    misconception: 'Students treat local sourcing as good for the whole economy because it creates jobs. It moves jobs to protected suppliers, and the higher input costs are paid by the firm, its customers or both.',
    examMatters: 'For 3.3.5 · 1e, name who gains (domestic suppliers and their workers) and who pays (the buying firm and its customers), then judge the balance.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A country makes car assemblers buy half their parts at home. Sort each group by whether it is likely to gain or lose:',
      groups: [
        { name: 'Likely to gain', items: ['A domestic maker of car seats', 'Workers at a local tyre factory', 'A home-grown firm making wiring looms'], why: 'Each supplies inputs the rule forces assemblers to buy locally.' },
        { name: 'Likely to lose', items: ['People buying the finished cars', 'The assembler\'s shareholders', 'An overseas parts supplier'], why: 'Each pays for, or loses orders because of, the higher cost of local inputs.' },
      ],
    }),
  };
})();

const employmentLegislation = (() => {
  const sid = subId('employment-legislation');
  return {
    id: sid,
    title: 'Employment Legislation to Protect Workers From Exploitation',
    keyIdea: 'Employment legislation sets minimum terms firms must give workers — hours, safety, contracts, prompt pay — to protect them from exploitation where they have little power.',
    body: [
      { type: 'paragraph', text: '**Employment legislation to protect workers from exploitation** sets rules every employer must follow. **Exploitation** means treating workers in ways they accept only because they have no real alternative: pay withheld, unsafe conditions, excessive hours, or being unable to leave.' },
      { type: 'bullets', items: [
        'Limits on working hours and a right to rest days.',
        'Health and safety standards, with inspections.',
        'A written contract, and wages paid in full and on time.',
        'Bans on child labour and on employers holding workers\' passports.',
      ] },
      { type: 'paragraph', text: 'The case is strongest where workers have least bargaining power: migrant workers tied to one employer, domestic workers, workers in towns with one large employer. The impact: better conditions and often higher productivity, but higher labour costs, so firms may raise prices, hire fewer workers, or move work into the informal economy where the law does not reach.' },
    ],
    realExample: { emoji: '🏠', text: 'Hong Kong\'s employment law gives foreign domestic helpers rest days and other protections, and the government sets a minimum wage they must be paid.' },
    misconception: 'Students think employment law only helps workers. It also costs firms, and if the cost is high relative to what workers produce, some jobs are lost or move into the informal economy.',
    examMatters: 'This is 3.3.5 · 1d. Chapter 6 covers exploitation again as a labour-market measure; here the angle is protecting employees from the firms that employ them.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each employment rule to the harm it guards against:',
      pairs: [
        { left: 'A legal limit on weekly working hours', right: 'being worked to exhaustion', why: 'Capping hours stops an employer demanding unlimited time.' },
        { left: 'Wages must be paid in full within a set number of days', right: 'pay held back to stop staff leaving', why: 'Withheld wages trap workers; prompt payment removes the lever.' },
        { left: 'Employers may not keep a worker\'s passport', right: 'being unable to quit and go home', why: 'Holding documents stops a worker leaving; the ban restores the choice.' },
        { left: 'Hard hats and harnesses required on building sites', right: 'injury at work', why: 'Safety standards protect workers from preventable accidents.' },
      ],
    }),
  };
})();

const foreignEntry = (() => {
  const sid = subId('foreign-entry-barriers');
  const C = CEM;
  return {
    id: sid,
    title: 'Barriers to Entry of Foreign Firms',
    keyIdea: 'Barriers to entry of foreign firms protect domestic suppliers and their workers from overseas rivals. Consumers pay for it in higher prices and less choice.',
    body: [
      { type: 'paragraph', text: '**Barriers to entry of foreign firms** include caps on foreign ownership, licences granted only to domestic firms, sectors such as retail or banking reserved for local businesses, and tariffs or quotas on imports.' },
      { type: 'paragraph', text: `Take ${'Tellmar'}\'s cement market. With foreign suppliers allowed, the price is ${money(C.open.P)} a bag and ${k(C.open.Q)} bags a day are bought, ${k(C.open.home)} of them from domestic firms. Bar the foreign suppliers and supply shifts left: the price rises to ${money(C.shut.P)}, sales fall to ${k(C.shut.Q)} bags, and every one is domestic.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Foreign suppliers refused licences', subtitle: 'Only domestic firms may sell' },
        { title: 'Market supply shifts left', subtitle: 'Less offered at each price' },
        { title: 'Price rises', subtitle: 'Consumers buy less' },
      ] },
      { type: 'bullets', items: [
        `**Suppliers and employees**: domestic sales rise from ${k(C.open.home)} to ${k(C.shut.home)} bags a day, so profit and jobs at home rise.`,
        '**Consumers**: they pay more, buy less and lose the foreign brands.',
        '**Efficiency**: protected firms face less pressure to cut costs.',
      ] },
    ],
    realExample: { emoji: '🛒', text: 'India has long restricted foreign supermarket chains from selling directly to shoppers, partly to protect millions of small shops and their suppliers.' },
    misconception: 'Students say protection saves jobs at no cost. The jobs protected are paid for by consumers through higher prices, and by firms that use the protected product as an input.',
    examMatters: 'For an Analyse (6 marks, Appendix 6), draw the supply shift and read off both the higher price and the larger domestic output.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the licence decision to the domestic firms:',
      correctOrder: [
        'Overseas cement makers are refused licences to sell here',
        'Fewer bags are on offer at each possible price',
        'Builders face a higher price for every bag',
        'Home producers sell extra bags and take on more staff',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the barrier keeping foreign firms out.',
        'Without their output, market supply shifts left.',
        'Less supply at each price raises the equilibrium price.',
        'At the higher price domestic firms supply more and need more workers.',
      ],
    }),
  };
})();

const monopsonyRestrictions = (() => {
  const sid = subId('monopsony-restrictions');
  return {
    id: sid,
    title: 'Restrictions on the Monopsony Power of Firms',
    keyIdea: 'A firm that dominates buying can push down what it pays suppliers and workers. Restrictions on monopsony power limit how it uses that power.',
    body: [
      { type: 'paragraph', text: 'A firm with **monopsony power** is a dominant buyer: a supermarket chain buying from farmers, a processor buying a crop, or the one large employer in a town. Topic 3.3.3 shows how such a buyer pays less and buys less than a competitive market would.' },
      { type: 'paragraph', text: '**Restrictions on the monopsony power of firms** protect the suppliers and employees on the other side:' },
      { type: 'bullets', items: [
        'Codes of conduct for large buyers: no cutting an agreed price after delivery, no charging suppliers for shelf space.',
        'Prompt-payment laws, so large buyers cannot hold on to small suppliers\' money.',
        'Minimum prices paid to farmers, and a minimum wage for workers (chapter 5 shows its effect where one employer dominates).',
        'Blocking mergers between buyers, and allowing suppliers to bargain together through cooperatives.',
      ] },
      { type: 'paragraph', text: 'The impact: suppliers\' prices and profits rise, the buyer\'s profit falls, and consumer prices may rise a little. Set well, a floor can even raise the quantity bought.' },
    ],
    realExample: { emoji: '🌾', text: 'Several governments set minimum prices that processors must pay smallholder farmers for crops such as rice or sugar cane, because each farmer has almost no power to bargain with a large buyer.' },
    misconception: 'Students confuse monopsony with monopoly. A monopolist is a dominant SELLER and charges consumers too much; a monopsonist is a dominant BUYER and pays suppliers or workers too little.',
    examMatters: 'For 3.3.5 · 1d, make clear that the power being restricted is the firm\'s power as a buyer, and name the supplier or worker it protects.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each measure by whose power it restricts:',
      groups: [
        { name: 'A powerful buyer', items: ['A code stopping supermarkets cutting agreed prices after delivery', 'A law making large buyers pay small suppliers within thirty days', 'A floor on what mills may offer growers for their paddy'], why: 'Each protects the SELLERS to a dominant buyer: monopsony power.' },
        { name: 'A powerful seller', items: ['A cap on what the water network may charge households', 'A fine on a dominant firm for pricing below cost', 'Blocking a merger of the two largest mobile networks'], why: 'Each protects the BUYERS from a dominant seller: monopoly power.' },
      ],
    }),
  };
})();

const nationalisation = (() => {
  const sid = subId('nationalisation');
  return {
    id: sid,
    title: 'Nationalisation',
    keyIdea: 'Nationalisation moves a firm into state ownership, to protect its employees and suppliers or run it for social aims. Without competition or shareholders, costs can drift up.',
    body: [
      { type: 'paragraph', text: '**Nationalisation** is the transfer of a firm or industry from private to state ownership. It is the reverse of privatisation, and it protects suppliers and employees in two ways.' },
      { type: 'bullets', items: [
        '**Rescue**: when a firm the economy depends on — a national airline, a large bank — is about to fail, the state buys it to keep its jobs, its suppliers\' orders and its service going.',
        '**Social aims**: a state-owned network can charge remote villages the same as cities, paying for it from city customers (cross-subsidy), and invest for the long term.',
      ] },
      { type: 'paragraph', text: 'The costs are on efficiency. With no shareholders pressing for profit and often no rivals, a state firm has less reason to control costs, so costs can drift above the minimum: X-inefficiency. Prices may be kept low for political reasons, leaving losses that taxpayers cover, and investment competes with every other claim on the government\'s budget.' },
    ],
    realExample: { emoji: '✈️', text: 'Governments in several countries have taken failing national airlines or banks into public ownership, rather than let them collapse and take suppliers and jobs with them.' },
    misconception: 'Students say nationalisation makes a firm inefficient. It removes the profit pressure; whether costs rise depends on how the firm is managed and whether it still faces competition.',
    examMatters: 'For 3.3.5 · 1d, weigh the protection of jobs and suppliers against the cost to taxpayers and the risk to efficiency.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what follows when the state takes over a failing firm:',
      template: [
        'Buying the collapsing national airline moves its ownership from shareholders to the ___.',
        'A state network charging far-off villages the city rate, paid for by city users, is running a cross-___.',
        'Losses the state-owned firm runs up are met in the end by ___.',
      ],
      answers: ['government', 'subsidy', 'taxpayers'],
      hints: ['the public sector', 'support paid from one group to another', 'those who fund the budget'],
      distractors: ['shareholders', 'consumers', 'dividend'],
    }),
  };
})();

/* ══ Block 4 — The Impact and Limits of Intervention (3.3.5 · 1e, 1f) ═════ */

const impactOfMeasures = (() => {
  const sid = subId('impact-of-measures');
  return {
    id: sid,
    title: 'The Impact of Each Measure on Price, Profit, Efficiency, Quality and Choice',
    keyIdea: 'Every measure in chapters 1 to 3 is judged by the same five tests: its impact on price, profit, efficiency, quality and choice. Most help on some and cost on others.',
    body: [
      { type: 'paragraph', text: 'The specification asks for **the impact of each measure** on five things. Use them as the checklist for any intervention:' },
      { type: 'bullets', items: [
        '**Price**: caps, deregulation, tendering and trade liberalisation push it down; local sourcing, barriers to foreign firms and quality standards push it up.',
        '**Profit**: caps and competition squeeze excess profit; protection raises domestic firms\' profit; nationalised firms may make losses.',
        '**Efficiency**: CPI − X caps, competition and tendering reward cost cutting; profit regulation, protection and nationalisation can weaken it.',
        '**Quality**: standards and targets raise it; caps and low tender bids can cut it.',
        '**Choice**: entry, FDI and liberalisation widen it; barriers to foreign firms and local sourcing narrow it.',
      ] },
      { type: 'paragraph', text: 'A strong answer runs one measure through all five and then weighs them: a price cap may lower price and raise efficiency while cutting quality, and which matters most depends on the market.' },
    ],
    realExample: { emoji: '⚖️', text: 'When a city tenders its bus routes, fares may fall and costs drop, but the city must still set service standards, or the cheapest bid may run old buses on thin timetables.' },
    misconception: 'Students judge a measure on price alone. The specification names five impacts, and a measure that lowers price can still cut quality or choice.',
    examMatters: '3.3.5 · 1e names price, profit, efficiency, quality and choice. In a 20-mark Evaluate (Appendix 6), the evaluation is in weighing them against each other.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each measure by its most likely effect on the price consumers pay:',
      groups: [
        { name: 'Likely to lower price', items: ['A CPI − X cap on a gas network', 'Cutting tariffs on imported phones', 'Letting new airlines fly domestic routes'], why: 'Each limits price directly or adds competition that drives it down.' },
        { name: 'Likely to raise price', items: ['Keeping overseas cement makers out', 'A rule to buy car parts from local makers', 'Stricter purity rules for tap water'], why: 'Each raises the cost of supplying the product or removes cheaper suppliers.' },
      ],
    }),
  };
})();

const regulatoryCapture = (() => {
  const sid = subId('regulatory-capture');
  return {
    id: sid,
    title: 'Regulatory Capture',
    keyIdea: 'Regulatory capture is when a regulator comes to act in the interest of the firms it regulates rather than the consumers it was set up to protect.',
    body: [
      { type: 'paragraph', text: '**Regulatory capture** is the first limit to government intervention: the regulator ends up serving the industry. It happens gradually, and usually without anyone being bribed.' },
      { type: 'bullets', items: [
        'The regulator relies on the firms for information and expertise, so it comes to see costs their way.',
        'Staff move between the regulator and the industry, and may hope for a job there later.',
        'The firms lobby far harder than scattered consumers can.',
      ] },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Regulator relies on the industry', subtitle: 'For data, staff and expertise' },
        { title: 'Its judgement shifts', subtitle: 'Towards the firms\' view' },
        { title: 'Price limit set too high', subtitle: 'Consumers pay more' },
      ] },
      { type: 'paragraph', text: 'The result is lenient caps, weak enforcement and rules that keep new rivals out, so prices stay high and incumbents stay protected. Defences: an independent regulator with fixed-term appointments, published decisions, limits on staff moving to the industry, and consumer representatives on its board.' },
    ],
    realExample: { emoji: '🏛️', text: 'Reviews of financial crises in several countries have concluded that regulators had grown too close to the banks they supervised and accepted the banks\' own view of the risks.' },
    misconception: 'Students describe regulatory capture as bribery. Most capture is quieter: dependence on the industry\'s information and people slowly shifts what the regulator thinks is reasonable.',
    examMatters: 'For an Examine (8 marks, Appendix 6) on the limits of regulation, explain how capture happens, then judge how far safeguards such as independence reduce it.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the regulator\'s staffing to what households pay:',
      correctOrder: [
        'Watchdog staff are mostly recruited from the industry it oversees',
        'Its reviews come to share the firms\' view of which costs are reasonable',
        'A price limit ends up looser than genuine costs justify',
        'Households keep paying more than an efficient network would charge',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the regulator depending on industry people.',
        'Shared backgrounds shift its judgement towards the industry.',
        'So the cap it sets is too generous to the firms.',
        'Consumers bear the cost in higher prices.',
      ],
    }),
  };
})();

const informationGaps = (() => {
  const sid = subId('information-gaps');
  const N = NAT;
  return {
    id: sid,
    title: 'Asymmetric Information and Information Gaps',
    keyIdea: 'A regulated firm knows its own costs better than its regulator. With asymmetric information, the firm can overstate costs and win a cap that barely restrains it.',
    body: [
      { type: 'paragraph', text: '**Asymmetric information** is when one side knows more than the other. A regulated firm knows its costs, its demand and how much it could save far better than the regulator, and it gains by overstating its costs.' },
      { type: 'paragraph', text: `Go back to the water network. Its true average cost gives a cap of ${money(N.avg.P)}. If it persuades the regulator that each unit costs ${money(N.padding)} more than it does, the cap set on those claimed costs is ${money(N.claimed.P)} — the same price it would charge unregulated — and it earns ${money(N.claimed.profit)} thousand a day of profit above normal.` },
      { type: 'paragraph', text: 'Information gaps limit other measures too: a government setting a minimum wage cannot see exactly where equilibrium lies, and one giving grants cannot tell which firms would have started anyway. Regulators narrow the gap by **benchmarking**: comparing the firm\'s costs with those of similar firms elsewhere.' },
    ],
    realExample: { emoji: '📊', text: 'Energy and water regulators commonly compare each network company\'s costs with those of others doing similar work, so no company can simply assert what its costs are.' },
    misconception: 'Students think a regulator can set the right cap by asking the firm for its costs. The firm has every reason to overstate them, which is why the information gap limits regulation.',
    examMatters: 'For 3.3.5 · 1f, name the gap (who knows what the other does not) and show what it does to the cap or policy that results.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete why a regulator can struggle to set a good cap:',
      template: [
        'The utility knows its own running costs far better than the official setting its limit: the information is ___.',
        'By claiming each unit costs more to supply, it can win a limit that is too ___.',
        'Comparing its costs with similar utilities abroad is a method called ___.',
      ],
      answers: ['asymmetric', 'high', 'benchmarking'],
      hints: ['held unevenly by the two sides', 'more generous than it should be', 'measuring against comparable firms'],
      distractors: ['symmetric', 'low', 'tendering'],
    }),
  };
})();

const resourcesAndPower = (() => {
  const sid = subId('resources-and-power');
  return {
    id: sid,
    title: 'Inadequate Resources and Lack of Regulatory Power',
    keyIdea: 'A regulator needs enough money and staff to investigate, and enough legal power to act. Without both, rules exist on paper but are not enforced.',
    body: [
      { type: 'paragraph', text: 'The last two limits to government intervention are about capacity.' },
      { type: 'bullets', items: [
        '**Inadequate resources**: a competition authority with a small budget and few economists and lawyers cannot investigate complex markets, so cases take years and many are never opened. Labour inspectors too few to visit every workplace cannot enforce a minimum wage.',
        '**Lack of regulatory power**: the law may cap fines below what the firms gain from breaking it, give no right to demand documents, or allow no power to break a firm up. A multinational platform may take its key decisions outside the country\'s reach.',
      ] },
      { type: 'paragraph', text: 'Either way, firms learn that breaking the rules pays, and the intervention has little impact on price, profit or quality. Governments respond with larger budgets, higher maximum fines, and cooperation between authorities in different countries.' },
    ],
    realExample: { emoji: '🔎', text: 'Competition authorities in smaller economies often share information with those in neighbouring countries, because a single cartel or platform can operate across all of them.' },
    misconception: 'Students treat any failed regulation as regulatory capture. A regulator can be entirely independent and still fail because it lacks the staff or the legal power to act.',
    examMatters: '3.3.5 · 1f names four limits. In an Examine, choose two, show each at work, and judge which is harder to fix.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each weakness into the limit it illustrates:',
      groups: [
        { name: 'Inadequate resources', items: ['Only a handful of economists to review hundreds of deals', 'A backlog means cases take years to decide', 'A single officer covers two hundred garment workshops'], why: 'The authority has the power to act but not the money or people to use it.' },
        { name: 'Lack of regulatory power', items: ['The largest fine allowed is less than a month of the cartel\'s gains', 'The law gives no right to see the firm\'s accounts', 'A global platform decides its policies outside the country\'s jurisdiction'], why: 'However well staffed, the authority cannot legally do enough.' },
      ],
    }),
  };
})();

/* ══ Block 5 — Wage Controls in Labour Markets (3.3.5 · 2a, 2b) ═══════════ */

const labourCase = (() => {
  const sid = subId('labour-case');
  return {
    id: sid,
    title: 'The Case for Government Intervention in Labour Markets',
    keyIdea: 'Labour markets can leave workers stuck, underpaid or treated unequally. Government intervenes on efficiency and equity grounds, through wages, taxes, mobility and the law.',
    body: [
      { type: 'paragraph', text: 'The **case for government intervention** in labour markets has two strands.' },
      { type: 'bullets', items: [
        '**Efficiency**: workers who cannot move to where jobs are, or cannot switch to jobs with shortages, leave unemployment beside vacancies (topic 3.3.4 covers immobility as a market failure); a dominant employer hires too few and pays too little.',
        '**Equity**: full-time work may still pay too little to live on; some groups are paid or hired less for reasons unrelated to their work; pay at the top may be judged excessive.',
      ] },
      { type: 'paragraph', text: 'The types of intervention the specification names follow from these: **maximum and minimum wage controls**, **direct taxes** on employment and profits, **measures to reduce immobility**, and **measures to reduce discrimination and exploitation**. Each has effects on wages and employment, and each can fail for the reasons in chapter 4.' },
    ],
    realExample: { emoji: '🧾', text: 'Malaysia, Pakistan, Kenya and Hong Kong all set legal minimum wages, while Singapore sets wage floors by sector for jobs such as cleaning and security.' },
    misconception: 'Students argue for labour-market intervention on fairness alone. The specification\'s case also rests on efficiency: immobility and employer power waste labour the economy could use.',
    examMatters: 'For a 20-mark Evaluate (Appendix 6) on labour-market policy, open with which failure the measure corrects — efficiency or equity — so the judgement has something to test it against.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each labour-market problem to the intervention aimed at it:',
      pairs: [
        { left: 'Coal-region workers idle while city firms cannot fill posts', right: 'help with the cost of moving', why: 'The barrier is getting to where the jobs are.' },
        { left: 'The town\'s one big employer holds pay down', right: 'a legal wage floor', why: 'A floor limits a dominant employer\'s power over pay.' },
        { left: 'Equal work paid less because of the worker\'s ethnicity', right: 'an anti-discrimination law', why: 'The pay gap is unrelated to the work, so the law targets the reason.' },
        { left: 'Executive pay at a state firm soaring above staff pay', right: 'a cap on the top salary', why: 'A maximum wage limits pay at the top directly.' },
      ],
    }),
  };
})();

const minimumWageCompetitive = (() => {
  const sid = subId('minimum-wage-competitive');
  const L = LAB;
  return {
    id: sid,
    title: 'Minimum Wage Controls in a Competitive Labour Market',
    keyIdea: 'A minimum wage set above the equilibrium wage raises pay for those in work, but firms hire fewer and more people want jobs, leaving a surplus of labour.',
    body: [
      { type: 'paragraph', text: `**Minimum wage controls** set a legal floor on the wage. Start with a competitive market for warehouse workers, many employers and many workers: demand L = ${L.dA} − ${L.dB}W and supply L = ${L.sB}W − ${-L.sA} meet at ${hr(L.eq.W)} and ${k(L.eq.L)} jobs.` },
      { type: 'paragraph', text: `A floor of ${hr(L.minW)} is above equilibrium, so it binds. Firms move up their demand curve and employ ${k(L.minHired)}; ${k(L.minWilling)} people now want the work. The surplus of labour is ${k(L.minSurplus)}: ${k(L.minLost)} who lost jobs and ${k(L.minWilling - L.eq.L)} drawn in by the higher pay. A floor below ${hr(L.eq.W)} would change nothing.` },
      { type: 'bullets', items: [
        '**Gains**: higher pay and less poverty for those who keep their jobs; more spending; firms may train and motivate staff better.',
        '**Costs**: unemployment among the least skilled; higher costs, so higher prices or lower profit; work may move into the informal economy.',
        '**How many jobs go** depends on the elasticity of demand for labour: few where labour is hard to replace and a small share of costs.',
      ] },
    ],
    realExample: { emoji: '📦', text: 'Hong Kong\'s statutory minimum wage is reviewed regularly by a commission that weighs higher pay for low earners against the risk to jobs in small shops and restaurants.' },
    misconception: 'Students say a minimum wage always causes unemployment. It does only if set above the equilibrium wage in a competitive market, and chapter 5\'s next step shows a market where it can raise employment.',
    examMatters: 'Appendix 6 gives Draw 4 marks. Label the wage and quantity of labour axes, draw the floor above equilibrium, and mark the quantity hired and the quantity willing.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A cleaning market clears with 50 thousand employed at $8 an hour. A floor of $10 is set. Complete:',
      template: [
        'At the floor, firms want 44 thousand cleaners and 58 thousand want the work: a surplus of ___ thousand.',
        'Compared with before, the number of cleaners in work falls by ___ thousand.',
        'The fall in jobs is smaller where the demand for cleaners is wage-___.',
      ],
      answers: ['14', '6', 'inelastic'],
      hints: ['those willing less those hired', 'the old level less the new level', 'unresponsive to the wage'],
      distractors: ['8', '12', 'elastic'],
    }),
  };
})();

const minimumWageMonopsony = (() => {
  const sid = subId('minimum-wage-monopsony');
  const M = MON;
  return {
    id: sid,
    title: 'Minimum Wages Where One Employer Dominates',
    keyIdea: 'Where one employer dominates, it hires too few to keep the wage down. A minimum wage set between its wage and the competitive wage can raise pay AND employment.',
    body: [
      { type: 'paragraph', text: `Now the exception. In a town where one firm is the main employer, it knows that hiring more means raising the wage for everyone, so it hires fewer: ${k(M.mono.L)} workers at ${hr(M.mono.W)}. With many employers, the same workers would earn ${hr(M.comp.W)} and ${k(M.comp.L)} would be employed. Topic 3.3.3 draws this with the marginal cost of labour (MCL) and the marginal revenue product (MRP), the value of what each extra worker adds.` },
      { type: 'paragraph', text: `Set a minimum wage of ${hr(M.floor)}. Up to the ${k(M.offered)} workers willing to work at that wage, hiring one more no longer raises anyone else's pay, so each extra worker costs just ${money(M.floor)}. The firm now hires all ${k(M.withFloor.L)}. **Both the wage and employment rise**: from ${hr(M.mono.W)} to ${hr(M.floor)}, and from ${k(M.mono.L)} to ${k(M.withFloor.L)}.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Floor applies to everyone', subtitle: `${money(M.floor)} an hour` },
        { title: 'Hiring no longer raises pay', subtitle: 'For those already employed' },
        { title: 'Employment rises', subtitle: `${k(M.mono.L)} to ${k(M.withFloor.L)}` },
      ] },
      { type: 'paragraph', text: `This works only for a floor between the monopsony wage and the competitive wage, or a little above it. Above ${hr(M.comp.W)}, employment falls below the competitive level; above ${money(M.highFloor)}, below even the ${k(M.mono.L)} the firm hired unregulated.` },
    ],
    realExample: { emoji: '🏭', text: 'Plantation and mining towns where one company employs most people are the classic case: a wage floor there can raise pay without cutting jobs.' },
    misconception: 'Students conclude that a minimum wage always raises employment where there is a monopsony. Only a floor in the right range does; set too high, it cuts jobs here too.',
    examMatters: 'In a 20-mark Evaluate on the minimum wage (Appendix 6), the market structure is the judgement: competitive markets lose jobs, dominated ones may gain them.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the new law to the hiring decision:',
      correctOrder: [
        'The town\'s dominant employer must now pay every worker the legal floor',
        'Taking on one more person no longer pushes up anyone else\'s wage',
        'Adding a recruit raises the wage bill by the floor alone',
        'Its workforce grows beyond what it hired before the law',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the floor applying to everyone.',
        'Everyone is already paid the floor, so hiring does not raise their pay.',
        'The cost of an extra worker falls to the floor.',
        'With extra workers cheaper to add, the firm employs more.',
      ],
    }),
  };
})();

const maximumWage = (() => {
  const sid = subId('maximum-wage');
  const T = TOP;
  return {
    id: sid,
    title: 'Maximum Wage Controls',
    keyIdea: 'A maximum wage caps pay. Set below the equilibrium wage, it leaves firms wanting more workers than are willing, and pay leaks out in other forms.',
    body: [
      { type: 'paragraph', text: '**Maximum wage controls** set a legal ceiling on pay: caps on executive pay at state-owned firms, limits on bankers\' bonuses, pay caps across the public sector. The aims are to reduce inequality, hold down public spending, or curb risk-taking rewarded by large bonuses.' },
      { type: 'paragraph', text: `Take senior managers in one industry: the market clears at ${hr(T.eq.W)} with ${h(T.eq.L)} employed. A cap of ${hr(T.cap)} binds. Only ${h(T.willing)} are willing to work at that pay, while firms want ${h(T.wanted)}: a shortage of ${h(T.shortage)}, and employment falls to ${h(T.willing)}. A cap above ${hr(T.eq.W)} would change nothing.` },
      { type: 'bullets', items: [
        '**Shortages and emigration**: the most mobile managers move to firms or countries without a cap.',
        '**Evasion**: pay is shifted into benefits in kind — housing, cars, shares, allowances — that the cap does not cover.',
        '**Incentives**: less reward for taking on responsibility.',
      ] },
    ],
    realExample: { emoji: '🏦', text: 'The European Union limits bankers\' bonuses relative to their fixed pay, and some governments cap the salaries of executives at state-owned companies.' },
    misconception: 'Students expect a maximum wage to cut pay at the top and change nothing else. A binding cap also cuts the number willing to do the job, and firms find other ways to pay them.',
    examMatters: 'For an Explain (4 marks, Appendix 6), give the shortage the cap creates and one way firms respond: evasion or losing staff abroad.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A market for hospital consultants clears at $110 an hour. Complete what a cap does:',
      template: [
        'Capping pay at $90 leaves hospitals wanting more consultants than are ___ to work.',
        'Had the cap been set at $130 instead, it would have made ___ difference.',
        'The most mobile consultants may respond by taking posts ___, beyond the reach of the cap.',
      ],
      answers: ['willing', 'no', 'abroad'],
      hints: ['prepared to take the job at that pay', 'none whatsoever', 'in another country'],
      distractors: ['able', 'more', 'public'],
    }),
  };
})();

/* ══ Block 6 — Taxes, Mobility and Fair Treatment (3.3.5 · 2b) ════════════ */

const directTaxes = (() => {
  const sid = subId('direct-taxes');
  const L = LAB;
  return {
    id: sid,
    title: 'Direct Taxes: National Insurance Contributions and Corporation Tax',
    keyIdea: 'A tax on employment raises the cost of each worker or cuts take-home pay, so employment falls. A tax on profits affects labour through investment.',
    body: [
      { type: 'paragraph', text: '**Direct taxes** such as **national insurance contributions** and **corporation tax** change the labour market through what they tax. National insurance contributions, the specification\'s example, are a tax on earnings paid by employers and employees; many countries charge a similar social security contribution.' },
      { type: 'paragraph', text: `**An employer contribution** raises the cost of every worker. In the warehouse market, ${money(L.tax)} an hour on each worker shifts demand for labour down by ${money(L.tax)}: the wage workers receive falls from ${hr(L.eq.W)} to ${hr(L.taxed.W)}, firms pay ${hr(L.firmPays)} in total, and employment falls from ${k(L.eq.L)} to ${k(L.taxed.L)}. **An employee contribution** cuts take-home pay at every wage, so fewer may be willing to work.` },
      { type: 'paragraph', text: '**Corporation tax** is a tax on company profits. A higher rate lowers the return on investment, so firms invest less and multinationals may locate elsewhere; over time, demand for labour grows more slowly. Cutting it is a way to attract firms and the jobs they bring.' },
    ],
    realExample: { emoji: '🏢', text: 'Hong Kong and Singapore keep their taxes on company profits low partly to attract regional headquarters, and the jobs that come with them.' },
    misconception: 'Students assume a tax on employers is paid wholly by employers. Here the $2 is split: workers receive $1 less and firms pay $1 more, depending on the two curves\' slopes.',
    examMatters: 'For an Explain (4 marks, Appendix 6), link the tax to the cost of a worker, then to the demand for labour and employment.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each tax change to its most likely labour-market effect:',
      pairs: [
        { left: 'The employer\'s charge on every worker\'s earnings goes up', right: 'firms want fewer workers at each wage', why: 'Each worker costs the firm more, so demand for labour falls.' },
        { left: 'The deduction from each employee\'s pay slip goes up', right: 'take-home pay falls at every wage', why: 'Workers keep less of each wage, which may reduce how many are willing to work.' },
        { left: 'The tax on company profits is cut to draw in overseas firms', right: 'more investment, and more jobs over time', why: 'A higher return after tax attracts investment, which raises demand for labour.' },
      ],
    }),
  };
})();

const geographicalMeasures = (() => {
  const sid = subId('geographical-mobility-measures');
  return {
    id: sid,
    title: 'Measures to Reduce Geographical Immobility of Labour',
    keyIdea: 'Measures to reduce geographical immobility help workers move to where the jobs are, or bring jobs to where the workers are, easing unemployment beside vacancies.',
    body: [
      { type: 'paragraph', text: 'Topic 3.3.4 covers the causes of geographical immobility: housing costs, family ties, the cost of moving and a lack of information. The **measures to reduce geographical immobility of labour** target each one:' },
      { type: 'bullets', items: [
        '**Relocation grants**: a payment towards the cost of moving for a job.',
        '**Affordable housing** in the regions where jobs are growing.',
        '**Transport links** that let workers commute instead of moving.',
        '**Job-information services** that list vacancies across the country.',
        '**Regional policy**: grants to firms that set up where unemployment is high, bringing jobs to workers.',
      ] },
      { type: 'paragraph', text: 'The effect is on both regions: supply of labour rises where there were vacancies and falls where there was unemployment, so unemployment falls and output rises. The limits: the cost to government, and ties to home and relatives that no grant can overcome.' },
    ],
    realExample: { emoji: '🗺️', text: 'Malaysia\'s national job portal lists vacancies across the country so that job-seekers can see openings beyond their own town.' },
    misconception: 'Students list the causes of immobility when asked for measures. The causes are topic 3.3.4; here the question is what government does about each one, and whether it works.',
    examMatters: 'For a Discuss (14 marks, Appendix 6), weigh how well each measure fits the barrier it targets: a grant helps with cost, but not with a partner\'s job or children in school.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each measure to the barrier to moving it tackles:',
      pairs: [
        { left: 'A one-off payment towards removal costs', right: 'the expense of the move itself', why: 'The grant pays the cost that stops the move.' },
        { left: 'Subsidised rental flats beside the new factories', right: 'high rents where the work is', why: 'Cheaper homes make the growing region affordable.' },
        { left: 'A national website listing every vacancy', right: 'not knowing where the openings are', why: 'Information lets workers find jobs in other regions.' },
        { left: 'A faster rail line into the city', right: 'the distance between home and work', why: 'Commuting replaces the need to move house.' },
      ],
    }),
  };
})();

const occupationalMeasures = (() => {
  const sid = subId('occupational-mobility-measures');
  const L = LAB;
  return {
    id: sid,
    title: 'Measures to Reduce Occupational Immobility of Labour',
    keyIdea: 'Measures to reduce occupational immobility give workers the skills and qualifications that jobs in shortage need, so supply rises where it is short.',
    body: [
      { type: 'paragraph', text: 'Occupational immobility, covered in topic 3.3.4, is workers unable to switch to a different kind of job because they lack its skills or qualifications. The **measures to reduce occupational immobility of labour**:' },
      { type: 'bullets', items: [
        '**Retraining schemes** for workers from declining industries.',
        '**Subsidised courses and training credits** that adults can spend on new skills.',
        '**Apprenticeships** that combine work and training.',
        '**Recognising qualifications** gained abroad or on the job.',
      ] },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Workers retrain', subtitle: 'Funded courses' },
        { title: 'More hold the qualification', subtitle: 'The barrier falls' },
        { title: 'Shortage eases', subtitle: 'Supply shifts right' },
      ] },
      { type: 'paragraph', text: `In a shortage occupation, training shifts supply right. If ${k(L.train)} more people qualify at every wage, the wage falls from ${hr(L.eq.W)} to ${hr(L.trained.W)} and employment rises from ${k(L.eq.L)} to ${k(L.trained.L)}: vacancies fill, and the workers retrained are no longer unemployed.` },
      { type: 'paragraph', text: 'The limits are time, cost and age: training takes years, courses may teach skills firms do not want, and older workers have fewer years to earn back the effort.' },
    ],
    realExample: { emoji: '🎓', text: 'Singapore gives its citizens training credits to spend on approved courses, so workers can retrain as their industries change.' },
    misconception: 'Students expect retraining to raise pay in the shortage occupation. It adds to supply there, so it eases the shortage and slows pay rises; the gain goes to the retrained workers.',
    examMatters: 'For a Discuss (14 marks, Appendix 6) on occupational immobility, weigh how quickly training works and who takes it up.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the training course to the electricians\' market:',
      correctOrder: [
        'Laid-off factory staff retrain on a state-funded electrician\'s course',
        'More people hold the certificate the job requires',
        'At every rate of pay, more electricians are available',
        'Vacancies fill and electricians\' pay rises more slowly',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the measure: retraining.',
        'Training removes the qualification barrier.',
        'So the supply of electricians shifts right.',
        'More supply eases the shortage and restrains the wage.',
      ],
    }),
  };
})();

const discriminationExploitation = (() => {
  const sid = subId('discrimination-and-exploitation');
  const L = LAB;
  return {
    id: sid,
    title: 'Measures to Reduce Discrimination and Exploitation',
    keyIdea: 'Discrimination pays or hires a group less for reasons unrelated to its work. Laws against it, and against exploitation, raise that group\'s pay and use its talent.',
    body: [
      { type: 'paragraph', text: '**Discrimination** in the labour market is paying or hiring workers less because of their sex, ethnicity, religion, age or nationality rather than their productivity. Employers who discriminate want fewer of the group\'s workers at every wage.' },
      { type: 'paragraph', text: `If discrimination cuts demand for one group\'s labour by ${k(-L.bias)} at every wage, its wage is ${hr(L.biased.W)} and ${k(L.biased.L)} are employed, against ${hr(L.eq.W)} and ${k(L.eq.L)} without it. The **measures to reduce discrimination and exploitation** aim to close that gap:` },
      { type: 'bullets', items: [
        '**Equal pay and anti-discrimination laws** in hiring, pay and promotion, with a body to enforce them.',
        '**Pay-gap reporting**, so unequal pay is visible.',
        '**Against exploitation**: enforcing the minimum wage, protecting migrant workers, the right to join a trade union, and the employment legislation in chapter 3.',
      ] },
      { type: 'paragraph', text: 'The effects: the group\'s wage and employment rise, and output rises as talent is used. The limits: discrimination is hard to prove, enforcement needs resources, and informal work escapes the law.' },
    ],
    realExample: { emoji: '⚖️', text: 'Several Gulf states have reformed sponsorship rules so that migrant workers can change employer without their current employer\'s permission.' },
    misconception: 'Students treat discrimination and exploitation as one thing. Discrimination is unequal treatment of a group; exploitation is treating any worker in ways they accept only for lack of an alternative.',
    examMatters: 'For an Analyse (6 marks, Appendix 6), use the demand shift: removing discrimination raises the group\'s wage and employment together.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each case into discrimination or exploitation:',
      groups: [
        { name: 'Discrimination', items: ['A woman is paid less than a man for the same role', 'Applicants over fifty are rejected whatever their skills', 'A worker of one faith is repeatedly passed over for promotion'], why: 'Each treats a GROUP worse for reasons unrelated to the work.' },
        { name: 'Exploitation', items: ['An employer keeps a migrant maid\'s passport', 'Wages are held back for months so staff cannot quit', 'Staff must work unpaid overtime every week'], why: 'Each takes advantage of a worker\'s lack of alternatives, whoever they are.' },
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [caseForIntervention, priceRegulation, profitRegulation, qualityAndTargets, referral, mergerControl],
    takeaway: [
      'Market power raises prices and cuts output, choice and quality.',
      'Price caps reward cost cutting; profit caps reward spending.',
      'Authorities investigate conduct and review mergers before they happen.',
    ],
  },
  {
    title: B2,
    subs: [smallBusinessFdi, deregulation, privatisation, tendering, tradeLiberalisation],
    takeaway: [
      'More rivals, or the threat of them, push prices down and widen choice.',
      'Privatisation changes the owner; competition is what lowers price.',
      'Tendering creates competition for a market only one firm can serve.',
    ],
  },
  {
    title: B3,
    subs: [localSourcing, employmentLegislation, foreignEntry, monopsonyRestrictions, nationalisation],
    takeaway: [
      'Protection helps domestic suppliers and workers; consumers pay.',
      'Monopsony restrictions limit a buyer\'s power over sellers.',
      'Nationalisation saves jobs and serves social aims, at a risk to costs.',
    ],
  },
  {
    title: B4,
    subs: [impactOfMeasures, regulatoryCapture, informationGaps, resourcesAndPower],
    takeaway: [
      'Judge every measure on price, profit, efficiency, quality and choice.',
      'Capture and information gaps weaken what a regulator decides.',
      'Without resources and legal power, rules are not enforced.',
    ],
  },
  {
    title: B5,
    subs: [labourCase, minimumWageCompetitive, minimumWageMonopsony, maximumWage],
    takeaway: [
      'Labour-market intervention rests on efficiency and equity.',
      'A minimum wage above equilibrium cuts jobs in a competitive market.',
      'Where one employer dominates, a floor can raise pay and jobs.',
    ],
  },
  {
    title: B6,
    subs: [directTaxes, geographicalMeasures, occupationalMeasures, discriminationExploitation],
    takeaway: [
      'A tax on employment cuts jobs; a profit tax acts through investment.',
      'Mobility measures target the barrier: cost, housing, skills.',
      'Ending discrimination raises a group\'s wage and employment.',
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
 * THE LEAF MAP, BY HAND. 33 leaves at `econ_spec.txt:1485-1535`, every one named against the
 * subsection that teaches it. The runner re-reads the oracle and asserts the counts.
 */
export const LEAF_MAP = {
  'ECON-3.3.5-1a': ['case-for-intervention'],
  'ECON-3.3.5-1b-1': ['price-regulation'],
  'ECON-3.3.5-1b-2': ['profit-regulation'],
  'ECON-3.3.5-1b-3': ['quality-and-targets'],
  'ECON-3.3.5-1b-4': ['quality-and-targets'],
  'ECON-3.3.5-1b-5': ['referral-to-authorities'],
  'ECON-3.3.5-1b-6': ['merger-control'],
  'ECON-3.3.5-1c-1': ['small-business-and-fdi'],
  'ECON-3.3.5-1c-2': ['deregulation'],
  'ECON-3.3.5-1c-3': ['privatisation'],
  'ECON-3.3.5-1c-4': ['competitive-tendering'],
  'ECON-3.3.5-1c-5': ['trade-liberalisation'],
  'ECON-3.3.5-1d-1': ['local-sourcing'],
  'ECON-3.3.5-1d-2': ['employment-legislation'],
  'ECON-3.3.5-1d-3': ['employment-legislation', 'discrimination-and-exploitation'],
  'ECON-3.3.5-1d-4': ['foreign-entry-barriers'],
  'ECON-3.3.5-1d-5': ['monopsony-restrictions', 'minimum-wage-monopsony'],
  'ECON-3.3.5-1d-6': ['nationalisation'],
  'ECON-3.3.5-1e-1': ['impact-of-measures'],
  'ECON-3.3.5-1e-2': ['impact-of-measures'],
  'ECON-3.3.5-1e-3': ['impact-of-measures'],
  'ECON-3.3.5-1e-4': ['impact-of-measures'],
  'ECON-3.3.5-1e-5': ['impact-of-measures'],
  'ECON-3.3.5-1f-1': ['regulatory-capture'],
  'ECON-3.3.5-1f-2': ['information-gaps'],
  'ECON-3.3.5-1f-3': ['resources-and-power'],
  'ECON-3.3.5-1f-4': ['resources-and-power'],
  'ECON-3.3.5-2a': ['labour-case'],
  'ECON-3.3.5-2b-1': ['maximum-wage'],
  'ECON-3.3.5-2b-2': ['minimum-wage-competitive', 'minimum-wage-monopsony'],
  'ECON-3.3.5-2b-3': ['direct-taxes'],
  'ECON-3.3.5-2b-4': ['geographical-mobility-measures', 'occupational-mobility-measures'],
  'ECON-3.3.5-2b-5': ['discrimination-and-exploitation'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODELS, so the two
 * surfaces cannot diverge. Notes ship from the `data` column, so a `?draft=1` walk shows these only
 * after publication (DECISIONS, 16 September).
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3.3.5 · 1a, 1b',
    keyIdea: 'Why government intervenes in product markets, and the six measures the specification names to control monopolies and mergers.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Price regulation</strong> — a legal maximum on the price a monopoly may charge, often changed each year by CPI − X.'),
        def('<strong>Profit regulation</strong> — a cap on the rate of return a monopoly may earn on its capital.'),
        def('<strong>Quality standards</strong> — a minimum level the product must meet; <strong>performance targets</strong> — measured goals with rewards or penalties.'),
        def('<strong>Referral to regulatory authorities</strong> — passing a firm, market or deal to a competition authority to investigate.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Water network: unregulated ${money(NAT.mono.P)} and ${k(NAT.mono.Q)} units; cap at average cost ${money(NAT.avg.P)} and ${k(NAT.avg.Q)}; cap at marginal cost ${money(NAT.marg.P)} and ${k(NAT.marg.Q)}, a loss needing a subsidy.`),
        mech(`CPI − X: inflation ${pct(NAT.cpi)}, X ${pct(NAT.X)}, so the cap may rise ${pct(NAT.allowed)}: ${money(NAT.avg.P)} to ${money(NAT.nextCap)}.`),
        mech(`Rate of return ${pct(NAT.rate)}: ${money(NAT.base)}m of capital earns ${money(NAT.allowedProfit)}m; ${money(NAT.base + NAT.added)}m earns ${money(NAT.allowedAfter)}m — an incentive to over-invest.`),
        link('Legislation to control mergers and takeovers: notification, screening, in-depth test of a substantial lessening of competition, then clear, clear with remedies, or block.'),
      ] },
    ],
    takeaway: [
      'Market power: higher price, lower output, less choice.',
      'Price caps reward cost cutting; profit caps reward capital.',
      'Standards and targets stop quality being the cost that is cut.',
    ],
  },
  {
    title: B2,
    meta: '3.3.5 · 1c',
    keyIdea: 'Five measures that promote competition and contestability, and why privatisation needs competition or regulation beside it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Deregulation</strong> — removing rules that restrict entry into a market or what firms may do in it.'),
        def('<strong>Privatisation</strong> — the transfer of a firm from state to private ownership.'),
        def('<strong>Competitive tendering</strong> — inviting firms to bid for the right to supply a public service.'),
        def('<strong>Trade liberalisation</strong> — reducing tariffs, quotas and other barriers to imports.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Tax incentives and grants to promote small businesses and FDI add rivals: lower prices, more choice, new technology.'),
        mech(`Telecoms: state monopoly ${money(TEL.state.P)}; privatised monopoly ${money(TEL.privat.P)}; opened to rivals ${money(TEL.open.P)} with ${TEL.open.Q} million subscribers.`),
        link('Deregulation and liberalisation make a market more contestable; tendering creates competition for the market.'),
      ] },
    ],
    takeaway: [
      'More rivals, or the threat of them, lower prices.',
      'Ownership alone does not bring competition.',
      'Liberalisation helps consumers and hurts high-cost firms.',
    ],
  },
  {
    title: B3,
    meta: '3.3.5 · 1d',
    keyIdea: 'Measures that protect suppliers and employees: local sourcing, employment legislation, barriers to foreign firms, limits on buying power, and nationalisation.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Local sourcing</strong> — a requirement to buy a share of raw materials and components from domestic suppliers.'),
        def('<strong>Exploitation</strong> — treating workers in ways they accept only because they have no real alternative.'),
        def('<strong>Monopsony power</strong> — the power of a dominant buyer over the price it pays suppliers or workers.'),
        def('<strong>Nationalisation</strong> — the transfer of a firm from private to state ownership.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Cement: open ${money(CEM.open.P)} and ${k(CEM.open.Q)} bags (${k(CEM.open.home)} domestic); foreign firms barred ${money(CEM.shut.P)} and ${k(CEM.shut.Q)}, all domestic.`),
        mech('Employment legislation to protect workers from exploitation: hours, safety, contracts, prompt pay; costs rise, so some jobs may go.'),
        link('Restrictions on the monopsony power of firms: codes for large buyers, prompt payment, minimum prices, the minimum wage.'),
      ] },
    ],
    takeaway: [
      'Protection shifts gains to domestic suppliers and workers.',
      'Consumers pay through price and choice.',
      'State ownership protects jobs but weakens cost pressure.',
    ],
  },
  {
    title: B4,
    meta: '3.3.5 · 1e, 1f',
    keyIdea: 'The five impacts every measure is judged on, and the four limits that stop intervention working as intended.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Regulatory capture</strong> — a regulator acting in the interest of the firms it regulates.'),
        def('<strong>Asymmetric information</strong> — the regulated firm knows more about its costs than the regulator.'),
        def('<strong>Inadequate resources</strong> and <strong>lack of regulatory power</strong> — too little money and staff, or too little legal power, to enforce.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Impact on price, profit, efficiency, quality and choice: run each measure through all five, then weigh them.'),
        mech(`Information gap: costs overstated by ${money(NAT.padding)} a unit give a cap of ${money(NAT.claimed.P)} instead of ${money(NAT.avg.P)}, and profit of ${money(NAT.claimed.profit)} thousand a day.`),
        link('Benchmarking against similar firms narrows the information gap.'),
      ] },
    ],
    takeaway: [
      'Five impacts: price, profit, efficiency, quality, choice.',
      'Capture and information gaps weaken decisions.',
      'Resources and power decide whether rules are enforced.',
    ],
  },
  {
    title: B5,
    meta: '3.3.5 · 2a, 2b',
    keyIdea: 'The case for intervening in labour markets, and what maximum and minimum wage controls do in competitive and dominated markets.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Minimum wage controls</strong> — a legal floor on the wage.'),
        def('<strong>Maximum wage controls</strong> — a legal ceiling on pay.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Competitive: ${hr(LAB.eq.W)} and ${k(LAB.eq.L)}; a floor of ${hr(LAB.minW)}: ${k(LAB.minHired)} hired, ${k(LAB.minWilling)} willing.`),
        mech(`One dominant employer: ${k(MON.mono.L)} at ${hr(MON.mono.W)}; a floor of ${hr(MON.floor)}: ${k(MON.withFloor.L)} employed.`),
        mech(`A cap of ${hr(TOP.cap)} against ${hr(TOP.eq.W)}: ${h(TOP.willing)} willing, ${h(TOP.wanted)} wanted.`),
        link('The effect of a minimum wage depends on the market structure and the elasticity of demand for labour.'),
      ] },
    ],
    takeaway: [
      'Efficiency and equity are the two grounds for intervening.',
      'A floor above equilibrium: surplus of labour, unless one employer dominates.',
      'A binding cap: shortage, evasion and emigration.',
    ],
  },
  {
    title: B6,
    meta: '3.3.5 · 2b',
    keyIdea: 'Direct taxes on employment and profits, measures against geographical and occupational immobility, and measures against discrimination and exploitation.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>National insurance contributions</strong> — a tax on earnings paid by employers and employees.'),
        def('<strong>Corporation tax</strong> — a tax on company profits.'),
        def('<strong>Discrimination</strong> — paying or hiring a group less for reasons unrelated to its productivity.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Employer contribution of ${money(LAB.tax)} an hour: wage ${hr(LAB.taxed.W)}, firms pay ${hr(LAB.firmPays)}, employment ${k(LAB.taxed.L)}.`),
        mech(`Retraining: supply +${k(LAB.train)}; wage ${hr(LAB.trained.W)}, employment ${k(LAB.trained.L)}.`),
        mech(`Discrimination: ${hr(LAB.biased.W)} and ${k(LAB.biased.L)}; removed, ${hr(LAB.eq.W)} and ${k(LAB.eq.L)}.`),
        link('Measures to reduce geographical and occupational immobility target the cause: cost, housing, information, skills.'),
      ] },
    ],
    takeaway: [
      'Employment taxes cut jobs; profit taxes act through investment.',
      'Each mobility measure targets one barrier.',
      'Anti-discrimination law raises the group\'s wage and jobs.',
    ],
  },
];
