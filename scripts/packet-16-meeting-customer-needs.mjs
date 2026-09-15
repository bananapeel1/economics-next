#!/usr/bin/env node
/**
 * PACKET 16 — meeting-customer-needs, the Business section students meet first and abandon most.
 *
 *   node scripts/packet-16-meeting-customer-needs.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-16-meeting-customer-needs.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-16-meeting-customer-needs.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet16-content.mjs (blocks and Notes), scripts/_packet16-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet16-diagrams.mjs (the five SVGs). This file
 * assembles the bundle, pins each block to its diagram, quiz and practice items, and runs the checks a
 * verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - phrases that must not survive: pounds sterling, Outline (not an IAL command word in either
 *     subject) and Examine (Economics only), the UK-only institutions the March copy was built on, the
 *     off-spec "limitations of market research" framing and the UK GCE's "use of ICT", and any uncited
 *     examiner claim;
 *   - every practice command word and tariff checked against audit/raw/tariff-census.json for BUSINESS,
 *     with Assess at 10 because this is Unit 1;
 *   - the diagrams' own geometry, re-derived from the figures rather than asserted: the two market bars
 *     and the share block against $32m / $40m / $6m, the value-added split against $0.45 / $1.20, and
 *     every market-map point against its brand's own price and juice content;
 *   - Layer 5 by string: Zuri's figures appear in the body AND in at least one other surface.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, MARKET_LAST, MARKET_NOW, ZURI_SALES, INPUT_COST, PRICE, POPULATION, SURVEY_N, growthPct, sharePct, valueAdded, likelyBuyers, weeklyRevenue, BRANDS, GAP } from './_packet16-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6 } from './_packet16-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet16-assessment.mjs';
import { DIAGRAMS, BAR, MAP, MX, MY, VA, vaWidth } from './_packet16-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the last three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — a fourth would reach no surface at all (packet 15's rule). One item from
 * the market, one from research and one from positioning makes the pre-test a fair sample of the whole
 * section, and none of the three is a question a block shows again minutes later.
 */
const unpinned = new Set(QUIZ.map((q, i) => (q.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Which of these is a characteristic of a mass market?'),
  [B2]: first(quizByBlock[B2], 'Which of these best describes a dynamic market?'),
  [B3]: first(quizByBlock[B3], 'What makes a piece of data primary rather than secondary?'),
  [B4]: first(quizByBlock[B4], 'Which sampling method divides the population into subgroups and then selects at random within each one?'),
  [B5]: first(quizByBlock[B5], 'What does a market map show a business?'),
  [B6]: first(quizByBlock[B6], 'What is the purpose of product differentiation?'),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5], [B6]: practiceByBlock[B6],
};
// Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so a
// diagramId on a subsection is never read. Block 2 has none on purpose: a drawing of "competition" or
// "a dynamic market" would be decoration, and the audit's complaint (structure-02) is about the four
// diagrams this topic actually needs.
const diagramIds = {
  [B1]: DIAGRAMS[0].id, [B2]: undefined, [B3]: DIAGRAMS[1].id,
  [B4]: DIAGRAMS[2].id, [B5]: DIAGRAMS[3].id, [B6]: DIAGRAMS[4].id,
};

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  diagrams: DIAGRAMS,
  extras: EXTRAS,
  mistakes: MISTAKES,
};

/* ── the packet's own checks ───────────────────────────────────────────────── */

const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const texts = allStrings(bundle);
const problems = [];
const count = (re) => texts.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£/g, 'pounds sterling (one currency per section, dollars)');
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject)');
ban(/\bExamine\b/g, '"Examine" (an IAL Economics command word; Business uses Assess)');
ban(/\blimitations of market research\b/gi, '"limitations of market research" as a topic (specGap-05 — no leaf of 1.3.1; taught as evaluation inside the research subsections instead)');
ban(/\buse of ICT\b/gi, '"use of ICT" (UK GCE framing — the IAL spec names websites/social media and databases as secondary methods)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|council tax|HS2|the Chancellor)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(ONS|RPI|CMA|OBR)\b/g, 'a UK-only acronym (locale.institution)');
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWBS1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * The same class one step out, and the reason this check exists: `claim.uncited` only fires on the
 * word "examiners", so a sentence can assert exactly the same thing about the mark scheme without
 * naming them — "an unlabelled axis costs marks", "that earns half the marks", "a plotted point
 * without its name earns nothing" — and pass the validator untouched. Layer 6 found eleven of them
 * in this bundle's first draft. Say what the COMMAND WORD requires, which Appendix 6 states and
 * which can therefore be cited; do not say what a marker does with an answer, which cannot.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bis worth more than\b|\bscores? (?:poorly|badly)\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);

// Practice command words and tariffs against the specification's own Appendix 6, for BUSINESS.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Business command word`);
  else if (p.command === 'Assess') { if (p.marks !== 10) problems.push(`practice Assess (${p.marks}) — Assess is 10 marks in Units 1-2 and this is WBS11`); }
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01 rule).
 * If a figure in the body changes and a diagram does not, these fail.
 */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const heightsIn = (svg) => [...svg.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map((m) => m.slice(1).map(Number));
{
  const rects = heightsIn(DIAGRAMS[0].svg);
  const hFor = (v) => Math.round((((BAR.y0 - BAR.top) * v) / BAR.max) * 100) / 100;
  for (const [label, v] of [['last year', MARKET_LAST], ['this year', MARKET_NOW], ["Zuri's sales", ZURI_SALES]]) {
    if (!rects.some((r) => Math.abs(r[3] - hFor(v)) < 0.02)) problems.push(`the ${label} bar is not drawn at the height ${money(v)}m gives on the shared scale`);
  }
  // and the two market bars are in the ratio the growth figure claims
  const hL = hFor(MARKET_LAST), hN = hFor(MARKET_NOW);
  const drawnGrowth = ((hN - hL) / hL) * 100;
  if (Math.abs(drawnGrowth - growthPct()) > 0.01) problems.push(`the bars show ${drawnGrowth.toFixed(2)}% growth, the body says ${growthPct()}%`);
  const drawnShare = (hFor(ZURI_SALES) / hN) * 100;
  if (Math.abs(drawnShare - sharePct()) > 0.01) problems.push(`the share block is ${drawnShare.toFixed(2)}% of the bar, the body says ${sharePct()}%`);
}
{
  const rects = heightsIn(DIAGRAMS[4].svg);
  const wIn = vaWidth(INPUT_COST), wAdd = vaWidth(valueAdded());
  if (!rects.some((r) => Math.abs(r[2] - wIn) < 0.02)) problems.push('the bought-in materials segment is not drawn at the width $0.45 gives');
  if (!rects.some((r) => Math.abs(r[2] - wAdd) < 0.02)) problems.push('the value-added segment is not drawn at the width $0.75 gives');
  if (Math.abs((wIn + wAdd) - VA.w) > 0.02) problems.push('the two segments do not add up to the selling price');
}
{
  const svgs = svgOf(DIAGRAMS[3]);
  for (const b of BRANDS) {
    const x = MX(b.price), y = MY(b.juice);
    if (!svgs[0].includes(`cx="${x}" cy="${y}"`)) problems.push(`${b.name} is not plotted at the point ${money(b.price)} / ${b.juice}% gives`);
  }
  const gx = MX(GAP.price), gy = MY(GAP.juice);
  if (!svgs[1].includes(`cx="${gx}" cy="${gy}"`)) problems.push('the gap is not marked at the position the body names');
  if (svgs[0].includes('GAP')) problems.push('the first market-map view marks the gap before the competitors have been plotted');
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Zuri's figures are the same figures wherever they appear.
const must = [`${money(MARKET_LAST)} million`, `${money(MARKET_NOW)} million`, `${growthPct()}%`, `${sharePct()}%`, money(INPUT_COST), money(PRICE), money(valueAdded()), likelyBuyers().toLocaleString('en-GB'), money(weeklyRevenue())];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// and the arithmetic itself, recomputed here rather than trusted
if (Math.round(((MARKET_NOW - MARKET_LAST) / MARKET_LAST) * 1000) / 10 !== growthPct()) problems.push('growthPct() disagrees with its own inputs');
if (Math.round((ZURI_SALES / MARKET_NOW) * 1000) / 10 !== sharePct()) problems.push('sharePct() disagrees with its own inputs');
if (Math.round((PRICE - INPUT_COST) * 100) / 100 !== valueAdded()) problems.push('valueAdded() disagrees with its own inputs');
if (POPULATION * 0.18 !== likelyBuyers()) problems.push('likelyBuyers() disagrees with its own inputs');
if (Math.round(likelyBuyers() * PRICE) !== Math.round(weeklyRevenue())) problems.push('weeklyRevenue() disagrees with its own inputs');

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 16 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(38)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 74)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no Outline or Examine, no UK-only institution, no off-spec "limitations of market research" or "use of ICT" framing, no uncited examiner claim, every practice tariff in the Business census with Assess at 10, every diagram figure re-derived from its own inputs, ids unique, Zuri\'s figures agreeing across every surface');

const live = await loadBundle(SECTION);
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx).findings;
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
console.log(`\nvalidator: before ${before.filter((f) => f.tier === 'BLOCK').length} BLOCK / ${before.filter((f) => f.tier === 'DEBT').length} DEBT → after ${after.summary.block} BLOCK / ${after.summary.debt} DEBT; ${cleared.length} baselined findings cleared, ${carried.length} carried, ${newBlocks.length} new BLOCK, ${newDebt.length} new DEBT`);
for (const f of newBlocks) console.log(`  NEW BLOCK  ${f.rule.padEnd(24)} ${f.detail}`);
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 150)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 150)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const p = `audit/snapshots/packet-16-bundle__business__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-16-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
