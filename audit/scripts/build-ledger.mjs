#!/usr/bin/env node
// One-off: build audit/ledger.json from the canonical audit corpus.
// Ids are positional in the frozen source files (audit/raw is canonical and never reordered),
// so a re-run reproduces the same ids. Existing status/packet/evidence fields are preserved on re-run.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const rawDir = path.join(root, 'audit', 'raw');
const out = path.join(root, 'audit', 'ledger.json');

const code = JSON.parse(fs.readFileSync(path.join(rawDir, 'code-findings-flat.json'), 'utf8'));
const work = JSON.parse(fs.readFileSync(path.join(rawDir, 'content-work-flat.json'), 'utf8'));
const progress = fs.readFileSync(path.join(root, 'audit', 'PROGRESS.md'), 'utf8');

// section slug -> packet number, from the content table in PROGRESS.md
const sectionPacket = {};
for (const m of progress.matchAll(/^\| (\d+) \| ([a-z0-9-]+)(?: \([^)]*\))? \| \d+ \|/gm)) {
  sectionPacket[m[2]] = Number(m[1]);
}
if (Object.keys(sectionPacket).length !== 43) {
  throw new Error(`expected 43 section rows in PROGRESS.md, found ${Object.keys(sectionPacket).length}`);
}

let prev = { code: [], content: [] };
if (fs.existsSync(out)) prev = JSON.parse(fs.readFileSync(out, 'utf8'));
const prevById = new Map([...prev.code, ...prev.content].map((x) => [x.id, x]));

const keep = (id, fresh) => {
  const old = prevById.get(id);
  if (!old) return fresh;
  return { ...fresh, packet: old.packet ?? fresh.packet, status: old.status, closed_by: old.closed_by ?? null,
    verified_by: old.verified_by ?? null, evidence: old.evidence ?? null, note: old.note ?? null };
};

const codeRows = code.map((f, i) => keep(`F${String(i + 1).padStart(3, '0')}`, {
  id: `F${String(i + 1).padStart(3, '0')}`,
  lens: f.lens, sev: f.sev, cat: f.cat, title: f.title, file: f.file, line: f.line,
  fix: f.fix, impact: f.impact,
  packet: null,            // assigned by the mapping pass (see PROTOCOL.md)
  status: 'open',          // open | claimed | confirmed | not-fixed | wont-fix
  closed_by: null,         // packet id that claims to close it
  verified_by: null,       // verifier agent + date
  evidence: null,          // file:line or reproduction note from the verifier
  note: null,
}));

const counters = {};
const contentRows = work.map((w) => {
  const key = `${w.section}:${w.kind}`;
  counters[key] = (counters[key] || 0) + 1;
  const id = `C-${w.section}-${w.kind}-${String(counters[key]).padStart(2, '0')}`;
  return keep(id, {
    id, section: w.section, kind: w.kind, rank: w.rank, text: w.text,
    packet: sectionPacket[w.section],   // default: the section's own packet; 8 and 13 may close some earlier
    status: 'open', closed_by: null, verified_by: null, evidence: null, note: null,
  });
});

const ledger = {
  generated: new Date().toISOString().slice(0, 10),
  source: 'audit/raw/code-findings-flat.json (117) + audit/raw/content-work-flat.json (1170); ids are positional and frozen',
  statuses: 'open | claimed | confirmed | not-fixed | wont-fix',
  code: codeRows,
  content: contentRows,
};
fs.writeFileSync(out, JSON.stringify(ledger, null, 1) + '\n');
console.log(`wrote ${out}: ${codeRows.length} code findings, ${contentRows.length} content items`);
