// E051 (1.3.5): every block that sat around the question list at HEAD is still on the page, and
// below the shell. Located by a different method from the one that produced it: the BEFORE page's
// own markup is cut into its blocks by their HEAD class names, each block's visible text is
// extracted, and that exact text is searched for in the AFTER page's text AFTER the shell ends.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const f = '_economics_market-failure-model-answers.html';
const before = fs.readFileSync(path.join(dir, 'before', f), 'utf8');
const after = fs.readFileSync(path.join(dir, 'after', f), 'utf8');
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&rarr;/g, '→').replace(/\s+/g, ' ').trim();
// Balanced cut of the element that opens at `start`.
function element(html, start) {
  const tag = html.slice(start + 1).match(/^[a-z0-9]+/)[0];
  let depth = 0; const re = new RegExp(`<${tag}\\b|</${tag}>`, 'g'); re.lastIndex = start;
  let m; while ((m = re.exec(html))) { depth += m[0].startsWith('</') ? -1 : 1; if (depth === 0) return html.slice(start, re.lastIndex); }
  return html.slice(start);
}
const blocks = [
  ['subtitle', 'class="resource-page-subtitle"'],
  ['lab-header (crumbs, counts, time note)', 'class="lab-header"'],
  ['CoveragePanel', 'class="lab-coverage"'],
  ['data-response link', 'aria-labelledby="lab-data-response"'],
  ['"Now try one yourself" CTA', 'class="seo-cta"'],
];
const shellEnd = after.indexOf('id="ps-after"');
const afterBelow = text(after.slice(shellEnd));
let ok = 0;
for (const [name, marker] of blocks) {
  const at = before.indexOf(marker);
  const start = before.lastIndexOf('<', at);
  const t = text(element(before, start));
  const found = afterBelow.includes(t);
  if (found) ok++;
  console.log(`${found ? 'PRESENT below shell' : 'MISSING'}  ${name}  (${t.length} chars: "${t.slice(0, 60)}…")`);
}
// Order below the shell: CoveragePanel, data-response link, CTA.
const pos = ['class="lab-coverage"', 'aria-labelledby="lab-data-response"', 'class="seo-cta"'].map((m) => after.indexOf(m, shellEnd));
console.log(`order Coverage < data-response < CTA: ${pos[0] > 0 && pos[0] < pos[1] && pos[1] < pos[2]}`);
console.log(`${ok} of ${blocks.length} blocks present below the shell`);
