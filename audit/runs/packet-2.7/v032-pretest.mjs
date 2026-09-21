/* V032 clause 1: what the pre-test actually offers on packet 29's section, both entitlements. */
import { supabase } from '../../../scripts/_db.mjs';
import { sectionPayload } from '../../../lib/preview-limits.js';
import { pickPretestQuestions } from '../../../lib/pretest-pool.js';
import { buildSteps } from '../../../lib/learn-steps.js';
import { distributeItems, resolvePinnedItem, fallbackItemForBlock } from '../../../components/learn-mode/utils.js';
const ID = 'market-structures-contestability';
const t = async (name, col) => {
  const { data, error } = await supabase.from(name).select('data, draft').eq('section_id', ID).maybeSingle();
  if (error) throw new Error(`${name}: ${error.message}`);   // never swallow: exposure-census does, and reads a table that does not exist
  return (col === 'draft' ? (data?.draft ?? data?.data) : data?.data) || [];
};
const key = (q) => String(q?.question || '').replace(/\s+/g, ' ').trim();
for (const corpus of ['data', 'draft']) {
  const names = ['section_content','section_quiz','section_notes','section_diagrams','section_practice','section_flashcards','section_common_mistakes','section_extras'];
  const [content, quiz, notes, diagrams, practice, flashcards, mistakes, extras] = await Promise.all(names.map((n) => t(n, corpus)));
  const tables = { content, quiz, notes, diagrams, practice, flashcards, mistakes, extras };
  for (const isPremium of [false, true]) {
    const p = sectionPayload(tables, { isPremium });
    const steps = buildSteps(p.content);
    const checkins = steps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin');
    const slots = steps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
    const hasRefs = slots.some(({ s }) => s.diagramRef || s.quizIndices || s.practiceIndices || s.diagramId || s.quizIds || s.practiceIds);
    let reserved;
    if (hasRefs) {
      const used = new Set();
      const pinned = checkins.map(({ s }) => resolvePinnedItem(p.quiz, { ids: s.quizIds, indices: s.quizIndices }, used));
      reserved = checkins.map(({ s }, i) => pinned[i] || fallbackItemForBlock(p.quiz, s.blockTitle, used)).filter(Boolean);
    } else {
      reserved = Object.values(distributeItems(p.quiz, slots.length)).filter(Boolean);
    }
    const pre = pickPretestQuestions(p.quiz, reserved);
    const res = new Set(reserved.map(key));
    console.log(`${corpus} ${isPremium ? 'PRO ' : 'free'}: bank ${p.counts.quiz}, sent ${p.quiz.length}, chapters ${checkins.length}, reserved ${reserved.length}, pre-test ${pre.length} question(s), repeats ${pre.filter((q) => res.has(key(q))).length}`);
  }
}
