// Which quiz item each check-in shows, through the client's OWN buildSteps + placeChapterItems (resolvePinnedItem /
// resolvePinnedDiagram), on three inputs: the new dump as a paying student gets it (full bank, pins as authored), the
// served ?draft=1 payload (signed out), and the served live payload (signed out). Then, for chapter 3, every surface
// of its diagram as text, and the question with its options, for the READER. It judges nothing (CONTENT-GATE.md,
// the check-in answer rule). Run from the worktree root: node audit/runs/packet-46/fix-checkin-shows.mjs
import { readFileSync } from 'node:fs';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
const load = (f) => { const raw = JSON.parse(readFileSync(f, 'utf8')); return raw.tables || raw; };
const inputs = {
  'new dump (paying, full bank)': load('audit/snapshots/packet-46-bundle__economics__growth-development.json'),
  'served ?draft=1 (signed out)': load('audit/runs/packet-46/fix-api-draft-after.json'),
  'served live (signed out)': load('audit/runs/packet-46/fix-api-live-after.json'),
};
const svgText = (svg) => [...String(svg || '').matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
let ch3;
for (const [name, b] of Object.entries(inputs)) {
  const flatSteps = buildSteps(b.content);
  const { diagramMap, quizMap } = placeChapterItems({ flatSteps, contentData: b.content, diagramsData: b.diagrams, quizData: b.quiz, practiceData: b.practice });
  console.log(`\n## ${name}: ${flatSteps.length} steps, ${b.quiz.length} quiz items`);
  for (const [idx, st] of flatSteps.entries()) {
    if (st.type !== 'checkin') continue;
    const q = quizMap[idx], d = diagramMap[idx];
    console.log(`  step ${idx + 1}/${flatSteps.length} ch${st.blockIndex + 1}: diagram ${d?.id?.split(':').pop() ?? '-'} · quiz ${q ? `${q.id.split(':').pop()} (array [${b.quiz.indexOf(q)}])` : '-'}`);
    if (st.blockIndex === 2 && name.startsWith('served ?draft')) ch3 = { d, q, step: idx + 1 };
  }
}
const { d, q, step } = ch3;
console.log(`\n## chapter-3 check-in as the served draft places it (step ${step}), every diagram surface, then the quiz`);
console.log(`title: ${d.title}\ndescription: ${d.description}`);
d.checklist.forEach((c) => console.log(`checklist: ${c}`));
for (const s of d.scenarios) console.log(`view "${s.label}": ${svgText(s.svg).join(' | ')}`);
console.log(`QUIZ ${q.id}: ${q.question}`);
q.options.forEach((o, i) => console.log(`  ${i === q.correctIndex ? '*' : ' '} ${o}`));
