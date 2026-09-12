import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
const env = {}; readFileSync('.env.local','utf8').split('\n').forEach(l=>{const [k,...r]=l.split('='); if(k&&r.length) env[k.trim()]=r.join('=').trim();});
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
async function all(t, sel='*'){const rows=[];let f=0;for(;;){const {data,error}=await sb.from(t).select(sel).range(f,f+999);if(error){console.error(t,error.message);break;}rows.push(...data);if(data.length<1000)break;f+=1000;}return rows;}
const cp = await all('user_content_progress');
const users = {};
const bySection = {};
for (const r of cp) {
  const u = users[r.user_id] ||= { sections: 0, completed: 0, steps: 0, totalSteps: 0, last: 0 };
  u.sections++; u.steps += r.furthest_step; u.totalSteps += r.total_steps; if (r.furthest_step >= r.total_steps - 1 && r.total_steps > 0) u.completed++;
  u.last = Math.max(u.last, new Date(r.updated_at).getTime());
  const s = bySection[r.section_id] ||= { users: 0, completed: 0, sumPct: 0, atStep0: 0, atStep1: 0 };
  s.users++; const pct = r.total_steps ? r.furthest_step / (r.total_steps - 1 || 1) : 0; s.sumPct += Math.min(1, pct);
  if (r.furthest_step >= r.total_steps - 1 && r.total_steps > 0) s.completed++;
  if (r.furthest_step === 0) s.atStep0++; if (r.furthest_step === 1) s.atStep1++;
}
const ulist = Object.values(users);
const pct=(a,p)=>a.length?a[Math.min(a.length-1,Math.floor(a.length*p))]:null;
const secPerUser = ulist.map(u=>u.sections).sort((a,b)=>a-b);
const compPerUser = ulist.map(u=>u.completed).sort((a,b)=>a-b);
console.log('user_content_progress rows:', cp.length, 'distinct users:', ulist.length);
console.log('sections started per user: p25/median/p75/max =', pct(secPerUser,.25), pct(secPerUser,.5), pct(secPerUser,.75), secPerUser.at(-1));
console.log('sections COMPLETED per user: median/p75/max =', pct(compPerUser,.5), pct(compPerUser,.75), compPerUser.at(-1), '| users with >=1 completion:', ulist.filter(u=>u.completed>0).length);
const stepDist = {}; for (const r of cp) { const k = r.furthest_step; stepDist[k]=(stepDist[k]||0)+1; }
console.log('furthest_step distribution (all section starts):', JSON.stringify(stepDist));
const pctDist = {0:0,'1-25':0,'26-50':0,'51-75':0,'76-99':0,100:0};
for (const r of cp){ const p = r.total_steps>1 ? r.furthest_step/(r.total_steps-1)*100 : 100; if(r.furthest_step===0)pctDist[0]++; else if(p>=100)pctDist[100]++; else if(p>75)pctDist['76-99']++; else if(p>50)pctDist['51-75']++; else if(p>25)pctDist['26-50']++; else pctDist['1-25']++; }
console.log('progress-through-section distribution:', JSON.stringify(pctDist));
const secRows = Object.entries(bySection).map(([id,s])=>({id,users:s.users,completed:s.completed,avgPct:Math.round(100*s.sumPct/s.users),atStep0:s.atStep0})).sort((a,b)=>b.users-a.users);
console.log('\nTop sections by starts (id | users | completed | avg % through | stuck at step 0):');
for (const s of secRows) console.log(`${s.id} | ${s.users} | ${s.completed} | ${s.avgPct}% | ${s.atStep0}`);
const now=Date.now(); const lasts = ulist.map(u=>u.last);
console.log('\nlearn-mode users active last 7/30/90d:', lasts.filter(t=>now-t<7*864e5).length, lasts.filter(t=>now-t<30*864e5).length, lasts.filter(t=>now-t<90*864e5).length);
const qa = await all('user_quiz_attempts');
console.log('\nuser_quiz_attempts rows:', qa.length, 'distinct users:', new Set(qa.map(r=>r.user_id)).size, 'columns:', Object.keys(qa[0]||{}));
const fc = await all('user_flashcard_progress');
console.log('user_flashcard_progress rows:', fc.length, 'distinct users:', new Set(fc.map(r=>r.user_id)).size, 'status dist:', JSON.stringify(fc.reduce((m,r)=>{m[r.status]=(m[r.status]||0)+1;return m;},{})));
writeFileSync(process.argv[2]||'audit/raw/funnel_aggregates.json', JSON.stringify({ users: ulist.length, rows: cp.length, stepDist, pctDist, secRows, quizAttempts: qa.length, flashcardRows: fc.length }, null, 2));
