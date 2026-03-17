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
 *   flow steps    — max 4 pills; result must be "good" | "bad" | "neutral"
 *   takeaway      — 3–4 bullet strings, each ≤ 100 chars
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

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
   Run automatically before pushing. Catches common writing-rule violations.
   ─────────────────────────────────────────────────────────────────────────── */

function validate(content) {
  const errors = [];
  const ids = new Set();

  content.forEach((block, bi) => {
    const bLabel = `Block ${bi + 1} "${block.title}"`;

    if (!block.title) errors.push(`${bLabel}: missing title`);
    if (!Array.isArray(block.sections) || block.sections.length === 0)
      errors.push(`${bLabel}: sections[] must be a non-empty array`);
    if (!Array.isArray(block.takeaway) || block.takeaway.length < 3)
      errors.push(`${bLabel}: takeaway[] must have at least 3 items`);

    block.takeaway?.forEach((t, ti) => {
      if (t.length > 100) errors.push(`${bLabel} takeaway[${ti}]: ${t.length} chars (max 100)`);
    });

    block.sections?.forEach((sec, si) => {
      const sLabel = `${bLabel} > Section ${si + 1} "${sec.title}"`;

      if (!sec.id) errors.push(`${sLabel}: missing id`);
      if (ids.has(sec.id)) errors.push(`${sLabel}: duplicate id "${sec.id}"`);
      ids.add(sec.id);

      if (!sec.title) errors.push(`${sLabel}: missing title`);

      if (!sec.keyIdea) {
        errors.push(`${sLabel}: missing keyIdea`);
      } else {
        if (sec.keyIdea.length > 180)
          errors.push(`${sLabel}: keyIdea is ${sec.keyIdea.length} chars (max 180)`);
        if (sec.keyIdea.includes('**'))
          errors.push(`${sLabel}: keyIdea must not contain **bold** — it is rendered plain`);
      }

      if (!Array.isArray(sec.body) || sec.body.length === 0)
        errors.push(`${sLabel}: body[] must be a non-empty array`);

      sec.body?.forEach((b, bi2) => {
        if (!b.type) errors.push(`${sLabel} body[${bi2}]: missing type`);
        if (b.type === 'flow') {
          if (!Array.isArray(b.steps) || b.steps.length < 2)
            errors.push(`${sLabel} body[${bi2}]: flow needs at least 2 steps`);
          if (b.steps?.length > 4)
            errors.push(`${sLabel} body[${bi2}]: flow has ${b.steps.length} steps (max 4)`);
          if (!['good', 'bad', 'neutral'].includes(b.resultType))
            errors.push(`${sLabel} body[${bi2}]: flow resultType must be "good", "bad", or "neutral"`);
        }
      });

      if (!sec.realExample?.text)
        errors.push(`${sLabel}: missing realExample.text`);
      if (!sec.misconception)
        errors.push(`${sLabel}: missing misconception`);
      if (!sec.examMatters)
        errors.push(`${sLabel}: missing examMatters`);
    });
  });

  return errors;
}

/* ── 4. PUSH ─────────────────────────────────────────────────────────────── */

async function run() {
  console.log(`\nValidating content for "${SECTION_SLUG}"...`);
  const errors = validate(CONTENT);

  if (errors.length > 0) {
    console.error('\n❌ Validation failed — fix these before pushing:\n');
    errors.forEach(e => console.error(`  • ${e}`));
    process.exit(1);
  }
  console.log(`✓ Validation passed — ${CONTENT.length} blocks, ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections\n`);

  // Find the section record
  const { data: section, error: secErr } = await supabase
    .from('sections')
    .select('id')
    .eq('slug', SECTION_SLUG)
    .eq('subject_id', SUBJECT_ID)
    .single();

  if (secErr || !section) {
    console.error(`❌ Section "${SECTION_SLUG}" not found in ${SUBJECT_ID} sections table`);
    console.error(secErr?.message || '(no error detail)');
    process.exit(1);
  }

  // Upsert into section_content
  const { error } = await supabase
    .from('section_content')
    .upsert(
      { section_id: section.id, type: 'content', data: CONTENT },
      { onConflict: 'section_id,type' }
    );

  if (error) {
    console.error('❌ Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`✅ "${SECTION_SLUG}" updated successfully`);
  console.log(`   ${CONTENT.length} blocks · ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections · ${CONTENT.reduce((n, b) => n + b.takeaway.length, 0)} takeaway items`);
}

run();
