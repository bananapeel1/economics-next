/**
 * Packet 12.8 close-out, E082 class scan (REPORT ONLY; fixes nothing).
 * For every public/diagrams/*.svg that draws curves as plain <line> elements and marks points with
 * dots (<circle>, r <= 6), is each dot within 3 px of an intersection of two drawn lines?
 * "Drawn lines" = <line> elements that are not dashed guides (a class whose CSS sets
 * stroke-dasharray, or the attribute) and not grid lines. Axes count (a dot may mark an intercept);
 * an axis-with-axis crossing (the origin) does not. Segments are intersected within their extents
 * (0.5 px slack). Files, or parts of files, under a `transform` are listed and not measured.
 *   node audit/runs/packet-12.8/diagram-geometry-scan.mjs [--md out.md]
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve(process.env.DIAGRAM_DIR || 'public/diagrams'); // DIAGRAM_DIR: the A/B control
const TOL = 3;
const attr = (s, k) => { const m = s.match(new RegExp(`\\b${k}="([^"]*)"`)); return m ? m[1] : null; };
const num = (s, k) => { const v = attr(s, k); return v === null ? null : Number(v); };

function scan(file) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const dashedCls = new Set();
  for (const m of raw.matchAll(/\.([A-Za-z0-9_-]+)\s*\{([^}]*)\}/g)) if (/stroke-dasharray/.test(m[2])) dashedCls.add(m[1]);
  const clsOf = (a) => (attr(a, 'class') || '').split(/\s+/).filter(Boolean);
  const lines = [...raw.matchAll(/<line\b([^>]*)\/?>/g)].map((m) => ({ a: m[1], c: clsOf(m[1]) }))
    .filter((l) => !l.c.some((c) => dashedCls.has(c) || c === 'grid') && !/stroke-dasharray/.test(l.a))
    .map((l, i) => ({ id: `${l.c.join('.') || 'line'}#${i}`, axis: l.c.includes('axis'), x1: num(l.a, 'x1'), y1: num(l.a, 'y1'), x2: num(l.a, 'x2'), y2: num(l.a, 'y2') }));
  const dots = [...raw.matchAll(/<circle\b([^>]*)\/?>/g)].map((m) => ({ c: clsOf(m[1]).join('.') || 'circle', x: num(m[1], 'cx'), y: num(m[1], 'cy'), r: num(m[1], 'r') }))
    .filter((d) => d.r !== null && d.r <= 6);
  const transformed = /transform=/.test(raw);
  const curves = lines.filter((l) => !l.axis);
  if (curves.length < 2 || !dots.length) return { file, skipped: `${curves.length} non-axis solid <line>, ${dots.length} dot(s)`, transformed };
  const X = [];
  for (let i = 0; i < lines.length; i += 1) for (let j = i + 1; j < lines.length; j += 1) {
    const a = lines[i], b = lines[j];
    if (a.axis && b.axis) continue;
    const d = (a.x1 - a.x2) * (b.y1 - b.y2) - (a.y1 - a.y2) * (b.x1 - b.x2);
    if (Math.abs(d) < 1e-9) continue;
    const t = ((a.x1 - b.x1) * (b.y1 - b.y2) - (a.y1 - b.y1) * (b.x1 - b.x2)) / d;
    const x = a.x1 + t * (a.x2 - a.x1), y = a.y1 + t * (a.y2 - a.y1);
    const inside = (l) => x >= Math.min(l.x1, l.x2) - 0.5 && x <= Math.max(l.x1, l.x2) + 0.5 && y >= Math.min(l.y1, l.y2) - 0.5 && y <= Math.max(l.y1, l.y2) + 0.5;
    if (inside(a) && inside(b)) X.push({ x, y, pair: `${a.id} × ${b.id}` });
  }
  const rows = dots.map((dt) => {
    let best = null;
    for (const p of X) { const dist = Math.hypot(p.x - dt.x, p.y - dt.y); if (!best || dist < best.dist) best = { ...p, dist }; }
    return { dot: `${dt.c} (${dt.x}, ${dt.y})`, nearest: best ? `(${best.x.toFixed(2)}, ${best.y.toFixed(2)}) ${best.pair}` : 'none', dist: best ? best.dist : Infinity };
  });
  return { file, transformed, lines: lines.length, dots: dots.length, rows };
}

const results = fs.readdirSync(DIR).filter((f) => f.endsWith('.svg')).sort().map(scan);
const out = [];
out.push('| file | dot | nearest intersection of two drawn lines | distance (px) |', '|---|---|---|---|');
let off = 0, measured = 0, dotsN = 0;
for (const r of results) {
  if (r.skipped) continue;
  measured += 1; dotsN += r.dots;
  for (const row of r.rows) if (row.dist > TOL) { off += 1; out.push(`| ${r.file}${r.transformed ? ' (has transform)' : ''} | ${row.dot} | ${row.nearest} | ${Number.isFinite(row.dist) ? row.dist.toFixed(2) : '∞'} |`); }
}
const skipped = results.filter((r) => r.skipped).map((r) => `${r.file} (${r.skipped}${r.transformed ? ', has transform' : ''})`);
const summary = `${measured} files measured, ${dotsN} dots, ${off} more than ${TOL} px from any intersection of two drawn lines.`;
console.log(summary);
console.log(out.join('\n'));
console.log(`\nNot measured (no line curves or no dots): ${skipped.join('; ')}`);
console.log('\nAll dots, measured files:');
for (const r of results) if (!r.skipped) for (const row of r.rows) console.log(`  ${r.file}  ${row.dot}  -> ${row.nearest}  ${row.dist.toFixed(2)}`);
