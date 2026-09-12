-- Packet 2 — draft/published state on the eight content tables.
-- Run this ONCE in the Supabase SQL editor. Safe to re-run.
--
-- The problem it solves, from F115: a content push is a blind full overwrite of live data.
-- A packet that rewrites a section writes straight into `data`, and every student in every
-- timezone sees each intermediate state as it lands. Restoring from a snapshot afterwards
-- still means minutes of wrong content in front of real people.
--
-- The shape: writes go to `draft`. Students read `data`, which does not move. Publishing is
-- one statement per section that copies draft into data and clears it, so a section goes
-- live in a single step and can be reviewed in the admin UI before it does.
--
--   node scripts/publish-section.mjs                    what is waiting, per section
--   node scripts/publish-section.mjs supply             diff the draft against live
--   node scripts/publish-section.mjs supply --confirm   publish it
--   node scripts/publish-section.mjs --all --confirm    publish everything waiting
--
-- Nothing reads `draft` on the student path, so adding these columns changes nothing until
-- a script starts writing to them. Content packets 14-56 are the first that should.

ALTER TABLE section_content         ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_notes           ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_quiz            ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_practice        ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_flashcards      ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_diagrams        ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_extras          ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE section_common_mistakes ADD COLUMN IF NOT EXISTS draft JSONB, ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

COMMENT ON COLUMN section_content.draft IS
  'Unpublished edit. Students read `data`. scripts/publish-section.mjs copies draft into data and clears it.';

-- Rows with something waiting to go live:
-- SELECT 'section_content' AS t, section_id FROM section_content WHERE draft IS NOT NULL
-- UNION ALL SELECT 'section_quiz', section_id FROM section_quiz WHERE draft IS NOT NULL
-- UNION ALL SELECT 'section_practice', section_id FROM section_practice WHERE draft IS NOT NULL
-- ORDER BY 1, 2;
