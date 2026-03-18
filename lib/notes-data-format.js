/**
 * Notes Data Format — Rich structured notes for Revvy Learn
 *
 * This file documents the data structure used in the section_notes table.
 * Each section's notes data is an array of chapters.
 *
 * EXAMPLE:
 * [
 *   {
 *     title: "The Market",
 *     meta: "3 concepts",
 *     keyIdea: "Markets differ by how wide their audience is and how fast they change.",
 *     blocks: [
 *       {
 *         title: "DEFINITIONS",  // sub-section label
 *         items: [
 *           {
 *             type: "def",      // def | mech | imp | link
 *             text: "<strong>Mass market</strong> — targets the widest audience; benefits from <strong>economies of scale</strong>."
 *           },
 *           {
 *             type: "def",
 *             text: "<strong>Niche market</strong> — small segment; charges <strong>premium prices</strong>.",
 *             tag: "exam"       // optional: "exam" | "calc" | "formula"
 *           }
 *         ]
 *       },
 *       {
 *         title: "HOW IT WORKS",
 *         items: [
 *           { type: "mech", text: "Mass markets: <strong>high revenue potential</strong> but intense competition." }
 *         ]
 *       }
 *     ],
 *     flow: {                    // optional flow chain
 *       steps: ["Step 1", "Step 2", "Step 3"],
 *       result: "Outcome",
 *       resultType: "good"      // "good" | "bad"
 *     },
 *     formula: {                 // optional formula card
 *       label: "MARKET SHARE",
 *       text: "Market Share (%) = (Firm's Sales ÷ Total Market Sales) × 100"
 *     },
 *     examMatters: "Examiners want you to...",  // optional
 *     misconception: "Students say X. Wrong because Y. Instead write Z.",  // optional
 *     takeaway: [               // at end of page, not per chapter
 *       "Mass markets = scale & volume; niche = premium pricing & loyalty.",
 *       "Primary research is tailored but costly; secondary is quick but may not fit."
 *     ]
 *   }
 * ]
 *
 * BULLET TYPES:
 *   def  = green bar (definition / key term)
 *   mech = blue bar (mechanism / how it works)
 *   imp  = amber bar (important / implication)
 *   link = teal bar (connection to other topics)
 *
 * TAGS:
 *   exam    = blue "EXAM TIP" badge
 *   calc    = purple "FORMULA" badge
 */

export const NOTE_BULLET_TYPES = {
  def: 'Definition',
  mech: 'Mechanism',
  imp: 'Important',
  link: 'Link',
};
