#!/usr/bin/env node
/**
 * Packet 2.91 (V056) — decide every chapter's check-in diagram on the live sections packet 2.9 pinned.
 *
 *   node scripts/packet-2.91-diagram-pins.mjs                  check every section in the manifest; writes nothing
 *   node scripts/packet-2.91-diagram-pins.mjs --section <id>   one section
 *   node scripts/packet-2.91-diagram-pins.mjs --stage          check, then stage section_content to `draft`
 *   node scripts/packet-2.91-diagram-pins.mjs --json <file>    write the per-chapter report
 *
 * WHY. Packet 2.9 pinned a question and a worked example per chapter on 21 sections and left their
 * diagrams exactly where `matchDiagramsToBlocks` put them, on shared title words. On those sections
 * that put "Crowding Out in the Loanable Funds Market" under the chapter on public goods (the word
 * `market`), showed the labour-market EQUILIBRIUM diagram a chapter before equilibrium is taught, and
 * left "Monopsony Labour Market" unshown while the chapter teaching monopsony showed nothing. The
 * choice of which diagram a chapter shows is a judgement, made by reading the chapter and checked by
 * a blind second reader (audit/runs/packet-2.91/diagram-pins.json says how). This script applies it
 * and proves the application did only that.
 *
 * WHAT IT PROVES, per section, before anything is staged:
 *   1. The section is as it was read: every block the manifest names is at its index, every diagram
 *      it names exists in the LIVE diagrams table, no block pins a diagram yet, and no table holds a
 *      draft (a draft would be somebody else's staged work, and staging over it would destroy it).
 *   2. Only `diagramId` changed. Every other field of every block, and every other table, is
 *      byte-identical to live.
 *   3. What each check-in SHOWS is what was decided — through `placeChapterItems`, the function the
 *      client calls, for a Pro reader AND a signed-out one (`sectionPayload`) — and every shown
 *      diagram was placed by a PIN, not by a title match. A chapter decided `diagramId: null` shows
 *      nothing to either reader.
 *   4. The questions and worked examples do not move: 2.9's placement, Pro and signed out, is
 *      unchanged chapter by chapter.
 *   5. The content gate passes on the section as it would be published, and the pins introduce no
 *      finding the live section does not already carry.
 *   6. What `main` shows until this branch merges, reported and not failed: `main` resolves a
 *      `diagramId` pin (so every pinned chapter is right the moment this is published) but does not
 *      know `diagramId: null`, so a decided-empty chapter still gets `main`'s title fallback there.
 *      Measured by placing with the nulls removed, which is what `main`'s code does with them.
 *
 * WHY IDS, when 2.9 pinned questions by index. A diagram has no index pin — `diagramRef` is a title
 * substring and `diagramId` the id — and 167 staged blocks already pin by `diagramId`, which
 * `pin-check.mjs`, `diagram-pins.mjs` and the validator's `pins.diagram` all read.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { supabase } from './_db.mjs';
import { loadBundle, stageSection, printFindings } from './_content-write.mjs';
import { sameJson, TABLE_TO_KEY } from '../lib/content-gate.mjs';
import { buildSteps } from '../lib/learn-steps.js';
import { placeChapterItems } from '../lib/checkin-placement.js';
import { sectionPayload } from '../lib/preview-limits.js';

const argv = process.argv.slice(2);
const val = (n) => { const i = argv.indexOf(n); return i < 0 ? null : argv[i + 1]; };
const MANIFEST = val('--manifest') || 'audit/runs/packet-2.91/diagram-pins.json';
const STAGE = argv.includes('--stage');
const ONLY = val('--section');
const JSON_OUT = val('--json');

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));

/** Every table's draft for one section. Non-empty means something is staged. */
async function drafts(sectionId) {
  const out = [];
  for (const [table, key] of Object.entries(TABLE_TO_KEY)) {
    const { data, error } = await supabase.from(table).select('draft').eq('section_id', sectionId).maybeSingle();
    if (error) throw new Error(`${table} ${sectionId}: ${error.message}`);
    if (data?.draft != null) out.push(key);
  }
  return out;
}

const withoutDiagramId = (content) => content.map((b) => { const { diagramId, ...rest } = b; return rest; });

function applyDecisions(content, chapters) {
  const next = content.map((b) => ({ ...b }));
  for (const ch of chapters) next[ch.block].diagramId = ch.diagram; // an id, or null: decided none
  return next;
}

/** What each check-in shows, by block index. */
function shown(content, tables) {
  const flatSteps = buildSteps(content) || [];
  const { diagramMap, diagramHow, quizMap, practiceMap } = placeChapterItems({
    flatSteps, contentData: content, diagramsData: tables.diagrams || [], quizData: tables.quiz || [], practiceData: tables.practice || [],
  });
  const byBlock = {};
  flatSteps.forEach((s, i) => {
    if (s.type !== 'checkin') return;
    byBlock[s.blockIndex] = {
      diagram: diagramMap[i]?.id ?? null, diagramTitle: diagramMap[i]?.title ?? null, how: diagramHow[i] ?? null,
      quiz: quizMap[i]?.id ?? null, practice: practiceMap[i]?.id ?? null,
    };
  });
  return byBlock;
}

const report = {};
let failed = 0;
const fail = (sectionId, msg) => { failed += 1; report[sectionId].errors.push(msg); console.log(`  FAIL  ${msg}`); };

for (const [sectionId, chapters] of Object.entries(manifest)) {
  if (sectionId.startsWith('_') || (ONLY && sectionId !== ONLY)) continue;
  report[sectionId] = { errors: [], chapters: [] };
  console.log(`\n${sectionId}`);

  const [live, held] = await Promise.all([loadBundle(sectionId), drafts(sectionId)]);
  const content = live.content || [];
  const diagrams = live.diagrams || [];

  // 1. As it was read.
  if (held.length) fail(sectionId, `a draft of [${held.join(', ')}] is already staged — somebody else's work; not overwriting it`);
  if (content.some((b) => b.diagramId !== undefined || b.diagramRef)) fail(sectionId, 'live content already pins a diagram — re-read before deciding');
  if (chapters.length !== content.length) fail(sectionId, `manifest has ${chapters.length} chapters, live has ${content.length}`);
  for (const ch of chapters) {
    if (content[ch.block]?.id !== ch.blockId) fail(sectionId, `block ${ch.block} is ${content[ch.block]?.id}, manifest expects ${ch.blockId}`);
    if (ch.diagram && !diagrams.some((d) => d.id === ch.diagram)) fail(sectionId, `chapter ${ch.block + 1}: no live diagram has id ${ch.diagram}`);
  }
  const ids = chapters.map((c) => c.diagram).filter(Boolean);
  if (new Set(ids).size !== ids.length) fail(sectionId, 'one diagram is pinned to two chapters');

  const next = applyDecisions(content, chapters);

  // 2. Only diagramId changed.
  if (!sameJson(withoutDiagramId(next), content)) fail(sectionId, 'a field other than diagramId changed');

  // 3 and 4. What each check-in shows, Pro and signed out.
  const before = shown(content, live);
  const pro = shown(next, live);
  const freePayload = sectionPayload({ ...live, content: next }, { isPremium: false });
  const free = shown(freePayload.content, freePayload);
  const freeBefore = (() => { const p = sectionPayload(live, { isPremium: false }); return shown(p.content, p); })();

  // 6. What `main` shows until the merge: the same resolution with the nulls removed.
  const mainView = shown(next.map((b) => { if (b.diagramId !== null) return b; const { diagramId, ...rest } = b; return rest; }), live);

  for (const ch of chapters) {
    const row = {
      block: ch.block, title: content[ch.block]?.title, decided: ch.diagram,
      before: before[ch.block], pro: pro[ch.block], free: free[ch.block], mainUntilMerge: mainView[ch.block],
    };
    report[sectionId].chapters.push(row);
    for (const [who, got] of [['pro', row.pro], ['free', row.free]]) {
      if (!got) { fail(sectionId, `chapter ${ch.block + 1} has no check-in step (${who})`); continue; }
      if (got.diagram !== ch.diagram) fail(sectionId, `chapter ${ch.block + 1} ${who} shows ${got.diagram}, decided ${ch.diagram}`);
      if (got.diagram && got.how !== 'pin') fail(sectionId, `chapter ${ch.block + 1} ${who} diagram placed by ${got.how}, not by the pin`);
    }
    // 4. Questions and worked examples stay where 2.9 put them.
    if (row.pro?.quiz !== row.before?.quiz || row.pro?.practice !== row.before?.practice) {
      fail(sectionId, `chapter ${ch.block + 1} Pro question/practice moved: ${row.before?.quiz}/${row.before?.practice} -> ${row.pro?.quiz}/${row.pro?.practice}`);
    }
    if (free[ch.block]?.quiz !== freeBefore[ch.block]?.quiz || free[ch.block]?.practice !== freeBefore[ch.block]?.practice) {
      fail(sectionId, `chapter ${ch.block + 1} signed-out question/practice moved`);
    }
    const moved = (row.before?.diagram ?? null) !== (ch.diagram ?? null);
    const onMain = row.mainUntilMerge?.diagram ?? null;
    console.log(`  ch${ch.block + 1} ${String(row.title).slice(0, 38).padEnd(38)} ${moved ? 'CHANGES' : 'same   '} `
      + `${String(row.before?.diagramTitle ?? '—').slice(0, 34).padEnd(34)} -> ${String(row.pro?.diagramTitle ?? '— (decided none)').slice(0, 38)}`
      + `${onMain !== (ch.diagram ?? null) ? `   [on main until the merge: ${row.mainUntilMerge?.diagramTitle}]` : ''}`);
  }

  // 5. The content gate on the section as it would be published, charged only for what the pins add.
  const verdict = await stageSection(sectionId, 'section_content', next, { dryRun: true });
  const liveVerdict = await stageSection(sectionId, 'section_content', content, { dryRun: true });
  const sig = (f) => `${f.rule}|${f.where}|${f.detail}`;
  const had = new Set((liveVerdict.findings || []).map(sig));
  const introduced = (verdict.findings || []).filter((f) => f.tier !== 'INFO' && !had.has(sig(f)));
  report[sectionId].gate = { ok: verdict.ok, newBlocks: verdict.newBlocks?.length ?? 0, newDebt: verdict.newDebt?.length ?? 0, introduced: introduced.map((f) => `${f.tier} ${f.rule} ${f.detail}`) };
  if (!verdict.ok) { fail(sectionId, `content gate refuses: ${verdict.newBlocks?.length} new BLOCK`); printFindings(verdict.findings); }
  else console.log(`  gate ok  new BLOCK ${verdict.newBlocks?.length ?? 0} · new DEBT ${verdict.newDebt?.length ?? 0} (live today: ${liveVerdict.newDebt?.length ?? 0}) · introduced by the pins: ${introduced.length}`);
  for (const f of introduced) fail(sectionId, `the pins introduce ${f.tier} ${f.rule}: ${f.detail}`);

  if (STAGE && !report[sectionId].errors.length) {
    const res = await stageSection(sectionId, 'section_content', next);
    if (!res.ok) fail(sectionId, 'stage refused on the write pass');
    else { report[sectionId].staged = true; console.log('  STAGED section_content -> draft (read back and matched)'); }
  }
}

const stagedCount = Object.values(report).filter((r) => r.staged).length;
console.log(`\n${Object.keys(report).length} sections · ${failed} failure(s) · ${stagedCount} staged this run`);
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
process.exit(failed ? 1 : 0);
