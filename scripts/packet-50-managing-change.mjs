#!/usr/bin/env node
/**
 * PACKET 50 — managing-change, Business Unit 3 (WBS13), IAL topic 3.3.6 "Manging change".
 * `audit/raw/bus_spec.txt:1255-1271`. FIVE blocks, fifteen subsections, 10 leaves.
 *
 *   node scripts/packet-50-managing-change.mjs            # dry run, every check
 *   node scripts/packet-50-managing-change.mjs --dump     # + write the bundle
 *   node scripts/packet-50-managing-change.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 47's runner, adapted. What this packet adds, with the reason:
 *
 *   - **THE LEDGER'S NUMBERS ARE REFUSED ON THE DOCUMENT.** Every specGap id cites "3.6.x". The runner
 *     asserts the 3.3.x headings by line, asserts no "3.6.1"-"3.6.3" exists in bus_spec.txt, and
 *     asserts `contextFor` says 3.3.6 / WBS13 (which is what refuses `structure-11`).
 *   - **THE NAMED MODELS ARE BANNED, AND THE BAN RESTS ON A MEASUREMENT.** Kotter, Schlesinger, Lewin,
 *     "force field", "scenario", "transformational" are asserted ABSENT from bus_spec.txt, so a ban
 *     cannot outlive the fact it rests on; the unit description's "causes and effects of change" is
 *     asserted PRESENT at :1055, because chapter one rests on it.
 *   - **THE CHECK-IN KEY IS NOT PRINTED ON THE CHECK-IN'S DIAGRAM** (packet 44's shipped defect):
 *     every quiz key pinned to a block is looked for on every surface of that block's diagram.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { mistakeGaps } from '../lib/mistakes-shape.js';
import {
  SECTION, FIRM, usd, usdm, pct, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
  KEY_FACTORS, KEY_RISKS, MITIGATION,
} from './_packet50-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet50-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet50-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, LAYER_NAMES, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD } from './_packet50-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const F = FIRM;

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
const spec = readFileSync('audit/raw/bus_spec.txt', 'utf8').split('\n');
const specBody = spec.join('\n');

/* ══ 1 · A FAILED SUBSTITUTION, ON EVERY SURFACE ════════════════════════════ */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  for (const bad of ['retires in undefined months', 'a rise of NaN%', 'the firm [object Object] plans', 'costs ' + '${usd(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['the object of the change is speed', 'a cost of $250,000']) {
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
  const fires = (i, str) => { const [re] = BANNED_ELSEWHERE[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'Kotter\'s eight steps begin with urgency', 'the firm keeps a second supplier'],
    [0, 'Kotter and Schlesinger list six approaches', 'six approaches are used'],
    [1, 'Lewin\'s force field shows driving forces', 'forces for and against the change'],
    [1, 'first unfreeze the current behaviour', 'staff are frozen out of decisions'],
    [2, 'disruptive change comes from outside', 'a disruptive technology is an external trigger'],
    [2, 'transformational leadership inspires', 'transformative leadership inspires'],
    [4, 'crisis management after a disaster', 'a disruption to critical activities'],
    [4, 'Shell imagined best-case and worst-case futures', 'the scores leave things out'],
    [3, 'Outline two reasons why employees resist change.', 'A strong answer, in outline:'],
    [3, 'Analyse the impact of the change on staff. (6 marks)', 'analysis of both sides'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bF0\d\d\b|\bC-managing-change-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  const [cult] = POINTER_ONLY;
  if (!cult.mustCite.test('The four company cultures are taught in 3.3.4.')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (cult.mustCite.test('A task culture embraces change.')) problems.push('the pointer-cite check accepts an uncited mention');
}
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['Kotter', 'Schlesinger', 'Lewin', 'force field', 'scenario', 'disrupt', 'transformational', 'transactional', 'crisis management']) if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban rests on it being absent`);
if (!/causes and effects of change/.test(spec.slice(1052, 1057).join(' '))) problems.push('the unit description at bus_spec.txt:1055 no longer says "causes and effects of change" — chapter one rests on it');
if (!spec[1188]?.includes('Classification of company cultures') || !spec[1194]?.includes('Difficulties in changing an established culture')) problems.push('bus_spec.txt:1189/1195 do not carry 3.3.4\'s culture classification and "difficulties in changing" — the culture pointer rests on it');
if (!spec[747]?.includes('Types of leadership style')) problems.push('bus_spec.txt:748 does not carry 1.3.4\'s leadership styles — the leadership pointer rests on it');
if (!spec[1000]?.includes('Continuous improvement')) problems.push('bus_spec.txt:1001 does not carry 2.3.4\'s continuous improvement — the pointer in time-and-speed rests on it');

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(F.perHandlerBefore === 150 && F.perHandlerAfter === 200, `claims per handler ${F.perHandlerBefore} → ${F.perHandlerAfter}, not 150 → 200`);
  a(near(F.productivityRise, 100 / 3), 'productivity does not rise by a third');
  a(F.closingPct === 40 && F.closing / F.branches === 0.4, 'closing is not 40% of branches');
  a(F.postsLost === 120 && F.retrained + F.leaving === F.postsLost && F.retiring + F.voluntary === F.leaving, 'the posts do not add up (120 = 70 + 50; 50 = 30 + 20)');
  a(F.risks.map((r) => r.score).join(',') === '8,15,12', `risk scores ${F.risks.map((r) => r.score).join(',')}, not 8,15,12`);
  a(F.risks.every((r) => r.score === r.likelihood * r.impact), 'a risk score is not likelihood × impact');
  a(F.outageNoPlan === 2e6 && F.outageWithPlan === 250_000 && F.outageSaving === 1.75e6 && F.netFirstYear === 1.15e6, 'the outage figures are not $2m / $250,000 / $1.75m / $1.15m');
  a(F.outageSaving > F.standbyCost, '"in any year with one such outage, the system saves more than it costs" is false');
  a(F.actuaryRetiresMonths < F.slowMonths, 'the actuary retires after the slow timetable ends');
  /* recall, quiz and notes arithmetic the content prints, recomputed here and not read from a module */
  a(8000 / 40 === 200 && 8000 / 32 === 250 && (250 - 200) / 200 === 0.25, 'quiz: 200 → 250 is 25%');
  a(1 * 5 === 5 && 3 * 2 === 6, 'quiz: scores 5 and 6');
  a(900_000 - 150_000 - 100_000 === 650_000, 'quiz: net saving $650,000');
  a(F.outageWithPlan + F.standbyCost === 850_000, 'diagram: $850,000 with the standby system');
  a(LAYER_NAMES.length === F.layers, `the layers diagram draws ${LAYER_NAMES.length} layers and the firm has ${F.layers}`);
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 15) problems.push(`${SUBSECTIONS.length} subsections, not 15`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (b.sections.length < 3) problems.push(`block "${b.title}" has ${b.sections.length} subsections (structure-04)`);
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
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '3.3.6');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 12 || leaves.length !== 10) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 3.3.6, not 12 / 10`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 3.3.6 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[.:]/g, '');
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/]+/).filter((w) => w.length > 4);
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    for (const s of subs) {
      const hay = clean([s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' '));
      const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
      if (missing.length && subs.length === 1) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its subsection never says ${missing.map((w) => `"${w}"`).join(', ')}`);
    }
    const all = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ')).join(' '));
    const missingAll = words.filter((w) => !all.includes(w.replace(/s$/, '')));
    if (missingAll.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missingAll.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the util's lists match the document's own words at :1255-1271 */
  const span = spec.slice(1254, 1272).join(' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...KEY_FACTORS, ...KEY_RISKS, ...MITIGATION]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and bus_spec.txt:1255-1271 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1184, '3.3.4 Influences on business decisions');
  at(1218, '3.3.5 Assessing competitiveness');
  at(1255, '3.3.6 Manging change');
  at(1265, '2 Contingency');
  /* the numbers the ledger's items cite must exist nowhere in the document */
  for (const n of ['3.6.1', '3.6.2', '3.6.3']) if (specBody.includes(n)) problems.push(`"${n}" occurs in bus_spec.txt after all — ledger items cite it and this packet refuses it on the ground that it does not`);
  /* "costs and benefits of contingency planning" (specGap-06) is not a lettered point */
  if (/cost/i.test(spec.slice(1254, 1272).join(' '))) problems.push('bus_spec.txt:1255-1271 mentions cost after all — specGap-06 is built as evaluation on the ground that it does not');
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
    if (/\b(always|never|only|every|all)\b/i.test(q.options.filter((_, i) => i !== q.correctIndex).join(' | '))) problems.push(`a distractor carries an absolute a student can eliminate unread: "${q.question.slice(0, 44)}"`);
  }
  const share = hist.map((n) => (n / QUIZ.length) * 100);
  if (share.some((p) => p > 40 || p < 10)) problems.push(`quiz.histogram would fire: ${share.map((p) => `${Math.round(p)}%`).join('/')}`);
  const ORDINAL = /\b(first|second|third|fourth|last|final|former|latter|top|bottom)\b/i;
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|months?)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' ').replace(/\blast resort\b/gi, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'The former is a risk and the latter a response.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['After the first year the saving compounds.', 'Coercion is a last resort.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* structure-01 / quiz-01 / quiz-02: nothing quizzed that no subsection teaches */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['internal trigger', 'external trigger', 'step change', 'incremental', 'productivity', 'culture', 'layers', 'vision', 'empower', 'coercion', 'co-option', 'communication and education', 'negotiation', 'support and training', 'genuine disagreement', 'likelihood', 'impact', 'contingency', 'cyber attack', 'it systems failure', 'key staff', 'succession', 'continuity', 'backup', 'standby', 'untried', 'rehears', 'kotter', 'schlesinger', 'handy', 'crisis'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    const taught = teaching.includes(term) || (term === 'untried' && teaching.includes('nobody has tried')) || (term === 'rehears' && teaching.includes('rehearsing'));
    if (quizzed && !taught) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...s.body.map((x) => [x.text || '', ...(x.items || [])].join(' '))]).join(' ').toLowerCase();
    const off = items.filter((q) => !q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (off.length) problems.push(`quiz item(s) pinned to "${b.title}" share no substantive word with the chapter: ${off.map((q) => q.question.slice(0, 40)).join(' | ')}`);
  }
  /* quiz-01 / quiz-02, named: no item tests Kotter & Schlesinger, and no item calls a mitigation plan a "risk" */
  if (QUIZ.some((q) => /Kotter|Schlesinger|last resort\?$/i.test(`${q.question} ${q.options.join(' ')}`))) problems.push('quiz-01: an item still tests Kotter & Schlesinger');
  if (QUIZ.some((q) => /inadequate business continuity|poor business continuity/i.test(`${q.question} ${q.options.join(' ')}`))) problems.push('quiz-02: an item still treats a mitigation plan as a risk');
}

/* ══ 7 · PRACTICE ═══════════════════════════════════════════════════════════ */
{
  /* Appendix 6, PARSED out of bus_spec.txt:2218-2250 rather than imported from lib/ial-marking.js */
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
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).business.units_3_4;
  if (!paper.papers.includes('WBS13')) problems.push('ial-paper-structure.json business.units_3_4 does not cover WBS13');
  const secA = paper.sections.find((s) => s.id === 'A');
  const essays = paper.sections.filter((s) => s.kind === 'essay');
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
    if (!p.question.slice(EXTRACT.length).includes(F.name) && p.command !== 'Calculate') problems.push(`practice "${p.command} ${p.marks}": the task does not name the firm (topFix-05 — a generic stem)`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\d{3,}/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries the level descriptors`);
    if (p.marks > 6) {
      if (/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
      for (const L of ['Level 1', 'Level 2', 'Level 3', 'Level 4']) if (!p.guidance.includes(L)) problems.push(`${p.marks}-mark ${p.command} guidance has no ${L}`);
      for (const w of ['knowledge', 'application', 'analysis', 'evaluation']) if (p.command !== 'Discuss' && !p.guidance.toLowerCase().includes(w)) problems.push(`${p.marks}-mark ${p.command} guidance never names ${w}`);
      if (p.marks >= 12 && !/A strong answer, in outline:/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} has no short model answer`);
    } else if (!/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (p.command === 'Discuss' && /\bconclu/i.test(p.guidance.replace(/does not need a final recommendation/, ''))) problems.push('Discuss guidance asks for a conclusion (V036)');
  }
  /* the source carries every figure the tasks and schemes lean on */
  for (const f of ['2,400', '60 branches', '7 layers', '24 of the 60', '600 handlers', '90,000', '480 handlers', '96,000', '120 handler posts', '70 people', '50 will leave', `${F.fastMonths} months`, `${F.slowMonths}.`, `${F.actuaryRetiresMonths} months`, `${F.daysNoPlan} days`, usd(F.costPerDay), `${F.daysWithPlan} day`, usd(F.standbyCost), 'likelihood 3, impact 5', 'likelihood 4, impact 2', 'likelihood 3, impact 4']) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  if (!/Explain one\b/.test(PRACTICE.find((p) => p.command === 'Explain').question)) problems.push('topFix-05: the 4-mark Explain is not "Explain one..."');
  if (PRACTICE.some((p) => /crisis/i.test(p.question.slice(EXTRACT.length)))) problems.push('topFix-05: a crisis-management question survives');
  if (!PRACTICE.some((p) => /standby|succession|continuity/i.test(p.question.slice(EXTRACT.length)))) problems.push('topFix-05: no practice task on business continuity or succession planning');
}

/* ══ 8 · RECALLS ════════════════════════════════════════════════════════════ */
{
  const recalls = SUBSECTIONS.map((s) => [s, s.recall]).filter(([, r]) => r);
  if (recalls.length !== SUBSECTIONS.length) problems.push(`${recalls.length} recalls over ${SUBSECTIONS.length} subsections`);
  const types = new Set(recalls.map(([, r]) => r.type));
  for (const want of ['fillin', 'classify', 'match', 'reorder']) if (!types.has(want)) problems.push(`no ${want} recall in the section (structure-02, topFix-04)`);
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
  /* topFix-03, named: a fill-in asks incremental against step */
  const fills = recalls.filter(([, r]) => r.type === 'fillin').map(([, r]) => r.answers.map((a) => a.toLowerCase()));
  if (!fills.some((a) => a.includes('incremental') && a.includes('step'))) problems.push('topFix-03: no fill-in asks incremental against step');
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
      if (b.type === 'flow' && b.steps.some((x) => typeof x !== 'object' || !x.title)) problems.push(`${where}: a flow step is not { title, subtitle } (CONTENT-GATE step 4)`);
    }
    /* a misconception is a belief about the subject, not an exam-technique tip */
    if (/\bexam|\bmarks?\b|\bexaminer/i.test(s.misconception)) problems.push(`${where}: the misconception is about exam technique, not the subject`);
    /* structure-03: no field tells a student to draw a diagram the section does not show */
    if (/\bdraw\b/i.test(JSON.stringify(s))) problems.push(`${where}: tells the student to draw something (structure-03)`);
  }
  /* structure-10: the three filler misconceptions do not return */
  const mis = SUBSECTIONS.map((s) => s.misconception);
  if (new Set(mis.map((m) => m.slice(0, 60))).size !== mis.length) problems.push('two subsections open their misconception the same way');
  if (mis.some((m) => /disruptive change is always better|rigid and linear|equally difficult|(step|disruptive) change is always better|because it is bolder/i.test(m))) problems.push('structure-10: a filler misconception survives (fix round 1: the relabelled step-change one counts)');
  /* structure-05 / structure-06: no real example repeats another's subject */
  const ex = SUBSECTIONS.map((s) => s.realExample.text.slice(0, 40));
  if (new Set(ex).size !== ex.length) problems.push('two real examples open the same way (structure-06)');
  const emo = SUBSECTIONS.map((s) => s.realExample.emoji);
  if (new Set(emo).size !== emo.length) problems.push('two real examples share an emoji (structure-06)');
  for (const b of content) b.takeaway.forEach((x) => { if (x.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${x.slice(0, 40)}"`); });
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (EXAMINER_CLAIM.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  if (NOTES.some((n) => 'misconception' in n)) problems.push('a notes topic carries a misconception (structure-10: the live notes carried a filler one)');
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (!e.title || typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} lacks a title or content`);
  /* MistakesTab.jsx reads title / mistake / correction / examTip, on this branch and on origin/main */
  for (const m of MISTAKES) for (const k of ['title', 'mistake', 'correction', 'examTip']) if (!String(m[k] ?? '').trim()) problems.push(`mistake "${m.title}" has no \`${k}\` — MistakesTab.jsx renders that field`);
  /* Since PR #40 the tab reads every card through lib/mistakes-shape.js, so ask that reader what each card
     would show rather than grepping the component for field names (the grep went stale the day #40 landed). */
  for (const m of MISTAKES) { const gaps = mistakeGaps(m); if (gaps.length) problems.push(`mistake "${m.title}" would render without ${gaps.join(', ')}`); }
  {
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    if (!tab.includes("from '@/lib/mistakes-shape'") || !tab.includes('readMistake(')) problems.push('MistakesTab.jsx no longer reads cards through lib/mistakes-shape.js; re-check the mistake fields against the component');
  }
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b|\bpound\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b/g, 'a UK-only institution (locale.institution)');
  /* the live section's named real firms and dated events (structure-05, structure-06) */
  ban(/\bKodak\b|\bToyota\b|\bMicrosoft\b|\bNadella\b|\bShell\b|\bCOVID\b|\bpandemic\b|\bChristensen\b/g, 'a named real firm, person or dated event from the live section\'s examples');
}

/* ══ 10 · DIAGRAMS ══════════════════════════════════════════════════════════ */
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
  const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
});
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
      /* a label whose anchor point sits inside an outlined box must fit that box */
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
  {
    const probe = '<text x="380" y="10" font-size="15" fill="#e8ecf5" text-anchor="start" font-weight="400">a label far too long for the frame</text>';
    const m = probe.match(/<text x="([-\d.]+)" y="[-\d.]+" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/);
    if (Number(m[1]) + estWidth(m[4], Number(m[2])) <= FRAME.w + 2) problems.push('the text-extent check no longer catches a label that runs off the right edge');
  }

  /* ── glyph-box collisions and crossed labels, on the EMITTED SVG (packet 40, tolerance 1.2) ── */
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
    return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
  });
  const pathsOf = (svg) => [...svg.matchAll(/<path d="M ([-\d.]+) ([-\d.]+)((?: L [-\d. ]+)+)"[^>]*stroke="#/g)].flatMap((m) => {
    const pts = [[parseFloat(m[1]), parseFloat(m[2])]];
    const nums = m[3].replace(/L/g, ' ').trim().split(/\s+/).map(Number);
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
        if (collides(a, b)) problems.push(`${where}: "${a.body.slice(0, 26)}" (y=${a.y}) and "${b.body.slice(0, 26)}" (y=${b.y}) overlap`);
      }
      for (const ln of [...linesOf(scenario.svg), ...pathsOf(scenario.svg)]) for (const bx of boxes) {
        if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
      }
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('Board', 300, 100, 12), mk('Directors', 300, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Board', 300, 100, 12), mk('Directors', 300, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALL)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('The change', 170, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mk('Gains', 170, 140, 12))) problems.push('the path reader does not turn a curve into segments the line check can see');
  }
  /* the figures the teaching states are countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' ') + ALL_DIAGRAMS[i].checklist.join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(1, [...LAYER_NAMES, F.name], 'layers');
  want(2, [`${F.postsLost} posts`, 'face-to-face checks'], 'forces');
  want(3, F.risks.flatMap((r) => [`${r.score} = ${r.likelihood} × ${r.impact}`, r.name]), 'risk');
  want(4, [usdm(F.outageNoPlan), usd(F.outageWithPlan + F.standbyCost), usd(F.costPerDay), usd(F.standbyCost)], 'continuity');
}
{
  /* THE CHECK-IN KEY: each block's pinned quiz keys must not be printed on its own diagram */
  const surfaces = (d) => [d.title, d.description, ...d.checklist, ...d.scenarios.map((s) => s.label), ...d.scenarios.flatMap((s) => textsOf(s.svg).map((x) => x.body))].join(' | ').toLowerCase();
  const figs = (s) => [...String(s).matchAll(/\$?\d[\d,]*(?:\.\d+)?%?/g)].map((m) => m[0]).filter((x) => /[$%]/.test(x) || Number(x.replace(/,/g, '')) >= 13);
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const qi of b.quizIndices) {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      if (surf.includes(key.toLowerCase())) problems.push(`"${b.title}": the key "${key}" of a pinned item is printed on the chapter's diagram`);
      for (const f of figs(key)) if (!q.question.includes(f) && surf.includes(f.toLowerCase())) problems.push(`"${b.title}": the key figure ${f} of a pinned item is printed on the chapter's diagram`);
    }
  });
  /* A/B the key check: a key that IS on the diagram must be caught */
  if (!surfaces(DIAGRAMS[3]).includes('15 = 3 × 5')) problems.push('the check-in key check cannot see a figure printed on the risk diagram');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const all = readable.join(' \n ');
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])].join(' ').toLowerCase(); };
  const need = (slug, words, idTag) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${idTag}: ${slug} never says "${w}"`); };
  need('what-triggers-change', ['new ownership', 'poor business performance', 'organisational size', 'new leader', 'external triggers', 'internal triggers'], 'specGap-01');
  need('effects-of-change', ['productivity', 'competitiveness', 'financial performance', 'stakeholders'], 'specGap-02/topFix-02');
  need('organisational-culture', ['organisational culture'], 'specGap-03');
  need('size-of-organisation', ['size of organisation'], 'specGap-03');
  need('time-and-speed-of-change', ['time and speed', 'incremental change', 'step change'], 'specGap-03/topFix-03');
  need('transformative-leadership', ['transformative leadership', 'vision'], 'topFix-02/specGap-01');
  need('ways-to-reduce-resistance', ['communication and education', 'involvement', 'support and training', 'negotiation', 'co-option', 'coercion'], 'topFix-02/specGap-03');
  need('risk-assessment', ['identifying key risks through risk assessment', 'likelihood', 'impact'], 'specGap-04/topFix-01');
  need('natural-disasters-and-it-systems-failure', ['natural disasters', 'it systems failure'], 'specGap-04');
  need('loss-of-key-staff', ['loss of key staff'], 'specGap-04');
  need('business-continuity', ['business continuity', 'risk mitigation'], 'specGap-05');
  need('succession-planning', ['succession planning'], 'specGap-05');
  need('judging-a-contingency-plan', ['costs money', 'worth it'], 'specGap-06/topFix-01');
  /* accuracy-01: no surface tells a firm to "use" disruption */
  if (/use disruptive|disruptive change/i.test(all)) problems.push('accuracy-01: a surface still offers disruptive change as a type a firm uses');
  /* accuracy-02 / topFix-01: scenario planning survives only as the one contrasting sentence */
  if (!/Contingency planning is narrower than scenario planning/.test(all)) problems.push('topFix-01: the one sentence demoting scenario planning is gone');
  /* structure-07: every block title is a chapter a student can recognise; the live titles are gone */
  if (content.some((b) => /^Types of Change$|^Managing Resistance$/.test(b.title))) problems.push('structure-07: a live block title survived');
  /* structure-07, fix round 1: block 1's title must signal all three of its subsections (triggers,
     effects, speed), and the round-0 title that hid "The Effects of Change" must not return */
  if (content.some((b) => /^Why Change Happens and How Fast$/.test(b.title))) problems.push('structure-07: the round-0 block 1 title survived');
  { const b1 = content[0]; const t = b1.title.toLowerCase();
    for (const [stem, sub] of [['trigger', 'what-triggers-change'], ['effect', 'effects-of-change'], ['speed', 'time-and-speed-of-change']]) {
      if (!b1.sections.some((s) => s.id.endsWith(`:${sub}`))) problems.push(`structure-07: block 1 no longer holds ${sub}`);
      if (!t.includes(stem)) problems.push(`structure-07: block 1 title "${b1.title}" does not signal its ${sub} subsection`);
    } }
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => x.title).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '3.3.6' || ctx.unitCode !== 'WBS13') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 3.3.6 / WBS13 — structure-11's renumbering would be the regression`);
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

console.log(`\n${SECTION} — packet 50`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO (${recoverableBefore.length} recoverable)`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO (${recoverableAfter.length} recoverable)`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} (${carried.map((f) => f.rule).join(', ')}) · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned, keys ${hist.join('/')}) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  coverage: ${coverage?.detail ?? 'not reported'}`);
console.log(`  words:  ${SUBSECTIONS.map((s) => teachingWords(s)).join(' ')}`);
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
  SCOPE      3.3.6 only. Kotter, Kotter & Schlesinger, Lewin, the four live labels for the two types
             of change, Shell-style scenarios and crisis management are banned, each A/B'd both ways
             and each ban re-measured against bus_spec.txt; the culture types (3.3.4), leadership
             styles (1.3.4) and scenario planning are pointer-only, one mention each, cited; the
             unit description's "causes and effects of change" asserted present at :1055
  NUMBERING  the oracle re-read (12 rows / 10 leaves), every leaf mapped and its own words found in
             its subsections, four headings asserted by line, "3.6.1"-"3.6.3" asserted ABSENT, and
             the database's own 3.3.6 / WBS13 asserted
  ARITHMETIC productivity, posts, risk scores, the outage with and without the standby system, and
             every quiz and diagram figure recomputed independently
  PINS       derived from each item's block tag; five blocks of three subsections, each with its own
             diagram, quiz and practice; no diagramRef; 8 free quiz items against 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no absolute distractor, no
             letter, no ordinal, no near-duplicate stems, nothing tested that no subsection teaches
  PRACTICE   Appendix 6 parsed including Assess 10/12; the set is ial-paper-structure.json's Units
             3-4 Section A (4/4/8/12/12) plus two Evaluate essays, all on one source that carries
             every figure; stems name the firm; openings clean; levels naming K/App/An/Ev above 6
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, the incremental/step fill-in, reorders sourced
             from extras chains, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit and collisions checked
             on the emitted SVG with the guard A/B'd, figures counted back out of the SVG, and no
             chapter's pinned quiz key printed on its own diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-50-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-50-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
