import { supabase } from './_db.mjs';

const ids = [
  'business-objectives-strategy','business-growth','decision-making-techniques',
  'influences-business-decisions','assessing-competitiveness','managing-change',
  'globalisation','global-markets-expansion','global-marketing','global-industries-mncs'
];

const tables = ['section_notes','section_content','section_quiz','section_flashcards','section_practice','section_diagrams'];

async function check() {
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('section_id, data').in('section_id', ids);
    if (error) { console.log(table + ': ERROR - ' + error.message); continue; }
    const found = (data || []).filter(r => {
      if (!r.data) return false;
      if (Array.isArray(r.data)) return r.data.length > 0;
      return true;
    });
    const foundIds = new Set(found.map(r => r.section_id));
    const missing = ids.filter(id => !foundIds.has(id));
    console.log(`${table}: ${found.length}/10` + (missing.length > 0 ? ` | MISSING: ${missing.join(', ')}` : ''));
  }
}

check();
