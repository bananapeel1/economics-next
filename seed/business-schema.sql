-- Business Subject Schema Changes
-- Run this in Supabase SQL Editor BEFORE running the seed script

-- 1. Change units.number from unique to composite unique with subject_id
-- This allows both Economics and Business to have Unit 1, Unit 2, etc.
ALTER TABLE units DROP CONSTRAINT IF EXISTS units_number_key;
ALTER TABLE units ADD CONSTRAINT units_number_subject_unique UNIQUE (number, subject_id);
