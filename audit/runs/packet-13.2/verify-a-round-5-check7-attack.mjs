// Verify A round 5 — four attempts to defeat check 7, each measured against a control.
// Read-only: nothing here imports a modified template or writes a file.
import { templates, buildItem } from '../../../lib/quant/index.mjs';

const D = Number(process.argv[2]) || 5000;
const strip = (parts) => parts.filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');

// --- check 7, copied verbatim from audit/scripts/quant-check.mjs:137-168, as the control ----
function shipped(item) {
  const hits = [];
  const prose = strip([item.stem, ...item.steps.flatMap((s) => [s.label, s.prefix, s.suffix])]);
  const constructed = strip(item.steps.flatMap((s) => s.choices || []));
  for (const step of item.steps) {
    if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
    const forms = new Set([String(step.answer), String(Number(step.answer.toFixed(1)))]);
    if (step.acceptAbs) {
      forms.add(String(Math.abs(step.answer)));
      forms.add(String(Number(Math.abs(step.answer).toFixed(1))));
    }
    for (const form of forms) {
      const pattern = new RegExp(`(?<![0-9.])(\\$?)${form.replace('.', '\\.')}(%?)(?![0-9])(?!\\.[0-9])`);
      const inProse = pattern.exec(prose);
      const inChoice = pattern.exec(constructed);
      const smallInteger = Number.isInteger(step.answer) && Math.abs(step.answer) <= 12;
      const hit = inChoice || (inProse && (!smallInteger || inProse[1] === '$' || inProse[2] === '%') ? inProse : null);
      if (!hit) continue;
      hits.push(`${step.id}:${form}`);
      break;
    }
  }
  return hits;
}

// --- ROUTE 1: a CHOICE step's answer, printed in the stem or another step's label -----------
// quant-check.mjs:141 skips the whole step on type === 'choice'. The stated reason is that a
// choice prints its own answer by definition; the code goes much further and stops looking at
// that answer anywhere on the card.
function route1(item) {
  const hits = [];
  for (const step of item.steps) {
    if (step.type !== 'choice') continue;
    const elsewhere = [item.stem, ...item.steps.filter((s) => s.id !== step.id).flatMap((s) => [s.label, s.method])];
    for (const t of elsewhere) {
      if (t && String(t).includes(String(step.answer))) { hits.push(`${step.id}:"${step.answer}"`); break; }
    }
  }
  return hits;
}

// --- ROUTE 2: the answer printed at MORE decimal places than String(answer) -----------------
// `(?!\.[0-9])` on the right stops "3" matching inside "3.5" — and also stops the guard seeing
// an answer of 3 that the card prints as "3.0", or 4.5 printed as "4.50".
function route2(item) {
  const hits = [];
  const prose = strip([item.stem, ...item.steps.flatMap((s) => [s.label, s.prefix, s.suffix, ...(s.choices || [])])]);
  for (const step of item.steps) {
    if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
    for (const dp of [1, 2, 3]) {
      const padded = step.answer.toFixed(dp);
      if (padded === String(step.answer)) continue;
      if (new RegExp(`(?<![0-9.])(\\$?)${padded.replace('.', '\\.')}(?![0-9])`).test(prose)) {
        hits.push(`${step.id}:${padded}`);
        break;
      }
    }
  }
  return hits;
}

// --- ROUTE 3: surfaces the student sees that check 7 never joins into `prose` ---------------
// CalculationItem.jsx:54-62 renders three chips above the stem: unit, specCode, topic, and
// "<n> marks". None of them reach check 7.
function route3(item) {
  const hits = [];
  const chips = strip([item.unit, item.specCode, item.topic, `${item.marks} marks`]);
  for (const step of item.steps) {
    if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
    const form = String(step.answer);
    if (new RegExp(`(?<![0-9.])${form.replace('.', '\\.')}(?![0-9])(?!\\.[0-9])`).test(chips)) hits.push(`${step.id}:${form}`);
  }
  return hits;
}

// --- ROUTE 4: a figure INSIDE tolerance of the answer, rather than equal to it --------------
// check 7 is string equality; marking.mjs:60 accepts anything within `tolerance`.
function route4(item) {
  const hits = [];
  const seen = [item.stem, ...item.steps.flatMap((s) => [s.label, ...(s.choices || [])])].filter(Boolean).join(' ');
  const tokens = (seen.replace(/(\d),(?=\d)/g, '$1').match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  for (const step of item.steps) {
    if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
    for (const t of tokens) {
      if (t === step.answer) continue;                       // equality is check 7's own job
      const target = step.acceptAbs ? Math.abs(step.answer) : step.answer;
      const given = step.acceptAbs ? Math.abs(t) : t;
      if (Math.abs(given - target) <= step.tolerance + 1e-9) { hits.push(`${step.id}:${t}~${step.answer}`); break; }
    }
  }
  return hits;
}

const ROUTES = [
  ['control  (check 7 as shipped)', shipped],
  ['route 1  choice answer printed elsewhere', route1],
  ['route 2  answer printed with extra dp', route2],
  ['route 3  meta chips never scanned', route3],
  ['route 4  inside tolerance, not equal', route4],
];

const tally = {};
for (const t of templates) for (const [name] of ROUTES) tally[`${t.id}|${name}`] = { n: 0, eg: null };

for (const t of templates) {
  for (let i = 0; i < D; i++) {
    const item = buildItem(t.id, `check-${t.id}-${i}`);
    for (const [name, fn] of ROUTES) {
      const hits = fn(item);
      if (hits.length) {
        const cell = tally[`${t.id}|${name}`];
        cell.n++;
        if (!cell.eg) cell.eg = hits.join(', ');
      }
    }
  }
}

for (const [, name] of ROUTES.entries()) {}
for (const [label] of ROUTES) {
  console.log(`\n${label}`);
  let any = false;
  for (const t of templates) {
    const c = tally[`${t.id}|${label}`];
    if (!c.n) continue;
    any = true;
    console.log(`   ${String(c.n).padStart(5)}/${D}  ${t.id.padEnd(28)} e.g. ${c.eg}`);
  }
  if (!any) console.log(`   clean on all ${templates.length} templates`);
}
