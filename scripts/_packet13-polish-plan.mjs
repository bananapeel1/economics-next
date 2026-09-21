/**
 * PACKET 13 — the polish pass, after Verify A round 1.
 *
 * The verifier diffed all 43 pre-packet snapshots against live and read the pairs. The vocabulary
 * swap was complete but mechanical, and eight sentences came out damaged: a tautology ("welfare
 * loss or welfare loss", from a source that said "deadweight loss or welfare loss" — the rule only
 * covered the reverse order), a phrase the plan file gained after live content had already been
 * written ("good with external benefits of consumption intervention"), a circular model answer, a
 * repeated word, and — worse than any grammar — a claim widened past its truth: "goods with
 * external benefits are excludable and rivalrous" is true of merit goods by definition and false of
 * the class the new label names (a public park has external benefits). Each is patched here by
 * hand, on the exact sentence, and the runner's post-check refuses to stage if any target survives.
 *
 * Also here: two quiz pins in market-failure that the rewrites made wrong (a chapter on information
 * failure pinned to a question that is now about externalities; the welfare-loss chapter pinned to
 * moral hazard), and the sentence in the same section that still listed monopoly power as a type of
 * market failure after the monopoly block had been removed for being Unit 3.
 *
 * Why a third plan rather than editing the first two: the first two are the record of what ran, in
 * the order it ran, and they stay strict. The live text is the result of all three in sequence, and
 * `audit/scripts/packet-13-census.mjs` — not any plan file — is the statement of what is live.
 */

export const PLAN = {
  'market-failure': [
    { op: 'substitute', why: 'D010 damage, and the spec\'s own list of sources (1.3.5.1b)', rules: [
      // The Types block still named monopoly power as a type of market failure, in the section whose
      // monopoly block was removed for being 3.3.3.6. The specification's list of sources is used.
      [/The key types include externalities, public goods, goods with external benefits and external costs, information failures, and monopoly power[^.]*\./g,
        'The types the IAL specification names are externalities, the non-provision of public goods (the free-rider problem), imperfect market information, moral hazard, and speculation and market bubbles.'],
      [/Market failure arises from <strong>externalities<\/strong>, public goods, information failures, and market power, each breaking the price mechanism in a different way\./g,
        'Market failure arises from <strong>externalities</strong>, the non-provision of public goods, imperfect information, moral hazard and market bubbles, each breaking the price mechanism in a different way.'],
      [/identify whether the failure is due to externalities, public goods, information failure, or market power, and explain/g,
        'identify whether the failure is due to externalities, public goods, information gaps, moral hazard or a bubble, and explain'],
      [/Monopoly power creates welfare loss by <strong>restricting output<\/strong> below the level where price equals marginal cost\./g,
        'A negative externality creates welfare loss by <strong>pushing output</strong> past the social optimum, where each extra unit costs society more than it is worth.'],
      // The tautology.
      [/Label it clearly as welfare loss or welfare loss\./g, 'Label it clearly as the welfare loss.'],
      // The circular model answer.
      [/Instead write: education is a good with external benefits of consumption with positive consumption externalities[^.]*\./g,
        'Instead write: education is excludable and rival, so it is a private good; its market failure is the external benefit of consumption that the buyer does not count.'],
    ] },
    // Pins the rewrites made wrong: Information Failures now pinned to an externalities question,
    // Welfare Loss to moral hazard. Each chapter now pins a question that tests it.
    { op: 'repin', title: 'Information Failures', quizIndices: [14], practiceIndices: [4] },
    { op: 'repin', title: 'Welfare Loss', quizIndices: [5] },
  ],

  'role-state-macroeconomy': [
    { op: 'substitute', why: 'D010 damage: an ungrammatical phrase and a claim widened past its truth', rules: [
      [/good with external benefits of consumption intervention/g, 'intervention of this kind'],
      [/Wrong — goods with external benefits are excludable and rivalrous \(a hospital bed used by one patient cannot be used by another\), but they are under-consumed due to information failure\./g,
        'Wrong — healthcare and education are excludable and rival (a hospital bed used by one patient cannot be used by another), so they are private goods; they are under-consumed because the buyer counts neither the information they lack nor the benefit to others.'],
      [/Goods with external benefits are excludable and rivalrous \(like private goods\) but are under-consumed due to information failure\./g,
        'Healthcare and education are excludable and rival, like any private good, but are under-consumed because of information gaps and external benefits the buyer does not count.'],
    ] },
  ],

  'price-determination': [
    { op: 'substitute', why: 'D010 damage: a repeated word and a tautology', rules: [
      [/creates a welfare loss triangle of welfare that nobody receives/g, 'creates a welfare loss: a triangle of surplus that nobody receives'],
      [/Instead write: total welfare loss is only the welfare loss triangle, because tax revenue is redistributed by the government, not destroyed\./g,
        'Instead write: the welfare loss is only the triangle between the curves, because tax revenue is redistributed by the government, not destroyed.'],
    ] },
  ],
};

/** Every phrase that must be gone from live content after this plan. The runner checks these. */
export const MUST_NOT_SURVIVE = [
  'welfare loss or welfare loss',
  'good with external benefits of consumption intervention',
  'with positive consumption externalities',
  'welfare loss triangle of welfare',
  'only the welfare loss triangle',
  'goods with external benefits are excludable and rivalrous',
  'Goods with external benefits are excludable and rivalrous',
  'information failures, and monopoly power',
];
