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

import { unit1Practice } from './business-practice-unit1.mjs';
import { unit2Practice } from './business-practice-unit2.mjs';
import { unit3Practice } from './business-practice-unit3.mjs';
import { unit4Practice } from './business-practice-unit4.mjs';

const allPractice = { ...unit1Practice, ...unit2Practice, ...unit3Practice, ...unit4Practice };

async function seedPractice() {
  console.log('🌱 Starting Business practice questions seed...\n');

  let success = 0;
  let failed = 0;

  for (const [sectionId, questions] of Object.entries(allPractice)) {
    const { error } = await supabase
      .from('section_practice')
      .upsert({ section_id: sectionId, data: questions }, { onConflict: 'section_id' });

    if (error) {
      console.error(`   ❌ ${sectionId}: ${error.message}`);
      failed++;
    } else {
      console.log(`   ✅ ${sectionId} (${questions.length} questions)`);
      success++;
    }
  }

  console.log(`\n🎉 Practice questions seed complete! ${success} sections seeded, ${failed} failed.`);
}

seedPractice().catch(console.error);
