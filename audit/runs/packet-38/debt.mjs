/** Packet 38 — the built bundle's new DEBT, with the subsection each finding belongs to. */
import { contextFor, loadBaseline } from '../../../scripts/_content-write.mjs';
import { validateSection } from '../../../lib/content-validator.mjs';
import { buildContent, BLOCKS, NOTES, SUBSECTIONS } from '../../../scripts/_packet38-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from '../../../scripts/_packet38-assessment.mjs';
import { DIAGRAMS } from '../../../scripts/_packet38-diagrams.mjs';

const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const strip = ({ block, ...rest }) => rest;
const content = buildContent({
  diagramIds: Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id])),
  quizIndices: Object.fromEntries(BLOCKS.map((b) => [b, byBlock(QUIZ, unpinned)[b]])),
  practiceIndices: Object.fromEntries(BLOCKS.map((b) => [b, byBlock(PRACTICE)[b]])),
});
const bundle = { content, notes: NOTES, quiz: QUIZ.map(strip), practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS, diagrams: DIAGRAMS, mistakes: MISTAKES, extras: EXTRAS };

const ctx = await contextFor('macroeconomic-objectives-policies');
const baseline = loadBaseline();
const f = validateSection(bundle, ctx).findings.filter((x) => x.tier !== 'INFO' && !baseline.has(x.key));

/* map a finding key back to a subsection slug where it carries one */
const slugOf = (key) => {
  const m = SUBSECTIONS.find((s) => key.includes(s.id.split(':').pop()));
  return m ? m.id.split(':').pop() : '';
};
const groups = {};
f.forEach((x) => { (groups[x.rule] ||= []).push(x); });
for (const [rule, xs] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n### ${rule}  ×${xs.length}`);
  xs.forEach((x) => console.log(`  [${x.key}] ${slugOf(x.key).padEnd(36)} ${x.detail}`));
}
console.log(`\n${f.length} new findings`);
