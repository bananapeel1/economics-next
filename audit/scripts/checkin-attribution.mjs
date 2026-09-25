#!/usr/bin/env node
/**
 * Is every item a chapter SHOWS actually ABOUT that chapter?
 *
 *   node audit/scripts/checkin-attribution.mjs                 live `data`
 *   node audit/scripts/checkin-attribution.mjs --staged        the rebuilds
 *   node audit/scripts/checkin-attribution.mjs --both
 *   node audit/scripts/checkin-attribution.mjs --check         exit 1 on an unattributable served item
 *   node audit/scripts/checkin-attribution.mjs --section <id>  one section
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
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSteps } from '../../lib/learn-steps.js';
import { placeChapterItems } from '../../lib/checkin-placement.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const val = (n) => { const i = argv.indexOf(n); return i < 0 ? null : argv[i + 1]; };
const CHECK = flag('--check');
const FIXTURE = val('--fixture');
const ONLY = val('--section');
const STAGED = flag('--staged');
const BOTH = flag('--both');

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

  const { quizMap, practiceMap } = placeChapterItems({
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
 */
export function judgeServed(served, sectionId) {
  const failures = [];
  const notes = [];
  for (const row of served) {
    if (shares(itemText(row.item), row.block)) continue;
    const rec = {
      section: sectionId, block: row.block, kind: row.kind,
      detail: `${row.kind} on "${row.block}" shares no word with the chapter: "${String(itemText(row.item)).slice(0, 56)}"`,
    };
    if (row.pinned) notes.push({ ...rec, rule: 'pinned-mismatch', key: `pinned-mismatch|${sectionId}|${row.block}|${row.kind}` });
    else failures.push({ ...rec, rule: 'attribution', key: `attribution|${sectionId}|${row.block}|${row.kind}` });
  }
  return { failures, notes };
}

function judge(section) {
  const { served, hasRefs, chapters } = place(section);
  const { failures, notes } = judgeServed(served, section.id);
  return { failures, notes, served: served.length, chapters, hasRefs };
}

function loadCorpus(staged) {
  if (FIXTURE) {
    const f = JSON.parse(fs.readFileSync(path.isAbsolute(FIXTURE) ? FIXTURE : path.join(ROOT, FIXTURE), 'utf8'));
    return f.sections.map((s) => ({ ...s, id: s.slug || s.id }));
  }
  const dir = path.join(ROOT, staged ? 'audit/snapshots' : 'audit/content-sections');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => {
    const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    return { ...j, id: (j.meta && j.meta.id) || f.replace(/\.json$/, '') };
  });
}

function run(staged, label) {
  const corpus = loadCorpus(staged).filter((s) => !ONLY || s.id === ONLY || s.id.endsWith(ONLY));
  let served = 0, silentChapters = 0;
  const failures = [];
  const notes = [];
  for (const section of corpus) {
    const r = judge(section);
    served += r.served;
    failures.push(...r.failures);
    notes.push(...r.notes);
    if (!r.hasRefs && r.chapters) silentChapters += r.chapters;
  }
  const unattributed = failures.length;
  console.log(`\ncheckin-attribution — ${label}`);
  console.log(`  sections                     ${corpus.length}`);
  console.log(`  items served at a chapter    ${served}`);
  console.log(`  UNATTRIBUTED                 ${unattributed}`);
  console.log(`  chapters serving nothing because their section pins nothing   ${silentChapters}`);
  console.log(`  pinned items sharing no word with their chapter (NOTE, not a failure)   ${notes.length}`);
  if (failures.length) {
    console.log('');
    for (const f of failures.slice(0, 40)) console.log(`  ${f.section.padEnd(42)} ${f.detail}`);
    if (failures.length > 40) console.log(`  … and ${failures.length - 40} more`);
  }
  return failures;
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
  if (BOTH) { all.push(...run(false, 'live `data`')); all.push(...run(true, 'staged')); }
  else all.push(...run(STAGED, STAGED ? 'staged' : 'live `data`'));

  console.log('');
  if (!all.length) console.log('no unattributed items');
  else console.log(`${all.length} unattributed item(s)`);
  console.log('');

  if (flag('--json')) console.log(JSON.stringify({ failures: all }, null, 1));
  process.exit(CHECK && all.length ? 1 : 0);
}
