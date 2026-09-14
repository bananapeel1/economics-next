/**
 * PACKET 13 — pass 4, after Verify A round 3.
 *
 * Round 3's sentence is the one to keep: "it is the third round in which a heading-level or
 * field-level fix left the teaching beside it." Pass 3 rewrote the role-state subsection's keyIdea,
 * definitions, exam tip and takeaways and did not touch the FLOW in the notes entry one card away,
 * which still taught the class by the information mechanism; and it left both misconceptions merging
 * the two causes. So this pass does not fix the fields it was shown. Every field of the two entries
 * was read, and the ownership map was re-run over body text in all 43 sections, which turned up two
 * instances of the D011 class the verifier named and two more of the same class it did not:
 *
 *   D010 — the over-reach, in the fields pass 3 missed
 *     · role-state notes[1] flow: "Consumers undervalue long-term benefits" → "Under-consumption
 *       creates welfare loss". The mechanism as the definition, in the one field the earlier rules
 *       could not match (a flow step is not a sentence in prose).
 *     · both misconceptions, which merged the externality with information failure — and the
 *       subsection's own exam tip tells the student not to merge them.
 *     · market-failure's education quiz keys the same merge. The stem stays; the keyed option is the
 *       externality, and the explanation names information failure as the separate source it is.
 *
 *   D011 — a topic another section owns, taught below heading level
 *     · business-growth keeps two demerger takeaways after the demerger subsection went (round 3).
 *     · introductory-concepts keeps a takeaway naming the three functions of the price mechanism, a
 *       notes item teaching them, and a flashcard testing them — 1.3.4.3a-b taught AND assessed in
 *       1.3.1 (round 3 named the takeaway and the flashcard; the notes item is the same defect).
 *
 * The flashcard is rewritten, not deleted: item ids are stable and progress rows point at them, so a
 * delete would take a student's review history with it. It now tests what 1.3.1 does own.
 *
 * Left alone deliberately, with reasons, so the next round does not re-litigate them:
 *   · government-intervention's two references to the rationing function cite 1.3.4 and sit inside
 *     the price-controls treatment that 1.3.6 owns. The map allows a reference; only the owner teaches.
 *   · external-influences' five-forces subsection is the row the map already defers to that section's
 *     own content packet.
 *   · government-intervention's "Information Provision and Nudge Theory" is an intervention method
 *     under 1.3.6, not the behavioural-influences bullet at 1.3.2.1b.
 *   · government-intervention-firms' monopoly welfare-loss flashcard is Unit 3, the same unit and
 *     paper as the owner, and is the rationale for the intervention that section teaches.
 */

export const PLAN = {
  'role-state-macroeconomy': [
    { op: 'substitute', why: 'D010: the flow and both misconceptions still defined the class by information failure', rules: [
      [/^Consumers undervalue long-term benefits$/, 'Buyers ignore the benefit their consumption brings to others'],
      [/^Under-consumption creates welfare loss$/, 'Consumption settles below the socially optimal level'],
      [/so they are private goods; they are under-consumed because the buyer counts neither the information they lack nor the benefit to others\./g,
        'so they are private goods; they are under-consumed because the buyer counts only their own benefit, not the benefit to everyone else.'],
      [/but are under-consumed because of information gaps and external benefits the buyer does not count\./g,
        'but are under-consumed because the buyer ignores the benefit to others; poor information can widen the gap.'],
    ] },
  ],

  'market-failure': [
    { op: 'substitute', why: 'D010: the education quiz keyed the merge its own section tells students to avoid', rules: [
      [/^Learners undervalue their own gain, and gains to others go uncounted$/, 'Learners count only their own gain, not the benefit to others'],
      [/A learner weighs a gain that an information gap leads them to underestimate, and counts none of the external benefit to others through higher productivity and lower crime\. MSB lies above MPB\./g,
        'A learner counts only their own gain and none of the external benefit to others through higher productivity and lower crime, so MSB lies above MPB. Poor information about the private gain can widen that gap, but it is a separate source of market failure (1.3.5.4b).'],
    ] },
  ],

  'business-growth': [
    // The demerger subsection went on 14 September; its takeaways stayed. Two replacements, because
    // a block needs three or more (schema.lengths) and the surviving subsection is "Reasons for
    // Staying Small".
    { op: 'patchBlock', title: 'Growth Decisions', patch: { takeaway: [
      'Small firms survive through niches, flexibility, personal service, and deliberate owner choice.',
      'Growth is not always desirable — it can destroy the very qualities that make a small firm successful.',
      'Staying small can be the profit-maximising choice, not a failure to grow.',
      "Judge a growth decision against the owner's objectives, not against size alone.",
    ] } },
  ],

  'introductory-concepts': [
    { op: 'patchBlock', title: 'Economic Systems', patch: { takeaway: [
      'Free market economies use prices to allocate resources; command economies use state planning; mixed economies combine both.',
      'Command economies replace prices with planners, and usually face shortages and inefficiency.',
      "Adam Smith's invisible hand explains how self-interest can coordinate an economy — but market failure means it does not always work.",
      'Every real economy is mixed — the question is always *how much* government intervention, not whether to have any.',
    ] } },
    { op: 'substitute', why: 'D011: the notes item taught 1.3.4.3a-b; it refers to it now', rules: [
      [/In a free market, the <strong>price mechanism<\/strong> acts as a signal, incentive, and rationing device, automatically directing resources to where they are most valued\./g,
        'In a free market, resources are allocated by the <strong>price mechanism</strong> rather than by a planner: prices do the directing, and 1.3.4 sets out exactly how.'],
    ] },
    { op: 'patchFlashcard', match: /three functions of the price mechanism/i, patch: {
      front: 'What allocates resources in a free market, a command economy and a mixed economy?',
      back: '<strong>Free market</strong>: prices, set by supply and demand, with minimal state involvement. <strong>Command</strong>: central planners decide output and prices. <strong>Mixed</strong>: prices allocate most resources, and the state intervenes where markets fail.',
    } },
  ],
};

/** Every phrase that must be gone from live content after this plan. The runner checks these. */
export const MUST_NOT_SURVIVE = [
  'Consumers undervalue long-term benefits',
  'Under-consumption creates welfare loss',
  'counts neither the information they lack',
  'information gaps and external benefits the buyer does not count',
  'Learners undervalue their own gain',
  'an information gap leads them to underestimate',
  'Demergers reverse failed mergers',
  'Evaluate demergers from multiple perspectives',
  'The price mechanism works through three functions',
  'acts as a signal, incentive, and rationing device',
  'Name the three functions of the price mechanism',
];
