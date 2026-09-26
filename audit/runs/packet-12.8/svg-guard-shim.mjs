/**
 * Packet 12.8 close-out (E082): points the repo's diagram collision guard
 * (audit/runs/packet-40/probe-collisions.mjs, packet 40's version: vertical segments handled,
 * tolerance 1.2 of a face) at a STATIC svg in public/diagrams/. The guard reads `font-size`
 * attributes; a static file sets sizes by CSS class, so this shim copies each class's font-size
 * from the file's own <style> onto its <text> elements and changes nothing else. Width estimate
 * (`estWidth`) is imported from packet 40's module, as the guard expects.
 *   SVG=public/diagrams/x.svg node audit/runs/packet-40/probe-collisions.mjs audit/runs/packet-12.8/svg-guard-shim.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
export { estWidth } from '../../../scripts/_packet40-diagrams.mjs';

const files = String(process.env.SVG || '').split(',').filter(Boolean);
export const ALL_DIAGRAMS = files.map((file) => {
  const raw = fs.readFileSync(path.resolve(file), 'utf8');
  const sizes = {};
  for (const m of raw.matchAll(/\.([a-z0-9-]+)\s*\{[^}]*font-size:\s*([\d.]+)px/gi)) sizes[m[1]] = Number(m[2]);
  const svg = raw.replace(/<text\b([^>]*)>/g, (all, attrs) => {
    if (/font-size=/.test(attrs)) return all;
    const cls = ((attrs.match(/class="([^"]*)"/) || [])[1] || '').split(/\s+/);
    const size = cls.map((c) => sizes[c]).filter(Boolean).pop();
    return size ? `<text${attrs} font-size="${size}">` : all;
  });
  return { title: path.basename(file), scenarios: [{ label: 'static', svg }] };
});
