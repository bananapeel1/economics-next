/** Packet 55 — read-only: does any content table already hold a draft for global-marketing? */
import { supabase } from '../../../scripts/_db.mjs';
const SECTION = 'global-marketing';
const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice', 'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];
for (const t of TABLES) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', SECTION).maybeSingle();
  if (error || !data) { console.log(`${t}: ${error?.message || 'no row'}`); continue; }
  const n = (v) => (Array.isArray(v) ? v.length : v == null ? 'null' : 'obj');
  console.log(`${t.padEnd(24)} data ${n(data.data)} · draft ${n(data.draft)}`);
}
