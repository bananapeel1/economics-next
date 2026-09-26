/**
 * PACKET 53 — influences-business-decisions assessment: the quiz bank, the practice set, the
 * flashcards, the common mistakes and the extras.
 *
 * ── THE BANK ───────────────────────────────────────────────────────────────
 *
 * The live bank was 9 items. Every item below is tagged with the chapter that teaches it; the runner
 * derives `quizIndices` from the tag (`structure-05`). Keys are written first and DEALT into a position
 * from a hash of the stem (packet 36), and no explanation names an option by letter or position.
 *
 *   - `quiz-01` / `topFix-05`: the live "3-5 years" item (a figure sourced to "experts", taught
 *     nowhere) is gone. Its replacement is on 1d, why changing a culture takes years. The item's
 *     alternative, "a Mendelow quadrant or short-termism question", is refused: short-termism is UK
 *     GCE 3.4.1, and the Mendelow grid is an aside that is never assessed.
 *   - No quiz, practice, flashcard, recall or mistake names Handy, Mendelow, Friedman, Freeman,
 *     greenwashing or groupthink (DECISIONS: an aside is never assessed). The runner enforces it.
 *   - THE CHECK-IN RULE (CONTENT-GATE, 26 Sep). A block's pinned items are written about what that
 *     block's diagram does NOT show: chapter 1's diagram draws the four types, so its items are on
 *     strong and weak cultures and the type-naming items are the unpinned pre-test; chapter 3's draws
 *     who is internal and external, so its items are on objectives, the models and conflict.
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * DECISIONS.md Settled, 26 Sep 2026: practice is shaped like the real paper for the topic's unit.
 * 3.3.4 is Unit 3 (WBS13): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and Sections
 * B and C are one 20-mark Evaluate essay each, from sources (`audit/raw/ial-paper-structure.json`,
 * business.units_3_4). So seven items on ONE source, `EXTRACT`.
 *
 *   - `practice-01`: the live Assess 10 on short-termism is gone (off-specification, and 10 is the
 *     Units 1-2 Assess tariff). Every stem names Orvana and sits on its source.
 *   - `topFix-05`: Carroll's pyramid is gone from every guidance (banned by the runner); the stems of
 *     the live practice 3 and 5 are replaced by stems anchored to the source.
 *   - The guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`,
 *     CONTENT-GATE step 6); the live items were one paragraph each.
 *   - `Discuss` asks for a brief assessment and never a conclusion (V036).
 */
import { id, hash8, FIRM, rm, rmm, units, pct, ratio } from './_packet53-util.mjs';
import { B1, B2, B3, B4 } from './_packet53-content.mjs';

const F = FIRM;

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
  qi(null, 'In which culture do decisions depend mainly on one person at the centre, often the founder?',
    ['a power culture', 'a role culture', 'a task culture', 'a person culture'],
    'When decisions radiate from one central individual, the culture is a power culture. A role culture takes its authority from job titles and procedures, a task culture from expertise on a project, and a person culture exists to serve independent professionals.'),
  qi(null, 'A large insurance company where every job follows a written procedure and authority comes from job grade most likely has:',
    ['a role culture', 'a power culture', 'a task culture', 'a person culture'],
    'Authority that comes from the job and the procedure, rather than from an individual or from expertise, is what defines a role culture. It suits large, stable operations that need consistency.'),
  qi(null, 'A group of specialists is brought together to develop one new product and then disbanded. This is typical of:',
    ['a task culture', 'a role culture', 'a power culture', 'a person culture'],
    'Teams formed around a job and broken up when it is done, led by expertise rather than rank, are the mark of a task culture. Nothing here depends on one central figure, on fixed procedures or on serving independent professionals.'),

  /* ── Chapter 1: strong and weak cultures (the chapter's diagram draws the four types) ── */
  qi(B1, 'A strong corporate culture is one in which:',
    ['values are widely shared and deeply held', 'the founder makes every important decision', 'staff follow a detailed rule book', 'profits are higher than rivals\''],
    'Strength describes how widely and deeply values are shared. It says nothing about who decides, whether there is a rule book, or how profitable the business is; a strong culture can hold values that hurt profit.'),
  qi(B1, 'Why can a strong culture become a disadvantage?',
    ['shared beliefs slow its response to a changed market', 'staff disagree about how to treat customers', 'each department develops its own values', 'decisions take longer because values differ'],
    'When nearly everyone holds the same beliefs, few people question them, so a change in the market is seen late and resisted. Disagreement between staff and departments describes a weak culture, not a strong one.'),
  qi(B1, 'In a business with a weak culture, you would most expect:',
    ['behaviour to vary from one department to another', 'staff to act alike without supervision', 'newcomers to learn the norms within days', 'decisions to be quick because everyone agrees'],
    'Without a dominant set of values, each part of the business behaves in its own way. Acting alike unsupervised, learning the norms quickly and fast agreement are all signs of a strong culture.'),
  qi(B1, 'A firm\'s staff all share a deep belief in caution. Calling its culture strong tells you:',
    ['how widely it is held, not whether it is right', 'that the culture will improve its profits', 'that the firm has a power culture', 'that the culture will be easy to change'],
    'Strength measures how widely and deeply values are held. Whether caution helps depends on the market; the type of culture is a separate question; and a strongly held belief is harder, not easier, to change.'),

  /* ── Chapter 2: forming and changing a culture ── */
  qi(B2, 'A founder-led snack maker grows from 40 staff to 4,000 across six factories. Its culture is most likely to move:',
    ['from a power culture towards a role culture', 'from a role culture towards a power culture', 'from a person culture towards a task culture', 'from a task culture towards a person culture'],
    'One person cannot decide everything for thousands of staff, so procedures, job descriptions and layers of managers take over: authority shifts from the founder to the role. Growth rarely pushes a firm the other way.'),
  qi(B2, 'Staff at one branch of a firm rarely question a manager, while staff at another branch in a different country argue openly. The difference most likely comes from:',
    ['national attitudes to authority', 'the firm\'s mission statement', 'the size of each branch\'s budget', 'the price of the firm\'s products'],
    'The country a business works in shapes its culture, including how far staff defer to a boss. A single mission statement cannot explain a difference between branches, and budgets and prices do not form attitudes to authority.'),
  qi(B2, 'Which of these is a difficulty in changing an established culture?',
    ['managers who rose under the old ways stand to lose status', 'new staff have no habits to unlearn', 'a crisis makes the need for change obvious', 'leaders start working in the new way themselves'],
    'People whose position depends on the old culture have most reason to resist, and often most power to do so. The other three make change easier, not harder.'),
  qi(B2, 'Why does changing a culture usually take years rather than months?',
    ['it lives in daily habits that change only as people do', 'the law requires a long consultation first', 'values statements take years to write', 'shareholders must approve it at a meeting'],
    'A culture is held in thousands of everyday habits, and habits change slowly, person by person. No law, drafting process or shareholder vote sets the pace.'),

  /* ── Chapter 3: objectives, the two models and conflict (the diagram draws who is internal and external) ── */
  qi(B3, 'Which objective is a supplier most likely to have?',
    ['regular orders and prompt payment', 'a rising share price', 'safe working hours', 'less traffic near its homes'],
    'A supplier depends on the business as a customer, so it wants steady orders and to be paid on time. A rising share price is an owner\'s objective, safe hours an employee\'s, and less traffic the local community\'s.'),
  qi(B3, 'According to the shareholder model, a business should take decisions mainly to:',
    ['increase the share price and dividends', 'balance the interests of every group it affects', 'protect every job it currently provides', 'keep its prices as low as possible'],
    'The shareholder model says a business should focus purely on returns to its owners. Weighing every group is the stakeholder model, and protecting jobs or cutting prices would serve employees or customers ahead of owners.'),
  qi(B3, 'A board delays closing a loss-making branch so that it can retrain and transfer the branch\'s staff first. This is most consistent with:',
    ['the stakeholder model', 'the shareholder model', 'a power culture', 'a person culture'],
    'Accepting a cost to protect employees means weighing a group other than the owners, which is the stakeholder model. A shareholder-model board would close the branch as soon as that raised returns; the culture types describe where power sits, not whose interests are served.'),
  qi(B3, 'How can closing a factory end up costing some of the profit it was meant to raise?',
    ['remaining staff lose trust and work less well', 'the machines in the closed factory lose value', 'customers are charged less for the product', 'the government must approve every closure'],
    'Staff who fear they are next may put in less effort or leave, which lowers productivity and eats into the saving. The other options are not effects that follow from closing a site.'),
  qi(B3, 'A factory plans to run a night shift for the first time. Which group is most likely to object?',
    ['residents living next to the factory', 'workers who want paid overtime', 'the firm\'s shareholders', 'the firm\'s customers'],
    'Night work brings noise and traffic at night, which conflicts with neighbours\' wish for quiet. Workers gain overtime, owners gain output, and customers gain supply.'),

  /* ── Chapter 4: business ethics ── */
  qi(B4, 'Business ethics is best described as:',
    ['deciding what is morally right, not only what is legal', 'obeying every law that applies to the firm', 'making as much profit as the law allows', 'giving part of the firm\'s profit to charity'],
    'Ethics is about moral principle, which can ask more than the law. Obeying the law is the minimum, profit-seeking within the law is not a moral test, and giving to charity is only one possible expression of ethics.'),
  qi(B4, 'A firm switches to responsibly sourced cotton, which costs RM3m more a year. Its profit was RM12m. By what percentage does profit fall?',
    ['25%', '4%', '33%', '75%'],
    'The extra cost divided by the original profit, times 100, gives the fall: 3 ÷ 12 × 100. Dividing by the new profit of RM9m overstates it, dividing profit by cost gives a ratio rather than a percentage, and the share of profit that remains is not the fall.'),
  qi(B4, 'A chief executive is paid RM1.5m a year and the median employee RM50,000. The pay ratio is:',
    ['30 to 1', '3 to 1', '300 to 1', '50 to 1'],
    'The ratio divides the chief executive\'s pay by the median employee\'s: 1,500,000 ÷ 50,000. Misplacing a zero gives the answers ten times too small or too large.'),
  qi(B4, 'Why might a bonus based only on this year\'s profit be judged unethical?',
    ['it can reward cuts to safety and training', 'bonuses based on profit are against the law', 'it reduces the dividends paid to owners', 'it cannot be paid in shares'],
    'If only this year\'s profit counts, cutting spending that protects staff and the business later raises the reward. Profit bonuses are legal, a bonus need not cut dividends, and it can be paid in shares.'),
  qi(B4, 'Which of these is an example of corporate social responsibility?',
    ['funding a clinic for families near its plantation', 'keeping emissions within its permit', 'paying the legal minimum wage', 'filing its accounts on time'],
    'CSR is what a business chooses to do beyond the law. Staying within a permit, paying the legal minimum and filing accounts are legal duties, so they are the minimum rather than CSR.'),
  qi(B4, 'A company advertises itself as caring for the environment while its factories keep polluting. The main risk to the business is that:',
    ['exposure costs more trust than making no claim', 'it will be forced to stop advertising', 'its costs will rise immediately', 'its shareholders will receive higher dividends'],
    'A claim the business does not live up to invites scrutiny, and once the gap is exposed customers and retailers trust it less than if it had said nothing. The other outcomes do not follow from the claim.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

/*
 * THE SOURCE. One extract carries every item, so a student meets the same firm seven times. Every
 * figure the items need is here.
 */
export const EXTRACT = `Source A. ${F.name} is a Malaysian snack maker listed on the stock exchange, with ${units(F.staff)} staff and yearly sales of ${rmm(F.sales)}. Its founder built the business from one rented shop and still approves every new product; managers who carried out the founder's instructions have been promoted, and a culture of thrift runs through the firm. A new chief executive from outside the company wants new products developed by teams of specialists who decide for themselves. The board is considering closing the older factory in ${F.oldSite}, where ${units(F.jobs)} people work, and moving production to an automated plant in ${F.newSite}: this would save ${rmm(F.closureSaving)} a year for a one-off cost of ${rmm(F.closureCost)}. Profit last year was ${rmm(F.profit)}. ${F.name} buys ${units(F.oilTonnes)} tonnes of palm oil a year, and certified sustainable oil costs ${rm(F.oilPremium)} a tonne more. The chief executive is paid ${rmm(F.ceoPay)} a year; the median employee earns ${rm(F.medianPay)}, and the lowest-paid factory workers earn ${rm(F.lowPay)}. The board proposes a ${rmm(F.bonus)} bonus for the chief executive if this year's profit target is met.`;

export const PRACTICE = [
  pr(B2, 'Explain', 4, `${EXTRACT} Explain one difficulty ${F.name}'s new chief executive may face in changing its culture. (4 marks)`,
    'The question asks for ONE difficulty, so choose the one the source gives most evidence for and develop it rather than listing several. Say who is affected, why they would resist, and what that does to the change.\n'
    + `Knowledge: a difficulty in changing an established culture, such as resistance from those who gained status under it (1 mark). Application: managers at ${F.name} were promoted for carrying out the founder's instructions, and the founder still approves every product (1 mark). Analysis: teams deciding for themselves take control away from those managers, so they have reason to slow or block the change (1 mark). Analysis: if the founder or managers overrule the teams, staff learn that the old way still counts and the change stalls (1 mark). An answer that describes what a task culture is, without a difficulty, scores the knowledge mark at most.`),

  /*
   * Fix round 1 (C-…-specGap-07): this item used to ask for the MEDIAN ratio, which the body (3b), the
   * notes and the chapter-4 diagram all print (100 and 125 to 1) directly above it at the check-in.
   * It now asks the same concept with its own figures (packet 44's model): the lowest-paid workers.
   * Every figure the scheme reaches (160, 40, 200) is absent from the diagram's surfaces; the runner
   * checks that for every pinned practice item, not only quiz keys.
   */
  pr(B4, 'Calculate', 4, `${EXTRACT} Calculate the ratio of ${F.name}'s chief executive's pay to the pay of its lowest-paid factory workers, before and after the proposed bonus. (4 marks)`,
    'Work out the ratio before the bonus first, dividing the larger pay by the smaller, and show the division on its own line. The new ratio must include the pay the chief executive already receives, not just the bonus. State both answers in the form "to 1".\n'
    + `Before: ${rmm(F.ceoPay)} ÷ ${rm(F.lowPay)} (1 mark) = ${ratio(F.lowRatio)} (1 mark). After: the bonus adds ${rmm(F.bonus)} ÷ ${rm(F.lowPay)} = ${units(F.lowRatioRise)} to the ratio (1 mark), so it becomes ${units(F.lowRatio)} + ${units(F.lowRatioRise)} = ${ratio(F.lowRatioAfter)} (1 mark). Adding the bonus to the chief executive's pay and dividing again gives the same answer. Stopping at ${ratio(F.lowRatioRise)} gives the increase, not the new ratio; using the median employee's pay answers a different question.`),

  pr(B1, 'Discuss', 8, `${EXTRACT} Discuss the likely effects of ${F.name}'s culture on its decisions as the business grows. (8 marks)`,
    'Start by identifying the culture the source describes: who decides, and how widely the values are shared. Then think about what that culture does to decisions now, and what changes as the firm gets bigger. Leave space for a brief assessment of how much it matters.\n'
    + `Level 1: describes culture in general terms, with little use of the source. Level 2: identifies a power culture (the founder approves every product) and a strong culture of thrift, with some application to ${F.name}. Level 3: analysis of effects — decisions reflect one person's judgement and can be fast, and thrift keeps costs low; but with ${units(F.staff)} staff every product decision waits for the founder, and proposals that cost money now meet suspicion, which slows the new products the chief executive wants. Level 4: a brief assessment weighing these effects, for example that the culture served a small firm well but becomes a constraint as it grows, and that the strength of the thrift culture makes the effect larger. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B3, 'Assess', 12, `${EXTRACT} Assess the likely influence of different stakeholders on ${F.name}'s decision whether to close the ${F.oldSite} factory. (12 marks)`,
    'Choose the stakeholders the source gives evidence for, say what each wants from this decision, and consider how much each can actually affect it. Decide before you write which group\'s influence you think will be greatest, because this command word needs a supported judgement rather than a list.\n'
    + `Level 1: knowledge of stakeholders or their objectives, described generally. Level 2: application to ${F.name} — shareholders gain from a ${rmm(F.closureSaving)} yearly saving that lifts profit from ${rmm(F.profit)} to ${rmm(F.profitAfterClosure)}; the ${units(F.jobs)} workers in ${F.oldSite} lose their jobs; the town and local suppliers lose income. Level 3: analysis of both sides — as a listed company, shareholders can vote on the board and sell shares, so their influence is direct; workers and the community can protest, and bad publicity may affect customers and the remaining staff, but their influence is indirect. Level 4: evaluation reaching a supported judgement, for example that shareholders are likely to have the greatest influence because the saving recovers its cost quickly, but that employee and community reaction may shape how the closure is carried out.\n`
    + 'A strong answer, in outline: shareholders favour the saving and have direct power; workers and the town oppose it but mostly through reputation; so shareholders are likely to decide whether the factory closes, and the other stakeholders how.'),

  pr(B4, 'Assess', 12, `${EXTRACT} Assess whether ${F.name} should switch to certified sustainable palm oil. (12 marks)`,
    'Start by putting a size on the cost using the source, then compare it with what the business earns and what it might gain. Weigh the ethical case against the commercial one, and decide what your judgement turns on.\n'
    + `Level 1: knowledge of business ethics or CSR, described generally. Level 2: application — ${units(F.oilTonnes)} tonnes × ${rm(F.oilPremium)} = ${rmm(F.oilCost)} a year, cutting profit from ${rmm(F.profit)} to ${rmm(F.profitWithOil)}, a ${pct(F.oilProfitFallPct)} fall. Level 3: analysis of both sides — certified oil avoids the harm of forest clearing, protects the brand and may be required by retailers abroad, and a ${pct(F.oilPriceRisePct)} price rise on ${rmm(F.sales)} of sales would cover it; against that, shareholders lose ${rmm(F.oilCost)} a year if the price cannot rise, and a thrifty culture may resist the cost. Level 4: evaluation reaching a supported judgement, for example that the switch is justified because the cost is small relative to sales and the risk of a sourcing scandal is large, provided rivals do not undercut on price.\n`
    + 'A strong answer, in outline: the cost is a tenth of profit but only a small price rise; the ethical and reputational gains are real; so the switch is worth making, and the judgement depends on whether customers accept the price.'),

  pr(B2, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.name}'s new chief executive is likely to succeed in changing its culture. (20 marks)`,
    'Identify the culture the chief executive inherits and the one wanted, then weigh the forces working against the change against the conditions that could make it work. Finish with a judgement that says what the outcome depends on.\n'
    + `Level 1: describes culture or change in general terms, with little reference to the source. Level 2: knowledge and application — a power culture centred on the founder and a strong culture of thrift, against a wish for a task culture in which specialist teams decide for themselves. Level 3: analysis of both sides — managers promoted for carrying out the founder's instructions lose status; the founder still approves every product and can point to the firm's record; thrift makes experimenting feel wasteful; against this, the chief executive can change who is promoted and how teams are rewarded, and rivals launching new products give a visible reason to change. Level 4: evaluation reaching a supported judgement — for example, that change is likely in the product team, where the chief executive controls hiring and rewards, but slow elsewhere, and that success depends most on whether the founder visibly backs it.\n`
    + 'A strong answer, in outline: the difficulties are status, the founder\'s authority and a strong opposing culture; the levers are promotion, rewards and a visible need to change; the chief executive is likely to succeed in part of the business, and the founder\'s support is the condition for wider success.'),

  pr(B3, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.name} should follow the shareholder model or the stakeholder model in deciding whether to close the ${F.oldSite} factory. (20 marks)`,
    'Work out what each model would lead the board to decide, using the source, and what each decision would cost and gain. Then judge which approach serves the business better here, and say what would change your conclusion.\n'
    + `Level 1: describes the two models in general terms. Level 2: knowledge and application — the shareholder model supports closure: ${rmm(F.closureSaving)} a year saved, profit from ${rmm(F.profit)} to ${rmm(F.profitAfterClosure)}, the ${rmm(F.closureCost)} cost recovered in about sixteen months; the stakeholder model weighs the ${units(F.jobs)} jobs, local suppliers and the town. Level 3: analysis — closure raises returns but may damage trust among the remaining ${units(F.staff - F.jobs)} staff and the firm's reputation, eroding part of the saving; a stakeholder approach might close the factory more slowly, with transfers and retraining, at the cost of some of the saving. Level 4: evaluation reaching a supported judgement, for example that the two models point to the same closure but different ways of carrying it out, and that a stakeholder approach protects the saving the shareholder model is after.\n`
    + 'A strong answer, in outline: the shareholder model says close now; the stakeholder model says weigh the jobs and the town; closing with transfers and retraining serves both better than either extreme, unless the firm\'s survival depends on the full saving at once.'),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is corporate culture?', 'The shared values, beliefs and habits that decide how things are done in a business.'),
  fc('What is a strong culture?', 'One where values are widely shared and deeply held, so staff act on them without being told.'),
  fc('What is a weak culture?', 'One with no dominant set of values, so behaviour varies between people and departments and rules have to do more of the work.'),
  fc('Is a strong culture always a good thing?', 'No. Strength measures how widely values are held, not whether they are right. A strong culture that no longer fits the market makes the firm slow to change.'),
  fc('What is a power culture?', 'Decisions radiate from one person or small group at the centre, usually the founder or owner. Fast while small; a bottleneck as the firm grows.'),
  fc('What is a role culture?', 'Authority comes from job titles, procedures and a clear hierarchy. Consistent and safe for large operations; slow to change.'),
  fc('What is a task culture?', 'Teams form around a project and are led by expertise, not rank. Suits new, varied work; costly and hard to control.'),
  fc('What is a person culture?', 'The organisation exists to serve independent professionals, such as a partnership of lawyers or doctors.'),
  fc('How is corporate culture formed?', 'From the founder and leaders; the firm\'s history and past success; who it recruits, promotes and rewards; and the country and industry it works in.'),
  fc('Why do rewards shape culture so strongly?', 'People do what is paid for and promoted. A firm that rewards volume gets a culture of volume, whatever it says about quality.'),
  fc('Why is an established culture hard to change?', 'Those who rose under it lose status; past success seems to prove it right; systems still reward the old ways; and habits change slowly across many people and sites.'),
  fc('What makes culture change more likely to succeed?', 'A visible need to change, leaders who behave in the new way, and recruitment, promotion and pay rules rewritten to reward the new behaviour.'),
  fc('What is a stakeholder?', 'Any individual or group with an interest in a business, because they are affected by its decisions or can affect them.'),
  fc('Name the internal stakeholders.', 'Employees and managers, and owners who run the business themselves.'),
  fc('Name the external stakeholders.', 'Customers, suppliers, lenders, the local community, government and pressure groups.'),
  fc('Are shareholders internal or external?', 'Either, with a reason: they own the company, but in a large listed company most play no part in running it.'),
  fc('What do shareholders and employees each want?', 'Shareholders: a rising share price and dividends. Employees: fair pay, job security, safe conditions and progression.'),
  fc('What does the shareholder model say?', 'A business should focus purely on shareholder returns — increasing the share price and dividends — in its decisions and objectives.'),
  fc('What does the stakeholder model say?', 'A business should consider all of its stakeholders in its decisions and objectives.'),
  fc('Where do profit-based and wider objectives conflict?', 'Wherever a decision that raises profit costs another group: closing a site, cutting pay or suppliers\' prices, or cheaper but more harmful inputs.'),
  fc('What is business ethics?', 'The moral principles that guide how a business behaves: deciding what is right, not only what is legal.'),
  fc('What is a trade-off between profit and ethics?', 'A strategic choice where the ethical option costs profit, at least at first, and the cheaper option harms someone.'),
  fc('How do you size an ethical trade-off?', 'Express the extra cost as a share of profit, or as the price rise needed to cover it, and weigh that against the gains and risks.'),
  fc('What is a pay ratio?', 'The chief executive\'s pay divided by the median employee\'s pay, written "to 1".'),
  fc('Why is the design of a bonus an ethical issue?', 'A bonus tied only to one year\'s profit can reward cutting safety, training and maintenance. Wider targets or deferred shares reward what the business actually wants.'),
  fc('What is corporate social responsibility (CSR)?', 'A business voluntarily taking account of its effects on society and the environment, beyond what the law requires.'),
  fc('Why do firms adopt CSR, and what are its limits?', 'It can protect reputation, win customers and staff, and reduce regulation risk; but it costs money, is hard to measure, and a claim the firm does not live up to can backfire.'),
];

/* ══ Common mistakes — the fields MistakesTab.jsx reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Confusing a strong culture with a good one',
    'Writing that a business with a strong culture is bound to perform well.',
    'Strength is how widely values are shared. If the values no longer suit the market, a strong culture makes the business slower to change than a weak one would.',
    'Say what the culture\'s values are and whether they fit the decision in the case, then use its strength to explain how fast it will respond.'),
  mk('Naming a culture type with no evidence',
    'Stating that a firm "has a role culture" and moving straight on.',
    'The type is shown by who makes decisions and by what authority. Without that evidence from the case, the label is only knowledge.',
    'Quote the evidence (who approves decisions, what procedures exist) and explain what the type does to the decision asked about.'),
  mk('Assuming a new leader can switch culture overnight',
    'Arguing that a new chief executive or values statement will change the culture.',
    'Culture is held in habits and reinforced by recruitment, promotion and pay. Unless those systems and the leaders\' own behaviour change, staff keep the old ways.',
    'Identify which system in the case still rewards the old culture, and make your judgement depend on whether it changes.'),
  mk('Listing every stakeholder instead of the ones that matter',
    'Naming employees, customers, suppliers, government, the community and lenders in every answer.',
    'Only the stakeholders the decision in the case actually affects are relevant, and each needs its objective and its influence explained.',
    'Choose two or three stakeholders the case gives evidence for and develop each one in context.'),
  mk('Treating the stakeholder model as ignoring profit',
    'Writing that a stakeholder-model business does not care about profit.',
    'The stakeholder model weighs profit against other interests; the business still needs profit to survive, and shareholders are stakeholders too.',
    'Show what each model would lead the business in the case to decide, rather than describing the models in general.'),
  mk('Asserting the ethical choice without sizing its cost',
    'Arguing that a business should "always do the right thing" whatever it costs.',
    'Ethical choices often cost profit, and whether they pay back depends on customers, rivals and risk. The judgement has to weigh the size of the cost.',
    'Use the case\'s figures to express the cost as a share of profit or as a price rise, then weigh it.'),
  mk('Describing CSR as charity',
    'Defining CSR as the donations a business makes to good causes.',
    'CSR is mostly about how the business runs its own operations, beyond what the law requires: its sourcing, waste and treatment of staff and suppliers.',
    'Judge a CSR policy by what it changes in the business and what that costs, not by what is claimed.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The first chain is what the one reorder drills (`reorder.source` finds a sequence the section
 * teaches in an extras chain, in the same order). It sits on the Extras tab, not on the recall's own
 * step, so the recall is not answerable by scrolling up.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'How a founder\'s value becomes a company culture',
      steps: [
        'A founder acts on a personal value, such as never wasting money.',
        'Early employees are hired and moved up for sharing that value.',
        'Surviving a hard period, the firm gives the value the credit.',
        'Newcomers absorb the value as simply how things are done.',
      ],
      result: 'By the time the founder has gone, the value no longer needs anyone to enforce it, which is also why it is hard to change.',
    },
    {
      title: 'How a factory closure can eat into its own saving',
      steps: [
        `The closure is announced and ${units(F.jobs)} jobs go in ${F.oldSite}.`,
        'Staff at other sites fear they will be next, and trust falls.',
        'Effort falls and some experienced staff leave for other employers.',
        'Productivity drops, and part of the expected saving is lost.',
      ],
      result: 'Profit-based and wider objectives are less opposed than they look: how a closure is handled affects the profit it delivers.',
    },
    {
      title: 'From a profit-only bonus to a weaker business',
      steps: [
        'A chief executive\'s bonus depends only on this year\'s profit.',
        'Spending on maintenance, training and safety is cut to hit the target.',
        'Profit rises this year and the bonus is paid.',
        'Breakdowns, skill gaps and accidents arrive in later years.',
      ],
      result: 'The design of a reward is an ethical choice: it decides what behaviour the business pays for.',
    },
    {
      title: 'How certified palm oil can pay for itself',
      steps: [
        `${F.name} pays ${rmm(F.oilCost)} a year more for certified oil.`,
        'It can print the certification on its packs.',
        'Retailers that buy only from certified suppliers stock its snacks.',
        'The extra sales, and the scandal avoided, offset part of the cost.',
      ],
      result: 'The trade-off between profit and ethics is real, but its size depends on how customers and retailers respond.',
    },
  ],
  evaluation: [
    {
      title: 'Is a strong culture an asset or a liability?',
      content: `It depends on the values and the market. ${F.name}'s strong culture of thrift kept costs low for thirty years, which was an asset in a price-driven market. The same culture now greets every proposal that costs money today with suspicion, which is a liability when rivals are winning with new products. The strength of a culture multiplies the effect of its values, good or bad. So the judgement is not "strong or weak?" but "do these values fit what the business now has to do, and how quickly could they change if they do not?"`,
    },
    {
      title: 'Shareholder model or stakeholder model?',
      content: `Applied to ${F.name}'s factory, the two models agree more than they first appear to. The shareholder model says close ${F.oldSite}: the ${rmm(F.closureSaving)} yearly saving recovers its ${rmm(F.closureCost)} cost in about sixteen months. The stakeholder model counts the ${units(F.jobs)} jobs, the suppliers and the town. But a closure handled badly costs trust and productivity among the staff who remain, so a shareholder-minded board has its own reason to offer transfers and retraining. The models differ most when the firm cannot afford the gentler route; where it can, the stakeholder approach often protects the return the shareholder model wants.`,
    },
    {
      title: 'Is CSR worth what it costs?',
      content: `Certified palm oil would cost ${F.name} ${rmm(F.oilCost)} a year, ${pct(F.oilProfitFallPct)} of its profit. Three things decide whether that is worth it. THE CUSTOMERS: if shoppers and retailers will pay a ${pct(F.oilPriceRisePct)} higher price, the cost is covered. THE RISK: a sourcing scandal could cost more than years of the premium. THE RIVALS: if competitors undercut on price with cheaper oil, the cost is real and lasting. CSR is most clearly worth it where the risk it removes is large and customers can see what it changes; a policy that promises more than the business does is worse than none.`,
    },
  ],
};
