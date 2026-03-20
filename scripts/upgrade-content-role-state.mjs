/**
 * UPGRADE — 4.3.5 Role of the State in the Macroeconomy
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-role-state.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Market Failure and the State
   * ═══════════════════════════════════════════════════ */
  {
    title: "Market Failure and the State",
    sections: [
      {
        id: "public-goods",
        title: "Public Goods",
        keyIdea: "Public goods are non-excludable and non-rivalrous, so the free rider problem causes complete market failure — no private firm will supply them, making state provision essential.",
        body: [
          { type: "paragraph", text: "A **public good** has two defining characteristics: **non-excludability** (once provided, no one can be prevented from using it) and **non-rivalry** (one person's consumption does not reduce availability for others). These properties create the **free rider problem** — rational individuals will not pay voluntarily because they can benefit whether they pay or not." },
          { type: "paragraph", text: "Because no one can be excluded, a private firm cannot charge a price — there is no revenue mechanism. This is **complete market failure**: the good has clear social value but zero private provision. The state must therefore provide public goods and fund them through taxation, compelling all citizens to contribute." },
          { type: "paragraph", text: "It is important to distinguish public goods from **merit goods** (which are excludable but under-consumed) and from goods that are simply provided by the government. Many state-provided goods — housing, education — are not public goods because they are both excludable and rivalrous. The test is always the two properties, not who provides the good." },
          { type: "flow", steps: ["Good is non-excludable and non-rivalrous", "Free rider problem emerges — no one pays voluntarily", "Private firms cannot generate revenue", "Complete market failure — zero private provision"], result: "State must provide and fund through taxation", resultType: "neutral" }
        ],
        realExample: { emoji: "🛡️", text: "National defence is the textbook public good. Once an army protects a country, every citizen benefits regardless of whether they pay taxes (non-excludable), and one person being protected does not reduce protection for others (non-rivalrous). No private firm would supply it because free riders would never pay." },
        misconception: "Students confuse public goods with goods provided by the public sector. Wrong — the NHS, state schools, and council housing are all excludable and rivalrous, so they are not public goods. Instead write: a public good is defined by non-excludability and non-rivalry, not by who provides it — many government-provided goods do not meet these criteria.",
        examMatters: "Examiners test the two characteristics precisely. Always state both non-excludability and non-rivalry, explain how they lead to the free rider problem, and then link to complete market failure. A common error is listing examples without explaining the mechanism — always show the chain of reasoning."
      },
      {
        id: "merit-goods-redistribution",
        title: "Merit Goods and Redistribution",
        keyIdea: "Merit goods are under-consumed because individuals underestimate their private benefits due to information failure — the state intervenes through subsidies, free provision, or regulation.",
        body: [
          { type: "paragraph", text: "**Merit goods** are goods that generate greater benefits than individuals realise at the point of consumption. People **under-consume** them because of **information failure** — they do not fully appreciate the long-term private benefits (e.g. better health from vaccination, higher lifetime earnings from education). This creates a divergence between private and social optimum." },
          { type: "paragraph", text: "The state corrects this through several mechanisms: **subsidies** lower the price to increase consumption, **free provision** removes the price barrier entirely, and **regulation** can mandate consumption (e.g. compulsory education until age 18). Each intervention aims to move consumption from the privately optimal level to the socially optimal level." },
          { type: "paragraph", text: "The main criticism is **paternalism** — the state is overriding individual preferences, assuming it knows better than citizens what is good for them. Libertarians argue that adults should be free to make their own choices, even poor ones. The counter-argument is that information failure is genuine: without intervention, the poorest suffer most because they lack access to information and resources needed to make fully informed decisions." },
          { type: "flow", steps: ["Individuals underestimate private benefits of merit goods", "Consumption falls below the socially optimal level", "State subsidises, provides free, or mandates consumption", "Consumption rises towards the social optimum"], result: "Improved welfare outcomes but raises paternalism concerns", resultType: "neutral" }
        ],
        realExample: { emoji: "🏥", text: "The NHS provides healthcare free at the point of use — a classic merit good intervention. Without it, individuals would under-consume healthcare (especially preventive care) due to information failure and inability to pay. Free provision ensures universal access and reduces the long-term social costs of untreated illness." },
        misconception: "Students say merit goods are the same as public goods. Wrong — merit goods are excludable and rivalrous (a hospital bed used by one patient cannot be used by another), but they are under-consumed due to information failure. Instead write: merit goods suffer from under-consumption, not complete market failure — the market provides them, just not enough of them.",
        examMatters: "Examiners want you to explain precisely why merit goods are under-consumed — the answer is information failure, not just 'they are good for society'. Show the divergence between private benefit and social benefit on a diagram, then evaluate the paternalism criticism for top marks."
      }
    ],
    takeaway: [
      "Public goods: non-excludable + non-rivalrous = free rider problem = complete market failure.",
      "Merit goods: under-consumed due to information failure — corrected by subsidies, free provision, or regulation.",
      "Do not confuse public goods (zero market provision) with merit goods (insufficient market provision).",
      "Paternalism is the key criticism of merit good intervention — the state overrides individual choice."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Macroeconomic Policy
   * ═══════════════════════════════════════════════════ */
  {
    title: "Macroeconomic Policy",
    sections: [
      {
        id: "fiscal-monetary-supply-side",
        title: "Fiscal, Monetary and Supply-Side Policies",
        keyIdea: "Fiscal policy uses government spending and taxation to shift AD, monetary policy uses interest rates to target inflation, and supply-side policies shift LRAS — each has distinct time lags and trade-offs.",
        body: [
          { type: "paragraph", text: "**Fiscal policy** involves changes in government spending (G) and taxation (T) to influence aggregate demand. Expansionary fiscal policy (raising G or cutting T) shifts AD right, stimulating output and employment but risking demand-pull inflation and a rising budget deficit. Contractionary fiscal policy does the reverse. The **fiscal multiplier** means the final change in GDP exceeds the initial injection — but its size is uncertain and depends on leakages." },
          { type: "paragraph", text: "**Monetary policy** is conducted by the central bank, primarily through setting the **base interest rate**. Lower rates reduce the cost of borrowing, stimulate consumption and investment, and shift AD right. Higher rates cool demand and reduce inflationary pressure. The key advantage is independence from political cycles; the key limitation is **time lags** — changes take 18-24 months to fully affect the economy, and rates cannot fall below zero (the zero lower bound)." },
          { type: "paragraph", text: "**Supply-side policies** aim to shift LRAS right by improving the productive capacity of the economy. Market-based approaches include deregulation, privatisation, and trade liberalisation. Interventionist approaches include education and training investment, infrastructure spending, and R&D subsidies. Supply-side policies address the root causes of slow growth but take years to show results and may worsen inequality in the short run." },
          { type: "flow", steps: ["Economy faces rising inflation", "Central bank raises the base interest rate", "Borrowing becomes more expensive, saving more attractive", "Consumption and investment fall, AD shifts left"], result: "Inflation brought under control — but with a time lag of 18-24 months and potential output loss", resultType: "neutral" }
        ],
        realExample: { emoji: "🏦", text: "The Bank of England raised its base rate from 0.1% in December 2021 to 5.25% by August 2023 — the sharpest tightening cycle in decades — to bring CPI inflation down from a peak of 11.1%. This demonstrated both the power of monetary policy to control inflation and its painful side effects on mortgage holders and economic growth." },
        misconception: "Students treat fiscal and monetary policy as interchangeable demand-side tools. Wrong — they work through different transmission mechanisms and have different strengths. Instead write: fiscal policy works through government spending and taxation with political control, while monetary policy works through interest rates with central bank independence — they complement each other but serve different purposes.",
        examMatters: "Examiners expect you to compare policy tools on speed, certainty, and side effects. Monetary policy is faster to implement but has long transmission lags; fiscal policy has implementation lags but may be more targeted. Supply-side policies address root causes but take the longest. Structure your answer around these trade-offs."
      },
      {
        id: "income-redistribution-policies",
        title: "Income Redistribution Policies",
        keyIdea: "Progressive taxation, transfer payments, and in-kind provision redistribute income, but face the equity-efficiency trade-off, the Laffer curve constraint, poverty traps, and the UBI debate.",
        body: [
          { type: "paragraph", text: "**Progressive taxation** takes a higher proportion of income from higher earners — the UK's 20%/40%/45% income tax bands are a clear example. Combined with **transfer payments** (Universal Credit, pensions, child benefit), the tax-benefit system compresses the post-tax income distribution. **In-kind provision** — free education, healthcare, social housing — provides real benefits that disproportionately help the poorest, bypassing the problem of cash transfers being spent on non-essentials." },
          { type: "paragraph", text: "The **equity-efficiency trade-off** is the central dilemma. Higher tax rates on the wealthy fund redistribution but may reduce incentives to work, invest, and innovate. The **Laffer curve** formalises this: beyond a certain tax rate, total revenue actually falls because economic activity declines. The optimal rate is debated but is clearly above 0% and below 100%." },
          { type: "paragraph", text: "**Poverty traps** arise when benefit withdrawal rates create very high **effective marginal tax rates**. If earning an extra pound causes 80p of benefits to be withdrawn, the incentive to work is minimal. **Universal Basic Income (UBI)** is proposed as a solution — a flat payment to all citizens regardless of income, eliminating withdrawal rates entirely. Critics argue UBI is prohibitively expensive and reduces work incentives; supporters cite elimination of poverty traps and administrative simplicity." },
          { type: "flow", steps: ["Government increases transfer payments to reduce poverty", "Benefits are withdrawn as income rises", "Effective marginal tax rates exceed 70-80%", "Recipients face minimal incentive to increase earnings"], result: "Poverty trap — the system designed to help the poor can lock them in poverty", resultType: "bad" }
        ],
        realExample: { emoji: "🇬🇧", text: "UK Universal Credit was designed to replace six separate benefits with a single payment, using a consistent 55% taper rate to reduce poverty traps. In practice, implementation failures — the five-week wait, IT problems, and sanctions — meant many claimants faced hardship, demonstrating how policy design and implementation can diverge." },
        misconception: "Students assume UBI would solve poverty without trade-offs. Wrong — a meaningful UBI (e.g. $1,000/month to every adult) would cost trillions and may still reduce work incentives for some. Instead write: UBI eliminates poverty traps and simplifies administration, but its affordability and impact on labour supply remain deeply contested — pilot evidence is mixed.",
        examMatters: "Examiners reward candidates who can explain why poverty traps exist using effective marginal tax rates, then evaluate solutions. Draw a diagram showing how benefit withdrawal creates a near-flat relationship between gross and net income. Then evaluate UBI as an alternative — acknowledging both its theoretical elegance and practical challenges."
      }
    ],
    takeaway: [
      "Fiscal policy shifts AD through G and T; monetary policy uses interest rates; supply-side shifts LRAS.",
      "Each policy tool has different time lags, transmission mechanisms, and trade-offs.",
      "Redistribution faces the equity-efficiency trade-off, Laffer curve limits, and poverty trap risks.",
      "UBI is a proposed solution to poverty traps but its cost and labour supply effects are debated."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.5 Role of the State in the Macroeconomy to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'role-state-macroeconomy');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
