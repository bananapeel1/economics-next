import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseUnits, sectionsForUnits, buildFunPool, blackjackHref, DEFAULT_UNITS } from './fun-pool.js';
import { FUN_PROGRESS_SUBJECT_ID } from '../components/fun/constants.js';

/* The `units` and `sections` rows as the database holds them (26 Sep 2026), cut down to one section
   per unit. The ids are the real ones, and they are the trap: unit NUMBER 3 is id 6 for Business and
   id 10 for Economics, so a filter on number alone serves one subject the other's questions. */
const UNITS = [
  { id: 1, number: 1, subjects: { slug: 'economics' } },
  { id: 2, number: 2, subjects: { slug: 'economics' } },
  { id: 10, number: 3, subjects: { slug: 'economics' } },
  { id: 11, number: 4, subjects: { slug: 'economics' } },
  { id: 4, number: 1, subjects: { slug: 'business' } },
  { id: 5, number: 2, subjects: { slug: 'business' } },
  { id: 6, number: 3, subjects: { slug: 'business' } },
  { id: 7, number: 4, subjects: { slug: 'business' } },
];
const SECTIONS = [
  { id: 'introductory-concepts', title: 'Introductory Concepts', short_title: 'Intro', unit_id: 1 },
  { id: 'meeting-customer-needs', title: 'Meeting Customer Needs', short_title: 'Customer Needs', unit_id: 4 },
  { id: 'aggregate-demand', title: 'Aggregate Demand', short_title: 'AD', unit_id: 2 },
  { id: 'the-market', title: 'The Market', short_title: null, unit_id: 5 },
  { id: 'labour-markets', title: 'Labour Markets', short_title: 'Labour Markets', unit_id: 10 },
  { id: 'business-growth', title: 'Business Growth', short_title: 'Growth', unit_id: 6 },
  { id: 'trade-global-economy', title: 'Trade and the Global Economy', short_title: 'Trade', unit_id: 11 },
  { id: 'globalisation', title: 'Globalisation', short_title: 'Globalisation', unit_id: 7 },
];
const bank = (sectionId, n) => ({
  section_id: sectionId,
  data: Array.from({ length: n }, (_, i) => ({ id: `${sectionId}:${i}`, question: `Q${i}`, options: ['a', 'b'], correctIndex: 0 })),
});
const QUIZ = SECTIONS.map((s) => bank(s.id, 12));

test('progress keys are stated, not imported: Business is 2 here although it is 3 in `subjects`', () => {
  // Changing either number resets every player of that subject to level 1. See constants.js.
  assert.deepEqual(FUN_PROGRESS_SUBJECT_ID, { economics: 1, business: 2 });
});

test('parseUnits: no units means what Blackjack always played', () => {
  assert.deepEqual(DEFAULT_UNITS, [1, 2]);
  assert.deepEqual(parseUnits(null), [1, 2]);
  assert.deepEqual(parseUnits(undefined), [1, 2]);
  assert.deepEqual(parseUnits(''), [1, 2]);
});

test('parseUnits: sorted, de-duplicated, and anything outside 1-4 refused rather than guessed', () => {
  assert.deepEqual(parseUnits('3,1,3'), [1, 3]);
  assert.deepEqual(parseUnits(' 4 '), [4]);
  assert.deepEqual(parseUnits('1,2,3,4'), [1, 2, 3, 4]);
  for (const bad of ['0', '5', '1,5', 'x', '1,', '3.0', '12', 'all']) {
    assert.equal(parseUnits(bad), null, bad);
  }
});

test('sectionsForUnits: Units 3-4 reach the pool, for the right subject only', () => {
  const econ = sectionsForUnits(UNITS, SECTIONS, 'economics', [3, 4]);
  assert.deepEqual(econ.map((s) => s.id), ['labour-markets', 'trade-global-economy']);
  assert.deepEqual(econ.map((s) => s.unit), [3, 4]);

  const biz = sectionsForUnits(UNITS, SECTIONS, 'business', [3]);
  assert.deepEqual(biz, [{ id: 'business-growth', unit: 3, title: 'Growth' }]);
});

test('sectionsForUnits: grouped by unit, labelled by short title with the full title as fallback', () => {
  const all = sectionsForUnits(UNITS, SECTIONS, 'business', [4, 1, 2, 3]);
  assert.deepEqual(all.map((s) => s.unit), [1, 2, 3, 4]);
  assert.equal(all.find((s) => s.id === 'the-market').title, 'The Market');
});

test('sectionsForUnits: an unknown subject or no units is an empty pool, not every section', () => {
  assert.deepEqual(sectionsForUnits(UNITS, SECTIONS, 'geography', [1, 2, 3, 4]), []);
  assert.deepEqual(sectionsForUnits(UNITS, SECTIONS, 'economics', []), []);
  assert.deepEqual(sectionsForUnits(null, SECTIONS, 'economics', [1]), []);
});

test('buildFunPool: a paying student gets every question of every chosen section, labelled', () => {
  const sections = sectionsForUnits(UNITS, SECTIONS, 'economics', [1, 2, 3, 4]);
  const pool = buildFunPool(sections, QUIZ, { isPremium: true, previewLimit: 2 });
  assert.equal(pool.questions.length, 4 * 12);
  assert.equal(pool.totalAvailable, 4 * 12);
  const q = pool.questions.find((x) => x.sectionId === 'labour-markets');
  assert.equal(q.unit, 3);
  assert.equal(q.sectionTitle, 'Labour Markets');
  assert.equal(q.correctIndex, 0);
});

test('buildFunPool: a free account gets the same per-section preview however many units it picks', () => {
  for (const units of [[1], [1, 2], [3, 4], [1, 2, 3, 4]]) {
    const sections = sectionsForUnits(UNITS, SECTIONS, 'business', units);
    const pool = buildFunPool(sections, QUIZ, { isPremium: false, previewLimit: 2 });
    const perSection = new Map();
    for (const q of pool.questions) perSection.set(q.sectionId, (perSection.get(q.sectionId) || 0) + 1);
    assert.equal(perSection.size, sections.length, `units ${units}`);
    for (const [id, n] of perSection) assert.equal(n, 2, `${id} in units ${units}`);
    // And the preview is the start of each bank, as it was before units existed.
    assert.deepEqual(
      pool.questions.filter((q) => q.sectionId === sections[0].id).map((q) => q.id),
      [`${sections[0].id}:0`, `${sections[0].id}:1`],
    );
    assert.equal(pool.totalAvailable, sections.length * 12);
  }
});

test('buildFunPool: a section with no bank row, or a malformed one, adds nothing', () => {
  const sections = sectionsForUnits(UNITS, SECTIONS, 'economics', [3, 4]);
  const pool = buildFunPool(sections, [{ section_id: 'labour-markets', data: null }], { isPremium: true, previewLimit: 2 });
  assert.equal(pool.questions.length, 0);
  assert.equal(pool.totalAvailable, 0);
});

test('blackjackHref: the Quiz tab link opens on the unit just quizzed', () => {
  assert.equal(blackjackHref('WEC13'), '/fun?subject=economics&unit=3');
  assert.equal(blackjackHref('WBS14'), '/fun?subject=business&unit=4');
  assert.equal(blackjackHref('wbs11'), '/fun?subject=business&unit=1');
  for (const odd of [undefined, null, '', 'WEC15', 'WEC1', 'XYZ13', 'economics']) {
    assert.equal(blackjackHref(odd), '/fun', String(odd));
  }
});

/* Step 6 of the plan: the page and the route decide "is this student Pro?" the same way. They used
   not to, and each looked right on its own. So read both shipping files rather than trust either. */
/* Code only: the comments explaining why `.single()` went are allowed to name it. */
const readCode = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

test('the /fun page and /api/fun/questions use the same Pro check', () => {
  const PRO = /hasPremiumAccess\(sub\) \|\| user\.app_metadata\?\.role === 'admin'/;
  for (const file of ['app/fun/page.js', 'app/api/fun/questions/route.js']) {
    const src = readCode(file);
    assert.match(src, /getSubscriptionRow\(db, user\.id\)/, `${file} reads the row through getSubscriptionRow`);
    assert.match(src, PRO, `${file} counts admins as Pro`);
    assert.doesNotMatch(src, /\.single\(\)/, `${file} must not read the subscription with .single()`);
  }
});

test('the route serves the free preview at PREVIEW_LIMITS.quiz, not a number of its own', () => {
  const src = readCode('app/api/fun/questions/route.js');
  assert.match(src, /buildFunPool\(sections, data, \{ isPremium, previewLimit: PREVIEW_LIMITS\.quiz \}\)/);
});
