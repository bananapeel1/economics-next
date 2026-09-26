#!/usr/bin/env node
/**
 * PACKET 54 — assessing-competitiveness, Business Unit 3 (WBS13), IAL topic 3.3.5.
 * `audit/raw/bus_spec.txt:1218-1248`. FIVE blocks, eighteen subsections, 18 leaves.
 *
 *   node scripts/packet-54-assessing-competitiveness.mjs            # dry run, every check
 *   node scripts/packet-54-assessing-competitiveness.mjs --dump     # + write the bundle
 *   node scripts/packet-54-assessing-competitiveness.mjs --stage    # + write the draft (never `data`)
 *
 * Packet 47's runner, adapted. What this packet adds, with the reason:
 *
 *   - **THE FORMULAE ARE READ OFF THE SPECIFICATION'S APPENDIX 9, NOT RESTATED FROM MEMORY.** The
 *     runner parses `bus_spec.txt:2399-2446` for the seven ratio definitions and checks that every
 *     formula the section prints names the same terms. `accuracy-03`'s wrong flashcard ("net profit
 *     margin = operating profit ÷ revenue") is the class this closes.
 *   - **EVERY FIGURE IS RE-DERIVED from the statements**, including the ratios, the workforce
 *     measures and the gearing-magnifies example, and every quiz key is recomputed here.
 *   - **THE LEDGER'S NUMBERS ARE REFUSED ON THE DOCUMENT.** "3.5.1"-"3.5.3", "3.1.2" and "3.1.4" are
 *     asserted absent from bus_spec.txt, the 3.3.x headings asserted by line, and `contextFor`
 *     asserted as 3.3.5 / WBS13 (which is what refuses `structure-08`).
 *   - **THE REMOVED FRAMEWORKS STAY REMOVED, AND THE BAN RESTS ON A MEASUREMENT** (VRIO, core
 *     competencies, Bowman, benchmarking, Porter): each is re-measured against bus_spec.txt.
 *   - **A FORMULA FILL-IN NEVER SITS UNDER ITS OWN FORMULA.** Each of `topFix-05`'s formula recalls
 *     is placed on the step after the one that teaches it, and the runner asserts the answer is not
 *     printed on the recall's own step.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, FIRM, usd, usdm, pct, ratio, round2,
  BANNED_ELSEWHERE, POINTER_ONLY, teachingWords, teachingVocabulary,
} from './_packet54-util.mjs';
import { buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP } from './_packet54-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, EXTRACT } from './_packet54-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, FRAME, MIN_FACE, FACE, SMALL, COLLIDE_TOL, LEAD, GEAR, PAYGAP } from './_packet54-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump') || STAGE;
const F = FIRM;
const { L, T, PL, PT } = F;

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
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{|Infinity/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  for (const bad of ['a cost of $undefinedm', 'the return is NaN%', 'the firm [object Object] sells', 'a price of ' + '${usd(x)}', 'gearing Infinity%']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const ok of ['the object of the exercise is cost', 'a cost of $17.60m']) {
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
    [0, 'Examiners reward structured VRIO analysis', 'a firm with a strong brand'],
    [0, 'tangible and intangible core competencies', 'the core of the business is baking'],
    [1, 'Use Bowman\'s Strategic Clock to analyse SwiftDeliver', 'a strategy to cut the clock-in time'],
    [2, 'Explain two of Porter\'s Five Forces', 'the forces behind rising turnover'],
    [2, 'a strategy of cost leadership', 'cost of sales rose'],
    [3, 'benchmarking against industry leaders', 'compared with the industry average'],
    [4, 'Define the term competitive advantage. (4 marks)', 'Define ROCE in the notes'],
    [4, 'Analyse how the firm could respond. (6 marks)', 'analysis of both sides'],
    [5, 'maintaining a sustainable competitive advantage', 'a competitive price'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const why = BANNED_ELSEWHERE[i][1].slice(0, 46);
    if (!fires(i, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(i, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
ban(/\bF0\d\d\b|\bC-assessing-competitiveness-|\bV0\d\d\b|\bpacket \d/g, 'an internal ledger id or packet number in student-facing text');
ban(/\bleaf\b|\bsub-?topics?\b|\bthe (?:audit|ledger)\b|\bspec\s?gap\b/gi, 'the build\'s own vocabulary in student-facing text');
ban(/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/gi, 'the specification as the SPEAKER addresses the checker, not the student (packet 42 Verify B)');
ban(/\bnet profit margin\s*=\s*\(?\s*operating profit/gi, 'accuracy-03: the operating profit margin under the name "net profit margin"');
for (const { re, why, max, mustCite } of POINTER_ONLY) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const hits = readable.filter((s) => one.test(s));
  if (hits.length > max) problems.push(`${why} — ×${hits.length} against a budget of ${max}, first: "${hits[0].slice(0, 90)}"`);
  for (const h of hits) if (mustCite && !mustCite.test(h)) problems.push(`a pointer without its topic number (${why.slice(0, 40)}): "${h.slice(0, 90)}"`);
}
{
  const [opm] = POINTER_ONLY;
  if (!opm.mustCite.test('That is the operating profit margin, a Unit 2 ratio (2.3.3).')) problems.push('the pointer-cite check rejects a correctly cited pointer');
  if (opm.mustCite.test('The operating profit margin is 15%.')) problems.push('the pointer-cite check accepts an uncited mention');
}
/* the bans rest on measurements of the document; re-measure them */
for (const w of ['VRIO', 'core competenc', 'distinctive capabilit', 'balanced scorecard', 'triple bottom line', 'Bowman', 'strategic clock']) if (new RegExp(w, 'i').test(specBody)) problems.push(`"${w}" occurs in bus_spec.txt after all — the ban rests on it being absent`);
{
  /* "competitive advantage" is a bullet at 1.3.2 · 2d (:542) and in 2.3.4 (:984-1002), and nowhere in 3.3.5 */
  const hits = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /competitive advantage/i.test(l)).map(([n]) => n);
  if (!hits.includes(542)) problems.push('"competitive advantage" is not at bus_spec.txt:542 (1.3.2 · 2d) — the ban\'s citation rests on it');
  if (hits.some((n) => n >= 1218 && n <= 1254)) problems.push('"competitive advantage" occurs inside 3.3.5 after all — the ban rests on it not doing so');
}
{
  /* "benchmark" occurs only in the qualification's own front and back matter, never in a topic */
  const hits = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /benchmark/i.test(l)).map(([n]) => n);
  if (hits.some((n) => n > 500 && n < 1600)) problems.push(`"benchmark" occurs inside the subject content of bus_spec.txt (lines ${hits.join(', ')}) — the ban rests on it being absent there`);
  /* Porter sits at 3.3.1 and 4.3.2 only */
  const porter = spec.map((l, i) => [i + 1, l]).filter(([, l]) => /Porter/.test(l)).map(([n]) => n);
  if (porter.some((n) => n >= 1218 && n <= 1254)) problems.push('Porter occurs inside 3.3.5 after all — the ban rests on it not doing so');
  if (!spec[1098]?.includes('Porter') || !spec[1109]?.includes('Porter')) problems.push('Porter\'s Strategic Matrix / five forces are not at bus_spec.txt:1099/1110 (3.3.1) — the ban\'s citation rests on it');
  /* the operating profit margin is a Unit 2 ratio at 2.3.3, and not in 3.3.5's list */
  if (!/operating profit margin/.test(spec.slice(929, 934).join(' '))) problems.push('the operating profit margin is not at bus_spec.txt:931-933 (2.3.3) — the pointer rests on it');
  if (/operating profit margin/.test(spec.slice(1217, 1254).join(' '))) problems.push('3.3.5 lists the operating profit margin after all — the pointer budget would be wrong');
}

/* ══ 3 · THE ARITHMETIC SPINE, RE-DERIVED FROM THE TYPED FIGURES ════════════ */
{
  const a = (ok, msg) => { if (!ok) problems.push(`arithmetic: ${msg}`); };
  /* the statements, re-added by hand here and not read from the util's derived fields */
  a(40 - 24 === 16 && 16 - 10 === 6 && round2(6 - 0.8) === 5.2, 'this year: 40 − 24 = 16, − 10 = 6, − 0.8 = 5.2');
  a(round2(32 - 17.6) === 14.4 && round2(14.4 - 9.4) === 5 && round2(5 - 0.2) === 4.8, 'last year: 32 − 17.6 = 14.4, − 9.4 = 5, − 0.2 = 4.8');
  a(T.gp === 16e6 && T.op === 6e6 && near(T.pfy, 5.2e6, 1) && L.gp === 14.4e6 && near(L.op, 5e6, 1) && near(L.pfy, 4.8e6, 1), 'the util\'s profit lines disagree with the hand sums');
  a(near(T.gpm, 40) && near(L.gpm, 45) && near(T.pfym, 13) && near(L.pfym, 15), 'margins are not 45% → 40% and 15% → 13%');
  a(PT.ca === 6e6 && PL.ca === 4.5e6, 'current assets are not $6m and $4.5m');
  a(PT.nca + PT.ca - PT.cl - PT.ncl === PT.shareCapital + PT.retained, 'this year\'s statement of financial position does not balance');
  a(PL.nca + PL.ca - PL.cl - PL.ncl === PL.shareCapital + PL.retained, 'last year\'s statement of financial position does not balance');
  a(PT.equity - PL.equity >= 0 && PT.equity - PL.equity <= T.pfy, 'the rise in equity is not covered by the year\'s profit');
  a(PT.ce === 30e6 && PL.ce === 20e6, 'capital employed is not $20m → $30m');
  a(near(PT.current, 1.2) && near(PL.current, 1.5) && near(PT.acid, 0.7) && near(PL.acid, 1), 'liquidity is not 1.5 → 1.2 and 1 → 0.7');
  a(near(PL.gearing, 12.5) && near(PT.gearing, 100 / 3), 'gearing is not 12.5% → 33.3%');
  a(near(PL.roce, 25) && near(PT.roce, 20), 'ROCE is not 25% → 20%');
  a(near(T.interest, PT.ncl * F.borrowRate / 100) && near(L.interest, PL.ncl * F.borrowRate / 100), 'interest is not 8% of the year-end loans');
  a(near(T.op / T.interest, 7.5) && near(L.op / L.interest, 25), 'interest cover is not 25 → 7.5 times, as the text says');
  a(near(T.revenue / L.revenue, 1.25) && near(T.interest / L.interest, 4), '"rose by a quarter" and "quadrupled" are not true');
  a(PT.nca - PL.nca === 10.5e6 && PT.ncl - PL.ncl === 7.5e6, 'the bakery ($10.5m) and new borrowing ($7.5m) are not as the text says');
  a(near(PT.acid * 100, 70), '"70 cents of liquid assets for each dollar" is not the acid test');
  /* people */
  a(F.prodL === 3200 && F.prodT === 3000 && Math.round(-F.prodChangePct) === 6, 'productivity is not 3,200 → 3,000, about 6% down');
  a(near(F.HL.turnover, 15) && near(F.HT.turnover, 30) && near(F.HL.retention, 90) && near(F.HT.retention, 80), 'turnover/retention are not 15 → 30 and 90 → 80');
  a(F.HT.leavers >= F.HT.start - F.HT.stayed && F.HL.leavers >= F.HL.start - F.HL.stayed, 'more starters left than there were leavers in all');
  a(F.HT.possibleDays === 50_000 && F.HL.possibleDays === 45_000 && near(F.HT.absence, 5) && near(F.HL.absence, 3), 'absenteeism is not 3% → 5% of 45,000 / 50,000 days');
  a(F.turnoverCostT === 480_000 && F.turnoverCostL === 216_000, 'turnover cost is not $216,000 → $480,000');
  a(PAYGAP === 480_000 && PAYGAP === F.turnoverCostT, 'closing the pay gap is not $480,000, the same as the turnover cost, as the text says');
  a(F.esopCost > F.turnoverCostT, '"even if no one left, that saving would not cover it" is not true of the share scheme');
  /* the case must be able to hold its own wage bill (fix round 1: $14,000 a month gave $33.6m against $10m of
   * other operating expenses). Shop pay sits in other operating expenses with rent, delivery and head office;
   * the bakers' pay sits in cost of sales. Both years, and at the rivals' rate too. */
  for (const [H, inc, yr] of [[F.HT, T, 'this year'], [F.HL, L, 'last year']]) {
    a(H.avg * F.rivalPay * 12 <= 0.6 * inc.opex, `${yr}: shop staff at even the rivals' pay (${usdm(H.avg * F.rivalPay * 12)}) do not fit inside 60% of other operating expenses (${usdm(inc.opex)})`);
  }
  a(F.replaceCost <= 12 * F.shopPay && F.replaceCost >= F.shopPay, 'the cost of replacing a leaver is not between one month\'s and one year\'s pay');
  /* gearing magnifies (chapter 3 diagram), recomputed from scratch */
  a(near(GEAR.cents['low-good'], 21.3) && near(GEAR.cents['high-good'], 38) && near(GEAR.cents['low-bad'], 3.6) && near(GEAR.cents['high-bad'], -2), 'the magnify diagram is not 21.3c / 38c / 3.6c / −2c');
  a(near(((4e6 - 0.96e6) / 8e6) * 100, 38) && near(((0.8e6 - 0.96e6) / 8e6) * 100, -2), 'high-gearing cents recomputed');
  /* recall and quiz arithmetic the content prints, recomputed here */
  a(10 / 40 === 0.25, 'recall: 10 of 40 is 25%');
  a(5 - 2 - 1.5 === 1.5, 'quiz: operating profit $1.5m');
  a(50 - 32 === 18, 'quiz: equity $18m');
  a(near(0.7 / 2, 0.35) && near(0.7 / 1.3 * 100, 53.846, 0.01), 'quiz: 35% (and 53.8%)');
  a(near((700 - 200) / 400, 1.25) && near(700 / 400, 1.75), 'quiz: acid 1.25:1, current 1.75:1');
  a(near(9 / 30, 0.3) && near(9 / 21 * 100, 42.857, 0.01), 'quiz: gearing 30% (and 42.9%)');
  a(near(3.6 / 30, 0.12) && near(3.6 / 24, 0.15) && near(3.6 / 6, 0.6), 'quiz: ROCE 12% (15%, 60%)');
  a(8 / 40 === 0.2 && near(8 / 32, 0.25), 'quiz: turnover 20% (25%)');
  a(1440 / 12 === 120 && 45 / 60 === 0.75 && 800 / 20000 === 0.04, 'quiz: 120 rooms, 75%, 4%');
  a(near(T.pfy / PT.ce * 100, 17.33, 0.01), 'practice: the profit-for-the-year slip gives 17.3%');
}

/* ══ 3b · THE FORMULAE, AGAINST THE SPECIFICATION'S APPENDIX 9 ══════════════ */
{
  const app = spec.slice(2396, 2460).join('\n');
  if (!/Appendix 9: Financial statements and/.test(spec[2396] ?? '')) problems.push(`bus_spec.txt:2397 is not Appendix 9 — it reads "${(spec[2396] || '').trim()}"`);
  const want = [
    ['gross profit margin', /gross profit\s*\n.*gross profit margin[\s\S]{0,120}revenue/],
    ['profit for the year margin', /profit for the year\s*\n[\s\S]{0,220}\(net profit\) margin[\s\S]{0,120}revenue/],
    ['current ratio', /current ratio[\s\S]{0,120}current liabilities/],
    ['acid test', /current assets − inventory[\s\S]{0,40}\n.*acid test ratio/],
    ['capital employed', /capital employed\s+non-current liabilities \+ total equity/],
    ['gearing', /non-current liabilities\s*\n.*gearing ratio[\s\S]{0,120}capital employed/],
    ['ROCE', /operating profit 3\s*\n[\s\S]{0,80}return on capital[\s\S]{0,260}capital employed 4/],
  ];
  for (const [name, re] of want) if (!re.test(app)) problems.push(`Appendix 9 no longer reads as the ${name} formula this section teaches`);
  const formulae = readable.join(' \n ');
  const printed = [
    ['Gross profit margin** = gross profit ÷ revenue × 100', 'gross profit margin'],
    ['Profit for the year margin** (net profit margin) = profit for the year ÷ revenue × 100', 'profit for the year margin'],
    ['Current ratio** = current assets ÷ current liabilities', 'current ratio'],
    ['Acid test ratio** = (current assets − inventory) ÷ current liabilities', 'acid test'],
    ['Gearing ratio** = non-current liabilities ÷ capital employed × 100', 'gearing'],
    ['ROCE** = operating profit ÷ capital employed × 100', 'ROCE'],
    ['non-current liabilities plus total equity', 'capital employed'],
  ];
  for (const [s, name] of printed) if (!formulae.includes(s)) problems.push(`the ${name} formula is not printed in its Appendix 9 form`);
  /* accuracy-03, named: the flashcard now uses profit for the year */
  const card = FLASHCARDS.find((f) => /profit for the year margin/i.test(f.front));
  if (!card || !/^Profit for the year ÷ revenue × 100/.test(card.back)) problems.push('accuracy-03: no flashcard gives the profit for the year margin as profit for the year ÷ revenue');
  if (FLASHCARDS.some((f) => /operating profit\s*÷\s*revenue/i.test(f.back))) problems.push('accuracy-03: a flashcard still divides operating profit by revenue');
}

/* ══ 4 · STRUCTURE AND PINS ═════════════════════════════════════════════════ */
{
  if (content.length !== 5) problems.push(`${content.length} blocks, not 5`);
  if (SUBSECTIONS.length !== 18) problems.push(`${SUBSECTIONS.length} subsections, not 18`);
  for (const b of content) {
    if (!b.diagramId) problems.push(`block "${b.title}" has no diagram`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" has no quiz item`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" has no practice item`);
    if (b.sections.length < 3) problems.push(`block "${b.title}" has ${b.sections.length} subsections (structure-05)`);
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
  const rows = (Array.isArray(oracle) ? oracle : oracle.items).filter((r) => r.subject === 'business' && r.topic === '3.3.5');
  const leaves = rows.filter((r) => r.kind === 'leaf');
  if (rows.length !== 23 || leaves.length !== 18) problems.push(`the oracle holds ${rows.length} rows / ${leaves.length} leaves for 3.3.5, not 23 / 18`);
  const slugs = new Set(ATTACH_SLUGS);
  for (const leaf of leaves) {
    const subs = LEAF_MAP[leaf.id];
    if (!subs?.length) { problems.push(`leaf ${leaf.id} ("${leaf.wording.slice(0, 44)}") is mapped to no subsection`); continue; }
    for (const s of subs) if (!slugs.has(s)) problems.push(`leaf ${leaf.id} is mapped to "${s}", which is not a subsection`);
  }
  for (const k of Object.keys(LEAF_MAP)) if (!leaves.some((l) => l.id === k)) problems.push(`LEAF_MAP names ${k}, which is not a 3.3.5 leaf in the oracle`);
  /* every mapped subsection must say the leaf's own words (the oracle's wording: a second method) */
  const clean = (s) => String(s).toLowerCase().replace(/[’']/g, '\'').replace(/[^a-z' -]/g, ' ');
  for (const leaf of leaves) {
    const words = clean(leaf.wording).split(/[\s/]+/).filter((w) => w.length > 4 && !['these', 'their', 'following'].includes(w));
    const subs = (LEAF_MAP[leaf.id] || []).map((slug) => SUBSECTIONS.find((s) => s.id.endsWith(`:${slug}`))).filter(Boolean);
    const hay = clean(subs.map((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])].join(' ')).join(' '));
    const missing = words.filter((w) => !hay.includes(w.replace(/s$/, '')));
    if (missing.length) problems.push(`leaf ${leaf.id} ("${leaf.wording}"): its mapped subsections never say ${missing.map((w) => `"${w}"`).join(', ')}`);
  }
  const at = (n, want) => { if (!spec[n - 1]?.includes(want)) problems.push(`numbering check: bus_spec.txt:${n} does not read "${want}" — it reads "${(spec[n - 1] || '').trim().slice(0, 60)}"`); };
  at(1184, '3.3.4 Influences on business decisions');
  at(1218, '3.3.5 Assessing competitiveness');
  at(1255, '3.3.6 Manging change');
  /* the numbers twelve ledger ids cite must exist nowhere in the document */
  for (const n of ['3.5.1', '3.5.2', '3.5.3', '3.1.2', '3.1.4']) if (specBody.includes(n)) problems.push(`"${n}" occurs in bus_spec.txt after all — ledger items cite it and this packet refuses it on the ground that it does not`);
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
  for (const s of ['The first option is right.', 'The former is gearing and the latter ROCE.']) if (!offends(s)) problems.push(`the ordinal ban no longer fires on: "${s}"`);
  for (const s of ['In the last year the margin fell.', 'After the first year the loan is repaid.']) if (offends(s)) problems.push(`the ordinal ban fires on a sequence reference: "${s}"`);
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    if (jac(QUIZ[i].question, QUIZ[j].question) >= 0.5) problems.push(`near-duplicate stems: "${QUIZ[i].question.slice(0, 40)}" / "${QUIZ[j].question.slice(0, 40)}"`);
  }
}
{
  /* structure-02 / quiz-01 / quiz-02: nothing quizzed that no subsection teaches */
  const teaching = SUBSECTIONS.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])])]).join(' ').toLowerCase();
  const KEY_TERMS = ['gross profit', 'operating profit', 'profit for the year', 'total equity', 'net assets', 'inventory', 'current liabilities', 'acid test', 'current ratio', 'gearing', 'roce', 'capital employed', 'window dressing', 'labour turnover', 'retention', 'absenteeism', 'productivity', 'empowerment', 'consultation', 'share ownership', 'financial reward', 'dividend', 'interest'];
  for (const term of KEY_TERMS) {
    const quizzed = QUIZ.some((q) => `${q.question} ${q.options.join(' ')}`.toLowerCase().includes(term));
    if (quizzed && !teaching.includes(term)) problems.push(`the bank tests "${term}" and no subsection teaches it`);
  }
  for (const b of content) {
    const items = b.quizIndices.map((i) => QUIZ[i]);
    const blockText = b.sections.flatMap((s) => [s.title, s.keyIdea, ...s.body.flatMap((x) => [x.text || '', ...(x.items || [])])]).join(' ').toLowerCase();
    const off = items.filter((q) => !q.question.toLowerCase().split(/\W+/).filter((w) => w.length > 5).some((w) => blockText.includes(w)));
    if (off.length) problems.push(`quiz item(s) pinned to "${b.title}" share no substantive word with the chapter: ${off.map((q) => q.question.slice(0, 40)).join(' | ')}`);
  }
  /* quiz-01 / quiz-02 named: the turnover and empowerment items exist, are pinned, and their chapter teaches them */
  const b4 = content[3].sections.map((s) => JSON.stringify(s)).join(' ').toLowerCase();
  const b5 = content[4].sections.map((s) => JSON.stringify(s)).join(' ').toLowerCase();
  const turnoverQ = QUIZ.findIndex((q) => /^Labour turnover is calculated as/.test(q.question));
  const empowerQ = QUIZ.findIndex((q) => /authority to make decisions/.test(q.question));
  if (turnoverQ < 0 || !content[3].quizIndices.includes(turnoverQ) || !/labour turnover/.test(b4)) problems.push('quiz-01: the labour turnover item is not pinned to a chapter that teaches labour turnover');
  if (empowerQ < 0 || !content[4].quizIndices.includes(empowerQ) || !/empowerment/.test(b5)) problems.push('quiz-02: the empowerment item is not pinned to a chapter that teaches empowerment');
  if (empowerQ >= 0 && (!QUIZ[empowerQ].options.includes('Consultation') || QUIZ[empowerQ].options.some((o) => /zero-hours/i.test(o)))) problems.push('quiz-02: the empowerment item does not carry Consultation as a distractor, or still carries zero-hours contracts');
  /* specGap-06: the ROCE-against-borrowing item is pinned to the chapter that now teaches it */
  const borrowQ = QUIZ.findIndex((q) => /ROCE is 7% and it can borrow at 9%/.test(q.question));
  if (borrowQ < 0 || !content[2].quizIndices.includes(borrowQ)) problems.push('specGap-06: the ROCE-against-borrowing item is not pinned to chapter 3');
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
  if (!paper.papers.includes('WBS13')) problems.push('ial-paper-structure.json business.units_3_4 does not name WBS13');
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
    if (!p.question.slice(EXTRACT.length).includes(F.name)) problems.push(`practice "${p.command} ${p.marks}": the task does not name the firm (practice-03 — a generic stem)`);
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`practice "${p.command} ${p.marks}" has one guidance paragraph`);
    const open = paras[0] || '';
    if (/\(\s*\d+\s*(marks?)?\s*\)/i.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" allocates marks`);
    if (/\$[\d,]|\d+(?:\.\d+)?%|\d{3,}|\d:1/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries a figure`);
    if (/\bLevel [1-4]\b/.test(open)) problems.push(`the opening of "${p.command} ${p.marks}" carries the level descriptors`);
    if (p.marks > 6) {
      if (/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points`);
      for (const L4 of ['Level 1', 'Level 2', 'Level 3', 'Level 4']) if (!p.guidance.includes(L4)) problems.push(`${p.marks}-mark ${p.command} guidance has no ${L4}`);
      for (const w of ['knowledge', 'application', 'analysis', 'evaluation']) if (p.command !== 'Discuss' && !p.guidance.toLowerCase().includes(w)) problems.push(`${p.marks}-mark ${p.command} guidance never names ${w} (topFix-02, practice-03)`);
      if (p.marks >= 12 && !/A strong answer, in outline:/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} has no short model answer`);
    } else if (!/\(\s*\d+\s*marks?\s*\)/.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates no points`);
    if (p.command === 'Discuss' && /\bconclu/i.test(p.guidance.replace(/does not need a final recommendation/, ''))) problems.push('Discuss guidance asks for a conclusion (V036)');
    if (/\bKAA\b|levels-marked/i.test(p.guidance)) problems.push(`${p.command} ${p.marks} guidance uses the MARK_CLAIM vocabulary`);
  }
  /* the source carries every figure the tasks and schemes lean on */
  for (const f of [usdm(T.revenue), usdm(L.revenue), usdm(T.cos), usdm(L.cos), usdm(T.opex), usdm(L.opex), usdm(T.interest), usdm(L.interest), usdm(PT.ca), usdm(PL.ca), usdm(PT.inventory), usdm(PL.inventory), usdm(PT.cl), usdm(PL.cl), usdm(PT.ncl), usdm(PL.ncl), usdm(PT.equity), usdm(PL.equity), pct(F.borrowRate), `average of ${F.HT.avg}`, `${F.HT.leavers} (${F.HL.leavers})`, usd(F.replaceCost), '2,500 of 50,000', '1,350 of 45,000', usd(F.shopPay), usd(F.rivalPay), usd(F.esopCost), 'within three years', 'shift rotas']) {
    if (!EXTRACT.includes(f)) problems.push(`the source does not carry "${f}", which a task or scheme uses`);
  }
  /* topFix-02, named: ROCE is calculated, ratio analysis is assessed for an investor, share ownership is evaluated against turnover */
  if (!PRACTICE.some((p) => p.command === 'Calculate' && /return on capital employed/.test(p.question))) problems.push('topFix-02: no Calculate on ROCE');
  if (!PRACTICE.some((p) => p.command === 'Assess' && /usefulness of ratio analysis to a potential investor/.test(p.question))) problems.push('topFix-02: no Assess on ratio analysis for an investor');
  if (!PRACTICE.some((p) => p.command === 'Evaluate' && /employee share ownership scheme to reduce labour turnover/.test(p.question))) problems.push('topFix-02: no Evaluate on share ownership and turnover');
  if (!PRACTICE.some((p) => /bank loan/.test(p.question.slice(EXTRACT.length)))) problems.push('topFix-02: no item on financing with a bank loan');
  if (!/Explain one\b/.test(PRACTICE.find((p) => p.command === 'Explain').question)) problems.push('practice-01: the 4-mark Explain is not "Explain one..."');
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
      const tmpl = r.template.join(' ').toLowerCase();
      r.answers.forEach((ans, i) => {
        const h = String(r.hints[i] || '');
        if (String(ans).length >= 3 && h.toLowerCase().startsWith(String(ans).toLowerCase().slice(0, 3))) problems.push(`${where}: hint "${h}" is a prefix of "${ans}"`);
        if (/,/.test(String(ans))) problems.push(`${where}: answer "${ans}" carries a comma`);
        if (r.distractors?.some((d) => String(d).toLowerCase() === String(ans).toLowerCase())) problems.push(`${where}: "${ans}" is both an answer and a distractor`);
        if (tmpl.includes(String(ans).toLowerCase())) problems.push(`${where}: the answer "${ans}" is printed in the template`);
      });
      /* a formula fill-in never sits under the formula it asks for: no sentence on its own step prints the
         answer beside half or more of its line's own content words (stricter than recall.recoverable's 0.70,
         and a different unit: whole sentences AND list items, with the answer as a phrase, not tokens) */
      const sentences = [sec.title, sec.keyIdea, ...sec.body.flatMap((b) => [b.text, ...(b.items || [])]), sec.realExample.text, sec.misconception, sec.examMatters]
        .filter(Boolean).flatMap((x) => String(x).split(/(?<=[.!?:])\s+/)).map((x) => x.toLowerCase().replace(/\*\*/g, ''));
      r.template.forEach((ln, li) => {
        const ans = String(r.answers[li] ?? '').toLowerCase();
        if (!/[a-z]{4,}/.test(ans)) return;
        const own = [...new Set(ln.toLowerCase().replace(/___/g, ' ').split(/[^a-z-]+/).filter((w) => w.length > 4 && !ans.includes(w)))];
        for (const sn of sentences) {
          if (!sn.includes(ans)) continue;
          const shared = own.filter((w) => sn.includes(w));
          if (own.length && shared.length / own.length >= 0.5) { problems.push(`${where}: line ${li + 1}'s answer "${ans}" is printed on its own step beside ${shared.join(', ')}`); break; }
        }
      });
    }
    if (r.type === 'reorder') {
      if (!r.criterion) problems.push(`${where}: a reorder with no criterion`);
      if (r.correctOrder.length < 3 || r.correctOrder.length > 5) problems.push(`${where}: a reorder of ${r.correctOrder.length} items`);
      if (r.why?.length !== r.correctOrder.length) problems.push(`${where}: ${r.why?.length ?? 0} why lines against ${r.correctOrder.length} items`);
      if (r.correctOrder.some((x) => /^(identify|explain|state|show|draw|evaluate|analyse|define|conclude|calculate|compare)\b/i.test(x))) problems.push(`${where}: a reorder item is an exam-procedure step`);
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
  /* topFix-05, named: formula fill-ins for ROCE, gearing, capital employed and labour turnover, and the borrowing chain as a reorder */
  const fills = recalls.filter(([, r]) => r.type === 'fillin').map(([, r]) => [r.template.join(' ').toLowerCase(), r.answers.map((a) => a.toLowerCase())]);
  const has = (pred) => fills.some(([tm, an]) => pred(tm, an));
  if (!has((tm, an) => /roce divides/.test(tm) && an.includes('operating profit'))) problems.push('topFix-05: no fill-in on the ROCE formula');
  if (!has((tm, an) => /gearing ratio divides/.test(tm) && an.includes('capital employed'))) problems.push('topFix-05: no fill-in on the gearing formula');
  if (!has((tm, an) => /adding total equity to/.test(tm) && an.includes('non-current liabilities'))) problems.push('topFix-05: no fill-in on capital employed');
  if (!has((tm, an) => /labour turnover divides/.test(tm) && an.includes('leavers'))) problems.push('topFix-05: no fill-in on the labour turnover formula');
  const chain = recalls.find(([, r]) => r.type === 'reorder' && /loan/i.test(r.correctOrder[0]));
  /* Fix round (founder ruling 26 Sep): loan → interest → gearing, time-anchored (first month / year end / year after those accounts) so no second order is defensible */
  if (!chain || !/interest/i.test(chain[1].correctOrder[1]) || /gearing/i.test(chain[1].correctOrder[1]) || !/gearing/i.test(chain[1].correctOrder[2]) || !/downturn/i.test(chain[1].correctOrder[3])) problems.push('topFix-05: the borrow → interest → gearing → downturn → risk reorder is missing or out of order');
  /* Fix round 3 (verify-a round 2): a relative time anchor must name what it follows. "In the year that follows" let the
     downturn sit before the year-end gearing, and body para 3 narrated falling sales before the year end. So: no bare
     "follows / following year" anywhere in the chain, its why, or its extras source; the downturn names the accounts;
     and any prose on the same step that narrates all three puts interest < year-end gearing < falling sales. */
  if (chain) {
    const BARE = /\b(the year that follows|the following year)\b/i;
    const ANCHORED = /\bafter those accounts\b/i;
    const srcSteps = EXTRAS.chains.find((c) => /loan/i.test(c.title))?.steps ?? [];
    for (const x of [...chain[1].correctOrder, ...(chain[1].why ?? []), ...srcSteps]) if (BARE.test(x)) problems.push(`topFix-05: a relative time anchor names no antecedent: "${x.slice(0, 60)}"`);
    if (!ANCHORED.test(chain[1].correctOrder[3])) problems.push('topFix-05: the downturn item does not anchor to the year-end accounts');
    if (srcSteps[3] && !ANCHORED.test(srcSteps[3])) problems.push('topFix-05: the extras chain\'s downturn step does not anchor to the year-end accounts');
    for (const b of chain[0].body ?? []) {
      const t = String(b.text ?? '');
      const i = t.search(/interest owed/i), g = t.search(/at the year end/i), d = t.search(/sales fell|downturn/i);
      if (d >= 0 && g >= 0 && !(i < g && g < d)) problems.push('topFix-05: the step body narrates falling sales before the year-end gearing');
    }
  }
  /* the reorder's source chain is on the Extras tab in the same order */
  if (chain) {
    const src = EXTRAS.chains.find((c) => /loan/i.test(c.title));
    if (!src || src.steps.length !== chain[1].correctOrder.length) problems.push('topFix-05: the borrowing reorder has no extras chain of the same length to source it');
  }
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
    if (/\bexam|\bmarks?\b|\bexaminer/i.test(s.misconception)) problems.push(`${where}: the misconception is about exam technique, not the subject (structure-10)`);
  }
  const mis = SUBSECTIONS.map((s) => s.misconception.slice(0, 60));
  if (new Set(mis).size !== mis.length) problems.push('two subsections open their misconception the same way');
  for (const b of content) b.takeaway.forEach((x) => { if (x.length > 100) problems.push(`"${b.title}" takeaway over 100 chars: "${x.slice(0, 40)}"`); });
  /* structure-09: no takeaway overclaims ROCE as "the most important", and none is absolute */
  for (const b of content) b.takeaway.forEach((x) => { if (/most important|always|never/i.test(x)) problems.push(`structure-09: an absolute or overclaiming takeaway: "${x}"`); });
  ban(/most important (?:ratio|for investors)|single most important/gi, 'structure-09: the "ROCE is the most important ratio" overclaim');
  const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+|love\s+to\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give|test)/i;
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
  for (const m of MISTAKES) for (const k of ['title', 'mistake', 'correction', 'examTip']) if (!String(m[k] ?? '').trim()) problems.push(`mistake "${m.title}" has no \`${k}\``);
  {
    /* MistakesTab.jsx reads every card through lib/mistakes-shape.js (PR #40). Read that file, here and on
       origin/main (Rule 3), for the field names this section writes. */
    const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
    if (!/readMistake/.test(tab)) problems.push('MistakesTab.jsx no longer reads cards through readMistake; re-check the mistake fields');
    const shapes = [['this branch', readFileSync('lib/mistakes-shape.js', 'utf8')]];
    try { shapes.push(['origin/main', execSync('git show origin/main:lib/mistakes-shape.js', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })]); } catch { problems.push('could not read lib/mistakes-shape.js on origin/main (Rule 3)'); }
    for (const [where, src] of shapes) {
      const list = (name) => (src.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]*)\\]`)) || [])[1] || '';
      if (!/'mistake'/.test(list('WRONG_FIELDS'))) problems.push(`${where}: lib/mistakes-shape.js does not read \`mistake\``);
      if (!/'correction'/.test(list('RIGHT_FIELDS'))) problems.push(`${where}: lib/mistakes-shape.js does not read \`correction\``);
      if (!/examTip/.test(src) || !/item\?\.title/.test(src)) problems.push(`${where}: lib/mistakes-shape.js does not read \`title\` and \`examTip\``);
    }
  }
}
{
  const CUR = [['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['INR', /₹/], ['JPY', /¥/]];
  const used = CUR.filter(([, re]) => readable.some((s) => re.test(s))).map(([c]) => c);
  if (used.length > 1) problems.push(`${used.join(' and ')} both appear; one currency per section`);
  ban(/-\$|\$-/g, 'a hyphen-minus in front of a currency figure');
  ban(/\b(19|20)\d\d\b/g, 'a year — a dated assertion cannot be checked by this programme (accuracy-01)');
  ban(/\bthe UK\b|\bUK\b|\bBritain\b|\bBritish\b|\bLondon\b|\bBrexit\b|\bpound\b/g, 'a UK frame (locale.uk)');
  ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bOfgem\b|\bcouncil tax\b|\bthe Chancellor\b/g, 'a UK-only institution (locale.institution)');
  /* the live section's named real firms and their unverifiable claims, and the one topFix-04 proposed (accuracy-01, topFix-04) */
  ban(/\bTesla\b|\bApple\b|\bSamsung\b|\bTesco\b|\bLVMH\b|\bEvergrande\b|\bSwiftDeliver\b/g, 'a named real firm (or the live off-spec case) from the live section');
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
  const barsOf = (svg) => [...svg.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)" height="([-\d.]+)"[^>]*fill="#/g)].map((m) => m.slice(1, 5).map(Number));
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
  /* a label drawn ON a filled bar is unreadable after the theme remap: the bars are a second obstacle */
  const onBar = (bx, [x, y, w, h]) => bx.left < x + w && bx.right > x && bx.top < y + h && bx.bottom > y;
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
      const bars = barsOf(scenario.svg).filter(([, , w, h]) => !(w <= 20 && h <= 10));   // legend swatches excepted
      for (const bx of boxes) for (const b of bars) if (onBar(bx, b)) problems.push(`${where}: "${bx.body.slice(0, 26)}" is drawn on a filled bar at (${b[0]},${b[1]})`);
    }
  }
  {
    const mk = (body, x, y, size, anchor = 'start') => boxesOf(`<svg viewBox="0 0 400 300"><text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${body}</text></svg>`)[0];
    if (!collides(mk('Gearing', 300, 100, 12), mk('ROCE', 300, 110, 12))) problems.push('the collision guard does not fire on two labels 10 units apart');
    if (collides(mk('Gearing', 300, 100, 12), mk('ROCE', 300, 120, 12))) problems.push('the collision guard fires on two labels a clear row apart');
    if (!(LEAD > COLLIDE_TOL * SMALL)) problems.push(`LEAD ${LEAD} does not clear the guard's bound at the caption face`);
    if (!crossed({ x1: 200, y1: 20, x2: 200, y2: 240 }, mk('Retention', 188, 120, 12))) problems.push('the line check does not see a vertical line drawn through a label');
    if (!onBar(mk('$40m', 200, 60, 12), [190, 50, 100, 14])) problems.push('the on-bar check does not see a label drawn on a bar');
    if (onBar(mk('$40m', 300, 60, 12), [190, 50, 100, 14])) problems.push('the on-bar check fires on a label beside a bar');
  }
  /* the figures the teaching states are countable back OUT of the emitted SVG (a second source) */
  const want = (i, list, what) => { const s = svgOf(ALL_DIAGRAMS[i]).join(' ') + ALL_DIAGRAMS[i].checklist.join(' '); for (const x of list) if (!s.includes(x)) problems.push(`the ${what} diagram does not print "${x}"`); };
  want(0, [usdm(T.revenue), usdm(T.cos), usdm(T.gp), usdm(T.opex), usdm(T.op), usdm(T.interest), usdm(T.pfy), usdm(PT.nca), usdm(PT.ca), usdm(PT.cl), usdm(PT.ncl), usdm(PT.equity)], 'statements');
  want(1, [pct(L.gpm), pct(T.gpm), pct(L.pfym), pct(T.pfym), pct(PL.roce), pct(PT.roce), ratio(PL.current), ratio(PT.current), ratio(PL.acid), ratio(PT.acid), pct(PL.gearing), pct(PT.gearing)], 'ratios');
  want(2, ['21.3c', '38c', '3.6c', '−2c'], 'gearing');
  want(3, ['3,200', '3,000', pct(F.HL.turnover), pct(F.HT.turnover), pct(F.HL.retention), pct(F.HT.retention), pct(F.HL.absence), pct(F.HT.absence)], 'workforce');
  want(4, [usd(F.turnoverCostT), usd(F.esopCost), usd(PAYGAP)], 'strategies');
  /* THE CHECK-IN KEY: no pinned item's key is printed on its own chapter's diagram */
  const surfaces = (d) => [d.title, d.description, ...d.checklist, ...d.scenarios.map((s) => s.label), ...d.scenarios.flatMap((s) => textsOf(s.svg).map((x) => x.body))].join(' | ').toLowerCase();
  const figs = (s) => [...String(s).matchAll(/\$?\d[\d,]*(?:\.\d+)?(?:%|:1|m)?/g)].map((m) => m[0]).filter((x) => /[$%:m]/.test(x) || Number(x.replace(/,/g, '')) >= 13);
  const hasFig = (surf, f) => new RegExp(`(^|[^\\d.])${f.replace(/[.*+?^${}()|[\]\\$]/g, '\\$&')}(?![\\d.])`).test(surf);
  content.forEach((b, bi) => {
    const surf = surfaces(DIAGRAMS[bi]);
    for (const qi of b.quizIndices) {
      const q = QUIZ[qi];
      const key = q.options[q.correctIndex];
      if (surf.includes(key.toLowerCase())) problems.push(`"${b.title}": the key "${key}" of a pinned item is printed on the chapter's diagram`);
      for (const f of figs(key)) if (!q.question.includes(f) && hasFig(surf, f.toLowerCase())) problems.push(`"${b.title}": the key figure ${f} of a pinned item is printed on the chapter's diagram`);
    }
  });
  {
    /* A/B the key check: a figure that IS on the diagram must be caught, and a longer one must not be */
    const surf = surfaces(DIAGRAMS[1]);
    if (!hasFig(surf, '33.3%')) problems.push('the check-in key check cannot see a figure printed on the ratios diagram');
    if (hasFig(surf, '3.3%')) problems.push('the check-in key check reads "3.3%" inside "33.3%"');
  }
}

/* ══ 11 · THE LEDGER ITEMS, EACH ASSERTED AT ITS SOURCE ═════════════════════ */
{
  const subText = (slug) => { const s = SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)); return [s.title, s.keyIdea, ...s.body.flatMap((b) => [b.text, ...(b.items || [])]), s.realExample.text, s.misconception, s.examMatters].join(' ').toLowerCase(); };
  const need = (slug, words, idl) => { const h = subText(slug); for (const w of words) if (!h.includes(w)) problems.push(`${idl}: ${slug} never says "${w}"`); };
  need('statement-of-comprehensive-income', ['statement of comprehensive income', 'key information', 'revenue', 'cost of sales', 'gross profit', 'other operating expenses', 'operating profit', 'interest', 'profit for the year'], 'specGap-01/specThin-01/topFix-01');
  need('statement-of-financial-position', ['statement of financial position', 'key information', 'non-current assets', 'current assets', 'current liabilities', 'non-current liabilities', 'total equity', 'net assets'], 'specGap-01/topFix-01');
  need('stakeholder-interest-in-the-statements', ['stakeholder interest', 'shareholders', 'lenders', 'suppliers', 'employees', 'managers', 'government'], 'specGap-02/topFix-01');
  need('liquidity-current-and-acid-test-ratios', ['acid test', 'below 1:1', 'depends on the business'], 'topFix-04 (current-ratio qualifier)');
  need('gearing-ratio', ['gearing', 'financial risk', 'utility'], 'structure-07/structure-10');
  need('interpreting-roce-and-margins', ['interest', 'borrow', 'shareholders', 'rivals', 'decision'], 'specGap-06/structure-05');
  need('interpreting-liquidity-and-gearing', ['gearing', 'liquidity', 'new shares', 'loan'], 'structure-07');
  need('limitations-of-ratio-analysis', ['window dressing', 'historical', 'accounting', 'inflation', 'staff morale'], 'specGap-03');
  need('labour-productivity', ['labour productivity', 'output'], 'specGap-04/topFix-01');
  need('labour-turnover-and-retention', ['labour turnover', 'retention'], 'specGap-04/quiz-01/topFix-01');
  need('absenteeism', ['absenteeism', 'possible'], 'specGap-04/topFix-01');
  need('limitations-of-these-calculations', ['limitations of these calculations', 'averages', 'quality'], 'specGap-04/topFix-01');
  need('financial-rewards', ['financial rewards', 'turnover', 'productivity', 'absenteeism', 'retention'], 'specGap-05/topFix-01');
  need('employee-share-ownership', ['employee share ownership', 'vest'], 'specGap-05/topFix-01');
  need('consultation-strategies', ['consultation strategies'], 'specGap-05/topFix-01');
  need('empowerment-strategies', ['empowerment strategies', 'authority'], 'specGap-05/quiz-02/topFix-01');
  /* structure-07: the ROCE real example (Tesla) sat in the liquidity/gearing step; now every step's example is its own topic */
  const ex = (slug) => SUBSECTIONS.find((x) => x.id.endsWith(`:${slug}`)).realExample.text;
  if (!/current ratio/i.test(ex('liquidity-current-and-acid-test-ratios'))) problems.push('structure-07: the liquidity step\'s example is not about liquidity');
  if (!/bank loans|interest/i.test(ex('gearing-ratio'))) problems.push('structure-07: the gearing step\'s example is not about borrowing');
  if (!/ROCE/.test(ex('return-on-capital-employed'))) problems.push('topFix-04: the ROCE example is not on the ROCE step');
  /* structure-01/specGap-07/topFix-03: no block survives from the live section except by being rebuilt */
  if (content.some((b) => /Core Competencies|Financial Ratios/.test(b.title))) problems.push('a live block title survived');
}

/* ══ 12 · THE VALIDATOR ═════════════════════════════════════════════════════ */
const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content) || !Array.isArray(live?.quiz)) {
  console.error('the live bundle has no content/quiz array — a missing await, or the row is gone'); process.exit(1);
}
const ctx = await contextFor(SECTION);
if (ctx.number !== '3.3.5' || ctx.unitCode !== 'WBS13') problems.push(`the database says this section is ${ctx.number} / ${ctx.unitCode}, not 3.3.5 / WBS13 — structure-08's renumbering would be the regression`);
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

console.log(`\n${SECTION} — packet 54`);
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
  SCOPE      3.3.5 only. VRIO / core competencies, Bowman's clock, Porter, benchmarking, "competitive
             advantage" and the command words and tariffs this paper does not set are banned, each
             A/B'd both ways and each re-measured against bus_spec.txt; the operating profit margin
             is pointer-only (2.3.3), one mention
  NUMBERING  the oracle re-read (23 rows / 18 leaves), every leaf mapped and its own words found in
             its subsections, three headings asserted by line, "3.5.1"-"3.5.3" / "3.1.2" / "3.1.4"
             asserted ABSENT, and the database's own 3.3.5 / WBS13 asserted
  FORMULAE   Appendix 9 parsed for all seven, each printed in that form; accuracy-03's card checked
  ARITHMETIC both statements balanced and re-added by hand, every ratio and workforce measure, the
             gearing-magnifies example, and every recall and quiz key recomputed independently
  PINS       derived from each item's block tag; five blocks of three or four subsections, each with
             its own diagram, quiz and practice; no diagramRef; 8 free quiz items against 10
  QUIZ       keys dealt from a hash, histogram measured, no length tell, no letter, no ordinal, no
             near-duplicate stems, nothing tested that no subsection teaches
  PRACTICE   Appendix 6 parsed including Assess 10/12; the set is ial-paper-structure.json's Units
             3-4 Section A (4/4/8/12/12) plus two Evaluate essays, all on one source that carries
             every figure; stems name the firm; openings clean; levels naming K/App/An/Ev above 6
  RECALLS    ${SUBSECTIONS.length} of ${SUBSECTIONS.length}, all four types, the four formula fill-ins each one step after
             its formula and its answer absent from its own step, the borrowing chain as a reorder
             sourced from an extras chain, and the shared recall.recoverable measure at 0
  DIAGRAMS   ${ALL_DIAGRAMS.length} on a ${FRAME.w}-unit frame, palette parsed, extent, box fit, collisions and labels on
             bars checked on the emitted SVG with each guard A/B'd, figures counted back out of the
             SVG, and no pinned key printed on its own chapter's diagram`);

if (DUMP) {
  const path = `audit/snapshots/packet-54-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-54-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
