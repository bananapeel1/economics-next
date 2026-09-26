/**
 * PACKET 50 — managing-change teaching content: five chapters, fifteen subsections, one step each,
 * one recall per subsection.
 *
 * WHAT THE LIVE SECTION TAUGHT. Two chapters, four subsections: incremental against "disruptive"
 * change, Shell-style scenario planning, why people resist, and Kotter's eight steps with Lewin's
 * force field. Measured against `bus_spec.txt:1255-1271`: resistance (1d) is the one leaf it
 * taught; Kotter, Lewin and scenario planning are 0 hits; the quiz and flashcards tested culture,
 * size, leadership, business continuity and succession planning, none of which content[] taught
 * (`structure-01`). So nothing survives as a subsection except the subject of 1d, rewritten.
 *
 * THE CHAPTERS. The specification has two sub-topics. Sub-topic 1 has five leaves, and sub-topic 2
 * has two requirements carrying five named risks and responses, so each requirement gets a chapter:
 *
 *   1 Triggers, Effects and Speed of Change the unit description's causes and effects (`:1055`),
 *                                           then 1c, time/speed of change
 *   2 Culture, Size and Leadership           1a, 1b, 1e
 *   3 Managing Resistance to Change          1d
 *   4 Contingency Planning: Identifying Key Risks      2a
 *   5 Contingency Planning: Mitigating Risk             2b, and judging whether a plan is worth it
 *
 * `structure-04` proposed four blocks including "Managing resistance (K&S strategies + Lewin +
 * Kotter)". The three named models are 0 hits; the APPROACHES to reducing resistance are what 1d
 * asks a student to be able to discuss, and they are taught here without an author's name.
 *
 * ONE NAME PER IDEA (`accuracy-01`, `structure-09`, `topFix-03`): "incremental change" and "step
 * change", everywhere. "Transformational" is not used at all, so the type of change cannot be
 * confused with the leaf's own "transformative leadership". A disruptive technology is an external
 * TRIGGER a firm responds to, never a kind of change it "uses".
 */
import {
  SECTION, subId, id, FIRM, usd, usdm, units, pct,
} from './_packet50-util.mjs';

const F = FIRM;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const flow = (resultType, steps, result) => ({ type: 'flow', resultType, steps: steps.map(([title, subtitle]) => ({ title, subtitle })), result });

export const B1 = 'Triggers, Effects and Speed of Change';
export const B2 = 'Culture, Size and Leadership';
export const B3 = 'Managing Resistance to Change';
export const B4 = 'Contingency Planning: Identifying Key Risks';
export const B5 = 'Contingency Planning: Mitigating Risk';

/* ══ Chapter 1 — Triggers, effects and speed of change (unit description :1055; 3.3.6 · 1c) ══ */

const triggers = sub('what-triggers-change', {
  title: 'What Triggers Change',
  keyIdea: 'Change starts with a trigger: something inside the business, such as new owners or falling profit, or something outside it, such as customers, rivals or technology.',
  body: [
    p(`Something **triggers** every change, and naming the trigger explains why the change is happening and how urgent it is.`),
    p(`**Internal triggers** come from inside the business. **New ownership**: a buyer who has paid for a firm wants a return and often brings its own plans. **Poor business performance**: falling sales, profit or market share force managers to act. **A change in organisational size**: a firm that has grown needs more layers, systems and specialists than it did when it was small. **A new leader**: a chief executive appointed to turn a business round usually arrives with a plan to do exactly that.`),
    p(`**External triggers** come from the market and the wider environment: customers who want to buy in a new way, a rival with a cheaper product, a new technology, a change in the law, or a downturn in the economy. A **disruptive technology** that makes the old way of doing business obsolete is an external trigger the firm must respond to, not a choice it made.`),
    p(`${F.full} in ${F.home} has ${units(F.staff)} staff and ${units(F.branches)} branches. Its new chief executive, appointed after two years of falling profit, plans to move claims onto a phone app and close ${F.closing} branches, because a new online insurer is winning customers who never visit a branch.`),
  ],
  realExample: { emoji: '📱', text: `${F.name}'s change has three triggers at once: poor performance (two years of falling profit), a new leader, and an external one — customers switching to an insurer they deal with only through an app.` },
  misconception: 'Students treat every change as a free choice by managers. Most change is a response to a trigger the firm did not choose, which is why a firm that ignores the trigger can lose far more than one that changes too early.',
  examMatters: 'Identify the trigger in the case before discussing the change. The trigger tells you how urgent the change is, and urgency is what decides how fast it can sensibly be made.',
  recall: {
    type: 'classify',
    prompt: 'Sort each trigger by where it comes from: inside the business or outside it.',
    groups: [
      { name: 'Internal trigger', items: ['A family firm is bought by a private investor', 'Profit has fallen for three years in a row', 'A bakery that now runs 40 shops still has one manager'], why: 'Each starts with the firm itself: its owners, its results or its own growth.' },
      { name: 'External trigger', items: ['A new law bans single-use plastic bags', 'A rival launches an app that books appointments in seconds', 'Customers start paying by phone instead of in cash'], why: 'Each starts in the market or the wider environment, which the firm does not control.' },
    ],
  },
});

const effects = sub('effects-of-change', {
  title: 'The Effects of Change',
  keyIdea: 'Change is made to improve productivity, competitiveness and financial performance, but it affects every stakeholder, and the costs usually arrive before the gains.',
  body: [
    p(`The point of change is its effect. Four are worth separating.`),
    p(`**Productivity.** ${F.name} has ${units(F.handlersBefore)} claims handlers dealing with ${units(F.claimsBefore)} claims a month, ${units(F.perHandlerBefore)} each. With the app doing the form-filling, ${units(F.handlersAfter)} handlers are expected to deal with ${units(F.claimsAfter)} claims, ${units(F.perHandlerAfter)} each — a rise of a third.`),
    p(`**Competitiveness.** Faster claims and lower costs let the firm match the online insurer on price and service. **Financial performance.** Closing ${F.closing} branches cuts rent and staff costs, but the app, the redundancies and the retraining are paid for first. Profit usually dips before it rises.`),
    p(`**Stakeholders.** Change is rarely good for everyone. Customers who like a branch lose one; ${units(F.postsLost)} handler posts go; shareholders hope for higher profit later; suppliers of branch services lose contracts.`),
    flow('neutral', [
      ['Costs first', 'new systems, redundancy pay and training'],
      ['A dip while staff learn', 'output and service may fall for a time'],
      ['Gains later', 'higher productivity and lower costs, if the change works'],
    ], 'Judge a change on its effects over time, not in its first few months.'),
  ],
  realExample: { emoji: '🏦', text: `A bank in Kenya moves account opening to its app. For six months, queries rise and staff are stretched; after a year, each branch worker handles far more customers than before.` },
  misconception: 'Students assume a change that raises productivity must be good for the business as a whole. It can still fail on cost, on customer loyalty or on staff goodwill, so each effect has to be weighed, not just the one the change was aimed at.',
  examMatters: 'When a case gives output and staff figures, calculate productivity before and after the change and say what the figure leaves out, such as quality or customer satisfaction.',
  recall: {
    type: 'reorder',
    prompt: 'Put these in the order they happen, from the trigger to the long-run result of a change:',
    criterion: 'chronological: each stage follows the one before it in time',
    correctOrder: [
      'A new owner buys a hotel group whose profit has been falling',
      'The owner announces that every hotel will switch to online check-in',
      'Costs rise and guest complaints increase while staff learn the system',
      'Each receptionist serves more guests, and the group becomes cheaper to run',
    ],
    why: [
      'The trigger comes first: new ownership after poor performance.',
      'The trigger leads to a decision to change.',
      'The costs and the learning dip arrive before any gain.',
      'Productivity and cost gains are the long-run effect, if the change works.',
    ],
  },
});

const speed = sub('time-and-speed-of-change', {
  title: 'Time and Speed of Change',
  keyIdea: 'Incremental change is small and gradual; step change is large and sudden. Speed matters because change too slow loses to rivals and change too fast overwhelms people.',
  body: [
    p(`**Incremental change** is a series of small adjustments, each building on the last: a new form here, a new product feature there. It is cheaper, less risky and easier for staff to absorb. Continuous improvement, taught under quality management (2.3.4), is incremental change made a habit.`),
    p(`**Step change** is a large, sudden shift in what the business does or how it does it, such as ${F.name} moving claims to an app and closing ${pct(F.closingPct)} of its branches. It costs more, carries more risk and meets more resistance, but it can get a firm to where it needs to be when small adjustments would take too long.`),
    p(`**Time and speed** are a key factor in whether change succeeds. The question is how fast the environment is changing compared with how fast the business can change. ${F.name}'s chief executive wants the change done in ${F.fastMonths} months; a gradual plan would take ${F.slowMonths}.`),
    p(`Too slow, and customers leave for the rival before the app is ready. Too fast, and staff have no time to be trained, systems are not tested, mistakes reach customers and resistance hardens. Time to explain, train and test is part of the cost of change.`),
  ],
  realExample: { emoji: '🛒', text: `A supermarket chain in Pakistan adds self-checkouts to a few stores each year, adjusting as it learns. A rival that installed them in every store in one month faced queues, errors and staff walkouts.` },
  misconception: 'Students recommend introducing change gradually as if slower were always safer, because staff have time to adjust. A gradual plan has its own cost: if customers or rivals are moving faster than the business can change, it loses them before it finishes. The right pace is set by how fast the trigger is moving.',
  examMatters: 'If a case gives a timetable, judge it against the trigger: how quickly are customers or rivals moving? The best answers weigh the cost of being late against the cost of rushing.',
  recall: {
    type: 'fillin',
    prompt: 'Name the type of change each firm is making — incremental or step:',
    template: [
      'A café adds one new drink to its menu each season and keeps what sells: ___ change.',
      'A newspaper stops printing overnight and becomes an online-only title: ___ change.',
    ],
    answers: ['incremental', 'step'],
    hints: ['small adjustments that build on each other', 'one large and sudden shift'],
    distractors: ['external', 'internal'],
  },
});

/* ══ Chapter 2 — Culture, size and leadership (3.3.6 · 1a, 1b, 1e) ════════════ */

const culture = sub('organisational-culture', {
  title: 'Organisational Culture and Change',
  keyIdea: 'A culture that values learning and trying new things makes change easier; one that values rules, routine and seniority makes the same change slower and harder.',
  body: [
    p(`**Organisational culture** is the shared values, beliefs and habits of the people in a business — "the way things are done here". It is a key factor in change because a change that fits the culture is carried along by it, and one that clashes with it is resisted by people who believe they are doing their jobs properly.`),
    p(`A culture that **eases change** values ideas from anyone, rewards trying new methods, and treats mistakes as something to learn from. Staff expect things to move and are used to being consulted.`),
    p(`A culture that **blocks change** values following the rules, doing things the way they have always been done, and deferring to seniority. At ${F.name}, claims have been handled the same way for decades; long-serving handlers are proud of catching fraud by talking to customers face to face, and an app that bypasses that skill feels like an insult to it.`),
    p(`Culture can itself be one of the things a change has to change, which takes longer than changing a system. The types of company culture, and why an established culture is hard to change, are taught in 3.3.4; here the question is how the culture a firm already has helps or hinders the change it is making.`),
  ],
  realExample: { emoji: '🧪', text: 'A software firm in Singapore lets any team trial a new tool for a month and share what it found. When the firm changed its main system, staff had already tested it and asked for it.' },
  misconception: 'Students treat culture as something managers can announce: "the culture will now be innovative". Culture is what people actually do and value, so it changes slowly, through what leaders reward and how they behave, not through a statement.',
  examMatters: 'Use evidence of the culture from the case — how long staff have served, how decisions are made, how mistakes are treated — and link it to whether this particular change will be accepted.',
  recall: {
    type: 'classify',
    prompt: 'Sort each description by whether the culture is likely to ease change or block it.',
    groups: [
      { name: 'Eases change', items: ['Teams are praised for trying a new method even when it fails', 'Junior staff regularly suggest improvements that are adopted', 'Staff expect their jobs to look different every few years'], why: 'Each shows people who value learning and are used to new ways of working.' },
      { name: 'Blocks change', items: ['Every decision must be approved by the most senior manager', 'New ideas are met with "we tried that years ago"', 'Staff are judged on following procedures exactly'], why: 'Each shows people who value routine and rules, so a new way of working feels like a threat.' },
    ],
  },
});

const size = sub('size-of-organisation', {
  title: 'Size of Organisation',
  keyIdea: 'Large organisations have the money and specialists to fund change but many layers and sites to carry it through; small ones can change quickly but may lack the resources.',
  body: [
    p(`The **size of organisation** changes both how easy change is and how much it costs.`),
    p(`**Large organisations** have more layers of management, more sites and more staff to persuade. A message passed down ${F.layers} layers at ${F.name} is slower and more likely to be distorted than one told to a team directly. Different departments protect their own interests, and a system used by ${units(F.staff)} people is costly to replace. Against that, a large firm has the cash to pay for new systems, specialists to run the project, and enough scale to try a change in a few branches before rolling it out.`),
    p(`**Small organisations** can change quickly. The owner may know every employee, decisions need no committee, and the reasons for a change can be explained face to face. But a small firm may not be able to afford new equipment or outside expertise, and a change that goes wrong affects the whole business rather than one division.`),
    flow('neutral', [
      ['More layers and sites', 'decisions and messages take longer to travel'],
      ['More people affected', 'more to train, more who may resist'],
      ['More resources', 'money and specialists to fund the change'],
    ], 'Size slows change down and pays for it, at the same time.'),
  ],
  realExample: { emoji: '🏪', text: 'A family-run pharmacy in Malaysia switched to digital prescriptions in a weekend after the owner trained all six staff herself. A national chain took two years to make the same change across its stores.' },
  misconception: 'Students assume small firms always find change easy. They decide quickly, but a change that needs money, equipment or skills they lack can be harder for them than for a large firm that can pay for all three.',
  examMatters: 'Tie size to the specific change: count the layers, sites or staff the case gives, and weigh the slower communication against the resources available to fund and support the change.',
  recall: {
    type: 'match',
    prompt: 'Match each feature of an organisation to its likely effect on a change:',
    pairs: [
      { left: 'Nine layers between the board and the front line', right: 'Messages about the change are slow and get distorted', why: 'Each layer is another point where information is delayed or reworded.' },
      { left: 'Large cash reserves and an in-house IT team', right: 'The firm can pay for and run the new system itself', why: 'Resources are the advantage size brings to change.' },
      { left: 'An owner who works alongside all eight employees', right: 'The reasons for the change can be explained face to face', why: 'In a small firm there is no chain of command for the message to pass through.' },
    ],
  },
});

const leadership = sub('transformative-leadership', {
  title: 'Transformative Leadership',
  keyIdea: 'A transformative leader sets out a clear vision of what the business will become, explains why change is needed, and inspires and empowers staff to deliver it.',
  body: [
    p(`**Transformative leadership** is leadership that changes an organisation rather than simply running it. A transformative leader:`),
    { type: 'bullets', items: [
      '**sets out a vision** — a clear picture of what the business will become and why that is worth reaching;',
      '**explains the need for change** honestly, including what will be lost;',
      '**inspires** staff through their own example and energy, so people want to change rather than being told to;',
      '**empowers** staff to decide how to reach the goal, and backs them when they try.',
    ] },
    p(`It is a key factor in change because people follow a leader they trust through a period of uncertainty. ${F.name}'s new chief executive visits branches, explains that customers are leaving and why the app is the answer, and asks handlers to design how fraud checks will work in it.`),
    p(`It has limits. Change that depends on one person can stall if that person leaves, and an inspiring leader with the wrong vision takes the business confidently in the wrong direction. The everyday leadership styles a manager uses are taught in 1.3.4; transformative leadership is about leading a business through change.`),
  ],
  realExample: { emoji: '✈️', text: 'A new chief executive of a loss-making Gulf airline spends her first month working shifts at check-in, then sets one goal — the region\'s most punctual airline — and lets each airport team decide how to reach it.' },
  misconception: 'Students equate transformative leadership with being charismatic. Charisma may help, but the substance is a vision that makes sense to staff, honest reasons for the change, and trust that lets people take part in it.',
  examMatters: 'Look for evidence in the case of what the leader actually does — sets a direction, explains, involves — and weigh it against the risk of the change depending on one person.',
  recall: {
    type: 'fillin',
    prompt: 'Name what each leader is doing:',
    template: [
      'The head of a school chain tells staff where the schools will be in five years and why it matters: she is setting out a ___.',
      'A factory manager lets each shift team decide how it will meet the new safety target: he is using ___.',
    ],
    answers: ['vision', 'empowerment'],
    hints: ['a picture of the future the business is aiming for', 'handing staff the authority to decide how'],
    distractors: ['coercion', 'negotiation'],
  },
});

/* ══ Chapter 3 — Managing resistance to change (3.3.6 · 1d) ══════════════════ */

const whyResist = sub('why-people-resist-change', {
  title: 'Why People Resist Change',
  keyIdea: 'People resist change when they expect to lose something, when they are uncertain what it means for them, or when they genuinely think it is a mistake.',
  body: [
    p(`**Resistance to change** is any unwillingness to accept or carry out a change, from quiet foot-dragging to open refusal. Managing it starts with knowing where it comes from. There are three broad sources.`),
    p(`**Expected loss.** Staff may lose their job, pay, status or skills that took years to learn. At ${F.name}, ${units(F.postsLost)} handler posts are going, and the handlers who stay will see the skill they are proudest of taken over by an app.`),
    p(`**Uncertainty.** When people do not know what a change means for them, they tend to assume the worst. Rumours fill the gap left by poor communication, and habit makes the familiar way feel safer than an unknown one.`),
    p(`**Genuine disagreement.** Staff may believe the change is wrong — and sometimes they are right. Handlers who warn that an app will miss fraud they would catch in conversation are raising a real risk, not just protecting themselves.`),
    p(`That is why resistance is worth listening to before it is overcome: it can reveal a flaw in the plan while there is still time to fix it.`),
  ],
  realExample: { emoji: '🏭', text: 'When a car-parts maker in Thailand announced robots on its welding line, the welders refused overtime. Most feared for their jobs; a few pointed out that the robots could not handle two of the parts, which proved true.' },
  misconception: 'Students describe resistance as irrational stubbornness. It usually has a reason — a real loss, a real uncertainty or a real objection — and treating it as mere stubbornness means the reason is never dealt with.',
  examMatters: 'Name the likely source of resistance for the group in the case — who loses what, and what they do not know — because the right way to manage it depends on that cause.',
  recall: {
    type: 'classify',
    prompt: 'Sort each reaction by the source of resistance it shows: expected loss, uncertainty or genuine disagreement.',
    groups: [
      { name: 'Expected loss', items: ['A supervisor whose team will be merged into another', 'A typist whose speed will no longer be needed'], why: 'Each person stands to lose status or a valued skill.' },
      { name: 'Uncertainty', items: ['Staff who have heard only rumours about "restructuring"', 'Workers told a new rota is coming but not what it is'], why: 'Neither group knows what the change means for them, so they fear the worst.' },
      { name: 'Genuine disagreement', items: ['Nurses who warn that a new form wastes time with patients', 'Engineers who say the new supplier\'s parts fail tests'], why: 'Each group objects to the change itself, on grounds that may be correct.' },
    ],
  },
});

const reduceResistance = sub('ways-to-reduce-resistance', {
  title: 'Ways to Reduce Resistance',
  keyIdea: 'Managers can explain, involve, support, negotiate, bring resisters inside the project, or, as a last resort, impose the change. Each suits a different cause.',
  body: [
    p(`**Managing resistance to change** means choosing how to respond to it. Six approaches are used, running from those that build genuine support to those that only force compliance.`),
    { type: 'bullets', items: [
      '**Communication and education** — explaining why the change is needed and what it means, early and honestly. Suits resistance caused by missing or wrong information.',
      '**Involvement** — letting the people affected help design the change. They are more committed to what they helped shape, and they know things managers do not.',
      '**Support and training** — giving people the skills and time to cope. Suits fear of not being able to do the new job.',
      '**Negotiation** — agreeing something in return, such as retraining, pay or a guarantee. Suits a group that can block the change and will lose from it.',
      '**Co-option** — giving a leading resister a visible role in the project, so opposition turns into ownership.',
      '**Coercion** — requiring the change, with consequences for refusing. Fast, but it breeds resentment and is kept as a last resort.',
    ] },
    p(`${F.name} uses several at once: it explains the app to every branch, invites handlers to design the fraud checks, and offers ${units(F.retrained)} of the ${units(F.postsLost)} affected staff retraining as app-support staff.`),
  ],
  realExample: { emoji: '🚌', text: 'A bus company in Nigeria moving to cashless fares trained every conductor, asked drivers which routes to try first, and agreed with the union that no conductor would lose pay in the first year.' },
  misconception: 'Students treat communication as the answer to every kind of resistance. Explaining a change removes resistance caused by misunderstanding; it does nothing for someone who understands perfectly well that they will lose their job.',
  examMatters: 'Match each approach you recommend to a cause of resistance in the case, and say what it costs — in time, money or goodwill — rather than listing all six.',
  recall: {
    type: 'match',
    prompt: 'Match each situation to the approach that fits it best:',
    pairs: [
      { left: 'Staff believe, wrongly, that half of them will be sacked', right: 'Communication and education', why: 'The resistance rests on wrong information, so accurate information removes it.' },
      { left: 'Staff fear they will not cope with the new software', right: 'Support and training', why: 'The worry is about skills, so giving them the skills addresses it.' },
      { left: 'A union can stop the new shift pattern and its members lose overtime', right: 'Negotiation', why: 'A powerful group that loses out needs something in return.' },
      { left: 'Nurses know the ward routine far better than the planners do', right: 'Involvement', why: 'Their knowledge improves the plan, and helping shape it builds commitment.' },
    ],
  },
});

const choosing = sub('choosing-an-approach', {
  title: 'Choosing How to Manage Resistance',
  keyIdea: 'The right approach depends on the cause of resistance, how much time there is, and how much power the resisters have. Most successful changes combine several.',
  body: [
    p(`No single approach suits every change. Three questions decide the choice.`),
    p(`**What is causing the resistance?** Misunderstanding calls for communication; fear of not coping calls for training; a real loss calls for negotiation or support to find new work; a real objection calls for involvement, and perhaps a change to the plan.`),
    p(`**How much time is there?** Involvement and education take weeks or months. If the change must happen by a legal deadline, managers may have to negotiate quickly or impose it and accept the cost in goodwill.`),
    p(`**How much power do the resisters have?** A group that can stop the change, such as specialists nobody else can replace, must be won over or bargained with. A group with little power can be required to comply, but forcing them damages trust that the next change will need.`),
    flow('bad', [
      ['Change imposed quickly', 'no time is spent explaining or involving'],
      ['Staff comply but resent it', 'effort and goodwill fall'],
      ['Problems are hidden', 'staff stop reporting what is going wrong'],
    ], 'Speed bought by coercion is often paid for later, in the next change.'),
  ],
  realExample: { emoji: '🏥', text: 'A hospital in Hong Kong had eight weeks to meet a new records law. It trained all staff, involved the senior nurses in designing the forms, and made the new forms compulsory from the legal deadline.' },
  misconception: 'Students present coercion as simply the wrong answer. Where time is short and the change is essential, requiring it may be the only option; what matters is that managers recognise its cost and use it last, not first.',
  examMatters: 'A strong answer recommends a combination for the case and justifies it by cause, time and power, rather than naming a single approach as the best one.',
  recall: {
    type: 'fillin',
    prompt: 'Name the approach each manager is using:',
    template: [
      'The regulator\'s deadline is in three weeks, so a manager tells the last few staff that using the new system is compulsory: ___.',
      'A loud critic of the plan is asked to lead the team that tests it and report to the board: ___.',
    ],
    answers: ['coercion', 'co-option'],
    hints: ['requiring the change with consequences for refusing', 'turning an opponent into someone who owns the project'],
    distractors: ['involvement', 'education'],
  },
});

/* ══ Chapter 4 — Identifying key risks through risk assessment (3.3.6 · 2a) ══ */

const riskAssessment = sub('risk-assessment', {
  title: 'Contingency Planning and Risk Assessment',
  keyIdea: 'Contingency planning prepares for events that could stop a business. It starts by identifying key risks through risk assessment: how likely each is, and how harmful.',
  body: [
    p(`**Contingency planning** is preparing in advance for events that may never happen but would do serious harm if they did. It does not predict the future; it asks "what if?" and decides what the business will do. Contingency planning is narrower than scenario planning, which imagines several possible futures for a whole market.`),
    p(`The first stage is **identifying key risks through risk assessment**. A business lists the events that could stop it working, then scores each one on two scales: its **likelihood** (how probable it is) and its **impact** (how much damage it would do). Multiplying the two gives a score, and the highest scores are the key risks that deserve a plan first.`),
    p(`Three kinds of key risk matter most for almost any business: natural disasters, IT systems failure and the loss of key staff. The next two steps take them in turn.`),
    p(`${F.name} scores each risk from 1 to 5 on both scales. A typhoon closing head office is likely but does little lasting damage, because staff can work from home. A failure of the claims system is less likely but would stop every claim being paid. The chief actuary, who prices every policy, might leave, and no one else can do the job yet.`),
  ],
  realExample: { emoji: '🧯', text: 'A hotel group in the Maldives scores every risk it faces each year. A cyclone scores highest for its island resorts; a failure of its booking system scores highest for its city hotels.' },
  misconception: 'Students confuse contingency planning with forecasting. A forecast says what is expected to happen; a contingency plan prepares for things that are not expected but would be serious if they did.',
  examMatters: 'Where a case gives likelihood and impact, rank the risks by combining the two, and explain why a rare event with a severe impact can matter more than a frequent minor one.',
  recall: {
    type: 'reorder',
    prompt: 'Put the stages of a risk assessment in the order a business carries them out:',
    criterion: 'the order of the process, from the first stage to the last',
    correctOrder: [
      'List every event that could stop the business operating',
      'Score each event for how likely it is and how much damage it would do',
      'Rank the events by their combined score',
      'Plan responses to the highest-ranked risks first',
    ],
    why: [
      'Nothing can be scored until the risks have been identified.',
      'Each identified risk is then judged on likelihood and impact.',
      'The scores are what allow the risks to be ranked.',
      'The ranking decides where planning effort goes first.',
    ],
  },
});

const disastersIt = sub('natural-disasters-and-it-systems-failure', {
  title: 'Natural Disasters and IT Systems Failure',
  keyIdea: 'Natural disasters can close sites and cut supplies; IT systems failure can stop a business trading at all. Both are key risks because their impact can be sudden and severe.',
  body: [
    p(`**Natural disasters** are floods, typhoons, earthquakes, droughts and fires. They can close offices and factories, destroy stock, cut power and transport, and stop suppliers delivering. The risk depends on where a business and its suppliers are: a warehouse on a flood plain faces a different risk from one on high ground.`),
    p(`**IT systems failure** is the loss of the computer systems a business runs on: a hardware fault, a software error, a power cut, or a cyber attack that locks or steals data. For a business that sells online or keeps its records digitally, an IT failure can stop trading completely, and lost customer data can bring fines and lasting damage to trust.`),
    p(`Both kinds of risk rise as a business changes. ${F.name}'s move to an app makes it more exposed to IT systems failure: once the branches close, a claims system that fails leaves customers with no other way to claim. Two years ago the system was down for ${F.daysNoPlan} days.`),
    p(`Identifying the risk means asking what would stop, for how long, and what that would cost — here, about ${usd(F.costPerDay)} a day in lost business and late-payment penalties.`),
  ],
  realExample: { emoji: '🌊', text: 'Floods in a Malaysian industrial park closed a chip supplier for three weeks. Electronics makers across the region that relied on that one supplier had to halt their own production lines.' },
  misconception: 'Students think IT systems failure means a broken computer that someone can fix in an afternoon. The serious risk is losing the system the whole business depends on, or its data, for days — which is why it is treated as a key risk.',
  examMatters: 'Link the risk to the business in the case: where it is located, how much it depends on its systems, and what stops if the risk happens. A general list of disasters earns little.',
  recall: {
    type: 'classify',
    prompt: 'Sort each event by the kind of key risk it is: natural disaster or IT systems failure.',
    groups: [
      { name: 'Natural disaster', items: ['An earthquake cracks the walls of a factory', 'A drought leaves a brewery short of water', 'A typhoon shuts the port a firm exports through'], why: 'Each is caused by a natural event that damages sites, supplies or transport.' },
      { name: 'IT systems failure', items: ['Hackers lock a retailer\'s ordering system and demand payment', 'A software update wipes a clinic\'s appointment records', 'An online store\'s servers crash on its busiest day'], why: 'Each stops the computer systems the business runs on, or destroys their data.' },
    ],
  },
});

const keyStaff = sub('loss-of-key-staff', {
  title: 'Loss of Key Staff',
  keyIdea: 'Losing a person whose knowledge, skills or relationships nobody else holds can stall a business, whether they leave suddenly or retire as planned.',
  body: [
    p(`**Key staff** are people the business depends on and cannot easily replace: a founder, a senior manager, a specialist with rare skills, or a salesperson who holds the relationships with the biggest customers.`),
    p(`**Loss of key staff** can be sudden — illness, death, or a rival offering more — or planned, such as retirement. Either way, the business may lose knowledge that was never written down, customer relationships, the ability to make certain decisions, and the confidence of investors or lenders.`),
    p(`The risk is greatest where one person holds something nobody else does. ${F.name}'s chief actuary sets the price of every policy using methods nobody else in the firm fully understands. If she left, the firm could keep selling at old prices, but it could not safely price new policies or react to a change in claims.`),
    p(`Change raises this risk too. Staff who dislike a change may leave, and the ones most able to leave are often the most skilled, because they are the easiest for rivals to hire.`),
  ],
  realExample: { emoji: '👩‍🍳', text: 'A restaurant group in Dubai lost its head chef to a rival. Three of its restaurants had menus that only she knew how to cook, and sales there fell for months while a replacement learned them.' },
  misconception: 'Students think loss of key staff only means the most senior managers. A technician who alone understands an old system, or a salesperson who holds the largest accounts, can be just as hard to replace.',
  examMatters: 'Identify who is key in the case and what exactly the business would lose — knowledge, relationships or decision-making — rather than writing that "staff might leave".',
  recall: {
    type: 'match',
    prompt: 'Match each key person to what the business would chiefly lose if they left:',
    pairs: [
      { left: 'The sales director who handles the three largest clients', right: 'Customer relationships', why: 'The clients deal with her personally and may follow her.' },
      { left: 'The only engineer who understands the old billing software', right: 'Knowledge nobody else holds', why: 'What he knows was never written down or shared.' },
      { left: 'The founder who approves every major decision', right: 'The ability to make decisions', why: 'With everything routed through one person, nobody else is used to deciding.' },
    ],
  },
});

/* ══ Chapter 5 — Planning for risk mitigation (3.3.6 · 2b) ══════════════════ */

const continuity = sub('business-continuity', {
  title: 'Business Continuity',
  keyIdea: 'Business continuity planning keeps the most important activities running during a disruption, and gets the rest back as quickly as possible.',
  body: [
    p(`Once key risks are identified, a business plans for **risk mitigation**: reducing the chance of harm, or reducing the harm if it happens. **Business continuity** is the first of the two ways named.`),
    p(`A business continuity plan sets out, for each key risk, how the business will keep its critical activities going. It typically covers:`),
    { type: 'bullets', items: [
      '**critical activities** — which parts of the business must keep running, and how quickly each must be restored;',
      '**backup systems and data** — copies held at another site, and a standby system that can take over;',
      '**alternative ways of working** — another site, staff working from home, or a manual fallback;',
      '**communication** — who tells staff, customers and suppliers what is happening, and how;',
      '**testing** — rehearsing the plan, because a plan nobody has tried often fails when it is needed.',
    ] },
    p(`For ${F.name}, a standby claims system at a second data centre would take over within ${F.daysWithPlan} day if the main one failed. Staff already work from home when a typhoon closes head office, so that risk is largely covered.`),
  ],
  realExample: { emoji: '🖥️', text: 'A bank in Singapore runs two data centres in different parts of the island. When one lost power, the other took over within minutes, and most customers never noticed.' },
  misconception: 'Students think a business continuity plan prevents the disaster. It does not stop the typhoon or the system failure; it limits how long and how badly the business is disrupted when one happens.',
  examMatters: 'Tie each part of the plan you suggest to a risk the case identifies, and say how quickly it would restore the activity that matters most to this business.',
  recall: {
    type: 'match',
    prompt: 'Match each threat to the continuity measure that best keeps the business running:',
    pairs: [
      { left: 'The main ordering system is knocked out by a fault', right: 'A standby system at a second site takes over', why: 'A second system means orders continue while the first is repaired.' },
      { left: 'A flood closes the office for a week', right: 'Staff work from home on laptops', why: 'The work moves to where the staff are, not the building.' },
      { left: 'The only supplier of a key part stops delivering', right: 'A second supplier is kept on contract', why: 'Having another source means production does not depend on one firm.' },
    ],
  },
});

const succession = sub('succession-planning', {
  title: 'Succession Planning',
  keyIdea: 'Succession planning identifies the roles the business cannot do without and prepares people to step into them, so that losing a key person does not stop the business.',
  body: [
    p(`**Succession planning** is the second named way to mitigate risk, and it is the answer to the loss of key staff. It means deciding in advance who could take over each critical role, and preparing them before they are needed.`),
    p(`A succession plan starts with the roles whose loss would do the most harm, then looks for people inside the business who could fill them. Those people are developed through training, mentoring, acting as deputy and taking on parts of the role, and the knowledge held by the current post-holder is written down and shared. Where nobody inside is suitable, the plan may be to recruit from outside — which takes longer and carries more risk.`),
    p(`${F.name} has no successor for its chief actuary, who retires in ${F.actuaryRetiresMonths} months. A deputy would need to be appointed now and shadow her; recruiting an actuary from outside could take most of that time on its own.`),
    p(`Succession planning also matters during change. A transformative leader who carries a change personally is a key person too: if the change depends on one chief executive, the board needs to know who could continue it.`),
  ],
  realExample: { emoji: '🏗️', text: 'A construction firm in Kenya has each site manager train a deputy who runs the site one week in four. When a manager fell ill in the middle of a project, the deputy took over the next morning.' },
  misconception: 'Students think succession planning is only about choosing the next chief executive. It applies to any role the business cannot easily fill — a specialist or a key technician as much as a director.',
  examMatters: 'Identify the key role in the case, say who could fill it and how long they would need to be ready, and weigh the cost of developing a successor against the risk of having none.',
  recall: {
    type: 'reorder',
    prompt: 'Put the stages of a succession plan in the order they are carried out:',
    criterion: 'the order of the process, from the first stage to the last',
    correctOrder: [
      'Decide which roles the business could least afford to lose',
      'Pick out people inside the business who could step into each of them',
      'Train and mentor them, and let them deputise in the role',
      'Hand the role over when the post-holder leaves or retires',
    ],
    why: [
      'The critical roles have to be known before successors can be chosen.',
      'Candidates are identified for each critical role.',
      'The chosen people are developed so they are ready in time.',
      'The handover is the point the preparation was for.',
    ],
  },
});

const judging = sub('judging-a-contingency-plan', {
  title: 'Is a Contingency Plan Worth It?',
  keyIdea: 'Mitigation costs money and time now to avoid a loss that may never come, so how much to plan depends on how likely and how damaging each risk is.',
  body: [
    p(`Planning for risk mitigation is not free. Backup systems, second suppliers, deputies and rehearsals all cost money and management time, and the event they prepare for may never happen. So a business has to judge how far each plan is worth it.`),
    p(`${F.name}'s standby claims system costs ${usd(F.standbyCost)} a year. Without it, an outage like the last one lasts ${F.daysNoPlan} days and costs about ${usdm(F.outageNoPlan)}; with it, recovery takes ${F.daysWithPlan} day and costs about ${usd(F.outageWithPlan)}. In any year with one such outage, the system saves more than it costs; in a year with none, it is ${usd(F.standbyCost)} spent on something that was not used.`),
    p(`The case for a plan is stronger when the risk is likely or its impact severe, when the measure is cheap compared with the loss, and when the business could not survive the loss at all. It is weaker when the risk is rare and minor, or when the plan exists on paper but has never been tested.`),
    p(`A small firm cannot plan for everything, so it plans for the few key risks that would close it; a large firm with more exposed customers is expected to plan more widely.`),
  ],
  realExample: { emoji: '⚖️', text: 'A small tour operator in Sri Lanka cannot afford a second office, so it keeps its bookings in cloud storage and has a named deputy for the owner. Those two measures cover the risks that would close it.' },
  misconception: 'Students assume more contingency planning is always better. Planning costs money and attention that could go into the business itself, so it should match the likelihood and impact of each risk.',
  examMatters: 'When a case gives the cost of a measure and the cost of the loss, compare them and then qualify the comparison: how likely is the loss, and what else — reputation, customers, the law — is at stake?',
  recall: {
    type: 'classify',
    prompt: 'Sort each fact by whether it strengthens or weakens the case for a contingency plan.',
    groups: [
      { name: 'Strengthens the case', items: ['The business would close if its only warehouse burned down', 'A backup of all records costs very little each month', 'The region has had three serious floods in ten years'], why: 'Each makes the loss more likely, more severe, or cheap to guard against.' },
      { name: 'Weakens the case', items: ['The event has not happened in the industry for fifty years', 'The plan has been written but never rehearsed', 'The loss would be a few hours of minor delay'], why: 'Each makes the plan less needed, or less likely to work when it is.' },
    ],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [triggers, effects, speed],
    takeaway: [
      'Name the trigger first: it explains why and how urgently.',
      'Costs arrive before gains; judge a change over time.',
      'Incremental is gradual; step change is large and sudden.',
    ],
  },
  {
    title: B2,
    subs: [culture, size, leadership],
    takeaway: [
      'A change that fits the culture is carried by it.',
      'Size slows change down and pays for it.',
      'A transformative leader gives a vision, reasons and trust.',
    ],
  },
  {
    title: B3,
    subs: [whyResist, reduceResistance, choosing],
    takeaway: [
      'Resistance comes from loss, uncertainty or real disagreement.',
      'Match each approach to the cause it addresses.',
      'Cause, time and power decide the mix; coercion comes last.',
    ],
  },
  {
    title: B4,
    subs: [riskAssessment, disastersIt, keyStaff],
    takeaway: [
      'Score each risk on likelihood and impact, then rank.',
      'Natural disasters and IT failure can stop trading suddenly.',
      'Key staff hold what nobody else does.',
    ],
  },
  {
    title: B5,
    subs: [continuity, succession, judging],
    takeaway: [
      'Continuity plans keep critical activities running.',
      'Succession plans prepare people for key roles.',
      'Plan in proportion to likelihood and impact.',
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
 * THE LEAF MAP, BY HAND. 10 leaves at `bus_spec.txt:1259-1271` (12 rows in `spec-items.json`).
 * Every ledger id's corrected citation runs through this table rather than through its "3.6.x".
 */
export const LEAF_MAP = {
  'BUS-3.3.6-1a': ['organisational-culture'],
  'BUS-3.3.6-1b': ['size-of-organisation'],
  'BUS-3.3.6-1c': ['time-and-speed-of-change'],
  'BUS-3.3.6-1d': ['why-people-resist-change', 'ways-to-reduce-resistance', 'choosing-an-approach'],
  'BUS-3.3.6-1e': ['transformative-leadership'],
  'BUS-3.3.6-2a-1': ['natural-disasters-and-it-systems-failure'],
  'BUS-3.3.6-2a-2': ['natural-disasters-and-it-systems-failure'],
  'BUS-3.3.6-2a-3': ['loss-of-key-staff'],
  'BUS-3.3.6-2b-1': ['business-continuity'],
  'BUS-3.3.6-2b-2': ['succession-planning'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, TITLED AS THE CHAPTER (`depth.notes-titles` by construction). The live
 * notes were "Causes and Types of Change" (with "Disruptive (step) change"), resistance, and Shell-style
 * "Scenario Planning" (`accuracy-02`). None carries a misconception, so none can repeat a subsection's.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3.3.6 · 1c',
    keyIdea: 'Triggers start change, its effects arrive over time, and speed decides whether it succeeds.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Internal triggers</strong> — new ownership, poor business performance, a change in organisational size, a new leader.'),
        def('<strong>External triggers</strong> — customers, competitors, technology, the law, the economy.'),
        def('<strong>Incremental change</strong> — small, gradual adjustments. <strong>Step change</strong> — a large, sudden shift.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Productivity: ${units(F.claimsBefore)} ÷ ${units(F.handlersBefore)} = ${units(F.perHandlerBefore)} claims a handler; ${units(F.claimsAfter)} ÷ ${units(F.handlersAfter)} = ${units(F.perHandlerAfter)}. A rise of ${pct(F.productivityRise)}.`),
        mech('Effects over time: costs first, a dip while staff learn, gains later.'),
        link('Too slow loses customers to rivals; too fast leaves no time to train, test or explain.'),
      ] },
    ],
    takeaway: ['Trigger, then effects.', 'Costs before gains.', 'Speed against urgency.'],
  },
  {
    title: B2,
    meta: '3.3.6 · 1a, 1b, 1e',
    keyIdea: 'Culture, size and leadership decide how easily the same change is accepted and carried through.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Organisational culture</strong> — the shared values, beliefs and habits of the people in a business.'),
        def('<strong>Size of organisation</strong> — more layers, sites and staff slow change; more money and specialists fund it.'),
        def('<strong>Transformative leadership</strong> — a leader who sets a vision, explains why, inspires and empowers.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('A change that fits the culture is carried along by it; one that clashes meets resistance from people doing their jobs as they believe is right.'),
        mech(`A message passed down ${F.layers} layers travels slowly and gets distorted.`),
        link('Change led by one person can stall if that person leaves.'),
      ] },
    ],
    takeaway: ['Fit the culture or change it slowly.', 'Size: slower, better funded.', 'Vision, reasons, trust.'],
  },
  {
    title: B3,
    meta: '3.3.6 · 1d',
    keyIdea: 'Find the cause of resistance, then choose the approach that addresses it, given the time and the power of those resisting.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Sources of resistance</strong> — expected loss, uncertainty, genuine disagreement.'),
        def('<strong>Approaches</strong> — communication and education; involvement; support and training; negotiation; co-option; coercion.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Misunderstanding → communication. Fear of not coping → training. Real loss → negotiation. Real objection → involvement.'),
        mech('Little time and an essential change → coercion, at a cost in goodwill.'),
        link('Resistance can reveal a flaw in the plan; listen before overcoming it.'),
      ] },
    ],
    takeaway: ['Cause first.', 'Combine approaches.', 'Coercion last.'],
  },
  {
    title: B4,
    meta: '3.3.6 · 2a',
    keyIdea: 'Identify key risks through risk assessment: score likelihood and impact, rank, and plan for the highest first.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Contingency planning</strong> — preparing in advance for events that may not happen but would do serious harm.'),
        def('<strong>Risk assessment</strong> — scoring each risk for likelihood and impact, and ranking them.'),
        def('<strong>Key risks</strong> — natural disasters; IT systems failure; loss of key staff.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${F.name}: ${F.risks.map((r) => `${r.name.toLowerCase()} ${r.likelihood} × ${r.impact} = ${r.score}`).join('; ')}.`),
        mech('A rare event with a severe impact can outrank a frequent minor one.'),
      ] },
    ],
    takeaway: ['Likelihood × impact.', 'Rank, then plan.', 'Tie risks to the firm.'],
  },
  {
    title: B5,
    meta: '3.3.6 · 2b',
    keyIdea: 'Mitigate key risks with business continuity and succession planning, in proportion to what each risk could cost.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Business continuity</strong> — keeping critical activities running during a disruption: backups, standby systems, alternative sites, communication, testing.'),
        def('<strong>Succession planning</strong> — preparing people in advance to step into roles the business cannot do without.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Standby system: ${usd(F.standbyCost)} a year. One outage cut from ${F.daysNoPlan} days to ${F.daysWithPlan} saves ${usdm(F.outageSaving)}.`),
        link('An untested plan often fails when it is needed.'),
      ] },
    ],
    takeaway: ['Keep critical activities going.', 'Prepare successors early.', 'Plan in proportion.'],
  },
];
