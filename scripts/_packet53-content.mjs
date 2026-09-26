/**
 * PACKET 53 — influences-business-decisions teaching content: four chapters over the specification's
 * three sub-topics (`bus_spec.txt:1184-1211`), thirteen subsections, one recall each.
 *
 * WHAT THE LIVE SECTION TAUGHT, AND WHY IT IS RESHAPED. Two chapters of two subsections each:
 * "Culture & Stakeholders" (two unrelated sub-topics in one step, `structure-02`) and "Ethics & CSR"
 * (whose for/against lists repeat each other almost word for word, `structure-02`, `topFix-04`). No
 * recall, no diagram, no pins (`structure-03/04/05`). Four leaves were thin or missing in the body:
 * how culture is formed (1c), difficulties in changing it (1d), internal and external stakeholders
 * (2a) and pay and rewards (3b).
 *
 * THE FOUR CHAPTERS. Culture is split in two — what it is (1a, 1b) and how it forms and changes (1c,
 * 1d) — because 1d is the leaf the live section taught in one sentence, and the worked judgement on
 * it is where `structure-07`'s missing evaluation is modelled. Stakeholders (2a-2d) and ethics (3a-3c)
 * are one chapter each. The ledger's proposed "Corporate influences" chapter (short-termism, evidence-
 * based decisions) is UK GCE 3.4.1 and is not built (see `_packet53-util.mjs`).
 *
 * THE ASIDES. Handy, Friedman, Freeman, Mendelow, greenwashing and groupthink are each named once, in
 * teaching text, as the standard term for something taught in the specification's words — never as the
 * thing learned, and never on an assessed surface. The runner counts them.
 */
import { SECTION, subId, id, FIRM, rm, rmm, units, pct, ratio } from './_packet53-util.mjs';

const F = FIRM;
const blockId = (title) => id('block', title);
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });
const sub = (slug, spec) => { const sid = subId(slug); return { id: sid, ...spec, recall: recall(sid, spec.recall) }; };
const p = (text) => ({ type: 'paragraph', text });
const flow = (resultType, steps, result) => ({ type: 'flow', resultType, steps: steps.map(([title, subtitle]) => ({ title, subtitle })), result });

export const B1 = 'Corporate Culture';
export const B2 = 'Forming and Changing a Culture';
export const B3 = 'Stakeholder Model Versus Shareholder Model';
export const B4 = 'Business Ethics';

/* ══ Chapter 1 — Corporate culture (3.3.4 · 1a, 1b) ═══════════════════════ */

const strongWeak = sub('strong-and-weak-cultures', {
  title: 'Strong and Weak Cultures',
  keyIdea: 'Corporate culture is the shared values and habits that decide how things are done in a business. A strong culture is widely shared and deeply held; a weak one is not.',
  body: [
    p('**Corporate culture** is the set of values, beliefs and habits that people in a business share: "the way we do things here". It shows in how decisions are made and what gets praised or punished, whatever the mission statement says.'),
    p('In a **strong culture** most staff hold the same values and act on them without being told. Decisions are quick because people already agree on what matters, and newcomers pick up the norms fast. In a **weak culture** values vary from one part of the business to another, so behaviour depends on the individual manager and head office has to lean on rules and checks.'),
    p(`${F.name}, a Malaysian snack maker with ${units(F.staff)} staff, has a strong culture of thrift. Managers question every expense, and waste on the production line is treated as a personal failing. That keeps costs low, but a proposal that costs money now and pays back later meets suspicion before anyone has read the figures.`),
    p('So strength is not the same as quality. A strong culture magnifies whatever its values are: an advantage while they suit the market, and a brake when the market changes, because shared beliefs make the business slow to respond. When everyone thinks alike, fewer people challenge a poor decision, which is sometimes called groupthink.'),
  ],
  realExample: { emoji: '🏦', text: 'A long-established bank in the Gulf with a strong culture of caution avoided its rivals\' riskiest loans, but was years behind them in offering mobile banking.' },
  misconception: 'Students assume a strong culture is always a good culture. Strength measures how widely values are shared, not whether they are the right values: a strong culture of caution or complacency can be harder to fix than a weak one.',
  examMatters: 'Judge a culture by fit, not by strength. Say whether the values the case describes suit the decision the business now faces, and explain what the strength of the culture does to the speed and quality of that decision.',
  recall: {
    type: 'classify',
    prompt: 'Sort each sign by the kind of culture it points to: strong or weak.',
    groups: [
      { name: 'Strong culture', items: ['Staff at every branch describe the firm in the same words', 'A recruit is told within a week how things are done', 'Managers act the same way whether or not head office is watching'], why: 'Values are shared and acted on everywhere, so behaviour is consistent without close supervision.' },
      { name: 'Weak culture', items: ['Each factory has its own way of treating customers', 'Staff check the rule book because there is no shared view', 'Two sales teams disagree about what the firm stands for'], why: 'There is no dominant set of values, so behaviour varies and rules must do the work a culture would do.' },
    ],
  },
});

const powerRole = sub('power-and-role-cultures', {
  title: 'Power and Role Cultures',
  keyIdea: 'In a power culture, decisions flow from one person at the centre; in a role culture, they flow from job titles, procedures and rules.',
  body: [
    p('Company cultures are classified into four types by where power sits and how work gets done: **power**, **role**, **task** and **person**. The four are usually credited to the management writer Charles Handy; the names of the types are what matter, not the writer.'),
    p('In a **power culture**, decisions radiate from one person or a small group at the centre, usually the founder or owner. There are few rules; staff succeed by knowing what the centre wants. Decisions are fast, and the business can change direction in a day. The weaknesses grow with size: everything waits for one person, and staff who disagree tend to leave rather than argue.'),
    p('In a **role culture**, power comes from the job, not the person. Written procedures, job descriptions and a clear hierarchy decide who does what. Work is predictable, consistent and easy to check, which suits large and stable operations. It is slow to change, because a new idea must pass every level that could say no.'),
    p(`${F.name} shows both. Its founder still approves every new flavour personally: a power culture at the top. Its factories run on shift procedures, hygiene checklists and grade-based pay: a role culture on the production line.`),
  ],
  realExample: { emoji: '💊', text: 'A family-owned pharmacy chain in Karachi grew from three shops to sixty. Its owner could no longer check every order, so written stock procedures and area managers took over the decisions she used to make herself.' },
  misconception: 'Students describe a role culture as simply bad because it is bureaucratic. Procedures are what make a large operation safe and consistent; a food factory without them would be a hazard. Its weakness is the speed of change, not the rules themselves.',
  examMatters: 'Name the type from the evidence in the case (who decides, and by what authority), then explain what that type does to the decision in question. A label with no evidence behind it shows knowledge only.',
  recall: {
    type: 'fillin',
    prompt: 'Name the culture each description shows:',
    template: [
      'A tailor\'s shop where one person sets every price and approves every hire: a ___ culture.',
      'A tax office where each clerk handles every form by a written procedure: a ___ culture.',
    ],
    answers: ['power', 'role'],
    hints: ['authority sits with one individual at the centre', 'authority comes from the job title and the rulebook'],
    distractors: ['task', 'person'],
  },
});

const taskPerson = sub('task-and-person-cultures', {
  title: 'Task and Person Cultures',
  keyIdea: 'In a task culture, power follows expertise and teams form around projects; in a person culture, the organisation exists to serve the individuals in it.',
  body: [
    p('In a **task culture**, teams are formed around a job to be done and broken up when it is finished. Authority comes from expertise, not rank: whoever knows most about the problem leads on it. Task cultures suit work that is new each time, such as product development, consultancy and research, because people with different skills combine quickly. They are expensive to run and harder to control, because no one follows a fixed routine.'),
    p('In a **person culture**, the organisation is a framework that lets skilled individuals do their own work: a partnership of lawyers, architects or doctors sharing premises and support staff. Each professional decides how to work; the organisation serves them rather than the other way round. That keeps experts motivated, but a decision for the whole firm needs the agreement of people who each see themselves as their own boss.'),
    p(`${F.name}'s new chief executive has set up a task culture in one corner of the business: a food scientist, a marketer, a buyer and an engineer who take a new snack from idea to shelf, with no approval from the founder until the final tasting.`),
    p('Most businesses mix types. What matters is whether the type in each part of a business fits the work that part does.'),
  ],
  realExample: { emoji: '🎬', text: 'A film production company in Lagos hires a crew for each film (director, camera, sound, editing) who work as one team for months and then go their separate ways. Each project is run by expertise, not job title.' },
  misconception: 'Students think a task culture has no leaders. It has a leader on every project; they are chosen for what they know about the task, not for their place in the hierarchy.',
  examMatters: 'If a case describes a business that mixes types, say which part of it has which culture and why that fits, or does not fit, the work there. That is stronger than forcing one label on the whole firm.',
  recall: {
    type: 'match',
    prompt: 'Match each organisation to the culture it most likely has:',
    pairs: [
      { left: 'A software firm that forms a fresh team for each client project', right: 'Task culture', why: 'Teams form around a job and are led by whoever has the expertise it needs.' },
      { left: 'Four dentists sharing one surgery and one receptionist', right: 'Person culture', why: 'The organisation exists to support independent professionals, each deciding how to work.' },
      { left: 'A corner shop whose owner decides everything', right: 'Power culture', why: 'Power radiates from one individual at the centre.' },
      { left: 'A national postal service run by rule books and grades', right: 'Role culture', why: 'Authority comes from the job and the written procedure, not from the individual.' },
    ],
  },
});

/* ══ Chapter 2 — Forming and changing a culture (3.3.4 · 1c, 1d) ═══════════ */

const formed = sub('how-culture-is-formed', {
  title: 'How Corporate Culture Is Formed',
  keyIdea: 'Culture forms from the founder\'s values, the firm\'s history, who it hires and promotes, what it rewards, and the country and industry it works in.',
  body: [
    p('No one writes a culture down and switches it on. It **forms** over years from a handful of sources, and each keeps reinforcing the others.'),
    p('**The founder and leaders.** Early on, the founder\'s values are the business: what the founder praises, tolerates and punishes becomes normal. Later leaders shape culture most through what they do, not what they say.'),
    p('**History.** Ways of working that once brought success become "how we do things", and are defended long after the reason for them has gone.'),
    p('**Recruitment, promotion and rewards.** Firms hire people who seem to fit and promote those who display the existing values. Pay rules show what really counts: a firm that pays bonuses only on volume will have a culture of volume, whatever its posters say about quality.'),
    p('**The country and the industry.** National attitudes to hierarchy and to questioning a boss, and the demands of the sector (safety in a chemical plant, speed in fashion), push a culture in a direction too.'),
    p(`${F.name}'s thrift began with its founder, who started out frying snacks in one rented shop and counted every sen. It spread because careful spenders rose to run departments.`),
  ],
  realExample: { emoji: '✈️', text: 'An airline in the Gulf founded by former military pilots still runs on precise checklists, strict seniority and punctuality: values its founders brought with them, which its training rules have passed on to every later intake.' },
  misconception: 'Students write that culture is formed by the mission statement. A statement records what leaders hope the culture is; the culture itself is formed by what people see being rewarded, tolerated and copied every day.',
  examMatters: 'When a case asks why a business behaves as it does, trace the behaviour back to a source of culture the case gives evidence for, such as the founder, a past success or the reward system, rather than asserting that "the culture" causes it.',
  recall: {
    type: 'reorder',
    prompt: 'Put these in the order a culture forms, from a founder\'s first choices to a habit nobody questions:',
    criterion: 'chronological: each stage can only happen once the one before it has',
    correctOrder: [
      'A founder acts on a personal value, such as never wasting money',
      'Early employees are hired and moved up for sharing that value',
      'Surviving a hard period, the firm gives the value the credit',
      'Newcomers absorb the value as simply how things are done',
    ],
    why: [
      'The founder\'s behaviour is the first model anyone copies.',
      'Hiring and advancement spread the value beyond the founder.',
      'Survival appears to prove the value right, so it becomes worth defending.',
      'Once it has been proved, nobody questions it, and it passes to each new intake.',
    ],
  },
});

const resist = sub('why-established-cultures-resist-change', {
  title: 'Why an Established Culture Is Hard to Change',
  keyIdea: 'An established culture resists change because people are invested in it: their status, their skills and their sense of what works all depend on the old ways.',
  body: [
    p('Changing an **established culture** is hard because it is held in thousands of daily habits rather than in any one decision. The difficulties fall into four groups.'),
    p('**Loss.** Managers who rose under the old culture owe their position to it. A change that rewards different behaviour threatens that position, so they have most reason to resist, and most power to slow things down.'),
    p('**Proof.** If the old ways brought success, staff see no reason to drop them. The longer the record of success, the harder the argument for change.'),
    p('**Systems.** Recruitment, promotion, pay and procedures were built around the old culture. Unless they change too, they keep rewarding the old behaviour, and a new values statement is quietly ignored.'),
    p('**Time and scale.** A culture changes only as people change their habits, which takes years, not months. In a large business each site may keep its own version long after head office has moved on.'),
    p(`At ${F.name}, the new chief executive wants product decisions made in teams. Factory managers who built careers on carrying out the founder's instructions see the teams as a loss of control, and the founder, still on the board, points to thirty years of profit as proof that the old way works.`),
  ],
  realExample: { emoji: '🏥', text: 'When two private hospital groups in Kenya merged, doctors at one were used to being consulted on every purchase, while managers at the other bought centrally. Years later, the two sets of hospitals still bought equipment in different ways.' },
  misconception: 'Students suggest a new chief executive or a new values statement can change a culture on its own. Unless recruitment, promotion and rewards change as well, staff keep doing what those systems still reward.',
  examMatters: 'Name the specific difficulty the case gives evidence for (who stands to lose, what past success is being defended, which system still rewards the old behaviour) and say what it means for how fast the change can happen.',
  recall: {
    type: 'classify',
    prompt: 'Sort each factor by its likely effect on a planned change of culture:',
    groups: [
      { name: 'Makes the change harder', items: ['Every senior manager was promoted for following the old way', 'The old way produced record profits for a decade', 'Bonuses are still paid for hitting the old targets'], why: 'Each gives people a reason, or a reward, to keep the existing culture.' },
      { name: 'Makes the change easier', items: ['A crisis that every employee can see threatens the firm', 'Leaders visibly work in the new way themselves', 'Promotion now goes to those who show the new behaviour'], why: 'Each removes a reason to hold on to the old culture, or rewards the new one.' },
    ],
  },
});

const worked = sub('can-a-culture-be-changed', {
  title: 'Can a Culture Be Changed? A Worked Judgement',
  keyIdea: 'Whether a culture can be changed depends on how deep the old one runs, how urgent the need is, and whether leaders change the systems as well as the words.',
  body: [
    p('A question on culture often asks for a judgement: can this business change its culture, and should it? A strong answer weighs the difficulties against the conditions that make change possible, and says what the outcome depends on.'),
    p(`**For success at ${F.name}.** The new chief executive has the board's backing and can change what earns a promotion: product managers could advance for launches that sell, not for following instructions. Rivals are launching healthier snacks faster, so staff can see why the old way is no longer enough.`),
    p('**Against.** The founder is still on the board and still admired; factory managers have most to lose; and the thrift that made the firm successful makes spending on experiments feel wrong. A culture built over thirty years will not shift in one.'),
    p('**The judgement.** Change is likely to succeed in the product team, where the chief executive controls who is hired and how they are paid, and to be slow in the factories, where the role culture suits the work anyway. Whether it succeeds overall depends most on whether the founder visibly backs it, because staff copy what the most powerful person does.'),
  ],
  realExample: { emoji: '📱', text: 'A telecoms firm in Pakistan, formerly state-owned, set out to become customer-focused after it was sold. Its sales teams changed within two years once their bonuses depended on customer ratings; back-office departments, whose rewards stayed the same, took far longer.' },
  misconception: 'Students conclude that a culture "cannot be changed". It can, but slowly and unevenly: the parts of a business whose systems and leaders change move first, and the rest follow or do not.',
  examMatters: 'End an evaluation of culture change with the condition it depends on, for example whether leaders change how people are paid and promoted, rather than a flat yes or no. The condition is what makes the judgement a supported one.',
  recall: {
    type: 'match',
    prompt: 'Match each difficulty in changing a culture to the action that most directly answers it:',
    pairs: [
      { left: 'Managers fear losing the standing the old culture gave them', right: 'Give them a clear role and reward in the new way of working', why: 'Resistance falls when those with most to lose have something to gain.' },
      { left: 'Staff point to past success as proof the old way works', right: 'Show evidence that customers and rivals have changed', why: 'The argument from success holds only if conditions are the same as before.' },
      { left: 'Pay still follows the old behaviour', right: 'Tie bonuses to the behaviour the new culture needs', why: 'People do what is paid for, so the payment has to change first.' },
      { left: 'Each site keeps its own version of the culture', right: 'Rotate managers between sites and train them together', why: 'Shared experience builds shared habits across locations.' },
    ],
  },
});

/* ══ Chapter 3 — Stakeholder model versus shareholder model (3.3.4 · 2a-2d) ═ */

const internalExternal = sub('internal-and-external-stakeholders', {
  title: 'Internal and External Stakeholders',
  keyIdea: 'A stakeholder is anyone affected by, or able to affect, a business. Internal stakeholders work within it; external stakeholders are outside it.',
  body: [
    p('A **stakeholder** is any individual or group with an interest in what a business does, because they are affected by its decisions or can affect them.'),
    p('**Internal stakeholders** are inside the organisation: **employees** and **managers**, and the **owners** of a small business who run it themselves. **External stakeholders** are outside it: **customers**, **suppliers**, **lenders** such as banks, the **local community**, **government**, and pressure groups that campaign on an issue.'),
    p('**Shareholders** are the group textbooks disagree on. They own the company, so many class them as internal; in a large listed company most shareholders never set foot inside it and play no part in running it, so others class them as external. Either is accepted with a reason. What matters more is what they want and how much influence they have.'),
    p(`For ${F.name}, a plan to close its older factory in ${F.oldSite} touches internal stakeholders (the ${units(F.jobs)} people who work there and their managers) and external ones (the site's suppliers, the town's shops, the state government). Influence differs too: a major shareholder can vote against the board, while a local shop can only complain. Planners sometimes map this on Mendelow's grid of power and interest; the influence itself is what counts.`),
  ],
  realExample: { emoji: '⛏️', text: 'When a mining company in Kenya applied to expand a site, the miners, engineers and managers inside it, and the villagers, county officials and financing bank outside it, each wanted something different from the same decision.' },
  misconception: 'Students think external stakeholders have little power because they are outside the business. Customers can buy elsewhere, lenders can refuse credit and government can change the law: an external group is often the most powerful of all.',
  examMatters: 'Identify the stakeholders this particular decision affects, using the case, rather than listing every group a business could have. Two well-chosen stakeholders developed in context say more than seven names.',
  recall: {
    type: 'classify',
    prompt: 'Sort these stakeholders of a hotel chain into internal and external:',
    groups: [
      { name: 'Internal', items: ['A receptionist on the night shift', 'The head chef', 'The finance director'], why: 'They work within the organisation, so its decisions shape their jobs directly.' },
      { name: 'External', items: ['A travel agency that books its rooms', 'The city authority that licenses its restaurant', 'Families living next to one of its hotels'], why: 'They are outside the organisation but are affected by, or can affect, its decisions.' },
    ],
  },
});

const objectives = sub('stakeholder-objectives', {
  title: 'Stakeholder Objectives',
  keyIdea: 'Each stakeholder group wants something different from a business, and those objectives often pull the same decision in opposite directions.',
  body: [
    p('Every stakeholder has **objectives**: what it wants the business to deliver for it. Knowing them is how you predict who will support a decision and who will fight it.'),
    p('**Shareholders** want a return, through a rising share price and dividends. **Employees** want fair pay, job security, safe conditions and a chance to progress. **Managers** want the business to grow, and their own pay and status with it. **Customers** want value, quality and reliable supply. **Suppliers** want regular orders, fair prices and to be paid on time. **Lenders** want interest paid and loans repaid, so they watch cash flow and risk.'),
    p('**The local community** wants jobs, and wants noise, traffic and pollution kept down. **Government** wants employment, tax revenue and businesses that obey the law.'),
    p(`Objectives overlap as well as clash. Everyone at ${F.name} gains if the business survives and grows. The clashes come over how the gains are shared: a higher dividend, a pay rise and a price cut all come out of the same profit.`),
  ],
  realExample: { emoji: '🛒', text: 'A supermarket chain in Singapore that decides to open around the clock pleases shoppers who work late and owners hoping for more sales, but its night-shift staff want extra pay and the neighbours of its stores want quiet at night.' },
  misconception: 'Students write that employees and shareholders always want opposite things. Both want the business to survive and prosper; they clash over how its rewards are divided, not over whether it succeeds.',
  examMatters: 'State each stakeholder\'s objective as it applies to the decision in the case ("workers at the site want to keep their jobs") rather than a general list of what that group usually wants.',
  recall: {
    type: 'match',
    prompt: 'Match each stakeholder of a city bus company to the objective it most likely holds:',
    pairs: [
      { left: 'Bus drivers', right: 'Secure jobs and safe working hours', why: 'Employees depend on the business for their income and their working conditions.' },
      { left: 'The bank that financed the new buses', right: 'Repayments made on schedule', why: 'A lender is rewarded by interest and repayment, so it cares most about cash and risk.' },
      { left: 'Passengers', right: 'Frequent, reliable services at a low fare', why: 'Customers want value and dependable supply.' },
      { left: 'The city government', right: 'Fewer cars on the roads and a properly licensed service', why: 'Government weighs the wider effects on the public, and wants the law obeyed.' },
    ],
  },
});

const models = sub('shareholder-and-stakeholder-models', {
  title: 'The Shareholder Model and the Stakeholder Model',
  keyIdea: 'The shareholder model says decisions should aim purely at returns to shareholders; the stakeholder model says they should weigh every group the business affects.',
  body: [
    p('There are two views of whose interests a business should serve when it makes decisions and sets objectives.'),
    p('The **shareholder model**: the business should focus purely on **shareholder returns**, increasing the share price and dividends. Directors act for the owners; other groups are protected by contracts and the law, and anything more spends the owners\' money without their consent. The economist Milton Friedman made the best-known case for this view.'),
    p('The **stakeholder model**: the business should **consider all of its stakeholders** in its decisions and objectives, because it depends on all of them: workers\' effort, customers\' loyalty, suppliers\' reliability, the community\'s tolerance. Ignoring them eventually costs the owners too. The writer most linked with it is R. Edward Freeman.'),
    p('In practice the two are ends of a spectrum rather than a switch. Even a firm run for its shareholders must keep customers and staff; even a firm run for all its stakeholders must make a profit to survive. The real difference shows when their interests clash and the business has to choose whom to put first.'),
  ],
  realExample: { emoji: '☕', text: 'Two coffee chains in Hong Kong face the same rise in rents. One raises prices and cuts staff hours to protect its payout to owners; the other holds prices and hours and accepts a smaller profit to keep its regular customers and experienced baristas.' },
  misconception: 'Students treat the stakeholder model as ignoring profit. It does not: profit is still needed, and shareholders are stakeholders too. The model asks a business to weigh profit against other interests rather than put it above them automatically.',
  examMatters: 'When you apply either model, show what it would lead the business in the case to decide, and why. A definition of the two models is only the starting point.',
  recall: {
    type: 'fillin',
    prompt: 'Name the model each board is following:',
    template: [
      'A board that rejects a safety upgrade because it would shrink this year\'s payout to the owners follows the ___ model.',
      'A board that delays a price rise because loyal customers on low incomes would be hurt follows the ___ model.',
    ],
    answers: ['shareholder', 'stakeholder'],
    hints: ['the owners\' return comes before everything else', 'every group the decision affects is weighed'],
    distractors: ['customer', 'employee'],
  },
});

const conflict = sub('conflict-between-profit-and-wider-objectives', {
  title: 'Conflict Between Profit and Wider Objectives',
  keyIdea: 'Profit-based objectives serve shareholders; wider objectives serve other stakeholders. One decision can raise profit while costing jobs, suppliers or a community.',
  body: [
    p('The two models matter most where **profit-based (shareholder) objectives** and **wider (stakeholder) objectives** point in different directions. Many decisions do.'),
    p(`${F.name} can close its older factory in ${F.oldSite} and move the work to an automated plant in ${F.newSite}. The move saves ${rmm(F.closureSaving)} a year for a one-off cost of ${rmm(F.closureCost)}, so yearly profit rises from ${rmm(F.profit)} to ${rmm(F.profitAfterClosure)}, and the cost is recovered in about sixteen months.`),
    p(`On the shareholder model the decision is straightforward. On the stakeholder model it is not: ${units(F.jobs)} people lose their jobs, local suppliers lose a customer, the town loses spending, and the staff who remain may fear they are next.`),
    flow('bad', [
      ['Closure announced', `${F.jobs} jobs go in ${F.oldSite}`],
      ['Remaining staff fear they are next', 'trust in the firm falls'],
      ['Effort falls and good staff leave', 'productivity suffers'],
    ], `Part of the ${rmm(F.closureSaving)} saving is lost again`),
    p('The conflict is not always as sharp as it looks. Retraining, transfers to the new plant or a phased closure cost some of the saving but reduce the damage, and a firm that treats departing staff fairly finds it easier to recruit later. Whether that is worth the cost is the judgement.'),
  ],
  realExample: { emoji: '🧵', text: 'A textile firm in Pakistan that moved spinning to a new plant offered every worker at the old mill a transfer and free transport. Its saving was smaller in the first year, but absence at the new plant stayed low.' },
  misconception: 'Students assume any decision that raises profit must harm other stakeholders. Many conflicts can be softened, and some decisions, such as better safety or less waste, raise profit and serve other groups at the same time.',
  examMatters: 'Name the stakeholders the decision affects, explain how their objectives clash with the profit objective, and judge whose interest should carry most weight in this case and why. The judgement needs a reason drawn from the case.',
  recall: {
    type: 'classify',
    prompt: 'A cement company plans to double output at its quarry. Sort each group by what the plan most likely does to its objectives:',
    groups: [
      { name: 'Gains', items: ['Owners expecting a bigger dividend', 'The haulage firm paid to carry the extra cement', 'Quarry workers offered paid overtime'], why: 'The extra output raises their income, which is the objective each of them holds.' },
      { name: 'Loses', items: ['Families living beside the quarry road', 'A school next to the blasting site', 'Farmers whose wells the quarry drains'], why: 'They bear the dust, noise and water loss without sharing in the extra income.' },
    ],
  },
});

/* ══ Chapter 4 — Business ethics (3.3.4 · 3a-3c) ══════════════════════════ */

const tradeOffs = sub('trade-offs-between-profit-and-ethics', {
  title: 'Ethics of Strategic Decisions: Profit Against Ethics',
  keyIdea: 'Business ethics is doing what is morally right, not only what is legal. Strategic decisions often trade profit against ethics, and the trade-off has to be weighed.',
  body: [
    p('**Business ethics** are the moral principles that guide how a business behaves: deciding what is right, not only what is legal. A strategy can be lawful and still unethical, such as selling a product known to harm children where no law yet forbids it, or paying suppliers so little that their workers cannot live on it.'),
    p('Strategic decisions often involve a **trade-off between profit and ethics**: the ethical choice costs money, at least at first, and the cheaper choice harms someone.'),
    p(`${F.name} buys ${units(F.oilTonnes)} tonnes of palm oil a year. Oil certified as grown without clearing rainforest costs ${rm(F.oilPremium)} a tonne more: ${rmm(F.oilCost)} a year. On its own that cuts profit from ${rmm(F.profit)} to ${rmm(F.profitWithOil)}, a fall of ${pct(F.oilProfitFallPct)}.`),
    p(`The trade-off may be smaller than it looks. A price rise of ${pct(F.oilPriceRisePct)} on ${rmm(F.sales)} of sales would cover the cost if customers accept it; retailers abroad may refuse uncertified oil anyway; and a scandal over forest clearing could cost far more than ${rmm(F.oilCost)}. It may also be larger, if rivals using cheaper oil undercut ${F.name} on price.`),
    p('So the question is rarely "ethics or profit?" It is "how much profit, over what period, for how much ethical gain, and who bears the cost?"'),
  ],
  realExample: { emoji: '🍫', text: 'A cocoa processor in Ghana pays farmers a premium for cocoa grown without child labour and inspects farms each season. The inspections raise its costs, but they let it sell to chocolate makers that buy only from inspected farms.' },
  misconception: 'Students assume the ethical choice always costs profit in the end. Sometimes it does; sometimes it protects sales and reputation and pays for itself. Which one depends on customers, rivals and the risk of being found out, and that is what has to be weighed.',
  examMatters: 'Put a size on the trade-off where the case gives figures (the cost as a share of profit, or the price rise needed to cover it), then weigh it against the ethical and commercial gains.',
  recall: {
    type: 'match',
    prompt: 'Match each ethical decision to the way it most likely costs profit:',
    pairs: [
      { left: 'Paying a garment supplier enough for its workers to earn a living wage', right: 'Each shirt costs more to buy', why: 'The ethical gain is paid for in the price of the input.' },
      { left: 'Refusing to advertise sugary drinks to children', right: 'Sales to a profitable group of buyers are given up', why: 'The cost comes through revenue forgone, not through higher costs.' },
      { left: 'Treating factory waste instead of dumping it', right: 'An extra charge for every tonne disposed of', why: 'Proper disposal is a running cost the cheaper option avoids.' },
      { left: 'Recalling a product with a rare safety fault', right: 'A one-off loss of stock and a fall in this year\'s profit', why: 'The cost falls at once, while the harm avoided lies in the future.' },
    ],
  },
});

const pay = sub('pay-and-rewards', {
  title: 'Pay and Rewards',
  keyIdea: 'How a business pays and rewards people is an ethical choice: the gap between top and bottom pay, and what bonuses reward, both shape behaviour and trust.',
  body: [
    p('**Pay and rewards** raise ethical questions at both ends of a business: how much directors should be paid, and for what; and whether pay at the bottom is enough to live on and fair between people doing similar work.'),
    p(`${F.name}'s chief executive is paid ${rmm(F.ceoPay)} a year; its median employee earns ${rm(F.medianPay)}. That is a pay ratio of ${ratio(F.payRatio)}. The board proposes a ${rmm(F.bonus)} bonus if this year's profit target is met, which would take the ratio to ${ratio(F.payRatioAfter)}.`),
    p('For high executive pay: the job is demanding and leaders are hard to recruit. Against: a very wide gap can damage trust and effort lower down, especially when workers\' pay is frozen.'),
    p('**What a reward is tied to matters as much as its size.** A bonus paid only for this year\'s profit rewards cutting the spending that protects the future (maintenance, training, safety) as well as genuine improvement. Adding targets for safety and customer satisfaction, or paying part of a bonus in shares held for several years, rewards what the business actually wants.'),
    flow('bad', [
      ['Bonus tied to this year\'s profit', 'nothing else is measured'],
      ['Maintenance and training are cut', 'costs fall and profit rises'],
      ['The target is met', 'the bonus is paid'],
    ], 'Breakdowns and skill gaps arrive later, after the bonus has gone'),
  ],
  realExample: { emoji: '⚖️', text: 'A listed bank in Nigeria pays half of each director\'s bonus in shares that cannot be sold for three years, so directors gain only if results hold up.' },
  misconception: 'Students treat pay as an ethical issue only when it is low. How rewards are designed is an ethical choice too: a bonus that pays for hitting a target by any means can encourage harm to customers, staff or the future of the business.',
  examMatters: 'If the case gives pay figures, calculate the ratio or the percentage rise and use it in the argument. A widening gap measured from the case is application; "executives are paid too much" is assertion.',
  recall: {
    type: 'fillin',
    prompt: 'Work out the pay ratio:',
    template: [
      'A chief executive paid RM2.4m a year, where the median worker earns RM40,000, has a pay ratio of ___ to 1.',
    ],
    answers: ['60'],
    hints: ['divide the top pay by the pay of the middle earner'],
    distractors: ['6', '600'],
  },
});

const csr = sub('corporate-social-responsibility', {
  title: 'Corporate Social Responsibility (CSR)',
  keyIdea: 'Corporate social responsibility is a business choosing to take account of its effects on society and the environment, beyond what the law requires.',
  body: [
    p('**Corporate social responsibility (CSR)** is a business voluntarily taking responsibility for its effects on society and the environment, beyond what the law requires. Obeying the law is the minimum; CSR is what a business chooses to do on top of it.'),
    p('CSR covers how a business treats its workforce and supply chain, its environmental conduct (emissions, waste, where its raw materials come from) and its part in the community. Where ethics asks whether a particular decision is right, CSR is the business\'s continuing policy across the whole range of its effects.'),
    p(`For ${F.name}, a CSR policy might commit it to certified palm oil, to less plastic in its packaging and to taking on apprentices in ${F.oldSite} even as the old factory closes.`),
    p('**Why firms adopt it.** CSR can protect reputation, win customers and retailers who choose responsible suppliers, attract staff who want to work for such a firm, and reduce the risk of tighter regulation. **The limits.** It costs money that could go to shareholders; its benefits are hard to measure; and a policy that promises more than the business does is soon exposed. That gap, which critics call greenwashing, can do more damage than having no policy at all.'),
  ],
  realExample: { emoji: '🥛', text: 'A dairy company in Kenya pays for vets to visit the smallholder farms that supply it, and publishes an audited account each year of the milk it buys and what it pays. Buyers can check the claims rather than take them on trust.' },
  misconception: 'Students write that CSR is charity. Some CSR is giving, but most is how the business runs its own operations (its sourcing, waste and treatment of staff), and firms adopt it partly because it serves their own interests.',
  examMatters: 'Judge a CSR policy on whether it changes what the business actually does, and what that costs, not on what it says. Evidence such as audited results or changed sourcing is what makes a CSR claim credible.',
  recall: {
    type: 'classify',
    prompt: 'Sort each action by whether the law requires it or the business chooses it (CSR):',
    groups: [
      { name: 'Required by law', items: ['Paying at least the legal minimum wage', 'Keeping emissions within the limits of a permit', 'Paying the tax that is owed'], why: 'The business must do these whatever it prefers, so they are the minimum, not CSR.' },
      { name: 'Chosen: CSR', items: ['Paying cocoa farmers above the market price', 'Planting trees to offset the firm\'s emissions', 'Funding scholarships for local students'], why: 'The business chooses these beyond what the law demands, which is what makes them CSR.' },
    ],
  },
});

/* ══ The deck ═════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [strongWeak, powerRole, taskPerson],
    takeaway: [
      'A strong culture is widely shared; whether it is good depends on its values.',
      'Power, role, task, person: ask who decides, and by what authority.',
      'Most firms mix types; judge each part by the work it does.',
    ],
  },
  {
    title: B2,
    subs: [formed, resist, worked],
    takeaway: [
      'Culture forms from founders, history, hiring, rewards, country and industry.',
      'Change is resisted by those who lose, by past success and by old systems.',
      'Change the rewards and the leaders\' behaviour, not just the words.',
    ],
  },
  {
    title: B3,
    subs: [internalExternal, objectives, models, conflict],
    takeaway: [
      'Internal stakeholders work within the firm; external ones are outside it.',
      'Shareholder model: returns first. Stakeholder model: weigh every group.',
      'Profit and wider objectives clash; judge whose interest weighs most here.',
    ],
  },
  {
    title: B4,
    subs: [tradeOffs, pay, csr],
    takeaway: [
      'Ethics often costs profit; size the trade-off before judging it.',
      'Pay is an ethical choice: the size of the gap and what bonuses reward.',
      'CSR goes beyond the law; judge it by what changes, not what is claimed.',
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
 * THE LEAF MAP, BY HAND. 15 leaves at `bus_spec.txt:1188-1211` (17 rows in `spec-items.json`).
 * Every ledger id's corrected citation runs through this table rather than through its "3.4.x".
 */
export const LEAF_MAP = {
  'BUS-3.3.4-1a': ['strong-and-weak-cultures'],
  'BUS-3.3.4-1b-1': ['power-and-role-cultures'],
  'BUS-3.3.4-1b-2': ['power-and-role-cultures'],
  'BUS-3.3.4-1b-3': ['task-and-person-cultures'],
  'BUS-3.3.4-1b-4': ['task-and-person-cultures'],
  'BUS-3.3.4-1c': ['how-culture-is-formed'],
  'BUS-3.3.4-1d': ['why-established-cultures-resist-change', 'can-a-culture-be-changed'],
  'BUS-3.3.4-2a': ['internal-and-external-stakeholders'],
  'BUS-3.3.4-2b': ['stakeholder-objectives'],
  'BUS-3.3.4-2c-1': ['shareholder-and-stakeholder-models'],
  'BUS-3.3.4-2c-2': ['shareholder-and-stakeholder-models'],
  'BUS-3.3.4-2d': ['conflict-between-profit-and-wider-objectives'],
  'BUS-3.3.4-3a': ['trade-offs-between-profit-and-ethics'],
  'BUS-3.3.4-3b': ['pay-and-rewards'],
  'BUS-3.3.4-3c': ['corporate-social-responsibility'],
};

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, TITLED AS THE CHAPTER (`depth.notes-titles` by construction), with no
 * misconception field, so none can repeat a subsection's.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3.3.4 · 1a-1b',
    keyIdea: 'Culture is how things are done in a business. Its strength is how widely it is shared; its type is where power sits.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Corporate culture</strong> — the shared values, beliefs and habits that decide how things are done in a business.'),
        def('<strong>Strong culture</strong> — values widely shared and deeply held. <strong>Weak culture</strong> — no dominant set of values; behaviour varies.'),
        def('<strong>Power</strong> — decisions from one central person. <strong>Role</strong> — authority from job titles and procedures. <strong>Task</strong> — project teams led by expertise. <strong>Person</strong> — the organisation serves independent experts.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Strong culture: fast, consistent decisions — and slow to see a changed market if the values no longer fit.'),
        mech('Power culture: fast while small; a bottleneck as the firm grows. Role culture: consistent and safe; slow to change.'),
        link('Judge a culture by its fit with the work and the decision, not by its strength alone.'),
      ] },
    ],
    takeaway: ['Strong is not the same as good.', 'Who decides, and by what authority?', 'Most firms mix types.'],
  },
  {
    title: B2,
    meta: '3.3.4 · 1c-1d',
    keyIdea: 'Culture forms from a handful of sources that reinforce each other, which is exactly why an established culture is hard to change.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Sources of culture</strong> — the founder and leaders; history and past success; recruitment, promotion and rewards; the country and the industry.'),
        def('<strong>Difficulties in changing culture</strong> — loss of status for those who rose under it; past success as "proof"; systems that still reward the old ways; time and scale.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Founder\'s values → who is hired and promoted → what is rewarded → success seems to prove it → the values are defended.'),
        mech('A new values statement with unchanged pay and promotion rules changes little: staff do what is rewarded.'),
        link('Culture is also a key factor in managing change (3.3.6).'),
      ] },
    ],
    takeaway: ['Rewards show what really counts.', 'Those who lose, resist.', 'Change the systems, not just the words.'],
  },
  {
    title: B3,
    meta: '3.3.4 · 2a-2d',
    keyIdea: 'Who the stakeholders are, what each wants, the two models of whose interests come first, and where profit and wider objectives clash.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Internal stakeholders</strong> — employees and managers (and owner-managers). <strong>External stakeholders</strong> — customers, suppliers, lenders, the local community, government, pressure groups. Shareholders are classed either way, with a reason.'),
        def('<strong>Shareholder model</strong> — the business should focus purely on shareholder returns: share price and dividends.'),
        def('<strong>Stakeholder model</strong> — the business should consider all of its stakeholders in its decisions and objectives.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Conflict: closing the ${F.oldSite} factory saves ${rmm(F.closureSaving)} a year (profit ${rmm(F.profit)} → ${rmm(F.profitAfterClosure)}) and costs ${units(F.jobs)} jobs.`),
        mech('Objectives overlap (survival, growth) and clash (how the profit is shared).'),
        link('Stakeholder conflicts at a global scale are 4.3.4.'),
      ] },
    ],
    takeaway: ['Inside or outside?', 'Returns first, or every group weighed?', 'Whose interest weighs most here?'],
  },
  {
    title: B4,
    meta: '3.3.4 · 3a-3c',
    keyIdea: 'Ethics asks what is right as well as legal; it often costs profit, shapes how people are paid, and becomes policy as CSR.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Business ethics</strong> — the moral principles that guide how a business behaves: what is right, not only what is legal.'),
        def('<strong>Pay ratio</strong> — the chief executive\'s pay ÷ the median employee\'s pay.'),
        def('<strong>Corporate social responsibility (CSR)</strong> — voluntarily taking account of the business\'s effects on society and the environment, beyond the law.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Trade-off: certified palm oil costs ${rmm(F.oilCost)} a year, profit ${rmm(F.profit)} → ${rmm(F.profitWithOil)} (${pct(F.oilProfitFallPct)}); a ${pct(F.oilPriceRisePct)} price rise would cover it.`),
        mech(`Pay: ${rmm(F.ceoPay)} ÷ ${rm(F.medianPay)} = ${ratio(F.payRatio)}; with the ${rmm(F.bonus)} bonus, ${ratio(F.payRatioAfter)}.`),
        link('A bonus tied only to this year\'s profit can reward cutting what protects the future.'),
      ] },
    ],
    takeaway: ['Size the trade-off.', 'What does the bonus reward?', 'Judge CSR by what changes.'],
  },
];
