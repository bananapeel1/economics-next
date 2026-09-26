/**
 * Packet 43 — the staged draft read STRAIGHT FROM THE DATABASE (service client, `draft` column),
 * every table in full, compared against the dumped bundle with a deep comparison written here.
 *
 * Independent of `check-staged-drafts.mjs` on purpose: that reads the anonymous `?draft=1` API and
 * cannot see the quiz items, flashcards, chains and mistakes the preview slice withholds. This reads
 * all of them, and uses its own key-order-insensitive equality rather than `sameJson`.
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
import { TABLE_TO_KEY } from '../../../scripts/_content-write.mjs';

const SECTION = 'economic-growth';
const dumped = JSON.parse(readFileSync(`audit/snapshots/packet-43-bundle__economics__${SECTION}.json`, 'utf8')).tables;
/* A/B: PLANT=1 changes one deep field of the dump in memory; the comparison must then report exactly one difference */
if (process.env.PLANT) dumped.content[4].sections[0].recall.answers[0] = 'planted';
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object'
  ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
let fields = 0; let diffs = 0;
const walk = (a, b, path) => {
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) walk(a[k], b[k], `${path}.${k}`);
    return;
  }
  fields += 1;
  if (JSON.stringify(canon(a)) !== JSON.stringify(canon(b))) { diffs += 1; if (diffs <= 10) console.log(`DIFF ${path}: db=${JSON.stringify(a)?.slice(0, 80)} dump=${JSON.stringify(b)?.slice(0, 80)}`); }
};
for (const [table, key] of Object.entries(TABLE_TO_KEY)) {
  const { data, error } = await supabase.from(table).select('draft, data').eq('section_id', SECTION).maybeSingle();
  if (error) { console.log(`${table}: ${error.message}`); diffs += 1; continue; }
  const before = fields; const d0 = diffs;
  walk(data?.draft, dumped[key], key);
  const liveSame = JSON.stringify(canon(data?.data)) === JSON.stringify(canon(dumped[key]));
  console.log(`${table.padEnd(24)} draft: ${fields - before} leaf fields, ${diffs - d0} differ · live data equals the rebuild: ${liveSame}`);
}
console.log(`\n${fields} leaf fields compared, ${diffs} differ`);
process.exit(diffs ? 1 : 0);
