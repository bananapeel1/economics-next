#!/usr/bin/env node
/**
 * PACKET 53 — influences-business-decisions, Business Unit 3 (WBS13), IAL topic 3.3.4.
 * `audit/raw/bus_spec.txt:1184-1211`. FOUR blocks, thirteen subsections, 15 leaves.
 *
 *   node scripts/packet-53-influences-business-decisions.mjs            # dry run, every check
 *   node scripts/packet-53-influences-business-decisions.mjs --dump     # + write the bundle
 *   node scripts/packet-53-influences-business-decisions.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 47's runner, adapted. What this packet adds, with the reason:
 *
 *   - **THE LEDGER'S NUMBERS ARE REFUSED ON THE DOCUMENT.** 15 of 26 ids cite "3.4.1"-"3.4.4". The
 *     runner asserts the 3.3.x headings by line and that no "3.4.<n>" exists in bus_spec.txt, and
 *     asserts `contextFor` says 3.3.4 / WBS13.
 *   - **THE UK GCE TOPICS ARE BANNED, AND THE BAN RESTS ON A MEASUREMENT.** Short-termism, evidence-
 *     based vs subjective decisions, animal welfare and Carroll's pyramid are asserted ABSENT from
 *     bus_spec.txt, so a ban cannot outlive the fact it rests on.
 *   - **THE ASIDES ARE COUNTED, AND NEVER ASSESSED.** Handy, Mendelow, Friedman, Freeman,
 *     greenwashing and groupthink: at most one mention each, in teaching text only.
 *   - **THE CHECK-IN KEY IS NOT PRINTED ON THE CHECK-IN'S DIAGRAM** (packet 44's shipped defect):
 *     every item pinned to a block is looked for on every surface of that block's diagram.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { mistakeGaps } from '../lib/mistakes-shape.js';
import {
  SECTION, FIRM, rm, rmm, pct, ratio, round2,
  BANNED, ASIDES, CULTURE_TYPES, teachingWords, teachingVocabulary,
} from './_packet53-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet53-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet53-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD } from './_packet53-diagrams.mjs';

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

/* The ASSESSED surfaces: where an aside may never appear. Recalls are inside content, so read apart. */
const assessed = allStrings([
  bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, SUBSECTIONS.map((s) => s.recall),
]).filter((s) => !IDLIKE.test(s));
/* The teaching text: content sections minus their recalls, plus notes and extras. */
const teaching = allStrings([
  SUBSECTIONS.map(({ recall, ...rest }) => rest), NOTES, EXTRAS, content.map((b) => b.takeaway),
]).filter((s) => !IDLIKE.test(s));

/* ══ 1 · A FAILED SUBSTITUTION, ON EVERY SURFACE ════════════════════════════ */
const FAILED_SUBSTITUTION = /undefined|NaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  for (const bad of ['a cost of RMundefinedm', 'the ratio is NaN to 1', 'the firm [object Object] pays', 'a price of ' + '${rm(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['the object of the exercise is trust', 'a cost of RM6m']) {
    if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);
  }
}

/* ══ 2 · THE BANNED TOPICS, THE ASIDES, AND WHAT THEY REST ON ══════════════ */
for (const [re, why] of BANNED) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  const fires = (i, str) => { const [re] = BANNED[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'Short-termism damages long-term performance', 'profit rises this year'],
    [0, 'a long-termist board', 'over the long term the saving holds'],
    [1, 'evidence-based decision making uses data', 'evidence such as audited results'],
    [2, 'animal welfare in the supply chain', 'a dairy firm pays for vets'],
    [3, 'Carroll\'s CSR pyramid has four layers', 'corporate social responsibility (CSR)'],
    [4, 'Outline two reasons why culture matters.', 'A strong answer, in outline:'],
    [4, 'Analyse the conflict for PharmaLife. (6 marks)', 'analysis of both sides'],
    [5, 'key players must be managed closely', 'the players in the market'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['short-termis', 'long-termis', 'short termis', 'animal', 'Carroll', 'Handy', 'Mendelow', 'Friedman', 'Freeman', 'greenwash', 'groupthink', 'subjective', 'intuiti', 'key player']) {
  if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban or aside rule rests on it being absent`);
}
{
  /* "evidence-based" occurs, but only in assessment-objective prose, never as a 3.3.4 leaf */
  const eb = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /evidence-based/i.test(l)).map(([n]) => n);
  if (eb.some((n) => n >= 1184 && n <= 1217)) problems.push(`"evidence-based" occurs inside 3.3.4 (${eb.join(', ')}) — specGap-02's wont-fix rests on it not`);
}
for (const { re, why, max } of ASIDES) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const inTeaching = teaching.filter((s) => one.test(s));
  const inAssessed = assessed.filter((s) => one.test(s));
  if (inTeaching.length > max) problems.push(`${why} — ×${inTeaching.length} in teaching text against a budget of ${max}`);
  if (inAssessed.length) problems.push(`${why} — on an ASSESSED surface (an aside is never assessed): "${inAssessed[0].slice(0, 90)}"`);
  /* svg text too */
  if (svgText.some((s) => one.test(s))) problems.push(`${why} — printed on a diagram`);
}
{
  /* A/B: the assessed-surface split must see a quiz item and must not see a body paragraph */
  const one = /\bHandy\b/;
  if (!assessed.some((s) => /deciding what is morally right/.test(s))) problems.push('the assessed-surface reader cannot see the quiz');
  if (assessed.some((s) => one.test(s))) problems.push('Handy on an assessed surface');
  if (!teaching.some((s) => one.test(s))) problems.push('the teaching reader cannot see the one Handy aside (or it was removed)');
}
ban(/\bF0\d\d\b|\bC-influences-business-decisions-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
ban(/\b3\.4\.[1-4]\b/g, 'a UK GCE topic number in student-facing text');

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(F.profitAfterClosure === 69e6, `profit after closure ${F.profitAfterClosure}, not RM69m`);
  a(Math.round((F.closureCost / F.closureSaving) * 12) === 16, '"recovered in about sixteen months" is not 12/9 years');
  a(F.oilCost === 6e6 && F.profitWithOil === 54e6, 'the palm oil cost is not RM6m / profit RM54m');
  a(near(F.oilProfitFallPct, 10) && near(F.oilPriceRisePct, 1.2), 'the oil trade-off is not 10% of profit / a 1.2% price rise');
  a(F.payRatio === 100 && F.payRatioAfter === 125 && F.ceoPayAfter === 6e6, 'the pay ratios are not 100 and 125 to 1');
  a(F.staff - F.jobs === 2100, 'remaining staff are not 2,100');
  /* recall and quiz arithmetic the content prints, recomputed here and not read from the module */
  a(2.4e6 / 40_000 === 60, 'pay-and-rewards recall: 60 to 1');
  a(near((3 / 12) * 100, 25) && Math.round((3 / 9) * 100) === 33 && 12 / 3 === 4, 'quiz: RM3m on RM12m = 25% (distractors 33% = 3/9, 4 = 12/3)');
  a(1.5e6 / 50_000 === 30, 'quiz: RM1.5m ÷ RM50,000 = 30 to 1');
  /* the Calculate item's own figures (fix round 1), recomputed from typed literals, not read from FIRM */
  a(F.ceoPay === 4.8e6 && F.lowPay === 30_000 && F.bonus === 1.2e6, 'the Calculate inputs are not RM4.8m / RM30,000 / RM1.2m');
  a(4.8e6 / 30_000 === 160 && 6e6 / 30_000 === 200 && 1.2e6 / 30_000 === 40 && 160 + 40 === 200, 'the Calculate scheme is not 160 → 200 to 1 (+40)');
  a(F.lowRatio === 160 && F.lowRatioAfter === 200 && F.lowRatioRise === 40, 'FIRM\'s low-pay ratios disagree with the literals');
  /* the one "a tenth" in the Assess 12 outline is the oil cost over profit */
  a(near(F.oilCost / F.profit, 0.1), '"a tenth of profit" is not RM6m of RM60m');
  const oilPr = PRACTICE.find((p) => /palm oil\. \(12 marks\)/.test(p.question));
  a(oilPr && /a tenth of profit/.test(oilPr.guidance), 'the oil Assess outline no longer says "a tenth of profit" — re-check the fraction');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 4) problems.push(`${content.length} blocks, not 4`);
  if (SUBSECTIONS.length !== 13) problems.push(`${SUBSECTIONS.length} subsections, not 13`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    /* structure-01: no chapter of two, where every step is the last of its block */
    if (b.sections.length < 3) problems.push(`block "${b.title}" has ${b.sections.length} subsections (structure-01)`);
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
  const ids = [
    ...content.map((b) => b.id), ...SUBSECTIONS.map((s) => s.id), ...SUBSECTIONS.map((s) => s.recall.id),
    ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id), ...FLASHCARDS.map((f) => f.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id),
  ];
  if (new Set(ids).size !== ids.length) problems.push(`duplicate ids: ${[...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].slice(0, 3).join(', ')}`);
  for (const s of SUBSECTIONS) if (s.recall?.id !== `${s.id}:recall`) problems.push(`${s.id}: the recall id is not minted from its own subsection`);
  /* structure-02: culture and stakeholders are no longer one chapter; ethics and CSR no longer duplicate */
  const b1 = JSON.stringify(content[0]).toLowerCase();
  if (/stakeholder/.test(b1)) problems.push('structure-02: chapter 1 (culture) still teaches stakeholders');
  if (/Culture & Stakeholders|Ethics & CSR/.test(JSON.stringify(content))) problems.push('a live block title survived');
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE NUMBERING, RE-READ FROM THE DOCUMENT ═══ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '3.3.4');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 17 || leaves.length !== 15) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 3.3.4, not 17 / 15`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 3.3.4 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[.:()]/g, '');
  const STOP = ['business', 'considers', 'decisions/objectives', 'should', 'purely', 'between', 'potential'];
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/]+/).filter((w) => w.length > 4 && !STOP.includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ')).join(' '));
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the four culture types are the document's words at :1190-1194 */
  const span = spec.slice(1183, 1212).join(' ').toLowerCase();
  for (const c of CULTURE_TYPES) if (!new RegExp(`•\\s+${c}\\b`).test(span)) problems.push(`the util lists culture type "${c}" and bus_spec.txt:1184-1211 does not bullet it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1146, '3.3.3 Decision-making techniques');
  at(1184, '3.3.4 Influences on business decisions');
  at(1218, '3.3.5 Assessing competitiveness');
  at(1255, '3.3.6 Manging change');
  /* the numbers 15 ledger ids cite must exist nowhere in the document */
  if (/\b3\.4\.\d/.test(specBody)) problems.push('"3.4.<n>" occurs in bus_spec.txt after all — ledger items cite it and this packet refuses it on the ground that it does not');
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
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|market|place)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'The former is a role culture.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['In the first year the saving is smaller.', 'In the first place the law is the minimum.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
  /* quiz-01: the unsourced "3-5 years" figure is gone from every surface */
  if (readable.some((s) => /3\s*[-–]\s*5 years|experts estimate/i.test(s))) problems.push('quiz-01: the "3-5 years" / "experts estimate" claim survived');
}
{
  /* nothing quizzed that no subsection teaches */
  const teachingText = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['power culture', 'role culture', 'task culture', 'person culture', 'strong culture', 'weak culture', 'national attitudes', 'status', 'share price', 'dividends', 'stakeholder model', 'shareholder model', 'supplier', 'trust', 'ethics', 'pay ratio', 'median', 'bonus', 'corporate social responsibility', 'beyond'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teachingText.includes(term.replace('national attitudes', 'national attitudes'))) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...s.body.map((x) => x.text || '')]).join(' ').toLowerCase();
    const off = items.filter((q) => !q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (off.length) problems.push(`quiz item(s) pinned to "${b.title}" share no substantive word with the chapter: ${off.map((q) => q.question.slice(0, 40)).join(' | ')}`);
  }
  /* quiz-01 named: its replacement is on 1d and chapter 2 teaches it */
  const b2 = content[1].sections.map((s) => JSON.stringify(s)).join(' ').toLowerCase();
  if (!QUIZ.some((q) => q.block === BLOCKS[1] && /years rather than months/.test(q.question))) problems.push('quiz-01: no item on why culture change takes years');
  if (!/years, not months/.test(b2)) problems.push('quiz-01: chapter 2 does not teach that culture change takes years');
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
  /* the paper shape, from the file the 26 Sep ruling names */
  const paper = JSON.parse(readFileSync('audit/raw/ial-paper-structure.json', 'utf8')).business.units_3_4;
  if (!paper.papers.includes('WBS13')) problems.push('ial-paper-structure.json units_3_4 does not list WBS13');
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
    if (!p.question.slice(EXTRACT.length).includes(F.name)) problems.push(`practice "${p.command} ${p.marks}": the task does not name the firm (practice-01, topFix-05 — a generic stem)`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" allocates marks`);
    if (/RM\s?[\d,]|\d+(?:\.\d+)?%|\d{3,}/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries the level descriptors`);
    if (p.marks > 6) {
      if (/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
      for (const L of ['Level 1', 'Level 2', 'Level 3', 'Level 4']) if (!p.guidance.includes(L)) problems.push(`${p.marks}-mark ${p.command} guidance has no ${L}`);
      for (const w of ['knowledge', 'application', 'analysis', 'evaluation']) if (p.command !== 'Discuss' && !p.guidance.toLowerCase().includes(w)) problems.push(`${p.marks}-mark ${p.command} guidance never names ${w}`);
      if (p.marks >= 12 && !/A strong answer, in outline:/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} has no short model answer`);
    } else if (!/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (p.command === 'Discuss' && /\bconclu/i.test(p.guidance)) problems.push('Discuss guidance asks for a conclusion (V036)');
  }
  /* the source carries every figure the tasks and schemes lean on */
  for (const f of [rmm(F.sales), rmm(F.closureSaving), rmm(F.closureCost), rmm(F.profit), rm(F.oilPremium), '20,000', '2,400', '300', rmm(F.ceoPay), rm(F.medianPay), rm(F.lowPay), rmm(F.bonus), F.oldSite, F.newSite]) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  if (!/Explain one\b/.test(PRACTICE.find((p) => p.command === 'Explain').question)) problems.push('the 4-mark Explain is not "Explain one..."');
  /* practice-01 / topFix-05: the live short-termism and "moral obligation" stems are gone */
  if (PRACTICE.some((p) => /short-termism|moral obligation|PharmaLife/i.test(p.question))) problems.push('practice-01/topFix-05: a live generic stem survived');
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
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
      if (r.correctOrder.some((x) => /^(identify|explain|state|show|draw|evaluate|analyse|define|conclude)\b/i.test(x))) problems.push(`${where}: a reorder item is an exam-procedure step`);
      /* reorder.source: the sequence is an extras chain, in the same order */
      const src = EXTRAS.chains.find((c) => c.steps.length === r.correctOrder.length && c.steps.every((s, i) => s.replace(/\.$/, '') === r.correctOrder[i]));
      if (!src) problems.push(`${where}: the reorder is not an extras chain, step for step`);
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
  /* topFix-03 / structure-03, named: the four types are recalled against their defining feature */
  const typeMatch = recalls.find(([, r]) => r.type === 'match' && CULTURE_TYPES.every((c) => r.pairs.some((p) => p.right.toLowerCase() === `${c} culture`)));
  if (!typeMatch) problems.push('topFix-03: no match recall covers all four culture types');
  /* accuracy-02: no recall asks the student to class SHAREHOLDERS internal or external (contested) */
  const ie = recalls.find(([s]) => s.id.endsWith('internal-and-external-stakeholders'))?.[1];
  if (!ie || ie.groups.some((g) => g.items.some((x) => /shareholder|owner/i.test(x)))) problems.push('accuracy-02: the internal/external recall classes a shareholder, which textbooks dispute');
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
    if (/\bexam|\bmarks?\b|\bexaminer/i.test(s.misconception)) problems.push(`${where}: the misconception is about exam technique, not the subject`);
  }
  const mis = SUBSECTIONS.map((s) => s.misconception.slice(0, 60));
  if (new Set(mis).size !== mis.length) problems.push('two subsections open their misconception the same way');
  /* structure-06: the common error "a strong culture is always good" is IN content[] now */
  if (!/strong culture is always a good culture/i.test(SUBSECTIONS[0].misconception)) problems.push('structure-06: the strong-is-good misconception is not in content[]');
  for (const b of content) {
    if (b.takeaway.length !== 3) problems.push(`"${b.title}" has ${b.takeaway.length} takeaways`);
    b.takeaway.forEach((x) => { if (x.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${x.slice(0, 40)}"`); });
  }
  /* structure-08: chapter 4 has a takeaway on the profit/ethics trade-off itself */
  if (!content[3].takeaway.some((x) => /ethics/i.test(x) && /profit/i.test(x) && /trade-off/i.test(x))) problems.push('structure-08: no ethics takeaway states the profit/ethics trade-off');
  /* structure-07 / topFix-04: a worked judgement is modelled in the body, not only asked for */
  const workedSub = SUBSECTIONS.find((s) => s.id.endsWith('can-a-culture-be-changed'));
  if (!workedSub || !workedSub.body.some((b) => /\*\*The judgement\.\*\*/.test(b.text || '') && /depends most on/.test(b.text || ''))) problems.push('structure-07: no body paragraph models a judgement with its condition');
  /* topFix-02 / accuracy-01: stakeholders taught internal/external in the body; the grid instruction gone */
  const ieSub = SUBSECTIONS.find((s) => s.id.endsWith('internal-and-external-stakeholders'));
  const ieBody = ieSub.body.map((b) => b.text).join(' ');
  if (!/\*\*Internal stakeholders\*\*/.test(ieBody) || !/\*\*External stakeholders\*\*/.test(ieBody)) problems.push('topFix-02: internal and external stakeholders are not taught in the body');
  if (!/either is accepted with a reason/i.test(ieBody)) problems.push('accuracy-02: the body does not say shareholders can be classed either way');
  if (readable.some((s) => /draw the 2\s*x\s*2|2×2 grid|2x2 grid/i.test(s))) problems.push('accuracy-01: the "draw the 2x2 grid" instruction survived');
  /* topFix-04: the duplicated for/against lists are gone — no two paragraphs of chapter 4 share 5+ key nouns */
  {
    const b4paras = content[3].sections.flatMap((s) => s.body.map((b) => b.text || '')).filter(Boolean);
    const nouns = ['reputation', 'loyalty', 'talent', 'regulat', 'competitive disadvantage', 'brand', 'attract', 'measur'];
    for (let i = 0; i < b4paras.length; i += 1) for (let j = i + 1; j < b4paras.length; j += 1) {
      const shared = nouns.filter((n) => b4paras[i].toLowerCase().includes(n) && b4paras[j].toLowerCase().includes(n));
      if (shared.length >= 3) problems.push(`topFix-04: two chapter-4 paragraphs repeat the same for/against list (${shared.join(', ')})`);
    }
  }
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give|value|test)/i;
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
    /* since PR #40 (merged 26 Sep, 8a06aa3) the tab reads every card through lib/mistakes-shape.js;
       follow the component to its reader, then ask the shipping reader what each card would miss */
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    if (!/import \{[^}]*\breadMistake\b[^}]*\} from '@\/lib\/mistakes-shape'/.test(tab) || !tab.includes('readMistake(')) problems.push('MistakesTab.jsx no longer reads cards through lib/mistakes-shape.js; the mistake fields must follow the component');
    for (const k of ['item.title', 'item.wrong', 'item.right', 'item.examTip']) if (!tab.includes(k)) problems.push(`MistakesTab.jsx no longer renders ${k}; the mistake fields must follow the component`);
    for (const m of MISTAKES) { const gaps = mistakeGaps(m); if (gaps.length) problems.push(`mistake "${m.title}": lib/mistakes-shape.js reads no ${gaps.join(', ')}`); }
  }
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-RM|RM-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b|\bpound\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b/g, 'a UK-only institution (locale.institution)');
  /* the live section's named real firms and their unverifiable claims */
  ban(/\bGoogle\b|Volkswagen|\bVW\b|Patagonia|\bBP\b|Deepwater|Beyond Petroleum/g, 'a named real firm from the live section\'s examples');
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
      /* a label whose anchor point sits inside an outlined box must fit that box — the INNERMOST box */
      const outlined = [...s.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)" height="([-\d.]+)"[^>]*fill="none"/g)].map((m) => m.slice(1, 5).map(Number));
      for (const m of s.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
        const [x, y, size, anchor, str] = [Number(m[1]), Number(m[2]), Number(m[3]), m[4], m[5]];
        const hosts = outlined.filter(([rx, ry, rw, rh]) => x > rx && x < rx + rw && y > ry && y < ry + rh).sort((a, b) => a[2] * a[3] - b[2] * b[3]);
        const host = hosts[0];
        if (!host) continue;
        const w = estWidth(str, size);
        const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
        if (left < host[0] + 3 || left + w > host[0] + host[2] - 3) problems.push(`"${d.title}": "${str}" does not fit inside its ${host[2]}-unit box`);
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
      for (const ln of linesOf(scenario.svg)) for (const bx of boxes) {
        if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
      }
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('Suppliers', 300, 100, 12), mk('Lenders', 300, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Suppliers', 300, 100, 12), mk('Lenders', 300, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALL)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Rewards', 188, 120, 12))) problems.push('the line check does not see a vertical arrow drawn through a label');
  }
  /* the figures the teaching states are countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' ') + ALL_DIAGRAMS[i].checklist.join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, ['Power', 'Role', 'Task', 'Person'], 'culture-types');
  want(2, ['Employees', 'Managers', 'Customers', 'Suppliers', 'Lenders', 'Government', 'Local community', 'Shareholders'], 'stakeholder');
  want(3, [rmm(F.profit), rmm(F.profitWithOil), rmm(F.oilCost), ratio(F.payRatio), ratio(F.payRatioAfter)], 'ethics');
  /* no Mendelow quadrant anywhere on a diagram (accuracy-01) */
  if (svgText.some((s) => /keep satisfied|keep informed|key player|high power/i.test(s))) problems.push('accuracy-01: a Mendelow quadrant label is drawn');
  /* THE CHECK-IN KEY: no item pinned to a block has its key printed on that block's diagram */
  const surfaces = (d) => [d.title, d.description, ...d.checklist, ...d.scenarios.map((s) => s.label), ...d.scenarios.flatMap((s) => textsOf(s.svg).map((x) => x.body))].join(' | ').toLowerCase();
  const figs = (s) => [...String(s).matchAll(/(?:RM)?\d[\d,]*(?:\.\d+)?%?m?/g)].map((m) => m[0]).filter((x) => /RM|%/.test(x) || Number(x.replace(/[,m]/g, '')) >= 13);
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const qi of b.quizIndices) {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      if (surf.includes(key.toLowerCase())) problems.push(`"${b.title}": the key "${key}" of a pinned item is printed on the chapter's diagram`);
      for (const f of figs(key)) if (!q.question.includes(f) && surf.includes(f.toLowerCase())) problems.push(`"${b.title}": the key figure ${f} of a pinned item is printed on the chapter's diagram`);
      /* the culture-type names are keys only in the pre-test; a pinned key naming a type printed on its own diagram leaks */
      for (const c of CULTURE_TYPES) if (key.toLowerCase().includes(`${c} culture`) && surf.includes(c)) problems.push(`"${b.title}": a pinned key names the ${c} culture, which the chapter's diagram draws`);
    }
  });
  /*
   * THE CHECK-IN PRACTICE ITEM (fix round 1, C-…-specGap-07). The quiz check above never looked at
   * practice, and chapter 4's Calculate item had all 4 marks printed on its diagram. For the practice
   * item each check-in SHOWS: a figure its scheme reaches that its own stem does not give must not be
   * printed on the chapter's diagram. `resolvePinnedItem` serves the first pin not already used, and the
   * blocks' pins are disjoint (asserted here), so the shown item is each block's FIRST pin. Not checked:
   * the second pins (chapter 4's palm-oil Assess 12 reaches RM6m and RM54m, which its diagram draws —
   * it is served in the Practice tab, which has no diagram above it) and the Practice tab itself.
   */
  {
    const all = content.flatMap((b) => b.practiceIndices);
    if (new Set(all).size !== all.length) problems.push('practice pins overlap between blocks, so "the first pin is the one shown" no longer holds');
  }
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const pi of b.practiceIndices.slice(0, 1)) {
      const pr = PRACTICE[pi];
      const reached = [...new Set([...figs(pr.guidance), ...[...pr.guidance.matchAll(/\b\d[\d,.]* to 1\b/g)].map((m) => m[0])])];
      for (const f of reached) {
        if (pr.question.includes(f)) continue;
        const hit = / to 1$/.test(f) ? surf.includes(f) : new RegExp(`(^|[^\\d.,])${f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase()}(?![\\d,])`).test(surf);
        if (hit) problems.push(`"${b.title}": pinned practice ${pi} (${pr.command} ${pr.marks}) reaches ${f}, which the chapter's diagram prints`);
      }
    }
  });
  {
    /* A/B the key check: a key that IS on a diagram must be caught */
    const surf = surfaces(DIAGRAMS[3]);
    if (!surf.includes(rmm(F.profitWithOil).toLowerCase())) problems.push('the check-in key check cannot see a figure printed on the ethics diagram');
    if (!figs('profit falls to RM54m').includes('RM54m')) problems.push('the key-figure reader cannot read a ringgit figure');
  }
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])].join(' ').toLowerCase(); };
  const need = (slug, words, idTag) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${idTag}: ${slug} never says "${w}"`); };
  need('how-culture-is-formed', ['founder', 'history', 'recruitment', 'promotion', 'rewards', 'country', 'industry'], 'specGap-03');
  need('why-established-cultures-resist-change', ['established culture', 'status', 'success', 'systems', 'years'], 'specGap-04');
  need('internal-and-external-stakeholders', ['internal stakeholders', 'external stakeholders', 'employees', 'customers', 'suppliers'], 'specGap-05/topFix-02/accuracy-02');
  need('stakeholder-objectives', ['objectives', 'shareholders', 'employees', 'suppliers', 'lenders', 'government'], 'specGap-05/topFix-02');
  need('shareholder-and-stakeholder-models', ['shareholder model', 'stakeholder model', 'share price and dividends', 'consider all of its stakeholders'], 'specGap-06');
  need('conflict-between-profit-and-wider-objectives', ['profit-based', 'wider', 'close', 'jobs', 'suppliers'], 'specGap-06/topFix-02');
  need('trade-offs-between-profit-and-ethics', ['trade-off between profit and ethics', 'business ethics'], 'topFix-04/structure-08');
  need('pay-and-rewards', ['pay ratio', 'bonus', 'median', 'executive'], 'specGap-07');
  need('corporate-social-responsibility', ['corporate social responsibility', 'beyond what the law requires', 'environmental'], 'specGap-08 (the in-spec half)');
  /* at least two causal flows, no two the same */
  const flows = SUBSECTIONS.flatMap((s) => s.body.filter((b) => b.type === 'flow').map((b) => b.steps.map((x) => x.title).join(' > ').toLowerCase()));
  if (new Set(flows).size !== flows.length) problems.push('two flows teach the same chain');
  if (flows.length < 2) problems.push('fewer than two causal flows in the section');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '3.3.4' || ctx.unitCode !== 'WBS13') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 3.3.4 / WBS13`);
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

console.log(`\n${SECTION} — packet 53`);
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
for (const f of carried) console.log(`  CARRIED   ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }

console.log(`
packet checks
  SCOPE      3.3.4 only. Short-termism, evidence-based vs subjective decisions, animal welfare, Carroll's
             pyramid and the Mendelow grid-as-structure are banned, each A/B'd both ways and each ban
             re-measured against bus_spec.txt; Handy, Mendelow, Friedman, Freeman, greenwashing and
             groupthink are asides — one mention each, teaching text only, never on an assessed surface
  NUMBERING  the oracle re-read (17 rows / 15 leaves), every leaf mapped and its own words found in its
             subsections, the four culture types matched to the bullets, four headings asserted by line,
             "3.4.<n>" asserted ABSENT, and the database's own 3.3.4 / WBS13 asserted
  ARITHMETIC closure saving and payback, the oil trade-off (10% of profit, a 1.2% price rise), both pay
             ratios, and every recall and quiz key recomputed independently
  PINS       derived from each item's block tag; four blocks of three or four subsections, each with its
             own diagram, quiz and practice; no diagramRef; 7 free quiz items against 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that no subsection teaches
  PRACTICE   Appendix 6 parsed including Assess 10/12; the set is ial-paper-structure.json's Units 3-4
             Section A (4/4/8/12/12) plus two Evaluate essays, all on one source that carries every
             figure; stems name the firm; openings clean; levels naming K/App/An/Ev above 6
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, the four culture types matched, the reorder sourced
             from an extras chain, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit and collisions checked on
             the emitted SVG with the guard A/B'd, figures counted back out of the SVG, no Mendelow
             quadrant drawn, and no chapter's pinned key printed on its own diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-53-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-53-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
