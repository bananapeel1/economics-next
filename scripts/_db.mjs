/**
 * Shared Supabase client for scripts.
 * Reads credentials from environment variables only — no hardcoded keys.
 *
 * Usage:
 *   import { supabase } from './_db.mjs';
 *
 * Before running scripts, ensure these env vars are set:
 *   export SUPABASE_URL=https://trweeckuswgkenckeqfb.supabase.co
 *   export SUPABASE_SERVICE_KEY=your-service-role-key
 *
 * Or create a .env.local file in the project root.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Attempt to load .env.local if env vars are not set
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const envPath = resolve(__dirname, '../.env.local');
    const envContent = readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) {
        const val = rest.join('=').trim();
        if (!process.env[key.trim()]) process.env[key.trim()] = val;
      }
    });
  } catch {
    // .env.local not found — rely on environment variables
  }
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables.');
  console.error('Set them in your shell or create a .env.local file.');
  process.exit(1);
}

export const supabase = createClient(url, key);
