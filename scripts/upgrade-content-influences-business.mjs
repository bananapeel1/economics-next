/**
 * UPGRADE — 3.3.4 Influences on Business Decisions
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-influences-business.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Culture & Stakeholders
   * ═══════════════════════════════════════════════════ */
  {
    title: "Culture & Stakeholders",
    sections: [
      {
        id: "corporate-culture",
        title: "Corporate Culture",
        keyIdea: "Corporate culture is the shared values, beliefs, and norms that shape how people behave inside a business — it is invisible but determines everything from decision speed to willingness to change.",
        body: [
          { type: "paragraph", text: "**Corporate culture** is the unwritten code that governs 'how things are done around here'. It shapes employee behaviour, management style, and the firm's ability to adapt. Culture is not what the mission statement says — it is what people actually do when nobody is watching." },
          { type: "paragraph", text: "**Handy's cultural typology** identifies four types. **Power culture** — decisions radiate from a central figure (common in start-ups and family firms). **Role culture** — authority flows from job titles and formal rules (typical of large bureaucracies). **Task culture** — teams form around projects, with expertise trumping hierarchy. **Person culture** — the organisation exists to serve the individuals within it (law chambers, medical practices)." },
          { type: "paragraph", text: "A **strong culture** means values are widely shared and deeply held — this improves consistency and motivation but can become a barrier to change because 'the way we've always done it' resists new ideas. A **weak culture** has no dominant set of values, making the firm adaptable but directionless." },
          { type: "flow", steps: ["Strong culture established", "Employees align around shared values", "Consistency and identity strengthen", "But resistance to new ways of working grows"], result: "Culture becomes both an asset and a barrier to change", resultType: "neutral" }
        ],
        realExample: { emoji: "🔍", text: "Google deliberately cultivates a task culture — cross-functional project teams, flat structures, and '20% time' for personal projects. This drives innovation but can create coordination challenges as the company scales beyond 180,000 employees." },
        misconception: "Students describe culture as something managers can simply choose or switch overnight. Wrong — culture is deeply embedded in daily habits and takes years to shift. Instead write: culture evolves from repeated behaviours and shared experiences; changing it requires sustained leadership effort, not just a new mission statement.",
        examMatters: "Examiners want you to classify culture using Handy's typology and then evaluate its impact. Always link to context: a power culture suits a start-up needing fast decisions, but becomes a bottleneck when the firm grows and the founder cannot oversee everything."
      },
      {
        id: "stakeholder-analysis",
        title: "Stakeholder Analysis",
        keyIdea: "Stakeholders are any group affected by or able to affect a business — Mendelow's matrix maps them by power and interest, revealing who the firm must prioritise and who it can safely monitor.",
        body: [
          { type: "paragraph", text: "A **stakeholder** is any individual or group with an interest in the business — employees, customers, suppliers, shareholders, local communities, government, and pressure groups. Their interests often conflict: shareholders want maximum dividends while employees want higher wages." },
          { type: "paragraph", text: "**Mendelow's power-interest matrix** classifies stakeholders into four quadrants. **High power, high interest** — key players who must be managed closely (e.g. major shareholders, regulators). **High power, low interest** — keep satisfied (e.g. government). **Low power, high interest** — keep informed (e.g. local community). **Low power, low interest** — minimal effort needed." },
          { type: "paragraph", text: "The **shareholder vs stakeholder debate** is central. **Friedman** argued the only social responsibility of business is to increase profits for shareholders — anything else is misusing other people's money. **Freeman** countered that businesses depend on all stakeholders and must balance their interests to survive long-term." },
          { type: "flow", steps: ["Identify all stakeholders", "Map power and interest for each", "Classify using Mendelow's matrix"], result: "Strategy tailored to each group — key players managed closely, others monitored", resultType: "good" }
        ],
        realExample: { emoji: "🚗", text: "The Volkswagen emissions scandal (2015) is a textbook stakeholder failure. VW prioritised shareholder returns above all else, cheating emissions tests to boost sales. When exposed, it destroyed trust with customers, regulators, and employees — costing over €30 billion in fines and wiping out years of shareholder value." },
        misconception: "Students treat Mendelow's matrix as static. Wrong — stakeholders move between quadrants as circumstances change. A quiet community group (low power) can become high power overnight through media attention. Instead write: stakeholder mapping is dynamic; firms must constantly reassess where groups sit as events unfold.",
        examMatters: "A strong exam answer uses Mendelow's matrix to structure analysis. Draw the 2x2 grid, place specific stakeholders in quadrants with justification, and explain the management strategy for each. Examiners reward application to the case study, not generic descriptions."
      }
    ],
    takeaway: [
      "Handy's four culture types: power, role, task, person — each suits different business contexts.",
      "Strong culture drives consistency but resists change; weak culture is adaptable but lacks direction.",
      "Mendelow's matrix (power vs interest) determines stakeholder management strategy — it is dynamic, not fixed."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Ethics & CSR
   * ═══════════════════════════════════════════════════ */
  {
    title: "Ethics & CSR",
    sections: [
      {
        id: "business-ethics",
        title: "Business Ethics",
        keyIdea: "Ethics goes beyond legal compliance — it asks what a business should do, not just what it is allowed to do, and the gap between the two is where reputational risk lives.",
        body: [
          { type: "paragraph", text: "**Business ethics** are the moral principles that guide how a firm behaves. A business can be entirely legal yet deeply unethical — paying minimum wage while executives earn millions, or selling products known to cause harm but not yet regulated." },
          { type: "paragraph", text: "Ethical behaviour covers treatment of workers (fair wages, safe conditions), honesty with customers (transparent pricing, truthful advertising), environmental responsibility (beyond legal minimums), and supply chain standards (refusing to use exploitative suppliers)." },
          { type: "paragraph", text: "The business case **for** ethics: builds brand loyalty, attracts talent, reduces regulatory risk, and avoids costly scandals. The case **against**: higher short-term costs, competitive disadvantage if rivals cut corners, and difficulty measuring ethical impact on the bottom line." },
          { type: "flow", steps: ["Firm adopts ethical stance beyond legal requirements", "Higher costs in short run", "Reputation and trust build over time"], result: "Long-run competitive advantage through brand loyalty and reduced risk", resultType: "good" }
        ],
        realExample: { emoji: "🧥", text: "Patagonia builds ethics into its core business model — it famously ran an advert saying 'Don't Buy This Jacket' to discourage overconsumption. This radical honesty has built fierce customer loyalty and allowed premium pricing, proving ethics and profit can align." },
        misconception: "Students assume ethical behaviour always costs money with no return. Wrong — unethical behaviour often costs far more in the long run through fines, lawsuits, and lost customers. Instead write: ethics has a cost, but the cost of unethical behaviour (reputational damage, regulatory fines, loss of trust) is typically higher.",
        examMatters: "Examiners test evaluation — can you argue both sides? A strong answer acknowledges that ethics can raise costs and reduce competitiveness in the short run, but argues that long-run reputational benefits and risk reduction often outweigh those costs. Always use real examples."
      },
      {
        id: "corporate-social-responsibility",
        title: "Corporate Social Responsibility (CSR)",
        keyIdea: "CSR is a firm's voluntary commitment to act in the interests of society beyond its legal obligations — but the line between genuine CSR and greenwashing is where the real exam debate lives.",
        body: [
          { type: "paragraph", text: "**Corporate Social Responsibility (CSR)** refers to a business voluntarily going beyond legal requirements to consider the social, environmental, and ethical impacts of its operations. It covers environmental sustainability, community engagement, fair labour practices, and charitable giving." },
          { type: "paragraph", text: "**Arguments for CSR**: enhanced brand reputation and customer loyalty, ability to attract and retain talented employees, reduced risk of regulatory intervention, long-term shareholder value through sustainable practices, and differentiation from competitors." },
          { type: "paragraph", text: "**Arguments against CSR**: Friedman's view that profit is the only social responsibility (CSR diverts resources from shareholders), the risk of **greenwashing** (superficial CSR used as marketing), difficulty measuring genuine social impact, and potential competitive disadvantage against firms that ignore CSR." },
          { type: "flow", steps: ["Firm adopts CSR programme", "Stakeholders respond positively", "Brand value and loyalty increase"], result: "But only if CSR is genuine — greenwashing destroys trust faster than no CSR at all", resultType: "neutral" }
        ],
        realExample: { emoji: "⛽", text: "BP rebranded itself as 'Beyond Petroleum' with a green sunflower logo in 2000, spending millions on CSR marketing. Then the 2010 Deepwater Horizon disaster killed 11 workers and caused the worst oil spill in US history — revealing the CSR as greenwashing. BP's brand damage lasted over a decade." },
        misconception: "Students treat CSR and ethics as the same thing. Wrong — ethics is about moral principles guiding daily decisions; CSR is a broader strategic commitment to society. A firm can behave ethically (not lying to customers) without having a formal CSR programme. Instead write: ethics guides individual decisions; CSR is a deliberate organisational strategy to benefit wider society.",
        examMatters: "The highest-mark answers evaluate CSR critically. Don't just list benefits — challenge whether CSR is genuine or greenwashing, whether it actually changes business behaviour or just marketing, and whether Friedman's profit-only argument has merit in a world of climate change and social media accountability."
      }
    ],
    takeaway: [
      "Ethics is about what a firm should do beyond legal compliance — the gap is where reputational risk sits.",
      "CSR is a voluntary strategic commitment; greenwashing is CSR as marketing without substance.",
      "Friedman vs Freeman: profit-only vs stakeholder balance — examiners want you to argue both sides with examples."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.4 Influences on Business Decisions to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'influences-business-decisions');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
