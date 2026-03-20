/**
 * UPGRADE — 3.3.1 Types and Sizes of Businesses
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-types-sizes-businesses.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Business Objectives
   * ═══════════════════════════════════════════════════ */
  {
    title: "Business Objectives",
    sections: [
      {
        id: "profit-maximisation",
        title: "Profit Maximisation",
        keyIdea: "A firm maximises profit at the output where MC = MR — any unit before this leaves money on the table, any unit after costs more than it earns.",
        body: [
          { type: "paragraph", text: "The traditional economic assumption is that firms aim to **maximise profit** — making the gap between total revenue and total cost as large as possible. This occurs at the output level where marginal cost equals marginal revenue (MC = MR)." },
          { type: "paragraph", text: "If MR > MC, producing one more unit adds more to revenue than to cost, so profit rises. If MC > MR, the last unit costs more to make than it earns, so the firm should cut back. The sweet spot is where the two are equal." },
          { type: "flow", steps: ["MR > MC", "Firm expands output", "MC rises, MR falls", "MC = MR reached"], result: "Profit maximised — no reallocation improves outcome", resultType: "good" }
        ],
        realExample: { emoji: "🍎", text: "Apple prices iPhones where the gap between revenue and production cost is maximised. They produce fewer units at a higher margin rather than flooding the market — a classic profit-maximising strategy." },
        misconception: "Students say profit is maximised where revenue is highest. Wrong — revenue maximisation (MR = 0) gives a different, higher output than profit maximisation (MC = MR). Instead write: profit max considers both revenue AND costs; it occurs where the marginal unit adds equally to both.",
        examMatters: "Examiners test whether you can locate MC = MR on a diagram and read the price from the AR curve above. This is the single most important diagram skill in Unit 3 — practise it until it's automatic."
      },
      {
        id: "alternative-objectives",
        title: "Revenue Maximisation, Sales Maximisation & Satisficing",
        keyIdea: "Not all firms chase maximum profit — managers may pursue revenue, market share, or a quiet life, depending on who controls the firm and what information they have.",
        body: [
          { type: "paragraph", text: "**Revenue maximisation** occurs where MR = 0 — the firm pushes output until total revenue peaks, even though profit is lower. Baumol argued managers prefer this because their salary and status often correlate with firm size, not profitability." },
          { type: "paragraph", text: "**Sales maximisation** means selling the most output possible without making a loss — producing where AR = ATC. The firm breaks even, sacrificing all supernormal profit for maximum market share." },
          { type: "paragraph", text: "**Satisficing** is the most realistic description of many firms. Managers aim for a 'good enough' profit that keeps shareholders quiet, while pursuing their own goals — perks, prestige, or an easy life. This arises from the **principal-agent problem**: shareholders (principals) want maximum profit, but managers (agents) have their own interests." },
          { type: "flow", steps: ["Ownership separated from control", "Managers have own goals", "Information is imperfect"], result: "Satisficing — a compromise between competing objectives", resultType: "neutral" }
        ],
        realExample: { emoji: "📦", text: "Amazon famously prioritised revenue and market share over profit for nearly two decades. Jeff Bezos pursued sales maximisation to build scale, reinvesting every pound of revenue into growth rather than distributing it as dividends." },
        misconception: "Students assume all firms profit-maximise. Wrong — the principal-agent problem and imperfect information mean many firms satisfice. Instead write: profit maximisation is a simplifying assumption; in reality, objectives depend on ownership structure, market power, and managerial incentives.",
        examMatters: "A common 8-mark question asks you to compare objectives on a single diagram. Show MC = MR (profit max), MR = 0 (revenue max), and AR = ATC (sales max). Output increases and price decreases as you move through them — label all three clearly."
      }
    ],
    takeaway: [
      "Profit max at MC = MR; revenue max at MR = 0; sales max at AR = ATC.",
      "The principal-agent problem explains why managers may not profit-maximise.",
      "Satisficing is the most realistic model — 'good enough' profit while pursuing other goals."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Types of Business Organisation
   * ═══════════════════════════════════════════════════ */
  {
    title: "Types of Business Organisation",
    sections: [
      {
        id: "sole-traders-partnerships",
        title: "Sole Traders and Partnerships",
        keyIdea: "The simplest business forms give the owner total control but expose their personal assets to unlimited liability — every penny of business debt is personally theirs.",
        body: [
          { type: "paragraph", text: "A **sole trader** is one person who owns and runs a business. They keep all profits but face **unlimited liability** — if the business fails, creditors can seize personal assets like their house and savings." },
          { type: "paragraph", text: "A **partnership** shares ownership between two or more people. Partners share profits, responsibilities, and — critically — unlimited liability. Partnerships are common in professional services like law and accounting where personal reputation matters." },
          { type: "paragraph", text: "Both structures are simple to set up with minimal regulation. The trade-off is clear: maximum control and privacy, but maximum personal risk and limited ability to raise external finance." }
        ],
        realExample: { emoji: "💈", text: "Most high-street barber shops and local restaurants are sole traders. They benefit from quick decision-making and keep all profits, but if the business accumulates debt, the owner's personal savings are at risk." },
        misconception: "Students say sole traders are always small. Wrong — some sole traders have significant turnover. The defining feature is unlimited liability and single ownership, not size. Instead write: the key distinction is the legal structure (unlimited liability), not the scale of operations.",
        examMatters: "Examiners test whether you understand unlimited liability as a concept, not just a definition. Link it to risk: unlimited liability discourages investment because potential losses are uncapped, which limits the firm's ability to grow."
      },
      {
        id: "limited-companies",
        title: "Private Limited Companies (Ltd) and Public Limited Companies (plc)",
        keyIdea: "Limited liability separates the owner's personal wealth from the business — shareholders can only lose what they invested, which is the single most important innovation in business law.",
        body: [
          { type: "paragraph", text: "A **private limited company (Ltd)** is a separate legal entity. Shareholders enjoy **limited liability** — they can lose their investment but not their personal assets. Shares cannot be sold to the general public, keeping ownership private." },
          { type: "paragraph", text: "A **public limited company (plc)** trades shares on the stock exchange. This gives access to enormous capital from millions of investors, but dilutes control and exposes the firm to takeover risk." },
          { type: "paragraph", text: "Becoming a plc creates the **divorce of ownership and control** — shareholders own the firm but managers run it day-to-day. This separation is the root of the principal-agent problem." },
          { type: "flow", steps: ["Firm becomes plc", "Shares traded publicly", "Ownership spread across millions"], result: "Divorce of ownership and control → principal-agent problem", resultType: "neutral" }
        ],
        realExample: { emoji: "🏪", text: "Marks & Spencer started as a market stall (sole trader), became a private company, then floated as a plc on the London Stock Exchange. Each transition gave access to more capital but reduced the founding family's control." },
        misconception: "Students confuse limited liability with limited risk. Wrong — limited liability protects personal assets, but the investment itself can still be lost entirely. Instead write: limited liability means shareholders' maximum loss is their investment; it does not mean the business cannot fail.",
        examMatters: "A frequent question asks you to evaluate whether a firm should convert from Ltd to plc. Structure your answer: benefits (access to capital, growth) vs costs (loss of control, takeover risk, short-termism pressure, disclosure requirements)."
      }
    ],
    takeaway: [
      "Sole traders and partnerships: unlimited liability, total control, limited finance.",
      "Ltd and plc: limited liability, easier to raise capital, but ownership may separate from control.",
      "The divorce of ownership and control creates the principal-agent problem in plcs."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Growth of Firms
   * ═══════════════════════════════════════════════════ */
  {
    title: "Growth of Firms",
    sections: [
      {
        id: "organic-growth",
        title: "Organic (Internal) Growth",
        keyIdea: "Growing from within — using retained profits to open branches, develop products, or enter new markets — is the safest path but the slowest, making it best when time is on your side.",
        body: [
          { type: "paragraph", text: "**Organic growth** means expansion through the firm's own activities: increasing sales, opening new outlets, developing new products, or entering new geographical markets. It is funded primarily by **retained profits**." },
          { type: "paragraph", text: "The key advantage is control — the firm maintains its culture, avoids integration headaches, and grows at a pace it can manage. The key disadvantage is speed — competitors who grow externally may seize opportunities first." }
        ],
        realExample: { emoji: "☕", text: "Starbucks grew organically for decades, opening one store at a time and replicating its format globally. This preserved brand consistency but meant slower expansion than if it had acquired existing coffee chains." },
        misconception: "Students say organic growth is always better because it's less risky. Wrong — in fast-consolidating markets, organic growth may be too slow and the firm gets acquired itself. Instead write: organic growth is lower risk but may be too slow when competitors are merging and market share is being locked up.",
        examMatters: "When evaluating growth strategies, always consider the market context. Is the market growing (organic works — there's time) or mature and consolidating (external growth may be necessary to survive)?"
      },
      {
        id: "external-growth-mergers",
        title: "External Growth: Mergers, Takeovers & Integration",
        keyIdea: "Buying another firm gives instant scale and market share, but over half of mergers destroy value because integrating two different cultures and systems is far harder than it looks on paper.",
        body: [
          { type: "paragraph", text: "**External growth** means expansion through mergers (two firms agree to join) or takeovers (one firm buys a controlling stake, sometimes hostile). It is faster than organic growth and immediately increases market share." },
          { type: "subheading", text: "Types of Integration" },
          { type: "paragraph", text: "**Horizontal integration** merges firms at the same stage in the same industry — increasing market share and enabling economies of scale. **Vertical integration** (backward or forward) secures supply chains or distribution. **Conglomerate integration** diversifies into unrelated industries to spread risk." },
          { type: "flow", steps: ["Firms merge horizontally", "Market concentration rises", "Economies of scale possible"], result: "Lower costs but competition regulators may intervene", resultType: "neutral" }
        ],
        realExample: { emoji: "📱", text: "Facebook's acquisition of Instagram (2012) and WhatsApp (2014) were horizontal integrations that eliminated potential competitors and gave Facebook dominance across social media — a textbook case of external growth for market power." },
        misconception: "Students assume mergers always create synergies. Wrong — culture clash, redundancy costs, and management distraction mean over 50% of mergers fail to create shareholder value. Instead write: synergies look attractive on paper, but integration difficulties are the number one reason mergers destroy value.",
        examMatters: "Examiners expect you to classify the type of integration (horizontal, vertical backward/forward, conglomerate) and evaluate its impact on competition, efficiency, and consumers. Always consider the regulator's perspective — would the CMA allow it?"
      }
    ],
    takeaway: [
      "Organic growth is safer but slower; external growth is faster but riskier.",
      "Horizontal (same stage), vertical (supply chain), conglomerate (unrelated) — know all three.",
      "Over half of mergers fail due to culture clash and integration difficulties."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 4: Economies and Diseconomies of Scale
   * ═══════════════════════════════════════════════════ */
  {
    title: "Economies and Diseconomies of Scale",
    sections: [
      {
        id: "economies-of-scale",
        title: "Economies of Scale",
        keyIdea: "As a firm expands, average costs fall for specific, identifiable reasons — and naming those reasons with examples is what separates a strong exam answer from a vague one.",
        body: [
          { type: "paragraph", text: "**Economies of scale** are reductions in long-run average cost as a firm increases its scale of production. They explain the downward-sloping section of the LRAC curve." },
          { type: "subheading", text: "Internal Economies" },
          { type: "paragraph", text: "**Technical** — larger machines are more efficient (cube-square rule). **Purchasing** — bulk buying gives bargaining power. **Financial** — banks charge lower rates to larger, lower-risk firms. **Managerial** — specialist managers increase productivity. **Risk-bearing** — diversified firms spread risk across products and markets." },
          { type: "paragraph", text: "**External economies** benefit the whole industry: a cluster of tech firms in one area creates a shared pool of skilled workers, specialist suppliers, and knowledge spillovers." },
          { type: "flow", steps: ["Firm increases scale", "Internal economies kick in", "LRAC falls"], result: "Lower average costs → competitive pricing or higher margins", resultType: "good" }
        ],
        realExample: { emoji: "🚗", text: "Toyota's global production of over 10 million vehicles per year gives it massive technical and purchasing economies of scale. A single factory produces enough volume to justify billion-pound robotic assembly lines that would be uneconomic for smaller manufacturers." },
        misconception: "Students say economies of scale mean 'costs fall'. Imprecise — total costs still rise as output increases; it is average cost that falls. Instead write: economies of scale occur when long-run average cost falls as the firm increases its scale of production — always specify average cost.",
        examMatters: "Examiners reward specific types with named examples. Don't just write 'economies of scale lower costs' — say 'purchasing economies allow Tesco to negotiate lower prices from suppliers due to the volume of its orders, reducing average cost per unit'."
      },
      {
        id: "diseconomies-demergers",
        title: "Diseconomies of Scale and Demergers",
        keyIdea: "Beyond a certain size, firms become harder to manage — communication breaks down, workers lose motivation, and average costs rise, sometimes prompting the firm to break itself apart.",
        body: [
          { type: "paragraph", text: "**Diseconomies of scale** are increases in long-run average cost as a firm grows beyond its optimal size. Three main causes: **communication problems** (messages distorted through layers of hierarchy), **coordination difficulties** (departments pull in different directions), and **loss of motivation** (workers feel like a small cog in a machine)." },
          { type: "paragraph", text: "When diseconomies outweigh the benefits of size, a **demerger** may follow — splitting the firm into smaller, independent companies that can focus on their core competencies. The stock market may value the separate pieces more than the whole (eliminating the 'conglomerate discount')." },
          { type: "flow", steps: ["Firm grows beyond MES", "Communication and coordination fail", "LRAC rises"], result: "Diseconomies — the firm is too big to manage efficiently", resultType: "bad" }
        ],
        realExample: { emoji: "📦", text: "eBay acquired Skype in 2005 for $2.6bn, hoping for synergies. The fit was poor — video calling had little to do with online auctions. eBay demerged Skype in 2009, selling it to Microsoft, which could better integrate it into its own ecosystem." },
        misconception: "Students think diseconomies are inevitable for all large firms. Wrong — many firms use technology, flat structures, and decentralisation to stay efficient at huge scale. Instead write: diseconomies are a risk, not a certainty; well-managed firms can delay or avoid them through organisational innovation.",
        examMatters: "A strong evaluation point: explain that diseconomies of scale provide the economic rationale for demergers. If a firm's LRAC is rising due to coordination problems, splitting up may be the best way to restore efficiency and shareholder value."
      }
    ],
    takeaway: [
      "Economies of scale: technical, purchasing, financial, managerial, risk-bearing — name them with examples.",
      "Diseconomies: communication, coordination, motivation — these explain why some firms shrink.",
      "MES is where LRAC is minimised; beyond it, costs may rise, prompting demergers."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.1 Types and Sizes of Businesses to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'types-sizes-businesses');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 4 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
