/**
 * PACKET 45 — render every diagram view in the DUMPED bundle file to one PNG grid, for a human look.
 * Reads audit/snapshots/packet-45-bundle__economics__labour-markets.json (not the runner's modules),
 * paints the dark card background the app uses, 3 views a row at 2x.
 */
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const bundle = JSON.parse(readFileSync('audit/snapshots/packet-45-bundle__economics__labour-markets.json', 'utf8')).tables;
const views = bundle.diagrams.flatMap((d) => d.scenarios.map((s) => ({ name: `${d.title} / ${s.label}`, svg: s.svg })));
const W = 800, H = 612, COLS = 3;
const tiles = await Promise.all(views.map(async (v) => {
  const svg = v.svg.replace(/(<svg[^>]*>)/, `$1<rect width="100%" height="100%" fill="#0f172a"/>`);
  return sharp(Buffer.from(svg), { density: 144 }).resize(W, H, { fit: 'contain', background: '#0f172a' }).png().toBuffer();
}));
const rows = Math.ceil(tiles.length / COLS);
const out = sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: '#000000' } })
  .composite(tiles.map((input, i) => ({ input, left: (i % COLS) * W, top: Math.floor(i / COLS) * H })));
await out.png().toFile('audit/runs/packet-45/diagrams-grid.png');
console.log(`rendered ${tiles.length} views:`); views.forEach((v, i) => console.log(`  ${i + 1}. ${v.name}`));
