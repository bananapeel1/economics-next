#!/usr/bin/env node
/**
 * PACKET 41 — external-influences, Business Unit 2 (WBS12), IAL topic 2.3.5.
 * `audit/raw/bus_spec.txt:1009-1029`. FIVE chapters, twenty-four subsections, 15 leaves.
 *
 *   node scripts/packet-41-external-influences.mjs            # dry run, every check
 *   node scripts/packet-41-external-influences.mjs --dump     # + write the bundle
 *   node scripts/packet-41-external-influences.mjs --stage    # + write the draft
 *
 * What this packet adds to the inherited checks, and why each one is here:
 *
 *   - **THE NUMBERING IS REFUSED AGAINST THE DOCUMENT, NOT AGAINST A COMMENT.** `specGap-08`
 *     records the audit's own uncertainty — "2.3.5 vs GCE 2.5 — unsure". The runner re-reads
 *     `bus_spec.txt` and asserts BY LINE NUMBER that `:965` is 2.3.4 Resource management, that
 *     `:1009` is 2.3.5 External influences, and that the section's span ends before Unit 3 begins
 *     at `:1045`. It then asserts the three sub-topic headings inside that span are the ones this
 *     packet built. A future renumber fails the build rather than being inherited.
 *
 *   - **APPENDIX 6 IS PARSED, NOT IMPORTED.** MEMORY's rule: a check that finds its evidence the
 *     way the fix did cannot see the fix's blind spot. `lib/content-validator.mjs` reads
 *     `lib/ial-marking.js`, so a runner importing the same module would agree with the validator
 *     by construction and neither could see a wrong table. This runner parses the command words and
 *     their marks out of `bus_spec.txt:2212-2250` and asserts the parse against every practice
 *     item. It is also what refutes `topFix-05`'s "10/12-mark Assess": **12 is asserted to be
 *     annotated `[Units 3/4]` and 10 `[Units 1/2]`**, and this is WBS12.
 *
 *   - **EVERY BAN IS A/B'd IN BOTH DIRECTIONS** (packet 21). A guard that has never been seen to
 *     fail is not known to work, and the negatives matter more than the positives: the UK-statute
 *     pattern must fire on "the Consumer Rights Act 2015" and must NOT fire on "consumer
 *     protection", which is the specification's own wording and the thing this section teaches.
 *
 *   - **`Porter's five forces` CARRIES A POSITIVE OBLIGATION, NOT ONLY A BAN** (packet 38's
 *     precedent, DECISIONS 2026-09-21). `accuracy-03` says it is not in the specification "Unit 2
 *     or elsewhere"; the runner greps the document and finds it at `:1110` (3.3.1, Unit 3) and
 *     `:1390` (4.3.2, Unit 4). It is banned here except in a sentence naming both owners, and the
 *     build fails if that sentence is missing — a ban with no positive obligation is satisfied by
 *     silence.
 *
 *   - **THE CURRENCY ASYMMETRY IS RECOMPUTED, NEVER TYPED.** A fall of x in a currency is a rise of
 *     x/(1−x) in the home-currency cost of anything invoiced abroad. It appears in the teaching, in
 *     a quiz item, in a common mistake, in an extras chain and in two diagrams, and the runner
 *     re-derives it from the two rates each time rather than trusting the printed percentage. It
 *     also asserts the two percentages are DIFFERENT, which is the thing the mistake is about.
 *
 *   - **THE MARGIN AMPLIFICATION IS ASSERTED AS A RELATIONSHIP.** A cost rise is multiplied by the
 *     reciprocal of the operating margin. The runner derives the profit fall from the cost rise and
 *     separately from the margin, and fails if the two disagree — so a change to any figure in the
 *     spine that breaks the relationship fails the build instead of shipping a claim that no longer
 *     holds.
 *
 *   - **`FAILED_SUBSTITUTION`, over every surface INCLUDING the SVGs** (packet 29). The regex has
 *     NO trailing `\b`: `/\bundefined/` does not need one and `/\bundefined\b/` would miss
 *     `undefinedQ`.
 *
 *   - **GLYPH-BOX COLLISIONS ON EVERY DIAGRAM** (packet 40's Verify B, MEMORY). Packet 40 shipped
 *     two overlapping label pairs because its runner had no collision guard. This one has one, at
 *     `COLLIDE_TOL` of a face, A/B'd against coordinates that must collide and coordinates that
 *     must not.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, FIRM, MINUS, money, pct, pts, qty, fx, units, yrs, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, TEACHING_TERMS, teachingVocabulary,
  ECONOMIC_INFLUENCES, LEGISLATION_AREAS, COMPETITION_DIMENSIONS, IP_RIGHTS, TARIFFS,
} from './_packet41-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5,
} from './_packet41-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet41-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, TBLP, MIN_FACE, COLLIDE_TOL } from './_packet41-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const F = FIRM;

const problems = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ══ 1 · THE SPECIFICATION, BY LINE NUMBER ═════════════════════════════════ */
const SPEC_PATH = 'audit/raw/bus_spec.txt';
const spec = readFileSync(SPEC_PATH, 'utf8').split('\n');
const at = (n) => (spec[n - 1] ?? '').trim();

const PINNED = [
  [965, '2.3.4 Resource management'],
  [1009, '2.3.5 External influences'],
  [1045, '3.1 Unit description'],
];
for (const [n, want] of PINNED) {
  if (at(n) !== want) problems.push(`bus_spec.txt:${n} reads "${at(n)}" and this packet was built against "${want}" — the specification has been renumbered or re-exported`);
}
/* the span this section owns, and the three sub-topic headings inside it */
const SPAN = spec.slice(1009 - 1, 1045 - 1).join('\n');
for (const want of ['1 Economic', 'influences', '2 Legislation', '3 The competitive', 'environment',
  'the rate of inflation', 'exchange rates (appreciation, depreciation)', 'interest rates',
  'taxation and government spending', 'the business cycle', 'consumer protection',
  'employee protection', 'environmental protection', 'competition policy', 'health and safety',
  'intellectual property rights', 'Ways for a small business to compete in a competitive market']) {
  if (!SPAN.includes(want)) problems.push(`"${want}" is not inside bus_spec.txt:1009-1044, so this packet is built against a specification this file does not contain`);
}
/* and the arrays in _packet41-util.mjs are the document's, in the document's order */
const spanOrder = (list, label) => {
  let last = -1;
  for (const item of list) {
    const i = SPAN.indexOf(item.replace(/ \(.*/, ''));
    if (i < 0) { problems.push(`${label}: "${item}" is not in the 2.3.5 span`); return; }
    if (i < last) { problems.push(`${label}: "${item}" is out of the specification's own order`); return; }
    last = i;
  }
};
spanOrder(ECONOMIC_INFLUENCES, 'ECONOMIC_INFLUENCES');
spanOrder(LEGISLATION_AREAS, 'LEGISLATION_AREAS');
spanOrder(COMPETITION_DIMENSIONS, 'COMPETITION_DIMENSIONS');

/* ══ 2 · APPENDIX 6, PARSED OUT OF THE DOCUMENT ════════════════════════════ */
/*
 * Parsed, not imported: `lib/content-validator.mjs` reads `lib/ial-marking.js`, so a runner that
 * imported the same module could not see a wrong table. The parse is asserted equal to TARIFFS and
 * TARIFFS is what every practice item is checked against.
 */
const APPENDIX6 = spec.slice(2212 - 1, 2255 - 1);
const parsedTariffs = new Map();
for (const raw of APPENDIX6) {
  const m = raw.match(/^([A-Z][a-z]+)\s{2,}(\d+)\s{2,}\S/);
  if (m) parsedTariffs.set(m[1], Number(m[2]));
}
for (const [word, marks] of TARIFFS) {
  if (!parsedTariffs.has(word)) problems.push(`Appendix 6 does not list the command word "${word}" — TARIFFS disagrees with bus_spec.txt:2212-2254`);
  else if (parsedTariffs.get(word) !== marks) problems.push(`Appendix 6 gives ${word} ${parsedTariffs.get(word)} marks and TARIFFS says ${marks}`);
}
for (const word of parsedTariffs.keys()) {
  if (!TARIFFS.some(([w]) => w === word)) problems.push(`Appendix 6 lists "${word}" and TARIFFS does not carry it`);
}
/*
 * AND THE CLAUSE THAT REFUTES `topFix-05`. The Assess row carries two numbers, each annotated with
 * the units it applies to. This is WBS12, so 12 is not available on this paper.
 */
{
  const appendixText = APPENDIX6.join('\n');
  const tenAt = appendixText.indexOf('[Units 1/2]');
  const twelveAt = appendixText.indexOf('[Units 3/4]');
  if (tenAt < 0 || twelveAt < 0) problems.push('the Assess row in Appendix 6 no longer annotates its two tariffs with the units they apply to, so topFix-05\'s "10/12" cannot be refused against the document');
  else {
    const between = appendixText.slice(tenAt, twelveAt);
    if (!/\b12\b/.test(between)) problems.push('Appendix 6 no longer puts 12 between the [Units 1/2] and [Units 3/4] annotations — re-read the row before trusting the 10-mark Assess tariff');
    if (parsedTariffs.get('Assess') !== 10) problems.push(`Appendix 6's Assess row parses to ${parsedTariffs.get('Assess')} and Units 1/2 carry 10`);
  }
}

/* ══ 3 · PORTER: THE BAN AND THE OBLIGATION THAT COMES WITH IT ═════════════ */
/*
 * `accuracy-03` asserts Porter's five forces is not in the specification "Unit 2 or elsewhere".
 * The runner checks the second half against the document rather than accepting it, and the two
 * owners it finds are what the compulsory pointer sentence has to name.
 */
const porterLines = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /Porter/i.test(l)).map(([n]) => n);
if (!porterLines.length) {
  problems.push('Porter is 0 hits in bus_spec.txt — accuracy-03\'s "or elsewhere" clause would then be right, and the pointer exemption in _packet41-util.mjs must be removed rather than kept');
} else {
  const owners = porterLines.filter((n) => /five forces/i.test(spec[n - 1]));
  if (owners.length < 2) problems.push(`"Porter's five forces" appears at ${owners.length} line(s) of bus_spec.txt; the pointer sentence names two owners (3.3.1 and 4.3.2) and one of them is no longer in the document`);
}

/* ══ 4 · PINS, DERIVED FROM EACH ITEM'S OWN CHAPTER TAG ════════════════════ */
/*
 * `structure-02` is that the inline quiz mapping is wrong for EVERY block and `structure-03` the
 * same for practice. Neither can recur: no index array is written by hand anywhere in this packet.
 * A question belongs to the chapter its `block` tag names, and the arrays below are computed.
 */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
const quizIndices = Object.fromEntries(BLOCKS.map((b) => [b, quizByBlock[b]]));
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id]));

for (const b of BLOCKS) {
  if (!quizIndices[b]?.length) problems.push(`chapter "${b}" has no quiz item tagged to it`);
  if (!practiceIndices[b]?.length) problems.push(`chapter "${b}" has no practice item tagged to it`);
}
if (unpinned.size < 3) problems.push(`${unpinned.size} unpinned quiz items; the signed-out pre-test draws three and a short pool makes it draw from a chapter the student has not opened`);
/*
 * `pins.identity` is DEBT on a quizIndices sequence that is simply 0,1,2,… in chapter order. The
 * three unpinned pre-test items sit FIRST in the array, so the first chapter's pins start at 3 and
 * the sequence cannot be the identity — but that is a property of this arrangement rather than a
 * guarantee, so it is asserted here rather than assumed.
 */
{
  const flat = BLOCKS.flatMap((b) => quizIndices[b] || []);
  if (flat.every((v, i) => v === i)) problems.push('quizIndices across chapters is the identity sequence — pins.identity would fire');
}

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

/* ══ 5 · EVERY STRING A STUDENT CAN READ ═══════════════════════════════════ */
const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
/*
 * SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29). Joined per diagram rather
 * than per `<text>` because a caption is wrapped a line per element, so a phrase spanning two lines
 * is in neither of them.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ── a failed substitution, on every surface including the SVGs ──────────── */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
for (const bad of ['a span of undefinedQ', 'the margin is NaN', 'the firm [object Object] pays', 'a profit of ${money(x)}']) {
  if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
}
for (const good of ['the undefined article is a grammar term', 'a rate of 8% is not a number that breaks']) {
  if (/\bNaN|\[object Object\]|\$\{/.test(good)) problems.push(`the failed-substitution check fires on legitimate text: "${good}"`);
}

/* ══ 6 · THE SECTION'S BANNED VOCABULARY, EACH WITH ITS LINE ═══════════════ */
/*
 * NO `g` FLAG on the source patterns. `RegExp.prototype.test` on a `/g` regex advances `lastIndex`,
 * so a second call against the same string starts past the match and returns false. Packet 29 lost
 * a round to exactly that: a stateful regex inside a filter is a bug that looks like a finding.
 */
for (const [re, why] of BANNED_ELSEWHERE) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 110)}"`);
}
/*
 * A/B, BECAUSE A BAN THAT HAS NEVER FIRED IS NOT KNOWN TO WORK (packet 21). Each pattern is planted
 * against a string it must catch AND one it must not. The negatives matter more than the positives
 * here: every one of these bans sits next to the specification's own wording for the same idea, and
 * a ban that swallowed "consumer protection" or "competition policy" would delete the leaf.
 */
{
  const fires = (re, str) => new RegExp(re.source, re.flags.replace('g', '')).test(str);
  const probes = [
    [0, 'students must know the Consumer Rights Act 2015', 'consumer protection sets a floor under what a buyer can expect'],
    [1, 'employer National Insurance Contributions rose again', 'an employer payroll charge is a cost of having staff'],
    [2, 'the Bank of England sets the base rate', 'the rate lenders charge on new borrowing is reset upwards'],
    [3, 'the Competition and Markets Authority reviewed the merger', 'competition policy stops firms replacing competition with agreement'],
    [4, 'this is cost-push inflation rather than demand-pull', 'inflation of 8% on the cost of sales is $192,000'],
    [5, 'the market moves from perfect competition towards monopoly', 'competitor numbers, size and behaviour'],
    [6, 'remember SPICED for exchange rate effects', 'an appreciation makes imports cheaper and exports dearer'],
    [7, 'the market size is growing and approaching saturation', 'a larger competitor buys cheaper and can lose money for longer'],
    [8, 'Outline two effects of inflation on the business', 'Analyse the likely effect on operating profit'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const [re, why] = BANNED_ELSEWHERE[i];
    if (!fires(re, mustFire)) problems.push(`the ban "${why.slice(0, 50)}" no longer fires on: "${mustFire}"`);
    if (fires(re, mustNot)) problems.push(`the ban "${why.slice(0, 50)}" fires on legitimate text: "${mustNot}"`);
  }
}

/* ── the pointer exemption, and the obligation it carries ────────────────── */
/*
 * Packet 38's `NEEDS_ONE`. The phrase may appear ONLY in a sentence that names both owners, and it
 * MUST appear in one — silence would satisfy a bare ban and would leave a student who meets the
 * phrase in a past paper with nothing.
 */
for (const { re, owner, coOwner, why } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const sentences = readable.flatMap((s) => String(s).split(/(?<=[.!?])\s+/));
  const mentions = sentences.filter((s) => one.test(s));
  const pointers = mentions.filter((s) => owner.test(s) && coOwner.test(s));
  if (!pointers.length) problems.push(`NEEDS_ONE: no sentence names Porter's five forces together with 3.3.1 and 4.3.2. ${why}`);
  const bare = mentions.filter((s) => !(owner.test(s) && coOwner.test(s)));
  if (bare.length) problems.push(`Porter's five forces named without its owner ×${bare.length}, first: "${bare[0].slice(0, 100)}"`);
  /* A/B the exemption itself, in both directions */
  if (owner.test('Porter\'s five forces is a useful framework here') && coOwner.test('Porter\'s five forces is a useful framework here')) {
    problems.push('the pointer exemption accepts a sentence that names neither owner');
  }
  if (!(owner.test('Porter\'s five forces is taught at 3.3.1 and applied at 4.3.2') && coOwner.test('Porter\'s five forces is taught at 3.3.1 and applied at 4.3.2'))) {
    problems.push('the pointer exemption no longer recognises a sentence that names both owners');
  }
}

/* ── the shape rules the live section failed ─────────────────────────────── */
ban(/£|€|¥|₹|\bRM\s?\d|\bHK\$|\bS\$|\bRs\.?\s?\d/g, 'a second currency symbol — locale.currency allows one per section');
ban(/\b(19|20)\d{2}\b/g, 'a year, which is a dated assertion this programme cannot re-check (packet 15, packet 40)');
ban(/\bBrexit\b|\bthe UK\b|\bBritain\b|\bBritish\b|\bsterling\b|\bthe pound\b/i, 'a UK frame (locale.uk); this section is being cleared of exactly this');
{
  /* the minus sign: one character, U+2212, and never a hyphen standing in for it */
  const hyphenMinus = readable.filter((s) => /(?:^|[\s(])-\s?\$?\d/.test(s));
  if (hyphenMinus.length) problems.push(`a hyphen used as a minus sign ×${hyphenMinus.length}, first: "${hyphenMinus[0].slice(0, 80)}" — money() emits ${MINUS}`);
  if (!readable.some((s) => s.includes(MINUS))) problems.push(`nothing in this section prints the U+2212 minus sign, although ${money(F.matchProfit)} and ${money(F.slumpProfit)} are both negative`);
}

/* ══ 7 · THE ARITHMETIC, RE-DERIVED RATHER THAN TRUSTED ════════════════════ */
/*
 * Each block below derives a figure a second way and asserts the two agree. A figure that is only
 * ever computed once is a figure nothing can disagree with.
 */
{
  /* the statement itself */
  if (!near(F.revenue, F.units0 * F.price)) problems.push('revenue is not units × price');
  if (!near(F.grossProfit, F.revenue - F.costOfSales)) problems.push('gross profit is not revenue less cost of sales');
  if (!near(F.operatingProfit, F.grossProfit - F.operatingExpenses)) problems.push('operating profit is not gross profit less other operating expenses');
  if (!near(F.profitForYear, F.operatingProfit - F.interest)) problems.push('profit for the year is not operating profit less interest');
  if (!near(F.operatingExpenses, F.wages + F.payrollCharge + F.compliance + F.otherExpenses)) problems.push('the operating expenses do not add up from their parts');
  if (!near(F.compliance, F.consumerAnnual + F.employeeAnnual + F.hsAnnual + F.envAnnual)) problems.push('the compliance budget does not add up from the four areas');
  if (F.importedMaterials >= F.costOfSales) problems.push('the imported materials are not a part of the cost of sales');
  if (F.exportRevenue + F.publicRevenue >= F.revenue) problems.push('exports plus public orders exceed the revenue');
}
{
  /* THE MARGIN AMPLIFICATION, DERIVED TWICE. A cost rise is multiplied by 1 / operating margin. */
  const fromArithmetic = ((F.operatingProfit - F.inflationProfit) / F.operatingProfit) * 100;
  const fromMargin = (F.inflationCostRise / F.revenue) * (100 / (F.opMargin / 100));
  if (!near(round2(fromArithmetic), round2(fromMargin), 0.01)) {
    problems.push(`the margin amplification does not hold: the arithmetic gives ${pct(fromArithmetic)} and the reciprocal of the ${pct(F.opMargin)} margin gives ${pct(fromMargin)}`);
  }
  if (!near(round2(F.inflationProfitFall), round2(fromArithmetic), 0.01)) problems.push('inflationProfitFall disagrees with its own arithmetic');
  /* and the claim the section makes about it: the multiple is larger than one */
  if (F.inflationProfitFall <= F.inflation) problems.push('the section claims a cost rise is amplified by the margin, and on these figures it is not');
}
{
  /* THE CURRENCY ASYMMETRY, DERIVED TWICE AND ASSERTED DIFFERENT. */
  const fromRates = ((F.e0 - F.e1) / F.e0) * 100;
  const fromBills = ((F.importAtE1 - F.importedMaterials) / F.importedMaterials) * 100;
  const fromRule = (fromRates / 100) / (1 - fromRates / 100) * 100;
  if (!near(round2(F.depreciationPct), round2(fromRates), 0.01)) problems.push('depreciationPct disagrees with the two rates it is taken from');
  if (!near(round2(F.importRisePct), round2(fromBills), 0.01)) problems.push('importRisePct disagrees with the two bills it is taken from');
  if (!near(round2(fromBills), round2(fromRule), 0.01)) problems.push(`the x/(1−x) rule gives ${pct(fromRule)} and the bills give ${pct(fromBills)}`);
  if (near(round2(F.depreciationPct), round2(F.importRisePct), 0.01)) problems.push('the depreciation and the import-cost rise are the same number, so the mistake the section is built to correct cannot be demonstrated');
  /* the appreciation runs the other way and is SMALLER than the rise in the currency */
  const fromRuleUp = (F.appreciationPct / 100) / (1 + F.appreciationPct / 100) * 100;
  if (!near(round2(F.importFallPct), round2(fromRuleUp), 0.01)) problems.push('the appreciation asymmetry does not follow x/(1+x)');
  if (F.importFallPct >= F.appreciationPct) problems.push('an appreciation should move the bill by LESS than it moves the currency');
  /* and the netting-off: a firm that both imports and exports is helped and hurt at once */
  if (!(F.depProfit < F.operatingProfit && F.appProfit > F.operatingProfit)) {
    problems.push('this firm imports more than it exports, so a depreciation should reduce and an appreciation raise its operating profit');
  }
  if (!near(F.depProfit, F.operatingProfit + (F.exportAtE1 - F.exportRevenue) - (F.importAtE1 - F.importedMaterials))) problems.push('depProfit is not the netting-off it claims to be');
}
{
  /* THE TWO INTEREST-RATE CHANNELS, AND THE CLAIM THAT THE SECOND IS THE LARGER. */
  if (!near(F.interestExtra, (F.loan * F.rateRise) / 100)) problems.push('the extra interest is not the rate rise applied to the loan');
  if (!near(F.demandChannel, F.operatingProfit - F.rateDemandProfit)) problems.push('the demand channel is not the fall in operating profit it claims');
  if (!(F.demandChannel > 3 * F.interestExtra)) {
    problems.push(`the section says the demand channel is more than three times the borrowing channel; on these figures it is ${round2(F.demandChannel / F.interestExtra)} times`);
  }
  /* the borrowing channel leaves operating profit alone — the point of the whole chapter */
  if (!near(F.operatingProfit, F.grossProfit - F.operatingExpenses)) problems.push('the interest chapter claims operating profit is untouched by interest, and the spine no longer says so');
}
{
  /* THE CYCLE: amplification, and the loss at the bottom. */
  if (!near(F.amplification, F.orderSwing / F.economySwing)) problems.push('the amplification factor is not the two swings it is taken from');
  if (!(F.boomProfit > F.operatingProfit && F.recessionProfit < F.operatingProfit)) problems.push('the boom and the bad year are not on opposite sides of the reported year');
  if (!(F.slumpProfit < 0)) problems.push('the section teaches that fixed costs turn a big enough fall into a loss, and on these figures they do not');
  const zeroRevenue = F.operatingExpenses / (F.contribution / F.price);
  if (!near(F.breakEvenRevenue, zeroRevenue)) problems.push('the break-even revenue is not derived from the contribution and the fixed costs');
  if (!(F.breakEvenRevenue < F.revenue)) problems.push('the break-even revenue is above this year\'s revenue, so the firm did not make the profit the statement reports');
}
{
  /* THE PRICE WAR: matching is a loss, holding is not, and break-even moves the wrong way. */
  if (!near(F.matchProfit, F.units0 * (F.warPrice - F.unitCost) - F.operatingExpenses)) problems.push('matchProfit is not the price war arithmetic it claims');
  if (!(F.matchProfit < 0 && F.holdProfit > 0)) problems.push('the section says matching is a loss and holding is not; on these figures that is no longer true');
  if (!(F.breakEvenUnitsWar > F.units0)) problems.push('the section says matching needs more sales than the firm makes today, and on these figures it does not');
  if (!near(F.warVolumeNeeded, ((F.breakEvenUnitsWar - F.units0) / F.units0) * 100)) problems.push('warVolumeNeeded is not derived from the two volumes');
  if (!(F.nicheGain > 0)) problems.push('the niche is supposed to leave more than standard stock, and on these figures it does not');
}
{
  /* THE SAFETY COMPARISON: prevention against the accident. */
  if (!near(F.dailyRevenue, F.revenue / F.tradingDays)) problems.push('the daily revenue is not the year spread over the trading days');
  if (!near(F.accidentCost, F.dailyRevenue * F.accidentDays)) problems.push('the accident cost is not the daily revenue times the days lost');
  if (!(F.accidentMultiple > 1)) problems.push('the section says one accident costs more than a year of prevention, and on these figures it does not');
}

/* ══ 8 · EVERY TEACHING TERM IS ACTUALLY TAUGHT ════════════════════════════ */
/*
 * `structure-06` and `structure-07` are one defect read from two ends: the quiz and the practice
 * tested environmental protection and competition policy, which `content[]` never taught. The
 * condition is asserted rather than trusted.
 */
{
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea,
    ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []), b.result]),
    s.realExample?.text, s.misconception, s.examMatters]).filter(Boolean);
  const vocab = teachingVocabulary(teaching);
  for (const term of TEACHING_TERMS) {
    const wordsOf = term.split(' ');
    if (!wordsOf.every((w) => vocab.has(w))) problems.push(`"${term}" is used on an assessment surface and is not in any subsection's teaching text`);
  }
  /* and the twelve leaves each have a subsection whose title or key idea reaches them */
  const LEAF_TITLES = [
    ['inflation', 'The Rate of Inflation'],
    ['exchange rates', 'Exchange Rates'],
    ['interest rates', 'Interest Rates'],
    ['taxation', 'Taxation'],
    ['government spending', 'Government Spending'],
    ['the business cycle', 'The Business Cycle'],
    ['consumer protection', 'Consumer Protection'],
    ['employee protection', 'Employee Protection'],
    ['environmental protection', 'Environmental Protection'],
    ['competition policy', 'Competition Policy'],
    ['health and safety', 'Health and Safety'],
    ['intellectual property rights', 'Intellectual Property Rights'],
    ['competitor numbers', 'Competitor Numbers'],
    ['competitor size', 'Competitor Size'],
    ['competitor behaviour', 'Competitor Behaviour'],
    ['a small business competing', 'How a Small Business Competes'],
  ];
  const titles = new Set(SUBSECTIONS.map((s) => s.title));
  for (const [leaf, title] of LEAF_TITLES) {
    if (!titles.has(title)) problems.push(`leaf "${leaf}" has no subsection of its own — it needs "${title}"`);
  }
}

/* ══ 9 · THE RECALLS ═══════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.filter((s) => s.recall);
  if (recalls.length !== SUBSECTIONS.length) {
    problems.push(`${SUBSECTIONS.length - recalls.length} subsection(s) carry no recall; structure-01 is that this section shipped zero across twelve steps`);
  }
  const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
  for (const type of ['reorder', 'fillin', 'match', 'classify']) {
    if (!byType[type]) problems.push(`no ${type} recall in this section — the contract has four types and a section that uses three is training one habit`);
  }
  /*
   * THE FILL-IN CONTRACT, ENFORCED BEFORE THE VALIDATOR SEES IT. `fillin.hint` fires on all 141
   * live fill-ins in the corpus because every one hints with the first letters of its answer.
   */
  for (const s of recalls) {
    const r = s.recall;
    if (r.type !== 'fillin') continue;
    const blanks = (r.template || []).reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
    if (blanks !== (r.answers || []).length) problems.push(`${s.title}: ${blanks} blanks and ${(r.answers || []).length} answers`);
    if ((r.hints || []).length !== (r.answers || []).length) problems.push(`${s.title}: ${(r.hints || []).length} hints for ${(r.answers || []).length} answers`);
    (r.answers || []).forEach((a, i) => {
      const hint = String((r.hints || [])[i] ?? '');
      if (hint.toLowerCase().startsWith(String(a).toLowerCase().slice(0, 3))) problems.push(`${s.title}: hint ${i + 1} opens with its own answer`);
      if (/^_+$|\b\d+ letters\b/.test(hint)) problems.push(`${s.title}: hint ${i + 1} reveals the answer's length`);
      if (String(a).includes(',')) problems.push(`${s.title}: answer ${i + 1} contains a comma, which is two chips glued into one blank`);
      if ((r.template || []).some((l) => String(l).replace(/_{3,}/g, ' ').toLowerCase().includes(String(a).toLowerCase()))) {
        problems.push(`${s.title}: answer ${i + 1} "${a}" is printed in the template outside its blank`);
      }
    });
    const dupes = (r.answers || []).map((a) => String(a).toLowerCase()).filter((a, i, xs) => xs.indexOf(a) !== i);
    if (dupes.length) problems.push(`${s.title}: duplicate fill-in answers ${JSON.stringify([...new Set(dupes)])}`);
    const dcount = (r.distractors || []).length;
    if (dcount < 2 || dcount > 3) problems.push(`${s.title}: ${dcount} distractors (want 2 to 3)`);
    if ((r.distractors || []).some((d) => (r.answers || []).some((a) => String(a).toLowerCase() === String(d).toLowerCase()))) {
      problems.push(`${s.title}: a distractor equals an answer`);
    }
  }
  /*
   * AND THE REORDERS ARE SOURCED FROM AN EXTRAS CHAIN RATHER THAN FROM THEIR OWN STEP. This is the
   * placement rule the content module's header states, asserted here: the sequence must be taught
   * in a chain, and it must NOT be printed on the step that drills it.
   */
  const chainSteps = EXTRAS.chains.map((c) => c.steps.join(' ').toLowerCase());
  for (const s of recalls) {
    const r = s.recall;
    if (r.type !== 'reorder') continue;
    const own = [s.keyIdea, ...(s.body || []).map((b) => b.text || '')].join(' ').toLowerCase();
    const sourced = chainSteps.some((c) => (r.correctOrder || []).filter((it) => {
      const distinctive = String(it).toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 6);
      return distinctive.some((w) => c.includes(w));
    }).length >= Math.ceil((r.correctOrder || []).length / 2));
    if (!sourced) problems.push(`${s.title}: the reorder is not taught by any extras chain, so reorder.source will fire`);
    const echoed = (r.correctOrder || []).filter((it) => {
      const distinctive = String(it).toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 7);
      return distinctive.length >= 3 && distinctive.every((w) => own.includes(w));
    });
    if (echoed.length) problems.push(`${s.title}: reorder item "${String(echoed[0]).slice(0, 50)}" is printed on its own step`);
  }
}

/* ══ 10 · THE PRACTICE, AGAINST THE PARSED APPENDIX ════════════════════════ */
{
  const tariff = new Map(TARIFFS);
  for (const p of PRACTICE) {
    if (!tariff.has(p.command)) { problems.push(`practice "${p.command}" is not an Appendix 6 command word for Business`); continue; }
    if (tariff.get(p.command) !== p.marks) problems.push(`practice "${p.command} (${p.marks})" — Appendix 6 gives ${tariff.get(p.command)}`);
    if (!p.question.startsWith('Source A.')) problems.push(`practice "${p.command} ${p.marks}" is not anchored to the source; Business Units 1 and 2 are entirely source-based (PROTOCOL.md)`);
    if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice "${p.command} ${p.marks}" does not end in its own tariff`);
    const paras = String(p.guidance).split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph; guided mode prints the first one whole over an empty answer box`);
    const opening = paras[0] || '';
    if (/\$[\d,]|\(\d+ marks?\)|\(\d+ mark\)|\bLevel \d/.test(opening)) {
      problems.push(`practice "${p.command} ${p.marks}" opens with a figure, an allocation or a level band: "${opening.slice(0, 90)}"`);
    }
    const scheme = paras.slice(1).join(' ');
    if (p.marks > 6 && /\(\d+ marks?\)/.test(scheme)) problems.push(`practice "${p.command} ${p.marks}" allocates points and tariffs above 6 are levels-marked`);
    if (p.marks <= 6 && p.command !== 'Define' && !/\(\d+ marks?\)|up to \d+ marks/.test(scheme)) {
      problems.push(`practice "${p.command} ${p.marks}" is a points-marked tariff and its guidance allocates none`);
    }
  }
  /* every command word in the Appendix is used at least once, and Assess is 10 and only 10 */
  for (const [word] of TARIFFS) {
    if (!PRACTICE.some((p) => p.command === word)) problems.push(`no practice item uses the Appendix 6 command word "${word}"`);
  }
  const assessMarks = [...new Set(PRACTICE.filter((p) => p.command === 'Assess').map((p) => p.marks))];
  if (assessMarks.length !== 1 || assessMarks[0] !== 10) problems.push(`Assess carries ${JSON.stringify(assessMarks)} in this packet; Appendix 6 gives Units 1 and 2 ten and only ten`);
  if (!PRACTICE.some((p) => p.command === 'Evaluate' && p.marks === 20)) problems.push('practice-01 asked for the stakeholders 20-marker to be replaced by an external-influences one, and no 20-mark Evaluate exists');
  /* and the replaced item is gone in both directions */
  if (readable.some((s) => /shareholders? over other stakeholders/i.test(s))) problems.push('the stakeholders 20-marker practice-01 names is still in this bundle');
}

/* ══ 11 · THE QUIZ ═════════════════════════════════════════════════════════ */
{
  if (QUIZ.length < 20) problems.push(`${QUIZ.length} quiz items; depth.quiz wants at least 20`);
  const ESSAY = /^\s*(evaluate|assess|discuss|examine|to what extent)\b/i;
  for (const q of QUIZ) {
    if (ESSAY.test(q.question)) problems.push(`a quiz stem opens with an essay command word: "${q.question.slice(0, 60)}"`);
    const correct = String(q.options[q.correctIndex]);
    const longest = Math.max(1, ...q.options.filter((_, i) => i !== q.correctIndex).map((o) => String(o).length));
    if (correct.length > 1.5 * longest) problems.push(`the key is ${correct.length} chars against a longest distractor of ${longest}: "${q.question.slice(0, 50)}"`);
    if (new Set(q.options.map((o) => String(o).toLowerCase())).size < q.options.length) problems.push(`duplicate options in "${q.question.slice(0, 50)}"`);
    if (/\(([A-F])\)/.test(q.explanation)) problems.push(`an explanation names an option as a bare "(${RegExp.$1})"; Layer 1b asks for "Option ${RegExp.$1}"`);
    if (/\boption\s+[A-F]\b|\bfirst option\b|\blast option\b|\bthe option above\b/i.test(q.explanation)) {
      problems.push(`an explanation names an option by letter or by POSITION, and options are shuffled at render: "${q.question.slice(0, 50)}"`);
    }
  }
  /* the histogram, measured rather than assumed */
  const hist = [0, 0, 0, 0, 0, 0];
  for (const q of QUIZ) hist[q.correctIndex] += 1;
  const used = hist.filter((n) => n > 0);
  const worst = Math.max(...used) / QUIZ.length;
  if (worst > 0.4) problems.push(`the correct answer sits in one position ${pct(worst * 100)} of the time; quiz.histogram refuses above 40%`);
  /* near-duplicate stems, at the same token Jaccard the validator uses */
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  for (let i = 0; i < QUIZ.length; i += 1) {
    for (let j = i + 1; j < QUIZ.length; j += 1) {
      const a = tok(QUIZ[i].question); const b = tok(QUIZ[j].question);
      const inter = [...a].filter((w) => b.has(w)).length;
      const uni = new Set([...a, ...b]).size;
      if (uni && inter / uni >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 45)}" and "${QUIZ[j].question.slice(0, 45)}"`);
    }
  }
  /* quiz-02: no item asks which response is "best", because more than one of them is defensible */
  const bestResponse = QUIZ.filter((q) => /\bbest (?:way|response|action)\b|\bmost appropriate response\b/i.test(q.question));
  if (bestResponse.length) problems.push(`a quiz item asks which response is best; quiz-02 is that two responses to inflation are both defensible: "${bestResponse[0].question.slice(0, 60)}"`);
}

/* ══ 12 · THE DIAGRAMS ═════════════════════════════════════════════════════ */
{
  if (!ALL_DIAGRAMS.length) problems.push('structure-01 is that this section ships zero diagrams');
  const textNodes = (svg) => [...svg.matchAll(/<text x="([\d.\-]+)" y="([\d.\-]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="([a-z]+)"[^>]*>([^<]*)<\/text>/g)]
    .map((m) => ({ x: Number(m[1]), y: Number(m[2]), size: Number(m[3]), anchor: m[4], text: m[5] }));
  const boxOf = (n) => {
    const w = estWidth(n.text, n.size);
    const x0 = n.anchor === 'middle' ? n.x - w / 2 : n.anchor === 'end' ? n.x - w : n.x;
    return { x0, x1: x0 + w, y0: n.y - n.size * 0.8, y1: n.y + n.size * 0.25 };
  };
  const overlaps = (a, b, tol) => a.x0 < b.x1 - tol && b.x0 < a.x1 - tol && a.y0 < b.y1 - tol && b.y0 < a.y1 - tol;
  for (const d of ALL_DIAGRAMS) {
    for (const s of d.scenarios) {
      const vb = s.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
      if (!vb) { problems.push(`${d.title}/${s.label}: no viewBox`); continue; }
      const [w, h] = [Number(vb[1]), Number(vb[2])];
      /*
       * TWO FRAMES, NOT ONE (Verify B defect 1). A drawn diagram keeps the 440-unit frame; a
       * DECLARED TABLE is emitted narrower than the 313px card a 390px phone gives it, which is
       * the only way a 12-unit cell can render at 12px there rather than at 7.11px.
       */
      const wantW = d.kind === 'table' ? TBLP.w : FRAME.w;
      if (w !== wantW) problems.push(`${d.title}/${s.label}: viewBox is ${w} units and a ${d.kind === 'table' ? 'declared table' : 'drawn diagram'} in this section is ${wantW}`);
      const nodes = textNodes(s.svg);
      if (!nodes.length) problems.push(`${d.title}/${s.label}: no text nodes parsed — the emitter's shape changed and every check below is blind`);
      for (const n of nodes) {
        /*
         * ONE FLOOR NOW, FOR TABLES TOO. The exemption below used to read: a table is a dense grid
         * the app offers full-screen, and `diagram.table-legible` judges it in the 620px laptop
         * column, where 10 units on a 440-unit frame is 14.1px. Verify B measured the same cells
         * at 7.11px on a 390px phone and found no zoom that showed a row and its label together.
         * The frame answers the width; this floor answers the face, and it applies to everything.
         */
        if (n.size < MIN_FACE) problems.push(`${d.title}/${s.label}: a ${n.size}-unit face below the ${MIN_FACE}-unit floor: "${n.text}"`);
        const b = boxOf(n);
        if (b.x0 < -0.5 || b.x1 > w + 0.5 || b.y1 > h + 0.5 || b.y0 < -0.5) {
          problems.push(`${d.title}/${s.label}: "${n.text.slice(0, 32)}" extends outside the ${w}×${h} canvas (${round2(b.x0)}..${round2(b.x1)}, ${round2(b.y0)}..${round2(b.y1)})`);
        }
      }
      /* all pairs, because Verify B found packet 40's collisions in a pair its runner never compared */
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          if (overlaps(boxOf(nodes[i]), boxOf(nodes[j]), COLLIDE_TOL)) {
            problems.push(`${d.title}/${s.label}: labels overlap — "${nodes[i].text.slice(0, 26)}" and "${nodes[j].text.slice(0, 26)}"`);
          }
        }
      }
    }
    if (d.kind === 'table' && Array.isArray(d.checklist) && d.checklist.length) {
      problems.push(`${d.title} declares kind:"table" and carries a checklist; diagram.table-checklist refuses that`);
    }
    if (d.kind !== 'table' && !(Array.isArray(d.checklist) && d.checklist.length)) {
      problems.push(`${d.title} is a drawn diagram with no checklist`);
    }
    /*
     * A DECLARED TABLE IS JUDGED AT BOTH WIDTHS, AND THE PHONE IS THE BINDING ONE.
     *
     * 620px is the Learn Mode column at 1024 wide and is what `diagram.table-legible` measures.
     * 313px is the same column at 390 wide, browser-measured by Verify B on 22 September — it is
     * NOT derived from anything this repository emits, which is the point: the fix narrowed the
     * frame, so a check that took its yardstick from the frame could not see the fix fail.
     *
     * The third line is the one defect 1 was actually about. The full-screen sheet's "Read" zoom
     * draws 1:1 with the viewBox, so a table wider than 390 units needs sideways scrolling at the
     * only zoom that reaches 12px — and the row labels, being leftmost, are what leaves the screen.
     */
    if (d.kind === 'table') {
      for (const s of d.scenarios) {
        const vbW = Number(s.svg.match(/viewBox="0 0 ([\d.]+) /)[1]);
        const smallest = Math.min(...[...s.svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1])));
        const laptop = smallest * (620 / vbW);
        const phone = smallest * (313 / vbW);
        if (laptop < 12) problems.push(`${d.title}/${s.label}: smallest cell renders ${round2(laptop)}px in the 620px column; diagram.table-legible wants 12`);
        if (phone < 12) problems.push(`${d.title}/${s.label}: smallest cell renders ${round2(phone)}px in the 313px column a 390px phone gives it — Verify B's defect 1 verbatim`);
        if (vbW > 390) problems.push(`${d.title}/${s.label}: ${vbW} units wide, so the sheet's 1:1 "Read" zoom is ${vbW}px on a 390px screen and the row labels scroll off the left edge`);
      }
    }
  }
  /* A/B THE COLLISION GUARD ITSELF, in both directions (packet 40's lesson) */
  {
    const a = { x: 100, y: 100, size: 12, anchor: 'start', text: 'Recovery' };
    const b = { x: 104, y: 100, size: 12, anchor: 'start', text: 'Downturn' };
    const far = { x: 300, y: 100, size: 12, anchor: 'start', text: 'Downturn' };
    if (!overlaps(boxOf(a), boxOf(b), COLLIDE_TOL)) problems.push('the collision guard no longer fires on two labels four units apart');
    if (overlaps(boxOf(a), boxOf(far), COLLIDE_TOL)) problems.push('the collision guard fires on two labels two hundred units apart');
    /* the vertical case the inherited line check was blind to (MEMORY) */
    const above = { x: 100, y: 94, size: 12, anchor: 'start', text: 'Boom' };
    if (!overlaps(boxOf(a), boxOf(above), COLLIDE_TOL)) problems.push('the collision guard is blind to two labels stacked six units apart vertically');
  }
  /* THE HEADLINE FIGURES ARE COUNTED BACK OUT OF THE EMITTED SVG and re-derived */
  const svgTextOf = (d) => svgOf(d).map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' ')).join(' ');
  const wants = [
    [DIAGRAMS[0], [money(F.operatingProfit), money(F.inflationProfit), money(F.depProfit), money(F.appProfit)]],
    [DIAGRAMS[1], [money(F.interestExtra), money(F.demandChannel), money(F.rateBothProfit)]],
    [DIAGRAMS[2], ['Boom', 'Downturn', 'Slump', 'Recovery', 'Long-run path', money(F.recessionProfit)]],
    [DIAGRAMS[3], [money(F.compliance), money(F.accidentCost)]],
    [DIAGRAMS[4], [qty(F.breakEvenUnits), qty(F.breakEvenUnitsWar), money(F.matchProfit)]],
  ];
  for (const [d, list] of wants) {
    const text = svgTextOf(d);
    for (const want of list) {
      if (!text.includes(want)) problems.push(`${d.title} does not print "${want}"`);
    }
  }
  /* the three IP rights each reach the table that exists to teach them (specThin-01/02/03) */
  {
    const ipText = svgTextOf(ALL_DIAGRAMS.find((d) => /Patents, Copyright/.test(d.title)));
    for (const [name] of IP_RIGHTS) if (!ipText.includes(name)) problems.push(`the intellectual property table does not print "${name}"`);
  }
}

/* ══ 13 · SHAPE ════════════════════════════════════════════════════════════ */
{
  const ids = [...SUBSECTIONS.map((s) => s.id), ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id),
    ...FLASHCARDS.map((c) => c.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id)];
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) problems.push(`duplicate ids: ${JSON.stringify([...new Set(dup)].slice(0, 4))}`);
  if (new Set(ATTACH_SLUGS).size !== ATTACH_SLUGS.length) problems.push('two subsections share a slug');
  for (const s of SUBSECTIONS) {
    if (String(s.keyIdea).length > 180) problems.push(`${s.title}: keyIdea is ${String(s.keyIdea).length} chars (budget 180)`);
    if (/\*\*/.test(s.keyIdea)) problems.push(`${s.title}: keyIdea carries bold`);
    const teaching = [s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []), b.result]),
      s.realExample?.text, s.misconception, s.examMatters].filter(Boolean).join(' ');
    const w = teaching.replace(/\*\*/g, '').split(/\s+/).filter(Boolean).length;
    if (w > 350) problems.push(`${s.title}: ${w} words of teaching text (budget 350)`);
  }
  for (const b of content) {
    if (!b.takeaway || b.takeaway.length < 3) problems.push(`chapter "${b.title}" has fewer than three takeaways`);
    for (const tk of b.takeaway || []) if (String(tk).length > 100) problems.push(`chapter "${b.title}": takeaway "${String(tk).slice(0, 40)}" is ${String(tk).length} chars (budget 100)`);
  }
  /*
   * THE MISTAKE FIELDS ARE PARSED OUT OF THE COMPONENT THAT RENDERS THEM (MEMORY: "the probe reads
   * the shipping file"). Reading the builder and checking it against a list typed here would agree
   * with itself; this reads `components/MistakesTab.jsx`, collects the `item.<field>` names it
   * prints, and asserts every one of them is populated. It is what caught the inherited
   * `{looks_like, why, instead}` shape, which nothing in this repository has ever rendered.
   */
  {
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    const rendered = [...new Set([...tab.matchAll(/\bitem\.([a-zA-Z_]+)\b/g)].map((m) => m[1]))];
    if (rendered.length < 3) problems.push(`MistakesTab.jsx renders ${rendered.length} item fields; the parse has stopped working and every check below it is blind`);
    for (const field of rendered) {
      const empty = MISTAKES.filter((m) => !String(m[field] ?? '').trim());
      if (empty.length) problems.push(`MistakesTab.jsx prints item.${field} and ${empty.length} of ${MISTAKES.length} mistakes leave it empty — that is a card with a blank body (V035)`);
    }
    /* and nothing is emitted that no component reads, which is the other half of the same rule */
    for (const m of MISTAKES) {
      for (const field of Object.keys(m)) {
        if (field !== 'id' && !rendered.includes(field)) problems.push(`a mistake carries "${field}" and MistakesTab.jsx renders no such field`);
      }
    }
  }
  for (const c of EXTRAS.chains) {
    if (!c.title || !Array.isArray(c.steps) || !c.steps.length) problems.push('an extras chain has no title or no steps array');
  }
  for (const e of EXTRAS.evaluation) {
    if (!e.title || !e.content) problems.push('an extras evaluation frame is missing a title or a body');
  }
  if (!EXTRACT.startsWith('Source A.')) problems.push('the practice source no longer opens as a labelled source');
  /*
   * NO MARKDOWN IN A PRACTICE STEM (Verify B defect 6). `PracticeQuestionsTab.jsx:156` prints
   * `{q.question}` as a text node and `InlinePractice.jsx:125` prints `stripMarks(question.question)`
   * — neither parses markdown — so `**Source A.**` reached the student as two asterisks, twelve
   * times. Asserted over the stems AND the guidance, by reading the components rather than by
   * trusting this comment: `grep -c dangerouslySetInnerHTML components/PracticeQuestionsTab.jsx`
   * is 0, which is the reason the ban is here and not on the teaching body, which does parse it.
   */
  for (const p of PRACTICE) {
    for (const [field, text] of [['question', p.question], ['guidance', p.guidance]]) {
      const md = String(text).match(/\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)/);
      if (md) problems.push(`practice ${p.command} ${p.marks}: ${field} carries markdown "${md[0].slice(0, 24)}" and no practice surface parses it`);
    }
  }
}

/* ══ 14 · THE VALIDATOR ════════════════════════════════════════════════════ */
/*
 * `await`, AND THEN A GUARD THAT THE AWAIT HAPPENED (packet 37's own defect: a runner that read
 * `loadBundle()` without awaiting reported 0 BLOCK / 19 DEBT for a section that was 18 / 43,
 * because `before` was computed against a Promise and nothing else in the gate could see it).
 */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '2.3.5' || ctx.unitCode !== 'WBS12' || ctx.subject !== 'business') {
  problems.push(`the database says this section is ${ctx.subject} ${ctx.unitCode} ${ctx.number}; this packet is built for business WBS12 2.3.5`);
}
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
const coverage = after.findings.find((f) => f.rule === 'spec.coverage');

console.log(`\n${SECTION} — packet 41`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} chapters · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  coverage: ${coverage?.detail ?? 'not reported'}`);
console.log(`  spine:  ${money(F.revenue)} → ${money(F.operatingProfit)} → ${money(F.profitForYear)} · inflation ${pct(F.inflation)} leaves ${money(F.inflationProfit)} · ${fx(F.e0)}→${fx(F.e1)} is ${pct(F.depreciationPct)} down and ${pct(F.importRisePct)} up · rate ${pts(F.rateRise)} costs ${money(F.interestExtra)} and its demand costs ${money(F.demandChannel)} · matching ${money(F.warPrice)} gives ${money(F.matchProfit)}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }
/*
 * AND `recall.recoverable` IS INFO, SO NOTHING ABOVE CAN SEE IT. `npm run recalls` is the only gate
 * in the tree that can, and DECISIONS (packet 2.7) says a section with no row in
 * `audit/recall-census-baseline.json` is held to ZERO — this section has no row. The reorder and
 * fill-in checks in block 9 are a second, independent pass; this is the gate's own measure, and the
 * packet refuses on a single finding rather than waiting for the census to fail.
 */
const recoverableFindings = after.findings.filter((f) => f.rule === 'recall.recoverable');
if (recoverableFindings.length) {
  console.error(`\n${recoverableFindings.length} recall(s) answerable by scrolling up, and this section has no baseline row, so it is held to zero:`);
  for (const f of recoverableFindings) console.error(`  - ${f.where}: ${f.detail}`);
  process.exit(1);
}

console.log(`
packet checks
  NUMBERING  2.3.4, 2.3.5 and the start of Unit 3 asserted BY LINE NUMBER out of bus_spec.txt, plus
             every bullet of the three sub-topics inside the 1009-1044 span and the order of the
             three lists in _packet41-util.mjs — so specGap-08's own "2.3.5 vs GCE 2.5 — unsure" is
             settled in the repository rather than in a comment
  APPENDIX 6 the command words PARSED out of bus_spec.txt:2212-2254 rather than imported from
             lib/ial-marking.js, because a check that reads what the fix read cannot see the fix's
             blind spot. Assess is asserted to be 10 with [Units 1/2] and 12 with [Units 3/4],
             which is what refuses topFix-05's "10/12-mark Assess" on this paper
  LOCALE     every UK statute, National Insurance, the central bank, the CMA and every UK frame
             banned over prose AND the SVG text, each A/B'd against a string it must catch and the
             specification's OWN wording for the same idea, which it must not — accuracy-01,
             accuracy-02 and topFix-02 made unrepresentable rather than corrected
  BOUNDARY   cost-push and demand-pull (econ_spec.txt:917-918), the perfect-competition/monopoly
             taxonomy (0 hits in the whole of bus_spec.txt), SPICED (0 hits, and its first letter is
             the UK frame), market size and saturation (:1373, Unit 4), Examine and Outline
  POINTER    Porter's five forces banned EXCEPT in a sentence naming 3.3.1 and 4.3.2, with a
             NEEDS_ONE making that sentence compulsory — accuracy-03's "or elsewhere" clause
             refuted against :1110 and :1390 rather than accepted (packet 38's precedent)
  PINS       ${content.length} chapters, each with its own diagram, quiz items and practice items, all DERIVED
             from the item's own chapter tag; no hand-written index array exists, which is what
             makes structure-02 and structure-03 unrepresentable, and ${unpinned.size} unpinned items sit first
             for the signed-out pre-test
  ARITHMETIC the margin amplification derived from the cost rise AND from the reciprocal of the
             margin and asserted equal; the currency asymmetry derived from the rates, from the
             bills and from x/(1−x) and asserted equal — and the depreciation and the import-cost
             rise asserted DIFFERENT, which is the mistake the section exists to correct; the two
             interest channels asserted to stand in the ratio the teaching claims; the price war
             asserted to be a loss and the hold not to be
  CONTENT    ${SUBSECTIONS.length} subsections, every one inside the 350-word budget and every one carrying a recall
             in one of the four contract types, the fill-in contract enforced before the validator
             sees it, and every reorder asserted to be taught by an extras chain and NOT printed on
             the step that drills it — this section has NO row in recall-census-baseline.json, so it
             is held to zero and inherits nothing
  PRACTICE   all eight Appendix 6 command words, every item anchored to one source because Business
             Units 1 and 2 are entirely source-based, every stem ending in its own tariff, two
             guidance paragraphs with no figure and no allocation in the first, points at 6 and
             below and levels above, and the shareholders-versus-stakeholders 20-marker asserted
             ABSENT as well as replaced
  DIAGRAMS   ${ALL_DIAGRAMS.length} diagrams — drawn ones on a ${FRAME.w}-unit frame, declared TABLES on a ${TBLP.w}-unit one so a
             ${MIN_FACE}-unit cell is 12.5px in the 313px card a 390px phone gives it instead of 7.11px and the
             sheet's 1:1 zoom needs no sideways scroll (Verify B defect 1) — a ${MIN_FACE}-unit floor for both,
             text extent inside the
             canvas, ALL-PAIRS glyph-box collisions at ${COLLIDE_TOL} of a face with the guard itself A/B'd
             in three directions including the vertical case the inherited check was blind to, and
             every headline figure counted back OUT of the emitted SVG
  SHAPE      ids unique · one currency symbol · one minus sign, U+2212 · no year · no named real
             company · no UK frame — so accuracy-01's three problems are made unrepresentable
             rather than swapped for another country and another year`);

if (DUMP) {
  const out = `audit/snapshots/packet-41-bundle__business__${SECTION}.json`;
  writeFileSync(out, `${JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-41-bundle', tables: bundle }, null, 1)}\n`);
  console.log(`\nbundle written to ${out}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
