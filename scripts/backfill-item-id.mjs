#!/usr/bin/env node
// Backfill practice_question_progress.item_id from the positional question_index.
//
//   node scripts/backfill-item-id.mjs             dry run — reports what maps and what does not
//   node scripts/backfill-item-id.mjs --confirm   writes item_id only; question_index is untouched
//   node scripts/backfill-item-id.mjs --verbose   list every unmappable row
//
// Prerequisites, both checked before anything runs:
//   1. scripts/packet-2-item-id.sql has been run (the item_id column exists)
//   2. scripts/mint-item-ids.mjs --confirm has been run (content items carry ids)
//
// section_id is multiplexed and the prefix decides which content array an index points at:
//   <section>     → section_quiz         (quiz progress)
//   fc-<section>  → section_flashcards   (flashcard progress)
//   wa-<section>  → section_practice     (written answer progress)
//
// Rows that cannot be mapped keep item_id NULL. That is the correct outcome, not a gap to
// paper over: an unmappable row is one whose item cannot be identified, and inventing an id
// would attach a student's review history to a question they never saw. Two known classes:
//
//   * wa- rows store an index into a CLIENT-SIDE marks-filtered subset of section_practice,
//     while every reader indexes the unfiltered array. Unless the student had no filter set,
//     the index does not mean what it appears to mean. All 27 are reported, none are written.
//   * Any row whose question_index now exceeds its array length — content moved in packet 0.
//
// The read pages explicitly. PostgREST returns at most 1,000 rows per request and gives no
// indication that it truncated, so an unpaged read looks like a complete, successful run.
import { supabase } from './_db.mjs';

const args = process.argv.slice(2);
const CONFIRM = args.includes('--confirm');
const VERBOSE = args.includes('--verbose');

const SOURCE = {
  '': { table: 'section_quiz', label: 'quiz' },
  'fc-': { table: 'section_flashcards', label: 'flashcard' },
  'wa-': { table: 'section_practice', label: 'written' },
};

function decode(sectionId) {
  for (const prefix of ['fc-', 'wa-']) {
    if (sectionId.startsWith(prefix)) return { prefix, section: sectionId.slice(prefix.length), ...SOURCE[prefix] };
  }
  return { prefix: '', section: sectionId, ...SOURCE[''] };
}

// ── prerequisite 1: the column ──
const probe = await supabase.from('practice_question_progress').select('item_id').limit(1);
if (probe.error) {
  console.error(`item_id column not found: ${probe.error.message}`);
  console.error('Run scripts/packet-2-item-id.sql in the Supabase SQL editor first.');
  process.exit(1);
}

// PostgREST caps a select at 1,000 rows and says nothing about it. Reading without
// paging silently processed an arbitrary window of the table and reported a clean run.
const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('practice_question_progress')
    .select('id, user_id, section_id, question_index, item_id')
    .order('id')
    .range(from, from + 999);
  if (error) { console.error(`read failed: ${error.message}`); process.exit(1); }
  rows.push(...data);
  if (data.length < 1000) break;
}

// ── prerequisite 2: ids exist on content ──
const cache = new Map();
async function itemsFor(table, section) {
  const key = `${table}:${section}`;
  if (!cache.has(key)) {
    const { data } = await supabase.from(table).select('data').eq('section_id', section).maybeSingle();
    cache.set(key, Array.isArray(data?.data) ? data.data : null);
  }
  return cache.get(key);
}

const mapped = [];
const unmappable = [];
const counts = {};

for (const row of rows) {
  const { prefix, section, table, label } = decode(row.section_id);
  counts[label] = (counts[label] || 0) + 1;

  if (row.item_id) { unmappable.push({ row, why: 'already has an item_id' }); continue; }

  if (prefix === 'wa-') {
    unmappable.push({ row, why: 'written practice: index is into a client-side filtered subset, not the stored array' });
    continue;
  }

  const items = await itemsFor(table, section);
  if (!items) { unmappable.push({ row, why: `no ${table} row for section "${section}"` }); continue; }
  const item = items[row.question_index];
  if (!item) { unmappable.push({ row, why: `index ${row.question_index} is out of range (${items.length} items)` }); continue; }
  if (!item.id) { unmappable.push({ row, why: 'the content item has no id — run scripts/mint-item-ids.mjs --confirm first' }); continue; }

  mapped.push({ row, itemId: item.id });
}

console.log(`practice_question_progress: ${rows.length} rows`);
for (const [label, n] of Object.entries(counts)) console.log(`  ${label.padEnd(12)} ${n}`);
console.log(`\nmappable:   ${mapped.length}`);
console.log(`unmappable: ${unmappable.length}`);

const byReason = {};
for (const u of unmappable) (byReason[u.why] ||= []).push(u);
for (const [why, list] of Object.entries(byReason)) {
  console.log(`  ${String(list.length).padStart(4)}  ${why}`);
  if (VERBOSE) list.slice(0, 10).forEach((u) => console.log(`        ${u.row.section_id} #${u.row.question_index}`));
}

if (!CONFIRM) {
  console.log(`\ndry run. Re-run with --confirm to write ${mapped.length} item_id value(s).`);
  process.exit(0);
}

let written = 0;
for (const { row, itemId } of mapped) {
  const { error: wErr } = await supabase.from('practice_question_progress').update({ item_id: itemId }).eq('id', row.id);
  if (wErr) { console.error(`FAILED row ${row.id}: ${wErr.message}`); process.exit(1); }
  written++;
}

console.log(`\nwrote item_id on ${written} row(s). question_index left untouched — packet 4 owns the constraint switch.`);
console.log(`${unmappable.length} row(s) still have item_id NULL, by design.`);
