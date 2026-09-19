#!/usr/bin/env node
/**
 * PACKET 29 — market-structures-contestability, Economics Unit 3 (WEC13), IAL topic 3.3.3.
 * audit/raw/econ_spec.txt:1359-1440. EIGHT blocks, forty-three subsections, 54 substantive leaves —
 * the largest section in the programme.
 *
 *   node scripts/packet-29-market-structures-contestability.mjs            # dry run, every check
 *   node scripts/packet-29-market-structures-contestability.mjs --dump     # + write the bundle
 *   node scripts/packet-29-market-structures-contestability.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. The ones this packet adds
 * or strengthens, with the reason:
 *
 *   - **An extras chain without `steps` crashes the Extras tab.** `ExtrasTab.jsx:29` renders every
 *     entry of `data.chains` and `:62` calls `chain.steps.map(...)` with no guard, so a chain
 *     carrying `points` instead throws a TypeError and takes the tab down for a Pro student. Found
 *     while building this packet by running that expression over both bundles: packet 28's third
 *     chain throws and all six here render. In `previewMode` the list is sliced to one chain, which
 *     is why nothing caught it — a free student never reaches the third. FILED for the founder, not
 *     fixed here, because editing another packet's module leaves its staged draft stale.
 *   - **Every leaf is mapped BY HAND.** V025: the coverage oracle matches by SUBSTRING, and this
 *     section has leaves one or two words long — `patents`, `branding`, `quality`, `endorsement`.
 *     A 100% from the oracle is therefore not evidence, so `LEAF_MAP` below names the subsection
 *     that teaches each of the 54 and the runner refuses if one is missing or names a subsection
 *     that does not exist. The oracle figure is reported beside it and is not the gate.
 *   - **A quiz explanation may not name an option by POSITION** (packet 26). Items are authored
 *     key-first, `placeKeys` deals the key into a slot and F074 shuffles again at render, so six of
 *     packet 26's thirty-five explanations described the CORRECT answer as if it were a distractor.
 *   - **A reorder may not sit in a subsection with a flow body, and no reorder item may overlap a
 *     flow step on its own screen** (packets 25, 26, 27). Three checks of increasing strength, all
 *     A/B'd. This section authors no flow bodies at all, so all three are vacuous by construction —
 *     which is the point: the defect is unrepresentable rather than detected.
 *   - **Every diagram figure is re-derived from the emitted SVG** (packets 19, 23, 25). `accuracy-01`
 *     to `-03` are three hand-drawn diagrams whose labels disagreed with their own curves, so it is
 *     not enough to compute a figure correctly — the number printed in the picture has to be checked
 *     against the arithmetic a second time, out of the SVG.
 *   - **Text EXTENT, not anchor** (packet 25's fifth instance). SVG text neither wraps nor clips, so
 *     a label whose anchor is inside the frame can still run past it. The check measures the extent
 *     with the same `estWidth` the layout uses, so the two cannot drift apart.
 *   - **No Assess, no Outline, no 10- or 12-mark item.** Economics has none of them; the live bank
 *     carries an "Assess monopoly (10)". `accuracy-05` corrects "25-mark essays" to 20, which is
 *     right, and adds that Section B tops out at 12, which is wrong — Discuss is 14.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, money, qty, pct, elasticity, round2,
  COSTS, MWANGI, NILE, ZAHRA, NATURAL, PD, MONOPSONY, CR, GAME, PRICING,
  teachingWords,
} from './_packet29-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5, B6, B7, B8 } from './_packet29-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet29-assessment.mjs';
import { DIAGRAMS, estWidth, GRD } from './_packet29-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6, B7, B8];
const M = MWANGI, NI = NILE, Z = ZAHRA, NAT = NATURAL, MS = MONOPSONY, G = GAME, PR = PRICING;

const problems = [];

/* ── pins ──────────────────────────────────────────────────────────────────── */
/*
 * `topFix-01` and `structure-02` are the same defect: no block carries `diagramRef`/`quizIndices`/
 * `practiceIndices`, so `LearnModeTab.jsx:114-118` falls back to `distributeItems`, which deals
 * quiz[0..3] to steps 0..3 regardless of topic — and `structure-03` records the result, an Oligopoly
 * step showing a perfect-competition question. The finding asks for `diagramRef`; that is the LEGACY
 * string pin and `lib/learn-steps.js:44-55` reads the block's `diagramId`, so `diagramId` is what is
 * set. Every index below is DERIVED from each item's own `block` tag, so a question cannot be pinned
 * to a chapter that does not teach it.
 */
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
 * SVG TEXT IS STUDENT-FACING TEXT. `prose` excludes the SVG strings, which is right for sentence-level
 * checks — an `<svg ...>` blob is not a sentence — and WRONG for vocabulary bans: two of the eight
 * failed substitutions were diagram titles, and Verify A found `kinked` surviving in a diagram
 * caption that `ban()` could not see. `svgText` pulls the `<text>` bodies out, so a banned word
 * cannot hide inside a picture.
 */
/*
 * ONE UNIT PER SVG, NOT ONE PER `<text>`. A caption is WRAPPED into a `<text>` element a line, so a
 * phrase spanning two lines is in neither of them: the kinked-demand caption says "is not among
 * them - it is not in the specification at all", and the line carrying the banned word carried
 * neither half of the exclusion. The first version of this check therefore reported the one
 * deliberate mention as undeclared. Joining each SVG's text restores the sentence.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ── a failed substitution, on every surface including the SVGs ────────────── */
/*
 * THE CHECK THIS PACKET MOST NEEDED AND DID NOT HAVE. Eight student-facing strings shipped
 * "P = 80 - undefinedQ" and "MR = 80 - NaNQ" because the demand gradient lived on `NILE.short.b`
 * and `NILE.long.b` and the templates asked for `NILE.b`. Three were free Learn Mode teach bodies,
 * so every student reaching chapter 3 would have read them. NOTHING in the pipeline saw it: the
 * arithmetic was right, so every figure re-derivation passed; the validator does not look for it;
 * and `ban()` below filters SVG strings out of `prose`, so the two diagram titles were invisible
 * twice over. Both verifiers found it by reading the rendered text. A section built entirely out of
 * template literals must check that every substitution actually substituted, and it must check the
 * SVGs, which is why this runs over `texts` and not over `prose`.
 */
/*
 * NO TRAILING `\b`, AND THE A/B IS WHY. The first version was `/\bundefined\b|\bNaN\b/` and it did
 * NOT match "undefinedQ" or "NaNQ" — the word boundary after `undefined` needs a non-word character
 * and `Q` is one of the word characters. So the guard written for this defect would have passed the
 * defect. The A/B caught it on the first run, which is the whole argument for planting the defect
 * before trusting the check (packet 21). Leading boundary only: a substitution failure is a PREFIX.
 */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  /* A/B: the four shapes a failed substitution takes must fire, and real content must not. */
  for (const bad of ['P = 80 \u2212 undefinedQ', 'MR = 80 \u2212 NaNQ', 'the firm [object Object] sells', 'a price of ${money(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
  for (const good of ['Average cost is undefined for zero output in the sense that dividing by zero has no value', 'NaNdi Textiles is not a firm in this section']) {
    /* Both of these SHOULD fire — the words appear as words — which is why the check is a refusal
     * and not a warning: if a section ever needs the word, it renames the thing rather than
     * weakening the guard. Recorded here so the next packet knows the choice was deliberate. */
    if (!FAILED_SUBSTITUTION.test(good)) problems.push(`the failed-substitution check is looser than documented: "${good}"`);
  }
}

/* ── the section's own banned vocabulary ───────────────────────────────────── */
/*
 * RULE 2 OF THE PROGRAMME, AND THIS SECTION IS THE HARDEST CASE OF IT SO FAR — because the finding
 * that names the off-spec model asks only whether it is "worth verifying", and the answer changes the
 * shape of a whole chapter. `kinked` is 0 hits in econ_spec.txt. The live section gives the kinked
 * demand curve a subsection, one of its five diagrams, quiz items and the model answer of its 20-mark
 * essay. What 3.3.3 · 5c asks for instead, at :1393-1399, is game theory, collusive and
 * non-collusive behaviour, cartels, price leadership and price wars — which is chapter 5.
 */
/*
 * ONE DELIBERATE MENTION, AND IT IS DECLARED. The interdependence diagram's caption tells the student
 * that the kinked demand curve is NOT in the specification, which is worth saying because a student
 * arrives expecting it — most textbooks teach it under oligopoly. Verify A was right that the
 * acceptance check as first written ("0 hits over the bundle") failed on that caption while the ban
 * could not see it at all, because it lived in an SVG. Both halves are fixed here: the ban now reads
 * SVG text, and the one intentional use is named and counted rather than exempted by a blind spot.
 */
{
  /*
   * NO `g` FLAG. `RegExp.prototype.test` on a `/g` regex advances `lastIndex`, so a second call
   * against the same string starts past the match and returns false — the first version reported
   * one undeclared mention and zero declared ones for a single string that is plainly declared.
   * A stateful regex inside a filter is a bug that looks like a finding.
   */
  const KINKED = /\bkinked\b|\bkink(?:s|ed)? in the demand\b/i;
  const hits = readable.filter((s) => KINKED.test(s));
  const declared = hits.filter((s) => /not among them|not in the specification/i.test(s));
  const undeclared = hits.filter((s) => !/not among them|not in the specification/i.test(s));
  if (undeclared.length) problems.push(`the kinked demand curve, 0 hits in econ_spec.txt and not an IAL model, appears in ${undeclared.length} string(s) that do not exclude it: "${undeclared[0].slice(0, 80)}"`);
  if (declared.length !== 1) problems.push(`expected exactly ONE caption naming the kinked demand curve in order to exclude it; found ${declared.length}`);
}
ban(/\bloyalty scheme/gi, '"loyalty schemes", 0 hits in econ_spec.txt — 5f names endorsement, product placement and after-sales service');
/*
 * BANNED BECAUSE THEY BELONG TO ANOTHER SECTION. 3.3.2 is `revenue-costs-profits` (packet 28) and it
 * owns minimum efficient scale, the sources of economies and diseconomies of scale and the
 * long-run/short-run distinction in costs; this section APPLIES its cost apparatus and does not
 * re-teach it. The reverse direction was checked too: packet 28's runner bans from itself, as this
 * section's material, profit maximisation, MR = MC, perfect competition, monopoly, allocative,
 * productive and dynamic efficiency, barriers to entry and sunk costs — all of which are leaves here.
 */
/*
 * MINIMUM EFFICIENT SCALE IS ALLOWED AS A BACK-REFERENCE AND NOT AS TEACHING, and the distinction is
 * the whole point. It is 3.3.2 * 3b, packet 28's leaf -- but 3.3.3 * 6e gives natural monopoly NO
 * vocabulary of its own ("the concept of 'natural monopoly' and its implications"), and rule 2 says
 * to teach the mechanism in the specification's own words. The specification's words for THIS
 * mechanism are in the section immediately before, which every student reaches first. So the term may
 * be NAMED to point at 3.3.2, while the sources of economies and diseconomies of scale -- which would
 * be re-teaching it -- stay banned. Two mentions is a reference; more than that is a chapter.
 */
{
  const n = count(/\bminimum efficient scale\b/gi);
  if (n > 2) problems.push(`minimum efficient scale x${n}: it is 3.3.2 * 3b and packet 28's leaf. Name it to point at that section; do not teach it here.`);
}
ban(/\bsources? of (?:internal |external )?economies of scale\b|\bsources? of diseconomies\b|\b(?:financial|technical|managerial|risk bearing) economies\b/gi, 'the SOURCES of economies or diseconomies of scale, which are 3.3.2 * 3d-3f and packet 28\u2019s leaves');
ban(/\beconomies of scope\b|\breturns to scale\b|\baccounting profit\b|\beconomic profit\b|\bbulk buying\b/gi, 'vocabulary that is 0 hits in econ_spec.txt (packet 28’s ban list, same corpus)');
ban(/\bprice taker\b|\bprice maker\b/gi, '"price taker"/"price maker", both 0 hits in econ_spec.txt (packet 28’s finding, eighth instance of rule 2)');
ban(/\bHerfindahl\b|\bLerner index\b|\bcontestable market theory of Baumol\b/gi, 'a framework the specification does not name — 2a and 2b ask for n-firm concentration ratios only');
ban(/\bPorter\b|\bfive forces\b/gi, 'a Business framework; 3.3.3 has no named analytical framework beyond the structures themselves');

/* ── no internal id in anything a student reads (packet 19) ────────────────── */
/*
 * Packet 19's Layer 6 found `(specGap-03)` sitting in a paragraph a student reads, and nothing else
 * in the pipeline looks for it. Three slipped into this section's misconceptions while it was being
 * written and were removed; this is what stops the fourth.
 */
const LEDGER_ID = /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b|\bC-[a-z-]+-(?:topFix|specGap|accuracy|structure)-\d{2}\b/;
for (const s of prose) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id in student-facing text: "${s.slice(0, 90)}"`);

/* ── claims about markers, frequency and how papers are built ──────────────── */
/*
 * `examMatters` may say what the COMMAND WORD requires, because Appendix 6 states it and it is
 * citable. It may not say what a marker does, how often a paper asks something, or how an extract is
 * usually built. Packet 20 shipped "is levels-marked" eight times and MARK_CLAIM did not reach the
 * phrasing, so it keys on that too. `practice-01` asks for a "KAA + evaluation levels" split, which
 * is exactly what this check refuses — see the note in _packet29-assessment.mjs.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  /* A/B, run every time (packet 21). */
  const mustFire = ['An answer that stops there earns nothing.', 'This is levels-marked against the KAA criteria.', 'Mark schemes accept either form.'];
  const mustNotFire = ['Total revenue is $168 (1 mark), and average cost is $28 (1 mark).', 'Appendix 6 defines Define as requiring the meaning of a term.'];
  problems.push(
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM fires on a point allocation: "${x}"`),
  );
}
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
  if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
  if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);
}

/* ── tariffs, against the ECONOMICS census ─────────────────────────────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice command "${pItem.command}" is not in the economics census — this subject has no Assess and no Outline`);
  else if (!row.marks.includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — the census allows ${row.marks.join(' or ')}`);
}
{
  const used = PRACTICE.map((p) => p.command);
  const missing = census.map((r) => r.command).filter((c) => !used.includes(c));
  if (missing.length) problems.push(`command words never practised: ${missing.join(', ')} — eight chapters and eight command words, one each`);
  const dup = used.filter((x, i) => used.indexOf(x) !== i);
  if (dup.length) problems.push(`command word used twice: ${dup.join(', ')}`);
}
/* A prose tariff is invisible to the census check above, which reads PRACTICE items only (packet 20). */
/*
 * A mark ALLOCATION inside guidance is not a question tariff, and the first version of this check
 * reported forty-one "1-mark questions" for the "(1 mark)" allocations in the model answers.
 * `withoutAllocations` already strips them for MARK_CLAIM, so the two checks share it: what is left
 * after stripping is a tariff a sentence is ASSERTING, which is the thing that can be wrong.
 */
const PROSE_TARIFF = /\b(\d{1,2})[- ]marks?\b/gi;
for (const s of prose) {
  const stripped = withoutAllocations(s);
  for (const m of stripped.matchAll(PROSE_TARIFF)) {
    const marks = Number(m[1]);
    if (!census.some((r) => r.marks.includes(marks))) problems.push(`a ${marks}-mark question named in prose; the economics census has ${[...new Set(census.flatMap((r) => r.marks))].sort((a, b) => a - b).join(', ')} only: "${stripped.slice(Math.max(0, m.index - 40), m.index + 40)}"`);
  }
}
ban(/\bAssess\b(?![a-z])/g, '"Assess", which is a BUSINESS command word and has no economics tariff');
ban(/\bOutline\b(?![a-z])/g, '"Outline", which is in neither specification');
{
  /* A/B: the two tariffs this subject does not have must fire, and the two it does must not. */
  const probe = (text) => [...withoutAllocations(text).matchAll(PROSE_TARIFF)].map((m) => Number(m[1])).filter((n) => !census.some((r) => r.marks.includes(n)));
  if (!probe('a 10-mark question').length) problems.push('the prose-tariff check no longer fires on a 10-mark question');
  if (!probe('a 12-mark question').length) problems.push('the prose-tariff check no longer fires on a 12-mark question');
  if (probe('a 14-mark question and a 20-mark essay').length) problems.push('the prose-tariff check fires on a valid economics tariff');
  if (probe('Price is $34 (1 mark), so revenue is $136 (1 mark).').length) problems.push('the prose-tariff check fires on a mark ALLOCATION inside guidance, which is not a question tariff');
}

/* ── the Appendix 6 gloss must share vocabulary with the census description ── */
/*
 * An `examMatters` that cites Appendix 6 and then says something Appendix 6 does not is worse than
 * one that cites nothing. Packet 20's instance: six glosses enumerated what Examine wants and left
 * out EVALUATION, which is the whole difference between Examine (8) and Analyse (6).
 */
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required requires students needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
const words = (s) => String(s).toLowerCase().match(/[a-z]{4,}/g) || [];
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  const m = em.match(/Appendix 6[^.]*?\b(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate)\b/);
  if (!m) continue;
  const row = census.find((r) => r.command === m[1]);
  if (!row) continue;
  const mine = new Set(words(em).filter((w) => !STOP.has(w)));
  const theirs = words(row.description).filter((w) => !STOP.has(w));
  const shared = theirs.filter((w) => mine.has(w));
  if (!shared.length) problems.push(`"${sec.title}": the ${m[1]} gloss cites Appendix 6 and shares NOTHING with the census description — read econ_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
}
/* Examine (8) requires EVALUATION and a brief assessment; that is what separates it from Analyse (6). */
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  if (/Appendix 6[^.]*\bExamine\b/.test(em) && !/evaluat/i.test(em)) problems.push(`"${sec.title}": an Examine gloss that does not mention evaluation — econ_spec.txt:2727-2731 (packet 20)`);
}

/* ── the word budget, measured the way the validator measures it ───────────── */
for (const sec of SUBSECTIONS) {
  const w = teachingWords(sec);
  if (w > 350) problems.push(`"${sec.title}": ${w} words of teaching text (budget 350)`);
}

/* ── recalls: completeness, and the three copy-from-screen checks ──────────── */
if (SUBSECTIONS.some((s) => !s.recall)) problems.push(`${SUBSECTIONS.filter((s) => !s.recall).length} subsections carry no recall — structure-01 is that this section has NONE, so completeness is the property`);
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  const orphan = ATTACH_SLUGS.filter((k) => !slugs.has(k));
  if (orphan.length) problems.push(`recall bank keyed to a subsection that does not exist: ${orphan.join(', ')} — a typo here is silent, the recall simply never appears`);
}
/*
 * THREE CHECKS OF INCREASING STRENGTH, ALL THREE A/B'D BELOW, AND ALL THREE VACUOUS HERE BY DESIGN.
 * (1) packet 26's structural rule: a subsection with a flow body may not carry a reorder at all,
 * because learn-steps.js:10 renders the recall under the teaching on the same step. (2) packet 26's
 * overlap rule: no reorder item may share 60% of its words with a flow step on that screen.
 * (3) packet 27's paraphrase rule: no flow step on that screen may share a distinctive word with the
 * reorder item in sequence. This section authors NO flow bodies, so none of the three can fire —
 * which is why the A/B matters more than the check.
 */
const tokens = (s) => new Set(String(s).toLowerCase().match(/[a-z]{3,}/g) || []);
const jac = (a, b) => { const A = tokens(a), B = tokens(b); const inter = [...A].filter((x) => B.has(x)).length; return inter / (A.size + B.size - inter || 1); };
const shareDistinctive = (a, b) => { const B = tokens(b); for (const w of tokens(a)) if (w.length >= 5 && B.has(w)) return true; return false; };
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const flows = (sec.body || []).filter((b) => b.type === 'flow');
  if (flows.length) problems.push(`"${sec.title}" carries a flow box AND a reorder recall: learn-steps.js:10 renders the recall below the teaching on the same step, so the answer's ORDER is printed above it (packet 26)`);
  const steps = flows.flatMap((f) => (f.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x)));
  for (const item of r.correctOrder || []) {
    for (const st of steps) {
      if (jac(item, st) >= 0.6) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares ${Math.round(jac(item, st) * 100)}% of its words with a flow step on the same screen`);
      else if (shareDistinctive(item, st)) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares a distinctive word with a flow step on the same screen — a paraphrase is still a copy (packet 27)`);
    }
  }
}
{
  /* A/B all three, against a planted flow and a planted reorder. */
  const item = 'Supernormal profit draws new firms into the industry';
  const verbatim = 'Supernormal profit draws new firms into the industry';
  const paraphrase = 'Profit above the normal level pulls new firms into the industry';
  const unrelated = 'A monopsonist reads its wage off the supply curve';
  if (jac(item, verbatim) < 0.6) problems.push('the reorder-overlap check no longer fires on a verbatim flow step');
  if (!shareDistinctive(item, paraphrase)) problems.push('the paraphrase check no longer fires on a reworded flow step');
  if (shareDistinctive(item, unrelated)) problems.push('the paraphrase check fires on a flow that teaches something else');
  if (SUBSECTIONS.some((s) => (s.body || []).some((b) => b.type === 'flow'))) problems.push('a flow body appeared in this section — the three copy-from-screen checks stop being vacuous, so read them');
}
/*
 * RULE 6 GENERALISED TO EVERY RECALL TYPE, AND VERIFY B IS WHY. The three checks above cover a
 * REORDER whose sequence is printed above it. Verify B walked the section and found the same defect
 * in the other three types: 24 of 43 steps carried a recall answerable by scrolling up, and none of
 * them was a reorder. A fill-in whose template is the key-idea sentence with one word taken out is a
 * copy-from-screen task exactly as much as a reorder under a flow box — `structure-01`'s complaint is
 * that this section has NO retrieval layer, and forty-three widgets answerable from the screen above
 * them would not be one.
 *
 * The measure is not word overlap, which any recall on a topic shares with the teaching of that
 * topic. It is whether the ANSWER is recoverable: for a fill-in, a single sentence above that matches
 * the template line AND supplies the missing word; for a classify, an item printed verbatim above, so
 * the student recognises rather than classifies; for a match, a left and its right in ONE sentence
 * above, so the pairing is given. Measured that way this section had twelve, and every one was
 * reworked to ask the student to APPLY the idea to figures or to a new case.
 */
/*
 * `examMatters` IS ON THE SCREEN TOO, and leaving it out of this corpus was the check's own blind
 * spot. Verify B measured step 6's fill-in answers printed 218 units above the blanks — the closest
 * instance of any round — in an EXAM MATTERS box reading "identifying the largest n firms and adding
 * their shares" against blanks asking for `share` and `n`. The check read keyIdea, body, realExample
 * and misconception and reported the step clean through three rounds. Same lesson as the SVG blind
 * spot: what a check LOOKS AT decides what it can find.
 */
const sentencesOf = (sec) => [sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || [])]), sec.realExample?.text, sec.misconception, sec.examMatters]
  .filter(Boolean).flatMap((x) => String(x).split(/(?<=[.!?;:])\s+/))
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
      for (const sent of sents) if (share(stem, sent) >= 0.85 && aw.every((w) => sent.includes(w))) out.push(`fill-in line ${i + 1} and its answer "${ans}" are both in one sentence above it`);
    });
  } else if (r.type === 'classify') {
    /* 0.8, not 0.95: Verify B found "A fleet of standard delivery vans" given away by a sentence
     * reading "a fleet of standard vans is a large cost and barely sunk" — three of the item's four
     * distinctive words, which is 0.75 and passed a 0.95 test. A classify item is a short phrase, so
     * the threshold has to be lower than a whole-sentence one. */
    for (const g of r.groups || []) for (const it of g.items || []) for (const sent of sents) if (share(it, sent) >= 0.8) out.push(`classify item all but printed above: "${String(it).slice(0, 44)}"`);
  } else if (r.type === 'match') {
    for (const pr of r.pairs || []) for (const sent of sents) if (share(pr.left, sent) >= 0.8 && share(pr.right, sent) >= 0.8) out.push(`match pair given in one sentence above: "${pr.left}" / "${pr.right}"`);
  } else if (r.type === 'reorder') {
    for (const it of r.correctOrder || []) for (const sent of sents) if (share(it, sent) >= 0.95) out.push(`reorder item printed verbatim above: "${String(it).slice(0, 44)}"`);
  }
  return [...new Set(out)];
};
for (const sec of SUBSECTIONS) for (const why of recoverable(sec)) problems.push(`"${sec.title}": ${why} — the recall is answerable by scrolling up (Verify B, packet 29)`);
{
  /* A/B: the key-idea-minus-one-word fill-in must fire, and an applied one on the same topic must not. */
  const teach = { keyIdea: 'Allocative efficiency is reached where price equals marginal cost, so the last unit is worth what it cost.', body: [] };
  const copied = { ...teach, recall: { type: 'fillin', template: ['Allocative efficiency is reached where price equals ___ cost'], answers: ['marginal'] } };
  const applied = { ...teach, recall: { type: 'fillin', template: ['Price $40 against marginal cost $25: the last unit is worth ___ than it cost'], answers: ['more'] } };
  if (!recoverable(copied).length) problems.push('the answer-recoverable check no longer fires on a fill-in that is the key idea with one word removed');
  if (recoverable(applied).length) problems.push('the answer-recoverable check fires on a fill-in that applies the idea to figures');
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
  if (!BY_POSITION.test('The second option uses the quantity before the tax.')) problems.push('the option-position check no longer fires on "the second option"');
  if (BY_POSITION.test('The $900 figure uses the 60 tonnes traded before the tax.')) problems.push('the option-position check fires on an option named by its content');
}

/* ── quiz shape ────────────────────────────────────────────────────────────── */
for (const q of QUIZ) {
  const opts = q.options.map((o) => String(o).trim().toLowerCase());
  if (new Set(opts).size !== opts.length) problems.push(`duplicate options in "${q.question.slice(0, 60)}"`);
  if (q.options.length !== 4) problems.push(`${q.options.length} options in "${q.question.slice(0, 60)}"`);
  if (!q.explanation || q.explanation.length < 80) problems.push(`thin explanation on "${q.question.slice(0, 60)}"`);
}
{
  /* `quiz.long-correct` fires only above 1.5x, so a bank whose key is simply the LONGEST option 40%
   * of the time passes it (packet 21, found by adversarial review). Baseline is 25%. */
  const longest = QUIZ.filter((x) => { const c = String(x.options[x.correctIndex]).length; return x.options.every((o, j) => j === x.correctIndex || String(o).length < c); }).length;
  const share = longest / QUIZ.length;
  if (share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${QUIZ.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}
{
  const hist = [0, 0, 0, 0];
  QUIZ.forEach((x) => { hist[x.correctIndex] += 1; });
  if (Math.max(...hist) - Math.min(...hist) > 3) problems.push(`answer histogram ${JSON.stringify(hist)} is lumpy`);
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
  if (BLOCKS.every((b, i) => (quizIndices[b] || [])[0] === i + 3)) problems.push('quizIndices are 3,4,5,… in block order, which is the sign nobody chose them (`pins.identity`)');
}
/*
 * THE BLOCK COUNT IS A DECISION WITH A MEASURED PRICE, NOT A CONSTRAINT. `freeQuizPayload()` gives
 * every chapter a question first and then tops up the pre-test's headroom, bounded by
 * FREE_QUIZ_MAX (10). Eight blocks costs a signed-out student one pre-test question — two rather
 * than three — and nine costs two. Above ten a chapter is served no check-in question at all, which
 * is the line. Eight is deliberate here: 54 leaves in seven chapters would be 7.7 a chapter against
 * the 6.6 packet 22 proved, and Oligopoly alone is 22 of the 54 — 5·2·4·6·22·8·2·5, counted out of LEAF_MAP
 * below. This read 25 until V032 counted it (packet 2.7, 19 September).
 */
if (BLOCKS.length > 10) problems.push(`${BLOCKS.length} blocks: past ten, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz for a signed-out student (lib/preview-limits.js)`);
if (BLOCKS.length === 8) console.log('NOTE: at 8 blocks a signed-out student’s pre-test is 2 questions, not 3. Measured, deliberate, and in the packet spec.');
if (content.length !== BLOCKS.length) problems.push(`${content.length} blocks built against ${BLOCKS.length} declared`);

/* ── practice guidance: two paragraphs, and a clean opening ────────────────── */
/*
 * `InlinePractice` in GUIDED mode prints `guidance.split('\n')[0]` above the answer box and hides the
 * rest behind "See full guidance", and `getPracticeMode` puts every item but the first and last of a
 * section into that mode. Every packet before 24 authored guidance as ONE paragraph, so the whole
 * mark scheme was printed over an empty box asking the student to produce it. 160 back-catalogue
 * items are still open for the founder.
 */
const ALLOCATION = /\(\s*\d+\s*marks?\s*\)|\(\s*\d+\s*\)/;
for (const p of PRACTICE) {
  const paras = String(p.guidance).split('\n').filter((x) => x.trim());
  if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 50)}" has one guidance paragraph — GUIDED mode would print the whole mark scheme above the answer box`);
  if (ALLOCATION.test(paras[0] || '')) problems.push(`practice "${p.question.slice(0, 50)}" allocates marks in its OPENING paragraph, which is the half GUIDED mode shows`);
}
{
  if (!ALLOCATION.test('Price is $34 (1 mark), so revenue is $136.')) problems.push('the practice.opening check no longer fires on a mark allocation');
  if (ALLOCATION.test('Decide what kind of quantity this term names before you write.')) problems.push('the practice.opening check fires on planning advice');
}
for (const p of PRACTICE) if (!new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 50)}" does not end with its own tariff in brackets`);

/* ── the arithmetic spine, re-derived ──────────────────────────────────────── */
/*
 * The properties the whole section rests on. Each is asserted from the FUNCTIONS rather than read off
 * a table, so a change to a coefficient cannot quietly move a figure the teaching text states.
 */
const eq = (a, b, why) => { if (round2(a) !== round2(b)) problems.push(`${why}: ${a} ≠ ${b}`); };
eq(COSTS.mc(COSTS.atMinAvc.q), COSTS.minAvc, 'MC must cut AVC at AVC’s minimum');
eq(COSTS.mc(COSTS.atMinAc.q), COSTS.minAc, 'MC must cut AC at AC’s minimum');
for (const [name, o] of [['short run', M.shortRun], ['long run', M.longRun], ['shutdown', M.shutdown]]) {
  eq(COSTS.mc(o.q), o.price, `${name}: the firm must produce where MC = P`);
  eq(o.revenue - o.tc, o.profit, `${name}: profit must be revenue minus total cost`);
  if (!Number.isInteger(o.q)) problems.push(`${name}: output ${o.q} is not a whole ${M.unit} — the price was not chosen as an exact root of MC(q) = P`);
}
eq(M.longRun.profit, 0, 'long-run perfect competition must earn normal profit exactly');
eq(M.shutdown.profit, -COSTS.tfc, 'at the shutdown point the loss must equal total fixed cost exactly');
eq(M.shutdown.contribution, 0, 'at the shutdown point the contribution must be exactly zero');
/* The monopolistic-competition tangency: equal value AND equal gradient, which is what makes it one. */
eq(NI.long.price, COSTS.ac(NI.long.q), 'the long-run tangency must have AR equal to AC');
eq(NI.long.arSlope, COSTS.acSlope(NI.long.q), 'the long-run tangency must have AR’s gradient equal to AC’s — otherwise it is a crossing');
eq(NI.long.mr, NI.long.mc, 'at a tangency MR must equal MC as well');
eq(NI.long.profit, 0, 'the long-run tangency must earn normal profit exactly');
eq(NI.short.mr, NI.short.mc, 'the short-run monopolistic-competition output must have MR = MC');
if (!(NI.long.q < COSTS.atMinAc.q)) problems.push(`the tangency at ${NI.long.q} is not to the LEFT of the minimum-AC output ${COSTS.atMinAc.q} — a downward-sloping AR cannot be tangent at the minimum (accuracy-01)`);
eq(NI.excessCapacity, COSTS.atMinAc.q - NI.long.q, 'excess capacity must be measured to the AC MINIMUM');
/* Monopoly: every vertex of the welfare triangle is a solution. */
eq(Z.mr(Z.qm), Z.mc, 'the monopoly output must satisfy MR = MC');
eq(Z.ar(Z.qm), Z.pm, 'the monopoly price must be AR at the monopoly output, not MR');
eq(Z.ar(Z.qc), Z.mc, 'the competitive output must satisfy AR = MC');
eq(Z.dwl, 0.5 * (Z.qc - Z.qm) * (Z.pm - Z.mc), 'the welfare loss must be the area of the triangle between AR and MC over the output withheld');
eq(Z.profit, (Z.pm - Z.mc) * Z.qm, 'monopoly profit must be the margin times the output');
if (!(Z.pm > Z.mc)) problems.push('a profit-maximising monopolist must have P > MC');
/* Price discrimination: the less elastic market must be the dearer one, derived and not asserted. */
if (!(PD.less.ped < PD.more.ped)) problems.push(`${PD.less.label} is not the less elastic market (${PD.less.ped} against ${PD.more.ped})`);
if (!(PD.less.price > PD.more.price)) problems.push('the less elastic market must pay the HIGHER price — that is the result 6g turns on');
for (const m of [PD.less, PD.more]) eq(m.a - 2 * m.b * m.q, PD.mc, `${m.label}: MR = MC must hold at its output`);
/* Monopsony: MCL is twice the gradient of supply, and the wage comes off SUPPLY. */
eq(MS.mcl(MS.mono.l), MS.mrp(MS.mono.l), 'monopsony employment must satisfy MCL = MRP');
eq(MS.mono.wage, MS.supply(MS.mono.l), 'the monopsony wage must be read off the SUPPLY curve');
eq(MS.comp.wage, MS.mrp(MS.comp.l), 'competitive employment must satisfy supply = MRP');
if (!(MS.mono.l < MS.comp.l && MS.mono.wage < MS.comp.wage)) problems.push('a monopsonist must employ fewer at a lower wage than a competitive market');
eq(MS.exploitationGap, MS.mono.mrp - MS.mono.wage, 'the gap must be MRP minus the wage at the monopsony employment');
/* Natural monopoly: LRAC falling at every tabulated output, and splitting the market raising cost. */
for (let i = 1; i < NAT.outputs.length; i += 1) if (!(NAT.lrac(NAT.outputs[i]) < NAT.lrac(NAT.outputs[i - 1]))) problems.push(`natural monopoly LRAC is not still falling at ${NAT.outputs[i]}`);
if (!(NAT.two > NAT.one)) problems.push('splitting a natural monopoly must RAISE the cost per unit');
/* Concentration ratios, and the twin market that shares a CR5. */
eq(CR.cr3, CR.firms.slice(0, 3).reduce((s, [, x]) => s + x, 0), 'CR3 must be the sum of the largest three shares');
eq(CR.cr5, CR.firms.reduce((s, [, x]) => s + x, 0), 'CR5 must be the sum of the five shares');
eq(CR.twin.cr5, CR.cr5, 'the twin market must share a CR5, or the point of the pair is lost');
if (CR.twin.cr3 === CR.cr3) problems.push('the twin market must differ on CR3');
/* Game theory: cutting dominant for the firm whose payoff is read, and the joint loss real. */
if (!G.dominant) problems.push('cutting is not a dominant strategy in the payoff matrix the chapter reasons through');
if (!(G.holdHold[0] > G.cutCut[0])) problems.push('both holding must pay more than both cutting, or the game has no point');
eq(G.jointLoss, G.holdHold[0] + G.holdHold[1] - G.cutCut[0] - G.cutCut[1], 'the joint loss must be the difference between the two symmetric cells');
/* Limit and predatory pricing: the two comparisons that separate them. */
if (!(PR.limit > PR.incumbentAc && PR.limit < PR.entrantAc)) problems.push('a limit price must be above the incumbent’s AC and below an entrant’s');
if (!(PR.predatory < PR.incumbentAvc)) problems.push('a predatory price must be below the seller’s OWN average variable cost');

/* ── every figure re-derived out of the emitted SVG ────────────────────────── */
/*
 * The second pass, and the one `accuracy-01` to `-03` needed. A figure computed correctly and printed
 * into the wrong `<text>` is the same defect one layer along, so these read the SVG rather than the
 * objects: the strings the arithmetic says must appear, and nothing drawn outside its frame.
 */
const svgOf = (d) => (d.svg ? [{ label: d.title, svg: d.svg }] : d.scenarios);
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => ({
  attrs: m[1], body: m[2],
  x: Number((m[1].match(/\bx="([-\d.]+)"/) || [])[1]),
  y: Number((m[1].match(/\by="([-\d.]+)"/) || [])[1]),
  size: Number((m[1].match(/font-size="([\d.]+)"/) || [])[1] || 11),
  anchor: (m[1].match(/text-anchor="(\w+)"/) || [])[1] || 'start',
}));
const frameOf = (svg) => { const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); return { w: Number(m[1]), h: Number(m[2]) }; };
const mustShow = (d, label, needles) => {
  const scen = svgOf(d).find((s) => s.label === label);
  if (!scen) { problems.push(`${d.title}: no scenario labelled "${label}"`); return; }
  for (const n of needles) if (!scen.svg.includes(n)) problems.push(`${d.title} / ${label}: the SVG does not contain "${n}", which the arithmetic says it must`);
};
const byTitle = Object.fromEntries(DIAGRAMS.map((d) => [d.title, d]));
mustShow(byTitle['Efficiency and Concentration'], 'The four concepts on one firm', [money(COSTS.minAc), qty(COSTS.atMinAc.q), 'MC', 'AC']);
mustShow(byTitle['Efficiency and Concentration'], 'Concentration ratios', [pct(CR.cr3), pct(CR.cr5), pct(CR.twin.cr3)]);
mustShow(byTitle['Perfect Competition: Short Run, Long Run and Shutdown'], 'Short run: supernormal profit', [money(M.shortRun.price), qty(M.shortRun.q), money(M.shortRun.profit), 'AR = MR = P']);
mustShow(byTitle['Perfect Competition: Short Run, Long Run and Shutdown'], 'Long run: normal profit', [money(M.longRun.price), qty(M.longRun.q), 'P = MR = MC = AC']);
mustShow(byTitle['Perfect Competition: Short Run, Long Run and Shutdown'], 'The shutdown point', [money(M.shutdown.price), money(M.shutdown.profit), 'AVC']);
mustShow(byTitle['Monopolistic Competition: the Long-Run Tangency'], 'Long run: tangency and excess capacity', [money(NI.long.price), qty(NI.long.q), qty(NI.excessCapacity), money(COSTS.minAc)]);
mustShow(byTitle['Barriers to Entry and Exit'], 'Limit pricing', [money(PR.limit), money(PR.entrantAc), money(PR.incumbentAc)]);
mustShow(byTitle['Interdependence: the Two-Firm Game'], 'The payoff matrix', [`${qty(G.holdHold[0])} , ${qty(G.holdHold[1])}`, `${qty(G.cutCut[0])} , ${qty(G.cutCut[1])}`, G.firmA, G.firmB]);
mustShow(byTitle['Price and Non-Price Competition'], 'Predatory against limit pricing', [money(PR.predatory), money(PR.incumbentAvc), money(PR.limit)]);
mustShow(byTitle['Monopoly: Equilibrium, Welfare Loss and Price Discrimination'], 'Equilibrium and the welfare loss', [money(Z.pm), qty(Z.qm), qty(Z.qc), money(Z.dwl)]);
mustShow(byTitle['Monopoly: Equilibrium, Welfare Loss and Price Discrimination'], 'Natural monopoly', [money(NAT.one), money(NAT.two), qty(NAT.market)]);
mustShow(byTitle['Monopoly: Equilibrium, Welfare Loss and Price Discrimination'], 'Third-degree price discrimination', [money(PD.less.price), money(PD.more.price), PD.less.ped.toFixed(2), PD.more.ped.toFixed(2)]);
mustShow(byTitle['Monopsony and Contestability'], 'Monopsony', [money(MS.mono.wage), qty(MS.mono.l), money(MS.comp.wage), 'MRP']);

/*
 * THE WELFARE TRIANGLE'S VERTICES, READ OUT OF THE POLYGON. `accuracy-03` is a triangle whose apex
 * sat 46 units from the intersection it claimed to measure from, so the polygon's own coordinates are
 * recomputed here from the plot transform and compared with the arithmetic.
 */
{
  const scen = svgOf(byTitle['Monopoly: Equilibrium, Welfare Loss and Price Discrimination']).find((s) => s.label === 'Equilibrium and the welfare loss');
  /* `id="dwl"`, not the first polygon: `open()` emits an arrowhead polygon in <defs> and the first
   * version of this check read its three points — reporting the arrowhead as the welfare triangle. */
  const m = scen.svg.match(/<polygon points="([^"]+)"[^>]*id="dwl"/);
  if (!m) problems.push('the monopoly diagram has no welfare-loss polygon');
  else {
    const pts = m[1].split(',').map((p) => p.trim().split(' ').map(Number));
    const X = (q) => round2(66 + (q / 30) * (470 - 66));
    const Y = (v) => round2(300 - (v / 130) * (300 - 60));
    const want = [[X(Z.qm), Y(Z.pm)], [X(Z.qm), Y(Z.mc)], [X(Z.qc), Y(Z.mc)]];
    if (pts.length !== 3) problems.push(`the welfare-loss polygon has ${pts.length} vertices, not 3`);
    else want.forEach(([wx, wy], i) => {
      if (Math.abs(pts[i][0] - wx) > 0.51 || Math.abs(pts[i][1] - wy) > 0.51) problems.push(`welfare-loss vertex ${i + 1} is drawn at (${pts[i]}) and the arithmetic puts it at (${wx}, ${wy}) — accuracy-03's defect exactly`);
    });
  }
}

/* ── nothing drawn outside its canvas: EXTENT, not anchor (packet 25) ──────── */
/*
 * SVG text neither wraps nor clips, so a label whose ANCHOR is comfortably inside the frame can still
 * run past it — Verify B found "welfare loss $50 a d" on a phone in packet 23, anchored at x=430 in
 * a 500-unit frame. The extent is measured with the same `estWidth` the layout uses, so the thing
 * that lays out and the thing that checks share one bound.
 */
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
  /* A/B: a label that plainly overruns must fire, and one that fits must not. */
  const probe = (body, x, anchor, frameW) => { const w = estWidth(body, 11); const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x; return left < -0.5 || left + w > frameW + 0.5; };
  if (!probe('welfare loss $288 a day and then some', 430, 'start', 560)) problems.push('the canvas-extent check no longer fires on a label that overruns its frame');
  if (probe('MC', 100, 'start', 560)) problems.push('the canvas-extent check fires on a label that fits');
}

/* ── no two cells on one row of a grid overlap ─────────────────────────────── */
/*
 * `gridColumns` computes each column from its own widest cell and throws when the table does not
 * fit, so a collision should be unrepresentable. This measures the emitted result anyway, because
 * packet 20's four-column table passed every structural check and was illegible at 390px: nothing
 * measured how WIDE a cell was against the column beside it.
 */
/*
 * BOXES WITH A VERTICAL TOLERANCE, NOT AN IDENTICAL `y` — and Verify B is the reason. The first
 * version grouped `<text>` by exact rounded y, so it compared table cells and nothing else. Twelve
 * of nineteen scenarios were colliding in ways it could not see: a title at y=30 with a 13-unit face
 * against an axis label at y=26, and an axis label at y=346 against a caption's first line at y=344.
 * Two strings one unit apart vertically overlap on screen exactly as much as two on the same line,
 * so the comparison is now between BOXES: any pair whose vertical extents overlap and whose
 * horizontal extents overlap is a collision, whatever their anchors.
 */
const boxOf = (tx) => {
  const w = estWidth(tx.body, tx.size);
  const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
  /* A text baseline sits at `y`; the glyph box runs from about 0.8em above it to 0.2em below. */
  return { left, right: left + w, top: tx.y - tx.size * 0.8, bottom: tx.y + tx.size * 0.2, tx };
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
   * moved a line apart must not. This is exactly the pair the old check could not see. */
  const probe = (ay, by) => {
    const A = boxOf({ x: 26, y: ay, size: 13, anchor: 'start', body: 'Mwangi Orchards: short run at $72' });
    const B = boxOf({ x: 66, y: by, size: 11, anchor: 'start', body: '$ a crate' });
    return Math.min(A.right, B.right) - Math.max(A.left, B.left) > 0.5 && Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top) > 0.5;
  };
  if (!probe(30, 26)) problems.push('the collision check no longer fires on two strings four units apart vertically');
  if (probe(30, 60)) problems.push('the collision check fires on two strings a clear line apart');
}
/*
 * A LABEL STRUCK THROUGH BY ITS OWN GUIDE LINE — a class none of this programme's checks could see,
 * found by Verify B in round 3. A dashed read-off running horizontally at a value passes straight
 * through any label whose glyph box sits on that value: "predatory price — losing $2 a unit on
 * purpose" was crossed along essentially its whole length by the average-variable-cost line nine
 * pixels above it, and two monopsony labels showed dash-interrupted letterforms on screen. Nothing
 * was off-canvas and nothing overlapped another label, so the extent and collision checks both
 * passed it.
 *
 * Verify B's own first attempt at this test was buggy in a way worth recording: a horizontal segment
 * has zero height, so an overlap-height test discards every case silently. The comparison here is a
 * segment against a rectangle, not a rectangle against a rectangle.
 */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const lines = [...svg.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)]
    .map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4] }));
  for (const tx of textsOf(svg)) {
    if (!tx.body.trim()) continue;
    const b = boxOf(tx);
    /* Ignore the 2-unit margin at each edge: a label that merely touches a curve is not struck. */
    const L = b.left + 2, R = b.right - 2, T = b.top + 2, B = b.bottom - 2;
    if (R <= L || B <= T) continue;
    for (const ln of lines) {
      /* Clip the segment to the box by parameter, the standard slab test. */
      let t0 = 0, t1 = 1;
      const dx = ln.x2 - ln.x1, dy = ln.y2 - ln.y1;
      let ok = true;
      for (const [p, q] of [[-dx, ln.x1 - L], [dx, R - ln.x1], [-dy, ln.y1 - T], [dy, B - ln.y1]]) {
        if (p === 0) { if (q < 0) { ok = false; break; } continue; }
        const r = q / p;
        if (p < 0) { if (r > t1) { ok = false; break; } if (r > t0) t0 = r; }
        else { if (r < t0) { ok = false; break; } if (r < t1) t1 = r; }
      }
      if (!ok || t1 <= t0) continue;
      const len = round2(Math.hypot(dx, dy) * (t1 - t0));
      /*
       * 25 UNITS, CALIBRATED AGAINST VERIFY B'S OWN MEASUREMENTS rather than guessed. It reported
       * three real cases at 25.9, 28.3 and 134.5 CSS px, and the check-in cards render a 560-unit
       * frame at 313 px — so those are 46, 51 and 240 SVG units. A curve is emitted as forty-eight
       * short chords, each about 6 units long, so a threshold near 6 fires once per chord for a
       * curve merely grazing a label's corner: the first version of this check reported 25 such
       * grazes and none of the three cases that matter. The cut-off is above a chord and well below
       * the smallest real strike.
       */
      if (len > 25) problems.push(`${d.title} / ${label}: a line runs ${len} units through "${tx.body.slice(0, 34)}" — struck through on screen`);
    }
  }
}
{
  /* A/B: a horizontal rule through the middle of a label must fire — the case a height-overlap test
   * discards — and one passing clear below it must not. */
  const probe = (lineY) => {
    const b = boxOf({ x: 100, y: 120, size: 11, anchor: 'start', body: 'predatory price and a long tail' });
    const L = b.left + 2, R = b.right - 2, T = b.top + 2, B = b.bottom - 2;
    return lineY > T && lineY < B && 300 > L && 60 < R;
  };
  if (!probe(117)) problems.push('the strikethrough check no longer fires on a horizontal rule through a label');
  if (probe(160)) problems.push('the strikethrough check fires on a rule passing clear of a label');
}

/* `diagram.table-legible` reports rather than gates (V022). The margin is printed, not enforced. */
{
  const worst = [];
  for (const d of DIAGRAMS) for (const { svg } of svgOf(d)) {
    const frame = frameOf(svg);
    for (const tx of textsOf(svg)) {
      if (!tx.body.trim()) continue;
      const px = round2(tx.size * (530 / frame.w));
      if (px < 12) worst.push(px);
    }
  }
  if (worst.length) console.log(`NOTE: ${worst.length} strings render below 12px in the 530px column (smallest ${Math.min(...worst)}px). diagram.table-legible reports; V022 is the design decision.`);
}

/* ── the extras shape the component actually reads ─────────────────────────── */
/*
 * NEW IN THIS PACKET, AND FOUND BY READING `ExtrasTab.jsx` RATHER THAN THE SCHEMA. `:29` renders
 * every entry of `data.chains` and `:62` calls `chain.steps.map(...)` with no guard, so a chain
 * carrying `points` instead of `steps` throws a TypeError and takes the whole Extras tab down for a
 * Pro student. `previewMode` slices the list to PREVIEW_LIMITS.extrasChains (1), which is why a free
 * student never reaches a third chain and why nothing has caught it. The `evaluation` list wants
 * `{title, content}` with the content a single string.
 */
for (const [i, chain] of (EXTRAS.chains || []).entries()) {
  if (!Array.isArray(chain.steps) || !chain.steps.length) problems.push(`extras chain ${i + 1} ("${chain.title}") has no \`steps\` array — ExtrasTab.jsx:62 calls chain.steps.map() with no guard and the tab throws`);
  if (!chain.title) problems.push(`extras chain ${i + 1} has no title`);
}
for (const [i, e] of (EXTRAS.evaluation || []).entries()) {
  if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} ("${e.title}") has no \`content\` string — ExtrasTab.jsx renders {point.content} and would print nothing`);
}
{
  /*
   * A/B WITH A REAL CONTROL RATHER THAN A PLANTED ONE. Packet 28's bundle is on disk and its third
   * chain is the defect, so the check is run against it: if it does not fire there, it is decorative.
   */
  const shapeOk = (chains) => chains.every((c) => Array.isArray(c.steps) && c.steps.length);
  if (!shapeOk([{ title: 'planted', points: ['a', 'b'] }]) === false) problems.push('the extras-shape check does not fire on a chain carrying `points`');
  if (!shapeOk([{ title: 'ok', steps: ['a', 'b'] }])) problems.push('the extras-shape check fires on a well-formed chain');
  /*
   * THE REAL CONTROL EXPIRED, 19 September 2026 (packet 2.7). This block used to import packet 28's
   * module and FAIL if its chains were well-formed — "if it does not fire there, it is decorative".
   * `00662a3` then closed V028 and removed the malformed chain, so from that commit onward the A/B
   * failed this runner on every run: it was demanding that another packet stay broken, and the
   * first thing it blocked was re-staging this section. A control that requires the corpus not to
   * be repaired is not a control.
   *
   * So the real instance is pinned BY VALUE — the shape `"Is growing larger worth it?"` actually
   * had, `points` where `steps` belongs, recovered from that commit — and packet 28's module is
   * now asserted CLEAN, which is the regression the programme wants guarded from here on.
   */
  const V028_SHAPE = { title: 'Is growing larger worth it?', points: ['a judgement consideration', 'and another'] };
  if (shapeOk([V028_SHAPE])) problems.push('the extras-shape check passes the real V028 chain shape — it is not measuring what it claims');
  try {
    const p28 = await import('./_packet28-assessment.mjs');
    if (!shapeOk(p28.EXTRAS.chains)) problems.push('packet 28 has a malformed extras chain again — V028 has regressed, and ExtrasTab throws for a Pro student');
  } catch { problems.push('could not load packet 28’s assessment module to check V028 has not regressed'); }
}

/* ── ids, signs, and duplicates ────────────────────────────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(SUBSECTIONS.map((s) => s.id), SUBSECTIONS.filter((s) => s.recall).map((s) => s.recall.id), content.map((b) => b.id));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')} — packet 19 shipped three flashcards with a "-2" suffix and no finding named it`);
{
  /* One minus sign for the section (packet 18 shipped 55 of one beside 13 of the other). */
  const ascii = prose.filter((s) => /\s-\d|\(-\d|=\s?-\d/.test(s));
  if (ascii.length) problems.push(`${ascii.length} strings use an ASCII hyphen as a minus sign: "${ascii[0].slice(0, 70)}"`);
}

/* ── coverage, mapped BY HAND (V025) ──────────────────────────────────────── */
/*
 * THE ORACLE MATCHES BY SUBSTRING, so a leaf of one or two distinctive words can be "covered" by an
 * unrelated sentence — packet 27 found `nothing enforces them` satisfying "Porter's five forces".
 * This section has many such leaves: `patents`, `branding`, `quality`, `endorsement`, `legal`. So
 * every one of the 54 is mapped here to the subsection that teaches it, the runner refuses if a
 * mapping names a subsection that does not exist or if a leaf in the oracle is unmapped, and the
 * oracle's own figure is printed beside it as a second opinion rather than as the gate.
 */
const LEAF_MAP = {
  '1a-1': 'allocative-efficiency', '1a-2': 'productive-efficiency', '1a-3': 'dynamic-efficiency',
  '1a-4': 'x-inefficiency', '1a-5': 'efficiency-across-structures',
  '2a': 'concentration-ratios', '2b': 'reading-concentration-ratios',
  '3a': 'perfect-competition-assumptions', '3b': 'pc-long-run-equilibrium', '3c': 'pc-shutdown-point', '3d': 'pc-efficiency',
  '4a': 'monopolistic-competition-assumptions', '4b-1': 'product-differentiation', '4b-2': 'product-differentiation',
  '4b-3': 'product-differentiation', '4c': 'mc-long-run-tangency', '4d': 'mc-efficiency-excess-capacity',
  '5a': 'oligopoly-assumptions',
  '5b-1': 'barriers-scale-and-limit-pricing', '5b-2': 'barriers-scale-and-limit-pricing',
  '5b-3': 'barriers-patents-branding-legal', '5b-4': 'barriers-patents-branding-legal',
  '5b-5': 'barriers-sunk-costs', '5b-6': 'barriers-patents-branding-legal',
  '5c-1': 'game-theory', '5c-2': 'collusive-and-non-collusive', '5c-3': 'cartels-and-price-leadership',
  '5c-4': 'cartels-and-price-leadership', '5c-5': 'price-wars',
  '5d': 'collusion-costs-benefits',
  '5e-1': 'price-wars', '5e-2': 'predatory-and-limit-pricing', '5e-3': 'predatory-and-limit-pricing',
  '5f-1': 'non-price-competition', '5f-2': 'non-price-competition', '5f-3': 'non-price-competition',
  '5f-4': 'non-price-competition', '5f-5': 'non-price-competition',
  '5g': 'competition-costs-benefits',
  '6a': 'monopoly-assumptions', '6b': 'monopoly-assumptions', '6c': 'monopoly-equilibrium', '6d': 'monopoly-costs-benefits',
  '6e': 'natural-monopoly', '6f': 'price-discrimination-conditions', '6g': 'price-discrimination-effects', '6h': 'monopoly-efficiency',
  '7a': 'monopsony', '7b': 'monopsony-effects',
  '8a': 'contestable-markets', '8b-1': 'contestability-behaviour', '8b-2': 'contestability-behaviour',
  '8c': 'contestability-costs-benefits', '8d': 'sunk-costs-and-contestability',
};
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, slug] of Object.entries(LEAF_MAP)) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items || oracle.rows).filter((r) => String(r.id || '').startsWith('ECON-3.3.3-'));
  /* A parent row whose children are listed separately is a heading, not a leaf. */
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('ECON-3.3.3-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `ECON-3.3.3-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);
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
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 29`);
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

console.log('\npacket checks: no kinked demand curve · no minimum efficient scale, economies of scope, price taker/maker or other section’s vocabulary · no internal ledger id in student text · no uncited marker, frequency or paper claim · every practice tariff in the ECONOMICS census, all eight command words exactly once, no Assess/Outline/10-/12-mark anywhere · both Appendix 6 gloss checks · every subsection inside the 350-word budget · a recall on all 43 subsections, no reorder beside a flow, all six sourced from extras chains, three copy-from-screen checks A/B’d · no quiz explanation names an option by position · every block pinned to a quiz, a practice item and a diagram, none of them the pre-test’s three · the whole arithmetic spine re-derived from the functions: MC cutting AVC and AC at their own minima, three exact roots of MC(q) = P, a shutdown contribution of exactly zero, a tangency equal in VALUE and GRADIENT, a welfare triangle equal to ½ × base × height, MCL twice the gradient of supply · every diagram figure re-derived out of the emitted SVG, the welfare polygon’s three vertices recomputed from the plot transform · text EXTENT inside every canvas · no table cell collisions · every extras chain carries `steps`, A/B’d against the V028 chain shape pinned by value, with packet 28 asserted CLEAN (V040 — the old control required packet 28 to stay broken) · ids unique · one minus sign');

if (DUMP) {
  const path = `audit/snapshots/packet-29-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-29-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
