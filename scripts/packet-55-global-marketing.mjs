#!/usr/bin/env node
/**
 * PACKET 55 — global-marketing, Business Unit 4 (WBS14), IAL topic 4.3.3.
 * `audit/raw/bus_spec.txt:1424-1446`. FIVE blocks, fifteen subsections, 13 leaves.
 *
 *   node scripts/packet-55-global-marketing.mjs            # dry run, every check
 *   node scripts/packet-55-global-marketing.mjs --dump     # + write the bundle
 *   node scripts/packet-55-global-marketing.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 47's runner, adapted. What this packet adds, with the reason:
 *
 *   - **THE LEDGER'S NUMBERS ARE ONE DIGIT SHORT AND LAND ON REAL, DIFFERENT TOPICS.** specGap-01..05
 *     cite "4.3.1"/"4.3.2", which in this document are Globalisation and packet 47's section. The
 *     runner asserts the five 4.3.x headings by line, that item 1 stops at (d) and item 3 at (a),
 *     and that no "social media" bullet sits inside 4.3.3 (specGap-06 is wont-fix on that).
 *   - **HOFSTEDE, HALL AND THE LIVE ANECDOTES ARE BANNED, AND EACH BAN IS RE-MEASURED.** "Hofstede",
 *     "high-context" and "stuck in the middle" are asserted ABSENT from bus_spec.txt, so a ban cannot
 *     outlive the fact it rests on.
 *   - **ANSOFF AND PORTER ARE TAUGHT HERE, AND THE CITATION IS RE-READ.** bus_spec.txt:1435 must name
 *     both under 4.3.3, and :1098-1099 must hold them under 3.3.1.
 *   - **THE CHECK-IN'S LEADING QUIZ KEY IS NOT PRINTED ON THE CHECK-IN'S DIAGRAM**, text and figures.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { mistakeGaps } from '../lib/mistakes-shape.js';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, FIRM, usd, usdm, units, pct, round2, BANNED, APPROACHES, CULTURAL_BULLETS, teachingWords, teachingVocabulary } from './_packet55-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet55-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet55-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD } from './_packet55-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const F = FIRM;

const problems = [];
const notes = [];
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
const spec = readFileSync('audit/raw/bus_spec.txt', 'utf8').split('\n');
const specBody = spec.join('\n');

/* ══ 1 · A FAILED SUBSTITUTION, ON EVERY SURFACE ════════════════════════════ */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
for (const bad of ['a cost of $undefinedm', 'a premium of NaN%', 'the firm [object Object] sells', 'a price of ' + '${usd(x)}']) if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
for (const ok of ['the object of the campaign', 'a price of $30']) if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);

/* ══ 2 · THE BANNED VOCABULARY, EACH BAN A/B'D AND RE-MEASURED ═══════════════ */
for (const [re, why] of BANNED) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  const fires = (i, str) => { const [re] = BANNED[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'Hofstede\'s cultural dimensions explain the difference', 'cultural differences in beliefs and customs'],
    [0, 'a country with high power distance', 'the power of buyers in a niche'],
    [1, 'in a high-context, collectivist culture', 'in the context of a new market'],
    [2, 'a firm stuck in the middle of the matrix', 'a firm in the middle of the spectrum'],
    [3, 'the Chevrolet Nova did not sell in Spanish markets', 'a novel product for a new market'],
    [3, 'the slogan came out as "eat your fingers off"', 'the slogan came out meaning something odd'],
    [4, 'Outline two ways Ansoff\'s matrix can be applied.', 'A strong answer, in outline:'],
    [4, 'Define the term glocalisation. (4 marks)', 'Define glocalisation in your own words.'],
    [4, 'Analyse the approach. (6 marks)', 'analysis of both sides'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bF0\d\d\b|\bC-global-marketing-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['Hofstede', 'high-context', 'high context', 'low-context', 'stuck in the middle', 'power distance', 'uncertainty avoidance']) if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban rests on it being absent`);

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(F.globalCampaign / F.countries === 200_000, 'one campaign is not $200,000 a country');
  a(F.localCampaign * F.countries === 2_700_000 && F.campaignSaving === 1_500_000, 'six local campaigns are not $2.7m, or the saving is not $1.5m');
  a(near(F.perMlBottle, 0.09) && near(F.perMlPack, 0.12), 'price per ml is not $0.09 and $0.12');
  a(near(F.perMlPack / F.perMlBottle, 4 / 3), '"a third more" per ml is not true');
  a(F.packPrice / F.bottlePrice === 1 / 6, '"a sixth of the money at the till" is not true');
  a(F.nicheBuyers === 160_000, 'the niche is not 160,000 buyers');
  a(F.nicheBottles === 480_000 && F.nicheRevenue === 14_400_000, 'the niche revenue is not 480,000 bottles and $14.4m');
  a(F.premiumPct === 50, 'the premium is not 50%');
  /* the words the prose prints, read back from the printed body (packet 47 fix round 1) */
  const priceSub = JSON.stringify(SUBSECTIONS.find((s) => s.id.endsWith('price-in-global-markets')).body);
  a(/a third more/.test(priceSub) && /a sixth of the money/.test(priceSub), 'the price subsection no longer states "a third more" and "a sixth of the money" — re-check the words against the figures');
  /* quiz arithmetic, recomputed here and not read from the module */
  a(8 * 300_000 - 1_600_000 === 800_000, 'quiz: campaign saving $800,000');
  a(near(4 / 1000, 0.004) && near(0.25 / 50, 0.005) && near((0.25 / 50) / (4 / 1000), 1.25), 'quiz: sachet 25% dearer per gram');
  a(near((0.005 - 0.004) / 0.005, 0.2), 'quiz: the 20% distractor is the gap over the sachet price');
  a(near((36 - 30) / 30, 0.2) && Math.round(((36 - 30) / 36) * 100) === 17, 'quiz: premium 20% / 17% distractor');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 15) problems.push(`${SUBSECTIONS.length} subsections, not 15`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (b.sections.length < 3) problems.push(`block "${b.title}" has ${b.sections.length} subsections`);
  }
  const dIds = new Set(ALL_DIAGRAMS.map((d) => d.id));
  for (const b of content) if (!dIds.has(b.diagramId)) problems.push(`block "${b.title}" pins a diagram id no diagram carries`);
  if (new Set(content.map((b) => b.diagramId)).size !== content.length) problems.push('two blocks share a diagram');
  if (JSON.stringify(bundle).includes('"diagramRef"')) problems.push('a block carries the legacy `diagramRef`');
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items, not 3 — the pre-test asks three`);
  if ([...unpinned].some((i) => i > 2)) problems.push('an unpinned quiz item is not among the first three in the array');
  if (3 + content.length > 10) problems.push(`${3 + content.length} free quiz items needed against FREE_QUIZ_MAX 10`);
  const pinnedQ = new Set(Object.values(quizIndices).flat());
  QUIZ.forEach((q, i) => { if (q.block && !pinnedQ.has(i)) problems.push(`quiz item ${i} is tagged "${q.block}" and reaches no block`); });
  const pinnedP = new Set(Object.values(practiceIndices).flat());
  PRACTICE.forEach((p, i) => { if (!pinnedP.has(i)) problems.push(`practice item ${i} (${p.command}) reaches no block`); });
  if (content.map((b) => b.quizIndices[0]).every((v, i) => v === i)) problems.push('quizIndices open 0,1,2,… in block order');
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
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '4.3.3');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 15 || leaves.length !== 13) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 4.3.3, not 15 / 13`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 4.3.3 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[.:()]/g, '');
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/]+/).filter((w) => w.length > 4 && !['application', 'recognition', 'considerations', 'different'].includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])].join(' ')).join(' '));
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the util's lists match the document's own words at :1424-1446 */
  const span = spec.slice(1423, 1446).join(' ').replace(/\s+/g, ' ').toLowerCase().replace(/[’']/g, '\'');
  for (const f of [...APPROACHES, ...CULTURAL_BULLETS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and bus_spec.txt:1424-1446 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1323, '4.3.1 Globalisation');
  at(1372, '4.3.2 Global markets and business expansion');
  at(1424, '4.3.3 Global marketing');
  at(1435, 'Ansoff');
  at(1435, 'Porter');
  at(1453, '4.3.4 Global industries and companies');
  at(1098, 'Ansoff');
  at(1099, 'Porter’s Strategic Matrix');
  /* item 1 stops at (d) and item 3 has only (a): specGap-03's "(e)", specGap-07's "(c)-(f)" and
     specGap-06's "(g)" do not exist inside 4.3.3 */
  const inside = spec.slice(1423, 1452);
  const letters = inside.map((l) => l.match(/^\s*(?:\d\s+[A-Z][\w/ ]+?)?\s+([a-g])\)\s/)).filter(Boolean).map((m) => m[1]);
  if (JSON.stringify(letters) !== JSON.stringify(['a', 'b', 'c', 'd', 'a', 'b', 'c', 'a'])) problems.push(`the lettered lines inside 4.3.3 read ${letters.join(',')}, not a,b,c,d / a,b,c / a`);
  if (inside.some((l) => /social media/i.test(l))) problems.push('"social media" occurs inside 4.3.3 after all — specGap-06 is wont-fix on its absence');
  const sm = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /social media/i.test(l)).map(([n]) => n);
  if (sm.some((n) => n >= 1424 && n < 1453)) problems.push(`social media at ${sm.join(', ')} includes a line inside 4.3.3`);
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
  const ORDINAL = /\b(first|second|third|fourth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|market|translator)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'The former is ethnocentric.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
  /* quiz-01 / topFix-03: the sachet item asks for BOTH Ps; no item keys a pack-size change as price alone */
  const sachet = QUIZ.filter((q) => /sachet|single-use/i.test(q.question));
  for (const q of sachet) {
    const key = q.options[q.correctIndex].toLowerCase();
    if (/pack|sachet|single-use/.test(q.question.toLowerCase()) && /^price$/.test(key)) problems.push(`quiz-01: "${q.question.slice(0, 50)}" keys a pack-size change as Price alone`);
  }
  if (!QUIZ.some((q) => /sachet/i.test(q.question) && q.options[q.correctIndex] === 'product and price')) problems.push('quiz-01: no item asks for both Ps of the sachet case');
  /* topFix-03: the colour trivia and the absurd distractors are gone */
  if (QUIZ.some((q) => /colour white|do not watch television|do not have brand names/i.test(`${q.question} ${q.options.join(' ')}`))) problems.push('topFix-03: a retired live item survives');
}
{
  /* structure-02 / topFix-01: nothing quizzed that no subsection teaches */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['ethnocentric', 'polycentric', 'geocentric', 'glocalisation', 'global marketing strategy', 'market development', 'product development', 'diversification', 'market penetration', 'cost leadership', 'differentiation focus', 'cost focus', 'niche', 'premium', 'value', 'unintended meaning', 'inappropriate promotion', 'inappropriate branding', 'tastes', 'sachet', 'place', 'promotion', 'tariffs'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    const taught = teaching.includes(term.replace('inappropriate promotion', 'promotion').replace('inappropriate branding', 'branding'));
    if (quizzed && !taught) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...s.body.map((x) => x.text || (x.items || []).join(' '))]).join(' ').toLowerCase();
    const off = items.filter((q) => !q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (off.length) problems.push(`quiz item(s) pinned to "${b.title}" share no substantive word with the chapter: ${off.map((q) => q.question.slice(0, 40)).join(' | ')}`);
  }
  /* the pre-test is answerable from chapter one */
  const ch1 = content[0].sections.map((s) => JSON.stringify(s)).join(' ').toLowerCase();
  for (const i of unpinned) { const k = QUIZ[i].options[QUIZ[i].correctIndex].toLowerCase(); if (!ch1.includes(k.split(/[ /]/)[0])) problems.push(`pre-test key "${k}" is not taught in chapter one`); }
}

/* ══ 7 · PRACTICE ═══════════════════════════════════════════════════════════ */
{
  /* Appendix 6, PARSED out of bus_spec.txt rather than imported from lib/ial-marking.js */
  const lines = spec.slice(2215, 2252);
  const TARIFFS = {};
  lines.forEach((l, i) => {
    const m = l.match(/^(Define|Calculate|Construct|Explain|Analyse|Discuss|Assess|Evaluate)\s+(\d+)\s{2,}/);
    if (!m) return;
    TARIFFS[m[1]] = [Number(m[2])];
    if (m[1] === 'Assess') {
      const later = lines.slice(i + 1, i + 6);
      const unit34 = later.findIndex((x) => /\[Units 3\/4\]/.test(x));
      const n = later.slice(0, unit34 + 1).map((x) => x.match(/^\s{10,}(\d+)\s*$/)).find(Boolean);
      if (unit34 < 0 || !n) problems.push('Appendix 6 parse: the Units 3/4 Assess tariff was not found below the Assess line');
      else TARIFFS.Assess34 = [Number(n[1])];
    }
  });
  const WANT = { Define: [2], Calculate: [4], Construct: [4], Explain: [4], Analyse: [6], Discuss: [8], Assess: [10], Assess34: [12], Evaluate: [20] };
  for (const [cmd, marks] of Object.entries(WANT)) if (JSON.stringify(TARIFFS[cmd]) !== JSON.stringify(marks)) problems.push(`Appendix 6 parse: ${cmd} reads ${JSON.stringify(TARIFFS[cmd])}, not ${JSON.stringify(marks)}`);
  const allowed = (cmd) => (cmd === 'Assess' ? TARIFFS.Assess34 : TARIFFS[cmd]);
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).business.units_3_4.sections;
  const secA = paper.find((s) => s.id === 'A');
  const essays = paper.filter((s) => s.kind === 'essay');
  const sourceSet = PRACTICE.filter((p) => p.marks < 20).map((p) => p.marks).sort((a, b) => a - b);
  if (JSON.stringify(sourceSet) !== JSON.stringify([...secA.tariffs].sort((a, b) => a - b))) problems.push(`the source set is ${JSON.stringify(sourceSet)}, and Units 3-4 Section A is ${JSON.stringify(secA.tariffs)}`);
  const ev = PRACTICE.filter((p) => p.marks === 20);
  if (ev.length !== essays.length || ev.some((p) => p.command !== 'Evaluate')) problems.push(`${ev.length} Evaluate essays against the paper's ${essays.length}`);
  for (const p of PRACTICE.filter((x) => x.marks < 20)) {
    const byTariff = secA.commandWordByTariff[String(p.marks)] || [];
    if (!byTariff.includes(p.command)) problems.push(`${p.command} (${p.marks}) is not a command word the Units 3-4 source set uses at ${p.marks} (${byTariff.join('/')})`);
  }
  for (const p of PRACTICE) {
    const ok = allowed(p.command);
    if (!ok) { problems.push(`"${p.command}" is not an IAL Business command word`); continue; }
    if (!ok.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — Appendix 6 gives ${ok.join(' or ')} for Units 3/4`);
    if (!p.question.startsWith(EXTRACT)) problems.push(`practice "${p.command} ${p.marks}" is not on the source`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.command}" does not end in its own tariff`);
    if (!new RegExp(`(^|\\.\\s+)${p.command}\\b`).test(p.question.trim())) problems.push(`practice "${p.command} ${p.marks}" does not put its command word at the start of a sentence`);
    if (!p.question.slice(EXTRACT.length).includes(F.name)) problems.push(`practice "${p.command} ${p.marks}": the task does not name the firm`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\d{3,}/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries the level descriptors`);
    if (/market development|product development|diversification|differentiation|premium|halal|\bgel\b|distributor|slippery/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" names part of the answer: "${open.slice(0, 80)}"`);
    if (p.marks > 6) {
      if (/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
      for (const L of ['Level 1', 'Level 2', 'Level 3', 'Level 4']) if (!p.guidance.includes(L)) problems.push(`${p.marks}-mark ${p.command} guidance has no ${L}`);
      for (const w of ['knowledge', 'application', 'analysis', 'evaluation']) if (p.command !== 'Discuss' && !p.guidance.toLowerCase().includes(w)) problems.push(`${p.marks}-mark ${p.command} guidance never names ${w} (topFix-05)`);
      if (p.marks >= 12 && !/A strong answer, in outline:/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} has no short model answer`);
    } else if (!/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (p.command === 'Discuss' && /\bconclu/i.test(p.guidance.replace(/does not need a final recommendation/, ''))) problems.push('Discuss guidance asks for a conclusion (V036)');
  }
  /* the source carries every figure the tasks and schemes lean on */
  for (const f of [usdm(F.globalCampaign), usd(F.localCampaign), ...F.nicheCountries.map((n) => units(n)), usd(F.nichePrice), usd(F.massPrice), String(F.countries), F.market, 'slippery', 'small family shops', 'hair-care']) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  /* topFix-05, named */
  const ex = PRACTICE.find((p) => p.command === 'Explain');
  if (!/Explain one way\b/.test(ex?.question || '')) problems.push('topFix-05: the 4-mark Explain is not "Explain one way..."');
  if (!/market development/.test(ex.guidance) || !/"product development"/.test(ex.guidance)) problems.push('topFix-05: the Explain guidance does not separate market development from product development');
  if (PRACTICE.some((p) => /India|McDonald|fast-food|fast food/i.test(p.question + p.guidance))) problems.push('topFix-05: the live India / fast-food context survives');
  /* the Calculate scheme's answer is recomputed, not read */
  const calc = PRACTICE.find((p) => p.command === 'Calculate');
  const total = F.nicheCountries.reduce((a, b) => a + b, 0) * F.bottlesEach * F.nichePrice;
  if (!calc.guidance.includes(usdm(total))) problems.push(`the Calculate scheme does not print ${usdm(total)}`);
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
      r.template.forEach((ln, li) => { if ((ln.split('___').length - 1) > 1) problems.push(`${where}: template line ${li} carries two blanks`); });
      if (r.hints.length !== r.answers.length) problems.push(`${where}: ${r.hints.length} hints against ${r.answers.length} answers`);
      if (!r.distractors || r.distractors.length < 2 || r.distractors.length > 3) problems.push(`${where}: ${r.distractors?.length ?? 0} distractors, and the contract is 2-3`);
      if (new Set(r.answers.map((x) => x.toLowerCase())).size !== r.answers.length) problems.push(`${where}: a duplicated answer`);
      r.answers.forEach((ans, i) => {
        const h = String(r.hints[i] || '');
        if (String(ans).length >= 3 && h.toLowerCase().startsWith(String(ans).toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${h}" is a prefix of "${ans}"`);
        if (/,/.test(String(ans))) problems.push(`${where}: answer "${ans}" carries a comma`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === String(ans).toLowerCase())) problems.push(`${where}: "${ans}" is both an answer and a distractor`);
        if (r.template.join(' ').toLowerCase().includes(String(ans).toLowerCase())) problems.push(`${where}: "${ans}" is printed in the template`);
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
      if (r.correctOrder.some((x) => /^(identify|explain|state|show|draw|evaluate|analyse|define|conclude)\b/i.test(x))) problems.push(`${where}: a reorder item is an exam-procedure step`);
      /* sourced from an extras chain, in the same order, and NOT printed on its own step */
      /* A/B round 1: this compared a normalised item with the RAW body, so a planted copy of an item
         went unseen (the validator's recall.recoverable caught it instead). Both sides are normalised now. */
      const norm = (s) => String(s).toLowerCase().replace(/['’]s\b/g, '').replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim();
      const chain = EXTRAS.chains.find((c) => c.steps.length === r.correctOrder.length && c.steps.every((st, i) => norm(st) === norm(r.correctOrder[i])));
      if (!chain) problems.push(`${where}: the reorder is not an extras chain in the same order`);
      const own = norm(sec.body.flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)]).join(' '));
      if (r.correctOrder.some((x) => own.includes(norm(x)))) problems.push(`${where}: a reorder item is printed on its own step`);
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
  /* topFix-04, named: a fill-in on the three approach names, and a glocalisation reorder */
  const fills = recalls.filter(([, r]) => r.type === 'fillin').map(([, r]) => r.answers.map((a) => a.toLowerCase()));
  if (!fills.some((a) => ['ethnocentric', 'polycentric', 'geocentric'].every((w) => a.includes(w)))) problems.push('topFix-04: no fill-in asks the three approach names');
  const reorders = recalls.filter(([, r]) => r.type === 'reorder').map(([, r]) => r);
  if (!reorders.some((r) => /glocalis/i.test(r.prompt) && /research/i.test(r.correctOrder[0]) && /launch/i.test(r.correctOrder.at(-1)))) problems.push('topFix-04: no reorder on the glocalisation decision process (research … launch)');
}

/* ══ 9 · TEACHING TEXT, NOTES, FLASHCARDS, EXTRAS AND LOCALE ════════════════ */
{
  for (const s of SUBSECTIONS) {
    const w = teachingWords(s);
    const where = s.id.split(':').pop();
    if (w > 350) problems.push(`${where}: ${w} words of teaching text against a budget of 350`);
    if (s.keyIdea.length > 180) problems.push(`${where}: keyIdea is ${s.keyIdea.length} chars (schema.lengths: 180)`);
    if (s.keyIdea.includes('**')) problems.push(`${where}: keyIdea carries bold`);
    if (!s.misconception || !s.examMatters || !s.realExample?.text) problems.push(`${where}: a field is missing`);
    if (!teachingVocabulary(s).length) problems.push(`${where}: none of the section's teaching terms appears in it`);
    for (const b of s.body) {
      if (b.type === 'flow' && (b.steps.length < 2 || b.steps.length > 4)) problems.push(`${where}: a flow of ${b.steps.length} steps`);
      if (b.type === 'flow' && b.steps.some((x) => typeof x !== 'object' || !x.title)) problems.push(`${where}: a flow step is not { title, subtitle }`);
      if (!['paragraph', 'flow', 'bullets'].includes(b.type)) problems.push(`${where}: body type "${b.type}"`);
    }
    /* structure-06: a misconception is a belief about the subject, not an exam-technique tip or filler */
    if (/\bexam|\bmarks?\b|\bexaminer/i.test(s.misconception)) problems.push(`${where}: the misconception is about exam technique, not the subject (structure-06)`);
    if (!/^Students /.test(s.misconception)) problems.push(`${where}: the misconception does not open on what students actually write or think (structure-06)`);
  }
  const mis = SUBSECTIONS.map((s) => s.misconception.slice(0, 60));
  if (new Set(mis).size !== mis.length) problems.push('two subsections open their misconception the same way');
  for (const b of content) { if (b.takeaway.length < 3) problems.push(`"${b.title}" has ${b.takeaway.length} takeaways`); b.takeaway.forEach((x) => { if (x.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${x.slice(0, 40)}"`); }); }
  /* structure-03: no takeaway summarises a section the chapter does not have */
  const titles = SUBSECTIONS.map((s) => s.title.toLowerCase()).join(' ');
  if (/^adaptation:/i.test(content[0].takeaway.join('|'))) problems.push('structure-03: an "Adaptation:" takeaway survives');
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (EXAMINER_CLAIM.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  if (NOTES.some((n) => 'misconception' in n)) problems.push('a notes topic carries a misconception');
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (!e.title || typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} lacks a title or content`);
  for (const m of MISTAKES) for (const k of ['title', 'mistake', 'correction', 'examTip']) if (!String(m[k] ?? '').trim()) problems.push(`mistake "${m.title}" has no \`${k}\` — MistakesTab.jsx renders that field`);
  {
    /* MistakesTab.jsx reads every card through lib/mistakes-shape.js (PR #40). Ask the SHARED reader
       whether each card renders whole, and check that origin/main's copy still reads the canonical
       fields this bundle writes (Rule 3: the fields, not the type names). */
    for (const m of MISTAKES) { const gaps = mistakeGaps(m); if (gaps.length) problems.push(`mistake "${m.title}" would render without ${gaps.join(', ')}`); }
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    if (!/readMistake/.test(tab)) problems.push('MistakesTab.jsx no longer reads cards through readMistake');
    let mainShape = '';
    try { mainShape = execFileSync('git', ['show', 'origin/main:lib/mistakes-shape.js'], { encoding: 'utf8' }); } catch { problems.push('origin/main has no lib/mistakes-shape.js — re-check what production reads before publishing'); }
    for (const f of ["'mistake'", "'correction'", 'examTip']) if (mainShape && !mainShape.includes(f)) problems.push(`origin/main's lib/mistakes-shape.js does not read ${f}`);
  }
  void titles;
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b|\bpound\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b/g, 'a UK-only institution (locale.institution)');
  /* Layer 4: the live section's named real firms and their unverifiable claims */
  ban(/McDonald|Unilever|KitKat|Nestl|Ryanair|Coca-Cola|Pepsi|\bIKEA\b|Honda|Mitsubishi|Walmart|Starbucks/g, 'a named real firm — Layer 4 needs a source for any real firm with a claim, and this section carries none');
}

/* ══ 10 · DIAGRAMS ══════════════════════════════════════════════════════════ */
{
  const processSvg = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const palette = new Set([...processSvg.matchAll(/'(#[0-9a-fA-F]{6})':/g)].map((m) => m[1].toLowerCase()));
  if (palette.size < 10) problems.push(`only ${palette.size} colours parsed out of processSvg.js`);
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
      const outlined = [...s.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)" height="([-\d.]+)"[^>]*fill="none"/g)].map((m) => m.slice(1, 5).map(Number));
      for (const m of s.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" font-size="(\d+)"[^>]*>([^<]*)<\/text>/g)) {
        const [x, y, size, str] = [Number(m[1]), Number(m[2]), Number(m[3]), m[4]];
        const host = outlined.find(([rx, ry, rw, rh]) => x > rx && x < rx + rw && y > ry && y < ry + rh);
        if (host && estWidth(str, size) > host[2] - 6) problems.push(`"${d.title}": "${str}" is wider than its ${host[2]}-unit box`);
      }
    }
    if (!d.title || !d.description) problems.push('a diagram is missing a title or description');
    if (!(d.checklist?.length >= 3)) problems.push(`"${d.title}": fewer than three checklist items`);
  }
  if (new Set(ALL_DIAGRAMS.map((d) => d.title)).size !== ALL_DIAGRAMS.length) problems.push('two diagrams share a title');

  /* glyph-box collisions and crossed labels, on the EMITTED SVG (packet 40, tolerance 1.2) */
  const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
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
        if (collides(a, b)) problems.push(`${where}: "${a.body.slice(0, 26)}" (y=${a.y}) and "${b.body.slice(0, 26)}" (y=${b.y}) overlap`);
      }
      for (const ln of linesOf(scenario.svg)) for (const bx of boxes) if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('Place', 300, 100, 12), mk('Price', 300, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Place', 300, 100, 12), mk('Price', 300, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALL)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Niche', 188, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    const probe = '<text x="380" y="10" font-size="15" fill="#e8ecf5" text-anchor="start" font-weight="400">a label far too long for the frame</text>';
    const m = probe.match(/<text x="([-\d.]+)" y="[-\d.]+" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/);
    if (Number(m[1]) + estWidth(m[4], Number(m[2])) <= FRAME.w + 2) problems.push('the text-extent check no longer catches a label that runs off the right edge');
  }
  /* the figures the teaching states are countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' ') + ALL_DIAGRAMS[i].checklist.join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, ['Ethnocentric', 'Geocentric', 'Polycentric', 'Glocalisation'], 'spectrum');
  want(2, ['Market development', 'Diversification', 'Cost leadership', 'Differentiation focus'], 'matrices');
  want(3, [...F.nicheCountries.map((n) => units(n)), units(F.nicheBuyers)], 'niche');
  want(4, ['Cultural differences', 'Tastes and preferences', 'Language', 'Branding and promotion'], 'considerations');
  {
    const bars = [...svgOf(ALL_DIAGRAMS[3])[0].matchAll(/<rect x="[-\d.]+" y="([-\d.]+)" width="44" height="([-\d.]+)"/g)].map((m) => Number(m[2]));
    const ratios = bars.map((h) => h / bars[2]);
    const want2 = F.nicheCountries.map((n) => n / F.nicheCountries[2]);
    if (bars.length !== 5 || ratios.some((r, i) => !near(r, want2[i], 0.01))) problems.push(`the niche bars are not drawn in proportion to the counts: ${bars.join(', ')}`);
  }
  /* THE CHECK-IN KEY: each block's LEADING pinned quiz key (the one a check-in serves) must not be
     printed on its own diagram, as text or as a figure; later pins are reported, not refused */
  const surfaces = (d) => [d.title, d.description, ...d.checklist, ...d.scenarios.map((s) => s.label), ...d.scenarios.flatMap((s) => textsOf(s.svg).map((x) => x.body))].join(' | ').toLowerCase();
  const figs = (s) => [...String(s).matchAll(/\$?\d[\d,]*(?:\.\d+)?%?m?/g)].map((m) => m[0]).filter((x) => /[$%]/.test(x) || Number(x.replace(/[,m]/g, '')) >= 13);
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    b.quizIndices.forEach((qi, k) => {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      const hit = surf.includes(key.toLowerCase()) || figs(key).some((f) => !q.question.includes(f) && surf.includes(f.toLowerCase()));
      if (hit && k === 0) problems.push(`"${b.title}": the check-in key "${key}" is printed on the chapter's diagram`);
      else if (hit) notes.push(`"${b.title}": a later pin's key "${key}" appears on the diagram (served only on a re-pin; DEBT under the question-first rule)`);
    });
  });
  if (!surfaces(DIAGRAMS[3]).includes(units(F.nicheBuyers))) problems.push('the check-in key check cannot see a figure printed on the niche diagram');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])].join(' ').toLowerCase(); };
  const need = (slug, words, idTag) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${idTag}: ${slug} never says "${w}"`); };
  need('global-strategy-and-glocalisation', ['global marketing strategy', 'glocalisation', 'global localisation'], 'topFix-01/structure-03');
  need('ethnocentric-and-polycentric', ['domestic', 'ethnocentric', 'international', 'polycentric'], 'specGap-01/topFix-01');
  need('geocentric-the-mixed-approach', ['mixed', 'geocentric'], 'specGap-01/topFix-01');
  need('product-in-global-markets', ['marketing mix (4ps)', 'adaptation'], 'structure-08');
  need('price-in-global-markets', ['**product** decision', '**price** decision'], 'quiz-01');
  need('ansoff-applied-to-global-marketing', ['ansoff', 'market development', 'product development', 'diversification', 'market penetration'], 'specGap-02');
  need('porter-applied-to-global-marketing', ['porter', 'cost leadership', 'differentiation', 'cost focus', 'differentiation focus'], 'specGap-03');
  need('cultural-diversity', ['cultural diversity', 'interests and values'], 'structure-05');
  need('features-of-global-niche-markets', ['global niche', 'niche market'], 'specGap-04');
  need('adapting-the-4ps-for-a-global-niche', ['**product.**', '**price.**', '**place.**', '**promotion.**'], 'specGap-05');
  need('cultural-differences-and-tastes', ['cultural differences', 'different tastes and preferences'], 'specGap-07');
  need('language-and-unintended-meanings', ['unintended meanings', 'brand name', 'slogan', 'instructions'], 'specGap-07/structure-07');
  need('inappropriate-branding-and-promotion', ['branding', 'promotion', 'inappropriate'], 'specGap-07');
  /* structure-04 / topFix-02: one subsection per 3a bullet cluster, none on Hofstede */
  if (content[4].sections.length < 3) problems.push('structure-04: chapter 5 compresses 3a into fewer than three steps');
  if (/Hofstede|Standardisation vs Adaptation|Cultural Influences on Global Marketing/.test(content.map((b) => b.title + b.sections.map((s) => s.title).join(' ')).join(' '))) problems.push('a live block or subsection title survived');
  /* structure-08: the ramp — definitions, then application, then frameworks, then niche and culture */
  const order = content.map((b) => b.title);
  if (order.indexOf('Global Marketing Strategy and Approaches') !== 0 || order.indexOf('Ansoff and Porter in Global Marketing') < order.indexOf('The Marketing Mix in Global Markets')) problems.push('structure-08: the chapters do not ramp from definitions to application to frameworks');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '4.3.3' || ctx.unitCode !== 'WBS14') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 4.3.3 / WBS14 — structure-05's renumbering would be the regression`);
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
if (uncovered.length) problems.push(`spec.uncovered: ${uncovered.map((f) => f.detail).join(' | ').slice(0, 600)}`);

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
const hist = [0, 0, 0, 0]; for (const q of QUIZ) hist[q.correctIndex] += 1;
const coverage = after.findings.find((f) => f.rule === 'spec.coverage');

console.log(`\n${SECTION} — packet 55`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} (${carried.map((f) => f.rule).join(', ')}) · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned, keys ${hist.join('/')}) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  coverage: ${coverage?.detail ?? 'not reported'}`);
console.log(`  words:  ${SUBSECTIONS.map((s) => teachingWords(s)).join(' ')}`);
console.log(`  pins:   quiz ${JSON.stringify(Object.values(quizIndices))} · practice ${JSON.stringify(Object.values(practiceIndices))}`);
for (const n of notes) console.log(`  note: ${n}`);
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
  SCOPE      4.3.3 only. Hofstede, Hall's high/low context, "stuck in the middle" and the live
             anecdotes (Nova, KFC) are banned, each A/B'd both ways and each ban re-measured against
             bus_spec.txt; Ansoff and Porter taught as 4.3.3 · 1d, with :1435 and :1098-1099 re-read
  NUMBERING  the oracle re-read (15 rows / 13 leaves), every leaf mapped and its own words found in
             its subsections, the lettered lines inside 4.3.3 read as a-d / a-c / a, no social media
             inside the span, five headings asserted by line, and the database's 4.3.3 / WBS14 asserted
  ARITHMETIC every figure re-derived: campaign saving, price per ml and its fraction words, niche
             total and revenue, premium, and every quiz key recomputed independently
  PINS       derived from each item's block tag; five blocks of three subsections, each with its own
             diagram, quiz and practice; no diagramRef; 8 free quiz items against 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that no subsection teaches, the sachet asked as two Ps
  PRACTICE   Appendix 6 parsed including Assess 10/12; the set is ial-paper-structure.json's Units
             3-4 Section A (4/4/8/12/12) plus two Evaluate essays, all on one source that carries
             every figure; stems name the firm; openings clean; levels naming K/App/An/Ev above 6
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, the three-approach fill-in and the glocalisation reorder
             (sourced from an extras chain, not printed on its own step), recall.recoverable at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit and collisions checked
             on the emitted SVG with the guard A/B'd, figures counted back out of the SVG, bars in
             proportion, and no chapter's check-in key printed on its own diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-55-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-55-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
