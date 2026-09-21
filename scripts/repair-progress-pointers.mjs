#!/usr/bin/env node
// Pull out-of-range Learn Mode resume pointers back to the last step that exists. Dry run unless --confirm.
//
//   node scripts/repair-progress-pointers.mjs                     # dry run, packet-5 step model
//   node scripts/repair-progress-pointers.mjs --model pair        # dry run against what main serves today
//   node scripts/repair-progress-pointers.mjs --model pair --confirm
//
// WHY. `user_content_progress.furthest_step` is a high-water mark. Until packet 5.1 nothing clamped
// it on write and nothing clamped it on read, so a pointer written against a longer step list — a
// section rewritten smaller (packets 13, 14), or the packet-5 model counting the same blocks
// differently from main's pairing model — outlived its content. The student then resumed past the
// end: an empty step body, a progress bar over 100%, and a "Next" that never becomes "Complete
// topic" (`isLastStep` can only be true AT the last index, never past it), every click pushing the
// pointer further out and persisting it. On 15 Sep 2026 that was 24 rows / 17 students out of range
// and 120 rows / 43 students already past their own stored total_steps.
//
// WHICH MODEL. A pointer is only "out of range" relative to the build that reads it, so the model is
// explicit and the script never guesses:
//
//   --model steps  (default)  lib/learn-steps.js countSteps(): one step per subsection plus a
//                             check-in per chapter. Correct once packet 5 is merged.
//   --model pair              the pre-packet-5 model still live on main: subsections paired two to
//                             a step, no check-in step. Correct until that merge.
//
// The pairing model is reproduced here, not imported, because it does not exist in this branch; it
// can be deleted with this flag once packet 5 has shipped and main no longer serves it.
//
// This only ever LOWERS a pointer, and only for rows that are genuinely out of range. A row whose
// furthest_step still exists is left exactly as it is, so re-running is safe and idempotent.
//
// SNAPSHOT FIRST, the same rule content writes follow. These are real students' rows and the old values
// are not recoverable from anywhere else, so --confirm writes every affected row to
// audit/snapshots/progress-repair-<stamp>.json before it changes one, and refuses to write if it cannot.
// Restore is `--restore <file>`, which puts the recorded furthest_step and total_steps back.
import { supabase } from './_db.mjs';
import { countSteps } from '../lib/learn-steps.js';
import { writeFileSync, readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const confirm = args.includes('--confirm');
const restoreFile = (() => { const i = args.indexOf('--restore'); return i >= 0 ? args[i + 1] : null; })();
if (restoreFile) {
  const snap = JSON.parse(readFileSync(restoreFile, 'utf8'));
  if (!Array.isArray(snap.rows)) {
    console.error(`${restoreFile} is not a snapshot written by this script`);
    process.exit(1);
  }
  console.log(`${confirm ? 'RESTORING' : 'DRY RUN — would restore'} ${snap.rows.length} rows from ${restoreFile} (taken ${snap.taken})`);
  for (const r of snap.rows) {
    console.log(`  ${r.section_id.padEnd(32)} ${r.user_id.slice(0, 8)}  back to furthest_step=${r.furthest_step} total_steps=${r.total_steps}`);
  }
  if (!confirm) { console.log('\nNothing written. Re-run with --confirm to apply.'); process.exit(0); }
  let back = 0;
  for (const r of snap.rows) {
    const { error } = await supabase
      .from('user_content_progress')
      .update({ furthest_step: r.furthest_step, total_steps: r.total_steps })
      .eq('id', r.id);
    if (error) console.error(`FAILED ${r.id}: ${error.message}`); else back += 1;
  }
  console.log(`\nrestored ${back} of ${snap.rows.length} rows`);
  process.exit(back === snap.rows.length ? 0 : 1);
}

const model = (() => {
  const i = args.indexOf('--model');
  const v = i >= 0 ? args[i + 1] : 'steps';
  if (v !== 'steps' && v !== 'pair') {
    console.error(`unknown --model ${v}; expected "steps" or "pair"`);
    process.exit(1);
  }
  return v;
})();

/** main's model: subsections paired two to a step, a legacy block is one step, no check-in step. */
function pairCount(content) {
  if (!Array.isArray(content) || !content.length) return 0;
  return content.reduce(
    (n, block) => n + (Array.isArray(block?.sections) ? Math.ceil(block.sections.length / 2) : 1),
    0,
  );
}

const stepsFor = model === 'pair' ? pairCount : countSteps;

const { data: content, error: contentErr } = await supabase
  .from('section_content')
  .select('section_id, data');
if (contentErr) {
  console.error('could not read section_content:', contentErr.message);
  process.exit(1);
}
const total = new Map(content.map((r) => [r.section_id, stepsFor(r.data)]));

// PostgREST caps a select at 1000 rows; the table is past that, so page it.
const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('user_content_progress')
    .select('id, user_id, section_id, furthest_step, total_steps, updated_at')
    .order('id')
    .range(from, from + 999);
  if (error) {
    console.error('could not read user_content_progress:', error.message);
    process.exit(1);
  }
  rows.push(...data);
  if (data.length < 1000) break;
}

const broken = [];
let noContent = 0;
for (const r of rows) {
  const steps = total.get(r.section_id);
  if (!steps) { noContent += 1; continue; } // no content row, or empty: nothing to clamp against
  const last = steps - 1;
  if (r.furthest_step <= last) continue;
  broken.push({ ...r, steps, last });
}

console.log(`${confirm ? 'REPAIRING' : 'DRY RUN — would repair'}  model=${model}`);
console.log(`${rows.length} progress rows, ${new Set(rows.map((r) => r.user_id)).size} students`);
if (noContent) console.log(`${noContent} rows skipped: their section has no content to count`);
console.log('');

if (!broken.length) {
  console.log('No pointer is past the end of its section. Nothing to do.');
  process.exit(0);
}

console.log('section                          student   resumes at   ->  last step   saved');
for (const b of broken.sort((a, z) => z.furthest_step - a.furthest_step)) {
  console.log(
    `${b.section_id.padEnd(32)} ${b.user_id.slice(0, 8)}  step ${String(b.furthest_step + 1).padStart(3)} of ${String(b.steps).padStart(2)}` +
    `  ->  step ${String(b.last + 1).padStart(3)}   ${String(b.updated_at).slice(0, 10)}`,
  );
}
console.log('');
console.log(`${broken.length} rows, ${new Set(broken.map((b) => b.user_id)).size} students`);

if (!confirm) {
  console.log('\nNothing written. Re-run with --confirm to apply.');
  process.exit(0);
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const snapPath = `audit/snapshots/progress-repair-${stamp}.json`;
try {
  writeFileSync(snapPath, JSON.stringify({
    taken: new Date().toISOString(),
    model,
    rows: broken.map(({ id, user_id, section_id, furthest_step, total_steps }) =>
      ({ id, user_id, section_id, furthest_step, total_steps })),
  }, null, 1));
  console.log(`\nsnapshot: ${snapPath}  (restore with --restore ${snapPath} --confirm)`);
} catch (e) {
  console.error(`could not write the snapshot (${e.message}); refusing to change rows that could not be restored`);
  process.exit(1);
}

let written = 0;
for (const b of broken) {
  const { error } = await supabase
    .from('user_content_progress')
    .update({ furthest_step: b.last, total_steps: b.steps, updated_at: new Date().toISOString() })
    .eq('id', b.id);
  if (error) {
    console.error(`FAILED ${b.section_id} ${b.user_id.slice(0, 8)}: ${error.message}`);
    continue;
  }
  written += 1;
}
console.log(`\nwrote ${written} of ${broken.length} rows`);
if (written !== broken.length) process.exit(1);
