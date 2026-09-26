#!/usr/bin/env node
/**
 * PACKET 47 — global-markets-expansion, Business Unit 4 (WBS14), IAL topic 4.3.2.
 * `audit/raw/bus_spec.txt:1372-1410`. FIVE blocks, seventeen subsections, 33 leaves.
 *
 *   node scripts/packet-47-global-markets-expansion.mjs            # dry run, every check
 *   node scripts/packet-47-global-markets-expansion.mjs --dump     # + write the bundle
 *   node scripts/packet-47-global-markets-expansion.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 44's runner, adapted. What this packet adds, with the reason:
 *
 *   - **THE SECTION IS ITS SPECIFICATION NUMBER, AND THE LEDGER'S NUMBERS ARE REFUSED ON THE
 *     DOCUMENT.** 21 of 33 ids cite "4.2.1"-"4.2.5". The runner asserts the 4.3.x headings by line,
 *     asserts no "4.2.1"-"4.2.5" exists in bus_spec.txt, and asserts `contextFor` says 4.3.2 / WBS14
 *     (which is what refuses `structure-06`).
 *   - **THE OFF-SPECIFICATION FRAMEWORKS ARE BANNED, AND THE BAN RESTS ON A MEASUREMENT.** Bartlett,
 *     Ghoshal, transnational, licensing are asserted ABSENT from bus_spec.txt, franchising asserted
 *     to occur only at 2.3.1, and the Unit 3 tools to sit at 3.3.1 — so a ban cannot outlive the fact
 *     it rests on. Ansoff, PESTLE and FDI are pointer-only with a budget of one each.
 *   - **THE PAPER SHAPE IS READ OFF THE FILE THE FOUNDER'S RULING NAMES.** `ial-paper-structure.json`
 *     business.units_3_4 section A tariffs are compared with the practice set's Section A, and the
 *     Appendix 6 table is PARSED out of bus_spec.txt:2218-2250, including Assess's split 10/12.
 *   - **EVERY PRACTICE ITEM IS ON ONE SOURCE, AND THE SOURCE CARRIES EVERY FIGURE IT IS ASKED FOR.**
 *   - **THE CHECK-IN KEY IS NOT PRINTED ON THE CHECK-IN'S DIAGRAM** (packet 44's shipped defect):
 *     each block's FIRST quiz key — the one `resolvePinnedItem` serves — is looked for on every
 *     surface of that block's diagram, text and figures.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, FIRM, usd, usdm, pct, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
  MARKET_FACTORS, LOCATION_FACTORS, MERGER_REASONS,
} from './_packet47-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet47-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet47-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD } from './_packet47-diagrams.mjs';

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
  for (const bad of ['a cost of $undefinedm', 'the return is NaN%', 'the firm [object Object] exports', 'a price of ' + '${usd(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['the object of the exercise is cost', 'a cost of $17.40']) {
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
    [0, 'The Bartlett and Ghoshal framework classifies MNC strategies', 'a firm with a global brand'],
    [0, 'the firm needs a multi-domestic or transnational strategy', 'a national brand name'],
    [1, 'Licensing grants a foreign firm the right to use a patent', 'the firm acquires a patent'],
    [1, 'franchising suits firms with a replicable format', 'the firm finances the factory'],
    [2, 'Apply Porter\'s generic strategies', 'Applying Porter\'s five forces to a potential market'],
    [2, 'a strategy of cost leadership', 'cost competitiveness by off-shoring'],
    [3, 'Outline two reasons why a business might expand overseas.', 'A strong answer, in outline:'],
    [3, 'Analyse the advantages of a joint venture. (6 marks)', 'analysis of both sides'],
    [4, 'Market Entry Methods', 'a market where incomes are rising'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bF0\d\d\b|\bC-global-markets-expansion-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  const [ansoff] = POINTER_ONLY;
  if (!ansoff.mustCite.test('Ansoff\'s matrix is a Unit 3 tool (3.3.1).')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (ansoff.mustCite.test('Ansoff\'s matrix shows market development.')) problems.push('the pointer-cite check accepts an uncited mention');
}
/* topFix-02 asks for the pointers to EXIST, not only to be bounded */
for (const { re, why } of POINTER_ONLY.slice(0, 2)) if (!readable.some((s) => re.test(s))) problems.push(`topFix-02: no pointer at all for ${why.slice(0, 30)}`);
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['Bartlett', 'Ghoshal', 'transnational', 'multi-domestic', 'licens', 'generic strateg', 'cost leadership']) if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban rests on it being absent`);
{
  const fr = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /franchis/i.test(l));
  if (fr.length !== 1 || fr[0][0] < 800 || fr[0][0] > 900) problems.push(`franchising occurs at ${fr.map(([n]) => n).join(', ')} in bus_spec.txt, not once at 2.3.1 — re-read the ban`);
  if (!spec[1097]?.includes('Ansoff') || !spec[1098]?.includes('Porter') || !spec[1105]?.includes('PESTLE')) problems.push('Ansoff/Porter\'s Strategic Matrix/PESTLE are not at bus_spec.txt:1098/1099/1106 (3.3.1) — the pointer citations rest on it');
  if (!spec[1434]?.includes('Ansoff')) problems.push('bus_spec.txt:1435 does not name Ansoff under 4.3.3 — the pointer citation rests on it');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  a(F.avgHome === 38 && F.avgTotal === 34, `average cost ${F.avgHome} → ${F.avgTotal}, not 38 → 34`);
  a(F.fixed / F.homeSales === 12 && F.fixed / F.totalSales === 8, 'fixed cost per cooker is not $12 → $8 as the text says');
  a(F.profitHome === F.homeSales * (F.price - F.avgHome), 'profit at home is not sales × (price − average cost)');
  a(F.profitTotal === F.homeSales * F.price + F.exportSales * F.exportPrice - F.totalSales * F.avgTotal, 'profit with exports is not revenue − total cost at the new average');
  a(near(F.spreadFallPct, (F.homeSales * F.downturn / 100) / F.totalSales * 100), 'the risk-spreading fall is not the home loss over total sales');
  a(F.spreadFallPct < F.downturn, 'spreading does not shrink the fall');
  a(F.offshoreSaving === 5.5, 'the off-shoring saving is not $12 − $5 − $1.50');
  /* Fix round 1: the old check was near(ratio, 1/7, 0.02), which 5.50/34 = 16.2% passed (1/7 = 14.3%).
     Now the fraction word is read from the PRINTED body, not assumed, and must be the nearest unit fraction. */
  {
    const WORD = { half: 2, third: 3, quarter: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10 };
    const off = SUBSECTIONS.find((s) => s.id.endsWith('off-shoring-and-outsourcing'));
    const m = JSON.stringify(off?.body ?? []).match(/about a (\w+) of the \$([\d.]+) average cost/);
    const n = m && WORD[m[1]];
    a(m && Number(m[2]) === F.avgTotal, 'the off-shoring paragraph no longer states the saving as a fraction of the average cost');
    a(n && Math.round(F.avgTotal / F.offshoreSaving) === n && near(F.offshoreSaving / F.avgTotal, 1 / n, 0.01),
      `"about a ${m?.[1]}" of $${F.avgTotal}: the saving is ${(100 * F.offshoreSaving / F.avgTotal).toFixed(1)}%, nearest unit fraction 1/${Math.round(F.avgTotal / F.offshoreSaving)}`);
  }
  a(F.tarsia10 === Math.round(9000 * 1.01 ** 10) && F.belmar10 === Math.round(4000 * 1.07 ** 10), 'the ten-year incomes are not compounded');
  a(F.landedIn === 17 && F.landedOut === 17.4 && F.landedOut > F.landedIn, 'delivered costs are not $17 and $17.40, or the lower wage does not lose');
  a(F.siteOut.labour < F.siteIn.labour, 'the outside site does not have the lower wage');
  a(F.grant / F.outlay === 0.25, '"cuts the money it must find by a quarter" is not true');
  a(F.roi === 15 && F.roiGrant === 20, `return ${F.roi}% → ${F.roiGrant}%, not 15% → 20%`);
  a(F.appreciationPct === 25 && F.foreignPrice0 === 200 && F.foreignPrice1 === 250 && F.heldReceipt === 40, 'the export side of the appreciation is wrong');
  a(F.componentCost0 === 15 && F.componentCost1 === 12 && F.repatriated0 === 2e6 && F.repatriated1 === 1.6e6, 'the import or repatriation side is wrong');
  a(F.techWage1 === 2400, 'technician pay is not $2,000 × 1.2');
  /* recall and quiz arithmetic the content prints, recomputed here and not read from the module */
  a(round2((3 + 9) * 1.1 + 2) === 15.2 && 5 + 9 + 1 === 15, 'costs-and-labour recall: $15.20 / $15');
  a(90 / 3 === 30 && 90 / 4.5 === 20, 'importers recall: $30 / $20');
  a(10 + 2e6 / 1e5 === 30 && 10 + 2e6 / 2e5 === 20, 'quiz: average cost $30 → $20');
  a(near(0.6 * 10, 6), 'quiz: 60% × 10% = 6%');
  a(9 - 4 - 2 === 3, 'quiz: off-shoring saves $3');
  a(Math.round(5000 * 1.1 * 1.1) === 6050, 'quiz: $6,050');
  a((4 + 8) * 1.25 + 1 === 16, 'quiz: delivered $16');
  a(near(1.8 / 12, 0.15) && near(2.4 / 15, 0.16) && near(2.4 / 12, 0.2), 'quiz: returns 15%, 16% → 20%');
  a(40 * 2.5 === 100 && 120 / 3 === 40 && 120 / 4 === 30, 'quiz: 100 units; $40 → $30');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 17) problems.push(`${SUBSECTIONS.length} subsections, not 17`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    /* structure-04: no chapter of two, where every step is the last of its block */
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
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '4.3.2');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 37 || leaves.length !== 33) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 4.3.2, not 37 / 33`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 4.3.2 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[.:]/g, '');
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/]+/).filter((w) => w.length > 4 && !['making', 'maintaining', 'increasing', 'their'].includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ')).join(' '));
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  /* the util's lists match the document's own words at :1372-1410 */
  const span = spec.slice(1371, 1418).join(' ').replace(/\s+/g, ' ').toLowerCase().replace(/[’']/g, '\'');
  for (const f of [...MARKET_FACTORS, ...LOCATION_FACTORS]) if (!span.includes(f.toLowerCase())) problems.push(`the util lists "${f}" and bus_spec.txt:1372-1410 does not say it`);
  for (const r of MERGER_REASONS) if (!span.includes(r.toLowerCase())) problems.push(`the util lists merger reason "${r}" and the span does not say it`);
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1304, '4.2 Assessment information');
  at(1323, '4.3.1 Globalisation');
  at(1372, '4.3.2 Global markets and business expansion');
  at(1424, '4.3.3 Global marketing');
  at(1453, '4.3.4 Global industries and companies');
  /* the numbers 21 ledger ids cite must exist nowhere in the document */
  for (const n of ['4.2.1', '4.2.2', '4.2.3', '4.2.4', '4.2.5']) if (specBody.includes(n)) problems.push(`"${n}" occurs in bus_spec.txt after all — ledger items cite it and this packet refuses it on the ground that it does not`);
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
  const SEQUENCE_NOUN = /\b(first|second|third|fourth|last|final)\s+(round|step|steps|stage|stages|chapter|year|years|period|line|term|market)\b/gi;
  const offends = (s) => { const rest = String(s).replace(SEQUENCE_NOUN, ' '); return ORDINAL.test(rest) ? rest.match(ORDINAL)[0] : null; };
  for (const q of QUIZ) { const hit = offends(q.explanation); if (hit) problems.push(`an explanation names a position ("${hit}"): "${q.question.slice(0, 44)}"`); }
  for (const s of ['The first option is right.', 'The former is a merger and the latter a takeover.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['After the first year the growth compounds.', 'In a second market the risk is spread.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* structure-01 / quiz-01 / quiz-02 / topFix-03: nothing quizzed that no subsection teaches */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])]).join(' ').toLowerCase();
  const KEY_TERMS = ['push factor', 'pull factor', 'saturated', 'off-shor', 'outsourc', 'life cycle', 'average cost', 'disposable income', 'ease of doing business', 'five forces', 'buyer power', 'trade bloc', 'tariff', 'return on investment', 'grant', 'natural resources', 'joint venture', 'takeover', 'merger', 'distribution network', 'legal requirement', 'appreciat', 'non-price', 'skill', 'political', 'patent'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term.replace('buyer power', 'bargaining power of buyers'))) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...s.body.map((x) => x.text || '')]).join(' ').toLowerCase();
    const off = items.filter((q) => !q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (off.length) problems.push(`quiz item(s) pinned to "${b.title}" share no substantive word with the chapter: ${off.map((q) => q.question.slice(0, 40)).join(' | ')}`);
  }
  /* quiz-01 / quiz-02 named: the push-factor and off-shoring items exist AND their chapter teaches them */
  const b1 = content[0].sections.map((s) => JSON.stringify(s)).join(' ').toLowerCase();
  if (!/saturated market/.test(b1) || !/push factor/.test(b1)) problems.push('quiz-01: chapter 1 does not teach push factors by name');
  if (!/off-shoring/.test(b1) || !/outsourcing/.test(b1)) problems.push('quiz-02: chapter 1 does not teach off-shoring and outsourcing');
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
    if (!p.question.slice(EXTRACT.length).includes(F.name)) problems.push(`practice "${p.command} ${p.marks}": the task does not name the firm (practice-01, practice-02 — a generic stem)`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\d{3,}/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries the level descriptors`);
    if (p.marks > 6) {
      if (/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
      for (const L of ['Level 1', 'Level 2', 'Level 3', 'Level 4']) if (!p.guidance.includes(L)) problems.push(`${p.marks}-mark ${p.command} guidance has no ${L}`);
      for (const w of ['knowledge', 'application', 'analysis', 'evaluation']) if (p.command !== 'Discuss' && !p.guidance.toLowerCase().includes(w)) problems.push(`${p.marks}-mark ${p.command} guidance never names ${w} (topFix-04, practice-02)`);
      if (p.marks >= 12 && !/A strong answer, in outline:/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} has no short model answer (topFix-04)`);
    } else if (!/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (p.command === 'Discuss' && /\bconclu/i.test(p.guidance.replace(/does not need a final recommendation/, ''))) problems.push('Discuss guidance asks for a conclusion (V036)');
  }
  /* the source carries every figure the tasks and schemes lean on */
  for (const f of [usdm(F.fixed), usd(F.variable), '400,000', '200,000', usd(F.belmar.income), pct(F.belmar.growth), '49%', usd(F.siteIn.labour), usd(F.siteOut.labour), pct(F.siteOut.tariffPct), usdm(F.grant), usdm(F.outlay), usdm(F.annualReturn), usd(F.siteIn.other), '$1 = 4 units']) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  if (!/Explain one\b/.test(PRACTICE.find((p) => p.command === 'Explain').question)) problems.push('topFix-04: the 4-mark Explain is not "Explain one..."');
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
      /* topFix-05's example (export → licence → JV → FDI) is the entry-mode ladder; refused */
      if (r.correctOrder.some((x) => /licen|franchis|\bFDI\b/i.test(x))) problems.push(`${where}: a reorder drills the off-specification entry-mode ladder`);
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
  /* topFix-05, named: fill-ins exist for push vs pull and for off-shoring vs outsourcing */
  const fills = recalls.filter(([, r]) => r.type === 'fillin').map(([, r]) => r.answers.map((a) => a.toLowerCase()));
  if (!fills.some((a) => a.includes('push') && a.includes('pull'))) problems.push('topFix-05: no fill-in asks push against pull');
  if (!fills.some((a) => a.includes('off-shoring') && a.includes('outsourcing'))) problems.push('topFix-05: no fill-in asks off-shoring against outsourcing');
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
    /* structure-08: a misconception is a belief about the subject, not an exam-technique tip */
    if (/\bexam|\bmarks?\b|\bexaminer/i.test(s.misconception)) problems.push(`${where}: the misconception is about exam technique, not the subject (structure-08)`);
  }
  /* structure-08: no misconception repeated across subsections */
  const mis = SUBSECTIONS.map((s) => s.misconception.slice(0, 60));
  if (new Set(mis).size !== mis.length) problems.push('two subsections open their misconception the same way (structure-08)');
  for (const b of content) b.takeaway.forEach((x) => { if (x.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${x.slice(0, 40)}"`); });
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
  for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (EXAMINER_CLAIM.test(sent)) problems.push(`an uncited claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
  if (NOTES.length !== content.length) problems.push(`${NOTES.length} notes topics against ${content.length} chapters`);
  NOTES.forEach((n, i) => { if (n.title !== content[i].title) problems.push(`notes topic ${i + 1} is titled "${n.title}" and its chapter "${content[i].title}"`); });
  if (NOTES.some((n) => 'misconception' in n)) problems.push('a notes topic carries a misconception (structure-08: the live notes repeated one)');
  const fronts = FLASHCARDS.map((f) => f.front.toLowerCase());
  if (new Set(fronts).size !== fronts.length) problems.push('two flashcards share a front');
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i + 1} has no \`steps\` array`);
    if (!c.title) problems.push(`extras chain ${i + 1} has no title`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) if (!e.title || typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} lacks a title or content`);
  /* MistakesTab.jsx reads title / mistake / correction / examTip, on this branch and on origin/main */
  for (const m of MISTAKES) for (const k of ['title', 'mistake', 'correction', 'examTip']) if (!String(m[k] ?? '').trim()) problems.push(`mistake "${m.title}" has no \`${k}\` — MistakesTab.jsx renders that field`);
  {
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    for (const k of ['item.title', 'item.mistake', 'item.correction', 'item.examTip']) if (!tab.includes(k)) problems.push(`MistakesTab.jsx no longer reads ${k}; the mistake fields must follow the component`);
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
  /* the live section's named real firms and their unverifiable claims (accuracy, topFix-01) */
  ban(/McDonald|\bTata\b|Jaguar|\bApple\b|Foxconn|\bIreland\b|World Bank/g, 'a named real firm or institution from the live section\'s examples');
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
      /* a label inside a box must fit the box */
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
  const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
    const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
    return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || FACE, anchor: attr('text-anchor') || 'start' };
  });
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
    if (!collides(mk('Buyers', 300, 100, 12), mk('High', 300, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Buyers', 300, 100, 12), mk('High', 300, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALL)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Rivalry', 188, 120, 12))) problems.push('the line check does not see a vertical arrow drawn through a label');
    const pathProbe = pathsOf('<path d="M 60 200 L 300 60" fill="none" stroke="#34d399" stroke-width="2"/>');
    if (pathProbe.length !== 1 || !crossed(pathProbe[0], mk('Sales', 170, 140, 12))) problems.push('the path reader does not turn a curve into segments the line check can see');
  }
  /* the figures the teaching states are countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' ') + ALL_DIAGRAMS[i].checklist.join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(1, [usd(F.tarsia.income), usd(F.tarsia10), usd(F.belmar.income), usd(F.belmar10), 'Buyers', 'New entrants', 'Substitutes', 'Suppliers', 'Rivalry'], 'market');
  want(2, [`${usd(F.landedIn)} delivered`, `${usd(F.landedOut)} delivered`, usd(F.tariffOut)], 'location');
  want(4, ['200 units', '250 units', usd(F.componentCost0), usd(F.componentCost1), `${pct(F.appreciationPct)}`], 'exchange');
  /* THE CHECK-IN KEY: each block's FIRST pinned quiz key must not be printed on its own diagram */
  const surfaces = (d) => [d.title, d.description, ...d.checklist, ...d.scenarios.map((s) => s.label), ...d.scenarios.flatMap((s) => textsOf(s.svg).map((x) => x.body))].join(' | ').toLowerCase();
  const figs = (s) => [...String(s).matchAll(/\$?\d[\d,]*(?:\.\d+)?%?/g)].map((m) => m[0]).filter((x) => /[$%]/.test(x) || Number(x.replace(/,/g, '')) >= 13);
  /* stricter than the check-in needs: EVERY item pinned to the block, since the served item is the
     first unused pin and a revisit or a re-pin could serve another */
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const qi of b.quizIndices) {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      if (surf.includes(key.toLowerCase())) problems.push(`"${b.title}": the key "${key}" of a pinned item is printed on the chapter's diagram`);
      for (const f of figs(key)) if (!q.question.includes(f) && surf.includes(f.toLowerCase())) problems.push(`"${b.title}": the key figure ${f} of a pinned item is printed on the chapter's diagram`);
    }
  });
  {
    /* A/B the key check: a key that IS on the diagram must be caught */
    const surf = surfaces(DIAGRAMS[2]);
    if (!surf.includes(`${usd(F.landedIn)} delivered`.toLowerCase())) problems.push('the check-in key check cannot see a figure printed on the location diagram');
  }
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const all = readable.join(' \n ');
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.steps || []).map((x) => `${x.title} ${x.subtitle}`)])].join(' ').toLowerCase(); };
  const need = (slug, words, id) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${id}: ${slug} never says "${w}"`); };
  need('push-factors', ['saturated market', 'competition', 'push factor'], 'specGap-01/specGap-10');
  need('pull-factors', ['increased sales and profitability', 'economies of scale', 'risk spreading', 'pull factor'], 'specGap-01/specThin-01');
  need('off-shoring-and-outsourcing', ['off-shoring', 'outsourcing', 'location', 'ownership', 'cost competitiveness'], 'specGap-02');
  need('extending-the-product-life-cycle', ['extends the product life cycle', 'decline', 'growth'], 'specGap-03');
  need('income-and-ease-of-doing-business', ['disposable income', 'ease of doing business'], 'specGap-04');
  need('infrastructure-stability-and-exchange-rates', ['infrastructure', 'political stability', 'exchange rates'], 'specGap-04');
  need('costs-and-labour-force', ['costs of production', 'skills and availability of labour force'], 'specGap-05');
  need('trade-bloc-incentives-and-infrastructure', ['location in trade bloc', 'government incentives', 'infrastructure'], 'specGap-05');
  need('stability-resources-and-return-on-investment', ['ease of doing business', 'political stability', 'natural resources', 'likely return on investment'], 'specGap-05');
  need('mergers-takeovers-and-joint-ventures', ['merger', 'takeover', 'joint venture', 'new business'], 'specThin-02');
  need('reasons-to-grow-and-compete', ['spreading risk and economies of scale', 'entering new markets/trade blocs', 'brand names/patents', 'global competitiveness'], 'specGap-06');
  need('reasons-supplies-knowledge-and-networks', ['securing resources/supplies', 'local knowledge', 'supply chain', 'distribution network'], 'specGap-06/specThin-03');
  need('reasons-competition-law-and-shared-risk', ['reducing competition', 'government or legal requirement', 'sharing costs/risks'], 'specGap-11');
  need('exchange-rates-and-exporters', ['appreciates', 'exchange rate'], 'specGap-07');
  need('exchange-rates-importers-and-profits', ['cheaper', 'converted back'], 'specGap-07');
  need('skill-shortages-and-competitiveness', ['skill shortage', 'international competitiveness', 'price competitiveness', 'non-price competitiveness', 'differentiating'], 'specGap-08/specGap-09');
  /* accuracy-01 / topFix-02: Bartlett-Ghoshal gone everywhere, including the notes (section 2 bans it) */
  if (/Strategic Analysis for Global Expansion|Market Entry Methods/.test(all)) problems.push('a live block title survived');
  /* structure-09: every flow step carries a subtitle, and no two flows teach the same chain */
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
if (ctx.number !== '4.3.2' || ctx.unitCode !== 'WBS14') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 4.3.2 / WBS14 — structure-06's renumbering would be the regression`);
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

console.log(`\n${SECTION} — packet 47`);
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
  SCOPE      4.3.2 only. Bartlett-Ghoshal, the entry-mode ladder (licensing, franchising, entry
             methods), Porter's Strategic Matrix and the command words this paper does not set are
             banned, each A/B'd both ways and each ban re-measured against bus_spec.txt; Ansoff,
             PESTLE and FDI are pointer-only, one mention each, carrying their topic numbers
  NUMBERING  the oracle re-read (37 rows / 33 leaves), every leaf mapped and its own words found in
             its subsections, the three factor lists matched to :1372-1410, five headings asserted
             by line, "4.2.1"-"4.2.5" asserted ABSENT, and the database's own 4.3.2 / WBS14 asserted
  ARITHMETIC every figure re-derived: average cost, profit, risk spreading, off-shoring, compounded
             income, delivered cost at both sites, return with and without the grant, both sides of
             the appreciation, and every recall and quiz key recomputed independently
  PINS       derived from each item's block tag; five blocks of three or four subsections, each with
             its own diagram, quiz and practice; no diagramRef; 8 free quiz items against 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that no subsection teaches
  PRACTICE   Appendix 6 parsed including Assess 10/12; the set is ial-paper-structure.json's Units
             3-4 Section A (4/4/8/12/12) plus two Evaluate essays, all on one source that carries
             every figure; stems name the firm; openings clean; levels naming K/App/An/Ev above 6
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, push/pull and off-shoring/outsourcing fill-ins,
             reorders sourced from extras chains, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit and collisions checked
             on the emitted SVG with the guard A/B'd, figures counted back out of the SVG, and no
             chapter's check-in key printed on its own diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-47-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-47-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
