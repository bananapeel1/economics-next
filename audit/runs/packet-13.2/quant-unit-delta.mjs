/**
 * Which `quant.unit` baseline keys packet 13.2 cleared, and which it did not.
 *
 * Not `--baseline --confirm`: that rewrite would ALSO fold in 130-odd `practice.opening`
 * keys from another session's live rule, and the baseline is a file that may only shrink.
 * This lists the delta so the removal can be made by hand and checked by a verifier.
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
import { validateLive } from '../../../scripts/_content-write.mjs';
import { templates } from '../../../lib/quant/index.mjs';

const baseline = JSON.parse(readFileSync('audit/validator-baseline.json', 'utf8'));
const baselined = baseline.keys.filter((k) => k.includes('|quant.unit|'));

const { data: sections } = await supabase.from('sections').select('id').order('sort_order');
const live = [];
for (const { id } of sections) {
  const { findings, summary } = await validateLive(id);
  for (const f of findings.filter((x) => x.rule === 'quant.unit')) live.push({ key: f.key, unit: summary.unitCode });
}

const liveKeys = new Set(live.map((f) => f.key));
const cleared = baselined.filter((k) => !liveKeys.has(k));
const remaining = baselined.filter((k) => liveKeys.has(k));
const units = [...new Set(templates.map((t) => t.unit))].sort();

console.log(`templates registered for: ${units.join(', ')}`);
console.log(`\nbaselined quant.unit keys: ${baselined.length}`);
console.log(`cleared by packet 13.2:    ${cleared.length}`);
for (const k of cleared) console.log(`  − ${k}`);
console.log(`still open:                ${remaining.length}`);
for (const k of remaining) console.log(`    ${k}  (${live.find((f) => f.key === k)?.unit})`);
const stale = [...liveKeys].filter((k) => !baseline.keys.includes(k));
console.log(`\nlive keys not in the baseline: ${stale.length}${stale.length ? ' — ' + stale.join(', ') : ''}`);
