// E053: which model-answer pages, at the default (non-shell) path, render a mid-band panel whose
// "Where it tops out instead" row comes from an AO-split scheme. Uses the route's own writtenFor().
import { MODEL_ANSWER_PAGES } from '../../../data/modelAnswerPages.js';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import { isValidTariff } from '../../../lib/practice-tariffs.js';
import { highestTariffItem, midBandAttempt } from '../../../lib/mid-band-answer.js';
import { hasShell } from '../../../lib/practice-shell.js';
const rows = [];
for (const page of MODEL_ANSWER_PAGES) {
  const written = MODEL_ANSWERS.filter((a) => a.subject === page.subject && a.sectionNumber === page.sectionNumber).filter((a) => isValidTariff(page.subject, a.commandWord, a.marks));
  const shell = hasShell(written);
  const top = shell ? highestTariffItem(written.filter((a) => a.criteria?.length), { levelsOnly: true }) : highestTariffItem(written);
  const at = top ? midBandAttempt(top) : null;
  rows.push(`${shell ? 'SHELL ' : '      '}${page.subject.padEnd(9)} ${page.sectionNumber}  ${at ? at.scheme.padEnd(10) : 'no panel  '} ${top ? top.id : ''}${at && at.scheme === 'objectives' ? '  ceiling: ' + at.ceiling.map((r) => r.range + ' ' + r.desc).join(' / ').slice(0, 90) : ''}`);
}
console.log(rows.join('\n'));
console.log(`\nobjectives-scheme panels on non-shell pages: ${rows.filter((r) => !r.startsWith('SHELL') && r.includes('objectives')).length}`);
