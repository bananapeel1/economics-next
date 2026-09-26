/**
 * Minimum wage in a competitive labour market. Edexcel IAL Economics, WEC13 (Unit 3), spec 3.3.5.
 * "Draw" carries 4 marks in Economics; this drill marks three of them (see WHY NO AREA).
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13). This drill shades nothing, so it uses neither.
 *
 * WHY 3.3.5, so nobody moves it. The specification names the minimum wage in exactly one place:
 * 3.3.5 topic 2b, "Types of government intervention in labour markets and their effects", which
 * lists "minimum wage controls" (econ_spec.txt:1526-1530). 3.3.4 Labour markets is the tempting
 * alternative — it holds "Labour market equilibrium" and the equilibrium wage rate and quantity of
 * labour (:1467-1471) — but no intervention appears under it, and `checkSpecCitation` refuses
 * 3.3.4 with this specTerm. 1.3.6's "maximum and minimum (guaranteed) prices" (:809) is a PRODUCT
 * market control in Unit 1, not a wage. Learn Mode teaches this diagram in 3.3.5's chapter "Wage
 * Controls in Labour Markets" (live, 26 Sep), which is where `placeWith` sends it.
 *
 * WHY NO AREA. The `minWage` family exists (regions.mjs) and would shade a welfare-loss triangle
 * between labour demand and supply. This drill deliberately does not use it. What the section
 * itself tells students to draw is "the floor above equilibrium, and mark the quantity hired and
 * the quantity willing" (the chapter's exam tip), and the gap it teaches is the surplus of labour,
 * not an area. Whether an IAL mark scheme awards a mark for a welfare-loss triangle on a minimum-
 * wage diagram is a claim nobody has checked against a mark scheme, so the drill marks the shift
 * and employment (three marks) and names the gap in feedback. With the family attached, the
 * component would also draw a "Welfare loss" region once the drill is marked (showRegions is on
 * whenever there is a result), so the family is left off entirely and `point`/`origin` are stated.
 * Adding M4 later is one line — `regions: 'minWage'`, `expect.regions: ['dwl']` — once the founder
 * has a mark scheme that awards it.
 *
 * WHAT THE DIAGRAM ASSUMES. A COMPETITIVE labour market: many hotels hiring cleaners. The prompt
 * says so because the same chapter teaches the exception — one dominant employer, where a floor
 * can raise employment — and the diagram here would be wrong for it. The wage line starts AT the
 * equilibrium wage, where a floor does nothing yet; the student decides which way it goes.
 * The wage is a DAILY rate so the canvas has the same proportions as max-price (0-120 by 0-160,
 * nudge $5): an hourly axis to $20 would need a $1 nudge, and the "you marked the old quantity"
 * band is one nudge wide in quantity units, so it would shrink to about four pixels.
 *
 * WHAT IS DRILLED. Three decisions students get wrong: moving labour demand or supply instead of
 * the wage line; setting the floor below equilibrium, where it does not bind; and reading
 * employment off labour SUPPLY (how many want the work) instead of labour DEMAND (how many firms
 * hire) — the gap between the two is the excess supply of labour.
 */
const spec = {
  id: 'min-wage',
  subject: 'economics',
  unit: 'WEC13',
  specCode: '3.3.5',
  specTerm: 'minimum wage controls',
  title: 'Minimum wage in a competitive labour market',
  topic: 'Government Intervention',
  // lib/diagram-pool.js places a derived drill after the chapter whose title shares a word with the
  // spec's. The title already shares "wage", "labour" and "market" with the teaching chapter; this
  // adds "controls" so the match does not rest on the title alone (checked against the live
  // government-intervention-firms section, 26 Sep: chapter 5 of 6, diagram "Wage Controls").
  placeWith: ['Wage controls in labour markets'],
  prompt:
    'Many hotels in a large city compete to hire cleaners. The government sets a **minimum wage of $100 a day**, above the market wage. Show the effect on the labour market and mark how many cleaners are employed.',

  axes: {
    x: { label: 'Quantity of labour (000 cleaners)', short: 'quantity of labour', max: 120 },
    y: { label: 'Wage rate ($ per day)', short: 'wage rate', max: 160 },
  },
  curves: {
    D: { intercept: 140, slope: -1, label: 'DL', name: 'Demand for labour curve' },
    S: { intercept: 20, slope: 1, label: 'SL', name: 'Supply of labour curve' },
    Wmin: {
      intercept: 80, slope: 0,
      label: 'Wmin', name: 'Minimum wage line', role: 'policy',
      shiftedLabel: 'Wmin', ghost: 'none',
    },
  },
  // Employment is where the wage line meets labour DEMAND; the original position is the market
  // equilibrium. Stated because there is no region family to supply them (see WHY NO AREA).
  point: { cross: ['Wmin', 'D'] },
  origin: { cross: ['D', 'S'] },
  expect: { curve: 'Wmin', direction: 'up', size: 20 },
  tolerance: { q: 4, p: 6 },
  glyphs: { p: 'W', q: 'Q', p2: 'Wmin', q2: 'Qd' },

  steps: {
    shift: {
      name: 'Set the minimum wage',
      prompt: 'Move the line the government controls to where it sets it. On a phone, tap it, use the arrows below, then Next.',
    },
    point: {
      name: 'Mark employment',
      prompt: 'Tap the point that shows how many cleaners are employed. It snaps if you are close enough.',
    },
  },
  criteria: { M1: 'Correct line moved', M2: 'Set above equilibrium', M3: 'Employment identified' },

  // Where the wage line meets labour SUPPLY: how many want the work, not how many are hired.
  distractors: [
    {
      cross: ['Wmin', 'S'],
      feedback:
        'That is the quantity of labour SUPPLIED at the minimum wage: how many cleaners want the work. Hotels hire only as many as they demand at that wage, Qd. The gap between the two is the excess supply of labour — unemployment.',
    },
  ],

  feedback: {
    rightCurve:
      'The wage line moves. A minimum wage is a legal floor on what employers may pay; it does not change how many cleaners hotels want at each wage, or how many want to work, so DL and SL stay where they are.',
    wrongCurve:
      'You moved labour demand or labour supply. A minimum wage is a legal floor on the wage, not a change in either — move the wage line and leave DL and SL alone.',
    bothMoved: 'More than one line moved. Only the minimum wage line moves: a wage control leaves labour demand and labour supply unchanged.',
    nothingMoved: 'Nothing moved. The minimum wage is the horizontal line; set it where the government does.',
    wrongDirection:
      'You lowered the wage line below the equilibrium. A minimum wage set below the market wage does not bind — hotels already pay W₁, and employment stays at Q₁. It only has an effect above equilibrium.',
    rightDirection: 'Up, above the equilibrium wage: a minimum wage only bites when it is set above the market wage.',
    noPoint: 'No point marked. Mark how many cleaners are employed at the minimum wage.',
    equilibriumAtOldQuantity:
      'That is the original employment, Q₁. A minimum wage above the market wage moves hotels up their demand for labour curve: they hire fewer cleaners, so employment falls below Q₁.',
    equilibriumWrong:
      'Not where the minimum wage line meets labour demand. With the wage held above equilibrium, employment is the number of cleaners hotels are willing to hire at that wage.',
  },
};

export default spec;
