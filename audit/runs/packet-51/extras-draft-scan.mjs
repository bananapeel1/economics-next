// Verify B fix: read section_extras.draft straight from the DB (not the runner's bundle) and scan every string for markdown markers.
import { supabase } from '../../../scripts/_db.mjs';
const { data, error } = await supabase.from('section_extras').select('draft, data').eq('section_id', 'poverty-inequality').single();
if (error) { console.error(error); process.exit(1); }
const hits = []; let n = 0;
const walk = (v, p) => { if (typeof v === 'string') { n++; if (/\*\*|__|(^|\s)#{1,6}\s|`|\*[^*\s][^*]*\*/.test(v)) hits.push([p, v.slice(0, 120)]); } else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, p + '.' + k); };
const d = data.draft;
walk(d, 'draft');
console.log('draft chains', d?.chains?.length, 'evaluation', d?.evaluation?.length, 'strings scanned', n);
console.log('markdown hits in draft:', hits.length); for (const h of hits) console.log('  ', h[0], '|', h[1]);
console.log('eval[0].content:', d?.evaluation?.[0]?.content);
const giniTbl = await supabase.from('section_content').select('draft').eq('section_id', 'poverty-inequality').single();
const s = JSON.stringify(giniTbl.data.draft); const i = s.indexOf('written on its 0 to 1 scale');
console.log('content draft gini recall:', s.slice(i - 20, i + 520));
