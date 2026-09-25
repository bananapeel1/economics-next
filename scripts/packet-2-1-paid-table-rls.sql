-- Packet 2.1 (V007) — close the four paid content tables to the anonymous key.
-- Run this ONCE in the Supabase SQL editor, AFTER the code in this packet is deployed.
-- Safe to re-run.
--
--   https://supabase.com/dashboard/project/trweeckuswgkenckeqfb/sql/new
--
-- WHY, AND WHY IT IS THE SECOND HALF OF THE FIX
--
-- The code half stops our own pages putting paid content where it does not belong: both
-- `[unit]/[topic]` pages and `app/page.js` read all eight section tables with the anon key and
-- handed the result to the client, so every quiz question with its `correctIndex`, every flashcard,
-- every extras chain and the paid-only common mistakes sat in the HTML of a page that needs no
-- account. That is now the free surfaces only.
--
-- It does not stop anyone asking Supabase directly. The anon key ships in the browser bundle by
-- design, and these four tables answer it: measured on 16 September 2026, all four returned rows to
-- a raw PostgREST request with that key (`node scripts/check-paid-table-rls.mjs`). Closing the page
-- closes the casual door — view source, or the Quick Fire drill, which is how this was found — and
-- leaves the deliberate one open. Only this closes it.
--
-- ORDER MATTERS. The code half lands first, or the pages break: they read these tables until it
-- does. After it, the only reader of a paid table is `app/api/sections/[id]/route.js`, which uses
-- the service role and checks entitlement. The service role bypasses row-level security, so it is
-- unaffected by everything below. `node scripts/check-paid-table-rls.mjs` is the before and after.
--
-- WHAT IT DOES NOT TOUCH. `section_content`, `section_notes`, `section_diagrams` and
-- `section_practice` stay open to the anon key on purpose: the static build, the sitemap, the four
-- public Economics pages and the topic pages read them, and they are the free surfaces the product
-- advertises. Revoking those would blank the notes for everyone and take the sitemap with them.

-- 1. Revoke the grant. This makes an anonymous read a permission error rather than an empty result,
--    which is the difference between "you may not" and "there is nothing here" in every log we have.
REVOKE SELECT ON TABLE section_quiz            FROM anon;
REVOKE SELECT ON TABLE section_flashcards      FROM anon;
REVOKE SELECT ON TABLE section_common_mistakes FROM anon;
REVOKE SELECT ON TABLE section_extras          FROM anon;

-- A signed-in FREE student holds the `authenticated` role, and a subscription is not a database
-- role — so `authenticated` must not be able to read these either. Entitlement is decided in the
-- API route, against the subscription row, and nowhere else.
REVOKE SELECT ON TABLE section_quiz            FROM authenticated;
REVOKE SELECT ON TABLE section_flashcards      FROM authenticated;
REVOKE SELECT ON TABLE section_common_mistakes FROM authenticated;
REVOKE SELECT ON TABLE section_extras          FROM authenticated;

-- 2. Belt and braces: enable row-level security with no policy on these tables, so that a future
--    `GRANT SELECT ... TO anon` (which the dashboard offers in one click) does not silently reopen
--    them. With RLS on and no policy, the two client roles match no rows whatever their grants.
ALTER TABLE section_quiz            ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_flashcards      ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_common_mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_extras          ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE section_quiz IS
  'Paid surface. Readable only by the service role, through app/api/sections/[id]/route.js, which checks entitlement. Do not grant select to anon or authenticated: V007, packet 2.1.';
COMMENT ON TABLE section_flashcards IS
  'Paid surface. Readable only by the service role, through app/api/sections/[id]/route.js, which checks entitlement. Do not grant select to anon or authenticated: V007, packet 2.1.';
COMMENT ON TABLE section_common_mistakes IS
  'Paid surface, no free preview at all. Readable only by the service role, through app/api/sections/[id]/route.js. Do not grant select to anon or authenticated: V007, packet 2.1.';
COMMENT ON TABLE section_extras IS
  'Paid surface. Readable only by the service role, through app/api/sections/[id]/route.js, which checks entitlement. Do not grant select to anon or authenticated: V007, packet 2.1.';

-- 3. Verify, in the editor. Expect four rows, all with rls_enabled = true and no anon/authenticated
--    select grant. Then run `node scripts/check-paid-table-rls.mjs` from the repo, which asks with
--    the real anon key over HTTP and shares no code with the app.
SELECT c.relname AS table_name,
       c.relrowsecurity AS rls_enabled,
       has_table_privilege('anon',          c.oid, 'SELECT') AS anon_can_select,
       has_table_privilege('authenticated', c.oid, 'SELECT') AS authenticated_can_select
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('section_quiz', 'section_flashcards', 'section_common_mistakes', 'section_extras')
ORDER BY c.relname;

-- And confirm the free surfaces are untouched: expect anon_can_select = true for all four.
SELECT c.relname AS table_name,
       has_table_privilege('anon', c.oid, 'SELECT') AS anon_can_select
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('section_content', 'section_notes', 'section_diagrams', 'section_practice')
ORDER BY c.relname;

-- ROLLBACK, if a public page turns out to need one of these after all. Prefer moving that reader to
-- the entitled API over running this.
--
--   ALTER TABLE section_quiz            DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE section_flashcards      DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE section_common_mistakes DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE section_extras          DISABLE ROW LEVEL SECURITY;
--   GRANT SELECT ON TABLE section_quiz, section_flashcards, section_common_mistakes, section_extras TO anon, authenticated;
