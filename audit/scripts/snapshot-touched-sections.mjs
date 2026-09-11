import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
const env={}; readFileSync('.env.local','utf8').split('\n').forEach(l=>{const [k,...r]=l.split('='); if(k&&r.length) env[k.trim()]=r.join('=').trim();});
const sb=createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const SECTIONS=['the-market','globalisation','national-income','aggregate-demand','types-sizes-businesses','trade-global-economy','financial-planning','external-influences','supply','market-failure','managing-finance','price-determination'];
const TABLES=['section_content','section_quiz','section_practice','section_diagrams'];
mkdirSync('audit/snapshots',{recursive:true});
const stamp=process.argv[2]||'2026-09-11-pre-packet-0';
let drift=0;
for(const id of SECTIONS){
  const subj = ['the-market','globalisation','types-sizes-businesses','financial-planning','external-influences','managing-finance'].includes(id) && id!=='types-sizes-businesses' ? 'business':'economics';
  const snapPath=`audit/content-sections/${subj}__${id}.json`;
  let snap; try{ snap=JSON.parse(readFileSync(snapPath,'utf8')); }catch{ console.log(`!! no snapshot for ${subj}__${id}`); continue; }
  const live={};
  for(const t of TABLES){ const {data,error}=await sb.from(t).select('data').eq('section_id',id).single(); if(error){console.log(`!! ${id} ${t}: ${error.message}`);continue;} live[t.replace('section_','')]=data.data; }
  writeFileSync(`audit/snapshots/${stamp}__${subj}__${id}.json`, JSON.stringify(live,null,1));
  for(const k of Object.keys(live)){ const a=JSON.stringify(live[k]), b=JSON.stringify(snap[k]); if(a!==b){ drift++; console.log(`DRIFT ${id}.${k}: live ${a.length} chars vs snapshot ${b.length}`); } }
}
console.log(drift? `\n${drift} table(s) drifted since the audit snapshot`:'\nNo drift: live DB matches the audit snapshot for all touched sections.');
console.log(`pre-hotfix snapshots written to audit/snapshots/${stamp}__*.json`);
