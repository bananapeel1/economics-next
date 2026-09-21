/* V036: who tells a student Appendix 6 asks a Discuss for a conclusion? Both corpora, every field. */
import { supabase } from '../../../scripts/_db.mjs';
const rows = (await supabase.from('sections').select('id')).data;
const walk = (x, path, out) => {
  if (typeof x === 'string') { out.push([path, x]); return; }
  if (Array.isArray(x)) { x.forEach((v, i) => walk(v, `${path}[${i}]`, out)); return; }
  if (x && typeof x === 'object') { for (const [k, v] of Object.entries(x)) walk(v, `${path}.${k}`, out); }
};
for (const corpus of ['data', 'draft']) {
  let hits = 0; const secs = new Set();
  for (const { id } of rows) {
    for (const table of ['section_content', 'section_practice']) {
      const { data } = await supabase.from(table).select(corpus).eq('section_id', id).maybeSingle();
      let c = data?.[corpus]; if (typeof c === 'string') { try { c = JSON.parse(c); } catch { continue; } }
      if (!c) continue;
      const out = []; walk(c, table, out);
      for (const [path, s] of out) {
        if (!/\bDiscuss\b/.test(s)) continue;
        if (!/\bconclusion\b/i.test(s)) continue;
        hits += 1; secs.add(id);
        console.log(`${corpus} ${id} ${path}\n    ${s.replace(/\s+/g, ' ').slice(0, 200)}`);
      }
    }
  }
  console.log(`>>> ${corpus}: ${hits} strings in ${secs.size} sections: ${[...secs].join(', ')}\n`);
}
