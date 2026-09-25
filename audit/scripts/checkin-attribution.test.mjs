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

/* Packet 2.91, V056 — the diagram door. The word rule above cannot see it: the matcher never places
   a diagram without a shared title word, so every title-matched diagram passes it. The guard judges
   whether an AUTHOR placed the diagram, from `placeChapterItems`' own `diagramHow`. */
import { placeChapterItems } from '../../lib/checkin-placement.js';

test('a diagram placed by a title match FAILS in a corpus that must decide (the 3.3.1 shape)', () => {
  const { code, json } = runFixture('undecided-diagram');
  assert.equal(code, 1, 'the staged corpus and fixtures are strict');
  assert.equal(json.failures.length, 1, JSON.stringify(json.failures));
  assert.equal(json.failures[0].rule, 'diagram-undecided');
  assert.equal(json.failures[0].block, 'Types of Business Organisation', 'the chapter before the one that teaches integration');
});

test('the same section with the diagram pinned, and the other chapter decided none, passes', () => {
  const { code, json } = runFixture('diagram-pinned');
  assert.equal(code, 0, JSON.stringify(json.failures));
});

test('excluding a chapter does not turn a guess elsewhere into a decision', () => {
  // Decide chapter 1 shows none but leave chapter 2 unpinned: the matcher now puts the diagram on
  // chapter 2 — the right chapter, by luck of one word — and it is still a guess.
  const f = JSON.parse(fs.readFileSync(path.join(FIX, 'diagram-pinned.json'), 'utf8')).sections[0];
  f.content[1] = { ...f.content[1] };
  delete f.content[1].diagramId;
  const steps = buildSteps(f.content);
  const { diagramMap, diagramHow } = placeChapterItems({ flatSteps: steps, contentData: f.content, diagramsData: f.diagrams, quizData: f.quiz, practiceData: [] });
  const served = steps.map((s, i) => ({ s, i })).filter(({ s, i }) => s.type === 'checkin' && diagramMap[i])
    .map(({ s, i }) => ({ kind: 'diagram', block: s.blockTitle, item: diagramMap[i], pinned: diagramHow[i] === 'pin', how: diagramHow[i] }));
  assert.deepEqual(served.map((r) => r.block), ['Growth of Firms'], 'CONTROL: the null moved the guess to chapter 2');
  const { failures } = judgeServed(served, 'synthetic');
  assert.equal(failures.length, 1);
  assert.equal(failures[0].rule, 'diagram-undecided');
});

test('on live the rule LISTS rather than fails: only a publish changes live', () => {
  const served = [{ kind: 'diagram', block: 'Types of Business Organisation', how: 'title', pinned: false,
    item: { id: 'd', title: 'Types of Business Growth (Integration)' } }];
  const live = judgeServed(served, 'synthetic', { strict: false });
  assert.equal(live.failures.length, 0);
  assert.equal(live.undecided.length, 1);
  const staged = judgeServed(served, 'synthetic', { strict: true });
  assert.equal(staged.failures.length, 1);
});

test('the diagram rule catches the placement that shipped on 3.3.1, which the word rule passes', () => {
  // The real section as it was on 11 September, placed by today's code. This is the V056 report:
  // chapter 2 "Types of Business Organisation" shows the integration diagram.
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/content-sections/economics__types-sizes-businesses.json'), 'utf8'));
  const steps = buildSteps(j.content) || [];
  const { diagramMap, diagramHow } = placeChapterItems({ flatSteps: steps, contentData: j.content, diagramsData: j.diagrams, quizData: j.quiz, practiceData: j.practice });
  const served = steps.map((s, i) => ({ s, i })).filter(({ s, i }) => s.type === 'checkin' && diagramMap[i])
    .map(({ s, i }) => ({ kind: 'diagram', block: s.blockTitle, item: diagramMap[i], pinned: diagramHow[i] === 'pin', how: diagramHow[i] }));
  const integration = served.find((r) => /Integration/.test(r.item.title));
  assert.equal(integration?.block, 'Types of Business Organisation', 'the defect as reported');
  // Why the diagram rule exists: the word rule alone passes it, because the matcher needs a shared word.
  const wordOnly = judgeServed(served.map((r) => ({ ...r, how: 'pin' })), 'types-sizes-businesses');
  assert.equal(wordOnly.failures.length, 0, 'the word rule cannot see it');
  const { failures } = judgeServed(served, 'types-sizes-businesses');
  assert.ok(failures.some((f) => f.rule === 'diagram-undecided' && f.block === 'Types of Business Organisation'));
});
