/**
 * The guard on the model-answer bank. Packet 12.6, E033.
 *
 * WHY THIS FILE EXISTS. `npm run validate` reads the Supabase-staged section bundles and has never
 * read `data/modelAnswersData.js` at all — `grep -c modelAnswers audit/scripts/validate-content.mjs`
 * returns 0. Sixty-six model answers, thirty-two public pages built from them, and nothing in the
 * tree could fail on any of it. Packet 12.6 adds a field shape to that bank (`criteria`, `script`,
 * `stimulus`, `minutes`), and a shape with no guard is a shape that drifts the moment a second
 * author touches it.
 *
 * WHAT IT CHECKS, AND WHAT IT DELIBERATELY DOES NOT.
 * Every rule below fires ONLY on an item that carries `criteria`. That is not leniency, it is the
 * flag: sixty-five answers still carry the old shape and must keep passing, and an item renders the
 * new way if and only if it has been retrofitted. Packet 12.8 retrofits the rest; the day it does,
 * these rules start firing on them with no change here.
 *
 *   R1  criteria[].marks sums to the item's marks
 *   R2  every criteria[].seg resolves to a script[].segments[].id ON THE SAME ITEM
 *   R3  script[].segments[].id is unique within the item
 *   R4  the item's marks is a legal IAL tariff FOR ITS SUBJECT
 *   R5  criteria and script travel together — neither alone
 *   R6  stimulus, when present, resolves to a real file in content/data-response/
 *
 * R4 READS `lib/ial-marking.js`, THROUGH `lib/practice-tariffs.js`. There is no tariff list in this
 * file and there must never be one. IAL Economics has no 10-mark question and IAL Business has no
 * 14-mark one; a second copy of that fact here would be a second thing to keep in step, and the
 * programme has already paid for one of those (`lib/practice-tariffs.js`'s own header).
 *
 * R6 CHECKS THAT THE FILE EXISTS AND NOTHING ELSE. The six files in `content/data-response/` each
 * carry a 10-mark question, which is not a legal IAL Economics tariff. Those are packet 12.9's, they
 * are known, and widening this rule to reach them would fail the gate on six defects this packet did
 * not cause and is not allowed to fix. See audit/specs/packet-12.6.md, "Explicitly out of scope".
 *
 * NOTHING HERE TOUCHES SUPABASE (rule 2). It reads two static ES modules and one directory listing.
 *
 * Exit 0 when clean, 1 when any rule fires. `--json` prints machine-readable findings instead.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { MODEL_ANSWERS } from '../../data/modelAnswersData.js';
import { tariffsFor } from '../../lib/practice-tariffs.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const STIMULUS_DIR = path.join(ROOT, 'content', 'data-response');
const JSON_OUT = process.argv.includes('--json');

/** Basenames of the stimulus files actually on disk, read once. A missing directory is not a crash. */
function stimulusBasenames() {
  try {
    return new Set(
      fs.readdirSync(STIMULUS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.slice(0, -3)),
    );
  } catch {
    return new Set();
  }
}

/**
 * Every finding on one item. An item with no `criteria` and no `script` returns [] without
 * reading anything else — that is the sixty-five-answer path and it must stay free.
 */
export function checkItem(item, { stimuli }) {
  const out = [];
  const id = item.id || '(item with no id)';
  const push = (rule, detail) => out.push({ rule, id, subject: item.subject, detail });

  const hasCriteria = Array.isArray(item.criteria) && item.criteria.length > 0;
  const hasScript = Array.isArray(item.script) && item.script.length > 0;

  // R5 first: it is the only rule that can fire on an item without `criteria`, and it is the reason
  // half a shape cannot slip through by simply not carrying the half the other rules look at.
  if (hasCriteria !== hasScript) {
    push('R5', hasCriteria
      ? 'carries `criteria` but no `script` — a criterion with nowhere to point is not tickable'
      : 'carries `script` but no `criteria` — a segmented script with no marks against it renders as prose');
  }

  if (!hasCriteria) return out;

  // R3 before R2: the seg index is built from the segment ids, so a duplicate id must be reported
  // as a duplicate rather than silently making two criteria resolve to the same place.
  const segIds = [];
  for (const para of item.script || []) {
    for (const seg of para.segments || []) segIds.push(seg.id);
  }
  const seen = new Set();
  const dupes = new Set();
  for (const s of segIds) {
    if (seen.has(s)) dupes.add(s);
    seen.add(s);
  }
  for (const d of [...dupes].sort()) {
    push('R3', `segment id "${d}" appears ${segIds.filter((s) => s === d).length} times in this item's script`);
  }

  // R1 — the criteria are the tariff, broken up. If they are not, the running total the student
  // sees counts against a number the question does not carry.
  const sum = item.criteria.reduce((n, c) => n + (Number(c.marks) || 0), 0);
  if (sum !== Number(item.marks)) {
    push('R1', `criteria marks sum to ${sum}, item is ${item.marks} marks`);
  }

  // R2 — every criterion points somewhere real, on THIS item. Cross-item resolution is not a
  // near miss to be forgiven: it is how a copied block ends up ticking another question's script.
  for (const c of item.criteria) {
    if (!seen.has(c.seg)) {
      push('R2', `criterion ${c.id || '(no id)'} points at seg "${c.seg}", which is not a segment id on this item`);
    }
  }

  // R4 — the tariff itself. Read from lib/ial-marking.js via tariffsFor; never a list here.
  const legal = tariffsFor(item.subject);
  if (!legal.includes(Number(item.marks))) {
    push('R4', `${item.marks} marks is not a legal IAL ${item.subject} tariff (legal: ${legal.join(', ')})`);
  }

  // R6 — the extract is on disk, or the page renders a promise it cannot keep.
  if (item.stimulus != null && !stimuli.has(String(item.stimulus))) {
    push('R6', `stimulus "${item.stimulus}" has no file at content/data-response/${item.stimulus}.md`);
  }

  return out;
}

/** Findings across the whole bank. Exported so a test can call it without spawning a process. */
export function checkBank(items = MODEL_ANSWERS) {
  const stimuli = stimulusBasenames();
  return items.flatMap((item) => checkItem(item, { stimuli }));
}

const findings = checkBank();
const retrofitted = MODEL_ANSWERS.filter((a) => Array.isArray(a.criteria) && a.criteria.length > 0);

if (JSON_OUT) {
  console.log(JSON.stringify({
    items: MODEL_ANSWERS.length,
    retrofitted: retrofitted.length,
    findings,
  }, null, 1));
  process.exit(findings.length ? 1 : 0);
}

console.log(`model answers: ${MODEL_ANSWERS.length} in the bank, ${retrofitted.length} carrying the marked-script shape`);
for (const item of retrofitted) {
  const segs = (item.script || []).reduce((n, p) => n + (p.segments || []).length, 0);
  console.log(`  ${String(item.id).padEnd(44)} ${String(item.marks).padStart(2)} marks  ${String(item.criteria.length).padStart(2)} criteria  ${String(segs).padStart(2)} segments  ${item.stimulus || '(no stimulus)'}`);
}

if (!findings.length) {
  console.log('\n0 findings.');
  process.exit(0);
}

console.log(`\n${findings.length} finding${findings.length === 1 ? '' : 's'}:`);
for (const f of findings) console.log(`  ${f.rule}  ${String(f.id).padEnd(44)} ${f.detail}`);
process.exit(1);
