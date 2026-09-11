-- Learn Mode funnel events (audit/PLAN.md, packet 1: "Measure or don't bother")
-- Run this ONCE in the Supabase SQL Editor. There is no DDL path from the app or scripts.
--
-- Why: until now the only "progress" signal was a furthest_step row written whenever a section was
-- open on any tab, so the audit's "75% never passed step 0" could not tell a student who bounced off
-- the pre-test from one who read the Notes tab. These rows are written by explicit actions only, via
-- POST /api/events, for signed-in AND anonymous students (anonymous ones carry a per-browser anon_id).
-- Event names are validated in app/api/events/route.js against lib/funnel.js.

CREATE TABLE IF NOT EXISTS app_events (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id       UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  anon_id       TEXT NULL,
  event         TEXT NOT NULL,
  section_id    TEXT NULL,
  step          INTEGER NULL,
  total_steps   INTEGER NULL,
  props         JSONB NULL,
  client_ts     TIMESTAMPTZ NULL,
  tz_offset_min INTEGER NULL,      -- minutes east of UTC, for "send reminders in the student's evening"
  path          TEXT NULL,
  CONSTRAINT app_events_event_len CHECK (char_length(event) <= 40),
  CONSTRAINT app_events_anon_len  CHECK (anon_id IS NULL OR char_length(anon_id) <= 64)
);

CREATE INDEX IF NOT EXISTS idx_app_events_event_time    ON app_events (event, created_at);
CREATE INDEX IF NOT EXISTS idx_app_events_section_event ON app_events (section_id, event);
CREATE INDEX IF NOT EXISTS idx_app_events_user          ON app_events (user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_app_events_anon          ON app_events (anon_id) WHERE anon_id IS NOT NULL;

-- Writes go through the API with the service role only. No client policies on purpose:
-- with RLS on and no policies, the anon/authenticated keys can neither read nor write this table.
ALTER TABLE app_events ENABLE ROW LEVEL SECURITY;

-- Optional: keep the table small. Delete raw events older than 180 days (aggregates are computed
-- by audit/scripts/funnel-events.mjs and committed to the repo).
-- DELETE FROM app_events WHERE created_at < NOW() - INTERVAL '180 days';
