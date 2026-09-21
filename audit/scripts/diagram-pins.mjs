#!/usr/bin/env node
/**
 * Every diagram pin, resolved the way the app resolves it. F052, F109.
 *
 * 24 of 39 `diagramRef` pins used to resolve to nothing and the block rendered no diagram, with no
 * error anywhere: not in the build, not in the console, not in a test. The only way to find out was
 * to open the section and notice an absence. This makes that absence a number.
 *
 * Exits non-zero when a pin resolves to nothing, so it can gate a content push.
 *
 *   node audit/scripts/diagram-pins.mjs          report and exit non-zero on any unresolved pin
 *   node audit/scripts/diagram-pins.mjs --json   machine-readable, always exits 0
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'audit/content-sections';
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const asJson = process.argv.includes('--json');

const report = { resolved: [], unresolved: [], sectionsWithNoDiagrams: [], unpinnedDiagrams: [] };

for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith('.json')) continue;
  const key = file.replace(/\.json$/, '');
  const data = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const diagrams = data.diagrams || [];
  const blocks = data.content || [];
  const pins = blocks.filter((b) => b.diagramId || b.diagramRef);

  if (!diagrams.length) {
    if (pins.length) report.sectionsWithNoDiagrams.push({ section: key, pins: pins.length });
    for (const b of pins) {
      report.unresolved.push({ section: key, pin: b.diagramId || b.diagramRef, reason: 'section has no diagrams at all' });
    }
    continue;
  }

  // Same one-diagram-per-block rule the component applies, so the count matches what a student sees.
  const used = new Set();
  for (const b of pins) {
    let idx = -1;
    if (b.diagramId) {
      idx = diagrams.findIndex((d, i) => d?.id === b.diagramId && !used.has(i));
    } else {
      const ref = norm(b.diagramRef);
      idx = diagrams.findIndex((d, i) => {
        if (used.has(i)) return false;
        const t = norm(d.title);
        return t && ref && (t.includes(ref) || ref.includes(t));
      });
    }
    if (idx >= 0) { used.add(idx); report.resolved.push({ section: key, pin: b.diagramId || b.diagramRef, title: diagrams[idx].title }); }
    else report.unresolved.push({ section: key, pin: b.diagramId || b.diagramRef, reason: 'no diagram in this section matches', available: diagrams.map((d) => d.title) });
  }
  diagrams.forEach((d, i) => { if (!used.has(i)) report.unpinnedDiagrams.push({ section: key, title: d.title }); });
}

if (asJson) { console.log(JSON.stringify(report, null, 1)); process.exit(0); }

const total = report.resolved.length + report.unresolved.length;
console.log(`diagram pins: ${total}  resolved: ${report.resolved.length}  unresolved: ${report.unresolved.length}`);
console.log(`diagrams that exist but no block pins: ${report.unpinnedDiagrams.length}`);
if (report.sectionsWithNoDiagrams.length) {
  console.log(`\nsections that pin a diagram while holding none (${report.sectionsWithNoDiagrams.length}):`);
  for (const s of report.sectionsWithNoDiagrams) console.log(`  ${s.section}  (${s.pins} pins)`);
}
if (report.unresolved.length) {
  console.log(`\nUNRESOLVED (${report.unresolved.length}) — the block renders no diagram:`);
  for (const u of report.unresolved) console.log(`  ${u.section.padEnd(44)} ${JSON.stringify(u.pin).padEnd(34)} ${u.reason}`);
}
if (report.unpinnedDiagrams.length) {
  console.log(`\nauthored but never pinned (${report.unpinnedDiagrams.length}) — reachable only by the title fallback:`);
  for (const u of report.unpinnedDiagrams) console.log(`  ${u.section.padEnd(44)} ${u.title}`);
}
process.exit(report.unresolved.length ? 1 : 0);
