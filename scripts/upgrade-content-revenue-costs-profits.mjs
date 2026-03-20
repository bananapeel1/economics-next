/**
 * UPGRADE — 3.3.2 Revenue, Costs and Profits
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-revenue-costs-profits.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Revenue Concepts
   * ═══════════════════════════════════════════════════ */
  {
    title: "Revenue Concepts",
    sections: [
      {
        id: "total-average-marginal-revenue",
        title: "Total, Average and Marginal Revenue",
        keyIdea: "TR = P × Q, AR = TR/Q = the demand curve, and MR falls twice as fast as AR — so MR turns negative while AR is still positive, the point where demand becomes inelastic.",
        body: [
          { type: "paragraph", text: "**Total revenue (TR)** is price multiplied by quantity: TR = P × Q. **Average revenue (AR)** is TR divided by Q, which simplifies to price — so the AR curve is the demand curve. **Marginal revenue (MR)** is the change in TR from selling one more unit." },
          { type: "paragraph", text: "For a firm facing a downward-sloping demand curve, cutting price to sell more has two effects: a **gain** (more units sold) and a **loss** (every existing unit now sells at the lower price). This is why MR falls faster than AR — the MR curve has exactly twice the gradient of a linear AR curve." },
          { type: "paragraph", text: "When demand is price elastic (PED > 1), cutting price raises TR because the quantity gain outweighs the price loss — MR is positive. When demand is inelastic (PED < 1), cutting price reduces TR — MR is negative. At unit elasticity (PED = 1), TR is maximised and MR = 0." },
          { type: "flow", steps: ["Firm lowers price to sell more", "Quantity rises but revenue per unit falls", "MR falls faster than AR", "MR hits zero at unit elasticity"], result: "Beyond this point MR is negative — cutting price reduces total revenue", resultType: "bad" }
        ],
        realExample: { emoji: "✈️", text: "Airlines like British Airways use dynamic pricing — early bookers pay high fares (elastic segment, high MR), but as the flight fills, last-minute seats are sold cheaply. The airline keeps lowering price only while MR is still positive." },
        misconception: "Students say MR falls because the firm sells more. Incomplete — MR falls because reducing price applies to all units, not just the extra one. Instead write: MR falls faster than AR because the price cut applies to every unit sold, creating a growing revenue loss on inframarginal units.",
        examMatters: "Examiners expect you to draw MR with exactly twice the gradient of a linear AR curve, hitting the quantity axis at half the AR intercept. Label the elastic and inelastic portions of the demand curve and show that TR is maximised where MR = 0."
      },
      {
        id: "revenue-curves-market-structures",
        title: "Revenue Curves in Different Market Structures",
        keyIdea: "A price taker faces a horizontal demand curve where AR = MR = P, while a price maker faces a downward-sloping AR with MR below it — this single difference drives all market structure analysis.",
        body: [
          { type: "paragraph", text: "In **perfect competition**, each firm is a **price taker** — it can sell any quantity at the market price. Because price does not change with output, AR = MR = P, giving a horizontal (perfectly elastic) demand curve. The firm has no pricing decision; it simply chooses how much to produce." },
          { type: "paragraph", text: "In **imperfect competition** (monopoly, oligopoly, monopolistic competition), firms are **price makers** — they face a downward-sloping demand curve. To sell more they must lower price, so MR lies below AR. The gap between AR and MR widens as output increases." },
          { type: "paragraph", text: "The shape of these revenue curves links directly to **price elasticity of demand** from Unit 1. A perfectly competitive firm faces infinite PED (perfectly elastic), while a monopolist faces a less elastic demand curve — giving it more power over price but not over the quantity consumers will buy at that price." },
          { type: "flow", steps: ["Market has many identical firms", "Each firm too small to affect price", "AR = MR = P (horizontal)"], result: "Price taker — revenue curves are flat; the firm's only decision is quantity", resultType: "neutral" }
        ],
        realExample: { emoji: "🌾", text: "A wheat farmer is a textbook price taker — they sell at the global market price and cannot charge more because consumers would simply buy from another farmer. Their AR and MR curves are a flat line at the market price." },
        misconception: "Students draw MR below AR for a perfectly competitive firm. Wrong — because the firm can sell any quantity at the same price, the price cut effect does not exist. Instead write: in perfect competition AR = MR = P; the MR curve only lies below AR when the firm must lower price to sell more (downward-sloping demand).",
        examMatters: "A common question gives you a market structure and asks you to draw the correct revenue curves. Remember: horizontal AR = MR for a price taker, downward-sloping AR with steeper MR for a price maker. Getting this wrong makes every subsequent diagram incorrect."
      }
    ],
    takeaway: [
      "TR = P × Q; AR = demand curve; MR has twice the gradient of a linear AR curve.",
      "MR is positive when demand is elastic, zero at unit elasticity, negative when inelastic.",
      "Price takers: AR = MR = P (horizontal). Price makers: downward-sloping AR with MR below.",
      "The shape of revenue curves determines profit-maximising output in every market structure."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Cost Concepts
   * ═══════════════════════════════════════════════════ */
  {
    title: "Cost Concepts",
    sections: [
      {
        id: "fixed-variable-average-marginal-cost",
        title: "Fixed, Variable, Average and Marginal Cost",
        keyIdea: "FC + VC = TC, ATC = TC/Q, MC = ΔTC/ΔQ — and the key relationship is that MC always cuts ATC at its minimum point, pulling the average down then up like a batsman's batting average.",
        body: [
          { type: "paragraph", text: "**Fixed costs (FC)** do not change with output — rent, salaries of permanent staff, insurance. **Variable costs (VC)** rise as output increases — raw materials, energy, hourly wages. Together: FC + VC = **total cost (TC)**." },
          { type: "paragraph", text: "**Average total cost (ATC)** is TC divided by Q. It is U-shaped because at low output the firm spreads fixed costs over few units (high AFC), and at high output diminishing returns push up AVC. **Marginal cost (MC)** is the addition to total cost from producing one more unit: MC = ΔTC/ΔQ." },
          { type: "paragraph", text: "The critical relationship: **MC intersects ATC at ATC's minimum point**. When MC is below ATC, each extra unit pulls the average down. When MC is above ATC, each extra unit drags the average up. This is a mathematical certainty, not a special case — like a batsman's average: if the next innings score (marginal) is below their average, the average falls." },
          { type: "flow", steps: ["MC < ATC", "Each extra unit pulls average down", "ATC falls", "MC crosses ATC at minimum"], result: "Beyond this point MC > ATC — average costs start to rise", resultType: "neutral" }
        ],
        realExample: { emoji: "🎬", text: "Netflix spends billions on fixed costs (content production) but the variable cost of one more subscriber streaming a show is almost zero. This gives Netflix a rapidly falling ATC curve as subscriber numbers grow — classic high-FC, low-VC economics." },
        misconception: "Students say MC rises because costs get higher. Imprecise — MC rises because of diminishing marginal returns: adding more variable factors to a fixed factor eventually yields less additional output per unit of input. Instead write: MC rises in the short run because diminishing returns mean each additional unit of output requires progressively more variable input.",
        examMatters: "Drawing accurate cost curves is essential. MC must be U-shaped, cutting ATC at its minimum. AFC falls continuously. AVC is also U-shaped but sits below ATC. Examiners penalise cost curves that do not intersect at the correct points."
      },
      {
        id: "short-run-long-run-costs",
        title: "Short-Run vs Long-Run Costs",
        keyIdea: "In the short run at least one factor is fixed, causing diminishing returns; in the long run all factors are variable, enabling economies of scale — the LRAC curve is the envelope of all possible SRAC curves.",
        body: [
          { type: "paragraph", text: "The **short run** is the period in which at least one factor of production is fixed (typically capital). Adding more of the variable factor (labour) to the fixed factor eventually causes **diminishing marginal returns** — each extra worker adds less output than the previous one, causing MC to rise." },
          { type: "paragraph", text: "The **long run** is the period in which all factors are variable — the firm can build a bigger factory, adopt new technology, or relocate. Long-run average cost (LRAC) falls due to **economies of scale**, reaches a minimum at **minimum efficient scale (MES)**, and may eventually rise due to **diseconomies of scale**." },
          { type: "paragraph", text: "The LRAC curve is the **envelope** of all possible short-run average cost (SRAC) curves. Each SRAC curve represents a particular plant size. The firm chooses the plant size that gives the lowest average cost for its expected output. MES is the smallest output at which LRAC is minimised — it determines how many firms can efficiently operate in a market." },
          { type: "flow", steps: ["Firm expands in the short run", "Diminishing returns raise MC", "Firm invests in larger plant (long run)", "Economies of scale lower LRAC"], result: "LRAC falls until MES — beyond that, diseconomies may set in", resultType: "neutral" }
        ],
        realExample: { emoji: "🏭", text: "Toyota operates enormous factories specifically sized for their expected output. Each factory represents one SRAC curve. If demand grows beyond that factory's optimal capacity, Toyota builds a new, larger plant — moving along the LRAC envelope to a new, lower SRAC curve." },
        misconception: "Students confuse diminishing returns with diseconomies of scale. Wrong — diminishing returns is a short-run concept (one fixed factor), while diseconomies are long-run (all factors variable but management struggles). Instead write: diminishing returns explains why SRAC curves slope upward; diseconomies of scale explains why the LRAC curve may eventually slope upward.",
        examMatters: "Examiners frequently ask you to distinguish short-run and long-run cost behaviour. Use the correct terminology: diminishing returns for the short run, economies/diseconomies of scale for the long run. Draw the LRAC as a smooth envelope tangent to multiple SRAC curves, and label MES clearly."
      }
    ],
    takeaway: [
      "FC + VC = TC; ATC = TC/Q; MC = ΔTC/ΔQ — MC cuts ATC at its minimum point.",
      "Short run: at least one fixed factor → diminishing returns → rising MC.",
      "Long run: all factors variable → economies of scale → falling LRAC until MES.",
      "The LRAC envelope shows the lowest achievable average cost for each level of output."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Profit
   * ═══════════════════════════════════════════════════ */
  {
    title: "Profit",
    sections: [
      {
        id: "normal-supernormal-profit",
        title: "Normal and Supernormal Profit",
        keyIdea: "Normal profit is not a reward but a cost — it is the minimum return needed to keep the entrepreneur in the industry. Supernormal profit is everything above that, and it acts as a signal drawing new firms in.",
        body: [
          { type: "paragraph", text: "**Normal profit** is the minimum return required to keep a firm in the market — it covers the **opportunity cost of capital**, meaning the return the entrepreneur could earn in their next best alternative. Economists include normal profit as part of total cost, so when TR = TC, the firm earns exactly normal profit." },
          { type: "paragraph", text: "**Supernormal (abnormal) profit** exists when TR > TC. This is profit above and beyond the opportunity cost of staying in the market. It represents a genuine economic surplus — the firm is earning more than is necessary to keep its resources in their current use." },
          { type: "paragraph", text: "Supernormal profit has a crucial **signal function**: it tells other entrepreneurs that this market offers returns above the opportunity cost of capital. In contestable or competitive markets, this signal attracts entry, increasing supply and driving price down until only normal profit remains — the long-run equilibrium." },
          { type: "flow", steps: ["Firm earns supernormal profit (TR > TC)", "Signal attracts new entrants", "Market supply increases, price falls", "Supernormal profit is competed away"], result: "Long-run equilibrium: only normal profit survives (TR = TC)", resultType: "neutral" }
        ],
        realExample: { emoji: "💻", text: "When OpenAI demonstrated massive demand for generative AI, the supernormal profits attracted Google, Meta, and dozens of startups into the market. This entry is the signal function in action — supernormal profit does not last when barriers to entry are low." },
        misconception: "Students say normal profit means the firm is making no profit. Misleading — the firm earns enough to cover all costs including the opportunity cost of capital; it is just not earning more than necessary to stay. Instead write: normal profit means TR = TC in the economic sense, where TC already includes the entrepreneur's opportunity cost — the firm is covering all costs, including the minimum required return.",
        examMatters: "Examiners test whether you understand that normal profit is included in the cost curves. On a diagram, normal profit is where AR = ATC. Supernormal profit is the shaded rectangle between AR and ATC multiplied by quantity. Always label this area clearly and state TR > TC."
      },
      {
        id: "profit-maximisation-rule",
        title: "The Profit Maximisation Rule",
        keyIdea: "A firm maximises profit where MC = MR — find this point on the diagram, read the price from the AR curve directly above, then compare AR to ATC to determine the profit or loss per unit.",
        body: [
          { type: "paragraph", text: "The **profit maximisation rule** states that a firm should produce where **MC = MR**. At any output below this, MR > MC — the firm gains more revenue from the next unit than it costs, so profit rises by expanding. At any output above this, MC > MR — the last unit costs more to produce than it earns, so the firm should contract." },
          { type: "paragraph", text: "On a diagram, the process is systematic: (1) find where MC crosses MR, (2) drop a vertical line to the quantity axis to read the profit-maximising output, (3) read the price from the AR curve directly above that quantity, (4) read the average cost from the ATC curve at that quantity. If AR > ATC, the firm earns supernormal profit. If AR < ATC, it makes a loss. If AR = ATC, it earns normal profit." },
          { type: "paragraph", text: "This rule works for every market structure — perfect competition, monopoly, oligopoly, monopolistic competition. The shapes of the curves differ, but the logic is universal: produce where the next unit adds exactly as much to revenue as it does to cost." },
          { type: "flow", steps: ["Locate MC = MR on diagram", "Read Q* on horizontal axis", "Read P* from AR curve above Q*", "Compare AR to ATC at Q*"], result: "AR > ATC = supernormal profit; AR = ATC = normal profit; AR < ATC = loss", resultType: "neutral" }
        ],
        realExample: { emoji: "⛽", text: "Shell adjusts its oil extraction rate based on MC = MR logic. When oil prices rise (MR shifts up), it is profitable to extract from more expensive wells. When prices fall, those wells are shut down because MC exceeds MR — the profit maximisation rule in practice." },
        misconception: "Students confuse profit maximisation with revenue maximisation. Wrong — revenue is maximised where MR = 0, which is a higher output than MC = MR. Instead write: profit max occurs where MC = MR; revenue max occurs where MR = 0. They are different points — profit max accounts for costs, revenue max ignores them.",
        examMatters: "This is the single most important diagram technique in Unit 3. Practise drawing MC = MR for every market structure: in perfect competition MC crosses a horizontal MR; in monopoly MC crosses a downward-sloping MR. Always show the four-step process: MC = MR → Q* → P* from AR → compare AR to ATC."
      }
    ],
    takeaway: [
      "Normal profit = opportunity cost of capital, included in TC. Supernormal profit = TR > TC.",
      "Supernormal profit signals entry; in competitive markets it is competed away in the long run.",
      "Profit max at MC = MR — find output, read price from AR, compare to ATC for profit area.",
      "The MC = MR rule applies universally across all market structures."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 4: Efficiency
   * ═══════════════════════════════════════════════════ */
  {
    title: "Efficiency",
    sections: [
      {
        id: "allocative-productive-efficiency",
        title: "Allocative and Productive Efficiency",
        keyIdea: "Allocative efficiency (P = MC) means resources go where consumers value them most; productive efficiency (min ATC) means output is produced at the lowest possible cost — perfect competition achieves both in long-run equilibrium.",
        body: [
          { type: "paragraph", text: "**Allocative efficiency** occurs where **P = MC** — the price consumers pay equals the marginal cost of production. This means the value consumers place on the last unit exactly equals the cost of the resources used to make it. No reallocation of resources could make anyone better off without making someone else worse off." },
          { type: "paragraph", text: "**Productive efficiency** occurs at the **minimum point of the ATC curve** — the firm produces at the lowest possible average cost. No resources are wasted. In the long run, competitive pressure forces firms to be productively efficient: any firm with higher costs is undercut by rivals and exits the market." },
          { type: "paragraph", text: "In **long-run equilibrium under perfect competition**, both conditions are met simultaneously. Price is driven down to the minimum of ATC (productive efficiency), and since P = AR = MR = MC for a price taker, P = MC (allocative efficiency). This is why perfect competition is the benchmark of static efficiency." },
          { type: "flow", steps: ["Perfect competition in long-run equilibrium", "Supernormal profit competed away", "P = min ATC (productive efficiency)", "P = MC (allocative efficiency)"], result: "Both static efficiency conditions achieved — the welfare benchmark", resultType: "good" }
        ],
        realExample: { emoji: "🛒", text: "Supermarkets like Aldi and Lidl operate in a fiercely competitive market. Price competition forces them to minimise costs (productive efficiency) and price close to marginal cost (allocative efficiency). Compare this to utility companies, where less competition means prices often exceed MC." },
        misconception: "Students say efficiency means low prices. Imprecise — allocative efficiency means the right price (P = MC), which may not be the lowest possible price. Instead write: allocative efficiency means the price reflects the true resource cost of production (P = MC); productive efficiency means producing at the lowest average cost (min ATC). Both are about optimal resource use, not just cheap prices.",
        examMatters: "Examiners test whether you can identify both types of efficiency on a diagram. In perfect competition long-run equilibrium, the firm operates at P = MC = min ATC — label both conditions. For monopoly, show that P > MC (allocative inefficiency) and the firm may not produce at min ATC (productive inefficiency)."
      },
      {
        id: "dynamic-efficiency-x-inefficiency",
        title: "Dynamic Efficiency and X-Inefficiency",
        keyIdea: "Supernormal profit can fund R&D and innovation (dynamic efficiency), but without competitive pressure a monopolist may let costs drift above the minimum (X-inefficiency) — creating a fundamental trade-off between static and dynamic efficiency.",
        body: [
          { type: "paragraph", text: "**Dynamic efficiency** is about improvement over time — investing in research, new technology, and better products. It requires funds, and **supernormal profit** provides those funds. This is the Schumpeterian argument: monopoly power can be good for society if the profits drive innovation that benefits consumers in the long run." },
          { type: "paragraph", text: "**X-inefficiency** occurs when a firm operates above its minimum cost curve — not because of its scale, but because of **organisational slack**. Without competitive pressure, managers may tolerate waste, overstaffing, or outdated processes. The firm's actual cost is higher than the lowest achievable cost for its output level." },
          { type: "paragraph", text: "This creates the central trade-off: **perfect competition** achieves static efficiency (P = MC, min ATC) but firms earn no supernormal profit to fund innovation. **Monopoly** may generate dynamic efficiency through R&D investment, but the lack of competitive pressure risks X-inefficiency and static welfare loss. The optimal market structure depends on which efficiency matters more in a given industry." },
          { type: "flow", steps: ["Monopolist earns supernormal profit", "Profit funds R&D (dynamic efficiency)", "But no competitive pressure", "Costs drift above minimum (X-inefficiency)"], result: "Trade-off: dynamic gains vs static losses — net effect is an empirical question", resultType: "neutral" }
        ],
        realExample: { emoji: "💊", text: "Pharmaceutical companies like Pfizer use monopoly profits from patented drugs to fund billions in R&D for new treatments — a clear example of dynamic efficiency. But critics argue that without generic competition, these firms also exhibit X-inefficiency, spending heavily on marketing rather than minimising costs." },
        misconception: "Students say monopoly is always bad for efficiency. Too simplistic — a monopolist earning supernormal profit may invest heavily in innovation, delivering dynamic efficiency that a perfectly competitive market cannot. Instead write: monopoly sacrifices static efficiency (P > MC) but may deliver dynamic efficiency through R&D funded by supernormal profit — the net welfare effect depends on the industry context.",
        examMatters: "The static vs dynamic efficiency trade-off is a top evaluation point. In 20-mark essays, argue both sides: perfect competition delivers allocative and productive efficiency but no innovation incentive; monopoly may deliver dynamic efficiency but at the cost of higher prices and possible X-inefficiency. Conclude that the outcome is industry-specific."
      }
    ],
    takeaway: [
      "Allocative efficiency: P = MC — resources go where consumers value them most.",
      "Productive efficiency: min ATC — output at the lowest possible average cost.",
      "Dynamic efficiency: supernormal profit funds innovation — the Schumpeterian defence of monopoly.",
      "X-inefficiency: costs above minimum due to lack of competitive pressure — the monopoly critique."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.2 Revenue, Costs and Profits to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'revenue-costs-profits');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 4 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
