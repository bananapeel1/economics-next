#!/usr/bin/env node
/**
 * Dump both practice banks to a file the coverage guard can read — packet 12.5. READ-ONLY.
 *
 *   node audit/scripts/dump-practice-bank.mjs            write audit/practice-bank.json
 *   node audit/scripts/dump-practice-bank.mjs --check    exit 1 if the file differs from the database
 *
 * WHY A DUMP AND NOT A QUERY. `npm run spec-coverage` never opens a Supabase client, so it runs in CI
 * and cannot be the thing that breaks a Vercel build (rule 6). Until packet 12.5 its practice bank
 * was `audit/content-sections/`, the t=0 dump of 11 September: 215 questions with no ids, most of
 * which the 25 September checkpoint replaced. This file is the same idea taken again, with ids, so
 * the tags in `audit/practice-spec-items.json` (keyed by item id) have something to attach to.
 * Re-run it after a publish; `--check` says whether it is stale.
 *
 * WHAT A ROW IS. `section_practice` holds ONE row per section; the questions are the JSON array in
 * `data` (live) and `draft` (staged, non-null only while a rebuild is held). So the two columns
 * `spec_items` and `kind` added by scripts/packet-12-1-spec-items.sql are one value per SECTION and
 * cannot carry a question's tags. The dump records whether they exist and whether anything has been
 * written to them, so the guard can say so from a fact rather than a literal.
 *
 * Only `id`, `command`, `marks` and `question` are kept: the guard reads nothing else, and
 * `guidance` is the mark scheme, which has no business in a coverage file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabase } from '../../scripts/_db.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'audit/practice-bank.json');
const CHECK = process.argv.includes('--check');

const probe = await supabase.from('section_practice').select('*').limit(1);
if (probe.error) { console.error(`read failed: ${probe.error.message}`); process.exit(1); }
const columns = Object.keys(probe.data?.[0] || {}).sort();
const grain = ['spec_items', 'kind'].filter((c) => columns.includes(c));

const { data: rows, error } = await supabase.from('section_practice').select(`section_id, data, draft${grain.length ? `, ${grain.join(', ')}` : ''}`).order('section_id');
if (error) { console.error(`read failed: ${error.message}`); process.exit(1); }

const slim = (arr) => (Array.isArray(arr) ? arr.map((q) => ({ id: q.id, command: q.command, marks: q.marks, question: q.question })) : null);
const sections = rows.map((r) => ({ slug: r.section_id, live: slim(r.data) || [], staged: slim(r.draft) }));
const missingIds = sections.flatMap((s) => [...s.live, ...(s.staged || [])]).filter((q) => !q.id).length;
if (missingIds) { console.error(`${missingIds} practice item(s) carry no id; the tags file cannot key them`); process.exit(1); }

const body = {
  note: 'section_practice, both banks, read-only dump for npm run spec-coverage. live = `data`, staged = `draft` (null when nothing is held). Written by audit/scripts/dump-practice-bank.mjs; do not edit by hand.',
  sectionGrainColumns: Object.fromEntries(grain.map((c) => [c, { present: true, nonNull: rows.filter((r) => r[c] !== null && r[c] !== undefined).length }])),
  sections,
};

if (CHECK) {
  const cur = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : null;
  const same = cur && JSON.stringify({ ...cur, taken: undefined }) === JSON.stringify({ ...body, taken: undefined });
  console.log(same ? `audit/practice-bank.json matches the database (taken ${cur.taken})` : 'audit/practice-bank.json is STALE: re-run without --check');
  process.exit(same ? 0 : 1);
}

fs.writeFileSync(OUT, `${JSON.stringify({ taken: new Date().toISOString(), ...body }, null, 1)}\n`);
const live = sections.reduce((n, s) => n + s.live.length, 0);
const staged = sections.reduce((n, s) => n + (s.staged ? s.staged.length : 0), 0);
console.log(`wrote audit/practice-bank.json: ${sections.length} sections, ${live} live, ${staged} staged in ${sections.filter((s) => s.staged).length} drafts`);
