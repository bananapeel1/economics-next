/**
 * PACKET 39b — trade-global-economy, Economics 4.3.2 sub-topics 4 and 5.
 *
 *   node scripts/packet-39b-trade-global-economy.mjs            check only, writes nothing
 *   node scripts/packet-39b-trade-global-economy.mjs --dump     also writes the bundle snapshot
 *   node scripts/packet-39b-trade-global-economy.mjs --stage    also stages the draft
 *
 * ════ IT LOADS THE DRAFT, AND THAT IS THE WHOLE DIFFERENCE FROM 39a ════
 *
 * `loadBundle()` reads the `data` column — the LIVE, published row, which still holds the two
 * blocks students see today. Packet 39a is staged and NOT published, so its four rebuilt blocks
 * exist only in `draft`. A runner copied from 39a would therefore rebuild on top of the live
 * two-block section and DESTROY 39a's work the moment it staged, silently and with every check
 * passing, because every check would be measuring a bundle that was internally consistent and
 * missing half the section.
 *
 * So this runner reads `draft`, falls back to `data` only when there is no draft at all, and
 * asserts the draft it read is the bundle packet 39a recorded. Layer 0 is the most important thing
 * in the file.
 *
 * ════ THE CARRY LIST INVERTS ════
 *
 * 39a carried the protectionism block and its items by id; 39b rewrites exactly those and carries
 * everything 39a authored. `_packet39b-assessment.mjs` imports 39a's `CARRIED` and uses it as its
 * REPLACE list, so the two halves cannot disagree about the boundary. Layer 1 then asserts that
 * every 39a-authored item is byte-identical in the assembled bundle.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline, TABLE_TO_KEY } from './_content-write.mjs';
import { supabase } from './_db.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { buildSteps } from '../lib/learn-steps.js';
import { resolvePinnedItem, resolvePinnedDiagram, fallbackItemForBlock } from '../components/learn-mode/utils.js';
import { SECTION, money, units, pct, qty, TARIFF, QUOTA, SUBSIDY, BLOC, SCALE, FRICTION, LADDER, MEMBERSHIP, REASONS, TOOLS, IMPACTS, OFF_SPEC_39B, round2 } from './_packet39b-util.mjs';
import { teachingWords } from './_packet39-util.mjs';
import { ALL_BLOCKS_39B, ALL_SUBS_39B, B5, B6, B7, B8, B9, B10 } from './_packet39b-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS_NEW, NOTES_NEW, REPLACES } from './_packet39b-assessment.mjs';
import { DIAGRAMS, FRAME, FACE, estWidth } from './_packet39b-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

const problems = [];
const bad = (m) => problems.push(m);
const eq = (label, got, want) => { if (got !== want) bad(`${label}: got ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`); };

const SNAPSHOT_39A = 'audit/snapshots/packet-39a-bundle__economics__trade-global-economy.json';
const SNAPSHOT_39B = 'audit/snapshots/packet-39b-bundle__economics__trade-global-economy.json';

/*
 * THE TABLE MAP IS IMPORTED, NOT COPIED. A hand-written copy said `section_mistakes`; the table is
 * `section_common_mistakes`, and the first run died on it. `lib/content-gate.mjs` owns the mapping
 * and `stageBundle` uses the same one, so a runner holding its own copy can write a bundle the
 * stager cannot read back. Packet 2.6's rule, applied to a schema instead of a constant.
 */
const TABLES = TABLE_TO_KEY;

/* ══ 0 · THE DRAFT, NOT THE LIVE ROW ═════════════════════════════════════ */

async function loadDraft(sectionId) {
  const out = {};
  let drafted = 0;
  for (const [table, key] of Object.entries(TABLES)) {
    const { data, error } = await supabase.from(table).select('data,draft').eq('section_id', sectionId).maybeSingle();
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data) { out[key] = null; continue; }
    if (data.draft != null) { out[key] = data.draft; drafted += 1; } else out[key] = data.data;
  }
  return { bundle: out, drafted };
}

const { bundle: draft, drafted } = await loadDraft(SECTION);
const live = await loadBundle(SECTION);

if (!drafted) bad('no table has a draft — packet 39a has not staged, and 39b must not build on the live row');

/*
 * THE 39a SNAPSHOT IS THE SOURCE, AND THE DRAFT IS THE WITNESS.
 *
 * The first version built straight from the draft and asserted the draft equalled 39a's snapshot.
 * That is correct exactly once: the moment this runner stages, the draft is 39b's own bundle and
 * the next run fails its own first check with 168 cascading problems. A packet runner has to be
 * re-runnable — every other one in this programme is — so 39a's content now comes from the
 * COMMITTED snapshot, which is what Verify A read and what the 39a commit contains, and the draft
 * is checked to be either that snapshot (first run) or this packet's own output (a re-run).
 * Anything else means a third session re-staged the section underneath this one.
 */
const norm = (v) => {
  if (Array.isArray(v)) return v.map(norm);
  if (v && typeof v === 'object') return Object.fromEntries(Object.keys(v).sort().map((k) => [k, norm(v[k])]));
  return v;
};
const same = (a, b) => JSON.stringify(norm(a)) === JSON.stringify(norm(b));
const KEYS = ['content', 'quiz', 'practice', 'diagrams', 'flashcards', 'mistakes', 'notes'];

const base = JSON.parse(readFileSync(SNAPSHOT_39A, 'utf8'));
if (!Array.isArray(base.content) || base.content.length !== 5) {
  throw new Error(`${SNAPSHOT_39A} does not hold packet 39a's five-block bundle`);
}

let mineSnapshot = null;
try { mineSnapshot = JSON.parse(readFileSync(SNAPSHOT_39B, 'utf8')); } catch { /* first run */ }

const draftIs39a = KEYS.every((k) => same(draft[k], base[k]));
const draftIsMine = mineSnapshot ? KEYS.every((k) => same(draft[k], mineSnapshot[k])) : false;
if (!draftIs39a && !draftIsMine) {
  bad('the staged draft is neither packet 39a\'s bundle nor this packet\'s — someone has re-staged this section');
}
if (draft.content.length === live.content.length && draft.content.length < 5) {
  bad('the draft looks like the live two-block section — 39b would rebuild on top of the wrong bundle');
}

/* ══ 1 · WHAT 39a AUTHORED IS CARRIED; WHAT 39a CARRIED IS REPLACED ══════ */

const replaced = {
  quiz: new Set(REPLACES.quiz), practice: new Set(REPLACES.practice), diagrams: new Set(REPLACES.diagrams),
  mistakes: new Set(REPLACES.mistakes), flashcards: new Set(REPLACES.flashcards),
};
const keepFrom = (key) => (base[key] || []).filter((x) => !replaced[key].has(x.id));

const kept = {
  quiz: keepFrom('quiz'), practice: keepFrom('practice'), diagrams: keepFrom('diagrams'),
  mistakes: keepFrom('mistakes'), flashcards: keepFrom('flashcards'),
};
const keptNotes = (base.notes || []).filter((n) => !REPLACES.notes.includes(n.title));
const keptBlocks = base.content.filter((b) => b.title !== REPLACES.block);

eq('39a blocks carried', keptBlocks.length, 4);
for (const [key, ids] of Object.entries({ quiz: REPLACES.quiz, practice: REPLACES.practice, diagrams: REPLACES.diagrams, mistakes: REPLACES.mistakes, flashcards: REPLACES.flashcards })) {
  for (const id of ids) if (!(base[key] || []).some((x) => x.id === id)) bad(`${key} ${id} is listed as replaced and is not in the draft`);
}
if (!base.content.some((b) => b.title === REPLACES.block)) bad(`the block "${REPLACES.block}" is not in the draft`);

/* ══ 2 · assemble ═══════════════════════════════════════════════════════ */

const ALL_BLOCK_TITLES = [...keptBlocks.map((b) => b.title), B5, B6, B7, B8, B9, B10];
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));

const quiz = [...kept.quiz, ...QUIZ.map(({ block, ...rest }) => rest)];
const practice = [...kept.practice, ...PRACTICE.map(({ block, ...rest }) => rest)];
const offset = { quiz: kept.quiz.length, practice: kept.practice.length };

/*
 * 39a's OWN PINS ARE INDICES INTO ITS OWN ARRAY, and its items now sit at the FRONT of a longer
 * one. They keep their positions only because `kept.quiz` preserves 39a's order and 39b's items are
 * appended after it — asserted below rather than assumed, because an off-by-one here would silently
 * repoint every 39a chapter at a 39b question.
 */
for (const b of keptBlocks) {
  for (const i of b.quizIndices || []) {
    if (quiz[i]?.id !== base.quiz[i]?.id) bad(`39a block "${b.title}" quizIndex ${i} no longer points at the same item`);
  }
  for (const i of b.practiceIndices || []) {
    if (practice[i]?.id !== base.practice[i]?.id) bad(`39a block "${b.title}" practiceIndex ${i} no longer points at the same item`);
  }
}

const indicesFor = (tagged, off, skip = new Set()) => {
  const map = Object.fromEntries(ALL_BLOCK_TITLES.map((b) => [b, []]));
  tagged.forEach((it, i) => { if (it.block && !skip.has(i)) map[it.block].push(off + i); });
  return map;
};
const quizIndices = indicesFor(QUIZ, offset.quiz, unpinned);
const practiceIndices = indicesFor(PRACTICE, offset.practice);

const diagrams = [...kept.diagrams, ...DIAGRAMS];
/*
 * ONE DIAGRAM PER BLOCK, AND THE FIRST DRAFT HAD TWO SHARING. `resolvePinnedDiagram` carries a
 * `used` set across the deck, so the SECOND block pinned to the same diagram resolved nothing and
 * its check-in showed no diagram at all. Layer 8 caught it because it asks what a check-in SHOWS.
 * Two more diagrams were built rather than letting two chapters share one.
 */
const byTitle = Object.fromEntries(DIAGRAMS.map((x) => [x.title, x.id]));
const diagramFor = {
  [B5]: byTitle['A Bloc Breaks the First Rule'],
  [B6]: byTitle['The Four Types of Trading Bloc'],
  [B7]: byTitle['Trade Diversion'],
  [B8]: byTitle['The Infant Industry Case'],
  [B9]: byTitle['A Subsidy: the Price Does Not Move'],
  [B10]: byTitle['A Tariff: Who Gets What'],
};
if (new Set(Object.values(diagramFor)).size !== Object.keys(diagramFor).length) {
  bad('two blocks are pinned to the same diagram — the second check-in will show none');
}
for (const [block, dId] of Object.entries(diagramFor)) if (!dId) bad(`no diagram resolved for block "${block}"`);
const newBlocks = ALL_BLOCKS_39B.map((b) => ({
  title: b.title,
  sections: b.sections,
  takeaway: b.takeaway,
  diagramId: diagramFor[b.title],
  quizIndices: quizIndices[b.title],
  practiceIndices: practiceIndices[b.title],
}));

/** An extras entry survives only if it is neither off-spec nor superseded by what this packet wrote. */
const supersededExtras = new Set(REPLACES.extras);
const keepExtra = (entry) => !outOfScope(JSON.stringify(entry)) && !supersededExtras.has(entry?.title);

const bundle = {
  content: [...keptBlocks, ...newBlocks],
  notes: [...keptNotes, ...NOTES_NEW],
  quiz, practice,
  flashcards: [...kept.flashcards, ...FLASHCARDS],
  diagrams,
  mistakes: [...kept.mistakes, ...MISTAKES],
  extras: {
    chains: [...(base.extras?.chains || []).filter(keepExtra), ...EXTRAS_NEW.chains],
    evaluation: [...(base.extras?.evaluation || []).filter(keepExtra), ...EXTRAS_NEW.evaluation],
  },
};

function outOfScope(text) {
  return OFF_SPEC_39B.some((t) => new RegExp(`\\b${t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i').test(text));
}

/* Every 39a-authored item survives byte-for-byte. */
const byId = (arr) => new Map(arr.map((x) => [x.id, x]));
for (const key of ['quiz', 'practice', 'diagrams', 'mistakes', 'flashcards']) {
  const after = byId(bundle[key]);
  for (const item of kept[key]) {
    if (JSON.stringify(after.get(item.id)) !== JSON.stringify(item)) bad(`39a's ${key} ${item.id} was altered by this packet`);
  }
}
for (const b of keptBlocks) {
  const after = bundle.content.find((x) => x.title === b.title);
  if (JSON.stringify(after) !== JSON.stringify(b)) bad(`39a's block "${b.title}" was altered by this packet`);
}
/*
 * A SWEEP HAS TO CHECK BOTH ENDS. Asserting only that a listed title is ABSENT from the result lets
 * a stale or mistyped entry pass silently for ever — which is the inverse of the miss that caused
 * Verify A's rejection, and it was Verify A that pointed it out. So: every title must be present in
 * what we are sweeping FROM, and absent from what we produce.
 */
{
  const source = [...(base.extras?.chains || []), ...(base.extras?.evaluation || [])].map((e) => e?.title);
  const result = [...bundle.extras.chains, ...bundle.extras.evaluation].map((e) => e?.title);
  for (const title of REPLACES.extras) {
    if (!source.includes(title)) bad(`REPLACES.extras lists "${title}", which is not in the bundle being swept — stale or mistyped`);
    if (result.includes(title)) bad(`the extras entry "${title}" was meant to be superseded and is still in the bundle`);
  }
}
for (const id of [...replaced.quiz, ...replaced.practice, ...replaced.diagrams, ...replaced.mistakes, ...replaced.flashcards]) {
  if (bundle.quiz.concat(bundle.practice, bundle.diagrams, bundle.mistakes, bundle.flashcards).some((x) => x.id === id)) {
    bad(`${id} was meant to be replaced and is still in the bundle`);
  }
}

/* ══ 3 · every string, and the off-spec vocabulary ═══════════════════════ */

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
const authored = readableOf({ content: newBlocks, notes: NOTES_NEW, QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS_NEW, DIAGRAMS });
const everything = readableOf(bundle);

/* The wrong account of trade diversion must not survive anywhere in the bundle. */
if (/common external tariff shifts imports/i.test(everything.join(' '))) {
  bad('the live definition of trade diversion ("the common external tariff shifts imports") is still in the bundle');
}
const countIn = (corpus, re) => corpus.reduce((n, s) => n + (s.match(re) || []).length, 0);
const banIn = (corpus, re, why) => { const n = countIn(corpus, re); if (n) bad(`${why} x${n}`); };

banIn(everything, /\bundefined\b|\bNaN\b|\[object Object\]|\$\{/g, 'failed substitution');
banIn(authored, /\bthe live section\b|\bthis packet\b|\bpreviously (?:taught|said|omitted)\b/gi, 'self-reference');
banIn(authored, /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b/g, 'ledger id in student-facing prose');
for (const term of OFF_SPEC_39B) {
  const n = countIn(everything, new RegExp(`\\b${term.replace(/-/g, '[- ]')}\\b`, 'gi'));
  if (n) bad(`off-spec term "${term}" x${n} survives in the staged bundle`);
}

/* ══ 4 · practice tariffs, on the WHOLE bank including what 39a carried ══ */

const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
const allowed = new Map();
for (const r of census) allowed.set(r.command, new Set(r.marks));
for (const item of bundle.practice) {
  const cmd = (item.question.match(/^([A-Z][a-z]+)/) || [])[1] || item.command;
  const marks = allowed.get(cmd);
  if (!marks) { bad(`practice "${cmd}" is not an IAL Economics command word`); continue; }
  const stated = /\((\d+) marks?\)/.exec(item.question);
  const carried = stated ? Number(stated[1]) : item.marks;
  if (!marks.has(carried)) bad(`practice ${cmd} ${carried} marks — the census allows ${[...marks].join(' or ')}`);
}
banIn(readableOf(bundle.practice), /\b(Outline|Assess)\b/g, 'a command word IAL Economics does not have');

/*
 * A FALSE APPENDIX 6 CITATION, which 39a committed and Verify A caught. Any command word named in
 * the same sentence as "Appendix 6" must be in this subject's census.
 */
{
  const commands = new Set(census.map((r) => r.command));
  const KNOWN = new Set(['Appendix', 'Requires', 'Economics', 'Business', 'Level', 'Command', 'Students', 'International', 'Advanced', 'Available']);
  const SKIP = /^(The|This|That|An|And|But|Here|When|Where|Which|What|Note|Show|Both|Each|Every|Only|Same|Give|Your|Marks|Method|Exam|Paper|Unit|Write|Build|Take|Name|Pick|For|Against|Twenty|Eight|Four|Two)$/;
  for (const text of authored) {
    for (const sentence of String(text).split(/(?<=[.!?])\s+/)) {
      if (!/Appendix 6/.test(sentence)) continue;
      for (const [, word] of sentence.matchAll(/\b([A-Z][a-z]{3,})\b/g)) {
        if (KNOWN.has(word) || commands.has(word) || SKIP.test(word)) continue;
        bad(`"${word}" is cited beside Appendix 6 and is not an IAL Economics command word — "${sentence.slice(0, 80)}"`);
      }
    }
  }
}

/* ══ 5 · the quiz bank ══════════════════════════════════════════════════ */

const BY_POSITION = /\bthe (first|second|third|fourth|last|other) (option|answer|choice)\b|\boption (?:A|B|C|D)\b/i;
for (const item of bundle.quiz) {
  if (!Array.isArray(item.options) || item.options.length !== 4) bad(`quiz item has ${item.options?.length} options: ${item.question.slice(0, 45)}`);
  if (!(item.correctIndex >= 0 && item.correctIndex < 4)) bad(`quiz correctIndex out of range: ${item.question.slice(0, 45)}`);
  if (new Set(item.options.map((o) => String(o).toLowerCase())).size !== item.options.length) bad(`quiz item repeats an option: ${item.question.slice(0, 45)}`);
}
for (const item of QUIZ) {
  if (BY_POSITION.test(item.explanation || '')) bad(`quiz explanation refers to an option by position: ${item.question.slice(0, 45)}`);
}
{
  const counts = [0, 0, 0, 0];
  for (const it of bundle.quiz) counts[it.correctIndex] += 1;
  if (counts.some((c) => c === 0)) bad(`answer position histogram has an empty slot: ${counts.join(' / ')}`);
  if (Math.max(...counts) / bundle.quiz.length > 0.4) bad(`answer position histogram is skewed: ${counts.join(' / ')} over ${bundle.quiz.length}`);
}
{
  const rate = bundle.quiz.filter((it) => {
    const lens = it.options.map((o) => String(o).length);
    const max = Math.max(...lens);
    return lens[it.correctIndex] === max && lens.filter((l) => l === max).length === 1;
  }).length / bundle.quiz.length;
  if (rate > 0.35) bad(`the key is the strictly longest option in ${pct(Math.round(1000 * rate) / 10)} of the bank — the guard is 35%`);
}

/* ══ 6 · the arithmetic, re-derived from the printed figures ════════════ */

const T = TARIFF, Q = QUOTA, S = SUBSIDY, BL = BLOC;
if (!T.addsUp) bad('the four tariff areas do not sum to the consumer loss');
eq('deadweight is b plus d', T.deadweight, T.b + T.d);
eq('revenue is the tariff on the imports that remain', T.c, T.tariff * T.importsAfter);
eq('imports fall from both sides', T.importsBefore - T.importsAfter, (T.atProtected.supply - T.atWorld.supply) + (T.atWorld.demand - T.atProtected.demand));
eq('the quota reproduces the tariff price', Q.price, T.protectedPrice);
eq('the quota rent equals the tariff revenue', Q.rent, T.c);
eq('the quota loses the same as the tariff', Q.deadweight, T.deadweight);
eq('the subsidy leaves demand alone', S.demand, T.atWorld.demand);
eq('the subsidy loses only the production distortion', S.deadweight, T.b);
if (!(S.deadweight < T.deadweight)) bad('the subsidy does not lose less than the tariff — the 5b teaching point fails');
eq('creation moves to the cheaper producer', BL.creation.after.winner, 'partner');
eq('creation saves the cost difference', BL.creation.realSaving, BL.sources.home - BL.sources.partner);
eq('diversion starts outside the bloc', BL.diversion.before.winner, 'outside');
eq('diversion ends with the partner', BL.diversion.after.winner, 'partner');
if (!(BL.diversion.priceFall > 0 && BL.diversion.realLoss > 0)) bad('diversion must show a FALLING price and a RISING real cost');

/* The printed-ratio guard: a figure in the prose must divide the figures beside it. */
{
  const text = readableOf({ content: newBlocks, notes: NOTES_NEW }).join(' ');
  const m = text.match(/\$(\d+) subsidy/);
  if (m && Number(m[1]) !== S.perUnit) bad(`the prose prints a $${m[1]} subsidy and the spine is $${S.perUnit}`);
  for (const [label, value] of [['consumer loss', T.consumerLoss], ['producer gain', T.a], ['revenue', T.c], ['deadweight', T.deadweight]]) {
    if (!text.includes(money(value))) bad(`${label} (${money(value)}) is not printed anywhere in the teaching text`);
  }
}

/* ══ 7 · diagrams, measured on the emitted SVG ══════════════════════════ */

/*
 * PACKET 31'S BOX, NOT A TIGHTER ONE. This module started with `y - 0.8·size … y + 0.25·size`, which
 * is the glyph and nothing else, and it passed a quota label that overlapped its neighbour by 2.6
 * CSS px — it missed by 0.575 units. `scripts/packet-31-financial-planning.mjs:705-772` uses a
 * vertical tolerance of 1.2 × the face and is A/B-proven against real overlaps, so that is what runs
 * here. A guard that is tighter than the one that already caught this class is not a guard.
 */
const VERTICAL_TOLERANCE = 1.2;
/** Assigned from inside the diagram loop so the A/B probe below exercises the shipping predicate. */
let crosses = null;
const boxOf = (x, y, text, size, anchor) => {
  const w = estWidth(text, size);
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  const half = (size * VERTICAL_TOLERANCE) / 2;
  return { x0, x1: x0 + w, y0: y - half, y1: y + half, text, size };
};
for (const d of DIAGRAMS) {
  const vb = (d.svg.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) { bad(`${d.title}: no viewBox`); continue; }
  const [, , w, h] = vb.trim().split(/[\s,]+/).map(Number);
  eq(`${d.title}: frame width`, w, FRAME.w);
  eq(`${d.title}: frame height`, h, FRAME.h);
  const boxes = [...d.svg.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" fill="[^"]*" font-size="([\d.]+)"[^>]*text-anchor="([a-z]+)">([^<]*)<\/text>/g)]
    .map((m) => boxOf(+m[1], +m[2], m[5], +m[3], m[4]));
  if (!boxes.length) bad(`${d.title}: no text parsed out of the SVG`);
  for (const b of boxes) {
    if (b.size < FACE.small) bad(`${d.title}: a ${b.size}-unit face, below the ${FACE.small} floor — "${b.text}"`);
    if (b.x0 < 0 || b.x1 > w || b.y1 > h) bad(`${d.title}: "${b.text}" leaves the frame`);
  }
  for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
    const a = boxes[i], bb = boxes[j];
    if (a.x0 < bb.x1 && bb.x0 < a.x1 && a.y0 < bb.y1 && bb.y0 < a.y1) bad(`${d.title}: "${a.text}" collides with "${bb.text}"`);
  }

  /*
   * TEXT AGAINST THE LINES, NOT ONLY AGAINST OTHER TEXT. The box-against-box check passed a label
   * that its own curve ran straight through: the subsidy diagram's S-prime sat at the foot of the
   * shifted supply line. Verify A found it by measuring the segment; the guard could not, because a
   * `<line>` is not a text box. Segment-against-rectangle closes that, and it is A/B'd against the
   * placement that shipped.
   */
  const segs = [...d.svg.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)]
    .map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4] }));
  const crossesLocal = (box, sg) => {
    const { x0, x1: bx1, y0, y1: by1 } = box;
    const inside = (x, y) => x >= x0 && x <= bx1 && y >= y0 && y <= by1;
    if (inside(sg.x1, sg.y1) || inside(sg.x2, sg.y2)) return true;
    const hit = (ax, ay, bx, by) => {
      const d1 = (bx - ax) * (sg.y1 - ay) - (by - ay) * (sg.x1 - ax);
      const d2 = (bx - ax) * (sg.y2 - ay) - (by - ay) * (sg.x2 - ax);
      const d3 = (sg.x2 - sg.x1) * (ay - sg.y1) - (sg.y2 - sg.y1) * (ax - sg.x1);
      const d4 = (sg.x2 - sg.x1) * (by - sg.y1) - (sg.y2 - sg.y1) * (bx - sg.x1);
      return d1 * d2 < 0 && d3 * d4 < 0;
    };
    return hit(x0, y0, bx1, y0) || hit(bx1, y0, bx1, by1) || hit(bx1, by1, x0, by1) || hit(x0, by1, x0, y0);
  };
  crosses = crossesLocal;
  for (const box of boxes) {
    if (box.text.length > 18) continue; // a long note sits over gridlines by design
    for (const sg of segs) {
      const horizontal = Math.abs(sg.y1 - sg.y2) < 0.5;
      const axis = horizontal && Math.abs(sg.x2 - sg.x1) > FRAME.w * 0.6;
      if (axis) continue; // price and axis rules run the full width under every label
      if (crossesLocal(box, sg)) { bad(`${d.title}: the line (${sg.x1},${sg.y1})-(${sg.x2},${sg.y2}) runs through the label "${box.text}"`); break; }
    }
  }
}
{
  /*
   * A/B, THROUGH THE REAL PREDICATE. The first version of this probe reimplemented a looser test of
   * its own, so it proved that SOMETHING could see the defect rather than that `crosses` could —
   * and would not have noticed `crosses` itself regressing. Verify A caught that. It now calls the
   * shipping function on the exact geometry it was written for: the S-prime placement, and the
   * quota bracket that struck through the D glyph.
   */
  const cases = [
    ["S' at the foot of its own curve", boxOf(139, 191, "S'", 15, 'start'), { x1: 133.9, y1: 194.9, x2: 254.3, y2: 94.9 }],
    ['the quota bracket through D', boxOf(234, 107.6, 'D', 15, 'end'), { x1: 162.7, y1: 107.5, x2: 267.3, y2: 107.5 }],
  ];
  for (const [what, box, sg] of cases) {
    if (!crosses(box, sg)) bad(`the text-against-line check no longer sees ${what}, which it was written for`);
  }
}

/*
 * TEXT ON A SHAPE MUST CLEAR 4.5:1, AND NOTHING ELSE IN THE PROGRAMME CHECKS IT.
 *
 * The ladder's first rung shipped a #0b1020 label on a #64748b bar: 3.98:1, against the 4.5:1 WCAG
 * minimum for text this size (these render at roughly 10.9 CSS px). `npm run contrast` passed it,
 * because that guard reads `components/learn-mode/processSvg.js` and the themed colour tokens and
 * does not look at an authored SVG's own text against the rect behind it. A walkthrough found it by
 * eye, which is not a repeatable way to find the next one.
 *
 * So: for every `<text>` that sits inside a `<rect>`, composite the rect's fill over the page
 * background at its own opacity and measure. A/B'd against the colour that failed.
 */
{
  const hexToRgb = (hex) => { const c = hex.replace('#', ''); return [0, 2, 4].map((i) => parseInt(c.substr(i, 2), 16)); };
  const lum = (rgb) => {
    const v = rgb.map((x) => x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const over = (fg, bg, alpha) => fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)));
  const PAGE = hexToRgb('#0b1020');
  const MIN = 4.5;

  const check = (svg, title) => {
    const rects = [...svg.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)" height="([-\d.]+)"[^>]*fill="(#[0-9a-fA-F]{6})"(?:[^>]*opacity="([\d.]+)")?/g)]
      .map((m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4], fill: hexToRgb(m[5]), alpha: m[6] ? +m[6] : 1 }));
    const texts = [...svg.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" fill="(#[0-9a-fA-F]{6})" font-size="([\d.]+)"[^>]*>([^<]*)<\/text>/g)]
      .map((m) => ({ x: +m[1], y: +m[2], fill: hexToRgb(m[3]), size: +m[4], text: m[5] }));
    let worst = null;
    for (const t of texts) {
      const host = rects.find((r) => t.x >= r.x && t.x <= r.x + r.w && t.y >= r.y - 2 && t.y <= r.y + r.h + 2);
      const bg = host ? over(host.fill, PAGE, host.alpha) : PAGE;
      const got = ratio(t.fill, bg);
      if (got < MIN) bad(`${title}: "${t.text.slice(0, 26)}" is ${got.toFixed(2)}:1 against the shape behind it — the floor is ${MIN}:1`);
      if (!worst || got < worst.got) worst = { got, text: t.text };
    }
    return worst;
  };
  for (const d of DIAGRAMS) check(d.svg, d.title);
  /* A/B: the colour that shipped must still fail if it comes back. */
  const rigged = '<rect x="30" y="78" width="120" height="30" rx="2" fill="#64748b"/><text x="56" y="98" fill="#0b1020" font-size="12" font-weight="600" text-anchor="start">Free-trade area</text>';
  const before = problems.length;
  check(rigged, '__probe__');
  if (problems.length === before) bad('the SVG contrast check does not fail the 3.98:1 pair it was written for');
  else problems.length = before;
}

/* ══ 8 · what the deck SHOWS, through the app's own resolvers ═══════════ */

const steps = buildSteps(bundle.content);
const checkins = steps.filter((s) => s.type === 'checkin');
{
  const usedD = new Set(), usedQ = new Set(), usedP = new Set();
  for (const step of checkins) {
    const d = resolvePinnedDiagram(bundle.diagrams, { id: step.diagramId, ref: step.diagramRef }, usedD);
    const q = resolvePinnedItem(bundle.quiz, { ids: step.quizIds, indices: step.quizIndices }, usedQ)
      || fallbackItemForBlock(bundle.quiz, step.blockTitle, usedQ);
    const p = resolvePinnedItem(bundle.practice, { ids: step.practiceIds, indices: step.practiceIndices }, usedP);
    if (!d) bad(`a check-in shows nothing — ${step.blockTitle}: no diagram`);
    if (!q) bad(`a check-in shows nothing — ${step.blockTitle}: no quiz question`);
    if (!p) bad(`a check-in shows nothing — ${step.blockTitle}: no practice item`);
  }
}
for (const block of bundle.content) {
  if (!block.diagramId) bad(`block "${block.title}" has no diagramId`);
  if (!block.quizIndices?.length) bad(`block "${block.title}" has no quizIndices`);
  if (!block.practiceIndices?.length) bad(`block "${block.title}" has no practiceIndices`);
}
for (const b of newBlocks) {
  for (const i of b.quizIndices || []) {
    const tagged = QUIZ[i - offset.quiz];
    if (tagged && tagged.block !== b.title) bad(`quizIndices on "${b.title}" points at an item tagged "${tagged.block}"`);
  }
}

/* ══ 9 · recalls ═══════════════════════════════════════════════════════ */

const recalls = ALL_SUBS_39B.map((s) => s.recall).filter(Boolean);
const types = recalls.reduce((m, r) => { m[r.type] = (m[r.type] || 0) + 1; return m; }, {});
for (const t of ['reorder', 'fillin', 'match', 'classify']) if (!types[t]) bad(`no ${t} recall among this packet's — the contract has four types`);
for (const s of ALL_SUBS_39B) {
  const w = teachingWords(s);
  if (w > 350) bad(`${s.title}: ${w} teaching words, budget is 350`);
  const r = s.recall;
  if (!r) continue;
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
}
/* Every reorder is taught in order by an extras chain, and none sits on a step with a flow. */
for (const s of ALL_SUBS_39B) {
  const r = s.recall;
  if (!r || r.type !== 'reorder') continue;
  const words = (t) => new Set(String(t).toLowerCase().match(/[a-z]{4,}/g) || []);
  const sourced = bundle.extras.chains.some((c) => {
    const st = c.steps || [];
    if (st.length < r.correctOrder.length) return false;
    return r.correctOrder.every((item, i) => {
      const a = words(item), b = words(st[i] ?? '');
      return [...a].filter((x) => b.has(x)).length >= 2;
    });
  });
  if (!sourced) bad(`${s.title}: the reorder is not taught in order by any extras chain`);
  if ((s.body || []).some((b) => b.type === 'flow')) bad(`${s.title}: a reorder sits under a flow on its own step`);

  /*
   * A RECALL MAY NOT TEST MATERIAL THE DECK HAS NOT REACHED. Holding this section to zero
   * recoverable pushed three reorders off the step that taught them, and one landed two subsections
   * EARLIER rather than later — a retaliation sequence asked before retaliation had been mentioned.
   * Verify A found it. "Not recoverable" and "already taught" are different properties, and a packet
   * can satisfy the first by breaking the second, so both are checked.
   */
  const here = ALL_SUBS_39B.findIndex((x) => x.id === s.id);
  const score = (sub) => {
    const text = readableOf({ body: sub.body, keyIdea: sub.keyIdea }).join(' ').toLowerCase();
    return r.correctOrder.reduce((n, item) => {
      const w = [...new Set(String(item).toLowerCase().match(/[a-z]{5,}/g) || [])];
      return n + w.filter((x) => text.includes(x)).length;
    }, 0);
  };
  let taughtAt = -1; let best = 0;
  ALL_SUBS_39B.forEach((sub, i) => { const sc = score(sub); if (sc > best) { best = sc; taughtAt = i; } });
  if (taughtAt > here) {
    bad(`${s.title}: its reorder tests material first taught in "${ALL_SUBS_39B[taughtAt].title}", ${taughtAt - here} subsection(s) later`);
  }
}

/* ══ 10 · the 27 leaves, and the section's 46 ═══════════════════════════ */

const contentProse = readableOf({ content: newBlocks }).join(' ').toLowerCase();
const LEAVES = {
  'ECON-4.3.2-4a': ['world trade organisation', 'wto'],
  'ECON-4.3.2-4b-1': ['free-trade area'],
  'ECON-4.3.2-4b-2': ['customs union'],
  'ECON-4.3.2-4b-3': ['common market'],
  'ECON-4.3.2-4b-4': ['economic and monetary union'],
  'ECON-4.3.2-4c-1': ['trade creation'],
  'ECON-4.3.2-4c-2': ['trade diversion'],
  'ECON-4.3.2-4c-3': ['costs and prices', 'price of what crosses'],
  'ECON-4.3.2-4c-4': ['economies of scale'],
  'ECON-4.3.2-4c-5': ['transaction cost'],
  'ECON-4.3.2-4c-6': ['movement of factors of production', 'factors of production'],
  'ECON-4.3.2-4d': ['conflicts between trading blocs', 'breach of the wto'],
  'ECON-4.3.2-5a-1': ['infant', 'geriatric'],
  'ECON-4.3.2-5a-2': ['employment'],
  'ECON-4.3.2-5a-3': ['national security'],
  'ECON-4.3.2-5a-4': ['dumping'],
  'ECON-4.3.2-5a-5': ['current account'],
  'ECON-4.3.2-5a-6': ['raise revenue', 'revenue'],
  'ECON-4.3.2-5b-1': ['tariff'],
  'ECON-4.3.2-5b-2': ['quota'],
  'ECON-4.3.2-5b-3': ['non-tariff barrier'],
  'ECON-4.3.2-5b-4': ['subsid'],
  'ECON-4.3.2-5c-1': ['consumer'],
  'ECON-4.3.2-5c-2': ['producer'],
  'ECON-4.3.2-5c-3': ['government'],
  'ECON-4.3.2-5c-4': ['living standard'],
  'ECON-4.3.2-5c-5': ['equality', 'regressive'],
};
eq('leaves claimed by 39b', Object.keys(LEAVES).length, 27);
for (const [leaf, needles] of Object.entries(LEAVES)) {
  if (!needles.some((n) => contentProse.includes(n))) bad(`${leaf} is not taught in content[] — looked for ${needles.join(' / ')}`);
}
for (const [name] of MEMBERSHIP) if (!contentProse.includes(name.split(' ').slice(-2).join(' '))) bad(`4c item "${name}" is not in content[]`);
for (const [name] of REASONS) if (!contentProse.includes(name.split(' ').slice(-2).join(' '))) bad(`5a reason "${name}" is not in content[]`);
for (const tool of TOOLS) if (!contentProse.includes(tool.replace(/s$/, ''))) bad(`5b tool "${tool}" is not in content[]`);
for (const impact of IMPACTS) if (!contentProse.includes(impact.replace(/s$/, ''))) bad(`5c impact "${impact}" is not in content[]`);
for (const [name] of LADDER) if (!contentProse.includes(name)) bad(`4b type "${name}" is not in content[] in the specification's words`);

/* ══ 11 · the findings this packet is answering, asserted ══════════════ */

{
  /* accuracy-01 and topFix-03: the tariff flow must state the RIGHT comparison. */
  const prose = readableOf({ content: newBlocks, mistakes: MISTAKES }).join(' ');
  const right = new RegExp(`${money(T.consumerLoss).replace(/\$/, '\\$')}[^.]*(exceed|more than)[^.]*${money(T.a).replace(/\$/, '\\$')}[^.]*${money(T.c).replace(/\$/, '\\$')}`, 'i');
  if (!right.test(prose) && !prose.includes(`consumers lose more than producers gain PLUS`)) {
    bad('accuracy-01: the teaching text does not state that the consumer loss exceeds the producer gain PLUS the revenue');
  }
  if (/producer gains are smaller than consumer losses plus government revenue/i.test(readableOf(bundle).join(' '))) {
    bad('accuracy-01: the wrong comparison is still in the bundle');
  }
  /* topFix-02: the bloc material has its own assessment. */
  const blocQuiz = QUIZ.filter((x) => [B6, B7].includes(x.block)).length;
  if (blocQuiz < 3) bad(`topFix-02 wants at least 3 bloc MCQs and this bundle has ${blocQuiz}`);
  const blocPractice = PRACTICE.filter((x) => [B6, B7].includes(x.block) && ['Explain', 'Examine', 'Analyse', 'Evaluate'].includes(x.command)).length;
  if (!blocPractice) bad('topFix-02 wants an Explain or Examine practice item on the bloc material');
  /* specGap-05: four rungs, and no invented fifth. */
  if (/\beconomic union\b(?!\s*and)/i.test(prose)) bad('specGap-05: "economic union" is used as a separate rung, which this specification does not have');
}

/* ══ 12 · the validator ════════════════════════════════════════════════ */

const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(base, ctx);
const after = validateSection(bundle, ctx);
const tier = (r, t) => r.findings.filter((f) => f.tier === t).length;
const liveKeys = new Set(before.findings.map((f) => f.key));
const isNew = (f) => !baseline.has(f.key) && !liveKeys.has(f.key);
const newBlockFindings = after.findings.filter((f) => f.tier === 'BLOCK' && isNew(f));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && isNew(f));
const inherited = after.findings.filter((f) => f.tier !== 'INFO' && !baseline.has(f.key) && liveKeys.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && !after.findings.some((g) => g.key === f.key));
const recoverable = after.findings.filter((f) => f.rule === 'recall.recoverable');

for (const f of newBlockFindings) bad(`new BLOCK ${f.rule}: ${f.key} — ${f.detail}`);
for (const f of newDebt) bad(`new DEBT ${f.rule}: ${f.key} — ${f.detail}`);

/* ══ report ═══════════════════════════════════════════════════════════ */

const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
console.log(`packet 39b · ${SECTION} · Economics 4.3.2 sub-topics 4 and 5`);
console.log(`  source        packet 39a's committed snapshot · the draft (${drafted}/${Object.keys(TABLES).length} tables) is ${draftIs39a ? "39a's, so this is a first run" : 'this packet\'s own, so this is a re-run'}`);
console.log(`  blocks        ${bundle.content.length} (${keptBlocks.length} from 39a, ${newBlocks.length} built) · ${subs} subsections · ${steps.length} steps · ${checkins.length} check-ins`);
console.log(`  recalls       ${recalls.length} new · ${Object.entries(types).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
console.log(`  quiz          ${bundle.quiz.length} (${kept.quiz.length} from 39a, ${QUIZ.length} built) · practice ${bundle.practice.length} · diagrams ${bundle.diagrams.length} · cards ${bundle.flashcards.length}`);
console.log(`  leaves        ${Object.keys(LEAVES).length} of 27 in sub-topics 4 and 5 taught in content[]`);
console.log(`  validator     draft ${tier(before, 'BLOCK')} BLOCK / ${tier(before, 'DEBT')} DEBT → staged ${tier(after, 'BLOCK')} / ${tier(after, 'DEBT')}`);
console.log(`  new           ${newBlockFindings.length} BLOCK · ${newDebt.length} DEBT · ${cleared.length} findings clear`);
if (inherited.length) {
  console.log(`  inherited     ${inherited.length} finding(s) that fire on the staged draft and are not baselined — not this packet's`);
  for (const f of inherited) console.log(`                - ${f.tier} ${f.rule}: ${String(f.detail).slice(0, 88)}`);
}
console.log(`  recoverable   ${recoverable.length} recall(s) answerable by scrolling up`);
for (const f of recoverable) console.log(`                - ${String(f.detail).slice(0, 110)}`);

if (problems.length) {
  console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:`);
  for (const p of problems) console.log(`  x ${p}`);
  process.exit(1);
}
console.log('\nall checks pass.');

if (DUMP) {
  mkdirSync('audit/snapshots', { recursive: true });
  const path = `audit/snapshots/packet-39b-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify(bundle, null, 1));
  console.log(`bundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`staged: ${res.ok ? 'ok' : 'REFUSED'}${res.newBlocks?.length ? ` — ${res.newBlocks.map((f) => f.key).join(', ')}` : ''}`);
  if (!res.ok) process.exit(1);
}
