/**
 * WHAT A DIAGRAM'S SMALLEST LABEL MEASURES ON A 390px PHONE, for every diagram in the product.
 *
 * `diagram.table-legible` (content-validator.mjs) measures a DECLARED TABLE against the 620px
 * column a 1024-wide laptop gives it, and says in its own note that "the phone is not covered by
 * this number and cannot be". Two things follow that nothing measured until packet 36:
 *
 *   1. the rule returns early on `if (!declared) return`, so a DRAWN diagram — a waterfall, a
 *      cycle, an AD/AS graph — is measured by nothing at any width; and
 *   2. nobody had put a number on the phone, so each packet's walkthrough rediscovers it as if it
 *      were that packet's defect. Packet 36's Verify B did, and blocked the gate on it.
 *
 * The number: an inline Learn Mode diagram is 306.74 CSS px wide at a 390px viewport, measured in
 * the browser on 18 September 2026 (`.lm-interactive-svg-wrapper` is 313px; the SVG inside it
 * renders at 306.74). A diagram authored in `vbW` units therefore renders a `face`-unit label at
 * `face x 306.74 / vbW` CSS pixels, against body copy of 16px on the same screen.
 *
 * This reports and never gates, deliberately, and it is not a validator rule: it fires on 80 of 80
 * live diagrams, and a DEBT that fires on everything would have to grow `validator-baseline.json`,
 * which the protocol says only ever shrinks. The remedy is a design decision — a wider column for
 * diagrams on a phone, a narrower authoring frame, or accept that a diagram is tapped open — and
 * DECISIONS records it as open. Run this before and after making it.
 *
 *   node audit/scripts/diagram-phone-legibility.mjs            # published `data`
 *   node audit/scripts/diagram-phone-legibility.mjs --draft    # staged `draft`
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

const env = {};
readFileSync('.env.local', 'utf8').split('\n').forEach((l) => { const [k, ...r] = l.split('='); if (k && r.length) env[k.trim()] = r.join('=').trim(); });
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

/** The inline SVG's rendered width at a 390px viewport, measured in the browser, not derived. */
const PHONE_COLUMN = 306.74;
/** Body copy on the same screen. A label at half this is the complaint Verify B wrote up. */
const BODY_COPY = 16;

const column = process.argv.includes('--draft') ? 'draft' : 'data';
const { data, error } = await sb.from('section_diagrams').select(`section_id,${column}`);
if (error) { console.error(error.message); process.exit(1); }

const rows = [];
for (const r of data) {
  const payload = r[column];
  const list = Array.isArray(payload) ? payload : (payload?.diagrams || []);
  if (!Array.isArray(list)) continue;
  for (const d of list) {
    for (const [i, svg] of (d?.scenarios?.map((s) => s.svg) || [d?.svg]).entries()) {
      if (!svg) continue;
      const vb = /viewBox="([\d.\s-]+)"/.exec(svg);
      const vbW = vb ? Number(vb[1].trim().split(/\s+/)[2]) : null;
      const faces = [...svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
      if (!vbW || !faces.length) continue;
      const face = Math.min(...faces);
      rows.push({
        section: r.section_id, kind: d.kind || '-', title: `${d.title || ''}${i ? ` [${i + 1}]` : ''}`.slice(0, 40),
        vbW, face, px: Number((face * PHONE_COLUMN / vbW).toFixed(2)), texts: (svg.match(/<text/g) || []).length,
      });
    }
  }
}

rows.sort((a, b) => a.px - b.px || a.section.localeCompare(b.section));
console.log(`\n${column === 'draft' ? 'STAGED (draft)' : 'LIVE (published)'} diagrams: ${rows.length} across ${new Set(rows.map((r) => r.section)).size} sections`);
console.log(`smallest label x ${PHONE_COLUMN}/viewBoxWidth = CSS px at a 390px viewport, against ${BODY_COPY}px body copy\n`);
console.log('    px | vbW | face | texts | kind  | section — title');
for (const r of rows) {
  console.log(`${String(r.px).padStart(6)} | ${String(r.vbW).padStart(3)} | ${String(r.face).padStart(4)} | ${String(r.texts).padStart(5)} | ${r.kind.padEnd(5)} | ${r.section} — ${r.title}`);
}
const under = (n) => rows.filter((r) => r.px < n).length;
console.log(`\nunder 12px: ${under(12)} of ${rows.length}   under 11px: ${under(11)} of ${rows.length}   under half the body copy (${BODY_COPY / 2}px): ${under(BODY_COPY / 2)} of ${rows.length}`);
const frames = {}; rows.forEach((r) => { frames[r.vbW] = (frames[r.vbW] || 0) + 1; });
console.log('authoring frames in this corpus:', Object.entries(frames).map(([w, n]) => `${w}u x${n}`).join(', '));
console.log(`\nA ${BODY_COPY}px label needs a frame no wider than ${Math.floor(12 * PHONE_COLUMN / BODY_COPY)} units at a 12-unit face — no frame in use is close, which is why the sheet is the remedy on a phone.`);
