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

// Import all content
import economicsData from './extras-economics.mjs';
import businessUnit1 from './extras-business-unit1.mjs';
import businessUnit2 from './extras-business-unit2.mjs';
import businessUnit3 from './extras-business-unit3.mjs';
import businessUnit4 from './extras-business-unit4.mjs';

// Merge all data
const allData = {
  ...economicsData,
  ...businessUnit1,
  ...businessUnit2,
  ...businessUnit3,
  ...businessUnit4,
};

async function seed() {
  const sectionIds = Object.keys(allData);
  console.log(`Seeding extras for ${sectionIds.length} sections...`);

  let success = 0;
  let errors = 0;

  for (const sectionId of sectionIds) {
    const data = allData[sectionId];

    // Upsert — insert or update
    const { data: existing } = await supabase
      .from('section_extras')
      .select('id')
      .eq('section_id', sectionId)
      .single();

    let result;
    if (existing) {
      result = await supabase
        .from('section_extras')
        .update({ data })
        .eq('section_id', sectionId);
    } else {
      result = await supabase
        .from('section_extras')
        .insert({ section_id: sectionId, data });
    }

    if (result.error) {
      console.error(`  ✗ ${sectionId}: ${result.error.message}`);
      errors++;
    } else {
      const chainCount = data.chains?.length || 0;
      const evalCount = data.evaluation?.length || 0;
      console.log(`  ✓ ${sectionId} (${chainCount} chains, ${evalCount} eval points)`);
      success++;
    }
  }

  console.log(`\nDone! ${success} succeeded, ${errors} failed.`);
}

seed().catch(e => {
  console.error('Seed failed:', e);
  process.exit(1);
});
