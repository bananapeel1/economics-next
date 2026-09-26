// Packet 12.7 — fetch every model-answer section page from the dev server and write the
// <main> HTML (scripts/styles stripped) to <outdir>/<subject>__<slug>.html, for a before/after diff.
import fs from 'node:fs';
import path from 'node:path';
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '../../../data/modelAnswerPages.js';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
for (const p of MODEL_ANSWER_PAGES) {
  const url = `http://localhost:3001${modelAnswersPath(p)}`;
  const res = await fetch(url);
  let html = await res.text();
  html = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<link[^>]*>/g, '');
  const m = html.match(/<main[\s\S]*<\/main>/);
  fs.writeFileSync(path.join(out, `${p.subject}__${p.slug}.html`), `${res.status}\n${m ? m[0] : html}`);
  console.log(res.status, url);
}
