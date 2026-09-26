/*
 * A/B for the MistakesTab field probe (packet 21's rule: a guard that has never been seen to fire
 * is not known to work). Runs the SAME check the runner runs, against three bundles: the one this
 * packet ships, the inherited {looks_like, why, instead} shape packets 24-36 use, and a bundle with
 * one empty body. It must pass the first and fail the other two.
 */
import { readFileSync } from 'node:fs';
import { MISTAKES } from '../../../scripts/_packet41-assessment.mjs';

const tab = readFileSync('components/MistakesTab.jsx', 'utf8');
const rendered = [...new Set([...tab.matchAll(/\bitem\.([a-zA-Z_]+)\b/g)].map((m) => m[1]))];

const check = (list) => {
  const out = [];
  for (const field of rendered) {
    const empty = list.filter((m) => !String(m[field] ?? '').trim());
    if (empty.length) out.push(`item.${field} empty on ${empty.length} of ${list.length}`);
  }
  for (const m of list) for (const f of Object.keys(m)) {
    if (f !== 'id' && !rendered.includes(f)) out.push(`unrendered field "${f}"`);
  }
  return [...new Set(out)];
};

const inherited = MISTAKES.map(({ id, title, mistake, correction, examTip }) => ({ id, title, looks_like: mistake, why: correction, instead: examTip }));
const oneEmpty = MISTAKES.map((m, i) => (i === 2 ? { ...m, correction: '' } : m));

console.log('MistakesTab.jsx renders:', rendered.join(', '));
console.log('\nSHIPPED shape      :', check(MISTAKES).length ? check(MISTAKES) : 'clean — no finding');
console.log('INHERITED shape    :', check(inherited));
console.log('ONE EMPTY BODY     :', check(oneEmpty));
const ok = check(MISTAKES).length === 0 && check(inherited).length > 0 && check(oneEmpty).length > 0;
console.log(`\nA/B ${ok ? 'PASS' : 'FAIL'}: the probe is clean on what ships and fires on both controls.`);
process.exit(ok ? 0 : 1);
