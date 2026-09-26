#!/usr/bin/env node
/**
 * PACKET 49 — business-growth, Business Unit 3 (WBS13), IAL topic 3.3.2.
 * `audit/raw/bus_spec.txt:1117-1142`. FIVE blocks, fifteen subsections, 16 leaves.
 *
 *   node scripts/packet-49-business-growth.mjs            # dry run, every check
 *   node scripts/packet-49-business-growth.mjs --dump     # + write the bundle
 *   node scripts/packet-49-business-growth.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 53's runner, adapted. What this packet adds, with the reason:
 *
 *   - **THE OFF-SPECIFICATION TOPICS ARE BANNED, AND EACH BAN RESTS ON A MEASUREMENT.** Demergers,
 *     reasons for staying small and barriers to entry are asserted ABSENT from bus_spec.txt; Ansoff is
 *     asserted to sit only outside 3.3.2; "small business" and "franchis-" are asserted to occur only in
 *     the sections the pointers name. A ban cannot outlive the fact it rests on.
 *   - **POINTERS ARE COUNTED AND CARRY THEIR TOPIC NUMBER.** How a small business competes (2.3.5) and
 *     franchising (2.3.1) may each be referred to once, in teaching text, with the owner's number.
 *   - **THE CALCULATE ITEM'S FIGURES ARE PRINTED ONLY ON ITS SOURCE** (packet 53's fix round 1, made a
 *     rule here from the start): S$0.80, S$0.62 and 22.5% appear nowhere else a student reads.
 *   - **THE COST CURVE IS RE-READ FROM THE EMITTED SVG**: its lowest point is found from the polyline and
 *     must sit where the function's minimum is, under the dashed marker.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { mistakeGaps } from '../lib/mistakes-shape.js';
import {
  SECTION, FIRM, sgd, sgdm, cents, pct, round2,
  BANNED, POINTER_ONLY, ASIDES, INTERNAL_ECONOMIES, teachingWords, teachingVocabulary,
} from './_packet49-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet49-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet49-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD, COST_CURVE, toX } from './_packet49-diagrams.mjs';

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
const specLinesMatching = (re) => spec.map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l)).map(([n]) => n);

/* The ASSESSED surfaces: where an aside or pointer may never appear. Recalls are inside content, so read apart. */
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
  for (const bad of ['a cost of S$undefinedm', 'a share of NaN%', 'the firm [object Object] pays', 'a price of ' + '${sgd(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['the object of the takeover is speed', 'a cost of S$6m']) {
    if (FAILED_SUBSTITUTION.test(ok)) problems.push(`the failed-substitution check fires on legitimate text: "${ok}"`);
  }
}

/* ══ 2 · THE BANNED TOPICS, THE POINTERS, THE ASIDE, AND WHAT THEY REST ON ═══ */
for (const [re, why] of BANNED) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 100)}"`);
}
{
  const fires = (i, str) => { const [re] = BANNED[i]; return new RegExp(re.source, re.flags.replace('g', '')).test(str); };
  const probes = [
    [0, 'A demerger splits one company into two', 'the two firms merge their offices'],
    [1, 'eBay sold Skype to an investor group', 'a bakery sold its delivery vans'],
    [2, 'Use Ansoff\'s Matrix to choose a strategy', 'a new market for an existing product'],
    [3, 'Explain two barriers to entry', 'barriers to entrepreneurship'],
    [4, 'Reasons for staying small include flexibility', 'small firms in a cluster'],
    [5, 'The CMA may block the deal', 'the competition authority may block the deal'],
    [6, 'Outline two reasons for growth.', 'A strong answer, in outline:'],
    [6, 'Assess the usefulness of the plan. (10 marks)', 'Assess the plan. (12 marks)'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['demerg', 'staying small', 'barriers to entry', 'synerg', 'eBay', 'Skype', 'Competition and Markets']) {
  if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban or aside rests on it being absent`);
}
{
  /* Ansoff is IN the spec — at 3.3.1 (:1090-1116) and 4.3.3 — and never inside 3.3.2 (:1117-1145) */
  const ans = specLinesMatching(/Ansoff/i);
  if (!ans.length || ans.some((n) => n >= 1117 && n <= 1145) || !ans.some((n) => n >= 1090 && n < 1117)) problems.push(`Ansoff in bus_spec.txt at ${ans.join(', ')} — the ban rests on it being 3.3.1's and not 3.3.2's`);
  /* "small business" only at 2.3.5 · 3b; "franchis" only at 2.3.1 · 4b */
  const small = specLinesMatching(/small business/i);
  if (JSON.stringify(small) !== '[1032]') problems.push(`"small business" in bus_spec.txt at ${small.join(', ')}, not only :1032 (2.3.5 · 3b)`);
  if (!/^\f?2\.3\.5 External influences/.test(spec[1008] || '')) problems.push('bus_spec.txt:1009 is not the 2.3.5 heading the small-business pointer cites');
  const fr = specLinesMatching(/franchis/i);
  if (JSON.stringify(fr) !== '[872]') problems.push(`"franchis" in bus_spec.txt at ${fr.join(', ')}, not only :872 (2.3.1 · 4b)`);
  if (!/^\f?2\.3\.1 Planning a business/.test(spec[843] || '')) problems.push('bus_spec.txt:844 is not the 2.3.1 heading the franchising pointer cites');
  /* 3.3.2's own span says neither */
  const span = spec.slice(1116, 1145).join(' ');
  if (/small|franchis|Ansoff|barrier/i.test(span)) problems.push('bus_spec.txt:1117-1145 mentions small firms, franchising, Ansoff or barriers after all');
}
for (const { re, cite, max, why } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const inTeaching = teaching.filter((s) => one.test(s));
  const inAssessed = assessed.filter((s) => one.test(s));
  if (inTeaching.length > max) problems.push(`${why} — ×${inTeaching.length} in teaching text against a pointer budget of ${max}`);
  for (const s of inTeaching) if (!s.includes(cite)) problems.push(`${why} — referred to without its topic number ${cite}: "${s.slice(0, 90)}"`);
  if (inAssessed.length) problems.push(`${why} — on an ASSESSED surface (a pointer is never assessed): "${inAssessed[0].slice(0, 90)}"`);
  if (svgText.some((s) => one.test(s))) problems.push(`${why} — printed on a diagram`);
}
for (const { re, why, max } of ASIDES) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const inTeaching = teaching.filter((s) => one.test(s));
  const inAssessed = assessed.filter((s) => one.test(s));
  if (inTeaching.length > max) problems.push(`${why} — ×${inTeaching.length} in teaching text against a budget of ${max}`);
  if (inAssessed.length) problems.push(`${why} — on an ASSESSED surface (an aside is never assessed): "${inAssessed[0].slice(0, 90)}"`);
  if (svgText.some((s) => one.test(s))) problems.push(`${why} — printed on a diagram`);
}
{
  /* A/B: the assessed-surface split must see a quiz item and must not see a body paragraph */
  if (!assessed.some((s) => /hostile takeover/.test(s))) problems.push('the assessed-surface reader cannot see the quiz');
  if (assessed.some((s) => /sometimes called synergy/.test(s))) problems.push('the assessed-surface reader sees a body paragraph');
  if (!teaching.some((s) => /sometimes called synergy/.test(s))) problems.push('the teaching reader cannot see the one synergy aside (or it was removed)');
  if (!teaching.some((s) => /2\.3\.1/.test(s) && /franchis/i.test(s))) problems.push('the teaching reader cannot see the franchising pointer (specGap-04 names franchising)');
  if (!teaching.some((s) => /2\.3\.5/.test(s) && /small business/i.test(s))) problems.push('specGap-05: the one pointer to 2.3.5 (how a small business competes) is missing');
}
ban(/\bF0\d\d\b|\bC-business-growth-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
ban(/\b3\.2\.[1-4]\b|\b3\.1\.3\b/g, 'a UK GCE topic number in student-facing text');
/* the Calculate item's figures are printed on its source and its scheme only */
{
  const calcFigures = [pct(F.unitCostFallPct), '29%', '0.18'];
  const calc = PRACTICE.find((x) => x.command === 'Calculate');
  const elsewhere = allStrings([content, NOTES, FLASHCARDS, MISTAKES, EXTRAS, bundle.quiz, PRACTICE.filter((x) => x !== calc).map((x) => x.guidance), ALL_DIAGRAMS]).filter((s) => !IDLIKE.test(s));
  for (const f of calcFigures) if (elsewhere.some((s) => s.includes(f))) problems.push(`the Calculate item's figure ${f} is printed outside its source and scheme`);
  /* A/B: the check sees the figure when it is planted in a surface it reads, and not before */
  const planted = [...elsewhere, `the cost falls to ${cents(F.unitCostAfter)}`];
  if (!planted.some((s) => s.includes(cents(F.unitCostAfter)))) problems.push('the Calculate-figure check cannot read a cents figure');
  if (!EXTRACT.includes(cents(F.unitCostNow)) || !calc.guidance.includes(pct(F.unitCostFallPct))) problems.push('the Calculate figures are not on the source and in the scheme');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(F.organicCost === 6e6 && F.cafesAfterOrganic === 55, 'Plan A is not 15 × S$400,000 = S$6m, reaching 55 cafés');
  a(near(F.unitCostFallPct, 22.5) && near(((0.80 - 0.62) / 0.80) * 100, 22.5), 'the loaf cost fall is not 22.5%');
  a(Math.round((0.18 / 0.62) * 100) === 29, 'the Calculate scheme\'s wrong-base figure is not about 29%');
  a(F.premium === 16e6 && 36e6 - 20e6 === 16e6, 'the premium is not S$36m − S$20m = S$16m');
  a(near(F.interest, 1.44e6) && near(24e6 * 0.06, 1.44e6), 'interest is not 6% of S$24m = S$1.44m');
  a(near(F.yearlyGain, 3.06e6) && near(3e6 + 1.5e6 - 1.44e6, 3.06e6), 'the yearly gain is not S$3m + S$1.5m − S$1.44m = S$3.06m');
  a(F.cafesAfterTakeover === 70 && F.shareAfter === 14, 'Plan B is not 70 cafés and 14% of the market');
  a(F.customerDays - F.supplierDays === 30, 'the cash gap is not 60 − 30 = 30 days');
  /* recall and quiz arithmetic the content prints, recomputed here and not read from the module */
  a(near((15 / 250) * 100, 6), 'market-share recall: S$15m of S$250m = 6%');
  a(45 - 30 === 15 && 20e6 * 0.05 === 1e6, 'risk-and-reward recall: premium 15, interest 1');
  a(45 - 15 === 30, 'overtrading recall: 45 − 15 = 30 days');
  a(near((36 / 240) * 100, 15) && Math.round((240 / 36) * 10) / 10 === 6.7 && 100 - 15 === 85, 'quiz: S$36m of S$240m = 15% (distractors 6.7 = 240 ÷ 36, 85 = the rest of the market)');
  a(50 - 35 === 15 && 50 + 35 === 85, 'quiz: premium S$50m − S$35m = S$15m (distractor 85)');
  a(50e6 - 32e6 === 18e6 && 30e6 * 0.05 === 1.5e6 && 4e6 + 1e6 - 1.5e6 === 3.5e6, 'the gym-chain worked case is not 18 / 1.5 / 3.5');
  /* the cost curve's minimum */
  a(near(COST_CURVE.f(COST_CURVE.qMin), 5) && COST_CURVE.f(3.9) > 5 && COST_CURVE.f(4.1) > 5, 'the cost curve\'s minimum is not at q = 4');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 15) problems.push(`${SUBSECTIONS.length} subsections, not 15`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    /* structure-04: no chapter of one or two, where every step is the last of its block */
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
  const ids = [
    ...content.map((b) => b.id), ...SUBSECTIONS.map((s) => s.id), ...SUBSECTIONS.map((s) => s.recall.id),
    ...QUIZ.map((q) => q.id), ...PRACTICE.map((p) => p.id), ...FLASHCARDS.map((f) => f.id), ...MISTAKES.map((m) => m.id), ...ALL_DIAGRAMS.map((d) => d.id),
  ];
  if (new Set(ids).size !== ids.length) problems.push(`duplicate ids: ${[...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].slice(0, 3).join(', ')}`);
  for (const s of SUBSECTIONS) if (s.recall?.id !== `${s.id}:recall`) problems.push(`${s.id}: the recall id is not minted from its own subsection`);
  /* the live chapters and subsections are gone */
  const all = JSON.stringify(content);
  if (/"Growth Methods"|"Growth Decisions"|reasons-staying-small|demergers-splitting-up/.test(all)) problems.push('a live block title or subsection id survived');
  /* topFix-01 / topFix-02: a chapter teaches the problems arising from growth */
  const b5 = content[4];
  if (!/Problems Arising From Growth/.test(b5.title) || !['diseconomies-of-scale', 'internal-communication', 'overtrading'].every((s) => b5.sections.some((x) => x.id.endsWith(`:${s}`)))) problems.push('topFix-01/02: no chapter teaches diseconomies, internal communication and overtrading');
}

/* ══ 5 · THE LEAF MAP, THE ORACLE AND THE NUMBERING, RE-READ FROM THE DOCUMENT ═══ */
{
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '3.3.2');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 18 || leaves.length !== 16) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 3.3.2, not 18 / 16`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 3.3.2 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[.:()]/g, '');
  const STOP = ['between'];
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/]+/).filter((w) => w.length > 4 && !STOP.includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ')).join(' '));
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1090, '3.3.1 Business objectives and strategy');
  at(1117, '3.3.2 Business growth');
  at(1146, '3.3.3 Decision-making techniques');
  /* the numbers six ledger ids cite must exist nowhere in the document */
  if (/\b3\.2\.\d|\b3\.1\.3\b/.test(specBody)) problems.push('"3.2.<n>" or "3.1.3" occurs in bus_spec.txt after all — ledger items cite it and this packet refuses it on the ground that it does not');
  /* the five internal economies are taught by name */
  const eosSub = JSON.stringify(SUBSECTIONS.find((s) => s.id.endsWith(':internal-economies-of-scale')).body).toLowerCase();
  for (const e of INTERNAL_ECONOMIES) if (!eosSub.includes(`**${e}**`)) problems.push(`specGap-01: the internal-economies subsection does not teach "${e}" by name`);
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
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|market|place|factory)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'The former is organic growth.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['In the first year the saving is smaller.', 'A second factory is organic growth.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
  /* quiz-04: the overtrading item explains every distractor, recruiting ahead of orders included */
  const ot = QUIZ.find((q) => /avoid overtrading/.test(q.question));
  if (!ot || !/recruiting ahead of orders/.test(ot.explanation) || !/cash out sooner/.test(ot.explanation)) problems.push('quiz-04: the avoid-overtrading item does not explain why recruiting ahead worsens cash');
}
{
  /* nothing quizzed that no subsection teaches (quiz-01..04, structure-01) */
  const teachingText = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['economies of scale', 'external', 'technical', 'purchasing', 'diseconom', 'overtrading', 'market power', 'market share', 'brand', 'organic', 'merger', 'takeover', 'hostile', 'horizontal', 'backward', 'forward', 'conglomerate', 'premium', 'dilut', 'motivation', 'layers', 'working capital'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teachingText.includes(term)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const [i, term] of [[0, 'economies of scale'], [1, 'diseconomies of scale'], [2, 'overtrading'], [3, 'overtrading']]) {
    if (!teachingText.includes(term)) problems.push(`quiz-0${i + 1}: "${term}" is still untaught in content[]`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...s.body.map((x) => x.text || '')]).join(' ').toLowerCase();
    const off = items.filter((q) => !q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (off.length) problems.push(`quiz item(s) pinned to "${b.title}" share no substantive word with the chapter: ${off.map((q) => q.question.slice(0, 40)).join(' | ')}`);
  }
  if (readable.some((s) => /Disney|21st Century Fox/.test(s))) problems.push('the live Disney/Fox item survived');
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
    if (!p.question.slice(EXTRACT.length).includes(F.name)) problems.push(`practice "${p.command} ${p.marks}": the task does not name the firm (practice-01 — a generic stem)`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" allocates marks`);
    if (/S\$\s?[\d,]|\d+(?:\.\d+)?%|\d{2,}/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries a figure`);
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
  for (const f of [sgdm(F.sales), sgdm(F.profit), pct(F.share), cents(F.unitCostNow), cents(F.unitCostAfter), '20,000', '50,000', sgd(F.fitOut), sgdm(F.price), sgdm(F.netAssets), sgdm(F.rivalProfit), sgdm(F.savings), sgdm(F.borrowed), pct(F.rate), pct(F.rivalShare), '1,500', sgdm(F.flourBill), F.rival, F.mill]) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  if (!/Explain one\b/.test(PRACTICE.find((p) => p.command === 'Explain').question)) problems.push('the 4-mark Explain is not "Explain one..."');
  /* practice-01 / practice-02 / topFix-05: the live stems are gone; the two named replacements exist */
  if (PRACTICE.some((p) => /Ansoff|barriers to entry|gym|MegaRetail|online fashion/i.test(p.question))) problems.push('practice-01/02/topFix-05: a live stem survived');
  if (!PRACTICE.some((p) => p.command === 'Assess' && /financial risks and rewards/.test(p.question))) problems.push('topFix-05: no Assess item on the financial risks and rewards of a takeover');
  if (!PRACTICE.some((p) => p.command === 'Explain' && /disadvantage/.test(p.question))) problems.push('topFix-05: no Explain item on a drawback of a route to growth');
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
  /* topFix-04, named: a fill-in on the integration types, and a reorder of the takeover-to-savings sequence */
  const intFill = recalls.find(([, r]) => r.type === 'fillin' && ['backward', 'forward', 'horizontal'].every((a) => r.answers.includes(a)));
  if (!intFill) problems.push('topFix-04: no fill-in recall covers backward, forward and horizontal integration');
  const takeoverReorder = recalls.find(([s, r]) => r.type === 'reorder' && s.id.endsWith(':mergers-and-takeovers') && /takeover/.test(r.prompt));
  if (!takeoverReorder) problems.push('topFix-04: no reorder of the takeover sequence on the mergers-and-takeovers step');
  /* the flow the live section used for this is no longer the reorder's source on the same step */
  if (takeoverReorder && takeoverReorder[0].body.some((b) => b.type === 'flow')) problems.push('topFix-04: the takeover reorder sits under a flow on its own step, so it is recoverable');
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
      if (b.type === 'flow' && !['good', 'bad', 'neutral'].includes(b.resultType)) problems.push(`${where}: a flow resultType FlowChain does not read`);
    }
    if (/\bexam|\bmarks?\b|\bexaminer/i.test(s.misconception)) problems.push(`${where}: the misconception is about exam technique, not the subject`);
  }
  const mis = SUBSECTIONS.map((s) => s.misconception.slice(0, 60));
  if (new Set(mis).size !== mis.length) problems.push('two subsections open their misconception the same way');
  for (const b of content) {
    if (b.takeaway.length !== 3) problems.push(`"${b.title}" has ${b.takeaway.length} takeaways`);
    b.takeaway.forEach((x) => { if (x.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${x.slice(0, 40)}"`); });
  }
  /* structure-06: no takeaway overclaims culture clash; none trains for a demerger question */
  if (content.some((b) => b.takeaway.some((x) => /primary reason|main reason|over half/i.test(x)))) problems.push('structure-06: a takeaway overclaims a single cause of takeover failure');
  if (!content[3].takeaway.some((x) => /culture clash is one reason/i.test(x) && /overpaying/i.test(x))) problems.push('structure-06: the chapter-4 takeaway does not put culture clash beside overpaying');
  /* structure-07: the genuine misconceptions are kept, the filler one is gone */
  if (!/always the safest/.test(SUBSECTIONS.find((s) => s.id.endsWith(':organic-growth-advantages-and-disadvantages')).misconception)) problems.push('structure-07: the "organic growth is always safest" misconception was lost');
  /* structure-05: the economic logic of growth (economies, diseconomies) is taught in Learn Mode, not only in extras */
  for (const slug of ['internal-economies-of-scale', 'diseconomies-of-scale', 'overtrading']) {
    if (!SUBSECTIONS.some((s) => s.id.endsWith(`:${slug}`))) problems.push(`structure-05: no Learn Mode step "${slug}"`);
  }
  /* structure-07 / the worked judgement models the evaluation a 20-mark question asks for */
  const workedSub = SUBSECTIONS.find((s) => s.id.endsWith(':organic-or-inorganic-worked-judgement'));
  if (!workedSub || !workedSub.body.some((b) => /\*\*The judgement\.\*\*/.test(b.text || '') && /depends most on/.test(b.text || ''))) problems.push('structure-05: no body paragraph models a judgement with its condition');
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+|specifically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give|value|test)/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (EXAMINER_CLAIM.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  /* structure-08: one notes topic per chapter, titled as the chapter */
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  if (NOTES.some((n) => 'misconception' in n)) problems.push('a notes topic carries a misconception');
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) {
    if (!e.title || typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} lacks a title or content`);
    /* ExtrasTab prints `content` as plain text (packet 51 Verify B, step 29) */
    if (/\*\*|__|<\w/.test(e.content)) problems.push(`extras evaluation ${i + 1} carries Markdown or HTML, which ExtrasTab prints literally`);
  }
  {
    const tab = readFileSync('components/ExtrasTab.jsx', 'utf8');
    if (!/point\.content|\.content\}/.test(tab)) problems.push('ExtrasTab.jsx no longer prints evaluation content the way the plain-text check assumes');
  }
  for (const m of MISTAKES) for (const k of ['title', 'mistake', 'correction', 'examTip']) if (!String(m[k] ?? '').trim()) problems.push(`mistake "${m.title}" has no \`${k}\``);
  {
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    if (!/import \{[^}]*\breadMistake\b[^}]*\} from '@\/lib\/mistakes-shape'/.test(tab) || !tab.includes('readMistake(')) problems.push('MistakesTab.jsx no longer reads cards through lib/mistakes-shape.js; the mistake fields must follow the component');
    for (const k of ['item.title', 'item.wrong', 'item.right', 'item.examTip']) if (!tab.includes(k)) problems.push(`MistakesTab.jsx no longer renders ${k}; the mistake fields must follow the component`);
    for (const m of MISTAKES) { const gaps = mistakeGaps(m); if (gaps.length) problems.push(`mistake "${m.title}": lib/mistakes-shape.js reads no ${gaps.join(', ')}`); }
  }
  /* structure-03: the "draw a supply chain diagram in your head" tip is replaced by a drawn diagram */
  if (readable.some((s) => /in your head/i.test(s))) problems.push('structure-03: the "draw a supply chain diagram in your head" tip survived');
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['SGD', /\bS\$/], ['INR', /₹/], ['JPY', /¥/], ['AED', /\bAED\s?\d/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-S\$|S\$-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b|\bpound\b|\bEngland\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b/g, 'a UK-only institution (locale.institution)');
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
  /* the polyline is a line too: every segment of the cost curve is checked against every label */
  const polySegments = (svg) => [...svg.matchAll(/<polyline points="([^"]+)"/g)].flatMap((m) => {
    const pts = m[1].trim().split(/\s+/).map((p) => p.split(',').map(Number));
    return pts.slice(1).map((pt, i) => ({ x1: pts[i][0], y1: pts[i][1], x2: pt[0], y2: pt[1] }));
  });
  for (const d of ALL_DIAGRAMS) {
    for (const scenario of d.scenarios || []) {
      const where = `${d.title} / ${scenario.label}`;
      const boxes = boxesOf(scenario.svg);
      for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i], b = boxes[j];
        if (collides(a, b)) problems.push(`${where}: "${a.body.slice(0, 26)}" (y=${a.y}) and "${b.body.slice(0, 26)}" (y=${b.y}) overlap`);
      }
      for (const ln of [...linesOf(scenario.svg), ...polySegments(scenario.svg)]) for (const bx of boxes) {
        if (crossed(ln, bx)) problems.push(`${where}: a line (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) is drawn through "${bx.body.slice(0, 26)}"`);
      }
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('Backward vertical', 170, 100, 12), mk('Horizontal', 205, 110, 12, 'middle'))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Backward vertical', 170, 100, 12), mk('Horizontal', 205, 120, 12, 'middle'))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALL)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Horizontal', 188, 120, 12))) problems.push('the line check does not see a vertical arrow drawn through a label');
    const seg = polySegments('<polyline points="60,60 200,100 360,60"');
    if (seg.length !== 2 || !crossed(seg[0], mk('Economies of scale', 100, 76, 12))) problems.push('the polyline check does not see a curve drawn through a label');
  }
  /* the figures and names the teaching states are countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' ') + ALL_DIAGRAMS[i].checklist.join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, ['Purchasing', 'Technical', 'Managerial', 'Financial', 'Marketing', 'External'], 'economies');
  want(2, ['backward vertical', 'forward vertical', 'Horizontal', 'conglomerate', F.rival, 'Flour mill', 'Consumers'], 'chain (topFix-03)');
  want(4, ['Economies of scale', 'Diseconomies of scale', 'Cost per unit'], 'cost curve');
  /* the cost curve, re-read from the emitted polyline: its lowest point is where the dashed marker stands */
  {
    const s = svgOf(ALL_DIAGRAMS[4])[0];
    const pts = s.match(/<polyline points="([^"]+)"/)[1].trim().split(/\s+/).map((p) => p.split(',').map(Number));
    const lowest = pts.reduce((a, b) => (b[1] > a[1] ? b : a));
    const dashTag = s.match(/<line\b[^>]*stroke-dasharray[^>]*\/>/);
    const dash = dashTag ? linesOf(dashTag[0])[0] : null;
    if (!near(lowest[0], toX(COST_CURVE.qMin), 0.11)) problems.push(`the cost curve's lowest point is at x=${lowest[0]}, not at the function's minimum x=${toX(COST_CURVE.qMin)}`);
    if (!dash || !near(dash.x1, lowest[0], 0.11)) problems.push('the dashed "lowest cost" marker does not stand at the curve\'s lowest point');
    if (!(pts[0][1] < lowest[1] && pts[pts.length - 1][1] < lowest[1])) problems.push('the cost curve is not U-shaped: an end is not above its lowest point');
  }
  /* THE CHECK-IN KEY: no item pinned to a block has its key printed on that block's diagram */
  const surfaces = (d) => [d.title, d.description, ...d.checklist, ...d.scenarios.map((s) => s.label), ...d.scenarios.flatMap((s) => textsOf(s.svg).map((x) => x.body))].join(' | ').toLowerCase();
  const figs = (s) => [...String(s).matchAll(/(?:S\$)?\d[\d,]*(?:\.\d+)?%?m?/g)].map((m) => m[0]).filter((x) => /S\$|%/.test(x) || Number(x.replace(/[,m]/g, '')) >= 13);
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const qi of b.quizIndices) {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      if (surf.includes(key.toLowerCase())) problems.push(`"${b.title}": the key "${key}" of a pinned item is printed on the chapter's diagram`);
      for (const f of figs(key)) if (!q.question.includes(f) && surf.includes(f.toLowerCase())) problems.push(`"${b.title}": the key figure ${f} of a pinned item is printed on the chapter's diagram`);
      /* an integration-type key pinned to the chapter that draws the integration types leaks */
      for (const k of ['backward', 'forward', 'horizontal', 'conglomerate']) if (key.toLowerCase().startsWith(k) && surf.includes(k)) problems.push(`"${b.title}": a pinned key names ${k} integration, which the chapter's diagram draws`);
      /* an economy-type key pinned to the chapter that draws the economies leaks */
      for (const k of [...['purchasing', 'technical', 'managerial', 'financial', 'marketing'], 'external']) if (new RegExp(`\\b(a|an) ${k} economy`).test(key.toLowerCase()) && surf.includes(k)) problems.push(`"${b.title}": a pinned key names the ${k} economy, which the chapter's diagram draws`);
    }
  });
  {
    const all = content.flatMap((b) => b.practiceIndices);
    if (new Set(all).size !== all.length) problems.push('practice pins overlap between blocks, so "the first pin is the one shown" no longer holds');
  }
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const pi of b.practiceIndices.slice(0, 1)) {
      const pr = PRACTICE[pi];
      const reached = [...new Set(figs(pr.guidance))];
      for (const f of reached) {
        if (pr.question.includes(f)) continue;
        const hit = new RegExp(`(^|[^\\d.,])${f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase()}(?![\\d,])`).test(surf);
        if (hit) problems.push(`"${b.title}": pinned practice ${pi} (${pr.command} ${pr.marks}) reaches ${f}, which the chapter's diagram prints`);
      }
    }
  });
  {
    /* A/B the key checks: a key that IS on a diagram must be caught */
    const surf = surfaces(DIAGRAMS[2]);
    if (!surf.includes('backward vertical')) problems.push('the check-in key check cannot see an integration type printed on the chain diagram');
    if (!figs('the premium is S$16m').includes('S$16m')) problems.push('the key-figure reader cannot read a dollar figure');
    if (figs('the loaf costs S$0.62').indexOf('S$0.62') < 0) problems.push('the key-figure reader cannot read a cents figure');
  }
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])].join(' ').toLowerCase(); };
  const need = (slug, words, idTag) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${idTag}: ${slug} never says "${w}"`); };
  need('internal-economies-of-scale', ['objectives of growth', 'cost per unit', 'purchasing', 'technical', 'managerial', 'financial', 'marketing'], 'specGap-01/quiz-01');
  need('external-economies-of-scale', ['external economies of scale', 'skilled labour', 'specialist suppliers', 'infrastructure'], 'specGap-01/quiz-01');
  need('market-power-share-and-profitability', ['increased market power over customers and suppliers', 'increased market share and brand recognition', 'increased profitability'], 'specGap-01');
  need('methods-of-organic-growth', ['methods of growing organically', 'new products', 'new markets', 'selling online', 'franchising', 'licensing'], 'specGap-04');
  need('mergers-and-takeovers', ['reasons for mergers and takeovers', 'distinction between mergers and takeovers', 'market power', 'cost savings', 'spreading risk', 'hostile'], 'specGap-03');
  need('horizontal-and-vertical-integration', ['horizontal integration', 'vertical integration', 'backward', 'forward', 'same stage', 'different stages'], 'topFix-03/topFix-04');
  need('conglomerates', ['conglomerate', 'spread risk', 'unrelated'], 'specGap-03');
  need('financial-risks-and-rewards', ['financial rewards', 'financial risks', 'premium', 'borrowing', 'interest', 'dilutes', 'gearing'], 'specGap-03/topFix-05');
  need('inorganic-growth-advantages-and-disadvantages', ['advantages of inorganic growth', 'disadvantages of inorganic growth', 'integration', 'cultures clash', 'competition authority'], 'specGap-03');
  need('diseconomies-of-scale', ['diseconomies of scale', 'coordination', 'communication', 'motivation', 'cost per unit'], 'specGap-02/quiz-02');
  need('internal-communication', ['internal communication', 'layers', 'hierarchy'], 'specGap-02');
  need('overtrading', ['overtrading', 'working capital', 'profit is not cash', 'credit'], 'specGap-02/quiz-03/quiz-04');
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
if (ctx.number !== '3.3.2' || ctx.unitCode !== 'WBS13') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 3.3.2 / WBS13`);
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

console.log(`\n${SECTION} — packet 49`);
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
  SCOPE      3.3.2 only. Demergers, reasons for staying small, barriers to entry, Ansoff and the UK frame
             (CMA, MegaRetail) banned, each A/B'd both ways and each ban re-measured against bus_spec.txt;
             2.3.5 (small business) and 2.3.1 (franchising) are single pointers carrying their numbers;
             synergy is an aside — once, teaching text only, never assessed
  NUMBERING  the oracle re-read (18 rows / 16 leaves), every leaf mapped and its own words found in its
             subsections, three headings asserted by line, "3.2.<n>"/"3.1.3" asserted ABSENT, and the
             database's own 3.3.2 / WBS13 asserted
  ARITHMETIC Plan A, the loaf cost fall, the premium, the interest, the yearly gain, the cash gap, the cost
             curve's minimum, and every recall and quiz figure recomputed independently
  PINS       derived from each item's block tag; five blocks of three subsections, each with its own
             diagram, quiz and practice; no diagramRef; 8 free quiz items against 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that no subsection teaches
  PRACTICE   Appendix 6 parsed including Assess 12; the set is Units 3-4 Section A (4/4/8/12/12) plus two
             Evaluate essays on one source that carries every figure; the Calculate figures printed nowhere
             else; stems name the firm; openings clean; levels naming K/App/An/Ev above 6
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, the integration fill-in and the takeover reorder (sourced
             from an extras chain), and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit, collisions and polyline
             crossings checked on the emitted SVG with the guards A/B'd, names counted back out of the SVG,
             the cost curve's minimum re-read from its points, and no chapter's pinned key printed on its
             own diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-49-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-49-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
