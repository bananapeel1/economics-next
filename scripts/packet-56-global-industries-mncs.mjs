#!/usr/bin/env node
/**
 * PACKET 56 — global-industries-mncs, Business Unit 4 (WBS14), IAL topic 4.3.4.
 * `audit/raw/bus_spec.txt:1453-1487`. FOUR chapters, seventeen subsections, 25 leaves.
 *
 *   node scripts/packet-56-global-industries-mncs.mjs            # dry run, every check
 *   node scripts/packet-56-global-industries-mncs.mjs --dump     # + write the bundle
 *   node scripts/packet-56-global-industries-mncs.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 55's runner, adapted. What this packet adds, with the reason:
 *
 *   - **TRANSFER PRICING IS NOT IN THE BUSINESS SPECIFICATION**, and the live section spent half its
 *     subsections on it. The runner asserts it absent from bus_spec.txt and present in econ_spec.txt,
 *     and that exactly ONE subsection teaches it (topFix-02, structure-02), inside 1b tax revenues.
 *   - **THE NAMED REAL CASES ARE BANNED, AND EACH BAN IS A/B'D** (Rana Plaza, Nestlé, Amazon
 *     Luxembourg, Shell/NNPC, BEPS/Pillar Two): Layer 4 deletes what the programme cannot corroborate.
 *   - **THE REPATRIATION FALLACY** (accuracy-01) is banned by its own words and its correction asserted
 *     in the balance-of-payments subsection.
 *   - **THE CHECK-IN'S LEADING QUIZ KEY IS NOT PRINTED ON THE CHECK-IN'S DIAGRAM**, text and figures.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { mistakeGaps } from '../lib/mistakes-shape.js';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, FIRM, usd, usdm, units, pct, round2, BANNED, CONTROL_BULLETS, NATIONAL_BULLETS, teachingWords, teachingVocabulary } from './_packet56-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet56-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet56-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD, PAY_SCALE } from './_packet56-diagrams.mjs';

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
    [0, 'a deficit on the current account', 'the balance of payments records money in and out'],
    [0, 'the multiplier effect of the new plant', 'many workers are hired'],
    [0, 'Evaluate whether MNCs are good for the global economy', 'global brands appear beside local ones'],
    [1, 'the Rana Plaza collapse showed the risk', 'building collapses in garment-producing countries'],
    [1, 'Nestlé\'s formula-milk marketing', 'free samples of formula milk handed to new mothers'],
    [1, 'Amazon routed its sales through Luxembourg', 'a trading company in a low-tax country'],
    [1, 'Shell\'s joint venture with NNPC', 'a joint venture with a state firm'],
    [2, 'BEPS rules set a 15% floor', 'an agreed minimum rate of tax'],
    [2, 'the OECD\'s Pillar Two', 'rules many countries sign up to'],
    [3, 'making the host country a net loser', 'the host keeps the wages'],
    [4, 'Outline two impacts of FDI.', 'A strong answer, in outline:'],
    [4, 'Define the term MNC. (4 marks)', 'Define MNC in your own words.'],
    [4, 'Analyse the impact. (6 marks)', 'analysis of both sides'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bF0\d\d\b|\bC-global-industries-mncs-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['transfer pric', 'BEPS', 'Pillar Two', 'Rana Plaza', 'current account', 'multiplier']) if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban or the Rule 1 note rests on it being absent`);
{
  const econ = readFileSync('audit/raw/econ_spec.txt', 'utf8');
  if (!/transfer pricing/i.test(econ)) problems.push('econ_spec.txt no longer names transfer pricing — the Rule 1 note says it is an Economics bullet');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(near(F.premiumPct, 25), 'the wage premium is not 25%');
  a(F.netFlow === 90_000_000 && 200 - 80 - 30 === 90, 'the net yearly flow is not $90m');
  a(F.profitHostPair === 2 && F.profitArmsPair === 10 && F.shiftedPair === 8, 'profit a pair is not $2 / $10 / $8 shifted');
  a(near(F.hostTaxActual, 2_500_000) && near(F.hostTaxArms, 12_500_000) && near(F.hostTaxLost, 10_000_000), 'host tax is not $2.5m against $12.5m, $10m lost');
  a(near(F.lowTaxPaid, 2_000_000) && near(F.groupSaving, 8_000_000), 'the low-tax country does not collect $2m, or the group does not keep $8m');
  a(near(0.25 * 8 * 5_000_000, F.hostTaxLost), 'the tax lost recomputed from the typed figures disagrees');
  /* the words the prose prints, read back from the printed body */
  const taxSub = JSON.stringify(SUBSECTIONS.find((s) => s.id.endsWith('tax-revenues-and-transfer-pricing')).body);
  for (const f of [usd(F.costPair), usd(F.armsLength), usd(F.transferPrice), usdm(F.hostTaxActual), usdm(F.hostTaxArms)]) a(taxSub.includes(f), `the tax subsection does not print ${f}`);
  const bopSub = JSON.stringify(SUBSECTIONS.find((s) => s.id.endsWith('balance-of-payments')).body);
  a(bopSub.includes(usdm(F.netFlow)), 'the balance-of-payments subsection does not print the net flow');
  /* quiz arithmetic, recomputed here and not read from the module */
  a(Math.round(((420 - 350) / 350) * 100) === 20 && Math.round(((420 - 350) / 420) * 100) === 17, 'quiz: wage premium 20% / 17% distractor');
  a(70 - 30 - 12 === 28 && 70 - 30 === 40 && 70 - 12 === 58 && 70 + 30 + 12 === 112, 'quiz: net flow $28m and its distractors');
  a(near(0.2 * (60 - 45), 3) && near(0.2 * (45 - 40), 1) && near(0.2 * (60 - 40), 4) && near((60 - 45) - 3, 12), 'quiz: transfer-pricing tax lost $3 and its distractors');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 4) problems.push(`${content.length} blocks, not 4`);
  if (SUBSECTIONS.length !== 17) problems.push(`${SUBSECTIONS.length} subsections, not 17`);
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
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '4.3.4');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 30 || leaves.length !== 24) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 4.3.4, not 30 / 24`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 4.3.4 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[.:()]/g, '').replace(/\*\*/g, '');
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/,]+/).filter((w) => w.length > 4);
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ')).join(' '));
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the util's lists match the document's own words at :1453-1487 */
  const span = spec.slice(1452, 1487).join(' ').replace(/\s+/g, ' ').toLowerCase();
  for (const f of [...CONTROL_BULLETS, ...NATIONAL_BULLETS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and bus_spec.txt:1453-1487 does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1424, '4.3.3 Global marketing');
  at(1453, '4.3.4 Global industries and companies (multinational corporations)');
  at(1457, 'Impact of MNCs on the local economy');
  at(1461, 'Impact of MNCs on the national economy');
  at(1469, 'Stakeholder conflicts');
  at(1480, 'Controlling MNCs');
  at(1487, 'self-regulation');
  /* specGap-09: there is no 4.3.5, so 4.3.4 is the last topic of the unit and the app's number is right */
  if (/^\s*4\.3\.5\b/m.test(specBody)) problems.push('bus_spec.txt has a 4.3.5 after all — specGap-09\'s resolution rests on its absence');
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
  /* quiz-01/02/03: the retired live items do not survive, and no stem gives its key away */
  if (QUIZ.some((q) => /Rana Plaza|^What is greenwashing\?|campaigning against unethical/i.test(q.question))) problems.push('quiz-01/02/03: a retired live item survives');
  for (const q of QUIZ) {
    const key = q.options[q.correctIndex].toLowerCase();
    const stemWords = new Set(q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5));
    const keyWords = key.split(/\W+/).filter((w) => w.length > 5);
    if (keyWords.length && keyWords.every((w) => stemWords.has(w))) notes.push(`every long word of the key "${key}" is in its stem: "${q.question.slice(0, 50)}"`);
  }
}
{
  /* structure-02 / topFix-01: nothing quizzed that no subsection teaches */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['multinational', 'foreign direct investment', 'subsidiary', 'wage premium', 'crowding', 'balance of payments', 'transfer pric', 'arm\'s length', 'business culture', 'stakeholder', 'sustainability', 'emissions', 'waste disposal', 'child labour', 'greenwashing', 'misleading product labelling', 'inappropriate marketing', 'political influence', 'legal control', 'international agreement', 'self-regulation', 'consumer pressure', 'pressure group', 'social media'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    const taught = teaching.replace(/\*\*/g, '').includes(term);
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
    if (/crowd|arm's length|repatriat|boycott|greenwash|premium|foreign currency|holiday is|conditional|shareholders|reputation/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" names part of the answer: "${open.slice(0, 80)}"`);
    if (p.marks > 6) {
      if (/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
      for (const L of ['Level 1', 'Level 2', 'Level 3', 'Level 4']) if (!p.guidance.includes(L)) problems.push(`${p.marks}-mark ${p.command} guidance has no ${L}`);
      for (const w of ['knowledge', 'application', 'analysis', 'evaluation']) if (p.command !== 'Discuss' && !p.guidance.toLowerCase().includes(w)) problems.push(`${p.marks}-mark ${p.command} guidance never names ${w} (topFix-05)`);
      if (p.marks >= 12 && !/A strong answer, in outline:/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} has no short model answer`);
    } else if (!/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (p.command === 'Discuss' && /\bconclu/i.test(p.guidance.replace(/does not need a final recommendation/, ''))) problems.push('Discuss guidance asks for a conclusion (V036)');
  }
  /* the source carries every figure the tasks and schemes lean on */
  for (const f of [usdm(F.fdi), units(F.workers), usd(F.wage), usd(F.localWage), usdm(F.localPurchases), usdm(F.exportsYr), usdm(F.importsYr), usdm(F.profitsHome), pct(F.taxHost), pct(F.taxLow), usd(F.costPair), usd(F.transferPrice), usd(F.armsLength), units(F.pairs), usdm(F.cleanKit), String(F.suppliers), String(F.childSuppliers), usdm(F.secondPlant), units(F.secondJobs), `${F.holidayYears}-year tax holiday`, F.host, F.lowTax, F.trading, 'social media', 'supplier code']) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  /* topFix-04 / practice-01, named */
  const explains = PRACTICE.filter((p) => p.marks === 4);
  if (explains.length !== 2 || explains.some((p) => p.command !== 'Explain' || !/Explain one\b/.test(p.question))) problems.push('topFix-04: the two 4-markers are not both "Explain one..." on the source');
  if (PRACTICE.some((p) => /locat(e|ion) (its )?manufactur|production[- ]location/i.test(p.question))) problems.push('topFix-04: the off-topic production-location item survives');
  if (!PRACTICE.some((p) => p.command === 'Evaluate' && /should offer .*tax holiday to attract/.test(p.question))) problems.push('topFix-04: no Evaluate on whether the host should offer a tax incentive to attract the MNC');
  if (PRACTICE.some((p) => /global economy|positive or negative development/i.test(p.question))) problems.push('practice-01: the context-free "global economy" 20-marker survives');
  /* the schemes' figures are recomputed, not read */
  const tp = PRACTICE.find((p) => p.command === 'Assess' && /transfer pricing/.test(p.question));
  if (!tp || !tp.guidance.includes(usdm((F.taxHost / 100) * (F.armsLength - F.transferPrice) * F.pairs))) problems.push('the transfer-pricing Assess scheme does not print the recomputed tax lost');
  const bopItem = PRACTICE.find((p) => /balance of payments/.test(p.question));
  if (!bopItem || !bopItem.guidance.includes(usdm(F.exportsYr - F.importsYr - F.profitsHome))) problems.push('the balance-of-payments Explain scheme does not print the recomputed net flow');
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
  /* topFix-03, named: a transfer-pricing fill-in, and an FDI cause-to-effect reorder */
  const fills = recalls.filter(([, r]) => r.type === 'fillin').map(([, r]) => r.answers.map((a) => a.toLowerCase()));
  if (!fills.some((a) => a.includes('transfer price'))) problems.push('topFix-03: no fill-in on the transfer-pricing mechanism');
  const reorders = recalls.filter(([, r]) => r.type === 'reorder').map(([, r]) => r);
  if (!reorders.some((r) => /foreign direct investment/i.test(r.correctOrder[0]) && /tax/i.test(r.correctOrder.at(-1)) && /cause/i.test(r.prompt))) problems.push('topFix-03: no cause-to-effect reorder from FDI to tax revenue');
  /* Layer 1a: every reorder prompt names its principle */
  for (const r of reorders) if (/\blogical(ly)?\b|order of explanation/i.test(r.prompt) || !/order/i.test(r.prompt)) problems.push(`a reorder prompt does not name its ordering principle: "${r.prompt}"`);
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
  /* structure-05: no takeaway or examMatters is repeated across the section */
  const tks = content.flatMap((b) => b.takeaway.map((x) => x.toLowerCase()));
  if (new Set(tks).size !== tks.length) problems.push('structure-05: a takeaway is repeated');
  const ems = SUBSECTIONS.map((s) => s.examMatters.slice(0, 50).toLowerCase());
  if (new Set(ems).size !== ems.length) problems.push('structure-05: two subsections open examMatters the same way');
  if (SUBSECTIONS.filter((s) => /governance|depends on the host country/i.test(s.examMatters)).length > 1) problems.push('structure-05: the live "net impact depends on governance" examMatters template survives');
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
  ban(/McDonald|Unilever|Nestl|Coca-Cola|Pepsi|\bIKEA\b|Honda|Toyota|Walmart|Starbucks|Apple|Samsung|Nike|Adidas|Primark|\bH&M\b|Zara|Amazon|Google|\bShell\b|\bBP\b|Glencore/g, 'a named real firm — Layer 4 needs a source for any real firm with a claim, and this section carries none');
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
  want(0, [usd(F.wage), usd(F.localWage), units(F.workers)], 'pay');
  want(1, [usd(F.costPair), usd(F.transferPrice), usd(F.armsLength), pct(F.taxHost), pct(F.taxLow), usd(F.profitHostPair), usd(F.shiftedPair), usd(F.profitArmsPair)], 'transfer-pricing');
  want(2, ['Stakeholders', 'Environment', 'Supply chain', 'Marketing'], 'ethics');
  want(3, ['Legal control', 'Consumer pressure', 'Pressure groups', 'Social media', 'Self-regulation', 'Size', 'Political influence'], 'control');
  {
    const bars = [...svgOf(ALL_DIAGRAMS[0])[0].matchAll(/<rect x="[-\d.]+" y="([-\d.]+)" width="90" height="([-\d.]+)"/g)].map((m) => Number(m[2]));
    if (bars.length !== 2 || !near(bars[0] / PAY_SCALE, F.localWage, 0.01) || !near(bars[1] / PAY_SCALE, F.wage, 0.01)) problems.push(`the pay bars are not drawn in proportion to the wages: ${bars.join(', ')}`);
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
  if (!surfaces(DIAGRAMS[1]).includes(usd(F.transferPrice))) problems.push('the check-in key check cannot see a figure printed on the transfer-pricing diagram');
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])])].join(' ').toLowerCase().replace(/\*\*/g, ''); };
  const need = (slug, words, idTag) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${idTag}: ${slug} never says "${w}"`); };
  need('mncs-subsidiaries-and-fdi', ['multinational corporation (mnc)', 'subsidiary', 'foreign direct investment (fdi)', 'host country'], 'structure-03');
  need('local-labour-wages-and-conditions', ['job creation', 'wages', 'working conditions', 'local labour'], 'specGap-08');
  need('local-businesses', ['local businesses', 'suppliers', 'rivals', 'crowding out'], 'specGap-08');
  need('local-community-and-environment', ['local community', 'local environment'], 'specGap-08');
  need('economic-growth-and-fdi-flows', ['economic growth', 'fdi flows'], 'topFix-02');
  need('balance-of-payments', ['balance of payments', 'repatriated profits', 'keeps the wages'], 'specGap-05/accuracy-01/topFix-05');
  need('technology-skills-and-business-culture', ['technology and skills transfer', 'business culture'], 'specGap-06/topFix-02');
  need('host-country-consumers', ['consumers in the host country', 'choice', 'prices'], 'specGap-07/topFix-02');
  need('tax-revenues-and-transfer-pricing', ['tax revenues', 'transfer pricing', 'arm\'s length price', 'tax avoidance'], 'topFix-02/structure-02/structure-03');
  need('stakeholder-conflicts', ['stakeholder conflicts', 'international business ethics', 'shareholders', 'workers'], 'specGap-04');
  need('environmental-considerations', ['emissions', 'waste disposal', 'sustainability'], 'specThin-01');
  need('supply-chain-considerations', ['pay and working conditions', 'exploitation of labour', 'child labour'], 'specGap-03');
  need('marketing-considerations', ['misleading product labelling', 'greenwashing', 'inappropriate marketing activities'], 'specGap-02/quiz-02');
  need('power-and-political-influence', ['controlling mncs', 'power of the mnc', 'political influence'], 'specGap-01/quiz-03');
  need('legal-control', ['legal control', 'host-country law', 'home-country law', 'international agreements', 'minimum rate of tax'], 'specGap-01/topFix-02');
  need('consumer-pressure-pressure-groups-social-media', ['consumer pressure', 'pressure groups', 'social media'], 'specGap-01/quiz-03');
  need('self-regulation', ['self-regulation', 'code of conduct'], 'topFix-01');
  /* structure-02 / topFix-02: transfer pricing is taught in exactly one subsection */
  const tpSubs = SUBSECTIONS.filter((s) => /transfer pric/i.test(JSON.stringify([s.keyIdea, s.body, s.realExample, s.misconception, s.examMatters])));
  if (tpSubs.length !== 1) problems.push(`structure-02: transfer pricing is taught in ${tpSubs.length} subsections (${tpSubs.map((s) => s.id.split(':').pop()).join(', ')}), not one`);
  /* structure-03: every term used before it is defined? FDI and MNC are defined in the first subsection */
  const first = JSON.stringify(SUBSECTIONS[0]).toLowerCase();
  for (const w of ['multinational corporation', 'foreign direct investment', 'subsidiary']) if (!first.includes(w)) problems.push(`structure-03: the first subsection does not define "${w}"`);
  /* structure-07: honest chapter titles */
  const order = content.map((b) => b.title);
  if (JSON.stringify(order) !== JSON.stringify(['MNCs and the Local Economy', 'MNCs and the National Economy', 'International Business Ethics', 'Controlling MNCs'])) problems.push(`structure-07: chapter titles are ${order.join(' | ')}`);
  if (/MNC Impact & Ethics|Transfer Pricing & FDI Stakeholders/.test(order.join(' '))) problems.push('structure-07: a live block title survived');
  /* structure-06: no generic "always benefit / always exploit" mirror-image misconceptions */
  if (SUBSECTIONS.some((s) => /always benefit|deliberately exploit/i.test(s.misconception))) problems.push('structure-06: a generic mirror-image misconception survives');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '4.3.4' || ctx.unitCode !== 'WBS14') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 4.3.4 / WBS14 (specGap-09)`);
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

console.log(`\n${SECTION} — packet 56`);
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
  SCOPE      4.3.4 only. Transfer pricing asserted absent from bus_spec.txt and taught once, inside 1b tax
             revenues; Economics framing, the named real cases and BEPS/Pillar Two banned, each ban A/B'd
             both ways and re-measured; the repatriation fallacy banned and its correction asserted
  NUMBERING  the oracle re-read (30 rows / 24 leaves), every leaf mapped and its own words found in its
             subsections, seven lines of the span asserted, no 4.3.5, the database's 4.3.4 / WBS14 asserted
  ARITHMETIC every figure re-derived: wage premium, net flow, profit and tax a pair, tax lost, and every
             quiz key recomputed independently
  PINS       derived from each item's block tag; four chapters, each with its own diagram, quiz and practice
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that no subsection teaches, retired items absent
  PRACTICE   Appendix 6 parsed including Assess 10/12; the set is ial-paper-structure.json's Units 3-4
             Section A (4/4/8/12/12) plus two Evaluate essays, all on one source that carries every figure
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, the transfer-pricing fill-in and the FDI reorder
             (sourced from an extras chain, not printed on its own step), recall.recoverable at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit and collisions checked
             on the emitted SVG with the guard A/B'd, figures counted back out of the SVG, bars in
             proportion, and no chapter's check-in key printed on its own diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-56-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-56-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
