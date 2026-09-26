/*
 * Packet 43 fix round 1 — independent probe for topFix-03 (level bands).
 * Different method from the runner: reads the DB `draft` (and `data`) of EVERY table for the section,
 * walks every string leaf without knowing field names, and (a) flags "levels-marked"/"levels marked"/KAA
 * anywhere, (b) for each practice row, reads the Level numbers in the whole guidance by a looser
 * pattern (case-insensitive, "level" + digit or roman numeral) and reports them by tariff.
 * Usage: node audit/runs/packet-43/probe-ladders.mjs [draft|data]   (FILE=<bundle.json> to read a file instead)
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
const SECTION = 'economic-growth';
const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice', 'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];
const col = process.argv[2] || 'draft';
const leaves = (v, path, out) => {
  if (typeof v === 'string') out.push([path, v]);
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) leaves(x, `${path}.${k}`, out);
  return out;
};
let tables = {};
if (process.env.FILE) tables = JSON.parse(readFileSync(process.env.FILE, 'utf8')).tables;
else for (const t of TABLES) {
  const { data, error } = await supabase.from(t).select(col).eq('section_id', SECTION).maybeSingle();
  if (error) throw error;
  tables[t] = data?.[col];
}
const all = Object.entries(tables).flatMap(([t, v]) => leaves(v, t, []));
const claims = all.filter(([, s]) => /levels?[\s-]+marked|\bKAA\b/i.test(s));
console.log(`source: ${process.env.FILE || col} · ${all.length} string leaves`);
console.log(`marking-claim leaves: ${claims.length}`);
claims.forEach(([p]) => console.log(`  ${p}`));
const practice = tables.section_practice ?? tables.practice;
const rows = Array.isArray(practice) ? practice : Object.values(practice || {}).find(Array.isArray) || [];
for (const r of rows) {
  const text = Object.values(r).filter((x) => typeof x === 'string').join(' \n ');
  const marks = r.marks ?? Number((/\((\d+) marks?\)/.exec(r.question || '') || [])[1]);
  const lv = [...text.matchAll(/\blevel\s+([1-9]|i{1,3}|iv)\b/gi)].map((m) => m[1]);
  const firstPara = String(r.guidance || '').split('\n')[0];
  console.log(`  ${String(r.command || '').padEnd(9)} ${String(marks).padStart(2)}  levels [${lv}]  opening-has-level ${/\blevel\s+\d/i.test(firstPara)}`);
}
