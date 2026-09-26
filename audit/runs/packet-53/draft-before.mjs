/** Packet 53 — read-only: is there already a draft (someone else's staged work) on this section? */
import { supabase } from '../../../scripts/_db.mjs';
const SECTION = 'influences-business-decisions';
const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice', 'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];
for (const t of TABLES) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', SECTION).maybeSingle();
  if (error || !data) { console.log(`${t.padEnd(24)} ${error?.message || 'no row'}`); continue; }
  console.log(`${t.padEnd(24)} draft ${data.draft == null ? 'null' : 'PRESENT ' + JSON.stringify(data.draft).length + 'b'} · data ${JSON.stringify(data.data)?.length}b`);
}
