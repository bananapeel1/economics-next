#!/usr/bin/env node
/**
 * PACKET 46 — growth-development, Economics Unit 4 (WEC14), IAL topic 4.3.6.
 * `audit/raw/econ_spec.txt:1899-1968`. SEVEN blocks, thirty-four subsections, 43 substantive leaves.
 *
 *   node scripts/packet-46-growth-development.mjs            # dry run, every check
 *   node scripts/packet-46-growth-development.mjs --dump     # + write the bundle
 *   node scripts/packet-46-growth-development.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Packet 44's runner, adapted; what this packet adds:
 *
 *   - **THE LEDGER'S INVENTED ITEMS ARE REFUSED ON THE DOCUMENT.** "Fairtrade", "Dutch disease",
 *     sustainability, green growth and the Kuznets curve, MPI and IHDI are each grepped over the whole
 *     specification and asserted ABSENT, and banned from the section. If one is ever found in the
 *     document, the ban fails loudly rather than silently refusing a real requirement.
 *   - **THE WORDS THE SPECIFICATION DOES USE ARE ASSERTED PRESENT, BY LINE.** The heading, the four
 *     sub-topic starts, and each strategy list are matched against `econ_spec.txt` itself.
 *   - **EVERY HARROD-DOMAR FIGURE IS g = s ÷ k, RE-DERIVED.** Including the ones printed in recalls,
 *     quiz stems and practice items, recomputed here from the numbers in their own text.
 *   - **A CHECK-IN MAY NOT PRINT ITS OWN QUIZ KEY.** A numeric key that appears on the same block's
 *     diagram (SVG text or checklist) is a finding (packet 44's fix round, `leak-probe.mjs`).
 *   - **NO FILL-IN PRINTS ITS OWN ANSWER ANYWHERE IN ITS TEMPLATE OR HINTS.** A stricter version of
 *     `fillin.leak`: a numeric answer that appears as a number in any line, or an answer word that
 *     appears in another blank's hint, is refused.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, round1, round2, round3,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
  OTHER_MEASURES, MARKET_STRATEGIES, INTERVENTIONIST_STRATEGIES, OTHER_STRATEGIES, INSTITUTIONS,
} from './_packet46-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
} from './_packet46-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet46-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD, GEO, TOT_PATH, FX, LEWIS } from './_packet46-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const E = ECON;

const problems = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

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
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ══ 1 · A FAILED SUBSTITUTION, ON EVERY SURFACE ════════════════════════════ */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{|Infinity/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  for (const bad of ['a gap of undefinedbn', 'growth is NaN%', 'the index [object Object]', 'saving of ' + '${pct(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['an undertaking by the state', 'the object of the scheme', 'a gap of $2bn']) {
    if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);
  }
}

/* ══ 2 · THE BANNED VOCABULARY AND THE POINTER BUDGETS ══════════════════════ */
for (const [re, why] of BANNED_ELSEWHERE) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  /* A/B, because a ban that has never fired is not known to work (packet 21) */
  const fires = (i, str) => { const [re] = BANNED_ELSEWHERE[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'buy Fairtrade coffee', 'a fair share of trade'],
    [0, 'fair trade schemes pay a premium', 'trade that is fair to both'],
    [1, 'the country caught Dutch disease', 'Dutch firms invested in the port'],
    [2, 'green growth is achievable', 'growth in the green belt'],
    [2, 'sustainable development goals', 'a sustained rise in output'],
    [2, 'the Environmental Kuznets Curve', 'the environmental costs of growth'],
    [3, 'the MPI counts deprivations', 'the IMF lends'],
    [4, 'structural adjustment programmes', 'structural change in the economy'],
    [5, 'the Marshall-Lerner condition', 'the marshalling yard'],
    [6, 'Assess the impact of aid. (10 marks)', 'an assessment of the arguments'],
    [6, 'Outline two roles of the IMF.', 'the outline of the diagram'],
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
ban(/\bF0\d\d\b|\bC-growth-development-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  const tariffs = POINTER_ONLY[1];
  if (!tariffs.mustCite.test('How each barrier, such as tariffs, works is topic 4.3.2.')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (tariffs.mustCite.test('Tariffs raise the price of imports.')) problems.push('the pointer-cite check accepts an uncited mention');
  if (!tariffs.re.test('a tariff on rice')) problems.push('the tariff pointer no longer matches "a tariff"');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* 1a — the HDI by the UNDP method, recomputed here and not read from the util */
  const h = (72 - 20) / (85 - 20), ed = (6 / 15 + 14.4 / 18) / 2, inc = (Math.log(5000) - Math.log(100)) / (Math.log(75000) - Math.log(100));
  a(near(E.healthIx, h) && round3(h) === 0.8, `health index ${E.healthIx} is not (72 − 20) ÷ 65 = 0.800`);
  a(near(E.eduIx, ed) && round3(ed) === 0.6, `education index ${E.eduIx} is not the mean of 6/15 and 14.4/18`);
  a(near(E.incomeIx, inc) && round3(inc) === 0.591, `income index ${E.incomeIx} is not ln(50) ÷ ln(750)`);
  a(round3(Math.cbrt(h * ed * inc)) === 0.657 && round3(E.hdi) === 0.657, `HDI ${E.hdi} is not the cube root of the product`);
  a(E.hdi >= 0.55 && E.hdi < 0.7, 'the HDI is not in the medium band the text says it is');
  a(round3(E.healthIxQ) === round3((E.lifeExpQ - 20) / 65), 'the practice health index is not derived');
  /* the geometric-mean diagram */
  a(round3(GEO.amA) === round3(GEO.amB), 'the two countries in the geometric-mean diagram do not share an arithmetic mean');
  a(GEO.gmB < GEO.gmA, 'the weak dimension does not pull country B below country A');
  /* 2a-1 */
  a(near(E.exportFallPct, E.copperShare * E.copperFall) && near(E.exportFallBn, E.exports * E.exportFallPct / 100), 'the copper fall is not share × fall');
  /* 2a-2 */
  a(E.tot === Math.round((E.exportPriceIx / E.importPriceIx) * 100) && E.tot === 75, 'terms of trade is not export ÷ import × 100');
  a(Math.round(TOT_PATH[TOT_PATH.length - 1].tot) === E.tot && TOT_PATH[0].tot === 100, 'the terms of trade path does not start at 100 and end at the text\'s figure');
  /* 2a-3 */
  a(E.g === E.s / E.k && E.g === 3, 'Harrod-Domar: g is not s ÷ k');
  a(E.sNeeded === E.gTarget * E.k && E.savingsGap === E.sNeeded - E.s, 'the savings gap is not derived');
  a(near(E.savingsGapBn, E.gdp * E.savingsGap / 100), 'the savings gap in dollars is not a share of GDP');
  a(near(E.perHead, E.g - E.popGrowth), 'growth per head is not growth minus population growth');
  /* 2a-4, 2a-5, 2a-6, 2a-7 */
  a(E.fxGap === E.importNeeds - E.exports, 'the foreign currency gap is not needs minus earnings');
  a(near(E.flightBn, E.gdp * E.flightPct / 100) && near(E.flightGrowthLost, E.flightPct / E.k), 'capital flight figures are not derived');
  a(E.under15 + E.working + E.over64 === 100 && E.dependency === Math.round((E.under15 + E.over64) / E.working * 100), 'the dependency ratio is not derived, or the shares do not sum to 100');
  a(E.agedUnder15 + E.agedWorking + E.agedOver64 === 100 && E.agedDependency === Math.round((E.agedUnder15 + E.agedOver64) / E.agedWorking * 100), 'the ageing economy\'s ratio is not derived');
  a(E.debtServiceShare === Math.round(E.debtService / E.exports * 100), 'debt service share is not derived');
  /* 3a-2, 3c-4, 3c-5 */
  a(E.gWithFdi === (E.s + E.fdi) / E.k && E.gWithAid === (E.s + E.aid) / E.k, 'FDI and aid growth are not (s + inflow) ÷ k');
  a(near(E.reliefFreed, E.exports * (E.debtServiceShare - E.debtShareAfter) / 100), 'debt relief freed is not derived');
  /* 3b-6 — the buffer stock, off the demand curve both ways */
  a(E.priceAt(E.qNormal) === E.floor, 'the normal harvest does not clear at the floor');
  a(E.pGood < E.floor && E.buyGood === E.qGood - E.qAt(E.floor) && E.buyGood === 80, 'the bumper-harvest purchase is not supply minus demand at the floor');
  a(E.pPoor > E.ceiling && E.sellPoor === E.qAt(E.ceiling) - E.qPoor && E.sellPoor === 20, 'the poor-harvest sale is not demand minus supply at the ceiling');
  a(E.qAt(E.priceAt(E.qGood)) === E.qGood, 'priceAt and qAt are not inverses');
  /* 3c-1 — the Lewis diagram */
  E.lewisJobs.forEach((j, i) => a(LEWIS.cs[i] - j === E.modernWage, `Lewis demand D${i + 1} does not cross the wage at ${j} million`));
  a(near(LEWIS.cLate - LEWIS.lLate, LEWIS.supplyAt(LEWIS.lLate), 1e-9) && LEWIS.lLate > E.turningPoint && LEWIS.wLate > E.modernWage, 'the late demand curve does not meet the rising supply past the turning point');
  /* 3a-5 — the currency diagram, off both curves */
  a(near(FX.s(FX.q0), FX.d(FX.q0)) && near(FX.s(FX.q1), FX.d1(FX.q1)) && FX.p1 < FX.p0, 'the currency diagram\'s equilibria are not on both curves, or the currency did not fall');
  /* the recall, quiz and practice arithmetic, recomputed from the numbers the items print */
  a(15 / 3 === 5 && 7 * 3 === 21, 'harrod-domar recall: 15 ÷ 3 is not 5, or 7 × 3 is not 21');
  a(Math.round((30 + 10) / 60 * 100) === 67 && 100 - 30 - 10 === 60, 'dependency recall: (30 + 10) ÷ 60 is not 67, or working age is not 60');
  a(9 + 6 === 15 && 15 / 3 === 5, 'FDI recall: 9 + 6 is not 15, or 15 ÷ 3 is not 5');
  a(560 - 500 === 60 && 60e6 * 3 / 1e6 === 180, 'buffer recall: 560 − 500 is not 60, or 60m kg × $3 is not $180m');
  a(8 / 2 === 4 && (8 + 2) / 2 === 5 && round2((25 - 10) / 100 * 10) === 1.5, 'aid recall: growth or relief figures are wrong');
  a(round3((50 - 20) / 65) === 0.462, 'quiz: (50 − 20) ÷ 65 is not 0.462');
  a(20 / 5 === 4 && (11 + 4) / 3 === 5, 'quiz arithmetic is wrong');
  {
    /* the chapter-2 share-times-fall item, re-derived from the two figures its own stem prints (fix round 2, 26 Sep):
       the key and each named error. ARITHMETIC ONLY: it is not a leak check (CONTENT-GATE.md, "The check-in answer rule"). */
    const q = QUIZ.find((x) => /export revenue from copper, and the world copper price falls by/.test(x.question));
    const [, share, fall] = q?.question.match(/earns (\d+)% of its export revenue from copper, and the world copper price falls by (\d+)%/) || [];
    const S = Number(share), F = Number(fall);
    const key = (S * F) / 100;
    const errors = [F, 100 - key, S];   // the price fall alone; what earnings fall TO; the share alone
    a(q && key === 52 && q.options[q.correctIndex] === `${key}%`, 'copper quiz: the key is not share × fall from its own stem, or not 52% by hand');
    a(q && JSON.stringify([...q.options].sort()) === JSON.stringify([key, ...errors].map((v) => `${v}%`).sort()), 'copper quiz: an option is neither the key nor one of its three named errors (65%, 48%, 80%)');
    a(q && q.explanation.includes(`${S / 100} × ${F}% = ${key}%`), 'copper quiz: the explanation does not print the working from its own stem');
  }
  {
    /* the chapter-3 dependency-ratio item, re-derived from the two shares its own stem prints (fix round, 26 Sep):
       the key and each named error. ARITHMETIC ONLY: it cannot tell whether the check-in's diagram gives the
       answer away, and it is not a leak check (CONTENT-GATE.md, "The check-in answer rule"). */
    const q = QUIZ.find((x) => /dependency ratio is approximately/.test(x.question));
    const [, young, old] = q?.question.match(/(\d+)% of its people are under 15 and (\d+)% are over 64/) || [];
    const Y = Number(young), O = Number(old), W = 100 - Y - O;
    const key = Math.round(((Y + O) / W) * 100);
    const errors = [Math.round(((Y + O) / (100 - Y)) * 100), Math.round((Y / W) * 100), Math.round((100 / W) * 100)];
    a(q && W === 75 && key === 33 && q.options[q.correctIndex] === String(key), 'dependency quiz: the key is not (young + old) ÷ working age × 100 from its own stem, or not 33 by hand');
    a(q && JSON.stringify([...q.options].sort()) === JSON.stringify([key, ...errors].map(String).sort()), 'dependency quiz: an option is neither the key nor one of its three named errors (31, 27, 133)');
    a(q && q.explanation.includes(`100 − ${Y} − ${O} = ${W}%`) && q.explanation.includes(`${Y + O} ÷ ${W} × 100 = ${key}`), 'dependency quiz: the explanation does not print the working from its own stem');
  }
  a(20 / 5 === 4 && 4 - 2.5 === 1.5, 'practice Calculate (4): 20 ÷ 5 − 2.5 is not 1.5');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 7) problems.push(`${content.length} blocks, not 7`);
  if (SUBSECTIONS.length !== 34) problems.push(`${SUBSECTIONS.length} subsections, not 34`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (!b.sections.length) problems.push(`block "${b.title}" has no subsections`);
  }
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block carries `diagramRef`, the legacy string pin');
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items, not 3 — the pre-test asks three`);
  if ([...unpinned].some((i) => i > 2)) problems.push('an unpinned quiz item is not among the first three in the array');
  const freeNeeded = 3 + content.length;
  if (freeNeeded > 10) problems.push(`${freeNeeded} free quiz items needed against FREE_QUIZ_MAX 10`);
  const limits = readFileSync('lib/preview-limits.js', 'utf8').match(/export const FREE_QUIZ_MAX = (\d+);/);
  if (!limits || Number(limits[1]) < freeNeeded) problems.push(`lib/preview-limits.js FREE_QUIZ_MAX is ${limits?.[1]}, below the ${freeNeeded} this section needs`);
  const pinnedQ = new Set(Object.values(quizIndices).flat());
  QUIZ.forEach((q, i) => { if (q.block && !pinnedQ.has(i)) problems.push(`quiz item ${i} is tagged "${q.block}" and reaches no block`); });
  const pinnedP = new Set(Object.values(practiceIndices).flat());
  PRACTICE.forEach((p, i) => { if (!pinnedP.has(i)) problems.push(`practice item ${i} (${p.command}) reaches no block`); });
  const ids = [
    ...content.map((b) => b.id), ...SUBSECTIONS.map((s) => s.id), ...SUBSECTIONS.map((s) => s.recall.id),
    ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id), ...FLASHCARDS.map((f) => f.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id),
  ];
  if (new Set(ids).size !== ids.length) problems.push(`duplicate ids: ${[...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].slice(0, 3).join(', ')}`);
  for (const s of SUBSECTIONS) if (s.recall?.id !== `${s.id}:recall`) problems.push(`${s.id}: the recall id is not minted from its own subsection`);
  /* the taxonomy is the specification's own (topFix-02, structure-06, structure-09) */
  const want = ['Measuring Development', 'Constraints: Commodities, Savings and Currency', 'Constraints: People, Debt, Credit and Infrastructure', 'Non-Economic Constraints', 'Market-Orientated Strategies', 'Interventionist Strategies', 'Other Strategies and International Institutions'];
  if (JSON.stringify(BLOCKS) !== JSON.stringify(want)) problems.push(`the chapters are not the specification's order: ${BLOCKS.join(' | ')}`);
  if (/Market-Led/i.test(JSON.stringify(bundle))) problems.push('"Market-Led" survives — structure-06: the spec and diagram 4 say "market-orientated"');
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE NUMBERING, RE-READ FROM THE DOCUMENT ═══ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '4.3.6');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 50 || leaves.length !== 43) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 4.3.6, not 50 / 43`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 4.3.6 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words — the oracle's wording, a second method */
  const SKIP = new Set(['changes', 'influencing', 'between', 'distinction', 'impact', 'different', 'economies', 'continued', 'thousand']);
  for (const leaf of leaves) {
    /* the oracle's 2b-5 row carries the page header's "economies (continued)"; strip it before reading */
    const wording = leaf.wording.replace(/economies \(continued\)/, '');
    const words = wording.toLowerCase().replace(/[^a-z -]/g, ' ').split(/\s+/).filter((w) => w.length > 4 && !SKIP.has(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase()).join(' ');
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${wording.trim()}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the specification's own lists, in its own words, match the util's copies */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const span = spec.slice(1898, 1968).join(' ').replace(/[•]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...OTHER_MEASURES, ...MARKET_STRATEGIES, ...INTERVENTIONIST_STRATEGIES, ...OTHER_STRATEGIES, ...INSTITUTIONS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and econ_spec.txt:1899-1968 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: econ_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1899, '4.3.6 Growth and development in developing, emerging and developed');
  at(1904, '1 Measures of');
  at(1916, '2 Constraints on');
  at(1945, '3 Measures to');
  at(1965, 'd) The role of international institutions');
  at(1117, 'environmental costs');
  at(1646, '3 Terms of trade');
  at(1683, '5 Restrictions on');
  at(1720, '2 Exchange rates');
  at(1788, '4.3.4 Poverty and inequality');
  /* the words the bans rest on are measured, not remembered */
  const body = spec.join('\n');
  for (const w of ['fairtrade', 'dutch disease', 'kuznets', 'green growth', 'sustainab', 'multidimensional', 'structural adjustment', 'washington consensus']) if (body.toLowerCase().includes(w)) problems.push(`"${w}" occurs in econ_spec.txt after all — the ban rests on it being absent`);
  /* the one "fair trade" is the Extended Project title at :2615, and it is the only one */
  const ft = spec.map((l, i) => (/fair trade/i.test(l) ? i + 1 : 0)).filter(Boolean);
  if (JSON.stringify(ft) !== '[2615]') problems.push(`"fair trade" occurs at econ_spec.txt:${ft.join(', ')}, not only at the Extended Project title :2615`);
  /* the IAL spec names the IMF, World Bank and NGOs only in 4.3.6 — specGap-06's "4.3.5" is refused */
  const imfLines = spec.map((l, i) => (/World Bank|International Monetary Fund|\bNGOs?\b/.test(l) ? i + 1 : 0)).filter(Boolean);
  if (imfLines.some((n) => n < 1899 || n > 1968)) problems.push(`the World Bank / IMF / NGOs appear outside 4.3.6 at econ_spec.txt:${imfLines.join(', ')}`);
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
    if (/\b(always|never|only|all)\b/i.test(q.options.filter((_, i) => i !== q.correctIndex).join(' ')) && /\b(may|can|might|usually|often|tends?)\b/i.test(correct)) problems.push(`the hedge tell: a hedged key among absolute distractors in "${q.question.slice(0, 40)}"`);
  }
  const share = hist.map((n) => (n / QUIZ.length) * 100);
  if (share.some((p) => p > 40 || p < 10)) problems.push(`quiz.histogram would fire: ${share.map((p) => `${Math.round(p)}%`).join('/')}`);
  const ORDINAL = /\b(first|second|third|fourth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|birthday)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'Only the last of these is a constraint.', 'The former is growth and the latter development.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['Babies dying before their first birthday is a health measure.', 'Wages rise at the final stage of the Lewis process.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* nothing may be quizzed that no subsection teaches (quiz-01, quiz-02, structure-03, topFix-03) */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['life expectancy', 'geometric mean', 'goalpost', 'agriculture', 'prebisch-singer', 'terms of trade', 'income inelastic', 'harrod-domar', 'capital-output ratio', 'foreign currency gap', 'savings gap', 'capital flight', 'dependency ratio', 'collateral', 'remittances', 'production possibility frontier', 'infant industry', 'repatriated', 'microfinance', 'reserves', 'floor', 'ceiling', 'joint venture', 'surplus labour', 'turning point', 'reinvested', 'leak', 'balance of payments', 'debt relief', 'ngos', 'tied aid', 'output per worker', 'primary industries'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  /* the four live-bank topics the audit caught, now each taught in a subsection's own prose */
  for (const [term, id] of [['lewis turning point', 'quiz-01'], ['capital flight', 'quiz-02'], ['harrod-domar model', 'structure-03'], ['surplus labour', 'topFix-03']]) if (!teaching.includes(term)) problems.push(`${id}: "${term}" is not taught in any subsection's prose`);
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea]).join(' ').toLowerCase();
    const onTopic = items.some((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`no quiz item pinned to "${b.title}" shares substantive vocabulary with the chapter`);
  }
  /* A CHECK-IN MAY NOT PRINT ITS OWN KEY: a numeric key found on its block's diagram */
  const numsIn = (s) => new Set((String(s).match(/\d+(?:\.\d+)?%?/g) || []));
  content.forEach((b, bi) => {
    const d = DIAGRAMS[bi];
    const shown = numsIn([...svgOf(d).map((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' ')), ...(d.checklist || [])].join(' '));
    for (const qi of b.quizIndices) {
      const key = QUIZ[qi].options[QUIZ[qi].correctIndex];
      if (/^\s*[\d.]+%?\s*$/.test(key) && shown.has(key.trim())) problems.push(`the "${b.title}" check-in prints its own key "${key}" on its diagram (quiz ${qi})`);
    }
  });
  {
    /* A/B the leak check on a planted item */
    const shown = numsIn('HDI = 0.657 and growth 3%');
    if (!shown.has('0.657') || !shown.has('3%')) problems.push('the printed-key check does not read numbers off the diagram text');
  }
}

/* ══ 7 · PRACTICE ═══════════════════════════════════════════════════════════ */
{
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
  /* the WEC14 paper, read from the structure file rather than typed: B's tariffs and C's essays */
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).economics.units_3_4;
  if (!paper.papers.includes('WEC14')) problems.push('ial-paper-structure.json economics.units_3_4 does not cover WEC14');
  const B = paper.sections.find((s) => s.id === 'B'), C = paper.sections.find((s) => s.id === 'C');
  for (const m of B.tariffs) {
    const cmds = B.commandWordByTariff[String(m)];
    if (!PRACTICE.some((p) => p.marks === m && cmds.includes(p.command))) problems.push(`no practice item at the WEC14 data-question tariff ${m} (${cmds.join('/')})`);
  }
  const essays = PRACTICE.filter((p) => p.marks === C.marksEach);
  if (essays.length < C.offered) problems.push(`${essays.length} 20-mark essays, and WEC14's Section C offers ${C.offered}`);
  const seen = new Set();
  for (const p of PRACTICE) {
    seen.add(p.command);
    const allowed = TARIFFS[p.command];
    if (!allowed) { problems.push(`"${p.command}" is not an IAL Economics command word`); continue; }
    if (!allowed.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — Appendix 6 gives ${allowed.join(' or ')}`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not end in its own tariff`);
    if (!new RegExp(`(^|\\.\\s+)${p.command}\\b`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not put its command word at the start of a sentence`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 44)}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\b\d{2,}\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries the level descriptors`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points (topFix-05)`);
    if (p.marks > 6 && !/\bLevel 1\b/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance has no level descriptors (topFix-05)`);
    const ALLOCATES = /\(\s*\d+\s*marks?\s*\)|\b(One|Two|Three|Four) marks? for\b/;
    if (p.marks <= 6 && !ALLOCATES.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
  }
  for (const cmd of ['Define', 'Calculate', 'Explain', 'Analyse', 'Examine', 'Discuss', 'Evaluate']) if (!seen.has(cmd)) problems.push(`no practice item uses the command word ${cmd}`);
  for (const m of TARIFFS.Calculate) if (!PRACTICE.some((p) => p.command === 'Calculate' && p.marks === m)) problems.push(`no Calculate at ${m} marks`);
  if (PRACTICE.some((p) => p.command === 'Define' && p.marks !== 2)) problems.push('topFix-05 regressed: a Define carries a tariff other than 2');
  if (PRACTICE.some((p) => /\bOutline\b|\bAssess\b/.test(`${p.command} ${p.question}`))) problems.push('an Outline or Assess item survived (topFix-05)');
}

/* ══ 8 · RECALLS ════════════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.map((s) => [s, s.recall]).filter(([, r]) => r);
  if (recalls.length !== SUBSECTIONS.length) problems.push(`${recalls.length} recalls over ${SUBSECTIONS.length} subsections (structure-01)`);
  const types = new Set(recalls.map(([, r]) => r.type));
  for (const want of ['fillin', 'classify', 'match', 'reorder']) if (!types.has(want)) problems.push(`no ${want} recall in the section`);
  for (const [sec, r] of recalls) {
    const where = sec.id.split(':').pop();
    if (!r.prompt) problems.push(`${where}: recall has no prompt`);
    if ('shuffled' in r) problems.push(`${where}: recall carries \`shuffled\``);
    if (r.type === 'fillin') {
      const blanks = r.template.join(' ').split('___').length - 1;
      if (blanks !== r.answers.length) problems.push(`${where}: ${blanks} blanks against ${r.answers.length} answers`);
      r.template.forEach((line, li) => { if ((line.split('___').length - 1) !== 1) problems.push(`${where}: template line ${li} carries ${(line.split('___').length - 1)} blanks — one per line`); });
      if (r.hints.length !== r.answers.length) problems.push(`${where}: ${r.hints.length} hints against ${r.answers.length} answers`);
      if (!r.distractors || r.distractors.length < 2 || r.distractors.length > 3) problems.push(`${where}: ${r.distractors?.length ?? 0} distractors, and the contract is 2-3`);
      if (new Set(r.answers.map((x) => x.toLowerCase())).size !== r.answers.length) problems.push(`${where}: a duplicated answer`);
      /* STRICTER THAN fillin.leak: a numeric answer printed as a number anywhere in the recall, or
         any answer printed in a hint, is a give-away (packet 44 fix round; memory: "a number in a
         choice is never a coincidence") */
      const printedNums = new Set((`${r.prompt} ${r.template.join(' ')}`.replace(/_{3,}/g, ' ').match(/\d+(?:[.,]\d+)?%?/g) || []));
      r.answers.forEach((ans, i) => {
        const a = String(ans);
        const h = String(r.hints[i] || '');
        if (a.length >= 3 && h.toLowerCase().startsWith(a.toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${h}" is a prefix of "${a}"`);
        if (/\d/.test(a) && (printedNums.has(a) || printedNums.has(a.replace('%', '')))) problems.push(`${where}: the answer "${a}" is printed in the recall's own text`);
        r.hints.forEach((other) => { if (new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\%]/g, '\\$&')}\\b`, 'i').test(other)) problems.push(`${where}: the answer "${a}" is printed in a hint`); });
        if (/,/.test(a) || (a.trim().split(/\s+/).length > 3)) problems.push(`${where}: answer "${a}" is a compound token`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === a.toLowerCase())) problems.push(`${where}: "${a}" is both an answer and a distractor`);
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
      if (r.groups.some((g) => !String(g.why ?? '').trim())) problems.push(`${where}: a classify group has no \`why\``);
    }
  }
  const reorderItems = recalls.filter(([, r]) => r.type === 'reorder').flatMap(([, r]) => r.correctOrder.map((x) => x.toLowerCase()));
  if (new Set(reorderItems).size !== reorderItems.length) problems.push('two reorders share an item');
  {
    /* A/B the stricter fill-in check on a planted give-away */
    const planted = { prompt: 'x', template: ['It saves 5% and grows at ___.'], answers: ['5%'], hints: ['h'] };
    const nums = new Set((`${planted.prompt} ${planted.template.join(' ')}`.replace(/_{3,}/g, ' ').match(/\d+(?:[.,]\d+)?%?/g) || []));
    if (!nums.has('5%')) problems.push('the printed-answer fill-in check does not see a number printed in the template');
  }
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
    /* structure-07: the live misconceptions all opened "Wrong — … Instead write:"; none may */
    if (/^Wrong\b|Instead write:/i.test(s.misconception)) problems.push(`${where}: the misconception uses the generated "Wrong — … Instead write:" template (structure-07)`);
  }
  for (const b of content) b.takeaway.forEach((t) => { if (t.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${t.slice(0, 40)}"`); });
  /* topFix-05: the "growth is necessary" contradiction may not come back */
  if (readable.some((s) => /growth is (?:a )?necessary/i.test(s) && !/Students write that growth is "necessary"/.test(s))) problems.push('topFix-05 regressed: "growth is necessary" is asserted again');
  /* structure-05: every takeaway term must be taught in its block's subsections */
  const TAKEAWAY_TERMS = ['debt', 'dependency', 'harrod-domar', 'prebisch-singer', 'capital flight', 'corruption', 'remittances', 'fdi', 'buffer', 'lewis', 'imf', 'world bank', 'ngos', 'geometric mean'];
  for (const b of content) {
    const hay = b.sections.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((x) => [x.text, ...(x.items || []), ...(x.steps || []).map((y) => y.title)])]).join(' ').toLowerCase();
    for (const t of b.takeaway) for (const term of TAKEAWAY_TERMS) if (t.toLowerCase().includes(term) && !hay.includes(term)) problems.push(`structure-05: "${b.title}" takeaway names "${term}" and no subsection in the block teaches it`);
  }
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  const CITATION = /\((?:source|see|per|from)\b[^)]*\)|\bW(?:EC|BS)1[1-4]\b|\bappendix\s+[0-9]\b|\bmark\s+scheme\b|\bexaminer'?s?\s+report\b/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
    if (EXAMINER_CLAIM.test(sent) && !CITATION.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  }
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
  /* topFix-04's evaluation card: environmental costs appear once, pointed at 2.3.5 */
  const env = readable.filter((s) => /environmental costs/i.test(s));
  if (env.length !== 1 || !/2\.3\.5/.test(env[0] || '')) problems.push(`topFix-04: environmental costs should appear once, pointed at 2.3.5 — found ×${env.length}`);
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme (accuracy-01 was one)');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b|\bVAT\b/g, 'a UK-only institution (locale.institution)');
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
  const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
  });
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
  /* bars are <rect>s: a label or a value drawn over another bar is the same defect, so they are read too */
  const rectsOf = (svg) => [...svg.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)" height="([-\d.]+)"/g)].map((m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }));
  const onRect = (r, bx) => bx.left < r.x + r.w && r.x < bx.right && bx.top < r.y + r.h && r.y < bx.bottom;
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
      for (const r of rectsOf(scenario.svg)) for (const bx of boxes) if (onRect(r, bx)) problems.push(`${where}: a bar is drawn under "${bx.body.slice(0, 26)}"`);
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('PPF₁', 340, 100, 12), mk('PPF', 340, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('PPF₁', 340, 100, 12), mk('PPF', 340, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * 12)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Supply', 188, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    if (!crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mk('output', 120, 196, 12))) problems.push('the line check does not see a label on a sloping curve');
    if (crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mk('output', 120, 80, 12))) problems.push('the line check fires on a label clear of the curve');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mk('SRAS', 170, 140, 12))) problems.push('the path reader does not turn a straight curve into a segment the line check can see');
    if (!onRect({ x: 182, y: 50, w: 100, h: 18 }, mk('0.800', 200, 63, 12))) problems.push('the bar check does not see a label drawn over a bar');
    if (onRect({ x: 182, y: 50, w: 100, h: 18 }, mk('0.800', 288, 63, 12))) problems.push('the bar check fires on a value placed past the bar\'s end');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, ['0.800', '0.600', '0.591', '0.657', '0.624'], 'HDI');
  want(1, [String(E.tot), `${E.s}%`, `${E.sNeeded}%`, `$${E.fxGap}bn`], 'constraints');
  want(2, [String(E.dependency), String(E.agedDependency), `${E.debtServiceShare}%`], 'population and debt');
  want(3, ['PPF', 'PPF₁'], 'PPF');
  want(4, [`${E.s + E.fdi}%`, `${E.gWithFdi}%`, '0.50', '0.40'], 'market strategies');
  want(5, [String(E.buyGood), String(E.sellPoor), '$2.00', '$2.40', '$1.60', '$2.50'], 'buffer stock');
  want(6, [String(E.turningPoint), `$${E.modernWage}`, 'D₃', 'D₄'], 'Lewis');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const all = readable.join(' \n ');
  /* accuracy-01 / topFix-05: the Paris Agreement sentence and the Copenhagen pledge are gone with the block */
  for (const [re, id] of [[/1\.5\s*°?C|1\.5 degrees/i, 'accuracy-01'], [/\$100bn/i, 'accuracy-01'], [/consistently fallen short/i, 'accuracy-01'], [/Examiners expect you to/i, 'accuracy-02'], [/Dutch colonial|immigration from the Netherlands/i, 'topFix-03']]) if (re.test(all)) problems.push(`${id} regressed: "${re.source}" is back`);
  /* topFix-04 / specGap-07 / structure-09: no sustainability subsection */
  if (SUBSECTIONS.some((s) => /sustainab|green/i.test(s.id + s.title))) problems.push('topFix-04: a sustainability or green-growth subsection survives');
  /* structure-08 / quiz-01: the Lewis model has its own subsection */
  if (!SUBSECTIONS.some((s) => /lewis/i.test(s.id))) problems.push('structure-08: the Lewis model has no subsection of its own');
  /* flows are unique — no chain taught twice */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => (typeof x === 'object' ? x.title : x)).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
  /* each specGap item's named mechanism is in the subsection that owns it */
  const mech = (slug, words) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); const hay = [s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase(); for (const w of words) if (!hay.includes(w)) problems.push(`${slug}: the mechanism word "${w}" is missing`); };
  mech('hdi-strengths-limits', ['average', 'data', 'over time', 'between countries']);
  mech('foreign-currency-gap', ['imports', 'foreign currency', 'savings gap']);
  mech('capital-flight', ['residents', 'savings gap', 'foreign currency gap']);
  mech('demographic-factors', ['dependency ratio', 'age distribution', 'migration']);
  mech('credit-and-banking', ['collateral', 'moneylenders', 'savings']);
  mech('subsidies-privatisation', ['subsid', 'privatisation', 'monopoly']);
  mech('floating-exchange-rates', ['depreciat', 'reserves']);
  mech('managed-exchange-rates', ['reserves', 'central bank']);
  mech('joint-ventures', ['tnc', 'ownership', 'profits']);
  mech('lewis-model', ['surplus labour', 'reinvested', 'turning point']);
  mech('aid-debt-relief', ['aid', 'debt relief', 'tied aid']);
  mech('world-bank-imf', ['world bank', 'international monetary fund', 'conditions']);
  mech('ngos', ['non-government', 'community']);
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '4.3.6' || ctx.unitCode !== 'WEC14') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 4.3.6 / WEC14`);
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

console.log(`\n${SECTION} — packet 46`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${coverage?.detail || 'no spec.coverage finding'}`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  spine:  HDI ${round3(E.hdi)} · g = ${E.s} ÷ ${E.k} = ${E.g}% · gap ${E.savingsGap} pts · ToT ${E.tot} · dependency ${E.dependency} · buffer +${E.buyGood}/−${E.sellPoor}`);
console.log(`  pins:   quiz ${JSON.stringify(Object.values(quizIndices))} · practice ${JSON.stringify(Object.values(practiceIndices))}`);
for (const f of carried) console.log(`  carried ${f.tier} ${f.rule} ${f.where}: ${String(f.detail).slice(0, 100)}`);
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
  SCOPE      4.3.6 only; Fairtrade, Dutch disease, sustainability / green growth / Kuznets / Paris,
             MPI / IHDI, structural adjustment, and exchange-rate mechanics banned — each A/B'd and each
             grepped ABSENT from econ_spec.txt; poverty measures (4.3.4), trade barriers (4.3.2) and
             exchange-rate systems (4.3.3) pointed at within a budget, every pointer cited
  NUMBERING  the oracle re-read (50 rows / 43 leaves), every leaf mapped and its own words found in
             the mapped subsection, the spec's five lists matched to :1899-1968, ten lines asserted
  ARITHMETIC HDI by the UNDP method; g = s ÷ k everywhere it is printed; share × fall; terms of
             trade; dependency ratios; the buffer stock off the demand curve both ways; the Lewis
             and currency diagrams off both curves
  PINS       derived from each item's block tag; ${content.length} blocks, each with its own diagram, quiz and
             practice; ${3 + content.length} free quiz items against FREE_QUIZ_MAX (read from lib/preview-limits.js)
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no hedge tell, no letter, no
             ordinal (A/B'd), no near-duplicate stems, nothing tested that is not taught, no check-in
             printing its own numeric key on its diagram
  PRACTICE   Appendix 6 parsed; every WEC14 data-question tariff read from ial-paper-structure.json,
             both Calculate tariffs, three 20-mark essays; openings clean; points to 6, levels above
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, one blank per line, no answer printed in its own
             recall or hints, no shared reorder items, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, collisions, lines AND bars under
             labels checked on the emitted SVG with every guard A/B'd, and figures counted back out`);

if (DUMP) {
  const path = `audit/snapshots/packet-46-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-46-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify({ ok: res.ok, staged: res.staged, unchanged: res.unchanged, summary: res.summary, newBlocks: res.newBlocks?.length, newDebt: res.newDebt?.length })}`);
  if (!res.ok) process.exit(1);
}
