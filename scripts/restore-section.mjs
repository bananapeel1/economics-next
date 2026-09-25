#!/usr/bin/env node
// Restore one section's content from a snapshot file. Dry run unless --confirm.
//
//   node scripts/restore-section.mjs audit/snapshots/2026-09-12-pre-packet-2__economics__supply.json
//   node scripts/restore-section.mjs <file> --confirm
//   node scripts/restore-section.mjs <file> --confirm --tables section_quiz,section_practice
//
// Prints a per-table diff summary first and writes nothing without --confirm, because
// the thing being overwritten is live student content.
//
// A table recorded as null in the snapshot means there was no row at snapshot time.
// Restore does NOT delete a row that has appeared since — it reports it and leaves it,
// because deleting live content on a restore is a worse failure than an extra row.
import { supabase } from './_db.mjs';
import { readFileSync } from 'node:fs';
import { CONTENT_TABLES, readSection } from './snapshot-section.mjs';
import { validateLive, printFindings } from './_content-write.mjs';
import { sameJson } from '../lib/content-gate.mjs';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const confirm = args.includes('--confirm');
const only = (() => {
  const i = args.indexOf('--tables');
  return i >= 0 && args[i + 1] ? args[i + 1].split(',').map((t) => t.trim()) : null;
})();

if (!file) {
  console.error('usage: restore-section.mjs <snapshot file> [--confirm] [--tables a,b]');
  process.exit(1);
}

const snap = JSON.parse(readFileSync(file, 'utf8'));
const sectionId = snap.section_id;
if (!sectionId || !snap.tables) {
  console.error(`${file} is not a snapshot written by snapshot-section.mjs`);
  process.exit(1);
}

const tables = (only || CONTENT_TABLES).filter((t) => t in snap.tables);
const live = await readSection(sectionId);

console.log(`${confirm ? 'RESTORING' : 'DRY RUN — would restore'} ${sectionId} from ${file}`);
if (snap.label) console.log(`snapshot label: ${snap.label}`);
console.log('');

let changed = 0;
let skipped = 0;
const plan = [];

for (const table of tables) {
  const want = snap.tables[table];
  const have = live[table];
  const same = JSON.stringify(want) === JSON.stringify(have);

  if (same) {
    console.log(`  ${table.padEnd(24)} unchanged`);
    continue;
  }
  if (want === null) {
    console.log(`  ${table.padEnd(24)} NO ROW at snapshot time, a row exists now — left alone (delete it by hand if that is really what you want)`);
    skipped++;
    continue;
  }

  const sizeOf = (v) => (Array.isArray(v) ? `${v.length} items` : v === null ? 'no row' : `${JSON.stringify(v).length} chars`);
  console.log(`  ${table.padEnd(24)} live ${sizeOf(have)} → snapshot ${sizeOf(want)}`);
  plan.push({ table, want });
  changed++;
}

console.log('');
if (!changed) {
  console.log('nothing to restore: live content already matches the snapshot');
  process.exit(0);
}
if (!confirm) {
  console.log(`${changed} table(s) would be overwritten${skipped ? `, ${skipped} left alone` : ''}. Re-run with --confirm to write.`);
  process.exit(0);
}

// A restore is the undo for a publish, so it is the second sanctioned write of `data` (the first is
// publish-section.mjs). The client guard in _db.mjs is lifted for this loop only, behind --confirm.
// It is not gated on the validator: a snapshot is a state students already had, and refusing to go
// back to it during an incident is worse than the debt it carries. The validator runs afterwards
// and reports, so the debt is seen rather than silently reinstated.
process.env.REVVY_ALLOW_RAW_WRITE = '1';
for (const { table, want } of plan) {
  const { error } = await supabase.from(table).update({ data: want }).eq('section_id', sectionId);
  if (error) {
    console.error(`FAILED ${table}: ${error.message}`);
    process.exit(1);
  }
  console.log(`  restored ${table}`);
}
delete process.env.REVVY_ALLOW_RAW_WRITE;

const after = await readSection(sectionId);
const wrong = plan.filter(({ table, want }) => !sameJson(after[table], want)).map((p) => p.table);
if (wrong.length) {
  console.error(`FAILED: live row still differs from the snapshot on ${wrong.join(', ')}`);
  process.exit(1);
}
console.log(`\n${sectionId}: ${changed} table(s) restored from ${snap.label || file}; read back and matching`);
const { findings } = await validateLive(sectionId);
console.log('validator over the restored section:');
printFindings(findings);
