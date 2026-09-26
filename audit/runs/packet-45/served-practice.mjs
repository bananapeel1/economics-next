// Fix round 1, independent of the runner: read the DUMPED bundle file (not the modules) and serve it
// through the client's own placement code (lib/learn-steps.js buildSteps + lib/checkin-placement.js
// placeChapterItems, both identical to origin/main), then print what each chapter's check-in shows.
import { readFileSync } from 'node:fs';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
const raw = JSON.parse(readFileSync(new URL('../../snapshots/packet-45-bundle__economics__labour-markets.json', import.meta.url)));
const b = raw.tables;
const flatSteps = buildSteps(b.content);
const { practiceMap } = placeChapterItems({ flatSteps, contentData: b.content, diagramsData: b.diagrams, quizData: b.quiz, practiceData: b.practice });
const served = new Set();
for (const [idx, p] of Object.entries(practiceMap)) {
  const st = flatSteps[idx]; served.add(p.id);
  console.log(`block ${st.blockIndex} "${st.blockTitle}": ${p.command} ${p.marks}`);
}
for (const p of b.practice) if (!served.has(p.id)) console.log(`NOT SERVED in Learn Mode: ${p.command} ${p.marks}`);
