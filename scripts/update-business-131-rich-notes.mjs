/**
 * RICH NOTES — Business 1.3.1 Meeting Customer Needs
 * ====================================================
 * Edexcel IAL Business Unit 1, spec point 1.3.1
 * Pushes rich-format notes to Supabase section_notes table.
 *
 * Run with: node scripts/update-business-131-rich-notes.mjs
 */

import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  RICH NOTES — Meeting Customer Needs (1.3.1)
 *
 *  5 chapters, rich format with blocks, flows, formulas,
 *  exam tips, misconceptions and takeaways.
 * ═══════════════════════════════════════════════════════════ */

const NOTES = [

  /* ─────────────────────────────────────────────────
   *  Chapter 1: The Market
   * ───────────────────────────────────────────────── */
  {
    title: "The Market",
    meta: "6 concepts",
    keyIdea: "Every product lives inside a market, but markets differ hugely by how wide their audience is, how fast conditions change, and how fiercely firms compete for customers.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Mass market</strong> — the largest part of a market where products are designed to appeal to the widest possible range of consumers, allowing firms to benefit from economies of scale."
          },
          {
            type: "def",
            text: "<strong>Niche market</strong> — a small, well-defined segment of a larger market where firms meet specific customer needs and can often charge premium prices due to less direct competition.",
            tag: "exam"
          },
          {
            type: "def",
            text: "<strong>Dynamic market</strong> — a market subject to rapid and continuous change driven by shifts in technology, consumer tastes, or competitive conditions."
          }
        ]
      },
      {
        title: "HOW MARKETS WORK",
        items: [
          {
            type: "mech",
            text: "Mass markets generate <strong>high sales volume</strong> but attract intense competition from large firms with big marketing budgets, squeezing profit margins."
          },
          {
            type: "mech",
            text: "Niche markets face less competition but the total market size is small, so firms depend on <strong>customer loyalty</strong> and premium pricing to stay profitable."
          },
          {
            type: "mech",
            text: "In dynamic markets, firms face <strong>risk</strong> (measurable probability of an outcome) and <strong>uncertainty</strong> (outcomes that cannot be predicted), which both increase as the pace of change accelerates."
          },
          {
            type: "imp",
            text: "Online retailing and globalisation have made most markets more dynamic, shortening product life cycles and forcing continuous innovation.",
            tag: "exam"
          }
        ]
      }
    ],
    flow: {
      steps: ["Online retail grows", "Product life cycles shorten", "Firms must innovate faster"],
      result: "Competitive advantage for adaptable firms",
      resultType: "good"
    },
    misconception: "Students say niche markets are always better because they have less competition. Wrong because a small total market limits revenue, and one large competitor entering the niche can wipe out smaller firms. Instead write: niche markets suit firms with limited resources seeking premium margins, but mass markets offer greater growth potential if the firm can achieve economies of scale.",
    takeaway: [
      "Mass markets trade customisation for volume and scale; niche markets trade volume for premium prices and loyalty.",
      "Dynamic markets reward firms that innovate quickly and punish those that stand still.",
      "Risk can be calculated and planned for; uncertainty cannot, so firms must stay flexible."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 2: Market Research
   * ───────────────────────────────────────────────── */
  {
    title: "Market Research",
    meta: "6 concepts",
    keyIdea: "Launching a product without research is like driving blindfolded; good research reduces the risk of failure by revealing what customers actually want before the firm commits resources.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Primary research</strong> — first-hand data collected directly by or for the firm through surveys, interviews, focus groups and observations; it is specific and up-to-date but expensive and time-consuming."
          },
          {
            type: "def",
            text: "<strong>Secondary research</strong> — data that already exists, gathered from sources such as government statistics, trade publications and competitor reports; it is cheaper and quicker but may be outdated or not tailored to the firm's needs."
          },
          {
            type: "def",
            text: "<strong>Qualitative data</strong> — non-numerical information about opinions, motivations and attitudes, collected through methods like interviews and focus groups."
          },
          {
            type: "def",
            text: "<strong>Quantitative data</strong> — numerical, measurable data that can be analysed statistically, such as sales figures, survey percentages and market size."
          }
        ]
      },
      {
        title: "SAMPLING",
        items: [
          {
            type: "mech",
            text: "<strong>Random sampling</strong> gives every member of the target population an equal chance of being selected, reducing bias but sometimes producing unrepresentative results."
          },
          {
            type: "mech",
            text: "<strong>Stratified sampling</strong> divides the population into distinct subgroups and samples from each in proportion, ensuring key segments are properly represented."
          },
          {
            type: "mech",
            text: "<strong>Quota sampling</strong> sets a target number of respondents from each subgroup and fills each quota using convenience selection; it is faster and cheaper but more prone to researcher bias."
          }
        ]
      }
    ],
    flow: {
      steps: ["Conduct thorough research", "Anticipate market changes", "Tailor product to real needs"],
      result: "Reduced risk of product failure",
      resultType: "good"
    },
    examMatters: "Examiners want you to evaluate primary versus secondary research by linking each to the context of the business. A start-up with a limited budget may rely on secondary data first, while an established firm launching in a new market should invest in primary research to understand unfamiliar customers.",
    takeaway: [
      "Primary research is tailored but costly; secondary research is quick but may not fit the firm's specific needs.",
      "Quantitative data tells you what is happening; qualitative data tells you why.",
      "The best research strategy usually combines both primary and secondary methods to offset each other's weaknesses."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 3: Market Positioning
   * ───────────────────────────────────────────────── */
  {
    title: "Market Positioning",
    meta: "6 concepts",
    keyIdea: "Successful firms do not just sell products; they occupy a distinctive place in the customer's mind by understanding gaps in the market and building something rivals cannot easily copy.",
    blocks: [
      {
        title: "APPROACHES",
        items: [
          {
            type: "def",
            text: "<strong>Product orientation</strong> — the firm develops the product first based on its own expertise or innovation, then tries to find a market for it; common in technology and pharmaceutical industries."
          },
          {
            type: "def",
            text: "<strong>Market orientation</strong> — the firm identifies customer needs and wants first through research, then develops products to meet them; this approach reduces the risk of launching products nobody wants.",
            tag: "exam"
          }
        ]
      },
      {
        title: "TOOLS",
        items: [
          {
            type: "mech",
            text: "<strong>Market mapping</strong> plots products on a grid using two variables such as price and quality, helping firms spot gaps in the market where customer needs are not being met."
          },
          {
            type: "mech",
            text: "<strong>Product differentiation</strong> makes a product distinct from competitors through design, features, quality, branding or customer service to create a competitive advantage."
          },
          {
            type: "mech",
            text: "A <strong>unique selling point</strong> (USP) is the one feature that sets a product apart and gives customers a clear reason to choose it over every rival."
          },
          {
            type: "link",
            text: "Effective positioning links directly to branding; a strong brand reinforces the USP and makes the product's position in the market harder for competitors to challenge."
          }
        ]
      }
    ],
    flow: {
      steps: ["Identify customer need", "Map gaps in the market", "Build a clear USP"],
      result: "Sustainable competitive advantage",
      resultType: "good"
    },
    examMatters: "Examiners reward answers that connect positioning tools together. Show how market mapping identifies the gap, product differentiation fills it, and the USP communicates it to customers. Do not describe each tool in isolation.",
    takeaway: [
      "Market orientation reduces risk because the product is designed around proven demand.",
      "Market mapping reveals gaps, but a gap does not guarantee demand; always check with research.",
      "A strong USP is the bridge between differentiation and customer loyalty."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 4: Market Size, Share & Growth
   * ───────────────────────────────────────────────── */
  {
    title: "Market Size, Share & Growth",
    meta: "3 concepts + formulas",
    keyIdea: "Three diagnostic metrics tell you how big the market is, what slice of it a firm owns, and whether the whole market is expanding or shrinking; together they reveal competitive strength.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Market size</strong> — the total volume of units sold or the total value of sales revenue in a market over a given period; it tells firms whether a market is large enough to be worth entering."
          },
          {
            type: "def",
            text: "<strong>Market share</strong> — the proportion of total market sales held by one firm or product, expressed as a percentage; a rising share means the firm is outperforming competitors."
          },
          {
            type: "def",
            text: "<strong>Market growth</strong> — the percentage change in total market size over a given time period; a growing market creates more opportunities but also attracts new competitors.",
            tag: "exam"
          },
          {
            type: "imp",
            text: "Rising market share inside a growing market is the strongest position a firm can hold, because it means the firm is winning customers in an expanding arena.",
            tag: "exam"
          }
        ]
      }
    ],
    formulas: [
      {
        label: "MARKET SHARE",
        text: "Market Share (%) = (Firm's Sales \u00f7 Total Market Sales) \u00d7 100"
      },
      {
        label: "MARKET GROWTH",
        text: "Market Growth (%) = ((New Market Size \u2212 Old Market Size) \u00f7 Old Market Size) \u00d7 100"
      }
    ],
    examMatters: "Examiners expect you to calculate market share or market growth first, then use the number to support an evaluation. Never jump straight to analysis without showing the calculation; the mark scheme almost always awards separate marks for the formula and the interpretation.",
    takeaway: [
      "Market size tells you if the opportunity is worth pursuing; market share tells you if the firm is winning.",
      "Always calculate before you evaluate; a number anchors your analysis and earns method marks.",
      "A firm can grow its share even in a shrinking market by outcompeting weaker rivals."
    ]
  },

  /* ─────────────────────────────────────────────────
   *  Chapter 5: Branding
   * ───────────────────────────────────────────────── */
  {
    title: "Branding",
    meta: "4 concepts",
    keyIdea: "A brand is a promise stored in the customer's mind; when that promise is consistently kept, it builds loyalty, justifies premium pricing, and creates a moat competitors struggle to cross.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          {
            type: "def",
            text: "<strong>Branding</strong> — the process of creating a distinctive name, logo, image and reputation that differentiates a product from competitors in the minds of consumers."
          },
          {
            type: "def",
            text: "<strong>Brand extension</strong> — using an established brand name to launch products in new categories, reducing the cost and risk of entering new markets because consumers already trust the brand."
          }
        ]
      },
      {
        title: "MECHANISMS",
        items: [
          {
            type: "mech",
            text: "Strong brands build <strong>customer loyalty</strong>, meaning buyers repeatedly choose the brand over rivals, reducing the firm's marketing costs and stabilising revenue."
          },
          {
            type: "mech",
            text: "Loyal customers accept <strong>premium pricing</strong> because they trust the brand delivers consistent quality, which directly increases profit margins per unit."
          },
          {
            type: "mech",
            text: "An established brand creates <strong>barriers to entry</strong> because new competitors must spend heavily on marketing to persuade customers to switch away from a name they already trust.",
            tag: "exam"
          },
          {
            type: "link",
            text: "Branding links to product differentiation and USP; a strong brand is often the most visible expression of what makes a product different."
          }
        ]
      }
    ],
    flow: {
      steps: ["Invest in brand consistently", "Build deep customer loyalty", "Charge premium prices"],
      result: "Competitive moat that protects long-term profits",
      resultType: "good"
    },
    misconception: "Students say branding is just about having a recognisable logo. Wrong because a brand encompasses the entire customer experience, including quality, reliability, service and emotional associations. Instead write: branding is the total perception a customer holds, built through consistent delivery on promises across every touchpoint.",
    takeaway: [
      "A brand is not a logo; it is the total perception customers hold, built through consistent quality and experience.",
      "Strong brands allow premium pricing, reduce marketing costs, and create barriers to entry.",
      "Brand extension leverages existing trust to enter new markets at lower risk and cost."
    ]
  }

];

/* ═══════════════════════════════════════════════════════════
 *  RUNNER — push rich notes to Supabase
 * ═══════════════════════════════════════════════════════════ */
async function main() {
  const sectionId = 'meeting-customer-needs';

  console.log(`Updating rich notes for section: ${sectionId}`);
  console.log(`  Chapters: ${NOTES.length}`);

  const totalBlocks = NOTES.reduce((sum, ch) => sum + ch.blocks.length, 0);
  const totalItems = NOTES.reduce((sum, ch) =>
    sum + ch.blocks.reduce((s, b) => s + b.items.length, 0), 0);

  console.log(`  Blocks:   ${totalBlocks}`);
  console.log(`  Items:    ${totalItems}`);
  console.log('');

  const { error } = await supabase
    .from('section_notes')
    .update({ data: NOTES })
    .eq('section_id', sectionId);

  if (error) {
    console.error(`FAILED: ${error.message}`);
    process.exit(1);
  }

  console.log('SUCCESS — rich notes pushed to Supabase.');

  /* Verify the update */
  const { data, error: readErr } = await supabase
    .from('section_notes')
    .select('section_id, data')
    .eq('section_id', sectionId)
    .single();

  if (readErr) {
    console.warn(`Could not verify: ${readErr.message}`);
  } else if (data?.data?.length === NOTES.length) {
    console.log(`VERIFIED — ${data.data.length} chapters stored.`);
  } else {
    console.warn(`Verification mismatch: expected ${NOTES.length} chapters, got ${data?.data?.length ?? 0}.`);
  }
}

main();
