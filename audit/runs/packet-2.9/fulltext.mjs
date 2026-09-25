import { readFileSync, writeFileSync } from 'node:fs';
import { buildSteps } from '/Users/arongijsel/Claude APP/economics-next-remediation/lib/learn-steps.js';
const all = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const dir = process.argv[3];
const K = ['diagramRef','quizIndices','practiceIndices','diagramId','quizIds','practiceIds'];
const flat = (body) => (body || []).map((x) => {
  if (x.type === 'flow') return 'FLOW: ' + (x.steps || []).join(' -> ') + (x.result ? ' => ' + x.result : '');
  if (x.type === 'bullets') return (x.items || []).map((i) => '• ' + (typeof i === 'string' ? i : JSON.stringify(i))).join('\n');
  return x.text || JSON.stringify(x);
}).join('\n');
let total = 0;
for (const r of Object.values(all)) {
  const content = r.live.content || [];
  const steps = buildSteps(content) || [];
  if (steps.filter(s => s.type === 'checkin' || s.type === 'legacy').some(s => K.some(k => s[k]))) continue;
  let out = `SECTION ${r.id} — ${r.title}\n`;
  content.forEach((b, bi) => {
    out += `\n########## CHAPTER ${bi + 1} (block ${bi}, id ${b.id}): ${b.title}\n`;
    for (const s of b.sections || []) {
      out += `\n--- ${s.title}\n${flat(s.body)}\n`;
      if (s.keyIdea) out += `KEY IDEA: ${s.keyIdea}\n`;
      if (s.misconception) out += `MISCONCEPTION: ${s.misconception}\n`;
      if (s.realExample) out += `EXAMPLE: ${s.realExample.text || s.realExample}\n`;
    }
    if (b.takeaway) out += `TAKEAWAY: ${typeof b.takeaway === 'string' ? b.takeaway : JSON.stringify(b.takeaway)}\n`;
  });
  out += `\n########## QUIZ BANK (order as stored)\n`;
  (r.live.quiz || []).forEach((q, i) => {
    out += `q${i} ${q.id}\n  Q: ${q.question}\n` + (q.options || []).map((o, j) => `  ${j === q.correctIndex ? '*' : ' '} ${o}`).join('\n') + '\n';
  });
  out += `\n########## PRACTICE BANK (order as stored)\n`;
  (r.live.practice || []).forEach((p, i) => { out += `p${i} ${p.id} (${p.marks} marks)\n  ${p.question}\n`; });
  writeFileSync(`${dir}/${r.id}.txt`, out);
  total += out.length;
}
console.log('chars', total);
