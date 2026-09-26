// Fix round 2: search share × fall structures for the chapter-2 item. Key = share × fall. Every distractor is a NAMED
// error. Kept only if the key and every option are at least T from every number the chapter-2 diagram prints, and the
// key is an INTERIOR option (so anchoring on the diagram's 12, "a quarter" (25) or 75 picks a distractor, not the key).
// Run from the worktree root: node audit/runs/packet-46/fix2-figure-search.mjs [T]
const DIAGRAM = [2, 3, 4, 4.3, 6, 7.2, 12, 14, 24, 25, 75, 90, 100, 120];   // emitted text + "a quarter less" = 25
const CHAPTER = [15, 60, 1.8, 33];                                           // teaching 60% × 25% = 15%, $1.8bn; recall "a third"
const T = Number(process.argv[2] || 5);
const dist = (v, set) => Math.min(...set.map((x) => Math.abs(v - x)));
const rows = [];
for (let s = 50; s <= 95; s += 5) for (let f = 20; f <= 75; f += 5) {
  if ([s, f].some((v) => DIAGRAM.includes(v))) continue;                  // stem figures keep off the diagram's numbers
  const K = (s * f) / 100; if (!Number.isInteger(K)) continue;
  const E = {
    fallAlone: f,                 // the price fall alone: as if the commodity were all the country exports
    fallTo: 100 - K,              // what earnings fall TO, not BY
    divided: (100 * f) / s,       // the fall divided by the share instead of multiplied
    shareAlone: s,                // the share alone
    shareMinusFall: s - f,        // subtracted
    otherExports: ((100 - s) * f) / 100, // the fall applied to the other exports
  };
  const names = Object.keys(E);
  for (let a = 0; a < names.length; a++) for (let b = a + 1; b < names.length; b++) for (let c = b + 1; c < names.length; c++) {
    const pick = [names[a], names[b], names[c]];
    const opts = [K, ...pick.map((n) => E[n])];
    if (opts.some((v) => !Number.isInteger(v) || v <= 0 || v >= 100)) continue;
    if (new Set(opts).size !== 4) continue;
    const sorted = [...opts].sort((x, y) => x - y);
    if (sorted.some((v, i) => i && v - sorted[i - 1] < 3)) continue;
    const dDiag = Math.min(...opts.map((v) => dist(v, DIAGRAM)));
    if (dDiag < T) continue;
    if (dist(K, CHAPTER) < 4) continue;                                     // the KEY keeps off the teaching and recall figures
    if (K === sorted[0] || K === sorted[3]) continue;                       // interior key
    const around = opts.filter((v) => v !== K && Math.abs(v - K) <= 12).length;  // route A: options near the key
    rows.push({ share: s, fall: f, key: K, opts: opts.join(' / '), errs: pick.join('+'), minDiag: dDiag, keyDiag: dist(K, DIAGRAM), nearKey: around });
  }
}
rows.sort((a, b) => b.minDiag - a.minDiag || b.nearKey - a.nearKey || b.keyDiag - a.keyDiag);
console.log(`${rows.length} candidates at T=${T}`);
console.table(rows.slice(0, 25));
