#!/usr/bin/env node
/*
 * V009. Build, then read the build's own output in the SAME process, and write the numbers to a file.
 *
 * Two sessions share this worktree and `.next` is not per-session: a `next dev` on 3001 rewrites it
 * under a production build, and packet 2.3 counted 105 prerendered documents, re-measured minutes
 * later, and got 2. Nothing had regressed. Worse, the first pass of that grep ran against a path that
 * did not exist and reported "0 occurrences" of everything it looked for, which reads exactly like a
 * clean result. So: one command, build and census together, and it fails loudly if the artefact it is
 * about to grep is not there.
 *
 *   node audit/scripts/prerender-census.mjs            build, then census
 *   node audit/scripts/prerender-census.mjs --no-build  census the build that is already on disk
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const build = !process.argv.includes('--no-build');
const out = 'audit/runs/packet-2.3/prerender-census.json';
const log = 'audit/runs/packet-2.3/build-census.log';

if (build) {
  console.log('building…');
  try {
    const stdout = execSync('npm run build', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });
    writeFileSync(log, stdout);
  } catch (e) {
    writeFileSync(log, String(e.stdout || '') + String(e.stderr || ''));
    console.error('BUILD FAILED — see', log);
    process.exit(1);
  }
}

const table = readFileSync(log, 'utf8');
const rows = table.split('\n').filter((l) => /^[├└┌][─ ]*[○●ƒ]/.test(l));
const staticRows = rows.filter((l) => /^[├└┌][─ ]*[○●]/.test(l));
const isr = rows.filter((l) => /^[├└┌][─ ]*●/.test(l)).map((l) => l.replace(/^[├└┌][─ ]*●\s*/, '').split(/\s{2,}/)[0]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}
const docs = walk('.next/server/app');

// The one document the whole packet is about: a topic page, prerendered, served to everybody.
const sample = docs.find((p) => /\/(economics|business)\/unit-\d+\/[^/]+\.html$/.test(p));
if (!sample) {
  console.error('NO PRERENDERED TOPIC DOCUMENT FOUND — refusing to report a clean census against a missing file.');
  console.error(`(${docs.length} .html files under .next/server/app; a dev server on this worktree rewrites .next)`);
  process.exit(2);
}
const html = readFileSync(sample, 'utf8');
const count = (re) => (html.match(re) || []).length;

const census = {
  measured: new Date().toISOString(),
  routeRows: rows.length,
  staticRoutes: staticRows.length,
  dynamicRoutes: rows.length - staticRows.length,
  isrRoutes: isr,
  prerenderedDocuments: docs.length,
  sample,
  sampleBytes: html.length,
  // V007: a document served to everybody may hold no paid surface.
  paidLeaks: {
    correctIndex: count(/correctIndex/g),
    flashcardFront: count(/"front"/g),
    flashcardBack: count(/"back"/g),
  },
  // V009: nor may it hold a claim about what this reader has paid for, in either direction.
  entitlementClaims: {
    padlock: count(/overview-card-lock/g),
    firstMonthLabel: count(/FIRST MONTH/g),
    upgradeCta: count(/overview-cta-bar/g),
    paywallUnlock: count(/Unlock /g),
    freeChip: count(/overview-hero-free/g),
  },
  // proof the overview actually rendered, so the zeros above are absence and not a blank page
  rendered: {
    overviewCard: count(/overview-card/g),
    premiumLabel: count(/PREMIUM/g),
  },
};
writeFileSync(out, JSON.stringify(census, null, 2));
console.log(JSON.stringify(census, null, 2));
