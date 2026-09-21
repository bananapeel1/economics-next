#!/usr/bin/env node
/**
 * PACKET 26 — government-intervention, IAL Economics Unit 1 topic 1.3.6 (23 spec leaves).
 *
 *   node scripts/packet-26-government-intervention.mjs            dry run: build, measure, validate
 *   node scripts/packet-26-government-intervention.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-26-government-intervention.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet26-content.mjs, assessment in _packet26-assessment.mjs, diagrams in
 * _packet26-diagrams.mjs. This file assembles the bundle, pins each block to its diagram, quiz and
 * practice items, and runs the checks a verifier will run.
 *
 * THE FIVE CHECKS CARRIED FROM PACKET 25, unchanged in substance: pin ownership · canvas bounds ·
 * TEXT EXTENT (with its A/B) · the copy-from-screen reorder check (with its A/B) · the guided
 * opening. Plus the computed table columns, which live in the diagrams module and THROW rather than
 * lay out a collision, and the widened ledger-id and previous-content bans.
 *
 * AND WHAT THIS PACKET ADDS, because packet 25's last lesson was that an acceptance check no code
 * runs is a wish: the spec block in NEXT.md names 23 leaves, a set of figures, and two arithmetic
 * coincidences that three chapters are built on. All three are asserted below.
 *
 *   - THE LEAF MAP. Every one of the 23 leaves `contextFor` resolves is claimed by exactly one block,
 *     and the map is checked against `contextFor` rather than against a list typed here, so a leaf
 *     that the resolver gains or loses fails the build.
 *   - TAX AND CAP MEET. Three chapters assert that a tax set at the external cost and a cap set at
 *     the social optimum reach the same quantity and the same buyer price, and that a permit is then
 *     worth the tax. It is re-derived from the market's own lines: if the slopes ever change so that
 *     it stops being true, the section stops making its point and the build stops.
 *   - THE MINIMUM-PRICE COMPARISON. `specGap-04` is the whole of chapter 4's third subsection, and it
 *     depends on buyers paying the same price under the floor and under the tax. Also derived.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, qty, round2, valueAt, meet, quantityAt, COAL, CLINIC, FLATS } from './_packet26-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6, B7, B8 } from './_packet26-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet26-assessment.mjs';
import { DIAGRAMS, estWidth, METHODS, CONTEXTS, TOOL_CHOICE, CAUSES } from './_packet26-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6, B7, B8];
const C = COAL, L = CLINIC, F = FLATS;

/* ── assemble ──────────────────────────────────────────────────────────────── */

const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
/* The search is over the BLOCK'S OWN pool, never the whole bank (packet 24 reserved a pre-test item
 * as a check-in question by searching the bank). */
const first = (list, needle) => {
  const i = list.find((j) => QUIZ[j].question.includes(needle));
  if (i == null) throw new Error(`no quiz item in this block matching "${needle}"`);
  return [i, ...list.filter((x) => x !== i)];
};
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'the welfare loss is'),
  [B2]: first(quizByBlock[B2], 'Government revenue is'),
  [B3]: first(quizByBlock[B3], 'The cost to the government is'),
  [B4]: first(quizByBlock[B4], 'maximum price of'),
  [B5]: first(quizByBlock[B5], 'A permit is therefore worth'),
  [B6]: first(quizByBlock[B6], 'Under state provision'),
  [B7]: first(quizByBlock[B7], 'eight contexts'),
  [B8]: first(quizByBlock[B8], 'the welfare loss is'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/* Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55).
 * `diagramRef` — the March section's `"Indirect Tax"`, which matched no title (structure-03) — is the
 * legacy string pin and is not used here at all. */
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
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const problems = [];
const count = (re) => prose.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€|¥/g, 'a currency other than dollars (locale.currency)');

/*
 * OFF-SPEC VOCABULARY, each with the count that settles it. Ninth instance of the packet
 * 13/16/17/18/20/22/23/24/25 rule, and this section carries the shape TWICE: the audit asks for a
 * cause the specification does not contain (`specGap-01`, `topFix-05`) AND is silent about two
 * causes that are present and belong to Unit 3.
 */
ban(/\bprice ceilings?\b|\bprice floors?\b/gi, '"price ceiling" or "price floor" (0 each in econ_spec.txt — packet 24\'s finding, and both were BLOCK TITLES here. :809 reads "maximum and minimum (guaranteed) prices")');
ban(/\bdistortion of price signals?\b|\bprice signals?\b/gi, '"price signals" (0 in econ_spec.txt; `distortion of price signals` 0. `specGap-01` and `topFix-05` both ask for it as a spec-named cause of government failure and it is UK GCE 9EC0 1.4.2 — 2b is a closed list of five at :827-831)');
ban(/\bregulatory capture\b/gi, '"regulatory capture" (econ_spec.txt:1520, topic 3.3.5 — Unit 3, and packet 48\'s section. The March section taught it as a cause of government failure at 1.3.6, where the list is closed at five, and NO ledger item says so)');
ban(/\bshort[- ]?termism\b/gi, '"short-termism" (0 in econ_spec.txt — the March section\'s "political short-termism" cause. Same shape as regulatory capture and equally unnamed by the audit)');
ban(/\bbuffer stocks?\b/gi, '"buffer stock" (econ_spec.txt:1958, topic 4.3.6 — Unit 4. `specGap-07` is unsure; it is not WEC11 at any point, so quiz Q21 is deleted rather than taught to)');
ban(/\bnudges?\b|\blibertarian\b|\bchoice architecture\b|\banchoring\b/gi, 'nudge theory or its vocabulary (0 each in econ_spec.txt — `accuracy-02` is right about this. The IAL home of that material is 1.3.2 · 1b at :580-587, NOT the "1.2.10" the finding names: no IAL topic has a middle digit but 3)');
ban(/\bmerit goods?\b|\bdemerit goods?\b/gi, 'merit or demerit goods (0 each in econ_spec.txt and both named `terms.off-spec` phrases — `specGap-04` is a real gap phrased in this vocabulary)');
ban(/\bdead[- ]?weight\b/gi, '"deadweight" (0 in econ_spec.txt; a named `terms.off-spec` phrase)');
ban(/\ballocativ(e|ely)\b/gi, '"allocative efficiency" (econ_spec.txt:1364, topic 3.3.3 — Unit 3)');
ban(/\bmonopol(y|ies|ist|istic)\b/gi, 'monopoly (econ_spec.txt:1424, topic 3.3.6 — Unit 3)');
ban(/\bprivatis|privatiz|deregulat|nationalis|nationaliz/gi, 'privatisation, deregulation or nationalisation (econ_spec.txt:1502-1512, topic 3.3.5 — Unit 3. The March section gave a BLOCK to "Regulation & Deregulation")');
ban(/\bminimum wages?\b/gi, '"minimum wage" (econ_spec.txt:1530, topic 3.3.4 — Unit 3)');
ban(/\bquotas?\b/gi, '"quota" (econ_spec.txt:1693, topic 4.3.2 — Unit 4. Singapore\'s vehicle scheme is described as a limited number of permits)');
ban(/\bblack markets?\b/gi, '"black market" (0 in econ_spec.txt — the mechanism is described instead: excess demand settled by payments outside the official price)');
ban(/\bshortages?\b/gi, '"shortage" (0 in econ_spec.txt — the specification\'s phrase at :701-702 is "excess demand")');
ban(/\bsurplus(es)?\b/gi, '"surplus" (econ_spec.txt:703-706 is CONSUMER and PRODUCER surplus, topic 1.3.4 · 2, which packet 24 teaches. Using it for unsold output collides with a meaning taught two topics earlier — say "excess supply")');
ban(/\bPigou(vian)?\b/gi, 'a Pigouvian tax (0 in econ_spec.txt)');
ban(/\binternalis|internaliz/gi, '"internalise" (0 in econ_spec.txt)');
ban(/\bspill[- ]?overs?\b/gi, '"spillover" (0 in econ_spec.txt)');
ban(/\bexcise\b/gi, '"excise" (0 in econ_spec.txt)');
ban(/\bpolluter[- ]pays\b|\bcap and trade\b|\bmeans[- ]tested\b/gi, 'a phrase from another syllabus (0 each in econ_spec.txt)');
/*
 * AND THE ONES THAT ARE NOT BANNED, recorded here so nobody bans them later. `maximum price` and
 * `minimum price` each grep 0 and BOTH are the specification's own words: :809 reads "maximum and
 * minimum (guaranteed) prices", so the phrase is split across the line exactly as packet 25's
 * `social cost` was at :739-740. A grep returning zero is evidence about the grep as well as the
 * text. `government failure` (:824) and `property rights` (:811) are THIS section's, which is why
 * packet 25 banned them and this one does not.
 */

ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — the March practice[4] used it)');
ban(/\bAssess\b/g, '"Assess" (not an IAL ECONOMICS command word at any tariff)');
ban(/\b10.mark|\(10 marks\)/g, 'a 10-mark item (Economics has no 10-mark tariff)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|Universal Credit|the Chancellor|Office for National Statistics|TfL|Transport for London|black cab)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(ONS|OBR|DWP|CAP|CMA)\b/g, 'a UK-only or EU-only acronym (locale.institution)');
ban(/\b(the UK|United Kingdom|Britain|British|London|England|English|Scotland|Scottish)\b/g, 'a UK framing (an international cohort sits WEC11 in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya) — the March section had NINE UK examples (structure-08)');
ban(/\bsugar levy\b|\bplug-in grant\b|\bauto-enrolment\b/gi, 'a named UK policy (structure-08)');

ban(/\b(?:specGap|topFix|structure|accuracy|specThin|practice|quiz|diagram)-\d+\b/g, 'an internal ledger id left in text a student reads (packet 19\'s Layer 6 finding, widened by packet 25)');
ban(/\bLeaf \d|\bleaf \d/g, 'the word "leaf" — this platform\'s internal name for a spec sub-bullet — where a student reads it');
ban(/\b(the|this) (March |previous |old )?(version|section|copy|item|content|bank|quiz) (used to|previously|once) \b|\bthe March (version|section|copy|item|content|bank|quiz)\b|\bin the previous version\b|\bused to say\b|\bthe section\'s own (quiz|notes|body|card)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/* NO DATED CLAIM ABOUT A REAL MARKET (packet 15's accuracy-01 rule). `accuracy-01` here is a claim
 * this repository could not check and which is false: London has never numerically capped black-cab
 * licences. Every UK example is removed rather than corrected, and this refuses the shape. */
for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) if (/\b(19|20)\d{2}\b/.test(sent)) problems.push(`a dated claim about a real market: "${sent.trim().slice(0, 90)}"`);

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{ // A/B, run every time (packet 21)
  const mustFire = ['A chain that stops at the diagram earns half the marks (3 marks) available.', 'An answer without a diagram scores poorly.', 'Mark schemes accept an external-cost diagram here.'];
  const mustNotFire = ['The producer pays only the private cost, so that cost alone is what the supply curve is built from (1 mark).', 'Revenue is the tax per tonne times the quantity traded after it (2 marks).'];
  const wrong = [
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `still fires on a point allocation: "${x}"`),
  ];
  if (wrong.length) problems.push(`the marker-claim check is broken: ${wrong.join('; ')}`);
}

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love|increasingly popular in exam)\b/i;
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
 * THE 20-MARK EVALUATE EXISTS AND MUST. `practice-01` and `topFix-04` both ask for it to become a
 * 14-mark Discuss on the grounds that "20-mark essays are WEC13/WEC14 format". The census row for
 * Evaluate carries NO unitNote, and PROTOCOL's paper table has WEC11 Section D as one 20-mark essay
 * from a choice of two. This asserts the census fact the refusal rests on, so that a future edit
 * that quietly drops the item, or a census that changes, fails here rather than silently.
 */
{
  const ev = census.find((r) => r.command === 'Evaluate');
  if (!ev || !ev.marks.includes(20) || ev.unitNote) problems.push('the census no longer says Economics Evaluate is 20 marks with no unit note — re-check practice-01 before keeping the 20-mark item');
  if (!PRACTICE.some((x) => x.command === 'Evaluate' && x.marks === 20)) problems.push('the 20-mark Evaluate is gone; practice-01 asks for that and the census (econ_spec.txt:2741-2747) says the finding is wrong');
  const def = census.find((r) => r.command === 'Define');
  if (!def || !def.marks.includes(2) || def.marks.includes(4)) problems.push('the census no longer gives Define as 2 marks — the March "Define … (4 marks)" was re-tariffed on that basis');
}
/* THE GUIDED OPENING (packet 25). */
for (const x of PRACTICE) {
  const paras = String(x.guidance).split('\n').filter(Boolean);
  if (paras.length < 2) problems.push(`practice ${x.command}: one-paragraph guidance, so guided mode prints the whole mark scheme above the answer box`);
  const opening = paras[0] || '';
  if (/\(\s*\d+\s*marks?\s*\)/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph allocates marks, and it is shown BEFORE the student writes`);
  if (/=/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph contains a worked calculation, and it is shown BEFORE the student writes`);
}
/*
 * THE BANK-LEVEL GAP. The March five covered taxes, subsidies, maximum prices and government failure,
 * and nothing at all on permits, property rights, regulation, state provision, information, or any
 * of the eight contexts — five of 1b's eight methods with no practice item between them.
 */
for (const [needle, what] of [
  [/tax/i, 'indirect taxation'], [/subsid/i, 'subsidies'], [/maximum price/i, 'maximum prices'],
  [/minimum price/i, 'minimum (guaranteed) prices'], [/permit/i, 'tradeable pollution permits'],
  [/information/i, 'provision of information'], [/government failure/i, 'government failure'],
  [/fuel|energy/i, 'one of the 1c contexts'],
]) {
  if (!PRACTICE.some((x) => needle.test(x.question))) problems.push(`no practice item covers ${what}`);
}

/* A GLOSS THAT CITES APPENDIX 6 MUST SAY WHAT APPENDIX 6 SAYS (packet 21) AND MUST NOT BOLT AN EXTRA
 * REQUIREMENT ONTO IT (packet 23). */
{
  const STOP = new Set(['requires', 'required', 'students', 'student', 'needs', 'relevant', 'includes', 'including', 'appropriate', 'provided', 'should', 'there', 'which', 'their', 'these', 'those', 'where', 'marks', 'other', 'while', 'about']);
  const words = (t) => new Set(String(t).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((w) => w.length >= 5 && !STOP.has(w)));
  const glosses = [...SUBSECTIONS.map((x) => [x.title, x.examMatters]), ...PRACTICE.map((x) => [`practice ${x.command} (${x.marks})`, x.guidance])];
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
    [/\bdiagram/i, /diagram/i, 'diagrams'], [/\binterpret/i, /interpret/i, 'interpretation'],
    [/\bworkings?\b/i, /workings/i, 'showing workings'], [/chains? of reasoning/i, /chains? of reasoning/i, 'a chain of reasoning'],
    [/\bbrief assessment\b/i, /brief assessment/i, 'a brief assessment'], [/\bdepth rather than breadth\b/i, /depth rather than breadth/i, 'depth rather than breadth'],
    [/\bjudgement/i, /judgements?/i, 'a judgement'], [/different viewpoints/i, /different viewpoints/i, 'different viewpoints'],
  ];
  const guidanceCommand = new Map(PRACTICE.map((x) => [x.guidance, x.command]));
  for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
    if (!/appendix\s*6/i.test(sent)) continue;
    const row = census.find((r) => new RegExp(`\\b${r.command}\\b`).test(sent)) || census.find((r) => r.command === guidanceCommand.get(s));
    if (!row) { problems.push(`a sentence cites Appendix 6 but names no command word: "${sent.trim().slice(0, 80)}"`); continue; }
    for (const [inSentence, inDescription, what] of APPENDIX_CLAIMS) {
      if (inSentence.test(sent) && !inDescription.test(row.description)) problems.push(`Appendix 6 is cited for ${what} under ${row.command}, which its description does not mention: "${sent.trim().slice(0, 90)}"`);
    }
  }
}

/* THE LENGTH TELL THE VALIDATOR CANNOT SEE (packet 21). */
{
  const longest = bundle.quiz.filter((x) => {
    const c = String(x.options[x.correctIndex]).length;
    return x.options.every((o, j) => j === x.correctIndex || String(o).length < c);
  }).length;
  const share = longest / bundle.quiz.length;
  if (bundle.quiz.length >= 8 && share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${bundle.quiz.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}

/*
 * AN EXPLANATION MAY NOT POINT AT AN OPTION BY POSITION, AND SEVEN OF THIS BANK'S THIRTY-FIVE DID.
 *
 * Items here are authored with the key FIRST and the key is then DEALT into a slot by `placeKeys`,
 * so "the second option uses the quantity before the tax" is written against the authored order and
 * is wrong the instant the deal moves anything. It is wrong twice over: options are shuffled AGAIN
 * at render (F074), and that shuffle only declines to run when an explanation names an option by
 * LETTER — an ordinal like "the third" does not stop it. So the pointer is unstable even for a
 * reader who never reloads.
 *
 * Nothing in the repository could see this. `quiz.dup-options`, `quiz.long-correct` and the answer
 * histogram all look at the OPTIONS; the explanation is prose and no rule reads it as a reference.
 * Found by Layer 6 on this packet's own bank, where it produced six explanations that name the
 * correct answer as if it were a distractor — a student who gets the item right is then told why
 * their answer is wrong.
 *
 * The fix is not to renumber: it is to name the option by its CONTENT, which survives any order.
 */
{
  const POSITIONAL = /\b(the )?(first|second|third|fourth|last|final) (option|answer|one|choice)\b|\boption (one|two|three|four|[A-D])\b|\bthe (second|third|fourth|last)\b(?=[^.]*\b(is|uses|describes|counts)\b)/i;
  for (const [i, q] of QUIZ.entries()) {
    if (POSITIONAL.test(q.explanation)) problems.push(`quiz item ${i} names an option by POSITION ("${(q.explanation.match(POSITIONAL) || [''])[0]}") — placeKeys deals the key into a slot and F074 shuffles again at render, so the pointer is wrong: "${q.question.slice(0, 48)}"`);
  }
  // A/B (packet 21): the shape must fire, and naming an option by its content must not.
  const mustFire = ['The second option uses the quantity before the tax.', 'Option C is the total spending by buyers.', 'The last is the welfare gain.'];
  const mustNotFire = ['$900 uses the 60 tonnes traded BEFORE the tax.', 'An answer of 250 is the whole quantity demanded rather than the gap.'];
  for (const x of mustFire) if (!POSITIONAL.test(x)) problems.push(`the positional-reference check no longer fires on: "${x}"`);
  for (const x of mustNotFire) if (POSITIONAL.test(x)) problems.push(`the positional-reference check fires on an option named by its content: "${x}"`);
}

/* A REORDER MAY NOT BE THE FLOW BOX ON THE SCREEN ABOVE IT (packet 25; `structure-04` is this
 * section's finding, and ALL NINE of the March reorders were verbatim copies). */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const flow = (sec.body || []).find((b) => b.type === 'flow');
  if (!flow) continue;
  const titles = new Set((flow.steps || []).map((x) => (typeof x === 'object' ? x.title : x)));
  const copied = (r.correctOrder || []).filter((x) => titles.has(x));
  if (copied.length) problems.push(`"${sec.title}": ${copied.length} of ${r.correctOrder.length} reorder items are the flow box on the same step, word for word — a copy-from-screen task (structure-04): "${copied[0].slice(0, 50)}"`);
}
/*
 * AND THE CLAUSE BOTH OF THE ABOVE MISS: A REORDER MAY NOT SIT UNDER A FLOW BOX AT ALL.
 *
 * `structure-04` is a TWO-CLAUSE finding and this packet closed one of them. Clause (a) is that the
 * reorders were "verbatim copies of the flow widget" — closed by the identity check and then by the
 * overlap check below. Clause (b) is the structural half: "because each is the first section of its
 * step they render as 'immediate' recalls at the bottom of the same step with the flow visible
 * above." Verify A rejected the packet on exactly that, and was right to: seven of eight reorders
 * still sat directly beneath a numbered list of their own answer, however carefully reworded. A
 * paraphrase is easier to copy than a duplicate, not harder — the words differ and the ORDER, which
 * is the only thing a reorder tests, is still printed above it.
 *
 * Rule 5 exists for this: split a multi-part ledger item into clauses BEFORE building and say which
 * artefact satisfies which. The spec block did not split this one.
 *
 * So the rule is structural and needs no judgement to check: a subsection with a `flow` body does
 * not carry a `reorder` recall. It costs this section its reorder variety — one of thirty-one, where
 * the others are fill-in, match and classify — and that cost is real and is recorded in the handoff.
 * The finding's own first remedy, rendering the recall ONLY as a spaced recall on a later step, is
 * not available to an author: `lib/learn-steps.js` decides spacing, so it is a code change.
 */
for (const sec of SUBSECTIONS) {
  const hasFlow = (sec.body || []).some((b) => b.type === 'flow');
  if (hasFlow && sec.recall?.type === 'reorder') problems.push(`"${sec.title}" carries a flow box AND a reorder recall: learn-steps.js:10 renders the recall below the teaching on the same step, so the answer's ORDER is printed above it (structure-04, clause b)`);
}

/*
 * AND THE SAME CHECK ON MEANING RATHER THAN ON CHARACTERS, which is what packet 25's version could
 * not see. `structure-04` is about a student COPYING the order off the screen, and a reorder item
 * that is a close paraphrase of the flow step above it is copyable by matching words — string
 * identity is not the property that makes it copyable. Measured as token overlap (Jaccard) against
 * every flow step on the same subsection: this packet's first build passed the identity check with
 * three items at 0.67, 0.67 and 0.73, all of them recognisable at a glance as the line above.
 *
 * 0.6 is the bound. It is not a guess: `reorder.source` wants the item to come from the taught
 * sequence, so real overlap is expected and forbidding it would forbid the rule's own intent. What
 * is forbidden is an item a reader can pair with a flow step without understanding either, and the
 * A/B below fixes both ends of that.
 */
{
  const tok = (x) => new Set(String(x).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean));
  const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i); };
  for (const sec of SUBSECTIONS) {
    const rc = sec.recall;
    if (!rc || rc.type !== 'reorder') continue;
    const flow = (sec.body || []).find((b) => b.type === 'flow');
    if (!flow) continue;
    const titles = (flow.steps || []).map((x) => (typeof x === 'object' ? x.title : x));
    for (const item of rc.correctOrder || []) {
      const best = Math.max(...titles.map((t2) => jac(item, t2)));
      if (best >= 0.6) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares ${Math.round(best * 100)}% of its words with a flow step on the same screen — copyable by matching, which is structure-04 whatever the strings are`);
    }
  }
  // A/B: a near-paraphrase must fire and a genuine restatement must not.
  const step = 'Buyers value the good more highly than before';
  if (jac('Buyers now value the good more highly than they did before', step) < 0.6) problems.push('the reorder-overlap check no longer fires on a near-paraphrase of a flow step');
  if (jac('A consultation is worth more to somebody who knows what it prevents', step) >= 0.6) problems.push('the reorder-overlap check fires on a genuine restatement, which `reorder.source` is designed to accept');
}

{ // A/B (packet 21)
  const flowTitles = new Set(['The tax is added to what each unit costs to sell']);
  const fires = (items) => items.filter((x) => flowTitles.has(x)).length > 0;
  if (!fires(['The tax is added to what each unit costs to sell'])) problems.push('the copy-from-screen check no longer fires on a verbatim flow step');
  if (fires(['Each unit now costs the seller the tax on top of what it cost before'])) problems.push('the copy-from-screen check fires on a paraphrase, which `reorder.source` is designed to accept');
}

/* ── pins ──────────────────────────────────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
/* THE FREE-QUIZ CEILING IS A FUNCTION OF BLOCK COUNT (DECISIONS, 16 Sep). At EIGHT blocks a
 * signed-out student's pre-test is two questions rather than three; at NINE a chapter loses its
 * check-in question outright, and this refuses that. */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz at all for a signed-out student (lib/preview-limits.js). Split the section or raise the cap with the founder.`);
if (BLOCKS.length === 8) console.log('\nNOTE: at 8 blocks a signed-out student\'s pre-test is 2 questions, not 3 — 2 + 8 pins = FREE_QUIZ_MAX, so PRETEST_HEADROOM has nothing to spend. Every chapter still gets its check-in quiz. At 9 blocks one would not.');
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
{
  const flat = Object.values(quizIndices).flat();
  if (new Set(flat).size !== flat.length) problems.push('a quiz item is pinned by more than one block (pins.reuse)');
  for (const i of flat) if (unpinned.has(i)) problems.push(`quiz item ${i} is pinned by a block AND left for the pre-test pool ("${QUIZ[i].question.slice(0, 50)}")`);
  for (const b of BLOCKS) for (const i of quizIndices[b]) if (QUIZ[i].block !== b) problems.push(`block "${b}" pins quiz item ${i}, which belongs to "${QUIZ[i].block || 'the pre-test'}"`);
  const firsts = BLOCKS.map((b) => quizIndices[b][0]);
  if (firsts.every((v, i) => i === 0 || v === firsts[i - 1] + 1)) problems.push('quizIndices are consecutive in block order (pins.identity) — which is the March section\'s structure-01 exactly');
}
/* `structure-01` named the mis-pins one by one: six of eight blocks opened their check-in with a
 * question about another chapter. Each block's LEAD item must be about that block. */
for (const [b, needle, what] of [
  [B1, /welfare loss|eight methods|fixes the quantity|worth making/i, 'why governments intervene'],
  [B2, /tax|revenue|ad valorem|incidence/i, 'indirect taxation'],
  [B3, /subsid/i, 'subsidies'],
  [B4, /maximum price|minimum price|guaranteed|rationed/i, 'price controls'],
  [B5, /permit|property right|cap/i, 'permits, rights and regulation'],
  [B6, /state provision|information/i, 'provision'],
  [B7, /context|housing|energy|agricultur|commodit/i, 'the 1c contexts'],
  [B8, /welfare loss|government failure|causes|moral hazard|administ/i, 'government failure'],
]) {
  const lead = QUIZ[(quizIndices[b] || [])[0]]?.question || '';
  if (!needle.test(lead)) problems.push(`block "${b}" opens its check-in with an item that is not about ${what}: "${lead.slice(0, 60)}" (structure-01)`);
}

/* ── the leaf map: every one of 1.3.6's leaves claimed by exactly one block ─── */
/*
 * The map is by LEAF ID and is checked against what `contextFor` resolves, not against a list typed
 * here, so a leaf the resolver gains or loses fails the build rather than being silently uncovered.
 * `specGap-08` (extension of property rights) and `specGap-09` (commodities) are two leaves the March
 * section did not touch at all, and `specThin-01` (energy) is a third it named once.
 */
const LEAF_MAP = {
  [B1]: ['1a'],
  [B2]: ['1b-1'],
  [B3]: ['1b-2'],
  [B4]: ['1b-3'],
  [B5]: ['1b-4', '1b-5', '1b-7'],
  [B6]: ['1b-6', '1b-8'],
  [B7]: ['1c-1', '1c-2', '1c-3', '1c-4', '1c-5', '1c-6', '1c-7', '1c-8'],
  [B8]: ['2a', '2b-1', '2b-2', '2b-3', '2b-4', '2b-5'],
};
const ctxEarly = await contextFor(SECTION);
{
  const specLeaves = ctxEarly.specItems.filter((s) => s.kind === 'leaf').map((s) => s.id.replace(/^ECON-1\.3\.6-/, ''));
  const claimed = Object.values(LEAF_MAP).flat();
  if (ctxEarly.number !== '1.3.6') problems.push(`contextFor resolves this section to ${ctxEarly.number}, not 1.3.6 (specGap-06 asked whether the app's label was right: econ_spec.txt:798 says it is)`);
  if (specLeaves.length !== 23) problems.push(`contextFor resolves ${specLeaves.length} leaves, not the 23 the spec block is built on`);
  for (const leaf of specLeaves) if (!claimed.includes(leaf)) problems.push(`spec leaf ${leaf} is claimed by no block`);
  for (const leaf of claimed) if (!specLeaves.includes(leaf)) problems.push(`the leaf map claims ${leaf}, which contextFor does not resolve`);
  const dupLeaf = claimed.filter((x, i) => claimed.indexOf(x) !== i);
  if (dupLeaf.length) problems.push(`leaf(es) claimed by more than one block: ${[...new Set(dupLeaf)].join(', ')}`);
}

/* ── the arithmetic, recomputed here rather than trusted ───────────────────── */
if (meet(C.demand, C.mpc) !== C.marketQ) problems.push('the coal market quantity is not where demand meets MPC');
if (meet(C.demand, C.msc) !== C.optimumQ) problems.push('the coal social optimum is not where demand meets MSC');
if (C.marketQ !== 60 || C.optimumQ !== 50) problems.push(`the coal quantities are ${C.marketQ} and ${C.optimumQ}, not 60 and 50`);
if (valueAt(C.msc, 0) - valueAt(C.mpc, 0) !== C.externalCost) problems.push('the MSC/MPC gap is not constant, so the shift is not parallel and ½ × gap × range is the wrong area');
if (C.welfareLoss !== round2(0.5 * C.externalCost * (C.marketQ - C.optimumQ))) problems.push('the coal welfare loss disagrees with ½ × gap × range');
if (!(C.marketQ > C.optimumQ)) problems.push('an external COST of production does not put the market above the social optimum, which every surface in chapter 1 asserts');

/* THE TAX. Set at the external cost, the curve sellers act on must BE MSC — that identity is the
 * whole argument chapter 2 makes for choosing that number. */
if (C.tax !== C.externalCost) problems.push('the tax is not set at the external cost, which chapter 2 asserts');
if (valueAt(C.taxedSupply, 0) !== valueAt(C.msc, 0) || C.taxedSupply.perUnit !== C.msc.perUnit) problems.push('MPC + tax is not the same line as MSC, and chapter 2 says it is');
if (C.taxedQ !== C.optimumQ) problems.push(`the tax does not reach the social optimum: ${C.taxedQ} against ${C.optimumQ}`);
if (round2(C.consumerIncidence + C.producerIncidence) !== C.tax) problems.push(`the two incidences (${money(C.consumerIncidence)} and ${money(C.producerIncidence)}) do not add to the tax`);
if (C.consumerIncidence !== round2(2 * C.producerIncidence)) problems.push(`the incidence split is not two to one (${money(C.consumerIncidence)} against ${money(C.producerIncidence)}), and three surfaces say it is`);
if (C.revenue !== round2(C.tax * C.taxedQ)) problems.push('revenue is not the tax times the quantity AFTER the tax');

/*
 * TAX AND CAP MEET — acceptance check 5, asserted rather than wished. Chapters 5 and 7 and two chains
 * assert that a cap at the optimum and a tax at the external cost reach the same quantity and the
 * same buyer price, and that a permit is then worth the tax. All three are re-derived from the lines.
 */
if (C.capQ !== C.taxedQ) problems.push(`the cap and the tax do not reach the same quantity (${C.capQ} against ${C.taxedQ})`);
if (C.capBuyerP !== C.buyerP) problems.push(`the cap and the tax do not put buyers at the same price (${money(C.capBuyerP)} against ${money(C.buyerP)})`);
if (C.permitPrice !== round2(valueAt(C.demand, C.capQ) - valueAt(C.mpc, C.capQ))) problems.push('the permit price is not demand(cap) − MPC(cap)');
if (C.permitPrice !== C.tax) problems.push(`a permit is worth ${money(C.permitPrice)} and the tax is ${money(C.tax)}; chapter 5, chapter 7, two flashcards and a chain all say they are the same number`);

/*
 * THE MINIMUM-PRICE COMPARISON — acceptance check 6, and the whole of `specGap-04`. Buyers must pay
 * the same price and buy the same quantity under the floor as under the tax, or the third subsection
 * of chapter 4 has nothing to compare.
 */
if (C.minPrice !== C.buyerP) problems.push(`the minimum price (${money(C.minPrice)}) is not the price buyers pay under the tax (${money(C.buyerP)}), and chapter 4 compares them on exactly that`);
if (C.minDemanded !== C.taxedQ) problems.push(`the floor and the tax do not leave buyers with the same quantity (${C.minDemanded} against ${C.taxedQ})`);
if (C.minSupplied !== quantityAt(C.mpc, C.minPrice)) problems.push('quantity supplied at the floor is not read off MPC');
if (C.minExcessSupply !== round2(C.minSupplied - C.minDemanded)) problems.push('excess supply is not supplied minus demanded');
if (!(C.minExcessSupply > 0)) problems.push('the minimum price produces no excess supply, so chapter 4 has nothing to teach');
if (C.sellerUnderMinimum === C.sellerP) problems.push('sellers receive the same under the floor as under the tax, which collapses the specGap-04 comparison');
if (round2(C.sellerUnderMinimum - C.sellerP) !== C.tax) problems.push(`the gap between what sellers get under the floor and under the tax is not the ${money(C.tax)} the section says goes to a different recipient`);

/* THE OVERSHOOT. Chapter 8 and a chain assert the loss comes back the same size on the other side. */
if (C.wrongTax !== round2(2 * C.externalCost)) problems.push('the overshoot tax is not twice the external cost');
if (!(C.wrongQ < C.optimumQ)) problems.push('the overshoot does not put the quantity below the optimum');
if (round2(C.optimumQ - C.wrongQ) !== round2(C.marketQ - C.optimumQ)) problems.push('the overshoot is not the same distance from the optimum as the free market was, and chapter 8 says it is');
if (C.wrongLoss !== C.welfareLoss) problems.push(`the overshoot loss (${money(C.wrongLoss)}) is not the free-market loss (${money(C.welfareLoss)}), which chapter 8, a quiz item and a chain all assert`);

/* THE CLINIC MARKET. */
if (meet(L.mpb, L.mpc) !== L.marketQ) problems.push('the clinic market quantity is not where MPB meets MPC');
if (meet(L.msb, L.msc) !== L.optimumQ) problems.push('the clinic social optimum is not where MSB meets MSC');
if (L.marketQ !== 50 || L.optimumQ !== 58) problems.push(`the clinic quantities are ${L.marketQ} and ${L.optimumQ}, not 50 and 58`);
if (valueAt(L.msb, L.marketQ) - valueAt(L.mpb, L.marketQ) !== L.externalBenefit) problems.push('the gap between MSB and MPB is not the external benefit');
if (L.welfareGain !== round2(0.5 * L.externalBenefit * (L.optimumQ - L.marketQ))) problems.push('the clinic welfare gain disagrees with ½ × gap × range');
if (L.subsidisedQ !== L.optimumQ) problems.push('the subsidy does not reach the social optimum');
if (round2(L.providerP - L.buyerP) !== L.subsidy) problems.push('the two clinic prices are not the subsidy apart');
if (round2(L.consumerGain + L.producerGain) !== L.subsidy) problems.push('the two gains do not add to the subsidy');
if (L.consumerGain !== round2(2 * L.producerGain)) problems.push('the subsidy gain is not split two to one, and chapter 3 says it is the same rule as the tax');
if (L.cost !== round2(L.subsidy * L.subsidisedQ)) problems.push('the subsidy cost is not the subsidy times the quantity AFTER it');
/* INFORMATION REACHES THE SAME QUANTITY AS THE SUBSIDY AT A HIGHER PRICE — chapter 6's whole point. */
{
  const infoQ = meet(L.msb, L.mpc);
  const infoP = valueAt(L.mpc, infoQ);
  if (infoQ !== L.subsidisedQ) problems.push(`information reaches ${infoQ} ${L.units} and the subsidy reaches ${L.subsidisedQ}; chapter 6 says they are the same`);
  if (!(infoP > L.buyerP)) problems.push('information does not leave buyers paying MORE than the subsidy does, which is the distinction chapter 6 turns on');
}

/* THE FLATS MARKET. A maximum price must bind below equilibrium and produce excess demand. */
if (meet(F.demand, F.supply) !== F.marketQ) problems.push('the flats market quantity is not where demand meets supply');
if (!(F.maxPrice < F.marketP)) problems.push('the maximum price is not below the market price, so it would bind on nothing');
if (F.excessDemand !== round2(F.demanded - F.supplied)) problems.push('excess demand is not demanded minus supplied');
if (!(F.supplied < F.marketQ)) problems.push('quantity supplied does not FALL under the maximum price, and the section says some renters lose their flat');
if (F.pricedOut !== round2(F.marketQ - F.supplied)) problems.push('the number priced out is not the fall in quantity supplied');
/* AND NO EXTERNALITY IN IT. The flats market exists to show a tool used where nothing is failing in
 * the 1.3.5 sense; if it ever gains one, three subsections stop being true. */
if (Object.prototype.hasOwnProperty.call(F, 'externalCost') || Object.prototype.hasOwnProperty.call(F, 'externalBenefit')) problems.push('the flats market has gained an externality, and chapter 4 and chapter 7 both say it has none');

/* AND THE GENERAL CLAIM, DERIVED RATHER THAN ASSERTED (packet 24's lesson). Chapter 1 says a missed
 * COST always means too much and a missed BENEFIT always means too little, without qualification. */
{
  const failures = [];
  for (const slope of [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 20, 100]) {
    const demand = { at0: 120, perUnit: -slope };
    const mpc = { at0: 30, perUnit: 0.5 };
    const msc = { at0: 30 + C.externalCost, perUnit: 0.5 };
    if (!(meet(demand, mpc) > meet(demand, msc))) failures.push(`cost, demand slope ${slope}: market ${meet(demand, mpc)} not above optimum ${meet(demand, msc)}`);
    const msb = { at0: 120 + L.externalBenefit, perUnit: -slope };
    if (!(meet(msb, mpc) > meet(demand, mpc))) failures.push(`benefit, demand slope ${slope}: optimum ${meet(msb, mpc)} not above market ${meet(demand, mpc)}`);
    /* And the tax/cap identity, which is the section's best idea: it must hold for every slope, not
     * only for the one pair of lines this section happens to draw. */
    /* `meet` rounds the quantity to two places, so at a very steep demand curve the permit price
     * comes back a cent or two off. The claim being tested is the IDENTITY, not the rounding: a
     * tolerance of one cent keeps it a real test (a slope that broke the identity would be out by
     * dollars) without failing on the resolution of the quantity. */
    const opt = meet(demand, msc);
    const permit = valueAt(demand, opt) - valueAt(mpc, opt);
    if (Math.abs(permit - C.externalCost) > 0.5) failures.push(`tax=cap, demand slope ${slope}: permit ${round2(permit)} not ${C.externalCost}`);
  }
  if (failures.length) problems.push(`a claim the section states without qualification fails for some slopes: ${failures.join('; ')}`);
}

/* ── diagram geometry, re-derived from the emitted SVG ─────────────────────── */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · both directions of 1a, drawn
  const [loss, gain] = svgOf(DIAGRAMS[0]);
  has(loss, `welfare loss ${money(C.welfareLoss)}`, `the loss panel does not label the triangle ${money(C.welfareLoss)}`);
  has(loss, `>Qm ${qty(C.marketQ)}<`, 'the loss panel does not read off the market quantity');
  has(loss, `>Qopt ${qty(C.optimumQ)}<`, 'the loss panel does not read off the social optimum');
  has(gain, `welfare gain ${money(L.welfareGain)}`, `the gain panel does not label the triangle ${money(L.welfareGain)}`);
  has(gain, `>Qopt ${qty(L.optimumQ)}<`, 'the gain panel does not read off the social optimum');
  has(gain, '>MSB</text>', 'the gain panel does not draw MSB, so the missed benefit is invisible');
  for (const svg of [loss, gain]) {
    has(svg, 'Costs, Benefits', 'a marginal panel labels its vertical axis something other than "Costs, Benefits"');
    has(svg, '<polygon', 'a marginal panel shades no area, and a welfare loss or gain is an AREA');
  }
  for (const curve of ['MPC', 'MSC']) has(loss, `>${curve}</text>`, `the loss panel does not label the ${curve} curve`);
}
{ // 2 · the tax: Pc, Pp, the revenue rectangle; and both forms DRAWN (specGap-03)
  const [tax, shapes] = svgOf(DIAGRAMS[1]);
  has(tax, `Pc ${money(C.buyerP)}`, `the tax panel does not label Pc as ${money(C.buyerP)}`);
  has(tax, `Pp ${money(C.sellerP)}`, `the tax panel does not label Pp as ${money(C.sellerP)}`);
  has(tax, `revenue ${money(C.revenue)}`, `the tax panel does not label the revenue rectangle ${money(C.revenue)}`);
  has(tax, `>Q ${qty(C.taxedQ)}<`, 'the tax panel does not read off the quantity after the tax');
  has(tax, '<polygon', 'the tax panel shades no revenue rectangle');
  has(shapes, '>specific</text>', 'the second panel does not label the specific tax (specGap-03)');
  has(shapes, '>ad valorem</text>', 'the second panel does not label the ad valorem tax (specGap-03)');
  has(shapes, money(C.adValoremGapAt0), 'the second panel does not measure the ad valorem gap at the foot of the curve');
  has(shapes, money(C.adValoremGapAt90), 'the second panel does not measure the ad valorem gap at the top of the curve');
  /* A PIVOT IS A DIFFERENT SLOPE, NOT A DIFFERENT INTERCEPT, and that is the whole of specGap-03.
   * Re-derived rather than trusted to the label: if the ad valorem line were ever drawn parallel,
   * the picture would say the opposite of the caption and nothing else would notice. */
  if (C.adValoremSupply.perUnit === C.mpc.perUnit) problems.push('the ad valorem curve has the same slope as MPC, so it is drawn as a parallel shift and the panel contradicts itself');
  if (C.taxedSupply.perUnit !== C.mpc.perUnit) problems.push('the specific-tax curve is not parallel to MPC');
  if (!(C.adValoremGapAt90 > C.adValoremGapAt0)) problems.push('the ad valorem gap does not widen as the price rises');
}
{ // 3 · the subsidy
  const [sub] = svgOf(DIAGRAMS[2]);
  has(sub, `Pc ${money(L.buyerP)}`, `the subsidy panel does not label the price buyers pay as ${money(L.buyerP)}`);
  has(sub, `Pp ${money(L.providerP)}`, `the subsidy panel does not label the price providers receive as ${money(L.providerP)}`);
  has(sub, `cost ${money(L.cost)}`, `the subsidy panel does not label the cost rectangle ${money(L.cost)}`);
  has(sub, '>MSB</text>', 'the subsidy panel does not draw MSB, so the external benefit is invisible');
  has(sub, '<polygon', 'the subsidy panel shades no cost rectangle');
}
{ // 4 · the two controls, in two markets
  const [max, min] = svgOf(DIAGRAMS[3]);
  has(max, `max ${money(F.maxPrice)}`, 'the maximum-price panel does not label the control');
  has(max, `excess demand ${qty(F.excessDemand)}`, `the maximum-price panel does not measure excess demand as ${qty(F.excessDemand)}`);
  has(max, `>${qty(F.demanded)}<`, 'the maximum-price panel does not read off the quantity demanded at the cap');
  has(max, `>${qty(F.supplied)}<`, 'the maximum-price panel does not read off the quantity supplied at the cap');
  has(min, `min ${money(C.minPrice)}`, 'the minimum-price panel does not label the control');
  has(min, `excess supply ${qty(C.minExcessSupply)}`, `the minimum-price panel does not measure excess supply as ${qty(C.minExcessSupply)}`);
  has(min, `>${qty(C.minSupplied)}<`, 'the minimum-price panel does not read off the quantity supplied at the floor');
}
{ // 5 · the cap and the permit price
  const [cap] = svgOf(DIAGRAMS[4]);
  has(cap, `cap ${qty(C.capQ)}`, 'the permit panel does not label the cap');
  has(cap, `permit ${money(C.permitPrice)}`, `the permit panel does not measure the permit as ${money(C.permitPrice)}`);
  has(cap, `>${money(C.capBuyerP)}</text>`, 'the permit panel does not read off what buyers pay at the cap');
  has(cap, `>${money(C.capCostP)}</text>`, 'the permit panel does not read off what the last tonne costs at the cap');
}
{ // 6 · information moving demand
  const [info] = svgOf(DIAGRAMS[5]);
  has(info, '>D = MPB</text>', 'the information panel does not label demand before the campaign');
  has(info, '>D after = MSB</text>', 'the information panel does not draw demand AFTER the campaign, which is the whole mechanism');
  has(info, `>${qty(meet(L.msb, L.mpc))}<`, 'the information panel does not read off the quantity the campaign reaches');
}
{ // 7 · the eight contexts and the tool choice — the section's one table diagram
  const [contexts, choice] = svgOf(DIAGRAMS[6]);
  if (DIAGRAMS[6].kind !== 'table') problems.push('the contexts diagram is two lookup tables and does not declare kind: "table"');
  for (const [name] of CONTEXTS) has(contexts, `>${name}</text>`, `the contexts table has no row for ${name} — 1c lists exactly eight`);
  if (CONTEXTS.length !== 8) problems.push(`the contexts table has ${CONTEXTS.length} rows; 1c has eight bullets`);
  for (const [name] of TOOL_CHOICE) has(choice, `>${name}</text>`, `the tool-choice table has no row for ${name} (specGap-05)`);
  if (TOOL_CHOICE.length !== 8) problems.push(`the tool-choice table has ${TOOL_CHOICE.length} rows; it must carry all eight methods`);
  has(choice, 'Government must know', 'the tool-choice table has lost the column specGap-05 is actually about');
}
{ // 8 · the overshoot
  const [over] = svgOf(DIAGRAMS[7]);
  has(over, `net welfare loss ${money(C.wrongLoss)}`, `the overshoot panel does not measure the loss as ${money(C.wrongLoss)}`);
  has(over, `>Q ${qty(C.wrongQ)}<`, 'the overshoot panel does not read off the quantity the wrong tax produces');
  has(over, `>Qopt ${qty(C.optimumQ)}<`, 'the overshoot panel does not read off the social optimum it undershoots');
  has(over, '<polygon', 'the overshoot panel shades no area');
}
/*
 * ONE DIAGRAM, ONE KIND. A diagram that pairs a drawing with a lookup table gets a "what a correct
 * diagram shows" checklist printed over the table, and the table gets the graph width cap — which is
 * what `diagram.table-kind` fires on, and it fired on four of these on the first build. The lists it
 * was catching (the eight methods, the five causes, where a subsidy ends up, what each non-price
 * tool assigns) are LISTS, and a list belongs in the teaching text, where each of them already was.
 * The two that earn a table of their own — 1c's eight contexts and the tool comparison specGap-05
 * asks for — are diagram 7, which declares the kind.
 */
for (const d of DIAGRAMS) {
  /* `<defs>` carries the axis arrowhead as a <polygon> in EVERY svg this file emits, including the
   * tables, so the detector reads the body only and looks for the arrow's USE rather than its
   * definition: a table has no axes. */
  const drawn = svgOf(d).some((svg) => /marker-end/.test(svg.replace(/<defs[\s\S]*?<\/defs>/g, '')));
  if (d.kind === 'table' && drawn) problems.push(`"${d.title}" declares kind "table" and contains a drawn view`);
  if (d.kind !== 'table' && !drawn) problems.push(`"${d.title}" has no drawn view and does not declare kind "table"`);
}
/*
 * AND THE TWO SPECIFICATION LISTS ARE ASSERTED AGAINST THE TEACHING TEXT rather than against a
 * table, which is the stronger check: a list a student must learn has to be somewhere they read it,
 * not only somewhere they can look it up.
 */
{
  const teaching = allStrings(bundle.content).join(' ').toLowerCase();
  for (const [name] of METHODS) if (!teaching.includes(name.toLowerCase())) problems.push(`method "${name}" is not named anywhere in the teaching text — 1b lists exactly eight`);
  for (const [name] of CAUSES) if (!teaching.includes(name.toLowerCase())) problems.push(`cause "${name}" is not named anywhere in the teaching text — 2b lists exactly five`);
  if (METHODS.length !== 8) problems.push(`METHODS has ${METHODS.length} entries; 1b has eight bullets`);
  if (CAUSES.length !== 5) problems.push(`CAUSES has ${CAUSES.length} entries; 2b has five bullets`);
  if (CAUSES.some(([n]) => /capture|short|signal/i.test(n))) problems.push('CAUSES carries a cause that is not one of 2b\'s five');
}

/* EVERY PLOTTED POINT INSIDE ITS CANVAS (packet 23's check). */
for (const d of DIAGRAMS) for (const [i, svg] of svgOf(d).entries()) {
  const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) { problems.push(`${d.title} scenario ${i + 1} has no viewBox`); continue; }
  const [, , vw, vh] = vb.trim().split(/[\s,]+/).map(Number);
  const outside = [];
  for (const m of svg.matchAll(/<(?:line|circle|text|rect|polygon)\b[^>]*>/g)) {
    for (const attr of ['x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy']) {
      const v = (m[0].match(new RegExp(`\\b${attr}="(-?[\\d.]+)"`)) || [])[1];
      if (v == null) continue;
      const n = Number(v);
      const limit = /x/.test(attr) ? vw : vh;
      if (n < -2 || n > limit + 2) outside.push(`${attr}=${n} (frame ${limit})`);
    }
    const pts = (m[0].match(/points="([^"]+)"/) || [])[1];
    if (pts) for (const p of pts.split(' ')) {
      const [x, y] = p.split(',').map(Number);
      if (x < -2 || x > vw + 2) outside.push(`polygon x=${x} (frame ${vw})`);
      if (y < -2 || y > vh + 2) outside.push(`polygon y=${y} (frame ${vh})`);
    }
  }
  if (outside.length) problems.push(`${d.title} scenario ${i + 1} draws outside its canvas: ${[...new Set(outside)].slice(0, 4).join(', ')}`);
}

/* AND THE SAME CHECK FOR THE TEXT'S WIDTH, which is the part the anchor check could not see
 * (packet 25: Verify B found "welfare loss $50 a d" on the phone, anchor comfortably inside). */
for (const d of DIAGRAMS) for (const [i, svg] of svgOf(d).entries()) {
  const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) continue;
  const [, , vw] = vb.trim().split(/[\s,]+/).map(Number);
  for (const m of svg.matchAll(/<text\b[^>]*>([^<]*)</g)) {
    const tag = m[0], text = m[1];
    const x = Number((tag.match(/\bx="(-?[\d.]+)"/) || [])[1]);
    const size = Number((tag.match(/\bfont-size="([\d.]+)"/) || [])[1] || 10);
    const anchor = (tag.match(/\btext-anchor="(\w+)"/) || [])[1] || 'start';
    if (!Number.isFinite(x)) continue;
    const w = estWidth(text, size);
    const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    if (left + w > vw + 1 || left < -1) problems.push(`${d.title} scenario ${i + 1}: "${text.slice(0, 40)}" runs from ${round2(left)} to ${round2(left + w)} in a ${vw}-unit frame`);
  }
}
{ // A/B, run every time (packet 21)
  const frame = 500;
  const probe = (text, x, size, anchor) => {
    const w = estWidth(text, size);
    const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    return left + w > frame + 1 || left < -1;
  };
  if (!probe('welfare loss $50 a day', 396.7, 11, 'start')) problems.push('the text-extent check no longer fires on the label Verify B found running off the frame');
  if (probe('welfare loss $50', 496, 11, 'end')) problems.push('the text-extent check fires on a label that measures inside the frame');
}

/* A TABLE'S CELLS MUST NOT COLLIDE. `estWidth` is imported from the diagrams module rather than
 * redefined, because the layout there uses the same bound to PLACE the columns. */
for (const d of DIAGRAMS) for (const [i, svg] of svgOf(d).entries()) {
  const rows = new Map();
  for (const m of svg.matchAll(/<text\b[^>]*\bx="([\d.-]+)"[^>]*\by="([\d.-]+)"[^>]*\bfont-size="([\d.]+)"[^>]*>([^<]*)</g)) {
    const [, x, y, size, text] = m;
    const left = Number(x);
    const row = Math.round(Number(y));
    (rows.get(row) || rows.set(row, []).get(row)).push({ left, right: left + estWidth(text, Number(size)), text });
  }
  for (const [row, cells] of rows) {
    cells.sort((a, b) => a.left - b.left);
    for (let k = 1; k < cells.length; k += 1) {
      if (cells[k].left < cells[k - 1].right - 0.5) problems.push(`${d.title} scenario ${i + 1}, row y=${row}: "${cells[k - 1].text}" and "${cells[k].text}" overlap`);
    }
  }
}

/* ── ids, and the figures agreeing across every surface ────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

/*
 * ACCEPTANCE CHECK 4, and it is a check rather than a wish this time. Every figure the spec block in
 * NEXT.md names must appear BOTH in the body and in notes, diagrams or assessment. Packet 25 named
 * $240 in its acceptance list, never asserted it, and Verify A found the figure used once — as a
 * wrong-answer distractor for a number the student had never been shown.
 */
const must = [
  money(C.marketP), money(C.optimumP), money(C.buyerP), money(C.sellerP), money(C.tax), money(C.externalCost),
  money(C.consumerIncidence), money(C.producerIncidence), money(C.revenue), money(C.welfareLoss),
  money(C.permitPrice), money(C.minPrice), money(C.wrongTax), money(C.wrongLoss),
  qty(C.marketQ), qty(C.optimumQ), qty(C.minSupplied), qty(C.minExcessSupply), qty(C.wrongQ),
  money(L.marketP), money(L.optimumP), money(L.buyerP), money(L.providerP), money(L.subsidy),
  money(L.consumerGain), money(L.producerGain), money(L.cost), money(L.welfareGain),
  qty(L.marketQ), qty(L.subsidisedQ),
  money(F.marketP), money(F.maxPrice), money(F.saving), qty(F.marketQ), qty(F.demanded), qty(F.supplied), qty(F.excessDemand),
];
for (const m of [...new Set(must)]) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
/* ONE MINUS SIGN (packet 18 shipped 55 of one beside 13 of the other). */
{
  const hyphenNumbers = prose.flatMap((s) => s.match(/(?<![\w-])-\s?[\d$]/g) || []);
  if (hyphenNumbers.length) problems.push(`${hyphenNumbers.length} negative figure(s) using an ASCII hyphen instead of U+2212: ${[...new Set(hyphenNumbers)].slice(0, 6).join(', ')}`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 26 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + (d.scenarios?.length || 1), 0)} views) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((x) => { pos[x.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('\nthe three markets:');
console.log(`  ${C.name.padEnd(14)} D 120 − Q · MPC 30 + 0.5Q · external cost ${money(C.externalCost)} → MSC 45 + 0.5Q`);
console.log(`                 market ${qty(C.marketQ)} at ${money(C.marketP)} · optimum ${qty(C.optimumQ)} at ${money(C.optimumP)} · welfare loss ${money(C.welfareLoss)}`);
console.log(`                 tax ${money(C.tax)} → Q ${qty(C.taxedQ)}, Pc ${money(C.buyerP)}, Pp ${money(C.sellerP)}, incidence ${money(C.consumerIncidence)}/${money(C.producerIncidence)}, revenue ${money(C.revenue)}`);
console.log(`                 cap ${qty(C.capQ)} → Pc ${money(C.capBuyerP)}, permit ${money(C.permitPrice)}  ·  floor ${money(C.minPrice)} → ${qty(C.minDemanded)} wanted, ${qty(C.minSupplied)} offered, excess supply ${qty(C.minExcessSupply)}`);
console.log(`                 overshoot: tax ${money(C.wrongTax)} → Q ${qty(C.wrongQ)}, loss ${money(C.wrongLoss)} (free market ${money(C.welfareLoss)})`);
console.log(`  ${L.name.padEnd(14)} MPB 90 − Q · MPC = MSC 15 + 0.5Q · external benefit ${money(L.externalBenefit)} → MSB 102 − Q`);
console.log(`                 market ${qty(L.marketQ)} at ${money(L.marketP)} · optimum ${qty(L.optimumQ)} at ${money(L.optimumP)} · welfare gain ${money(L.welfareGain)}`);
console.log(`                 subsidy ${money(L.subsidy)} → Q ${qty(L.subsidisedQ)}, buyers ${money(L.buyerP)}, providers ${money(L.providerP)}, cost ${money(L.cost)}`);
console.log(`  ${F.name.padEnd(14)} D 900 − 2Q · S 100 + 2Q · market ${qty(F.marketQ)} at ${money(F.marketP)}`);
console.log(`                 maximum ${money(F.maxPrice)} → ${qty(F.demanded)} wanted, ${qty(F.supplied)} offered, excess demand ${qty(F.excessDemand)}, ${qty(F.pricedOut)} priced out`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(40)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const x of PRACTICE) console.log(`  ${x.command.padEnd(10)} ${String(x.marks).padStart(2)}  ${x.question.slice(0, 74)}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const x of problems) console.log(`  - ${x}`); }
else console.log('\npacket checks: one currency · no price ceiling/floor, price signals, regulatory capture, short-termism, buffer stock, nudge, merit/demerit goods, deadweight, allocative, monopoly, privatisation, minimum wage, quota, black market, shortage or surplus · no Assess, Outline or 10-mark · the 20-mark Evaluate asserted against the census · no UK framing or dated claim · no uncited examiner, marker, frequency or paper claim · every practice tariff in the ECONOMICS census, all eight command words, every guidance two paragraphs with a clean opening · both Appendix 6 gloss checks · all 23 leaves claimed by exactly one block, checked against contextFor · every block pinned to a quiz, a practice item and a diagram, each on its own topic, none the pre-test\'s · three markets recomputed from their own lines · tax = cap = permit price, and the floor comparison, derived across nine demand slopes · every diagram figure re-derived from the emitted SVG · nothing outside its canvas, no text running off a frame, no table collisions · ids unique · one minus sign');

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

if (DUMP) { const path = `audit/snapshots/packet-26-bundle__economics__${SECTION}.json`; writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-26-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${path}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
