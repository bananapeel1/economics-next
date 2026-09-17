/**
 * PACKET 30 — managing-people, Learn Mode content and Notes.
 *
 * IAL Business Unit 1 (WBS11), topic 1.3.4, `audit/raw/bus_spec.txt:676-753` — a span that crosses a
 * page break and resumes at :715 as "1.3.4 Managing people (continued)", where sub-topic 3 finishes
 * and Motivation and Leadership begin. SIX blocks, thirty-seven subsections, one idea each, in the
 * specification's own order.
 *
 * SIX AND NOT FIVE, AND THE PRICE IS ZERO. The specification has five sub-topics; sub-topic 4 carries
 * 18 of the section's 46 leaves — four theorists, five financial methods and eight non-financial ones
 * — so it becomes two consecutive chapters, Motivation in Theory and Motivation in Practice. That is a
 * split WITHIN a sub-topic and not a reordering: specification order holds end to end, which is what
 * fixed `structure-01` at the root in packet 20 rather than patching the pins that produced it.
 * V016's table (DECISIONS, 16 September) prices the count: up to seven blocks a signed-out student
 * gets three pre-test questions and every chapter keeps its check-in quiz, so six costs nothing.
 * `2 + 6 = 8` against `FREE_QUIZ_MAX` 10, with room left for the pre-test top-up.
 *
 * ════ NINE SCOPE CLAIMS WERE CHECKED AND THREE OF THEM CHANGED WHAT IS ON THE PAGE ════
 *
 *   - **"FROM ENTREPRENEUR TO LEADER" STAYS, AND TWO FINDINGS ASKED FOR IT TO GO.** `structure-05`
 *     and the last clause of `topFix-04` say it is "IAL 1.5.6" and belongs in the separate
 *     `entrepreneurs-leaders` section. `BUS-1.3.4-5c` is *"The difficulty of moving from entrepreneur
 *     to leader"* at :753 — a leaf of THIS topic — and IAL 1.3.5's twenty rows are entrepreneurship,
 *     intrapreneurship, barriers, risk, characteristics, motives, objectives, opportunity cost and
 *     trade-offs, not one of which mentions it. Obeying would have deleted an in-scope requirement,
 *     which is packet 26's dangerous class exactly. It keeps a subsection of its own, and chapter 6's
 *     first subsection is written so that 5c is its conclusion rather than an appendix.
 *   - **"WORK-LIFE BALANCE" IS NOT TAUGHT, BECAUSE IT IS NOT THERE.** `specGap-10` asks the question
 *     rather than making the claim — *"unsure whether the current WBS11 spec still lists work-life
 *     balance under flexible working"* — and packet 29's rule is that a hedge gets the same spec check
 *     as an assertion. `work-life` and `work life` are 0 hits in `bus_spec.txt`. The bullet is
 *     "flexible hours and home working" (`1b-4`) and that is what chapter 1 teaches.
 *   - **FLEXIBLE WORKING APPEARS TWICE IN THIS TOPIC AND THE TWO ARE DIFFERENT LEAVES.** `1b-4` is
 *     flexible hours as a way of STAFFING the firm against demand; `4d-5` is flexible working as a
 *     NON-FINANCIAL METHOD of improving performance. The live section runs them together, and so does
 *     `specGap-07`. Each is taught where the specification puts it and each says what the other is for.
 *
 * ════ NO FLOW BODY IN THIS SECTION, AND THAT IS THE COPY-FROM-SCREEN FIX AT THE ROOT ════
 *
 * `lib/learn-steps.js:10` renders a subsection's recall BELOW its teaching on the same step, so a
 * reorder built from a flow box on that step has its answer printed above it in order. Packet 25
 * banned the verbatim form, packet 27 reproduced it in paraphrase five times, and packet 26's
 * conclusion is the one applied here: rewording makes a reorder EASIER to copy, not harder, because
 * the words change and the order — the only thing a reorder tests — does not. So this section
 * authors no `flow` bodies at all and every reorder's sequence lives in the Extras tab.
 *
 * And packet 29's wider finding is designed against, not merely checked: Verify B walked that section
 * and found 24 of 43 steps carrying a recall answerable by scrolling up, NOT ONE of them a reorder.
 * They were fill-ins whose template was the key-idea sentence minus a word. Every recall below asks
 * the student to apply the idea to FIGURES or to a NEW CASE, which is why this section's arithmetic
 * spine exists in a topic that has no equilibrium to solve.
 *
 * ════ EVERY EXAMPLE IS A KIND OF FIRM, WITH NO YEAR, NO NAME AND NO FIGURE ════
 *
 * One decision answering two findings. `accuracy-01` is a fabricated specific — "M&S reduced
 * management layers from seven to five in 2022", which cannot be corroborated — and packet 15's rule
 * is to keep the SHAPE and drop the claim: what that example has to carry is that removing a layer
 * widens every remaining span, and no company, year or layer count is needed to carry it. `locale.uk`
 * is the other, for an audience sitting WBS11 in Hong Kong, Malaysia, Pakistan and the Gulf.
 *
 * Money is in dollars. Every figure belongs to Sabari Textiles and is derived in `_packet30-util.mjs`.
 */
import {
  subId, SECTION, hash8, money, qty, pct, round2,
  ORG, RECRUIT, PAY, FLEXIBLE, TRAINING, STRUCTURE_TERMS, STRUCTURE_TYPES,
  THEORISTS, FINANCIAL, NON_FINANCIAL, STYLES, MASLOW, HERZBERG,
} from './_packet30-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;

/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (`lib/content-validator.mjs:458, :478`), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here, so a reason cannot
 * drift away from the item it explains and a missing one is a length mismatch rather than an
 * undefined nobody notices.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const O = ORG, R = RECRUIT, P = PAY;

export const B1 = 'Approaches to Staffing';
export const B2 = 'Recruitment, Selection and Training';
export const B3 = 'Organisational Design';
export const B4 = 'Motivation in Theory';
export const B5 = 'Motivation in Practice';
export const B6 = 'Leadership';

/* ══ Block 1 — Approaches to staffing (1.3.4 · 1ad) ══════════════════════ */

const staffAssetOrCost = (() => {
  const sid = subId('staff-as-asset-or-cost');
  return {
    id: sid,
    title: 'Staff as an Asset, Staff as a Cost',
    keyIdea: 'Treating staff as an asset means investing in them and expecting a return; treating them as a cost means minimising the outlay. Both are real strategies.',
    body: [
      { type: 'paragraph', text: `Every decision in this topic follows from one thing a firm has already decided without saying so: are the people **an asset to be developed or a cost to be minimised**? The specification puts it first, at 1.3.4 · 1a, because the answer decides how a firm recruits, trains, pays and leads.` },
      { type: 'paragraph', text: `**Staff as an asset.** The firm spends on training, keeps people and promotes from within, expecting the spending back as productivity, quality and fewer leavers. ${O.name}, ${O.what}, spends ${money(R.total)} to recruit one supervisor — ${pct(R.share)} of the ${money(R.salary)} salary — so every leaver it prevents is ${money(R.total)} it does not spend again.` },
      { type: 'paragraph', text: `**Staff as a cost.** The firm buys labour as cheaply as it can, hires for the hours it needs, trains only what the job requires and replaces people when they go. Where the work is simple, demand is seasonal and training takes a day, that is the cheaper answer and the arithmetic supports it.` },
      { type: 'paragraph', text: `What decides which is right is how much of the work is in the PERSON. Where a job takes months to learn, a leaver takes the learning with them and the asset view pays; where it takes a morning, it does not.` },
    ],
    realExample: { emoji: '🧵', text: `A clothing manufacturer running one line of skilled machinists and one line of seasonal packers will treat the two differently in the same building, and be right both times.` },
    misconception: `Students write that the asset approach is "better" and the cost approach is "bad management". The specification asks for both, and the choice depends on how long the job takes to learn and how much demand varies. A firm that trains a seasonal packer for six weeks has wasted the money.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by relevant knowledge. So this leaf needs a cause and its effect, not the two approaches side by side — which is knowledge without the link.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A firm has two groups of staff: machinists whose job takes six months to learn, and seasonal packers whose job takes a morning. Apply the leaf to each:`,
      template: [
        'For the machinists, a leaver takes months of learning away with them, so the ___ approach pays',
        'For the packers, training beyond that morning would simply be ___',
        'So which approach is right depends on how long the job takes to ___',
      ],
      answers: ['asset', 'wasted', 'learn'],
      hints: ['which of the two approaches spends in order to keep', 'what happens to spending that buys nothing', 'the property of the job that decides it'],
      distractors: ['cost', 'repaid', 'do'],
    }),
  };
})();

const multiSkilling = (() => {
  const sid = subId('multi-skilling');
  return {
    id: sid,
    title: 'Multi-Skilling',
    keyIdea: 'Multi-skilling trains one worker to do several jobs, so cover moves to wherever the work is without the firm employing anybody extra.',
    body: [
      { type: 'paragraph', text: `The specification's next leaf, 1.3.4 · 1b, is the **flexible workforce**, and it names five forms. This chapter takes them one at a time because they solve different problems and a student who lists all five as "flexibility" cannot say which one a firm should use.` },
      { type: 'paragraph', text: `**Multi-skilling** is ${FLEXIBLE[0][2].toLowerCase()}. The flexibility is INTERNAL: the same people, able to be moved.` },
      { type: 'paragraph', text: `Its value shows up where demand moves between jobs rather than up and down in total. If ${O.name} sells fewer shirts and more jackets, a multi-skilled machinist moves across; a single-skilled one waits while the other line works overtime.` },
      { type: 'paragraph', text: `It is bought, not found. Training is the cost — and a multi-skilled worker is worth more elsewhere too, so the firm that trains them has also made them easier to lose. That is the tension the asset-or-cost question was about.` },
    ],
    realExample: { emoji: '🔧', text: `A vehicle workshop where every mechanic can also do the electrics never has a car waiting for the one person who can wire it.` },
    misconception: `Students treat multi-skilling as another word for job enlargement. Enlargement adds tasks of the same difficulty to one job permanently; multi-skilling adds the CAPABILITY to do other jobs, which the firm draws on when it needs to and not otherwise.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, and says it focuses on depth rather than breadth. A chain on multi-skilling has to reach an effect on the firm — cover without extra headcount, or a training bill — and listing the five forms of flexibility is breadth.`,
  };
})();

const partTimeTemporary = (() => {
  const sid = subId('part-time-temporary-and-zero-hour');
  return {
    id: sid,
    title: 'Part-Time, Temporary and Zero-Hour Contracts',
    keyIdea: 'These three match the hours the firm pays for to the hours it needs, and they differ in how much certainty the worker keeps.',
    body: [
      { type: 'paragraph', text: `The next three bullets of 1.3.4 · 1b all shift the SAME risk — that demand is lower than expected — and they shift different amounts of it from the firm onto the worker.` },
      { type: 'bullets', items: [
        `**Part-time**: fewer hours than a full week, but a known number of them.`,
        `**Temporary**: a full week, for a fixed period, after which the contract ends.`,
        `**Zero-hour**: ${FLEXIBLE[2][2].toLowerCase()}`,
      ] },
      { type: 'paragraph', text: `Read down that list and the firm's commitment falls at every step while its ability to match staffing to demand rises. A zero-hour contract is the end of it: the firm pays for exactly the hours it uses, and the worker cannot know what next week pays.` },
      { type: 'paragraph', text: `The cost is not zero. Somebody on no guaranteed hours takes the first steadier job they are offered, so the firm carries higher turnover — and at ${money(R.total)} a replacement, a saving on hours can be smaller than the recruitment bill it creates.` },
    ],
    realExample: { emoji: '📦', text: `A parcel depot near a port hires temporary staff for the three months either side of a shipping peak and keeps a permanent core the rest of the year.` },
    misconception: `Students say zero-hour contracts are illegal, or that they mean no employment rights. Neither is what the specification asks about. The distinction that matters is that the HOURS are not guaranteed, so the firm's wage bill moves with demand and the worker's income moves with it too.`,
    examMatters: `Appendix 6 defines Assess as requiring a coherent and logical chain of reasoning that considers the relative importance of factors, leading to a supported judgement. In Units 1 and 2 an Assess carries 10 marks; the judgement is the part students leave out.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each staffing problem by the form of flexibility that answers it:`,
      groups: [
        { name: 'Multi-skilling', items: ['Shirt orders fall and jacket orders rise by the same amount', 'One machine stands idle whenever its operator is away'] },
        { name: 'Part-time or temporary', items: ['Orders treble for the three months before a holiday season', 'The cutting room needs four hours of work a day, not eight'] },
        { name: 'Zero-hour contracts', items: ['Next week could need two packers or eight and nobody knows which'] },
      ],
      why: [
        'Demand has moved BETWEEN jobs rather than in total, so the firm needs the same people able to do a different task.',
        'The total need is known and smaller than a full-time year, so a shorter or fixed-term contract fits it exactly.',
        'The total need is unknown week to week, so the only contract that matches it is one that guarantees no hours at all.',
      ],
    }),
  };
})();

const flexibleHours = (() => {
  const sid = subId('flexible-hours-and-home-working');
  return {
    id: sid,
    title: 'Flexible Hours and Home Working',
    keyIdea: 'The same hours, arranged differently or worked elsewhere. The firm gives up control over when and where, and gets a wider pool and lower premises costs.',
    body: [
      { type: 'paragraph', text: `The fourth bullet of 1.3.4 · 1b is "flexible hours and home working", and it is the one form on the list that does NOT change how many hours the firm buys. It changes WHEN and WHERE they are worked.` },
      { type: 'paragraph', text: `That makes it unlike the three contracts before it. A part-time contract cuts the hours; flexible hours keep them and move them. So it does nothing to match staffing to demand — which is what the other four forms are for — and it does two other things instead.` },
      { type: 'paragraph', text: `First, it widens who can take the job: somebody who cannot be at a workplace between fixed hours can still do the work. For a firm paying ${money(R.items[1].amount)} in agency fees to fill one post, a wider pool is worth money. Second, work done away from the workplace needs less workplace.` },
      { type: 'paragraph', text: `Not every job can take it. A machinist cannot work a sewing line from home, and a supervisor cannot supervise one from elsewhere either. The leaf is about the CHOICE, and the choice does not exist for most of ${O.name}'s staff.` },
    ],
    realExample: { emoji: '🏠', text: `A clothing firm's design and accounts staff can work from anywhere with a connection; its cutting room cannot, and the same firm therefore offers home working to some of its people and not others.` },
    misconception: `Students write about "work-life balance" here. The specification's words are "flexible hours and home working" and work-life balance appears nowhere in it. Write about what changes for the FIRM — the pool it can recruit from, the premises it needs, the supervision it loses — and the effect on the worker follows from that.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase, for 2 marks. Two marks for a term with two parts means saying both: flexible hours are the same hours arranged differently, and home working is the same hours worked away from the workplace.`,
  };
})();

const outsourcing = (() => {
  const sid = subId('outsourcing');
  return {
    id: sid,
    title: 'Outsourcing',
    keyIdea: 'Outsourcing pays another firm to do the work instead of employing anybody to do it, turning a fixed wage bill into a bill that moves with output.',
    body: [
      { type: 'paragraph', text: `The last form of flexibility on the list is the one that removes the employment relationship altogether. **Outsourcing** is ${FLEXIBLE[4][2].toLowerCase()}` },
      { type: 'paragraph', text: `Look at what it does to ${O.name}'s wage bill. Its ${qty(O.tall.workers)} machinists on ${money(O.workerSalary)} each are ${money(O.tall.workers * O.workerSalary)} a year whether the orders come or not. Outsourcing that work replaces the wage bill with an invoice per garment, which is zero when there are no orders.` },
      { type: 'paragraph', text: `The firm gives up three things for it: the skill leaves the building, quality is now somebody else's decision, and the supplier can raise the price once the firm no longer has the capacity to do the work itself.` },
      { type: 'paragraph', text: `That last point is the reason outsourcing is a strategic decision rather than a staffing one. A firm can re-hire a machinist in a month; it cannot rebuild a cutting room and thirty years of knowing how in a month.` },
    ],
    realExample: { emoji: '🚚', text: `A manufacturer that outsources its deliveries pays per consignment instead of running vans, and discovers at the next contract renewal that it no longer has anybody who knows what a delivery should cost.` },
    misconception: `Students treat outsourcing as always cheaper. It converts a FIXED cost into a VARIABLE one, which is cheaper when output is low and dearer when output is high and steady. Say which case the firm is in before concluding.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed, coherent and logical chains of reasoning showing a range of cause and effect, leading to a supported judgement. A 20-mark Evaluate on outsourcing needs both directions argued and a judgement that rests on the firm's own circumstances.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${O.name} employs ${qty(O.tall.workers)} machinists on ${money(O.workerSalary)} each, and is offered the same work priced per garment instead. Follow the money through a month with no orders:`,
      template: [
        'A wage bill is owed whether the orders arrive or not, so it behaves as a ___ cost',
        'An invoice per garment is owed only for garments made, so it behaves as a ___ cost',
        'With no orders at all, the outsourced bill for that month would be ___',
      ],
      answers: ['fixed', 'variable', money(0)],
      hints: ['the kind of cost that does not move', 'the kind that moves with output', 'no garments made, so nothing invoiced'],
      distractors: ['sunk', 'marginal', money(O.tall.workers * O.workerSalary)],
    }),
  };
})();

const dismissalRedundancy = (() => {
  const sid = subId('dismissal-and-redundancy');
  return {
    id: sid,
    title: 'Dismissal and Redundancy',
    keyIdea: 'A dismissal is about the person and the post is usually refilled. A redundancy is about the post, which ceases to exist.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 1c asks for the distinction between dismissal and redundancy, and the whole of it is one question: **has the person failed, or has the job gone?**` },
      { type: 'paragraph', text: `**Dismissal** ends the contract because of the worker — conduct or capability. The work still needs doing, so the firm advertises the post again and spends the ${money(R.total)} of chapter 2 doing it.` },
      { type: 'paragraph', text: `**Redundancy** ends the contract because the POST is no longer needed: demand has fallen, the work has been outsourced, or a level of the hierarchy has been removed. The firm does not advertise, because there is nothing to advertise. Redundancy carries statutory redundancy pay; a dismissal carries notice.` },
      { type: 'paragraph', text: `The practical test is what the firm does next week. If the job is being advertised, it was a dismissal. If it is not, it was a redundancy — and a firm that advertises a post it has just made redundant has made a dismissal and called it something else.` },
    ],
    realExample: { emoji: '📋', text: `A firm that closes its own delivery operation and buys the service in makes its drivers redundant: the vans are gone and the posts with them. A firm that lets one driver go for repeated accidents dismisses them, and recruits another driver.` },
    misconception: `Students use the two words as synonyms for "losing your job", and the distinction is one of the most reliably examined things in the sub-topic. The cause is the difference: the PERSON in a dismissal, the POST in a redundancy.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by relevant knowledge. The cause is what the 4 marks are for here: naming which of the two has happened and why that follows from the facts given.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each situation to what has actually happened, and to what the firm does next:',
      pairs: [
        { left: 'A machine is replaced by one needing half the operators', right: 'Redundancy — the firm does not advertise the posts' },
        { left: 'A supervisor is found to have falsified the quality records', right: 'Dismissal — the firm advertises the post again' },
        { left: 'The delivery work is given to a haulage contractor', right: 'Redundancy — the driving posts have ceased to exist' },
        { left: 'A packer cannot reach the required rate after full training', right: 'Dismissal on capability — the packing post remains' },
      ],
      why: [
        'The work has gone with the machine, so the post is not needed and nothing is advertised.',
        'The post is still needed; it is the person who cannot stay, so the firm recruits a replacement.',
        'Outsourcing removes the posts themselves, which is the clearest case of redundancy in this topic.',
        'Capability is a property of the person, not of the job, so the job continues and the contract does not.',
      ],
    }),
  };
})();

const employerEmployee = (() => {
  const sid = subId('individual-and-collective-approaches');
  return {
    id: sid,
    title: 'Individual and Collective Approaches',
    keyIdea: 'Pay and conditions can be agreed one worker at a time or once for everybody through a union. How alike the jobs are decides which fits.',
    body: [
      { type: 'paragraph', text: `The last leaf of the chapter, 1.3.4 · 1d, names two ways a firm and its staff settle pay and conditions. Only one of them involves a union, and the choice between them is not about who is stronger.` },
      { type: 'paragraph', text: `**The individual approach**: the firm agrees terms with each worker separately. Pay can follow the person's own skill and scarcity, which suits the firm where those differ widely — and leaves the worker with no weight behind their own case.` },
      { type: 'paragraph', text: `**Collective bargaining**: a union negotiates one agreement covering all its members. The firm reaches one settlement instead of ${qty(O.tall.workers)}, which is cheaper to negotiate and harder to move; the worker gains the weight of the group and loses the chance to be paid differently from it.` },
      { type: 'paragraph', text: `Which fits is not a matter of taste. Where ${qty(O.tall.workers)} machinists do the same work on the same machines, one agreement describes all of them accurately. Where a designer's skills are rare, no collective rate can price them, and an individual contract will pay more than one.` },
    ],
    realExample: { emoji: '🤝', text: `A manufacturer can run collective bargaining for its production floor and individual contracts for its designers in the same year, because the two groups differ in how alike their jobs are.` },
    misconception: `Students treat collective bargaining as automatically better for workers and worse for firms. It is cheaper for the FIRM to negotiate once, and it costs a worker whose own skills are worth more than the collective rate. Say which group is being talked about.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief conclusion. In Business a Discuss carries 8 marks, and the conclusion is required — not an evaluation of both sides at length.`,
  };
})();

/* ══ Block 2 — Recruitment, selection and training (1.3.4 · 2ac) ═════════ */

const internalExternal = (() => {
  const sid = subId('internal-versus-external-recruitment');
  return {
    id: sid,
    title: 'Internal and External Recruitment',
    keyIdea: 'Internal recruitment fills a post from inside and moves a vacancy down a level. External recruitment fills it from the labour market and pays to do so.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 2a has one bullet under the recruitment and selection process — "internal versus external recruitment" — so the comparison IS the requirement.` },
      { type: 'paragraph', text: `**External**: advertise, use an agency, shortlist, interview, appoint. ${O.name} pays ${money(R.items[1].amount)} in agency fees and ${money(R.items[3].amount)} of induction for a supervisor recruited this way, and gets somebody who does not yet know how the firm does things — which is a cost if the firm is working well and a benefit if it is not.` },
      { type: 'paragraph', text: `**Internal**: appoint somebody already employed. No agency fee, a shorter induction, and a known quantity. Promotion is also visible to everybody else, which is a Herzberg motivator arriving free — chapter 4 comes back to this.` },
      { type: 'paragraph', text: `And the row students leave out: filling a supervisor's post internally does not fill a post, it MOVES one. The firm recruits anyway, one level down, more cheaply. So the real question is not which is cheaper but **at which level the firm wants to be recruiting from outside**.` },
    ],
    realExample: { emoji: '🪜', text: `A firm that promotes a machinist to supervisor still has to recruit a machinist, so its external hiring happens at the level where training is shortest.` },
    misconception: `Students say internal recruitment is free. It moves the vacancy rather than removing it, and it brings nobody new into the firm — so a firm that only ever promotes from within has, over ten years, nobody who has seen another way of working.`,
    examMatters: `Appendix 6 defines Calculate as requiring students to perform a calculation based on given data, for 4 marks, and says calculators may be used. A Calculate on recruitment is a sum of named items; show the workings, because the marks are in them.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An agency charges 15% of a ${money(R.salary)} salary to find a candidate, and ${O.name} decides to promote from inside instead:`,
      template: [
        'The agency fee, which is ___ of that salary, is not paid at all',
        'A post still has to be filled, one level ___',
        'So internal recruitment has moved the vacancy rather than ___ it',
      ],
      answers: [pct(15), 'down', 'removing'],
      hints: ['the fee is quoted as a share of the salary', 'the promoted machinist has left a gap', 'what the firm has NOT done'],
      distractors: [pct(30), 'up', 'creating'],
    }),
  };
})();

const recruitmentCosts = (() => {
  const sid = subId('costs-of-recruitment-selection-training');
  return {
    id: sid,
    title: 'The Cost of Recruitment, Selection and Training',
    keyIdea: `Recruiting, selecting and training one supervisor costs ${money(R.total)} — ${pct(R.share)} of the salary — and the largest item never appears on an invoice.`,
    body: [
      { type: 'paragraph', text: `1.3.4 · 2b is a single line — "costs of recruitment, selection and training" — and it is a SUM. Here it is for one supervisor at ${O.name} on a ${money(R.salary)} salary. Every figure comes from two day rates: a supervisor across ${qty(O.workingDays)} working days is ${money(R.day)} a day, and a manager on ${money(O.managerSalary)} is ${money(O.managerHour)} an hour.` },
      { type: 'bullets', items: R.items.map((i) => `**${i.label}** — ${i.workings}: ${money(i.amount)}`) },
      { type: 'paragraph', text: `That totals **${money(R.total)}**, which is ${pct(R.share)} of the salary the post pays. By stage: recruitment ${money(R.stages[0][1])}, selection ${money(R.stages[1][1])}, training ${money(R.stages[2][1])}.` },
      { type: 'paragraph', text: `The item worth arguing about is the last. ${money(R.items[5].amount)} of output lost while the new supervisor learns is the second largest cost here and arrives as no invoice, which is why firms under-estimate what turnover costs them: losing ${qty(R.leaversBefore)} supervisors a year is ${money(R.annualBefore)} spent getting back to where it started.` },
    ],
    realExample: { emoji: '🧾', text: `A factory that counts only the agency fee thinks a supervisor costs a few thousand to replace; a factory that counts the lost output of the first fortnight finds it is nearer a third of the salary.` },
    misconception: `Students list "advertising and interviews" and stop. The two biggest items in most real cases are the AGENCY FEE and the LOST OUTPUT, and the second is the one that makes retention worth paying for. A cost that produces no invoice is still a cost.`,
    examMatters: `Appendix 6 says a Calculate question requires a calculation based on given data and that students are advised to show workings. Where a total is asked for, the workings are what make a wrong total worth marks.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A supervisor's day is worth ${money(R.day)} and a manager's hour ${money(O.managerHour)}. The bill for filling one post is ${money(R.total)} on a ${money(R.salary)} salary. Work three of it out:`,
      template: [
        `Five days of induction at ${money(R.day)} a day comes to ___`,
        'The agency fee is 15% of the salary, which is ___ times that induction bill',
        'And the whole exercise costs 30% of it, so filling three such posts costs close to one full ___ of that person\'s pay',
      ],
      answers: [money(900), 'six', 'year'],
      hints: ['multiply the days by the day rate', 'divide the fee by the induction bill', 'three lots of 30% is nearly all of one'],
      distractors: [money(600), 'three', 'quarter'],
    }),
  };
})();

const inductionTraining = (() => {
  const sid = subId('induction-training');
  return {
    id: sid,
    title: 'Induction Training',
    keyIdea: 'Induction is the training given on arrival: the job, the place, the people and the rules. Its purpose is to make somebody useful and safe sooner.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 2c names three types of training and induction is the first. A definition of it is not enough to answer a question with, because what a question asks for is its PURPOSE — so this subsection has both.` },
      { type: 'paragraph', text: `**What it covers.** The job and who does what around it; the place, including where things are and how to be safe in it; the people, so the new starter knows who to ask; and the rules, from hours and breaks to what to do when something goes wrong.` },
      { type: 'paragraph', text: `**What it is for.** Three things. It shortens the time before the new starter produces anything, so every day saved is ${money(R.day)}. It reduces early mistakes, which in a factory means accidents and scrap. And it reduces early LEAVING: a new starter who does not know who to ask is the one most likely to go, at ${money(R.total)} a time.` },
      { type: 'paragraph', text: `Its cost here is ${money(R.items[3].amount)} — ${qty(5)} days at ${money(R.day)} — paid time before anything is produced, which is why a firm treating staff as a cost cuts it first and pays for it later in the lost-output line.` },
    ],
    realExample: { emoji: '🎒', text: `A factory that walks a new machinist round the floor for a week before they touch a machine loses a week of output and avoids the accident that costs a month of it.` },
    misconception: `Students describe induction as "an introduction to the company", which is the tour and not the training. The examinable part is its PURPOSE: fewer early mistakes, less time before the person is productive, and fewer people leaving in the first month.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, explanation and/or justification, and says it does not include evaluation. A chain on induction runs from what it covers to an effect the firm can count — days to productivity, accidents, early leavers — and stops before judging whether it is worth it.`,
  };
})();

const onOffJobTraining = (() => {
  const sid = subId('on-the-job-and-off-the-job-training');
  return {
    id: sid,
    title: 'On-the-Job and Off-the-Job Training',
    keyIdea: 'On-the-job training happens while the work is done and costs output; off-the-job happens away from the work and costs a fee. Both are training and neither is free.',
    body: [
      { type: 'paragraph', text: `The other two types in 1.3.4 · 2c differ in one thing: whether the work is being done while the learning happens.` },
      { type: 'paragraph', text: `**On-the-job.** ${TRAINING[1][2]} It needs no fee and no premises, and it is the cheaper option on any invoice. Its costs are real but invisible: the trainer's output falls while they teach, the learner's output is low and their mistakes are made on real orders. ${O.name}'s ${money(R.items[5].amount)} of lost output is exactly this cost with a number on it.` },
      { type: 'paragraph', text: `**Off-the-job.** ${TRAINING[2][2]} It costs a fee — ${money(R.items[4].amount)} for the supervisory course here — and takes the person away from the work. What it buys is training the firm could not give: a technique nobody inside has, and a learner who can make mistakes without spoiling an order.` },
      { type: 'paragraph', text: `So the choice follows from whether the firm already knows the thing being taught, and not from the invoice: the ${money(R.items[5].amount)} of lost output is larger than the ${money(R.items[4].amount)} course, and only one of the two produces a bill.` },
    ],
    realExample: { emoji: '🎓', text: `A workshop teaches a new mechanic to service an engine by standing them next to somebody servicing one, and sends the same mechanic on a course to learn a diagnostic system nobody in the workshop has used.` },
    misconception: `Students write that on-the-job training is free, or cheap. It is the largest of the three items in this firm's own bill because output falls twice over — the learner's and the trainer's — and a cost that produces no invoice is still a cost.`,
    examMatters: `Appendix 6 defines Assess as requiring a chain of reasoning that considers the relative importance of factors and leads to a supported judgement. The 10-mark Assess in Units 1 and 2 needs a judgement that says WHICH factor mattered most, not a list of both sides.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each cost by whether it appears on an invoice or only in lost output:`,
      groups: [
        { name: 'Appears on an invoice', items: ['A bill from an outside training provider', 'A fee charged by an agency for finding the candidate', 'A listing placed in the trade press'] },
        { name: 'Only in lost output', items: ['Ten days before the new supervisor runs a shift alone', 'A time-served machinist demonstrating instead of sewing', 'Garments spoiled while somebody learns the machine'] },
      ],
      why: [
        'Somebody sends the firm a bill, so the cost is in the accounts and the firm can see what training is costing it.',
        'Nobody sends a bill, so the cost appears as output that did not happen — which is why firms under-count what training and turnover cost them.',
      ],
    }),
  };
})();

/* ══ Block 3 — Organisational design (1.3.4 · 3ac) ══════════════════════ */

const hierarchyChain = (() => {
  const sid = subId('hierarchy-and-chain-of-command');
  return {
    id: sid,
    title: 'Hierarchy and Chain of Command',
    keyIdea: 'A hierarchy is the levels of authority in a firm. The chain of command is the route an instruction travels down them, counted in links, not levels.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 3a names four terms and the next three subsections take them in turn. They are not four definitions to learn separately: they are four readings of the same arithmetic, and ${O.name} is about to be organised two different ways to show it.` },
      { type: 'paragraph', text: `**Hierarchy** is ${STRUCTURE_TERMS[0][2].toLowerCase()}. ${O.name} has ${qty(O.headcount)} staff. Organised with each manager supervising ${qty(O.tall.span)} people, that takes ${qty(O.tall.levels)} levels: ${O.tall.sum}.` },
      { type: 'paragraph', text: `**Chain of command** is the route an instruction travels down those levels, and it is counted in **links** rather than levels. ${qty(O.tall.levels)} levels give ${qty(O.tall.chain)} links, because the number of steps between ${qty(O.tall.levels)} points is ${qty(O.tall.levels)} minus one. An instruction from the top reaches a machinist after being passed on ${qty(O.tall.chain)} times — and can be changed ${qty(O.tall.chain)} times on the way.` },
      { type: 'paragraph', text: `That is the whole cost of a long chain: not delay alone, but **distortion**, and information travelling back up it is distorted the same way. A problem on the floor reaches the top ${qty(O.tall.chain)} retellings later, if it reaches it.` },
    ],
    realExample: { emoji: '📣', text: `In a firm where an instruction passes through four people before it reaches the floor, the version that arrives is the fourth person's version of it, and nobody in the chain thinks they changed anything.` },
    misconception: `Students count levels and call it the chain of command. The chain is the number of LINKS between the levels, which is one fewer. A five-level firm has a chain of four, and writing five is the commonest arithmetic slip in this sub-topic.`,
    examMatters: `Appendix 6 defines Construct as requiring students to draw an accurately labelled diagram, for 4 marks. The labelling is part of the command word rather than decoration on top of it: an org chart wants the levels, the span of control marked on a manager, and the chain of command shown as a route.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${O.name} gives every manager a span of ${qty(O.tall.span)} across ${qty(O.tall.levels)} levels, so the levels hold ${O.tall.sum} people. Work the structure out:`,
      template: [
        'Those levels add to a headcount of ___',
        'The chain of command is ___ links, one fewer than the number of levels',
        'Every level but the bottom one holds a manager, which is ___ of them',
      ],
      answers: [qty(31), qty(4), qty(15)],
      hints: ['add the five figures in the prompt', 'count the steps, not the levels', 'add every level except the last'],
      distractors: [qty(32), qty(5), qty(16)],
    }),
  };
})();

const spanOfControl = (() => {
  const sid = subId('span-of-control');
  return {
    id: sid,
    title: 'Span of Control',
    keyIdea: 'The span of control is how many people report directly to one manager. For a given headcount, a wider span means fewer levels and a shorter chain.',
    body: [
      { type: 'paragraph', text: `**Span of control** is ${STRUCTURE_TERMS[2][2].toLowerCase()} — directly, not in total. A Managing Director with ${qty(O.tall.span)} direct reports has a span of ${qty(O.tall.span)}, whatever the ${qty(O.headcount)} people below them do.` },
      { type: 'paragraph', text: `The span and the number of levels are not two independent choices. For a firm of a given size they are the SAME choice made once, because a span of ${qty(O.tall.span)} repeated over ${qty(O.tall.levels)} levels reaches ${qty(O.tall.headcount)} people and so does a span of ${qty(O.flat.span)} repeated over ${qty(O.flat.levels)}: ${O.flat.sum}.` },
      { type: 'paragraph', text: `The arithmetic is worth holding on to. A span of s repeated over L levels reaches **(s^L − 1) ÷ (s − 1)** people. ${O.tall.formula} is ${qty(O.tall.headcount)} and ${O.flat.formula} is ${qty(O.flat.headcount)}, which is how the same ${qty(O.headcount)} staff can be drawn two completely different ways.` },
      { type: 'paragraph', text: `What decides how wide a span can be is how much supervision the work needs. Routine, similar work that goes wrong visibly can be supervised ${qty(O.flat.span)} at a time; work that is varied, skilled or dangerous cannot. So the structure follows from the WORK, and not from a preference for flat firms.` },
    ],
    realExample: { emoji: '👀', text: `A supervisor can watch five people doing the same task on five identical machines. The same supervisor cannot oversee five people each doing something different in a different room.` },
    misconception: `Students write that a wide span of control is "better because it is flatter". A span is only as wide as the work allows: widen it beyond that and nobody is actually being supervised, which is how quality problems reach the customer instead of the supervisor.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data. Where a span and a number of levels are given, the headcount is (s^L − 1) ÷ (s − 1), and the chain of command is the levels minus one.`,
  };
})();

const centralisedDecentralised = (() => {
  const sid = subId('centralised-and-decentralised');
  return {
    id: sid,
    title: 'Centralised and Decentralised',
    keyIdea: 'Centralised means decisions are taken at the top; decentralised means they are passed down the hierarchy. It is about authority, not about the shape of the chart.',
    body: [
      { type: 'paragraph', text: `The fourth term in 1.3.4 · 3a is the one most easily mistaken for the shape of the chart, and it is not about the shape at all. It is about WHO IS ALLOWED TO DECIDE.` },
      { type: 'paragraph', text: `**Centralised**: the decisions are taken at the top and passed down as instructions. Decisions are consistent across the firm, the people taking them can see the whole picture, and they are taken by the people with the most experience. They are also taken by people who are not there when the problem happens.` },
      { type: 'paragraph', text: `**Decentralised**: the authority to decide is passed down the hierarchy. Decisions are taken by whoever is closest to the problem, they are taken faster, and taking them is itself a motivator — the delegation of chapter 5. They are also less consistent, and they need people trained well enough to take them.` },
      { type: 'paragraph', text: `The thing to be clear about: this is a separate choice from tall or flat. A flat firm can be tightly centralised — ${qty(O.flat.managers)} managers can still refer everything upward — and a tall one can push real authority down to its ${qty(O.tall.workers)} machinists. **The chart shows the levels; it does not show who decides.**` },
    ],
    realExample: { emoji: '🎚️', text: `Two clothing firms with identical org charts can differ entirely in who may authorise a discount: in one it is the Managing Director, in the other any supervisor.` },
    misconception: `Students equate decentralised with flat and centralised with tall. They are independent: the number of LEVELS is one decision and where the AUTHORITY sits is another, and mixing them up produces answers that describe a chart when the question asked who decides.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief conclusion, for 8 marks. Context is the word doing the work: a discussion of centralisation has to be about the firm in the extract.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each fact about a firm by which of the two choices it tells you about:',
      groups: [
        { name: 'The levels (tall or flat)', items: [`A chain of command of ${qty(O.tall.chain)} links`, 'More of the staff supervising than producing', 'Every manager with the same number of direct reports'] },
        { name: 'Who decides (centralised or not)', items: ['A shift leader can agree a delivery date with a customer', 'Every quotation has to be signed by the Managing Director', 'A machinist may reject a roll of cloth on their own judgement'] },
      ],
      why: [
        'These are properties of the SHAPE: they follow from the span and the number of levels and say nothing about who holds the authority.',
        'These are properties of the AUTHORITY: two firms with identical charts can differ on every one of them, which is why this is a separate choice.',
      ],
    }),
  };
})();

const tallFlat = (() => {
  const sid = subId('tall-and-flat-structures');
  return {
    id: sid,
    title: 'Tall and Flat Structures',
    keyIdea: `The same ${qty(O.headcount)} people can be drawn with a span of ${qty(O.tall.span)} over ${qty(O.tall.levels)} levels or a span of ${qty(O.flat.span)} over ${qty(O.flat.levels)}. Removing levels widens spans; it does not remove people.`,
    body: [
      { type: 'paragraph', text: `1.3.4 · 3b names three types of structure and the first two are the same firm. ${O.name} has ${qty(O.headcount)} staff and can be organised either way, which turns an opinion into a subtraction.` },
      { type: 'paragraph', text: `**Tall**: span ${qty(O.tall.span)}, ${qty(O.tall.levels)} levels, chain of ${qty(O.tall.chain)} links. ${O.tall.sum} = ${qty(O.tall.headcount)}. The first ${qty(O.tall.levels - 1)} levels are ${qty(O.tall.managers)} managers and the bottom one is ${qty(O.tall.workers)} machinists.` },
      { type: 'paragraph', text: `**Flat**: span ${qty(O.flat.span)}, ${qty(O.flat.levels)} levels, chain of ${qty(O.flat.chain)} links. ${O.flat.sum} = ${qty(O.flat.headcount)}. Now ${qty(O.flat.managers)} managers and ${qty(O.flat.workers)} machinists.` },
      { type: 'paragraph', text: `So **${qty(O.postsMoved)} posts have moved from supervising to making** and the headcount has not changed. The wage bill falls from ${money(O.tall.wageBill)} to ${money(O.flat.wageBill)} — ${money(O.wageSaving)}, which is ${qty(O.postsMoved)} × ${money(O.workerSalary)}, the difference between what a manager and a machinist are paid. And the chain falls from ${qty(O.tall.chain)} links to ${qty(O.flat.chain)}, so an instruction is retold twice instead of four times.` },
      { type: 'paragraph', text: `None of that is free. Each remaining manager supervises ${qty(O.flat.span)} people instead of ${qty(O.tall.span)}, and the whole firm offers ${qty(O.flat.levels - 1)} promotions instead of ${qty(O.tall.levels - 1)}: a trade of supervision and prospects for cost and speed.` },
    ],
    realExample: { emoji: '📉', text: `A manufacturer that removes a layer of middle managers has not reduced the work those managers did: it has given it to the layer above, whose spans of control have just widened, and to the layer below, which now decides things it used to refer upward.` },
    misconception: `Students write that a firm "delayered to cut staff", and the arithmetic says otherwise: the same ${qty(O.headcount)} people are in both charts. What changes is how many supervise and how many produce, so the saving is the difference in PAY between two kinds of post.`,
    examMatters: `Appendix 6 defines Construct as requiring an accurately labelled diagram. The labels examiners can credit here are the levels, a span of control marked on one manager, and the chain of command drawn as a route and counted in links.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${O.name} moves from span ${qty(O.tall.span)} over ${qty(O.tall.levels)} levels to span ${qty(O.flat.span)} over ${qty(O.flat.levels)}, keeping all ${qty(O.headcount)} staff:`,
      template: [
        `Managers fall from ${qty(O.tall.managers)} to ${qty(O.flat.managers)}, so ___ posts change from supervising to producing`,
        `A manager costs ${money(O.managerSalary)} and a machinist ${money(O.workerSalary)}, so each of those posts now costs ___ as much`,
        'And the chain of command, in words, falls to ___ links',
      ],
      answers: [qty(9), 'half', 'two'],
      hints: ['subtract the two manager counts', 'compare the two salaries', 'the flat chart has three levels'],
      distractors: [qty(31), 'twice', 'four'],
    }),
  };
})();

const matrixStructures = (() => {
  const sid = subId('matrix-structures');
  return {
    id: sid,
    title: 'Matrix Structures',
    keyIdea: 'A matrix keeps the functions and adds a project across them, so somebody on the project has two managers: the project manager and their function head.',
    body: [
      { type: 'paragraph', text: `The third type in 1.3.4 · 3b is the one an org chart cannot draw, because it is not a tree. A **matrix** keeps the functional structure and lays a project ACROSS it.` },
      { type: 'paragraph', text: `${O.name} wins ${O.matrixProject}. It needs somebody from ${O.matrixFunctions.slice(0, -1).join(', ')} and ${O.matrixFunctions[O.matrixFunctions.length - 1]}, working together for the length of the contract. In a matrix, each of those ${qty(O.matrixFunctions.length)} people reports to the project manager for the project and to their own function head for everything else.` },
      { type: 'paragraph', text: `**What it buys.** The contract gets every skill it needs without the firm creating a permanent department for it, and the ${qty(O.matrixFunctions.length)} functions talk to each other about a shared output instead of passing work over a wall. When the contract ends, nothing has to be dismantled.` },
      { type: 'paragraph', text: `**What it costs.** Two managers can ask for the same hours, and somebody has to decide which wins — so a matrix needs a rule about priority before it needs an org chart. That is the real cost, and it is a cost in management time rather than in wages.` },
    ],
    realExample: { emoji: '🔀', text: `A manufacturer bidding for a single large contract can put one designer, one production planner, one quality inspector and one salesperson on it for six months without any of them leaving their department.` },
    /*
     * VERIFY A REJECTED THE FIRST VERSION OF THIS FIELD AND WAS RIGHT. It reproduced the live
     * section's "matrix structures cause confusion, so they should be avoided" almost verbatim in
     * order to refute it — and `structure-07`'s complaint is precisely that no student writes that
     * sentence, so it is not a misconception at all and quoting it keeps the filler. The error
     * students DO make with this structure is thinking the matrix replaces the functional one.
     */
    misconception: `Students describe a matrix as if the project REPLACED the functional structure — one team, one manager, for the length of the contract. It does not: the ${qty(O.matrixFunctions.length)} functions and their managers are still there, which is why the person on the project has two managers and why nothing has to be dismantled when it ends.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by relevant knowledge. The cause here is the dual reporting line; the effect is either the cross-functional working or the conflict over hours, and an Explain needs one of them followed through.`,
  };
})();

const structureEffects = (() => {
  const sid = subId('structure-efficiency-and-motivation');
  return {
    id: sid,
    title: 'Structure, Efficiency and Motivation',
    keyIdea: 'Structure affects efficiency through the wage bill and the chain of command, and motivation through how much authority and promotion a job carries.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 3c asks for the impact of different organisational structures on **business efficiency and employee motivation** — two separate questions, and the chapter has the figures for both.` },
      { type: 'paragraph', text: `**Efficiency.** Flattening ${O.name} cuts the wage bill by ${money(O.wageSaving)} and the chain of command from ${qty(O.tall.chain)} links to ${qty(O.flat.chain)}, so instructions arrive less distorted and decisions are taken sooner. Against that, each manager now supervises ${qty(O.flat.span)} people rather than ${qty(O.tall.span)}, and supervision that is spread too thin shows up as scrap and rework — costs on the other side of the same ledger.` },
      { type: 'paragraph', text: `**Motivation.** A flatter firm pushes authority down, because ${qty(O.flat.managers)} managers cannot decide everything for ${qty(O.headcount)} people: delegation and empowerment arrive as a by-product of the structure. But it leaves ${qty(O.flat.levels - 1)} promotions in the firm instead of ${qty(O.tall.levels - 1)}, and a job with nowhere to go is one an ambitious machinist leaves — at ${money(R.total)} a time.` },
      { type: 'paragraph', text: `So the two effects do not point the same way, and neither does either one on its own. That is what makes this leaf an evaluation question rather than a description, and why an answer has to say **which firm**: how much supervision the work needs, and whether its people expect to be promoted.` },
    ],
    realExample: { emoji: '⚖️', text: `A factory that flattens its structure gains speed and loses the career ladder that kept its best supervisors, and finds out which mattered more only in the following year's turnover figures.` },
    misconception: `Students conclude that flat structures are better because they are cheaper and faster. The same change widens every span and removes most of the promotions, and a firm whose work needs close supervision or whose staff expect to progress can lose more than ${money(O.wageSaving)} to the consequences.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, leading to a supported judgement. This leaf names two effects — efficiency and motivation — so an answer that reaches only one has not covered the requirement.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each consequence of flattening the firm to what it is a consequence FOR:',
      pairs: [
        { left: `A wage bill ${money(O.wageSaving)} lower`, right: 'Efficiency — a direct cost saving' },
        { left: `A chain of ${qty(O.flat.chain)} links instead of ${qty(O.tall.chain)}`, right: 'Efficiency — faster and less distorted decisions' },
        { left: `${qty(O.flat.levels - 1)} promotions in the firm instead of ${qty(O.tall.levels - 1)}`, right: 'Motivation — less to work towards' },
        { left: `Each manager overseeing ${qty(O.flat.span)} people, not ${qty(O.tall.span)}`, right: 'Both — thinner supervision, and more authority lower down' },
      ],
      why: [
        'Nine posts move from a manager’s pay to a machinist’s, which is a saving on the wage bill and nothing to do with how anybody feels.',
        'Fewer links means fewer retellings, so the instruction that arrives is closer to the one that was sent.',
        'Promotion is one of the things a job offers, so removing levels removes it — and an ambitious worker leaves at a cost of the full recruitment bill.',
        'A wider span is less supervision per person, which costs quality, and more authority per person, which motivates. The same change does both.',
      ],
    }),
  };
})();

/* ══ Block 4 — Motivation in theory (1.3.4 · 4ab) ═══════════════════════ */

const importanceOfMotivation = (() => {
  const sid = subId('importance-of-employee-motivation');
  return {
    id: sid,
    title: 'Why Motivation Matters to a Business',
    keyIdea: 'Motivation reaches the accounts through four routes: productivity, retention, quality and absenteeism. Each of them has a number attached.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 4a is a leaf of its own — "the importance of employee motivation to a business" — and it is a business question before it is a psychological one. A firm cares about motivation because of what it does to four figures.` },
      { type: 'bullets', items: [
        `**Productivity.** More output from the same hours and the same machines, which lowers the cost of every unit.`,
        `**Retention.** Fewer leavers. At ${money(R.total)} a replacement, holding ${O.name}'s losses to ${qty(R.leaversAfter)} instead of ${qty(R.leaversBefore)} saves ${money(R.retentionSaving)} a year.`,
        `**Quality.** Fewer mistakes, less scrap, fewer returns — and quality problems caught by the person doing the work rather than by the customer.`,
        `**Absenteeism.** Fewer days lost, and less of the overtime and agency cover that a missing machinist forces the firm to buy.`,
      ] },
      { type: 'paragraph', text: `Those four are the routes by which everything in the next two chapters reaches the profit. A theory of motivation is only useful to this course because it predicts which of the four a particular method will move.` },
      { type: 'paragraph', text: `And the direction runs both ways, which is why this leaf comes before the theories. Low motivation raises turnover, turnover raises the recruitment bill, and a firm spending ${money(R.annualBefore)} a year replacing supervisors has less to spend on keeping them.` },
    ],
    realExample: { emoji: '📈', text: `A factory that cuts its leavers from four a year to one has not improved anybody's mood as a matter of policy: it has stopped spending three recruitment bills on standing still.` },
    misconception: `Students write that motivation matters because "happy workers work harder", which is an assertion rather than a reason. Name the route: productivity, retention, quality or absenteeism — and say which one the case in front of you is about.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, and says it focuses on depth rather than breadth. One of the four routes followed through to a cost is depth; naming all four is breadth.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${O.name} cuts its supervisor losses from ${qty(R.leaversBefore)} a year to ${qty(R.leaversAfter)}, at ${money(R.total)} a replacement. Answer in words:`,
      template: [
        `The firm now pays that ${money(R.total)} bill ___ a year instead of four times`,
        'So it avoids ___ replacements it was paying for before',
        'Fewer people leaving is one of the four routes; a firm cutting its scrap rate instead would be using the ___ route',
      ],
      answers: ['once', 'three', 'quality'],
      hints: ['how often one replacement happens', 'four minus one', 'what scrap is a measure of'],
      distractors: ['twice', 'four', 'retention'],
    }),
  };
})();

const taylor = (() => {
  const sid = subId('taylor-scientific-management');
  return {
    id: sid,
    title: 'Taylor: Scientific Management',
    keyIdea: 'Taylor held that workers are motivated by money, so the way to raise output is to find the best method, train everybody in it and pay by the piece.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 4b names four theorists and the specification gives each of them a name for their theory. Taylor's is **scientific management**, and it is first because everything after it is an argument with it.` },
      { type: 'paragraph', text: `Taylor's claim is that a worker is motivated by **money** and by nothing else that matters at work. From that, three things follow: study the job to find the single most efficient method, train every worker in exactly that method, and pay by the amount produced so that effort and income rise together.` },
      { type: 'paragraph', text: `Piecework is therefore Taylor's method made into a payment system, and chapter 5 does the arithmetic: ${qty(P.pieceUnits)} garments at ${money(P.pieceRate)} pays the same ${money(P.basic)} as a basic wage, and ${qty(P.fastWeek)} pays ${money(P.piece(P.fastWeek))}. The link between effort and pay is the whole design.` },
      { type: 'paragraph', text: `What it gets right is that pay matters and that a better method raises output. What it misses is everything the next three theorists are about — and, on its own terms, it also assumes the firm can measure each worker's output, which a supervisor or a designer's employer cannot.` },
    ],
    realExample: { emoji: '⏱️', text: `A factory that times each stage of sewing a shirt, fixes the method and pays per completed garment is applying Taylor, whether or not anybody there has heard of him.` },
    misconception: `Students write that Taylor "treated workers like machines" and leave it there, which is a judgement rather than the theory. His claim is testable and partly right: where output per person can be measured and the work is repetitive, piece rates do raise it. Say where it fails instead — work that cannot be measured per person, and everything teamwork contributes.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term or phrase. Two marks for scientific management means the method and the payment that goes with it: one best way, found by studying the job, and pay linked to output.`,
  };
})();

const mayo = (() => {
  const sid = subId('mayo-human-relations');
  return {
    id: sid,
    title: 'Mayo: Human Relations Theory',
    keyIdea: 'Mayo found that output rose when workers were given attention and consulted, and when the group they worked in mattered — not only when pay changed.',
    body: [
      { type: 'paragraph', text: `The specification calls Mayo's theory **human relations theory**, and its claim is the first argument against Taylor: what happens BETWEEN people at work changes how much they produce.` },
      { type: 'paragraph', text: `Mayo's studies changed the working conditions of a group of workers — the lighting, the breaks, the hours — and found output rose. Then the changes were reversed, and output rose again. The conclusion was that the changes were not what mattered: **being noticed, consulted and treated as a group** was.` },
      { type: 'paragraph', text: `Three things follow for a firm. Working in teams with an output of their own motivates; being consulted before a change motivates; and taking an interest in the people doing the work motivates, at no cost in wages. All three are non-financial methods, and all three appear in chapter 5.` },
      { type: 'paragraph', text: `At ${O.name} that means the flat structure's ${qty(O.flat.span)}-person teams may motivate for a reason the org chart does not show, and it means a change to the shift pattern that nobody was asked about will cost more in output than it saves in hours.` },
    ],
    realExample: { emoji: '💬', text: `A workshop where the supervisor asks the team how to rearrange the benches, and then does what they suggested, gets more out of the new layout than a firm that installs a better one without asking.` },
    misconception: `Students write that "Mayo proved money doesn't motivate". He did not, and the sentence is the commonest error in this sub-topic. His finding is that attention and the group motivate AS WELL, which is why Herzberg's separation of pay from motivators — the next subsection — is a different claim and not the same one.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by relevant knowledge. The cause in Mayo is the attention or the consultation; the effect is the output. An answer that names the studies without the mechanism has the knowledge and not the explanation.`,
  };
})();

const maslow = (() => {
  const sid = subId('maslow-hierarchy-of-needs');
  return {
    id: sid,
    title: 'Maslow: Hierarchy of Needs',
    keyIdea: 'Maslow ordered needs in five levels and held that a level only motivates once the one below it is met. Pay reaches the bottom two.',
    body: [
      { type: 'paragraph', text: `The specification names Maslow's theory as the **hierarchy of needs**, and the hierarchy IS the theory: five levels, and a level only motivates once the one below has been met.` },
      { type: 'bullets', items: MASLOW.map(([name, what], i) => `**${name}** — ${what.toLowerCase()}: ${MASLOW[i][2].toLowerCase()}.`) },
      { type: 'paragraph', text: `The order tells a firm which method will do nothing. Offering a machinist the chance to redesign the line — the top level — moves nobody just told their contract may not be renewed, because safety sits three levels below and is unmet.` },
      { type: 'paragraph', text: `It also explains a result that looks strange: raising pay often changes very little. Pay reaches the bottom two levels, and once those are met, more of it works on levels it cannot reach — which is where Herzberg arrives from a different direction.` },
    ],
    realExample: { emoji: '🪜', text: `A firm offering extra responsibility to staff on temporary contracts finds nobody wants it, and concludes its people are unambitious rather than insecure.` },
    misconception: `Students use the pyramid as a list of five nice things and tick them all. The ORDER is the claim: a method aimed above the level a worker is on does nothing. That is a prediction, and it is why the theory is useful in an answer.`,
    examMatters: `Appendix 6 defines Assess as requiring a chain of reasoning that considers the relative importance of factors and leads to a supported judgement — 10 marks in Units 1 and 2. With Maslow that means naming the LEVEL a method reaches and whether the levels below are met.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort each thing ${O.name} could offer by the level it reaches:`,
      groups: [
        { name: 'Reaches the bottom two levels', items: ['A wage that covers the rent with something left over', 'A contract that will not end in three months', 'A mesh screen fitted over the cutting blade'] },
        { name: 'Reaches the middle level', items: [`A bench of ${qty(O.flat.span)} who take their breaks at the same time`] },
        { name: 'Reaches the top two levels', items: ['Being asked to show the next three new starters how the line runs', 'Being handed the sewing line to lay out again from scratch'] },
      ],
      why: [
        'Pay and safety are the bottom two levels, which is why more of either does nothing once they are already met.',
        'Belonging to a group at work is the middle level — the one Mayo’s studies are about.',
        'Recognition is esteem and work that stretches you is self-actualisation, and neither motivates while a level below is unmet.',
      ],
    }),
  };
})();

const herzberg = (() => {
  const sid = subId('herzberg-two-factor');
  return {
    id: sid,
    title: 'Herzberg: Two-Factor Theory',
    keyIdea: 'Herzberg separated hygiene factors, which can only stop dissatisfaction, from motivators, which are the only things that can cause satisfaction.',
    body: [
      { type: 'paragraph', text: `The specification names Herzberg's theory as the **two-factor theory**, and the two factors sit on **two separate scales** rather than at the two ends of one. That is the whole theory, and collapsing the two into one axis leaves nothing of it.` },
      { type: 'paragraph', text: `**Hygiene factors** — ${HERZBERG.hygiene.join(', ').toLowerCase()} — run from dissatisfied to NOT dissatisfied. Get them wrong and people are unhappy; get them right and people are not unhappy. They cannot reach satisfied, because satisfied is not on their scale.` },
      { type: 'paragraph', text: `**Motivators** — ${HERZBERG.motivators.join(', ').toLowerCase()} — run from not satisfied to SATISFIED. They are the only things on that second scale, and every one of them is a property of the WORK rather than of its surroundings.` },
      { type: 'paragraph', text: `Pay is a hygiene factor, which is the claim with consequences. ${O.name} raising a machinist from ${money(P.rate)} to ${money(P.prpRate)} an hour — ${money(P.prpGain)} a week — removes a grievance and adds nothing to the second scale. Job enrichment, which adds responsibility, is on the second scale and costs nothing in wages. Chapter 5 is largely a list of methods sorted by which scale they act on.` },
    ],
    realExample: { emoji: '🧯', text: `A firm that fixes the canteen, the car park and the pay and then wonders why nobody is enthusiastic has spent its money entirely on the first scale.` },
    misconception: `Students write that "pay does not motivate", which overstates it into something false. Herzberg's claim is that pay can remove DISSATISFACTION and cannot produce satisfaction — so underpay people and the damage is real, and overpay them and nothing arrives on the other scale.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, leading to a supported judgement, for 20 marks. An Evaluate using Herzberg has to use the separation: which scale each proposed method acts on, and whether the firm's problem is dissatisfaction or the absence of satisfaction.`,
    recall: recall(sid, {
      type: 'match',
      prompt: `Match each of ${O.name}'s problems to the scale a fix would have to act on:`,
      pairs: [
        { left: 'Machinists complain the machines are badly maintained', right: 'Hygiene — a grievance to remove' },
        { left: 'Nobody volunteers for anything beyond their own bench', right: 'Motivators — responsibility to add' },
        { left: `A ${money(P.prpGain)} rise changed nothing about how the job feels`, right: 'Hygiene was already met, so more of it does nothing' },
        { left: 'The best machinist wants to be the one who trains others', right: 'Motivators — recognition and advancement' },
      ],
      why: [
        'Working conditions are a hygiene factor: fixing them stops the complaint and does not make anybody enthusiastic.',
        'Willingness to take on more is what the second scale produces, and no hygiene factor can reach it.',
        'Pay is a hygiene factor, so once it is adequate a further rise acts on a scale that has already run out.',
        'Recognition and advancement are both motivators, and both are properties of the work rather than of its surroundings.',
      ],
    }),
  };
})();

/* ══ Block 5 — Motivation in practice (1.3.4 · 4cd) ═════════════════════ */

const pieceworkCommission = (() => {
  const sid = subId('piecework-and-commission');
  return {
    id: sid,
    title: 'Piecework and Commission',
    keyIdea: 'Both pay for output rather than for time — piecework per unit made, commission as a share of what is sold — so both move the risk onto the worker.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 4c names five financial methods of improving employee performance, and the figures below are all set against one basic wage: a standard week of ${qty(P.hours)} hours at ${money(P.rate)}, which is ${money(P.basic)}. The two methods in this subsection REPLACE that wage and are set to equal it exactly, so the comparison between them is about risk rather than about generosity. The three in the next subsection ADD to it.` },
      { type: 'paragraph', text: `**Piecework** pays per unit produced. At ${money(P.pieceRate)} a garment, ${qty(P.pieceUnits)} garments pays ${money(P.basic)} — the same as the basic wage. A slow week of ${qty(P.slowWeek)} pays ${money(P.piece(P.slowWeek))} and a good week of ${qty(P.fastWeek)} pays ${money(P.piece(P.fastWeek))}.` },
      { type: 'paragraph', text: `**Commission** pays a share of sales. At ${pct(P.commissionRate)}, ${money(P.commissionSales)} of sales pays ${money(P.basic)}; ${money(P.slowSales)} pays ${money(P.commission(P.slowSales))} and ${money(P.fastSales)} pays ${money(P.commission(P.fastSales))}.` },
      { type: 'paragraph', text: `The two are the same design applied to making and to selling, and they have the same consequence: in a bad week the worker's income falls and the firm's wage bill falls with it. **The worker carries the risk that demand is low**, which is what a basic wage exists to prevent. Piecework also pays for quantity and not for quality, so a firm using it needs inspection it would otherwise not need.` },
    ],
    realExample: { emoji: '✂️', text: `A garment factory paying per finished piece finds its output rises and its rejects rise with it, and ends up employing an inspector to hold the quality the piece rate stopped rewarding.` },
    misconception: `Students treat piecework as simply harsh. It is a transfer of RISK, and in a good week it transfers income the other way: ${money(P.piece(P.fastWeek))} against a basic ${money(P.basic)}. The objection that holds is about quality, not about generosity.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, for 4 marks, with workings advised. A piece rate and a quantity, or a commission rate and a sales figure, is exactly that calculation.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A machinist on ${money(P.pieceRate)} a garment and a salesperson on ${pct(P.commissionRate)} commission both have a slow week:`,
      template: [
        `${qty(P.slowWeek)} garments instead of ${qty(P.pieceUnits)} pays ___`,
        `A good week of ${qty(P.fastWeek)} garments would have paid ___ instead`,
        'In both weeks it is the ___ whose income moved, not the firm\'s wage bill per garment',
      ],
      answers: [money(P.piece(P.slowWeek)), money(P.piece(P.fastWeek)), 'worker'],
      hints: ['multiply the units by the piece rate', 'the same multiplication, higher output', 'who was paid less in the slow week'],
      distractors: [money(P.basic), money(240), 'firm'],
    }),
  };
})();

const bonusProfitShare = (() => {
  const sid = subId('bonus-and-profit-share');
  return {
    id: sid,
    title: 'Bonus and Profit Share',
    keyIdea: 'A bonus is an extra payment for hitting a target; a profit share divides a slice of the profit among the staff. Both pay for a result nobody achieved alone.',
    body: [
      { type: 'paragraph', text: `The third and fourth methods in 1.3.4 · 4c both pay for a GROUP result, which is what separates them from piecework and commission — and from each other, because one is set against a target and the other against a profit.` },
      { type: 'paragraph', text: `**Bonus.** An extra payment for reaching a target. ${O.name} pays ${pct(P.bonusRate)} of a quarter's basic pay if the quarter's output target is met: ${pct(P.bonusRate)} of ${money(P.quarterBasic)} is ${money(P.bonus)}, which is ${money(P.bonusPerWeek)} a week spread over the ${qty(P.quarterWeeks)} weeks. Unlike piecework it is all-or-nothing, so a team that misses the target by one garment gets nothing.` },
      { type: 'paragraph', text: `**Profit share.** A slice of the profit divided among the staff. ${pct(P.shareRate)} of ${money(P.profit)} is ${money(P.pool)}, and split between all ${qty(O.headcount)} staff that is ${money(P.perHead)} each.` },
      { type: 'paragraph', text: `Both have the same strength and the same weakness. They reward what the firm actually cares about — the whole result rather than one person's output — and they therefore reward everybody equally for it, including whoever did least. And a profit share settled once a year on ${money(P.profit)} of profit rewards nothing a machinist does this week, which is the standing objection to it.` },
    ],
    realExample: { emoji: '🎯', text: `A factory paying a quarterly team bonus finds the team helping its slowest member in week twelve, which no individual piece rate would have produced.` },
    misconception: `Students treat a bonus and a profit share as the same thing. A bonus is for hitting a TARGET the firm set and can be paid in a year with no profit; a profit share is a fraction of the profit and is zero when the profit is zero, whatever anybody achieved.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning without evaluation. A chain on a group payment has to reach the group effect — co-operation, or the free-rider — rather than stopping at the size of the payment.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${O.name} pays ${pct(P.bonusRate)} of a quarter's basic pay as a bonus, and shares ${pct(P.shareRate)} of ${money(P.profit)} profit among all ${qty(O.headcount)} staff:`,
      template: [
        `A quarter's basic pay is ${money(P.quarterBasic)} and the bonus is a tenth of it, so a machinist who hits the target receives ___`,
        `Across the ${qty(P.quarterWeeks)} weeks that is worth ___ a week`,
        `And the profit share, ${pct(P.shareRate)} of ${money(P.profit)} divided ${qty(O.headcount)} ways, is ___ each`,
      ],
      answers: [money(P.bonus), money(P.bonusPerWeek), money(P.perHead)],
      hints: ['take the percentage of the quarter', 'divide the bonus by the weeks', 'take the percentage, then divide by the headcount'],
      distractors: [money(600), money(45), money(360)],
    }),
  };
})();

const performancePay = (() => {
  const sid = subId('performance-related-pay');
  return {
    id: sid,
    title: 'Performance-Related Pay',
    keyIdea: 'Performance-related pay raises the rate itself after an appraisal, so it rewards a judgement about the person rather than a count of their output.',
    body: [
      { type: 'paragraph', text: `The fifth method in 1.3.4 · 4c is the one that works where the other four cannot: it pays for **performance as assessed**, not for output as counted.` },
      { type: 'paragraph', text: `${O.name} appraises each machinist annually and raises the hourly rate by ${pct(P.prpUplift)} for a good appraisal: ${money(P.rate)} becomes ${money(P.prpRate)}, which over a ${qty(P.hours)}-hour week is ${money(P.prpWeek)} instead of ${money(P.basic)} — ${money(P.prpGain)} more a week, permanently.` },
      { type: 'paragraph', text: `Two things follow from the fact that it raises the RATE. The reward is permanent rather than one-off, so it compounds for somebody appraised well twice; and it is available for jobs whose output nobody can count — a supervisor's, a designer's, a quality inspector's — which is most of the ${qty(O.headcount)} staff in the flat structure.` },
      { type: 'paragraph', text: `Its weakness is the appraisal. The payment is only as good as the judgement behind it, and a machinist who believes the appraisal was unfair has been given a grievance rather than an incentive. Herzberg's separation makes the sharper point: pay is a hygiene factor, so ${money(P.prpGain)} a week removes a complaint and puts nothing on the second scale.` },
    ],
    realExample: { emoji: '📝', text: `A workshop that ties a pay rise to an annual appraisal gets the behaviour the appraisal form measures, which is why the form ends up describing the firm's real priorities whether anybody intended it to or not.` },
    misconception: `Students say performance-related pay is the same as a bonus. A bonus is a separate payment for a target; performance-related pay raises the RATE after a judgement, so it is permanent and it works on jobs where there is nothing to count.`,
    examMatters: `Appendix 6 defines Assess as requiring a chain of reasoning that considers the relative importance of factors and leads to a supported judgement, carrying 10 marks in Units 1 and 2. Here the factor worth weighing is the quality of the appraisal, because the method cannot be better than it.`,
  };
})();

const delegationConsultation = (() => {
  const sid = subId('delegation-and-consultation');
  return {
    id: sid,
    title: 'Delegation and Consultation',
    keyIdea: 'Delegation passes a task and the authority to decide how it is done. Consultation asks before deciding. Both motivate and neither costs a wage.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 4d names eight non-financial methods. The first two are the ones most closely tied to the structure of chapter 3, because a firm's hierarchy decides how much of either it can offer.` },
      { type: 'paragraph', text: `**Delegation** is ${NON_FINANCIAL[0][2].toLowerCase()} — and the authority is the part that matters. Handing somebody a task while keeping the right to decide how it is done is not delegation; it is an instruction. What motivates is being trusted to choose, which is why delegation reaches Herzberg's second scale and a pay rise does not.` },
      { type: 'paragraph', text: `**Consultation** is ${NON_FINANCIAL[1][2].toLowerCase()} It is weaker than delegation — the decision is still the manager's — and it is the method Mayo's studies point at directly: workers who were asked produced more, and the asking cost nothing.` },
      { type: 'paragraph', text: `Both follow from the decentralisation of chapter 3. A flat ${O.name} with ${qty(O.flat.managers)} managers for ${qty(O.headcount)} people HAS to delegate, because ${qty(O.flat.managers)} people cannot decide everything — so the structure delivers a motivator as a by-product, and the tall version of the same firm has to choose to.` },
    ],
    realExample: { emoji: '🔑', text: `A supervisor who tells a machinist which order to run next has given an instruction; one who tells them the week's orders and leaves the sequence to them has delegated, and the work takes the same time either way.` },
    misconception: `Students use delegation to mean "giving somebody a job to do". Without the authority to decide HOW, nothing has been delegated and nobody is motivated — the task has simply been reassigned, and the manager is still the one deciding.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by relevant knowledge. The cause in delegation is the transfer of AUTHORITY; an answer whose cause is the transfer of the task has explained something else.`,
  };
})();

const empowerment = (() => {
  const sid = subId('empowerment');
  return {
    id: sid,
    title: 'Empowerment',
    keyIdea: 'Empowerment gives staff control over how the work is done, within limits the firm sets. It is delegation made permanent and general rather than task by task.',
    body: [
      { type: 'paragraph', text: `**Empowerment** is ${NON_FINANCIAL[2][2].toLowerCase()} It is the third of the eight, and it differs from delegation in scope rather than in kind: delegation passes one task, empowerment is a standing arrangement about how the job is done.` },
      { type: 'paragraph', text: `The phrase "within limits" is not a hedge. Empowerment without limits is abdication, and the limits are what make it safe to give: a machinist empowered to stop the line when the stitching is wrong is empowered to stop the line, and not to change the order book.` },
      { type: 'paragraph', text: `What it buys the firm is decisions taken by whoever is closest to the problem — the same argument as decentralisation in chapter 3, one person at a time. A machinist who can stop a bad batch stops it at ten garments rather than at four hundred.` },
      { type: 'paragraph', text: `What it costs is training and tolerance. An empowered worker who decides badly has to be allowed to have decided badly at least once, or nobody decides anything again — and a firm that empowers people without training them has arranged for the wrong decisions to be taken faster.` },
    ],
    realExample: { emoji: '🛑', text: `A production line where any operator may halt it to fix a fault catches the fault at ten units; a line where only the supervisor may halt it catches the same fault at the end of the shift.` },
    misconception: `Students treat empowerment as a synonym for delegation. Delegation is task by task and the manager keeps the job; empowerment is a standing change to what the job includes, which is why it needs limits written down and delegation does not.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief conclusion, for 8 marks. The conclusion is compulsory and short: not an evaluation, one sentence that follows from the chains.`,
  };
})();

const teamWorking = (() => {
  const sid = subId('team-working');
  return {
    id: sid,
    title: 'Team Working',
    keyIdea: 'Team working organises the work around a group with a shared output, so the group covers for itself and belonging becomes part of the job.',
    body: [
      { type: 'paragraph', text: `**Team working** is ${NON_FINANCIAL[3][2].toLowerCase()} — and the shared output is what makes it a team rather than a set of people sitting near each other.` },
      { type: 'paragraph', text: `It is the method with the most theory behind it. Mayo's finding was that the GROUP changes output; Maslow's third level is belonging; and a team that is measured on a shared result has a reason to help its slowest member, which no individual piece rate can produce.` },
      { type: 'paragraph', text: `In the flat ${O.name}, one supervisor and ${qty(O.flat.span)} machinists is already a team-shaped unit — so the structure of chapter 3 delivers this method too, provided the ${qty(O.flat.span)} are measured on something they share.` },
      { type: 'paragraph', text: `Its cost is the free-rider, and it is the same cost the group payments of this chapter carry: where the result is shared, so is the credit, and somebody can take the credit without the work. Teams small enough for everybody to see everybody's contribution are the usual answer.` },
    ],
    realExample: { emoji: '🧶', text: `A cutting room organised as one team responsible for a whole order finishes it faster than five people each responsible for one stage, because the queue between the stages is now somebody's problem.` },
    misconception: `Students write that team working motivates because "people enjoy working together". The mechanism is the SHARED OUTPUT: it makes the team's weakest link everybody's problem, which is a change to the incentives and not to the atmosphere.`,
    examMatters: `Appendix 6 says Analyse focuses on depth rather than breadth and does not include evaluation. Depth here is one mechanism — the shared output, or the free-rider — followed through to an effect the firm can see.`,
  };
})();

const flexibleWorkingMethod = (() => {
  const sid = subId('flexible-working');
  return {
    id: sid,
    title: 'Flexible Working as a Motivator',
    keyIdea: 'Flexible working lets staff choose when or where the hours are worked. It appears twice in this topic: as a way to staff the firm, and as a way to motivate.',
    body: [
      { type: 'paragraph', text: `The fifth non-financial method is **flexible working**, and it is the same practice as chapter 1's "flexible hours and home working" asked about for a completely different reason. The specification lists it in both places, at 1.3.4 · 1b and again at 1.3.4 · 4d.` },
      { type: 'paragraph', text: `**In chapter 1** the question was what it does for the FIRM: a wider pool to recruit from, less premises, and no help at all in matching staffing to demand.` },
      { type: 'paragraph', text: `**Here** the question is what it does for the WORKER, and the answer is control. Somebody who chooses when the hours are worked has authority over part of their own job, which is the same mechanism as delegation and empowerment — and on Herzberg's scales it is a property of the work rather than of its surroundings.` },
      { type: 'paragraph', text: `Which is why it is worth having twice. A firm offering it only to widen its recruitment pool gets the motivation free; a firm offering it as a motivator to machinists who cannot sew from home has offered nothing, because the same method is available to some jobs and not others.` },
    ],
    realExample: { emoji: '🕰️', text: `A firm that lets its accounts staff choose their start time and cannot offer the same to its cutting room has one motivator available to part of its workforce, and has to find another for the rest.` },
    misconception: `Students treat the two appearances as one bullet and answer the wrong question. In the staffing sub-topic it is about the firm's flexibility; in the motivation sub-topic it is about the worker's control. Check which sub-topic the question is in.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term or phrase, for 2 marks. Flexible working is choice over WHEN or WHERE the hours are worked, and the two marks are for saying which of those the case is about.`,
  };
})();

const jobEnrichment = (() => {
  const sid = subId('job-enrichment');
  return {
    id: sid,
    title: 'Job Enrichment',
    keyIdea: 'Job enrichment makes the work harder and adds responsibility. It is the one method on the list that is a Herzberg motivator by construction.',
    body: [
      { type: 'paragraph', text: `**Job enrichment** is ${NON_FINANCIAL[5][2].toLowerCase()} — harder tasks and more responsibility, not more tasks. The distinction is the whole of the next subsection, and it is where marks are most often lost.` },
      { type: 'paragraph', text: `It is the method Herzberg's theory predicts directly. His motivators are achievement, recognition, the work itself, responsibility and advancement, and enrichment adds two of them — the work itself and responsibility — by changing what the job consists of.` },
      { type: 'paragraph', text: `At ${O.name} that means a machinist who also inspects their own output and signs it off has a richer job: the work is harder, the responsibility is real, and the firm has moved inspection to the person who can fix the fault.` },
      { type: 'paragraph', text: `Its cost is training and its risk is the worker who does not want it. A job made harder without the training to do it is a job somebody fails at, and enrichment offered to somebody worried about their contract is aimed at Maslow's fourth level while the second is unmet.` },
    ],
    realExample: { emoji: '🌱', text: `A machinist who signs off their own quality has a harder job, and the firm has one fewer inspection queue, because the person who made the fault is now the person who finds it.` },
    misconception: `Students use enrichment and enlargement interchangeably. Enrichment changes the DIFFICULTY and the responsibility; enlargement adds tasks at the same difficulty. Only the first reaches a Herzberg motivator, and calling enlargement enrichment is the commonest error in this sub-topic.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, leading to a supported judgement, for 20 marks. An Evaluate of a motivation package is expected to weigh the financial methods against the non-financial ones and conclude for a particular firm.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change to a machinist\'s job by whether it raises the DIFFICULTY, which is what enrichment means:',
      groups: [
        { name: 'Harder, and more responsible', items: ['Being the one who decides whether a batch may ship', 'Choosing the sequence the week\'s orders are run in'] },
        { name: 'Bigger, and no harder', items: ['Adding the labelling to a job that was only sewing', 'Taking on the box-stacking as well'] },
      ],
      why: [
        'Difficulty and responsibility have both risen, which is enrichment — and responsibility is one of Herzberg’s five motivators.',
        'More of the same difficulty is not enrichment at all, whatever it is called: nothing has been added that could reach the second scale.',
      ],
    }),
  };
})();

const rotationEnlargement = (() => {
  const sid = subId('job-rotation-and-enlargement');
  return {
    id: sid,
    title: 'Job Rotation and Job Enlargement',
    keyIdea: 'Rotation moves a worker between jobs of the same difficulty; enlargement adds tasks of the same difficulty to one job. Neither adds responsibility.',
    body: [
      { type: 'paragraph', text: `The last two of the eight non-financial methods are the two that look like enrichment and are not, because neither changes the DIFFICULTY of the work.` },
      { type: 'paragraph', text: `**Job rotation** is ${NON_FINANCIAL[6][2].toLowerCase()} A machinist who spends alternate weeks at the cutting bench is rotating. It relieves boredom, and it produces multi-skilling as a side effect — chapter 1's first form of flexibility, arriving through a motivation method.` },
      { type: 'paragraph', text: `**Job enlargement** is ${NON_FINANCIAL[7][2].toLowerCase()} A machinist who also labels and boxes what they have sewn has an enlarged job. The work is broader and no harder.` },
      { type: 'paragraph', text: `On Herzberg's scales, neither reaches the second one: nothing about either adds achievement, recognition or responsibility. Both can be received as more work for the same pay, and enlargement especially — which is why the honest summary is that rotation treats boredom and enlargement treats a staffing gap, and enrichment is the only one of the three that treats motivation.` },
    ],
    realExample: { emoji: '🔁', text: `A packer moved between three benches in a month is less bored and no more responsible, and the firm has quietly acquired somebody who can cover all three when anyone is away.` },
    misconception: `Students write that all three "job" methods motivate. Only enrichment adds responsibility, and a worker given more tasks at the same difficulty and the same pay usually experiences it as exactly that — which is why enlargement has a reputation for backfiring.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by relevant knowledge. Naming which of the three a case describes is the knowledge; saying what it therefore does to motivation is the explanation, and the marks are on the second part.`,
  };
})();

/* ══ Block 6 — Leadership (1.3.4 · 5ac) ═════════════════════════════════ */

const managementLeadership = (() => {
  const sid = subId('management-and-leadership');
  return {
    id: sid,
    title: 'Management and Leadership',
    keyIdea: 'Management is concerned with the work getting done and takes its authority from the post. Leadership is concerned with where the firm is going.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 5a has one bullet — "the distinction between management and leadership" — and it is the chapter's opening idea rather than an aside, because the four styles that follow are styles of taking DECISIONS and the last leaf is about a founder who cannot make the change.` },
      { type: 'paragraph', text: `**Management** is about the work getting done: allocating it, checking it, and solving what goes wrong this week. Its authority comes from the POST — a supervisor is obeyed because they are the supervisor.` },
      { type: 'paragraph', text: `**Leadership** is about where the firm is going and why: setting a direction and persuading people to follow it. Its authority comes from the PERSON, which is why it can exist without a post and why a post does not confer it.` },
      { type: 'paragraph', text: `The same person usually does both, which is what makes the distinction hard to see and worth drawing. A supervisor allocating ${qty(O.flat.span)} machinists to ${qty(O.flat.span)} machines is managing; the same supervisor persuading them to accept a new shift pattern is leading, and only one of those two jobs is in the job description.` },
    ],
    realExample: { emoji: '🧭', text: `The person a workforce actually listens to during a change is often not the person whose title says they should be, which is the distinction in one observation.` },
    misconception: `Students write that managers are junior and leaders are senior. It is not a rank: a Managing Director doing next week's rota is managing, and a machinist who talks the floor round to a new method is leading. The difference is the horizon and where the authority comes from.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term or phrase. Two marks for the distinction means naming what each is concerned with — the work, and the direction — rather than describing one and implying the other.`,
  };
})();

const autocratic = (() => {
  const sid = subId('autocratic-leadership');
  return {
    id: sid,
    title: 'Autocratic Leadership',
    keyIdea: 'The autocratic leader decides alone and tells. It is fast and it is right where speed matters or where staff do not yet know the work.',
    body: [
      { type: 'paragraph', text: `1.3.4 · 5b names four styles and they differ in exactly one thing: **who takes the decision**. They run in the specification's order from the leader alone to the staff alone, and the four subsections that follow take them in that order.` },
      { type: 'paragraph', text: `**Autocratic**: the leader decides and tells. No consultation, and the reasons need not be given.` },
      { type: 'paragraph', text: `What it is for: speed, and situations where the staff genuinely do not know enough to contribute. A fire, a safety failure, a new starter's first week, an order that has to ship tonight — in all four, asking ${qty(O.flat.span)} machinists what they think costs more than it adds.` },
      { type: 'paragraph', text: `What it costs is everything the last chapter was about. Nobody is delegated to, nobody is consulted, nobody is empowered, so no motivator on Herzberg's second scale is available at all — and a firm led this way permanently has trained its staff not to decide, which is expensive the first time a decision has to be taken without the leader.` },
    ],
    realExample: { emoji: '🚨', text: `A supervisor who stops the line and reassigns everybody the moment a machine catches fire is being autocratic and is right; the same supervisor choosing next month's shift pattern the same way is not.` },
    misconception: `Students write that autocratic leadership is bad management. The specification asks for it as a style, and there are cases where it is the correct one — speed, danger, and staff who do not yet know the work. Say which case before judging.`,
    examMatters: `Appendix 6 defines Assess as requiring a chain of reasoning that considers the relative importance of factors, leading to a supported judgement, for 10 marks in Units 1 and 2. Assessing a style means weighing the situation against the staff, not listing advantages.`,
  };
})();

const paternalistic = (() => {
  const sid = subId('paternalistic-leadership');
  return {
    id: sid,
    title: 'Paternalistic Leadership',
    keyIdea: 'The paternalistic leader still decides, but explains the decision and weighs what it does to the staff. It buys loyalty and does not transfer authority.',
    body: [
      { type: 'paragraph', text: `The second style in 1.3.4 · 5b is the one most often left out of a list of four, and the one most often mistaken for a softer version of the first.` },
      { type: 'paragraph', text: `**Paternalistic**: the leader decides, as an autocrat does, and then **explains the decision and takes the staff's interests into account in making it**. The authority does not move. What changes is that the reasons are given and the effect on the staff is part of the calculation.` },
      { type: 'paragraph', text: `That makes it a separate style rather than a softer word for autocratic, and the test is a question: who decided? If the answer is the leader, it is not democratic, however consultative it felt. If the reasons were given and the staff's position was weighed, it is not autocratic either.` },
      { type: 'paragraph', text: `What it buys is loyalty and trust, and it works where the staff believe the leader is acting in their interest — a long-standing workforce, a firm that has looked after people before. What it costs is that nobody learns to decide: the staff are looked after rather than trusted, so the motivators of delegation and empowerment stay unavailable.` },
    ],
    realExample: { emoji: '🫱', text: `A firm that moves a shift pattern, explains exactly why, and adjusts it for the people with the longest journeys has decided paternalistically: the decision was never the staff's, and their position changed it.` },
    misconception: `Students treat paternalistic as democratic because the leader explained themselves. Explaining a decision is not sharing it. The test is who decided — and under a paternalistic style the answer is still the leader.`,
    examMatters: `Appendix 6 defines Explain as a brief explanation of cause or effect supported by relevant knowledge. The knowledge here is the definition and the cause is the loyalty; an answer that describes a kindly manager without the retained authority has not defined the style.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each thing a leader does by whether it is autocratic or paternalistic, which are the only two styles so far:',
      groups: [
        { name: 'Autocratic', items: ['Tells the floor the rota has changed and does not say why', 'Refuses to discuss the new running order with anyone'] },
        { name: 'Paternalistic', items: ['Sets the rota, gives the reason, and keeps one person off the early shift after hearing why they asked', 'Decides the order alone, having first worked out which bench it would hurt'] },
      ],
      why: [
        'The decision is the leader’s and nothing is explained or weighed, which is the defining case of the autocratic style.',
        'The decision is still the leader’s — the difference is that the reasons were given and the staff’s position changed the outcome.',
      ],
    }),
  };
})();

const democratic = (() => {
  const sid = subId('democratic-leadership');
  return {
    id: sid,
    title: 'Democratic Leadership',
    keyIdea: 'The democratic leader decides with the staff, or lets them decide. It is slower, and it is right where the staff know the work better than the leader.',
    body: [
      { type: 'paragraph', text: `**Democratic**: the leader decides WITH the staff, or hands the decision to them. This is the first style on the list where the authority actually moves, which is why it is the first that can motivate.` },
      { type: 'paragraph', text: `What it is for: decisions where the staff know more than the leader. Nobody knows how a sewing line should be arranged better than the ${qty(O.flat.span)} people who work it, and a decision taken with them is a better decision as well as a more popular one.` },
      { type: 'paragraph', text: `It also delivers the motivators of the last chapter by construction. Being consulted is Mayo's finding; being trusted to decide is delegation; the responsibility that comes with it is on Herzberg's second scale. None of that costs a wage.` },
      { type: 'paragraph', text: `What it costs is time, and it fails in two specific cases: where the decision is urgent, and where the staff do not know enough to take it. Consulting new starters about a method none of them has used yet produces a decision nobody should act on and a leader who looks unsure.` },
    ],
    realExample: { emoji: '🗳️', text: `A cutting room asked how to sequence a difficult order produces a sequence the supervisor would not have thought of, and then holds to it, because it was theirs.` },
    misconception: `Students write that democratic leadership is the best style. It needs staff who know the work and time to reach a decision, and it is the wrong style for an emergency or a new team. The specification asks for four styles because four situations need them.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief conclusion, for 8 marks. Context decides which style is right, so a Discuss that never mentions the firm in the extract cannot reach a conclusion.`,
  };
})();

const laissezFaire = (() => {
  const sid = subId('laissez-faire-leadership');
  return {
    id: sid,
    title: 'Laissez-Faire Leadership',
    keyIdea: 'The laissez-faire leader sets the goal and leaves the staff to it. With expert, self-directed staff it works; without them it is abdication.',
    body: [
      { type: 'paragraph', text: `**Laissez-faire**: the leader sets the objective and leaves the staff to decide everything else. It is the far end of the list — the staff decide, and the leader is not in the room.` },
      { type: 'paragraph', text: `The condition it needs is expertise. A design team, a research group, a workshop of time-served specialists: people who know the work better than any leader could and who expect to be left to it. For them, anything else is interference and a reason to leave.` },
      { type: 'paragraph', text: `The line between this style and abdication is whether **a goal was set**. A leader who says the line must run 60 hours this week and leaves the pattern to the team is laissez-faire; a leader who says nothing is absent, and the two look identical from a distance until something goes wrong.` },
      { type: 'paragraph', text: `Applied to the wrong staff it is the most expensive style on the list. Leaving ${qty(O.flat.span)} new machinists to work out a method produces four methods, none of them checked, and the quality problem arrives at the customer rather than at the supervisor.` },
    ],
    realExample: { emoji: '🎼', text: `A group of experienced specialists given an objective and a deadline organises itself better than any instruction would have; the same freedom given to a new team produces four ways of doing one job.` },
    misconception: `Students treat laissez-faire as a leader doing nothing. The style includes setting the goal, and the goal is what separates it from absence. A question asking whether a leader was laissez-faire or absent is asking whether anybody said what the objective was.`,
    examMatters: `Appendix 6 says Analyse focuses on depth rather than breadth and does not include evaluation. A chain on laissez-faire runs from the staff's expertise to the quality of the decisions they take, and stops before judging the style.`,
  };
})();

const entrepreneurToLeader = (() => {
  const sid = subId('entrepreneur-to-leader');
  return {
    id: sid,
    title: 'From Entrepreneur to Leader',
    keyIdea: 'A founder decides everything and knows everyone. A leader of 31 people cannot, so the move requires delegating, structuring and leading through others.',
    body: [
      { type: 'paragraph', text: `The last leaf of the topic, 1.3.4 · 5c, asks why **moving from entrepreneur to leader is difficult**. Everything in the previous five chapters is the answer.` },
      { type: 'paragraph', text: `A founder with four staff does every job: recruits, trains, decides, sells and leads, and their authority comes from being the person who started it. Nothing has to be structured, because the founder is the structure.` },
      { type: 'paragraph', text: `At ${qty(O.headcount)} people none of that survives. Somebody has to be recruited rather than known, so recruitment costs ${money(R.total)} a post. Decisions have to be delegated, because one person cannot take ${qty(O.headcount)} people's decisions. A hierarchy has to exist, so authority starts coming from the POST rather than from the person — and that is the transition, in one sentence.` },
      { type: 'paragraph', text: `Which is why it is hard for the specific reason the specification implies: the skills that built the firm are the ones now in the way. Deciding fast was an advantage at four people and is a bottleneck at ${qty(O.headcount)}; knowing everything personally was the founder's edge and is now the thing preventing anybody else from being trusted. **The founder has to stop doing what made them successful**, on the evidence of nothing going wrong yet.` },
    ],
    realExample: { emoji: '🌉', text: `A firm whose founder still authorises every discount at thirty staff has not failed at anything: it has outgrown the one habit that worked best when there were four of them.` },
    misconception: `Students write that the founder "needs to learn to delegate", which is the conclusion and not the difficulty. The difficulty is that delegating means accepting worse decisions in the short run from people still learning to take them, and doing it before anything has visibly gone wrong.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed, coherent chains of reasoning showing a range of causes and effects, leading to a supported judgement, for 20 marks. This leaf reaches across the whole topic, which is why it is the section's 20-mark question.`,
  };
})();

/* ══ The block plan — six chapters, in specification order ════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [staffAssetOrCost, multiSkilling, partTimeTemporary, flexibleHours, outsourcing, dismissalRedundancy, employerEmployee], takeaway: [
    'Asset or cost is a strategy, not a virtue: it depends on how long the job takes to learn.',
    'Five forms of flexibility, and only multi-skilling keeps the same hours and the same people.',
    'Dismissal is about the PERSON; redundancy is about the POST, which ceases to exist.',
    `Individual or collective follows from how alike the jobs are, not from preference.`,
  ] },
  { title: B2, subs: [internalExternal, recruitmentCosts, inductionTraining, onOffJobTraining], takeaway: [
    'Internal recruitment moves a vacancy down a level; it does not remove one.',
    `One supervisor costs ${money(R.total)} to recruit, select and train — ${pct(R.share)} of the salary.`,
    'Induction has a purpose: fewer early mistakes, faster productivity, fewer early leavers.',
    `On-the-job costs output and off-the-job costs a fee. The larger one produces no invoice.`,
  ] },
  { title: B3, subs: [hierarchyChain, spanOfControl, centralisedDecentralised, tallFlat, matrixStructures, structureEffects], takeaway: [
    'The chain of command is counted in LINKS: one fewer than the number of levels.',
    `A span s over L levels reaches (s^L − 1) ÷ (s − 1): ${O.tall.formula} and ${O.flat.formula} both give ${qty(O.headcount)}.`,
    'Tall or flat is one choice; centralised or decentralised is a different one.',
    `Flattening moves ${qty(O.postsMoved)} posts from supervising to making and saves ${money(O.wageSaving)}.`,
    'A matrix adds a project across the functions, so somebody has two managers.',
  ] },
  { title: B4, subs: [importanceOfMotivation, taylor, mayo, maslow, herzberg], takeaway: [
    'Motivation reaches the accounts four ways: productivity, retention, quality, absenteeism.',
    'Taylor: money motivates, so find one best method and pay by the piece.',
    'Mayo: attention and the group raise output too. He did not prove money fails.',
    'Maslow: five levels, and a level only motivates once the one below it is met.',
    'Herzberg: TWO scales. Hygiene reaches "not dissatisfied"; only motivators reach satisfied.',
  ] },
  { title: B5, subs: [pieceworkCommission, bonusProfitShare, performancePay, delegationConsultation, empowerment, teamWorking, flexibleWorkingMethod, jobEnrichment, rotationEnlargement], takeaway: [
    `Piecework and commission are set to equal the ${money(P.basic)} basic week exactly: the difference is risk.`,
    'Piecework and commission move the risk onto the worker; bonus and profit share reward a group.',
    'Delegation passes the AUTHORITY, not only the task. Without it nothing is delegated.',
    'Enrichment raises difficulty and responsibility; rotation and enlargement do not.',
    'Only enrichment, delegation, consultation and empowerment reach Herzberg\'s second scale.',
  ] },
  { title: B6, subs: [managementLeadership, autocratic, paternalistic, democratic, laissezFaire, entrepreneurToLeader], takeaway: [
    'Management is the work and comes from the post; leadership is the direction, from the person.',
    'The four styles differ in ONE thing: who takes the decision.',
    'Paternalistic still decides — it explains, and weighs the staff. Explaining is not sharing.',
    'Laissez-faire sets the goal. A leader who sets no goal is absent, not laissez-faire.',
    'From entrepreneur to leader: authority stops coming from the person and starts coming from the post.',
  ] },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

/* ══ The recall bank ══════════════════════════════════════════════════════ */
/*
 * `topFix-01` IS THAT FOUR OF THIS SECTION'S NINE FILL-INS CANNOT BE DISPLAYED AT ALL. Two have more
 * answers than blank lines, one maps its blanks to the wrong lines and one repeats "Hawthorne" as two
 * answers, which makes the recall unfinishable: `fillin.dup-answers` records that the second chip
 * vanishes when its twin is placed. Sixteen of the section's thirty-five BLOCK findings are in those
 * nine widgets. The finding's optional clause asks for `FillInRecall.jsx` to be hardened to render
 * several blanks a line; the renderer already does (packet 7), and the defect is in the CONTENT — so
 * the rule is enforced here and in the runner: one `___` a template line, `answers.length` equal to
 * the blank count, and no answer repeated.
 *
 * AND EVERY RECALL APPLIES THE IDEA RATHER THAN RESTATING IT. Packet 29's Verify B found 24 of 43
 * steps carrying a recall answerable by scrolling up, and not one of them was a reorder: they were
 * fill-ins whose template was the key-idea sentence with a word removed. That is why this section has
 * an arithmetic spine in a qualitative topic — a fill-in asking for the wage saving when nine posts
 * move cannot be answered by rereading the paragraph above it, and one asking what the chain of
 * command is called can.
 *
 * TWO REORDERS, BOTH SOURCED FROM EXTRAS CHAINS. No subsection in this section has a `flow` body, so
 * `reorder.source` has only the chains to draw on, which is the arrangement packet 29 arrived at:
 * the sequence a reorder tests is taught in the Extras tab and never printed above the widget.
 */
const ATTACH = {
  /* ── Block 1 ───────────────────────────────────────────────────────────── */
  'multi-skilling': {
    type: 'match',
    prompt: 'Match each thing that happens on a factory floor to whether multi-skilling answers it, and why:',
    pairs: [
      { left: 'Shirt orders fall by exactly as much as jacket orders rise', right: 'Answered: the same people move across' },
      { left: 'One machine stands idle whenever its usual operator is away', right: 'Answered: somebody else can already run it' },
      { left: 'Every order in the book doubles for a year', right: 'Not answered: the firm needs more hours, not more range' },
      { left: 'The trained machinist is offered more money by a rival', right: 'Not answered: the training made them easier to lose' },
    ],
    why: [
      'Demand has moved BETWEEN jobs and not in total, which is the case multi-skilling exists for.',
      'Cover for absence is the same property read the other way round: capability held in reserve.',
      'Multi-skilling adds no hours, so a rise in total demand needs something else entirely.',
      'The capability belongs to the worker once it is trained, which is the cost the firm carries for it.',
    ],
  },
  'flexible-hours-and-home-working': {
    type: 'fillin',
    prompt: `${O.name} has ${qty(O.headcount)} staff. Its cutting room and sewing lines cannot work from home; its design and accounts staff can. Work out the reach of the method:`,
    template: [
      `A sewing line cannot be worked from elsewhere, so of the ${qty(O.headcount)} staff the ${qty(O.tall.workers)} machinists are out, leaving at most ___`,
      `That is the ___ of the workforce, not the majority`,
      'And a firm facing a peak three times its normal orders would need one of the other four forms instead, because this one does not change how many ___ the firm buys',
    ],
    answers: ['fifteen', 'smaller part', 'hours'],
    hints: [`subtract the machinists from the ${qty(O.headcount)}`, 'compare it with the rest of the staff', 'what a part-time contract changes and this does not'],
    distractors: ['twenty-five', 'larger part', 'garments'],
  },
  'individual-and-collective-approaches': {
    type: 'classify',
    prompt: 'Sort each group of staff by which approach to pay and conditions fits it better:',
    groups: [
      { name: 'The individual approach', items: ['A designer whose skills two other firms want', 'A maintenance engineer who is the only one qualified on the machines'] },
      { name: 'Collective bargaining', items: [`${qty(O.flat.workers)} machinists on identical machines doing identical work`, 'A packing line where every post is interchangeable', 'A night shift wanting the same premium as the day shift'] },
    ],
    why: [
      'Where skills are rare and differ from person to person, no single collective rate can price them, and the individual can be paid more than one.',
      'Where jobs are alike and many, one agreement describes all of them accurately — cheaper for the firm to reach and stronger for the worker to hold.',
    ],
  },

  /* ── Block 2 ───────────────────────────────────────────────────────────── */
  'induction-training': {
    type: 'fillin',
    prompt: `Induction at ${O.name} is ${qty(5)} days at ${money(R.day)} a day, and the new supervisor's first ${qty(10)} days produce nothing sellable. Work out what a shorter induction would and would not save:`,
    template: [
      `Cutting induction by ${qty(2)} days saves the firm ___`,
      `But each extra day before the supervisor is productive costs another ___`,
      `So a firm that cuts induction to save money pays for it in the ___ output line`,
    ],
    answers: [money(2 * R.day), money(R.day), 'lost'],
    hints: ['two days at the day rate', 'one day at the same rate', 'the item on the cost list with no invoice'],
    distractors: [money(R.items[3].amount), money(R.total), 'advertising'],
  },

  /* ── Block 3 ───────────────────────────────────────────────────────────── */
  'span-of-control': {
    type: 'fillin',
    prompt: `${O.name} has ${qty(O.headcount)} staff. Use (s^L − 1) ÷ (s − 1) to find how many levels each span would need, and answer in words:`,
    template: [
      `A span of ${qty(O.tall.span)} reaches them all only at ___ levels`,
      `A span of ${qty(O.flat.span)} reaches them at ___ levels`,
      'So widening the span ___ the number of levels a firm needs',
    ],
    answers: ['five', 'three', 'reduces'],
    hints: ['keep doubling until the total is reached', 'keep multiplying by the span until it is reached', 'the direction the level count moves'],
    distractors: ['four', 'two', 'raises'],
  },
  'matrix-structures': {
    type: 'classify',
    prompt: 'Sort each feature by whether it belongs to a matrix structure or to a plain functional one:',
    groups: [
      { name: 'Matrix', items: [`One person from each of the ${qty(O.matrixFunctions.length)} functions on a single contract`, 'Somebody who reports to two managers at once', 'A team that is dissolved when the contract ends'] },
      { name: 'Functional only', items: ['Every worker with exactly one manager', 'Departments that pass work between them in sequence'] },
    ],
    why: [
      'The defining feature is the second reporting line: the project claims the person for the project and the function keeps them for everything else.',
      'One manager per worker is what makes a structure a tree, and a tree cannot show a project running across it.',
    ],
  },

  /* ── Block 4 ───────────────────────────────────────────────────────────── */
  'taylor-scientific-management': {
    type: 'reorder',
    prompt: 'Put the four steps of applying scientific management in the order Taylor prescribes, from studying the job to paying for the output:',
    correctOrder: [
      'Time each stage of the job and compare the results',
      'Write the quickest way down as the standard',
      'Train every machinist to follow the standard',
      'Put the machinists on a piece rate',
    ],
    why: [
      'Nothing can be standardised before the study has found which method is quickest, so the study is first and is the part the theory is named for.',
      'Writing the method down turns a finding into something a firm can train against; without it every supervisor teaches their own version.',
      'Training comes after the standard exists and before the payment, because paying by output for a method nobody has been taught pays for luck.',
      'The piece rate comes last: it is the incentive to follow the method, and it only works once the method is known and taught.',
    ],
  },
  'mayo-human-relations': {
    type: 'fillin',
    prompt: `${O.name} moves to the flat structure, which puts its machinists into teams of ${qty(O.flat.span)} under one supervisor. Apply Mayo:`,
    template: [
      `A supervisor moves ${qty(O.flat.span)} machinists onto one bench and asks them how to arrange it. Two things have happened at once, and on Mayo's reading the one that raises output is the ___`,
      'Suppose the bench is then moved back to where it was, and output rises again. That rules out the ___ as the cause',
      'Which is the finding, and it is why a firm can raise output at a cost of ___',
    ],
    answers: ['asking', 'layout', 'nothing'],
    hints: ['which of the two acts involved the workers', 'the thing that was changed and then unchanged', 'what consulting people costs in wages'],
    distractors: ['moving', 'group', 'a pay rise'],
  },

  /* ── Block 5 ───────────────────────────────────────────────────────────── */
  'performance-related-pay': {
    type: 'fillin',
    prompt: `A good appraisal raises a machinist's rate by ${pct(P.prpUplift)} from ${money(P.rate)} an hour, over a ${qty(P.hours)}-hour week:`,
    template: [
      `The new hourly rate is ___`,
      `The week's pay rises from ${money(P.basic)} to ___`,
      `That is ___ more a week, and it is permanent rather than one-off`,
    ],
    answers: [money(P.prpRate), money(P.prpWeek), money(P.prpGain)],
    hints: ['add the percentage to the rate', 'multiply the new rate by the hours', 'subtract the two weekly figures'],
    distractors: [money(P.rate), money(P.basic), money(P.bonusPerWeek)],
  },
  'delegation-and-consultation': {
    type: 'match',
    prompt: 'Match each thing a supervisor does to what it actually is, by asking who ends up deciding:',
    pairs: [
      { left: 'Tells a machinist the week\'s orders and leaves the sequence to them', right: 'Delegation — the authority moved with the task' },
      { left: 'Tells a machinist which order to run next, and when', right: 'An instruction — the task moved and the authority did not' },
      { left: 'Asks the team about a new bench layout, then chooses', right: 'Consultation — the decision stayed with the supervisor' },
      { left: 'Tells a machinist to run order 4 next, then order 7, then order 2', right: 'An instruction three times over — nothing has moved' },
    ],
    why: [
      'The sequence is now the machinist’s to choose, and choosing is what makes it delegation rather than an instruction.',
      'Handing over a task while keeping the right to decide how it is done is not delegation at all — it is the work being reassigned.',
      'Asking is weaker than delegating because the decision does not move, and it is the method Mayo’s studies point at directly.',
      'Breaking one instruction into three is still an instruction: the authority to decide the sequence never left the supervisor.',
    ],
  },
  'empowerment': {
    type: 'fillin',
    prompt: `An empowered machinist may stop the line for a stitching fault. An unempowered one reports it and waits for the supervisor:`,
    template: [
      `A fault appears after ${qty(10)} garments. An empowered machinist stops there; an unempowered one reports it and a shift of ${qty(400)} runs on, so ___ times as many are spoiled`,
      'Neither machinist saw the fault sooner than the other, so what differed was the ___ each of them held',
      'Which is why it is written down with limits: the same machinist may stop the line and may not change the ___',
    ],
    answers: ['forty', 'authority', 'order book'],
    hints: ['divide the shift by the ten', 'what one was allowed to act on and the other was not', 'the thing that stays the firm\'s to decide'],
    distractors: ['ten', 'training', 'method'],
  },
  'team-working': {
    type: 'classify',
    prompt: 'Sort each statement by whether it describes a real team or a group of people working near each other:',
    groups: [
      { name: 'A team', items: [`${qty(O.flat.span)} machinists whose figure is the completed order`, 'A bench that rearranges itself when one member falls behind', 'One bench answerable for an order from cloth to box'] },
      { name: 'Just a group', items: ['Five people each counted on what they personally finished', 'A line where nobody owns the queue between two stages'] },
    ],
    why: [
      'A shared OUTPUT is what makes it a team: it makes the slowest member everybody’s problem, which no individual measure can do.',
      'Where everybody is measured separately, nothing about sitting together changes the incentives, and the queue between them stays unowned.',
    ],
  },
  'flexible-working': {
    type: 'fillin',
    prompt: 'The same practice appears twice in this topic. Say which question each appearance answers:',
    template: [
      `Under approaches to staffing, flexible hours are about what the arrangement does for the ___`,
      `Under non-financial methods, flexible working is about the ___ it gives the worker`,
      `And it is not on Herzberg's first scale, because it is a property of the ___ rather than its surroundings`,
    ],
    answers: ['firm', 'control', 'work'],
    hints: ['whose flexibility chapter 1 was about', 'what choosing your own hours amounts to', 'what motivators are properties of'],
    distractors: ['worker', 'pay', 'workplace'],
  },
  /*
   * THE THREE-WAY SORT LIVES HERE, ON THE LAST OF THE THREE "JOB" METHODS, because it needs all
   * three taught. Layer 6 found it on the ENRICHMENT step, one subsection before rotation exists.
   */
  'job-rotation-and-enlargement': {
    type: 'match',
    prompt: 'Match each change to a packer\'s job to the method it is, and to what it does about motivation:',
    pairs: [
      { left: 'Also inspects and signs off the boxes they pack', right: 'Enrichment — responsibility added, so a motivator' },
      { left: 'Also labels the boxes as well as packing them', right: 'Enlargement — more tasks, no more responsibility' },
      { left: 'Packs for a fortnight, then works the cutting bench', right: 'Rotation — different tasks, same difficulty' },
      { left: 'Is trained on the cutting bench for when cover is needed', right: 'Multi-skilling — a capability the firm draws on' },
    ],
    why: [
      'Signing off means being answerable for the result, which is responsibility, and responsibility is on Herzberg’s second scale.',
      'Labelling is no harder than packing, so the job is broader and nothing has been added that could motivate.',
      'Moving between jobs relieves boredom without changing what the worker is answerable for.',
      'Multi-skilling is the capability rather than the movement: the firm holds it in reserve and uses it when it needs cover.',
    ],
  },

  /* ── Block 6 ───────────────────────────────────────────────────────────── */
  'management-and-leadership': {
    type: 'classify',
    prompt: 'Sort each thing somebody at Sabari does by whether it is management or leadership:',
    groups: [
      { name: 'Management', items: [`Putting ${qty(O.flat.span)} machinists on ${qty(O.flat.span)} machines for the week`, 'Signing off the quality records before an order ships', 'Redrawing next month\'s rota around a public holiday'] },
      { name: 'Leadership', items: ['Convincing the machinists that an unfamiliar method is worth trying', 'Deciding the firm\'s future is in school uniforms rather than shirts'] },
    ],
    why: [
      'All three are about the work getting done this week, and the authority to do them comes with the post.',
      'Both are about where the firm is going and about persuading people to go there, which is authority that comes from the person.',
    ],
  },
  'autocratic-leadership': {
    type: 'classify',
    prompt: 'Sort each situation by whether an autocratic decision is the right call or the wrong one:',
    groups: [
      { name: 'Autocratic is right', items: ['Smoke is coming from a machine and everyone has to move now', 'A customer needs the order tonight and the running order must change', 'Somebody has never used this machine before and is standing at it'] },
      { name: 'Autocratic is wrong', items: [`Settling the shift pattern for next month with ${qty(O.flat.workers)} people affected`, 'Working out the best way to lay out a bench nobody has used yet'] },
    ],
    why: [
      'Speed matters more than agreement, or the staff do not yet know enough to contribute — which is exactly what the style is for.',
      'There is time, and the people who work the line know more about it than the leader does, so deciding alone produces a worse decision as well as an unpopular one.',
    ],
  },
  'democratic-leadership': {
    type: 'fillin',
    prompt: `A supervisor asks ${qty(O.flat.span)} machinists how to sequence a difficult order and adopts their answer. Work out what the style has delivered:`,
    template: [
      `The decision has moved to the staff, so the style is ___`,
      `Being trusted to decide is the non-financial method called ___`,
      `And it costs the firm nothing in wages, which puts it on Herzberg's ___ scale`,
    ],
    answers: ['democratic', 'delegation', 'second'],
    hints: ['which of the four styles moves the decision', 'the method that passes authority with a task', 'hygiene is the first one'],
    distractors: ['paternalistic', 'consultation', 'first'],
  },
  /*
   * ALL FOUR STYLES, AND THE WIDGET IS ON THE LAST OF THEM ON PURPOSE. Layer 6 found this match on
   * the PATERNALISTIC step, where two of its four answers named styles the section had not reached
   * yet. A recall that spans a group belongs on the group's last member.
   */
  'laissez-faire-leadership': {
    type: 'match',
    prompt: 'Match each leader to the style it is, by asking whether a goal was set and who chose the method:',
    pairs: [
      { left: 'Says the line must run 60 hours and leaves the pattern to the team', right: 'Laissez-faire — goal set, method theirs' },
      { left: 'Says nothing at all and is not seen for a fortnight', right: 'Absent — no goal was ever set' },
      { left: 'Sets the hours and the pattern and announces both', right: 'Autocratic — both decisions kept' },
      { left: 'Sets the hours, explains why, and adjusts for long journeys', right: 'Paternalistic — decision kept, staff weighed' },
    ],
    why: [
      'A goal exists and the method is the team’s, which is the whole definition of the style.',
      'With no objective there is nothing for the staff to organise around, and the two look identical until something goes wrong.',
      'Neither the objective nor the method left the leader, which is the autocratic case.',
      'The decision never moved, and the reasons and the staff’s position both entered it — explaining is not sharing.',
    ],
  },
  'entrepreneur-to-leader': {
    type: 'reorder',
    prompt: `Put the stages of Sabari's growth in order, from the founder doing every job to a firm of ${qty(O.headcount)} led through others:`,
    correctOrder: [
      'Four staff, and one person is doing all five jobs at once',
      'Strangers start being hired, and hiring them costs money',
      'There are more decisions in a week than one person can take',
      'A supervisor is obeyed because of the post, not the person',
    ],
    why: [
      'At four staff nothing has to be structured, because the founder is the structure — and this is the position everything else is a departure from.',
      'The first thing growth breaks is personal knowledge: a firm hiring strangers has to pay to find and assess them.',
      'Once there are more decisions than one person can take, they have to move — and they move to people who are still learning to take them.',
      'The transition is complete when the firm works because of the posts rather than because of the founder, which is the last thing to change and the hardest.',
    ],
  },
};

export const ATTACH_SLUGS = Object.keys(ATTACH);
for (const sec of SUBSECTIONS) {
  const slug = sec.id.replace(`${SECTION}:sub:`, '');
  if (sec.recall) continue;
  if (ATTACH[slug]) sec.recall = recall(sec.id, ATTACH[slug]);
}

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
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, CARRYING THE SAME FIGURES FROM THE SAME MODULE — so
 * the two surfaces cannot drift apart without the build failing. `depth.notes-titles` requires every
 * Notes title to be taught in Learn Mode, which holds by construction when the titles ARE the block
 * titles.
 *
 * AND A WARNING FOR VERIFY B: notes are a FREE surface and ship in the server-rendered page from the
 * `data` column, so a `?draft=1` walk shows these notes only after publication. Until then the page
 * shows the March headings beside this packet's Learn Mode (DECISIONS, 16 September). Verify the
 * notes against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '9 leaves',
    keyIdea: 'Asset or cost, the five forms of flexible workforce, dismissal against redundancy, and the two ways pay is agreed.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Staff as an asset</strong> — spending on people and expecting the spending back as productivity, quality and retention.'),
        def('<strong>Staff as a cost</strong> — buying labour as cheaply as the work allows and replacing people when they leave.'),
        def(`<strong>Flexible workforce</strong> — ${FLEXIBLE.map(([k]) => k.toLowerCase()).join(', ')}.`),
        def('<strong>Dismissal</strong> — the contract ends because of the PERSON: conduct or capability. The post remains.'),
        def('<strong>Redundancy</strong> — the contract ends because the POST has gone. Statutory redundancy pay is due.'),
        def('<strong>Collective bargaining</strong> — a union negotiating one agreement covering all its members.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Asset or cost turns on how long the job takes to learn: a leaver takes months of learning with them and takes a morning's with them.`),
        mech(`Part-time, temporary and zero-hour shift the same risk — that demand is low — in increasing amounts from the firm to the worker.`),
        mech(`Outsourcing turns a fixed wage bill into a variable one: ${qty(O.flat.workers)} machinists at ${money(O.workerSalary)} is ${money(O.flat.workers * O.workerSalary)} a year whether orders come or not.`),
        mech('The test for dismissal or redundancy is what the firm does next week: if the post is advertised, it was a dismissal.'),
        link(`Individual or collective follows from how alike the jobs are. ${qty(O.flat.workers)} identical machinists are described accurately by one agreement; a rare designer is not.`),
      ] },
    ],
    takeaway: [
      'Asset or cost is a strategy and the right answer depends on the job.',
      'Five forms of flexibility; only multi-skilling keeps the same hours and people.',
      'Dismissal is the PERSON, redundancy is the POST.',
    ],
  },
  {
    title: B2,
    meta: '5 leaves',
    keyIdea: `Internal against external recruitment, the ${money(R.total)} cost of filling one post, and the three types of training.`,
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Internal recruitment</strong> — filling a post from among the people already employed.'),
        def('<strong>External recruitment</strong> — filling it from the labour market, usually through advertising or an agency.'),
        ...TRAINING.map(([k, , full]) => def(`<strong>${k} training</strong> — ${full.charAt(0).toLowerCase()}${full.slice(1)}`)),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`One supervisor on ${money(R.salary)}: ${R.items.map((i) => `${i.short.toLowerCase()} ${money(i.amount)}`).join(', ')} — total ${money(R.total)}, which is ${pct(R.share)} of the salary.`),
        mech(`By stage: recruitment ${money(R.stages[0][1])}, selection ${money(R.stages[1][1])}, training ${money(R.stages[2][1])}.`),
        mech(`Internal recruitment saves the ${money(R.items[1].amount)} agency fee and MOVES the vacancy one level down rather than removing it.`),
        mech(`Induction is for three things: less time before the person is productive, fewer early mistakes, fewer early leavers.`),
        link(`On-the-job costs ${money(R.items[5].amount)} of lost output and produces no invoice; off-the-job costs a ${money(R.items[4].amount)} fee and does. The larger cost is the invisible one.`),
      ] },
    ],
    takeaway: [
      `One post costs ${money(R.total)} to fill — ${pct(R.share)} of the salary it pays.`,
      'Internal recruitment moves a vacancy down a level; it does not remove one.',
      'The biggest training cost is output nobody invoices for.',
    ],
  },
  {
    title: B3,
    meta: '8 leaves',
    keyIdea: `Hierarchy, chain of command, span of control, centralisation, and the three types of structure — with ${qty(O.headcount)} people drawn two ways.`,
    blocks: [
      { title: 'DEFINITIONS', items: [
        ...STRUCTURE_TERMS.map(([k, , full]) => def(`<strong>${k}</strong> — ${full.charAt(0).toLowerCase()}${full.slice(1)}`)),
        def(`<strong>${STRUCTURE_TYPES.join(', ')}</strong> — the three types of structure. A matrix lays a project across the functions, so somebody has two managers.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`A span of s over L levels reaches (s^L − 1) ÷ (s − 1) people. ${O.tall.formula} = ${qty(O.tall.headcount)} and ${O.flat.formula} = ${qty(O.flat.headcount)}.`),
        mech(`The chain of command is LINKS, one fewer than levels: ${qty(O.tall.levels)} levels give ${qty(O.tall.chain)} links, ${qty(O.flat.levels)} give ${qty(O.flat.chain)}.`),
        mech(`Tall: ${O.tall.sum} = ${qty(O.tall.headcount)}, ${qty(O.tall.managers)} managers and ${qty(O.tall.workers)} machinists, wage bill ${money(O.tall.wageBill)}.`),
        mech(`Flat: ${O.flat.sum} = ${qty(O.flat.headcount)}, ${qty(O.flat.managers)} managers and ${qty(O.flat.workers)} machinists, wage bill ${money(O.flat.wageBill)}.`),
        mech(`So flattening moves ${qty(O.postsMoved)} posts from supervising to making and saves ${money(O.wageSaving)} = ${qty(O.postsMoved)} × ${money(O.workerSalary)}, at unchanged headcount.`),
        link(`Tall or flat is one choice and centralised or decentralised is another: the chart shows the levels and says nothing about who decides.`),
      ] },
    ],
    takeaway: [
      'The chain of command is counted in LINKS, one fewer than levels.',
      `${qty(O.headcount)} people, span ${qty(O.tall.span)} or span ${qty(O.flat.span)}: same firm, ${qty(O.postsMoved)} posts moved.`,
      'Delayering removes levels, not people. It widens every remaining span.',
    ],
  },
  {
    title: B4,
    meta: '5 leaves',
    keyIdea: 'Why motivation matters to a business, and the four theorists the specification names.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        ...THEORISTS.map(([who, what]) => def(`<strong>${who}</strong> — ${what}.`)),
        def('<strong>Hygiene factor</strong> — something that can stop dissatisfaction and cannot cause satisfaction. Pay is one.'),
        def('<strong>Motivator</strong> — something that can cause satisfaction: achievement, recognition, the work itself, responsibility, advancement.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Motivation reaches the accounts four ways: productivity, retention, quality, absenteeism. Holding losses to ${qty(R.leaversAfter)} instead of ${qty(R.leaversBefore)} saves ${money(R.retentionSaving)}.`),
        mech('Taylor: money motivates, so study the job, standardise the method, train everybody in it and pay by the piece.'),
        mech('Mayo: output rose when conditions changed AND when they were changed back, so what mattered was the attention and the group.'),
        mech(`Maslow: ${MASLOW.map(([k]) => k.toLowerCase()).reverse().join(' → ')}. A level only motivates once the one below it is met.`),
        mech('Herzberg: TWO scales. Hygiene runs to "not dissatisfied"; only motivators reach satisfied, and all of them are properties of the work.'),
        link(`Which is why ${money(P.prpGain)} a week changes little and job enrichment costs nothing and changes a lot.`),
      ] },
    ],
    takeaway: [
      'Name the route: productivity, retention, quality or absenteeism.',
      '"Mayo proved money doesn\'t motivate" is false. He found the group matters too.',
      'Herzberg is TWO scales. Hygiene cannot reach satisfied.',
    ],
  },
  {
    title: B5,
    meta: '13 leaves',
    keyIdea: 'Five financial methods and eight non-financial ones, with one worker\'s pay worked out under each of the five.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>${FINANCIAL.join(', ')}</strong> — the five financial methods the specification names.`),
        def('<strong>Delegation</strong> — passing a task AND the authority to decide how it is done.'),
        def('<strong>Empowerment</strong> — a standing authority over how the work is done, within limits.'),
        def('<strong>Job enrichment</strong> — harder tasks and more responsibility. The only one of the three "job" methods that motivates.'),
        def('<strong>Job rotation / enlargement</strong> — different tasks / more tasks, both at the SAME difficulty.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`A standard week is ${qty(P.hours)} hours at ${money(P.rate)} = ${money(P.basic)}. Piecework (${qty(P.pieceUnits)} units at ${money(P.pieceRate)}) and commission (${pct(P.commissionRate)} of ${money(P.commissionSales)}) REPLACE that wage and are set to equal it; the bonus, the profit share and performance pay ADD to it.`),
        mech(`Piecework at ${qty(P.slowWeek)} units pays ${money(P.piece(P.slowWeek))} and at ${qty(P.fastWeek)} pays ${money(P.piece(P.fastWeek))}; commission at ${money(P.slowSales)} pays ${money(P.commission(P.slowSales))}. Both move the risk to the worker.`),
        mech(`Bonus: ${pct(P.bonusRate)} of the ${money(P.quarterBasic)} quarter is ${money(P.bonus)}, or ${money(P.bonusPerWeek)} a week — all-or-nothing on a target.`),
        mech(`Profit share: ${pct(P.shareRate)} of ${money(P.profit)} is ${money(P.pool)}, split ${qty(O.headcount)} ways = ${money(P.perHead)} each, and settled once a year.`),
        mech(`Performance pay: ${pct(P.prpUplift)} on ${money(P.rate)} gives ${money(P.prpRate)} an hour, ${money(P.prpWeek)} a week — permanent, and available where output cannot be counted.`),
        link(`Of the eight non-financial methods, delegation, consultation, empowerment and enrichment reach Herzberg's second scale. Rotation and enlargement do not.`),
      ] },
    ],
    takeaway: [
      `Piecework and commission replace the ${money(P.basic)} basic and equal it; the other three add to it.`,
      'Delegation passes the AUTHORITY. Without it, nothing has been delegated.',
      'Enrichment raises difficulty; rotation and enlargement do not.',
    ],
  },
  {
    title: B6,
    meta: '6 leaves',
    keyIdea: 'Management against leadership, the four styles, and why the move from entrepreneur to leader is hard.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Management</strong> — concerned with the work getting done. Authority comes from the post.'),
        def('<strong>Leadership</strong> — concerned with where the firm is going. Authority comes from the person.'),
        ...STYLES.map(([k, who, full]) => def(`<strong>${k}</strong> — ${who.toLowerCase()}: ${full.charAt(0).toLowerCase()}${full.slice(1)}.`)),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The four styles differ in ONE thing — who takes the decision — and run in that order from the leader alone to the staff alone.'),
        mech('Paternalistic still decides: the reasons are given and the staff\'s interests are weighed. Explaining a decision is not sharing it.'),
        mech('Laissez-faire sets the GOAL and leaves the method. A leader who sets no goal is absent, and the two look the same until something goes wrong.'),
        mech(`From entrepreneur to leader: at ${qty(O.headcount)} people staff must be recruited rather than known (${money(R.total)} a post), decisions must be delegated, and authority starts coming from the post.`),
        link('Which is the difficulty: the habits that built the firm — deciding fast, knowing everything personally — are the ones now in the way, and they have to go before anything has visibly failed.'),
      ] },
    ],
    takeaway: [
      'The four styles differ in who decides, and in nothing else.',
      'Paternalistic explains and still decides. Explaining is not sharing.',
      'The founder has to stop doing what made them successful.',
    ],
  },
];
