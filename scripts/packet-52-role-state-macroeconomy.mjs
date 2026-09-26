#!/usr/bin/env node
/**
 * PACKET 52 — role-state-macroeconomy, Economics Unit 4 (WEC14), IAL topic 4.3.5.
 * `audit/raw/econ_spec.txt:1824-1893`. SEVEN blocks, thirty-five subsections, 38 substantive leaves.
 *
 *   node scripts/packet-52-role-state-macroeconomy.mjs            # dry run, every check
 *   node scripts/packet-52-role-state-macroeconomy.mjs --dump     # + write the bundle
 *   node scripts/packet-52-role-state-macroeconomy.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Packet 46's runner, adapted; what this packet adds:
 *
 *   - **THE LIVE SECTION'S OFF-SPEC CONTENT IS REFUSED ON THE DOCUMENT.** Public goods (1.3.5),
 *     moral hazard (1.3.5), tax incidence (1.3.4) are asserted PRESENT in the specification at the
 *     line that owns them and outside 4.3.5; merit goods, universal basic income, the loanable funds
 *     market, credit ratings and "inflation risk" are asserted ABSENT from the whole document. All
 *     are banned from the section, each ban A/B'd.
 *   - **THE SECTION-4 LEAVES ARE COUNTED FROM THE ORACLE, NOT FROM spec-coverage.json**, which never
 *     scored 4a-4e for this section (brief §4.3). 4b (2008) and 4d, which no ledger item names, are
 *     mapped and their words found in the mapped subsections.
 *   - **EVERY DEFICIT, DEBT, TAX AND TRANSFER-PRICING FIGURE IS RE-DERIVED**, including the figures
 *     printed in recalls, quiz stems and practice items, from the numbers in their own text.
 *   - **EVERY AD/AS EQUILIBRIUM IS CHECKED ON BOTH ITS CURVES**, and the direction each diagram
 *     claims (output up or down, price level up or down) is asserted from the geometry.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, round1, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
  SPENDING_REASONS, SPENDING_SIGNIFICANCE, TAX_EFFECTS, DEBT_SIGNIFICANCE, POLICY_TOOLS, POLICY_AIMS, POLICY_PROBLEMS,
} from './_packet52-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
} from './_packet52-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet52-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD, ADAS, CROWD, TAXSHIFT, POLICY } from './_packet52-diagrams.mjs';

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
  for (const bad of ['a deficit of undefinedbn', 'debt is NaN%', 'the tax [object Object]', 'revenue of ' + '${bn(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['an undertaking by the state', 'the object of the tax', 'a deficit of $16bn']) {
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
    [0, 'lighthouses are public goods', 'public services are provided'],
    [0, 'the free-rider problem', 'a free ride on the bus'],
    [1, 'health care is a merit good', 'on its merits'],
    [2, 'bailouts create moral hazard', 'a moral duty'],
    [3, 'the incidence of the tax falls on consumers', 'the incident was reported'],
    [4, 'a universal basic income', 'universal health coverage'],
    [5, 'the market for loanable funds', 'funds lent to firms'],
    [6, 'a downgrade in its credit rating', 'credit to firms'],
    [7, 'a poverty trap', 'a policy trap'],
    [8, 'the Marshall-Lerner condition', 'the marshalling yard'],
    [9, 'the short-run Phillips curve', 'the Laffer curve'],
    [10, 'Assess the impact of the tax. (10 marks)', 'an assessment of the arguments'],
    [10, 'Outline two roles of fiscal policy.', 'the outline of the diagram'],
    [10, 'Distinguish between a deficit and a debt.', 'the distinction between a deficit and a debt'],
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
ban(/\bF0\d\d\b|\bC-role-state-macroeconomy-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  const qe = POINTER_ONLY[3];
  if (!qe.mustCite.test('quantitative easing, an instrument explained in topic 2.3.6')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (qe.mustCite.test('Central banks used quantitative easing.')) problems.push('the pointer-cite check accepts an uncited mention');
  if (!POINTER_ONLY[1].re.test('a tariff on rice')) problems.push('the tariff pointer no longer matches "a tariff"');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* 1a */
  a(E.spending === 24 + 84 + 52 && E.spending === 160, 'public expenditure is not capital + current + transfers');
  a(E.spendingShare === 40 && near(E.spending / E.gdp * 100, 40), 'spending is not 40% of GDP');
  /* 3a-1, 3a-3 */
  a(E.deficit === E.spending - E.revenue && E.deficit === 16, 'the deficit is not spending minus revenue');
  a(E.deficitShare === 4, 'the deficit is not 4% of GDP');
  a(E.debtNext === E.debt + E.deficit && E.debtNext === 256, 'next year\'s debt is not debt + deficit');
  a(E.debtAfterSurplus === E.debtNext - E.surplus && E.debtAfterSurplus === 250, 'the surplus does not repay debt');
  a(E.debtShare === 60, 'the debt is not 60% of GDP');
  /* 3a-2, 3a-4 */
  a(E.stabiliserSwing === E.recessionRevenueFall + E.recessionTransferRise && E.stabiliserSwing === 12, 'the stabiliser swing is not revenue fall + transfer rise');
  a(E.recessionDeficit === E.structural + E.cyclical && E.recessionDeficit === 28, 'actual deficit is not structural + cyclical');
  a(E.cyclical === E.stabiliserSwing, 'the cyclical deficit is not the stabilisers\' swing');
  a(E.recessionDeficitShare === 7 && E.structuralShare === 4 && E.cyclicalShare === 3, 'the recession shares of GDP are wrong');
  /* 3c-2 */
  a(E.interest === 12 && near(E.interest, E.debt * E.rate / 100), 'debt interest is not debt × rate');
  a(E.interestOfRevenue === round1(12 / 144 * 100) && E.interestOfRevenue === 8.3, 'interest share of revenue is not 12 ÷ 144');
  a(E.interestHigh === 16.8 && E.interestHighOfRevenue === 11.7, 'the higher-rate interest bill is not 240 × 7%');
  /* 1c-2 */
  a(E.netAddition === E.stimulus - E.investmentLost && E.netAddition === 12 && E.crowdedShare === 40, 'crowding out: net addition or share is wrong');
  a(near(CROWD.net, CROWD.full * (1 - 0.4)) && CROWD.full === 50, 'the crowding-out diagram does not keep 60% of the shift, as the figures do');
  /* 2b — the income tax, band by band, recomputed here and not read from the util */
  const tax = (y) => Math.max(0, Math.min(y, 25000) - 5000) * 0.1 + Math.max(0, y - 25000) * 0.3;
  a(JSON.stringify(E.progTax) === JSON.stringify([tax(10000), tax(50000), tax(100000)]) && JSON.stringify(E.progTax) === '[500,9500,24500]', `income tax ${E.progTax} is not the bands applied`);
  a(JSON.stringify(E.progAvg) === '[5,19,24.5]', `average rates ${E.progAvg} are not 5, 19, 24.5`);
  a(E.progAvg[0] < E.progAvg[1] && E.progAvg[1] < E.progAvg[2], 'the income tax is not progressive');
  a(JSON.stringify(E.salesTax) === '[900,3000,4000]' && JSON.stringify(E.salesAvg) === '[9,6,4]', 'the sales tax figures are not 10% of spending');
  a(E.salesAvg[0] > E.salesAvg[1] && E.salesAvg[1] > E.salesAvg[2] && E.salesTax[2] > E.salesTax[0], 'the sales tax is not regressive-with-more-dollars');
  a(JSON.stringify(E.salesExtra) === '[450,1500,2000]' && JSON.stringify(E.salesExtraShare) === '[4.5,3,2]', 'the VAT rise figures are wrong');
  /* 2c-1 */
  a(E.keptBefore === 700 && E.keptAfter === 600, 'take-home from an extra $1,000 is not 70% and 60%');
  /* 2c-2 — the Laffer curve */
  a(E.laffer(0) === 0 && E.laffer(100) === 0 && E.lafferMax === 100 && [10, 20, 30, 40, 60, 70, 80, 90].every((r) => E.laffer(r) < E.lafferMax), 'the Laffer curve does not peak at 50%');
  a(JSON.stringify(E.lowCutRevenue) === '[84,51]' && JSON.stringify(E.highCutRevenue) === '[51,84]', 'the Laffer cut revenues are wrong');
  a(E.lowCutRevenue[1] < E.lowCutRevenue[0] && E.highCutRevenue[1] > E.highCutRevenue[0], 'the Laffer cuts do not go the way the captions say');
  /* 2c-6, 2c-7 */
  a(E.importsUp === 3, 'imports up is not 10 × 0.3');
  a(E.fdiReturnBefore === 15 && E.fdiReturnAfter === 17, 'post-tax returns are not 20 × 75% and 20 × 85% on 100');
  /* 4c-2 — transfer pricing */
  a(E.taxArms === 12 && E.taxRigged === 3.25 && E.taxLostH === 10.5, `transfer pricing tax figures ${E.taxArms}/${E.taxRigged}/${E.taxLostH} are wrong`);
  a(E.profitH(E.rigged) + E.profitL(E.rigged) === E.profitH(E.armsLength) + E.profitL(E.armsLength), 'the TNC\'s total profit changes with the transfer price — it must not');
  /* AD/AS: every labelled equilibrium on both curves, and the directions claimed */
  const onBoth = (s, k) => { const e = ADAS.eq(s, k); return near(ADAS.ad(s)(e.y), e.p, 1e-9) && near(ADAS.sras(k)(e.y), e.p, 1e-9); };
  for (const [s, k] of [[0, 0], [CROWD.net, 0], [CROWD.full, 0], [TAXSHIFT.cut, 0], [0, TAXSHIFT.vat], [POLICY.base, 0], [POLICY.oilBase, 0], [POLICY.oilBase, POLICY.oil]]) a(onBoth(s, k), `the AD/AS point (s=${s}, k=${k}) is not on both curves`);
  const e0 = ADAS.eq(0, 0);
  a(ADAS.eq(CROWD.net, 0).y > e0.y && ADAS.eq(CROWD.net, 0).y < ADAS.eq(CROWD.full, 0).y, 'crowding out: Y₂ is not between Y₀ and Y₁');
  a(ADAS.eq(TAXSHIFT.cut, 0).y > e0.y && ADAS.eq(TAXSHIFT.cut, 0).p > e0.p, 'the income tax cut does not raise output and the price level');
  a(ADAS.eq(0, TAXSHIFT.vat).y < e0.y && ADAS.eq(0, TAXSHIFT.vat).p > e0.p, 'the indirect tax rise does not raise prices and cut output');
  a(ADAS.eq(POLICY.oilBase, POLICY.oil).y < ADAS.eq(POLICY.oilBase, 0).y && ADAS.eq(POLICY.oilBase, POLICY.oil).p > ADAS.eq(POLICY.oilBase, 0).p, 'the oil shock does not raise prices and cut output');
  /* the recall, quiz and practice arithmetic, recomputed from the numbers the items print */
  a(20 + 70 + 30 === 120 && 120 / 400 * 100 === 30 && 90 / 400 * 100 === 22.5, 'quiz: 20 + 70 + 30 over 400 is not 30%');
  a(15 / 50 * 100 === 30, 'quiz: 15 ÷ 50 is not 30%');
  a(500 * 0.7 === 350 && 500 * 0.8 === 400, 'quiz: $500 at 30% and 20% marginal rates');
  a(round2(400 / 10000 * 100) === 4 && round2(1000 / 50000 * 100) === 2, 'quiz: the 4% and 2% regressive shares');
  a(40 * 0.2 === 8, 'quiz: 40 × 0.2 is not 8');
  a(10 * 0.7 === 7 && 10 * 0.8 === 8, 'quiz: $10m at 30% and 20% corporation tax');
  a(500 + 30 === 530 && 300 * 6 / 100 === 18, 'quiz: debt 500 + 30, or 300 × 6%');
  a(20 * 0.25 === 5, 'recall: $20bn × 0.25 is not $5bn');
  a(210 - 190 === 20 && 20 / 500 * 100 === 4 && 215 > 210, 'recall: the budget figures');
  a(300 + 25 === 325, 'recall: 300 + 25 is not 325');
  a(500 * 4 / 100 === 20 && 20 / 160 * 100 === 12.5, 'recall: 500 × 4% or 20 ÷ 160');
  a(round2(1600 / 20000 * 100) === 8 && round2(2400 / 60000 * 100) === 4 && round2(3000 / 150000 * 100) === 2, 'recall: the regressive shares 8, 4, 2');
  a(tax(40000) === 6500 && round2(6500 / 40000 * 100) === 16.25, 'practice Calculate (2): $40,000 does not pay $6,500 = 16.25%');
  a(tax(20000) === 1500 && tax(80000) === 18500 && round1(18500 / 80000 * 100) === 23.1 && 1500 / 20000 * 100 === 7.5, 'practice Calculate (4): the two average rates');
  /* the Laffer recall: a curve peaking at 40% */
  const l40 = (r) => r * (80 - r);
  a(l40(20) < l40(25) && l40(60) > l40(70) && l40(40) > l40(41), 'recall: the 40%-peak predictions are wrong');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 7) problems.push(`${content.length} blocks, not 7`);
  if (SUBSECTIONS.length !== 35) problems.push(`${SUBSECTIONS.length} subsections, not 35`);
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
  /* the taxonomy is the specification's own order (topFix-01, structure-04) */
  const want = ['Public Expenditure', 'Public Spending as a Share of GDP', 'Taxes: Types, Incentives and Revenue', 'Tax Changes and the Macroeconomy', 'Fiscal Deficits and the National Debt', 'Macroeconomic Policies in Use', 'TNCs and the Limits of Policy'];
  if (JSON.stringify(BLOCKS) !== JSON.stringify(want)) problems.push(`the chapters are not the specification's order: ${BLOCKS.join(' | ')}`);
  /* topFix-01 / accuracy-01: no block or subsection title from market failure */
  if (/Market Failure|Public Goods|Merit|Income Redistribution Policies/i.test(JSON.stringify([BLOCKS, SUBSECTIONS.map((s) => s.title), NOTES.map((n) => n.title)]))) problems.push('topFix-01: a live off-spec block or notes title survives');
  /* structure-05: the policy material is a whole chapter, and all five tools are taught */
  const toolkit = SUBSECTIONS.find((s) => s.id.endsWith(':the-five-policy-tools'));
  const toolText = JSON.stringify(toolkit?.body || []).toLowerCase();
  for (const tool of ['fiscal policy', 'monetary policy', 'exchange-rate policy', 'supply-side policies', 'direct controls']) if (!toolText.includes(tool)) problems.push(`structure-05 / specGap-09: the toolkit subsection does not teach "${tool}"`);
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE NUMBERING, RE-READ FROM THE DOCUMENT ═══ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '4.3.5');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 47 || leaves.length !== 38) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 4.3.5, not 47 / 38`);
  const sec4 = leaves.filter((l) => /^ECON-4\.3\.5-4/.test(l.id));
  if (sec4.length !== 14) problems.push(`the oracle holds ${sec4.length} section-4 leaves, not 14`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 4.3.5 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words — the oracle's wording, a second method */
  const SKIP = new Set(['changes', 'between', 'distinction', 'impact', 'different', 'economies', 'continued', 'examples', 'significance', 'levels']);
  for (const leaf of leaves) {
    const wording = leaf.wording.replace(/\(continued\)/, '');
    const words = wording.toLowerCase().replace(/[^a-z -]/g, ' ').split(/\s+/).filter((w) => w.length > 4 && !SKIP.has(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase()).join(' ');
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${wording.trim()}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the specification's own lists, in its own words, match the util's copies */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const span = spec.slice(1823, 1893).join(' ').replace(/[•]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...SPENDING_REASONS, ...SPENDING_SIGNIFICANCE, ...TAX_EFFECTS, ...DEBT_SIGNIFICANCE, ...POLICY_TOOLS, ...POLICY_AIMS, ...POLICY_PROBLEMS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and econ_spec.txt:1824-1893 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: econ_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1824, '4.3.5 The role of the state in the macroeconomy');
  at(1828, '1 Public expenditure');
  at(1840, '2 Taxation');
  at(1853, '3 Public sector');
  at(1873, '4 Macroeconomic');
  at(1880, 'crisis of 2008');
  at(732, 'non-provision of public goods');
  at(713, 'incidence of indirect taxes');
  at(781, 'Moral hazard');
  at(1143, 'Phillips');
  at(1185, 'quantitative');
  at(1720, '2 Exchange rates');
  at(1788, '4.3.4 Poverty and inequality');
  at(1530, 'minimum wage');
  at(1078, 'The multiplier');
  at(1683, '5 Restrictions on');
  /* the words the bans rest on are measured, not remembered */
  const body = spec.join('\n').toLowerCase();
  for (const w of ['merit good', 'universal basic', 'loanable', 'credit rating', 'inflation risk', 'poverty trap', 'wagner', 'ricardian', 'liquidity trap']) if (body.includes(w)) problems.push(`"${w}" occurs in econ_spec.txt after all — the ban rests on it being absent`);
  /* "Distinguish between" (topFix-04's proposal) is in the document once, as a quantitative-skills
     worked-example label; Appendix 6, the command-word table, does not list it */
  if (/distinguish/i.test(spec.slice(2695, 2750).join(' '))) problems.push('"Distinguish" appears in Appendix 6 after all — the ban rests on it not being a command word');
  if (!spec.some((l) => /QS10 Distinguish between/.test(l))) problems.push('the one "Distinguish between" in econ_spec.txt is not the QS10 label the ban says it is');
  /* the owned-elsewhere words occur in the document, and none of them inside 4.3.5 */
  for (const [w, owner] of [['public goods', 732], ['moral hazard', 781], ['incidence', 713]]) {
    const hits = spec.map((l, i) => (l.toLowerCase().includes(w) ? i + 1 : 0)).filter(Boolean);
    if (!hits.includes(owner)) problems.push(`"${w}" is not at econ_spec.txt:${owner}, where the ban says it is owned`);
    if (hits.some((n) => n >= 1824 && n <= 1893)) problems.push(`"${w}" occurs inside 4.3.5 (econ_spec.txt:${hits.join(', ')}) — the ban would refuse a real requirement`);
  }
  /* "2008" occurs in the specification exactly once, at 4b */
  const y2008 = spec.map((l, i) => (/2008/.test(l) ? i + 1 : 0)).filter(Boolean).filter((n) => n < 2600);
  if (JSON.stringify(y2008) !== '[1880]') problems.push(`"2008" occurs at econ_spec.txt:${y2008.join(', ')}, not only at 4b (:1880)`);
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
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|birthday|dollar|earner|earners)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' ').replace(/\btop rate\b/gi, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'Only the last of these is a tax.', 'The former is a flow and the latter a stock.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['The tax on the last dollar earned is the marginal rate.', 'Cutting the top rate of income tax widens the gap.']) if (offends(s)) problems.push(`the ordinal ban fires on a legitimate reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* nothing may be quizzed that no subsection teaches (structure-01) */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['transfer payment', 'capital expenditure', 'current expenditure', 'changing age distributions', 'changing expectations', 'changing incomes', 'crowding out', 'interest rates', 'productivity', 'indirect tax', 'direct tax', 'regressive', 'progressive', 'proportional', 'marginal rate', 'revenue-maximising', 'tax-free allowance', 'short-run aggregate supply', 'spare capacity', 'marginal propensity to import', 'corporation tax', 'fiscal surplus', 'fiscal deficit', 'automatic stabiliser', 'structural', 'cyclical', 'direct control', 'supply shock', 'human capital', 'external shock', 'inaccurate information', 'risks and uncertainties', 'transfer pric', 'arm\'s-length', 'tax avoidance', 'tax evasion', 'emerging economies', 'benefit claims'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')} ${q.explanation}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  /* the twelve topics the live bank tested untaught (structure-01) are each taught in prose now */
  for (const term of ['transfer payments', 'laffer curve', 'national debt', 'automatic stabilisers', 'crowding out', 'structural deficit', 'transfer pricing', 'global financial crisis of 2008', 'inaccurate information', 'regressive']) if (!teaching.includes(term)) problems.push(`structure-01: "${term}" is not taught in any subsection's prose`);
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea]).join(' ').toLowerCase();
    const onTopic = items.some((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`no quiz item pinned to "${b.title}" shares substantive vocabulary with the chapter`);
  }
  /* A CHECK-IN MAY NOT PRINT ITS OWN KEY: a numeric key found on its block's diagram */
  const numsIn = (s) => new Set((String(s).match(/\$?\d+(?:\.\d+)?(?:%|bn|m)?/g) || []));
  content.forEach((b, bi) => {
    const d = DIAGRAMS[bi];
    const shown = numsIn([...svgOf(d).map((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' ')), ...(d.checklist || []), d.title, d.description].join(' '));
    for (const qi of b.quizIndices) {
      const key = QUIZ[qi].options[QUIZ[qi].correctIndex];
      if (/^\s*\$?[\d.]+(?:%|bn|m)?\s*$/.test(key) && shown.has(key.trim())) problems.push(`the "${b.title}" check-in prints its own key "${key}" on its diagram (quiz ${qi})`);
    }
  });
  {
    const shown = numsIn('Debt $240bn and a deficit of 4%');
    if (!shown.has('$240bn') || !shown.has('4%')) problems.push('the printed-key check does not read numbers off the diagram text');
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
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points (topFix-04)`);
    if (p.marks > 6 && !/\bLevel 1\b/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance has no level descriptors (topFix-04)`);
    const ALLOCATES = /\(\s*\d+\s*marks?\s*\)|\b(One|Two|Three|Four) marks? for\b/;
    if (p.marks <= 6 && !ALLOCATES.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
  }
  for (const cmd of ['Define', 'Calculate', 'Explain', 'Analyse', 'Examine', 'Discuss', 'Evaluate']) if (!seen.has(cmd)) problems.push(`no practice item uses the command word ${cmd}`);
  for (const m of TARIFFS.Calculate) if (!PRACTICE.some((p) => p.command === 'Calculate' && p.marks === m)) problems.push(`no Calculate at ${m} marks`);
  if (PRACTICE.some((p) => p.command === 'Define' && p.marks !== 2)) problems.push('practice-01 regressed: a Define carries a tariff other than 2');
  if (PRACTICE.some((p) => /\bOutline\b|\bAssess\b|\bDistinguish\b/.test(`${p.command} ${p.question}`))) problems.push('an Outline, Assess or Distinguish item survived (topFix-04)');
  /* practice-01: the Define no longer rewards uses of the term */
  const define = PRACTICE.find((p) => p.command === 'Define');
  if (/expansionary|contractionary|supply-side/i.test(define.guidance)) problems.push('practice-01: the Define guidance still awards marks for uses of the term');
}

/* ══ 8 · RECALLS ════════════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.map((s) => [s, s.recall]).filter(([, r]) => r);
  if (recalls.length !== SUBSECTIONS.length) problems.push(`${recalls.length} recalls over ${SUBSECTIONS.length} subsections (structure-03)`);
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
      const printedNums = new Set((`${r.prompt} ${r.template.join(' ')}`.replace(/_{3,}/g, ' ').match(/\$?\d+(?:[.,]\d+)?(?:%|bn)?/g) || []));
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
  /* topFix-03 named four recalls; each is present, as the type it asked for or the one the contract gives it */
  const byId = (slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))?.recall;
  if (byId('crowding-out')?.type !== 'reorder') problems.push('topFix-03: the crowding-out recall is not a reorder');
  /* Fix round B1 (verify-b.md step 18): as a reorder, "tax receipts fall" and "benefit claims rise" were parallel
   * effects of the job losses, so two orders were defensible. CONTENT-GATE Layer 1a rule 2 makes that a
   * classify, not a reworded reorder; the classify tests the leaf's own distinction (automatic vs discretionary). */
  {
    const r = byId('automatic-stabilisers-and-discretionary-policy');
    if (r?.type !== 'classify' || JSON.stringify(r.groups.map((g) => g.name)) !== '["Automatic stabiliser","Discretionary policy"]') problems.push('topFix-03 / fix B1: the automatic-stabiliser recall is not the automatic-vs-discretionary classify');
  }
  /* Fix round B1 (verify-b.md step 23): a hiring freeze is a cut in public spending, so it met the Fiscal group's rule */
  if (/hiring|pay freeze|freeze on (public|civil)/i.test(JSON.stringify(byId('reducing-fiscal-deficits-and-debt')?.groups?.find((g) => g.name !== 'Fiscal policy')))) problems.push('fix B1: a public-pay or hiring freeze is sorted outside Fiscal policy');
  /* Fix round B1 (verify-b.md step 27): the transfer-pricing reorder's middle pair (profit low in H, high in L) was simultaneous */
  if (byId('regulation-of-transfer-pricing')?.type === 'reorder') problems.push('fix B1: the transfer-pricing recall is a reorder again; its middle pair is simultaneous');
  if (JSON.stringify(byId('fiscal-deficit-and-national-debt')?.answers?.slice(0, 2)) !== '["flow","stock"]') problems.push('topFix-03: the deficit/debt fill-in does not ask for flow and stock');
  if (JSON.stringify([...(byId('progressive-proportional-regressive')?.answers || [])].sort()) !== '["progressive","proportional","regressive"]') problems.push('topFix-03: the tax-structure fill-in does not ask for the three structures');
  {
    const planted = { prompt: 'x', template: ['It borrows $16bn and owes ___.'], answers: ['$16bn'], hints: ['h'] };
    const nums = new Set((`${planted.prompt} ${planted.template.join(' ')}`.replace(/_{3,}/g, ' ').match(/\$?\d+(?:[.,]\d+)?(?:%|bn)?/g) || []));
    if (!nums.has('$16bn')) problems.push('the printed-answer fill-in check does not see a figure printed in the template');
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
    if (/^Wrong\b|Instead write:/i.test(s.misconception)) problems.push(`${where}: the misconception uses the generated "Wrong — … Instead write:" template`);
  }
  for (const b of content) b.takeaway.forEach((t) => { if (t.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${t.slice(0, 40)}"`); });
  /* structure-06 / structure-07: nothing off-spec is headlined, and the misconceptions are 4.3.5's own */
  const takeaways = content.flatMap((b) => b.takeaway).join(' ');
  if (/basic income|merit|public good/i.test(takeaways)) problems.push('structure-06: an off-spec idea is headlined in a takeaway');
  const miscon = SUBSECTIONS.map((s) => s.misconception).join(' ').toLowerCase();
  for (const want of ['only a surplus reduces the debt', 'regressive', 'crowding out', 'discretionary']) if (!miscon.includes(want)) problems.push(`structure-07: no misconception addresses "${want}"`);
  /* structure-05: every takeaway term must be taught in its block's subsections */
  const TAKEAWAY_TERMS = ['capital', 'transfers', 'crowding out', 'interest rates', 'laffer', 'progressive', 'sras', 'fdi', 'imports', 'surplus', 'stabilisers', 'cyclical', 'structural', '2008', 'arm\'s-length', 'minimum tax'];
  for (const b of content) {
    const hay = b.sections.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((x) => [x.text, ...(x.items || []), ...(x.steps || []).map((y) => y.title)])]).join(' ').toLowerCase();
    for (const t of b.takeaway) for (const term of TAKEAWAY_TERMS) if (t.toLowerCase().includes(term) && !hay.includes(term)) problems.push(`"${b.title}" takeaway names "${term}" and no subsection in the block teaches it`);
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
  /* structure-08: the untaught flashcard terms and the typo are gone */
  if (FLASHCARDS.some((f) => /demerit|moral hazard|principal of|canons? of taxation/i.test(`${f.front} ${f.back}`))) problems.push('structure-08: an untaught flashcard term survives');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) {
    if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
    if (!e.title) problems.push(`extras evaluation ${i + 1} has no title`);
  }
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(?!2008\b)(19|20)\d\d\b/g, 'a year other than 2008 — a dated assertion cannot be checked by this programme');
  ban(/\b\d{4}s\b/g, 'a decade — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b|\bEngland\b/g, 'a UK frame (locale.uk, topFix-05)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bcouncil housing\b|\bthe Chancellor\b|\bUniversal Credit\b/g, 'a UK-only institution (locale.institution, topFix-05)');
  /* topFix-05: the 20/40/45 bands, the age-18 rule and the zero lower bound claim are gone */
  ban(/\b20%, 40% and 45%|\b40% and 45%|age of 18|cannot fall below zero/g, 'topFix-05: a live UK-only or ECB-contradicting sentence is back');
  /* 2008 occurs only where 4b is taught, assessed or pointed at */
  const with2008 = readable.filter((s) => /\b2008\b/.test(s));
  if (!with2008.length) problems.push('4b: 2008 is not named anywhere');
  for (const s of with2008) if (!/financial crisis|crisis of 2008|2008 crisis|events of 2008|2008 and the response/i.test(s)) problems.push(`"2008" appears outside the financial-crisis context: "${s.slice(0, 80)}"`);
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
    if (/loanable|incidence/i.test(`${d.title} ${d.description}`)) problems.push(`"${d.title}": specGap-12 / topFix-02 — a refused diagram is back`);
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
    if (!collides(mk('AD₁', 140, 100, 12), mk('AD₂', 140, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('AD₁', 140, 100, 12), mk('AD₂', 140, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * 12)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('SRAS', 188, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    if (!crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mk('output', 120, 196, 12))) problems.push('the line check does not see a label on a sloping curve');
    if (crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mk('output', 120, 80, 12))) problems.push('the line check fires on a label clear of the curve');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mk('SRAS', 170, 140, 12))) problems.push('the path reader does not turn a straight curve into a segment the line check can see');
    if (!onRect({ x: 182, y: 50, w: 100, h: 18 }, mk('$16bn', 200, 63, 12))) problems.push('the bar check does not see a label drawn over a bar');
    if (onRect({ x: 182, y: 50, w: 100, h: 18 }, mk('$16bn', 288, 63, 12))) problems.push('the bar check fires on a value placed past the bar\'s end');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, ['$24bn', '$84bn', '$52bn', '$160bn', '40%'], 'public expenditure');
  want(1, ['AD₀', 'AD₁', 'AD₂', 'Y₂', '$20bn', '$8bn', '$12bn', '4%', '5%'], 'crowding out');
  want(2, ['Peak', '$84bn', '$51bn', '50%', '19%', '24.5%', '9%', '4%'], 'tax');
  want(3, ['AD₁', 'SRAS₁', 'P₁'], 'tax changes');
  want(4, ['$240bn', '$256bn', '$250bn', '$28bn'], 'deficit and debt');
  want(5, ['AD₁', 'SRAS₁'], 'policy');
  want(6, ['$40m', '$35m', '$3.25m', '$12m', '$10.5m'], 'transfer pricing');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const mech = (slug, words) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); if (!s) { problems.push(`no subsection ${slug}`); return; } const hay = [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase(); for (const w of words) if (!hay.includes(w)) problems.push(`${slug}: the mechanism word "${w}" is missing`); };
  mech('types-of-public-expenditure', ['capital expenditure', 'current expenditure', 'transfer payments']);                 // specGap-01
  mech('changing-incomes', ['changing incomes', 'health']);                                                                     // specGap-02
  mech('changing-age-distributions', ['changing age distributions', 'pensions']);                                              // specGap-02
  mech('changing-expectations', ['changing expectations']);                                                                     // specGap-02
  mech('spending-productivity-growth', ['productivity and growth', 'infrastructure']);                                          // specGap-03
  mech('crowding-out', ['crowding out', 'interest rates', 'private investment']);                                               // specGap-03
  mech('spending-and-tax-levels', ['levels of taxation', 'borrow']);                                                           // specGap-03
  mech('progressive-proportional-regressive', ['progressive', 'proportional', 'regressive', 'average rate']);                   // specGap-04
  mech('incentives-to-work', ['marginal', 'incentives to work']);                                                               // specGap-05
  mech('laffer-curve', ['laffer curve', 'tax base', 'peak']);                                                                    // specGap-05
  mech('tax-income-distribution', ['income distribution', 'progressive', 'regressive']);                                       // specGap-05
  mech('tax-output-employment', ['real output and employment', 'aggregate demand']);                                            // specGap-05
  mech('tax-price-level', ['the price level', 'short-run aggregate supply']);                                                   // specGap-05
  mech('tax-trade-balance', ['trade balance', 'imports']);                                                                       // specGap-05
  mech('tax-fdi-flows', ['fdi flows', 'corporation tax']);                                                                       // specGap-05
  mech('automatic-stabilisers-and-discretionary-policy', ['automatic stabilisers', 'discretionary fiscal policy']);             // specGap-06
  mech('fiscal-deficit-and-national-debt', ['flow', 'stock', 'national debt']);                                                 // specGap-07, specThin-02
  mech('structural-and-cyclical-deficits', ['structural deficit', 'cyclical deficit']);                                          // specGap-07
  mech('factors-influencing-deficits-and-debt', ['economic cycle', 'interest rates', 'shocks']);                                // specGap-08
  mech('interest-rates-and-debt-servicing', ['impact on interest rates', 'debt servicing']);                                     // specGap-08
  mech('intergenerational-equity', ['intergenerational equity', 'future taxpayers']);                                            // specGap-08
  mech('the-five-policy-tools', ['exchange-rate policy', 'direct controls']);                                                    // specGap-09
  mech('controlling-tncs-tax-avoidance', ['tax avoidance', 'minimum tax']);                                                      // specGap-10
  mech('regulation-of-transfer-pricing', ['transfer price', 'arm\'s-length principle']);                                        // specGap-10
  mech('limits-to-controlling-tncs', ['limits to government ability to control tncs', 'mobility']);                             // specGap-10
  mech('inaccurate-information-risks-uncertainties', ['inaccurate information', 'risks and uncertainties']);                   // specGap-11
  mech('inability-to-control-external-shocks', ['inability to control external shocks']);                                      // specGap-11
  mech('fiscal-deficits-and-surpluses', ['fiscal deficit', 'fiscal surplus']);                                                   // specThin-01
  mech('global-financial-crisis-2008', ['global financial crisis of 2008', 'demand-side policies']);                            // 4b, no ledger id
  mech('impact-of-policy-changes', ['local economies', 'national economies', 'the global economy']);                            // 4d, no ledger id
  /* flows are unique — no chain taught twice */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => (typeof x === 'object' ? x.title : x)).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '4.3.5' || ctx.unitCode !== 'WEC14') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 4.3.5 / WEC14`);
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

console.log(`\n${SECTION} — packet 52`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${coverage?.detail || 'no spec.coverage finding'}`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  spine:  spending ${bn0(E.spending)} = ${E.spendingShare}% of GDP · deficit ${E.deficit} · debt ${E.debt} → ${E.debtNext} · recession ${E.structural} + ${E.cyclical} = ${E.recessionDeficit} · interest ${E.interest} · transfer pricing tax ${E.taxArms} → ${E.taxRigged}`);
console.log(`  pins:   quiz ${JSON.stringify(Object.values(quizIndices))} · practice ${JSON.stringify(Object.values(practiceIndices))}`);
for (const f of carried) console.log(`  carried ${f.tier} ${f.rule} ${f.where}: ${String(f.detail).slice(0, 100)}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);
function bn0(n) { return `$${n}bn`; }

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }

console.log(`
packet checks
  SCOPE      4.3.5 only; public goods, moral hazard and incidence (owned by 1.3.5 / 1.3.4) and merit
             goods, UBI, loanable funds, credit ratings and inflation risk (0 hits) banned — each A/B'd,
             the owned ones found at their owning line and outside 4.3.5, the rest grepped ABSENT;
             4.3.4, 4.3.2, 4.3.3, 2.3.6, 2.3.4 and 3.3.5 pointed at within a budget, every pointer cited
  NUMBERING  the oracle re-read (47 rows / 38 leaves, 14 in section 4), every leaf mapped and its
             own words found in the mapped subsection, the spec's seven lists matched to :1824-1893,
             sixteen lines asserted, "2008" found once in the spec and used only for 4b
  ARITHMETIC spending, deficit, debt, stabilisers, structural/cyclical, interest, crowding out, the
             income tax band by band, the sales tax, Laffer, imports, FDI returns, transfer pricing;
             every AD/AS equilibrium on both curves and every direction asserted
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
  const path = `audit/snapshots/packet-52-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-52-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify({ ok: res.ok, staged: res.staged, unchanged: res.unchanged, summary: res.summary, newBlocks: res.newBlocks?.length, newDebt: res.newDebt?.length })}`);
  if (!res.ok) process.exit(1);
}
