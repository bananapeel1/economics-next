#!/usr/bin/env node
/**
 * PACKET 48 — government-intervention-firms, Economics Unit 3 (WEC13), IAL topic 3.3.5.
 * `audit/raw/econ_spec.txt:1485-1535`. SIX blocks, twenty-eight subsections, 33 oracle leaves.
 *
 *   node scripts/packet-48-government-intervention-firms.mjs            # dry run, every check
 *   node scripts/packet-48-government-intervention-firms.mjs --dump     # + write the bundle
 *   node scripts/packet-48-government-intervention-firms.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. It is packet 45's runner with this section's checks.
 * What this packet adds, with the reason:
 *
 *   - **THE SECTION OWNS WHAT PACKET 45 SENT IT.** The minimum wage in either market, maximum wages,
 *     immobility measures and discrimination (3.3.5 · 2b) are TAUGHT here; the neighbours this section
 *     leans on — the monopsony construction (3.3.3 · 7), contestable markets (3.3.3 · 8), the causes of
 *     immobility (3.3.4 · 4) — are pointed at within a budget, each mention carrying its topic number.
 *   - **THE DIAGRAM GEOMETRY IS READ BACK OUT OF THE SVG** (accuracy-02, accuracy-03): every marked point
 *     must sit on a drawn curve, the MR = MC dot must sit where the MR and MC lines actually cross, the
 *     natural monopoly's AC must fall at every sampled point, and no view of the privatisation diagram
 *     draws a supply curve.
 *   - **EVERY OUTCOME IS SOLVED OFF BOTH CURVES** (packet 34's two-sources rule), independently of the
 *     util's own solvers.
 *   - **THE PRACTICE SET IS THE WEC13 PAPER'S SHAPE**, read out of `audit/raw/ial-paper-structure.json`,
 *     and Appendix 6 is PARSED out of the specification rather than imported.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, NAT, TEL, CEM, LAB, MON, TOP, money, k, h, pct, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
  MONOPOLY_MEASURES, COMPETITION_MEASURES, PROTECTION_MEASURES, IMPACTS, LIMITS, LABOUR_MEASURES,
} from './_packet48-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
} from './_packet48-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet48-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD } from './_packet48-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

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
  for (const bad of ['a cap of $undefined a unit', 'output of NaN', 'the firm [object Object] charges', 'costs ' + '${N.mc}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['a Nash equilibrium is not this model', 'the object of regulation is the price', 'a cap of $40 a unit']) {
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
    [0, 'the cap is RPI − X', 'a price cap moves with CPI − X'],
    [1, 'the CMA blocked the deal', 'the competition authority blocked the deal'],
    [1, 'regulators such as Ofwat', 'regulators such as the water regulator'],
    [2, 'the Laffer curve shows', 'the labour market shows'],
    [2, 'a poverty trap for claimants', 'poverty among low earners'],
    [3, 'a deadweight loss triangle', 'a welfare loss triangle'],
    [4, "it is a prisoner's dilemma", 'it is a cartel'],
    [5, 'the National Minimum Wage rose', 'the minimum wage rose'],
    [6, 'a classic 25-mark essay', 'a 20-mark Evaluate'],
    [6, 'a 10-mark question', 'a 14-mark Discuss'],
    [7, 'Assess the case for regulation. (10 marks)', 'an assessment of the case'],
    [7, 'Outline two problems of regulation.', 'the outline of the diagram'],
    [8, 'investment in human capital', 'investment in new capital'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bAnalyse\b(?![a-z]).{0,24}\(\s*(?!6\b)\d+\s*marks?\s*\)/g, 'an Analyse at a tariff other than 6 (Appendix 6)');
ban(/\bVRIO\b|\bcore competenc|\bbalanced scorecard\b|\bSWOT\b/g, 'IAL Business vocabulary in an Economics section');
ban(/\bF0\d\d\b|\bC-government-intervention-firms-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/classic 25-mark essay/gi, 'accuracy-01 regressed: the live examMatters\' "classic 25-mark essay topic" is back');
ban(/\bgovernment failure\b/gi, 'structure-05: "government failure" is Unit 1 (1.3.6 · 2); 3.3.5 · 1f names four limits and those are what this section teaches');
/*
 * THE POINTER RULE, over PROSE: a sentence that leans on a neighbour's model carries its topic number.
 * (Diagram labels such as "MCL" are exempt: the diagram's description and checklist carry the number.)
 */
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = prose.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const hh of hits) if (mustCite && !mustCite.test(hh)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${hh.slice(0, 110)}"`);
}
{
  const [mcl, , causes] = POINTER_ONLY;
  if (!mcl.mustCite.test('topic 3.3.3 draws the marginal cost of labour')) problems.push('the pointer-cite check rejects a correctly cited MCL pointer');
  if (!mcl.re.test('the MCL is flat at the floor') || mcl.mustCite.test('the MCL is flat at the floor')) problems.push('the MCL pointer rule does not see an uncited mention');
  if (!causes.re.test('housing costs stop workers moving') || causes.mustCite.test('housing costs stop workers moving')) problems.push('the immobility-causes pointer rule does not see an uncited mention');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* NAT, independently: demand P = 100 − Q, MC 20, AC = 20 + 1200/Q */
  const P = (Q) => 100 - Q, AC = (Q, e = 0) => 20 + e + 1200 / Q, MR = (Q) => 100 - 2 * Q;
  a(near(MR(NAT.mono.Q), 20) && near(P(NAT.mono.Q), NAT.mono.P) && NAT.mono.Q === 40 && NAT.mono.P === 60, `the unregulated monopoly is not MR = MC at 40, $60 (module: ${NAT.mono.Q}, ${NAT.mono.P})`);
  a(near(AC(NAT.mono.Q), NAT.mono.AC) && NAT.mono.AC === 50 && near((60 - 50) * 40, NAT.mono.profit), 'the unregulated AC is not $50, or profit not $400 thousand');
  a(near(P(NAT.avg.Q), AC(NAT.avg.Q), 1e-6) && NAT.avg.Q === 60 && NAT.avg.P === 40, `the AC cap is not where demand meets AC at 60, $40 (module: ${NAT.avg.Q}, ${NAT.avg.P})`);
  a(near(P(NAT.marg.Q), 20) && NAT.marg.Q === 80 && near(AC(80), NAT.marg.AC) && NAT.marg.AC === 35 && near((35 - 20) * 80, NAT.marg.loss) && NAT.marg.loss === 1200, 'the MC cap is not 80 units at $20 with AC $35 and a loss of $1,200 thousand');
  a(NAT.marg.loss === NAT.fixed, 'the MC-cap loss is not the network\'s fixed cost (it must be: P = MC loses exactly F)');
  for (let q = 15; q < 100; q += 1) a(AC(q + 1) < AC(q), `AC rises between ${q} and ${q + 1}: not a natural monopoly`);
  a(near(P(NAT.claimed.Q), AC(NAT.claimed.Q, 10), 1e-6) && NAT.claimed.P === 60 && NAT.claimed.Q === 40, 'the claimed-cost cap is not where demand meets AC + 10 at 40, $60');
  a(NAT.claimed.P === NAT.mono.P && NAT.claimed.Q === NAT.mono.Q, 'the claimed-cost cap no longer equals the unregulated price — the prose says "the same price it would charge unregulated"');
  a(near((NAT.claimed.P - AC(NAT.claimed.Q)) * NAT.claimed.Q, NAT.claimed.profit) && NAT.claimed.profit === 400, 'the information-gap profit is not $400 thousand');
  a(NAT.allowed === 3 && near(40 * 1.03, NAT.nextCap) && NAT.nextCap === 41.2, 'CPI − X: 5% − 2% is not 3%, or $40 × 1.03 is not $41.20');
  a(NAT.allowedProfit === 40 && NAT.allowedAfter === 48 && 0.08 * 600 === 48, 'rate of return: 8% of $500m / $600m is not $40m / $48m');
  /* TEL */
  const TP = (Q) => 120 - 2 * Q, TMR = (Q) => 120 - 4 * Q;
  a(near(TMR(TEL.state.Q), 40) && TEL.state.Q === 20 && TP(20) === TEL.state.P && TEL.state.P === 80, 'state telecoms is not MR = MC at 20m, $80');
  a(near(TMR(TEL.privat.Q), 32) && TEL.privat.Q === 22 && TP(22) === TEL.privat.P && TEL.privat.P === 76, 'private telecoms is not MR = MC at 22m, $76');
  a(near(TP(TEL.open.Q), 32) && TEL.open.Q === 44, 'open telecoms is not P = MC at 44m, $32');
  /* CEM, off both sides */
  a(near(100 - 2 * CEM.open.P, (2 * CEM.open.P - 20) + CEM.open.P) && CEM.open.P === 24 && CEM.open.Q === 52 && CEM.open.home === 28, 'open cement does not clear at $24, 52 (28 domestic)');
  a(near(100 - 2 * CEM.shut.P, 2 * CEM.shut.P - 20) && CEM.shut.P === 30 && CEM.shut.Q === 40 && CEM.shut.home === 40, 'shut cement does not clear at $30, 40');
  /* LAB, off both curves */
  const cross = (dA, dB, sA, sB) => { const W = (dA - sA) / (dB + sB); return { W, Ld: dA - dB * W, Ls: sA + sB * W }; };
  for (const [name, dS, sS, got] of [['base', 0, 0, LAB.eq], ['tax', -8, 0, LAB.taxed], ['training', 0, 8, LAB.trained], ['bias', -16, 0, LAB.biased]]) {
    const c = cross(80 + dS, 4, -16 + sS, 4);
    a(near(c.Ld, c.Ls) && near(c.W, got.W, 1e-6) && near(c.Ld, got.L, 1e-6), `labour ${name}: the module says $${got.W}, ${got.L}k and the two curves say $${c.W}, ${c.Ld}k`);
  }
  a(LAB.eq.W === 12 && LAB.eq.L === 32, 'the labour spine is no longer $12 and 32,000');
  a(80 - 4 * 14 === LAB.minHired && 4 * 14 - 16 === LAB.minWilling && LAB.minSurplus === 16 && LAB.minLost === 8, 'the minimum wage figures are not 24,000 hired, 40,000 willing');
  a(LAB.firmPays === 13 && 80 - 4 * 13 === LAB.taxed.L, 'with the tax, firms paying $13 do not demand 28,000 on the ORIGINAL demand curve');
  /* MON */
  a(near(2 + 12, 20 - 0.5 * 12) && MON.mono.L === 12 && MON.mono.W === 8, 'monopsony is not MCL = value at 12,000, paying $8 off supply');
  a(near(2 + 0.5 * 18, 20 - 0.5 * 18) && MON.comp.L === 18 && MON.comp.W === 11, 'the competitive benchmark is not 18,000 at $11');
  a(MON.withFloor.L === 16 && 2 + 0.5 * 16 === 10 && 20 - 0.5 * 16 > 10, 'with a $10 floor, supply does not offer exactly 16,000, or the 16th worker is not worth more than the floor');
  a(MON.highFloor === 14 && 20 - 0.5 * 12 === 14, 'the floor above which employment falls below 12,000 is not $14');
  /* TOP */
  a(near(40 - 0.2 * 120, 0.2 * 120 - 8) && TOP.eq.W === 120 && TOP.eq.L === 16, 'the managers\' market does not clear at $120, 1,600');
  a(TOP.willing === 12 && TOP.wanted === 20 && TOP.shortage === 8, 'the cap of $100 does not give 1,200 willing, 2,000 wanted');
  /* printed quiz, practice and recall figures, recomputed independently */
  a(round2(50 * 1.03) === 51.5, 'quiz: 3% of $50 does not give $51.50');
  a(round2(40 * 1.02) === 40.8, 'practice Calculate: $40 × 1.02 is not $40.80');
  a(58 - 44 === 14 && 50 - 44 === 6, 'minimum-wage recall: 58 − 44 is not 14, or 50 − 44 is not 6');
  a(6 - 4 === 2, 'price-cap recall: 6% − 4% is not 2%');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 6) problems.push(`${content.length} blocks, not 6`);
  if (SUBSECTIONS.length !== 28) problems.push(`${SUBSECTIONS.length} subsections, not 28`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (!b.sections.length) problems.push(`block "${b.title}" has no subsections`);
  }
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram');
  if (ALL_DIAGRAMS.some((d) => !content.some((b) => b.diagramId === d.id))) problems.push('structure-03: a diagram is pinned to no block, so Learn Mode never shows it');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block still carries `diagramRef`');
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
  /* resolvePinnedItem serves ONE practice item per chapter, the first unused index (packet 45 fix round 1) */
  const usedP = new Set();
  const served = content.map((b) => { const i = b.practiceIndices.find((x) => !usedP.has(x)); if (i != null) usedP.add(i); return i; });
  for (const m of [14, 20]) {
    const i = PRACTICE.findIndex((p) => p.marks === m);
    if (i < 0 || !served.includes(i)) problems.push(`the ${m}-mark practice item is no chapter's first pin, so Learn Mode never serves it (served: ${JSON.stringify(served)})`);
  }
  /* structure-02: no chapter is served a practice item on something it does not teach */
  const minWageBlock = content.findIndex((b) => b.sections.some((s) => /minimum-wage/.test(s.id)));
  served.forEach((i, bi) => { if (i != null && bi < minWageBlock && /minimum wage/i.test(PRACTICE[i].question)) problems.push(`structure-02: block ${bi} serves a minimum-wage item before the minimum wage is taught`); });
  practiceServed = served;
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
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '3.3.5');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 39 || leaves.length !== 33) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 3.3.5, not 39 / 33`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const key of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === key)) problems.push(`LEAF_MAP names ${key}, which is not a 3.3.5 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (a second method: the oracle's wording) */
  const SKIP = ['measures', 'government', 'intervention'];
  for (const leaf of leaves) {
    const words = leaf.wording.toLowerCase().replace(/[.:()/;]/g, ' ').split(/\s+/).filter((w) => w.length > 4 && !SKIP.includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => sub(slug)).filter(Boolean);
    const hay = subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase()).join(' ');
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the specification's own lists, in its own words, match the util's copies */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const span = spec.slice(1484, 1535).join(' ').replace(/[•]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...MONOPOLY_MEASURES, ...COMPETITION_MEASURES, ...PROTECTION_MEASURES, ...IMPACTS, ...LIMITS, ...LABOUR_MEASURES]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and econ_spec.txt:1485-1535 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: econ_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1485, '3.3.5 Government intervention');
  at(1489, 'The case for government intervention');
  at(1524, 'The case for government intervention');
  at(1511, 'restrictions on the monopsony power of firms');
  at(1520, 'regulatory capture');
  at(1526, 'Types of government intervention in labour markets');
  at(1529, 'maximum wage controls');
  at(1530, 'minimum wage controls');
  at(1531, 'national insurance contributions');
  at(1535, 'measures to reduce discrimination and exploitation');
  at(1432, '7 Monopsony');
  at(1435, '8 Contestability');
  /* the words the bans rest on are measured, not remembered */
  const body = spec.join('\n');
  for (const w of ['Laffer', 'poverty trap', 'deadweight', 'Averch', '\\bRPI\\b', 'prisoner', 'human capital']) {
    const re = new RegExp(w, 'i');
    const hits = spec.map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l)).map(([n]) => n);
    if (w === 'human capital') { if (hits.some((n) => n < 1600)) problems.push('"human capital" occurs in Units 1-3 after all — the ban rests on it being Unit 4 vocabulary'); continue; }
    if (w === 'Laffer') { if (!hits.length || hits.some((n) => n >= 1485 && n <= 1535)) problems.push('"Laffer" is inside 3.3.5, or nowhere — quiz-01\'s ban rests on it being Unit 4 fiscal policy (:1847)'); continue; }
    if (hits.length) problems.push(`"${w}" occurs in econ_spec.txt after all (line ${hits[0]}) — the ban rests on it being absent`);
  }
  /* "government failure" is Unit 1's heading, never inside 3.3.5 */
  const gf = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /government failure/i.test(l)).map(([n]) => n);
  if (!gf.length || gf.some((n) => n >= 1485 && n <= 1535)) problems.push('"government failure" is inside 3.3.5 after all, or nowhere — structure-05\'s framing rests on it being 1.3.6');
  /* "minimum wage controls" is a 3.3.5 bullet, which is what refutes structure-05 / topFix-03's "move it to 3.3.4" */
  if (!span.includes('minimum wage controls') || spec.slice(1446, 1479).join(' ').toLowerCase().includes('minimum wage')) problems.push('the minimum wage is not a 3.3.5 bullet, or it is also a 3.3.4 one — the ownership decision rests on neither');
  if (!/occupational immobility/i.test(span.replace(/geographical and occupational immobility/i, 'geographical immobility and occupational immobility'))) problems.push('3.3.5 · 2b does not name occupational immobility — quiz-02\'s refusal rests on it doing so');
}

/* ══ 6 · QUIZ ═══════════════════════════════════════════════════════════════ */
{
  if (QUIZ.length < 25) problems.push(`${QUIZ.length} quiz items against a floor of 25`);
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
  const ORDINAL = /\b(first|second|third|fourth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'Only the last of these lowers price.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* nothing may be quizzed that no subsection teaches (quiz-01..03's property) */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['natural monopoly', 'price cap', 'cpi − x', 'rate-of-return', 'performance target', 'predatory pricing', 'substantially lessen', 'tendering', 'contestable', 'licence', 'fdi', 'tax holiday', 'trade liberalisation', 'nationalisation', 'monopsony', 'local', 'working hours', 'regulatory capture', 'lack of regulatory power', 'quality', 'benchmarking', 'elastic', 'benefits in kind', 'equilibrium', 'equity', 'geographical immobility', 'corporation tax', 'national insurance', 'discrimination', 'equal pay', 'pay-gap'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term.replace(/s$/, ''))) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).map((x) => x.text || '')]).join(' ').toLowerCase();
    const onTopic = items.every((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`a quiz item pinned to "${b.title}" shares no substantive vocabulary with the chapter`);
  }
  /* topFix-01: the three named on-spec replacements exist */
  const has = (re) => QUIZ.some((q) => re.test(`${q.question} ${q.options.join(' ')}`));
  if (!has(/merger/i) || !has(/substantially lessen/i)) problems.push('topFix-01: no item on mergers and a substantial lessening of competition');
  if (!has(/predatory pricing/i)) problems.push('topFix-01: no item on predatory pricing');
  if (!has(/performance target|quality standard/i)) problems.push('topFix-01: no item on quality standards or performance targets');
  if (has(/Laffer|poverty trap/i)) problems.push('quiz-01 / quiz-03 regressed');
}
{
  /*
   * PRINTED-ANSWER LEAK (packet 44's live defect): a check-in key that carries a figure may not be
   * printed on its own block's diagram surfaces. The meaning-level leak (CONTENT-GATE, 26 Sep) has no
   * automatic check and is read by Verify A and B; this catches only the figure-shaped half.
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
  if (!surfaces(DIAGRAMS[0]).includes(money(NAT.mono.P))) problems.push('the printed-answer check cannot be A/B\'d: the natural monopoly diagram no longer prints the unregulated price');
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
    if (p.marks <= 6 && !/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
  }
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).economics.units_3_4;
  if (!paper.papers.includes('WEC13')) problems.push('ial-paper-structure.json units_3_4 no longer names WEC13');
  const B = paper.sections.find((s) => s.kind === 'data_question');
  const C = paper.sections.find((s) => s.kind === 'essay');
  for (const tariff of B.tariffs) {
    const cmds = B.commandWordByTariff[String(tariff)];
    if (!PRACTICE.some((p) => p.marks === tariff && cmds.includes(p.command))) problems.push(`the WEC13 data question has a ${tariff}-mark ${cmds.join('/')} part and no practice item takes that shape`);
  }
  for (const cmd of B.commandWordByTariff['2']) if (!PRACTICE.some((p) => p.marks === 2 && p.command === cmd)) problems.push(`no 2-mark ${cmd}: the paper's part (a) takes both forms`);
  if (!PRACTICE.some((p) => p.marks === C.marksEach && p.command === 'Evaluate')) problems.push(`no ${C.marksEach}-mark essay item`);
  const shapes = new Set([...B.tariffs, C.marksEach]);
  for (const p of PRACTICE) if (!shapes.has(p.marks)) problems.push(`${p.command} (${p.marks}) is not a WEC13 part tariff`);
  /* topFix-05 */
  if (PRACTICE.some((p) => p.command === 'Define' && p.marks !== 2)) problems.push('topFix-05 regressed: a Define carries a tariff other than 2');
  if (!PRACTICE.some((p) => p.command === 'Define' && /privatisation/i.test(p.question))) problems.push('topFix-05: the Define on privatisation is not re-tariffed to 2 — it is missing');
  if (PRACTICE.some((p) => /\bOutline\b|\bAssess\b/.test(`${p.command} ${p.question}`))) problems.push('topFix-05 regressed: an Outline or Assess item survived');
  for (const essay of PRACTICE.filter((p) => p.marks === 20)) if (!/Level 4/.test(essay.guidance) || !/evaluation is credited in levels of its own/i.test(essay.guidance)) problems.push('topFix-05: a 20-mark guidance does not describe KAA levels with evaluation credited in its own levels');
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
        const hh = String(r.hints[i] || '');
        if (String(ans).length >= 3 && hh.toLowerCase().startsWith(String(ans).toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${hh}" is a prefix of "${ans}"`);
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
  /* topFix-04 / structure-01: the three named recalls exist, each of the right type */
  const rec = (slug) => sub(slug)?.recall;
  if (rec('price-regulation')?.type !== 'fillin' || !rec('price-regulation').template.some((l) => /X/.test(l) && /%/.test(l))) problems.push('topFix-04: the price-cap recall is not a fill-in on CPI − X arithmetic');
  if (rec('merger-control')?.type !== 'reorder' || !/chronological/.test(rec('merger-control').criterion)) problems.push('topFix-04: the merger-control recall is not a chronological reorder');
  if (rec('profit-regulation')?.type !== 'reorder' || !/cause/.test(rec('profit-regulation').criterion)) problems.push('topFix-04: the over-investment chain is not a causal reorder');
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
    for (const b of s.body) if (b.type === 'flow' && b.steps.some((x) => typeof x !== 'object' || !x.title)) problems.push(`${where}: a flow step is not { title, subtitle }`);
  }
  for (const b of content) b.takeaway.forEach((tk) => { if (tk.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${tk.slice(0, 40)}"`); });
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  const CITATION = /\((?:source|see|per|from)\b[^)]*\)|\bW(?:EC|BS)1[1-4]\b|\bappendix\s+[0-9]\b|\bmark\s+scheme\b|\bexaminer'?s?\s+report\b/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
    if (EXAMINER_CLAIM.test(sent) && !CITATION.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  }
  if (/\bexaminers?\b/i.test(prose.join(' '))) problems.push('the word "examiner" is in student-facing text; every exam claim here cites Appendix 6 instead');
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  /* structure-08: no flashcard DEFINES 3.3.3 vocabulary */
  for (const f of FLASHCARDS) if (/consumer sovereignty|deadweight|define (a )?contestable market|dynamic efficiency/i.test(`${f.front} ${f.back}`)) problems.push(`structure-08: flashcard "${f.front}" drifts onto 3.3.3 vocabulary`);
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array — ExtrasTab maps chain.steps`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) {
    if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
    if (/\*\*/.test(e.content)) problems.push(`extras evaluation ${i + 1} carries **bold**, which renders as literal asterisks there (packet 45 Verify B)`);
  }
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-|(?<![\w-])-\d/g, 'a hyphen-minus used as a minus sign; `money` and the prose use U+2212');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bthe Chancellor\b|\bVAT\b/gi, 'a UK-only institution (locale.institution)');
  /* topFix-05: competition authorities from the candidates' markets, by name */
  if (!/Korea Fair Trade Commission/.test(prose.join(' ')) || !/Singapore's competition authority/.test(prose.join(' '))) problems.push('topFix-05: the Asian competition-authority examples are missing');
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

  /* ── glyph-box collisions and crossed labels, on the EMITTED SVG (packet 40, tolerance 1.2) ── */
  const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
    const attr = (key) => { const r = m[1].match(new RegExp(`${key}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (key) => { const r = m[1].match(new RegExp(`${key}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2'), stroke: (m[1].match(/stroke="([^"]*)"/) || [])[1] };
  });
  const pathsOf = (svg) => [...svg.matchAll(/<path d="M ([-\d.]+) ([-\d.]+)((?: [LQ] [-\d. ]+)+)"[^>]*stroke="(#[0-9a-f]{6})"/g)].flatMap((m) => {
    const pts = [[parseFloat(m[1]), parseFloat(m[2])]];
    const nums = m[3].replace(/[LQ]/g, ' ').trim().split(/\s+/).map(Number);
    for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
    return pts.slice(1).map((p, i) => ({ x1: pts[i][0], y1: pts[i][1], x2: p[0], y2: p[1], stroke: m[4], path: m.index }));
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
    const mkb = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mkb('S₁', 340, 100, 12), mkb('S', 340, 110, 12))) problems.push('the collision guard does not fire on two curve labels 10 units apart at one edge');
    if (collides(mkb('S₁', 340, 100, 12), mkb('S', 340, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * 12)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mkb('wage', 188, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    if (!crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mkb('supply', 120, 196, 12))) problems.push('the line check does not see a label on a sloping curve');
    if (crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mkb('supply', 120, 80, 12))) problems.push('the line check fires on a label clear of the curve');
  }

  /*
   * ── accuracy-02 / accuracy-03, READ BACK OUT OF THE COORDINATES ──
   * A different method from the one that drew them: the drawing code places points from the model;
   * this reads circles, lines and paths out of the emitted SVG and checks where they are.
   */
  const circlesOf = (svg) => [...svg.matchAll(/<circle cx="([-\d.]+)" cy="([-\d.]+)" r="([\d.]+)" fill="(#[0-9a-f]{6})"\/>/g)].map((m) => ({ x: +m[1], y: +m[2], fill: m[4] }));
  const distTo = (pt, s) => {
    const dx = s.x2 - s.x1, dy = s.y2 - s.y1; const L2 = dx * dx + dy * dy;
    const u = L2 ? Math.max(0, Math.min(1, ((pt.x - s.x1) * dx + (pt.y - s.y1) * dy) / L2)) : 0;
    return Math.hypot(pt.x - (s.x1 + u * dx), pt.y - (s.y1 + u * dy));
  };
  const TOL = 1.5;
  /* curves only: solid or dashed curves and horizontal policy lines, not the dashed guides mark() draws (stroke-width 1) */
  const offCurve = (svgStr) => {
    const curves = [...pathsOf(svgStr), ...[...svgStr.matchAll(/<line\b([^>]*)\/>/g)].filter((m) => !/stroke-width="1"/.test(m[1]) && !/stroke-width="1.5"/.test(m[1])).map((m) => {
      const at = (key) => parseFloat((m[1].match(new RegExp(`${key}="([^"]*)"`)) || [])[1]);
      return { x1: at('x1'), y1: at('y1'), x2: at('x2'), y2: at('y2') };
    })];
    return circlesOf(svgStr).filter((c) => !curves.some((sg) => distTo(c, sg) <= TOL));
  };
  for (const d of ALL_DIAGRAMS) for (const sc of d.scenarios) {
    for (const c of offCurve(sc.svg)) problems.push(`${d.title} / ${sc.label}: a marked point at (${c.x}, ${c.y}) sits on no drawn curve`);
  }
  {
    /* A/B: the live accuracy-02 defect was a point drawn 30-odd units off its intersection; move one 6 units and it must fire */
    const un = DIAGRAMS[0].scenarios[0].svg;
    const m = un.match(/<circle cx="([-\d.]+)" cy="([-\d.]+)" r="4" fill="#f87171"\/>/);
    const moved = m ? un.replace(m[0], `<circle cx="${+m[1] + 6}" cy="${+m[2] - 6}" r="4" fill="#f87171"/>`) : un;
    if (!m || !offCurve(moved).length) problems.push('the point-on-curve check does not fire on a monopoly point moved 6 units off every curve');
    if (offCurve(un).length) problems.push('the point-on-curve check fires on the unmoved diagram');
  }
  {
    const nat = DIAGRAMS[0];
    const un = nat.scenarios.find((s) => s.label === 'Unregulated').svg;
    const segs = pathsOf(un);
    const mr = segs.filter((s) => s.stroke === '#60a5fa');
    const mcLine = [...un.matchAll(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)" stroke="#f59e0b" stroke-width="2"\/>/g)][0];
    if (!mr.length || !mcLine) problems.push('accuracy-02: the unregulated view has no MR path or no MC line to intersect');
    else {
      const yMC = +mcLine[2];
      const m0 = mr[0]; const xCross = m0.x1 + ((yMC - m0.y1) / (m0.y2 - m0.y1)) * (m0.x2 - m0.x1);
      const verticals = linesOf(un).filter((l) => l.x1 === l.x2 && l.stroke === '#f87171');
      if (!verticals.some((v) => Math.abs(v.x1 - xCross) <= TOL)) problems.push(`accuracy-02: the monopoly output guide is not at the MR/MC crossing (x = ${round2(xCross)})`);
      const dotAt = circlesOf(un).find((c) => c.fill === '#f59e0b');
      if (!dotAt || Math.abs(dotAt.x - xCross) > TOL || Math.abs(dotAt.y - yMC) > TOL) problems.push('accuracy-02: the MR = MC dot is not where the two lines cross');
    }
    /* AC falls at every sampled point, in every view that draws it */
    for (const sc of [...nat.scenarios, ...DIAGRAMS[3].scenarios]) {
      const acSegs = pathsOf(sc.svg).filter((s) => s.stroke === '#34d399');
      if (!acSegs.length) problems.push(`accuracy-02: ${sc.label} draws no AC`);
      for (const s of acSegs) if (!(s.x2 > s.x1 && s.y2 > s.y1)) problems.push(`accuracy-02: AC does not fall between x ${s.x1} and ${s.x2} in "${sc.label}"`);
    }
    /* the average-cost cap sits ON the AC curve (Preg not below AC) */
    const avg = nat.scenarios.find((s) => s.label === 'Cap at average cost').svg;
    const cap = circlesOf(avg).find((c) => c.fill === '#8b5cf6');
    const acAvg = pathsOf(avg).filter((s) => s.stroke === '#34d399');
    if (!cap || !acAvg.some((s) => distTo(cap, s) <= TOL)) problems.push('accuracy-02: the average-cost cap is not on the AC curve');
    /* and the marginal-cost cap's text names the loss */
    const margTxt = svgTextOf(nat.scenarios.find((s) => s.label === 'Cap at marginal cost').svg);
    if (!/loss/i.test(margTxt)) problems.push('accuracy-02: the marginal-cost cap view does not say it is a loss');
    /* accuracy-03: no supply curve in the privatisation diagram, and privatisation is a fall in MC with MR = MC kept */
    const tel = DIAGRAMS[1];
    for (const sc of tel.scenarios) if (/(^| )S(₁| |$)/.test(svgTextOf(sc.svg))) problems.push(`accuracy-03: "${sc.label}" labels a supply curve`);
    if (!/MR = MC/.test(svgTextOf(tel.scenarios[1].svg))) problems.push('accuracy-03: the privatised view does not say the firm still sets MR = MC');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).map(svgTextOf).join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, [money(NAT.mono.P), money(NAT.mono.AC), money(NAT.avg.P), money(NAT.marg.AC), k(NAT.avg.Q)], 'natural monopoly');
  want(1, [money(TEL.state.P), money(TEL.privat.P), money(TEL.open.P), String(TEL.open.Q)], 'telecoms');
  want(2, [money(CEM.open.P), money(CEM.shut.P), k(CEM.open.home), k(CEM.shut.Q)], 'cement');
  want(3, [money(NAT.claimed.P), money(NAT.claimed.trueAC)], 'information gap');
  want(4, [k(LAB.minHired), k(LAB.minWilling), k(MON.withFloor.L), money(MON.floor), h(TOP.shortage)], 'wage controls');
  want(5, [money(LAB.taxed.W), money(LAB.firmPays), k(LAB.trained.L), money(LAB.biased.W)], 'taxes and mobility');
  /* topFix-02: the four diagram asks */
  if (!DIAGRAMS[4].scenarios.some((s) => /many employers/.test(s.label))) problems.push('topFix-02: no competitive-market minimum-wage view');
  const monSvg = DIAGRAMS[4].scenarios.find((s) => /one employer/.test(s.label))?.svg || '';
  if (!/>MCL</.test(monSvg) || !/stroke="#f87171" stroke-width="3"/.test(monSvg)) problems.push('topFix-02: the monopsony view does not draw the floor-kinked MCL');
  if (DIAGRAMS[4].scenarios.findIndex((s) => /many employers/.test(s.label)) > DIAGRAMS[4].scenarios.findIndex((s) => /one employer/.test(s.label))) problems.push('the exception (one employer) comes before the rule (many employers)');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const all = readable.join(' \n ');
  const hay = (slug) => { const s = sub(slug); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])]), s.misconception].join(' ').toLowerCase(); };
  const mech = (slug, words, id) => { for (const w of words) if (!hay(slug).includes(w)) problems.push(`${id} (${slug}): the word "${w}" is missing`); };
  mech('quality-and-targets', ['quality standards', 'performance targets', 'penalt'], 'specGap-01');
  mech('small-business-and-fdi', ['small businesses', 'grants', 'tax incentives', 'fdi'], 'specGap-02');
  mech('deregulation', ['deregulation', 'barriers to entry', 'licence'], 'specGap-03');
  mech('competitive-tendering', ['competitive tendering', 'bid', 'public sector contracts'], 'specGap-04');
  mech('monopsony-restrictions', ['monopsony power', 'supermarket', 'suppliers', 'codes of conduct'], 'specGap-05');
  mech('impact-of-measures', ['price', 'profit', 'efficiency', 'quality', 'choice'], 'specGap-06 / structure-06');
  mech('regulatory-capture', ['regulatory capture'], 'specGap-07');
  mech('information-gaps', ['asymmetric information'], 'specGap-07');
  mech('nationalisation', ['nationalisation'], 'specGap-08');
  mech('trade-liberalisation', ['trade liberalisation', 'tariffs', 'quotas'], 'specGap-09');
  mech('local-sourcing', ['local sourcing', 'raw materials', 'components'], 'specGap-10');
  mech('employment-legislation', ['employment legislation', 'exploitation', 'hours', 'safety'], 'specGap-11');
  mech('direct-taxes', ['national insurance contributions', 'corporation tax', 'demand for labour'], 'specGap-12');
  mech('discrimination-and-exploitation', ['discrimination', 'equal pay', 'wage and employment'], 'specGap-13');
  mech('discrimination-and-exploitation', ['exploitation', 'migrant', 'minimum wage'], 'specThin-01');
  /* the five impacts named on one surface as a summary (structure-06's table "or equivalent") */
  const bullets = sub('impact-of-measures').body.find((b) => b.type === 'bullets')?.items || [];
  for (const w of ['Price', 'Profit', 'Efficiency', 'Quality', 'Choice']) if (!bullets.some((b) => b.startsWith(`**${w}**`))) problems.push(`structure-06: the impact summary has no "${w}" line`);
  /* topFix-03: the minimum wage stays here and is built out, rule then exception */
  const mwOrder = SUBSECTIONS.map((s) => s.id);
  if (mwOrder.indexOf(`${SECTION}:sub:minimum-wage-competitive`) > mwOrder.indexOf(`${SECTION}:sub:minimum-wage-monopsony`)) problems.push('topFix-03: the monopsony minimum wage is taught before the competitive one');
  /* structure-07: the chapter that uses MRP/MCL recaps them, citing where they are taught */
  if (!/3\.3\.3/.test(JSON.stringify(sub('minimum-wage-monopsony').body))) problems.push('structure-07: the monopsony minimum wage does not say where the model is taught');
  if (!/topic 3\.3\.4/.test(JSON.stringify(sub('labour-case').body))) problems.push('structure-07: the labour case does not say where immobility is taught');
  /* accuracy-01 */
  if (!/20 marks \(Appendix 6\)/.test(sub('privatisation').examMatters)) problems.push('accuracy-01: the privatisation examMatters does not give the 20-mark IAL tariff');
  /* flows are unique across subsections */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => x.title).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
  if (/RPI/.test(all)) problems.push('checklist 3: RPI survived');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '3.3.5' || ctx.unitCode !== 'WEC13') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 3.3.5 / WEC13`);
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

console.log(`\n${SECTION} — packet 48`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${coverage ? coverage.detail : 'no spec.coverage line'}`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([key, v]) => `${v} ${key}`).join(', ')}`);
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
  SCOPE      3.3.5 in full; the monopsony construction (3.3.3 · 7), contestable markets (3.3.3 · 8) and the
             causes of immobility (3.3.4 · 4) pointed at with their topic numbers; RPI, UK regulators, the
             Laffer curve, the poverty trap, "government failure", Outline/Assess and IAL-illegal tariffs banned
  NUMBERING  the oracle re-read (39 rows / 33 leaves), every leaf mapped and its own words found; eleven lines
             asserted by number; every banned word re-measured absent
  ARITHMETIC every model re-solved off both sides; every printed quiz, practice and recall figure recomputed
  PINS       derived from each item's block tag; ${content.length} blocks, each with its own diagram, quiz and
             practice; every diagram reachable; ${3 + content.length} free quiz items against FREE_QUIZ_MAX 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that is not taught, no figure key on its own diagram
  PRACTICE   Appendix 6 parsed; the WEC13 paper's shape read from ial-paper-structure.json
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, recall.recoverable at 0
  DIAGRAMS   geometry read back out of the SVG: every marked point on a curve, MR = MC at the crossing,
             AC falling throughout, the AC cap on AC, no supply curve in the privatisation diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-48-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-48-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify({ ok: res.ok, staged: res.staged, unchanged: res.unchanged, summary: res.summary, newBlocks: res.newBlocks?.length, newDebt: res.newDebt?.length })}`);
}
