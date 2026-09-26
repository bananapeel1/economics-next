// Counts internal-scaffolding vocabulary on the SERVED draft payload.
// Walks every string in the payload, records JSON path, so the count is
// independent of the builder module's own structure.
import fs from 'node:fs';
const file = process.argv[2];
const d = JSON.parse(fs.readFileSync(file, 'utf8'));
const PATTERNS = [
  ['leafNum', /\bleaf\s+\d+[a-z]?(-\d+)?\b/gi],
  ['leafBare', /\bleaf(?:s|let)?\b/gi],
  ['specPoint', /\bspec(?:ification)?\s+point\b/gi],
  ['subTopic', /\bsub-?topic\b/gi],
  ['specRequires', /\bthe specification\b/gi],
  ['theAudit', /\bthe audit\b/gi],
];
const hits = [];
function walk(node, path) {
  if (typeof node === 'string') {
    for (const [name, re] of PATTERNS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(node)) !== null) hits.push({ name, path, match: m[0], ctx: node.slice(Math.max(0, m.index - 40), m.index + 60) });
    }
    return;
  }
  if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (node && typeof node === 'object') return Object.entries(node).forEach(([k, v]) => walk(v, `${path}.${k}`));
}
walk(d, '$');
const bodyText = hits.filter(h => /^\$\.content\[\d+\]\.sections\[\d+\]\.body\[\d+\]\.text$/.test(h.path));
const byName = {};
for (const h of hits) byName[h.name] = (byName[h.name] || 0) + 1;
console.log('TOTAL hits anywhere in payload:', hits.length);
console.log('by pattern:', JSON.stringify(byName));
console.log('hits in content[].sections[].body[].text:', bodyText.length);
console.log('  of those, leafNum:', bodyText.filter(h => h.name === 'leafNum').length);
console.log('distinct body[].text paths affected:', new Set(bodyText.map(h => h.path)).size);
console.log('distinct subsections affected:', new Set(bodyText.map(h => h.path.replace(/\.body\[\d+\]\.text$/, ''))).size);
if (process.argv[3] === '--list') for (const h of hits) console.log(`${h.name}\t${h.path}\t${JSON.stringify(h.match)}\t${JSON.stringify(h.ctx)}`);
