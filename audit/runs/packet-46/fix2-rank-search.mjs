// Fix round 2: placeKeys deals every key by the stem-hash RANK over the whole bank, so a reworded stem can re-deal the
// keys of unchanged items. The reference bank is the round-1 draft (the worktree dump before this round; its ranks equal
// live's). Lists candidate wordings for quiz[8] and whether they keep its rank.
// Run from the worktree root BEFORE the round-2 dump: node audit/runs/packet-46/fix2-rank-search.mjs
import { readFileSync } from 'node:fs';
import { hash8 } from '../../../scripts/_packet46-util.mjs';
const ref = JSON.parse(readFileSync(process.argv[2] || 'audit/snapshots/packet-46-bundle__economics__growth-development.json', 'utf8')).tables;
const IDX = 8;
const stems = ref.quiz.map((q) => q.question);
if (!/Copper is 50% of a country's export earnings and its world price falls by 20%/.test(stems[IDX])) throw new Error('quiz[8] in the reference is not the old copper item');
const rankOf = (arr) => { const s = arr.map((q, i) => [i, hash8(q)]).sort((a, b) => (a[1] < b[1] ? -1 : 1)); const r = new Map(); s.forEach(([i], k) => r.set(i, k)); return r; };
const base = rankOf(stems);
const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
const jac = (a, b) => { const A = tok(a), B = tok(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
const openers = [];
for (const c of ['Copper', 'Oil']) {
  const lc = c.toLowerCase();
  openers.push(
    `${c} is 80% of a country's export earnings and its world price falls by 65%.`,
    `${c} is 80% of a country's export earnings, and its world price falls by 65%.`,
    `${c} earns 80% of a country's export revenue, and its world price falls by 65%.`,
    `A country earns 80% of its export revenue from ${lc}, and the world ${lc} price falls by 65%.`,
    `${c} makes up 80% of a country's export earnings. Its world price falls by 65%.`,
    `A country relies on ${lc} for 80% of its export earnings, and the world ${lc} price falls by 65%.`,
    `${c} provides 80% of a country's export earnings, and its world price then falls by 65%.`,
    `The world price of ${lc} falls by 65% in a country where ${lc} is 80% of export earnings.`,
  );
}
const tails = ['Export earnings fall by:', 'Its export earnings fall by:', 'Its total export earnings fall by:', 'By how much do its export earnings fall?', 'Total export earnings fall by:'];
const out = [];
for (const o of openers) for (const t of tails) {
  const c = `${o} ${t}`;
  const arr = [...stems]; arr[IDX] = c; const r = rankOf(arr);
  const moved = [...base.keys()].filter((i) => base.get(i) !== r.get(i));
  const maxJ = Math.max(...stems.filter((_, i) => i !== IDX).map((s) => jac(s, c)));
  out.push({ ok: moved.length === 0, hash: hash8(c), maxJ: +maxJ.toFixed(2), c });
}
const sorted = stems.map((q, i) => [i, hash8(q)]).sort((a, b) => (a[1] < b[1] ? -1 : 1));
const k = sorted.findIndex(([i]) => i === IDX);
console.log(`old: rank ${base.get(IDX)} (slot ${base.get(IDX) % 4}) hash ${hash8(stems[IDX])}; neighbours ${JSON.stringify(sorted.slice(Math.max(0, k - 1), k + 2))}`);
for (const r of out.filter((x) => x.ok)) console.log(`OK  ${r.hash} J=${r.maxJ} ${r.c}`);
console.log(`${out.filter((x) => x.ok).length} of ${out.length} keep the rank`);
