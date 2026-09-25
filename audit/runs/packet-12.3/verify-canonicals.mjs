/**
 * Packet 12.3 — did the 22 pre-existing model-answer URLs survive the collapse into one route?
 *
 * VERIFIED BY A DIFFERENT ROUTE THAN THE ONE THAT PRODUCED THE FIX. The page table
 * (`data/modelAnswerPages.js`) was generated from the WORKING-TREE copies of the 22 shells. This
 * script ignores both of those: it reads each shell back out of GIT at HEAD — the committed copy,
 * which no step of this packet has touched — and compares it against the HTML Next actually
 * prerendered into `.next/server/app/`. Neither side is the table, so a mistake in the table cannot
 * agree with itself here.
 *
 * Run after `npm run build`, from the worktree root:
 *   node audit/runs/packet-12.3/verify-canonicals.mjs
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BUILT = path.join(ROOT, '.next', 'server', 'app');

/** The 22 shells as HEAD has them. */
function shellsAtHead() {
  const listing = execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD', 'app/economics/', 'app/business/'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  return listing
    .split('\n')
    .filter((f) => /-model-answers\/page\.js$/.test(f))
    .sort();
}

function headSource(file) {
  return execFileSync('git', ['show', `HEAD:${file}`], { cwd: ROOT, encoding: 'utf8' });
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

let checked = 0;
const problems = [];

for (const file of shellsAtHead()) {
  const src = headSource(file);
  const canonical = src.match(/alternates:\s*\{\s*canonical:\s*'([^']+)'/)?.[1];
  const ogUrl = src.match(/url:\s*'(https:\/\/[^']+)'/)?.[1];
  const urlPath = file.replace(/^app/, '').replace(/\/page\.js$/, '');
  const html = path.join(BUILT, `${urlPath}.html`);

  if (!canonical || !ogUrl) { problems.push(`${file}: could not read canonical/og:url out of HEAD`); continue; }
  if (canonical !== urlPath) { problems.push(`${file}: HEAD canonical ${canonical} is not ${urlPath}`); continue; }
  if (!fs.existsSync(html)) { problems.push(`${urlPath}: NOT PRERENDERED — the URL is gone`); continue; }

  const out = fs.readFileSync(html, 'utf8');
  const builtCanonical = out.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const builtOg = out.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  const expected = `https://revvylearn.com${canonical}`;

  if (builtCanonical !== expected) problems.push(`${urlPath}: canonical ${builtCanonical} != ${expected}`);
  if (builtOg !== ogUrl) problems.push(`${urlPath}: og:url ${builtOg} != ${ogUrl}`);

  const title = decode(out.match(/<title>([^<]*)<\/title>/)?.[1] || '');
  if (!title.includes('Exam Questions & Model Answers')) problems.push(`${urlPath}: title not retitled — "${title}"`);
  const h1 = decode((out.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1] || '').replace(/<[^>]*>/g, ''));
  if (!h1.includes('Exam Questions & Model Answers')) problems.push(`${urlPath}: h1 not retitled — "${h1}"`);

  checked += 1;
}

console.log(`pre-existing URLs checked against HEAD's own shells: ${checked}`);
for (const p of problems) console.log('PROBLEM', p);
console.log(problems.length === 0 && checked === 22 ? 'PASS 22/22' : 'FAIL');
process.exit(problems.length === 0 && checked === 22 ? 0 : 1);
