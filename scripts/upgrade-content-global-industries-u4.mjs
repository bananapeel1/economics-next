/**
 * UPGRADE — 4.3.4 Global Industries & MNCs
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-global-industries-u4.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: MNC Impact & Ethics
   * ═══════════════════════════════════════════════════ */
  {
    title: "MNC Impact & Ethics",
    sections: [
      {
        id: "mnc-positive-impacts",
        title: "Positive Impacts of MNCs on Host Countries",
        keyIdea: "MNCs bring jobs, technology, tax revenue, and export earnings to host countries — but the net benefit depends on whether the host government has the governance capacity to capture these gains.",
        body: [
          { type: "paragraph", text: "**Multinational corporations (MNCs)** invest in host countries through FDI, creating direct and indirect benefits. **Employment**: MNCs create jobs directly in their operations and indirectly through local supply chains. A single car factory can support thousands of supplier jobs. **Technology transfer**: MNCs bring advanced production techniques, management practices, and R&D capabilities that spill over to local firms through training, supplier requirements, and worker mobility." },
          { type: "paragraph", text: "**Tax revenue**: MNC operations generate corporation tax, payroll taxes, and VAT that fund public services. **Export earnings**: MNCs often produce goods for export, improving the host country's current account and bringing in foreign currency. **Infrastructure investment**: MNCs may build roads, ports, and telecommunications to support their operations, benefiting the wider economy." },
          { type: "paragraph", text: "However, these positive impacts are not automatic. They depend on the **host government's bargaining power and governance quality**. Countries with strong institutions can negotiate tax commitments, local content requirements, and technology-sharing agreements. Countries with weak governance may find MNCs extract resources while delivering minimal local benefit — a pattern sometimes called the 'resource curse' in mineral-rich developing nations." },
          { type: "flow", steps: ["MNC invests via FDI in host country", "Creates jobs, transfers technology, pays taxes", "Host economy benefits from multiplier effects"], result: "Net positive impact — but only if host governance captures the gains effectively", resultType: "good" }
        ],
        realExample: { emoji: "📱", text: "Samsung's investment in Vietnam is one of the most successful FDI stories. Samsung employs over 100,000 Vietnamese workers, accounts for roughly a quarter of Vietnam's total exports, and has attracted dozens of Korean supplier firms to relocate nearby — creating an industrial cluster that has transformed Vietnam's manufacturing capability and lifted wages in the surrounding provinces." },
        misconception: "Students assume MNCs always benefit host countries. Wrong — benefits depend on the host country's governance, bargaining power, and the MNC's industry. Extractive industries (mining, oil) often deliver fewer benefits than manufacturing because they create fewer jobs, use less local labour, and are more prone to environmental damage. Instead write: the net impact of MNC investment depends on the industry, the host country's institutional capacity, and the specific terms negotiated between the MNC and the government.",
        examMatters: "Examiners expect a balanced evaluation. List specific positive impacts (jobs, technology, taxes, exports) and then challenge each one: Are the jobs high-quality? Is technology actually transferred or kept in-house? Are taxes paid in full or minimised through transfer pricing? A strong answer evaluates each claimed benefit rather than listing them uncritically."
      },
      {
        id: "mnc-negative-impacts-ethics",
        title: "Negative Impacts & Ethical Concerns",
        keyIdea: "MNCs can repatriate profits, exploit cheap labour, damage the environment, and use transfer pricing to avoid tax — making their net impact on host countries deeply contested.",
        body: [
          { type: "paragraph", text: "**Profit repatriation**: MNCs send profits back to shareholders in the home country rather than reinvesting locally. This drains wealth from the host economy — the FDI inflow generates local activity, but much of the value created leaves the country as dividends. In extreme cases, repatriated profits exceed the original investment, making the host country a net loser." },
          { type: "paragraph", text: "**Labour exploitation**: MNCs may exploit low wages, weak labour laws, and poor enforcement in developing countries. Long hours, unsafe conditions, child labour in supply chains, and suppression of trade unions are persistent concerns. **Environmental damage**: looser environmental regulations in developing countries attract MNCs seeking to reduce compliance costs — a 'pollution haven' effect that shifts environmental harm to the world's poorest communities." },
          { type: "paragraph", text: "**Transfer pricing** allows MNCs to shift profits to low-tax jurisdictions by manipulating the prices charged between their own subsidiaries. A subsidiary in a high-tax country sells components to a subsidiary in a low-tax country at below-market prices, reducing reported profit where taxes are high. This deprives host governments of legitimate tax revenue and distorts competition with local firms who cannot use the same strategies." },
          { type: "flow", steps: ["MNC operates across multiple countries", "Profits repatriated, labour exploited, environment damaged", "Transfer pricing shifts taxable profits to low-tax havens"], result: "Host country bears costs while benefits are captured by MNC shareholders abroad", resultType: "bad" }
        ],
        realExample: { emoji: "🛢️", text: "Shell's operations in the Niger Delta in Nigeria illustrate the worst-case MNC impact. Oil extraction generated billions in revenue, but local communities suffered oil spills, gas flaring, environmental devastation, and minimal employment. Profit was repatriated to shareholders in London and The Hague while the Niger Delta remained one of Africa's most polluted and impoverished regions — a stark example of how MNC investment can harm host communities when governance is weak." },
        misconception: "Students assume all MNCs deliberately exploit host countries. Wrong — many MNCs invest in CSR programmes, pay above-market wages, and comply with international labour standards. The negative impacts are most severe where host governance is weakest. Instead write: the ethical impact of MNCs varies enormously — the same firm may have excellent practices in one country and exploitative practices in another, depending on local regulatory enforcement and civil society pressure.",
        examMatters: "A strong exam answer balances positive and negative impacts, then evaluates: 'The net impact depends on the host country's governance capacity, the MNC's industry, and the specific regulatory framework.' This shows the examiner you can weigh evidence rather than taking a one-sided position."
      }
    ],
    takeaway: [
      "Positive MNC impacts: jobs, technology transfer, tax revenue, exports, infrastructure — but none are guaranteed.",
      "Negative impacts: profit repatriation, labour exploitation, environmental damage, transfer pricing — worst where governance is weak.",
      "Net impact depends on host government bargaining power, industry type, and regulatory enforcement.",
      "Evaluative answers must weigh both sides and conclude with context-dependent judgement."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Transfer Pricing & FDI Stakeholders
   * ═══════════════════════════════════════════════════ */
  {
    title: "Transfer Pricing & FDI Stakeholders",
    sections: [
      {
        id: "transfer-pricing-mechanism",
        title: "Transfer Pricing & International Tax Avoidance",
        keyIdea: "Transfer pricing manipulates intra-company prices to shift profits to low-tax jurisdictions — it is legal within limits but costs governments billions in lost tax revenue and is the focus of major OECD reform efforts.",
        body: [
          { type: "paragraph", text: "**Transfer pricing** is the price charged between subsidiaries of the same MNC for goods, services, or intellectual property. When these prices deviate from **arm's length** (what unrelated parties would charge), the MNC can artificially shift profits to subsidiaries in low-tax jurisdictions. For example, an MNC might charge its UK subsidiary a high price for using a brand name owned by an Irish subsidiary, reducing UK taxable profit and increasing profit in Ireland where corporation tax is lower." },
          { type: "paragraph", text: "The scale is enormous. The OECD estimates that profit-shifting by MNCs costs governments $100-240 billion per year in lost tax revenue — equivalent to 4-10% of global corporate tax receipts. Developing countries are disproportionately affected because they lack the resources to audit complex MNC accounts and challenge aggressive transfer pricing arrangements." },
          { type: "paragraph", text: "The **OECD BEPS (Base Erosion and Profit Shifting)** framework is the main international response. It establishes rules requiring MNCs to report profits and taxes paid country-by-country, mandates arm's-length pricing, and proposes a global minimum corporate tax rate of 15%. However, enforcement remains patchy because tax competition between countries creates a 'race to the bottom' — countries offer low rates to attract MNC investment, undermining collective action." },
          { type: "flow", steps: ["MNC sets intra-company transfer prices above/below market rates", "Profits shifted from high-tax to low-tax subsidiaries", "Host governments lose tax revenue"], result: "Legal tax avoidance — but the OECD BEPS framework is tightening rules globally", resultType: "bad" }
        ],
        realExample: { emoji: "🍏", text: "Apple routed billions in international profits through Irish subsidiaries that employed only a handful of staff, paying an effective tax rate as low as 0.005% on European profits. The European Commission ruled that Ireland had granted Apple illegal state aid and ordered Apple to pay 13 billion euros in back taxes — a landmark case that exposed how transfer pricing and tax rulings allow MNCs to minimise tax obligations on a massive scale." },
        misconception: "Students confuse tax avoidance with tax evasion. Wrong — tax avoidance (including transfer pricing) is legal, using loopholes and structures permitted by law. Tax evasion is illegal concealment of income. Instead write: transfer pricing is a form of legal tax avoidance that exploits differences between national tax systems; the OECD BEPS framework aims to close these gaps without criminalising the firms that use them.",
        examMatters: "Examiners ask about the impact of transfer pricing on stakeholders. Structure your answer: governments lose tax revenue, local competitors face unfair cost advantages, consumers may benefit from lower prices, and shareholders benefit from higher after-tax profits. Always mention BEPS as the regulatory response and evaluate whether it is likely to succeed."
      },
      {
        id: "fdi-stakeholder-analysis",
        title: "FDI Stakeholder Analysis: Host & Home Country",
        keyIdea: "FDI creates winners and losers in both the host country and the home country — a complete stakeholder analysis must consider workers, local firms, governments, and communities on both sides.",
        body: [
          { type: "paragraph", text: "In the **host country**, FDI affects multiple stakeholders. **Workers** gain jobs and skills, but may face low wages and poor conditions if regulation is weak. **Local firms** face increased competition from a well-resourced MNC but may benefit as suppliers to the MNC's operations. **Government** gains tax revenue and economic growth but may lose policy autonomy as MNCs demand favourable terms. **Local communities** may gain infrastructure and services but suffer environmental damage or cultural disruption." },
          { type: "paragraph", text: "In the **home country** (where the MNC is headquartered), the effects mirror inversely. **Shareholders** benefit from higher returns generated by cheaper overseas production. **Domestic workers** may lose jobs as production is offshored — the 'hollowing out' of manufacturing in developed economies. **Government** may lose tax revenue through transfer pricing but gains from repatriated profits and dividends taxed domestically. **Consumers** may benefit from lower prices on goods produced more cheaply abroad." },
          { type: "paragraph", text: "A complete evaluation recognises that FDI is not a zero-sum game — it can create value for stakeholders in both countries — but the **distribution** of gains is uneven. The key determinant is **governance**: strong institutions, transparent regulation, and effective tax enforcement ensure that FDI benefits are shared widely rather than captured by MNC shareholders and political elites." },
          { type: "flow", steps: ["MNC invests in host country via FDI", "Host: jobs created, competition intensifies, tax revenue gained/lost", "Home: jobs offshored, shareholders gain, consumers benefit from lower prices"], result: "Both countries affected — distribution of gains depends on governance and bargaining power", resultType: "neutral" }
        ],
        realExample: { emoji: "📦", text: "Amazon's Luxembourg tax structure illustrates home/host stakeholder tensions. Amazon routes European sales through a Luxembourg subsidiary, reducing tax paid in countries like the UK, Germany, and France where sales actually occur. UK high-street retailers (local firms) compete against Amazon's lower tax burden. UK government loses corporation tax revenue. UK consumers benefit from lower prices and fast delivery — a classic case where stakeholder impacts diverge sharply." },
        misconception: "Students analyse FDI impacts only on the host country and forget the home country. Wrong — FDI creates offshoring that reduces manufacturing employment at home and transfer pricing that reduces home-country tax revenue too. Instead write: a complete stakeholder analysis considers both host country (workers, local firms, government, community) and home country (shareholders, domestic workers, government, consumers) to evaluate the full impact of FDI.",
        examMatters: "Examiners reward structured stakeholder analysis. Create a clear framework: list stakeholders in the host country and home country separately, explain the positive and negative impact on each, then evaluate which stakeholders gain most and which lose most. Conclude with: 'The overall impact depends on the quality of governance in the host country and the regulatory framework governing the MNC.'"
      }
    ],
    takeaway: [
      "Transfer pricing shifts profits to low-tax jurisdictions via manipulated intra-company prices — costing governments billions.",
      "OECD BEPS framework: country-by-country reporting, arm's-length pricing, global minimum tax of 15%.",
      "FDI stakeholder analysis must cover both host (workers, local firms, government, community) and home (shareholders, domestic workers, government, consumers).",
      "The distribution of FDI gains depends on governance quality, regulatory enforcement, and the MNC's industry."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.4 Global Industries & MNCs to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'global-industries-mncs');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 2 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
