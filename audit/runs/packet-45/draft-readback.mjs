/**
 * PACKET 45 — read every table's draft AND data column straight from the database (not the API, not
 * the runner) and compare: draft against the dumped bundle, data against the t=0 snapshot.
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
const dump = JSON.parse(readFileSync('audit/snapshots/packet-45-bundle__economics__labour-markets.json', 'utf8')).tables;
const t0 = JSON.parse(readFileSync('audit/snapshots/2026-09-26-pre-packet-45__economics__labour-markets.json', 'utf8'));
const TABLES = { content: 'section_content', notes: 'section_notes', quiz: 'section_quiz', practice: 'section_practice', flashcards: 'section_flashcards', diagrams: 'section_diagrams', extras: 'section_extras', mistakes: 'section_common_mistakes' };
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const eq = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));
let bad = 0;
for (const [k, t] of Object.entries(TABLES)) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'labour-markets').single();
  if (error) { console.log(t, error.message); bad += 1; continue; }
  const d = eq(data.draft, dump[k]); const l = eq(data.data, t0[k]);
  if (!d || !l) bad += 1;
  console.log(`${t}: draft ${d ? '==' : '!='} bundle; data (live) ${l ? '== t=0 snapshot (untouched)' : '!= t=0 snapshot'}`);
}
console.log(bad ? `${bad} table(s) off` : 'all 8 tables: draft is the bundle, live is untouched');
process.exit(bad ? 1 : 0);
