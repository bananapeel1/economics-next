// Packet 12.5: agreement census + the Market Failure check against packet 12.1's artefact, and the
// structural/substantive split for items with no agreed tag. Read-only; writes merge-probe.json.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { leafIndex, distinctiveness, stems } from '../../scripts/tag-lexical.mjs';
const R = 'audit/runs/packet-12.5/';
const p1 = JSON.parse(fs.readFileSync(R + 'pass1-tags.json', 'utf8')).tags;
const p2 = JSON.parse(fs.readFileSync(R + 'pass2-tags.json', 'utf8')).tags;
const census = JSON.parse(fs.readFileSync(R + 'census.json', 'utf8'));
const oracle = JSON.parse(fs.readFileSync('audit/raw/spec-items.json', 'utf8'));
const idx = new Map();
const byId = new Map();
for (const it of census.items) if (!byId.has(it.id)) byId.set(it.id, it);
const rows = [];
for (const [id, it] of byId) {
  const key = `${it.subject}:${it.topic}`;
  if (!idx.has(key)) { const index = leafIndex(oracle.items, it.subject, it.topic); idx.set(key, { index, dist: distinctiveness(index) }); }
  const { index, dist } = idx.get(key);
  const a = new Set(p1[id]); const b = new Set(p2[id]);
  const agreed = [...a].filter((x) => b.has(x)).sort();
  const q = stems(it.question);
  // For each pass-1-only leaf: how many DISTINCTIVE stems does the question share with it? 0 means
  // the lexical rule could not have tagged it whatever the truth was — a structural disagreement.
  const p1only = [...a].filter((x) => !b.has(x)).map((x) => ({ id: x, sharedDistinctive: [...index.get(x).stems].filter((t) => q.has(t) && dist.distinctive.has(t)).length }));
  let cls;
  if (agreed.length) cls = 'agreed';
  else if (!a.size && !b.size) cls = 'both-empty';
  else if (!a.size) cls = 'pass1-empty';
  else if (p1only.every((x) => x.sharedDistinctive === 0)) cls = 'structural';
  else cls = 'substantive';
  rows.push({ id, section: it.section, agreed, p1only, p2only: [...b].filter((x) => !a.has(x)).sort(), cls });
}
const count = (c) => rows.filter((r) => r.cls === c).length;
console.log({ items: rows.length, agreedItems: count('agreed'), agreedTags: rows.reduce((n, r) => n + r.agreed.length, 0), bothEmpty: count('both-empty'), pass1Empty: count('pass1-empty'), structural: count('structural'), substantive: count('substantive') });

// Market Failure against 12.1's artefact, by question text (the artefact's own key).
// Packet 12.5 deleted the artefact; read it from 94807d3, the 12.1 commit that added it.
const art = JSON.parse(execFileSync('git', ['show', '94807d3:audit/runs/packet-12.1/section_practice-tags.json'], { encoding: 'utf8' }));
const artStaged = new Map(art.rows.filter((r) => r.bank === 'section_practice.staged').map((r) => [r.question, r.spec_items]));
const artUntagged = new Set(art.untagged.filter((r) => r.bank === 'section_practice.staged').map((r) => r.question));
let same = 0, diff = 0;
for (const r of rows.filter((x) => x.section === 'market-failure')) {
  const text = byId.get(r.id).question;
  const want = artStaged.has(text) ? [...artStaged.get(text)].sort() : (artUntagged.has(text) ? [] : null);
  if (want === null) { console.log('MF item not in 12.1 artefact', r.id); diff++; continue; }
  if (JSON.stringify(want) === JSON.stringify(r.agreed)) same++; else { diff++; console.log('MF MISMATCH', r.id, 'artefact', want, 'script', r.agreed); }
}
console.log({ marketFailure: { same, diff, artefactStagedRows: artStaged.size, artefactStagedUntagged: artUntagged.size } });
fs.writeFileSync(R + 'merge-probe.json', `${JSON.stringify(rows, null, 1)}\n`);
