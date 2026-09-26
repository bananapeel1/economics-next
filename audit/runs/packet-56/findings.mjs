/** Packet 56 — read-only: print every validator finding on the dumped bundle (run after --dump). */
import { readFileSync } from 'node:fs';
import { validateSection } from '../../../lib/content-validator.mjs';
import { contextFor } from '../../../scripts/_content-write.mjs';
const b = JSON.parse(readFileSync('audit/snapshots/packet-56-bundle__business__global-industries-mncs.json', 'utf8')).tables;
const ctx = await contextFor('global-industries-mncs');
const r = validateSection(b, ctx);
for (const f of r.findings) console.log(f.tier, f.rule, f.where, '—', String(f.detail).slice(0, 300));
