/**
 * RICH NOTES — Economics Unit 3, Part 2 (3.3.3, 3.3.4, 3.3.5)
 * =============================================================
 * Edexcel IAL Economics Unit 3, spec points 3.3.3 – 3.3.5
 *
 * Sections:
 *   3.3.3 Market Structures & Contestability  (market-structures-contestability)
 *   3.3.4 Labour Markets                      (labour-markets)
 *   3.3.5 Government Intervention             (government-intervention-firms)
 *
 * Run with: node scripts/update-economics-unit3-rich-notes-part2.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);


/* ═══════════════════════════════════════════════════════════════
 *  3.3.3 — MARKET STRUCTURES & CONTESTABILITY
 *
 *  8 chapters: Spectrum of Structures, Perfect Competition,
 *  Monopolistic Competition, Oligopoly Characteristics,
 *  Game Theory & Collusion, Monopoly, Contestable Markets,
 *  Price Discrimination
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_333 = [

  {
    title: "Spectrum of Market Structures",
    meta: "4 concepts",
    keyIdea: "Market structure is a spectrum from perfect competition to pure monopoly — each point on the spectrum is defined by the number of firms, barriers to entry, product differentiation, and the degree of price-setting power.",
    blocks: [
      {
        title: "KEY CHARACTERISTICS",
        items: [
          { type: "def", text: "<strong>Market structure</strong> — the competitive environment in which a firm operates, determined by the number and size of firms, barriers to entry, product differentiation, and information availability." },
          { type: "mech", text: "The spectrum runs: <strong>perfect competition → monopolistic competition → oligopoly → monopoly</strong>, with increasing market power and barriers to entry at each stage." },
          { type: "mech", text: "As we move toward monopoly, firms gain <strong>price-making power</strong> — they face a downward-sloping demand curve and can influence the market price by changing their output." },
          { type: "imp", text: "Examiners expect you to identify the market structure from a scenario by checking: how many firms? Are products differentiated? Are there barriers to entry? Can firms influence price?", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Many firms, no barriers → perfect competition", "Many firms, differentiated products → monopolistic competition", "Few large firms, high barriers → oligopoly", "One firm, very high barriers → monopoly"],
      result: "Market power and barriers increase along the spectrum",
      resultType: "neutral"
    },
    examMatters: "Examiners ask you to compare market structures. Use a table approach: columns for number of firms, barriers to entry, product type, price-making power, long-run profit, and efficiency. This earns structure marks.",
    misconception: "Students treat market structures as rigid categories. In reality, most real-world markets are somewhere between the textbook models. Instead write: market structures are theoretical benchmarks — use them as tools for analysis, not exact descriptions of reality.",
    takeaway: [
      "Market structure depends on: number of firms, barriers, product differentiation, information.",
      "The spectrum runs from perfect competition (no power) to monopoly (maximum power).",
      "Most real markets fall between the textbook extremes."
    ]
  },

  {
    title: "Perfect Competition",
    meta: "6 concepts",
    keyIdea: "Perfect competition is the benchmark of efficiency — many small firms selling identical products at the market price, with free entry and exit ensuring that only normal profit survives in the long run.",
    blocks: [
      {
        title: "CHARACTERISTICS",
        items: [
          { type: "def", text: "<strong>Perfect competition</strong> — a market with many buyers and sellers, homogeneous products, perfect information, no barriers to entry or exit, and all firms are price takers.", tag: "exam" },
          { type: "mech", text: "Each firm is a <strong>price taker</strong>: it faces a perfectly elastic (horizontal) demand curve at the market price, so AR = MR = P." },
          { type: "mech", text: "Firms are so small relative to the market that no individual firm can influence the price — they accept the market-determined price." }
        ]
      },
      {
        title: "SHORT-RUN EQUILIBRIUM",
        items: [
          { type: "mech", text: "In the short run, a perfectly competitive firm can earn <strong>supernormal profit</strong> if P > ATC at the profit-maximising output (MC = MR)." },
          { type: "mech", text: "If P < ATC but P > AVC, the firm makes a loss but continues to operate in the short run because it covers its variable costs and contributes toward fixed costs." },
          { type: "imp", text: "The firm's short-run supply curve is the MC curve above the AVC curve — it shows how much the firm will supply at each price.", tag: "exam" }
        ]
      },
      {
        title: "LONG-RUN EQUILIBRIUM",
        items: [
          { type: "mech", text: "Supernormal profit attracts new entrants → market supply shifts right → price falls until <strong>P = ATC</strong> (normal profit only)." },
          { type: "mech", text: "At long-run equilibrium: P = MC (allocative efficiency) and P = min ATC (productive efficiency). No firm earns supernormal profit.", tag: "exam" },
          { type: "link", text: "Perfect competition achieves static efficiency but not dynamic efficiency — firms have no supernormal profit to invest in R&D, linking to the efficiency trade-off debate." }
        ]
      }
    ],
    flow: {
      steps: ["Firms earn supernormal profit", "New firms enter (no barriers)", "Supply increases, price falls", "Long-run: P = MC = min ATC, normal profit only"],
      result: "Perfect competition achieves allocative and productive efficiency in the long run",
      resultType: "good"
    },
    examMatters: "Examiners expect two diagrams: short-run (showing supernormal profit) and long-run (showing normal profit). Draw the market diagram (S & D) alongside the firm diagram (MC, ATC, AR = MR). Always show the adjustment process.",
    misconception: "Students say perfect competition is 'the best' market structure. Wrong because while it achieves static efficiency, it fails on dynamic efficiency since firms have no profit to fund innovation. Instead write: perfect competition is allocatively and productively efficient, but may not be dynamically efficient.",
    takeaway: [
      "Price taker: AR = MR = P (horizontal demand curve for each firm).",
      "Long-run equilibrium: P = MC = min ATC → allocative + productive efficiency.",
      "No supernormal profit in the long run → limited dynamic efficiency."
    ]
  },

  {
    title: "Monopolistic Competition",
    meta: "4 concepts",
    keyIdea: "Monopolistic competition gives firms a small amount of market power through product differentiation, but free entry ensures that supernormal profit is competed away in the long run — leaving firms with excess capacity.",
    blocks: [
      {
        title: "CHARACTERISTICS",
        items: [
          { type: "def", text: "<strong>Monopolistic competition</strong> — many firms selling differentiated products with low barriers to entry; each firm has a small downward-sloping demand curve.", tag: "exam" },
          { type: "mech", text: "Product differentiation (branding, quality, location) gives each firm a degree of <strong>price-making power</strong> — they face a downward-sloping AR curve, unlike in perfect competition." }
        ]
      },
      {
        title: "SHORT AND LONG RUN",
        items: [
          { type: "mech", text: "Short run: firms can earn supernormal profit if their brand is strong enough (P > ATC at MC = MR output)." },
          { type: "mech", text: "Long run: new firms enter with similar products → each firm's demand curve shifts left → profit falls to <strong>normal profit</strong> (AR tangent to ATC)." },
          { type: "imp", text: "In long-run equilibrium the firm produces on the downward-sloping part of ATC, not at its minimum — this means <strong>excess capacity</strong> and no productive efficiency.", tag: "exam" },
          { type: "link", text: "Monopolistic competition links to non-price competition from Unit 1: firms compete through branding, advertising, and product design rather than just price." }
        ]
      }
    ],
    flow: {
      steps: ["Differentiated products give some pricing power", "Short-run supernormal profit possible", "Free entry erodes profit in the long run"],
      result: "Long-run normal profit but productive inefficiency (excess capacity)",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to show that in long-run equilibrium the AR curve is tangent to ATC — not at the minimum of ATC. This tangency creates a gap between actual output and efficient output (excess capacity).",
    misconception: "Students think monopolistic competition is just like monopoly because the demand curve slopes downward. Wrong because low barriers to entry mean supernormal profit is competed away. Instead write: monopolistic competition shares features of both models — some pricing power like monopoly, but free entry like perfect competition.",
    takeaway: [
      "Many firms + differentiated products + low barriers = monopolistic competition.",
      "Long run: AR tangent to ATC → normal profit but excess capacity.",
      "Neither allocatively nor productively efficient, but offers consumer choice."
    ]
  },

  {
    title: "Oligopoly: Characteristics",
    meta: "5 concepts",
    keyIdea: "Oligopoly is defined by interdependence — each firm's best strategy depends on what rivals do, creating a tension between competing aggressively and colluding for mutual benefit.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Oligopoly</strong> — a market dominated by a few large firms with high barriers to entry, where each firm's decisions affect and are affected by rivals' decisions.", tag: "exam" },
          { type: "def", text: "<strong>Concentration ratio</strong> — the combined market share of the largest firms (e.g. a 5-firm concentration ratio of 60% means the top 5 firms hold 60% of the market)." },
          { type: "def", text: "<strong>Interdependence</strong> — each firm must consider rivals' likely reactions before making pricing or output decisions; this is the defining feature of oligopoly." }
        ]
      },
      {
        title: "THE KINKED DEMAND CURVE",
        items: [
          { type: "mech", text: "If an oligopolist raises price, rivals do <strong>not follow</strong> — customers switch to cheaper rivals, so demand is elastic above the current price." },
          { type: "mech", text: "If an oligopolist cuts price, rivals <strong>match the cut</strong> — nobody gains market share, so demand is inelastic below the current price." },
          { type: "mech", text: "This creates a <strong>kink</strong> in the demand curve at the current price, with a gap in the MR curve that explains price stickiness.", tag: "exam" },
          { type: "imp", text: "The kinked demand model explains why prices in oligopolies are sticky even when costs change — as long as MC stays within the gap in the MR curve, the profit-maximising output does not change." }
        ]
      }
    ],
    flow: {
      steps: ["Few dominant firms with high barriers", "Each firm's decisions affect rivals", "Kinked demand creates price rigidity"],
      result: "Prices tend to be sticky in oligopoly unless there is a major cost shock",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to draw the kinked demand curve with the gap in MR. Show MC passing through the gap and explain that small cost changes do not change the profit-maximising output or price.",
    misconception: "Students think the kinked demand curve explains how the price is set. Wrong — it only explains why the price is sticky once set. It does not explain how the initial price was determined. Instead write: the kinked demand model is a theory of price rigidity, not a theory of price determination.",
    takeaway: [
      "Oligopoly = few firms + high barriers + interdependence.",
      "Kinked demand explains price stickiness, not price determination.",
      "The gap in MR means costs can change without affecting the optimal price."
    ]
  },

  {
    title: "Game Theory and Collusion",
    meta: "5 concepts",
    keyIdea: "Oligopolists face a prisoner's dilemma — they would all be better off colluding on high prices, but each firm has an individual incentive to cheat, making cartels inherently unstable.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Game theory</strong> — a framework for analysing strategic decision-making where the outcome depends on the choices of multiple players who are interdependent." },
          { type: "def", text: "<strong>Collusion</strong> — firms agreeing (formally or tacitly) to restrict competition by fixing prices, limiting output, or dividing markets.", tag: "exam" },
          { type: "def", text: "<strong>Cartel</strong> — a formal agreement between firms to collude, typically by setting a common price and allocating output quotas; illegal in most countries." },
          { type: "def", text: "<strong>Tacit collusion</strong> — firms coordinate behaviour without an explicit agreement, often through price leadership where smaller firms follow the dominant firm's pricing." }
        ]
      },
      {
        title: "THE PRISONER'S DILEMMA",
        items: [
          { type: "mech", text: "If both firms collude (charge high price), both earn high profit. If one cheats (cuts price), the cheater gains at the other's expense.", tag: "exam" },
          { type: "mech", text: "The <strong>dominant strategy</strong> for each firm is to cheat, because cheating is better regardless of what the rival does — leading to a sub-optimal outcome for both." },
          { type: "imp", text: "Cartels are unstable because every member has an incentive to secretly increase output above their quota, undercutting the agreed price to steal market share." },
          { type: "link", text: "Game theory links to competition policy (3.3.5): regulators use leniency programs that reward the first firm to report cartel behaviour, exploiting the incentive to cheat." }
        ]
      }
    ],
    flow: {
      steps: ["Firms recognise mutual benefit of high prices", "Form cartel or tacit agreement", "Individual incentive to cheat breaks the agreement"],
      result: "Cartels are inherently unstable — the prisoner's dilemma undermines cooperation",
      resultType: "bad"
    },
    examMatters: "Examiners often present a payoff matrix and ask you to identify the dominant strategy and Nash equilibrium. Show that the rational outcome (both cheat) is worse for both firms than the cooperative outcome (both collude) — this is the prisoner's dilemma.",
    misconception: "Students assume firms always collude in oligopoly. Wrong because the prisoner's dilemma shows that cheating is the dominant strategy. Instead write: while collusion would maximise joint profit, each firm has an incentive to cheat, making cartels unstable unless enforced by strong external mechanisms.",
    takeaway: [
      "Game theory analyses strategic decisions where outcomes depend on rivals' actions.",
      "The prisoner's dilemma: rational individual behaviour leads to a collectively worse outcome.",
      "Cartels are unstable because each member has an incentive to cheat on the agreement."
    ]
  },

  {
    title: "Monopoly",
    meta: "6 concepts",
    keyIdea: "A monopolist is the sole seller in a market protected by high barriers to entry, giving it the power to set prices above competitive levels — but whether this harms consumers depends on whether the firm innovates.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Pure monopoly</strong> — a single firm supplies the entire market; the firm's demand curve is the market demand curve.", tag: "exam" },
          { type: "def", text: "<strong>Legal monopoly</strong> — in UK/EU competition law, a firm with 25%+ market share; this is the practical definition used by regulators." },
          { type: "def", text: "<strong>Natural monopoly</strong> — an industry where the MES is so large relative to market demand that only one firm can produce at minimum average cost." }
        ]
      },
      {
        title: "MONOPOLY EQUILIBRIUM",
        items: [
          { type: "mech", text: "A monopolist profit-maximises at MC = MR and charges the price on the AR curve above that output — earning <strong>supernormal profit</strong> in both the short and long run." },
          { type: "mech", text: "P > MC → allocative inefficiency (too little is produced). The firm does not produce at min ATC → productive inefficiency.", tag: "exam" },
          { type: "imp", text: "The <strong>deadweight welfare loss</strong> is the triangle between the competitive output (where P = MC) and the monopoly output, representing the lost consumer and producer surplus." }
        ]
      },
      {
        title: "ARGUMENTS FOR AND AGAINST MONOPOLY",
        items: [
          { type: "mech", text: "<strong>Against</strong>: higher prices, lower output, allocative and productive inefficiency, X-inefficiency, reduced consumer choice." },
          { type: "mech", text: "<strong>For</strong>: supernormal profits fund R&D (dynamic efficiency), economies of scale may lower costs, cross-subsidisation of loss-making services, natural monopoly arguments." },
          { type: "link", text: "Schumpeter argued that monopoly profits are the engine of innovation — temporary monopoly power rewards risk-taking and funds research that benefits consumers in the long run." }
        ]
      }
    ],
    flow: {
      steps: ["Single firm, high barriers to entry", "Profit max at MC = MR, price from AR curve", "P > MC → deadweight loss"],
      result: "Supernormal profit persists; allocatively and productively inefficient",
      resultType: "bad"
    },
    examMatters: "Examiners expect you to draw the monopoly diagram: downward-sloping AR, MR (twice as steep), U-shaped MC and ATC. Show supernormal profit as the shaded rectangle between AR and ATC. Mark deadweight loss. Then evaluate using the efficiency trade-off.",
    misconception: "Students say monopoly is always bad. Wrong because monopolies can achieve dynamic efficiency through R&D funded by supernormal profits, and natural monopolies benefit from economies of scale. Instead write: whether a monopoly is harmful depends on whether it passes on cost savings to consumers and reinvests profits in innovation.",
    takeaway: [
      "Monopoly: single firm, high barriers, P > MC, supernormal profit persists.",
      "Deadweight welfare loss from restricted output and higher prices.",
      "Key debate: static inefficiency vs dynamic efficiency (the Schumpeter argument)."
    ]
  },

  {
    title: "Contestable Markets",
    meta: "5 concepts",
    keyIdea: "Market structure alone does not determine competition — what matters is whether new firms can easily enter and exit, because the threat of entry disciplines even a monopolist to keep prices competitive.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Contestable market</strong> — a market where entry and exit are free (no sunk costs), so the threat of potential competition keeps prices close to competitive levels even if few firms actually operate.", tag: "exam" },
          { type: "def", text: "<strong>Sunk costs</strong> — costs that cannot be recovered if a firm exits the market (e.g. advertising spend, specialised equipment); they are the key barrier to contestability." },
          { type: "def", text: "<strong>Hit-and-run entry</strong> — firms enter a market to exploit supernormal profits and exit when profits are competed away, without incurring unrecoverable costs." }
        ]
      },
      {
        title: "WHY CONTESTABILITY MATTERS",
        items: [
          { type: "mech", text: "In a perfectly contestable market, even a monopolist earns only <strong>normal profit</strong> because any supernormal profit would attract hit-and-run entrants." },
          { type: "mech", text: "The key insight: it is not the number of firms that determines competitive behaviour, but the <strong>threat of potential entry</strong>." },
          { type: "imp", text: "Policy implication: rather than breaking up large firms, governments can improve competition by <strong>reducing barriers to entry</strong> (deregulation, reducing sunk costs, open access).", tag: "exam" },
          { type: "link", text: "Contestability links to competition policy (3.3.5): regulators focus on reducing barriers rather than targeting firm size, because a contestable monopoly can behave competitively." }
        ]
      }
    ],
    flow: {
      steps: ["Low sunk costs → easy entry and exit", "Threat of entry disciplines incumbents", "Even a monopoly behaves competitively"],
      result: "Contestable markets achieve near-competitive outcomes regardless of market structure",
      resultType: "good"
    },
    examMatters: "Examiners love asking whether a market is contestable. Look for: sunk costs (high = not contestable), regulatory barriers, brand loyalty, and switching costs. Conclude by saying whether the threat of entry is credible.",
    misconception: "Students confuse barriers to entry with sunk costs. Barriers to entry include all factors that prevent new firms from entering (legal, brand loyalty, economies of scale). Sunk costs are a specific type that cannot be recovered. Instead write: sunk costs are the critical barrier to contestability specifically — other barriers affect entry but only sunk costs determine whether exit is costless.",
    takeaway: [
      "Contestability depends on sunk costs and freedom of entry/exit, not firm numbers.",
      "Hit-and-run entry means even monopolies can face competitive discipline.",
      "Policy focus: reduce sunk costs and barriers to entry to increase contestability."
    ]
  },

  {
    title: "Price Discrimination",
    meta: "5 concepts",
    keyIdea: "Price discrimination allows a firm with market power to charge different prices to different consumers for the same product, extracting more consumer surplus and potentially increasing both profit and output.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Price discrimination</strong> — charging different prices to different consumers for the same product, where the price difference is not justified by cost differences.", tag: "exam" },
          { type: "def", text: "<strong>First-degree</strong> — each consumer is charged their maximum willingness to pay; all consumer surplus is extracted. Theoretical ideal." },
          { type: "def", text: "<strong>Second-degree</strong> — prices vary by quantity purchased (e.g. bulk discounts) or version (e.g. economy vs business class)." },
          { type: "def", text: "<strong>Third-degree</strong> — different prices for different groups of consumers (e.g. student discounts, peak vs off-peak); the most common form in practice." }
        ]
      },
      {
        title: "CONDITIONS AND EVALUATION",
        items: [
          { type: "mech", text: "Three conditions needed: the firm must have <strong>price-making power</strong>, be able to <strong>separate markets</strong>, and prevent <strong>resale</strong> between groups." },
          { type: "mech", text: "Price discrimination can <strong>increase output</strong> above the single-price monopoly level because the firm serves consumers who would otherwise be priced out." },
          { type: "imp", text: "Whether price discrimination benefits consumers depends on the context: it can increase access (student discounts) but also extract surplus from those with inelastic demand.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Firm has market power", "Identifies groups with different PED", "Charges higher price where demand is inelastic"],
      result: "Higher profit for the firm; ambiguous welfare effects for consumers",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to state the three conditions, classify the type of price discrimination, and evaluate the welfare effects. Always consider: does total output increase? Are some consumers better off (those who now gain access) while others are worse off (those charged more)?",
    misconception: "Students say price discrimination always harms consumers. Wrong because it can increase output and allow consumers with lower willingness to pay to access the product (e.g. off-peak rail fares). Instead write: price discrimination transfers consumer surplus to producers but can increase total welfare if it raises output and gives access to previously excluded consumers.",
    takeaway: [
      "Three types: 1st (individual), 2nd (quantity), 3rd (group) — 3rd is most common.",
      "Conditions: market power + market separation + no resale.",
      "Welfare effects are ambiguous — output may rise but surplus is transferred to the firm."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  3.3.4 — LABOUR MARKETS
 *
 *  6 chapters: Demand for Labour, Supply of Labour, Wage
 *  Determination, Monopsony, Trade Unions, Wage Differentials
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_334 = [

  {
    title: "Demand for Labour (MRP Theory)",
    meta: "5 concepts",
    keyIdea: "A firm's demand for labour is derived from the demand for its product — it hires workers up to the point where the extra revenue a worker generates equals the extra cost of employing them.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Derived demand</strong> — the demand for labour exists not for its own sake but because workers produce goods and services that consumers want.", tag: "exam" },
          { type: "def", text: "<strong>Marginal revenue product (MRP)</strong> — the extra revenue a firm earns from employing one more worker; MRP = MPP × MR." },
          { type: "def", text: "<strong>Marginal physical product (MPP)</strong> — the extra output produced by one more worker, holding other factors constant." }
        ]
      },
      {
        title: "HOW MRP DETERMINES HIRING",
        items: [
          { type: "mech", text: "A profit-maximising firm hires workers until <strong>MRP = wage (MCL)</strong>; hiring beyond this point means the worker costs more than they generate." },
          { type: "mech", text: "The MRP curve slopes downward due to <strong>diminishing marginal returns</strong> — each extra worker adds less output, so MRP falls.", tag: "exam" },
          { type: "mech", text: "The MRP curve is the firm's demand curve for labour: at a higher wage, fewer workers are demanded; at a lower wage, more are demanded." },
          { type: "link", text: "MRP connects to the law of diminishing returns from 3.3.2 — the same mechanism that creates U-shaped cost curves drives the downward-sloping labour demand curve." }
        ]
      }
    ],
    formula: { label: "MARGINAL REVENUE PRODUCT", text: "MRP = MPP × MR" },
    flow: {
      steps: ["Consumer demand creates demand for product", "Firm needs workers to produce", "Hire until MRP = wage"],
      result: "MRP curve = the firm's demand curve for labour",
      resultType: "good"
    },
    examMatters: "Examiners expect you to draw MRP = DL and explain why it slopes downward (diminishing returns). The profit-maximising hiring rule is MRP = MCL (cost of one more worker). If the wage rises, the firm moves up the MRP curve and hires fewer workers.",
    misconception: "Students confuse labour demand with product demand. Labour demand is derived — it depends on product demand and worker productivity. Instead write: the demand for labour is derived from the demand for the product; a rise in product demand shifts the MRP curve right, increasing the quantity of labour demanded.",
    takeaway: [
      "Labour demand is derived from product demand — MRP = MPP × MR.",
      "The MRP curve is the labour demand curve; it slopes down due to diminishing returns.",
      "Profit-maximising hiring: employ up to where MRP = wage (MCL)."
    ]
  },

  {
    title: "Supply of Labour",
    meta: "4 concepts",
    keyIdea: "The supply of labour to a market depends on wages and non-monetary factors, while the individual worker's supply curve can bend backward when income effects outweigh substitution effects at high wages.",
    blocks: [
      {
        title: "DETERMINANTS",
        items: [
          { type: "mech", text: "The <strong>wage rate</strong> is the main determinant — higher wages attract more workers into the occupation, all else equal." },
          { type: "mech", text: "<strong>Non-monetary factors</strong> affect supply: job security, working conditions, status, location, holidays, and opportunities for progression." },
          { type: "mech", text: "The supply of labour to a specific occupation depends on <strong>transferable skills</strong>, training requirements, and qualifications needed." },
          { type: "imp", text: "Government policies affect labour supply: immigration rules, retirement age, benefits (reservation wage), education and training schemes.", tag: "exam" }
        ]
      },
      {
        title: "THE BACKWARD-BENDING SUPPLY CURVE",
        items: [
          { type: "mech", text: "At low wages, the <strong>substitution effect</strong> dominates: higher wages make work more attractive than leisure, so labour supply increases." },
          { type: "mech", text: "At very high wages, the <strong>income effect</strong> dominates: workers can afford the same standard of living with fewer hours, so they choose more leisure and supply fewer hours." },
          { type: "link", text: "The backward-bending supply curve links to PED concepts from Unit 1 — it shows how the same factor (wages) can have opposite effects at different levels." }
        ]
      }
    ],
    flow: {
      steps: ["Wage rises from low level", "Substitution effect: work more", "At high wage, income effect kicks in", "Worker cuts hours: backward bend"],
      result: "Individual labour supply bends backward at high wages; market supply usually slopes up",
      resultType: "neutral"
    },
    examMatters: "Examiners may ask you to draw and explain the backward-bending supply curve. Most exam questions focus on the market supply curve (upward-sloping) rather than the individual curve, so check which one the question asks for.",
    misconception: "Students assume labour supply always slopes upward. Wrong because at very high wages workers may prefer leisure. Instead write: the market supply of labour to an occupation typically slopes upward, but the individual labour supply curve can bend backward when the income effect of higher wages outweighs the substitution effect.",
    takeaway: [
      "Labour supply depends on wages, non-monetary factors, and government policy.",
      "Individual supply may bend backward; market supply to an occupation slopes upward.",
      "Substitution effect dominates at low wages; income effect dominates at high wages."
    ]
  },

  {
    title: "Wage Determination in Competitive Markets",
    meta: "4 concepts",
    keyIdea: "In a competitive labour market, wages are determined by the interaction of demand (MRP) and supply of labour — just as product prices are set by demand and supply in goods markets.",
    blocks: [
      {
        title: "EQUILIBRIUM WAGE",
        items: [
          { type: "def", text: "<strong>Competitive labour market</strong> — many employers and many workers, no single party can influence the wage; wage is set where labour demand (MRP) = labour supply.", tag: "exam" },
          { type: "mech", text: "At the equilibrium wage, the quantity of labour demanded equals the quantity supplied — there is no involuntary unemployment in this market." },
          { type: "mech", text: "If demand for the product rises, MRP shifts right → equilibrium wage and employment both increase." }
        ]
      },
      {
        title: "SHIFTS IN DEMAND AND SUPPLY",
        items: [
          { type: "mech", text: "Labour demand shifts with: changes in <strong>product demand</strong>, changes in worker productivity, changes in the price of substitute/complement factors (e.g. automation)." },
          { type: "mech", text: "Labour supply shifts with: <strong>migration</strong>, changes in non-monetary factors, education/training availability, demographic changes." },
          { type: "link", text: "Wage determination links to market equilibrium from Unit 1 — the same demand-supply framework applies, with wages as the 'price' and employment as the 'quantity'." }
        ]
      }
    ],
    flow: {
      steps: ["Labour demand (MRP) meets labour supply", "Equilibrium wage determined", "Shifts in either curve change wage and employment"],
      result: "Competitive wage = MRP at the equilibrium level of employment",
      resultType: "good"
    },
    examMatters: "Examiners expect a clear labour market diagram: wage on y-axis, quantity of labour on x-axis, DL (= MRP) and SL intersecting at the equilibrium. Show how shifts in demand or supply change the wage and employment level.",
    misconception: "Students think all workers are paid the same in a competitive market. Wrong because different occupations have different MRP curves (based on productivity and product demand) and different supply conditions. Instead write: the competitive model explains wage determination within a single labour market; wage differentials between markets arise from differences in MRP and supply.",
    takeaway: [
      "Competitive wage set where DL (MRP) = SL at the equilibrium employment level.",
      "Product demand, productivity, and technology shift labour demand.",
      "Migration, education, and demographics shift labour supply."
    ]
  },

  {
    title: "Monopsony in Labour Markets",
    meta: "5 concepts",
    keyIdea: "A monopsonist is the sole buyer of labour in a market, giving it the power to drive wages below the competitive level — creating a welfare loss and a case for minimum wage intervention.",
    blocks: [
      {
        title: "DEFINITION",
        items: [
          { type: "def", text: "<strong>Monopsony</strong> — a labour market with a single (or dominant) employer who has the power to influence wages by varying the number of workers it employs.", tag: "exam" }
        ]
      },
      {
        title: "HOW MONOPSONY WORKS",
        items: [
          { type: "mech", text: "To hire more workers, the monopsonist must <strong>raise the wage for all workers</strong>, not just the new hire. This makes the marginal cost of labour (MCL) higher than the average cost of labour (ACL = supply curve)." },
          { type: "mech", text: "The MCL curve lies <strong>above the supply curve</strong> because each extra worker raises the wage bill for all existing workers too.", tag: "exam" },
          { type: "mech", text: "Profit-maximising hiring: employ where MCL = MRP, then pay the wage on the <strong>supply curve</strong> below, not on the MRP curve — resulting in a wage below the competitive level." },
          { type: "imp", text: "The gap between MRP and the wage represents <strong>exploitation</strong> — the worker is paid less than their marginal revenue product.", tag: "exam" }
        ]
      },
      {
        title: "POLICY IMPLICATIONS",
        items: [
          { type: "mech", text: "A <strong>minimum wage</strong> set between the monopsony wage and the competitive wage can increase both wages and employment — a result that contradicts the standard competitive model." },
          { type: "link", text: "Monopsony links to government intervention (3.3.5): it provides the economic justification for minimum wages and explains why they do not always cause unemployment." }
        ]
      }
    ],
    flow: {
      steps: ["Single employer dominates market", "MCL > supply curve", "Hires at MCL = MRP, pays lower wage from supply curve"],
      result: "Wage below competitive level, employment below competitive level — exploitation",
      resultType: "bad"
    },
    examMatters: "Examiners expect the full monopsony diagram: SL (= ACL), MCL above it, MRP = DL. Show the monopsony wage (below competitive) and monopsony employment (below competitive). Then show how a minimum wage between these levels can increase both wage and employment.",
    misconception: "Students think minimum wages always cause unemployment. Wrong because in a monopsony market, a carefully set minimum wage can increase employment by eliminating the firm's incentive to restrict hiring. Instead write: the employment effect of a minimum wage depends on market structure — in competitive markets it may cause unemployment, but in monopsony markets it can increase employment.",
    takeaway: [
      "Monopsony: single buyer of labour, MCL above supply curve, wage < MRP.",
      "Workers are 'exploited' — paid below their marginal revenue product.",
      "A minimum wage can increase both wages and employment in a monopsony."
    ]
  },

  {
    title: "Trade Unions",
    meta: "4 concepts",
    keyIdea: "Trade unions shift the balance of power in labour markets by bargaining collectively for higher wages and better conditions — but the impact on employment depends on the employer's market power.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Trade union</strong> — an organisation of workers that collectively bargains with employers over wages, working conditions, and employment terms." },
          { type: "def", text: "<strong>Collective bargaining</strong> — negotiations between union representatives and employers to agree on wages and conditions for all members.", tag: "exam" }
        ]
      },
      {
        title: "EFFECTS ON WAGES AND EMPLOYMENT",
        items: [
          { type: "mech", text: "In a competitive labour market, a union acts like a <strong>monopoly seller of labour</strong> — it can push the wage above the equilibrium, but this reduces the quantity of labour demanded." },
          { type: "mech", text: "Against a monopsonist, the union acts as a <strong>countervailing power</strong> — pushing wages closer to the competitive level without necessarily reducing employment.", tag: "exam" },
          { type: "mech", text: "Unions can also raise productivity through improved morale, reduced labour turnover, and investment in training — shifting the MRP curve right." },
          { type: "link", text: "The bilateral monopoly model (union vs monopsony) results in an <strong>indeterminate wage</strong> — the outcome depends on the relative bargaining power of each side." }
        ]
      }
    ],
    flow: {
      steps: ["Union negotiates higher wage", "In competitive market: higher wage → lower employment", "Against monopsony: wage rises with little/no job loss"],
      result: "The employment effect depends on the employer's market power",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to analyse unions differently depending on market structure. In a competitive market, unions cause a trade-off (higher wages vs fewer jobs). Against a monopsonist, unions can raise wages without reducing employment. Always state which model applies.",
    misconception: "Students say unions always cause unemployment. Wrong because against a monopsonist employer, union power acts as a corrective — pushing wages up toward the competitive level without reducing employment. Instead write: the employment effect of unions depends on whether the labour market is competitive or monopsonistic.",
    takeaway: [
      "Unions bargain collectively to raise wages above what individual workers could achieve.",
      "In competitive markets: higher wages → lower employment (trade-off).",
      "Against monopsony: unions act as countervailing power with little/no job loss."
    ]
  },

  {
    title: "Wage Differentials",
    meta: "5 concepts",
    keyIdea: "Wages differ across occupations and individuals because of differences in labour demand (productivity, MRP), labour supply (skills, barriers to entry), and market imperfections that prevent wages from equalising.",
    blocks: [
      {
        title: "CAUSES OF DIFFERENTIALS",
        items: [
          { type: "mech", text: "<strong>Compensating wage differentials</strong> — higher pay compensates for unpleasant, dangerous, or unsociable working conditions (e.g. oil rig workers, night shifts)." },
          { type: "mech", text: "<strong>Human capital</strong> — workers with more education, training, and experience have higher productivity (MRP), so firms pay them more." },
          { type: "mech", text: "<strong>Barriers to entry</strong> — professional qualifications (doctors, lawyers) restrict labour supply, keeping wages high for those inside the profession.", tag: "exam" },
          { type: "mech", text: "<strong>Discrimination</strong> — wages may differ due to gender, race, or other characteristics unrelated to productivity, representing a market failure." }
        ]
      },
      {
        title: "WHY DIFFERENTIALS PERSIST",
        items: [
          { type: "mech", text: "Labour is <strong>not perfectly mobile</strong>: geographical immobility (housing costs, family ties) and occupational immobility (lack of transferable skills) prevent workers from moving to higher-paid jobs." },
          { type: "imp", text: "Wage differentials serve an important <strong>signalling function</strong>: they direct workers toward occupations where demand is high and away from occupations with excess supply.", tag: "exam" },
          { type: "link", text: "Wage differentials link to inequality and poverty (Unit 4): persistent differentials based on discrimination or lack of opportunity contribute to income inequality." }
        ]
      }
    ],
    flow: {
      steps: ["Differences in MRP, skills, conditions, and barriers", "Labour immobility prevents equalisation", "Differentials persist across occupations"],
      result: "Wages differ due to demand, supply, and market imperfections",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to explain wage differentials using demand and supply analysis: shifts in MRP (demand) or changes in the supply of labour to specific occupations. Use real-world examples and always consider whether the differential is justified by productivity or reflects discrimination.",
    misconception: "Students say all wage differentials are unfair. Wrong because many differentials reflect genuine differences in skills, risk, and productivity. Instead write: some differentials are economically justified (compensating for risk or rewarding human capital) while others reflect discrimination or market imperfections.",
    takeaway: [
      "Differentials arise from: compensating factors, human capital, barriers, discrimination.",
      "Labour immobility (geographical and occupational) prevents wage equalisation.",
      "Differentials signal where labour is scarce — they allocate resources."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
 *  3.3.5 — GOVERNMENT INTERVENTION
 *
 *  5 chapters: Competition Policy, Regulation, Privatisation
 *  & Nationalisation, Government Failure in Intervention,
 *  Minimum Wage (as intervention)
 * ═══════════════════════════════════════════════════════════════ */

const NOTES_335 = [

  {
    title: "Competition Policy",
    meta: "5 concepts",
    keyIdea: "Competition policy aims to promote competitive markets and prevent the abuse of market power, using a toolkit that ranges from blocking mergers to fining cartels and breaking up dominant firms.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Competition policy</strong> — government laws and regulations designed to promote competition, prevent monopoly abuse, and protect consumer welfare.", tag: "exam" },
          { type: "def", text: "<strong>CMA (Competition and Markets Authority)</strong> — the UK regulator responsible for investigating mergers, anti-competitive behaviour, and market failures." },
          { type: "def", text: "<strong>Substantial lessening of competition (SLC)</strong> — the legal test used by the CMA to decide whether a merger should be blocked or approved with conditions." }
        ]
      },
      {
        title: "TOOLS AND EVALUATION",
        items: [
          { type: "mech", text: "Merger control: the CMA investigates whether proposed mergers would <strong>substantially lessen competition</strong> and may block them, approve them, or require the firm to sell off parts of the business." },
          { type: "mech", text: "Anti-cartel enforcement: <strong>leniency programs</strong> offer reduced penalties to the first firm that reports a cartel, exploiting the prisoner's dilemma to break collusive agreements." },
          { type: "mech", text: "Market investigations: the CMA can investigate entire markets where competition appears weak and impose <strong>remedies</strong> such as price caps, divestment, or behavioural rules." },
          { type: "imp", text: "Competition policy involves a trade-off: too much intervention discourages investment and risk-taking; too little allows monopoly abuse and consumer harm.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Identify market power or anti-competitive behaviour", "CMA investigates", "Remedies: block, divest, fine, or regulate"],
      result: "More competitive markets with lower prices and greater choice for consumers",
      resultType: "good"
    },
    examMatters: "Examiners expect you to evaluate competition policy by weighing the benefits (lower prices, more choice) against the costs (regulatory burden, risk of discouraging innovation). Use the efficiency framework: does the policy improve allocative efficiency without damaging dynamic efficiency?",
    misconception: "Students assume competition policy always makes markets more efficient. Wrong because regulation has costs (compliance, bureaucracy) and may discourage risk-taking if firms fear being penalised for success. Instead write: effective competition policy targets genuine abuse while preserving incentives for innovation and growth.",
    takeaway: [
      "Competition policy: merger control, anti-cartel enforcement, market investigations.",
      "CMA uses the 'substantial lessening of competition' test for mergers.",
      "Trade-off: promoting competition vs preserving incentives for innovation."
    ]
  },

  {
    title: "Regulation of Monopoly",
    meta: "5 concepts",
    keyIdea: "When breaking up a monopoly is impractical (especially natural monopolies), regulators use price caps and profit controls to mimic competitive outcomes without destroying economies of scale.",
    blocks: [
      {
        title: "REGULATORY APPROACHES",
        items: [
          { type: "def", text: "<strong>Price cap regulation (RPI – X)</strong> — prices can rise by inflation minus an efficiency factor X, forcing the firm to cut costs each year to maintain profits.", tag: "exam" },
          { type: "def", text: "<strong>Rate of return regulation</strong> — the firm is allowed to earn a 'fair' rate of return on its capital; used more commonly in the US." },
          { type: "def", text: "<strong>Quality regulation</strong> — regulators set minimum service standards to prevent firms from cutting costs at the expense of quality." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "RPI – X gives firms an <strong>incentive to cut costs</strong> below the target because they keep the extra profit — this promotes productive efficiency." },
          { type: "mech", text: "Rate of return regulation creates an incentive to <strong>over-invest in capital</strong> (the Averch-Johnson effect) because a larger capital base allows higher absolute profits." },
          { type: "imp", text: "Setting X correctly requires <strong>asymmetric information</strong>: the regulator knows less about costs than the firm, creating a risk of regulatory capture or inefficient targets.", tag: "exam" },
          { type: "link", text: "Regulation links to government failure: if the regulator is captured by the industry or sets X too low, the firm earns supernormal profit at consumers' expense." }
        ]
      }
    ],
    flow: {
      steps: ["Natural monopoly identified", "Regulator sets RPI – X price cap", "Firm has incentive to cut costs below X"],
      result: "Prices fall in real terms while the firm can still earn profit if it becomes more efficient",
      resultType: "good"
    },
    examMatters: "Examiners expect you to compare RPI – X with rate of return regulation. RPI – X promotes cost-cutting; rate of return promotes over-investment. Always mention the information asymmetry problem — the regulator cannot perfectly observe costs.",
    misconception: "Students think regulation always works. Wrong because regulators face information asymmetry, regulatory capture (becoming too close to the industry), and the difficulty of setting the right level of X. Instead write: regulation is a second-best solution — it improves on unregulated monopoly but cannot perfectly replicate competitive outcomes.",
    takeaway: [
      "RPI – X caps price rises and incentivises cost-cutting; rate of return risks over-investment.",
      "Information asymmetry and regulatory capture are key problems for regulators.",
      "Regulation is second-best — better than no intervention, but imperfect."
    ]
  },

  {
    title: "Privatisation and Nationalisation",
    meta: "5 concepts",
    keyIdea: "The debate between public and private ownership is ultimately about incentives — private firms face competitive pressure and profit motive, while state-owned firms pursue social objectives but may lack efficiency incentives.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Privatisation</strong> — transferring ownership of a state-owned enterprise to the private sector, typically through a share sale.", tag: "exam" },
          { type: "def", text: "<strong>Nationalisation</strong> — transferring ownership of a private firm to the state, often for strategic industries (energy, rail, healthcare)." }
        ]
      },
      {
        title: "ARGUMENTS FOR PRIVATISATION",
        items: [
          { type: "mech", text: "Private owners face <strong>profit incentive</strong> to cut costs, innovate, and respond to consumer demand — reducing X-inefficiency." },
          { type: "mech", text: "Share prices act as a <strong>discipline mechanism</strong>: poor performance leads to falling share price and potential takeover." },
          { type: "mech", text: "Privatisation reduces government borrowing needs and may generate a <strong>one-off revenue windfall</strong> from the share sale." }
        ]
      },
      {
        title: "ARGUMENTS AGAINST PRIVATISATION",
        items: [
          { type: "mech", text: "Natural monopolies may simply become <strong>private monopolies</strong> without competition, requiring ongoing regulation to prevent abuse." },
          { type: "mech", text: "Private firms may <strong>cherry-pick</strong> profitable services and abandon unprofitable ones that serve a social purpose (e.g. rural bus routes)." },
          { type: "imp", text: "The case for privatisation depends on whether effective competition or regulation exists to discipline the private firm — without it, privatisation may just transfer monopoly power from public to private hands.", tag: "exam" },
          { type: "link", text: "This debate links to contestability: privatisation works best when the market is contestable; if barriers to entry remain high, regulation must substitute for competition." }
        ]
      }
    ],
    flow: {
      steps: ["State-owned firm may be X-inefficient", "Privatisation introduces profit motive", "But natural monopoly may need regulation"],
      result: "Privatisation improves efficiency only if accompanied by competition or regulation",
      resultType: "neutral"
    },
    examMatters: "Examiners want balanced evaluation: acknowledge that privatisation can improve efficiency through the profit motive, but only if there is competition or effective regulation. Use the concept of X-inefficiency and natural monopoly to structure your argument.",
    misconception: "Students assume privatisation always increases efficiency. Wrong because if a state monopoly becomes a private monopoly without effective regulation, consumers may face higher prices and lower quality. Instead write: privatisation improves efficiency when there is competition or effective regulation to discipline the firm; without these, it may simply transfer monopoly rents to private shareholders.",
    takeaway: [
      "Privatisation: profit motive + share price discipline → potential efficiency gains.",
      "Nationalisation: social objectives + universal provision, but X-inefficiency risk.",
      "Privatisation without competition or regulation just creates a private monopoly."
    ]
  },

  {
    title: "Government Failure in Intervention",
    meta: "4 concepts",
    keyIdea: "Government intervention to correct market failure can itself fail — through regulatory capture, information problems, unintended consequences, and political short-termism.",
    blocks: [
      {
        title: "TYPES OF GOVERNMENT FAILURE",
        items: [
          { type: "def", text: "<strong>Government failure</strong> — when intervention leads to a net welfare loss, making the outcome worse than the original market failure it was trying to correct.", tag: "exam" },
          { type: "mech", text: "<strong>Regulatory capture</strong> — regulators become too sympathetic to the industry they regulate, setting rules that protect incumbent firms rather than consumers." },
          { type: "mech", text: "<strong>Information failure</strong> — the government lacks the information needed to set optimal prices, output levels, or efficiency targets." },
          { type: "mech", text: "<strong>Unintended consequences</strong> — policies may create perverse incentives; e.g. rent controls intended to help tenants can reduce housing supply." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "imp", text: "The existence of market failure does not automatically justify intervention — the cure may be worse than the disease if government failure is severe.", tag: "exam" },
          { type: "mech", text: "Political short-termism means governments may favour policies that win votes today over policies that maximise long-term welfare." },
          { type: "link", text: "Government failure links to Unit 1's analysis of intervention (taxes, subsidies, price controls) — always ask: could the intervention make things worse?" }
        ]
      }
    ],
    flow: {
      steps: ["Market failure identified", "Government intervenes", "Intervention creates unintended consequences or regulatory capture"],
      result: "Net welfare may fall — government failure can be worse than market failure",
      resultType: "bad"
    },
    examMatters: "Examiners reward you for evaluating government intervention by considering government failure. Always weigh the costs of market failure against the costs of government failure. The best answers conclude with 'it depends' on the quality of information, regulatory design, and political incentives.",
    misconception: "Students assume government intervention always corrects market failure. Wrong because intervention faces its own problems: asymmetric information, regulatory capture, and political incentives. Instead write: intervention improves welfare only if the costs of government failure are less than the costs of the original market failure.",
    takeaway: [
      "Government failure: intervention makes things worse through capture, info gaps, or perverse incentives.",
      "The cure can be worse than the disease — always evaluate both sides.",
      "Best answers weigh market failure costs against government failure costs."
    ]
  },

  {
    title: "Minimum Wage as Labour Market Intervention",
    meta: "4 concepts",
    keyIdea: "The minimum wage is one of the most debated interventions in economics — its effect on employment depends entirely on the structure of the labour market it is applied to.",
    blocks: [
      {
        title: "DEFINITION",
        items: [
          { type: "def", text: "<strong>National minimum wage (NMW)</strong> — a legally enforced floor price for labour, set above the market equilibrium to protect low-paid workers.", tag: "exam" }
        ]
      },
      {
        title: "COMPETITIVE MARKET ANALYSIS",
        items: [
          { type: "mech", text: "In a <strong>competitive labour market</strong>, a minimum wage above equilibrium creates a surplus of labour (unemployment) because quantity supplied exceeds quantity demanded." },
          { type: "mech", text: "The extent of unemployment depends on the <strong>elasticity of demand for labour</strong>: if demand is inelastic (few substitutes for workers), unemployment is small." }
        ]
      },
      {
        title: "MONOPSONY MARKET ANALYSIS",
        items: [
          { type: "mech", text: "In a <strong>monopsony</strong>, the minimum wage can increase both wages and employment by eliminating the firm's incentive to restrict hiring.", tag: "exam" },
          { type: "mech", text: "The minimum wage effectively becomes the new MCL (flat up to the minimum, then jumps to the original MCL), causing the firm to hire more workers at the higher wage." },
          { type: "link", text: "This is a key evaluation point for any minimum wage question: the employment effect depends on market structure, and most low-wage labour markets have some degree of monopsony power." }
        ]
      }
    ],
    flow: {
      steps: ["Government sets NMW above equilibrium", "Competitive market: surplus of labour (unemployment)", "Monopsony: wage and employment can both rise"],
      result: "Employment effect depends on the structure of the labour market",
      resultType: "neutral"
    },
    examMatters: "Examiners always reward you for distinguishing between the competitive and monopsony models when evaluating minimum wages. Draw both diagrams and explain why the outcomes differ. The best answers consider which model is more realistic for low-paid labour markets.",
    misconception: "Students say minimum wages always cause unemployment. Wrong because in monopsony markets they can increase employment. Instead write: the employment effect of a minimum wage depends on market structure — it causes unemployment in competitive markets but can increase employment in monopsony markets.",
    takeaway: [
      "Minimum wage above equilibrium → unemployment in competitive markets.",
      "In monopsony: minimum wage can increase both wages and employment.",
      "Always state which market model you are using — this is essential for evaluation marks."
    ]
  }
];


/* ═══════════════════════════════════════════════════════════
 *  PUSH TO SUPABASE
 * ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'market-structures-contestability', label: '3.3.3 Market Structures & Contestability', notes: NOTES_333 },
  { id: 'labour-markets',                   label: '3.3.4 Labour Markets',                    notes: NOTES_334 },
  { id: 'government-intervention-firms',     label: '3.3.5 Government Intervention',           notes: NOTES_335 },
];

async function main() {
  let allSuccess = true;
  for (const section of SECTIONS) {
    console.log(`\n── ${section.label} ──`);
    console.log(`   Section ID : ${section.id}`);
    console.log(`   Chapters   : ${section.notes.length}`);

    const { error } = await supabase
      .from('section_notes')
      .update({ data: section.notes })
      .eq('section_id', section.id);

    if (error) {
      console.error(`   ✗ FAILED: ${error.message}`);
      allSuccess = false;
    } else {
      console.log('   ✓ SUCCESS — pushed to Supabase.');
    }
  }
  console.log(allSuccess ? '\n✅ All sections updated.' : '\n⚠️  Some sections failed.');
}

main();
