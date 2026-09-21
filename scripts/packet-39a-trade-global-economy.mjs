/**
 * PACKET 39a — trade-global-economy, Economics 4.3.2 sub-topics 1-3.
 *
 *   node scripts/packet-39a-trade-global-economy.mjs            check only, writes nothing
 *   node scripts/packet-39a-trade-global-economy.mjs --dump     also writes the bundle snapshot
 *   node scripts/packet-39a-trade-global-economy.mjs --stage    also stages the draft
 *
 * Descended from `scripts/packet-34-causes-effects-globalisation.mjs`, which the packet-34 handoff
 * names as the Economics starting point. What is different here, and why:
 *
 *   - **A HALF-PACKET ASSEMBLES A WHOLE BUNDLE.** Sub-topics 4 and 5 are packet 39b's, so the live
 *     "Protectionism and the WTO" block and the items that serve it are carried forward BY ID and
 *     asserted deep-equal to what is live. A rebuild that quietly dropped them would leave the
 *     staged draft thinner than the section students read today, and nothing else in the gate
 *     compares the two.
 *   - **THE CARRIED BLOCK IS WIRED EVEN THOUGH IT IS NOT REWRITTEN.** `LearnModeTab.jsx:255`
 *     decides `hasRefs` for the WHOLE section, so the moment this packet pins its four blocks, any
 *     block left unpinned falls to the title fallback for its diagram, to `fallbackItemForBlock`
 *     for its quiz, and to **nothing at all** for its practice. Layer 8 runs the app's own
 *     resolvers over the assembled deck and asserts what each check-in SHOWS.
 *   - **`normalize()` IS A/B'd, NOT EDITED.** `topFix-02` and `structure-04` both ask for a
 *     stopword filter in `components/learn-mode/utils.js`. Packet 2 already added it (`4d45478`),
 *     so layer 9 proves the behaviour from outside rather than claiming a change.
 *   - **BOUNDS ARE PARSED FROM THE FILE THAT OWNS THEM** (packet 2.6's lesson): the frame, the two
 *     faces and the width estimator are imported from `_packet39-diagrams.mjs`, so a runner holding
 *     its own copy of a number that moved cannot report green against a diagram that changed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { buildSteps } from '../lib/learn-steps.js';
import { resolvePinnedItem, resolvePinnedDiagram, fallbackItemForBlock, matchDiagramsToBlocks } from '../components/learn-mode/utils.js';
import {
  SECTION, LADDER_TERMS, OFF_SPEC_TERMS, teachingWords, pct,
  MERIDA, KALTO, KALTO_LATER, TRADE, SAROVA, CURRENCY, SHARES, ADVANTAGE_GONE,
  PATTERN_FACTORS, TOT_FACTORS, TOT_IMPACTS,
} from './_packet39-util.mjs';
import { buildContent, SUBSECTIONS, NOTES_NEW, B1, B2, B3, B4 } from './_packet39-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS_NEW, CARRIED, CARRIED_BLOCK } from './_packet39-assessment.mjs';
import { DIAGRAMS, FRAME, FACE, estWidth } from './_packet39-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

const problems = [];
const bad = (msg) => problems.push(msg);
const eq = (label, got, want) => { if (got !== want) bad(`${label}: got ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`); };

const NEW_BLOCKS = [B1, B2, B3, B4];
const ALL_BLOCKS = [...NEW_BLOCKS, CARRIED_BLOCK];

/* ══ 0 · the live bundle, and the shape assertion packet 37 paid for ══════ */

const live = await loadBundle(SECTION);
if (!Array.isArray(live?.content)) throw new Error('live.content is not an array — loadBundle was not awaited, or the section is missing');
for (const key of ['quiz', 'practice', 'flashcards', 'diagrams', 'mistakes', 'notes']) {
  if (!Array.isArray(live[key])) throw new Error(`live.${key} is not an array`);
}

const byId = (arr) => new Map(arr.map((x) => [x.id, x]));
const pick = (arr, ids, what) => {
  const m = byId(arr);
  return ids.map((id) => {
    const found = m.get(id);
    if (!found) bad(`carried ${what} ${id} is not in the live section`);
    return found;
  }).filter(Boolean);
};

const carriedQuiz = pick(live.quiz, CARRIED.quiz, 'quiz item');
const carriedPractice = pick(live.practice, CARRIED.practice, 'practice item');
const carriedDiagrams = pick(live.diagrams, CARRIED.diagrams, 'diagram');
const carriedMistakes = pick(live.mistakes, CARRIED.mistakes, 'misconception');
const carriedCards = pick(live.flashcards, CARRIED.flashcards, 'flashcard');
const carriedNotes = CARRIED.notes.map((title) => {
  const found = live.notes.find((n) => n.title === title);
  if (!found) bad(`carried notes topic "${title}" is not in the live section`);
  return found;
}).filter(Boolean);
const carriedContentBlock = live.content.find((c) => c.title === CARRIED_BLOCK);
if (!carriedContentBlock) bad(`the carried block "${CARRIED_BLOCK}" is not in the live section`);

/* Every live item is either carried, rebuilt, or listed as removed WITH A REASON. */
const liveIds = [...live.quiz, ...live.practice, ...live.diagrams, ...live.mistakes, ...live.flashcards].map((x) => x.id);
const keptIds = new Set([...CARRIED.quiz, ...CARRIED.practice, ...CARRIED.diagrams, ...CARRIED.mistakes, ...CARRIED.flashcards]);
const rebuiltInPlace = new Set(CARRIED.rebuiltInPlace || []);
for (const id of liveIds) {
  if (keptIds.has(id) || CARRIED.removed[id] || rebuiltInPlace.has(id)) continue;
  bad(`live item ${id} is neither carried, rebuilt in place, nor listed in CARRIED.removed — a silent drop`);
}

/* ══ 1 · assemble ════════════════════════════════════════════════════════ */

/*
 * A CARRIED EXTRAS ENTRY IS DROPPED ONLY FOR THE OFF-SPEC VOCABULARY, NOT FOR THE LADDER — and
 * that is the second reversal this runner forced. The first pass dropped every extras entry
 * mentioning a bloc, and `spec.uncovered` then fired on ECON-4.3.2-4c-6, because `spec.uncovered`
 * reads content, notes and extras and nothing else (`lib/content-validator.mjs:868`): the live
 * extras were the only thing covering that leaf, and no diagram or flashcard can cover it.
 *
 * The distinction that survives scrutiny: this section OWNS the ladder — 4.3.2 · 4 is its own
 * sub-topic 4 — so ladder material in the Extras tab is not off-spec here the way it was in
 * packets 33 and 34. What this packet must not do is AUTHOR that material before the block that
 * teaches it exists, which is what the scoped ban in layer 2 enforces. Prebisch-Singer belongs to
 * no specification at all, so the one live chain naming it goes.
 */
function outOfScope(text) {
  return OFF_SPEC_TERMS.some((t) => new RegExp(`\\b${t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i').test(text));
}

/* Indices are DERIVED from each item's block tag, never written down (packet 33's rule). */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const quiz = [...QUIZ.map(({ block, ...rest }) => rest), ...carriedQuiz];
const practice = [...PRACTICE.map(({ block, ...rest }) => rest), ...carriedPractice];

/*
 * `skip` is the UNPINNED set, and it belongs to the quiz alone. Passing the quiz's set to the
 * practice pass dropped practice items 0-2 — including both of block 3's — and the block then had
 * no practiceIndices at all. Layer 8 caught it because it asks what a check-in SHOWS rather than
 * whether the field was written.
 */
const indicesFor = (tagged, carriedForBlock, skip = new Set()) => {
  const map = Object.fromEntries(ALL_BLOCKS.map((b) => [b, []]));
  tagged.forEach((it, i) => { if (it.block && !skip.has(i)) map[it.block].push(i); });
  carriedForBlock.forEach((_, i) => map[CARRIED_BLOCK].push(tagged.length + i));
  return map;
};
const quizIndices = indicesFor(QUIZ, carriedQuiz, unpinned);
const practiceIndices = indicesFor(PRACTICE, carriedPractice);

const diagrams = [...DIAGRAMS, ...carriedDiagrams];
const diagramIds = {
  [B1]: DIAGRAMS[0].id, [B2]: DIAGRAMS[1].id, [B3]: DIAGRAMS[2].id, [B4]: DIAGRAMS[3].id,
  [CARRIED_BLOCK]: carriedDiagrams[0]?.id,
};

const newContent = buildContent({ diagramIds, quizIndices, practiceIndices });
const wiredCarriedBlock = carriedContentBlock && {
  ...carriedContentBlock,
  diagramId: diagramIds[CARRIED_BLOCK],
  quizIndices: quizIndices[CARRIED_BLOCK],
  practiceIndices: practiceIndices[CARRIED_BLOCK],
};
const content = [...newContent, ...(wiredCarriedBlock ? [wiredCarriedBlock] : [])];

const bundle = {
  content,
  notes: [...NOTES_NEW, ...carriedNotes],
  quiz,
  practice,
  flashcards: [...FLASHCARDS, ...carriedCards],
  diagrams,
  mistakes: [...MISTAKES, ...carriedMistakes],
  extras: {
    chains: [...EXTRAS_NEW.chains, ...(live.extras?.chains || []).filter((c) => !outOfScope(JSON.stringify(c)))],
    evaluation: [...EXTRAS_NEW.evaluation, ...(live.extras?.evaluation || []).filter((e) => !outOfScope(JSON.stringify(e)))],
  },
};

/* ══ 2 · every string, and the two vocabularies ══════════════════════════ */

const allStrings = (v, out = []) => {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out));
  return out;
};
const IDLIKE = new RegExp(`^${SECTION}:`);
const readableOf = (node) => {
  const texts = allStrings(node).filter((s) => !IDLIKE.test(s));
  const svgText = texts.filter((s) => s.startsWith('<svg')).map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
  return [...texts.filter((s) => !s.startsWith('<svg')), ...svgText];
};

/** Everything THIS packet authored — the carried block and its items are not this packet's prose. */
const authored = readableOf({ content: newContent, notes: NOTES_NEW, QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS_NEW, DIAGRAMS });
const everything = readableOf(bundle);

const countIn = (corpus, re) => corpus.reduce((n, s) => n + (s.match(re) || []).length, 0);
const banIn = (corpus, re, why) => { const n = countIn(corpus, re); if (n) bad(`${why} ×${n}`); };

banIn(everything, /\bundefined\b|\bNaN\b|\[object Object\]|\$\{/g, 'failed substitution');
banIn(authored, /\bthe live section\b|\bthe previous version\b|\bthis packet\b|\bpreviously (?:taught|said|omitted)\b/gi, 'self-reference');
banIn(authored, /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b/g, 'ledger id in student-facing prose');

/* The ladder belongs to 39b, and only this packet's own prose is held to that. */
for (const term of LADDER_TERMS) {
  const n = countIn(authored, new RegExp(`\\b${term.replace(/-/g, '[- ]')}\\b`, 'gi'));
  if (n) bad(`ladder term "${term}" ×${n} in content this packet authored — 4.3.2 · 4 is packet 39b`);
}
/* These are banned across the WHOLE bundle, asserted rather than trusted to the removal. */
for (const term of OFF_SPEC_TERMS) {
  if (term === 'current account' || term === 'terms-of-trade index') continue; // scoped below
  const n = countIn(everything, new RegExp(`\\b${term.replace(/-/g, '[- ]')}\\b`, 'gi'));
  if (n) bad(`off-spec term "${term}" ×${n} survives in the staged bundle`);
}
/* `current account` is 4.3.3's; 3c-3 is the BALANCE OF TRADE and this section says so. */
{
  const n = countIn(authored, /\bcurrent account\b/gi);
  if (n) bad(`"current account" ×${n} — 3c-3 is the balance of trade, and the current account is 4.3.3`);
}

/* ══ 3 · practice tariffs, from the census ═══════════════════════════════ */

const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
const allowed = new Map();
for (const r of census) allowed.set(r.command, new Set(r.marks));
for (const item of PRACTICE) {
  const marks = allowed.get(item.command);
  if (!marks) bad(`practice "${item.command}" is not an IAL Economics command word`);
  else if (!marks.has(item.marks)) bad(`practice ${item.command} ${item.marks} marks — the census allows ${[...marks].join(' or ')}`);
  const stated = /\((\d+) marks?\)/.exec(item.question);
  if (!stated) bad(`practice item does not state its marks: ${item.question.slice(0, 50)}`);
  else if (Number(stated[1]) !== item.marks) bad(`practice item says ${stated[1]} marks and carries ${item.marks}`);
}
banIn(readableOf(PRACTICE), /\b(Outline|Assess)\b/g, 'a command word IAL Economics does not have');

/*
 * A FALSE APPENDIX 6 CITATION, WHICH THIS PACKET COMMITTED AND VERIFY A CAUGHT. Two `examMatters`
 * lines said "Appendix 6 defines Assess and Evaluate…". Appendix 6 for Economics
 * (`econ_spec.txt:2696-2747`) lists EIGHT command words and Assess is not among them — it is
 * Business-only. This is the FIFTH instance in the programme (21, 23, 35, 36/30, here), and the
 * previous four were all caught by a reader rather than by a rule, so here is the rule: any command
 * word named in the same sentence as "Appendix 6" must be in this subject's census.
 */
{
  const commands = new Set(census.map((r) => r.command));
  const CAPWORD = /\b([A-Z][a-z]{3,})\b/g;
  const KNOWN_NOUNS = new Set(['Appendix', 'Requires', 'Economics', 'Business', 'Level', 'Command', 'Students', 'International', 'Advanced']);
  for (const text of authored) {
    for (const sentence of String(text).split(/(?<=[.!?])\s+/)) {
      if (!/Appendix 6/.test(sentence)) continue;
      for (const [, word] of sentence.matchAll(CAPWORD)) {
        if (KNOWN_NOUNS.has(word) || commands.has(word)) continue;
        if (/^(The|This|That|An|And|But|Here|When|Where|Which|What|Note|Show|Both|Each|Every|Only|Same|Give|Your|Marks|Method|Exam|Paper|Unit)$/.test(word)) continue;
        bad(`"${word}" is cited beside Appendix 6 and is not an IAL Economics command word — "${sentence.slice(0, 80)}…"`);
      }
    }
  }
  /* A/B: the check must fire on a citation it is shown. */
  const probe = 'Appendix 6 defines Assess as requiring a judgement.';
  const before = problems.length;
  for (const [, word] of probe.matchAll(CAPWORD)) if (!KNOWN_NOUNS.has(word) && !commands.has(word) && word === 'Assess') bad('__probe__');
  if (problems.length === before) bad('the Appendix 6 citation check does not fire on a deliberate false citation');
  else problems.splice(problems.indexOf('__probe__'), 1);
}

/* ══ 4 · the quiz bank ═══════════════════════════════════════════════════ */

/*
 * STRUCTURE IS CHECKED ON THE WHOLE BANK, STYLE ONLY ON WHAT THIS PACKET WROTE. Two carried
 * explanations refer to an option by position; they belong to the block this packet does not
 * rewrite, and 39b owns them. Holding a carried item to this packet's style would either force a
 * rewrite this packet has not verified or produce a failure it cannot honestly fix.
 */
const BY_POSITION = /\bthe (first|second|third|fourth|last|other) (option|answer|choice)\b|\boption (?:A|B|C|D)\b/i;
for (const item of quiz) {
  if (!Array.isArray(item.options) || item.options.length !== 4) bad(`quiz item has ${item.options?.length} options: ${item.question.slice(0, 45)}`);
  if (!(item.correctIndex >= 0 && item.correctIndex < 4)) bad(`quiz correctIndex out of range: ${item.question.slice(0, 45)}`);
  if (new Set(item.options.map((o) => String(o).toLowerCase())).size !== item.options.length) bad(`quiz item repeats an option: ${item.question.slice(0, 45)}`);
}
for (const item of QUIZ) {
  if (BY_POSITION.test(item.explanation || '')) bad(`quiz explanation refers to an option by position: ${item.question.slice(0, 45)}`);
}
{
  /* The answer-position histogram, which is a bank-level property no per-item rule can see. */
  const counts = [0, 0, 0, 0];
  for (const it of quiz) counts[it.correctIndex] += 1;
  const worst = Math.max(...counts) / quiz.length;
  if (counts.some((c) => c === 0)) bad(`answer position histogram has an empty slot: ${counts.join(' / ')} over ${quiz.length} items`);
  if (worst > 0.4) bad(`answer position histogram is skewed: ${counts.join(' / ')} over ${quiz.length} items`);
}

/*
 * PACKET 21's BANK-LEVEL LENGTH GUARD, at 35%, A/B'd against a rigged bank so a guard that cannot
 * fire is caught here rather than in a verifier. Packet 33's first draft keyed the longest option
 * in 83% of items and every per-item rule passed it.
 */
const longestKeyRate = (items) => {
  const hits = items.filter((it) => {
    const lens = it.options.map((o) => String(o).length);
    const max = Math.max(...lens);
    return lens[it.correctIndex] === max && lens.filter((l) => l === max).length === 1;
  }).length;
  return hits / items.length;
};
const keyRate = longestKeyRate(quiz);
if (keyRate > 0.35) bad(`the key is the strictly longest option in ${pct(Math.round(1000 * keyRate) / 10)} of the bank — the guard is 35%`);
{
  const rigged = quiz.map((it) => ({ ...it, options: it.options.map((o, i) => (i === it.correctIndex ? `${o} and this is a longer option than any other here` : String(o).slice(0, 10))) }));
  if (longestKeyRate(rigged) <= 0.35) bad('the bank-level length guard does not fire on a rigged bank — it is not measuring what it claims');
}

/* ══ 5 · recalls ═════════════════════════════════════════════════════════ */

const recalls = SUBSECTIONS.map((s) => s.recall).filter(Boolean);
eq('every subsection carries a recall', recalls.length, SUBSECTIONS.length);
const types = recalls.reduce((m, r) => { m[r.type] = (m[r.type] || 0) + 1; return m; }, {});
for (const t of ['reorder', 'fillin', 'match', 'classify']) if (!types[t]) bad(`no ${t} recall in the section — the contract has four types`);

for (const s of SUBSECTIONS) {
  const r = s.recall;
  if (r.type === 'fillin') {
    const blanks = r.template.join(' ').split('___').length - 1;
    if (blanks !== r.answers.length) bad(`${s.title}: ${blanks} blanks against ${r.answers.length} answers`);
    if (new Set(r.answers.map((a) => String(a).toLowerCase())).size !== r.answers.length) bad(`${s.title}: duplicate fill-in answers`);
    for (const a of r.answers) if (String(a).includes(',')) bad(`${s.title}: a fill-in answer contains a comma`);
    for (const d of r.distractors || []) if (r.answers.some((a) => String(a).toLowerCase() === String(d).toLowerCase())) bad(`${s.title}: a distractor equals an answer`);
    for (const [i, h] of (r.hints || []).entries()) {
      const a = String(r.answers[i] ?? '').toLowerCase();
      if (a && String(h).toLowerCase().startsWith(a)) bad(`${s.title}: hint ${i} is a prefix of its answer`);
    }
  }
  if (r.type === 'reorder' && (r.correctOrder.length < 3 || r.correctOrder.length > 5)) bad(`${s.title}: reorder has ${r.correctOrder.length} items`);
  if (r.type === 'match' && (r.pairs.length < 3 || r.pairs.length > 5)) bad(`${s.title}: match has ${r.pairs.length} pairs`);
  if (r.type === 'classify') {
    const n = r.groups.reduce((a, g) => a + g.items.length, 0);
    if (n < 4 || n > 8) bad(`${s.title}: classify has ${n} items`);
  }
  const w = teachingWords(s);
  if (w > 350) bad(`${s.title}: ${w} teaching words, budget is 350`);
}

/*
 * EVERY REORDER IS SOURCED FROM AN EXTRAS CHAIN, never from a flow on its own step. Asserted, so a
 * later edit that moves a chain cannot leave a reorder answerable by scrolling up.
 */
for (const s of SUBSECTIONS) {
  const r = s.recall;
  if (r.type !== 'reorder') continue;
  const words = (t) => new Set(String(t).toLowerCase().match(/[a-z]{4,}/g) || []);
  const sourced = bundle.extras.chains.some((c) => {
    const steps = c.steps || [];
    if (steps.length < r.correctOrder.length) return false;
    return r.correctOrder.every((item, i) => {
      const a = words(item); const b = words(steps[i] ?? '');
      return [...a].filter((x) => b.has(x)).length >= 2;
    });
  });
  if (!sourced) bad(`${s.title}: the reorder is not taught in order by any extras chain`);
  if ((s.body || []).some((b) => b.type === 'flow')) bad(`${s.title}: a reorder sits under a flow on its own step`);
}

/* ══ 6 · the arithmetic, checked as a student would check it ═════════════ */

eq('partial specialisation leaves cloth unchanged', TRADE.gain.cloth, 0);
if (!(TRADE.gain.grain > 0)) bad('partial specialisation produced no gain in grain');
eq('the gain splits evenly', TRADE.meridaGains.grain, TRADE.kaltoGains.grain);
if (!(TRADE.rate > TRADE.rateLow && TRADE.rate < TRADE.rateHigh)) bad('the exchange rate is not strictly inside the mutually beneficial range');
if (!ADVANTAGE_GONE) bad(`${KALTO_LATER.name}'s later cost of cloth does not equal ${MERIDA.name}'s — the 2a-2 case does not hold`);
eq('shares sum to 100 then', SHARES.emergingThen + SHARES.advancedThen, 100);
eq('shares sum to 100 now', SHARES.emergingNow + SHARES.advancedNow, 100);

/*
 * THE PRINTED-RATIO GUARD (packet 34's layer 6). A ratio on the page must divide the quantities on
 * the page, not their unrounded sources. Every derived figure this section prints is re-derived
 * here from the figures the student can see.
 */
const nearly = (label, got, want, tol = 0.051) => { if (Math.abs(got - want) > tol) bad(`${label}: printed ${got}, the printed figures give ${want}`); };
nearly('terms of trade', SAROVA.totNow, Math.round((1000 * SAROVA.now.exportPrices) / SAROVA.now.importPrices) / 10);
nearly('export revenue index', SAROVA.revenueIndex, Math.round(SAROVA.now.exportPrices * (SAROVA.volumeIndex / 100) * 10) / 10);
nearly('exports now', SAROVA.exportsNow, Math.round(SAROVA.baseFlow * (SAROVA.revenueIndex / 100) * 10) / 10);
nearly('imports now', SAROVA.importsNow, Math.round(SAROVA.baseFlow * (SAROVA.now.importPrices / 100) * 10) / 10);
nearly('the trade balance', SAROVA.balance, Math.round((SAROVA.exportsNow - SAROVA.importsNow) * 10) / 10);
nearly('imports per unit of exports', SAROVA.importsPerExport, Math.round((100 * SAROVA.now.exportPrices) / SAROVA.now.importPrices) / 100);
nearly('ore value then', SHARES.oreValueThen, Math.round(SHARES.exportsThen * SHARES.oreThen) / 100);
nearly('ore value now', SHARES.oreValueNow, Math.round(SHARES.exportsNow * SHARES.oreNow) / 100);
nearly('the export price abroad after the fall', CURRENCY.exportAbroadAfter, Math.round(CURRENCY.homePrice * CURRENCY.after * 10) / 10);
nearly('the import price at home after the fall', CURRENCY.importAtHomeAfter, Math.round((CURRENCY.foreignPrice / CURRENCY.after) * 10) / 10);

/*
 * ONE SPINE, ONE COUNTRY — the check Verify A's finding 2 asks for.
 *
 * The first draft hung the trade-flows figures on Sarova, which already had a terms-of-trade story
 * with a $50.0bn balanced base and exports FALLING to $42.0bn. Sarova then had exports growing to
 * $60.0bn in one chapter and falling to $42.0bn in another, off the same base. Every figure divided;
 * the two stories still contradicted each other. No per-figure check can see that, because each one
 * is internally correct — so the rule is structural: a subsection may print the figures of ONE
 * spine, and a spine's country name may not appear beside another spine's quantities.
 */
{
  /*
   * THE TEST IS MONEY BESIDE A NAME, not integers anywhere. A first version compared every bare
   * number and flagged seven subsections, all false: 60 is Merida's cloth maximum AND Velora's
   * manufactures in $bn AND a percentage, and requiring integers to be globally unique across three
   * spines would distort the content to satisfy a checker. What actually went wrong was a MONEY
   * amount attached to a country that does not have it — "Take Sarova. Exports have grown from
   * $50.0bn to $60.0bn" beside "Sarova … exports are now $42.0bn". So: every $N.Nbn printed in a
   * sentence that names a spine country must be one of THAT country's own amounts.
   */
  const spines = [
    { name: SAROVA.name, amounts: [SAROVA.baseFlow, SAROVA.exportsNow, SAROVA.importsNow, Math.abs(SAROVA.balance)] },
    { name: SHARES.name, amounts: [SHARES.exportsThen, SHARES.exportsNow, SHARES.oreValueThen, SHARES.oreValueNow, SHARES.manufacturesValueThen, SHARES.manufacturesValueNow] },
  ].map((sp) => ({ ...sp, amounts: new Set(sp.amounts.map((n) => Number(n).toFixed(1))) }));

  const MONEY = /\$(\d+(?:\.\d)?)bn/g;
  const sentencesOf = (node) => readableOf(node).flatMap((t) => String(t).split(/(?<=[.!?])\s+/));
  const audit = (sentences, where) => {
    for (const sentence of sentences) {
      for (const sp of spines) {
        if (!new RegExp(`\\b${sp.name}\\b`).test(sentence)) continue;
        for (const [, amount] of sentence.matchAll(MONEY)) {
          const key = Number(amount).toFixed(1);
          if (!sp.amounts.has(key)) bad(`${where}: "$${amount}bn" is printed beside ${sp.name}, which has no such amount`);
        }
      }
      const named = spines.filter((sp) => new RegExp(`\\b${sp.name}\\b`).test(sentence));
      if (named.length > 1) bad(`${where}: one sentence names ${named.map((x) => x.name).join(' and ')}`);
    }
  };
  for (const sub of SUBSECTIONS) audit(sentencesOf(sub), sub.title);
  audit(sentencesOf({ NOTES_NEW, EXTRAS_NEW, QUIZ, PRACTICE, FLASHCARDS, MISTAKES }), 'assessment and notes');

  /* A/B: the exact defect Verify A found must be caught if it comes back. */
  const before = problems.length;
  audit([`Take ${SAROVA.name}. Exports have grown from $${SHARES.exportsThen.toFixed(1)}bn to $${SHARES.exportsNow.toFixed(1)}bn.`], '__probe__');
  if (problems.length === before) bad('the one-spine-one-country check does not catch a foreign amount beside a spine name');
  else problems.length = before;
}

/* ══ 7 · diagrams, measured on the emitted SVG ═══════════════════════════ */

const boxOf = (x, y, text, size, anchor) => {
  const w = estWidth(text, size);
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  return { x0, x1: x0 + w, y0: y - size * 0.8, y1: y + size * 0.25, text, size };
};
for (const d of DIAGRAMS) {
  const vb = (d.svg.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) { bad(`${d.title}: no viewBox`); continue; }
  const [, , w, h] = vb.trim().split(/[\s,]+/).map(Number);
  eq(`${d.title}: frame width`, w, FRAME.w);
  eq(`${d.title}: frame height`, h, FRAME.h);
  const boxes = [...d.svg.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" fill="[^"]*" font-size="([\d.]+)"[^>]*text-anchor="([a-z]+)">([^<]*)<\/text>/g)]
    .map((m) => boxOf(+m[1], +m[2], m[5], +m[3], m[4]));
  if (!boxes.length) bad(`${d.title}: no text parsed out of the SVG — the box measurement is not running`);
  for (const b of boxes) {
    if (b.size < FACE.small) bad(`${d.title}: a ${b.size}-unit face, below the ${FACE.small} floor — "${b.text}"`);
    if (b.x0 < 0 || b.x1 > w || b.y1 > h) bad(`${d.title}: "${b.text}" leaves the frame (${b.x0.toFixed(1)}-${b.x1.toFixed(1)} of ${w})`);
  }
  for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
    const a = boxes[i], b = boxes[j];
    if (a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1) bad(`${d.title}: "${a.text}" collides with "${b.text}"`);
  }
}
{
  /* A/B: the collision detector must fire on an overlap it is shown. */
  const a = boxOf(100, 100, 'overlapping', 15, 'start');
  const b = boxOf(105, 102, 'overlapping', 15, 'start');
  if (!(a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1)) bad('the diagram collision test does not detect a deliberate overlap');
}

/* ══ 8 · what the deck SHOWS, through the app's own resolvers ════════════ */

const steps = buildSteps(bundle.content);
const checkins = steps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin');
if (!steps.some((s) => s.diagramRef || s.quizIndices || s.practiceIndices || s.diagramId || s.quizIds || s.practiceIds)) {
  bad('no step carries a pin — the section would fall to the legacy distribution');
}

{
  const usedD = new Set(), usedQ = new Set(), usedP = new Set();
  const shown = { diagram: 0, quiz: 0, practice: 0 };
  for (const { s: step } of checkins) {
    const d = resolvePinnedDiagram(bundle.diagrams, { id: step.diagramId, ref: step.diagramRef }, usedD);
    const q = resolvePinnedItem(bundle.quiz, { ids: step.quizIds, indices: step.quizIndices }, usedQ)
      || fallbackItemForBlock(bundle.quiz, step.blockTitle, usedQ);
    const p = resolvePinnedItem(bundle.practice, { ids: step.practiceIds, indices: step.practiceIndices }, usedP);
    if (d) shown.diagram += 1; else bad(`a check-in shows nothing — ${step.blockTitle}: no diagram`);
    if (q) shown.quiz += 1; else bad(`a check-in shows nothing — ${step.blockTitle}: no quiz question`);
    if (p) shown.practice += 1; else bad(`a check-in shows nothing — ${step.blockTitle}: no practice item`);
  }
  eq('every chapter resolves a diagram', shown.diagram, checkins.length);
  eq('every chapter resolves a quiz question', shown.quiz, checkins.length);
  eq('every chapter resolves a practice item', shown.practice, checkins.length);
}

/* The pins are on every block, including the one this packet did not rewrite. */
for (const block of bundle.content) {
  if (!block.diagramId) bad(`block "${block.title}" has no diagramId`);
  if (!block.quizIndices?.length) bad(`block "${block.title}" has no quizIndices`);
  if (!block.practiceIndices?.length) bad(`block "${block.title}" has no practiceIndices`);
  for (const i of block.quizIndices || []) {
    const tagged = QUIZ[i];
    if (tagged && tagged.block && tagged.block !== block.title) bad(`quizIndices on "${block.title}" points at an item tagged "${tagged.block}"`);
    if (i >= QUIZ.length && block.title !== CARRIED_BLOCK) bad(`"${block.title}" pins a carried quiz item`);
  }
}
if (unpinned.size < 3) bad(`${unpinned.size} unpinned quiz items — the pre-test draws three`);
for (const i of unpinned) {
  if (bundle.content.some((b) => (b.quizIndices || []).includes(i))) bad(`quiz item ${i} is both unpinned and pinned`);
}

/* ══ 9 · the stopword filter, A/B'd rather than claimed ══════════════════ */

{
  const spurious = matchDiagramsToBlocks(
    [{ title: 'The Effect of a Tariff (Welfare Analysis)' }, { title: 'The Effect of a Quota (Welfare Analysis)' }],
    [{ title: 'The Case for Free Trade' }],
  );
  if (Object.keys(spurious).length) bad('normalize() still matches a diagram to a block on a stopword — structure-04 is NOT fixed');
  const genuine = matchDiagramsToBlocks([{ title: 'Comparative Advantage: Numerical Example' }], [{ title: B1 }]);
  if (!Object.keys(genuine).length) bad('normalize() no longer matches a genuine title word — the filter is too aggressive');
}

/* ══ 10 · the nineteen leaves, taught in content[] and not only assessed ══ */

const contentProse = readableOf({ content: newContent }).join(' ').toLowerCase();
const LEAF_MAP = {
  'ECON-4.3.2-1a': ['benefit', 'cost', 'specialis'],
  'ECON-4.3.2-1b-1': ['absolute advantage', 'comparative advantage'],
  'ECON-4.3.2-1b-2': ['assumption'],
  'ECON-4.3.2-1b-3': ['limitation'],
  'ECON-4.3.2-2a-1': ['emerging econom'],
  'ECON-4.3.2-2a-2': ['comparative advantage'],
  'ECON-4.3.2-2a-3': ['trading bloc', 'bilateral'],
  'ECON-4.3.2-2a-4': ['exchange rate'],
  'ECON-4.3.2-2a-5': ['protectionism'],
  'ECON-4.3.2-2b': ['trade flow'],
  'ECON-4.3.2-3a': ['export price index', 'import price index'],
  'ECON-4.3.2-3b-1': ['inflation'],
  'ECON-4.3.2-3b-2': ['productivity'],
  'ECON-4.3.2-3b-3': ['labour cost'],
  'ECON-4.3.2-3b-4': ['exchange rate'],
  'ECON-4.3.2-3b-5': ['prices of imports', 'world price'],
  'ECON-4.3.2-3c-1': ['export revenue'],
  'ECON-4.3.2-3c-2': ['living standard'],
  'ECON-4.3.2-3c-3': ['balance of trade'],
};
const leafIds = Object.keys(LEAF_MAP);
eq('leaves claimed', leafIds.length, 19);
for (const [leaf, needles] of Object.entries(LEAF_MAP)) {
  if (!needles.some((n) => contentProse.includes(n))) bad(`${leaf} is not taught in content[] — looked for ${needles.join(' / ')}`);
}
/* The spec's own lists, so a factor cannot be quietly dropped. */
for (const [name] of PATTERN_FACTORS) {
  const key = name.split(' ').slice(-2).join(' ').toLowerCase();
  if (!contentProse.includes(key)) bad(`pattern factor "${name}" is not in content[] (looked for "${key}")`);
}
for (const [name] of TOT_FACTORS) {
  const key = name.replace(/^the /, '').toLowerCase();
  if (!contentProse.includes(key)) bad(`terms-of-trade factor "${name}" is not in content[] (looked for "${key}")`);
}
for (const impact of TOT_IMPACTS) if (!contentProse.includes(impact.replace(/s$/, ''))) bad(`terms-of-trade impact "${impact}" is not in content[]`);

/* ══ 11 · removed ids are gone, carried ids are untouched ════════════════ */

const stagedIds = new Set([...bundle.quiz, ...bundle.practice, ...bundle.diagrams, ...bundle.mistakes, ...bundle.flashcards].map((x) => x.id));
for (const [id, why] of Object.entries(CARRIED.removed)) if (stagedIds.has(id)) bad(`${id} was meant to be removed (${why}) and is still staged`);
for (const id of rebuiltInPlace) if (!stagedIds.has(id)) bad(`${id} is listed as rebuilt in place but is not in the staged bundle`);
for (const id of keptIds) if (!stagedIds.has(id)) bad(`carried id ${id} did not make it into the staged bundle`);
for (const [arr, liveArr] of [[carriedQuiz, live.quiz], [carriedPractice, live.practice], [carriedDiagrams, live.diagrams], [carriedMistakes, live.mistakes], [carriedCards, live.flashcards]]) {
  const m = byId(liveArr);
  for (const item of arr) if (JSON.stringify(item) !== JSON.stringify(m.get(item.id))) bad(`carried item ${item.id} differs from the live one — this packet does not rewrite it`);
}
/* No id appears twice. Checked per collection: a diagram id legitimately appears on its block too. */
for (const [name, arr] of Object.entries({ quiz: bundle.quiz, practice: bundle.practice, diagrams: bundle.diagrams, mistakes: bundle.mistakes, flashcards: bundle.flashcards })) {
  const ids = arr.map((x) => x.id);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) bad(`duplicate ${name} ids: ${[...new Set(dup)].join(', ')}`);
}
/* Marshall-Lerner and Prebisch-Singer are gone from every string, not merely from the bank. */
for (const term of ['Marshall', 'Prebisch']) {
  const n = countIn(everything, new RegExp(term, 'gi'));
  if (n) bad(`"${term}" ×${n} survives somewhere in the staged bundle`);
}

/* ══ 12 · the validator ══════════════════════════════════════════════════ */

const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const tier = (r, t) => r.findings.filter((f) => f.tier === t).length;
/*
 * "NEW" MEANS THIS PACKET INTRODUCED IT, AND THAT IS NOT THE SAME AS "NOT BASELINED". This section
 * carries findings that fire on the LIVE content and were never baselined — two `practice.opening`
 * items and `spec.uncovered` on ECON-4.3.2-5a-5 among them. A runner copied from packet 34 defines
 * new as `!baseline.has(key)`, which is right only for a section whose live findings are all in the
 * baseline, and here it reported six findings as this packet's that are inherited. They are counted
 * separately and printed, so nothing is hidden by the narrower definition.
 */
const liveKeys = new Set(before.findings.map((f) => f.key));
const isNew = (f) => !baseline.has(f.key) && !liveKeys.has(f.key);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && isNew(f));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && isNew(f));
const inherited = after.findings.filter((f) => f.tier !== 'INFO' && !baseline.has(f.key) && liveKeys.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
const recoverable = after.findings.filter((f) => f.rule === 'recall.recoverable');

/*
 * ONE ACCEPTED DEBT, WITH ITS EVIDENCE, AND IT IS A MEASUREMENT GETTING MORE HONEST RATHER THAN
 * CONTENT GETTING WORSE.
 *
 * ECON-4.3.2-4c-6 is "movement of factors of production", a leaf of sub-topic 4 — packet 39b's.
 * Live, `spec.uncovered` did not fire on it, and the reason is a false positive: `spec.uncovered`
 * needs half a leaf's long tokens in one field, and the live Notes topic on comparative advantage
 * says "factors are not perfectly mobile … exchange rate movements", which supplies `factors` and
 * `movement` while teaching nothing whatever about factor mobility inside a trading bloc. That
 * Notes topic is replaced by this packet's own, which does not happen to contain both words.
 *
 * So the leaf was never taught and is now correctly reported as untaught. Writing a sentence that
 * restores the keyword match without teaching the leaf is the exact failure the ledger exists to
 * prevent, and building the leaf properly means building sub-topic 4, which this half-packet does
 * not. It is recorded here, in the brief and in DECISIONS, and 39b closes it.
 */
const ACCEPTED_DEBT = {
  'spec:ECON-4.3.2-4c-6': 'sub-topic 4 is packet 39b; live coverage was a keyword false positive in a Notes topic about comparative advantage',
};
for (const f of newBlocks) bad(`new BLOCK ${f.rule}: ${f.key} — ${f.detail}`);
for (const f of newDebt) {
  const accepted = Object.entries(ACCEPTED_DEBT).find(([k]) => f.key.includes(k));
  if (!accepted) bad(`new DEBT ${f.rule}: ${f.key} — ${f.detail}`);
}
{
  /* The exception list is exact: an accepted entry that stops firing must be deleted, not left. */
  const firing = new Set(newDebt.map((f) => Object.keys(ACCEPTED_DEBT).find((k) => f.key.includes(k))).filter(Boolean));
  for (const k of Object.keys(ACCEPTED_DEBT)) if (!firing.has(k)) bad(`ACCEPTED_DEBT lists ${k}, which no longer fires — remove it`);
}

/* ══ report ══════════════════════════════════════════════════════════════ */

const subs = newContent.reduce((n, b) => n + b.sections.length, 0);
console.log(`packet 39a · ${SECTION} · Economics 4.3.2 sub-topics 1-3`);
console.log(`  blocks        ${bundle.content.length} (${newContent.length} built, 1 carried) · ${subs} new subsections · ${steps.length} steps · ${checkins.length} check-ins`);
console.log(`  recalls       ${recalls.length} · ${Object.entries(types).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
console.log(`  quiz          ${bundle.quiz.length} (${QUIZ.length} built, ${carriedQuiz.length} carried) · ${unpinned.size} unpinned for the pre-test · key longest in ${pct(Math.round(1000 * keyRate) / 10)}`);
console.log(`  practice      ${bundle.practice.length} · diagrams ${bundle.diagrams.length} · cards ${bundle.flashcards.length} · mistakes ${bundle.mistakes.length}`);
console.log(`  leaves        ${leafIds.length} of 19 mapped into content[]`);
console.log(`  validator     live ${tier(before, 'BLOCK')} BLOCK / ${tier(before, 'DEBT')} DEBT → staged ${tier(after, 'BLOCK')} / ${tier(after, 'DEBT')}`);
console.log(`  new           ${newBlocks.length} BLOCK · ${newDebt.length} DEBT · ${cleared.length} baselined findings clear on publish`);
for (const [k, why] of Object.entries(ACCEPTED_DEBT)) console.log(`  accepted      ${k} — ${why}`);
console.log(`  inherited     ${inherited.length} finding${inherited.length === 1 ? '' : 's'} that fire on the LIVE section and are not baselined — not this packet's, and not fixed by it`);
for (const f of inherited) console.log(`                - ${f.tier} ${f.rule}: ${String(f.detail).slice(0, 90)}`);
console.log(`  recoverable   ${recoverable.length} recall${recoverable.length === 1 ? '' : 's'} answerable by scrolling up (INFO; npm run recalls is the gate)`);
for (const f of recoverable) console.log(`                - ${f.key}: ${String(f.detail).slice(0, 120)}`);

if (problems.length) {
  console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\nall checks pass.');

if (DUMP) {
  mkdirSync('audit/snapshots', { recursive: true });
  const path = `audit/snapshots/packet-39a-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify(bundle, null, 1));
  console.log(`bundle written to ${path}`);
}

if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`staged: ${res.ok ? 'ok' : 'REFUSED'}${res.newBlocks?.length ? ` — ${res.newBlocks.map((f) => f.key).join(', ')}` : ''}`);
  if (!res.ok) process.exit(1);
}
