/**
 * PACKET 27 — business-objectives-strategy: quiz, practice, flashcards, common mistakes and chains.
 *
 * WHAT THE MARCH BANK GOT WRONG, and which findings about it were right.
 *
 * TEN QUIZ ITEMS, FIVE OF THEM ON MATERIAL THE SECTION NEVER TAUGHT — `quiz-01` and `structure-04`.
 * Indices 3, 5, 6, 7 and 9 tested the Boston Matrix, PESTLE, the five forces and strategic versus
 * tactical decisions, none of which appeared in content[] at all. With the pre-test sampling from the
 * same bank, most pre-tests contained at least one item about something the section would never
 * teach, which is the "pre-test demotivates" complaint arriving by the shortest possible route.
 * Six of the seven chapters here did not exist in March, so the bank is rebuilt rather than repaired.
 *
 * TWO ITEMS ARE GONE RATHER THAN REWRITTEN:
 *   - the Boston Matrix item (`quiz-01`), because the matrix is IAL 1.3.3 · 1c — Unit 1 marketing,
 *     where `marketing-mix-strategy` already teaches it — and this section owns only the AIM of
 *     portfolio analysis (:1100).
 *   - the minimum-wage PESTLE item (`quiz-02`), which had two defensible answers and an explanation
 *     that conceded as much. A question with two right answers is not repaired by picking one of
 *     them. The ambiguity is real and it is now TAUGHT, in `one-factor-two-letters`, where the point
 *     is that following the consequence matters and filing the letter does not.
 *
 * NINE PRACTICE ITEMS AND ALL EIGHT IAL BUSINESS COMMAND WORDS. The March five carried three tariff
 * defects against Appendix 6, and `topFix-05` names none of them:
 *   - "Define the term 'mission statement' and explain how it differs from a corporate objective.
 *     (4 marks)" — Define is TWO marks in Business, and the item is two questions in one stem.
 *   - a 10-mark Assess. Assess is 10 in Units 1 and 2 and **12 in Units 3 and 4** (bus_spec.txt:2238-2245),
 *     and this section is WBS13.
 *   - an "Outline two reasons…" item. Outline is not an IAL command word in either subject.
 * `topFix-05` also asks for case-applied Ansoff and Porter questions, which the March bank had none of
 * (`structure-08`) while carrying two on objectives the content never taught.
 *
 * EVERY GUIDANCE IS AT LEAST TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx`
 * prints `guidance.split('\n')[0]` above the answer box in guided mode, which `getPracticeMode` gives
 * to every item except the first and last of a section. Above 6 marks nothing allocates points at
 * all, because those tariffs are levels-marked.
 */
import { id, hash8, money, pc, ADISA, DECISIONS, CAPITAL_SHARE } from './_packet27-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet27-content.mjs';

const A = ADISA;
const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position, as packets 24
 * and 25 did. Hand-picking positions produces exactly the lumpy distribution `quiz.histogram` looks
 * for; ranking items by a hash of their own stem and taking the rank modulo four gives an even spread
 * by construction, is stable across edits, and a verifier can reproduce it from this file alone.
 */
const placeKeys = (items) => {
  const rank = new Map(items.map((x, i) => [i, hash8(x.question)])
    .sort((a, b) => (a[1] < b[1] ? -1 : 1))
    .map(([i], r) => [i, r % 4]));
  return items.map((x, i) => {
    const slot = Math.min(rank.get(i), x.options.length - 1);
    return { ...x, options: [...x.options.slice(1, slot + 1), x.options[0], ...x.options.slice(slot + 1)], correctIndex: slot };
  });
};

/* ══ Quiz ═════════════════════════════════════════════════════════════════
 * The first THREE carry no block and are therefore the pre-test pool: PreTest.jsx takes the first
 * three items no block has reserved, in array order. They are first because a free student's bank is
 * sliced server-side, so a pre-test whose pool sat at the end of the array would serve that student
 * PINNED questions instead.
 */
export const QUIZ = placeKeys([
  qi(null, 'A corporate objective differs from a mission statement because it:',
    ['carries a figure and a date, so it can be checked', 'is written by senior managers rather than by the board', 'is published for customers rather than kept inside the firm', 'lasts longer and is changed less often'],
    'The mission statement gives the purpose and has nothing that could be measured; an objective turns a direction into something somebody can check on a stated day. Who writes it, who reads it and how long it lasts are all secondary to that.'),
  qi(null, "Ansoff's Matrix sorts growth options by:",
    ['whether the product and the market are existing or new', 'whether the business competes on cost or on being different', 'how much capital each option needs to get started', 'how fast the market each option leads into is growing'],
    'Two questions, two answers each, four cells. The second option is Porter\'s matrix, and the last two are things Ansoff cannot see at all — which is why a good answer uses it to lay options out and then brings in something else to choose between them.'),
  qi(null, 'In a SWOT analysis, an opportunity is:',
    ['an external change the business could turn to its advantage', 'a plan the business has decided to pursue next year', 'a strength that has not been fully used yet', 'a market in which the business already holds a strong position'],
    'Opportunities sit on the external row, with threats. The test is whether the change would still be happening if the business did nothing — a plan and an unused strength are both internal, and a strong position is a strength.'),

  /* ── Block 1 · Mission, corporate aims and corporate objectives ── */
  qi(B1, 'Corporate objectives are developed from:',
    ['the mission statement and the corporate aims', 'the objectives each department has already set', 'the performance of competitors in the same market', 'the budget available for the coming year'],
    'The specification asks for the development of corporate objectives from the mission statement and corporate aims: purpose narrows to direction, and direction narrows to a measurable target. Competitors and budgets inform the target; they are not where it comes from.'),
  qi(B1, 'Which of these is usable as a corporate objective rather than a direction?',
    ['Raise the cooling share of revenue to a quarter within two years', 'Become the leading appliance maker in the region', 'Improve the quality of every product we make', 'Grow faster than our main competitors'],
    'A usable objective has a figure and a date, so somebody can say on that date whether it was met. The other three state where the business is heading and give nothing that could be checked on a given day.'),
  qi(B1, 'A critical appraisal of a mission statement asks, above all, whether it:',
    ['rules any decision out', 'is written in clear and inspiring language', 'mentions the customers as well as the shareholders', 'has been approved by the whole board'],
    'A statement that excludes nothing cannot settle an argument, cannot tell an outsider anything and cannot filter a proposal — so everything a mission statement is supposed to do depends on it ruling something out. The other three are judgements about the writing or the process.'),
  qi(B1, 'The strongest sign that a mission statement is doing no work inside a business is that:',
    ['pay and promotion reward something it does not mention', 'it has not been rewritten for several years', 'competitors have published something similar', 'it is shorter than one sentence'],
    'Where the rewards point one way and the statement points another, staff follow the rewards. Staying unchanged for years is what a mission statement is supposed to do, and resembling a rival\'s or being short says nothing about whether anybody uses it.'),

  /* ── Block 2 · Ansoff's Matrix ── */
  qi(B2, 'A business selling its existing product in a new country is pursuing:',
    ['market development', 'product development', 'market penetration', 'diversification'],
    'The product is unchanged and the market is new, so the market is what developed. Students most often swap this with product development — the test is which of the two words names the thing that actually changed.'),
  qi(B2, 'Diversification is the Ansoff cell in which:',
    ['both the product and the market are new to the business', 'the product is new and the market is one it already serves', 'the business sells several unrelated products in one market', 'the business spreads its investment across several suppliers'],
    'New on both dimensions, which is why the risks multiply rather than add: a mistake about the product or a mistake about the buyers is enough on its own. Spreading investment is a different idea that happens to share the word.'),
  qi(B2, 'Risk rises across the matrix mainly because each move further from the top-left cell:',
    ['asks the business to learn something it does not already know', 'requires a larger amount of capital to begin', 'takes longer before the first sale is made', 'involves a market in which competition is stronger'],
    'Everything the business does not know is somewhere a forecast can be wrong. The other three are often true as well, but they are consequences of particular moves rather than the reason the matrix is drawn with risk rising away from that corner.'),
  qi(B2, "Which question can Ansoff's Matrix NOT answer?",
    ['How large is the market this move would take us into?', 'Is this move about a new product, a new market, or both?', 'Which of these options is furthest from what we already do?', 'Does this option belong in the same cell as that one?'],
    'The matrix is built from exactly two questions, so anything answerable from those two it answers well. Nothing about size, money or rivals enters it, which is why an answer that stops at naming the cell has stopped early.'),

  /* ── Block 3 · Porter's Strategic Matrix ── */
  qi(B3, "Porter's Strategic Matrix is built from two dimensions:",
    ['the source of the advantage, and the breadth of the target', 'the growth of the market, and the share the firm holds', 'whether the product is new, and whether the market is new', 'the level of costs, and the level of prices'],
    'Where the advantage comes from — lower cost or being different — against how wide the target is. The second option is portfolio analysis and the third is Ansoff; the fourth confuses cost with price, which is the error this chapter spends a subsection on.'),
  qi(B3, 'A firm with the lowest costs in a broad market that charges the same price as its rivals is:',
    ['a cost leader, taking the advantage as a wider margin', 'not pursuing any of the four positions in the matrix', 'a differentiator, because its price is not lower', 'stuck in the middle, because it is neither cheapest nor distinctive'],
    'Cost leadership is about what it costs the business to supply, not what it charges. A firm with the lowest costs can pass the advantage on as a lower price or keep it as margin, and both are the same position.'),
  qi(B3, "'Differentiation focus' describes a business that offers:",
    ['something distinctive, built for one part of the market', 'something distinctive, sold across the whole market', 'the lowest cost, to one part of the market', 'the lowest cost, across the whole market'],
    'Focus is a width, not a source of advantage, so each focus cell has to say which kind it is. The other three options are the other three cells, which is why leaving "focus" unqualified loses half the matrix.'),
  qi(B3, "Porter's warning about a firm being 'stuck in the middle' is that it:",
    ['has neither a cost advantage nor anything buyers will pay extra for', 'is too large for a niche and too small for the whole market', 'has chosen a position between two of the four cells deliberately', 'competes in a market where margins are low for every firm'],
    'The claim is that the two sources of advantage pull against each other, so a firm doing a little of both ends up with neither. Firms do sometimes hold both, and a strong answer names what those firms have that others do not rather than simply asserting that Porter was wrong.'),

  /* ── Block 4 · The aim of portfolio analysis ── */
  qi(B4, 'The aim of portfolio analysis is to:',
    ['decide where the business should put its resources next', 'value each product line for sale or closure', 'forecast how each market will grow over the next five years', 'compare the business with its closest competitor'],
    'Every finding a portfolio analysis produces ends in something moving — cash, investment or a line being released. It contains no valuations and no forecasts, and it is about this firm\'s own set of lines rather than about a rival.'),
  qi(B4, "'This market is growing at 14% a year' is a statement about:",
    ['the market, and would be true whoever was selling into it', 'the business, because it is the rate at which its sales are growing', 'the business, because it is the share of revenue this line earns', 'the market, but only for the firm that leads it'],
    'Growth describes the market; share describes the firm\'s position in it. Confusing the two, or confusing either with a line\'s share of company revenue, makes the whole analysis unreadable.'),
  qi(B4, 'Which conclusion does a portfolio analysis alone NOT support?',
    ['This line should be closed', 'Most of our revenue sits in slow-growing markets', 'Our largest share is in our least dynamic market', 'Our fastest-growing market is the one we are weakest in'],
    'A portfolio contains positions, not causes: a small share in a growing market might mean the firm arrived late, or built the wrong product, or is holding back deliberately, and those lead to three different decisions. The other three simply read the numbers.'),
  qi(B4, 'A product line earning little may still be worth keeping when:',
    ['it carries a service network the profitable lines depend on', 'it has been part of the business for a long time', 'closing it would reduce the number of products offered', 'its market share is stable from one year to the next'],
    'Lines are connected, and reading each one alone is exactly the mistake portfolio analysis exists to prevent — a mistake it is still possible to make inside the tool. Age, product count and a stable share are not reasons on their own.'),

  /* ── Block 5 · Strategic and tactical decisions ── */
  qi(B5, 'The clearest test of whether a decision is strategic is:',
    ['what it would cost to reverse it', 'how senior the person who took it is', 'how large the sum of money involved is', 'how long it took to reach the decision'],
    'When the four tests disagree, reversibility is the one to trust: a decision that can be undone next month has committed the business to nothing, whoever signed it. Seniority and size both fail — a board can approve a one-off discount and a plant manager can commit a line for a decade.'),
  qi(B5, 'Which of these is a tactical decision?',
    ['A four-week discount to clear stock before a model change', 'Opening a factory in a country the business has not sold in', 'Moving from a broad low-cost position to a narrow specialist one', 'Committing a quarter of a year\'s revenue to a new production line'],
    'One function, a few weeks, and next month it can be different. The other three reach across the business, run for years, and cost most of what they cost to do if they have to be undone.'),
  qi(B5, 'The three kinds of resource the specification names as affected by strategic and tactical decisions are:',
    ['human, physical and financial', 'human, financial and reputational', 'physical, financial and technological', 'human, physical and environmental'],
    'Human, physical and financial, and no others — so an answer reaching for brand or reputation is answering a different question. Each has its own timescale: money moves fastest, people more slowly, and specialised physical assets slowest of all.'),
  qi(B5, 'A decision to buy a highly specialised machine is hard to reverse mainly because:',
    ['few other buyers have any use for it', 'it is usually the most expensive item the firm buys', 'it takes a long time to install and commission', 'the staff trained on it would have to be retrained'],
    'The more specialised the asset, the less it is worth to anybody else, and a machine nobody else wants is a decision that cannot be sold out of. Cost, installation time and retraining all matter and none of them is what closes the exit.'),

  /* ── Block 6 · SWOT analysis ── */
  qi(B6, 'In a SWOT analysis, the first question to ask about any item is:',
    ['whether it comes from inside the business or outside it', 'whether it helps the business or holds it back', 'whether it is large enough to be worth listing', 'whether the business has already responded to it'],
    'The specification splits 3a by origin — internal considerations, then external considerations — and the order is not a formality: an internal item can be changed and an external one can only be responded to, so an item in the wrong row leads to the wrong kind of action.'),
  qi(B6, 'A price rise the business itself announced belongs in a SWOT under:',
    ['weaknesses, if it is hurting the business', 'threats, because it is losing the business customers', 'opportunities, because it raises revenue per unit', 'none of the four, because the business chose it'],
    'The boundary test is whether it would still be true if the business did nothing, and a decision the firm took itself fails that test. Filing it as a threat hides the one thing that matters most about it, which is that the firm can reverse it.'),
  qi(B6, 'Which of these is a genuine strength rather than a statement true of almost any firm?',
    ['A third of the largest market in its industry', 'A committed and hard-working workforce', 'A focus on delivering quality to customers', 'Experienced managers who understand the business'],
    'A strength that a rival could claim word for word supports no conclusion about this firm. A measured share of a named market could not be claimed by anybody else, which is exactly what makes it usable.'),
  qi(B6, 'A SWOT analysis turns into a strategy when:',
    ['items are matched across the grid into a move and a risk', 'all four boxes have been filled with at least three items', 'the strengths outnumber the weaknesses', 'it has been reviewed by every department in the business'],
    'A strength put against an opportunity is a move; a weakness put against a threat is a risk that needs covering. Four full lists are four lists, and counting items on each side measures nothing at all.'),

  /* ── Block 7 · External influences ── */
  qi(B7, 'PESTLE stands for political, economic, social, technological and:',
    ['legal and environmental', 'legal and ethical', 'logistical and environmental', 'legal and external'],
    'All six are named in the specification in full, so all six are learnable and none is optional. The point of the list is to make a business look in six directions rather than the two it is used to.'),
  qi(B7, 'A fall in the cost of a key component most directly:',
    ['raises the threat of new entrants', 'raises the bargaining power of buyers', 'lowers the threat of substitutes', 'lowers rivalry among existing firms'],
    'A lower cost of building the product means more firms can afford to start, which is the entry force. This is the chain worth practising: a PESTLE factor usually reaches a business by moving one of the five forces.'),
  qi(B7, 'A market growing quickly can still be a poor one to enter because:',
    ['growth says how much value is created, not who keeps it', 'fast-growing markets always attract government regulation', 'growth rates are usually revised downwards later', 'a new entrant cannot build market share while a market is growing'],
    'Where rivalry, entry, substitutes, buyers and suppliers are all strong, the value created in an industry leaves it — to buyers as lower prices, to suppliers as higher input costs, or to whoever arrives next. That is the question the five forces answer and PESTLE cannot.'),
  qi(B7, 'The difference between PESTLE and the five forces is that:',
    ['PESTLE scans everything outside the firm; the forces examine one industry', 'PESTLE looks at the present and the five forces at the future', 'PESTLE is used by large firms and the five forces by small ones', 'PESTLE lists threats and the five forces lists opportunities'],
    'Two frameworks at two distances. Using one where the other is wanted is the commonest error in this chapter, and the strongest answers connect them: a PESTLE factor usually reaches the business by moving a force.'),
]);

/* ══ Practice ═════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'corporate objective'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Decide first what makes this different from the level above it in the hierarchy, because that difference is where the second mark lives.\n'
    + 'A target for the whole business (1 mark) that carries a figure and a date, so that it can be measured (1 mark). An answer that says it is "a goal the business wants to achieve" has given one half and reworded it: the measurability is what separates an objective from an aim, and it must appear.'),

  pr(B1, 'Explain', 4, 'Explain how a corporate objective is developed from a mission statement. (4 marks)',
    'Appendix 6 defines Explain as a brief explanation of cause or effect supported by details or examples, so plan the link before writing. There is a level between the two things named in the question, and an answer that jumps straight from one to the other has skipped the step that makes the chain work.\n'
    + 'The mission statement states the purpose the business exists to serve (1 mark). Corporate aims are the broad directions chosen to serve that purpose (1 mark). A corporate objective narrows one of those directions into a target with a figure and a date attached (1 mark), so that progress towards the purpose can be measured and somebody can be held to it (1 mark). An example carried through all three levels earns the detail the command word asks for.'),

  pr(B2, 'Construct', 4, "Construct Ansoff's Matrix, labelling both dimensions and naming all four cells. (4 marks)",
    'Appendix 6 defines Construct as requiring an accurately labelled diagram. Decide what goes on each dimension before drawing anything, because the cells only mean something once the labels are there — a grid of four names with no axes cannot show that any of them is in the right place.\n'
    + 'A two-by-two grid with products on one dimension and markets on the other, each marked existing and new (1 mark). Market penetration in the existing-product, existing-market cell (1 mark). Market development in the existing-product, new-market cell, and product development in the new-product, existing-market cell (1 mark). Diversification in the new-product, new-market cell (1 mark). Swapping the two middle cells is the commonest error, and the labels on the dimensions are what prevent it.'),

  pr(B2, 'Assess', 12, `${A.name} makes ${A.what} and takes ${money(A.totalRevenue)} a year, ${pc(A.biggest.revenueShare)} of it from water heaters in a market growing at ${pc(A.biggest.growth)} a year where it holds ${pc(A.biggest.share)}. It is choosing between taking its existing heaters into a neighbouring country and developing a solar water heater for the customers it already has. Assess which of the two it should pursue. (12 marks)`,
    'Both options sit one step from what this business already does, so an answer that simply says one is riskier than the other has not used the case. Start by naming which cell each option is in and what is new in each, then look for the facts in the stem that bear on them — there is information here about a market, about a share and about a growth rate, and each points somewhere.\n'
    + 'A supported judgement needs both options developed and then a reason for preferring one. For market development: the product is proven, the engineering is done, and the constraint is distribution and unfamiliar buyers. For product development: the customers and the service network are known, and the constraint is whether the firm can build something it has not built. The stem supplies the tie-breaker — a home market growing slowly with a share already high leaves little room for growth at home, which strengthens the case for new buyers; while a solar product connects to demand the firm can already see. Either conclusion can be supported. What cannot be supported is a general claim that one of these two cells is always the riskier, because both ask the firm to learn exactly one new thing, and which one is harder depends on whether this firm knows its customers or its engineering better.'),

  pr(B3, 'Analyse', 6, `${A.name} is deciding whether to defend its broad low-cost position in water heaters or build a narrow position in off-grid pumps for remote farms. Analyse the implications of choosing the narrow position. (6 marks)`,
    'Appendix 6 defines Analyse as a brief chain of reasoning with interpretation where data is given, and it excludes evaluation — so build one chain properly rather than weighing the two options against each other. Choose the strand that runs furthest: what a narrow differentiated position needs, and what the firm would have to stop doing to provide it.\n'
    + 'A narrow differentiated position competes on something buyers in one segment value rather than on price (1 mark), so it needs engineering aimed at those buyers and a sales approach that reaches them (1 mark). Those are not the capabilities a broad low-cost position is built on, which are scale and tight unit costs (1 mark). The firm cannot supply both well from one factory and one brand (1 mark), so resources move towards the pump line and away from heaters (1 mark), and the heater share it currently holds would be expected to erode as rivals compete on a cost base it is no longer defending (1 mark).'),

  pr(B4, 'Calculate', 4, `${A.name}'s revenue by line is: water heaters ${money(A.lines[0].revenue)}, refrigerators ${money(A.lines[1].revenue)}, air conditioners ${money(A.lines[2].revenue)} and solar pumps ${money(A.lines[3].revenue)}. ${A.name} holds ${pc(A.lines[2].share)} of the air conditioner market. Calculate (a) the percentage of total revenue coming from air conditioners and solar pumps together, and (b) the total value of the air conditioner market. (4 marks)`,
    'Appendix 6 defines Calculate as a calculation based on given data, with calculators permitted and workings given. Two answers are wanted and they use different data, so do not carry a figure from the first into the second. Part (b) turns a share into a whole, which means deciding which way round the division goes before reaching for the calculator.\n'
    + `Part (a): the two lines together are ${money(A.lines[2].revenue)} plus ${money(A.lines[3].revenue)}, which is ${money(A.fastRevenue)} (1 mark). Total revenue is ${money(A.totalRevenue)}, so the share is ${money(A.fastRevenue)} divided by ${money(A.totalRevenue)}, giving ${pc(A.fastRevenueShare)} (1 mark). Part (b): ${A.name}'s air conditioner revenue of ${money(A.lines[2].revenue)} is ${pc(A.lines[2].share)} of that market (1 mark), so the market is ${money(A.lines[2].revenue)} divided by ${A.lines[2].share / 100}, giving ${money(A.lines[2].marketSize)} (1 mark). Multiplying by the share instead of dividing is the common error and produces a market smaller than the firm selling into it.`),

  pr(B5, 'Discuss', 8, `${A.name} is choosing between committing ${money(DECISIONS.strategic.capital)} to a second production line and running a four-week discount to clear refrigerator stock. Discuss the effects of these two decisions on the firm's human, physical and financial resources. (8 marks)`,
    'Appendix 6 defines Discuss as requiring logical chains of reasoning in context with a brief assessment showing awareness of competing factors. Three named resources and two decisions gives six combinations, and an answer that lists all six briefly will say less than one that develops the contrast in two of them and then judges. Decide early which resource separates these two decisions most sharply.\n'
    + `On people, the strategic decision needs hiring and training that takes longer than the recruitment itself, while the discount moves nobody. On physical resources, a production line is specialised and hard to sell on, while the discount uses warehouse space that was already there. On money, ${money(DECISIONS.strategic.capital)} is ${pc(CAPITAL_SHARE)} of a year's revenue, it must be funded from somewhere, it carries an opportunity cost against the other lines, and the return arrives years later; the discount gives up margin for four weeks and can be stopped whenever the firm chooses. The brief assessment is the comparison rather than a third list: the tactical decision costs something real and commits nothing, and the strategic one commits all three resources at once, which is why it belongs to the board and the discount does not. A judgement that notes the two are not alternatives — the firm could do both — is a legitimate one if it is argued from the resources rather than asserted.`),

  pr(B6, 'Construct', 4, `Construct a SWOT grid for ${A.name}, labelling both dimensions and placing one item in each of the four cells. (4 marks)`,
    'Appendix 6 defines Construct as an accurately labelled diagram. The dimensions are what make a SWOT grid a diagram rather than four headed lists, so decide what each one is before placing anything, and place each item by where it came from before asking whether it helps.\n'
    + `A grid labelled by origin, internal and external, and by effect, helps and holds back (1 mark). A strength specific to this firm, such as its share of the water heater market (1 mark). A weakness that is a consequence of the firm's own choices, such as producing in a single factory (1 mark). An opportunity and a threat that would both be true if ${A.name} did nothing — rising demand for cooling, and low-cost imports arriving (1 mark). An item that any appliance maker could claim, such as "a hard-working workforce", supports no conclusion about this firm and shows nothing about the grid.`),

  pr(B7, 'Evaluate', 20, `${A.name} holds ${pc(A.lines[2].share)} of a ${money(A.lines[2].marketSize)} air conditioner market growing at ${pc(A.lines[2].growth)} a year, and is considering committing ${money(DECISIONS.strategic.capital)} to a second production line to expand that share. Evaluate whether the external environment supports this decision. (20 marks)`,
    'Appendix 6 defines Evaluate as requiring fully developed chains of reasoning with a full awareness of the validity and significance of competing arguments, leading to a perceptive conclusion proposing a solution or recommendations. Two frameworks look outward at different distances and the question is about the environment, so decide early how you will use both rather than running one and then the other. The strongest structure connects them: an external change usually reaches a business by moving a competitive force.\n'
    + `On the supporting side, several external influences point the same way: hotter summers and changing household expectations are creating the demand, and cheaper components are making the product affordable — so the growth in this market is being created by forces outside the industry rather than by the firms in it, which makes it more likely to continue. Against that, the five forces are what decide whether ${A.name} would keep any of the value it adds by expanding. The same cheap components that create the opportunity lower the cost of entry for everybody, so the threat of new entrants rises with the market and the extra capacity may arrive whether or not ${A.name} builds it; a few large retail chains stand between the firm and the household, which is buyer power; and a firm holding only ${pc(A.lines[2].share)} of this market has none of the scale its ${pc(A.lines[0].share)} in water heaters gives it, so it is expanding from a weak position rather than a strong one. The significance of each argument matters as much as its direction: a growing market with weak forces rewards expansion, and a growing market with strong forces is a race that the strongest balance sheet wins. A perceptive conclusion recommends a course of action and names what would change it — expanding narrowly where buyer power is weaker, or waiting for evidence that capacity is not about to arrive from elsewhere, are both defensible if the reasoning behind them is developed.`),
];

/* ══ Flashcards ═══════════════════════════════════════════════════════════ */

const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is a mission statement?', 'A statement of what the business is for — its purpose, in words, meant to last for years. It carries no figure and no date.'),
  card('What are corporate aims?', 'The broad directions the business follows in order to serve its mission. They sit between the mission statement and the corporate objectives.'),
  card('What is a corporate objective?', 'A target for the whole business carrying a figure and a date, developed from the mission statement and the corporate aims.'),
  card('What makes an objective usable?', 'A figure, a date and an owner — so somebody can say on a stated day whether it was met.'),
  card('What does a critical appraisal of a mission statement ask?', 'Whether it rules any decision out, whether anybody inside uses it to decide anything, and whether pay and promotion point the same way.'),
  card("What two questions build Ansoff's Matrix?", 'Is the product one the business already sells, and is the market one it already sells to?'),
  card('Name the four Ansoff cells.', 'Market penetration (existing/existing), market development (existing product, new market), product development (new product, existing market), diversification (new/new).'),
  card('Why does risk rise across Ansoff\'s Matrix?', 'Because each move asks the business to learn something it does not already know, and everything it does not know is somewhere a forecast can be wrong.'),
  card('Are product development and market development ranked against each other?', 'No. Both ask the firm to learn exactly one new thing, and which is harder depends on whether it knows its customers or its engineering better.'),
  card("What are the two dimensions of Porter's Strategic Matrix?", 'The source of the advantage — lower cost or being different — and the breadth of the target, broad or narrow.'),
  card("Name the four cells of Porter's Strategic Matrix.", 'Cost leadership, differentiation, cost focus, differentiation focus.'),
  card('Is cost leadership the same as charging the lowest price?', 'No. It is about what it COSTS the business to supply. A cost leader may charge the market price and keep the difference as margin.'),
  card("What is Porter's 'stuck in the middle' warning?", 'That a firm doing a little of both ends up with neither a cost advantage nor anything buyers will pay extra for. Firms that hold both usually have a specific reason you can name.'),
  card('What is a product portfolio?', 'Everything the business sells, treated as one set rather than one product at a time.'),
  card('What is the aim of portfolio analysis?', 'To decide where resources go next: whether the set is balanced, which lines fund which, where the next investment goes, and what can be released.'),
  card('Which two numbers describe each line in a portfolio?', 'How fast that MARKET is growing, and how much of that market WE hold. Neither is the line\'s share of company revenue.'),
  card('What can portfolio analysis not tell you?', 'Why a line is where it is. It is a snapshot with no causes and no forecasts, so it points at a decision without making it.'),
  card('What separates a strategic from a tactical decision?', 'How far it reaches and what undoing it would cost — not the seniority of the decider or the size of the sum.'),
  card('Which test wins when the four disagree?', 'Reversibility. A decision that can be undone next month has committed the business to nothing.'),
  card('Which three resources does the specification name?', 'Human, physical and financial — and no others.'),
  card('Why do physical commitments dominate reversibility?', 'The more specialised an asset, the less it is worth to anybody else, and a machine nobody else wants cannot be sold out of.'),
  card('What does SWOT ask first about any item?', 'Where it came from: internal or external. Only then whether it helps or holds back.'),
  card('What is the internal/external boundary test?', 'Would this still be true if the business did nothing? If yes it is external; if it is the firm\'s own choice it is internal.'),
  card('When does a SWOT become a strategy?', 'When items are matched across the grid: a strength against an opportunity is a move, a weakness against a threat is a risk to cover.'),
  card('What does PESTLE stand for?', 'Political, economic, social, technological, legal, environmental.'),
  card('Does it matter which PESTLE letter a factor is filed under?', 'No. Many factors sit under two at once. The letters are a prompt to look in six directions; the work is following the factor through to a cost, a price or a position.'),
  card("Name Porter's five forces.", 'Rivalry among existing firms, threat of new entrants, threat of substitutes, buyer power, supplier power.'),
  card('What do the five forces answer that PESTLE cannot?', 'How much of the value created in this industry a firm in it can keep. Growth says how much value is created; the forces say who keeps it.'),
];

/* ══ Common mistakes ══════════════════════════════════════════════════════ */

const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake("Naming only three of Porter's four cells",
    'Writing that Porter says a firm must choose cost leadership, differentiation or focus.',
    'The specification names Porter\'s Strategic Matrix, and a matrix is built from two dimensions with two values each, which gives four cells. "Focus" is a WIDTH, not a source of advantage, so it appears twice — as cost focus and as differentiation focus — and collapsing them into one loses the dimension that generated them.',
    'Name all four cells and say which dimension each pair shares: the left column is lower cost at two widths, the right column is being different at the same two widths.'),
  mistake('Treating cost leadership as charging the lowest price',
    'Identifying the cheapest firm in a market as the cost leader.',
    'Cost is what the business pays to supply; price is what the customer pays. A firm with the lowest costs can charge the market price and keep the difference, and it is still a cost leader. A firm charging the lowest price with ordinary costs has no advantage at all — it has a thin margin and no protection, which is a problem rather than a strategy.',
    'Look for where the cost advantage comes from — scale, process, purchasing, location — and check that the price is a choice rather than what is left over.'),
  mistake('Putting the firm\'s own decision under threats',
    'Listing a price rise, a policy change or a product withdrawal the business itself announced in the external half of a SWOT.',
    'The external row is for changes that would be happening if the business did not exist. A decision the firm took itself fails that test, however much trouble it caused. Filing it as a threat hides the only thing that matters about it, which is that the firm can reverse it.',
    'Apply the boundary test to every item: would this still be true if the business did nothing? If not, it belongs on the internal row, where something can be done about it.'),
  mistake('Ranking the two middle Ansoff cells against each other',
    'Writing that product development is always riskier than market development, or always safer.',
    'Both cells ask the business to learn exactly one new thing — a product in one case, a set of buyers in the other. Nothing in the matrix ranks them, and which is harder depends on the firm: one that knows its customers better than its engineering will find product development the harder of the two, and one that knows its engineering better will find the reverse.',
    'Say that both are one step from what the firm already knows, then say which step THIS firm is better equipped to take and why.'),
  mistake('Writing a PESTLE of statements true of every firm',
    'Listing "economic factors will affect the business" or "technology is changing rapidly" under the relevant letters.',
    'A factor that is not named and not connected to a decision applies equally to every business in the world, so it supports no conclusion about this one. The value of the framework is that it forces a business to look in six directions, not that it produces six headings.',
    'For each letter name the change, say which decision it touches and say which way it pushes. Three letters done that way are worth more than six headings with nothing under them.'),
  mistake('Reading a line\'s share of revenue as its share of its market',
    'Writing that a line with 18% of company revenue "holds 18% of the market".',
    'They are different numbers doing different jobs. One says how much of OUR money this line earns; the other says how strong we are where it competes. A line can be a fifth of the company and a twentieth of its market, which is precisely the situation portfolio analysis is looking for.',
    'Name which of the two you are using every time: "18% of our revenue" or "6% of that market". The sentence should say whose percentage it is.'),
];

/* ══ Extras ═══════════════════════════════════════════════════════════════ */

export const EXTRAS = {
  chains: [
    {
      title: 'From a mission statement to something measurable',
      steps: [
        'The mission statement says what the business exists to do.',
        'Corporate aims turn that purpose into two or three broad directions.',
        'One direction is narrowed into a target with a figure and a date.',
        'A part of the business is made responsible for that target.',
        'On the stated date, somebody can say whether it was met.',
      ],
      result: 'Every target traceable upwards to a purpose — and an objective that cannot be traced is serving something else.',
    },
    {
      title: 'A strategic decision, traced through all three resources',
      steps: [
        `${A.name} commits ${money(DECISIONS.strategic.capital)} to a second production line — ${pc(CAPITAL_SHARE)} of a year's revenue.`,
        `Financial: the money must be funded, is unavailable for anything else, and returns nothing for ${DECISIONS.strategic.years} years.`,
        `Human: about ${DECISIONS.strategic.hires} people are hired and trained, and the skills take longer to build than the hiring takes.`,
        'Physical: a specialised line is installed that few other buyers would want.',
        'The firm now carries more risk and has less room to be wrong about anything else.',
      ],
      result: 'All three resources committed at once, which is what makes it strategic — and what makes it slow and costly to reverse.',
    },
    {
      title: 'An external change reaching a business through a force',
      steps: [
        'A component becomes cheaper — a technological change, on the PESTLE list.',
        'Building the product now costs less than it did.',
        'Firms that could not afford to enter this industry now can.',
        'The threat of new entrants rises, which is one of the five forces.',
        'More capacity arrives, and prices and margins come under pressure.',
      ],
      result: 'The same change that creates the opportunity raises the force that decides who keeps the value from it.',
    },
    {
      title: `Reading a portfolio, and what it makes ${A.name} do`,
      steps: [
        `${pc(A.slowRevenueShare)} of revenue comes from markets growing at ${pc(A.lines[0].growth)} and ${pc(A.lines[1].growth)} a year.`,
        `Those are the markets where ${A.name} is strongest, holding ${pc(A.lines[0].share)} and ${pc(A.lines[1].share)}.`,
        `The two fastest-growing markets return only ${pc(A.fastRevenueShare)} of revenue.`,
        `And they are the two where ${A.name} is weakest, at ${pc(A.lines[2].share)} and ${pc(A.lines[3].share)}.`,
        'So today\'s cash and tomorrow\'s growth are in different places.',
      ],
      result: 'The decision the analysis points at: move resources from where the revenue is to where the growth is, before the revenue stops.',
    },
    {
      title: 'What a large capital commitment does to a firm, in order',
      steps: [
        'The money leaves the business on the day the line is ordered.',
        'It has to be funded — from cash held, from borrowing, or from new investment.',
        'Every other use of that money is now closed off, which is the opportunity cost.',
        'And the return, if it comes at all, is years away.',
      ],
      result: 'Until it arrives the firm carries more risk and has less room to be wrong about anything else — which is what makes the decision strategic rather than large.',
    },
    {
      title: 'How far a growth move is from what the firm already knows',
      steps: [
        'Selling more of what it already makes to the buyers it already has asks it to learn nothing.',
        'Taking that same product to buyers it does not have means learning one thing: who they are.',
        'Building something new for the buyers it knows means learning one thing: how to make it.',
        'Doing both at once means learning a product and a market together.',
      ],
      result: 'Risk rises with the COUNT of new things, not with the size of the move — and the two middle cells are level with each other.',
    },
    {
      title: "Testing Porter's warning against a firm that seems to escape it",
      steps: [
        'The claim: the four cells are genuinely different businesses and a firm must choose one.',
        'The counter-case: some firms hold a low cost base and a design reputation at the same time.',
        'The condition: those firms usually have one mechanism doing both jobs, or scale that funds the difference.',
        'The judgement: the trade-off holds wherever that condition is absent.',
      ],
      result: 'An evaluation is the conditions under which each side holds, not a vote for or against Porter.',
    },
    {
      title: 'Turning a filled-in SWOT grid into two conclusions',
      steps: [
        'Place every item by where it came from, inside the business or outside it.',
        'Discard anything a rival could have written word for word.',
        'Set a strength against an opportunity the firm is equipped to take.',
        'Set a weakness against a threat that could reach it.',
      ],
      result: 'A move and a risk, each traceable back to an item on the grid rather than asserted.',
    },
    {
      title: 'How a settled industry stops being the one a strategy was chosen for',
      steps: [
        'An industry settles, and the assumptions behind every strategy in it get made.',
        'Something outside it changes what the product can be — technology, or what buyers want.',
        'Firms that were never in this industry arrive, with a different cost base.',
        'The advantages the old rivals held were advantages against each other, and stop mattering.',
      ],
      result: 'The environment the strategy was chosen for has gone, and the commitment outlives the conditions it was made under.',
    },
  ],
  /*
   * V035: authored `{title, points}`, and ExtrasTab.jsx renders `{point.content}` — the heading
   * appeared and the four points never reached the page, so each card was a question with no
   * answer. Rewritten as the `{title, content}` prose the component reads and packets 28-38
   * author. Every analytical move in the four points survives.
   */
  evaluation: [
    {
      title: 'How much weight should a strategic tool carry in an answer?',
      content: 'Four tools and four different jobs: Ansoff sorts options, Porter positions a firm, a portfolio matrix ranks what is already owned, and SWOT connects the inside to the outside. None of them substitutes for another, so the first question is whether the tool being reached for answers the question actually asked. The second is whether the case supplies what the tool needs, because a matrix filled from assumptions describes the assumptions and nothing else. The third is the most uncomfortable: could the conclusion have been reached without the tool? Where it could, the tool is decoration. What earns the weight back is naming what the tool leaves out and leaving it out specifically — size for Ansoff, resources for Porter, causes for a portfolio, and time for all four.',
    },
    {
      title: 'How firm is a judgement about strategy?',
      content: 'Reversibility sets the bar. A commitment that can be unwound cheaply needs far less certainty before it is taken than one that cannot, so the same evidence supports a confident recommendation in one case and a hedged one in the other. Two things then decide whether the evidence is good enough to clear that bar. A strategy is chosen for years, and where the environment is changing quickly the conditions it was chosen for may not last them. And the firm has to be able to be wrong and survive, which depends on how much of its resources the one decision commits. Finally, check what the evidence is about: a claim about firms in general rarely settles what this particular firm should do, and the case itself holds the facts that would.',
    },
    {
      title: 'How useful is a mission statement?',
      content: 'One test does most of the work: does it rule anything out? A statement that excludes no decision cannot settle an argument, which is why so many of them survive contradictory strategies without embarrassment. Three checks follow from it. Does anybody inside the business use it to decide anything, or is it quoted only outward? Do pay and promotion reward what it describes, because where the two disagree staff follow the rewards and the statement loses. And would anything actually change if the statement changed? Where nothing would, it is a public document rather than a management tool — which is not worthless, but it is a different thing, and an answer that judges it as strategy has judged the wrong object.',
    },
  ],
};
