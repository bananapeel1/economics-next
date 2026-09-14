// Read-only geometry helper: what sits near each DWL label, in viewBox units, after the 1/36 floor.
import { loadBundle } from './_content-write.mjs';
const want = { 'government-intervention': [0, 1], 'market-structures-contestability': [2], 'trade-global-economy': [1, 2], 'role-state-macroeconomy': [4] };
const attr = (tag, n) => { const m = new RegExp(`\\b${n}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
for (const [sec, idxs] of Object.entries(want)) {
  const b = await loadBundle(sec);
  for (const i of idxs) {
    const svg = b.diagrams[i].svg; const vbw = Number((attr(svg, 'viewBox') || '0 0 500 350').split(/[\s,]+/)[2]); const floor = vbw / 36;
    const texts = [...svg.matchAll(/<text([^>]*)>([^<]*(?:<tspan[^>]*>[^<]*<\/tspan>[^<]*)*)<\/text>/g)].map((m) => { const s = Number(attr(m[1], 'font-size') || vbw / 40); const fs = Math.max(s, floor); const txt = m[2].replace(/<[^>]+>/g, ''); const x = Number(attr(m[1], 'x')), y = Number(attr(m[1], 'y')); const anchor = attr(m[1], 'text-anchor') || 'start'; const w = txt.length * fs * 0.55; const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x; return { txt, x, y, fs, anchor, box: [x0, y - fs, x0 + w, y] }; });
    const dwl = texts.find((t) => /DWL/.test(t.txt));
    const near = texts.filter((t) => t !== dwl && Math.abs(t.x - dwl.x) < 120 && Math.abs(t.y - dwl.y) < 60).map((t) => `${JSON.stringify(t.txt)}@(${t.x},${t.y}) ${t.anchor} fs${t.fs.toFixed(1)}`);
    const polys = [...svg.matchAll(/<polygon points="([^"]+)"[^>]*>/g)].map((m) => m[1]).filter((p) => p.split(/\s+/).some((pt) => { const [px, py] = pt.split(',').map(Number); return Math.abs(px - dwl.x) < 90 && Math.abs(py - dwl.y) < 60; }));
    const lines = [...svg.matchAll(/<line ([^>]*)>/g)].map((m) => m[1]).filter((l) => { const x1 = Number(attr(l, 'x1')), y1 = Number(attr(l, 'y1')), x2 = Number(attr(l, 'x2')), y2 = Number(attr(l, 'y2')); return Math.min(Math.abs(x1 - dwl.x), Math.abs(x2 - dwl.x)) < 80 && Math.min(Math.abs(y1 - dwl.y), Math.abs(y2 - dwl.y)) < 50; }).map((l) => `(${attr(l, 'x1')},${attr(l, 'y1')})-(${attr(l, 'x2')},${attr(l, 'y2')})`);
    const paths = [...svg.matchAll(/<path d="([^"]{0,80})/g)].length;
    console.log(`\n## ${sec}[${i}] ${b.diagrams[i].title} vb=${vbw} floor=${floor.toFixed(1)}\n  DWL @(${dwl.x},${dwl.y}) ${dwl.anchor} fs${dwl.fs.toFixed(1)}\n  polys: ${polys.join(' | ')}\n  lines: ${lines.slice(0, 8).join(' ')}\n  near text: ${near.join(' ; ')}\n  paths: ${paths}`);
  }
}
