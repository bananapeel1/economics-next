#!/usr/bin/env node
/**
 * PACKET 44 — aggregate-supply, Economics Unit 2 (WEC12), IAL topic 2.3.3.
 * `audit/raw/econ_spec.txt:1026-1049`. FIVE blocks, eighteen subsections, 14 substantive leaves.
 *
 *   node scripts/packet-44-aggregate-supply.mjs            # dry run, every check
 *   node scripts/packet-44-aggregate-supply.mjs --dump     # + write the bundle
 *   node scripts/packet-44-aggregate-supply.mjs --stage    # + write the draft (never `data`)
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Every check exists because something it looks for
 * shipped, in this repository, on a date. What this packet adds, with the reason:
 *
 *   - **THE SECTION IS ITS SPECIFICATION NUMBER.** The live section teaches 2.3.4 · 3 (equilibrium,
 *     two blocks) and 2.3.5 · 4 (output gaps, one subsection). `audit/SPEC-OWNERSHIP.md` gains the
 *     row and the runner holds the boundary: each neighbour may be POINTED AT a counted number of
 *     times, and every pointer must name the topic number it points to.
 *   - **THE NUMBERS THE LEDGER CITES ARE REFUSED ON THE DOCUMENT.** `structure-08`, `specGap-06`
 *     and `specGap-07` cite "2.4.3" and "2.5.2", and `specGap-05` cites "2.3.1" for a 2.3.3 leaf.
 *     The runner asserts the real headings by line and the cited numbers absent from the text.
 *   - **CAPACITY IS A PRODUCT, AND EVERY LRAS FIGURE IS DERIVED FROM IT.** Workers × output per
 *     worker, and working-age population × participation. Each LRAS shifter is asserted to move
 *     exactly one term, so a figure that is typed rather than derived fails the build.
 *   - **THE CLASSICAL ADJUSTMENT IS DERIVED OFF BOTH CURVES.** The short-run point is computed off
 *     SRAS and off AD₁ and compared; the long-run point is asserted to sit ON the LRAS, lower in
 *     price, with SRAS having moved by exactly the fall in AD (packet 34's two-sources rule).
 *   - **THE SRAS SHIFTERS SHARE ONE RULE, ASSERTED.** % change in unit costs = share × price change,
 *     and the horizontal shift at the old price level = slope × that change of the index.
 *   - **COLLISIONS ON THE EMITTED SVG, A/B'd** (packet 40's guard at tolerance 1.2, with the
 *     vertical-segment fix packet 31's version lacked).
 *   - **`recall.recoverable` IS READ OFF THE VALIDATOR, NOT RE-IMPLEMENTED.** The runner's own
 *     lexical check is kept for its A/B, and the gate is the shared measure's count, which must be 0.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, bn, mn, pct, idx, money, round1, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary, SRAS_FACTORS, LRAS_FACTORS,
} from './_packet44-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
} from './_packet44-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet44-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, COLLIDE_TOL, LEAD } from './_packet44-diagrams.mjs';

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
/* SVG text is student-facing text, joined one unit per SVG (packet 29). */
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
  /* A/B — the regex has no trailing \b, which is what packet 29's version was missing */
  for (const bad of ['a capacity of undefinedbn', 'the shift is NaN', 'the economy [object Object] grows', 'output of ' + '${bn(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['a Nash equilibrium is not this model', 'the object of the exercise is capacity', 'a capacity of $800bn']) {
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
    [0, 'an oil shock caused stagflation', 'the price level rose and real output fell'],
    [1, 'the economy returned to full employment', 'the economy returned to capacity'],
    [1, 'unemployment settled at its natural rate', 'the rate of participation rose'],
    [2, 'the short-run Phillips curve trades one off against the other', 'the AS curve slopes upward'],
    [3, 'government borrowing causes crowding out', 'the crowd of buyers at the port'],
    [4, 'privatisation of the railways', 'the private sector invests'],
    [4, 'deregulation of the labour market', 'a regulation that takes eight months'],
    [5, 'firms in perfect competition', 'firms facing real competition'],
    [5, 'economies of scale in production', 'economies that import most of their oil'],
    [6, 'Assess the importance of supply-side factors. (10 marks)', 'a brief assessment of the arguments'],
    [6, 'Outline two factors that shift LRAS.', 'the outline of the diagram'],
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
ban(/\bF0\d\d\b|\bC-aggregate-supply-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
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
  const [og] = POINTER_ONLY;
  if (!og.mustCite.test('Output gaps are topic 2.3.5.')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (og.mustCite.test('Output gaps open in a downturn.')) problems.push('the pointer-cite check accepts an uncited mention');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* capacity is a product of two terms, and the labour force is a product of two more */
  a(near(E.labour, E.workingAge * E.participation), `labour force ${E.labour} is not ${E.workingAge} × ${E.participation}`);
  a(E.capacity === (E.labour * 1e6 * E.perWorker) / 1e9, `capacity ${E.capacity} is not ${E.labour}m × $${E.perWorker}`);
  /* SRAS passes through capacity at the base price level, and a movement along it is on it */
  a(E.srasAt(E.P0) === E.capacity, 'the SRAS curve does not pass through capacity at the base price level');
  a(E.Ymove === E.srasIntercept + E.srasSlope * E.P1 && E.Ymove > E.capacity, 'the movement-along figure is not on the SRAS curve, or does not rise with the price level');
  /* the SRAS shifters share one rule: % change in unit costs = share × price change */
  for (const [name, share, rise, cost, left, Ynew] of [
    ['energy', E.energyShare, E.energyRise, E.energyCost, E.energyLeft, E.Yenergy],
    ['exchange rate', E.importShare, E.importRise, E.fxCost, E.fxLeft, E.Yfx],
  ]) {
    a(near(cost, share * rise), `${name}: unit costs rise ${cost}%, not ${share} × ${rise}%`);
    a(left === E.srasSlope * (E.P0 * cost) / 100, `${name}: the horizontal shift ${left} is not the slope × the vertical shift`);
    a(Ynew === E.capacity - left, `${name}: the new output at the old price level is not capacity minus the shift`);
  }
  a(E.taxLeft === E.srasSlope * E.taxCost && E.Ytax === E.capacity - E.taxLeft, 'the tax shift does not follow the same rule');
  a(E.Yappreciate === E.capacity + E.fxLeft, 'an appreciation is not the depreciation reversed');
  /* the combined case printed in `three-causes-one-mechanism` */
  a(E.srasAt(E.P0, -(E.energyLeft + E.fxLeft)) === E.capacity - E.srasSlope * (E.energyCost + E.fxCost), 'two cost shocks do not add');
  /* the classical adjustment, off BOTH curves */
  a(E.Ysr === E.YsrViaAd, `the short-run point is ${E.Ysr} off SRAS and ${E.YsrViaAd} off AD₁`);
  a(E.Ysr < E.capacity && E.Psr < E.P0, 'a fall in AD must lower both output and the price level in the short run');
  a(E.Ylr === E.capacity, `the long-run point ${E.Ylr} is not on the vertical LRAS at ${E.capacity}`);
  a(E.adIntercept - E.adFall - E.adSlope * E.Plr === E.capacity, 'the long-run point is not on AD₁');
  a(E.Plr < E.Psr, 'the long-run price level is not below the short-run one');
  a(E.srasRecovery === E.adFall, `SRAS shifts right by ${E.srasRecovery}, and with equal slopes it must move by the fall in AD, ${E.adFall}`);
  /* each LRAS shifter moves ONE term of the product */
  a(E.capTech === (E.labour * 1e6 * E.perWorker * (1 + E.techRise / 100)) / 1e9, 'technology: capacity is not labour × the new output per worker');
  a(E.capProd === Math.round((E.labour * 1e6 * E.perWorker * (1 + E.prodRise / 100)) / 1e9), 'productivity: capacity is not labour × the new output per worker');
  a(E.capSkills - E.capacity === (E.trained * 1e6 * E.perWorker * E.skillRise / 100) / 1e9, 'education: the rise is not trained workers × output per worker × the skill gain');
  a(E.capAgeing === ((E.workingAge - E.ageingLoss) * E.participation * 1e6 * E.perWorker) / 1e9 && E.capAgeing < E.capacity, 'demography: the ageing figure is not derived, or does not fall');
  a(E.capParticipation === (E.workingAge * E.participation2 * 1e6 * E.perWorker) / 1e9, 'participation: capacity is not derived from the new rate');
  a(E.capMigration === ((E.labour + E.netMigrants) * 1e6 * E.perWorker) / 1e9, 'net migration: capacity is not labour plus migrants times output per worker');
  /* the recall and practice arithmetic the content prints, recomputed independently of the module */
  a(0.2 * 15 + 0.1 * 20 === 5, 'three-causes recall: a fifth of 15% plus a tenth of 20% is not 5%');
  a(5 * 40 === 200 && near(5 * 40 * 1.1, 220, 1e-9), 'productivity recall: 5m × $40k is not $200bn, or a tenth more is not $220bn');
  a(round1(30 * 0.7) === 21 && round1(30 * 0.8 - 30 * 0.7) === 3, 'demography recall: 30m × 70% is not 21m, or 80% adds not 3m');
  a(near(0.4 * 15, 6), 'practice Calculate (2): 40% × 15% is not 6%');
  a(near(0.25 * 12 + 0.2 * -5, 2), 'practice Calculate (4): 3% − 1% is not 2%');
  /* fix round: the three check-in items that printed their key above them now use their own figures */
  a(near(0.4 * 10, 4), 'quiz: 40% × 10% is not 4%');
  a((25e6 * 30000) / 1e9 === 750, 'quiz: 25m × $30,000 is not $750bn');
  a(60 * 0.75 === 45, 'quiz: 60m × 75% is not 45m');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 18) problems.push(`${SUBSECTIONS.length} subsections, not 18`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (!b.sections.length) problems.push(`block "${b.title}" has no subsections`);
  }
  /* every pin must resolve — diagram-01, diagram-02, structure-03 and topFix-03 made unrepresentable */
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block still carries `diagramRef`, the legacy string pin that produced structure-03');
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
  /* ids OWNED by an item (not the diagramId references a block carries to them) must be unique */
  const ids = [
    ...content.map((b) => b.id), ...SUBSECTIONS.map((s) => s.id), ...SUBSECTIONS.map((s) => s.recall.id),
    ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id), ...FLASHCARDS.map((f) => f.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id),
  ];
  if (new Set(ids).size !== ids.length) problems.push(`duplicate ids: ${[...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].slice(0, 3).join(', ')}`);
  /* structure-04: one recall per subsection, so no step carries a recall that is not its own */
  for (const s of SUBSECTIONS) if (s.recall?.id !== `${s.id}:recall`) problems.push(`${s.id}: the recall id is not minted from its own subsection`);
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE NUMBERING, RE-READ FROM THE DOCUMENT ═══ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'economics' && r.topic === '2.3.3');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 17 || leaves.length !== 14) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 2.3.3, not 17 / 14`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 2.3.3 leaf in the oracle`);
  /* every mapped subsection must actually say the leaf's own words (a second method: the oracle's wording) */
  for (const leaf of leaves) {
    const words = leaf.wording.toLowerCase().replace(/[.:]/g, '').split(/\s+/).filter((w) => w.length > 4 && !['changes', 'influencing', 'between', 'distinction'].includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase()).join(' ');
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the specification's own lists, in its own words, match the util's copies */
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n');
  const span = spec.slice(1025, 1049).join(' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...SRAS_FACTORS, ...LRAS_FACTORS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and econ_spec.txt:1026-1049 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: econ_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1026, '2.3.3 Aggregate supply (AS)');
  at(884, '2.3.1 Measures of economic performance');
  at(976, '2.3.2 Aggregate demand (AD)');
  at(1056, '2.3.4 National income');
  at(1074, 'Equilibrium level');
  at(1094, '2.3.5 Economic growth');
  at(1121, 'Output gaps');
  /* the numbers structure-08, specGap-06 and specGap-07 cite must exist nowhere in the document */
  for (const n of ['2.4.3', '2.5.2']) if (spec.some((l) => new RegExp(`(^|\\s)${n.replace(/\./g, '\\.')}(\\s|$)`).test(l))) problems.push(`"${n}" occurs in econ_spec.txt after all — ledger items cite it and this packet refuses them on the ground that it does not`);
  /* and the words the bans rest on are measured, not remembered */
  const body = spec.join('\n');
  for (const w of ['stagflation', 'full employment', 'natural rate', 'self-correct']) if (new RegExp(w, 'i').test(body)) problems.push(`"${w}" occurs in econ_spec.txt after all — the ban rests on it being absent`);
  /* the section's own number in the database context is 2.3.3 (checked at the end, against contextFor) */
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
  for (const s of ['The first option is right.', 'Only the last of these shifts SRAS.', 'The former is a movement and the latter a shift.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['The first term of capacity is the labour force.', 'Wages fall at the second stage of the adjustment.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  /* near-duplicate stems, measured the way the validator words it: token Jaccard ≥ 0.5 */
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* nothing may be quizzed that no subsection teaches (quiz-03's property) */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])]).join(' ').toLowerCase();
  const KEY_TERMS = ['price level', 'real national output', 'sras', 'lras', 'unit cost', 'depreciation', 'appreciation', 'excise duty', 'payroll tax', 'classical', 'keynesian', 'sticky', 'bottleneck', 'productivity', 'participation', 'net migration', 'emigrat', 'competition policy', 'property rights', 'tax allowance'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea]).join(' ').toLowerCase();
    const onTopic = items.some((q) => q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (!onTopic) problems.push(`no quiz item pinned to "${b.title}" shares substantive vocabulary with the chapter`);
  }
  /* structure-01's specific defect: the LRAS chapter's first inline item must not be about SRAS */
  const lrasFirst = QUIZ[content[2].quizIndices[0]];
  if (/\bSRAS\b/.test(lrasFirst.question) && !/\bLRAS\b|classical|Keynesian|capacity/i.test(lrasFirst.question)) problems.push(`the LRAS chapter's first inline question is an SRAS question — structure-01 regressed: "${lrasFirst.question}"`);
}

/* ══ 7 · PRACTICE ═══════════════════════════════════════════════════════════ */
{
  /*
   * APPENDIX 6, PARSED out of `econ_spec.txt:2696-2760` rather than imported (packet 40's parser,
   * unchanged). `lib/content-validator.mjs` judges tariffs against `lib/ial-marking.js`; a runner that
   * imported the same table would agree with it by construction. A failed parse is a FAILURE, never
   * a silent fallback to a typed table — this runner's first draft did fall back, and printed
   * "Appendix 6 parsed" over a parse that had found nothing.
   */
  const lines = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n').slice(2695, 2760);
  const TARIFFS = {};
  for (const l of lines) {
    const m = l.match(/^\s{1,3}(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate)\b[^0-9]*?(\d+)(?:\s+or\s+(\d+))?\s{2,}/);
    if (m) TARIFFS[m[1]] = [Number(m[2]), ...(m[3] ? [Number(m[3])] : [])];
  }
  const WANT = { Define: [2], Calculate: [2, 4], Draw: [4], Explain: [4], Analyse: [6], Examine: [8], Discuss: [14], Evaluate: [20] };
  for (const [cmd, marks] of Object.entries(WANT)) {
    if (JSON.stringify(TARIFFS[cmd]) !== JSON.stringify(marks)) problems.push(`Appendix 6 parse: ${cmd} reads ${JSON.stringify(TARIFFS[cmd])} in the document, not ${JSON.stringify(marks)} — the parse or the table is wrong`);
  }
  if (Object.keys(TARIFFS).length !== 8) problems.push(`Appendix 6 parse produced ${Object.keys(TARIFFS).length} command words, not 8`);
  const seen = new Set();
  const tariffsSeen = new Set();
  for (const p of PRACTICE) {
    seen.add(p.command);
    tariffsSeen.add(`${p.command}:${p.marks}`);
    const allowed = TARIFFS[p.command];
    if (!allowed) { problems.push(`"${p.command}" is not an IAL Economics command word`); continue; }
    if (!allowed.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — Appendix 6 gives ${allowed.join(' or ')}`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not end in its own tariff`);
    if (!new RegExp(`(^|\\.\\s+)${p.command}\\b`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 44)}" does not put its command word at the start of a sentence`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 44)}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.question.slice(0, 44)}" carries the level descriptors`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
    if (p.marks > 6 && !/\bLevel 1\b/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance has no level descriptors`);
    const ALLOCATES = /\(\s*\d+\s*marks?\s*\)|\b(One|Two|Three|Four) marks? for\b/;
    if (p.marks <= 6 && !ALLOCATES.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
  }
  for (const cmd of Object.keys(TARIFFS)) if (!seen.has(cmd)) problems.push(`no practice item uses the command word ${cmd}`);
  for (const m of TARIFFS.Calculate) if (!tariffsSeen.has(`Calculate:${m}`)) problems.push(`no Calculate at ${m} marks`);
  /* practice-01: the LRAS item is not a 4-mark Define, and no Define is anything but 2 */
  if (PRACTICE.some((p) => p.command === 'Define' && p.marks !== 2)) problems.push('practice-01 regressed: a Define carries a tariff other than 2');
  if (PRACTICE.some((p) => /\bOutline\b|\bAssess\b/.test(p.question))) problems.push('an Outline or Assess item survived');
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
    if ('shuffled' in r) problems.push(`${where}: recall carries \`shuffled\` (structure-06)`);
    if (r.type === 'fillin') {
      const blanks = r.template.join(' ').split('___').length - 1;
      if (blanks !== r.answers.length) problems.push(`${where}: ${blanks} blanks against ${r.answers.length} answers`);
      /* topFix-01 / structure-07: no template LINE may carry two blanks for one compound answer */
      r.template.forEach((line, li) => { if ((line.split('___').length - 1) > 1) problems.push(`${where}: template line ${li} carries two blanks — the shape FillInRecall could not render (structure-07)`); });
      if (r.hints.length !== r.answers.length) problems.push(`${where}: ${r.hints.length} hints against ${r.answers.length} answers`);
      if (!r.distractors || r.distractors.length < 2 || r.distractors.length > 3) problems.push(`${where}: ${r.distractors?.length ?? 0} distractors, and the contract is 2-3`);
      if (new Set(r.answers.map((x) => x.toLowerCase())).size !== r.answers.length) problems.push(`${where}: a duplicated answer`);
      r.answers.forEach((ans, i) => {
        const h = String(r.hints[i] || '');
        if (String(ans).length >= 3 && h.toLowerCase().startsWith(String(ans).toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${h}" is a prefix of "${ans}"`);
        if (new RegExp(`^_{${String(ans).length}}$|\\b${String(ans).length} letters\\b`).test(h)) problems.push(`${where}: hint reveals the length of "${ans}"`);
        if (/[,]/.test(String(ans)) || /\s/.test(String(ans).trim()) && String(ans).split(/\s+/).length > 3) problems.push(`${where}: answer "${ans}" is a compound token (topFix-01)`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === String(ans).toLowerCase())) problems.push(`${where}: "${ans}" is both an answer and a distractor`);
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
      /* structure-06: no generic exam-procedure list — every item must name economics, not a writing step */
      if (r.correctOrder.some((x) => /^(identify|explain|state|show|draw|evaluate|analyse|define|conclude)\b/i.test(x))) problems.push(`${where}: a reorder item is an exam-procedure step (structure-06)`);
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
  /* structure-06's second half: the same generic list may not recur — no two reorders share an item */
  const reorderItems = recalls.filter(([, r]) => r.type === 'reorder').flatMap(([, r]) => r.correctOrder.map((x) => x.toLowerCase()));
  if (new Set(reorderItems).size !== reorderItems.length) problems.push('two reorders share an item — the generic-list defect of structure-06');
}
{
  /*
   * THE RUNNER'S OWN ANSWER-RECOVERABLE CHECK, kept for its A/B against a real negative control.
   * The GATE is the validator's shared measure, read at the end (packet 2.7: one measure, not five).
   */
  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const answersOf = (r) => (r.type === 'fillin' ? r.answers : r.type === 'reorder' ? r.correctOrder : r.type === 'match' ? r.pairs.map((p) => p.right) : r.groups.flatMap((g) => g.items));
  const recoverable = (sec, r) => {
    const hay = norm([sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' '));
    const long = answersOf(r).map(norm).filter((x) => x.split(' ').length >= 4);
    if (!long.length) return 0;
    return long.filter((x) => hay.includes(x)).length / long.length;
  };
  for (const sec of SUBSECTIONS) {
    const share = recoverable(sec, sec.recall);
    if (share > 0.5) problems.push(`${sec.id.split(':').pop()}: ${Math.round(share * 100)}% of the recall's long answers are printed verbatim above it`);
  }
  const control = SUBSECTIONS.find((s) => s.id.endsWith('long-run-as'));
  const plantedAnswers = control.body.slice(0, 3).map((b) => b.text.replace(/\*\*/g, '').split('.')[0]);
  if (recoverable(control, { type: 'reorder', correctOrder: plantedAnswers }) <= 0.5) problems.push('the answer-recoverable check does not catch a recall made of the subsection\'s own sentences');
  if (recoverable(control, { type: 'fillin', answers: ['capacity', 'labour'] }) > 0.5) problems.push('the answer-recoverable check fires on a recall that only shares vocabulary');
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
  /* structure-09: the SRAS/Keynesian conflation may not come back in a takeaway */
  for (const b of content) for (const t of b.takeaway) if (/SRAS[^.]*steep|steep[^.]*SRAS/i.test(t)) problems.push(`a takeaway puts the Keynesian steepening on SRAS (structure-09): "${t}"`);
  if (!SUBSECTIONS.find((s) => s.id.endsWith('keynesian-lras')).misconception.includes('SRAS')) problems.push('the Keynesian misconception no longer refutes the SRAS conflation (structure-09, topFix-05)');
  /* claim.uncited: a sentence about what a marker does needs a source */
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
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array — ExtrasTab maps chain.steps`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} has no \`content\` string`);
}
{
  /* one currency, one minus sign, no year, no UK frame (locale.uk, locale.institution); topFix-04 */
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure; `money` emits U+2212');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme (topFix-04, accuracy-01, accuracy-02 were all dated claims)');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b/g, 'a UK frame (locale.uk; topFix-04 and accuracy-01/02 were UK examples)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b|\bVAT\b/g, 'a UK-only institution (locale.institution)');
  ban(/\bCOVID\b|\bpandemic\b|\b2008\b/gi, 'the live section\'s event examples (topFix-04) — this section no longer teaches AD/AS events');
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
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
  });
  /*
   * THE CURVES ARE <path>s, AND A LABEL ON A CURVE IS THE SAME DEFECT AS A LABEL ON A LINE. Packet
   * 40's guard reads `<line>` only; every AS curve in this module is a straight `M x y L x y` path, so
   * those are read as segments too. A curved path (the Keynesian curve) is read by its polyline of
   * command points, which is conservative on the bend.
   */
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
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('SRAS₁', 340, 100, 12), mk('SRAS', 340, 110, 12))) problems.push('the collision guard does not fire on two curve labels 10 units apart at one edge');
    if (collides(mk('SRAS₁', 340, 100, 12), mk('SRAS', 340, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALLEST_FACE())) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('LRAS', 188, 120, 12))) problems.push('the line check does not see a vertical LRAS drawn through a label');
    if (!crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mk('output', 120, 196, 12))) problems.push('the line check does not see a label on a sloping curve');
    if (crossed({ x1: 100, y1: 200, x2: 300, y2: 140 }, mk('output', 120, 80, 12))) problems.push('the line check fires on a label clear of the curve');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mk('SRAS', 170, 140, 12))) problems.push('the path reader does not turn a straight curve into a segment the line check can see');
  }
  /* the figures the teaching states must be countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, [String(E.capacity), String(E.Ymove), idx(E.P1), String(E.Yenergy)], 'movement-and-shift');
  want(1, [String(E.Yenergy), String(E.Yfx), String(E.Yappreciate), String(E.Ytax), pct(E.energyCost), pct(E.fxCost)], 'SRAS-shifters');
  want(2, [String(E.Ysr), idx(E.Psr), idx(E.Plr), String(E.kFlatUntil), 'LRAS', 'SRAS₁', 'AD₁'], 'LRAS-shapes');
  want(3, [String(E.capTech), String(E.capProd), String(E.capSkills)], 'output-per-worker');
  want(4, [String(E.capAgeing), String(E.capParticipation), String(E.capMigration)], 'labour-force');
  /* topFix-03: the classical adjustment draws AD, SRAS and LRAS together, with both SRAS positions */
  const adj = ALL_DIAGRAMS[2].scenarios.find((s) => /adjustment/i.test(s.label));
  if (!adj) problems.push('topFix-03: no scenario draws the classical adjustment');
  else for (const w of ['LRAS', 'SRAS', 'SRAS₁', 'AD', 'AD₁']) if (!new RegExp(`>${w}<`).test(adj.svg)) problems.push(`topFix-03: the adjustment scenario does not label ${w}`);
}
function SMALLEST_FACE() { return 12; }

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const all = readable.join(' \n ');
  /* accuracy-01 and topFix-04: the 2022 manufacturers example, the 2019 "equilibrium", the stagflation attribution, COVID */
  for (const [re, id] of [[/manufacturers? in early/i, 'accuracy-01'], [/close to macroeconomic equilibrium/i, 'accuracy-02'], [/had not predicted/i, 'topFix-04'], [/confidence collapse/i, 'topFix-04']]) if (re.test(all)) problems.push(`${id} regressed: "${re.source}" is back`);
  /* topFix-05 / structure-05: no two subsections teach the same causal chain — flows are unique */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => (typeof x === 'object' ? x.title : x)).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain (structure-05)');
  /* specGap-01..04: each LRAS bullet gets a subsection whose teaching carries a MECHANISM word */
  const mech = (slug, words) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); const hay = [s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase(); for (const w of words) if (!hay.includes(w)) problems.push(`${slug}: the mechanism word "${w}" is missing`); };
  mech('productivity', ['output per worker', 'capacity']);
  mech('demography', ['working age', 'participation', 'ageing', 'capacity']);
  mech('net-migration', ['immigration', 'emigrate', 'labour force', 'skills']);
  mech('regulations-and-tax', ['regulation', 'tax', 'incentive', 'capacity']);
  mech('competition-policy', ['cartel', 'merger', 'rivals', 'output per worker']);
  /* specGap-05: the LRAS movement-along statement exists */
  if (!/movement along it changes the price level and leaves real output/i.test(all)) problems.push('specGap-05: the vertical-LRAS movement-along sentence is missing');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '2.3.3' || ctx.unitCode !== 'WEC12') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 2.3.3 / WEC12`);
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
if (recoverableAfter.length) problems.push(`recall.recoverable (the shared measure): ${recoverableAfter.length} recall(s) answerable by scrolling up — ${recoverableAfter.map((f) => `${f.where}: ${f.detail}`).join(' | ').slice(0, 4000)}`);
if (uncovered.length) problems.push(`spec.uncovered: ${uncovered.map((f) => f.detail).join(' | ').slice(0, 300)}`);

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 44`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  spine:  ${mn(E.labour)} × ${money(E.perWorker)} = ${bn(E.capacity)} · SRAS Y = ${E.srasIntercept} + ${E.srasSlope}P · AD −${E.adFall}: SR ${E.Ysr} @ ${idx(E.Psr)}, LR ${E.Ylr} @ ${idx(E.Plr)}`);
console.log(`  pins:   quiz ${JSON.stringify(Object.values(quizIndices))} · practice ${JSON.stringify(Object.values(practiceIndices))}`);
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
  SCOPE      2.3.3 only; output gaps (2.3.5), the multiplier and equilibrium real output (2.3.4)
             and the determinants of AD (2.3.2) each pointed at within a budget, every pointer
             carrying its topic number; stagflation, full employment, natural rate, Phillips
             curve, crowding out, supply-side INSTRUMENTS, Unit 3 market-structure words, Assess
             and Outline banned — each A/B'd against a string it must catch and one it must not
  NUMBERING  the oracle re-read (17 rows / 14 leaves), every leaf mapped and its own words found
             in the mapped subsections, the spec's two factor lists matched to :1026-1049, seven
             headings asserted by line, and "2.4.3" and "2.5.2" asserted ABSENT from the document
  ARITHMETIC capacity = workers × output per worker and labour = working-age × participation;
             every SRAS shifter by one rule (share × price change); every LRAS shifter through ONE
             term; the classical adjustment off BOTH curves, landing ON the LRAS at a lower price
  PINS       derived from each item's block tag; ${content.length} blocks, each with its own diagram, quiz and
             practice; no diagramRef; ${3 + content.length} free quiz items against FREE_QUIZ_MAX 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal
             (A/B'd both ways), no near-duplicate stems, nothing tested that is not taught
  PRACTICE   Appendix 6 parsed; all eight command words and both Calculate tariffs; two-paragraph
             guidance with a clean opening; points to 6 marks, levels above
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, one blank per template line, no procedure lists,
             no shared reorder items, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent and collisions (lines AND
             paths, vertical segments included) checked on the emitted SVG with the guard A/B'd, and
             every figure counted back out of the SVG`);

if (DUMP) {
  const path = `audit/snapshots/packet-44-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-44-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
