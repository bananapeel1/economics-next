-- Packet 2 — item_id on practice_question_progress.
-- Run this ONCE in the Supabase SQL editor. There is no DDL path from application code.
--
-- READ THIS BEFORE RUNNING. This migration is deliberately incomplete: it adds a nullable
-- column and nothing else. It does NOT drop question_index, does NOT change the unique
-- constraint, and does NOT stop anything writing question_index. That is the point.
--
-- The mapping work found five ways the obvious version of this migration loses student
-- data, and every one of them is silent:
--
--   1. question_index is INTEGER NOT NULL. Any route that stops sending it fails 23502 on
--      insert. All three POST callers `await fetch()` without checking res.ok, so the UI
--      advances and the answer is simply lost.
--   2. UNIQUE (user_id, section_id, question_index) still governs upserts. Point an
--      onConflict at item_id while rows have item_id NULL and Postgres treats the NULLs as
--      distinct: every answer appends a new row instead of updating one.
--   3. With item_id NULL, the queue builder in lib/spaced-repetition.js looks up
--      `${sectionId}:${undefined}`, misses every row, and reclassifies all 1,067 of them as
--      new. The student's whole review schedule resets.
--   4. The dashboard and progress-summary count ROWS and never read the index, so they keep
--      showing correct mastery numbers while the queue serves everything as unseen. The
--      divergence is invisible from the admin side.
--   5. 27 `wa-` rows are not backfillable at all: written practice stores an index into a
--      client-side marks-filtered subset, while every reader indexes the unfiltered array.
--
-- So: add the column, backfill it, dual-write both fields, and only switch the conflict
-- target in packet 4, which owns the progress table rebuild and can do it in one migration
-- with the constraint change. Packet 4 must read this comment first.

-- ── 1. the column ────────────────────────────────────────────────────────────────────
ALTER TABLE practice_question_progress
  ADD COLUMN IF NOT EXISTS item_id TEXT;

COMMENT ON COLUMN practice_question_progress.item_id IS
  'Stable content item id (<sectionId>:<kind>:<key>). Nullable until packet 4 backfills and '
  'switches the unique constraint. Written alongside question_index, never instead of it.';

-- Lookups by item, and the composite the queue builder will use once it switches.
CREATE INDEX IF NOT EXISTS idx_pqp_user_item
  ON practice_question_progress (user_id, item_id);

-- ── 2. what section_id actually holds ────────────────────────────────────────────────
-- section_id is multiplexed. 86 distinct values cover 43 real sections:
--   <section>      quiz progress          → section_quiz          (766 rows)
--   fc-<section>   flashcard progress     → section_flashcards    (274 rows)
--   wa-<section>   written answer progress → section_practice     (27 rows)
-- The backfill has to decode that prefix to know which content array an index points into.
-- Nothing in the schema records it; the only reader that strips it is a regex in
-- app/api/dashboard/route.js. Left as-is here on purpose — normalising it is a packet 4
-- change and needs the same migration as the constraint.

-- ── 3. after running this ────────────────────────────────────────────────────────────
--   node scripts/backfill-item-id.mjs            dry run: reports what maps and what does not
--   node scripts/backfill-item-id.mjs --confirm  writes item_id, leaves question_index alone
--
-- Rows the backfill cannot map keep item_id NULL. That is correct: a NULL is a row whose
-- item cannot be identified, and packet 4 has to decide whether to drop it or keep it as
-- history. Do not invent an id to fill the gap.

-- ── 4. verify ────────────────────────────────────────────────────────────────────────
-- SELECT
--   count(*)                                        AS rows,
--   count(item_id)                                  AS with_item_id,
--   count(*) FILTER (WHERE item_id IS NULL)         AS unmapped,
--   count(*) FILTER (WHERE section_id LIKE 'fc-%')  AS flashcard_rows,
--   count(*) FILTER (WHERE section_id LIKE 'wa-%')  AS written_rows
-- FROM practice_question_progress;
