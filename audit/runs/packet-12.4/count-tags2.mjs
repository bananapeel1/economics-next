import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import * as Exp from '../../../data/modelAnswersExpansion.js';
import { MODEL_ANSWER_PAGES } from '../../../data/modelAnswerPages.js';

const econNums = new Set(MODEL_ANSWER_PAGES.filter(p => p.subject === 'economics').map(p => p.sectionNumber));

function scanArr(arr, label) {
  const bySec = {};
  let total=0, tagged=0, untagged=0;
  for (const q of Object.values(arr)) {
    if (!q || typeof q !== 'object') continue;
    total++;
    const sn = q.sectionNumber || 'NO_SECTION_NUM';
    const subj = q.subject;
    if (!bySec[sn]) bySec[sn] = { total:0, tagged:0, untagged:0, subject: subj, title: q.sectionTitle };
    bySec[sn].total++;
    if (q.specItems === undefined) { untagged++; bySec[sn].untagged++; }
    else { tagged++; bySec[sn].tagged++; }
  }
  console.log(`=== ${label}: total=${total} tagged=${tagged} untagged=${untagged} ===`);
  const nums = Object.keys(bySec).sort();
  for (const n of nums) {
    const s = bySec[n];
    const inEcon22 = econNums.has(n) ? 'ECON-22' : '';
    console.log(`${n}\t${s.subject}\t${s.title}\ttotal=${s.total}\ttagged=${s.tagged}\tuntagged=${s.untagged}\t${inEcon22}`);
  }
  return bySec;
}

console.log('Expansion keys', Object.keys(Exp));
scanArr(MODEL_ANSWERS, 'MODEL_ANSWERS');
console.log();
const expArr = Exp.EXPANSION_ANSWERS;
console.log('EXPANSION_ANSWERS is array?', Array.isArray(expArr), 'len', expArr && Object.keys(expArr).length);
if (expArr) scanArr(expArr, 'EXPANSION_ANSWERS');

// which of the 22 econ sectionNumbers have ZERO entries in MODEL_ANSWERS+EXPANSION combined
