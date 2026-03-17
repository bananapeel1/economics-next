import { createClient } from '@supabase/supabase-js';
import { specPoint } from '../data/notes/1.3.1-intro-concepts.js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/* ═══════════════════════════════════════════════════════════
 *  Push structured notes for 1.3.1 Introductory Concepts
 *  Target table: section_notes (column: data, type: jsonb)
 * ═══════════════════════════════════════════════════════════ */

const SECTION_ID = 'introductory-concepts';

async function main() {
  console.log(`Pushing structured notes for ${specPoint.ref} ${specPoint.title}...`);
  console.log(`  Chapters: ${specPoint.chapters.length}`);
  const sectionCount = specPoint.chapters.reduce((s, c) => s + c.sections.length, 0);
  console.log(`  Sections: ${sectionCount}`);

  const { error } = await supabase
    .from('section_notes')
    .update({ data: specPoint })
    .eq('section_id', SECTION_ID);

  if (error) {
    console.error(`  ✗ Error: ${error.message}`);
    process.exit(1);
  }

  console.log(`  ✓ ${SECTION_ID} notes updated successfully`);
}

main();
