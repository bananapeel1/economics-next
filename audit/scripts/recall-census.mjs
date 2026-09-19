#!/usr/bin/env node
/**
 * How many recalls are answerable by scrolling up, per section, in both corpora. Packet 2.7,
 * V029 and V030.
 *
 *   node audit/scripts/recall-census.mjs              both corpora, totals
 *   node audit/scripts/recall-census.mjs --verbose    one line per section
 *   node audit/scripts/recall-census.mjs --section <id>   one section, every instance printed
 *   node audit/scripts/recall-census.mjs --check      exit 1 if any section is WORSE than the baseline
 *
 * WHY IT EXISTS, and it is V030's finding written down. Packet 29's runner printed "0 of 43" as a
 * fact. It was "0 at a 0.85 threshold", and an independent Verify A reading the same steps found 7
 * of 18 fill-ins answerable on the same section — including the step the packet named as its worst
 * and claimed to have fixed. A count with no threshold beside it is not a measurement, and five
 * packet runners were each printing their own. So:
 *
 *   - the measure is ONE function, `recall.recoverable` in lib/content-validator.mjs, which every
 *     runner and `npm run validate` now share. This file composes it; it does not restate it.
 *   - every line printed here carries the gate it was measured at.
 *   - the figure is a FLOOR. The measure is lexical: a give-away that paraphrases rather than
 *     repeats is invisible to it, and so is anything printed on another step.
 *
 * Reads the database. Writes nothing.
 */
import { readFileSync, existsSync } from 'node:fs';
import { supabase } from '../../scripts/_db.mjs';
import { validateSection, RECOVERABLE_AT } from '../../lib/content-validator.mjs';
import { contextFor } from '../../scripts/_content-write.mjs';
import { CONTENT_TABLES, TABLE_TO_KEY } from '../../lib/content-gate.mjs';

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const CHECK = args.includes('--check');
const ONLY = (() => { const i = args.indexOf('--section'); return i >= 0 ? args[i + 1] : null; })();
const BASELINE = 'audit/recall-census-baseline.json';

const RULE = 'recall.recoverable';
/* From the constant the measure uses, never from the prose beside it: a threshold printed out of a
   comment is a threshold that can drift away from the one that fired. */
const GATES = Object.entries(RECOVERABLE_AT).map(([k, v]) => `${k} ${v.toFixed(2)}`).join(' · ');

const { data: sections, error } = await supabase.from('sections').select('id, title').order('sort_order');
if (error) { console.error(`sections: ${error.message}`); process.exit(1); }
const targets = ONLY ? sections.filter((s) => s.id === ONLY) : sections;
if (!targets.length) { console.error(`no section "${ONLY}"`); process.exit(1); }

/* The route's own per-table fallback: `?draft=1` falls back to `data` where a table holds no draft. */
async function bundle(id, corpus) {
  const out = {};
  for (const table of CONTENT_TABLES) {
    const { data, error: e } = await supabase.from(table).select('data, draft').eq('section_id', id).maybeSingle();
    if (e) throw new Error(`${id} ${table}: ${e.message}`);   // never swallowed: a silent [] is how a census lies
    out[TABLE_TO_KEY[table]] = (corpus === 'draft' ? (data?.draft ?? data?.data) : data?.data) ?? null;
  }
  return out;
}

const countRecalls = (content) => (Array.isArray(content) ? content : [])
  .flatMap((b) => (b?.sections || [])).filter((s) => s?.recall && typeof s.recall === 'object').length;

const report = {};
for (const corpus of ['data', 'draft']) {
  const rows = [];
  for (const { id } of targets) {
    const b = await bundle(id, corpus);
    if (!Array.isArray(b.content) || !b.content.length) continue;
    const recalls = countRecalls(b.content);
    if (!recalls) continue;
    const { findings } = validateSection(b, await contextFor(id));
    const hits = findings.filter((f) => f.rule === RULE);
    rows.push({ id, recalls, hit: hits.length, detail: hits });
  }
  const recalls = rows.reduce((a, r) => a + r.recalls, 0);
  const hit = rows.reduce((a, r) => a + r.hit, 0);
  report[corpus] = { sections: rows.length, recalls, hit, rows };

  console.log(`\n=== ${corpus === 'draft' ? 'STAGED (draft)' : 'LIVE (data)'} — ${rows.length} sections ===`);
  console.log(`recalls answerable by scrolling up: ${hit} of ${recalls} (${((100 * hit) / Math.max(1, recalls)).toFixed(0)}%) AT ${GATES}`);
  console.log(`  ${rows.filter((r) => r.hit === r.recalls).length} section(s) at 100%, ${rows.filter((r) => !r.hit).length} clean`);
  if (VERBOSE || ONLY) {
    console.log('\nsection                                    recalls  recoverable');
    for (const r of [...rows].sort((a, b2) => b2.hit / b2.recalls - a.hit / a.recalls)) {
      console.log(`${r.id.padEnd(42)} ${String(r.recalls).padStart(7)} ${String(r.hit).padStart(12)}  ${r.recalls ? `${Math.round((100 * r.hit) / r.recalls)}%` : ''}`);
      if (ONLY) for (const f of r.detail) console.log(`    ${f.where}\n      ${f.detail}`);
    }
  }
}

if (CHECK) {
  if (!existsSync(BASELINE)) { console.error(`\nno ${BASELINE} — write one with --baseline before using --check`); process.exit(1); }
  const before = JSON.parse(readFileSync(BASELINE, 'utf8'));
  const worse = [];
  for (const corpus of ['data', 'draft']) {
    for (const r of report[corpus].rows) {
      /*
       * A SECTION WITH NO BASELINE ENTRY IS HELD TO ZERO, and the first version of this skipped it.
       * Verify A found that 15 of the 43 sections have no `draft` row — including
       * `trade-global-economy`, `external-influences`, `balance-payments-exchange-rates` and
       * `macroeconomic-objectives-policies`, which is to say EVERY section the remaining content
       * packets are going to write. `was !== undefined` meant a section written from scratch
       * entirely out of scroll-up-answerable recalls passed this gate, passed the validator (the
       * rule is INFO) and passed the per-packet runner. The gate existed and guarded the back
       * catalogue only, which is the half that is already known.
       *
       * So the default is 0 and a packet that means to add debt raises the baseline deliberately,
       * with `--baseline --confirm`, which prints what it is adding. That is the same contract
       * validate-content.mjs's baseline has and for the same reason.
       */
      const was = before[corpus]?.[r.id] ?? 0;
      if (r.hit > was) worse.push(`${corpus} ${r.id}: ${was}${before[corpus]?.[r.id] === undefined ? ' (no baseline entry — a new section is held to zero)' : ''} → ${r.hit}`);
    }
  }
  if (worse.length) {
    console.error(`\nFAIL: ${worse.length} section(s) now hand the student more answers than the baseline:\n  ${worse.join('\n  ')}`);
    console.error('\nRewrite the recalls so the answer is not on the step, or raise the baseline with --baseline --confirm and say why.');
    process.exit(1);
  }
  console.log('\nno section is worse than the baseline.');
}

if (args.includes('--baseline')) {
  const out = {};
  for (const corpus of ['data', 'draft']) { out[corpus] = {}; for (const r of report[corpus].rows) out[corpus][r.id] = r.hit; }
  if (!args.includes('--confirm')) { console.log(`\nwould write ${BASELINE}; re-run with --confirm`); }
  else { const { writeFileSync } = await import('node:fs'); writeFileSync(BASELINE, `${JSON.stringify(out, null, 1)}\n`); console.log(`\nwrote ${BASELINE}`); }
}
