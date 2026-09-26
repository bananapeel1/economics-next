/**
 * Packet 56 — read-only: fetch the SERVED draft from :3001 (the API the client reads, not the tables)
 * and compare it field by field with the dumped bundle; then fetch the live section and confirm it is
 * still the t=0 snapshot. A different route from draft-readback.mjs, which reads the tables directly.
 */
import { readFileSync } from 'node:fs';
const ID = 'global-industries-mncs';
const dump = JSON.parse(readFileSync(`audit/snapshots/packet-56-bundle__business__${ID}.json`, 'utf8')).tables;
const pre = JSON.parse(readFileSync(`audit/snapshots/2026-09-26-pre-packet-56__business__${ID}.json`, 'utf8'));
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const eq = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));
let bad = 0;
const get = async (q) => (await fetch(`http://localhost:3001/api/sections/${ID}${q}`)).json();
const d = await get('?draft=1');
/* the signed-out API re-indexes quizIndices onto its free slice and trims premium extras (seen by a
   first run of this file: every other difference was nil); compare content without quizIndices, then
   check that each served leading pin names the SAME quiz item, by id, as the bundle's */
const noQ = (c) => c.map(({ quizIndices, ...b }) => b);
{
  const ok = eq(noQ(d.content), noQ(dump.content));
  if (!ok) bad += 1;
  console.log(`served draft content    ${ok ? '== bundle apart from quizIndices' : '!= BUNDLE'} (${d.content.length})`);
  d.content.forEach((b, i) => {
    const same = d.quiz[b.quizIndices[0]]?.id === dump.quiz[dump.content[i].quizIndices[0]].id;
    if (!same) bad += 1;
    console.log(`  leading pin, block ${i + 1}: served quiz[${b.quizIndices[0]}] ${same ? '== the bundle\'s leading item (same id)' : '!= the bundle\'s leading item'}`);
  });
}
for (const k of ['notes', 'diagrams', 'practice']) {
  const ok = eq(d[k], dump[k]);
  if (!ok) bad += 1;
  console.log(`served draft ${k.padEnd(10)} ${ok ? '== bundle' : '!= BUNDLE'} (${d[k]?.length})`);
}
for (const k of ['quiz', 'flashcards']) {
  const byId = new Map(dump[k].map((x) => [x.id, x]));
  const miss = (d[k] || []).filter((x) => !eq(x, byId.get(x.id)));
  if (miss.length) bad += 1;
  console.log(`served draft ${k.padEnd(10)} ${d[k]?.length} served (signed-out slice), ${miss.length} differ from the bundle item with the same id`);
}
{
  const n = d.extras?.chains?.length ?? 0;
  const ok = n > 0 && eq(d.extras.chains, dump.extras.chains.slice(0, n)) && eq(d.extras.evaluation, dump.extras.evaluation.slice(0, d.extras.evaluation.length));
  if (!ok) bad += 1;
  console.log(`served draft extras     ${ok ? `== the bundle's first ${n} chain(s) and ${d.extras.evaluation.length} evaluation(s) (premium trim)` : '!= BUNDLE'}`);
}
/* each block's check-in pins resolve on the served draft */
for (const b of d.content) {
  const diag = d.diagrams.find((x) => x.id === b.diagramId);
  const q = d.quiz.find((x) => x.id === dump.quiz[b.quizIndices[0]].id);
  console.log(`  ${b.title.padEnd(32)} diagram ${diag ? 'resolves' : 'MISSING'} · leading quiz ${q ? 'served' : 'not in the signed-out slice'} · practice ${b.practiceIndices.join(',')} · recalls ${b.sections.map((s) => s.recall?.type).join(',')}`);
  if (!diag) bad += 1;
}
const live = await get('');
const liveOk = eq(noQ(live.content), noQ(pre.content)) && live.contentVersionSince?.startsWith('2026-09-25');
if (!liveOk) bad += 1;
console.log(`live (no draft) content ${liveOk ? '== the t=0 snapshot' : '!= t=0 snapshot'}: ${live.content.map((b) => b.title).join(' | ')} · contentVersionSince ${live.contentVersionSince}`);
process.exit(bad ? 1 : 0);
