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
import { mistakeGaps } from '../lib/mistakes-shape.js';

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

/* ── packet 14.1 (26 Sep 2026): the checks later packets added, applied to the pilot ──────────────── */

// Mistakes render through lib/mistakes-shape.js on main; a card missing a field shows an empty box.
for (const m of bundle.mistakes) { const gaps = mistakeGaps(m); if (gaps.length) problems.push(`mistake "${m.title}" would render without ${gaps.join(', ')}`); }

// The length tell. The validator allows 1.5x; packet 14's own rule 5 says about 1.2x, and a reviewer
// still finds tells inside 1.5. Counted and printed, and anything above 1.2x is a problem.
const longest = [];
bundle.quiz.forEach((q, i) => {
  const L = q.options.map((o) => o.length);
  const rest = Math.max(...L.filter((_, j) => j !== q.correctIndex));
  if (L[q.correctIndex] > rest) longest.push(i);
  if (L[q.correctIndex] > 1.2 * rest) problems.push(`quiz[${i}] correct option is ${(L[q.correctIndex] / rest).toFixed(2)}x its longest distractor`);
});

// The collision guard, ported from packet 49 (packet 40's, tolerance 1.2) and run on the EMITTED SVG.
// Two changes for this section's diagrams: text drawn with a rotate() transform (the y-axis titles) is
// measured nowhere, because its box is not where x/y says; and the frame is 500 units.
const TOL = 1.2;
const estWidth = (t, size) => String(t).length * size * 0.56;
const attrOf = (s, k) => { const r = s.match(new RegExp(`\\b${k}="([^"]*)"`)); return r ? r[1] : null; };
const boxesOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)]
  .filter((m) => m[2].trim() && !/rotate\(/.test(m[1]))
  .map((m) => {
    const x = parseFloat(attrOf(m[1], 'x')), y = parseFloat(attrOf(m[1], 'y')), size = parseFloat(attrOf(m[1], 'font-size')) || 11;
    const anchor = attrOf(m[1], 'text-anchor') || 'start', w = estWidth(m[2], size);
    const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x;
    return { body: m[2], x, y, size, left, right: left + w, top: y - size * 0.8, bottom: y + size * 0.25 };
  });
const segmentsOf = (svg) => [
  ...[...svg.matchAll(/<line\b([^>]*)>/g)].map((m) => ({ x1: +attrOf(m[1], 'x1'), y1: +attrOf(m[1], 'y1'), x2: +attrOf(m[1], 'x2'), y2: +attrOf(m[1], 'y2') })),
  ...[...svg.matchAll(/<(?:polyline|polygon)\b[^>]*\bpoints="([^"]+)"/g)].flatMap((m) => {
    const p = m[1].trim().split(/\s+/).map((q) => q.split(',').map(Number));
    return p.slice(1).map((q, i) => ({ x1: p[i][0], y1: p[i][1], x2: q[0], y2: q[1] }));
  }),
];
const collides = (a, b) => Math.abs(a.y - b.y) <= TOL * Math.max(a.size, b.size) && a.left < b.right && b.left < a.right;
const crossed = (ln, bx) => {
  const from = Math.max(Math.min(ln.x1, ln.x2), bx.left), to = Math.min(Math.max(ln.x1, ln.x2), bx.right);
  if (from > to) return false;
  const yAt = (x) => ln.y1 + ((x - ln.x1) / (ln.x2 - ln.x1)) * (ln.y2 - ln.y1);
  const ys = ln.x2 === ln.x1 ? [ln.y1, ln.y2] : [yAt(from), yAt(to)];
  return ys.some((y) => y >= bx.top && y <= bx.bottom) || (Math.min(...ys) < bx.top && Math.max(...ys) > bx.bottom);
};
const svgViews = (d) => (d.scenarios?.length ? d.scenarios.map((s) => [`${d.title} / ${s.label}`, s.svg]) : [[d.title, d.svg]]);
for (const d of bundle.diagrams) for (const [where, svg] of svgViews(d)) {
  const vbW = Number((svg.match(/viewBox="0 0 ([\d.]+)/) || [])[1]);
  const boxes = boxesOf(svg);
  for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) if (collides(boxes[i], boxes[j])) problems.push(`${where}: "${boxes[i].body.slice(0, 26)}" (y=${boxes[i].y}) and "${boxes[j].body.slice(0, 26)}" (y=${boxes[j].y}) overlap`);
  for (const ln of segmentsOf(svg)) for (const bx of boxes) if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
  for (const bx of boxes) if (bx.left < -2 || bx.right > vbW + 2) problems.push(`${where}: "${bx.body.slice(0, 30)}" runs from ${Math.round(bx.left)} to ${Math.round(bx.right)} on a ${vbW}-unit frame`);
}
{ // A/B: the guard must fire on what it exists for and stay quiet a clear row apart.
  const mk = (body, x, y, size) => boxesOf(`<text x="${x}" y="${y}" font-size="${size}" text-anchor="start">${body}</text>`)[0];
  if (!collides(mk('Launch cold brew', 120, 168, 10), mk('cost $200,000', 120, 180, 10))) problems.push('the collision guard does not fire on two 10-unit labels 12 units apart');
  if (collides(mk('Launch cold brew', 120, 168, 10), mk('cost $200,000', 120, 182, 10))) problems.push('the collision guard fires on two 10-unit labels 14 units apart');
  if (!crossed({ x1: 233, y1: 100, x2: 400, y2: 58 }, mk('High demand 0.6', 300, 68, 10))) problems.push('the line check does not fire on a label drawn across its branch');
  if (boxesOf('<text x="26" y="165" font-size="11" transform="rotate(-90,26,165)">Axis</text>').length) problems.push('rotated text is being measured');
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 14 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall).length;
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls} recalls · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
console.log('pins:'); for (const b of bundle.content) console.log(`  ${b.title.padEnd(24)} diagram ${b.diagramId.split(':').pop()}  quiz [${b.quizIndices.join(',')}]  practice [${b.practiceIndices.join(',')}]`);

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

// Packet 14.1: a new DEBT and a recoverable recall answer both stop the stage. `recall.recoverable` is
// INFO in the validator and gated only by `npm run recalls`, which holds a section with no baseline row
// (this one) to zero; checking it here means the runner fails before the draft is written, not after.
const recoverable = after.findings.filter((f) => f.rule === 'recall.recoverable');
for (const f of recoverable) problems.push(`recall.recoverable ${f.where}: ${f.detail.slice(0, 160)}`);
for (const f of newDebt) problems.push(`new DEBT ${f.rule}: ${f.detail.slice(0, 120)}`);
console.log(`\nquiz: correct option uniquely longest on ${longest.length} of ${bundle.quiz.length} [${longest.join(',')}]; positions ${[0, 1, 2, 3].map((p) => bundle.quiz.filter((q) => q.correctIndex === p).length).join('·')}`);
console.log(`check-ins show first: ${bundle.content.map((b) => `${b.title} → quiz[${b.quizIndices[0]}]`).join(' · ')}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no sensitivity analysis, no Outline, no uncited examiner claim, ids unique, worked figures agree, mistakes whole, no length tell above 1.2x, collision guard clean, 0 recoverable, 0 new DEBT');

if (DUMP) { const p = `audit/snapshots/packet-14-bundle__business__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-14-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts, then publish with scripts/publish-section.mjs decision-making-techniques --confirm.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log(`review: node scripts/publish-section.mjs ${SECTION}`);
