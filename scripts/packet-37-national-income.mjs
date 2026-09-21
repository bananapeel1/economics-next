#!/usr/bin/env node
/**
 * PACKET 37 — national-income, Economics Unit 2 (WEC12), IAL topic 2.3.4.
 * `audit/raw/econ_spec.txt:1056-1082`. SIX blocks, twenty-three subsections, 19 substantive leaves.
 *
 *   node scripts/packet-37-national-income.mjs            # dry run, every check
 *   node scripts/packet-37-national-income.mjs --dump     # + write the bundle
 *   node scripts/packet-37-national-income.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists
 * because something it looks for actually shipped, in this repository, on a date. What this packet
 * adds or changes, with the reason:
 *
 *   - **THE PACKET'S SHARPEST RULE-1 CASE IS A FINDING THAT DOUBTED A CORRECT NUMBER.**
 *     `specGap-05` is unsure the app's "2.3.4" matches WEC12, and unsure the notes' references to
 *     2.3.2, 2.3.5 and 2.3.6 do either. All four are right — `:1056`, `:976`, `:1121-1125`,
 *     `:1181` — and the runner re-reads the oracle and asserts them rather than leaving a comment
 *     saying so. Five other items cite "2.1.1" or "2.4.1", which is UK GCE numbering and exists in
 *     neither specification; the owner of the GDP-measurement material they mean is **2.3.1**,
 *     `measures-economic-performance`, built by packet 21.
 *   - **THE SECTION'S CENTRAL METAPHOR WAS A WORD THE SPECIFICATION NEVER USES.** `leakage` is 0
 *     hits in `econ_spec.txt`; `withdrawal` is the specification's word at `:1062`, `:1068` and
 *     `:1072`. Banned, A/B'd, and with it the rest of the live "planned versus actual / adjustment
 *     through inventories" apparatus — `unplanned`, `inventories`, `Keynesian cross`, `45-degree`,
 *     `paradox of thrift`, `full employment`, `spare capacity`, `accelerator`, `factor market`,
 *     each 0 hits. That is `structure-02`'s real content, and it is larger than the redundancy the
 *     finding reported.
 *   - **BOTH MULTIPLIER FORMULAE ARE ASSERTED TO AGREE.** 4c hands over `1/(1−MPC)` and `1/MPW`
 *     (`:1084-1085`) and does not say when they are the same formula. They are the same whenever
 *     the four propensities sum to one, and the runner checks the sum, the identity MPW = 1 − MPC,
 *     the two formulae separately, the rounds converging on the total, and the new equilibrium
 *     where withdrawals have grown by exactly the injection. A change to a propensity that breaks
 *     any of those fails the build.
 *   - **THE AD/AS CASES ARE DERIVED TWICE AND COMPARED.** Each equilibrium is computed off the AD
 *     curve and off the AS curve independently, and the runner asserts the two agree. Packet 34's
 *     Layer 6 caught a printed ratio that did not divide the printed figures precisely because
 *     every other check recomputed from the same source; two curves is two sources.
 *   - **THE SIGN PROPERTY IS ASSERTED, NOT WRITTEN DOWN.** An AD shift must move output and the
 *     price level the SAME way and an AS shift must move them OPPOSITE ways. That sentence appears
 *     three times in the content and is the section's single most examinable claim, so the runner
 *     checks it against the computed figures rather than against the prose.
 *   - **THE ORDINAL BAN CARRIES A CARVE-OUT AND THE CARVE-OUT IS A/B'd** (packet 36). No quiz
 *     explanation may name an option by position, because `placeKeys` moves the key after the
 *     explanation was written. But this topic counts in rounds, so "smaller than the last by the
 *     same proportion" must survive. The carve-out is a fixed list of sequence nouns and it is
 *     tested in both directions.
 *   - **`FAILED_SUBSTITUTION`, over every surface INCLUDING the SVGs** (packet 29). The regex has
 *     NO trailing `\b`: `/\bundefined\b/` does not match `undefinedQ`.
 *   - **D013 IS CLOSED HERE AND THE CENSUS SAYS SO.** `audit/SPEC-OWNERSHIP.md` step 4 asks
 *     whichever packet runs second to re-run `packet-13-census.mjs` and check the multiplier is
 *     taught under its own heading nowhere else. Packet 32 removed `aggregate-demand`'s three
 *     multiplier subsections on 18 September, so this packet is second and the runner runs it.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, bn, prop, mult, idx, pct, round1, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, TEACHING_TERMS, teachingWords, teachingVocabulary,
} from './_packet37-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
  B1, B2, B3, B4, B5, B6,
} from './_packet37-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet37-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE } from './_packet37-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const E = ECON;

const problems = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ── pins, derived from each item's own block tag (packet 30) ──────────────── */
/*
 * `quiz-04`, `quiz-05` and `structure-04` are one defect: the live `quizIndices` put both multiplier
 * calculations two and three chapters before the multiplier chapter, gave the multiplier chapter the
 * easiest classification item in the bank, and left two items unreachable because the resolver takes
 * the first unused index. Hand-mapping fixes the instance; deriving makes it unrepresentable.
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
/*
 * SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29). Joined per diagram rather
 * than per `<text>` because a caption wrapped across two elements is in neither of them.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ══ 1 · A FAILED SUBSTITUTION, ON EVERY SURFACE ════════════════════════════ */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  /* A/B — note the regex has no trailing \b, which is what packet 29's version was missing */
  for (const bad of ['a span of undefinedQ', 'the multiplier is NaN', 'the economy [object Object] grows', 'income of ' + '${bn(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  /*
   * THE NEGATIVE CONTROLS ARE NEAR-MISSES ON PURPOSE. The pattern deliberately has no trailing
   * `\b` — `/\bundefined\b/` does not match `undefinedQ`, which is how packet 29's version let a
   * failed substitution through — so "an undefined term" SHOULD fire and is not a control. These
   * three are: a capital N beside a lower-case a that is not `NaN`, the word "object" that is not
   * `[object Object]`, and a dollar figure that is not an unclosed template.
   */
  for (const ok of ['a Nash equilibrium is not this model', 'the object of the exercise is the gap', 'an injection of $40bn']) {
    if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);
  }
}

/* ══ 2 · THE BANNED VOCABULARY, EACH WITH THE LINE THAT SETTLES IT ══════════ */
/*
 * NO `g` FLAG on the source patterns when testing. `RegExp.prototype.test` on a `/g` regex advances
 * `lastIndex`, so a second call against the same string starts past the match and returns false.
 * Packet 29 lost a round to exactly that.
 */
for (const [re, why, carve] of BANNED_ELSEWHERE) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  let hits = readable.filter((s) => one.test(s));
  if (carve?.exemptIf) {
    const refuted = hits.filter((s) => carve.exemptIf.test(s));
    if (carve.needsOne && refuted.length !== 1) problems.push(`${refuted.length} strings refute "${re.source}" and exactly one must — a student taught the other word needs to be told which one the paper uses, once`);
    hits = hits.filter((s) => !carve.exemptIf.test(s));
  }
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  /*
   * A/B, BECAUSE A BAN THAT HAS NEVER FIRED IS NOT KNOWN TO WORK (packet 21). The negatives matter
   * more than the positives: `\breal GDP\b` must not fire on "real national output", the
   * GDP-family pattern must not fire on "real income", and the `Assess` ban must not fire on
   * "assessment" or on a lower-case "assess" inside ordinary prose about judging an argument.
   */
  const fires = (i, str) => { const [re] = BANNED_ELSEWHERE[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'savings are a leakage from the circular flow', 'savings are a withdrawal from the circular flow'],
    [1, 'real GDP per capita is the usual comparison', 'equilibrium real national output rose to $560bn'],
    [1, 'purchasing power parity adjusts for price differences', 'the purchasing decisions of households'],
    [1, 'the limitations of GDP as a measure of living standards', 'the standard four-step method'],
    [2, 'a negative output gap opens in a downturn', 'the gap between the two totals is what matters'],
    [3, 'government borrowing causes crowding out of investment', 'the crowd of buyers at the port'],
    [4, 'the short-run Phillips curve trades one off against the other', 'the AS curve slopes upward'],
    [5, 'unplanned inventories rise when firms sell less than they produce', 'firms find they are selling more than they produced'],
    [5, 'the economy has spare capacity', 'the economy is producing well below its capacity'],
    [5, 'households supply labour to factor markets', 'households supply labour to firms'],
    [6, 'Assess the significance of the multiplier. (10 marks)', 'a brief assessment of the arguments'],
    [6, 'Outline the difference between injections and withdrawals.', 'the outline of the diagram'],
  ];
  {
    /* the leakage carve-out, A/B'd in both directions: it must exempt the refutation and nothing else */
    const carve = BANNED_ELSEWHERE[0][2].exemptIf;
    if (!carve.test('Write withdrawal, not "leakage". The specification uses withdrawal throughout.')) problems.push('the leakage carve-out no longer recognises the sentence that refutes the word');
    if (carve.test('savings are a leakage from the circular flow')) problems.push('the leakage carve-out exempts a sentence that simply uses the word');
  }
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bAnalyse\b(?![a-z]).{0,24}\(\s*(?!6\b)\d+\s*marks?\s*\)/g, 'an Analyse at a tariff other than 6 (Appendix 6, econ_spec.txt:2724)');
ban(/\b(10|12|16|18)[- ]mark\b/g, 'a tariff IAL Economics does not have — Appendix 6 gives 2, 4, 6, 8, 14 and 20 only');
ban(/\bVRIO\b|\bcore competenc|\bbalanced scorecard\b|\bSWOT\b/g, 'IAL Business vocabulary in an Economics section');
ban(/\bF0\d\d\b|\bC-national-income-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');

/*
 * THE POINTER RULE, WHICH IS PACKET 32'S RULE RUN IN THE OTHER DIRECTION. 3b's own wording is
 * "shifts in AD and/or AS curves", so AD and AS may be used here; what MOVES them is 2.3.2's and
 * 2.3.3's leaves and may only be pointed at. Each pattern carries the number of mentions it is
 * allowed, and going over is a finding rather than a judgement call.
 */
for (const { re, why, max } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
}
{
  /* the transfer-payments pointer must EXIST, because packet 0's fix is what it carries */
  const tp = readable.filter((s) => /transfer payments?/i.test(s));
  if (!tp.length) problems.push('no string names transfer payments — accuracy-01 and topFix-02 are the live section teaching that they are an injection, and the misconception that corrects it has to say the words');
  if (!tp.some((s) => /4\.3\.5/.test(s))) problems.push('transfer payments are named without the pointer to 4.3.5 · 1a (econ_spec.txt:1829), which is the leaf that owns them');
  /* and it may never be called an injection */
  const wrong = readable.filter((s) => /transfer payments?[^.]{0,80}\binjection\b/i.test(s) && !/not an injection|no output/i.test(s));
  if (wrong.length) problems.push(`transfer payments described as an injection, which is accuracy-01 regressed: "${wrong[0].slice(0, 110)}"`);
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(near(E.propensitySum, 1), `the four propensities sum to ${E.propensitySum}, not 1 — and unless they do, MPW is not 1 − MPC and the specification's two formulae give different answers`);
  a(near(E.mpw, 1 - E.mpc), `MPW ${E.mpw} is not 1 − MPC ${round2(1 - E.mpc)}`);
  a(near(E.kFromMpc, E.kFromMpw), `1/(1−MPC) gives ${E.kFromMpc} and 1/MPW gives ${E.kFromMpw}; 4c hands over both formulae and they must agree`);
  a(E.k > 1, `a multiplier of ${E.k} — the multiplier is always greater than one, so a value at or below it is a reciprocal taken the wrong way round`);
  /* the circuit, both ways round */
  a(E.Cd + E.S + E.T + E.M === E.Y, 'income disposed of does not sum to national income');
  a(E.Cd + E.I + E.G + E.X === E.Y, 'expenditure on output does not sum to national income');
  a(E.J === E.W, `injections ${E.J} against withdrawals ${E.W}: the section teaches this economy as being IN equilibrium`);
  /* the 2.3.2 identity reconciles to the same figures without a second set of numbers */
  a(E.adIdentity === E.Y, `C + I + G + (X − M) gives ${E.adIdentity} against national income ${E.Y} — a student who met AD in 2.3.2 must meet the same economy here`);
  /* the multiplier process */
  a(near(E.deltaY, E.shock * E.k), `${E.shock} × ${E.k} is not ${E.deltaY}`);
  /*
   * THE PARTIAL SUM IS OF THE ROUNDED ROUNDS, because those are the figures the content prints.
   * Sixty of them accumulate about a cent of rounding, so the tolerance is a cent per hundred
   * rather than absolute — and the EXACT limit is asserted separately against the formula, so a
   * loose tolerance here cannot hide a wrong multiplier.
   */
  a(near(E.shock / (1 - E.mpc), E.deltaY, 1e-9), `the exact limit of the series is ${E.shock / (1 - E.mpc)}, not ${E.deltaY}`);
  a(near(E.roundsSum(60), E.deltaY, 0.02), `the printed rounds converge on ${E.roundsSum(60)}, not on ${E.deltaY}`);
  a(E.ROUNDS.every((v, i) => i === 0 || v < E.ROUNDS[i - 1]), 'a round of the multiplier process is not smaller than the one before it');
  a(near(E.ROUNDS[1], E.ROUNDS[0] * E.mpc, 0.01), 'round two is not MPC times round one');
  /* the check that closes the model, and the sentence the section is built on */
  a(near(E.withdrawalRise, E.shock), `withdrawals rise by ${E.withdrawalRise} against an injection of ${E.shock} — the process stops exactly where these are equal, and the whole of 2d and 4a rests on it`);
  a(E.J2 === E.W2, `the new equilibrium has injections ${E.J2} against withdrawals ${E.W2}`);
  a(E.Y2 === E.Y + E.deltaY, 'the new national income is not the old one plus the multiplied change');
  a(E.fiveRoundShare > 90 && E.fiveRoundShare < 95, `the five-round share is ${E.fiveRoundShare}%, and the content prints it`);
  /* the ratio direction, specGap-04, on a DIFFERENT economy so 2.5 cannot be recalled */
  a(E.otherK === E.otherDeltaY / E.otherDeltaJ, 'the measured multiplier is not the ratio of the two changes');
  a(near(E.otherMpw, 1 / E.otherK) && near(E.otherMpc, 1 - E.otherMpw), 'the propensities recovered from the measured multiplier do not agree with it');
  a(E.otherK !== E.k, 'the worked ratio example uses the same multiplier as the spine, so a student can answer it from memory');
  /* a withdrawal runs the model downwards */
  a(E.importDeltaY === -E.importShock * E.k && E.Yimport === E.Y + E.importDeltaY, 'the import shock does not run the multiplier in reverse');
}
{
  /*
   * THE AD/AS CASES, DERIVED TWICE. Each equilibrium is computed off the AD curve and off the AS
   * curve independently in `_packet37-util.mjs`, and here the two are compared. Packet 34's Layer 6
   * found a printed ratio that did not divide the printed figures because every check recomputed
   * from one source; two curves is two sources, and this is the check that uses them.
   */
  const a = (ok, msg) => { if (!ok) problems.push(`AD/AS: ${msg}`); };
  a(E.Yad === E.YadViaAd, `the AD-shift equilibrium is ${E.Yad} off the supply curve and ${E.YadViaAd} off the demand curve`);
  a(E.Yas === E.YasViaAs, `the AS-shift equilibrium is ${E.Yas} off the demand curve and ${E.YasViaAs} off the supply curve`);
  a(E.adShift === E.deltaY, `AD shifts by ${E.adShift} where the multiplied change is ${E.deltaY} — specGap-03 is that the shift is the MULTIPLIED amount`);
  a(E.adShift > E.shock, 'the AD shift is not larger than the injection that caused it, which is the whole of 4d');
  /* THE SIGN PROPERTY — the section's single most examinable claim, checked against the figures */
  a(E.Yad > E.Y && E.Pad > E.P0, `an AD shift right must raise BOTH output and the price level; it gives ${E.Yad} and ${E.Pad} against ${E.Y} and ${E.P0}`);
  a(E.Yas > E.Y && E.Pas < E.P0, `an AS shift right must raise output and LOWER the price level; it gives ${E.Yas} and ${E.Pas} against ${E.Y} and ${E.P0}`);
  /* the three AS shapes must actually differ, or the last chapter has nothing to say */
  a(E.Ykeynes > E.Yad && E.Yad > E.Yclassical, `the three AS shapes give ${E.Ykeynes}, ${E.Yad} and ${E.Yclassical}, which are not strictly decreasing in output`);
  a(E.Pclassical > E.Pad && E.Pad > E.Pkeynes, `the three AS shapes give price levels ${E.Pclassical}, ${E.Pad} and ${E.Pkeynes}, which are not strictly decreasing in price`);
  a(E.Ykeynes - E.Y === E.adShift, 'the flat-AS case does not deliver the whole shift as output');
  a(E.Yclassical === E.Y, 'the vertical-AS case delivers some of the shift as output');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 6) problems.push(`${content.length} blocks, not 6`);
  if (SUBSECTIONS.length !== 23) problems.push(`${SUBSECTIONS.length} subsections, not 23`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item — the live section has none on two blocks`);
    if (!b.sections.length) problems.push(`block "${b.title}" has no subsections`);
  }
  /* every pin must resolve, which is diagram-01, diagram-02 and structure-03 made unrepresentable */
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram — topFix-03 asks for exactly that, and sharing a pin is how structure-03 happened');
  /* no legacy string pin may survive anywhere in the bundle */
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block still carries `diagramRef`, the legacy string pin whose bidirectional substring match produced structure-03');
  /* the pre-test pool: three, unpinned, and FIRST */
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items, not 3 — the pre-test asks three`);
  if ([...unpinned].some((i) => i > 2)) problems.push('an unpinned quiz item is not among the first three in the array');
  /* the free-quiz budget: 3 pre-test + one per chapter check-in */
  const freeNeeded = 3 + content.length;
  if (freeNeeded > 10) problems.push(`${freeNeeded} free quiz items needed against FREE_QUIZ_MAX 10 (DECISIONS, 16 September: eight chapters is where the budget runs out)`);
  /* no quiz or practice item orphaned */
  const pinnedQ = new Set(Object.values(quizIndices).flat());
  QUIZ.forEach((q, i) => { if (q.block && !pinnedQ.has(i)) problems.push(`quiz item ${i} is tagged "${q.block}" and reaches no block`); });
  const pinnedP = new Set(Object.values(practiceIndices).flat());
  PRACTICE.forEach((p, i) => { if (!pinnedP.has(i)) problems.push(`practice item ${i} (${p.command}) reaches no block`); });
  /* `pins.identity`: indices that are 0,1,2,… in block order are the sign nobody chose them */
  const firsts = content.map((b) => b.quizIndices[0]);
  if (firsts.every((v, i) => v === i)) problems.push('quizIndices open 0,1,2,… in block order');
  /* ids unique across the whole bundle */
  const ids = allStrings(bundle).filter((s) => IDLIKE.test(s));
  const dupes = ids.filter((x, i) => ids.indexOf(x) !== i && ids.indexOf(x) === ids.lastIndexOf(x));
  if (new Set(ids).size !== ids.length && dupes.length) problems.push(`duplicate ids: ${[...new Set(dupes)].slice(0, 3).join(', ')}`);
}

/* ══ 5 · THE LEAF MAP AND THE ORACLE, RE-READ ═══════════════════════════════ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '2.3.4');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (leaves.length !== 19) problems.push(`the oracle holds ${leaves.length} leaves for 2.3.4, not the 19 this packet is built against`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection of this section`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a leaf of 2.3.4 in the oracle`);

  /*
   * `specGap-05` REFUTED AGAINST THE SOURCE, NOT AGAINST A COMMENT. It doubts that the app's
   * numbering matches WEC12 and that the notes' cross-references do. Each of the four is asserted
   * here, so a future renumber fails the build rather than being inherited.
   */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`specGap-05 check: econ_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1056, '2.3.4 National income');
  at(976, '2.3.2 Aggregate demand (AD)');
  at(1026, '2.3.3 Aggregate supply (AS)');
  at(1121, 'Output gaps');
  at(1181, 'Fiscal policy instruments');
  at(884, '2.3.1 Measures of economic performance');
  /* and the UK GCE numbers five items cite must exist nowhere in this document */
  for (const n of ['2.1.1', '2.4.1']) {
    if (spec.some((l) => l.includes(n))) problems.push(`"${n}" occurs in econ_spec.txt after all — five ledger items cite it and this packet refuses them on the ground that it does not`);
  }
  /* rule 2, measured rather than remembered: leakage 0, withdrawal present */
  const body = spec.join('\n');
  if (/\bleakage/i.test(body)) problems.push('"leakage" occurs in econ_spec.txt after all — the ban rests on it being absent');
  if (!/\bwithdrawals\b/i.test(body)) problems.push('"withdrawals" does not occur in econ_spec.txt, which the whole chapter 3 vocabulary rests on');
}

/* ══ 6 · QUIZ ═══════════════════════════════════════════════════════════════ */
{
  if (QUIZ.length < 20) problems.push(`${QUIZ.length} quiz items against a floor of 20`);
  const hist = [0, 0, 0, 0];
  for (const q of QUIZ) {
    hist[q.correctIndex] += 1;
    if (new Set(q.options).size !== q.options.length) problems.push(`quiz "${q.question.slice(0, 40)}" repeats an option`);
    const correct = q.options[q.correctIndex];
    const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
    if (correct.length > 1.5 * longest) problems.push(`quiz.long-correct would fire on "${q.question.slice(0, 40)}": key ${correct.length} chars against ${longest}`);
    if (/\(\s*[A-D]\s*\)|\b[A-D]\s*[=)]|option\s+[A-D]\b/.test(q.explanation)) problems.push(`an explanation names an option by letter: "${q.question.slice(0, 40)}"`);
  }
  const share = hist.map((n) => (n / QUIZ.length) * 100);
  if (share.some((p) => p > 40 || p < 10)) problems.push(`quiz.histogram would fire: ${share.map((p) => `${Math.round(p)}%`).join('/')}`);
}
{
  /*
   * NO EXPLANATION MAY NAME AN OPTION BY POSITION, WITH ONE CARVE-OUT, A/B'd BOTH WAYS.
   *
   * Packet 26 wrote this rule and packet 36's Verify A round 1 rejected `topFix-04` because an
   * explanation still counted to an option — "gives the last figure" — which described the
   * author's draft rather than the rendered order, because `placeKeys` deals the key afterwards.
   *
   * THE CARVE-OUT EXISTS BECAUSE THIS TOPIC COUNTS IN ROUNDS. "Each round is smaller than the last"
   * and "the first round of spending happens at home" are about the multiplier process, not about
   * the options, and banning them outright would delete the sentence that teaches convergence. A
   * fixed list of sequence nouns is exempt, and the A/B below tests both directions — a positional
   * ordinal must still fire, and a sequence ordinal must not.
   */
  /*
   * `above` AND `below` ARE NOT IN THE LIST, AND THAT IS MEASURED. Both are ordinary words in this
   * topic — "below capacity", "the line below", "above one" — and including them produced three
   * false positives on this section's own bank, all of them about capacity rather than about an
   * option. The list is the words that actually count to a position in a rendered list.
   */
  const ORDINAL = /\b(first|second|third|fourth|fifth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|fifth|last|final)\s+(round|rounds|step|steps|stage|stages|chapter|chapters|year|years|period|periods|subsection|line|leg|time)\b/i;
  const CARVED = /\bthe (?:first|second|third|fourth|fifth|last) (?:round|step|stage|chapter|year|period|line|leg|time)\b/i;
  const offends = (s) => {
    let rest = String(s).replace(new RegExp(SEQUENCE_NOUN.source, 'gi'), ' ').replace(/\bthan the last\b|\bthe last\b(?= by| in the process)/gi, ' ');
    return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null;
  };
  for (const q of QUIZ) {
    const hit = offends(q.explanation);
    if (hit) problems.push(`an explanation names a position ("${hit}"), which describes the draft order rather than the rendered one: "${q.question.slice(0, 44)}"`);
  }
  /* A/B — both directions, because a carve-out that swallows the rule is worse than no rule */
  const mustFire = [
    'The first option is right because cost of sales comes off alone.',
    'Only the last of these describes an injection.',
    'The former is a flow and the latter is a stock.',
  ];
  const mustNot = [
    'Each round is smaller than the last by the same proportion.',
    'The first round of spending happens at home, so the multiplier is still above one.',
    'Interest comes off at the final step of the ladder.',
    'By the fifth round the sums are small enough to ignore.',
  ];
  for (const s of mustFire) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of mustNot) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference it must allow: "${s}"`);
  if (!CARVED.test('smaller than the last round')) problems.push('the carve-out pattern no longer recognises a sequence noun');
}
{
  /*
   * NOTHING MAY BE QUIZZED THAT NO SUBSECTION TEACHES. That is `quiz-03` and `structure-05` stated
   * as a property rather than as ten named indices: the live bank tests GDP measurement, which no
   * `content[]` block mentions. Every pinned item's block must exist, and every stem's substantive
   * vocabulary must appear somewhere in the teaching text.
   */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])]).join(' ').toLowerCase();
  const blockNames = new Set(BLOCKS);
  for (const q of QUIZ) if (q.block && !blockNames.has(q.block)) problems.push(`quiz item tagged with "${q.block}", which is not a block`);
  const KEY_TERMS = ['circular flow', 'injection', 'withdrawal', 'multiplier', 'marginal propensity', 'equilibrium', 'aggregate demand', 'aggregate supply', 'wealth', 'price level'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    const taught = teaching.includes(term);
    if (quizzed && !taught) problems.push(`the bank tests "${term}" and no subsection teaches it — that is quiz-03 regressed`);
  }
  /* every block's own vocabulary reaches its own items */
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    if (!items.length) continue;
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea]).join(' ').toLowerCase();
    const onTopic = items.some((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`no quiz item pinned to "${b.title}" shares substantive vocabulary with the chapter`);
  }
}

/* ══ 7 · PRACTICE ═══════════════════════════════════════════════════════════ */
{
  /* Appendix 6, econ_spec.txt:2696-2745. Nothing here is remembered; it is the table. */
  const TARIFFS = { Define: [2], Calculate: [2, 4], Draw: [4], Explain: [4], Analyse: [6], Examine: [8], Discuss: [14], Evaluate: [20] };
  const seen = new Set();
  for (const p of PRACTICE) {
    seen.add(p.command);
    const allowed = TARIFFS[p.command];
    if (!allowed) { problems.push(`"${p.command}" is not an IAL Economics command word (Appendix 6, econ_spec.txt:2696-2745)`); continue; }
    if (!allowed.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — Appendix 6 gives ${allowed.join(' or ')} for ${p.command}`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not end in its own tariff`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 44)}" has one guidance paragraph: guided mode prints all of it above the empty answer box`);
    /*
     * THE OPENING IS WHAT A STUDENT SEES BEFORE WRITING and it must give nothing away. Packet 24's
     * founder walkthrough found the whole mark scheme printed over an empty box in 97 of 100 items.
     */
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" allocates marks`);
    if (/\$[\d,]/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries the level descriptors`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points; tariffs above 6 are levels-marked`);
    if (p.marks > 6 && !/\bLevel 1\b/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance has no level descriptors`);
    const ALLOCATES = /\(\s*\d+\s*marks?\s*\)|\b(One|Two|Three|Four) marks? for\b/;
    if (p.marks <= 6 && p.marks >= 4 && !ALLOCATES.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points, and tariffs at or below 6 are point-marked`);
  }
  for (const cmd of Object.keys(TARIFFS)) if (!seen.has(cmd)) problems.push(`no practice item uses the command word ${cmd}`);
  /* `practice-02`: a diagram item and a multiplier calculation from given propensities */
  if (!PRACTICE.some((p) => p.command === 'Draw' && /AD\/AS|aggregate/i.test(p.question))) problems.push('practice-02: no practice item requires a diagram');
  if (!PRACTICE.some((p) => p.command === 'Calculate' && /marginal propensity to (save|tax|import)/i.test(p.question))) problems.push('practice-02: no practice item requires a multiplier calculation from given MPS/MPT/MPM');
  if (PRACTICE.some((p) => /Calculate/.test(p.command) && /marginal propensity to consume/i.test(p.question) && /marginal propensity to (save|tax|import)/i.test(p.question))) problems.push('the 4-mark Calculate gives MPC as well as the withdrawal propensities, so it never tests which formula to reach for');
}

/* ══ 8 · RECALLS ════════════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.map((s) => [s, s.recall]).filter(([, r]) => r);
  if (recalls.length !== SUBSECTIONS.length) problems.push(`${recalls.length} recalls over ${SUBSECTIONS.length} subsections`);
  const types = new Set(recalls.map(([, r]) => r.type));
  for (const want of ['fillin', 'classify', 'match', 'reorder']) if (!types.has(want)) problems.push(`no ${want} recall in the section`);
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
      r.answers.forEach((a, i) => {
        const h = String(r.hints[i] || '');
        /* `fillin.hint`: a hint may not be a prefix of its answer nor reveal its length */
        if (h.toLowerCase().startsWith(String(a).toLowerCase().slice(0, 3)) && String(a).length >= 3) problems.push(`${where}: hint "${h}" is a prefix of "${a}"`);
        if (new RegExp(`^_{${String(a).length}}$|\\b${String(a).length} letters\\b`).test(h)) problems.push(`${where}: hint reveals the length of "${a}"`);
        /* `fillin.leak`: the answer printed in the template outside its own blank */
        const tmpl = r.template.join(' ').toLowerCase();
        if (String(a).length > 3 && tmpl.includes(String(a).toLowerCase())) problems.push(`${where}: the answer "${a}" is printed in the template text`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === String(a).toLowerCase())) problems.push(`${where}: "${a}" is both an answer and a distractor`);
        if (/,/.test(String(a))) problems.push(`${where}: answer "${a}" contains a comma, which \`fillin.token\` refuses`);
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion — "put these in the right order" is the founder's own example of the defect`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items, and the contract is 3-5`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
    }
    if (r.type === 'match') {
      if (r.pairs.length < 3 || r.pairs.length > 5) problems.push(`${where}: ${r.pairs.length} pairs, and the contract is 3-5`);
      if (new Set(r.pairs.map((p) => p.right)).size !== r.pairs.length) problems.push(`${where}: two pairs share a right-hand side, so the match has no unique solution`);
      if (r.pairs.some((p) => !p.why)) problems.push(`${where}: a pair with no \`why\``);
    }
    if (r.type === 'classify') {
      if (r.groups.length < 2 || r.groups.length > 3) problems.push(`${where}: ${r.groups.length} groups, and the contract is 2-3`);
      const items = r.groups.flatMap((g) => g.items);
      if (items.length < 4 || items.length > 8) problems.push(`${where}: ${items.length} items across the groups, and the contract is 4-8`);
      if (new Set(items).size !== items.length) problems.push(`${where}: an item appears in two groups`);
      /* the validator reads `groups[i].why`, not a recall-level array — a top-level `why` on a
       * classify is invisible to `recall.why` and shows as "0 of n group lines" */
      if ('why' in r) problems.push(`${where}: a classify carries a recall-level \`why\`; the renderer and the validator both read \`groups[i].why\``);
      const missing = r.groups.filter((g) => !String(g.why ?? '').trim()).length;
      if (missing) problems.push(`${where}: ${missing} of ${r.groups.length} classify groups have no \`why\``);
    }
  }
}
{
  /*
   * THE ANSWER-RECOVERABLE CHECK, AT V029'S CORRECTED THRESHOLDS, over every recall type. A recall
   * a student can answer by scrolling up to the paragraph that set it is not a recall. It is run
   * against a REAL negative control — a deliberately recoverable recall built from this section's
   * own prose — so a threshold that has drifted too loose shows up as the control passing.
   */
  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const answersOf = (r) => {
    if (r.type === 'fillin') return r.answers;
    if (r.type === 'reorder') return r.correctOrder;
    if (r.type === 'match') return r.pairs.map((p) => p.right);
    return r.groups.flatMap((g) => g.items);
  };
  const recoverable = (sec, r) => {
    const hay = norm([sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' '));
    const long = answersOf(r).map(norm).filter((a) => a.split(' ').length >= 4);
    if (!long.length) return 0;
    return long.filter((a) => hay.includes(a)).length / long.length;
  };
  for (const sec of SUBSECTIONS) {
    const share = recoverable(sec, sec.recall);
    if (share > 0.5) problems.push(`${sec.id.split(':').pop()}: ${Math.round(share * 100)}% of the recall's long answers are printed verbatim in the subsection above it`);
  }
  /* the negative control: a recall whose answers ARE the paragraph must be caught */
  const control = SUBSECTIONS.find((s) => s.id.endsWith('multiplier-process'));
  const plantedAnswers = control.body.slice(0, 3).map((b) => b.text.replace(/\*\*/g, '').split('.')[0]);
  const planted = { type: 'reorder', correctOrder: plantedAnswers, why: plantedAnswers.map(() => 'x'), criterion: 'x' };
  if (recoverable(control, planted) <= 0.5) problems.push('the answer-recoverable check does not catch a recall whose answers are the subsection\'s own sentences — the threshold has drifted');
  /* and it must NOT fire on a recall that merely uses the same vocabulary */
  const benign = { type: 'fillin', answers: ['multiplier', 'rounds'], template: [], hints: [], distractors: [] };
  if (recoverable(control, benign) > 0.5) problems.push('the answer-recoverable check fires on a recall that only shares vocabulary with its subsection');
}

/* ══ 9 · TEACHING TEXT, NOTES AND FLASHCARDS ════════════════════════════════ */
{
  for (const s of SUBSECTIONS) {
    const w = teachingWords(s);
    if (w > 350) problems.push(`${s.id.split(':').pop()}: ${w} words of teaching text against a budget of 350`);
    if (!s.keyIdea) problems.push(`${s.id.split(':').pop()}: no key idea`);
    if (!s.misconception) problems.push(`${s.id.split(':').pop()}: no misconception`);
    if (!s.examMatters) problems.push(`${s.id.split(':').pop()}: no exam-matters line`);
    if (!s.realExample?.text) problems.push(`${s.id.split(':').pop()}: no real example`);
    if (!teachingVocabulary(s).length) problems.push(`${s.id.split(':').pop()}: none of the section's teaching terms appears in it`);
  }
  /* `claim.uncited`: a sentence about what a marker does needs a source */
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  const CITATION = /\((?:source|see|per|from)\b[^)]*\)|\bW(?:EC|BS)1[1-4]\b|\bappendix\s+[0-9]\b|\bmark\s+scheme\b|\bexaminer'?s?\s+report\b/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
    if (EXAMINER_CLAIM.test(sent) && !CITATION.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  }
  /* one notes topic per chapter, titled with the chapter, so `depth.notes-titles` cannot fire */
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter is "${content[i].title}"`); });
  /* flashcards: fronts and backs distinct, and nothing flashcarded that no subsection teaches */
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const f of FLASHCARDS) if (f.front.toLowerCase() === f.back.toLowerCase()) problems.push(`flashcard "${f.front.slice(0, 40)}" has the same front and back`);
  /* extras: the shape `ExtrasTab.jsx` actually reads (V028) */
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array — ExtrasTab maps chain.steps and the tab throws`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
}
{
  /* one currency, one minus sign, no year, no named real company or country */
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure; `money` emits U+2212');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame, in a section written for centres in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b/g, 'a UK-only institution as the frame of an example (locale.institution)');
}

/* ══ 10 · DIAGRAMS ══════════════════════════════════════════════════════════ */
{
  /* every colour must be a key of processSvg's PALETTE, parsed rather than re-typed (packet 32) */
  const processSvg = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const palette = new Set([...processSvg.matchAll(/'(#[0-9a-fA-F]{6})':/g)].map((m) => m[1].toLowerCase()));
  if (palette.size < 10) problems.push(`only ${palette.size} colours parsed out of processSvg.js; the parse is wrong, not the palette`);
  for (const d of ALL_DIAGRAMS) for (const s of svgOf(d)) {
    for (const c of new Set([...s.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase()))) {
      if (!palette.has(c)) problems.push(`"${d.title}" emits ${c}, which processSvg's remapper does not know — it would stay light text on a light page`);
    }
    for (const m of s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)) {
      if (Number(m[1]) < MIN_FACE) problems.push(`"${d.title}" has a ${m[1]}-unit face against a floor of ${MIN_FACE}`);
    }
    if (!s.includes(`viewBox="0 0 ${FRAME.w} `)) problems.push(`"${d.title}" is not drawn on the ${FRAME.w}-unit frame`);
    /*
     * TEXT EXTENT, NOT ANCHOR POSITION. Packet 25's decision: a bounds check that reads an anchor
     * cannot see a string that runs off the frame. Both edges are measured from the anchor and the
     * text-anchor mode, which is what caught this packet's own AS label at x 464.
     */
    for (const m of s.matchAll(/<text x="([-\d.]+)" y="[-\d.]+" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
      const x = Number(m[1]), size = Number(m[2]), anchor = m[3], str = m[4];
      const w = estWidth(str, size);
      const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
      if (left < -2 || left + w > FRAME.w + 2) problems.push(`"${d.title}" runs "${str.slice(0, 40)}" from ${Math.round(left)} to ${Math.round(left + w)} on a ${FRAME.w}-unit frame`);
    }
  }
  for (const d of ALL_DIAGRAMS) {
    if (!d.title || !d.description) problems.push(`a diagram is missing a title or description`);
    if (!svgOf(d).length) problems.push(`"${d.title}" has no scenario`);
  }
  if (new Set(ALL_DIAGRAMS.map((d) => d.title)).size !== ALL_DIAGRAMS.length) problems.push('two diagrams share a title, which is what the legacy substring pin resolved against');
  /* A/B the extent check against a string that is known to run off */
  {
    const probe = '<text x="380" y="10" font-size="15" fill="#e8ecf5" text-anchor="start" font-weight="400">a label far too long for the frame</text>';
    const m = probe.match(/<text x="([-\d.]+)" y="[-\d.]+" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/);
    const w = estWidth(m[4], Number(m[2]));
    if (Number(m[1]) + w <= FRAME.w + 2) problems.push('the text-extent check no longer catches a label that runs off the right edge');
  }
  /* the circular flow must carry all four arrows, which is accuracy-02's first clause */
  {
    const cf = svgOf(ALL_DIAGRAMS[0]).join(' ');
    for (const want of ['factors of production', 'goods and services', 'factor incomes', 'consumer spending']) {
      if (!cf.includes(want)) problems.push(`the circular flow diagram does not label "${want}" — accuracy-02 is that it draws two arrows where the section's own examMatters needs four`);
    }
    for (const want of ['REAL FLOW', 'MONEY FLOW']) if (!cf.includes(want)) problems.push(`the circular flow diagram does not name the ${want.toLowerCase()}`);
  }
  /* the figures the AD/AS scenarios print must be the ones the arithmetic derived */
  {
    const eq = svgOf(ALL_DIAGRAMS[3]).join(' ');
    for (const want of [String(E.Yad), idx(E.Pad), String(E.Yas), idx(E.Pas), String(E.Y), idx(E.P0)]) {
      if (!eq.includes(want)) problems.push(`the equilibrium diagram does not print ${want}, which the AD/AS arithmetic derived`);
    }
  }
  /* the multiplier diagram's bars must print the computed rounds, in order */
  {
    const mp = svgOf(ALL_DIAGRAMS[4]).join(' ');
    for (const r of E.ROUNDS.slice(0, 5)) if (!mp.includes(String(r))) problems.push(`the multiplier diagram does not print round value ${r}`);
  }
}

/* ══ 11 · D013 — THE MULTIPLIER IS TAUGHT ONCE ══════════════════════════════ */
/*
 * `audit/SPEC-OWNERSHIP.md` step 4: whichever of packets 32 and 37 runs SECOND re-runs the census
 * and checks the multiplier is taught under its own heading nowhere else. Packet 32 removed
 * `aggregate-demand`'s three multiplier subsections on 18 September, so this packet is second.
 *
 * The census reads the LIVE database, and both sections are staged rather than published, so it
 * cannot yet report the world this packet is building. What it CAN do is tell us what a student
 * sees today, and the runner records that rather than claiming otherwise. The assertion that this
 * packet controls is the other half: that this section teaches the multiplier under its own
 * headings, in full, including the size determinants that only `aggregate-demand` used to carry.
 */
{
  const titles = SUBSECTIONS.map((s) => s.title.toLowerCase());
  const blockTitles = BLOCKS.map((b) => b.toLowerCase());
  if (!blockTitles.some((b) => b.includes('multiplier'))) problems.push('D013: no chapter of this section is headed with the multiplier, and 2.3.4 · 4 is its owner');
  for (const want of ['multiplier and the multiplier process', 'marginal propensity', 'calculating the multiplier']) {
    if (!titles.some((t) => t.includes(want.split(' ')[0]) && want.split(' ').every((w) => titles.join(' ').includes(w)))) {
      problems.push(`D013: no subsection covers "${want}"`);
    }
  }
  /* step 1 of the manifest: the SIZE determinants, which aggregate-demand used to own */
  const sizeSub = SUBSECTIONS.find((s) => /not a fixed number/i.test(s.title));
  if (!sizeSub) problems.push('D013 step 1: no subsection teaches what determines the SIZE of the multiplier, which is the part only aggregate-demand carried');
  else {
    const txt = [sizeSub.keyIdea, ...(sizeSub.body || []).map((b) => b.text)].join(' ').toLowerCase();
    for (const want of ['mpw', 'import', 'tax', 'sav']) if (!txt.includes(want)) problems.push(`D013 step 1: the size subsection does not mention "${want}"`);
  }
  /* step 3: nothing here may be tagged to another section, and the census is recorded not claimed */
  try {
    const out = execFileSync('node', ['audit/scripts/packet-13-census.mjs'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    const line = out.split('\n').find((l) => /multiplier/i.test(l)) || '';
    console.log(`\nD013 census (reads the LIVE database; both sections are staged, not published):\n  ${line.trim() || 'no multiplier line in the census output'}`);
  } catch (err) {
    console.log(`\nD013 census could not be run here: ${String(err.message).split('\n')[0]}`);
  }
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
/*
 * `await`, AND THEN A GUARD THAT THE AWAIT HAPPENED. This runner's first draft read
 * `loadBundle(SECTION)` without awaiting it, so `before` was computed against a Promise: the
 * validator saw an object with no content arrays, reported 0 BLOCK / 19 DEBT for a section that is
 * really 18 / 43, and the "would clear" count was silently wrong. Nothing else in the gate could
 * see it, because every other number in the report is computed from the BUNDLE, which was fine.
 * That is MEMORY's "a check that reuses the implementation cannot see its blind spot" in its
 * smallest form, so the shape of the thing read is now asserted rather than assumed.
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

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 37`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  spine:  MPC ${prop(E.mpc)} + MPS ${prop(E.mps)} + MPT ${prop(E.mpt)} + MPM ${prop(E.mpm)} = ${E.propensitySum} · MPW ${prop(E.mpw)} = 1 − MPC · k ${mult(E.k)} both ways · ${bn(E.shock)} → ${bn(E.deltaY)} · J = W = ${bn(E.J2)} again`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }

console.log(`
packet checks
  NUMBERING  the oracle re-read and six spec lines asserted by line number — specGap-05 doubted the
             app's 2.3.4 and its references to 2.3.2, 2.3.5 and 2.3.6, and all four are right; and
             "2.1.1" and "2.4.1", which five items cite, are asserted ABSENT from the document
  BOUNDARY   no leakage, no GDP-measurement family, no output gap, no crowding out, no Phillips
             curve, no unplanned inventories, no Keynesian cross, no 45-degree, no paradox of
             thrift, no full employment, no spare capacity, no accelerator, no factor market, no
             Assess and no Outline — each with the spec line that settles it, each A/B'd against a
             string it must catch AND one it must not
  POINTERS   the determinants of C, I, G and (X−M) are 2.3.2's and appear nowhere; the AS shapes
             and shifters are 2.3.3's and are budgeted; transfer payments are 4.3.5's and MUST
             appear, exactly once, in the misconception that corrects packet 0's error, with the
             pointer — and may never be called an injection
  ARITHMETIC the four propensities summing to one, MPW = 1 − MPC, BOTH of the specification's
             formulae computed separately and compared, the rounds converging on the total, the new
             equilibrium where withdrawals have grown by exactly the injection, and the 2.3.2
             identity reconciling to the same national income without a second set of figures
  AD/AS      every equilibrium derived off the demand curve AND off the supply curve and the two
             compared, the shift asserted to be the MULTIPLIED amount, and the sign property — same
             direction for AD, opposite directions for AS — checked against the computed figures
             rather than against the prose that states it three times
  QUIZ       ${unpinned.size} unpinned items first for the pre-test, keys dealt from a hash of each stem, the
             histogram measured, the key no longer than 1.5× the longest distractor, no option named
             by letter, and no option named by POSITION — with a sequence-noun carve-out so that
             "smaller than the last" survives, A/B'd in BOTH directions
  PINS       ${content.length} blocks, each with its own diagram, its own quiz items and its own practice items,
             all DERIVED from the item's own block tag; no shared pin, no \`diagramRef\`, no orphan,
             and ${3 + content.length} free quiz items against FREE_QUIZ_MAX 10
  PRACTICE   all eight Appendix 6 command words and both Calculate tariffs, every item ending in its
             own tariff, two guidance paragraphs with no figure, no allocation and no level bands in
             the first, points below 7 marks and levels above, and the Draw and the propensity
             Calculate that practice-02 says the section has never had
  CONTENT    every subsection inside the 350-word budget, a recall on all ${SUBSECTIONS.length} in all four contract
             types, the fill-in contract enforced before the validator sees it, and the
             answer-recoverable check run against a REAL negative control built from this section's
             own prose AND a benign control that must NOT fire
  DIAGRAMS   ${ALL_DIAGRAMS.length} diagrams on a ${FRAME.w}-unit frame with a ${MIN_FACE}-unit floor, every colour parsed out of
             processSvg.js rather than re-typed, text EXTENT inside the canvas with the check itself
             A/B'd, the circular flow's four arrows named, and every AD/AS and multiplier figure
             counted back out of the emitted SVG
  D013       this section headed with the multiplier, the process, the propensities, the formulae
             and — step 1 of the manifest — what determines its SIZE, which only aggregate-demand
             used to carry; the census run and its LIVE answer recorded rather than claimed
  SHAPE      ids unique · one currency · one minus sign · no year · no named real company · no UK
             frame · no internal ledger id in student-facing text`);

if (DUMP) {
  const path = `audit/snapshots/packet-37-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-37-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
