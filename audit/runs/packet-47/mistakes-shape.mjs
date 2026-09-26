// Read-only: for every section, how many authored mistakes carry the `mistake` field
// components/MistakesTab.jsx renders (title/mistake/correction/examTip), live (data) and staged (draft).
import { supabase } from '../../../scripts/_db.mjs';
const { data: rows, error } = await supabase.from('section_common_mistakes').select('section_id, data, draft');
if (error) { console.error(error.message); process.exit(1); }
const arr = v => Array.isArray(v) ? v : (v && Array.isArray(v.data) ? v.data : (v && Array.isArray(v.items) ? v.items : null));
const out = [];
for (const r of rows) {
  for (const corpus of ['data', 'draft']) {
    const a = arr(r[corpus]); if (!a || !a.length) continue;
    const keys = [...new Set(a.flatMap(x => Object.keys(x || {})))].join(',');
    const ok = a.filter(x => x && typeof x.mistake === 'string' && x.mistake.trim()).length;
    out.push({ section: r.section_id, corpus, readable: ok, total: a.length, keys });
  }
}
out.sort((a, b) => (a.corpus + a.section).localeCompare(b.corpus + b.section));
for (const o of out) console.log(`${o.corpus}\t${o.readable}/${o.total}\t${o.section}\t${o.keys}`);
const blank = out.filter(o => o.corpus === 'data' && o.readable < o.total);
console.log(`\nLIVE (data) sections with unreadable mistakes: ${blank.length} of ${out.filter(o => o.corpus === 'data').length}; items: ${blank.reduce((s, o) => s + o.total - o.readable, 0)}`);
