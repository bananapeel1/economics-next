import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client using the ANON key (not service role).
 * Use for public read-only queries that don't need elevated privileges.
 * Respects Row Level Security policies.
 */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
