/**
 * UPGRADE — 4.3.4 Poverty and Inequality
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-poverty-inequality.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Types of Poverty
   * ═══════════════════════════════════════════════════ */
  {
    title: "Types of Poverty",
    sections: [
      {
        id: "absolute-relative-poverty",
        title: "Absolute and Relative Poverty",
        keyIdea: "Absolute poverty means falling below the survival threshold ($2.15/day), while relative poverty means earning below 60% of the median — growth can reduce one while worsening the other.",
        body: [
          { type: "paragraph", text: "**Absolute poverty** is defined as an income level below which a person cannot meet basic needs — food, clean water, shelter, and clothing. The World Bank sets this at $2.15 per day (2022 PPP). Anyone below this threshold lacks the resources for physical survival regardless of what others in their society earn." },
          { type: "paragraph", text: "**Relative poverty** is defined in relation to the living standards of the rest of society — typically below 60% of median household income. A person can be lifted from absolute poverty but still be relatively poor if the gap between them and the median widens. This distinction matters enormously for policy: economic growth reliably reduces absolute poverty but may worsen relative poverty if the gains accrue disproportionately to the rich." },
          { type: "paragraph", text: "The two measures can move in opposite directions. A country experiencing rapid growth may see millions escape absolute poverty while inequality simultaneously widens — meaning relative poverty rises. Policymakers must therefore track both measures to get an accurate picture of living standards." },
          { type: "flow", steps: ["Economic growth raises average incomes", "Absolute poverty falls as more people cross the survival threshold", "But if the rich gain proportionally more", "Relative poverty may rise even as absolute poverty falls"], result: "Growth is necessary but insufficient — distribution matters too", resultType: "neutral" }
        ],
        realExample: { emoji: "🇨🇳", text: "China lifted over 800 million people out of absolute poverty between 1978 and 2020 — the largest poverty reduction in history. However, its Gini coefficient rose from roughly 0.30 to 0.47 over the same period, meaning relative inequality worsened dramatically even as the poorest gained." },
        misconception: "Students assume economic growth automatically reduces all forms of poverty. Wrong — growth reduces absolute poverty but can worsen relative poverty if income gains are unevenly distributed. Instead write: growth is necessary to reduce absolute poverty, but without redistribution policies, the gap between rich and poor may widen.",
        examMatters: "Examiners frequently ask you to distinguish between absolute and relative poverty. Always define both precisely, then explain how a single policy (e.g. GDP growth) can reduce one while worsening the other — this analytical distinction earns the highest marks."
      },
      {
        id: "lorenz-curve-gini",
        title: "Lorenz Curve and Gini Coefficient",
        keyIdea: "The Lorenz curve plots cumulative income share against cumulative population share, and the Gini coefficient (A divided by A+B) converts that picture into a single number between 0 and 1.",
        body: [
          { type: "paragraph", text: "The **Lorenz curve** is a graphical representation of income or wealth distribution. It plots the cumulative percentage of the population (from poorest to richest) on the x-axis against the cumulative percentage of income they receive on the y-axis. A perfectly equal society produces a 45-degree line; the further the Lorenz curve bows away from this line, the more unequal the distribution." },
          { type: "paragraph", text: "The **Gini coefficient** quantifies inequality as a single number. It equals the area between the line of equality and the Lorenz curve (area A) divided by the total area under the line of equality (A + B). A Gini of 0 means perfect equality; a Gini of 1 means one person holds all income. Most countries fall between 0.25 and 0.65." },
          { type: "paragraph", text: "A key limitation is that two very different income distributions can produce the same Gini coefficient — a country where the middle class earns disproportionately less and one where the poorest earn disproportionately less might both have a Gini of 0.40. The Gini also ignores non-monetary factors like access to public services, which can significantly affect real living standards." }
        ],
        realExample: { emoji: "🇿🇦", text: "South Africa has the world's highest Gini coefficient at approximately 0.63, reflecting extreme inequality rooted in apartheid-era land and wealth distribution. By contrast, Denmark's Gini of roughly 0.28 reflects decades of progressive taxation and universal public services compressing the income distribution." },
        misconception: "Students treat the Gini coefficient as a perfect measure of inequality. Wrong — two countries with identical Gini values can have very different distributions, and the Gini ignores non-income factors like free healthcare. Instead write: the Gini is a useful summary statistic, but always acknowledge its limitations — it cannot reveal where in the distribution inequality is concentrated.",
        examMatters: "Examiners expect you to draw a Lorenz curve, label the line of equality, identify areas A and B, and state the formula Gini = A/(A+B). For evaluation, always note that the same Gini can arise from very different underlying distributions — this shows analytical depth."
      }
    ],
    takeaway: [
      "Absolute poverty = below survival threshold; relative poverty = below 60% of median income.",
      "Growth reduces absolute poverty but may worsen relative poverty if gains are unevenly distributed.",
      "The Gini coefficient (0 to 1) summarises inequality but cannot show where in the distribution the problem lies.",
      "Always evaluate both measures together — neither tells the full story alone."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Causes and Consequences
   * ═══════════════════════════════════════════════════ */
  {
    title: "Causes and Consequences",
    sections: [
      {
        id: "causes-inequality",
        title: "Causes of Inequality",
        keyIdea: "Inequality stems from wage differentials driven by human capital and MRP, wealth concentration passed between generations, globalisation rewarding skilled workers, and tax policy choices.",
        body: [
          { type: "paragraph", text: "**Wage differentials** are the primary driver of income inequality. Workers with higher human capital — education, skills, experience — command higher wages because their **marginal revenue product (MRP)** is greater. A surgeon earns more than a cleaner because the revenue generated by each additional hour of their labour differs enormously. These differentials are amplified by barriers to entry: professional qualifications restrict supply, pushing wages higher for those inside the profession." },
          { type: "paragraph", text: "**Wealth concentration** reinforces inequality across generations. The wealthy earn investment returns, inherit assets, and can fund better education for their children — creating a self-perpetuating cycle. **Globalisation** has widened inequality within countries: highly skilled workers who can sell services globally see their earnings soar, while low-skilled workers face wage competition from cheaper overseas labour." },
          { type: "paragraph", text: "**Tax and transfer policy** plays a crucial role. Progressive tax systems redistribute income downward, while regressive taxes (like VAT) take a larger proportion from the poor. Government choices about tax rates, loopholes, and public spending significantly shape the final income distribution after market forces have determined pre-tax incomes." },
          { type: "flow", steps: ["Globalisation opens international markets", "Skilled workers sell services globally at premium wages", "Unskilled workers face competition from lower-wage economies", "Income gap between skilled and unskilled widens"], result: "Globalisation increases inequality within countries even as it may reduce it between countries", resultType: "neutral" }
        ],
        realExample: { emoji: "🇺🇸", text: "In the United States, the CEO-to-worker pay ratio rose from approximately 20:1 in 1965 to around 350:1 in 2023. This dramatic widening reflects rising returns to human capital at the top, stock-based compensation, and tax policy changes that reduced top marginal rates from 91% to 37%." },
        misconception: "Students say inequality is caused only by differences in effort or talent. Wrong — structural factors like inherited wealth, access to education, discrimination, and tax policy all shape the distribution independently of individual merit. Instead write: inequality reflects both market outcomes (MRP differences) and structural factors (wealth inheritance, institutional design, policy choices).",
        examMatters: "Examiners want you to analyse multiple causes, not just list them. Link each cause to a mechanism: human capital explains wage differentials via MRP, globalisation works through labour market competition, and tax policy operates through redistribution. Chains of reasoning earn higher marks than isolated points."
      },
      {
        id: "consequences-redistribution",
        title: "Consequences and Redistribution",
        keyIdea: "High inequality reduces social mobility and aggregate demand (the poor have a higher MPC), creating an equity-efficiency trade-off that redistribution policies attempt to navigate.",
        body: [
          { type: "paragraph", text: "Inequality has significant economic consequences. **Reduced social mobility** means that where you are born on the income ladder increasingly determines where you end up — talent is wasted when the poor cannot access education or capital. Lower aggregate demand results because the poor have a **higher marginal propensity to consume (MPC)** — transferring income from rich to poor increases total spending in the economy." },
          { type: "paragraph", text: "Redistribution tools include **progressive taxation** (higher earners pay a larger share), **transfer payments** (benefits, pensions, tax credits), and **in-kind provision** (free healthcare, education). Each faces the **equity-efficiency trade-off**: too much redistribution may reduce incentives to work and invest, while too little allows poverty and wasted human potential." },
          { type: "paragraph", text: "The **Laffer curve** suggests that beyond a certain tax rate, revenue actually falls because high rates discourage economic activity. **Poverty traps** arise when the withdrawal of benefits as income rises creates effective marginal tax rates above 80%, removing the incentive to work more. Good policy design must balance adequate support with maintained work incentives." },
          { type: "flow", steps: ["Government raises progressive taxes and increases transfers", "Post-tax income distribution becomes more equal", "But high marginal rates may reduce work incentives", "Equity-efficiency trade-off must be managed"], result: "Redistribution improves equity but risks reducing economic efficiency if poorly designed", resultType: "neutral" }
        ],
        realExample: { emoji: "🇸🇪", text: "The Scandinavian model — particularly Sweden and Denmark — combines high redistribution through progressive taxation and generous public services with high social mobility and strong economic performance. Top marginal tax rates exceed 55%, yet these countries consistently rank among the most competitive economies, challenging the simple equity-efficiency trade-off narrative." },
        misconception: "Students assume redistribution always reduces efficiency. Wrong — the Scandinavian evidence shows that well-designed redistribution can enhance efficiency by improving human capital and social mobility. Instead write: the equity-efficiency trade-off is real, but its severity depends on policy design — universal services and well-targeted transfers can improve both equity and long-run growth.",
        examMatters: "Examiners love the equity-efficiency trade-off as an evaluation theme. Go beyond the basic trade-off: argue that some redistribution (e.g. funding education) improves both equity and efficiency by developing human capital, while other forms (e.g. poorly designed benefits) may create poverty traps — distinguish between the two for top marks."
      }
    ],
    takeaway: [
      "Inequality is caused by wage differentials (MRP), wealth concentration, globalisation, and tax policy.",
      "High inequality reduces social mobility and aggregate demand (poor have higher MPC).",
      "Redistribution uses progressive taxes, transfers, and in-kind provision — but faces the equity-efficiency trade-off.",
      "Poverty traps and the Laffer curve constrain how far redistribution can go without undermining incentives."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.4 Poverty and Inequality to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'poverty-inequality');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
