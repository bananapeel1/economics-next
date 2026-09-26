#!/usr/bin/env node
/**
 * PACKET 45 — labour-markets, Economics Unit 3 (WEC13), IAL topic 3.3.4.
 * `audit/raw/econ_spec.txt:1447-1479`. FIVE blocks, twenty-one subsections, 17 substantive leaves.
 *
 *   node scripts/packet-45-labour-markets.mjs            # dry run, every check
 *   node scripts/packet-45-labour-markets.mjs --dump     # + write the bundle
 *   node scripts/packet-45-labour-markets.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. It is packet 44's runner with this section's checks.
 * What this packet adds, with the reason:
 *
 *   - **THE SECTION IS ITS SPECIFICATION NUMBER.** Monopsony (3.3.3 · 7), the minimum wage and
 *     measures against immobility (3.3.5 · 2b) are POINTED AT within a budget, each pointer carrying
 *     its topic number; the monopsony construction's vocabulary is banned outright. The headings are
 *     asserted by line, and the numbers two ledger items cite ("3.4.1-3.4.3") asserted ABSENT.
 *   - **THE VOCABULARY BANS REST ON MEASURED ABSENCES.** "Backward-bending", the income and
 *     substitution effects, "leisure", "bilateral monopoly", "wage differential" and "marginal revenue
 *     product" are each re-counted in the document; a ban fails the build if its word turns up.
 *   - **EVERY EQUILIBRIUM IS SOLVED OFF BOTH CURVES** (packet 34's two-sources rule), and the firm's
 *     hiring decision is re-derived from the schedule, so a figure typed rather than derived fails.
 *   - **THE PRACTICE SET IS THE WEC13 PAPER'S SHAPE**, read out of `audit/raw/ial-paper-structure.json`
 *     (Section B's tariffs and their command words, Section C's essay), and Appendix 6 is PARSED out of
 *     the specification rather than imported, so the runner cannot agree with the validator by
 *     construction.
 *   - **A CHECK-IN KEY MAY NOT BE PRINTED ON ITS OWN BLOCK'S DIAGRAM** — packet 44's live leak class
 *     (`revvylearn_printed_answer_leak`), checked here before staging rather than after publishing.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, LAB, money, k, pct, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary, DEMAND_FACTORS, SUPPLY_FACTORS,
} from './_packet45-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
} from './_packet45-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet45-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD } from './_packet45-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const L = LAB;

const problems = [];
let practiceServed = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const sub = (slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`));

/* ── pins, derived from each item's own block tag (packet 30) ──────────────── */
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
/* SVG text is student-facing text, joined one unit per SVG (packet 29). */
const svgTextOf = (svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' ');
const svgText = svgs.map(svgTextOf);
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
  for (const bad of ['a wage of $undefined an hour', 'employment of NaN', 'the firm [object Object] hires', 'hires ' + '${L.firmL}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['a Nash equilibrium is not this model', 'the object of the exercise is the wage', 'a wage of $12 an hour']) {
    if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);
  }
}

/* ══ 2 · THE BANNED VOCABULARY AND THE POINTER BUDGETS ══════════════════════ */
/* No `g` flag when testing: `test` on a /g regex advances lastIndex (packet 29). */
for (const [re, why] of BANNED_ELSEWHERE) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  /* A/B, because a ban that has never fired is not known to work (packet 21) */
  const fires = (i, str) => { const [re] = BANNED_ELSEWHERE[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'at high wages the supply curve is backward-bending', 'the demand curve bends at capacity'],
    [0, 'workers choose more leisure', 'a pleasure to work with'],
    [0, 'the income effect dominates', 'income tax rates rise'],
    [1, 'the firm hires where MCL = MRP', 'the firm hires where the wage meets MRP'],
    [1, 'workers are exploited by the employer', 'firms explore new markets'],
    [2, 'a bilateral monopoly sets the wage', 'a monopoly seller of shirts'],
    [3, 'a maximum wage for bankers', 'the wage is at its maximum when demand peaks'],
    [4, 'discrimination lowers some workers\' pay', 'firms distinguish skilled from unskilled work'],
    [5, 'wage differentials between jobs', 'wages differ between occupations'],
    [5, 'investment in human capital', 'investment in new capital'],
    [6, 'Assess the importance of unions. (10 marks)', 'a brief assessment of the arguments'],
    [6, 'Outline two ways unions affect pay.', 'the outline of the diagram'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bAnalyse\b(?![a-z]).{0,24}\(\s*(?!6\b)\d+\s*marks?\s*\)/g, 'an Analyse at a tariff other than 6 (Appendix 6)');
ban(/\b(10|12|16|18)[- ]mark\b/g, 'a tariff IAL Economics does not have — Appendix 6 gives 2, 4, 6, 8, 14 and 20 only');
ban(/\bVRIO\b|\bcore competenc|\bbalanced scorecard\b|\bSWOT\b/g, 'IAL Business vocabulary in an Economics section');
ban(/\bF0\d\d\b|\bC-labour-markets-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/not because markets are failing/gi, 'accuracy-01 regressed: the live key idea\'s "not because markets are failing" is back');
/*
 * THE POINTER RULE. Each neighbour has a budget, and every mention must name the topic number it
 * belongs to, so a pointer can never read as teaching.
 */
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  /* A/B the pointer rule: an uncited mention must be caught, a cited one must pass */
  const [mono, minw] = POINTER_ONLY;
  if (!mono.mustCite.test('a case topic 3.3.3 covers as monopsony')) problems.push('the pointer-cite check rejects a correctly cited monopsony pointer');
  if (mono.mustCite.test('a monopsony pays below the competitive wage')) problems.push('the pointer-cite check accepts an uncited monopsony mention');
  if (!minw.re.test('a legal minimum wage') || minw.mustCite.test('a minimum wage cuts jobs')) problems.push('the minimum-wage pointer rule does not see an uncited mention');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* every equilibrium off BOTH curves, independently of solve() */
  const cross = (dA, dB, sA, sB) => { const W = (dA - sA) / (dB + sB); return { W, Ld: dA - dB * W, Ls: sA + sB * W }; };
  for (const [name, dShift, sShift, got] of [
    ['base', 0, 0, L.eq], ['demand +12', L.dUp, 0, L.eqD], ['supply +12', 0, L.sUp, L.eqS],
    ['tax −6', 0, L.sTax, L.eqTax], ['licence −12', 0, L.sReg, L.eqReg], ['entry −18', 0, L.sEntry, L.eqEntry],
    ['North −12', -12, 0, L.north], ['South +12', 12, 0, L.south],
  ]) {
    const c = cross(L.dA + dShift, L.dB, L.sA + sShift, L.sB);
    a(near(c.Ld, c.Ls), `${name}: demand and supply disagree at the solved wage`);
    a(near(c.W, got.W, 1e-6) && near(c.Ld, got.L, 1e-6), `${name}: the module says $${got.W}, ${got.L}k and the two curves say $${c.W}, ${c.Ld}k`);
  }
  a(L.eq.W === 12 && L.eq.L === 36, 'the spine is no longer $12 and 36,000 — every prose figure would need re-reading');
  /* the firm: largest L whose worker is worth at least the wage, from the schedule, not from hires() */
  const schedule = (p, base) => Array.from({ length: 10 }, (_, i) => ({ L: i + 1, v: p * (base - (i + 1)) }));
  const hireFrom = (W, p, base) => schedule(p, base).filter((x) => x.v >= W).length;
  a(hireFrom(L.eq.W, L.price, L.mpp0) === L.firmL && L.firmL === 6, `the firm hires ${L.firmL} at $12; the schedule says ${hireFrom(12, 3, 10)}`);
  a(hireFrom(L.W2, L.price, L.mpp0) === L.firmLW2, 'the firm at $15 is not read off the schedule');
  a(hireFrom(L.eq.W, L.price2, L.mpp0) === L.firmLPrice, 'the firm at a $4 shirt is not read off the schedule');
  a(hireFrom(L.eq.W, L.price, L.mppTrained) === L.firmLTrained, 'the trained firm is not read off the schedule');
  a(L.value(L.firmL) === L.eq.W && L.firmNext < L.eq.W, 'the marginal machinist is not worth exactly the wage, or the next is not worth less');
  /* the firm is a wage-taker in the market it sits in: its wage is the market's */
  a(L.firmL < L.eq.L * 1000 / 100, 'the firm is not small relative to the market it takes the wage from');
  /* capital */
  a(L.machineDoes * L.eq.W > L.machineCost && L.machineDoes * L.lowW < L.machineCost, 'the cutter is not cheaper at $12 and dearer at $9');
  a(L.breakEvenW * L.machineDoes === L.machineCost, 'the break-even wage is not a third of the cutter\'s cost');
  /* elasticity of demand for labour, recomputed */
  a(near(round2(((30 - 36) / 36 * 100) / 25), L.edl, 0.006) && L.edl > -1 && L.edl < 0, `the elasticity ${L.edl} is not −16.7% ÷ 25%, or is not inelastic`);
  /* elasticity of supply: same demand shift, inelastic curve through the same point */
  a(L.inel.start.W === L.eq.W && L.inel.start.L === L.eq.L, 'the inelastic supply curve does not start at the same point');
  a(L.inel.after.W > L.eqD.W && L.inel.after.L < L.eqD.L, 'with inelastic supply the wage does not rise more and employment less');
  /* the union: the two routes land on the same point, and the surplus is willing minus hired */
  a(L.unionJobs === L.demand(L.unionW) && L.unionWilling === L.supply(L.unionW), 'the union figures are not read off the curves');
  a(L.unionExcess === 18 && L.unionLost === 6, 'the union surplus is not 18,000, or the lost jobs 6,000');
  a(L.eqEntry.W === L.unionW && L.eqEntry.L === L.unionJobs, 'restricting entry does not reach the same wage and employment as the negotiated floor');
  /* nurses */
  const N = L.nurse;
  a(near(N.dA3 - N.dB3 * N.W, N.sA3 + N.sB3 * N.W) && N.W === 24 && N.L === 26, 'the nurses\' market does not clear at $24, 26,000');
  a(N.wanted === 29 && N.willing === 20 && N.vacancies === 9, 'the nurses\' vacancies are not 29 − 20 = 9 thousand');
  /* regions: symmetric shock, symmetric gaps */
  a(L.northJobless === 12 && L.southVacant === 12 && L.regionalGap === 4, 'the regional figures are not 12,000 jobless, 12,000 vacancies and a $4 gap');
  /* the practice and quiz arithmetic the content prints, recomputed independently of the module */
  a(6 * 5 === 30 && 30 > 25, 'practice Calculate (2): 6 × $5 is not $30, or not above $25');
  a(5 * 4 === 20 && 40 / 5 === 8, 'quiz: 5 × $4 is not $20, or $40 ÷ 5 is not $8');
  a((70 + 10) / (3 + 2) === 16 && 70 - 3 * 16 === 22 && 2 * 16 - 10 === 22, 'quiz: 70 − 3W = 2W − 10 does not give $16 and 22,000');
  a(11 * 3 === 33 && 33 > 30, 'labour-or-capital recall: three at $11 is not $33, or not above the $30 cutter');
  a(70 - 3 * 0 > 0 && (28 === 60 - 2 * 16) && (52 === 4 * 16 - 12) && 52 - 28 === 24, 'union-wage recall: at $16, 28,000 wanted and 52,000 willing is not a surplus of 24,000');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 21) problems.push(`${SUBSECTIONS.length} subsections, not 21`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (!b.sections.length) problems.push(`block "${b.title}" has no subsections`);
  }
  /* every pin must resolve — structure-01 and topFix-01 made unrepresentable */
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block still carries `diagramRef`, the legacy string pin that produced structure-01');
  /* the pre-test pool: three, unpinned, and FIRST */
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items, not 3 — the pre-test asks three`);
  if ([...unpinned].some((i) => i > 2)) problems.push('an unpinned quiz item is not among the first three in the array');
  const freeNeeded = 3 + content.length;
  if (freeNeeded > 10) problems.push(`${freeNeeded} free quiz items needed against FREE_QUIZ_MAX 10`);
  const pinnedQ = new Set(Object.values(quizIndices).flat());
  QUIZ.forEach((q, i) => { if (q.block && !pinnedQ.has(i)) problems.push(`quiz item ${i} is tagged "${q.block}" and reaches no block`); });
  const pinnedP = new Set(Object.values(practiceIndices).flat());
  PRACTICE.forEach((p, i) => { if (!pinnedP.has(i)) problems.push(`practice item ${i} (${p.command}) reaches no block`); });
  const firsts = content.map((b) => b.quizIndices[0]);
  if (firsts.every((v, i) => v === i)) problems.push('quizIndices open 0,1,2,… in block order');
  /* structure-03: the union practice is pinned to the chapter that teaches unions, never before it */
  const unionPractice = PRACTICE.findIndex((p) => /trade union/i.test(p.question));
  const unionBlock = content.findIndex((b) => b.sections.some((s) => /union/i.test(s.title)));
  const pinnedAt = content.findIndex((b) => b.practiceIndices.includes(unionPractice));
  if (unionPractice < 0 || pinnedAt !== unionBlock) problems.push(`structure-03 regressed: the trade-union practice item is pinned to block ${pinnedAt}, and unions are taught in block ${unionBlock}`);
  /* structure-03, fix round 1: `includes` was the blind spot. `resolvePinnedItem` serves ONE practice item per
     chapter, the first unused index, so an item that is only a SECOND pin never reaches Learn Mode. Serve as the
     client does and assert on what is served: both extended-writing items (14 and 20) are served, and no served
     item names unions before the union chapter. */
  const usedP = new Set();
  const served = content.map((b) => { const i = b.practiceIndices.find((x) => !usedP.has(x)); if (i != null) usedP.add(i); return i; });
  for (const m of [14, 20]) {
    const i = PRACTICE.findIndex((p) => p.marks === m);
    if (i < 0 || !served.includes(i)) problems.push(`structure-03: the ${m}-mark practice item is no chapter's first pin, so Learn Mode never serves it (served: ${JSON.stringify(served)})`);
  }
  served.forEach((i, bi) => { if (i != null && bi < unionBlock && /union/i.test(PRACTICE[i].question)) problems.push(`structure-03: block ${bi} serves a union item before unions are taught`); });
  practiceServed = served;
  /* ids OWNED by an item must be unique */
  const ids = [
    ...content.map((b) => b.id), ...SUBSECTIONS.map((s) => s.id), ...SUBSECTIONS.map((s) => s.recall.id),
    ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id), ...FLASHCARDS.map((f) => f.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id),
  ];
  if (new Set(ids).size !== ids.length) problems.push(`duplicate ids: ${[...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].slice(0, 3).join(', ')}`);
  for (const s of SUBSECTIONS) if (s.recall?.id !== `${s.id}:recall`) problems.push(`${s.id}: the recall id is not minted from its own subsection`);
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE NUMBERING, RE-READ FROM THE DOCUMENT ═══ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '3.3.4');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 19 || leaves.length !== 17) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 3.3.4, not 19 / 17`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const key of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === key)) problems.push(`LEAF_MAP names ${key}, which is not a 3.3.4 leaf in the oracle`);
  /* every mapped subsection must actually say the leaf's own words (a second method: the oracle's wording) */
  const SKIP = ['changes', 'influencing', 'between', 'distinction', 'particular', 'occupation'];
  for (const leaf of leaves) {
    const words = leaf.wording.toLowerCase().replace(/[.:()]/g, '').split(/[\s/]+/).filter((w) => w.length > 4 && !SKIP.includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => sub(slug)).filter(Boolean);
    const hay = subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase()).join(' ');
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the specification's own lists, in its own words, match the util's copies */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const span = spec.slice(1446, 1479).join(' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...DEMAND_FACTORS, ...SUPPLY_FACTORS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and econ_spec.txt:1447-1479 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: econ_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1447, '3.3.4 Labour markets');
  at(1359, '3.3.3 Market structures and contestability');
  at(1432, '7 Monopsony');
  at(1475, '4 Market failure in');
  at(1485, '3.3.5 Government intervention');
  at(1526, 'Types of government intervention in labour markets');
  at(1529, 'maximum wage controls');
  at(1530, 'minimum wage controls');
  at(1535, 'measures to reduce discrimination and exploitation');
  /* the numbers specGap-05 and specGap-09 cite must exist nowhere in the document */
  for (const n of ['3.4.1', '3.4.2', '3.4.3']) if (spec.some((l) => new RegExp(`(^|\\s)${n.replace(/\./g, '\\.')}(\\s|$)`).test(l))) problems.push(`"${n}" occurs in econ_spec.txt after all — ledger items cite it and this packet refuses them on the ground that it does not`);
  /* the words the bans rest on are measured, not remembered */
  const body = spec.join('\n');
  for (const w of ['backward[- ]bending', 'income effect', 'substitution effect', 'leisure', 'bilateral monopoly', 'wage differential', 'compensating', 'marginal revenue product', 'skills shortage', 'zero-hours']) if (new RegExp(w, 'i').test(body)) problems.push(`"${w}" occurs in econ_spec.txt after all — the ban rests on it being absent`);
  /* and the word discrimination occurs in the labour context only inside 3.3.5 */
  const discrim = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /discrimination/i.test(l)).map(([n]) => n);
  if (discrim.some((n) => n >= 1447 && n <= 1479)) problems.push('"discrimination" occurs inside 3.3.4 after all — specGap-07\'s refusal rests on it not doing so');
}

/* ══ 6 · QUIZ ═══════════════════════════════════════════════════════════════ */
{
  if (QUIZ.length < 20) problems.push(`${QUIZ.length} quiz items against a floor of 20`);
  const hist = [0, 0, 0, 0];
  for (const q of QUIZ) {
    hist[q.correctIndex] += 1;
    if (q.options.length !== 4) problems.push(`quiz "${q.question.slice(0, 40)}" has ${q.options.length} options`);
    if (new Set(q.options).size !== q.options.length) problems.push(`quiz "${q.question.slice(0, 40)}" repeats an option`);
    const correct = q.options[q.correctIndex];
    const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
    if (correct.length > 1.5 * longest) problems.push(`quiz.long-correct would fire on "${q.question.slice(0, 40)}": key ${correct.length} chars against ${longest}`);
    if (/\(\s*[A-D]\s*\)|\b[A-D]\s*[=)]|option\s+[A-D]\b/.test(q.explanation)) problems.push(`an explanation names an option by letter: "${q.question.slice(0, 40)}"`);
    if (/^(Evaluate|Assess|Discuss|Examine|To what extent)\b/i.test(q.question)) problems.push(`an essay command word opens an MCQ: "${q.question.slice(0, 40)}"`);
  }
  const share = hist.map((n) => (n / QUIZ.length) * 100);
  if (share.some((p) => p > 40 || p < 10)) problems.push(`quiz.histogram would fire: ${share.map((p) => `${Math.round(p)}%`).join('/')}`);
  /* no explanation may name an option by POSITION (packets 26, 36), A/B'd both ways */
  const ORDINAL = /\b(first|second|third|fourth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'Only the last of these shifts supply.', 'The former is a movement and the latter a shift.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['The first stage of the chain is the product market.', 'Wages rise at the second step of the adjustment.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  /* near-duplicate stems, measured the way the validator words it: token Jaccard ≥ 0.5 */
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* nothing may be quizzed that no subsection teaches (quiz-01's property) */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['derived demand', 'diminishing', 'price of the product', 'productivity', 'price of capital', 'elasticity of demand for labour', 'elasticity of supply', 'welfare benefits', 'income tax', 'net migration', 'emigration', 'licence', 'equilibrium', 'wage-taker', 'surplus', 'shortage', 'apprenticeship', 'pay scale', 'living costs', 'geographical immobility', 'occupational immobility', 'market failure', 'vacancies', 'rents', 'qualifications'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    const stem = term.replace(/s$/, '');
    if (quizzed && !teaching.includes(stem)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea]).join(' ').toLowerCase();
    const onTopic = items.some((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`no quiz item pinned to "${b.title}" shares substantive vocabulary with the chapter`);
  }
  /* quiz-01: the elasticity-of-demand-for-labour item is pinned to the chapter that now teaches it */
  const eIdx = QUIZ.findIndex((q) => /demand for labour in an occupation is likely to be most elastic/i.test(q.question));
  if (eIdx < 0 || !content[0].quizIndices.includes(eIdx)) problems.push('quiz-01: the elasticity-of-demand-for-labour item is missing or not pinned to chapter 1');
  if (!/Four factors influence the elasticity of demand for labour/.test(JSON.stringify(sub('elasticity-of-demand').body))) problems.push('quiz-01 / specGap-01: the elasticity-of-demand subsection does not state its factors');
}
{
  /*
   * PRINTED-ANSWER LEAK (packet 44's live defect, `revvylearn_printed_answer_leak`): a check-in key
   * that carries a figure may not be printed on its own block's diagram surfaces — title,
   * description, scenario labels, SVG text, checklist — which the check-in shows one tap away.
   */
  const surfaces = (d) => [d.title, d.description, ...(d.checklist || []), ...(d.scenarios || []).flatMap((s) => [s.label, svgTextOf(s.svg)])].join(' \n ');
  let checked = 0;
  content.forEach((b, bi) => {
    const hay = surfaces(DIAGRAMS[bi]);
    for (const qi of b.quizIndices) {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      if (!/\d/.test(key)) continue;
      checked += 1;
      if (hay.includes(key)) problems.push(`printed-answer leak: "${q.question.slice(0, 50)}" has key "${key}" printed on "${DIAGRAMS[bi].title}"`);
      for (const n of key.match(/\d[\d,.]*/g) || []) if (new RegExp(`(^|[^\\d.,])${n.replace(/[.]/g, '\\.')}([^\\d]|$)`).test(hay) && !q.question.includes(n)) problems.push(`printed-answer leak: "${q.question.slice(0, 50)}" key figure ${n} is printed on "${DIAGRAMS[bi].title}"`);
    }
  });
  if (!checked) problems.push('the printed-answer check found no numeric check-in key to test — it would pass vacuously');
  /* A/B: a planted key that IS on the surface must fire */
  const probeHay = surfaces(DIAGRAMS[2]);
  if (!probeHay.includes(money(L.eqD.W))) problems.push('the printed-answer check cannot be A/B\'d: the equilibrium diagram no longer prints the demand-shift wage');
}

/* ══ 7 · PRACTICE ═══════════════════════════════════════════════════════════ */
{
  /*
   * APPENDIX 6, PARSED out of `econ_spec.txt:2696-2760` rather than imported (packet 40's parser,
   * unchanged). A failed parse is a FAILURE, never a silent fallback to a typed table.
   */
  const lines = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n').slice(2695, 2760);
  const TARIFFS = {};
  for (const l of lines) {
    const m = l.match(/^\s{1,3}(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate)\b[^0-9]*?(\d+)(?:\s+or\s+(\d+))?\s{2,}/);
    if (m) TARIFFS[m[1]] = [Number(m[2]), ...(m[3] ? [Number(m[3])] : [])];
  }
  const WANT = { Define: [2], Calculate: [2, 4], Draw: [4], Explain: [4], Analyse: [6], Examine: [8], Discuss: [14], Evaluate: [20] };
  for (const [cmd, marks] of Object.entries(WANT)) {
    if (JSON.stringify(TARIFFS[cmd]) !== JSON.stringify(marks)) problems.push(`Appendix 6 parse: ${cmd} reads ${JSON.stringify(TARIFFS[cmd])} in the document, not ${JSON.stringify(marks)}`);
  }
  if (Object.keys(TARIFFS).length !== 8) problems.push(`Appendix 6 parse produced ${Object.keys(TARIFFS).length} command words, not 8`);
  for (const p of PRACTICE) {
    const allowed = TARIFFS[p.command];
    if (!allowed) { problems.push(`"${p.command}" is not an IAL Economics command word`); continue; }
    if (!allowed.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — Appendix 6 gives ${allowed.join(' or ')}`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not end in its own tariff`);
    if (!new RegExp(`(^|\\.\\s+)${p.command}\\b`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not put its command word at the start of a sentence`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 44)}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\b\d+\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries the level descriptors`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
    if (p.marks > 6 && !/\bLevel 1\b/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance has no level descriptors`);
    const ALLOCATES = /\(\s*\d+\s*marks?\s*\)/;
    if (p.marks <= 6 && !ALLOCATES.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
  }
  /*
   * THE WEC13 PAPER'S SHAPE (DECISIONS, 26 Sep), read out of the SAM-derived file rather than typed:
   * every Section B tariff by one of its own command words, and a Section C essay.
   */
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).economics.units_3_4;
  if (!paper.papers.includes('WEC13')) problems.push('ial-paper-structure.json units_3_4 no longer names WEC13');
  const B = paper.sections.find((s) => s.kind === 'data_question');
  const C = paper.sections.find((s) => s.kind === 'essay');
  for (const tariff of B.tariffs) {
    const cmds = B.commandWordByTariff[String(tariff)];
    const hits = PRACTICE.filter((p) => p.marks === tariff && cmds.includes(p.command));
    if (!hits.length) problems.push(`the WEC13 data question has a ${tariff}-mark ${cmds.join('/')} part and no practice item takes that shape`);
  }
  for (const cmd of B.commandWordByTariff['2']) if (!PRACTICE.some((p) => p.marks === 2 && p.command === cmd)) problems.push(`no 2-mark ${cmd}: the paper's part (a) takes both forms`);
  if (!PRACTICE.some((p) => p.marks === C.marksEach && p.command === 'Evaluate')) problems.push(`no ${C.marksEach}-mark essay item`);
  const shapes = new Set([...B.tariffs, C.marksEach]);
  for (const p of PRACTICE) if (!shapes.has(p.marks)) problems.push(`${p.command} (${p.marks}) is not a WEC13 part tariff`);
  /* topFix-05 */
  if (PRACTICE.some((p) => p.command === 'Define' && p.marks !== 2)) problems.push('topFix-05 regressed: a Define carries a tariff other than 2');
  if (PRACTICE.some((p) => /\bOutline\b|\bAssess\b/.test(`${p.command} ${p.question}`))) problems.push('topFix-05 regressed: an Outline or Assess item survived');
  const essay = PRACTICE.find((p) => p.marks === 20);
  if (!essay || !/Level 4/.test(essay.guidance) || !/evaluation is credited in levels of its own/i.test(essay.guidance)) problems.push('topFix-05: the 20-mark guidance does not describe KAA levels with evaluation credited in its own levels');
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
    if ('shuffled' in r) problems.push(`${where}: recall carries \`shuffled\``);
    if (r.type === 'fillin') {
      const blanks = r.template.join(' ').split('___').length - 1;
      if (blanks !== r.answers.length) problems.push(`${where}: ${blanks} blanks against ${r.answers.length} answers`);
      r.template.forEach((line, li) => { if ((line.split('___').length - 1) > 1) problems.push(`${where}: template line ${li} carries two blanks`); });
      if (r.hints.length !== r.answers.length) problems.push(`${where}: ${r.hints.length} hints against ${r.answers.length} answers`);
      if (!r.distractors || r.distractors.length < 2 || r.distractors.length > 3) problems.push(`${where}: ${r.distractors?.length ?? 0} distractors, and the contract is 2-3`);
      if (new Set(r.answers.map((x) => x.toLowerCase())).size !== r.answers.length) problems.push(`${where}: a duplicated answer`);
      r.answers.forEach((ans, i) => {
        const h = String(r.hints[i] || '');
        if (String(ans).length >= 3 && h.toLowerCase().startsWith(String(ans).toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${h}" is a prefix of "${ans}"`);
        if (/[,]/.test(String(ans)) || /\s/.test(String(ans).trim()) && String(ans).split(/\s+/).length > 3) problems.push(`${where}: answer "${ans}" is a compound token`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === String(ans).toLowerCase())) problems.push(`${where}: "${ans}" is both an answer and a distractor`);
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
      if (r.correctOrder.some((x) => /^(identify|explain|state|show|draw|evaluate|analyse|define|conclude)\b/i.test(x))) problems.push(`${where}: a reorder item is an exam-procedure step`);
    }
    if (r.type === 'match') {
      if (r.pairs.length < 3 || r.pairs.length > 5) problems.push(`${where}: ${r.pairs.length} pairs`);
      if (new Set(r.pairs.map((p) => p.right)).size !== r.pairs.length) problems.push(`${where}: two pairs share a right-hand side`);
      if (r.pairs.some((p) => !p.why)) problems.push(`${where}: a pair with no \`why\``);
    }
    if (r.type === 'classify') {
      if (r.groups.length < 2 || r.groups.length > 3) problems.push(`${where}: ${r.groups.length} groups`);
      const items = r.groups.flatMap((g) => g.items);
      if (items.length < 4 || items.length > 8) problems.push(`${where}: ${items.length} items across the groups`);
      if (new Set(items).size !== items.length) problems.push(`${where}: an item appears in two groups`);
      if ('why' in r) problems.push(`${where}: a classify carries a recall-level \`why\``);
      if (r.groups.some((g) => !String(g.why ?? '').trim())) problems.push(`${where}: a classify group has no \`why\``);
    }
  }
  const reorderItems = recalls.filter(([, r]) => r.type === 'reorder').flatMap(([, r]) => r.correctOrder.map((x) => x.toLowerCase()));
  if (new Set(reorderItems).size !== reorderItems.length) problems.push('two reorders share an item');
}

/* ══ 9 · TEACHING TEXT, NOTES, FLASHCARDS, EXTRAS AND LOCALE ════════════════ */
{
  for (const s of SUBSECTIONS) {
    const w = teachingWords(s);
    const where = s.id.split(':').pop();
    if (w > 350) problems.push(`${where}: ${w} words of teaching text against a budget of 350`);
    if (!s.keyIdea) problems.push(`${where}: no key idea`);
    if (s.keyIdea.length > 180) problems.push(`${where}: keyIdea is ${s.keyIdea.length} chars (schema.lengths: 180)`);
    if (s.keyIdea.includes('**')) problems.push(`${where}: keyIdea carries bold`);
    if (!s.misconception) problems.push(`${where}: no misconception`);
    if (!s.examMatters) problems.push(`${where}: no exam-matters line`);
    if (!s.realExample?.text) problems.push(`${where}: no real example`);
    if (!teachingVocabulary(s).length) problems.push(`${where}: none of the section's teaching terms appears in it`);
    for (const b of s.body) if (b.type === 'flow' && (b.steps.length < 2 || b.steps.length > 4)) problems.push(`${where}: a flow of ${b.steps.length} steps`);
  }
  for (const b of content) b.takeaway.forEach((t) => { if (t.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${t.slice(0, 40)}"`); });
  /* claim.uncited: a sentence about what a marker does needs a source — specGap-08's "Examiners expect you to draw the MRP curve" */
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  const CITATION = /\((?:source|see|per|from)\b[^)]*\)|\bW(?:EC|BS)1[1-4]\b|\bappendix\s+[0-9]\b|\bmark\s+scheme\b|\bexaminer'?s?\s+report\b/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
    if (EXAMINER_CLAIM.test(sent) && !CITATION.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  }
  if (/\bexaminers?\b/i.test(prose.join(' '))) problems.push('specGap-08: the word "examiner" is back in student-facing text; every exam claim here cites Appendix 6 instead');
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array — ExtrasTab maps chain.steps`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
}
{
  /* one currency, one minus sign, no year, no UK frame (locale.uk, locale.institution) */
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-|(?<![\w-])-\d/g, 'a hyphen-minus used as a minus sign; `money` and the prose use U+2212');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bnational insurance\b|\bthe Chancellor\b|\bVAT\b/gi, 'a UK-only institution (locale.institution)');
}

/* ══ 10 · DIAGRAMS ══════════════════════════════════════════════════════════ */
{
  const processSvg = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const palette = new Set([...processSvg.matchAll(/'(#[0-9a-fA-F]{6})':/g)].map((m) => m[1].toLowerCase()));
  if (palette.size < 10) problems.push(`only ${palette.size} colours parsed out of processSvg.js; the parse is wrong, not the palette`);
  for (const d of ALL_DIAGRAMS) {
    for (const s of svgOf(d)) {
      for (const c of new Set([...s.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase()))) if (!palette.has(c)) problems.push(`"${d.title}" emits ${c}, which processSvg's remapper does not know`);
      for (const m of s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)) if (Number(m[1]) < MIN_FACE) problems.push(`"${d.title}" has a ${m[1]}-unit face against a floor of ${MIN_FACE}`);
      const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (!vb || Number(vb[1]) !== FRAME.w) problems.push(`"${d.title}" is not drawn on the ${FRAME.w}-unit frame`);
      for (const m of s.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
        const x = Number(m[1]), y = Number(m[2]), size = Number(m[3]), anchor = m[4], str = m[5];
        const w = estWidth(str, size);
        const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
        if (left < -2 || left + w > FRAME.w + 2) problems.push(`"${d.title}" runs "${str.slice(0, 40)}" from ${Math.round(left)} to ${Math.round(left + w)} on a ${FRAME.w}-unit frame`);
        if (y > Number(vb?.[2] ?? 0) || y - size * 0.8 < 0) problems.push(`"${d.title}": "${str.slice(0, 32)}" sits outside the canvas vertically`);
      }
    }
    if (!d.title || !d.description) problems.push('a diagram is missing a title or description');
    if (!svgOf(d).length) problems.push(`"${d.title}" has no scenario`);
    if (!(d.checklist?.length >= 3)) problems.push(`"${d.title}": fewer than three checklist items`);
  }
  if (new Set(ALL_DIAGRAMS.map((d) => d.title)).size !== ALL_DIAGRAMS.length) problems.push('two diagrams share a title');
  {
    const probe = '<text x="380" y="10" font-size="15" fill="#e8ecf5" text-anchor="start" font-weight="400">a label far too long for the frame</text>';
    const m = probe.match(/<text x="([-\d.]+)" y="[-\d.]+" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/);
    if (Number(m[1]) + estWidth(m[4], Number(m[2])) <= FRAME.w + 2) problems.push('the text-extent check no longer catches a label that runs off the right edge');
  }

  /* ── glyph-box collisions and crossed labels, on the EMITTED SVG (packet 40, tolerance 1.2) ── */
  const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
    const attr = (key) => { const r = m[1].match(new RegExp(`${key}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (key) => { const r = m[1].match(new RegExp(`${key}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
  });
  /* every curve here is a straight `M x y L x y` path; read it as a segment the line check can see */
  const pathsOf = (svg) => [...svg.matchAll(/<path d="M ([-\d.]+) ([-\d.]+)((?: [LQ] [-\d. ]+)+)"[^>]*stroke="#/g)].flatMap((m) => {
    const pts = [[parseFloat(m[1]), parseFloat(m[2])]];
    const nums = m[3].replace(/[LQ]/g, ' ').trim().split(/\s+/).map(Number);
    for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
    return pts.slice(1).map((p, i) => ({ x1: pts[i][0], y1: pts[i][1], x2: p[0], y2: p[1] }));
  });
  const boxesOf = (svg) => textsOf(svg).filter((tx) => tx.body.trim()).map((tx) => {
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
      const where = `${d.title} / ${scenario.label}`;
      const boxes = boxesOf(scenario.svg);
      for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i], b = boxes[j];
        if (collides(a, b)) problems.push(`${where}: "${a.body.slice(0, 26)}" (y=${a.y}) and "${b.body.slice(0, 26)}" (y=${b.y}) overlap — one cluster at ${COLLIDE_TOL} of a face`);
      }
      for (const ln of [...linesOf(scenario.svg), ...pathsOf(scenario.svg)]) for (const bx of boxes) {
        if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
      }
    }
  }
  {
    /* A/B the guard, both halves, including the vertical segment packet 31's version could not see */
    const mkb = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mkb('S₁', 340, 100, 12), mkb('S', 340, 110, 12))) problems.push('the collision guard does not fire on two curve labels 10 units apart at one edge');
    if (collides(mkb('S₁', 340, 100, 12), mkb('S', 340, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * 12)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mkb('wage', 188, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    if (!crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mkb('supply', 120, 196, 12))) problems.push('the line check does not see a label on a sloping curve');
    if (crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mkb('supply', 120, 80, 12))) problems.push('the line check fires on a label clear of the curve');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mkb('S', 170, 140, 12))) problems.push('the path reader does not turn a straight curve into a segment the line check can see');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).map(svgTextOf).join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, [money(L.eq.W), money(L.W2), String(L.firmL), String(L.firmLW2), String(L.firmLPrice), 'MRP₁'], 'demand');
  want(1, [k(L.supply(L.eq.W, L.sUp)), k(L.supply(L.eq.W, L.sReg)), money(L.eqD.W), money(L.inel.after.W), k(L.inel.after.L), 'inelastic S'], 'supply');
  want(2, [money(L.eqD.W), k(L.eqD.L), money(L.eqS.W), k(L.eqS.L), k(L.eq.L), 'S = W'], 'equilibrium');
  want(3, [k(L.unionJobs), k(L.unionWilling), k(L.unionExcess), money(L.unionW), k(L.nurse.wanted), k(L.nurse.willing), k(L.nurse.vacancies)], 'unions');
  want(4, [money(L.north.W), money(L.south.W), k(L.northJobless)], 'immobility');
  /* topFix-04: no monopsony diagram survives in this section; specGap-06: the wage-taker firm is drawn */
  if (ALL_DIAGRAMS.some((d) => /monopsony/i.test(`${d.title} ${(d.scenarios || []).map((s) => s.label).join(' ')}`))) problems.push('topFix-04: a monopsony diagram is back in this section — it is 3.3.3\'s');
  const taker = ALL_DIAGRAMS[2].scenarios.find((s) => /wage-taker/i.test(s.label));
  if (!taker || !/<line x1="54" y1="([\d.]+)" x2="336" y2="\1"/.test(taker.svg)) problems.push('specGap-06: the wage-taker scenario has no horizontal supply line across the plot');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const all = readable.join(' \n ');
  const hay = (slug) => { const s = sub(slug); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])]), s.misconception].join(' ').toLowerCase(); };
  const mech = (slug, words, id) => { for (const w of words) if (!hay(slug).includes(w)) problems.push(`${id} (${slug}): the mechanism word "${w}" is missing`); };
  mech('labour-or-capital', ['relative to the price of capital', 'machine', 'cheaper'], 'specThin-01');
  mech('population-and-migration', ['size of population', 'ageing', 'working age'], 'specThin-02');
  mech('tax-and-benefits', ['level of welfare benefits', 'gain from taking a job', 'take-home'], 'specThin-03');
  mech('government-regulations', ['licen', 'work permit', 'retirement', 'shifts supply left'], 'specThin-04');
  mech('tax-and-benefits', ['income tax rates', 'take-home pay'], 'spec-coverage 2c income tax');
  mech('productivity-and-price', ['price of the product', 'productivity of labour'], 'spec-coverage 1a price of the product');
  mech('elasticity-of-demand', ['capital', 'share of total costs', 'price elasticity of demand for the product', 'time'], 'specGap-01 / topFix-03');
  mech('elasticity-of-supply', ['training', 'skills', 'mobility', 'time'], 'specGap-02 / topFix-03');
  mech('public-sector-pay', ['state-owned', 'pay scales', 'commission', 'budget', 'vacancies'], '3c (specGap-04, own clause)');
  mech('why-pay-differs', ['market working', 'market failure', 'cannot'], 'accuracy-01');
  mech('hiring-rule', ['diminishing marginal productivity', 'marginal revenue product', 'movement along'], 'specGap-08 / structure-09');
  /* structure-09: the misconception is the diminishing-returns error, not filler */
  if (!/equipment|machines/i.test(sub('hiring-rule').misconception) || /need them/i.test(sub('hiring-rule').misconception)) problems.push('structure-09: the hiring-rule misconception is not the diminishing-returns error');
  /* structure-09, fix round 1: the filler survived under other wordings ("need more workers", "needed them") in a
     different field (the derived-demand misconception, a mistake). Test every misconception and every mistake. */
  const filler = /\bneed(?:s|ed)?\b[^.]{0,25}\b(?:workers|them|staff|labour)\b/i;
  for (const s2 of SUBSECTIONS) if (filler.test(s2.misconception)) problems.push(`structure-09: ${s2.id} misconception is the "firms need workers" filler`);
  for (const m of MISTAKES) if (filler.test(`${m.title} ${m.looks_like} ${m.why}`)) problems.push(`structure-09: mistake "${m.title}" is the "firms need workers" filler`);
  if (!/demand for the product|product demand/i.test(sub('derived-demand').misconception) || !/shift/i.test(sub('derived-demand').misconception)) problems.push('structure-09: the derived-demand misconception is not the movement-vs-shift error');
  if (!MISTAKES.some((m) => /cut its price/i.test(`${m.title} ${m.why}`))) problems.push('structure-09: no mistake names valuing extra output at the price when the firm must cut its price');
  /* specGap-08, fix round 1: "extra output × price" is the marginal revenue product ONLY for a firm selling at a
     given price. Every surface that multiplies output by the price must state that assumption in the same item. */
  const timesPrice = /(?:×|times|multiplied by)\s*(?:the\s+)?price|× \$|multiplied by the ___/i;
  const assumption = /given price|market price|without cutting|cannot change|any amount at this price|at the same price/i;
  const priceSurfaces = [
    ...SUBSECTIONS.flatMap((s2) => [...s2.body.flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => JSON.stringify(x))]), ...(s2.recall?.template || []), s2.keyIdea, s2.misconception, s2.examMatters].filter(Boolean).map((t) => [s2.id, t])),
    ...FLASHCARDS.map((f) => [`flashcard "${f.front}"`, `${f.front} ${f.back}`]),
    ...NOTES.flatMap((nt) => nt.blocks.flatMap((b) => b.items.map((it) => [`notes "${nt.title}"`, it.text]))),
    ...PRACTICE.map((pp) => [`practice ${pp.command}`, `${pp.question}`]),
    ...QUIZ.map((q) => [`quiz "${q.question.slice(0, 30)}"`, `${q.question} ${q.explanation || ''}`]),
    ...EXTRAS.chains.map((c) => [`chain "${c.title}"`, JSON.stringify(c)]),
    ...ALL_DIAGRAMS.map((d) => [`diagram "${d.title}"`, d.description || '']),
  ];
  for (const [where, text] of priceSurfaces) if (timesPrice.test(text) && !assumption.test(text)) problems.push(`specGap-08: ${where} values output at the price without saying the firm sells at a given price`);
  /* structure-08: the union flow is a causal chain, not three parallel market cases */
  const uflow = sub('unions-and-supply').body.find((b) => b.type === 'flow');
  if (!uflow || uflow.steps.some((s) => /competitive|monopsony|bilateral/i.test(`${s.title} ${s.subtitle}`))) problems.push('structure-08: the union flow lists market cases rather than a causal chain');
  /* structure-07: nothing presupposes an untaught minimum-wage result */
  if (/standard unemployment prediction|national minimum wage/i.test(all)) problems.push('structure-07 regressed: text presupposes the competitive minimum-wage result');
  /* structure-10: one examMatters per subsection, and the backward-bending advice gone from both tabs (banned above) */
  if (SUBSECTIONS.some((s) => typeof s.examMatters !== 'string')) problems.push('structure-10: an examMatters is not a single string');
  /* flows are unique across subsections */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => (typeof x === 'object' ? x.title : x)).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
  /* the marginal revenue product is named ONCE in the Learn text, as an aside, never as the spec's term */
  const mrpNamed = SUBSECTIONS.filter((s) => /marginal revenue product/i.test(JSON.stringify(s.body)));
  if (mrpNamed.length !== 1) problems.push(`the marginal revenue product is named in ${mrpNamed.length} subsections' bodies; the aside belongs in one`);
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '3.3.4' || ctx.unitCode !== 'WEC13') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 3.3.4 / WEC13`);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
const recoverableAfter = after.findings.filter((f) => f.rule === 'recall.recoverable');
const recoverableBefore = before.findings.filter((f) => f.rule === 'recall.recoverable');
const uncovered = after.findings.filter((f) => f.rule === 'spec.uncovered');
const coverage = after.findings.find((f) => f.rule === 'spec.coverage');
if (recoverableAfter.length) problems.push(`recall.recoverable (the shared measure): ${recoverableAfter.length} recall(s) answerable by scrolling up — ${recoverableAfter.map((f) => `${f.where}: ${f.detail}`).join(' | ').slice(0, 4000)}`);
if (uncovered.length) problems.push(`spec.uncovered: ${uncovered.map((f) => f.detail).join(' | ').slice(0, 600)}`);

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 45`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${coverage ? coverage.detail : 'no spec.coverage line'}`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([key, v]) => `${v} ${key}`).join(', ')}`);
console.log(`  spine:  L = ${L.dA} − ${L.dB}W, L = ${L.sB}W − ${-L.sA}: ${money(L.eq.W)}, ${k(L.eq.L)} · firm hires ${L.firmL} · ε(D) ${L.edl} · union ${money(L.unionW)}: ${k(L.unionJobs)} hired, ${k(L.unionWilling)} willing`);
console.log(`  pins:   quiz ${JSON.stringify(Object.values(quizIndices))} · practice ${JSON.stringify(Object.values(practiceIndices))}`);
console.log(`  served: practice ${JSON.stringify(practiceServed)} (first unused pin per chapter; Practice tab only: ${JSON.stringify(PRACTICE.map((_, i) => i).filter((i) => !practiceServed.includes(i)))})`);
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
  SCOPE      3.3.4 only; monopsony (3.3.3 · 7), the minimum wage and measures against immobility
             (3.3.5 · 2b) pointed at within a budget, each pointer carrying its topic number; the
             monopsony construction, maximum wages, discrimination, the backward-bending curve and
             Outline/Assess banned — each A/B'd against a string it must catch and one it must not
  NUMBERING  the oracle re-read (19 rows / 17 leaves), every leaf mapped and its own words found in
             the mapped subsections, both factor lists matched to :1447-1479, nine lines asserted by
             number, "3.4.1-3.4.3" asserted ABSENT, and every banned word re-measured absent
  ARITHMETIC every equilibrium off BOTH curves; the firm's hiring read off its schedule; the union's
             two routes landing on one point; nurses, regions and every printed quiz/recall figure
  PINS       derived from each item's block tag; ${content.length} blocks, each with its own diagram, quiz and
             practice; no diagramRef; ${3 + content.length} free quiz items against FREE_QUIZ_MAX 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal,
             no near-duplicate stems, nothing tested that is not taught, no key on its own diagram
  PRACTICE   Appendix 6 parsed; the WEC13 paper's shape read from ial-paper-structure.json;
             two-paragraph guidance with a clean opening; points to 6 marks, levels above
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent and collisions (lines AND
             paths) checked on the emitted SVG with the guard A/B'd, figures counted back out`);

if (DUMP) {
  const path = `audit/snapshots/packet-45-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-45-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
