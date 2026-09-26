import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listSpecs, specs, getSpec } from './diagram/index.mjs';
import { checkSpecCitation, specSection } from './spec-sections.mjs';

/*
 * Packet 13.7 part 1. `npm run diagram-check` already marks every spec, samples its regions and
 * places its labels; nothing here repeats that. What is here is the one assertion the PROTOCOL's
 * gate can see: `audit/PROTOCOL.md` §5 runs build, unverified, validate, test, exposure and
 * recalls — NOT diagram-check. So the check that a drill cites a real section lives in a test too,
 * over the same function, because a guard the gate does not run is a guard that goes quiet.
 */

test('every diagram spec cites a section that exists, in its own unit, that covers it', () => {
  for (const spec of listSpecs()) {
    assert.equal(checkSpecCitation(spec), null, `${spec.id}: ${checkSpecCitation(spec)}`);
  }
});

/*
 * The control. Both live specs shipped `1.4.3` — a UK GCE number, and in the IAL specification
 * every section number has 3 as its middle digit — so the chip above the drill named a section
 * that does not exist. Each arm below is one way that defect can be written, and the last is the
 * one a shape test cannot see: a REAL heading that is the wrong one.
 */
test('the citation check fires on every way of getting it wrong', () => {
  const base = { subject: 'economics', unit: 'WEC11', specCode: '1.3.6', specTerm: 'indirect taxation' };
  assert.equal(checkSpecCitation(base), null, 'the correct citation must pass, or the arms below prove nothing');

  assert.match(checkSpecCitation({ ...base, specCode: '1.4.3' }), /not an IAL section number/);
  assert.match(checkSpecCitation({ ...base, specCode: '2.3.6' }), /different units/);
  assert.match(checkSpecCitation({ ...base, specTerm: undefined }), /no specTerm/);
  assert.match(checkSpecCitation({ ...base, specCode: '1.3.1' }), /does not use "indirect taxation" anywhere under 1\.3\.1/);
});

/*
 * The reader has to STOP at its own section's end. It did not: tracking only `n.3.n` headings let
 * the last section of a unit run on through the next unit's title page, so 1.3.6 was 86 lines and
 * "macroeconomic performance" — Unit 2's title — passed a specTerm check under a market-failure
 * section. A guard that accepts a term from the wrong unit is the defect it exists to catch.
 */
test('a section stops at its own boundary rather than absorbing the next unit', () => {
  const body = specSection('economics', '1.3.6');
  assert.ok(body.includes('indirect taxation'), '1.3.6 must still contain its own content');
  assert.ok(body.includes('subsidies'), '1.3.6 must still contain its own content');
  assert.ok(!body.includes('macroeconomic performance'), 'Unit 2 title page leaked into 1.3.6');
  assert.ok(!body.includes('unit description'), "the next unit's front matter leaked into 1.3.6");
});

test('a recall can only name a spec the registry has, and getSpec throws on one it does not', () => {
  assert.equal(new Set(specs.map((s) => s.id)).size, specs.length, 'two specs share an id');
  for (const s of specs) assert.equal(getSpec(s.id).id, s.id);
  assert.throws(() => getSpec('no-such-spec'), /no-such-spec/);
});
