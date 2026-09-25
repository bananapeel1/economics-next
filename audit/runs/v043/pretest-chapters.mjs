/**
 * V043 — DOES THE SIGNED-OUT PRE-TEST ASK ABOUT CHAPTERS THE STUDENT HAS NOT OPENED?
 *
 * V043 was filed from audit/runs/packet-38/pretest-ab.mjs, which computes the check-in questions as
 *
 *     checkins.map((s) => resolvePinnedItem(s, payload.quiz, payload.content))
 *
 * `resolvePinnedItem` is `(items, pin, used)` (components/learn-mode/utils.js:100) and returns null
 * when `items` is not an array. A step object is not an array, so that line returns null for every
 * check-in, the probe's reserved set is always EMPTY, and the "pre-test" it reports is simply the
 * first three items of the payload. Since V016 the payload puts one pin per chapter FIRST, so those
 * are chapter 1's, chapter 2's and chapter 3's check-in questions — the "2 of 3 — ch2, ch3" signature
 * V043 records on every affected section, in both corpora.
 *
 * This probe is the A/B. Same inputs, same attribution, one difference:
 *
 *   A  reserved = packet 38's call, verbatim (the control that should reproduce V043)
 *   B  reserved = what LearnModeTab passes PreTest: Object.values(placeChapterItems(...).quizMap),
 *      LearnModeTab.jsx `blockQuizQuestions`, via the shared placement function (lib/checkin-placement.js)
 *
 * Attribution: a question's chapter is the first block of the FULL bank whose authored pins
 * (quizIndices or quizIds) name it. A question no block pins is reported as unpinned, not as
 * chapter 1 (packet 38 counted it as chapter 1, which hid nothing but said less).
 *
 * Reads the database. No writes.
 *   node audit/runs/v043/pretest-chapters.mjs [--verbose]
 */
import { supabase } from '../../../scripts/_db.mjs';
import { sectionPayload } from '../../../lib/preview-limits.js';
import { pickPretestQuestions } from '../../../lib/pretest-pool.js';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
import { resolvePinnedItem } from '../../../components/learn-mode/utils.js';

const VERBOSE = process.argv.includes('--verbose');
const key = (q) => String(q?.question || '').replace(/\s+/g, ' ').trim();

async function table(name, id, column) {
  const { data, error } = await supabase.from(name).select('data, draft').eq('section_id', id).maybeSingle();
  if (error) throw new Error(`${id} ${name}: ${error.message}`);
  if (!data) return [];
  return (column === 'draft' ? (data.draft ?? data.data) : data.data) || [];
}

function chapterOfFullBank(content, quiz) {
  const byId = new Map(quiz.map((q, i) => [q?.id, i]));
  const chapter = new Map();
  content.forEach((b, bi) => {
    const idx = [
      ...(Array.isArray(b?.quizIndices) ? b.quizIndices : []),
      ...(Array.isArray(b?.quizIds) ? b.quizIds.map((id) => byId.get(id)).filter((i) => i != null) : []),
    ];
    for (const i of idx) if (quiz[i] && !chapter.has(key(quiz[i]))) chapter.set(key(quiz[i]), bi + 1);
  });
  return chapter;
}

function measure(tables, isPremium, mode) {
  const payload = sectionPayload(tables, { isPremium });
  const flatSteps = buildSteps(payload.content);
  let reserved;
  if (mode === 'A') {
    const checkins = flatSteps.filter((s) => s.type === 'checkin' || s.type === 'legacy');
    reserved = checkins.map((s) => resolvePinnedItem(s, payload.quiz, payload.content)).filter(Boolean);
  } else {
    const { quizMap } = placeChapterItems({
      flatSteps, contentData: payload.content, diagramsData: payload.diagrams,
      quizData: payload.quiz, practiceData: payload.practice,
    });
    reserved = Object.values(quizMap).filter(Boolean);
  }
  const pre = pickPretestQuestions(payload.quiz, reserved);
  const reservedKeys = new Set(reserved.map(key));
  return { pre, reservedCount: reserved.length, spoiled: pre.filter((q) => reservedKeys.has(key(q))).length };
}

const { data: sections, error } = await supabase.from('sections').select('id').order('id');
if (error) { console.error(error.message); process.exit(1); }

for (const corpus of ['data', 'draft']) {
  const tally = {};
  const lines = [];
  let seen = 0;
  for (const { id } of sections) {
    const [content, quiz, notes, diagrams, practice, flashcards, mistakes, extras] = await Promise.all([
      table('section_content', id, corpus), table('section_quiz', id, corpus),
      table('section_notes', id, corpus), table('section_diagrams', id, corpus),
      table('section_practice', id, corpus), table('section_flashcards', id, corpus),
      table('section_common_mistakes', id, corpus), table('section_extras', id, corpus),
    ]);
    if (!content.length || !quiz.length) continue;
    seen += 1;
    const tables = { content, quiz, notes, diagrams, practice, flashcards, mistakes, extras };
    const chapter = chapterOfFullBank(content, quiz);
    const pinnedSection = chapter.size > 0;

    for (const mode of ['A', 'B']) {
      for (const isPremium of [false, true]) {
        const k = `${mode}-${isPremium ? 'pro' : 'out'}`;
        tally[k] ??= { sections: 0, premature: 0, spoiled: 0, reservedEmpty: 0, len: [0, 0, 0, 0] };
        const { pre, reservedCount, spoiled } = measure(tables, isPremium, mode);
        const ch = pre.map((q) => chapter.get(key(q)) ?? null);
        const premature = ch.filter((c) => c != null && c > 1).length;
        const t = tally[k];
        if (premature) t.sections += 1;
        t.premature += premature;
        t.spoiled += spoiled;
        if (!reservedCount) t.reservedEmpty += 1;
        t.len[pre.length] += 1;
        if (VERBOSE || (mode === 'B' && premature)) {
          lines.push(`${k.padEnd(7)} ${id.padEnd(40)} ${pinnedSection ? 'pinned' : 'unpinned'} ${content.length}ch  pre=${pre.length}  chapters=[${ch.map((c) => c ?? '-').join(',')}]  reserved=${reservedCount}`);
        }
      }
    }
  }
  console.log(`\n=== ${corpus === 'draft' ? 'DRAFT (staged)' : 'LIVE'} — ${seen} sections ===`);
  console.log('run      sections-with-premature  premature-qs  pre-test∩check-in  reserved-set-empty  pre-test length 3/2/1/0');
  for (const k of ['A-out', 'A-pro', 'B-out', 'B-pro']) {
    const t = tally[k];
    console.log(`${k.padEnd(8)} ${String(t.sections).padStart(23)}  ${String(t.premature).padStart(12)}  ${String(t.spoiled).padStart(17)}  ${String(t.reservedEmpty).padStart(18)}  ${t.len[3]}/${t.len[2]}/${t.len[1]}/${t.len[0]}`);
  }
  lines.forEach((l) => console.log('  ' + l));
}
