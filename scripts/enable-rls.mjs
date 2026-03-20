/**
 * Enable RLS on public tables that are missing it.
 * Run with: node scripts/enable-rls.mjs
 *
 * NOTE: This must be run via Supabase SQL Editor or psql directly.
 * The Supabase JS client cannot execute DDL statements.
 * Copy the SQL below and run it in your Supabase Dashboard > SQL Editor.
 */

const sql = `
-- ═══════════════════════════════════════════════════════
-- Enable RLS on user_fun_progress
-- ═══════════════════════════════════════════════════════
ALTER TABLE public.user_fun_progress ENABLE ROW LEVEL SECURITY;

-- Users can only read their own progress
CREATE POLICY "Users read own fun progress"
  ON public.user_fun_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users insert own fun progress"
  ON public.user_fun_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users update own fun progress"
  ON public.user_fun_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════
-- Enable RLS on pdfs
-- ═══════════════════════════════════════════════════════
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;

-- Anyone can read PDFs (public resources)
CREATE POLICY "Anyone can read pdfs"
  ON public.pdfs
  FOR SELECT
  USING (true);

-- Only admins can insert/update/delete PDFs
CREATE POLICY "Admins can modify pdfs"
  ON public.pdfs
  FOR ALL
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
`;

console.log('═══════════════════════════════════════════════════════');
console.log('  RLS MIGRATION SQL');
console.log('═══════════════════════════════════════════════════════');
console.log('');
console.log('Copy the SQL below and run it in your Supabase Dashboard:');
console.log('  Dashboard → SQL Editor → New Query → Paste → Run');
console.log('');
console.log('─────────────────────────────────────────────────────');
console.log(sql);
console.log('─────────────────────────────────────────────────────');
