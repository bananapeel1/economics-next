/** Which of the 43 sections now carry a drill, and which do not. Reads the section list
 *  from audit/content-sections (t=0 metadata) and the registry through the pool. */
import { readdirSync, readFileSync } from 'node:fs';
import { templatesForSection } from '../../../lib/quant-pool.js';

const rows = readdirSync('audit/content-sections').filter((f) => f.endsWith('.json')).map((f) => {
  const { meta } = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8'));
  return { ...meta, drills: templatesForSection({ subject: meta.subject, unitCode: meta.unitCode, number: meta.number }) };
}).sort((a, b) => `${a.subject}${a.number}`.localeCompare(`${b.subject}${b.number}`));

const withDrills = rows.filter((r) => r.drills.length);
console.log(`${withDrills.length} of ${rows.length} sections carry a drill\n`);
for (const r of withDrills) {
  console.log(`  ${r.unitCode} ${r.number}  ${r.id.padEnd(32)} ${r.drills.map((t) => t.id).join(', ')}`);
}
const byUnit = {};
for (const r of rows.filter((x) => !x.drills.length)) (byUnit[r.unitCode] ||= []).push(r.id);
console.log(`\n${rows.length - withDrills.length} without, by unit — packet 13.3's target:`);
for (const [unit, ids] of Object.entries(byUnit).sort()) console.log(`  ${unit}  ${ids.length}  ${ids.join(', ')}`);
