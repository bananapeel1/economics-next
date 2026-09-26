// Packet 12.8, E064 — fetch every model-answer page from the dev server (port 3001) and write, per page:
//   <outdir>/<subject>__<slug>.html   the rendered body with <script>/<style>/<link> stripped
//   <outdir>/<subject>__<slug>.head   <title>, canonical, and every application/ld+json block, pretty-printed
// A before/after diff of these files is the "other pages render identically" check. Build ids and
// dev-only attributes are stripped so a restart alone does not register as a difference.
import fs from 'node:fs';
import path from 'node:path';
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '../../../data/modelAnswerPages.js';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
for (const p of MODEL_ANSWER_PAGES) {
  const url = `http://localhost:3001${modelAnswersPath(p)}`;
  const res = await fetch(url, { cache: 'no-store' });
  const raw = await res.text();
  const ld = [...raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => { try { return JSON.stringify(JSON.parse(m[1]), null, 1); } catch { return m[1]; } });
  const title = (raw.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const canon = (raw.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  let body = (raw.match(/<body[\s\S]*<\/body>/) || [raw])[0];
  body = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<link[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/ data-nextjs[a-z-]*="[^"]*"/g, '');
  const name = `${p.subject}__${p.slug}`;
  fs.writeFileSync(path.join(out, `${name}.html`), `${res.status}\n${body.replace(/></g, '>\n<')}`);
  fs.writeFileSync(path.join(out, `${name}.head`), `title: ${title}\ncanonical: ${canon}\n${ld.join('\n---\n')}\n`);
  console.log(res.status, url);
}
