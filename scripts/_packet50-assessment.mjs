/**
 * PACKET 50 — managing-change assessment: the quiz bank, the practice set, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK IS AUTHORED AGAINST THE FIVE CHAPTERS ─────────────────────────
 *
 * `structure-01`: 8 of the live 10 MCQs tested culture, Kotter & Schlesinger, leadership, succession
 * planning, business continuity, size and the costs of contingency planning, none of which content[]
 * taught. Every item below is tagged with the chapter that teaches it; the runner derives
 * `quizIndices` from the tag (`structure-08`) and refuses a quizzed term no subsection teaches.
 * `quiz-01` (q2, Kotter & Schlesinger's "last resort") is replaced by items on the approaches the
 * section teaches by what they do; `quiz-02` (q5, "inadequate business continuity planning" as a
 * risk, "MOST significant" with no case) is replaced by items that keep a risk and its mitigation
 * apart and give the case that "most" is judged against. Keys are written first and DEALT into a
 * position from a hash of the stem (packet 36); no explanation names an option by letter or position.
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * `DECISIONS.md` Settled, 26 Sep 2026: practice is shaped like the real paper for the topic's unit.
 * 3.3.6 is Unit 3 (WBS13): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and
 * Sections B and C are one 20-mark Evaluate essay each, from sources (`audit/raw/ial-paper-
 * structure.json`, business.units_3_4). So seven items on ONE source, `EXTRACT`.
 *
 *   - `topFix-05` clause by clause: (1) "Explain one reason ... (4)" — the Explain item asks for one;
 *     (2) "convert the 6-mark Analyse to an 8-mark Assess" — there is no 6-mark Analyse in this paper
 *     and no 8-mark Assess in Appendix 6 (Assess is 12 at Units 3/4); the paper's 8 is Discuss, so the
 *     Analyse became a Discuss 8; (3) "anchor the 10- and 20-mark stems to the bank / insurance
 *     company" — every stem names Harbourline, an insurer, and sits on its source; (4) "replace the
 *     off-specification crisis-management question with a succession-planning or business-continuity
 *     question" — an Assess 12 on the standby claims system (business continuity), and the source
 *     carries the succession gap for the Evaluate items to use.
 *   - The guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`,
 *     CONTENT-GATE step 6). Items above 6 marks carry levels naming knowledge, application, analysis
 *     and evaluation; items at 4 marks carry point allocations. Discuss never asks for a conclusion.
 */
import { id, hash8, FIRM, usd, usdm, units, pct } from './_packet50-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet50-content.mjs';

const F = FIRM;
const R = Object.fromEntries(F.risks.map((r) => [r.key, r]));

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

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
  /* ── the pre-test pool: three, unpinned, FIRST, answerable from chapter one ── */
  qi(null, 'A business changes the way it works because its profit has fallen for three years. This is:',
    ['an internal trigger', 'an external trigger', 'a natural disaster', 'a succession plan'],
    'Falling profit is poor business performance, which starts inside the firm itself. An external trigger comes from customers, rivals, technology or the law; a natural disaster is a key risk, and a succession plan is a way of mitigating the loss of key staff.'),
  qi(null, 'Which of these is a step change?',
    ['Moving all sales online and closing half the shops', 'Adding one new drink to a menu each season', 'Rewording a form after customer feedback', 'Shortening a delivery route by a few minutes'],
    'Moving all sales online and closing half the shops is one large, sudden shift in how the business works. The other three are small adjustments that build on what already exists, which is incremental change.'),
  qi(null, 'Productivity rises when a business:',
    ['produces more output per worker', 'employs more workers for the same output', 'raises the price of its product', 'closes its most profitable branch'],
    'Productivity is output per worker, so it rises when each worker produces more. More workers for the same output lowers it, and a higher price or a closed branch changes revenue, not output per worker.'),

  /* ── Chapter 1 · Why change happens and how fast ── */
  qi(B1, 'A new online rival is winning customers from an insurer that deals only face to face. For the insurer this is:',
    ['an external trigger for change', 'an internal trigger for change', 'an incremental change', 'a loss of key staff'],
    'The pressure comes from the market, a rival the insurer does not control, so it is an external trigger. Internal triggers start inside the firm, such as new owners or falling profit, and a trigger is the reason for a change rather than the change itself.'),
  qi(B1, 'A team of 40 handles 8,000 claims a month. After a change, 32 staff handle the same 8,000. Output per worker rises by:',
    ['25%', '20%', '8%', '80%'],
    'Output per worker is 8,000 ÷ 40 = 200 before and 8,000 ÷ 32 = 250 after. The rise is 50 on 200, which is 25%. Taking the fall in staff, 8 of 40, gives 20%, which measures the workforce and not productivity.'),
  qi(B1, 'Why do the costs of a change usually arrive before its gains?',
    ['New systems, training and redundancy are paid for before output improves', 'Rivals copy the change as soon as it is announced', 'Suppliers raise their prices once a change is announced', 'Wages rise automatically when a change is complete'],
    'Systems, training and redundancy pay are spent at the start, and output often dips while staff learn the new way of working. The gains in productivity and cost come later, if the change works; the other reasons do not follow from making a change.'),
  qi(B1, 'A step change is most likely to be justified when:',
    ['the trigger is urgent and the gap to close is large', 'the firm wants to keep cost and risk as low as it can', 'staff have asked for small improvements to one form', 'the market is stable and rivals are not changing'],
    'Step change costs more and meets more resistance, so it is worth it when small adjustments would take too long to close a large gap. Low cost and risk, small requested improvements and a stable market all point to incremental change.'),
  qi(B1, 'A firm installs a new system in every branch within one month. The most likely problem is that:',
    ['staff are untrained and errors reach customers', 'rivals move faster and win its customers', 'the change is too small to make a difference', 'the firm responds too slowly to its trigger'],
    'Rushing leaves no time to train staff or test the system, so mistakes reach customers and resistance hardens. Losing customers to faster rivals and responding too slowly are the risks of change that is too slow, and a change to every branch is not small.'),

  /* ── Chapter 2 · Culture, size and leadership ── */
  qi(B2, 'Which evidence suggests a firm\'s culture will make a new way of working harder to introduce?',
    ['Long-serving staff take pride in doing things the traditional way', 'Junior staff often suggest improvements that are adopted', 'Teams share what they learned from trials that failed', 'Managers consult staff before most decisions'],
    'Pride in the traditional way means people value routine, so a new method feels like a threat to doing the job properly. Adopting suggestions, learning from failed trials and consulting staff all describe a culture used to new ways of working.'),
  qi(B2, 'Why can a change take longer to carry through in a large organisation?',
    ['More layers and staff slow messages and decisions', 'It has less money to pay for new systems', 'Its owner knows each employee personally', 'It has fewer specialists to run the project'],
    'Each layer of management delays and rewords the message, and more people have to be persuaded and trained. A large firm usually has more money and specialists, not fewer, and an owner who knows each employee describes a small firm.'),
  qi(B2, 'A small firm may find a change harder than a large one when the change needs:',
    ['expensive equipment or specialist skills', 'a quick decision by the owner', 'the reasons explained face to face', 'agreement from a handful of staff'],
    'A small firm decides quickly and can explain a change directly, but it may not be able to pay for new equipment or outside expertise. A quick decision, face-to-face explanation and a handful of staff are all advantages of being small.'),
  qi(B2, 'A transformative leader is most likely to:',
    ['set out a vision and empower staff to reach it', 'keep the business running exactly as it is', 'make the big decisions alone and in private', 'rely on penalties to make staff comply'],
    'Transformative leadership changes an organisation: it sets a direction, explains why, and hands staff the authority to decide how. Running things as they are describes managing rather than transforming, and deciding alone or relying on penalties takes the involvement out of it.'),
  qi(B2, 'What is a limitation of a change that depends on one transformative leader?',
    ['It may stall if that leader leaves', 'It removes the need to explain the reasons', 'It makes staff less likely to trust anyone', 'It stops the firm from changing its culture'],
    'People follow a leader they trust, so a change carried by one person can lose momentum if that person goes. A transformative leader explains the reasons, builds trust, and can help a culture change over time.'),

  /* ── Chapter 3 · Managing resistance to change ── */
  qi(B3, 'Staff resist a new rota because they fear they will not cope with its software. The approach that best fits is:',
    ['support and training', 'imposing it with penalties', 'co-opting a leading critic', 'negotiating a pay deal'],
    'The worry is about skills, so giving staff the skills and time to use the software addresses its cause. Coercion forces the change without removing the fear, co-option suits a leading opponent, and negotiation suits a powerful group that loses something.'),
  qi(B3, 'Staff oppose a change because of a rumour that their office will close, which is untrue. The best response is:',
    ['communication and education', 'imposing it with penalties', 'negotiating a pay rise', 'co-opting a leading critic'],
    'The resistance rests on wrong information, so explaining the change accurately removes it. Coercion and negotiation deal with people who understand the change and still oppose it, and co-option brings a leading critic into the project.'),
  qi(B3, 'Which source of resistance may reveal a real flaw in a plan?',
    ['genuine disagreement with the change', 'fear of losing status', 'uncertainty caused by rumours', 'habit and comfort with old ways'],
    'People who object to the change itself may be right, which is why their resistance is worth hearing while the plan can still be fixed. Fear of losing status, uncertainty and habit say something about the people affected rather than about the plan.'),
  qi(B3, 'Coercion is usually kept as a last resort because it:',
    ['wins compliance but damages trust and goodwill', 'is the slowest of the six approaches', 'needs staff to help design the change', 'means paying staff to accept the change'],
    'Requiring a change is fast, but people who comply without agreeing put in less effort and trust managers less for the next change. It is not slow, it involves no one in the design, and paying staff to accept a change is negotiation.'),
  qi(B3, 'A group of specialists that nobody else can replace opposes a change. Managers are most likely to need to:',
    ['win them over or bargain with them', 'impose the change on them quickly', 'leave them out until the change is done', 'replace them with outside recruits'],
    'A group with the power to stop a change has to be persuaded, involved or offered something in return. Forcing them, excluding them or trying to replace people nobody else can replace all risk the change itself.'),

  /* ── Chapter 4 · Identifying key risks ── */
  qi(B4, 'Risk one scores likelihood 1 and impact 5. Risk two scores likelihood 3 and impact 2. Using likelihood × impact:',
    ['risk two ranks higher, scoring 6 against 5', 'risk one ranks higher, scoring 5 against 6', 'they rank equally, scoring 5 each', 'risk one ranks higher, scoring 10 against 6'],
    'Risk one scores 1 × 5 = 5 and risk two scores 3 × 2 = 6, so the more frequent, moderate risk ranks above the rare, severe one here. A business may still plan for the severe one if it would threaten the whole firm.'),
  qi(B4, 'Contingency planning differs from forecasting because it:',
    ['prepares for events that may not happen', 'predicts what sales will be next year', 'sets the budget for each department', 'ranks staff by their performance'],
    'A forecast says what is expected to happen; contingency planning asks "what if?" about events that are not expected but would do serious harm. Setting budgets and ranking staff are separate management tasks.'),
  qi(B4, 'Which of these is an IT systems failure?',
    ['A cyber attack locks the firm\'s customer records', 'A flood closes the firm\'s warehouse', 'The finance director resigns suddenly', 'A rival launches a cheaper product'],
    'A cyber attack stops the computer systems the business runs on, which is an IT systems failure. A flood is a natural disaster, a sudden resignation is a loss of key staff, and a cheaper rival is an external trigger for change rather than a key risk of this kind.'),
  qi(B4, 'Why is the loss of key staff a risk even when a retirement has been planned?',
    ['Knowledge that was never written down may leave too', 'The department they ran has to be closed', 'Their pay continues for a year after they go', 'Customers cannot be told who replaces them'],
    'A key person often holds knowledge or relationships nobody else has, and a planned departure still takes them away unless a successor has been prepared. Closing a department, paying a retired person and keeping a replacement secret do not follow from a retirement.'),
  qi(B4, 'A retailer closes its shops and moves all its sales online. Which key risk rises most?',
    ['IT systems failure', 'loss of key staff', 'a flood closing one shop', 'a drought cutting water supply'],
    'Once every sale goes through its website, a system that fails leaves customers no other way to buy. Closing the shops removes the risk of a flood closing one, and neither key staff nor water supply becomes more exposed because of the move.'),

  /* ── Chapter 5 · Mitigating risk ── */
  qi(B5, 'Succession planning mainly reduces the risk of:',
    ['a key role being left empty', 'a flood closing head office', 'the claims system failing', 'customers moving to a rival'],
    'Succession planning prepares people in advance to step into roles the business cannot do without, which is the answer to the loss of key staff. Floods and system failures are covered by business continuity, and losing customers to a rival is a trigger for change.'),
  qi(B5, 'A business continuity plan is designed to:',
    ['keep critical work going in a disruption', 'stop a natural disaster happening', 'forecast next year\'s sales', 'choose the next chief executive'],
    'Business continuity keeps the most important activities running while something is wrong and restores the rest quickly. No plan can stop a disaster, forecasting is a different task, and preparing the next chief executive is succession planning.'),
  qi(B5, 'A backup system costs $100,000 a year. An outage would cost $900,000 without it and $150,000 with it. In a year with one outage, the backup saves, net of its cost:',
    ['$650,000', '$750,000', '$800,000', '$900,000'],
    'The backup cuts the loss from $900,000 to $150,000, a saving of $750,000, and costs $100,000, so the net saving is $650,000. In a year with no outage, the same system is $100,000 spent on something that was not used.'),
  qi(B5, 'The case for a contingency plan is weakest when the risk is:',
    ['rare and its impact minor', 'likely and its impact severe', 'likely and cheap to guard against', 'rare but would close the business'],
    'A plan costs money and time, so it is least worth it for a risk that seldom happens and does little harm. A likely, severe risk, a cheap safeguard, or a loss the business could not survive all strengthen the case.'),
  qi(B5, 'What is the main reason for rehearsing a continuity plan before it is needed?',
    ['An untried plan often fails when it is needed', 'Rehearsal stops the disruption from happening', 'Rehearsal removes the need to back up data', 'Rehearsal lets staff skip other training'],
    'Testing shows whether the backups, standby systems and contact lists actually work before a real disruption. It does not prevent the disruption, and it depends on the backups rather than replacing them.'),
]);

/* ══ Practice ═══════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

/*
 * THE SOURCE. One extract carries every item, so a student meets the same firm seven times, and
 * `PracticeQuestionsTab.jsx` prints the shared opening once. Every figure the items need is here.
 */
export const EXTRACT = `Source A. ${F.full} is a ${F.home} insurer with ${units(F.staff)} staff, ${units(F.branches)} branches and ${F.layers} layers of management. Many of its claims handlers have worked there for decades and take pride in spotting false claims by talking to customers face to face. After two years of falling profit, and with a new online insurer winning customers who never visit a branch, the board appointed a new chief executive. She plans to move claims onto a phone app and close ${units(F.closing)} of the ${units(F.branches)} branches. At present ${units(F.handlersBefore)} handlers deal with ${units(F.claimsBefore)} claims a month; after the change, ${units(F.handlersAfter)} handlers are expected to deal with ${units(F.claimsAfter)}. Of the ${units(F.postsLost)} handler posts that go, ${units(F.retrained)} people will retrain as app-support staff and ${units(F.leaving)} will leave. The chief executive wants the change completed in ${F.fastMonths} months; the human resources director has proposed ${F.slowMonths}. The firm's risk register scores each risk from 1 to 5 for likelihood and for impact: ${F.risks.map((r) => `${r.name.toLowerCase()} (likelihood ${r.likelihood}, impact ${r.impact})`).join('; ')}. The chief actuary, who prices every policy, retires in ${F.actuaryRetiresMonths} months and has no deputy. Two years ago the claims system was down for ${F.daysNoPlan} days, and each day without it costs about ${usd(F.costPerDay)}. A standby system at a second data centre would restore it within ${F.daysWithPlan} day and would cost ${usd(F.standbyCost)} a year.`;

export const PRACTICE = [
  pr(B3, 'Explain', 4, `${EXTRACT} Explain one reason why claims handlers at ${F.name} may resist the change. (4 marks)`,
    'The question asks for ONE reason, so choose the one the source gives most evidence for and develop it rather than listing several. Say which group resists, what they expect to lose or do not know, and finish on what that means for the change.\n'
    + `Knowledge: a reason people resist change, such as expected loss, uncertainty or genuine disagreement (1 mark). Application: ${units(F.postsLost)} handler posts are going, or long-serving handlers take pride in spotting false claims face to face (1 mark). Analysis: handlers who expect to lose their job, or a skill the app takes over, have a personal reason to oppose it (1 mark). Analysis: so they may work slowly, refuse to help design the app, or leave, which delays the change (1 mark). A second reason earns nothing extra; developing one fully does.`),

  pr(B1, 'Calculate', 4, `${EXTRACT} Calculate the percentage change in the number of claims dealt with by each handler per month. (4 marks)`,
    'Work out claims per handler before and after the change separately, then compare them. Show each division on its own line, and state the change as a percentage of the figure before.\n'
    + `Before: ${units(F.claimsBefore)} ÷ ${units(F.handlersBefore)} = ${units(F.perHandlerBefore)} claims per handler (1 mark). After: ${units(F.claimsAfter)} ÷ ${units(F.handlersAfter)} = ${units(F.perHandlerAfter)} (1 mark). Change: ${units(F.perHandlerAfter - F.perHandlerBefore)} ÷ ${units(F.perHandlerBefore)} × 100 (1 mark) = ${pct(F.productivityRise)}, a rise (1 mark). An answer that divides by the figure after the change, or compares total claims, has not measured productivity.`),

  pr(B1, 'Discuss', 8, `${EXTRACT} Discuss whether ${F.name} should complete the change in ${F.fastMonths} months rather than ${F.slowMonths}. (8 marks)`,
    'Start from the trigger: how quickly are customers leaving, and what does that say about urgency? Then set the cost of being late against the cost of rushing for this firm in particular, using what the source says about its staff and systems. Leave space for a brief assessment of the balance.\n'
    + `Level 1: states that faster or slower change has advantages, with little use of the source. Level 2: knowledge and application — customers are moving to an online insurer and profit has fallen for two years, so delay costs business; but ${units(F.postsLost)} posts go, handlers are long-serving and proud of their face-to-face skill, and ${units(F.retrained)} people must be retrained. Level 3: analysis of both sides — ${F.fastMonths} months stops the loss of customers sooner, while leaving little time to train staff, test the app or explain the change, so errors reach customers and resistance hardens; ${F.slowMonths} months allows training and involvement, while more customers leave in the meantime. Level 4: a brief assessment weighing the two, for example that the answer depends on how fast customers are leaving and whether the app has been tested, and that a middle path such as starting in a few branches may reduce both risks. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B4, 'Assess', 12, `${EXTRACT} Assess which of the risks in Source A ${F.name} should give priority to in its contingency planning. (12 marks)`,
    'Use the scores the source gives, but do not stop at them. Rank the risks, then ask what each score leaves out — how the change alters each risk, and whether any risk could stop the business altogether. Decide before you write what your judgement will turn on.\n'
    + `Level 1: knowledge of risk assessment or of the three kinds of key risk, described generally. Level 2: application — ${F.risks.map((r) => `${r.name.toLowerCase()} scores ${r.likelihood} × ${r.impact} = ${r.score}`).join('; ')}, so the claims system ranks highest. Level 3: analysis — once branches close, a failed claims system leaves customers no other way to claim, and the last outage lasted ${F.daysNoPlan} days at about ${usd(F.costPerDay)} a day; the chief actuary retires in ${F.actuaryRetiresMonths} months with no deputy, so that risk is close to certain in timing and nobody else can price policies; a typhoon is likely but staff can work from home. Level 4: evaluation reaching a supported judgement, for example that the claims system comes first because the change itself raises its impact, with the actuary a close second because the retirement date is known and a successor takes time to prepare.\n`
    + 'A strong answer, in outline: the scores rank the claims system first; the move to an app makes that risk more serious, not less; the actuary\'s retirement is a known date with no successor, which the score understates; so the claims system comes first and succession planning for the actuary must start at once.'),

  pr(B5, 'Assess', 12, `${EXTRACT} Assess whether the standby claims system is worth its cost to ${F.name}. (12 marks)`,
    'Compare what the standby system costs with what it would save in an outage like the last one, then ask how often such an outage is likely. Bring in what the figures leave out, and finish with a judgement that says what it depends on.\n'
    + `Level 1: knowledge of business continuity or backup systems, described generally. Level 2: application — without the standby system an outage like the last one costs ${F.daysNoPlan} × ${usd(F.costPerDay)} = ${usdm(F.outageNoPlan)}; with it, recovery within ${F.daysWithPlan} day costs about ${usd(F.outageWithPlan)}, a saving of ${usdm(F.outageSaving)} against a cost of ${usd(F.standbyCost)} a year. Level 3: analysis — in a year with one outage the system more than pays for itself; in a year with none it is money spent on something unused; once branches close the claims system is the only way to claim, so the loss in customer trust is larger than the daily figure shows. Level 4: evaluation reaching a supported judgement, for example that the system is worth it because one outage every few years covers its cost and the change raises the impact of failure, provided it is tested.\n`
    + `A strong answer, in outline: one outage saves ${usdm(F.outageSaving)} against a yearly cost of ${usd(F.standbyCost)}; the app makes the business depend on the system entirely; so the standby system is worth it if outages happen at least every few years, and only if it is rehearsed so that it works when needed.`),

  pr(B2, 'Evaluate', 20, `${EXTRACT} Evaluate whether the new chief executive's leadership is the most important factor in the success of the change at ${F.name}. (20 marks)`,
    'Weigh leadership against the other key factors in change the source gives evidence for — the culture, the size of the organisation, and the time allowed — rather than writing about leadership alone. Decide what "most important" will depend on, and end with a recommendation that says what would change it.\n'
    + `Level 1: describes leadership or other factors in change with little reference to the source. Level 2: knowledge and application — a transformative leader sets a vision and empowers staff; the source shows a culture of long-serving handlers proud of face-to-face checks, ${units(F.staff)} staff across ${F.layers} layers, and a ${F.fastMonths}-month timetable. Level 3: analysis — leadership that explains why customers are leaving and involves handlers in designing fraud checks can win support; but the culture values the old skill, a message passing down ${F.layers} layers is slow and distorted, and a short timetable leaves little time to train and explain; a change carried by one person may stall if she leaves. Level 4: evaluation — judges which factor matters most for this firm, for example that leadership matters most because it is the one factor that can shape the others (explaining, involving, setting the pace), while the culture is the biggest obstacle; the recommendation states the condition that would change it.\n`
    + 'A strong answer, in outline: leadership can set the vision and involve staff; the culture and the size of the firm are the obstacles leadership has to overcome; speed decides whether there is time to do so; so leadership is the most important factor only if the chief executive allows enough time and involves the handlers, and a successor is identified in case she leaves.'),

  pr(B3, 'Evaluate', 20, `${EXTRACT} Evaluate how ${F.name} should manage resistance to the change from its claims handlers. (20 marks)`,
    'Identify the causes of resistance the source gives evidence for, because each approach suits a different cause. Then weigh the approaches against the time available and the power the handlers have, and recommend a combination rather than a single answer.\n'
    + `Level 1: describes ways of reducing resistance in general terms. Level 2: knowledge and application — ${units(F.postsLost)} posts go (expected loss), handlers are proud of face-to-face fraud checks (loss of a valued skill, and perhaps a genuine objection), and the timetable is ${F.fastMonths} months. Level 3: analysis — communication explains why customers are leaving; involvement lets handlers design the app's fraud checks, using what they know; retraining ${units(F.retrained)} people as app-support staff and supporting the ${units(F.leaving)} who leave addresses the loss; coercion is quick but damages trust that the next change will need. Level 4: evaluation — judges the best combination for this firm, for example that involvement matters most because the handlers' objection may be right, supported by retraining and honest communication, with coercion kept for the last few if the timetable forces it; the recommendation states what would change it.\n`
    + 'A strong answer, in outline: the causes are job loss and a threatened skill; communication and retraining address the first, involvement the second; coercion is fast but costly in goodwill; so recommend involvement plus retraining, which needs more than a six-month timetable, and use coercion only as a last resort.'),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is a trigger for change?', 'The event or pressure that starts a change. Internal triggers come from inside the firm; external triggers come from the market and the wider environment.'),
  fc('Name four internal triggers for change.', 'New ownership; poor business performance; a change in organisational size; a new leader.'),
  fc('Name four external triggers for change.', 'Customers wanting to buy in a new way; a rival\'s product; new technology; a change in the law or the economy.'),
  fc('What are the effects of change to consider?', 'Productivity, competitiveness, financial performance and the effect on each group of stakeholders.'),
  fc('Why does profit often dip before it rises after a change?', 'Systems, training and redundancy are paid for first, and output can fall while staff learn; the gains come later, if the change works.'),
  fc('Incremental change or step change?', 'Incremental change is a series of small, gradual adjustments. Step change is a large, sudden shift in what the business does or how it does it.'),
  fc('Why does the speed of change matter?', 'Too slow and customers or rivals move first; too fast and staff are untrained, systems untested and resistance hardens.'),
  fc('What is organisational culture?', 'The shared values, beliefs and habits of the people in a business: "the way things are done here".'),
  fc('How does culture affect change?', 'A change that fits the culture is carried along by it; one that clashes with it is resisted by people who think they are doing their jobs properly.'),
  fc('How does the size of an organisation affect change?', 'More layers, sites and staff slow messages and decisions, but a large firm has the money and specialists to fund the change.'),
  fc('What is transformative leadership?', 'Leadership that changes an organisation: setting out a vision, explaining why change is needed, inspiring staff and empowering them to deliver it.'),
  fc('What is a limitation of transformative leadership?', 'A change carried by one person can stall if that person leaves, and a confident leader with the wrong vision leads the firm the wrong way.'),
  fc('What are the three sources of resistance to change?', 'Expected loss (job, pay, status, skills); uncertainty about what the change means; genuine disagreement with the change.'),
  fc('Name the six approaches to managing resistance.', 'Communication and education; involvement; support and training; negotiation; co-option; coercion.'),
  fc('What decides which approach to resistance to use?', 'The cause of the resistance, how much time there is, and how much power the resisters have.'),
  fc('Why is coercion a last resort?', 'It is fast, but people who comply without agreeing lose trust and goodwill, which the next change will need.'),
  fc('What is contingency planning?', 'Preparing in advance for events that may not happen but would do serious harm if they did.'),
  fc('How are key risks identified?', 'Through risk assessment: list the risks, score each for likelihood and impact, multiply, rank, and plan for the highest first.'),
  fc('What are the three key risks to know?', 'Natural disasters; IT systems failure; loss of key staff.'),
  fc('What is IT systems failure?', 'The loss of the computer systems a business runs on, from a fault, a power cut or a cyber attack; it can stop trading and lose data.'),
  fc('Who counts as key staff?', 'Anyone the business depends on and cannot easily replace: a founder, a senior manager, a specialist, or the holder of key customer relationships.'),
  fc('What is risk mitigation?', 'Reducing the chance of harm, or the harm done if the event happens. Business continuity and succession planning are two ways.'),
  fc('What does a business continuity plan cover?', 'Critical activities and how fast to restore them; backups and standby systems; alternative ways of working; communication; testing.'),
  fc('What is succession planning?', 'Deciding in advance who could take over each critical role, and preparing them through training, mentoring and deputising.'),
  fc('When is a contingency plan most worth its cost?', 'When the risk is likely or its impact severe, the measure is cheap compared with the loss, or the business could not survive the loss.'),
];

/* ══ Common mistakes — the fields MistakesTab.jsx reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Treating resistance as irrational',
    'Writing that staff resist change because they are stubborn, and recommending that managers push harder.',
    'Resistance usually has a cause: an expected loss, uncertainty, or a genuine objection that may be right. The response has to fit the cause.',
    'Name the cause of resistance for the group in the case before recommending how to manage it.'),
  mk('Recommending one approach to resistance for every case',
    'Answering that "communication" is the way to overcome resistance, whatever the situation.',
    'Communication fixes misunderstanding; it does nothing for someone who understands they will lose their job. Most changes need a combination of approaches.',
    'Justify each approach by the cause of resistance, the time available and the power of the people resisting.'),
  mk('Treating speed as a strength in itself',
    'Praising a change for being completed quickly without asking what the speed cost.',
    'A fast change stops the loss to rivals sooner but leaves little time to train, test and explain, so errors and resistance rise.',
    'Weigh the cost of being late against the cost of rushing, using the trigger in the case to judge urgency.'),
  mk('Mixing up a risk and its mitigation',
    'Listing "poor business continuity planning" as one of the key risks a firm faces.',
    'The key risks are events: natural disasters, IT systems failure, loss of key staff. Business continuity and succession planning are the responses to them.',
    'Keep the two apart: identify the risk first, then the plan that mitigates it.'),
  mk('Ranking risks by likelihood alone',
    'Saying the most frequent risk must be the one to plan for first.',
    'Risk assessment combines likelihood with impact. A rare event that would stop the business can outrank a frequent one that does little harm.',
    'Multiply or combine the two scores the case gives, then say what the scores leave out.'),
  mk('Assuming every contingency plan is worth having',
    'Recommending that a firm plan for every risk it can think of.',
    'Plans cost money and time for events that may never happen, so the effort should match the likelihood and impact of each risk.',
    'Compare the cost of the measure with the loss it prevents, then qualify it: how likely is the loss?'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The three chains below are what the three reorders drill (`reorder.source` finds a sequence the
 * section teaches in a flow or an extras chain, in the same order). They sit on the Extras tab, not
 * on the recall's own step, so the recall is not answerable by scrolling up.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a trigger to the long-run result of a change',
      steps: [
        'A trigger arrives: new owners, falling profit, or a rival with a better product.',
        'Managers decide on a change and announce it.',
        'Costs rise and service may suffer while staff learn the new way of working.',
        'If the change works, each worker produces more and the business becomes cheaper to run.',
      ],
      result: 'Judge a change over time: its costs come first and its gains later.',
    },
    {
      title: 'Identifying key risks through risk assessment',
      steps: [
        'List every event that could stop the business operating.',
        'Score each event for likelihood and for impact.',
        'Rank the events by their combined score.',
        'Plan responses to the highest-ranked risks first.',
      ],
      result: `At ${F.name}: ${F.risks.map((r) => `${r.name.toLowerCase()} ${r.score}`).join(', ')}.`,
    },
    {
      title: 'How a succession plan is built',
      steps: [
        'Decide which roles the business could least afford to lose.',
        'Pick out people inside the business who could step into each role.',
        'Train and mentor them, and let them deputise in the role.',
        'Hand the role over when the post-holder leaves or retires.',
      ],
      result: 'A successor prepared in advance turns the loss of a key person from a crisis into a handover.',
    },
  ],
  evaluation: [
    {
      title: 'Fast or gradual change?',
      content: `Speed is a trade. ${F.name}'s chief executive wants the change done in ${F.fastMonths} months; the human resources director proposes ${F.slowMonths}. Faster change stops customers leaving for the online rival sooner. Slower change gives time to train ${units(F.retrained)} people, test the app and involve handlers in designing it, which reduces errors and resistance. The deciding question is how fast the trigger is moving compared with how fast the business can safely change. Starting in a few branches can buy some of both.`,
    },
    {
      title: 'Which key factor matters most?',
      content: 'Culture, size, speed, resistance and leadership all shape whether a change succeeds, and they interact. A strong culture that values the old way makes resistance deeper; a large organisation makes communication slower; a short timetable leaves less room for either to be addressed. Leadership is often the factor that can act on the others, by explaining, involving and setting a realistic pace, which is why a strong answer judges it against the others rather than in isolation.',
    },
    {
      title: 'Is contingency planning worth what it costs?',
      content: `A plan is paid for now, against a loss that may never come. ${F.name}'s standby claims system costs ${usd(F.standbyCost)} a year and would cut an outage like the last one from ${usdm(F.outageNoPlan)} to ${usd(F.outageWithPlan)}. That is worth it if such outages happen every few years and the business could not do without the system; it is less clear for a rare, minor risk. A plan that has never been rehearsed may fail when it is needed, so part of its cost is testing it.`,
    },
  ],
};
