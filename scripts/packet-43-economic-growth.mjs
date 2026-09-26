#!/usr/bin/env node
/**
 * PACKET 43 — economic-growth, Economics Unit 2 (WEC12), IAL topic 2.3.5.
 * `audit/raw/econ_spec.txt:1094-1125`. FIVE chapters, TWENTY-ONE subsections, 23 leaves.
 *
 *   node scripts/packet-43-economic-growth.mjs            # dry run, every check
 *   node scripts/packet-43-economic-growth.mjs --dump     # + write the bundle snapshot
 *   node scripts/packet-43-economic-growth.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Every check below exists because something it looks
 * for shipped in this repository on a date.
 *
 *   - **THE TRADE CYCLE IS NOT IN THE SPECIFICATION, AND THE RUNNER MEASURES THAT RATHER THAN
 *     RECORDING IT.** "cycle", "boom", "slump" and "trough" are re-counted in `econ_spec.txt`
 *     (expected 0 each), and "recession" is asserted to have exactly one hit, owned by 2.3.1 in
 *     the oracle. If any of those ever became false, the decision not to rebuild the live block 3
 *     would be wrong and the build would say so.
 *   - **THE NUMBERING IS ASSERTED BY LINE** (`specGap-07`): 2.3.4 at :1056, 2.3.5 at :1094, 2.3.6 at
 *     :1132.
 *   - **APPENDIX 6 IS PARSED OUT OF THE SPECIFICATION**, not imported from `lib/ial-marking.js` —
 *     a second reading of the same source is the only way a shared error is visible (packet 34).
 *   - **EVERY FIGURE IS RE-DERIVED BY A SECOND METHOD** than the one that produced it: the trend is
 *     recovered from the potential path, the gaps from the levels, the doubling times by counting
 *     years rather than by logarithm, and the equilibria on the diagrams are re-checked against
 *     both curves.
 *   - **EVERY DIAGRAM IS GUARDED FOR GLYPH COLLISIONS AT 1.2 OF A FACE AND FOR LINES THROUGH
 *     LABELS, INCLUDING VERTICAL ONES** (packets 31, 37, 40), and both guards are A/B'd on geometry
 *     derived here.
 *   - **RULE 3** (packet 42): no student-facing string may speak in the build's own vocabulary.
 *   - **A/B EVERY NEW CHECK** (packet 21): a guard never seen to fail is not known to work.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, bn, pct, round1, round2,
  POTENTIAL_CAUSES, BENEFITS, COSTS, BANNED, SCAFFOLDING_IN_PROSE, NEEDS_ONE, TEACHING_TERMS,
} from './_packet43-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP, B1, B2, B3, B4, B5,
} from './_packet43-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet43-assessment.mjs';
import {
  DIAGRAM_FOR_BLOCK, ALL_DIAGRAMS, FRAME, MIN_FACE, FACE, LEAD, COLLIDE_TOL, estWidth,
  EQ, LR, AP, OC, PPF, FRONTIER_SAMPLES, frontierIndex, makeAS, makeAD, solve,
} from './_packet43-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const E = ECON;

const problems = [];
const bad = (msg) => problems.push(msg);
const ok = (cond, msg) => { if (!cond) bad(msg); };
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

const SPEC_PATH = 'audit/raw/econ_spec.txt';
const SPEC = readFileSync(SPEC_PATH, 'utf8');
const SPEC_LINES = SPEC.split('\n');
const ORACLE = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items;

/* ══ 0 · The pins are DERIVED, never written ═════════════════════════════ */

const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
const quizIndices = Object.fromEntries(BLOCKS.map((b) => [b, quizByBlock[b] || []]));
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b] || []]));
ok(DIAGRAM_FOR_BLOCK.length === BLOCKS.length, `${DIAGRAM_FOR_BLOCK.length} diagram slots for ${BLOCKS.length} chapters`);
/* `null` is a decision (packet 2.91: decidedNoDiagram), never an omission — every slot is written */
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAM_FOR_BLOCK[i] ? DIAGRAM_FOR_BLOCK[i].id : null]));

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  diagrams: ALL_DIAGRAMS,
  mistakes: MISTAKES,
  extras: EXTRAS,
};

/* ══ 1 · Every surface, as strings, and a failed substitution on any of them ══ */

const allStrings = (v, out = []) => {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out));
  return out;
};
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const joined = readable.join('\n');

/* NO TRAILING \b (packet 29): `/\bundefined\b/` does not match `undefinedQ`. */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{|\bInfinity\b/;
texts.forEach((s) => { if (FAILED_SUBSTITUTION.test(s)) bad(`failed substitution in: ${s.slice(0, 90)}`); });

/* ══ 2 · RULE 1 — the numbering, BY LINE ══════════════════════════════════ */

const lineIs = (n, re) => re.test(SPEC_LINES[n - 1] || '');
ok(lineIs(1056, /^\f?2\.3\.4 National income\s*$/), `${SPEC_PATH}:1056 is not "2.3.4 National income"`);
ok(lineIs(1094, /^\f?2\.3\.5 Economic growth\s*$/), `${SPEC_PATH}:1094 is not "2.3.5 Economic growth" — specGap-07's doubt would stand`);
ok(lineIs(1132, /^\f?2\.3\.6 Macroeconomic objectives and policies\s*$/), `${SPEC_PATH}:1132 is not "2.3.6 …"`);
const SPAN = [1094, 1125];
const flat = (s) => String(s).replace(/\s+/g, ' ').trim().toLowerCase();
const specHas = (phrase, [from, to] = SPAN) => flat(SPEC_LINES.slice(from - 1, to).join(' ')).includes(flat(phrase));

/* the module's three lists, re-read from the span rather than trusted */
POTENTIAL_CAUSES.forEach((c) => ok(specHas(c), `cause not found in 2.3.5 · 1d: "${c}"`));
BENEFITS.forEach((b) => ok(specHas(b), `benefit not found in 2.3.5 · 2a: "${b}"`));
COSTS.forEach((c) => ok(specHas(c), `cost not found in 2.3.5 · 3a: "${c}"`));
ok(POTENTIAL_CAUSES.length === 4 && BENEFITS.length === 6 && COSTS.length === 5, 'the 1d/2a/3a lists are not 4/6/5 long');

/* ══ 3 · RULE 1 — the refusals, re-measured rather than recorded ═════════ */

const countIn = (re, text = SPEC) => (text.match(re) || []).length;
/*
 * THE OWNER OF A LINE IS THE NEAREST TOPIC HEADING ABOVE IT, read off the document. The oracle's
 * `lines` cover leaves only, so a hit in a requirement heading or a bullet the oracle missed (V001)
 * has no oracle row — the first version of this check used the oracle and reported no owner at all.
 */
const ownerOfLine = (n) => {
  for (let i = n; i >= 1; i -= 1) {
    const m = (SPEC_LINES[i - 1] || '').match(/^\f?(\d\.\d\.\d) [A-Z]/);
    if (m) return m[1];
  }
  return null;
};
ok(ownerOfLine(1100) === '2.3.5' && ownerOfLine(902) === '2.3.1' && ownerOfLine(1947) === '4.3.6', 'A/B: the line-owner locator misplaces lines whose topic is known');
BANNED.filter((b) => b.specRe).forEach((b) => {
  const hits = countIn(b.specRe);
  const expect = b.specHits ?? 0;
  ok(hits === expect, `RULE 1: "${b.specRe.source}" has ${hits} hits in ${SPEC_PATH}, expected ${expect} — ${b.why}`);
  if (b.owner) {
    const re = new RegExp(b.specRe.source, b.specRe.flags.replace('g', ''));
    const owners = new Set(SPEC_LINES.map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l)).map(([n]) => ownerOfLine(n)));
    ok(owners.size === 1 && owners.has(b.owner), `RULE 1: "${b.specRe.source}" should be owned by ${b.owner} only; owners ${[...owners].join(', ')}`);
  }
});
/* the one hit `recession` has is 2.3.1 · 1g, and nothing in 2.3.5 */
{
  const lines = SPEC_LINES.map((l, i) => [i + 1, l]).filter(([, l]) => /\brecession\b/i.test(l)).map(([n]) => n);
  ok(lines.length === 1 && ownerOfLine(lines[0]) === '2.3.1', `"recession" should have one hit, owned by 2.3.1; found lines ${lines.join(', ')} owned by ${lines.map(ownerOfLine).join(', ')}`);
}
/*
 * practice-02: FDI as a strategy to PROMOTE growth and development is 4.3.6 · 3a ("promotion of
 * FDI", :1947), under a heading about developing, emerging and developed economies. What 2.3.5 owns
 * is FDI as a cause of potential growth (1d-1). Both halves measured.
 */
{
  const lines = SPEC_LINES.map((l, i) => [i + 1, l]).filter(([, l]) => /promotion of FDI/i.test(l)).map(([n]) => n);
  ok(lines.length === 1 && ownerOfLine(lines[0]) === '4.3.6', `"promotion of FDI" should be one line owned by 4.3.6; found ${lines.map((n) => `${n}:${ownerOfLine(n)}`).join(', ')}`);
  ok(countIn(/developing countries/gi) === 0, '"developing countries" now appears in the specification — recheck the practice-02 framing ban');
  ok(specHas('foreign direct investment (FDI)'), '2.3.5 no longer names FDI — the obligation to teach it as a cause of potential growth would lapse');
}

/* ══ 4 · Appendix 6, parsed out of the specification ═════════════════════ */

const APPENDIX_6 = (() => {
  /* the heading appears in the contents too; the real one is followed by the table (packet 38) */
  let head = -1;
  for (let i = SPEC.indexOf('Appendix 6'); i >= 0; i = SPEC.indexOf('Appendix 6', i + 1)) {
    if (/Command\s+Number\s+What students are required to do/.test(SPEC.slice(i, i + 1200))) { head = i; break; }
  }
  if (head < 0) return new Map();
  const block = SPEC.slice(head, SPEC.indexOf('Appendix 7:', head));
  const found = new Map();
  for (const lineText of block.split('\n')) {
    const m = lineText.match(/^\s(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate\/?\s*To)\s+(\d+)(?:\s+or\s+(\d+))?\s{2,}\S/);
    if (!m) continue;
    found.set(m[1].startsWith('Evaluate') ? 'Evaluate' : m[1], [Number(m[2]), m[3] ? Number(m[3]) : null].filter(Boolean));
  }
  return found;
})();
ok(APPENDIX_6.size === 8, `Appendix 6 parse found ${APPENDIX_6.size} command words, expected 8`);
[['Define', [2]], ['Calculate', [2, 4]], ['Draw', [4]], ['Explain', [4]], ['Analyse', [6]],
  ['Examine', [8]], ['Discuss', [14]], ['Evaluate', [20]]].forEach(([name, marks]) => {
  const got = APPENDIX_6.get(name);
  ok(got && got.join(',') === marks.join(','), `Appendix 6: ${name} parsed as ${got} not ${marks}`);
});
/* the live items' premises, measured */
ok(!APPENDIX_6.has('Assess') && !APPENDIX_6.has('Outline'), 'Assess or Outline appears in Appendix 6 — practice-02/topFix-03 would be wrong');
ok(![...APPENDIX_6.values()].flat().includes(10), 'a 10-mark tariff exists — practice-02 would be right');
ok(APPENDIX_6.get('Define')?.[0] === 2, 'Define is not 2 — practice-01 would be wrong');
ok(!APPENDIX_6.get('Explain')?.includes(6), 'Explain carries 6 — the live "Explain … (6 marks)" would be valid');

PRACTICE.forEach((p) => {
  const marks = APPENDIX_6.get(p.command);
  ok(!!marks, `practice "${p.question.slice(0, 50)}" uses "${p.command}", not an IAL Economics command word`);
  ok(marks && marks.includes(p.marks), `practice "${p.command} ${p.marks}" is not an Appendix 6 tariff (allowed: ${marks})`);
  /* data first, then the command, is the IAL shape for Calculate; the command must START a sentence */
  ok(new RegExp(`(^|[.?] )${p.command}\\b`).test(p.question), `practice "${p.question.slice(0, 40)}" has no sentence opening with its command word`);
  ok(p.question.includes(`(${p.marks} mark`), `practice "${p.question.slice(0, 50)}" does not state its tariff`);
  const paras = p.guidance.split('\n');
  ok(paras.length >= 2, `practice "${p.command} ${p.marks}" guidance is one paragraph (practice.opening)`);
  ok(!/\(\s*\d+\s*(marks?)?\s*\)/i.test(paras[0]), `practice "${p.command} ${p.marks}" opening allocates marks`);
  ok(!/\$\d|\b\d+(\.\d+)?%/.test(paras[0]), `practice "${p.command} ${p.marks}" opening carries a figure`);
  if (p.marks > 6) ok(!/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance), `practice "${p.command} ${p.marks}" allocates points but is levels-marked (practice.levels)`);
  ladderProblems(p).forEach((m) => ok(false, m));
});
/*
 * topFix-03, fix round 1: the verifier found the >6-mark schemes said "levels-marked" and described one
 * strong response, with no bands. The round-0 check REQUIRED that phrase, so it could not see the gap —
 * and the phrase itself is a marking claim DECISIONS 2026-09-16 item 3 bans. Now: the scheme carries
 * Level 1..N in order (N = 3 for Examine 8, 4 for Discuss 14 / Evaluate 20 — packets 37/40/42), the
 * opening carries none, no tariff at or below 6 carries a ladder, and "levels-marked"/KAA appear nowhere.
 */
function ladderProblems(p) {
  const out = [];
  const [opening, ...rest] = p.guidance.split('\n');
  const scheme = rest.join('\n');
  const tag = `practice "${p.command} ${p.marks}"`;
  if (/\bLevel [1-9]\b/.test(opening)) out.push(`${tag}: the opening carries level descriptors (practice.opening)`);
  if (/\blevels?-marked\b|\bKAA\b/i.test(p.guidance)) out.push(`${tag}: "levels-marked"/KAA is a marking claim (DECISIONS 2026-09-16 item 3)`);
  const got = [...scheme.matchAll(/\bLevel ([1-9])\b/g)].map((m) => Number(m[1]));
  if (p.marks > 6) {
    const top = p.marks === 8 ? 3 : 4;
    const want = Array.from({ length: top }, (_, i) => i + 1);
    if (got.join(',') !== want.join(',')) out.push(`${tag}: level ladder is [${got}], want [${want}] (topFix-03, CONTENT-GATE.md:38)`);
  } else if (got.length) out.push(`${tag}: a ${p.marks}-mark item is point-marked but carries a level ladder`);
  return out;
}
{ /* A/B: the round-0 shape must fire; a correct ladder must not */
  const bad = { command: 'Discuss', marks: 14, guidance: 'Plan it.\nThis is levels-marked across knowledge. A strong response explains X.' };
  const skip = { command: 'Evaluate', marks: 20, guidance: 'Plan it.\nLevel 1 lists. Level 2 explains. Level 4 judges.' };
  const good = { command: 'Examine', marks: 8, guidance: 'Plan it.\nLevel 1 asserts. Level 2 explains. Level 3 develops.' };
  const low = { command: 'Explain', marks: 4, guidance: 'Plan it.\nLevel 1 states.' };
  ok(ladderProblems(bad).length === 2, 'A/B: ladder check does not fire on the round-0 "levels-marked" scheme');
  ok(ladderProblems(skip).length === 1, 'A/B: ladder check does not fire on a skipped level');
  ok(ladderProblems(good).length === 0, 'A/B: ladder check fires on a correct Examine 1-3 ladder');
  ok(ladderProblems(low).length === 1, 'A/B: ladder check does not fire on a ladder under a point-marked tariff');
}
{
  const pairs = [...APPENDIX_6.entries()].flatMap(([c, ms]) => ms.map((m) => `${c} ${m}`));
  const have = new Set(PRACTICE.map((p) => `${p.command} ${p.marks}`));
  pairs.forEach((pair) => ok(have.has(pair), `no practice item at "${pair}"`));
}

/* ══ 5 · RULE 2 — the bans, per sentence, and the one carve-out ══════════ */

const sentencesOf = (s) => String(s).split(/(?<=[.!?])\s+/);
const readableSentences = readable.flatMap(sentencesOf);
BANNED.forEach((b) => {
  const hits = readableSentences.filter((sent) => b.re.test(sent) && !(b.exemptIf && b.exemptIf.test(sent)));
  ok(hits.length === 0, `banned: ${b.why} — "${(hits[0] || '').slice(0, 90)}"`);
});
NEEDS_ONE.forEach((n) => ok(n.re.test(joined), `missing required statement: ${n.why}`));
TEACHING_TERMS.forEach((term) => ok(joined.toLowerCase().includes(term.toLowerCase()), `the specification's own term "${term}" never appears`));
/* the recession carve-out, A/B'd both ways (packet 37): the pointer passes, teaching the term fails */
{
  const ban = BANNED.find((b) => b.exemptIf && /recession/.test(String(b.re)));
  const mustExempt = 'A negative output gap is not a recession, which topic 2.3.1 defines as two consecutive quarters of negative growth.';
  const mustCatch = 'In a recession, output falls and unemployment rises as the economy moves through the downturn.';
  ok(!!ban, 'the recession ban has lost its exemption');
  ok(ban && ban.re.test(mustExempt) && ban.exemptIf.test(mustExempt), 'A/B: the recession pointer sentence is not exempted');
  ok(ban && ban.re.test(mustCatch) && !ban.exemptIf.test(mustCatch), 'A/B: the exemption passes a sentence that TEACHES recession');
  const boom = BANNED.find((b) => /boom/.test(String(b.re)));
  ok(boom && boom.re.test('During the boom phase firms expand.'), 'A/B: the boom ban does not catch "boom"');
  ok(boom && !boom.re.test('Booming exports raised demand.') === !/\bboom\b/i.test('Booming exports raised demand.'), 'A/B: the boom ban and its own regex disagree');
}

/* ══ 5a · RULE 3 — the words that address the audit and not the student ══ */
{
  for (const [re, why] of SCAFFOLDING_IN_PROSE) {
    for (const s2 of readable) {
      const m = String(s2).match(re);
      if (m) bad(`Rule 3 — ${why}. Found "${m[0]}" in: "${String(s2).slice(Math.max(0, String(s2).indexOf(m[0]) - 40), String(s2).indexOf(m[0]) + 60)}"`);
    }
  }
  const fires = (t) => SCAFFOLDING_IN_PROSE.some(([re]) => re.test(t));
  /* POSITIVE — verbatim sentences packet 42's Verify B found shipped, and the shape this section's
     own first draft used ("Explain questions on 1c …" was caught by reading, so its class is held) */
  ['Leaf 1a names **four** methods of production: job, batch, flow, cell.',
    'Leaf 3a asks for the **interpretation of an inventory control diagram**',
    'Sub-topic 1 lists six macroeconomic objectives, and the first is economic growth',
    'The specification lists it at 1a beside job, batch and flow',
    'This is specGap-03 and the audit asked for it.'].forEach((t) => ok(fires(t), `Rule 3 is blind to "${t.slice(0, 60)}"`));
  /* NEGATIVE — correct prose a broader ban would have deleted */
  ['An improvement that leaves with the person who made it is lost.',
    'Topic 2.3.6 treats these as supply-side policies.',
    'Growth in the size of the labour force, including net migration, raises capacity.',
    'The specification\'s own wording has three components in it'].forEach((t) => ok(!fires(t), `Rule 3 fires on correct prose: "${t.slice(0, 60)}"`));
}

/* ══ 6 · THE ARITHMETIC SPINE, RE-DERIVED BY A SECOND METHOD ═══════════════ */

/* the trend, recovered from the potential path by a log-linear fit rather than read from ECON */
{
  const ln = E.potential.map((p) => Math.log(p));
  const n = ln.length; const xs = E.YEARS;
  const mx = xs.reduce((a, b) => a + b, 0) / n; const my = ln.reduce((a, b) => a + b, 0) / n;
  const slope = xs.reduce((s, x, i) => s + (x - mx) * (ln[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  ok(near((Math.exp(slope) - 1) * 100, E.trendRate, 1e-9), `the potential path's own growth rate is ${(Math.exp(slope) - 1) * 100}, not the ${E.trendRate}% the text states`);
}
/* the gaps, recomputed from the levels */
E.YEARS.forEach((y, i) => ok(near((E.actual[i] / E.potential[i] - 1) * 100, E.GAPS[i], 1e-9), `Year ${y}: gap recomputed ≠ ${E.GAPS[i]}%`));
ok(near(E.neg.potential, 500) && near(E.neg.actual, 490) && near(E.neg.gapBn, -10), 'Year 3 is not $500bn capacity, $490bn output, −$10bn');
ok(round1(E.pos.gapPct) === 2 && E.pos.actual > E.pos.potential, 'Year 7 is not a +2% gap');
/* the growth rates the text prints, as a set, and their relation to the trend */
{
  const printed = E.growth.slice(1).map((x) => round1(x));
  ok(printed.join(',') === '1.5,1.5,3.5,3.5,3.5,3.5,1.5,1.5', `the printed growth rates are ${printed.join(',')}`);
  /* the teaching's claim: below-trend growth WIDENS a gap or turns it negative; above-trend closes/turns it positive */
  E.growth.forEach((gr, i) => {
    if (gr === null) return;
    const dGap = E.GAPS[i] - E.GAPS[i - 1];
    ok((gr < E.trendRate && dGap < 0) || (gr > E.trendRate && dGap > 0), `Year ${i + 1}: growth ${round2(gr)} against trend ${E.trendRate} moved the gap by ${dGap} — the direction the text teaches is wrong here`);
  });
  ok(E.growth[E.at(3)] > 0 && E.GAPS[E.at(3)] < 0, 'the section says Year 3 grew with a negative gap; it did not');
  ok(E.GAPS[0] === 0 && E.GAPS[E.GAPS.length - 1] === 0, 'the text says actual output starts and ends on the trend');
  ok(E.GAPS[E.at(5)] === 0, 'the chain says the gap has closed by Year 5');
}
/* AD components add to the output they claim to explain */
ok(E.C + E.I + E.G + E.X - E.M === E.actual[E.at(3)], `C+I+G+(X−M) = ${E.C + E.I + E.G + E.X - E.M}, not Year 3's ${E.actual[E.at(3)]}`);
/* capacity from workers × productivity, and its growth by the product of factors, then by levels */
ok(near(E.capacityCheck, E.potentialRef), `workers × output per worker = ${E.capacityCheck}, not the ${E.potentialRef} potential the gap chart uses`);
{
  const byLevels = ((E.nextWorkers * E.nextOutputPerWorker) / (E.workers * E.outputPerWorker) - 1) * 100;
  const byFactors = ((1 + E.labourGrowth / 100) * (1 + E.productivityGrowth / 100) - 1) * 100;
  ok(near(byLevels, byFactors, 1e-9) && near(byLevels, E.capacityGrowth, 1e-9), 'capacity growth disagrees between levels and factors');
  ok(round1(E.capacityGrowth) === E.trendRate, `capacity growth ${E.capacityGrowth} does not round to the ${E.trendRate}% trend the text says it matches`);
  ok(Math.abs(E.productivityGrowth / E.capacityGrowth - 0.8) < 0.01, '"four fifths of it came from productivity" is not true of the figures');
  ok(E.nextCapacity.toFixed(2) === '512.55', `next year's capacity prints as ${E.nextCapacity.toFixed(2)}`);
}
/* the doubling times, by COUNTING years rather than by the logarithm the module used */
{
  const countYears = (r) => { let v = 1, n = 0; while (v < 2) { v *= 1 + r / 100; n += 1; } return n; };
  const fast = countYears(E.capacityGrowth); const slow = countYears(E.slowRate);
  ok(Math.abs(fast - Math.round(E.doublingFast)) <= 1, `doubling at ${E.capacityGrowth}%: counted ${fast} years, text says about ${Math.round(E.doublingFast)}`);
  ok(Math.abs(slow - Math.round(E.doublingSlow)) <= 1, `doubling at ${E.slowRate}%: counted ${slow} years, text says about ${Math.round(E.doublingSlow)}`);
  ok(round1(E.slowRate) === 1.5, `the halved-productivity rate is ${E.slowRate}, which the text prints as ${pct(E.slowRate)}`);
}
/* tax: the share applied to each GDP figure, and the printed rounding consistent both ways */
{
  const from = (E.taxShare / 100) * E.actual[E.at(3)]; const to = (E.taxShare / 100) * E.actual[E.at(4)];
  ok(near(from, E.taxFrom) && near(to, E.taxTo), 'tax revenue does not re-derive');
  const printedDiff = round1(round1(to) - round1(from));
  ok(printedDiff === round1(to - from), `the printed revenue figures differ by ${printedDiff} but the printed increase is ${round1(to - from)}`);
  const fromPrinted = round1((E.taxShare / 100) * round1(E.actual[E.at(4)])) - round1(from);
  ok(round1(fromPrinted) === round1(to - from), 'a student working from the PRINTED GDP figure gets a different increase from the one the key gives');
}
/* trade */
ok(E.balanceEarly === 20 && E.balanceLate === -8, `trade balances are ${E.balanceEarly} and ${E.balanceLate}`);
ok((E.tradeLate.M / E.tradeEarly.M) > (E.tradeLate.X / E.tradeEarly.X), 'imports did not grow faster than exports, but the text says they did');
ok((E.tradeLate.M / E.tradeEarly.M) > (E.actual[E.at(7)] / E.actual[E.at(3)]), 'imports grew more slowly than income — the "imports rise with income" story would be understated');
/* measuring: three estimates, three signs */
{
  const signs = E.ESTIMATES.map((x) => Math.sign(round1(x.gapPct)));
  ok(signs.join(',') === '1,0,-1', `the three estimates give signs ${signs.join(',')}, not +,0,−`);
  E.ESTIMATES.forEach((x) => ok(near((E.actual[E.at(E.judgeYear)] / (E.potentialRef * (1 + x.rate / 100) ** (E.judgeYear - E.refYear)) - 1) * 100, x.gapPct, 1e-9), `estimate at ${x.rate}% does not recompute`));
}
/* every headline figure appears in the body AND on at least one other surface (Layer 5 by string) */
{
  const bodyText = SUBSECTIONS.flatMap((s) => allStrings(s.body)).join(' ');
  const elsewhere = allStrings([NOTES, EXTRAS, QUIZ, PRACTICE, FLASHCARDS]).join(' ') + svgText.join(' ');
  [bn(E.neg.potential), bn(E.neg.actual), pct(E.trendRate), bn(E.capacityCheck), bn(E.taxFrom), bn(E.taxTo)].forEach((f) => {
    ok(bodyText.includes(f), `headline figure ${f} is not in the teaching text`);
    ok(elsewhere.includes(f), `headline figure ${f} appears nowhere but the teaching text`);
  });
}

/* ══ 6a · THE DIAGRAMS' CLAIMS, CHECKED AGAINST BOTH CURVES ═══════════════ */
{
  /* spare capacity: output up, price level not */
  const [s1, s2] = EQ.spare; const [n1, n2] = EQ.near;
  ok(s1 && s2 && n1 && n2 && LR.before && LR.after, 'an AD/AS equilibrium failed to solve');
  const dY = (a, b) => b.x - a.x; const dP = (a, b) => a.y - b.y;    // screen y down = price down
  ok(near(dP(s1, s2), 0, 1e-6) && dY(s1, s2) > 0, `spare capacity: ΔY ${dY(s1, s2)}, ΔP ${dP(s1, s2)} — the text says output rises and the price level does not`);
  ok(dP(n1, n2) > 16 && dY(n1, n2) > 0 && dY(n1, n2) < dY(s1, s2) / 2, `near capacity: ΔY ${round1(dY(n1, n2))} against ${dY(s1, s2)}, ΔP ${round1(dP(n1, n2))} — "output rises by less; the price level rises" must hold with a margin`);
  ok(dY(LR.before, LR.after) > 0 && dP(LR.before, LR.after) < 0, 'LRAS shift: output must rise and the price level FALL');
  /* each equilibrium re-checked: it must lie on the AD line AND the AS curve independently */
  const AS1 = EQ.as;
  [...EQ.spare, ...EQ.near].forEach((e) => ok(near(AS1.at(e.x), e.y, 1e-6), `an equilibrium (${round1(e.x)}, ${round1(e.y)}) is not on the AS curve`));
  ok(near(LR.as1.at(LR.before.x), LR.before.y, 1e-6) && near(LR.as2.at(LR.after.x), LR.after.y, 1e-6), 'an LRAS equilibrium is off its curve');
  /* the Keynesian curve's three ranges: flat, rising, and rising ever faster */
  const xs = []; for (let x = 70; x < AS1.xTop; x += 2) xs.push(x);
  const ys = xs.map((x) => AS1.at(x));
  ok(ys.every((y, i) => i === 0 || y <= ys[i - 1] + 1e-12), 'the Keynesian AS curve is not non-decreasing in price');
  const slopes = ys.slice(1).map((y, i) => ys[i] - y);
  ok(slopes.every((s, i) => i === 0 || s >= slopes[i - 1] - 1e-9), 'the Keynesian AS curve does not steepen monotonically');
  ok(slopes[0] === 0, 'the Keynesian AS curve has no flat range');
  /* the PPF: A inside, B on, C on the shifted frontier; the frontier concave by sampling */
  ok(frontierIndex(AP.A) < 0.95 && near(frontierIndex(AP.B), 1, 1e-9) && near(frontierIndex(AP.C, AP.shift), 1, 1e-9), 'the PPF points are not inside / on / on-shifted');
  const fs = FRONTIER_SAMPLES.slice().sort((a, b) => a[0] - b[0]);
  const grads = fs.slice(1).map((p, i) => (p[1] - fs[i][1]) / (p[0] - fs[i][0] || 1e-9));
  ok(grads.every((g, i) => i === 0 || g >= grads[i - 1] - 1e-9), 'the frontier is not concave to the origin');
  /* opportunity cost: B has more capital goods and fewer consumer goods than A, and a bigger shift */
  ok(OC.B[1] < OC.A[1] && OC.B[0] < OC.A[0] && OC.shiftB > OC.shiftA, 'the opportunity-cost diagram does not show B = more capital, fewer consumer goods, bigger shift');
  /* A/B the solver on a case with a known answer */
  const flatAS = makeAS({ x1: 300, yf: 390, xTop: 380 });
  const probe = solve(makeAD(150, flatAS.pFlat), flatAS);
  ok(probe && near(probe.x, 150, 1e-6), 'the equilibrium solver misplaces an intersection whose answer is known');
}

/* ══ 7 · STRUCTURE, PINS AND LEAF COVERAGE ═════════════════════════════════ */

ok(BLOCKS.length >= 4 && BLOCKS.length <= 7, `${BLOCKS.length} chapters: at 8 the pre-test drops to two and at 9 a chapter gets no check-in (packet 25)`);
ok(SUBSECTIONS.length === 21, `expected 21 subsections, have ${SUBSECTIONS.length}`);
ok(new Set(SUBSECTIONS.map((s) => s.id)).size === SUBSECTIONS.length, 'two subsections share an id');
{
  const lens = content.map((b) => b.sections.length);
  ok(Math.max(...lens) <= 2 * Math.min(...lens), `chapter lengths ${lens.join('/')}: the longest is more than twice the shortest (packet 31)`);
}
content.forEach((b, i) => {
  ok((b.quizIndices || []).length > 0, `chapter "${b.title}" has no quiz item`);
  ok((b.practiceIndices || []).length > 0, `chapter "${b.title}" has no practice item`);
  ok('diagramId' in b, `chapter "${b.title}" carries no diagramId key — absent falls back to the title matcher`);
  ok(!('diagramRef' in b), `chapter "${b.title}" carries a legacy diagramRef`);
  if (b.diagramId === null) ok(b.title === B3, `chapter "${b.title}" is pinned to no diagram, and only the benefits chapter is decided that way`);
  else ok(ALL_DIAGRAMS.some((d) => d.id === b.diagramId), `chapter "${b.title}" pins a diagram that does not exist`);
});
{
  const pinned = content.map((b) => b.diagramId).filter(Boolean);
  ok(new Set(pinned).size === pinned.length, 'two chapters share a diagram pin');
  ok(pinned.length === ALL_DIAGRAMS.length, 'a diagram is pinned by no chapter');
  ok(new Set(ALL_DIAGRAMS.map((d) => d.id)).size === ALL_DIAGRAMS.length, 'two diagrams share an id');
  ok(ALL_DIAGRAMS.every((d) => typeof d.id === 'string' && d.id.startsWith(`${SECTION}:diagram:`)), 'a diagram has no minted id');
}
/* pins.identity */
ok(!content.map((b) => b.quizIndices[0]).every((v, i) => v === i), 'quizIndices are 0,1,2,… in chapter order — the live defect');
/* every quiz and practice item reached, exactly once */
{
  const q = content.flatMap((b) => b.quizIndices); const p = content.flatMap((b) => b.practiceIndices);
  ok(new Set(q).size === q.length && q.length === QUIZ.length - unpinned.size, `${q.length} pinned quiz items of ${QUIZ.length} (${unpinned.size} unpinned)`);
  ok(new Set(p).size === p.length && p.length === PRACTICE.length, `${p.length} pinned practice items of ${PRACTICE.length}`);
}
/* structure-05: what Learn Mode SURFACES is each chapter's first practice pin, so name it */
{
  const surfaced = content.map((b) => { const p = PRACTICE[b.practiceIndices[0]]; return `${p.command} ${p.marks}`; });
  ok(surfaced.join(',') === 'Define 2,Analyse 6,Examine 8,Evaluate 20,Discuss 14', `Learn Mode surfaces ${surfaced.join(', ')}`);
  content.forEach((b) => ok(b.practiceIndices.every((i) => PRACTICE[i].block === b.title), `chapter "${b.title}" pins practice from another chapter`));
}
/* the pre-test: three, first, answerable from chapter 1 */
{
  const pre = QUIZ.filter((x) => !x.block);
  ok(pre.length === 3, `${pre.length} unpinned quiz items; the pre-test takes exactly three (packet 15)`);
  ok(QUIZ.slice(0, 3).every((x) => !x.block), 'the unpinned items are not first');
  const LATER_ONLY = /output gap|trend|inflation|inequality|environment|productivity|net migration|competition|tax revenue/i;
  pre.forEach((x) => ok(!LATER_ONLY.test(x.question + ' ' + x.options.join(' ')), `pre-test item needs a later chapter: "${x.question.slice(0, 60)}"`));
}
/* leaves */
{
  const LEAVES = ORACLE.filter((x) => x.subject === 'economics' && x.topic === '2.3.5' && x.kind === 'leaf');
  ok(LEAVES.length === 23, `the oracle holds ${LEAVES.length} leaves for 2.3.5, expected 23`);
  const mapped = new Set(Object.keys(LEAF_MAP));
  LEAVES.forEach((l) => ok(mapped.has(l.id), `leaf ${l.id} "${l.wording.slice(0, 50)}" is not mapped`));
  [...mapped].forEach((k) => ok(LEAVES.some((l) => l.id === k), `LEAF_MAP names ${k}, not a 2.3.5 leaf`));
  const slugs = new Set(ATTACH_SLUGS);
  Object.entries(LEAF_MAP).forEach(([leaf, ss]) => ss.forEach((s) => ok(slugs.has(s), `LEAF_MAP maps ${leaf} to "${s}", not a subsection`)));
}

/* ══ 7a · THE ITEMS THIS PACKET CLOSES, EACH ASSERTED AT ITS SOURCE ═════════ */
{
  /* accuracy-01 / topFix-04: nowhere may actual growth be "a movement along" the frontier */
  /* the one place the wrong belief may be printed is as the quoted belief of a common mistake */
  const quotedBeliefs = new Set(MISTAKES.map((m) => m.looks_like));
  const along = readable.filter((s) => !quotedBeliefs.has(s)).flatMap(sentencesOf)
    .filter((s) => /movement along the (PPF|frontier|production possibility)/i.test(s) && /actual growth/i.test(s) && !/\b(not|neither|nor|describe|students)\b/i.test(s));
  ok(along.length === 0, `accuracy-01 recurs: "${(along[0] || '').slice(0, 90)}"`);
  ok(MISTAKES.some((m) => /movement along/i.test(m.looks_like) && /inside the frontier/i.test(m.instead)), 'accuracy-01: the along-the-PPF belief is not named and corrected as a common mistake');
  /* topFix-04: no "elastic section of SRAS"; one AS model, named */
  ok(!/elastic (section|range|part) of (the )?(SRAS|short-run)/i.test(joined), 'topFix-04: "elastic section of SRAS" recurs');
  ok(/Keynesian long-run AS curve/i.test(joined), 'topFix-04: the one AS model is never named');
  /* topFix-04: "falling real wages" in a positive gap */
  ok(!/falling real wages/i.test(joined), 'topFix-04: "falling real wages" recurs');
  /* structure-02 / topFix-05: no chapter re-teaches AD/AS growth as its own block */
  ok(!BLOCKS.some((b) => /AD\/AS/i.test(b)), 'structure-02: an AD/AS chapter survives');
  /* structure-08: every takeaway is content, not exam advice; the costs takeaway names the trade cost */
  const tk = content.flatMap((b) => b.takeaway);
  ok(!tk.some((t) => /\b(label|always draw|in the exam|examiner|marks?)\b/i.test(t)), 'structure-08: a takeaway gives exam advice');
  ok(content.find((b) => b.title === B4).takeaway.some((t) => /balance of trade|imports/i.test(t)), 'structure-08: the costs takeaway omits the trade cost');
  /* structure-07: no misconception is exam technique */
  SUBSECTIONS.forEach((s) => ok(!/\b(forget to|fail to explain|do not label|lose marks|in the exam)\b/i.test(s.misconception), `structure-07: ${s.id}'s misconception is exam technique`));
  /* structure-09: one name each for the gap terms, and "sustainable growth" defined nowhere */
  ok(!/\binflationary gap\b|\bdeflationary gap\b|\brecessionary gap\b/i.test(joined), 'structure-09: a second name for an output gap');
  /* specGap-05/06: the costs chapter teaches the trade cost and inflation as steps */
  const b4 = content.find((b) => b.title === B4);
  ok(b4.sections.some((s) => /balance of trade/i.test(s.title)) && b4.sections.some((s) => /inflation/i.test(s.title)), 'specGap-05/06: trade and inflation are not steps of the costs chapter');
  /* specGap-03: firms get a step */
  ok(content.find((b) => b.title === B3).sections.some((s) => /profits/i.test(s.title)), 'specGap-03: no step on profits and investment');
  /* specGap-04: current against future living standards, stated */
  ok(/current and future living standards|current against future living standards/i.test(joined), 'specGap-04: the current/future trade-off is not stated');
  /* practice-02: FDI taught as potential growth, and the Unit 4 framing gone */
  ok(PRACTICE.some((p) => /foreign direct investment/i.test(p.question) && /potential growth/i.test(p.question)), 'practice-02: no FDI item in 2.3.5 terms');
}

/* ══ 8 · QUIZ ═══════════════════════════════════════════════════════════ */

QUIZ.forEach((q) => {
  ok(q.options.length === 4 && new Set(q.options).size === 4, `quiz "${q.question.slice(0, 40)}": options`);
  const key = q.options[q.correctIndex];
  const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
  ok(key.length <= 1.5 * longest, `quiz "${q.question.slice(0, 40)}": key longer than 1.5× the longest distractor`);
  ok(!/\b(first|second|third|fourth|last)\s+(option|answer|choice)\b|\boption\s+[A-D]\b|\(([A-D])\)/i.test(q.explanation), `quiz "${q.question.slice(0, 40)}" names an option by position`);
  ok(!/^(Evaluate|Assess|Discuss|Examine|Analyse)\b/.test(q.question), `quiz "${q.question.slice(0, 40)}" opens with an essay command word`);
});
{
  const hist = [0, 1, 2, 3].map((i) => QUIZ.filter((q) => q.correctIndex === i).length);
  ok(Math.max(...hist) - Math.min(...hist) <= 2, `key positions uneven: ${hist.join('/')}`);
  /* A/B: the live bank's shape must fail the same test */
  const liveLike = [24, 0, 0, 0];
  ok(Math.max(...liveLike) - Math.min(...liveLike) > 2, 'A/B: the histogram test passes a bank keyed all to one slot');
}

/* ══ 9 · RECALLS ════════════════════════════════════════════════════════ */

const recalls = SUBSECTIONS.filter((s) => s.recall);
ok(recalls.length === SUBSECTIONS.length, `${recalls.length} recalls over ${SUBSECTIONS.length} subsections`);
recalls.forEach((s) => {
  const r = s.recall;
  ok(!('shuffled' in r), `${s.id} writes \`shuffled\``);
  ok(r.id === `${s.id}:recall`, `${s.id}: recall id is not minted from the subsection`);
  if (r.type === 'reorder') {
    ok(r.correctOrder.length >= 3 && r.correctOrder.length <= 5, `${s.id}: reorder has ${r.correctOrder.length} items`);
    ok(Array.isArray(r.why) && r.why.length === r.correctOrder.length, `${s.id}: reorder why[] does not match`);
    ok(/\bfrom\b[^,]+\bto\b|causal/i.test(r.prompt), `${s.id}: reorder prompt names no ordering principle`);
  }
  if (r.type === 'fillin') {
    const blanks = r.template.join(' ').split('___').length - 1;
    ok(blanks === r.answers.length && r.hints.length === r.answers.length, `${s.id}: blanks/answers/hints disagree`);
    ok((r.distractors || []).length >= 2, `${s.id}: fewer than 2 distractors`);
    ok(new Set(r.answers.map((a) => a.toLowerCase())).size === r.answers.length, `${s.id}: duplicate answers`);
    r.answers.forEach((a, i) => {
      ok(!r.hints[i].toLowerCase().startsWith(String(a).toLowerCase().slice(0, 3)), `${s.id}: hint ${i + 1} is a prefix of its answer`);
      ok(!/_/.test(r.hints[i]), `${s.id}: hint ${i + 1} reveals length`);
      ok(!(r.distractors || []).includes(a), `${s.id}: "${a}" is both answer and distractor`);
      ok(!/,/.test(a), `${s.id}: answer "${a}" contains a comma (fillin.token)`);
    });
  }
  if (r.type === 'match') {
    ok(r.pairs.length >= 3 && r.pairs.length <= 5, `${s.id}: match has ${r.pairs.length} pairs`);
    ok(r.pairs.every((p) => p.why), `${s.id}: a match pair has no why`);
    ok(new Set(r.pairs.map((p) => p.right)).size === r.pairs.length, `${s.id}: two pairs share a right side`);
  }
  if (r.type === 'classify') {
    ok(r.groups.length >= 2 && r.groups.length <= 3, `${s.id}: classify has ${r.groups.length} groups`);
    const items = r.groups.flatMap((g) => g.items);
    ok(items.length >= 4 && items.length <= 8, `${s.id}: classify has ${items.length} items`);
    ok(new Set(items).size === items.length, `${s.id}: an item in two groups`);
    ok(r.groups.every((g) => g.why), `${s.id}: a group has no why`);
  }
});
/* topFix-02: the rankings became classify; the costs and potential-growth chapters carry one */
ok(recalls.some((s) => s.id.endsWith('environmental-costs') && s.recall.type === 'classify'), 'topFix-02: the environmental-costs recall is not a classify');
ok(content.find((b) => b.title === B2).sections.some((s) => s.recall.type === 'classify'), 'topFix-02: no classify in the causes of potential growth');
ok(!recalls.some((s) => s.recall.type === 'reorder' && /most (immediate|important)|quickest|slowest|rank/i.test(s.recall.prompt)), 'topFix-02: a ranking survives as a reorder');

/* ══ 10 · TEACHING TEXT BUDGET ════════════════════════════════════════════ */
const wordsOf = (s) => String(s).replace(/\*\*/g, '').split(/\s+/).filter(Boolean).length;
const stepWords = SUBSECTIONS.map((s) => {
  const parts = [s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || []), ...((b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`)), b.result]), s.realExample?.text, s.misconception, s.examMatters];
  return [s.id.replace(`${SECTION}:sub:`, ''), wordsOf(parts.filter(Boolean).join(' '))];
});
stepWords.forEach(([sid, w]) => ok(w <= 350, `${sid}: ${w} words of teaching text (budget 350)`));
SUBSECTIONS.forEach((s) => ok(s.keyIdea.length <= 180 && !s.keyIdea.includes('**'), `${s.id}: keyIdea too long or bold`));
content.forEach((b) => b.takeaway.forEach((t) => ok(t.length <= 100, `"${b.title}" takeaway over 100 chars: "${t}"`)));

/* ══ 11 · DIAGRAMS ══════════════════════════════════════════════════════ */
const svgOf = (d) => d.scenarios.map((s) => s.svg);
{
  const processSvg = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const palette = new Set([...processSvg.matchAll(/'(#[0-9a-fA-F]{6})':/g)].map((m) => m[1].toLowerCase()));
  ok(palette.size >= 10, `only ${palette.size} colours parsed out of processSvg.js`);
  for (const d of ALL_DIAGRAMS) {
    ok(d.checklist?.length >= 3 && !!d.description && d.scenarios?.length >= 1 && !d.kind, `${d.title}: checklist/description/scenarios/kind`);
    for (const s of svgOf(d)) {
      for (const m of s.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{6})"/g)) ok(palette.has(m[1].toLowerCase()), `${d.title}: colour ${m[1]} not in PALETTE`);
      for (const m of s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)) ok(Number(m[1]) >= MIN_FACE, `${d.title}: a ${m[1]}-unit label`);
      const w = Number((s.match(/^<svg width="(\d+)"/) || [])[1]);
      const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/);
      ok(w === FRAME.w && vb && Number(vb[1]) === FRAME.w, `${d.title}: width/viewBox not the ${FRAME.w}-unit frame`);
      ok(vb && Number(vb[2]) === Number((s.match(/height="(\d+)"/) || [])[1]), `${d.title}: viewBox height ≠ height`);
      for (const m of s.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
        const [, xs, ys, size, anchor, str] = m;
        const wd = estWidth(str, Number(size)); const x = Number(xs);
        const left = anchor === 'middle' ? x - wd / 2 : anchor === 'end' ? x - wd : x;
        ok(left >= -2 && left + wd <= FRAME.w + 2, `${d.title}: "${str.slice(0, 32)}" runs ${Math.round(left)}–${Math.round(left + wd)}`);
        ok(Number(ys) <= Number(vb?.[2] ?? 0) - 4, `${d.title}: "${str.slice(0, 32)}" baseline below the canvas`);
      }
    }
  }
  ok(estWidth('x'.repeat(80), FACE) > FRAME.w, 'the extent check cannot fire');

  /* glyph-box collisions and lines through labels (packet 40's guard, packet 31's vertical fix) */
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
    for (const sc of d.scenarios) {
      const where = `${d.title} / ${sc.label}`;
      const boxes = boxesOf(sc.svg);
      for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
        if (collides(boxes[i], boxes[j])) bad(`${where}: "${boxes[i].body.slice(0, 24)}" (y=${boxes[i].y}) and "${boxes[j].body.slice(0, 24)}" (y=${boxes[j].y}) collide at ${COLLIDE_TOL} of a face`);
      }
      for (const ln of linesOf(sc.svg)) for (const bx of boxes) {
        if (crossed(ln, bx)) bad(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) runs through "${bx.body.slice(0, 24)}"`);
      }
    }
  }
  /* A/B on geometry derived HERE: the pair this section's first draft actually produced — the
     "Y₂" tick label at y=288 and the "Real output" axis label at y=298, 10 units apart — must fire;
     the same pair a LEAD apart must not; a vertical axis through a label must fire */
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    const y2 = mk('Y₂', 318, 288, 12); const axisLabel = mk('Real output', 380, 298, 12, 'end');
    ok(collides(y2, axisLabel), 'the collision guard does not fire on the Y₂ / "Real output" pair the first draft produced');
    const moved = mk('Real output', 380, 288 + LEAD, 12, 'end');
    ok(!collides(y2, moved), 'the collision guard fires on two labels a LEAD apart');
    ok(LEAD > COLLIDE_TOL * FACE, `LEAD ${LEAD} does not clear the guard's bound ${COLLIDE_TOL * FACE}`);
    ok(crossed({ x1: 60, y1: 58, x2: 60, y2: 270 }, mk('AD₁', 74, 84, 12, 'end')), 'the line check is blind to a vertical axis through a label (packet 31)');
    ok(!crossed({ x1: 60, y1: 58, x2: 60, y2: 270 }, mk('AD₁', 94, 84, 12)), 'the line check fires on a label clear of the axis');
  }
  /* the figures the teaching states, counted back OUT of the emitted SVG */
  const gapSvgs = svgOf(ALL_DIAGRAMS.find((d) => /Output Gaps/.test(d.title))).join(' ');
  [pct(E.neg.gapPct, { signed: true }), pct(E.pos.gapPct, { signed: true }), pct(E.trendRate),
    ...E.ESTIMATES.map((x) => pct(x.gapPct, { signed: true }))].forEach((want) => ok(gapSvgs.includes(want), `the output-gap diagram does not print "${want}"`));
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════ */

const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) { console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1); }
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
const recoverable = after.findings.filter((f) => f.rule === 'recall.recoverable');
const coverage = after.findings.find((f) => f.rule === 'spec.coverage');
const RECALL_BASELINE = JSON.parse(readFileSync('audit/recall-census-baseline.json', 'utf8'));

const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
const hist = [0, 1, 2, 3].map((i) => QUIZ.filter((q) => q.correctIndex === i).length);
console.log(`\nPACKET 43 — ${SECTION} (IAL 2.3.5, WEC12)`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} chapters · ${SUBSECTIONS.length} subsections · ${QUIZ.length} quiz (${unpinned.size} pre-test, keys ${hist.join('/')}) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + d.scenarios.length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  pins:   ${content.map((b) => `${b.title.split(' ').slice(-1)[0]} q${JSON.stringify(b.quizIndices)} p${JSON.stringify(b.practiceIndices)} d:${b.diagramId ? b.diagramId.split(':').pop() : 'null'}`).join(' · ')}`);
console.log(`  recalls: ${recalls.length} — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}; recoverable ${recoverable.length} (census baseline: data ${RECALL_BASELINE?.data?.[SECTION]}, draft ${RECALL_BASELINE?.draft?.[SECTION]}; held to 0)`);
console.log(`  coverage: ${coverage?.detail ?? 'not reported'}`);
console.log(`  words:  ${stepWords.map(([, w]) => w).join(' ')}`);
console.log(`  tariffs: ${PRACTICE.map((p) => `${p.command} ${p.marks}`).join(', ')}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);
for (const f of recoverable) console.log(`  RECOVERABLE ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (0 new DEBT on the packet\'s own section).'); process.exit(1); }
/*
 * `recall.recoverable` is INFO, so nothing above can see it; the census row for this section is 15.
 * The rebuild is held to ZERO, not to the row: fifteen of seventeen answerable by scrolling up is
 * the defect the row records, not a target.
 */
if (recoverable.length) { console.error(`\n${recoverable.length} recall(s) answerable by scrolling up; this rebuild is held to zero.`); process.exit(1); }
console.log('\n✓ runner checks pass');

if (DUMP) {
  const out = `audit/snapshots/packet-43-bundle__economics__${SECTION}.json`;
  writeFileSync(out, `${JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-43-bundle', tables: bundle }, null, 1)}\n`);
  console.log(`  bundle written to ${out}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`  staged to draft: ${JSON.stringify({ ok: res.ok, staged: res.staged, unchanged: res.unchanged })}`);
  if (!res.ok) process.exit(1);
}
