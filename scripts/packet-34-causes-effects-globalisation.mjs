#!/usr/bin/env node
/**
 * PACKET 34 — causes-effects-globalisation, Economics Unit 4 (WEC14), IAL topic 4.3.1.
 * `audit/raw/econ_spec.txt:1586-1625`. FIVE blocks, twenty-six subsections, 22 substantive leaves.
 *
 *   node scripts/packet-34-causes-effects-globalisation.mjs            # dry run, every check
 *   node scripts/packet-34-causes-effects-globalisation.mjs --dump     # + write the bundle
 *   node scripts/packet-34-causes-effects-globalisation.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. Inherited whole from
 * packet 30, which inherited it from 27; what this packet adds or aims differently:
 *
 *   - **THE LADDER BAN.** The live section's third block teaches the types of trading bloc, trade
 *     creation and trade diversion. Those are `econ_spec.txt:1657-1673` — **4.3.2 · 4**, the
 *     `trade-global-economy` section — and 4.3.1 names blocs once, as cause 2a-2. FIVE audit items
 *     ask this packet to build MORE of that block. `LADDER_TERMS` in `_packet34-util.mjs` is the
 *     list, and the ban runs over prose AND over every SVG `<text>`, because the removal has to be
 *     provable rather than remembered.
 *   - **THE OFF-SPEC WORD LIST IS THE AUDIT'S OWN VOCABULARY.** `MNC` and `multinational` are the
 *     BUSINESS specification's words for this firm (0 hits in `econ_spec.txt`, 6 and 3 in
 *     `bus_spec.txt`) and `topFix-03` asks for them to be taught as equivalents. `race to the
 *     bottom`, `tax competition`, `deindustrialisation`, `brain drain`, `greenfield`, `stakeholder`
 *     and `world price` are each 0 hits in BOTH specifications and appear across four more findings.
 *     Rule 2 of the programme, enforced rather than remembered.
 *   - **NO BREXIT, NO TARIFF-FREE, NO REAL COUNTRY AND NO YEAR.** `accuracy-01` is a false claim
 *     about a real trade agreement in a `realExample`, and Layer 4's rule is that a generic true
 *     example beats a specific invented one. The whole section runs on one fictional economy, and
 *     the ban makes the absence checkable.
 *   - **THE ARITHMETIC SPINE IS RE-DERIVED FROM THE TWO GROWTH RATES.** `topFix-04`'s second clause
 *     is that the live section's first diagram carries index numbers with no source. Here every
 *     figure on every surface comes out of six numbers in `_packet34-util.mjs`, and this runner
 *     recomputes each of them independently of the module that produced them.
 *   - **THE PINS ARE DERIVED FROM EACH ITEM'S OWN `block` TAG.** `structure-02` is that no block
 *     carries `quizIndices`, `practiceIndices` or a diagram at all, so no chapter check-in can show
 *     a question about its own chapter. Deriving the indices makes the identity mapping
 *     unrepresentable rather than corrected.
 *   - **TEXT EXTENT AND GLYPH-BOX COLLISIONS** (packets 25, 29, 30). `accuracy-03` is two diagram
 *     columns overlapping over a 80×104-unit region, so four labels print on top of four others.
 *     The FDI diagram is drawn as stacked full-width bands, which cannot collide horizontally, and
 *     the collision guard proves it on the emitted SVG rather than on the intention.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, money, bn, mn, qty, pct, round2,
  TAMIRA, DEVICE, NORVELL, CHARACTERISTICS, CAUSES, BENEFITS, COSTS,
  LADDER_TERMS, OFF_SPEC_TERMS, teachingWords, TEACHING_TERMS,
} from './_packet34-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5 } from './_packet34-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet34-assessment.mjs';
import { DIAGRAMS, estWidth, GRD, MIN_FACE } from './_packet34-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5];
const T = TAMIRA, D = DEVICE, N = NORVELL;

const problems = [];

/* ── pins, derived from each item's own block tag ──────────────────────────── */
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
 * SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29). `prose` excludes the SVG
 * blobs, which is right for sentence-level checks and wrong for vocabulary bans. Joined per diagram
 * rather than per `<text>` because a caption is wrapped a line per element, so a phrase spanning two
 * lines is in neither of them.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ── a failed substitution, on every surface including the SVGs ────────────── */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  /* A/B: the four shapes a failed substitution takes must fire. */
  for (const bad of ['a span of undefinedQ', 'the wage bill is NaN', 'the firm [object Object] pays', 'a wage of ${money(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
}

/* ── the section's own banned vocabulary ───────────────────────────────────── */
/*
 * RULE 2 OF THE PROGRAMME, and this section is the clearest case the programme has met: HALF THE
 * LIVE SECTION IS ANOTHER TOPIC'S CONTENT, and five audit items ask for more of it.
 *
 * `LADDER_TERMS` is the trading-bloc ladder — types of bloc, trade creation, trade diversion, the
 * common external tariff. All of it is `econ_spec.txt:1657-1673`, which is **4.3.2 · 4 "Trade
 * liberalisation and trading blocs"**, owned by `trade-global-economy`. IAL 4.3.1 names blocs once,
 * as cause 2a-2 — "increased number and size of trading blocs" — and asks for nothing else about
 * them. `topFix-01`'s ladder clause, `topFix-02`, `topFix-03`'s second and third clauses,
 * `specGap-05` and `specGap-06` all ask this packet to build that content; each is reassigned to
 * packet 39 rather than built, and this ban is what makes the reassignment checkable.
 *
 * `OFF_SPEC_TERMS` is vocabulary that belongs to the Business specification or to no specification,
 * every entry counted before a word was written:
 *   - `MNC` 0 and `multinational` 0 in `econ_spec.txt`, against `TNC` 7. They are 6 and 3 in
 *     `bus_spec.txt`. `topFix-03` asks for "TNC = MNC" to be introduced so the quiz vocabulary
 *     matches the body; the fix is to speak the Economics specification's word on every surface.
 *   - `race to the bottom` and `tax competition`: 0 and 0 in both. `structure-05` is right that the
 *     quiz tests the first of them, and `specGap-02` asks for both to be taught. The leaves behind
 *     the finding are real — 3a-2, 3b-4 and 3b-6 — and they are taught in the spec's own words.
 *   - `deindustrialisation` 0 (`specGap-04`); the specification's term is `displaced workers`, 3b-1.
 *   - `brain drain` 0 (`specGap-07`); migration's EFFECTS are 4.3.3 · 2d and 4.3.4 · 1a/1b.
 *   - `greenfield` 0 (`structure-04`, `structure-05`); the FDI-type distinction is not a leaf here.
 *   - `stakeholder` 0 in `econ_spec.txt` and 10 in `bus_spec.txt` (`structure-07`, `specGap-02`);
 *     4.3.1 · 3 is organised as benefits and costs, and that is how this section is organised.
 *   - `Brexit` and `tariff-free`: `accuracy-01` is a false claim about a real agreement, and this
 *     section carries no real country, no year and no sourced figure at all.
 *
 * THE BAN RUNS OVER `readable`, WHICH INCLUDES EVERY SVG `<text>`. Packet 29's lesson: a phrase
 * inside a diagram caption is read by nothing else in the pipeline.
 */
for (const term of LADDER_TERMS) {
  const re = new RegExp(`\\b${term.replace(/[-]/g, '[- ]')}s?\\b`, 'gi');
  ban(re, `"${term}" is IAL 4.3.2 · 4 (econ_spec.txt:1657-1673), owned by trade-global-economy — this topic names blocs once, as cause 2a-2`);
}
for (const term of OFF_SPEC_TERMS) {
  const re = new RegExp(`\\b${term.replace(/[-]/g, '[- ]')}\\b`, term === 'MNC' ? 'g' : 'gi');
  ban(re, `"${term}" is 0 hits in audit/raw/econ_spec.txt for this topic`);
}
ban(/\bAssess\b(?![a-z])/g, '"Assess", which is a BUSINESS command word and has no Economics tariff (DECISIONS, 11 Sep)');
ban(/\bOutline\b(?![a-z])/g, '"Outline", which is in neither specification');
ban(/\bConstruct\b(?![a-z])/g, '"Construct", which is a Business command word; the Economics equivalent is Draw');
ban(/\bcomparative advantage\b|\babsolute advantage\b/gi, 'comparative advantage, which is 4.3.2 · 1 and not a leaf of this topic');
ban(/\bbalance of payments\b|\bcurrent account\b/gi, 'the balance of payments, which is 4.3.2 · 6 and not a leaf of this topic');
ban(/\bexchange rate/gi, 'exchange rates, which are 4.3.2 · 7 and not a leaf of this topic');
{
  /*
   * A/B, PLANTED AND REMOVED. A ban that has never been seen to fire is not known to work, and two
   * of these are regexes built from a list at run time rather than written out — the exact shape
   * that fails silently when the list changes.
   */
  const probes = [
    ['a customs union charges a common external tariff', /\bcustoms union\b/i],
    ['trade creation raises welfare and trade diversion lowers it', /\btrade creation\b/i],
    ['an MNC decides where to put its plant', /\bMNC\b/],
    ['governments compete in a race to the bottom', /\brace to the bottom\b/i],
    ['after Brexit the UK lost tariff-free access', /\bBrexit\b/i],
  ];
  for (const [bad, re] of probes) if (!re.test(bad)) problems.push(`a vocabulary ban no longer fires on: "${bad}"`);
  for (const term of [...LADDER_TERMS, ...OFF_SPEC_TERMS]) {
    const re = new RegExp(`\\b${term.replace(/[-]/g, '[- ]')}s?\\b`, 'i');
    if (!re.test(`the ${term} in question`)) problems.push(`the ban built for "${term}" does not match its own term`);
  }
}
/*
 * `TNC` AND `FDI` ARE EXPANDED, ONCE EACH, AS THE SPECIFICATION EXPANDS THEM. `structure-05` is
 * that the live quiz and practice use `TNC` throughout while the body never introduces it, so a
 * Learn Mode student meets the abbreviation cold. The fix is a subsection, and this is the check
 * that the subsection actually says the words.
 */
{
  const expandedTnc = readable.some((s2) => /transnational compan(y|ies)\s*\(TNCs?\)|transnational compan/i.test(s2));
  const expandedFdi = readable.some((s2) => /foreign direct investment\s*\(FDI\)/i.test(s2));
  if (!expandedTnc) problems.push('`TNC` is used but "transnational company" is never written out (structure-05)');
  if (!expandedFdi) problems.push('`FDI` is used but "foreign direct investment (FDI)" is never written out (structure-05)');
}

/* ── no note about OUR OWN PREVIOUS CONTENT in text a student reads ────────── */
/*
 * FOUND BY VERIFY B, IN THIS PACKET, AFTER EVERY MECHANICAL CHECK HAD PASSED — and the instance was
 * on the screen of the chapter a student reaches last. Three diagram captions and one teaching
 * paragraph said "the live section teaches only the second", "the live section teaches five" and
 * "Paternalistic is the one the live section leaves out while quizzing it". A student has no idea
 * what "the live section" is; it reads as a claim about the specification or about another textbook.
 *
 * Packet 18 shipped the same class twice ("the March version of this item asked for 4") and its rule
 * is written down: NEVER put a note about our own previous content in text a student reads. Nothing
 * looked for it. `LEDGER_ID` could not, because these carry no ledger id; `MARK_CLAIM` and the
 * paper-pattern checks could not, because they are not claims about marking; and three of the four
 * were inside SVG captions, which only the vocabulary bans read at all. That is packet 29's lesson
 * in its own words: a check's BLIND SPOT is worse than a missing rule, because it reports green.
 *
 * Over `readable`, so prose AND diagram text, and over the SVG text JOINED PER DIAGRAM, because a
 * caption is wrapped one `<text>` a line and the phrase spanned two of them.
 */
const SELF_REFERENCE = /\bthe live section\b|\bthe March (?:version|notes|content)\b|\bthis section (?:previously|used to|formerly)\b|\bthe previous version\b|\bthe old (?:notes|section|version)\b|\bpreviously (?:taught|said|omitted|left out)\b|\bearlier version\b|\bthis packet\b/i;
for (const s2 of readable) {
  if (!SELF_REFERENCE.test(s2)) continue;
  const m = s2.match(SELF_REFERENCE);
  problems.push(`a note about our own previous content in text a student reads: "${s2.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, ' ')}"`);
}
{
  /* A/B: the four shapes Verify B found must fire, and the teaching they were attached to must not. */
  const mustFire = ['1.3.4 · 1d names both and the live section teaches only the second.', 'the March version of this item asked for 4', 'this section previously taught seven layers', 'the old notes named Costco'];
  const mustNot = ['1.3.4 · 5b names exactly these four, and they differ in who takes the decision.', 'Paternalistic is the one most often mistaken for a softer word for autocratic.'];
  problems.push(
    ...mustFire.filter((x) => !SELF_REFERENCE.test(x)).map((x) => `SELF_REFERENCE no longer fires on: "${x}"`),
    ...mustNot.filter((x) => SELF_REFERENCE.test(x)).map((x) => `SELF_REFERENCE fires on ordinary teaching: "${x}"`),
  );
}

/* ── no internal id in anything a student reads (packet 19) ────────────────── */
const LEDGER_ID = /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b|\bC-[a-z-]+-(?:topFix|specGap|accuracy|structure)-\d{2}\b/;
for (const s of prose) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id in student-facing text: "${s.slice(0, 90)}"`);
for (const s of svgText) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id inside a diagram: "${s.slice(0, 90)}"`);

/* ── claims about markers, frequency and how papers are built ──────────────── */
/*
 * `topFix-05` ASKS FOR EXACTLY WHAT THIS REFUSES. It wants "levels-based (L1-L4) guidance" in the
 * practice items. That is a claim about what a marker does; `examMatters` may say what the COMMAND
 * WORD requires, because Appendix 6 states it and it is citable. Packet 20 shipped "is levels-marked"
 * eight times before `MARK_CLAIM` reached the phrasing.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bL1[ -]L4\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  const mustFire = ['An answer that stops there earns nothing.', 'This is levels-marked against the KAA criteria.', 'Mark schemes accept either form.', 'Guidance is given at L1-L4.'];
  const mustNotFire = [`The tax is ${mn(N.profitTax / 1_000_000)} (1 mark), which is ${pct(N.taxRate)} of the profit (1 mark).`, 'Appendix 6 defines Define as requiring the meaning of a term.'];
  problems.push(
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM fires on a point allocation: "${x}"`),
  );
}
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
  if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
  if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWBS1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);
}

/* ── tariffs, against the ECONOMICS census, for UNIT 4 ────────────────────── */
/*
 * `topFix-05` ASKS FOR "6/4 for a 10-mark Assess". IAL ECONOMICS HAS NO ASSESS AND NO 10-MARK
 * TARIFF: the census rows are Define 2, Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8,
 * Discuss 14, Evaluate 20 (`econ_spec.txt:2700-2747`). The live section ships `Assess (10)` and
 * `Outline (4)`, which is two of the four `practice.command` / `practice.tariff` BLOCK findings, and
 * a packet that took the finding at its word would have re-guided a tariff that does not exist on
 * this paper instead of replacing it.
 */
const UNIT = 4;
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
const marksFor = (row) => row.marks;
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice command "${pItem.command}" is not in the economics census — this subject has no Assess, no Construct and no Outline`);
  else if (!marksFor(row).includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — in Economics that command carries ${marksFor(row).join(' or ')}`);
}
{
  const used = PRACTICE.map((p) => p.command);
  const missing = census.map((r) => r.command).filter((c) => !used.includes(c));
  if (missing.length) problems.push(`command words never practised: ${missing.join(', ')} — eight command words, one each`);
  const dup = used.filter((x, i) => used.indexOf(x) !== i);
  if (dup.length) problems.push(`command word used twice: ${dup.join(', ')}`);
}
/* A prose tariff is invisible to the census check above, which reads PRACTICE items only (packet 20). */
const PROSE_TARIFF = /\b(\d{1,2})[- ]marks?\b/gi;
const unitMarks = [...new Set(census.flatMap((r) => marksFor(r)))].sort((a, b) => a - b);
for (const s2 of prose) {
  const stripped = withoutAllocations(s2);
  for (const m of stripped.matchAll(PROSE_TARIFF)) {
    const marks = Number(m[1]);
    if (!unitMarks.includes(marks)) problems.push(`a ${marks}-mark question named in prose; IAL Economics has ${unitMarks.join(', ')} only: "${stripped.slice(Math.max(0, m.index - 40), m.index + 40)}"`);
  }
}
{
  /* A/B: the tariffs this subject does not have must fire, and the ones it does must not. */
  const probe = (text) => [...withoutAllocations(text).matchAll(PROSE_TARIFF)].map((m) => Number(m[1])).filter((n) => !unitMarks.includes(n));
  if (!probe('a 10-mark Assess').length) problems.push('the prose-tariff check no longer fires on a 10-mark question, which is Business only');
  if (!probe('a 12-mark question').length) problems.push('the prose-tariff check no longer fires on a 12-mark question, which is Business Units 3/4');
  if (probe('a 14-mark Discuss and a 20-mark Evaluate').length) problems.push('the prose-tariff check fires on a valid IAL Economics tariff');
  if (probe(`The tax is ${mn(N.profitTax / 1_000_000)} (1 mark).`).length) problems.push('the prose-tariff check fires on a mark ALLOCATION inside guidance, which is not a question tariff');
}

/* ── the Appendix 6 gloss must share vocabulary with the census description ── */
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required requires students needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
const words = (s2) => String(s2).toLowerCase().match(/[a-z]{4,}/g) || [];
const COMMANDS = census.map((r) => r.command).join('|');
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  const m = em.match(new RegExp(`Appendix 6[^.]*?\\b(${COMMANDS})\\b`));
  if (!m) continue;
  const row = census.find((r) => r.command === m[1]);
  if (!row) continue;
  const mine = new Set(words(em).filter((w) => !STOP.has(w)));
  const theirs = words(row.description).filter((w) => !STOP.has(w));
  const shared = theirs.filter((w) => mine.has(w));
  if (!shared.length) problems.push(`"${sec.title}": the ${m[1]} gloss cites Appendix 6 and shares NOTHING with the census description — read econ_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
}
/*
 * EXAMINE REQUIRES EVALUATION AND A BRIEF ASSESSMENT, AND THAT IS THE WHOLE DIFFERENCE FROM ANALYSE.
 * This is packet 20's finding in its own subject: six Examine glosses there enumerated the
 * objectives and left the assessment out. Discuss (14) additionally requires a recognition of
 * different viewpoints, and Evaluate (20) an informed judgement; each is checked against the word
 * the census itself uses.
 */
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  if (/Appendix 6[^.]*\bExamine\b/.test(em) && !/assessment|evaluat/i.test(em)) problems.push(`"${sec.title}": an Examine gloss with no brief assessment — econ_spec.txt names it, and it is what separates Examine (8) from Analyse (6)`);
  if (/Appendix 6[^.]*\bDiscuss\b/.test(em) && !/viewpoint|validity|significance/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss that does not reach the validity, significance or viewpoints the census requires`);
  if (/Appendix 6[^.]*\bEvaluate\b/.test(em) && !/judgement/i.test(em)) problems.push(`"${sec.title}": an Evaluate gloss with no informed judgement`);
  if (/Appendix 6[^.]*\bAnalyse\b/.test(em) && !/depth|chain/i.test(em)) problems.push(`"${sec.title}": an Analyse gloss that names neither the chain of reasoning nor depth over breadth`);
}
for (const p of PRACTICE) {
  if (p.command === 'Examine' && !/assessment/i.test(p.guidance)) problems.push('the Examine practice guidance does not name the brief assessment the command word requires');
  if (p.command === 'Evaluate' && !/judgement/i.test(p.guidance)) problems.push('the Evaluate practice guidance does not name the informed judgement the command word requires');
  if (p.command === 'Draw' && !/label/i.test(p.guidance)) problems.push('the Draw practice guidance does not mention labelling, which is what the command word asks for');
  if (p.command === 'Calculate' && !/working/i.test(p.guidance)) problems.push('the Calculate practice guidance does not mention workings, which Appendix 6 advises');
}

/* ── the word budget, measured the way the validator measures it ───────────── */
for (const sec of SUBSECTIONS) {
  const w = teachingWords(sec);
  if (w > 350) problems.push(`"${sec.title}": ${w} words of teaching text (budget 350)`);
}

/* ── recalls: completeness, the fill-in contract, and copy-from-screen ─────── */
if (SUBSECTIONS.some((s) => !s.recall)) problems.push(`${SUBSECTIONS.filter((s) => !s.recall).length} subsections carry no recall`);
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  const orphan = ATTACH_SLUGS.filter((k) => !slugs.has(k));
  if (orphan.length) problems.push(`recall bank keyed to a subsection that does not exist: ${orphan.join(', ')} — a typo here is silent, the recall simply never appears`);
}
/*
 * THE FILL-IN CONTRACT, WHICH IS `topFix-01` AND SIXTEEN OF THE SECTION'S THIRTY-FIVE BLOCK FINDINGS.
 * One `___` a template line; `answers.length` equal to the blank count; no duplicate answer, because
 * the second chip vanishes when its twin is placed and the recall cannot be completed; no answer
 * printed in the template outside its own blank; a hint that is not a prefix of its answer; and two
 * or three distractors so the chip bank is not a closed set.
 */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'fillin') continue;
  const lines = r.template || [];
  const blanks = lines.reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
  const answers = r.answers || [];
  if (blanks !== answers.length) problems.push(`"${sec.title}": ${blanks} blanks against ${answers.length} answers (topFix-01: two live fill-ins have five answers on three lines)`);
  for (const [i, l] of lines.entries()) {
    const n = (String(l).match(/_{3,}/g) || []).length;
    if (n !== 1) problems.push(`"${sec.title}": template line ${i + 1} has ${n} blanks — one a line, so the blanks and the answers cannot come apart`);
  }
  const lower = answers.map((a) => String(a).toLowerCase());
  const dups = lower.filter((a, i) => lower.indexOf(a) !== i);
  if (dups.length) problems.push(`"${sec.title}": duplicate answer ${JSON.stringify([...new Set(dups)])} — the second chip vanishes and the recall cannot be finished (the live "Hawthorne" defect)`);
  if (answers.some((a) => String(a).includes(','))) problems.push(`"${sec.title}": an answer contains a comma, which is two answers glued into one blank`);
  const bare = lines.join(' ').replace(/_{3,}/g, ' ');
  for (const a of answers) if (new RegExp(`\\b${String(a).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(bare)) problems.push(`"${sec.title}": the answer "${a}" is printed in the template outside its blank`);
  const ds = r.distractors || [];
  if (ds.length < 2 || ds.length > 3) problems.push(`"${sec.title}": ${ds.length} distractors (want 2 to 3)`);
  if (ds.some((d) => lower.includes(String(d).toLowerCase()))) problems.push(`"${sec.title}": a distractor equals an answer`);
  for (const [i, h] of (r.hints || []).entries()) {
    const a = String(answers[i] ?? '').toLowerCase();
    if (a && String(h).toLowerCase().startsWith(a.slice(0, Math.max(3, Math.floor(a.length / 2))))) problems.push(`"${sec.title}": hint ${i + 1} is a prefix of its answer`);
  }
}
{
  /* A/B: the two live defect shapes must fire and a well-formed fill-in must not. */
  const shape = (tpl, ans) => {
    const blanks = tpl.reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
    const lower = ans.map((a) => String(a).toLowerCase());
    return blanks !== ans.length || lower.some((a, i) => lower.indexOf(a) !== i) || tpl.some((l) => (String(l).match(/_{3,}/g) || []).length !== 1);
  };
  if (!shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3', '4', '5'])) problems.push('the fill-in contract check no longer fires on five answers over three blanks');
  if (!shape(['a ___ b', 'c ___ d'], ['Hawthorne', 'Hawthorne'])) problems.push('the fill-in contract check no longer fires on a duplicate answer');
  if (!shape(['a ___ b ___ c'], ['1', '2'])) problems.push('the fill-in contract check no longer fires on two blanks in one line');
  if (shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3'])) problems.push('the fill-in contract check fires on a well-formed fill-in');
}
/*
 * THE THREE COPY-FROM-SCREEN CHECKS, VACUOUS HERE BY DESIGN. (1) packet 26's structural rule: a
 * subsection with a flow body may not carry a reorder, because `learn-steps.js:10` renders the recall
 * under the teaching on the same step. (2) packet 26's overlap rule. (3) packet 27's paraphrase rule.
 * This section authors NO flow bodies, so none of the three can fire — which is why the A/B matters
 * more than the check does.
 */
const tokens = (s) => new Set(String(s).toLowerCase().match(/[a-z]{3,}/g) || []);
const jac = (a, b) => { const A = tokens(a), B = tokens(b); const inter = [...A].filter((x) => B.has(x)).length; return inter / (A.size + B.size - inter || 1); };
const shareDistinctive = (a, b) => { const B = tokens(b); for (const w of tokens(a)) if (w.length >= 5 && B.has(w)) return true; return false; };
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const flows = (sec.body || []).filter((b) => b.type === 'flow');
  if (flows.length) problems.push(`"${sec.title}" carries a flow box AND a reorder recall: the answer's ORDER is printed above it (packet 26)`);
  const steps = flows.flatMap((f) => (f.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x)));
  for (const item of r.correctOrder || []) for (const st of steps) {
    if (jac(item, st) >= 0.6) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares ${Math.round(jac(item, st) * 100)}% of its words with a flow step on the same screen`);
    else if (shareDistinctive(item, st)) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares a distinctive word with a flow step on the same screen — a paraphrase is still a copy (packet 27)`);
  }
}
{
  const item = 'Study the job to find the quickest method';
  const verbatim = 'Study the job to find the quickest method';
  const paraphrase = 'Examine the job in order to find the fastest method';
  const unrelated = 'A matrix lays a project across the functions';
  if (jac(item, verbatim) < 0.6) problems.push('the reorder-overlap check no longer fires on a verbatim flow step');
  if (!shareDistinctive(item, paraphrase)) problems.push('the paraphrase check no longer fires on a reworded flow step');
  if (shareDistinctive(item, unrelated)) problems.push('the paraphrase check fires on a flow that teaches something else');
  if (SUBSECTIONS.some((s) => (s.body || []).some((b) => b.type === 'flow'))) problems.push('a flow body appeared in this section — the three copy-from-screen checks stop being vacuous, so read them');
}
/*
 * RULE 6 GENERALISED TO EVERY RECALL TYPE (packet 29's Verify B). The measure is not word overlap,
 * which any recall on a topic shares with the teaching of that topic. It is whether the ANSWER is
 * recoverable: for a fill-in, a single sentence above that matches the template line AND supplies the
 * missing word; for a classify, an item printed verbatim above; for a match, a left and its right in
 * ONE sentence above. `examMatters` is in the corpus, because leaving it out was the check's own blind
 * spot — Verify B found a fill-in's two answers printed in the Exam Matters box 218 units above.
 */
/*
 * THE THRESHOLDS AND THE SENTENCE SPLIT ARE V029'S, NOT PACKET 29'S — AND THAT CHANGED THE NUMBER
 * FROM 0 TO 9 ON THIS SECTION. V029 is another session's finding against packet 29's runner, the
 * one this check was copied from, and it names four compounding reasons `recoverable()` measures
 * ABOVE the defect rather than at it. Two of them are fixable here and both are applied:
 *
 *   - **The split included `;` and `:`**, so a give-away across a colon was invisible. A key idea
 *     of the form "X is Y: the reason is Z" is one sentence to a reader and was two to the check.
 *     Split on `.!?` only.
 *   - **The thresholds sat above the real defects.** 0.85 for a fill-in and 0.95 for a reorder,
 *     where V029 measured real give-aways scoring 0.70 and 0.75. Lowered to 0.70 / 0.75 / 0.70.
 *
 * Run against this section as first authored, the corrected test found NINE recalls answerable by
 * scrolling up where the inherited one reported zero — a fill-in whose answer was "cannot" beside a
 * sentence saying a machinist cannot work a sewing line from home, a classify item printed verbatim
 * in a realExample, a reorder's first item restating the paragraph above it. All nine were reworked.
 * This is the programme's own rule twice over: a check that reuses the implementation's assumptions
 * cannot see its blind spot, and a green result from an inherited check is a claim, not evidence.
 *
 * The other two reasons V029 names are NOT fixed here, and they are why this check is a floor and
 * not a verdict: the three reorder-specific rules are vacuous in a section with no flow bodies, and
 * a lexical overlap test cannot see a give-away that has been paraphrased. V029 is open on packet
 * 2.7 with a measured house baseline of 61% staged and 86% live; this section is 0 of 37 against the
 * corrected test, which is worth having and is not the same as 0 of 37 against a human.
 */
const sentencesOf = (sec) => [sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || [])]), sec.realExample?.text, sec.misconception, sec.examMatters]
  .filter(Boolean).flatMap((x) => String(x).split(/(?<=[.!?])\s+/))
  .map((x) => String(x).toLowerCase().replace(/\*\*/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim())
  .filter((x) => x.split(' ').length > 3);
const wordsOf = (x) => String(x).toLowerCase().replace(/\*\*/g, '').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
const share = (a, b) => { const B = new Set(wordsOf(b)); const A = wordsOf(a); return A.length ? A.filter((w) => B.has(w)).length / A.length : 0; };
const recoverable = (sec) => {
  const r = sec.recall; if (!r) return [];
  const sents = sentencesOf(sec); const out = [];
  if (r.type === 'fillin') {
    (r.template || []).forEach((lineRaw, i) => {
      const stem = String(lineRaw).replace(/_{3,}/g, ' ');
      const ans = String((r.answers || [])[i] ?? '');
      const aw = wordsOf(ans);
      if (!aw.length) return;
      for (const sent of sents) if (share(stem, sent) >= 0.70 && aw.every((w) => sent.includes(w))) out.push(`fill-in line ${i + 1} and its answer "${ans}" are both in one sentence above it`);
    });
  } else if (r.type === 'classify') {
    for (const g of r.groups || []) for (const it of g.items || []) for (const sent of sents) if (share(it, sent) >= 0.70) out.push(`classify item all but printed above: "${String(it).slice(0, 44)}"`);
  } else if (r.type === 'match') {
    for (const pr2 of r.pairs || []) for (const sent of sents) if (share(pr2.left, sent) >= 0.70 && share(pr2.right, sent) >= 0.70) out.push(`match pair given in one sentence above: "${pr2.left}" / "${pr2.right}"`);
  } else if (r.type === 'reorder') {
    for (const it of r.correctOrder || []) for (const sent of sents) if (share(it, sent) >= 0.75) out.push(`reorder item printed verbatim above: "${String(it).slice(0, 44)}"`);
  }
  return [...new Set(out)];
};
for (const sec of SUBSECTIONS) for (const why of recoverable(sec)) problems.push(`"${sec.title}": ${why} — the recall is answerable by scrolling up (Verify B, packet 29)`);
{
  /* A/B: the key-idea-minus-one-word fill-in must fire, and an applied one on the same topic must not. */
  /*
   * THE NEGATIVE CONTROL IS A REAL SHIPPED SUBSECTION, NOT AN INVENTED ONE. V029's fourth reason is
   * that packet 29's A/B paired a real recall with a one-sentence teaching text that omitted the
   * body paragraph the real step carries — so the control was a stripped-down fake of the step it
   * was clearing, and of course it passed. This control is `hierarchy-and-chain-of-command` exactly
   * as built, body and all, which is the strongest available: if the applied fill-in is recoverable
   * from the real text, the check must say so.
   */
  const real = SUBSECTIONS.find((x) => x.id.endsWith(':trade-as-a-proportion-of-gdp'));
  const teach = { keyIdea: real.keyIdea, body: real.body, realExample: real.realExample, misconception: real.misconception, examMatters: real.examMatters };
  const copied = { ...teach, recall: { type: 'fillin', template: ['The first characteristic is a ___, not a total'], answers: ['ratio'] } };
  const applied = { ...teach, recall: { type: 'fillin', template: [`An economy trading ${bn(56)} on output of ${bn(80)} is ___ open`], answers: [pct(70)] } };
  if (!recoverable(copied).length) problems.push('the answer-recoverable check no longer fires on a fill-in that is the key idea with one word removed');
  if (recoverable(applied).length) problems.push('the answer-recoverable check fires on a fill-in that applies the idea to figures');
}
/* ── A RECALL MAY NOT NEED A LATER SUBSECTION (Layer 6, this packet) ───────── */
/*
 * THE MIRROR IMAGE OF COPY-FROM-SCREEN, AND NOTHING IN THE PROGRAMME LOOKED FOR IT. Every check
 * this section inherited asks whether an answer is available ABOVE the widget. None asks whether it
 * is available only BELOW. Layer 6 found seven: a match on step 2 whose answers were "temporary
 * contracts", "outsourcing" and "flexible hours", all taught on steps 3 to 5; a four-style match on
 * the PATERNALISTIC step, where two of the four styles had not been reached; a classify quoting a
 * pay rate that appears a whole chapter later. A student meeting those cannot answer them, and the
 * failure is invisible to a builder reading the section top to bottom because by then they know it
 * all.
 *
 * The measure is the section's OWN vocabulary — the spec's lists, which are the terms a student is
 * given — and the rule is: a recall may name a term only if a subsection at or before its own
 * teaches it. `TEACHING_TERMS` is imported from the module that holds the lists, so the check
 * cannot drift from what the section actually teaches.
 *
 * Both fixes Layer 6 proposed are in use: rewrite the widget to test only its own subsection, or
 * move a widget that spans a group onto the group's LAST member, which is where the four-style
 * match and the three-way "job" sort now live.
 */
{
  const slugOf = (sec) => sec.id.replace(`${SECTION}:sub:`, '');
  const order = SUBSECTIONS.map(slugOf);
  /* Where each term is first taught, by subsection index. */
  const firstTaught = new Map();
  SUBSECTIONS.forEach((sec, i) => {
    const text = `${sec.title} ${sec.keyIdea} ${(sec.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')}`).join(' ')}`.toLowerCase();
    for (const term of TEACHING_TERMS) if (!firstTaught.has(term) && text.includes(term)) firstTaught.set(term, i);
  });
  const recallStrings = (r) => {
    if (!r) return [];
    if (r.type === 'fillin') return [...(r.template || []), ...(r.answers || []), ...(r.distractors || [])];
    if (r.type === 'classify') return (r.groups || []).flatMap((g) => [g.name, ...(g.items || [])]);
    if (r.type === 'match') return (r.pairs || []).flatMap((x) => [x.left, x.right]);
    if (r.type === 'reorder') return r.correctOrder || [];
    return [];
  };
  SUBSECTIONS.forEach((sec, i) => {
    const text = recallStrings(sec.recall).join(' ').toLowerCase();
    for (const term of TEACHING_TERMS) {
      if (!text.includes(term)) continue;
      const at = firstTaught.get(term);
      if (at != null && at > i) problems.push(`"${sec.title}" (step ${i + 1}) has a recall naming "${term}", which is first taught in "${SUBSECTIONS[at].title}" (step ${at + 1}) — a student meeting this widget cannot answer it (Layer 6)`);
    }
  });
  {
    /* A/B: a forward reference must fire and a backward one must not. */
    const probe = (mine, termIdx) => termIdx > mine;
    if (!probe(1, 4)) problems.push('the forward-reference check no longer fires on a term taught four steps later');
    if (probe(9, 3)) problems.push('the forward-reference check fires on a term taught earlier, which is synoptic and fine');
    if (!order.length) problems.push('the forward-reference check has no subsection order to work from');
  }
}

/* ── A PRACTICE ITEM MUST BE PINNED TO THE CHAPTER IT TESTS ────────────────── */
/*
 * The pins DERIVE from each item's own `block` tag, which makes a pin to a chapter that does not
 * exist unrepresentable — and cannot see a tag that is simply WRONG. Layer 6 found the 20-mark
 * Evaluate, "the most important factor in motivating a workforce is pay", pinned to Leadership: its
 * guidance is Taylor, Maslow, Herzberg, Mayo, piecework and the profit share, with no leadership in
 * it at all, and a student practising Leadership was handed it. The tag is now checked against the
 * CONTENT: a practice item has to share more distinctive vocabulary with the block it is pinned to
 * than with any other block.
 */
{
  const blockText = content.map((b) => `${b.title} ${b.sections.map((x) => `${x.title} ${x.keyIdea} ${(x.body || []).map((y) => `${y.text || ''} ${(y.items || []).join(' ')}`).join(' ')}`).join(' ')}`.toLowerCase());
  const distinctive = (s2) => [...new Set(String(s2).toLowerCase().match(/[a-z]{6,}/g) || [])];
  PRACTICE.forEach((pItem, i) => {
    const mine = BLOCKS.indexOf(pItem.block);
    const words2 = distinctive(`${pItem.question} ${pItem.guidance}`);
    if (!words2.length) return;
    const scores = blockText.map((t) => words2.filter((w) => t.includes(w)).length / words2.length);
    const best = scores.indexOf(Math.max(...scores));
    if (best !== mine && scores[best] - scores[mine] > 0.05) {
      problems.push(`practice ${i} (${pItem.command}) is pinned to "${pItem.block}" but shares ${Math.round(scores[best] * 100)}% of its vocabulary with "${BLOCKS[best]}" against ${Math.round(scores[mine] * 100)}% — a student practising the wrong chapter (Layer 6)`);
    }
  });
}

/* Every reorder's sequence must be taught by an extras chain, which is the only source left. */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const sourced = EXTRAS.chains.some((chain) => {
    let last = -1, matched = 0;
    for (const item of r.correctOrder) {
      let best = -1, bestScore = 0;
      (chain.steps || []).forEach((st, i) => { if (i <= last) return; const j = Math.max(jac(item, st), shareDistinctive(item, st) ? 0.2 : 0); if (j > bestScore) { bestScore = j; best = i; } });
      if (best >= 0 && bestScore >= 0.2) { matched += 1; last = best; }
    }
    return matched / r.correctOrder.length >= 0.5;
  });
  if (!sourced) problems.push(`"${sec.title}": no extras chain teaches this reorder's sequence in this order — and with no flow bodies in this section, a chain is the only source there is`);
}

/* ── an explanation may not name an option by its POSITION (packet 26) ─────── */
const BY_POSITION = /\bthe (first|second|third|fourth|last|other|final) (option|answer|choice|distractor|one)\b|\boption (?:A|B|C|D|one|two|three|four)\b|\b(?:answer|option) \((?:a|b|c|d)\)/i;
for (const q of QUIZ) if (BY_POSITION.test(q.explanation)) problems.push(`quiz explanation names an option by position: "${q.question.slice(0, 60)}" — placeKeys deals the key into a slot and F074 shuffles again, so it describes whatever lands there (packet 26)`);
{
  if (!BY_POSITION.test('The second option nets the two flows rather than adding them.')) problems.push('the option-position check no longer fires on "the second option"');
  if (BY_POSITION.test(`Using exports alone gives ${pct(30)}, which is a different measure.`)) problems.push('the option-position check fires on an option named by its content');
}

/* ── quiz shape ────────────────────────────────────────────────────────────── */
for (const q of QUIZ) {
  const opts = q.options.map((o) => String(o).trim().toLowerCase());
  if (new Set(opts).size !== opts.length) problems.push(`duplicate options in "${q.question.slice(0, 60)}"`);
  if (q.options.length !== 4) problems.push(`${q.options.length} options in "${q.question.slice(0, 60)}"`);
  if (!q.explanation || q.explanation.length < 80) problems.push(`thin explanation on "${q.question.slice(0, 60)}"`);
}
{
  /*
   * `quiz-01` IS AN EXACT DUPLICATE PAIR AND `topFix-02` NAMES FOUR MORE. `quiz.near-dup` fires at a
   * token Jaccard of 0.5, so the check here is the same measure applied to this bank before the
   * validator sees it, and it reports the PAIR rather than one member.
   */
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    const s = jac(QUIZ[i].question, QUIZ[j].question);
    if (s >= 0.5) problems.push(`two quiz stems share ${Math.round(s * 100)}% of their words: "${QUIZ[i].question.slice(0, 50)}" and "${QUIZ[j].question.slice(0, 50)}" (quiz-01 is an EXACT duplicate pair in the live bank)`);
  }
}
{
  /* `quiz.long-correct` fires only above 1.5×, so a bank whose key is simply the LONGEST option 40%
   * of the time passes it (packet 21). Baseline is 25%. */
  const longest = QUIZ.filter((x) => { const c = String(x.options[x.correctIndex]).length; return x.options.every((o, j) => j === x.correctIndex || String(o).length < c); }).length;
  const shareLong = longest / QUIZ.length;
  if (shareLong > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${QUIZ.length} items (${Math.round(shareLong * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}
{
  const hist = [0, 0, 0, 0];
  QUIZ.forEach((x) => { hist[x.correctIndex] += 1; });
  if (Math.max(...hist) - Math.min(...hist) > 3) problems.push(`answer histogram ${JSON.stringify(hist)} is lumpy`);
}
/*
 * `structure-05` IS THAT THE QUIZ AND THE EXTRAS TEST VOCABULARY THE BODY NEVER INTRODUCES — "race
 * to the bottom", the characteristics of globalisation, greenfield against merger FDI, and `TNC`
 * itself, which the live body never expands. Three of those four are answered by REMOVAL, because
 * they are 0 hits in `econ_spec.txt`; this check answers the fourth and guards the rest. Every
 * specification term this section is responsible for must be TAUGHT before any item can test it.
 */
{
  const taught = SUBSECTIONS.map((s) => `${s.title} ${s.keyIdea} ${(s.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')}`).join(' ')}`).join(' ').toLowerCase();
  const required = [
    ...CHARACTERISTICS.map(([k]) => k), ...CAUSES.map(([k]) => k),
    ...BENEFITS.map(([k]) => k), ...COSTS.map(([k]) => k),
    'transnational', 'foreign direct investment', 'consumer surplus', 'transfer pricing',
  ];
  /*
   * A MULTI-WORD BULLET IS TAUGHT WHEN ITS PARTS ARE, NOT WHEN ITS HEADING IS (packet 30). "Lower
   * prices and higher consumer surplus" is one leaf taught as two ideas in one subsection, and
   * "TNCs and FDI" is one characteristic taught in two. So the measure is each significant PART:
   * every word of the bullet that is not a connective has to appear somewhere in the teaching text.
   * That is still sharp — `migration` is one word and fails the moment it is missing.
   */
  const parts = (t) => t.toLowerCase().split(/\s+(?:and|or|versus|vs)\s+|,\s*/).map((x) => x.trim()).filter(Boolean);
  const untaught = [...new Set(required.filter((t) => !parts(t).every((x) => taught.includes(x))))];
  if (untaught.length) problems.push(`the specification names these and the section does not teach them: ${untaught.join(', ')} — structure-05 describes exactly this hole, vocabulary quizzed and never introduced`);
  {
    /* A/B: the hole structure-05 describes must fire, and a leaf taught in two halves must not. */
    const probe = (text, term) => !parts(term).every((x) => text.includes(x));
    if (!probe('trade as a proportion of gdp, tncs and fdi', 'Migration')) problems.push('the taught check no longer fires on a characteristic the section omits');
    if (probe('lower prices arrive first, and higher consumer surplus follows from them', 'Lower prices and higher consumer surplus')) problems.push('the taught check fires on a leaf taught as two ideas in one subsection');
  }
  const quizText = QUIZ.map((q) => `${q.question} ${q.options.join(' ')} ${q.explanation}`).join(' ').toLowerCase();
  const quizzedNotTaught = [...new Set(required.filter((t) => parts(t).some((x) => quizText.includes(x)) && !parts(t).every((x) => taught.includes(x))))];
  if (quizzedNotTaught.length) problems.push(`quizzed but never taught: ${quizzedNotTaught.join(', ')}`);
}

/* ── pins, and the free-quiz ceiling ──────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; PreTest.jsx slices the unreserved pool at three`);
if (![...unpinned].every((i) => i < 3)) problems.push('the three unpinned quiz items are not FIRST in the array — a free student is served only PREVIEW_LIMITS.quiz items, so the pre-test pool must be at the front');
{
  const pinned = Object.values(quizIndices).flat();
  const dup = pinned.filter((x, i) => pinned.indexOf(x) !== i);
  if (dup.length) problems.push(`quiz item pinned by more than one block: ${dup.join(', ')}`);
  if (pinned.some((i) => unpinned.has(i))) problems.push('a pre-test item is also pinned to a chapter check-in — the student would meet the same question twice');
  if (BLOCKS.every((b, i) => (quizIndices[b] || [])[0] === i)) problems.push('quizIndices are 0,1,2,… in block order, which is `pins.identity` and exactly the live defect (structure-01)');
  const pp = Object.values(practiceIndices).flat();
  const pdup = pp.filter((x, i) => pp.indexOf(x) !== i);
  if (pdup.length) problems.push(`practice item pinned by more than one block: ${pdup.join(', ')}`);
  const orphanPractice = PRACTICE.map((_, i) => i).filter((i) => !pp.includes(i));
  if (orphanPractice.length) problems.push(`practice item(s) ${orphanPractice.join(', ')} pinned to no block — structure-01 records practice[3] and [4] orphaned in the live section`);
}
/*
 * THE BLOCK COUNT IS A DECISION WITH A MEASURED PRICE (V016, DECISIONS 16 September). Up to seven
 * blocks a signed-out student gets three pre-test questions and every chapter keeps its check-in
 * quiz. At eight the pre-test drops to two; at nine a chapter loses its quiz and the runner refuses.
 * Six is deliberate here: `2 + 6 = 8` against `FREE_QUIZ_MAX` 10, with room for the top-up.
 */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz for a signed-out student (lib/preview-limits.js)`);
if (BLOCKS.length === 8) console.log('NOTE: at 8 blocks a signed-out student’s pre-test is 2 questions, not 3.');
if (content.length !== BLOCKS.length) problems.push(`${content.length} blocks built against ${BLOCKS.length} declared`);

/* ── practice guidance: two paragraphs, and a clean opening ────────────────── */
const ALLOCATION = /\(\s*\d+\s*marks?\s*\)|\(\s*\d+\s*\)/;
for (const p of PRACTICE) {
  const paras = String(p.guidance).split('\n').filter((x) => x.trim());
  if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 50)}" has one guidance paragraph — GUIDED mode would print the whole mark scheme above the answer box`);
  if (ALLOCATION.test(paras[0] || '')) problems.push(`practice "${p.question.slice(0, 50)}" allocates marks in its OPENING paragraph, which is the half GUIDED mode shows`);
  if (p.marks > 6 && ALLOCATION.test(p.guidance)) problems.push(`practice "${p.question.slice(0, 50)}" is a ${p.marks}-mark item and its guidance allocates points; tariffs above 6 are not marked that way (\`practice.levels\`)`);
  if (!new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 50)}" does not end with its own tariff in brackets`);
}
{
  if (!ALLOCATION.test(`The tax is ${mn(N.profitTax / 1_000_000)} (1 mark).`)) problems.push('the practice.opening check no longer fires on a mark allocation');
  if (ALLOCATION.test('Decide what goes on the top of the fraction before you start.')) problems.push('the practice.opening check fires on planning advice');
}

/* ── the arithmetic spine, re-derived ──────────────────────────────────────── */
/*
 * THE PROPERTIES THE WHOLE SECTION RESTS ON, asserted from the functions rather than read off a
 * table. Six numbers in `_packet34-util.mjs` generate every figure on every surface — two growth
 * rates, two fixed costs, a demand slope and a tax rate — so these assertions are what stop a change
 * to any of them quietly teaching a chart that disagrees with a flashcard.
 */
const eq = (label, got, want) => { if (got !== want) problems.push(`${label}: got ${got}, expected ${want}`); };
const near = (label, got, want, tol = 0.05) => { if (Math.abs(got - want) > tol) problems.push(`${label}: got ${got}, expected about ${want}`); };

/* 1a — the openness series IS two growth rates, and the ratio rises for that reason alone. */
eq('decade points in the series', T.series.length, 6);
eq('the first point is fifty years ago', T.series[0].t, 0);
eq('the last point is today', T.series[T.series.length - 1].t, 50);
near('GDP fifty years ago', T.first.gdp, T.gdp0);
near('trade fifty years ago', T.first.trade, T.trade0);
/*
 * A PRINTED RATIO MUST DIVIDE THE PRINTED QUANTITIES, AND NOTHING ELSE LOOKED FOR THAT. Layer 6
 * found the section giving output as $284.3bn and trade as $221.0bn and then calling the ratio
 * 77.8% — the unrounded division. A student dividing the two figures in front of them gets 77.7%.
 * Every other check in this file recomputes a figure from the same unrounded source the content
 * used, so all of them agreed with each other and all of them were blind to it. This check uses
 * ONLY the two numbers the page shows, which is the student's own arithmetic.
 */
for (const pt of T.series) {
  near(`GDP at t=${pt.t} compounds at ${T.gdpPct}%`, pt.gdp, Math.round(10 * T.gdp0 * (1 + T.gGdp) ** pt.t) / 10);
  near(`trade at t=${pt.t} compounds at ${T.tradePct}%`, pt.trade, Math.round(10 * T.trade0 * (1 + T.gTrade) ** pt.t) / 10);
  eq(`openness at t=${pt.t} is the PRINTED trade over the PRINTED output`, pt.openness, round2(Math.round((1000 * pt.trade) / pt.gdp) / 10));
}
{
  /* A/B: the defect Layer 6 found must fire, and the corrected series must not. */
  const unrounded = round2(Math.round((1000 * 221.0426) / 284.2504) / 10);
  const printed = round2(Math.round((1000 * 221.0) / 284.3) / 10);
  if (unrounded === printed) problems.push('the printed-ratio check can no longer tell the two derivations apart, so it would not have caught the 77.8% that Layer 6 did');
  if (T.last.openness !== printed) problems.push(`the last openness figure is ${T.last.openness} and the printed division gives ${printed}`);
}
if (!(T.gTrade > T.gGdp)) problems.push('trade does not compound faster than output, so the first characteristic has no mechanism');
for (let i = 1; i < T.series.length; i += 1) {
  if (T.series[i].openness <= T.series[i - 1].openness) problems.push(`openness does not rise between t=${T.series[i - 1].t} and t=${T.series[i].t}`);
}
near('trade is 18.4 times its starting level', T.tradeMultiple, round2(T.last.trade / T.first.trade), 0.06);
near('output is 7.1 times its starting level', T.gdpMultiple, round2(T.last.gdp / T.first.gdp), 0.06);
if (!(T.tradeMultiple > T.gdpMultiple)) problems.push('the trade multiple is not larger than the output multiple, so the ratio cannot have risen');

/* 3a-3 — the two producers differ ONLY in fixed cost per unit, which is the misconception's refutation. */
eq('the variable cost is the same on both sides', D.ac(D.homeFixed, D.homeQ) - D.homeFixedPerUnit, D.ac(D.worldFixed, D.worldQ) - D.worldFixedPerUnit);
eq('home average cost', D.homePrice, round2(D.homeFixed / D.homeQ + D.variable));
eq('world average cost', D.openPrice, round2(D.worldFixed / D.worldQ + D.variable));
eq('home fixed cost per unit', D.homeFixedPerUnit, round2(D.homeFixed / D.homeQ));
eq('world fixed cost per unit', D.worldFixedPerUnit, round2(D.worldFixed / D.worldQ));
eq('the price gap is entirely the fixed cost per unit', round2(D.homePrice - D.openPrice), round2(D.homeFixedPerUnit - D.worldFixedPerUnit));
if (D.worldFixed <= D.homeFixed) problems.push('the world producer spends LESS on its plant, which makes the scale story a spending story');

/* 3a-4 — the demand line, the two quantities, and the surplus gain that splits exactly. */
eq('demand at the home price', D.qBefore, D.homeQ);
eq('demand at the open price', D.qAfter, D.intercept - D.slope * D.openPrice);
eq('the choke price', D.choke, D.intercept / D.slope);
eq('surplus before', D.csBefore, round2(0.5 * (D.choke - D.homePrice) * D.qBefore));
eq('surplus after', D.csAfter, round2(0.5 * (D.choke - D.openPrice) * D.qAfter));
eq('the gain is the difference of the two triangles', D.csGain, round2(D.csAfter - D.csBefore));
eq('the gain to existing buyers is the rectangle', D.toExisting, round2(D.fall * D.qBefore));
eq('the gain to new buyers is the triangle', D.toNew, round2(0.5 * D.fall * (D.qAfter - D.qBefore)));
eq('rectangle plus triangle equals the whole gain', round2(D.toExisting + D.toNew), D.csGain);
if (D.toNew >= D.toExisting) problems.push('the new buyers gain more than the existing ones, which is not what this demand line says');

/* 2b, 3a-2, 3b-4, 3b-6 — the project, the tax and the two ways the tax is reduced. */
eq('the wage bill', N.wageBill, N.jobs * N.wage);
eq('profit tax', N.profitTax, round2((N.taxRate / 100) * N.profit));
eq('income tax', N.incomeTax, round2((N.incomeTaxRate / 100) * N.wageBill));
eq('total revenue from the plant', N.revenue, round2(N.profitTax + N.incomeTax));
eq('the profit left at home after the fee', N.shiftedHome, N.profit - N.licence);
eq('tax at home after the fee', N.taxHome, round2((N.taxRate / 100) * N.shiftedHome));
eq('tax on the fee abroad', N.taxAway, round2((N.lowRate / 100) * N.licence));
eq('the group bill after the fee', N.groupTax, round2(N.taxHome + N.taxAway));
eq('the revenue the host loses', N.revenueLost, round2(N.profitTax - N.taxHome));
if (N.groupTax >= N.profitTax) problems.push('the transfer price does not reduce the group bill, so the fourth cost has no mechanism');
if (N.lowRate >= N.taxRate) problems.push('the other jurisdiction does not tax more lightly, so there is nothing to shift the profit towards');
eq('the gain from the proposed rise', N.riseGain, round2(((N.proposedRate - N.taxRate) / 100) * N.profit));
eq('what a departure would cost', N.departureCost, N.revenue);
/*
 * THE BREAK-EVEN PROBABILITY IS `gain ÷ (gain + loss)` AND NOT `gain ÷ loss`. Relative to today the
 * government gains `riseGain` if the plant stays and loses `departureCost` if it goes, so expected
 * value is `riseGain − (riseGain + departureCost)·p`. The other ratio is 17.9% against 15.2% and
 * answers a question nobody asked; the first draft of this section printed it, and the recall in
 * the same subsection would have been marked against a number the body did not support.
 */
eq('the break-even probability', N.breakEvenOdds, round2(Math.round((1000 * N.riseGain) / (N.riseGain + N.departureCost)) / 10));
if (N.riseGain >= N.departureCost) problems.push('the tax rise gains more than the plant pays, so the sixth cost has no arithmetic behind it');

/* 2a-4 — freight as a share of price, for a cheap good and for a valuable one. */
if (!(N.freightAfter < N.freightBefore)) problems.push('freight does not fall, so the fourth cause has no mechanism');
near('freight on the cheap good before', round2((100 * N.freightBefore) / N.cheapGoodFactory), 150);
near('freight on the cheap good after', round2((100 * N.freightAfter) / N.cheapGoodFactory), 37.5);
eq('the device crosses two borders', N.grossTrade, N.componentValue + N.deliveredValue);
if (N.grossTrade <= N.deliveredValue) problems.push('split production does not raise recorded trade above the value of the product');

/* 3b-5 — the gap that opens inside one country. */
if (!(N.wage > D.homeWage && D.reWage < D.homeWage)) problems.push('the new plant does not pay more than the closed one and the re-employed less, so the inequality leaf has no figures');
eq('the gap between the two groups', round2(N.wage / D.reWage), 2);

/* The spec's own list lengths, so a bullet cannot be dropped silently. */
eq('characteristics of globalisation', CHARACTERISTICS.length, 3);
eq('causes of globalisation', CAUSES.length, 5);
eq('possible benefits', BENEFITS.length, 6);
eq('possible costs', COSTS.length, 6);

/* ── every figure re-derived out of the emitted SVG ───────────────────────── */
/*
 * A figure computed correctly and printed into the wrong `<text>` is the same defect one layer along
 * (packets 19, 23, 25, 29, 30). So each diagram is read BACK out of its own emitted SVG and the
 * numbers on it are recomputed from the spine rather than compared with the module that drew them.
 */
const svgOf = (d) => (d.svg ? [{ label: d.title, svg: d.svg }] : d.scenarios);
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
  const a = m[1];
  const attr = (k) => { const r = a.match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || 11, anchor: attr('text-anchor') || 'start' };
});
const frameOf = (svg) => { const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1].trim().split(/[\s,]+/).map(Number); return { w: vb[2], h: vb[3] }; };
{
  /*
   * THE OPENNESS CHART IS READ BACK AS A SHAPE, NOT AS A LIST OF LABELS. The line is one `polyline`
   * and its points are the only place the series reaches the screen, so the check recomputes each
   * y from `TAMIRA.openness` and compares the plotted position — which is what `topFix-04`'s
   * "gridlines with no source" clause is really about.
   */
  const chart = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B1]))[0];
  const pts = ((chart.svg.match(/<polyline points="([^"]+)"/) || [])[1] || '').trim().split(/\s+/).map((pair) => pair.split(',').map(Number));
  if (pts.length !== T.series.length) problems.push(`the openness chart plots ${pts.length} points against ${T.series.length} in the series`);
  else {
    for (let i = 1; i < pts.length; i += 1) {
      if (!(pts[i][0] > pts[i - 1][0])) problems.push('the openness chart does not run left to right');
      if (!(pts[i][1] < pts[i - 1][1])) problems.push(`the openness chart falls between point ${i - 1} and point ${i}, and the series rises throughout`);
    }
    /*
     * THE SCALE IS FITTED FROM TWO POINTS AND THE OTHERS ARE CHECKED AGAINST IT. The first version
     * of this check assumed the lowest plotted point sat at openness zero, which is a statement
     * about where the axis starts rather than about the drawing, and it reported all six points
     * wrong on a chart that was right. A linear scale has two unknowns; measure them, then test.
     */
    const first = { y: pts[0][1], o: T.series[0].openness };
    const last = { y: pts[pts.length - 1][1], o: T.series[T.series.length - 1].openness };
    const unitsPerPoint = (first.y - last.y) / (last.o - first.o);
    for (let i = 0; i < pts.length; i += 1) {
      const want = first.y - (T.series[i].openness - first.o) * unitsPerPoint;
      if (Math.abs(pts[i][1] - want) > 1.5) problems.push(`the openness chart plots ${pct(T.series[i].openness)} at y=${round2(pts[i][1])} where the scale of the other points puts it at ${round2(want)}`);
    }
    if (!(unitsPerPoint > 0)) problems.push('the openness chart\'s vertical scale does not increase upwards');
  }
  const chartBodies = textsOf(chart.svg).map((t) => t.body).join(' ');
  for (const want of [pct(T.first.openness), pct(T.last.openness), pct(T.gdpPct), pct(T.tradePct)]) {
    if (!chartBodies.includes(want)) problems.push(`the openness chart does not print ${want}`);
  }

  /* The causes table: five rows, and the freight arithmetic in its note. */
  const causes = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B2]))[0];
  const causeBodies = textsOf(causes.svg).map((t) => t.body);
  for (const [name] of CAUSES) {
    const short = name === 'Transport and communications' ? 'Transport and comms' : name;
    if (!causeBodies.includes(short)) problems.push(`the causes table does not name "${short}" — the specification lists five and the table must carry all of them`);
  }

  /* The FDI bands: the project's own figures, each recomputed. */
  const fdi = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B3]))[0];
  const fdiBodies = textsOf(fdi.svg).join ? textsOf(fdi.svg).map((t) => t.body).join(' ') : '';
  for (const want of [`$${N.capital / 1_000_000}m`, `$${N.wageBill / 1_000_000}m`, `$${N.suppliers / 1_000_000}m`, `$${N.revenue / 1_000_000}m`]) {
    if (!fdiBodies.includes(want)) problems.push(`the FDI diagram does not print ${want}`);
  }

  /* The surplus diagram: the demand line's own geometry, recomputed from qAt. */
  const surplus = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B4]))[0];
  const sBodies = textsOf(surplus.svg).map((t) => t.body).join(' ');
  for (const want of [`$${D.homePrice}`, `$${D.openPrice}`, `${D.qBefore / 1000}k`, `${D.qAfter / 1000}k`, `$${D.csAfter / 1_000_000}m`, `$${D.toExisting / 1_000_000}m`, `$${D.toNew / 1_000_000}m`]) {
    if (!sBodies.includes(want)) problems.push(`the consumer-surplus diagram does not print ${want}`);
  }
  /* The two shaded areas must be in the right proportion to each other: the gain is the trapezium. */
  const polys = [...surplus.svg.matchAll(/<polygon points="([^"]+)"/g)].map((m) => m[1].split(',').map((pair) => pair.trim().split(/\s+/).map(Number)));
  const area = (poly) => Math.abs(poly.reduce((a, [x1, y1], i) => { const [x2, y2] = poly[(i + 1) % poly.length]; return a + (x1 * y2 - x2 * y1); }, 0) / 2);
  if (polys.length !== 2) problems.push(`the consumer-surplus diagram shades ${polys.length} areas, and it teaches two`);
  else {
    const drawn = area(polys[0]) / area(polys[1]);
    const want = D.csGain / D.csBefore;
    if (Math.abs(drawn - want) / want > 0.05) problems.push(`the shaded gain is ${round2(drawn)}× the old surplus on the drawing and ${round2(want)}× in the arithmetic`);
  }

  /* The transfer-pricing bars: length is the tax bill, so the ratio of the bars is the ratio of the bills. */
  const transfer = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B5]))[0];
  const bars = [...transfer.svg.matchAll(/<rect x="150"[^>]*width="([\d.]+)"/g)].map((m) => parseFloat(m[1]));
  if (bars.length !== 2) problems.push(`the transfer-pricing diagram draws ${bars.length} bars, and it compares two`);
  else {
    const drawn = bars[1] / bars[0];
    const want = N.groupTax / N.profitTax;
    if (Math.abs(drawn - want) > 0.01) problems.push(`the transfer-pricing bars are in the ratio ${round2(drawn)} and the tax bills are in the ratio ${round2(want)}`);
  }
  const tBodies = textsOf(transfer.svg).map((t) => t.body).join(' ');
  for (const want of [`$${N.profitTax / 1_000_000}m`, `$${N.groupTax / 1_000_000}m`, `$${N.taxHome / 1_000_000}m`, `$${N.taxAway / 1_000_000}m`, `$${N.revenueLost / 1_000_000}m`]) {
    if (!tBodies.includes(want)) problems.push(`the transfer-pricing diagram does not print ${want}`);
  }
}

/* ── AN INSTRUCTION TO DRAW MUST BE SATISFIABLE FROM A DIAGRAM THIS SECTION CARRIES ────── */
/*
 * `accuracy-02` IS THIS DEFECT AND NOTHING IN THE PIPELINE COULD SEE IT. The live section's
 * `examMatters` tells students to "Show trade creation and diversion on a diagram" and the section's
 * three diagrams are an indicators chart, an FDI flow and a costs/benefits balance — so a student is
 * told to do something the section never teaches, and the instruction is the only evidence that the
 * diagram is missing. Removing the block removes the string, but a claim resting on "we took it out"
 * is a claim about intention. This makes the class unrepresentable instead.
 *
 * The rule: every student-facing instruction to draw or show something on a diagram must share a
 * distinctive word with a DRAWN diagram this section carries — its title, caption or checklist. A
 * declared table does not count, because a table is a reference sheet and not something a student
 * reproduces under a `Draw (4)`.
 */
{
  const DRAW_INSTRUCTION = /\b(show|sketch|draw|plot)\b[^.!?]{0,70}\b(diagram|curve|chart|axes)\b|\b(diagram|curve|chart)\b[^.!?]{0,40}\b(draw|sketch|plot)\b/i;
  const drawn = DIAGRAMS.filter((d) => d.kind !== 'table');
  const vocab = new Set(drawn.flatMap((d) => [d.title, d.caption || '', ...(d.checklist || [])].join(' ').toLowerCase().match(/[a-z]{6,}/g) || []));
  /*
   * ONE SHARED WORD IS NOT COVERAGE, AND THE FIRST VERSION OF THIS CHECK PROVED IT. "Show trade
   * creation and diversion on a diagram" shares `trade` with the openness chart's title, so a
   * single-word test said this section covers trade creation — the very claim the check exists to
   * refuse. The subject of an instruction is carried by its LONG words, so the measure is two of
   * them, and the generic drawing vocabulary is excluded because every diagram has it.
   */
  const GENERIC = new Set(['diagram', 'diagrams', 'labelled', 'accurately', 'quantitative', 'students', 'showing', 'marked', 'between', 'because', 'something', 'straight', 'horizontal']);
  const distinctive = (sent) => [...new Set((sent.toLowerCase().match(/[a-z]{6,}/g) || []).filter((w) => !GENERIC.has(w)))];
  const covered = (sent) => {
    const words = distinctive(sent);
    const hits = words.filter((w) => vocab.has(w)).length;
    return hits >= Math.min(2, words.length || 1);
  };
  const offenders = [];
  for (const str of readable) {
    for (const sent of String(str).split(/(?<=[.!?])\s+/)) {
      if (!DRAW_INSTRUCTION.test(sent)) continue;
      /* An Appendix 6 gloss describes a command word; it is not an instruction to draw a particular thing. */
      if (/Appendix 6/.test(sent)) continue;
      if (!covered(sent)) offenders.push(sent.trim().slice(0, 110));
    }
  }
  if (offenders.length) problems.push(`${offenders.length} instruction(s) to draw name nothing this section's drawn diagrams carry (accuracy-02): "${offenders[0]}"`);
  {
    /* A/B against the LIVE section's own string, which is the defect in its original words. */
    const live = 'Show trade creation and diversion on a diagram.';
    if (!DRAW_INSTRUCTION.test(live)) problems.push('the draw-instruction check no longer recognises an instruction to draw');
    if (covered(live)) problems.push('the draw-instruction check says this section covers trade creation and diversion, which is 4.3.2 and is not drawn here');
    const mine = `Draw it. The surplus is the area under the demand curve and above the price.`;
    if (DRAW_INSTRUCTION.test(mine) && !covered(mine)) problems.push('the draw-instruction check fires on an instruction the consumer-surplus diagram does satisfy');
  }
}

/* ── nothing drawn outside its canvas: EXTENT, not anchor (packet 25) ──────── */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  for (const tx of textsOf(svg)) {
    if (!tx.body.trim()) continue;
    const w = estWidth(tx.body, tx.size);
    const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
    const right = left + w;
    if (left < -0.5 || right > frame.w + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 40)}" runs from ${round2(left)} to ${round2(right)} in a ${frame.w}-unit frame`);
    if (tx.y < 0 || tx.y > frame.h + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 40)}" sits at y=${tx.y} in a ${frame.h}-unit frame`);
  }
}
{
  const probe = (body, x, anchor, frameW) => { const w = estWidth(body, 11); const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x; return left < -0.5 || left + w > frameW + 0.5; };
  if (!probe('chain of command: 4 links and then some more words', 430, 'start', 560)) problems.push('the canvas-extent check no longer fires on a label that overruns its frame');
  if (probe('Tall', 100, 'start', 560)) problems.push('the canvas-extent check fires on a label that fits');
}

/* ── no two strings overlap: glyph BOXES, with a vertical tolerance ────────── */
/*
 * Grouping `<text>` by exact rounded y compares table cells and nothing else: in packet 29 it
 * reported zero while twelve of nineteen scenarios collided. Two strings one unit apart vertically
 * overlap on screen exactly as much as two on one line, so the comparison is between BOXES. This
 * check found one real collision while this section was being written — the Herzberg motivator list
 * against its own caption, six units apart — and the fix went into the LAYOUT: `herzbergSvg` now
 * computes the caption's position from the wrap rather than assuming it.
 */
const boxOf = (tx) => {
  const w = estWidth(tx.body, tx.size);
  const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
  return { left, right: left + w, top: tx.y - tx.size * 0.8, bottom: tx.y + tx.size * 0.25, tx };
};
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const boxes = textsOf(svg).filter((tx) => tx.body.trim()).map(boxOf);
  for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
    const a = boxes[i], b = boxes[j];
    const dx = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const dy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (dx > 0.5 && dy > 0.5) problems.push(`${d.title} / ${label}: "${a.tx.body.slice(0, 28)}" and "${b.tx.body.slice(0, 28)}" overlap by ${round2(dx)}×${round2(dy)} units at y=${a.tx.y}/${b.tx.y}`);
  }
}
{
  /* A/B: two strings one unit apart vertically and overlapping horizontally must fire; the same two
   * a line apart must not. This is exactly the pair the old check could not see. */
  const hit = (a, b) => { const A = boxOf(a), B = boxOf(b); return Math.min(A.right, B.right) - Math.max(A.left, B.left) > 0.5 && Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top) > 0.5; };
  const one = { body: 'Achievement and Recognition', x: 26, y: 210, size: 10, anchor: 'start' };
  const near = { body: 'Hygiene factors cannot make', x: 26, y: 216, size: 10, anchor: 'start' };
  const far = { body: 'Hygiene factors cannot make', x: 26, y: 240, size: 10, anchor: 'start' };
  if (!hit(one, near)) problems.push('the collision check no longer fires on two strings six units apart vertically');
  if (hit(one, far)) problems.push('the collision check fires on two strings a clear line apart');
}
/*
 * THE SMALLEST FACE, MEASURED AGAINST THE PHONE AS WELL AS THE LAPTOP — and Verify B supplied the
 * number. A Learn Mode diagram renders **313 CSS px wide** at 390x844, measured with
 * `getBoundingClientRect` in the browser, which is neither the 530 the validator's rule assumes nor
 * the 800 of a wide desktop. On the 560-unit frame this section started with, the org chart's row
 * labels came out at 10 units — 5.59px, a third of body text, on the labels that say how many people
 * are on each level. `diagram.table-legible` cannot see it, because it only reads a DECLARED table
 * and an org chart is not one.
 *
 * So the drawn diagrams are on a 440-unit frame with a 12-unit floor (8.54px on the phone, up 53%)
 * and the tables on 440 with a 10-unit floor (7.11px on the phone, 12.05px at 530 — which is what
 * clears the validator). The floor is asserted here rather than trusted: `MIN_FACE` is imported from
 * the module that lays out, so the thing that draws and the thing that checks share one number.
 */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  const floor = d.kind === 'table' ? 10 : MIN_FACE;
  const sizes = textsOf(svg).filter((t) => t.body.trim()).map((t) => t.size);
  const worst = Math.min(...sizes);
  if (worst < floor) problems.push(`${d.title} / ${label}: smallest face is ${worst} units against a floor of ${floor} — ${round2((worst * 313) / frame.w)}px on the 313px a phone gives a diagram`);
  if (frame.w > 440) problems.push(`${d.title} / ${label}: a ${frame.w}-unit frame renders every face at ${round2(440 / frame.w)}× the size a 440-unit frame would (Verify B measured 313 rendered px)`);
}

/* Every declared table's smallest face, reported against the column a laptop really gives (530px). */
for (const d of DIAGRAMS.filter((x) => x.kind === 'table')) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  const sizes = textsOf(svg).map((t) => t.size);
  const worst = Math.min(...sizes);
  const px = round2((worst * 530) / frame.w);
  if (px < 9) problems.push(`${d.title} / ${label}: smallest face is ${worst} units, ${px}px in the 530px column a 1024-wide laptop gives it`);
}
for (const d of DIAGRAMS) {
  if (d.kind === 'table' && Array.isArray(d.checklist) && d.checklist.length) problems.push(`${d.title} declares kind:"table" AND carries a checklist — "what a correct diagram shows" reads as an instruction to reproduce a lookup table (\`diagram.table-checklist\`)`);
  if (d.kind !== 'table' && !(Array.isArray(d.checklist) && d.checklist.length)) problems.push(`${d.title} is a drawn diagram with no checklist, and this section carries a Draw (4) question whose answer is one of them`);
}

/* ── the extras shape the component actually reads (V028) ──────────────────── */
for (const [i, chain] of (EXTRAS.chains || []).entries()) {
  if (!Array.isArray(chain.steps) || !chain.steps.length) problems.push(`extras chain ${i + 1} ("${chain.title}") has no \`steps\` array — ExtrasTab.jsx:62 calls chain.steps.map() with no guard and the tab throws`);
  if (!chain.title) problems.push(`extras chain ${i + 1} has no title`);
  if (!chain.result) problems.push(`extras chain ${i + 1} ("${chain.title}") has no result`);
}
for (const [i, e] of (EXTRAS.evaluation || []).entries()) {
  if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} ("${e.title}") has no \`content\` string`);
}
{
  /*
   * A/B WITH A REAL CONTROL RATHER THAN A PLANTED ONE (packet 29's rule, and its own note: a control
   * you did not construct is worth more than one you did). Packet 28's bundle is on disk and its
   * third chain is V028, so the check is run against it: if it does not fire there, it is decorative.
   */
  const shapeOk = (chains) => chains.every((c) => Array.isArray(c.steps) && c.steps.length);
  if (shapeOk([{ title: 'planted', points: ['a', 'b'] }])) problems.push('the extras-shape check does not fire on a chain carrying `points`');
  if (!shapeOk([{ title: 'ok', steps: ['a', 'b'] }])) problems.push('the extras-shape check fires on a well-formed chain');
  /*
   * PACKET 28 WAS THE REAL CONTROL AND IT IS NO LONGER ONE, BECAUSE THIS PACKET FIXED IT. V028 is
   * closed: its third chain carried `points` instead of `steps` and has been moved to `evaluation`
   * as a `{title, content}` frame, which is what it always was — four judgement considerations, not
   * a sequence. So this A/B now asserts the OPPOSITE of what it first asserted, and the reason is
   * recorded here rather than in a commit message, because the check reads like a regression
   * otherwise. The rule was A/B'd against packet 28 BEFORE the fix and fired on chain 3 exactly;
   * the same run over every `packet-*-bundle` on disk then found the other half of the defect in
   * four more sections, filed as V035.
   */
  try {
    const p28 = await import('./_packet28-assessment.mjs');
    if (!shapeOk(p28.EXTRAS.chains)) problems.push('packet 28 still carries a chain without `steps` — V028 was supposed to be closed by moving it into `evaluation`');
    if (!(p28.EXTRAS.evaluation || []).length) problems.push('packet 28 has no `evaluation` array — V028\'s fix moved its third chain there, so the entry has gone missing');
    if ((p28.EXTRAS.evaluation || []).some((e) => typeof e.content !== 'string' || !e.content.trim())) problems.push('packet 28 now has an evaluation frame with no `content` string, which renders an empty card (V035)');
  } catch { problems.push('could not load packet 28’s assessment module to check V028 stayed fixed'); }
}

/* ── ids, signs, and duplicates ────────────────────────────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(SUBSECTIONS.map((s) => s.id), SUBSECTIONS.filter((s) => s.recall).map((s) => s.recall.id), content.map((b) => b.id));
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dupIds.length) problems.push(`duplicate ids: ${[...new Set(dupIds)].join(', ')} — packet 19 shipped three flashcards with a "-2" suffix and no finding named it`);
{
  const ascii = prose.filter((s) => /\s-\d|\(-\d|=\s?-\d/.test(s));
  if (ascii.length) problems.push(`${ascii.length} strings use an ASCII hyphen as a minus sign: "${ascii[0].slice(0, 70)}"`);
}
{
  /* One currency. `locale.currency` fires when a section mixes them. */
  const other = readable.filter((s) => /[£€₹¥]/.test(s));
  if (other.length) problems.push(`${other.length} strings carry a currency other than dollars: "${other[0].slice(0, 70)}"`);
}
/* No UK-only institution as the frame of an example, and no named real company (accuracy-01). */
ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bcouncil tax\b|\bOfgem\b|\bOfsted\b|\bJohn Lewis\b|\bMarks (?:&|and) Spencer\b|\bM&S\b|\bTesco\b|\bSainsbury\b/gi, 'a UK-only institution or a named real company, for an audience sitting WEC14 in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya');
/*
 * NO REAL COUNTRY, EITHER, AND THAT IS `accuracy-01` AT THE ROOT. The live section's Brexit example
 * states that the UK lost tariff-free access to EU markets, which is false — the agreement in force
 * is zero-tariff on originating goods — and the lesson of packet 15 is to keep the SHAPE and drop
 * the claim. Every economy in this section is fictional, so no claim in it can be checked against a
 * real one and found wrong. The WTO is named because 4.3.2 names it and because it is an
 * institution rather than an example; `Soviet` and `China` are named because 2a-3 names them, and
 * both are banned from carrying a year or a figure by the year check above.
 */
ban(/\bthe UK\b|\bUnited Kingdom\b|\bthe EU\b|\bEuropean Union\b|\bthe US\b|\bUnited States\b|\bASEAN\b|\bNAFTA\b|\bUSMCA\b/g, 'a real country or bloc named in an example — this section runs on one fictional economy so that nothing in it can be checked and found wrong (accuracy-01)');
{
  /*
   * NO YEAR IN ANY EXAMPLE. `accuracy-01` is a dated claim about a real firm that cannot be
   * corroborated, and packet 15's rule is to keep the SHAPE and drop the claim. A four-digit year in
   * student-facing prose is the signature of the claim coming back.
   */
  const years = prose.filter((s) => /\b(?:19|20)\d{2}\b/.test(s));
  if (years.length) problems.push(`${years.length} strings carry a year, which is the signature of a dated claim about a real firm (accuracy-01): "${years[0].slice(0, 80)}"`);
}

/* ── coverage, mapped BY HAND (V025) ──────────────────────────────────────── */
/*
 * THE ORACLE'S COVERAGE FIGURE IS A LEXICAL FLOOR AND IT IS NOT THE GATE. It matches by substring,
 * and several of this topic's leaves are ordinary phrases — `more choice`, `increased tax revenue`,
 * `higher living standards` — which a section can hit by accident in a sentence about something
 * else. Each of the 22 is mapped here to the subsection that TEACHES it; the runner refuses if a
 * mapping names a subsection that does not exist, if a leaf is unmapped, or if the oracle has been
 * renumbered under the map (packet 3.1).
 */
const LEAF_MAP = {
  /* 1 Characteristics of globalisation */
  '1a': 'trade-as-a-proportion-of-gdp',
  '1b': 'transnational-companies',
  '1c': 'migration',
  /* 2 Causes of globalisation */
  '2a-1': 'trade-liberalisation',
  '2a-2': 'trading-blocs',
  '2a-3': 'political-change',
  '2a-4': 'transport-and-communications',
  '2a-5': 'the-rise-of-tncs',
  '2b-1': 'reasons-for-fdi',
  '2b-2': 'the-impact-on-the-recipient-country',
  /* 3a Possible benefits */
  '3a-1': 'growth-and-tax-revenue',
  '3a-2': 'growth-and-tax-revenue',
  '3a-3': 'economies-of-scale',
  '3a-4': 'lower-prices-and-consumer-surplus',
  '3a-5': 'more-choice',
  '3a-6': 'higher-living-standards',
  /* 3b Possible costs */
  '3b-1': 'displaced-workers',
  '3b-2': 'exploitation-of-workers',
  '3b-3': 'the-environmental-impact-of-trade',
  '3b-4': 'transfer-pricing',
  '3b-5': 'income-inequality-within-countries',
  '3b-6': 'tnc-influence-on-domestic-policy',
};
{
  const slugs = new Set(SUBSECTIONS.map((s2) => s2.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, slug] of Object.entries(LEAF_MAP)) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const all = Array.isArray(oracle) ? oracle : oracle.items || oracle.rows;
  const rows = all.filter((r) => String(r.id || '').startsWith('ECON-4.3.1-'));
  /* A parent row whose children are listed separately is a heading, not a leaf. */
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('ECON-4.3.1-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `ECON-4.3.1-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);
  /*
   * THE TRADING-BLOC LADDER IS 4.3.2 AND THE ORACLE IS ASKED RATHER THAN TRUSTED. Five findings ask
   * this packet to build the types of bloc, trade creation and trade diversion. If any of those
   * words were a leaf of 4.3.1 the ban above would be removing required content — packet 26's
   * dangerous class — so the check is made against the oracle in both directions: nothing in this
   * topic's rows mentions them, and 4.3.2 does.
   */
  const ladderHere = rows.filter((r) => /trade creation|trade diversion|customs union|free-trade area|common market|monetary union/i.test(r.wording || ''));
  if (ladderHere.length) problems.push(`${ladderHere.length} rows of ECON-4.3.1 DO mention the bloc ladder (${ladderHere.map((r) => r.id).join(', ')}) — the ban is removing required content, stop and re-read the span`);
  const ladderThere = all.filter((r) => String(r.id || '').startsWith('ECON-4.3.2-') && /trade creation|trade diversion|customs union|free-trade area|common market|monetary union/i.test(r.wording || ''));
  if (!ladderThere.length) problems.push('4.3.2 does not carry the bloc ladder either — the reassignment to packet 39 has no owner, re-read econ_spec.txt:1626-1678');
  /* And the one bloc reference this topic DOES own is the cause, which must be taught. */
  const blocCause = rows.find((r) => r.id === 'ECON-4.3.1-2a-2');
  if (!blocCause || !/trading blocs/i.test(blocCause.wording || '')) problems.push('ECON-4.3.1-2a-2 is no longer "increased number and size of trading blocs" — the trading-blocs subsection is written to that wording');
  console.log(`\nleaves: ${leaves.length} substantive, ${Object.keys(LEAF_MAP).length} mapped by hand to ${new Set(Object.values(LEAF_MAP)).size} subsections; the bloc ladder is ${ladderThere.length} rows of 4.3.2 and 0 of 4.3.1`);
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
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 34`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${DIAGRAMS.length} diagrams (${DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }

console.log('\npacket checks: none of the ten bloc-ladder terms anywhere, in prose or in an SVG (four findings reassigned to packet 39) · no MNC, multinational, race to the bottom, tax competition, deindustrialisation, brain drain, greenfield, stakeholder, world price, Brexit or tariff-free — each 0 hits in econ_spec.txt · no comparative advantage, balance of payments or exchange rate, which are 4.3.2 · no real country or bloc, no named real company, no year, one currency, one minus sign · TNC and FDI both written out (structure-05) · no internal ledger id in prose or in a diagram · no uncited marker, frequency or paper claim · every practice tariff in the ECONOMICS census, all eight command words exactly once, no Assess and no 10-mark (topFix-05\u2019s third clause, refused) · Appendix 6 glosses share vocabulary with the census; Examine names its brief assessment, Discuss its viewpoints, Evaluate its judgement · every subsection inside the 350-word budget · a recall on all 26 subsections, the fill-in contract enforced before the validator sees it, both reorders sourced from extras chains, the answer-recoverable check over every type · no quiz stem near-duplicates another, no explanation names an option by position, nothing quizzed that is not taught (structure-05) · every block pinned to a quiz, a practice item and a diagram, pins DERIVED from each item\u2019s block tag, five blocks priced against FREE_QUIZ_MAX (structure-02) · the arithmetic spine re-derived from six numbers: two growth rates that make the ratio rise, a price gap that is entirely fixed cost per unit, a surplus gain that splits exactly into rectangle and triangle, a licence fee that moves the tax and not the production, and a break-even probability written as gain over gain-plus-loss · every diagram read BACK out of its emitted SVG — the openness line checked point by point against the series, the two shaded surplus areas in the ratio the arithmetic gives, the two tax bars in the ratio of the two bills (topFix-04) · text EXTENT inside every canvas · glyph-BOX collisions with a vertical tolerance, which is the guard accuracy-03 exists for · every extras chain carries `steps` (V028) · ids unique');

if (DUMP) {
  const path = `audit/snapshots/packet-34-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-34-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
