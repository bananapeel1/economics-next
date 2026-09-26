import { buildSteps } from '../../../lib/learn-steps.js';
import { templatesForSection, placeQuantItems } from '../../../lib/quant-pool.js';
import { diagramSpecsForSection, placeDiagramDrills, authoredDiagramSpecIds } from '../../../lib/diagram-pool.js';
const idx = (await import('../../../audit/raw/section-index.json', { with: { type: 'json' } })).default;
const only = process.argv.slice(2);
for (const s of idx) {
  if (only.length && !only.includes(s.id)) continue;
  const sec = { subject: s.subject, unitCode: s.unitCode, number: s.number };
  const q = templatesForSection(sec); const d = diagramSpecsForSection(sec);
  if (!q.length && !d.length) continue;
  const r = await fetch(`http://localhost:3001/api/sections/${s.id}${process.env.DRAFT ? "?draft=1" : ""}`); const j = await r.json();
  const content = j.content?.data || j.content || [];
  const steps = buildSteps(Array.isArray(content) ? content : []);
  const flat = steps.flatSteps || steps;
  const slotsQ = flat.map((st, i) => ({ st, i })).filter(({ st }) => st.type === 'checkin' || st.type === 'legacy');
  const qPlaced = placeQuantItems(q, slotsQ.map(({ st }) => st.blockTitle || st.block?.title || ''));
  const quantSteps = new Set(Object.keys(qPlaced).map((o) => slotsQ[+o].i));
  const slots = flat.map((st, i) => ({ st, i })).filter(({ st }) => st.type === 'checkin');
  const occ = new Set(); slots.forEach(({ i }, o) => { if (quantSteps.has(i)) occ.add(o); });
  const authored = authoredDiagramSpecIds(content);
  const described = slots.map(({ st }) => `${st.blockTitle || ''} ${(j.diagrams || []).find((x) => x?.id && x.id === st.diagramId)?.title || ''}`);
  const dPlaced = placeDiagramDrills(d.filter((x) => !authored.has(x.id)), described, occ);
  console.log(`${s.id} (${s.unitCode} ${s.number}) steps=${flat.length} checkins=${slots.length}`);
  for (const [o, id] of Object.entries(qPlaced)) console.log(`   quant  ${id} -> step ${slotsQ[+o].i + 1} "${slotsQ[+o].st.blockTitle}"`);
  for (const t of q) if (!Object.values(qPlaced).includes(t.id)) console.log(`   quant  ${t.id} -> UNPLACED (Smart Practice / calculations session only)`);
  for (const [o, id] of Object.entries(dPlaced)) console.log(`   draw   ${id} -> step ${slots[+o].i + 1} "${slots[+o].st.blockTitle}"`);
  for (const t of d) if (!Object.values(dPlaced).includes(t.id)) console.log(`   draw   ${t.id} -> UNPLACED (Diagrams tab only)`);
}
