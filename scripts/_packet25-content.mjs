/**
 * PACKET 25 — market-failure, Learn Mode content and Notes.
 *
 * Economics Unit 1 (WEC11), IAL topic 1.3.5, audit/raw/econ_spec.txt:727-791. EIGHT blocks, one per
 * specification sub-topic, in the specification's own order — the first section in this programme
 * whose chapter list is simply the spec's own list of sub-topics, because for once the spec's
 * structure is a good teaching structure. Thirty-four subsections, one idea each.
 *
 * SIX SCOPE DECISIONS THE SPECIFICATION SETTLED BEFORE A WORD WAS WRITTEN (see NEXT.md):
 *
 *   - MORAL HAZARD IS NOT SOMEBODY ELSE'S TOPIC, AND TWO FINDINGS SAY IT IS. specGap-06 files it
 *     under "WEC14 Unit 4 financial market failure" and topFix-04 asks for it to be moved "out of the
 *     section". `moral hazard` is FIVE hits in econ_spec.txt and 1.3.5 · 5 is a sub-topic of this
 *     section with three leaves (:781-785). Obeying would have deleted a requirement the section was
 *     already under-teaching — the dangerous shape of finding packet 19 met, where a "this is out of
 *     scope" claim needs the same spec check as a "this is missing" one. It grows from one shared
 *     subsection to a chapter. `adverse selection`, which both findings name in the same breath, IS
 *     zero in the specification and is gone.
 *   - MERIT AND DEMERIT GOODS, AND MARKET POWER, ARE NOT. `merit good` 0, `demerit good` 0 (both
 *     named `terms.off-spec` phrases), `market power` 0, and `monopoly` is four hits, all of them
 *     3.3.x in Unit 3 (:1424-1431). The March section gave them two of its seven blocks. They go,
 *     and nothing replaces them: the space belongs to the sub-topic below.
 *   - SPECULATION AND MARKET BUBBLES ARE A WHOLE SUB-TOPIC AND THE SECTION DID NOT MENTION THEM.
 *     `speculation` and `bubble` are zero hits across all eight tables of the March section, and
 *     1.3.5 · 6 has three leaves. NO LEDGER ITEM NAMES THIS. An audit reads what is there; only
 *     walking inward from the spec can see a sub-topic that is simply absent, which is what Layer 3
 *     is for and why the coverage oracle matters more than the finding list.
 *   - "DEADWEIGHT LOSS" IS NOT THE NAME OF ANYTHING HERE. `deadweight` is 0 in econ_spec.txt and is
 *     a named `terms.off-spec` phrase; the March section had three subsections of it across two
 *     blocks and topFix-04 asks for them to be MERGED. They are not merged, they are replaced: 2d's
 *     own words are "identification of the welfare loss or gain areas", and the gain half is
 *     specGap-04, which the section never had at all.
 *   - "INFORMATION FAILURE" IS NOT EITHER. Zero hits, and it was a block title and a subsection
 *     title. The spec says "imperfect market information" (2) and "information gaps" (3).
 *   - THE SECTION'S NUMBER WAS RIGHT AND THE FINDING WAS WRONG. specGap-05 says market failure is
 *     "1.3.1-1.3.4" in the 2018 IAL spec and asks whether the app's "1.3.5" label is a mistake. It is
 *     not: :727 reads "1.3.5 Market failure", and contextFor() resolves this section to 1.3.5 with 35
 *     leaves. 1.3.1-1.3.4 is UK GCE numbering, which is the trap 154 ledger items across this
 *     programme fall into.
 *
 * Money is in dollars throughout. Every figure belongs to Kumbe Cement or Amara Skills and is derived
 * in _packet25-util.mjs. Real examples name real kinds of market and carry NO year and NO figure
 * (packet 15's accuracy-01 rule) — which is also how accuracy-02 is answered: the March lighthouse
 * example was wrong about who paid for lighthouses and it is removed rather than corrected, because a
 * corrected version would be a dated claim about a real market that this repository cannot check.
 */
import {
  subId, SECTION, hash8, money, qty,
  KUMBE, AMARA, valueAt,
} from './_packet25-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (lib/content-validator.mjs:458, :478), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here, so a reason cannot
 * drift away from the item it explains and a missing one is a length mismatch rather than a silent
 * undefined.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const K = KUMBE, A = AMARA;

export const B1 = 'Why Markets Fail';
export const B2 = 'Private, External and Social';
export const B3 = 'Marginal Analysis and the Welfare Areas';
export const B4 = 'Externalities in Five Contexts';
export const B5 = 'Public Goods and the Free-Rider Problem';
export const B6 = 'Imperfect Market Information';
export const B7 = 'Moral Hazard';
export const B8 = 'Speculation and Market Bubbles';

/* ══ Block 1 — Why Markets Fail (1.3.5 · 1a, 1b) ═══════════════════════════ */

const whatMarketFailureMeans = (() => {
  const sid = subId('what-market-failure-means');
  return {
    id: sid,
    title: 'What Market Failure Means',
    keyIdea: 'Market failure is too much or too little of a good being produced and/or consumed compared with the socially optimal level of output.',
    body: [
      { type: 'paragraph', text: 'A market can work perfectly well — buyers and sellers meeting, a price settling, trade happening every day — and still produce the wrong amount. That is what **market failure** means, and the specification puts it in one sentence.' },
      { type: 'paragraph', text: 'Market failure is when **too much or too little** of a good is produced and/or consumed **compared with the socially optimal level of output**. Not when the market stops. Not when the price is high. When the quantity is wrong.' },
      { type: 'paragraph', text: 'Three words in that sentence are doing all the work. **Too much or too little** says the failure has a direction, and you have to say which. **Compared with** says it is a comparison, so there must be something to compare against. And the **socially optimal level** is that something: the quantity that would be produced if every cost and every benefit counted, not only the ones the buyer and the seller feel.' },
      { type: 'paragraph', text: 'So every question in this topic becomes the same two questions. Which way is the quantity wrong, and what is the price failing to count?' },
    ],
    realExample: { emoji: '🚦', text: 'A city\'s roads at eight in the morning are a market that works: people who want to travel, fuel for sale, a price for both. Nothing has broken. And yet almost everyone would prefer fewer cars on the road — including most of the people driving.' },
    misconception: 'Students write that market failure means the market has collapsed, or that nothing is being bought and sold. It usually means the opposite: the market is busy and is trading the wrong amount. Instead write: market failure is too much or too little of a good produced or consumed compared with the socially optimal level.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as requiring students to give the meaning of a term, concept or phrase. For market failure that means the quantity comparison, not a description of a market in trouble.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the definition this chapter opens with:',
      template: [
        'Market failure is too much or too ___ of a good',
        '→ produced and/or ___',
        '→ compared with the ___ optimal level of output',
      ],
      answers: ['little', 'consumed', 'socially'],
      hints: ['the other direction the quantity can be wrong in', 'the other thing a good can have too much or too little of, besides being made', 'whose optimum it is — not the buyer\'s and not the seller\'s'],
      distractors: ['expensive', 'exported', 'privately'],
    }),
  };
})();

const theFiveSources = (() => {
  const sid = subId('the-five-sources');
  return {
    id: sid,
    title: 'The Five Sources',
    keyIdea: 'The specification lists five sources and no more: externalities, the free-rider problem, imperfect market information, moral hazard, and speculation and market bubbles.',
    body: [
      { type: 'paragraph', text: 'There are five, and the list is closed. Each one is a different reason the price fails to carry something that matters, and each has a chapter of its own later in this section.' },
      { type: 'bullets', items: [
        '**Externalities** — a cost or a benefit falls on somebody outside the deal, so the price the two sides agree does not include it.',
        '**The free-rider problem; non-provision of public goods** — nobody can be kept from the benefit, so nobody has a reason to pay, so it may not be provided.',
        '**Imperfect market information** — one side knows something the other does not, or neither knows enough, so a choice is made that the facts would not support.',
        '**Moral hazard** — being protected from the cost of a risk changes how much of that risk is taken.',
        '**Speculation and market bubbles** — people buy because the price is rising rather than for what the thing is worth, and the price leaves the value behind.',
      ] },
      { type: 'paragraph', text: 'Learn them as five, in this order. A sixth source is not something the paper can ask you about, and an answer that reaches for one has spent words on nothing.' },
    ],
    realExample: { emoji: '🗂️', text: 'These are not five unrelated problems. In each, the price is being asked to carry information — about a cost, about who benefits, about a risk, about what something is worth — and something stops it.' },
    misconception: 'Students add sources from elsewhere — a firm being large, a good being unaffordable, a shortage. None is on this list. Instead: learn the five the specification names, and if a situation does not fit one, say which it is closest to and why.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring knowledge, understanding and application, and — when explaining a reason or impact — a two-stage chain of reasoning. Naming a source is the first stage; saying what it does to the quantity is the second.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each situation to the source of market failure it is an example of:',
      pairs: [
        { left: 'Smoke from a works drifts over the houses behind it', right: 'an externality' },
        { left: 'A sea wall protects payers and non-payers alike', right: 'the free-rider problem' },
        { left: 'A car is sold without its repair history', right: 'imperfect market information' },
        { left: 'A fully insured driver stops checking the tyres', right: 'moral hazard' },
        { left: 'Apartments are bought empty, to be resold higher', right: 'speculation' },
      ],
      why: [
        'A cost lands on somebody who was not part of the transaction and did not agree to it',
        'Nobody can be excluded from the protection, so nobody has a reason to pay for it',
        'One side of the deal knows something the other side needs and does not have',
        'The cover changed how much care was taken, and it was priced before that change',
        'The reason to buy is the expected resale price, not any use of the thing',
      ],
    }),
  };
})();

const misallocationNotCollapse = (() => {
  const sid = subId('misallocation-not-collapse');
  return {
    id: sid,
    title: 'Misallocation, Not Collapse',
    keyIdea: 'A failing market is usually a busy one: the resources are being used, they are being used on the wrong things and in the wrong amounts.',
    body: [
      { type: 'paragraph', text: 'It is worth being precise about what fails, because the word invites the wrong picture. What fails is the **allocation** — how much of society\'s land, labour and capital goes to this good rather than another.' },
      { type: 'paragraph', text: 'Society has a fixed amount of resources at any moment. Every tonne of cement made is resources not used elsewhere. A market that makes too much cement has not wasted the cement; it has spent resources on cement that were worth more somewhere else.' },
      { type: 'flow', steps: [
        { title: 'The price does not carry a cost or a benefit', subtitle: 'somebody outside the deal is affected, or somebody cannot be charged' },
        { title: 'Buyers and sellers act on the price they see', subtitle: 'which is the rational thing for each of them to do' },
        { title: 'Quantity settles away from the social optimum', subtitle: 'too much, or too little' },
        { title: 'Resources are allocated to the wrong uses', subtitle: 'and that misallocation is the failure' },
      ], result: 'A market working normally, producing the wrong quantity', resultType: 'bad' },
      { type: 'paragraph', text: 'Notice the second step. Nobody here is behaving badly: the failure needs no villain, and an answer that reaches for one has stopped explaining.' },
    ],
    realExample: { emoji: '🏭', text: 'A cement works that pollutes is not breaking the law, cheating anybody or making a bad product. It buys inputs at market prices and sells at the price buyers will pay. Everything about it is ordinary, and its quantity is still too high.' },
    misconception: 'Students explain market failure as greed or as firms behaving irresponsibly. The model does not need either: every person in it is doing the sensible thing given the price they face. Instead write: the price does not carry the full cost or benefit, so rational choices add up to the wrong quantity.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning, diagrams where appropriate, and depth rather than breadth. A chain that ends at "so the firm pollutes" has stopped one link early: it has to reach the quantity and say which way it is wrong.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four stages into causal order — each one is the cause of the one after it:',
      correctOrder: [
        'Something real is missing from the price',
        'Buyers and sellers each act on what they can see',
        'The traded quantity ends up away from the optimum',
        'Resources go to uses worth less than others',
      ],
      why: [
        'Everything starts with something the price leaves out; without that there is nothing to explain',
        'The price is all either side has to go on, so they respond to the one they can see',
        'Their separate responses add up to a quantity, and it is not the socially optimal one',
        'A wrong quantity of this good means resources were taken from or left in some other use',
      ],
    }),
  };
})();

const whichSourceIsIt = (() => {
  const sid = subId('which-source-is-it');
  return {
    id: sid,
    title: 'Which Source Am I Looking At?',
    keyIdea: 'Three questions separate the five sources: is somebody outside the deal affected, can anybody be kept from the benefit, and does one side know or carry more?',
    body: [
      { type: 'paragraph', text: 'In an exam the situation arrives as a paragraph, not as a label. These three questions get you to the right source quickly.' },
      { type: 'bullets', items: [
        '**Is somebody outside the transaction affected?** If yes, it is an externality, and the next question is whether it is a cost or a benefit and whether it comes from making or from using the good.',
        '**Can anybody be kept from the benefit?** If no, you are looking at a public good and the free-rider problem.',
        '**Does one side know or carry something the other does not?** If it is knowledge, it is imperfect market information. If it is a risk that somebody else has agreed to cover, it is moral hazard.',
      ] },
      { type: 'paragraph', text: 'And if none fits but the price is rising because it has been rising, it is speculation.' },
      { type: 'paragraph', text: 'Two of these overlap. Imperfect market information and moral hazard are both about something one side cannot see, but information is about what is known **before** the deal and moral hazard about behaviour that changes **after** it.' },
    ],
    realExample: { emoji: '🧭', text: 'A question about a bank that lends recklessly can be read three ways: as an externality (the failure spreads to other banks), as imperfect market information (depositors cannot see the risk), or as moral hazard (the bank expects to be rescued). All three are defensible and a strong answer says which one it is using and why.' },
    misconception: 'Students learn the five sources and then cannot place a situation in one. The question that does most of the work is the first: is there a third side to this deal? Instead of reciting the list, ask that question of the paragraph in front of you.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring analysis and evaluation with a brief assessment of the arguments. Where a situation fits more than one source, naming the alternative and saying why you chose the one you chose is exactly that brief assessment.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each question to the source it identifies:',
      pairs: [
        { left: 'Is somebody outside the deal affected?', right: 'an externality' },
        { left: 'Can anybody be kept from the benefit?', right: 'a public good' },
        { left: 'Did one side know more BEFORE the deal?', right: 'imperfect market information' },
        { left: 'Did behaviour change AFTER cover was taken?', right: 'moral hazard' },
      ],
      why: [
        'A third side to the transaction is what an externality is',
        'Non-excludability is the test, and it is what makes free-riding possible',
        'Information is about what was known when the choice was made',
        'Moral hazard is about care that weakens once the cost falls elsewhere',
      ],
      distractors: ['speculation'],
    }),
  };
})();

/* ══ Block 2 — Private, External and Social (1.3.5 · 2a, 2b, 2c) ═══════════ */

const privateExternalSocialCosts = (() => {
  const sid = subId('private-external-and-social-costs');
  return {
    id: sid,
    title: 'Private, External and Social Costs',
    keyIdea: 'Private cost + external cost = social cost. The producer feels the first, somebody else feels the second, and society carries the total.',
    body: [
      { type: 'paragraph', text: 'This is the first of the two identities the specification asks for, and it is worth writing out rather than half-remembering.' },
      { type: 'paragraph', text: '**Private cost** is what the producer actually pays: the limestone, the fuel, the wages, the machinery. It is what appears in the accounts, and it is what the supply curve is built from.' },
      { type: 'paragraph', text: '**External cost** is what falls on everybody else: the dust on the washing lines, the noise, the road worn by the lorries. Nobody sends an invoice for it, which is precisely why it does not reach the price.' },
      { type: 'paragraph', text: '**Social cost** is the two added together — the full cost to society of making the thing. In the Kumbe Cement market the private cost of the ' + qty(K.marketQ) + 'th tonne is ' + money(valueAt(K.mpc, K.marketQ)) + ', the external cost is ' + money(K.externalCost) + ', and the social cost is therefore ' + money(valueAt(K.msc, K.marketQ)) + '.' },
      { type: 'paragraph', text: 'Two things follow immediately. Where there is no external cost, private and social cost are the same thing — which is most markets. And the gap between them is never negative in this case: an external **cost** always puts social cost **above** private cost.' },
    ],
    realExample: { emoji: '🚚', text: 'A haulage firm pays for diesel, drivers and tyres. It does not pay for the wear its lorries put on the road surface, the noise on the streets they run through, or the time other drivers lose behind them. Its private cost is complete in its own accounts, and smaller than the cost of the journey to everybody.' },
    misconception: 'Students treat social cost as a different, separate cost from private cost. It is not a rival figure: it INCLUDES the private cost. Instead write: social cost = private cost + external cost, so social cost is always at least as big as private cost.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as giving the meaning of a term. For social cost the meaning is the sum — private cost plus external cost — and a definition that omits one of the two halves has given half the meaning.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the identity and its figures from the Kumbe Cement market:',
      template: [
        money(valueAt(K.mpc, K.marketQ)) + ' + ___ = ' + money(valueAt(K.msc, K.marketQ)),
        'The figure the producer pays is the ___ cost',
        'The figure everybody else carries is the ___ cost',
      ],
      answers: [money(K.externalCost), 'private', 'external'],
      hints: ['the gap between the two figures on the line above', 'the one that appears in the firm\'s own accounts', 'the one nobody sends an invoice for'],
      distractors: [money(K.welfareLoss), 'social'],
    }),
  };
})();

const privateExternalSocialBenefits = (() => {
  const sid = subId('private-external-and-social-benefits');
  return {
    id: sid,
    title: 'Private, External and Social Benefits',
    keyIdea: 'Private benefit + external benefit = social benefit. The buyer feels the first, other people feel the second, and society gains the total.',
    body: [
      { type: 'paragraph', text: 'The second identity has exactly the same shape as the first, with benefits in place of costs. That symmetry is the point: learn one and you have both.' },
      { type: 'paragraph', text: '**Private benefit** is what the buyer gets: the qualification, the journey, the protection from an illness. It is what the demand curve is built from, because it is what somebody is willing to pay for.' },
      { type: 'paragraph', text: '**External benefit** is what other people get without paying: the colleagues who work alongside somebody better trained, the neighbours who are less likely to catch something because a person was vaccinated.' },
      { type: 'paragraph', text: '**Social benefit** is the two together. In the Amara Skills market a course is worth ' + money(A.marketP) + ' to the person taking it at the market quantity, the external benefit is ' + money(A.externalBenefit) + ', so the social benefit of that course is ' + money(valueAt(A.msb, A.marketQ)) + '.' },
      { type: 'paragraph', text: 'And the same two consequences. Where there is no external benefit, private and social benefit coincide. And an external **benefit** always puts social benefit **above** private benefit.' },
    ],
    realExample: { emoji: '🧑‍🏫', text: 'Somebody who learns to read gains a private benefit that is theirs: better work, better pay, being able to read a contract. Everybody around them gains something too — the employer who needs fewer instructions repeated, the children who are read to, the clinic whose instructions are followed. None of those people pays for the lessons.' },
    misconception: 'Students think external benefits are the same as things being free. They are not about price at all: an external benefit is a benefit going to somebody who was not part of the transaction, whatever the buyer paid. Instead write: the external benefit is what falls on people outside the deal.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain of reasoning when explaining a reason or an impact. For an external benefit the two stages are: who gains without paying, and what that does to how much is bought.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each item to which of the three benefits it is, in the Amara Skills market:',
      pairs: [
        { left: 'The pay rise the trainee earns', right: 'private benefit' },
        { left: 'The colleagues who learn from them', right: 'external benefit' },
        { left: 'Both together', right: 'social benefit' },
      ],
      why: [
        'It goes to the person who paid for the course, which is what makes it private',
        'It goes to people who did not pay and were not part of the transaction',
        'Social benefit is the sum, never a separate third quantity',
      ],
    }),
  };
})();

const productionOrConsumption = (() => {
  const sid = subId('production-or-consumption');
  return {
    id: sid,
    title: 'Production or Consumption?',
    keyIdea: 'An externality is named by where it comes from — making the good or using it — and that is what decides which curve moves.',
    body: [
      { type: 'paragraph', text: 'Having separated costs from benefits, the specification asks for a second cut: does the external cost or benefit come from **producing** the good or from **consuming** it?' },
      { type: 'paragraph', text: 'The test is simple. Ask what has to happen for the effect to land on somebody else. If it is the making — a chimney, a discharge pipe, a lorry delivering — the externality is one of **production**. If it is the using — a car being driven, a cigarette being smoked, a course being applied at work — it is one of **consumption**.' },
      { type: 'paragraph', text: 'That answer decides which curve you move, and this is the step students skip. A production externality sits on the **cost** side, so it moves the marginal cost curve. A consumption externality sits on the **benefit** side, so it moves the marginal benefit curve.' },
      { type: 'paragraph', text: 'The same good can carry both. A car produces an external cost when it is built and another when it is driven. Where a question does not make clear which one it wants, say which you are analysing.' },
    ],
    realExample: { emoji: '🚗', text: 'A car is a good example precisely because it carries both. The factory that builds it emits while it is being made — production. The person who drives it emits, delays other traffic and takes up road space while it is being used — consumption. Two different externalities from one object, and they move different curves.' },
    misconception: 'Students decide production or consumption by asking who suffers. That is not the test: the people breathing exhaust are outsiders in both cases. Instead ask what ACTIVITY causes the effect — making the good, or using it.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram, and says students may be required to decide on the type of diagram. Deciding production or consumption IS that decision: it settles whether the cost curve or the benefit curve is the one that splits.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each effect by the activity that causes it: making the good, or using it.',
      groups: [
        { name: 'Production externality', items: ['a works discharges into a river', 'a quarry\'s lorries wear the road', 'a bee-keeper\'s hives pollinate the orchards nearby'] },
        { name: 'Consumption externality', items: ['a driver adds to the traffic everyone else is sitting in', 'a vaccinated person makes an outbreak less likely', 'a trained worker raises the skill of the team around them'] },
      ],
      why: [
        'The effect comes from the process of making the good, so it belongs on the cost side and moves the marginal cost curve',
        'The effect comes from somebody using the good, so it belongs on the benefit side and moves the marginal benefit curve',
      ],
    }),
  };
})();

const theFourKinds = (() => {
  const sid = subId('the-four-kinds');
  return {
    id: sid,
    title: 'The Four Kinds',
    keyIdea: 'Cost or benefit, production or consumption: two questions with two answers each give the four externalities the specification distinguishes.',
    body: [
      { type: 'paragraph', text: 'Put the two cuts together and there are four kinds, which is exactly the list 2c asks for.' },
      { type: 'bullets', items: [
        '**External cost of production** — MSC lies above MPC. The market makes too much.',
        '**External cost of consumption** — MSB lies below MPB. The market uses too much.',
        '**External benefit of production** — MSC lies below MPC. The market makes too little.',
        '**External benefit of consumption** — MSB lies above MPB. The market uses too little.',
      ] },
      { type: 'paragraph', text: 'The four letters are worth saying out loud once. **MPC** is marginal private cost and **MSC** is marginal social cost; **MPB** is marginal private benefit and **MSB** is marginal social benefit. *Marginal* means the cost or benefit of one more unit, which is what the height of a curve shows.' },
      { type: 'paragraph', text: 'And the direction falls out of the arithmetic rather than having to be memorised four times. A **cost** the price misses makes the market produce or use **too much**; a **benefit** it misses makes it produce or use **too little**.' },
    ],
    realExample: { emoji: '🍯', text: 'The fourth kind is the one students meet least. A bee-keeper who makes honey also pollinates the orchards around them, which is an external benefit of production: the orchards gain from the hives existing, not from anybody eating the honey. Left alone, there are fewer hives than there should be.' },
    misconception: 'Students learn "negative means the curve goes up" as a single rule and apply it to both diagrams. It is only true for costs. For an external benefit of consumption the marginal benefit curve goes UP and the market makes too LITTLE. Instead: ask cost or benefit first, then production or consumption, and read the direction off the pair.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning and diagrams where appropriate, focusing on depth rather than breadth. Naming which of the four kinds applies, and then drawing it, is the depth: listing all four is the breadth the row warns against.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each of the four kinds to what it does to the curves:',
      pairs: [
        { left: 'External cost of production', right: 'MSC above MPC — too much made' },
        { left: 'External cost of consumption', right: 'MSB below MPB — too much used' },
        { left: 'External benefit of production', right: 'MSC below MPC — too little made' },
        { left: 'External benefit of consumption', right: 'MSB above MPB — too little used' },
      ],
      why: [
        'A cost the producer does not pay makes the true cost to society higher than the one on the supply curve',
        'A cost the user does not bear makes the true benefit to society lower than the one on the demand curve',
        'A benefit the producer does not capture makes the true cost to society lower than the one they face',
        'A benefit the user does not capture makes the true benefit to society higher than the one they pay for',
      ],
    }),
  };
})();

/* ══ Block 3 — Marginal Analysis and the Welfare Areas (1.3.5 · 2d) ════════ */
/*
 * The only drawn requirement in the topic, and the one the March section pinned to a diagram title
 * that did not exist. Five subsections because the distinction in the third of them — a welfare loss
 * is not the total external cost — is the single error the March quiz bank was keyed into.
 */

const readingAMarginalDiagram = (() => {
  const sid = subId('reading-a-marginal-diagram');
  return {
    id: sid,
    title: 'Reading a Marginal Diagram',
    keyIdea: 'On a marginal diagram the height of a curve is what one more unit costs or is worth, and an area under or between curves is a total.',
    body: [
      { type: 'paragraph', text: 'The diagrams in this chapter look like supply and demand and are read differently, so it is worth thirty seconds on how before drawing one.' },
      { type: 'paragraph', text: 'The vertical axis is not "price". It is **costs and benefits in dollars per unit**. A point on a curve says: at this quantity, one more unit costs this much to make, or is worth this much to somebody. That is what **marginal** means, and it is why 2d calls this marginal analysis.' },
      { type: 'paragraph', text: 'Two consequences follow, and both are exam skills.' },
      { type: 'bullets', items: [
        'A **height** is a per-unit figure. The vertical gap between MPC and MSC at any quantity is the external cost of that unit — in the Kumbe market, ' + money(K.externalCost) + ' a tonne, at every quantity, because the gap is constant.',
        'An **area** is a total. Multiply a per-unit gap by a range of units and you have added up the cost or benefit over all of them. Every welfare figure in this chapter is an area.',
      ] },
      { type: 'paragraph', text: 'Get those two straight and the rest of the chapter is arithmetic you can check. Confuse them and a triangle and a rectangle become interchangeable, which is the mistake the next-but-one subsection is about.' },
    ],
    realExample: { emoji: '📐', text: 'The distinction turns up wherever a rate meets a total. A speed is a rate and a distance is the area under it; a wage is a rate and a pay packet is the area under it.' },
    misconception: 'Students read the vertical axis as a price and then talk about "the price rising to the social cost". The curves are not prices: only one point on the diagram is a price. Instead label the axis costs and benefits, and describe heights as per-unit amounts.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram using quantitative skills. Labelling the vertical axis "Costs, Benefits" rather than "Price" is part of that accuracy on a marginal diagram, because the two are not the same quantity.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each figure by whether it is read off the diagram as a height (a per-unit amount) or as an area (a total).',
      groups: [
        { name: 'A height — per unit', items: ['the external cost of one more tonne', 'what the next tonne costs the producer', 'what the next course is worth to the buyer'] },
        { name: 'An area — a total', items: ['the welfare loss', 'the total external cost of all the tonnes made', 'the welfare gain available'] },
      ],
      why: [
        'A height is read straight off the vertical axis at one quantity, and it is a rate: dollars per unit',
        'An area multiplies a per-unit amount by a number of units, so it is a total amount of money',
      ],
    }),
  };
})();

const externalCostOfProduction = (() => {
  const sid = subId('external-cost-of-production');
  return {
    id: sid,
    title: 'The External Cost of Production',
    keyIdea: 'With an external cost of production the market settles where MPB meets MPC, the social optimum is where MPB meets MSC, and the triangle between them is the welfare loss.',
    body: [
      { type: 'paragraph', text: 'The first of the two diagrams 2d names. Kumbe Cement makes ' + K.good + ', and making it puts dust and noise onto the households nearby: an external cost of ' + money(K.externalCost) + ' a ' + K.unit + '.' },
      { type: 'flow', steps: [
        { title: 'Draw MPB, MPC and MSC', subtitle: 'MSC sits ' + money(K.externalCost) + ' above MPC at every quantity' },
        { title: 'Mark the market quantity where MPB meets MPC', subtitle: qty(K.marketQ) + ' ' + K.units + ' at ' + money(K.marketP) },
        { title: 'Find the social optimum where MPB meets MSC', subtitle: qty(K.optimumQ) + ' ' + K.units + ' at ' + money(K.optimumP) },
        { title: 'Shade the triangle between MSC and MPB, from the optimum to the market quantity', subtitle: 'that area is the welfare loss' },
      ], result: 'Welfare loss = ½ × ' + money(K.externalCost) + ' × ' + qty(K.marketQ - K.optimumQ) + ' = ' + money(K.welfareLoss) + ' ' + K.per, resultType: 'bad' },
      { type: 'paragraph', text: 'Why does the market settle at ' + qty(K.marketQ) + '? Because both sides weigh only what they themselves gain and pay. The last ' + K.unit + ' either side agrees to is worth ' + money(K.marketP) + ' to the buyer and costs the producer ' + money(K.marketP) + ', so both are content. The ' + money(K.externalCost) + ' falling on the neighbours is in nobody\'s calculation.' },
      { type: 'paragraph', text: 'And why is ' + qty(K.optimumQ) + ' the optimum? Because beyond it every ' + K.unit + ' costs society more than it is worth to its buyer. At ' + qty(K.marketQ) + ' ' + K.units + ' the social cost of the last one is ' + money(valueAt(K.msc, K.marketQ)) + ' and its benefit is ' + money(K.marketP) + '. That gap, added up over the ' + qty(K.marketQ - K.optimumQ) + ' ' + K.units + ' it applies to, is the ' + money(K.welfareLoss) + '.' },
    ],
    realExample: { emoji: '🏗️', text: 'Heavy industry sited near housing is this diagram everywhere it happens. The plant does nothing unusual and the households cannot charge it for the dust. The quantity is what two willing sides agree on.' },
    misconception: 'Students shade the triangle from zero to the market quantity. It starts at the SOCIAL OPTIMUM: units below the optimum are worth more than they cost society, so they are not a loss. Instead: shade between the two quantities only.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as an accurately labelled diagram. Here that means three labelled curves, both quantities marked, and the welfare loss area identified — 2d asks for it by name.',
    recall: recall(sid, {
      type: 'reorder',
      /*
       * This was the four DRAWING steps, in the order the flow box above gives them. Layer 6 rejected
       * it and was right: "mark the market quantity" and "find the social optimum" are read
       * independently off the same three curves, so a student who found the optimum first has done
       * nothing wrong and would be marked wrong. Layer 1a's second rule says a second defensible
       * reading means the item changes, so it is now the CAUSAL chain, where each stage really is
       * caused by the one before — and it is no longer the box on the screen above it.
       */
      prompt: 'Put these four stages into causal order, from what the cement works does to where the social optimum sits:',
      correctOrder: [
        'Making the cement imposes a cost on the households nearby',
        'The producer pays only the private cost, so supply comes from MPC',
        'Buyers and sellers settle where MPB crosses MPC',
        'Counting the external cost moves the optimum left, to MPB against MSC',
      ],
      why: [
        'Everything starts with a cost that lands on somebody outside the transaction',
        'That cost has no invoice, so it never reaches the curve the producer acts on',
        'Both sides weigh only their own figures, and those two curves cross at the market quantity',
        'Adding the external cost to the producer\'s own raises the cost curve, and the optimum moves with it',
      ],
    }),
  };
})();

const lossIsNotTotalCost = (() => {
  const sid = subId('welfare-loss-is-not-total-external-cost');
  return {
    id: sid,
    title: 'Welfare Loss Is Not Total External Cost',
    keyIdea: 'The welfare loss is the triangle beyond the social optimum; the total external cost is the band between MPC and MSC over every unit. In this market they are ' + money(K.welfareLoss) + ' and ' + money(K.totalExternalCost) + '.',
    body: [
      { type: 'paragraph', text: 'These two areas sit on the same diagram, are both real, and are not the same number. Telling them apart is the most valuable thing in this chapter.' },
      { type: 'paragraph', text: 'The **total external cost** is the gap between MPC and MSC over **every ' + K.unit + '**: ' + money(K.externalCost) + ' × ' + qty(K.marketQ) + ' = ' + money(K.totalExternalCost) + ' ' + K.per + '. That is what the neighbours actually bear, and it is a real cost to them.' },
      { type: 'paragraph', text: 'The **welfare loss** is the triangle between MSC and MPB from the social optimum out to the market quantity: ' + money(K.welfareLoss) + ' ' + K.per + '. It is ten times smaller, and it answers a different question.' },
      { type: 'paragraph', text: 'Here is the difference in one sentence. The first ' + qty(K.optimumQ) + ' ' + K.units + ' impose an external cost of ' + money(K.externalCostAtOptimum) + ' — and society should still want them made, because each of them is worth more to its buyer than it costs society in total. A cost is not a loss if the thing it buys is worth more than it. **The loss is only the part of the output that is not worth what it costs society.**' },
      { type: 'paragraph', text: 'A question about what the pollution costs wants the band; one about what is lost by producing the wrong quantity wants the triangle.' },
    ],
    realExample: { emoji: '⚖️', text: 'The distinction settles arguments about whether an industry should exist at all. One can impose enormous external costs and still be worth having. The case for producing less is not the size of the external cost but that the last units are not worth their social cost.' },
    misconception: 'Students mark the area between MSC and MPC up to the market quantity as the welfare loss. That area is the TOTAL EXTERNAL COST. Instead: the welfare loss is the triangle bounded by the two quantities, between MSC and MPB.',
    examMatters: 'Appendix 6 defines Calculate (2 or 4 marks, WEC11) as a calculation in several stages and advises showing workings. For a welfare loss the stages are both quantities, the gap between the curves, then half the product.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each description by which of the two areas it describes.',
      groups: [
        { name: 'Welfare loss ' + money(K.welfareLoss), items: ['a triangle', 'bounded by the market quantity and the social optimum', 'between MSC and MPB', 'what is lost by making the wrong amount'] },
        { name: 'Total external cost ' + money(K.totalExternalCost), items: ['a band of constant height', 'running from zero to the market quantity', 'between MPC and MSC', 'what the neighbours bear'] },
      ],
      why: [
        'It measures only the units beyond the optimum, where social cost exceeds private benefit, so it is bounded by both quantities and narrows to nothing at the optimum',
        'It measures the external cost on every unit made, whether or not that unit was worth making, so it runs from the origin and has the same height throughout',
      ],
    }),
  };
})();

const externalBenefitOfConsumption = (() => {
  const sid = subId('external-benefit-of-consumption');
  return {
    id: sid,
    title: 'The External Benefit of Consumption',
    keyIdea: 'With an external benefit of consumption the market settles where MPB meets MSC and the optimum where MSB meets MSC, and the triangle between them is a welfare GAIN going untaken.',
    body: [
      { type: 'paragraph', text: 'The second diagram 2d names, and the mirror of the one before it. Each Amara Skills course is worth ' + money(A.externalBenefit) + ' to people other than the person taking it.' },
      { type: 'flow', steps: [
        { title: 'Draw MPB, MSB and MSC', subtitle: 'MSB sits ' + money(A.externalBenefit) + ' above MPB at every quantity' },
        { title: 'Find the market quantity where MPB meets MPC', subtitle: 'MPC is also MSC here: ' + qty(A.marketQ) + ' ' + A.units + ' at ' + money(A.marketP) },
        { title: 'Find the social optimum where MSB meets MSC', subtitle: qty(A.optimumQ) + ' ' + A.units + ' at ' + money(A.optimumP) },
        { title: 'Shade the triangle between MSB and MSC, from the market quantity to the optimum', subtitle: 'that area is the welfare gain available' },
      ], result: 'Welfare gain = ½ × ' + money(A.externalBenefit) + ' × ' + qty(A.optimumQ - A.marketQ) + ' = ' + money(A.welfareGain) + ' ' + A.per, resultType: 'good' },
      { type: 'paragraph', text: 'Everything mirrors the cost case except the direction: the market sits **below** the optimum, because the people deciding count only what the course is worth to **them**.' },
      { type: 'paragraph', text: 'The two areas mirror it too. The **total external benefit** is ' + money(A.externalBenefit) + ' × ' + qty(A.marketQ) + ' = ' + money(A.totalExternalBenefit) + ' ' + A.per + ', which society already gets. The triangle is a different and much smaller figure.' },
      { type: 'paragraph', text: 'And it means something different from a loss. It is ' + money(A.welfareGain) + ' ' + A.per + ' **there to be had and not being taken**, because the ' + qty(A.optimumQ - A.marketQ) + ' ' + A.units + ' between the two quantities are worth more to society than they cost and nobody has a private reason to buy them. That is why 2d says "welfare loss **or gain** areas".' },
    ],
    realExample: { emoji: '💉', text: 'Vaccination is the standard case. The person vaccinated is protected — the private benefit they weigh. Everybody around them is less likely to meet the disease — the external benefit they do not.' },
    misconception: 'Students call this triangle a welfare loss too, because it is the area the diagram highlights. It is a GAIN, available and untaken. Instead: the welfare gain from moving to the social optimum.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as an accurately labelled diagram whose type may be for the student to decide. For an external benefit of consumption: MSB above MPB, one cost curve.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the reading of the Amara Skills diagram:',
      template: [
        'The market settles at ___ courses, where MPB meets MPC',
        'The social optimum is ___ courses, where MSB meets MSC',
        'Between them lies a welfare ___ of ' + money(A.welfareGain) + ' a week',
      ],
      answers: [qty(A.marketQ), qty(A.optimumQ), 'gain'],
      hints: ['the smaller of the two quantities — private choice alone', 'the larger quantity, the one that counts the benefit to everybody', 'the word the specification uses alongside "loss", and the one this case needs'],
      distractors: [qty(A.optimumQ + 5), 'loss'],
    }),
  };
})();

const marketAndSocialOptimum = (() => {
  const sid = subId('the-market-and-the-social-optimum');
  return {
    id: sid,
    title: 'The Market and the Social Optimum',
    keyIdea: 'The market position is where the two PRIVATE curves cross and the social optimum where the two SOCIAL curves do. Every diagram here is the distance between them.',
    body: [
      { type: 'paragraph', text: 'Both diagrams in this chapter make the same move, and it is worth stating on its own because it is the third bullet of 2d.' },
      { type: 'bullets', items: [
        'The **market position** is where marginal private benefit meets marginal private cost. It is where the market actually goes, because private benefit and private cost are what buyers and sellers feel.',
        'The **social optimum** is where marginal social benefit meets marginal social cost. It is where the market would go if every cost and benefit were counted.',
      ] },
      { type: 'paragraph', text: 'In the cement market MSB is the same line as MPB, so the two positions differ only because MSC is above MPC, and the market is **above** the optimum: ' + qty(K.marketQ) + ' against ' + qty(K.optimumQ) + '.' },
      { type: 'paragraph', text: 'In the courses market MSC is the same line as MPC, so the two positions differ only because MSB is above MPB, and the market is **below** the optimum: ' + qty(A.marketQ) + ' against ' + qty(A.optimumQ) + '.' },
      { type: 'paragraph', text: 'One rule covers both. **Whichever social curve has moved, the optimum moves towards it.** A cost curve up lowers the optimum quantity; a benefit curve up raises it. That is the whole of the direction question.' },
    ],
    realExample: { emoji: '🎯', text: 'Naming the social optimum is not claiming anybody can find it. Nobody knows the exact external cost of a tonne of cement. What the diagram gives is a direction and a reason, which is a more modest claim than a number.' },
    misconception: 'Students say the social optimum is where the market "should be", as if somebody chose it. It is defined by the curves: the quantity at which marginal social benefit equals marginal social cost. Instead: define it by the intersection, then say which side the market sits.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as a chain of reasoning with diagrams where appropriate, at depth rather than breadth. The chain is always four links: which curve splits, where the market goes, where the optimum is, how big the area between them is.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each market to where its two positions are and why:',
      pairs: [
        { left: 'Cement, an external cost of production', right: 'market ' + qty(K.marketQ) + ' ABOVE optimum ' + qty(K.optimumQ) },
        { left: 'Courses, an external benefit of consumption', right: 'market ' + qty(A.marketQ) + ' BELOW optimum ' + qty(A.optimumQ) },
        { left: 'A market with neither', right: 'the two positions coincide' },
      ],
      why: [
        'MSC is above MPC, so counting the external cost pulls the optimum quantity down below the market one',
        'MSB is above MPB, so counting the external benefit pushes the optimum quantity up above the market one',
        'With no externality the private curves ARE the social curves, so both intersections are the same point',
      ],
    }),
  };
})();

/* ══ Block 4 — Externalities in Five Contexts (1.3.5 · 2e) ═════════════════ */
/*
 * 2e names five contexts and the paper can ask about any of them. Every example here is generic — a
 * kind of market, never a named firm with a year attached — because accuracy-01 and accuracy-02 were
 * both dated claims about real markets that this repository could not check, and the rule after
 * packet 15 is that a real example carries no year and no figure.
 */

const transport = (() => {
  const sid = subId('externalities-in-transport');
  return {
    id: sid,
    title: 'Transport',
    keyIdea: 'A journey imposes costs on people who are not making it: delay to other travellers and emissions on people beside the road. It is an external cost of consumption.',
    body: [
      { type: 'paragraph', text: 'Transport is the first context 2e names and the one students can check against their own morning.' },
      { type: 'paragraph', text: 'The private benefit of a car journey is getting where you are going, and the private cost is the fuel, the wear and the time. Both land on the driver, and both are weighed.' },
      { type: 'paragraph', text: 'Two costs land elsewhere. Every extra vehicle on a busy road slows every other vehicle slightly — **congestion**, which is a cost paid in other people\'s time. And the emissions and noise fall on everybody along the route, most of whom are not travelling at all.' },
      { type: 'paragraph', text: 'Which kind is it? The effect comes from **using** the car, not from building it, so it is an external cost of **consumption**: MSB lies below MPB and the market makes too many journeys.' },
      { type: 'paragraph', text: 'One feature makes transport unusual and worth noting. The congestion cost is imposed by drivers **on other drivers** — so most of the people bearing the external cost are also imposing it. That does not stop it being external: each driver weighs only their own delay, not the delay they add to everybody behind them.' },
    ],
    realExample: { emoji: '🛣️', text: 'A new lane on a congested road often fills up rather than speeding traffic. At the old quantity the private cost was high because of the queue; cutting it brings more journeys until the queue returns.' },
    misconception: 'Students call congestion an external cost of production because it involves vehicles. The vehicles were built somewhere else; what causes the delay is somebody DRIVING one. Instead: ask what activity causes the effect, and here it is the journey, which is consumption.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning with any relevant data interpreted. For a transport question the chain runs: an extra journey adds delay to others, that cost is not in the driver\'s decision, MSB sits below MPB, so more journeys are made than the social optimum.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each cost of a car journey by who bears it — the driver, or somebody else.',
      groups: [
        { name: 'Private cost — the driver', items: ['the fuel', 'the wear on the vehicle', 'the driver\'s own time in the queue'] },
        { name: 'External cost — other people', items: ['the delay added to every driver behind', 'the emissions along the route', 'the noise for people living beside the road'] },
      ],
      why: [
        'The driver pays or feels these directly, so they are already in the decision to travel',
        'These land on people who are not in the car, so nobody in the transaction weighs them',
      ],
    }),
  };
})();

const healthAndEducation = (() => {
  const sid = subId('externalities-in-health-and-education');
  return {
    id: sid,
    title: 'Health and Education',
    keyIdea: 'Health and education both carry large external benefits of consumption, so the market provides less of each than the social optimum.',
    body: [
      { type: 'paragraph', text: 'Two of the five contexts, taken together because they are the same diagram — the Amara Skills one — with different content.' },
      { type: 'paragraph', text: 'In **health**, a person who is treated or vaccinated gains the private benefit of being well. Everybody around them gains too: an infection that is not passed on, a colleague who is at work, a family that is not caring for somebody. Those benefits are not in the price of the treatment.' },
      { type: 'paragraph', text: 'In **education**, the person who studies gains the qualification and the pay that follows. The external benefits are slower and larger: employers who repeat fewer instructions, colleagues who learn alongside, and a labour force more productive than the sum of its qualifications.' },
      { type: 'paragraph', text: 'Both are external benefits of **consumption** — they come from somebody being treated or being taught, not from a clinic or a school being run. So in both, MSB lies above MPB and the market quantity sits below the social optimum.' },
      { type: 'paragraph', text: 'One difference links to a later chapter. In education the gain arrives years after the choice; in health it often arrives as something that **does not** happen. Both are hard to weigh, so a situation can be an externality and an information problem at once.' },
    ],
    realExample: { emoji: '🏥', text: 'The clearest case in health is a disease that spreads. One more person vaccinated also protects everybody they would have met, including people who cannot be vaccinated at all. A disease you never catch leaves no impression, which is why the private benefit is hardest to feel.' },
    misconception: 'Students say education and health are public goods. A school place is rival — one child fills it — and excludable, and so is a treatment. They are private goods with large external benefits, which is a different diagram.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as analysis and evaluation with a brief assessment of the arguments. On education that assessment turns on the SIZE of the external benefit, which is genuinely uncertain.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each benefit to whether it is private or external, and to who receives it:',
      pairs: [
        { left: 'The pay rise after a qualification', right: 'private — the person who studied' },
        { left: 'A colleague who learns on the job alongside them', right: 'external — somebody who did not pay' },
        { left: 'Being protected by a vaccination', right: 'private — the person vaccinated' },
        { left: 'An outbreak that does not happen', right: 'external — everybody who was not infected' },
      ],
      why: [
        'It goes to the person who bore the cost of the course, so it is already in their decision',
        'It goes to somebody who paid nothing and made no choice, so it is outside the transaction',
        'It goes to the person who chose the treatment, so it is what they weighed',
        'It goes to people who never knew they were at risk, which is why nobody pays for it',
      ],
    }),
  };
})();

const environment = (() => {
  const sid = subId('externalities-in-the-environment');
  return {
    id: sid,
    title: 'Environment',
    keyIdea: 'Environmental externalities are mostly external costs of production, and their distinguishing feature is that the people bearing them may be distant in space or in time.',
    body: [
      { type: 'paragraph', text: 'The fourth context, and the one where the externality is usually a **cost of production**: a discharge into a river, emissions from a chimney, land left unusable.' },
      { type: 'paragraph', text: 'The diagram is the Kumbe Cement one exactly: MSC above MPC by the damage per unit, the market beyond the social optimum, and the welfare loss the triangle between them.' },
      { type: 'paragraph', text: 'Two things make environmental cases harder than the diagram suggests, and both are good evaluation material.' },
      { type: 'flow', steps: [
        { title: 'The producer pays for inputs but not for the damage', subtitle: 'the damage has no invoice' },
        { title: 'Marginal private cost therefore lies below marginal social cost', subtitle: 'the two curves separate by the damage per unit' },
        { title: 'Output runs beyond the social optimum', subtitle: 'the market meets where the PRIVATE curves cross' },
        { title: 'A welfare loss builds up over every unit past the optimum', subtitle: 'each of those units costs society more than it is worth' },
      ], result: 'Too much produced, and a welfare loss that grows with the gap', resultType: 'bad' },
      { type: 'bullets', items: [
        '**The people affected may not be born yet.** A cost arriving in fifty years is still an external cost, but nobody who bears it can object now.',
        '**The effect may cross borders.** A river runs through several countries and air moves, so no single authority faces the whole problem.',
      ] },
      { type: 'paragraph', text: 'Neither point changes the diagram. Both change what can be done about it, which is 1.3.6\'s question rather than this section\'s.' },
    ],
    realExample: { emoji: '🏞️', text: 'A river running through farmland, a town and an industrial area collects something from each. The further downstream you are, the more of other people\'s decisions you are carrying.' },
    misconception: 'Students treat every environmental problem as a production externality. Some are consumption: emissions from driving a car or heating a home come from USING the good. Instead: ask whether the damage happens in the making or the using.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as chains of reasoning with recognition of different viewpoints. Here three are available: the producer, the people bearing the cost, and people not yet affected.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages into causal order, from what the producer sees to what society loses:',
      correctOrder: [
        'Nobody sends the factory an invoice for the damage',
        'Private cost therefore sits below the cost to society',
        'More is produced than the social optimum',
        'A welfare loss builds over every unit past that point',
      ],
      why: [
        'The damage has no invoice, which is the whole reason it stays out of the cost the producer weighs',
        'The two curves separate by exactly the value of the damage per unit',
        'The market meets where the two PRIVATE curves cross, which is to the right of where the social ones do',
        'Each unit past the optimum costs society more than it is worth, and the triangle adds those shortfalls up',
      ],
    }),
  };
})();

const financial = (() => {
  const sid = subId('externalities-in-financial-markets');
  return {
    id: sid,
    title: 'Financial',
    keyIdea: 'In financial markets the external cost is that one firm\'s failure damages firms and people who had no part in the decision that caused it.',
    body: [
      { type: 'paragraph', text: 'The fifth context, and the one that looks least like a chimney. The external cost here is not physical: it is that financial firms are connected to each other and to everybody else.' },
      { type: 'paragraph', text: 'A bank decides how much risk to take by weighing what it gains against what it could lose. That is its private calculation, and it is a reasonable one.' },
      { type: 'paragraph', text: 'What it does not weigh is what happens to everybody else if the risk arrives. A failing bank does not fail alone: depositors lose savings, firms that borrowed from it lose their credit, other banks that lent to it take losses, and people who never dealt with it find borrowing harder. Those are external costs of the bank **producing** its service.' },
      { type: 'paragraph', text: 'So the diagram is the production one again — MSC above MPC, too much risk taken relative to the social optimum — and the size of the gap depends on how connected the firm is rather than on how large it is.' },
      { type: 'paragraph', text: 'This context carries two other sources as well. Depositors cannot see how much risk a bank runs, which is **imperfect market information**, and a bank expecting rescue takes more risk, which is **moral hazard**. A strong answer says which it is analysing.' },
    ],
    realExample: { emoji: '🏦', text: 'A bank in trouble sells assets to raise cash, lowering their price and weakening every other firm holding them — so one firm\'s attempt to survive makes its neighbours less able to.' },
    misconception: 'Students describe financial failures as caused by dishonesty. This diagram works perfectly well with everybody in it honest and weighing only their own risk, which is what makes it a market failure rather than a crime.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as multi-stage chains of reasoning with informed judgements. Naming WHICH source you are using — externality, information or moral hazard — matters, because the three imply different chains.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A bank takes on more risk than it can absorb. Sort each consequence by whether it falls on the bank itself or on somebody outside it.',
      groups: [
        { name: 'Private — the bank', items: ['its own losses on the bad loans', 'the value of the business to its owners'] },
        { name: 'External — everybody else', items: ['depositors who lose savings', 'firms that lose their credit', 'other banks holding the same assets', 'people who find borrowing harder afterwards'] },
      ],
      why: [
        'These are the losses the bank itself weighed when it decided how much risk to take',
        'These land on people who were not party to the decision, so no part of them entered the bank\'s calculation',
      ],
    }),
  };
})();

const fromContextToDiagram = (() => {
  const sid = subId('from-a-context-to-a-diagram');
  return {
    id: sid,
    title: 'From a Context to a Diagram',
    keyIdea: 'Three questions turn any of the five contexts into the right diagram: cost or benefit, production or consumption, and which side of the optimum the market sits.',
    body: [
      { type: 'paragraph', text: 'The five contexts are not five things to memorise. They are five places the same three questions get asked, and the questions are always in this order.' },
      { type: 'flow', steps: [
        { title: 'Ask whether it is an external cost or an external benefit', subtitle: 'a cost separates the cost curves; a benefit separates the benefit curves' },
        { title: 'Does it come from making the good or using it?', subtitle: 'making moves a COST curve; using moves a BENEFIT curve' },
        { title: 'Draw the two positions and read the direction', subtitle: 'market where the private curves cross, optimum where the social ones do' },
        { title: 'Identify the area between them', subtitle: 'a loss if the market is beyond the optimum, a gain available if it is short of it' },
      ], result: 'The right diagram for any context the paper names', resultType: 'good' },
      { type: 'paragraph', text: 'Run it on the five. Transport: a cost, from using, so MSB below MPB and too many journeys. Health and education: a benefit, from using, so MSB above MPB and too little. Environment and financial: a cost, from making, so MSC above MPC and too much.' },
      { type: 'paragraph', text: 'Four of the five come out of those three questions without anything being remembered about the context itself. That is the point of learning the questions rather than the list.' },
    ],
    realExample: { emoji: '🔁', text: 'This is how to handle a context you have never thought about. The questions need no knowledge of the industry, only who is affected and whether it happens in the making or the using.' },
    misconception: 'Students revise the five contexts as five separate cases with five separate diagrams. There are only two diagrams in this whole chapter and the contexts choose between them. Instead: learn the two diagrams properly and use the three questions to pick one.',
    examMatters: 'Appendix 6 defines Draw (4 marks, WEC11) as constructing an accurately labelled diagram and says students may be required to decide on the type of diagram. These three questions ARE that decision, and getting them right before drawing is worth more than drawing quickly.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four steps into the order in which you would work through them, from the first decision to the finished diagram:',
      correctOrder: [
        'Decide whether it is an external cost or an external benefit',
        'Work out whether it comes from making the good or using it',
        'Put both positions on the axes and read the direction',
        'Name the area between them, as a loss or a gain',
      ],
      why: [
        'Cost or benefit decides which pair of curves separates, so nothing else can be settled first',
        'Making or using decides WHICH curve of that pair moves, and the answer to the first question does not tell you',
        'With the right curve moved, both intersections can be found and the direction read off',
        'The area needs both quantities, so it comes last — and its name depends on which side the market is',
      ],
    }),
  };
})();

/* ══ Block 5 — Public Goods and the Free-Rider Problem (1.3.5 · 3) ═════════ */
/*
 * accuracy-01 is the claim that private markets produce ZERO public goods, which the section made in
 * a body paragraph and in a block takeaway while its own misconception card on the same screen said
 * that exact claim is a mistake. 3b's words are "why public goods MAY NOT be provided by the private
 * sector". The fourth subsection exists to hold that distinction on its own.
 *
 * accuracy-02 is the lighthouse example, which was wrong about who paid for lighthouses and used the
 * standard counterexample to private provision as if it supported public provision. It is removed
 * rather than corrected: a corrected version is a dated claim about a real market and a UK
 * institution, and the rule after packet 15 is that neither survives.
 */

const privateGoods = (() => {
  const sid = subId('private-goods');
  return {
    id: sid,
    title: 'Private Goods: Rival and Excludable',
    keyIdea: 'A private good is rival — one person\'s use leaves less for everybody else — and excludable: somebody who does not pay can be kept from it.',
    body: [
      { type: 'paragraph', text: 'Almost everything bought and sold is a private good, and the specification asks for the definition because the contrast with public goods is the whole of this chapter.' },
      { type: 'paragraph', text: '**Rival** means that one person\'s use reduces what is left for others. A seat on a bus is rival: if you are in it, nobody else is. A loaf you eat is not available to anybody else.' },
      { type: 'paragraph', text: '**Excludable** means that somebody who has not paid can be prevented from having it. A fare, a lock, a ticket barrier, a password: any of these makes a good excludable, and excludability is what makes it possible to sell something at all.' },
      { type: 'paragraph', text: 'Those two properties are why ordinary markets work. Because the good is excludable, a seller can charge for it; because it is rival, the buyer has a reason to pay rather than wait for somebody else to.' },
      { type: 'paragraph', text: 'Both tests are needed, and both halves of the distinction: a good can fail one test and pass the other, which is what the near misses in the next subsection turn on.' },
    ],
    realExample: { emoji: '🚌', text: 'A bus seat is the cleanest private good there is. It is rival because the seat is either yours or somebody else\'s, and it is excludable because a fare keeps a non-payer off. That is why buses can be sold as journeys, and it is what a public good is defined against.' },
    misconception: 'Students think "private good" means something owned by a private firm and "public good" means something a government provides. Neither definition mentions who provides it: both are about the properties of the good. Instead: rival and excludable, or non-rival and non-excludable.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as giving the meaning of a term. For a private good the two marks are the two properties, and an answer that gives one has given one of them — the pair is the definition.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the two tests for a private good:',
      template: [
        'It is ___: one person\'s use leaves less for everybody else',
        'It is ___: somebody who does not pay can be kept from it',
        'Both together are why a seller can ___ for it',
      ],
      answers: ['rival', 'excludable', 'charge'],
      hints: ['the property about whether use by one reduces what is left', 'the property about whether a non-payer can be kept out', 'what excludability makes possible in the first place'],
      distractors: ['scarce', 'private'],
    }),
  };
})();

const publicGoods = (() => {
  const sid = subId('public-goods');
  return {
    id: sid,
    title: 'Public Goods: Non-Rival and Non-Excludable',
    keyIdea: 'A public good is non-rival — one person\'s use leaves no less for anybody else — and non-excludable: nobody can be kept from it, whether they pay or not.',
    body: [
      { type: 'paragraph', text: 'A public good is the exact negative of a private good on both tests, and both have to fail for the good to qualify.' },
      { type: 'paragraph', text: '**Non-rival** means one person\'s use does not reduce what is available to anybody else. If a sea wall shelters your house, it shelters your neighbour\'s no less. Nothing is used up.' },
      { type: 'paragraph', text: '**Non-excludable** means nobody can be kept from the benefit. A sea wall cannot be built to shelter only the households that contributed; the protection reaches everybody behind it whatever they paid.' },
      { type: 'paragraph', text: 'Both tests matter and they are independent. A crowded road is non-excludable but very much rival — every extra vehicle takes space from the rest. A film on a subscription service is non-rival, because your watching costs nobody else a viewing, but it is excludable. Neither is a public good.' },
      { type: 'paragraph', text: 'Only a good that fails both tests is a public good, and it is the combination that causes the trouble in the next subsection. Non-excludability is what makes it unsellable; non-rivalry is what makes it worth having anyway.' },
    ],
    realExample: { emoji: '🌊', text: 'Coastal flood defences are the standard example because both tests are so clearly failed. The wall cannot be told to protect one house and not the one beside it, and protecting one more house behind it uses none of the protection up.' },
    misconception: 'Students call anything provided free or by a government a public good — schools, clinics, buses. A school place is rival and excludable, so it is a private good with a large external benefit. Instead: apply both tests to the GOOD, not to whoever happens to pay for it.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring knowledge, understanding and application when explaining characteristics. For a public good, application means applying both tests to the good in the question rather than reciting the definition.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each good by the two tests: does it fail both, one, or neither?',
      groups: [
        { name: 'Public good — fails both', items: ['coastal flood defences', 'a flood warning siren'] },
        { name: 'Fails one test only', items: ['a crowded road — non-excludable but rival', 'a subscription film — non-rival but excludable'] },
        { name: 'Private good — fails neither', items: ['a seat on a bus', 'a loaf of bread'] },
      ],
      why: [
        'Nobody can be kept from it and one person\'s use leaves no less for anybody else, so it cannot be sold and is worth having anyway',
        'Failing one test is not enough: a good has to fail BOTH to be a public good, which is why these two are the useful near-misses',
        'It is rival and excludable, so a seller can charge for it and buyers have a reason to pay',
      ],
    }),
  };
})();

const freeRiderProblem = (() => {
  const sid = subId('the-free-rider-problem');
  return {
    id: sid,
    title: 'The Free-Rider Problem',
    keyIdea: 'Because a public good is non-excludable, each person gains by letting somebody else pay — so when everybody reasons that way, too little is paid for and too little provided.',
    body: [
      { type: 'paragraph', text: 'The free-rider problem is caused by **non-excludability**, and by nothing else. That is worth stating plainly, because the wrong answer here \u2014 that free-riding follows from non-rivalry \u2014 is the one most often given.' },
      { type: 'paragraph', text: 'Here is the reasoning from one person\'s side. The sea wall will protect me whether or not I contribute. If enough others pay, I get the protection for nothing. If they do not, my contribution alone was never going to build it. **Either way I am better off not paying** — and that is true for everybody, which is what makes it a problem rather than one person behaving badly.' },
      { type: 'flow', steps: [
        { title: 'The good is non-excludable', subtitle: 'a non-payer cannot be kept from the benefit' },
        { title: 'Free-riding therefore becomes possible', subtitle: 'wait, pay nothing, and receive it anyway' },
        { title: 'Few choose to pay', subtitle: 'each gains by waiting whatever anybody else does' },
        { title: 'Revenue falls short of the cost', subtitle: 'a seller cannot cover what provision costs' },
      ], result: 'Too little of a good that everybody would want provided', resultType: 'bad' },
      { type: 'paragraph', text: 'Free-riding is not laziness and not dishonesty: it is the rational response to a good nobody can charge you for. Explaining it as selfishness stops short of the mechanism.' },
    ],
    realExample: { emoji: '🕯️', text: 'The same structure appears wherever a benefit cannot be withheld: a street safer if everybody left a light on, a shared stairwell that needs cleaning. Everybody wants the result and each gains by waiting.' },
    misconception: 'Students attribute free-riding to non-rivalry. Non-rivalry means your use costs nobody else anything, which gives you no reason to avoid PAYING. What does is non-excludability: you cannot be kept out. Instead: free-riding follows from non-excludability.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as including analysis when explaining a reason, requiring a two-stage chain of reasoning. For free-riding the two stages are: non-excludability means a non-payer cannot be kept out, so each person\'s best choice is to wait — and the second stage is the one that is usually missing.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four stages into causal order, from the property of the good to what it does to provision:',
      correctOrder: [
        'Being non-excludable, the good cannot keep anybody out',
        'Waiting for somebody else to pay becomes the sensible move',
        'Hardly anybody will choose to pay',
        'What comes in falls short of what provision costs',
      ],
      why: [
        'Non-excludability is the property that starts it; non-rivalry gives nobody a reason to avoid paying',
        'Being unable to be kept out is exactly what makes waiting an option',
        'Each individual is better off waiting whatever anybody else does, so waiting is general rather than exceptional',
        'With few paying, what comes in is below what provision costs, and a private seller cannot proceed',
      ],
    }),
  };
})();

const mayNotNotCannot = (() => {
  const sid = subId('may-not-not-cannot');
  return {
    id: sid,
    title: 'May Not, Not Cannot',
    keyIdea: 'The specification says public goods MAY NOT be provided by the private sector. Under-provision is the claim; zero provision is not, and there are real cases of private provision.',
    body: [
      { type: 'paragraph', text: 'This subsection exists because of one word, and the word is in the specification: 3b asks "why public goods **may not** be provided by the private sector, making reference to the free-rider problem".' },
      { type: 'paragraph', text: 'May not is not cannot. The free-rider argument shows that **less is paid for than people actually want**: under-provision. It does not show the quantity is zero, and claiming so is stronger than the specification and false.' },
      { type: 'paragraph', text: 'Private provision of non-excludable goods does happen, and it is worth knowing why, because the reasons are the counter-arguments an evaluation question wants.' },
      { type: 'bullets', items: [
        '**One party may gain enough alone.** If a single landowner benefits enough from a sea wall to justify building it, they will, and everybody else free-rides on a wall that exists.',
        '**The benefit can sometimes be bundled with something excludable.** A good that cannot be sold on its own can be sold attached to one that can.',
        '**Small groups can agree.** Where the people benefiting are few enough to know each other, they can negotiate a contribution in a way a whole country cannot.',
      ] },
      { type: 'paragraph', text: 'So the claim to write is that the private sector provides **less than the socially optimal quantity**, and may provide none — not that it provides none.' },
    ],
    realExample: { emoji: '🤝', text: 'The size of the group usually decides it. Six households sharing a track can agree to resurface it: each can see who contributed and the shares are large enough to matter. Six million people cannot.' },
    misconception: 'Students finish the free-rider argument with "so the free market provides none of it at all". The argument does not reach that far: it shows under-provision. Instead write: the private sector provides less than the socially optimal amount, and in some cases none.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as considering the validity and significance of arguments, with recognition of different viewpoints. The counter-argument that private provision sometimes happens is exactly that, and it needs a reason.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it is what the specification claims or a stronger claim than it makes.',
      groups: [
        { name: 'What the specification claims', items: ['less than the socially optimal quantity is provided', 'a seller cannot collect enough to cover the cost', 'a party who gains enough alone may still build it'] },
        { name: 'Stronger than the specification, and false', items: ['private markets produce a quantity of zero', 'a public good can never be provided without a government'] },
      ],
      why: [
        'Each of these is something the free-rider argument actually establishes: too little is paid for, so revenue falls short — and none of it rules out a single party providing the good for reasons of their own',
        'A party who gains enough alone will build it and others will free-ride on what exists, and small groups can agree to contribute — so "never" and "zero" both overstate the argument',
      ],
    }),
  };
})();

/* ══ Block 6 — Imperfect Market Information (1.3.5 · 4) ════════════════════ */
/*
 * The March section called this block "Information Failures" and its subsection "Information
 * Failure". `information failure` is 0 in econ_spec.txt; the spec says "imperfect market information"
 * (2) and "information gaps" (3). specGap-01 is that symmetric information was never defined, so the
 * distinction 4a asks for had one side. specThin-01 is that healthcare was named at 4c and never
 * explained.
 */

const symmetricAndAsymmetric = (() => {
  const sid = subId('symmetric-and-asymmetric-information');
  return {
    id: sid,
    title: 'Symmetric and Asymmetric Information',
    keyIdea: 'Information is symmetric when both sides of a transaction know the same things, and asymmetric when one side knows more than the other.',
    body: [
      { type: 'paragraph', text: 'The specification asks for a distinction, which means both halves of it.' },
      { type: 'paragraph', text: '**Symmetric information** means both sides know the same things about what is being traded. Neither can take advantage of the other, because there is nothing either knows that the other does not.' },
      { type: 'paragraph', text: '**Asymmetric information** means one side knows more. The seller of a used car knows how it has been driven and what has been repaired; the buyer knows what they can see in an hour. The seller of insurance knows the average risk; the buyer knows their own.' },
      { type: 'paragraph', text: 'One point is easy to miss and is worth holding on to. **Symmetric is not the same as complete.** Two people can be equally, and badly, informed — neither knowing how long a roof will last — and that is still symmetric. What makes information symmetric is that the knowledge is **equal**, not that it is full.' },
      { type: 'paragraph', text: 'The two fail differently. Under asymmetry the better-informed side can gain at the other\'s expense; where both are equally ill-informed, nobody exploits anybody and the choice is still wrong.' },
    ],
    realExample: { emoji: '🚙', text: 'A used car is the standard illustration because the asymmetry is so one-sided: everything that matters happened while the seller owned it. A buyer who cannot tell a well-kept car from a neglected one will not pay a well-kept price, which pushes the best cars out.' },
    misconception: 'Students treat symmetric information as meaning perfect information. It means equal, not complete: two people who both know very little have symmetric information. Instead: asymmetric is about the GAP between what the two sides know.',
    examMatters: 'Appendix 6 defines Define (2 marks, WEC11) as giving the meaning of a term. For asymmetric information the meaning is the inequality — one party to a transaction has more or better information than the other — and naming which party usually knows more is the application rather than the definition.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each situation by whether the information is symmetric, asymmetric, or a gap on both sides.',
      groups: [
        { name: 'Symmetric', items: ['both sides read the same published price list', 'two traders watching the same screen'] },
        { name: 'Asymmetric', items: ['a used car and its service history', 'a buyer of insurance who knows their own risk'] },
        { name: 'A gap on both sides', items: ['nobody knows how long a new material will last', 'neither side can tell what a course will be worth in ten years'] },
      ],
      why: [
        'Both sides hold the same information, so neither can gain at the other\'s expense',
        'One side holds something the other needs and does not have, and can act on that advantage',
        'Both sides are equally badly informed, so nobody exploits anybody and the choice is still made on too little',
      ],
    }),
  };
})();

const informationGaps = (() => {
  const sid = subId('information-gaps');
  return {
    id: sid,
    title: 'Information Gaps',
    keyIdea: 'An information gap is knowledge missing on one side or both, and its significance is that choices made through it allocate resources to things the facts would not support.',
    body: [
      { type: 'paragraph', text: '1.3.5 · 4b asks for "the significance of information gaps" — a question about consequences, not definitions.' },
      { type: 'paragraph', text: 'An **information gap** is knowledge missing when a choice has to be made — on one side, which is asymmetry, or on both.' },
      { type: 'paragraph', text: 'Its significance is that the demand curve stops meaning what it should. It is built from willingness to pay, which should reflect what the thing is worth; through a gap it reflects what people **believe** it is worth.' },
      { type: 'flow', steps: [
        { title: 'Knowledge is missing when the choice is made', subtitle: 'on one side, or on both' },
        { title: 'Willingness to pay reflects a belief, not the value', subtitle: 'people act on what they believe' },
        { title: 'The demand curve sits away from marginal social benefit', subtitle: 'it is built from beliefs' },
        { title: 'Quantity traded is not the socially optimal one', subtitle: 'the curves cross in the wrong place' },
      ], result: 'The same failure as an externality, by a different route', resultType: 'bad' },
      { type: 'paragraph', text: 'Nothing lands on a third party here, which is what makes the route different. The symptom is identical.' },
      { type: 'paragraph', text: 'Three features decide how serious a gap is: how **large** it is, how **costly** the mistake, and how **hard** it is to close.' },
    ],
    realExample: { emoji: '🧾', text: 'A product whose real cost shows up over years rather than at the counter is the common case: the running cost of an appliance, the fee structure of a long contract. Nothing is hidden dishonestly; the information is just harder to get at than the label price.' },
    misconception: 'Students treat an information gap as the same thing as asymmetric information. Asymmetry is one kind of gap, the kind where one side holds the knowledge. A gap can be on both sides at once, and then nobody is better informed.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as analysis and evaluation with a brief assessment of the arguments. Here it is about SIGNIFICANCE, which is the word 4b itself uses: how large the gap is, how costly the mistake, how easily it could be closed.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages into causal order, from the gap to the misallocation:',
      correctOrder: [
        'Something the choice needs is missing',
        'What people pay reflects a belief instead',
        'Demand no longer tracks marginal social benefit',
        'The quantity traded is the wrong one',
      ],
      why: [
        'The gap is the starting condition: something needed for the decision is not available at the time of it',
        'People can only act on what they believe, so the curve is built from beliefs rather than from values',
        'A demand curve built from wrong beliefs is in the wrong place relative to what the good is actually worth',
        'The quantity is read off where the curves cross, so a curve in the wrong place gives a quantity in the wrong place',
      ],
    }),
  };
})();

const healthcareAndInsurance = (() => {
  const sid = subId('information-in-healthcare-and-insurance');
  return {
    id: sid,
    title: 'Healthcare and Insurance',
    keyIdea: 'In healthcare the person advising a treatment knows more; in insurance the buyer knows their own risk better. The asymmetry runs in opposite directions.',
    body: [
      { type: 'paragraph', text: 'Two of the four contexts 4c names, and the pair is worth taking together because the information sits on opposite sides.' },
      { type: 'paragraph', text: 'In **healthcare** the advantage is with the **seller**. A patient cannot judge whether a treatment is necessary, whether a cheaper one would do, or whether the diagnosis is right — the person who can judge is the one recommending it, and often the one paid for it. The patient\'s willingness to pay is therefore built on somebody else\'s judgement, which is not what a demand curve is supposed to be built on.' },
      { type: 'paragraph', text: 'Two things follow, in opposite directions. Treatment may be taken that full knowledge would not have chosen, and treatment may be **avoided** that should have been taken, because a person who cannot judge a recommendation may not trust it.' },
      { type: 'paragraph', text: 'In **insurance** the advantage is with the **buyer**. Somebody knows how carefully they drive, how healthy they are, how secure their home is; the insurer knows only what it can observe and the average of everybody like them.' },
      { type: 'paragraph', text: 'So the insurer prices for the average: high for the low-risk and low for the high-risk, which makes the cover least attractive to exactly the people who would make it cheapest.' },
    ],
    realExample: { emoji: '🩺', text: 'The case is sharpest where the person recommending a treatment is also paid for providing it. That is no accusation of dishonesty: even a scrupulous adviser cannot un-know what they know, and the patient cannot weigh the recommendation.' },
    misconception: 'Students say the patient simply needs to be better informed. Much of this gap cannot be closed: the knowledge takes years to acquire and the decision has to be made now. Instead: say what the gap DOES to the quantity, which is what 4c asks for.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as requiring a chain of reasoning, focusing on depth rather than breadth. On a 4c context that means following ONE of the four contexts through to the quantity, rather than naming all four.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each statement to the context and the side of the deal it describes:',
      pairs: [
        { left: 'The person advising the treatment knows more', right: 'healthcare — the seller\'s advantage' },
        { left: 'A patient may refuse a recommendation they cannot judge', right: 'healthcare — treatment avoided' },
        { left: 'The buyer knows their own risk better than the seller', right: 'insurance — the buyer\'s advantage' },
        { left: 'Cover is priced for an average that fits almost nobody', right: 'insurance — the result of that advantage' },
      ],
      why: [
        'Only the person recommending a treatment can judge whether it is needed, so the patient\'s willingness to pay is built on somebody else\'s judgement',
        'The gap runs both ways: a person who cannot weigh a recommendation may decline treatment that they needed',
        'The insurer can observe only what is on the form and the average of everybody like the applicant',
        'Pricing for the average makes the cover expensive for the low-risk and cheap for the high-risk, so it fits neither',
      ],
    }),
  };
})();

const educationAndPensions = (() => {
  const sid = subId('information-in-education-and-pensions');
  return {
    id: sid,
    title: 'Education and Pensions',
    keyIdea: 'In education and pensions the gap is about time: the cost is paid now and the consequence arrives years or decades later, so neither side can weigh it properly.',
    body: [
      { type: 'paragraph', text: 'The other two contexts 4c names, and the pair is different in kind from the first two. Nobody here is better informed than anybody else. The gap is between **now and later**.' },
      { type: 'paragraph', text: 'In **education**, the cost of a course is paid at the start and the benefit arrives over a working life. Somebody choosing at seventeen has to estimate what a subject will be worth in an economy that will have changed — and so does everybody advising them.' },
      { type: 'paragraph', text: 'That produces two failures at once: too little education is bought, because a distant benefit is discounted against a cost paid today, and some of it is the wrong kind.' },
      { type: 'paragraph', text: 'In **pensions** the same structure is stretched further. The cost of saving too little has **no visible consequence for decades**, and by the time it appears the choice cannot be remade. A person in their twenties is being asked to weigh a certain loss of income now against an uncertain shortfall in forty years.' },
      { type: 'paragraph', text: 'The common feature is that the market gives no feedback in time to be useful. In an ordinary market a bad choice shows up quickly; here it shows up once, at the end.' },
    ],
    realExample: { emoji: '⏳', text: 'The pension case is unusual in that the information is not hidden: the arithmetic of compound saving is published everywhere. What is missing is the ability to weigh it against a cost felt today.' },
    misconception: 'Students treat these as the used-car case, with one side exploiting the other. Nobody has the advantage: the provider does not know what the saver will need any better than the saver does. Instead: the gap is between the moment of choice and the moment of consequence.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as requiring recognition of different viewpoints and a critical assessment of the evidence. On pensions, one genuine viewpoint is that the gap cannot be closed by information at all.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each of the four contexts 4c names by where the gap lies: between the two sides, or between now and later.',
      groups: [
        { name: 'Between the two sides', items: ['healthcare — the adviser knows more', 'insurance — the buyer knows their own risk'] },
        { name: 'Between now and later', items: ['education — the return arrives over a working life', 'pensions — the shortfall appears in forty years'] },
      ],
      why: [
        'One party holds knowledge the other needs, so the better-informed side can act on the difference',
        'Both parties are equally in the dark, because what is missing has not happened yet and no amount of asking will produce it',
      ],
    }),
  };
})();

/* ══ Block 7 — Moral Hazard (1.3.5 · 5) ════════════════════════════════════ */
/*
 * The chapter two findings asked this packet to delete. specGap-06 files moral hazard under "WEC14
 * Unit 4 financial market failure" and topFix-04 asks for it to be moved out of the section; it is
 * 1.3.5 · 5 at econ_spec.txt:781-785, with three leaves, and `moral hazard` is five hits in the
 * Economics specification. The March section gave it half of one subsection, shared with adverse
 * selection — which IS zero in the specification and is gone.
 */

const howMoralHazardOccurs = (() => {
  const sid = subId('how-moral-hazard-occurs');
  return {
    id: sid,
    title: 'How Moral Hazard Occurs',
    keyIdea: 'Moral hazard is a change in behaviour that happens after a risk has been covered, because the cost of the risk now falls on somebody else.',
    body: [
      { type: 'paragraph', text: 'Moral hazard has an unhelpful name: it is not about morals and nobody is doing anything wrong. It is about what happens to care when its cost moves.' },
      { type: 'paragraph', text: 'Somebody bears a risk and takes care, because if it goes wrong the cost is theirs. Then the risk becomes **covered** — by insurance, a guarantee, or an expected rescue — so the cost lands elsewhere, and so does some of the reason for the care.' },
      { type: 'flow', steps: [
        { title: 'Somebody bears a risk', subtitle: 'and takes care, because the cost would fall on them' },
        { title: 'The risk becomes covered', subtitle: 'by insurance, a guarantee, or an expected rescue' },
        { title: 'The cost now falls elsewhere', subtitle: 'so the reason for that care is weaker' },
        { title: 'Behaviour changes and the cover cannot see it', subtitle: 'so the cover is still priced for the old behaviour' },
      ], result: 'More risk taken than was priced, and nobody has done anything dishonest', resultType: 'bad' },
      { type: 'paragraph', text: 'The last step is what makes it a market failure rather than a preference. If the insurer could observe the change, the premium would move to match it. It is because the change is **unobserved** that it goes unpriced.' },
      { type: 'paragraph', text: 'And the timing is the test. Moral hazard is behaviour **after** the cover is in place. A choice made before it, such as buying cover because you know you are high-risk, is a different problem.' },
    ],
    realExample: { emoji: '🔑', text: 'The everyday version needs no financial market. Somebody who has just insured a bicycle may lock it a little less carefully than the week before — not deliberately. The cost of the lapse has moved, and behaviour drifts with it.' },
    misconception: 'Students explain moral hazard as cheating an insurer. Fraud is a crime, not a market failure: moral hazard is ordinary care weakening once the cost of a mistake falls elsewhere.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain of reasoning when explaining a reason. Here they are: the cost of the risk moves to somebody else, so the incentive to take care weakens.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the mechanism this chapter opens with:',
      template: [
        'A risk becomes ___, so its cost falls on somebody else',
        'The incentive to take ___ is therefore weaker',
        'The change in behaviour is ___, so it is never priced into the cover',
      ],
      answers: ['covered', 'care', 'unobserved'],
      hints: ['what insurance or a guarantee does to a risk', 'what weakens once the cost of a mistake lands elsewhere', 'the property of the behaviour change that stops the premium adjusting'],
      distractors: ['profitable', 'dishonest'],
    }),
  };
})();

const moralHazardInInsurance = (() => {
  const sid = subId('moral-hazard-in-insurance');
  return {
    id: sid,
    title: 'Moral Hazard in Insurance',
    keyIdea: 'Insurance creates moral hazard by design: it moves the cost of a loss from the person who can prevent it to somebody who cannot, and premiums rise for everybody as a result.',
    body: [
      { type: 'paragraph', text: 'The first of the two contexts 5b names, and the clearest: the cover is explicit and priced.' },
      { type: 'paragraph', text: 'Insurance works by moving a cost. That is the product, not a flaw. But the person who can most cheaply prevent the loss is the insured — exactly who the cost has moved away from.' },
      { type: 'paragraph', text: 'So care weakens, claims are more frequent than the premium assumed, and premiums rise on **everybody**.' },
      { type: 'flow', steps: [
        { title: 'The cover moves the cost of a loss away from the insured', subtitle: 'the product, not a defect' },
        { title: 'Care weakens and claims become more frequent', subtitle: 'the person who could prevent the loss no longer bears it' },
        { title: 'Premiums rise to cover the claims', subtitle: 'an insurer prices for the claims it meets' },
        { title: 'People whose care never changed pay more', subtitle: 'the premium is the same for everybody alike' },
      ], result: 'An external cost inside an insurance market', resultType: 'bad' },
      { type: 'paragraph', text: 'That last step is where the external cost is: one person\'s weakened care raises the price of cover for strangers.' },
      { type: 'paragraph', text: 'It is also why cover is almost never complete. An excess, a no-claims discount, a policy that pays part of a loss: each leaves enough of the cost with the insured that the reason for care survives.' },
    ],
    realExample: { emoji: '🚲', text: 'The excess is the design responding to the problem. A policy paying the whole of every loss removes the last reason to be careful; leaving the first part with the insured keeps some of it in place.' },
    misconception: 'Students conclude that insurance is bad because it causes moral hazard. The cover is worth having: sharing a ruinous risk across many people is a genuine gain. Instead: moral hazard is a COST of that gain, and excesses exist to limit it.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as requiring analysis and evaluation with a brief assessment of the arguments. Here it is the trade-off: cover is valuable, moral hazard is its cost, and the policy design is where the two are balanced.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages into causal order, from the cover to the effect on people who never changed their behaviour:',
      correctOrder: [
        'Insurance takes the cost of a loss off the insured',
        'Care slips, and claims arrive more often',
        'Premiums go up to meet them',
        'Somebody whose care never changed pays more',
      ],
      why: [
        'Moving the cost is what insurance does; it is the product, not a defect in it',
        'The person best placed to prevent the loss is the one the cost has moved away from',
        'An insurer prices for the claims it actually meets, so more frequent claims mean a higher premium',
        'The premium is the same for everybody the insurer cannot tell apart, so the cost lands on strangers too',
      ],
    }),
  };
})();

const moralHazardInBanking = (() => {
  const sid = subId('moral-hazard-in-banking');
  return {
    id: sid,
    title: 'Moral Hazard in Banking',
    keyIdea: 'In banking the cover is an expectation rather than a policy: a bank that believes it will be rescued takes risks it would not take otherwise, and nobody priced that cover.',
    body: [
      { type: 'paragraph', text: 'The second context 5b names, and it differs from insurance in one important way: **nobody bought the cover and nobody priced it**.' },
      { type: 'paragraph', text: 'A bank whose failure would damage a great many other people may reasonably expect not to be allowed to fail. That expectation is cover: not written down, no premium charged, and it does to the incentive to take care exactly what a policy does.' },
      { type: 'paragraph', text: 'The consequence is asymmetric in a way the insurance case is not. If the risk pays off the gains go to the bank and its owners; if it does not, much of the loss falls elsewhere. **The upside is private and part of the downside is not**, which makes more risk the rational choice.' },
      { type: 'paragraph', text: 'And the expectation is self-confirming. Once a rescue has happened it is better founded than before, so the next bank has more reason to hold it — which is why the cost of a rescue includes the behaviour it encourages.' },
      { type: 'paragraph', text: 'Three of this section\'s five sources meet in one firm here: an externality, because the failure spreads; imperfect market information, because depositors cannot see the risk; and moral hazard. A good answer names which it is analysing.' },
    ],
    realExample: { emoji: '🏛️', text: 'The expectation is strongest exactly where the externality is largest: the more damage a failure would do, the more certain the firm can be that it will not be allowed to fail. So the firms whose failures spread furthest face the weakest incentive to avoid it.' },
    misconception: 'Students describe this as banks knowing they will be rescued and behaving recklessly on purpose. It needs no intent: an expectation that a downside is partly covered shifts what counts as a sensible risk.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as multi-stage chains of reasoning with informed judgements. The full chain is here: cover is expected, risk rises, failures grow, rescue becomes likelier, the expectation strengthens.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of banking moral hazard to what makes it different from the insurance case:',
      pairs: [
        { left: 'The cover is an expectation, not a policy', right: 'nobody bought it and no premium was charged for it' },
        { left: 'The upside is private, part of the downside is not', right: 'so more risk is the rational choice, not a reckless one' },
        { left: 'A rescue makes the next expectation stronger', right: 'so the cost of a rescue includes what it encourages later' },
      ],
      why: [
        'An insurer prices its cover and can change the premium; an expectation has no price to change',
        'In insurance both the gain and the loss stay with the insured up to the excess; here the loss is shared and the gain is not',
        'Insurance does not become more likely because a claim was once paid; an expected rescue does',
      ],
    }),
  };
})();

const whoBearsMoralHazard = (() => {
  const sid = subId('who-bears-moral-hazard');
  return {
    id: sid,
    title: 'Who Bears It',
    keyIdea: 'The specification asks for the impact on consumers, producers, workers and governments — four groups, and an answer that reaches only one has answered a quarter of the question.',
    body: [
      { type: 'paragraph', text: '1.3.5 · 5b names four groups, in insurance and in banking. Learn them as four: a question can ask for any one, and the answers are genuinely different.' },
      { type: 'bullets', items: [
        '**Consumers** take less care once a loss is covered, and then pay higher premiums — including the ones whose care never changed.',
        '**Producers** take risks they would not take unprotected, and the losses that follow fall partly outside the firm.',
        '**Workers** are exposed to a firm carrying more risk than it can bear, and lose jobs when the risk arrives.',
        '**Governments** meet the cost of a failure they were expected to cover, and the expectation makes the next one likelier.',
      ] },
      { type: 'paragraph', text: 'Two of the four never chose anything. Workers and the public neither take the risk nor buy the cover; they carry the consequence, which is what makes this a market failure.' },
      { type: 'paragraph', text: 'And the effects are not all one way, which is useful in an evaluation. Consumers gain from sharing a ruinous risk; producers gain from undertaking projects too risky to bear alone. Moral hazard is the cost of that gain, not a reason it is not real.' },
    ],
    realExample: { emoji: '👷', text: 'The worker\'s position is the one most often left out and the easiest to argue. Somebody employed by a firm carrying too much risk cannot see it, had no part in the decision, and has no cover — and their job is what is lost if it arrives.' },
    misconception: 'Students write about moral hazard only from the insurer\'s side. The specification names four groups and the insurer is not one of them. Instead: pick the group the question names and follow the effect to them.',
    examMatters: 'Appendix 6 defines Analyse (6 marks, WEC11) as focusing on depth rather than breadth. Where 5b names four groups, depth means taking the one the question asks for and following it through — listing all four briefly is the breadth the row warns against.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each of the four groups 5b names to what moral hazard costs them:',
      pairs: [
        { left: 'Consumers', right: 'premiums that rise for the careful too' },
        { left: 'Producers', right: 'risk the firm would not take unprotected' },
        { left: 'Workers', right: 'jobs lost at a firm carrying too much risk' },
        { left: 'Governments', right: 'a rescue, and the expectation it confirms' },
      ],
      why: [
        'The cost lands on everybody holding cover, whether or not their own behaviour changed',
        'The firm\'s own decision is changed by the cover it believes it has',
        'They had no part in the decision and no cover of their own, and their job is what the risk costs them',
        'It funds what it was expected to fund, and the expectation the rescue confirms is part of the cost',
      ],
    }),
  };
})();

/* ══ Block 8 — Speculation and Market Bubbles (1.3.5 · 6) ══════════════════ */
/*
 * THE SUB-TOPIC THAT WAS SIMPLY NOT THERE. `speculation` and `bubble` are zero hits across all eight
 * tables of the March section, and 1.3.5 · 6 has three leaves. No ledger item names this: an audit
 * reads what is in front of it, and only walking inward from the specification can see a sub-topic
 * that is absent. It is the largest single gap in the section and it was found by the coverage
 * oracle rather than by any finding.
 *
 * Nothing in this chapter carries a year, an index level or a named market, because a dated claim
 * about a real market is what accuracy-01 and accuracy-02 both were.
 */

const howBubblesArise = (() => {
  const sid = subId('how-market-bubbles-arise');
  return {
    id: sid,
    title: 'How a Bubble Arises',
    keyIdea: 'A market bubble arises when people buy because the price is rising rather than for what the thing is worth, so the rise becomes its own cause.',
    body: [
      { type: 'paragraph', text: 'The last of the five sources, and the one needing no third party, no missing information and no cover.' },
      { type: 'paragraph', text: '**Speculation** is buying in the expectation of selling later at a higher price, rather than for any use the thing has. There is nothing wrong with that: it usually makes a market work better, by bringing buyers in when a price is low.' },
      { type: 'paragraph', text: 'A **market bubble** is what happens when speculation becomes the main reason to buy. Each step below is reasonable on its own.' },
      { type: 'flow', steps: [
        { title: 'A rise begins for a real reason', subtitle: 'more buyers, or less of the thing to go round' },
        { title: 'Buyers arrive because of the rise', subtitle: 'expecting to sell higher, not for the use of the thing' },
        { title: 'Their buying pushes the price up further', subtitle: 'which confirms the expectation that brought them' },
        { title: 'The rise becomes the reason for the rise', subtitle: 'and the price is no longer anchored to what the thing is worth' },
      ], result: 'A price far above what the thing is worth to anybody who wants to use it', resultType: 'bad' },
      { type: 'paragraph', text: 'The third step is the whole mechanism. In an ordinary market a rising price brings **fewer** buyers; here it brings **more**, because the rise is the product. That reversal is why it cannot continue: buying on a rise requires a further rise.' },
    ],
    realExample: { emoji: '🎈', text: 'The tell is what buyers say about why they are buying. When the answer stops being about the thing and becomes about what it will fetch next month, the price has come loose from the value.' },
    misconception: 'Students say a bubble is simply a very high price. A price can be high for good reasons that last. What makes it a bubble is that the reason to buy has become the rise itself.',
    examMatters: 'Appendix 6 defines Explain (4 marks, WEC11) as requiring a two-stage chain of reasoning when explaining a reason. Here they are: people buy expecting to resell higher, and that buying pushes the price up, which confirms the expectation.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the four stages of a bubble into the order they happen, each one caused by the one before:',
      correctOrder: [
        'A real reason starts the price moving',
        'Buyers arrive wanting the rise, not the thing',
        'Their buying lifts the price further still',
        'The rise becomes its own reason',
      ],
      why: [
        'Bubbles start from something genuine; an invented rise has nothing to attract the first speculators',
        'A rising price is the signal that draws in buyers who want the rise rather than the thing',
        'More buyers means more demand, which raises the price and appears to prove the expectation right',
        'Once the price is moving on expectations of itself, nothing anchors it to what the thing is worth',
      ],
    }),
  };
})();

const bubblesInHousing = (() => {
  const sid = subId('bubbles-in-housing');
  return {
    id: sid,
    title: 'Bubbles in Housing',
    keyIdea: 'Housing bubbles are severe because homes are bought with borrowed money, so a fall leaves people owing more than the home is worth and takes construction with it.',
    body: [
      { type: 'paragraph', text: 'The first of the two contexts 6b names, and the one where a bubble does most damage. Three features of housing make it worse than an ordinary asset.' },
      { type: 'bullets', items: [
        '**It is bought with borrowed money.** A buyer puts down a fraction and borrows the rest, so a small fall wipes out a large share of what they own.',
        '**Supply responds slowly.** A rise in price cannot bring more homes quickly, so the whole of a demand increase lands on the price for a long time before any of it lands on the quantity.',
        '**It is where people live.** A household cannot easily leave the market when the price looks wrong.',
      ] },
      { type: 'paragraph', text: 'When the price falls, all four of the groups 6b names are hit. **Consumers** who bought near the top may owe more than the home is worth and cannot move. **Producers** are left with land and half-finished sites. **Workers** in construction lose jobs. **Governments** lose the revenue the boom produced just as the costs arrive.' },
      { type: 'paragraph', text: 'And the fall feeds itself in the same way the rise did. Selling to get out pushes the price down, which prompts more selling — the same loop running the other way, and usually faster.' },
    ],
    realExample: { emoji: '🏘️', text: 'Slow supply is what separates housing from most markets in a boom. Where more can be made quickly, a price rise brings more of it and is dampened. Homes take years to build, so demand arriving in a month pushes against a supply that will not answer for years.' },
    misconception: 'Students treat a housing bust as bad only for those who bought at the top. The largest losses are often in construction, where the firms that expanded and the workers they took on go at once — and neither speculated on anything.',
    examMatters: 'Appendix 6 defines Discuss (14 marks, WEC11) as chains of reasoning with recognition of different viewpoints. Housing gives four: the household, the builder, the construction worker and the government.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each of the four groups 6b names to what a housing bust costs them:',
      pairs: [
        { left: 'Consumers', right: 'owing more than the home is worth, and unable to move' },
        { left: 'Producers', right: 'land and half-finished sites nobody wants' },
        { left: 'Workers', right: 'construction jobs lost' },
        { left: 'Governments', right: 'revenue gone as the costs of the bust arrive' },
      ],
      why: [
        'They bought with borrowed money, so a fall in the price falls almost entirely on what they own',
        'They expanded capacity to meet demand that was partly speculative, and the capacity outlives it',
        'Construction employs many people and sheds them quickly when sites stop, and they took no part in the speculation',
        'The revenue and the costs arrive at opposite ends of the cycle, which is when they are least affordable',
      ],
    }),
  };
})();

const bubblesInStocks = (() => {
  const sid = subId('bubbles-in-stocks-and-shares');
  return {
    id: sid,
    title: 'Bubbles in Stocks and Shares',
    keyIdea: 'In stocks and shares a bubble misallocates capital while it inflates and destroys savings when it bursts, and the damage reaches firms and workers with no part in it.',
    body: [
      { type: 'paragraph', text: 'The second context 6b names. Shares differ from housing in two ways that matter: they can be sold in a moment, and they are claims on firms rather than places to live.' },
      { type: 'paragraph', text: 'Being sellable in a moment makes the **fall** faster and sharper. Nothing slows a decision to get out, and everybody sells knowing everybody else can sell just as fast.' },
      { type: 'paragraph', text: 'Being claims on firms means the misallocation happens on the way **up** as well as down. A share price directs capital: a firm whose shares are highly valued can raise money cheaply and expand. While a bubble inflates that signal is wrong, so resources go to firms the price says are valuable and are not.' },
      { type: 'paragraph', text: 'When it bursts, the four groups again. **Consumers** lose savings, including people who hold shares only through a pension. **Producers** cannot raise money for good projects, because the signal is now wrong the other way. **Workers** lose jobs at firms that expanded on capital that has gone. **Governments** meet the consequences.' },
      { type: 'paragraph', text: 'The third is the one worth an evaluation point: after a bust, capital is hard to raise for projects that deserve it, so the misallocation outlives the fall.' },
    ],
    realExample: { emoji: '📉', text: 'The people who lose most are often furthest from the decision. Somebody whose pension holds a broad set of shares never chose any of them and still carries the fall, which is what makes this a market failure rather than a bad bet between willing traders.' },
    misconception: 'Students say a bubble only hurts speculators, who took the risk knowingly. Most of the loss falls on people with no part in it: savers holding shares through pensions, and workers at firms that expanded.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks, WEC11) as multi-stage chains of reasoning with informed judgements. The strongest chain here runs through the price SIGNAL: it directs capital, a bubble makes it wrong, so resources are misallocated.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of a share-price bubble to what it causes:',
      pairs: [
        { left: 'Shares can be sold in a moment', right: 'the fall is faster and sharper than in housing' },
        { left: 'A share price directs capital to firms', right: 'resources are misallocated while the bubble inflates' },
        { left: 'Many savers hold shares through pensions', right: 'the loss reaches people who never chose a share' },
        { left: 'Capital is hard to raise after a bust', right: 'good projects go unfunded long after the fall stops' },
      ],
      why: [
        'Nothing slows a decision to sell, and everybody sells knowing everybody else can too',
        'A firm whose shares are highly valued can raise money cheaply, so a wrong price sends real resources to the wrong firms',
        'A pension holds shares on behalf of somebody who made no choice about which ones',
        'The signal is now wrong in the other direction, so the misallocation outlives the bubble',
      ],
    }),
  };
})();

const whenItBursts = (() => {
  const sid = subId('when-it-bursts');
  return {
    id: sid,
    title: 'When It Bursts',
    keyIdea: 'A bubble must burst because buying on a rise requires a further rise, and the fall is steeper than the rise because the same loop runs in reverse against people who owe money.',
    body: [
      { type: 'paragraph', text: 'Why can a bubble not simply stop rising and stay where it is?' },
      { type: 'paragraph', text: 'The buyers holding the price up are there for the rise. If the price merely levels off, the reason they bought has gone, so they sell — and their selling makes the price fall rather than level. **There is no resting point above the value**, which is why a bubble ends in a fall and not in a plateau.' },
      { type: 'paragraph', text: 'The fall is usually steeper than the rise, for two separate reasons.' },
      { type: 'bullets', items: [
        '**Borrowed money forces selling.** Somebody who borrowed to buy may have to sell when the price falls, whatever they expect next — so the selling is not a choice and does not stop when the price looks cheap.',
        '**Everybody learns the same thing at once.** The rise happened over months as people arrived one at a time; the change in belief happens to everybody together.',
      ] },
      { type: 'paragraph', text: 'And the price usually falls **below** what the thing is worth before it settles, because nobody wants to buy something that is falling. The market overshoots in both directions, which is the proof that it was never tracking the value.' },
    ],
    realExample: { emoji: '🪂', text: 'The asymmetry between the two directions is the part people find hardest to believe. Buying on a rise is voluntary and spread over time; selling on a fall is often forced and happens at once.' },
    misconception: 'Students assume a bubble deflates gently back to the value. It normally undershoots: the expectations that carried the price up run in reverse and push it below what the thing is worth. Instead: say the market overshoots in both directions.',
    examMatters: 'Appendix 6 defines Examine (8 marks, WEC11) as analysis and evaluation with a brief assessment of the arguments. Here it is usually whether a rise IS a bubble — judged against what the thing is worth, which is exactly what nobody can observe at the time.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the reason a bubble cannot level off:',
      template: [
        'The buyers holding the price up are there for the ___',
        'So if the price merely levels off, their reason to hold it has ___',
        'And the fall overshoots ___ what the thing is worth',
      ],
      answers: ['rise', 'gone', 'below'],
      hints: ['what a speculative buyer is actually buying', 'what happens to a reason that depended on a rise continuing', 'which side of the value the price ends up on before it settles'],
      distractors: ['value', 'above'],
    }),
  };
})();

/* ══ The section ═══════════════════════════════════════════════════════════ */

export const SUBSECTIONS = [
  whatMarketFailureMeans, theFiveSources, misallocationNotCollapse, whichSourceIsIt,
  privateExternalSocialCosts, privateExternalSocialBenefits, productionOrConsumption, theFourKinds,
  readingAMarginalDiagram, externalCostOfProduction, lossIsNotTotalCost, externalBenefitOfConsumption, marketAndSocialOptimum,
  transport, healthAndEducation, environment, financial, fromContextToDiagram,
  privateGoods, publicGoods, freeRiderProblem, mayNotNotCannot,
  symmetricAndAsymmetric, informationGaps, healthcareAndInsurance, educationAndPensions,
  howMoralHazardOccurs, moralHazardInInsurance, moralHazardInBanking, whoBearsMoralHazard,
  howBubblesArise, bubblesInHousing, bubblesInStocks, whenItBursts,
];

const BLOCK_PLAN = [
  { title: B1, subs: [whatMarketFailureMeans, theFiveSources, misallocationNotCollapse, whichSourceIsIt], takeaway: [
    'Too much or too little, compared with the social optimum.',
    'Five sources, and the list is closed.',
    'Misallocation, not collapse: the market is busy and wrong.',
    'Ask first whether somebody outside the deal is affected.',
  ] },
  { title: B2, subs: [privateExternalSocialCosts, privateExternalSocialBenefits, productionOrConsumption, theFourKinds], takeaway: [
    'Private + external = social. Costs and benefits alike.',
    'Social cost includes private cost; it is not a rival figure.',
    'Making the good moves a COST curve; using it moves a BENEFIT curve.',
    'A missed cost means too much; a missed benefit means too little.',
  ] },
  { title: B3, subs: [readingAMarginalDiagram, externalCostOfProduction, lossIsNotTotalCost, externalBenefitOfConsumption, marketAndSocialOptimum], takeaway: [
    'A height is per unit; an area is a total.',
    'Cement: market ' + qty(K.marketQ) + ', optimum ' + qty(K.optimumQ) + ', welfare loss ' + money(K.welfareLoss) + '.',
    'That loss is NOT the ' + money(K.totalExternalCost) + ' total external cost.',
    'Courses: market ' + qty(A.marketQ) + ', optimum ' + qty(A.optimumQ) + ', welfare gain ' + money(A.welfareGain) + '.',
    'Market = private curves crossing; optimum = social curves crossing.',
  ] },
  { title: B4, subs: [transport, healthAndEducation, environment, financial, fromContextToDiagram], takeaway: [
    'Transport: an external cost of consumption — too many journeys.',
    'Health and education: external benefits of consumption — too little.',
    'Environment and financial: external costs of production — too much.',
    'Cost or benefit, making or using, then read the direction.',
  ] },
  { title: B5, subs: [privateGoods, publicGoods, freeRiderProblem, mayNotNotCannot], takeaway: [
    'Private good: rival and excludable. Public good: neither.',
    'Both tests must fail; a crowded road fails only one.',
    'Free-riding follows from NON-EXCLUDABILITY, not non-rivalry.',
    'The spec says MAY NOT be provided — under-provision, not zero.',
  ] },
  { title: B6, subs: [symmetricAndAsymmetric, informationGaps, healthcareAndInsurance, educationAndPensions], takeaway: [
    'Symmetric means equal knowledge, not complete knowledge.',
    'A gap makes willingness to pay reflect a belief, not a value.',
    'Healthcare: the seller knows more. Insurance: the buyer does.',
    'Education and pensions: the gap is between now and later.',
  ] },
  { title: B7, subs: [howMoralHazardOccurs, moralHazardInInsurance, moralHazardInBanking, whoBearsMoralHazard], takeaway: [
    'Behaviour changes AFTER the cover, and the cover cannot see it.',
    'Insurance: care weakens, claims rise, everybody\'s premium rises.',
    'Banking: the cover is an expectation nobody bought or priced.',
    'Four groups: consumers, producers, workers, governments.',
  ] },
  { title: B8, subs: [howBubblesArise, bubblesInHousing, bubblesInStocks, whenItBursts], takeaway: [
    'A bubble is when the rise becomes the reason for the rise.',
    'Housing: borrowed money and slow supply make the fall worse.',
    'Shares: capital is misallocated on the way up as well as down.',
    'It cannot level off, and it overshoots in both directions.',
  ] },
];

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

/* ══ Notes ════════════════════════════════════════════════════════════════ */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '6 leaves',
    keyIdea: 'Why market failure occurs, and the five sources the specification lists.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Market failure</strong> — too much or too little of a good is produced and/or consumed compared with the socially optimal level of output.'),
        def('<strong>Socially optimal level of output</strong> — the quantity at which every cost and every benefit is counted, not only the ones buyers and sellers feel.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The five sources: externalities; the free-rider problem and non-provision of public goods; imperfect market information; moral hazard; speculation and market bubbles.'),
        mech('The price fails to carry something, buyers and sellers act on the price they see, and the quantity settles away from the social optimum.'),
        link('Nobody in the model behaves badly. Rational choices on an incomplete price add up to the wrong quantity, which is why market failure needs no villain.'),
      ] },
    ],
    takeaway: [
      'The failure is in the QUANTITY, not in whether the market functions.',
      'Five sources, in the specification\'s own order.',
      'Say which way the quantity is wrong and what the price is missing.',
    ],
  },
  {
    title: B2,
    meta: '6 leaves',
    keyIdea: 'The distinction between private, external and social costs and benefits, and the four kinds of externality.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Private cost</strong> — what the producer pays. <strong>External cost</strong> — what falls on everybody else. <strong>Social cost</strong> = the two added together.'),
        def('<strong>Private benefit</strong> — what the buyer gains. <strong>External benefit</strong> — what other people gain. <strong>Social benefit</strong> = the two added together.'),
        def('<strong>MPC, MSC, MPB, MSB</strong> — marginal private and social cost, marginal private and social benefit: what ONE MORE unit costs or is worth.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Kumbe Cement at ' + qty(K.marketQ) + ' ' + K.units + ': private cost ' + money(valueAt(K.mpc, K.marketQ)) + ' + external cost ' + money(K.externalCost) + ' = social cost ' + money(valueAt(K.msc, K.marketQ)) + '.'),
        mech('Production or consumption is decided by the ACTIVITY that causes the effect, not by who suffers it.'),
        mech('External cost of production: MSC above MPC, too much made. Of consumption: MSB below MPB, too much used.'),
        mech('External benefit of production: MSC below MPC, too little made. Of consumption: MSB above MPB, too little used.'),
        link('A missed cost always means too much; a missed benefit always means too little. The four kinds are two questions, not four facts.'),
      ] },
    ],
    takeaway: [
      'Social always INCLUDES private; it is a sum, not a rival figure.',
      'Making it moves a cost curve; using it moves a benefit curve.',
      'Cost or benefit first, then production or consumption.',
    ],
  },
  {
    title: B3,
    meta: '3 leaves',
    keyIdea: 'The use of diagrams, using marginal analysis, to illustrate the external costs from production, the external benefits from consumption, and the distinction between the market and social optimum positions with identification of the welfare loss or gain areas.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Market position</strong> — where the two PRIVATE curves cross, because that is what buyers and sellers act on.'),
        def('<strong>Social optimum</strong> — where the two SOCIAL curves cross, because that is where every cost and benefit is counted.'),
        def('<strong>Welfare loss</strong> — the triangle between MSC and MPB from the optimum out to the market quantity: ' + money(K.welfareLoss) + ' ' + K.per + ' in the Kumbe market.'),
        def('<strong>Welfare gain available</strong> — the triangle between MSB and MSC from the market quantity out to the optimum: ' + money(A.welfareGain) + ' ' + A.per + ' in the Amara market.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('A HEIGHT on a marginal diagram is a per-unit amount; an AREA is a total. Every welfare figure is an area.'),
        mech('Kumbe: MPB ' + money(valueAt(K.mpb, 0)) + ' falling, MPC ' + money(valueAt(K.mpc, 0)) + ' rising, MSC ' + money(K.externalCost) + ' above MPC → market ' + qty(K.marketQ) + ' at ' + money(K.marketP) + ', optimum ' + qty(K.optimumQ) + ' at ' + money(K.optimumP) + '.'),
        mech('Welfare loss = ½ × ' + money(K.externalCost) + ' × ' + qty(K.marketQ - K.optimumQ) + ' = ' + money(K.welfareLoss) + '. TOTAL external cost = ' + money(K.externalCost) + ' × ' + qty(K.marketQ) + ' = ' + money(K.totalExternalCost) + '. They are different areas and different numbers.'),
        mech('Amara: MPB ' + money(valueAt(A.mpb, 0)) + ' falling, MSC ' + money(valueAt(A.msc, 0)) + ' rising, MSB ' + money(A.externalBenefit) + ' above MPB → market ' + qty(A.marketQ) + ' at ' + money(A.marketP) + ', optimum ' + qty(A.optimumQ) + ' at ' + money(A.optimumP) + '.'),
        mech('Welfare gain = ½ × ' + money(A.externalBenefit) + ' × ' + qty(A.optimumQ - A.marketQ) + ' = ' + money(A.welfareGain) + '. TOTAL external benefit = ' + money(A.externalBenefit) + ' × ' + qty(A.marketQ) + ' = ' + money(A.totalExternalBenefit) + ' — the same two-areas distinction as on the cost side.'),
        link('Whichever social curve has moved, the optimum moves towards it: a cost curve up lowers the optimum quantity, a benefit curve up raises it.'),
      ] },
    ],
    takeaway: [
      'Label the vertical axis Costs and Benefits, never Price.',
      'The loss triangle starts at the OPTIMUM, not at the origin.',
      'A cost is not a loss if the unit it buys is worth more than it.',
    ],
  },
  {
    title: B4,
    meta: '5 leaves',
    keyIdea: 'The impact of externalities in transport, health, education, environment and financial contexts.',
    blocks: [
      { title: 'MECHANISMS', items: [
        mech('<strong>Transport</strong> — congestion and emissions from a journey: an external cost of CONSUMPTION, so too many journeys are made.'),
        mech('<strong>Health</strong> — a treatment or vaccination protects others too: an external benefit of CONSUMPTION, so too little is taken.'),
        mech('<strong>Education</strong> — colleagues, employers and later generations gain: an external benefit of CONSUMPTION, so too little is bought.'),
        mech('<strong>Environment</strong> — a discharge or emission from making the good: an external cost of PRODUCTION, so too much is made.'),
        mech('<strong>Financial</strong> — one firm\'s failure spreads to depositors, firms and other banks: an external cost of PRODUCTION.'),
        link('Two of the five carry other sources as well: financial markets also involve imperfect market information and moral hazard, and education also involves an information gap. Say which you are analysing.'),
      ] },
    ],
    takeaway: [
      'Two diagrams cover all five contexts.',
      'Congestion is CONSUMPTION: the car was built elsewhere.',
      'The environment cases are usually production, but not always.',
    ],
  },
  {
    title: B5,
    meta: '3 leaves',
    keyIdea: 'The distinction between public and private goods, and why public goods may not be provided by the private sector, making reference to the free-rider problem.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Private good</strong> — rival (one person\'s use leaves less for others) and excludable (a non-payer can be kept from it).'),
        def('<strong>Public good</strong> — non-rival and non-excludable. BOTH tests must fail.'),
        def('<strong>The free-rider problem</strong> — because nobody can be kept from the benefit, each person gains by waiting for somebody else to pay.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Non-excludable → free-riding is possible → few choose to pay → revenue falls short of the cost → it MAY NOT be provided.'),
        mech('Free-riding follows from NON-EXCLUDABILITY. Non-rivalry gives nobody a reason to avoid paying.'),
        mech('Near misses: a crowded road is non-excludable and RIVAL; a subscription film is non-rival and EXCLUDABLE. Neither is a public good.'),
        link('Private provision does happen — where one party gains enough alone, where the benefit can be bundled with something excludable, or where the group is small enough to agree. The claim is under-provision, not zero.'),
      ] },
    ],
    takeaway: [
      'Both tests, applied to the GOOD, not to whoever pays for it.',
      'Non-excludability causes free-riding. Non-rivalry does not.',
      'Say "may not be provided", which is the specification\'s own wording.',
    ],
  },
  {
    title: B6,
    meta: '6 leaves',
    keyIdea: 'The distinction between symmetric and asymmetric information, the significance of information gaps, and how imperfect market information may lead to a misallocation of resources in healthcare, education, pensions and insurance.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Symmetric information</strong> — both sides of a transaction know the same things. Equal, NOT necessarily complete.'),
        def('<strong>Asymmetric information</strong> — one side knows more than the other, and can act on the difference.'),
        def('<strong>Information gap</strong> — knowledge missing when the choice has to be made, on one side or on both.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('A gap makes willingness to pay reflect a BELIEF rather than a value, so the demand curve sits away from marginal social benefit and the quantity is wrong.'),
        mech('<strong>Healthcare</strong> — the person advising the treatment knows more than the patient choosing it; treatment is taken that would not be chosen with the facts, and avoided that should be taken.'),
        mech('<strong>Insurance</strong> — the buyer knows their own risk better than the insurer, so cover is priced for an average that fits almost nobody.'),
        mech('<strong>Education</strong> — the return arrives over a working life, so too little is bought and some of it is the wrong kind.'),
        mech('<strong>Pensions</strong> — the cost of saving too little is invisible for decades and the choice cannot be remade.'),
        link('Significance turns on three things: how large the gap is, how costly the mistake is, and how hard the gap is to close. A gap closed by one question is not significant.'),
      ] },
    ],
    takeaway: [
      'Symmetric means EQUAL knowledge, not full knowledge.',
      'Healthcare and insurance: the gap is between the two sides.',
      'Education and pensions: the gap is between now and later.',
    ],
  },
  {
    title: B7,
    meta: '3 leaves',
    keyIdea: 'How moral hazard can occur, and its impact on consumers, producers, workers and governments in insurance and banking.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Moral hazard</strong> — a change in behaviour AFTER a risk has been covered, because the cost of that risk now falls on somebody else.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Somebody bears a risk and takes care → the risk is covered → the cost falls elsewhere → care weakens → and the cover cannot observe the change, so it is priced for the old behaviour.'),
        mech('<strong>Insurance</strong> — the cost moves away from the person best placed to prevent the loss; claims rise; premiums rise for everybody, including those whose care never changed.'),
        mech('<strong>Banking</strong> — the cover is an EXPECTATION of rescue: nobody bought it and no premium was charged. The upside is private and part of the downside is not.'),
        mech('The four groups: consumers (premiums), producers (risk they would not take unprotected), workers (jobs at a firm carrying too much risk), governments (the cost of a rescue, and the expectation it confirms).'),
        link('An excess, a no-claims discount and partial cover all work by leaving enough of the cost with the insured that the reason for care survives.'),
      ] },
    ],
    takeaway: [
      'Not morals and not fraud: care weakening once the cost moves.',
      'The timing test: behaviour AFTER the cover, not a choice before it.',
      'Two of the four groups never chose anything.',
    ],
  },
  {
    title: B8,
    meta: '3 leaves',
    keyIdea: 'How market bubbles may arise, and their impact on consumers, producers, workers and governments in housing and in stocks and shares.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Speculation</strong> — buying in the expectation of reselling higher, rather than for any use the thing has.'),
        def('<strong>Market bubble</strong> — a price that has come loose from what the thing is worth, because the rise itself has become the reason to buy.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('A rise begins for a real reason → buyers arrive because of the rise → their buying pushes the price up further → the rise becomes the reason for the rise.'),
        mech('The reversal that defines a bubble: in an ordinary market a rising price brings FEWER buyers; here it brings MORE.'),
        mech('<strong>Housing</strong> — bought with borrowed money, supply responds slowly, and it is where people live. Consumers owe more than the home is worth; builders hold land nobody wants; construction workers lose jobs; government revenue falls as its costs arrive.'),
        mech('<strong>Stocks and shares</strong> — sellable in a moment, so the fall is sharper; and a share price DIRECTS capital, so resources are misallocated while the bubble inflates and again after it bursts.'),
        link('It cannot level off: buyers who are there for the rise sell when it stops. And it overshoots below the value on the way down, because the same expectations run in reverse.'),
      ] },
    ],
    takeaway: [
      'The rise becomes its own cause: that is the whole mechanism.',
      'Most of the loss falls on people who never speculated.',
      'The market overshoots in BOTH directions.',
    ],
  },
];
