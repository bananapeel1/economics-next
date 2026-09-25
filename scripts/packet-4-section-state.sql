-- Packet 4 — per-student Learn Mode state, server side.
-- Run this ONCE in the Supabase SQL editor. Safe to re-run.
--
-- F001 (critical) and F027. Everything that makes Learn Mode feel like it remembers you lives in
-- localStorage today: whether a section is complete, the 1/3/7/14-day review schedule, the
-- strength meter, and whether the pre-test was taken or skipped.
--
-- So a student who finishes a topic on a school laptop and opens Revvy on their phone has no
-- completion dot, no strength, no scheduled reviews, and the pre-test gate again. Same after
-- clearing site data, in a private window, or when Safari's 7-day storage eviction runs. Being
-- signed in changes nothing, which is the part that reads as broken rather than as a limitation.
--
-- One row per (student, section). localStorage stays as a cache and a path for signed-out use;
-- this is the source of truth once someone has an account.

CREATE TABLE IF NOT EXISTS user_section_state (
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id      TEXT        NOT NULL,
  subject_id      TEXT,

  -- Completion
  completed_at    TIMESTAMPTZ,

  -- Spaced review: which rung of the interval ladder, and when it next falls due
  review_index    SMALLINT    NOT NULL DEFAULT 0,
  next_review     TIMESTAMPTZ,
  reviews         SMALLINT    NOT NULL DEFAULT 0,

  -- Strength inputs. The meter is derived from these, never stored as a number, so changing the
  -- model does not need a backfill (see lib/strength.js).
  last_review     TIMESTAMPTZ,
  quiz_accuracy   REAL,

  -- Pre-test: taken, skipped, or never offered. Skipping has to be remembered or the gate returns
  -- on every load, which is a slice of the 75% who never pass step 0.
  pretest_state   TEXT        CHECK (pretest_state IN ('taken', 'skipped')),
  pretest_score   REAL,

  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  PRIMARY KEY (user_id, section_id)
);

CREATE INDEX IF NOT EXISTS user_section_state_due_idx
  ON user_section_state (user_id, next_review)
  WHERE next_review IS NOT NULL;

ALTER TABLE user_section_state ENABLE ROW LEVEL SECURITY;

-- A student reads and writes only their own rows. The API uses the service role and checks the
-- session itself, but the policy means a leaked anon key still cannot read anyone else's progress.
DROP POLICY IF EXISTS user_section_state_own_rows ON user_section_state;
CREATE POLICY user_section_state_own_rows ON user_section_state
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

COMMENT ON TABLE user_section_state IS
  'Per-student Learn Mode state: completion, spaced-review schedule, strength inputs and pre-test. Replaces localStorage as the source of truth for signed-in students (packet 4, F001/F027).';

-- What is in there:
-- SELECT section_id, completed_at, next_review, reviews, pretest_state
-- FROM user_section_state WHERE user_id = '<uuid>' ORDER BY next_review NULLS LAST;
