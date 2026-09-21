#!/usr/bin/env node
/**
 * What a SIGNED-OUT student actually receives, section by section. Packet 2.5.
 *
 *   node audit/scripts/exposure-census.mjs                live `data`
 *   node audit/scripts/exposure-census.mjs --draft        `draft`, falling back to `data` per table
 *   node audit/scripts/exposure-census.mjs --both         both corpora
 *   node audit/scripts/exposure-census.mjs --verbose      one line per section
 *   node audit/scripts/exposure-census.mjs --check        exit 1 on an unserved chapter
 *
 * WHY THIS EXISTS, and it is the V015 lesson written down. The figures V015 shipped on ("5.6
 * average") came from a harness that resolved PINNED blocks and nothing else, so it could not see
 * the 21 live sections LearnModeTab serves through its legacy `distributeItems` fallback — half
 * the corpus, and the half where the pre-test was actually failing. A census that reimplements
 * the client tests the reimplementation.
 *
 * So this one composes the shipping functions and nothing of its own:
 *
 *   lib/preview-limits.js       sectionPayload()      what the server sends a stranger
 *   lib/learn-steps.js          buildSteps()          what a chapter's check-in is
 *   components/learn-mode/utils resolvePinnedItem()   the pinned path
 *                               distributeItems()     the legacy path
 *   lib/pretest-pool.js         pickPretestQuestions() what the pre-test may ask
 *
 * WHAT IT RESTATES, and this is the honest limit of it. Nothing here imports `LearnModeTab.jsx` —
 * nothing can, outside React — so this file restates four things that live inside that component's
 * memo: the branch between the two paths (`LearnModeTab.jsx:205`), the check-in-only filter, the
 * order of pins-then-fallback, and how `blockQuizQuestions` is gathered. Keep all four identical to
 * the component; if they ever disagree, this file is the one that is wrong. A green census is
 * therefore NOT evidence that the component still does this — `lib/preview-limits.test.mjs` reads
 * `LearnModeTab.jsx` directly and fails if the fallback call is removed or reordered, which is what
 * actually holds the two together.
 *
 * `--check` fails on a STARVED chapter only: one that had a question available and did not get it.
 * A chapter nothing in its section matches is UNWRITTEN — content debt for that section's packet,
 * which no code change fixes — so it is reported and does not fail the run. `npm run exposure`
 * exiting 0 means no chapter was starved, not that every chapter has a question.
 *
 * Reads the database. No writes.
 */
import { supabase } from '../../scripts/_db.mjs';
import { sectionPayload, FREE_QUIZ_MAX, PRETEST_HEADROOM } from '../../lib/preview-limits.js';
import { pickPretestQuestions } from '../../lib/pretest-pool.js';
import { buildSteps } from '../../lib/learn-steps.js';
import { distributeItems, resolvePinnedItem, fallbackItemForBlock } from '../../components/learn-mode/utils.js';
import { bestUnclaimedIndex } from '../../lib/checkin-fallback.js';

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const CHECK = args.includes('--check');
const CORPORA = args.includes('--both') ? ['data', 'draft'] : [args.includes('--draft') ? 'draft' : 'data'];

/* LearnModeTab.jsx:205, verbatim in meaning: one ref anywhere puts the whole section on the pinned
   path, and blocks without a pin then get nothing. */
const hasRefs = (slots) =>
  slots.some(({ s }) => s.diagramRef || s.quizIndices || s.practiceIndices || s.diagramId || s.quizIds || s.practiceIds);

/** The questions the check-ins will ask, exactly as LearnModeTab builds `blockQuizQuestions`. */
function checkinQuestions(quizData, content) {
  const flatSteps = buildSteps(content);
  const slots = flatSteps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
  if (!slots.length) return { reserved: [], slots: 0 };

  if (hasRefs(slots)) {
    const used = new Set();
    const checkins = slots.filter(({ s }) => s.type === 'checkin');
    const pinned = checkins.map(({ s }) => resolvePinnedItem(quizData, { ids: s.quizIds, indices: s.quizIndices }, used));
    // then the per-block fallback, V026, exactly as LearnModeTab runs it after the pins
    const filled = checkins.map(({ s }, i) => pinned[i] || fallbackItemForBlock(quizData, s.blockTitle, used));

    /* A chapter left with nothing is two different problems and they must not be counted together.
       If a question it could have had was sitting unclaimed, the payload or the resolution starved
       it and that is a code defect. If nothing in what it was sent shares a word with it, the
       section never wrote it a question and that is content debt for that section's packet. */
    const starved = checkins.filter(({ s }, i) => !filled[i] && bestUnclaimedIndex(quizData, s.blockTitle, used) >= 0).length;
    return { reserved: filled.filter(Boolean), slots: checkins.length, starved };
  }

  const map = distributeItems(quizData, slots.length);
  const reserved = Object.values(map).filter(Boolean);
  // the legacy path spreads whatever it is sent, so a short chapter list is always the payload's doing
  return { reserved, slots: slots.length, starved: slots.length - reserved.length };
}

/*
 * V039, 19 September 2026 (packet 2.7). THIS FUNCTION USED TO SWALLOW ITS ERROR, and it was reading
 * `section_mistakes` — a table that does not exist; the real one is `section_common_mistakes`. The
 * Supabase client returns `{ data: null, error }` rather than throwing, `if (!data) return []` then
 * turned that into an empty array, and this census has walked all 43 sections with zero mistakes
 * since it was written. It moves none of the figures below — chapters served, items sent and
 * pre-test length never touch `mistakes` — but `counts.mistakes` was 0 on every row, and a census
 * that reads NOTHING and reports a number is the class this file exists to close. Now it throws.
 */
async function table(name, id, column) {
  const { data, error: e } = await supabase.from(name).select('data, draft').eq('section_id', id).maybeSingle();
  if (e) throw new Error(`${id} ${name}: ${e.message}`);
  if (!data) return [];
  // route.js:71 — `?draft=1` falls back to `data` per table when a table holds no draft.
  return (column === 'draft' ? (data.draft ?? data.data) : data.data) || [];
}

const { data: sections, error } = await supabase.from('sections').select('id').order('id');
if (error) { console.error(`sections: ${error.message}`); process.exit(1); }

let unserved = 0;

for (const corpus of CORPORA) {
  const rows = [];
  for (const { id } of sections) {
    const [content, quiz, notes, diagrams, practice, flashcards, mistakes, extras] = await Promise.all([
      table('section_content', id, corpus), table('section_quiz', id, corpus),
      table('section_notes', id, corpus), table('section_diagrams', id, corpus),
      table('section_practice', id, corpus), table('section_flashcards', id, corpus),
      table('section_common_mistakes', id, corpus), table('section_extras', id, corpus),
    ]);
    if (!content.length || !quiz.length) continue;

    const tables = { content, quiz, notes, diagrams, practice, flashcards, mistakes, extras };
    const free = sectionPayload(tables, { isPremium: false });
    const { reserved, slots, starved } = checkinQuestions(free.quiz, free.content);
    /* The same slot filter `checkinQuestions` uses, so the reported label cannot disagree with the
       path actually taken. It read the unfiltered step list before, which was a different question. */
    const pinned = hasRefs(buildSteps(free.content)
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.type === 'checkin' || s.type === 'legacy'));

    /* The same walk for a PAYING student, who is behind no cap at all. A chapter with no question
       here is not a paywall defect: it is a check-in nobody can fill, and packet 2.5 found two. */
    const pro = sectionPayload(tables, { isPremium: true });
    const proServed = checkinQuestions(pro.quiz, pro.content);

    rows.push({
      id, pinned, chapters: slots, served: reserved.length, starved,
      sent: free.quiz.length, bank: free.counts.quiz,
      pretest: pickPretestQuestions(free.quiz, reserved).length,
      proChapters: proServed.slots, proServed: proServed.reserved.length, proStarved: proServed.starved,
    });
  }

  const n = rows.length;
  const chapters = rows.reduce((a, r) => a + r.chapters, 0);
  const served = rows.reduce((a, r) => a + r.served, 0);
  const avg = (f) => (rows.reduce((a, r) => a + f(r), 0) / n).toFixed(2);
  const dist = [0, 1, 2, 3].map((k) => rows.filter((r) => r.pretest === k).length);

  console.log(`\n=== ${corpus === 'draft' ? 'DRAFT (staged)' : 'LIVE'} — ${n} sections, signed out ===`);
  console.log(`chapters served      ${served} / ${chapters}`);
  console.log(`items sent           avg ${avg((r) => r.sent)}, max ${Math.max(...rows.map((r) => r.sent))} of cap ${FREE_QUIZ_MAX}`);
  console.log(`share of the bank    avg ${avg((r) => (r.sent / r.bank) * 100)}%`);
  console.log(`pre-test length      ${dist[3]} threes, ${dist[2]} twos, ${dist[1]} ones, ${dist[0]} with NO pre-test  (headroom ${PRETEST_HEADROOM})`);
  console.log(`  of which unpinned  ${rows.filter((r) => !r.pinned && r.pretest === 0).length} of ${rows.filter((r) => !r.pinned).length} legacy sections have no pre-test`);

  const short = rows.filter((r) => r.served < r.chapters);
  const starved = rows.filter((r) => r.starved > 0);
  const proStarved = rows.filter((r) => r.proStarved > 0);
  unserved += starved.length + proStarved.length;

  console.log(`chapters with no question: ${short.reduce((a, r) => a + (r.chapters - r.served), 0)} across ${short.length} section(s)`);
  console.log(`  STARVED (a code defect — a question was there and the chapter did not get it):`);
  console.log(`    signed out  ${starved.length}${starved.length ? ` — ${starved.map((r) => `${r.id} (${r.starved})`).join(', ')}` : ''}`);
  console.log(`    signed in   ${proStarved.length}${proStarved.length ? ` — ${proStarved.map((r) => `${r.id} (${r.proStarved})`).join(', ')}` : ''}`);
  console.log(`  UNWRITTEN (content debt — nothing in the section matches that chapter):`);
  const unwritten = short.map((r) => ({ id: r.id, n: r.chapters - r.served - r.starved })).filter((x) => x.n > 0);
  console.log(`    ${unwritten.length}${unwritten.length ? ` — ${unwritten.map((x) => `${x.id} (${x.n})`).join(', ')}` : ''}`);

  if (VERBOSE) {
    console.log('\nsection                                    pins  ch  served  sent  bank  pre');
    for (const r of rows.sort((a, b) => a.id.localeCompare(b.id))) {
      console.log(
        `${r.id.padEnd(42)} ${(r.pinned ? 'pin' : 'legacy').padEnd(6)} ${String(r.chapters).padStart(2)} ` +
        `${String(r.served).padStart(6)} ${String(r.sent).padStart(5)} ${String(r.bank).padStart(5)} ${String(r.pretest).padStart(4)}`,
      );
    }
  }
}

if (CHECK && unserved) {
  console.error(`\nFAIL: ${unserved} section(s) starve a chapter of a question that was available to it.`);
  process.exit(1);
}
