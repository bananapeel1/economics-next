// `npm test`. The inline markdown parser sits under every Learn Mode text field; a regex change
// here is a rendering change on every page, so the cases below are the ones that have gone wrong
// or would be expensive to get wrong.
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseInlineMarkdown } from './parse-inline-markdown.js';

const md = (s) => parseInlineMarkdown(s, []);

test('star notation is left alone (F073 regression)', () => {
  assert.equal(md('Read P* from AR curve above Q*'), 'Read P* from AR curve above Q*');
  assert.equal(md('Dashed lines from equilibrium to both axes showing P* and Q*'), 'Dashed lines from equilibrium to both axes showing P* and Q*');
  assert.equal(md('at Q*, price is P*'), 'at Q*, price is P*');
  assert.equal(md('the rate (t*) that maximises revenue'), 'the rate (t*) that maximises revenue');
});

test('ordinary emphasis still renders', () => {
  assert.equal(md('this is *important* here'), 'this is <em>important</em> here');
  assert.equal(md('*Ceteris paribus* holds'), '<em>Ceteris paribus</em> holds');
  assert.equal(md('(*not* always)'), '(<em>not</em> always)');
  assert.equal(md('a **bold** and *italic* mix'), 'a <strong>bold</strong> and <em>italic</em> mix');
  assert.equal(md('**MC = MR** at Q*'), '<strong>MC = MR</strong> at Q*');
});

test('markup is escaped before emphasis is added (F071)', () => {
  assert.equal(md('price < marginal cost & AD'), 'price &lt; marginal cost &amp; AD');
  assert.equal(md('<script>x</script>'), '&lt;script&gt;x&lt;/script&gt;');
  assert.equal(md('*<b>*'), '<em>&lt;b&gt;</em>');
});

test('empty and non-string input', () => {
  assert.equal(md(''), '');
  assert.equal(md(null), '');
  assert.equal(md(undefined), '');
});
