/**
 * Replicate LearnModeTab's `quantMap` over the LIVE payload, for the three drilled sections the
 * 390px walkthrough did not visit. Not a fixture and not the unit test's hand-picked shapes: the
 * section's own content, fetched from the running dev server, through the same `buildSteps` the
 * component calls.
 *
 * `decision-making-techniques` is the one that matters. It has two chapters, so two check-ins,
 * and until fix round 1 the first was reserved — which left `payback` placed nowhere while every
 * guard in the tree stayed green. Run this after any change to placement.
 *
 *   node audit/runs/packet-13.2/placement-live.mjs
 */
import { buildSteps } from '../../../lib/learn-steps.js';
import { templatesForSection, placeQuantItems, quantItem } from '../../../lib/quant-pool.js';

const SECTIONS = [
  ['decision-making-techniques', 'business', 'WBS13', '3.3.3'],
  ['financial-planning', 'business', 'WBS12', '2.3.2'],
  ['economic-growth', 'economics', 'WEC12', '2.3.5'],
];

for (const [id, subject, unitCode, number] of SECTIONS) {
  const res = await fetch(`http://localhost:3001/api/sections/${id}`);
  const { content } = await res.json();
  const flat = buildSteps(content);
  const slots = flat.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
  const templates = templatesForSection({ subject, unitCode, number });
  const placed = placeQuantItems(templates, slots.map(({ s }) => s.blockTitle || s.block?.title || ''));
  console.log(`\n${id} — ${slots.length} check-ins, ${templates.length} template(s)`);
  for (const [ordinal, templateId] of Object.entries(placed)) {
    const slot = slots[Number(ordinal)];
    const item = quantItem({ sectionId: id }, templateId, 0);
    console.log(`  check-in ${ordinal} (flat step ${slot.i + 1} of ${flat.length}, "${slot.s.blockTitle}") → ${templateId}, ${item.marks} marks`);
  }
  const placedIds = new Set(Object.values(placed));
  const missing = templates.filter((t) => !placedIds.has(t.id));
  console.log(`  unplaced in Learn Mode: ${missing.map((t) => t.id).join(', ') || 'none'} · Quiz tab renders ${templates.length}`);
}
