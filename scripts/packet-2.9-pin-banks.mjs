#!/usr/bin/env node
/**
 * Packet 2.9 — pin the banks of the live sections that pin nothing.
 *
 *   node scripts/packet-2.9-pin-banks.mjs                     check every section in the manifest; writes nothing
 *   node scripts/packet-2.9-pin-banks.mjs --section <id>      one section
 *   node scripts/packet-2.9-pin-banks.mjs --stage             check, then stage section_content to `draft`
 *                                                             for every section with NO draft of any table
 *   node scripts/packet-2.9-pin-banks.mjs --json <file>       write the per-chapter report
 *
 * WHY. Packet 2.8 stopped the 21 unpinned live sections serving a question from the wrong chapter by
 * serving none: 51 chapters now end in a check-in with no question and no worked example. The fix
 * for those chapters is a pin, and a pin is a judgement — which existing item does this chapter
 * TEACH the answer to — so the pins were chosen by reading each chapter (audit/runs/packet-2.9/
 * AUTHOR-BRIEF.md) and judged blind by a second reader. This script does not choose anything. It
 * applies `audit/runs/packet-2.9/pins.json` and proves the application did only that.
 *
 * WHAT IT PROVES, per section, before anything is staged:
 *   1. The section is still unpinned live, and every pin names the item it was chosen for: the id in
 *      the manifest is the id at that index in the LIVE bank today (the bank may have moved since the
 *      reading was done; an index pin into a moved bank is exactly the F013 defect).
 *   2. Only `quizIndices` and `practiceIndices` changed. Every other field of every block, and every
 *      other table, is byte-identical to live.
 *   3. What each check-in SHOWS is what was chosen — resolved by `placeChapterItems`, the function the
 *      client calls, for a Pro reader (the bank as authored) AND a signed-out one (`sectionPayload`,
 *      which slices the bank and rewrites the pins). A chapter the reader left empty is pinned
 *      `quizIndices: []` and must show NOTHING to either reader: on the pinned path an ABSENT pin is
 *      not empty, because the V026 fallback fills it with the best vocabulary match.
 *   6. No practice item lands in a GUIDED slot while its opening paragraph is its mark scheme.
 *   4. Diagrams do not move. Pinning puts a section on the pinned path, which places diagrams by a
 *      different branch; both branches must give every chapter the same diagram.
 *   5. The content gate passes on the whole section as it would be published (stageSection, dry run).
 *
 * WHY INDICES AND NOT IDS. Ids survive a reordered bank, which is why the resolver prefers them. But
 * no block in the corpus pins by id — 113 live blocks and 170 drafted ones all use indices — and the
 * validator's `pins.range` / `pins.reuse`, `pin-check.mjs` and `_content-ops.mjs`'s renumbering all
 * read indices only. An id pin would be the one pin in the corpus that no guard can see. Check 1
 * above covers the risk ids exist for.
 *
 * WHAT IT WILL NOT DO. Stage a section that already holds a draft of ANY table. Eight of the 21 hold
 * a whole rebuilt section, held for the packet 5/7 checkpoint and already pinned; writing this
 * section's content to `draft` would overwrite the rebuild. Those eight are checked here and left for
 * the checkpoint (or a separate, founder-approved live patch).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { supabase } from './_db.mjs';
import { loadBundle, stageSection, printFindings } from './_content-write.mjs';
import { sameJson, TABLE_TO_KEY } from '../lib/content-gate.mjs';
import { buildSteps } from '../lib/learn-steps.js';
import { placeChapterItems } from '../lib/checkin-placement.js';
import { sectionPayload } from '../lib/preview-limits.js';
import { pickPretestQuestions } from '../lib/pretest-pool.js';

const PIN_KEYS = ['diagramRef', 'quizIndices', 'practiceIndices', 'diagramId', 'quizIds', 'practiceIds'];

const argv = process.argv.slice(2);
const val = (n) => { const i = argv.indexOf(n); return i < 0 ? null : argv[i + 1]; };
const MANIFEST = val('--manifest') || 'audit/runs/packet-2.9/pins.json';
const STAGE = argv.includes('--stage');
const ONLY = val('--section');
const JSON_OUT = val('--json');

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));

/** Every table's draft for one section, keyed like the bundle. Non-null means something is staged. */
async function drafts(sectionId) {
  const out = {};
  for (const [table, key] of Object.entries(TABLE_TO_KEY)) {
    const { data, error } = await supabase.from(table).select('draft').eq('section_id', sectionId).maybeSingle();
    if (error) throw new Error(`${table} ${sectionId}: ${error.message}`);
    if (data?.draft != null) out[key] = true;
  }
  return out;
}

const withoutPins = (content) => content.map((b) => {
  const { quizIndices, practiceIndices, ...rest } = b;
  return rest;
});

/** Apply the manifest's pins to the live content. Nothing else is touched. */
function applyPins(content, chapters) {
  const next = content.map((b) => ({ ...b }));
  for (const ch of chapters) {
    const b = next[ch.block];
    // A chapter the reader found nothing to ask about gets an EXPLICIT empty pin, which the placement
    // and the signed-out payload honour (decidedNoQuestion, lib/checkin-fallback.js). Left absent, the
    // V026 fallback would fill it on one shared title word — on global-markets-expansion with a
    // question no chapter of the section teaches. Practice has no fallback, so absent is enough.
    b.quizIndices = ch.quiz ? [ch.quiz.index] : [];
    if (ch.practice) b.practiceIndices = [ch.practice.index];
  }
  return next;
}

/** What each check-in shows, by block index, for one entitlement. */
function shown(content, quiz, practice, diagrams) {
  const flatSteps = buildSteps(content) || [];
  const { quizMap, practiceMap, diagramMap } = placeChapterItems({
    flatSteps, contentData: content, diagramsData: diagrams, quizData: quiz, practiceData: practice,
  });
  const byBlock = {};
  flatSteps.forEach((s, i) => {
    if (s.type !== 'checkin') return;
    byBlock[s.blockIndex] = {
      quiz: quizMap[i]?.id ?? null,
      quizQuestion: quizMap[i]?.question ?? null,
      practice: practiceMap[i]?.id ?? null,
      diagram: diagramMap[i] ? (diagramMap[i].id || diagramMap[i].title) : null,
    };
  });
  const reserved = Object.values(quizMap).filter(Boolean);
  return { byBlock, pretest: pickPretestQuestions(quiz, reserved).map((q) => q.id) };
}

const report = {};
let failed = 0;
const fail = (sectionId, msg) => { failed += 1; report[sectionId].errors.push(msg); console.log(`  FAIL  ${msg}`); };

for (const [sectionId, entry] of Object.entries(manifest)) {
  if (ONLY && sectionId !== ONLY) continue;
  report[sectionId] = { errors: [], notes: [], chapters: [] };
  console.log(`\n${sectionId}`);

  const [live, staged] = await Promise.all([loadBundle(sectionId), drafts(sectionId)]);
  const content = live.content || [];
  const quiz = live.quiz || [];
  const practice = live.practice || [];
  const diagrams = live.diagrams || [];
  const chapters = entry.chapters;

  // 1. Still unpinned, and every pin still names the item it was chosen for.
  if (content.some((b) => PIN_KEYS.some((k) => b[k]))) fail(sectionId, 'live content already pins something — re-read before pinning');
  if (chapters.length !== content.length) fail(sectionId, `manifest has ${chapters.length} chapters, live has ${content.length}`);
  const seenQ = new Set(); const seenP = new Set();
  for (const ch of chapters) {
    const b = content[ch.block];
    if (!b || b.id !== ch.blockId) fail(sectionId, `block ${ch.block} is ${b?.id}, manifest expects ${ch.blockId}`);
    for (const [kind, bank, seen] of [['quiz', quiz, seenQ], ['practice', practice, seenP]]) {
      const pin = ch[kind];
      if (!pin) continue;
      if (bank[pin.index]?.id !== pin.id) fail(sectionId, `${kind} ${pin.index} is ${bank[pin.index]?.id}, manifest expects ${pin.id}`);
      if (seen.has(pin.index)) fail(sectionId, `${kind} ${pin.index} pinned twice`);
      seen.add(pin.index);
    }
  }

  const next = applyPins(content, chapters);

  // 2. Only the two pin fields changed.
  if (!sameJson(withoutPins(next), withoutPins(content))) fail(sectionId, 'a field other than quizIndices/practiceIndices changed');

  // 3. What each check-in shows, Pro and signed out, against what was chosen.
  const before = shown(content, quiz, practice, diagrams);
  const pro = shown(next, quiz, practice, diagrams);
  const tables = { ...live, content: next };
  const freePayload = sectionPayload(tables, { isPremium: false });
  const free = shown(freePayload.content, freePayload.quiz, freePayload.practice, freePayload.diagrams);

  chapters.forEach((ch) => {
    const want = { quiz: ch.quiz?.id ?? null, practice: ch.practice?.id ?? null };
    const row = { block: ch.block, title: content[ch.block]?.title, want, pro: pro.byBlock[ch.block], free: free.byBlock[ch.block], before: before.byBlock[ch.block] };
    report[sectionId].chapters.push(row);
    for (const [who, got] of [['pro', row.pro], ['free', row.free]]) {
      if (!got) { fail(sectionId, `chapter ${ch.block + 1} has no check-in step (${who})`); continue; }
      if (want.practice !== got.practice) fail(sectionId, `chapter ${ch.block + 1} ${who} practice shows ${got.practice}, chose ${want.practice}`);
      if (want.quiz && want.quiz !== got.quiz) fail(sectionId, `chapter ${ch.block + 1} ${who} quiz shows ${got.quiz}, chose ${want.quiz}`);
      if (!want.quiz && got.quiz) fail(sectionId, `chapter ${ch.block + 1} was decided empty, but ${who} is served "${got.quizQuestion}" (${got.quiz})`);
    }
    // 4. Diagrams do not move.
    if ((row.before?.diagram ?? null) !== (row.pro?.diagram ?? null)) fail(sectionId, `chapter ${ch.block + 1} diagram ${row.before?.diagram} -> ${row.pro?.diagram}`);
  });

  report[sectionId].pretest = { before: before.pretest.length, pro: pro.pretest.length, free: free.pretest.length };
  console.log(`  pre-test length  before ${before.pretest.length} · Pro ${pro.pretest.length} · signed out ${free.pretest.length}`);

  // 5. The content gate, on the whole section as it would be published — and on live as it is, so a
  // finding is charged to the pins only if the pins introduced it. The live section already carries
  // findings newer than the baseline (`practice.opening` landed after it), and those print as "new"
  // whatever this packet does. Compared on rule + where + detail, not on the key: the key fingerprints
  // the block's own fields, so adding a pin re-keys every finding on that block without changing it.
  const verdict = await stageSection(sectionId, 'section_content', next, { dryRun: true });
  const liveVerdict = await stageSection(sectionId, 'section_content', content, { dryRun: true });
  const sig = (f) => `${f.rule}|${f.where}|${f.detail}`;
  const had = new Set((liveVerdict.findings || []).map(sig));
  const introduced = (verdict.findings || []).filter((f) => f.tier !== 'INFO' && !had.has(sig(f)));
  report[sectionId].gate = {
    ok: verdict.ok, newBlocks: verdict.newBlocks?.length ?? 0, newDebt: verdict.newDebt?.length ?? 0,
    liveNewDebt: liveVerdict.newDebt?.length ?? 0, introducedByPins: introduced.map((f) => `${f.tier} ${f.rule} ${f.detail}`),
  };
  if (!verdict.ok) { fail(sectionId, `content gate refuses: ${verdict.newBlocks?.length} new BLOCK`); printFindings(verdict.findings); }
  else console.log(`  gate ok  new BLOCK ${verdict.newBlocks?.length ?? 0} · new DEBT ${verdict.newDebt?.length ?? 0} (live today: ${liveVerdict.newDebt?.length ?? 0}) · introduced by the pins: ${introduced.length}`);
  for (const f of introduced) fail(sectionId, `the pins introduce ${f.tier} ${f.rule}: ${f.detail}`);

  // 6. No practice pin lands in GUIDED mode carrying a mark scheme in its opening. Guided mode prints
  // the first paragraph of `guidance` above the answer box (InlinePractice.jsx), and the validator's
  // `practice.opening` rule names the items whose first paragraph is the whole scheme — 160 of them,
  // still open for the founder. The mode is positional: LearnModeTab's getPracticeMode makes the first
  // check-in with practice `worked`, the last `independent` and every one between `guided`. That rule
  // is restated here (five lines, LearnModeTab.jsx getPracticeMode) because it lives inside the
  // component; if it changes, this check is stale — the finding it guards is what matters.
  const leaky = new Set((verdict.findings || []).filter((f) => f.rule === 'practice.opening').map((f) => String(f.where).split(':guidance')[0]));
  const withPractice = chapters.filter((ch) => ch.practice).map((ch) => ch.block).sort((a, b) => a - b);
  withPractice.forEach((blockIdx, ordinal) => {
    const total = withPractice.length;
    const mode = total <= 1 ? 'independent' : ordinal === 0 ? 'worked' : ordinal === total - 1 ? 'independent' : 'guided';
    const ch = chapters.find((c) => c.block === blockIdx);
    report[sectionId].chapters.find((r) => r.block === blockIdx).practiceMode = mode;
    if (mode === 'guided' && [...leaky].some((w) => w === ch.practice.id || w.startsWith(`${ch.practice.id}:`))) {
      fail(sectionId, `chapter ${blockIdx + 1} puts ${ch.practice.id} in GUIDED mode, and its opening paragraph is the mark scheme (practice.opening)`);
    }
  });

  const held = Object.keys(staged);
  report[sectionId].heldDraft = held;
  if (held.length) console.log(`  HELD   draft of [${held.join(', ')}] already staged — not staging over it`);

  if (STAGE && !report[sectionId].errors.length && !held.length) {
    const res = await stageSection(sectionId, 'section_content', next);
    if (!res.ok) fail(sectionId, 'stage refused on the write pass');
    else { report[sectionId].staged = true; console.log('  STAGED section_content -> draft (read back and matched)'); }
  }
}

const stagedCount = Object.values(report).filter((r) => r.staged).length;
const heldCount = Object.values(report).filter((r) => r.heldDraft?.length).length;
console.log(`\n${Object.keys(report).length} sections · ${failed} failure(s) · ${heldCount} with a held draft · ${stagedCount} staged this run`);
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
process.exit(failed ? 1 : 0);
