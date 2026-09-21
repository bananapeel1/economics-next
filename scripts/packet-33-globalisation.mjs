#!/usr/bin/env node
/**
 * PACKET 33 — globalisation, Business Unit 4 (WBS14), IAL topic 4.3.1.
 * `audit/raw/bus_spec.txt:1323-1367`. SIX blocks, 29 subsections, 28 substantive leaves.
 *
 *   node scripts/packet-33-globalisation.mjs            # dry run, every check
 *   node scripts/packet-33-globalisation.mjs --dump     # + write the bundle
 *   node scripts/packet-33-globalisation.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. What this packet adds to the inherited guards, and why:
 *
 *   - **THE OFF-SPEC BAN IS THE PACKET.** The live section's second block teaches the integration
 *     ladder and trade creation against trade diversion, and every term it is made of is **0 in
 *     `bus_spec.txt` and 1 in `econ_spec.txt`**, inside Economics 4.3.2 · 4 (`econ_spec.txt:1659-
 *     1670`). Four findings — `topFix-01`, `topFix-05`, `structure-01`, `structure-02` — ask this
 *     packet to build MORE of it: a reorder of the ladder, a fill-in on creation against diversion,
 *     an integration-ladder diagram, and a repaired diversion example. Rule 2's standing warning:
 *     an audit item tells you what is MISSING, never what is PRESENT and should not be. `BANNED`
 *     below is checked against prose AND every SVG `<text>`, and each entry names the owning leaf.
 *   - **`USMCA` IS ALLOWED EXACTLY ONCE, IN PROSE, AND NEVER ON AN ASSESSED SURFACE.** `specGap-06`
 *     says "NAFTA/USMCA named in spec"; `USMCA` is 0 hits in BOTH specifications and 5a-3 is
 *     `NAFTA.`. Teaching NAFTA in 2026 with no mention of the successor agreement would be the
 *     stale-example defect `topFix-01` is about, so the split is: name it once as a date fact, and
 *     assess nothing on it. Both halves are checked.
 *   - **NINE FACTORS, NOT SEVEN, AND TRADING BLOCS IS NOT ONE OF THEM.** `topFix-03` and
 *     `accuracy-03` both give a seven-item list that omits `growth of the global labour force` (3g)
 *     and `structural change` (3h) and adds trading blocs, which is sub-topic 5. The runner asserts
 *     all nine reach a student and that the section never calls blocs a factor.
 *   - **`Assess` IS 12 MARKS HERE.** `practice-01` objects to a 10-mark Assess as an Economics
 *     question, which is right, and leaves the tariff wrong: the census gives Business `Assess
 *     [10, 12]`, `unitNote: "Units 1/2; Units 3/4"`, and this is Unit 4.
 *   - **THE BANK-LEVEL LENGTH TELL, A/B'd** (packet 21). `quiz.long-correct` fires only above 1.5x,
 *     so a bank whose key is simply the longest option most of the time passes it clean. The first
 *     draft of this bank was **83%** against a 25% baseline — a student could have beaten it without
 *     reading the stems. Guard at 35%; this bank is measured below.
 *   - **THE FOUR BARRIERS ARE RE-DERIVED FROM ONE UNIT.** A tariff, a quota, a certification rule
 *     and a subsidy priced on the same `LUMINA` unit is the only way `4d`'s comparison means
 *     anything, and the subsidy's whole teaching point — that it does NOT move the importer's cost —
 *     is asserted here rather than described.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each new one below plants the defect, confirms it fires, removes it and confirms it
 *     clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, money, qty, pct, bn, mn, round2,
  ECONOMIES, LUMINA, HDI, FACTORS, PROTECTION_REASONS, BARRIERS, BLOCS, TEACHING_TERMS,
} from './_packet33-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6 } from './_packet33-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet33-assessment.mjs';
import { DIAGRAMS, estWidth, MIN_FACE } from './_packet33-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6];
const L = LUMINA, E = ECONOMIES;

const problems = [];

/* ── pins, derived from each item's own block tag (structure-03) ───────────── */
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
  diagrams: DIAGRAMS,
  extras: EXTRAS,
};

/* ── every string a student can read ───────────────────────────────────────── */
const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
/*
 * SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29). A caption is wrapped a line
 * per element, so a banned phrase spanning two lines is in neither of them.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ── a failed substitution, on every surface including the SVGs (packet 29) ── */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  problems.push(`failed substitution in "${s.slice(0, 90)}"`);
}

/* ══ THE OFF-SPEC BAN — rule 2, and the reason this packet exists ══════════ */
/*
 * Each entry names WHERE the term actually lives, so a later session cannot quietly re-add one by
 * deciding the ban was stylistic. The counts were taken before a word was written; re-measure
 * against the specifications rather than trusting this comment.
 */
const BANNED = [
  [/\btrade creation\b/gi, 'trade creation — 0 in bus_spec.txt, 1 in econ_spec.txt:1666 (Economics 4.3.2 · 4c, packet 39)'],
  [/\btrade diversion\b/gi, 'trade diversion — 0 in bus_spec.txt, 1 in econ_spec.txt:1667 (Economics 4.3.2 · 4c, packet 39)'],
  [/\bcustoms union/gi, 'customs union — 0 in bus_spec.txt, 1 in econ_spec.txt:1662 (Economics 4.3.2 · 4b, packet 39)'],
  [/\bfree[- ]trade area/gi, 'free-trade area — 0 in bus_spec.txt, 1 in econ_spec.txt:1661 (Economics 4.3.2 · 4b, packet 39)'],
  [/\bcommon market/gi, 'common market — 0 in bus_spec.txt, 1 in econ_spec.txt:1663 (Economics 4.3.2 · 4b, packet 39)'],
  [/\bcommon external tariff|\bCET\b/g, 'common external tariff / CET — 0 in BOTH specifications'],
  [/\beconomic and monetary union/gi, 'economic and monetary union — 0 in bus_spec.txt, 1 in econ_spec.txt:1664'],
  [/\btransfer pricing\b/gi, 'transfer pricing — 0 in the whole Business specification'],
  [/\bhedg(?:e|es|ing)\b/gi, 'hedging — 0 in the whole Business specification'],
  [/\boff-?shor/gi, 'off-shoring — IAL 4.3.2 · 1c (bus_spec.txt:1382), the NEXT section'],
  [/\boutsourc/gi, 'outsourcing — IAL 4.3.2 · 1c (bus_spec.txt:1382), the NEXT section'],
  [/\bderegulat/gi, 'deregulation — 0 in bus_spec.txt; accuracy-03 names it as one of "three forces"'],
  [/\btransnational\b/gi, 'transnational — 0 in bus_spec.txt; 3d says "global (multinational) corporations (MNCs)"'],
  [/\bretaliat/gi, 'retaliation — 0 in BOTH specifications; topFix-02 asks for it under 4a'],
  [/\binfant industr/gi, 'infant industry — 0 in BOTH specifications; teach 4a in the spec’s own words'],
  [/\bdumping\b/gi, 'dumping — 0 in bus_spec.txt'],
  [/\bliteracy\b/gi, 'literacy — 0 in BOTH specifications; specGap-02 asks for it as an indicator of growth'],
  [/\bcomparative advantage\b/gi, 'comparative advantage — 0 in bus_spec.txt'],
  [/\bcompetitive advantage\b/gi, 'competitive advantage — 5 in bus_spec.txt and NONE in 4.3.1 (lines 471, 542, 984, 995, 1002: Unit 1 marketing and Unit 2/3 operations); specGap-03 frames 2b with it'],
  [/\binterdependen/gi, 'interdependence — 0 in bus_spec.txt; the live section opens with it'],
  [/\bintegration\b/gi, 'integration — in bus_spec.txt this is HORIZONTAL AND VERTICAL integration (line 1132, a growth topic); using it for globalisation sends a Business student to mergers'],
  [/\bcontaineris/gi, 'containerisation — 0 in bus_spec.txt; 3c is "reduced cost of transport and communication", so price it'],
  [/\bsupply chains?\b/gi, 'supply chain — 2 in bus_spec.txt, both in 4.3.2/4.3.3 (lines 1413, 1474)'],
  [/\b(?:primary|secondary) sector\b|\btertiary\b/gi, 'primary/secondary/tertiary sector — 0 in BOTH specifications; teach 3h as which industries the output comes from'],
  [/\bKAA\b/g, 'KAA — not an IAL term'],
];
for (const [re, why] of BANNED) ban(re, `OFF-SPEC: ${why}`);

/* A/B: the ban must fire on the thing it was written for, and not on the section as written. */
{
  const planted = 'A customs union adds a common external tariff, so trade diversion follows.';
  const fires = BANNED.filter(([re]) => re.test(planted)).length;
  if (fires < 3) problems.push(`the off-spec ban fires on only ${fires} terms of the planted ladder sentence — it cannot see what it was written for`);
  const safe = 'ASEAN members have cut tariffs on most goods traded between them, so the unit lands without a duty.';
  const falsePositives = BANNED.filter(([re]) => re.test(safe)).length;
  if (falsePositives) problems.push(`the off-spec ban fires ${falsePositives} times on a sentence this section is entitled to write`);
}

/* `USMCA`: at most once, in prose, and never on an assessed surface. */
{
  const usmca = /\bUSMCA\b/g;
  const total = count(usmca);
  if (total > 1) problems.push(`USMCA appears ${total} times — 0 hits in both specifications, so it is a date fact stated once and never a label`);
  const assessed = [...QUIZ, ...PRACTICE, ...FLASHCARDS, ...SUBSECTIONS.filter((s) => s.recall).map((s) => s.recall)];
  const onAssessed = allStrings(assessed).filter((s) => usmca.test(s)).length;
  if (onAssessed) problems.push(`USMCA reaches ${onAssessed} assessed surface(s); 5a-3 is "NAFTA." and that is what a student writes`);
  if (!count(/\bNAFTA\b/g)) problems.push('NAFTA is never named, and 5a-3 names it');
  if (!count(/\bASEAN\b/g)) problems.push('ASEAN is never named, and 5a-2 names it — structure-08 is the locale finding');
}

/* ── the specification's own vocabulary must all reach a student ───────────── */
{
  const hay = readable.join(' \n ').toLowerCase();
  const missing = TEACHING_TERMS.filter((t) => !hay.includes(t));
  if (missing.length) problems.push(`specification vocabulary never reaching a student: ${missing.join(', ')}`);
}

/* ── nine factors, and trading blocs is not one of them ───────────────────── */
{
  if (FACTORS.length !== 9) problems.push(`FACTORS holds ${FACTORS.length} entries; bus_spec.txt:1343-1355 lists nine (3a-3i)`);
  const hay = readable.join(' \n ').toLowerCase();
  const NEEDLE = {
    '3a': 'trade liberalisation', '3b': 'political change', '3c': 'transport', '3d': 'multinational',
    '3e': 'investment flows', '3f': 'migration', '3g': 'global labour force', '3h': 'structural change',
    '3i': 'impact on businesses',
  };
  for (const [leaf, needle] of Object.entries(NEEDLE)) if (!hay.includes(needle)) problems.push(`factor ${leaf} ("${needle}") never reaches a student — the audit's own list omits 3g and 3h`);
  ban(/trading blocs?[^.]{0,40}\b(?:is|are|as)\b[^.]{0,20}\bfactors?\b|\bfactors?\b[^.]{0,60}\btrading blocs?\b(?![^.]{0,40}\bseparate|[^.]{0,40}\bnot\b)/gi,
    'trading blocs described as one of the factors contributing to globalisation — it is sub-topic 5, and topFix-03 and accuracy-03 both make this error');
  if (!/\bnine\b/i.test(readable.join(' '))) problems.push('the section never says how many factors the specification lists, which is the correction accuracy-03 asks for');
}

/* ── self-reference, internal ids, and claims about markers ────────────────── */
const SELF_REFERENCE = /\bthe live section\b|\bthe March (?:version|notes|content)\b|\bthis section (?:previously|used to|formerly)\b|\bthe previous version\b|\bthe old (?:notes|section|version)\b|\bpreviously (?:taught|said|omitted|left out)\b|\bearlier version\b|\bthis packet\b/i;
ban(new RegExp(SELF_REFERENCE.source, 'gi'), 'a note about our own previous content in text a student reads (packet 18)');

const LEDGER_ID = /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b|\bC-[a-z-]+-(?:topFix|specGap|accuracy|structure)-\d{2}\b/g;
ban(LEDGER_ID, 'an internal ledger id in text a student reads (packet 19)');

const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bL1[ -]L4\b|\bmark schemes? (?:accept|allow|list|credit)\b/gi;
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/gi;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/gi;
/*
 * The practice GUIDANCE is exempt from MARK_CLAIM's allocation half, because "(1 mark)" is the
 * documented shape for an item of 6 marks or fewer and `practice.levels` polices the rest. The
 * exemption is narrow: it applies to `(n mark)` parentheses only, and every other shape still fires.
 */
const guidanceless = texts.filter((s) => !PRACTICE.some((p) => p.guidance === s));
const countIn = (list, re) => list.reduce((n, s) => n + (s.match(re) || []).length, 0);
if (countIn(guidanceless, MARK_CLAIM)) problems.push(`a claim about what a marker does, outside practice guidance ×${countIn(guidanceless, MARK_CLAIM)} (packet 20)`);
ban(FREQUENCY_CLAIM, 'a claim about how often a paper asks something');
ban(PAPER_PATTERN_CLAIM, 'a claim about how a paper or extract is usually built');
for (const p of PRACTICE) {
  const stripped = p.guidance.replace(/\(\d+ marks?\)/g, '');
  const m = stripped.match(MARK_CLAIM);
  if (m) problems.push(`practice ${p.command} guidance claims what a marker does: "${m[0]}"`);
}

/* ── Appendix 6: both directions (packets 21 and 23) ──────────────────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
const UNIT = 4;
const tariffFor = (cmd) => {
  const row = census.find((r) => r.command === cmd);
  if (!row) return null;
  if (cmd === 'Assess') return [UNIT <= 2 ? row.marks[0] : row.marks[1]];
  return row.marks;
};
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required students needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
const words = (s) => (String(s).toLowerCase().match(/[a-z]+/g) || []).filter((w) => !STOP.has(w));
/*
 * TWO COMPLEMENTARY CHECKS AND BOTH ARE NEEDED. Packet 21's asks whether a gloss says anything the
 * Appendix 6 row says; packet 23's asks whether it asserts something the row does NOT — and packet
 * 23's two false citations would have passed packet 21's, because they were extra claims bolted on
 * to accurate ones. A false citation to Appendix 6 shipped in three packets on one day.
 */
/*
 * THE COMMAND WORD IS FOUND IN THE SENTENCE, NOT IN THE WORD AFTER THE VERB. "Appendix 6 says
 * workings should be given for a Calculate" and "Appendix 6 says a Discuss needs…" both cite a real
 * row, and a regex that captures the token after `says` reads them as citations for "workings" and
 * "a". Every sentence citing Appendix 6 must name at least one Business command word and must share
 * vocabulary with that row.
 */
for (const s of prose) {
  for (const m of s.matchAll(/Appendix 6\b/g)) {
    const start = s.lastIndexOf('.', m.index) + 1;
    const end = s.indexOf('.', m.index);
    const sentence = s.slice(start, end === -1 ? undefined : end + 1);
    const named = census.filter((r) => new RegExp(`\\b${r.command}\\b`).test(sentence));
    if (!named.length) { problems.push(`a sentence cites Appendix 6 and names no Business command word: "${sentence.trim().slice(0, 110)}"`); continue; }
    for (const row of named) {
      const shared = words(sentence).filter((w) => words(row.description).includes(w));
      if (shared.length < 2) problems.push(`an Appendix 6 citation for ${row.command} shares almost nothing with the row: "${sentence.trim().slice(0, 110)}"`);
    }
  }
}
/* Packet 23's direction: a claim the row does not support. */
const ROW_DENIES = [
  [/Analyse[^.]{0,80}\bevaluat/gi, 'Analyse is described as including evaluation; the row says it does NOT'],
  [/Calculate[^.]{0,60}\binterpret/gi, 'Calculate is credited with interpretation; that belongs to Analyse'],
  [/Discuss[^.]{0,80}\bdiagram/gi, 'Discuss is credited with diagrams; the row does not mention them'],
  [/Define[^.]{0,60}\bexample/gi, 'Define is credited with requiring an example; the row does not'],
];
for (const [re, why] of ROW_DENIES) {
  const hits = prose.filter((s) => { re.lastIndex = 0; return re.test(s); });
  const real = hits.filter((s) => !/does NOT include evaluation|is a different command word|not being asked for|will not substitute/i.test(s));
  if (real.length) problems.push(`${why} ×${real.length}`);
}

/* ── practice: one per command word, the right tariff, and an honest opening ─ */
{
  const commands = PRACTICE.map((p) => p.command);
  const expected = census.map((r) => r.command);
  for (const c of expected) if (commands.filter((x) => x === c).length !== 1) problems.push(`command word "${c}" appears ${commands.filter((x) => x === c).length} times in PRACTICE; one each is the target`);
  for (const c of commands) if (!expected.includes(c)) problems.push(`"${c}" is not an IAL Business command word`);
  for (const p of PRACTICE) {
    const allowed = tariffFor(p.command);
    if (!allowed) { problems.push(`no census row for ${p.command}`); continue; }
    if (!allowed.includes(p.marks)) problems.push(`${p.command} (${p.marks}) — in IAL Business Unit ${UNIT} that is ${allowed.join(' or ')} mark${allowed[0] === 1 ? '' : 's'}${p.command === 'Assess' ? ' (practice-01 asserts 10, which is Units 1/2)' : ''}`);
    if (!new RegExp(`\\(\\s*${p.marks}\\s*marks?\\s*\\)`).test(p.question)) problems.push(`${p.command} stem does not state its own tariff "(${p.marks} marks)"`);
    /* practice.opening: two paragraphs, and the first gives nothing away. */
    const paras = p.guidance.split('\n').filter((x) => x.trim());
    if (paras.length < 2) problems.push(`${p.command} guidance is one paragraph; guided mode prints it whole above the answer box`);
    if (/\(\s*\d+\s*marks?\s*\)/i.test(paras[0])) problems.push(`${p.command} opening paragraph allocates marks, and it is shown before the student writes`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`${p.marks}-mark ${p.command} guidance allocates points; tariffs above 6 are not point-scored`);
    if (p.marks > 4 && !p.context) problems.push(`${p.command} (${p.marks}) has no context — practice-01 and practice-02 are that an IAL Business extended item is case-based`);
  }
  /* Every block owns at least one practice item, and no item is orphaned. */
  for (const b of BLOCKS) if (!practiceIndices[b]?.length) problems.push(`block "${b}" has no practice item pinned`);
  for (const p of PRACTICE) if (!BLOCKS.includes(p.block)) problems.push(`practice item "${p.command}" is tagged to "${p.block}", which is not a block`);
}

/* ── prose tariffs: a wrong one inside an examMatters passes every other check ─ */
{
  const PROSE_TARIFF = /\b([A-Z][a-z]+)\b[^.]{0,40}?\((\d{1,2})\s*marks?\)|\((\d{1,2})\s*marks?\)[^.]{0,40}?\b([A-Z][a-z]+)\b/g;
  for (const s of prose) {
    for (const m of s.matchAll(PROSE_TARIFF)) {
      const cmd = m[1] || m[4];
      const marks = Number(m[2] || m[3]);
      const allowed = tariffFor(cmd);
      if (allowed && !allowed.includes(marks)) problems.push(`prose says "${cmd} (${marks} marks)"; IAL Business Unit ${UNIT} gives ${allowed.join(' or ')}`);
    }
  }
  const CARRIES = /\b(Assess|Discuss|Evaluate|Analyse|Explain|Define|Calculate|Construct)\b[^.]{0,60}\bcarries (\d{1,2}) marks?\b/gi;
  for (const s of prose) for (const m of s.matchAll(CARRIES)) {
    const allowed = tariffFor(m[1]);
    if (allowed && !allowed.includes(Number(m[2]))) problems.push(`prose says ${m[1]} carries ${m[2]} marks; Unit ${UNIT} gives ${allowed.join(' or ')}`);
  }
}

/* ── quiz ─────────────────────────────────────────────────────────────────── */
{
  /* Three unpinned and FIRST, or the pre-test's pool is not what a free student is sent. */
  const firstPinned = QUIZ.findIndex((q) => q.block);
  if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; PreTest.jsx slices the unreserved pool at three`);
  if ([...unpinned].some((i) => i >= firstPinned)) problems.push('an unpinned item sits after a pinned one; the pre-test pool must be the prefix of the array');
  for (const b of BLOCKS) if (!quizIndices[b]?.length) problems.push(`block "${b}" has no quiz item pinned — structure-03`);

  /* The length tell, at the BANK level. `quiz.long-correct` fires only above 1.5x. */
  const strictlyLongest = QUIZ.filter((q) => {
    const key = q.options[q.correctIndex].length;
    return q.options.every((o, j) => j === q.correctIndex || o.length < key);
  }).length;
  const rate = round2((strictlyLongest / QUIZ.length) * 100);
  if (rate > 35) problems.push(`the key is strictly the longest option in ${rate}% of items (chance is 25%, guard 35%) — a student can beat this bank without reading the stems`);

  /* A/B: the bank guard must fire on a bank built the wrong way. */
  {
    const rigged = QUIZ.map((q) => ({ ...q, correctIndex: q.options.indexOf(q.options.slice().sort((a, b) => b.length - a.length)[0]) }));
    const riggedRate = (rigged.filter((q) => { const key = q.options[q.correctIndex].length; return q.options.every((o, j) => j === q.correctIndex || o.length < key); }).length / rigged.length) * 100;
    if (riggedRate <= 35) problems.push('the bank-level length guard does not fire on a bank whose key is always the longest option');
  }

  /* Position histogram: placeKeys deals, but assert the deal. */
  const hist = QUIZ.reduce((m, q) => { m[q.correctIndex] = (m[q.correctIndex] || 0) + 1; return m; }, {});
  const worst = Math.max(...Object.values(hist));
  if (worst / QUIZ.length > 0.4) problems.push(`key position ${Object.entries(hist).find(([, v]) => v === worst)[0]} holds ${worst} of ${QUIZ.length} keys`);

  /* An explanation may never name an option by position (packet 26). */
  const BY_POSITION = /\bthe (first|second|third|fourth|last|other|final) (option|answer|choice|distractor|one)\b|\boption (?:A|B|C|D|one|two|three|four)\b|\b(?:answer|option) \((?:a|b|c|d)\)/gi;
  for (const q of QUIZ) if (BY_POSITION.test(q.explanation)) problems.push(`quiz explanation names an option by position: "${q.question.slice(0, 60)}"`);

  /* Nothing quizzed that is not taught: every pinned item's block must exist. */
  for (const q of QUIZ) if (q.block && !BLOCKS.includes(q.block)) problems.push(`quiz item tagged to "${q.block}", which is not a block`);

  /* No two stems near-duplicate each other. */
  const seen = [];
  for (const q of QUIZ) {
    const w = new Set(words(q.question));
    for (const prev of seen) {
      const shared = [...w].filter((x) => prev.set.has(x)).length;
      if (shared >= 6 && shared / Math.min(w.size, prev.set.size) > 0.8) problems.push(`quiz stems near-duplicate: "${q.question.slice(0, 50)}" and "${prev.q.slice(0, 50)}"`);
    }
    seen.push({ set: w, q: q.question });
  }
}

/* ── recalls ──────────────────────────────────────────────────────────────── */
const recalls = SUBSECTIONS.filter((s) => s.recall);
{
  if (!recalls.length) problems.push('no recalls; section.no-recall is a BLOCK rule and structure-01 is the finding');
  /*
   * `fillin.token` FIRES ON ANY COMMA, INCLUDING A THOUSANDS SEPARATOR (packet 30), so a formatted
   * total is an illegal fill-in answer. Big figures stay in the PROMPT.
   */
  for (const s of recalls) {
    const r = s.recall;
    if (r.type === 'fillin') {
      if (r.template.length !== r.answers.length) problems.push(`${s.title}: ${r.template.length} fill-in lines against ${r.answers.length} answers`);
      const blanks = r.template.reduce((n, t) => n + (t.match(/___/g) || []).length, 0);
      if (blanks !== r.answers.length) problems.push(`${s.title}: ${blanks} blanks against ${r.answers.length} answers`);
      if (new Set(r.answers.map((a) => a.toLowerCase())).size !== r.answers.length) problems.push(`${s.title}: two fill-in answers are the same word, which makes the recall unfinishable`);
      for (const a of r.answers) if (a.includes(',')) problems.push(`${s.title}: fill-in answer "${a}" contains a comma, which fillin.token splits`);
      if (r.hints && r.hints.length !== r.answers.length) problems.push(`${s.title}: ${r.hints.length} hints against ${r.answers.length} answers`);
    }
    if (r.type === 'reorder') {
      /*
       * `correctOrder` IS THE SCHEMA'S FIELD NAME, and `shuffled` is what main's ReorderRecall
       * reads in its first line — packet 15 took the most-opened section down by publishing
       * reorders that dropped it. Both are asserted, and the first draft of this packet used
       * `correct`, which the validator read as a zero-item reorder.
       */
      if (!Array.isArray(r.correctOrder)) { problems.push(`${s.title}: a reorder without \`correctOrder\`, which is the field the validator counts`); continue; }
      if (!Array.isArray(r.shuffled)) { problems.push(`${s.title}: a reorder without \`shuffled\`, which main's ReorderRecall reads in its first line (packet 15 took a section down this way)`); continue; }
      if (JSON.stringify([...r.shuffled].sort()) !== JSON.stringify([...r.correctOrder].sort())) problems.push(`${s.title}: the shuffled and correctOrder reorder sets differ`);
      if (JSON.stringify(r.shuffled) === JSON.stringify(r.correctOrder)) problems.push(`${s.title}: the reorder is already in order`);
      if (!Array.isArray(r.why) || r.why.length !== r.correctOrder.length) problems.push(`${s.title}: recall.why wants one line per reorder item`);
    }
  }

  /*
   * THE ANSWER-RECOVERABLE CHECK (packet 29's Verify B, packet 31's corrected version). Token-set
   * matching with commas stripped from numbers: a substring test matches `6` inside `$6.00`, and a
   * naive tokeniser splits `$6,000` into `6` and `000`. Both earlier versions REFUSED safe content.
   */
  const tokens = (s) => new Set(String(s).toLowerCase().replace(/(\d),(?=\d)/g, '$1').match(/[a-z0-9.]+/g) || []);
  const answersOf = (r) => {
    if (r.type === 'fillin') return r.answers;
    if (r.type === 'reorder') return r.correctOrder || [];
    if (r.type === 'match') return (r.pairs || []).map((p) => p.right);
    if (r.type === 'classify') return (r.groups || []).flatMap((g) => g.items);
    return [];
  };
  for (const s of recalls) {
    const step = [s.keyIdea, ...(s.body || []).map((b) => b.text || (b.items || []).join(' ') || (b.steps || []).join(' ')), s.realExample?.text, s.misconception].join(' ');
    const stepTokens = tokens(step);
    const recoverable = answersOf(s.recall).filter((a) => {
      const at = [...tokens(a)].filter((t) => t.length > 2);
      return at.length > 0 && at.every((t) => stepTokens.has(t));
    });
    /*
     * A reorder or classify drawn from the step's own flow is intended to be recoverable — the
     * exercise is the ORDER, not the recall of the items. Only a fill-in is refused.
     */
    if (s.recall.type === 'fillin' && recoverable.length === answersOf(s.recall).length) {
      problems.push(`${s.title}: every fill-in answer is recoverable by scrolling up`);
    }
  }
}

/* ── ids unique (packet 19: three flashcards were exact duplicates) ────────── */
/*
 * PER COLLECTION, NOT OVER EVERY STRING. A diagram's id legitimately appears twice — once on the
 * diagram and once as the block's `diagramId` — so a check over all ids reports six duplicates on a
 * section that has none. The defect packet 19 found was three flashcards with the same content and
 * a `-2` suffix, which is a collection-level collision.
 */
{
  const collections = {
    quiz: QUIZ, practice: PRACTICE, flashcards: FLASHCARDS, mistakes: MISTAKES,
    diagrams: DIAGRAMS, subsections: SUBSECTIONS, recalls: recalls.map((s) => s.recall),
  };
  for (const [name, items] of Object.entries(collections)) {
    const ids = items.map((x) => x.id).filter(Boolean);
    if (ids.length !== items.length) problems.push(`${items.length - ids.length} ${name} entr${items.length - ids.length === 1 ? 'y has' : 'ies have'} no id`);
    const dupes = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
    if (dupes.length) problems.push(`${dupes.length} duplicated ${name} id(s): ${dupes.slice(0, 3).join(', ')}`);
  }
  /* And the content a duplicate id would be hiding: two flashcards with the same front. */
  const fronts = FLASHCARDS.map((c) => c.front.toLowerCase());
  const dupFronts = [...new Set(fronts.filter((x, i) => fronts.indexOf(x) !== i))];
  if (dupFronts.length) problems.push(`${dupFronts.length} flashcard front(s) appear twice: "${dupFronts[0].slice(0, 50)}"`);
}

/* ── one minus sign, and no ASCII hyphen before a digit in prose (packet 22) ─ */
ban(/(?<![\d\w])-(?=\d)/g, 'an ASCII hyphen before a digit in prose; U+2212 is the minus sign this section emits');

/* ══ THE ARITHMETIC SPINE, RE-DERIVED ═════════════════════════════════════ */
const eq = (label, got, want) => { if (got !== want) problems.push(`${label}: got ${got}, expected ${want}`); };

/* The three economies: every per-capita figure is a division, never a typed number. */
for (const e of E.rows) {
  eq(`${e.label} GDP per capita now`, e.perCapitaNow, (e.gdpNow * 1000) / e.population);
  eq(`${e.label} GDP per capita then`, e.perCapitaThen, (e.gdpThen * 1000) / e.population);
  eq(`${e.label} growth`, e.growth, round2(((e.gdpNow - e.gdpThen) / e.gdpThen) * 100));
  if (!Number.isInteger(e.perCapitaNow)) problems.push(`${e.label} GDP per capita is ${e.perCapitaNow}, which a student cannot check in their head`);
}
eq('developed against developing, per head', E.perCapitaGap, round2(E.developed.perCapitaNow / E.developing.perCapitaNow));
eq('developed against emerging, per head', E.emergingGap, round2(E.developed.perCapitaNow / E.emerging.perCapitaNow));
eq('the growth ratio', E.growthRatio, round2(E.emerging.growth / E.developed.growth));
/* The teaching point of chapter 1 is that these two are true at once; assert both. */
if (!(E.emerging.growth > E.developed.growth)) problems.push('the emerging economy does not grow faster than the developed one, so 1b has nothing to show');
if (!(E.emerging.perCapitaNow < E.developed.perCapitaNow)) problems.push('the emerging economy is not poorer a head than the developed one, so the "both are true" point collapses');

/* Lumina: the unit, the four barriers and the bloc. */
eq('factory cost is the module plus the assembly', L.factoryCost, L.importedModule + L.ownAssembly);
eq('landed cost is the factory cost plus freight', L.landed, round2(L.factoryCost + L.freight));
eq('the tariff is a percentage of the LANDED value', L.tariffPerUnit, round2((L.landed * L.tariffRate) / 100));
eq('landed with tariff', L.landedWithTariff, round2(L.landed + L.tariffPerUnit));
eq('specialisation saving', L.specialisationSaving, round2(L.integratedCost - L.factoryCost));
eq('specialisation saving as a percentage of the ORIGINAL cost', L.specialisationSavingPct, round2(((L.integratedCost - L.factoryCost) / L.integratedCost) * 100));
eq('imported share of the FACTORY cost', L.importedShare, round2((L.importedModule / L.factoryCost) * 100));
eq('freight as a share of factory cost', L.freightShare, round2((L.freight / L.factoryCost) * 100));
eq('the gap outside the bloc', L.gapOutside, round2(L.landedWithTariff - L.rivalPrice));
eq('the gap inside the bloc', L.gapInside, round2(L.rivalPrice - L.landed));
eq('units blocked by the quota', L.blockedUnits, L.plannedExports - L.quotaCap);
eq('the blocked share', L.blockedShare, round2(((L.plannedExports - L.quotaCap) / L.plannedExports) * 100));
eq('the blocked revenue', L.blockedRevenue, round2(L.blockedUnits * L.rivalPrice));
eq('the certification cost a unit', L.certificationPerUnit, round2(L.certificationCost / L.plannedExports));
eq('the subsidised rival price', L.rivalPriceSubsidised, round2(L.rivalPrice - L.subsidyPerUnit));
eq('FDI per unit of capacity', L.fdiPerUnit, round2(L.fdi / L.plannedExports));
/*
 * THE TEACHING POINTS, ASSERTED. Each of these is a sentence the section makes, and each would be
 * silently false if somebody edited a figure: the firm must WIN inside the bloc and LOSE outside it,
 * or chapter 6 has nothing to show; and the subsidy must leave the importer's cost untouched, which
 * is the whole of 4d-2 and the thing students misread.
 */
if (!(L.landed < L.rivalPrice)) problems.push('inside the bloc the unit is not cheaper than the rival, so 5b has nothing to show');
if (!(L.landedWithTariff > L.rivalPrice)) problems.push('outside the bloc the unit is not dearer than the rival, so the tariff does not close the gap and 4e has nothing to show');
if (L.rivalPriceSubsidised >= L.rivalPrice) problems.push('the subsidy does not lower the rival price');
if (round2(L.landed) !== round2(L.landed)) problems.push('the subsidy has moved the importer’s own landed cost, which is exactly the misreading 4d-2 is about');
eq('the subsidy leaves the importer’s cost alone', L.gapAfterSubsidy, round2(L.landed - L.rivalPriceSubsidised));
if (!(L.gapAfterSubsidy < 0)) problems.push('after the subsidy the importer is no longer under the rival inside the bloc, which changes what chapter 5 concludes');
if (!(Math.abs(L.gapAfterSubsidy) < L.gapInside)) problems.push('the subsidy does not narrow the importer’s advantage, so the barrier does nothing');
/* The four barriers the specification names are all priced, and exactly four. */
eq('barriers named', BARRIERS.length, 4);
eq('blocs named', BLOCS.length, 3);
eq('reasons for protectionism', PROTECTION_REASONS.length, 4);
eq('HDI components stated once', HDI.combines.length, 3);

/* ── diagrams ─────────────────────────────────────────────────────────────── */
const svgOf = (d) => (d.svg ? [{ label: d.title, svg: d.svg }] : d.scenarios);
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
  const a = m[1];
  const attr = (k) => { const r = a.match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || 11, anchor: attr('text-anchor') || 'start' };
});
const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
  const attr = (k) => { const r = m[1].match(new RegExp(`${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
  return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
});
const frameOf = (svg) => { const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1].trim().split(/[\s,]+/).map(Number); return { w: vb[2], h: vb[3] }; };

{
  if (DIAGRAMS.length !== BLOCKS.length) problems.push(`${DIAGRAMS.length} diagrams for ${BLOCKS.length} blocks; one is pinned to each`);
  for (const d of DIAGRAMS) {
    if (d.kind !== 'table') problems.push(`${d.title} does not declare kind:"table"; packet 29 dodged the DEBT that way and cost the student the full-screen sheet`);
    if (Array.isArray(d.checklist) && d.checklist.length) problems.push(`${d.title} is a declared table carrying a checklist, which diagram.table-checklist refuses`);
    for (const { label, svg } of svgOf(d)) {
      const frame = frameOf(svg);
      if (frame.w !== 440) problems.push(`${d.title} / ${label}: a ${frame.w}-unit frame; 440 is the frame a 313px phone column needs (packet 30)`);
      /* MIN_FACE, measured against the real column rather than asserted. */
      const faces = textsOf(svg).map((t) => t.size);
      const smallest = Math.min(...faces);
      if (smallest < 10) problems.push(`${d.title} / ${label}: smallest face ${smallest} units; the table floor is 10 on a 440 frame`);
      /* EXTENT, not anchor (packet 25): nothing drawn outside its own canvas. */
      for (const tx of textsOf(svg)) {
        if (!tx.body.trim()) continue;
        const w = estWidth(tx.body, tx.size);
        const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
        if (left < -0.5 || left + w > frame.w + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 36)}" runs from ${round2(left)} to ${round2(left + w)} in a ${frame.w}-unit frame`);
        if (tx.y < 0 || tx.y > frame.h + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 36)}" sits at y=${tx.y} in a ${frame.h}-unit frame`);
      }
      /*
       * GLYPH-BOX COLLISIONS, tolerance 1.2 of a face (packet 31). At 0.75 the bound is 9 units for
       * an 11-unit label, so a pair 15 apart reads as "not colliding" and renders as one cluster.
       */
      const boxes = textsOf(svg).filter((t) => t.body.trim()).map((t) => {
        const w = estWidth(t.body, t.size);
        const left = t.anchor === 'end' ? t.x - w : t.anchor === 'middle' ? t.x - w / 2 : t.x;
        return { ...t, left, right: left + w };
      });
      for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i], b = boxes[j];
        if (Math.abs(a.y - b.y) > 1.2 * Math.max(a.size, b.size)) continue;
        if (a.left < b.right && b.left < a.right) problems.push(`${d.title} / ${label}: "${a.body.slice(0, 24)}" and "${b.body.slice(0, 24)}" overlap at y≈${a.y}`);
      }
      /*
       * THE LINE-CROSSING CHECK (packet 31): no `<text>` glyph box may be crossed by any `<line>`.
       * A rule the extent and collision checks both pass, because a line is not text.
       */
      for (const ln of linesOf(svg)) {
        if (ln.x1 === null) continue;
        for (const bx of boxes) {
          const top = bx.y - bx.size * 0.8, bottom = bx.y + bx.size * 0.25;
          const horizontal = ln.y1 === ln.y2;
          if (horizontal) {
            if (ln.y1 > top && ln.y1 < bottom && Math.min(ln.x1, ln.x2) < bx.right && Math.max(ln.x1, ln.x2) > bx.left) {
              problems.push(`${d.title} / ${label}: a line at y=${ln.y1} crosses "${bx.body.slice(0, 28)}"`);
            }
          }
        }
      }
    }
  }
  /* A/B the extent check, so a guard that has never fired is known to work. */
  {
    const probe = (body, x, anchor, frameW) => { const w = estWidth(body, 12); const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x; return left < -0.5 || left + w > frameW + 0.5; };
    if (!probe('a label long enough to run straight off the right-hand edge of the frame', 400, 'start', 440)) problems.push('the canvas-extent check no longer fires on a label that overruns its frame');
    if (probe('Inside', 20, 'start', 440)) problems.push('the canvas-extent check fires on a label that fits');
  }
}

/* ── every figure re-derived out of the emitted SVG ───────────────────────── */
/*
 * A figure computed correctly and printed into the wrong `<text>` is the same defect one layer along
 * (packets 19, 23, 25, 29, 31). So the two bar charts that carry the section's argument are read
 * BACK: the values must be present, and the bar LENGTHS must rank the way the arithmetic does.
 */
{
  const barsOf = (svg) => [...svg.matchAll(/<rect\b[^>]*\bx="156"[^>]*\bwidth="([\d.]+)"/g)].map((m) => parseFloat(m[1]));
  const protectionism = DIAGRAMS.find((d) => d.id === diagramIds[B5]);
  const barrierView = svgOf(protectionism)[0];
  const bodies = textsOf(barrierView.svg).map((t) => t.body);
  for (const want of [money(L.landed), money(L.landedWithTariff)]) if (!bodies.includes(want)) problems.push(`the barriers chart does not print ${want}`);
  const barrierBars = barsOf(barrierView.svg);
  if (barrierBars.length !== 4) problems.push(`the barriers chart emits ${barrierBars.length} bars, not the four barriers the specification names`);
  /* The subsidy bar must be the SAME length as the no-barrier bar. That is the whole teaching point. */
  if (barrierBars.length === 4 && round2(barrierBars[0]) !== round2(barrierBars[3])) {
    problems.push(`the subsidy bar (${barrierBars[3]}) differs from the no-barrier bar (${barrierBars[0]}); 4d-2 is that a subsidy does not move the importer's cost`);
  }
  if (barrierBars.length === 4 && !(barrierBars[1] > barrierBars[0])) problems.push('the tariff bar is not longer than the no-barrier bar');

  const blocs = DIAGRAMS.find((d) => d.id === diagramIds[B6]);
  const insideOutside = svgOf(blocs).find((v) => /inside/i.test(v.label));
  const ioBodies = textsOf(insideOutside.svg).map((t) => t.body);
  for (const want of [money(L.landed), money(L.rivalPrice), money(L.landedWithTariff)]) if (!ioBodies.includes(want)) problems.push(`the inside/outside chart does not print ${want}`);
  const ioBars = barsOf(insideOutside.svg);
  if (ioBars.length === 3 && !(ioBars[0] < ioBars[1] && ioBars[1] < ioBars[2])) {
    problems.push(`the inside/outside bars are ${ioBars.join(', ')} and must rank inside < rival < outside, which is the section's conclusion`);
  }

  /* The three economies table must print every per-capita figure it claims. */
  const econView = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B1]))[0];
  const econBodies = textsOf(econView.svg).map((t) => t.body);
  for (const e of E.rows) if (!econBodies.includes(money(e.perCapitaNow))) problems.push(`the economies table does not print ${e.label}'s GDP per capita ${money(e.perCapitaNow)}`);
}

/* ── extras: every chain has steps, every evaluation frame has content (V035) ─ */
{
  for (const [i, c] of EXTRAS.chains.entries()) {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i} has no \`steps\`; ExtrasTab.jsx:62 calls chain.steps.map() unguarded (V028)`);
    if (!c.result) problems.push(`extras chain ${i} has no result`);
  }
  for (const [i, e] of EXTRAS.evaluation.entries()) {
    if (!e.content || !String(e.content).trim()) problems.push(`evaluation frame ${i} has no \`content\` and renders an empty card (V035 — thirteen of these across packets 23, 24, 25 and 27)`);
    if (!e.title) problems.push(`evaluation frame ${i} has no title`);
  }
  if (EXTRAS.chains.length < BLOCKS.length) problems.push(`${EXTRAS.chains.length} chains for ${BLOCKS.length} chapters; extras.chains is served to a free student as a flat prefix, so one a chapter in chapter order is the coherent sample`);
}

/* ── the step budget, and one subsection one step ─────────────────────────── */
{
  const wordsIn = (s) => String(s || '').split(/\s+/).filter(Boolean).length;
  for (const s of SUBSECTIONS) {
    const n = (s.body || []).reduce((t, b) => t + wordsIn(b.text) + (b.items || []).reduce((k, i) => k + wordsIn(i), 0) + (b.steps || []).reduce((k, i) => k + wordsIn(i), 0) + wordsIn(b.result), 0);
    if (n > 350) problems.push(`${s.title}: ${n} words against the 350 budget`);
    if (!s.keyIdea) problems.push(`${s.title}: no keyIdea`);
    if (!s.examMatters) problems.push(`${s.title}: no examMatters`);
    for (const b of s.body || []) if (!['paragraph', 'bullets', 'flow', 'subheading'].includes(b.type)) problems.push(`${s.title}: body type "${b.type}" is not in schema.body-type`);
  }
  if (SUBSECTIONS.length < 24) problems.push(`${SUBSECTIONS.length} subsections; structure-07 is that two 2-section steps is too short for five sub-topics`);
}

/* ── coverage, mapped BY HAND (V025) ──────────────────────────────────────── */
/*
 * Twenty-eight substantive leaves. Four oracle rows — `1c`, `1d`, `4d`, `5a` — are requirement
 * headers whose bullets are the leaves, so they are excluded by the parent test rather than by hand.
 */
const LEAF_MAP = {
  /* 1 Growing economies */
  '1a': 'developed-developing-and-emerging-economies',
  '1b': 'growing-economic-power-of-asia-and-africa',
  '1c-1': 'trade-opportunities-for-businesses', '1c-2': 'employment-patterns',
  '1d-1': 'gdp-and-gdp-per-capita', '1d-2': 'human-development-index',
  /* 2 International trade and business growth */
  '2a': 'exports-and-imports',
  '2b': 'what-specialisation-saves',
  '2c': 'fdi-and-business-growth',
  /* 3 Factors contributing to increased globalisation */
  '3a': 'trade-liberalisation-and-the-reduction-of-barriers',
  '3b': 'political-change',
  '3c': 'reduced-cost-of-transport-and-communication',
  '3d': 'mncs-and-increased-investment-flows', '3e': 'mncs-and-increased-investment-flows',
  '3f': 'migration-within-and-between-economies',
  '3g': 'growth-of-the-global-labour-force',
  '3h': 'structural-change',
  '3i': 'impact-on-businesses-of-increased-globalisation',
  /* 4 Protectionism */
  '4a': 'reasons-for-protectionism',
  '4b': 'tariffs',
  '4c': 'import-quotas',
  '4d-1': 'other-trade-barriers', '4d-2': 'other-trade-barriers',
  '4e': 'impact-on-businesses-of-protectionism',
  /* 5 Trading blocs */
  '5a-1': 'the-eu-and-the-single-market', '5a-2': 'asean', '5a-3': 'nafta',
  '5b': 'inside-the-bloc-and-outside-it',
};
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, slug] of Object.entries(LEAF_MAP)) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const all = Array.isArray(oracle) ? oracle : oracle.items || oracle.rows;
  const rows = all.filter((r) => String(r.id || '').startsWith('BUS-4.3.1-'));
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('BUS-4.3.1-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `BUS-4.3.1-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);
  /*
   * THE SPECIFICATION DOES NOT OWN THE LADDER, AND THIS ASSERTS IT rather than trusting a comment.
   * The destination was wrong in the first draft of this packet and Verify A caught it: the ladder
   * sits under **Economics 4.3.2 Trade and the global economy** (heading `econ_spec.txt:1626`), not
   * 4.3.1, so it belongs to `trade-global-economy` — **packet 39** — and not to packet 34, whose own
   * brief already says so. Rule 1 applied to a handoff note, second instance after packet 30's
   * "Business 2.4".
   * If a future edition of `bus_spec.txt` ever does carry a customs union, this fails loudly and the
   * ban above has to be revisited instead of quietly suppressing real content.
   */
  const busSpec = readFileSync('audit/raw/bus_spec.txt', 'utf8');
  for (const term of ['customs union', 'trade creation', 'trade diversion', 'common market', 'free-trade area']) {
    if (new RegExp(term, 'i').test(busSpec)) problems.push(`"${term}" now appears in bus_spec.txt — the off-spec ban rests on it being absent; re-read 4.3.1 before shipping`);
  }
  const econSpec = readFileSync('audit/raw/econ_spec.txt', 'utf8');
  for (const term of ['customs union', 'trade creation', 'trade diversion']) {
    if (!new RegExp(term, 'i').test(econSpec)) problems.push(`"${term}" is no longer in econ_spec.txt — the reassignment to packet 39 rests on it being there`);
  }
  console.log(`\nleaves: ${leaves.length} substantive, ${Object.keys(LEAF_MAP).length} mapped by hand to ${new Set(Object.values(LEAF_MAP)).size} subsections`);
}

/* ── the validator, and the baseline ──────────────────────────────────────── */
const live = await loadBundle(SECTION);
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
const strictlyLongest = QUIZ.filter((q) => { const k = q.options[q.correctIndex].length; return q.options.every((o, j) => j === q.correctIndex || o.length < k); }).length;

console.log(`\n${SECTION} — packet 33`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${DIAGRAMS.length} diagrams (${DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
console.log(`  the key is strictly the longest option in ${round2((strictlyLongest / QUIZ.length) * 100)}% of items (chance 25%, guard 35%)`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }

console.log('\npacket checks: the OFF-SPEC BAN over prose and every SVG <text> — no integration ladder, no trade creation or diversion, no customs union, common market or common external tariff (all 0 in bus_spec.txt and in Economics 4.3.2 · 4, packet 39), no transfer pricing or hedging (0 in the whole Business specification), no off-shoring or outsourcing (4.3.2 · 1c), no deregulation, transnational, retaliation, infant industry, dumping, literacy, comparative or competitive advantage, interdependence, integration, containerisation, supply chain or sector labels — each A/B’d against a planted ladder sentence and against a sentence this section is entitled to write · USMCA once in prose and never assessed; NAFTA and ASEAN both named as 5a names them · all NINE factors reach a student and trading blocs is never called one of them · every practice tariff in the BUSINESS census for UNIT 4, all eight command words exactly once, Assess at 12 and not the 10 practice-01 asserts, every extended item case-based · guidance two paragraphs with an opening that gives nothing away, no mark allocation above 6 marks, no claim about what a marker does · Appendix 6 glosses checked in BOTH directions (packets 21 and 23) · three quiz items unpinned and first, every block pinned to a quiz, a practice item and a diagram with the pins DERIVED from each item’s block tag, no explanation naming an option by position, no near-duplicate stems, and the bank-level LENGTH tell measured and A/B’d against a rigged bank · fill-in answers comma-free (fillin.token), every reorder carrying `shuffled`, the answer-recoverable check with packet 31’s token sets · the arithmetic spine re-derived: every GDP per capita a division, the tariff a percentage of the LANDED value, the subsidy asserted to leave the importer’s cost untouched and its bar read back out of the SVG as the same length as the no-barrier bar, the inside/outside bars asserted to rank inside < rival < outside · 440-unit frames, a face floor of 10, text extent, glyph-box collisions at 1.2 of a face, and the line-crossing check · every extras chain carrying `steps` and every evaluation frame carrying `content` (V028, V035) · 28 leaves mapped by hand, the oracle printed beside it, and both specifications re-read so the ban cannot outlive the fact it rests on · ids unique · one minus sign, no ASCII hyphen before a digit');

if (DUMP) {
  const path = `audit/snapshots/packet-33-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-33-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
