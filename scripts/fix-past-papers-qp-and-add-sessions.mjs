/**
 * Second pass on past_papers: most existing rows only had a mark scheme and
 * no question paper. This script:
 *
 *  1. UPDATEs existing rows (by id) to attach the question paper and/or mark
 *     scheme PDF that was missing, using updates.json in the staging dir.
 *  2. INSERTs rows for exam sessions that were missing from the table
 *     entirely (e.g. January 2021, October 2020, June 2023 across several
 *     units), using inserts.json in the same staging dir.
 *
 * Every URL was resolved via Pearson's own past-papers search API
 * (services/pearson/algolia/GET.servlet, filtered by Specification-Code +
 * Document-Type), not guessed — see the conversation this shipped from for
 * how that endpoint was found. A handful of mark schemes that endpoint lists
 * (Economics Units 2 & 3, a few 2020-2022 sessions) turned out to be dead
 * links even on Pearson's own site; those are recorded with a `note` in
 * inserts.json and simply ship without a mark_scheme_file.
 *
 * Usage:
 *   1. Put the staged PDFs + updates.json + inserts.json in
 *      scripts/past-papers-fixes-staging (or point STAGING_DIR elsewhere).
 *   2. Ensure SUPABASE_URL/SUPABASE_SERVICE_KEY (or NEXT_PUBLIC_SUPABASE_URL/
 *      SUPABASE_SERVICE_ROLE_KEY) are set - see scripts/_db.mjs.
 *   3. node scripts/fix-past-papers-qp-and-add-sessions.mjs [--dry-run]
 *
 * Safe to re-run: an insert is skipped if a row already exists for that
 * subject/unit/paper_number/year/session; an update just re-uploads and
 * re-points the same fields, which is idempotent.
 */
import { supabase } from './_db.mjs';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STAGING_DIR = process.env.STAGING_DIR
  ? resolve(process.env.STAGING_DIR)
  : resolve(__dirname, 'past-papers-fixes-staging');
const DRY_RUN = process.argv.includes('--dry-run');

async function resolveSubjectIds() {
  const { data, error } = await supabase.from('subjects').select('id, name');
  if (error) throw new Error(`Failed to load subjects: ${error.message}`);
  const bySubject = {};
  for (const s of data) bySubject[s.name.trim().toLowerCase()] = s.id;
  return bySubject;
}

async function uploadFile(localPath, storagePath) {
  const bytes = readFileSync(localPath);
  const { error } = await supabase.storage
    .from('past-papers')
    .upload(storagePath, bytes, { contentType: 'application/pdf', upsert: true });
  if (error) throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from('past-papers').getPublicUrl(storagePath);
  return data.publicUrl;
}

async function runUpdates() {
  const path = join(STAGING_DIR, 'updates.json');
  if (!existsSync(path)) { console.log('No updates.json found, skipping updates.'); return; }
  const updates = JSON.parse(readFileSync(path, 'utf8'));

  let ok = 0, failed = 0;
  for (const u of updates) {
    try {
      const patch = {};
      if (u.paper_file) {
        const storagePath = `papers/fix-${u.id}-paper-${Date.now()}.pdf`;
        patch.paper_url = await uploadFileOrDry(join(STAGING_DIR, u.paper_file), storagePath);
      }
      if (u.mark_scheme_file) {
        const storagePath = `mark-schemes/fix-${u.id}-ms-${Date.now()}.pdf`;
        patch.mark_scheme_url = await uploadFileOrDry(join(STAGING_DIR, u.mark_scheme_file), storagePath);
      }
      if (DRY_RUN) {
        console.log(`DRY RUN would update ${u.id}:`, patch);
        continue;
      }
      const { error } = await supabase.from('past_papers').update(patch).eq('id', u.id);
      if (error) throw new Error(error.message);
      console.log(`OK update ${u.id}: ${Object.keys(patch).join(', ')}`);
      ok++;
    } catch (err) {
      console.error(`FAILED update ${u.id} - ${err.message}`);
      failed++;
    }
  }
  console.log(`Updates done. ok=${ok} failed=${failed}`);
}

async function uploadFileOrDry(localPath, storagePath) {
  if (DRY_RUN) return `[dry-run] ${storagePath}`;
  return uploadFile(localPath, storagePath);
}

async function alreadyExists({ subject_id, unit, paper_number, year, session }) {
  const { data, error } = await supabase
    .from('past_papers')
    .select('id')
    .eq('subject_id', subject_id)
    .eq('unit', unit)
    .eq('paper_number', paper_number)
    .eq('year', year)
    .eq('session', session)
    .maybeSingle();
  if (error) throw new Error(`Lookup failed: ${error.message}`);
  return !!data;
}

async function runInserts(subjectIds) {
  const path = join(STAGING_DIR, 'inserts.json');
  if (!existsSync(path)) { console.log('No inserts.json found, skipping inserts.'); return; }
  const inserts = JSON.parse(readFileSync(path, 'utf8'));

  let inserted = 0, skipped = 0, failed = 0;
  for (const entry of inserts) {
    const subject_id = subjectIds[entry.subject.trim().toLowerCase()];
    const label = `${entry.subject} ${entry.year} ${entry.session} Unit ${entry.unit}`;
    try {
      if (await alreadyExists({ subject_id, unit: entry.unit, paper_number: entry.paper_number, year: entry.year, session: entry.session })) {
        console.log(`SKIP (already exists): ${label}`);
        skipped++;
        continue;
      }
      if (entry.note) console.log(`NOTE: ${label} - ${entry.note}`);
      if (DRY_RUN) {
        console.log(`DRY RUN would insert: ${label} (paper: ${entry.paper_file || 'none'}, mark scheme: ${entry.mark_scheme_file || 'none'})`);
        continue;
      }
      let paper_url = null, mark_scheme_url = null;
      if (entry.paper_file) {
        paper_url = await uploadFile(join(STAGING_DIR, entry.paper_file), `papers/${entry.year}-${entry.session}-P${entry.paper_number}-paper-${Date.now()}.pdf`);
      }
      if (entry.mark_scheme_file) {
        mark_scheme_url = await uploadFile(join(STAGING_DIR, entry.mark_scheme_file), `mark-schemes/${entry.year}-${entry.session}-P${entry.paper_number}-ms-${Date.now()}.pdf`);
      }
      const { error } = await supabase.from('past_papers').insert({
        title: entry.title, year: entry.year, session: entry.session,
        paper_number: entry.paper_number, unit: entry.unit, subject_id, paper_url, mark_scheme_url,
      });
      if (error) throw new Error(error.message);
      console.log(`OK insert: ${label}`);
      inserted++;
    } catch (err) {
      console.error(`FAILED insert: ${label} - ${err.message}`);
      failed++;
    }
  }
  console.log(`Inserts done. inserted=${inserted} skipped=${skipped} failed=${failed}`);
}

async function main() {
  const subjectIds = await resolveSubjectIds();
  await runUpdates();
  console.log('');
  await runInserts(subjectIds);
}

main();
