/**
 * PACKET 53 — the t=0 snapshot of influences-business-decisions, taken before any write.
 *
 * `audit/scripts/snapshot-touched-sections.mjs` carries a hardcoded twelve-section list that this
 * section is not in, and it reads only four of the eight content tables. Rather than edit a shared
 * script while another session may be in this worktree (PROTOCOL rule 5), this takes the same
 * snapshot through `loadBundle`, which reads all eight, and writes it to the same directory under
 * the same naming convention. Same file as packet 44's (audit/runs/packet-44/snapshot.mjs), three constants changed.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { loadBundle } from '../../../scripts/_content-write.mjs';

const SECTION = 'influences-business-decisions';
const STAMP = '2026-09-26-pre-packet-53';
const OUT = `audit/snapshots/${STAMP}__business__${SECTION}.json`;

mkdirSync('audit/snapshots', { recursive: true });
const live = await loadBundle(SECTION);
writeFileSync(OUT, JSON.stringify(live, null, 1));

const sizes = Object.entries(live).map(([k, v]) => `${k} ${Array.isArray(v) ? v.length : v ? 'obj' : 'null'}`);
console.log(`wrote ${OUT}`);
console.log(sizes.join(' · '));
