/**
 * PACKET 39b — trade-global-economy, the teaching text for sub-topics 4 and 5.
 *
 * Six blocks, 28 subsections, 27 leaves. ("Who Gains and Who Loses" covers five 5c leaves in four
 * subsections: 5c-2 and 5c-3 share one, because a tariff's revenue is the government's side of the
 * same transfer that is the producers' gain.) Every figure comes from `_packet39b-util.mjs`; nothing
 * numeric is typed twice, so a change to the spine moves the prose, the recalls, the diagrams and
 * the quiz together.
 *
 * THE RECALL RULE THAT COSTS THE MOST TO KEEP. `npm run recalls` holds this section to ZERO
 * answerable by scrolling up, because it has no row in the recall baseline. A recall therefore
 * never asks for a figure the step has printed: it hands the student figures the step did NOT print
 * and asks for the division, or it asks for a classification the prose states once and does not
 * tabulate. 39a had to rewrite one classify that scored 0.80 against a sentence above it.
 */
import {
  subId, qty, pct, money, units,
  TARIFF, QUOTA, SUBSIDY, BLOC, SCALE, FRICTION,
  LADDER, MEMBERSHIP, REASONS, TOOLS, IMPACTS,
} from './_packet39b-util.mjs';

const T = TARIFF, Q = QUOTA, S = SUBSIDY, B = BLOC;

export const B5 = 'Trade Liberalisation and the WTO';
export const B6 = 'The Four Types of Trading Bloc';
export const B7 = 'Joining a Bloc: the Costs and the Benefits';
export const B8 = 'Why Governments Restrict Trade';
export const B9 = 'The Tools of Protection';
export const B10 = 'Who Gains and Who Loses';

const sub = (slug, title, fields) => ({ id: subId(slug), title, ...fields });

/* ══ B5 · Trade Liberalisation and the WTO — 4a, 4d ════════════════════════ */

const B5_SUBS = [
  sub('what-the-wto-is-for', 'What the WTO Is For', {
    keyIdea: 'The WTO is a rule book and a court, not a government. It cannot force a country to open its market; it can make breaking an agreed promise expensive.',
    body: [
      { type: 'paragraph', text: `Leaf 4a asks for the WTO's role in **trade liberalisation** — the removal of barriers to trade between countries. The WTO does not set tariffs. Its members negotiate reductions with each other, write them down as **bindings**, and the WTO holds them to what they wrote.` },
      { type: 'paragraph', text: `A binding is a ceiling. A member may charge less than its bound rate and often does, but charging more breaks the agreement. That is what makes a negotiated reduction worth anything: without a body to hold the promise, a government could cut a tariff to win a concession and raise it again the following year.` },
      { type: 'bullets', items: [
        `**Negotiation** — rounds in which members trade concessions, each opening something to get something.`,
        `**Rules** — the principles every member accepts as a condition of membership.`,
        `**Dispute settlement** — a legal process for a member that believes another has broken the rules.`,
      ] },
    ],
    realExample: { text: `A country binds its tariff on machinery at 15% and actually charges 5%. It may raise the rate to 15% without breaking anything; going to 20% is a breach its trading partners can act on.` },
    misconception: 'Students write that the WTO "forces countries to trade freely". It has no such power. Every reduction is one the member agreed to, and the WTO enforces the agreement rather than the principle.',
    examMatters: 'Appendix 6 defines Explain as needing a two-stage chain. "The WTO promotes free trade" is not a chain. "The WTO binds the tariff, so a member that raises it faces retaliation authorised against its own exports, so the promise holds" is.',
    recall: {
      id: subId('what-the-wto-is-for') + ':recall', type: 'fillin',
      prompt: 'A member has bound its tariff on chemicals at 25% and currently charges 9%. Decide what each move would be:',
      template: [
        'Raising the rate from 9% to 18% is ___',
        'Raising the rate from 9% to 30% is ___',
        'The most it may charge without breaching the binding is ___%',
      ],
      answers: ['permitted', 'a breach', '25'],
      hints: ['the binding is a ceiling and this is still under it', 'this one goes above the ceiling', 'the ceiling itself'],
      distractors: ['forbidden', 'a concession', '9'],
    },
  }),
  sub('how-the-wto-holds-a-promise', 'How the WTO Holds a Promise', {
    keyIdea: 'Two rules do most of the work: treat every member as well as the best-treated member, and treat an import as well as the equivalent home-made good once it is inside.',
    body: [
      { type: 'paragraph', text: `**Most-favoured nation** is the first rule and the more surprising one. A concession given to any member must be given to all of them. A member cannot cut its tariff on one country's steel and leave everyone else paying the old rate.` },
      { type: 'paragraph', text: `**National treatment** is the second. Once an import has paid its tariff and cleared the border, it must be taxed and regulated no worse than a domestic good. Without it, a country could bind its tariffs at zero and then apply a sales tax only to foreign cars.` },
      { type: 'paragraph', text: `**Dispute settlement** is what converts both into something more than a statement of intent. A member brings a complaint, a panel rules, and a member that loses and does not comply can have retaliation authorised against its exports. The appeal stage has been inactive since members stopped agreeing on appointments to it, so a losing party can appeal into a body that cannot hear the case — the standing criticism of the system as it works now.` },
    ],
    realExample: { text: `A country cuts its tariff on cocoa for one supplier in exchange for access to that supplier's market. Most-favoured nation means every other member's cocoa enters at the new lower rate too, without giving anything up.` },
    misconception: 'Most-favoured nation sounds like special treatment for a favourite. It is the opposite: it is a rule against having favourites, and its name describes the standard everyone must be given rather than a privilege one country receives.',
    examMatters: 'The two rules are examined as a pair because they close each other\'s loophole. An answer that gives only most-favoured nation has not explained why a country cannot undo a tariff cut with an internal tax.',
    recall: {
      id: subId('how-the-wto-holds-a-promise') + ':recall', type: 'classify',
      prompt: 'Sort each action by which rule it breaches: most-favoured nation or national treatment.',
      groups: [
        { name: 'Most-favoured nation', items: ['Charging one member 4% on rice and every other member 11%', 'Giving one supplier a quota twice the size of anyone else\'s'], why: 'Both discriminate BETWEEN outside members at the border, which is what most-favoured nation forbids.' },
        { name: 'National treatment', items: ['Taxing imported beer at twice the rate of beer brewed at home', 'Requiring a safety label on foreign toys and not on domestic ones'], why: 'Both happen AFTER the border and compare an import with a home-made good, which is what national treatment governs.' },
      ],
    },
  }),
  sub('why-liberalisation-stalled', 'Why Liberalisation Stalled', {
    keyIdea: 'Multilateral rounds need every member to agree at once, and the membership has grown large and unlike itself. Agreement got harder, so countries went round the outside.',
    body: [
      { type: 'paragraph', text: `A multilateral round is a single package agreed by consensus. That worked when the membership was smaller and its members wanted broadly similar things. With a membership spanning the richest and poorest economies, the things they want from a round conflict directly — agricultural protection in rich members is exactly what poorer exporters most want removed.` },
      { type: 'paragraph', text: `When the package cannot be closed, the alternative is a smaller deal with fewer parties: a bilateral agreement between two countries, or a **regional trading bloc**. These are faster to agree precisely because they exclude the members who would have blocked them.` },
      { type: 'flow', resultType: 'neutral', steps: [
        'A round needs consensus from a large and unlike membership',
        'The concessions each group wants are the ones another group refuses',
        'Members turn to bilateral deals and blocs instead',
      ], result: 'Liberalisation continues, but in fragments negotiated outside the multilateral system rather than inside it' },
    ],
    realExample: { text: `Two economies that want a deal on services can agree one between themselves in a year or two. The same deal inside a round waits for agriculture, intellectual property and everything else in the package to be settled at the same time.` },
    misconception: 'A stalled round is not the same as falling trade. Barriers kept coming down through the 2000s and 2010s; what changed is that they came down in bilateral and regional deals rather than in a single global one.',
    examMatters: 'This is the bridge to 4d. A question on the WTO\'s limitations wants the consensus problem and what it pushed countries towards, because the blocs that resulted are the subject of the next leaf.',
  }),
  sub('where-blocs-and-the-wto-conflict', 'Where Blocs and the WTO Conflict', {
    keyIdea: 'A bloc gives its members a tariff it does not give everyone. That is discrimination between members, which is the exact thing most-favoured nation forbids.',
    body: [
      { type: 'paragraph', text: `Leaf 4d asks for the possible conflicts between trading blocs and the WTO, and the central one is structural rather than accidental. A bloc works by charging members less than non-members. Most-favoured nation says a concession to any member goes to all members. **A trading bloc is therefore a breach of the WTO's first rule by construction**, permitted only because the rules carve out an exception for it.` },
      { type: 'paragraph', text: `The exception is conditional, and the conditions are where the arguments happen. A bloc is meant to cover substantially all the trade between its members rather than a few convenient products, and it is not meant to raise barriers against outsiders above what they were before.` },
      { type: 'paragraph', text: `Two further frictions follow. A bloc that is a free-trade area needs **rules of origin** to stop an import entering through the member with the lowest external tariff and moving on duty-free, and those rules are paperwork applied to outsiders. And a country in several overlapping blocs faces a different rate and a different rule of origin for the same good depending on which agreement it is shipped under.` },
    ],
    realExample: { text: `A non-member exporter watches a bloc form and sees its own tariff unchanged at 12% while a competitor inside the bloc goes to zero. Nothing was done TO the outsider, and it has still lost the sale.` },
    misconception: 'Students treat blocs and the WTO as two ways of doing the same thing. They pull in opposite directions: the WTO\'s rule is that everyone gets the same treatment, and a bloc exists precisely to give some countries better treatment than others.',
    examMatters: 'Examine and Discuss questions on regionalism want both readings: a bloc as a step towards free trade, because barriers between members genuinely fall, and as a step away from it, because the discrimination is the point.',
    recall: {
      id: subId('where-blocs-and-the-wto-conflict') + ':recall', type: 'fillin',
      prompt: 'A country in a free-trade area charges outsiders 15%; its partner charges them 4%. A good is worth 200 and enters through the partner:',
      template: [
        'The duty paid at the partner\'s border is ___',
        'The duty the good would have paid entering directly is ___',
        'So routing it through the partner would save ___',
      ],
      answers: ['8', '30', '22'],
      hints: ['4% of the value of the good', '15% of the same value', 'the difference between the two duties'],
      distractors: ['15', '4', '38'],
    },
  }),
];

/* ══ B6 · The Four Types of Trading Bloc — 4b-1..4 ═════════════════════════ */

const B6_SUBS = [
  sub('the-four-rungs', 'The Four Rungs', {
    keyIdea: 'The specification lists four types, and they are a sequence. Each one is the one below it plus exactly one more freedom, which is how to remember them and how to tell them apart.',
    body: [
      { type: 'paragraph', text: `Leaf 4b names four types of trading bloc. They are not four unrelated arrangements: each is the previous one with a further restriction removed, so the only thing to learn about each is **what it adds**.` },
      { type: 'bullets', items: LADDER.map(([name, adds]) => `**${name.replace(/^./, (ch) => ch.toUpperCase())}** — ${adds}`) },
      { type: 'paragraph', text: `The fourth rung is one leaf in this specification, not two. It names economic and monetary union together, so an answer that splits it into two separate levels is inventing a rung the specification does not have.` },
    ],
    realExample: { text: `Four members agree to drop tariffs on each other. Later they align their external tariffs, then let workers move, then adopt one currency. Each step is a rung, and a bloc can stop on any of them indefinitely.` },
    misconception: 'Deeper is not automatically better. Each rung removes a restriction AND removes a policy instrument the member used to control: a common external tariff means no independent trade policy, and one currency means no independent interest rate.',
    examMatters: 'Define questions on a bloc type carry 2 marks and want the distinguishing feature, not a list of members. "A customs union is a free-trade area with a common external tariff" is the whole answer.',
  }),
  sub('free-trade-areas', 'Free-Trade Areas', {
    keyIdea: 'The shallowest rung: no tariffs between members, and every member keeps its own tariff on the rest of the world. That combination is what makes rules of origin necessary.',
    body: [
      { type: 'paragraph', text: `In a **free-trade area** members remove tariffs on each other's goods and each keeps whatever external tariff it had. A member gives up nothing on its trade policy towards non-members, which is why this rung is the easiest to agree and the most common.` },
      { type: 'paragraph', text: `The cost of keeping that independence is a loophole. If one member charges outsiders ${pct(4)} and another ${pct(15)}, an outside exporter ships everything through the low-tariff member and moves it on duty-free. The fix is **rules of origin**: a good moves duty-free between members only if it was genuinely made in one of them, which means proving where its parts came from.` },
    ],
    realExample: { text: `A shirt sewn in a member country from cloth woven outside the bloc may or may not qualify, depending on how much of its value was added inside. That test is what a rule of origin is.` },
    misconception: 'Rules of origin are treated as a technicality. They are the running cost of this rung: the paperwork is a real barrier, and for small exporters it can be large enough that they pay the tariff instead of proving origin.',
    examMatters: 'The distinguishing feature is the ABSENCE of a common external tariff. Any answer that gets that right can derive the rules-of-origin problem from it without having memorised it.',
  }),
  sub('customs-unions', 'Customs Unions', {
    keyIdea: 'Add one common external tariff and the origin problem disappears, because it stops mattering which member an import enters through. What goes with it is independent trade policy.',
    body: [
      { type: 'paragraph', text: `A **customs union** is a free-trade area plus a **common external tariff**: every member charges the same rate on an import from outside. Once that is true, an import pays the same duty whichever border it crosses, so there is nothing to gain from routing it — and rules of origin between members become unnecessary.` },
      { type: 'paragraph', text: `The price is that no member sets its own external tariff any more, and none can sign its own trade deal with an outside country, because doing so would undercut the common tariff. Trade policy towards the rest of the world is negotiated by the union as a whole.` },
      { type: 'flow', resultType: 'neutral', steps: [
        'Members agree one external tariff',
        'Routing an import through the cheapest member stops paying',
        'Rules of origin between members become unnecessary',
      ], result: 'Internal friction falls, and each member gives up its own trade policy towards the rest of the world' },
    ],
    realExample: { text: `A member that would prefer a low tariff on components and a high one on finished goods cannot have it unless the other members agree. Its trade policy is now a negotiated position rather than a choice.` },
    misconception: 'Students say a customs union means "free trade". It means free trade INSIDE and a single agreed wall outside — and that wall can be higher than the one some members had before they joined.',
    examMatters: 'The common external tariff is the feature examiners test. It is also the hinge for trade diversion in 4c, because it is the thing that changes the relative price of an outsider\'s goods.',
    recall: {
      id: subId('customs-unions') + ':recall', type: 'match',
      prompt: 'Match each arrangement to the thing that is true only of it:',
      pairs: [
        { left: 'Free-trade area', right: 'Members keep different external tariffs', why: 'Keeping separate external rates is exactly what forces rules of origin.' },
        { left: 'Customs union', right: 'One agreed tariff faces the rest of the world', why: 'The common external tariff is the single thing this rung adds.' },
        { left: 'Common market', right: 'Workers and capital move as freely as goods', why: 'Factor movement is the freedom that defines the third rung.' },
        { left: 'Economic and monetary union', right: 'Interest rates are set once for everyone', why: 'One monetary policy is the instrument this rung takes away.' },
      ],
    },
  }),
  sub('common-markets', 'Common Markets', {
    keyIdea: 'Add free movement of the factors of production. Goods already moved; now labour and capital do too, which changes where firms locate and where people work.',
    body: [
      { type: 'paragraph', text: `A **common market** is a customs union plus free **movement of factors of production** — labour and capital may cross internal borders as freely as goods. This is leaf 4c-6 as well as 4b-3: it is both a defining feature of the rung and one of the costs and benefits of belonging.` },
      { type: 'paragraph', text: `Allowing capital to move means a firm can put a plant wherever inside the bloc it is cheapest to run, rather than wherever it happens to be based. Allowing labour to move means a shortage in one member can be filled from another without a visa. Both raise output by putting resources where they are most productive.` },
      { type: 'paragraph', text: `Both also redistribute. The member losing workers loses the output they would have produced and often the youngest and most mobile of them; the member receiving them gets the output and the pressure on housing and services that comes with it. Free movement is efficient at the level of the bloc and uneven at the level of the member.` },
    ],
    realExample: { text: `A shortage of nurses in one member and unemployment among nurses in another is solved by movement in a common market and is not solved by removing a tariff, because a tariff was never what was stopping it.` },
    misconception: 'Free movement of factors is not the same as free movement of goods. A customs union with no tariffs at all between members still stops a qualified worker taking a job across the border unless it has gone up a rung.',
    examMatters: 'The spec term is "common market" and the leaf is "movement of factors of production". Both phrases are worth using: they are what the question will be worded in.',
    recall: {
      id: subId('common-markets') + ':recall', type: 'classify',
      prompt: 'Sort each change by the rung it first becomes possible on: customs union or common market.',
      groups: [
        { name: 'Customs union', items: ['An importer pays the same duty at any member\'s port', 'Members negotiate with outsiders as one party'], why: 'Both follow from one agreed external tariff, which is what the second rung adds.' },
        { name: 'Common market', items: ['An engineer takes a job in another member with no permit', 'A firm builds its plant in the member with the lowest costs'], why: 'Both are movements of a FACTOR rather than a good, which is what the third rung adds.' },
      ],
    },
  }),
  sub('economic-and-monetary-unions', 'Economic and Monetary Unions', {
    keyIdea: 'The deepest rung the specification lists: a shared currency, a single monetary policy, and agreed limits on what members may do with their own public finances.',
    body: [
      { type: 'paragraph', text: `An **economic and monetary union** adds a shared currency and a single monetary policy to the common market, together with common rules on members' borrowing and deficits. The specification names these as one rung, not two.` },
      { type: 'paragraph', text: `The gains are the frictions that disappear. There is no cost to converting currency between members and no exchange-rate risk on an internal contract, so a price quoted in one member is directly comparable with a price in another. On a cross-border flow of ${money(FRICTION.flow)}m a year at ${pct(FRICTION.ratePct)}, that is ${money(FRICTION.saving)}m saved annually and permanently.` },
      { type: 'paragraph', text: `The cost is the instrument given up. One monetary policy means one interest rate for members whose economies may need different ones: a member in recession cannot cut its rate, and cannot let its currency fall to price its exports back into the market, because it no longer has one. Adjustment has to come from wages, prices or people moving instead.` },
    ],
    realExample: { text: `A member in a downturn that keeps its own currency can let it depreciate and regain competitiveness. A member inside a monetary union must get the same result by cutting costs directly, which is slower and falls on wages.` },
    misconception: 'A single currency is the visible part, but the binding constraint is the single interest rate. The currency removes a transaction cost; the interest rate removes a policy a member used to be able to use against its own recession.',
    examMatters: 'Evaluate questions on monetary union are decided on whether the answer weighs the saved transaction costs against the lost monetary independence. Naming both and then choosing, with a reason, is the shape of the marks.',
    recall: {
      id: subId('economic-and-monetary-unions') + ':recall', type: 'reorder',
      prompt: 'Put the four types in order, from the least integrated to the most:',
      correctOrder: [
        'Tariffs between members are removed and each keeps its own external tariff',
        'A single external tariff is agreed for imports from outside',
        'Labour and capital become free to move between members',
        'One currency and one monetary policy replace the national ones',
      ],
      why: [
        'The shallowest rung: goods move freely and nothing else changes.',
        'Adding one agreed external rate is what makes it a customs union.',
        'Factors of production move only from the common market rung upwards.',
        'Shared money is the deepest rung the specification lists.',
      ],
    }
  }),
];

/* ══ B7 · Joining a Bloc — 4c-1..6 ════════════════════════════════════════ */

const B7_SUBS = [
  sub('trade-creation', 'Trade Creation', {
    keyIdea: 'Joining lets a member buy from a genuinely cheaper partner instead of making it expensively at home. Production moves to the lower-cost producer, and that is a real gain.',
    body: [
      { type: 'paragraph', text: `**Trade creation** happens when a bloc shifts production from a high-cost domestic producer to a lower-cost producer inside the bloc. The resources the country gives up to get the good fall, which is what makes it a genuine gain rather than a transfer.` },
      { type: 'paragraph', text: `Take a good that costs ${money(B.sources.home)} to make at home, ${money(B.sources.partner)} in a future partner and ${money(B.sources.outside)} outside the bloc, with an external tariff of ${pct(B.creation.before.tariffPct)} on everyone. Before joining, the partner's good lands at ${money(B.creation.before.prices.partner)} and the outsider's at ${money(B.creation.before.prices.outside)}, so the home producer wins at ${money(B.sources.home)}.` },
      { type: 'paragraph', text: `Join, and the partner's tariff goes to zero: its good now lands at ${money(B.sources.partner)} and beats the home producer. The country stops using ${money(B.sources.home)} of its own resources and starts using ${money(B.sources.partner)} of the partner's — a real saving of ${money(B.creation.realSaving)} on every unit.` },
    ],
    realExample: { text: `A member that made its own glass because imports were taxed closes the plant and buys from a partner that makes it more cheaply. The resources the plant used are released for something the country is better at.` },
    misconception: 'Trade creation is not "more trade". Trade can rise while a country loses, which is exactly what trade diversion is. Creation is specifically the shift from a HIGHER-cost source to a LOWER-cost one.',
    examMatters: 'Analyse questions want the resource saving named, not just the label. The mark is for "production moves to the lower-cost producer so fewer resources are used per unit", not for the phrase "trade creation".',
  }),
  sub('trade-diversion', 'Trade Diversion', {
    keyIdea: 'Joining can also shift buying away from the cheapest producer, because a partner paying no tariff undercuts an outsider that pays one. The price falls and the country still loses.',
    body: [
      { type: 'paragraph', text: `**Trade diversion** is the opposite case from the same table, and it is the one students get wrong. Keep the costs — home ${money(B.sources.home)}, partner ${money(B.sources.partner)}, outside ${money(B.sources.outside)} — and set the external tariff at ${pct(B.diversion.before.tariffPct)}.` },
      { type: 'paragraph', text: `Before joining, the partner lands at ${money(B.diversion.before.prices.partner)} and the outsider at ${money(B.diversion.before.prices.outside)}, so the **outsider** wins. The buyer pays ${money(B.diversion.before.pricePaid)}, but ${money(B.diversion.before.pricePaid - B.sources.outside)} of that is tariff the country collects from itself. The resources actually given up are the outsider's cost, ${money(B.sources.outside)}.` },
      { type: 'paragraph', text: `Join, and the partner comes in at ${money(B.sources.partner)} and undercuts the outsider's ${money(B.diversion.after.prices.outside)}. The buyer now pays ${money(B.diversion.after.pricePaid)} — **a fall of ${money(B.diversion.priceFall)}** — while the country's real cost **rises from ${money(B.sources.outside)} to ${money(B.sources.partner)}**, a loss of ${money(B.diversion.realLoss)} a unit. The shop window got cheaper and the country got poorer.` },
    ],
    realExample: { text: `The tariff revenue that used to come back to the government disappears when the supplier changes, and the buyer's saving is smaller than the revenue lost. The difference is the loss.` },
    misconception: 'A falling price looks like a gain, so students score diversion as a benefit. The test is not what the buyer pays; it is how many resources the country gives up. Tariff paid to your own government is not a resource cost.',
    examMatters: 'This is the single most examined distinction in 4c. Whether a bloc is worth joining is settled by whether creation exceeds diversion, so an Evaluate answer needs both worked, not one named.',
    recall: {
      id: subId('trade-diversion') + ':recall', type: 'fillin',
      prompt: `Different figures. A good costs 90 at home, 75 in a partner and 60 outside, with an external tariff of 30% on everyone. Work each one out:`,
      template: [
        'Before joining, the outsider\'s good lands at ___',
        'Before joining, the cheapest source for the buyer is the ___',
        'After joining, the partner\'s good lands at ___',
        'So the resources given up per unit RISE by ___',
      ],
      answers: ['78', 'outsider', '75', '15'],
      hints: ['60 with 30% added', 'compare 90, 97.50 and 78', 'the tariff on a partner goes to zero', 'the partner\'s own cost against the outsider\'s own cost'],
      distractors: ['97.50', 'partner', '3'],
    },
  }),
  sub('costs-and-prices', 'Costs and Prices', {
    keyIdea: 'Removing a tariff between members cuts the price of what crosses the border. The size of the cut is not the tariff rate, because the rate was applied to the pre-tariff price.',
    body: [
      { type: 'paragraph', text: `Leaf 4c-3 is the direct price effect. A good imported from a partner at ${money(FRICTION.importPrice)} with a ${pct(FRICTION.tariffPct)} tariff inside it costs ${money(FRICTION.priceAfter)} once the tariff goes, not ${money(FRICTION.naiveWrong)}.` },
      { type: 'paragraph', text: `The arithmetic matters because the ${pct(FRICTION.tariffPct)} was added to the pre-tariff price, so removing it means dividing by ${qty(1 + FRICTION.tariffPct / 100)} rather than taking ${pct(FRICTION.tariffPct)} off the price on the shelf. Taking the percentage off the final price understates the fall every time.` },
      { type: 'paragraph', text: `Lower input prices feed through to producers as well as shoppers. A manufacturer buying components from a partner sees its own costs fall, which can lower the price of its finished good to buyers who never import anything directly.` },
    ],
    realExample: { text: `A component bought in at ${money(FRICTION.importPrice)} falls to ${money(FRICTION.priceAfter)}. A firm using four of them per machine saves ${money(4 * (FRICTION.importPrice - FRICTION.priceAfter))} per machine before it has changed anything else.` },
    misconception: 'Students take the tariff rate off the observed price. If a 12% tariff is inside a price of 50, the pre-tariff price is 50 divided by 1.12, and the fall is 5.36 rather than 6.',
    examMatters: 'Calculate carries 2 or 4 marks and Appendix 6 advises showing workings. Write the division down: an unsupported final figure cannot be given method marks even when it is right.',
  }),
  sub('economies-of-scale', 'Economies of Scale', {
    keyIdea: 'A bloc gives a firm a bigger market without an export barrier in it. Larger output spreads fixed costs further, so average cost falls and the fall can be passed on.',
    body: [
      { type: 'paragraph', text: `A firm selling only at home might make ${units(SCALE.homeOnly.output)} units at an average cost of ${money(SCALE.homeOnly.unitCost)}. Selling across a bloc it might make ${units(SCALE.blocWide.output)} — ${qty(SCALE.timesLarger)} times as many — and see average cost fall to ${money(SCALE.blocWide.unitCost)}, a fall of ${pct(SCALE.fallPct)}.` },
      { type: 'paragraph', text: `The mechanism is the spreading of fixed costs. A design, a factory and a marketing campaign cost the same whether they serve one market or four, so the cost per unit falls as the units rise. Bulk buying of inputs and more specialised production lines add to it.` },
      { type: 'paragraph', text: `This is the strongest argument for the DEPTH of a bloc rather than just its existence, because it depends on firms actually being able to treat the bloc as one market. Different standards, different paperwork or an exchange rate between members all cut into it.` },
    ],
    realExample: { text: `A pharmaceutical firm spends the same on trials whichever market it sells in. Quadrupling the market it may sell to quarters the trial cost carried by each pack.` },
    misconception: 'Economies of scale are an effect of the market getting bigger, not of the bloc existing. A firm that cannot meet four members\' different product standards has a bigger market on paper and the same output in practice.',
    examMatters: 'This is where an Evaluate answer can distinguish the rungs: a free-trade area gives access, a common market removes more of what stops the access being used, and only the second delivers the full scale gain.',
    recall: {
      id: subId('economies-of-scale') + ':recall', type: 'fillin',
      prompt: 'A different firm makes 5,000 units at an average cost of 88 selling at home, and 25,000 at 66 across the bloc:',
      template: [
        'Output rises by a factor of ___',
        'Average cost falls by ___ per unit',
        'As a percentage of the original cost, the fall is ___%',
      ],
      answers: ['5', '22', '25'],
      hints: ['25,000 divided by 5,000', '88 minus 66', '22 as a share of 88'],
      distractors: ['4', '20', '33'],
    },
  }),
  sub('transaction-costs', 'Transaction Costs', {
    keyIdea: 'Every cross-border sale carries a cost that is not the price of the good: converting currency, clearing customs, proving origin. A deeper bloc removes more of them.',
    body: [
      { type: 'paragraph', text: `**Transaction costs** are what a trade costs on top of the thing traded. Currency conversion takes a spread; customs clearance takes time and fees; proving origin takes paperwork; an exchange rate that moves between agreeing a contract and being paid takes a risk premium.` },
      { type: 'paragraph', text: `They are small per transaction and large in aggregate, which is why they are easy to underrate. On a cross-border flow of ${money(FRICTION.flow)}m a year, a ${pct(FRICTION.ratePct)} cost is ${money(FRICTION.saving)}m — every year, and paid whether the trade was profitable or not.` },
      { type: 'paragraph', text: `Which costs a bloc removes depends on its rung. A free-trade area removes the tariff and adds origin paperwork. A customs union removes the origin paperwork. A monetary union removes the conversion cost and the exchange-rate risk together.` },
    ],
    realExample: { text: `A firm invoicing in another member's currency can pay to fix the rate in advance. That premium is a transaction cost, and it disappears entirely when both members use the same currency.` },
    misconception: 'Transaction costs are dismissed as small change. For a low-margin exporter a 2% conversion cost can exceed the profit margin on the sale, which is why some firms simply do not export until it is removed.',
    examMatters: 'Note the direction of travel: a free-trade area ADDS one transaction cost (rules of origin) while removing tariffs. An answer that says every rung reduces every cost has missed the one exception.',
  }),
  sub('movement-of-factors', 'Movement of Factors of Production', {
    keyIdea: 'From the common market rung upwards, labour and capital move to where they are most productive. Output rises for the bloc, and the gains and losses fall unevenly across members.',
    body: [
      { type: 'paragraph', text: `Leaf 4c-6 is the same freedom that defines the common market, counted here as a cost and a benefit of membership. When labour and capital can cross internal borders, they move towards the higher return — workers towards higher wages, capital towards higher expected profit.` },
      { type: 'paragraph', text: `The bloc-wide effect is a gain. A worker unemployed in one member and employed in another has gone from producing nothing to producing something, and capital invested where it earns most is capital producing most. Total output rises without anyone making anything new.` },
      { type: 'paragraph', text: `The member-level effect is uneven, and this is what an evaluation is really about. The member losing workers loses their output and often keeps the cost of having educated them; the member gaining them gains the output and takes on the demand they place on housing and public services. Both effects are real and they land on different governments.` },
    ],
    realExample: { text: `A member that trains more engineers than it employs sees them take jobs elsewhere in the bloc. The training was paid for at home and the output appears in another member's national accounts.` },
    misconception: 'Free movement of labour is treated as a pure benefit or a pure cost depending on which newspaper the student read. It is a transfer as well as a gain: the bloc is better off and the members are not equally so.',
    examMatters: 'Discuss carries 14 marks and wants the distribution as well as the total. An answer that establishes the efficiency gain and stops has done half of what the command word asks.',
  }),
];

export const SUBS_4 = [...B5_SUBS, ...B6_SUBS, ...B7_SUBS];
export const BLOCKS_4 = [
  { title: B5, sections: B5_SUBS, takeaway: [
    'The WTO enforces promises its members made; it cannot make a country open its market.',
    'Most-favoured nation bans favourites at the border; national treatment bans them behind it.',
    'Consensus among a large, unlike membership is why rounds stalled and blocs grew.',
    'A bloc breaches most-favoured nation by construction and survives as a carved-out exception.',
  ] },
  { title: B6, sections: B6_SUBS, takeaway: [
    'Four rungs, each the one below plus one freedom: goods, the external tariff, factors, money.',
    'No common external tariff is what forces a free-trade area to police rules of origin.',
    'Economic and monetary union is ONE rung in this specification, not two.',
    'Every rung removes a restriction and a policy instrument at the same time.',
  ] },
  { title: B7, sections: B7_SUBS, takeaway: [
    `Creation moves production to a cheaper producer: real cost ${money(B.sources.home)} to ${money(B.sources.partner)}.`,
    `Diversion cuts the price ${money(B.diversion.before.pricePaid)} to ${money(B.diversion.after.pricePaid)} while real cost rises ${money(B.sources.outside)} to ${money(B.sources.partner)}.`,
    'Tariff paid to your own government is a transfer, not a resource cost. That is the whole trap.',
    'Scale, transaction costs and factor movement all depend on which rung the bloc has reached.',
  ] },
];

/* ══ B8 · Why Governments Restrict Trade — 5a-1..6 ═════════════════════════ */

const B8_SUBS = [
  sub('infant-and-geriatric-industries', 'Infant and Geriatric Industries', {
    keyIdea: 'Two opposite arguments with the same shape: an industry is protected because it is not yet competitive, or because it no longer is. Both ask for time.',
    body: [
      { type: 'paragraph', text: `The **infant industry** argument says a new industry cannot compete with established foreign rivals that already have scale and experience, but could if it were given time behind a barrier to reach the same costs. Protection is meant to be temporary and to end when the industry has grown up.` },
      { type: 'paragraph', text: `The **geriatric industry** argument runs the other way. A declining industry asks for protection not to become competitive but to shrink slowly, so that the workers and the regions depending on it have time to adjust rather than being cut off at once.` },
      { type: 'paragraph', text: `The weakness they share is the exit. Protection removes exactly the pressure that would force the industry to reach competitive costs, and the firms receiving it have every reason to argue that they need more of it. An argument for temporary protection is only as good as the mechanism that ends it.` },
    ],
    realExample: { text: `A tariff granted for ten years to let an industry reach scale is still in place twenty years later, and the industry's costs are no closer to the world's. Nothing in the tariff required them to be.` },
    misconception: 'Students treat the infant industry case as discredited. It is not: it is conditional. It works where the industry genuinely has scale economies to reach and where the protection is credibly temporary, and it fails where either condition is missing.',
    examMatters: 'Evaluate answers on protection are decided by the conditions, not the verdict. Naming a credible end point, a target the industry must hit, and who judges it is what separates a supported judgement from an opinion.',
    recall: {
      id: subId('infant-and-geriatric-industries') + ':recall', type: 'classify',
      prompt: 'Sort each case by the argument being made: infant industry or geriatric industry.',
      groups: [
        { name: 'Infant industry', items: ['A new chip plant needs volume before its unit costs match the world\'s', 'A young aerospace supplier cannot yet match established rivals on price'], why: 'Both are industries that could become competitive and are not yet, which is the infant case.' },
        { name: 'Geriatric industry', items: ['A shipyard employing a whole town is closing over five years instead of one', 'An old textile mill wants time for its workers to retrain'], why: 'Both are industries in decline asking for a slower exit rather than a future, which is the geriatric case.' },
      ],
    },
  }),
  sub('jobs-and-domestic-industry', 'Jobs and Domestic Industry', {
    keyIdea: 'The most common political argument and the weakest economic one. Jobs saved in the protected industry are visible; jobs lost elsewhere to higher costs and retaliation are not.',
    body: [
      { type: 'paragraph', text: `Leaf 5a-2 is protection to defend domestic industries and employment. Restricting imports does raise output and employment in the protected industry — that part is real, and it is the part politicians can point at.` },
      { type: 'paragraph', text: `Three costs run the other way and none of them is visible in the protected industry. Firms that BUY the protected good now pay more, so their costs rise and their own employment falls. Consumers paying more for it have less to spend on everything else. And a trading partner that loses sales may retaliate against a different industry altogether.` },
      { type: 'flow', resultType: 'bad', steps: [
        'A tariff protects jobs in the import-competing industry',
        'Firms using that good as an input face higher costs',
        'Exporters lose sales to retaliation in another sector',
      ], result: 'Employment rises where it can be counted and falls where it cannot, and the net effect is usually negative' },
    ],
    realExample: { text: `A tariff on steel protects steelmaking jobs and raises costs for every firm that builds with steel. The second group is far larger and its losses are spread too thinly to be reported as a closure.` },
    misconception: 'The jobs argument is not wrong about the jobs it names. It is wrong about the total, because it counts the gains in one industry and does not count the losses spread across the industries that buy from it.',
    examMatters: 'Analyse carries 6 marks and wants a developed chain. The chain that earns them runs from the tariff to input costs to employment in the USING industry, because that is the step most answers leave out.',
  }),
  sub('national-security', 'National Security', {
    keyIdea: 'Some capabilities a country may not want to depend on a foreign supplier for, at any price. This is an argument about risk rather than about cost.',
    body: [
      { type: 'paragraph', text: `Leaf 5a-3 is protection on national security grounds. The claim is not that domestic production is cheaper — usually it is not — but that a supply which can be cut off in a crisis is worth paying a premium to keep at home. Food, energy, and the industries that feed defence are the usual candidates.` },
      { type: 'paragraph', text: `As economics this is an insurance argument. The country pays a known cost every year, in the form of higher prices, to avoid a low-probability and high-cost event. Whether that is worth doing depends on how likely the disruption is and how bad it would be, not on the price difference alone.` },
      { type: 'paragraph', text: `Its weakness is that it is almost unfalsifiable and therefore easy to borrow. An industry with no security role at all can describe itself as strategic, and the argument is hard to test from outside.` },
    ],
    realExample: { text: `A country keeps a domestic grain capacity it could import more cheaply, and in a normal year that costs it money. The year the shipping route closes is the year the policy is paying for.` },
    misconception: 'This is not a cost argument, so "domestic production is more expensive" is not a rebuttal to it. The rebuttal is either that the risk is small, or that a stockpile would buy the same security more cheaply than permanent protection.',
    examMatters: 'A strong evaluation offers the cheaper alternative. Strategic reserves, diversified suppliers and long-term contracts all address the same risk without protecting an industry permanently.',
  }),
  sub('dumping', 'Dumping', {
    keyIdea: 'Selling exports below cost, or below the price at home, to drive rivals out and raise the price later. The remedy is a duty sized to the gap, not a permanent barrier.',
    body: [
      { type: 'paragraph', text: `**Dumping** is selling in a foreign market below the cost of production, or below the price charged in the producer's own market. Leaf 5a-4 treats preventing it as a reason for restricting trade, and it is the one protectionist argument that free-trade economists generally accept in principle.` },
      { type: 'paragraph', text: `The concern is predatory: a foreign producer prices below cost long enough to drive domestic rivals out, then raises the price once the market is theirs. Consumers gain in the short run and lose over the whole period, so the cheap goods are not a gift.` },
      { type: 'paragraph', text: `The difficulty is proving it. A foreign producer may be cheaper because it is genuinely more efficient, or because it has scale a domestic firm does not, and neither is dumping. **Anti-dumping duties** are the standard response — a duty set to the size of the gap rather than a general tariff — and they are the most frequently misused instrument in trade policy for exactly that reason.` },
    ],
    realExample: { text: `An importer sells at a price no domestic producer can match. Whether that is dumping or efficiency depends on the exporter's own costs and home price, which the importing country has to establish rather than assume.` },
    misconception: 'Cheap imports are not dumping. Dumping is a price below the producer\'s own cost or below its home price, and a competitor that is simply better at making the thing is not dumping however much it undercuts.',
    examMatters: 'The mark is for the definition\'s precision. "Selling below cost or below the home-market price" scores; "selling very cheaply to destroy competition" describes the motive and misses what the term means.',
  }),
  sub('the-deficit-and-the-revenue-motive', 'The Deficit and the Revenue Motive', {
    keyIdea: 'Two reasons about the government\'s own accounts: cutting imports to shrink a current-account deficit, and taxing them because a tariff is easy to collect.',
    body: [
      { type: 'paragraph', text: `Leaf 5a-5 is protection **to correct a deficit on the current account of the balance of payments**. Restricting imports reduces spending abroad, which mechanically narrows the deficit. The specification names it here as a reason for restricting trade; the current account itself belongs to 4.3.3.` },
      { type: 'paragraph', text: `It is a weak instrument for the purpose. A deficit usually reflects domestic demand running ahead of domestic supply, which a tariff does not change: spending diverted from imports mostly moves to domestic goods, and if partners retaliate, exports fall and the deficit reappears on the other side of the account.` },
      { type: 'paragraph', text: `Leaf 5a-6 is protection **to raise revenue**, and it is an administrative argument rather than an economic one. Imports arrive at a small number of ports in recorded quantities, which makes a tariff one of the cheapest taxes to collect. For a government with a weak income-tax system that can matter more than the efficiency loss.` },
    ],
    realExample: { text: `A government facing a deficit raises tariffs across the board. Import spending falls, its trading partner raises its own tariffs in response, and export earnings fall by a similar amount.` },
    misconception: 'Students treat the revenue motive as obviously bad economics. For a low-income government it is often the realistic alternative to not collecting the revenue at all, and the efficiency loss has to be weighed against that rather than against a tax system the country does not have.',
    examMatters: 'The current account is 4.3.3\'s topic and appears here only as a REASON. An answer that drifts into the components of the current account has left the leaf being examined.',
  }),
];

/* ══ B9 · The Tools of Protection — 5b-1..4 ════════════════════════════════ */

const B9_SUBS = [
  sub('tariffs', 'Tariffs', {
    keyIdea: `A tax on an import. It raises the price buyers pay, so domestic supply expands and demand contracts, and imports are squeezed from both sides at once.`,
    body: [
      { type: 'paragraph', text: `A **tariff** is a tax on an imported good. Take a market where the world price is ${money(T.worldPrice)}: at that price domestic producers supply ${units(T.atWorld.supply)} units, buyers want ${units(T.atWorld.demand)}, and imports fill the gap of ${units(T.importsBefore)}.` },
      { type: 'paragraph', text: `Add a tariff of ${money(T.tariff)} and the price in the market becomes ${money(T.protectedPrice)}. Domestic producers move up their supply curve to ${units(T.atProtected.supply)}; buyers move down their demand curve to ${units(T.atProtected.demand)}. **Imports fall from ${units(T.importsBefore)} to ${units(T.importsAfter)}** — and note that they fall for two separate reasons, more home production and less total consumption.` },
      { type: 'paragraph', text: `The government collects the tariff on what still comes in: ${money(T.tariff)} on ${units(T.importsAfter)} units is ${money(T.c)}. Who gains and who loses by how much is the subject of the next block; the mechanism is here.` },
    ],
    realExample: { text: `The same tariff yields less revenue the higher it goes. At a rate high enough to stop imports altogether the government collects nothing at all, having protected the industry completely.` },
    misconception: 'Students say a tariff "makes imports more expensive". It makes the good more expensive — domestic output included — because home producers can now charge the higher price too. That price rise on domestic units is where their gain comes from.',
    examMatters: 'Appendix 6 makes Draw the command word that requires an accurately drawn diagram. An Explain may be answered in prose, and a clear price-and-quantity chain earns the marks without one.',recall: {
      id: subId('national-security') + ':recall', type: 'reorder',
      prompt: 'Put the retaliation sequence in the order it happens:',
      correctOrder: [
        'A government raises tariffs to cut spending on imports',
        'Import spending falls and the deficit narrows at first',
        'Trading partners raise their own tariffs in response',
        'Export earnings fall and the deficit reopens',
      ],
      why: [
        'The policy starts with the import side, which is the side a tariff can reach.',
        'The first effect is real, which is why the policy is attractive.',
        'Retaliation is the response the policy invites rather than an accident.',
        'The deficit reappears through exports, the side the tariff never touched.',
      ],
    }
  }),
  sub('quotas', 'Quotas', {
    keyIdea: 'A limit on the quantity allowed in. It produces the same price rise as an equivalent tariff, and hands the government\'s revenue to whoever holds the licence instead.',
    body: [
      { type: 'paragraph', text: `A **quota** caps the quantity of a good that may be imported. Set the cap at ${units(Q.limit)} units in the same market and the price rises to ${money(Q.price)} — exactly what the ${money(T.tariff)} tariff did, because the same quantity is being kept out.` },
      { type: 'paragraph', text: `Consumers lose the same ${money(Q.consumerLoss)} and domestic producers gain the same ${money(Q.producerGain)}. The difference is the ${money(Q.rent)} in between. Under a tariff that is government revenue. Under a quota nobody collects a tax, and it goes to whoever holds the right to import — as **quota rent** — which may be a domestic importer or the foreign exporter, depending on how the licences are handed out.` },
      { type: 'flow', resultType: 'bad', steps: [
        'A quota caps imports below the free-trade quantity',
        'The domestic price rises until demand matches the restricted supply',
        `The ${money(Q.rent)} that a tariff would have raised becomes rent to the licence holder`,
      ], result: `Consumers lose ${money(Q.consumerLoss)} and the welfare loss is ${money(Q.deadweight)}, the same as the tariff's, with the revenue gone` },
    ],
    realExample: { text: `If import licences are given to foreign exporters, the rent leaves the country entirely — so the same restriction costs the importing country more under a quota than under the equivalent tariff.` },
    misconception: 'A quota is not "a tariff with a different name". The price effect and the welfare loss match, and the transfer does not: the government gets nothing, and the rent can leave the country.',
    examMatters: 'Comparing a tariff with a quota is a standard Examine question. The answer is the revenue-against-rent difference plus the point that a quota fixes the quantity while a tariff fixes the price wedge.',
  }),
  sub('non-tariff-barriers', 'Non-Tariff Barriers', {
    keyIdea: 'Everything that restricts imports without being a tax or a quantity cap: standards, licences, inspections, paperwork. Hardest to measure and hardest to challenge.',
    body: [
      { type: 'paragraph', text: `**Non-tariff barriers** restrict imports by making them harder rather than dearer. Product standards a foreign producer must redesign for, licensing requirements, customs procedures slow enough to spoil perishable goods, and testing that must be repeated in the importing country all qualify.` },
      { type: 'paragraph', text: `They matter more than they used to precisely because tariffs have come down. A bound tariff is a published number a partner can point at; a safety standard is a legitimate policy that happens to exclude, and distinguishing genuine regulation from disguised protection is the hard part of modern trade policy.` },
      { type: 'paragraph', text: `Their economic effect resembles a quota's — a restricted quantity and a higher domestic price — with one difference that makes them worse. The cost of compliance is largely wasted rather than transferred: nobody collects it, the way a government collects a tariff or a licence holder collects rent.` },
    ],
    realExample: { text: `A standard requiring a test that only laboratories inside the importing country can perform does not ban anything. It adds a cost and a delay that some exporters will decide are not worth paying.` },
    misconception: 'Not every regulation is a barrier. A safety standard applied equally to domestic and imported goods is national treatment working as intended; it becomes a barrier when it is written so that only domestic producers can easily meet it.',
    examMatters: 'This is the leaf where the WTO material pays off. National treatment is the rule that a non-tariff barrier is tested against, so an answer can link 5b-3 back to 4a and earn analysis marks for it.',
    recall: {
      id: subId('non-tariff-barriers') + ':recall', type: 'reorder',
      prompt: 'Put the effects of imposing a tariff in the order they follow from each other:',
      correctOrder: [
        'A tax is added to the price of the imported good',
        'Domestic producers expand output along their supply curve',
        'Buyers cut back the quantity they demand',
        'Imports are squeezed from both sides and fall',
      ],
      why: [
        'The tariff acts on the price first; every other effect follows from it.',
        'A higher price makes output worth producing that was not worth producing before.',
        'The same higher price moves buyers down their demand curve.',
        'Supply up and demand down together are what shrink the gap imports fill.',
      ],
    }
  }),
  sub('subsidies-to-domestic-producers', 'Subsidies to Domestic Producers', {
    keyIdea: 'Pay domestic producers instead of taxing imports. Consumers keep the world price, so the distortion is only in production — and the loss is half the tariff\'s.',
    body: [
      { type: 'paragraph', text: `A **subsidy to domestic producers** is a payment per unit produced. In the same market, a subsidy of ${money(S.perUnit)} lets domestic producers behave as though the price were ${money(T.protectedPrice)} while buyers still pay the world price of ${money(S.price)}.` },
      { type: 'paragraph', text: `That single difference changes everything downstream. Demand stays at ${units(S.demand)} because consumers face no price rise at all; domestic supply still rises from ${units(S.domesticBefore)} to ${units(S.domesticAfter)}; so imports fall from ${units(S.importsBefore)} to ${units(S.importsAfter)} entirely through extra home production.` },
      { type: 'paragraph', text: `The government pays ${money(S.perUnit)} on every one of the ${units(S.domesticAfter)} domestic units, which is ${money(S.cost)}. Producers gain ${money(S.producerGain)}. The difference, ${money(S.deadweight)}, is the waste — resources used at home that could have bought the good more cheaply abroad. **That is half the ${money(T.deadweight)} the tariff destroyed**, because a subsidy distorts production without also distorting consumption.` },
    ],
    realExample: { text: `The cost is visible in the budget rather than in the shops, which is politically harder and economically cleaner: a tariff hides its cost in prices, and a subsidy has to be voted for.` },
    misconception: 'A subsidy looks more generous than a tariff and is cheaper in welfare terms, not more expensive. Students assume that because the government pays out rather than takes in, it must cost the country more. The consumption distortion is what makes the tariff worse.',
    examMatters: 'If a question asks which tool does least damage for a given amount of protection, the answer is the subsidy, and the reason is that consumers never face a distorted price. That reason is the mark.',
    recall: {
      id: subId('subsidies-to-domestic-producers') + ':recall', type: 'fillin',
      prompt: 'A different market: the world price is 40, a subsidy of 8 per unit lifts domestic supply from 30 to 55, and demand stays at 120 throughout.',
      template: [
        'The government pays a total of ___',
        'Imports before the subsidy are ___',
        'Imports after the subsidy are ___',
      ],
      answers: ['440', '90', '65'],
      hints: ['8 on every unit produced at home', '120 less the 30 made at home', '120 less the new domestic output'],
      distractors: ['240', '55', '25'],
    },
  }),
];

/* ══ B10 · Who Gains and Who Loses — 5c-1..5 ═══════════════════════════════ */

const B10_SUBS = [
  sub('the-four-areas', 'Consumers, and the Four Areas', {
    keyIdea: `Consumers carry the whole price rise. Their loss splits four ways, and only two of those four are anybody else's gain.`,
    body: [
      { type: 'paragraph', text: `Leaf 5c-1 is the impact on consumers, and it is the largest single effect. When the tariff takes the price from ${money(T.worldPrice)} to ${money(T.protectedPrice)}, buyers pay ${money(T.tariff)} more on every unit they still buy and give up the units they no longer buy. The total loss is ${money(T.consumerLoss)}.` },
      { type: 'paragraph', text: `That loss divides into four areas, conventionally **a**, **b**, **c** and **d**. Area **a**, ${money(T.a)}, becomes producer surplus. Area **c**, ${money(T.c)}, becomes government revenue. Areas **b** and **d**, ${money(T.b)} each, become nothing at all — they are the **welfare loss**.` },
      { type: 'paragraph', text: `The arithmetic is the argument. ${money(T.a)} plus ${money(T.b)} plus ${money(T.c)} plus ${money(T.d)} is ${money(T.consumerLoss)}, so the net loss to the country is ${money(T.deadweight)}: **what consumers lose exceeds what producers gain PLUS what the government raises**. Saying instead that producers gain less than consumers lose is true of every tariff ever levied and proves nothing.` },
    ],
    realExample: { text: `Area b is the resource waste of making at home what could be imported more cheaply; area d is the value buyers placed on the units they no longer buy at all. Nobody receives either.` },
    misconception: 'The tariff\'s cost is not the revenue the government raises. The revenue is a transfer from consumers and comes back to the country; the cost is the two triangles, which come back to nobody.',
    examMatters: 'Label the areas and state which becomes whose. An answer that says "there is a welfare loss" without identifying b and d has not shown where the loss comes from.',
    recall: {
      id: subId('the-four-areas') + ':recall', type: 'fillin',
      prompt: 'A different tariff. Consumers lose 1,200 in total, producers gain 450, and the government raises 500.',
      template: [
        'Producer gain plus government revenue is ___',
        'So the welfare loss is ___',
        'The two triangles are worth ___ each if they are equal',
      ],
      answers: ['950', '250', '125'],
      hints: ['add the two transfers together', 'the consumer loss less the two transfers', 'split the loss in two'],
      distractors: ['1700', '750', '475'],
    },
  }),
  sub('producers-and-governments', 'Producers and Governments', {
    keyIdea: 'Domestic producers gain on the units they were already making as well as the new ones. The government gains only while imports keep coming.',
    body: [
      { type: 'paragraph', text: `Leaf 5c-2 is the impact on producers. Their gain, area **a** of ${money(T.a)}, has two parts: a higher price on the ${units(T.atWorld.supply)} units they were already making, and the margin on the ${units(T.atProtected.supply - T.atWorld.supply)} extra units the higher price makes worth producing.` },
      { type: 'paragraph', text: `The first part is the larger and the less deserved: it is money transferred from buyers to producers for output that existed anyway. That is why protection is so reliably lobbied for — the gain arrives immediately and does not require the industry to change anything.` },
      { type: 'paragraph', text: `Leaf 5c-3 is the impact on governments. A tariff raises ${money(T.c)} here, and the revenue is self-limiting: it is collected only on imports that still arrive, so the more effective the protection, the less it raises. A quota raises nothing, and a subsidy costs ${money(S.cost)} rather than raising anything.` },
    ],
    realExample: { text: `An industry that gains ${money(T.a)} from a tariff will spend a great deal to keep it, while consumers losing ${money(T.consumerLoss)} spread across the whole market will spend nothing to remove it. Concentrated gains beat diffuse losses politically.` },
    misconception: 'Producer surplus is not profit. It is the gain over the minimum the producer would have accepted, so a firm can gain producer surplus from a tariff while still making an accounting loss.',
    examMatters: 'The three tools differ most for the government: a tariff raises revenue, a quota raises none, and a subsidy is a spending commitment. A question about the government\'s finances turns on that distinction.',
  }),
  sub('protection-and-living-standards', 'Living Standards', {
    keyIdea: 'Living standards fall through prices, choice and the quality that competition forces. The fall is spread thinly enough that nobody reports it.',
    body: [
      { type: 'paragraph', text: `Leaf 5c-4 is the impact on living standards, and it is broader than the price effect. Real incomes fall because the same money buys less. Choice narrows as varieties available only from abroad stop arriving. And quality drifts, because the competitive pressure that forced domestic producers to improve has been removed along with the imports.` },
      { type: 'paragraph', text: `The dynamic effect is the one that compounds. A protected industry has less reason to invest in productivity, so over a decade its costs can drift further from the world's rather than closer — which is the infant industry argument failing in slow motion.` },
      { type: 'paragraph', text: `Against that, protection can defend living standards in a specific place. A town whose single large employer closes suffers a concentrated and lasting fall in living standards, and an economist's national total does not capture it.` },
    ],
    realExample: { text: `Spread ${money(T.consumerLoss)} across a whole market and no individual buyer notices. Concentrate the same amount on the employees of one plant and it is the defining economic event of their year.` },
    misconception: 'A national fall in living standards is an average and averages conceal distribution. Protection can raise living standards for a protected group while lowering the total, which is why the two questions need answering separately.',
    examMatters: 'Evaluate questions reward the distinction between the national total and the distribution. An answer carrying both, and saying which matters more for the policy in question, is doing what the command word asks.',
  }),
  sub('equality', 'Equality', {
    keyIdea: 'A tariff is a tax on spending, so it takes a larger share of a small income. Which way it moves equality depends on who buys the good and who makes it.',
    body: [
      { type: 'paragraph', text: `Leaf 5c-5 is the impact on equality. A tariff works like an indirect tax: it is levied on what is bought rather than on what is earned, so it takes a larger share of a poorer household's income than a richer one's. Tariffs on food and clothing are **regressive** for exactly that reason.` },
      { type: 'paragraph', text: `The other direction runs through the protected industry. If protection defends jobs that are lower-paid than average, it may support incomes at the bottom even while raising the prices those incomes face, and the two effects have to be weighed rather than assumed to cancel.` },
      { type: 'paragraph', text: `Between countries the effect is more one-sided. Rich-country protection often falls hardest on agricultural and textile exports, which are the goods lower-income countries are most able to sell. Protection there raises inequality between nations as well as within them.` },
    ],
    realExample: { text: `A tariff on basic foodstuffs costs a low-income household a noticeable share of its weekly spending and a high-income household a rounding error, from the same rate applied to the same goods.` },
    misconception: 'Students assume protecting jobs must help the poorest. It depends entirely on whether the protected workers are poorer than the consumers paying the higher prices, and for basic goods they often are not.',
    examMatters: 'Equality is a named leaf, so a question on the impact of protectionism can ask for it directly. Both channels — regressive prices and protected wages — are needed for a developed answer.',
    recall: {
      id: subId('equality') + ':recall', type: 'match',
      prompt: 'Match each impact to the group the specification names for it:',
      pairs: [
        { left: 'Pays the whole of the price rise', right: 'Consumers', why: 'The price rise lands on buyers first and in full.' },
        { left: 'Gains on existing output as well as new output', right: 'Producers', why: 'The gain on output that existed anyway is the larger part.' },
        { left: 'Collects nothing at all under a quota', right: 'Governments', why: 'A quota transfers the same money to the licence holder instead.' },
        { left: 'Falls through price, choice and quality together', right: 'Living standards', why: 'Three channels, only one of which is the price.' },
        { left: 'Worsened by a regressive tax on necessities', right: 'Equality', why: 'The same rate takes a larger share of a smaller income.' },
      ],
    },
  }),
];

export const SUBS_5 = [...B8_SUBS, ...B9_SUBS, ...B10_SUBS];
export const BLOCKS_5 = [
  { title: B8, sections: B8_SUBS, takeaway: [
    'Infant and geriatric industries both ask for time; both fail without a credible end point.',
    'The jobs argument counts gains in one industry and not losses in the industries that buy from it.',
    'National security is an insurance argument, so the rebuttal is a cheaper way to buy the same cover.',
    'Dumping is below own cost or below home price, and a tariff to fix a deficit invites retaliation.',
  ] },
  { title: B9, sections: B9_SUBS, takeaway: [
    `A tariff of ${money(T.tariff)} takes imports from ${units(T.importsBefore)} to ${units(T.importsAfter)}, squeezed from both sides.`,
    `A quota at ${units(Q.limit)} gives the same price and turns ${money(Q.rent)} of revenue into rent.`,
    'Non-tariff barriers waste the compliance cost instead of transferring it to anyone.',
    `A subsidy leaves consumers at the world price, so its loss is ${money(S.deadweight)} against the tariff's ${money(T.deadweight)}.`,
  ] },
  { title: B10, sections: B10_SUBS, takeaway: [
    `Consumers lose ${money(T.consumerLoss)}: ${money(T.a)} to producers, ${money(T.c)} to the government, ${money(T.deadweight)} to nobody.`,
    'The loss exists because consumers lose more than producers gain PLUS the revenue raised.',
    'Producers gain most on output that already existed, which is why protection is lobbied for.',
    'A tariff on necessities is regressive, and rich-country protection hits poorer countries hardest.',
  ] },
];

export const ALL_BLOCKS_39B = [...BLOCKS_4, ...BLOCKS_5];
export const ALL_SUBS_39B = [...SUBS_4, ...SUBS_5];
