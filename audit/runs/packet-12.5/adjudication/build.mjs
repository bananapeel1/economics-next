// Packet 12.5: blind fourth reader for the STRUCTURAL disagreements only (pass 1 tagged leaves the
// question shares no distinctive stem with, so the lexical rule could not have agreed). Each item's
// candidates = pass 1's leaves + negative controls: leaves neither pass proposed, taken first from
// the same subtopic as pass 1's leaves (plausible, so the control is a real test), then the rest of
// the topic. Order is a deterministic shuffle. The key is written to a separate file the reader is
// never shown.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R = 'audit/runs/packet-12.5/';
const rows = JSON.parse(fs.readFileSync(R + 'merge-probe.json', 'utf8')).filter((r) => r.cls === 'structural');
const census = JSON.parse(fs.readFileSync(R + 'census.json', 'utf8'));
const byId = new Map(census.items.map((i) => [i.id, i]));
const oracle = JSON.parse(fs.readFileSync('audit/raw/spec-items.json', 'utf8')).items;
const p2 = JSON.parse(fs.readFileSync(R + 'pass2-tags.json', 'utf8')).tags;
const h = (s) => crypto.createHash('sha256').update(s).digest('hex');
const input = { note: 'For each question, say which of its candidate leaves the question examines. Question text only.', items: [] };
const key = {};
for (const r of rows) {
  const it = byId.get(r.id);
  const leaves = oracle.filter((x) => x.subject === it.subject && x.topic === it.topic && x.kind === 'leaf');
  const byLeaf = new Map(leaves.map((x) => [x.id, x]));
  const reqWording = (x) => (x.parent ? oracle.find((y) => y.id === x.parent)?.wording : undefined);
  const real = r.p1only.map((x) => x.id);
  const proposed = new Set([...real, ...(p2[r.id] || [])]);
  const subs = new Set(real.map((id) => byLeaf.get(id).subtopic));
  const pool = leaves.filter((x) => !proposed.has(x.id));
  const near = pool.filter((x) => subs.has(x.subtopic)).sort((a, b) => h(r.id + a.id).localeCompare(h(r.id + b.id)));
  const far = pool.filter((x) => !subs.has(x.subtopic)).sort((a, b) => h(r.id + a.id).localeCompare(h(r.id + b.id)));
  const nControls = Math.min(pool.length, Math.max(2, real.length));
  const controls = [...near, ...far].slice(0, nControls).map((x) => x.id);
  const cands = [...real, ...controls].sort((a, b) => h('order' + r.id + a).localeCompare(h('order' + r.id + b)));
  input.items.push({ key: r.id, question: it.question, candidates: cands.map((id) => { const x = byLeaf.get(id); return { id, subtopic: x.subtopicLabel, requirement: reqWording(x), wording: x.wording }; }) });
  key[r.id] = { real, controls };
}
fs.writeFileSync(R + 'adjudication/input.json', `${JSON.stringify(input, null, 1)}\n`);
fs.writeFileSync(R + 'adjudication/key.json', `${JSON.stringify({ note: 'NEVER shown to the reader. real = pass 1 leaves under adjudication; controls = leaves neither pass proposed.', key }, null, 1)}\n`);
console.log({ items: input.items.length, real: Object.values(key).reduce((n, k) => n + k.real.length, 0), controls: Object.values(key).reduce((n, k) => n + k.controls.length, 0) });
