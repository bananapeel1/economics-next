// E053 after the founder decision (26 Sep 2026): the census of midband-census.mjs, run on the
// default path BEFORE (unrestricted highestTariffItem, as at b1942fe) and AFTER (pagePanelItem, what
// SectionModelAnswersPage.jsx now calls). The shell path is unchanged and printed for reference.
import { MODEL_ANSWER_PAGES } from '../../../data/modelAnswerPages.js';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import { isValidTariff } from '../../../lib/practice-tariffs.js';
import { highestTariffItem, midBandAttempt, pagePanelItem } from '../../../lib/mid-band-answer.js';
import { hasShell } from '../../../lib/practice-shell.js';
const rows = []; const tally = { removed: 0, kept: 0, none: 0, other: 0 };
const cell = (top) => { const at = top ? midBandAttempt(top) : null; return at ? `${at.scheme.padEnd(10)} ${top.id}` : 'no panel'; };
for (const page of MODEL_ANSWER_PAGES) {
  const written = MODEL_ANSWERS.filter((a) => a.subject === page.subject && a.sectionNumber === page.sectionNumber).filter((a) => isValidTariff(page.subject, a.commandWord, a.marks));
  const shell = hasShell(written);
  let before, after;
  if (shell) { before = after = highestTariffItem(written.filter((a) => a.criteria?.length), { levelsOnly: true }); }
  else { before = highestTariffItem(written); after = pagePanelItem(written); }
  const b = cell(before), a = cell(after);
  const verdict = shell ? 'shell (unchanged)' : b === a ? (a === 'no panel' ? 'none' : 'kept') : a === 'no panel' && b.startsWith('objectives') ? 'REMOVED' : 'OTHER CHANGE';
  if (!shell) tally[{ none: 'none', kept: 'kept', REMOVED: 'removed' }[verdict] || 'other']++;
  rows.push(`${shell ? 'SHELL ' : '      '}${page.subject.padEnd(9)} ${page.sectionNumber}  before: ${b.padEnd(46)} after: ${a.padEnd(46)} ${verdict}`);
}
console.log(rows.join('\n'));
console.log(`\nnon-shell pages: ${tally.removed} panels removed (objectives), ${tally.kept} kept unchanged (levels), ${tally.none} without a panel before and after, ${tally.other} other changes`);
