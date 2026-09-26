/* Packet 51: measure the quiz bank's length tell and key positions from the DB draft column (not the runner's in-memory bank), and the live data for contrast. */
import { supabase } from '../../../scripts/_db.mjs';
const { data } = await supabase.from('section_quiz').select('draft, data').eq('section_id', 'poverty-inequality').single();
for (const [name, bank] of [['draft', data.draft], ['live', data.data]]) {
  let longest = 0; const pos = [0, 0, 0, 0];
  for (const q of bank) { const L = q.options.map((o) => o.length); const k = L[q.correctIndex]; if (L.filter((x) => x >= k).length === 1) longest += 1; pos[q.correctIndex] += 1; }
  console.log(`${name}: ${bank.length} items; key uniquely longest in ${longest}; key positions ${pos.join('/')}`);
}
