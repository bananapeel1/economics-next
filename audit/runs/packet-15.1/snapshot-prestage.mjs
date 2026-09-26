// Packet 15.1: read-only record of introductory-concepts' data AND draft on every content table, before --stage.
import { writeFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
const T = ['section_content', 'section_notes', 'section_quiz', 'section_practice', 'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];
const out = { section_id: 'introductory-concepts', takenAt: new Date().toISOString(), tables: {} };
for (const t of T) {
  const { data, error } = await supabase.from(t).select('data, draft').eq('section_id', 'introductory-concepts').maybeSingle();
  if (error) throw new Error(`${t}: ${error.message}`);
  out.tables[t] = { data: data?.data ?? null, draft: data?.draft ?? null };
  console.log(t.padEnd(24), 'data', data?.data ? JSON.stringify(data.data).length : 0, 'chars · draft', data?.draft ? JSON.stringify(data.draft).length : 'null');
}
const p = `audit/snapshots/2026-09-26-pre-packet-15.1__economics__introductory-concepts.json`;
writeFileSync(p, JSON.stringify(out, null, 1)); console.log('wrote', p);
