/**
 * Upload diagram images to Supabase Storage and update section_diagrams.
 *
 * Usage:
 *   node scripts/upload-diagrams.mjs --section demand --subject economics ./path/to/image.png
 *   node scripts/upload-diagrams.mjs --section demand --subject economics ./diagrams/*.png
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

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

  // Upsert
  const { error } = await supabase
    .from('section_diagrams')
    .upsert(
      { section_id: section.id, data: diagrams },
      { onConflict: 'section_id' }
    );

  if (error) {
    console.error(`\nSupabase upsert error: ${error.message}`);
    process.exit(1);
  }

  console.log(`\nDone — ${diagrams.length} total diagrams for "${sectionSlug}"`);
}

run();
