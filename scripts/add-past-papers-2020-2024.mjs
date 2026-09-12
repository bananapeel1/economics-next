/**
 * One-off backfill: uploads the past-paper PDFs staged in ./past-papers-staging
 * (see manifest.json in that folder) to the `past-papers` storage bucket and
 * inserts matching rows into `past_papers`.
 *
 * Sourced from qualifications.pearson.com (official Edexcel IAL past papers,
 * freely published for revision use) on 2026-09-12. Every file was verified as
 * a real Pearson PDF (application/pdf, cover page checked with pdftotext)
 * before being staged — see manifest.json for per-entry notes on gaps
 * (missing question paper or mark scheme for a session) and one inferred
 * pairing that should be double-checked before publishing.
 *
 * Usage:
 *   1. Copy the `past-papers` folder from the scratchpad hand-off into
 *      economics-next/scripts/past-papers-staging (or point STAGING_DIR below
 *      at wherever you kept it).
 *   2. Ensure SUPABASE_URL/SUPABASE_SERVICE_KEY (or NEXT_PUBLIC_SUPABASE_URL/
 *      SUPABASE_SERVICE_ROLE_KEY) are set — see scripts/_db.mjs.
 *   3. node scripts/add-past-papers-2020-2024.mjs
 *      Add --dry-run to only print what would happen, without uploading.
 *
 * Safe to re-run: an entry is skipped if a past_papers row already exists
 * for the same subject/unit/paper_number/year/session.
 */
import { supabase } from './_db.mjs';
import { readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STAGING_DIR = process.env.STAGING_DIR
  ? resolve(process.env.STAGING_DIR)
  : resolve(__dirname, 'past-papers-staging');
const DRY_RUN = process.argv.includes('--dry-run');

async function resolveSubjectIds() {
  const { data, error } = await supabase.from('subjects').select('id, name');
  if (error) throw new Error(`Failed to load subjects: ${error.message}`);
  const bySubject = {};
  for (const s of data) bySubject[s.name.trim().toLowerCase()] = s.id;
  for (const needed of ['economics', 'business']) {
    if (!(needed in bySubject)) {
      throw new Error(`No subject named "${needed}" found in the subjects table — check spelling/casing there.`);
    }
  }
  return bySubject;
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

async function uploadFile(localPath, storagePath) {
  const bytes = readFileSync(localPath);
  const { error } = await supabase.storage
    .from('past-papers')
    .upload(storagePath, bytes, { contentType: 'application/pdf', upsert: true });
  if (error) throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from('past-papers').getPublicUrl(storagePath);
  return data.publicUrl;
}

async function main() {
  const manifest = JSON.parse(readFileSync(join(STAGING_DIR, 'manifest.json'), 'utf8'));
  const subjectIds = await resolveSubjectIds();

  let inserted = 0, skipped = 0, failed = 0;

  for (const entry of manifest) {
    const subject_id = subjectIds[entry.subject.trim().toLowerCase()];
    const label = `${entry.subject} ${entry.year} ${entry.session} Unit ${entry.unit}`;

    try {
      if (await alreadyExists({ subject_id, unit: entry.unit, paper_number: entry.paper_number, year: entry.year, session: entry.session })) {
        console.log(`SKIP (already exists): ${label}`);
        skipped++;
        continue;
      }

      if (entry.note) console.log(`NOTE: ${label} — ${entry.note}`);

      if (DRY_RUN) {
        console.log(`DRY RUN would insert: ${label} (paper: ${entry.paper_file || 'none'}, mark scheme: ${entry.mark_scheme_file || 'none'})`);
        continue;
      }

      let paper_url = null, mark_scheme_url = null;
      if (entry.paper_file) {
        const storagePath = `papers/${entry.year}-${entry.session}-P${entry.paper_number}-paper-${Date.now()}.pdf`;
        paper_url = await uploadFile(join(STAGING_DIR, entry.paper_file), storagePath);
      }
      if (entry.mark_scheme_file) {
        const storagePath = `mark-schemes/${entry.year}-${entry.session}-P${entry.paper_number}-ms-${Date.now()}.pdf`;
        mark_scheme_url = await uploadFile(join(STAGING_DIR, entry.mark_scheme_file), storagePath);
      }

      const { error } = await supabase.from('past_papers').insert({
        title: entry.title,
        year: entry.year,
        session: entry.session,
        paper_number: entry.paper_number,
        unit: entry.unit,
        subject_id,
        paper_url,
        mark_scheme_url,
      });
      if (error) throw new Error(error.message);

      console.log(`OK: ${label}`);
      inserted++;
    } catch (err) {
      console.error(`FAILED: ${label} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped} (already present), failed ${failed}.`);
  if (failed > 0) process.exitCode = 1;
}

main();
