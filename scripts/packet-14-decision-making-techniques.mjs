#!/usr/bin/env node
/**
 * PACKET 14 — decision-making-techniques, the first content section and the format pilot.
 *
 *   node scripts/packet-14-decision-making-techniques.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-14-decision-making-techniques.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-14-decision-making-techniques.mjs --dump     also write the bundle to audit/snapshots/
 *
 * The content lives in scripts/_packet14-content.mjs (Learn Mode blocks and Notes),
 * scripts/_packet14-assessment.mjs (quiz, practice, flashcards, mistakes, extras) and
 * scripts/_packet14-diagrams.mjs (the five SVGs). This file assembles the bundle, pins each block to its
 * diagram, quiz items and practice items, and runs the checks a verifier will run:
 *
 *   - the validator over the whole would-be section, against the committed baseline (0 new BLOCK is the
 *     staging condition; this packet also aims at 0 new DEBT and the smallest possible carried DEBT);
 *   - the reading budget per subsection (step.words, 350), printed for every subsection;
 *   - phrases that must not survive: pounds sterling, sensitivity analysis, Outline, an uncited claim
 *     about examiners, and break-even anywhere but the one synoptic sentence and its notes link;
 *   - the numbers the body works must agree with the numbers the diagrams draw (Layer 5): the same
 *     payback, EMVs, net gains, floats and contribution appear in both, checked by string.
 *
 * Staging goes through stageBundle() in scripts/_content-write.mjs: the whole section is validated once
 * and every changed table is written to `draft` and read back. Publishing is scripts/publish-section.mjs.
 */
import { writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords } from './_packet14-util.mjs';
import { buildContent, SUBSECTIONS, NOTES } from './_packet14-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet14-assessment.mjs';
import { DIAGRAMS } from './_packet14-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

// Pins. The first index in each list is what the chapter check-in shows (resolvePinnedItem takes the
// first unused), so it is the item that best closes the chapter; the rest feed the quiz tab and the
// pre/post tests. Not 0,1,2,… in block order, which is the sign nobody chose them (pins.identity).
const byBlock = (items) => items.reduce((m, it, i) => { (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ);
const practiceByBlock = byBlock(PRACTICE);
const first = (list, i) => [i, ...list.filter((x) => x !== i)];
const quizIndices = {
  'Sales Forecasting': first(quizByBlock['Sales Forecasting'], 3),           // the scatter-graph item closes the chapter
  'Investment Appraisal': first(quizByBlock['Investment Appraisal'], 14),    // time value of money
  'Decision Trees': first(quizByBlock['Decision Trees'], 18),                // the net-gain calculation
  'Critical Path Analysis': first(quizByBlock['Critical Path Analysis'], 23), // the float calculation
  'Contribution': first(quizByBlock['Contribution'], 30),                    // the special order
};
const practiceIndices = {
  'Sales Forecasting': first(practiceByBlock['Sales Forecasting'], 0),
  'Investment Appraisal': first(practiceByBlock['Investment Appraisal'], 2), // the NPV Calculate
  'Decision Trees': practiceByBlock['Decision Trees'],
  'Critical Path Analysis': practiceByBlock['Critical Path Analysis'],
  'Contribution': practiceByBlock['Contribution'],
};
const diagramIds = {
  'Sales Forecasting': DIAGRAMS[0].id,
  'Investment Appraisal': DIAGRAMS[1].id,
  'Decision Trees': DIAGRAMS[2].id,
  'Critical Path Analysis': DIAGRAMS[3].id,
  'Contribution': DIAGRAMS[4].id,
};
const strip = ({ block, ...rest }) => rest;
const bundle = {
  content: buildContent({ diagramIds, quizIndices, practiceIndices }),
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
if (count(/£/g)) problems.push(`pounds sterling ×${count(/£/g)} (one currency per section, dollars)`);
if (count(/sensitivity/gi)) problems.push(`"sensitivity" ×${count(/sensitivity/gi)} (not in the specification)`);
if (count(/\bOutline\b/g)) problems.push('"Outline" (not an IAL Business command word)');
if (count(/\bbreak-?even\b/gi) > 2) problems.push(`"break-even" ×${count(/\bbreak-?even\b/gi)} (allowed twice: the synoptic sentence and its notes link)`);
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+)?(reward|penalise|expect|look for|want|like|credit|award|give)/i.test(sent) && !/\bWBS1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);
const ids = allStrings(bundle).length && [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id)).concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${dup.join(', ')}`);

// Layer 5 by string: the figures the body works must be the figures the diagrams and notes carry.
const must = ['2.8 years', '$340,000', '$140,000', '$180,000', '12.5%', '+$3,850', 'A–B–D–F', '$3.50', '$70,000', '$25,000', '43.0', '45.7', '48.3', '50.7'];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 14 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall).length;
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls} recalls · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
console.log('pins:'); for (const b of bundle.content) console.log(`  ${b.title.padEnd(24)} diagram ${b.diagramId.split(':').pop()}  quiz [${b.quizIndices.join(',')}]  practice [${b.practiceIndices.join(',')}]`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no sensitivity analysis, no Outline, no uncited examiner claim, ids unique, worked figures agree across body, notes, diagrams and assessment');

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
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 140)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 140)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const p = `audit/snapshots/packet-14-bundle__business__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-14-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts, then publish with scripts/publish-section.mjs decision-making-techniques --confirm.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log(`review: node scripts/publish-section.mjs ${SECTION}`);
