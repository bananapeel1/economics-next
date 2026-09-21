#!/usr/bin/env node
/**
 * Does every packet's staged DRAFT still match the bundle that packet dumped?
 *
 *   node audit/scripts/check-staged-drafts.mjs              check every packet-*-bundle__*.json
 *   node audit/scripts/check-staged-drafts.mjs <section>    one section
 *   node audit/scripts/check-staged-drafts.mjs --verbose    name every differing field, not just the table
 *
 * WHY THIS EXISTS. The runner is the only writer to `draft`; `--dump` writes the snapshot. So a fix
 * applied to a packet's module and re-dumped leaves source, snapshot and validator all agreeing with
 * each other while the database still holds the defect — and nothing in the gate reaches it, because
 * `validate` and `npm test` read files and Verify A reads the diff. Measured on packet 20, 16 Sep:
 * `77eb765` set `kind: 'table'` on its types diagram in source and in the dump, and the staged draft
 * still returned the six-item checklist the commit had removed. PROTOCOL gate step 5 stops that for
 * packets from here on; this answers the sections that were built BEFORE it.
 *
 * HOW IT COMPARES, and this is the whole difficulty. The draft is read through `?draft=1` on the dev
 * server — the same path a walkthrough uses, so a fault in the route's own payload assembly shows up
 * rather than being bypassed — and that route runs `sectionPayload()` on what it reads. For an
 * anonymous request that transform is NOT the identity, so a byte comparison reports drift on every
 * section. Measured against `lib/preview-limits.js:127-170` rather than assumed:
 *
 *   notes · diagrams · practice   untouched (FREE_SURFACES)      → compared in full
 *   content                       only `quizIndices` is rewritten → compared in full, minus that field
 *   quiz                          a chosen subset                → served items compared BY ID
 *   flashcards                    first PREVIEW_LIMITS.flashcards → served items compared BY ID
 *   extras.chains / .evaluation   first 1 of each                 → served items compared BY ID
 *   mistakes                      empty for anonymous             → LENGTH ONLY, via `counts`
 *
 * `counts` on the payload carries the TRUE length of every capped table, so an item added to or
 * removed from the database still shows up even where the array itself is withheld.
 *
 * WHAT IT CANNOT SEE, stated so nobody reads a pass as more than it is: an edit to a quiz item,
 * flashcard, chain or mistake that the anonymous slice does not serve. Those need an entitled fetch.
 * A clean result here means every field a signed-out student can reach is the field the packet dumped.
 *
 * Comparison is `sameJson` from lib/content-gate.mjs, never JSON.stringify: Postgres jsonb does not
 * preserve key order and a byte comparison reported 8 of 8 tables mismatched on packet 18 when all
 * eight were deep-equal.
 *
 * TWO CAUSES, AND THEY ARE NOT THE SAME PROBLEM. `?draft=1` falls back to `data` PER TABLE when a
 * table has no draft (route.js:71), and the response does not say which it used. So a section whose
 * draft was reverted reads as "drift" against its bundle when in fact it holds no draft at all —
 * which is the state packets 14 and 15 were left in. The check therefore also compares the payload
 * against that section's own `*pre-packet-*` snapshot and reports NO DRAFT separately. A NO DRAFT
 * section loses nothing, because its publish line re-stages first; a DRIFT section would publish
 * something nobody authored.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { sameJson } from '../../lib/content-gate.mjs';

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const only = args.find((a) => !a.startsWith('--'));
const BASE = process.env.DRAFT_BASE || 'http://localhost:3001';

const SNAP_DIR = 'audit/snapshots';
const snapshots = readdirSync(SNAP_DIR)
  .filter((f) => /^packet-[\d.]+-bundle__.+\.json$/.test(f))
  .map((f) => ({ file: `${SNAP_DIR}/${f}`, ...JSON.parse(readFileSync(`${SNAP_DIR}/${f}`, 'utf8')) }))
  .filter((s) => !only || s.section_id === only)
  .sort((a, b) => a.section_id.localeCompare(b.section_id));

if (!snapshots.length) { console.log(only ? `no bundle snapshot for "${only}"` : 'no bundle snapshots found'); process.exit(1); }

const stripPins = (content) => (content || []).map(({ quizIndices, ...rest }) => rest);
/** That section's pre-packet snapshots, in either of the two shapes the snapshot scripts have used. */
const prePacketTables = (sectionId) => readdirSync(SNAP_DIR)
  .filter((f) => f.includes('pre-packet') && f.endsWith(`__${sectionId}.json`))
  .map((f) => { const raw = JSON.parse(readFileSync(`${SNAP_DIR}/${f}`, 'utf8')); const t = raw.tables || raw; return { f, get: (n) => t[n] || t[`section_${n}`] || (n === 'mistakes' ? t.section_common_mistakes : null) || [] }; });
const byId = (list) => new Map((list || []).map((x) => [x?.id, x]));

let sectionsWithDrift = 0;
const report = [];

for (const snap of snapshots) {
  const id = snap.section_id;
  const t = snap.tables;
  let res;
  try {
    res = await fetch(`${BASE}/api/sections/${id}?draft=1`, { cache: 'no-store' });
  } catch (e) {
    report.push(`${id.padEnd(30)} UNREACHABLE  ${e.message} — is the dev server up on ${BASE}?`);
    continue;
  }
  if (!res.ok) { report.push(`${id.padEnd(30)} HTTP ${res.status}`); continue; }
  const live = await res.json();
  if (live.isPremium) { report.push(`${id.padEnd(30)} SKIPPED — the fetch was entitled, so the slice-aware comparison does not apply`); continue; }

  const drift = [];

  // 1 · the three tables the transform passes through untouched
  for (const table of ['notes', 'diagrams', 'practice']) {
    if (!sameJson(t[table] || [], live[table] || [])) {
      const a = t[table] || [], b = live[table] || [];
      const detail = a.length !== b.length ? `${a.length} in the bundle, ${b.length} live`
        : a.map((x, i) => (sameJson(x, b[i]) ? null : (x?.id || x?.title || `[${i}]`))).filter(Boolean).join(', ');
      drift.push(`${table}: ${detail}`);
    }
  }

  // 2 · content, which the transform touches only at quizIndices
  if (!sameJson(stripPins(t.content), stripPins(live.content))) {
    const a = stripPins(t.content), b = stripPins(live.content);
    const detail = a.length !== b.length ? `${a.length} blocks in the bundle, ${b.length} live`
      : a.map((blk, i) => {
        if (sameJson(blk, b[i])) return null;
        const secs = (blk.sections || []).map((s, j) => (sameJson(s, (b[i].sections || [])[j]) ? null : (s?.title || s?.id))).filter(Boolean);
        return secs.length ? `${blk.title} → ${secs.join('; ')}` : blk.title;
      }).filter(Boolean).join(' | ');
    drift.push(`content: ${detail}`);
  }

  // 3 · the capped tables — true lengths from `counts`, then the served items by id
  const counts = live.counts || {};
  const lengths = [
    ['quiz', (t.quiz || []).length, counts.quiz],
    ['flashcards', (t.flashcards || []).length, counts.flashcards],
    ['mistakes', (t.mistakes || []).length, counts.mistakes],
    ['extras.chains', (t.extras?.chains || []).length, counts.extrasChains],
    ['extras.evaluation', (t.extras?.evaluation || []).length, counts.extrasEvaluation],
  ];
  for (const [name, mine, theirs] of lengths) {
    if (theirs != null && mine !== theirs) drift.push(`${name}: ${mine} in the bundle, ${theirs} live`);
  }
  for (const [name, mineList, servedList] of [
    ['quiz', t.quiz, live.quiz], ['flashcards', t.flashcards, live.flashcards],
    ['extras.chains', t.extras?.chains, live.extras?.chains], ['extras.evaluation', t.extras?.evaluation, live.extras?.evaluation],
  ]) {
    const mine = byId(mineList);
    for (const served of servedList || []) {
      if (served?.id == null) continue;                       // chains carry no id; length already compared
      if (!mine.has(served.id)) { drift.push(`${name}: live serves "${served.id}", which the bundle does not contain`); continue; }
      if (!sameJson(mine.get(served.id), served)) drift.push(`${name}: "${served.id}" differs`);
    }
  }

  if (drift.length) {
    // Is this a reverted section serving live content, rather than a wrong draft?
    const noDraft = prePacketTables(id).find((snap) =>
      ['notes', 'diagrams', 'practice'].every((n) => sameJson(snap.get(n), live[n] || []))
      && sameJson(stripPins(snap.get('content')), stripPins(live.content)));
    if (noDraft) {
      report.push(`${id.padEnd(30)} NO DRAFT — serving live pre-packet content, identical to ${noDraft.f}`);
      report.push('    Its draft went with a revert. Nothing is lost: the publish line re-stages first.');
    } else {
      sectionsWithDrift += 1;
      report.push(`${id.padEnd(30)} DRIFT (${drift.length})`);
      for (const d of drift) report.push(`    ${VERBOSE ? d : d.slice(0, 150)}`);
    }
  } else {
    report.push(`${id.padEnd(30)} matches`);
  }
}

console.log(`staged draft vs dumped bundle — ${snapshots.length} section(s), read through ${BASE}/api/sections/<id>?draft=1\n`);
for (const line of report) console.log(line);
console.log(`\n${sectionsWithDrift} section(s) with drift. A NO DRAFT line is not drift — that section holds no`);
console.log('draft at all and its publish line stages before it publishes.');
console.log('Covers every field a signed-out student can reach. An edit to a quiz item, card, chain or');
console.log('mistake the anonymous slice does not serve needs an entitled fetch and is NOT covered here.');
process.exit(sectionsWithDrift ? 1 : 0);
