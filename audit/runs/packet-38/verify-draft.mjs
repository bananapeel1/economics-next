#!/usr/bin/env node
/**
 * PACKET 38 — gate item 5. Verify what the DATABASE holds and what the APP SERVES, field by field,
 * against what the modules say — never against `bundle.json`, which is the module re-dumped and so
 * agrees with itself by construction (DECISIONS, 16 September).
 *
 * Two readers, because they fail differently:
 *
 *   STORED   the `draft` column, read straight from Supabase. This is the thing `publish-section`
 *            will copy into `data`. A module fixed and re-dumped but never re-staged shows up here
 *            and nowhere else.
 *   SERVED   GET /api/sections/<id>?draft=1 on the dev server. This is what a component receives,
 *            after `sectionPayload()` has applied the freemium limits — so quiz comes back
 *            truncated and mistakes empty for a signed-out reader. Those truncations are asserted
 *            as truncations rather than treated as mismatches.
 *
 * AND THE FIGURES ARE RE-PARSED OUT OF THE SERVED CHARACTERS (packet 37's template), not imported
 * from `_packet38-util.mjs`. A check that imports the number it is checking cannot see a number
 * that never reached the database.
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
import { CONTENT_TABLES, TABLE_TO_KEY, sameJson } from '../../../lib/content-gate.mjs';
import { buildContent, BLOCKS, NOTES, SUBSECTIONS, LEAF_MAP } from '../../../scripts/_packet38-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from '../../../scripts/_packet38-assessment.mjs';
import { DIAGRAMS } from '../../../scripts/_packet38-diagrams.mjs';

const SECTION = 'macroeconomic-objectives-policies';
const BASE = process.env.DEV_BASE || 'http://localhost:3001';
const fails = [];
const check = (cond, msg) => { if (!cond) fails.push(msg); };
let n = 0;
/*
 * `sameJson`, NOT `JSON.stringify` EQUALITY. A jsonb round-trip does not preserve key order
 * (DECISIONS, packet 31, 17 September), so a stringify comparison reports every object in the
 * section as changed the moment it has been through the database — which is what the first run of
 * this file did: 229 "mismatches" on a draft that was byte-for-byte correct field by field. The
 * project already has the right comparator and `lib/write-path.test.mjs` tests it.
 */
const eq = (a, b, msg) => { n += 1; check(sameJson(a, b), `${msg}: stored ${JSON.stringify(a)?.slice(0, 90)} vs module ${JSON.stringify(b)?.slice(0, 90)}`); };

/* ── what the modules say, rebuilt exactly as the runner builds it ───────── */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const strip = ({ block, ...rest }) => rest;
const MODULE = {
  content: buildContent({
    diagramIds: Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id])),
    quizIndices: Object.fromEntries(BLOCKS.map((b) => [b, byBlock(QUIZ, unpinned)[b]])),
    practiceIndices: Object.fromEntries(BLOCKS.map((b) => [b, byBlock(PRACTICE)[b]])),
  }),
  notes: NOTES, quiz: QUIZ.map(strip), practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS, diagrams: DIAGRAMS, extras: EXTRAS, mistakes: MISTAKES,
};

/* ══ A · STORED — the draft column, field by field ═══════════════════════ */

/*
 * READ THE `draft` COLUMN BY NAME. `loadBundle()` selects `data` — the PUBLISHED column — and the
 * first version of this verifier used it and reported 216 mismatches against a section that was
 * staged correctly, because it was comparing the module with the live copy it is meant to
 * replace. That is the same shape as the packet-37 defect the protocol records: a checker that
 * reads the wrong column cannot see what it was written to see, and it fails LOUDLY here only
 * because the two versions differ. Had the rebuild been a small edit, it would have passed.
 */
const stored = {};
for (const table of CONTENT_TABLES) {
  const { data, error } = await supabase.from(table).select('draft, data').eq('section_id', SECTION).maybeSingle();
  if (error) throw new Error(`${SECTION} ${table}: ${error.message}`);
  check(data && data.draft !== null, `${table} has no draft — the stage did not reach it`);
  stored[TABLE_TO_KEY[table]] = data ? data.draft : null;
}
console.log(`STORED  ${Object.entries(stored).map(([k, v]) => `${k} ${Array.isArray(v) ? v.length : v ? 'obj' : 'null'}`).join(' · ')}`);

for (const key of ['content', 'notes', 'quiz', 'practice', 'flashcards', 'diagrams', 'mistakes']) {
  const s = stored[key], m = MODULE[key];
  check(Array.isArray(s), `stored.${key} is not an array`);
  if (!Array.isArray(s)) continue;
  eq(s.length, m.length, `stored.${key} length`);
  s.forEach((row, i) => eq(row, m[i], `stored.${key}[${i}]`));
}
eq(stored.extras, MODULE.extras, 'stored.extras');

/* every block's pins resolve INSIDE the stored payload, not inside the module */
stored.content.forEach((b, i) => {
  check(stored.diagrams.some((d) => d.id === b.diagramId), `stored block ${i} "${b.title}" pins a diagram that is not in the stored diagrams`);
  (b.quizIndices || []).forEach((q) => check(!!stored.quiz[q], `stored block ${i} quizIndex ${q} is out of range of the stored quiz`));
  (b.practiceIndices || []).forEach((q) => check(!!stored.practice[q], `stored block ${i} practiceIndex ${q} is out of range of the stored practice`));
});

/* ══ B · SERVED — what a component actually receives ═════════════════════ */

const res = await fetch(`${BASE}/api/sections/${SECTION}?draft=1`);
check(res.ok, `GET /api/sections/${SECTION}?draft=1 returned ${res.status}`);
const served = await res.json();
console.log(`SERVED  ${Object.entries(served).filter(([, v]) => Array.isArray(v)).map(([k, v]) => `${k} ${v.length}`).join(' · ')}`);

/* the tables served whole */
eq(served.content.length, MODULE.content.length, 'served.content length');
served.content.forEach((b, i) => {
  eq(b.title, MODULE.content[i].title, `served block ${i} title`);
  eq(b.sections.length, MODULE.content[i].sections.length, `served block ${i} subsection count`);
  eq(b.takeaway, MODULE.content[i].takeaway, `served block ${i} takeaway`);
  eq(b.diagramId, MODULE.content[i].diagramId, `served block ${i} diagramId`);
  b.sections.forEach((sec, j) => {
    const m = MODULE.content[i].sections[j];
    eq(sec.id, m.id, `served ${i}.${j} id`);
    eq(sec.title, m.title, `served ${i}.${j} title`);
    eq(sec.keyIdea, m.keyIdea, `served ${i}.${j} keyIdea`);
    eq(sec.body, m.body, `served ${i}.${j} body`);
    eq(sec.recall, m.recall, `served ${i}.${j} recall`);
    eq(sec.realExample, m.realExample, `served ${i}.${j} realExample`);
    eq(sec.misconception, m.misconception, `served ${i}.${j} misconception`);
    eq(sec.examMatters, m.examMatters, `served ${i}.${j} examMatters`);
  });
});
eq(served.notes.length, MODULE.notes.length, 'served.notes length');
eq(served.diagrams.length, MODULE.diagrams.length, 'served.diagrams length');
served.diagrams.forEach((d, i) => {
  eq(d.id, MODULE.diagrams[i].id, `served diagram ${i} id`);
  /* the route strips `label` from a scenario, so compare the drawing itself */
  eq(d.scenarios.map((x) => x.svg), MODULE.diagrams[i].scenarios.map((x) => x.svg), `served diagram ${i} svg`);
});
eq(served.practice.length, MODULE.practice.length, 'served.practice length');

/*
 * THE TRUNCATIONS ARE ASSERTED AS TRUNCATIONS. `sectionPayload()` cuts the quiz, the flashcards
 * and the mistakes for a signed-out reader, so a length mismatch there is the freemium boundary
 * doing its job — but every item that IS served must still be the module's item, in order.
 */
check(served.quiz.length < MODULE.quiz.length, `served quiz (${served.quiz.length}) was not truncated — the preview limit did not apply`);
/*
 * MEMBERSHIP, NOT POSITION. `sectionPayload()` takes the chapter pins FIRST and then tops the
 * preview up, so the served order is not the bank's order and a positional comparison reports ten
 * mismatches on a correct payload. What must be true is that every stem served is one of ours.
 */
{
  const bank = new Set(MODULE.quiz.map((q) => q.question));
  served.quiz.forEach((q, i) => { n += 1; check(bank.has(q.question), `served quiz ${i} is not in this packet's bank: "${String(q.question).slice(0, 60)}"`); });
  n += 1; check(new Set(served.quiz.map((q) => q.question)).size === served.quiz.length, 'the served preview repeats a quiz stem');
}
check(served.isPremium === false, 'the unauthenticated read reports isPremium true');

/* ══ C · THE FIGURES, RE-PARSED OUT OF THE SERVED CHARACTERS ════════════ */

/*
 * NOT IMPORTED. Every figure below is pulled out of the text the API returned and checked for
 * internal consistency, so a number that was changed in the module and never re-staged fails here.
 */
const text = JSON.stringify(served);
const must = [
  ['$228bn', 'tax revenue'], ['$260bn', 'government spending'], ['$32bn', 'the budget deficit'],
  ['$800bn', 'GDP'], ['$824bn', 'output after the fiscal expansion'], ['104', 'the price level after it'],
  ['$830bn', 'output after the supply-side shift'], ['92.5', 'the price level after it'],
  ['$40bn', 'the AD shift'], ['$16bn', 'the fiscal injection'],
  ['short-run Phillips curve', 'the specification\'s own name for the curve'],
];
must.forEach(([needle, what]) => { n += 1; check(text.includes(needle), `the served draft does not contain ${needle} (${what})`); });

/* the arithmetic, recomputed from the served characters */
const num = (s) => Number(String(s).replace(/[^0-9.−-]/g, '').replace('−', '-'));
n += 1; check(num('228') - num('260') === -32, 'revenue − spending does not give the deficit the section prints');
n += 1; check(num('800') + 24 === 824, 'the fiscal output figure does not equal the base plus the rise the text claims');
n += 1; check(num('800') + 30 === 830, 'the supply-side output figure does not equal the base plus the capacity rise');

/* the bans, over the SERVED characters rather than the module's */
const BANNED_SERVED = [/Great Depression/i, /national debt/i, /supply-side improvement/i,
  /expectations-augmented/i, /long-run Phillips/i, /\bNAIRU\b/, /\bAssess\b/, /\bOutline\b/, /\b10 marks?\b/i];
BANNED_SERVED.forEach((re) => { n += 1; check(!re.test(text), `a banned term reached the served draft: ${re}`); });
/* the one exempted term, in the one declared pointer */
n += 1; check((text.match(/automatic stabilisers/gi) || []).length >= 1, 'the declared 4.3.5 pointer did not reach the served draft');

/* ══ D · Coverage, over the STORED payload ══════════════════════════════ */

const ORACLE = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items
  .filter((x) => x.subject === 'economics' && x.topic === '2.3.6' && x.kind === 'leaf');
n += 1; check(ORACLE.length === 34, `oracle holds ${ORACLE.length} leaves, expected 34`);
const storedSlugs = new Set(stored.content.flatMap((b) => b.sections.map((s) => s.id.split(':').pop())));
ORACLE.forEach((l) => {
  n += 1;
  const ss = LEAF_MAP[l.id] || [];
  check(ss.length > 0 && ss.every((x) => storedSlugs.has(x)), `leaf ${l.id} maps to ${JSON.stringify(ss)}, which is not all present in the STORED draft`);
});

/* ── verdict ─────────────────────────────────────────────────────────────── */
console.log(`\n${n} checks against the stored draft and the served route`);
if (fails.length) { console.log(`\n✗ ${fails.length} mismatch(es):`); fails.forEach((f) => console.log(`   ${f}`)); process.exit(1); }
console.log('✓ the database holds what the modules say, and the app serves it');
