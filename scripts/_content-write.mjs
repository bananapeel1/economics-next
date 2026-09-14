/**
 * The one way content reaches the database. Packet 3.
 *
 *   import { stageSection, validateLive, loadBundle, contextFor } from './_content-write.mjs';
 *
 * Every content write goes through `stageSection`, which validates the WHOLE section as it would be
 * after the write — the drafted table plus the live copies of the other seven — and refuses on any
 * BLOCK finding that is not already in the committed baseline. It writes to `draft`, never to
 * `data`; students read `data`, and scripts/publish-section.mjs is the only path from one to the
 * other, and it validates again.
 *
 * Why the whole section and not the one table: a quiz pin lives in section_content and points into
 * section_quiz; a diagram pin points into section_diagrams; a reorder is judged against the flows
 * around it. Validating one table alone is how a pin to nothing got through 24 times.
 *
 * Why refuse rather than warn: March's validator warned, beside the write path, and half the
 * scripts did not call it (F110). The 84 legacy scripts that wrote `data` directly are stopped by
 * the guard in scripts/_db.mjs; this is where they are meant to go instead.
 */
import { readFileSync } from 'node:fs';
import { supabase } from './_db.mjs';
import { CONTENT_TABLES } from './snapshot-section.mjs';
import { validateSection, laterUnitTerms } from '../lib/content-validator.mjs';

const TABLE_TO_KEY = {
  section_content: 'content', section_notes: 'notes', section_quiz: 'quiz', section_practice: 'practice',
  section_flashcards: 'flashcards', section_diagrams: 'diagrams', section_extras: 'extras',
  section_common_mistakes: 'mistakes',
};

const BASELINE_PATH = 'audit/validator-baseline.json';

let specCache = null;
let quantCache = null;

function specItems() {
  if (!specCache) {
    const raw = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
    specCache = { items: raw.items, later: { economics: laterUnitTerms(raw.items, 'economics'), business: laterUnitTerms(raw.items, 'business') } };
  }
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
export async function loadBundle(sectionId) {
  const bundle = {};
  for (const table of CONTENT_TABLES) {
    const { data, error } = await supabase.from(table).select('data').eq('section_id', sectionId).maybeSingle();
    if (error) throw new Error(`${sectionId} ${table}: ${error.message}`);
    bundle[TABLE_TO_KEY[table]] = data ? data.data : null;
  }
  return bundle;
}

/** Subject, unit code and spec number for a section, from the database, plus the reference assets. */
export async function contextFor(sectionId) {
  const { data: section, error } = await supabase.from('sections').select('id, number, unit_id').eq('id', sectionId).maybeSingle();
  if (error || !section) throw new Error(`section "${sectionId}" not found${error ? `: ${error.message}` : ''}`);
  const { data: unit } = await supabase.from('units').select('id, code, subject_id').eq('id', section.unit_id).maybeSingle();
  const { data: subj } = unit ? await supabase.from('subjects').select('id, slug').eq('id', unit.subject_id).maybeSingle() : { data: null };
  const subject = subj?.slug === 'business' ? 'business' : 'economics';
  const spec = specItems();
  return {
    sectionId,
    subject,
    unitCode: unit?.code || '',
    number: section.number || '',
    specItems: spec.items.filter((it) => it.subject === subject && it.topic === section.number),
    laterUnitTerms: spec.later[subject],
    quantTemplates: await quantTemplates(),
  };
}

/** Validate what is live right now for one section. */
export async function validateLive(sectionId) {
  const [bundle, ctx] = await Promise.all([loadBundle(sectionId), contextFor(sectionId)]);
  return { ...validateSection(bundle, ctx), bundle, ctx };
}

/**
 * Validate a section as it WOULD be if `table` held `payload`, and stage the payload as a draft.
 *
 * Returns { ok, findings, summary, newBlocks, newDebt }. When ok is false nothing was written and
 * `newBlocks` says why. Pass `{ dryRun: true }` to see the verdict without writing.
 */
export async function stageSection(sectionId, table, payload, { dryRun = false } = {}) {
  if (!TABLE_TO_KEY[table]) throw new Error(`${table} is not a content table`);
  const [live, ctx] = await Promise.all([loadBundle(sectionId), contextFor(sectionId)]);
  const next = { ...live, [TABLE_TO_KEY[table]]: payload };
  const { findings, summary } = validateSection(next, ctx);
  const baseline = loadBaseline();
  const newBlocks = findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
  const newDebt = findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));

  if (newBlocks.length) return { ok: false, findings, summary, newBlocks, newDebt };
  if (dryRun) return { ok: true, findings, summary, newBlocks, newDebt, dryRun: true };

  const { error } = await supabase.from(table).update({ draft: payload }).eq('section_id', sectionId);
  if (error) {
    // No row yet for this table: insert one with the draft and an empty live payload.
    if (/0 rows|no rows/i.test(error.message)) {
      const ins = await supabase.from(table).insert({ section_id: sectionId, data: Array.isArray(payload) ? [] : {}, draft: payload });
      if (ins.error) throw new Error(`${sectionId} ${table}: ${ins.error.message}`);
    } else {
      throw new Error(`${sectionId} ${table}: ${error.message}`);
    }
  }
  return { ok: true, findings, summary, newBlocks, newDebt };
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
