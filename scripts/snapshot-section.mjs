#!/usr/bin/env node
// Snapshot section content across every content table, so any write can be undone.
//
//   node scripts/snapshot-section.mjs --all --label 2026-09-12-pre-packet-2
//   node scripts/snapshot-section.mjs the-market supply --label before-my-change
//   node scripts/snapshot-section.mjs --all --label x --quiet
//
// Writes audit/snapshots/<label>__<subject>__<section>.json, one file per section,
// holding every content table's `data` payload for that section. Restore with
// scripts/restore-section.mjs.
//
// This generalises audit/scripts/snapshot-touched-sections.mjs, which was written for
// packet 0 and is hardcoded to 12 sections and 4 tables. Packet 2 touches all 43
// sections and all 8 tables, and PROTOCOL.md requires a snapshot before any content
// write — so the snapshot has to cover everything a write might reach.
import { supabase } from './_db.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';

export const CONTENT_TABLES = [
  'section_content',
  'section_notes',
  'section_quiz',
  'section_practice',
  'section_flashcards',
  'section_diagrams',
  'section_extras',
  'section_common_mistakes',
];

/** Subject slug per section, derived from units. Used only for the filename. */
export async function subjectBySection() {
  const { data: units, error: uErr } = await supabase.from('units').select('id, subject_id');
  if (uErr) throw new Error(`units: ${uErr.message}`);
  const { data: subjects, error: sErr } = await supabase.from('subjects').select('id, slug');
  if (sErr) throw new Error(`subjects: ${sErr.message}`);
  const { data: sections, error: secErr } = await supabase.from('sections').select('id, unit_id');
  if (secErr) throw new Error(`sections: ${secErr.message}`);

  const slugOf = new Map(subjects.map((s) => [s.id, s.slug]));
  const subjectOfUnit = new Map(units.map((u) => [u.id, slugOf.get(u.subject_id)]));
  return new Map(sections.map((s) => [s.id, subjectOfUnit.get(s.unit_id) || 'unknown']));
}

/** Every content table's payload for one section. Missing rows are recorded as null. */
export async function readSection(sectionId) {
  const out = {};
  for (const table of CONTENT_TABLES) {
    const { data, error } = await supabase.from(table).select('data').eq('section_id', sectionId).maybeSingle();
    if (error) throw new Error(`${sectionId} ${table}: ${error.message}`);
    out[table] = data ? data.data : null;
  }
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const flag = (name) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const quiet = args.includes('--quiet');
  const label = flag('label');
  const ids = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1] === '--label'));

  if (!label) {
    console.error('a --label is required: it names the snapshot set, e.g. --label 2026-09-12-pre-packet-2');
    process.exit(1);
  }

  let sections = ids;
  if (args.includes('--all')) {
    const { data, error } = await supabase.from('sections').select('id').order('id');
    if (error) throw new Error(`sections: ${error.message}`);
    sections = data.map((s) => s.id);
  }
  if (!sections.length) {
    console.error('usage: snapshot-section.mjs (--all | <sectionId>...) --label <name>');
    process.exit(1);
  }

  const subjectOf = await subjectBySection();
  mkdirSync('audit/snapshots', { recursive: true });

  let written = 0;
  let items = 0;
  for (const id of sections) {
    const payload = await readSection(id);
    const subject = subjectOf.get(id) || 'unknown';
    const path = `audit/snapshots/${label}__${subject}__${id}.json`;
    writeFileSync(path, JSON.stringify({ section_id: id, subject, label, tables: payload }, null, 1) + '\n');
    written++;
    for (const value of Object.values(payload)) if (Array.isArray(value)) items += value.length;
    if (!quiet) console.log(`  ${path}`);
  }

  console.log(`\nsnapshot ${label}: ${written} section(s), ${CONTENT_TABLES.length} tables each, ${items} top-level items`);
  console.log('restore one with: node scripts/restore-section.mjs <file> --confirm');
}

// Importable for other scripts; runs only when invoked directly.
if (process.argv[1] && process.argv[1].endsWith('snapshot-section.mjs')) {
  await main();
}
