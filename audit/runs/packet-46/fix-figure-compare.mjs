// A fixed error set (wSlip, youngOnly, perWorker), realistic emerging-economy structures.
const DIAGRAM = [1.8, 2, 4, 4.3, 6, 10.2, 12, 15, 22, 42, 54, 59, 63, 64, 85, 100];
const CH_RATIOS = [67, 150, 85];           // ratio-like numbers elsewhere in chapter 3 (recall answer + distractor, teaching)
const dist = (v, set) => Math.min(...set.map((x) => Math.abs(v - x)));
const rows = [];
for (let Y = 16; Y <= 28; Y++) for (let O = 3; O <= 10; O++) {
  const W = 100 - Y - O, D = Y + O;
  if ([Y, O, W].some((v) => DIAGRAM.includes(v))) continue;
  const raw = { key: D / W * 100, wSlip: D / (100 - Y) * 100, youngOnly: Y / W * 100, perWorker: 100 / W * 100 };
  if (Object.values(raw).some((x) => Math.abs(x - Math.floor(x) - 0.5) < 0.12)) continue;
  const o = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, Math.round(v)]));
  const opts = Object.values(o); if (new Set(opts).size !== 4) continue;
  const s = [...opts].sort((a, b) => a - b); if (s.some((v, i) => i && v - s[i - 1] < 2)) continue;
  rows.push({ Y, O, W, ...o, keyDiag: dist(o.key, DIAGRAM), optDiag: Math.min(...opts.map((v) => dist(v, DIAGRAM))), chRatio: Math.min(...opts.map((v) => dist(v, CH_RATIOS))) });
}
rows.sort((a, b) => b.keyDiag - a.keyDiag || b.optDiag - a.optDiag);
console.table(rows.slice(0, 15));
