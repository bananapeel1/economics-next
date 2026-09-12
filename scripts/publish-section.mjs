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
import { supabase } from './_db.mjs';
import { CONTENT_TABLES } from './snapshot-section.mjs';

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
let published = 0;

for (const sectionId of targets) {
  const tables = waiting.get(sectionId);
  if (!tables) { console.log(`${sectionId}: nothing drafted`); continue; }

  console.log(`${CONFIRM ? 'PUBLISHING' : 'DRY RUN —'} ${sectionId}`);
  for (const { table, live, draft } of tables) {
    const changed = JSON.stringify(live) !== JSON.stringify(draft);
    console.log(`  ${table.replace('section_', '').padEnd(18)} live ${size(live)} → draft ${size(draft)}${changed ? '' : '  (identical)'}`);
  }

  if (!CONFIRM) { console.log(''); continue; }

  const stamp = new Date().toISOString();
  for (const { table, draft } of tables) {
    const { error } = await supabase
      .from(table)
      .update({ data: draft, draft: null, published_at: stamp })
      .eq('section_id', sectionId);
    if (error) { console.error(`FAILED ${sectionId} ${table}: ${error.message}`); process.exit(1); }
  }
  published++;
  console.log(`  published ${tables.length} table(s)\n`);
}

if (!CONFIRM) {
  console.log('dry run. Add --confirm to publish.');
  console.log('Snapshot first if this is a large change: node scripts/snapshot-section.mjs --all --label <name>');
} else {
  console.log(`${published} section(s) published`);
}
