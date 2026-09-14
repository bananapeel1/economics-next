/**
 * Upload diagram images to Supabase Storage and update section_diagrams.
 *
 * Usage:
 *   node scripts/upload-diagrams.mjs --section demand --subject economics ./path/to/image.png
 *   node scripts/upload-diagrams.mjs --section demand --subject economics ./diagrams/*.png
 */

import fs from 'fs';
import path from 'path';
// Packet 3 (F110): the shared, guarded client, and the staging path for the table write. Diagram
// rows used to be upserted straight into `data`; they now land in `draft` after the section has
// been validated, and publish-section.mjs puts them in front of students.
import { supabase } from './_db.mjs';
import { stageSection, printFindings } from './_content-write.mjs';

const BUCKET = 'assets';

function parseArgs() {
  const args = process.argv.slice(2);
  let sectionSlug = '';
  let subjectId = 'economics';
  const files = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--section' && args[i + 1]) { sectionSlug = args[++i]; continue; }
    if (args[i] === '--subject' && args[i + 1]) { subjectId = args[++i]; continue; }
    files.push(args[i]);
  }

  if (!sectionSlug || files.length === 0) {
    console.error('Usage: node scripts/upload-diagrams.mjs --section <slug> [--subject <id>] <files...>');
    process.exit(1);
  }

  return { sectionSlug, subjectId, files };
}

const MIME_MAP = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

async function run() {
  const { sectionSlug, subjectId, files } = parseArgs();

  // Find section
  const { data: section, error: secErr } = await supabase
    .from('sections')
    .select('id')
    .eq('slug', sectionSlug)
    .eq('subject_id', subjectId)
    .single();

  if (secErr || !section) {
    console.error(`Section "${sectionSlug}" not found in ${subjectId}`);
    process.exit(1);
  }

  console.log(`\nUploading ${files.length} diagram(s) for "${sectionSlug}" (${section.id})...\n`);

  // Fetch existing diagrams
  const { data: existing } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', section.id)
    .single();

  const diagrams = existing?.data || [];

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.error(`  File not found: ${filePath}`);
      continue;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_MAP[ext];
    if (!contentType) {
      console.error(`  Unsupported file type: ${ext} (${filePath})`);
      continue;
    }

    const basename = path.basename(filePath, ext);
    const title = basename.replace(/[-_]/g, ' ').replace(/^\d+\s*/, '');
    const slug = basename.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const storagePath = `diagrams/${subjectId}/${sectionSlug}/${Date.now()}-${slug}${ext}`;

    const buffer = fs.readFileSync(filePath);
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType, upsert: false });

    if (uploadErr) {
      console.error(`  Upload failed for ${filePath}: ${uploadErr.message}`);
      continue;
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    diagrams.push({ title, imageUrl: urlData.publicUrl });
    console.log(`  Uploaded: ${title} → ${urlData.publicUrl}`);
  }

  // Stage: validates the whole section with the new diagram list in place, writes `draft`.
  const verdict = await stageSection(section.id, 'section_diagrams', diagrams);
  printFindings(verdict.findings);
  if (!verdict.ok) {
    console.error(`\nRefused: ${verdict.newBlocks.length} BLOCK finding(s) not in the baseline. Nothing was written.`);
    process.exit(1);
  }

  console.log(`\nStaged ${diagrams.length} diagrams for "${sectionSlug}" as a draft.`);
  console.log(`Publish with: node scripts/publish-section.mjs ${section.id} --confirm`);
}

run();
