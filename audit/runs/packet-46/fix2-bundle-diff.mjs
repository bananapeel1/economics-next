// Fix round 2: every leaf path that differs between two dumps. Reference A is either the round-1 dump saved beside this
// file (fix2-bundle-round1.json) or the pre-fix dump in the git index (":index"); B is the worktree dump.
// Run from the worktree root: node audit/runs/packet-46/fix2-bundle-diff.mjs [round1|index]
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const P = 'audit/snapshots/packet-46-bundle__economics__growth-development.json';
const which = process.argv[2] || 'round1';
const before = (which === 'index'
  ? JSON.parse(execFileSync('git', ['show', `:${P}`], { encoding: 'utf8', maxBuffer: 1 << 26 }))
  : JSON.parse(readFileSync('audit/runs/packet-46/fix2-bundle-round1.json', 'utf8'))).tables;
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
console.log(`reference: ${which === 'index' ? 'pre-fix dump (git index)' : 'round-1 dump (fix2-bundle-round1.json)'} -> worktree dump`);
for (const t of Object.keys({ ...before, ...after })) console.log(`${t.padEnd(11)} ${JSON.stringify(before[t]) === JSON.stringify(after[t]) ? 'identical' : 'DIFFERS'}`);
console.log(`\n${diffs.length} differing leaf paths; items touched: ${[...new Set(diffs.map(([p]) => p.match(/^\.\w+\[\d+\]/)?.[0]))].join(', ')}`);
for (const [p, a, b] of diffs) console.log(`${p}\n  - ${JSON.stringify(a)}\n  + ${JSON.stringify(b)}`);
const ci = before.quiz.map((q, i) => (q.correctIndex !== after.quiz[i].correctIndex ? i : -1)).filter((i) => i >= 0);
const hist = (qz) => JSON.stringify([0, 1, 2, 3].map((k) => qz.filter((q) => q.correctIndex === k).length));
console.log(`\ncorrectIndex changed on: ${ci.length ? ci.join(', ') : 'none'} (of ${after.quiz.length}); histogram ${hist(before.quiz)} -> ${hist(after.quiz)}`);
console.log(`chapter-2 quizIndices ${JSON.stringify(before.content[1].quizIndices)} -> ${JSON.stringify(after.content[1].quizIndices)}; chapter-3 ${JSON.stringify(before.content[2].quizIndices)} -> ${JSON.stringify(after.content[2].quizIndices)}`);
