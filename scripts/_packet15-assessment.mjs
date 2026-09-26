/**
 * PACKET 15 — introductory-concepts: quiz, practice, flashcards, common mistakes, extras.
 *
 * Quiz: 32 items, every one on material the Learn Mode body now teaches, every one reachable through a
 * block's quizIndices, correct answers spread across the four positions. Six March items go: three stems
 * the validator's near-duplicate rule caught (q11 of q2, q13 of q3, q23 of q3), one the March audit caught
 * (q19 of q9), the meta-item on positive and normative that made three questions out of one leaf, and q24
 * on the rewards to factors of production, which no leaf of 1.3.1 requires. q17 and q20 are rewritten
 * rather than deleted — "delete or rewrite" — because a positive-statement item and an inward-shift item
 * are not duplicates of a normative-statement item and an outward-shift item. Retained items keep their ids.
 *
 * Practice: IAL ECONOMICS command words and their own tariffs from Appendix 6 — Define 2, Calculate 2 or 4,
 * Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. There is no Assess and no Outline in
 * IAL Economics, so the March Assess (10) and Outline (4) are re-commanded; Define (4) and Explain (6)
 * carried tariffs the subject does not use. All five March ids are kept. Guidance above 6 marks is
 * levels-shaped and allocates no points.
 */
import { id } from './_packet15-util.mjs';

/* ── quiz ──────────────────────────────────────────────────────────────────── */
// [block, stem, options in display order, index of the correct one, explanation, keptId?]
const B1 = 'The Nature of Economics', B2 = 'Positive and Normative Economics';
const B3 = 'Scarcity, Choice and Opportunity Cost', B4 = 'Production Possibility Frontiers';
const B5 = 'Specialisation, Money and Financial Markets', B6 = 'Free Market, Mixed and Command Economies';

const Q = [
  [B1, 'Economics is described as a social science mainly because:',
    ['its predictions about the future are always accurate', 'it studies human behaviour using scientific method', 'it uses mathematics throughout its models', 'governments rely on its findings to make policy'], 1,
    'A social science applies observation, theory and testing to human behaviour. Mathematics and policy use are features of the subject, not what makes it a social science.'],
  [B1, 'Why can economists rarely conduct controlled experiments?',
    ['Economic data are too expensive to collect', 'Economic theories are too complicated to test', 'An economy cannot be re-run with one variable changed', 'Economists are not trained in scientific methods of any kind'], 2,
    'A controlled experiment changes one thing and holds the rest constant. History runs once, so an economy cannot be repeated under different conditions for comparison.'],
  [B1, 'The ceteris paribus assumption is used in economics to:',
    ['prove that the model being used is realistic', 'isolate one variable by holding the others constant', 'guarantee that a model\'s predictions come true', 'remove the need to test a model\'s predictions against real-world evidence'], 1,
    'Ceteris paribus means "all other things being equal". It isolates one relationship; it makes no claim that other influences really are still.', 'introductory-concepts:quiz:67f59d74'],

  [B2, 'Which of the following is a normative statement?',
    ['Unemployment rose to 7% last year', 'A rise in income tax reduces disposable income', 'The government should spend more on healthcare', 'Inflation was higher in 2022 than in 2021'], 2,
    '"Should" signals a value judgement about what ought to happen. The other three are claims about what is the case, which evidence could confirm or refute.', 'introductory-concepts:quiz:d552e630'],
  [B2, 'Which of these statements could be tested against evidence?',
    ['Taxes on high earners are unfairly low', 'A minimum wage above the market wage reduces employment in that market', 'Economic growth matters more than protecting the natural environment for future generations', 'The distribution of income is too unequal'], 1,
    'The claim about the minimum wage is the only one evidence could test. The others contain unfairly, matters more and too — judgements about what ought to be, not claims about what is.', 'introductory-concepts:quiz:9912af07'],
  [B2, 'Two economists agree that removing a fuel subsidy would cut government spending and raise transport costs for poorer households, but disagree about whether to remove it. Their disagreement is:',
    ['about the accuracy of the data each of them used', 'normative: they weigh competing objectives differently', 'a sign that economics cannot be tested at all', 'about which model of the fuel market is the correct one'], 1,
    'The positive analysis is shared. What differs is the weight each gives to the public finances against the position of poorer households, which is a value judgement.'],

  [B3, 'The basic economic problem exists because:',
    ['some countries are far poorer than others', 'wants are unlimited while resources are finite', 'governments intervene too much in markets', 'prices are not always set at the correct level'], 1,
    'Scarcity is the permanent gap between unlimited wants and finite resources. It exists in every economy, rich or poor: poverty makes it sharper but does not cause it, and no level of government intervention or price-setting closes it.', 'introductory-concepts:quiz:1f85cce8'],
  [B3, 'Which of the following is classified as capital as a factor of production?',
    ['A coal seam beneath a farm', 'A machine operator\'s skill', 'A bakery\'s ovens', 'The savings in a firm\'s bank account'], 2,
    'Capital is goods produced in order to produce other goods. The coal is land, the skill is labour, and money in a bank is finance, not a factor of production.'],
  [B3, 'A forest is described as a renewable resource. This means that:',
    ['it can never be exhausted, whatever the rate of use', 'it regenerates, but only lasts if use stays within that rate', 'it costs nothing at all to extract or to use', 'it is owned by the state rather than by private firms'], 1,
    'Renewability is a rate, not a guarantee. A forest felled faster than it regrows behaves exactly like a non-renewable resource and eventually disappears.'],
  [B3, 'The opportunity cost of a government choosing to spend $10 billion on defence is best described as:',
    ['the $10 billion itself', 'the total of every other project the money could have funded', 'the value of the next best alternative use of the $10 billion', 'the tax revenue raised to pay for it'], 2,
    'Opportunity cost is the single next best alternative forgone. It is not the money spent, and it is not the sum of all the alternatives, only one of which could have been chosen.', 'introductory-concepts:quiz:644bacaf'],
  [B3, 'Which of the following best illustrates the concept of opportunity cost?',
    ['A firm paying $2,000 in wages this month', 'A student giving up a paid shift to revise', 'A government raising the rate of income tax', 'A household saving part of its income'], 1,
    'The student forgoes the best alternative use of that time, the wages of the shift. The others are transactions and decisions that name no alternative given up.', 'introductory-concepts:quiz:c8d177e4'],
  [B3, 'Which of the following is most likely to be a free good?',
    ['Tap water piped to a house', 'Sunlight falling on a beach', 'A bus ride the government provides at no charge', 'Schooling provided free at the point of use'], 1,
    'A free good has zero opportunity cost. Sunlight qualifies; treated water, a subsidised bus ride and state schooling all use resources that had other uses, whatever the user is charged.', 'introductory-concepts:quiz:987a82bb'],
  [B3, 'Which question does the economic problem of "how to produce" address?',
    ['Which goods society chooses to make at all', 'Which combination of resources and techniques is used', 'Who receives the goods and services that the economy eventually makes', 'Whether the economy is growing or shrinking'], 1,
    '"How" is about the method of production — labour-intensive or capital-intensive, and with which resources. "What" and "for whom" are the other two questions.', 'introductory-concepts:quiz:8ea6a1b7'],

  [B4, 'A point inside the production possibility frontier indicates that:',
    ['the economy is producing efficiently with all of its resources', 'resources are unemployed or misallocated', 'the combination is unattainable', 'technology has improved'], 1,
    'Inside the frontier, more of both goods could be produced with the resources the economy already has, so something is idle or in the wrong use.', 'introductory-concepts:quiz:29215910'],
  [B4, 'Maraya moves along its frontier from C (20 consumer, 33 capital) to D (30 consumer, 25 capital), in thousands of units. What is the opportunity cost of one extra consumer good?',
    ['0.8 capital goods', '1.25 capital goods', '8 capital goods', '10 capital goods'], 0,
    'Capital given up is 33 − 25 = 8; consumer gained is 30 − 20 = 10. Opportunity cost is 8 ÷ 10 = 0.8 capital goods per consumer good.'],
  [B4, 'A PPF that is concave to the origin (bowed outward) indicates:',
    ['constant opportunity cost at every point on the curve', 'increasing opportunity cost as more of one good is made', 'that the economy is producing at an inefficient point', 'that resources are perfectly substitutable between uses'], 1,
    'Each further unit of one good costs more of the other because resources are imperfectly substitutable. Perfect substitutability would give a straight line.', 'introductory-concepts:quiz:e8152d63'],
  [B4, 'Which of the following would cause an outward shift of the PPF?',
    ['A fall in unemployment', 'A reallocation of land from one crop to another', 'An improvement in production technology', 'An increase in consumer demand'], 2,
    'Better technology raises what the economy could produce. Falling unemployment and reallocating land use existing resources better, which is a movement, and demand does not change capacity.', 'introductory-concepts:quiz:105dee75'],
  [B4, 'Which of the following would shift an economy\'s PPF inward?',
    ['A recession that leaves factories idle', 'An earthquake that destroys a third of the ports', 'A fall in consumer spending', 'A decision to produce more capital goods'], 1,
    'Destroyed infrastructure removes resources, so capacity falls. Idle factories and weak spending leave the frontier where it is and move the economy inside it.', 'introductory-concepts:quiz:19bc8985'],
  [B4, 'An economy moves from a point inside its PPF to a point on it. This is best described as:',
    ['economic growth, because total output has risen', 'a fall in the opportunity cost of both of the goods', 'a movement towards the frontier, with capacity unchanged', 'an outward shift of the frontier caused by new technology'], 2,
    'Output rises because idle or misallocated resources are put to work. The frontier itself has not moved, so this is not economic growth.'],
  [B4, 'Which of the following is a capital good?',
    ['A loaf of bread bought by a household', 'A delivery van used by a bakery', 'A cinema ticket', 'A restaurant meal'], 1,
    'A capital good is produced in order to produce other goods. The van carries the bakery\'s output; the other three are bought to satisfy a want directly.', 'introductory-concepts:quiz:b7d26d87'],
  [B4, 'An economy currently producing on its PPF chooses to produce more capital goods and fewer consumer goods. The most likely long-run effect is:',
    ['a fall in the economy\'s productive capacity', 'an outward shift of the PPF', 'a permanent fall in living standards', 'no change, because the economy is already efficient'], 1,
    'Capital raises output per worker, which raises capacity, so the frontier moves out rather than in. The cost is lower consumption now — a sacrifice in the short run, not a permanent fall — and an economy already on its frontier can still change what it is capable of.', 'introductory-concepts:quiz:488bdffc'],
  [B4, 'Why does a production possibility frontier slope downward?',
    ['Because technology is improving over time', 'Because resources are scarce and already fully used', 'Because consumers always prefer one of the two goods to the other', 'Because opportunity cost is constant'], 1,
    'On the frontier every resource is employed, so more of one good can only come from producing less of the other. That is what makes the curve slope down.'],

  [B5, 'Adam Smith argued that the division of labour increases output because:',
    ['workers are paid more when tasks are divided between them', 'dexterity rises, less time is lost, and tasks can be mechanised', 'firms can charge higher prices for more specialised goods', 'dividing tasks removes the need for any management at all'], 1,
    'Those are the three gains Smith set out in the pin factory. Pay, prices and management are not the source of the productivity increase.', 'introductory-concepts:quiz:01f3c156'],
  [B5, 'Which of the following is a disadvantage of the division of labour?',
    ['Output per worker tends to fall', 'Work becomes repetitive, which can lower motivation and quality', 'Firms can no longer use machinery', 'Training costs rise because each worker must now learn every single task'], 1,
    'Narrow, repeated tasks are monotonous, which raises turnover and can reduce quality. Output per worker rises, machinery becomes easier, and training per worker becomes cheaper.'],
  [B5, 'Specialisation and the division of labour are most likely to lead to:',
    ['a fall in total output', 'greater self-sufficiency for each worker and each household', 'higher output and greater dependence on exchange', 'the end of structural unemployment'], 2,
    'Specialising raises output and means no one produces what they consume, so trade becomes essential. It makes structural unemployment more likely, not less.', 'introductory-concepts:quiz:68346561'],
  [B5, 'Barter requires a double coincidence of wants. This means that:',
    ['both parties must agree on a price expressed in money', 'each must hold what the other wants, and want what they hold', 'the goods exchanged must be of exactly equal value', 'both parties must be trading in the same physical market'], 1,
    'Without money, an exchange only happens if the wants match in both directions. That is the barrier money removes as a medium of exchange.'],
  [B5, 'Which function of money is most undermined by high inflation?',
    ['Medium of exchange', 'Store of value', 'Measure of value', 'Method of deferred payment'], 1,
    'Money still circulates and still prices goods, but it loses purchasing power while held, so it stops being a reliable way to keep wealth.', 'introductory-concepts:quiz:d5f96819'],
  [B5, 'An importer agrees today on the price of a currency to be delivered in six months. Which role of financial markets is being used?',
    ['Providing a market for equities', 'Facilitating saving', 'Providing a forward market in currencies', 'Making funds available to businesses that want to expand'], 2,
    'A forward market fixes a price now for delivery later, which transfers the risk of the price moving. Nothing is being saved, lent or issued as shares.'],
  [B5, 'A company raises capital by issuing shares rather than borrowing. The financial market role being used is:',
    ['providing a market for equities', 'facilitating the exchange of goods and services', 'providing a forward market in commodities', 'facilitating saving'], 0,
    'Equity is capital that is never repaid; the market makes shares saleable afterwards, which is why investors are willing to buy them in the first place.'],

  [B6, 'In a command economy, the main mechanism for allocating resources is:',
    ['the price mechanism', 'central planning by the state', 'competition between private firms', 'the profit motive'], 1,
    'A planning authority sets output, allocation and prices. Prices, competition and profit are the free market\'s mechanisms.', 'introductory-concepts:quiz:1314c98c'],
  [B6, 'In a free market economy, the allocation of resources is primarily determined by:',
    ['government planning targets set in advance', 'the decisions of private buyers and sellers', 'international trade agreements with other states', 'state ownership of the major industries'], 1,
    'Privately owned resources are allocated by the choices of firms and households pursuing their own interests, rather than by a central decision.', 'introductory-concepts:quiz:61bb3579'],
  [B6, 'Which of the following is a role of the state in a mixed economy?',
    ['Setting the output target for every firm in the economy', 'Owning all of the means of production', 'Regulating private firms and redistributing income', 'Abolishing private property altogether'], 2,
    'A mixed economy leaves most allocation to markets and gives the state provision, regulation, redistribution and stabilisation. The other three describe a command economy.'],
];

/*
 * Answer positions. Authored, the correct option fell 2 / 21 / 9 / 0 across the four slots — a bank a
 * student could pass by always picking B. TARGET says which slot each item's correct option must end in,
 * 8 / 8 / 8 / 8, and each options array is rotated until it lands there. Rotation keeps the distractors
 * in their authored order relative to one another, so no explanation that contrasts two options breaks.
 */
const TARGET = [
  2, 0, 3,        // The Nature of Economics
  2, 1, 3,        // Positive and Normative Economics
  1, 2, 0, 3, 1, 2, 0,       // Scarcity, Choice and Opportunity Cost
  3, 0, 1, 2, 3, 0, 1, 2, 3, // Production Possibility Frontiers
  0, 1, 2, 3, 0, 1, 2,       // Specialisation, Money and Financial Markets
  1, 0, 3,        // Free Market, Mixed and Command Economies
];

const rotate = (options, from, to) => {
  const n = options.length;
  const k = ((to - from) % n + n) % n;
  return options.map((_, i) => options[(i - k + n * 2) % n]);
};

export const QUIZ = Q.map(([block, question, options, correctIndex, explanation, keptId], i) => {
  const to = TARGET[i];
  return {
    id: keptId || id('quiz', question),
    block,
    question,
    options: rotate(options, correctIndex, to),
    correctIndex: to,
    explanation,
  };
});

/* ── practice ──────────────────────────────────────────────────────────────── */
// [block, command, marks, question, guidance]. Tariffs are the subject's own (WEC11 Appendix 6).
// Every guidance is two paragraphs (practice.opening, packet 15.1): the first is what a student sees above
// the answer box in guided mode and carries no figure, no mark and no answer; the mark scheme follows. Up
// to 6 marks the points are written "(n marks)" so lib/practice-checklist.js splits them into boxes; above
// 6 the guidance is levels-shaped and allocates no points.
const P = [
  [B1, 'Explain', 4, 'Explain one assumption commonly made when constructing economic models. (4 marks)',
    'Pick one assumption and stay with it. Say what it is, then say what it lets the model do and what it costs the model: an assumption is useful because it simplifies, and limited for exactly the same reason.\nKnowledge: a model is a simplified representation of an economic relationship, built by assuming away the influences not being studied (1 mark). Application: one named assumption and what it sets aside, such as ceteris paribus, holding every other influence constant; or that buyers know every price in the market; or that agents act in their own interest (1 mark). Analysis, first stage: the assumption is what lets the model produce a definite prediction from a change in one variable (1 mark). Analysis, second stage: it is also the limit on that prediction, because the conclusion holds only while the assumption does (1 mark). Defining the assumption without saying what it buys and what it costs answers half the question.',
    'introductory-concepts:practice:0312027b'],
  [B2, 'Explain', 4, 'Explain, using one example of each, the difference between a positive and a normative statement. (4 marks)',
    'Define each kind of statement by the test that tells them apart, not by whether you agree with it. Then give one example of each that you could put to that test, and say why one of them passes it and the other cannot.\nKnowledge: a positive statement is an objective claim about what is, which evidence could confirm or refute (1 mark); a normative statement is a claim about what ought to be and rests on a value judgement (1 mark). Application: a worked pair, such as "a 20% tax on sugary drinks reduced their sales by 8%", which could be checked against sales data, and "the tax on sugary drinks ought to be higher", which no data settles (1 mark). Analysis: the second cannot be tested because it depends on the weight given to health against freedom of choice and the cost to poorer households, while the first may still turn out false, because testable is not the same as true (1 mark).'],
  [B3, 'Define', 2, 'Define the term \'opportunity cost\'. (2 marks)',
    'A definition of this term has two parts, and a vague phrase earns neither. Be precise about how many alternatives count, and about whether the cost has to be money.\nThe next best alternative (1 mark) forgone when a choice is made (1 mark). It is the next best alternative, singular, not every alternative given up, and it is a value forgone rather than the money paid: a student who revises instead of taking a paid shift bears the forgone wages as the cost. "What you give up" alone is incomplete.',
    'introductory-concepts:practice:daea62ef'],
  [B3, 'Explain', 4, 'Explain two reasons why the basic economic problem affects both households and governments. (4 marks)',
    'Start from what the basic economic problem is, then take each agent in turn. For each one, name the limited resource it works with and the choice that limit forces on it.\nKnowledge: the basic economic problem is scarcity, unlimited wants meeting finite resources, which forces every economic agent to choose (1 mark). Application to a household: a finite income against unlimited wants, so spending on school fees means not buying a motorcycle (1 mark). Application to a government: a finite tax revenue against competing demands, so funding a hospital means not funding a port (1 mark). Analysis: both chains end in the same place: the choice cannot be avoided, and whichever option is rejected is the opportunity cost (1 mark). The marks are for showing scarcity operating on both agents, not for defining it twice.',
    'introductory-concepts:practice:81d54f89'],
  [B4, 'Calculate', 4, 'Maraya can produce 30 thousand consumer goods and 25 thousand capital goods (point D), or 40 thousand consumer goods and 14 thousand capital goods (point E). Calculate the opportunity cost of one extra consumer good in moving from D to E. (4 marks)',
    'Work out what is gained and what is given up separately before dividing, and decide which good goes on top of the fraction by asking what the cost is measured in. Show every stage, and finish with the unit.\nConsumer goods gained = 40 − 30 = 10 thousand (1 mark). Capital goods given up = 25 − 14 = 11 thousand (1 mark). Opportunity cost per consumer good = 11 ÷ 10 = 1.1 (1 mark). The unit: 1.1 capital goods per consumer good, not a bare 1.1 (1 mark). Dividing the other way round (10 ÷ 11 = 0.91) gives the opportunity cost of a capital good instead, which the question did not ask for.'],
  [B4, 'Draw', 4, 'Draw a production possibility frontier for an economy producing capital goods and consumer goods, and mark a point that shows productive inefficiency. (4 marks)',
    'A Draw question is marked on the labels as much as on the shape. Decide what each axis measures before you draw, think about which way the curve bows and why, and ask where a point must sit if resources are going unused.\nBoth axes labelled with the good and its units (1 mark). A curve bowed outward from the origin, concave, meeting each axis, never straight or wavy (1 mark). A point clearly inside the curve (1 mark), labelled as productively inefficient, where resources are unemployed or misallocated, with a brief annotation that more of both goods is available from it (1 mark). Marks are lost for unlabelled axes and for a curve that bows the wrong way.'],
  [B4, 'Examine', 8, 'Examine the usefulness of a production possibility frontier diagram in illustrating the basic economic problem. (8 marks)',
    'Examine asks what the diagram shows well and where it stops being useful, so plan both halves before you write. Take scarcity, choice and opportunity cost one at a time and ask how the diagram shows each, then ask what a real economy has that the diagram leaves out.\nKnowledge and application: the PPF shows scarcity as the boundary itself, choice as the need to pick a point on it, and opportunity cost as the amount of one good given up for the other. Points inside show unemployed or misallocated resources; points beyond show what is unattainable; a shift shows growth or decline. Analysis: develop at least two of those with a chain, for example that the concave shape carries a substantive claim: resources are imperfectly substitutable, so each extra unit costs more than the last. Examination: weigh the limits. The model handles two goods where a real economy produces millions; it assumes a fixed stock of resources and fixed technology at a moment when both change continuously; and it shows what is possible, not what is chosen or desirable, so it cannot say which point on the curve is the right one. Conclude on the condition: it is a clear teaching and analytical device for scarcity, choice and opportunity cost, and it is not a description of a real economy.',
    'introductory-concepts:practice:d0eaebbd'],
  [B5, 'Evaluate', 20, 'Evaluate the view that specialisation and the division of labour always lead to improved economic outcomes. (20 marks)',
    'The word "always" is what the answer must judge, so decide early what your judgement will depend on. Build the case for the gains as chains, build the case against as fully, apply both to a worker, a firm and a country, and state the conditions under which the gains hold.\nKnowledge, application and analysis: define specialisation and the division of labour; set out the gains with Adam Smith\'s three reasons, dexterity from repetition, time saved not switching tasks, and the mechanisation a narrow task permits, and chain each to higher output per worker, lower unit costs, lower prices and higher real incomes. Apply to a worker, a firm and a country. Evaluation: set against this the monotony that lowers motivation and quality, the over-dependence that lets one broken link halt a chain, the structural unemployment that follows when a narrow task disappears, and for a country the exposure to a fall in the price of its single export. The judgement should be conditional rather than absolute: the gains hold where exchange is reliable, where specialised resources can be redeployed, and where the risk of dependence is bearable, and "always" fails precisely where those conditions fail. Say which condition matters most and why. A conclusion that does not address "always" cannot reach the top level.',
    'introductory-concepts:practice:b99104dd'],
  [B6, 'Analyse', 6, 'Analyse two ways in which the state allocates resources in a mixed economy. (6 marks)',
    'Analyse asks for depth, so choose two roles of the state and follow each one through to where resources end up, rather than listing several. For each, ask what the market would have done on its own and what the state changes.\nFirst way, knowledge: provision, because some goods cannot profitably be supplied privately when no one can be excluded from using them, such as defence, street lighting and flood barriers (1 mark). Application and analysis: the state funds them from taxation (1 mark), so resources are directed to them that the market would not have directed (1 mark). Second way, knowledge: regulation, such as a pollution limit (1 mark). Application and analysis: it forces a firm to bear a cost it previously imposed on others, so its costs rise and its output falls (1 mark), and resources move away from the activity (1 mark). Redistribution and stabilisation are equally acceptable choices. A named role with two linked steps beats four roles asserted.'],
];

export const PRACTICE = P.map(([block, command, marks, question, guidance, keptId]) => ({
  id: keptId || id('practice', question), block, command, marks, question, guidance,
}));

/* ── flashcards ────────────────────────────────────────────────────────────── */
// Cards are rewritten in place and never deleted: the ids are stable and progress rows point at them
// (the packet-13 rule). The eighteen March cards keep theirs; nine new ones cover the material this
// packet adds — renewable resources, free and economic goods, marginal opportunity cost, the four
// functions of money, the five roles of financial markets, and the state's four jobs.
const kept = (cid, front, back) => ({ id: `introductory-concepts:card:${cid}`, front, back });
const card = (front, back) => ({ id: id('card', `${front}|${back}`), front, back });

export const FLASHCARDS = [
  kept('1d34b61b', 'What is scarcity?', 'The <strong>permanent gap</strong> between unlimited wants and the finite resources available to satisfy them. It is not a shortage: a shortage is temporary and specific to one market, while scarcity exists in every economy at all times.'),
  kept('c818a36e', 'What is the economic problem?', 'Scarcity forcing every economy to answer three questions: <strong>what</strong> to produce, <strong>how</strong> to produce it, and <strong>for whom</strong>.'),
  kept('69778e32', 'What are the four factors of production?', '<strong>Land</strong> (natural resources), <strong>labour</strong> (human effort), <strong>capital</strong> (goods made in order to produce other goods) and <strong>enterprise</strong> (organising the other three and bearing the risk).'),
  card('What is the difference between a renewable and a non-renewable resource?', 'A <strong>renewable</strong> resource regenerates naturally and can last indefinitely — but only while it is used at or below its sustainable rate. A <strong>non-renewable</strong> resource has a fixed stock that every unit used permanently reduces.'),
  kept('f7314892', 'What is opportunity cost?', 'The value of the <strong>next best alternative forgone</strong> when a choice is made. Not all the alternatives, and not the money paid: a student who revises instead of taking a paid shift bears the forgone wages as the cost.'),
  card('What is the difference between a free good and an economic good?', 'An <strong>economic good</strong> is scarce, so one more unit has a positive opportunity cost. A <strong>free good</strong> is not scarce, so nothing is forgone — air to breathe, sunlight. A zero price does not make a free good: state schooling uses resources that had other uses.'),
  kept('c64e6b0a', 'What is the difference between positive and normative statements?', 'A <strong>positive</strong> statement is a testable claim about what is — it may still be false. A <strong>normative</strong> statement is a claim about what ought to be and rests on a value judgement. Watch for <em>should, ought, fair, too, unacceptable</em>.'),
  card('What is a value judgement, and why does it cause disagreement?', 'A view about which outcomes are <strong>desirable</strong>. Economists often agree about what a policy does and disagree about whether to do it, because they weigh efficiency, equity, sustainability and freedom of choice differently.'),
  card('Why is economics called a social science?', 'It studies <strong>human behaviour</strong> using scientific method — observation, theory, testing, revision — but it cannot run <strong>controlled experiments</strong>, because an economy cannot be re-run with one variable changed.'),
  card('What does ceteris paribus mean and why is it used?', '"<strong>All other things being equal</strong>". It holds every other influence constant so one relationship can be isolated. It does not claim nothing else changes in reality — only that this is what the named variable does on its own.'),
  kept('8cfe89af', 'What is a production possibility frontier (PPF)?', 'A curve showing the <strong>maximum combinations</strong> of two goods an economy can produce with its resources fully and efficiently employed. Points on it are productively efficient, points inside show waste, points beyond it are unattainable.'),
  kept('a9149d61', 'What does a point inside the PPF represent?', 'Resources <strong>unemployed or misallocated</strong>. More of both goods is available from resources the economy already has, so the position is inefficient — it is waste, not a choice between the two goods.'),
  kept('87f96585', 'What is productive efficiency?', 'Producing at a point <strong>on</strong> the production possibility frontier, where more of one good is only possible by making less of the other.'),
  kept('4632212e', 'What does the PPF show about efficiency?', 'Every point <strong>on</strong> the frontier uses all the economy\'s resources in their best roles, so it is productively efficient. Every point <strong>inside</strong> it wastes resources. The frontier cannot say which of its points is the <em>best</em> one to choose — only which are possible.'),
  kept('90c9a274', 'What does a point beyond the PPF represent?', 'A combination that is <strong>unattainable</strong> with today\'s resources and technology, however they are arranged. It becomes possible only if the frontier itself shifts outward — more resources, better resources, or better technology.'),
  card('How is opportunity cost calculated from a PPF?', '<strong>Units of the good given up ÷ units of the good gained.</strong> On Maraya\'s frontier, moving from C (20, 33) to D (30, 25) gives up 8 capital goods for 10 consumer goods: 8 ÷ 10 = <strong>0.8 capital goods</strong> per consumer good.'),
  card('Why is a PPF drawn concave (bowed outward)?', 'Because of <strong>increasing marginal opportunity cost</strong>: resources are imperfectly substitutable, so each extra unit of one good costs more of the other than the unit before. Along Maraya\'s curve the cost runs 0.2, 0.5, 0.8, 1.1, 1.4.'),
  kept('67ddb5da', 'What causes an outward shift of the PPF?', '<strong>More resources</strong> (a larger workforce, a new mineral find), <strong>better resources</strong> (education, training, health) or <strong>better technology</strong>. This is economic growth. Resources lost or destroyed shift it inward: economic decline.'),
  card('What is the difference between a movement along a PPF and a shift of it?', 'A <strong>movement</strong> changes which combination is produced from unchanged resources. A <strong>shift</strong> changes what the economy is capable of producing. Moving from inside the curve towards it is a movement, not growth.'),
  card('What is the difference between a capital good and a consumer good?', 'A <strong>capital good</strong> is produced in order to produce other goods (a loom, a van, a port). A <strong>consumer good</strong> satisfies a want directly. The same object can be either: a motorcycle ridden for pleasure is consumer, one used for deliveries is capital.'),
  card('Why do capital goods matter for economic growth?', 'Capital raises <strong>output per worker</strong>, and output per worker is what shifts the frontier outward. The cost is consumption sacrificed now, which is why a very poor economy may be unable to afford the investment that would enrich it.'),
  kept('01f4d488', 'What is specialisation?', 'Concentrating on a <strong>narrower range of tasks or products</strong> than you consume. It applies to workers, firms, regions and countries, and makes exchange essential.'),
  kept('2f9b8418', 'What is the division of labour?', 'Specialisation <strong>within production</strong>: breaking a job into separate tasks and giving each to a different worker. Adam Smith\'s pin factory is the classic illustration.'),
  card('What were Adam Smith\'s three reasons that the division of labour raises output?', '<strong>Dexterity</strong> — repetition makes a worker faster and more accurate. <strong>Time saved</strong> — none is lost switching between tasks and tools. <strong>Machinery</strong> — a narrow, repeated task is one that can be mechanised.'),
  card('Give three disadvantages of the division of labour.', '<strong>Monotony</strong>, lowering motivation and quality; <strong>over-dependence</strong>, so one broken link halts the chain; and <strong>structural unemployment</strong>, because a narrowly skilled worker whose task disappears has little to move to.'),
  kept('f92a6fe9', 'Why does specialisation lead to trade?', 'A specialist produces far more of one thing than they can use and none of everything else, so the surplus must be <strong>exchanged</strong>. Without reliable exchange, specialising is not worth doing.'),
  card('What are the four functions of money?', 'A <strong>medium of exchange</strong> (no double coincidence of wants needed), a <strong>measure of value</strong> (one scale of prices), a <strong>store of value</strong> (sell today, buy later) and a <strong>method of deferred payment</strong> (debts settled in future).'),
  card('What is a double coincidence of wants?', 'The condition <strong>barter</strong> requires: each party must hold what the other wants <em>and</em> want what the other holds. Money removes it, which is what makes deep specialisation worth the trouble.'),
  card('What are the five roles of financial markets?', 'To facilitate <strong>saving</strong>; to make <strong>funds available</strong> to businesses and individuals; to facilitate the <strong>exchange of goods and services</strong>; to provide <strong>forward markets</strong> in commodities and currencies; and to provide a <strong>market for equities</strong>.'),
  kept('74b18302', 'What is a free market economy?', 'Resources are <strong>privately owned</strong> and allocated by the decisions of firms and households, guided by prices and profit. The state is confined to defence, law and property rights. No real economy is purely this.'),
  kept('a3ca5141', 'What is a command economy?', 'The <strong>state owns the means of production</strong> and a planning authority sets output, allocation and prices. Provision can be guaranteed; the difficulty is that planners cannot gather what millions of buyers know.'),
  kept('2856addc', 'What is a mixed economy?', 'An economy in which <strong>both mechanisms operate</strong>: a private sector allocating most goods alongside state provision and regulation. Every real economy is mixed; they differ in how mixed.'),
  kept('b569db79', 'What allocates resources in a free market, a command economy and a mixed economy?', 'Free market: <strong>prices and profit</strong>, through private decisions. Command: <strong>a central plan</strong>. Mixed: both, with the state deciding where the market\'s outcome is unacceptable.'),
  card('What are the four roles of the state in a mixed economy?', '<strong>Provision</strong> of goods no firm can charge for; <strong>regulation</strong> of privately owned firms; <strong>redistribution</strong> through taxes and transfers; and <strong>stabilisation</strong> of output and employment. Each can also fail — that is government failure.'),
];

/* ── common mistakes ───────────────────────────────────────────────────────── */
// The four March cards keep their ids. The weak one is not among them: structure-09 names the
// "economics is not a real science" misconception in the Learn Mode body, which is rewritten there.
const keptMistake = (mid, title, mistake, correction, examTip) => ({ id: `introductory-concepts:mistake:${mid}`, title, mistake, correction, ...(examTip ? { examTip } : {}) });
const mistake = (title, m, correction, examTip) => ({ id: id('mistake', title), title, mistake: m, correction, ...(examTip ? { examTip } : {}) });

export const MISTAKES = [
  keptMistake('ff3c3528', 'Confusing positive and normative statements',
    'Students assume "positive" means good or correct, and label any statement containing a statistic as positive.',
    'A positive statement is one evidence could test, whether or not it is true — "unemployment fell last year" is positive even if it rose. A normative statement contains a judgement: should, ought, fair, too, unacceptable. A sentence can be positive up to a comma and normative after it.',
    'Scan the statement for a judgement word before anything else. One of them makes the whole statement normative.'),
  keptMistake('231f098b', 'Forgetting opportunity cost is the NEXT BEST alternative',
    'Students list every alternative given up, or give the amount of money spent as the opportunity cost.',
    'Only one alternative could have been chosen, so only one is forgone: the best of those rejected. And the cost need involve no money at all — time spent studying costs the wages forgone, and a firm using its own building forgoes the rent.',
    'Name one alternative from the data and say what the resource would otherwise have done.'),
  keptMistake('dde07cb9', 'Drawing the PPF incorrectly',
    'Axes are left unlabelled, the curve is drawn straight or bowed towards the origin, and points are marked without being identified.',
    'Label both axes with the good and its units. Draw the curve bowed outward from the origin, because opportunity cost increases along it. Mark and label any point the question names: on the curve is productively efficient, inside is unemployment or misallocation, beyond is unattainable.',
    'A Draw question (4 marks, WEC11 Appendix 6) is marked on the labelling as much as the shape.'),
  keptMistake('12819186', 'Confusing a shift of the PPF with a movement along it',
    'Students say any change in production shifts the PPF, and call a recovery from recession economic growth.',
    'A shift needs a change in the quantity or quality of resources, or in technology. Reallocating resources is a movement along the curve; putting idle resources back to work is a movement from inside towards it. Neither changes what the economy is capable of producing.',
    'Ask whether the change alters what the economy COULD produce. If not, the frontier has not moved.'),
  mistake('Treating scarcity as the same thing as a shortage',
    'Students write that scarcity means there is not enough of a good right now, and that a higher price can end it.',
    'A shortage is temporary, specific to one market, and closed by a price rise. Scarcity is the permanent gap between unlimited wants and finite resources; no price and no amount of growth removes it, which is why choice can never be avoided.',
    'Scarcity is universal and permanent; a shortage is local and temporary.'),
  mistake('Calling anything with a zero price a free good',
    'Free school meals, free wi-fi and free healthcare all get labelled free goods because the user pays nothing.',
    'The test is opportunity cost, not price. Providing a hospital appointment uses staff, beds and equipment that had other uses, so it is an economic good — someone other than the patient bears the cost. A free good has zero opportunity cost: air to breathe, sunlight on a field.',
    'Ask whether producing one more unit would use resources that had another use.'),
  mistake('Assuming renewable means inexhaustible',
    'Students argue that a fishery or a forest cannot run out because the resource is renewable.',
    'Renewability is a rate, not a guarantee. A stock used faster than it regenerates behaves exactly like a non-renewable resource and eventually collapses. The sustainable rate is the rate at which use can continue indefinitely without the stock falling.',
    'Say whether the resource is being used within its sustainable rate, not just which category it is in.'),
  mistake('Claiming a country is "a free market economy"',
    'Students describe real economies as free market or command, and treat the mixed economy as a fourth type.',
    'Every real economy taxes, spends and regulates, so every one is mixed. Free market and command are the ends of a spectrum, useful for comparison and not descriptions of any country. Place the economy on the spectrum and say which decisions are left to markets and which are taken by the state.',
    'Naming which decisions the state takes earns the application mark; sorting a country into a box does not.'),
];

/* ── extras ────────────────────────────────────────────────────────────────── */
// The March chains used "comparative advantage" without ever explaining it. Comparative advantage is
// not in 1.3.1 — 5a asks for the advantages and disadvantages of specialisation and the division of
// labour, and Adam Smith's views on it — so the term is removed rather than defined here (specGap-06).
export const EXTRAS = {
  chains: [
    { title: 'Scarcity forces choice and gives every choice a cost',
      steps: [
        'Human wants are unlimited, while land, labour, capital and enterprise are finite.',
        'That permanent gap is scarcity, so what to produce, how, and for whom cannot all be answered at once.',
        'Choosing one use of a resource means rejecting every other use it had.',
        'The value of the best rejected use is the opportunity cost of the choice.',
      ],
      result: 'Every economic agent — household, firm or government — faces the same structure of cost, whether or not money changes hands.' },
    { title: 'Why the frontier is bowed outward',
      steps: [
        'Resources are not equally well suited to producing both goods.',
        'The first resources moved into consumer goods are those least useful for capital goods, so little capital output is lost.',
        'As the shift continues, resources well suited to capital goods have to be moved too.',
        'Each extra consumer good therefore costs more capital goods than the one before: 0.2, then 0.5, 0.8, 1.1, 1.4 along Maraya\'s curve.',
      ],
      result: 'Increasing marginal opportunity cost is what makes the PPF concave rather than a straight line.' },
    { title: 'How investment in capital goods becomes growth',
      steps: [
        'An economy chooses a point on its frontier with more capital goods and fewer consumer goods.',
        'Consumption falls this year: the sacrifice is immediate and certain.',
        'The extra machines, tools and infrastructure raise output per worker.',
        'Higher output per worker shifts the whole frontier outward.',
      ],
      result: 'More of both goods becomes possible later — the trade-off between consumption now and capacity later.' },
    { title: 'Why specialisation needs money',
      steps: [
        'A specialist produces far more of one good than they use and none of everything else.',
        'Under barter, exchanging that surplus needs a double coincidence of wants.',
        'Searching for a match is costly enough to make specialising not worth the trouble.',
        'Money is accepted by everyone, so each trader sells for money and buys separately.',
      ],
      result: 'Money removes the barrier that would otherwise cap how far an economy can specialise.' },
    { title: 'How savings reach the firms that use them',
      steps: [
        'Financial markets give households a safe place for income they do not spend, which turns it into saving.',
        'Those savings are lent on as business loans, mortgages and overdrafts.',
        'A firm can therefore buy a machine before it has accumulated the whole cost from profit.',
        'Forward markets and equity markets let firms shed risks and raise capital they never repay.',
      ],
      result: 'Investment happens sooner and on a larger scale than self-financing would allow, which is how financial markets affect growth.' },
    { title: 'Why every economy ends up mixed',
      steps: [
        'A free market allocates efficiently where competition is real and the effects of a trade fall on those making it.',
        'It leaves some people unserved, underprovides goods no one can be charged for, and ignores costs imposed on third parties.',
        'A command economy can guarantee provision but cannot gather what millions of buyers know.',
        'So states take on provision, regulation, redistribution and stabilisation while leaving most allocation to markets.',
      ],
      result: 'The boundary between the two is a normative choice, and government failure is why it is not drawn further towards the state.' },
  ],
  evaluation: [
    { title: 'Models are useful precisely because they are unrealistic',
      content: 'Every model assumes away most of reality, and that is what makes it tractable — a map that showed every detail would be the territory. The fair criticism is not that an assumption is unrealistic but that a particular assumption changes the conclusion: if buyers are assumed to know every price and in fact do not, predictions about how quickly a market clears will be wrong. Judge an assumption by asking which way relaxing it would move the answer.' },
    { title: 'Specialisation raises output, not necessarily welfare',
      content: 'The productivity gain from the division of labour is not in dispute. Whether people are better off depends on what happens next: whether exchange is reliable, whether the specialised resources can be redeployed when demand moves, and whether the monotony and dependence are bearable. A country specialising in one export raises income while the market is strong and is exposed when it turns, because the ports, skills and machinery built for that specialism cannot quickly do anything else.' },
    { title: 'A PPF is a model, and its assumptions are where evaluation starts',
      content: 'The frontier assumes two goods, a fixed stock of resources, fixed technology and a given time period. Real economies produce millions of goods, and resources and technology change continuously, so the curve is a snapshot rather than a description. It remains the clearest way to show scarcity, choice, opportunity cost and growth in one figure — but an answer that treats a shift as a policy outcome rather than a change in capacity has mistaken the model for the economy.' },
    { title: 'Intervention is not automatically an improvement',
      content: 'The case for the state rests on the free market leaving wants unmet, underproviding goods no one can be charged for, and ignoring costs that fall on third parties. The case against rests on government failure: the state lacks the dispersed information that prices gather, intervention carries administrative cost, and decisions can follow whoever lobbies hardest rather than the evidence. The strongest judgement is conditional — intervention improves the outcome where the market failure is clear and the state can act on better information than it has in the general case.' },
  ],
};
