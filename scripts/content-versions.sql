-- content_versions: a version number per (content table, section) for the scripts' read cache.
-- Run this ONCE in the Supabase SQL editor. Safe to re-run.
--
-- The problem it solves (26 Sep 2026): the org went over the Free plan's 5 GB egress, and most
-- of it was the gate scripts re-reading the whole corpus from this database on every pass.
-- scripts/_read-cache.mjs now keeps a copy of each read and reuses it while the section's
-- version below is unchanged. Reading this table costs ~350 small rows; re-reading the corpus
-- costs megabytes.
--
-- What it changes: one new table, one trigger function, and an AFTER trigger on each of the eight
-- content tables that bumps the section's version on every insert, update and delete. Nothing
-- on the student path reads it. Scripts work without it (memory-only cache), so running it is
-- what turns on the cross-session cache, not what keeps anything working.
--
-- To undo it, run this (it removes the triggers first, then the function, table and sequence):
--   DROP TRIGGER IF EXISTS content_version_bump ON section_content;          -- …and the other seven tables
--   DROP FUNCTION IF EXISTS public.bump_content_version();
--   DROP TABLE IF EXISTS public.content_versions;
--   DROP SEQUENCE IF EXISTS public.content_versions_seq;

CREATE SEQUENCE IF NOT EXISTS public.content_versions_seq;

CREATE TABLE IF NOT EXISTS public.content_versions (
  table_name  TEXT        NOT NULL,
  section_id  TEXT        NOT NULL,
  version     BIGINT      NOT NULL DEFAULT nextval('public.content_versions_seq'),
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (table_name, section_id)
);

COMMENT ON TABLE public.content_versions IS
  'Bumped by trigger on every write to a section_* content table. Read by scripts/_read-cache.mjs to know when a cached read is stale.';

-- Service role only. RLS with no policies hides it from anon and signed-in users; the trigger
-- function below writes as its owner, so their content writes (the admin editor) still bump it.
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.content_versions FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.content_versions_seq FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.bump_content_version()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP IN ('INSERT', 'UPDATE') THEN
    INSERT INTO public.content_versions (table_name, section_id)
    VALUES (TG_TABLE_NAME, NEW.section_id::text)
    ON CONFLICT (table_name, section_id)
    DO UPDATE SET version = nextval('public.content_versions_seq'), changed_at = now();
  END IF;
  -- A delete, or an update that moved the row to another section, changes the old section too.
  IF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND OLD.section_id IS DISTINCT FROM NEW.section_id) THEN
    INSERT INTO public.content_versions (table_name, section_id)
    VALUES (TG_TABLE_NAME, OLD.section_id::text)
    ON CONFLICT (table_name, section_id)
    DO UPDATE SET version = nextval('public.content_versions_seq'), changed_at = now();
  END IF;
  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.bump_content_version() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS content_version_bump ON public.section_content;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_content
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_notes;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_notes
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_quiz;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_quiz
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_practice;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_practice
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_flashcards;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_flashcards
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_diagrams;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_diagrams
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_extras;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_extras
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();
DROP TRIGGER IF EXISTS content_version_bump ON public.section_common_mistakes;
CREATE TRIGGER content_version_bump AFTER INSERT OR UPDATE OR DELETE ON public.section_common_mistakes
  FOR EACH ROW EXECUTE FUNCTION public.bump_content_version();

-- One row per existing section, so the first reads have a version to match.
INSERT INTO public.content_versions (table_name, section_id)
          SELECT 'section_content', section_id::text FROM public.section_content
UNION     SELECT 'section_notes', section_id::text FROM public.section_notes
UNION     SELECT 'section_quiz', section_id::text FROM public.section_quiz
UNION     SELECT 'section_practice', section_id::text FROM public.section_practice
UNION     SELECT 'section_flashcards', section_id::text FROM public.section_flashcards
UNION     SELECT 'section_diagrams', section_id::text FROM public.section_diagrams
UNION     SELECT 'section_extras', section_id::text FROM public.section_extras
UNION     SELECT 'section_common_mistakes', section_id::text FROM public.section_common_mistakes
ON CONFLICT (table_name, section_id) DO NOTHING;

-- Check: expect one row per table, each with the same count as that table has sections.
-- SELECT table_name, count(*) FROM public.content_versions GROUP BY 1 ORDER BY 1;
