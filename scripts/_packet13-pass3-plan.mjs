/**
 * PACKET 13 — the third pass, after Verify A round 2.
 *
 * Round 2 closed all eight of round 1's sentences and then read the rest of the swapped text the same
 * way. What it found falls into four classes, and this plan is one rule per sentence for each:
 *
 *  1. Phrases the vocabulary swap produced that no reader would write: "public and goods with external
 *     benefits", "the argument for goods with external benefits and external costs", "goods with external
 *     benefits or goods with positive externalities", and "Marks follow you for" (from "Examiners reward
 *     you for" — the rule swapped the verb and left the object).
 *  2. The over-reach class round 1 named, which survived in role-state-macroeconomy's whole subsection
 *     and in a market-failure chain: the text DEFINED goods with external benefits by information failure.
 *     Under 1.3.5.2c-d a good with external benefits is under-consumed because the buyer ignores the benefit
 *     to third parties; imperfect information (1.3.5.4b) is a separate source that can widen the gap. Every
 *     sentence here now says the first and, where it mentions information, says it is the second.
 *  3. Six SVG labels that still read "DWL" — the abbreviation the census's \bdeadweight\b could not see.
 *     They read "Welfare loss" now (two lines where the label sits inside a triangle), and the census bans
 *     the abbreviation too.
 *  4. D011: market-failure (1.3.5) still TAUGHT monopoly welfare loss below the heading level — a paragraph,
 *     an exam tip, two real examples, a list item and a recall line. The ownership map's "Done" was true of
 *     blocks and false of body text. Each is replaced with the Unit 1 case the specification does put here:
 *     an intervention that overshoots (1.3.6.2a, "government failure as intervention that results in a net
 *     welfare loss"), and the uncorrected externality.
 */

const SVG_LABEL_RULES = [
  // Each label is placed by hand from the diagram's own geometry (scripts/_p13-geom.mjs): "Welfare loss"
  // is five times wider than "DWL", and the triangles it names are 30-40 units across, so the word
  // sits just outside its triangle in the clear space the curves leave, with a leader where the gap is
  // wide. Sizes are authored small and lifted to the 1/36 floor by processSvg, like every other label.
  // Maximum price: left of the triangle's vertical edge, between the Pe line (165) and the Pmax line (205).
  [/<text x="202\.4" y="187\.3" fill="#f59e0b" font-size="9" font-weight="700" font-family="'DM Sans',sans-serif">DWL<\/text>/g,
    '<text x="191" y="190" text-anchor="end" fill="#f59e0b" font-size="9" font-weight="700" font-family="\'DM Sans\',sans-serif">Welfare loss</text>'],
  // Minimum price: left of the triangle, below the Pe line.
  [/<text x="210\.2" y="147\.3" fill="#f59e0b" font-size="9" font-weight="700" font-family="'DM Sans',sans-serif">DWL<\/text>/g,
    '<text x="199" y="185" text-anchor="end" fill="#f59e0b" font-size="9" font-weight="700" font-family="\'DM Sans\',sans-serif">Welfare loss</text>'],
  // Monopoly: right of the apex, in the wedge between MC (above) and AR (below).
  [/<text x="245" y="150" fill="#ef4444" font-family="DM Sans, sans-serif" font-size="9" font-weight="bold">DWL<\/text>/g,
    '<text x="298" y="152" fill="#ef4444" font-family="DM Sans, sans-serif" font-size="9" font-weight="bold">Welfare loss</text>'],
  // Tariff and quota: the key under the axis already reads "Net welfare loss = b+d"; the triangles are
  // labelled by their letters, below the dashed quantity lines, each with a leader.
  [/<text x="148" y="240" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="600">DWL \(b\)<\/text>/g,
    '<text x="172" y="262" fill="#ef4444" font-size="8" font-weight="600">Loss (b)</text><line x1="176" y1="250" x2="156" y2="226" stroke="#ef4444" stroke-width="0.8"/>'],
  [/<text x="362" y="240" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="600">DWL \(d\)<\/text>/g,
    '<text x="338" y="262" text-anchor="end" fill="#ef4444" font-size="8" font-weight="600">Loss (d)</text><line x1="334" y1="250" x2="356" y2="226" stroke="#ef4444" stroke-width="0.8"/>'],
  // Tax incidence: below the demand curve, right of the Q0 line, with a leader up to the lower triangle.
  [/<text x="260" y="185" fill="#f59e0b" font-size="7" font-weight="600">DWL<\/text>/g,
    '<text x="280" y="260" fill="#f59e0b" font-size="7" font-weight="600">Welfare loss</text><line x1="288" y1="249" x2="243" y2="194" stroke="#f59e0b" stroke-width="0.8"/>'],
  // Comments, and anything left.
  [/\bDWL\b/g, 'welfare loss'],
];

const MARKS_RULES = [
  [/Marks follow you for/g, 'You earn marks for'],
  [/marks follow you for/g, 'you earn marks for'],
];

export const PLAN = {
  'government-intervention': [
    { op: 'substitute', why: 'swap artefacts (class 1) and the DWL labels (class 3)', rules: [
      [/^State provision ensures access to public and goods with external benefits for all$/, 'State provision gives everyone access to public goods and to goods with external benefits'],
      [/correcting underconsumption of goods with external benefits or goods with positive externalities\./g, 'correcting the under-consumption of goods with external benefits of consumption.'],
      ...MARKS_RULES,
      ...SVG_LABEL_RULES,
    ] },
  ],

  'market-failure': [
    { op: 'substitute', why: 'class 1 and 2 sentences, and the monopoly teaching below heading level (D011)', rules: [
      [/Information failures reinforce the argument for goods with external benefits and external costs: consumers who lack information cannot accurately weigh private costs against private benefits\./g,
        'Information failures reinforce the case for intervening in markets for goods with external benefits and external costs: consumers who lack information cannot accurately weigh private costs against private benefits.'],
      // extras.chains[2] — information failure is its own source, not the definition of the class.
      [/^Goods with external benefits \(education, healthcare\) are under-consumed because consumers undervalue their long-term private and social benefits\.$/,
        'Consumers who underestimate the long-term benefits of a good (education, preventive healthcare) buy less of it than they would if fully informed.'],
      [/^Goods with external costs \(tobacco, alcohol\) are over-consumed because consumers underestimate the long-term private and social costs\.$/,
        'Consumers who underestimate the long-term costs of a good (tobacco, alcohol) buy more of it than they would if fully informed.'],
      [/^Information failure causes systematic under-consumption of goods with external benefits and over-consumption of goods with external costs\.$/,
        'Information failure causes systematic under-consumption of goods whose benefits are underestimated and over-consumption of goods whose costs are — a separate source of market failure from externalities, and one that often compounds them.'],
      // D011: the Welfare Loss block.
      [/whether through externalities, monopoly power, or government intervention — reduces total surplus\./g,
        'whether through externalities, information gaps, or an intervention that overshoots — reduces total surplus.'],
      [/Whether the distortion comes from a negative externality, a monopolist restricting output, or an indirect tax pushing price above the efficient level, the welfare loss triangle captures the efficiency cost in each case\./g,
        'Whether the distortion comes from a negative externality, a positive externality left uncorrected, or an intervention that overshoots — an indirect tax larger than the external cost, or a minimum price set above the equilibrium — the welfare loss triangle captures the efficiency cost in each case.'],
      [/For \*\*monopoly\*\*, welfare loss appears between the demand curve and the supply curve \(or MC curve\), from the monopoly output to the competitive output\. The monopolist restricts quantity below the efficient level, and the triangle captures the surplus destroyed by this restriction\./g,
        'For **an intervention that overshoots** — an indirect tax above the external cost, or a minimum price above the equilibrium — the triangle sits between the demand and supply curves from the new quantity back to the social optimum: transactions worth making that no longer happen. That net welfare loss is government failure (1.3.6.2).'],
      [/Practise drawing externality, public good, and monopoly diagrams until the welfare loss area becomes second nature\./g,
        'Practise drawing externality, public good, and price-control diagrams until the welfare loss area becomes second nature.'],
      // quiz[6] distractor: government failure, in Unit 1 terms.
      [/^The government fails to regulate a monopolist$/, 'The government sets a minimum price above the equilibrium and creates a surplus'],
      [/^A person takes greater risks because they do not bear the full consequences of their actions$/, 'A person takes greater risks because someone else bears the cost of failure'],
      [/Option D describes government failure\./g, 'Option D describes a government intervention (which may cause government failure), not a change in behaviour after an agreement.'],
      ...SVG_LABEL_RULES,
    ] },
    { op: 'patchSub', id: 'market-failure:sub:diagrams-welfare-loss', patch: {
      realExample: { emoji: '🌡️', text: '**The Stern Review (2006)** put a number on the welfare loss from an uncorrected external cost: without action, the damage from climate change would cost the equivalent of at least 5% of global GDP each year, and could reach 20%. It is the negative-externality triangle drawn for the whole world economy — and the argument for a carbon price is the argument for moving output back towards the social optimum.' },
      recall: { id: 'market-failure:sub:diagrams-welfare-loss:recall', type: 'fillin', prompt: 'Complete the chain:',
        template: ['Negative externality: triangle to ___ of social optimum', '→ Positive externality: market ___', '→ Tax above the external cost: quantity falls below the ___ optimum'],
        answers: ['right', 'underproduces', 'social'], hints: ['which side of the optimum?', 'too little, or too much?', 'private, or the wider one?'] },
    } },
    { op: 'patchSub', id: 'market-failure:sub:allocative-inefficiency-deadweight-loss', patch: {
      realExample: { emoji: '🏭', text: '**Air pollution** is the uncorrected external cost at its largest. The World Bank and the Institute for Health Metrics and Evaluation put the global welfare loss from deaths linked to it at about $5 trillion in 2013. Every unit of fuel burned was priced at its private cost; the cost to the people breathing the result was never in the price, so far more was burned than the social optimum — the welfare loss triangle, at world scale.' },
    } },
  ],

  'role-state-macroeconomy': [
    { op: 'substitute', why: 'class 2: the subsection defined goods with external benefits by information failure', rules: [
      [/^Goods with external benefits are under-consumed because individuals underestimate their private benefits due to information failure — the state intervenes through subsidies, free provision, or regulation\.$/,
        'Goods with external benefits are under-consumed because the buyer ignores the benefit to others — the state intervenes through subsidies, free provision, or regulation.'],
      [/^\*\*Goods with external benefits\*\* are goods that generate greater benefits than individuals realise at the point of consumption\. People \*\*under-consume\*\* them because of \*\*information failure\*\* — they do not fully appreciate the long-term private benefits \(e\.g\. better health from vaccination, higher lifetime earnings from education\)\. This creates a divergence between private and social optimum\.$/,
        '**Goods with external benefits** are goods whose consumption benefits people other than the buyer: a vaccination protects the neighbours, an education raises the productivity of the graduate\'s colleagues. People **under-consume** them because the buyer weighs only their own benefit and ignores the **external benefit** to third parties; poor information can widen the gap by hiding even the private benefit. The market quantity sits below the social optimum.'],
      [/The counter-argument is that information failure is genuine: without intervention, the poorest suffer most because they lack access to information and resources needed to make fully informed decisions\./g,
        'The counter-argument is that the external benefit is real whatever the individual decides, and that where information is also poor the poorest suffer most, because they lack both the information and the resources to act on it.'],
      [/^Individuals underestimate private benefits of goods with external benefits$/, 'Buyers count only their own benefit and ignore the benefit to others'],
      [/^You should explain precisely why goods with external benefits are under-consumed — the answer is information failure, not just 'they are good for society'\. Show the divergence between private benefit and social benefit on a diagram, then evaluate the paternalism criticism for top marks\.$/,
        'You should explain precisely why goods with external benefits are under-consumed: the buyer ignores the benefit to third parties, so marginal private benefit sits below marginal social benefit. Information failure can widen the gap but is a separate source of market failure — say so rather than merging the two. Show the divergence between private benefit and social benefit on a diagram, then evaluate the paternalism criticism for top marks.'],
      [/Without it, individuals would under-consume healthcare \(especially preventive care\) due to information failure and inability to pay\./g,
        'Without it, individuals would under-consume healthcare (especially preventive care), because the benefit to others of a treated, vaccinated population never enters a private decision — and many could not pay in any case.'],
      [/^Goods with external benefits: under-consumed due to information failure — corrected by subsidies, free provision, or regulation\.$/,
        'External benefits: buyers ignore the gain to others, so too little is bought. Subsidise or provide.'],
      // notes[1]
      [/^Goods with external benefits are under-consumed because people undervalue their long-term benefits — the state intervenes through subsidies, free provision, or regulation to correct this information failure and improve equity\.$/,
        'Goods with external benefits are under-consumed because the buyer ignores the benefit to others — the state subsidises, provides or mandates to close the gap and improve equity.'],
      [/because consumers underestimate its private benefits or ignore its positive externalities\./g, 'because consumers ignore the benefit their consumption brings to others (its positive externality).'],
      [/^<strong>Information failure<\/strong> — consumers lack full knowledge of the benefits of goods with external benefits \(e\.g\. education, vaccination\), leading to under-consumption\.$/,
        '<strong>Information failure</strong> — a separate source of market failure: consumers lack full knowledge of a good\'s benefits (e.g. education, vaccination), which widens the under-consumption of goods with external benefits.'],
      [/when information failure alone is insufficient\./g, 'when a subsidy alone is insufficient.'],
      [/^Goods with external benefits: under-consumed due to information failure and positive externalities\.$/,
        'External benefits: under-consumed as buyers ignore the gain to others; poor information adds to it.'],
      [/^You should explain the information failure and positive externalities that justify intervention of this kind, then evaluate using the paternalism criticism and government failure risks\.$/,
        'You should explain the positive externality that justifies intervention of this kind — and, separately, any information failure that widens it — then evaluate using the paternalism criticism and government failure risks.'],
      ...SVG_LABEL_RULES,
    ] },
  ],

  'market-structures-contestability': [
    { op: 'substitute', why: 'a lowercase-initial takeaway and the DWL label', rules: [
      [/^welfare loss from restricted output and higher prices\.$/, 'Welfare loss from restricted output and higher prices.'],
      ...SVG_LABEL_RULES,
    ] },
  ],

  'trade-global-economy': [
    { op: 'substitute', why: 'the DWL labels on the tariff and quota diagrams', rules: [...SVG_LABEL_RULES] },
  ],
};

/** Every phrase that must be gone from live content after this plan. The runner checks these. */
export const MUST_NOT_SURVIVE = [
  'public and goods with external benefits',
  'the argument for goods with external benefits and external costs',
  'goods with external benefits or goods with positive externalities',
  'follow you for',
  'DWL',
  'due to information failure',
  'the answer is information failure',
  'because of **information failure**',
  'correct this information failure',
  'For **monopoly**, welfare loss',
  'a monopolist restricting output',
  'and monopoly diagrams',
  'Harberger',
  'Shkreli',
  'Monopoly: output restricted',
  'welfare loss from restricted output and higher prices.',
];
