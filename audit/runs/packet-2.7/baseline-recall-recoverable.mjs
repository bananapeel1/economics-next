#!/usr/bin/env node
/**
 * Seed `audit/validator-baseline.json` with the `recall.recoverable` back catalogue — the ONE rule
 * packet 2.7 adds — from BOTH corpora. Run once, by packet 2.7. `--confirm` to write.
 *
 * WHY THIS IS A SEPARATE SCRIPT AND NOT `validate-content.mjs --baseline --confirm`. That command
 * rewrites the whole file from LIVE content, which would (a) drop every key belonging to a rule's
 * staged instances and (b) sweep in whatever else has drifted since the last rewrite. This adds the
 * keys of exactly one rule and touches nothing else, and it prints the count per corpus first.
 *
 * WHY THE BACK CATALOGUE IS BASELINED AT ALL. Measured on 19 September, the new rule reports 20 new
 * DEBT findings on packet 29's staged section, 9 on packet 30's, 9 on packet 33's, 4 on packet 36's
 * and 8 on packet 37's — and a content runner's own gate is 0 new DEBT on its own section, so
 * without this NO content packet can stage anything until it has rewritten its recalls. V029's own
 * finding is that this is HOUSE STYLE across 599 recalls and not any one packet's defect; a gate
 * that blocks the whole programme on it would be switched off by Friday, which is what the header
 * of validate-content.mjs says happened to March's. The debt stays visible and guarded instead:
 * `npm run recalls` counts it per section and `--check` fails if any section gets worse.
 *
 * Staged keys are included because a finding key is a content fingerprint: the key a staged
 * subsection produces is the key it will produce once published, so baselining it now is not a
 * promise about the future, it is the same item.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
import { validateSection } from '../../../lib/content-validator.mjs';
import { contextFor } from '../../../scripts/_content-write.mjs';
import { CONTENT_TABLES, TABLE_TO_KEY } from '../../../lib/content-gate.mjs';

const PATH = 'audit/validator-baseline.json';
const RULE = 'recall.recoverable';
const CONFIRM = process.argv.includes('--confirm');

const { data: sections, error } = await supabase.from('sections').select('id').order('sort_order');
if (error) { console.error(error.message); process.exit(1); }

const found = { data: new Set(), draft: new Set() };
for (const corpus of ['data', 'draft']) {
  for (const { id } of sections) {
    const b = {};
    for (const t of CONTENT_TABLES) {
      const { data, error: e } = await supabase.from(t).select('data, draft').eq('section_id', id).maybeSingle();
      if (e) throw new Error(`${id} ${t}: ${e.message}`);
      b[TABLE_TO_KEY[t]] = (corpus === 'draft' ? (data?.draft ?? data?.data) : data?.data) ?? null;
    }
    if (!Array.isArray(b.content) || !b.content.length) continue;
    for (const f of validateSection(b, await contextFor(id)).findings) if (f.rule === RULE) found[corpus].add(f.key);
  }
}

const base = JSON.parse(readFileSync(PATH, 'utf8'));
const have = new Set(base.keys);
const all = new Set([...found.data, ...found.draft]);
const add = [...all].filter((k) => !have.has(k)).sort();

console.log(`${RULE}: ${found.data.size} keys live, ${found.draft.size} staged, ${all.size} distinct`);
console.log(`baseline: ${base.keys.length} keys → ${base.keys.length + add.length} (+${add.length})`);
console.log(`keys already present for other rules are untouched; no key is removed.`);
if (!CONFIRM) { console.log('\nre-run with --confirm to write'); process.exit(0); }

base.keys = [...base.keys, ...add].sort();
base.counts = { ...(base.counts || {}), [RULE]: all.size };
base.note = `${base.note || ''}\nrecall.recoverable seeded from BOTH corpora by packet 2.7 on 2026-09-19 (${all.size} keys): the rule is new and its back catalogue is house style, not a regression. See audit/runs/packet-2.7/baseline-recall-recoverable.mjs and audit/runs/packet-2.7/calibration.md.`.trim();
writeFileSync(PATH, `${JSON.stringify(base, null, 1)}\n`);
console.log(`\nwrote ${PATH}`);
