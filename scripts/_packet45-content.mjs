/**
 * PACKET 45 — labour-markets teaching content. Five chapters in the specification's own order,
 * twenty-one subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1447-1479`. Requirement 3 is split across two chapters — the competitive
 * market (3a, 3b), then the wages set outside it (trade unions, 2c, and the public sector, 3c) —
 * which is how 3.3.4's own heading, "competitive and non-competitive markets", divides it:
 *
 *   1  The Demand for Labour                         1a-1..4, 1b          5 subsections
 *   2  The Supply of Labour                          2c-1..5, 2d          5
 *   3  Wage Determination in a Competitive Market    3a, 3b               5
 *   4  Trade Unions and Public-Sector Pay            2c-6, 3c             3
 *   5  Market Failure in the Labour Market           4a, 4b               3
 *
 * ── WHAT THE LIVE SECTION TAUGHT THAT IS NOT HERE, AND WHERE IT LIVES ────────
 *
 * The live "Monopsony Power" subsection and its two diagrams are 3.3.3 · 7 (`:1432-1434`),
 * `market-structures-contestability`, which draws the construction correctly (packet 29,
 * `_packet29-diagrams.mjs:772`: MCL above supply, employment where MCL meets MRP, the wage read off
 * SUPPLY). The minimum wage — in either market — is 3.3.5 · 2b (`:1530`), `government-intervention-
 * firms`. Both are POINTED AT here with a budget, each pointer carrying its number (`POINTER_ONLY`
 * in the util). That removes `topFix-04`'s mis-drawn SVGs from this section rather than repairing a
 * second copy, and it removes `structure-07`'s defect at its root: no text here presupposes a
 * minimum-wage result the section does not teach.
 *
 * The live "backward-bending supply" material is gone for the reason packet 17 settled (income and
 * substitution effects are not IAL vocabulary; 2c is the supply to an OCCUPATION), which is also
 * the whole of `structure-10`: the two `examMatters` that contradicted each other were both about it.
 *
 * ── THE ONE LEDGER CLAIM THE SPECIFICATION REVERSES ────────────────────────
 *
 * `accuracy-01`: the live key idea said wages differ "not because markets are failing". 4a and 4b
 * are headed "Market failure in the labour market". `why-pay-differs` and `immobility-market-failure`
 * teach the distinction the key idea lost: a gap that reflects scarce skills is the market working;
 * a gap that persists because workers CANNOT move is the market failing.
 */
import {
  SECTION, subId, id, LAB, money, hr, k, pct,
} from './_packet45-util.mjs';

const L = LAB;
const blockId = (title) => id('block', title);

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position.
 * `shuffled` is never written: the renderer ignores it and CONTENT-GATE says to delete it.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'The Demand for Labour';
export const B2 = 'The Supply of Labour';
export const B3 = 'Wage Determination in a Competitive Market';
export const B4 = 'Trade Unions and Public-Sector Pay';
export const B5 = 'Market Failure in the Labour Market';

/* ══ Block 1 — The Demand for Labour (3.3.4 · 1a, 1b) ════════════════════ */

const derivedDemand = (() => {
  const sid = subId('derived-demand');
  return {
    id: sid,
    title: 'Labour as a Derived Demand',
    keyIdea: 'Firms do not want workers for their own sake. They want what workers make, so the demand for labour is derived from the demand for the final product.',
    body: [
      { type: 'paragraph', text: `The **demand for labour** is the number of workers firms want to employ at each wage rate. It is a **derived demand**: firms hire because customers want the goods and services those workers produce, not because they value workers in themselves.` },
      { type: 'paragraph', text: `So anything that changes the demand for the final product changes the demand for the people who make it. In ${L.country}, export orders for shirts rise. Workshops need more hours of sewing to fill them, so at every wage they want more ${L.job}.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Customers want more shirts', subtitle: 'Export orders rise' },
        { title: 'Workshops need more output', subtitle: 'More machine hours to fill the orders' },
        { title: 'Firms want more machinists', subtitle: 'At every wage rate' },
        { title: 'Demand for labour shifts right', subtitle: 'A derived change' },
      ] },
      { type: 'paragraph', text: `The link runs both ways. When demand for a product falls, so does demand for the workers who make it — which is why an industry sheds jobs when its product goes out of fashion, however skilled its workers are.` },
    ],
    realExample: { emoji: '📦', text: 'As online shopping grew in cities such as Kuala Lumpur and Lagos, so did the demand for delivery riders and warehouse pickers. Nobody wanted riders for their own sake; they wanted the parcels delivered.' },
    misconception: 'Students draw a rise in demand for the product as a movement along the demand curve for labour, because more workers are hired. The wage has not changed, yet firms want more workers at every wage, so the whole curve shifts right. Only a change in the wage moves firms along the curve.',
    examMatters: 'Appendix 6 gives Define 2 marks. For derived demand the two parts are that labour is wanted for the output it produces, and that it therefore depends on the demand for the final product.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the customers to the labour market:',
      correctOrder: [
        'Shoppers abroad order far more cotton shirts this season',
        'Workshops must run their machines longer to fill the orders',
        'At an unchanged rate of pay, owners now want extra machinists',
        'Across the industry, the labour demand curve moves outward',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts in the product market, with the customers.',
        'More orders mean more output has to be made.',
        'More output needs more workers at any given wage.',
        'Summed over every workshop, that is a shift of the demand for labour, not a movement along it.',
      ],
    }),
  };
})();

const hiringRule = (() => {
  const sid = subId('hiring-rule');
  return {
    id: sid,
    title: 'How Many Workers a Firm Hires',
    keyIdea: 'A firm hires another worker only if that worker\'s extra output is worth at least the wage. Each extra worker adds less, so the demand curve for labour slopes down.',
    body: [
      { type: 'paragraph', text: `Take ${L.firm}, a ${L.country} workshop whose shirts sell for ${money(L.price)} each. The first machinist adds ${L.mpp(1)} shirts an hour, the second ${L.mpp(2)}, the third ${L.mpp(3)}. With the same machines and floor space, each extra worker adds less than the one before: **diminishing marginal productivity**.` },
      { type: 'paragraph', text: `What the firm cares about is what that extra output adds to its revenue. ${L.firm} is one of many workshops and sells every extra shirt at the market price of ${money(L.price)}, so that is the extra shirts times the price. Textbooks call it the **marginal revenue product (MRP)**: extra output × marginal revenue, which equals the price only for a firm selling at a given price. A firm that must cut its price to sell more gains less than the price on each extra shirt. The sixth machinist adds ${L.mpp(6)} shirts, worth ${money(L.value(6))} an hour; the seventh adds ${L.mpp(7)}, worth ${money(L.value(7))}.` },
      { type: 'paragraph', text: `The firm keeps hiring while the next worker's output is worth at least the wage. At ${hr(L.eq.W)} it hires ${L.firmL}: one more would cost more than she brings in. At ${hr(L.W2)} it hires only ${L.firmLW2}. So a change in the wage is a **movement along** the firm's demand curve for labour.` },
    ],
    realExample: { emoji: '🍃', text: 'A tea estate in Kenya takes on extra pickers at harvest only while the leaf each one adds sells for more than the day\'s pay. Late in the season, with the bushes thin, the extra picker adds too little to be worth hiring.' },
    misconception: 'Students explain the downward slope by saying later recruits are lazier or less skilled. The workers are identical. Each adds less because the equipment does not grow with the workforce, so every new hand has less to work with.',
    examMatters: 'For an Explain on why the demand curve for labour slopes down, Appendix 6 wants two linked stages: each extra worker adds less output, and the firm hires only while that output is worth the wage.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the rule a firm uses to decide how many to employ:',
      template: [
        'A workshop that sells every shirt without cutting what it charges values an extra machinist\'s shirts at the number made multiplied by the ___ each fetches.',
        'Taking on staff stops once the next recruit would bring in less than her hourly ___.',
        'A higher hourly rate of pay moves the firm ___ its demand curve for labour.',
      ],
      answers: ['price', 'wage', 'along'],
      hints: ['what each unit sells for', 'what each worker is paid for an hour', 'not a shift of the curve'],
      distractors: ['cost', 'across', 'profit'],
    }),
  };
})();

const productivityAndPrice = (() => {
  const sid = subId('productivity-and-price');
  return {
    id: sid,
    title: 'Productivity and the Price of the Product',
    keyIdea: 'A rise in the productivity of labour or in the price of the product makes each worker\'s output worth more, so the demand for labour shifts right at every wage.',
    body: [
      { type: 'paragraph', text: `For a firm that sells at a given price, as ${L.firm} does, what a worker adds is worth two things multiplied together: how much the worker produces, and what each unit sells for. Change either, and the firm's demand for labour **shifts**.` },
      { type: 'paragraph', text: `**Productivity of labour.** A training course lets every machinist at ${L.firm} sew one more shirt an hour. At ${hr(L.eq.W)} the seventh machinist now adds ${L.mpp(7, L.mppTrained)} shirts worth ${money(L.value(7, L.price, L.mppTrained))}, so the firm hires ${L.firmLTrained} instead of ${L.firmL}. Better machines and better organisation work the same way.` },
      { type: 'paragraph', text: `**Price of the product.** If the price of a shirt rises from ${money(L.price)} to ${money(L.price2)}, productivity unchanged, the seventh machinist's ${L.mpp(7)} shirts are worth ${money(L.value(7, L.price2))}: again the firm hires ${L.firmLPrice}.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'The shirt price rises', subtitle: `${money(L.price)} to ${money(L.price2)}` },
        { title: 'Each worker\'s output is worth more', subtitle: 'At every level of employment' },
        { title: 'The firm hires more at the same wage', subtitle: `${L.firmL} to ${L.firmLPrice} machinists` },
      ] },
      { type: 'paragraph', text: `A fall in either shifts demand left. Keep the two apart from a wage change: the wage moves the firm along its demand curve; productivity and the product price move the curve.` },
    ],
    realExample: { emoji: '🌴', text: 'When the world price of palm oil rises, plantations in Malaysia and Indonesia want more harvesters: every bunch a worker cuts is worth more, though the cutting is no quicker.' },
    misconception: 'Students treat any rise in employment as proof that productivity rose. A higher product price raises employment with productivity unchanged: each worker makes the same amount, but it sells for more.',
    examMatters: 'Appendix 6 wants a chain for an Explain: name the factor, show that it raises what each worker\'s output is worth, then conclude that the demand for labour shifts right at every wage.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by what it does to a garment workshop\'s demand for machinists:',
      groups: [
        { name: 'Shifts demand right', items: ['Customers pay more for each shirt', 'New sewing machines speed up every worker', 'A course teaches every machinist a faster stitch'], why: 'Each raises what a worker\'s output is worth — through the price or through how much is made — so more workers are wanted at every wage.' },
        { name: 'Shifts demand left', items: ['Shirt prices are cut to match a cheaper rival', 'Worn-out machines slow every worker down'], why: 'Each lowers what a worker\'s output is worth, so fewer workers are worth hiring at every wage.' },
        { name: 'A movement along the curve', items: ['The hourly wage for machinists goes up'], why: 'The wage is on the axis, so a change in it moves the firm along its demand curve rather than moving the curve.' },
      ],
    }),
  };
})();

const labourOrCapital = (() => {
  const sid = subId('labour-or-capital');
  return {
    id: sid,
    title: 'The Wage Rate Relative to the Price of Capital',
    keyIdea: 'When workers become dear relative to machines, firms replace some workers with capital and the demand for labour falls. When machines become dear, the reverse.',
    body: [
      { type: 'paragraph', text: `Many tasks can be done by people or by machines. What decides it is not the wage alone but the **wage rate relative to the price of capital**: what a worker costs compared with a machine that does the same work.` },
      { type: 'paragraph', text: `An automatic cutter at ${L.firm} costs ${hr(L.machineCost)} to run and does the work of ${L.machineDoes} machinists. At a wage of ${hr(L.eq.W)}, the ${L.machineDoes} cost ${hr(L.machineDoes * L.eq.W)} between them, so the cutter is cheaper and the firm buys it. At ${hr(L.lowW)} they would cost ${hr(L.machineDoes * L.lowW)} and keep their jobs. The dividing line is ${hr(L.breakEvenW)}: a third of the machine's cost.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Wages rise relative to machines', subtitle: 'Or machines get cheaper' },
        { title: 'Capital does the work for less', subtitle: 'Firms change how they produce' },
        { title: 'Demand for labour falls', subtitle: 'Fewer workers wanted at each wage' },
      ] },
      { type: 'paragraph', text: `So a fall in the price of capital can shift the demand for labour left with wages unchanged. It is not always so: a machine that needs an operator, or that makes each worker more productive, can raise the demand for the people who run it.` },
    ],
    realExample: { emoji: '🛒', text: 'Supermarkets from Singapore to Nairobi have installed self-checkout tills as the machines became cheaper. Each till does part of a cashier\'s work, so fewer cashiers are needed at each wage.' },
    misconception: 'Students say firms bring in machines "to be modern". It is a comparison of costs: if a machine costs more per unit of work than the people it would replace, a profit-seeking firm keeps the people.',
    examMatters: 'Appendix 6 wants workings shown on a Calculate. Here that means the cost of each method for the same amount of work, side by side, and then which is cheaper.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Work through the choice a workshop faces between people and a machine:',
      template: [
        'At $11 an hour, three machinists together cost $___ an hour.',
        'A cutter doing their work for $30 an hour makes ___ the cheaper method.',
        'So the workshop\'s demand curve for machinists shifts to the ___.',
      ],
      answers: ['33', 'capital', 'left'],
      hints: ['three times the hourly wage', 'machines rather than people', 'fewer workers wanted at every wage'],
      distractors: ['labour', 'right', '30'],
    }),
  };
})();

const elasticityOfDemand = (() => {
  const sid = subId('elasticity-of-demand');
  return {
    id: sid,
    title: 'Elasticity of Demand for Labour',
    keyIdea: 'The elasticity of demand for labour measures how strongly employment responds to a change in the wage. It is higher where labour is easy to replace or a large share of costs.',
    body: [
      { type: 'paragraph', text: `**Elasticity of demand for labour** = % change in the quantity of labour demanded ÷ % change in the wage rate. For ${L.country}'s ${L.job}, a rise in the wage from ${hr(L.eq.W)} to ${hr(L.W2)} is ${pct(L.pctW)}; the number firms want falls from ${k(L.eq.L)} to ${k(L.Lat15)}, by ${pct(Math.abs(L.pctL))}. The elasticity is ${String(L.edl).replace('-', '−')}: demand is **inelastic**, so employment falls proportionately less than the wage rises.` },
      { type: 'paragraph', text: `Four factors influence the elasticity of demand for labour:` },
      { type: 'bullets', items: [
        '**How easily capital can replace labour.** Where a machine can do the job, a higher wage makes firms switch, so demand is elastic.',
        '**Labour\'s share of total costs.** Where wages are most of what a firm spends, a pay rise lifts its costs sharply; where they are a small share, it barely matters.',
        '**The price elasticity of demand for the product.** If higher costs push up the price and customers buy much less, output and jobs fall a lot.',
        '**Time.** Firms are tied to their equipment at first; given time they redesign how they work, so demand becomes more elastic.',
      ] },
      { type: 'paragraph', text: 'So the same pay rise costs very different numbers of jobs in different occupations.' },
    ],
    realExample: { emoji: '✈️', text: 'A pay rise for airline pilots barely changes how many an airline employs: every flight needs its crew, and their pay is a modest share of costs next to fuel and aircraft. The same rise for car-park attendants hastens the switch to automatic barriers.' },
    misconception: 'Students confuse the elasticity of demand for labour with the price elasticity of demand for the product. They are linked but different: the first is how employment responds to the wage; the second is one of the things that decides it.',
    examMatters: 'Appendix 6 gives Explain 4 marks. Each factor needs its reason: not "substitutes", but "a machine can do the work, so firms switch when wages rise".',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each group of workers to the reason its demand for labour is elastic or inelastic:',
      pairs: [
        { left: 'Toll-booth collectors', right: 'A machine can take the payment instead', why: 'An easy switch to capital makes demand for them elastic.' },
        { left: 'Hand-weavers of costly carpets', right: 'Buyers turn to cheaper rugs when prices climb', why: 'An elastic demand for the product passes through to an elastic demand for the workers.' },
        { left: 'Cleaners at a large power station', right: 'Their pay is a tiny fraction of the plant\'s costs', why: 'A small share of costs makes demand for them inelastic.' },
        { left: 'Staff at a factory whose equipment was just installed', right: 'The production method is fixed for years', why: 'In the short run firms cannot change how they produce, so demand is inelastic.' },
      ],
    }),
  };
})();

/* ══ Block 2 — The Supply of Labour (3.3.4 · 2c, 2d) ═════════════════════ */

const occupationalSupply = (() => {
  const sid = subId('occupational-supply');
  return {
    id: sid,
    title: 'The Supply of Labour to an Occupation',
    keyIdea: 'The supply of labour to an occupation is the number of workers willing and able to do it at each wage rate. A higher wage draws more people in, so the curve slopes up.',
    body: [
      { type: 'paragraph', text: `The **supply of labour** to an occupation is how many people are willing and able to work in it at each wage. In ${L.country}, ${k(L.supply(L.eq.W))} people offer to work as ${L.job} at ${hr(L.eq.W)}; at ${hr(L.W2)}, ${k(L.supply(L.W2))} would.` },
      { type: 'paragraph', text: 'The curve slopes up because a higher wage pulls people in from other jobs, from study and from home. Some were earning nearly as much elsewhere, and a better rate tips the balance. Pay is not all they weigh — hours, safety and the work itself matter too — which is why two jobs on the same wage can attract very different numbers.' },
      { type: 'paragraph', text: 'As with demand, a change in the wage moves along the curve and anything else shifts it. The specification names six factors that influence the supply of labour to a particular occupation: the **size of population**, **net migration**, **income tax rates**, the **level of welfare benefits**, **government regulations** and **trade unions**. The first five follow in this chapter; trade unions have chapter 4.' },
    ],
    realExample: { emoji: '🏥', text: 'When a hospital in Nairobi raises its night-shift rate, nurses from day shifts and from private clinics apply for the nights: a movement along the supply of labour to night nursing.' },
    misconception: 'Students shift the supply curve right when the wage rises. The wage is on the vertical axis, so a higher wage is a movement along the curve to a larger quantity supplied. A shift needs one of the six factors.',
    examMatters: 'Put the wage rate on the vertical axis and the quantity of labour on the horizontal. A shift is a new labelled curve, S₁; a movement is an arrow along the old one.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each event into a movement along the supply of labour to nursing or a shift of it:',
      groups: [
        { name: 'A movement along the curve', items: ['Hospitals raise the hourly rate and more nurses apply', 'Pay for nursing falls and some leave for other jobs'], why: 'The cause is the wage, which is on the axis, so the quantity supplied changes along the same curve.' },
        { name: 'A shift of the curve', items: ['Thousands of qualified nurses arrive from abroad', 'A degree becomes compulsory before anyone may nurse', 'The tax taken from every pay packet is cut'], why: 'Each changes how many will offer to nurse at an unchanged wage, so the whole curve moves.' },
      ],
    }),
  };
})();

const populationAndMigration = (() => {
  const sid = subId('population-and-migration');
  return {
    id: sid,
    title: 'Size of Population and Net Migration',
    keyIdea: 'A larger population and a net inflow of working-age migrants add people able to do a job, so the supply of labour to an occupation shifts right.',
    body: [
      { type: 'paragraph', text: '**Size of population.** More people of working age means more potential workers for every occupation. A young, growing population adds to supply year after year; an ageing one, with more people retiring than leaving school, takes supply away.' },
      { type: 'paragraph', text: '**Net migration** is immigration minus emigration. When more workers arrive than leave, supply rises; when trained workers leave for better pay abroad, it falls. Migrants often cluster in particular occupations, so the effect on one job can be far larger than on the labour force as a whole.' },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Workers arrive from abroad', subtitle: 'Net migration is positive' },
        { title: 'More people seek machinist jobs', subtitle: 'At every wage rate' },
        { title: 'Supply of labour shifts right', subtitle: 'S to S₁' },
      ] },
      { type: 'paragraph', text: `In ${L.country}, a net inflow of ${k(L.sUp)} ${L.job} shifts supply right by ${k(L.sUp)} at every wage. What that does to the wage is a question for chapter 3.` },
    ],
    realExample: { emoji: '🏗️', text: 'Construction in the UAE and Qatar relies heavily on workers from South Asia, so net migration largely decides the supply of labour to building sites there. Nigeria and Kenya, by contrast, have lost many trained doctors and nurses to jobs abroad.' },
    misconception: 'Students write that immigration always lowers wages. It shifts supply right, which lowers the wage only if demand stays put; migrants also spend what they earn, which raises the demand for labour in other occupations.',
    examMatters: 'Appendix 6 asks an Analyse for a chain. For net migration the stages are: which way it runs, which occupations it adds to, the shift of supply, and only then the effect on the wage.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the border to the labour market:',
      correctOrder: [
        'Several thousand trained sewing workers move to Tellmar from abroad',
        'Machinist vacancies attract more applicants at each rate of pay',
        'The industry\'s supply curve for this labour moves outward',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the movement of people: net migration is positive.',
        'The new arrivals have the skills, so more offer to do this job at every wage.',
        'More willing at every wage is a shift of supply, not a movement along it.',
      ],
    }),
  };
})();

const taxAndBenefits = (() => {
  const sid = subId('tax-and-benefits');
  return {
    id: sid,
    title: 'Income Tax Rates and Welfare Benefits',
    keyIdea: 'Higher income tax cuts take-home pay, and higher welfare benefits cut the gain from taking a job. Either can reduce the supply of labour at each wage.',
    body: [
      { type: 'paragraph', text: 'What draws people into work is the pay they keep, not the figure on the contract. **Income tax rates** decide the gap between the two. A higher rate lowers take-home pay at every wage, so fewer people are willing to do the job at each wage, or some offer fewer hours: supply shifts left. A cut shifts it right.' },
      { type: 'paragraph', text: 'The **level of welfare benefits** works on the same gap from the other side. The gain from taking a job is the pay kept minus the benefits given up. Where support for those out of work is close to what low-paid jobs leave in the pocket, the reward for working is small, and supply to those occupations falls.' },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Benefits rise', subtitle: 'For those out of work' },
        { title: 'The gain from working shrinks', subtitle: 'Pay kept minus benefits lost' },
        { title: 'Fewer willing at each wage', subtitle: 'Supply shifts left' },
      ] },
      { type: 'paragraph', text: `Neither effect is certain in size. Some people work longer after a tax rise to keep their income up, and many would work whatever the benefit. How large the shift is — ${k(Math.abs(L.sTax))} ${L.job} or none — is exactly what an evaluation should ask.` },
    ],
    realExample: { emoji: '🏙️', text: 'The UAE levies no personal income tax, so the salary offered to a professional from abroad is also the salary kept — part of what draws accountants and engineers to jobs there.' },
    misconception: 'Students say a benefit cut "forces people into work". It changes the reward for working, which may raise supply to low-paid jobs; whether there are jobs to take depends on demand, which the benefit does not touch.',
    examMatters: 'Appendix 6 wants a brief assessment in an Examine. For taxes and benefits it is usually size: how far take-home pay moves, and how many people are close to deciding whether to take a job at all.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each change by its likely effect on the supply of labour to low-paid occupations:',
      groups: [
        { name: 'Likely to raise supply', items: ['The tax rate on wages is cut', 'Support for the jobless is made less generous', 'Earnings under a threshold become tax-free'], why: 'Each widens the gap between being in work and out of it, so more people will take the job at a given wage.' },
        { name: 'Likely to reduce supply', items: ['The tax rate on wages goes up', 'Jobless support is raised almost to the lowest wages'], why: 'Each narrows that gap, so fewer people find the job worth taking at a given wage.' },
      ],
    }),
  };
})();

const governmentRegulations = (() => {
  const sid = subId('government-regulations');
  return {
    id: sid,
    title: 'Government Regulations',
    keyIdea: 'Rules on who may do a job, and for how long, change how many can supply it: a new licence or a tighter work-permit rule shifts supply left; easing them shifts it right.',
    body: [
      { type: 'paragraph', text: '**Government regulations** decide who is allowed to work in an occupation and on what terms. Four kinds act on supply:' },
      { type: 'bullets', items: [
        '**Licensing and qualifications.** Doctors, pilots and electricians need a licence, and a new requirement removes everyone without it.',
        '**Work permits.** Rules on foreign workers set how many can come to do a job — net migration by another route.',
        '**Limits on hours.** A cap on the working week reduces the hours each worker can offer.',
        '**Retirement and school-leaving ages.** A later retirement age keeps experienced workers in; a later school-leaving age delays entry.',
      ] },
      { type: 'paragraph', text: `In ${L.country}, a new licence that ${k(-L.sReg)} ${L.job} cannot yet meet shifts supply left by ${k(-L.sReg)} at every wage. The wage rises to ${hr(L.eqReg.W)} and employment falls to ${k(L.eqReg.L)}.` },
      { type: 'paragraph', text: 'Regulations are not simply costs. A licence can protect the public and raise the standard of the work; its effect on supply is one thing an evaluation weighs, not the whole of it.' },
    ],
    realExample: { emoji: '🛂', text: 'Singapore\'s work-pass system sets the pay and qualifications a foreign worker needs for each kind of pass, so it shapes the supply of labour to jobs from construction to finance.' },
    misconception: 'Students treat every labour regulation as a cost that cuts the demand for labour. Licensing, work permits and retirement ages act on who can supply labour, so they shift the supply curve.',
    examMatters: 'Appendix 6 wants an Analyse to use a diagram where it helps. Name the regulation, say which side of the market it acts on, then shift that curve and read off the new wage.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each regulation to the way it changes the supply of labour:',
      pairs: [
        { left: 'A licence exam for electricians', right: 'Shuts out anyone who cannot pass it', why: 'A licence narrows who may do the job, so supply shifts left.' },
        { left: 'Fewer foreign work permits for builders', right: 'Cuts how many can arrive to do the work', why: 'It is net migration controlled by rule, so supply to building falls.' },
        { left: 'A later age of retirement', right: 'Keeps older hands working for longer', why: 'People who would have left stay in the labour force, so supply rises.' },
        { left: 'A 48-hour ceiling on weekly work', right: 'Shrinks how much time each employee can sell', why: 'The number of workers is unchanged, but the labour each can supply is smaller.' },
      ],
    }),
  };
})();

const elasticityOfSupply = (() => {
  const sid = subId('elasticity-of-supply');
  const I = L.inel;
  return {
    id: sid,
    title: 'Elasticity of Supply of Labour',
    keyIdea: 'The elasticity of supply of labour measures how strongly the number of workers responds to a change in the wage. It is low where a job needs long training or rare skills.',
    body: [
      { type: 'paragraph', text: '**Elasticity of supply of labour** = % change in the quantity of labour supplied ÷ % change in the wage rate. Where it is high, a small pay rise brings in many workers; where it is low, pay can rise a long way and few extra workers appear.' },
      { type: 'paragraph', text: 'Four factors influence the elasticity of supply of labour:' },
      { type: 'bullets', items: [
        '**Length of training and qualifications.** Machinists learn in weeks; surgeons train for years, so a pay rise this year cannot produce new surgeons this year.',
        '**How specific the skills are.** The rarer the skill, the fewer people in other jobs who could switch in.',
        '**Mobility of labour.** If workers cannot move to where the jobs are, or retrain into them, supply cannot respond.',
        '**Time.** Given long enough, people train, move and switch, so supply becomes more elastic.',
      ] },
      { type: 'paragraph', text: `Give two occupations, both at ${hr(L.eq.W)} and ${k(L.eq.L)} workers, the same rise in demand: ${k(L.dUp)} more wanted at every wage. With the ${L.job}' elastic supply the wage rises to ${hr(L.eqD.W)} and employment to ${k(L.eqD.L)}. With an inelastic supply the wage rises to ${hr(I.after.W)} and employment only to ${k(I.after.L)}.` },
    ],
    realExample: { emoji: '🩺', text: 'When hospitals need more specialist doctors, pay rises well before numbers do: a specialist takes many years to train, so for a long time the extra pay mostly goes to the specialists already working.' },
    misconception: 'Students write that inelastic supply means workers do not care about pay. It means they cannot respond quickly: the qualifications, skills or location the job needs take time to acquire.',
    examMatters: 'Appendix 6 gives Explain 4 marks, so each factor needs its reason: "supply is inelastic because training takes years, so pay can rise without new entrants for a long time" is both stages.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort these occupations by whether their supply of labour is likely to be elastic or inelastic:',
      groups: [
        { name: 'Likely elastic', items: ['Shelf-stackers in a supermarket', 'Fruit pickers at harvest time', 'Call-centre staff'], why: 'Each can be learned in days, so many people from other jobs can switch in when pay rises.' },
        { name: 'Likely inelastic', items: ['Heart surgeons', 'Commercial airline pilots', 'Air-traffic controllers'], why: 'Each needs years of training and a licence, so few new workers can appear however much pay rises.' },
      ],
    }),
  };
})();

/* ══ Block 3 — Wage Determination in a Competitive Market (3.3.4 · 3a, 3b) ═ */

const marketEquilibrium = (() => {
  const sid = subId('market-equilibrium');
  return {
    id: sid,
    title: 'Labour Market Equilibrium',
    keyIdea: 'In a competitive labour market the wage settles where the number of workers firms want equals the number willing to work, so there is neither shortage nor surplus.',
    body: [
      { type: 'paragraph', text: 'A labour market is **competitive** when many firms hire and many workers offer themselves, so no one on either side can set the wage. The wage settles where demand meets supply: **labour market equilibrium**.' },
      { type: 'paragraph', text: `For ${L.country}'s ${L.job}, demand is L = ${L.dA} − ${L.dB}W and supply is L = ${L.sB}W − ${-L.sA}, in thousands, with W in dollars an hour. They meet at **${hr(L.eq.W)}**, where ${k(L.eq.L)} are wanted and ${k(L.eq.L)} are willing.` },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Wage below equilibrium', subtitle: 'Firms want more workers than will come' },
        { title: 'Firms compete for workers', subtitle: 'Each offers more to fill its jobs' },
        { title: 'The wage rises', subtitle: 'Until wanted equals willing' },
      ] },
      { type: 'paragraph', text: `Above equilibrium the reverse happens. At ${hr(L.W2)} firms want ${k(L.demand(L.W2))} and ${k(L.supply(L.W2))} are willing, so there are more applicants than posts and the wage is bid down. Only at ${hr(L.eq.W)} does nothing push it.` },
    ],
    realExample: { emoji: '🧵', text: 'In a port city with hundreds of small garment workshops, no single employer can pay below the going rate for machinists: its workers would walk to the workshop next door.' },
    misconception: 'Students think the equilibrium wage is what workers "deserve". It is the wage at which the numbers wanted and willing match. It says nothing about fairness, and it changes whenever demand or supply does.',
    examMatters: 'Mark the equilibrium wage and quantity on both axes with dashed lines to the intersection. Appendix 6 asks for accurately labelled diagrams, and the intersection is what the answer is about.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this adjustment process in order, from a wage below equilibrium to the new wage:',
      correctOrder: [
        'At $10 an hour, firms want more machinists than come forward',
        'Workshops try to poach each other\'s staff with better offers',
        'Hourly pay climbs until the gap has closed',
      ],
      criterion: 'what happens first, then next: each step causes the one after it',
      why: [
        'Below equilibrium the quantity demanded exceeds the quantity supplied: a shortage.',
        'With posts unfilled, firms compete for the workers there are by raising what they offer.',
        'The wage keeps rising until the numbers wanted and willing match.',
      ],
    }),
  };
})();

const firmAsWageTaker = (() => {
  const sid = subId('firm-as-wage-taker');
  return {
    id: sid,
    title: 'One Firm in a Competitive Labour Market',
    keyIdea: 'One firm in a competitive labour market is a wage-taker: it can hire as many as it wants at the market wage, and it hires until the next worker is not worth that wage.',
    body: [
      { type: 'paragraph', text: `The market sets the wage; each firm takes it. ${L.firm} employs ${L.firmL} of the ${k(L.eq.L)} ${L.job} in ${L.country}. Offer less than ${hr(L.eq.W)} and nobody comes. Offer more and it is paying for nothing, because at ${hr(L.eq.W)} it can already hire as many as it wants.` },
      { type: 'paragraph', text: 'So the supply of labour **to the firm** is a horizontal line at the market wage, although the **market** supply curve slopes up. The two are drawn side by side: the market diagram sets the wage, and the firm\'s diagram carries it across as a flat line.' },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Market demand meets market supply', subtitle: `The wage is set at ${money(L.eq.W)}` },
        { title: 'Each firm takes that wage', subtitle: 'A horizontal supply to the firm' },
        { title: 'The firm hires to its own demand curve', subtitle: `${L.firmL} machinists at ${money(L.eq.W)}` },
      ] },
      { type: 'paragraph', text: `The firm hires where that line meets its demand curve for labour — the value of what each extra worker adds, from chapter 1. At ${hr(L.eq.W)} that is ${L.firmL} machinists.` },
    ],
    realExample: { emoji: '☕', text: 'A café in a city of thousands of cafés pays the going rate for baristas. Advertise a lower rate and nobody applies; pay more and it is giving money away.' },
    misconception: 'Students draw the firm\'s labour supply sloping upward, copying the market curve. One small firm hiring one more worker does not move the market wage, so the supply it faces is flat at that wage.',
    examMatters: 'When the question is about one firm, draw one firm: a horizontal supply at the market wage and the firm\'s own demand for labour. The market diagram beside it shows where the wage came from.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each curve to what it shows:',
      pairs: [
        { left: 'Market supply of machinists', right: 'How many in the whole city would work at each wage', why: 'It slopes up: a higher wage draws more people into the occupation.' },
        { left: 'Supply of machinists to one workshop', right: 'Any number can be hired at the going rate', why: 'One small employer cannot move the market wage, so the line is flat.' },
        { left: 'Market demand for machinists', right: 'How many all the workshops together want at each wage', why: 'It is every firm\'s demand added up, and it slopes down.' },
        { left: 'One workshop\'s demand for machinists', right: 'What each extra worker\'s shirts are worth to that workshop', why: 'The firm hires while an extra worker is worth at least the wage.' },
      ],
    }),
  };
})();

const demandShifts = (() => {
  const sid = subId('demand-shifts');
  return {
    id: sid,
    title: 'When the Demand for Labour Shifts',
    keyIdea: 'A rise in the demand for labour raises both the equilibrium wage and employment; a fall lowers both. What shifts it are the factors of chapter 1.',
    body: [
      { type: 'paragraph', text: 'This step and the next take the causes of changes in the equilibrium wage rate and quantity of labour: each is the result of shifts in the demand and supply curves. Demand shifts for the reasons chapter 1 gave — the demand for the final product, productivity, the price of the product and the price of capital.' },
      { type: 'paragraph', text: `Export orders for ${L.country}'s shirts rise, and at every wage workshops want ${k(L.dUp)} more ${L.job}. At the old wage of ${hr(L.eq.W)} there is now a shortage: ${k(L.demand(L.eq.W, L.dUp))} wanted, ${k(L.eq.L)} willing. Firms bid for workers until the wage reaches **${hr(L.eqD.W)}**, where ${k(L.eqD.L)} are employed.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Demand for shirts rises', subtitle: 'Export orders grow' },
        { title: 'Demand for machinists shifts right', subtitle: 'D to D₁' },
        { title: 'Shortage at the old wage', subtitle: 'Firms bid pay up' },
        { title: 'A new equilibrium', subtitle: 'Higher wage, more jobs' },
      ] },
      { type: 'paragraph', text: 'A fall in demand works in reverse: a surplus of workers at the old wage, which pushes the wage down, and employment with it. The wage and employment move in the same direction as demand.' },
    ],
    realExample: { emoji: '🛫', text: 'When a new airport opens, airlines, caterers and security firms all want more staff at once, and local pay for those jobs rises until enough people are drawn in.' },
    misconception: 'Students show a rise in demand for labour raising the wage and leave employment unchanged. Along an upward-sloping supply curve, a higher wage draws more workers in, so employment rises too.',
    examMatters: 'An Analyse asks for the chain and the diagram (Appendix 6). Name the cause, shift D to D₁, show the shortage at the old wage, then mark the new wage and quantity on the axes.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the product market to the new equilibrium:',
      correctOrder: [
        'Buyers abroad place bigger orders for Tellmar\'s shirts',
        'Workshops want more machinists at any given rate of pay',
        'At $12 an hour, a shortage opens as vacancies outnumber applicants',
        'Pay settles higher with more people in work',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The cause is outside the labour market, in the demand for the product.',
        'Derived demand: more shirts wanted means more machinists wanted at every wage.',
        'At the old wage the quantity demanded now exceeds the quantity supplied.',
        'Firms bid the wage up, and the higher wage draws more workers in along the supply curve.',
      ],
    }),
  };
})();

const supplyShifts = (() => {
  const sid = subId('supply-shifts');
  return {
    id: sid,
    title: 'When the Supply of Labour Shifts',
    keyIdea: 'A rise in the supply of labour lowers the equilibrium wage and raises employment; a fall raises the wage and lowers employment. The factors of chapter 2 shift it.',
    body: [
      { type: 'paragraph', text: 'Supply shifts for the reasons chapter 2 gave: population, net migration, income tax, welfare benefits, regulations and trade unions. This time the wage and employment move against each other.' },
      { type: 'paragraph', text: `A net inflow of ${k(L.sUp)} ${L.job} shifts supply right. At ${hr(L.eq.W)} there are ${k(L.supply(L.eq.W, L.sUp))} willing and ${k(L.eq.L)} wanted, a surplus, so the wage falls to **${hr(L.eqS.W)}**. Employment rises to ${k(L.eqS.L)}, because firms hire more at the lower wage.` },
      { type: 'paragraph', text: `A new licence that ${k(-L.sReg)} of them cannot meet shifts supply left: the wage rises to **${hr(L.eqReg.W)}** and employment falls to ${k(L.eqReg.L)}. A tax rise that deters ${k(-L.sTax)} at every wage does the same on a smaller scale: ${hr(L.eqTax.W)} and ${k(L.eqTax.L)}.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Supply of labour shifts left', subtitle: 'S to S₁' },
        { title: 'Too few workers at the old wage', subtitle: 'Firms compete for the rest' },
        { title: 'Wage up, employment down', subtitle: 'A movement up the demand curve' },
      ] },
    ],
    realExample: { emoji: '🧱', text: 'If recruitment of building workers from abroad is paused in a Gulf state, sites compete for the workers already there: pay rises, and fewer people are employed than before.' },
    misconception: 'Students expect employment to rise whenever the wage rises. After a supply shift the two move apart: a higher wage from a leftward shift comes with fewer jobs, because firms move up their demand curve.',
    examMatters: 'Appendix 6 wants an Examine to include a brief assessment. For a supply shift it is the size of the change in employment, which turns on how elastic the demand for labour is.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what a shift of supply does to the market:',
      template: [
        'After a net inflow of workers, employment in the occupation ___.',
        'A licence that shuts some workers out raises the wage and ___ the number employed.',
        'How big the fall in jobs is turns on the ___ of demand for labour.',
      ],
      answers: ['rises', 'cuts', 'elasticity'],
      hints: ['firms hire more at a lower wage', 'fewer are employed at a higher wage', 'how strongly firms respond to the wage'],
      distractors: ['falls', 'lifts', 'productivity'],
    }),
  };
})();

const whyPayDiffers = (() => {
  const sid = subId('why-pay-differs');
  return {
    id: sid,
    title: 'Why Two Occupations Pay Differently',
    keyIdea: 'Each occupation has its own demand, supply and labour market equilibrium. Pay is high where demand is strong and supply small and inelastic, low where many can do the job.',
    body: [
      { type: 'paragraph', text: 'There is not one labour market but one for each occupation, each with its own equilibrium. Pay differs because the curves differ:' },
      { type: 'bullets', items: [
        '**Demand**: what the work is worth to employers, which is high where productivity is high or the product is valuable.',
        '**Supply**: how many can and will do it. Long training, rare skills and dangerous or unpleasant conditions keep it small.',
        '**Elasticity of supply**: where training takes years, a rise in demand raises pay a long way before new workers arrive.',
      ] },
      { type: 'paragraph', text: 'A surgeon\'s work is worth a great deal and few can do it; a shelf-stacker\'s is worth less and many can. That gap can be the market working: the high wage is the signal that draws people into years of training.' },
      { type: 'paragraph', text: 'But a gap that lasts because workers **cannot** move to the better-paid job — they live in the wrong region, or lack the qualification — is not the market working. That is the market failure of chapter 5.' },
    ],
    realExample: { emoji: '🛩️', text: 'In Hong Kong, commercial pilots earn many times what restaurant waiters do: airlines value their work highly, training takes years and few qualify, while many people can learn to wait tables.' },
    misconception: 'Students say pay gaps show the market has failed. Many do not: a high wage for a scarce skill is how the market rations it and draws in trainees. The failure is a gap that persists because workers cannot move to close it.',
    examMatters: 'Appendix 6 wants an Examine to end in a brief assessment. For pay gaps, say which part is the market working and which reflects workers unable to move — that distinction is the assessment.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each reason two jobs pay differently into the market working or the market failing:',
      groups: [
        { name: 'The market working', items: ['Surgeons train for years and few qualify', 'Oil-rig work is dangerous, so fewer apply', 'Firms value software skills highly'], why: 'Each gap reflects demand, supply and elasticity; a higher wage is how the market rations scarce work and attracts trainees.' },
        { name: 'The market failing', items: ['Jobless machinists live far from the cities with vacancies', 'Laid-off miners lack the certificates new jobs require'], why: 'Each gap persists because workers cannot move to where they are wanted — geographical or occupational immobility.' },
      ],
    }),
  };
})();

/* ══ Block 4 — Trade Unions and Public-Sector Pay (3.3.4 · 2c, 3c) ═══════ */

const unionsAndSupply = (() => {
  const sid = subId('unions-and-supply');
  return {
    id: sid,
    title: 'How Trade Unions Affect the Supply of Labour',
    keyIdea: 'A trade union can raise pay by limiting how many may do a job. Restricting entry shifts supply left, which raises the wage and lowers employment.',
    body: [
      { type: 'paragraph', text: 'A **trade union** is an organisation of workers that deals with employers on its members\' behalf. The specification lists trade unions among the factors that influence the supply of labour, and one way they do it is by controlling who may enter an occupation.' },
      { type: 'paragraph', text: 'Some unions insist on long apprenticeships, set the qualifications a newcomer needs, or agree with employers that only members will be hired. Each reduces how many people can offer themselves for the job at every wage.' },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'The union limits entry', subtitle: 'Longer apprenticeships, members only' },
        { title: 'Fewer can do the job', subtitle: 'At every wage rate' },
        { title: 'Supply shifts left', subtitle: 'Wage up, employment down' },
      ] },
      { type: 'paragraph', text: `If ${L.country}'s machinists' union limited entry so that ${k(-L.sEntry)} fewer could work at every wage, the wage would rise to **${hr(L.eqEntry.W)}** and employment fall to ${k(L.eqEntry.L)}.` },
    ],
    realExample: { emoji: '⚓', text: 'Dock workers\' unions in many ports have controlled who may be hired for loading work, keeping the pool of dockers small and their pay above what open hiring would bring.' },
    misconception: 'Students assume a union can raise pay only by negotiating it. Controlling entry works through supply, with no bargaining over pay at all: the higher wage follows from a smaller pool.',
    examMatters: 'For how unions affect the supply of labour (3.3.4 · 2c), draw the supply shift. For a negotiated wage, draw the wage floor of the next step: two routes to a higher wage, on two different diagrams.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the union\'s rule to the labour market:',
      correctOrder: [
        'The electricians\' union doubles the length of an apprenticeship',
        'Fewer newcomers qualify to wire buildings each year',
        'Supply of electricians moves to the left',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with the union\'s rule on entry.',
        'A longer path in means fewer people can offer themselves at every wage.',
        'Fewer at every wage is a leftward shift of supply, which raises the wage and cuts employment.',
      ],
    }),
  };
})();

const unionWage = (() => {
  const sid = subId('union-wage');
  return {
    id: sid,
    title: 'A Wage Negotiated Above Equilibrium',
    keyIdea: 'Through collective bargaining a union can hold the wage above equilibrium. More people want the job at that wage but firms hire fewer, so employment falls unless demand rises.',
    body: [
      { type: 'paragraph', text: 'In **collective bargaining** a union negotiates one wage for all its members, and none of them works for less. That agreed rate is a floor: employers may pay more, but not less.' },
      { type: 'paragraph', text: `Suppose ${L.country}'s machinists' union wins ${hr(L.unionW)}, above the equilibrium of ${hr(L.eq.W)}. Workshops now hire only ${k(L.unionJobs)}, ${k(L.unionLost)} fewer than before, while ${k(L.unionWilling)} would like the work. The ${k(L.unionExcess)} left over are people willing to work at the going rate who cannot find a post in the occupation.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'The union wins a wage above equilibrium', subtitle: `${money(L.unionW)} against ${money(L.eq.W)}` },
        { title: 'Firms move up their demand curve', subtitle: 'Hiring fewer at the higher wage' },
        { title: 'Fewer jobs, more applicants', subtitle: 'A surplus of labour' },
      ] },
      { type: 'paragraph', text: 'How many jobs are lost turns on the elasticity of demand for labour. It can be none, if the pay deal comes with higher productivity or demand for the product is rising — or if the employer is the only buyer of labour in the area, a case topic 3.3.3 covers as monopsony. A legal minimum wage is a floor set by government rather than by bargaining; its effects are topic 3.3.5.' },
    ],
    realExample: { emoji: '🚢', text: 'Port workers\' unions in many countries negotiate one hourly rate for every docker in the port, so no individual worker can undercut it to win a shift.' },
    misconception: 'Students write that a union wage above equilibrium always destroys jobs. Firms move up their demand curve only if nothing else changes; a deal that raises productivity, or rising demand for the product, can offset it.',
    examMatters: 'A Discuss on unions wants different viewpoints (Appendix 6). The strongest judgement turns on how elastic the demand for labour is, and on whether productivity rises with pay.',
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete what a negotiated wage does to a competitive market:',
      template: [
        'A pay deal that no member may undercut acts like a price ___ on labour.',
        'At $16, firms want 28,000 and 52,000 want the work: a ___ of 24,000.',
        'Pay can rise with no jobs lost if the deal also lifts output per ___.',
      ],
      answers: ['floor', 'surplus', 'worker'],
      hints: ['the lowest the wage is allowed to go', 'more willing than wanted', 'productivity is measured per one of these'],
      distractors: ['ceiling', 'shortage', 'machine'],
    }),
  };
})();

const publicSectorPay = (() => {
  const sid = subId('public-sector-pay');
  const N = L.nurse;
  return {
    id: sid,
    title: 'Wage Setting in the Public Sector',
    keyIdea: 'In the public sector and state-owned enterprises, wage setting is a government decision: pay scales, commissions, bargaining. Set below equilibrium, pay leaves vacancies.',
    body: [
      { type: 'paragraph', text: 'Nurses, teachers and police, and the staff of **state-owned enterprises** such as national airlines, railways and power companies, are paid by the state. Wage setting in the public sector is an administrative decision: **pay scales** by grade and years of service, a pay commission that recommends each year\'s rise, and bargaining with public-sector unions.' },
      { type: 'paragraph', text: 'Three things shape it that a market would not. The **government budget** limits what can be paid. **Fairness and comparability** push for one national scale, so a nurse in the capital earns what one in a village earns. And the state is often the main employer of the occupation, so it can hold pay down without losing all its staff — buying power that topic 3.3.3 calls monopsony.' },
      { type: 'paragraph', text: `Set pay below equilibrium and shortages follow. ${L.country}'s market for nurses clears at ${hr(N.W)} with ${k(N.L)} nurses. A commission that sets ${hr(N.set)} leaves hospitals wanting ${k(N.wanted)} while only ${k(N.willing)} are willing: ${k(N.vacancies)} posts stay empty.` },
      { type: 'paragraph', text: 'Because living costs differ, one national scale can do both at once: too high where living is cheap, so applicants queue, and too low in the capital, so posts go unfilled.' },
    ],
    realExample: { emoji: '🏛️', text: 'Kenya\'s Salaries and Remuneration Commission sets pay for state officers and advises on pay across the rest of the public sector; doctors\' unions there have struck when agreed pay deals were not honoured.' },
    misconception: 'Students assume public-sector pay is set by supply and demand like any other. It is set by a decision, so it can sit away from equilibrium for years, with shortages or queues a market would have removed.',
    examMatters: 'For a Discuss on public-sector pay, Appendix 6 wants competing arguments weighed: the budget and fairness case for one scale, against the shortages it causes where pay sits below what the market would set.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each influence on public-sector pay to how it works:',
      pairs: [
        { left: 'A national pay scale', right: 'A teacher earns the same in every region', why: 'One scale is fair between regions, but it ignores differences in living costs and so in supply.' },
        { left: 'The government budget', right: 'Caps the total the state can afford for wages', why: 'Pay competes with every other use of public money, not with a rival employer.' },
        { left: 'A pay commission', right: 'Recommends each year\'s rise after taking evidence', why: 'The wage is a recommendation and a decision, not an equilibrium.' },
        { left: 'A public-sector union', right: 'Bargains for all its members with the state', why: 'Collective bargaining sets one rate for everyone the union covers.' },
      ],
    }),
  };
})();

/* ══ Block 5 — Market Failure in the Labour Market (3.3.4 · 4a, 4b) ══════ */

const geographicalImmobility = (() => {
  const sid = subId('geographical-immobility');
  return {
    id: sid,
    title: 'Geographical Immobility of Labour',
    keyIdea: 'Geographical immobility is when workers cannot move to where the jobs are. It leaves unemployment in one region alongside vacancies in another.',
    body: [
      { type: 'paragraph', text: '**Geographical immobility of labour** means workers are unable, or unwilling, to move from one area to another to take a job. Its causes:' },
      { type: 'bullets', items: [
        '**Housing costs**: homes in the growing region cost far more to buy or rent.',
        '**Family and social ties**: children in school, relatives to care for, a partner\'s job.',
        '**The cost of moving and a lack of information**: the move itself is expensive, and workers may not know where the vacancies are.',
      ] },
      { type: 'paragraph', text: `The consequences of geographical immobility show in each region's labour market. Demand for ${L.job} falls by ${k(12)} in the North, where workshops are closing, and rises by ${k(12)} in the South. If wages adjust, the North's falls to ${hr(L.north.W)} and the South's rises to ${hr(L.south.W)}: a ${money(L.regionalGap)} gap that movers would normally close. If pay in both regions stays at ${hr(L.eq.W)}, ${k(L.northJobless)} machinists are out of work in the North while ${k(L.southVacant)} posts go unfilled in the South.` },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Demand falls in one region', subtitle: 'Workshops close in the North' },
        { title: 'Workers cannot afford to move', subtitle: 'Housing in the South costs more' },
        { title: 'Unemployment beside vacancies', subtitle: 'A gap that does not close' },
      ] },
    ],
    realExample: { emoji: '🏘️', text: 'In Pakistan and Nigeria, workers from rural areas can find that rent in Karachi or Lagos would take much of what a city job pays, so posts there stay open while jobless workers stay at home.' },
    misconception: 'Students describe geographical immobility as workers being "unwilling to work". They are willing to work; they cannot get to where the work is, and the barrier is cost, family or information.',
    examMatters: '3.3.4 · 4a asks for causes AND consequences. Housing, family and information are the causes; regional unemployment, unfilled vacancies and a lasting wage gap are the consequences, and an answer needs both.',
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this causal chain in order, from the closures to the result:',
      correctOrder: [
        'Three Northern workshops close as orders go elsewhere',
        'Laid-off machinists cannot afford a flat in the growing South',
        'Unemployment in the North persists beside Southern vacancies',
      ],
      criterion: 'cause to effect: each step is caused by the one before it',
      why: [
        'The chain starts with a fall in the demand for labour in one region.',
        'The workers who lose their jobs cannot move to where demand is rising.',
        'So unemployment and unfilled posts exist at the same time: the consequence of immobility.',
      ],
    }),
  };
})();

const occupationalImmobility = (() => {
  const sid = subId('occupational-immobility');
  return {
    id: sid,
    title: 'Occupational Immobility of Labour',
    keyIdea: 'Occupational immobility is when workers cannot move into a different kind of job because they lack its skills or qualifications, so declining industries leave workers stranded.',
    body: [
      { type: 'paragraph', text: '**Occupational immobility of labour** means workers are unable to move from one type of job to another. Its causes:' },
      { type: 'bullets', items: [
        '**Skills specific to one job**: a machinist\'s skill is worth little in a software firm.',
        '**Qualifications and licences**: many jobs require a certificate that takes years to earn.',
        '**The cost and time of retraining**, which falls on people who have just lost their income — and age, which shortens the years a retrained worker has to earn it back.',
      ] },
      { type: 'paragraph', text: 'The consequences of occupational immobility: workers from a declining industry stay unemployed, or take lower-paid work that uses none of their skill, while growing industries report skill shortages and bid up pay for the few who can do the work. This is **structural unemployment**, and output is lost twice over: people who could work are idle, and work that could be done is not.' },
      { type: 'flow', resultType: 'bad', steps: [
        { title: 'Demand for one skill falls', subtitle: 'Garment orders move abroad' },
        { title: 'Workers lack the skills new jobs need', subtitle: 'Retraining takes years' },
        { title: 'Unemployment beside skill shortages', subtitle: 'Output is lost' },
      ] },
    ],
    realExample: { emoji: '🧰', text: 'As garment factories close in one region, their machinists cannot simply become the nurses, electricians or software testers that growing sectors are short of: each of those needs a qualification that takes years.' },
    misconception: 'Students treat the two kinds of immobility as one. Geographical is about place: the job exists somewhere else. Occupational is about skills: the job exists, but the worker cannot do it. One worker can face both.',
    examMatters: 'Appendix 6 says a Discuss needs a critical assessment. Here it is how long the immobility lasts: some workers retrain within a year, while older workers with narrow skills may never move.',
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each barrier into geographical or occupational immobility:',
      groups: [
        { name: 'Geographical immobility', items: ['Flats near the new factories cost twice as much', 'A partner\'s job keeps the family in the old town', 'Nobody in the village hears about the city\'s openings'], why: 'Each stops a worker moving to another PLACE where the job already exists.' },
        { name: 'Occupational immobility', items: ['A welder has no nursing certificate', 'Qualifying as an electrician takes three years', 'A miner\'s know-how is no use in a bank'], why: 'Each stops a worker moving into a different KIND of job, because of skills or qualifications.' },
      ],
    }),
  };
})();

const immobilityMarketFailure = (() => {
  const sid = subId('immobility-market-failure');
  return {
    id: sid,
    title: 'Why Immobility Is a Market Failure',
    keyIdea: 'A market fails when it allocates resources inefficiently. Immobility stops labour moving to where it is worth most, so idle workers and unfilled jobs exist side by side.',
    body: [
      { type: 'paragraph', text: 'In a working labour market, a shortage in one place or occupation raises pay there, and the higher pay draws workers in until the gap closes. **Immobility** breaks the link: the signal is sent, and the workers who would answer it cannot.' },
      { type: 'paragraph', text: 'So geographical and occupational immobility are **market failure in the labour market**: labour is not allocated to where it is most valued. The costs fall on three groups:' },
      { type: 'bullets', items: [
        '**Workers** stuck in the declining region or occupation lose income, and a long spell out of work erodes their skills further.',
        '**Firms** in the growing region or occupation cannot fill posts, so they produce less or pay far more for the few they find.',
        '**The economy** loses output it could have had, and spends on benefits for people who could be working.',
      ] },
      { type: 'paragraph', text: 'Not every difference in pay is a failure: a high wage for a scarce skill is the market doing its job. The failure is the gap that does not close because workers cannot move. What government does about it is topic 3.3.5.' },
    ],
    realExample: { emoji: '🗺️', text: 'Economies with fast-growing cities and declining rural industries, from Pakistan to Indonesia, often have high unemployment in some regions at the same time as labour shortages in others.' },
    misconception: 'Students call every wage gap a market failure, or none. The test is whether the gap would close if workers could move. If it would, immobility is the failure; if it reflects skills that take years to build, it is the market working.',
    examMatters: 'An Evaluate on labour market failure needs a justified judgement (Appendix 6). A strong one weighs how large and how lasting the immobility is: a gap that closes within a year is a friction; one that lasts a decade is a serious failure.',
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each consequence of immobility to who bears it:',
      pairs: [
        { left: 'A laid-off worker in the declining region', right: 'Loses income and, over time, skills', why: 'Unable to move, the worker stays out of work, and skills fade with disuse.' },
        { left: 'A firm in the growing region', right: 'Leaves posts empty or pays far more to fill them', why: 'The workers who would fill its vacancies cannot reach them.' },
        { left: 'The economy as a whole', right: 'Produces less and funds support for idle people', why: 'Resources that could produce are unused — the inefficiency that makes it a market failure.' },
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [derivedDemand, hiringRule, productivityAndPrice, labourOrCapital, elasticityOfDemand],
    takeaway: [
      'Labour is a derived demand: it depends on demand for the final product.',
      'Firms hire while the next worker\'s output is worth at least the wage.',
      'Productivity, the product price and the price of capital shift demand.',
    ],
  },
  {
    title: B2,
    subs: [occupationalSupply, populationAndMigration, taxAndBenefits, governmentRegulations, elasticityOfSupply],
    takeaway: [
      'A higher wage is a movement along supply; six named factors shift it.',
      'Tax and benefits act through the pay a worker keeps by working.',
      'Supply is inelastic where training is long and skills are rare.',
    ],
  },
  {
    title: B3,
    subs: [marketEquilibrium, firmAsWageTaker, demandShifts, supplyShifts, whyPayDiffers],
    takeaway: [
      'The wage settles where the numbers wanted and willing are equal.',
      'One firm is a wage-taker: its supply of labour is flat at the market wage.',
      'Demand shifts move wage and jobs together; supply shifts move them apart.',
    ],
  },
  {
    title: B4,
    subs: [unionsAndSupply, unionWage, publicSectorPay],
    takeaway: [
      'Unions raise pay by limiting entry or by bargaining for one wage.',
      'A wage above equilibrium cuts jobs unless productivity or demand rise.',
      'Public-sector pay is a decision, so it can leave shortages for years.',
    ],
  },
  {
    title: B5,
    subs: [geographicalImmobility, occupationalImmobility, immobilityMarketFailure],
    takeaway: [
      'Geographical immobility: the job exists, but somewhere else.',
      'Occupational immobility: the job exists, but needs other skills.',
      'Both leave idle workers beside unfilled jobs: a market failure.',
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
 * THE LEAF MAP, BY HAND. 17 leaves at `econ_spec.txt:1447-1479`, every one named against the
 * subsection that teaches it. The two `requirement` rows (1a, 2c) group bullets and are not leaves;
 * the runner re-reads the oracle and asserts both counts.
 */
export const LEAF_MAP = {
  'ECON-3.3.4-1a-1': ['derived-demand'],
  'ECON-3.3.4-1a-2': ['hiring-rule', 'productivity-and-price'],
  'ECON-3.3.4-1a-3': ['productivity-and-price'],
  'ECON-3.3.4-1a-4': ['labour-or-capital'],
  'ECON-3.3.4-1b': ['elasticity-of-demand'],
  'ECON-3.3.4-2c-1': ['population-and-migration'],
  'ECON-3.3.4-2c-2': ['population-and-migration'],
  'ECON-3.3.4-2c-3': ['tax-and-benefits'],
  'ECON-3.3.4-2c-4': ['tax-and-benefits'],
  'ECON-3.3.4-2c-5': ['government-regulations'],
  'ECON-3.3.4-2c-6': ['unions-and-supply', 'union-wage'],
  'ECON-3.3.4-2d': ['elasticity-of-supply'],
  'ECON-3.3.4-3a': ['market-equilibrium', 'firm-as-wage-taker', 'why-pay-differs'],
  'ECON-3.3.4-3b': ['demand-shifts', 'supply-shifts'],
  'ECON-3.3.4-3c': ['public-sector-pay'],
  'ECON-3.3.4-4a': ['geographical-immobility', 'immobility-market-failure'],
  'ECON-3.3.4-4b': ['occupational-immobility', 'immobility-market-failure'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE, so the two
 * surfaces cannot diverge — which is the whole of `structure-10`: the live Notes and Learn tabs gave
 * opposite exam advice for one subsection because they were written separately. Notes ship from the
 * `data` column, so a `?draft=1` walk shows these only after publication (DECISIONS, 16 September).
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '3.3.4 · 1a, 1b',
    keyIdea: 'Why firms want workers at all, how many they hire, the four factors that shift the demand for labour, and what makes it elastic.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Derived demand</strong> — labour is wanted for the output it produces, so the demand for it depends on the demand for the final product.'),
        def('<strong>Diminishing marginal productivity</strong> — with other inputs fixed, each extra worker adds less output than the one before.'),
        def('<strong>Elasticity of demand for labour</strong> — % change in the quantity of labour demanded ÷ % change in the wage rate.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Hiring rule: hire while what the extra worker adds to revenue ≥ wage. For a firm selling at a given price, that is extra output × price; in general, extra output × marginal revenue. ${L.firm}: at ${hr(L.eq.W)}, ${L.firmL} machinists; at ${hr(L.W2)}, ${L.firmLW2} (a movement along).`),
        mech(`Shifts: a shirt price of ${money(L.price2)}, or one more shirt an hour each, and the firm hires ${L.firmLPrice} at ${hr(L.eq.W)}.`),
        mech(`Capital: a ${hr(L.machineCost)} cutter doing ${L.machineDoes} workers' jobs is cheaper above a wage of ${hr(L.breakEvenW)}.`),
        link('Elastic where capital substitutes easily, labour is a large share of costs, product demand is elastic, and in the long run.'),
      ] },
    ],
    takeaway: [
      'Derived demand: no product demand, no labour demand.',
      'The wage moves along the curve; the four factors shift it.',
      'Four factors decide the elasticity of demand for labour.',
    ],
  },
  {
    title: B2,
    meta: '3.3.4 · 2c, 2d',
    keyIdea: 'The supply of labour to one occupation, five of the six factors that shift it, and what makes it elastic or inelastic.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Supply of labour to an occupation</strong> — the number willing and able to do the job at each wage rate.'),
        def('<strong>Net migration</strong> — immigration minus emigration.'),
        def('<strong>Elasticity of supply of labour</strong> — % change in the quantity of labour supplied ÷ % change in the wage rate.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Size of population and net migration: more people able to do the job, so supply shifts right.'),
        mech('Income tax rates and welfare benefits: both act on the pay kept by working, so higher tax or benefits can shift supply left.'),
        mech(`Government regulations: a licence ${k(-L.sReg)} cannot meet shifts supply left; the wage rises to ${hr(L.eqReg.W)}.`),
        link(`Same rise in demand: elastic supply, ${hr(L.eqD.W)} and ${k(L.eqD.L)}; inelastic supply, ${hr(L.inel.after.W)} and ${k(L.inel.after.L)}.`),
      ] },
    ],
    takeaway: [
      'A wage change is a movement along supply.',
      'Six factors shift it; trade unions are in chapter 4.',
      'Long training and rare skills make supply inelastic.',
    ],
  },
  {
    title: B3,
    meta: '3.3.4 · 3a, 3b',
    keyIdea: 'Where the wage settles in a competitive market, why one firm takes it as given, what shifts it, and why two occupations pay differently.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Labour market equilibrium</strong> — the wage at which the quantity of labour demanded equals the quantity supplied.'),
        def('<strong>Wage-taker</strong> — a firm too small to move the market wage; the supply of labour it faces is horizontal at that wage.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${L.job}: L = ${L.dA} − ${L.dB}W and L = ${L.sB}W − ${-L.sA} meet at ${hr(L.eq.W)}, ${k(L.eq.L)}.`),
        mech(`Demand +${k(L.dUp)}: ${hr(L.eqD.W)}, ${k(L.eqD.L)}. Supply +${k(L.sUp)}: ${hr(L.eqS.W)}, ${k(L.eqS.L)}. Supply −${k(-L.sReg)}: ${hr(L.eqReg.W)}, ${k(L.eqReg.L)}.`),
        link('Pay gaps from scarce skills are the market working; gaps that last because workers cannot move are a market failure.'),
      ] },
    ],
    takeaway: [
      'Demand shifts: wage and employment move together.',
      'Supply shifts: wage and employment move apart.',
      'Each occupation has its own equilibrium wage.',
    ],
  },
  {
    title: B4,
    meta: '3.3.4 · 2c, 3c',
    keyIdea: 'The two ways a trade union raises pay, what each does to employment, and how pay is set in the public sector and state-owned enterprises.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Trade union</strong> — an organisation of workers that deals with employers on its members\' behalf.'),
        def('<strong>Collective bargaining</strong> — negotiating one wage for all the workers a union covers.'),
        def('<strong>State-owned enterprise</strong> — a business owned by the government, such as a national airline or power company.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Limiting entry: supply −${k(-L.sEntry)}, wage ${hr(L.eqEntry.W)}, ${k(L.eqEntry.L)} employed.`),
        mech(`Bargaining: a floor of ${hr(L.unionW)}: ${k(L.unionJobs)} hired, ${k(L.unionWilling)} willing, a surplus of ${k(L.unionExcess)}.`),
        mech(`Public sector: nurses clear at ${hr(L.nurse.W)}; pay set at ${hr(L.nurse.set)} leaves ${k(L.nurse.vacancies)} vacancies.`),
        link('A single dominant employer is topic 3.3.3; a legal minimum wage is topic 3.3.5.'),
      ] },
    ],
    takeaway: [
      'Two routes to a higher wage: less supply, or a floor.',
      'Job losses depend on the elasticity of demand for labour.',
      'Budget, fairness and pay scales set public-sector pay.',
    ],
  },
  {
    title: B5,
    meta: '3.3.4 · 4a, 4b',
    keyIdea: 'The causes and consequences of geographical and occupational immobility, and why they are a market failure.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Geographical immobility of labour</strong> — workers unable to move to another area to take a job.'),
        def('<strong>Occupational immobility of labour</strong> — workers unable to move into a different type of job.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Geographical causes: housing costs, family ties, moving costs and lack of information.'),
        mech('Occupational causes: specific skills, qualifications and licences, the cost and time of retraining.'),
        mech(`Two regions: North ${hr(L.north.W)}, South ${hr(L.south.W)}; with pay stuck at ${hr(L.eq.W)} in both, ${k(L.northJobless)} jobless beside ${k(L.southVacant)} vacancies.`),
        link('What government can do about immobility is topic 3.3.5.'),
      ] },
    ],
    takeaway: [
      'Place or skills: two different barriers.',
      'Consequences: unemployment beside vacancies, lasting pay gaps.',
      'Labour not where it is most valued: a market failure.',
    ],
  },
];
