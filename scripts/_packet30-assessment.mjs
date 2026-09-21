/**
 * PACKET 30 — managing-people: quiz, practice, flashcards, common mistakes, extras.
 *
 * THE LIVE BANK IS 25 QUIZ ITEMS AND FIVE PRACTICE QUESTIONS, AND THE QUIZ IS THE PART OF THIS
 * SECTION WITH THE MOST FINDINGS AGAINST IT.
 *
 *   - `quiz-01`: Q1 is an EXACT duplicate of Q13 — same stem, same four options, same key — and the
 *     pre-test draws three items, so a student can be asked the same question twice in the first
 *     thing the section shows them. `topFix-02` names four more duplicate pairs: Q3/Q11, Q0/Q16,
 *     Q8/Q23 and Q6/Q10.
 *   - `quiz-03`: Q5 tests PATERNALISTIC leadership, which the section never teaches, and it is the
 *     inline quiz for the Leadership block — so the one question that chapter shows a student is
 *     about the one style it left out. Its stem also gives the answer away ("like a parent").
 *   - `quiz-02`: Q6 is ambiguous. It asks which need must be satisfied before esteem motivates, and
 *     safety is as defensible as the keyed answer, because BOTH levels sit below esteem.
 *   - `structure-01` and `topFix-02`: the block pins are `quizIndices [0],[1],[2],[3],[4],[5]` —
 *     the identity mapping — so chapter 1 shows a question about piece rates, chapter 2 one about
 *     Herzberg's hygiene factors, and chapter 6 shows Q5, the untaught one. Only two of six
 *     chapters get a question about their own topic.
 *
 * EVERY ITEM BELOW CARRIES A `block` TAG AND THE RUNNER DERIVES THE INDICES FROM IT, so a question
 * cannot be pinned to a chapter that does not teach it. The identity mapping is unrepresentable
 * rather than corrected. The three pre-test items come FIRST and unpinned, because `PreTest.jsx`
 * slices the unreserved pool at three, and all three are answerable from chapter 1 — which is the
 * pre-test fix at the root: the pool cannot contain an untaught item because it is drawn from the
 * section's opening chapter.
 *
 * EVERY EXPLANATION NAMES ITS OPTION BY CONTENT AND NEVER BY POSITION (packet 26). Items are
 * authored key-first, `placeKeys` deals the key into a slot and F074 shuffles again at render, so
 * "the second option" describes whatever happens to land there — and in packet 26 that meant six
 * explanations telling a student who got the item RIGHT why their answer was wrong.
 *
 * `topFix-05` ASKS FOR TWO THINGS AND ONE OF THEM IS REFUSED. It asks for the practice questions to
 * be rewritten to IAL format with "Define 2 marks, Explain 4, Analyse 6, Assess 10/12 and Evaluate
 * 20", which is right except that **this is Unit 1, so Assess is 10 and never 12** — the census has
 * 12 for Units 3/4 only. It then asks for "levels-based (L1-L4) guidance", which is a claim about
 * what a marker does and is banned from student-facing prose by this programme's `MARK_CLAIM` check
 * (packet 20 found "is levels-marked" shipped eight times). So every guidance below says what the
 * COMMAND WORD requires per Appendix 6, which is citable, and nothing about how a script is marked.
 *
 * EIGHT PRACTICE ITEMS, ONE PER BUSINESS COMMAND WORD, and `Construct (4)` is the one worth noting:
 * "requires students to draw an accurately labelled diagram". This programme had never used it
 * before packet 18 found it in the census, and an org chart with the chain of command and a span of
 * control marked is exactly what it asks for — so the section's one drawable diagram and its one
 * Construct question are the same artefact.
 */
import {
  id, hash8, money, qty, pct, round2,
  ORG, RECRUIT, PAY, FLEXIBLE, TRAINING, STRUCTURE_TERMS, THEORISTS, FINANCIAL, NON_FINANCIAL, STYLES, MASLOW, HERZBERG,
} from './_packet30-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet30-content.mjs';

const O = ORG, R = RECRUIT, P = PAY;

const qi = (block, question, options, explanation) => ({ id: id('quiz', question), block, question, options, explanation });

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST and the key is then DEALT into a position. Hand-picking
 * positions produces exactly the lumpy distribution `quiz.histogram` looks for; ranking items by a
 * hash of their own stem and taking the rank modulo four gives an even spread that is stable across
 * builds and that nobody had to choose.
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

export const QUIZ = placeKeys([
  /* ── the pre-test pool: three items, unpinned, FIRST in the array ──────── */
  /*
   * All three are answerable from chapter 1, which every student reaches before anything else, and
   * none tests a style, a theorist or a structure the section has not yet described. That is
   * `quiz-03` fixed at the root rather than by replacing one item: the pre-test's pool is the
   * section's opening chapter, so it cannot contain untaught material.
   */
  qi(null, 'A firm makes a machinist redundant rather than dismissing them. This means that:',
    ['the post itself is no longer needed', 'the machinist failed to reach the required standard', 'the machinist is entitled to notice but not to redundancy pay', 'the firm will advertise the same post again within the month'],
    'Redundancy is about the POST: the work has gone, so the job ceases to exist and statutory redundancy pay is due. Failing to reach a standard is a capability dismissal, which is about the person — and in that case the post remains and the firm does advertise it again.'),
  qi(null, 'Which of the following is a form of flexible workforce named in the specification?',
    ['Zero-hour contracts', 'Performance-related pay', 'Collective bargaining', 'A matrix structure'],
    `The five forms are ${FLEXIBLE.map(([k]) => k.toLowerCase()).join(', ')}. Performance-related pay is a financial method of improving performance, collective bargaining is a way of agreeing pay and conditions, and a matrix is a type of organisational structure.`),
  qi(null, 'A firm treats its staff as an asset rather than as a cost. The clearest sign of this is that it:',
    ['trains staff beyond what their current job requires', 'employs staff on contracts with no guaranteed hours', 'outsources work to whichever supplier quotes lowest', 'recruits externally so that it never pays for a promotion'],
    'Training beyond the immediate requirement is spending made in the expectation of a return — the defining move of the asset approach. Contracts with no guaranteed hours and outsourcing to the lowest quote are both ways of minimising the outlay, which is the cost approach.'),

  /* ── Block 1 · Approaches to staffing ─────────────────────────────────── */
  qi(B1, `A factory employs ${qty(O.flat.workers)} machinists at ${money(O.workerSalary)} each and is considering outsourcing the work instead. The main effect on its costs is that:`,
    [`a fixed cost of ${money(O.flat.workers * O.workerSalary)} a year becomes a cost that moves with output`, `the total cost of the work falls by ${money(O.flat.workers * O.workerSalary)} a year`, 'the firm loses the ability to vary its output at all', 'training costs rise, because the supplier\'s staff have to be trained by the factory before they can start'],
    `Outsourcing replaces a wage bill the firm owes whether orders come or not with an invoice per garment, so the cost becomes variable. Nothing says the total falls: outsourcing is cheaper only when output is low or uneven, and dearer when it is high and steady.`),
  qi(B1, 'Multi-skilling differs from job enlargement because multi-skilling:',
    ['gives one worker the capability to do several different jobs', 'adds more tasks of the same kind to a single job', 'pays a worker according to how many tasks they perform', 'guarantees a worker a minimum number of hours each week'],
    'Multi-skilling creates a capability the firm can draw on when it needs cover, so the worker can be moved between jobs. Adding more tasks of the same kind to one job is job enlargement, which changes the job rather than the range of jobs the person could do.'),
  qi(B1, 'Which situation is best answered by temporary contracts rather than by multi-skilling?',
    ['Demand triples for three months each year and then returns to normal', 'Shirt orders fall by exactly as much as jacket orders rise', 'One machine is idle whenever its usual operator is absent', 'Skilled machinists are leaving for better-paid work elsewhere'],
    'A known, time-limited increase in the total work is exactly what a fixed-term contract matches. Demand moving between products and cover for absence are both about the same people doing a different task, which is what multi-skilling is for.'),
  qi(B1, 'A firm negotiates one pay agreement with a union covering all its production staff. This is:',
    ['collective bargaining', 'the individual approach to employer relationships', 'a form of decentralisation', 'consultation as a non-financial method'],
    'One agreement negotiated by a union for all its members is collective bargaining. Consultation is asking staff before a decision the manager still takes, and decentralisation is about where in the hierarchy decisions are made, not about how pay is agreed.'),

  /* ── Block 2 · Recruitment, selection and training ────────────────────── */
  qi(B2, `Recruiting, selecting and training one supervisor on a ${money(R.salary)} salary costs a firm ${money(R.total)}. As a percentage of the salary, that is:`,
    [pct(R.share), pct(3), pct(60), pct(round2(100 * R.items[1].amount / R.salary))],
    `${money(R.total)} ÷ ${money(R.salary)} × 100 = ${pct(R.share)}. ${pct(round2(100 * R.items[1].amount / R.salary))} is the agency fee on its own, and ${pct(3)} would be the advertising bill alone.`),
  qi(B2, 'Which cost of replacing a worker usually appears on no invoice at all?',
    ['The output the new starter does not yet produce', 'The fee charged by a recruitment agency', 'The advertising placed in the trade press', 'The fee for an external training course'],
    `Lost output is a real cost that nobody bills the firm for, which is why turnover is routinely under-counted — here it is ${money(R.items[5].amount)}, the second largest item on the list. The agency fee, the advertising and the course fee all arrive as bills.`),
  qi(B2, 'A firm fills a supervisor\'s post internally. Which statement is correct?',
    ['A vacancy still has to be filled, one level further down', 'The firm has avoided recruiting altogether', 'Induction training is no longer needed at all', 'The post can be filled without any cost to the firm'],
    'Internal appointment MOVES the vacancy rather than removing it: the promoted machinist has left a gap the firm must now fill. Some induction is still needed for the new role, and the promotion itself takes management time.'),
  qi(B2, 'The main purpose of induction training is to:',
    ['reduce early mistakes and the time before a new starter is productive', 'teach a specialist technique that nobody in the firm currently uses', 'reward long service with a qualification the worker can take elsewhere', 'assess whether the new starter should have been appointed at all'],
    'Induction covers the job, the place, the people and the rules so that a new starter becomes safe and useful sooner and is less likely to leave in the first month. Teaching a technique nobody in the firm has is what off-the-job training is for.'),
  qi(B2, 'Off-the-job training is more likely than on-the-job training to be chosen when:',
    ['nobody already in the firm knows the technique being taught', 'the firm wants to avoid paying an external fee', 'output must not be interrupted for any reason', 'the work can only be learned by standing next to somebody who is already doing it'],
    'Off-the-job training buys expertise the firm does not have, which is the one thing on-the-job training cannot supply. Avoiding a fee and keeping output going both point the other way, and work that can only be learned by doing it is the definition of on-the-job.'),

  /* ── Block 3 · Organisational design ──────────────────────────────────── */
  qi(B3, `A firm has ${qty(O.tall.levels)} levels in its hierarchy. Its chain of command is:`,
    [`${qty(O.tall.chain)} links`, `${qty(O.tall.levels)} links`, `${qty(O.tall.levels + 1)} links`, `${qty(O.tall.span)} links`],
    `The chain of command counts the LINKS between levels, which is one fewer than the number of levels: ${qty(O.tall.levels)} levels give ${qty(O.tall.chain)} links. Counting ${qty(O.tall.levels)} counts the levels themselves, which is the commonest error in this sub-topic.`),
  qi(B3, `Each manager in a firm supervises ${qty(O.flat.span)} people, across ${qty(O.flat.levels)} levels. How many staff does the firm have?`,
    [qty(O.flat.headcount), qty(O.flat.span * O.flat.levels), qty(O.flat.workers), qty(O.totalFor(O.flat.span, O.flat.levels - 1))],
    `${O.flat.sum} = ${qty(O.flat.headcount)}, which is (${O.flat.span}^${O.flat.levels} − 1) ÷ ${O.flat.span - 1}. ${qty(O.flat.workers)} counts only the bottom level, and ${qty(O.totalFor(O.flat.span, O.flat.levels - 1))} is the same span over one level fewer.`),
  qi(B3, `A firm of ${qty(O.headcount)} staff moves from a span of control of ${qty(O.tall.span)} to a span of ${qty(O.flat.span)}, keeping every member of staff. The direct effect is that:`,
    [`${qty(O.postsMoved)} posts change from supervising to producing`, `${qty(O.postsMoved)} staff are made redundant`, 'the firm gains a level in its hierarchy', 'every manager supervises fewer people than before'],
    `The headcount is unchanged in both structures — ${O.tall.sum} and ${O.flat.sum} both give ${qty(O.headcount)} — so nobody leaves. What changes is that managers fall from ${qty(O.tall.managers)} to ${qty(O.flat.managers)}, and a wider span means each remaining manager supervises MORE people, not fewer.`),
  qi(B3, 'A firm is described as decentralised. This tells you that:',
    ['authority to take decisions has been passed down the hierarchy', 'the firm has removed a level from its hierarchy', 'each manager supervises a larger number of people', 'the firm operates from several different sites rather than from one head office'],
    'Decentralisation is about WHO DECIDES, and it is a separate choice from the shape of the chart: a flat firm can refer everything upward and a tall one can push authority down. Removing a level and widening spans are both facts about the hierarchy, not about the authority.'),
  qi(B3, 'The defining feature of a matrix structure is that:',
    ['a member of a project team reports to two managers', 'the firm has fewer levels than its competitors', 'every department decides its own budget', 'decisions are taken at the top and passed down'],
    'A matrix lays a project across the existing functions, so somebody on it answers to the project manager for the project and to their function head for everything else. Fewer levels describes a flat structure, and where budgets are decided is a question about centralisation.'),
  qi(B3, `Flattening a hierarchy is most likely to REDUCE motivation for a worker who:`,
    ['expects to be promoted within a few years', 'wants more say in how their own work is done', 'prefers decisions to be taken close to the problem', 'values being part of a team with a shared output'],
    `Removing levels removes promotions: a firm with ${qty(O.flat.levels)} levels offers ${qty(O.flat.levels - 1)} steps up rather than ${qty(O.tall.levels - 1)}. The other three are all things a flatter structure delivers more of, because ${qty(O.flat.managers)} managers cannot take every decision for ${qty(O.headcount)} people.`),

  /* ── Block 4 · Motivation in theory ───────────────────────────────────── */
  qi(B4, `A firm cuts the number of workers it has to replace each year from ${qty(R.leaversBefore)} to ${qty(R.leaversAfter)}, at ${money(R.total)} a replacement. Its annual saving is:`,
    [money(R.retentionSaving), money(R.total), money(R.annualBefore), money(R.total * 2)],
    `${qty(R.leaversBefore)} − ${qty(R.leaversAfter)} = ${qty(R.leaversBefore - R.leaversAfter)} replacements avoided, at ${money(R.total)} each, so ${money(R.retentionSaving)}. ${money(R.annualBefore)} is what the firm was spending in total rather than what it saves, and ${money(R.total)} is the cost of one replacement.`),
  qi(B4, "Taylor's scientific management rests on the claim that workers are motivated by:",
    ['pay', 'belonging to a group', 'recognition from their manager', 'the work itself being interesting'],
    'Taylor held that money is what motivates, which is why his method ends in a piece rate. Belonging is where Mayo and Maslow differ from him, and recognition and interesting work are Herzberg\'s motivators.'),
  qi(B4, "In Mayo's studies, output rose both when the working conditions were improved AND when the improvements were reversed. This suggests that what raised output was:",
    ['the attention the workers were given', 'the level of lighting in the workshop', 'the length of the rest breaks', 'the piece rate the workers were paid'],
    'Because output rose under both the change and its reversal, the conditions themselves cannot have been the cause — which left being noticed, consulted and treated as a group. This is why the claim that Mayo "proved money does not motivate" is wrong: he showed something else ALSO motivates.'),
  qi(B4, "According to Maslow, offering a worker the chance to redesign their own production line will motivate them only if:",
    ['their lower-level needs are already met', 'they are paid more for doing it', 'the firm also offers them a promotion', 'their manager uses a democratic style'],
    'The hierarchy is an order: a level only motivates once the one below it is met, so an opportunity aimed at the top level does nothing for somebody worried about pay or job security. Extra pay would address the bottom two levels and not this one.'),
  qi(B4, "Under Herzberg's two-factor theory, improving pay and working conditions will:",
    ['remove dissatisfaction without creating satisfaction', 'create satisfaction without removing dissatisfaction', 'create satisfaction and remove dissatisfaction together', 'have no effect on either satisfaction or dissatisfaction'],
    `Pay and working conditions are hygiene factors, and hygiene factors run from dissatisfied to NOT dissatisfied — satisfaction is on a separate scale reached only by motivators. Getting them wrong does real damage, which is why they have an effect at all.`),

  /* ── Block 5 · Motivation in practice ─────────────────────────────────── */
  qi(B5, `A machinist is paid ${money(P.pieceRate)} for each garment completed. In a week of ${qty(P.fastWeek)} garments the wage is:`,
    [money(P.piece(P.fastWeek)), money(P.basic), money(P.piece(P.slowWeek)), money(P.pieceRate * P.hours)],
    `${qty(P.fastWeek)} × ${money(P.pieceRate)} = ${money(P.piece(P.fastWeek))}. ${money(P.basic)} is what ${qty(P.pieceUnits)} garments would pay, which is also the basic weekly wage — the two are set equal so that the comparison is about risk rather than about generosity.`),
  qi(B5, `A firm distributes ${pct(P.shareRate)} of its ${money(P.profit)} profit equally among all ${qty(O.headcount)} employees. Each receives:`,
    [money(P.perHead), money(P.pool), money(P.basic), money(P.bonus)],
    `${pct(P.shareRate)} of ${money(P.profit)} is ${money(P.pool)}, and ${money(P.pool)} ÷ ${qty(O.headcount)} = ${money(P.perHead)}. ${money(P.pool)} is the whole pool before it is divided.`),
  qi(B5, 'Piecework and commission share which characteristic?',
    ['The worker carries the risk that demand is low', 'The payment is the same in every week', 'The payment depends on the whole firm\'s profit', 'The payment is decided by an annual appraisal'],
    'Both pay for output — units made or value sold — so in a bad week the worker\'s income falls with the work. A payment that depends on the firm\'s profit is a profit share, and one decided by an appraisal is performance-related pay.'),
  qi(B5, 'A supervisor gives a machinist the week\'s orders and leaves them to decide the sequence. This is:',
    ['delegation, because the authority moved with the task', 'consultation, because the machinist was asked', 'empowerment, because the machinist has a standing authority', 'an instruction, because the supervisor set the orders'],
    'Delegation passes a task AND the authority to decide how it is done, which is exactly what choosing the sequence is. Consultation would leave the decision with the supervisor, and empowerment is a general standing arrangement rather than one task.'),
  qi(B5, 'A packer who already packs boxes is also asked to label them. This is an example of:',
    ['job enlargement', 'job enrichment', 'job rotation', 'empowerment'],
    'Labelling is no harder than packing and carries no extra responsibility, so the job has become broader and not harder — which is enlargement. Enrichment would raise the difficulty and the responsibility, and rotation would move the packer to a different job.'),
  qi(B5, "Which non-financial method reaches a Herzberg motivator most directly?",
    ['Job enrichment, because it adds responsibility', 'Job rotation, because it relieves boredom', 'Job enlargement, because it adds tasks', 'Flexible hours, because they suit the worker better'],
    'Responsibility is one of Herzberg\'s five motivators, and enrichment adds it by changing what the job consists of. Rotation and enlargement both keep the difficulty and the responsibility the same, so neither reaches the second scale.'),
  qi(B5, `An appraisal raises a machinist's rate by ${pct(P.prpUplift)} from ${money(P.rate)} an hour. Over a ${qty(P.hours)}-hour week the pay rises to:`,
    [money(P.prpWeek), money(P.basic), money(P.prpRate), money(P.piece(P.fastWeek))],
    `${money(P.rate)} × 1.0${P.prpUplift} = ${money(P.prpRate)} an hour, and ${money(P.prpRate)} × ${qty(P.hours)} = ${money(P.prpWeek)}. ${money(P.prpRate)} is the new hourly rate rather than the week's pay, and ${money(P.basic)} is the pay before the appraisal.`),

  /* ── Block 6 · Leadership ─────────────────────────────────────────────── */
  qi(B6, 'A manager announces a new shift pattern, explains in full why it is necessary, and adjusts it for the staff with the longest journeys. This leadership style is:',
    ['paternalistic', 'democratic', 'autocratic', 'laissez-faire'],
    'The decision never left the manager, so it is not democratic — but the reasons were given and the staff\'s position changed the outcome, which is not autocratic either. Explaining a decision and weighing its effect on staff while still taking it alone is the paternalistic style.'),
  qi(B6, 'The four leadership styles in the specification differ from one another mainly in:',
    ['who takes the decision', 'how much the leader is paid', 'how many levels the hierarchy has', 'whether the firm is centralised'],
    'The four run in order from the leader deciding alone to the staff deciding within a goal, and that is the only dimension that separates them. Centralisation is about where in the hierarchy authority sits, which is a property of the firm rather than of the leader.'),
  qi(B6, 'An autocratic style is MOST appropriate when:',
    ['a decision must be taken immediately and staff are new to the work', 'the staff know the work better than the leader does', 'the firm wants to increase motivation without spending money', 'the team is made up of experienced specialists'],
    'Speed and inexperience are the two conditions the style is for: asking people who do not yet know the work costs time and adds nothing. Where staff know the work better, or are experienced specialists, a democratic or laissez-faire style produces a better decision as well as a more popular one.'),
  qi(B6, 'A leader tells a team the line must run 60 hours this week and leaves the pattern entirely to them. This is:',
    ['laissez-faire, because a goal was set and the method left to the team', 'abdication, because the leader took no part in the decision', 'democratic, because the leader and the team decided together', 'autocratic, because the leader set the hours'],
    'Setting the objective and leaving the method is the definition of laissez-faire; what separates it from absence is that a goal exists. The leader and the team did not decide together — the team decided alone, within a target it was given.'),
  qi(B6, 'The move from entrepreneur to leader is difficult mainly because:',
    ['the habits that built the firm become obstacles once it is larger', 'founders rarely understand the finances of a growing firm', 'a larger firm always needs a taller hierarchy than a smaller one', 'staff in a larger firm expect to be paid more than the founder'],
    'Deciding everything personally and knowing every worker are advantages at four staff and bottlenecks at thirty, so the founder has to stop doing the things that worked — before anything has visibly gone wrong. Whether the hierarchy grows taller is a separate choice about span of control.'),
]);

/* ══ Practice: eight items, eight command words, Unit 1 tariffs ═══════════ */

const pr = (block, command, marks, question, guidance) => ({ id: id('practice', question), block, command, marks, question, guidance });

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'redundancy'. (2 marks)",
    'Two marks means two separate things to say, and the second is not a rewording of the first. Before writing, settle which half of the term does the work: plenty of people lose jobs, and only some of them are made redundant. An example will not substitute for either half.\n'
    + 'Redundancy is the ending of a contract of employment because the POST is no longer needed (1 mark) — the work has gone, rather than the worker having failed — and it carries an entitlement to statutory redundancy pay (1 mark). An answer that says "when somebody loses their job" has neither half: it does not say what happened to the post, which is the whole distinction from dismissal.'),

  pr(B2, 'Calculate', 4, `A firm recruits a supervisor on a salary of ${money(R.salary)}, working ${qty(O.workingDays)} days a year. It pays ${money(R.items[0].amount)} to advertise the post, an agency fee of 15% of the salary, ${qty(20)} hours of managers' time at ${money(O.managerHour)} an hour, ${qty(5)} days of induction, a ${money(R.items[4].amount)} external course, and loses ${qty(10)} days of the new supervisor's output. Calculate the total cost of recruiting, selecting and training this one supervisor, and express it as a percentage of the salary. (4 marks)`,
    'Seven figures, and only two of them are already in dollars — the rest have to be worked out before anything can be added, so do those first and set the sum out as a list. Appendix 6 advises showing workings for a Calculate, and here the workings are where the credit is: a wrong total with visible arithmetic is worth more than a right one with none. Work out the daily rate before you start, because two of the items depend on it.\n'
    + `The supervisor's day rate is ${money(R.salary)} ÷ ${qty(O.workingDays)} = ${money(R.day)} (1 mark). The agency fee is 15% × ${money(R.salary)} = ${money(R.items[1].amount)}; managers' time is ${qty(20)} × ${money(O.managerHour)} = ${money(R.items[2].amount)}; induction is ${qty(5)} × ${money(R.day)} = ${money(R.items[3].amount)}; lost output is ${qty(10)} × ${money(R.day)} = ${money(R.items[5].amount)} (1 mark). Adding all six: ${R.items.map((i) => money(i.amount)).join(' + ')} = ${money(R.total)} (1 mark). As a percentage of salary, ${money(R.total)} ÷ ${money(R.salary)} × 100 = ${pct(R.share)} (1 mark). A common slip is to use the manager's hourly rate for the induction days as well; the induction is the supervisor's time, not a manager's.`),

  pr(B3, 'Construct', 4, `A clothing manufacturer has ${qty(O.headcount)} staff organised with a span of control of ${qty(O.flat.span)} across ${qty(O.flat.levels)} levels. Construct an organisational chart for this firm, labelling the span of control and the chain of command. (4 marks)`,
    'Appendix 6 defines Construct as requiring an accurately labelled diagram, so the labels are the command word rather than decoration on top of it. Work out the staff on each level before drawing anything, because a chart whose boxes do not add to the headcount is not the accurate diagram the command word asks for. Draw the levels first, then the joining lines, then the two labels.\n'
    + `One box at the top, ${qty(O.flat.span)} boxes on the second level and ${qty(O.flat.span * O.flat.span)} on the third, joined by lines from each manager to the people reporting to them (1 mark). The boxes add to ${O.flat.sum} = ${qty(O.flat.headcount)}, which should be stated on the chart (1 mark). The span of control is labelled on a manager as ${qty(O.flat.span)} direct reports (1 mark). The chain of command is marked as a route from the top box to a bottom one and labelled ${qty(O.flat.chain)} links — one fewer than the number of levels (1 mark). Labelling the chain as ${qty(O.flat.levels)} is the commonest error here, and it is the one thing on the chart the arithmetic settles.`),

  pr(B3, 'Explain', 4, `A clothing manufacturer with ${qty(O.headcount)} staff removes two levels from its hierarchy, keeping every member of staff. Explain one effect of this on the firm's wage bill. (4 marks)`,
    'An Explain needs a cause and its effect, supported by knowledge, so decide which single effect you are following and take it all the way. The trap here is the word "keeping": nobody leaves, so any answer that saves money by reducing headcount has answered a different question. Work out what happens to the two KINDS of post instead.\n'
    + `Removing levels while keeping the staff means the remaining managers each supervise more people, so the span of control widens (1 mark). Managers fall from ${qty(O.tall.managers)} to ${qty(O.flat.managers)}, so ${qty(O.postsMoved)} posts change from a manager's to a machinist's (1 mark). At ${money(O.managerSalary)} against ${money(O.workerSalary)}, each of those posts costs ${money(O.workerSalary)} less (1 mark), so the wage bill falls by ${qty(O.postsMoved)} × ${money(O.workerSalary)} = ${money(O.wageSaving)}, from ${money(O.tall.wageBill)} to ${money(O.flat.wageBill)} (1 mark). An answer that says the firm "saves on wages by employing fewer people" has missed that the headcount is unchanged.`),

  pr(B4, 'Analyse', 6, "Analyse how Herzberg's two-factor theory explains why a pay rise may fail to improve a workforce's performance. (6 marks)",
    'An Analyse wants depth rather than breadth, so take one chain all the way instead of describing both theorists and both scales. The chain has to get from what pay IS in Herzberg\'s terms to a prediction about performance, and the step students miss is the one that says why a scale can run out. Appendix 6 says Analyse does not include evaluation, so a judgement about whether the firm should pay more is not being asked for.\n'
    + 'Herzberg separates hygiene factors from motivators, and the two sit on separate scales rather than at the two ends of one (1 mark). Pay is a hygiene factor, so its scale runs from dissatisfied to NOT dissatisfied (1 mark). Once pay is adequate, the firm is already at the top of that scale, so a further rise has nowhere left to move the workforce (1 mark). Satisfaction is on the second scale, which only motivators reach — achievement, recognition, the work itself, responsibility and advancement (1 mark). None of those is affected by the size of the wage (1 mark), so effort and performance, which follow from the second scale, are unchanged (1 mark). A chain that stops at "pay does not motivate" has asserted the conclusion and skipped the two scales that produce it.'),

  pr(B5, 'Discuss', 8, `A clothing manufacturer pays its machinists a basic wage of ${money(P.basic)} a week and is considering moving them onto piecework at ${money(P.pieceRate)} a garment. Discuss the likely effects of this change. (8 marks)`,
    'Appendix 6 says a Discuss needs logical chains of reasoning IN CONTEXT showing causes and effects, with a brief assessment showing an awareness of competing arguments — so weighing the two sides in a sentence or two is required, and a full evaluation is not. Use the figures: they are what makes this a discussion of one firm rather than of piecework in general. Two chains taken properly will do more than four started.\n'
    + `At ${qty(P.pieceUnits)} garments the two systems pay the same ${money(P.basic)}, so this is a change in RISK rather than in average pay. A machinist producing ${qty(P.fastWeek)} earns ${money(P.piece(P.fastWeek))} and one producing ${qty(P.slowWeek)} earns ${money(P.piece(P.slowWeek))}, so output and income now move together and the incentive to produce more is direct. The firm's wage bill also becomes variable, falling in a week when orders are low.\n`
    + `Against that: piecework pays for quantity and not quality, so rejects are likely to rise and the firm may need inspection it did not need before — a cost that offsets the gain. The risk transferred to the machinist is real, and in a slow week caused by the firm's own order book rather than by the machinist's effort, the pay cut is not an incentive but a grievance. On Herzberg's reading, pay is a hygiene factor, so a system that makes pay less certain can create dissatisfaction while adding nothing to satisfaction. The conclusion the figures support is that piecework suits this firm if its orders are steady and quality is checked; where orders are uneven, it moves a risk the firm is better placed to carry onto the people least able to.`),

  pr(B6, 'Assess', 10, 'A founder whose clothing firm has grown from four staff to thirty-one still authorises every discount personally. Assess whether the firm should move to a democratic leadership style. (10 marks)',
    'Appendix 6 defines Assess as requiring a coherent chain of reasoning that considers the relative importance of factors and leads to a supported judgement — in Units 1 and 2 it carries 10 marks. The judgement is the part most answers leave out, and "it depends" is not one: say WHICH factor decides it and why. Plan two factors on each side and a decision before you write.\n'
    + 'For the move: at thirty-one staff one person cannot take every decision without becoming a bottleneck, and discounts in particular are decided fastest by whoever is talking to the customer. A democratic style also delivers the non-financial motivators the firm currently has no access to — consultation, delegation and the responsibility that comes with them — at no cost in wages. And the founder\'s authority currently comes from being the founder, which is not transferable; a firm that has never taken a decision without them cannot function when they are away.\n'
    + 'Against: a democratic style needs staff who know enough to decide, and staff who have never been allowed to authorise a discount have no practice at it. The first decisions will be worse than the founder\'s, and some will cost money. Speed also cuts both ways — consulting takes longer than deciding, and a customer waiting for an answer may not wait.\n'
    + 'The factor that decides it is TRAINING rather than style. The firm needs the authority moved, because thirty-one people cannot be run from one desk, but moving it to people who have not been prepared produces the bad decisions that will be used as evidence the move was wrong. So the judgement is: yes, and in stages — delegate discounts within a stated limit first, train against the decisions that come back, and widen the limit as the judgement improves. A straight switch of style with no limits and no training is the version of this that fails.'),

  pr(B5, 'Evaluate', 20, 'Evaluate the view that the most important factor in motivating a workforce is pay. (20 marks)',
    'Appendix 6 defines Evaluate as requiring fully developed, coherent and logical chains of reasoning showing a range of causes and effects, leading to a supported judgement. A 20-mark answer needs the theories used rather than described, the financial and non-financial methods weighed against each other, and a judgement that names the circumstances in which each side is right. Decide your line before you start and make every paragraph serve it.\n'
    + `The case FOR pay. Taylor\'s claim is that money is what motivates, and where output per person can be measured the evidence supports it: put a machinist on ${money(P.pieceRate)} a garment and output rises, because effort and income now move together. Maslow agrees about the bottom of the hierarchy — pay meets the physiological and safety levels, and nothing above them motivates until those are met, so a firm whose wages are inadequate cannot motivate anybody with responsibility or recognition. Pay is also the one method available to every job: a supervisor's output cannot be counted, but performance-related pay reaches them through an appraisal, adding ${money(P.prpGain)} a week to a machinist's ${money(P.basic)}.\n`
    + `The case AGAINST. Herzberg puts pay among the hygiene factors, which run only as far as NOT dissatisfied: once pay is adequate, more of it acts on a scale that has already run out, and satisfaction is reached only by achievement, recognition, the work itself, responsibility and advancement. Mayo found output rising when the only thing that changed was the attention workers were given. And the non-financial methods that reach Herzberg\'s second scale — delegation, consultation, empowerment, job enrichment — cost nothing in wages, which means a firm choosing pay as its instrument is choosing the expensive option as well as the weaker one. Pay also has side effects that work against performance: piecework pays for quantity and not quality, and a profit share of ${money(P.perHead)} settled once a year rewards nothing anybody does this week.\n`
    + 'The judgement. The question asks what is MOST important, and the honest answer is that pay is necessary and not sufficient, which is a different claim from either side of the view. Below adequacy pay dominates everything: a workforce worried about the rent is not motivated by responsibility, and no non-financial method will substitute. Above adequacy it is close to spent, and the methods that still have room to work are the ones that change the job. So the factor that decides which half of that answer applies is WHERE the workforce currently is — and a firm that has not asked that question will spend money on the wrong scale. The second thing the judgement has to name is the work itself: where output per person can be counted and is what the firm needs more of, pay-for-output is genuinely the strongest instrument available, and where it cannot be counted, pay reaches performance only through a judgement about the person, which is as good as the appraisal behind it and no better.'),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const card = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  card('What is the difference between treating staff as an asset and as a cost?', 'Asset: spend on training, development and retention and expect the spending back as productivity and quality. Cost: minimise the outlay and replace people when they go. Which is right depends on how long the job takes to learn.'),
  card('Name the five forms of flexible workforce.', `${FLEXIBLE.map(([k]) => k).join(', ')}. Only multi-skilling keeps the same hours and the same people; outsourcing removes the employment relationship altogether.`),
  card('What is the difference between dismissal and redundancy?', 'Dismissal is about the PERSON — conduct or capability — and the post remains, so it is advertised again. Redundancy is about the POST, which ceases to exist, and it carries statutory redundancy pay.'),
  card('What are the two approaches to employer/employee relationships?', 'The individual approach: terms agreed with each worker separately, which suits rare or differing skills. Collective bargaining: a union negotiating one agreement for all its members, which suits many similar jobs.'),
  card('What is the difference between internal and external recruitment?', `Internal fills the post from inside — no agency fee, shorter induction, and a vacancy MOVED one level down rather than removed. External fills it from the labour market, here at a ${money(R.items[1].amount)} agency fee plus ${money(R.items[3].amount)} of induction.`),
  card('What does it cost to recruit, select and train one supervisor?', `${money(R.total)} on a ${money(R.salary)} salary — ${pct(R.share)} of it. By stage: recruitment ${money(R.stages[0][1])}, selection ${money(R.stages[1][1])}, training ${money(R.stages[2][1])}. The ${money(R.items[5].amount)} of lost output is the second largest item and appears on no invoice.`),
  card('Name the three types of training and what each is.', TRAINING.map(([k, , full]) => `${k}: ${full.charAt(0).toLowerCase()}${full.slice(1)}`).join('. ')),
  card('What are the three purposes of induction training?', 'Less time before the new starter is productive; fewer early mistakes, which in a factory means accidents and scrap; and fewer people leaving in the first month, each of whom would cost a full recruitment bill to replace.'),
  card('Define hierarchy, chain of command and span of control.', STRUCTURE_TERMS.slice(0, 3).map(([k, , full]) => `${k}: ${full.charAt(0).toLowerCase()}${full.slice(1)}`).join('. ')),
  card('How many staff does a span of s over L levels reach?', `(s^L − 1) ÷ (s − 1). So ${O.tall.formula} = ${qty(O.tall.headcount)} and ${O.flat.formula} = ${qty(O.flat.headcount)} — the same firm, drawn two ways.`),
  card('How many links are there in the chain of command?', `One fewer than the number of levels. ${qty(O.tall.levels)} levels give ${qty(O.tall.chain)} links and ${qty(O.flat.levels)} give ${qty(O.flat.chain)}. Counting the levels themselves is the commonest error in this sub-topic.`),
  card('What changes when a firm flattens its hierarchy but keeps every member of staff?', `Managers fall from ${qty(O.tall.managers)} to ${qty(O.flat.managers)}, so ${qty(O.postsMoved)} posts move from supervising to producing and the wage bill falls ${money(O.wageSaving)}. Every remaining span WIDENS, and the promotions available fall from ${qty(O.tall.levels - 1)} to ${qty(O.flat.levels - 1)}.`),
  card('What is the difference between centralised and decentralised?', 'Centralised: decisions taken at the top and passed down as instructions. Decentralised: the authority to decide passed down the hierarchy. It is a SEPARATE choice from tall or flat — the chart shows the levels, not who decides.'),
  card('What defines a matrix structure?', 'A project laid across the existing functions, so somebody on the project reports to two managers: the project manager for the project and their function head for everything else. Its one real cost is two managers claiming the same hours.'),
  card('By what four routes does motivation reach a firm\'s accounts?', `Productivity, retention, quality and absenteeism. Retention has the clearest figure: holding losses to ${qty(R.leaversAfter)} instead of ${qty(R.leaversBefore)} saves ${money(R.retentionSaving)} a year.`),
  card('Name the four motivation theorists and their theories.', THEORISTS.map(([who, what]) => `${who} — ${what}`).join('; ') + '.'),
  card("What are the four steps of Taylor's scientific management?", 'Study the job to find the quickest method; write that method down as the standard; train every worker to follow it; pay by the amount produced. The piece rate comes last because it is the incentive to follow a method that has to exist first.'),
  card('What did Mayo find, and what does he NOT show?', 'Output rose when conditions were changed AND when the changes were reversed, so what mattered was the attention and the group. He does NOT show that money fails to motivate — he shows something else motivates as well.'),
  card("What are Maslow's five levels, bottom to top?", `${[...MASLOW].reverse().map(([k]) => k).join(' → ')}. The ORDER is the claim: a level only motivates once the one below it is met.`),
  card("What is Herzberg's two-factor theory?", `TWO separate scales. Hygiene factors (${HERZBERG.hygiene.join(', ').toLowerCase()}) run from dissatisfied to NOT dissatisfied. Motivators (${HERZBERG.motivators.join(', ').toLowerCase()}) are the only things that reach satisfied.`),
  card('Name the five financial methods of improving performance.', `${FINANCIAL.join(', ')}. Piecework and commission REPLACE the ${money(P.basic)} basic week and are set to equal it, so the comparison between them is about risk; the bonus, the profit share and performance pay ADD to a basic wage.`),
  card('What is the difference between piecework and commission?', `Piecework pays per unit MADE — ${money(P.pieceRate)} a garment here. Commission pays a share of what is SOLD — ${pct(P.commissionRate)} of sales. Both move the risk that demand is low onto the worker.`),
  card('What is the difference between a bonus and a profit share?', `A bonus is an extra payment for hitting a TARGET the firm set: ${pct(P.bonusRate)} of the quarter here, ${money(P.bonus)}. A profit share is a fraction of the profit — ${pct(P.shareRate)} of ${money(P.profit)}, ${money(P.perHead)} each — so it is zero when the profit is, whatever anybody achieved.`),
  card('What is performance-related pay and where does it work?', `An appraisal raises the RATE itself: ${money(P.rate)} to ${money(P.prpRate)} an hour, ${money(P.prpGain)} more a week, permanently. It is the only financial method available where output per person cannot be counted — a supervisor's, a designer's — and it is only as good as the appraisal.`),
  card('Name the eight non-financial methods of improving performance.', NON_FINANCIAL.map(([k]) => k).join(', ') + '.'),
  card('What is the difference between delegation, consultation and empowerment?', 'Delegation passes a task AND the authority to decide how it is done. Consultation asks before a decision the manager still takes. Empowerment is a standing authority over how the work is done, within limits — general where delegation is task by task.'),
  card('What is the difference between job enrichment, rotation and enlargement?', 'Enrichment adds DIFFICULTY and responsibility, so it reaches a Herzberg motivator. Rotation moves the worker between jobs at the same difficulty. Enlargement adds tasks at the same difficulty. Only the first can motivate.'),
  card('Why does flexible working appear twice in this topic?', 'Because the specification asks two different questions about it. Under approaches to staffing (1b) it is what flexible hours do for the FIRM: a wider recruitment pool and less premises. Under non-financial methods (4d) it is the CONTROL it gives the worker.'),
  card('What is the difference between management and leadership?', 'Management is concerned with the work getting done and its authority comes from the POST. Leadership is concerned with where the firm is going and its authority comes from the PERSON. It is not a rank, and one person usually does both.'),
  card('Name the four leadership styles and who decides under each.', STYLES.map(([k, who]) => `${k} — ${who.toLowerCase()}`).join('; ') + '. They differ in that one thing and in nothing else.'),
  card('How is paternalistic leadership different from autocratic?', 'The decision is still the leader\'s under both. Under a paternalistic style the reasons are GIVEN and the staff\'s interests are weighed in taking it. Explaining a decision is not sharing it, which is why it is not democratic either.'),
  card('What separates laissez-faire leadership from an absent leader?', 'A goal. Laissez-faire sets the objective and leaves the method to the staff; an absent leader sets nothing. The two look identical from a distance until something goes wrong.'),
  card('Why is the move from entrepreneur to leader difficult?', `At four staff the founder is the structure: they decide everything and know everyone. At ${qty(O.headcount)} staff must be recruited rather than known (${money(R.total)} a post), decisions must be delegated, and authority has to start coming from the POST. The habits that built the firm are the ones now in the way.`),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */
/*
 * THE LIVE SECTION HAS ZERO COMMON MISTAKES — `meta.mistakes` is 0, which is why the section index
 * records none — and `structure-07` judges the ones in the section's own prose: mostly real, two of
 * them filler. The two it names ("flat structures are always better because they are modern" and
 * "matrix structures cause confusion so they should be avoided") are not reproduced. The eight below
 * are one per chapter plus two for the chapters that carry the section's two hardest confusions:
 * dismissal against redundancy, and the three "job" methods.
 */
const mistake = (title, looksLike, why, instead) => ({ id: id('mistake', title), title, looks_like: looksLike, why, instead });

export const MISTAKES = [
  mistake('Using dismissal and redundancy as the same word',
    '"The firm dismissed forty workers because demand had fallen."',
    'Demand falling removes the POST, not the person, so this is redundancy — and the difference is not a matter of wording. A redundancy carries statutory redundancy pay and a dismissal carries notice, so the two have different consequences for the firm as well as for the worker.',
    'Ask what the firm does next week. If the post is being advertised again it was a dismissal; if it is not, the work has gone and it was a redundancy.'),
  mistake('Counting the chain of command in levels',
    `"The firm has ${qty(O.tall.levels)} levels, so its chain of command is ${qty(O.tall.levels)}."`,
    `The chain counts the LINKS between the levels, and the number of steps between ${qty(O.tall.levels)} points is ${qty(O.tall.chain)}. It is the commonest arithmetic slip in the sub-topic, and it shows up in a Construct as readily as in a Calculate.`,
    `Count the arrows, not the boxes: ${qty(O.tall.levels)} levels give ${qty(O.tall.chain)} links, and ${qty(O.flat.levels)} give ${qty(O.flat.chain)}.`),
  mistake('Saying that delayering cuts staff',
    `"Flattening the hierarchy let the firm reduce its workforce and save ${money(O.wageSaving)}."`,
    `The arithmetic says otherwise: ${O.tall.sum} and ${O.flat.sum} both come to ${qty(O.headcount)}, so the same people are in both charts. What changes is that ${qty(O.postsMoved)} of them stop supervising and start producing, and the saving is the difference in PAY between the two kinds of post.`,
    `Say what happened to the two kinds of post: managers fall from ${qty(O.tall.managers)} to ${qty(O.flat.managers)}, so ${qty(O.postsMoved)} × ${money(O.workerSalary)} = ${money(O.wageSaving)} comes off the wage bill at unchanged headcount.`),
  mistake('Treating a flat structure and a decentralised one as the same thing',
    '"The firm flattened its hierarchy, so decisions are now taken lower down."',
    `They are independent choices. A flat firm can refer everything upward — ${qty(O.flat.managers)} managers can still decide everything — and a tall one can push real authority down to the floor. The chart shows the levels and says nothing about who holds the authority.`,
    'Answer the two questions separately: how many levels are there, and who is allowed to decide? A question about one is not answered with the other.'),
  mistake('Writing that Mayo proved money does not motivate',
    '"Mayo showed that pay is irrelevant and only social factors matter."',
    'His studies changed the conditions and then reversed them, and output rose both times — which shows that attention and the group ALSO raise output. It says nothing about pay having no effect, and Taylor\'s piece-rate results are not overturned by it.',
    'Say what the studies showed: output rose under the change and under its reversal, so what mattered was being noticed and consulted. Herzberg is the theorist who separates pay from satisfaction, and his claim is narrower than "money does not motivate".'),
  mistake('Drawing Herzberg as one scale',
    '"Pay runs from dissatisfied at one end to satisfied at the other."',
    'The two-factor theory is TWO scales, and collapsing them into one loses the whole prediction. Hygiene factors run from dissatisfied to NOT dissatisfied; motivators run from not satisfied to satisfied. Drawing one axis describes Maslow\'s fourth level instead.',
    `Draw two lines. Hygiene: dissatisfied → not dissatisfied. Motivators: not satisfied → satisfied. Then say which scale the firm's proposal acts on — which is why ${money(P.prpGain)} a week and job enrichment have different effects.`),
  mistake('Calling job enlargement job enrichment',
    '"The packer was given labelling as well, which enriched the job."',
    'Labelling is no harder than packing and carries no extra responsibility, so the job is broader and not richer. Only enrichment raises the difficulty and the responsibility, which is what reaches a Herzberg motivator — and enlargement without either is often received as more work for the same pay.',
    'Ask whether the DIFFICULTY rose. Harder and more responsible is enrichment; more tasks at the same difficulty is enlargement; different tasks at the same difficulty is rotation.'),
  mistake('Treating paternalistic leadership as democratic',
    '"The manager explained the reasons to the staff, so the style was democratic."',
    'Explaining a decision is not sharing it. Under a paternalistic style the leader still decides — the reasons are given and the staff\'s interests are weighed in the deciding. A style is democratic only when the decision itself moves to the staff.',
    'Ask one question: who decided? If the answer is the leader, it is autocratic or paternalistic, and what separates those two is whether the reasons were given and the staff weighed.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * FIVE CHAINS AND TWO JUDGEMENT FRAMES. Every entry of `chains` carries `steps`, never `points`:
 * `ExtrasTab.jsx:29` renders every entry of `data.chains` and `:62` calls `chain.steps.map(...)`
 * with no guard, so a chain carrying `points` throws a TypeError and takes the whole tab down for a
 * Pro student. Packet 28's third chain does exactly that — it is V028, filed for the founder — and
 * `previewMode` slices the list to one chain, which is why no signed-out walkthrough has ever
 * reached it. The runner checks the shape of every chain below.
 *
 * TWO OF THESE CHAINS EXIST FOR THE REORDER RECALLS. `reorder.source` requires a reorder's sequence
 * to be taught, and with no `flow` bodies anywhere in this section the chains are the only source —
 * which is the point, because a chain lives in the Extras tab and is never printed above the widget.
 * Chain 1 teaches the four steps of scientific management and chain 5 the founder's transition.
 *
 * `structure-09` IS FIXED BY REMOVAL, NOT BY ADDITION. The live chain 3 teaches centralised against
 * decentralised structures, which is `3a`'s fourth bullet and belongs in the main content — so it is
 * now a subsection of chapter 3 and the chains below are about judgement and sequence instead.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How a firm applies scientific management, step by step',
      steps: [
        'A supervisor times each stage of sewing one garment and records how long the fastest worker takes over each of them.',
        'Comparing the timings shows that two of the six stages are done differently by different machinists, and one of the two ways is quicker.',
        'The quicker way is written down as the standard method, so that it exists independently of whoever discovered it.',
        'Every machinist is trained to follow the written standard, which is what makes the timing study worth anything.',
        `Only then does the piece rate go on: ${money(P.pieceRate)} a garment, so a machinist producing ${qty(P.fastWeek)} earns ${money(P.piece(P.fastWeek))} against ${money(P.basic)} at the standard ${qty(P.pieceUnits)}.`,
      ],
      result: `Output rises, because the method is better AND the pay now moves with it. What Taylor's sequence cannot supply is any reason for a machinist to care about the rejects, which is why a firm on piece rates ends up employing an inspector it did not need before.`,
    },
    {
      title: `Why one leaver costs ${money(R.total)} rather than an advertisement`,
      steps: [
        `A supervisor leaves. The post is still needed, so the firm advertises it: ${money(R.items[0].amount)}.`,
        `Nobody suitable applies directly, so an agency is used at 15% of the ${money(R.salary)} salary: ${money(R.items[1].amount)}.`,
        `Two managers spend ${qty(20)} hours between them shortlisting and interviewing, at ${money(O.managerHour)} an hour: ${money(R.items[2].amount)}.`,
        `The appointee's first ${qty(5)} days are induction — paid at ${money(R.day)} a day and producing nothing: ${money(R.items[3].amount)}.`,
        `They are sent on an external supervisory course: ${money(R.items[4].amount)}.`,
        `And for ${qty(10)} days they are learning the job rather than running it, at ${money(R.day)} a day: ${money(R.items[5].amount)}.`,
      ],
      result: `${money(R.total)}, which is ${pct(R.share)} of the salary the post pays — and the two largest items are the agency fee and the lost output, only one of which arrives as a bill. A firm losing ${qty(R.leaversBefore)} supervisors a year spends ${money(R.annualBefore)} getting back to where it started, which is the whole business case for treating staff as an asset.`,
    },
    {
      title: `The same ${qty(O.headcount)} people, reorganised`,
      steps: [
        `A span of control of ${qty(O.tall.span)} over ${qty(O.tall.levels)} levels: ${O.tall.sum} = ${qty(O.tall.headcount)} staff, a chain of ${qty(O.tall.chain)} links, and ${qty(O.tall.managers)} of the ${qty(O.headcount)} supervising.`,
        `Two levels are removed. Nobody leaves, so the remaining managers must each take on more people: the span widens from ${qty(O.tall.span)} to ${qty(O.flat.span)}.`,
        `${O.flat.sum} = ${qty(O.flat.headcount)}: the same firm, now ${qty(O.flat.managers)} managers and ${qty(O.flat.workers)} machinists.`,
        `${qty(O.postsMoved)} posts have changed from a manager's to a machinist's, so the wage bill falls from ${money(O.tall.wageBill)} to ${money(O.flat.wageBill)}.`,
        `The chain falls to ${qty(O.flat.chain)} links, so an instruction is retold twice instead of ${qty(O.tall.chain)} times and arrives closer to what was sent.`,
      ],
      result: `${money(O.wageSaving)} off the wage bill and a shorter chain, against spans of ${qty(O.flat.span)} instead of ${qty(O.tall.span)} and ${qty(O.flat.levels - 1)} promotions in the firm instead of ${qty(O.tall.levels - 1)}. Whether that trade is worth making depends on how much supervision the work needs and whether the staff expect to progress — which is why 3c is an evaluation question.`,
    },
    {
      title: 'What happens when a motivation method is aimed at the wrong level',
      steps: [
        'A firm\'s machinists are on temporary contracts that may not be renewed, and output is falling.',
        'The firm offers the best of them the chance to redesign the sewing line — an opportunity aimed at the top of Maslow\'s hierarchy.',
        'Nobody takes it, and the firm concludes that its staff are unambitious.',
        'On Maslow\'s reading, the second level is unmet: a job that may end next month is not a secure one, so nothing above safety motivates.',
        `The firm instead converts the contracts to permanent ones — which is a hygiene factor on Herzberg's reading, so it removes the dissatisfaction and adds no satisfaction.`,
        'With safety met, the same offer to redesign the line is now taken up, and it is a motivator because it is on the second scale.',
      ],
      result: 'The offer never changed; the level it was aimed at did. Which is the practical use of both theories at once: Maslow says which methods are wasted, and Herzberg says which of the ones that are left can actually produce satisfaction rather than merely remove a grievance.',
    },
    {
      title: 'From founder to leader, stage by stage',
      steps: [
        'With four staff the founder does every job: recruits, trains, decides, sells and leads. Nothing has to be structured, because the founder is the structure.',
        `Growth breaks personal knowledge first. New staff have to be recruited rather than known, which is where the ${money(R.total)} a post begins.`,
        `Then it breaks personal decision-making: at ${qty(O.headcount)} people there are more decisions in a week than one person can take, so they have to be passed to people the founder trained.`,
        'And the authority behind them has to change with them. A supervisor authorising a discount is obeyed because of the post, not because of who they are.',
      ],
      result: `The firm now works because of its posts rather than because of its founder — and that is the transition. What makes it hard is that the habits being given up are the ones that built the firm: deciding fast was an advantage at four staff and is a bottleneck at ${qty(O.headcount)}, and the founder has to accept worse decisions for a while, on the evidence of nothing having gone wrong yet.`,
    },
  ],
  /*
   * `evaluation` entries render as `{title, content}` with the content in one paragraph, which is why
   * these are prose rather than lists — and `reorder.source` only offers `chains[].steps` as a
   * candidate sequence, so neither of these can accidentally source a reorder. Correct, since
   * neither is an order.
   */
  evaluation: [
    {
      title: 'Choosing a motivation method for a particular firm',
      content: `Five questions, in this order, and the theories are the reason for the order. First: is pay adequate? Maslow puts the physiological and safety levels at the bottom and nothing above them motivates until they are met, so a firm whose wages or contracts are inadequate has only one thing to fix and every non-financial method will be wasted on it. Second: can output per person be counted? If it can, piecework or commission link effort to income directly — ${money(P.pieceRate)} a garment, or ${pct(P.commissionRate)} of sales — and if it cannot, the only financial method left is performance-related pay through an appraisal, which is as good as the appraisal and no better. Third: whose result does the firm actually care about? An individual measure rewards one person's output and a bonus or a profit share rewards the whole, so a firm that needs co-operation and pays per piece has priced the wrong thing. Fourth: is the problem dissatisfaction or the absence of satisfaction? Herzberg's separation makes this the sharpest question on the list, because the answer decides which scale to spend on, and the methods that reach the second scale — delegation, consultation, empowerment, job enrichment — cost nothing in wages. Fifth: can the structure deliver it? A firm with ${qty(O.flat.managers)} managers for ${qty(O.headcount)} people has to delegate and gets a motivator as a by-product; a tall, centralised one has to choose to, and often does not.`,
    },
    {
      title: 'Judging a structure: what the chart does and does not tell you',
      content: `An org chart answers three questions and is silent on two more, and most weak answers use it for the wrong ones. It tells you the number of LEVELS, and therefore the chain of command in links — one fewer than the levels, so ${qty(O.tall.levels)} levels give ${qty(O.tall.chain)}. It tells you the SPAN of control at each level, and the arithmetic ties the two together: (s^L − 1) ÷ (s − 1), which is how ${O.tall.formula} and ${O.flat.formula} both reach ${qty(O.headcount)}. And it tells you how many posts supervise and how many produce, which is the wage-bill question: ${qty(O.tall.managers)} managers against ${qty(O.flat.managers)} is ${money(O.wageSaving)} a year. What it does NOT tell you is who decides — centralisation is a separate choice, and two firms with identical charts can differ on every decision a supervisor is allowed to take. And it does not tell you whether the structure fits the WORK: a span of ${qty(O.flat.span)} is fine where the work is similar and goes wrong visibly, and too wide where it is varied, skilled or dangerous, and no chart records the difference. So an answer that judges a structure from its shape alone has used three of the five things it needed, and the two it left out are the ones that decide whether the shape is right.`,
    },
  ],
};
