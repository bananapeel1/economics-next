/* Packet 52: render every diagram view to one PNG grid with sharp, for a visual check. Dark background, since the app's diagrams are drawn for the dark theme. */
import sharp from 'sharp';
import { ALL_DIAGRAMS } from '../../../scripts/_packet52-diagrams.mjs';
const views = ALL_DIAGRAMS.flatMap((d) => d.scenarios.map((s) => ({ label: `${d.title} / ${s.label}`, svg: s.svg })));
const W = 400, S = 2, cols = 3;
const tiles = [];
for (const v of views) {
  const h = Number(v.svg.match(/viewBox="0 0 \d+ (\d+)"/)[1]);
  const buf = await sharp(Buffer.from(v.svg.replace('background:transparent', 'background:#0f172a')), { density: 72 * S }).flatten({ background: '#0f172a' }).png().toBuffer();
  tiles.push({ buf, h: h * S });
}
const rowH = Math.max(...tiles.map((t) => t.h)) + 10;
const rows = Math.ceil(tiles.length / cols);
const grid = sharp({ create: { width: cols * (W * S + 10), height: rows * rowH, channels: 3, background: '#334155' } });
await grid.composite(tiles.map((t, i) => ({ input: t.buf, left: (i % cols) * (W * S + 10), top: Math.floor(i / cols) * rowH }))).png().toFile('audit/runs/packet-52/diagrams-grid.png');
console.log(`${views.length} views -> audit/runs/packet-52/diagrams-grid.png`);
