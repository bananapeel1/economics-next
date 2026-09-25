/**
 * The attribution guard's own tests.
 *
 * Three fixtures and one control, plus two tests that feed the RULE synthetic input, because the
 * FAIL tier is unreachable through current placement by design — an unpinned section serves nothing
 * and `fallbackItemForBlock` cannot return an item with no shared word. It is a regression detector,
 * so the test that matters most is the one proving it fires on the placement that actually shipped.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { judgeServed } from './checkin-attribution.mjs';
import { distributeItems } from '../../components/learn-mode/utils.js';
import { buildSteps } from '../../lib/learn-steps.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const GUARD = path.join(ROOT, 'audit/scripts/checkin-attribution.mjs');
const FIX = path.join(ROOT, 'audit/fixtures/checkin-attribution');

function runFixture(name) {
  try {
    const stdout = execFileSync(process.execPath,
      [GUARD, '--fixture', path.join(FIX, `${name}.json`), '--check', '--json'],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return { code: 0, json: JSON.parse(stdout.slice(stdout.indexOf('{'))) };
  } catch (err) {
    const out = err.stdout || '';
    return { code: err.status ?? 1, json: out.includes('{') ? JSON.parse(out.slice(out.indexOf('{'))) : { failures: [] } };
  }
}

test('the clean fixture passes: every pinned item shares vocabulary with its chapter', () => {
  const { code, json } = runFixture('clean');
  assert.equal(code, 0, JSON.stringify(json.failures));
  assert.deepEqual(json.failures, []);
});

test('a wholly unpinned section serves NOTHING rather than an arbitrary item', () => {
  // The fix. Its banks are deliberately about a later chapter, so positional placement would
  // serve a horizontal-integration question under "Business Objectives" — the reported defect.
  const { code, json } = runFixture('unpinned');
  assert.equal(code, 0);
  assert.deepEqual(json.failures, []);
});

test('a pin to another chapter is NOTED, not failed — an author may be right where vocabulary misses', () => {
  const { code, json } = runFixture('mispinned');
  assert.equal(code, 0, 'a pinned mismatch must not fail the build');
  assert.deepEqual(json.failures, []);
});

test('the rule FAILS on an unpinned served item that shares no word with its chapter', () => {
  const { failures, notes } = judgeServed([
    { kind: 'quiz', block: 'Business Objectives', pinned: false,
      item: { question: 'Which of the following best describes horizontal integration?' } },
  ], 'synthetic');
  assert.equal(failures.length, 1, 'the FAIL tier must fire');
  assert.equal(failures[0].rule, 'attribution');
  assert.equal(notes.length, 0);
});

test('the rule would have caught the defect that shipped: positional placement on the real section', () => {
  // Not a restatement of the rule — the actual live section, placed the OLD way, judged by the new
  // rule. If this ever stops failing, either the corpus changed or the rule has been weakened.
  const file = path.join(ROOT, 'audit/content-sections/economics__types-sizes-businesses.json');
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const steps = buildSteps(j.content) || [];
  const slots = steps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
  const positional = distributeItems(j.quiz, slots.length);
  const served = slots.map(({ s }, k) => ({ kind: 'quiz', block: s.blockTitle, pinned: false, item: positional[k] }))
    .filter((r) => r.item);
  const { failures } = judgeServed(served, 'types-sizes-businesses');
  assert.ok(failures.length >= 3,
    `expected the old placement to be caught on most chapters, got ${failures.length}`);
  // `detail` truncates the question at 56 characters, which cuts "horizontal integra|tion" — match
  // the part that survives rather than the phrase, or this asserts against the formatter.
  assert.ok(failures.some((f) => f.detail.includes('horizontal')),
    `the reported question must be among them: ${JSON.stringify(failures.map((f) => f.detail))}`);
  assert.ok(failures.some((f) => f.block === 'Business Objectives'),
    'the chapter the reader was actually on must be one of the failures');
});
