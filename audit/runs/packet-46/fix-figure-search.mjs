// Stem gives Y (under 15) and O (over 64) only; the student must find W = 100 - Y - O.
// Every distractor is a NAMED error. Criteria printed with each candidate.
const DIAGRAM = [1.8, 2, 4, 4.3, 6, 10.2, 12, 15, 22, 42, 54, 59, 63, 64, 85, 100];
const CHAPTER = [30, 10, 60, 67, 40, 150, 65, 50];
const T = Number(process.argv[2] || 7), MAXOPT = Number(process.argv[3] || 200);
const dist = (v, set) => Math.min(...set.map((x) => Math.abs(v - x)));
const keep = [];
for (let Y = 12; Y <= 50; Y += 1) for (let O = 2; O <= 30; O += 1) {
  const W = 100 - Y - O; if (W < 45 || W > 80) continue;
  if ([Y, O, W].some((v) => DIAGRAM.includes(v))) continue;
  const D = Y + O, Kx = (D / W) * 100, K = Math.round(Kx);
  if (Math.abs(Kx - Math.floor(Kx) - 0.5) < 0.15) continue;
  const E = {
    inverted: (W / D) * 100,          // working age over dependants
    youngOnly: (Y / W) * 100,         // forgot the old in the numerator
    wSlip: (D / (100 - Y)) * 100,     // took working age as 100 - Y, forgot to subtract the old
    perWorker: (100 / W) * 100,       // whole population over working age: counts workers as their own dependants
    share: D,                         // stopped at the dependants' share of the population
    oldOnly: (O / W) * 100,
  };
  const names = Object.keys(E);
  for (let a = 0; a < names.length; a++) for (let b = a + 1; b < names.length; b++) for (let c = b + 1; c < names.length; c++) {
    const pick = [names[a], names[b], names[c]];
    if (pick.some((n) => Math.abs(E[n] - Math.floor(E[n]) - 0.5) < 0.1)) continue;
    const opts = [K, ...pick.map((n) => Math.round(E[n]))];
    if (new Set(opts).size !== 4 || opts.some((v) => v > MAXOPT)) continue;
    const sorted = [...opts].sort((x, y) => x - y); if (sorted.some((v, i) => i && v - sorted[i - 1] < 2)) continue;
    if (opts.some((v) => dist(v, DIAGRAM) < T)) continue;
    if (opts.some((v) => dist(v, CHAPTER) < 3)) continue;
    if (dist(K, [85, 59, 100]) < 15) continue;
    const nearest = (x) => opts.reduce((m, v) => (Math.abs(v - x) < Math.abs(m - x) ? v : m));
    const anchorsOnKey = [85, 59, 100].filter((x) => nearest(x) === K);
    keep.push({ Y, O, W, K: +Kx.toFixed(2), opts: opts.join(' / '), errs: pick.join('+'), minDiag: Math.min(...opts.map((v) => dist(v, DIAGRAM))), anchorsOnKey: anchorsOnKey.join(',') || '-' });
  }
}
keep.sort((a, b) => (a.anchorsOnKey === '-' ? 0 : 1) - (b.anchorsOnKey === '-' ? 0 : 1) || b.minDiag - a.minDiag);
console.log(`${keep.length} candidates, T=${T}, max option ${MAXOPT}`);
for (const r of keep.slice(0, 40)) console.log(JSON.stringify(r));
