// Fix round 2: served payloads from http://localhost:3001/api/sections/growth-development, signed out, saved beside this
// file. (1) live before round 1 vs live now: must be 0. (2) round-1 draft vs draft now. (3) live now vs draft now.
// Run from the worktree root: node audit/runs/packet-46/fix2-api-diff.mjs
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
const liveBefore = load('fix-api-live-before.json'), draftR1 = load('fix-api-draft-after.json');
const live = load('fix2-api-live-after.json'), draft = load('fix2-api-draft-after.json');
const show = (title, d) => {
  console.log(`\n${title}: ${d.length} differing leaf paths; items: ${[...new Set(d.map(([p]) => p.match(/^\.\w+\[\d+\]/)?.[0] || p))].join(', ') || 'none'}`);
  for (const [p, a, b] of d) console.log(`  ${p}\n    - ${JSON.stringify(a)}\n    + ${JSON.stringify(b)}`);
};
console.log(`live before round 1 vs live now: ${diffPaths(liveBefore, live).length} differing paths`);
show('round-1 draft vs draft now', diffPaths(draftR1, draft));
show('live now vs draft now', diffPaths(live, draft).map(([p, a, b]) => [p, a, b]));
console.log(`\nserved draft quiz ids: ${draft.quiz.map((q) => q.id.split(':').pop()).join(' ')}; isPremium ${draft.isPremium}; counts ${JSON.stringify(draft.counts)}`);
