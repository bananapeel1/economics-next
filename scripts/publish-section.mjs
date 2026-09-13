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
import { describeChange, unresolvedPins } from './_publish-checks.mjs';

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
  const subject = subjects[sectionId] || 'unknown';
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

  // The pins are checked against what WOULD be live after this publish: the drafted content and
  // the drafted diagrams where they exist, falling back to whatever is live for the other.
  const byTable = Object.fromEntries(tables.map((t) => [t.table, t]));
  const nextContent = byTable.section_content ? byTable.section_content.draft : (await readSection(sectionId)).section_content;
  const nextDiagrams = byTable.section_diagrams ? byTable.section_diagrams.draft : (await readSection(sectionId)).section_diagrams;
  const bad = unresolvedPins(nextContent, nextDiagrams);
  if (bad.length) {
    console.log(`  PINS        ${bad.length} diagram pin(s) resolve to nothing: ${bad.map((b) => JSON.stringify(b)).join(', ')}`);
    console.log('              Those blocks would render no diagram. Fix the pin or author the diagram.');
    if (CONFIRM) {
      console.error(`  BLOCKED ${sectionId}: not published.\n`);
      blocked++;
      continue;
    }
  }

  if (!CONFIRM) { console.log(''); continue; }

  // Snapshot first, always. Not a suggestion — the copy exists before anything is overwritten.
  const snap = await snapshotBeforePublish(sectionId);
  console.log(`  backup      ${snap.path}`);

  const stamp = new Date().toISOString();
  for (const { table, draft } of tables) {
    const { error } = await supabase
      .from(table)
      .update({ data: draft, draft: null, published_at: stamp })
      .eq('section_id', sectionId);
    if (error) {
      // Tables are written one at a time, so a failure here leaves the section half-published.
      // The snapshot above is the whole recovery path, so it is named again rather than assumed.
      console.error(`FAILED ${sectionId} ${table}: ${error.message}`);
      console.error(`Restore with: node scripts/restore-section.mjs ${sectionId} --label ${snap.label}`);
      process.exit(1);
    }
  }
  published++;
  console.log(`  published ${tables.length} table(s) · undo: node scripts/restore-section.mjs ${sectionId} --label ${snap.label}\n`);
}

if (!CONFIRM) {
  console.log('dry run. Add --confirm to publish.');
  console.log('A backup is written automatically on publish; you do not need to snapshot by hand.');
} else {
  console.log(`${published} section(s) published${blocked ? `, ${blocked} BLOCKED on unresolved diagram pins` : ''}`);
  if (blocked) process.exit(1);
}
