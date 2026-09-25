/**
 * PACKET 13 — the plan. Read this file to know exactly what the strip does and why.
 * The runner is scripts/packet-13-off-spec-strip.mjs; the op engine is scripts/_content-ops.mjs.
 *
 * Every removal is a claim that the Edexcel IAL specification does not contain the material,
 * checked against audit/raw/spec-items.json, which is parsed from the specification text with a
 * source line on every row. The harm being removed is a student spending revision time on
 * something the paper cannot ask them about. The September audit found the notes read as adapted
 * from the UK GCE A-level rather than built from the IAL specification; this is that difference,
 * made concrete.
 *
 * Item ids are never rewritten. A subsection id keeps its legacy wording after its title changes,
 * because the id is what a student's progress row points at.
 *
 * A note on the second-order edits. Rewriting a sentence retires its finding keys, so this packet
 * inherits every defect sitting on a sentence it touches (packet 3's rule). That is why the plan
 * also rebalances option lengths, corrects three command words that do not exist in IAL Economics,
 * replaces four UK-only institutions, turns unsourced claims about examiner behaviour into direct
 * instructions, and writes two recalls. None of that is scope creep: it is the cost of touching the
 * text, and it is the mechanism by which the baseline shrinks instead of moving sideways.
 */

/* ── substitutions ─────────────────────────────────────────────────────────── */

/**
 * Targeted repairs that must run BEFORE the vocabulary swaps, because each sentence carries both a
 * UK-only institution and an off-spec term and the swap would otherwise re-key it with the
 * institution still in place.
 */
const DE_UK = [
  [/the NHS is a merit good, not a public good/g, 'a state hospital is excludable and rival, so it is not a public good'],
  [/like state education and NHS healthcare/g, 'like state education and public healthcare'],
  [/spending tobacco tax revenue on the NHS/g, 'spending tobacco tax revenue on public health services'],
  [/Regulators like the CMA must weigh/g, 'Competition regulators must weigh'],
  [/The NHS provides healthcare free at the point of use — a classic merit good intervention\./g,
    "**Thailand's Universal Coverage Scheme** provides healthcare at the point of use for a nominal fee, funded from general taxation."],
];

/** The specification never says "deadweight". It says "welfare loss or gain areas" (1.3.5.2d). */
const WELFARE_LOSS = [
  [/Deadweight loss is the welfare nobody receives/g, 'Welfare loss is the surplus nobody receives'],
  [/Deadweight loss triangle — welfare lost to nobody/g, 'Welfare loss triangle — surplus lost to nobody'],
  [/a triangle of welfare that nobody receives/g, 'a triangle of surplus that nobody receives'],
  [/ \(deadweight loss\)/gi, ''],
  [/welfare loss or deadweight loss/gi, 'welfare loss'],
  [/deadweight \(welfare\) loss/gi, 'welfare loss'],
  [/deadweight welfare losses/gi, 'welfare losses'],
  [/deadweight welfare loss/gi, 'welfare loss'],
  [/Deadweight loss \(DWL\)/g, 'Welfare loss'],
  [/deadweight loss \(DWL\)/g, 'welfare loss'],
  [/Welfare Loss & Deadweight Loss/g, 'Welfare Loss'],
  [/Allocative Inefficiency and Deadweight Loss/g, 'Allocative Inefficiency and Welfare Loss'],
  [/Deadweight Losses/g, 'Welfare Losses'],
  [/Deadweight Loss/g, 'Welfare Loss'],
  [/Deadweight losses/g, 'Welfare losses'],
  [/Deadweight loss/g, 'Welfare loss'],
  [/deadweight losses/g, 'welfare losses'],
  [/deadweight loss/g, 'welfare loss'],
  [/Deadweight/g, 'Welfare loss'],
  [/deadweight/g, 'welfare loss'],
];

/** The specification's category for what the UK GCE calls a merit or demerit good. */
const SPEC_VOCAB = [
  // Sentence case is the common form in prose and was missed on the first pass, which left 11
  // mentions standing in three sections. Ordered longest-first so the phrases win over the words.
  [/\bMerit good intervention\b/g, 'Intervention of this kind'],
  [/\bmerit good intervention\b/g, 'intervention of this kind'],
  [/\bMerit goods\b/g, 'Goods with external benefits'],
  [/\bDemerit goods\b/g, 'Goods with external costs'],
  [/\bMerit good\b/g, 'A good with external benefits of consumption'],
  [/\bDemerit good\b/g, 'A good with external costs of consumption'],
  [/\bMerit Goods & Demerit Goods\b/g, 'External Benefits and Costs of Consumption'],
  [/\bMerit Goods and Redistribution\b/g, 'External Benefits and Redistribution'],
  [/\bMerit & Demerit Goods\b/g, 'External Benefits and Costs of Consumption'],
  [/\bMerit Goods\b/g, 'Goods with External Benefits'],
  [/\bDemerit Goods\b/g, 'Goods with External Costs'],
  [/\bmerit and demerit goods\b/g, 'goods with external benefits and external costs'],
  [/\bmerit goods\b/g, 'goods with external benefits'],
  [/\bdemerit goods\b/g, 'goods with external costs'],
  [/\ba merit good\b/g, 'a good with external benefits of consumption'],
  [/\ba demerit good\b/g, 'a good with external costs of consumption'],
  [/\bmerit good\b/g, 'good with external benefits of consumption'],
  [/\bdemerit good\b/g, 'good with external costs of consumption'],
];

/**
 * An unsourced claim about what examiners do is a claim a student cannot check and this project
 * cannot support (`claim.uncited`, 384 live sentences, none cited). Where the sentence is really
 * advice about technique, saying so directly is both honest and more useful. Where a real citation
 * exists, a content packet can add one; inventing one to satisfy the rule would be worse than the
 * claim.
 */
const DIRECT_INSTRUCTION = [
  [/\bExaminers expect you to\b/g, 'You should'],
  [/\bexaminers expect you to\b/g, 'you should'],
  [/\bExaminers want you to\b/g, 'You should'],
  [/\bexaminers want you to\b/g, 'you should'],
  [/\bExaminers award marks specifically for\b/g, 'Marks turn specifically on'],
  [/\bexaminers award marks specifically for\b/g, 'marks turn specifically on'],
  [/\bExaminers award marks for\b/g, 'Marks are earned by'],
  [/\bexaminers award marks for\b/g, 'marks are earned by'],
  [/\bExaminers expect\b/g, 'A full answer needs'],
  [/\bexaminers expect\b/g, 'a full answer needs'],
  [/\bExaminers want\b/g, 'A full answer needs'],
  [/\bexaminers want\b/g, 'a full answer needs'],
  [/\bExaminers reward\b/g, 'Marks follow'],
  [/\bexaminers reward\b/g, 'marks follow'],
  [/\bExaminers look for\b/g, 'A full answer shows'],
  [/\bexaminers look for\b/g, 'a full answer shows'],
];

const VOCAB_AND_CLAIMS = [...DE_UK, ...SPEC_VOCAB, ...WELFARE_LOSS, ...DIRECT_INSTRUCTION];

/* ── the plan ──────────────────────────────────────────────────────────────── */

export const PLAN = {
  /* economics 1.3.5 — Market failure. Six sub-topics: sources; positive and negative externalities;
     public goods; imperfect information; moral hazard; speculation and market bubbles. No merit
     goods, no monopoly. */
  'market-failure': [
    { op: 'deleteBlock', title: 'Merit Goods & Demerit Goods',
      why: '"merit" appears 0 times in the IAL Economics spec, and the block duplicates Externalities (1.3.5.2c/d) and Information Failures (1.3.5.4b), which already teach it in the spec\'s own words' },
    { op: 'deleteBlock', title: 'Market Power as Market Failure',
      why: 'monopoly is 3.3.3.6, a different unit and paper; market-structures-contestability teaches it' },
    { op: 'deleteQuiz', ids: ['market-failure:quiz:c86a9015'], why: 'tests monopoly welfare loss, now a Unit 3 topic only' },
    { op: 'deleteDiagram', title: 'Merit & Demerit Goods',
      why: 'its SVG labels are the off-spec terms; 1.3.5.2d is already served by the two externality diagrams' },
    { op: 'deleteNote', title: 'Merit & Demerit Goods', why: 'the block it summarised is gone' },
    { op: 'deleteNote', title: 'Market Power', why: 'the block it summarised is gone' },
    { op: 'deleteExtra', key: 'evaluation', match: /merit and demerit goods is value-laden/i,
      why: 'evaluates a distinction the specification does not draw' },
    { op: 'deleteMistake', match: /Confusing merit goods with public goods/i,
      why: 'warns against confusing two terms, only one of which the specification uses' },

    // The four questions that tested the off-spec label, re-asked in the specification's own words.
    // Option lengths are kept within the 1.5x band so the longest option is not the answer key.
    { op: 'patchQuiz', id: 'market-failure:quiz:4e87ef91', patch: {
      question: 'A good generating external benefits of consumption is underconsumed in a free market because:',
      options: [
        'Its external costs exceed its external benefits',
        'Consumers count only their own benefit, so MSB exceeds MPB',
        'The government regulates and taxes its supply',
        'A single firm controls its supply and restricts output',
      ],
      correctIndex: 1,
      explanation: 'The consumer weighs the benefit to themselves against the price, and the benefit falling on third parties is counted by nobody. Marginal social benefit therefore lies above marginal private benefit, and the market settles below the social optimum. Option A reverses the sign. Option C describes an intervention, not the cause. Option D is market power, a Unit 3 topic.',
    } },
    { op: 'patchQuiz', id: 'market-failure:quiz:8151d4af', patch: {
      question: 'Education is underconsumed in a free market because:',
      options: [
        'It is non-rival and non-excludable in consumption',
        'It generates external costs that harm third parties',
        'Learners undervalue their own gain, and gains to others go uncounted',
        'It is always provided free of charge by the government',
      ],
      correctIndex: 2,
      explanation: 'A learner weighs a gain that an information gap leads them to underestimate, and counts none of the external benefit to others through higher productivity and lower crime. MSB lies above MPB. Option A describes a public good; education is both rival and excludable, since a place can be filled and withheld.',
    } },
    { op: 'patchQuiz', id: 'market-failure:quiz:bdc513b2', patch: {
      question: 'Which of these is most likely to be underconsumed because of external benefits of consumption?',
      options: [
        'Designer handbags bought for personal status',
        'Vaccination against an infectious disease',
        'National defence funded from general taxation',
        'Street lighting on a residential road',
      ],
      correctIndex: 1,
      explanation: 'Vaccination protects the person vaccinated and also lowers the chance that others are infected, so MSB lies above MPB and the free market provides too little. National defence and street lighting are public goods, which fail for non-excludability rather than for an external benefit. A handbag confers no third-party benefit.',
    } },
    { op: 'patchQuiz', id: 'market-failure:quiz:e09aa14c', patch: {
      question: 'A good generating external costs of consumption is:',
      options: [
        'Non-rival and non-excludable in consumption',
        'Overconsumed, because the consumer bears none of that cost',
        'Consumed only by high-income groups in practice',
        'Underproduced by the free market',
      ],
      correctIndex: 1,
      explanation: 'The consumer weighs their private benefit against the price and bears none of the cost falling on third parties, so MSB lies below MPB and the market quantity exceeds the social optimum. Option A describes a public good. Option D reverses the direction.',
    } },
    // "A demerit good" was a distractor here; replaced with one from the same sub-topic.
    { op: 'patchQuiz', id: 'market-failure:quiz:89b287ec', patch: {
      options: [
        'A positive externality of production',
        'A negative externality of consumption',
        'A negative externality of production',
        'An information gap between buyer and seller',
      ],
    } },
    // Pre-existing length tell on a question the welfare-loss rename touches.
    { op: 'patchQuiz', id: 'market-failure:quiz:9204ab21', patch: {
      options: [
        'The triangle between MSC and MSB, from the social optimum to the market quantity',
        'The entire area beneath the MSC curve up to market output',
        'The area between the MSB and MPB curves at every output',
        'The total revenue the producer earns at market output',
      ],
      correctIndex: 0,
    } },
    // Analyse carries 6 marks in IAL Economics, not 10 (Appendix 6; audit/raw/tariff-census.json).
    { op: 'patchPractice', id: 'market-failure:practice:10b5bb6d', patch: {
      question: 'Analyse how external costs of consumption lead to a misallocation of resources. (6 marks)',
      command: 'Analyse',
      marks: 6,
      guidance: 'Define an external cost of consumption as a cost falling on a third party that the consumer does not bear. Then develop one chain: the consumer weighs private benefit against price, so MSB lies below MPB; the market settles where MPB meets supply, above the social optimum where MSB meets MSC; the excess output is the misallocation, and the welfare loss is the area between MSB and MSC across it. A diagram showing MPB, MSB and both equilibria supports the chain. Apply it to a named market such as tobacco or private road transport.',
    } },
    // "Outline" does not exist in IAL Economics; Explain carries 4 marks.
    { op: 'patchPractice', id: 'market-failure:practice:fac7d77b', patch: {
      question: 'Explain two examples of information failure in markets. (4 marks)',
      command: 'Explain',
      marks: 4,
    } },
    { op: 'patchFlashcard', match: /^What is a merit good\?$/, patch: {
      front: 'What is an external benefit of consumption?',
      back: 'A benefit from consuming a good that falls on a <strong>third party</strong>, not on the consumer. Because the consumer counts only their own gain, <strong>MSB &gt; MPB</strong> and the good is <strong>underconsumed</strong>. E.g. vaccination, education.',
    } },
    { op: 'patchFlashcard', match: /^What is a demerit good\?$/, patch: {
      front: 'What is an external cost of consumption?',
      back: 'A cost of consuming a good that falls on a <strong>third party</strong>, not on the consumer. Because the consumer bears none of it, <strong>MSB &lt; MPB</strong> and the good is <strong>overconsumed</strong>. E.g. tobacco, alcohol.',
    } },
    { op: 'patchBlock', title: 'Welfare Loss & Deadweight Loss', patch: { title: 'Welfare Loss', diagramRef: undefined } },
    // The rename turns this fill-in's one-word answer into two words, which the chip widget cannot
    // hold, so the line is rewritten around a single token.
    { op: 'patchSub', id: 'market-failure:sub:allocative-inefficiency-deadweight-loss', patch: {
      recall: {
        id: 'market-failure:sub:allocative-inefficiency-deadweight-loss:recall',
        type: 'fillin',
        prompt: 'Complete the chain:',
        template: [
          'Allocative efficiency requires P = ___',
          '→ When P ≠ MC, the market over- or ___',
          '→ The surplus that is lost is called ___ loss',
        ],
        answers: ['MC', 'underproduces', 'welfare'],
        hints: ['the cost of one more unit', 'the opposite of overproduces', 'not a gain'],
      },
    } },
    { op: 'substitute', rules: VOCAB_AND_CLAIMS, why: "the specification's vocabulary, and claims stated as instructions" },
    // Two practice items lost their block. Both are on-spec, so they are re-pinned, not removed.
    { op: 'repin', title: 'Types of Market Failure', quizIndices: [0], practiceIndices: [2] },
    { op: 'repin', title: 'Externalities', quizIndices: [1], practiceIndices: [0, 3] },
  ],

  /* economics 1.3.4 — Price determination. Eleven lettered requirements, none behavioural. */
  'price-determination': [
    { op: 'deleteBlock', title: 'Alternative Views of Consumer & Producer Behaviour',
      why: '1.3.4 has no behavioural requirement; the IAL\'s only behavioural content is 1.3.2.1b, which consumer-behaviour-demand owns' },
    { op: 'deleteQuiz', ids: ['price-determination:quiz:0aaeeb3a'], why: 'tests bounded rationality, which 1.3.4 does not contain' },
    { op: 'deleteNote', title: 'Behavioural Economics', why: 'the block it summarised is gone' },
    { op: 'patchSub', id: 'price-determination:sub:total-welfare-and-efficiency', patch: {
      recall: {
        id: 'price-determination:sub:total-welfare-and-efficiency:recall',
        type: 'fillin',
        prompt: 'Complete the chain:',
        template: [
          'CS + PS = total economic ___',
          '→ It is maximised at the free-market ___',
          '→ Any deviation from it creates a ___ loss',
        ],
        answers: ['surplus', 'equilibrium', 'welfare'],
        hints: ['what CS and PS add up to', 'where supply meets demand', 'not a gain'],
      },
    } },
    { op: 'substitute', rules: [...WELFARE_LOSS, ...DIRECT_INSTRUCTION], why: 'the specification says welfare loss, never deadweight' },
  ],

  /* economics 2.3.2 — Aggregate demand. */
  'aggregate-demand': [
    { op: 'deleteBlock', title: 'The Accelerator Effect',
      why: '"accelerator" appears 0 times in the IAL Economics specification; it is UK GCE Theme 2 material' },
    { op: 'deleteQuiz', ids: ['aggregate-demand:quiz:ddabc6a3', 'aggregate-demand:quiz:51173ee8'], why: 'both test the accelerator' },
    { op: 'deleteFlashcard', match: /accelerator effect/i, why: 'tests the accelerator' },
    { op: 'deleteNote', title: 'The Accelerator Effect', why: 'the block it summarised is gone' },
    // Losing the fifth block would leave the other four pinned to quiz 0,1,2,3 — the pattern that
    // says nobody chose them. Indices here are the ORIGINAL ones; the engine renumbers after the
    // deletions. Each block is pinned to a question that actually tests it.
    { op: 'repin', title: 'Components of Aggregate Demand', quizIndices: [8] },
    { op: 'repin', title: 'The AD Curve', quizIndices: [13] },
    { op: 'repin', title: 'Shifts in Aggregate Demand', quizIndices: [4], practiceIndices: [0] },
    { op: 'repin', title: 'The Multiplier', quizIndices: [6], practiceIndices: [1] },
  ],

  /* business 3.3.5 — statements, ratio analysis and HR metrics. None of the strategy frameworks. */
  'assessing-competitiveness': [
    { op: 'deleteBlock', title: 'Core Competencies',
      why: 'VRIO, core competencies and distinctive capabilities appear 0 times in the IAL Business specification' },
    { op: 'deleteNote', title: 'Core Competencies and Competitive Advantage', why: 'the block it summarised is gone' },
    { op: 'deleteExtra', key: 'chains', match: /Five Forces/i, why: "Porter's five forces is 3.3.1.4c and 4.3.2.2b, not 3.3.5" },
    { op: 'deleteExtra', key: 'chains', match: /scorecard/i, why: 'the balanced scorecard appears 0 times in the IAL Business specification' },
    { op: 'deleteExtra', key: 'chains', match: /Core competencies/i, why: 'off-specification' },
    { op: 'deleteExtra', key: 'evaluation', match: /triple bottom line/i, why: 'off-specification' },
    // The section had no recall before this packet and would still have none after it, so the
    // removal is taken as the moment to give it one, on the ratios the specification does ask for.
    { op: 'patchSub', id: 'assessing-competitiveness:sub:profitability-ratios', patch: {
      recall: {
        id: 'assessing-competitiveness:sub:profitability-ratios:recall',
        type: 'fillin',
        prompt: 'Complete the chain:',
        template: [
          'Gross profit margin divides gross profit by ___',
          '→ A margin that falls while revenue rises points to rising ___',
          '→ ROCE divides operating profit by capital ___',
        ],
        answers: ['revenue', 'costs', 'employed'],
        hints: ['the top line of the income statement', 'what eats into a margin', 'the second word of the ratio name'],
      },
    } },
  ],

  /* economics 1.3.6 — Government intervention. The category survives; the label does not. */
  'government-intervention': [
    { op: 'patchQuiz', id: 'government-intervention:quiz:c9cddc08', patch: {
      question: 'A subsidy granted to producers of a good with external benefits of consumption is intended to:',
      options: [
        'Decrease supply and raise the price',
        'Increase supply and lower price, raising consumption',
        'Increase the external costs of production',
        'Reduce the quality of the good supplied',
      ],
      correctIndex: 1,
      explanation: 'A subsidy lowers the cost of supply, shifting the supply curve right. The lower price raises the quantity consumed towards the level where marginal social benefit equals marginal social cost, which is the point of the intervention when consumers count only their private benefit.',
    } },
    // Pre-existing length tell on a question the vocabulary swap touches.
    { op: 'patchQuiz', id: 'government-intervention:quiz:4e31763c', patch: {
      options: [
        'Increase the supply of cigarettes sold',
        'Close the information gap about the true costs',
        'Create a monopoly in the cigarette market',
        'Increase tax revenue from cigarette sales',
      ],
      correctIndex: 1,
      explanation: 'A health warning addresses an information gap: it tells the consumer what the consumption actually costs them and others. A better-informed consumer moves their own consumption towards the social optimum without the price changing at all.',
    } },
    // "Assess" does not exist in IAL Economics. Examine carries 8 marks and is the evaluative
    // command at this level (Appendix 6; audit/raw/tariff-census.json).
    { op: 'patchPractice', id: 'government-intervention:practice:a220d299', patch: {
      question: 'Examine the effectiveness of subsidies as a method of raising consumption of a good with external benefits. (8 marks)',
      command: 'Examine',
      marks: 8,
      guidance: 'Define a subsidy as a payment to producers that lowers the cost of supply. Develop the mechanism: supply shifts right, price falls, quantity rises towards the social optimum where MSB meets MSC. Then examine it: the size of the quantity response depends on the elasticity of demand; the spending has an opportunity cost and must be funded; the external benefit has to be valued accurately enough to set the subsidy at the right level; and if the underconsumption is caused by an information gap rather than by price, a subsidy does not close it. Compare with direct provision or an information campaign.',
    } },
    { op: 'substitute', rules: VOCAB_AND_CLAIMS, why: "the specification's vocabulary, and claims stated as instructions" },
  ],

  /* economics 4.3.5 — The role of the state. Rename only, no structural change. */
  'role-state-macroeconomy': [
    { op: 'patchFlashcard', match: /^What is a merit good\?$/, patch: {
      front: 'Why does the state provide goods with external benefits?',
      back: 'Because consumers count only their <strong>private benefit</strong>, so <strong>MSB &gt; MPB</strong> and the free market underconsumes. The state provides or subsidises to move consumption towards the social optimum — e.g. education, healthcare.',
    } },
    { op: 'patchFlashcard', match: /^What is a demerit good\?$/, patch: {
      front: 'Why does the state act against goods with external costs?',
      back: 'Because consumers bear none of the cost falling on others, so <strong>MSB &lt; MPB</strong> and the free market overconsumes. The state taxes, regulates or bans to move consumption towards the social optimum — e.g. tobacco, alcohol.',
    } },
    { op: 'substitute', rules: VOCAB_AND_CLAIMS, why: "the specification's vocabulary, and claims stated as instructions" },
  ],

  /* Rename only. */
  'revenue-costs-profits': [{ op: 'substitute', rules: WELFARE_LOSS, why: 'the specification says welfare loss' }],
  'market-structures-contestability': [
    // "Assess" does not exist in IAL Economics; Examine is the 8-mark evaluative command.
    { op: 'patchPractice', id: 'market-structures-contestability:practice:c2c53594', patch: {
      question: 'Examine whether monopoly is always less efficient than perfect competition. (8 marks)',
      command: 'Examine',
      marks: 8,
    } },
    { op: 'substitute', rules: [...DE_UK, ...WELFARE_LOSS, ...DIRECT_INSTRUCTION], why: 'the specification says welfare loss' },
  ],
  'labour-markets': [{ op: 'substitute', rules: WELFARE_LOSS, why: 'the specification says welfare loss' }],
  'government-intervention-firms': [{ op: 'substitute', rules: WELFARE_LOSS, why: 'the specification says welfare loss' }],
  'trade-global-economy': [{ op: 'substitute', rules: [...WELFARE_LOSS, ...DIRECT_INSTRUCTION], why: 'the specification says welfare loss' }],

  /* Cross-section duplication. The specification names the owner; the other copy goes.
     See audit/SPEC-OWNERSHIP.md. */
  'introductory-concepts': [
    { op: 'deleteSub', id: 'introductory-concepts:sub:the-price-mechanism',
      why: 'the price mechanism is 1.3.4.3a-b; price-determination owns it and teaches it in its own block' },
  ],
  'business-growth': [
    { op: 'deleteSub', id: 'business-growth:sub:demergers-splitting-up',
      why: 'demergers are 3.3.1.2g; types-sizes-businesses owns them and carries the note and the practice question' },
    // Same reasoning as assessing-competitiveness: the section had no recall before or after.
    { op: 'patchSub', id: 'business-growth:sub:external-growth-methods', patch: {
      recall: {
        id: 'business-growth:sub:external-growth-methods:recall',
        type: 'fillin',
        prompt: 'Complete the chain:',
        template: [
          'Buying a supplier is ___ vertical integration',
          '→ Buying a rival at the same stage is ___ integration',
          '→ Buying into an unrelated industry forms a ___',
        ],
        answers: ['backward', 'horizontal', 'conglomerate'],
        hints: ['towards the raw material', 'sideways, not up or down', 'a group of unrelated businesses'],
      },
    } },
  ],
};

export { WELFARE_LOSS, SPEC_VOCAB, DIRECT_INSTRUCTION, DE_UK };
