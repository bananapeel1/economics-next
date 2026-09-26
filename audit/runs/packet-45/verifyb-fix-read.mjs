// Verify B (fix round): read the SERVED ?draft=1 payload (captured by curl, not the fixer's bundle) and
// resolve each check-in's diagram and quiz with the app's resolvePinnedDiagram / resolvePinnedItem called
// directly per block, in block order (not via placeChapterItems). Print EVERY string anywhere in the
// diagram object (recursive walk, SVG <text>/<tspan> content flattened), then the question and options.
import { readFileSync } from 'node:fs';
import { resolvePinnedItem, resolvePinnedDiagram } from '../../../components/learn-mode/utils.js';
const p = JSON.parse(readFileSync(new URL('./verifyb-fix-served-draft.json', import.meta.url)));
const content = p.content, diagrams = p.diagrams, quiz = p.quiz;
console.log(`servingDraft keys: ${Object.keys(p).join(',')}`);
let step = 0; const uD = new Set(), uQ = new Set();
const strings = (o, path = '') => {
  const out = [];
  if (typeof o === 'string') {
    if (/<svg/i.test(o)) {
      const t = [...o.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/gi)].map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
      out.push(`${path} [svg text] ${t.join(' | ')}`);
      const aria = [...o.matchAll(/(aria-label|<title>)[^>]*?(?:="([^"]*)"|>([^<]*))/gi)].map((m) => m[2] || m[3]).filter(Boolean);
      if (aria.length) out.push(`${path} [svg title/aria] ${aria.join(' | ')}`);
    } else out.push(`${path}: ${o}`);
  } else if (Array.isArray(o)) o.forEach((v, i) => out.push(...strings(v, `${path}[${i}]`)));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) out.push(...strings(v, path ? `${path}.${k}` : k));
  return out;
};
content.forEach((block, bi) => {
  step += (block.sections || []).length + 1;
  const d = resolvePinnedDiagram(diagrams, { id: block.diagramId, ref: block.diagramRef }, uD);
  const q = resolvePinnedItem(quiz, { ids: block.quizIds, indices: block.quizIndices }, uQ);
  console.log(`\n##### check-in step ${step} · chapter ${bi + 1} "${block.title}" · diagram=${d ? d.id : 'none'} · quiz=${q ? q.id : 'none'}`);
  if (!d || !q) return;
  for (const line of strings(d)) console.log('  D ' + line);
  console.log(`  Q ${q.question}`);
  q.options.forEach((o, i) => console.log(`    ${i === q.correctIndex ? '*' : ' '} ${String.fromCharCode(65 + i)}. ${o}`));
  if (q.explanation) console.log(`  explanation: ${q.explanation}`);
});
console.log(`\ntotal steps: ${step}`);
