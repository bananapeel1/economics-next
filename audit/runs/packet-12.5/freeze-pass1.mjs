// Packet 12.5: validate the eight pass-1 readers' files against their inputs, then freeze
// pass1-tags.json BEFORE pass 2 runs. Refuses to freeze on any missing key, stray key or bad id.
import fs from 'node:fs';
const R = 'audit/runs/packet-12.5/';
let problems = 0, n = 0, tagged = 0, tags = 0;
const all = {};
for (const f of fs.readdirSync(R + 'pass1-input')) {
  const inp = JSON.parse(fs.readFileSync(R + 'pass1-input/' + f, 'utf8'));
  const out = JSON.parse(fs.readFileSync(R + 'pass1/' + f, 'utf8'));
  const leaf = new Set(inp.leaves.map((l) => l.id));
  const keys = new Set(inp.questions.map((q) => q.key));
  for (const k of keys) if (!(k in out.tags)) { console.log('MISSING', f, k); problems++; }
  for (const [k, v] of Object.entries(out.tags)) {
    if (!keys.has(k)) { console.log('EXTRA', f, k); problems++; }
    if (!Array.isArray(v)) { console.log('NOTARRAY', f, k); problems++; continue; }
    for (const id of v) if (!leaf.has(id)) { console.log('BADID', f, k, id); problems++; }
    if (new Set(v).size !== v.length) { console.log('DUP', f, k); problems++; }
    n++; if (v.length) tagged++; tags += v.length; all[k] = [...v].sort();
  }
  if (out.section !== inp.section || out.topic !== inp.topic) { console.log('HEADER', f); problems++; }
}
const reused = JSON.parse(fs.readFileSync(R + 'pass1-reused-12.1.json', 'utf8')).tags;
for (const [k, v] of Object.entries(reused)) { all[k] = [...v.tags].sort(); n++; if (v.tags.length) tagged++; tags += v.tags.length; }
const census = JSON.parse(fs.readFileSync(R + 'census.json', 'utf8'));
const ids = new Set(census.items.map((i) => i.id));
const missing = [...ids].filter((i) => !(i in all));
console.log({ problems, items: n, tagged, tags, censusIds: ids.size, missingFromPass1: missing.length });
if (problems || missing.length) process.exit(1);
if (fs.existsSync(R + 'pass1-tags.json')) { console.log('pass1-tags.json already frozen; not overwriting'); process.exit(0); }
fs.writeFileSync(R + 'pass1-tags.json', `${JSON.stringify({
  pass: "1 — eight independent readers (fresh-context agents, not the questions' authors), question TEXT ONLY against the topic's leaves. Market Failure's 11 items reuse packet 12.1's pass 1 (byte-identical question text).",
  recorded: new Date().toISOString(),
  note: 'Frozen before pass 2 was run for packet 12.5. Keys are section_practice item ids (content hashes of the question text).',
  items: n,
  tags: all,
}, null, 1)}\n`);
console.log('frozen pass1-tags.json');
