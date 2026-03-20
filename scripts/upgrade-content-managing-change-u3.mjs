/**
 * UPGRADE — 3.3.6 Managing Change
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-managing-change-u3.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Types of Change
   * ═══════════════════════════════════════════════════ */
  {
    title: "Types of Change",
    sections: [
      {
        id: "incremental-vs-disruptive-change",
        title: "Incremental vs Disruptive Change",
        keyIdea: "Incremental change improves what already exists through continuous small adjustments; disruptive change transforms the entire business model or industry — firms that mistake one for the other often fail.",
        body: [
          { type: "paragraph", text: "**Incremental change** involves continuous, small-scale improvements to existing products, processes, or strategies. It is low risk, builds on current strengths, and works well in stable environments. The Japanese concept of **kaizen** (continuous improvement) formalises this approach — every employee is expected to suggest small improvements daily." },
          { type: "paragraph", text: "**Disruptive change** fundamentally alters the way an industry operates. It often comes from outside the established players and makes existing products, skills, or business models obsolete. Disruptive change is high risk but can create entirely new markets and destroy incumbents who fail to adapt." },
          { type: "paragraph", text: "The danger for established firms is that they become too focused on incremental improvement of their current model and fail to recognise when disruptive change makes that model irrelevant. This is the **innovator's dilemma** — doing what currently works well can blind you to what will work tomorrow." },
          { type: "flow", steps: ["Disruptive technology or business model emerges", "Incumbents dismiss it as inferior or niche", "Disruptor improves rapidly and captures mainstream market", "Incumbents' existing strengths become irrelevant"], result: "Established firms fail — not because they did anything wrong, but because the rules changed", resultType: "bad" }
        ],
        realExample: { emoji: "📷", text: "Kodak invented the digital camera in 1975 but buried the technology to protect its hugely profitable film business. By the time digital photography disrupted the market in the 2000s, Kodak's incremental improvements to film were irrelevant. The company filed for bankruptcy in 2012 — a textbook case of the innovator's dilemma." },
        misconception: "Students assume disruptive change is always better or more exciting than incremental change. Wrong — most successful businesses rely primarily on incremental improvement. Disruption is rare and high-risk. Instead write: incremental change is the backbone of operational excellence; disruptive change is necessary when the environment shifts fundamentally, but most firms thrive on continuous small improvements.",
        examMatters: "Examiners want you to distinguish clearly between the two types and match them to context. Use incremental change when the market is stable and the firm's model works; use disruptive change when external forces (technology, regulation, competition) make the current model unsustainable."
      },
      {
        id: "drivers-and-scenario-planning",
        title: "Drivers of Change and Scenario Planning",
        keyIdea: "Change is driven by external forces (technology, competition, regulation) and internal forces (leadership, performance, growth) — scenario planning prepares for multiple futures because no one can predict which will actually happen.",
        body: [
          { type: "paragraph", text: "**External drivers** force change upon the firm from outside. **Technology** disrupts products and processes (e.g. AI replacing routine tasks). **Competition** forces adaptation as rivals innovate or new entrants emerge. **Regulation** imposes new requirements (e.g. environmental laws, data protection). **Economic conditions** shift demand patterns (recessions, currency changes)." },
          { type: "paragraph", text: "**Internal drivers** originate within the firm. **New leadership** brings fresh vision and priorities. **Poor performance** triggers restructuring. **Growth** creates pressure to change structures, systems, and culture. **Employee expectations** evolve as workforce demographics shift." },
          { type: "paragraph", text: "**Scenario planning** is a strategic tool for managing uncertainty. Rather than predicting a single future, the firm develops 2-4 **plausible future scenarios** (best case, worst case, most likely, wildcard) and prepares strategies for each. It does not predict — it prepares. Shell famously used scenario planning to anticipate the 1973 oil crisis, allowing it to respond faster than competitors." },
          { type: "flow", steps: ["Identify key uncertainties facing the firm", "Develop 2-4 plausible future scenarios", "Stress-test current strategy against each scenario", "Build flexible strategies that work across multiple futures"], result: "Firm is prepared for change regardless of which future materialises", resultType: "good" }
        ],
        realExample: { emoji: "🚗", text: "Toyota embodies kaizen (incremental change) — its production system encourages every worker to stop the line and suggest improvements. Over decades, thousands of tiny changes compound into a massive efficiency advantage. Toyota produces vehicles with fewer defects per unit than almost any competitor." },
        misconception: "Students confuse scenario planning with forecasting or prediction. Wrong — forecasting tries to say what will happen; scenario planning explores what could happen. Instead write: scenario planning does not predict the future; it prepares the firm for multiple possible futures, reducing the shock of unexpected change.",
        examMatters: "A strong exam answer on change identifies specific drivers (external and internal), classifies them, and then explains how scenario planning helps the firm prepare. Always link back to the case study — what are the key uncertainties this firm faces, and how could scenario planning help?"
      }
    ],
    takeaway: [
      "Incremental change (kaizen) suits stable environments; disruptive change transforms industries and destroys unprepared incumbents.",
      "External drivers (technology, competition, regulation) and internal drivers (leadership, performance, growth) both trigger change.",
      "Scenario planning prepares for multiple futures — it is about preparedness, not prediction."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Managing Resistance
   * ═══════════════════════════════════════════════════ */
  {
    title: "Managing Resistance",
    sections: [
      {
        id: "why-people-resist-change",
        title: "Why People Resist Change",
        keyIdea: "Resistance to change is not irrational — people resist because they fear job loss, loss of status, loss of control, or simply the discomfort of uncertainty, and ignoring these fears guarantees failure.",
        body: [
          { type: "paragraph", text: "**Resistance to change** is the single biggest reason organisational change fails. It is not a character flaw — it is a rational response to perceived threat. Understanding why people resist is the essential first step to overcoming it." },
          { type: "paragraph", text: "**Fear of the unknown** — people prefer the certainty of the current situation, even if imperfect, over the uncertainty of something new. **Loss of control** — change imposed from above makes employees feel powerless. **Loss of status or job security** — restructuring threatens roles, titles, and livelihoods. **Habit and inertia** — established routines are comfortable and efficient; new ways require effort and learning. **Mistrust** — if previous change was handled badly, employees assume the worst." },
          { type: "paragraph", text: "**Poor communication is the number one reason change fails.** When management does not explain why change is necessary, what will happen, and how it affects individuals, employees fill the information vacuum with rumour and worst-case assumptions. Change that is communicated well is resisted far less than change that is imposed in silence." },
          { type: "flow", steps: ["Change announced with poor communication", "Employees fill information gap with rumours", "Fear and mistrust spread", "Active and passive resistance builds"], result: "Change initiative fails — not because the strategy was wrong, but because people were not brought along", resultType: "bad" }
        ],
        realExample: { emoji: "💻", text: "When Satya Nadella became Microsoft CEO in 2014, he inherited a culture described as 'know-it-all' — fiercely competitive internal silos that resisted collaboration and change. Rather than forcing structural change immediately, he addressed the cultural root: shifting the mindset to 'learn-it-all', emphasising growth mindset, empathy, and collaboration." },
        misconception: "Students treat resistance as something to be crushed or overridden. Wrong — resistance often contains valuable information about genuine problems with the change plan. Instead write: resistance should be listened to, not just overcome; employees on the ground often see implementation problems that management misses.",
        examMatters: "Examiners reward students who explain the causes of resistance with empathy and link them to solutions. Don't just say 'people resist because they fear change' — be specific: fear of redundancy, loss of status, lack of trust based on past experience. Each cause requires a different management response."
      },
      {
        id: "managing-change-models",
        title: "Kotter's 8 Steps and Lewin's Force Field Analysis",
        keyIdea: "Kotter's 8-step model provides a sequence for leading change; Lewin's force field analysis maps the forces for and against change — together they give managers both a process and a diagnostic tool.",
        body: [
          { type: "paragraph", text: "**Kotter's 8-step model** for leading change: (1) Create urgency — make the case for why change cannot wait. (2) Build a guiding coalition — assemble a group with enough power and credibility. (3) Form a strategic vision — clarify what the future looks like. (4) Communicate the vision — repeat the message constantly through every channel. (5) Remove barriers — clear obstacles (resistant managers, outdated systems). (6) Generate short-term wins — visible successes build momentum and silence critics. (7) Sustain acceleration — don't declare victory too early; keep pushing. (8) Anchor in culture — embed the change in everyday routines and values." },
          { type: "paragraph", text: "**Lewin's force field analysis** models change as the balance between **driving forces** (pushing for change — new technology, competitive pressure, leadership vision) and **restraining forces** (resisting change — fear, cost, culture, habits). Change happens when driving forces exceed restraining forces. The practical insight: sometimes it is easier to reduce restraining forces (address fears, provide training) than to increase driving forces (push harder)." },
          { type: "paragraph", text: "The two models complement each other. Lewin diagnoses the situation (what forces exist and how strong are they?). Kotter prescribes the process (what sequence of actions should management follow?). Using both together gives a structured, evidence-based approach to managing change." },
          { type: "flow", steps: ["Use Lewin's force field to diagnose driving and restraining forces", "Apply Kotter's steps to build urgency and coalition", "Reduce restraining forces (address fears, communicate, train)", "Generate short-term wins to build momentum"], result: "Change succeeds because both the diagnosis and the process are managed systematically", resultType: "good" }
        ],
        realExample: { emoji: "💻", text: "Nadella's transformation of Microsoft follows Kotter's model closely. He created urgency (cloud computing was overtaking Windows), built a coalition (new leadership team), communicated a vision ('mobile-first, cloud-first'), generated quick wins (Azure growth, Teams adoption), and anchored the change in a new 'growth mindset' culture. Microsoft's market capitalisation grew from $300bn to over $2 trillion." },
        misconception: "Students present Kotter's 8 steps as a rigid, linear process. Wrong — in practice, steps overlap, repeat, and sometimes happen simultaneously. Instead write: Kotter's model is a guide, not a rigid checklist; effective change management adapts the sequence to the specific situation while ensuring no step is skipped entirely.",
        examMatters: "For top marks, use both models together. Draw Lewin's force field diagram to identify the specific forces at play in the case study, then explain how Kotter's steps would address them. This shows the examiner you can apply theory to practice, not just recite frameworks."
      }
    ],
    takeaway: [
      "People resist change for rational reasons — fear, loss of control, inertia, mistrust. Poor communication is the #1 cause of failure.",
      "Kotter's 8 steps provide a process for leading change; Lewin's force field diagnoses the forces for and against it.",
      "The best approach combines both: diagnose with Lewin, execute with Kotter, and always communicate relentlessly."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.6 Managing Change to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'managing-change');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
