import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const m = await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`);
for (const id of ['market-failure-government-intervention-20', 'unemployment-types-8', 'negative-externality-tax-8', 'neg-externality-4']) {
  const a = m.MODEL_ANSWERS.find((x) => x.id === id);
  console.log('==', id, a.commandWord, a.marks, '| likelyScore:', a.likelyScore);
  console.log('   paraLabels:', (a.answerParagraphs || []).map((p) => p.label).join(' | '));
  console.log('   msRows:', (a.markScheme || []).map((r) => `${r.range} :: ${String(r.desc).slice(0, 70)}`).join('\n            '));
  console.log('   legend:', JSON.stringify(a.annotationLegend));
  console.log('   commentaryLen:', (a.examinerCommentary || '').length);
}
// how many distinct labels exist across the whole bank
const labels = new Map();
for (const a of m.MODEL_ANSWERS) for (const p of a.answerParagraphs || []) labels.set(p.label, (labels.get(p.label) || 0) + 1);
console.log('== all paragraph labels:', [...labels.entries()].sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k}×${n}`).join(' · '));
