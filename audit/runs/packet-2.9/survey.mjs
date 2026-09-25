import { readFileSync } from 'node:fs';
import { buildSteps } from '/Users/arongijsel/Claude APP/economics-next-remediation/lib/learn-steps.js';
const all = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const K = ['diagramRef','quizIndices','practiceIndices','diagramId','quizIds','practiceIds'];
const info = (content) => {
  const steps = buildSteps(content || []) || [];
  const slots = steps.filter(s => s.type === 'checkin' || s.type === 'legacy');
  const pinned = slots.some(s => K.some(k => s[k]));
  return { chapters: slots.length, checkins: slots.filter(s=>s.type==='checkin').length, pinned };
};
let n = 0;
for (const r of Object.values(all)) {
  const L = info(r.live.content);
  const d = r.draft;
  const drafted = Object.entries(d).filter(([, v]) => v != null).map(([k]) => k);
  const D = d.content ? info(d.content) : null;
  if (!L.pinned) n++;
  const q = (r.live.quiz||[]).length, p = (r.live.practice||[]).length;
  const ids = (r.live.quiz||[]).every(x=>x&&x.id) && (r.live.practice||[]).every(x=>x&&x.id);
  console.log([L.pinned ? 'PINNED  ' : 'UNPINNED', r.id.padEnd(38), `ch ${L.chapters}/${L.checkins}`, `q ${q} p ${p}`, ids?'ids':'NOIDS', drafted.length ? `draft[${drafted.join(',')}]` + (D ? ` draftPinned=${D.pinned} ch${D.chapters}` : '') : ''].join('  '));
}
console.log('unpinned live', n);
