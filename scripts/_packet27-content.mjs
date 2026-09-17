/**
 * PACKET 27 — business-objectives-strategy, Learn Mode content and Notes.
 *
 * Business Unit 3 (WBS13), IAL topic 3.3.1, audit/raw/bus_spec.txt:1090-1110. SEVEN blocks in the
 * specification's own order: one per sub-topic, except the four-leaf sub-topic 2, which is split leaf
 * by leaf because each of its four leaves is a tool in its own right. Thirty-five subsections, one
 * idea each, against the March section's FOUR.
 *
 * SEVEN AND NOT EIGHT. `freeQuizPayload()` spends 2 on the Quiz tab, one pin per block, and then the
 * pre-test's headroom, all bounded by FREE_QUIZ_MAX. At eight blocks a signed-out student's pre-test
 * drops from three questions to two; at nine a chapter is served no check-in quiz at all. Packet 25
 * measured the table; this section is the first to design against it.
 *
 * THE SCOPE DECISIONS THE SPECIFICATION SETTLED BEFORE A WORD WAS WRITTEN (see NEXT.md for all eight):
 *
 *   - DISTINCTIVE CAPABILITIES IS NOT IN THIS SPECIFICATION AND `specGap-05` ASKS FOR IT. `distinctive
 *     capabilit` is 0 in bus_spec.txt, `Kay` appears once as a name in the acknowledgements, and all
 *     five hits of `competitive advantage` belong to other topics — Unit 1 marketing at :471 and :542,
 *     Unit 2 operations at :984, :995 and :1002. It is UK GCE A-level 3.1.2 material. Not built.
 *   - THE BOSTON MATRIX BELONGS TO 1.3.3, AND THE AIM OF PORTFOLIO ANALYSIS BELONGS HERE. `specGap-04`
 *     and `quiz-01` ask for the matrix; :1100 asks for the AIM. The matrix itself is 1.3.3 · 1c
 *     (:605), the Unit 1 marketing section, where it is already taught. Chapter 4 teaches the aim and
 *     names the Boston Matrix as the Unit 1 tool it is, in one sentence, without rebuilding its cells.
 *   - SMART IS ZERO IN THE SPECIFICATION AND NO FINDING SAYS SO. It was half of block 1's title, the
 *     section's first takeaway and its opening subsection. An audit item says what is MISSING, never
 *     what is PRESENT and should not be (packet 20). The spec's chain is mission statement/corporate
 *     aims → corporate objectives (1a), and SMART survives as one named mention of how objectives are
 *     commonly written, in the one subsection that is about writing them.
 *   - `functional objectives` IS ZERO TOO, so the four-tier hierarchy the Notes carried goes; the two
 *     tiers the specification names stay, and `structure-09` is right that `corporate aims` belongs
 *     in it (:1095).
 *   - A NAMED TOOL BRINGS ITS OWN CELLS AND NOTHING ELSE. `cost leadership`, `diversification`,
 *     `market development` and `product development` are all 0 in bus_spec.txt, which is packet 20's
 *     signature — but :1098-1099 names Ansoff's Matrix and Porter's Strategic Matrix by name, and a
 *     named framework cannot be taught without its own cells. What does NOT come with them is a
 *     neighbouring framework's vocabulary: `differentiation`'s four spec hits are Unit 1 product
 *     differentiation and USPs, `penetration`'s one hit is penetration PRICING (:650), and `focus`
 *     never means Porter's focus strategy anywhere in the document.
 *   - "PORTER'S GENERIC STRATEGIES" IS NOT THE NAME OF ANYTHING HERE. `generic strateg` is 0;
 *     :1099 reads "Porter's Strategic Matrix". `accuracy-01` is right, and a matrix has four cells.
 *
 * Money is in dollars. Every figure belongs to Adisa Home and is derived in _packet27-util.mjs. Real
 * examples name real firms and carry NO year and NO figure (packet 15's accuracy-01 rule) — which is
 * also how `topFix-04` and `accuracy-02` are answered: the Netflix SWOT and the Amazon Ansoff example
 * were dated claims about real firms that this repository cannot check, so they are replaced rather
 * than corrected.
 */
import { subId, SECTION, hash8, money, pc, ADISA, DECISIONS, CAPITAL_SHARE, FAST_GROWTH } from './_packet27-util.mjs';

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

const A = ADISA;

export const B1 = 'Mission, Corporate Aims and Corporate Objectives';
export const B2 = "Ansoff's Matrix";
export const B3 = "Porter's Strategic Matrix";
export const B4 = 'The Aim of Portfolio Analysis';
export const B5 = 'Strategic and Tactical Decisions';
export const B6 = 'SWOT Analysis';
export const B7 = 'External Influences';

/* ══ Block 1 — Mission, corporate aims and corporate objectives (1a, 1b) ══ */

const whatAMissionStatementIs = (() => {
  const sid = subId('what-a-mission-statement-is');
  return {
    id: sid,
    title: 'What a Mission Statement Is',
    keyIdea: 'A mission statement says what the business is for — the purpose everything else in the organisation is supposed to serve.',
    body: [
      { type: 'paragraph', text: 'Every other document a business produces answers **how much** or **by when**. A **mission statement** answers something earlier than either: what is this business for, and who is it for?' },
      { type: 'paragraph', text: 'It is written in words rather than numbers, it is meant to last for years, and it is deliberately broad — broad enough that a decision nobody has thought of yet can still be tested against it.' },
      { type: 'paragraph', text: 'That breadth is the point and it is also the weakness, which is why the specification does not stop at asking what a mission statement is. It asks you to **appraise** one, and this chapter ends there.' },
    ],
    realExample: { emoji: '🧭', text: 'Grameen Bank exists to lend to people banks will not lend to. That single purpose explains its branch model, its group lending and its refusal of collateral — and it rules out the ordinary lending that would be more profitable.' },
    misconception: 'Students write that a mission statement is a target the business is trying to hit. It is not a target; it has no number and no date, and it is not something that can be achieved and ticked off. Instead write: it states the purpose the business exists to serve, and the targets are developed from it.',
    examMatters: 'Appendix 6 defines Define (2 marks) as requiring students to define a term or phrase. For this term that means the purpose and who it is for, not an example of a company that has one.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the description of a mission statement:',
      template: [
        'A mission statement says what the business is ___',
        '→ written in ___ rather than numbers',
        '→ and meant to last several ___',
      ],
      answers: ['for', 'words', 'years'],
      hints: ['purpose, not performance', 'the opposite of a measurable target', 'longer than an objective, which is one to three of them'],
      distractors: ['worth', 'percentages', 'a quarter'],
    }),
  };
})();

const fromMissionToObjectives = (() => {
  const sid = subId('from-mission-to-objectives');
  return {
    id: sid,
    title: 'Developing Corporate Objectives From the Mission',
    keyIdea: 'Corporate objectives are developed from the mission statement and the corporate aims: purpose narrows to direction, and direction narrows to a target that can be measured.',
    body: [
      { type: 'paragraph', text: 'The specification asks for a **development**, not a list. Three levels, and each one narrows the one above it until something is specific enough to be measured.' },
      { type: 'flow', steps: [
        { title: 'Mission statement', subtitle: 'why the business exists — rarely changed' },
        { title: 'Corporate aims', subtitle: 'the broad directions that serve that purpose' },
        { title: 'Corporate objectives', subtitle: 'targets with a figure and a date attached' },
      ], result: 'Every target traceable to a purpose', resultType: 'good' },
      { type: 'paragraph', text: 'Read it downwards and it is a chain of reasoning. Read it **upwards** and it is a test: if you cannot trace an objective back to the mission, then either the objective is serving something else, or the mission is not doing any work.' },
    ],
    examMatters: 'Appendix 6 defines Explain (4 marks) as requiring a brief explanation of cause or effect supported by details or examples. An Explain of this chain wants the link between two named levels, with the business in front of you supplying the detail — not all three levels defined in turn.',
    realExample: { emoji: '🏗️', text: 'A cement producer whose mission is to supply the region\'s builders sets an aim of reaching every major city, and from that an objective of opening two new depots before the next building season.' },
    misconception: 'Students list the three levels as separate ideas. The specification asks for a development, which is an arrow: each level is chosen because of the one above it. Instead show the link, and use it as a test — an objective that cannot be traced upwards is serving something else.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these in order, from the broadest statement to the most specific:',
      correctOrder: [
        'Why the business exists at all',
        'Broad directions chosen to serve that purpose',
        'A target carrying a figure and a date',
        'What one department must deliver this year',
      ],
      why: [
        'Purpose comes first because everything below it is chosen to serve it',
        'A direction is narrower than a purpose and there can be several of them',
        'A target is the first level specific enough to be measured',
        'A department works out what its own share of that target is, which is narrower again',
      ],
    }),
  };
})();

const writingAnObjective = (() => {
  const sid = subId('writing-a-corporate-objective');
  return {
    id: sid,
    title: 'What Makes an Objective Usable',
    keyIdea: 'An objective is usable when somebody can say, on a stated date, whether it was met — which needs a figure, a date, and one person or team who owns it.',
    body: [
      { type: 'paragraph', text: '"Grow the business" is a direction. "Raise revenue from cooling products to a quarter of the total within two years" is an objective, and the difference is that the second can be checked.' },
      { type: 'bullets', items: [
        '**A figure** — the amount, the share or the level being aimed at.',
        '**A date** — when it will be judged, not when work starts.',
        '**An owner** — the part of the business that will be asked about it.',
      ] },
      { type: 'paragraph', text: 'The widely used checklist for this is **SMART** — specific, measurable, achievable, relevant, time-bound. It is a useful habit rather than part of the specification, and the three tests above are what it is actually asking for.' },
      { type: 'paragraph', text: 'One warning about the third letter. An objective nobody can reach demotivates; an objective everybody would reach anyway measures nothing. Both fail, in opposite directions.' },
    ],
    realExample: { emoji: '🎯', text: 'A bus operator that promises to \'improve reliability\' cannot tell whether it has. One that commits to nine in ten services departing within five minutes of the timetable can be judged by anybody with a watch.' },
    misconception: 'Students write objectives that sound ambitious and cannot be checked. \'Maximise growth\' has no figure, no date and nobody who owns it. Instead give all three, and remember that an objective everybody would reach anyway measures nothing.',
    examMatters: 'Appendix 6 defines Analyse (6 marks) as requiring a brief chain of reasoning with interpretation where data is given. Where a case supplies an objective, the analysis usually starts by asking what it can and cannot be judged against.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement: is it usable as a corporate objective, or is it still only a direction?',
      groups: [
        { name: 'A usable objective', items: ['Raise the cooling share of revenue to a quarter within two years', 'Cut returns to one in fifty units by the end of next year', 'Open in three new countries before the end of the plan period'] },
        { name: 'Still a direction', items: ['Become the region\'s leading appliance maker', 'Improve product quality', 'Grow faster than our competitors'] },
      ],
      why: [
        'It carries a figure and a date, so somebody can say on that date whether it was met',
        'It states where the business is heading with nothing that could be checked on a given day',
      ],
    }),
  };
})();

const appraisingTheMission = (() => {
  const sid = subId('appraising-the-mission');
  return {
    id: sid,
    title: 'Critical Appraisal: The Case For',
    keyIdea: 'The critical appraisal of mission statements starts with what a good one does: it settles arguments, tells outsiders what the business is for, and filters proposals.',
    body: [
      { type: 'paragraph', text: 'A business making hundreds of decisions a year cannot refer every one of them upwards. A mission statement is what lets those decisions be made in the same direction without being made by the same people.' },
      { type: 'bullets', items: [
        '**It settles arguments.** Two proposals that both raise profit can be compared by which one serves the purpose.',
        '**It speaks outwards.** Investors, customers and applicants learn what the business is for before they commit anything.',
        '**It is a filter.** A proposal that cannot be squared with the mission has to justify itself against it.',
      ] },
      { type: 'paragraph', text: 'Notice that all three depend on the statement being **specific enough to exclude something**. A mission that rules nothing out cannot settle an argument, cannot tell an outsider anything and cannot filter a proposal.' },
    ],
    realExample: { emoji: '🩺', text: 'A hospital group whose stated purpose is care in the community can use it to choose between two investments of equal value: the rural clinics fit it and a second city theatre does not.' },
    misconception: 'Students appraise a mission statement by judging whether it sounds inspiring. That is a judgement about the writing. Instead ask what it rules out, because everything a mission statement is supposed to do depends on it excluding something.',
    examMatters: 'Appendix 6 defines Explain (4 marks) as a brief explanation of cause or effect supported by details or examples. An Explain of a mission statement\'s value wants one use of it, followed through, with the business in front of you supplying the example.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each thing a mission statement can do to what it depends on:',
      pairs: [
        { left: 'Settles an argument between two proposals', right: 'it rules at least one of them out' },
        { left: 'Tells an investor what the business is for', right: 'it says something a rival could not say' },
        { left: 'Lets decisions be made without referring upwards', right: 'the people deciding know it and believe it' },
      ],
      why: [
        'A statement that fits both proposals equally well cannot separate them',
        'A statement true of every firm in the industry carries no information about this one',
        'A statement nobody has read cannot guide a decision nobody sends upwards',
      ],
    }),
  };
})();

const whatTheMissionCannotDo = (() => {
  const sid = subId('what-the-mission-cannot-do');
  return {
    id: sid,
    title: 'Critical Appraisal: The Case Against',
    keyIdea: 'A mission statement costs nothing to write and binds nobody, so the appraisal turns on whether anything inside the business would change if it changed.',
    body: [
      { type: 'paragraph', text: 'The case against is not that mission statements are dishonest. It is that nothing enforces them.' },
      { type: 'bullets', items: [
        '**Too vague to rule anything out.** "Delivering value to all our stakeholders" excludes no decision any business has ever taken.',
        '**Written for the reader.** A statement produced for a website is aimed at outsiders, not at the people deciding things.',
        '**Contradicted by the rewards.** Where pay and promotion follow one thing and the mission says another, staff follow the pay.',
      ] },
      { type: 'paragraph', text: 'So the appraisal question is a practical one: **would anything change if the mission statement changed?** Where the answer is no, it is a public document rather than a management tool — and saying so, with a reason, is what "critical" means in 3.3.1 · 1b.' },
    ],
    misconception: 'Students appraise a mission statement by judging whether it sounds inspiring. That is a judgement about the writing. Instead ask what it rules out, whether anybody inside the business uses it to decide anything, and whether the rewards point the same way.',
    realExample: { emoji: '📄', text: 'Two rival banks publish mission statements about serving communities. One measures branch managers on local lending and the other on sales of investment products, and the statements predict nothing about either.' },
    examMatters: 'Appendix 6 defines Assess (12 marks in Units 3 and 4) as requiring a balanced and wide ranging assessment leading to a supported judgement. Both columns and then a decision between them is what balance means here.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the test a critical appraisal applies:',
      template: [
        'A mission statement that rules ___ out cannot settle an argument',
        '→ and one that is contradicted by pay and ___ will be ignored',
        '→ so ask whether anything would ___ if the statement changed',
      ],
      answers: ['nothing', 'promotion', 'change'],
      hints: ['the amount a vague statement excludes', 'the other reward that tells staff what really matters', 'the practical test, rather than a judgement about the writing'],
      distractors: ['everything', 'training', 'improve'],
    }),
  };
})();

/* ══ Block 2 — Ansoff's Matrix (2a) ═══════════════════════════════════════ */

const twoQuestionsAnsoff = (() => {
  const sid = subId('two-questions-ansoff');
  return {
    id: sid,
    title: 'The Two Questions Behind the Matrix',
    keyIdea: "Ansoff's Matrix sorts every growth option a business has by two questions: is the product one it already sells, and is the market one it already sells to?",
    body: [
      { type: 'paragraph', text: 'A business deciding how to grow has more options than it can compare. **Ansoff** reduces them to two questions, each with two answers, which gives four cells — and every growth option a business has lands in exactly one of them.' },
      { type: 'bullets', items: [
        '**Products** — existing ones the business already makes, or new ones it does not.',
        '**Markets** — existing customers and countries it already sells to, or new ones it does not.',
      ] },
      { type: 'paragraph', text: 'Answer both and the cell follows. That is the whole mechanism, and it is why the matrix is drawn as a grid rather than written as a list: **where a cell sits is what it means**.' },
    ],
    examMatters: 'Appendix 6 defines Construct (4 marks) as requiring an accurately labelled diagram, and this is one of the diagrams a Business student may be asked to construct. Label both dimensions before naming any cell, because a matrix with unlabelled axes cannot show which cell is which.',
    realExample: { emoji: '🧩', text: 'Netflix\'s move from posting discs to streaming them, and then to making its own programmes, is two different cells: the same films to the same customers by a new route, and then a new product for those customers.' },
    misconception: 'Students treat the matrix as four strategies to choose from, as if a business picked one and stopped. It is a way of sorting the options a business already has. Instead use it to lay out every option, then bring something else in to choose.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the two questions the matrix asks:',
      template: [
        'Is the ___ one the business already sells?',
        '→ Is the ___ one it already sells to?',
        '→ Two questions, two answers each, giving ___ cells',
      ],
      answers: ['product', 'market', 'four'],
      hints: ['the thing being sold', 'the people or places being sold to', 'two times two'],
      distractors: ['price', 'factory', 'three'],
    }),
  };
})();

const theFourCellsAnsoff = (() => {
  const sid = subId('the-four-cells-ansoff');
  return {
    id: sid,
    title: 'The Four Cells',
    keyIdea: 'Each cell is named after the thing that changed: market development takes an existing product to a new market, product development brings a new product to existing customers.',
    body: [
      { type: 'bullets', items: [
        '**Market penetration** — existing product, existing market. Sell more of what you already sell, to the people you already sell to.',
        '**Market development** — existing product, **new** market. A new country, a new age group, a new kind of buyer.',
        '**Product development** — **new** product, existing market. Something new for customers the business already has.',
        '**Diversification** — new on both. A product the business has not made, sold to buyers it does not have.',
      ] },
      { type: 'paragraph', text: 'The two in the middle are the ones students swap. The test is which word changed: if the **market** is the new thing, it is market development, whatever the product is doing.' },
    ],
    misconception: 'Students read "market development" as developing a better product for the market. It is the opposite: the product stays exactly as it is and the MARKET is new. Instead read each cell name as naming the thing that changes.',
    realExample: { emoji: '☕', text: 'A coffee chain opening more outlets in cities it already serves is penetrating; the same chain selling its beans through supermarkets is reaching a new market with the product it already has.' },
    examMatters: 'Appendix 6 defines Construct (4 marks) as requiring an accurately labelled diagram, and both dimensions have to carry their labels: a grid of four names with nothing on the axes cannot show that any of them is in the right place.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each move into its Ansoff cell:',
      groups: [
        { name: 'Market development', items: ['The same water heater sold in a neighbouring country', 'An existing cleaning product sold to hotels instead of households'] },
        { name: 'Product development', items: ['A solar water heater sold to the customers the firm already has', 'A repair subscription offered to existing appliance owners'] },
        { name: 'Diversification', items: ['A pump maker starting a solar installation service abroad', 'An appliance maker opening a chain of repair cafes in new cities'] },
      ],
      why: [
        'The product is unchanged and the buyers are new, so the market is what developed',
        'The buyers are unchanged and the product is new, so the product is what developed',
        'Both are new at once, which is what makes this cell the demanding one',
      ],
    }),
  };
})();

const riskRisesWithDistance = (() => {
  const sid = subId('risk-rises-with-distance');
  return {
    id: sid,
    title: 'Why Risk Rises Across the Matrix',
    keyIdea: 'Risk rises with how much the firm must learn: penetration asks nothing, the two middle cells one new thing each, and diversification a product and a market at once.',
    body: [
      { type: 'paragraph', text: 'The matrix is usually drawn with risk rising away from the top-left corner, and the reason is worth stating properly, because it is not that new things are frightening.' },
      { type: 'paragraph', text: 'It is that **each move asks the business to learn something it does not already know**, and everything it does not know is somewhere a forecast can be wrong. Penetration asks it to learn nothing. Diversification asks it to learn a product and a market at the same time, and a mistake in either one is enough.' },
      { type: 'paragraph', text: '**The two middle cells are not ranked against each other.** Both ask the business to learn exactly one new thing, and which of the two is safer depends on the firm: one that knows its customers better than its engineering will find product development the harder, and one that knows its engineering better will find the reverse.' },
    ],
    misconception: 'Students rank the four cells as a fixed ladder with product development always riskier than market development, or always safer. Nothing in the matrix says so. Instead write that both are one step from what the firm knows, and say which step THIS firm is better equipped to take.',
    realExample: { emoji: '🚗', text: 'A carmaker adding a new model is working with engineering it understands. The same firm launching a financial services arm is learning an industry, a regulator and a customer relationship all at once.' },
    examMatters: 'Appendix 6 defines Assess (12 marks in Units 3 and 4) as requiring competing arguments leading to a supported judgement. A judgement about risk needs the firm\'s own position in it, not a general ranking of the cells.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these four stages in order, from the least a firm must learn to the most:',
      correctOrder: [
        'Selling more of a known product to known buyers',
        'Taking a known product to buyers it does not have',
        'Bringing an unknown product to buyers it knows',
        'Building an unknown product for buyers it does not have',
      ],
      why: [
        'Nothing here is new, so nothing has to be learned and the forecasts rest on experience',
        'One new thing: who the buyers are, how they choose and what reaches them',
        'One new thing again: making the product, and what it costs to make well',
        'Both at once, and either one being wrong is enough to sink it',
      ],
    }),
  };
})();

const adisaFourOptions = (() => {
  const sid = subId('adisa-four-options');
  return {
    id: sid,
    title: `${A.name}'s Four Options`,
    keyIdea: 'One firm, four cells: sell more heaters at home, take those heaters abroad, build a solar heater for existing buyers, or sell solar services in countries it has never sold in.',
    body: [
      { type: 'paragraph', text: `${A.name} makes ${A.what} and takes ${money(A.totalRevenue)} a year, ${pc(A.biggest.revenueShare)} of it from water heaters. It wants to grow. Here are its four cells.` },
      { type: 'bullets', items: [
        `**Penetration** — sell more water heaters at home. ${A.name} already holds ${pc(A.biggest.share)} of that market, and a market growing at ${pc(A.biggest.growth)} a year has little room left.`,
        '**Market development** — the same heaters, sold in a neighbouring country. The product is proven; the distribution and the buyers are not.',
        '**Product development** — a solar water heater for the customers it already has. New engineering, known buyers.',
        '**Diversification** — solar installation services abroad. A service it has never sold, to buyers it does not have.',
      ] },
      { type: 'paragraph', text: 'Notice what the matrix has done and what it has not. It has laid four options side by side in a way that makes them comparable. **It has not said which one to take** — for that you need the next chapter, and the two after it.' },
    ],
    realExample: { emoji: '🏪', text: 'Jollibee grew by opening more restaurants at home, then took the same menu to cities with large Filipino populations abroad, and later bought chains selling food it had never made.' },
    misconception: 'Students describe an option without saying what is new about it, so two different cells end up sounding the same. Instead name the product and the market separately for each option, and the cell follows without being guessed at.',
    examMatters: 'Appendix 6 defines Analyse (6 marks) as a brief chain of reasoning, and it excludes evaluation. Following one option through to what the firm would have to learn is analysis; weighing two against each other is not.',
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each of ${A.name}'s options to what it asks the firm to learn:`,
      pairs: [
        { left: 'More heaters, same country', right: 'nothing new' },
        { left: 'Heaters sold in a new country', right: 'a new set of buyers' },
        { left: 'A solar heater for existing buyers', right: 'a new product to build' },
        { left: 'Solar services in new countries', right: 'a product and a market at once' },
      ],
      why: [
        'Both the product and the buyers are already known, which is why this cell is the least risky',
        'The heater is unchanged, so everything new is on the market side',
        'The buyers are unchanged, so everything new is on the product side',
        'Both sides are new, and the risks multiply rather than add',
      ],
    }),
  };
})();

const whatAnsoffCannotTell = (() => {
  const sid = subId('what-ansoff-cannot-tell');
  return {
    id: sid,
    title: 'What the Matrix Will Not Tell You',
    keyIdea: 'Ansoff sorts options and ranks their novelty; it says nothing about the size of the prize, the resources each move needs, or whether the firm can afford to be wrong.',
    body: [
      { type: 'paragraph', text: 'The matrix is a sorting tool, and it is worth being precise about where its usefulness stops.' },
      { type: 'bullets', items: [
        '**It ignores the size of the prize.** The safest cell may also be the smallest, and a mature market can be penetrated no further.',
        '**It ignores what each move costs.** Two cells that look equally risky can need entirely different amounts of capital.',
        '**It treats "new" as one thing.** A market one border away and a market on another continent are both simply "new".',
      ] },
      { type: 'paragraph', text: 'None of that makes the matrix wrong; it makes it a first step. A good Unit 3 answer uses it to lay the options out, then brings in something the matrix cannot see — the resources of chapter 5, or the outside pressures of chapter 7 — to choose between them.' },
    ],
    examMatters: 'Appendix 6 defines Assess (12 marks in Units 3 and 4) as requiring a well contextualised chain of reasoning, balanced and wide ranging, leading to a supported judgement. An answer that names the cell and stops has given the contextualisation and none of the judgement.',
    realExample: { emoji: '🗺️', text: 'Two retailers both choose market development. One crosses a border into a country with the same language and similar incomes; the other enters a market with different regulation and no distribution. The matrix calls both the same move.' },
    misconception: 'Students finish an answer at the cell name, as though naming it were the analysis. The name is where the analysis starts. Instead say what the cell implies for this firm and bring in what the matrix cannot see — resources, size, or the competition.',
    recall: recall(sid, {
      type: 'classify',
      prompt: "Sort each question: can Ansoff's Matrix answer it, or does it need something else?",
      groups: [
        { name: 'Ansoff answers it', items: ['Which of these four options is furthest from what we already do?', 'Is this move about a new product, a new market, or both?'] },
        { name: 'It needs something else', items: ['Can we afford the capital this move needs?', 'How large is the market we would be moving into?', 'Are our rivals about to move first?'] },
      ],
      why: [
        'The matrix is built from exactly two questions, so anything answerable from those two it answers well',
        'Nothing about money, size or rivals enters the matrix, so these come from the resources, the portfolio or the external analysis',
      ],
    }),
  };
})();

/* ══ Block 3 — Porter's Strategic Matrix (2a) ═════════════════════════════ */

const twoDimensionsPorter = (() => {
  const sid = subId('two-dimensions-porter');
  return {
    id: sid,
    title: 'The Two Dimensions',
    keyIdea: "Porter's Strategic Matrix asks two questions: does the advantage come from lower cost or from being different, and is it aimed at a broad market or a narrow one?",
    body: [
      { type: 'paragraph', text: 'Ansoff asked where to grow. **Porter** asks something else entirely: once you are in a market, why would anybody buy from you rather than from somebody else?' },
      { type: 'bullets', items: [
        '**Where the advantage comes from** — being able to supply at a lower cost, or offering something buyers cannot get elsewhere.',
        '**How wide the target is** — the whole market, or one identifiable part of it.',
      ] },
      { type: 'paragraph', text: 'Two questions, two answers each, four cells again. The specification names this **Porter\'s Strategic Matrix**, and a matrix is a grid: the two dimensions are what generate the cells, so an answer that lists cell names without the dimensions has taken the labels off the tool.' },
    ],
    misconception: 'Students name only three positions here and leave "focus" unqualified. Two dimensions with two values each give four cells, and focus appears in two of them. Instead name all four, and say which dimension each pair shares.',
    realExample: { emoji: '✈️', text: 'Two airlines fly the same route. One competes by keeping its cost per seat below everybody else\'s; the other by what happens in the cabin. Both can be profitable, and they are running different businesses.' },
    examMatters: 'Appendix 6 defines Define (2 marks) as requiring students to define a term or phrase. Defining a position from this matrix takes both dimensions: the source of the advantage and the breadth of the target.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: "Complete the two dimensions of Porter's Strategic Matrix:",
      template: [
        'Does the advantage come from lower ___ or from being different?',
        '→ Is it aimed at a broad market or a ___ one?',
        '→ Two dimensions, giving ___ cells',
      ],
      answers: ['cost', 'narrow', 'four'],
      hints: ['the other way to win business besides being different', 'the opposite of broad', 'two times two, not three'],
      distractors: ['price', 'growing', 'three'],
    }),
  };
})();

const theFourCellsPorter = (() => {
  const sid = subId('the-four-cells-porter');
  return {
    id: sid,
    title: 'The Four Cells',
    keyIdea: 'Cost leadership and differentiation are aimed at a broad market; cost focus and differentiation focus are the same two sources of advantage aimed at one part of it.',
    body: [
      { type: 'bullets', items: [
        '**Cost leadership** — lowest cost supplier, whole market. Scale, tight operations, and prices rivals cannot match profitably.',
        '**Differentiation** — something buyers value that rivals do not offer, sold across the whole market, at a price that covers the extra cost of providing it.',
        '**Cost focus** — the lowest cost supplier to one part of the market, often one that larger firms serve badly.',
        '**Differentiation focus** — something distinctive, built for one part of the market and not for the rest.',
      ] },
      { type: 'paragraph', text: 'The left column shares a source of advantage and differs in width. So does the right. Reading the matrix this way is what stops "focus" from sounding like a third thing: **focus is a width, not a source**, which is why each focus cell has to say which kind of focus it is.' },
    ],
    realExample: { emoji: '🏨', text: 'A hotel group with thousands of identical rooms near airports and a hotel with nine rooms on one island are both viable. The first competes on cost across a whole market; the second on being unrepeatable, for a few people.' },
    misconception: 'Students describe \'focus\' as a strategy in its own right and stop. Focus is a width, not a source of advantage, so it never stands alone. Instead say which kind of focus — cost focus or differentiation focus — because those are different businesses.',
    examMatters: 'Appendix 6 defines Construct (4 marks) as an accurately labelled diagram. All four cells have to appear, because two dimensions with two values each generate four and a three-celled version is not this matrix.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each business by where its advantage comes from: lower cost, or being different?',
      groups: [
        { name: 'Advantage from lower cost', items: ['A manufacturer supplying the whole market at prices rivals cannot match', 'The cheapest supplier of pumps to one type of farm', 'A budget airline flying only routes larger carriers ignore'] },
        { name: 'Advantage from being different', items: ['A brand the whole market recognises and pays extra for', 'Off-grid equipment built for remote farms and nobody else', 'A tailor serving one profession and no other'] },
      ],
      why: [
        'Each of these wins business by supplying at a lower cost — and note that two of the three are narrow, which is why focus is a width rather than a source',
        'Each of these wins business by offering something rivals do not, again at two different widths',
      ],
    }),
  };
})();

const costLeadershipNotLowPrice = (() => {
  const sid = subId('cost-leadership-is-not-low-price');
  return {
    id: sid,
    title: 'Cost Leadership Is Not Low Price',
    keyIdea: 'Cost leadership is about what it costs the business to supply, not what it charges: a cost leader can charge the market price and keep the difference.',
    body: [
      { type: 'paragraph', text: 'This is the single most common error in the whole chapter, and it matters because the two lead to opposite conclusions.' },
      { type: 'paragraph', text: 'A **low price** is something the customer sees. A **low cost** is something only the business sees. A firm with the lowest costs has a choice: charge less than rivals and take share, or charge what everybody else charges and take a wider margin. Both are cost leadership.' },
      { type: 'paragraph', text: 'And a firm that charges the lowest price without the lowest costs is not a cost leader at all — it is a firm with a thin margin and no protection, which is a description of a problem rather than a strategy.' },
    ],
    misconception: 'Students identify the cheapest firm in a market as the cost leader. The cheapest PRICE is not evidence of the lowest COST. Instead look for where the cost advantage comes from — scale, process, purchasing, location — and check that the price is a choice the firm is making rather than one it is forced into.',
    realExample: { emoji: '🛒', text: 'A discount grocer and a premium one can charge similar prices for the same product. The difference between them is what the product cost to get onto the shelf, and only one of them can choose to cut the price and survive.' },
    examMatters: 'Appendix 6 defines Analyse (6 marks) as a brief chain of reasoning with interpretation where data is given. Where a case gives costs and prices, the interpretation is which of the two the firm\'s advantage is actually in.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each firm to what it tells you about its position:',
      pairs: [
        { left: 'Lowest costs, charges the market price', right: 'a cost leader taking a wider margin' },
        { left: 'Lowest costs, charges below rivals', right: 'a cost leader taking market share' },
        { left: 'Lowest price, ordinary costs', right: 'no cost advantage and a thin margin' },
      ],
      why: [
        'The advantage is real and is being taken as profit rather than passed on',
        'The same advantage, spent on volume instead of on margin',
        'Nothing here is a strategy: the price is what is left after the costs, not a choice',
      ],
    }),
  };
})();

const adisaPorterPosition = (() => {
  const sid = subId('adisa-porter-position');
  return {
    id: sid,
    title: `${A.name}'s Position, and the Choice`,
    keyIdea: 'Each cell is a different business: a broad cost position needs scale and tight costs, a narrow differentiated one needs engineering and a sales force that knows one kind of buyer.',
    body: [
      { type: 'paragraph', text: `${A.name} holds ${pc(A.biggest.share)} of a water-heater market growing at ${pc(A.biggest.growth)} a year, and ${pc(A.fastest.share)} of a solar-pump market growing at ${pc(A.fastest.growth)}. Those two facts point at different cells.` },
      { type: 'bullets', items: [
        '**Broad, low cost** — defend the heater business on price. It needs volume, and the market is barely growing.',
        '**Narrow, differentiated** — off-grid pumps built for remote farms. A small market, growing fast, where a large low-cost rival has little interest.',
      ] },
      { type: 'paragraph', text: 'It cannot do both well with one factory and one brand, and that is what makes this a **strategic** choice rather than a description. Choosing the second means accepting that the first slowly shrinks — which is precisely the kind of judgement a 12-mark Assess is asking for.' },
    ],
    realExample: { emoji: '🚜', text: 'A tractor maker serving every farm and one building machines for steep terrain need different factories, different engineers and different dealers. Neither can become the other by changing its prices.' },
    misconception: 'Students write that a firm should \'do both\' to be safe. Holding two positions needs two cost bases and two kinds of capability, which is what makes this a choice. Instead name what the firm would have to give up, because that is the judgement.',
    examMatters: 'Appendix 6 defines Assess (12 marks in Units 3 and 4) as requiring a well contextualised chain leading to a supported judgement. The context here is this firm\'s shares and its markets\' growth, and a judgement that ignores them is not contextualised.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the reason ${A.name} cannot occupy two cells at once:`,
      template: [
        'A broad low-cost position needs ___ and tight costs',
        '→ a narrow differentiated one needs ___ and a specialist sales force',
        '→ with one factory and one brand, choosing one means the other ___',
      ],
      answers: ['volume', 'engineering', 'shrinks'],
      hints: ['what spreads fixed costs over more units', 'what builds something rivals do not offer', 'what happens to the position that is not chosen'],
      distractors: ['advertising', 'discounts', 'grows'],
    }),
  };
})();

const stuckInTheMiddle = (() => {
  const sid = subId('stuck-in-the-middle');
  return {
    id: sid,
    title: 'Choosing, Blending, and the Warning',
    keyIdea: 'Porter\'s warning is that a firm doing a little of both ends up with no advantage of either kind — but firms do combine them, and a critical answer names the conditions.',
    body: [
      { type: 'paragraph', text: 'Porter\'s claim is that the four cells are genuinely different businesses, and a firm that tries to be cheap and distinctive at once ends up **stuck in the middle**: not cheap enough to win on cost, not distinctive enough to justify a premium.' },
      { type: 'paragraph', text: 'The case against the claim is visible in plenty of firms that do both — a low-cost base and a design reputation, at the same time. Where that works, it usually rests on something specific: a process advantage that also improves the product, or a scale so large that it funds the distinctiveness.' },
      { type: 'paragraph', text: 'So the examinable position is neither "Porter is right" nor "Porter is wrong". It is: **the trade-off is real, and the firms that escape it have a reason you can name.** If you cannot name the reason, the warning applies.' },
    ],
    examMatters: 'Appendix 6 defines Evaluate (20 marks) as requiring a full awareness of the validity and significance of competing arguments leading to a perceptive conclusion that proposes a solution or recommendations. A claim and its limits, with the conditions that decide between them, is what "validity" means here.',
    realExample: { emoji: '🪑', text: 'Firms that hold a low cost base and a design reputation at once usually have one mechanism doing both jobs: a way of making things that is cheaper AND better, rather than two efforts pulling against each other.' },
    misconception: 'Students either accept the warning as a law or dismiss it with one counterexample. Neither is an evaluation. Instead state the trade-off, admit the firms that escape it, and name what those firms have that others do not.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put these stages of the evaluation in the order in which an answer makes them:',
      correctOrder: [
        'State the claim: the four cells are different businesses',
        'Explain the mechanism: cheap and distinctive pull against each other',
        'Admit the counter-case: some firms hold both at once',
        'Name what those firms have that others do not',
        'Judge: the trade-off holds unless a named reason removes it',
      ],
      why: [
        'An evaluation needs the claim on the page before it can be tested',
        'The claim is only worth testing once the reason behind it is stated',
        'A counter-case is evidence against the claim, and it has to be admitted',
        'A counter-case with no explanation is an exception; with one it is a condition',
        'The judgement is the conditions under which each side holds, not a vote',
      ],
    }),
  };
})();

/* ══ Block 4 — The aim of portfolio analysis (2b) ══════════════════════════ */

const whatAPortfolioIs = (() => {
  const sid = subId('what-a-portfolio-is');
  return {
    id: sid,
    title: 'What a Portfolio Is',
    keyIdea: 'A portfolio is everything the business sells, looked at as one set — because a product that looks healthy on its own can be the reason the set is in trouble.',
    body: [
      { type: 'paragraph', text: 'Most businesses sell more than one thing, and each line has its own market, its own growth and its own share. Looked at one at a time, each can seem fine.' },
      { type: 'paragraph', text: 'Looked at together, a pattern appears that no single line shows: where the revenue comes from, where the growth is, and whether those are the same place. **They usually are not**, and that gap is what a portfolio view exists to find.' },
      { type: 'paragraph', text: 'Two numbers describe each line, and confusing them makes the whole analysis meaningless. **How fast is that market growing?** is about the market. **What share of it do we hold?** is about us. A line can have a large share of a market going nowhere.' },
    ],
    misconception: "Students write about a product's share of the company's revenue when they mean its share of its market. The two are different numbers doing different jobs: one says how much of our money this line earns, the other says how strong we are where it competes. Instead name which of the two you are using every time.",
    realExample: { emoji: '📷', text: 'A camera maker selling film, cameras and processing chemicals had three healthy lines and one market. When the market changed, all three moved together, which no single line\'s figures showed.' },
    examMatters: 'Appendix 6 defines Calculate (4 marks) as a calculation based on given data, with calculators permitted and workings given. Here the workings are what show which of the two percentages an answer used.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement: is it about the market, or about this business?',
      groups: [
        { name: 'About the market', items: ['This market is growing at 14% a year', 'Demand for cooling is rising as summers get hotter', 'The market is worth $300m a year'] },
        { name: 'About this business', items: ['We hold 6% of that market', 'This line is 18% of our revenue', 'We make this product in one factory'] },
      ],
      why: [
        'It would be true whoever was selling into it, so it describes the market rather than the firm',
        'It is a fact about this firm\'s position or resources and would change if the firm changed',
      ],
    }),
  };
})();

const theAimOfPortfolioAnalysis = (() => {
  const sid = subId('the-aim-of-portfolio-analysis');
  return {
    id: sid,
    title: 'The Aim of Portfolio Analysis',
    keyIdea: 'The aim of portfolio analysis is a decision about resources: which lines fund which, where the next investment goes, and what can be let go.',
    body: [
      { type: 'paragraph', text: 'The specification asks for the **aim**, and that word is doing work. Portfolio analysis is not a picture of the business; it is a way of deciding where the business puts its money and its people next.' },
      { type: 'bullets', items: [
        '**Is the set balanced?** Can what earns today fund what will earn tomorrow?',
        '**Which lines fund which?** Cash generated in a settled market can pay for a position in a growing one.',
        '**Where is the growth?** The next investment should go where the market is still opening up.',
        '**What can be let go?** A line taking resources and returning neither cash nor a future has to justify itself.',
      ] },
      { type: 'paragraph', text: 'The tool most often used to draw this is the **Boston Matrix**, which belongs to the marketing topic in Unit 1. At Unit 3 the question is not how to draw it — it is what the analysis is **for**, and the answer is every row above.' },
      { type: 'paragraph', text: 'Which makes the test of a portfolio answer simple: **if nothing moves, no analysis has happened.**' },
    ],
    realExample: { emoji: '🧪', text: 'A chemicals group funding a slow-building pharmaceutical business from its established industrial lines is doing portfolio analysis whether or not anybody draws a grid: cash from one place, spent in another.' },
    misconception: 'Students describe the state of a portfolio and stop. The aim is a decision, so a finding that moves nothing has not used the tool. Instead end every observation with what should happen to the money or the people.',
    examMatters: 'Appendix 6 defines Analyse (6 marks) as requiring interpretation where data is given. With a table of lines in front of you, the interpretation is the pattern across them, not a description of each row in turn.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each portfolio question to the decision it leads to:',
      pairs: [
        { left: 'Can what earns today fund what earns tomorrow?', right: 'whether the set is balanced' },
        { left: 'Which line generates cash the others need?', right: 'where cash is moved from' },
        { left: 'Which market is still opening up?', right: 'where the next investment goes' },
        { left: 'Which line returns neither cash nor a future?', right: 'what is released' },
      ],
      why: [
        'Balance is about time: earnings now paying for positions later',
        'A settled, strong line is usually the one funding the others',
        'Investment follows growth, because share is cheapest to win while a market is still forming',
        'Releasing a line frees the resources it was holding, which is the point of noticing it',
      ],
    }),
  };
})();

const readingAdisaPortfolio = (() => {
  const sid = subId('reading-adisa-portfolio');
  return {
    id: sid,
    title: `Reading ${A.name}'s Portfolio`,
    keyIdea: 'Most of the revenue comes from the markets growing slowest, where the firm is strongest, and the smallest share from the fastest, where it is weakest.',
    body: [
      { type: 'paragraph', text: `${A.name}'s four lines, with the two numbers that matter for each: how fast that market is growing, and how much of it ${A.name} holds.` },
      { type: 'bullets', items: [
        `**Water heaters** — ${money(A.lines[0].revenue)}, ${pc(A.lines[0].revenueShare)} of revenue. Market growing ${pc(A.lines[0].growth)}; ${A.name} holds ${pc(A.lines[0].share)} of it.`,
        `**Refrigerators** — ${money(A.lines[1].revenue)}. Market growing ${pc(A.lines[1].growth)}; ${A.name} holds ${pc(A.lines[1].share)}.`,
        `**Air conditioners** — ${money(A.lines[2].revenue)}. Market growing ${pc(A.lines[2].growth)}; ${A.name} holds ${pc(A.lines[2].share)}.`,
        `**Solar pumps** — ${money(A.lines[3].revenue)}. Market growing ${pc(A.lines[3].growth)}; ${A.name} holds ${pc(A.lines[3].share)}.`,
      ] },
      { type: 'paragraph', text: `Read the last two columns together. ${A.name} is strongest exactly where the market has stopped moving, and weakest exactly where it is moving fastest. **No line here is failing.** The set is, and only all four side by side show it.` },
    ],
    realExample: { emoji: '📼', text: 'Fujifilm and Kodak both sold photographic film into a market that was about to disappear. One used the cash and the chemistry from that line to build positions in healthcare and materials; the other defended the line. The difference was a decision about the portfolio, not about film.' },
    misconception: 'Students look for the weakest line and recommend closing it. Nothing here is failing on its own, and the small fast-growing lines are the ones with a future. Instead read the pattern across all four, which is what the tool exists to show.',
    examMatters: 'Appendix 6 defines Calculate (4 marks) as a calculation based on given data, and says calculators may be used and workings should be given. Turning a share of a market back into the size of that market is a division, and the workings show which way round.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the shape of ${A.name}'s portfolio:`,
      template: [
        `${pc(A.slowRevenueShare)} of revenue sits in the markets growing ___`,
        '→ where the firm\'s share of the market is ___',
        '→ and the fastest-growing markets are where its share is ___',
      ],
      answers: ['slowest', 'highest', 'lowest'],
      hints: ['2% and 4% a year', 'a third of one market', 'a twentieth or less'],
      distractors: ['fastest', 'falling', 'rising'],
    }),
  };
})();

const whatPortfolioCannotSettle = (() => {
  const sid = subId('what-portfolio-analysis-cannot-settle');
  return {
    id: sid,
    title: 'What It Cannot Settle',
    keyIdea: 'A portfolio view shows where a business stands today and says nothing about why — so it points at a decision without making it.',
    body: [
      { type: 'paragraph', text: 'Two limits are worth carrying into an answer.' },
      { type: 'bullets', items: [
        '**It is a snapshot.** Growth and share are measured now. A market growing slowly may be about to move, and a share may be rising or falling.',
        '**It says nothing about why.** A small share in a growing market might mean the firm arrived late, or that its product is wrong, or that it is deliberately holding back. Those lead to three different decisions.',
      ] },
      { type: 'paragraph', text: 'And one that is easy to miss: **lines are connected.** A line that earns little may carry the service network the profitable lines depend on. Reading each line alone is exactly the mistake portfolio analysis was invented to prevent, and it is possible to make it inside the tool.' },
    ],
    realExample: { emoji: '⏳', text: 'A market growing at two per cent a year can be one that has matured, or one about to be reopened by a change in technology. The same figure describes both, and it is measured today in either case.' },
    misconception: 'Students treat a portfolio position as an explanation. A small share in a growing market is a fact, not a reason: the firm may have arrived late, built the wrong product, or be holding back deliberately. Instead find the cause before recommending anything.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks) as requiring awareness of the validity of competing arguments. The validity of a conclusion drawn from a portfolio depends on how much the snapshot leaves out, and saying so is part of the answer.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each conclusion: does the portfolio support it, or does it need something more?',
      groups: [
        { name: 'Supported by the portfolio', items: ['Most of our revenue is in slow-growing markets', 'Our strongest share is in our least dynamic market'] },
        { name: 'Needs something more', items: ['We should close the solar pump line', 'Our air conditioner product is poorly designed', 'This market will still be growing in five years'] },
      ],
      why: [
        'It is a statement about the numbers in front of you and nothing has been added to them',
        'It explains or predicts, and the portfolio contains no causes and no forecasts',
      ],
    }),
  };
})();

/* ══ Block 5 — Strategic and tactical decisions (2c) ═══════════════════════ */

const strategicAndTactical = (() => {
  const sid = subId('strategic-and-tactical-decisions');
  return {
    id: sid,
    title: 'Strategic and Tactical Decisions',
    keyIdea: 'A strategic decision commits the whole business for years; a tactical one adjusts one part of it — and each has an effect on human, physical and financial resources.',
    body: [
      { type: 'paragraph', text: 'Both words describe decisions, and the difference is not how important they feel. It is **how far they reach and how easily they can be taken back**.' },
      { type: 'paragraph', text: 'A **strategic** decision sets the direction: which markets to be in, which position to hold, which products to build. It commits the business for years and unwinding it costs most of what it cost to do.' },
      { type: 'paragraph', text: 'A **tactical** decision carries that direction out: a price change, a promotion, a shift pattern, an order brought forward. It belongs to one part of the business and next month it can be different.' },
      { type: 'paragraph', text: 'The relationship runs one way. Tactics serve a strategy; a strategy is not the sum of the tactics. **A run of good tactical decisions cannot rescue the wrong strategic one** — it makes the business efficient at going somewhere it should not be going.' },
    ],
    misconception: 'Students classify a decision as strategic because a senior person took it, or because it involved a large sum. Neither is the test: a board can sign off a one-off discount and a plant manager can commit a line for a decade. Instead test how far the decision reaches and what undoing it would cost.',
    realExample: { emoji: '🛳️', text: 'A shipping line choosing to build vessels for one trade route has decided something for twenty years. Which port it calls at next month is decided by a planner and changed by an email.' },
    examMatters: 'Appendix 6 defines Discuss (8 marks) as requiring logical chains of reasoning in context with a brief assessment showing awareness of competing factors. The contrast between two decisions is the context; the assessment is which one the business can afford to get wrong.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction:',
      template: [
        'A strategic decision commits the ___ business for years',
        '→ a tactical decision adjusts ___ part of it for weeks or months',
        '→ and tactics ___ a strategy, never the other way round',
      ],
      answers: ['whole', 'one', 'serve'],
      hints: ['how far it reaches', 'the other end of the same scale', 'which of the two is in charge of the other'],
      distractors: ['profitable', 'every', 'replace'],
    }),
  };
})();

const fourTests = (() => {
  const sid = subId('four-tests');
  return {
    id: sid,
    title: 'Four Tests That Tell Them Apart',
    keyIdea: 'Time horizon, scope, reversibility and who decides — and when the four disagree, reversibility is the one to trust.',
    body: [
      { type: 'bullets', items: [
        '**Time horizon** — years, or weeks and months?',
        '**Scope** — the whole business, or one function?',
        '**Reversibility** — slow and costly to undo, or undone easily?',
        '**Who decides** — the board, or a department manager?',
      ] },
      { type: 'paragraph', text: 'Most decisions answer all four the same way, and then the classification is obvious. The interesting cases are the ones that do not.' },
      { type: 'paragraph', text: 'When the tests disagree, **trust reversibility**. A decision that can be undone next month is tactical however senior the person who signed it, because a decision that can be taken back has not committed the business to anything.' },
    ],
    realExample: { emoji: '🏬', text: 'A retailer\'s decision to move to a new distribution model and its decision to discount winter stock may both be signed by the same director on the same morning, and only one of them can be taken back.' },
    misconception: 'Students decide that a decision is strategic because it involved a large sum of money. Size is not reach. Instead apply the four tests, and where they disagree trust reversibility, because a decision that can be taken back has committed nothing.',
    examMatters: 'Appendix 6 defines Explain (4 marks) as a brief explanation of cause or effect supported by details or examples. Explaining why a decision is strategic means naming the test and showing this decision meeting it.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision as strategic or tactical:',
      groups: [
        { name: 'Strategic', items: ['Building a second factory line', 'Entering a country the firm has never sold in', 'Moving from broad low-cost to a narrow specialist position'] },
        { name: 'Tactical', items: ['A four-week discount to clear stock', 'Adding a Saturday shift for the busy season', 'Changing which supplier delivers this quarter\'s packaging'] },
      ],
      why: [
        'It reaches across the business, runs for years, and undoing it costs most of what doing it cost',
        'It belongs to one function, runs for weeks or months, and next month it can be different',
      ],
    }),
  };
})();

const humanResources = (() => {
  const sid = subId('effect-on-human-resources');
  return {
    id: sid,
    title: 'The Effect on Human Resources',
    keyIdea: 'A strategic decision changes who the business needs and what they must be able to do; a tactical one changes what the people already there are working on this month.',
    body: [
      { type: 'paragraph', text: `${A.name}'s strategic decision — a second line for air conditioners — means hiring and training about ${DECISIONS.strategic.hires} people. Not just finding them: training them, supervising them while they learn, and carrying the mistakes made while they do.` },
      { type: 'paragraph', text: 'The tactical decision — a four-week discount on refrigerators — moves no jobs at all. The sales team re-plans a month and the warehouse works differently for four weeks.' },
      { type: 'paragraph', text: 'Two effects are worth naming because students miss them. **Skills take longer to acquire than people**, so a strategy needing new skills is slower than the hiring plan suggests. And **people notice what a strategy implies**: a decision that makes one line the future tells the staff on the other lines something about theirs.' },
    ],
    realExample: { emoji: '👷', text: 'A manufacturer opening a second plant found it could hire assembly staff in weeks and waited more than a year for supervisors who had done the job before, because the second group could not be recruited, only grown.' },
    misconception: 'Students write that a strategy \'will need more staff\' and stop. Numbers are the easy half. Instead say which skills are needed, how long they take to build, and what the decision tells the people on the lines it does not favour.',
    examMatters: 'Appendix 6 defines Discuss (8 marks) as requiring chains of reasoning in context with a brief assessment. A chain about people usually runs through time: hire, train, become productive, and each stage has a length.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each decision to its effect on people:',
      pairs: [
        { left: 'Opening a second production line', right: 'hiring and training a new workforce' },
        { left: 'A four-week promotional discount', right: 'a month of the sales team\'s attention' },
        { left: 'Moving to a specialist market position', right: 'different skills from the people already there' },
      ],
      why: [
        'New capacity needs people who do not yet work here, and training them takes longer than hiring them',
        'Nobody is hired or moved: the same people spend a month on something different',
        'The headcount may not change at all while what the business needs them to be good at does',
      ],
    }),
  };
})();

const physicalResources = (() => {
  const sid = subId('effect-on-physical-resources');
  return {
    id: sid,
    title: 'The Effect on Physical Resources',
    keyIdea: 'Physical resources are the buildings, machines, vehicles and stock a decision commits — and they are the slowest to change and the hardest to sell on.',
    body: [
      { type: 'paragraph', text: 'A second production line is a building, a machine and a supply of parts. Once installed, it makes what it was built to make: a line tooled for air conditioners will not quietly become something else because the strategy changed.' },
      { type: 'paragraph', text: 'That is why physical commitments dominate reversibility. **The more specialised the asset, the less it is worth to anybody else** — and a machine nobody else wants is a decision that cannot be sold out of.' },
      { type: 'paragraph', text: 'Tactical decisions use physical resources without committing them. The discount clears warehouse space; the space was already there and is there afterwards.' },
    ],
    realExample: { emoji: '🏭', text: 'A shipyard converted to build wind-turbine foundations keeps its cranes, its dry dock and its welders because both products are very large steel structures. The same yard could not be converted into a data centre, whatever the market said.' },
    misconception: 'Students treat physical resources as a cost that appears once. The cost is not the problem; the specificity is. Instead ask who else would want this asset, because the answer is what decides whether the decision can be reversed at all.',
    examMatters: 'Appendix 6 defines Analyse (6 marks) as a brief chain of reasoning. A chain about a physical commitment runs from how specialised the asset is to what it would fetch, and from there to whether the firm can change its mind.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the reason physical commitments are hard to reverse:',
      template: [
        'The more ___ an asset is, the less it is worth to anybody else',
        '→ so a machine nobody else ___ cannot be sold out of',
        '→ which is why physical resources dominate ___',
      ],
      answers: ['specialised', 'wants', 'reversibility'],
      hints: ['built for one job rather than many', 'what a second-hand buyer would have to do', 'the third of the four tests'],
      distractors: ['expensive', 'operates', 'profitability'],
    }),
  };
})();

const financialResources = (() => {
  const sid = subId('effect-on-financial-resources');
  return {
    id: sid,
    title: 'The Effect on Financial Resources',
    keyIdea: 'A strategic decision commits capital that cannot be recovered and waits years for a return; a tactical one gives up margin this month and is stopped whenever the business chooses.',
    body: [
      { type: 'paragraph', text: `The second line costs ${money(DECISIONS.strategic.capital)} — ${pc(CAPITAL_SHARE)} of a year's revenue — and returns nothing for ${DECISIONS.strategic.years} years. The money leaves now; the judgement about whether it was right arrives later.` },
      { type: 'paragraph', text: `The discount gives up ${pc(DECISIONS.tactical.discount)} of the margin on refrigerators for ${DECISIONS.tactical.weeks} weeks. It costs something real, and it can be stopped on a Monday.` },
      { type: 'paragraph', text: 'Three consequences follow. The strategic decision needs **funding** that has to come from somewhere. It carries an **opportunity cost** — money committed here is not available for the solar line. And it changes the **risk** the business carries, because a firm that has spent a quarter of a year\'s revenue on one bet has less room to be wrong about anything else.' },
    ],
    examMatters: 'Appendix 6 defines Calculate (4 marks) as requiring a calculation based on given data, with calculators permitted and workings given. Where a question gives revenue by line and a share of a market, the workings are what let each stage of the answer stand on its own.',
    realExample: { emoji: '🏦', text: 'A firm borrowing to build capacity is making two decisions at once: to build, and to carry the repayments through whatever happens next. The second is the one that removes its room to manoeuvre.' },
    misconception: 'Students treat the capital cost as the whole financial effect. The money leaving is only the first of three: it has to be funded, it is no longer available for anything else, and until the return arrives the firm has less room to be wrong. Instead name all three.',
    examMatters: 'Appendix 6 defines Calculate (4 marks) as requiring a calculation based on given data. Expressing a commitment as a share of annual revenue is one line of arithmetic and it is usually what makes the scale of a decision visible.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the financial consequences of a large strategic commitment in order:',
      correctOrder: [
        'Capital leaves the business the day it is committed',
        'It has to be funded from cash, borrowing or new investment',
        'Nothing else the firm might do can use that money now',
        'The return, if it comes, arrives years later',
        'Until then the firm carries more risk and less room to be wrong',
      ],
      why: [
        'The spending is the first thing that actually happens',
        'Money spent has to have come from somewhere, and each source has its own cost',
        'That is the opportunity cost: the next best use of the same capital',
        'A long payback is what separates a strategic commitment from an ordinary cost',
        'A firm with less spare capital has fewer options if anything else goes wrong',
      ],
    }),
  };
})();

/* ══ Block 6 — SWOT analysis (3a) ═════════════════════════════════════════ */

const whatSwotIsFor = (() => {
  const sid = subId('what-swot-is-for');
  return {
    id: sid,
    title: 'What SWOT Is For',
    keyIdea: 'SWOT puts what the business has against what the world is doing, and its first question about any item is not whether it is good or bad but where it came from.',
    body: [
      { type: 'paragraph', text: 'The previous chapters looked at the business (its portfolio, its position) or at the world (its options). **SWOT** is the tool that puts both on one page.' },
      { type: 'paragraph', text: 'The specification splits it by **origin** first: internal considerations are strengths and weaknesses, external considerations are opportunities and threats. So the first question about any item is where it comes from, and only then whether it helps.' },
      { type: 'paragraph', text: 'That order is not a formality. Getting it the other way round is what produces the grids full of items in the wrong boxes — and an item in the wrong box leads to the wrong kind of action, because you can change an internal thing and you can only respond to an external one.' },
    ],
    examMatters: 'Appendix 6 defines Construct (4 marks) as requiring an accurately labelled diagram. A SWOT grid is labelled by origin and effect, not by four words in four boxes: without the labels there is nothing to show an item is in the right place.',
    realExample: { emoji: '🧭', text: 'Two firms in one industry can write the same opportunities and threats and entirely different strengths and weaknesses. The external half describes the weather; the internal half describes the boat.' },
    misconception: 'Students fill the four boxes and treat the grid as finished. A completed grid is four lists, and lists are not conclusions. Instead plan to match items across the grid, because that is the only thing SWOT produces that the lists do not.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the order SWOT works in:',
      template: [
        'Ask first whether the item comes from ___ or outside',
        '→ then whether it ___ the business or holds it back',
        '→ because you can change an internal thing and only ___ to an external one',
      ],
      answers: ['inside', 'helps', 'respond'],
      hints: ['the specification\'s word is "internal"', 'the difference between a strength and a weakness', 'what you can do about the weather'],
      distractors: ['above', 'costs', 'object'],
    }),
  };
})();

const internalConsiderations = (() => {
  const sid = subId('internal-considerations');
  return {
    id: sid,
    title: 'Internal Considerations: Strengths and Weaknesses',
    keyIdea: 'Internal considerations are strengths and weaknesses: things the business owns, does or has chosen, and could in principle change.',
    body: [
      { type: 'paragraph', text: 'A **strength** is something the business has that helps it compete, and the test of whether it is worth writing down is whether a rival could say the same thing. "We have skilled staff" is true of nearly every firm and tells you nothing.' },
      { type: 'paragraph', text: `${A.name} has a real one: ${pc(A.biggest.share)} of its largest market, built over years, with the distribution and the service network that go with it.` },
      { type: 'paragraph', text: 'A **weakness** is the same kind of fact pointing the other way, and it is usually the cost of a past strength. One factory in one country keeps costs low and control tight — and it also means a single fire, a single strike or a single change in one country\'s rules stops everything.' },
      { type: 'paragraph', text: 'Both are **internal** because both are consequences of what the business has done. Both could, given time and money, be different.' },
    ],
    realExample: { emoji: '🔧', text: 'A manufacturer\'s own service network is a strength precisely because a rival would need years to build one. A statement that it has \'dedicated employees\' would be true of the rival too, and settles nothing.' },
    misconception: 'Students list qualities every firm claims — hard-working staff, quality products, experienced managers. A strength a rival could write word for word supports no conclusion. Instead name something measurable or something that took time to build.',
    examMatters: 'Appendix 6 defines Construct (4 marks) as an accurately labelled diagram. The internal row is where the labelling earns its place, because an item on the wrong row implies an action the firm cannot take.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each item: is it a strength or a weakness — and both are internal:',
      groups: [
        { name: 'Strength', items: ['A third of the water heater market', 'A service network rivals would take years to build', 'Engineers who have designed solar products before'] },
        { name: 'Weakness', items: ['One factory in one country', 'Almost no share in the fastest-growing market', 'A brand known for cheap goods, not for advanced ones'] },
      ],
      why: [
        'Something the business has built that helps it compete and that a rival could not claim',
        'Something about the business itself that holds it back — often the cost of a choice that helped before',
      ],
    }),
  };
})();

const externalConsiderations = (() => {
  const sid = subId('external-considerations');
  return {
    id: sid,
    title: 'External Considerations: Opportunities and Threats',
    keyIdea: 'External considerations are opportunities and threats: changes outside the business that would happen anyway, which it can only respond to.',
    body: [
      { type: 'paragraph', text: 'An **opportunity** is a change outside the business that it could turn to its advantage. Households cooling their homes as summers get hotter is an opportunity for anybody selling cooling — not only for this firm.' },
      { type: 'paragraph', text: 'A **threat** is a change outside that could damage it. Low-cost imported appliances arriving is a threat to every domestic maker at once.' },
      { type: 'paragraph', text: 'Both are **external** because both would be happening if the business did not exist. That is the test, and it is a strict one: an opportunity nobody else has is usually a strength that has been put in the wrong box.' },
      { type: 'paragraph', text: 'And neither is a fact about the business until it is connected to one. **An opportunity the firm has no way of taking is not an opportunity for that firm** — which is why the last subsection of this chapter is about matching.' },
    ],
    realExample: { emoji: '🌦️', text: 'A long dry season is a threat to a firm selling garden equipment and an opportunity for one selling irrigation. Neither firm caused it, and it would have happened if neither existed.' },
    misconception: 'Students write an opportunity that only this firm could take — \'our new product line\'. That is a strength or a plan, not an opportunity. Instead check that the change would be happening anyway, and only then ask whether this firm can use it.',
    examMatters: 'Appendix 6 defines Explain (4 marks) as a brief explanation of cause or effect supported by details. Explaining a threat means showing how an outside change reaches this firm\'s costs, prices or sales, not just naming it.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each external change to what makes it an opportunity or a threat for this firm:',
      pairs: [
        { left: 'Summers getting hotter', right: 'an opportunity, if it can supply cooling' },
        { left: 'Low-cost imports arriving', right: 'a threat to a firm competing on price' },
        { left: 'A new efficiency standard', right: 'either, depending on which firms can meet it' },
      ],
      why: [
        'The change is outside the firm, and it helps only the firms able to serve the demand it creates',
        'The change is outside the firm, and it hurts most where the firm\'s advantage was cost',
        'The same external change can help one firm and damage another, which is why it is judged against this firm',
      ],
    }),
  };
})();

const theLineBetween = (() => {
  const sid = subId('the-line-between-inside-and-outside');
  return {
    id: sid,
    title: 'The Line Between Inside and Outside',
    keyIdea: 'One test settles the boundary: would this still be true if the business did nothing? If yes it is external; if it is a consequence of the firm\'s own choices, it is internal.',
    body: [
      { type: 'paragraph', text: 'This is where most SWOT grids go wrong, and the error has a shape. A firm writes down a **decision it took itself** and files it under threats, because it was uncomfortable.' },
      { type: 'paragraph', text: 'A price rise the business chose is not a threat. A policy change it announced is not a threat. Both are internal, and both may well be weaknesses — but calling them external hides the only thing that matters about them, which is that **the business can undo them**.' },
      { type: 'paragraph', text: 'So apply the test every time. **Would this still be true if the business did nothing?** A competitor\'s move, a rule, a technology, a change in what people want: yes, external. Our prices, our factory, our brand, our decision: no, internal.' },
    ],
    misconception: 'Students file an unpopular decision the business made itself under threats, because it caused trouble. Trouble is not the test. Instead ask whether it would still be true if the business did nothing — if it is the firm\'s own choice, it belongs on the internal row, where it can be changed.',
    realExample: { emoji: '💳', text: 'A subscription business that raises its prices and loses customers has a weakness it chose. A regulator capping what it may charge is a threat. The loss looks the same from the outside and only one of them can be reversed by a decision.' },
    examMatters: 'Appendix 6 defines Assess (12 marks in Units 3 and 4) as requiring a well contextualised chain of reasoning. Putting an item on the right row is what makes the chain contextual: an internal item leads to what the firm should change, an external one to how it should respond.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Decide whether each item is internal or external: would it still be true if the business did nothing?',
      groups: [
        { name: 'External', items: ['A rival opens a factory in the same region', 'Import rules on appliances are relaxed', 'Households start cooling homes they never cooled before'] },
        { name: 'Internal', items: ['The firm raises its prices', 'The firm announces it will stop servicing older models', 'The firm runs a single factory'] },
      ],
      why: [
        'It happens whether or not this firm exists, so the firm can only respond to it',
        'It is the firm\'s own choice, which means it is also the firm\'s to reverse',
      ],
    }),
  };
})();

const fromListToStrategy = (() => {
  const sid = subId('from-a-list-to-a-strategy');
  return {
    id: sid,
    title: 'From a List to a Strategy',
    keyIdea: 'A SWOT becomes useful only when items are matched across the grid: a strength put against an opportunity is a move, and a weakness put against a threat is a risk to cover.',
    body: [
      { type: 'paragraph', text: 'A completed grid is four lists. Four lists are not a strategy, and this is the commonest weakness in answers on this topic.' },
      { type: 'paragraph', text: 'The value is in **matching across the boxes**, and there are two matches worth making:' },
      { type: 'bullets', items: [
        '**Strength against opportunity** — what can this firm do that others cannot, in a market that is opening? That match is a move.',
        '**Weakness against threat** — where would an outside change hurt us most, given what we are bad at? That match is a risk that needs covering now.',
      ] },
      { type: 'paragraph', text: `For ${A.name}: its engineering and service network (strength) against rising demand for cooling (opportunity) is the case for the air-conditioner line. Its single factory (weakness) against arriving imports (threat) is the case for not betting everything on cost.` },
      { type: 'paragraph', text: 'Two matches, two conclusions, both traceable to items on the grid. **That** is what SWOT is for.' },
    ],
    realExample: { emoji: '🔗', text: 'A firm with a strong service network and a market where products are becoming harder to repair has a match waiting to be made. Neither item alone suggests anything; together they suggest a business.' },
    misconception: 'Students conclude from the count — more strengths than weaknesses, so the firm is in good shape. Counting measures nothing, because one threat can outweigh six strengths. Instead match items in pairs and state the move and the risk that follow.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks) as requiring a perceptive conclusion that proposes a solution or recommendations. A matched pair from the grid is where a recommendation comes from, and it can be traced rather than asserted.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps of a SWOT that reaches a conclusion into order:',
      correctOrder: [
        'Place each item by where it came from',
        'Check that each item is specific to this business',
        'Match a strength to an opportunity the firm could take',
        'Pair a weakness with a threat that could reach it',
        'State the move and the risk that follow',
      ],
      why: [
        'Origin decides the row, and an item in the wrong row leads to the wrong kind of action',
        'An item true of every firm in the industry cannot support a conclusion about this one',
        'A strength that meets an opening market is where a move comes from',
        'A weakness exposed to an outside change is where the risk is',
        'Two matches give a conclusion that can be traced back to the grid rather than asserted',
      ],
    }),
  };
})();

/* ══ Block 7 — Impact of external influences (4a, 4b, 4c) ═════════════════ */

const pestleSix = (() => {
  const sid = subId('pestle-six-influences');
  return {
    id: sid,
    title: 'PESTLE: Six Kinds of External Influence',
    keyIdea: 'PESTLE lists six kinds of external influence — political, economic, social, technological, legal and environmental — so a business scanning its environment misses none of them.',
    body: [
      { type: 'paragraph', text: 'SWOT asks what is outside. **PESTLE** answers it systematically, in six categories the specification names in full.' },
      { type: 'bullets', items: [
        '**Political** — government decisions, stability, trade policy, public spending.',
        '**Economic** — incomes, interest rates, prices, employment, exchange rates.',
        '**Social** — how people live, what they value, how households and populations are changing.',
        '**Technological** — what can now be made, sold or delivered that could not be before.',
        '**Legal** — the rules a business must obey: standards, employment law, contracts, safety.',
        '**Environmental** — the physical world, its limits, and what it does to supply and demand.',
      ] },
      { type: 'paragraph', text: 'The six are a **checklist against blindness**. The point is not to sort factors correctly; it is to make sure that a business looking outward looks in all six directions rather than only the two it is used to.' },
    ],
    realExample: { emoji: '🔌', text: 'An electricity supplier is reached by all six at once: policy on generation, the cost of borrowing, how households use power, what storage can now do, what it must report, and the weather.' },
    misconception: 'Students learn five of the six and lose the last one, usually environmental. The framework\'s whole value is that it is complete. Instead learn all six in order, because the one left out is the one nobody was watching.',
    examMatters: 'Appendix 6 defines Define (2 marks) as requiring students to define a term or phrase. Defining PESTLE means naming what it is for as well as what the letters stand for.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the six letters of PESTLE in order:',
      template: [
        'P is political, E is ___',
        '→ S is social, T is ___',
        '→ L is legal, E is ___',
      ],
      answers: ['economic', 'technological', 'environmental'],
      hints: ['incomes, rates, prices, employment', 'what can now be made or delivered', 'the physical world and its limits'],
      distractors: ['ethical', 'trading', 'external'],
    }),
  };
})();

const pestleApplied = (() => {
  const sid = subId('pestle-applied');
  return {
    id: sid,
    title: `PESTLE Applied to ${A.name}`,
    keyIdea: 'A PESTLE is only worth writing when each letter carries something specific to this business — a general statement about "economic factors" says nothing a rival could not also say.',
    body: [
      { type: 'paragraph', text: `The same six letters, filled in for a firm that makes ${A.what}:` },
      { type: 'bullets', items: [
        '**Political** — a tariff on imported appliances would protect the heater business and raise the cost of imported components.',
        `**Economic** — borrowing costs decide whether the ${money(DECISIONS.strategic.capital)} second line is affordable.`,
        '**Social** — more households cooling homes they never cooled, which is where the air-conditioner market is coming from.',
        '**Technological** — cheaper solar panels, which is what makes both the solar heater and the pump line possible.',
        '**Legal** — a minimum efficiency standard, which would retire some products and favour others.',
        '**Environmental** — hotter summers and longer dry spells, raising demand for both cooling and pumps.',
      ] },
      { type: 'paragraph', text: 'Two of these six point the same way: the fastest-growing part of this firm\'s market is being created by social and environmental change. **That is a finding**, and it is only visible because all six were filled in.' },
    ],
    misconception: 'Students write "economic factors will affect the business" and move on. A factor that is not named and not connected to this firm applies equally to every firm in the world. Instead name the factor, say which decision it touches, and say which way it pushes.',
    realExample: { emoji: '📦', text: 'A logistics firm\'s PESTLE is not a list of world events. It is fuel prices, driver licensing rules, what online shopping has done to parcel sizes, and where it is now allowed to drive.' },
    examMatters: 'Appendix 6 defines Explain (4 marks) as a brief explanation supported by details or examples. One factor named, connected to a decision and followed to an effect is an Explain; six headings with nothing under them is a list.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement: is it usable in a PESTLE, or too general to be?',
      groups: [
        { name: 'Usable', items: ['Cheaper solar panels make a solar heater viable for this firm', 'A minimum efficiency standard would retire two of its products'] },
        { name: 'Too general', items: ['Economic factors will affect the business', 'Technology is changing rapidly', 'Government policy is important to all firms'] },
      ],
      why: [
        'It names the change and the decision it touches, so it could not be said of any other firm',
        'It is true of every business everywhere, so it carries no information about this one',
      ],
    }),
  };
})();

const twoLetters = (() => {
  const sid = subId('one-factor-two-letters');
  return {
    id: sid,
    title: 'Why One Factor Sits in Two Letters',
    keyIdea: 'Many real changes belong under more than one letter at once, and that is not a fault in the tool — the letters are a prompt to look everywhere, not a filing system to get right.',
    body: [
      { type: 'paragraph', text: 'A rise in the national minimum wage is a **legal** rule, an **economic** cost and a **political** choice. All three are correct, and arguing for one is arguing about the label rather than about the business.' },
      { type: 'paragraph', text: 'What matters is what the change **does**: wage costs rise, so the cost advantage of a low-cost position narrows, so a firm competing on cost is squeezed harder than one competing on difference.' },
      { type: 'paragraph', text: 'So when a factor could sit under two letters, put it under either and **spend the words on the consequence**. A factor named and followed through is worth more than a factor correctly filed and left there.' },
    ],
    examMatters: 'Appendix 6 defines Analyse (6 marks) as requiring a brief chain of reasoning, explanation and/or justification, with interpretation where data or a diagram is given. A chain that reaches the firm\'s costs or its position is doing that work; naming the letter is not.',
    realExample: { emoji: '⚖️', text: 'A rise in a minimum wage is a political choice, an economic cost and a legal requirement at once. Which letter it is filed under changes nothing about what it does to a firm competing on cost.' },
    misconception: 'Students argue about which letter a factor belongs to, as if there were a mark for the filing. The letters are a prompt to look in six directions. Instead pick one and spend the words on what the factor does to this business.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change to the consequence worth following, rather than to its letter:',
      pairs: [
        { left: 'A rise in the minimum wage', right: 'a cost-based advantage narrows' },
        { left: 'A minimum efficiency standard', right: 'some products can no longer be sold' },
        { left: 'Cheaper solar panels', right: 'a product that was not viable becomes viable' },
      ],
      why: [
        'Wages are a cost, and the firm whose advantage was cost loses most of it',
        'A standard is a rule about the product, so products below it leave the market',
        'A falling input price changes what can profitably be built, not just what it costs',
      ],
    }),
  };
})();

const changingEnvironment = (() => {
  const sid = subId('the-changing-competitive-environment');
  return {
    id: sid,
    title: 'The Changing Competitive Environment',
    keyIdea: 'The competitive environment is the firms a business competes with and the conditions they compete under — and it changes without anybody in it deciding to change it.',
    body: [
      { type: 'paragraph', text: 'A business\'s competitive environment is not fixed. New firms arrive, existing ones merge or leave, technology changes what a product has to do, and buyers change what they will pay for.' },
      { type: 'paragraph', text: 'Three kinds of change do most of the work:' },
      { type: 'bullets', items: [
        '**New competitors** — often from outside the industry, or from another country, arriving with a different cost base.',
        '**New technology** — which can turn a strength into an ordinary capability overnight, or open a market that did not exist.',
        '**Changing buyers** — who want something the industry was not built to supply.',
      ] },
      { type: 'paragraph', text: 'What makes this examinable rather than obvious is the **timing problem**. A strategy is chosen for years; the environment changes inside those years. So a position must be committed enough to be worth holding and loose enough to survive a change nobody forecast — and that tension is the answer to most questions in this chapter.' },
    ],
    realExample: { emoji: '📱', text: 'Camera makers, satellite navigation makers and portable music makers were each in a different industry with different rivals — until one product did all three jobs, and their competitive environments merged into one they had not been watching.' },
    misconception: 'Students describe competition as a fixed list of named rivals. The rivals that matter most are often the ones not yet in the industry. Instead ask what could meet this customer\'s need that does not do so today.',
    examMatters: 'Appendix 6 defines Evaluate (20 marks) as requiring awareness of the significance of competing arguments and a perceptive conclusion. The significance of a change usually depends on how fast it arrives relative to how long the firm\'s commitments run.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this sequence of competitive change into order:',
      correctOrder: [
        'An industry settles into a familiar set of rivals',
        'Something outside it changes what the product can be',
        'Firms arrive that were never in this industry',
        'The advantages the old rivals held stop mattering',
        'A strategy chosen for the old environment no longer fits',
      ],
      why: [
        'A settled industry is where the assumptions behind a strategy get made',
        'The change usually comes from technology or from buyers, not from the rivals in the room',
        'The new entrants do not have to be like the old ones, and usually are not',
        'An advantage is only an advantage against the competition you actually face',
        'That is the timing problem: the commitment outlives the conditions it was made under',
      ],
    }),
  };
})();

const fiveForces = (() => {
  const sid = subId('porters-five-forces');
  return {
    id: sid,
    title: "Porter's Five Forces",
    keyIdea: "Porter's five forces — rivalry, new entrants, substitutes, buyer power, supplier power — answer how much of the value created in an industry a firm in it keeps.",
    body: [
      { type: 'bullets', items: [
        '**Rivalry among existing firms** — how hard the firms already here compete, and on what.',
        '**Threat of new entrants** — how easily somebody else could start doing this.',
        '**Threat of substitutes** — what else meets the same need, including doing without.',
        '**Buyer power** — how far buyers can press on price and terms.',
        '**Supplier power** — how far suppliers can press on the firm in turn.',
      ] },
      { type: 'paragraph', text: 'Together they answer a question PESTLE cannot: **how much of the value created here can a firm keep?** Where all five are strong, value created in the industry leaves it — to buyers as lower prices, to suppliers as higher input costs, or to whoever arrives next.' },
      { type: 'paragraph', text: 'Which is why a fast-growing market can still be a poor one to enter. Growth says how much value is being created. **These five say who ends up with it.**' },
    ],
    realExample: { emoji: '💺', text: 'Air travel grew for decades while the airlines flying it struggled: strong buyer power, easy entry on profitable routes, and aircraft and fuel priced by a few suppliers. Growth was real and most of it left the industry.' },
    misconception: 'Students treat the five forces as five things to describe. They are five pressures on one number — what a firm in this industry can keep. Instead judge each force as strong or weak and say what that does to profit.',
    examMatters: 'Appendix 6 defines Assess (12 marks in Units 3 and 4) as requiring balanced and wide ranging assessment leading to a supported judgement. Five forces pointing in different directions is exactly the balance the command word asks for.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each observation by the force it describes: new entrants, substitutes or buyer power?',
      groups: [
        { name: 'New entrants', items: ['An importer can sell here without building a factory', 'Starting up needs no licence and little capital'] },
        { name: 'Substitutes', items: ['Buyers could heat water with gas instead of electricity', 'A customer could simply repair the old unit'] },
        { name: 'Buyer power', items: ['Three retail chains account for most sales', 'Buyers can switch supplier at no cost'] },
      ],
      why: [
        'It is about how easily somebody NEW could start competing here',
        'It is about a different way of meeting the same need, from outside the industry',
        'It is about how much pressure the people buying can apply',
      ],
    }),
  };
})();

const twoDifferentQuestions = (() => {
  const sid = subId('two-different-questions');
  return {
    id: sid,
    title: 'Two Frameworks, Two Different Questions',
    keyIdea: 'PESTLE scans everything outside the business; the five forces examine one industry. Using one where the other is wanted is the commonest error in this chapter.',
    body: [
      { type: 'paragraph', text: 'Both frameworks look outward, and they look at different distances.' },
      { type: 'bullets', items: [
        '**PESTLE** is the wide scan: everything outside the business, whether or not it has anything to do with this industry. It answers *what is changing around us?*',
        '**The five forces** are the close look: one industry, five pressures, and the profit available inside it. They answer *is this a good industry to be in, and can we keep what we make here?*',
      ] },
      { type: 'paragraph', text: 'They also connect, and saying how is what separates a strong answer. **A PESTLE factor usually reaches the business by moving a force.** Cheaper solar panels are technological; what they do is lower the cost of entry, which raises the threat of new entrants. A minimum efficiency standard is legal; what it does is raise the cost of entry, which lowers it.' },
      { type: 'paragraph', text: 'One change, two frameworks, one chain. That chain is the answer to almost every question this chapter can ask.' },
    ],
    misconception: 'Students use PESTLE headings to answer a question about competition, or list five forces when asked about the wider environment. Instead decide which distance the question is at: everything outside the firm, or one industry and the profit inside it.',
    realExample: { emoji: '🔭', text: 'A pharmaceutical firm\'s PESTLE includes an ageing population; its five forces include what happens when a patent expires. Both are outside the firm and only one of them is about this industry\'s profits.' },
    examMatters: 'Appendix 6 defines Analyse (6 marks) as requiring a brief chain of reasoning. The strongest chain in this chapter runs from a PESTLE factor to the force it moves to the profit available, and it is three links long.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each PESTLE factor to the force it moves:',
      pairs: [
        { left: 'Cheaper solar panels (technological)', right: 'the threat of new entrants rises' },
        { left: 'A minimum efficiency standard (legal)', right: 'the threat of new entrants falls' },
        { left: 'Retail chains consolidating (economic)', right: 'buyer power rises' },
      ],
      why: [
        'A lower cost of building the product means more firms can afford to start',
        'A standard adds a cost every entrant must meet before selling anything',
        'Fewer, larger buyers means each one can press harder on price and terms',
      ],
    }),
  };
})();

/* ══ The plan ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [whatAMissionStatementIs, fromMissionToObjectives, writingAnObjective, appraisingTheMission, whatTheMissionCannotDo],
    takeaway: [
      'Mission statement, corporate aims, corporate objectives — each narrows the one above it.',
      'An objective is usable when a figure, a date and an owner make it checkable.',
      'A critical appraisal asks what the statement rules out and whether anything would change without it.',
    ],
  },
  {
    title: B2,
    subs: [twoQuestionsAnsoff, theFourCellsAnsoff, riskRisesWithDistance, adisaFourOptions, whatAnsoffCannotTell],
    takeaway: [
      'Two questions — is the product new, is the market new — give four cells.',
      'Risk rises with what the firm has to learn; the two middle cells are not ranked against each other.',
      'Ansoff sorts the options and chooses none of them.',
    ],
  },
  {
    title: B3,
    subs: [twoDimensionsPorter, theFourCellsPorter, costLeadershipNotLowPrice, adisaPorterPosition, stuckInTheMiddle],
    takeaway: [
      "Porter's Strategic Matrix: source of advantage against breadth of target, giving FOUR cells.",
      'Cost leadership is about what it costs to supply, not what is charged.',
      'The trade-off is real; a firm that escapes it has a reason you can name.',
    ],
  },
  {
    title: B4,
    subs: [whatAPortfolioIs, theAimOfPortfolioAnalysis, readingAdisaPortfolio, whatPortfolioCannotSettle],
    takeaway: [
      'Two numbers per line: how fast that market grows, and how much of it we hold.',
      'The aim is a decision about resources — if nothing moves, no analysis has happened.',
      'It is a snapshot with no causes in it, so it points at a decision without making it.',
    ],
  },
  {
    title: B5,
    subs: [strategicAndTactical, fourTests, humanResources, physicalResources, financialResources],
    takeaway: [
      'Reach and reversibility separate the two, not seniority or size.',
      'Human, physical and financial — the three resources the specification names.',
      'Good tactics cannot rescue the wrong strategy.',
    ],
  },
  {
    title: B6,
    subs: [whatSwotIsFor, internalConsiderations, externalConsiderations, theLineBetween, fromListToStrategy],
    takeaway: [
      'Origin first: internal is strengths and weaknesses, external is opportunities and threats.',
      'The test is whether it would still be true if the business did nothing.',
      'Four lists are not a strategy; the value is in matching across the grid.',
    ],
  },
  {
    title: B7,
    subs: [pestleSix, pestleApplied, twoLetters, changingEnvironment, fiveForces, twoDifferentQuestions],
    takeaway: [
      'PESTLE in full: political, economic, social, technological, legal, environmental.',
      'A factor named and followed through beats a factor correctly filed.',
      'PESTLE scans everything outside; the five forces ask who keeps the value inside one industry.',
    ],
  },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

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
/*
 * `structure-09`: the March Notes carried a four-tier hierarchy — mission, aims, corporate
 * objectives, FUNCTIONAL objectives — that the Learn content did not have, and a student moving
 * between the two tabs met two different pictures. `functional objective` is 0 in bus_spec.txt, so
 * the Notes lose the tier the specification does not name and keep `corporate aims`, which it does
 * (:1095). The two tabs now carry the same three levels.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2 leaves',
    keyIdea: 'How corporate objectives are developed from the mission statement and corporate aims, and how to appraise a mission statement critically.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Mission statement</strong> — what the business is for: its purpose, in words, meant to last for years.'),
        def('<strong>Corporate aims</strong> — the broad directions the business follows in order to serve that purpose.'),
        def('<strong>Corporate objective</strong> — a target for the whole business, carrying a figure and a date.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Each level narrows the one above it: purpose → direction → measurable target. Read upwards it is a test — an objective that cannot be traced back to the mission is serving something else.'),
        mech('An objective is usable when a figure, a date and an owner make it checkable on a stated day. SMART is the common checklist for this and is not specification vocabulary.'),
        mech('The case FOR a mission statement: it settles arguments, speaks to outsiders and filters proposals — all three only if it is specific enough to rule something out.'),
        mech('The case AGAINST: it costs nothing to write, binds nobody, is often written for the reader, and loses to pay and promotion wherever the two disagree.'),
        link('The appraisal question is practical: would anything inside the business change if the mission statement changed? Where the answer is no, it is a public document rather than a management tool.'),
      ] },
    ],
    takeaway: [
      'Three levels, each narrowing the one above it.',
      'A figure, a date and an owner make an objective checkable.',
      'Critical appraisal means both sides and then a judgement.',
    ],
  },
  {
    title: B2,
    meta: '1 leaf',
    keyIdea: "Ansoff's Matrix: growth options sorted by whether the product and the market are existing or new.",
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Market penetration</strong> — existing product, existing market.'),
        def('<strong>Market development</strong> — existing product, new market.'),
        def('<strong>Product development</strong> — new product, existing market.'),
        def('<strong>Diversification</strong> — new product, new market.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Two questions with two answers each give four cells, and every growth option lands in exactly one of them. Where a cell sits is what it means, which is why the matrix is drawn rather than listed.'),
        mech('Risk rises with what the firm must LEARN. Penetration: nothing. The two middle cells: one new thing each. Diversification: a product and a market at once, and either being wrong is enough.'),
        mech('The two middle cells are NOT ranked against each other. Which is safer depends on whether this firm knows its customers or its engineering better.'),
        link('What it cannot see: the size of the prize, the resources each move needs, and the difference between a market one border away and one on another continent.'),
      ] },
    ],
    takeaway: [
      'The name of a cell names the thing that CHANGED.',
      'Risk is distance from what the firm already knows.',
      'It sorts the options; it chooses none of them.',
    ],
  },
  {
    title: B3,
    meta: '1 leaf',
    keyIdea: "Porter's Strategic Matrix: the source of the advantage against the breadth of the target, and the four cells that gives.",
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Cost leadership</strong> — lowest cost supplier to a broad market.'),
        def('<strong>Differentiation</strong> — something buyers value that rivals do not offer, across a broad market.'),
        def('<strong>Cost focus</strong> — lowest cost supplier to one part of the market.'),
        def('<strong>Differentiation focus</strong> — something distinctive, built for one part of the market.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The specification\'s name is Porter\'s Strategic Matrix, and a matrix has cells: two dimensions with two values each give FOUR, not three.'),
        mech('Focus is a WIDTH, not a source of advantage, which is why each focus cell must say which kind of focus it is.'),
        mech('Cost leadership is about the COST of supplying, not the price charged. A cost leader may charge the market price and keep the difference; a firm with the lowest price and ordinary costs has no advantage at all.'),
        link('"Stuck in the middle" is Porter\'s warning that the trade-off is real. Firms that hold both positions usually have a specific reason — a process that lowers cost and improves the product, or scale that funds the distinctiveness. If the reason cannot be named, the warning applies.'),
      ] },
    ],
    takeaway: [
      'Four cells, from two dimensions.',
      'Lowest cost is not lowest price.',
      'Name the reason a firm escapes the trade-off, or accept it.',
    ],
  },
  {
    title: B4,
    meta: '1 leaf',
    keyIdea: 'The aim of portfolio analysis: looking at every line as one set, in order to decide where resources go.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Product portfolio</strong> — everything the business sells, treated as one set.'),
        def('<strong>Portfolio analysis</strong> — comparing those lines on market growth and market share in order to decide where resources go.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Two numbers per line, and they are different numbers: how fast that MARKET is growing, and how much of it WE hold. Neither is the line\'s share of company revenue.'),
        mech('The aim is a decision: is the set balanced, which lines fund which, where does the next investment go, and what can be released. If nothing moves, no analysis has happened.'),
        mech('The pattern that matters is usually a mismatch — the revenue sitting in the settled markets and the growth sitting where the firm is weak.'),
        link('The tool most often used to draw this is the Boston Matrix, which is Unit 1 marketing (1.3.3). At Unit 3 the requirement is the AIM of the analysis, not the construction of the grid.'),
      ] },
    ],
    takeaway: [
      'Market growth and our share: two numbers, two different jobs.',
      'The aim is where resources go next.',
      'A snapshot with no causes in it and no forecast.',
    ],
  },
  {
    title: B5,
    meta: '1 leaf',
    keyIdea: 'The effect of strategic and tactical decisions on human, physical and financial resources.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Strategic decision</strong> — commits the whole business for years and is slow and costly to reverse.'),
        def('<strong>Tactical decision</strong> — adjusts one function for weeks or months and can be undone.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Four tests: time horizon, scope, reversibility, who decides. When they disagree, trust REVERSIBILITY — a decision that can be taken back has committed nothing.'),
        mech('<strong>Human</strong> — a strategy changes who is needed and what they must be able to do; skills take longer to acquire than people, and staff read what a strategy implies about their own line.'),
        mech('<strong>Physical</strong> — buildings, machines and stock. The more specialised the asset the less anyone else will pay for it, which is why physical commitments dominate reversibility.'),
        mech('<strong>Financial</strong> — capital committed now for a return years away: it must be funded, it carries an opportunity cost, and it leaves the firm less room to be wrong about anything else.'),
        link('Tactics serve a strategy and never replace one. A run of good tactical decisions makes a business efficient at going somewhere it should not be going.'),
      ] },
    ],
    takeaway: [
      'Reach and reversibility, not seniority or size.',
      'Three resources, named by the specification and no others.',
      'The strategic commitment is the one that cannot be taken back.',
    ],
  },
  {
    title: B6,
    meta: '2 leaves',
    keyIdea: 'SWOT analysis: internal considerations (strengths and weaknesses) and external considerations (opportunities and threats).',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Strength</strong> — something internal that helps the business compete, and that a rival could not claim.'),
        def('<strong>Weakness</strong> — something internal that holds it back, often the cost of a choice that helped before.'),
        def('<strong>Opportunity</strong> — an external change the business could turn to its advantage.'),
        def('<strong>Threat</strong> — an external change that could damage it.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('ORIGIN FIRST. The specification splits 3a by internal and external, so the first question about any item is where it came from, and only then whether it helps.'),
        mech('The boundary test: would this still be true if the business did nothing? A firm\'s own decision is internal however uncomfortable it is, and calling it a threat hides the fact that the firm can undo it.'),
        mech('An item true of every firm in the industry supports no conclusion about this one.'),
        link('The value is in MATCHING: a strength against an opportunity is a move; a weakness against a threat is a risk to cover. Four lists on their own are not a strategy.'),
      ] },
    ],
    takeaway: [
      'Internal or external first, helpful or harmful second.',
      '"Would this still be true if we did nothing?"',
      'Match across the grid or the grid has done nothing.',
    ],
  },
  {
    title: B7,
    meta: '3 leaves',
    keyIdea: 'The impact of external influences: PESTLE in full, the changing competitive environment, and Porter\'s five forces.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>PESTLE</strong> — political, economic, social, technological, legal, environmental: six kinds of external influence.'),
        def('<strong>Competitive environment</strong> — the firms a business competes with and the conditions they compete under.'),
        def('<strong>The five forces</strong> — rivalry, new entrants, substitutes, buyer power, supplier power.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('PESTLE is a checklist against blindness: six directions to look in, so that a firm used to watching two does not miss the other four.'),
        mech('A factor may sit under two letters at once. Filing it correctly is not the work; following it through to a cost, a price or a position is.'),
        mech('The competitive environment changes without anybody in it deciding to change it — new entrants from outside, technology that resets what a product must do, buyers who want something else.'),
        mech('The five forces answer what PESTLE cannot: how much of the value created in this industry a firm in it can KEEP. A fast-growing market can be a poor one to enter.'),
        link('The two connect: a PESTLE factor usually reaches the business by moving a force. Cheaper components lower the cost of entry and raise the threat of new entrants; a new standard raises it and lowers that threat.'),
      ] },
    ],
    takeaway: [
      'All six letters, each carrying something specific to this firm.',
      'Growth says how much value is created; the five forces say who keeps it.',
      'One change, two frameworks, one chain.',
    ],
  },
];
