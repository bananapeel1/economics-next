#!/usr/bin/env node
// The content gate. Runs lib/content-validator.mjs over every section's LIVE content and compares
// the result with the committed baseline.
//
//   npm run validate                          all 43 sections; exit 1 on any finding not in the baseline
//   node audit/scripts/validate-content.mjs --section supply
//   node audit/scripts/validate-content.mjs --debt          list new DEBT findings too, not just counts
//   node audit/scripts/validate-content.mjs --json          machine-readable
//   node audit/scripts/validate-content.mjs --baseline --confirm   rewrite audit/validator-baseline.json
//
// WHAT "GREEN" MEANS. Live content fails these rules 2,300 times today (917 BLOCK, 1,443 DEBT at the
// first run). A gate that failed on all of that would be switched off by Friday, which is what
// happened to March's. So green means NO REGRESSION: every finding is either in the baseline or
// new. A new BLOCK fails the gate. A new DEBT is printed and counted but does not fail it — DEBT is
// the content packets' work, and the ledger already carries it.
//
// The baseline is a list of finding KEYS, each stable across reordering and cosmetic edits but not
// across a changed item. It only ever shrinks: a section packet that clears its debt reruns
// --baseline --confirm and commits the smaller file. Growing it by hand is the thing this gate
// exists to make visible, so the rewrite prints exactly what it is about to add and refuses without
// --confirm.
//
// Reads the database. Writes nothing to it. Requires .env.local.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { supabase } from '../../scripts/_db.mjs';
import { validateLive, loadBaseline } from '../../scripts/_content-write.mjs';
import { RULES } from '../../lib/content-validator.mjs';

const args = process.argv.slice(2);
const ONLY = (() => { const i = args.indexOf('--section'); return i >= 0 ? args[i + 1] : null; })();
const JSON_OUT = args.includes('--json');
const SHOW_DEBT = args.includes('--debt');
const WRITE_BASELINE = args.includes('--baseline');
const CONFIRM = args.includes('--confirm');
const BASELINE_PATH = 'audit/validator-baseline.json';

const { data: sections, error } = await supabase.from('sections').select('id').order('sort_order');
if (error) { console.error(`sections: ${error.message}`); process.exit(1); }
const targets = ONLY ? sections.filter((s) => s.id === ONLY) : sections;
if (!targets.length) { console.error(`no section "${ONLY}"`); process.exit(1); }

const baseline = loadBaseline();
const rows = [];
const allFindings = [];
for (const { id } of targets) {
  const { findings, summary } = await validateLive(id);
  const cov = findings.find((f) => f.rule === 'spec.coverage');
  const fresh = findings.filter((f) => f.tier !== 'INFO' && !baseline.has(f.key));
  rows.push({
    id, unit: summary.unitCode, block: summary.block, debt: summary.debt,
    newBlock: fresh.filter((f) => f.tier === 'BLOCK').length, newDebt: fresh.filter((f) => f.tier === 'DEBT').length,
    coverage: cov ? Math.round((100 * cov.covered) / Math.max(1, cov.leaves)) : null,
  });
  allFindings.push(...findings.map((f) => ({ ...f, sectionId: id })));
}

if (WRITE_BASELINE) {
  const keys = allFindings.filter((f) => f.tier !== 'INFO').map((f) => f.key).sort();
  const before = existsSync(BASELINE_PATH) ? JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) : null;
  const added = before ? keys.filter((k) => !before.keys.includes(k)) : keys;
  const removed = before ? before.keys.filter((k) => !keys.includes(k)) : [];
  console.log(`baseline: ${keys.length} keys (${before ? `was ${before.keys.length}: +${added.length} −${removed.length}` : 'new file'})`);
  if (added.length && before) {
    console.log('\nKEYS THIS WOULD ADD — each one is a defect being accepted as debt. Read them:');
    for (const k of added.slice(0, 60)) console.log(`  + ${k}`);
    if (added.length > 60) console.log(`  … and ${added.length - 60} more`);
  }
  if (!CONFIRM) { console.log('\nNot written. Add --confirm to write the baseline.'); process.exit(added.length && before ? 1 : 0); }
  const byRule = {};
  for (const f of allFindings) if (f.tier !== 'INFO') byRule[f.rule] = (byRule[f.rule] || 0) + 1;
  writeFileSync(BASELINE_PATH, JSON.stringify({
    written: new Date().toISOString().slice(0, 10),
    note: 'Finding keys that were live when the content validator landed (packet 3). The gate fails only on keys not in this list. This file should only shrink; a section packet that clears its debt reruns `node audit/scripts/validate-content.mjs --baseline --confirm` and commits the smaller file.',
    sections: targets.length,
    counts: { block: allFindings.filter((f) => f.tier === 'BLOCK').length, debt: allFindings.filter((f) => f.tier === 'DEBT').length, byRule },
    keys,
  }, null, 1) + '\n');
  console.log(`wrote ${BASELINE_PATH}`);
  process.exit(0);
}

if (JSON_OUT) {
  console.log(JSON.stringify({ rows, findings: allFindings.filter((f) => f.tier !== 'INFO' && !baseline.has(f.key)) }, null, 1));
  process.exit(rows.some((r) => r.newBlock) ? 1 : 0);
}

const pad = (v, n) => String(v).padStart(n);
console.log('section'.padEnd(36) + 'unit   block  debt  new-block  new-debt  coverage');
for (const r of rows) {
  const flag = r.newBlock ? '  <-- REGRESSION' : '';
  console.log(`${r.id.padEnd(36)}${(r.unit || '').padEnd(7)}${pad(r.block, 5)}${pad(r.debt, 6)}${pad(r.newBlock, 11)}${pad(r.newDebt, 10)}${pad(r.coverage == null ? '-' : r.coverage + '%', 10)}${flag}`);
}
const tot = (k) => rows.reduce((a, r) => a + r[k], 0);
console.log(`${'total'.padEnd(36)}${''.padEnd(7)}${pad(tot('block'), 5)}${pad(tot('debt'), 6)}${pad(tot('newBlock'), 11)}${pad(tot('newDebt'), 10)}`);

const fresh = allFindings.filter((f) => f.tier !== 'INFO' && !baseline.has(f.key));
if (fresh.length) {
  console.log(`\n${fresh.length} finding${fresh.length === 1 ? '' : 's'} not in the baseline:`);
  for (const f of fresh.filter((x) => x.tier === 'BLOCK')) console.log(`  BLOCK ${f.sectionId.padEnd(32)} ${f.rule.padEnd(26)} ${f.detail}`);
  if (SHOW_DEBT) for (const f of fresh.filter((x) => x.tier === 'DEBT')) console.log(`  debt  ${f.sectionId.padEnd(32)} ${f.rule.padEnd(26)} ${f.detail}`);
  else if (fresh.some((x) => x.tier === 'DEBT')) console.log(`  (${fresh.filter((x) => x.tier === 'DEBT').length} new DEBT — rerun with --debt to list them)`);
}
if (!baseline.size) console.log('\nNo baseline file. Every finding above is "new". Write one with --baseline --confirm once the numbers have been read.');

const byRule = {};
for (const f of allFindings) if (f.tier !== 'INFO') byRule[f.rule] = (byRule[f.rule] || 0) + 1;
console.log('\nby rule:');
for (const [rule, n] of Object.entries(byRule).sort((a, b) => b[1] - a[1])) console.log(`  ${RULES[rule].tier.padEnd(6)} ${rule.padEnd(28)} ${pad(n, 5)}`);

process.exit(tot('newBlock') ? 1 : 0);
