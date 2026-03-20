/**
 * UPGRADE — 3.3.5 Assessing Competitiveness
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-assessing-competitiveness-u3.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Financial Ratios
   * ═══════════════════════════════════════════════════ */
  {
    title: "Financial Ratios",
    sections: [
      {
        id: "profitability-ratios",
        title: "Profitability Ratios",
        keyIdea: "Profitability ratios measure how effectively a firm turns revenue into profit — but a number in isolation means nothing; it must be compared year-on-year, against competitors, or against the industry average.",
        body: [
          { type: "paragraph", text: "**Gross profit margin** = (gross profit / revenue) x 100. It shows how much of every pound of revenue is left after direct production costs (cost of sales). A rising gross margin suggests the firm is managing production costs well or gaining pricing power." },
          { type: "paragraph", text: "**Operating profit margin** = (operating profit / revenue) x 100. This deducts all operating expenses (rent, wages, marketing) from gross profit, showing the profit from core business operations before interest and tax. It is a better measure of management efficiency than gross margin because it includes overhead control." },
          { type: "paragraph", text: "**ROCE (Return on Capital Employed)** = (operating profit / capital employed) x 100. Capital employed = total equity + non-current liabilities. ROCE measures how effectively the firm uses its long-term finance to generate profit. It is the single most important ratio for investors comparing alternative investments." },
          { type: "flow", steps: ["Calculate profitability ratios", "Compare year-on-year for trends", "Benchmark against competitors and industry"], result: "Context reveals whether performance is genuinely strong or weak", resultType: "good" }
        ],
        realExample: { emoji: "🍎", text: "Apple consistently achieves a gross profit margin of around 45%, compared to Samsung's roughly 35%. This reflects Apple's pricing power — its brand allows premium prices that Samsung's hardware-focused model cannot match, despite Samsung selling more units globally." },
        misconception: "Students calculate a ratio and declare it 'good' or 'bad' with no comparison. Wrong — a 10% operating margin is excellent in grocery retail (Tesco) but poor in luxury goods (LVMH). Instead write: always compare ratios in context — against the firm's own history, its competitors, and the industry average.",
        examMatters: "Examiners penalise students who calculate correctly but fail to interpret. Always state what the ratio shows, compare it to a benchmark, and explain what might cause the figure. A ratio tells you what is happening — your job is to explain why."
      },
      {
        id: "liquidity-gearing-ratios",
        title: "Liquidity and Gearing Ratios",
        keyIdea: "A profitable firm can still collapse if it runs out of cash — liquidity ratios check short-term survival, while gearing measures how dependent the firm is on borrowed money and the financial risk that creates.",
        body: [
          { type: "paragraph", text: "**Current ratio** = current assets / current liabilities. It measures whether the firm can meet its short-term debts. A ratio of 1.5-2.0 is generally healthy — below 1.0 signals potential cash flow crisis, while much above 2.0 suggests idle resources that could be invested." },
          { type: "paragraph", text: "**Gearing** = (non-current liabilities / capital employed) x 100. It shows what proportion of long-term finance comes from debt rather than equity. High gearing (above 50%) means the firm is heavily reliant on borrowing, which amplifies both profits and losses — a double-edged sword." },
          { type: "paragraph", text: "High gearing increases **financial risk** because interest must be paid regardless of profit. In good times, debt magnifies returns to shareholders (because they keep all profit after fixed interest payments). In bad times, the fixed interest burden can push the firm towards insolvency. This is the fundamental trade-off of leverage." },
          { type: "flow", steps: ["Firm borrows heavily → gearing rises", "Interest payments are fixed obligations", "Profits fall in a downturn"], result: "High gearing amplifies losses — the firm may be unable to service its debt", resultType: "bad" }
        ],
        realExample: { emoji: "⚡", text: "Tesla's ROCE improved dramatically from negative figures in 2019 to over 25% by 2023 as production scaled up and the firm turned consistently profitable. Investors tracked this ratio as proof that Tesla was transitioning from a cash-burning start-up to an efficient manufacturer." },
        misconception: "Students say high gearing is always bad. Wrong — in stable industries with predictable cash flows (utilities, supermarkets), high gearing is manageable because revenue is reliable. Instead write: whether high gearing is risky depends on the stability of the firm's revenue — predictable cash flows can safely support more debt.",
        examMatters: "Examiners love to test the limitations of ratios. Always include: ratios show what, not why; they are backward-looking (based on past data); they can be manipulated through accounting choices; and they must be compared in context to have any meaning."
      }
    ],
    takeaway: [
      "Gross margin, operating margin, and ROCE measure profitability — ROCE is the most important for investors.",
      "Current ratio checks short-term survival; gearing measures financial risk from borrowing.",
      "Ratios in isolation are meaningless — always compare year-on-year, vs competitors, and vs industry averages."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Core Competencies
   * ═══════════════════════════════════════════════════ */
  {
    title: "Core Competencies",
    sections: [
      {
        id: "vrio-framework",
        title: "The VRIO Framework",
        keyIdea: "A resource only delivers sustained competitive advantage if it passes all four VRIO tests — valuable, rare, hard to imitate, and organisationally embedded — fail any one and the advantage erodes.",
        body: [
          { type: "paragraph", text: "The **VRIO framework** (Barney, 1991) evaluates whether a firm's resources and capabilities can deliver sustained competitive advantage. It asks four sequential questions about each resource." },
          { type: "paragraph", text: "**Valuable** — does the resource enable the firm to exploit opportunities or neutralise threats? If not, it is irrelevant. **Rare** — do few competitors possess it? If many firms have it, it is merely a competitive necessity, not an advantage. **Inimitable** — is it difficult or costly to copy? This is the critical test. Resources are hard to imitate due to history (path dependence), complexity (many interlinked factors), or social embeddedness (culture, relationships). **Organisationally embedded** — is the firm structured to exploit the resource? Even a valuable, rare, inimitable resource is wasted if the organisation cannot deploy it effectively." },
          { type: "flow", steps: ["Identify key resource", "Is it valuable? → Yes", "Is it rare? → Yes", "Is it hard to imitate? → Yes", "Is the firm organised to exploit it? → Yes"], result: "Sustained competitive advantage — but only while all four conditions hold", resultType: "good" }
        ],
        realExample: { emoji: "🥤", text: "Coca-Cola's brand is a textbook VRIO resource. Valuable (drives global sales), rare (no equivalent brand recognition), hard to imitate (built over 130+ years of marketing and cultural embedding — path dependence makes it nearly impossible to replicate), and organisationally embedded (Coca-Cola's global distribution and marketing machine exploits the brand fully)." },
        misconception: "Students list resources and assume they automatically create advantage. Wrong — a resource must pass all four VRIO tests sequentially. Being valuable alone just means competitive parity; being valuable and rare gives temporary advantage; only all four together create sustained advantage. Instead write: apply VRIO as a sequential filter — each test narrows the field.",
        examMatters: "Examiners reward structured VRIO analysis. Take the case study firm's key resource, test it against each criterion in order, and conclude whether the advantage is temporary or sustained. This framework turns a vague discussion of 'strengths' into rigorous analysis."
      },
      {
        id: "tangible-intangible-competencies",
        title: "Tangible vs Intangible Competencies",
        keyIdea: "The most durable competitive advantages are usually intangible — brand, culture, knowledge, relationships — because they are hardest to see, measure, and copy, which is precisely what makes them defensible.",
        body: [
          { type: "paragraph", text: "**Tangible competencies** are physical or financial resources: factories, equipment, technology, distribution networks, cash reserves. They are visible, measurable, and — critically — easier for competitors to replicate by spending money." },
          { type: "paragraph", text: "**Intangible competencies** are non-physical: brand reputation, organisational culture, employee expertise, patents, customer relationships, and accumulated knowledge. They are harder to measure but typically more valuable because they are far more difficult to copy. A competitor can build a factory; they cannot buy a culture." },
          { type: "paragraph", text: "The most powerful competitive positions combine both. However, competitive advantage is **temporary** without continuous reinvestment and innovation. Even the strongest competencies erode if the firm becomes complacent — markets shift, technologies change, and competitors eventually find ways to catch up or leapfrog." },
          { type: "flow", steps: ["Firm builds tangible + intangible competencies", "Competitors attempt to replicate", "Tangible assets copied relatively quickly", "Intangible assets resist imitation"], result: "Intangible competencies provide more durable advantage — but none last forever without reinvestment", resultType: "neutral" }
        ],
        realExample: { emoji: "📦", text: "Amazon's competitive advantage combines tangible logistics infrastructure (fulfilment centres, delivery fleet) with intangible competencies (data-driven culture, customer obsession, algorithmic expertise). The warehouses can be built by competitors; the culture and data ecosystem cannot be easily replicated." },
        misconception: "Students assume competitive advantage is permanent once established. Wrong — Nokia dominated mobile phones, Blockbuster dominated video rental, and Kodak dominated photography, yet all were overtaken. Instead write: competitive advantage is temporary unless the firm continuously reinvests in and refreshes its core competencies.",
        examMatters: "A top evaluation point: explain why intangible competencies are more sustainable than tangible ones using VRIO logic (they are harder to imitate due to path dependence, social complexity, and causal ambiguity). Then qualify — even intangible advantages erode without reinvestment, as Nokia and Kodak demonstrate."
      }
    ],
    takeaway: [
      "VRIO: valuable → rare → inimitable → organisationally embedded — all four needed for sustained advantage.",
      "Intangible competencies (brand, culture, knowledge) are more defensible than tangible ones (factories, equipment).",
      "Competitive advantage is always temporary — continuous reinvestment is the only way to maintain it."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.5 Assessing Competitiveness to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'assessing-competitiveness');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
