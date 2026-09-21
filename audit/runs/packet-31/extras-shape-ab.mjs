/*
 * V035 — A/B the guard that actually closes the finding.
 *
 * Verify A's concern 1 on packet 31, and it was right: `reach-ab.mjs` proves the rewritten prose is
 * reachable by each runner's FREQUENCY/PAPER guards, which is a different question from whether
 * `extras.shape` — the BLOCK rule that stops the shape shipping again — fires on the shape. This
 * plants each of the three real defect shapes and requires the rule to catch every one.
 *
 * It calls `validateSection` itself, the same entry point the runners and `npm run validate` use,
 * rather than re-implementing the predicate. The three shapes are the ones actually found in the
 * tree (packets 23-27), plus the body-only shape the rule was BLIND to until this packet.
 */
import { validateSection } from '../../../lib/content-validator.mjs';

const fires = (evaluation) => {
  const { findings } = validateSection(
    { extras: { chains: [], evaluation } },
    { sectionId: 'probe', subject: 'economics', unitCode: 'WEC11', number: '1.3.3', specItems: [], laterUnitTerms: [], quantTemplates: [] },
  );
  return findings.filter((f) => f.rule === 'extras.shape');
};

const CASES = [
  { name: 'packet 24/25/27 shape {title, points}', frame: { title: 'A heading', points: ['a', 'b'] }, mustFire: true, want: 'content' },
  { name: 'packet 23 shape {point, detail}', frame: { point: 'A heading', detail: 'A body' }, mustFire: true, want: 'both' },
  { name: 'body only {content} — the half this rule was blind to', frame: { content: 'A body with no heading' }, mustFire: true, want: 'title' },
  { name: 'empty title string', frame: { title: '   ', content: 'A body' }, mustFire: true, want: 'title' },
  { name: 'the canonical shape packets 28-38 author', frame: { title: 'A heading', content: 'A body' }, mustFire: false },
];

const bad = [];
for (const c of CASES) {
  const f = fires([c.frame]);
  const hit = f.length > 0;
  const keys = f.map((x) => x.key).join(', ');
  const tiers = [...new Set(f.map((x) => x.tier))].join(',');
  console.log(`${hit ? 'FIRES' : 'clear'}${tiers ? ` [${tiers}]` : ''}  ${c.name}${keys ? `  → ${keys}` : ''}`);
  if (c.mustFire !== hit) bad.push(`${c.name}: expected ${c.mustFire ? 'a finding' : 'none'}, got ${f.length}`);
  if (hit && tiers !== 'BLOCK') bad.push(`${c.name}: fired at ${tiers}, not BLOCK — a DEBT finding does not stop a runner staging`);
  if (c.want === 'both' && !(keys.includes(':title') && f.some((x) => !x.key.endsWith(':title')))) bad.push(`${c.name}: should fail on BOTH halves, got ${keys}`);
  if (c.want === 'title' && !keys.includes(':title')) bad.push(`${c.name}: should fail on the missing title, got ${keys}`);
  if (c.want === 'content' && !f.some((x) => !x.key.endsWith(':title'))) bad.push(`${c.name}: should fail on the missing content, got ${keys}`);
}

/* The rewritten frames themselves, straight from the staged bundles. */
import { readFileSync, readdirSync } from 'node:fs';
let checked = 0;
for (const f of readdirSync('audit/snapshots').filter((x) => /^packet-(23|24|25|27)-bundle__/.test(x))) {
  const evals = JSON.parse(readFileSync(`audit/snapshots/${f}`, 'utf8'))?.tables?.extras?.evaluation || [];
  checked += evals.length;
  const found = fires(evals);
  if (found.length) bad.push(`${f}: the rewritten frames still fire extras.shape (${found.map((x) => x.key).join(', ')})`);
}
if (checked !== 13) bad.push(`expected 13 rewritten frames across the four bundles, found ${checked}`);
console.log(`\n${checked} rewritten frames across the four bundles: clear.`);

if (bad.length) { console.log(`\nA/B FAILED:\n${bad.map((b) => `  - ${b}`).join('\n')}`); process.exit(1); }
console.log('A/B clean: extras.shape fires at BLOCK on every defect shape found in the tree, and on the body-only shape it was blind to.');
