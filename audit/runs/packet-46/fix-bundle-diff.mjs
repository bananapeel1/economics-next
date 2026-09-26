// Every leaf path that differs between the pre-fix dump (the git index copy) and the new dump (the worktree copy).
// Reads only those two files. Run from the worktree root: node audit/runs/packet-46/fix-bundle-diff.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const P = 'audit/snapshots/packet-46-bundle__economics__growth-development.json';
const before = JSON.parse(execFileSync('git', ['show', `:${P}`], { encoding: 'utf8', maxBuffer: 1 << 26 })).tables;
const after = JSON.parse(readFileSync(P, 'utf8')).tables;
const diffs = [];
const walk = (a, b, path) => {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b) || a === null || b === null || typeof a !== 'object') {
    if (JSON.stringify(a) !== JSON.stringify(b)) diffs.push([path, a, b]);
    return;
  }
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) walk(a[k], b[k], `${path}${Array.isArray(a) ? `[${k}]` : `.${k}`}`);
};
walk(before, after, '');
for (const t of Object.keys({ ...before, ...after })) console.log(`${t.padEnd(11)} ${JSON.stringify(before[t]) === JSON.stringify(after[t]) ? 'identical' : 'DIFFERS'}`);
console.log(`\n${diffs.length} differing leaf paths:`);
for (const [p, a, b] of diffs) console.log(`${p}\n  - ${JSON.stringify(a)}\n  + ${JSON.stringify(b)}`);
const ci = before.quiz.map((q, i) => (q.correctIndex !== after.quiz[i].correctIndex ? i : -1)).filter((i) => i >= 0);
console.log(`\ncorrectIndex changed on: ${ci.length ? ci.join(', ') : 'none'} (of ${after.quiz.length}); histogram before ${JSON.stringify([0, 1, 2, 3].map((k) => before.quiz.filter((q) => q.correctIndex === k).length))} after ${JSON.stringify([0, 1, 2, 3].map((k) => after.quiz.filter((q) => q.correctIndex === k).length))}`);
console.log(`chapter-3 quizIndices before ${JSON.stringify(before.content[2].quizIndices)} after ${JSON.stringify(after.content[2].quizIndices)}`);
