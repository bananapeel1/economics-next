// Fix round 2 (check-in answer rule): read a bundle JSON and serve it through the client's own
// buildSteps + placeChapterItems (resolvePinnedItem / resolvePinnedDiagram), then print, for every
// check-in carrying both a diagram and a quiz, everything the diagram shows as text and the quiz.
// It judges nothing: the reader judges (CONTENT-GATE, the check-in answer rule).
import { readFileSync } from 'node:fs';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
const file = process.argv[2] || new URL('../../snapshots/packet-45-bundle__economics__labour-markets.json', import.meta.url);
const raw = JSON.parse(readFileSync(file));
const b = raw.tables || raw;
const flatSteps = buildSteps(b.content);
const { diagramMap, quizMap } = placeChapterItems({ flatSteps, contentData: b.content, diagramsData: b.diagrams, quizData: b.quiz, practiceData: b.practice });
const svgText = (svg) => [...String(svg || '').matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log(`steps: ${flatSteps.length}`);
for (const [idx, st] of flatSteps.entries()) if (st.type === 'checkin') console.log(`checkin at step ${idx + 1}: block ${st.blockIndex} "${st.blockTitle}"`);
for (const idx of Object.keys(quizMap)) {
  const d = diagramMap[idx]; const q = quizMap[idx]; const st = flatSteps[idx];
  if (!d) continue;
  console.log(`\n=== step ${Number(idx) + 1} · block ${st.blockIndex} "${st.blockTitle}" · quiz index ${b.quiz.indexOf(q)}`);
  console.log(`DIAGRAM title: ${d.title}`);
  console.log(`description: ${d.description}`);
  for (const k of Object.keys(d)) if (!['title', 'description', 'svg', 'scenarios', 'id'].includes(k)) console.log(`${k}: ${JSON.stringify(d[k])}`);
  if (d.svg) console.log(`svg text: ${svgText(d.svg).join(' | ')}`);
  for (const s of d.scenarios || []) {
    console.log(`view: ${JSON.stringify(Object.fromEntries(Object.entries(s).filter(([k]) => k !== 'svg')))}`);
    console.log(`  svg text: ${svgText(s.svg).join(' | ')}`);
  }
  console.log(`QUIZ ${q.id}: ${q.question}`);
  q.options.forEach((o, i) => console.log(`  ${i === q.correctIndex ? '*' : ' '} ${String.fromCharCode(65 + i)}. ${o}`));
}
