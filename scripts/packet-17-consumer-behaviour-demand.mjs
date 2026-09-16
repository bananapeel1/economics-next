#!/usr/bin/env node
/**
 * PACKET 17 — consumer-behaviour-demand, the largest topic in Economics Unit 1 (39 spec leaves).
 *
 *   node scripts/packet-17-consumer-behaviour-demand.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-17-consumer-behaviour-demand.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-17-consumer-behaviour-demand.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet17-content.mjs (blocks and Notes), scripts/_packet17-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet17-diagrams.mjs (the five SVGs). This file
 * assembles the bundle, pins each block to its diagram, quiz and practice items, and runs the checks a
 * verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - phrases that must not survive: pounds sterling, "Outline" and "Assess" (neither is an IAL
 *     Economics command word), the UK GCE behavioural vocabulary the specification does not use,
 *     "conditions of demand" (AQA, and zero occurrences in econ_spec.txt), "consumer surplus" (not a
 *     leaf of 1.3.2), the fabricated March examples, UK-only institutions, any uncited examiner claim,
 *     any claim about what a marker does, and any claim about how often a paper asks something;
 *   - every practice command word and tariff checked against audit/raw/tariff-census.json for
 *     ECONOMICS, where there is no Assess and no 10-mark tariff;
 *   - the diagrams' own geometry, re-derived from the emitted SVG rather than asserted: the demand
 *     line, its marked points and its midpoint against Q = 1200 − 40P, the revenue curve against
 *     P × Q at the same fares, the utility bars against the marginal-utility schedule, and every
 *     number-line marker against the elasticity value it claims;
 *   - Layer 5 by string: Tafari's figures appear in the body AND in at least one other surface.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, qAt, trAt, ped, pctQ, pctP, MU, totalUtility, MID_P, MID_Q, MAX_TR, CHOKE_P, D_INTERCEPT, D_SLOPE, FARES, PED_INELASTIC, PED_ELASTIC, INCOME_RISE, COACH_YQ, AIR_YQ, RICE_YQ, yed, AIR_FARE_RISE, COACH_XQ, COACH_FARE_FALL, HOTEL_XQ, XED_SUBSTITUTE, XED_COMPLEMENT } from './_packet17-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6 } from './_packet17-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet17-assessment.mjs';
import { DIAGRAMS, DX, DY, TX, TY, muH, tuH, UBAR, NX, r2 } from './_packet17-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a signed-out student is sent only
 * PREVIEW_LIMITS.quiz items (F086), so a pre-test whose pool sits at the end of the array serves that
 * student two PINNED questions instead (packet 16's walkthrough). A fourth unpinned item would reach
 * no surface at all, because the pre-test slices at three (packet 15).
 */
const unpinned = new Set(QUIZ.map((q, i) => (q.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'According to the law of diminishing marginal utility, as a consumer eats more slices of pizza:'),
  [B2]: first(quizByBlock[B2], 'Which of the following would cause a leftward shift of the demand curve for butter?'),
  [B3]: first(quizByBlock[B3], 'A firm finds that when it raises the price of its product by 10%, quantity demanded falls by 5%. Its PED is:'),
  [B4]: first(quizByBlock[B4], 'A business finds that when it raises the price of its product by 10%, total revenue increases. This shows that demand is:'),
  [B5]: first(quizByBlock[B5], 'A product has a YED of +2.5. This means the good is:'),
  [B6]: first(quizByBlock[B6], 'A government imposes an indirect tax on a good with price elastic demand. Compared with taxing a good with inelastic demand, it will:'),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5], [B6]: practiceByBlock[B6],
};
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why topFix-04's "add diagramRef" would not have
 * worked. Block 6 has none on purpose: the significance of the three elasticities for firms, consumers
 * and government is an argument, and a drawing of it would be decoration.
 */
const diagramIds = {
  [B1]: DIAGRAMS[0].id, [B2]: DIAGRAMS[1].id, [B3]: DIAGRAMS[2].id,
  [B4]: DIAGRAMS[3].id, [B5]: DIAGRAMS[4].id, [B6]: undefined,
};

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

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
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject)');
ban(/\bAssess\b/g, '"Assess" (an IAL Business command word; Economics has no Assess and no 10-mark tariff)');
ban(/\banchoring\b|\bloss aversion\b|\bbounded rational/gi, 'UK GCE behavioural vocabulary (0 occurrences in econ_spec.txt; the spec names herding, habit, inertia, computation, the need to feel valued, framing and bias)');
ban(/\bconditions of demand\b/gi, '"conditions of demand" (AQA vocabulary — 0 occurrences in econ_spec.txt; specGap-02 is refuted)');
ban(/\bconsumer surplus\b/gi, '"consumer surplus" (not a leaf of 1.3.2; one occurrence in the whole Economics spec, in a competition topic)');
ban(/\bWaitrose\b|\bequi-marginal\b/g, 'a March example or framing this packet removed (accuracy-01, the equi-marginal condition)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|HS2|the Chancellor|Competition and Markets Authority)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(CMA|RPI|ONS|OBR)\b/g, 'a UK-only acronym (locale.institution)');

for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * The same class one step out, and the reason this check exists: `claim.uncited` only fires on the
 * word "examiners", so a sentence can assert exactly the same thing without naming them — "that earns
 * half the marks", "scores poorly", "will not earn full marks" — and pass the validator untouched
 * (packet 16's Layer 6 found thirteen). Say what the COMMAND WORD requires, which Appendix 6 states
 * and which can therefore be cited; do not say what a marker does with an answer, which cannot.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);

/*
 * structure-10: the March examMatters asserted how often the paper asks things — "almost every paper",
 * "often open a paper", "a common 8-mark question", "tested relentlessly" — none of which matches the
 * WEC11 structure, and all of which a student in an international centre reads as fact.
 */
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
/*
 * Layer 6 found the same class one step further out, and the regex above did not reach it: a
 * sentence can assert how papers are BUILT rather than how often they ask — "a question rarely
 * wants all six", "a data question usually supplies an age breakdown too", "an extract naming two
 * firms rarely says which the question is about". Each is a claim about a body of papers nobody
 * cited. State what the command word requires, or state the technique unconditionally.
 */
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

// Practice command words and tariffs against the specification's own Appendix 6, for ECONOMICS.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}
for (const b of [B1, B2, B3, B4, B5, B6]) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned (structure-01: the 20-mark Evaluate never reached a student)`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
}

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01
 * rule). If a figure in the body changes and a diagram does not, these fail.
 */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };
{ // 1 · the utility bars, from the marginal-utility schedule
  const [mu, tu] = svgOf(DIAGRAMS[0]);
  MU.forEach((v, i) => has(mu, `height="${muH(v)}"`, `the marginal-utility bar for trip ${i + 1} is not drawn at the height ${money(v)} gives`));
  [1, 2, 3, 4].forEach((n) => has(tu, `height="${tuH(totalUtility(n))}"`, `the total-utility bar after ${n} trip(s) is not drawn at the height ${money(totalUtility(n))} gives`));
  if (muH(MU[0]) <= muH(MU[1]) || muH(MU[1]) <= muH(MU[2]) || muH(MU[2]) <= muH(MU[3])) problems.push('the marginal-utility bars do not fall from left to right');
  if (tuH(totalUtility(1)) >= tuH(totalUtility(2))) problems.push('the total-utility bars do not rise from left to right');
}
{ // 2 · the demand line and its marked points, from Q = 1200 − 40P
  const [movement, shift] = svgOf(DIAGRAMS[1]);
  const ends = `x1="${DX(qAt(30))}" y1="${DY(30)}" x2="${DX(qAt(0))}" y2="${DY(0)}"`;
  has(movement, ends, `the demand line does not run between the two ends Q = ${D_INTERCEPT} − ${D_SLOPE}P gives`);
  for (const p of [20, 15]) has(movement, `cx="${DX(qAt(p))}" cy="${DY(p)}"`, `the point at a fare of ${money(p)} is not plotted at the ${qAt(p)} tickets the schedule gives`);
  has(shift, ends, 'D1 on the shift view is not the same line as the curve on the movement view');
  if (DY(30) >= DY(0)) problems.push('the price axis is inverted: a higher fare must be drawn higher');
}
{ // 3 · the midpoint of the straight line, where PED is 1
  const alongTheLine = svgOf(DIAGRAMS[2])[2];
  has(alongTheLine, `cx="${DX(MID_Q)}" cy="${DY(MID_P)}"`, `the midpoint is not marked at ${MID_Q} tickets and a fare of ${money(MID_P)}`);
  if (MID_P !== D_INTERCEPT / (2 * D_SLOPE) || MID_Q !== qAt(MID_P)) problems.push('the midpoint constants disagree with the demand function');
}
{ // 4 · the revenue curve, sampled from P × Q rather than drawn as a guess at a parabola
  const [curve, rectangle] = svgOf(DIAGRAMS[3]);
  has(curve, `cx="${TX(MID_P)}" cy="${TY(MAX_TR)}"`, `the revenue peak is not marked at ${money(MID_P)} / ${money(MAX_TR)}`);
  // the marker arrowheads in <defs> also carry a points="" attribute, so take the polyline's own
  const pts = (curve.match(/<polyline points="([^"]+)"/) || [])[1].split(' ').map((pair) => pair.split(',').map(Number));
  const lowestY = Math.min(...pts.map((q) => q[1]));
  if (Math.abs(lowestY - TY(MAX_TR)) > 0.02) problems.push(`the sampled revenue curve peaks at y=${lowestY}, not at the ${money(MAX_TR)} the arithmetic gives`);
  const atPeak = pts.find((q) => Math.abs(q[0] - TX(MID_P)) < 0.02);
  if (!atPeak || Math.abs(atPeak[1] - TY(MAX_TR)) > 0.02) problems.push('the sampled curve does not pass through its own marked peak');
  for (const p of [10, 22]) has(curve, `cx="${TX(p)}" cy="${TY(trAt(p))}"`, `the revenue point at ${money(p)} is not plotted at ${money(trAt(p))}`);
  has(rectangle, `width="${r2(DX(qAt(12)) - 78)}"`, `the revenue rectangle is not drawn as wide as ${qAt(12)} tickets`);
}
{ // 5 · the number lines, from the elasticity values themselves
  const [yedSvg, xedSvg] = svgOf(DIAGRAMS[4]);
  for (const v of [yed(COACH_YQ), yed(RICE_YQ), yed(AIR_YQ)]) has(yedSvg, `cx="${NX(v)}"`, `the YED marker for ${v} is not at the position the scale gives`);
  for (const v of [XED_COMPLEMENT(), 0, XED_SUBSTITUTE(), 2.5]) has(xedSvg, `cx="${NX(v)}"`, `the XED marker for ${v} is not at the position the scale gives`);
  if (NX(0) <= NX(-1) || NX(1) <= NX(0)) problems.push('the number line does not increase from left to right');
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Tafari's figures are the same figures wherever they appear.
const must = [money(MID_P), `${MID_Q}`, money(MAX_TR), `${ped(...PED_INELASTIC)}`, `${ped(...PED_ELASTIC)}`, money(trAt(12)), `${yed(COACH_YQ)}`, `${XED_SUBSTITUTE()}`, `${XED_COMPLEMENT()}`, money(MU[0])];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// and the arithmetic itself, recomputed here rather than trusted
for (const p of FARES) if (qAt(p) !== D_INTERCEPT - D_SLOPE * p) problems.push(`qAt(${p}) disagrees with Q = ${D_INTERCEPT} − ${D_SLOPE}P`);
for (const p of FARES) if (trAt(p) !== p * qAt(p)) problems.push(`trAt(${p}) is not price × quantity`);
if (FARES.some((p) => trAt(p) > MAX_TR)) problems.push('a fare in the table beats the midpoint for revenue, so the peak is not at the midpoint');
if (Math.round((pctQ(...PED_INELASTIC) / pctP(...PED_INELASTIC)) * 100) / 100 !== ped(...PED_INELASTIC)) problems.push('ped() disagrees with its own percentages on the inelastic segment');
if (Math.round((pctQ(...PED_ELASTIC) / pctP(...PED_ELASTIC)) * 100) / 100 !== ped(...PED_ELASTIC)) problems.push('ped() disagrees with its own percentages on the elastic segment');
if (Math.abs(ped(...PED_INELASTIC)) >= 1) problems.push('the segment called inelastic has a PED of 1 or more in size');
if (Math.abs(ped(...PED_ELASTIC)) <= 1) problems.push('the segment called elastic has a PED of 1 or less in size');
if (trAt(PED_INELASTIC[1]) <= trAt(PED_INELASTIC[0])) problems.push('revenue does not rise across the inelastic segment, which is what inelastic demand means');
if (trAt(PED_ELASTIC[1]) >= trAt(PED_ELASTIC[0])) problems.push('revenue does not fall across the elastic segment, which is what elastic demand means');
if (yed(COACH_YQ) >= 0) problems.push('the inferior good does not have a negative YED');
if (yed(AIR_YQ) <= 1) problems.push('the luxury does not have an income elastic YED');
if (yed(RICE_YQ) <= 0 || yed(RICE_YQ) >= 1) problems.push('the necessity is not between 0 and 1');
if (XED_SUBSTITUTE() <= 0) problems.push('the substitute pair does not have a positive XED');
if (XED_COMPLEMENT() >= 0) problems.push('the complement pair does not have a negative XED');
if (Math.round((COACH_XQ / AIR_FARE_RISE) * 100) / 100 !== XED_SUBSTITUTE()) problems.push('XED_SUBSTITUTE() disagrees with its own inputs');
if (Math.round((HOTEL_XQ / COACH_FARE_FALL) * 100) / 100 !== XED_COMPLEMENT()) problems.push('XED_COMPLEMENT() disagrees with its own inputs');
MU.forEach((m, i) => { if (i && m >= MU[i - 1]) problems.push(`marginal utility does not diminish at trip ${i + 1}`); });
if (totalUtility(4) !== MU.reduce((a, b) => a + b, 0)) problems.push('totalUtility() disagrees with the schedule');

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 17 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`the demand schedule: ${FARES.map((p) => `${money(p)}→${qAt(p)} (${money(trAt(p))})`).join('  ')}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(38)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 74)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no Outline or Assess, no UK GCE behavioural vocabulary, no "conditions of demand" or "consumer surplus", no UK-only institution, no uncited examiner claim, no marker claim, no paper-frequency claim, every practice tariff in the Economics census, every block pinned to a quiz and a practice item, every diagram figure re-derived from Q = 1200 − 40P, ids unique, Tafari\'s figures agreeing across every surface');

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
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 160)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 160)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const p = `audit/snapshots/packet-17-bundle__economics__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-17-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
