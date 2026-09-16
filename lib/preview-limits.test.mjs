import { test } from 'node:test';
import assert from 'node:assert/strict';
import { freeQuizPayload, FREE_QUIZ_MAX, PREVIEW_LIMITS, PRETEST_HEADROOM } from './preview-limits.js';

/* A bank of n questions with stable ids, and blocks that pin by array position — the shape the
   section template authors (packet 14 onward) and the shape that breaks under a naive slice. */
const bank = (n) => Array.from({ length: n }, (_, i) => ({ id: `q:${i}`, question: `Q${i}` }));
const block = (title, quizIndices) => ({ title, quizIndices });

/* Resolve the way components/LearnModeTab.jsx resolves: pins are read against the array the API
   sent, first unused wins. If this test's copy and that component ever disagree, this test is the
   one that is wrong. */
function resolve(quiz, content) {
  const byId = new Map(quiz.map((q, i) => [q && q.id, i]));
  const used = new Set();
  return content.map((b) => {
    const ids = Array.isArray(b.quizIds) && b.quizIds.length ? b.quizIds : null;
    const idxs = Array.isArray(b.quizIndices) ? b.quizIndices : null;
    if (ids) {
      for (const id of ids) {
        const i = byId.get(id);
        if (i != null && !used.has(i)) { used.add(i); return quiz[i]; }
      }
      return null;
    }
    if (idxs) {
      const i = idxs.find((x) => x >= 0 && x < quiz.length && !used.has(x));
      if (i != null) { used.add(i); return quiz[i]; }
    }
    return null;
  });
}

test('every chapter still resolves its own question after the payload is cut down', () => {
  const quiz = bank(32);
  const content = [
    block('Ch1', [4, 3, 5]),
    block('Ch2', [11, 8, 9]),
    block('Ch3', [14, 15]),
    block('Ch4', [22, 21]),
    block('Ch5', [29, 30, 31]),
  ];
  const free = freeQuizPayload(quiz, content);
  const got = resolve(free.quiz, free.content);
  assert.equal(got.filter(Boolean).length, 5, 'all five chapters resolve');
  // and they resolve to the questions the author pinned first, not to whatever landed at that index
  assert.deepEqual(got.map((q) => q.id), ['q:4', 'q:11', 'q:14', 'q:22', 'q:29']);
});

test('a flat slice loses every chapter pinned past the cut', () => {
  const quiz = bank(32);
  const content = [block('Ch1', [4, 3]), block('Ch2', [11, 8]), block('Ch3', [29, 30])];
  const flat = resolve(quiz.slice(0, 8), content);
  assert.equal(flat.filter(Boolean).length, 1, 'only the chapter pinned inside the first 8 survives');
  assert.equal(flat[2], null, 'the chapter pinned at 29 gets nothing');
});

test('sending the right questions without remapping would point chapters at the wrong ones', () => {
  const quiz = bank(32);
  const content = [block('Ch1', [4, 3]), block('Ch2', [11, 8]), block('Ch3', [29, 30])];
  const free = freeQuizPayload(quiz, content);
  // the same payload, but with the pins as authored: this is the trap the remap exists to avoid
  const naive = resolve(free.quiz, content);
  assert.notDeepEqual(naive.map((q) => q && q.id), ['q:4', 'q:11', 'q:29']);
  const remapped = resolve(free.quiz, free.content);
  assert.deepEqual(remapped.map((q) => q.id), ['q:4', 'q:11', 'q:29']);
});

test('the Quiz tab preview comes first and is unchanged', () => {
  const quiz = bank(25);
  const free = freeQuizPayload(quiz, [block('Ch1', [9])]);
  assert.deepEqual(free.quiz.slice(0, PREVIEW_LIMITS.quiz).map((q) => q.id), ['q:0', 'q:1']);
});

test('exposure is bounded however many chapters pin', () => {
  const quiz = bank(60);
  const content = Array.from({ length: 30 }, (_, i) => block(`Ch${i}`, [i + 5]));
  const free = freeQuizPayload(quiz, content);
  assert.ok(free.quiz.length <= FREE_QUIZ_MAX, `sent ${free.quiz.length}, max ${FREE_QUIZ_MAX}`);
  // a chapter that could not be served says so, rather than pointing at someone else's question
  const got = resolve(free.quiz, free.content);
  const served = got.filter(Boolean);
  assert.ok(served.length <= FREE_QUIZ_MAX);
  assert.equal(new Set(served.map((q) => q.id)).size, served.length, 'no question serves two chapters');
});

test('id pins are left alone, because they survive a slice', () => {
  const quiz = bank(20);
  const content = [{ title: 'Ch1', quizIds: ['q:12', 'q:13'] }];
  const free = freeQuizPayload(quiz, content);
  assert.deepEqual(free.content[0].quizIds, ['q:12', 'q:13'], 'pins untouched');
  assert.ok(free.quiz.some((q) => q.id === 'q:12'), 'and the pinned question is in the payload');
  assert.equal(resolve(free.quiz, free.content)[0].id, 'q:12');
});

test('a block with no pins, and a section with no quiz, are left as they are', () => {
  const content = [{ title: 'Ch1' }];
  assert.deepEqual(freeQuizPayload([], content), { quiz: [], content });
  const free = freeQuizPayload(bank(5), content);
  assert.deepEqual(free.content, content, 'an unpinned block is not rewritten');
  // the tab's two, plus the headroom the pre-test needs
  assert.equal(free.quiz.length, PREVIEW_LIMITS.quiz + PRETEST_HEADROOM);
});

/* V015. Without this the pre-test has nothing to ask on a section whose pins claim the whole
   payload — 22 of the 43 live sections, because their pins are 0,1,2… in block order. */
test('the payload keeps back questions no chapter claimed, for the pre-test', () => {
  const quiz = bank(20);
  // pins 0..5: the identity pattern that claims the tab preview itself
  const content = Array.from({ length: 6 }, (_, i) => block(`Ch${i}`, [i]));
  const free = freeQuizPayload(quiz, content);

  const claimed = new Set(free.content.map((b) => b.quizIndices[0]).filter((i) => i != null));
  const spare = free.quiz.filter((_, i) => !claimed.has(i));
  assert.equal(spare.length, PRETEST_HEADROOM, 'three questions nobody will ask again');
  assert.ok(free.quiz.length <= FREE_QUIZ_MAX, `sent ${free.quiz.length}, max ${FREE_QUIZ_MAX}`);
  // and the tab preview is still the first two, unmoved
  assert.deepEqual(free.quiz.slice(0, PREVIEW_LIMITS.quiz).map((q) => q.id), ['q:0', 'q:1']);
});

test('the headroom never pushes the payload past the cap', () => {
  const quiz = bank(60);
  const content = Array.from({ length: 30 }, (_, i) => block(`Ch${i}`, [i + 5]));
  assert.ok(freeQuizPayload(quiz, content).quiz.length <= FREE_QUIZ_MAX);
});

test('a bank with nothing spare simply has no headroom, and does not repeat itself', () => {
  const quiz = bank(4);
  const content = Array.from({ length: 4 }, (_, i) => block(`Ch${i}`, [i]));
  const free = freeQuizPayload(quiz, content);
  assert.equal(new Set(free.quiz.map((q) => q.id)).size, free.quiz.length, 'no duplicates');
  assert.ok(free.quiz.length <= quiz.length);
});
