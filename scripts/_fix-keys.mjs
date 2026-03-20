/**
 * One-time script to remove hardcoded Supabase service role keys from all scripts.
 * Run: node scripts/_fix-keys.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0';
const URL_VAL = 'https://trweeckuswgkenckeqfb.supabase.co';

const SKIP = new Set(['_db.mjs', '_fix-keys.mjs', '_upgrade-template.mjs']);

let fixed = 0;
for (const file of readdirSync(__dirname)) {
  if (!file.endsWith('.mjs') || SKIP.has(file)) continue;
  const fp = join(__dirname, file);
  let content = readFileSync(fp, 'utf8');
  if (!content.includes(KEY)) continue;

  // Replace the createClient import + instantiation block with import from _db.mjs
  // Pattern: import { createClient } from '@supabase/supabase-js';\n\nconst supabase = createClient(\n  ...\n);
  const regex = /import\s*\{\s*createClient\s*\}\s*from\s*['"]@supabase\/supabase-js['"];\s*\n+const\s+supabase\s*=\s*createClient\([^)]+\);?/gs;

  if (regex.test(content)) {
    content = content.replace(regex, "import { supabase } from './_db.mjs';");
  } else {
    // Fallback: just remove the literal key/URL strings
    content = content.replaceAll(KEY, 'process.env.SUPABASE_SERVICE_KEY');
    content = content.replaceAll(`'${URL_VAL}'`, 'process.env.SUPABASE_URL');
    content = content.replaceAll(`"${URL_VAL}"`, 'process.env.SUPABASE_URL');
  }

  writeFileSync(fp, content);
  fixed++;
  console.log(`  ✓ ${file}`);
}
console.log(`\nFixed ${fixed} files.`);
