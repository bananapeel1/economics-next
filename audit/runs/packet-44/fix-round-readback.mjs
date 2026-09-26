// Fix round: read the draft AND live columns straight from the database (not the API, not the dump),
// write each as a bundle the leak probe can read, and say what differs from the dump.
import { writeFileSync, readFileSync } from 'node:fs';
import { supabase } from '/Users/arongijsel/Claude APP/economics-next-remediation/scripts/_db.mjs';
const W = '/Users/arongijsel/Claude APP/economics-next-remediation/';
const OUT = process.argv[2];
const T = { content: 'section_content', quiz: 'section_quiz', diagrams: 'section_diagrams' };
const draft = {}, live = {};
for (const [k, t] of Object.entries(T)) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'aggregate-supply').single();
  if (error) throw new Error(`${t}: ${error.message}`);
  draft[k] = data.draft ?? data.data; live[k] = data.data;
  console.log(`${t}: draft ${data.draft ? 'present' : 'ABSENT (falls back to data)'}`);
}
writeFileSync(`${OUT}/p44-db-draft.json`, JSON.stringify({ tables: draft }));
writeFileSync(`${OUT}/p44-db-live.json`, JSON.stringify({ tables: live }));
const dump = JSON.parse(readFileSync(W + 'audit/snapshots/packet-44-bundle__economics__aggregate-supply.json', 'utf8')).tables;
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const diff = (a, b) => a.map((x, i) => (JSON.stringify(canon(x)) === JSON.stringify(canon(b[i])) ? null : i)).filter((i) => i !== null);
console.log(`draft quiz vs dump: ${diff(draft.quiz, dump.quiz).length} items differ; live quiz vs dump: items ${JSON.stringify(diff(live.quiz, dump.quiz))} differ`);
console.log(`draft content === live content: ${JSON.stringify(canon(draft.content)) === JSON.stringify(canon(live.content))}; draft diagrams === live diagrams: ${JSON.stringify(canon(draft.diagrams)) === JSON.stringify(canon(live.diagrams))}`);
