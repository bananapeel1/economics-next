// `npm test`. The Learn Mode step model, packet 5. These are the invariants the audit found
// broken: a recall shown twice in a row, a recall never shown, two headings per step, a step count
// the overview could not predict, and a saved pointer past the end.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { buildSteps, countSteps, pickSpacedRecall, spacedPermutation, clampStep, recallId, firstStepOfBlock } from './learn-steps.js';

const sec = (id, recall) => ({ id, title: `Title ${id}`, keyIdea: 'k', body: [{ type: 'paragraph', text: 'p' }], recall });
const reorder = (id) => ({ id: `${id}:recall`, type: 'reorder', prompt: 'Order', correctOrder: ['a', 'b', 'c', 'd'], shuffled: [2, 0, 3, 1] });
const fillin = (id) => ({ id: `${id}:recall`, type: 'fillin', prompt: 'Fill', template: ['x ___'], answers: ['y'], hints: ['h'] });

const content = [
  { title: 'Chapter A', takeaway: ['t'], quizIndices: [0], sections: [sec('a1', reorder('a1')), sec('a2', fillin('a2')), sec('a3')] },
  { title: 'Chapter B', takeaway: ['t'], sections: [sec('b1', fillin('b1'))] },
  { title: 'Chapter C', takeaway: ['t'], sections: [sec('c1', reorder('c1')), sec('c2', reorder('c2'))] },
];

test('one subsection per teach step, one check-in per chapter, in order', () => {
  const steps = buildSteps(content);
  assert.deepEqual(steps.map((s) => s.type), ['teach', 'teach', 'teach', 'checkin', 'teach', 'checkin', 'teach', 'teach', 'checkin']);
  assert.equal(countSteps(content), 9);
  assert.equal(steps[0].partCount, 3); assert.equal(steps[2].isLastInBlock, true); assert.equal(steps[4].isFirstInBlock, true);
  assert.equal(steps[3].quizIndices[0], 0, 'the check-in carries the chapter pins');
  assert.equal(firstStepOfBlock(steps, 2), 6);
});

test('every recall is shown on its own teach step exactly once', () => {
  const steps = buildSteps(content);
  const own = steps.filter((s) => s.type === 'teach' && s.section.recall).map((s) => s.section.recall.id);
  assert.deepEqual(own, ['a1:recall', 'a2:recall', 'b1:recall', 'c1:recall', 'c2:recall']);
});

test('a spaced recall comes from an earlier chapter, never the current one, and each is spaced at most once', () => {
  const steps = buildSteps(content);
  const used = new Set();
  const first = pickSpacedRecall(steps, 3, used);
  assert.equal(first, null, 'the first chapter has nothing earlier to space');
  const second = pickSpacedRecall(steps, 5, used);
  assert.equal(second.id, 'a1:recall'); assert.equal(second.fromBlockIndex, 0); assert.ok(5 - second.fromStep >= 2);
  used.add(second.id);
  const third = pickSpacedRecall(steps, 8, used);
  assert.equal(third.id, 'a2:recall', 'the next unspaced recall, in order');
  used.add(third.id);
  const fourth = pickSpacedRecall(steps, 8, used);
  assert.equal(fourth.id, 'b1:recall');
  used.add(fourth.id);
  assert.equal(pickSpacedRecall(steps, 8, used), null, 'c1 and c2 belong to the current chapter and must not be spaced here');
  assert.equal(pickSpacedRecall(steps, 4, used), null, 'a teach step never carries a spaced recall');
});

test('the immediate showing and the spaced showing are never adjacent steps', () => {
  const steps = buildSteps(content);
  for (let i = 0; i < steps.length; i += 1) {
    const pick = pickSpacedRecall(steps, i, new Set());
    if (pick) assert.ok(i - pick.fromStep >= 2, `spaced recall on step ${i} came from step ${pick.fromStep}`);
  }
});

test('a reorder shown the second time starts from a different order, stably', () => {
  const r = reorder('x');
  const p = spacedPermutation(r);
  assert.deepEqual([...p].sort(), [0, 1, 2, 3], 'a permutation');
  assert.notDeepEqual(p, r.shuffled, 'not the stored first-showing order');
  assert.ok(!p.every((v, i) => v === i), 'not the identity');
  assert.deepEqual(spacedPermutation(r), p, 'stable across renders');
  assert.deepEqual(spacedPermutation({ correctOrder: ['a', 'b'] }).sort(), [0, 1]);
  assert.deepEqual(spacedPermutation({ correctOrder: ['a'] }), [0]);
});

test('a saved pointer past the end is clamped, not shown as "Step 9 of 5"', () => {
  assert.equal(clampStep(8, 5), 4); assert.equal(clampStep(-1, 5), 0); assert.equal(clampStep(2.7, 5), 2);
  assert.equal(clampStep(NaN, 5), 0); assert.equal(clampStep(3, 0), 0);
});

test('legacy blocks and empty input are handled', () => {
  assert.deepEqual(buildSteps(null), []);
  assert.deepEqual(buildSteps([]), []);
  const steps = buildSteps([{ title: 'Old', concepts: [{ title: 'c' }] }, { title: 'New', sections: [sec('n1')] }]);
  assert.deepEqual(steps.map((s) => s.type), ['legacy', 'teach', 'checkin']);
  assert.equal(recallId({ type: 'fillin' }, steps[1]), 'teach:n1:recall');
});

test('over the 43 live sections: steps = subsections + chapters, and no spaced pick is ever from the current chapter', () => {
  let sections = 0;
  for (const f of readdirSync('audit/content-sections')) {
    const d = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8'));
    const content = Array.isArray(d.content) ? d.content : [];
    if (!content.length) continue;
    sections += 1;
    const steps = buildSteps(content);
    const subs = content.reduce((n, b) => n + (Array.isArray(b.sections) ? b.sections.filter(Boolean).length : 0), 0);
    const chapters = content.filter((b) => Array.isArray(b.sections)).length;
    const legacy = content.filter((b) => !Array.isArray(b.sections)).length;
    assert.equal(steps.length, subs + chapters + legacy, `${f}: step count`);
    const used = new Set();
    steps.forEach((s, i) => {
      if (s.type !== 'checkin') return;
      const pick = pickSpacedRecall(steps, i, used);
      if (!pick) return;
      assert.ok(pick.fromBlockIndex < s.blockIndex, `${f}: spaced recall on step ${i} is from the current chapter`);
      assert.ok(i - pick.fromStep >= 2, `${f}: spaced recall on step ${i} is adjacent to its first showing`);
      used.add(pick.id);
    });
  }
  assert.ok(sections >= 40, `only ${sections} sections read`);
});
