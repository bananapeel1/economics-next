// Verify B fix: control for the markdown regex, Gini-scale mentions across every staged table, and live untouched.
import { supabase } from '../../../scripts/_db.mjs';
const re = /\*\*|__|(^|\s)#{1,6}\s|`|\*[^*\s][^*]*\*/;
console.log('control: old eval string flagged =', re.test('than the middle. **The pattern of growth matters more than its rate.** Labour'));
for (const t of ['section_content','section_notes','section_quiz','section_practice','section_flashcards','section_extras','section_common_mistakes','section_diagrams']) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'poverty-inequality').single();
  if (error) { console.log(t, 'ERR', error.message); continue; }
  const s = JSON.stringify(data.draft);
  const hits = [...s.matchAll(/[^"]{0,90}(0 to 100|0-100|0–100|out of 100|\b100\b)[^"]{0,60}/g)].map(m => m[0]).filter(x => /gini|coefficient|scale/i.test(x));
  const liveHasPacket = JSON.stringify(data.data || '').includes('Marenda');
  console.log(t, '| gini-scale mentions:', hits.length, '| live row contains packet text (Marenda):', liveHasPacket);
  for (const h of hits) console.log('   ', h);
}
