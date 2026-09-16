import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/*
 * The mirror of lib/write-path.test.mjs, on the read side.
 *
 * V007: both topic pages and the homepage read all four paid tables with the anonymous key and
 * put the result in the HTML of a document that is built once and served to everyone. The Quiz tab
 * sliced to two in the browser, so it looked gated; the completion screen's drill offered the whole
 * bank, which is how it was found.
 *
 * Closing it once is not enough. The next page that wants a quiz count will reach for the anon
 * client again, and nothing about that will look wrong in review. So: only the entitled route may
 * read a paid table, and it reads with the service role, after checking the subscription.
 */
const PAID_TABLES = ['section_quiz', 'section_flashcards', 'section_common_mistakes', 'section_extras'];

/* Allowed readers, each with the reason it is allowed.
   A route only earns a place here by checking entitlement itself. */
const ALLOWED = new Map([
  ['app/api/sections/[id]/route.js', 'the entitled route: service role, checks the subscription'],
  ['app/api/practice/questions/route.js', 'Smart Practice: service role, signed-in, caps a free reader (F086)'],
  ['app/api/flashcards-practice/cards/route.js', 'flashcard practice: service role, signed-in, capped (F120)'],
  ['app/api/practice/progress-summary/route.js', 'counts only, service role, signed-in'],
  ['app/api/flashcards-practice/progress-summary/route.js', 'counts only, service role, signed-in'],
  ['app/api/progress/dashboard/route.js', 'counts only, service role, signed-in'],
  ['app/api/fun/questions/route.js', 'Blackjack: service role, checks premium (V007)'],
  ['app/api/admin/sections/[id]/[type]/route.js', 'admin editor, service role, admin-only'],
  ['app/admin/sections/[id]/page.js', 'admin editor, service role, admin-only'],
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(js|jsx|mjs)$/.test(name)) out.push(full);
  }
  return out;
}

const files = ['app', 'lib', 'components'].flatMap((d) => walk(d));

test('no file outside the entitled routes reads a paid content table', () => {
  const offenders = [];
  for (const f of files) {
    if (f.endsWith('.test.mjs')) continue;
    const src = readFileSync(f, 'utf8');
    const hit = PAID_TABLES.filter((t) => new RegExp(`from\\(['"\`]${t}['"\`]\\)`).test(src));
    if (hit.length && !ALLOWED.has(f)) offenders.push(`${f} reads ${hit.join(', ')}`);
  }
  assert.deepEqual(offenders, [], `a paid table is read outside the entitled routes:\n  ${offenders.join('\n  ')}`);
});

test('no allowed reader of a paid table uses the anonymous key', () => {
  const offenders = [];
  for (const f of ALLOWED.keys()) {
    const src = readFileSync(f, 'utf8');
    if (/createAnonClient/.test(src)) offenders.push(f);
  }
  assert.deepEqual(offenders, [], 'the anon key cannot check entitlement, and RLS will refuse it');
});

test('the cached pages read only the free surfaces', () => {
  for (const f of ['app/economics/[unit]/[topic]/page.jsx', 'app/business/[unit]/[topic]/page.jsx', 'app/page.js']) {
    const src = readFileSync(f, 'utf8');
    for (const t of PAID_TABLES) {
      assert.ok(
        !new RegExp(`from\\(['"\`]${t}['"\`]\\)`).test(src),
        `${f} reads ${t}; a document served to everyone may only hold the free preview`,
      );
    }
  }
});
