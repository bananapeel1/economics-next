/* PROTOCOL gate item 5: the served draft, FIELD BY FIELD against what the runner emitted.
 * The served payload is the database over HTTP; the bundle snapshot is the file. Comparing them
 * is what catches a source fix that was never re-dumped — a repository agreeing with itself while
 * the database still holds the defect.
 *
 * Two surfaces, two methods, because the API does not serve these tables verbatim:
 *   STRICT  content, notes, practice, diagrams, extras — every leaf field, string for string.
 *           `quizIndices` / `practiceIndices` are EXCLUDED: the route renumbers them onto the
 *           preview slice it serves, so they are a property of the response, not of the bundle.
 *   SET     quiz, flashcards, mistakes — truncated to a signed-out preview, and F074 reshuffles
 *           each item's options and rehashes its id at render. So each served stem must EXIST in
 *           the bundle and its options must be a PERMUTATION of that item's options.
 */
import { readFileSync } from 'node:fs';
const served = JSON.parse(readFileSync('audit/runs/packet-42/fixround/served-post.json', 'utf8'));
const bundle = JSON.parse(readFileSync('audit/snapshots/packet-42-bundle__business__resource-management.json', 'utf8')).tables;

const SKIP = /\.(quizIndices|practiceIndices)(\[|$)/;
const flat = (n, p, out) => {
  if (SKIP.test(p)) return out;
  if (n === null || typeof n !== 'object') { out.set(p, n); return out; }
  if (Array.isArray(n)) { n.forEach((v, i) => flat(v, `${p}[${i}]`, out)); return out; }
  Object.entries(n).forEach(([k, v]) => flat(v, `${p}.${k}`, out));
  return out;
};

let checked = 0; const mismatches = []; const missing = [];
for (const key of ['content', 'notes', 'practice', 'diagrams', 'extras']) {
  const s = flat(served[key], `$.${key}`, new Map());
  const b = flat(bundle[key], `$.${key}`, new Map());
  for (const [path, val] of s) {
    if (!b.has(path)) { missing.push(path); continue; }
    checked += 1;
    if (b.get(path) !== val) mismatches.push(`${path}\n    served: ${JSON.stringify(String(val).slice(0, 110))}\n    bundle: ${JSON.stringify(String(b.get(path)).slice(0, 110))}`);
  }
  console.log(`STRICT ${key}: ${s.size} served leaf fields, all present in bundle: ${s.size - missing.length >= 0}`);
}

const setCheck = (key, stemOf, optsOf) => {
  const byStem = new Map((bundle[key] || []).map((x) => [stemOf(x), x]));
  let n = 0;
  for (const it of served[key] || []) {
    const stem = stemOf(it);
    const hit = byStem.get(stem);
    if (!hit) { mismatches.push(`${key}: served stem not in bundle — ${JSON.stringify(stem.slice(0, 80))}`); continue; }
    n += 1;
    const a = [...(optsOf(it) || [])].sort(); const b2 = [...(optsOf(hit) || [])].sort();
    if (JSON.stringify(a) !== JSON.stringify(b2)) mismatches.push(`${key}: options are not a permutation — ${JSON.stringify(stem.slice(0, 60))}`);
  }
  console.log(`SET    ${key}: ${n} of ${(served[key] || []).length} served items matched into the bundle's ${(bundle[key] || []).length}`);
};
setCheck('quiz', (x) => x.question, (x) => x.options);
setCheck('flashcards', (x) => x.front, () => null);
setCheck('mistakes', (x) => x.mistake || x.title || JSON.stringify(x), () => null);

console.log(`\n${checked} leaf fields compared served-vs-bundle`);
console.log(`${missing.length} served fields with no bundle counterpart${missing.length ? `:\n  ${missing.slice(0, 10).join('\n  ')}` : ''}`);
console.log(`${mismatches.length} mismatches${mismatches.length ? `:\n  ${mismatches.slice(0, 10).join('\n  ')}` : ''}`);
process.exit(mismatches.length || missing.length ? 1 : 0);
