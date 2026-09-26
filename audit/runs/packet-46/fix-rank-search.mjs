// placeKeys deals every key by the stem-hash RANK over the whole bank, so a reworded stem can re-deal the keys of
// unchanged (published) items. List candidate wordings for quiz[14] and whether they keep its rank (packet 45's method).
// The OLD stems are read from the pre-fix dump as the git index holds it (the fix changes the worktree copy only).
// Run from the worktree root: node audit/runs/packet-46/fix-rank-search.mjs
import { execFileSync } from 'node:child_process';
import { hash8 } from '../../../scripts/_packet46-util.mjs';
const old = JSON.parse(execFileSync('git', ['show', ':audit/snapshots/packet-46-bundle__economics__growth-development.json'], { encoding: 'utf8', maxBuffer: 1 << 26 }));
const IDX = 14;
const stems = old.tables.quiz.map((q) => q.question);
if (!/40% of its people under 15, 5% over 64 and 55%/.test(stems[IDX])) throw new Error('quiz[14] is not the old dependency item');
const rankOf = (arr) => { const s = arr.map((q, i) => [i, hash8(q)]).sort((a, b) => (a[1] < b[1] ? -1 : 1)); const r = new Map(); s.forEach(([i], k) => r.set(i, k)); return r; };
const base = rankOf(stems);
const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
const openers = [
  'An emerging economy\'s birth rate has fallen. Now 20% of its people are under 15 and 5% are over 64.',
  'An emerging economy\'s birth rate has fallen: 20% of its people are under 15 and 5% are over 64.',
  'After its birth rate fell, an emerging economy has 20% of its people under 15 and 5% over 64.',
  'Birth rates have fallen in an emerging economy, and 20% of its people are now under 15 and 5% over 64.',
  'In an emerging economy where the birth rate has fallen, 20% of people are under 15 and 5% are over 64.',
  'An emerging economy whose birth rate has fallen has 20% of its people under 15 and 5% over 64.',
  'Its birth rate having fallen, an emerging economy now has 20% of its people under 15 and 5% over 64.',
  'An emerging economy has 20% of its people under 15 and 5% over 64, after a fall in its birth rate.',
  'After a fall in its birth rate, 20% of an emerging economy\'s people are under 15 and 5% are over 64.',
  'An emerging economy\'s birth rate has fallen, so only 20% of its people are under 15; 5% are over 64.',
];
const tails = [
  'Its dependency ratio is about:', 'Its dependency ratio is closest to:', 'Its dependency ratio is approximately:',
  'Its dependency ratio, to the nearest whole number, is:', 'What is its dependency ratio, to the nearest whole number?',
  'The dependency ratio is about:', 'Its dependency ratio is now about:',
];
const out = [];
for (const o of openers) for (const t of tails) {
  const c = `${o} ${t}`;
  const arr = [...stems]; arr[IDX] = c; const r = rankOf(arr);
  const moved = [...base.keys()].filter((i) => base.get(i) !== r.get(i));
  const maxJ = Math.max(...stems.filter((_, i) => i !== IDX).map((s) => jac(s, c)));
  out.push({ ok: moved.length === 0, moved: moved.length, hash: hash8(c), maxJ: +maxJ.toFixed(2), c });
}
console.log(`old: rank ${base.get(IDX)} (slot ${base.get(IDX) % 4}) hash ${hash8(stems[IDX])}; neighbours by hash:`);
const sorted = stems.map((q, i) => [i, hash8(q)]).sort((a, b) => (a[1] < b[1] ? -1 : 1));
const k = sorted.findIndex(([i]) => i === IDX); console.log('  ', JSON.stringify(sorted.slice(Math.max(0, k - 1), k + 2)));
for (const r of out.filter((x) => x.ok)) console.log(`OK  ${r.hash} J=${r.maxJ} ${r.c}`);
console.log(`${out.filter((x) => x.ok).length} of ${out.length} keep the rank`);
