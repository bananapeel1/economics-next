// Packet 12.5: pass 2, by the CLI exactly as packet 12.1 and 12.4 ran it — one process per section,
// `{ key, question }` on stdin, the rule in audit/scripts/tag-lexical.mjs untouched (last changed in
// 94807d3). Refuses to run until pass1-tags.json is frozen, so pass 2 can never precede pass 1.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const R = 'audit/runs/packet-12.5/';
if (!fs.existsSync(R + 'pass1-tags.json')) { console.error('pass1-tags.json is not frozen; refusing to run pass 2'); process.exit(1); }
const census = JSON.parse(fs.readFileSync(R + 'census.json', 'utf8'));
const bySection = new Map();
for (const it of census.items) {
  if (!bySection.has(it.section)) bySection.set(it.section, { subject: it.subject, topic: it.topic, qs: [] });
  const s = bySection.get(it.section);
  if (!s.qs.some((q) => q.key === it.id)) s.qs.push({ key: it.id, question: it.question });
}
const out = {};
for (const [slug, s] of bySection) {
  const res = execFileSync('node', ['audit/scripts/tag-lexical.mjs', s.topic, '--subject', s.subject], { input: JSON.stringify(s.qs), encoding: 'utf8' });
  Object.assign(out, JSON.parse(res));
}
const n = Object.keys(out).length;
fs.writeFileSync(R + 'pass2-tags.json', `${JSON.stringify({ pass: '2 — audit/scripts/tag-lexical.mjs, blind to pass 1, rule untouched', ran: new Date().toISOString(), items: n, tags: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, [...v].sort()])) }, null, 1)}\n`);
console.log({ items: n, tagged: Object.values(out).filter((v) => v.length).length, tags: Object.values(out).reduce((a, v) => a + v.length, 0) });
