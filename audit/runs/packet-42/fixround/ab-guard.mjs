/* A/B for Rule 3: the SHIPPED pattern list, imported from the module the runner imports it from,
   run over a served payload. Pre-fix must FAIL, post-fix must PASS. */
import { readFileSync } from 'node:fs';
import { SCAFFOLDING_IN_PROSE } from '../../../../scripts/_packet42-util.mjs';

const d = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const strings = [];
(function walk(n, p) {
  if (typeof n === 'string') return strings.push([p, n]);
  if (Array.isArray(n)) return n.forEach((v, i) => walk(v, `${p}[${i}]`));
  if (n && typeof n === 'object') return Object.entries(n).forEach(([k, v]) => walk(v, `${p}.${k}`));
})(d, '$');

let hits = 0;
const paths = new Set();
for (const [re] of SCAFFOLDING_IN_PROSE) {
  const g = new RegExp(re.source, `${re.flags.replace('g', '')}g`);
  for (const [path, s] of strings) {
    g.lastIndex = 0;
    let m;
    while ((m = g.exec(s)) !== null) {
      hits += 1; paths.add(path);
      if (process.argv[3] === '--list') console.log(`  ${path}\t${JSON.stringify(m[0])}\t${JSON.stringify(s.slice(Math.max(0, m.index - 30), m.index + 50))}`);
    }
  }
}
console.log(`${process.argv[2]}: ${hits} Rule 3 hits across ${paths.size} student-facing strings → ${hits ? 'GUARD FAILS (defect present)' : 'GUARD PASSES (clean)'}`);
process.exit(hits ? 1 : 0);
