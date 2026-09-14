// Read-only: renders the six relabelled diagram DRAFTS into one HTML page for a collision check.
import { writeFileSync } from 'node:fs';
import { supabase } from './_db.mjs';
const want = { 'government-intervention': [0, 1], 'market-structures-contestability': [2], 'trade-global-economy': [1, 2], 'role-state-macroeconomy': [4] };
let html = '<meta charset="utf-8"><style>body{background:#1a1d27;color:#eee;font-family:sans-serif;margin:0;padding:12px} .d{margin:0 0 18px} svg{width:100%;height:auto;display:block;background:#1e2230} h3{font-size:13px;margin:0 0 4px}</style>';
for (const [sec, idxs] of Object.entries(want)) {
  const { data, error } = await supabase.from('section_diagrams').select('draft').eq('section_id', sec).maybeSingle();
  if (error || !data?.draft) throw new Error(`${sec}: ${error?.message || 'no draft'}`);
  for (const i of idxs) { const d = data.draft[i]; html += `<div class="d"><h3>${sec}[${i}] ${d.title}</h3>${d.svg}</div>`; }
}
html += `<script>document.querySelectorAll('svg').forEach(svg=>{const vb=(svg.getAttribute('viewBox')||'').split(/[\\s,]+/).map(Number);const w=vb[2]||500;const min=w/36;svg.querySelectorAll('text').forEach(t=>{const d=parseFloat(t.getAttribute('font-size')||t.style.fontSize||'');const c=Number.isFinite(d)?d:w/40;if(c<min)t.style.fontSize=min.toFixed(1)+'px';});});</script>`;
writeFileSync(process.argv[2], html); console.log('wrote', process.argv[2], html.length, 'chars');
