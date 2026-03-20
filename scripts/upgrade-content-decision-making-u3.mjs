/**
 * UPGRADE — 3.3.3 Decision-Making Techniques
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-decision-making-u3.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Quantitative Techniques
   * ═══════════════════════════════════════════════════ */
  {
    title: "Quantitative Techniques",
    sections: [
      {
        id: "decision-trees",
        title: "Decision Trees",
        keyIdea: "A decision tree maps out choices and chance outcomes with probabilities and financial values — the expected monetary value (EMV) tells you which path has the highest average payoff, but averages hide risk.",
        body: [
          { type: "paragraph", text: "A **decision tree** is a diagram that maps a sequence of decisions and uncertain outcomes. **Square nodes** represent decisions (choices the manager controls), while **circle nodes** represent chance events (outcomes determined by probability). Each branch carries a probability and a financial payoff." },
          { type: "paragraph", text: "The **expected monetary value (EMV)** of a chance node is calculated by multiplying each outcome's payoff by its probability and summing the results. The **net gain** subtracts the initial cost of the decision from the EMV. Managers choose the branch with the highest net gain — but this is a long-run average, not a guarantee for any single decision." },
          { type: "paragraph", text: "The key limitation is that probabilities are **estimates**, not facts. They are based on past data or managerial judgement, both of which may be wrong. Decision trees also assume managers are risk-neutral — they treat a 10% chance of losing £1m the same as a certainty of losing £100k. In reality, most managers are risk-averse." },
          { type: "flow", steps: ["Identify decision and chance nodes", "Assign probabilities and payoffs", "Calculate EMV at each chance node", "Subtract initial cost for net gain"], result: "Quantified comparison of options — but only as reliable as the probability estimates", resultType: "neutral" }
        ],
        realExample: { emoji: "💊", text: "Pharmaceutical companies use decision trees for R&D investment. A new drug might have a 20% chance of passing clinical trials (payoff: £500m) and an 80% chance of failure (payoff: £0), with a development cost of £80m. EMV = (0.2 x £500m) + (0.8 x £0) = £100m. Net gain = £100m - £80m = £20m — worth pursuing on average, but any single drug is more likely to fail." },
        misconception: "Students treat EMV as the actual outcome. Wrong — EMV is a weighted average across many decisions; any single project will either succeed or fail, not land on the average. Instead write: EMV guides the best choice on average over repeated decisions, but does not predict the outcome of a single project.",
        examMatters: "Examiners test calculation and evaluation together. You must be able to draw the tree, calculate EMV and net gain, and then critically evaluate the result. Always state that the probabilities are estimates, the decision is one-off not repeated, and risk attitude matters — these are the three standard evaluation points."
      },
      {
        id: "critical-path-analysis",
        title: "Critical Path Analysis (CPA)",
        keyIdea: "CPA identifies the longest sequence of dependent tasks in a project — this 'critical path' determines the shortest possible completion time, and any delay on it delays the whole project.",
        body: [
          { type: "paragraph", text: "**Critical path analysis** (CPA) is a project management technique that identifies all tasks, their durations, and their dependencies. The **critical path** is the longest route through the network — it determines the minimum project duration. Any delay to a task on the critical path delays the entire project." },
          { type: "paragraph", text: "Each activity has an **earliest start time (EST)** calculated by a forward pass through the network, and a **latest finish time (LFT)** calculated by a backward pass. **Float** (or slack) is the time a non-critical activity can be delayed without affecting the project completion. Activities on the critical path have zero float." },
          { type: "paragraph", text: "CPA helps managers allocate resources efficiently — workers and equipment can be moved from high-float activities to critical ones. It also provides a framework for monitoring progress and identifying where time can be saved by investing extra resources (known as 'crashing' an activity)." },
          { type: "flow", steps: ["List all activities and dependencies", "Forward pass: calculate ESTs", "Backward pass: calculate LFTs", "Float = LFT - EST - duration"], result: "Critical path identified (float = 0) — focus resources here to meet deadline", resultType: "good" }
        ],
        realExample: { emoji: "🏟️", text: "The construction of venues for the London 2012 Olympics relied on CPA to coordinate thousands of interdependent tasks across multiple sites. The critical path for the main stadium determined that steel frame erection and roof installation had zero float — any delay would push back the entire opening ceremony date." },
        misconception: "Students think the critical path is the most important path. Partially right, but misleading — it is the longest path, and it is critical because it determines the project duration. Instead write: the critical path is the longest sequence of dependent activities with zero float; it matters because it sets the minimum completion time for the entire project.",
        examMatters: "Examiners expect you to calculate ESTs and LFTs, identify the critical path, and calculate float for non-critical activities. Practise the forward and backward pass until they are automatic. In evaluation, note that CPA assumes task durations are accurate — in practice, unexpected delays (supply shortages, weather) can disrupt even the best plan."
      }
    ],
    takeaway: [
      "Decision trees: EMV = sum of (probability x payoff); net gain = EMV minus cost.",
      "EMV is a long-run average — probabilities are estimates and risk attitude matters.",
      "CPA: the critical path is the longest route with zero float, setting the minimum project time.",
      "Both techniques provide structure for decisions but depend on the accuracy of the input data."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Sales Forecasting
   * ═══════════════════════════════════════════════════ */
  {
    title: "Sales Forecasting",
    sections: [
      {
        id: "moving-averages-extrapolation",
        title: "Moving Averages & Extrapolation",
        keyIdea: "Moving averages smooth out short-term fluctuations to reveal the underlying trend — extrapolation then extends that trend into the future, which works well until the market fundamentally changes.",
        body: [
          { type: "paragraph", text: "A **moving average** calculates the mean of a set number of consecutive data points, then moves forward one period and recalculates. A 4-quarter moving average, for example, smooths out seasonal variation to reveal whether sales are trending up, down, or flat over time." },
          { type: "paragraph", text: "**Extrapolation** extends the identified trend line into the future to generate a forecast. It assumes that the patterns of the past will continue — that the forces driving sales growth or decline will remain broadly the same. This works well in stable, mature markets with consistent consumer behaviour." },
          { type: "paragraph", text: "The danger is clear: extrapolation cannot predict disruption. It assumes continuity, so it fails spectacularly when markets experience structural change — new technology, regulatory shifts, or sudden changes in consumer behaviour. The further into the future the extrapolation reaches, the less reliable it becomes." },
          { type: "flow", steps: ["Collect historical sales data", "Calculate moving averages to smooth fluctuations", "Identify the underlying trend", "Extrapolate the trend forward"], result: "Sales forecast generated — reliable in stable markets, dangerous in disrupted ones", resultType: "neutral" }
        ],
        realExample: { emoji: "📼", text: "Blockbuster's sales forecasts through the mid-2000s extrapolated steady DVD rental growth. The trend line showed a healthy business. But extrapolation could not predict Netflix's streaming model, which made Blockbuster's entire business model obsolete within five years — a catastrophic failure of backward-looking forecasting." },
        misconception: "Students say moving averages predict the future. Wrong — moving averages only smooth historical data to reveal a past trend. Extrapolation then projects that trend forward, but it is the extrapolation step that creates the forecast. Instead write: moving averages reveal the trend; extrapolation assumes the trend continues — and that assumption is the source of all forecasting risk.",
        examMatters: "Examiners often give you a time series and ask you to calculate a moving average and plot it. Practise the arithmetic. In evaluation, always discuss the assumption of continuity — state that extrapolation works in stable conditions but breaks down when markets are disrupted by technology, regulation, or unexpected events."
      },
      {
        id: "correlation-and-forecasting-limits",
        title: "Correlation, Causation & the Limits of Forecasting",
        keyIdea: "Two variables moving together (correlation) does not mean one causes the other — and building a sales forecast on a spurious correlation can lead a firm to invest millions in the wrong strategy.",
        body: [
          { type: "paragraph", text: "**Correlation** measures the strength and direction of a relationship between two variables. A positive correlation means they move together; a negative correlation means they move in opposite directions. The correlation coefficient ranges from -1 (perfect negative) to +1 (perfect positive), with 0 meaning no relationship." },
          { type: "paragraph", text: "The critical distinction is that **correlation does not prove causation**. Ice cream sales and drowning deaths are positively correlated — but ice cream does not cause drowning. Both are driven by a third variable: hot weather. Firms that mistake correlation for causation may invest in marketing strategies based on relationships that have no real causal mechanism." },
          { type: "paragraph", text: "Forecasting has fundamental limits. All quantitative methods rely on historical data, which may not reflect future conditions. The strongest forecasting combines quantitative techniques with qualitative judgement — market research, expert opinion, and awareness of emerging trends that the numbers cannot yet capture." },
          { type: "flow", steps: ["Two variables appear correlated", "Firm assumes causal link", "Builds strategy on that assumption", "Third variable was the true driver"], result: "Spurious correlation leads to misguided investment — always test for causation", resultType: "bad" }
        ],
        realExample: { emoji: "📊", text: "Netflix combines quantitative forecasting (viewing data, subscriber growth trends) with qualitative judgement (content strategy, competitive analysis) to forecast demand. Its data-driven approach predicted the success of House of Cards before production began, blending correlation analysis of viewer preferences with creative judgement about content quality." },
        misconception: "Students write that strong correlation proves a relationship is causal. Wrong — correlation only shows co-movement; causation requires a logical mechanism, time sequence, and elimination of confounding variables. Instead write: a strong correlation is evidence of a possible relationship, but causation must be established through further analysis — without a causal mechanism, the correlation may be coincidental.",
        examMatters: "The correlation-causation distinction is a favourite evaluation point. If a case study shows two correlated variables, examiners reward students who question whether the relationship is causal. Always suggest possible confounding variables and explain why acting on a spurious correlation could lead to wasted investment."
      }
    ],
    takeaway: [
      "Moving averages smooth data to reveal trends; extrapolation projects those trends forward.",
      "Extrapolation assumes continuity — it fails when markets are disrupted.",
      "Correlation measures co-movement but does not prove causation — always look for confounding variables.",
      "The best forecasting combines quantitative techniques with qualitative judgement and market awareness."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.3 Decision-Making Techniques to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'decision-making-techniques');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
