#!/usr/bin/env node
// Publish drafted content. Students read `data`; edits land in `draft` until this runs.
//
//   node scripts/publish-section.mjs                    what is waiting, per section
//   node scripts/publish-section.mjs supply             diff supply's draft against live
//   node scripts/publish-section.mjs supply --confirm   publish it
//   node scripts/publish-section.mjs --all --confirm    publish everything waiting
//
// Publishing a section copies every drafted table into `data` and clears the draft, so the
// section changes in one step rather than table by table while students are reading it.
//
// Requires scripts/packet-2-draft-state.sql to have been run.
//
// F115. This used to overwrite live content and only PRINT a suggestion that you snapshot first,
// which is not a safety mechanism — it is a reminder, and the one time it is forgotten is the time
// it was needed. Three things changed:
//
//   1. It snapshots the live payload to audit/snapshots/ automatically, immediately before the
//      write, and prints the restore command. Nothing is overwritten without a copy on disk.
//   2. It shows what actually changed, item by item, rather than a byte count. A byte count cannot
//      tell you whether 3 questions were reworded or 22 were deleted.
//   3. It refuses to publish a draft whose diagram pins do not resolve. F109: 20 of 39 pins point
//      at nothing today and the block silently renders no diagram, which is exactly the class of
//      defect a push should not be able to introduce again.
import { supabase } from './_db.mjs';
import { CONTENT_TABLES, readSection, subjectBySection } from './snapshot-section.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { describeChange } from './_publish-checks.mjs';
import { gateSection, sameJson, TABLE_TO_KEY } from '../lib/content-gate.mjs';
import { contextFor, loadBaseline } from './_content-write.mjs';

const args = process.argv.slice(2);
const CONFIRM = args.includes('--confirm');
const ALL = args.includes('--all');
const only = args.filter((a) => !a.startsWith('--'));

const probe = await supabase.from('section_content').select('draft').limit(1);
if (probe.error) {
  console.error(`draft column not found: ${probe.error.message}`);
  console.error('Run scripts/packet-2-draft-state.sql in the Supabase SQL editor first.');
  process.exit(1);
}

/** Every section with at least one drafted table, and what is drafted. */
async function pending() {
  const found = new Map();
  for (const table of CONTENT_TABLES) {
    const { data, error } = await supabase.from(table).select('section_id, data, draft').not('draft', 'is', null);
    if (error) throw new Error(`${table}: ${error.message}`);
    for (const row of data) {
      if (!found.has(row.section_id)) found.set(row.section_id, []);
      found.get(row.section_id).push({ table, live: row.data, draft: row.draft });
    }
  }
  return found;
}

const waiting = await pending();
const targets = ALL ? [...waiting.keys()] : only;

if (!targets.length) {
  if (!waiting.size) { console.log('nothing drafted: every section is published'); process.exit(0); }
  console.log(`${waiting.size} section(s) have unpublished drafts:\n`);
  for (const [sectionId, tables] of waiting) {
    console.log(`  ${sectionId.padEnd(36)} ${tables.map((t) => t.table.replace('section_', '')).join(', ')}`);
  }
  console.log('\nnode scripts/publish-section.mjs <sectionId>            to diff one');
  console.log('node scripts/publish-section.mjs --all --confirm        to publish them all');
  process.exit(0);
}

const size = (v) => (Array.isArray(v) ? `${v.length} items` : v == null ? 'no row' : `${JSON.stringify(v).length} chars`);

const STAMP = new Date().toISOString().replace(/[:.]/g, '-');
const SNAP_DIR = 'audit/snapshots';
const subjects = await subjectBySection();

/** Copy the live payload to disk before it is overwritten. Returns the path. */
async function snapshotBeforePublish(sectionId) {
  const payload = await readSection(sectionId);
  const subject = subjects.get(sectionId) || 'unknown';
  mkdirSync(SNAP_DIR, { recursive: true });
  const label = `auto-prepublish-${STAMP}`;
  const path = `${SNAP_DIR}/${label}__${subject}__${sectionId}.json`;
  writeFileSync(path, JSON.stringify({ section_id: sectionId, subject, label, tables: payload }, null, 1) + '\n');
  return { path, label };
}

let published = 0;
let blocked = 0;

for (const sectionId of targets) {
  const tables = waiting.get(sectionId);
  if (!tables) { console.log(`${sectionId}: nothing drafted`); continue; }

  console.log(`${CONFIRM ? 'PUBLISHING' : 'DRY RUN —'} ${sectionId}`);
  for (const { table, live, draft } of tables) {
    const lines = describeChange(live, draft);
    console.log(`  ${table.replace('section_', '').padEnd(18)} ${lines[0]}`);
    for (const extra of lines.slice(1)) console.log(`  ${''.padEnd(18)} ${extra}`);
  }

  // Validate the section as it WOULD be after this publish: drafted tables where they exist,
  // live copies of the rest. Packet 3 — the same validator the staging path ran, run again here,
  // because a draft can sit for days while the other seven tables change underneath it.
  const live = await readSection(sectionId);
  const next = {};
  for (const table of CONTENT_TABLES) next[TABLE_TO_KEY[table]] = live[table];
  for (const { table, draft } of tables) next[TABLE_TO_KEY[table]] = draft;
  const ctx = await contextFor(sectionId);
  const baseline = loadBaseline();
  const { newBlocks, newDebt } = gateSection(next, ctx, baseline);
  for (const f of newBlocks) console.log(`  BLOCK       ${f.rule.padEnd(24)} ${f.detail}`);
  if (newDebt.length) console.log(`  debt        ${newDebt.length} new DEBT finding(s) — allowed, ledgered`);
  if (newBlocks.length) {
    console.log(`  ${newBlocks.length} BLOCK finding(s) not in the baseline. Fix them; this publish would put them in front of students.`);
    if (CONFIRM) { console.error(`  BLOCKED ${sectionId}: not published.\n`); blocked++; continue; }
  }

  if (!CONFIRM) { console.log(''); continue; }

  // Snapshot first, always. Not a suggestion — the copy exists before anything is overwritten.
  const snap = await snapshotBeforePublish(sectionId);
  console.log(`  backup      ${snap.path}`);

  const stamp = new Date().toISOString();
  // This is the one sanctioned write of `data`. The client guard in _db.mjs refuses it everywhere
  // else; here the section has just been validated, so the override is set for this loop only.
  process.env.REVVY_ALLOW_RAW_WRITE = '1';
  for (const { table, draft } of tables) {
    const { error } = await supabase
      .from(table)
      .update({ data: draft, draft: null, published_at: stamp })
      .eq('section_id', sectionId);
    if (error) {
      // Tables are written one at a time, so a failure here leaves the section half-published.
      // The snapshot above is the whole recovery path, so it is named again rather than assumed.
      console.error(`FAILED ${sectionId} ${table}: ${error.message}`);
      console.error(`Restore with: node scripts/restore-section.mjs ${snap.path} --confirm`);
      process.exit(1);
    }
  }
  delete process.env.REVVY_ALLOW_RAW_WRITE;

  // Read back and validate the row students now read (F110: "run against the DB row after push").
  // The prediction above was over the drafts in memory; this is over what the database holds.
  const after = await readSection(sectionId);
  const mismatched = tables.filter(({ table, draft }) => !sameJson(after[table], draft)).map((t) => t.table);
  if (mismatched.length) {
    console.error(`FAILED ${sectionId}: live row differs from the published draft on ${mismatched.join(', ')}`);
    console.error(`Restore with: node scripts/restore-section.mjs ${snap.path} --confirm`);
    process.exit(1);
  }
  const liveBundle = {};
  for (const table of CONTENT_TABLES) liveBundle[TABLE_TO_KEY[table]] = after[table];
  const liveVerdict = gateSection(liveBundle, ctx, baseline);
  if (!liveVerdict.ok) {
    console.error(`FAILED ${sectionId}: the live row fails the validator after publish (${liveVerdict.newBlocks.length} BLOCK):`);
    for (const f of liveVerdict.newBlocks) console.error(`  BLOCK       ${f.rule.padEnd(24)} ${f.detail}`);
    console.error(`Restore with: node scripts/restore-section.mjs ${snap.path} --confirm`);
    process.exit(1);
  }
  published++;
  console.log(`  verified    live row matches the draft and passes the validator (${liveVerdict.summary.block} baselined BLOCK, ${liveVerdict.summary.debt} DEBT)`);
  console.log(`  published ${tables.length} table(s) · undo: node scripts/restore-section.mjs ${snap.path} --confirm\n`);
}

if (!CONFIRM) {
  console.log('dry run. Add --confirm to publish.');
  console.log('A backup is written automatically on publish; you do not need to snapshot by hand.');
} else {
  console.log(`${published} section(s) published${blocked ? `, ${blocked} BLOCKED by the validator` : ''}`);
  if (blocked) process.exit(1);
}
