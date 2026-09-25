/* Verify A round 3 — the same collision, counted over the WHOLE draw space rather than sampled.
 *
 * FORECAST_PAIRS and ECONOMICS_SETS are module-private, so the pair list is re-derived from the
 * two literal loops in lib/quant/templates/percentage-change.mjs:118-133 and then CHECKED against
 * the pairs the shipping draw actually produces (a re-derivation that is not cross-checked is
 * just a second opinion from the same head). The set list is recovered from the shipping build:
 * one draw per stem until every stem has been seen.
 */
import { buildItem } from '../../../lib/quant/index.mjs';

const round = (n, dp) => Number(Number(n).toFixed(dp));
const ID = 'percentage-change-economics';
const TOL = 0.05;                               // step one's tolerance

// ── pairs, re-derived ────────────────────────────────────────────────────────────────
const derived = [];
for (let first = 20; first <= 70; first += 1) {
  for (let fall = 5; fall <= 20; fall += 1) {
    const second = first - fall;
    if (second < 5) continue;
    const rateNow = round(first / 10, 1);
    const rateNext = round(second / 10, 1);
    const points = round(fall / 10, 1);
    const asPctOfRate = round((points / rateNow) * 100, 1);
    if (Math.abs(asPctOfRate - points) < 0.3) continue;
    derived.push({ rateNow, rateNext, points, asPctOfRate });
  }
}

// ── sets, recovered from the shipping draw ───────────────────────────────────────────
const sets = new Map();          // stem -> {pct, before, after}
const observedPairs = new Set();
for (let i = 0; i < 400000; i++) {
  const d = buildItem(ID, `ex-${i}`).data;
  sets.set(`${d.context}|${d.before}|${d.after}`, d.pct);
  observedPairs.add(`${d.rateNow}/${d.rateNext}/${d.points}/${d.asPctOfRate}`);
}
const perPct = {};
for (const pct of sets.values()) perPct[pct] = (perPct[pct] || 0) + 1;

const derivedKeys = new Set(derived.map((p) => `${p.rateNow}/${p.rateNext}/${p.points}/${p.asPctOfRate}`));
const unexplained = [...observedPairs].filter((k) => !derivedKeys.has(k));

console.log(`pairs re-derived: ${derived.length} · pairs observed in 400,000 draws: ${observedPairs.size}`);
console.log(`observed pairs the re-derivation does not explain: ${unexplained.length}`);
console.log(`number sets recovered: ${sets.size} (template declares variants = the stem count)`);
console.log(`sets by growth rate: ${Object.entries(perPct).map(([k, v]) => `${k}%: ${v}`).join(' · ')}`);

// ── every (set, pair) the draw can produce, scanned for a printed figure that IS the answer ──
let combos = 0, collisions = 0, prob = 0;
const examples = [];
for (const [, pct] of sets) {
  const eligible = derived.filter((p) => Math.abs(p.rateNow - pct) >= 0.1 && Math.abs(p.rateNext - pct) >= 0.1);
  combos += eligible.length;
  for (const p of eligible) {
    const printed = [p.rateNow, p.rateNext, p.points, p.asPctOfRate];
    if (printed.some((t) => Math.abs(t - pct) <= TOL)) {
      collisions++;
      prob += (1 / sets.size) * (1 / eligible.length);
      if (examples.length < 5) examples.push(`pct ${pct}% · rateNow ${p.rateNow} rateNext ${p.rateNext} points ${p.points} asPctOfRate ${p.asPctOfRate}`);
    }
  }
}
console.log(`\n(set, pair) combinations the draw can produce: ${combos.toLocaleString('en-US')}`);
console.log(`combinations where a figure printed on the question face is step one's answer: ${collisions}`);
console.log(`probability per draw: ${(prob * 100).toFixed(4)}% — about 1 in ${Math.round(1 / prob).toLocaleString('en-US')}`);
for (const e of examples) console.log(`   ${e}`);
