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

const client = createClient(url, key);

const CONTENT_TABLES = new Set([
  'section_content', 'section_notes', 'section_quiz', 'section_practice',
  'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes',
]);

/*
 * Packet 3. Every content write goes through scripts/_content-write.mjs, which validates the whole
 * section and writes to `draft`; scripts/publish-section.mjs validates again and copies draft to
 * `data`. Eighty-four scripts in this folder used to write `data` directly, and F110 counted 22 of
 * the 43 section-upgrade scripts with no validator at all. So a direct write of `data` on a content
 * table is refused here, at the client, where no script can forget to opt in.
 *
 * Reads, and writes to `draft`, are untouched. Set REVVY_ALLOW_RAW_WRITE=1 to bypass for one run —
 * the restore script and the id-minting script need it — and say why in the commit.
 */
function guarded(table, builder) {
  if (!CONTENT_TABLES.has(table) || process.env.REVVY_ALLOW_RAW_WRITE === '1') return builder;
  const refuse = (method) => (payload, ...rest) => {
    const touchesData = payload && typeof payload === 'object' && (Array.isArray(payload) ? payload.some((r) => r && 'data' in r) : 'data' in payload);
    if (touchesData) {
      throw new Error(
        `Refusing to ${method} \`data\` on ${table} directly. Stage it with stageSection() from scripts/_content-write.mjs ` +
        `and publish with scripts/publish-section.mjs, which validate the section first. ` +
        `(Set REVVY_ALLOW_RAW_WRITE=1 to override for one run, and say why.)`,
      );
    }
    return builder[method](payload, ...rest);
  };
  return new Proxy(builder, {
    get(target, prop) {
      if (prop === 'update' || prop === 'upsert' || prop === 'insert') return refuse(prop);
      // A delete removes a section's whole table; nothing in this repo deletes a content row, so
      // it is refused outright rather than checked for a payload (packet 3 verification note).
      if (prop === 'delete') return () => { throw new Error(`Refusing to delete rows on ${table} directly. Restore from a snapshot with scripts/restore-section.mjs, or set REVVY_ALLOW_RAW_WRITE=1 and say why.`); };
      const v = target[prop];
      return typeof v === 'function' ? v.bind(target) : v;
    },
  });
}

// `from` is guarded on the client itself and on the two other objects that expose a `from`:
// `client.schema('public')` returns a PostgrestClient and `client.rest` is one, and both were a
// way round the guard with no callers (packet 3 verification, F110).
function withGuardedFrom(target) {
  return new Proxy(target, {
    get(t, prop) {
      if (prop === 'from') return (table) => guarded(table, t.from(table));
      if (prop === 'schema') return (...a) => withGuardedFrom(t.schema(...a));
      if (prop === 'rest') return t.rest ? withGuardedFrom(t.rest) : t.rest;
      const v = t[prop];
      return typeof v === 'function' ? v.bind(t) : v;
    },
  });
}

export const supabase = withGuardedFrom(client);
