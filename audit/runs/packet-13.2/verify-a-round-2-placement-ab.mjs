/* Verify A round 2 — placement A/B over LIVE content on :3001.
 * Control = the pre-fix spread loop (start at i=1, never unshift 0), reimplemented here so
 * no source file is touched. Treatment = the shipping lib/quant-pool.js. */
import { readFileSync } from 'node:fs';

const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation';
const { buildSteps } = await import(`${ROOT}/lib/learn-steps.js`);
const { templatesForSection, placeQuantItems } = await import(`${ROOT}/lib/quant-pool.js`);
const { subjectFrom } = await import(`${ROOT}/lib/ial-commands.js`);

const TITLE_STOP = new Set(['even','this','that','from','into','with','what','when','their','them','your',
  'more','than','they','have','been','does','using','used','other','over','some','only','also','both','each','about']);
const titleWords = (t) => new Set(String(t||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/)
  .filter((w)=>w.length>=4 && !TITLE_STOP.has(w)));

function placeControl(templateList, checkinTitles) {
  const map = {};
  const titles = Array.isArray(checkinTitles) ? checkinTitles : [];
  const count = Array.isArray(checkinTitles) ? titles.length : Number(checkinTitles) || 0;
  const list = (templateList||[]).map((t)=> (typeof t==='string'?{id:t,title:''}:t));
  if (!list.length || count < 1) return map;
  const taken = new Set(); const unmatched = [];
  for (const template of list) {
    const words = titleWords(template.title);
    let best = -1, bestScore = 0;
    titles.forEach((title, ordinal) => {
      if (taken.has(ordinal)) return;
      const score = [...titleWords(title)].filter((w)=>words.has(w)).length;
      if (score > 0 && score >= bestScore) { bestScore = score; best = ordinal; }
    });
    if (best >= 0) { map[best] = template.id; taken.add(best); } else unmatched.push(template);
  }
  if (unmatched.length) {
    const free = [];
    for (let i = 1; i < count; i++) if (!taken.has(i)) free.push(i);
    const n = Math.min(unmatched.length, free.length);
    for (let i = 0; i < n; i++) {
      const pos = Math.max(0, Math.min(Math.round(((i+0.5)*free.length)/n)-1, free.length-1));
      const slot = free[pos] ?? free[i];
      map[slot] = unmatched[i].id; taken.add(slot);
    }
  }
  return map;
}

const index = JSON.parse(readFileSync(`${ROOT}/audit/raw/section-index.json`,'utf8'));
const rows = Array.isArray(index) ? index : index.sections;

let drilled = 0;
const now_ = new Set(), before_ = new Set();
for (const row of rows) {
  const unitCode = row.unitCode || '';
  const forSection = templatesForSection({ subject: subjectFrom(unitCode), unitCode, number: row.number });
  if (!forSection.length) continue;
  drilled++;
  const json = await (await fetch(`http://localhost:3001/api/sections/${row.id}`)).json();
  const flat = buildSteps(json.content);
  const slots = flat.map((s,i)=>({s,i})).filter(({s})=> s.type==='checkin' || s.type==='legacy');
  const titles = slots.map(({s})=> s.blockTitle || s.block?.title || '');
  const now = placeQuantItems(forSection, titles);
  const before = placeControl(forSection, titles);
  const render = (m) => Object.entries(m).map(([o,t])=>{
    const slot = slots[Number(o)];
    return `ord${o}(flat ${slot?.i},${slot?.s.type},"${titles[Number(o)]}")=${t}`;
  }).join(' | ');
  Object.values(now).forEach(t=>now_.add(t));
  Object.values(before).forEach(t=>before_.add(t));
  const changed = JSON.stringify(now) !== JSON.stringify(before);
  console.log(`\n${row.id}  [${unitCode} ${row.number}]  flatSteps=${flat.length} slots=${slots.length}  templates=${forSection.map(t=>t.id).join(',')}`);
  console.log(`  titles: ${titles.map((t,i)=>`${i}:"${t}"`).join('  ')}`);
  console.log(`  BEFORE: ${render(before) || '(none)'}`);
  console.log(`  NOW   : ${render(now) || '(none)'}`);
  console.log(`  ${changed ? '*** CHANGED ***' : 'unchanged'}  |  ord0 now = ${'0' in now ? now[0] : '(free)'}  |  lastSlotIsLastStep=${slots.length?slots[slots.length-1].i===flat.length-1:'n/a'}`);
}
console.log(`\nsections with drills: ${drilled}`);
const all = ['percentage-change-business','breakeven','arr','payback','ped','percentage-change-economics','index-numbers','multiplier'];
console.log(`unplaced BEFORE: ${all.filter(t=>!before_.has(t)).join(', ')||'none'}`);
console.log(`unplaced NOW   : ${all.filter(t=>!now_.has(t)).join(', ')||'none'}`);
