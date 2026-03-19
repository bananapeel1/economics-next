-- Smart Practice Engine: per-question progress table
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS practice_question_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL,
  question_index INTEGER NOT NULL,
  ease REAL NOT NULL DEFAULT 2.5,
  interval_days REAL NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_result BOOLEAN,
  last_confidence TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, section_id, question_index)
);

-- Index for efficient queue building (find overdue questions)
CREATE INDEX IF NOT EXISTS idx_pqp_user_next ON practice_question_progress(user_id, next_review);
CREATE INDEX IF NOT EXISTS idx_pqp_user_section ON practice_question_progress(user_id, section_id);

-- Enable RLS
ALTER TABLE practice_question_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress" ON practice_question_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON practice_question_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON practice_question_progress
  FOR UPDATE USING (auth.uid() = user_id);
