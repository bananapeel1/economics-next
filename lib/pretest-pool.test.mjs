import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickPretestQuestions, PRETEST_MAX } from './pretest-pool.js';
import { freeQuizPayload } from './preview-limits.js';

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
