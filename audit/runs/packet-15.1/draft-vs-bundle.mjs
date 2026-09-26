// Packet 15.1: the staged draft, read from the database, compared FIELD BY FIELD with the dumped bundle (PROTOCOL gate 5).
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
const B = JSON.parse(readFileSync('audit/snapshots/packet-15-bundle__economics__introductory-concepts.json', 'utf8')).tables;
const T = { content: 'section_content', notes: 'section_notes', quiz: 'section_quiz', practice: 'section_practice', flashcards: 'section_flashcards', diagrams: 'section_diagrams', extras: 'section_extras', mistakes: 'section_common_mistakes' };
const norm = (x) => JSON.stringify(x, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).filter(([, y]) => y !== undefined).sort()) : v));
let bad = 0;
const walk = (a, b, path) => {
  if (norm(a) === norm(b)) return;
  if (a && b && typeof a === 'object' && typeof b === 'object') { for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) walk(a[k], b[k], `${path}.${k}`); return; }
  bad++; if (bad <= 20) console.log(`DIFF ${path}: bundle ${JSON.stringify(a)?.slice(0, 80)} · draft ${JSON.stringify(b)?.slice(0, 80)}`);
};
for (const [k, t] of Object.entries(T)) {
  const { data, error } = await supabase.from(t).select('draft').eq('section_id', 'introductory-concepts').single();
  if (error) throw error;
  const before = bad; walk(B[k], data.draft, k);
  console.log(k.padEnd(11), bad === before ? 'identical' : `${bad - before} differing field(s)`);
}
console.log(bad ? `\n${bad} differing field(s)` : '\ndraft == bundle on every field of every table');
process.exit(bad ? 1 : 0);
