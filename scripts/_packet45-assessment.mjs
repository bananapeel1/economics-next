/**
 * PACKET 45 — labour-markets assessment: the quiz bank, the practice items, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED ──────────────────────────────────────────
 *
 * Of the live ten, three test what this section no longer teaches because another section owns it
 * (monopsony ×2, 3.3.3 · 7; the minimum wage, 3.3.5 · 2b), one tests the backward-bending individual
 * supply curve (0 hits in the specification; DECISIONS, packet 17), and one — `quiz-01`, the
 * elasticity of demand for labour — tested a leaf no subsection taught. The bank is authored from
 * scratch against the five chapters, so every item rests on a subsection that teaches it (the runner
 * checks the key terms), and the runner refuses near-duplicate stems as it builds.
 *
 * ── THE PINS ARE DERIVED, WHICH IS `topFix-01`, `structure-01..03` ─────────
 *
 * The live pins were chosen on 25 September by packets 2.9 and 2.91 for the live blocks. The
 * rebuild replaces the blocks, so every item carries its own block tag and `quizIndices` /
 * `practiceIndices` are DERIVED from the tag (packet 30): an item cannot be pinned to a chapter that
 * does not teach it, and no block is left to the title fallback `structure-01` describes.
 *
 * ── THE PRACTICE SET IS THE UNIT 3 PAPER'S SHAPE ─────────────────────────────
 *
 * DECISIONS, 26 September ("practice follows the real IAL paper layout"): a WEC13 topic is practised
 * as Section B's five-part data question (2 · 4 · 6 · 8 · 14, `audit/raw/ial-paper-structure.json`)
 * and Section C's 20-mark essay. Seven items: Define 2 and Calculate 2 (the paper's two forms of the
 * 2-mark part), Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live set — Define (4),
 * Explain (6), Assess (10), Outline (4) and an Evaluate (20) on monopsony — carries four illegal
 * tariffs or command words (`topFix-05`).
 */
import { id, hash8, LAB, money, hr, k } from './_packet45-util.mjs';
import { B1, B2, B3, B4, B5 } from './_packet45-content.mjs';

const L = LAB;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST AND THE KEY IS THEN DEALT INTO A POSITION by ranking the
 * items on a hash of their own stem (packet 36). No explanation names an option by position or by
 * letter, because the dealing moves the key after the explanation was written.
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
  /* ── the pre-test pool: three items, unpinned, FIRST, all answerable from chapter one ── */
  qi(null, 'The demand for labour is described as a derived demand because it:',
    ['depends on demand for the goods workers produce', 'is set by the government for each occupation', 'comes from the number of people of working age', 'is calculated from the hours each worker offers'],
    'Firms hire workers for what they make, so when customers want more of the product, firms want more of the people who make it. The number of people of working age and the hours they offer belong to the supply side, and no government sets the demand for labour.'),
  qi(null, 'A profit-seeking firm stops taking on workers when the output of one more worker would be worth:',
    ['less than the wage', 'more than the wage', 'less than the price of the product', 'more than the average worker produces'],
    'Hiring pays while an extra worker brings in at least what she costs. Once her extra output is worth less than the wage, employing her would lower profit. Comparing her output with the product price, or with the average worker, misses what she costs.'),
  qi(null, 'Each additional worker in a workshop adds less output than the one before mainly because:',
    ['the machines and space do not grow with the workforce', 'later recruits are less skilled than earlier ones', 'the wage rises as more workers are hired', 'customers buy less as more is produced'],
    'With equipment and space fixed, every extra worker has less to work with, so the extra output falls: diminishing marginal productivity. The workers themselves are identical, and neither the wage nor the customers change how much an extra worker can physically produce.'),

  /* ── Block 1 · The Demand for Labour ─────────────────────────────────────── */
  /* Fix round 2 (check-in answer rule, CONTENT-GATE 26 Sep): the old stem asked what a rise in the product
   * price does, and the check-in's "Price or productivity rises: a shift" view draws exactly that
   * (MRP to MRP₁, 6 → 7 at $12). The item now asks the case the diagram does not draw: product demand
   * FALLING (derived-demand, "The link runs both ways"). The five fix-round stems are worded so each
   * hashes into its predecessor's rank: placeKeys deals every key by rank, so any other wording would
   * re-deal the keys of unchanged, published items (packet 44's method, audit/runs/packet-45/fix2-rank-search.mjs). */
  qi(B1, 'Demand for a firm\'s product falls as fashions change. The firm\'s demand for labour is most likely to:',
    ['shift to the left', 'shift to the right', 'move down along its curve', 'stay where it is'],
    'The demand for labour is derived from the demand for the product. With fewer customers, less output is needed, so the firm wants fewer workers at every wage and the whole curve moves left. The wage has not changed, so this is a shift, not a movement along the curve.'),
  qi(B1, 'Training lets every worker produce one more unit an hour, and the wage is unchanged. The firm will most likely:',
    ['employ more workers', 'employ fewer workers', 'employ the same number', 'lower the wage it pays'],
    'Higher productivity raises what each worker\'s output is worth, so at the same wage the firm finds it worth hiring more. A firm in a competitive labour market takes the wage as given, so it cannot simply cut it.'),
  qi(B1, 'A worker adds 5 units an hour, and the firm sells every unit at the market price of $4. The worker\'s extra output is worth, per hour:',
    ['$20', '$9', '$1.25', '$4'],
    'The value of the extra output is the extra units times the price: 5 × $4 = $20. Adding the two figures, or dividing one by the other, has no meaning here.'),
  qi(B1, 'A machine that does the work of five employees costs $40 an hour. Above what hourly wage is the machine the cheaper choice?',
    ['$8', '$40', '$5', '$200'],
    'Five employees cost the same as the machine when each is paid $40 ÷ 5 = $8 an hour. Above $8 the five cost more than $40, so the machine is cheaper; that is why the wage relative to the price of capital matters, not the wage alone.'),
  qi(B1, 'The demand for labour in an occupation is likely to be most elastic when:',
    ['capital can easily replace the workers', 'wages are a small share of total costs', 'demand for the product is price inelastic', 'the time period is very short'],
    'If a machine can do the job, a rise in the wage makes firms switch, so employment falls a lot. A small share of costs, inelastic product demand and a short time period all make the demand for labour less responsive.'),

  /* ── Block 2 · The Supply of Labour ──────────────────────────────────────── */
  /* Fix round 2: the old key (a licence shifts S left) is the check-in diagram's own view and checklist line.
   * A later retirement age (government-regulations) appears on no B2 diagram surface. */
  qi(B2, 'The government raises the age at which people retire by two years. The supply of labour is most likely to:',
    ['shift to the right', 'shift to the left', 'move up along its curve', 'stay where it is'],
    'People who would have left the labour force keep working for two more years, so more are willing to work at every wage and supply shifts right. The wage has not changed, so this is a shift, not a movement along the curve.'),
  qi(B2, 'A rise in out-of-work welfare benefits is most likely to:',
    ['reduce the supply of labour to low-paid jobs', 'increase the supply of labour to low-paid jobs', 'increase the demand for low-paid workers', 'cause a movement along the demand for labour'],
    'Higher benefits shrink the gain from taking a job, which is the pay kept minus the benefits given up, so fewer people find low-paid work worth taking at each wage. Benefits act on the supply side; they do not change how many workers firms want.'),
  qi(B2, 'A rise in the wage rate for bus drivers, with nothing else changing, causes:',
    ['a movement along the supply of labour', 'a rightward shift of the supply of labour', 'a leftward shift of the demand for labour', 'a rightward shift of the demand for labour'],
    'The wage is on the vertical axis, so a change in it moves along the curves rather than shifting them: more drivers offer themselves at the higher wage. Shifts need a cause other than the wage.'),
  qi(B2, 'A pay rise brings in the fewest extra workers where:',
    ['the job needs years of training', 'the skills needed are widely held', 'workers move easily between regions', 'the time period is long'],
    'If qualifying takes years, a pay rise cannot bring in new qualified workers quickly, so supply responds little. Widely held skills, mobile workers and a long time period all make supply more responsive.'),
  qi(B2, 'A cut in income tax rates can increase the supply of labour because it:',
    ['raises the pay workers keep at each wage', 'lowers the wage that employers must pay', 'raises the price of the product workers make', 'increases the size of the population'],
    'What draws people into work is take-home pay. A lower tax rate raises it at every gross wage, so more are willing to work at each wage. It does not change what employers pay, the product price or the population.'),
  qi(B2, 'Large-scale emigration of trained nurses is most likely to:',
    ['shift the supply of nurses to the left', 'shift the demand for nurses to the left', 'shift the supply of nurses to the right', 'cause a movement along the supply of nurses'],
    'Net migration is immigration minus emigration; when trained nurses leave, fewer are available at every wage, so supply shifts left. The number of nurses hospitals want has not changed.'),

  /* ── Block 3 · Wage Determination in a Competitive Market ────────────────── */
  /* Fix round 2: the old key (a surplus above equilibrium) is the check-in's caption, "Below it, a shortage;
   * above it, a surplus." The item now asks the next step: what the surplus does to the wage. */
  qi(B3, 'In a competitive labour market, the wage is above equilibrium. It then falls mainly because:',
    ['workers without a post offer to work for less', 'firms compete for staff by offering more pay', 'the demand for labour shifts to the left', 'the supply of labour shifts to the left'],
    'Above equilibrium more people want the work than there are posts, so those without one accept less and firms find they can fill posts for less: the wage is bid down until the numbers wanted and willing match. Firms bidding pay up is what happens below equilibrium, and no curve needs to shift.'),
  qi(B3, 'One small firm in a competitive labour market faces a supply of labour that is:',
    ['horizontal at the market wage', 'upward-sloping like the market curve', 'vertical at its current workforce', 'downward-sloping from left to right'],
    'The firm is a wage-taker: it can hire as many as it wants at the going rate, and none if it offers less. So the supply it faces is flat at the market wage, even though the market supply curve slopes up.'),
  qi(B3, 'A rise in demand for an occupation\'s product, with the supply of labour unchanged, will:',
    ['raise both the wage and employment', 'raise the wage and lower employment', 'lower the wage and raise employment', 'raise the wage and leave employment unchanged'],
    'Derived demand: the demand for labour shifts right, a shortage opens at the old wage, and firms bid the wage up. The higher wage draws more people in along the supply curve, so employment rises too.'),
  qi(B3, 'A net inflow of migrants into an occupation, with labour demand unchanged, will:',
    ['lower the wage and raise employment', 'raise the wage and lower employment', 'lower both the wage and employment', 'raise both the wage and employment'],
    'Supply shifts right, leaving a surplus at the old wage, so the wage falls. At the lower wage firms hire more, moving down their demand curve: after a supply shift, the wage and employment move in opposite directions.'),
  qi(B3, 'Labour demand is L = 70 − 3W and supply is L = 2W − 10, in thousands, with W in dollars an hour. The equilibrium wage is:',
    ['$16', '$60', '$35', '$8'],
    'Set the two equal: 70 − 3W = 2W − 10, so 80 = 5W and W = $16, where 22,000 are both wanted and willing. The other figures come from solving only one of the two equations or dropping a term.'),
  qi(B3, 'Surgeons earn far more than shop assistants mainly because:',
    ['demand is high and supply small and inelastic', 'the market for surgeons has failed', 'surgeons\' pay depends on the price of capital', 'the supply of shop assistants is inelastic'],
    'Surgeons\' work is highly valued, few can do it and training takes years, so the equilibrium wage is high. That is the market working, not failing, and the supply of shop assistants is elastic because many people can do the job.'),

  /* ── Block 4 · Trade Unions and Public-Sector Pay ────────────────────────── */
  /* Fix round 2: the old key (fewer jobs and a surplus) is the check-in's caption, "A surplus of 18,000; 6,000
   * fewer jobs." The item now asks the cause of the exception union-wage teaches: a deal that lifts productivity. */
  qi(B4, 'A union wins a wage above equilibrium and no jobs are lost. The most likely reason is that:',
    ['output per worker rose with the deal', 'the union also lengthened apprenticeships', 'more people now want the work', 'demand for the product has fallen'],
    'Firms hire fewer at a higher wage only if nothing else changes. If each worker now produces more, the demand for labour shifts right and can hold employment up at the higher wage. Longer apprenticeships shift supply left, more applicants only widen the surplus, and weaker product demand would cost more jobs, not fewer.'),
  qi(B4, 'A union that makes apprenticeships much longer affects the labour market mainly by:',
    ['shifting the supply of labour to the left', 'shifting the supply of labour to the right', 'shifting the demand for labour to the right', 'lowering the productivity of trained workers'],
    'A longer path into the job means fewer people can offer themselves at every wage, so supply shifts left and the wage rises. It works with no negotiation over pay at all.'),
  qi(B4, 'Job losses from a union wage rise will be smallest when:',
    ['demand for labour is wage inelastic', 'capital can easily replace the workers', 'wages are most of the firm\'s costs', 'demand for the product is price elastic'],
    'If employment responds little to the wage, a higher negotiated rate costs few jobs. Easy substitution by machines, a large wage share of costs and elastic product demand all make job losses larger.'),
  qi(B4, 'In most economies, the pay of nurses employed by the state is set mainly by:',
    ['a government decision on a pay scale', 'many private hospitals competing for staff', 'the number of patients each nurse treats', 'the price of the medicines hospitals buy'],
    'Public-sector pay is an administrative decision, taken through pay scales, pay commissions and bargaining with public-sector unions, with the government budget as the limit. There is no competitive market price for most public-sector posts.'),
  qi(B4, 'Public-sector pay set below the equilibrium wage is most likely to cause:',
    ['vacancies the service cannot fill', 'a surplus of applicants for each post', 'a rise in the equilibrium wage', 'a fall in demand for the service'],
    'Below equilibrium, the state wants more workers than are willing to work at that pay, so posts stay empty. A surplus of applicants is what pay set above equilibrium would cause.'),
  qi(B4, 'A single national pay scale for teachers is most likely to leave shortages where:',
    ['living costs are high', 'living costs are low', 'fewer children attend school', 'many trained teachers live nearby'],
    'The same pay goes further where living is cheap and less far where it is dear, so fewer teachers will work in high-cost areas at the national rate. Falling school rolls and plentiful local teachers make shortages less likely, not more.'),

  /* ── Block 5 · Market Failure in the Labour Market ───────────────────────── */
  /* Fix round 2: the old key (unemployment alongside vacancies) is the check-in diagram's description and
   * checklist. The item now asks a cause of geographical immobility, which the two-region diagram does not show. */
  qi(B5, 'Jobless miners in one region do not move to fill the vacant mining jobs in another. The most likely reason is that:',
    ['homes near the vacant jobs cost far more', 'the vacant jobs pay a higher wage', 'demand for coal has fallen in their region', 'the other region is short of miners'],
    'The miners have the skills and the jobs exist, so the barrier is the move itself: housing in the growing region costs far more. Higher pay there is a reason to move, not to stay, and falling demand at home and a shortage elsewhere are why the jobs and the jobless exist, not why the gap stays open.'),
  qi(B5, 'Which of these is a cause of occupational immobility?',
    ['lacking the qualifications a new job requires', 'high housing costs in the growing region', 'family ties to a home town', 'not knowing where the vacancies are'],
    'Occupational immobility is about moving between KINDS of job, so the barrier is skills or qualifications. Housing costs, family ties and a lack of information stop workers moving between PLACES, which is geographical immobility.'),
  qi(B5, 'A worker cannot take a job in the capital because rents there are far higher than at home. This is an example of:',
    ['geographical immobility', 'occupational immobility', 'a shift in the demand for labour', 'an inelastic demand for labour'],
    'The job exists and the worker could do it; what stops the move is the cost of living in another place. That is geographical immobility. Occupational immobility would mean lacking the skills for the job.'),
  qi(B5, 'Immobility of labour is regarded as a market failure because:',
    ['labour is not allocated to where it is most valued', 'wages differ between occupations', 'some workers earn more than others', 'firms pay the market wage'],
    'A working market moves labour towards the jobs where it is worth most; immobility stops that, leaving idle workers beside unfilled jobs. Wage differences alone are not a failure, because many reflect scarce skills.'),
  qi(B5, 'Which pay gap is most clearly the market working rather than failing?',
    ['Pilots earn more because training takes years', 'Jobless miners cannot move to where jobs are', 'A region\'s pay stays low as workers cannot leave', 'Posts stay empty because no one has the skills'],
    'A high wage for a skill that takes years to acquire rations the few who have it and draws in trainees: the market doing its job. The other three are gaps that persist because workers cannot move, which is immobility.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

/*
 * SEVEN ITEMS, the WEC13 paper's shape: Section B's data question (2 · 4 · 6 · 8 · 14), with both
 * forms of the 2-mark part, and Section C's 20-mark essay.
 *
 * EVERY GUIDANCE IS TWO PARAGRAPHS AND THE FIRST GIVES NOTHING AWAY. `InlinePractice.jsx` prints
 * `guidance.split('\n')[0]` above the empty answer box in guided mode. The opening carries no
 * figure, no mark allocation and no answer. Nothing above 6 marks allocates points.
 */
const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'derived demand' as it applies to labour. (2 marks)",
    `Two marks means two separate things to say. Say what firms actually want when they hire, and then what the demand for workers therefore depends on.\nDerived demand is demand for something wanted not for itself but for what it produces (1 mark). So the demand for labour depends on the demand for the final product the workers make (1 mark). An answer that says only "demand that comes from something else", without tying it to labour and the product, has the first mark at most.`),

  pr(B1, 'Calculate', 2, 'A worker adds 6 units of output an hour, each unit sells for $5, and the wage is $25 an hour. The firm can sell any amount at this price. Calculate the value of the worker\'s extra output per hour and state whether a profit-maximising firm would employ the worker. (2 marks)',
    `Work out what the extra output is worth before comparing it with anything, and keep the units the same: output in an hour against pay for an hour.\nValue of the extra output = 6 × $5 = $30 an hour (1 mark). This is more than the $25 wage, so the firm employs the worker (1 mark). An answer that compares the $5 price with the $25 wage has compared a unit of output with an hour of labour and has neither mark.`),

  pr(B2, 'Explain', 4, 'Explain two factors that influence the elasticity of supply of labour to an occupation. (4 marks)',
    `Two factors, each with its reason. Choose factors you can tie to how quickly extra workers can appear when pay rises, and say which way each pushes the elasticity.\nEach factor earns a mark for identifying it and a mark for explaining it. Length of training (1 mark): where a job needs years of training or a licence, a pay rise cannot bring in new qualified workers quickly, so supply is inelastic (1 mark). Mobility of labour (1 mark): where workers can move between regions or retrain easily, supply responds strongly, so it is elastic (1 mark). Other creditworthy factors: how specific the skills are, and the time period.`),

  pr(B3, 'Analyse', 6, 'Analyse the likely effects of a net inflow of migrant workers on the equilibrium wage and employment in an occupation. (6 marks)',
    `Follow one chain through linked stages, and use a diagram. Keep the demand curve where it is unless you give a reason to move it, and say which curve shifts before saying what happens to the wage.\nKnowledge: net migration is immigration minus emigration, and a net inflow of workers with the skills the occupation needs adds to the number willing to do it (1 mark). Application: the supply of labour to the occupation shifts right at every wage (1 mark). Analysis: at the old wage there is now a surplus of labour, so the wage is bid down (1 mark); at the lower wage firms move down their demand curve and employ more (1 mark). A correctly labelled diagram — the wage rate and the quantity of labour on the axes, S shifting to S₁, the lower wage and the higher employment marked (2 marks).`),

  pr(B4, 'Evaluate', 20, 'Evaluate the view that wage rates are determined only by the demand for and supply of labour. (20 marks)',
    `The word to argue with is "only". Plan the case for supply and demand, then the cases where something else sets pay, and decide in advance what your judgement will depend on, so the conclusion follows from the argument.\nKnowledge, application and analysis are placed in levels, and evaluation is credited in levels of its own. Level 1 describes supply and demand with little explanation. Level 2 explains how a competitive labour market sets the wage where the numbers wanted and willing are equal, and how shifts in demand and supply change it, with a labelled diagram. Level 3 develops both sides. For the view: in occupations with many employers and many workers, pay follows shifts in demand and supply, and even a negotiated or administered wage cannot stay far from equilibrium for long without shortages or surpluses. Against it: trade unions set wages by collective bargaining and control entry; the state sets public-sector pay by pay scales and commissions, with its budget and fairness in mind; and immobility stops workers moving, so pay gaps persist that supply and demand alone would close. Level 4 applies these to named occupations. Evaluation that reaches the top of the range is a supported judgement: supply and demand set the wage in competitive markets and limit how far anyone else can move it, but in unionised occupations and the public sector the wage is a decision, so the view is closer to true the more competitive the market.`),

  pr(B4, 'Examine', 8, 'Examine the likely effects on employment of a trade union negotiating a wage above the equilibrium wage. (8 marks)',
    `Examine asks for a chain of reasoning and a brief assessment, so build the chain first and keep space for a judgement on how large the effect is likely to be.\nLevel 1 states that jobs may be lost, with little explanation. Level 2 explains the chain: the negotiated wage is a floor above equilibrium, so firms move up their demand curve for labour and employ fewer, while more people want the work, leaving a surplus of labour. Level 3 develops it with a labelled diagram and applies it to the occupation in the question. The brief assessment that lifts an answer to the top of the range weighs how elastic the demand for labour is — few jobs are lost where labour is hard to replace and a small share of costs — and whether productivity, or demand for the product, rises alongside the pay deal.`),

  pr(B5, 'Discuss', 14, 'Discuss the likely consequences of geographical and occupational immobility of labour for an economy. (14 marks)',
    `Discuss wants different viewpoints and a critical assessment. Plan the consequences for workers, for firms and for the economy as a whole, then decide what makes them large or small.\nLevel 1 describes immobility with little explanation of its effects. Level 2 explains the two kinds and their causes — housing costs, family ties and information for geographical immobility; skills, qualifications and the cost of retraining for occupational immobility. Level 3 analyses the consequences: unemployment in declining regions and occupations alongside unfilled vacancies elsewhere, lasting pay gaps, lost output and spending on benefits for people who could be working, ideally with a diagram of two regions. Level 4 reaches a critical assessment: how serious the consequences are depends on how long the immobility lasts, how large the declining industries are, and whether workers are young enough to retrain — a friction that clears in a year is far less costly than immobility that lasts a decade.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('Define derived demand for labour.', 'Labour is wanted for the output it produces, so the demand for it depends on the demand for the final product.'),
  fc('What does the demand curve for labour show?', 'How many workers firms want to employ at each wage rate. It slopes down.'),
  fc('Why does the demand curve for labour slope down?', 'Diminishing marginal productivity: each extra worker adds less output, so at a lower wage it pays to hire more.'),
  fc('What rule does a firm use to decide how many to hire?', 'Hire while what the extra worker adds to revenue is at least the wage. For a firm selling at a given price, that is the extra output times the price of the product.'),
  fc('What is the marginal revenue product (MRP)?', 'The standard name for what one more worker adds to the firm\'s revenue: extra output × marginal revenue. Only for a firm selling at a given price does that equal extra output × the price of the product.'),
  fc('Name the four factors that influence the demand for labour to an occupation.', 'Demand for the final product, productivity of labour, the price of the product, and the wage rate relative to the price of capital.'),
  fc('Does a rise in the wage shift the demand for labour?', 'No. It is a movement along the curve. The four factors shift it.'),
  fc('How does the price of capital affect the demand for labour?', 'If machines get cheaper relative to wages, firms swap some workers for capital, so the demand for labour falls.'),
  fc('Define the elasticity of demand for labour.', '% change in the quantity of labour demanded ÷ % change in the wage rate.'),
  fc('Name four factors that influence the elasticity of demand for labour.', 'How easily capital replaces labour; labour\'s share of total costs; the price elasticity of demand for the product; the time period.'),
  fc('What is the supply of labour to an occupation?', 'The number of workers willing and able to do the job at each wage rate. It slopes up.'),
  fc('Name the six factors that influence the supply of labour to an occupation.', 'Size of population, net migration, income tax rates, the level of welfare benefits, government regulations, and trade unions.'),
  fc('Define net migration.', 'Immigration minus emigration. A net inflow of people with the right skills shifts the supply of labour to their occupation right.'),
  fc('How do income tax rates affect the supply of labour?', 'A higher rate cuts take-home pay at every wage, so fewer are willing to work at each wage and supply shifts left.'),
  fc('How does the level of welfare benefits affect the supply of labour?', 'Higher benefits shrink the gain from taking a job, so supply to low-paid occupations can fall.'),
  fc('Give three government regulations that change the supply of labour.', 'Licences and required qualifications, work-permit rules for foreign workers, and retirement or school-leaving ages.'),
  fc('Define the elasticity of supply of labour.', '% change in the quantity of labour supplied ÷ % change in the wage rate.'),
  fc('Why is the supply of surgeons inelastic?', 'Training takes years and few can qualify, so a pay rise brings in few extra surgeons for a long time.'),
  fc('What is labour market equilibrium?', 'The wage at which the number of workers firms want equals the number willing to work.'),
  fc('What supply of labour does one firm in a competitive labour market face?', 'A horizontal line at the market wage: it is a wage-taker and can hire as many as it wants at that wage.'),
  fc('What does a rise in the demand for labour do to wage and employment?', 'Raises both: a shortage at the old wage bids pay up, and more workers are drawn in.'),
  fc('What does a rise in the supply of labour do to wage and employment?', 'Lowers the wage and raises employment: they move in opposite directions.'),
  fc('Is every pay gap between occupations a market failure?', 'No. A high wage for scarce skills is the market working. A gap that lasts because workers cannot move is a failure.'),
  fc('Name two ways a trade union can raise pay.', 'By restricting entry, which shifts supply left, and by collective bargaining for a wage above equilibrium.'),
  fc('What does a union wage above equilibrium do in a competitive market?', 'Firms hire fewer and more people want the work: a surplus of labour, unless productivity or product demand rise too.'),
  fc('How is pay set in the public sector and state-owned enterprises?', 'By decision: pay scales, pay commissions and bargaining with public-sector unions, within the government budget.'),
  fc('What happens if public-sector pay is set below equilibrium?', 'More workers are wanted than are willing at that pay, so vacancies go unfilled.'),
  fc('Define geographical immobility of labour.', 'Workers unable to move to another area to take a job.'),
  fc('Give three causes of geographical immobility.', 'Housing costs, family and social ties, and the cost of moving and a lack of information about vacancies.'),
  fc('Define occupational immobility of labour.', 'Workers unable to move into a different type of job.'),
  fc('Give three causes of occupational immobility.', 'Skills specific to one job, required qualifications and licences, and the cost and time of retraining.'),
  fc('Why is immobility of labour a market failure?', 'Labour is not allocated to where it is most valued: idle workers exist alongside unfilled jobs, and output is lost.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Shifting the curve for a change in the wage',
    '"Wages rose, so the demand for labour shifted left."',
    'The wage is on the vertical axis, so a change in it moves firms along their demand curve, and workers along the supply curve. Drawing a shift for it double-counts the change.',
    'Ask whether the cause is on an axis. If it is the wage, draw a movement. If it is one of the named factors — product demand, productivity, migration, tax — draw a new, labelled curve.'),

  mk('Explaining the downward slope with worse workers',
    '"Firms hire fewer at a higher wage because extra workers are less skilled."',
    'The workers are identical. Each adds less because the machines and space do not grow with the workforce — diminishing marginal productivity.',
    'Name fixed inputs as the reason, then link it to the hiring rule: the extra output is worth less, so only a lower wage makes the extra worker worth hiring.'),

  mk('Valuing extra output at the price when the firm must cut its price to sell more',
    '"The extra worker makes 3 more units and each sells for $10, so she adds $30 to revenue" — written about a firm that has to lower its price to sell the extra units.',
    'Extra output times the price is what a worker adds to revenue only when the firm can sell every extra unit at the same price, as one small firm among many can. A firm that must cut its price to sell more gains less than the price on each extra unit, because the lower price also applies to the units it was already selling.',
    'State the assumption before you multiply: "the firm sells at a given market price, so each extra unit adds its price to revenue." If the firm must cut its price to sell more, value the extra output at the extra revenue it brings in, which is below the price.'),

  mk('Expecting employment to rise whenever pay rises',
    '"A licence raised machinists\' pay, so more machinists are employed."',
    'When supply shifts left, the wage rises and firms move up their demand curve, so employment falls. Wage and employment move together only when demand shifts.',
    'Identify which curve moved first. Demand: both move together. Supply: they move apart.'),

  mk('Calling every pay gap a market failure',
    '"Surgeons earn more than cleaners, so the labour market has failed."',
    'A high wage for scarce, hard-won skills is how the market rations them and draws in trainees. Market failure in the labour market is immobility: gaps that persist because workers cannot move.',
    'Ask whether the gap would close if workers could move. If yes, immobility is the failure; if it reflects long training and strong demand, it is the market working.'),

  mk('Confusing the two kinds of immobility',
    '"The miners are geographically immobile because they have no IT skills."',
    'Lacking the skills for a different job is occupational immobility. Geographical immobility is being unable to move to another place where the same kind of job exists.',
    'Test with one question: is the barrier the place or the skill? Name the kind, then give its cause and its consequence.'),

  mk('Treating public-sector pay as a market price',
    '"Nurses\' pay will rise to clear the shortage."',
    'Public-sector pay is set by decision — pay scales, commissions, the budget — so it can stay below equilibrium for years while posts go unfilled.',
    'Say who sets the wage and what limits them, then show the shortage at the set wage on a diagram.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

/*
 * `ExtrasTab.jsx` maps `chain.steps`, so every chain has `steps` and a `title`, and every evaluation
 * frame a `content` string (V028, packet 28).
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a rise in export orders to a new equilibrium wage',
      steps: [
        `Export orders for ${L.country}'s shirts rise: demand for the final product increases.`,
        `Labour is a derived demand, so at every wage workshops want ${k(L.dUp)} more ${L.job}.`,
        `At the old wage of ${hr(L.eq.W)} there is a shortage: ${k(L.demand(L.eq.W, L.dUp))} wanted against ${k(L.eq.L)} willing.`,
        `Workshops compete for workers and the wage rises to ${hr(L.eqD.W)}, drawing in more people along the supply curve.`,
        `The new equilibrium: ${k(L.eqD.L)} employed at ${hr(L.eqD.W)}.`,
      ],
      result: 'A demand shift moves the wage and employment in the same direction. How much of the change shows up as higher pay rather than more jobs depends on how elastic the supply of labour is.',
    },
    {
      title: 'How one firm decides how many to hire',
      steps: [
        `The market sets the wage at ${hr(L.eq.W)}; ${L.firm} is too small to change it, so it takes it.`,
        `Each extra machinist adds fewer shirts than the one before, because the machines are fixed.`,
        `It sells every shirt at the market price of ${money(L.price)}, so the sixth adds ${L.mpp(6)} shirts worth ${money(L.value(6))} and the seventh ${L.mpp(7)} worth ${money(L.value(7))}.`,
        `The firm hires while the extra output is worth at least the wage: ${L.firmL} machinists.`,
      ],
      result: `A higher wage moves the firm along its demand curve (${L.firmLW2} at ${hr(L.W2)}); a higher product price or higher productivity shifts it (${L.firmLPrice} at ${hr(L.eq.W)}).`,
    },
    {
      title: 'Two ways a union raises pay',
      steps: [
        `Restricting entry: longer apprenticeships and member-only hiring cut supply by ${k(-L.sEntry)} at every wage.`,
        `The wage rises to ${hr(L.eqEntry.W)} and ${k(L.eqEntry.L)} are employed; no one qualified is left queuing.`,
        `Bargaining: the union wins a floor of ${hr(L.unionW)} with supply unchanged.`,
        `Firms hire ${k(L.unionJobs)} while ${k(L.unionWilling)} want the work: a surplus of ${k(L.unionExcess)}.`,
      ],
      result: 'Both routes reach the same wage and the same employment. What differs is who is left out: with a restriction they never qualified; with a floor they are qualified and cannot find a post. In both, the jobs lost depend on the elasticity of demand for labour.',
    },
    {
      title: 'Immobility, from a regional shock to a market failure',
      steps: [
        `Demand for ${L.job} falls by ${k(12)} in the North and rises by ${k(12)} in the South.`,
        `If wages adjust, the North's falls to ${hr(L.north.W)} and the South's rises to ${hr(L.south.W)}.`,
        `Normally workers would move South and close the ${money(L.regionalGap)} gap. Housing costs and family ties stop them.`,
        `If pay in both regions stays at ${hr(L.eq.W)}, ${k(L.northJobless)} are out of work in the North while ${k(L.southVacant)} posts go unfilled in the South.`,
      ],
      result: 'Idle workers beside unfilled jobs is labour not allocated to where it is most valued: market failure in the labour market. How serious it is depends on how long the barriers last.',
    },
  ],
  evaluation: [
    {
      title: 'Does a wage above equilibrium cost jobs?',
      content: 'The basic prediction is yes: a union wage above equilibrium moves firms up their demand curve and leaves a surplus of labour. **How many jobs go depends on the elasticity of demand for labour.** Where labour is hard to replace with machines, a small share of costs and making a product customers keep buying, few jobs are lost. Where the pay rise comes with higher productivity, or demand for the product is rising, the demand curve itself moves right and the losses can be none. A strong judgement names which of these holds for the occupation in the question.',
    },
    {
      title: 'Is a pay gap a market failure?',
      content: 'Some are and some are not. **The test is whether the gap would close if workers could move.** A high wage for a skill that takes years to learn rations the few who have it and draws in trainees: the market working. A gap between regions, or between a declining and a growing occupation, that lasts because workers cannot afford to move or lack the qualifications, is immobility: a market failure. The strongest answers weigh how large and how lasting the immobility is, since a friction that clears in a year matters far less than one that lasts a decade.',
    },
    {
      title: 'Supply and demand, or a decision?',
      content: 'In competitive occupations with many employers, supply and demand set the wage, and **even a negotiated or administered wage cannot stay far from equilibrium for long without shortages or surpluses.** But trade unions set wages by collective bargaining and control entry, and the state sets public-sector pay through pay scales, commissions and its budget. The judgement depends on how competitive the occupation is and how long a period the question is about.',
    },
  ],
};
