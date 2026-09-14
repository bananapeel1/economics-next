/**
 * PACKET 13, F081 — near-duplicate and identical quiz stems, within sections.
 *
 * The audit found a bank of 25 questions per section that behaves like 18 to 20, because the same
 * thing is asked two or three times, and two pairs where the SAME stem carries two different
 * correct answers. In Quick Fire and in a single-topic Smart Practice session the student meets
 * what feels like the same question again, and in the GDP pair the "same" question has two right
 * answers, which reads as an error because it is one.
 *
 * WHAT COUNTS AS A DUPLICATE HERE. A token-overlap score alone does not: almost every MCQ stem in
 * this bank opens "Which of the following…", so a threshold of 0.5 flags 44 pairs of which 25 are
 * two different questions sharing a frame. Each pair below was read. A pair is a duplicate when a
 * student who can answer one can answer the other without knowing anything more — the drought that
 * shifts wheat supply left, asked twice; Herzberg's hygiene factors with the same four options. The
 * 25 that merely share a frame are left alone, and the `quiz.near-dup` rule keeps reporting them as
 * DEBT, which is the honest state: the rule is lexical and the judgement is not.
 *
 * The second of each pair is rewritten to test a different angle on the same specification bullet,
 * so the bank gets wider rather than shorter. Option lengths stay inside the 1.5x band so the
 * longest option is not the answer key.
 */

export const PLAN = {
  /* economics 1.3.1 */
  'introductory-concepts': [
    // Duplicate of quiz:d552e630, which already asks for the normative statement. This one asks for
    // the other half of 1.3.1.2a, and drops a UK-only institution on the way.
    { op: 'patchQuiz', id: 'introductory-concepts:quiz:9912af07', patch: {
      question: 'Which of the following is a positive economic statement?',
            options: [
        'Inequality in this country is unacceptably high',
        'The government ought to spend more on healthcare',
        'Fuel taxes should be cut to help poorer households',
        'A rise in interest rates tends to reduce consumer borrowing',
      ],
      correctIndex: 3,
      explanation: 'A positive statement claims what is, and evidence can settle it: borrowing after a rate rise is measurable. The other three each turn on a value judgement — "ought", "unacceptably", "should" — which no data can decide.',
    } },
    // Duplicate of quiz:488bdffc, which already asks where more capital goods lead. Inward shifts
    // are the untested direction of 1.3.1.3.
    { op: 'patchQuiz', id: 'introductory-concepts:quiz:19bc8985', patch: {
      question: "Which of the following would shift an economy's PPF inward?",
            options: [
        'An earthquake that destroys part of the capital stock',
        'A new technique that raises output per worker',
        'Moving production from consumer goods to capital goods',
        'Reallocating workers from farming to manufacturing',
      ],
      correctIndex: 0,
      explanation: 'The frontier moves inward only when the quantity or quality of resources falls, and destroyed capital is exactly that. Moving along the frontier, or between industries, changes what is produced rather than what could be produced.',
    } },
  ],

  /* economics 1.3.3 */
  supply: [
    // Duplicate of quiz:8e3e5b45 — the same drought shifting the same wheat supply curve left.
    { op: 'patchQuiz', id: 'supply:quiz:4c1f8555', patch: {
      question: 'The price of wheat rises, with nothing else changing. For wheat farmers this causes:',
            options: [
        'A shift of the whole supply curve to the right',
        'A shift of the whole supply curve to the left',
        'A movement along the supply curve, with no shift',
        'No change in either quantity supplied or supply',
      ],
      correctIndex: 2,
      explanation: 'Supply describes the whole relationship between price and quantity. A change in the price of the good itself moves the market along the existing curve, which is an extension of supply; only a change in something else, such as costs or technology, shifts the curve.',
    } },
    // Duplicate of quiz:790af0cb — the same fixed-capacity stadium.
    { op: 'patchQuiz', id: 'supply:quiz:229a3a31', patch: {
      question: 'Price rises from $10 to $12 and quantity supplied rises from 200 to 230 units. PES is:',
            options: [
        '0.5, inelastic',
        '0.75, inelastic',
        '1.33, elastic',
        '2.0, elastic',
      ],
      correctIndex: 1,
      explanation: 'Quantity supplied rises 30 on 200, which is 15%. Price rises 2 on 10, which is 20%. PES is 15 divided by 20, or 0.75. Because that is below 1, supply is price inelastic over this range: the quantity responds proportionally less than the price.',
    } },
    // Duplicate of quiz:a9467b4b — spare capacity and stocks, twice. The long-run/short-run angle
    // is already taken by the fresh-fish question, so this asks about a subsidy, which 1.3.3 lists
    // as a supply determinant and the section never tests.
    { op: 'patchQuiz', id: 'supply:quiz:f8d38b28', patch: {
      question: 'A government pays wheat producers a subsidy of $2 per unit. The supply curve will:',
      options: [
        'Shift left, because the market is distorted',
        'Become vertical at the subsidised quantity',
        'Stay where it is until the market price changes',
        'Shift right, by $2 vertically downwards at each quantity',
      ],
      correctIndex: 3,
      explanation: 'A subsidy lowers what it costs a producer to supply each unit, so at any given market price they will offer more. The whole curve moves right, and the vertical gap between the old and new curve is the size of the subsidy. Nothing here changes the price of wheat itself, so this is a shift rather than a movement along the curve.',
    } },
  ],

  /* economics 1.3.5 */
  'market-failure': [
    // Duplicate of quiz:1959f579 — the free-rider problem, defined twice. Non-rivalry is the other
    // half of 1.3.5.3a and is only ever tested alongside it.
    { op: 'patchQuiz', id: 'market-failure:quiz:debbb003', patch: {
      question: 'A good is non-rival if:',
            options: [
        'One person consuming it leaves no less for anyone else',
        'Nobody can be prevented from consuming it',
        'It is provided free of charge by the government',
        'Its price is set below the market equilibrium',
      ],
      correctIndex: 0,
      explanation: 'Non-rivalry is about whether consumption uses the good up: a lighthouse beam guiding one ship is not diminished for the next. Being unable to exclude non-payers is the other characteristic of a public good, and it is a separate test. Who provides a good, and at what price, decides neither.',
    } },
    // Duplicate of quiz:ef8fa174 — the same welfare-loss area on the same diagram. The positive
    // side of 1.3.5.2d is never tested.
    { op: 'patchQuiz', id: 'market-failure:quiz:9204ab21', patch: {
      question: 'On a positive consumption externality diagram, the welfare gain from reaching the social optimum is the area between:',
            options: [
        'The MPC and MSC curves, from 0 to Qm',
        'The MSB and MPB curves, at every output',
        'The MSB and MPC curves, from Qm to Qopt',
        'The MPB and MPC curves, from 0 to Qopt',
      ],
      correctIndex: 2,
      explanation: 'The market stops at Qm, where private benefit meets cost. Every unit from Qm to Qopt is worth more to society (MSB) than it costs to supply (MPC), so the triangle between those two curves over that range is the welfare the market leaves on the table.',
    } },
    // Duplicate of quiz:c2b565f0 — "which is a negative consumption externality", twice. Asked as
    // a policy case instead, which is how the paper sets it.
    { op: 'patchQuiz', id: 'market-failure:quiz:b28b8a7f', patch: {
      question: 'A city introduces a charge for driving into its centre at peak times. Which market failure is the charge aimed at?',
            options: [
        'An external benefit of consumption',
        'The free-rider problem',
        'Asymmetric information',
        'An external cost of consumption',
      ],
      correctIndex: 3,
      explanation: 'Each driver weighs their own journey against its cost to them, and none of them counts the congestion and poorer air they impose on everyone else. That is an external cost of consumption, and a charge makes the driver face it.',
    } },
    // These three are this packet's own rewrites; their stems shared a frame. Same questions,
    // varied openings, so the bank does not read as one question asked three ways.
    { op: 'patchQuiz', id: 'market-failure:quiz:8151d4af', patch: {
      question: 'In a free market, why do too few young people stay in education?',
    } },
    { op: 'patchQuiz', id: 'market-failure:quiz:e09aa14c', patch: {
      question: 'Where an external cost of consumption exists, the free market will leave the good:',
    } },
  ],

  /* economics 1.3.6 */
  'government-intervention': [
    // Duplicate of quiz:4669d10a — the same maximum price. Minimum prices are a separate bullet.
    { op: 'patchQuiz', id: 'government-intervention:quiz:33fc6273', patch: {
      question: 'A government guarantees farmers a price above the market equilibrium. The result is:',
            options: [
        'Excess demand and queues for the good',
        'A fall in the price paid by consumers',
        'Excess supply, which the government may have to buy up',
        'No change, because the market clears anyway',
      ],
      correctIndex: 2,
      explanation: 'Above the equilibrium, more is offered than is wanted at that price, and the price is not allowed to fall to clear it. The surplus persists, and a government supporting the price usually has to buy or store it, which is where the cost of the policy shows up.',
    } },
    // IDENTICAL stem to quiz:6baa2355, with a different correct answer. Both examples are sound;
    // the defect is asking the same question twice, so this one asks when failure arises.
    { op: 'patchQuiz', id: 'government-intervention:quiz:6baa2355-2', patch: {
      question: 'Government failure is most likely to arise when:',
            options: [
        'An intervention corrects an external cost exactly',
        'The market was already allocatively efficient',
        'Consumers respond to a subsidy as predicted',
        'The information needed to set the policy is incomplete',
      ],
      correctIndex: 3,
      explanation: 'Setting a tax or subsidy at the right level requires knowing the size of the external cost or benefit, which is rarely measurable with any precision. Set it wrong and the intervention moves output away from the social optimum instead of towards it, leaving a net welfare loss.',
    } },
  ],

  /* economics 2.3.1 */
  'measures-economic-performance': [
    // IDENTICAL stem to quiz:99504b1c, with a different correct answer. Both exclusions are real;
    // the defect is the repeat. Real versus nominal is the bullet the section never tests.
    { op: 'patchQuiz', id: 'measures-economic-performance:quiz:99504b1c-2', patch: {
      question: 'Nominal GDP rises by 6% over a year while the price level rises by 4%. Real GDP has:',
            options: [
        'Fallen by about 2%',
        'Stayed the same',
        'Risen by about 2%',
        'Risen by about 10%',
      ],
      correctIndex: 2,
      explanation: 'Real GDP strips inflation out of the nominal figure, so the approximate real growth rate is the nominal rate minus the inflation rate: 6% less 4% is about 2%. Adding the two would double-count the price rise the calculation is meant to remove.',
    } },
  ],

  /* economics 2.3.2 */
  'aggregate-demand': [
    // Duplicate of quiz:b43ce4b9 — the same multiplier from the same formula, with 0.8 for 0.6.
    // The withdrawals form is the one the specification states (2.3.4.4c).
    { op: 'patchQuiz', id: 'aggregate-demand:quiz:b214e623', patch: {
      question: 'In an economy where MPS is 0.1, MPT is 0.2 and MPM is 0.1, the multiplier is:',
            options: [
        '1.25',
        '2.5',
        '4',
        '10',
      ],
      correctIndex: 1,
      explanation: 'The marginal propensity to withdraw is the three leakages added together: 0.1 plus 0.2 plus 0.1 is 0.4. The multiplier is 1 divided by MPW, so 1 divided by 0.4 is 2.5. Using only the saving leakage would give 10 and overstate the effect badly.',
    } },
    // Duplicate of quiz:3667396c — a leftward AD shift, twice.
    { op: 'patchQuiz', id: 'aggregate-demand:quiz:7261ebac', patch: {
      question: 'A government cuts the basic rate of income tax. Aggregate demand will most likely:',
            options: [
        'Rise, because households have more disposable income to spend',
        'Fall, because government revenue drops',
        'Stay the same, because tax is a transfer, not spending',
        'Fall, because saving always rises by the full amount',
      ],
      correctIndex: 0,
      explanation: 'A lower income tax rate leaves households with more disposable income, so consumption rises at every price level and the curve shifts right. Part of the cut is saved rather than spent, which is why the shift is smaller than the tax cut itself, but it is not zero.',
    } },
  ],

  /* economics 2.3.3 */
  'aggregate-supply': [
    // Duplicate of quiz:cd7d63fb — both answered "investment in education and training".
    { op: 'patchQuiz', id: 'aggregate-supply:quiz:39111b6b', patch: {
      question: 'World oil prices fall sharply. In the short run this will most likely:',
            options: [
        'Shift SRAS left, as costs rise across the economy',
        'Shift LRAS left, as productive capacity falls',
        'Shift SRAS right, as costs fall across the economy',
        'Leave both curves where they are',
      ],
      correctIndex: 2,
      explanation: 'Oil is an input to transport and manufacturing almost everywhere, so a fall in its price lowers costs at every price level and firms supply more: SRAS shifts right. Productive capacity itself is unchanged, so LRAS does not move.',
    } },
  ],

  /* business 1.3.5 */
  'entrepreneurs-leaders': [
    // Duplicate of quiz:63481e3a — the same forgone-interest calculation in a different currency.
    { op: 'patchQuiz', id: 'entrepreneurs-leaders:quiz:219fb519', patch: {
      question: 'A founder turns down a salaried job paying $40,000 to run their own business, which earns $15,000 in its first year. The opportunity cost of that year is:',
            options: [
        '$15,000, the money the business earned',
        '$25,000, the difference between the two',
        'Zero, because the business made a profit',
        '$40,000, the salary given up',
      ],
      correctIndex: 3,
      explanation: 'Opportunity cost is the value of the next best alternative given up, which is the whole salary of $40,000. The $25,000 gap is how much worse off the founder is, which is a different quantity and not what the term means.',
    } },
  ],

  /* business 2.3.4 */
  'managing-finance': [
    // Duplicate of quiz:5c6d47f1 — the working capital formula, asked twice. Interpretation is the
    // skill the specification asks for (2b, "interpret ratios to make business decisions").
    { op: 'patchQuiz', id: 'managing-finance:quiz:975fcf9c', patch: {
      question: "A firm's working capital turns negative. The most immediate risk is that it:",
            options: [
        'Cannot pay its bills as they fall due',
        'Becomes less profitable over the next year',
        'Loses market share to its competitors',
        'Pays too much corporation tax this year',
      ],
      correctIndex: 0,
      explanation: 'Negative working capital means current liabilities exceed current assets, so what is owed within the year is larger than what can be turned into cash within it. That is a liquidity problem, and it can sink a firm that is trading profitably.',
    } },
    // Duplicate of quiz:becb3a55 — the same acid test calculation in a different currency.
    { op: 'patchQuiz', id: 'managing-finance:quiz:81445edd', patch: {
      question: "A firm's acid test ratio is 0.6:1. This suggests that the firm:",
            options: [
        'Holds too much cash relative to its liabilities',
        'Is highly geared and dependent on borrowing',
        'May struggle to meet short-term debts without selling stock',
        'Earns a low margin on each unit it sells',
      ],
      correctIndex: 2,
      explanation: 'The acid test strips inventory out of current assets, so 0.6:1 means the firm holds 60 cents of readily available assets for every dollar due within the year. It is not insolvent, but meeting those debts depends on shifting stock, which takes time it may not have.',
    } },
  ],

  /* business 1.3.4 */
  'managing-people': [
    // IDENTICAL stem AND identical options to quiz:b999ae41. Motivators are the other half of the
    // same theory and were never tested.
    { op: 'patchQuiz', id: 'managing-people:quiz:8287cc2a', patch: {
      question: 'Herzberg argued that lasting job satisfaction comes mainly from:',
            options: [
        'Company policy and administration',
        'Salary and fringe benefits',
        'Supervision and working conditions',
        'Responsibility and recognition for the work itself',
      ],
      correctIndex: 3,
      explanation: 'Herzberg separated the two sets. Satisfaction comes from the work itself: achievement, recognition, responsibility, advancement. The other three are hygiene factors, which cause dissatisfaction when they are poor but do not motivate when they are put right.',
    } },
  ],

  /* business 2.3.1 */
  'planning-raising-finance': [
    // Duplicate of quiz:6a7bb3cd — "which is internal finance", twice, with the same answer.
    { op: 'patchQuiz', id: 'planning-raising-finance:quiz:1c3624e3', patch: {
      question: 'A drawback of funding expansion from retained profit is that:',
            options: [
        'It reduces the funds available to distribute to owners',
        'It must be repaid with interest over a fixed term',
        'It dilutes the ownership stake of existing shareholders',
        "It requires a charge over the firm's fixed assets",
      ],
      correctIndex: 0,
      explanation: 'Retained profit costs no interest and dilutes nobody, which is why firms reach for it first. What it does cost is the dividend the owners could have had, and a firm that retains too much for too long may find its investors leaving. The other three describe loans and share issues.',
    } },
  ],
};
