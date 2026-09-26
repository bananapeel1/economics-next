import { MODEL_ANSWER_PAGES } from '../../../data/modelAnswerPages.js';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import { isValidTariff } from '../../../lib/practice-tariffs.js';
import { midBandAttempt, highestTariffItem } from '../../../lib/mid-band-answer.js';

const NUM = /(\d+)\s*(?:–|-|—)?\s*(\d+)?/;
function range(s) {
  const m = String(s || '').match(/(\d+)\s*(?:–|-|—)\s*(\d+)|(\d+)/);
  if (!m) return null;
  if (m[1]) return [Number(m[1]), Number(m[2])];
  return [Number(m[3]), Number(m[3])];
}
function scoreOf(likely) {
  // '5–6 / 8' -> [5,6]; '4 / 4' -> [4,4]
  const left = String(likely || '').split('/')[0];
  return range(left);
}
function bandOf(rangeText) {
  // 'Level 3 — 5–6 marks' -> [5,6]; '3–4 marks' -> [3,4]; 'AO3 (6 marks)' -> [6,6]
  const t = String(rangeText || '').replace(/^\s*Level\s*\d+\s*(?:—|–|-)?\s*/i, '');
  return range(t);
}
const rows = [];
for (const page of MODEL_ANSWER_PAGES) {
  const written = MODEL_ANSWERS.filter((a) => a.subject === page.subject && a.sectionNumber === page.sectionNumber).filter((a) => isValidTariff(page.subject, a.commandWord, a.marks));
  const item = highestTariffItem(written);
  if (!item) { rows.push({ page: page.slug, subject: page.subject, panel: false, why: 'no usable item' }); continue; }
  const a = midBandAttempt(item);
  const score = scoreOf(item.likelyScore);
  const ceil = a.ceiling.length ? bandOf(a.ceiling[0].range) : null;
  const overlap = score && ceil && !(score[1] < ceil[0] || score[0] > ceil[1]);
  rows.push({
    page: page.slug, subject: page.subject, panel: true, item: item.id,
    marks: item.marks, scheme: a.scheme, likely: item.likelyScore, score: score && score.join('-'),
    ceiling: a.ceiling.map(r=>r.range).join(' | '), ceilRange: ceil && ceil.join('-'),
    outOfReach: a.outOfReach.map(r=>r.range).join(' | '),
    SAME_BAND: !!overlap,
  });
}
const same = rows.filter(r => r.SAME_BAND);
console.log(`pages: ${rows.length}; with panel: ${rows.filter(r=>r.panel).length}; same-band: ${same.length}`);
console.log('slug\tsubj\tscheme\tlikely\tceiling\tSAME');
for (const r of rows) console.log(`${r.page}\t${r.subject}\t${r.scheme||''}\t${r.likely||''}\t${r.ceiling||''}\t${r.SAME_BAND?'SAME':''}`);
