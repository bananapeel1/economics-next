/**
 * Packet 13.7: drawing drills are derived from a section's spec number and placed on the check-in
 * after the chapter that teaches the diagram (lib/diagram-pool.js).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { specs } from './diagram/index.mjs';
import {
  diagramSpecsForSection, authoredDiagramSpecIds, placeDiagramDrills,
  derivedDiagramRecall, derivedDiagramRecallId,
} from './diagram-pool.js';

const spec = (id, title) => ({ id, title });

test('every registered spec reaches the section whose number it claims, and no other', () => {
  for (const s of specs) {
    const own = { subject: s.subject, unitCode: s.unit, number: s.specCode };
    assert.ok(diagramSpecsForSection(own).some((x) => x.id === s.id), `${s.id} does not reach ${s.specCode}`);
    // Same number, other subject: Business 1.3.4 is not Economics 1.3.4.
    const other = { subject: s.subject === 'economics' ? 'business' : 'economics', unitCode: s.unit, number: s.specCode };
    assert.ok(!diagramSpecsForSection(other).some((x) => x.id === s.id), `${s.id} leaks into the other subject`);
  }
});

test('no unit code, no drill — never a guess', () => {
  const s = specs[0];
  assert.deepEqual(diagramSpecsForSection({ subject: s.subject, unitCode: '', number: s.specCode }), []);
});

test('a drill goes to the check-in after the chapter that teaches it (the latest title match)', () => {
  const titles = ['What a market is', 'Indirect Taxes and Subsidies', 'Price controls'];
  assert.deepEqual(placeDiagramDrills([spec('indirect-tax', 'Indirect tax in a competitive market')], titles), { 1: 'indirect-tax' });
});

test('never on a check-in holding a calculation: it moves LATER, never earlier', () => {
  const titles = ['Intro', 'Indirect taxes', 'Price controls', 'Summary'];
  const placed = placeDiagramDrills([spec('indirect-tax', 'Indirect tax in a competitive market')], titles, new Set([1]));
  assert.deepEqual(placed, { 2: 'indirect-tax' });
  // Every later check-in taken: not placed at all (the Diagrams tab still offers it).
  assert.deepEqual(placeDiagramDrills([spec('indirect-tax', 'Indirect tax')], titles, new Set([1, 2, 3])), {});
});

test('an unmatched drill goes to the last free check-in, when the whole section has been taught', () => {
  const titles = ['Alpha', 'Beta', 'Gamma'];
  assert.deepEqual(placeDiagramDrills([spec('x', 'Something unrelated')], titles), { 2: 'x' });
  assert.deepEqual(placeDiagramDrills([spec('x', 'Something unrelated')], titles, new Set([2])), { 1: 'x' });
});

test('one drill per check-in', () => {
  const titles = ['Indirect taxes', 'Subsidies'];
  const placed = placeDiagramDrills([spec('a', 'Indirect tax'), spec('b', 'Indirect tax again')], titles);
  assert.equal(new Set(Object.keys(placed)).size, Object.keys(placed).length);
  assert.equal(Object.values(placed).length, 2);
});

test('a spec the content already authors is recognised, so it is not derived twice', () => {
  const content = [{ sections: [{ recall: { type: 'diagram', specId: 'indirect-tax' } }, { recall: { type: 'match' } }] }];
  assert.deepEqual([...authoredDiagramSpecIds(content)], ['indirect-tax']);
});

test('a derived drill renders through the authored recall shape, under an id no content can carry', () => {
  assert.deepEqual(derivedDiagramRecall('subsidy'), { type: 'diagram', specId: 'subsidy' });
  assert.equal(derivedDiagramRecallId('subsidy'), 'draw:subsidy');
});
