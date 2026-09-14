/**
 * SECTION UPGRADE TEMPLATE — structured notes format
 * =====================================================
 * Copy this file, rename it, fill in SECTION_SLUG and CONTENT.
 * Run with: node scripts/upgrade-content-YOUR-SECTION.mjs
 *
 * Writing rules (from revvylearn-notes skill):
 *   keyIdea       — max 180 chars, one complete sentence, no bold
 *   body paragraph — max 3 sentences, use **bold** for key terms
 *   realExample   — real named entity, 2–3 sentences, starts with entity name
 *   misconception — 3 sentences: wrong claim → why wrong → what to write instead
 *   examMatters   — 2–3 sentences on what the examiner specifically awards
 *   flow steps    — 2–4 pills; result must be "good" | "bad" | "neutral". A step is a plain string
 *                   ("Costs fall") or, when it needs a subtitle, an object:
 *                   { title: "Identify", subtitle: "list every option" }. Do not encode a subtitle
 *                   with " — " inside a string (the legacy form; the validator reports it), and a
 *                   hyphen or en dash in a string is never split, so formulae are safe (F073).
 *   takeaway      — 3–4 bullet strings, each ≤ 100 chars
 *
 * Before publishing, run the per-section checklist in audit/CONTENT-GATE.md ("The per-section
 * edit pass"): criterion in every recall prompt, examples an IAL candidate can picture, nothing
 * UK-only, every examiner claim sourced, the section's baseline smaller than it started (F116).
 */

import { stageSection, printFindings } from './_content-write.mjs';

/* ── 1. SET THESE ──────────────────────────────────────────────────────────── */

// The slug from the sections table (e.g. "demand", "supply", "market-failure")
const SECTION_SLUG = 'YOUR-SECTION-SLUG';

// Subject: 'economics' or 'business'
const SUBJECT_ID = 'economics';

/* ── 2. CONTENT ─────────────────────────────────────────────────────────────
   Each object in CONTENT = one stepper block (chapter).
   Each block has:
     title      — chapter heading shown in the stepper
     sections[] — array of sub-sections (each has 6 parts)
     takeaway[] — 3–4 bullet strings summarising the chapter
   ─────────────────────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: CHAPTER TITLE ═══ */
  {
    title: "CHAPTER TITLE",
    // Pin items to this block (optional — omit if block has no diagram/quiz/practice)
    diagramRef: "Diagram Title",       // matches by title substring (case-insensitive)
    quizIndices: [0],                  // indices into the section's quiz array
    practiceIndices: [0],              // indices into the section's practice array
    sections: [
      {
        id: "unique-kebab-case-id",          // must be unique within this section
        title: "Sub-section Title",
        keyIdea: "One complete sentence explaining the core concept — max 180 chars, no bold.",
        body: [
          // Supported types: "paragraph" | "subheading" | "flow" | "bullets"
          {
            type: "paragraph",
            text: "First sentence introducing the concept. **Key term** in bold. No more than 3 sentences per paragraph."
          },
          {
            type: "subheading",
            text: "Optional Sub-heading"
          },
          {
            type: "flow",
            steps: ["Step A", "Step B", "Step C"],   // max 4 pills
            result: "Outcome description",
            resultType: "good"                        // "good" | "bad" | "neutral"
          },
          {
            type: "bullets",
            items: [
              "First bullet point",
              "Second bullet point"
            ]
          }
        ],
        realExample: {
          emoji: "🏭",
          // Start with the named entity. 2–3 sentences. Must be a real, named case.
          text: "**Named Entity** did X. This illustrates Y because Z."
        },
        // 3 sentences: wrong claim → why wrong → what to write instead
        misconception: "Students often think X. That is wrong because Y. Instead write: Z.",
        // 2–3 sentences on what earns marks
        examMatters: "Examiners award marks for A, B, and C. Do not just list — explain the chain of reasoning."
      },

      // Add more sub-sections here...
    ],
    takeaway: [
      "Key point 1 — keep under 100 chars",
      "Key point 2 — keep under 100 chars",
      "Key point 3 — keep under 100 chars",
    ]
  },

  // Add more blocks here...

];

/* ── 3. VALIDATION ──────────────────────────────────────────────────────────
   Done by lib/content-validator.mjs, inside the write path, via stageSection().
   This file used to carry its own validate() — as did 21 copies of it, while 22
   other section scripts had none (F110). There is one validator now and no
   script can skip it: scripts/_db.mjs refuses a direct write of `data`.
   ─────────────────────────────────────────────────────────────────────────── */

/* ── 4. PUSH ─────────────────────────────────────────────────────────────── */

async function run() {
  console.log(`\nValidating and staging content for "${SECTION_SLUG}"...`);
  const result = await stageSection(SECTION_SLUG, 'section_content', CONTENT);
  printFindings(result.findings);
  if (!result.ok) {
    console.error(`\n❌ ${result.newBlocks.length} BLOCK finding(s) not in the baseline — nothing was written.`);
    process.exit(1);
  }
  console.log(`\n✅ "${SECTION_SLUG}" staged as a draft (${CONTENT.length} blocks). Students still see the previous version.`);
  console.log(`   Review:  node scripts/publish-section.mjs ${SECTION_SLUG}`);
  console.log(`   Publish: node scripts/publish-section.mjs ${SECTION_SLUG} --confirm`);
}

run();
