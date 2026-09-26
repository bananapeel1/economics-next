// E053 everywhere (founder, 26 Sep 2026) — HTML A/B of every model-answer page.
// before/ = dev server on a detached worktree at b1942fe (HEAD before packet 12.75), port 3121.
// after/  = dev server on a copy of the remediation working tree WITH the E053 change, port 3122.
// after-repeat/ = a second capture of after/, the noise control.
// Normalisation is ab/compare.mjs's (chunk <script>s, <link>s, comments, route announcer out;
// JSON-LD, title, canonical, metas compared byte for byte). A DIFF page passes only if cutting the
// one <details class="lab-details lab-details-midband"> element out of BEFORE makes it byte-equal
// to AFTER — i.e. the panel's removal is the whole difference. Independent of lib/mid-band-answer.js:
// it reads served markup, never the census or the rule.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const pages = fs.readFileSync(path.join(dir, 'pages.txt'), 'utf8').trim().split('\n');
const SHELL = '/economics/market-failure-model-answers';
const body = (html) => html.slice(html.indexOf('<body'), html.lastIndexOf('</body>'))
  .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<link[^>]*>/g, '').replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, '');
const head = (html) => JSON.stringify([
  (html.match(/<title>[\s\S]*?<\/title>/) || [''])[0],
  (html.match(/<link rel="canonical"[^>]*>/) || [''])[0],
  html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [],
  (html.match(/<meta (name|property)="(description|og:[a-z]+|robots|twitter:[a-z]+)"[^>]*>/g) || []).join('\n'),
]);
const OPEN = '<details class="lab-details lab-details-midband"';
function cutPanel(b) {
  const i = b.indexOf(OPEN); if (i < 0) return { out: b, n: 0 };
  if (b.indexOf(OPEN, i + 1) >= 0) return { out: b, n: 2 };
  let depth = 0, j = i; const re = /<details\b|<\/details>/g; re.lastIndex = i;
  for (let m; (m = re.exec(b));) { depth += m[0] === '</details>' ? -1 : 1; if (depth === 0) { j = re.lastIndex; break; } }
  return { out: b.slice(0, i) + b.slice(j), n: 1, text: b.slice(i, j).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 0) };
}
const read = (d, f) => fs.readFileSync(path.join(dir, d, f), 'utf8');
const rows = []; const t = { same: 0, removed: 0, fail: 0, noise: 0 };
for (const p of pages) {
  const f = p.replace(/\//g, '_') + '.html';
  const A = read('before', f), B = read('after', f), C = read('after-repeat', f);
  if (body(B) !== body(C) || head(B) !== head(C)) t.noise++;
  if (p === SHELL) { rows.push(`skip  shell page (packet 12.75's own change, not in the 31)  ${p}`); continue; }
  const hs = head(A) === head(B);
  const pa = A.includes(OPEN), pb = B.includes(OPEN);
  let v;
  if (body(A) === body(B) && hs) { v = `SAME  panel ${pa ? 'kept' : 'none'}`; t.same++; }
  else { const c = cutPanel(body(A)); if (hs && c.n === 1 && !pb && c.out === body(B)) { v = 'DIFF  = panel removed, nothing else'; t.removed++; } else { v = `FAIL  head ${hs ? 'same' : 'DIFF'}, panel before ${pa} after ${pb}`; t.fail++; } }
  rows.push(`${v.padEnd(38)} ${p}`);
}
console.log(rows.join('\n'));
console.log(`\n31 non-shell pages: ${t.same} identical, ${t.removed} differ ONLY by the removed panel, ${t.fail} other differences. Noise control (after vs after-repeat): ${t.noise} of ${pages.length} differ.`);
