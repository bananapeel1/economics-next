// `npm test`. The Learn Mode step model, packet 5. These are the invariants the audit found
// broken: a recall shown twice in a row, a recall never shown, two headings per step, a step count
// the overview could not predict, and a saved pointer past the end.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { buildSteps, countSteps, pickSpacedRecall, spacedPermutation, clampStep, furthestStep, recallId, firstStepOfBlock } from './learn-steps.js';
import { reorderStartOrder } from './recall-widgets.js';

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
  assert.equal(third.id, 'b1:recall', 'V034: chapter A has already supplied one, so chapter B goes next');
  used.add(third.id);
  const fourth = pickSpacedRecall(steps, 8, used);
  assert.equal(fourth.id, 'a2:recall', 'every eligible chapter has now supplied one, so A is revisited, earliest first');
  used.add(fourth.id);
  assert.equal(pickSpacedRecall(steps, 8, used), null, 'c1 and c2 belong to the current chapter and must not be spaced here');
  assert.equal(pickSpacedRecall(steps, 4, used), null, 'a teach step never carries a spaced recall');
});

test('a skipped recall comes back at the next eligible check-in ahead of the default pick (F055)', () => {
  const steps = buildSteps(content);
  const used = new Set();
  // Chapter B's fill-in was skipped; chapter C's check-in would otherwise show a1 (the earliest).
  const pick = pickSpacedRecall(steps, 8, used, new Set(['b1:recall']));
  assert.equal(pick.id, 'b1:recall');
  assert.ok(pick.fromBlockIndex < steps[8].blockIndex, 'still from an earlier chapter');
  // A skipped recall from the CURRENT chapter is not eligible: the chapter rule wins.
  assert.equal(pickSpacedRecall(steps, 3, used, new Set(['a1:recall'])), null);
  // Once used it is not shown again; the default order resumes.
  used.add('b1:recall');
  assert.equal(pickSpacedRecall(steps, 8, used, new Set(['b1:recall'])).id, 'a1:recall');
});

test('spaced recalls spread across the earlier chapters instead of exhausting chapter 1 (V034)', () => {
  /*
   * The shape the corpus actually has: five chapters, and chapter 1 holds as many recalls as there
   * are spaced slots. Under the old rule ("the earliest unspaced recall") every slot came from
   * chapter 1 — measured on `financial-planning`, all four check-ins read "Recall from chapter 1",
   * and across the staged corpus 80% of spaced showings came from the first chapter.
   */
  const wide = [
    { title: 'Ch 1', sections: [sec('p1', fillin('p1')), sec('p2', fillin('p2')), sec('p3', fillin('p3')), sec('p4', fillin('p4'))] },
    { title: 'Ch 2', sections: [sec('q1', fillin('q1')), sec('q2', fillin('q2'))] },
    { title: 'Ch 3', sections: [sec('r1', fillin('r1')), sec('r2', fillin('r2'))] },
    { title: 'Ch 4', sections: [sec('s1', fillin('s1')), sec('s2', fillin('s2'))] },
    { title: 'Ch 5', sections: [sec('t1', fillin('t1'))] },
  ];
  const steps = buildSteps(wide);
  const used = new Set();
  const picks = [];
  steps.forEach((st, i) => {
    if (st.type !== 'checkin') return;
    const pick = pickSpacedRecall(steps, i, used);
    if (pick) { used.add(pick.id); picks.push(pick); }
  });
  assert.equal(picks.length, 4, 'four check-ins have an earlier chapter to draw from');
  assert.deepEqual(picks.map((p) => p.fromBlockIndex), [0, 1, 2, 3], 'one from each earlier chapter, oldest first');
  assert.deepEqual(picks.map((p) => p.id), ['p1:recall', 'q1:recall', 'r1:recall', 's1:recall']);
  // and the spacing rule itself still holds on every one of them
  for (const p of picks) assert.ok(p.fromBlockIndex < steps.findIndex((st) => st.type === 'checkin' && st.blockIndex === p.fromBlockIndex));
});

test('a chapter is only drawn from twice once every other eligible chapter has been drawn from (V034)', () => {
  /* The A/B for the rule above: with only ONE earlier chapter there is nothing to spread over, so
     the pick is still the earliest unused recall in it — the old behaviour, unchanged. */
  const narrow = [
    { title: 'Ch 1', sections: [sec('p1', fillin('p1')), sec('p2', fillin('p2')), sec('p3', fillin('p3'))] },
    { title: 'Ch 2', sections: [sec('q1', fillin('q1'))] },
    { title: 'Ch 3', sections: [sec('r1', fillin('r1'))] },
  ];
  const steps = buildSteps(narrow);
  const used = new Set();
  const ch2 = steps.findIndex((st) => st.type === 'checkin' && st.blockIndex === 1);
  const first = pickSpacedRecall(steps, ch2, used);
  assert.equal(first.id, 'p1:recall'); used.add(first.id);
  // chapter 3's check-in: chapters 1 and 2 are both eligible and chapter 1 has supplied one, so 2 goes
  const ch3 = steps.findIndex((st) => st.type === 'checkin' && st.blockIndex === 2);
  const second = pickSpacedRecall(steps, ch3, used);
  assert.equal(second.id, 'q1:recall'); used.add(second.id);
  // both have now supplied one; chapter 1 is oldest, so it is revisited before chapter 2 would be
  assert.equal(pickSpacedRecall(steps, ch3, used).id, 'p2:recall');
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
  assert.notDeepEqual(p, reorderStartOrder(r, 'first'), 'not the first-showing order');
  assert.notEqual(p[0], 0, 'the first item is not already in place');
  assert.ok(!p.every((v, i) => v === i), 'not the identity');
  assert.deepEqual(spacedPermutation(r), p, 'stable across renders');
  assert.deepEqual(spacedPermutation({ correctOrder: ['a', 'b'] }).sort(), [0, 1]);
  assert.deepEqual(spacedPermutation({ correctOrder: ['a'] }), [0]);
});

test('a saved pointer past the end is clamped, not shown as "Step 9 of 5"', () => {
  assert.equal(clampStep(8, 5), 4); assert.equal(clampStep(-1, 5), 0); assert.equal(clampStep(2.7, 5), 2);
  assert.equal(clampStep(NaN, 5), 0); assert.equal(clampStep(3, 0), 0);
});

test('the stored high-water mark is clamped too, so a poisoned row heals itself', () => {
  // The three shapes actually found in user_content_progress on 15 Sep 2026. Each is a pointer
  // written against a longer step list than the section now has; each used to survive for ever.
  assert.equal(furthestStep(20, 1, 9), 8, 'decision-making-techniques: step 20 of 9');
  assert.equal(furthestStep(9, 0, 6), 5, 'market-failure: step 9 of 6, six students');
  assert.equal(furthestStep(8, 3, 8), 7, 'price-determination: step 9 of 8, eight students');
  // and it still does the job it was written for
  assert.equal(furthestStep(3, 5, 20), 5, 'a step forward raises the mark');
  assert.equal(furthestStep(7, 2, 20), 7, 'a step back does not lower it');
  assert.equal(furthestStep(2, 2, 20, true), 19, 'completing the topic marks the last step');
  assert.equal(furthestStep(undefined, 0, 20), 0, 'the first write, with no row yet');
  assert.equal(furthestStep(5, 3, 0), 0, 'no steps to point at');
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

/* ── packet 13.2: the drills reach the student through the same paths as everything else ── */

const diagramRecall = (id) => ({ id: `${id}:recall`, type: 'diagram', specId: 'indirect-tax' });

test('a diagram recall is carried like any other, and comes back on the spaced pick', () => {
  const withDrill = [
    { title: 'Chapter A', takeaway: ['t'], sections: [sec('a1', diagramRecall('a1')), sec('a2', fillin('a2')), sec('a3')] },
    { title: 'Chapter B', takeaway: ['t'], sections: [sec('b1', fillin('b1'))] },
    { title: 'Chapter C', takeaway: ['t'], sections: [sec('c1', reorder('c1'))] },
  ];
  const steps = buildSteps(withDrill);

  const own = steps.find((s) => s.section?.recall?.type === 'diagram');
  assert.ok(own, 'the drawing drill appears on its own teach step');
  assert.equal(own.section.recall.specId, 'indirect-tax');

  // It is eligible for the spaced pick somewhere later in the section — the behaviour the packet
  // is for: the drill returns a few steps after the diagram was taught.
  const seen = [];
  for (let i = 0; i < steps.length; i += 1) {
    const pick = pickSpacedRecall(steps, i, new Set(), new Set());
    if (pick?.recall?.type === 'diagram') seen.push(i);
  }
  assert.ok(seen.length > 0, 'a diagram recall is offered as a spaced check-in at least once');
  assert.ok(seen.every((i) => i > steps.indexOf(own)), 'never before the step that taught it');
});

test('a chapter carries its quantitative templates onto the check-in', () => {
  const withQuant = [
    { title: 'Chapter A', takeaway: ['t'], quantIds: ['breakeven', 'ped'], sections: [sec('a1'), sec('a2')] },
  ];
  const steps = buildSteps(withQuant);
  const checkin = steps.find((s) => s.type === 'checkin');
  assert.deepEqual(checkin.quantIds, ['breakeven', 'ped'], 'the check-in carries the chapter quant pins');
  assert.equal(steps.find((s) => s.type === 'teach').quantIds, undefined, 'a teach step does not');
});
