// Served draft (?draft=1) against served live (no flag), both fetched from http://localhost:3001 signed out and saved
// beside this file. Lists every leaf path that differs. Also confirms live is unchanged by the fix round (after == before).
// Run from the worktree root: node audit/runs/packet-46/fix-api-diff.mjs
import { readFileSync } from 'node:fs';
const D = 'audit/runs/packet-46/';
const load = (f) => JSON.parse(readFileSync(D + f, 'utf8'));
const diffPaths = (a, b, path = '', out = []) => {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b) || a === null || b === null || typeof a !== 'object') {
    if (JSON.stringify(a) !== JSON.stringify(b)) out.push([path, a, b]);
    return out;
  }
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], `${path}${Array.isArray(a) ? `[${k}]` : `.${k}`}`, out);
  return out;
};
const draft = load('fix-api-draft-after.json'), live = load('fix-api-live-after.json');
const liveBefore = load('fix-api-live-before.json'), draftBefore = load('fix-api-draft-before.json');
console.log(`before the fix: draft vs live differing paths = ${diffPaths(draftBefore, liveBefore).length}`);
console.log(`live before vs live after (the fix round must not touch live): ${diffPaths(liveBefore, live).length} differing paths`);
const d = diffPaths(live, draft);
console.log(`\nafter the fix: served live vs served draft, ${d.length} differing leaf paths:`);
for (const [p, a, b] of d) console.log(`${p}\n  live : ${JSON.stringify(a)}\n  draft: ${JSON.stringify(b)}`);
const top = [...new Set(d.map(([p]) => p.split(/[.[]/)[1]))];
console.log(`\ntop-level keys that differ: ${top.join(', ') || 'none'}`);
console.log(`draft isPremium ${draft.isPremium}, counts ${JSON.stringify(draft.counts)}; served quiz ids: ${draft.quiz.map((q) => q.id.split(':').pop()).join(' ')}`);
