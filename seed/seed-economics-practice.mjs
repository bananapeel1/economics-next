import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read .env.local
const envPath = resolve(import.meta.dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

import { unit1Practice } from './economics-practice-unit1.mjs';
import { unit2Practice } from './economics-practice-unit2.mjs';

const allPractice = { ...unit1Practice, ...unit2Practice };

async function seedPractice() {
  console.log('🌱 Starting Economics practice questions seed...\n');

  let success = 0;
  let failed = 0;

  for (const [sectionId, questions] of Object.entries(allPractice)) {
    const { error } = await supabase
      .from('section_practice')
      .upsert(
        { section_id: sectionId, data: questions },
        { onConflict: 'section_id' }
      );

    if (error) {
      console.error(`   ❌ Failed ${sectionId}: ${error.message}`);
      failed++;
    } else {
      console.log(`   ✅ ${sectionId} (${questions.length} questions)`);
      success++;
    }
  }

  console.log(`\n🎉 Economics practice seed complete! ${success} sections seeded, ${failed} failed.`);
}

seedPractice().catch(console.error);
