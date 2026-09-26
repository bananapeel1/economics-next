/*
 * Fix round B1 — every number word in a recall prompt, checked against what the recall holds.
 * Reads the STAGED BUNDLE from disk, not the content module, so the emitter's own shape cannot
 * hide a mismatch (Verify B defect 5: "hit by four separate changes" over six items).
 */
import { readFileSync } from 'node:fs';
/* "one" is excluded on purpose: "sort each one", "one firm sells" and "one of these" are not
   counts, and a check that fires on them is a check nobody will read. Two upward is a count. */
const N = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 };
const bundle = JSON.parse(readFileSync('audit/snapshots/packet-41-bundle__business__external-influences.json'));
const content = bundle.tables.content ?? bundle.tables.content_sections ?? bundle.tables;
const recalls = [];
const walk = (n) => {
  if (Array.isArray(n)) return n.forEach(walk);
  if (n && typeof n === 'object') {
    if (n.type && n.prompt) recalls.push(n);
    Object.values(n).forEach(walk);
  }
};
walk(content);
let bad = 0;
for (const r of recalls) {
  const counts = {
    classify: [(r.groups || []).reduce((a, g) => a + (g.items || []).length, 0), (r.groups || []).length],
    reorder: [(r.correctOrder || []).length],
    match: [(r.pairs || []).length],
    fillin: [(r.answers || []).length, (String(r.template || '').match(/___/g) || []).length],
  }[r.type] || [];
  for (const [word, n] of Object.entries(N)) {
    const re = new RegExp(`\\b${word}\\b`, 'i');
    if (!re.test(r.prompt)) continue;
    if (!counts.includes(n)) {
      bad += 1;
      console.log(`FAIL ${r.type}: prompt says "${word}" (${n}) but this recall holds ${counts.join(' / ')} — "${r.prompt.slice(0, 84)}"`);
    }
  }
}
console.log(`\n${recalls.length} recalls read from the staged bundle · ${bad} prompt/​count mismatches`);
process.exit(bad ? 1 : 0);
