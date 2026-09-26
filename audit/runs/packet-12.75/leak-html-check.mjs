// E048, half 1: every criterion, model-answer segment, segment note, examiner's note and mark-scheme
// row of every criteria-bearing item is in the SERVER HTML — searched for in the markup with every
// <script> removed, so the RSC flight payload cannot stand in for rendered HTML. The expected text
// comes from data/modelAnswersData.js, not from the component.
// Usage: node leak-html-check.mjs <saved-html-file>
import fs from 'node:fs';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
const html = fs.readFileSync(process.argv[2], 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&rsquo;/g, '’').replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&nbsp;/g, ' ');
const plain = (s) => decode(String(s).replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const page = plain(html);
const items = MODEL_ANSWERS.filter((a) => a.criteria?.length);
let checked = 0; const missing = [];
const need = (id, kind, s) => { const t = plain(s); if (!t) return; checked++; if (!page.includes(t)) missing.push(`${id} ${kind}: "${t.slice(0, 70)}"`); };
for (const a of items) {
  a.criteria.forEach((c) => need(a.id, `criterion ${c.id}`, c.text));
  a.script.forEach((p) => p.segments.forEach((s) => { need(a.id, `segment ${s.id}`, s.html); need(a.id, `note ${s.id}`, s.note || ''); }));
  need(a.id, 'examiner', a.examinerCommentary || '');
  (a.markScheme || []).forEach((r, i) => { need(a.id, `scheme ${i} range`, r.range); need(a.id, `scheme ${i} desc`, r.desc); });
}
console.log(`${items.length} items, ${checked} strings checked, ${missing.length} missing from the script-free server HTML`);
missing.slice(0, 20).forEach((m) => console.log('  MISSING ' + m));
process.exit(missing.length ? 1 : 0);
