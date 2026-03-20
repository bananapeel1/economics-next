import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REFORMAT CONTENT — Unit 1 Part C
 *  Market Failure + Government Intervention
 *  Rich visual HTML elements (key-idea, flow-chain, so-what,
 *  watch-out, take-away, content-subhead, section-links)
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'market-failure': [
  /* ──────────────────────────────────────────────────────────
   *  Block 0: Types of Market Failure
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Types of Market Failure',
    concepts: [
      {
        title: 'What Is Market Failure?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Markets fail when the price mechanism sends the wrong signals — leading to overproduction, underproduction, or non-provision of goods relative to what would maximise society's welfare.</p></div>`,

          `<div class="content-subhead">Why Markets Get It Wrong</div>Think about what an efficient market needs: every cost and every benefit must show up in the price. When they don't — when a factory can dump waste for free, or a vaccinated person can't charge neighbours for the protection they receive — the price <strong>lies</strong>. It tells producers and consumers to do more or less than what's truly best for society. In technical terms, the market fails to reach <strong>allocative efficiency</strong>, where Price = Marginal Social Cost (P = MSC).`,

          `The main categories you need to command for the exam: <strong>externalities</strong> (costs or benefits spilling onto uninvolved third parties), <strong>public goods</strong> (non-rival and non-excludable — markets won't supply them at all), <strong>merit and demerit goods</strong> (under- or over-consumed because of externalities <em>combined with</em> information failure), <strong>information failures</strong> (one or both sides of the market lack crucial knowledge), and <strong>monopoly power</strong> (firms restricting output to push prices above marginal cost).`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Market failure provides the economic justification for government intervention — but intervention itself carries the risk of government failure. Every evaluation question demands you weigh both sides.</p></div>`
        ]
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 1: Externalities
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Externalities',
    concepts: [
      {
        title: 'What Are Externalities?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>An externality is a cost or benefit that falls on a third party — someone outside the transaction. Because neither buyer nor seller accounts for it, the market produces the wrong quantity.</p></div>`,

          `The fundamental equations tie everything together: <strong>MSC = MPC + MEC</strong> (Marginal Social Cost equals Marginal Private Cost plus Marginal External Cost) and <strong>MSB = MPB + MEB</strong> (Marginal Social Benefit equals Marginal Private Benefit plus Marginal External Benefit). When MEC or MEB is non-zero, private decisions diverge from social ones, and that divergence <em>is</em> the market failure.`,

          `Externalities can arise on either side of the market — in <strong>production</strong> (affecting costs and supply) or in <strong>consumption</strong> (affecting benefits and demand). You need all four combinations: negative production, negative consumption, positive production, and positive consumption. Each shifts a different curve and requires a different diagram.`
        ]
      },
      {
        title: 'Negative Externalities of Production',
        points: [
          `<div class="content-subhead">Negative Externalities → Overproduction</div>Here, a firm's private costs (MPC) are <strong>lower</strong> than the true cost to society (MSC) because the production process dumps costs onto third parties. The gap between MSC and MPC is the <strong>Marginal External Cost (MEC)</strong> — the damage the firm doesn't pay for.`,

          `<div class="flow-chain"><span class="pill neg">Factory ignores pollution cost</span><span class="arrow">→</span><span class="pill neg">MPC &lt; MSC</span><span class="arrow">→</span><span class="pill neg">Price too low</span><span class="arrow">→</span><span class="pill neg">Overproduction at Q<sub>m</sub></span><span class="arrow">→</span><span class="pill neg">Welfare loss triangle</span></div>`,

          `Consider a chemical plant on the River Tees dumping waste that kills fish stocks, forces water treatment plants downstream to spend millions on purification, and destroys recreational value for local communities. Or think of UK cement factories emitting fine particulates that cause respiratory illness in nearby residents — the NHS picks up the bill, not the polluter. In each case, the firm's supply curve understates the true cost.`,

          `On a diagram: the MSC curve sits <strong>above</strong> the MPC (supply) curve. The free market produces at Q<sub>m</sub> (where MPC = MPB), but the social optimum is Q<sub>opt</sub> (where MSC = MSB). Since Q<sub>m</sub> &gt; Q<sub>opt</sub>, there is <strong>overproduction</strong>, and the welfare loss triangle sits between MSC and MSB from Q<sub>opt</sub> to Q<sub>m</sub>.`
        ],
        examTip: `Always draw the welfare loss triangle precisely and shade it. Label Q<sub>m</sub> (market quantity), Q<sub>opt</sub> (socially optimal quantity), and the MEC gap clearly. Many students lose marks for vague diagrams.`
      },
      {
        title: 'Negative Externalities of Consumption',
        points: [
          `<div class="content-subhead">When Consuming Hurts Others</div>Here the social benefit of consumption is <strong>less</strong> than the private benefit — or equivalently, consumption imposes <strong>external costs</strong> on third parties. The consumer captures the full private benefit but others suffer.`,

          `<div class="flow-chain"><span class="pill neg">Smoker enjoys cigarette (MPB)</span><span class="arrow">→</span><span class="pill neg">Passive smoking harms others</span><span class="arrow">→</span><span class="pill neg">MSB &lt; MPB</span><span class="arrow">→</span><span class="pill neg">Overconsumption at Q<sub>m</sub></span></div>`,

          `Smoking is the classic case: the smoker gets nicotine satisfaction but imposes passive-smoking health risks on colleagues, increased NHS treatment costs on taxpayers, and reduced workplace productivity on employers. Alcohol consumption generates costs for families, the police, and A&amp;E departments. Driving a petrol car inflicts congestion and pollution on everyone else sharing the road and breathing the air.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The distinction between production and consumption externalities matters for policy. Production externalities call for policies targeting firms (taxes, permits, regulation). Consumption externalities need policies aimed at consumers (product taxes, information campaigns, bans). Examiners reward students who match the policy to the correct side of the market.</p></div>`
        ]
      },
      {
        title: 'Positive Externalities of Production',
        points: [
          `<div class="content-subhead">When Producing Benefits Others</div>Here, society benefits more from production than the firm itself captures. The firm's production creates spillover benefits for third parties — effectively <strong>MSC &lt; MPC</strong> (or equivalently, there's a negative MEC, acting as an external benefit on the cost side).`,

          `<div class="flow-chain"><span class="pill pos">Tech firm invests in R&amp;D</span><span class="arrow">→</span><span class="pill pos">Knowledge spills to other firms</span><span class="arrow">→</span><span class="pill pos">MSC &lt; MPC</span><span class="arrow">→</span><span class="pill pos">Underproduction at Q<sub>m</sub></span></div>`,

          `Apple's smartphone innovation didn't just benefit Apple — it created an entire app-development ecosystem worth hundreds of billions. A farmer maintaining hedgerows provides biodiversity and natural flood prevention for the wider community at no charge. When Rolls-Royce trains aerospace engineers, competitors benefit when those skilled workers eventually move firms. These <strong>knowledge and skills spillovers</strong> mean MSC lies below MPC on the diagram, and the market produces Q<sub>m</sub> &lt; Q<sub>opt</sub> — <strong>underproduction</strong>.`
        ]
      },
      {
        title: 'Positive Externalities of Consumption',
        points: [
          `<div class="content-subhead">When Consuming Benefits Society</div>Here, consuming the good generates benefits beyond what the individual enjoys — <strong>MSB &gt; MPB</strong>. The gap is the <strong>Marginal External Benefit (MEB)</strong>.`,

          `<div class="flow-chain"><span class="pill pos">Student gets education (MPB)</span><span class="arrow">→</span><span class="pill pos">Higher productivity, lower crime, more innovation (MEB)</span><span class="arrow">→</span><span class="pill pos">MSB &gt; MPB</span><span class="arrow">→</span><span class="pill pos">Underconsumption at Q<sub>m</sub></span></div>`,

          `<strong>Education</strong> is the strongest example: you benefit personally through higher earnings and broader horizons, but society also gains — more educated citizens are more productive, commit less crime, participate more in democracy, and generate innovations that benefit everyone. <strong>Vaccination</strong> protects the individual, but also creates <strong>herd immunity</strong> that shields those who cannot be vaccinated. Singapore's heavy subsidies for education rest squarely on this logic.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Positive externalities of consumption justify government provision of education and healthcare — without intervention, people consume less than the socially optimal amount because they cannot capture all the benefits their consumption generates for others.</p></div>`
        ],
        examTip: `For positive externalities, always explain both the private benefit (what the consumer gets) AND the external benefit (what society gets). "Education benefits the individual through higher earnings AND society through lower crime and higher productivity." This chain of reasoning earns full marks.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 2: Public Goods
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Public Goods',
    concepts: [
      {
        title: 'Characteristics of Public Goods',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A pure public good is non-rival (one person's use doesn't reduce availability for others) and non-excludable (you can't prevent anyone from benefiting). Together, these characteristics make private provision impossible.</p></div>`,

          `Picture a lighthouse: it illuminates the sea for every ship simultaneously — there's <strong>zero marginal cost</strong> for an additional user (non-rival). And you simply cannot stop a ship seeing its beam (non-excludable). National defence, street lighting, flood defence barriers, and public firework displays all share these twin properties. Everyone in a community benefits, regardless of whether they have paid.`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Don't assume all government-provided goods are public goods. The NHS provides healthcare (a merit good, not a public good — it's rival and excludable). Roads are non-excludable but become rival when congested. Parks are non-rival at low usage but rival when overcrowded. These are <strong>quasi-public goods</strong> — discussing this distinction shows analytical depth and picks up evaluation marks.</p></div>`
        ]
      },
      {
        title: 'The Free-Rider Problem',
        points: [
          `<div class="content-subhead">Why Markets Produce Zero</div>Non-excludability creates the <strong>free-rider problem</strong>: if you benefit whether you pay or not, rational self-interest says don't pay. If everyone thinks this way, nobody pays, no revenue is generated, and no private firm can profitably supply the good. This is <strong>complete market failure</strong> — the market produces <strong>zero</strong> of something society clearly values.`,

          `<div class="flow-chain"><span class="pill blue">Good is non-excludable</span><span class="arrow">→</span><span class="pill neg">Rational consumers free-ride</span><span class="arrow">→</span><span class="pill neg">No revenue for firms</span><span class="arrow">→</span><span class="pill neg">Zero private provision</span><span class="arrow">→</span><span class="pill pos">Government must provide via taxation</span></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The solution is government provision funded by compulsory taxation — everyone pays, so nobody can free-ride. This is why even committed libertarians accept state provision of defence and law enforcement: the free-rider problem has no market solution.</p></div>`
        ],
        examTip: `Don't just state "non-rival and non-excludable" — explain why each characteristic causes market failure. Non-excludability → free-rider problem → no revenue → no private provision. Non-rivalry → zero marginal cost → charging a price would be allocatively inefficient anyway.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 3: Merit Goods & Demerit Goods
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Merit Goods & Demerit Goods',
    concepts: [
      {
        title: 'Merit Goods',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Merit goods are underconsumed in the free market for two reinforcing reasons: they generate positive externalities AND consumers suffer from information failure, underestimating the long-term benefits.</p></div>`,

          `<div class="content-subhead">The Dual Condition</div>Education is the textbook case. A teenager may not appreciate the full value of staying in school — that's <strong>information failure</strong>. Meanwhile, society benefits from their education through higher productivity, lower crime, and better public health — that's a <strong>positive externality</strong>. Healthcare follows the same pattern: people underestimate the value of preventive check-ups (information failure), while a healthier population reduces NHS costs and boosts workforce output (positive externality).`,

          `Other merit goods include museums and libraries (cultural externalities combined with undervaluation by consumers), vaccinations (herd immunity externality plus underestimation of disease risk), and cycling infrastructure (health and environmental externalities that people tend to discount). Singapore invests heavily in education subsidies precisely because the government recognises both conditions at work.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Because merit goods are underconsumed, governments intervene by subsidising them, providing them free at the point of use (state education, the NHS), or mandating consumption (compulsory education until 18 in England).</p></div>`
        ]
      },
      {
        title: 'Demerit Goods',
        points: [
          `<div class="content-subhead">The Mirror Image</div><strong>Demerit goods</strong> are overconsumed for the opposite reasons: they generate <strong>negative externalities</strong> <em>and</em> consumers suffer from <strong>information failure</strong> — they underestimate harm or are too influenced by present bias to care about future consequences.`,

          `<div class="flow-chain"><span class="pill neg">Consumer underestimates harm (info failure)</span><span class="arrow">→</span><span class="pill neg">Overconsumption beyond MPB</span><span class="arrow">→</span><span class="pill neg">Negative externalities on third parties</span><span class="arrow">→</span><span class="pill neg">MSB &lt; MPB → market overproduces</span></div>`,

          `Cigarettes: young smokers dramatically underestimate addiction and health risks (information failure and present bias), while passive smoking and NHS costs burden third parties (negative externality). The UK's <strong>sugar levy</strong> targets sugary drinks on the same logic — consumers underestimate long-term obesity risks, and the resulting NHS costs fall on all taxpayers.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The dual condition is the examiner's favourite trap: merit/demerit goods require BOTH externalities AND information failure. If a question asks "Is alcohol a demerit good?", you must demonstrate both — the external costs on others AND the information failure (consumers underestimate harm or are addicted). Miss either and you haven't fully answered. And remember the tension: calling something a demerit good involves a <strong>value judgement</strong> — who decides what's "good for you"?</p></div>`
        ],
        examTip: `The dual condition is crucial: merit/demerit goods = externalities + information failure. If a question asks "Is alcohol a demerit good?", you must demonstrate BOTH — the external costs on others AND the information failure. Miss either and you haven't fully answered.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 4: Information Failures
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Information Failures',
    concepts: [
      {
        title: 'Asymmetric & Imperfect Information',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>When buyers or sellers lack the information needed for rational decisions — or when one side knows far more than the other — markets misallocate resources, sometimes catastrophically.</p></div>`,

          `<div class="content-subhead">Imperfect vs Asymmetric</div><strong>Imperfect information</strong> means one or both parties simply lack relevant knowledge — a consumer can't judge the quality of a used car and might overpay or refuse to buy at all. <strong>Asymmetric information</strong> is more dangerous: <strong>one side systematically knows more</strong>. The used-car seller knows the vehicle's true history; the buyer doesn't. An insurance applicant knows their real health; the insurer doesn't.`,

          `Asymmetric information creates <strong>adverse selection</strong> — a problem arising <em>before</em> any transaction. In health insurance, sick people are more likely to buy cover (they know they'll need it) while healthy people opt out (they'd be overpaying). Premiums rise, pushing out more healthy people, driving premiums higher still — a potential "death spiral." George Akerlof's famous "Market for Lemons" paper demonstrated how this dynamic can destroy entire markets, leaving only the worst products for sale.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Markets respond to asymmetric information through signalling (degrees, certifications) and screening (probation periods, interviews, medical checks), but these are costly and imperfect — justifying regulatory interventions like mandatory disclosure and consumer protection law.</p></div>`
        ]
      },
      {
        title: 'Moral Hazard',
        points: [
          `<div class="content-subhead">After the Deal — Changed Behaviour</div><strong>Moral hazard</strong> occurs <em>after</em> an agreement — one party takes greater risks because they don't bear the full consequences. The fully insured car owner parks in dodgier areas. The bailed-out bank gambles with depositors' money. The worker with ironclad job protection coasts.`,

          `<div class="flow-chain"><span class="pill blue">Agreement transfers risk</span><span class="arrow">→</span><span class="pill neg">Party no longer bears full cost</span><span class="arrow">→</span><span class="pill neg">Riskier behaviour</span><span class="arrow">→</span><span class="pill neg">Higher costs for other party / society</span></div>`,

          `The 2008 financial crisis is the most devastating example: banks took enormous risks with complex derivatives partly because they expected government bailouts if things went wrong — "too big to fail." When Lehman Brothers collapsed and others were indeed rescued with taxpayer money, the moral hazard was confirmed. Risk-taking was privatised (profits to shareholders) while losses were socialised (taxpayers funded the bailouts).`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Solutions to moral hazard include co-payments (you pay the first £500 of any repair, so you park more carefully), no-claims bonuses, deductibles, monitoring, and performance-related pay. In banking, stricter capital requirements and stress tests ensure banks have "skin in the game." Always specify whether you're discussing adverse selection (before the deal) or moral hazard (after) — they have different causes and different solutions.</p></div>`
        ],
        examTip: `Timing is the key distinction: adverse selection = before the deal (wrong types self-select into the market). Moral hazard = after the deal (behaviour changes because risk is transferred). The 2008 financial crisis is a powerful example for both.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 5: Market Power as Market Failure
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Market Power as Market Failure',
    concepts: [
      {
        title: 'Monopoly & Market Power',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A firm with monopoly power can restrict output and set price above marginal cost (P &gt; MC), creating allocative inefficiency and a deadweight welfare loss — trades that would benefit both buyer and seller simply never happen.</p></div>`,

          `<div class="flow-chain"><span class="pill neg">Monopolist restricts output</span><span class="arrow">→</span><span class="pill neg">P &gt; MC</span><span class="arrow">→</span><span class="pill neg">Consumers priced out</span><span class="arrow">→</span><span class="pill amber">Deadweight welfare loss</span></div>`,

          `The result on a diagram: consumer surplus is transferred to the firm as <strong>supernormal profit</strong>, and some surplus is destroyed entirely — the deadweight loss triangle. Monopolies may also suffer from <strong>X-inefficiency</strong>: without competitive pressure, costs creep up through bloated management, unnecessary perks, and sheer complacency. Why minimise costs when no rival is breathing down your neck?`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Never give a one-sided answer on monopoly. The counter-argument is powerful: monopolists may achieve <strong>economies of scale</strong> (natural monopolies like water companies operate more efficiently as one large firm), and supernormal profits fund <strong>R&amp;D investment</strong>, driving <strong>dynamic efficiency</strong>. Without patent protection — a legal temporary monopoly — pharmaceutical firms might never invest billions in developing life-saving drugs.</p></div>`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The central trade-off is static inefficiency now versus dynamic efficiency later. This is why governments regulate monopolies rather than simply banning them — and it's why the strongest exam answers weigh the welfare loss against potential scale and innovation benefits in the specific context given.</p></div>`
        ],
        examTip: `The strongest answers balance both sides: "While the monopolist creates deadweight loss through P > MC, this must be weighed against potential economies of scale and dynamic efficiency from R&D investment financed by supernormal profits." Evaluate which effect dominates in context.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 6: Welfare Loss & Deadweight Loss
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Welfare Loss & Deadweight Loss',
    concepts: [
      {
        title: 'Identifying Welfare Loss on Diagrams',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Welfare loss (deadweight loss) is the net loss to society from a market not operating at the allocatively efficient output. It appears as a triangle on every externality, tax, and monopoly diagram — and it is your analytical anchor in any intervention question.</p></div>`,

          `For <strong>negative externalities</strong>: the welfare loss triangle sits between MSC and MSB, from Q<sub>opt</sub> to Q<sub>m</sub>. It represents the excess social cost of overproduction — every unit produced beyond Q<sub>opt</sub> costs society more than it benefits society. For <strong>positive externalities</strong>: the triangle is between MSB and MPC, from Q<sub>m</sub> to Q<sub>opt</sub>. It represents the lost social benefit of underproduction — trades that would have generated a net benefit to society never happen.`,

          `For <strong>monopoly</strong>: the deadweight loss triangle represents consumers priced out by P &gt; MC. For <strong>taxes</strong>: it represents trades destroyed because the tax has driven a wedge between what buyers pay and what sellers receive. The purpose of well-designed government intervention is to <strong>shrink or eliminate</strong> this triangle — but poorly designed intervention can create a <em>new</em> deadweight loss (government failure).`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>In any diagram question, shade the welfare loss triangle, label it clearly, and explain in words what it represents. "The shaded area represents the net welfare loss — the units between Q<sub>opt</sub> and Q<sub>m</sub> where MSC exceeds MSB." Diagram plus written explanation equals full marks.</p></div>
<div class="section-links"><span class="link">↗ 1.6 Government Intervention</span><span class="link">↗ 1.4 Price Determination</span></div>`
        ],
        examTip: `Always shade and label the welfare loss triangle. Explain what it represents in words: "The triangle represents the net welfare loss to society from overproduction — the area where MSC exceeds MSB between Q<sub>opt</sub> and Q<sub>m</sub>." Diagram + explanation = full marks.`
      }
    ]
  }
],


'government-intervention': [
  /* ──────────────────────────────────────────────────────────
   *  Block 0: Indirect Taxes to Correct Negative Externalities
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Indirect Taxes to Correct Negative Externalities',
    concepts: [
      {
        title: 'Using Taxes to Internalise External Costs',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>If a negative externality means the polluter isn't paying the full cost to society, a Pigouvian tax set equal to the Marginal External Cost forces them to internalise it — shifting MPC up to MSC so the market naturally settles at the socially optimal output.</p></div>`,

          `<div class="flow-chain"><span class="pill blue">Government sets tax = MEC at Q<sub>opt</sub></span><span class="arrow">→</span><span class="pill blue">MPC shifts up to MSC</span><span class="arrow">→</span><span class="pill pos">Market output falls from Q<sub>m</sub> to Q<sub>opt</sub></span><span class="arrow">→</span><span class="pill pos">Welfare loss triangle eliminated</span></div>`,

          `The UK's <strong>Landfill Tax</strong> — escalating from £7 per tonne in 1996 to over £100 today — dramatically cut waste going to landfill by making dumping expensive relative to recycling. The <strong>London Congestion Charge</strong> (£15/day) reduced central London traffic volumes by 15–20%. Both are textbook Pigouvian taxes that shift private costs closer to social costs and generate revenue that can fund cleaner alternatives.`
        ]
      },
      {
        title: 'Evaluation of Indirect Taxes',
        points: [
          `<strong>Advantages</strong>: taxes are <strong>market-based</strong> — firms choose whether to pay, change behaviour, or invest in cleaner methods. They generate <strong>revenue</strong> for the government (a "double dividend" — correcting the externality AND raising funds for public services). And they create <strong>ongoing incentives</strong> for innovation: the cheaper you can cut pollution, the less tax you pay.`,

          `<strong>Problems</strong>: calculating the exact MEC is <strong>extremely difficult</strong> in practice — how do you put a precise pound figure on the health damage from air pollution over decades? If the tax is set too low, overproduction continues; too high, and you've overcorrected, creating a new distortion. There's also a <strong>regressive</strong> dimension — taxes on necessities like fuel hit lower-income households hardest because they spend a larger share of income on these goods.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>If demand is very <strong>price inelastic</strong> (cigarettes, petrol), the tax raises revenue but barely changes behaviour — it becomes a revenue tool rather than a corrective one. And there's the risk of <strong>carbon leakage</strong>: taxing pollution heavily in one country may simply relocate production to countries with weaker regulation, so global pollution doesn't fall.</p></div>`
        ],
        examTip: `The best evaluation asks: "Does this tax actually reduce the externality, or does it just raise revenue?" If demand is very inelastic, the tax mostly raises revenue without much correction — and the burden falls on consumers. Always link effectiveness to PED.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 1: Subsidies to Correct Positive Externalities
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Subsidies to Correct Positive Externalities',
    concepts: [
      {
        title: 'Using Subsidies to Internalise External Benefits',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>For positive externalities the market underproduces. A subsidy equal to the Marginal External Benefit at Q<sub>opt</sub> shifts the supply curve right, increasing output to the socially optimal level at a lower price.</p></div>`,

          `<div class="flow-chain"><span class="pill blue">Government sets subsidy = MEB at Q<sub>opt</sub></span><span class="arrow">→</span><span class="pill blue">Supply shifts right / down</span><span class="arrow">→</span><span class="pill pos">Price falls, quantity rises toward Q<sub>opt</sub></span><span class="arrow">→</span><span class="pill pos">Welfare loss from underproduction shrinks</span></div>`,

          `Germany's virtually free university tuition is a massive education subsidy justified by enormous positive externalities — a more productive workforce, greater innovation, and lower crime rates. China's subsidies for solar panel manufacturing helped it achieve economies of scale and become the world's largest producer, addressing the positive externality of reduced global carbon emissions.`
        ]
      },
      {
        title: 'Evaluation of Subsidies',
        points: [
          `<strong>Advantages</strong>: subsidies increase consumption and production of socially beneficial goods, lower costs for consumers, and can stimulate growth in strategic industries. Unlike bans or mandates, they work <em>with</em> market forces rather than overriding them.`,

          `<strong>Problems</strong>: every pound of subsidy has a significant <strong>opportunity cost</strong> — that's a pound not spent on hospitals, schools, or tax cuts. It is funded by taxpayers. Calculating the precise MEB is just as difficult as calculating MEC, so over- or under-correction is likely.`,

          `Subsidies can breed <strong>dependency</strong> — firms that survive only because of government support are not allocating resources efficiently. They may be <strong>poorly targeted</strong>: electric vehicle subsidies in the UK mostly benefit wealthier households who can afford new cars. Agricultural subsidies under the EU's Common Agricultural Policy disproportionately rewarded large agribusinesses, not the small farmers who needed help most.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>There's always a risk of <strong>government failure</strong>: the subsidy overshoots (overproduction beyond Q<sub>opt</sub>), undershoots (still not enough produced), or flows to the wrong recipients. And once in place, subsidies are politically very hard to remove — beneficiaries lobby fiercely to keep them, even when the original justification has faded.</p></div>`
        ]
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 2: Maximum Prices (Price Ceilings)
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Maximum Prices (Price Ceilings)',
    concepts: [
      {
        title: 'How Maximum Prices Work',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A maximum price (price ceiling) is a legal limit set below the equilibrium price to make a good more affordable. If set above equilibrium, it has no effect — the market already clears below the ceiling.</p></div>`,

          `<div class="flow-chain"><span class="pill blue">Government sets P<sub>max</sub> below equilibrium</span><span class="arrow">→</span><span class="pill neg">Q<sub>d</sub> &gt; Q<sub>s</sub></span><span class="arrow">→</span><span class="pill neg">Persistent shortage</span><span class="arrow">→</span><span class="pill amber">Rationing needed (queues, waiting lists, black markets)</span></div>`,

          `Textbook examples: <strong>rent controls</strong> in New York, Berlin, and Stockholm cap rents to protect tenants from soaring housing costs. Food price controls in developing countries during crises keep staples affordable. Interest rate caps on payday loans in the UK limit the cost of borrowing for vulnerable consumers.`
        ]
      },
      {
        title: 'Effects, Advantages & Disadvantages',
        points: [
          `<strong>Advantages</strong>: improves affordability for consumers, protects vulnerable groups (low-income renters, people needing essential medicines), and can prevent exploitative price gouging during emergencies such as natural disasters or pandemics.`,

          `<strong>Disadvantages</strong>: the <strong>shortage</strong> is the core problem. Not everyone who wants the good at the lower price can get it, so <strong>rationing</strong> becomes necessary — queues, waiting lists, or arbitrary allocation. <strong>Black markets</strong> often emerge where the good is sold illegally at prices even higher than the original equilibrium.`,

          `Long-run consequences can be devastating. Rent controls <strong>reduce supply incentive</strong>: landlords have less motivation to build new properties, maintain existing ones, or even keep them on the rental market. Stockholm's rent controls created a <strong>20-year waiting list</strong> for apartments. New York's system led to widespread housing deterioration as landlords cut maintenance budgets. Quality erodes because there is no competitive pressure to maintain standards when demand always exceeds supply.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>A deadweight loss is created and total economic surplus falls. The people the policy aims to help — low-income households — may end up worse off if they cannot find the good at all. In exams, always evaluate whether the equity benefit to those who do get the good at the lower price outweighs the efficiency cost of the shortage it creates.</p></div>`
        ],
        examTip: `Draw the diagram showing the shortage gap between Q<sub>d</sub> and Q<sub>s</sub> at the ceiling price, shade the deadweight loss, and evaluate: the policy helps those who get the good at the lower price but hurts those who can't find it at all. Whether it's "worth it" is a normative judgement.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 3: Minimum Prices (Price Floors)
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Minimum Prices (Price Floors)',
    concepts: [
      {
        title: 'How Minimum Prices Work',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A minimum price (price floor) is set above equilibrium to guarantee producers a higher income or discourage consumption of harmful goods. If set below equilibrium, it has no effect.</p></div>`,

          `<div class="flow-chain"><span class="pill blue">Government sets P<sub>min</sub> above equilibrium</span><span class="arrow">→</span><span class="pill neg">Q<sub>s</sub> &gt; Q<sub>d</sub></span><span class="arrow">→</span><span class="pill neg">Persistent surplus</span><span class="arrow">→</span><span class="pill amber">Government may buy &amp; store excess</span></div>`,

          `Key examples: the <strong>EU Common Agricultural Policy</strong> (guaranteed minimum prices for farm products), <strong>Scotland's minimum alcohol pricing</strong> (50p per unit, introduced 2018 — the first in the UK), and the <strong>National Minimum Wage / National Living Wage</strong> (a price floor in the labour market).`
        ]
      },
      {
        title: 'Effects, Advantages & Disadvantages',
        points: [
          `<strong>Advantages</strong>: guarantees minimum income for producers, protecting farmers from the volatile swings of commodity markets. For demerit goods, higher prices discourage consumption — Scotland's minimum alcohol pricing showed early evidence of reduced alcohol-related hospital admissions, especially among heavy drinkers who previously bought cheap, high-strength products.`,

          `<strong>Disadvantages</strong>: the surplus is the core problem. The EU's notorious <strong>"butter mountains" and "wine lakes"</strong> were produced at guaranteed prices and stockpiled at enormous taxpayer expense — often eventually destroyed or dumped on developing-country markets, undermining local farmers. Consumer prices are artificially high, and a <strong>deadweight loss</strong> is created.`,

          `In <strong>labour markets</strong>, a minimum wage set above equilibrium could theoretically cause <strong>unemployment</strong> among low-skilled workers. But the empirical evidence — Card and Krueger's landmark US study and extensive UK data since the National Living Wage — suggests employment effects are often small, especially when the floor is set close to the market rate. This remains one of the most actively debated topics in economics.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Whether a minimum price is good policy depends entirely on the specific market. For demerit goods (alcohol), it reduces harmful overconsumption. For labour markets, it can reduce in-work poverty. For agricultural commodities, it creates waste and distortion. Context is everything — and strong exam answers make that point explicitly.</p></div>`
        ],
        examTip: `The minimum wage is a price floor — examiners love this application. Discuss the theoretical prediction (surplus = unemployment) vs the empirical evidence (effects often small). The best answers explain why theory and evidence might diverge: monopsony power, efficiency wages, and low elasticity of labour demand.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 4: Tradeable Pollution Permits
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Tradeable Pollution Permits',
    concepts: [
      {
        title: 'How They Work',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Cap and trade combines government planning with market forces: the government sets a cap on total emissions, issues permits up to that limit, and lets firms trade them — so emission reductions happen wherever they are cheapest.</p></div>`,

          `<div class="flow-chain"><span class="pill blue">Government caps total emissions</span><span class="arrow">→</span><span class="pill blue">Issues tradeable permits</span><span class="arrow">→</span><span class="pill pos">Low-cost abaters cut &amp; sell permits</span><span class="arrow">→</span><span class="pill pos">High-cost abaters buy permits</span><span class="arrow">→</span><span class="pill pos">Environmental target met at lowest cost</span></div>`,

          `The <strong>EU Emissions Trading System (EU ETS)</strong> is the world's largest carbon market, covering power stations, heavy industry, and airlines across 27 member states. It creates a carbon price that incentivises long-term investment in cleaner technology. By progressively tightening the cap, the government ratchets down total emissions on a predictable schedule.`,

          `Key advantage over a tax: cap and trade <strong>guarantees the quantity of emissions</strong> (the cap sets the environmental ceiling). A tax sets the <em>price</em> of polluting but cannot guarantee how much pollution actually results — firms might simply absorb the tax and keep emitting.`
        ]
      },
      {
        title: 'Evaluation',
        points: [
          `<strong>Advantages</strong>: achieves environmental targets cost-effectively, creates a market-driven incentive for clean technology investment, provides certainty about total emission levels, and can generate government revenue if permits are auctioned rather than given away free (as the EU ETS now largely does).`,

          `<strong>Problems</strong>: if the cap is set <strong>too generously</strong> — as the EU initially did — the carbon price collapses to near-zero and provides no incentive whatsoever to cut emissions. The scheme becomes meaningless. <strong>Price volatility</strong> in permit markets makes long-term investment planning difficult, and industries lobby aggressively for free allocations, diluting the scheme's effectiveness.`,

          `<strong>Monitoring and enforcement</strong> are costly — regulators must verify that firms actually hold permits matching their actual emissions. There's also a risk of <strong>pollution hotspots</strong>: trading permits between regions doesn't prevent concentrated pollution in one area, which can be devastating for local communities even when the national total stays within the cap.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The scheme works only as well as the cap is set. Too loose and it's pointless; too tight and it drives up costs, potentially pushing firms to relocate to unregulated countries (carbon leakage). Compare with a carbon tax: "A tax provides price certainty but quantity uncertainty; cap and trade provides quantity certainty but price uncertainty."</p></div>`
        ],
        examTip: `Compare cap and trade with a carbon tax: "A tax provides price certainty but quantity uncertainty; cap and trade provides quantity certainty but price uncertainty." This comparison shows high-level understanding of the trade-offs between the two approaches.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 5: State Provision & Provision of Information
   * ────────────────────────────────────────────────────────── */
  {
    title: 'State Provision & Provision of Information',
    concepts: [
      {
        title: 'State Provision',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>State provision is essential for public goods (the free-rider problem makes private supply impossible) and merit goods (ensuring consumption doesn't depend on ability to pay).</p></div>`,

          `For <strong>public goods</strong>, the logic is airtight: the free-rider problem means no private firm will supply national defence, street lighting, or flood defences. The government provides them, funded by taxation — compulsory payment that eliminates free riding. For <strong>merit goods</strong>, state provision ensures universal access: the NHS provides healthcare free at the point of use, and state schools provide free education up to 18, overcoming both information failure and the inability of poorer households to pay.`
        ]
      },
      {
        title: 'Evaluation of State Provision',
        points: [
          `<strong>Advantages</strong>: ensures universal access regardless of income, overcomes the free-rider problem for public goods, corrects underconsumption of merit goods, and can significantly reduce inequality in access to essential services.`,

          `<strong>Problems</strong>: significant <strong>opportunity cost</strong> — resources devoted to state provision cannot fund other priorities. Without a profit motive, there is potential for <strong>productive inefficiency</strong> (the NHS has faced criticism for management layers and bureaucratic inertia). <strong>Political influence</strong> can distort allocation, directing spending to marginal constituencies rather than areas of greatest need.`,

          `State provision does not mean the state must <em>produce</em> the good — governments can fund provision while outsourcing delivery. The NHS uses private contractors for many services; state schools can be run by academy trusts. This hybrid model attempts to combine universal access with the competitive efficiency of private delivery.`
        ]
      },
      {
        title: 'Provision of Information',
        points: [
          `<div class="content-subhead">The Least Intrusive Intervention</div><strong>Information provision</strong> targets the root cause of information failure directly: health warnings on cigarette packs, nutritional labelling, public health campaigns like the UK's "Change4Life," financial literacy programmes, and school drug education. It gives consumers the knowledge they need to make better-informed decisions.`,

          `It's cheap compared to other interventions, does not restrict individual freedom (you are informed, not forced), and can be powerfully effective over time: UK anti-smoking campaigns contributed to a halving of smoking rates since the 1970s. Mandatory calorie counts on restaurant menus (introduced for large UK chains in 2022) aim to gradually shift eating habits without coercion.`
        ]
      },
      {
        title: 'Evaluation of Information Provision',
        points: [
          `<strong>Advantages</strong>: low cost, preserves consumer sovereignty and freedom of choice, targets the root cause of the market failure (information gaps), and can produce long-lasting cultural shifts in behaviour.`,

          `<strong>Problems</strong>: information provision relies on people actually <em>acting</em> on what they learn, which behavioural economics tells us they frequently don't. <strong>Addiction</strong> overrides information — smokers know cigarettes kill, yet they still smoke. <strong>Present bias</strong> means people heavily discount future harm — a teenager won't lose sleep over lung cancer at 60. <strong>Information overload</strong> means warnings get tuned out — when was the last time you read the small print on anything?`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Information provision works best as part of a <strong>policy package</strong> — combine it with taxes, regulation, or behavioural nudges for greater impact. On its own, it's often too slow and too weak to address serious demerit-good problems, but it's an excellent complement to stronger interventions.</p></div>`
        ],
        examTip: `Information provision is often the "safe" intervention to recommend — it's cheap and non-coercive. But always acknowledge its limitations: behavioural economics shows people don't always act on information. The best answers combine information with other policies for a multi-pronged approach.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 6: Regulation & Deregulation
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Regulation & Deregulation',
    concepts: [
      {
        title: 'Regulation',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Regulation is command-and-control intervention: the government sets legal rules that firms and individuals must follow, backed by the force of law. It is direct, certain, and — for outright bans on dangerous activities — irreplaceable.</p></div>`,

          `Examples span every sector: emission limits on vehicles, health and safety standards in workplaces, minimum food hygiene requirements, financial regulations (capital adequacy ratios for banks), smoking bans in public places, and planning permission for new developments. <strong>Advantages</strong>: regulation is essential for outright bans on genuinely dangerous substances (asbestos, CFCs, lead in petrol — all eliminated through regulation), provides legal certainty, and protects consumers and workers from harm.`
        ]
      },
      {
        title: 'Evaluation of Regulation',
        points: [
          `<strong>Problems</strong>: <strong>costly enforcement</strong> (inspection, monitoring, and prosecution all require taxpayer funding), <strong>one-size-fits-all</strong> rules that ignore how compliance costs vary hugely between firms (a standard cheap for a multinational might bankrupt a start-up), and the insidious risk of <strong>regulatory capture</strong> — the industry being regulated effectively gains influence over the regulator, ensuring rules serve its interests rather than the public's.`,

          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>The 2008 financial crisis is partly attributed to regulatory failure — regulators either didn't understand the complex instruments banks were trading, or were too cosy with the industry to challenge them. Regulation can also stifle innovation: overly strict rules may prevent new firms from entering or new products from reaching market. Always weigh the protection regulation provides against the compliance costs and innovation it may suppress.</p></div>`
        ]
      },
      {
        title: 'Deregulation',
        points: [
          `<div class="content-subhead">Removing Rules to Promote Competition</div><strong>Deregulation</strong> means removing or reducing regulations to promote competition, efficiency, and innovation. The UK deregulated bus services in the 1980s, telecoms in the 1990s, and energy markets to introduce competition. The theory: more competition drives prices down, improves quality, and stimulates dynamic efficiency.`,

          `<strong>Advantages</strong>: lower prices from increased competition, greater consumer choice, reduced compliance costs for firms, and innovation driven by competitive pressure. UK telecoms deregulation ended BT's monopoly and sparked massive investment in broadband and mobile networks — transforming connectivity for millions.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Problems</strong>: deregulation of financial markets in the US and UK during the 1990s and 2000s contributed directly to the excessive risk-taking that caused the 2008 crisis. Some regulation exists for very good reasons — removing it without understanding what it was preventing can be catastrophic. Deregulation can also reduce quality and safety standards, and may increase monopoly power if one dominant firm swallows competitors once barriers are lifted.</p></div>`
        ]
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 7: Government Failure
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Government Failure',
    concepts: [
      {
        title: 'What Is Government Failure?',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Government failure occurs when intervention makes things worse — either creating a net welfare loss or failing to correct the original market failure. It is the mirror image of market failure, and it is why we can never simply assume that intervention improves outcomes.</p></div>`,

          `This does not mean the government should never intervene — it means every intervention carries risks and costs that must be weighed against the market failure it is trying to fix. The question is always: does the cure do more good than harm?`
        ]
      },
      {
        title: 'Causes',
        points: [
          `<div class="content-subhead">Why Good Intentions Go Wrong</div><strong>Imperfect information</strong>: governments don't know the exact MEC, MEB, or the optimal level of output. Setting a carbon tax too high or too low, subsidising the wrong amount, or regulating based on incomplete data — each leads to suboptimal outcomes that may be worse than the original market failure.`,

          `<strong>Unintended consequences</strong>: policies create ripple effects nobody anticipated. EU biofuel mandates — intended to cut carbon emissions — led to tropical deforestation in Indonesia and Brazil as farmers cleared rainforest for biofuel crops, actually <em>increasing</em> net emissions. The UK's Help to Buy scheme — designed to help first-time buyers — inflated house prices further, making the affordability problem worse.`,

          `<strong>Administrative and compliance costs</strong>: every regulation requires enforcement, monitoring, inspections, and bureaucracy — all consuming resources with an opportunity cost. If these costs exceed the benefits of the intervention, the policy produces a net welfare loss.`,

          `<strong>Political self-interest</strong>: governments make decisions with the next election in mind. Short-term vote-winning policies — tax cuts before elections, spending directed at marginal constituencies — may not align with what long-term economic efficiency requires.`,

          `<strong>Regulatory capture</strong>: the industry being regulated gains influence over the regulator through lobbying, revolving-door employment, and information advantage. A regulator who expects to work for the industry next year has weak incentives to impose tough rules today. The result: regulation that protects incumbent firms from competition rather than protecting the public from harm.`,

          `<strong>Moral hazard from intervention itself</strong>: if firms expect bailouts, they take more risk. If workers expect the state to provide, they may reduce personal effort. The very act of intervening can change incentives in counterproductive ways — the 2008 "too big to fail" bailouts are the starkest illustration.`
        ]
      },
      {
        title: 'Examples',
        points: [
          `<div class="content-subhead">Real-World Government Failures</div><strong>EU Common Agricultural Policy (CAP)</strong>: minimum prices created enormous surpluses — "butter mountains" and "wine lakes" — stockpiled at huge taxpayer expense. Food was destroyed or dumped on developing-country markets, undermining the very farmers in the Global South who needed market access most.`,

          `<strong>Rent controls worldwide</strong>: in New York, Berlin, and Stockholm, price ceilings on rent created chronic housing shortages, reduced private investment in new housing, deteriorated building quality, and generated black markets — often harming the low-income tenants they were meant to protect. Stockholm's waiting list stretches beyond 20 years.`,

          `<strong>Financial deregulation before 2008</strong>: removing banking regulations was supposed to boost innovation and efficiency. Instead, it enabled the excessive risk-taking that caused the worst financial crisis since the 1930s, requiring hundreds of billions in taxpayer-funded bailouts across the US, UK, and Europe.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p><strong>Biofuel mandates</strong> designed to reduce carbon emissions incentivised deforestation in Indonesia and Brazil (to grow palm oil and sugarcane), releasing more carbon than the biofuels saved. Each example illustrates a different cause of government failure — memorise three or four and match each to its cause (poor information, unintended consequences, regulatory capture) for full evaluation marks.</p></div>`
        ],
        examTip: `Real examples are essential for government failure questions. Memorise 3–4: CAP surpluses, rent control shortages, 2008 financial deregulation, biofuel deforestation. Each illustrates a different cause — poor information, unintended consequences, regulatory capture. Match the example to the cause for full marks.`
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
   *  Block 8: Evaluation of Government Intervention Methods
   * ────────────────────────────────────────────────────────── */
  {
    title: 'Evaluation of Government Intervention Methods',
    concepts: [
      {
        title: 'Comparing Methods',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>No single intervention method is universally best. Market-based tools, command-and-control rules, information campaigns, and state provision each have distinctive strengths and weaknesses — the optimal policy mix depends on the specific market failure.</p></div>`,

          `<strong>Market-based interventions</strong> (taxes, subsidies, tradeable permits) work <em>with</em> market forces — they change price signals and let firms and consumers decide how to respond. They are flexible and cost-effective, but require accurate information about externality values that governments rarely possess.`,

          `<strong>Command-and-control interventions</strong> (regulation, bans, maximum and minimum prices) directly mandate behaviour. They are indispensable for absolute limits — you cannot gradually "incentivise" firms to stop using asbestos — but they are inflexible and do not provide ongoing incentives for improvement beyond the mandated standard.`,

          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p><strong>Information-based interventions</strong> (labelling, campaigns, education) target information failure directly. They're cheap and preserve freedom, but behavioural economics shows they're often too slow and weak on their own. <strong>State provision</strong> ensures universal access but carries opportunity costs and efficiency risks. Avoid recommending just one tool — the best policy is almost always a combination.</p></div>`
        ]
      },
      {
        title: 'Key Evaluation Framework',
        points: [
          `The ultimate question for any intervention: does the <strong>benefit of correcting the market failure</strong> outweigh the <strong>cost of the intervention</strong> — including the risk of government failure?`,

          `Always ask: <strong>what's the counterfactual?</strong> What would happen without intervention? If the market failure is severe — toxic industrial pollution, no national defence, a pandemic with no vaccination programme — even imperfect intervention is better than doing nothing. If the market failure is mild, the cure may genuinely be worse than the disease.`,

          `Consider <strong>unintended consequences</strong>: does the intervention create new distortions? Rent controls solve short-term affordability but create long-term housing shortages. Biofuel mandates reduce oil dependence but accelerate deforestation. The ripple effects matter as much as the direct effects.`,

          `Evaluate <strong>distributional effects</strong>: who wins and who loses? A carbon tax is allocatively efficient but may be regressive — hitting low-income households hardest. A subsidy helps consumers but costs all taxpayers. Always consider equity alongside efficiency, because examiners reward this breadth of analysis.`,

          `Consider the <strong>time horizon</strong>: information campaigns and supply-side reforms take years to change behaviour; taxes and bans act faster. Short-term and long-term effects frequently point in opposite directions — a stimulus that works well during a recession may generate inflation during a boom.`,

          `The strongest exam answers avoid one-sided conclusions. Instead, structure your judgement: "The intervention is likely to reduce the externality because... However, the risk of government failure is significant due to... On balance, the net effect depends on..." This balanced framing is what mark schemes reward.`,

          `<div class="take-away"><div class="take-away-label">Take Away</div><p>In practice, the best approach is usually a <strong>combination of policies</strong>: taxes plus information provision for demerit goods, subsidies plus state provision for merit goods, regulation plus market-based instruments for pollution. No single tool is sufficient on its own — and the best evaluation makes that argument explicitly.</p></div>
<div class="section-links"><span class="link">↗ 1.5 Market Failure</span><span class="link">↗ 2.5 Macroeconomic Objectives</span></div>`
        ],
        examTip: `Structure your evaluation: (1) Identify the market failure and its severity, (2) Explain how the intervention corrects it, (3) Analyse effectiveness using elasticity, diagrams, and examples, (4) Consider government failure risks, (5) Reach a balanced judgement. This five-step structure guarantees you hit all mark-scheme points.`
      }
    ]
  }
],

};


async function main() {
  const ids = Object.keys(CONTENT);
  console.log(`Updating ${ids.length} content sections...\n`);
  for (const id of ids) {
    const content = CONTENT[id];
    const cc = content.reduce((s, b) => s + (b.concepts?.length || 0), 0);
    const pc = content.reduce((s, b) => s + (b.concepts || []).reduce((s2, c) => s2 + (c.points?.length || 0), 0), 0);
    const { error } = await supabase.from('section_content').update({ data: content }).eq('section_id', id);
    if (error) console.log(`  ✗ ${id}: ${error.message}`);
    else console.log(`  ✓ ${id} — ${content.length} blocks, ${cc} concepts, ${pc} points`);
  }
  console.log('\nDone.');
}
main();
