import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import * as Exp from '../../../data/modelAnswersExpansion.js';
import { MODEL_ANSWER_PAGES } from '../../../data/modelAnswerPages.js';

const econSections = new Set(MODEL_ANSWER_PAGES.filter(p => p.subject === 'economics').map(p => p.sectionId));
console.log('Economics model-answer sections:', econSections.size);

// Figure out expansion export shape
console.log('Expansion export keys:', Object.keys(Exp));

function scan(items, label) {
  let bySection = {};
  let total = 0, tagged = 0, untagged = 0, emptyArr = 0;
  for (const [key, val] of Object.entries(items)) {
    // val might be array of questions or a single question object; try to find sectionId
    const arr = Array.isArray(val) ? val : [val];
    for (const q of arr) {
      if (!q || typeof q !== 'object') continue;
      const sec = q.sectionId || q.section || key;
      total++;
      const si = q.specItems;
      if (si === undefined) untagged++;
      else if (Array.isArray(si) && si.length === 0) { emptyArr++; }
      else tagged++;
      if (!bySection[sec]) bySection[sec] = { total: 0, tagged: 0, untagged: 0, emptyArr: 0 };
      bySection[sec].total++;
      if (si === undefined) bySection[sec].untagged++;
      else if (Array.isArray(si) && si.length === 0) bySection[sec].emptyArr++;
      else bySection[sec].tagged++;
    }
  }
  console.log(`--- ${label} --- total=${total} tagged=${tagged} untagged(absent)=${untagged} emptyArr=${emptyArr}`);
  return bySection;
}

const b1 = scan(MODEL_ANSWERS, 'MODEL_ANSWERS');
