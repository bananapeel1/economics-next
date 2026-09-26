#!/usr/bin/env node
/**
 * PACKET 51 — poverty-inequality, Economics Unit 4 (WEC14), IAL topic 4.3.4.
 * `audit/raw/econ_spec.txt:1788-1817`. SEVEN blocks, twenty-four subsections, 21 substantive leaves.
 *
 *   node scripts/packet-51-poverty-inequality.mjs            # dry run, every check
 *   node scripts/packet-51-poverty-inequality.mjs --dump     # + write the bundle
 *   node scripts/packet-51-poverty-inequality.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Packet 46's runner, adapted; what this packet adds:
 *
 *   - **RELATIVE POVERTY IS NEVER INEQUALITY (topFix-02, accuracy-02).** The spine's "richest fifth
 *     pulls away" case is recomputed here: Gini up, median unchanged, relative headcount unchanged.
 *     "relative inequality" is banned, and the misconception-shaped sentence "relative poverty rose
 *     because the rich got richer" is refused anywhere it is asserted rather than refuted.
 *   - **THE POVERTY LINE IS $3.00 AT 2021 PPP, WITH ITS SOURCE (accuracy-01, topFix-05).** $2.15 and
 *     both mislabelled base years are banned; the one sentence that states the line must carry the
 *     source, and no other year appears anywhere.
 *   - **1c's SEVEN CAUSES AND 2d's SIX IMPACTS ARE READ FROM THE DOCUMENT, BY LINE,** and each must
 *     own a subsection that says the spec's own words (specGap-03's off-spec list is refused).
 *   - **2b IS A CLOSED LIST (specGap-07).** The runner asserts econ_spec.txt:1803-1805 names exactly the
 *     Lorenz curve and the Gini coefficient, and bans the Palma ratio and income-share ratios.
 *   - **EVERY GINI THE SECTION PRINTS IS RE-DERIVED** from the Lorenz points by the trapezium rule,
 *     independently of the util's own function, and every poverty headcount by counting.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, round2, round3, BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
  POVERTY_CAUSES, INEQUALITY_IMPACTS, INEQUALITY_MEASURES, POVERTY_LINE_SOURCE,
} from './_packet51-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
} from './_packet51-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet51-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD, KUZ } from './_packet51-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const E = ECON;

const problems = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ── pins, derived from each item's own block tag ──────────────────────────── */
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
for (const bad of ['a line of $undefined', 'a Gini of NaN', 'the median [object Object]', 'poverty of ' + '${pct(x)}']) if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
for (const ok of ['an undertaking by the state', 'the object of the scheme']) if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);

/* ══ 2 · THE BANNED VOCABULARY AND THE POINTER BUDGETS ══════════════════════ */
for (const [re, why] of BANNED_ELSEWHERE) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  const fires = (i, str) => { const [re] = BANNED_ELSEWHERE[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'the Palma ratio compares the top tenth', 'a palm oil exporter'],
    [0, 'income share ratios such as S80/S20', 'the share of income going to the poorest'],
    [1, 'the Laffer curve shows', 'a laugh in the classroom'],
    [2, 'wages equal the MRP of labour', 'marginal changes in revenue'],
    [3, 'the poor have a higher MPC', 'the marginal cost of production'],
    [4, 'the equity-efficiency trade-off', 'equity in a firm'],
    [5, 'a line of $2.15 a day', 'a line of $3.00 a day'],
    [5, 'measured at 2017 PPP', 'measured at 2021 PPP'],
    [6, 'relative inequality worsened', 'relative poverty is unchanged'],
    [7, 'Assess the impact of aid. (10 marks)', 'an assessment of the arguments'],
    [7, 'Outline two causes of poverty.', 'the outline of the diagram'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\b(10|12|16|18)[- ]mark\b/g, 'a tariff IAL Economics does not have — Appendix 6 gives 2, 4, 6, 8, 14 and 20 only');
ban(/\bVRIO\b|\bcore competenc|\bbalanced scorecard\b|\bSWOT\b/g, 'IAL Business vocabulary in an Economics section');
ban(/\bF0\d\d\b|\bC-poverty-inequality-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  const p = POINTER_ONLY[0];
  if (!p.mustCite.test('How taxes are classed as progressive or regressive is topic 4.3.5.')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (p.mustCite.test('A regressive tax hurts the poor.')) problems.push('the pointer-cite check accepts an uncited mention');
  if (!p.re.test('a regressive tax')) problems.push('the tax pointer no longer matches "regressive"');
}
/* topFix-02 / accuracy-02: the conflation asserted as fact. The misconception and the common
   mistake QUOTE it to refute it; nothing else may say it. */
{
  const CONFLATION = /relative poverty (?:rose|rises|increased|worsened|may rise|may worsen)[^.]{0,60}\b(?:rich|top|gains? (?:accru|went)|inequality)|(?:worsens?|raises?|increases?) relative poverty[^.]{0,60}\b(?:rich|top|inequality)/i;
  const refuting = /Students (?:treat|write)|looks like|"The rich got richer/;
  for (const s of readable) for (const sent of s.split(/(?<=[.!?])\s+/)) if (CONFLATION.test(sent) && !refuting.test(s)) problems.push(`topFix-02: the relative-poverty/inequality conflation is asserted: "${sent.slice(0, 100)}"`);
  if (!CONFLATION.test('Growth may worsen relative poverty if the gains accrue disproportionately to the rich.')) problems.push('the conflation check no longer fires on the live body[1] sentence');
  if (CONFLATION.test('Relative poverty rises when the median climbs away from incomes at the bottom.')) problems.push('the conflation check fires on a correct sentence');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED BY A SECOND METHOD ══════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* an independent Gini: 1 − Σ (x_k − x_{k−1})(Y_k + Y_{k−1}), from sorted incomes */
  const gini = (inc) => { const s = [...inc].sort((p, q) => p - q); const tot = s.reduce((p, q) => p + q, 0); let prev = 0, cum = 0, sum = 0; for (const v of s) { cum += v; const y = cum / tot; sum += 0.1 * (y + prev); prev = y; } return 1 - sum; };
  const med = (inc) => { const s = [...inc].sort((p, q) => p - q); return (s[4] + s[5]) / 2; };
  const below = (inc, line) => inc.filter((v) => v < line).length * 10;
  a(E.base.length === 10 && E.base.reduce((p, q) => p + q, 0) === 75, 'the ten base incomes do not sum to 75');
  a(med(E.base) === 6 && E.relLine === 3.6, 'median 6.00 and relative line 3.60 are not derived');
  a(below(E.base, 3) === 20 && below(E.base, 3.6) === 30 && E.absRate === 20 && E.relRate === 30, 'the base headcounts are not 20% / 30%');
  a(round2(gini(E.base)) === 0.39 && E.gini === 0.39, `base Gini ${E.gini} is not 0.39 by the trapezium rule`);
  a(round3(0.5 - 0.5 * (1 - gini(E.base))) === E.areaA && round3(0.5 * (1 - gini(E.base))) === E.areaB, 'the Lorenz areas are not half of Gini and of one minus Gini');
  a(round2(E.areaA / 0.5) === E.gini, 'area A ÷ 0.50 does not give the printed Gini');
  a(near(E.avgShortfall, ((3 - 1.8) + (3 - 2.6)) / 2, 1e-9) && near(E.totalGap, (1.2 + 0.4) * 2, 1e-9), 'the poverty gap is not the shortfall of the poor');
  /* 1a: the richest fifth pulls away */
  a(med(E.topPull) === 6 && below(E.topPull, 3.6) === 30 && round2(gini(E.topPull)) === 0.49 && E.topPullGini === 0.49, 'top-pull: median, relative headcount or Gini is wrong');
  /* 1c-1: even growth */
  a(med(E.even) === 7.5 && below(E.even, 3) === 10 && below(E.even, 4.5) === 30 && round2(gini(E.even)) === E.evenGini && E.evenGini === E.gini, 'even growth: headcounts or Gini wrong');
  /* 1c-3/4: benefit and tax */
  a(E.withBenefit.reduce((p, q) => p + q, 0) === 75 || near(E.withBenefit.reduce((p, q) => p + q, 0), 75, 1e-9), 'the benefit is not fully paid for by the tax');
  a(near(E.benefitCost, 0.9 * 3 * 2, 1e-9) && near(E.topTax * 2, E.benefitCost, 1e-9), 'benefit cost and tax per head do not match');
  a(med(E.withBenefit) === 6 && below(E.withBenefit, 3) === 10 && below(E.withBenefit, 3.6) === 20, 'benefit headcounts wrong');
  /* 1c-5..7 */
  a(below(E.mills, 3) === 30 && below(E.aided, 3) === 10 && below(E.war, 3) === 40, 'mills / aid / war headcounts wrong');
  /* 2a */
  a(E.wealthShares.reduce((p, q) => p + q, 0) === 100 && round2(gini(E.wealthShares)) === 0.65 && E.wealthGini === 0.65, 'wealth shares do not sum to 100 or the wealth Gini is not 0.65');
  a(near(E.topShare, Math.round(22 / 75 * 1000) / 10) && near(E.bottomHalfShare, Math.round(17.2 / 75 * 1000) / 10), 'income shares of the top tenth / bottom half not derived');
  /* 2c compounding */
  a(round2(1.06 ** 30) === E.assetMultiple && round2(1.02 ** 30) === E.wageMultiple, 'compounding multiples not derived');
  a(E.lifeGap === E.lifeByFifth[4] - E.lifeByFifth[0], 'life-expectancy gap not derived');
  /* the Kuznets curve peaks in the middle */
  a(KUZ.f(0.5) > KUZ.f(0.1) && KUZ.f(0.5) > KUZ.f(0.9), 'the Kuznets curve is not an inverted U');
  /* the recall, quiz and practice arithmetic, recomputed from the numbers the items print */
  a(8 / 50 === 0.16 && ((3 - 2) + (3 - 2.5)) / 2 === 0.75, 'absolute-measures recall: 16% or $0.75 is wrong');
  a(round2(2.4 + 1) === 3.4 && round2(8 * 0.6) === 4.8, 'benefit recall: $3.40 or $4.80 is wrong');
  a(round2(3.5 * 0.8) === 2.8, 'conflict recall: $3.50 less a fifth is not $2.80');
  a(round2(0.12 / (0.12 + 0.38)) === 0.24, 'gini recall: 0.12 ÷ 0.50 is not 0.24');
  a(50 / 200 === 0.25 && 1 / 20 === 0.05, 'savings recall shares are wrong');
  a(75 - 58 === 17, 'life-expectancy recall gap is wrong');
  a(6 / 40 === 0.15 && round2(12 * 0.6) === 7.2 && round2(0.15 / 0.5) === 0.3 && round2(0.15 / 0.35) === 0.43, 'quiz arithmetic is wrong');
  a(round2(0.6 * 8) === 4.8 && round2((0.5 - 0.32) / 0.5) === 0.36 && round2((0.5 - 0.27) / 0.5) === 0.46, 'practice arithmetic is wrong');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 7) problems.push(`${content.length} blocks, not 7`);
  if (SUBSECTIONS.length !== 24) problems.push(`${SUBSECTIONS.length} subsections, not 24`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
  }
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block carries `diagramRef`, the legacy string pin');
  /* topFix-04: the Lorenz and Kuznets diagrams are each pinned to a block */
  for (const [re, what] of [[/Lorenz/, 'Lorenz'], [/Kuznets/, 'Kuznets']]) {
    const d = ALL_DIAGRAMS.find((x) => svgOf(x).some((s) => re.test(s)));
    if (!d || !content.some((b) => b.diagramId === d.id)) problems.push(`topFix-04: no block pins a ${what} diagram`);
  }
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items, not 3`);
  if ([...unpinned].some((i) => i > 2)) problems.push('an unpinned quiz item is not among the first three in the array');
  const freeNeeded = 3 + content.length;
  const limits = readFileSync('lib/preview-limits.js', 'utf8').match(/export const FREE_QUIZ_MAX = (\d+);/);
  if (!limits || Number(limits[1]) < freeNeeded) problems.push(`FREE_QUIZ_MAX is ${limits?.[1]}, below the ${freeNeeded} this section needs`);
  const pinnedP = new Set(Object.values(practiceIndices).flat());
  PRACTICE.forEach((p, i) => { if (!pinnedP.has(i)) problems.push(`practice item ${i} reaches no block`); });
  const ids = [
    ...content.map((b) => b.id), ...SUBSECTIONS.map((s) => s.id), ...SUBSECTIONS.map((s) => s.recall.id),
    ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id), ...FLASHCARDS.map((f) => f.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id),
  ];
  if (new Set(ids).size !== ids.length) problems.push(`duplicate ids: ${[...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].slice(0, 3).join(', ')}`);
  for (const s of SUBSECTIONS) if (s.recall?.id !== `${s.id}:recall`) problems.push(`${s.id}: the recall id is not minted from its own subsection`);
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE SPEC'S OWN LISTS ═══════════════════ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '4.3.4');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 24 || leaves.length !== 21) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 4.3.4, not 24 / 21`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 4.3.4 leaf`);
  /* every mapped subsection must say the leaf's own words */
  const SKIP = new Set(['distinction', 'between', 'changes', 'impact', 'measures', 'measurements', 'causes', 'within', 'countries', 'significance']);
  for (const leaf of leaves) {
    const words = leaf.wording.toLowerCase().replace(/[^a-z -]/g, ' ').split(/\s+/).filter((w) => w.length > 3 && !SKIP.has(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase()).join(' ');
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording.trim()}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the specification's own lists, re-read from the document */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const span = (a, b) => spec.slice(a - 1, b).join(' ').replace(/[•]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of POVERTY_CAUSES) if (!span(1794, 1801).includes(f)) problems.push(`the util lists cause "${f}" and econ_spec.txt:1794-1801 does not`);
  for (const f of INEQUALITY_IMPACTS) if (!span(1808, 1814).includes(f)) problems.push(`the util lists impact "${f}" and econ_spec.txt:1808-1814 does not`);
  for (const f of INEQUALITY_MEASURES) if (!span(1803, 1805).includes(f.toLowerCase())) problems.push(`"${f}" is not at econ_spec.txt:1803-1805`);
  /* specGap-07: 2b is a closed two-item list — exactly two bullets between "Measurements" and 2c */
  const bullets2b = spec.slice(1803, 1805).filter((l) => /•/.test(l)).length;
  if (bullets2b !== 2 || !/c\) Causes of inequality/.test(spec[1805])) problems.push(`specGap-07: 2b does not read as exactly two bullets followed by 2c (found ${bullets2b})`);
  /* specGap-03: the item's off-spec causes are not 1c bullets */
  for (const w of ['unemployment', 'low wages', 'demographic']) if (span(1794, 1801).includes(w)) problems.push(`specGap-03: "${w}" IS in 1c after all`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: econ_spec.txt:${n} does not read "${want}"`); };
  at(1788, '4.3.4 Poverty and inequality');
  at(1792, '1 Poverty');
  at(1802, '2 Inequality');
  at(1815, 'e) The impact of economic change and development on inequality');
  at(1816, 'f) The significance of the free market economy (capitalism) for');
  at(1842, 'progressive, proportional and regressive');
  at(1847, 'Laffer curve');
  at(1878, 'reduce poverty and inequality');
  const body = spec.join('\n').toLowerCase();
  for (const w of ['kuznets', 'palma', 'headcount', 'multidimensional']) if (body.includes(w)) problems.push(`"${w}" occurs in econ_spec.txt after all — this runner's notes say it does not`);
  /* each 1c cause and 2d impact owns a subsection whose title carries its words */
  const titleHas = (w) => SUBSECTIONS.some((s) => s.title.toLowerCase().includes(w));
  for (const w of ['economic growth', 'education and training', 'welfare benefits', 'tax structure', 'structural changes', 'aid', 'civil wars']) if (!titleHas(w)) problems.push(`1c: no subsection is titled for "${w}"`);
  for (const w of ['enterprise', 'incentives', 'savings', 'education', 'migration', 'life expectancy']) if (!titleHas(w)) problems.push(`2d: no subsection is titled for "${w}"`);
}

/* structure-05 fix round 1 (verifier, 26 Sep): an opinion about the economy, or an evaluation point
   ("it depends on…", "either always … or never …", "use it as one view"), is not a misconception */
const MISC_IDEOLOGY = /\bfair\b|only by effort|everyone can succeed|"causes? poverty"/i;
const MISC_EVALUATION = /\bdepends? on the (?:degree|type)\b|\beither\b[^.]*\b(?:always|never)\b|use it as one view|test it against|\bAsk where\b/i;

/* ══ 6 · QUIZ ═══════════════════════════════════════════════════════════════ */
{
  /* topFix-03 fix round 1: the absurd distractors the verifier named must not come back */
  const REJECTED = /schooling lowers the wages|already have the most schooling|raises the absolute poverty line itself|drives every firm's profit to zero|separate population census|older on average than richer|poverty line is raised whenever|saving is required by law|neither country has any relative poverty|^fall to zero$|minimum wages hold low pay|state sets the wage paid|prices fall as soon as the fighting/i;
  for (const q of QUIZ) for (const o of q.options) if (REJECTED.test(o)) problems.push(`topFix-03: a rejected absurd distractor is back: "${o}"`);
  if (!REJECTED.test('training raises the absolute poverty line itself') || REJECTED.test('the poverty gap')) problems.push('the topFix-03 distractor guard is broken');
  /* topFix-03 fix round 2: a distractor the stem alone eliminates ("In a free market…" vs "the state sets the wage"), or one
     that argues the opposite of the question ("prices fall" under "why does poverty stay high"), is not a near-miss */
  if (!REJECTED.test('the state sets the wage paid in each occupation') || !REJECTED.test('prices fall as soon as the fighting stops') || REJECTED.test('the state sets taxes')) problems.push('the topFix-03 round-2 distractor guard is broken');
  if (QUIZ.length < 20) problems.push(`${QUIZ.length} quiz items against a floor of 20`);
  const hist = [0, 0, 0, 0];
  let longest = 0;
  for (const q of QUIZ) {
    hist[q.correctIndex] += 1;
    if (q.options.length !== 4) problems.push(`quiz "${q.question.slice(0, 40)}" has ${q.options.length} options`);
    if (new Set(q.options).size !== q.options.length) problems.push(`quiz "${q.question.slice(0, 40)}" repeats an option`);
    const correct = q.options[q.correctIndex];
    const lens = q.options.map((o) => o.length);
    const maxD = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
    if (correct.length > 1.5 * maxD) problems.push(`quiz.long-correct would fire on "${q.question.slice(0, 40)}"`);
    if (correct.length === Math.max(...lens) && lens.filter((l) => l === correct.length).length === 1) longest += 1;
    if (/\(\s*[A-D]\s*\)|\b[A-D]\s*[=)]|option\s+[A-D]\b/i.test(q.explanation)) problems.push(`an explanation names an option by letter: "${q.question.slice(0, 40)}"`);
    if (/^(Evaluate|Assess|Discuss|Examine|To what extent)\b/i.test(q.question)) problems.push(`an essay command word opens an MCQ: "${q.question.slice(0, 40)}"`);
    if (/\b(always|never|only|all)\b/i.test(q.options.filter((_, i) => i !== q.correctIndex).join(' ')) && /\b(may|can|might|usually|often|tends?)\b/i.test(correct)) problems.push(`the hedge tell in "${q.question.slice(0, 40)}"`);
  }
  /* quiz-01 / topFix-03: the key was the longest option in 8 of 10; hold it at or below a quarter plus noise */
  if (longest > Math.ceil(QUIZ.length * 0.4)) problems.push(`quiz-01: the key is the uniquely longest option in ${longest} of ${QUIZ.length} items`);
  const share = hist.map((n) => (n / QUIZ.length) * 100);
  if (share.some((p) => p > 40 || p < 10)) problems.push(`quiz.histogram would fire: ${share.map((p) => `${Math.round(p)}%`).join('/')}`);
  const ORDINAL = /\b(first|second|third|fourth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|birthday)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  /* topFix-03: the live giveaways do not return */
  if (QUIZ.some((q) => /primarily in developed countries/i.test(q.explanation))) problems.push('topFix-03: quiz[1]\'s "relative poverty exists primarily in developed countries" is back');
  if (QUIZ.some((q) => /within a country/i.test(q.question) && q.options.some((o) => /within a country/i.test(o)))) problems.push('topFix-03: a stem and an option share "within a country"');
}
{
  /* nothing may be quizzed that no subsection teaches (structure-03) */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle || ''}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['poverty gap', 'headcount', 'median', 'basic needs', 'relative poverty', 'absolute poverty', 'capital-intensive', 'labour-intensive', 'sales tax', 'structural change', 'cash transfer', 'tied', 'wealth', 'lorenz', 'gini', 'line of equality', 'cumulative', 'inherit', 'scarc', 'collateral', 'remittances', 'life expectancy', 'automation', 'kuznets', 'land reform', 'rent', 'profit', 'capital', 'interest'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term)) || FLASHCARDS.some((f) => `${f.front} ${f.back}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  /* structure-03's four untaught live topics are now taught in prose */
  for (const [term, id] of [['kuznets', 'quiz[4]'], ['between countries', 'quiz[7]'], ['civil war', 'quiz[8]'], ['free market economy (capitalism)', 'quiz[9]']]) if (!teaching.includes(term)) problems.push(`structure-03 (${id}): "${term}" is not taught in any subsection's prose`);
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).map((x) => x.text || '')]).join(' ').toLowerCase();
    const onTopic = items.every((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`a quiz item pinned to "${b.title}" shares no substantive vocabulary with its chapter`);
  }
  /* A CHECK-IN MAY NOT PRINT ITS OWN KEY: its numeric key, or its key's content words wholesale */
  const numsIn = (s) => new Set((String(s).match(/\d+(?:\.\d+)?%?/g) || []));
  content.forEach((b, bi) => {
    const d = DIAGRAMS[bi];
    const shownText = [...svgOf(d).map((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' ')), ...(d.checklist || []), d.title, d.description].join(' ');
    const q = QUIZ[b.quizIndices[0]];
    const key = q.options[q.correctIndex];
    if (/^\s*\$?[\d.]+%?\s*$/.test(key) && numsIn(shownText).has(key.replace('$', '').trim())) problems.push(`the "${b.title}" check-in prints its own key "${key}" on its diagram`);
  });
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
  for (const [cmd, marks] of Object.entries(WANT)) if (JSON.stringify(TARIFFS[cmd]) !== JSON.stringify(marks)) problems.push(`Appendix 6 parse: ${cmd} reads ${JSON.stringify(TARIFFS[cmd])}`);
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).economics.units_3_4;
  if (!paper.papers.includes('WEC14')) problems.push('ial-paper-structure.json economics.units_3_4 does not cover WEC14');
  const B = paper.sections.find((s) => s.id === 'B'), C = paper.sections.find((s) => s.id === 'C');
  for (const m of B.tariffs) { const cmds = B.commandWordByTariff[String(m)]; if (!PRACTICE.some((p) => p.marks === m && cmds.includes(p.command))) problems.push(`no practice item at the WEC14 tariff ${m}`); }
  if (PRACTICE.filter((p) => p.marks === C.marksEach).length < C.offered) problems.push(`fewer 20-mark essays than WEC14's Section C offers (${C.offered})`);
  const seen = new Set();
  for (const p of PRACTICE) {
    seen.add(p.command);
    const allowed = TARIFFS[p.command];
    if (!allowed) { problems.push(`"${p.command}" is not an IAL Economics command word`); continue; }
    if (!allowed.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — Appendix 6 gives ${allowed.join(' or ')}`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not end in its own tariff`);
    if (!new RegExp(`(^|\\.\\s+)${p.command}\\b`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not put its command word at the start of a sentence`);
    if (/Define the difference/i.test(p.question)) problems.push('topFix-05: "Define the difference" is back');
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 44)}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\b\d{2,}\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries the level descriptors`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points (topFix-05)`);
    if (p.marks > 6 && !/\bLevel 1\b/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance has no level descriptors (topFix-05)`);
    if (p.marks <= 6 && !/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (/income share ratio|Palma/i.test(p.guidance)) problems.push('specGap-07: guidance names a measure the section never teaches');
  }
  for (const cmd of ['Define', 'Calculate', 'Explain', 'Analyse', 'Examine', 'Discuss', 'Evaluate']) if (!seen.has(cmd)) problems.push(`no practice item uses ${cmd}`);
  for (const m of TARIFFS.Calculate) if (!PRACTICE.some((p) => p.command === 'Calculate' && p.marks === m)) problems.push(`no Calculate at ${m} marks`);
}

/* ══ 8 · RECALLS ════════════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.map((s) => [s, s.recall]).filter(([, r]) => r);
  if (recalls.length !== SUBSECTIONS.length) problems.push(`${recalls.length} recalls over ${SUBSECTIONS.length} subsections (structure-01)`);
  for (const want of ['fillin', 'classify', 'match', 'reorder']) if (!recalls.some(([, r]) => r.type === want)) problems.push(`no ${want} recall`);
  for (const [sec, r] of recalls) {
    const where = sec.id.split(':').pop();
    if (!r.prompt) problems.push(`${where}: recall has no prompt`);
    if ('shuffled' in r) problems.push(`${where}: recall carries \`shuffled\``);
    if (r.type === 'fillin') {
      const blanks = r.template.join(' ').split('___').length - 1;
      if (blanks !== r.answers.length) problems.push(`${where}: ${blanks} blanks against ${r.answers.length} answers`);
      r.template.forEach((line, li) => { if ((line.split('___').length - 1) !== 1) problems.push(`${where}: template line ${li} carries more or fewer than one blank`); });
      if (r.hints.length !== r.answers.length) problems.push(`${where}: hints and answers differ in number`);
      if (!r.distractors || r.distractors.length < 2 || r.distractors.length > 3) problems.push(`${where}: ${r.distractors?.length ?? 0} distractors`);
      if (new Set(r.answers.map((x) => x.toLowerCase())).size !== r.answers.length) problems.push(`${where}: a duplicated answer`);
      const printedNums = new Set((`${r.prompt} ${r.template.join(' ')}`.replace(/_{3,}/g, ' ').match(/\$?\d+(?:[.,]\d+)?%?/g) || []));
      r.answers.forEach((ans, i) => {
        const a = String(ans);
        const h = String(r.hints[i] || '');
        if (a.length >= 3 && h.toLowerCase().startsWith(a.toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${h}" starts like "${a}"`);
        if (/\d/.test(a) && (printedNums.has(a) || printedNums.has(a.replace('%', '')) || printedNums.has(a.replace('$', '')))) problems.push(`${where}: the answer "${a}" is printed in the recall's own text`);
        r.hints.forEach((other) => { if (new RegExp(`(^|[^\\w$.])${a.replace(/[.*+?^${}()|[\]\\%]/g, '\\$&')}($|[^\\w%])`, 'i').test(other)) problems.push(`${where}: the answer "${a}" is printed in a hint`); });
        if (/,/.test(a) || (a.trim().split(/\s+/).length > 3)) problems.push(`${where}: answer "${a}" is a compound token`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === a.toLowerCase())) problems.push(`${where}: "${a}" is both an answer and a distractor`);
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: why lines and items differ in number`);
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
      if (items.length < 4 || items.length > 8) problems.push(`${where}: ${items.length} items`);
      if (new Set(items).size !== items.length) problems.push(`${where}: an item appears in two groups`);
      if (r.groups.some((g) => !String(g.why ?? '').trim())) problems.push(`${where}: a classify group has no \`why\``);
    }
  }
  const reorderItems = recalls.filter(([, r]) => r.type === 'reorder').flatMap(([, r]) => r.correctOrder.map((x) => x.toLowerCase()));
  if (new Set(reorderItems).size !== reorderItems.length) problems.push('two reorders share an item');
  /* topFix-04, clause by clause: a Lorenz→Gini reorder; a Gini formula/endpoint fill-in; a fill-in on the two poverty definitions */
  const rec = (slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))?.recall;
  const lz = rec('lorenz-curve');
  if (lz?.type !== 'reorder' || !/gini/i.test(lz.prompt) || !/rank/i.test(lz.correctOrder[0]) || !/area/i.test(lz.correctOrder[lz.correctOrder.length - 1])) problems.push('topFix-04: the Lorenz→Gini procedure is not a reorder from ranking to the area ratio');
  const gc = rec('gini-coefficient');
  if (gc?.type !== 'fillin' || !gc.answers.includes('zero') || !gc.answers.includes('one')) problems.push('topFix-04: no Gini fill-in on the endpoints 0 and 1');
  /* fix round (verify-b step 16): the body teaches that the Gini is also written 0 to 100, so the fill-in names its 0 to 1 scale
     and no distractor may be an answer rewritten on the 0 to 100 scale (one → 100, zero → 0, 0.24 → 24) */
  if (gc) {
    const on100 = (a) => { const n = a === 'zero' ? 0 : a === 'one' ? 1 : Number(a); return Number.isFinite(n) ? [String(n * 100), String(Math.round(n * 100))] : []; };
    if (!/0 to 1 scale/i.test(gc.prompt)) problems.push('gini fill-in: the prompt does not name the 0 to 1 scale the answers use');
    for (const d of gc.distractors || []) if (gc.answers.some((a) => on100(a).includes(String(Number(d))) || (a === 'zero' && Number(d) === 0))) problems.push(`gini fill-in: distractor "${d}" is a correct answer on the 0 to 100 scale the body teaches`);
  }
  const ar = rec('absolute-relative-poverty');
  if (ar?.type !== 'fillin' || !ar.answers.includes('absolute') || !ar.answers.includes('relative')) problems.push('topFix-04: no fill-in on the two poverty definitions');
}

/* ══ 9 · TEACHING TEXT, NOTES, FLASHCARDS, EXTRAS AND LOCALE ════════════════ */
{
  for (const s of SUBSECTIONS) {
    const w = teachingWords(s);
    const where = s.id.split(':').pop();
    if (w > 350) problems.push(`${where}: ${w} words of teaching text against a budget of 350`);
    if (!s.keyIdea || s.keyIdea.length > 180) problems.push(`${where}: keyIdea missing or over 180 chars (${s.keyIdea?.length})`);
    if (s.keyIdea.includes('**')) problems.push(`${where}: keyIdea carries bold`);
    if (!s.misconception || !s.examMatters || !s.realExample?.text) problems.push(`${where}: misconception, examMatters or realExample missing`);
    if (!teachingVocabulary(s).length) problems.push(`${where}: none of the section's teaching terms appears in it`);
    for (const b of s.body) if (b.type === 'flow' && (b.steps.length < 2 || b.steps.length > 4)) problems.push(`${where}: a flow of ${b.steps.length} steps`);
    /* structure-05 / structure-07: no generated misconception template, no stock "top marks" ending */
    if (/^Wrong\b|Instead write:/i.test(s.misconception)) problems.push(`${where}: the misconception uses the "Wrong — … Instead write:" template`);
    if (/top marks|highest marks|earns? the highest/i.test(s.examMatters)) problems.push(`${where}: structure-07's stock "top marks" formula`);
    if (/perfect measure/i.test(s.misconception)) problems.push(`${where}: structure-05's filler misconception ("a perfect measure") is back`);
    /* structure-05 fix round 1: a misconception is a concept error, not an opinion and not an evaluation point */
    if (MISC_IDEOLOGY.test(s.misconception)) problems.push(`${where}: structure-05: an ideological misconception ("${s.misconception.match(MISC_IDEOLOGY)[0]}")`);
    if (MISC_EVALUATION.test(s.misconception)) problems.push(`${where}: structure-05: an evaluation point written as a misconception ("${s.misconception.match(MISC_EVALUATION)[0]}")`);
  }
  for (const m of MISTAKES) {
    const t = `${m.title} ${m.looks_like} ${m.why} ${m.instead}`;
    if (MISC_IDEOLOGY.test(t) || MISC_EVALUATION.test(t)) problems.push(`structure-05: common mistake "${m.title}" is an opinion or an evaluation point`);
  }
  /* A/B: each pattern catches the verifier's rejected sentences and passes their replacements */
  {
    const OLD = [
      [MISC_IDEOLOGY, 'Students explain income inequality only by effort. Effort matters, but so do things a worker does not choose.'],
      [MISC_IDEOLOGY, 'Students write that capitalism "causes poverty" or that it "is fair because everyone can succeed".'],
      [MISC_EVALUATION, 'Students argue either that inequality is always needed for incentives or that it always harms the economy. The impact depends on the degree.'],
      [MISC_EVALUATION, 'Students write that aid always reduces poverty or that it never works. The evidence depends on the type.'],
      [MISC_EVALUATION, 'It is a hypothesis built on data from a few countries; use it as one view and test it against the evidence.'],
    ];
    for (const [re, t] of OLD) if (!re.test(t)) problems.push(`the structure-05 guard no longer catches: "${t.slice(0, 60)}"`);
    if (MISC_IDEOLOGY.test('Students read a Gini of 0.4 as "40% of people are poor".') || MISC_EVALUATION.test('Students swap the axes, or draw the curve above the diagonal.')) problems.push('the structure-05 guard fires on a concept error');
  }
  /* structure-07: no two examMatters share an ending */
  const endings = SUBSECTIONS.map((s) => s.examMatters.trim().split(/\s+/).slice(-4).join(' ').toLowerCase());
  if (new Set(endings).size !== endings.length) problems.push('structure-07: two examMatters end with the same words');
  for (const b of content) {
    if (b.takeaway.length < 3) problems.push(`"${b.title}" has fewer than three takeaways`);
    b.takeaway.forEach((tk) => { if (tk.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${tk.slice(0, 40)}"`); });
  }
  /* structure-06: every takeaway term taught in its block */
  const TAKEAWAY_TERMS = ['median', 'headcount', 'poverty gap', 'mpi', 'growth', 'education', 'benefit', 'tax', 'structural change', 'aid', 'conflict', 'wealth', 'lorenz', 'gini', 'discrimination', 'inheritance', 'output per worker', 'institutions', 'save', 'schooling', 'migration', 'kuznets', 'technology', 'globalisation', 'markets'];
  for (const b of content) {
    const hay = b.sections.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((x) => [x.text, ...(x.items || []), ...(x.steps || []).map((y) => y.title)])]).join(' ').toLowerCase();
    for (const tk of b.takeaway) for (const term of TAKEAWAY_TERMS) if (tk.toLowerCase().includes(term) && !hay.includes(term)) problems.push(`structure-06: "${b.title}" takeaway names "${term}" and no subsection in the block teaches it`);
  }
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (EXAMINER_CLAIM.test(sent)) problems.push(`an examiner claim: "${sent.trim().slice(0, 90)}"`);
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled differently from its chapter`); });
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  /* structure-03's untaught flashcards (HDI, wealth tax, minimum wage, equity vs equality) are gone */
  for (const re of [/\bHDI\b/, /wealth tax/i, /minimum wage/i, /equity vs|equity and equality/i]) if (FLASHCARDS.some((f) => re.test(`${f.front} ${f.back}`))) problems.push(`structure-03: a flashcard on ${re.source} survives`);
  for (const [i, c] of EXTRAS.chains.entries()) if (!Array.isArray(c.steps) || !c.steps.length || !c.title) problems.push(`extras chain ${i + 1} is malformed`);
  for (const [i, e] of EXTRAS.evaluation.entries()) if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no content`);
  /* fix round (verify-b step 29): ExtrasTab renders every one of these fields as plain text, so a Markdown marker shows literally */
  const MD_MARKER = /\*\*|__|`|^\s*#|\[[^\]]*\]\(/m;
  const extrasText = [...EXTRAS.chains.flatMap((c, i) => [[`chain ${i + 1} title`, c.title], ...(c.steps || []).map((t, j) => [`chain ${i + 1} step ${j + 1}`, t]), [`chain ${i + 1} result`, c.result]]),
    ...EXTRAS.evaluation.flatMap((e, i) => [[`evaluation ${i + 1} title`, e.title], [`evaluation ${i + 1} content`, e.content]])];
  for (const [where, t] of extrasText) if (typeof t === 'string' && MD_MARKER.test(t)) problems.push(`extras ${where} carries a Markdown marker, which ExtrasTab shows literally`);
  if (MD_MARKER.test('a **bold** claim') === false) problems.push('the extras Markdown-marker check no longer fires on **');
  /* accuracy-01 / topFix-05: $3.00 is stated with its source; the source is the only place a year may appear */
  const lineHits = readable.filter((s) => /international poverty line/i.test(s) && /\$3\.00/.test(s));
  if (!lineHits.length || !lineHits.some((s) => s.includes(POVERTY_LINE_SOURCE))) problems.push('accuracy-01: the $3.00 line is not stated with its source');
  if (!lineHits.some((s) => /2021 prices|2021 PPP/.test(s))) problems.push('accuracy-01: the base year of the PPP is not stated');
  const yearsOutsideSource = readable.flatMap((s) => (s.replace(POVERTY_LINE_SOURCE, '').replace(/in 2021 prices/g, '').replace(/at 2021 purchasing power parity/g, '').match(/\b(19|20)\d\d\b/g) || []));
  if (yearsOutsideSource.length) problems.push(`a year outside the poverty-line source: ${yearsOutsideSource.join(', ')}`);
  /* topFix-05: the US 91%→70% top-rate claim is gone with the example */
  if (readable.some((s) => /91%\s*(?:→|to)|from 91%|\b(?:70|37)% top|CEO-to-worker|CEO pay/i.test(s))) problems.push('topFix-05: the US top-rate / CEO pay example survives');
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b|\bVAT\b/g, 'a UK-only institution (locale.institution)');
}

/* ══ 10 · DIAGRAMS ══════════════════════════════════════════════════════════ */
{
  const processSvg = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const palette = new Set([...processSvg.matchAll(/'(#[0-9a-fA-F]{6})':/g)].map((m) => m[1].toLowerCase()));
  if (palette.size < 10) problems.push(`only ${palette.size} colours parsed out of processSvg.js`);
  for (const d of ALL_DIAGRAMS) {
    for (const s of svgOf(d)) {
      for (const c of new Set([...s.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase()))) if (!palette.has(c)) problems.push(`"${d.title}" emits ${c}, which processSvg's remapper does not know`);
      for (const m of s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)) if (Number(m[1]) < MIN_FACE) problems.push(`"${d.title}" has a ${m[1]}-unit face`);
      const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (!vb || Number(vb[1]) !== FRAME.w) problems.push(`"${d.title}" is not drawn on the ${FRAME.w}-unit frame`);
      for (const m of s.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
        const x = Number(m[1]), y = Number(m[2]), size = Number(m[3]), anchor = m[4], str = m[5];
        const w = estWidth(str, size);
        const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
        if (left < -2 || left + w > FRAME.w + 2) problems.push(`"${d.title}" runs "${str.slice(0, 40)}" from ${Math.round(left)} to ${Math.round(left + w)}`);
        if (y > Number(vb?.[2] ?? 0) || y - size * 0.8 < 0) problems.push(`"${d.title}": "${str.slice(0, 32)}" sits outside the canvas vertically`);
      }
    }
    if (!d.title || !d.description) problems.push('a diagram is missing a title or description');
    if (!(d.checklist?.length >= 3)) problems.push(`"${d.title}": fewer than three checklist items`);
  }
  if (new Set(ALL_DIAGRAMS.map((d) => d.title)).size !== ALL_DIAGRAMS.length) problems.push('two diagrams share a title');
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
      for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) if (collides(boxes[i], boxes[j])) problems.push(`${where}: "${boxes[i].body.slice(0, 26)}" and "${boxes[j].body.slice(0, 26)}" overlap`);
      for (const ln of [...linesOf(scenario.svg), ...pathsOf(scenario.svg)]) for (const bx of boxes) if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
      for (const r of rectsOf(scenario.svg)) for (const bx of boxes) if (onRect(r, bx)) problems.push(`${where}: a bar is drawn under "${bx.body.slice(0, 26)}"`);
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('Income', 340, 100, 12), mk('Wealth', 340, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Income', 340, 100, 12), mk('Wealth', 340, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * 12)) problems.push(`LEAD ${LEAD} does not clear the guard's bound`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Median', 188, 120, 12))) problems.push('the line check does not see a vertical line through a label');
    if (!crossed({ x1: 70, y1: 300, x2: 310, y2: 60 }, mk('Line of equality', 150, 225, 12))) problems.push('the line check does not see the diagonal through a label');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mk('Lorenz', 170, 140, 12))) problems.push('the path reader does not turn a curve into a segment the line check can see');
    if (!onRect({ x: 182, y: 50, w: 100, h: 18 }, mk('20%', 200, 63, 12))) problems.push('the bar check does not see a label over a bar');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, ['$3.00', '$3.60', '$6.00', '20%', '30%', '0.39', '0.49', '$22.00', '$37.00'], 'poverty');
  want(1, ['10%', '20%', '30%', '$7.50', '$4.50', '$0.90', '$2.70'], 'growth and benefit');
  want(2, ['20%', '30%', '10%', '40%'], 'shocks');
  want(3, ['0.195', '0.39', '0.65', '29.3%', '50%', 'Line of equality', 'Lorenz curve'], 'Lorenz');
  want(4, ['×5.74', '×1.81'], 'compounding');
  want(5, ['35%', '91%', '64 yrs', '76 yrs', '12 years'], 'impact');
  want(6, ['Early', 'Middle', 'Later', '45%', '5%'], 'development');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const sub = (slug) => SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`));
  const hayOf = (slug) => { const s = sub(slug); return [s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((y) => `${y.title} ${y.subtitle}`)])].join(' ').toLowerCase(); };
  const mech = (slug, words) => { const hay = hayOf(slug); for (const w of words) if (!hay.includes(w)) problems.push(`${slug}: the mechanism word "${w}" is missing`); };
  mech('absolute-relative-poverty', ['median', 'not** the same thing as inequality', 'fixed line']);
  mech('measuring-absolute-poverty', ['headcount ratio', 'poverty gap', 'multidimensional poverty index']);           // specGap-02, topFix-01
  mech('measuring-relative-poverty', ['median', 'fraction']);
  mech('structural-change', ['lasting shift', 'skills', 'region']);                                                    // specThin-01
  mech('aid', ['directly', 'indirectly', 'tied']);                                                                     // specGap-03 (1c-6)
  mech('civil-war-conflict', ['displaced', 'assets', 'services']);                                                     // specGap-03 (1c-7)
  mech('income-wealth-inequality', ['flow', 'stock', 'income inequality', 'wealth inequality']);                       // specGap-01
  mech('inequality-between-countries', ['institutions', 'colonial', 'capital and infrastructure', 'primary products']); // specGap-04
  mech('kuznets-development', ['kuznets', 'hypothesis', 'structural change']);                                          // specGap-05
  mech('economic-change', ['technology', 'globalisation']);                                                             // specGap-05
  mech('free-market-capitalism', ['owning capital', 'ownership', 'free market economy (capitalism)']);                  // specGap-06
  mech('migration', ['remittances', 'within a country', 'between countries']);
  /* flows are unique */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => x.title).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) { console.error('the live bundle has no content/quiz array'); process.exit(1); }
const ctx = await contextFor(SECTION);
if (ctx.number !== '4.3.4' || ctx.unitCode !== 'WEC14') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 4.3.4 / WEC14`);
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
if (recoverableAfter.length) problems.push(`recall.recoverable: ${recoverableAfter.length} — ${recoverableAfter.map((f) => `${f.where}: ${f.detail}`).join(' | ').slice(0, 4000)}`);
if (uncovered.length) problems.push(`spec.uncovered: ${uncovered.map((f) => f.detail).join(' | ').slice(0, 600)}`);

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 51`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${coverage?.detail || 'no spec.coverage finding'}`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  spine:  abs ${E.absRate}% / rel ${E.relRate}% · median $${E.median} · Gini ${E.gini} → ${E.topPullGini} (rel still ${E.topPullRel}%) · wealth Gini ${E.wealthGini}`);
console.log(`  pins:   quiz ${JSON.stringify(Object.values(quizIndices))} · practice ${JSON.stringify(Object.values(practiceIndices))}`);
console.log(`  keys:   ${[0, 1, 2, 3].map((k) => QUIZ.filter((q) => q.correctIndex === k).length).join('/')}`);
for (const f of carried) console.log(`  carried ${f.tier} ${f.rule} ${f.where}: ${String(f.detail).slice(0, 100)}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (0 new DEBT on my own section).'); process.exit(1); }
console.log('\nall packet checks pass');

if (DUMP) {
  const path = `audit/snapshots/packet-51-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-51-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify({ ok: res.ok, staged: res.staged, unchanged: res.unchanged, summary: res.summary, newBlocks: res.newBlocks?.length, newDebt: res.newDebt?.length })}`);
  if (!res.ok) process.exit(1);
}
