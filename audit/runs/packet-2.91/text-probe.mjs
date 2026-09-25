// Packet 2.91 probe. Does a diagram's own vocabulary (title + description + caption), weighted by how
// few chapters of its section use each word, point at the chapter that serves it? Read-only.
//
//   node audit/runs/packet-2.91/text-probe.mjs <db-dump.json> <census.json>
import { readFileSync } from 'node:fs';

const [dumpPath, censusPath] = process.argv.slice(2);
const db = JSON.parse(readFileSync(dumpPath, 'utf8'));
const census = JSON.parse(readFileSync(censusPath, 'utf8'));

const STOP = new Set(('the and for its with from into that this are was how why what their them not but can has over which would '
  + 'best most more less than when where who whom will also each such other these those there then they been being have had does '
  + 'did doing per may might must should could about above below after before between both only same some very just all any '
  + 'one two three first second new used use using shows show shown diagram curve figure example level levels rate rates').split(' '));
const stem = (w) => w.replace(/(ies)$/, 'y').replace(/([^s])s$/, '$1');
const words = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w)).map(stem);

const flat = (v) => (v == null ? '' : typeof v === 'string' ? v : Array.isArray(v) ? v.map(flat).join(' ') : typeof v === 'object' ? Object.values(v).map(flat).join(' ') : String(v));
const chapterText = (b) => flat({ t: b.title, s: b.sections, k: b.takeaway });
const diagramText = (d) => [d.title, d.description, d.caption].filter(Boolean).join(' ');

export function attribute(diagram, content) {
  const chWords = content.map((b) => new Set(words(chapterText(b))));
  const n = chWords.length;
  const dw = [...new Set(words(diagramText(diagram)))];
  const scores = chWords.map((set) => dw.reduce((acc, w) => {
    if (!set.has(w)) return acc;
    const df = chWords.filter((s) => s.has(w)).length;
    return acc + Math.log((n + 1) / df);
  }, 0));
  let best = 0;
  scores.forEach((s, i) => { if (s > scores[best]) best = i; });
  return { scores, best };
}

let rows = 0, agree = 0;
for (const [id, r] of Object.entries(census)) {
  for (const side of ['live', 'staged']) {
    const c = r[side];
    if (!c) continue;
    const tables = side === 'live' ? db[id].live : Object.fromEntries(Object.keys(db[id].live).map((k) => [k, db[id].draft[k] ?? db[id].live[k]]));
    const content = tables.content || [];
    const diagrams = tables.diagrams || [];
    for (const ch of c.chapters) {
      if (!ch.how) continue;
      const d = diagrams.find((x) => (x.id || x.title) === ch.diagram);
      const { scores, best } = attribute(d, content);
      rows += 1;
      const ok = best === ch.block || scores[ch.block] >= scores[best];
      if (ok) agree += 1;
      if (!ok || process.argv.includes('--all')) {
        console.log(`${ok ? '  ok ' : 'DIFF'} ${side.padEnd(6)} ${id.padEnd(34)} [${ch.how}] ch${ch.block + 1} "${String(ch.title).slice(0, 34)}" <- "${String(ch.diagramTitle).slice(0, 44)}"`
          + `  here ${scores[ch.block].toFixed(1)} · best ch${best + 1} "${String(content[best]?.title).slice(0, 30)}" ${scores[best].toFixed(1)}`);
      }
    }
  }
}
console.log(`\n${rows} served diagrams · ${agree} agree · ${rows - agree} point elsewhere`);
