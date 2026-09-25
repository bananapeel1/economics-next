/* The exact questions each probe predicts for ONE section, signed out, so the on-screen pre-test
   can say which prediction is real. node audit/runs/v043/predict-one.mjs <section> [data|draft] */
import { supabase } from '../../../scripts/_db.mjs';
import { sectionPayload } from '../../../lib/preview-limits.js';
import { pickPretestQuestions } from '../../../lib/pretest-pool.js';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
import { resolvePinnedItem } from '../../../components/learn-mode/utils.js';
const [id, corpus = 'draft'] = process.argv.slice(2);
const names = ['content', 'quiz', 'notes', 'diagrams', 'practice', 'flashcards', 'common_mistakes', 'extras'];
const tables = {};
for (const n of names) {
  const { data } = await supabase.from(`section_${n}`).select('data, draft').eq('section_id', id).maybeSingle();
  tables[n === 'common_mistakes' ? 'mistakes' : n] = (corpus === 'draft' ? (data?.draft ?? data?.data) : data?.data) || (n === 'extras' ? {} : []);
}
const key = (q) => String(q?.question || '').replace(/\s+/g, ' ').trim();
const chapter = new Map();
tables.content.forEach((b, bi) => (b.quizIndices || []).forEach((i) => { if (tables.quiz[i] && !chapter.has(key(tables.quiz[i]))) chapter.set(key(tables.quiz[i]), bi + 1); }));
const p = sectionPayload(tables, { isPremium: false });
const steps = buildSteps(p.content);
const A = pickPretestQuestions(p.quiz, steps.filter((s) => s.type === 'checkin' || s.type === 'legacy').map((s) => resolvePinnedItem(s, p.quiz, p.content)).filter(Boolean));
const { quizMap } = placeChapterItems({ flatSteps: steps, contentData: p.content, diagramsData: p.diagrams, quizData: p.quiz, practiceData: p.practice });
const B = pickPretestQuestions(p.quiz, Object.values(quizMap).filter(Boolean));
const checkins = Object.entries(quizMap).map(([i, q]) => `  step ${i}: ch${steps[i].blockIndex + 1} asks "${key(q).slice(0, 90)}"`);
console.log(`${id} (${corpus}) signed out — ${p.quiz.length} sent of ${p.counts.quiz}`);
console.log('A (packet 38 call):'); A.forEach((q) => console.log(`  ch${chapter.get(key(q)) ?? '-'}  ${key(q).slice(0, 100)}`));
console.log('B (shipping call):'); B.forEach((q) => console.log(`  ch${chapter.get(key(q)) ?? '-'}  ${key(q).slice(0, 100)}`));
console.log('check-ins:'); checkins.forEach((l) => console.log(l));
