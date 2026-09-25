#!/usr/bin/env node
/**
 * Is every item a chapter SHOWS actually ABOUT that chapter?
 *
 *   node audit/scripts/checkin-attribution.mjs                 live `data`, read from the database
 *   node audit/scripts/checkin-attribution.mjs --staged        `draft`, per table falling back to `data`,
 *                                                              for every section holding a draft
 *   node audit/scripts/checkin-attribution.mjs --both
 *   node audit/scripts/checkin-attribution.mjs --check         exit 1 on a FAIL (below)
 *   node audit/scripts/checkin-attribution.mjs --section <id>  one section
 *   node audit/scripts/checkin-attribution.mjs --verbose       list every live undecided diagram
 *   node audit/scripts/checkin-attribution.mjs --fixture <f>   a fixture, for the guard's own tests
 *
 * WHY THIS EXISTS. A reader opened `types-sizes-businesses`, read chapter 1 — Profit Maximisation,
 * then Revenue/Sales Maximisation and Satisficing — and was asked "Which of the following best
 * describes horizontal integration?", a topic three chapters away, followed by a worked example on
 * limited liability, two chapters away. Nothing in the tree could have caught it:
 *
 *   `npm run exposure --check` fails on an UNSERVED chapter. Presence, never aboutness. It would
 *   pass a section that answered every chapter with a question from a different one, and it
 *   therefore preferred a wrong question to no question.
 *   `npm run pin-check` checks that a pin RESOLVES, not that it resolves to something relevant.
 *   `npm run validate` reads items, never the pairing of item to chapter.
 *
 * So the whole class was invisible: 33 of 52 chapter slots across the 21 unpinned live sections were
 * showing a question that shares no vocabulary at all with their own chapter, and only 6 were
 * showing one that does.
 *
 * WHAT ATTRIBUTION MEANS HERE, and it is deliberately the weakest possible test. An item is
 * attributed to the chapter that serves it when EITHER
 *   (a) the chapter pins it explicitly — by id, or by index; the author said so, and this guard
 *       takes an author's pin as true without re-judging the content, or
 *   (b) it shares at least one non-stop word with the chapter's title, the same bar
 *       `bestUnclaimedIndex` and `matchDiagramsToBlocks` already use.
 * Anything else is UNATTRIBUTED and fails. A weak bar that fires is worth more than a strong one
 * that needs a semantic reader nobody will build, and (b) is exactly the bar the product already
 * trusts, so this guard cannot be stricter than the code it guards.
 *
 * IT COMPOSES THE SHIPPING RESOLUTION, it does not model it. That is the V015 lesson: the figures
 * V015 shipped on came from a harness that resolved pins only and was blind to half the corpus. So
 * placement comes from `buildSteps` and the same `resolvePinnedItem` / `fallbackItemForBlock` the
 * client calls. If LearnModeTab changes how it places items, this guard changes with it, which is
 * the only way it can keep being true.
 *
 * WHAT IT DOES NOT CLAIM. Sharing a word with a chapter title is not evidence that a question
 * examines that chapter, and this guard will pass "Satisficing behaviour by firms" under a chapter
 * called "Growth of Firms" on the word `firms`. It is a floor, not a judgement: it catches an item
 * with NO relationship to its chapter, which is the defect that shipped. Real attribution needs the
 * per-item spec tags packet 12.5 is backfilling; when `spec_items` is populated this guard should
 * compare the item's leaves against the chapter's leaves and retire rule (b).
 *
 * DIAGRAMS (packet 2.91, V056), AND WHY THEIR RULE IS DIFFERENT. The quiz rule above cannot see the
 * diagram defect at all. `matchDiagramsToBlocks` never places a diagram without a shared title word,
 * so rule (b) passes everything it places — including the case that shipped: on live
 * types-sizes-businesses "Types of Business Growth (Integration)" shares `types` and `business` with
 * chapter 2, "Types of Business Organisation", and only `growth` with chapter 3, "Growth of Firms",
 * which is the one that teaches integration. A title cannot say which chapter a diagram is about.
 *
 * A stronger lexical rule was measured and rejected (audit/runs/packet-2.91/text-probe.mjs): scoring
 * each diagram's own title and description against every chapter's full text, weighted by how few
 * chapters use each word, flagged 30 of 227 served diagrams. It caught 3.3.1 by 18.5 to 1.7, but
 * about twenty of the thirty were correct placements (a rebuild's "Maximum and Minimum Prices"
 * diagram on its "Maximum and Minimum Prices" chapter among them), the separation between true and
 * false was 2.6x against 3.5x, and it missed a case outright. A guard that fails on correct content
 * gets switched off.
 *
 * So the diagram rule judges the one thing a machine can know: whether an AUTHOR placed the diagram.
 * `placeChapterItems` reports it (`diagramHow`), so this file restates nothing:
 *   `pin`    an author's `diagramId` / `diagramRef` resolved. Trusted, like a pinned question; NOTED
 *            if it shares no word with the chapter title, so a reader can look.
 *   `title`  `matchDiagramsToBlocks` guessed. That is `diagram-undecided`, and it FAILS on the staged
 *            corpus: nothing waiting to be published may place a diagram by title. The fix is a
 *            `diagramId` pin, or `diagramId: null` where the chapter teaches none of the section's
 *            diagrams (`decidedNoDiagram`, lib/checkin-fallback.js).
 * On LIVE it is listed, not failed: live changes only by publishing a draft, so the list says, per
 * section, whether the staged draft already decides it. A live section with no draft is open debt.
 * An unpinned diagram sharing no word with its chapter FAILS everywhere, like a question — unreachable
 * through today's matcher, so it is the regression detector.
 *
 * WHY IT READS THE DATABASE. Until 2.91 "live" meant `audit/content-sections/`, the 11 September
 * export, and "staged" meant every file in `audit/snapshots/`, historical ones included (218 on
 * 25 September). Neither is what a student is served, and the diagram rule cannot run on them: the
 * export and the old snapshots hold undecided placements that no packet can ever change, so the
 * rule would fail forever. It now reads `data` and `draft`, as exposure-census does.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSteps } from '../../lib/learn-steps.js';
import { placeChapterItems } from '../../lib/checkin-placement.js';
import { TABLE_TO_KEY } from '../../lib/content-gate.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const val = (n) => { const i = argv.indexOf(n); return i < 0 ? null : argv[i + 1]; };
const CHECK = flag('--check');
const FIXTURE = val('--fixture');
const ONLY = val('--section');
const STAGED = flag('--staged');
const BOTH = flag('--both');
const VERBOSE = flag('--verbose');

const STOP = new Set(['and', 'the', 'for', 'its', 'with', 'from', 'into', 'that', 'this', 'are',
  'was', 'how', 'why', 'what', 'their', 'them', 'not', 'but', 'can', 'has', 'over', 'which',
  'following', 'would', 'best', 'most', 'describes', 'statement']);
const words = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w));

const shares = (itemText, blockTitle) => {
  const b = new Set(words(blockTitle));
  return words(itemText).some((w) => b.has(w));
};

const itemText = (it) => [it?.question, it?.prompt, it?.title, it?.scenario].filter(Boolean).join(' ');
const diagramLabel = (d) => d?.id || d?.title || '?';

/**
 * Placement for one section — from lib/checkin-placement.js, the SAME function the client calls.
 * The first draft of this guard re-implemented the branch, which would have kept passing if the
 * component started distributing positionally again. That is the defect this guard exists to catch,
 * so it must not be reachable through the guard's own copy of the logic.
 */
function place(section) {
  const content = section.content || [];
  const steps = buildSteps(content) || [];
  const slots = steps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
  const pinnedKeys = ['diagramRef', 'quizIndices', 'practiceIndices', 'diagramId', 'quizIds', 'practiceIds'];
  const hasRefs = slots.some(({ s }) => pinnedKeys.some((k) => s[k]));

  const { quizMap, practiceMap, diagramMap, diagramHow } = placeChapterItems({
    flatSteps: steps,
    contentData: content,
    diagramsData: section.diagrams || [],
    quizData: section.quiz || [],
    practiceData: section.practice || [],
  });

  const byIndex = new Map(slots.map(({ s, i }) => [i, s]));
  const served = [];
  for (const [idxStr, item] of Object.entries(quizMap)) {
    const step = byIndex.get(Number(idxStr));
    if (step && item) served.push({ kind: 'quiz', block: step.blockTitle, item, pinned: Boolean(step.quizIds || step.quizIndices) });
  }
  for (const [idxStr, item] of Object.entries(practiceMap)) {
    const step = byIndex.get(Number(idxStr));
    if (step && item) served.push({ kind: 'practice', block: step.blockTitle, item, pinned: Boolean(step.practiceIds || step.practiceIndices) });
  }
  // Diagrams carry HOW they were placed, from the placement itself: a pin is an author's decision,
  // a title match is the matcher's guess (V056). `pinned` keeps its meaning for the shared rule.
  for (const [idxStr, item] of Object.entries(diagramMap)) {
    const step = byIndex.get(Number(idxStr));
    if (step && item) served.push({ kind: 'diagram', block: step.blockTitle, item, pinned: diagramHow[idxStr] === 'pin', how: diagramHow[idxStr] });
  }
  return { served, hasRefs, chapters: slots.length };
}

/**
 * The RULE, exported so it can be tested on synthetic input. Two tiers, and the split matters:
 *
 *   FAIL  a served item that no pin claims and that shares no word with its chapter. With the
 *         current placement this is UNREACHABLE — an unpinned section serves nothing, and
 *         `fallbackItemForBlock` cannot return an item with no shared word. That is the point: it
 *         is a REGRESSION DETECTOR. Restore positional distribution and it fires immediately,
 *         because the guard resolves placement through the same function the client does.
 *
 *   NOTE  a PINNED item that shares no word with its chapter. Not a failure, because an author's
 *         pin can be right while the vocabulary misses — "Satisficing behaviour" genuinely belongs
 *         under "Business Objectives" and shares nothing with the title. Failing on these would
 *         make the guard punish correct content, and a guard with false positives gets switched
 *         off. They are counted and listed so a mis-pin (V016's defect) is visible to a reader
 *         without being auto-condemned.
 *
 *   UNDECIDED  a DIAGRAM placed by title match rather than by a pin (V056, header). A FAILURE when
 *         `strict` — the staged corpus, and fixtures — and returned as `undecided` otherwise, for
 *         the live listing. Judged before the word test, because the matcher never places a diagram
 *         without a shared word and the word test would pass every one of them.
 */
export function judgeServed(served, sectionId, { strict = true } = {}) {
  const failures = [];
  const notes = [];
  const undecided = [];
  for (const row of served) {
    const text = row.kind === 'diagram' ? row.item?.title : itemText(row.item);
    if (row.kind === 'diagram' && row.how === 'title') {
      const rec = {
        section: sectionId, block: row.block, kind: row.kind, rule: 'diagram-undecided',
        key: `diagram-undecided|${sectionId}|${row.block}`, diagram: diagramLabel(row.item),
        detail: `diagram on "${row.block}" was placed by a title match, not by a pin: "${String(text).slice(0, 56)}"`,
      };
      if (strict) failures.push(rec);
      else undecided.push(rec);
    }
    if (shares(text, row.block)) continue;
    const rec = {
      section: sectionId, block: row.block, kind: row.kind,
      detail: `${row.kind} on "${row.block}" shares no word with the chapter: "${String(text).slice(0, 56)}"`,
    };
    if (row.pinned) notes.push({ ...rec, rule: 'pinned-mismatch', key: `pinned-mismatch|${sectionId}|${row.block}|${row.kind}` });
    else failures.push({ ...rec, rule: 'attribution', key: `attribution|${sectionId}|${row.block}|${row.kind}` });
  }
  return { failures, notes, undecided };
}

function judge(section, opts) {
  const { served, hasRefs, chapters } = place(section);
  const { failures, notes, undecided } = judgeServed(served, section.id, opts);
  return { failures, notes, undecided, served: served, chapters, hasRefs };
}

/**
 * Every section, as the route serves it. `live` is `data`; `staged` is `draft` per table, falling
 * back to `data` exactly as `app/api/sections/[id]/route.js` does for `?draft=1`, and only for the
 * sections that hold a draft of some table — a section with none is identical to live.
 * The database client is imported here rather than at the top so that importing `judgeServed`
 * (the test file does) never needs credentials.
 */
async function loadDatabase() {
  const { supabase } = await import('../../scripts/_db.mjs');
  const { data: sections, error } = await supabase.from('sections').select('id').order('id');
  if (error) throw new Error(`sections: ${error.message}`);
  const out = [];
  for (const { id } of sections) {
    const live = { id }; const draft = { id }; let hasDraft = false;
    for (const [table, key] of Object.entries(TABLE_TO_KEY)) {
      const { data, error: e } = await supabase.from(table).select('data, draft').eq('section_id', id).maybeSingle();
      if (e) throw new Error(`${table} ${id}: ${e.message}`);
      live[key] = data?.data ?? null;
      draft[key] = data?.draft ?? data?.data ?? null;
      if (data?.draft != null) hasDraft = true;
    }
    out.push({ live, draft: hasDraft ? draft : null });
  }
  return out;
}

let dbCache = null;
async function loadCorpus(staged) {
  if (FIXTURE) {
    const f = JSON.parse(fs.readFileSync(path.isAbsolute(FIXTURE) ? FIXTURE : path.join(ROOT, FIXTURE), 'utf8'));
    return f.sections.map((s) => ({ ...s, id: s.slug || s.id }));
  }
  dbCache = dbCache || await loadDatabase();
  return dbCache.map((r) => (staged ? r.draft : r.live)).filter(Boolean);
}

async function run(staged, label) {
  const strict = Boolean(staged || FIXTURE);
  const corpus = (await loadCorpus(staged)).filter((s) => !ONLY || s.id === ONLY || s.id.endsWith(ONLY));
  let silentChapters = 0;
  const counts = { quiz: 0, practice: 0, diagram: 0, diagramByPin: 0 };
  const failures = [];
  const notes = [];
  const undecided = [];
  for (const section of corpus) {
    const r = judge(section, { strict });
    for (const row of r.served) {
      counts[row.kind] += 1;
      if (row.kind === 'diagram' && row.how === 'pin') counts.diagramByPin += 1;
    }
    failures.push(...r.failures);
    notes.push(...r.notes);
    undecided.push(...r.undecided);
    if (!r.hasRefs && r.chapters) silentChapters += r.chapters;
  }
  const byRule = (rule) => failures.filter((f) => f.rule === rule).length;
  console.log(`\ncheckin-attribution — ${label}`);
  console.log(`  sections                     ${corpus.length}`);
  console.log(`  items served at a chapter    ${counts.quiz + counts.practice} (quiz ${counts.quiz}, practice ${counts.practice})`);
  console.log(`  diagrams served at a chapter ${counts.diagram} (placed by a pin ${counts.diagramByPin}, by a title match ${counts.diagram - counts.diagramByPin})`);
  console.log(`  UNATTRIBUTED                 ${byRule('attribution')}`);
  if (strict) console.log(`  UNDECIDED DIAGRAMS           ${byRule('diagram-undecided')}   (a title match in a corpus that must decide — FAILS)`);
  console.log(`  chapters serving nothing because their section pins nothing   ${silentChapters}`);
  console.log(`  pinned items sharing no word with their chapter (NOTE, not a failure)   ${notes.length}`);
  if (failures.length) {
    console.log('');
    for (const f of failures.slice(0, 40)) console.log(`  ${f.section.padEnd(42)} ${f.detail}`);
    if (failures.length > 40) console.log(`  … and ${failures.length - 40} more`);
  }
  if (!strict && undecided.length) liveUndecided(undecided);
  return failures;
}

/**
 * Live diagrams placed by title, per section, with whether the section's staged draft decides them.
 * Live changes only by publishing, so this is a list for whoever publishes, not a failure.
 */
function liveUndecided(undecided) {
  const bySection = new Map();
  for (const u of undecided) bySection.set(u.section, [...(bySection.get(u.section) || []), u]);
  const staged = new Map((dbCache || []).filter((r) => r.draft).map((r) => [r.live.id, r.draft]));
  let decidedByDraft = 0, open = 0;
  const lines = [];
  for (const [section, rows] of bySection) {
    const draft = staged.get(section);
    const stillUndecided = draft ? judge(draft, { strict: true }).failures.filter((f) => f.rule === 'diagram-undecided').length : null;
    const state = draft == null ? 'NO DRAFT — open' : stillUndecided ? `draft still has ${stillUndecided} — open` : 'draft decides them all — fixed at publish';
    if (draft != null && !stillUndecided) decidedByDraft += rows.length; else open += rows.length;
    lines.push(`  ${section.padEnd(42)} ${String(rows.length).padStart(2)}  ${state}`);
    if (VERBOSE) for (const r of rows) lines.push(`      ${r.detail}`);
  }
  console.log(`  diagrams placed by a title match (listed, not failed: live changes only by publishing)   ${undecided.length}`);
  console.log(`    decided by the section's staged draft ${decidedByDraft} · no decision staged ${open}`);
  console.log(lines.join('\n'));
}

/*
 * The CLI body runs ONLY when this file is executed directly. audit/scripts/spec-coverage.test.mjs
 * warns about exactly this — "Importing it would run its CLI body and share this process's argv" —
 * and the first draft of the test file beside this one imported `judgeServed`, ran this block, hit
 * `process.exit(0)` and reported one passing test while four never registered. A guard that exits
 * the process that imports it cannot be unit-tested, and the rule is the part worth unit-testing.
 */
const RUN_DIRECTLY = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (RUN_DIRECTLY) {
  const all = [];
  if (FIXTURE) all.push(...await run(false, 'fixture'));
  else if (BOTH) { all.push(...await run(false, 'live `data`')); all.push(...await run(true, 'staged `draft`')); }
  else all.push(...await run(STAGED, STAGED ? 'staged `draft`' : 'live `data`'));

  console.log('');
  if (!all.length) console.log('no failures');
  else console.log(`${all.length} failure(s)`);
  console.log('');

  if (flag('--json')) console.log(JSON.stringify({ failures: all }, null, 1));
  process.exit(CHECK && all.length ? 1 : 0);
}
