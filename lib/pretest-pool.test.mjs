import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickPretestQuestions, PRETEST_MAX } from './pretest-pool.js';
import { freeQuizPayload, PRETEST_HEADROOM } from './preview-limits.js';

const bank = (n) => Array.from({ length: n }, (_, i) => ({ id: `q:${i}`, question: `Q${i}` }));

test('a reserved question is never asked, even when that makes the pre-test short', () => {
  const quiz = bank(8);
  // the shape freeQuizPayload produces: two free items, then one per chapter
  const reserved = quiz.slice(2);
  const got = pickPretestQuestions(quiz, reserved);
  assert.deepEqual(got.map((q) => q.id), ['q:0', 'q:1'], 'two honest questions, not three with a spoiled one');
});

test('a full bank still gives three', () => {
  const quiz = bank(30);
  assert.equal(pickPretestQuestions(quiz, quiz.slice(10, 16)).length, PRETEST_MAX);
});

/* V021. PRETEST_MAX was typed `3` here and PRETEST_HEADROOM `3` in lib/preview-limits.js, in
   different modules, with nothing asserting they agree. They are one number seen from two sides:
   the headroom is how many unclaimed questions the payload keeps back, this is how many the
   pre-test may ask out of them. Raise this one alone and every pinned section promises three and
   asks three, of which the extra ones are questions its check-ins will ask again — silently,
   because the offer counts with the same function that picks them. */
test('the pre-test never asks for more than the payload keeps back', () => {
  assert.equal(PRETEST_MAX, 3);
  assert.equal(PRETEST_MAX, PRETEST_HEADROOM);
});

test('no unreserved question at all means no pre-test, not a spoiled one', () => {
  const quiz = bank(4);
  assert.deepEqual(pickPretestQuestions(quiz, quiz), []);
  assert.deepEqual(pickPretestQuestions([], []), []);
  assert.deepEqual(pickPretestQuestions(null, null), []);
});

test('questions are matched on collapsed whitespace, the way the callers build them', () => {
  const quiz = [{ id: 'a', question: 'What  is\nsupply?' }, { id: 'b', question: 'Other' }];
  assert.deepEqual(
    pickPretestQuestions(quiz, [{ question: 'What is supply?' }]).map((q) => q.id),
    ['b'],
  );
});

/* The regression itself, end to end: build the payload a signed-out student is sent, resolve each
   chapter's check-in question the way LearnModeTab does, and assert the pre-test shares none of
   them. Before V015 this returned one in common on 11 of 11 rewritten sections. */
test('a signed-out student is never asked a question their check-in will ask', () => {
  const quiz = bank(34);
  const content = [[4], [11], [14], [22], [29], [31]].map((quizIndices, i) => ({ title: `Ch${i}`, quizIndices }));
  const free = freeQuizPayload(quiz, content);

  const used = new Set();
  const reserved = free.content
    .map((b) => (b.quizIndices || []).find((x) => x < free.quiz.length && !used.has(x)))
    .filter((i) => i != null)
    .map((i) => { used.add(i); return free.quiz[i]; });

  const pre = pickPretestQuestions(free.quiz, reserved);
  assert.ok(pre.length >= 1, 'the student still gets a pre-test');
  const overlap = pre.filter((p) => reserved.some((r) => r.id === p.id));
  assert.deepEqual(overlap, [], 'nothing the pre-test asks is a check-in question');
});

/* V020. The test above is the one named after the V015 regression, and it could not see it: revert
   `pickPretestQuestions` to the pre-V015 padding algorithm — take the unreserved, then pad up to
   PRETEST_MAX out of the reserved set — and it PASSES. Measured, not assumed; only the three
   narrower unit tests failed. Its fixture has 34 questions for 6 chapters, so the headroom hands it
   three unreserved questions and the padding never runs. A guard that only fires when the defect
   cannot occur is not a guard.
 *
 * This is the same walk on a bank with nothing to spare: seven chapters, eight questions, so the
 * pre-test pool is ONE and any padding must come out of the check-ins. It is the shape live
 * sections reach as chapters are added, and it is where the student notices — the pre-test asks a
 * question and the chapter that follows reveals its answer. */
test('a pre-test with nothing spare stays short rather than borrowing a check-in question', () => {
  const quiz = bank(8);
  const content = Array.from({ length: 7 }, (_, i) => ({ title: `Ch${i}`, quizIndices: [i] }));
  const free = freeQuizPayload(quiz, content);

  const used = new Set();
  const reserved = free.content
    .map((b) => (b.quizIndices || []).find((x) => x < free.quiz.length && !used.has(x)))
    .filter((i) => i != null)
    .map((i) => { used.add(i); return free.quiz[i]; });
  assert.equal(reserved.length, 7, 'every chapter has its question');

  const pre = pickPretestQuestions(free.quiz, reserved);
  assert.equal(pre.length, 1, 'one honest question — the padding algorithm returns three here');
  assert.deepEqual(
    pre.filter((q) => reserved.some((r) => r.id === q.id)), [],
    'and none of them is a question a check-in will ask',
  );
});
