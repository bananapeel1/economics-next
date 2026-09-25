/*
 * Verify A round 4. The attack, run through the shipping marker.
 *
 * `payback`'s verdict step offers "Y years M months", "Y+1 years M months" and "Y years 12−M
 * months". M is the answer to the 2-mark `months` step above it, and every step of the card
 * renders at once (components/quant/CalculationItem.jsx:68-115). So: take the month that appears
 * in two of the three choices and type it. `paybackMonth === 6` is excluded by the draw, so the
 * vote never ties.
 *
 *   node audit/runs/packet-13.2/verify-a-round-4-payback-attack.mjs
 *
 * Result: 5,000 of 5,000 draws score 2/2 with no arithmetic. quant-check is silent on all of them,
 * because the answer is a bare integer ≤ 12 and check 7 exempts those.
 */
import { buildItem, markItem } from '../../../lib/quant/index.mjs';

const monthsIn = (choice) => Number(choice.match(/(\d+) months/)[1]);
const vote = (item) => {
  const counts = {};
  for (const c of item.steps.find((s) => s.id === 'verdict').choices) {
    const m = monthsIn(c);
    counts[m] = (counts[m] || 0) + 1;
  }
  return Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
};

for (const seed of ['check-payback-0', 'check-payback-1', 'check-payback-2']) {
  const item = buildItem('payback', seed);
  const guess = vote(item);
  const r = markItem(item, { months: guess });
  console.log(`\n── ${seed}`);
  for (const c of item.steps.find((s) => s.id === 'verdict').choices) console.log(`     choice: ${c}`);
  console.log(`   true answer ${item.steps.find((s) => s.id === 'months').answer} months`);
  console.log(`   read off the choices = ${guess} → ${r.steps.months.outcome}, ${r.steps.months.awarded}/${r.steps.months.marks} marks`);
}

const D = 5000;
let win = 0;
for (let i = 0; i < D; i++) {
  const item = buildItem('payback', `check-payback-${i}`);
  if (markItem(item, { months: vote(item) }).steps.months.awarded === 2) win++;
}
console.log(`\nmajority-vote attack on the 'months' step: ${win}/${D} draws score full marks without any arithmetic`);
