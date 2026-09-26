// `npm test`. The inline markdown parser sits under every Learn Mode text field; a regex change
// here is a rendering change on every page, so the cases below are the ones that have gone wrong
// or would be expensive to get wrong.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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

// The Extras tab printed these as plain text, so a student saw the asterisks (packet 45's
// walkthrough). Both are live evaluation bodies, 26 Sep 2026: labour-markets frame 1 and the
// run-in labels of balance-payments-exchange-rates frame 1.
test('live Extras evaluation bodies render their bold', () => {
  assert.equal(
    md('leaves a surplus of labour. **How many jobs go depends on the elasticity of demand for labour.** Where labour'),
    'leaves a surplus of labour. <strong>How many jobs go depends on the elasticity of demand for labour.</strong> Where labour',
  );
  assert.equal(
    md('**Size relative to the economy** — a deficit of a few per cent. **What is being imported** — capital goods'),
    '<strong>Size relative to the economy</strong> — a deficit of a few per cent. <strong>What is being imported</strong> — capital goods',
  );
});

test('ExtrasTab renders every text field through the parser, never as a raw string', () => {
  const src = readFileSync('components/ExtrasTab.jsx', 'utf8');
  assert.match(src, /import \{ parseInlineMarkdown \} from '@\/lib\/parse-inline-markdown'/);
  for (const field of ['chain.title', 'step', 'chain.result', 'point.title', 'point.content']) {
    assert.ok(src.includes(`text={${field}}`), `${field} goes through <Inline>`);
    assert.ok(!src.includes(`>{${field}}<`), `${field} is not printed raw`);
  }
});
