import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
const env={}; readFileSync('.env.local','utf8').split('\n').forEach(l=>{const [k,...r]=l.split('='); if(k&&r.length) env[k.trim()]=r.join('=').trim();});
const sb=createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const id='national-income', subj='economics';
const TABLES=['section_content','section_quiz','section_practice','section_diagrams','section_notes','section_flashcards','section_common_mistakes','section_extras'];
mkdirSync('audit/snapshots',{recursive:true});
const live={};
for(const t of TABLES){ const {data,error}=await sb.from(t).select('data').eq('section_id',id).single(); if(error){console.log(`!! ${t}: ${error.message}`);continue;} live[t.replace('section_','')]=data.data; }
const out=`audit/snapshots/2026-09-18-pre-packet-37__${subj}__${id}.json`;
writeFileSync(out, JSON.stringify(live,null,1));
const snap=JSON.parse(readFileSync(`audit/content-sections/${subj}__${id}.json`,'utf8'));
let drift=0;
for(const k of Object.keys(live)){ const a=JSON.stringify(live[k]), b=JSON.stringify(snap[k]); if(a!==b){ drift++; console.log(`DRIFT ${k}: live ${a?.length} vs audit-snapshot ${b?.length??'(absent)'}`); } }
console.log(drift?`${drift} table(s) drifted since the audit snapshot`:'no drift vs audit snapshot');
console.log('written', out);
