/**
 * PACKET 35 — entrepreneurs-leaders content: five blocks, twenty-five subsections, one per step.
 *
 * `audit/raw/bus_spec.txt:760-788`. The block order is the specification's own, with sub-topic 1
 * split in two: its five leaves are a third of the topic and would otherwise make a chapter twice
 * the length of every other one. `structure-09` says the live order — role, motives, objectives,
 * choices — is already sensible, and it is kept; what changes is that risk, uncertainty and barriers
 * get a chapter of their own rather than three sentences at the end of the first.
 *
 * WHAT `structure-08` IS, AND WHY IT IS FIXED BY STRUCTURE RATHER THAN BY ADDING PARAGRAPHS. The
 * finding is that `notes[]` and `extras[]` cover profit satisficing and several other things that
 * `content[]` does not, so a student in Learn Mode never meets them while the quiz bank assumes
 * them. That is not a missing paragraph; it is two surfaces authored from different lists. Here
 * every surface is generated from `_packet35-util.mjs`, and the runner fails if a quiz item tests a
 * term no subsection teaches — so the defect is unrepresentable rather than corrected.
 *
 * THE RECALLS. `topFix-02` and `structure-04` between them are the most specific findings in the
 * packet: five of five fill-ins leak the answer's first letters in the hint, three hints have the
 * wrong number of underscores for their answer, six of seven reorders impose an order on concepts
 * that have none, and only two shuffle permutations are used across seven reorders, so the pattern
 * itself becomes learnable. All twelve are replaced. The rules the runner enforces:
 *
 *   - no hint may be a prefix of its answer, and no hint may encode its length;
 *   - a reorder only where the thing genuinely has an order — here, the sequence of setting a
 *     business up, and the steps of a calculation. Parallel concepts become `match` or `classify`;
 *   - every permutation distinct across the section;
 *   - and the one that does the real work: **no recall answerable by scrolling up.** Packet 29's
 *     Verify B found 24 of 43 steps failing this, all of them fill-ins whose template was the key
 *     idea with a word removed. A recall that asks for the profit at a price the student has to look
 *     up on the schedule cannot be answered by rereading the paragraph above it.
 *
 * `structure-03` is the step-pairing complaint — two subsections per step meant a recall appeared at
 * the foot of one step as `immediate` and at the head of the next as `spaced`, back to back. One
 * subsection is one step here (packets 16 and 17), so it cannot arise.
 */
import {
  SECTION, subId, money, qty, pct,
  FIRM, CHARACTERISTICS, BARRIERS, FINANCIAL_MOTIVES, NON_FINANCIAL_MOTIVES, OTHER_OBJECTIVES,
} from './_packet35-util.mjs';

const F = FIRM;

const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const blockId = (title) => `${SECTION}:block:${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const B1 = 'The Role of an Entrepreneur';
export const B2 = 'Risk, Uncertainty and Barriers';
export const B3 = 'Motives and Characteristics';
export const B4 = 'Business Objectives';
export const B5 = 'Business Choices';

/* ══ Block 1 — The role of an entrepreneur (1.3.5 · 1a, 1b, 1c) ═══════════ */

const whatEntrepreneursDo = (() => {
  const sid = subId('what-an-entrepreneur-is');
  return {
    id: sid,
    title: 'What an Entrepreneur Is',
    keyIdea: 'An entrepreneur takes the initiative to set up and run a business, bringing the resources together and carrying the financial risk of doing so.',
    body: [
      { type: 'paragraph', text: `The specification opens this topic with the **role**, at 1.3.5 · 1. It gives no form of words to learn — it lists what the person DOES, and the definition below is read off that list. An **entrepreneur** takes the initiative to set up and run a business, organising the resources it needs and bearing the financial risk that it may not work.` },
      { type: 'paragraph', text: `Two halves, both required. **Taking the initiative** means the business would not exist otherwise. **Bearing the financial risk** means that if it fails, the loss falls on them — their capital and their year.` },
      { type: 'paragraph', text: `Nothing in it requires the idea to be new. ${F.name}, ${F.what}, makes a product that has existed for centuries; its founder is an entrepreneur because she committed her own money and her own year, not because she invented the chair.` },
      { type: 'paragraph', text: `Innovation appears later, at 1.3.5 · 1c, as one of the things entrepreneurs do — and as something that happens inside established firms too. It is part of the role, not a test of entry to it.\n\nA note on the title: this topic is called "Entrepreneurs and leaders", but the leadership a Unit 1 student needs sits at 1.3.4 and is taught in **Managing People**.` },
    ],
    realExample: { emoji: '🪑', text: `Somebody who leaves salaried work, rents a unit and starts selling is an entrepreneur from the day the lease is signed, whatever the product is.` },
    misconception: `Students add a requirement the definition does not contain — usually "invents something new" — and deny the title to anybody running an ordinary business. The two requirements are initiative and financial risk; somebody with both meets it whether or not the idea is original.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase, and in this subject it carries two marks. Two marks means two separate things to say, so a definition that names the initiative and stops has said one of them.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Four people are involved in the same small workshop. Sort each by whether the definition makes them an entrepreneur:',
      groups: [
        { name: 'Meets the definition', items: ['The person who signed the lease with her own savings and runs the workshop', 'A machinist who left, borrowed against her house and opened a rival workshop'] },
        { name: 'Does not meet it', items: ['A relative who lent the workshop money at a fixed rate of interest', 'The workshop manager, who is paid a salary and decides the weekly schedule'] },
      ],
      why: [
        'Both took the initiative to begin and both stand to lose their own capital if the venture fails, which is the whole of the definition.',
        'The lender has one half and not the other: real money at risk, but they began nothing. The manager has NEITHER — deciding next week\'s schedule is not the initiative to START a business, and the loss on a bad year falls on somebody else. One half is not enough, and the manager does not have even that.',
      ],
    }),
  };
})();

const settingUp = (() => {
  const sid = subId('creating-and-setting-up-a-business');
  return {
    id: sid,
    title: 'Creating and Setting Up a Business',
    keyIdea: 'Setting up is a sequence, and the order is forced: the idea has to be tested against a market and costed before any money is committed to it.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 1a is the first of the role's five requirements, and it has a shape. The steps below are not a recommended method; they are ordered by what each one needs from the step before it.` },
      { type: 'flow', steps: [
        'Identify an opportunity the market is not already served on',
        'Test it: will enough people pay enough to cover the cost?',
        'Cost it, and raise that much from savings or from a lender',
        'Commit it — the point after which the money is spent',
      ], result: 'The first sale, and a business that now has to be run', resultType: 'good' },
      { type: 'paragraph', text: `The second and third steps are where most of the failures sit, because they are the last at which the founder can still stop. **Committing the capital is the point of no return**: the lease is signed, the machinery is bought, and the alternatives that were open a week ago have closed.` },
      { type: 'paragraph', text: `At ${F.name}, setting up meant fixed costs of ${money(F.fixed)} a year before a single ${F.unit} was sold. That figure is the commitment: it is owed whether the founder sells ${qty(F.profitMax.q)} or none.` },
    ],
    realExample: { emoji: '🧾', text: `A workshop that signs a five-year lease before testing whether anybody will buy has committed the capital before testing the idea, and cannot undo it.` },
    misconception: `Students treat setting up as a checklist that can be worked in any order, and in particular put raising the capital first because it feels like the hard part. It is not the hard part and it is not first: money raised against an untested idea is money committed to it. The sequence matters because each step decides whether the next one is worth taking.`,
    examMatters: `An Explain is glossed in Appendix 6 as a brief explanation of cause or effect, supported by details or an example. On this leaf the cause and the effect are two ADJACENT steps: what testing tells the founder, and what she does with it. Reciting all four steps supplies neither.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} has fixed costs of ${money(F.fixed)} a year, sells a ${F.unit} for ${money(F.profitMax.price)} and spends ${money(F.variable)} making one. Work out what the commitment means:`,
      template: [
        `Each ${F.unit} sold at ${money(F.profitMax.price)} costs ${money(F.variable)} to make, so it contributes ___ towards the fixed costs`,
        `To cover ${money(F.fixed)} it must sell ${qty(F.fixed / (F.profitMax.price - F.variable))} chairs — which across ${qty(F.workingDays)} working days is ___ a day`,
        `And all of that is owed whether the chairs sell or ___`,
      ],
      answers: [money(F.profitMax.price - F.variable), String((F.fixed / (F.profitMax.price - F.variable)) / F.workingDays), 'not'],
      hints: ['subtract what one costs to make from what it sells for', `divide that year's figure by the ${qty(F.workingDays)} days`, 'the word that makes the sentence describe the risk'],
      distractors: [money(F.profitMax.price), String(F.satisficeChairsPerDay), 'later'],
    }),
  };
})();

const runningTheBusiness = (() => {
  const sid = subId('running-the-business');
  return {
    id: sid,
    title: 'Running the Business',
    keyIdea: 'Running a business is a different job from starting one: it is repetition, and it is judged on whether the firm can do the same thing again next week.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 1b puts running and expanding together, and this subsection takes the first half. Setting up ends with a sale; **running** is the work of making the next one happen, and the one after that, without the founder's attention being what holds it together.` },
      { type: 'paragraph', text: `It is a genuinely different job. Setting up rewards deciding quickly under uncertainty; running rewards doing the same thing reliably. The specification separates them because a person who is good at the first is not automatically good at the second.` },
      { type: 'paragraph', text: `What running actually consists of is short: buying materials before they are needed, getting the work out on time, collecting the money, and keeping enough cash to do it again. ${F.name} sells ${qty(F.profitMax.q)} chairs in a year — ${qty(F.profitMaxPerDay)} on each of ${qty(F.workingDays)} working days — and every one of those days is the running job rather than the setting-up one.` },
      { type: 'paragraph', text: `The test is whether the business survives the founder taking a fortnight off. If it does not, the firm has an owner but no system, and it cannot grow past what one person can personally supervise.` },
    ],
    realExample: { emoji: '📅', text: `A workshop where only the founder knows which supplier to call and what the discount is has not finished the running job, however well the products sell.` },
    misconception: `Students write about running a business as though it were a smaller version of starting one, and describe the same qualities — vision, risk-taking, spotting opportunities. The specification lists the two separately. Running is repetition and reliability, and the qualities that make somebody good at beginning things can work against it.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, and says it does not include evaluation. A chain here has to reach an effect on the firm — an order missed, cash short — rather than a judgement about whether the founder is any good at it.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each thing that goes wrong in a young firm to whether it is a failure of setting up or of running:',
      pairs: [
        { left: 'The lease was signed before anybody asked what customers would pay', right: 'Setting up: the steps were done out of order' },
        { left: 'Orders are taken but materials are ordered only once the work starts', right: 'Running: the repeating cycle has a gap in it' },
        { left: 'The founder is away for a week and two deliveries are missed', right: 'Running: the firm depends on one person rather than a system' },
        { left: 'The machinery bought cannot make the design customers actually asked for', right: 'Setting up: capital was committed against an untested idea' },
      ],
      why: [
        'Testing the idea comes before committing capital, and reversing them is the classic set-up failure.',
        'Buying materials in time is part of the repeating cycle, so the fault is in how the firm runs rather than how it began.',
        'A business that stops when one person does has an owner but no system — the running job is unfinished.',
        'Committing capital is the point of no return, and doing it before the idea was tested is what makes it irreversible.',
      ],
    }),
  };
})();

const expandingTheBusiness = (() => {
  const sid = subId('expanding-and-developing-the-business');
  return {
    id: sid,
    title: 'Expanding and Developing the Business',
    keyIdea: 'Expanding changes what the founder does: past a certain size the founder stops making the product and starts deciding how it gets made.',
    body: [
      { type: 'paragraph', text: `The second half of 1.3.5 · 1b is **expanding and developing**, and the specification treats it as part of the role rather than as something that happens to a firm. Growth is chosen.` },
      { type: 'paragraph', text: `It is chosen because it costs something. A workshop selling ${qty(F.profitMax.q)} chairs can be supervised by one person; a workshop selling twice that cannot. Expansion buys more output with more fixed cost, more people and less direct control, and the founder has to decide whether the exchange is worth making.` },
      { type: 'paragraph', text: `**Developing** is the other half and is not the same as getting bigger. A firm develops when it changes what it does — a new design, a different customer, selling direct instead of through a retailer — and a firm can develop without growing at all.` },
      { type: 'paragraph', text: `What changes for the founder is the work itself. At ${qty(F.profitMaxPerDay)} chairs a day the founder is at the bench; at four times that she is buying timber, hiring and pricing, and somebody else is at the bench. That is the same transition the objectives chapter measures in money.` },
    ],
    realExample: { emoji: '📦', text: `A workshop that adds a second product line for the same customers has developed; one that opens a second unit making the same chairs has grown. They are different decisions with different risks.` },
    misconception: `Students treat expansion as automatically good and describe it as the aim of every business. The specification does not say so, and the objectives chapter shows why: growing output past the profit-maximising point reduces profit. Expansion is one objective among several and it competes with the others.`,
    examMatters: `Growth questions attract Discuss, which Appendix 6 glosses as chains of reasoning in context showing causes and effects, closing with a brief assessment of the competing arguments. The argument almost every answer omits is the one against: expansion buys output with fixed cost and control.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change a workshop might make by whether it is growing, developing, or both:',
      groups: [
        { name: 'Growing: more of the same', items: ['Opening a second unit making the identical chair', 'Hiring four more machinists to raise weekly output'] },
        { name: 'Developing: something different', items: ['Adding a design for a customer who wanted something else', 'Taking orders by post instead of through a shop'] },
        { name: 'Both at once', items: ['Opening a second unit that makes a new product for a new customer'] },
      ],
      why: [
        'Output rises and nothing about the product or the customer changes, which is growth in its plainest form.',
        'Nothing about the scale changes — the firm is doing a different thing, not more of the same one.',
        'A second site is scale and a new product for a new customer is development, so this decision carries both risks at once and is the hardest of the three to reverse.',
      ],
    }),
  };
})();

const intrapreneurship = (() => {
  const sid = subId('intrapreneurship');
  return {
    id: sid,
    title: 'Innovation Within a Business: Intrapreneurship',
    keyIdea: 'Intrapreneurship is entrepreneurial behaviour inside an established firm — the initiative without the personal financial risk, because the firm carries that.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 1c is **innovation within a business (intrapreneurship)**, and the specification's own bracket is the definition. An **intrapreneur** is an employee who behaves entrepreneurially inside a firm that already exists: spotting the opportunity, pressing for it and seeing it through.` },
      { type: 'paragraph', text: `Set it against the definition from the first subsection and exactly one of the two halves is missing. The initiative is there. **The financial risk is not** — it belongs to the firm, which pays the intrapreneur's salary whether or not the idea works.` },
      { type: 'paragraph', text: `That single difference explains most of what follows from it. An intrapreneur can be given resources far larger than they could ever raise personally, and can try things that would ruin an individual. They also cannot keep the gains: a successful idea belongs to the firm.` },
      { type: 'paragraph', text: `Firms want intrapreneurship because the alternative is losing the person. An employee with an idea and no route to it inside the firm is the employee who leaves and becomes a competitor.` },
    ],
    realExample: { emoji: '💡', text: `A machinist who works out that offcuts can be sold as a second product, persuades the owner and runs the line has behaved entrepreneurially with none of her own money at stake.` },
    misconception: `Students describe intrapreneurship as "being creative at work" or as any good suggestion. Neither is what the specification names. The test is whether the person took the initiative and carried the idea through — and the distinction from entrepreneurship is not effort or imagination but who loses if it fails.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase. A definition of intrapreneurship has to say where it happens and what is absent from it, because the contrast with entrepreneurship is the meaning of the word.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Two people have the same idea for a new product in the same week. One is employed by a furniture firm; the other resigns and starts her own workshop. Complete the comparison:',
      template: [
        'Both take the ___, which is the half of the definition they share',
        'The employee does not bear the financial ___, because her salary is paid whether the idea works or not',
        'So if the idea succeeds, the gain belongs to the ___ rather than to the employee who had it',
      ],
      answers: ['initiative', 'risk', 'firm'],
      hints: ['the first half of the definition of an entrepreneur', 'the second half, and the one that separates them', 'whoever carried the possibility of the loss'],
      distractors: ['opportunity', 'reward', 'customer'],
    }),
  };
})();

/* ══ Block 2 — Risk, uncertainty and barriers (1.3.5 · 1d, 1e) ════════════ */

const riskAndUncertainty = (() => {
  const sid = subId('anticipating-risk-and-uncertainty');
  return {
    id: sid,
    title: 'Anticipating Risk and Uncertainty',
    keyIdea: 'Risk can be estimated and planned for; uncertainty cannot be estimated at all, so it is anticipated by keeping the firm able to absorb a surprise.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 1e asks for something narrower than it looks: **anticipating** risk and uncertainty in the business environment. The distinction between the two terms is 1.3.1 · 1d and belongs to the market chapter; what this leaf wants is what a founder DOES about them.` },
      { type: 'paragraph', text: `The distinction in short, because the rest depends on it: a **risk** is something whose chance can be estimated — a proportion of chairs returned faulty, a proportion of customers paying late. An **uncertainty** cannot be given a figure at all: whether a competitor opens next year.` },
      { type: 'paragraph', text: `They are anticipated differently, and that is the leaf. A risk is anticipated by **pricing it in**: if one ${F.unit} in fifty comes back, the cost of replacing it belongs in the ${money(F.variable)} variable cost before the price is set.` },
      { type: 'paragraph', text: `An uncertainty cannot be priced in, because there is no figure to use. It is anticipated by **keeping the firm able to survive one** — cash in reserve, costs that can be cut, no commitment so large that a bad year ends the business.` },
    ],
    realExample: { emoji: '🌧️', text: `A workshop can budget for the chairs it will have to replace under guarantee. It cannot budget for whatever the next few years do to its trade, so it holds cash instead.` },
    misconception: `Students treat the two words as synonyms and write that entrepreneurs "take risks", meaning they are brave. The specification asks how the two are anticipated, and the answer differs: one goes into the costing and the other into the reserves. An answer that anticipates an uncertainty by estimating it has not understood what the word means.`,
    examMatters: `Under Appendix 6 an Explain is a brief explanation of cause or effect, and it is carried by the DETAIL supporting it rather than by its length. Here that detail is the method: a risk is priced into the cost, an uncertainty is held against with cash. "The founder plans for it" names neither.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: `Sort what ${F.name} faces by how it can be anticipated:`,
      groups: [
        { name: 'Priced into the cost of a chair', items: ['One chair in fifty is returned under guarantee', 'Around a tenth of trade customers pay a month late', 'Machine blades wear out after a known number of cuts'] },
        { name: 'Held against with cash and flexibility', items: ['A competitor may open in the same town next year', 'Import duty on timber may change'] },
      ],
      why: [
        'Each of these has happened often enough to carry a proportion, so a figure can be put on it and added to the variable cost before the price is set.',
        'Neither can be given a number — nothing has happened often enough to produce one — so the firm cannot price it in and must instead be able to absorb it.',
      ],
    }),
  };
})();

const anticipatingInPractice = (() => {
  const sid = subId('what-anticipating-costs');
  return {
    id: sid,
    title: 'What Anticipating Costs',
    keyIdea: 'Both methods of anticipating cost money, which is why firms do not do all of it: pricing a risk in raises the price, and holding cash against an uncertainty leaves capital idle.',
    body: [
      { type: 'paragraph', text: `Anticipating is not free, and a subsection that says a founder "should plan for risk" has not said what the plan costs. Both methods have a price, and the price is why no firm anticipates everything.` },
      { type: 'paragraph', text: `**Pricing a risk in raises the price.** Suppose ${F.name} finds that one ${F.unit} in fifty comes back. Replacing it adds ${money(F.variable / 50)} to the ${money(F.variable)} it costs to make one — and a higher variable cost moves the profit-maximising price up and the quantity down. The schedule in the objectives chapter shows the same effect when wages rise.` },
      { type: 'paragraph', text: `**Holding cash against an uncertainty leaves capital idle.** Money kept in reserve is money not spent on machinery that would have raised output. The reserve earns the firm nothing while it sits there; what it buys is the ability to still be trading after a surprise.` },
      { type: 'paragraph', text: `So the founder is choosing how much of each to buy, and a firm that anticipates nothing is cheaper and more fragile than one that anticipates everything. Neither end is right.` },
    ],
    realExample: { emoji: '🏦', text: `A workshop holding three months of fixed costs in reserve has ${money(F.fixed / 4)} doing nothing, which is the price of surviving a quarter with no orders.` },
    misconception: `Students write that a well-run firm anticipates all its risks, as though anticipation were free and more of it always better. Every pound of reserve is a pound not invested and every risk priced in raises the price to the customer. The question is always how much, and the answer depends on how badly the firm would be hurt by the thing happening.`,
    examMatters: `Assess carries ten marks in Units 1 and 2, and Appendix 6 asks for a balanced chain ending in a supported judgement. What is weighed here is a cost against a cost: the idle reserve, against the year that ends the business. Say which this firm can less afford.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} keeps three months of its ${money(F.fixed)} fixed costs in reserve, and adds the cost of replacing one ${F.unit} in fifty to the ${money(F.variable)} it costs to make one. Work out what each precaution costs:`,
      template: [
        `Three months of fixed costs is a ___ of the yearly figure, sitting in the bank doing no work`,
        `Replacing one ${F.unit} in fifty adds ___ to what each one costs to make`,
        `And a higher cost of making one pushes the profit-maximising price ___`,
      ],
      answers: ['quarter', money(F.variable / 50), 'up'],
      hints: ['what three months of a year is', 'divide the making cost by the number of chairs one replacement is spread over', 'the direction the objectives chapter shows when wages rise'],
      distractors: ['third', money(F.variable), 'down'],
    }),
  };
})();

const barriers = (() => {
  const sid = subId('barriers-to-entrepreneurship');
  return {
    id: sid,
    title: 'Barriers to Entrepreneurship',
    keyIdea: 'A barrier to entrepreneurship is anything that stops a person starting a business, and each one obstructs a specific requirement of the role.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 1d is one line long — **barriers to entrepreneurship** — and the specification names none of them. That is worth knowing rather than guessing at: the way to produce the list in an exam is to work back from the role, because a barrier is whatever prevents one of its requirements.` },
      { type: 'bullets', items: BARRIERS.map(([k, why]) => `**${k}.** ${why}`) },
      { type: 'paragraph', text: `The last one is the barrier students never list, and it rises with how employable somebody is: a person who could earn ${money(F.opportunityCost)} in salaried work faces a higher barrier than one who could earn half that, from exactly the same business.` },
    ],
    realExample: { emoji: '🚧', text: `Two people with the same idea and the same savings face different barriers if one of them would be giving up a well-paid post and the other would not.` },
    misconception: `Students list barriers as external obstacles put there by somebody else, and stop at finance and regulation. The largest is usually a calculation the founder makes about herself: what the year is worth elsewhere. It appears on no list of external obstacles.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning with interpretation where data is given, and says it excludes evaluation. A chain on barriers has to connect one barrier to one requirement of the role it obstructs.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each barrier to the requirement of the role it obstructs:',
      pairs: [
        { left: 'No savings, and no trading record to show a lender', right: 'Creating and setting up a business' },
        { left: 'Can make the product, has never priced or sold one', right: 'Running and developing the business' },
        { left: 'Cannot act until the outcome is known', right: 'Anticipating risk and uncertainty' },
        { left: 'Would be giving up a salary she cannot replace', right: 'The best alternative use of the year' },
      ],
      why: [
        'Setting up begins with committing capital, and without capital there is nothing to commit.',
        'Making the product is one skill of several; the role needs costing, selling and organising as well, and the gap shows once trading starts.',
        'The role requires acting while the outcome is genuinely unknown, so somebody who needs certainty first cannot occupy it.',
        'What the year is worth elsewhere has to be given up before anything begins, which is opportunity cost seen as a barrier.',
      ],
    }),
  };
})();

const overcomingBarriers = (() => {
  const sid = subId('overcoming-the-barriers');
  return {
    id: sid,
    title: 'Overcoming the Barriers',
    keyIdea: 'Each barrier is lowered by a different thing, and the two that are lowered by information are lowered cheaply — which is why advice matters more than money to some founders.',
    body: [
      { type: 'paragraph', text: `A barrier that can be named can be worked on, and they are not all worked on the same way. This is the second half of 1.3.5 · 1d, and it is where the difference between the four starts to matter.` },
      { type: 'paragraph', text: `**Capital** is lowered from either end: finding money on terms a firm with no trading record can get, or needing less of it. A founder who hires equipment rather than buying it has cut what must be committed at the start, at a higher charge per ${F.unit}. Which sources exist is a Unit 2 topic; the barrier is what matters here.` },
      { type: 'paragraph', text: `**Skills** and **risk** are both lowered by information, which is why they are the cheap ones. A founder who has costed the product knows which risks carry a figure; a founder who has worked in the trade has already made the mistakes at somebody else's expense.` },
      { type: 'paragraph', text: `**Opportunity cost** cannot be lowered, only made smaller — by starting part-time, or while still employed, so less of the alternative is given up at once. That is why so many businesses begin alongside a job.` },
    ],
    realExample: { emoji: '🌙', text: `Somebody who keeps the salary until the order book justifies leaving it has cut the opportunity cost of the first year to almost nothing.` },
    misconception: `Students answer every barrier with "get a loan", which lowers one of the four and raises another: borrowing increases what is lost if the firm fails, so it makes the risk barrier higher while making the capital barrier lower. A single remedy that works on every barrier is a sign the barriers have not been distinguished.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning and a perceptive conclusion that proposes a solution or a recommendation. A twenty-mark answer on barriers is expected to end with which one to work on first, not with a list of all four.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each action a would-be founder takes by which barrier it actually lowers:',
      groups: [
        { name: 'Lowers the capital barrier', items: ['Hiring the machinery instead of buying it', 'Redesigning the product so it needs less equipment'] },
        { name: 'Lowers the skills and risk barriers', items: ['Spending two years working in the trade first', 'Costing the product properly before committing'] },
        { name: 'Lowers the opportunity cost', items: ['Building the first customers in the evenings while still employed'] },
      ],
      why: [
        'Both reduce what has to be committed at the start, from opposite ends — one changes how the equipment is paid for, the other how much of it is needed. Hiring also raises the cost of each chair, which is the exchange being made.',
        'Both work by producing information, which is why they are the cheapest of the four to lower — one supplies experience and the other supplies figures.',
        'The alternative is not given up until the orders justify it, so the amount forgone in the first year falls close to nothing.',
      ],
    }),
  };
})();

/* ══ Block 3 — Motives and characteristics (1.3.5 · 2a, 2b) ═══════════════ */

const characteristics = (() => {
  const sid = subId('characteristics-and-skills');
  return {
    id: sid,
    title: 'Characteristics and Skills Required',
    keyIdea: 'The specification names no characteristics, so the reliable ones are read off the role: each requirement of the job implies the quality needed to do it.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 2a asks for the **characteristics and skills required** and lists none. A student who has memorised somebody else's list of adjectives has nothing to fall back on when the question asks about a firm the list does not fit; a student who can read the qualities off the role always can.` },
      { type: 'bullets', items: CHARACTERISTICS.map(([k, ref, leaf, why]) => `**${k}** — required by ${leaf} (${ref}): ${why}.`) },
      { type: 'paragraph', text: `Skills are the other half of the leaf and are not the same thing. A **characteristic** is a disposition — how somebody is. A **skill** is learned: costing, selling, organising the work. The distinction matters because skills can be acquired, which is why "lacks the skills" is a smaller obstacle than it sounds.` },
    ],
    realExample: { emoji: '🧰', text: `A founder who can make the product but has never costed one has the characteristics and is missing a skill — and the skill is the half that can be bought in or learned.` },
    misconception: `Students write that entrepreneurs are born and not made, and list characteristics as though the leaf were about personality. It asks for characteristics AND skills, so half of it is about things that are learned. An answer built entirely on disposition has answered half the question.`,
    examMatters: `The trap here is that a list LOOKS like an answer. An Explain, as Appendix 6 words it, wants cause or effect with a supporting detail — so one characteristic tied to the requirement that makes it necessary does more than all four in a row.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each thing a founder needs by whether it is a characteristic or a skill:',
      groups: [
        { name: 'Characteristic: a disposition', items: ['Able to act before the outcome is known', 'Still opening the workshop in the second year, when it is no longer new'] },
        { name: 'Skill: something learned', items: ['Working out what a chair costs to make', 'Persuading a trade buyer to place a first order', 'Ordering timber so it arrives before the work starts'] },
      ],
      why: [
        'Both describe how the person is rather than something they were taught, and neither can be acquired on a course.',
        'Each of these is a procedure somebody can be shown — which is why the skills half of the leaf is the half the barriers chapter can do something about.',
      ],
    }),
  };
})();

const profitMaximisationMotive = (() => {
  const sid = subId('financial-motives-profit-maximisation');
  return {
    id: sid,
    title: 'Financial Motives: Profit Maximisation',
    keyIdea: 'Profit maximisation as a motive means the founder set the business up in order to earn as much as it can, and it predicts a specific price rather than a general ambition.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 2b asks **why people set up businesses**, and names two financial motives. The first is **profit maximisation**: the business exists in order to earn as much profit as the market allows.` },
      { type: 'paragraph', text: `The useful thing about this motive is that it makes a prediction. It does not mean charging as much as possible, and it does not mean selling as much as possible — both of those earn less. It means one price, and the schedule finds it.` },
      { type: 'paragraph', text: `At ${F.name} that price is ${money(F.profitMax.price)}, selling ${qty(F.profitMax.q)} chairs for a profit of ${money(F.profitMax.profit)}. Charge more and the chairs lost cost more than the extra margin gains; charge less and the margin lost costs more than the extra chairs gain.` },
      { type: 'paragraph', text: `The motive and the objective share a name and are not the same leaf. Here it is a reason a PERSON began; at 1.3.5 · 3b it is a target the FIRM pursues. A founder may begin for the money and later run the firm for something else, and the specification separates them so that both can be said.` },
    ],
    realExample: { emoji: '🎯', text: `A founder who works out the price that earns most and charges it is pursuing this motive; one who charges the highest price the market will bear is not, and will earn less.` },
    misconception: `Students treat profit maximisation as "charging as much as you can". The schedule shows why that is false: at ${money(F.breakEvenHigh)} the workshop sells ${qty(F.qAt(F.breakEvenHigh))} chairs and earns no profit at all. Maximising profit is a balance between margin and volume, and it sits at neither extreme.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, with workings shown. A question giving a schedule and asking for the profit-maximising price wants the profit at each price set out, not the highest price in the table.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} faces ${F.demand} and spends ${money(F.variable)} making a ${F.unit}. Work out why the motive predicts one price rather than the highest:`,
      template: [
        `A ${F.unit} sold at ${money(F.profitMax.price)} contributes ___ towards the yearly commitment`,
        `A dollar added to the price raises that contribution by one dollar, and the schedule says it loses the workshop ___ chairs`,
        `So profit is highest where the last dollar of price stops being worth the chairs it ___`,
      ],
      answers: [money(F.profitMax.price - F.variable), String(F.b), 'costs'],
      hints: ['subtract the making cost from the price', 'read the number in front of the P', 'what a dollar of price does to the chairs sold'],
      distractors: [money(F.profitMax.price), String(F.variable), 'earns'],
    }),
  };
})();

const profitSatisficing = (() => {
  const sid = subId('financial-motives-profit-satisficing');
  return {
    id: sid,
    title: 'Financial Motives: Profit Satisficing',
    keyIdea: 'Profit satisficing means taking a profit that is good enough rather than the largest available: the founder chooses the working year first and lets the profit follow.',
    body: [
      { type: 'paragraph', text: `The second financial motive at 1.3.5 · 2b is **profit satisficing**: earning enough rather than earning most. It is a financial motive because the test is still a figure — it is simply a floor rather than a maximum.` },
      { type: 'paragraph', text: `The clearest way to see the difference is to ask which thing the founder chooses FIRST. A maximiser chooses the price and accepts the working year that follows: ${money(F.profitMax.price)} means ${qty(F.profitMax.q)} chairs, which is ${qty(F.profitMaxPerDay)} a day across ${qty(F.workingDays)} working days.` },
      { type: 'paragraph', text: `A satisficer chooses the working year and accepts the profit that follows. ${qty(F.satisficeChairsPerDay)} chairs a day is ${qty(F.satisfice.q)} a year, and the schedule says they must sell at ${money(F.satisfice.price)}, earning ${money(F.satisfice.profit)}. That is ${money(F.tradeSatisfice.profit)} less than the maximum, and ${qty(F.tradeSatisfice.units)} fewer chairs to make.` },
      { type: 'paragraph', text: `It is a real decision rather than laziness, and it has a test: ${money(F.satisfice.profit)} still clears the ${money(F.opportunityCost)} the founder could earn elsewhere. Satisficing below that figure would not be satisficing but a mistake.` },
    ],
    realExample: { emoji: '🕰️', text: `A founder who closes on Fridays and prices accordingly has chosen the year first. The profit is what the schedule gives her for that choice, and it is smaller on purpose.` },
    misconception: `Students describe satisficing as a lack of ambition or as settling for failure. The figures refuse both readings: ${money(F.satisfice.profit)} against a maximum of ${money(F.profitMax.profit)} is ${money(F.tradeSatisfice.profit)} exchanged for ${qty(F.tradeSatisfice.units)} chairs not made, and it is still well above what the founder could earn in salaried work. It is a trade-off taken deliberately.`,
    examMatters: `Where a question supplies a schedule, Appendix 6's Analyse expects it to be INTERPRETED rather than quoted. Two prices read off it, and a sentence saying what was given up for what, is the interpretation; restating the figures is not.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `The founder decides to make ${qty(F.satisficeChairsPerDay)} chairs on each of ${qty(F.workingDays)} working days instead of ${qty(F.profitMaxPerDay)}. Using ${F.demand}, work out what she has chosen:`,
      template: [
        `Across the working year that is ${qty(F.satisfice.q)} chairs, so the schedule prices them at ___`,
        `She therefore makes ___ fewer chairs on each working day than a profit maximiser would`,
        `The profit that follows still clears what she could earn elsewhere, so satisficing here is a ___ rather than a mistake`,
      ],
      answers: [money(F.satisfice.price), String(F.profitMaxPerDay - F.satisficeChairsPerDay), 'choice'],
      hints: ['rearrange the schedule to find the price that sells that many', 'subtract one day\'s output from the other', 'what a deliberate exchange is'],
      distractors: [money(F.profitMax.price), String(F.satisficeChairsPerDay), 'failure'],
    }),
  };
})();

const ethicalStance = (() => {
  const sid = subId('non-financial-motives-ethical-stance');
  return {
    id: sid,
    title: 'Non-Financial Motives: Ethical Stance',
    keyIdea: 'An ethical stance as a motive means the business was founded in order to trade in a particular way, so the constraint came before the firm rather than being added to it.',
    body: [
      { type: 'paragraph', text: `The specification names four **non-financial motives** at 1.3.5 · 2b, and this is the first: an **ethical stance**. The word "motive" is doing the work. This is not a firm that later adopts a policy; it is a firm that exists because somebody wanted to trade in a particular way.` },
      { type: 'paragraph', text: `The practical mark of it is that the stance is expensive and survives anyway. A founder who will only buy timber from a source she can trace pays more for it, and her variable cost is higher than a competitor's for the same ${F.unit}.` },
      { type: 'paragraph', text: `Put that into the schedule and the consequence is exact: a higher cost of making one chair pushes the profit-maximising price up and the quantity down. The stance costs the founder profit, measurably, and she keeps it.` },
      { type: 'paragraph', text: `What distinguishes the motive from marketing is what happens when it stops paying. A firm that adopted the stance to attract customers drops it when the customers stop caring; a firm founded on it does not, because the stance is the reason the firm exists.` },
    ],
    realExample: { emoji: '🌳', text: `A workshop that refuses a large order because the buyer wants a timber it will not use has paid for its stance in a way that shows up in the accounts.` },
    misconception: `Students treat an ethical stance as a claim a business makes about itself, and evidence it with what the firm says. The test in the specification is that it is a MOTIVE — it came first. The question to ask is what the stance has cost, because one that has never cost anything has not yet been shown to exist.`,
    examMatters: `A ten-mark Assess ends, per Appendix 6, in a supported judgement. Here the judgement is not whether the stance is admirable but whether the case shows it is a MOTIVE: what has it cost, and did it predate the customers? Evidence of cost is the argument.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each situation to what it shows about whether an ethical stance is really the motive:',
      pairs: [
        { left: 'The firm pays more for traceable timber and has done since it opened', right: 'Evidence for: the stance predates the customers and costs money' },
        { left: 'The firm adopted the policy in the year a large buyer began asking about it', right: 'Evidence against: the timing suggests it is a response, not a motive' },
        { left: 'The firm refuses a profitable order that would breach the stance', right: 'Evidence for: it costs profit at the moment of the decision' },
        { left: 'The firm drops the policy quietly when costs rise', right: 'Evidence against: a motive that stops when it gets expensive was not one' },
      ],
      why: [
        'Existing before the commercial reason to have it is exactly what makes something a motive rather than a policy.',
        'A stance that arrives with the buyer who wants it is a response to demand, which the specification would class with marketing rather than with motives.',
        'A stance is only visible when it is expensive, and refusing revenue is the clearest form of that.',
        'The test of a motive is what happens when it costs something, and abandoning it at that point answers the question.',
      ],
    }),
  };
})();

const socialEntrepreneurship = (() => {
  const sid = subId('non-financial-motives-social-entrepreneurship');
  return {
    id: sid,
    title: 'Non-Financial Motives: Social Entrepreneurship',
    keyIdea: 'A social entrepreneur founds a trading business in order to meet a social need, so the surplus serves the purpose rather than the founder.',
    body: [
      { type: 'paragraph', text: `The second non-financial motive is **social entrepreneurship**. A social entrepreneur sets up a business to meet a social need — and it is a business, which is the half students drop.` },
      { type: 'paragraph', text: `It sells something, it covers its costs, and it has to survive. The difference is where the surplus goes: into the purpose rather than to the founder. The motive is what the surplus is FOR.` },
      { type: 'paragraph', text: `That makes the objectives different in a way the schedule can show. A workshop founded to train young people out of work does not want the ${money(F.profitMax.profit)} that ${money(F.profitMax.price)} earns; it wants the largest output it can reach while still surviving, because output is training places. That is ${money(F.marketShare.price)}, ${qty(F.marketShare.q)} chairs and ${money(F.marketShare.profit)} of profit.` },
      { type: 'paragraph', text: `Notice that this is the market-share objective arrived at for a different reason, and that surviving is the binding constraint. A social business that runs out of money has stopped meeting the need entirely, which is why it must still be run as a business.` },
    ],
    realExample: { emoji: '🤝', text: `A workshop that employs and trains people who have been out of work, sells the chairs at a price that just covers its costs and puts what is left into more training places.` },
    misconception: `Students write that social enterprises do not aim to make a profit, or treat them as charities that happen to sell things. Both miss the same point: the surplus is what funds the purpose, so earning one matters more here rather than less. What differs is who it belongs to.`,
    examMatters: `Appendix 6 closes a Discuss with a brief assessment showing awareness of the competing arguments. Here the competition is between the purpose and the constraint, and the constraint wins by arithmetic: an organisation that stops trading has stopped meeting the need it was founded for.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A workshop founded to train young people out of work uses the schedule ${F.demand}, with fixed costs ${money(F.fixed)} and ${money(F.variable)} a ${F.unit}. Its aim is the most training places it can sustain:`,
      template: [
        `The lowest price at which the workshop still covers all its costs is ___`,
        `At that price each ${F.unit} contributes ___ towards the fixed costs`,
        `${qty(F.marketShare.q)} chairs at that contribution covers the fixed costs exactly, so the profit left over is ___`,
      ],
      answers: [money(F.marketShare.price), money(F.marketShare.price - F.variable), money(0)],
      hints: ['the lower of the two prices at which profit reaches zero', 'subtract the making cost from that price', 'what is left when the contribution covers the commitment exactly'],
      distractors: [money(F.breakEvenHigh), money(F.profitMax.price - F.variable), money(F.satisfice.profit)],
    }),
  };
})();

const independenceHomeWorking = (() => {
  const sid = subId('non-financial-motives-independence-and-home-working');
  return {
    id: sid,
    title: 'Non-Financial Motives: Independence and Home Working',
    keyIdea: 'Independence and home working are motives about the shape of the founder\'s life, and both put a ceiling on how large the business can become.',
    body: [
      { type: 'paragraph', text: `The last two non-financial motives at 1.3.5 · 2b are **independence** and **home working**. They are grouped here because they share a consequence the other motives do not have: each one limits the firm's size by design.` },
      { type: 'paragraph', text: `**Independence** is founding a business in order to answer to nobody else's decisions about how the work is done. It explains why some founders refuse investment: outside money brings somebody with a view, and the motive was precisely to have no such person.` },
      { type: 'paragraph', text: `**Home working** is founding it so the work happens where the founder lives. The specification lists it as a reason people set businesses up, and the practical effect is a ceiling: a business run from a house can only grow to what the house holds.` },
      { type: 'paragraph', text: `Both therefore predict satisficing rather than maximising. A founder who will not take investment or leave the house has fixed the scale before the schedule is consulted, and takes whatever profit that scale allows — which is the previous subsection's decision arrived at for a different reason.` },
    ],
    realExample: { emoji: '🏠', text: `A workshop in a converted garage that turns away an order it has no room to make has priced independence and space above the revenue, which is the motive showing itself.` },
    misconception: `Students treat these as vague lifestyle preferences rather than as motives with consequences, and then write that every business wants to grow. These two motives predict the opposite, and predict it precisely: a founder who refuses outside money and a fixed premises has capped the output, so the profit is capped with it.`,
    examMatters: `An Explain has to reach an EFFECT ON THE FIRM, which Appendix 6 words as cause or effect supported by a detail. The effect these two motives produce is a ceiling on output. An answer describing what the founder enjoys has described a preference and stopped short of the effect.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision by the non-financial motive it most directly shows:',
      groups: [
        { name: 'Independence', items: ['Turning down an investor who wants a say in the designs', 'Staying small enough that no manager is needed'] },
        { name: 'Home working', items: ['Refusing an order that will not fit in the garage', 'Choosing a product that can be made without a factory'] },
        { name: 'Ethical stance', items: ['Paying more for timber from a source that can be traced'] },
      ],
      why: [
        'Both are refusals of somebody else\'s say over how the work is done, which is what the motive means.',
        'Both are decisions taken to keep the work where the founder lives, and both cap what the business can become.',
        'This one costs money at the moment of the decision and has nothing to do with scale or control, which places it with the first motive rather than these two.',
      ],
    }),
  };
})();

/* ══ Block 4 — Business objectives (1.3.5 · 3a, 3b, 3c) ═══════════════════ */

const survival = (() => {
  const sid = subId('survival');
  return {
    id: sid,
    title: 'Survival',
    keyIdea: 'Survival is the objective that makes the others possible, and on a schedule it is a range of prices rather than a point.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 3 lists the **objectives a business pursues**, and puts survival first. It is first because it is a precondition: a firm that does not survive pursues nothing else.` },
      { type: 'paragraph', text: `On the schedule survival is not a price but a **range**. ${F.name} covers its costs at any price from ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)}. Below ${money(F.breakEvenLow)} the margin on each ${F.unit} is too thin to cover ${money(F.fixed)} of fixed costs however many are sold; above ${money(F.breakEvenHigh)} too few are sold to cover them at all.` },
      { type: 'paragraph', text: `Every other objective is a choice from inside that range. Profit maximisation takes ${money(F.profitMax.price)}, sales maximisation ${money(F.salesMax.price)}, market share ${money(F.marketShare.price)} — and the last of those is the edge of the range, which is why it earns no profit.` },
      { type: 'paragraph', text: `Survival is the dominant objective in two situations the specification's other leaves imply: at the start, before the firm knows its own figures, and in a bad year. In both, a firm will accept a price it would refuse otherwise, because trading at a low profit beats not trading.` },
    ],
    realExample: { emoji: '🛟', text: `A workshop with orders falling takes work at a price that only just covers its costs, because the alternative is standing the machinery idle and paying the rent anyway.` },
    misconception: `Students write that survival is the objective of failing businesses and profit is the objective of successful ones. Survival is the constraint all the others sit inside: every price the firm can choose is a price at which it survives, and an objective pursued outside that range is not pursued for long.`,
    examMatters: `Survival is a calculation, and Appendix 6 asks for workings on any Calculate. The thing to notice is that it has TWO answers: profit reaches zero twice, so a range needs both ends. One price is half an answer.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Using ${F.demand}, fixed costs of ${money(F.fixed)} and ${money(F.variable)} a ${F.unit}, find the range within which the workshop survives:`,
      template: [
        `The lower price at which profit is exactly zero is ___`,
        `The higher price at which profit is exactly zero is ___`,
        `At the higher one each ${F.unit} contributes ${money(F.breakEvenHigh - F.variable)} and only ${qty(F.qAt(F.breakEvenHigh))} sell, so the contribution covers the ___ costs and no more`,
      ],
      answers: [money(F.breakEvenLow), money(F.breakEvenHigh), 'fixed'],
      hints: ['the price below which the margin is too thin', 'the price above which too few sell', 'the costs that are owed whatever the workshop sells'],
      distractors: [money(F.satisfice.price), money(F.profitMax.price), 'variable'],
    }),
  };
})();

const profitMaximisationObjective = (() => {
  const sid = subId('profit-maximisation-objective');
  return {
    id: sid,
    title: 'Profit Maximisation as an Objective',
    keyIdea: 'Profit maximisation as an objective is a single price found by comparing margin against volume, and it is neither the highest price nor the largest output.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 3b is **profit maximisation**, now as something the firm pursues rather than a reason the founder began. The arithmetic is the same and the question it answers is different: not why this business exists, but what price it should charge.` },
      { type: 'paragraph', text: `The answer is a balance. Raising the price adds to the margin on every ${F.unit} still sold and loses some sales; lowering it does the reverse. The profit-maximising price is where the next dollar of price stops being worth the chairs it costs.` },
      { type: 'paragraph', text: `For ${F.name} that is ${money(F.profitMax.price)}: ${qty(F.profitMax.q)} chairs, ${money(F.profitMax.revenue)} of revenue and ${money(F.profitMax.profit)} of profit. It sits between the sales-maximising price of ${money(F.salesMax.price)} and the satisficing price of ${money(F.satisfice.price)}, which is worth noticing — the maximum is in the middle, not at an end.` },
      { type: 'paragraph', text: `And the profit is a **hill** rather than a slope. ${money(F.salesMax.price)} and ${money(F.satisfice.price)} both earn ${money(F.salesMax.profit)} — the same profit on opposite sides of the peak, one by selling ${qty(F.salesMax.q)} cheaply and the other ${qty(F.satisfice.q)} dearly.` },
    ],
    realExample: { emoji: '⛰️', text: `Two workshops earning the same profit can be doing opposite things: one selling a great many at a low margin, the other a few at a high one.` },
    misconception: `Students confuse the objective with charging the most the market will bear. The schedule refutes it arithmetically: ${money(F.breakEvenHigh)} is a price customers will pay, and at it the workshop earns no profit. Every dollar above ${money(F.profitMax.price)} costs more in chairs than it gains in margin.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning including interpretation of given data. Interpreting this schedule means saying what happens on BOTH sides of the peak, because a chain that only goes one way does not show it is a peak.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Compare two prices either side of the peak on ${F.demand}, where a ${F.unit} costs ${money(F.variable)} to make:`,
      template: [
        `At ${money(F.salesMax.price)} the workshop sells ${qty(F.salesMax.q)} chairs, each contributing ___`,
        `At ${money(F.satisfice.price)} it sells ${qty(F.satisfice.q)}, each contributing ${money(F.satisfice.price - F.variable)} — so the two totals come out ___`,
        `Both fall the same distance below the peak, which shows profit is a ___ rather than a slope`,
      ],
      answers: [money(F.salesMax.price - F.variable), 'equal', 'hill'],
      hints: ['subtract the making cost from the lower price', 'multiply each contribution by its own quantity and compare', 'the shape a curve has when both sides fall away'],
      distractors: [money(F.satisfice.price - F.variable), 'higher', 'ladder'],
    }),
  };
})();

const salesMaximisation = (() => {
  const sid = subId('sales-maximisation');
  return {
    id: sid,
    title: 'Sales Maximisation',
    keyIdea: 'Sales maximisation aims at the largest revenue rather than the largest profit, and the two sit at different prices.',
    body: [
      { type: 'paragraph', text: `The first of the six other objectives at 1.3.5 · 3c is **sales maximisation**, and the name matters: the specification says sales maximisation, and an answer that calls it revenue maximisation has used a term the specification does not contain.` },
      { type: 'paragraph', text: `It aims at the largest **revenue** — price times quantity — rather than the largest profit. Because revenue ignores cost, it peaks at a lower price than profit does: selling more chairs always adds revenue, while it only adds profit until the margin runs thin.` },
      { type: 'paragraph', text: `${F.name} maximises sales at ${money(F.salesMax.price)}: ${qty(F.salesMax.q)} chairs and ${money(F.salesMax.revenue)} of revenue, against ${money(F.profitMax.revenue)} at the profit-maximising price. So the objective gains ${money(F.tradeSales.revenue)} of revenue and ${qty(F.tradeSales.units)} chairs, and costs ${money(F.tradeSales.profit)} of profit.` },
      { type: 'paragraph', text: `Firms choose it deliberately. A firm paying a sales force on commission, or trying to establish a product before a competitor does, may want the volume now and accept the smaller profit — which is a trade-off rather than a mistake.` },
    ],
    realExample: { emoji: '📈', text: `A workshop pricing to fill its order book for a year ahead has chosen revenue over margin, and can say exactly what the choice cost.` },
    misconception: `Students use "sales" to mean revenue in one sentence and units in the next, and the two peak at different places. Here they happen to move together — the lower price sells more chairs AND earns more revenue — but that is a property of this schedule rather than a rule, and the specification's term is sales maximisation either way.`,
    examMatters: `Comparing two objectives on one schedule means running the arithmetic twice and then subtracting. A Calculate, per Appendix 6, wants the workings shown; here the subtraction IS the answer, because the question is what one objective costs against the other rather than what either earns.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Compare sales maximisation with profit maximisation on ${F.demand}, where a ${F.unit} costs ${money(F.variable)} to make:`,
      template: [
        `Taking the price from ${money(F.profitMax.price)} to ${money(F.salesMax.price)} removes ___ from the contribution on every ${F.unit}`,
        `It also sells ${qty(F.tradeSales.units)} more chairs, each of which contributes ___`,
        `Revenue rises and profit falls, because what the extra chairs contribute is less than the margin ___`,
      ],
      answers: [money(F.profitMax.price - F.salesMax.price), money(F.salesMax.price - F.variable), 'lost'],
      hints: ['subtract one price from the other', 'subtract the making cost from the lower price', 'what happens to the margin on chairs already being sold'],
      distractors: [money(F.variable), money(F.profitMax.price - F.variable), 'gained'],
    }),
  };
})();

const marketShare = (() => {
  const sid = subId('market-share');
  return {
    id: sid,
    title: 'Market Share',
    keyIdea: 'Market share is pursued by selling as many as possible while still surviving, which puts the firm at the edge of its price range and earns it nothing.',
    body: [
      { type: 'paragraph', text: `**Market share** is the second objective at 1.3.5 · 3c, and it is the share of the market's total sales that this firm makes. A firm pursuing it wants volume, and the survival range sets the limit.` },
      { type: 'paragraph', text: `The most chairs ${F.name} can sell while still covering its costs is ${qty(F.marketShare.q)}, at ${money(F.marketShare.price)}. That is the bottom of the survival range, so the profit is exactly ${money(F.marketShare.profit)} — every dollar of margin has gone into volume.` },
      { type: 'paragraph', text: `Against profit maximisation the exchange is stark: ${qty(F.tradeShare.units)} more chairs for ${money(F.tradeShare.profit)} less profit. That is the whole of the profit given up, and it is the largest trade-off in the section.` },
      { type: 'paragraph', text: `A firm accepts it when share buys something later — a reputation, a customer who reorders, a competitor deterred. The objective is an investment made through the price, and like any investment it is only justified by what comes after.` },
    ],
    realExample: { emoji: '🧭', text: `A new workshop pricing at cost for its first two years to become the supplier a retailer thinks of first has bought share with the profit it did not take.` },
    misconception: `Students treat market share and sales revenue as the same objective. They are different prices here: ${money(F.salesMax.price)} maximises revenue at ${money(F.salesMax.revenue)}, while ${money(F.marketShare.price)} maximises volume at ${qty(F.marketShare.q)} chairs and earns ${money(F.marketShare.revenue)} of revenue — less revenue AND no profit. More units does not mean more money.`,
    examMatters: `This is the leaf where a ten-mark Assess is hardest to finish, because the cost is certain and the gain is not. Appendix 6 requires the judgement anyway. Weigh a profit given up today against a customer who may reorder, and say what would have to be true for the exchange to be worth making.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each price on the schedule to the objective that chooses it and what it costs:',
      pairs: [
        { left: money(F.marketShare.price), right: `Market share: ${qty(F.marketShare.q)} chairs and ${money(F.marketShare.profit)} of profit` },
        { left: money(F.salesMax.price), right: `Sales maximisation: the largest revenue at ${money(F.salesMax.revenue)}` },
        { left: money(F.profitMax.price), right: `Profit maximisation: the largest profit at ${money(F.profitMax.profit)}` },
        { left: money(F.satisfice.price), right: `Satisficing: enough profit for a ${qty(F.satisficeChairsPerDay)}-chair day` },
      ],
      why: [
        'This is the bottom of the survival range, so it reaches the largest output the firm can sustain and keeps none of the margin.',
        'Revenue peaks below the profit peak because extra chairs always add revenue but only add profit while the margin holds.',
        'The peak of the hill: the balance point where a dollar more of price costs more in chairs than it gains in margin.',
        'The founder fixed the working year first, so the price is whatever sells that many — the profit follows the decision rather than driving it.',
      ],
    }),
  };
})();

const costEfficiency = (() => {
  const sid = subId('cost-efficiency');
  return {
    id: sid,
    title: 'Cost Efficiency',
    keyIdea: 'Cost efficiency is producing the same output for less, and it does not only raise profit — it moves the price the firm should charge.',
    body: [
      { type: 'paragraph', text: `**Cost efficiency** is the third of the other objectives at 1.3.5 · 3c: producing the same output for a lower cost. It differs from the others in one way worth stating — it does not compete with them.` },
      { type: 'paragraph', text: `Suppose ${F.name} cuts what a ${F.unit} costs to make from ${money(F.variable)} to ${money(F.efficientVariable)} by reducing waste. At the old price of ${money(F.profitMax.price)} the profit rises from ${money(F.profitMax.profit)} to ${money(F.efficientAtOldPrice.profit)} — ${money(F.efficiencyGain)} more, which is the ${money(F.variable - F.efficientVariable)} saved on each of ${qty(F.profitMax.q)} chairs.` },
      { type: 'paragraph', text: `But the price should also move. A lower cost of making one makes the extra chair worth more, so the profit-maximising price falls to ${money(F.efficient.price)}, output rises to ${qty(F.efficient.q)}, and profit reaches ${money(F.efficient.profit)}.` },
      { type: 'paragraph', text: `That second step is the one students miss, and it is what makes cost efficiency an objective rather than housekeeping. It reaches the customer as well as the accounts: some of the saving goes into a lower price, and the firm sells more as a result.` },
    ],
    realExample: { emoji: '♻️', text: `A workshop that cuts its offcuts can afford to charge slightly less and sell more, and ends up better off than if it had kept the price where it was.` },
    misconception: `Students treat cost efficiency as cost cutting and describe it as spending less on anything. The objective is producing the SAME output for less, which is why waste is the example and wages are not: paying less for the same work raises the profit too, but reduces nothing that was being wasted, and the employee-welfare objective sits directly against it.`,
    examMatters: `Two steps live inside one question here, and the instruction Appendix 6 attaches to Calculate — show the workings — is what makes the second visible: the saving at the old price, then the price that saving makes best. Most answers stop after the first and never notice the second.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} cuts the cost of making a ${F.unit} from ${money(F.variable)} to ${money(F.efficientVariable)}. Work through both effects:`,
      template: [
        `The saving on making each ${F.unit} is ___`,
        `A cheaper ${F.unit} is worth selling more of, so the profit-maximising price falls from ${money(F.profitMax.price)} to ___`,
        `At that price the workshop sells ___ more chairs than it did`,
      ],
      answers: [money(F.variable - F.efficientVariable), money(F.efficient.price), String(F.efficient.q - F.profitMax.q)],
      hints: ['subtract the new making cost from the old one', 'one dollar below where the peak used to be', 'a dollar off the price sells this many more'],
      distractors: [money(F.variable), money(F.salesMax.price), String(F.satisficeChairsPerDay)],
    }),
  };
})();

const welfareSatisfactionSocial = (() => {
  const sid = subId('employee-welfare-customer-satisfaction-social-objectives');
  return {
    id: sid,
    title: 'Employee Welfare, Customer Satisfaction and Social Objectives',
    keyIdea: 'These three cost profit at the moment they are pursued and are chosen anyway, because each buys something the profit figure does not show.',
    body: [
      { type: 'paragraph', text: `The last three objectives at 1.3.5 · 3c — **employee welfare**, **customer satisfaction** and **social objectives** — are grouped here because they share a structure. Each costs money now and returns something later or not at all.` },
      { type: 'paragraph', text: `**Employee welfare** is the clearest to price. If ${F.name} raises what it spends on each ${F.unit} from ${money(F.variable)} to ${money(F.welfareVariable)} by paying above the going rate, profit at ${money(F.profitMax.price)} falls from ${money(F.profitMax.profit)} to ${money(F.welfare.profit)} — a cost of ${money(F.welfareCost)}.` },
      { type: 'paragraph', text: `**Customer satisfaction** costs in the same shape: a longer guarantee, a replacement given without argument, more time spent on an order. It buys the reorder, and the reorder does not appear in this year's figures.` },
      { type: 'paragraph', text: `**Social objectives** are what the firm sets out to do for the community it trades in. Like the ethical stance in the motives chapter, the test is whether it costs anything — and unlike the other two, it may never return in money at all.` },
    ],
    realExample: { emoji: '🧑‍🏭', text: `A workshop paying above the local rate keeps machinists who would otherwise leave, and spends nothing on replacing them — a saving that appears under recruitment rather than under wages.` },
    misconception: `Students write that these objectives raise profit in the long run, and treat them as profit maximisation wearing a different coat. Sometimes they do. The specification lists them as objectives in their own right, which means a firm may pursue them KNOWING they cost ${money(F.welfareCost)} and choose them anyway. An answer that justifies every one by eventual profit has denied that the list has six separate things on it.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning and a perceptive conclusion proposing a solution or recommendation. A twenty-mark answer weighing these against profit has to end by naming the circumstances in which each wins, not by saying that firms should balance them.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `${F.name} raises what it spends on each ${F.unit} from ${money(F.variable)} to ${money(F.welfareVariable)} in order to pay above the going rate. Work out what the objective costs:`,
      template: [
        `Paying above the going rate raises what each ${F.unit} costs to make by ___`,
        `So each one now contributes ${money(F.profitMax.price - F.welfareVariable)} towards the fixed costs instead of ___`,
        `The firm chooses it anyway, because what it buys — fewer leavers — appears under ___ rather than under wages`,
      ],
      answers: [money(F.welfareVariable - F.variable), money(F.profitMax.price - F.variable), 'recruitment'],
      hints: ['subtract the old making cost from the new one', 'subtract the old making cost from the price', 'the other place a leaver costs the firm money'],
      distractors: [money(F.welfareVariable), money(F.satisfice.price - F.variable), 'materials'],
    }),
  };
})();

/* ══ Block 5 — Business choices (1.3.5 · 4a, 4b) ══════════════════════════ */

const opportunityCost = (() => {
  const sid = subId('opportunity-cost');
  return {
    id: sid,
    title: 'Opportunity Cost',
    keyIdea: 'The opportunity cost of a choice is the value of the next best alternative given up, and it is a real cost even though nobody pays it to anybody.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 4a is **opportunity cost**, and it is the idea the whole of this topic has been leading to. Every decision so far — to start, to expand, to satisfice — gave something up, and this is what the thing given up is called.` },
      { type: 'paragraph', text: `The **opportunity cost** of a choice is the value of the next best alternative that was available and was not taken. Two words carry the definition: *next* and *best*.` },
      { type: 'paragraph', text: `The founder of ${F.name} had one year and four ways to spend it. Running the workshop earns ${money(F.profitMax.profit)}. The alternatives were worth ${F.alternatives.map(([, v]) => money(v)).join(', ')}. The opportunity cost of running the workshop is ${money(F.opportunityCost)} — the best of the ones forgone.` },
      { type: 'paragraph', text: `And the comparison is the point of making it: ${money(F.profitMax.profit)} against ${money(F.opportunityCost)} means the founder is ${money(F.economicGain)} better off running the workshop than doing the best other thing. That figure, not the profit, is what says the decision was right.` },
    ],
    realExample: { emoji: '⏳', text: `A founder earning less from her business than she could earn in salaried work is making a loss in the only sense that matters, even when the accounts show a profit.` },
    misconception: `Students define opportunity cost as the money spent on the option chosen. It is the opposite: it is the value of what was NOT chosen, and no money changes hands over it. A choice that costs nothing to make can have a very large opportunity cost, and that is precisely when the idea earns its keep.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase, worth two marks here. A definition of opportunity cost needs the alternative forgone and the word "next best", because without the second word the definition is wrong rather than incomplete.`,
    /*
     * THE SECTION'S ONE REORDER, AND IT IS SOURCED FROM AN EXTRAS CHAIN RATHER THAN FROM ANYTHING
     * PRINTED ABOVE IT. `topFix-02` says to keep a reorder only where the thing genuinely has an
     * order; six of the live section's seven imposed one on parallel concepts. A PROCEDURE has a
     * real order — you cannot take the best alternative before checking that they are mutually
     * exclusive, and you cannot state the gain before you have the cost — and the procedure is
     * taught in the Extras tab, so the sequence is not on screen when the widget asks for it.
     */
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the steps of working out an opportunity cost into the order they have to happen in:',
      items: [
        'List everything the resource could have been used for',
        'Check that the alternatives are mutually exclusive',
        'Take the best of the alternatives that were forgone, and only that one',
        'Compare it with what the option actually chosen earns',
        'State the difference, which is what the comparison exists to produce',
      ],
      correctOrder: [
        'List everything the resource could have been used for',
        'Check that the alternatives are mutually exclusive',
        'Take the best of the alternatives that were forgone, and only that one',
        'Compare it with what the option actually chosen earns',
        'State the difference, which is what the comparison exists to produce',
      ],
      why: [
        'Nothing can be selected from a list that has not been made, so this is the only step that can come first.',
        'This decides whether the question is about opportunity cost at all: alternatives that could be held at once are not competing for the resource.',
        'Only after the exclusivity check is "the best" the right one to take — before it, adding them all still looks reasonable.',
        'The cost means nothing on its own; it exists to be set against what was actually chosen.',
        'The difference is the answer, and it can only be stated once both figures are in hand.',
      ],
    }),
  };
})();

const nextBestNotSum = (() => {
  const sid = subId('next-best-not-the-sum');
  return {
    id: sid,
    title: 'The Next Best, Not the Sum',
    keyIdea: 'Only one alternative can be taken, so only one is given up: adding the forgone options together overstates the cost and can reverse the decision.',
    body: [
      { type: 'paragraph', text: `The single commonest error on this leaf is worth its own subsection, because it changes the answer rather than losing a detail. The error is **adding the alternatives up**.` },
      { type: 'paragraph', text: `The founder's three forgone options were worth ${F.alternatives.map(([, v]) => money(v)).join(', ')}. Added together that is ${money(F.wrongSum)}, and against a profit of ${money(F.profitMax.profit)} it says the workshop is a mistake by ${money(F.wrongSum - F.profitMax.profit)}.` },
      { type: 'paragraph', text: `It is not a mistake, and the sum is meaningless. **The options are mutually exclusive**: they are three uses of the same single year. Taking the salaried post is not compatible with taking the agency. Only one could have been had, so only one was given up — ${money(F.opportunityCost)}, the best.` },
      { type: 'paragraph', text: `The test to apply is whether the alternatives could have been held at once. Where they could, they are not competing for the same resource and the question of opportunity cost does not arise between them. Where they could not, exactly one of them is the cost.` },
    ],
    realExample: { emoji: '🍽️', text: `A diner choosing one dish from four gives up the one they would have picked second, not all three — and would order differently if they believed otherwise.` },
    misconception: `Students add every forgone option together and produce a figure larger than anything that was ever available. Watch what it does here: ${money(F.wrongSum)} makes a workshop earning ${money(F.profitMax.profit)} look like a loss of ${money(F.wrongSum - F.profitMax.profit)}, when it is in fact ${money(F.economicGain)} better than the best alternative. The error is not a small imprecision; it reverses the recommendation.`,
    examMatters: `When a question lists several alternatives, the arithmetic a Calculate is asking for — Appendix 6 wants it based on the given data — is a SELECTION rather than a sum. Choosing the largest forgone is the whole of it, and adding them does not give an imprecise answer but the opposite recommendation.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A founder is offered three alternatives to running her workshop, worth ${F.alternatives.map(([, v]) => money(v)).join(', ')}. The workshop earns ${money(F.profitMax.profit)}. Compare the right method with the wrong one:`,
      template: [
        `Adding all three alternatives gives a figure larger than any of them was ever ___`,
        `Adding them counts ___ alternatives that were never given up at all, because only one of the three could be taken`,
        `${money(F.profitMax.profit)} against ${money(F.opportunityCost)} leaves the founder ___ thousand dollars better off`,
      ],
      answers: ['worth', String(F.alternatives.length - 1), String(F.economicGain / 1000)],
      hints: ['what each alternative was individually', 'how many of the three the definition throws away', 'subtract one figure from the other and drop three zeros'],
      distractors: ['spent', String(F.alternatives.length), String(F.opportunityCost / 1000)],
    }),
  };
})();

const tradeOffs = (() => {
  const sid = subId('trade-offs');
  return {
    id: sid,
    title: 'Trade-Offs',
    keyIdea: 'A trade-off is giving up some of one thing to get more of another, and unlike opportunity cost it is a matter of degree rather than a choice between whole options.',
    body: [
      { type: 'paragraph', text: `1.3.5 · 4b is **trade-offs**, and it is the last leaf of the topic. A trade-off is an exchange: less of one thing for more of another, where the firm chooses how much rather than whether.` },
      { type: 'paragraph', text: `That is what separates it from opportunity cost, and the two are constantly confused. **Opportunity cost is about whole options** — the founder takes the workshop or the salaried post, not both. **A trade-off is about degree** — the workshop can have a little more volume and a little less profit, at any point along the schedule.` },
      { type: 'paragraph', text: `The objectives chapter is a list of trade-offs for that reason. Moving from ${money(F.profitMax.price)} to ${money(F.salesMax.price)} exchanges ${money(F.tradeSales.profit)} of profit for ${qty(F.tradeSales.units)} more chairs and ${money(F.tradeSales.revenue)} more revenue. Going further, to ${money(F.marketShare.price)}, exchanges the whole ${money(F.tradeShare.profit)} for ${qty(F.tradeShare.units)} chairs.` },
      { type: 'paragraph', text: `Notice that the rate gets worse. The first ${qty(F.tradeSales.units)} chairs cost ${money(F.tradeSales.profit)} of profit; the next ${qty(F.tradeShare.units - F.tradeSales.units)} cost ${money(F.tradeShare.profit - F.tradeSales.profit)}. A trade-off that is worth making in small amounts is not automatically worth making in large ones.` },
    ],
    realExample: { emoji: '⚖️', text: `A workshop deciding how much of a discount to offer is choosing a point on a trade-off, and a slightly bigger discount always costs more profit than the one before it.` },
    misconception: `Students use trade-off and opportunity cost as synonyms. The difference is whether the choice is whole or partial: giving up a salaried post to start a business is an opportunity cost, and choosing how much profit to give up for volume is a trade-off. A firm faces trade-offs every day and an opportunity cost only when a whole alternative is on the table.`,
    examMatters: `Appendix 6 is explicit that Analyse EXCLUDES evaluation, and a trade-off is where that line is easiest to cross. State the rate at which one thing exchanges for the other and stop; whether the firm ought to make the exchange belongs to a different command word.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision by whether it is an opportunity cost or a trade-off:',
      groups: [
        { name: 'Opportunity cost: a whole alternative', items: ['Leaving a salaried post to start the workshop', 'Using the unit for storage instead of letting it to another firm'] },
        { name: 'Trade-off: a matter of degree', items: ['Dropping the price a little to sell more chairs', 'Spending slightly more on timber to raise the finish', 'Working four days instead of five'] },
      ],
      why: [
        'In each case one whole option is taken and another whole option is given up; nothing in between was available.',
        'Each of these is a dial rather than a switch — the firm chooses how much, and could have chosen a little more or a little less.',
      ],
    }),
  };
})();

const tradeOffsBetweenObjectives = (() => {
  const sid = subId('trade-offs-between-objectives');
  return {
    id: sid,
    title: 'Trade-Offs Between Objectives',
    keyIdea: 'The objectives conflict by arithmetic rather than by opinion, and one schedule prices every conflict between them.',
    body: [
      { type: 'paragraph', text: `The topic closes where it can be checked. "Objectives conflict" is the sentence every student writes; the schedule turns it into figures, and the figures are what an answer is built from.` },
      { type: 'paragraph', text: `Every one of these is read off the same line, ${F.demand}:` },
      { type: 'bullets', items: [
        `**Profit against sales.** ${money(F.tradeSales.profit)} of profit buys ${qty(F.tradeSales.units)} chairs and ${money(F.tradeSales.revenue)} of revenue.`,
        `**Profit against market share.** The whole ${money(F.tradeShare.profit)} buys ${qty(F.tradeShare.units)} chairs — the firm survives and keeps none of it.`,
        `**Profit against employee welfare.** ${money(F.welfareCost)} of profit buys pay above the going rate.`,
        `**Profit against the founder's time.** ${money(F.tradeSatisfice.profit)} buys ${qty(F.tradeSatisfice.units)} chairs not made, which is satisficing.`,
        `**Cost efficiency against all of them.** It is the one that conflicts with nothing: ${money(F.efficiencyGain)} more profit at the same price, and more again once the price adjusts.`,
      ] },
      { type: 'paragraph', text: `The last line is the one worth carrying into an exam. Five of the six objectives at 1.3.5 · 3c compete with profit; cost efficiency does not, which is why it is the first thing a firm under pressure reaches for and the last thing it should have to defend.` },
    ],
    realExample: { emoji: '🧮', text: `A workshop can say precisely what its decision to pay above the going rate costs, and decide with the figure in front of it rather than in the abstract.` },
    misconception: `Students assert that objectives conflict and stop. Appendix 6 defines Analyse as requiring a chain of reasoning, and an assertion is not a chain. The conflict has a size, and the size decides the argument: giving up ${money(F.tradeSales.profit)} for ${qty(F.tradeSales.units)} chairs is a different proposition from giving up ${money(F.tradeShare.profit)} for ${qty(F.tradeShare.units)}, and only the second is obviously hard to justify.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, leading to a perceptive conclusion proposing a solution or recommendation. Quantifying a conflict is what makes a chain developed rather than asserted.`,
    /*
     * THE RATE, NOT THE TOTALS. The bullets above print what each objective costs, so a recall
     * asking for those is answerable by scrolling up — which is exactly what the answer-recoverable
     * check caught on the first build of this subsection. The rate is a division the bullets do not
     * do, and it is the thing the last takeaway actually claims.
     */
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'The bullets above give the totals. Work out the RATE at which profit is exchanged for chairs, and check the claim in the last line:',
      template: [
        `The first ${qty(F.tradeSales.units)} chairs cost ${money(F.tradeSales.profit)} of profit, which is ___ a ${F.unit}`,
        `The next ${qty(F.tradeShare.units - F.tradeSales.units)} cost a further ${money(F.tradeShare.profit - F.tradeSales.profit)}, which is ___ a ${F.unit}`,
        `So a trade-off worth making in small amounts is not automatically worth making in ___ ones`,
      ],
      answers: [money((F.tradeSales.profit / F.tradeSales.units)), money((F.tradeShare.profit - F.tradeSales.profit) / (F.tradeShare.units - F.tradeSales.units)), 'large'],
      hints: ['divide the first cost by the first number of chairs', 'divide the further cost by the further chairs', 'the opposite of the word two lines up'],
      distractors: [money(F.variable), money(F.profitMax.price), 'better'],
    }),
  };
})();

/* ══ The block plan ═══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [whatEntrepreneursDo, settingUp, runningTheBusiness, expandingTheBusiness, intrapreneurship], takeaway: [
    'Initiative AND financial risk. Both halves, and nothing about inventing.',
    'Test the idea before committing capital: committing it closes the alternatives.',
    'Running is repetition: can the firm survive a fortnight without the founder?',
    'Expanding costs control; developing is something different and need not grow.',
    'An intrapreneur has the initiative without the risk, and so does not keep the gain.',
  ] },
  { title: B2, subs: [riskAndUncertainty, anticipatingInPractice, barriers, overcomingBarriers], takeaway: [
    'A risk carries a figure and is priced in; an uncertainty is held against with cash.',
    `Both precautions cost: ${money(F.fixed / 4)} of reserve sits idle, and every risk priced in raises the price.`,
    'No barriers are named: derive them from the role — capital, skills, risk, cost.',
    'Opportunity cost is the barrier nobody lists and it rises with how employable the founder is.',
  ] },
  { title: B3, subs: [characteristics, profitMaximisationMotive, profitSatisficing, ethicalStance, socialEntrepreneurship, independenceHomeWorking], takeaway: [
    'Characteristics are read off the role; skills are the learned half of the leaf and can be acquired.',
    `Profit maximisation means one price — ${money(F.profitMax.price)} here — not the highest the market will bear.`,
    `Satisficing chooses the year first: ${qty(F.satisfice.q)} chairs at ${money(F.satisfice.price)}, ${money(F.tradeSatisfice.profit)} below the peak.`,
    'An ethical stance is a motive only if it came first and has cost something.',
    'A social entrepreneur runs a business; what differs is who the surplus belongs to.',
    'Independence and home working cap the scale by design, so both predict satisficing.',
  ] },
  { title: B4, subs: [survival, profitMaximisationObjective, salesMaximisation, marketShare, costEfficiency, welfareSatisfactionSocial], takeaway: [
    `Survival is a RANGE — ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)} — and every other objective picks a price inside it.`,
    `Profit peaks at ${money(F.profitMax.price)}; ${money(F.salesMax.price)} and ${money(F.satisfice.price)} both earn ${money(F.salesMax.profit)}, which is what makes it a hill.`,
    'The specification says SALES maximisation, and it is a different price from profit maximisation.',
    `Market share reaches ${qty(F.marketShare.q)} chairs at the edge of survival and earns ${money(F.marketShare.profit)}.`,
    `Cost efficiency raises profit AND moves the best price down, to ${money(F.efficient.price)}.`,
    `Welfare, satisfaction and social objectives each cost now — ${money(F.welfareCost)} for the first.`,
  ] },
  { title: B5, subs: [opportunityCost, nextBestNotSum, tradeOffs, tradeOffsBetweenObjectives], takeaway: [
    `Opportunity cost is the NEXT BEST forgone: ${money(F.opportunityCost)}, so the workshop wins by ${money(F.economicGain)}.`,
    `Adding them gives ${money(F.wrongSum)} and reverses the decision. Only one was given up.`,
    'A whole option against a matter of degree — and the rate of exchange worsens.',
    'Five of the six conflict with profit and can be priced. Cost efficiency does not.',
  ] },
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
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE. `structure-08` is
 * that notes and extras taught things the Learn Mode content did not; making the titles BE the block
 * titles and the figures BE the module's figures means the two surfaces cannot diverge again.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these notes only after publication (DECISIONS, 16 September). Verify them
 * against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3 leaves',
    keyIdea: 'What the role is, the order setting up has to happen in, why running is a different job, and the one thing an intrapreneur is missing.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Entrepreneur</strong> — takes the initiative to set up and run a business AND bears the financial risk of doing so. Both halves; nothing about inventing.'),
        def('<strong>Intrapreneur</strong> — behaves entrepreneurially inside an existing firm. The initiative without the personal financial risk, which the firm carries.'),
        def('<strong>Developing</strong> — changing what the firm does, as against growing, which is doing more of the same.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Setting up is ordered by dependency: identify, test, cost, raise, commit. Committing the capital is the point after which the alternatives have closed.'),
        mech(`Fixed costs of ${money(F.fixed)} are owed whether the workshop sells ${qty(F.profitMax.q)} chairs or none, which is what the commitment means.`),
        mech('Running is judged on repetition: whether the firm survives a fortnight without the founder.'),
        link('An intrapreneur can be given resources no individual could raise, and cannot keep the gain — both follow from who bears the risk.'),
      ] },
    ],
    takeaway: [
      'Initiative and financial risk. A lender has one; a salaried manager has the other.',
      'Test before committing, because committing is irreversible.',
      'Intrapreneurship is the role minus the personal risk.',
    ],
  },
  {
    title: B2,
    meta: '2 leaves',
    keyIdea: 'How risk and uncertainty are anticipated differently, what each precaution costs, and the four barriers derived from the role.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Anticipating a risk</strong> — pricing it into the cost of the product, because it carries a figure.'),
        def('<strong>Anticipating an uncertainty</strong> — holding cash and flexibility against it, because it carries no figure.'),
        def(`<strong>Barriers to entrepreneurship</strong> — the specification names none. Derived from the role: ${BARRIERS.map(([k]) => k.toLowerCase()).join(', ')}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Pricing a risk in raises the variable cost, which moves the profit-maximising price up and the quantity down.`),
        mech(`Three months of reserve is ${money(F.fixed / 4)} earning nothing — the price of surviving a quarter with no orders.`),
        mech('Skills and risk are lowered by information, which is why they are the cheap barriers to lower.'),
        link(`Opportunity cost is the barrier that rises with employability: giving up ${money(F.opportunityCost)} is a higher barrier than giving up half of it.`),
      ] },
    ],
    takeaway: [
      'Risk goes into the costing; uncertainty goes into the reserves.',
      'Both precautions cost money, which is why no firm anticipates everything.',
      'Derive the barriers from the role rather than recalling a list.',
    ],
  },
  {
    title: B3,
    meta: '7 leaves',
    keyIdea: 'Characteristics read off the role, the two financial motives, and the four non-financial ones the specification names.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Financial motives</strong> — ${FINANCIAL_MOTIVES.map(([k]) => k.toLowerCase()).join(' and ')}.`),
        def(`<strong>Non-financial motives</strong> — ${NON_FINANCIAL_MOTIVES.map(([k]) => k.toLowerCase()).join(', ')}.`),
        def('<strong>Profit satisficing</strong> — taking a profit that is good enough; the founder chooses the working year and lets the profit follow.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Maximising picks the price: ${money(F.profitMax.price)}, ${qty(F.profitMax.q)} chairs, ${money(F.profitMax.profit)}. Satisficing picks the year: ${qty(F.satisfice.q)} chairs, so ${money(F.satisfice.price)} and ${money(F.satisfice.profit)}.`),
        mech(`Satisficing still has to clear the opportunity cost: ${money(F.satisfice.profit)} against ${money(F.opportunityCost)}.`),
        mech('An ethical stance is a motive only if it predates the commercial reason and has cost something.'),
        link('Independence and home working cap the scale, so both predict satisficing rather than maximising.'),
      ] },
    ],
    takeaway: [
      'Characteristics are derived from the role; skills are the half that can be learned.',
      'Satisficing is a deliberate exchange, not a lack of ambition.',
      'A social entrepreneur runs a business; the surplus is what differs.',
    ],
  },
  {
    title: B4,
    meta: '8 leaves',
    keyIdea: `Survival as a range, profit as a hill, and the six other objectives priced on one schedule.`,
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Survival</strong> — covering costs. On this schedule, any price from ${money(F.breakEvenLow)} to ${money(F.breakEvenHigh)}.`),
        def('<strong>Sales maximisation</strong> — the largest revenue. The specification\'s term; revenue maximisation is not in it.'),
        def(`<strong>Other objectives</strong> — ${OTHER_OBJECTIVES.join(', ')}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Profit max ${money(F.profitMax.price)}/${qty(F.profitMax.q)}/${money(F.profitMax.profit)} · sales max ${money(F.salesMax.price)}/${qty(F.salesMax.q)}/${money(F.salesMax.profit)} · satisficing ${money(F.satisfice.price)}/${qty(F.satisfice.q)}/${money(F.satisfice.profit)} · market share ${money(F.marketShare.price)}/${qty(F.marketShare.q)}/${money(F.marketShare.profit)}.`),
        mech(`Sales maximisation and satisficing earn the SAME ${money(F.salesMax.profit)} on opposite sides of the peak.`),
        mech(`Cost efficiency ${money(F.variable)} → ${money(F.efficientVariable)} gains ${money(F.efficiencyGain)} at the old price and moves the best price to ${money(F.efficient.price)}.`),
        link(`Employee welfare at ${money(F.welfareVariable)} a chair costs ${money(F.welfareCost)} of profit.`),
      ] },
    ],
    takeaway: [
      'Survival is a range and every other objective picks a price inside it.',
      'Profit is a hill: two different prices earn the same profit.',
      'Cost efficiency is the only objective on the list that conflicts with nothing.',
    ],
  },
  {
    title: B5,
    meta: '2 leaves',
    keyIdea: 'Opportunity cost as the next best forgone, the sum error that reverses the decision, and trade-offs as a matter of degree.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Opportunity cost</strong> — the value of the NEXT BEST alternative given up. Not the money spent, and not the sum of everything forgone.'),
        def('<strong>Trade-off</strong> — giving up some of one thing for more of another. A matter of degree, where opportunity cost is a whole option.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Alternatives ${F.alternatives.map(([, v]) => money(v)).join(', ')} → opportunity cost ${money(F.opportunityCost)}, so the workshop at ${money(F.profitMax.profit)} is ${money(F.economicGain)} better.`),
        mech(`Adding them gives ${money(F.wrongSum)} and makes the same workshop look like a loss of ${money(F.wrongSum - F.profitMax.profit)}.`),
        mech(`The rate worsens: the first ${qty(F.tradeSales.units)} chairs cost ${money(F.tradeSales.profit)}, the next ${qty(F.tradeShare.units - F.tradeSales.units)} cost ${money(F.tradeShare.profit - F.tradeSales.profit)}.`),
        link('The test for the sum error: could the alternatives have been held at once? If not, exactly one of them is the cost.'),
      ] },
    ],
    takeaway: [
      'Next best, not the sum — the error reverses the recommendation.',
      'A trade-off is a dial; an opportunity cost is a switch.',
      'Quantify the conflict. "Objectives conflict" on its own is not reasoning.',
    ],
  },
];

export const ATTACH_SLUGS = SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, ''));
