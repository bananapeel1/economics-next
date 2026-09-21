/**
 * The gate decision, shared by every writer of content (F110: "one shared validate() imported by
 * every script"). Pure apart from the database reads in `buildContext`, which take whatever
 * Supabase client the caller has — the scripts' guarded one or a route handler's server client —
 * so the admin editor and the scripts run exactly the same check.
 *
 *   const ctx = await buildContext(db, sectionId, specItems);
 *   const verdict = gateSection(bundle, ctx, baselineKeys);
 *   if (!verdict.ok) refuse(verdict.newBlocks);
 */
import { validateSection, laterUnitTerms } from './content-validator.mjs';

export const CONTENT_TABLES = [
  'section_content', 'section_notes', 'section_quiz', 'section_practice',
  'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes',
];

export const TABLE_TO_KEY = {
  section_content: 'content', section_notes: 'notes', section_quiz: 'quiz', section_practice: 'practice',
  section_flashcards: 'flashcards', section_diagrams: 'diagrams', section_extras: 'extras',
  section_common_mistakes: 'mistakes',
};

const laterCache = new WeakMap();

/**
 * Compare two payloads the way the database does.
 *
 * PostgreSQL's `jsonb` normalises an object's keys — it sorts them by length, then bytewise — so a
 * payload read back is deep-equal to what was sent but not string-equal to it. Comparing with
 * `JSON.stringify` therefore reports a mismatch for any object whose keys were not already in that
 * order, which is every object an author writes by hand. Packet 3 added read-back checks and packet
 * 13, the first content write to go through them, was refused by one on a recall it had just
 * written correctly. Arrays keep their order, in jsonb and here: their order is content.
 */
export function sameJson(a, b) {
  return canonical(a) === canonical(b);
}

function canonical(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v ?? null);
  if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
  const keys = Object.keys(v).filter((k) => v[k] !== undefined).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonical(v[k])}`).join(',')}}`;
}

/**
 * Subject, unit code and spec number for a section, plus the reference assets the validator wants.
 * `specItems` is the parsed audit/raw/spec-items.json `items` array (the caller decides how to
 * load it: readFileSync in scripts, a JSON import in a route). `quantTemplates` is optional.
 */
export async function buildContext(db, sectionId, specItems = [], { quantTemplates = [] } = {}) {
  const { data: section, error } = await db.from('sections').select('id, number, unit_id').eq('id', sectionId).maybeSingle();
  if (error || !section) throw new Error(`section "${sectionId}" not found${error ? `: ${error.message}` : ''}`);
  const { data: unit } = await db.from('units').select('id, code, subject_id').eq('id', section.unit_id).maybeSingle();
  const { data: subj } = unit ? await db.from('subjects').select('id, slug').eq('id', unit.subject_id).maybeSingle() : { data: null };
  const subject = subj?.slug === 'business' ? 'business' : 'economics';
  let later = laterCache.get(specItems);
  if (!later) { later = { economics: laterUnitTerms(specItems, 'economics'), business: laterUnitTerms(specItems, 'business') }; laterCache.set(specItems, later); }
  return {
    sectionId,
    subject,
    unitCode: unit?.code || '',
    number: section.number || '',
    specItems: specItems.filter((it) => it.subject === subject && it.topic === section.number),
    laterUnitTerms: later[subject],
    quantTemplates,
  };
}

/** Live payloads for every content table of one section, keyed content/notes/quiz/…; missing rows are null. */
export async function loadBundle(db, sectionId) {
  const bundle = {};
  for (const table of CONTENT_TABLES) {
    const { data, error } = await db.from(table).select('data').eq('section_id', sectionId).maybeSingle();
    if (error) throw new Error(`${sectionId} ${table}: ${error.message}`);
    bundle[TABLE_TO_KEY[table]] = data ? data.data : null;
  }
  return bundle;
}

/**
 * Run the validator and compare with the baseline. `ok` is false when any BLOCK finding's key is
 * not in the baseline; new DEBT never blocks and is returned so the caller can print it.
 */
export function gateSection(bundle, ctx, baselineKeys) {
  const baseline = baselineKeys instanceof Set ? baselineKeys : new Set(baselineKeys || []);
  const { findings, summary } = validateSection(bundle, ctx);
  const newBlocks = findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
  const newDebt = findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
  return { ok: newBlocks.length === 0, findings, summary, newBlocks, newDebt };
}
