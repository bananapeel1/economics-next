// Read-only probe. Reads the banks DIRECTLY (not via spec-coverage-check.mjs), so the numbers it
// prints are obtained by a different method than the tool this packet refactors.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const m = await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`);
for (const topic of ['1.3.5', '2.3.1']) {
  console.log('=== economics ' + topic);
  for (const a of m.MODEL_ANSWERS.filter((x) => x.subject === 'economics' && x.sectionNumber === topic)) {
    console.log(' ', a.id, '|', a.commandWord, a.marks, '| specItems=', JSON.stringify(a.specItems),
      '| ao=', JSON.stringify(a.ao), '| kind=', a.kind, '| stim=', JSON.stringify(a.stimulusRef),
      '| ms=', (a.markScheme || []).map((x) => x.range).join(' / '), '| paras=', (a.answerParagraphs || []).length);
  }
}
const tags = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/runs/packet-12.1/section_practice-tags.json'), 'utf8'));
console.log('=== staged practice tag rows:', tags.rows.length);
for (const slug of ['market-failure', 'measures-economic-performance']) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/content-sections', `economics__${slug}.json`), 'utf8'));
  console.log('--- ' + slug);
  for (const p of j.practice) {
    const t = tags.rows.find((r) => r.question === p.question);
    console.log('  ', p.command, p.marks, '->', t ? JSON.stringify(t.spec_items) : 'UNTAGGED');
  }
}
