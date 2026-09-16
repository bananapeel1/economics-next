#!/usr/bin/env node
/**
 * PACKET 24 — price-determination, IAL Economics Unit 1 topic 1.3.4 (11 spec leaves).
 *
 *   node scripts/packet-24-price-determination.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-24-price-determination.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-24-price-determination.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet24-content.mjs (blocks and Notes), scripts/_packet24-assessment.mjs
 * (quiz, practice, flashcards, mistakes, extras) and scripts/_packet24-diagrams.mjs (six diagrams,
 * where the section had two and showed a student neither where it mattered). This file assembles the
 * bundle, pins each block to its diagram, quiz and practice items, and runs the checks a verifier
 * will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one of the 29;
 *   - PHRASES THAT MUST NOT SURVIVE, each with the count that settles it. Three groups. OFF-SPEC
 *     VOCABULARY the March section taught anyway (`deadweight`, `market clearing`, `invisible hand`
 *     — 0 each in econ_spec.txt); ANOTHER UNIT'S VOCABULARY (`allocative efficiency` is 3.3.3 · 1a,
 *     econ_spec.txt:1364, which structure-07 mis-attributed to 1.3.5; `positive externality` and
 *     `socially optimal` are 1.3.5); and ANOTHER SECTION'S (price floors and ceilings are 1.3.6 and
 *     the spec calls them "maximum and minimum (guaranteed) prices"; the 1.3.2 · 1b behavioural list
 *     belongs to packet 17's `consumer-behaviour-demand`, which teaches it in the spec's own words);
 *   - every practice command word and tariff against audit/raw/tariff-census.json FOR ECONOMICS,
 *     where there is no Assess, no Outline and no 10-mark item — the March bank had one of each;
 *   - the two Appendix 6 gloss checks, carried from packets 21 and 23: a gloss that cites Appendix 6
 *     must share something with the row it cites, AND must not bolt an extra requirement onto it;
 *   - THE ARITHMETIC, RECOMPUTED HERE rather than trusted, and every diagram figure re-derived from
 *     the emitted SVG by reading it back — so a figure that changes in the body and not in a diagram
 *     fails the build.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, teachingWords, money, pc, qty, round2,
  DEMAND, SUPPLY, q, p, cross, CHOKE, FOOT, P_EQ, Q_EQ, CS, PS,
  P_LOW, P_HIGH, EXCESS_DEMAND, EXCESS_SUPPLY, consumerSurplus, producerSurplus,
  DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL, CASES, DEMAND_SHIFT, SUPPLY_SHIFT,
  TAX, SUBSIDY, AD_VALOREM, TAXED, SUBSIDISED, wedge, adValoremGap, AV_LOW_Q, AV_HIGH_Q, AV_GAP_LOW, AV_GAP_HIGH,
} from './_packet24-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6 } from './_packet24-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet24-assessment.mjs';
import { DIAGRAMS, SURPLUS_BASE, SURPLUS_DEMAND, SURPLUS_SUPPLY, INCIDENCE_PANELS, PLOT, X, Y } from './_packet24-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6];

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a free student's bank is sliced server-side
 * (F086, and freeQuizPayload() since 16 Sep), so a pre-test whose pool sat at the end of the array
 * would serve that student PINNED questions instead (packet 16's walkthrough).
 */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
/*
 * The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
 * The search is over the BLOCK'S OWN pool, not the whole bank: searching the bank matched the
 * pre-test item "Consumer surplus is best described as:" for block 3, which would have reserved an
 * unpinned item — silently shifting which three questions the pre-test draws and showing a free
 * student the same question twice. Caught by reading the staged draft back from the API, because
 * `pins.reuse` only looks across blocks and the runner's own unpinned check only looks at position.
 */
const first = (list, needle) => {
  const i = list.find((j) => QUIZ[j].question.includes(needle));
  if (i == null) throw new Error(`no quiz item in this block matching "${needle}"`);
  return [i, ...list.filter((x) => x !== i)];
};
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'the equilibrium price and quantity are'),
  [B2]: first(quizByBlock[B2], 'a lower price and a larger quantity traded'),
  [B3]: first(quizByBlock[B3], 'Consumer surplus'),
  [B4]: first(quizByBlock[B4], 'rationing function of the price mechanism'),
  [B5]: first(quizByBlock[B5], 'The incidence of an indirect tax falls'),
  [B6]: first(quizByBlock[B6], 'Buyers have captured'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why the March `diagramRef` strings
 * "Indirect Tax" and "Subsidy" rendered nothing (structure-01, diagram-01, diagram-02): they were
 * matched by substring against the titles of two diagrams that are about something else, and no tax
 * or subsidy diagram existed anywhere in the section. Every chapter has one here.
 */
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id]));

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
// Ids are excluded from every text check: scanning a slug as if it were prose reports a word no
// reader ever sees.
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
// The SVG source is excluded from the prose scans and checked separately: its attribute names and
// colour values are not sentences, and a `<text>` element is read back by the geometry checks below.
const prose = texts.filter((s) => !s.startsWith('<svg'));
const problems = [];
const count = (re) => prose.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€|¥/g, 'a currency other than dollars (locale.currency)');

/*
 * OFF-SPEC VOCABULARY, each with the count that settles it. These are not stylistic preferences: a
 * student who learns a word here writes it in an answer, and none of these words appears in the
 * document the answer is marked against. Seventh instance of the packet 13/16/17/18/22/23 rule.
 */
ban(/\bdead[- ]?weight\b/gi, '"deadweight" (0 in econ_spec.txt; also a named `terms.off-spec` phrase — the March section had TWO subsections of it)');
ban(/\bmarket[- ]clearing\b/gi, '"market clearing" as a term (0 in econ_spec.txt; 1c\'s own words are "the operation of market forces")');
ban(/\binvisible hand\b/gi, 'the invisible hand (0 in econ_spec.txt — the March section had a subsection of it, structure-06)');
/*
 * ANOTHER UNIT'S VOCABULARY, and the first of these is a finding corrected rather than obeyed.
 * structure-07 says `allocative efficiency` is used here "without the 1.3.5 framing". It is not in
 * 1.3.5 at all: econ_spec.txt:1364 puts it in 3.3.3 · 1a, Unit 3. A Unit 1 section does not reframe
 * it; it drops it.
 */
ban(/\ballocativ(e|ely)\b/gi, '"allocative efficiency" (econ_spec.txt:1364, topic 3.3.3 — Unit 3, NOT 1.3.5 as structure-07 claims)');
ban(/\b(positive|negative) externalit(y|ies)\b/gi, 'an externality (econ_spec.txt:731, topic 1.3.5 — packet 25\'s section; structure-07 is right about this clause)');
ban(/\bsocially optimal\b/gi, '"socially optimal" (econ_spec.txt:729, topic 1.3.5 · 1a)');
ban(/\bmerit good|\bdemerit good/gi, 'merit or demerit goods (a named `terms.off-spec` phrase; not IAL vocabulary)');
ban(/\bprice[- ](taker|maker)s?\b/gi, '"price taker" or "price maker" (0 each in econ_spec.txt — market-structure vocabulary, and 3b asks only for the mechanism at three scales)');
/*
 * ANOTHER SECTION'S VOCABULARY. Price floors and ceilings are 1.3.6 — and the specification does not
 * use either phrase: `price floor` and `price ceiling` are 0 in econ_spec.txt, which says "maximum
 * and minimum (guaranteed) prices" at :809. practice-03 is right that the item goes; the vocabulary
 * goes with it rather than being re-tariffed.
 */
ban(/\bprice (floor|ceiling)s?\b/gi, 'a price floor or ceiling (0 in econ_spec.txt; 1.3.6 says "maximum and minimum (guaranteed) prices" — packet 26\'s section)');
ban(/\bblack market/gi, 'black markets (0 in econ_spec.txt; a March flashcard taught them, structure-09)');
/*
 * The 1.3.2 · 1b list, which structure-05 and topFix-04 ask to have MOVED here and re-keyed. It is
 * already taught, correctly and in the specification's own words, by packet 17 in
 * `consumer-behaviour-demand` — herding, habitual behaviour, inertia, poor computational skills, the
 * need to feel valued, framing and bias. Reintroducing any of it here would duplicate that section,
 * and the March block taught a different list again (anchoring, loss aversion, nudges, satisficing),
 * none of which is anywhere in econ_spec.txt.
 */
ban(/\b(anchoring|loss aversion|availability heuristic|nudge|bounded rationality|satisfic\w+)\b/gi, 'the March behavioural block (0 in econ_spec.txt; 1.3.2 · 1b belongs to `consumer-behaviour-demand`, packet 17)');

ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — practice-03\'s item)');
ban(/\bAssess\b/g, '"Assess" (not an IAL ECONOMICS command word at any tariff — practice-02\'s item)');
ban(/\b10.mark|\(10 marks\)/g, 'a 10-mark item (Economics has no 10-mark tariff; the March "Assess … (10 marks)" was invalid twice over)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|Universal Credit|the Chancellor|Office for National Statistics|Glastonbury|Congressional Budget Office|CBO)\b/g, 'a UK-only or US-only institution (locale.institution; accuracy-02 was a CBO claim and topFix-05 lists Glastonbury)');
ban(/\b(ONS|OBR|DWP|CAP)\b/g, 'a UK-only or EU-only acronym (locale.institution; topFix-05 lists the pre-2003 CAP)');
ban(/\b(the UK|United Kingdom|Britain|British|London)\b/g, 'a UK framing (topFix-05: an international cohort gets contexts that are not London rents — and accuracy-01 was a London rent-control claim that is false as well as UK-framed)');
ban(/\brent controls?\b/gi, '"rent control" (accuracy-01: the March claim about London was false — private-sector rent control in England was abolished in 1988 — and it is 1.3.6 material in any case)');

ban(/\((?:specGap|topFix|structure|accuracy|quiz|practice|diagram|specThin)-\d+\)/g, 'an internal ledger id left in text a student reads (packet 19\'s Layer 6 finding)');
ban(/\bLeaf \d|\bleaf \d/g, 'the word "leaf" — this platform\'s internal name for a spec sub-bullet — capitalised mid-sentence where a student reads it');
ban(/\b(the March (version|section|copy|item|content)|in the previous version|this section used to)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/*
 * NO DATED CLAIM ABOUT A REAL MARKET. accuracy-01 and accuracy-02 are both dated or datable claims
 * this repository could not check — a London rent-control regime that does not exist, and a sugar-tax
 * score that was never published. topFix-05 lists three more. They are removed rather than corrected,
 * and this refuses their shape: a four-digit year anywhere in text a student reads.
 */
const YEAR_CLAIM = /\b(19|20)\d{2}\b/;
for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) if (YEAR_CLAIM.test(sent)) problems.push(`a dated claim about a real market: "${sent.trim().slice(0, 90)}"`);

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert exactly the same thing
 * without naming them — "that earns half the marks", "scores poorly" — and pass the validator
 * untouched (packet 16). Say what the COMMAND WORD requires, which Appendix 6 states and which can
 * therefore be cited; do not say what a marker does with an answer.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

/* ── practice: the exam shape, against ECONOMICS' own Appendix 6 ───────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice "${pItem.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!pItem.question.includes(`(${pItem.marks} marks)`)) problems.push(`practice ${pItem.command}: the stem does not say "(${pItem.marks} marks)"`);
  if (pItem.marks > 6 && /\(\d+\s*marks?\)/.test(pItem.guidance)) problems.push(`practice ${pItem.command} (${pItem.marks}): guidance allocates points, but tariffs above 6 are levels-marked (practice.levels)`);
}
for (const cmd of ['Define', 'Calculate', 'Draw', 'Explain', 'Analyse', 'Examine', 'Discuss', 'Evaluate']) {
  if (!PRACTICE.some((x) => x.command === cmd)) problems.push(`no practice item uses the Economics command word "${cmd}"`);
}
/*
 * THE FIRST PARAGRAPH OF A GUIDANCE IS SHOWN BEFORE THE STUDENT WRITES, so it may not contain the
 * answer. `InlinePractice.jsx` in GUIDED mode prints `guidance.split('\n')[0]` above the answer box
 * as "the opening" and hides the rest behind "See full guidance"; `getPracticeMode` puts every item
 * except the first and last of a section into that mode (LearnModeTab.jsx:249-256). A guidance with
 * ONE paragraph is therefore printed whole — mark allocations, workings and final answers — over an
 * empty box asking the student to write it. Nothing in the schema, the validator or the ledger says
 * so, and 97 of the 100 practice items in packets 14-23 are single-paragraph.
 */
for (const x of PRACTICE) {
  const paras = String(x.guidance).split('\n').filter(Boolean);
  if (paras.length < 2) problems.push(`practice ${x.command}: one-paragraph guidance, so guided mode prints the whole mark scheme above the answer box`);
  const opening = paras[0] || '';
  if (/\(\s*\d+\s*marks?\s*\)/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph allocates marks, and it is shown BEFORE the student writes`);
  if (/=/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph contains a worked calculation, and it is shown BEFORE the student writes`);
}
// practice-04's bank-level gap, kept as a check rather than a memory: half the spec bullets had
// nothing in the bank at all, and there was no Calculate and no Draw in the most diagram-heavy topic
// of Unit 1.
for (const [needle, what] of [[/tax/i, 'indirect taxes'], [/subsid/i, 'subsidies'], [/incidence/i, 'incidence'], [/surplus/i, 'consumer or producer surplus']]) {
  if (!PRACTICE.some((x) => needle.test(x.question))) problems.push(`no practice item covers ${what} — the bank-level gap practice-04 names`);
}

/*
 * A GLOSS THAT CITES APPENDIX 6 MUST SAY WHAT APPENDIX 6 SAYS (packet 21), and MUST NOT BOLT AN EXTRA
 * REQUIREMENT ONTO IT (packet 23). Three packets shipped the first error independently on one day;
 * `claim.uncited` cannot see either, because the sentence carries a citation, which is exactly what
 * that rule looks for. Both checks are carried here unchanged.
 */
{
  const STOP = new Set(['requires', 'required', 'students', 'student', 'needs', 'relevant', 'includes', 'including', 'appropriate', 'provided', 'should', 'there', 'which', 'their', 'these', 'those', 'where', 'marks', 'other', 'while', 'about']);
  const words = (t) => new Set(String(t).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((w) => w.length >= 5 && !STOP.has(w)));
  const glosses = [
    ...SUBSECTIONS.map((x) => [x.title, x.examMatters]),
    ...PRACTICE.map((x) => [`practice ${x.command} (${x.marks})`, x.guidance]),
  ];
  for (const [where, gloss] of glosses) {
    if (!gloss || !/Appendix\s*6/i.test(gloss)) continue;
    const named = [...String(gloss).matchAll(/\b(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate)\b/g)].map((m) => m[1]);
    if (!named.length) { problems.push(`"${where}" cites Appendix 6 without naming a command word`); continue; }
    const cmd = named[0];
    const row = census.find((r) => r.command === cmd);
    if (!row) { problems.push(`"${where}" cites Appendix 6 for "${cmd}", which is not an Economics command word`); continue; }
    const shared = [...words(row.description)].filter((w) => words(gloss).has(w));
    if (!shared.length) problems.push(`"${where}": the ${cmd} gloss cites Appendix 6 and shares NOTHING with the census description — read econ_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
  }
}
{
  const APPENDIX_CLAIMS = [
    [/\bdiagram/i, /diagram/i, 'diagrams'],
    [/\binterpret/i, /interpret/i, 'interpretation'],
    [/\bworkings?\b/i, /workings/i, 'showing workings'],
    [/chains? of reasoning/i, /chains? of reasoning/i, 'a chain of reasoning'],
    [/\bbrief assessment\b/i, /brief assessment/i, 'a brief assessment'],
    [/\bdepth rather than breadth\b/i, /depth rather than breadth/i, 'depth rather than breadth'],
    [/\bjudgement/i, /judgements?/i, 'a judgement'],
  ];
  // Practice guidance carries its command in its own FIELD; examMatters names it in the sentence.
  const guidanceCommand = new Map(PRACTICE.map((x) => [x.guidance, x.command]));
  for (const s of prose) {
    for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
      if (!/appendix\s*6/i.test(sent)) continue;
      const row = census.find((r) => new RegExp(`\\b${r.command}\\b`).test(sent)) || census.find((r) => r.command === guidanceCommand.get(s));
      if (!row) { problems.push(`a sentence cites Appendix 6 but names no command word: "${sent.trim().slice(0, 80)}"`); continue; }
      for (const [inSentence, inDescription, what] of APPENDIX_CLAIMS) {
        if (inSentence.test(sent) && !inDescription.test(row.description)) {
          problems.push(`Appendix 6 is cited for ${what} under ${row.command}, which its description does not mention: "${sent.trim().slice(0, 90)}"`);
        }
      }
    }
  }
}

/*
 * THE LENGTH TELL THE VALIDATOR CANNOT SEE. `quiz.long-correct` fires only when the correct option is
 * more than 1.5× the longest distractor, which catches the egregious case and nothing else. A
 * systematic tendency for the key to be simply the LONGEST of the four survives the render-time
 * shuffle, unlike answer position, so the share is bounded here at 35% against a 25% baseline.
 */
{
  const longest = bundle.quiz.filter((x) => {
    const c = String(x.options[x.correctIndex]).length;
    return x.options.every((o, j) => j === x.correctIndex || String(o).length < c);
  }).length;
  const share = longest / bundle.quiz.length;
  if (bundle.quiz.length >= 8 && share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${bundle.quiz.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}

/* ── pins ──────────────────────────────────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
{
  const flat = Object.values(quizIndices).flat();
  if (new Set(flat).size !== flat.length) problems.push('a quiz item is pinned by more than one block (pins.reuse)');
  // A pinned index may not be one of the pre-test's: the pre-test takes the first three items NO
  // block has reserved, so reserving one of them changes which questions the pre-test draws.
  for (const i of flat) if (unpinned.has(i)) problems.push(`quiz item ${i} is pinned by a block AND left for the pre-test pool ("${QUIZ[i].question.slice(0, 50)}")`);
  // And a pinned index must belong to the block that pinned it.
  for (const b of BLOCKS) for (const i of quizIndices[b]) if (QUIZ[i].block !== b) problems.push(`block "${b}" pins quiz item ${i}, which belongs to "${QUIZ[i].block || 'the pre-test'}"`);
  const firsts = BLOCKS.map((b) => quizIndices[b][0]);
  if (firsts.every((v, i) => i === 0 || v === firsts[i - 1] + 1)) problems.push('quizIndices are consecutive in block order (pins.identity)');
}
// structure-02 named the specific mis-pins: the surplus block showed an item about a demand increase
// and the subsidy block showed a cigarette-tax item. Both blocks must pin an item that is ABOUT them.
for (const [b, needle, what] of [[B3, /surplus/i, 'surplus'], [B5, /tax|incidence|ad valorem/i, 'a tax'], [B6, /subsid/i, 'a subsidy']]) {
  const items = (quizIndices[b] || []).map((i) => QUIZ[i].question);
  if (!items.length || !needle.test(items[0])) problems.push(`block "${b}" opens its check-in with an item that is not about ${what}: "${(items[0] || '').slice(0, 60)}" (structure-02)`);
}

/* ── the arithmetic, recomputed here rather than trusted ───────────────────── */
if (q(DEMAND, P_EQ) !== q(SUPPLY, P_EQ)) problems.push('the two schedules do not agree at the equilibrium price');
if (P_EQ !== 10 || Q_EQ !== 600) problems.push(`the equilibrium is ${money(P_EQ)} · ${qty(Q_EQ)}, not $10 · 600`);
if (CHOKE !== 22 || FOOT !== 4) problems.push(`the demand and supply intercepts are ${money(CHOKE)} and ${money(FOOT)}, not $22 and $4`);
if (CS !== round2(0.5 * (CHOKE - P_EQ) * Q_EQ)) problems.push('consumer surplus disagrees with ½ × height × base');
if (PS !== round2(0.5 * (P_EQ - FOOT) * Q_EQ)) problems.push('producer surplus disagrees with ½ × height × base');
if (EXCESS_DEMAND !== EXCESS_SUPPLY) problems.push(`the two gaps are ${qty(EXCESS_DEMAND)} and ${qty(EXCESS_SUPPLY)}; the subsections claim they are equal because the prices are equidistant from ${money(P_EQ)}`);
if (P_EQ - P_LOW !== P_HIGH - P_EQ) problems.push('the two illustrative prices are not equidistant from the equilibrium, so the symmetry the chapter claims does not hold');
if (!(q(DEMAND, P_LOW) > q(SUPPLY, P_LOW))) problems.push(`${money(P_LOW)} does not produce excess demand`);
if (!(q(SUPPLY, P_HIGH) > q(DEMAND, P_HIGH))) problems.push(`${money(P_HIGH)} does not produce excess supply`);

// The four shift cases: a demand shift moves price and quantity the SAME way and a supply shift
// moves them OPPOSITE ways. That claim is made in three subsections, a takeaway and a diagram, so it
// is asserted here rather than trusted anywhere.
for (const c of [DEMAND_RISE, DEMAND_FALL]) {
  if ((c.price > P_EQ) !== (c.quantity > Q_EQ)) problems.push(`"${c.label}" moves price and quantity in opposite directions, which the section says only a supply shift does`);
}
for (const c of [SUPPLY_RISE, SUPPLY_FALL]) {
  if ((c.price > P_EQ) === (c.quantity > Q_EQ)) problems.push(`"${c.label}" moves price and quantity the same way, which the section says only a demand shift does`);
}
// quiz-01: Q14 was keyed "ambiguous". It is not, and this is the derivation that settles it.
if (!(DEMAND_RISE.cs > CS)) problems.push(`consumer surplus does not rise after an increase in demand (${money(CS)} → ${money(DEMAND_RISE.cs)}) — quiz-01 turns on this and the item is keyed "increases"`);
if (!(DEMAND_RISE.ps > PS)) problems.push('producer surplus does not rise after an increase in demand');
if (!(SUPPLY_RISE.cs > CS)) problems.push('consumer surplus does not rise after an increase in supply');
if (!(SUPPLY_RISE.ps > PS)) problems.push('producer surplus does not rise after an increase in supply');
/*
 * AND THE GENERAL CLAIM, DERIVED. The subsection used to say producer surplus after a supply increase
 * "depends on the curves" and that sellers "could end up worse off" — the cautious-sounding answer,
 * and false for the PARALLEL shift this section draws. A parallel shift lowers the curve's foot by the
 * full k and the price by only k·d/(b+d), so the price-to-foot gap widens by k·b/(b+d) ≥ 0 over a
 * larger quantity. The section now says both surpluses rise whatever the slopes, which is a stronger
 * claim and is therefore tested against demand slopes spanning perfectly inelastic to nearly flat.
 */
{
  const failures = [];
  for (const b of [0, 5, 10, 25, 50, 100, 200, 500, 1000]) {
    const dem = { intercept: Q_EQ + b * P_EQ, perDollar: -b };
    const sup2 = { intercept: SUPPLY.intercept + SUPPLY.perDollar * SUPPLY_SHIFT, perDollar: SUPPLY.perDollar };
    const { price, quantity } = cross(dem, sup2);
    const ps = producerSurplus(sup2, price, quantity);
    const cs = round2(0.5 * (p(dem, 0) - price) * quantity);
    const cs0 = round2(0.5 * (p(dem, 0) - P_EQ) * Q_EQ);
    if (ps < PS || cs < cs0) failures.push(`|dQd/dP|=${b}: PS ${PS}→${ps}, CS ${cs0}→${cs}`);
  }
  if (failures.length) problems.push(`a surplus FALLS after a parallel supply increase, which the section says cannot happen: ${failures.join('; ')}`);
}
for (const c of CASES) {
  if (c.cs !== consumerSurplus(c.demand, c.price, c.quantity)) problems.push(`"${c.label}" consumer surplus disagrees with its own curves`);
  if (c.ps !== producerSurplus(c.supply, c.price, c.quantity)) problems.push(`"${c.label}" producer surplus disagrees with its own curves`);
}

// The wedge, both ways. The two incidences must add to the wedge, which is the check the subsections
// tell a student to apply to their own answer.
if (round2(TAXED.buyerShare + TAXED.sellerShare) !== TAX) problems.push(`the tax incidences ${money(TAXED.buyerShare)} + ${money(TAXED.sellerShare)} do not add to ${money(TAX)}`);
if (round2(Math.abs(SUBSIDISED.buyerShare) + Math.abs(SUBSIDISED.sellerShare)) !== SUBSIDY) problems.push('the subsidy shares do not add to the subsidy');
if (round2(TAXED.buyer - TAXED.seller) !== TAX) problems.push('the gap between the two taxed prices is not the tax');
if (round2(SUBSIDISED.seller - SUBSIDISED.buyer) !== SUBSIDY) problems.push('the gap between the two subsidised prices is not the subsidy');
if (!(TAXED.quantity < Q_EQ)) problems.push('the tax did not reduce the quantity traded');
if (!(SUBSIDISED.quantity > Q_EQ)) problems.push('the subsidy did not raise the quantity traded');
if (TAXED.government !== round2(TAX * TAXED.quantity)) problems.push('tax revenue is not the tax times the post-tax quantity');
if (SUBSIDISED.government !== round2(SUBSIDY * SUBSIDISED.quantity)) problems.push('subsidy cost is not the subsidy times the post-subsidy quantity');
if (!(SUBSIDISED.government > TAXED.government)) problems.push('the subsidy does not cost more than the same-sized tax raises, which two subsections and a chain assert');
if (!(TAXED.buyerShare > TAXED.sellerShare)) problems.push('buyers do not bear more of the tax than sellers, which the incidence subsection states as this market\'s result');
// The incidence RULE, produced rather than asserted: the same tax on a less responsive demand curve
// must leave the buyer with more of it than on a more responsive one.
if (!(INCIDENCE_PANELS.steep.buyerShare > INCIDENCE_PANELS.flat.buyerShare)) {
  problems.push(`the incidence panels do not show the less responsive side bearing more (${money(INCIDENCE_PANELS.steep.buyerShare)} vs ${money(INCIDENCE_PANELS.flat.buyerShare)})`);
}
for (const panel of Object.values(INCIDENCE_PANELS)) {
  if (round2(panel.buyerShare + panel.sellerShare) !== TAX) problems.push('an incidence panel\'s two shares do not add to the tax');
}
// The ad valorem tax equals the specific tax at exactly one price, which is the point the subsection
// makes. If the two ever stop coinciding there, the sentence stops being true.
if (adValoremGap(P_EQ) !== TAX) problems.push(`${pc(AD_VALOREM)} of ${money(P_EQ)} is ${money(adValoremGap(P_EQ))}, not the ${money(TAX)} specific tax — the subsection's coincidence has broken`);
if (!(AV_GAP_LOW < AV_GAP_HIGH)) problems.push('the ad valorem gap does not widen with price, so the curve does not pivot');
// A wedge of zero must change nothing: a sanity check on the wedge function itself, independent of
// the two values the section actually uses.
{
  const none = wedge(0);
  if (none.buyer !== P_EQ || none.quantity !== Q_EQ) problems.push('wedge(0) does not reproduce the untaxed equilibrium, so the wedge function is not consistent with the schedules');
}

/* ── diagram geometry, re-derived from the emitted SVG ─────────────────────── */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · the schedule and the four cases — every cell generated from the schedules themselves
  const [schedule, cases] = svgOf(DIAGRAMS[0]);
  for (const price of [4, P_LOW, P_EQ, P_HIGH, 16]) {
    has(schedule, `>${money(price)}</text>`, `the schedule has no row for ${money(price)}`);
    has(schedule, `>${qty(q(DEMAND, price))}</text>`, `the schedule does not print quantity demanded of ${qty(q(DEMAND, price))} at ${money(price)}`);
    has(schedule, `>${qty(q(SUPPLY, price))}</text>`, `the schedule does not print quantity supplied of ${qty(q(SUPPLY, price))} at ${money(price)}`);
  }
  for (const c of CASES) {
    has(cases, `>${c.label}</text>`, `the four-case table has no row for "${c.label}"`);
    has(cases, `>${money(c.price)} · ${qty(c.quantity)}</text>`, `the four-case table does not print ${money(c.price)} · ${qty(c.quantity)} for "${c.label}"`);
  }
}
{ // 2 · the equilibrium, the two gaps and the two shifts
  const [eq, xsDemand, xsSupply, dShift, sShift] = svgOf(DIAGRAMS[1]);
  has(eq, `${money(P_EQ)} · ${qty(Q_EQ)}`, 'the equilibrium panel does not print both values at the crossing');
  for (const svg of [eq, xsDemand, xsSupply, dShift, sShift]) {
    has(svg, '>Quantity (cylinders a day)<', 'a panel does not label the quantity axis');
    has(svg, '>Price ($ a cylinder)<', 'a panel does not label the price axis');
  }
  has(xsDemand, `excess demand ${qty(EXCESS_DEMAND)}`, `the excess demand panel does not mark a gap of ${qty(EXCESS_DEMAND)}`);
  has(xsDemand, `>${qty(q(DEMAND, P_LOW))}</text>`, 'the excess demand panel does not read off the quantity demanded');
  has(xsDemand, `>${qty(q(SUPPLY, P_LOW))}</text>`, 'the excess demand panel does not read off the quantity supplied');
  has(xsSupply, `excess supply ${qty(EXCESS_SUPPLY)}`, `the excess supply panel does not mark a gap of ${qty(EXCESS_SUPPLY)}`);
  has(dShift, '>D₂<', 'the demand shift panel does not label the shifted curve');
  has(dShift, `>${money(DEMAND_RISE.price)}</text>`, 'the demand shift panel does not read off the new price');
  has(dShift, `>${qty(DEMAND_RISE.quantity)}</text>`, 'the demand shift panel does not read off the new quantity');
  has(sShift, '>S₂<', 'the supply shift panel does not label the shifted curve');
  has(sShift, `>${money(SUPPLY_RISE.price)}</text>`, 'the supply shift panel does not read off the new price');
  has(sShift, `>${qty(SUPPLY_RISE.quantity)}</text>`, 'the supply shift panel does not read off the new quantity');
  // The original curves must still be on the two shift panels: structure-02's complaint was a shift
  // drawn with nothing to compare it to.
  for (const [svg, label] of [[dShift, 'demand'], [sShift, 'supply']]) {
    has(svg, '>D₁<', `the ${label} shift panel does not keep the original demand curve labelled`);
    has(svg, '>S₁<', `the ${label} shift panel does not keep the original supply curve labelled`);
  }
}
{ // 3 · the two triangles, re-derived from the panels that drew them
  const [base, afterDemand, afterSupply] = svgOf(DIAGRAMS[2]);
  for (const [panel, view, label] of [[SURPLUS_BASE, base, 'equilibrium'], [SURPLUS_DEMAND, afterDemand, 'demand rise'], [SURPLUS_SUPPLY, afterSupply, 'supply rise']]) {
    has(view, `CS ${money(panel.cs)}`, `the ${label} panel does not label consumer surplus as ${money(panel.cs)}`);
    has(view, `PS ${money(panel.ps)}`, `the ${label} panel does not label producer surplus as ${money(panel.ps)}`);
  }
  // The panels solve for their own equilibrium; it must be the one the util module computed.
  if (SURPLUS_BASE.price !== P_EQ || SURPLUS_BASE.quantity !== Q_EQ) problems.push('the surplus panel solves to a different equilibrium from the schedules');
  if (SURPLUS_BASE.cs !== CS || SURPLUS_BASE.ps !== PS) problems.push('the surplus panel measures different areas from the util module');
  if (SURPLUS_DEMAND.cs !== DEMAND_RISE.cs || SURPLUS_DEMAND.ps !== DEMAND_RISE.ps) problems.push('the demand-rise panel disagrees with DEMAND_RISE');
  if (SURPLUS_SUPPLY.cs !== SUPPLY_RISE.cs || SURPLUS_SUPPLY.ps !== SUPPLY_RISE.ps) problems.push('the supply-rise panel disagrees with SUPPLY_RISE');
}
{ // 4 · the three functions and the three scales
  const [functions, scales] = svgOf(DIAGRAMS[3]);
  for (const f of ['Rationing', 'Incentive', 'Signalling']) has(functions, `>${f}</text>`, `the functions table has no row for ${f}`);
  for (const m of ['Local', 'National', 'Global']) has(scales, `>${m}</text>`, `the market-types table has no row for ${m}`);
  has(functions, `>${money(P_EQ)}: only ${qty(Q_EQ)} bought</text>`, 'the functions table does not carry the equilibrium into the rationing row');
}
{ // 5 · the tax: the wedge, the revenue rectangle, the pivot and the two incidence panels
  const [specific, revenue, adValorem, incidence] = svgOf(DIAGRAMS[4]);
  for (const svg of [specific, revenue]) {
    has(svg, `>${money(TAXED.buyer)}</text>`, 'a tax panel does not mark the price buyers pay');
    has(svg, `>${money(TAXED.seller)}</text>`, 'a tax panel does not mark the price sellers keep');
    has(svg, `>${qty(TAXED.quantity)}</text>`, 'a tax panel does not read off the post-tax quantity');
  }
  has(specific, `tax ${money(TAX)}`, 'the specific tax panel does not label the wedge with the tax');
  has(specific, '>S + tax<', 'the specific tax panel does not label the taxed supply curve');
  has(revenue, `${money(TAX)} × ${qty(TAXED.quantity)} = ${money(TAXED.government)}`, 'the revenue panel does not show the rectangle worked out');
  has(revenue, '<rect', 'the revenue panel draws no rectangle — specGap-04 is that the government\'s line was never drawn');
  has(adValorem, `>${money(AV_GAP_LOW)}</text>`, `the ad valorem panel does not measure the ${money(AV_GAP_LOW)} gap`);
  has(adValorem, `>${money(AV_GAP_HIGH)}</text>`, `the ad valorem panel does not measure the ${money(AV_GAP_HIGH)} gap`);
  has(incidence, `buyer bears ${money(INCIDENCE_PANELS.steep.buyerShare)} of ${money(TAX)}`, 'the incidence panels do not state the less responsive side\'s share');
  has(incidence, `buyer bears ${money(INCIDENCE_PANELS.flat.buyerShare)} of ${money(TAX)}`, 'the incidence panels do not state the more responsive side\'s share');
}
{ // 6 · the subsidy and its cost
  const [subsidy, cost] = svgOf(DIAGRAMS[5]);
  for (const svg of [subsidy, cost]) {
    has(svg, `>${money(SUBSIDISED.buyer)}</text>`, 'a subsidy panel does not mark the price buyers pay');
    has(svg, `>${money(SUBSIDISED.seller)}</text>`, 'a subsidy panel does not mark the price sellers receive');
    has(svg, `>${qty(SUBSIDISED.quantity)}</text>`, 'a subsidy panel does not read off the post-subsidy quantity');
  }
  has(subsidy, `subsidy ${money(SUBSIDY)}`, 'the subsidy panel does not label the wedge');
  has(cost, `${money(SUBSIDY)} × ${qty(SUBSIDISED.quantity)} = ${money(SUBSIDISED.government)}`, 'the cost panel does not show the rectangle worked out');
  has(cost, '<rect', 'the cost panel draws no rectangle');
}

/*
 * EVERY PLOTTED POINT INSIDE ITS CANVAS. Packet 23's ad valorem panel drew a marker at y = −42.86,
 * off the top of the frame, and nothing saw it: the SVG was valid and the validator does not read
 * coordinates. Every <line>, <circle> and <text> in a drawn diagram is checked against its own
 * viewBox here.
 */
for (const d of DIAGRAMS) {
  for (const [i, svg] of svgOf(d).entries()) {
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    if (!vb) { problems.push(`${d.title} scenario ${i + 1} has no viewBox`); continue; }
    const [, , vw, vh] = vb.trim().split(/[\s,]+/).map(Number);
    const outside = [];
    for (const m of svg.matchAll(/<(?:line|circle|text|rect)\b[^>]*>/g)) {
      for (const attr of ['x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy']) {
        const v = (m[0].match(new RegExp(`\\b${attr}="(-?[\\d.]+)"`)) || [])[1];
        if (v == null) continue;
        const n = Number(v);
        const limit = /x/.test(attr) ? vw : vh;
        if (n < -2 || n > limit + 2) outside.push(`${attr}=${n} (frame ${limit})`);
      }
    }
    if (outside.length) problems.push(`${d.title} scenario ${i + 1} draws outside its canvas: ${[...new Set(outside)].slice(0, 4).join(', ')}`);
  }
}

/*
 * A TABLE'S CELLS MUST NOT COLLIDE, and no code check in the repository can see this: nothing in the
 * schema or the validator knows how wide a string is.
 *
 * THE BOUND IS LENGTH-AWARE, because a single figure is not a short sentence. All 92 strings in the
 * four table scenarios were measured with getComputedTextLength() in the Browser pane at the 800px
 * column: strings of four characters or more reach 0.601em, but a ONE-character cell reaches
 * 0.874em — an em dash — and a lone digit 0.685em. A flat 0.65em guard, which is what this runner
 * started with and what packet 19's note suggests, is therefore OPTIMISTIC for exactly the cells
 * most likely to be a lone figure in a narrow column. Packet 23 found the same split and set 0.8/0.65;
 * these are this packet's own measurements, rounded up: 0.9 and 0.7.
 */
const estWidth = (text, size) => text.length * Number(size) * (text.length < 4 ? 0.9 : 0.7);
for (const d of DIAGRAMS.filter((x) => x.kind === 'table')) {
  for (const [i, svg] of svgOf(d).entries()) {
    const rows = new Map();
    for (const m of svg.matchAll(/<text\b[^>]*\bx="([\d.-]+)"[^>]*\by="([\d.-]+)"[^>]*\bfont-size="([\d.]+)"[^>]*\btext-anchor="(\w+)"[^>]*>([^<]*)</g)) {
      const [, x, y, size, anchor, text] = m;
      const w = estWidth(text, size);
      const left = anchor === 'middle' ? Number(x) - w / 2 : anchor === 'end' ? Number(x) - w : Number(x);
      const row = Math.round(Number(y));
      (rows.get(row) || rows.set(row, []).get(row)).push({ left, right: left + w, text });
    }
    for (const [row, cells] of rows) {
      cells.sort((a, b) => a.left - b.left);
      for (let k = 1; k < cells.length; k += 1) {
        if (cells[k].left < cells[k - 1].right - 0.5) problems.push(`${d.title} scenario ${i + 1}, row y=${row}: "${cells[k - 1].text}" and "${cells[k].text}" overlap`);
      }
    }
  }
}

/* ── ids, and the figures agreeing across every surface ────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: the market's figures are the same figures wherever they appear.
const must = [money(P_EQ), qty(Q_EQ), money(CS), money(PS), qty(EXCESS_DEMAND), money(TAXED.buyer), money(TAXED.seller), money(TAXED.government), money(SUBSIDISED.buyer), money(SUBSIDISED.seller), money(SUBSIDISED.government), money(DEMAND_RISE.cs)];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// ONE MINUS SIGN. A negative number typed by hand carries U+2212 and one printed by JavaScript
// carries an ASCII hyphen; packet 18 shipped 55 of one beside 13 of the other.
{
  const hyphenNumbers = prose.flatMap((s) => s.match(/(?<![\w-])-\s?[\d$]/g) || []);
  if (hyphenNumbers.length) problems.push(`${hyphenNumbers.length} negative figure(s) using an ASCII hyphen instead of U+2212: ${[...new Set(hyphenNumbers)].slice(0, 6).join(', ')}`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 24 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((x) => { pos[x.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('\nthe Sabaya cylinder market:');
console.log(`  schedules   Qd = ${DEMAND.intercept} ${DEMAND.perDollar} P   ·   Qs = ${SUPPLY.perDollar}P ${SUPPLY.intercept}   →   ${money(P_EQ)} · ${qty(Q_EQ)}`);
console.log(`  surplus     CS ${money(CS)}  PS ${money(PS)}   ·   gaps ${qty(EXCESS_DEMAND)} at ${money(P_LOW)} and ${qty(EXCESS_SUPPLY)} at ${money(P_HIGH)}`);
for (const c of CASES) console.log(`  ${c.label.padEnd(20)} ${money(c.price)} · ${qty(c.quantity)}   CS ${money(c.cs)}  PS ${money(c.ps)}`);
console.log(`  tax ${money(TAX)}       buyer ${money(TAXED.buyer)} seller ${money(TAXED.seller)} on ${qty(TAXED.quantity)} — incidence ${money(TAXED.buyerShare)}/${money(TAXED.sellerShare)}, revenue ${money(TAXED.government)}`);
console.log(`  subsidy ${money(SUBSIDY)}   buyer ${money(SUBSIDISED.buyer)} seller ${money(SUBSIDISED.seller)} on ${qty(SUBSIDISED.quantity)} — split ${money(Math.abs(SUBSIDISED.buyerShare))}/${money(Math.abs(SUBSIDISED.sellerShare))}, cost ${money(SUBSIDISED.government)}`);
console.log(`  ad valorem  ${pc(AD_VALOREM)} → ${money(AV_GAP_LOW)} at ${qty(AV_LOW_Q)} and ${money(AV_GAP_HIGH)} at ${qty(AV_HIGH_Q)}; equals the specific tax only at ${money(P_EQ)}`);
console.log(`  incidence   less responsive demand: buyer ${money(INCIDENCE_PANELS.steep.buyerShare)} · more responsive: buyer ${money(INCIDENCE_PANELS.flat.buyerShare)}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(38)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const x of PRACTICE) console.log(`  ${x.command.padEnd(10)} ${String(x.marks).padStart(2)}  ${x.question.slice(0, 76)}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const x of problems) console.log(`  - ${x}`); }
else console.log('\npacket checks: one currency · no deadweight, market clearing or invisible hand · no allocative efficiency, externality or socially optimal · no price floor or ceiling · no behavioural block · no Assess, Outline or 10-mark · no UK framing, rent control or dated claim · no uncited examiner, marker or paper claim · every practice tariff in the ECONOMICS census and every command word used · both Appendix 6 gloss checks · every block pinned to a quiz, a practice item and a diagram, each on its own topic · the equilibrium, both gaps, four shift cases, two surpluses, both wedges and the incidence rule all recomputed · every diagram figure re-derived from the emitted SVG · nothing drawn outside its canvas · no table cell collisions · ids unique · one minus sign');

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
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 170)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 170)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const path = `audit/snapshots/packet-24-bundle__economics__${SECTION}.json`; writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-24-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${path}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
