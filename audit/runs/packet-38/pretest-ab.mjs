/**
 * PACKET 38, Verify B — IS THE SIGNED-OUT PRE-TEST DRAWING PREMATURE QUESTIONS A REGRESSION?
 *
 * The probe found that a signed-out student's pre-test on the staged section includes a chapter-3
 * question. Before calling that this packet's defect, A/B it: measure the SAME property on the
 * LIVE copy of this section (5 blocks, the pre-rebuild content) and on every other section in both
 * corpora. A measurement with no control cannot tell a regression from house behaviour — packet
 * 2.7, V029.
 *
 * The property measured: for each section, how many of the signed-out pre-test's questions are
 * pinned to a chapter LATER than chapter 1, i.e. ask about something the student has not reached.
 */
import { supabase } from '../../../scripts/_db.mjs';
import { sectionPayload } from '../../../lib/preview-limits.js';
import { pickPretestQuestions } from '../../../lib/pretest-pool.js';
import { buildSteps } from '../../../lib/learn-steps.js';
import { resolvePinnedItem } from '../../../components/learn-mode/utils.js';

const TABLES = ['section_content', 'section_quiz', 'section_notes', 'section_diagrams',
  'section_practice', 'section_flashcards', 'section_common_mistakes', 'section_extras'];
const KEY = { section_content: 'content', section_quiz: 'quiz', section_notes: 'notes',
  section_diagrams: 'diagrams', section_practice: 'practice', section_flashcards: 'flashcards',
  section_common_mistakes: 'mistakes', section_extras: 'extras' };

const { data: sections } = await supabase.from('sections').select('id').order('id');

for (const corpus of ['data', 'draft']) {
  let sectionsWith = 0, total = 0, seen = 0;
  const worst = [];
  for (const { id } of sections) {
    const tables = {};
    for (const t of TABLES) {
      const { data } = await supabase.from(t).select(`${corpus}, data`).eq('section_id', id).maybeSingle();
      const v = data ? (data[corpus] ?? data.data) : null;
      tables[KEY[t]] = v ?? (t === 'section_extras' ? {} : []);
    }
    if (!tables.content.length || !tables.quiz.length) continue;
    seen += 1;
    const payload = sectionPayload(tables, { isPremium: false });
    const steps = buildSteps(payload.content);
    const checkins = steps.filter((s) => s.type === 'checkin' || s.type === 'legacy');
    const reserved = checkins.map((s) => resolvePinnedItem(s, payload.quiz, payload.content)).filter(Boolean);
    const pre = pickPretestQuestions(payload.quiz, reserved);

    /* which chapter does each pre-test question belong to, in the FULL bank's pins? */
    const chapterOf = new Map();
    tables.content.forEach((b, bi) => (b.quizIndices || []).forEach((qi) => {
      if (tables.quiz[qi]) chapterOf.set(tables.quiz[qi].question, bi + 1);
    }));
    const premature = pre.filter((q) => (chapterOf.get(q.question) || 1) > 1);
    total += premature.length;
    if (premature.length) {
      sectionsWith += 1;
      worst.push(`${id} (${tables.content.length} ch): ${premature.length} of ${pre.length} — ${premature.map((q) => `ch${chapterOf.get(q.question)}`).join(', ')}`);
    }
  }
  console.log(`\n=== ${corpus.toUpperCase()} — ${seen} sections ===`);
  console.log(`sections whose signed-out pre-test asks about a chapter the student has not reached: ${sectionsWith} of ${seen}`);
  console.log(`premature questions in total: ${total}`);
  worst.slice(0, 60).forEach((w) => console.log(`  ${w}`));
  if (worst.length > 60) console.log(`  … and ${worst.length - 60} more`);
}
