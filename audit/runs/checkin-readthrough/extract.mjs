// For every live section, every check-in with BOTH a diagram and a quick quiz, as placed by main's own code.
// Writes one text block per pair: the diagram's visible text, then the question, options and key.
import { writeFileSync } from 'node:fs';
const root = '/Users/arongijsel/Claude APP/revvy-paywall-release';
const { placeChapterItems } = await import(`${root}/lib/checkin-placement.js`);
const { buildSteps } = await import(`${root}/lib/learn-steps.js`);
const svgText = (svg) => [...String(svg || '').matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
const ids = process.argv[2].split(',');
const out = []; let pairs = 0;
for (const id of ids) {
  const r = await fetch(`https://revvylearn.com/api/sections/${id}`); if (!r.ok) { out.push(`## ${id}: HTTP ${r.status}`); continue; }
  const j = await r.json(); const sec = j.data || j; const content = sec.content || [];
  const steps = buildSteps(content) || [];
  const { diagramMap, quizMap } = placeChapterItems({ flatSteps: steps, contentData: content, diagramsData: sec.diagrams || [], quizData: sec.quiz || [], practiceData: sec.practice || [] });
  steps.forEach((s, i) => {
    if (s.type !== 'checkin' && s.type !== 'legacy') return;
    const d = diagramMap[i], q = quizMap[i]; if (!d || !q) return;
    pairs++;
    const views = (d.scenarios || []).map((v) => `  view "${v.label}": ${svgText(v.svg).join(' | ')}`);
    out.push([`### ${id} · step ${i + 1} · chapter "${s.blockTitle}"`,
      `DIAGRAM title: ${d.title}`, `description: ${d.description || ''}`,
      `checklist: ${(d.checklist || []).join(' / ')}`,
      `svg text: ${svgText(d.svg).join(' | ')}`, ...views,
      `QUESTION: ${q.question}`, ...(q.options || []).map((o, k) => `  ${String.fromCharCode(65 + k)}. ${o}${k === Number(q.correctIndex) ? '   <-- KEY' : ''}`), ''].join('\n'));
  });
}
writeFileSync(process.argv[3], out.join('\n'));
console.log(`${ids.length} sections, ${pairs} diagram+quiz check-ins -> ${process.argv[3]}`);
