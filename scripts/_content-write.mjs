/**
 * The one way content reaches the database from a script. Packet 3.
 *
 *   import { stageSection, validateLive, loadBundle, contextFor } from './_content-write.mjs';
 *
 * Every content write goes through `stageSection`, which validates the WHOLE section as it would be
 * after the write — the drafted table plus the live copies of the other seven — and refuses on any
 * BLOCK finding that is not already in the committed baseline. It writes to `draft`, never to
 * `data`; students read `data`, and scripts/publish-section.mjs is the only path from one to the
 * other, and it validates again. After writing it reads the row back and checks the draft is what
 * was sent, so "ok" means the database holds it, not that a request returned.
 *
 * Why the whole section and not the one table: a quiz pin lives in section_content and points into
 * section_quiz; a diagram pin points into section_diagrams; a reorder is judged against the flows
 * around it. Validating one table alone is how a pin to nothing got through 24 times.
 *
 * Why refuse rather than warn: March's validator warned, beside the write path, and half the
 * scripts did not call it (F110). The 84 legacy scripts that wrote `data` directly are stopped by
 * the guard in scripts/_db.mjs; this is where they are meant to go instead. The gate decision itself
 * lives in lib/content-gate.mjs so the admin editor's route runs the same one.
 */
import { readFileSync } from 'node:fs';
import { supabase } from './_db.mjs';
import { buildContext, gateSection, loadBundle as loadBundleWith, TABLE_TO_KEY } from '../lib/content-gate.mjs';

export { TABLE_TO_KEY };

const BASELINE_PATH = 'audit/validator-baseline.json';

let specCache = null;
let quantCache = null;

function specItems() {
  if (!specCache) specCache = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items;
  return specCache;
}

async function quantTemplates() {
  if (!quantCache) {
    try { quantCache = (await import('../lib/quant/index.mjs')).templates; } catch { quantCache = []; }
  }
  return quantCache;
}

/** The committed baseline: finding keys that were live when the validator landed. */
export function loadBaseline() {
  try { return new Set(JSON.parse(readFileSync(BASELINE_PATH, 'utf8')).keys); } catch { return new Set(); }
}

/** Live payloads for every content table of one section. Missing rows are null. */
export function loadBundle(sectionId) {
  return loadBundleWith(supabase, sectionId);
}

/** Subject, unit code and spec number for a section, from the database, plus the reference assets. */
export async function contextFor(sectionId) {
  return buildContext(supabase, sectionId, specItems(), { quantTemplates: await quantTemplates() });
}

/** Validate what is live right now for one section. */
export async function validateLive(sectionId) {
  const [bundle, ctx] = await Promise.all([loadBundle(sectionId), contextFor(sectionId)]);
  return { ...gateSection(bundle, ctx, loadBaseline()), bundle, ctx };
}

/** Run a synchronous builder construction with the raw-write guard lifted, then put it back. */
function withRawWrite(fn) {
  const prev = process.env.REVVY_ALLOW_RAW_WRITE;
  process.env.REVVY_ALLOW_RAW_WRITE = '1';
  try { return fn(); } finally {
    if (prev === undefined) delete process.env.REVVY_ALLOW_RAW_WRITE; else process.env.REVVY_ALLOW_RAW_WRITE = prev;
  }
}

/**
 * Validate a section as it WOULD be if `table` held `payload`, and stage the payload as a draft.
 *
 * Returns { ok, findings, summary, newBlocks, newDebt, created }. When ok is false nothing was
 * written and `newBlocks` says why. Pass `{ dryRun: true }` to see the verdict without writing.
 * Throws if the write did not land (no row could be updated or created, or the read-back differs).
 */
export async function stageSection(sectionId, table, payload, { dryRun = false } = {}) {
  if (!TABLE_TO_KEY[table]) throw new Error(`${table} is not a content table`);
  const [live, ctx] = await Promise.all([loadBundle(sectionId), contextFor(sectionId)]);
  const next = { ...live, [TABLE_TO_KEY[table]]: payload };
  const verdict = gateSection(next, ctx, loadBaseline());

  if (!verdict.ok) return { ...verdict, created: false };
  if (dryRun) return { ...verdict, created: false, dryRun: true };

  // PostgREST does not error on an update that matches no row, so ask for the rows back and
  // count them. Verification found the old path reporting ok:true having written nothing.
  const upd = await supabase.from(table).update({ draft: payload }).eq('section_id', sectionId).select('section_id');
  if (upd.error) throw new Error(`${sectionId} ${table}: ${upd.error.message}`);
  let created = false;
  if (!upd.data || upd.data.length === 0) {
    // No row for this table yet. `data` is NOT NULL on seven of the eight tables, so the row is
    // created with an empty live payload and the draft. This is the one insert of `data` outside
    // publish/restore, it carries nothing a student can read, and the guard is lifted only for
    // the synchronous construction of this builder.
    const empty = Array.isArray(payload) ? [] : {};
    const ins = await withRawWrite(() => supabase.from(table).insert({ section_id: sectionId, data: empty, draft: payload }).select('section_id'));
    if (ins.error) throw new Error(`${sectionId} ${table}: ${ins.error.message}`);
    if (!ins.data || ins.data.length !== 1) throw new Error(`${sectionId} ${table}: insert returned ${ins.data?.length ?? 0} rows`);
    created = true;
  }

  // Read back: the draft column must hold exactly what was sent.
  const { data: back, error: backErr } = await supabase.from(table).select('draft').eq('section_id', sectionId).maybeSingle();
  if (backErr) throw new Error(`${sectionId} ${table}: read-back failed: ${backErr.message}`);
  if (!back || JSON.stringify(back.draft) !== JSON.stringify(payload)) {
    throw new Error(`${sectionId} ${table}: read-back does not match the staged payload; nothing to publish`);
  }
  return { ...verdict, created };
}

/** Print findings the way every caller should: BLOCK first, then DEBT counts, then INFO. */
export function printFindings(findings, { baseline = loadBaseline(), showDebt = false } = {}) {
  const fresh = (f) => !baseline.has(f.key);
  const blocks = findings.filter((f) => f.tier === 'BLOCK');
  const debt = findings.filter((f) => f.tier === 'DEBT');
  const info = findings.filter((f) => f.tier === 'INFO');
  const nb = blocks.filter(fresh); const nd = debt.filter(fresh);
  for (const f of nb) console.log(`  BLOCK  ${f.rule.padEnd(26)} ${f.detail}`);
  if (blocks.length - nb.length) console.log(`  block  ${blocks.length - nb.length} baselined`);
  if (showDebt) for (const f of nd) console.log(`  debt   ${f.rule.padEnd(26)} ${f.detail}`);
  console.log(`  debt   ${debt.length} total, ${nd.length} new`);
  for (const f of info) console.log(`  info   ${f.rule.padEnd(26)} ${f.detail}`);
}
