-- Written-answer assessment-objective record (branch feat/ao-profile)
-- Run this ONCE in the Supabase SQL Editor. There is no DDL path from the app or scripts.
--
-- Why: app/api/written-practice/evaluate/route.js has always marked every written answer against the
-- four Edexcel assessment objectives and returned per-objective marks, which
-- components/written-practice/WrittenFeedbackCard.jsx draws once and then throws away. Nothing was
-- ever stored, so the app could tell a student how ONE answer went and could never tell them what
-- keeps happening. practice_question_progress cannot hold it: that table is
-- UNIQUE(user_id, section_id, question_index) and is upserted, so a second attempt at the same
-- question destroys the first, and a sentence like "across your 6 marked Evaluate answers" would
-- stop being true the moment anyone repeated a question. This table is append-only: one row per
-- marked answer, written server-side by the evaluate route in the same request that produced the
-- marks, never updated, never deleted by the app.
--
-- WHAT THESE NUMBERS ARE ALLOWED TO CLAIM. Read this before writing any UI copy against this table.
--
--   ao{n}_max is REVVY'S OWN mark allocation for that objective on that question type. It is not an
--   Edexcel figure and it is not a judgement the AI marker made. It is computed in code by
--   lib/ao-spec.js from two inputs: (a) the Edexcel Appendix 6 command-word table, which states which
--   objectives a command word assesses -- IAL Economics spec (2018) Appendix 6, p.67-68, and IAL
--   Business spec (2017) Appendix 6, p.55-56, with verbatim extracts in audit/raw/econ_spec.txt and
--   audit/raw/bus_spec.txt -- and (b) the per-tariff split already written into SYSTEM_PROMPT in
--   app/api/written-practice/evaluate/route.js, which is what the marker is told. NEITHER
--   specification publishes a split of a question's marks between AO1-AO4. Ours is an editorial
--   choice, and every student-facing sentence built on it must say so: "the marks we allocate to
--   AO4", never "the marks Edexcel allocates" and never the bare "the marks available".
--
--   ao{n}_counts is TRUE only when ao{n}_max > 0 -- that is, only when the Appendix 6 entry for that
--   command word says the objective is assessed AND our allocation for that tariff gives it marks.
--   An objective that was not assessed on an answer is ABSENT from that answer's arithmetic, not
--   zero. This is the mechanism that stops a 4-mark Define or a 6-mark Explain from ever entering an
--   AO4 denominator and manufacturing a weakness that was never tested.
--
--   ao{n}_marks is what the AI marker awarded, clamped in code to [0, ao{n}_max].
--
--   model_ao holds the marker's own raw per-objective object, so the divergence between what the
--   model returned and what we counted is measurable rather than assumed. GET /api/admin/ao-health is
--   cut from this ship by founder scope decision; the intended home for that read is an offline
--   script beside audit/scripts/funnel-events.mjs. The column is written from the first row anyway,
--   because capture is irreversible: a divergence not recorded at marking time cannot be recovered.
--
--   excluded_reason is set when a row must not enter any aggregate. Excluded rows are KEPT and their
--   count is shown to the student with its reason, because a silent exclusion is a way of quietly
--   improving a number.
--
--   subject IS NULLABLE, AND THE NULL IS LOAD-BEARING. The write path ALWAYS inserts. When the
--   section lookup fails and a marked answer cannot be tied back to a subject, the row is stored with
--   subject NULL and excluded_reason = 'item_unresolved' rather than being dropped. A NOT NULL
--   subject would have made that row unwritable, and an unwritable row is a silent exclusion of the
--   worst kind: the answer was genuinely marked, the student genuinely wrote it, and it would have
--   vanished from their own record leaving no trace that anything was missing. The sentence "across
--   your N marked answers" has to reconcile against something, and the only thing it can honestly
--   reconcile against is every row this table holds. Nullability costs no denominator: these rows
--   carry a non-null excluded_reason, the aggregate counts only rows where excluded_reason IS NULL,
--   so a NULL subject can never enter an average -- it can only be counted and disclosed.
--
--   rubric_version is stored but is deliberately NOT used to filter the aggregate. Because every
--   denominator now comes from our own code table rather than from the model, rewording the marking
--   prompt changes no denominator, so mixing rubric versions in one figure is safe. The mix is
--   reported by the offline health read, not by the app. Filtering on it would create a cliff where a
--   prompt edit silently tells every existing student they have no marked answers.
--
--   ao_map_version is likewise an audit field. The aggregate RECOMPUTES ao{n}_max and ao{n}_counts on
--   read from (subject, command, tariff) using the current lib/ao-spec.js, and re-clamps marks to it.
--   The stored columns are the frozen record of what the student was actually shown at the time. If
--   the Appendix 6 mapping is ever corrected, the corrected version is the truthful one and every
--   answer stays counted; nothing is lost, because the correction changes only the denominator, never
--   the marks the student earned.
--
-- command, tariff, subject and question_hash are SNAPSHOTS, resolved SERVER-SIDE at marking time from
-- section_practice and never re-derived later. question_index is NOT a stable identity: every content
-- packet renumbers the section_practice arrays (audit/PLAN.md, structural correction 2), and the
-- written-practice queue indexes a marks-filtered copy of that array. It is stored for debugging
-- only. Do not turn this table into a join against section_practice -- the snapshot is the
-- correctness mechanism, not duplication.
--
-- section_id here is the BARE section slug. The 'wa-' prefix used in practice_question_progress
-- exists only because four engines share that one table; this table has a single writer.

CREATE TABLE IF NOT EXISTS written_ao_attempts (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- One practice session, stamped by the engine. Nothing reads it yet -- there is no per-session
  -- grouping in this ship and deliberately no index on it. It is stored from day one because capture
  -- is irreversible: a session boundary not written at marking time cannot be reconstructed later.
  session_id        TEXT NULL,

  -- What was attempted, resolved server-side from section_practice at marking time.
  -- subject is NULL only on an unresolved item, which always carries excluded_reason -- see header.
  subject           TEXT NULL,
  section_id        TEXT NOT NULL,
  question_index    INTEGER NULL,
  question_hash     TEXT NOT NULL,
  command           TEXT NULL,
  tariff            SMALLINT NULL,

  -- Outcome. The student's answer text is deliberately not stored; only its length.
  grade             TEXT NULL,
  marks_awarded     SMALLINT NULL,
  word_count        INTEGER NULL,

  -- The AO record. max comes from lib/ao-spec.js; marks are clamped to it before insert.
  ao1_marks  SMALLINT NOT NULL DEFAULT 0,
  ao1_max    SMALLINT NOT NULL DEFAULT 0,
  ao1_counts BOOLEAN  NOT NULL DEFAULT FALSE,
  ao2_marks  SMALLINT NOT NULL DEFAULT 0,
  ao2_max    SMALLINT NOT NULL DEFAULT 0,
  ao2_counts BOOLEAN  NOT NULL DEFAULT FALSE,
  ao3_marks  SMALLINT NOT NULL DEFAULT 0,
  ao3_max    SMALLINT NOT NULL DEFAULT 0,
  ao3_counts BOOLEAN  NOT NULL DEFAULT FALSE,
  ao4_marks  SMALLINT NOT NULL DEFAULT 0,
  ao4_max    SMALLINT NOT NULL DEFAULT 0,
  ao4_counts BOOLEAN  NOT NULL DEFAULT FALSE,
  ao3_chains SMALLINT NULL,

  -- The marker's own prose, so a diagnosis can quote rather than paraphrase
  gap_tags          TEXT[] NULL,
  ao_comments       JSONB NULL,
  gaps              JSONB NULL,
  improvement_tip   TEXT NULL,

  -- Provenance and telemetry
  marker_model      TEXT NOT NULL,
  rubric_version    TEXT NOT NULL,
  ao_map_version    TEXT NOT NULL,
  finish_reason     TEXT NULL,
  model_ao          JSONB NULL,
  excluded_reason   TEXT NULL,

  CONSTRAINT waoa_subject_vals  CHECK (subject IS NULL OR subject IN ('economics','business')),
  CONSTRAINT waoa_section_len   CHECK (char_length(section_id) <= 120),
  CONSTRAINT waoa_hash_len      CHECK (char_length(question_hash) = 16),
  CONSTRAINT waoa_command_len   CHECK (command IS NULL OR char_length(command) <= 32),
  CONSTRAINT waoa_session_len   CHECK (session_id IS NULL OR char_length(session_id) <= 64),
  CONSTRAINT waoa_tip_len       CHECK (improvement_tip IS NULL OR char_length(improvement_tip) <= 600),
  CONSTRAINT waoa_model_len     CHECK (char_length(marker_model) <= 64),
  CONSTRAINT waoa_rubric_len    CHECK (char_length(rubric_version) <= 32),
  CONSTRAINT waoa_aomap_len     CHECK (char_length(ao_map_version) <= 32),
  CONSTRAINT waoa_finish_len    CHECK (finish_reason IS NULL OR char_length(finish_reason) <= 24),
  CONSTRAINT waoa_grade_vals    CHECK (grade IS NULL OR grade IN ('excellent','good','partial','weak')),
  CONSTRAINT waoa_tariff_rng    CHECK (tariff IS NULL OR (tariff > 0 AND tariff <= 40)),
  CONSTRAINT waoa_awarded_rng   CHECK (marks_awarded IS NULL OR (marks_awarded >= 0 AND marks_awarded <= 40)),
  CONSTRAINT waoa_words_rng     CHECK (word_count IS NULL OR (word_count >= 0 AND word_count <= 5000)),
  CONSTRAINT waoa_chains_rng    CHECK (ao3_chains IS NULL OR (ao3_chains >= 0 AND ao3_chains <= 20)),
  CONSTRAINT waoa_tags_len      CHECK (gap_tags IS NULL OR array_length(gap_tags, 1) <= 3),
  CONSTRAINT waoa_excl_vals     CHECK (excluded_reason IS NULL OR excluded_reason IN
                                  ('non_ial_command','hidden_item','unknown_tariff','item_unresolved')),
  -- A row with no resolvable command word must carry a reason, so nothing is silently uncountable.
  CONSTRAINT waoa_cmd_or_excl   CHECK (command IS NOT NULL OR excluded_reason IS NOT NULL),
  -- Likewise for the subject: a NULL subject is only ever the unresolved case, and the unresolved
  -- case is only ever stored WITH its reason. Without this pair, a NULL subject would be countable.
  CONSTRAINT waoa_subj_or_excl  CHECK (subject IS NOT NULL OR excluded_reason IS NOT NULL),
  -- No NULLs in the AO columns on purpose: a Postgres CHECK passes when either side is NULL, so a
  -- nullable pair would let "max 6, marks NULL" through and add a null numerator to a real
  -- denominator. Absence is carried by ao{n}_counts = FALSE, never by a NULL.
  CONSTRAINT waoa_ao1_rng       CHECK (ao1_max >= 0 AND ao1_max <= 40 AND ao1_marks >= 0 AND ao1_marks <= ao1_max),
  CONSTRAINT waoa_ao2_rng       CHECK (ao2_max >= 0 AND ao2_max <= 40 AND ao2_marks >= 0 AND ao2_marks <= ao2_max),
  CONSTRAINT waoa_ao3_rng       CHECK (ao3_max >= 0 AND ao3_max <= 40 AND ao3_marks >= 0 AND ao3_marks <= ao3_max),
  CONSTRAINT waoa_ao4_rng       CHECK (ao4_max >= 0 AND ao4_max <= 40 AND ao4_marks >= 0 AND ao4_marks <= ao4_max),
  CONSTRAINT waoa_ao1_counts    CHECK (NOT ao1_counts OR ao1_max > 0),
  CONSTRAINT waoa_ao2_counts    CHECK (NOT ao2_counts OR ao2_max > 0),
  CONSTRAINT waoa_ao3_counts    CHECK (NOT ao3_counts OR ao3_max > 0),
  CONSTRAINT waoa_ao4_counts    CHECK (NOT ao4_counts OR ao4_max > 0)
);

CREATE INDEX IF NOT EXISTS idx_waoa_user_time    ON written_ao_attempts (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waoa_user_subject ON written_ao_attempts (user_id, subject);
CREATE INDEX IF NOT EXISTS idx_waoa_user_command ON written_ao_attempts (user_id, command) WHERE command IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_waoa_question     ON written_ao_attempts (question_hash);
-- No index on session_id: nothing groups by it in this ship. Add one when something reads it.

-- RLS: one SELECT policy for the owner, and deliberately NO insert, update or delete policies.
-- Reads and writes in the app both go through API routes holding the service-role key, which bypasses
-- RLS and filters with an explicit .eq('user_id', user.id) in code -- that filter IS the access
-- control. The SELECT policy is defence in depth, matching scripts/create-practice-progress-table.sql.
-- Omitting the write policies is the app_events pattern (scripts/create-app-events-table.sql) and is
-- the point of the table: these rows are the evidence behind every number a student is shown, so a
-- browser holding the anon or authenticated key must never be able to forge, edit or erase one.
ALTER TABLE written_ao_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own AO attempts" ON written_ao_attempts
  FOR SELECT USING (auth.uid() = user_id);

-- No retention DELETE, unlike app_events. These rows ARE the student's record of their own marked
-- work and the only thing that makes "across your 6 marked Evaluate answers" checkable afterwards.
-- Deleting them would retroactively change a sentence the student has already been shown.
