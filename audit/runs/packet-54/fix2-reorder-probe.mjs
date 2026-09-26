// Fix round 2 probe: reads the DUMPED BUNDLE (not the runner's modules) and grades both
// submissions the founder named with the shipping widget grader, lib/recall-widgets.js.
import { readFileSync } from 'node:fs';
import { gradeReorder } from '../../../lib/recall-widgets.js';
const b = JSON.parse(readFileSync('audit/snapshots/packet-54-bundle__business__assessing-competitiveness.json', 'utf8'));
const hits = [];
(function walk(o, path) {
  if (!o || typeof o !== 'object') return;
  if (o.type === 'reorder' && Array.isArray(o.correctOrder) && /loan/i.test(o.correctOrder[0])) hits.push({ path, r: o });
  for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`);
})(b.tables, 'tables');
console.log('reorders with a loan first:', hits.length);
for (const { path, r } of hits) {
  console.log(path); console.log(' prompt:', r.prompt); r.correctOrder.forEach((x, i) => console.log(`  ${i + 1}. ${x}`));
  const co = r.correctOrder; const I = co.findIndex((x) => /interest/i.test(x) && !/cover/i.test(x)); const G = co.findIndex((x) => /gearing/i.test(x));
  const loanInterestGearing = [co[0], co[I], co[G], co[3], co[4]];
  const loanGearingInterest = [co[0], co[G], co[I], co[3], co[4]];
  console.log(' loan -> interest -> gearing:', JSON.stringify(gradeReorder(loanInterestGearing, co)));
  console.log(' loan -> gearing -> interest:', JSON.stringify(gradeReorder(loanGearingInterest, co)));
}
// the body sentence of the step that carries it
const s = JSON.stringify(b.tables);
const m = s.match(/But a second loan-financed bakery[^.]*\./); console.log('body:', m ? m[0] : 'NOT FOUND');
const chain = s.match(/From a large loan to financial risk.{0,700}/); console.log('extras chain:', chain ? chain[0].slice(0, 700) : 'NOT FOUND');
