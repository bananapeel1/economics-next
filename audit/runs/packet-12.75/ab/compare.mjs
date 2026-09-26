// E051 A/B: the rendered page body of every model-answer page, before (captured from the dev
// server BEFORE any packet-12.75 edit) and after. Normalised ONLY for what differs between two
// requests of an unchanged page in dev mode: <script> chunk tags (hashed, non-deterministic order),
// <link> tags, and the RSC flight payload. JSON-LD <script type="application/ld+json"> blocks are
// KEPT and compared byte for byte, as are <title> and the canonical <link> (extracted separately).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const pages = fs.readFileSync(path.join(dir, 'pages.txt'), 'utf8').trim().split('\n');
const body = (html) => {
  const b = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>'));
  return b
    .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, '');
};
const head = (html) => ({
  title: (html.match(/<title>[\s\S]*?<\/title>/) || [''])[0],
  canonical: (html.match(/<link rel="canonical"[^>]*>/) || [''])[0],
  ld: html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [],
  metas: (html.match(/<meta (name|property)="(description|og:[a-z]+|robots|twitter:[a-z]+)"[^>]*>/g) || []).join('\n'),
});
let same = 0; const rows = [];
for (const p of pages) {
  const f = p.replace(/\//g, '_') + '.html';
  const a = fs.readFileSync(path.join(dir, 'before', f), 'utf8');
  const b = fs.readFileSync(path.join(dir, 'after', f), 'utf8');
  const ha = head(a), hb = head(b);
  const headSame = ha.title === hb.title && ha.canonical === hb.canonical && JSON.stringify(ha.ld) === JSON.stringify(hb.ld) && ha.metas === hb.metas;
  const bodySame = body(a) === body(b);
  if (bodySame && headSame) same++;
  rows.push(`${bodySame ? 'SAME' : 'DIFF'} body  ${headSame ? 'SAME' : 'DIFF'} title/canonical/ld/meta  ld=${ha.ld.length}  ${p}`);
}
console.log(rows.join('\n'));
console.log(`\n${same} of ${pages.length} pages identical in body AND head`);
