// Verify A round 5 — payback: is the month count readable, is the new rejection live,
// and is the `verdict` choice still worth its mark?  Read-only.
import { templates, buildItem, markItem } from '../../../lib/quant/index.mjs';
import payback from '../../../lib/quant/templates/payback.mjs';
import { makeRng } from '../../../lib/quant/rng.mjs';

const D = Number(process.argv[2]) || 5000;

// ---- 1. is the month count readable anywhere a student can see before answering? -----------
// The component renders stem + every step's label + prefix + suffix + method + all choices,
// all at once (components/quant/CalculationItem.jsx:65-115). Scan each surface separately.
const surfaces = {};
const bump = (k) => (surfaces[k] = (surfaces[k] || 0) + 1);
let verdictLeak = 0, verdictAttack = 0, monthsAttack = 0, items = 0;

for (let i = 0; i < D; i++) {
  const item = buildItem('payback', `check-payback-${i}`);
  items++;
  const d = item.data;
  const m = String(d.paybackMonth);
  const bare = (hay) => new RegExp(`(?<![0-9.])${m}(?![0-9])`).test(String(hay));

  if (bare(item.stem)) bump('stem (the "year N" cash-flow list)');
  for (const s of item.steps) {
    if (s.label && bare(s.label)) bump(`${s.id}.label`);
    if (s.method && bare(s.method)) bump(`${s.id}.method`);
    if (s.suffix && bare(s.suffix)) bump(`${s.id}.suffix`);
    for (const c of s.choices || []) if (bare(c)) bump(`${s.id}.choice`);
  }

  // ---- 2. the verdict choice: its own answer string, printed in another step's label -------
  const others = [item.stem, ...item.steps.filter((s) => s.id !== 'verdict').flatMap((s) => [s.label, s.method])];
  const v = item.steps.find((s) => s.id === 'verdict');
  if (others.some((t) => String(t).includes(v.answer))) verdictLeak++;

  // The attack, through the real marker: read the year out of the `months` label, click it.
  const months = item.steps.find((s) => s.id === 'months');
  const readOff = (months.label.match(/year (\d+)/) || [])[1];
  const r = markItem(item, { verdict: `year ${readOff}` });
  if (r.steps.verdict.outcome === 'correct') verdictAttack++;

  // And the round-4 attack, re-run: type the month that appears twice in the choices.
  const nums = item.steps.flatMap((s) => s.choices || []).flatMap((c) => c.match(/\d+/g) || []);
  const twice = nums.find((n) => nums.filter((x) => x === n).length >= 2);
  if (twice !== undefined) {
    const r2 = markItem(item, { months: twice });
    if (r2.steps.months.outcome === 'correct') monthsAttack++;
  }
}

console.log(`payback, ${items} draws`);
console.log('\n1. where the month count is readable before answering');
if (!Object.keys(surfaces).length) console.log('   nowhere');
for (const [k, n] of Object.entries(surfaces).sort((a, b) => b[1] - a[1])) {
  console.log(`   ${String(n).padStart(5)}/${D}  ${k}`);
}
console.log(`\n2. round-4 attack (majority month in the choices) scores months: ${monthsAttack}/${D}`);
console.log(`3. verdict answer string printed in the stem or another step's label: ${verdictLeak}/${D}`);
console.log(`   attack: click the year named in the months label -> verdict CORRECT ${verdictAttack}/${D}`);

// ---- 4. is the new rejection dead code? count how often it fires inside draw() -------------
// Re-run the draw loop's arithmetic without touching the template.
let attempts = 0, rejectedByNew = 0, rejectedByOld = 0, accepted = 0;
for (let i = 0; i < D; i++) {
  const rng = makeRng(`check-payback-${i}`);
  for (let a = 0; a < 200; a++) {
    attempts++;
    const investment = rng.step(60000, 140000, 10000);
    const paybackYear = rng.int(2, 4);
    const paybackMonth = rng.pick([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
    const y1 = rng.step(18000, 34000, 2000), y2 = rng.step(20000, 38000, 2000), y3 = rng.step(24000, 42000, 2000);
    const flows = [y1, y2, y3];
    const before = flows.slice(0, paybackYear - 1).reduce((x, y) => x + y, 0);
    const shortfall = investment - before;
    if (shortfall <= 0) continue;
    if (Math.abs(before - shortfall) < 1) continue;
    const paybackFlow = (shortfall * 12) / paybackMonth;
    if (paybackFlow % 1 !== 0) continue;
    if (paybackFlow < 20000 || paybackFlow > 90000) continue;
    flows[paybackYear - 1] = paybackFlow;
    flows.push(rng.step(26000, 46000, 2000));
    const printed = [investment, ...flows];
    if ([shortfall, paybackMonth].some((x) => printed.includes(x))) { rejectedByOld++; continue; }
    if ([paybackYear - 1, paybackYear, paybackYear + 1].includes(paybackMonth)) { rejectedByNew++; continue; }
    accepted++;
    break;
  }
}
console.log(`\n4. draw() rejection liveness over ${D} seeds (${attempts} attempts)`);
console.log(`   printed-figure clause fired : ${rejectedByOld}`);
console.log(`   NEW year-number clause fired: ${rejectedByNew}   <- 0 would mean dead code`);
console.log(`   accepted                    : ${accepted}`);
