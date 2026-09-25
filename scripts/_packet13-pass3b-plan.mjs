/**
 * PACKET 13 — pass 3b, one item, caught by the baseline diff rather than by a person.
 *
 * Pass 3 rewrote the "Diagrams for Welfare Loss" recall so its third line taught the Unit 1 case
 * (an intervention that overshoots) instead of monopoly. The replacement asked for "social" as an
 * answer while the FIRST line of the same template prints "social optimum": the answer was readable
 * off the exercise. `fillin.leak` said so the moment the item's fingerprint changed, which is the
 * baseline doing its job — a rewritten item loses its forgiveness and has to earn it again.
 *
 * So the blank moves to a word the template does not contain, and the item gains the two to three
 * distractors `fillin.distractors` has always wanted (the engine otherwise borrows two answers from
 * elsewhere in the section, which is why 141 live recalls carry none). Both findings clear instead of
 * being re-baselined.
 */

export const PLAN = {
  'market-failure': [
    { op: 'patchSub', id: 'market-failure:sub:diagrams-welfare-loss', patch: {
      recall: {
        id: 'market-failure:sub:diagrams-welfare-loss:recall',
        type: 'fillin',
        prompt: 'Complete the chain:',
        template: [
          'Negative externality: triangle to ___ of social optimum',
          '→ Positive externality: market ___',
          '→ Tax above the external cost: output falls below the ___ quantity',
        ],
        answers: ['right', 'underproduces', 'efficient'],
        hints: ['which side of the optimum?', 'too little, or too much?', 'the quantity that maximises welfare'],
        distractors: ['left', 'overproduces', 'private'],
      },
    } },
  ],
};

export const MUST_NOT_SURVIVE = ['the ___ optimum'];
