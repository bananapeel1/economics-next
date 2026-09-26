// Read-only. One real live card per distinct field shape in section_common_mistakes.data.
import { supabase } from '../../../scripts/_db.mjs';
import { writeFileSync } from 'node:fs';
const { data: rows, error } = await supabase.from('section_common_mistakes').select('section_id, data');
if (error) { console.error(error.message); process.exit(1); }
const arr = (v) => Array.isArray(v) ? v : (v && Array.isArray(v.data) ? v.data : null);
const byShape = {}; const all = [];
for (const r of rows) for (const x of arr(r.data) || []) {
  if (!x || typeof x !== 'object') continue;
  all.push({ section: r.section_id, card: x });
  const k = Object.keys(x).filter((f) => f !== 'id').sort().join('|');
  if (!byShape[k]) byShape[k] = { section: r.section_id, card: x };
}
writeFileSync(process.argv[2], JSON.stringify({ byShape, all }, null, 1));
console.log(Object.entries(byShape).map(([k, v]) => `${k}  <- ${v.section}`).join('\n'), `\ncards ${all.length}`);
