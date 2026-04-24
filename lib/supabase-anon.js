import { createClient } from '@supabase/supabase-js';

/**
 * Returns a no-op client used only at build time when Supabase env vars are missing
 * (e.g. Vercel Preview deployments that don't have NEXT_PUBLIC_SUPABASE_URL set).
 *
 * Every query resolves to empty data so generateStaticParams returns [] — routes
 * then render dynamically at request time, where real env vars are present.
 * Runtime requests in any environment with env vars set use the real client.
 */
function createNoopClient() {
  const result = { data: [], error: null };
  const singleResult = { data: null, error: null };
  const chain = {
    select: () => chain,
    eq: () => chain,
    neq: () => chain,
    in: () => chain,
    gt: () => chain,
    gte: () => chain,
    lt: () => chain,
    lte: () => chain,
    like: () => chain,
    ilike: () => chain,
    is: () => chain,
    match: () => chain,
    contains: () => chain,
    order: () => chain,
    limit: () => chain,
    range: () => chain,
    maybeSingle: () => Promise.resolve(singleResult),
    single: () => Promise.resolve(singleResult),
    then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
    catch: (reject) => Promise.resolve(result).catch(reject),
    finally: (cb) => Promise.resolve(result).finally(cb),
  };
  return {
    from: () => chain,
    rpc: () => Promise.resolve(result),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  };
}

/**
 * Supabase client using the ANON key (not service role).
 * Use for public read-only queries that don't need elevated privileges.
 * Respects Row Level Security policies.
 */
export function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return createNoopClient();
  }
  return createClient(url, key);
}
