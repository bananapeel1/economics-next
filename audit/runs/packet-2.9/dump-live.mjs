// Packet 2.9. Read-only: every section's content/quiz/practice/diagrams, live `data` and `draft`.
import { supabase } from '../../../scripts/_db.mjs';
import { writeFileSync } from 'node:fs';
const T = { content: 'section_content', quiz: 'section_quiz', practice: 'section_practice', diagrams: 'section_diagrams' };
const { data: sections, error } = await supabase.from('sections').select('id, title, unit_id').order('id');
if (error) throw error;
const out = {};
for (const s of sections) {
  const row = { id: s.id, title: s.title, unit_id: s.unit_id, live: {}, draft: {} };
  for (const [k, t] of Object.entries(T)) {
    const { data, error: e } = await supabase.from(t).select('data, draft').eq('section_id', s.id).maybeSingle();
    if (e) throw new Error(`${t} ${s.id}: ${e.message}`);
    row.live[k] = data?.data ?? null;
    row.draft[k] = data?.draft ?? null;
  }
  out[s.id] = row;
}
writeFileSync(process.argv[2], JSON.stringify(out));
console.log('sections', sections.length);
