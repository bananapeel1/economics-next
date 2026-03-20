/**
 * RICH NOTES — Business Unit 3, Part 2 (3.3.4, 3.3.5, 3.3.6)
 * ============================================================
 * Edexcel IAL Business Unit 3
 *
 * Sections:
 *   3.3.4 Influences on Business Decisions  (influences-business-decisions)
 *   3.3.5 Assessing Competitiveness         (assessing-competitiveness)
 *   3.3.6 Managing Change                   (managing-change)
 *
 * Run with: node scripts/update-business-unit3-rich-notes-part2.mjs
 */

import { supabase } from './_db.mjs';

const NOTES_334 = [
  {
    title: "Corporate Culture",
    meta: "4 concepts",
    keyIdea: "Corporate culture — the shared values, beliefs, and norms within an organisation — is invisible but powerful, shaping how decisions are made, how employees behave, and how customers perceive the brand.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Corporate culture</strong> — the set of shared values, attitudes, and practices that characterise an organisation and influence how people behave within it.", tag: "exam" },
          { type: "def", text: "<strong>Strong culture</strong> — one where values are widely shared and deeply held, giving employees a clear sense of identity and purpose." },
          { type: "def", text: "<strong>Handy's culture types</strong> — Power (central control), Role (bureaucratic), Task (project-based), Person (individual-focused); each suits different organisations." }
        ]
      },
      {
        title: "IMPACT ON DECISIONS",
        items: [
          { type: "mech", text: "A strong culture can be a <strong>competitive advantage</strong> — employees are motivated, consistent, and aligned with the brand (e.g. Apple's innovation culture)." },
          { type: "mech", text: "But a strong culture can also be a <strong>barrier to change</strong> — 'the way we do things here' may prevent the firm from adapting to new market conditions." },
          { type: "imp", text: "During mergers, culture clash is the most common reason for failure — two strong but incompatible cultures create conflict, lower morale, and drive out talent.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Values and norms shape employee behaviour", "Strong culture → consistency and motivation", "But resistance to change if culture becomes rigid"],
      result: "Culture is a strategic asset when aligned with objectives, a liability when outdated",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to evaluate whether a firm's culture supports or hinders its strategy. Link culture to specific decisions: would a risk-averse culture support diversification? Would a hierarchical culture support innovation?",
    misconception: "Students say strong culture is always good. Wrong because a strong culture that resists change can be fatal in disrupted markets. Instead write: strong culture is an advantage when it supports the firm's strategy, but becomes a liability when the environment changes and the culture prevents adaptation.",
    takeaway: [
      "Culture = shared values and norms; invisible but shapes all decisions.",
      "Strong culture: consistency and motivation, but potential resistance to change.",
      "Culture clash is the top reason mergers fail."
    ]
  },

  {
    title: "Stakeholder Influences",
    meta: "4 concepts",
    keyIdea: "Business decisions affect multiple stakeholder groups whose interests often conflict — managing these tensions is a key leadership skill and a common exam evaluation theme.",
    blocks: [
      {
        title: "KEY CONCEPTS",
        items: [
          { type: "def", text: "<strong>Stakeholder</strong> — any individual or group with an interest in the activities and decisions of a business: shareholders, employees, customers, suppliers, the community, government.", tag: "exam" },
          { type: "mech", text: "Mendelow's <strong>power-interest matrix</strong> classifies stakeholders by their power to influence decisions and their level of interest, helping managers prioritise engagement." },
          { type: "mech", text: "<strong>Shareholder vs stakeholder</strong> debate: should the firm maximise shareholder value (Friedman) or balance the interests of all stakeholders (Freeman)?", tag: "exam" }
        ]
      },
      {
        title: "STAKEHOLDER CONFLICTS",
        items: [
          { type: "mech", text: "Shareholders want maximum dividends; employees want higher wages — paying more in wages reduces profit available for dividends." },
          { type: "mech", text: "Customers want low prices; shareholders want high margins — meeting both requires efficiency gains." },
          { type: "imp", text: "Examiners expect you to identify the stakeholder conflict in a case study and evaluate whose interests should take priority, using Mendelow's matrix or the shareholder/stakeholder models." }
        ]
      }
    ],
    flow: {
      steps: ["Identify stakeholders affected by the decision", "Assess power and interest (Mendelow)", "Manage conflicts between competing interests"],
      result: "Successful firms balance stakeholder needs rather than ignoring any group",
      resultType: "neutral"
    },
    examMatters: "Every 20-mark Business question involves stakeholder analysis. Identify who gains, who loses, and evaluate the trade-offs. Use Mendelow's matrix to justify which stakeholders should have the most influence.",
    misconception: "Students say firms should satisfy all stakeholders equally. Wrong because stakeholders have different levels of power and interest — trying to please everyone equally leads to strategic paralysis. Instead write: use Mendelow's matrix to prioritise stakeholders with high power and high interest, while monitoring others.",
    takeaway: [
      "Stakeholders have different and often conflicting interests.",
      "Mendelow's matrix: prioritise high power + high interest stakeholders.",
      "The shareholder vs stakeholder debate is central to business ethics questions."
    ]
  },

  {
    title: "Business Ethics and CSR",
    meta: "4 concepts",
    keyIdea: "Ethics and corporate social responsibility go beyond legal compliance — they represent voluntary choices about how a firm treats its stakeholders, the environment, and society, and they increasingly affect brand value and customer loyalty.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Business ethics</strong> — the moral principles that guide business behaviour and decision-making, often going beyond what is legally required.", tag: "exam" },
          { type: "def", text: "<strong>Corporate social responsibility (CSR)</strong> — the voluntary commitment by a business to act ethically and contribute to economic development while improving the quality of life of employees, the community, and society." }
        ]
      },
      {
        title: "EVALUATION",
        items: [
          { type: "mech", text: "<strong>For ethics/CSR</strong>: enhanced brand reputation, customer loyalty, employee motivation, reduced regulatory risk, long-term profitability." },
          { type: "mech", text: "<strong>Against</strong>: Friedman argues the only responsibility of business is to make profit for shareholders; CSR spending diverts resources from core business and may be 'greenwashing'." },
          { type: "imp", text: "The key evaluation: is CSR genuine or strategic? If it genuinely improves stakeholder welfare AND enhances brand value, it creates a win-win. If it is superficial marketing, it can backfire.", tag: "exam" },
          { type: "link", text: "Ethics links to stakeholder management: a firm that ignores ethical considerations risks reputational damage, boycotts, and regulatory intervention." }
        ]
      }
    ],
    flow: {
      steps: ["Firm faces ethical dilemma", "Choose profit maximisation or ethical approach", "Ethical approach may cost short-term but build long-term brand value"],
      result: "Ethical business can be both morally right and commercially smart — but not always",
      resultType: "neutral"
    },
    examMatters: "Examiners expect balanced evaluation. Don't just say 'CSR is good' — consider the cost, whether it is genuine, and whether it actually improves stakeholder welfare. Use Friedman vs Freeman as your theoretical framework.",
    misconception: "Students say CSR always increases profit. Wrong because some CSR initiatives are costly and may not generate a measurable return. Instead write: CSR can enhance brand value and customer loyalty, but the relationship between ethical behaviour and profitability is not automatic — it depends on execution, authenticity, and market context.",
    takeaway: [
      "Ethics = voluntary standards above legal minimum; CSR = responsible business practices.",
      "Friedman: profit is the only responsibility. Freeman: balance all stakeholder interests.",
      "Evaluate whether CSR is genuine or 'greenwashing'."
    ]
  }
];

const NOTES_335 = [
  {
    title: "Financial Ratios for Competitiveness",
    meta: "5 concepts",
    keyIdea: "Financial ratios convert raw accounting data into comparable metrics that reveal a firm's profitability, liquidity, and efficiency — they are most useful when compared over time or against competitors.",
    blocks: [
      {
        title: "KEY RATIOS",
        items: [
          { type: "def", text: "<strong>Gross profit margin</strong> — (gross profit / revenue) × 100; shows the percentage of revenue remaining after direct costs.", tag: "exam" },
          { type: "def", text: "<strong>Operating profit margin</strong> — (operating profit / revenue) × 100; shows profitability after all operating costs, a better indicator of management efficiency." },
          { type: "def", text: "<strong>Return on capital employed (ROCE)</strong> — (operating profit / capital employed) × 100; measures how efficiently the firm uses its total capital.", tag: "exam" },
          { type: "def", text: "<strong>Current ratio</strong> — current assets / current liabilities; measures short-term liquidity; ideally 1.5–2.0." },
          { type: "def", text: "<strong>Gearing ratio</strong> — (long-term debt / capital employed) × 100; measures the proportion of capital funded by debt; high gearing = high financial risk." }
        ]
      },
      {
        title: "USING RATIOS",
        items: [
          { type: "mech", text: "Ratios are most meaningful in <strong>context</strong> — compare year-on-year (trend), against competitors (benchmarking), or against industry averages." },
          { type: "imp", text: "Ratios tell you <strong>what</strong> is happening but not <strong>why</strong>. A falling ROCE could mean falling profits, rising capital employed, or both — you need qualitative analysis too.", tag: "exam" },
          { type: "link", text: "Financial ratios link to competitiveness: a firm with higher ROCE and profit margins than rivals has a competitive advantage in attracting investment." }
        ]
      }
    ],
    formulas: [
      { label: "GROSS PROFIT MARGIN", text: "(Gross Profit ÷ Revenue) × 100" },
      { label: "ROCE", text: "(Operating Profit ÷ Capital Employed) × 100" },
      { label: "CURRENT RATIO", text: "Current Assets ÷ Current Liabilities" }
    ],
    flow: {
      steps: ["Calculate ratios from financial statements", "Compare over time and against competitors", "Investigate causes of changes"],
      result: "Quantitative snapshot of competitiveness — must be combined with qualitative analysis",
      resultType: "neutral"
    },
    examMatters: "Examiners expect accurate calculations, then evaluation. Don't just state the ratio — interpret it: 'ROCE has fallen from 18% to 12%, suggesting the firm's efficiency has deteriorated, possibly due to the £5m investment in new equipment that has not yet generated returns.'",
    misconception: "Students think a single ratio tells the full story. Wrong because ratios must be compared in context and combined with qualitative information. Instead write: financial ratios are diagnostic tools — they highlight symptoms, not causes. Always combine ratio analysis with qualitative context from the case study.",
    takeaway: [
      "Key ratios: profit margins, ROCE, current ratio, gearing.",
      "Always compare: year-on-year, vs competitors, vs industry.",
      "Ratios show what's happening; qualitative analysis explains why."
    ]
  },

  {
    title: "Core Competencies and Competitive Advantage",
    meta: "4 concepts",
    keyIdea: "A firm's competitive advantage stems from its core competencies — the unique combination of resources and capabilities that competitors cannot easily replicate.",
    blocks: [
      {
        title: "DEFINITIONS",
        items: [
          { type: "def", text: "<strong>Core competency</strong> — a unique capability that gives a firm a competitive advantage; it must be valuable, rare, difficult to imitate, and organisationally embedded (VRIO framework).", tag: "exam" },
          { type: "def", text: "<strong>Competitive advantage</strong> — an attribute that allows a firm to outperform its rivals, either through lower costs or differentiation." }
        ]
      },
      {
        title: "BUILDING AND SUSTAINING ADVANTAGE",
        items: [
          { type: "mech", text: "Core competencies can be <strong>tangible</strong> (patented technology, location, equipment) or <strong>intangible</strong> (brand, culture, knowledge, relationships)." },
          { type: "mech", text: "Intangible competencies are often more sustainable because they are <strong>harder to copy</strong> — you can buy a factory, but you cannot easily replicate a corporate culture." },
          { type: "imp", text: "Competitive advantage is not permanent — it erodes as competitors imitate, technology changes, and customer needs evolve. Firms must continually invest in innovation.", tag: "exam" },
          { type: "link", text: "Core competencies link to Porter's generic strategies: a firm's competencies determine whether it should pursue cost leadership or differentiation." }
        ]
      }
    ],
    flow: {
      steps: ["Identify what the firm does better than anyone else", "Check: is it valuable, rare, and hard to imitate?", "Build strategy around that competency"],
      result: "Sustainable competitive advantage from unique, hard-to-replicate capabilities",
      resultType: "good"
    },
    examMatters: "Examiners expect you to identify a firm's core competency from the case study and evaluate whether it is sustainable. Use the VRIO framework: is it Valuable, Rare, hard to Imitate, and Organisationally supported?",
    misconception: "Students say competitive advantage lasts forever. Wrong because competitors innovate, technology disrupts, and customer needs change. Instead write: competitive advantage is temporary unless the firm continuously reinvests in its core competencies and adapts to changing market conditions.",
    takeaway: [
      "Core competency: valuable + rare + hard to imitate + organisationally embedded.",
      "Intangible competencies (brand, culture) are hardest to copy.",
      "Advantage is temporary — continuous innovation is needed to sustain it."
    ]
  }
];

const NOTES_336 = [
  {
    title: "Causes and Types of Change",
    meta: "4 concepts",
    keyIdea: "Change is driven by internal factors (growth, leadership, restructuring) and external factors (technology, competition, regulation) — understanding the cause determines the appropriate response.",
    blocks: [
      {
        title: "TYPES OF CHANGE",
        items: [
          { type: "def", text: "<strong>Incremental change</strong> — small, continuous improvements within the existing business model; low risk but may be too slow in disrupted markets.", tag: "exam" },
          { type: "def", text: "<strong>Disruptive (step) change</strong> — fundamental transformation of the business model, strategy, or structure; high risk but sometimes necessary for survival." }
        ]
      },
      {
        title: "DRIVERS OF CHANGE",
        items: [
          { type: "mech", text: "<strong>External drivers</strong>: technological disruption, competitive pressure, changes in legislation, economic shocks, shifts in consumer behaviour." },
          { type: "mech", text: "<strong>Internal drivers</strong>: new leadership, performance decline, growth beyond current structures, employee feedback, financial pressure." },
          { type: "imp", text: "The most dangerous changes are those the firm does not anticipate — <strong>scenario planning</strong> helps firms prepare for multiple possible futures rather than being caught off guard.", tag: "exam" },
          { type: "link", text: "Change links to SWOT: external drivers appear as opportunities and threats; the firm's ability to respond depends on its internal strengths and weaknesses." }
        ]
      }
    ],
    flow: {
      steps: ["External or internal trigger identified", "Assess: incremental adjustment or fundamental transformation?", "Plan and implement the change"],
      result: "Firms that manage change well survive and grow; those that resist it decline",
      resultType: "neutral"
    },
    examMatters: "Examiners expect you to identify the type and cause of change from the case study, then evaluate whether the firm's response is appropriate. Is incremental change sufficient, or does the situation demand disruptive transformation?",
    misconception: "Students treat all change as equally difficult. Wrong because incremental change is relatively easy to manage, while disruptive change requires overcoming significant resistance. Instead write: the management challenge depends on the scale of change — incremental change can be gradual and participative, while disruptive change often requires strong leadership and clear communication.",
    takeaway: [
      "Incremental: continuous improvement (low risk). Disruptive: fundamental transformation (high risk).",
      "External drivers: technology, competition, regulation. Internal: leadership, performance, growth.",
      "Scenario planning prepares firms for multiple futures."
    ]
  },

  {
    title: "Managing and Overcoming Resistance to Change",
    meta: "5 concepts",
    keyIdea: "People resist change because it threatens their security, status, and comfort — successful change management addresses these fears through communication, participation, and support rather than imposition.",
    blocks: [
      {
        title: "WHY PEOPLE RESIST",
        items: [
          { type: "mech", text: "<strong>Fear of the unknown</strong> — employees worry about job security, new skills requirements, and disruption to established routines." },
          { type: "mech", text: "<strong>Loss of control</strong> — imposed change feels threatening; employees prefer to have a say in decisions that affect them." },
          { type: "mech", text: "<strong>Inertia</strong> — 'we've always done it this way' — a strong existing culture can become a barrier to necessary change.", tag: "exam" }
        ]
      },
      {
        title: "HOW TO MANAGE CHANGE",
        items: [
          { type: "def", text: "<strong>Kotter's 8-step model</strong> — a structured approach: create urgency, build coalition, form vision, communicate, empower, create quick wins, build on gains, embed in culture.", tag: "exam" },
          { type: "mech", text: "<strong>Lewin's force field analysis</strong> — identifies the forces driving change and the forces resisting it; change succeeds when driving forces outweigh restraining forces." },
          { type: "imp", text: "The most common reason change programmes fail is <strong>poor communication</strong> — employees who do not understand why the change is happening will resist it." },
          { type: "link", text: "Change management links to leadership styles: transformational leaders are most effective at driving change because they inspire and motivate rather than simply commanding." }
        ]
      }
    ],
    flow: {
      steps: ["Identify driving and restraining forces", "Communicate the vision clearly", "Involve employees, create quick wins, embed change"],
      result: "Successful change when people understand, accept, and support the transformation",
      resultType: "good"
    },
    examMatters: "Examiners expect you to use a model (Kotter or Lewin) to structure your answer on managing change. Identify specific sources of resistance from the case study and recommend targeted strategies to overcome them.",
    misconception: "Students say resistance to change is always irrational. Wrong because employees may have legitimate concerns about job security, increased workload, or poorly designed changes. Instead write: resistance can be a valuable signal that the change plan has flaws — effective managers listen to resistance and adapt the plan rather than simply overriding it.",
    takeaway: [
      "Resistance stems from fear, loss of control, and cultural inertia.",
      "Kotter's 8 steps and Lewin's force field analysis structure change management.",
      "Communication and participation are the most effective tools for overcoming resistance."
    ]
  },

  {
    title: "Scenario Planning",
    meta: "4 concepts",
    keyIdea: "Scenario planning prepares firms for an uncertain future by developing multiple plausible scenarios and stress-testing strategy against each — it does not predict the future but reduces the shock when unexpected events occur.",
    blocks: [
      {
        title: "DEFINITION",
        items: [
          { type: "def", text: "<strong>Scenario planning</strong> — a strategic tool that develops multiple plausible future scenarios (not forecasts) and prepares contingency plans for each.", tag: "exam" }
        ]
      },
      {
        title: "HOW IT WORKS",
        items: [
          { type: "mech", text: "Identify the key <strong>uncertainties</strong> facing the business (e.g. economic conditions, regulatory changes, technology disruption)." },
          { type: "mech", text: "Develop 2–4 distinct scenarios based on different combinations of these uncertainties (e.g. best case, worst case, most likely)." },
          { type: "mech", text: "For each scenario, assess: <strong>what would we do?</strong> — and build contingency plans so the firm can respond quickly if that scenario materialises." },
          { type: "imp", text: "Scenario planning does not predict the future — it builds <strong>organisational agility</strong> by ensuring the firm has thought through multiple possibilities.", tag: "exam" }
        ]
      }
    ],
    flow: {
      steps: ["Identify key uncertainties", "Build 2–4 plausible scenarios", "Develop contingency plans for each"],
      result: "Firm is prepared for multiple futures rather than surprised by one",
      resultType: "good"
    },
    examMatters: "Examiners expect you to apply scenario planning to the case study: identify the uncertainties the firm faces, suggest 2–3 scenarios, and explain how the firm should prepare for each. Evaluate the limitations: time-consuming, expensive, and scenarios may not cover the actual future.",
    misconception: "Students confuse scenario planning with forecasting. Forecasting predicts a single future; scenario planning prepares for multiple possible futures. Instead write: scenario planning is not about getting the prediction right — it is about building the flexibility and preparedness to respond to whatever actually happens.",
    takeaway: [
      "Scenario planning: multiple plausible futures, not a single prediction.",
      "Builds organisational agility and reduces the impact of unexpected events.",
      "Limitations: time-consuming, expensive, and may not cover the actual future."
    ]
  }
];


const SECTIONS = [
  { id: 'influences-business-decisions', label: '3.3.4 Influences on Business Decisions', notes: NOTES_334 },
  { id: 'assessing-competitiveness',     label: '3.3.5 Assessing Competitiveness',       notes: NOTES_335 },
  { id: 'managing-change',               label: '3.3.6 Managing Change',                 notes: NOTES_336 },
];

async function main() {
  let allSuccess = true;
  for (const section of SECTIONS) {
    console.log(`\n── ${section.label} ──`);
    console.log(`   Section ID : ${section.id}`);
    console.log(`   Chapters   : ${section.notes.length}`);
    const { error } = await supabase
      .from('section_notes')
      .update({ data: section.notes })
      .eq('section_id', section.id);
    if (error) { console.error(`   ✗ FAILED: ${error.message}`); allSuccess = false; }
    else { console.log('   ✓ SUCCESS — pushed to Supabase.'); }
  }
  console.log(allSuccess ? '\n✅ All sections updated.' : '\n⚠️  Some sections failed.');
}
main();
