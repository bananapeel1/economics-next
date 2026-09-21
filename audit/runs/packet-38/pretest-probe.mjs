/**
 * PACKET 38, Verify B — WHAT THE PRE-TEST ACTUALLY ASKS, over the STAGED draft.
 *
 * Composed from the shipping functions the way `audit/scripts/exposure-census.mjs` composes them,
 * because `pickPretestQuestions(quizData, reservedQuestions)` takes POSITIONAL arguments and the
 * first version of this probe passed it an options object — which silently returned an empty pool
 * and would have been reported as "the pre-test asks nothing". A probe that calls a shipping
 * function with the wrong signature measures the probe.
 */
import { supabase } from '../../../scripts/_db.mjs';
import { sectionPayload } from '../../../lib/preview-limits.js';
import { pickPretestQuestions } from '../../../lib/pretest-pool.js';
import { buildSteps } from '../../../lib/learn-steps.js';
import { resolvePinnedItem } from '../../../components/learn-mode/utils.js';

const SECTION = 'macroeconomic-objectives-policies';
const TABLES = ['section_content', 'section_quiz', 'section_notes', 'section_diagrams',
  'section_practice', 'section_flashcards', 'section_common_mistakes', 'section_extras'];
const KEY = { section_content: 'content', section_quiz: 'quiz', section_notes: 'notes',
  section_diagrams: 'diagrams', section_practice: 'practice', section_flashcards: 'flashcards',
  section_common_mistakes: 'mistakes', section_extras: 'extras' };

const tables = {};
for (const t of TABLES) {
  const { data } = await supabase.from(t).select('draft').eq('section_id', SECTION).maybeSingle();
  tables[KEY[t]] = data?.draft ?? (t === 'section_extras' ? {} : []);
}

for (const isPremium of [false, true]) {
  const payload = sectionPayload(tables, { isPremium });
  const steps = buildSteps(payload.content);
  const checkins = steps.filter((s) => s.type === 'checkin' || s.type === 'legacy');
  const reserved = checkins.map((s) => resolvePinnedItem(s, payload.quiz, payload.content)).filter(Boolean);
  const pre = pickPretestQuestions(payload.quiz, reserved);
  console.log(`\n${isPremium ? 'PRO' : 'SIGNED OUT'} — steps ${steps.length} · check-ins ${checkins.length} · quiz sent ${payload.quiz.length} · pre-test ${pre.length}`);
  pre.forEach((q, i) => console.log(`  ${i + 1}. ${q.question}`));
  const LATER = /Phillips|quantitative easing|lender of last resort|reserve (asset|requirement)|deregulation|privatis|crowding out/i;
  pre.forEach((q) => { if (LATER.test(q.question + ' ' + (q.options || []).join(' '))) console.log(`  !! LATER-CHAPTER MATERIAL: ${q.question}`); });
  const reservedSet = new Set(reserved.map((q) => q?.question));
  pre.forEach((q) => { if (reservedSet.has(q.question)) console.log(`  !! also a chapter check-in: ${q.question}`); });
  if (new Set(pre.map((q) => q.question)).size !== pre.length) console.log('  !! the pre-test repeats a question');
}
