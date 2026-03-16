// Setup script for PDFs feature: creates storage bucket + database table
// Run: node seed/setup-pdfs.mjs
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(import.meta.dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function setup() {
  console.log('🗃️  Setting up PDFs...\n');

  // 1. Create storage bucket
  console.log('1. Creating storage bucket "pdfs"...');
  const { data: bucket, error: bucketErr } = await supabase.storage.createBucket('pdfs', {
    public: true,
    fileSizeLimit: 52428800, // 50MB
    allowedMimeTypes: ['application/pdf'],
  });

  if (bucketErr) {
    if (bucketErr.message?.includes('already exists')) {
      console.log('   ✅ Bucket "pdfs" already exists');
    } else {
      console.error('   ❌ Bucket creation failed:', bucketErr.message);
    }
  } else {
    console.log('   ✅ Bucket "pdfs" created');
  }

  // 2. Create database table via SQL
  console.log('\n2. Creating "pdfs" table...');
  const { error: tableErr } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS pdfs (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        category TEXT DEFAULT 'General',
        file_url TEXT,
        file_name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  });

  if (tableErr) {
    // rpc might not exist — fall back to manual instructions
    console.log('   ⚠️  Could not create table via RPC (this is normal).');
    console.log('   Please run this SQL in your Supabase SQL Editor:\n');
    console.log(`   CREATE TABLE IF NOT EXISTS pdfs (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     title TEXT NOT NULL,
     description TEXT DEFAULT '',
     category TEXT DEFAULT 'General',
     file_url TEXT,
     file_name TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );`);
  } else {
    console.log('   ✅ Table "pdfs" created');
  }

  // 3. Verify by trying to select from the table
  console.log('\n3. Verifying table exists...');
  const { data, error: selectErr } = await supabase.from('pdfs').select('id').limit(1);
  if (selectErr) {
    console.log('   ❌ Table "pdfs" not found. Please create it manually (see SQL above).');
  } else {
    console.log(`   ✅ Table "pdfs" exists (${data.length} rows)`);
  }

  console.log('\n✨ Setup complete!\n');
}

setup().catch(console.error);
