// `npm test`. F073: the split that decides a flow step's title and subtitle.
import test from 'node:test';
import assert from 'node:assert/strict';
import { stepParts } from './flow-step.js';

test('the object form is explicit', () => {
  assert.deepEqual(stepParts({ title: 'Identify', subtitle: 'list every option' }), { title: 'Identify', subtitle: 'list every option' });
  assert.deepEqual(stepParts({ title: 'Identify' }), { title: 'Identify', subtitle: null });
});

test('a string splits on a spaced em dash only', () => {
  assert.deepEqual(stepParts('Identify — list every option'), { title: 'Identify', subtitle: 'list every option' });
  assert.deepEqual(stepParts('A — B — C'), { title: 'A', subtitle: 'B — C' });
});

test('formulae with hyphens and en dashes are one title (the live regression)', () => {
  assert.deepEqual(stepParts('Float = LFT - EST - duration'), { title: 'Float = LFT - EST - duration', subtitle: null });
  assert.deepEqual(stepParts('Output 2019 – 2023'), { title: 'Output 2019 – 2023', subtitle: null });
  assert.deepEqual(stepParts('Price rises'), { title: 'Price rises', subtitle: null });
});

test('nothing in, nothing out', () => {
  assert.deepEqual(stepParts(null), { title: '', subtitle: null });
  assert.deepEqual(stepParts(undefined), { title: '', subtitle: null });
});
