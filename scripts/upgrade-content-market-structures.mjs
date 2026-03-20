/**
 * UPGRADE — 3.3.3 Market Structures & Contestability
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-market-structures.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Perfect Competition & Monopolistic Competition
   * ═══════════════════════════════════════════════════ */
  {
    title: "Perfect Competition & Monopolistic Competition",
    sections: [
      {
        id: "perfect-competition",
        title: "Perfect Competition",
        keyIdea: "Many firms sell identical products and are price takers — in the long run, freedom of entry competes away all supernormal profit, leaving firms earning just normal profit at P = MC.",
        body: [
          { type: "paragraph", text: "**Perfect competition** is a market structure with many firms, each selling a **homogeneous (identical) product**. Because no single firm is large enough to influence the market price, each is a **price taker** — it accepts the price set by market supply and demand. This means the firm's demand curve is perfectly elastic: AR = MR = P." },
          { type: "paragraph", text: "In the **short run**, a perfectly competitive firm can earn supernormal profit if the market price is above average total cost. However, because there are **no barriers to entry**, new firms are attracted by supernormal profit. As they enter, market supply shifts right, the price falls, and supernormal profit is competed away. In **long-run equilibrium**, each firm earns **normal profit** only (AR = ATC). At this point, the firm produces where **P = MC** (allocative efficiency) and at the **minimum point of ATC** (productive efficiency)." },
          { type: "flow", steps: ["Firms earn supernormal profit", "New firms enter the market", "Market supply increases", "Market price falls"], result: "Normal profit only in long run — allocative and productive efficiency achieved", resultType: "good" }
        ],
        realExample: { emoji: "🌾", text: "Agricultural commodity markets like wheat approximate perfect competition. Thousands of farmers sell an identical product, no single farmer can influence the world price, and entry barriers are relatively low — making them price takers in a global market." },
        misconception: "Students say perfectly competitive firms earn no profit. Wrong — they earn normal profit, which is the minimum return needed to keep the entrepreneur in the industry. Supernormal (above-normal) profit is what gets competed away. Instead write: in long-run equilibrium, firms earn normal profit — enough to stay in business, but no more.",
        examMatters: "Examiners expect you to draw the two-panel diagram: the market (supply and demand setting the price) and the firm (horizontal AR = MR = P line, with MC and ATC). Practise showing the shift from short-run supernormal profit to long-run normal profit — this is one of the most frequently tested diagram sequences."
      },
      {
        id: "monopolistic-competition",
        title: "Monopolistic Competition",
        keyIdea: "Many firms sell differentiated products with low barriers to entry — supernormal profit is possible in the short run, but entry competes it away, leaving excess capacity in the long run.",
        body: [
          { type: "paragraph", text: "**Monopolistic competition** combines elements of both perfect competition and monopoly. There are **many firms**, each selling a **slightly differentiated product** — think different restaurant cuisines, branding, or quality levels. Because products are not identical, each firm has a small degree of market power and faces a **downward-sloping demand curve**." },
          { type: "paragraph", text: "In the **short run**, firms can earn supernormal profit if demand is strong enough. But because **barriers to entry are low**, new firms enter, attracted by profit. Entry shifts each existing firm's demand curve leftward (customers are shared among more firms). In **long-run equilibrium**, the AR curve is **tangent to the ATC curve** — the firm earns normal profit only. Crucially, the tangency point is **not at the minimum of ATC**, meaning the firm has **excess capacity** — it could produce more at a lower average cost but chooses not to." },
          { type: "flow", steps: ["Firms earn supernormal profit", "Low barriers attract new entrants", "Each firm's demand shifts left", "AR tangent to ATC"], result: "Normal profit but excess capacity — firms produce below the cost-minimising output", resultType: "neutral" }
        ],
        realExample: { emoji: "🍽️", text: "The restaurant industry is a classic example of monopolistic competition. Hundreds of restaurants in any city sell differentiated meals (Italian, Thai, vegan), entry costs are low, and while a popular new restaurant may earn supernormal profit initially, rival openings soon erode it." },
        misconception: "Students confuse monopolistic competition with monopoly because of the similar name. Wrong — monopolistic competition has many firms and low barriers, whereas monopoly has one firm and high barriers. Instead write: the 'monopolistic' part refers only to product differentiation giving a small degree of pricing power, not to dominance.",
        examMatters: "The key diagram skill is drawing the long-run tangency: AR just touching ATC at exactly one point, to the left of ATC's minimum. Examiners penalise diagrams where AR cuts through ATC (that would show supernormal or subnormal profit, not normal profit). Label the excess capacity gap clearly."
      }
    ],
    takeaway: [
      "Perfect competition: P = MC and minimum ATC in long run — the benchmark for static efficiency.",
      "Monopolistic competition: normal profit in long run but excess capacity due to product differentiation.",
      "In both structures, freedom of entry is the mechanism that competes away supernormal profit over time."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Oligopoly
   * ═══════════════════════════════════════════════════ */
  {
    title: "Oligopoly",
    sections: [
      {
        id: "oligopoly-kinked-demand",
        title: "Oligopoly Characteristics & the Kinked Demand Curve",
        keyIdea: "A market dominated by a few large interdependent firms — the kinked demand curve explains price stickiness because rivals match price cuts but ignore price rises.",
        body: [
          { type: "paragraph", text: "An **oligopoly** is a market dominated by a **few large firms** that together hold a significant share of total output. Key features include **high barriers to entry** (economies of scale, branding, patents), **interdependence** (each firm must consider rivals' reactions before changing price or output), and products that may be differentiated or homogeneous." },
          { type: "paragraph", text: "The **kinked demand curve** model explains why prices in oligopolies tend to be **sticky**. If one firm raises its price, rivals do not follow — the firm loses customers and demand is elastic above the current price. If the firm cuts its price, rivals match the cut to protect market share — demand is inelastic below the current price. This creates a **kink** at the prevailing price and a **discontinuous gap in the MR curve**. Costs can shift within this gap without changing the profit-maximising price or output." },
          { type: "flow", steps: ["Firm considers raising price", "Rivals do not follow — firm loses customers", "Firm considers cutting price", "Rivals match — little gain in market share"], result: "Price stickiness — prices tend to remain stable even when costs change", resultType: "neutral" }
        ],
        realExample: { emoji: "🛒", text: "The UK supermarket industry — dominated by Tesco, Sainsbury's, Asda, and Morrisons — is a classic oligopoly. When one supermarket launches a price-matching campaign, rivals respond immediately, making sustained price cuts unprofitable and keeping prices broadly stable." },
        misconception: "Students say oligopolies always charge high prices. Wrong — intense rivalry between interdependent firms can lead to price wars and competitive pricing. Instead write: oligopoly outcomes depend on whether firms compete or collude — interdependence can lead to either aggressive competition or tacit cooperation.",
        examMatters: "Examiners expect you to draw the kinked demand curve with the discontinuous MR gap. Show how a shift in MC that stays within the MR gap does not change price or output. This is the diagram that explains price rigidity — make sure the kink is clearly at the prevailing price level."
      },
      {
        id: "game-theory-collusion",
        title: "Game Theory, Collusion & Cartels",
        keyIdea: "The prisoner's dilemma shows why collusion is unstable — every cartel member has a dominant strategy to cheat by secretly increasing output, which is why most cartels eventually collapse.",
        body: [
          { type: "paragraph", text: "**Game theory** analyses strategic interaction between interdependent firms. The **prisoner's dilemma** illustrates the core problem: if both firms cooperate (keep prices high), they share monopoly profit. But each firm has a **dominant strategy to cheat** — cutting its price to steal market share. When both cheat, they end up worse off than if they had cooperated. This is the **Nash equilibrium**: neither firm can improve its position by changing strategy alone." },
          { type: "paragraph", text: "A **cartel** is a formal agreement between firms to fix prices, restrict output, or divide markets. By acting as a collective monopoly, cartel members can earn supernormal profit. However, cartels are **inherently unstable** because each member has an incentive to secretly increase output above its quota — gaining revenue at other members' expense. **Tacit collusion** avoids illegal agreements: firms follow a **price leader** (usually the largest firm) without explicit communication." },
          { type: "flow", steps: ["Firms form cartel to restrict output", "Each member tempted to cheat for extra revenue", "One firm secretly exceeds quota", "Others retaliate or cartel collapses"], result: "Cartels are unstable — the incentive to cheat undermines cooperation", resultType: "bad" }
        ],
        realExample: { emoji: "🛢️", text: "OPEC is the world's most prominent cartel, coordinating oil output among member nations. Yet OPEC regularly struggles with compliance — members like Iraq and Nigeria frequently exceed their production quotas to boost national revenue, undermining the cartel's ability to keep prices high." },
        misconception: "Students assume collusion always succeeds in raising prices. Wrong — collusion is difficult to maintain because the incentive to cheat is built into the structure. Instead write: collusion raises joint profits only if all members comply; the prisoner's dilemma shows why defection is the dominant strategy, making cartels inherently fragile.",
        examMatters: "Examiners love a simple 2x2 payoff matrix. Practise drawing one showing: mutual cooperation (high profit each), mutual cheating (low profit each), and the temptation payoff (one cheats while the other cooperates). Clearly identify the Nash equilibrium and explain why it differs from the jointly optimal outcome."
      }
    ],
    takeaway: [
      "Oligopoly = few firms, high barriers, interdependence — the kinked demand curve explains price stickiness.",
      "Game theory reveals why collusion is the jointly rational outcome but cheating is the individually rational strategy.",
      "Cartels like OPEC are unstable because every member has an incentive to secretly exceed its quota."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Monopoly
   * ═══════════════════════════════════════════════════ */
  {
    title: "Monopoly",
    sections: [
      {
        id: "monopoly-equilibrium-welfare",
        title: "Monopoly Equilibrium & Welfare Loss",
        keyIdea: "A monopolist sets MC = MR then reads price from the AR curve — charging P > MC creates allocative inefficiency and a deadweight loss triangle that represents lost consumer and producer surplus.",
        body: [
          { type: "paragraph", text: "A **pure monopoly** is a single firm that is the sole supplier in a market, protected by **high barriers to entry** (legal, technical, or strategic). The monopolist faces the entire market demand curve, which slopes downward — to sell more, it must lower the price on all units, so **MR < AR** at every output level." },
          { type: "paragraph", text: "The monopolist maximises profit at **MC = MR**, then charges the price consumers are willing to pay on the **AR (demand) curve** above. Because **P > MC**, the monopolist is **allocatively inefficient** — it produces too little and charges too much relative to the competitive outcome. The gap between the monopoly outcome and the competitive outcome creates a **deadweight loss triangle**, representing surplus that is lost to society entirely. Unlike in perfect competition, **supernormal profit persists in the long run** because barriers to entry prevent new firms from entering." },
          { type: "flow", steps: ["Monopolist sets MC = MR", "Reads price from AR curve above", "P > MC at equilibrium", "Output restricted below competitive level"], result: "Deadweight loss — allocative inefficiency with persistent supernormal profit", resultType: "bad" }
        ],
        realExample: { emoji: "🚰", text: "Thames Water is a regional monopoly supplying water to 15 million customers in London and the South East. Customers cannot switch supplier, giving Thames Water significant market power — which is why Ofwat regulates its prices to prevent exploitation." },
        misconception: "Students say monopolies are always bad for consumers. Wrong — monopolies can achieve economies of scale that lower costs, and supernormal profit can fund R&D and innovation (dynamic efficiency). Instead write: monopoly creates static inefficiency (deadweight loss) but may promote dynamic efficiency — the net effect depends on the specific market.",
        examMatters: "The monopoly diagram is the most important in the entire unit. Practise drawing: downward-sloping AR, MR below AR (twice the slope), MC = MR intersection to find output, then read price from AR. Shade the supernormal profit rectangle (P minus ATC times quantity) and the deadweight loss triangle. Label everything."
      },
      {
        id: "price-discrimination",
        title: "Price Discrimination",
        keyIdea: "Charging different prices to different consumers for the same product — it requires market power, consumer separation, and no resale, and can actually increase total output above the single-price level.",
        body: [
          { type: "paragraph", text: "**Price discrimination** occurs when a firm charges **different prices to different consumers** for the same product, where the price difference is not justified by cost differences. There are three degrees: **first-degree** (each consumer pays their maximum willingness to pay — all consumer surplus extracted), **second-degree** (different prices for different quantities — e.g. bulk discounts), and **third-degree** (different prices for different groups identified by elasticity — e.g. student discounts, peak pricing)." },
          { type: "paragraph", text: "Three conditions must hold: the firm must have **market power** (downward-sloping demand), it must be able to **separate consumers** into groups with different price elasticities, and there must be **no possibility of resale** between groups. Third-degree discrimination is the most common and exam-relevant: the firm charges a higher price in the market with inelastic demand and a lower price where demand is elastic." },
          { type: "paragraph", text: "A key evaluation point: price discrimination can **increase total output** above the single-price monopoly level. Some consumers who would have been priced out under a single price now receive the product at a lower price. This can improve allocative efficiency, though it also transfers consumer surplus to the producer." },
          { type: "flow", steps: ["Firm identifies groups with different elasticities", "Charges higher price to inelastic group", "Charges lower price to elastic group", "Total output rises above single-price level"], result: "Higher profit for the firm and potentially greater output — but consumer surplus is redistributed", resultType: "neutral" }
        ],
        realExample: { emoji: "🚂", text: "Train operators like Avanti West Coast charge vastly different fares for the same journey — peak-time commuters with inelastic demand pay far more than off-peak leisure travellers. The same seat, same route, same service, but different prices based on time of travel and willingness to pay." },
        misconception: "Students say price discrimination is always harmful to consumers. Wrong — third-degree discrimination can extend the market to price-sensitive consumers who would otherwise be excluded. Instead write: price discrimination redistributes surplus from consumers to the firm, but can increase total output and allow some consumers access to goods they could not otherwise afford.",
        examMatters: "Examiners test the three conditions (market power, separation, no resale) almost every session. For a top-band answer, draw two side-by-side diagrams: one for the inelastic market (high price) and one for the elastic market (low price), showing MC = MR in each. Explain that combined output exceeds the single-price monopoly level."
      }
    ],
    takeaway: [
      "Monopoly: MC = MR, price from AR, P > MC creates deadweight loss — supernormal profit persists in the long run.",
      "Price discrimination requires market power, consumer separation, and no resale — three conditions, always state them.",
      "Monopoly is statically inefficient but may be dynamically efficient — this trade-off is central to evaluation."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 4: Contestable Markets
   * ═══════════════════════════════════════════════════ */
  {
    title: "Contestable Markets",
    sections: [
      {
        id: "contestable-markets-theory",
        title: "Theory of Contestable Markets",
        keyIdea: "What disciplines firm behaviour is not the number of existing competitors but the threat of entry — if sunk costs are low, even a monopolist must price competitively or face hit-and-run entry.",
        body: [
          { type: "paragraph", text: "The theory of **contestable markets**, developed by William Baumol, argues that the **threat of entry** matters more than the actual number of firms in a market. A perfectly contestable market has **zero sunk costs** — meaning a firm can enter, compete, and exit without losing any investment. In such a market, even a single incumbent firm (a monopoly) would be forced to behave competitively." },
          { type: "paragraph", text: "The key concept is **hit-and-run entry**: if an incumbent earns supernormal profit, a new firm can enter, undercut the price, capture the profit, and exit before the incumbent can respond — provided there are no sunk costs trapping the entrant. **Sunk costs are the crucial barrier** to contestability: the higher the sunk costs (advertising, specialised equipment, brand building), the less contestable the market. Contestability shifts the focus from market structure to market behaviour — a monopoly in a contestable market may produce outcomes closer to perfect competition." },
          { type: "flow", steps: ["Incumbent earns supernormal profit", "Low sunk costs make entry easy", "Threat of hit-and-run entry", "Incumbent forced to lower price"], result: "Competitive behaviour despite few firms — the threat of entry disciplines the market", resultType: "good" }
        ],
        realExample: { emoji: "✈️", text: "The budget airline industry demonstrates contestability. Airlines like Ryanair and easyJet lease aircraft rather than buying them (reducing sunk costs), can quickly switch routes, and face low exit costs — making the threat of new entrants on any profitable route a constant discipline on pricing." },
        misconception: "Students say a market is contestable simply because there are few barriers to entry. Incomplete — contestability specifically requires low **sunk** costs, not just low entry barriers. Instead write: a market is contestable when sunk costs are low, allowing costless exit as well as easy entry — it is the ability to leave without loss that enables hit-and-run competition.",
        examMatters: "Examiners reward students who distinguish between fixed costs and sunk costs. A factory (fixed cost) can be resold; a national advertising campaign (sunk cost) cannot. Sunk costs are the true measure of contestability — always make this distinction explicitly in your answer."
      },
      {
        id: "evaluating-market-structures",
        title: "Evaluating Market Structures & Efficiency",
        keyIdea: "No single market structure achieves every type of efficiency — perfect competition delivers static efficiency but not dynamic, while monopoly may deliver dynamic efficiency but not static. This trade-off is the heart of competition policy.",
        body: [
          { type: "paragraph", text: "**Allocative efficiency** (P = MC) and **productive efficiency** (minimum ATC) are both achieved in long-run perfect competition. However, perfectly competitive firms earn only normal profit and have no funds for research and development — they lack **dynamic efficiency** (innovation and technological progress over time). The identical products and tiny firm sizes leave no room for investment in new processes or products." },
          { type: "paragraph", text: "**Monopoly** is the mirror image: persistent supernormal profit funds R&D and innovation (Schumpeter's argument for dynamic efficiency), but P > MC means allocative inefficiency and production may not occur at minimum ATC. The policy question becomes whether the long-run gains from innovation outweigh the short-run losses from higher prices and restricted output." },
          { type: "paragraph", text: "This trade-off is **central to competition policy**. Regulators like the CMA must weigh static efficiency losses (deadweight loss, higher prices) against potential dynamic efficiency gains (new products, lower future costs). Patent systems explicitly make this trade-off: they grant a **temporary monopoly** to incentivise innovation, accepting short-run inefficiency for long-run gains." },
          { type: "flow", steps: ["Perfect competition: static efficiency but no dynamic", "Monopoly: possible dynamic efficiency but static inefficiency", "Policy must weigh short-run costs vs long-run gains"], result: "No single structure is best — the optimal outcome depends on the specific market and time horizon", resultType: "neutral" }
        ],
        realExample: { emoji: "💊", text: "Pharmaceutical patents grant companies like Pfizer a 20-year monopoly on new drugs. The resulting high prices are allocatively inefficient, but without the monopoly profit incentive, firms would not invest the billions required for R&D — a deliberate policy trade-off between static and dynamic efficiency." },
        misconception: "Students rank market structures from best to worst and conclude perfect competition is always ideal. Wrong — perfect competition has zero dynamic efficiency, meaning no innovation, no new products, and no technological progress. Instead write: perfect competition is the benchmark for static efficiency, but the absence of supernormal profit means it cannot fund the R&D that drives long-run growth and consumer welfare improvements.",
        examMatters: "Top-band 25-mark essays always discuss the efficiency trade-off. Structure your evaluation: static efficiency favours perfect competition, dynamic efficiency may favour monopoly, and contestability shows that the threat of entry can achieve competitive outcomes regardless of structure. Conclude that the best policy depends on the specific market — there is no one-size-fits-all answer."
      }
    ],
    takeaway: [
      "Contestability: sunk costs are the key barrier — low sunk costs enable hit-and-run entry that disciplines incumbent behaviour.",
      "Perfect competition achieves static efficiency (P = MC, min ATC) but not dynamic efficiency (no R&D funds).",
      "The efficiency trade-off between market structures is the central evaluation point in competition policy questions."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.3 Market Structures & Contestability to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'market-structures-contestability');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 4 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
