#!/usr/bin/env node
/**
 * PACKET 15 — introductory-concepts, the section students meet first and abandon most.
 *
 *   node scripts/packet-15-introductory-concepts.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-15-introductory-concepts.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-15-introductory-concepts.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet15-content.mjs (blocks and Notes), scripts/_packet15-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet15-diagrams.mjs (the five SVGs). This file
 * assembles the bundle, pins each block to its diagram, quiz and practice items, and runs the checks a
 * verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - phrases that must not survive: pounds sterling, Assess and Outline (neither is an IAL ECONOMICS
 *     command word), comparative advantage and the price mechanism's functions (both belong to other
 *     topics), the UK-only institutions the March copy was built on, and any uncited examiner claim;
 *   - every practice command word and tariff checked against audit/raw/tariff-census.json for economics;
 *   - the frontier's own geometry: the emitted polyline is re-sampled and its gradient must steepen
 *     monotonically, which is what accuracy-01 found the March path did not do;
 *   - Layer 5 by string: the figures the body works appear in the diagrams, the notes and the assessment.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, PPF_POINTS } from './_packet15-util.mjs';
import { buildContent, SUBSECTIONS, NOTES } from './_packet15-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet15-assessment.mjs';
import { DIAGRAMS } from './_packet15-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

const B1 = 'The Nature of Economics', B2 = 'Positive and Normative Economics';
const B3 = 'Scarcity, Choice and Opportunity Cost', B4 = 'Production Possibility Frontiers';
const B5 = 'Specialisation, Money and Financial Markets', B6 = 'Free Market, Mixed and Command Economies';

/*
 * Exactly THREE quiz items are deliberately left unpinned. PreTest.jsx takes the first three items no block
 * has reserved, in array order and stably since F079, so those three ARE the pre-test — and structure-06's
 * complaint was that they used to be untaught concepts and near-duplicates. One core item from chapters 3, 4
 * and 5 makes the pre-test a fair, representative sample of material the section teaches, and stops a student
 * meeting the same question again minutes later with the answer already revealed.
 *
 * Three, not four: a fourth unpinned item would never reach the pre-test (which slices at three) and would
 * simply be a question no block surfaces, which is structure-01's complaint in miniature. Layer 6 read the
 * four-item version as an off-by-one in four blocks, which is a fair reading of what it looked like.
 */
const PRETEST_POOL = [
  'The basic economic problem exists because:',
  'A point inside the production possibility frontier indicates that:',
  'Adam Smith argued that the division of labour increases output because:',
];
const unpinned = new Set(QUIZ.map((q, i) => (PRETEST_POOL.includes(q.question) ? i : -1)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Why can economists rarely conduct controlled experiments?'),
  [B2]: first(quizByBlock[B2], 'Which of the following is a normative statement?'),
  [B3]: first(quizByBlock[B3], 'Which of the following is most likely to be a free good?'),
  [B4]: first(quizByBlock[B4], 'Maraya moves along its frontier from C (20 consumer, 33 capital) to D (30 consumer, 25 capital), in thousands of units. What is the opportunity cost of one extra consumer good?'),
  [B5]: first(quizByBlock[B5], 'An importer agrees today on the price of a currency to be delivered in six months. Which role of financial markets is being used?'),
  [B6]: first(quizByBlock[B6], 'Which of the following is a role of the state in a mixed economy?'),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5], [B6]: practiceByBlock[B6],
};
const diagramIds = {
  // A drawing of "a model" would be decoration, not teaching. `null`, not undefined: null is decided-none
  // (`decidedNoDiagram`, lib/checkin-fallback.js on main), while a missing key lets matchDiagramsToBlocks
  // guess a diagram from title words (packet 2.91). Packet 15.1.
  [B1]: null, [B2]: null,
  [B3]: DIAGRAMS[0].id, [B4]: DIAGRAMS[1].id, [B5]: DIAGRAMS[2].id, [B6]: DIAGRAMS[3].id,
};
const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });
// No subsection-level diagram pin: only a CHECK-IN step carries a diagramId, and it comes from the BLOCK
// (lib/learn-steps.js:44-55). Verify B caught an earlier version of this packet pinning the movements-and-
// shifts diagram to a subsection, where Learn Mode never reads it — reachable only through the Diagrams tab,
// which is exactly what structure-02 complains about. Chapter 4's five views now live on one pinned diagram.

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  diagrams: DIAGRAMS,
  extras: EXTRAS,
  mistakes: MISTAKES,
};

/* ── the packet's own checks ───────────────────────────────────────────────── */

const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const texts = allStrings(bundle);
const problems = [];
const count = (re) => texts.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£/g, 'pounds sterling (one currency per section, dollars)');
ban(/\bAssess\b/g, '"Assess" (not an IAL Economics command word — that is Business)');
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject)');
ban(/\bcomparative advantage\b/gi, '"comparative advantage" (Unit 4, not 1.3.1 — specGap-06)');
ban(/\b(signalling|rationing function|invisible hand)\b/gi, 'the price mechanism\'s functions (1.3.4 price-determination — structure-07)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|council tax|HS2)\b/g, 'a UK-only institution (locale.institution)');
ban(/\bONS\b/g, 'the ONS (locale.institution)');
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

// Practice command words and tariffs against the specification's own Appendix 6.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}

// accuracy-01, checked on the emitted path rather than asserted: walk the polyline the diagram actually
// carries and require the gradient to steepen at every step. A convex bulge anywhere fails here.
for (const sc of DIAGRAMS[1].scenarios.filter((x) => /frontier|Opportunity/.test(x.label))) {
  for (const [, pts] of [...sc.svg.matchAll(/<polyline points="([^"]+)"/g)].map((m) => [0, m[1]])) {
    const p = pts.split(' ').map((s) => s.split(',').map(Number));
    let prev = -Infinity;
    for (let i = 1; i < p.length; i += 1) {
      const g = (p[i][1] - p[i - 1][1]) / (p[i][0] - p[i - 1][0]);
      if (g < prev - 1e-6) { problems.push(`the frontier in "${sc.label}" is not concave: gradient eases at point ${i}`); break; }
      prev = g;
    }
  }
}
// and the six labelled points are the function's own values, not a table drawn beside a curve
for (const pt of PPF_POINTS) {
  const shown = `(${pt.C}, ${pt.K})`;
  if (!DIAGRAMS[1].scenarios[0].svg.includes(shown) && pt.name !== 'F') problems.push(`point ${pt.name} ${shown} is not labelled on the frontier`);
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Maraya's figures are the same figures wherever they appear.
// The Calculate item's own figures (11 ÷ 10 = 1.1) are deliberately absent from the body: the body works
// C to D and lists 1.1 as a result, so the student must do the D to E arithmetic rather than read it off.
const must = ['(0, 40)', '(20, 33)', '(30, 25)', '(50, 0)', '8 ÷ 10', '0.8 capital goods', '0.2', '1.4'];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 15 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(44)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 74)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no Assess or Outline, no comparative advantage, no price-mechanism functions, no UK-only institution, no uncited examiner claim, every practice tariff in the census, the frontier concave along its whole length, ids unique, Maraya\'s figures agreeing across every surface');

const live = await loadBundle(SECTION);
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx).findings;
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
console.log(`\nvalidator: before ${before.filter((f) => f.tier === 'BLOCK').length} BLOCK / ${before.filter((f) => f.tier === 'DEBT').length} DEBT → after ${after.summary.block} BLOCK / ${after.summary.debt} DEBT; ${cleared.length} baselined findings cleared, ${carried.length} carried, ${newBlocks.length} new BLOCK, ${newDebt.length} new DEBT`);
for (const f of newBlocks) console.log(`  NEW BLOCK  ${f.rule.padEnd(24)} ${f.detail}`);
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 150)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 150)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const p = `audit/snapshots/packet-15-bundle__economics__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-15-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts, then publish with scripts/publish-section.mjs ${SECTION} --confirm.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log(`review: node scripts/publish-section.mjs ${SECTION}`);
