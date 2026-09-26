import { MODEL_ANSWER_PAGES } from '../../../data/modelAnswerPages.js';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import { isValidTariff } from '../../../lib/practice-tariffs.js';
import { midBandAttempt } from '../../../lib/mid-band-answer.js';

function range(s) {
  const m = String(s || '').match(/(\d+)\s*(?:–|-|—)\s*(\d+)|(\d+)/);
  if (!m) return null;
  return m[1] ? [Number(m[1]), Number(m[2])] : [Number(m[3]), Number(m[3])];
}
const scoreOf = (l) => range(String(l || '').split('/')[0]);
const bandOf = (t) => range(String(t || '').replace(/^\s*Level\s*\d+\s*(?:—|–|-)?\s*/i, ''));
function sameBand(item, a) {
  if (!a || !a.ceiling.length) return false;
  const s = scoreOf(item.likelyScore); const c = bandOf(a.ceiling[0].range);
  if (!s || !c) return false;
  return !(s[1] < c[0] || s[0] > c[1]);
}
const SAME = ['marketing-mix','entrepreneurs-leaders','introductory-concepts','demand','price-determination','national-income','types-sizes-businesses','revenue-costs-profits','labour-markets','government-intervention-firms'];
for (const page of MODEL_ANSWER_PAGES) {
  if (!SAME.some(s => page.slug === `${s}-model-answers`)) continue;
  const written = MODEL_ANSWERS.filter(a => a.subject === page.subject && a.sectionNumber === page.sectionNumber)
    .filter(a => isValidTariff(page.subject, a.commandWord, a.marks));
  const usable = written.map(i => ({ i, a: midBandAttempt(i) })).filter(x => x.a);
  const honest = usable.filter(x => !sameBand(x.i, x.a));
  console.log(`\n${page.slug}  (written ${written.length})`);
  for (const { i, a } of usable) {
    console.log(`   ${i.id}  ${i.commandWord} ${i.marks}  likely=${i.likelyScore}  scheme=${a.scheme}  ceiling=${a.ceiling.map(r=>r.range).join('|')||'-'}  same=${sameBand(i,a)}`);
  }
  console.log(`   -> fallback: ${honest.length ? honest.sort((x,y)=>Number(y.i.marks)-Number(x.i.marks))[0].i.id : 'NONE — panel disappears'}`);
}
