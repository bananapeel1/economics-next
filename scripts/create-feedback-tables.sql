-- Student feedback and content reports.
-- Run this ONCE in the Supabase SQL Editor. Safe to re-run. There is no DDL path from the app.
-- Select nothing before pressing Run: with text highlighted the editor runs only the selection
-- and still reports "Success".
--
-- THREE TABLES, NOT TWO.
--
--   user_feedback    what a student says about Revvy in general, from the feedback card that
--                    follows a finished topic, quiz or practice set, or from "Send feedback".
--   content_reports  one row per "Report a problem" press. Evidence: never edited, never triaged.
--   content_issues   one row per reported ITEM. Triage lives here: status, severity, notes.
--
-- The obvious two-table version puts status on content_reports, and it breaks on the first
-- popular question. Ten students report the same wrong answer, so ten rows need the same status,
-- the same note and the same fix, and the next report arrives already out of step with the other
-- nine. An error in content is a property of the ITEM, and the fix is a property of the item's
-- next published version. So reports attach to an issue, and the admin works issues. This is
-- the ledger's own shape (a finding plus its evidence), which is why severity uses its words.
--
-- IDENTITY. item_key is the item's stored `id` (`<sectionId>:<kind>:<key>`, minted once by
-- scripts/mint-item-ids.mjs and kept through rewrites). It is opaque: flashcards are `card` in
-- some packets and `flashcard` in others, so nothing may parse the kind back out of it. Notes
-- chapters carry no id; for those the route derives `<sectionId>:notes:<slug of chapter title>`.
-- question_index is stored for debugging only. Content packets renumber the arrays.
--
-- SNAPSHOTS. item_snapshot and item_hash are resolved SERVER-SIDE from section_* `data` when the
-- report arrives, for the same reason written_ao_attempts snapshots its question: the content
-- will change, and a report is only readable against what the student actually saw. `rendered`
-- is what the client drew, so a stale cache (the section payload may be an hour old) or an old
-- ReviewMode copy shows up as a mismatch instead of a mystery.
--
-- RLS is on with NO policies, the app_events pattern. Every read and write goes through a route
-- holding the service-role key: /api/report and /api/feedback for students, /api/admin/* for
-- the admin, which checks app_metadata.role first. A browser holding the anon or authenticated
-- key can neither read another student's note nor forge a report.

-- ── content_issues ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_issues (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- The item, resolved server-side when the first report arrived.
  item_key          TEXT        NOT NULL,
  surface           TEXT        NOT NULL,
  section_id        TEXT        NULL,   -- sections.id; the foreign key is added below where it can be
  subject           TEXT        NULL,   -- 'economics' | 'business', from units → subjects
  unit_code         TEXT        NULL,   -- WEC11, WBS12 … from units.code
  spec_ref          TEXT        NULL,   -- sections.number, e.g. '1.3.5' (IAL numbering)
  item_title        TEXT        NULL,   -- first 140 characters of the stem or title, for the list
  reported_hash     TEXT        NULL,   -- fingerprint of the LIVE item at the first report
  reopened_from     BIGINT      NULL REFERENCES content_issues(id) ON DELETE SET NULL,

  -- Triage.
  status            TEXT        NOT NULL DEFAULT 'open',
  severity          TEXT        NOT NULL DEFAULT 'medium',
  severity_manual   BOOLEAN     NOT NULL DEFAULT FALSE,  -- an admin set it; the route stops recomputing
  -- PostgREST cannot ORDER BY an expression, and alphabetical puts 'critical' after 'high'.
  severity_rank     SMALLINT GENERATED ALWAYS AS
                      (CASE severity WHEN 'critical' THEN 0 WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END) STORED,
  resolution        TEXT        NULL,
  resolution_note   TEXT        NULL,   -- MAY BE SHOWN to the students who reported it. Write it that way.
  internal_note     TEXT        NULL,   -- never shown to a student
  evidence          TEXT        NULL,   -- what proves the fix: a commit, a packet, a publish time
  fixed_hash        TEXT        NULL,   -- fingerprint of the live item when it was marked fixed
  ledger_id         TEXT        NULL,   -- audit/ledger.json id, once promoted into a packet
  status_changed_at TIMESTAMPTZ NULL,
  status_changed_by UUID        NULL REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Maintained by POST /api/report every time a report attaches.
  report_count      INTEGER     NOT NULL DEFAULT 0,
  reporter_count    INTEGER     NOT NULL DEFAULT 0,
  last_reported_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT ci_status_vals   CHECK (status IN ('open', 'in_review', 'fix_staged', 'resolved', 'ignored')),
  CONSTRAINT ci_sev_vals      CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  CONSTRAINT ci_surface_vals  CHECK (surface IN ('quiz', 'pretest', 'checkin', 'review', 'practice', 'written',
                                                 'flashcard', 'diagram', 'mistake', 'learn_step', 'notes')),
  CONSTRAINT ci_subject_vals  CHECK (subject IS NULL OR subject IN ('economics', 'business')),
  CONSTRAINT ci_resolution_vals CHECK (resolution IS NULL OR resolution IN
                                  ('fixed_content', 'fixed_code', 'not_a_defect', 'duplicate', 'wont_fix', 'spam', 'cannot_reproduce')),
  CONSTRAINT ci_key_len       CHECK (char_length(item_key) <= 200),
  CONSTRAINT ci_title_len     CHECK (item_title IS NULL OR char_length(item_title) <= 140),
  CONSTRAINT ci_notes_len     CHECK (char_length(coalesce(resolution_note, '')) <= 1000
                                 AND char_length(coalesce(internal_note, '')) <= 4000
                                 AND char_length(coalesce(evidence, '')) <= 300),
  CONSTRAINT ci_ledger_len    CHECK (ledger_id IS NULL OR char_length(ledger_id) <= 64),

  -- The lifecycle, enforced here as well as in the admin route. A Postgres CHECK PASSES when its
  -- expression is NULL, so each of these is written to be false, never NULL, on a bad row.
  --   An active issue carries no resolution:
  CONSTRAINT ci_active_unresolved CHECK (status NOT IN ('open', 'in_review', 'fix_staged') OR resolution IS NULL),
  --   "resolved" means fixed, one way or the other:
  CONSTRAINT ci_resolved_is_fix CHECK (status <> 'resolved'
                                  OR (resolution IS NOT NULL AND resolution IN ('fixed_content', 'fixed_code'))),
  --   "ignored" means closed for a reason that is not a fix:
  CONSTRAINT ci_ignored_has_why CHECK (status <> 'ignored'
                                  OR (resolution IS NOT NULL AND resolution NOT IN ('fixed_content', 'fixed_code'))),
  --   A content fix must be visible in the content: the live item's fingerprint moved. This is the
  --   rule that stops "we fixed it" going to a student while the old version is still what they get.
  CONSTRAINT ci_content_fix_moved CHECK (resolution IS DISTINCT FROM 'fixed_content'
                                  OR (fixed_hash IS NOT NULL AND fixed_hash IS DISTINCT FROM reported_hash)),
  --   A code fix (a renderer, a layout) leaves the content alone, so it must name the change instead.
  CONSTRAINT ci_code_fix_evidence CHECK (resolution IS DISTINCT FROM 'fixed_code' OR evidence IS NOT NULL)
);

-- One ACTIVE issue per item. A report on an item whose last issue is resolved or ignored opens a
-- new issue (with reopened_from), because "reported again after the fix" is the most important
-- thing this table can say. The route inserts, and on 23505 re-reads the winner.
CREATE UNIQUE INDEX IF NOT EXISTS content_issues_one_active_per_item
  ON content_issues (item_key) WHERE status IN ('open', 'in_review', 'fix_staged');

CREATE INDEX IF NOT EXISTS idx_ci_queue   ON content_issues (status, severity_rank, last_reported_at DESC);
CREATE INDEX IF NOT EXISTS idx_ci_section ON content_issues (section_id);
CREATE INDEX IF NOT EXISTS idx_ci_unit    ON content_issues (subject, unit_code);
CREATE INDEX IF NOT EXISTS idx_ci_item    ON content_issues (item_key, created_at DESC);

-- ── content_reports ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_reports (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  issue_id        BIGINT      NOT NULL REFERENCES content_issues(id) ON DELETE CASCADE,

  -- Who. user_id comes from the session cookie on the server, NEVER from the request body.
  user_id         UUID        NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  anon_id         TEXT        NULL,   -- lib/funnel.js getAnonId(), the same per-browser id app_events uses
  ip_hash         TEXT        NULL,   -- sha256(ip | FEEDBACK_IP_SALT | UTC date), 16 hex. Rate limiting only;
                                      -- the date in the hash means it cannot link a device across days.
  reporter_key    TEXT GENERATED ALWAYS AS
                    (coalesce('u:' || user_id::text, 'a:' || anon_id, 'i:' || ip_hash)) STORED,
  reporter_plan   TEXT        NULL,   -- snapshot at report time: free | premium | lifetime; NULL signed out

  -- What they said.
  category        TEXT        NOT NULL,
  note            TEXT        NULL,

  -- What they were looking at.
  surface         TEXT        NOT NULL,
  item_key        TEXT        NOT NULL,
  question_index  SMALLINT    NULL,   -- debugging only; see header
  step            SMALLINT    NULL,   -- Learn Mode step, debugging only
  rendered        JSONB       NULL,   -- what the client drew: stem, scenario, chapter title
  answer          JSONB       NULL,   -- { chosen, marked, correct, revealed } as option TEXT: options are
                                      -- shuffled on the client and rotated by packets, so an index is
                                      -- only meaningful for one version of one render.
  item_snapshot   JSONB       NULL,   -- the live item as the server resolved it (SVG bodies replaced by a hash)
  item_hash       TEXT        NULL,

  -- Where, on what.
  path            TEXT        NULL,
  viewport_w      SMALLINT    NULL,
  viewport_h      SMALLINT    NULL,
  theme           TEXT        NULL,
  user_agent      TEXT        NULL,
  app_version     TEXT        NULL,   -- VERCEL_GIT_COMMIT_SHA of the deployment that took the report
  client_ts       TIMESTAMPTZ NULL,
  tz_offset_min   SMALLINT    NULL,

  -- Closing the loop: when this student was told the outcome.
  notified_at     TIMESTAMPTZ NULL,

  CONSTRAINT cr_category_vals CHECK (category IN ('answer_wrong', 'multiple_correct', 'explanation_wrong', 'mark_scheme_wrong',
                                                  'diagram_wrong', 'marking_unfair', 'off_spec', 'unclear', 'display_broken',
                                                  'typo', 'other')),
  CONSTRAINT cr_surface_vals  CHECK (surface IN ('quiz', 'pretest', 'checkin', 'review', 'practice', 'written',
                                                 'flashcard', 'diagram', 'mistake', 'learn_step', 'notes')),
  CONSTRAINT cr_plan_vals     CHECK (reporter_plan IS NULL OR reporter_plan IN ('free', 'premium', 'lifetime')),
  CONSTRAINT cr_theme_vals    CHECK (theme IS NULL OR theme IN ('light', 'dark')),
  CONSTRAINT cr_note_len      CHECK (note IS NULL OR char_length(note) <= 1000),
  CONSTRAINT cr_key_len       CHECK (char_length(item_key) <= 200),
  CONSTRAINT cr_anon_len      CHECK (anon_id IS NULL OR char_length(anon_id) <= 64),
  CONSTRAINT cr_hash_len      CHECK (ip_hash IS NULL OR char_length(ip_hash) = 16),
  CONSTRAINT cr_path_len      CHECK (path IS NULL OR char_length(path) <= 200),
  CONSTRAINT cr_ua_len        CHECK (user_agent IS NULL OR char_length(user_agent) <= 300),
  CONSTRAINT cr_ver_len       CHECK (app_version IS NULL OR char_length(app_version) <= 40),
  CONSTRAINT cr_viewport_rng  CHECK ((viewport_w IS NULL OR viewport_w BETWEEN 1 AND 10000)
                                 AND (viewport_h IS NULL OR viewport_h BETWEEN 1 AND 10000)),
  CONSTRAINT cr_tz_rng        CHECK (tz_offset_min IS NULL OR abs(tz_offset_min) <= 900),
  CONSTRAINT cr_json_size     CHECK (coalesce(pg_column_size(item_snapshot), 0) <= 16384
                                 AND coalesce(pg_column_size(rendered), 0) <= 4096
                                 AND coalesce(pg_column_size(answer), 0) <= 2048),
  -- Somebody sent it. A row with no reporter at all cannot be rate-limited or told the outcome.
  CONSTRAINT cr_has_reporter  CHECK (user_id IS NOT NULL OR anon_id IS NOT NULL OR ip_hash IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_cr_issue    ON content_reports (issue_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cr_reporter ON content_reports (reporter_key, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cr_ip       ON content_reports (ip_hash, created_at DESC) WHERE ip_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cr_unnotified ON content_reports (user_id) WHERE notified_at IS NULL AND user_id IS NOT NULL;

-- ── user_feedback ───────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_feedback (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  user_id         UUID        NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  anon_id         TEXT        NULL,
  ip_hash         TEXT        NULL,
  reporter_key    TEXT GENERATED ALWAYS AS
                    (coalesce('u:' || user_id::text, 'a:' || anon_id, 'i:' || ip_hash)) STORED,
  reporter_plan   TEXT        NULL,

  -- What prompted it: the card after a finished task ('moment'), or the student asking ('launcher').
  source          TEXT        NOT NULL,
  moment          TEXT        NULL,
  topic           TEXT        NULL,   -- launcher only: idea | broken | content | praise | other
  rating          SMALLINT    NULL,   -- moment only, 1-5: "How useful was this topic for your revision?"
  reasons         TEXT[]      NULL,   -- the chips under the rating
  message         TEXT        NULL,
  section_id      TEXT        NULL,
  subject         TEXT        NULL,

  path            TEXT        NULL,
  viewport_w      SMALLINT    NULL,
  viewport_h      SMALLINT    NULL,
  theme           TEXT        NULL,
  user_agent      TEXT        NULL,
  app_version     TEXT        NULL,
  client_ts       TIMESTAMPTZ NULL,
  tz_offset_min   SMALLINT    NULL,

  -- Triage. NULL status means there is nothing to triage: a rating with no words. Those rows feed
  -- the per-topic ratings and never sit in the inbox inflating "open".
  status          TEXT        NULL,
  tags            TEXT[]      NULL,   -- admin themes: 'pricing', 'past-papers', 'mobile', …
  internal_note   TEXT        NULL,
  status_changed_at TIMESTAMPTZ NULL,
  status_changed_by UUID      NULL REFERENCES auth.users(id) ON DELETE SET NULL,

  CONSTRAINT uf_source_vals   CHECK (source IN ('moment', 'launcher')),
  CONSTRAINT uf_moment_vals   CHECK (moment IS NULL OR moment IN ('section_complete', 'quiz_complete', 'practice_complete', 'flashcards_complete')),
  CONSTRAINT uf_topic_vals    CHECK (topic IS NULL OR topic IN ('idea', 'broken', 'content', 'praise', 'other')),
  CONSTRAINT uf_status_vals   CHECK (status IS NULL OR status IN ('open', 'in_review', 'resolved', 'ignored')),
  CONSTRAINT uf_rating_rng    CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),
  CONSTRAINT uf_reasons_vals  CHECK (reasons IS NULL OR reasons <@ ARRAY['too_long', 'hard_to_follow', 'not_like_exam',
                                   'found_mistake', 'something_broke', 'more_examples', 'more_questions', 'clear',
                                   'good_questions', 'diagrams_helped', 'more_topics']::TEXT[]),
  CONSTRAINT uf_subject_vals  CHECK (subject IS NULL OR subject IN ('economics', 'business')),
  CONSTRAINT uf_plan_vals     CHECK (reporter_plan IS NULL OR reporter_plan IN ('free', 'premium', 'lifetime')),
  CONSTRAINT uf_theme_vals    CHECK (theme IS NULL OR theme IN ('light', 'dark')),
  CONSTRAINT uf_msg_len       CHECK (message IS NULL OR char_length(message) BETWEEN 1 AND 2000),
  CONSTRAINT uf_note_len      CHECK (internal_note IS NULL OR char_length(internal_note) <= 4000),
  CONSTRAINT uf_anon_len      CHECK (anon_id IS NULL OR char_length(anon_id) <= 64),
  CONSTRAINT uf_hash_len      CHECK (ip_hash IS NULL OR char_length(ip_hash) = 16),
  CONSTRAINT uf_path_len      CHECK (path IS NULL OR char_length(path) <= 200),
  CONSTRAINT uf_ua_len        CHECK (user_agent IS NULL OR char_length(user_agent) <= 300),
  CONSTRAINT uf_ver_len       CHECK (app_version IS NULL OR char_length(app_version) <= 40),
  CONSTRAINT uf_tz_rng        CHECK (tz_offset_min IS NULL OR abs(tz_offset_min) <= 900),
  -- The card asks for a rating; the launcher asks for words. Each row carries what its source asks.
  CONSTRAINT uf_moment_shape  CHECK (source <> 'moment'   OR (moment IS NOT NULL AND rating IS NOT NULL)),
  CONSTRAINT uf_launch_shape  CHECK (source <> 'launcher' OR (message IS NOT NULL AND rating IS NULL)),
  -- Words get triaged; a bare rating does not. Both sides are IS NULL tests, so never NULL.
  CONSTRAINT uf_status_iff_msg CHECK ((message IS NULL) = (status IS NULL)),
  CONSTRAINT uf_has_reporter  CHECK (user_id IS NOT NULL OR anon_id IS NOT NULL OR ip_hash IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_uf_inbox    ON user_feedback (status, created_at DESC) WHERE status IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_uf_ratings  ON user_feedback (section_id, moment, created_at DESC) WHERE rating IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_uf_reporter ON user_feedback (reporter_key, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uf_user     ON user_feedback (user_id, created_at DESC) WHERE user_id IS NOT NULL;

-- ── section keys ────────────────────────────────────────────────────────────────────────────
-- section_id → sections(id), added only when sections.id is unique. The other tables here keep
-- section_id as plain text (app_events, user_section_state, written_ao_attempts) and the schema of
-- `sections` is not in the repo, so this checks instead of assuming. Re-runnable.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_index i
      JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = i.indkey[0]
     WHERE i.indrelid = 'public.sections'::regclass
       AND i.indisunique AND i.indnkeyatts = 1 AND a.attname = 'id'
  ) THEN
    RAISE NOTICE 'sections.id is not unique: section_id stays plain text on both tables';
    RETURN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ci_section_fk') THEN
    ALTER TABLE content_issues ADD CONSTRAINT ci_section_fk
      FOREIGN KEY (section_id) REFERENCES sections(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uf_section_fk') THEN
    ALTER TABLE user_feedback ADD CONSTRAINT uf_section_fk
      FOREIGN KEY (section_id) REFERENCES sections(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;

-- ── access ──────────────────────────────────────────────────────────────────────────────────
ALTER TABLE content_issues  ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback   ENABLE ROW LEVEL SECURITY;
-- No policies, on purpose. See header.

-- ── retention ───────────────────────────────────────────────────────────────────────────────
-- Many reporters are 16-18. Keep the words only as long as they are useful. Run monthly, or not
-- at all until there is a privacy notice that promises a period (there is none on the site today).
-- UPDATE content_reports r SET note = NULL
--   FROM content_issues i
--  WHERE r.issue_id = i.id AND i.status IN ('resolved', 'ignored')
--    AND i.status_changed_at < now() - interval '12 months' AND r.note IS NOT NULL;
-- UPDATE user_feedback SET message = NULL, status = NULL
--  WHERE status IN ('resolved', 'ignored') AND status_changed_at < now() - interval '12 months';

-- ── verify ──────────────────────────────────────────────────────────────────────────────────
-- 1. Three tables, RLS on, no policies:
--   SELECT c.relname, c.relrowsecurity, count(p.polname) AS policies
--     FROM pg_class c LEFT JOIN pg_policy p ON p.polrelid = c.oid
--    WHERE c.relname IN ('content_issues', 'content_reports', 'user_feedback')
--    GROUP BY 1, 2;                                  -- expect 3 rows, t, 0
-- 2. The browser cannot write. With the ANON key, from a terminal:
--   curl -s -X POST "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/user_feedback" \
--     -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" -H "Content-Type: application/json" \
--     -d '{"source":"launcher","message":"x","anon_id":"probe"}'
--                                                    -- expect code 42501
-- 3. The lifecycle holds (each must FAIL with a check violation, inside a transaction you roll back):
--   BEGIN;
--   INSERT INTO content_issues (item_key, surface, status) VALUES ('probe:1', 'quiz', 'resolved');
--   ROLLBACK;                                        -- ci_resolved_is_fix
