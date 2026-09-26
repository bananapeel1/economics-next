/**
 * PACKET 52 — the t=0 snapshot of role-state-macroeconomy, taken before any write. Same method as
 * audit/runs/packet-46/snapshot.mjs (loadBundle reads all eight tables' `data`), plus a second file
 * holding every table's `draft` column, because packet 2.91 staged a diagram decision on this
 * section and a rebuild's `--stage` overwrites it.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { loadBundle, TABLE_TO_KEY } from '../../../scripts/_content-write.mjs';
import { supabase } from '../../../scripts/_db.mjs';

const SECTION = 'role-state-macroeconomy';
const STAMP = '2026-09-26-pre-packet-52';
const OUT = `audit/snapshots/${STAMP}__economics__${SECTION}.json`;
const OUT_DRAFT = `audit/snapshots/${STAMP}-draft__economics__${SECTION}.json`;

mkdirSync('audit/snapshots', { recursive: true });
const live = await loadBundle(SECTION);
writeFileSync(OUT, JSON.stringify(live, null, 1));
const drafts = {};
for (const [table, key] of Object.entries(TABLE_TO_KEY)) {
  const { data, error } = await supabase.from(table).select('draft').eq('section_id', SECTION).maybeSingle();
  if (error) throw new Error(`${table}: ${error.message}`);
  drafts[key] = data ? data.draft : null;
}
writeFileSync(OUT_DRAFT, JSON.stringify(drafts, null, 1));
const sizes = Object.entries(live).map(([k, v]) => `${k} ${Array.isArray(v) ? v.length : v ? 'obj' : 'null'}`);
console.log(`wrote ${OUT}`);
console.log(sizes.join(' · '));
console.log(`wrote ${OUT_DRAFT}`);
console.log(Object.entries(drafts).map(([k, v]) => `${k} ${v === null ? 'null' : Array.isArray(v) ? v.length : 'obj'}${v !== null && JSON.stringify(v) !== JSON.stringify(live[k]) ? ' (differs from data)' : ''}`).join(' · '));
