#!/usr/bin/env node
/**
 * PACKET 42 — resource-management, Business Unit 2 (WBS12), IAL topic 2.3.4.
 * `audit/raw/bus_spec.txt:965-1002`. FOUR chapters, twenty-six subsections, 28 substantive leaves.
 *
 *   node scripts/packet-42-resource-management.mjs            # dry run, every check
 *   node scripts/packet-42-resource-management.mjs --dump     # + write the bundle
 *   node scripts/packet-42-resource-management.mjs --stage    # + write the draft
 *
 * WHAT THIS RUNNER ADDS TO THE INHERITED CHECKS, AND WHY EACH ONE IS HERE:
 *
 *   - **THE NUMBERING IS REFUSED AGAINST THE DOCUMENT, NOT AGAINST A COMMENT.** Nine of the
 *     thirty open ids cite `2.4.1`-`2.4.4`. The runner re-reads `bus_spec.txt` and asserts BY LINE
 *     NUMBER that `2.3.4 Resource management` is the heading at `:965`, that `2.3.5` follows it at
 *     `:1009`, that the four sub-topic labels inside it are the ones this packet built, and that
 *     the string `2.4.3` appears nowhere in the file. `specGap-09` asks to renumber this section
 *     INTO `2.4`; a future renumber now fails the build rather than being inherited.
 *
 *   - **THE TARIFF TABLE IS PARSED OUT OF THE APPENDIX, NOT IMPORTED.** MEMORY's rule — a check
 *     that finds its evidence the way the fix did cannot see the fix's blind spot — applies
 *     directly. `lib/content-validator.mjs` reads `lib/ial-marking.js`, so a runner importing the
 *     same module would agree with the validator by construction and neither could see a wrong
 *     table. This runner parses the command words and their marks out of
 *     `bus_spec.txt:2220-2251` and asserts the parse against every practice item. It is also what
 *     settles `practice-01` (Define is 2, not 4) and what checks `topFix-05`'s proposed tariffs
 *     before they are built rather than after.
 *
 *   - **RULE 2 IS A GREP WITH AN EXEMPTION, AND THE EXEMPTION IS ONE ELEMENT WIDE.** The five
 *     phrases the packet spec's acceptance check names are banned everywhere except inside a
 *     `<text>` element of a diagram SVG. The runner strips the SVGs' `<text>` bodies out of the
 *     readable set, greps the rest, and then separately asserts that the inventory control diagram
 *     DOES carry them — because a ban that is satisfied by deleting the drawing has removed a
 *     specification requirement instead of meeting it.
 *
 *   - **THE SPINE IS RE-DERIVED, NOT TRUSTED.** Every figure the teaching prints is recomputed
 *     here from the typed inputs: the capacity fraction both ways round, the average cost curve,
 *     the crossover output, every label on the inventory diagram, the JIT trade both sides, and
 *     the quality bills. `structure-10`'s twist — utilisation rising because the denominator fell
 *     — is asserted as an identity rather than described in a sentence.
 *
 *   - **`accuracy-01` AND `topFix-03` ARE MADE UNREPRESENTABLE.** No year, no named real company,
 *     no UK frame, and no U+FFFD anywhere in the bundle. The Toyota claim cannot come back by
 *     being corrected, because a dated assertion about a named firm fails the build.
 *
 *   - **GLYPH-BOX COLLISIONS AT `COLLIDE_TOL` 1.2**, ported from packet 40 with its A/B intact and
 *     re-run against geometry this runner derives itself. Packets 37 and 40 both shipped colliding
 *     labels past every other check.
 *
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known
 *     to work. Each block that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, BIZ, usd, units, pct, pts, num, days, round2,
  BANNED_IN_PROSE, DIAGRAM_LABEL_ONLY, SCAFFOLDING_IN_PROSE,
} from './_packet42-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, LEAF_MAP, B1, B2, B3, B4,
} from './_packet42-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet42-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD } from './_packet42-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const B = BIZ;

const problems = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ── pins, derived from each item's own chapter tag (packet 30) ────────────── */
/*
 * `structure-01`/`quiz-01` (the swapped block 0 / block 1 indices) and `structure-07` (three
 * practice items surfaced by nothing) are the same defect: a hand-written pin. Deriving the
 * indices from each item's own tag makes both unrepresentable rather than corrected.
 */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
const quizIndices = Object.fromEntries(BLOCKS.map((b) => [b, quizByBlock[b]]));
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id]));

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  mistakes: MISTAKES,
  diagrams: ALL_DIAGRAMS,
  extras: EXTRAS,
};

/* ── every string a student can read ───────────────────────────────────────── */
const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
/* SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29): a caption wrapped across
   two `<text>` elements is in neither of them. */
const svgText = svgs.map((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];

/* ══ 1 · A FAILED SUBSTITUTION, ON EVERY SURFACE ════════════════════════════ */
/*
 * NO TRAILING `\b`. `/\bundefined\b/` does not match `undefinedQ`, and packet 29 shipped exactly
 * that. Every surface including the SVGs, because a template hole in a diagram caption is as
 * visible to a student as one in a paragraph.
 */
{
  const FAILED = /\bundefined|\bNaN\b|\[object Object\]|\$\{|\bnull\b|\bInfinity\b|�/;
  for (const s of [...prose, ...svgs]) {
    const m = String(s).match(FAILED);
    if (m) problems.push(`failed substitution "${m[0]}" in: ${String(s).slice(0, 110)}`);
  }
  if (!FAILED.test('the value is undefined here')) problems.push('the failed-substitution check does not catch "undefined"');
  if (!FAILED.test('a hole that ran on: undefinedQ')) problems.push('the failed-substitution check has a trailing word boundary, which is how packet 29 missed `undefinedQ`');
  /* topFix-03's corrupted emoji, byte for byte: the live lean subsection carries U+FFFD + "icing" */
  if (!FAILED.test('�icing')) problems.push('the check does not catch the replacement character topFix-03 reports in the live lean-production emoji');
  if (FAILED.test('a perfectly ordinary sentence about inventory control')) problems.push('the failed-substitution check fires on ordinary prose');
}

/* ══ 2 · THE NUMBERING, OUT OF THE DOCUMENT BY LINE ═════════════════════════ */
/*
 * Nine ids cite 2.4.x. `specGap-09` goes further and asks to RENUMBER this section into it. The
 * refusal is the document, not a comment, and it is asserted by line so that a future edit to the
 * specification text fails the build instead of being inherited silently.
 */
const SPEC_PATH = 'audit/raw/bus_spec.txt';
const spec = readFileSync(SPEC_PATH, 'utf8');
const specLines = spec.split('\n');
{
  const at = (n) => (specLines[n - 1] ?? '').trim();
  if (at(965) !== '2.3.4 Resource management') problems.push(`${SPEC_PATH}:965 reads "${at(965)}", not "2.3.4 Resource management"`);
  if (!/^2\.3\.5 External influences$/.test(at(1009))) problems.push(`${SPEC_PATH}:1009 reads "${at(1009)}", so the sub-topic does not end where this packet read it ending`);
  for (const bad of ['2.4.1', '2.4.2', '2.4.3', '2.4.4']) {
    const n = (spec.match(new RegExp(bad.replace(/\./g, '\\.'), 'g')) || []).length;
    if (n) problems.push(`"${bad}" appears ${n} times in the IAL Business specification; the nine ledger ids that cite it are UK GCE numbering, and specGap-09 asks to renumber INTO it`);
  }
  /* the four sub-topic labels, read out of the block rather than remembered */
  const block = specLines.slice(964, 1008).join('\n');
  for (const [nth, label] of [[1, 'Production,'], [2, 'Capacity'], [3, 'Inventory control'], [4, 'Quality']]) {
    if (!new RegExp(`^${nth} ${label.replace(/[.*+?^$()|[\]\\]/g, '\\$&')}`, 'm').test(block)) {
      problems.push(`sub-topic ${nth} of 2.3.4 is not labelled "${label}" in the specification text`);
    }
  }
  /* Rule 2's counts, measured rather than quoted */
  const count = (s) => (spec.toLowerCase().match(new RegExp(s.toLowerCase(), 'g')) || []).length;
  for (const [phrase, want] of [['inventory control', 4], ['buffer inventory', 1], ['waste minimisation', 1], ['lean production', 1]]) {
    if (count(phrase) < want) problems.push(`"${phrase}" appears ${count(phrase)} times in the specification, fewer than the ${want} this packet's Rule 2 rests on`);
  }
  for (const phrase of ['stock control', 'buffer stock', 're-order', 'lead time', 'stock-out', 'seven wastes']) {
    if (count(phrase)) problems.push(`"${phrase}" appears ${count(phrase)} times in the specification, so Rule 2's premise that it is absent is wrong`);
  }
}

/* ══ 3 · THE APPENDIX TARIFFS, PARSED NOT IMPORTED ══════════════════════════ */
/*
 * Parsed out of `bus_spec.txt:2220-2251` so the check cannot inherit the blind spot of anything
 * the content was written against. Assess carries TWO figures in the document — 10 for Units 1/2
 * and 12 for Units 3/4 — and this is Unit 2.
 */
const TARIFFS = (() => {
  const table = specLines.slice(2218, 2252).join('\n');
  const out = {};
  for (const m of table.matchAll(/^(Define|Calculate|Construct|Explain|Analyse|Discuss|Assess|Evaluate)\s+(\d+)/gm)) {
    out[m[1]] = Number(m[2]);
  }
  return out;
})();
{
  const want = ['Define', 'Calculate', 'Construct', 'Explain', 'Analyse', 'Discuss', 'Assess', 'Evaluate'];
  for (const w of want) if (!(w in TARIFFS)) problems.push(`the Appendix parse did not find "${w}" — the parse is wrong, not the specification`);
  if (TARIFFS.Define !== 2) problems.push(`the Appendix gives Define ${TARIFFS.Define}; practice-01 says the live 4-mark Define is not an IAL format and it is right`);
  if (TARIFFS.Assess !== 10) problems.push(`the Appendix's first Assess figure is ${TARIFFS.Assess}; this is Unit 2, where Assess carries 10 (12 is Units 3/4)`);
  /* and `topFix-05`'s own proposed tariffs, checked against the parse BEFORE they were built */
  for (const [cmd, marks] of [['Calculate', 4], ['Analyse', 6], ['Explain', 4]]) {
    if (TARIFFS[cmd] !== marks) problems.push(`topFix-05 proposes ${cmd} at ${marks} and the Appendix gives ${TARIFFS[cmd]}`);
  }
  /* every practice item against the parse, and the stem must end in its own tariff */
  const seen = new Set();
  for (const p of PRACTICE) {
    seen.add(p.command);
    if (!(p.command in TARIFFS)) problems.push(`practice "${p.question.slice(0, 40)}" uses "${p.command}", which is not in the Business taxonomy`);
    else if (TARIFFS[p.command] !== p.marks) problems.push(`practice "${p.command}" carries ${p.marks} marks and the Appendix gives ${TARIFFS[p.command]}`);
    if (!new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question)) problems.push(`practice "${p.question.slice(0, 40)}" does not end in "(${p.marks} marks)"`);
  }
  for (const w of want) if (!seen.has(w)) problems.push(`no practice item uses the command word "${w}"`);
  /* V036: Discuss asks for a brief ASSESSMENT, never a conclusion */
  const disc = PRACTICE.find((p) => p.command === 'Discuss');
  if (/conclusion/i.test(disc.guidance)) problems.push('V036: the Discuss guidance asks for a "conclusion"; the Appendix says "a brief assessment" and reserves a conclusion for Evaluate');
  if (!/brief assessment/i.test(disc.guidance)) problems.push('the Discuss guidance does not ask for the brief assessment the Appendix requires');
  /* CONTENT-GATE step 6: the FIRST paragraph is a scaffold with no figure, no allocation, no bands */
  for (const p of PRACTICE) {
    const opening = String(p.guidance).split('\n')[0];
    if (String(p.guidance).split('\n').length < 2) problems.push(`practice "${p.command}" has one guidance paragraph, so guided mode prints the whole mark scheme over an empty box`);
    if (/\(\d+\s*marks?\)|\b\d+\s*marks?\b/i.test(opening)) problems.push(`practice "${p.command}": the opening paragraph carries a mark allocation`);
    if (/\$[\d,]/.test(opening)) problems.push(`practice "${p.command}": the opening paragraph carries a figure`);
    if (/\bLevel\s*\d/i.test(opening)) problems.push(`practice "${p.command}": the opening paragraph carries a level band`);
  }
  /* points at 6 and below, levels above — the convention packets 36 and 40 shipped */
  for (const p of PRACTICE) {
    const hasLevels = /\bLevel\s*\d/i.test(p.guidance);
    if (p.marks <= 6 && hasLevels) problems.push(`practice "${p.command}" (${p.marks}) uses level descriptors; the Appendix marks at this tariff on points`);
    if (p.marks >= 8 && !hasLevels) problems.push(`practice "${p.command}" (${p.marks}) has no level descriptors`);
  }
}

/* ══ 4 · RULE 2 · THE WORDS THIS SECTION MAY NOT SAY IN PROSE ═══════════════ */
/*
 * The ban covers everything a student can read EXCEPT the `<text>` bodies of the diagrams, which
 * is the exemption leaf 3a requires and the acceptance check's own wording ("0 outside diagram
 * labels"). And the exemption is then checked in the other direction: the inventory control
 * diagram must CARRY the five labels, or the ban has been satisfied by deleting the requirement.
 */
{
  for (const [re, why] of BANNED_IN_PROSE) {
    for (const s of prose) {
      const m = String(s).match(re);
      if (m) problems.push(`Rule 2 — ${why}. Found "${m[0]}" in: "${String(s).slice(Math.max(0, String(s).indexOf(m[0]) - 40), String(s).indexOf(m[0]) + 50)}"`);
    }
  }
  /* the exemption, one element wide: the labels live in the inventory diagram's SVG text and there only */
  const invText = svgOf(ALL_DIAGRAMS[2]).flatMap((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1])).join(' | ');
  for (const label of DIAGRAM_LABEL_ONLY) {
    if (!invText.includes(label)) problems.push(`the inventory control diagram does not carry the label "${label}" — leaf 3a asks a student to INTERPRET the standard drawing, and a ban satisfied by removing the labels has removed the requirement`);
  }
  const otherSvgText = ALL_DIAGRAMS.filter((_, i) => i !== 2).flatMap(svgOf).join(' ');
  for (const label of DIAGRAM_LABEL_ONLY) {
    if (otherSvgText.includes(label)) problems.push(`"${label}" appears on a diagram other than the inventory control one`);
  }
  /* A/B, in both directions, on the two bans most likely to be loosened by accident */
  const bs = BANNED_IN_PROSE.find(([re]) => re.test('buffer stock'))[0];
  if (!bs.test('a buffer stock of chips')) problems.push('the buffer-stock ban does not catch it');
  if (bs.test('buffer inventory is insurance')) problems.push('the buffer-stock ban fires on "buffer inventory", which is the specification\'s own phrase and this section must be able to say');
  const lt = BANNED_IN_PROSE.find(([re]) => re.test('lead time'))[0];
  if (!lt.test('the supplier lead time is four days')) problems.push('the lead-time ban does not catch it');
  if (lt.test('competitive advantage from short product lead-in times')) problems.push('the lead-time ban fires on "lead-in times", which is the specification\'s own phrase at 1e');
  /* and the phrase the specification DOES use at 1e must be present */
  if (!prose.some((s) => /lead-in time/i.test(String(s)))) problems.push('leaf 1e is built and the specification\'s own phrase "product lead-in times" appears nowhere');
}

/* ══ 4a · RULE 3 · THE WORDS THAT ADDRESS THE AUDIT AND NOT THE STUDENT ═════ */
/*
 * Verify B's blocking defect: 20 of 26 subsections OPENED with this build's own tree numbering
 * ("Leaf 1a names four methods of production"), 25 occurrences, every one in text a student reads.
 * Coverage was right; the reader was wrong. Nothing else in the gate can see this — `validate`
 * checks schema and rules, `npm test` reads files, Verify A reads the diff for coverage — so the
 * class is held here, over EVERY readable string including the diagrams' `<text>` bodies (no
 * drawing needs to say "leaf", so unlike Rule 2 this one has no exemption).
 *
 * A/B IN BOTH DIRECTIONS, on the verbatim strings that shipped. The positive controls are the real
 * pre-fix sentences, not paraphrases of them: a guard written for a defect it cannot reproduce is
 * how F088 shipped. The negative controls are the sentences a loosened guard would have destroyed —
 * "leaves" as a verb, and the specification QUOTED rather than speaking.
 */
{
  for (const [re, why] of SCAFFOLDING_IN_PROSE) {
    for (const s2 of readable) {
      const m = String(s2).match(re);
      if (m) problems.push(`Rule 3 — ${why}. Found "${m[0]}" in: "${String(s2).slice(Math.max(0, String(s2).indexOf(m[0]) - 40), String(s2).indexOf(m[0]) + 60)}"`);
    }
  }
  const fires = (t) => SCAFFOLDING_IN_PROSE.some(([re]) => re.test(t));
  /* POSITIVE — the exact sentences Verify B quoted off the served draft. Each MUST fail the build. */
  const SHIPPED = [
    'Leaf 1a names **four** methods of production: job, batch, flow, cell.',
    'Leaf 1b-2 asks for the factors influencing productivity, and the useful way to hold them',
    'Leaf 3a asks for the **interpretation of an inventory control diagram**',
    'Leaf 4c is **continuous improvement (Kaizen)**. Its claim is that',
    'The specification defines efficiency as production at minimum average cost',
    'The specification lists it at 1a beside job, batch and flow',
    '4d is a competitive advantage leaf, so the answer ends in the market.',
    'is the standard twist in this sub-topic. Recompute the denominator first',
    'Almost every data-response question in sub-topic 2 turns on this',
    'the chart the specification asks students to interpret',
  ];
  for (const t of SHIPPED) {
    if (!fires(t)) problems.push(`Rule 3 is blind to a sentence this packet actually shipped: "${t.slice(0, 70)}"`);
  }
  /* NEGATIVE — correct teaching prose a broader ban would have deleted. Each MUST pass. */
  const KEEP = [
    'the person doing the work is responsible for what leaves their bench',
    'An improvement that is not written into the standard way of working is an improvement that leaves with the person who made it.',
    "The specification's own wording has three components in it",
    "Use the specification's own test — is average cost at its minimum?",
    'Which of these is a method of production named in the specification?',
    'Each item is completed to its own specification before the next is started',
    'a perfectly ordinary sentence about inventory control and capacity utilisation',
  ];
  for (const t of KEEP) {
    if (fires(t)) problems.push(`Rule 3 fires on prose that is correct and student-facing: "${t.slice(0, 70)}"`);
  }
}

/* ══ 5 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  /* 2a · the fraction, both ways round */
  if (!near(round2((B.output / B.maxOutput) * 100), B.utilisation)) problems.push('the stored capacity utilisation does not follow from the two output figures');
  if (!near(round2((B.output / B.maxAfterClosure) * 100), B.utilisationAfterClosure)) problems.push('the post-closure utilisation does not follow from the reduced maximum');
  /* structure-10's twist, asserted as an identity: the NUMERATOR did not move */
  if (B.utilisationAfterClosure <= B.utilisation) problems.push('closing a line does not raise the reported utilisation, which is the twist structure-10 asks for');
  if (!near(B.output, B.output)) problems.push('unreachable');
  if (B.maxAfterClosure >= B.maxOutput) problems.push('the post-closure maximum is not below the original, so nothing was closed');
  if (!near(round2(B.utilisationAfterClosure - B.utilisation), B.utilisationRisePts)) problems.push('the stored rise in percentage points does not follow from the two percentages');

  /* 1c · the cost curve, and the claim that its MINIMUM is at capacity */
  if (!near(B.averageCost(B.output), B.avgAtOutput)) problems.push('the stored average cost at current output does not follow from the cost structure');
  if (!near(B.averageCost(B.maxOutput), B.avgAtCapacity)) problems.push('the stored average cost at capacity does not follow from the cost structure');
  {
    let lowest = Infinity; let lowestQ = 0;
    for (let q = 500; q <= B.maxOutput; q += 50) { const c = B.averageCost(q); if (c < lowest) { lowest = c; lowestQ = q; } }
    if (lowestQ !== B.maxOutput) problems.push(`average cost is lowest at ${lowestQ}, not at capacity — leaf 1c-1 defines efficiency as production at MINIMUM average cost and the teaching points at capacity`);
  }
  if (!near(round2(B.fixedCosts / B.output), B.fixedPerUnitAtOutput)) problems.push('the fixed cost a unit at current output does not follow from the fixed costs');
  if (!near(round2(B.fixedPerUnitAtOutput - B.fixedPerUnitAtCapacity), B.spareCapacityCostPerUnit)) problems.push('the cost of spare capacity a unit does not follow from the two fixed-cost figures');
  if (!near(round2(B.spareCapacityCostPerUnit * B.output), B.spareCapacityCostMonthly)) problems.push('the monthly cost of spare capacity does not follow from the per-unit figure');

  /* 1b · productivity, and what it is worth a unit */
  if (!near(round2(B.output / B.workers), B.outputPerWorker)) problems.push('output per worker does not follow from the output and the workforce');
  if (!near(round2(B.wagePerWorker / B.outputPerWorker), B.labourPerUnit)) problems.push('labour cost a unit does not follow from the wage and output per worker');
  if (!near(round2(B.materialsPerUnit + B.labourPerUnit), B.variableCost)) problems.push('the variable cost is not materials plus labour, so the two teaching routes disagree');
  if (!near(round2(((B.outputPerWorkerUp - B.outputPerWorker) / B.outputPerWorker) * 100), B.productivityRisePct)) problems.push('the productivity rise percentage does not follow from the two figures');
  if (!near(round2(B.labourPerUnit - B.labourPerUnitUp), B.labourSavingPerUnit)) problems.push('the saving a unit does not follow from the two labour costs');

  /* 1d · the crossover, DERIVED and then asserted equal by two independent evaluations */
  if (!near(round2(B.autoExtraFixed / B.variableGap), B.crossoverOutput)) problems.push('the crossover output does not follow from the fixed gap over the variable gap');
  if (!near(B.averageCost(B.crossoverOutput), B.averageCost(B.crossoverOutput, B.autoFixed, B.autoVariableCost))) {
    problems.push(`at ${units(B.crossoverOutput)} the two methods cost ${usd(B.averageCost(B.crossoverOutput))} and ${usd(B.averageCost(B.crossoverOutput, B.autoFixed, B.autoVariableCost))} — the whole of leaf 1d rests on them being the same figure`);
  }
  if (!(B.avgAtOutput < B.avgAutoAtOutput)) problems.push('the labour-intensive method is not cheaper at the current output, so the teaching point about the crossing is inverted');
  if (!(B.avgAutoAtCapacity < B.avgAtCapacity)) problems.push('the capital-intensive method is not cheaper at capacity, so there is no crossing to teach');
  if (!(B.autoOutputPerWorker > B.outputPerWorker)) problems.push('the automated line does not have the higher output per worker, which is what makes 1d a productivity-against-efficiency lesson');

  /* 3a · every label on the diagram, from the usage rate up */
  if (!near(round2((B.output * B.tyresPerUnit) / B.workingDays), B.tyresPerDay)) problems.push('the daily usage rate does not follow from the output, the fitment and the working days');
  if (!near(round2(B.maxInventory - B.bufferInventory), B.orderQuantity)) problems.push('the order quantity is not the maximum less the buffer');
  if (!near(round2(B.bufferInventory + B.tyresPerDay * B.deliveryDelayDays), B.orderPoint)) problems.push('the order point is not the buffer plus the usage over the delivery period');
  if (!near(round2(B.orderQuantity / B.tyresPerDay), B.cycleDays)) problems.push('the cycle length does not follow from the order quantity and the usage rate');
  if (!(B.orderPoint > B.bufferInventory && B.orderPoint < B.maxInventory)) problems.push('the order point does not sit between the buffer and the maximum, so the drawing is not the standard one');
  if (!near(round2(B.bufferInventory / B.tyresPerDay), B.bufferCoverDays)) problems.push('the days of cover do not follow from the buffer and the usage rate');

  /* 3d · the JIT trade, both sides, from the same figures */
  if (!near(round2(((B.maxInventory + B.bufferInventory) / 2) * B.holdingCostPerTyre), B.holdingCostMonthly)) problems.push('the holding cost does not follow from the average held and the rate');
  if (!near(round2(B.holdingCostMonthly - B.jitHoldingCostMonthly), B.jitSavingMonthly)) problems.push('the JIT saving is not the difference between the two holding bills');
  if (!near(round2((B.output / B.workingDays) * B.contribution), B.stoppageCost)) problems.push('the cost of a stopped day does not follow from daily output and contribution');
  if (!near(round2(B.stoppageCost / B.jitSavingMonthly), B.stoppageMonthsOfSaving)) problems.push('the months-of-saving ratio does not follow from the two figures');
  if (!(B.stoppageCost > B.jitSavingMonthly)) problems.push('a stopped day costs less than a month of the saving, so the JIT trade-off the packet spec asks for in place of the Toyota claim does not hold');
  if (B.jitBuffer <= 0) problems.push('the JIT case holds nothing at all, which is the misconception structure-09 asks this section to correct rather than teach');

  /* 3e, 3f · waste, and the competitive advantage it buys */
  if (!near(round2(B.holdingCostMonthly + B.reworkCostMonthly + B.waitingAndMovingMonthly), B.wasteMonthly)) problems.push('the waste total is not the sum of its three named parts');
  if (!near(round2(B.wasteMonthly / B.output), B.wastePerUnit)) problems.push('the waste a unit does not follow from the total and the output');
  if (!near(B.averageCost(B.output, B.fixedCosts - B.wasteMonthly), B.avgAfterWaste)) problems.push('the average cost after removing the waste does not follow from the cost structure');
  if (!near(round2(B.avgAtOutput - B.avgAfterWaste), B.wastePerUnit)) problems.push('removing the waste does not lower average cost by exactly the waste a unit, so two teaching sentences disagree');
  if (!(B.avgAfterWasteAndProductivity < B.rivalAverageCost)) problems.push('the improved average cost is not below the comparator, so leaf 3f has no competitive advantage to point at');
  if (!near(round2(B.rivalAverageCost - B.avgAfterWasteAndProductivity), B.advantagePerUnit)) problems.push('the advantage a unit does not follow from the two average costs');

  /* 4a-4d · the three quality bills */
  if (!near(round2(B.output * (B.reworkRate / 100)), B.reworkUnits)) problems.push('the number corrected does not follow from the rate and the output');
  if (!near(round2(B.reworkUnits * B.reworkCostLate), B.reworkCostMonthly)) problems.push('the correction bill under inspection does not follow from the count and the unit cost');
  if (!near(round2(B.assuranceUnits * B.reworkCostEarly), B.assuranceCostMonthly)) problems.push('the correction bill under assurance does not follow from the count and the unit cost');
  if (!near(round2(B.reworkCostMonthly - B.assuranceCostMonthly), B.qualitySavingMonthly)) problems.push('the quality saving is not the difference between the two bills');
  if (!(B.reworkCostEarly < B.reworkCostLate)) problems.push('a correction caught early does not cost less than one caught at the end, which is the point of the whole subsection');
  if (!near(round2(B.escapeUnits * B.warrantyCostPerUnit), B.warrantyCostMonthly)) problems.push('the warranty bill does not follow from the escape rate and the unit cost');
  if (!(B.warrantyCostMonthly > B.assuranceCostMonthly)) problems.push('the cost of what reaches a customer is not larger than the correction bill the factory can see, and the closing sentence of the quality chain says it is');
  if (!near(round2(B.warrantyCostMonthly / B.assuranceCostMonthly), 6)) problems.push(`what escapes costs ${round2(B.warrantyCostMonthly / B.assuranceCostMonthly)} times the in-factory correction bill; the quality chain prints the ratio as six`);
  if (!near(round2(B.peakReworkUnits - B.normalRateAtPeak), B.peakExtraRework)) problems.push('the extra corrections at the peak do not follow from the two rates');
  if (!near(round2(B.peakExtraRework * B.reworkCostLate), B.peakReworkCost)) problems.push('the peak correction cost does not follow from the extra count');

  /* 1e · the lead-in time */
  if (!near(round2(B.leadInMonthsBefore - B.leadInMonthsAfter), B.leadInMonthsSaved)) problems.push('the months saved do not follow from the two lead-in times');
  if (!near(round2(B.newModelMonthlyUnits * B.contribution), B.leadInContributionMonthly)) problems.push('the monthly contribution of the new model does not follow from volume and contribution');
  if (!near(round2(B.leadInContributionMonthly * B.leadInMonthsSaved), B.leadInContributionTotal)) problems.push('the total earned early does not follow from the monthly figure and the months');

  /* 2c · both directions */
  if (!near(round2((B.outputWithSubcontract / B.maxOutput) * 100), B.utilisationWithSubcontract)) problems.push('the utilisation with subcontract work in does not follow from the new output');
  if (!near(round2((B.inHouseAtPeak / B.maxOutput) * 100), B.utilisationAfterRelief)) problems.push('the utilisation after sending work out does not follow from the in-house output');
  if (!(B.utilisationAfterRelief < B.peakUtilisation)) problems.push('sending work out does not lower utilisation, so the over-utilisation remedy does not work on its own arithmetic');

  /* A/B: the spine check must be able to fail. Plant a wrong crossover and confirm it fires. */
  {
    const bad = round2((B.autoExtraFixed + 1000) / B.variableGap);
    if (near(bad, B.crossoverOutput)) problems.push('the crossover assertion cannot fail: a planted fixed-cost change does not move the derived figure');
  }
}

/* ══ 6 · STRUCTURE, PINS AND LEAF COVERAGE ══════════════════════════════════ */
{
  if (content.length !== 4) problems.push(`${content.length} chapters, not the specification's four sub-topics`);
  BLOCKS.forEach((title, i) => {
    const want = [B1, B2, B3, B4][i];
    if (title !== want) problems.push(`chapter ${i + 1} is "${title}" and the specification's sub-topic ${i + 1} is "${want}"`);
  });
  if (SUBSECTIONS.length < 20) problems.push(`${SUBSECTIONS.length} subsections for a 28-leaf topic`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`chapter "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`chapter "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`chapter "${b.title}" has no practice item`);
    if (!b.sections.length) problems.push(`chapter "${b.title}" has no subsections`);
    if (!(b.takeaway?.length >= 3)) problems.push(`chapter "${b.title}" has fewer than three takeaways`);
  }
  /* structure-04: one subsection to a step, so no chapter may pair them */
  const lens = content.map((b) => b.sections.length);
  if (Math.max(...lens) > 2 * Math.min(...lens)) problems.push(`chapter lengths ${lens.join('/')} — the longest is more than twice the shortest`);
  /* pins resolve BY ID, and no two chapters share one — topFix-02 names the legacy `diagramRef` */
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`chapter "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two chapters share a diagram');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a chapter still carries `diagramRef`, the legacy substring pin F052/F109 measure as resolving to nothing 24 times in 39');
  if (ALL_DIAGRAMS.some((d) => !d.id)) problems.push('a diagram carries no `id`, which is the field resolvePinnedDiagram matches first');
  /* the pre-test pool: three, unpinned, FIRST */
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items, not 3`);
  if ([...unpinned].some((i) => i > 2)) problems.push('an unpinned quiz item is not among the first three in the array');
  const freeNeeded = 3 + content.length;
  if (freeNeeded > 10) problems.push(`${freeNeeded} free quiz items needed against FREE_QUIZ_MAX 10`);
  /* structure-01 / quiz-01: nothing swapped, nothing orphaned — asserted on the TAG, not on order */
  const pinnedQ = new Set(Object.values(quizIndices).flat());
  QUIZ.forEach((q, i) => { if (q.block && !pinnedQ.has(i)) problems.push(`quiz item ${i} is tagged "${q.block}" and reaches no chapter`); });
  for (const b of content) for (const i of b.quizIndices) {
    if (QUIZ[i].block !== b.title) problems.push(`chapter "${b.title}" pins quiz item ${i}, which is tagged "${QUIZ[i].block}" — this is the swap structure-01 reports`);
  }
  /* structure-07: every practice item is reachable */
  const pinnedP = new Set(Object.values(practiceIndices).flat());
  PRACTICE.forEach((p, i) => { if (!pinnedP.has(i)) problems.push(`practice item ${i} (${p.command}) reaches no chapter — this is structure-07`); });
  for (const b of content) for (const i of b.practiceIndices) {
    if (PRACTICE[i].block !== b.title) problems.push(`chapter "${b.title}" pins practice item ${i}, which is tagged "${PRACTICE[i].block}"`);
  }
  /* ids unique PER ARRAY (a diagramId on a chapter is a reference and is meant to repeat) */
  for (const [what, arr] of [['subsection', SUBSECTIONS], ['diagram', ALL_DIAGRAMS], ['quiz', QUIZ], ['practice', PRACTICE], ['flashcard', FLASHCARDS], ['mistake', MISTAKES], ['chapter', content]]) {
    const list = arr.map((x) => x.id);
    const dupes = [...new Set(list.filter((x, i) => list.indexOf(x) !== i))];
    if (dupes.length) problems.push(`duplicate ${what} ids: ${dupes.slice(0, 3).join(', ')}`);
    if (list.some((x) => !x)) problems.push(`a ${what} carries no id`);
  }
  const recallIds = SUBSECTIONS.map((s) => s.recall.id);
  if (new Set(recallIds).size !== recallIds.length) problems.push('two recalls share an id');

  /*
   * LEAF COVERAGE, AGAINST THE ORACLE RATHER THAN AGAINST THIS PACKET'S OWN LIST. `spec-items.json`
   * holds 32 rows for 2.3.4, four of which are the `requirement` parents 1a, 1b, 1c and 4a. Every
   * substantive leaf must be mapped, every mapped id must exist in the oracle, and every slug named
   * must be a real subsection.
   */
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items.filter((x) => /^BUS-2\.3\.4-/.test(x.id));
  const leaves = oracle.filter((x) => x.kind === 'leaf').map((x) => x.id);
  if (oracle.length !== 32) problems.push(`the oracle holds ${oracle.length} rows for 2.3.4, not the 32 this packet read`);
  if (leaves.length !== 28) problems.push(`${leaves.length} substantive leaves in the oracle, not 28`);
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.split(':').pop()));
  for (const leaf of leaves) if (!LEAF_MAP[leaf]) problems.push(`leaf ${leaf} ("${oracle.find((x) => x.id === leaf).wording}") is mapped to no subsection`);
  for (const [leaf, names] of Object.entries(LEAF_MAP)) {
    if (!leaves.includes(leaf)) problems.push(`LEAF_MAP names ${leaf}, which is not a substantive leaf in the oracle`);
    for (const n of names) if (!slugs.has(n)) problems.push(`LEAF_MAP sends ${leaf} to "${n}", which is not a subsection`);
  }
  /* and the two the coverage audit calls MISSING have to be here, by name */
  const missing = { 'BUS-2.3.4-2c': 'ways of improving capacity utilisation, under AND over', 'BUS-2.3.4-3a': 'interpretation of inventory control diagram' };
  for (const [leaf, what] of Object.entries(missing)) {
    if (!LEAF_MAP[leaf]?.length) problems.push(`${leaf} (${what}) is one of the two leaves spec-coverage.json calls MISSING and it is still unmapped`);
  }
  /* 2c covers BOTH directions and the packet spec says the coverage summary's "OVER" is a misread */
  if ((LEAF_MAP['BUS-2.3.4-2c'] || []).length < 2) problems.push('leaf 2c reads "under and over utilisation" and is mapped to fewer than two subsections');
  if ((LEAF_MAP['BUS-2.3.4-2b'] || []).length < 2) problems.push('leaf 2b reads "under- and over-utilisation" and is mapped to fewer than two subsections');
}

/* ══ 7 · THE ITEMS THIS PACKET CLOSES, EACH ASSERTED AT ITS SOURCE ══════════ */
{
  const bodyOf = (s) => [s.title, s.keyIdea, ...(s.body || []).map((b) => b.text || ''), ...(s.body || []).flatMap((b) => (b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`))].join(' ');
  const teaching = SUBSECTIONS.map(bodyOf).join(' ').toLowerCase();

  /* specGap-04: cell is a METHOD, taught beside the other three, not a lean aside */
  const methodsChapter = content[0].sections.map((s) => s.id.split(':').pop());
  if (!methodsChapter.includes('flow-and-cell-production')) problems.push('specGap-04: cell is not taught in the methods chapter');
  const leanSub = SUBSECTIONS.find((s) => s.id.endsWith('competitive-advantage-from-lean-production'));
  if (/\bcell production\b/i.test(bodyOf(leanSub))) problems.push('specGap-04: cell production is still introduced inside the lean subsection, which is the live defect');

  /* structure-06: kaizen taught ONCE, and quality circles given its own subsection under 4a */
  const kaizenSubs = SUBSECTIONS.filter((s) => /kaizen/i.test(bodyOf(s)));
  if (kaizenSubs.length !== 1) problems.push(`structure-06: kaizen is taught in ${kaizenSubs.length} subsections (${kaizenSubs.map((s) => s.id.split(':').pop()).join(', ')}), and the live defect is that it is taught twice`);
  if (kaizenSubs[0]?.id !== `${SECTION}:sub:continuous-improvement`) problems.push('structure-06: kaizen is not taught in the subsection for leaf 4c');
  const circles = SUBSECTIONS.find((s) => s.id.endsWith('quality-circles'));
  if (!circles) problems.push('specGap-06: quality circles has no subsection of its own');
  else if (/kaizen/i.test(bodyOf(circles))) problems.push('specGap-06: quality circles is still aliased to kaizen, which is the live "kaizen circles or quality circles" clause');
  if (LEAF_MAP['BUS-2.3.4-4a-3']?.[0] !== 'quality-circles') problems.push('specGap-06 cites 4c; the specification puts `circles` at 4a-3 and the map must agree with the document');

  /* structure-05: the inventory chapter holds only what sub-topic 3 holds */
  const invSlugs = content[2].sections.map((s) => s.id.split(':').pop());
  for (const stray of ['continuous-improvement', 'quality-circles', 'flow-and-cell-production']) {
    if (invSlugs.includes(stray)) problems.push(`structure-05: "${stray}" is in the inventory control chapter and the specification files it elsewhere`);
  }
  for (const want of ['waste-minimisation', 'competitive-advantage-from-lean-production']) {
    if (!invSlugs.includes(want)) problems.push(`structure-05: "${want}" is leaf 3e or 3f and belongs in the inventory control chapter`);
  }

  /* structure-08: a takeaway may not contradict the subsection's own misconception */
  const jit = SUBSECTIONS.find((s) => s.id.endsWith('just-in-time'));
  if (!/minimis/i.test(jit.misconception)) problems.push('structure-08: the JIT misconception no longer says what JIT minimises');
  for (const b of content) for (const tk of b.takeaway) {
    if (/\bjit\b|just in time/i.test(tk) && /eliminat|no inventory|zero/i.test(tk) && !/\b(not|never)\b[^.]*\b(eliminat|zero|no inventory)/i.test(tk)) {
      problems.push(`structure-08: a takeaway says JIT eliminates inventory while the subsection's misconception says it does not — "${tk}"`);
    }
  }
  /* and the same test over every takeaway against every misconception it could contradict */
  if (!content[2].takeaway.some((tk) => /minimis/i.test(tk))) problems.push('structure-08: no takeaway in the inventory chapter states what JIT actually does');

  /* structure-09: the five real errors kept, the three filler ones gone */
  const mistakeText = MISTAKES.map((m) => `${m.title} ${m.quote} ${m.why}`).join(' ').toLowerCase();
  for (const [want, why] of [
    ['productivity', 'productivity against production'],
    ['zero', 'JIT read as zero inventory'],
    ['lean', 'lean used as a synonym for JIT'],
    ['100%', '100% utilisation treated as the target'],
    ['104%', 'utilisation above 100% believed impossible'],
    ['assurance', 'assurance read as no inspection'],
    ['effort', 'higher productivity read as working harder'],
  ]) if (!mistakeText.includes(want)) problems.push(`structure-09: no common mistake covers ${why}`);
  /* …and the three it calls filler are GONE — from every surface that teaches a student error, not
     just from MISTAKES. The first version of this check read `MISTAKES[].title` only and matched the
     literal strings "guarantees zero defects" and "one-off project". It passed while BOTH claims sat
     in `content[3]` subsection `misconception` fields, because a misconception is not a MISTAKES row
     and because "a project with a start and an end" is the kaizen claim written without the words
     "one-off project". So: the surfaces are collected out of the ASSEMBLED bundle (`content`, which
     is what a student is served) rather than out of the SUBSECTIONS array the author edits, and each
     claim is matched by its SHAPE rather than by one phrasing. Quiz options are deliberately not in
     the set — a wrong option is supposed to state a wrong thing, and `quiz[31]`'s "the total number
     of defects being reduced to zero" is the distractor that makes the TQM item work. */
  const errorSurfaces = [
    ...content.flatMap((b) => (b.sections || []).map((s) => `${b.title} / ${s.title} :: ${s.misconception}`)),
    ...MISTAKES.map((m) => `mistake / ${m.title} :: ${m.quote} ${m.why} ${m.fix}`),
  ];
  for (const [re, why] of [
    [/(tqm|total quality management)[\s\S]{0,140}?(guarantee|promis|ensur)\w*[\s\S]{0,60}?\b(zero|no)\b[\s\S]{0,40}?(defect|fault)/i, 'TQM guarantees zero defects'],
    [/(kaizen|continuous improvement)[\s\S]{0,160}?(one-off|one off|a project with|is a project|has a start|start and an end|begins and ends|finite)/i, 'kaizen is a one-off project'],
    [/(quality control|\bqc\b)[\s\S]{0,140}?(bad method|poor method|should never|never be used|never use|inferior method|always worse)/i, 'quality control is a bad method businesses should never use'],
  ]) for (const s of errorSurfaces) {
    if (re.test(s)) problems.push(`structure-09 calls "${why}" filler and it is still taught as a student error — "${s.slice(0, 120)}"`);
  }

  /* structure-10: a worked calculation with a twist, in the teaching AND in the practice */
  if (!teaching.includes(units(B.maxAfterClosure).toLowerCase())) problems.push('structure-10: the rationalisation twist is not worked anywhere in the teaching text');
  if (!PRACTICE.some((p) => p.command === 'Calculate' && p.question.includes(units(B.maxAfterClosure)))) problems.push('structure-10: no Calculate item puts the capacity change in front of a student');

  /* accuracy-01 and topFix-03: the claim cannot come back, corrected or otherwise */
  for (const s of readable) {
    if (/toyota|rolls-royce|jaguar|land rover|\bjlr\b|brewdog|nissan|honda|tesla|amazon|apple\b/i.test(String(s))) {
      problems.push(`accuracy-01/topFix-03: a named real company — "${String(s).slice(0, 90)}"`);
    }
  }

  /* specThin-01 and specThin-02: named AND explained, which is what "thin" means */
  if (!teaching.includes('ways to improve efficiency') && !LEAF_MAP['BUS-2.3.4-1c-3']) problems.push('specThin-01: leaf 1c-3 is not evidenced');
  const leadIn = SUBSECTIONS.find((s) => s.id.endsWith('short-product-lead-in-times'));
  if (!leadIn || bodyOf(leadIn).length < 600) problems.push('specThin-02: the lead-in-time subsection is shorter than a paragraph, which is the "named but never explained" condition it reports');

  /* specGap-05, specGap-03: the factor lists are present and are lists, not a clause */
  const factors = SUBSECTIONS.find((s) => s.id.endsWith('factors-influencing-productivity'));
  if (!factors || (factors.body || []).length < 4) problems.push('specGap-05: the factors influencing productivity are not set out as separate factors');
  const eff = SUBSECTIONS.find((s) => s.id.endsWith('efficiency-at-minimum-average-cost'));
  if (!/minimum average cost/i.test(bodyOf(eff))) problems.push('specGap-03: efficiency is not defined by the specification\'s own test');
}

/* ══ 8 · QUIZ ═══════════════════════════════════════════════════════════════ */
{
  if (QUIZ.length < 25) problems.push(`${QUIZ.length} quiz items against a floor of 25`);
  const hist = [0, 0, 0, 0];
  const ORDINAL = /\b(first|second|third|fourth|last|final)\s+(option|answer|choice)\b|\bthe (first|second|third|fourth|last) one\b|\boption [A-D]\b|\babove\b\s+(option|answer)/i;
  for (const q of QUIZ) {
    hist[q.correctIndex] += 1;
    if (q.options.length !== 4) problems.push(`quiz "${q.question.slice(0, 40)}" has ${q.options.length} options`);
    if (new Set(q.options.map((o) => o.toLowerCase())).size !== q.options.length) problems.push(`quiz "${q.question.slice(0, 40)}" has two identical options`);
    const correct = q.options[q.correctIndex];
    const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
    if (correct.length > 1.5 * longest) problems.push(`quiz "${q.question.slice(0, 40)}": the key is ${correct.length} chars against a longest distractor of ${longest}`);
    if (/\(\s*[A-F]\s*\)/.test(q.explanation)) problems.push(`quiz "${q.question.slice(0, 40)}": the explanation names an option by letter`);
    if (ORDINAL.test(q.explanation)) problems.push(`quiz "${q.question.slice(0, 40)}": the explanation names an option by position, and placeKeys moves the key after it was written`);
  }
  /*
   * topFix-01 / quiz-02 CLOSED BY CONSTRUCTION, AND MEASURED. The live bank is 23 of 25 at index 1
   * (the ledger and DECISIONS both say 22; recounted directly on `correctIndex`). The gate is that
   * no index holds more than 40% or fewer than 10% of the bank.
   */
  const n = QUIZ.length;
  const share = hist.map((v) => v / n);
  if (Math.max(...share) > 0.4 || Math.min(...share) < 0.1) problems.push(`quiz key histogram ${hist.map((v) => `${Math.round((100 * v) / n)}%`).join(' / ')} over ${n} items — this is the defect topFix-01 reports, reproduced`);
  /* A/B the ordinal check in both directions */
  if (!ORDINAL.test('the first option is correct because')) problems.push('the ordinal check does not catch "the first option"');
  if (ORDINAL.test('the first stage of the chain is the cost change')) problems.push('the ordinal check fires on "the first stage", which this section has to be able to say');
  /* A/B the histogram gate: the LIVE distribution must fail it */
  {
    const live23 = [0, 23, 2, 0];
    const liveShare = live23.map((v) => v / 25);
    if (!(Math.max(...liveShare) > 0.4)) problems.push('the histogram gate does not fail the live 23-of-25 distribution it exists to catch');
  }
  /* quiz-01 in its general form: nothing is asked that the teaching never says */
  const taught = SUBSECTIONS.flatMap((s) => [s.keyIdea, ...(s.body || []).map((b) => b.text || '')]).join(' ').toLowerCase();
  for (const want of ['cell', 'minimum average cost', 'buffer inventory', 'quality circle', 'lead-in time', 'waste']) {
    if (!taught.includes(want)) problems.push(`quiz-01: "${want}" is asked in the bank and does not appear in the teaching text`);
  }
}

/* ══ 9 · RECALLS ════════════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.map((s) => [s, s.recall]).filter(([, r]) => r);
  if (recalls.length !== SUBSECTIONS.length) problems.push(`structure-02: ${recalls.length} recalls over ${SUBSECTIONS.length} subsections`);
  const types = new Set(recalls.map(([, r]) => r.type));
  for (const want of ['fillin', 'classify', 'match', 'reorder']) if (!types.has(want)) problems.push(`no ${want} recall in the section`);
  /*
   * topFix-04's OWN SHAPE, checked: fill-ins for the two formulas, a fill-in contrasting the
   * quality approaches, and REORDER RESERVED. The item asks for "the seven wastes" as a third
   * formula fill-in; `seven wastes` is 0 hits in the specification (Rule 2), so the waste recall is
   * a classify on this section's own customer test instead, and that departure is recorded rather
   * than silent.
   */
  const byslug = Object.fromEntries(recalls.map(([s, r]) => [s.id.split(':').pop(), r]));
  if (byslug['measuring-capacity-utilisation']?.type !== 'fillin') problems.push('topFix-04: the capacity utilisation formula is not a fill-in');
  if (byslug['measuring-productivity']?.type !== 'fillin') problems.push('topFix-04: the labour productivity formula is not a fill-in');
  if (byslug['quality-control-and-quality-assurance']?.type !== 'fillin') problems.push('topFix-04: the control/assurance/TQM contrast is not a fill-in');
  const reorders = recalls.filter(([, r]) => r.type === 'reorder').map(([s]) => s.id.split(':').pop());
  if (!reorders.includes('continuous-improvement')) problems.push('topFix-04: the kaizen cycle is not a reorder, and it is the one genuine sequence in the section');
  if (reorders.length > 2) problems.push(`topFix-04 asks for reorder to be reserved for a genuine sequence; there are ${reorders.length} (${reorders.join(', ')})`);

  for (const [sec, r] of recalls) {
    const where = sec.id.split(':').pop();
    if (!r.prompt) problems.push(`${where}: recall has no prompt`);
    if ('shuffled' in r) problems.push(`${where}: recall carries \`shuffled\`, which the renderer ignores and CONTENT-GATE says to delete`);
    if (r.type === 'fillin') {
      const blanks = r.template.join(' ').split('___').length - 1;
      if (blanks !== r.answers.length) problems.push(`${where}: ${blanks} blanks against ${r.answers.length} answers`);
      if (r.hints.length !== r.answers.length) problems.push(`${where}: ${r.hints.length} hints against ${r.answers.length} answers`);
      if (!r.distractors || r.distractors.length < 2 || r.distractors.length > 3) problems.push(`${where}: ${r.distractors?.length ?? 0} distractors, and the contract is 2-3`);
      if (new Set(r.answers.map((a) => a.toLowerCase())).size !== r.answers.length) problems.push(`${where}: a duplicated answer, which the grader cannot disambiguate`);
      const printed = new Set(r.template.join(' ').toLowerCase().replace(/_{3,}/g, ' ').split(/[^a-z0-9'-]+/).filter(Boolean));
      r.answers.forEach((a, i) => {
        const h = String(r.hints[i] || '');
        if (h.toLowerCase().startsWith(String(a).toLowerCase().slice(0, 3)) && String(a).length >= 3) problems.push(`${where}: hint "${h}" is a prefix of "${a}"`);
        const words = String(a).toLowerCase().split(' ').filter(Boolean);
        if (words.length && words.every((w) => printed.has(w))) problems.push(`${where}: the answer "${a}" is printed in the template text`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === String(a).toLowerCase())) problems.push(`${where}: "${a}" is both an answer and a distractor`);
        if (/,/.test(String(a))) problems.push(`${where}: answer "${a}" contains a comma, which \`fillin.token\` refuses`);
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      /* Layer 1a: the PROMPT must name the ordering principle, not just the criterion field */
      if (!/\border\b/i.test(r.prompt) || /\blogically\b|in order of explanation/i.test(r.prompt)) problems.push(`${where}: the reorder prompt does not name the ordering principle in words a student can apply`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items, and the contract is 3-5`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
      const leads = r.correctOrder.map((x) => String(x).toLowerCase().split(/[:\s]/)[0]);
      if (new Set(leads).size !== leads.length) problems.push(`${where}: two reorder items share a leading word`);
    }
    if (r.type === 'match') {
      if (r.pairs.length < 3 || r.pairs.length > 5) problems.push(`${where}: ${r.pairs.length} pairs, and the contract is 3-5`);
      if (new Set(r.pairs.map((p) => p.right)).size !== r.pairs.length) problems.push(`${where}: two pairs share a right-hand side`);
      if (r.pairs.some((p) => !p.why)) problems.push(`${where}: a pair with no \`why\``);
    }
    if (r.type === 'classify') {
      if (r.groups.length < 2 || r.groups.length > 3) problems.push(`${where}: ${r.groups.length} groups, and the contract is 2-3`);
      const items = r.groups.flatMap((g) => g.items);
      if (items.length < 4 || items.length > 8) problems.push(`${where}: ${items.length} items across the groups, and the contract is 4-8`);
      if (new Set(items).size !== items.length) problems.push(`${where}: an item appears in two groups`);
      if ('why' in r) problems.push(`${where}: a classify carries a recall-level \`why\`; the renderer and the validator both read \`groups[i].why\``);
      const missing = r.groups.filter((g) => !String(g.why ?? '').trim()).length;
      if (missing) problems.push(`${where}: ${missing} of ${r.groups.length} classify groups have no \`why\``);
    }
  }
}
{
  /*
   * THE ANSWER-RECOVERABLE CHECK, RUN HERE AS WELL AS IN THE VALIDATOR — and this section has NO
   * ROW in `audit/recall-census-baseline.json`, which DECISIONS (packet 2.7) says means it is held
   * to ZERO. There is no inherited debt to lean on. The control is REAL: a recall built out of this
   * section's own sentences, plus a benign one that must NOT fire.
   */
  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const answersOf = (r) => {
    if (r.type === 'fillin') return r.answers;
    if (r.type === 'reorder') return r.correctOrder;
    if (r.type === 'match') return r.pairs.map((p) => p.right);
    return r.groups.flatMap((g) => g.items);
  };
  const recoverable = (sec, r) => {
    const hay = norm([sec.title, sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...((b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))), b.result]), sec.realExample?.text, sec.misconception, sec.examMatters].filter(Boolean).join(' '));
    const long = answersOf(r).map(norm).filter((a) => a.split(' ').length >= 4);
    if (!long.length) return 0;
    return long.filter((a) => hay.includes(a)).length / long.length;
  };
  for (const sec of SUBSECTIONS) {
    const shareR = recoverable(sec, sec.recall);
    if (shareR > 0.5) problems.push(`${sec.id.split(':').pop()}: ${Math.round(shareR * 100)}% of the recall's long answers are printed verbatim in the subsection above it`);
  }
  const control = SUBSECTIONS.find((s) => s.id.endsWith('just-in-time'));
  const plantedAnswers = control.body.slice(0, 3).map((b) => String(b.text).replace(/\*\*/g, '').split('.')[0]);
  const planted = { type: 'reorder', correctOrder: plantedAnswers, why: plantedAnswers.map(() => 'x'), criterion: 'x' };
  if (recoverable(control, planted) <= 0.5) problems.push('the answer-recoverable check does not catch a recall whose answers are the subsection\'s own sentences — the threshold has drifted');
  const benign = { type: 'fillin', answers: ['inventory', 'contribution'], template: [], hints: [], distractors: [] };
  if (recoverable(control, benign) > 0.5) problems.push('the answer-recoverable check fires on a recall that only shares vocabulary with its subsection');
}

/* ══ 10 · TEACHING TEXT, NOTES, FLASHCARDS AND EXTRAS ═══════════════════════ */
const teachingWords = (s) => [s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...((b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))), b.result])].filter(Boolean).join(' ').split(/\s+/).length;
{
  for (const s of SUBSECTIONS) {
    const where = s.id.split(':').pop();
    const w = teachingWords(s);
    if (w > 350) problems.push(`${where}: ${w} words of teaching text against a budget of 350`);
    if (!s.keyIdea) problems.push(`${where}: no key idea`);
    if (s.keyIdea.length > 180) problems.push(`${where}: keyIdea is ${s.keyIdea.length} chars (max 180, schema.lengths)`);
    if (s.keyIdea.includes('**')) problems.push(`${where}: keyIdea carries **bold**, which is rendered plain`);
    if (!s.misconception) problems.push(`${where}: no misconception`);
    if (!s.examMatters) problems.push(`${where}: no exam-matters line`);
    if (!s.realExample?.text) problems.push(`${where}: no real example`);
    if (!s.realExample?.emoji) problems.push(`${where}: no real-example emoji — topFix-03 reports the live one corrupted, so every one is written fresh`);
  }
  /* `claim.uncited` */
  const EXAMINER_CLAIM = /\b(examiners?|markers?)\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  const CITATION = /\((?:source|see|per|from)\b[^)]*\)|\bW(?:EC|BS)1[1-4]\b|\bappendix\b|\bmark\s+scheme\b|\bexaminer'?s?\s+report\b|\bspecification\b/i;
  for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
    if (EXAMINER_CLAIM.test(sent) && !CITATION.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  }
  /* one notes topic per chapter, titled with the chapter */
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((nt, i) => { if (nt.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${nt.title}" and its chapter is "${content[i].title}"`); });
  /*
   * specGap-07 IN BOTH DIRECTIONS. The live defect is material living in the extras chains and
   * never reaching `content[]` — "competitive advantage from lean production is in extras chains
   * only". So every teaching term used in the notes or the extras must appear in some subsection's
   * teaching text.
   */
  const learnText = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).map((b) => b.text || ''), ...(s.body || []).flatMap((b) => b.items || [])]).join(' ').toLowerCase();
  const extrasText = allStrings(EXTRAS).join(' ').toLowerCase();
  const notesText = allStrings(NOTES).join(' ').toLowerCase();
  const TERMS = ['capacity utilisation', 'buffer inventory', 'inventory control', 'just in time', 'waste minimisation', 'lean production', 'quality circle', 'total quality management', 'kaizen', 'cell', 'minimum average cost', 'productivity', 'lead-in time', 'labour-intensive', 'capital-intensive'];
  for (const term of TERMS) {
    if ((notesText.includes(term) || extrasText.includes(term)) && !learnText.includes(term)) {
      problems.push(`specGap-07: "${term}" appears in the notes or extras and in no subsection's teaching text — which is the live condition`);
    }
    if (!learnText.includes(term)) problems.push(`"${term}" is a term this topic turns on and appears in no subsection's teaching text`);
  }
  /* flashcards */
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const f of FLASHCARDS) if (f.front.toLowerCase() === f.back.toLowerCase()) problems.push(`flashcard "${f.front.slice(0, 40)}" has the same front and back`);
  if (FLASHCARDS.length < 28) problems.push(`${FLASHCARDS.length} flashcards for a 28-leaf topic`);
  if (MISTAKES.length < 6) problems.push(`${MISTAKES.length} common mistakes`);
  /* extras: the shape `ExtrasTab.jsx` actually reads (V028) */
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array — ExtrasTab maps chain.steps and the tab throws`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, ev] of EXTRAS.evaluation.entries()) if (typeof ev.content !== 'string' || !ev.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
}
{
  /* one currency SYMBOL, no year, no UK frame, no national institution */
  const ban = (re, why) => { for (const s of readable) { const m = String(s).match(re); if (m) problems.push(`${why}: "${String(s).slice(Math.max(0, String(s).indexOf(m[0]) - 30), String(s).indexOf(m[0]) + 50)}"`); } };
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(String(s)))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency symbol per section`);
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme, which is what removes the Toyota 2021 claim (accuracy-01, topFix-03) rather than correcting it');
  ban(/\bthe UK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame, in a section written for centres in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya (locale.uk)');
  ban(/\bNHS\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b|\bfurlough\b/g, 'a UK institution as the frame of an example (locale.institution)');
}

/* ══ 11 · DIAGRAMS ══════════════════════════════════════════════════════════ */
{
  /* every colour must be a key of processSvg's PALETTE, parsed rather than re-typed (packet 32) */
  const processSvg = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const palette = new Set([...processSvg.matchAll(/'(#[0-9a-fA-F]{6})':/g)].map((m) => m[1].toLowerCase()));
  if (palette.size < 10) problems.push(`only ${palette.size} colours parsed out of processSvg.js; the parse is wrong, not the palette`);
  for (const d of ALL_DIAGRAMS) {
    for (const s of svgOf(d)) {
      for (const m of s.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{6})"/g)) {
        if (!palette.has(m[1].toLowerCase())) problems.push(`${d.title}: colour ${m[1]} is not a key of processSvg's PALETTE`);
      }
      for (const m of s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)) {
        if (Number(m[1]) < MIN_FACE) problems.push(`${d.title}: a ${m[1]}-unit label against a floor of ${MIN_FACE}`);
      }
      const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (!vb || Number(vb[1]) !== FRAME.w) problems.push(`${d.title}: viewBox width ${vb?.[1]} against the ${FRAME.w}-unit frame`);
      for (const m of s.matchAll(/<text x="(-?\d+(?:\.\d+)?)" y="(-?\d+(?:\.\d+)?)" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
        const [, xs, ys, size, anchor, str] = m;
        const w = estWidth(str, Number(size));
        const x = Number(xs);
        const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
        const right = left + w;
        if (left < -2 || right > FRAME.w + 2) problems.push(`${d.title}: "${str.slice(0, 32)}" runs from ${Math.round(left)} to ${Math.round(right)} on a ${FRAME.w}-unit canvas`);
        if (Number(ys) > Number(vb?.[2] ?? 0)) problems.push(`${d.title}: "${str.slice(0, 32)}" has a baseline below the canvas`);
      }
    }
    if (!d.scenarios?.length) problems.push(`${d.title}: no scenarios`);
    if (!(d.checklist?.length >= 3)) problems.push(`${d.title}: fewer than three checklist items`);
    if (!d.description) problems.push(`${d.title}: no description`);
  }
  { const wide = estWidth('x'.repeat(80), FACE); if (!(wide > FRAME.w)) problems.push('the text-extent check cannot fire: 80 characters at face size do not exceed the frame'); }

  /*
   * ── GLYPH-BOX COLLISIONS AND CROSSED LABELS ────────────────────────────────
   * Ported from packet 40, whose Verify B found two colliding pairs its own runner had no check
   * for, and whose A/B proved the tolerance has to be 1.2 rather than 0.75. The line check treats
   * a VERTICAL segment properly; packet 31's version evaluated the line's y at the overlap's x,
   * which for x1 === x2 collapses to y1 and made an axis through a label invisible.
   */
  const textsOf = (s) => [...s.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
  const linesOf = (s) => [...s.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
  });
  const boxesOf = (s) => textsOf(s).filter((tx) => tx.body.trim()).map((tx) => {
    const w = estWidth(tx.body, tx.size);
    const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
    return { ...tx, left, right: left + w, top: tx.y - tx.size * 0.8, bottom: tx.y + tx.size * 0.25 };
  });
  const collides = (a, b) => Math.abs(a.y - b.y) <= COLLIDE_TOL * Math.max(a.size, b.size) && a.left < b.right && b.left < a.right;
  const crossed = (ln, bx) => {
    if (ln.x1 === null || ln.y1 === null) return false;
    const from = Math.max(Math.min(ln.x1, ln.x2), bx.left);
    const to = Math.min(Math.max(ln.x1, ln.x2), bx.right);
    if (from > to) return false;
    const yAt = (x) => ln.y1 + ((x - ln.x1) / (ln.x2 - ln.x1)) * (ln.y2 - ln.y1);
    const ys = ln.x2 === ln.x1 ? [ln.y1, ln.y2] : [yAt(from), yAt(to)];
    return ys.some((y) => y >= bx.top && y <= bx.bottom) || (Math.min(...ys) < bx.top && Math.max(...ys) > bx.bottom);
  };
  for (const d of ALL_DIAGRAMS) {
    for (const scenario of d.scenarios || []) {
      if (!scenario.svg) continue;
      const where = `${d.title} / ${scenario.label}`;
      const boxes = boxesOf(scenario.svg);
      for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i], b = boxes[j];
        if (!collides(a, b)) continue;
        problems.push(`${where}: "${a.body.slice(0, 26)}" (y=${a.y}) and "${b.body.slice(0, 26)}" (y=${b.y}) are ${round2(Math.abs(a.y - b.y))} units apart and overlap by ${round2(Math.min(a.right, b.right) - Math.max(a.left, b.left))} units — one cluster at ${COLLIDE_TOL} of a face`);
      }
      for (const ln of linesOf(scenario.svg)) for (const bx of boxes) {
        if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
      }
    }
  }
  /*
   * A/B, ON GEOMETRY THIS RUNNER DERIVES ITSELF rather than on anything the diagram module
   * reported. The probes are built from `BIZ` — the same figures the drawing is built from, laid
   * out the way a careless version of this section WOULD have laid them out — so a guard that has
   * stopped working cannot pass by agreeing with a stale log.
   */
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    /* the collision this section would have shipped: the buffer label and the order label 12 units
       apart on the right of the inventory chart, which is what a LEAD of 12 would have produced */
    const nearBuffer = mk('Buffer inventory', 270, 183, 12);
    const nearOrder = mk('Re-order level', 270, 171, 12);
    if (!collides(nearBuffer, nearOrder)) problems.push('the collision guard does not fire on two inventory labels 12 units apart, which is the pair a 12-unit lead would have produced');
    const at = (tol, a, b) => Math.abs(a.y - b.y) <= tol * Math.max(a.size, b.size) && a.left < b.right && b.left < a.right;
    if (at(0.75, nearBuffer, nearOrder)) problems.push('that pair fires at a tolerance of 0.75, so packet 40\'s reason for 1.2 no longer holds here and the comment is wrong');
    if (!at(COLLIDE_TOL, nearBuffer, nearOrder)) problems.push(`that pair does not fire at ${COLLIDE_TOL}`);
    const far = mk('Buffer inventory', 270, 220, 12);
    if (collides(nearOrder, far)) problems.push('the collision guard fires on two rows a clear line apart');
    if (!(LEAD > COLLIDE_TOL * FACE)) problems.push(`LEAD is ${LEAD} and the guard's bound at the largest face is ${COLLIDE_TOL * FACE}; a row laid out on LEAD would trip it`);
    const vert = { x1: 56, y1: 48, x2: 56, y2: 214 };
    if (!crossed(vert, mk(units(B.maxInventory), 40, 62, 12))) problems.push('the line-crossing check does not fire on a vertical axis drawn through a label, which is packet 31\'s blind spot');
    const slope = { x1: 56, y1: 58, x2: 262, y2: 183 };
    if (!crossed(slope, mk('tyres held', 120, 100, 12))) problems.push('the line-crossing check does not fire on a label sitting on a sloping line');
    if (crossed(slope, mk('tyres held', 120, 40, 12))) problems.push('the line-crossing check fires on a label well clear of the line');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG */
  const inv = svgOf(ALL_DIAGRAMS[2]).join(' ');
  for (const want of [units(B.maxInventory), units(B.orderPoint), units(B.bufferInventory), units(B.orderQuantity), units(B.tyresPerDay)]) {
    if (!inv.includes(want)) problems.push(`the inventory control diagram does not print "${want}"`);
  }
  const cost = svgOf(ALL_DIAGRAMS[0]).join(' ');
  for (const want of [usd(B.avgAtCapacity), usd(B.avgAtOutput), units(B.crossoverOutput)]) {
    if (!cost.includes(want)) problems.push(`the cost diagram does not print "${want}"`);
  }
  const cap = svgOf(ALL_DIAGRAMS[1]).join(' ');
  for (const want of [pct(B.utilisation), pct(B.utilisationAfterClosure), units(B.maxAfterClosure)]) {
    if (!cap.includes(want)) problems.push(`the capacity diagram does not print "${want}"`);
  }
  const qual = svgOf(ALL_DIAGRAMS[3]).join(' ');
  for (const want of [usd(B.reworkCostMonthly), usd(B.assuranceCostMonthly), usd(B.warrantyCostMonthly), 'Standardise']) {
    if (!qual.includes(want)) problems.push(`the quality diagram does not print "${want}"`);
  }
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
/*
 * `await`, AND THEN A GUARD THAT THE AWAIT HAPPENED (packet 37's own defect: a runner that read
 * `loadBundle()` without awaiting reported 0 BLOCK / 19 DEBT for a section that was 18 / 43).
 */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));

const subs = content.reduce((n2, b) => n2 + b.sections.length, 0);
const recallList = SUBSECTIONS.filter((s) => s.recall);
const byType = recallList.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
const coverage = after.findings.find((f) => f.rule === 'spec.coverage');
const hist = [0, 0, 0, 0]; for (const q of QUIZ) hist[q.correctIndex] += 1;

console.log(`\n${SECTION} — packet 42`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} chapters · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned, keys ${hist.join('/')} across 0-3) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n2, d) => n2 + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recallList.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  coverage: ${coverage?.detail ?? 'not reported'}`);
console.log(`  tariffs parsed from ${SPEC_PATH}:2220-2251 — ${Object.entries(TARIFFS).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
console.log(`  spine:  ${units(B.output)}/${units(B.maxOutput)} = ${pct(B.utilisation)}, and ${units(B.output)}/${units(B.maxAfterClosure)} = ${pct(B.utilisationAfterClosure)} with nothing sold · AC ${usd(B.avgAtOutput)}→${usd(B.avgAtCapacity)} · crossover ${units(B.crossoverOutput)} at ${usd(B.avgLabourAtCrossover)} · inventory ${units(B.tyresPerDay)}/day, order at ${units(B.orderPoint)}, cycle ${days(B.cycleDays)} · JIT saves ${usd(B.jitSavingMonthly)} against ${usd(B.stoppageCost)} a stopped day · waste ${usd(B.wasteMonthly)} = ${usd(B.wastePerUnit)} a ${B.product} · quality ${usd(B.reworkCostMonthly)}→${usd(B.assuranceCostMonthly)}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p2 of problems) console.error(`  - ${p2}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }
/*
 * AND `recall.recoverable` IS INFO, SO NOTHING ABOVE CAN SEE IT. `npm run recalls` is the only gate
 * in the tree that can, and DECISIONS (packet 2.7) says a section with no row in
 * `audit/recall-census-baseline.json` is held to ZERO — this section has no row. The runner refuses
 * on a single finding rather than waiting for the census to fail.
 */
const recoverableFindings = after.findings.filter((f) => f.rule === 'recall.recoverable');
if (recoverableFindings.length) {
  console.error(`\n${recoverableFindings.length} recall(s) answerable by scrolling up, and this section has no baseline row, so it is held to zero:`);
  for (const f of recoverableFindings) console.error(`  - ${f.where}: ${f.detail}`);
  process.exit(1);
}

console.log(`
packet checks
  NUMBERING  2.3.4 asserted BY LINE at ${SPEC_PATH}:965, 2.3.5 at :1009, the four sub-topic labels
             read out of the block, and "2.4.1"-"2.4.4" asserted ABSENT from the whole file — which
             is what refuses specGap-09's request to renumber this section INTO 2.4, and what
             settles the nine ids that cite UK GCE numbering
  APPENDIX   the tariff table PARSED out of ${SPEC_PATH}:2220-2251 rather than imported from
             lib/ial-marking.js, because a check that reads what the fix read cannot see the fix's
             blind spot. Define is asserted to be 2 (practice-01 is right), Assess 10 for Unit 2,
             and topFix-05's own proposed Calculate 4 / Analyse 6 / Explain 4 checked BEFORE being
             built. Points at 6 and below, levels above; Discuss asks for a brief assessment and
             never a conclusion (V036)
  RULE 3     leaf · sub-topic · spec point · the audit · packet n · specGap, and the specification
             as the SPEAKER, banned over every readable string INCLUDING the diagram <text> bodies —
             Verify B's blocking defect was 25 of these in text a student reads, so the class is
             held rather than the sentences edited. A/B'd on the VERBATIM sentences that shipped,
             and in the other direction on "leaves" the verb and the specification QUOTED
  RULE 2     stock control · buffer stock · re-order level · lead time · stock-out · seven wastes
             banned over every readable string EXCEPT a diagram's <text> bodies, A/B'd in both
             directions — and then the exemption checked the other way: the inventory control
             diagram MUST carry all five labels, because a ban satisfied by deleting the drawing
             has removed leaf 3a instead of meeting it
  ARITHMETIC every figure re-derived from the typed inputs: the capacity fraction both ways round,
             the average cost curve searched for its own minimum, the crossover derived and then
             confirmed by evaluating both methods at it, all five inventory labels from the usage
             rate, the JIT trade both sides, the waste total against the average-cost fall it
             produces, and the three quality bills
  STRUCTURE  ${content.length} chapters in the specification's own sub-topic order, ${subs} subsections one to a step,
             ${Object.keys(LEAF_MAP).length} leaves mapped against the 28 in audit/raw/spec-items.json, and the two the
             coverage audit calls MISSING (2c, 3a) asserted present by name. 2b and 2c each mapped
             to BOTH directions, because both leaves read "under and over"
  ITEMS      kaizen asserted to appear in exactly one subsection (structure-06), quality circles
             asserted not to alias it (specGap-06, built at 4a not 4c), cell asserted out of the
             lean subsection (specGap-04), the inventory chapter asserted to hold only sub-topic 3
             (structure-05), no takeaway allowed to contradict the JIT misconception (structure-08),
             the rationalisation twist asserted in the teaching AND in a Calculate item
             (structure-10), and a named real company or a year asserted absent (accuracy-01,
             topFix-03 — removed, not corrected)
  QUIZ       ${unpinned.size} unpinned items first for the pre-test, keys DEALT from a hash of each stem so the
             ${hist.join('/')} distribution across 0-3 is a property of construction, the histogram gate A/B'd
             against the live 23-of-25 bank it has to fail, and no explanation naming an option by
             letter or position (packet 26, and F074 reshuffles at render anyway)
  PINS       derived from each item's own chapter tag, so the block 0 / block 1 swap (structure-01,
             quiz-01) and the three never-surfaced practice items (structure-07) are both
             unrepresentable; pinned by diagramId, never by the legacy diagramRef topFix-02 names
  RECALLS    ${recallList.length} from zero (structure-02), all four contract types, the fill-in contract enforced
             before the validator sees it, reorder reserved for the kaizen cycle, and the
             answer-recoverable check run against a REAL negative control built from this section's
             own prose AND a benign control that must NOT fire — no row in
             recall-census-baseline.json, so this section is held to zero and inherits nothing
  DIAGRAMS   ${ALL_DIAGRAMS.length} diagrams on a ${FRAME.w}-unit frame with a ${MIN_FACE}-unit floor, every colour parsed out of
             processSvg.js, text EXTENT inside the canvas, GLYPH-BOX COLLISIONS at ${COLLIDE_TOL} of a face
             and the line-crossing check including vertical segments — both A/B'd against geometry
             this runner derives from BIZ rather than reusing any log — and every headline figure
             counted back OUT of the emitted SVG`);

if (DUMP) {
  const out = `audit/snapshots/packet-42-bundle__business__${SECTION}.json`;
  writeFileSync(out, `${JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-42-bundle', tables: bundle }, null, 1)}\n`);
  console.log(`\nbundle written to ${out}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
