/**
 * UPGRADE — 3.3.5 Government Intervention
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-gov-intervention-firms.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Competition Policy
   * ═══════════════════════════════════════════════════ */
  {
    title: "Competition Policy",
    sections: [
      {
        id: "cma-merger-control",
        title: "The CMA and Merger Control",
        keyIdea: "The CMA uses the 'substantial lessening of competition' (SLC) test to decide whether mergers harm consumers — it can block deals, approve them, or force divestments.",
        body: [
          { type: "paragraph", text: "The **Competition and Markets Authority (CMA)** is the UK's primary competition regulator. When firms propose a merger, the CMA investigates whether it would result in a **substantial lessening of competition (SLC)** — meaning fewer choices, higher prices, or lower quality for consumers." },
          { type: "paragraph", text: "If the SLC test is met, the CMA can **block the merger entirely**, approve it with **behavioural or structural remedies** (such as requiring the firm to sell off certain stores or brands), or accept **binding commitments** from the merging parties. This gives the CMA a graduated toolkit rather than a simple yes-or-no decision." },
          { type: "paragraph", text: "The CMA also runs **leniency programmes** to break cartels. By offering reduced fines to the first cartel member that confesses, the CMA exploits the **prisoner's dilemma** — each firm fears the others will confess first, so the cartel collapses from within." },
          { type: "flow", steps: ["Firms propose merger", "CMA investigates market impact", "SLC test applied", "Merger blocked or approved with conditions"], result: "Competition protected — consumers retain choice and fair prices", resultType: "good" }
        ],
        realExample: { emoji: "🛒", text: "The CMA blocked the proposed Sainsbury's-Asda merger in 2019, concluding it would substantially lessen competition in groceries and fuel, leading to higher prices for millions of UK shoppers." },
        misconception: "Students assume the CMA blocks all large mergers. Wrong — most mergers are approved, and many proceed with minor conditions. Instead write: the CMA only intervenes when it finds evidence of a substantial lessening of competition; size alone is not the trigger.",
        examMatters: "Examiners reward students who can explain the SLC test and distinguish between structural remedies (forced divestment) and behavioural remedies (price commitments). Always link the CMA's decision to a specific consumer harm — don't just say 'less competition'."
      },
      {
        id: "anti-competitive-behaviour",
        title: "Anti-Competitive Behaviour",
        keyIdea: "Cartels, abuse of dominance, and predatory pricing all distort competition — regulators can impose fines of up to 10% of global turnover to deter these practices.",
        body: [
          { type: "paragraph", text: "**Cartels** are secret agreements between firms to fix prices, rig bids, or divide markets. They are illegal because they replicate monopoly outcomes — higher prices and restricted output — while pretending to compete. Detection is difficult, which is why leniency programmes are essential." },
          { type: "paragraph", text: "**Abuse of dominant position** occurs when a firm with significant market power uses it to exclude competitors or exploit consumers. This includes **predatory pricing** (setting prices below cost to drive rivals out, then raising them), **exclusive dealing** (forcing retailers to stock only your products), and **tying** (bundling products to leverage dominance from one market into another)." },
          { type: "paragraph", text: "Penalties are severe to create a credible deterrent. Fines can reach **10% of worldwide annual turnover**, and individual directors can face criminal prosecution and prison sentences. The scale of fines reflects the enormous consumer harm that anti-competitive behaviour causes." }
        ],
        realExample: { emoji: "📱", text: "The European Commission fined Google €4.34 billion in 2018 for abusing its Android dominance by requiring phone manufacturers to pre-install Google Search and Chrome as a condition of licensing the Play Store." },
        misconception: "Students confuse being dominant with abusing dominance. Wrong — having a large market share is perfectly legal; it is the exploitation or exclusionary use of that position that breaks competition law. Instead write: dominance is not illegal, but using it to foreclose competitors or exploit consumers is.",
        examMatters: "A strong answer distinguishes between exploitative abuse (directly harming consumers through high prices) and exclusionary abuse (harming consumers indirectly by eliminating competitors). Examiners expect you to explain why the behaviour reduces allocative efficiency."
      }
    ],
    takeaway: [
      "The CMA applies the SLC test to mergers and can block, approve, or impose remedies.",
      "Leniency programmes exploit the prisoner's dilemma to break cartels from within.",
      "Fines up to 10% of global turnover deter anti-competitive practices like predatory pricing and abuse of dominance.",
      "Being dominant is legal; abusing that dominance to harm competition is not."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Regulation of Monopoly
   * ═══════════════════════════════════════════════════ */
  {
    title: "Regulation of Monopoly",
    sections: [
      {
        id: "price-cap-regulation",
        title: "Price Cap Regulation (RPI–X)",
        keyIdea: "Under RPI–X, prices can only rise by inflation minus an efficiency factor — forcing the firm to cut costs to protect its profits, unlike rate-of-return regulation which encourages waste.",
        body: [
          { type: "paragraph", text: "**Price cap regulation (RPI–X)** limits the maximum annual price increase to the rate of inflation (RPI) minus an efficiency factor (X). If inflation is 3% and X is 2%, the firm can only raise prices by 1%. To maintain or grow profits, the firm must **cut costs by at least X% per year** in real terms." },
          { type: "paragraph", text: "This is superior to **rate-of-return regulation**, which guarantees the firm a fixed percentage return on its capital. The problem with rate-of-return is the **Averch-Johnson effect** — firms over-invest in capital to inflate the base on which their guaranteed return is calculated, leading to productive inefficiency." },
          { type: "paragraph", text: "The challenge with RPI–X is **setting X correctly**. If X is too low, the firm earns excessive profits at consumers' expense. If X is too high, the firm cannot invest in maintaining infrastructure. Regulators face an information asymmetry — the firm knows its true costs better than the regulator does." },
          { type: "flow", steps: ["Regulator sets RPI–X cap", "Firm must cut real costs by X% annually", "Prices fall in real terms over time", "Consumers benefit from lower bills"], result: "Productive efficiency improves — firm is incentivised to innovate and cut waste", resultType: "good" }
        ],
        realExample: { emoji: "🚰", text: "Ofwat regulates English and Welsh water companies using an RPI–X framework, setting price caps every five years. This forces monopoly water suppliers to find efficiency savings rather than simply passing costs on to bill-payers." },
        misconception: "Students say RPI–X means prices always fall. Wrong — prices can still rise if inflation exceeds X; what falls is the real (inflation-adjusted) price. Instead write: RPI–X ensures prices fall in real terms, but nominal prices may still increase when inflation is higher than the efficiency factor.",
        examMatters: "Examiners expect you to evaluate RPI–X against rate-of-return regulation. The key comparison: RPI–X incentivises cost-cutting (good for productive efficiency) but risks under-investment, while rate-of-return guarantees investment but causes over-capitalisation via the Averch-Johnson effect."
      },
      {
        id: "privatisation-nationalisation",
        title: "Privatisation and Nationalisation",
        keyIdea: "Privatisation introduces profit incentives and capital market discipline, but a natural monopoly simply becomes a private monopoly without effective regulation — ownership alone does not guarantee efficiency.",
        body: [
          { type: "paragraph", text: "**Privatisation** transfers state-owned enterprises to private ownership. The theoretical benefits are clear: the **profit motive** drives cost-cutting, **share price discipline** punishes inefficiency, and access to private capital markets funds investment without burdening taxpayers." },
          { type: "paragraph", text: "However, privatising a **natural monopoly** simply replaces a public monopoly with a private one. Without regulation, the private firm will charge monopoly prices and restrict output. This is why privatisation in utilities was always accompanied by the creation of regulators like Ofgem, Ofwat, and Ofcom." },
          { type: "paragraph", text: "**Nationalisation** pursues social objectives — universal service, cross-subsidisation, and long-term investment. The risk is **X-inefficiency**: without competitive pressure or the threat of takeover, costs drift upwards and productivity stagnates. The debate ultimately turns on whether government failure or market failure causes greater welfare loss." }
        ],
        realExample: { emoji: "🚂", text: "British Rail was privatised between 1994 and 1997. Some franchises saw improved services and higher passenger numbers, but fragmentation of the network between track (Railtrack) and operators created coordination failures and contributed to safety concerns." },
        misconception: "Students assume privatisation always improves efficiency. Wrong — in natural monopolies, private ownership without regulation can worsen outcomes by adding a profit extraction layer on top of monopoly power. Instead write: privatisation improves efficiency only when combined with effective competition or regulation; ownership change alone is insufficient.",
        examMatters: "This is a classic 25-mark essay topic. Structure your answer around: allocative efficiency (pricing), productive efficiency (costs), dynamic efficiency (investment), and equity (access and affordability). Evaluate whether the outcome depends more on ownership or on the competitive/regulatory environment."
      }
    ],
    takeaway: [
      "RPI–X forces firms to cut costs in real terms, unlike rate-of-return regulation which causes the Averch-Johnson effect.",
      "Setting X too high risks under-investment; too low allows excessive profits — information asymmetry is the core problem.",
      "Privatisation works best with competition or strong regulation; without either, it creates private monopoly.",
      "The privatisation vs nationalisation debate hinges on whether government failure or market failure is the greater risk."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Government Failure and Minimum Wages
   * ═══════════════════════════════════════════════════ */
  {
    title: "Government Failure and Minimum Wages",
    sections: [
      {
        id: "government-failure-intervention",
        title: "Government Failure in Intervention",
        keyIdea: "Government failure occurs when intervention creates a worse outcome than the market failure it was designed to fix — the cure can be worse than the disease.",
        body: [
          { type: "paragraph", text: "**Government failure** arises when state intervention leads to a net welfare loss — the policy creates more distortion than the market failure it was meant to correct. Four key causes: **regulatory capture** (the regulator starts serving the industry it oversees), **information asymmetry** (government lacks the data to set optimal policy), **unintended consequences** (policies produce outcomes nobody predicted), and **political short-termism** (politicians favour policies with visible short-run benefits over long-run efficiency)." },
          { type: "paragraph", text: "Regulatory capture is particularly dangerous because it is invisible. When former industry executives staff the regulator, or when the regulator depends on the industry for data and expertise, policies subtly shift to protect incumbents rather than consumers." },
          { type: "paragraph", text: "The existence of government failure does not mean governments should never intervene — it means intervention must be carefully designed, monitored, and evaluated. The relevant comparison is not 'perfect government vs imperfect market' but 'imperfect government vs imperfect market'." },
          { type: "flow", steps: ["Market failure identified", "Government intervenes with policy", "Unintended consequences emerge", "Net welfare may fall below pre-intervention level"], result: "Government failure — the intervention made things worse, not better", resultType: "bad" }
        ],
        realExample: { emoji: "🏠", text: "UK rent controls in the 1970s were intended to keep housing affordable, but landlords withdrew properties from the market because rents could not cover costs. The policy reduced housing supply, worsening the very shortage it was designed to fix." },
        misconception: "Students treat government failure as proof that markets should be left alone. Wrong — market failure still exists and still causes welfare loss. Instead write: government failure means we should compare the costs of intervention against the costs of inaction, not assume either is automatically better.",
        examMatters: "Government failure is the strongest evaluation tool in any essay about policy. After explaining how a policy corrects market failure, always consider: could regulatory capture, information problems, or unintended consequences make the outcome worse? This turns a one-sided answer into a balanced evaluation."
      },
      {
        id: "minimum-wage-intervention",
        title: "Minimum Wage as Intervention",
        keyIdea: "In a competitive labour market a minimum wage above equilibrium causes unemployment, but in a monopsony market it can raise both wages AND employment — the effect depends entirely on market structure.",
        body: [
          { type: "paragraph", text: "In the **competitive labour market model**, a minimum wage set above the equilibrium wage creates a surplus of labour — more workers want jobs at the higher wage than firms want to hire. The result is **unemployment** equal to the gap between labour supplied and labour demanded at the minimum wage." },
          { type: "paragraph", text: "In a **monopsony labour market**, the outcome reverses. A single dominant employer (or a few large employers acting similarly) restricts hiring below the competitive level to keep wages down. A minimum wage set between the monopsony wage and the competitive wage **eliminates the firm's incentive to restrict hiring**. The wage floor acts like a perfectly elastic labour supply curve up to a point, so the firm hires more workers at the mandated wage." },
          { type: "paragraph", text: "The real-world effect therefore depends on **market structure**. If low-wage labour markets exhibit monopsony power — as empirical evidence increasingly suggests — minimum wages can raise pay without significant job losses. The policy conclusion flips depending on which model applies." },
          { type: "flow", steps: ["Government sets minimum wage above equilibrium", "Competitive market: quantity demanded falls → unemployment", "Monopsony market: firm no longer restricts hiring → employment rises", "Net effect depends on degree of employer market power"], result: "Employment outcome is an empirical question — market structure determines the answer", resultType: "neutral" }
        ],
        realExample: { emoji: "💷", text: "The UK National Living Wage has been raised repeatedly since its introduction in 2016. Empirical studies by the Low Pay Commission consistently find minimal negative employment effects, suggesting significant monopsony power exists in low-wage UK labour markets." },
        misconception: "Students always draw the competitive model and conclude minimum wages cause unemployment. Wrong — this ignores monopsony, which is the more realistic model for many low-wage labour markets. Instead write: the employment effect depends on market structure; in monopsony markets, a minimum wage can increase both wages and employment simultaneously.",
        examMatters: "Examiners love this topic because it tests whether you can apply two different models to the same policy and reach different conclusions. Always draw both diagrams — competitive and monopsony — and conclude that the net effect is an empirical question. This demonstrates the highest-level evaluation skill."
      }
    ],
    takeaway: [
      "Government failure occurs when intervention creates worse outcomes than the market failure it targets.",
      "Regulatory capture, information asymmetry, and unintended consequences are the main causes of government failure.",
      "Minimum wages cause unemployment in competitive markets but can raise employment in monopsony markets.",
      "The real-world employment effect of minimum wages depends on market structure — empirical evidence suggests monopsony power is significant in low-wage sectors."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.5 Government Intervention to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'government-intervention-firms');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 3 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
