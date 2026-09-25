// `npm test`. The recall contract, packet 7: the ordering, parsing and grading every widget relies on.
// Each test names the audit finding it guards.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import {
  reorderStartOrder, gradeReorder, moveWithLocks, nextFreeSlot,
  parseFillinTemplate, hintLeaks, displayHint, pickDistractors, fillinChips, gradeFillin,
  matchChips, gradeMatch, classifyItems, gradeClassify, recallSize, partialLine, seededPermutation,
} from './recall-widgets.js';

const reorder = (id, n = 4) => ({ id, type: 'reorder', prompt: 'Order, from cause to effect:', correctOrder: Array.from({ length: n }, (_, i) => `step ${i + 1}`) });

test('F113: the start order is never the answer, never has the first item in place, and differs per recall', () => {
  const seen = new Set();
  for (let k = 0; k < 200; k += 1) {
    const r = reorder(`r${k}`);
    const p = reorderStartOrder(r, 'first');
    assert.deepEqual([...p].sort(), [0, 1, 2, 3]);
    assert.ok(!p.every((v, i) => v === i), 'identity');
    assert.notEqual(p[0], 0, 'first item already in place');
    seen.add(p.join(','));
  }
  assert.ok(seen.size >= 8, `only ${seen.size} distinct orders across 200 recalls; the six memorisable patterns are back`);
  assert.deepEqual(reorderStartOrder(reorder('same')), reorderStartOrder(reorder('same')), 'stable for the same recall');
});

test('F053: the spaced showing is a different puzzle from the first, for every size 3 to 5', () => {
  for (const n of [3, 4, 5]) for (let k = 0; k < 50; k += 1) {
    const r = reorder(`s${n}-${k}`, n);
    const a = reorderStartOrder(r, 'first'); const b = reorderStartOrder(r, 'spaced');
    assert.notDeepEqual(a, b, `${n} items, recall ${k}`);
    assert.notEqual(b[0], 0);
  }
  assert.deepEqual(reorderStartOrder({ correctOrder: ['a', 'b'] }, 'spaced'), [1, 0]);
  assert.deepEqual(reorderStartOrder({ correctOrder: ['a'] }), [0]);
});

test('seededPermutation honours a rejection rule and never returns the same reference twice', () => {
  const p = seededPermutation(5, 'x', (q) => q[4] !== 4);
  assert.equal(p[4], 4);
  assert.deepEqual(seededPermutation(1, 'x'), [0]);
});

test('F056: grading is position-exact with partial credit that counts near misses', () => {
  const co = ['a', 'b', 'c', 'd'];
  assert.deepEqual(gradeReorder(['a', 'b', 'c', 'd'], co), { results: [true, true, true, true], correct: 4, oneOff: 0, allCorrect: true });
  const g = gradeReorder(['b', 'a', 'c', 'd'], co);
  assert.equal(g.correct, 2); assert.equal(g.oneOff, 2); assert.equal(g.allCorrect, false);
  assert.equal(gradeReorder(['c', 'd', 'a', 'b'], co).oneOff, 0, 'everything two places off: no near miss');
  assert.equal(gradeReorder(['d', 'c', 'b', 'a'], co).oneOff, 2, 'b and c are one place from home');
  assert.equal(gradeReorder(['A ', 'b', ' c', 'd'], co).correct, 4, 'case and whitespace do not matter');
  assert.equal(partialLine('reorder', 2, 4, 2), '2 of 4 in the right position · 2 one place off');
  assert.equal(partialLine('fillin', 1, 3), '1 of 3 right');
});

test('F056: a retry keeps correct items locked in place and moves only the others', () => {
  const items = ['b', 'a', 'c', 'd'];
  const locked = [false, false, true, true];
  assert.deepEqual(moveWithLocks(items, locked, 0, 1), ['a', 'b', 'c', 'd']);
  assert.deepEqual(moveWithLocks(items, locked, 0, 2), items, 'a locked target is refused');
  assert.deepEqual(moveWithLocks(items, locked, 2, 0), items, 'a locked item does not move');
  assert.deepEqual(moveWithLocks(['x', 'L', 'y', 'z'], [false, true, false, false], 0, 3), ['y', 'L', 'z', 'x'], 'the locked slot keeps its item while the others rotate around it');
  assert.equal(nextFreeSlot([false, true, false], 0, 1), 2);
  assert.equal(nextFreeSlot([false, true, true], 0, 1), -1);
});

test('F051/F112: every segment of a multi-blank or adjacent-blank line is rendered, with a running blank index', () => {
  const t = parseFillinTemplate(['Opportunity cost is the value of the ___ ___ ___ forgone', 'PED = % change in ___ demanded / % change in ___', 'plain line']);
  assert.equal(t.blanks, 5);
  assert.deepEqual(t.lines[0].segments, [{ text: 'Opportunity cost is the value of the ' }, { blank: 0 }, { text: ' ' }, { blank: 1 }, { text: ' ' }, { blank: 2 }, { text: ' forgone' }]);
  assert.deepEqual(t.lines[1].segments.filter((s) => 'blank' in s).map((s) => s.blank), [3, 4]);
  assert.deepEqual(t.lines[1].segments.at(-1), { blank: 4 }, 'nothing after the last blank is lost');
  assert.deepEqual(t.lines[2].segments, [{ text: 'plain line' }]);
  assert.equal(parseFillinTemplate(['____ long underscores']).blanks, 1);
});

test('F050: a template whose blank count disagrees with its answers is still completable', () => {
  // More blanks than answers: only the answered blanks are graded.
  assert.deepEqual(gradeFillin(['a', 'b', 'zzz'], ['a', 'b']), { results: [true, true], correct: 2, allCorrect: true });
  // More answers than blanks: the spare answers are chips, never required.
  const chips = fillinChips({ id: 'm', type: 'fillin', template: ['one ___'], answers: ['x', 'y', 'z'] });
  assert.equal(chips.length, 3);
  assert.deepEqual(gradeFillin(['x'], ['x', 'y', 'z']), { results: [true], correct: 1, allCorrect: true });
  assert.equal(gradeFillin([], ['x']).allCorrect, false);
});

test('F054: a letter-prefix or length-revealing hint never reaches the screen; a semantic one does', () => {
  assert.equal(hintLeaks('Pr____', 'Profit'), true);
  assert.equal(hintLeaks('ab__', 'able'), true);
  assert.equal(hintLeaks('______', 'profit'), true, 'length reveal');
  assert.equal(hintLeaks('the reward for enterprise', 'profit'), false);
  assert.equal(displayHint('Pr____', 'Profit'), 'starts with "P"');
  assert.equal(displayHint('the reward for enterprise', 'profit'), 'the reward for enterprise');
  assert.equal(displayHint(null, 'profit'), 'starts with "p"');
});

test('F054: the chip bank is never a closed set — distractors are authored or drawn from the section', () => {
  const r = { id: 'd', type: 'fillin', template: ['Total ___ is overall satisfaction'], answers: ['utility'], hints: ['x'] };
  const pool = ['utility', 'Utility', 'satisfaction', 'diminishes', 'downward', 'elastic', ''];
  const picked = pickDistractors(r, pool);
  assert.equal(picked.length, 2);
  assert.ok(!picked.some((w) => w.toLowerCase() === 'utility'), 'an answer is never a distractor');
  assert.ok(!picked.includes('satisfaction'), 'a word printed in the template is never a distractor');
  assert.deepEqual(pickDistractors(r, pool), picked, 'stable');
  assert.deepEqual(pickDistractors({ ...r, distractors: ['welfare', 'utility', 'value'] }, pool), ['welfare', 'value'], 'authored distractors win, minus any that equal an answer');
  assert.deepEqual(pickDistractors(r, []), [], 'no pool, no invented words');
  const chips = fillinChips(r, pool);
  assert.equal(chips.length, 3);
  assert.equal(chips.filter((c) => c.isAnswer).length, 1);
});

test('W001: match chips carry every right plus the distractors, and grading is per pair', () => {
  const r = { id: 'm1', type: 'match', pairs: [{ left: 'Overdraft', right: 'Short-term gap' }, { left: 'Loan', right: 'Buying a van' }, { left: 'Shares', right: 'Long-term growth' }], distractors: ['Paying a dividend'] };
  const chips = matchChips(r);
  assert.equal(chips.length, 4);
  assert.notDeepEqual(chips.map((c) => c.text), ['Short-term gap', 'Buying a van', 'Long-term growth', 'Paying a dividend'], 'not shown in answer order');
  const byText = (t) => chips.find((c) => c.text === t).id;
  const g = gradeMatch([byText('Short-term gap'), byText('Paying a dividend'), byText('Long-term growth')], r, chips);
  assert.deepEqual(g.results, [true, false, true]); assert.equal(g.correct, 2); assert.equal(g.allCorrect, false);
  assert.equal(gradeMatch([byText('Short-term gap'), byText('Buying a van'), byText('Long-term growth')], r, chips).allCorrect, true);
  assert.equal(gradeMatch([null, null, null], r, chips).correct, 0);
  assert.notDeepEqual(matchChips(r, 'spaced').map((c) => c.text), chips.map((c) => c.text), 'a different order on the spaced showing');
});

test('W002: classify items are flattened with their home group, not shown grouped, and graded per item', () => {
  const r = { id: 'c1', type: 'classify', groups: [{ name: 'Fixed', items: ['Rent', 'Insurance'] }, { name: 'Variable', items: ['Materials', 'Packaging'] }] };
  const items = classifyItems(r);
  assert.equal(items.length, 4);
  assert.ok(!items.every((it, i) => i === 0 || it.group >= items[i - 1].group), 'the bank must not list the groups in order');
  const placed = {}; items.forEach((it) => { placed[it.id] = it.text === 'Rent' ? 1 : it.group; });
  const g = gradeClassify(placed, items);
  assert.equal(g.correct, 3); assert.equal(g.allCorrect, false);
  assert.equal(gradeClassify({}, items).correct, 0);
  assert.equal(recallSize(r), 4); assert.equal(recallSize({ type: 'match', pairs: [1, 2, 3] }), 3);
});

test('over the 43 live sections every reorder gets a legal start order and every fill-in parses with no lost text', () => {
  let reorders = 0; let fillins = 0;
  for (const f of readdirSync('audit/content-sections')) {
    const d = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8'));
    for (const b of d.content || []) for (const s of b.sections || []) {
      const r = s?.recall; if (!r) continue;
      if (r.type === 'reorder') {
        reorders += 1;
        const p = reorderStartOrder({ ...r, id: r.id || `${f}:${s.id}` });
        assert.deepEqual([...p].sort((a, b2) => a - b2), r.correctOrder.map((_, i) => i), `${f}/${s.id}: permutation`);
        assert.notEqual(p[0], 0, `${f}/${s.id}: first item in place`);
      }
      if (r.type === 'fillin') {
        fillins += 1;
        const t = parseFillinTemplate(r.template);
        const text = t.lines.map((l) => l.segments.map((seg) => ('blank' in seg ? '___' : seg.text)).join('')).join('\n');
        const original = r.template.map((l) => l.replace(/_{3,}/g, '___')).join('\n');
        assert.equal(text, original, `${f}/${s.id}: text lost in parsing`);
      }
    }
  }
  assert.equal(reorders, 131); assert.equal(fillins, 141);
});
