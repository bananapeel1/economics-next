/**
 * PACKET 15 — introductory-concepts, Learn Mode content and Notes.
 *
 * Economics Unit 1 (WEC11), IAL topic 1.3.1, audit/raw/econ_spec.txt:510-568. Six blocks in the
 * specification's own order — the nature of economics, positive and normative, scarcity, production
 * possibility frontiers, specialisation and money and financial markets, the three economic systems —
 * and one subsection per skill, so no step carries two ideas. That is the packet's answer to 167 of
 * 192 starts stopping on step 0: nine crowded steps become eighteen small ones.
 *
 * Ids: the nine March subsections keep theirs where the subsection survives (a progress row points at
 * them); new ones are minted in the same shape. Recall ids are `<subsection id>:recall`.
 *
 * Money is in dollars throughout. Examples are drawn from the markets IAL candidates sit in; no UK-only
 * institution frames one (locale.institution). Nothing asserts what examiners do without a citation.
 * One fictional economy, Maraya, carries the worked frontier across body, diagrams, notes and assessment.
 */
import { subId, SECTION, hash8, PPF_POINTS, PPF_STEPS } from './_packet15-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;
const recall = (sid, r) => ({ id: `${sid}:recall`, ...r });

/* ══ Block 1 — The Nature of Economics (1.3.1 · 1) ═════════════════════════ */

const socialScience = (() => {
  const sid = subId('economics-as-a-social-science'); // March id, kept
  return {
    id: sid,
    title: 'Economics as a Social Science',
    keyIdea: 'Economics is a science in its method — evidence, theory, testing — but a social one, because its subject is people, and people cannot be put in a laboratory.',
    body: [
      { type: 'paragraph', text: 'A **social science** studies human behaviour using the methods of science: observe, form a theory, test it against evidence, revise. Economics does exactly that with the choices people, firms and governments make about scarce resources.' },
      { type: 'paragraph', text: 'What separates it from chemistry is the **inability to conduct scientific experiments**. A chemist runs a reaction twice, changing one thing and holding the rest still. An economist cannot: you cannot raise a country\'s interest rate, rewind five years, and run it again at the old rate to compare. There is only ever one run of history.' },
      { type: 'bullets', items: [
        'You cannot hold the rest of an economy still while you change one part of it.',
        'You cannot repeat a period under different conditions to see what the difference did.',
        'The subjects know they are being studied, and change what they do because of it.',
      ] },
      { type: 'paragraph', text: 'So economists work with the evidence history happens to supply: past episodes, comparisons between countries, and natural experiments where something changed for reasons unconnected to what is being studied. The conclusions are real, but they are never as clean as a controlled result.' },
    ],
    realExample: { emoji: '🏙️', text: 'Singapore and Hong Kong are often compared: similar in size, income and trading position, but with very different housing policies. Neither comparison is a controlled experiment, because a hundred other things differ too — which is exactly the difficulty.' },
    misconception: 'Students write that economics is not a real science because its forecasts are often wrong. Accuracy is not what makes a subject scientific; method is. Write instead: economics is scientific in method but cannot run controlled experiments, so its evidence is weaker and its predictions carry more uncertainty.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) on "social science" needs the subject — human behaviour — and the method, in one sentence. The inability to run controlled experiments is the point to add when a question asks why economic predictions are uncertain.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the description of economics as a social science:',
      template: [
        'Economics is a ___ science: its subject is human behaviour',
        '→ It cannot conduct controlled ___, because history runs only once',
        '→ So its theories are tested against the ___ that history supplies',
      ],
      answers: ['social', 'experiments', 'evidence'],
      hints: ['the kind of science that studies people rather than matter', 'what a chemist can repeat and an economist cannot', 'what a theory is checked against'],
      distractors: ['natural', 'opinions'],
    }),
  };
})();

const modelsAndCeterisParibus = (() => {
  const sid = subId('models-assumptions-ceteris-paribus');
  return {
    id: sid,
    title: 'Models, Assumptions and Ceteris Paribus',
    keyIdea: 'A model is a deliberate simplification: it strips out everything but the relationship being studied, and ceteris paribus is the assumption that does the stripping.',
    body: [
      { type: 'paragraph', text: 'Because the real economy cannot be held still, economists build **models** — simplified representations that keep one relationship and set the rest aside. A model is judged by whether it explains and predicts well, not by whether its assumptions are literally true.' },
      { type: 'paragraph', text: '**Ceteris paribus** means "all other things being equal". It is what lets a model say something definite: *if the price of rice rises, ceteris paribus, the quantity demanded falls*. In reality income, tastes and the price of noodles all move at once, so the fall might not appear. The claim is not that nothing else changes — only that this is what price alone does.' },
      { type: 'flow', steps: [
        'Observe how people, firms or governments behave',
        'Assume away everything but the relationship in question',
        'Build the model and derive what it predicts',
        'Test the prediction against evidence, and revise the model',
      ], result: 'A model that is useful while its assumptions hold, and revised when they do not', resultType: 'neutral' },
      { type: 'paragraph', text: 'Assumptions are where models are attacked and defended. Assuming buyers know every price makes a model tractable; it is also false in most markets. A good evaluation names the assumption and says whether it changes the conclusion.' },
    ],
    realExample: { emoji: '🗺️', text: 'A metro map is a model: the distances are wrong, the curves are straightened, the streets are gone. It is useful because of what it leaves out, not in spite of it — and useless the moment you try to walk between two stations with it.' },
    misconception: 'Students treat an unrealistic assumption as proof that a model is worthless. Every model is unrealistic; that is what makes it a model. Write instead: the assumption matters only if relaxing it would change the conclusion, and say which way it would change it.',
    examMatters: 'State ceteris paribus explicitly whenever a chain of reasoning is written out: "a fall in price raises quantity demanded, ceteris paribus". It signals that the other influences are held constant deliberately rather than forgotten.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of building an economic model in the order an economist works through them, from first to last:',
      correctOrder: [
        'Watch what people, firms or governments actually do',
        'Set aside every influence but the one being studied',
        'Work out what the model predicts will happen',
        'Compare the prediction with the evidence and revise',
      ],
      why: [
        'There is nothing to model until the behaviour has been observed',
        'Ceteris paribus is what turns messy behaviour into a workable relationship',
        'A model earns its keep by producing a prediction that could be wrong',
        'Testing comes last because it needs a prediction to test',
      ],
    }),
  };
})();

/* ══ Block 2 — Positive and Normative Economics (1.3.1 · 2) ════════════════ */

const positiveAndNormative = (() => {
  const sid = subId('positive-and-normative'); // March id, kept
  return {
    id: sid,
    title: 'Testable Statements and Value Judgements',
    keyIdea: 'A positive statement is a claim about what is, which evidence could confirm or refute; a normative statement is a claim about what ought to be, which rests on a value judgement.',
    body: [
      { type: 'paragraph', text: 'A **positive statement** is objective and testable. It may be true or false — that is the point: you could go and find out. "Raising the tax on sugary drinks by 20% reduced their sales by 8%" is positive, and so is a false claim like "unemployment fell last year".' },
      { type: 'paragraph', text: 'A **normative statement** is a **value judgement**. It says what should happen, and no amount of data settles it, because it rests on what the speaker thinks matters. "The tax on sugary drinks ought to be higher" is normative. The giveaway words are *should*, *ought*, *fair*, *too much*, *better*.' },
      { type: 'bullets', items: [
        '**Positive:** "A minimum wage set above the market wage reduces employment in that market." Evidence can test it.',
        '**Normative:** "A minimum wage should be high enough to live on." Evidence can inform it; it cannot settle it.',
        '**Both in one sentence:** "Unemployment is 7%, which is unacceptably high." The figure is positive; *unacceptably* is not.',
      ] },
      { type: 'paragraph', text: 'Testable does not mean true, and normative does not mean unimportant. Most of what economics is used for — policy — is normative at the point of decision, and it is better made when the positive analysis underneath it is sound.' },
    ],
    realExample: { emoji: '🥤', text: 'Where countries have taxed sugar-sweetened drinks, two questions stay separate: how far purchases fell, and whether the tax should exist. Research answers the first; the second turns on the weight given to health against freedom of choice and the cost to poorer households.' },
    misconception: 'Students think positive means good and normative means bad, or that a positive statement must be correct. Neither holds. Write instead: positive statements can be tested against evidence, whether or not they turn out to be true; normative statements contain a judgement about what ought to be.',
    examMatters: 'Multiple-choice items on this distinction turn on one word. Scan for *should*, *ought*, *fair*, *too*, *unacceptable* or *better* — if one is there, the statement is normative, whatever else the sentence contains.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement into positive or normative:',
      groups: [
        { name: 'Positive', items: ['Inflation was 4.2% last year', 'A higher fuel tax reduces the distance people drive', 'Two-thirds of the workforce is employed in services'], why: 'Each is a claim about what is the case, and evidence could confirm or refute it — even the ones that turn out to be false' },
        { name: 'Normative', items: ['The government ought to spend more on schools', 'Income is distributed too unequally', 'Free healthcare is a better use of public money'], why: 'Each rests on a judgement about what matters, so no amount of data settles it' },
      ],
    }),
  };
})();

const valueJudgements = (() => {
  const sid = subId('value-judgements-in-policy');
  return {
    id: sid,
    title: 'Value Judgements in Policy',
    keyIdea: 'Two economists can agree completely about the evidence and still disagree about the policy, because the choice between policies depends on what each of them thinks matters most.',
    body: [
      { type: 'paragraph', text: 'Policy decisions almost never follow from the evidence alone. The evidence says what a policy would do; a **value judgement** says whether that is worth doing. Where two economists differ, it is usually here rather than over the facts.' },
      { type: 'paragraph', text: 'Most disagreements come down to how much weight is put on competing aims: efficiency against fairness, growth now against the environment later, the average against the worst-off, freedom to choose against protection from the consequences.' },
      { type: 'bullets', items: [
        'Both agree a fuel subsidy lowers transport costs and raises fuel use. Whether to keep it depends on the weight put on today\'s living costs against tomorrow\'s emissions.',
        'Both agree a tariff protects jobs in one industry and raises prices for everyone. Whether to impose it depends on whose interests count more.',
        'Both agree a policy raises average income while widening the gap. Whether that is an improvement is a judgement, not a measurement.',
      ] },
      { type: 'paragraph', text: 'Value judgements also shape what gets studied and which numbers count as success. An economist who treats unemployment as the central problem and one who treats inflation as the central problem will build different models and recommend different policies from identical data.' },
    ],
    realExample: { emoji: '⛽', text: 'Several governments that subsidise fuel face the same trade-off when they consider removing the subsidy: the public finances improve and fuel use falls, while transport and food costs rise immediately for the poorest households. The economics of the two effects is not in dispute; the decision is about which one weighs more.' },
    misconception: 'Students write that economists disagree because economics is unscientific. More often they agree about the mechanism and disagree about the objective. Write instead: the disagreement is normative — it is about which outcome should be preferred, not about what the policy does.',
    examMatters: 'On a 20-mark Evaluate, the strongest judgements say *whose* interests are being weighed and on what criterion — efficiency, equity, sustainability — rather than asserting that one side of the argument is simply stronger.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each policy disagreement to the value judgement underneath it:',
      pairs: [
        { left: 'Keep or remove a fuel subsidy', right: 'Living costs today against emissions tomorrow', why: 'Both sides accept the subsidy lowers costs and raises fuel use; they weigh present and future differently' },
        { left: 'Impose or drop a tariff on imported steel', right: 'Jobs in one industry against prices for everyone', why: 'The effects are agreed; the disagreement is over whose interests count more' },
        { left: 'Raise the minimum wage', right: 'Higher pay for those in work against the risk to those seeking it', why: 'The dispute is about which group\'s position should be protected first' },
        { left: 'Fund a new hospital or a new port', right: 'Health now against the growth that pays for health later', why: 'Both are defensible uses of the same money; the choice is about priority' },
      ],
      distractors: ['Whether the statistics have been measured accurately'],
    }),
  };
})();

/* ══ Block 3 — Scarcity, Choice and Opportunity Cost (1.3.1 · 3) ═══════════ */

const wantsAndResources = (() => {
  const sid = subId('the-basic-economic-problem'); // March id, kept
  return {
    id: sid,
    title: 'Unlimited Wants and Finite Resources',
    keyIdea: 'Wants have no limit; the resources available to satisfy them do. That permanent gap is scarcity, and it is the problem the whole subject is built on.',
    body: [
      { type: 'paragraph', text: 'Human **wants** are unlimited. Satisfying one reveals another: a household that gets clean water wants electricity, then a motorcycle, then schooling. **Resources** are finite — there is only so much land, so many people able to work, so much machinery and so much time.' },
      { type: 'paragraph', text: 'Economists group resources into four **factors of production**: **land** (everything natural — soil, minerals, water, forests), **labour** (human effort, physical and mental), **capital** (goods made in order to produce other goods — machines, tools, buildings) and **enterprise** (organising the other three and carrying the risk of doing so).' },
      { type: 'paragraph', text: 'Unlimited wants meeting finite resources is **scarcity**, and it is permanent. It is not the same as a shortage: a shortage is a temporary gap in one market that a higher price can close. Scarcity cannot be closed by anything, which is why every economy — rich or poor, planned or market — has to answer three questions: **what** to produce, **how** to produce it, and **for whom**.' },
    ],
    realExample: { emoji: '🏝️', text: 'A small island state with limited flat land must decide whether a given hectare becomes housing, farmland or a solar array. Nothing about being wealthy removes the choice; it only changes which options are affordable.' },
    misconception: 'Students use scarcity and shortage interchangeably. A shortage is temporary and specific — this market, this month. Scarcity is permanent and universal. Write instead: scarcity is the permanent gap between unlimited wants and finite resources, and it exists even when nothing is in short supply.',
    examMatters: 'A Define (2 marks, WEC11 Appendix 6) on scarcity needs both halves: wants that are unlimited *and* resources that are finite. One half on its own does not define the problem.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each resource into the factor of production it belongs to:',
      groups: [
        { name: 'Land', items: ['An iron ore deposit', 'A river used for irrigation'], why: 'Both are gifts of nature, used in production without having been produced' },
        { name: 'Labour', items: ['A welder\'s skill', 'An accountant\'s working hours'], why: 'Both are human effort supplied to production, physical or mental' },
        { name: 'Capital', items: ['A delivery van', 'A textile factory\'s looms'], why: 'Both were produced in order to produce something else, rather than to be consumed' },
      ],
    }),
  };
})();

const renewableResources = (() => {
  const sid = subId('renewable-and-non-renewable-resources');
  return {
    id: sid,
    title: 'Renewable and Non-Renewable Resources',
    keyIdea: 'A renewable resource replaces itself and lasts indefinitely if used no faster than it regenerates; a non-renewable resource has a fixed stock that every unit used reduces.',
    body: [
      { type: 'paragraph', text: 'A **renewable resource** renews itself naturally within a useful period: fish stocks, forests, soil fertility, and the flow resources — solar, wind, tidal — that arrive whether or not they are used. A **non-renewable resource** exists in a fixed stock formed over geological time: crude oil, natural gas, coal, copper, phosphate.' },
      { type: 'paragraph', text: 'The distinction is about the **rate of use**, not about the resource being unlimited. A forest is renewable, but a forest felled faster than it regrows behaves exactly like a non-renewable one and eventually disappears. The **sustainable rate** is the rate at which a renewable resource can be used indefinitely without the stock falling.' },
      { type: 'bullets', items: [
        '**Renewable, used sustainably:** timber harvested at the rate the forest regrows — the stock is unchanged next year.',
        '**Renewable, used unsustainably:** a fishery taking more each season than the stock can replace — the catch rises, then collapses.',
        '**Non-renewable:** every barrel of oil extracted is one the stock no longer holds; use can be slowed, never reversed.',
      ] },
      { type: 'paragraph', text: 'Both kinds are scarce and both carry an opportunity cost. For a non-renewable resource part of that cost falls on the future: a tonne of copper used now is one unavailable to anyone later, so extraction decisions are decisions about later generations.' },
    ],
    realExample: { emoji: '🐟', text: 'Fisheries that are harvested faster than the stock reproduces follow the same pattern wherever they are: catches rise for several seasons, then fall sharply as the breeding population thins. The resource is renewable; the way it was used was not.' },
    misconception: 'Students treat renewable as meaning inexhaustible. Renewability is a rate, not a guarantee. Write instead: a renewable resource lasts indefinitely only while it is used at or below the rate at which it regenerates.',
    examMatters: 'Questions on sustainability usually reward the rate point rather than a list. Saying that a resource is renewable is worth little; saying that it is renewable but is being used above its sustainable rate is the analysis.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each resource to the reason it falls where it does:',
      pairs: [
        { left: 'Crude oil', right: 'Fixed stock formed over geological time', why: 'Nothing replaces what is extracted within any human timescale' },
        { left: 'A managed forest', right: 'Regrows, if felling matches replanting', why: 'It is renewable at a rate, and only at that rate' },
        { left: 'Sunlight on a solar farm', right: 'Arrives whether or not it is used', why: 'A flow resource: using it today takes nothing from tomorrow' },
        { left: 'An overfished tuna stock', right: 'Renewable, but used above its sustainable rate', why: 'The category is renewable; the outcome is depletion, because the rate is wrong' },
      ],
      distractors: ['Not a resource at all, because it has no market price'],
    }),
  };
})();

const opportunityCost = (() => {
  const sid = subId('opportunity-cost'); // March id, kept
  return {
    id: sid,
    title: 'Scarcity and Opportunity Cost',
    keyIdea: 'Opportunity cost is the value of the next best alternative forgone — one alternative, the best of those rejected, not all of them and not the money spent.',
    body: [
      { type: 'paragraph', text: 'Because resources are scarce, using them one way means not using them another. **Opportunity cost** is what that costs: the value of the **next best alternative forgone**. It is the link between scarcity and every decision made under it.' },
      { type: 'flow', steps: [
        'Wants exceed the resources available to meet them',
        'So a choice between competing uses cannot be avoided',
        'Choosing one use rejects all the others',
        'The best of the rejected uses is the opportunity cost',
      ], result: 'Every choice made under scarcity carries a cost, whether or not money changes hands', resultType: 'neutral' },
      { type: 'paragraph', text: 'Two precision points decide most marks. First, **next best**, singular: a student choosing a Saturday shift over football, another firm\'s shift and sleeping gives up only the best of those three, because only one could have been done. Second, opportunity cost is not **money cost**: time spent studying costs the earnings forgone, and a firm using a building it owns forgoes the rent.' },
      { type: 'paragraph', text: 'It applies to every economic agent. A household choosing school fees over a motorcycle, a firm choosing a new machine over a marketing campaign, a government choosing a hospital over a port — all face the same structure of cost.' },
    ],
    realExample: { emoji: '🎓', text: 'A school leaver offered a full-time job who enrols at university instead gives up the wages of that job for the years of the degree. Those forgone earnings are usually far larger than the tuition fee, which is why they belong in the calculation even though no one pays them.' },
    misconception: 'Students list every alternative given up, or give the money paid as the cost. Both lose the concept. Write instead: the opportunity cost is the single next best alternative forgone, valued whether or not any money changed hands.',
    examMatters: 'A question asking for *the* opportunity cost of a decision in a data response wants one named alternative from the data, not a list and not the price. Naming what the resource would otherwise have done is the mark.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the chain from scarcity to opportunity cost in the order the reasoning runs, from first to last:',
      correctOrder: [
        'Wants are greater than the resources available',
        'A choice between competing uses becomes unavoidable',
        'Picking one use means turning down the others',
        'The best of those turned down is the opportunity cost',
      ],
      why: [
        'Scarcity is the starting condition; nothing follows without it',
        'If resources were sufficient there would be nothing to choose between',
        'A choice is only a choice because alternatives are rejected',
        'The cost is the best of the rejected uses, which is why it is the last link',
      ],
    }),
  };
})();

const freeAndEconomicGoods = (() => {
  const sid = subId('free-goods-and-economic-goods');
  return {
    id: sid,
    title: 'Free Goods and Economic Goods',
    keyIdea: 'An economic good is scarce, so producing or consuming one always costs something forgone; a free good is not scarce, so it costs nothing forgone — and almost nothing qualifies.',
    body: [
      { type: 'paragraph', text: 'An **economic good** is scarce: there is not enough of it to satisfy every want, so it has a positive opportunity cost. Producing one uses resources that could have made something else. Nearly every good is of this kind — rice, phones, haircuts, hospital beds.' },
      { type: 'paragraph', text: 'A **free good** is not scarce at all: there is enough for everyone at zero cost, so taking one leaves no less for anyone else and nothing is forgone. Its opportunity cost is zero. The textbook examples are air to breathe, sunlight falling on a field and seawater in the open ocean.' },
      { type: 'bullets', items: [
        '**Free is not zero-priced.** A hospital appointment provided at no charge is an economic good: staff, beds and equipment had other uses, and someone bears that cost.',
        '**Free goods can stop being free.** Clean air in a polluted city is scarce, because cleaning it costs resources, so it has become an economic good.',
        '**The test is opportunity cost, not price.** If one more unit uses resources that had another use, the good is economic.',
      ] },
      { type: 'paragraph', text: 'The distinction matters because economics is about allocating what is scarce. Free goods need no allocating: no choice arises, so the subject has nothing to say about them.' },
    ],
    realExample: { emoji: '💧', text: 'Seawater in the open ocean is a free good. The same water desalinated and piped to a household in a Gulf city is an economic good: the plant, the energy and the pipes all had other uses, and that is true whatever the household is charged.' },
    misconception: 'Students call anything with a zero price a free good — school meals, wi-fi, healthcare. Price is not the test. Write instead: a free good has zero opportunity cost, while a zero-priced good still used scarce resources, so someone else has paid for it.',
    examMatters: 'Multiple-choice items here almost always offer a zero-priced service as a distractor. Ask whether one more unit would use resources that had another use; if so, the good is economic.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the distinction between the two kinds of good:',
      template: [
        'An ___ good is scarce, so making one more unit has a positive opportunity cost',
        '→ A ___ good is not scarce, so nothing at all is forgone in providing it',
        '→ The test is opportunity cost, not the ___ the consumer is charged',
      ],
      answers: ['economic', 'free', 'price'],
      hints: ['the kind almost every good belongs to', 'air to breathe and sunlight are the standard examples', 'what a zero-priced hospital visit misleads students about'],
      distractors: ['public', 'value'],
    }),
  };
})();

/* ══ Block 4 — Production Possibility Frontiers (1.3.1 · 4) ════════════════ */

const readingThePPF = (() => {
  const sid = subId('the-ppf-model'); // March id, kept
  return {
    id: sid,
    title: 'Reading the Frontier',
    keyIdea: 'A production possibility frontier shows every combination of two goods an economy can produce with its resources fully and efficiently used.',
    body: [
      { type: 'paragraph', text: 'A **production possibility frontier** (PPF) puts one good on each axis and draws the boundary of what is achievable. Maraya makes capital and consumer goods, in thousands of units. Using every resource fully it could make 40 capital and no consumer goods — point A, written (0, 40) — or point F (50, 0), or any combination on the curve between.' },
      { type: 'bullets', items: [
        '**On the frontier** — A to F, including C (20, 33) and D (30, 25): every resource is employed in its best role. This is **productive efficiency**.',
        '**Inside the frontier** — G (20, 20): resources are **unemployed or misallocated**, so more of both goods is possible with what the economy already has.',
        '**Beyond the frontier** — H (40, 32): **unattainable** today. It would need more resources, better resources or better technology.',
      ] },
      { type: 'paragraph', text: 'The curve slopes downward because resources are scarce and fully used: more of one good must come out of the other. It is bowed outward — **concave** — because resources are not equally suited to both uses, which the next step measures.' },
      { type: 'paragraph', text: 'The model assumes two goods, a fixed stock of resources, fixed technology and a given period — which is why it says anything definite, and the first thing to question in an evaluation.' },
    ],
    realExample: { emoji: '🏭', text: 'An economy in a deep recession sits at a point like G: factories idle and workers unemployed, so more of both goods is available without anything new being built. Recovery moves it towards its existing frontier rather than pushing that frontier out.' },
    misconception: 'Students read a point inside the curve as a choice to produce less. It is not a choice between goods; it is waste. Write instead: inside the frontier, resources are unemployed or misallocated, so more of both goods is available at no cost in the other.',
    examMatters: 'A Draw (4 marks, WEC11 Appendix 6) asks for an accurately labelled diagram: both axes named with their good and units, the curve bowed outward, and any point the question names marked and identified.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each point on Maraya\'s frontier by where it lies and what that means:',
      groups: [
        { name: 'On the frontier', items: ['C: 20 consumer, 33 capital', 'E: 40 consumer, 14 capital'], why: 'Every resource is employed and well used, so more of one good now costs some of the other' },
        { name: 'Inside the frontier', items: ['G: 20 consumer, 20 capital', 'A point with 10 consumer and 25 capital'], why: 'Resources are unemployed or misallocated, so more of both goods is possible with what already exists' },
        { name: 'Beyond the frontier', items: ['H: 40 consumer, 32 capital', 'A point with 50 consumer and 10 capital'], why: 'It exceeds what today\'s resources and technology can produce, whatever combination is chosen' },
      ],
    }),
  };
})();

const marginalOpportunityCost = (() => {
  const sid = subId('opportunity-cost-marginal-analysis');
  const steps = PPF_STEPS.map((s) => `${s.from} to ${s.to}: ${s.givenUp} given up for ${s.gained} gained, so ${s.perUnit} capital goods each`);
  return {
    id: sid,
    title: 'Opportunity Cost Through Marginal Analysis',
    keyIdea: 'Opportunity cost is read off the frontier as the good given up divided by the good gained, and along a concave curve it rises with every step.',
    body: [
      { type: 'paragraph', text: 'On the frontier, opportunity cost stops being a definition and becomes a number. Take one step along Maraya\'s curve and divide what is given up by what is gained.' },
      { type: 'subheading', text: 'From C to D' },
      { type: 'bullets', items: [
        'At C (20, 33) Maraya makes 20 thousand consumer and 33 thousand capital goods.',
        'At D (30, 25) it makes 30 thousand consumer and 25 thousand capital goods.',
        'Consumer goods gained = 30 − 20 = **10**. Capital goods given up = 33 − 25 = **8**.',
        'Opportunity cost per consumer good = 8 ÷ 10 = **0.8 capital goods**.',
      ] },
      { type: 'paragraph', text: 'Repeat the step along the whole curve and the cost climbs: **0.2** from A to B, **0.5** from B to C, **0.8** from C to D, **1.1** from D to E, **1.4** from E to F. This is **increasing marginal opportunity cost**, and it is why the frontier is bowed outward rather than straight.' },
      { type: 'paragraph', text: 'Resources are not equally good at both jobs. The first workers and machines moved into consumer goods are those least suited to capital goods, so little is lost. As the shift continues, resources well suited to capital goods must move too, and each costs more than the last.' },
    ],
    realExample: { emoji: '🌾', text: 'An economy shifting land from grain to cotton moves its least grain-suited fields first, and loses little grain. Pushing further means converting the best grain land, where the loss per hectare of cotton gained is far higher — the same rising cost, in a field rather than on a curve.' },
    misconception: 'Students say a concave PPF shows constant opportunity cost, or that it bends because of diminishing returns. Write instead: the frontier is concave because resources are imperfectly substitutable, so each extra unit of one good costs more of the other than the last.',
    examMatters: 'A Calculate (2 or 4 marks, WEC11 Appendix 6) wants both subtractions shown, then the division, then the answer with its unit — "0.8 capital goods per consumer good", not a bare 0.8.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the calculation of opportunity cost from C to D on Maraya\'s frontier:',
      template: [
        'Consumer goods gained = 30 − 20 = ___ thousand',
        '→ Capital goods given up = 33 − 25 = ___ thousand',
        '→ Opportunity cost per consumer good = given up ÷ gained = ___ capital goods',
      ],
      answers: ['10', '8', '0.8'],
      hints: ['the gain along the horizontal axis', 'the fall along the vertical axis', 'given up divided by gained'],
      distractors: ['1.25', '5'],
    }),
  };
})();

const movementsAndShifts = (() => {
  const sid = subId('shifts-of-the-ppf'); // March id, kept
  return {
    id: sid,
    title: 'Movements Along and Shifts in the Frontier',
    keyIdea: 'A movement along the frontier changes the combination produced from the same resources; a shift of the frontier changes what the economy is capable of producing at all.',
    body: [
      { type: 'paragraph', text: 'These are two different events and the diagram distinguishes them clearly. A **movement** is a change of position on a frontier that has not moved. A **shift** is the frontier itself moving.' },
      { type: 'bullets', items: [
        '**Movement along the frontier** (C to D): the same resources, reallocated — more consumer goods, fewer capital goods.',
        '**Movement from inside to the frontier** (G to D): idle resources put to work. More of both goods, and no opportunity cost, which is what makes recovery differ from growth.',
        '**Outward shift**: the whole curve moves out, so unattainable combinations become possible. This is **economic growth**.',
        '**Inward shift**: the curve moves in, so combinations that were possible no longer are — **economic decline**.',
      ] },
      { type: 'paragraph', text: 'An outward shift needs **more resources** (a larger workforce, a new mineral find), **better resources** (education, training, health) or **better technology**. An inward shift comes from resources lost or destroyed: war, disaster, emigration of skilled workers, land degradation.' },
      { type: 'paragraph', text: 'A shift need not be even. Technology helping only one industry pivots the curve outward on that axis while the other intercept stays put.' },
    ],
    realExample: { emoji: '⚡', text: 'An economy that electrifies villages which previously had no supply does not rearrange what it already produces: workshops that could not run machinery now can, and study hours extend past sunset. The resources available have changed, so the frontier moves out rather than the economy moving along it.' },
    misconception: 'Students treat any rise in output as growth. A move from inside the curve towards it is not. Write instead: only a change in the quantity or quality of resources, or in technology, shifts the frontier; using existing resources better is a movement towards it.',
    examMatters: 'When a question gives a change and asks for its effect on the PPF, ask first whether it alters what the economy *could* produce. If it does, the curve shifts; if it only alters what is produced, the economy moves.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change into whether it moves the economy along its frontier or shifts the frontier itself:',
      groups: [
        { name: 'Movement, frontier unchanged', items: ['Idle factories reopen after a recession', 'Land is switched from cotton to grain', 'Unemployed workers are matched to vacancies'], why: 'The quantity and quality of resources are the same; only the use they are put to has changed' },
        { name: 'Shift of the frontier', items: ['A new copper deposit is discovered', 'An earthquake destroys a third of the ports', 'Free secondary schooling raises workforce skills'], why: 'Each changes the resources or the technology available, so it changes what the economy is capable of producing' },
      ],
    }),
  };
})();

const capitalAndConsumerGoods = (() => {
  const sid = subId('capital-and-consumer-goods');
  return {
    id: sid,
    title: 'Capital Goods and Consumer Goods',
    keyIdea: 'Consumer goods satisfy wants now; capital goods are made in order to produce other goods, so choosing them sacrifices consumption today for a frontier further out tomorrow.',
    body: [
      { type: 'paragraph', text: 'A **consumer good** is bought to satisfy a want directly: rice, a shirt, a haircut. A **capital good** is produced in order to produce something else: a loom, a delivery van, a port. The same object can be either — a motorcycle ridden for pleasure is a consumer good, the same one used for deliveries is capital.' },
      { type: 'paragraph', text: 'That is why the two sit on the axes of Maraya\'s frontier. The choice between them is a choice between **now and later**, and it is the clearest use of the PPF model.' },
      { type: 'flow', steps: [
        'Choose a point with more capital goods and fewer consumer goods',
        'Less is consumed this year: living standards are lower now',
        'The extra machines, tools and infrastructure raise productivity',
        'The frontier shifts outward, so more of both goods is possible later',
      ], result: 'Consumption sacrificed now buys a larger frontier later — the trade-off at the heart of growth', resultType: 'good' },
      { type: 'paragraph', text: 'This is the **significance of capital goods for productivity and economic growth**: capital raises output per worker, and output per worker is what moves the frontier. Maraya at B (10, 38) invests heavily and consumes little; at E (40, 14) it does the reverse, and can expect a slower shift outward.' },
    ],
    realExample: { emoji: '🚄', text: 'Economies that sustained high investment rates for decades — building ports, power grids and rail before consumption rose — grew faster than comparable economies that consumed a larger share of income early on. The cost was a lower standard of living during the investment years.' },
    misconception: 'Students call any expensive purchase a capital good, or assume more capital is always better. Write instead: a capital good is defined by its use in production, not its price, and investing always costs consumption now — which a poor economy may be unable to afford.',
    examMatters: 'On an Evaluate about growth, the capital trade-off gives a ready-made judgement: the gain arrives later and is uncertain, the sacrifice is immediate, and the balance depends on how poor the economy is now.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the consequences of choosing more capital goods in the order they occur, from first to last:',
      correctOrder: [
        'A point with more capital and fewer consumer goods is chosen',
        'Households consume less this year than they could have',
        'Extra machines and infrastructure raise output per worker',
        'The frontier shifts outward, so more of both goods becomes possible',
      ],
      why: [
        'The choice of combination comes first; everything else follows from it',
        'The sacrifice is immediate, because the resources are used on capital instead',
        'Capital raises productivity only once it is built and in use',
        'A higher output per worker is what moves the frontier, so it comes last',
      ],
    }),
  };
})();

/* ══ Block 5 — Specialisation, Money and Financial Markets (1.3.1 · 5) ═════ */

const specialisation = (() => {
  const sid = subId('specialisation-and-division-of-labour'); // March id, kept
  return {
    id: sid,
    title: 'Specialisation and the Division of Labour',
    keyIdea: 'Concentrating on one task or one product raises output per worker sharply, and in exchange makes everyone dependent on trade and on each other.',
    body: [
      { type: 'paragraph', text: '**Specialisation** is concentrating on a narrower range of tasks or products than you consume. The **division of labour** is specialisation inside production: breaking a job into separate tasks and giving each to a different worker. It applies to workers, firms, regions and whole countries.' },
      { type: 'paragraph', text: '**Adam Smith** described the effect in the pin factory: one worker doing every step might make a handful of pins a day, while ten workers each doing one step made many thousands between them. He gave three reasons for the gain, and they are still the three to state.' },
      { type: 'bullets', items: [
        '**Dexterity.** Repeating one task makes a worker faster and more accurate at it.',
        '**Time saved.** No time is lost moving between tasks, setting down one tool and picking up another.',
        '**Machinery.** A task narrowed to one repeated operation is one that can be mechanised, and often is.',
      ] },
      { type: 'subheading', text: 'The other side' },
      { type: 'bullets', items: [
        '**Monotony**, so lower motivation, worse quality and higher staff turnover.',
        '**Over-dependence**: one broken link, or one supplier, halts the whole chain.',
        '**Structural unemployment**: a narrowly skilled worker whose task disappears has little to move to.',
        '**Loss of variety** and, for a country, exposure to a fall in the price of the one thing it sells.',
      ] },
    ],
    realExample: { emoji: '🔌', text: 'Countries that specialise heavily in a single export — one crop, one mineral, one assembly stage — raise income while the market is strong and are exposed when it turns, because the resources built up for that specialism cannot quickly do anything else.' },
    misconception: 'Students assert that specialisation always raises living standards. It raises output; whether people are better off depends on whether trade works and on what is lost. Write instead: specialisation raises productivity, and the gain holds only while exchange is reliable and the risk of dependence is bearable.',
    examMatters: 'An Evaluate on specialisation that only lists advantages cannot reach the top levels. The judgement usually turns on conditions: how easily the specialised resources could be redeployed, and how dependable the trade the specialism relies on is.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each consequence of the division of labour into a benefit or a risk:',
      groups: [
        { name: 'Benefit', items: ['Workers become faster at a repeated task', 'Less time is lost switching between jobs', 'Narrow tasks can be mechanised'], why: 'Each raises output from the same workers and hours — the productivity gain Smith described' },
        { name: 'Risk', items: ['Repetitive work lowers motivation', 'One missing supplier halts the whole chain', 'A worker whose single task disappears has little to move to'], why: 'Each is a cost of narrowing: the gain in output is bought with dependence and fragility' },
      ],
    }),
  };
})();

const functionsOfMoney = (() => {
  const sid = subId('money-and-exchange'); // March id, kept
  return {
    id: sid,
    title: 'The Functions of Money',
    keyIdea: 'Money performs four functions, and each one removes a barrier that barter puts in the way of specialising.',
    body: [
      { type: 'paragraph', text: 'Specialisation only pays if what you make can be exchanged for what you need. Under **barter** that needs a **double coincidence of wants**: the other party must have what you want *and* want what you have. A rice farmer wanting a net, a net maker wanting a goat and a goat herder wanting rice trade nothing.' },
      { type: 'bullets', items: [
        '**Medium of exchange.** Everyone accepts money, so each trader sells for money and buys separately. No coincidence of wants is needed.',
        '**Measure of value.** Prices in one unit make goods comparable, so terms need not be negotiated from scratch.',
        '**Store of value.** Money keeps its worth well enough to be held, so today\'s sale can pay for next month\'s purchase.',
        '**Method of deferred payment.** Debts fixed in money and settled later are what make credit, wages and contracts possible.',
      ] },
      { type: 'paragraph', text: 'The **significance for specialisation** is direct: without money a specialist must find someone who happens to want exactly what they make, exactly when they need something. That search cost makes specialising not worth it.' },
      { type: 'paragraph', text: 'High inflation attacks the functions unevenly. Money still works as a medium of exchange, but its value as a store falls and long contracts become unsafe, so people save in foreign currency or goods while still trading daily in the local one.' },
    ],
    realExample: { emoji: '📲', text: 'Mobile money accounts let workers in several East African and South Asian economies be paid, save and send money without a bank branch. The four functions are unchanged; what changed is that the medium of exchange now travels by phone rather than as notes.' },
    misconception: 'Students say money has value because it is backed by gold or printed by a government. It is accepted because everyone expects everyone else to accept it. Write instead: money works while confidence holds, which is why inflation destroys the store of value first.',
    examMatters: 'Questions on money in this topic are about the four functions and their link to specialisation, not about monetary policy. Naming the function and the barrier it removes is the analysis.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the four functions of money:',
      template: [
        'Money is a medium of ___, so no double coincidence of wants is needed',
        '→ It is a ___ of value, so every good carries a price on one scale',
        '→ It is a ___ of value, so worth can be kept and spent later',
        '→ It is a method of ___ payment, so debts can be settled in the future',
      ],
      answers: ['exchange', 'measure', 'store', 'deferred'],
      hints: ['what barter cannot arrange without a coincidence of wants', 'what makes two different goods comparable', 'what lets money be held rather than spent at once', 'what makes credit and wage contracts possible'],
      distractors: ['barter', 'interest'],
    }),
  };
})();

const financialMarkets = (() => {
  const sid = subId('the-role-of-financial-markets');
  return {
    id: sid,
    title: 'The Role of Financial Markets',
    keyIdea: 'Financial markets move funds from those who have more than they need now to those who can use them, through five distinct roles.',
    body: [
      { type: 'paragraph', text: 'A **financial market** is any market where funds are borrowed, lent or exchanged: banks, bond and share markets, foreign exchange and commodities. Money makes exchange possible; financial markets decide where savings go.' },
      { type: 'bullets', items: [
        '**To facilitate saving.** Somewhere safe to put income that is not spent — a deposit account, a bond, a pension — paying a return.',
        '**To make funds available to businesses and individuals.** Those savings are lent on as loans, mortgages and overdrafts, so investment need not wait on a firm\'s own profits.',
        '**To facilitate the exchange of goods and services.** Payment systems, clearing and letters of credit let distant buyers and sellers settle without trusting each other.',
        '**To provide forward markets in commodities and currencies.** A price agreed now for delivery later lets a farmer or an importer fix a cost instead of carrying the risk.',
        '**To provide a market for equities.** Shares raise capital that is never repaid and can be sold on, which is why investors buy them.',
      ] },
      { type: 'paragraph', text: 'Together the five turn idle savings into productive investment. Where they work badly — thin markets, weak contract enforcement, banks lending only to the largest firms — good projects go unfunded and growth is slower than the economy\'s resources allow.' },
    ],
    realExample: { emoji: '☕', text: 'A coffee exporter who agrees today on the price of a shipment due in six months has used a forward market. The price may turn out higher or lower than the agreed one; what the exporter bought was certainty, which is the service the market provides.' },
    misconception: 'Students treat financial markets as gambling detached from the real economy. Speculation exists, but the five roles are functional. Write instead: financial markets channel saving into investment and let firms shift risks they cannot bear onto those willing to hold them.',
    examMatters: 'This part of the topic is examined on the five roles themselves, so knowing them by name is the foundation. Naming which role an institution in the data is performing is what turns knowledge into application.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each role of financial markets to what it lets someone do:',
      pairs: [
        { left: 'Facilitate saving', right: 'A household puts aside income safely and earns a return', why: 'The first role is providing somewhere for unspent income to go' },
        { left: 'Make funds available', right: 'A firm borrows to buy a machine before it has saved the cost', why: 'Savings are lent on, so investment need not wait for accumulated profit' },
        { left: 'Provide a forward market', right: 'An importer fixes the price of a currency for delivery in six months', why: 'A future price is agreed now, which transfers the risk of it moving' },
        { left: 'Provide a market for equities', right: 'A company raises capital by issuing shares it never repays', why: 'Equity is permanent capital, and it is saleable, which is why investors accept it' },
        { left: 'Facilitate exchange of goods', right: 'A buyer and a distant seller settle through a letter of credit', why: 'Payment systems let trade happen between parties who cannot check each other' },
      ],
    }),
  };
})();

/* ══ Block 6 — Free Market, Mixed and Command Economies (1.3.1 · 6) ════════ */

const threeSystems = (() => {
  const sid = subId('free-market-command-and-mixed'); // March id, kept
  return {
    id: sid,
    title: 'The Three Economic Systems',
    keyIdea: 'Economic systems differ in who owns resources and who decides what is produced: private owners responding to prices, the state through a plan, or a combination of the two.',
    body: [
      { type: 'paragraph', text: 'Every economy answers the same three questions — what to produce, how, and for whom — and a system is an answer to the question of *who decides*.' },
      { type: 'bullets', items: [
        '**Free market economy.** Resources privately owned; firms and households decide, guided by prices and profit. The state is confined to defence, law and property rights.',
        '**Command economy.** The state owns the means of production and a planning authority sets output, allocation and prices, rather than buyers and sellers.',
        '**Mixed economy.** Both operate: a private sector allocating most goods, alongside state provision and regulation where the market\'s outcome is judged unacceptable.',
      ] },
      { type: 'paragraph', text: 'The three are points on a spectrum, not three boxes. Every real economy is mixed; they differ in *how* mixed. Hong Kong and Singapore sit towards the market end, the Nordic economies further towards the state, North Korea near the command end — and none is pure.' },
      { type: 'paragraph', text: '**Adam Smith** argued that self-interested individuals, trading freely, reach outcomes that serve others without intending to. The counter-argument is that unregulated markets leave wants unmet and people unprovided for — the case for the state\'s presence.' },
    ],
    realExample: { emoji: '🏘️', text: 'Singapore runs a strongly market-oriented economy alongside a housing programme that accommodates most of its population in publicly developed flats. The mix is deliberate and sits in one economy, which is why placing a country in a single category rarely survives contact with the details.' },
    misconception: 'Students describe a country as "a free market economy". No such economy exists: every state taxes, spends and regulates. Write instead: all real economies are mixed, and they are compared by how far towards the market or the state end of the spectrum they sit.',
    examMatters: 'A question naming a country expects it to be placed on the spectrum with a reason, not sorted into a box. Saying which decisions are left to markets and which are taken by the state is what earns the application mark.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each feature into the economic system it belongs to:',
      groups: [
        { name: 'Free market', items: ['Resources owned privately', 'Profit guides what is produced', 'Buyers and sellers decide'], why: 'Ownership is private and decisions are decentralised, taken by the people trading' },
        { name: 'Command', items: ['The state owns the means of production', 'A planning authority sets output targets', 'Prices are set administratively'], why: 'Ownership and decision-making are both central, so the plan replaces the market' },
        { name: 'Mixed', items: ['A private sector alongside state provision', 'Regulation of privately owned firms'], why: 'Both mechanisms operate at once, which is what every real economy does' },
      ],
    }),
  };
})();

const systemsEvaluated = (() => {
  const sid = subId('advantages-and-disadvantages-of-systems');
  return {
    id: sid,
    title: 'Advantages and Disadvantages of the Two Extremes',
    keyIdea: 'A free market is efficient where competition works and leaves people unserved where it does not; a command economy can guarantee provision but struggles to know what to produce.',
    body: [
      { type: 'subheading', text: 'The free market' },
      { type: 'bullets', items: [
        '**For:** resources follow what people actually buy; competition pushes firms to cut costs; profit rewards innovation and the risk of trying something new; choice is wide.',
        '**Against:** those without income go unserved, however great their need; some goods that benefit everyone are underprovided because no one can be charged; costs imposed on third parties are ignored; incomes can be very unequal; output can swing sharply.',
      ] },
      { type: 'subheading', text: 'The command economy' },
      { type: 'bullets', items: [
        '**For:** essentials can be provided to everyone regardless of income; inequality can be limited deliberately; long projects can be pursued without waiting for a private return; employment can be guaranteed.',
        '**Against:** planners cannot gather what millions of buyers know, so shortages sit beside unwanted surpluses; with no profit or competition there is little pressure to cut costs or innovate; choice is narrow.',
      ] },
      { type: 'paragraph', text: 'The honest comparison is conditional. Markets do best where competition is real, information is good and the effects of a trade fall on the people making it; they do worst where those conditions fail. Planning does best where the objective is clear and agreed; it does worst where the information needed is dispersed among millions of people. That asymmetry is why every economy uses both.' },
    ],
    realExample: { emoji: '📦', text: 'Command economies have repeatedly produced large quantities of goods nobody wanted while queues formed for goods in short supply. The failure is informational: a plan written in advance cannot track millions of changing preferences, which is the difficulty the market mechanism does not have.' },
    misconception: 'Students argue that one system is simply better. No real economy has chosen either extreme. Write instead: each performs well against different criteria, so the comparison must say which criterion is being used — efficiency, equity, stability or choice.',
    examMatters: 'On a 20-mark Evaluate a one-sided answer cannot reach the top levels. Build on conditions — where competition is weak the market case is weaker, where information is dispersed the planning case is — and let the judgement follow.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each outcome to the system whose weakness produces it:',
      pairs: [
        { left: 'Queues for some goods beside unsold stocks of others', right: 'Command: planners cannot know dispersed preferences', why: 'The information needed sits with millions of buyers and never reaches the plan' },
        { left: 'A life-saving treatment unavailable to those who cannot pay', right: 'Free market: allocation follows income, not need', why: 'A market serves demand backed by money, which need alone is not' },
        { left: 'Little pressure to cut costs or improve quality', right: 'Command: no competition and no profit motive', why: 'Without a rival to lose customers to, there is nothing forcing improvement' },
        { left: 'A factory polluting a river it does not pay for', right: 'Free market: costs falling on third parties are ignored', why: 'The firm\'s own costs do not include the damage, so its decision does not account for it' },
      ],
      distractors: ['Mixed: both mechanisms operating at once'],
    }),
  };
})();

const roleOfTheState = (() => {
  const sid = subId('the-role-of-the-state');
  return {
    id: sid,
    title: 'The Role of the State in a Mixed Economy',
    keyIdea: 'In a mixed economy the state does four things the market will not do well on its own: provide, regulate, redistribute and stabilise.',
    body: [
      { type: 'paragraph', text: 'A mixed economy leaves most allocation to markets and gives the state a defined set of jobs. They are the jobs that follow from the free market\'s weaknesses listed in the last step.' },
      { type: 'bullets', items: [
        '**Provision.** Goods no firm can profitably supply because no one can be excluded — defence, street lighting, flood barriers — funded from taxation, often alongside health and schooling.',
        '**Regulation.** Rules where a market outcome is judged unacceptable: safety standards, pollution limits, competition law, licensing. The state changes the rules rather than replacing the market.',
        '**Redistribution.** Taxes and transfers move income from higher to lower earners, because a market distributes by what people own and can sell.',
        '**Stabilisation.** Spending, taxation and the monetary framework moderate the swings in output and employment that market economies produce on their own.',
      ] },
      { type: 'paragraph', text: 'The state is not assumed to do these well. **Government failure** is intervention that leaves the outcome worse: information the state lacks, administrative cost, unintended consequences, or decisions shaped by whoever lobbies hardest.' },
      { type: 'paragraph', text: 'Where the boundary sits is a normative question — the point made two chapters ago. The evidence can say what a given intervention would do; how much weight to give equity against efficiency is a value judgement.' },
    ],
    realExample: { emoji: '🚦', text: 'Congestion charges in several major cities are a regulation rather than a takeover: the roads stay public and the driving stays private, and a price is attached to the cost each driver imposes on the others. The mechanism is the market\'s; the rule is the state\'s.' },
    misconception: 'Students treat state intervention as automatically correcting a market failure. Write instead: intervention is justified where the market outcome is inadequate *and* the state can improve on it — government failure means the second half cannot be assumed.',
    examMatters: 'An Evaluate on intervention is strongest when the counter-argument is government failure rather than a general preference for markets: name the specific information the state would need and say why it may not have it.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the four roles of the state in a mixed economy:',
      template: [
        'It handles ___ of goods no firm can charge for, such as defence',
        '→ It uses ___ to set the rules firms operate under, such as pollution limits',
        '→ It carries out ___ through taxes and transfers between income groups',
        '→ It attempts ___ of output and employment across the economic cycle',
      ],
      answers: ['provision', 'regulation', 'redistribution', 'stabilisation'],
      hints: ['supplying what no one can be excluded from using', 'changing the rules rather than replacing the market', 'moving income from higher to lower earners', 'moderating the swings a market economy produces'],
      distractors: ['nationalisation', 'privatisation'],
    }),
  };
})();

/* ══ assembly ══════════════════════════════════════════════════════════════ */

export const SUBSECTIONS = [
  socialScience, modelsAndCeterisParibus,
  positiveAndNormative, valueJudgements,
  wantsAndResources, renewableResources, opportunityCost, freeAndEconomicGoods,
  readingThePPF, marginalOpportunityCost, movementsAndShifts, capitalAndConsumerGoods,
  specialisation, functionsOfMoney, financialMarkets,
  threeSystems, systemsEvaluated, roleOfTheState,
];

export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  const block = (title, sections, takeaway) => ({
    id: blockId(title),
    title,
    sections,
    takeaway,
    diagramId: diagramIds[title],
    quizIndices: quizIndices[title],
    practiceIndices: practiceIndices[title],
  });
  return [
    block('The Nature of Economics', [socialScience, modelsAndCeterisParibus], [
      'Economics is a social science: scientific in method, but its subject is people.',
      'It cannot run controlled experiments, so its evidence comes from history.',
      'Models simplify deliberately; they are judged by how well they explain.',
      'Ceteris paribus holds everything else constant so one relationship can be isolated.',
    ]),
    block('Positive and Normative Economics', [positiveAndNormative, valueJudgements], [
      'A positive statement is testable against evidence — it may still be false.',
      'A normative statement rests on a value judgement and no data settles it.',
      'Watch for should, ought, fair, too and unacceptable: they signal normative.',
      'Economists often agree on the effects and disagree on what should be done.',
    ]),
    block('Scarcity, Choice and Opportunity Cost', [wantsAndResources, renewableResources, opportunityCost, freeAndEconomicGoods], [
      'Scarcity is unlimited wants meeting finite resources, and it is permanent.',
      'Resources are land, labour, capital and enterprise.',
      'Renewable resources last only while used at or below their regeneration rate.',
      'Opportunity cost is the next best alternative forgone, not the money paid.',
      'A free good has zero opportunity cost; a zero price does not make one.',
    ]),
    block('Production Possibility Frontiers', [readingThePPF, marginalOpportunityCost, movementsAndShifts, capitalAndConsumerGoods], [
      'On the frontier is efficient, inside is waste, beyond is unattainable.',
      'Opportunity cost = the good given up ÷ the good gained, read off the curve.',
      'The frontier is concave because each extra unit costs more than the last.',
      'A movement changes the combination; a shift changes what is possible.',
      'Capital goods sacrifice consumption now and shift the frontier out later.',
    ]),
    block('Specialisation, Money and Financial Markets', [specialisation, functionsOfMoney, financialMarkets], [
      'Specialisation raises output and creates dependence on exchange.',
      'Smith\'s three gains: dexterity, time saved switching, and mechanisation.',
      'Money is a medium of exchange, measure and store of value, and deferred payment.',
      'Barter needs a double coincidence of wants; money removes that barrier.',
      'Financial markets do five jobs, from facilitating saving to trading equities.',
    ]),
    block('Free Market, Mixed and Command Economies', [threeSystems, systemsEvaluated, roleOfTheState], [
      'Systems differ in who owns resources and who decides what is produced.',
      'Every real economy is mixed; they differ only in how mixed.',
      'Markets reward efficiency and innovation and leave some people unserved.',
      'Planning can guarantee provision and cannot gather what buyers know.',
      'The state provides, regulates, redistributes and stabilises — and can fail too.',
    ]),
  ];
}

/* ══ Notes ═════════════════════════════════════════════════════════════════
 * One chapter per block. Coverage is lexical (spec.uncovered), so where a leaf was taught in substance
 * and still reported, a notes item carries the specification's own phrase and says what it means:
 * "inability to conduct scientific experiments", "the role of value judgements in influencing economic
 * decision making and policy", "renewable and non-renewable", "opportunity cost using marginal analysis",
 * "movements along, and shifts in", and each of the five roles of financial markets.
 */
export const NOTES = [
  {
    title: 'The Nature of Economics',
    meta: '4 concepts',
    keyIdea: 'Economics studies human behaviour with scientific method but without the ability to run controlled experiments, so it works through simplified models held together by ceteris paribus.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Social science</strong> — a subject that studies human behaviour using scientific method: observation, theory, testing against evidence, revision.' },
        { type: 'def', text: '<strong>Model</strong> — a simplified representation of an economic relationship, built by assuming away the influences that are not being studied.' },
        { type: 'def', tag: 'exam', text: '<strong>Ceteris paribus</strong> — "all other things being equal": the assumption that holds every other influence constant so one relationship can be isolated.' },
      ] },
      { title: 'WHY ECONOMICS IS DIFFERENT', items: [
        { type: 'mech', text: 'Economics as a social science faces an <strong>inability to conduct scientific experiments</strong>: an economy cannot be run twice with one variable changed, so a controlled comparison is never available.' },
        { type: 'imp', text: 'Evidence comes instead from past episodes, comparisons between countries and natural experiments, all of which carry other differences alongside the one being studied.' },
        { type: 'mech', tag: 'exam', text: 'The <strong>development of models in economics based on assumptions</strong> is what makes the subject workable: each model keeps one relationship, sets the rest aside, and is judged by how well it explains and predicts.' },
        { type: 'mech', tag: 'exam', text: 'The <strong>use of the ceteris paribus assumption in building models and drawing conclusions based on them</strong> is what lets a model state something definite — change one variable, hold every other still — and it is why a prediction can fail without the model being wrong.' },
        { type: 'imp', text: 'A model is judged by how well it explains and predicts, not by whether its assumptions are literally true. An assumption matters only when relaxing it would change the conclusion.' },
        { type: 'link', text: 'Ceteris paribus reappears in every demand and supply chain written later in Unit 1; stating it is what marks a chain as deliberate rather than incomplete.' },
      ] },
    ],
    flow: { steps: ['Observe behaviour', 'Assume everything else constant', 'Derive a prediction', 'Test it and revise'], result: 'A model that holds while its assumptions do', resultType: 'neutral' },
    takeaway: [
      'Economics is scientific in method and social in subject.',
      'No controlled experiments, so evidence is weaker and predictions less certain.',
      'Ceteris paribus is what lets a model say something definite.',
    ],
    examMatters: 'Define (2 marks, WEC11 Appendix 6) wants the subject and the method in one sentence. Where a question asks why economic predictions are uncertain, the controlled-experiment point is the answer.',
    misconception: 'Wrong forecasts do not make a subject unscientific. Method, not accuracy, is what makes economics a science — and its method is constrained by the fact that history runs once.',
  },
  {
    title: 'Positive and Normative Economics',
    meta: '3 concepts',
    keyIdea: 'Positive statements can be tested against evidence; normative statements rest on value judgements, and it is normally the judgements, not the facts, that economists disagree about.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Positive statement</strong> — an objective claim about what is, which evidence could confirm or refute. It may be true or false.' },
        { type: 'def', tag: 'exam', text: '<strong>Normative statement</strong> — a claim about what ought to be, resting on a judgement about what matters.' },
        { type: 'def', text: '<strong>Value judgement</strong> — a view about which outcomes are desirable, which evidence can inform but cannot settle.' },
      ] },
      { title: 'HOW TO TELL THEM APART, AND WHY IT MATTERS', items: [
        { type: 'mech', tag: 'exam', text: 'Scan for <em>should, ought, fair, too, unacceptable, better</em>. One of those words makes a statement normative however much data surrounds it.' },
        { type: 'mech', text: 'A sentence can hold both: "unemployment is 7%, which is unacceptably high" is positive up to the comma.' },
        { type: 'imp', text: 'The <strong>role of value judgements in influencing economic decision making and policy</strong> is that they decide which objective counts most — efficiency, equity, sustainability or freedom of choice — when the evidence about effects is agreed.' },
        { type: 'imp', text: 'Value judgements also shape which questions get studied and which measures count as success, so two economists can build different models from the same data.' },
        { type: 'link', text: 'Every evaluation later in the course ends in a normative judgement; naming the criterion it rests on is what separates a judgement from an assertion.' },
      ] },
    ],
    flow: { steps: ['Establish what the policy does', 'Identify whose interests are affected', 'State the criterion being applied', 'Reach a judgement on that criterion'], result: 'A judgement that can be argued with, rather than asserted', resultType: 'good' },
    takeaway: [
      'Positive = testable, and may be false. Normative = a judgement, and cannot be settled by data.',
      'One word — should, ought, fair, too — is usually the giveaway.',
      'Disagreement between economists is usually normative, not factual.',
    ],
    examMatters: 'Multiple-choice items turn on a single word in the stem. On a 20-mark Evaluate, say whose interests are weighed and against which criterion rather than asserting that one side is stronger.',
    misconception: 'Positive does not mean good, and normative does not mean wrong. A positive statement is one evidence could check, whether or not it survives the check.',
  },
  {
    title: 'Scarcity, Choice and Opportunity Cost',
    meta: '6 concepts',
    keyIdea: 'Unlimited wants and finite resources make scarcity permanent; scarcity forces choice, and every choice costs the next best alternative forgone.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Scarcity</strong> — the permanent gap between unlimited wants and the finite resources available to satisfy them.' },
        { type: 'def', text: '<strong>Factors of production</strong> — land (natural resources), labour (human effort), capital (goods made to produce other goods) and enterprise (organising the rest and bearing the risk).' },
        { type: 'def', tag: 'exam', text: '<strong>Opportunity cost</strong> — the value of the next best alternative forgone when a choice is made.' },
        { type: 'def', text: '<strong>Economic good</strong> — a good that is scarce, so producing one more unit has a positive opportunity cost.' },
        { type: 'def', text: '<strong>Free good</strong> — a good that is not scarce, so nothing is forgone in providing it; its opportunity cost is zero.' },
      ] },
      { title: 'THE DISTINCTIONS THAT CARRY MARKS', items: [
        { type: 'mech', tag: 'exam', text: 'Scarcity is permanent and universal; a shortage is temporary and specific to one market.' },
        { type: 'mech', text: 'The distinction between <strong>renewable and non-renewable resources</strong>: a renewable resource regenerates naturally and lasts indefinitely only while it is used at or below its sustainable rate; a non-renewable resource has a fixed stock that every unit used permanently reduces.' },
        { type: 'imp', text: 'Opportunity cost is the <em>next best</em> alternative, singular, and is not the money paid: forgone earnings and forgone rent are costs even when nothing changes hands.' },
        { type: 'imp', text: 'A zero price does not make a free good. If providing one more unit uses resources that had another use, the good is economic and someone else is bearing the cost.' },
        { type: 'link', text: 'Scarcity is what the production possibility frontier draws: the curve exists because resources are finite, and it slopes down because they are fully used.' },
      ] },
    ],
    flow: { steps: ['Unlimited wants', 'Finite resources', 'Scarcity', 'Choice: what, how, for whom', 'Opportunity cost'], result: 'The chain the whole subject is built on', resultType: 'neutral' },
    takeaway: [
      'Scarcity is permanent; a shortage is temporary.',
      'Land, labour, capital, enterprise — capital is produced in order to produce.',
      'Renewable is a rate, not a guarantee of permanence.',
      'Opportunity cost: the single next best alternative, money or not.',
    ],
    examMatters: 'Define (2 marks, WEC11 Appendix 6) on scarcity needs both halves — unlimited wants and finite resources. A question asking for the opportunity cost of a decision in the data wants one named alternative, not a list.',
    misconception: 'Listing every alternative given up, or giving the price paid, both lose the concept. It is one alternative: the best of those rejected.',
  },
  {
    title: 'Production Possibility Frontiers',
    meta: '6 concepts',
    keyIdea: 'The frontier shows the maximum productive potential of an economy; its slope measures opportunity cost, its position measures capacity, and the two must never be confused.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Production possibility frontier</strong> — the curve showing the maximum combinations of two goods an economy can produce with its resources fully and efficiently employed.' },
        { type: 'def', text: '<strong>Productive efficiency</strong> — a position on the frontier: more of one good is only possible with less of the other.' },
        { type: 'def', text: '<strong>Capital good</strong> — a good produced in order to produce other goods. <strong>Consumer good</strong> — a good bought to satisfy a want directly.' },
        { type: 'def', text: '<strong>Economic growth</strong> — an outward shift of the frontier, from more resources, better resources or better technology. <strong>Economic decline</strong> is an inward shift.' },
      ] },
      { title: 'READING AND CALCULATING', items: [
        { type: 'mech', tag: 'exam', text: 'Maraya\'s frontier: A (0, 40), B (10, 38), C (20, 33), D (30, 25), E (40, 14), F (50, 0), in thousands of consumer and capital goods. On it is efficient; G (20, 20) inside is unemployment or misallocation; H (40, 32) beyond it is unattainable.' },
        { type: 'mech', text: 'The curve also separates <strong>possible and unobtainable production</strong>: every combination on or inside it is possible with today\'s resources, and everything beyond it is unobtainable until the frontier itself moves.' },
        { type: 'mech', tag: 'exam', text: '<strong>Opportunity cost using marginal analysis</strong>: take one step along the curve and divide the good given up by the good gained. From C to D, 8 capital goods are given up for 10 consumer goods, so one consumer good costs 8 ÷ 10 = 0.8 capital goods.' },
        { type: 'mech', text: 'Along Maraya\'s whole frontier that cost is 0.2, then 0.5, then 0.8, then 1.1, then 1.4. Increasing marginal opportunity cost is why the curve is concave rather than straight.' },
        { type: 'imp', text: 'The distinction between <strong>movements along, and shifts in, production possibility frontiers</strong>: a movement changes which combination is produced from unchanged resources, while a shift changes what the economy could produce at all. Causes of a shift are more or better resources and better technology; causes of an inward shift are resources lost or destroyed.' },
        { type: 'imp', text: 'The significance of capital goods: they raise output per worker, and output per worker is what moves the frontier outward. Choosing them costs consumption now for a larger frontier later.' },
        { type: 'link', text: 'A PPF diagram is the standard way to illustrate scarcity, choice, opportunity cost and growth in one figure, which is why it appears in Unit 1 answers well beyond this topic.' },
      ] },
    ],
    formula: { label: 'OPPORTUNITY COST FROM A PPF', text: 'units of the good given up ÷ units of the good gained' },
    flow: { steps: ['Pick two points on the frontier', 'Find the gain along one axis', 'Find the loss along the other', 'Divide the loss by the gain'], result: 'Opportunity cost per unit, in units of the other good', resultType: 'good' },
    takeaway: [
      'On = efficient, inside = unemployment or misallocation, beyond = unattainable.',
      'Opportunity cost = given up ÷ gained; from C to D that is 8 ÷ 10 = 0.8.',
      'Concave because resources are imperfectly substitutable, so each step costs more.',
      'Movement ≠ shift: one changes the combination, the other changes capacity.',
    ],
    examMatters: 'Draw (4 marks, WEC11 Appendix 6) wants both axes labelled with the good and its units and the curve bowed outward. Calculate (2 or 4 marks) wants both subtractions, the division and the unit stated.',
    misconception: 'A point inside the curve is waste, not a choice between goods; and a move from inside towards the curve is not economic growth, because the frontier has not moved.',
  },
  {
    title: 'Specialisation, Money and Financial Markets',
    meta: '6 concepts',
    keyIdea: 'Specialising raises output and makes exchange essential; money makes exchange workable, and financial markets move the savings it creates to the people who can use them.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Specialisation</strong> — concentrating on a narrower range of tasks or products than you consume. <strong>Division of labour</strong> — specialisation within production, each worker taking one task.' },
        { type: 'def', text: '<strong>Double coincidence of wants</strong> — the condition barter requires: each party must hold what the other wants and want what the other holds.' },
        { type: 'def', text: '<strong>Financial market</strong> — any market in which funds are borrowed, lent or exchanged: banks, bond markets, equity markets, foreign exchange and commodity markets.' },
      ] },
      { title: 'THE THREE PARTS OF THIS SUB-TOPIC', items: [
        { type: 'mech', tag: 'exam', text: 'Adam Smith\'s views on the division of labour: output rises through <strong>dexterity</strong> from repetition, <strong>time saved</strong> not switching between tasks, and the <strong>machinery</strong> that a narrow repeated task makes possible.' },
        { type: 'imp', text: 'Disadvantages of specialising in the production of goods and services: monotony and lower motivation, over-dependence on other links in the chain, structural unemployment when a narrow task disappears, and for a country, exposure to a fall in the price of its one export.' },
        { type: 'mech', tag: 'exam', text: 'The four functions of money — a <strong>medium of exchange</strong>, a <strong>measure of value</strong>, a <strong>store of value</strong> and a <strong>method of deferred payment</strong> — and their significance for specialisation: without them the search for a double coincidence of wants makes specialising not worth the trouble.' },
        { type: 'mech', text: 'The role of financial markets, to facilitate saving: households are given a safe place for unspent income that pays a return, which is what turns income into savings at all.' },
        { type: 'mech', text: 'The role of financial markets, to make funds available to businesses and individuals: those savings are lent on as business loans and mortgages, so investment does not wait for a firm to accumulate the whole cost.' },
        { type: 'mech', text: 'The role of financial markets, to facilitate the exchange of goods and services: payment systems, clearing and letters of credit let a buyer and a distant seller settle without trusting one another directly.' },
        { type: 'mech', text: 'The role of financial markets, to provide forward markets in commodities and currencies: a price agreed now for delivery later lets a farmer, an importer or an airline fix a cost instead of carrying the risk that it moves.' },
        { type: 'mech', text: 'The role of financial markets, to provide a market for equities: shares raise capital that is never repaid and can be sold on afterwards, which is why investors are willing to buy them.' },
        { type: 'link', text: 'Specialisation between countries is where Unit 4 picks this up; here the requirement is the advantages and disadvantages, not the theory of trade.' },
      ] },
    ],
    flow: { steps: ['Specialise', 'Produce a surplus of one thing', 'Exchange it for money', 'Buy everything else'], result: 'Higher output than self-sufficiency, at the cost of dependence on exchange', resultType: 'good' },
    takeaway: [
      'Smith\'s three gains: dexterity, time saved switching, mechanisation.',
      'The costs are monotony, dependence and structural unemployment.',
      'Money: medium of exchange, measure of value, store of value, deferred payment.',
      'Financial markets: saving, funds for borrowers, payments, forward markets, equities.',
    ],
    examMatters: 'An Evaluate on specialisation that lists only advantages cannot reach the top levels; the judgement turns on how redeployable the specialised resources are and how dependable the trade is. Questions on money here are about the four functions, not monetary policy.',
    misconception: 'Specialisation raises output, not necessarily welfare — the gain depends on exchange working. And money is accepted because others accept it, not because anything backs it.',
  },
  {
    title: 'Free Market, Mixed and Command Economies',
    meta: '5 concepts',
    keyIdea: 'Systems differ in who owns resources and who decides; each extreme performs well on some criteria and badly on others, which is why every real economy is mixed.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        { type: 'def', tag: 'exam', text: '<strong>Free market economy</strong> — resources privately owned, decisions taken by firms and households, guided by prices and profit.' },
        { type: 'def', tag: 'exam', text: '<strong>Command economy</strong> — the state owns the means of production and a planning authority decides output, allocation and prices.' },
        { type: 'def', tag: 'exam', text: '<strong>Mixed economy</strong> — both mechanisms operating: a private sector alongside state provision and regulation.' },
        { type: 'def', text: '<strong>Government failure</strong> — intervention that leaves the outcome worse than the market outcome it was meant to improve.' },
      ] },
      { title: 'COMPARING THEM, AND THE STATE\'S JOBS', items: [
        { type: 'mech', text: 'Advantages of the free market: resources follow what people buy, competition cuts costs, profit rewards innovation, choice is wide. Disadvantages: those without income go unserved, some beneficial goods are underprovided, costs falling on third parties are ignored, inequality can be large and output can swing.' },
        { type: 'mech', text: 'Advantages of the command economy: essentials provided regardless of income, inequality limited deliberately, long projects pursued without a private return, employment guaranteed. Disadvantages: planners cannot gather dispersed information, so shortages sit beside surpluses; no competition means little pressure to cut costs or innovate; choice is narrow.' },
        { type: 'imp', tag: 'exam', text: 'The role of the state in a mixed economy: <strong>provision</strong> of goods no firm can charge for, <strong>regulation</strong> of privately owned firms, <strong>redistribution</strong> through taxes and transfers, and <strong>stabilisation</strong> of output and employment.' },
        { type: 'imp', text: 'Adam Smith argued that self-interested trade produces outcomes that serve others unintentionally. The counter-case is that markets leave wants unmet and people unprovided for, which is the argument for the state\'s presence.' },
        { type: 'link', text: 'Market failure and government failure are developed in their own topics later in Unit 1; here they are the reasons a mixed economy is mixed.' },
      ] },
    ],
    flow: { steps: ['Ask who owns the resources', 'Ask who decides what is produced', 'Place the economy on the spectrum', 'Judge it against a stated criterion'], result: 'A comparison that argues rather than asserts', resultType: 'good' },
    takeaway: [
      'Free market: private ownership, decentralised decisions, prices and profit.',
      'Command: state ownership, central planning, administered prices.',
      'Every real economy is mixed; they differ in how mixed.',
      'The state provides, regulates, redistributes and stabilises — and can fail.',
    ],
    examMatters: 'A question naming a country wants it placed on the spectrum with a reason, not sorted into a box. A 20-mark Evaluate is strongest when the counter-argument to intervention is government failure, named specifically.',
    misconception: 'No country is a free market economy: every state taxes, spends and regulates. Nor is intervention automatically an improvement — government failure is why the second half of the argument has to be made.',
  },
];
