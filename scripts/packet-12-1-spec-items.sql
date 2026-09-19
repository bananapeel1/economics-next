-- Packet 12.1, E001 — the item contract on `section_practice`.
--
-- WRITTEN, NOT RUN. There is no DDL path from code in this project (see DECISIONS, 2026-09-11,
-- "funnel events are the measurement of record": `create-app-events-table.sql` was run the same
-- way). A human runs this in the Supabase SQL editor; nothing in the application, the build or
-- `npm run spec-coverage` executes it, and the guard tolerates the columns being absent and says
-- so in its output rather than failing.
--
-- Run it when packet 12.4 is ready to write tags for the other 17 rebuilt sections. Until then the
-- Market Failure tags produced by E007's two-pass method are staged as a file, not a row:
--   audit/runs/packet-12.1/section_practice-tags.json
--
-- WHAT IT ADDS, per the contract in lib/exam-item.js:
--   spec_items  jsonb  an array of spec-item ids from audit/raw/spec-items.json, e.g.
--                      '["ECON-1.3.5-2a","ECON-1.3.5-2b"]'. NULL means "not tagged yet";
--                      '[]' means "tagged, examines nothing" and the guard treats it as a failure.
--                      The two must stay distinguishable or an untagged bank reads as a clean one,
--                      which is the whole reason the coverage number is worth having.
--   kind        text   one of 'mcq' | 'written' | 'quant' | 'draw', constrained below.
--
-- Both are NULLABLE and neither is read by any component on origin/main, so adding them cannot
-- change what a student sees. This is the same staged shape packet 2 used for `item_id`: add a
-- nullable column first, backfill second, constrain third.
--
-- WHAT IT DOES NOT DO: it does not add `ao` or `stimulus_ref`. `ao` is derived from the item's
-- command word through lib/ao-spec.js and storing it would be a second copy of a fact that already
-- has one home. `stimulus_ref` waits for the stimulus table that packet 12.2's page needs; adding
-- a dangling text column now would invite someone to type an id into it.

begin;

alter table public.section_practice
  add column if not exists spec_items jsonb,
  add column if not exists kind       text;

comment on column public.section_practice.spec_items is
  'Spec-item ids from audit/raw/spec-items.json that this question examines. NULL = not tagged yet; [] = tagged as examining nothing, which npm run spec-coverage reports as a failure. Packet 12.1, E001.';

comment on column public.section_practice.kind is
  'What the student does: mcq | written | quant | draw. See lib/exam-item.js. Packet 12.1, E001.';

-- NOT VALID, so the constraint applies to new and updated rows without a full-table scan and
-- without failing on the ~215 rows that are NULL today. Validate it after the backfill:
--   alter table public.section_practice validate constraint section_practice_kind_check;
alter table public.section_practice
  drop constraint if exists section_practice_kind_check;

alter table public.section_practice
  add constraint section_practice_kind_check
  check (kind is null or kind in ('mcq', 'written', 'quant', 'draw'))
  not valid;

-- spec_items must be a JSON array when present. Same NOT VALID reasoning.
alter table public.section_practice
  drop constraint if exists section_practice_spec_items_is_array;

alter table public.section_practice
  add constraint section_practice_spec_items_is_array
  check (spec_items is null or jsonb_typeof(spec_items) = 'array')
  not valid;

-- Lets the coverage guard ask "which questions examine this leaf" without a sequential scan once
-- the table is tagged.
create index if not exists section_practice_spec_items_gin
  on public.section_practice using gin (spec_items);

commit;

-- Verification, to run after the transaction:
--
--   select column_name, data_type, is_nullable
--     from information_schema.columns
--    where table_schema = 'public'
--      and table_name = 'section_practice'
--      and column_name in ('spec_items', 'kind');
--   -- expect two rows, both is_nullable = YES
--
--   select count(*) filter (where spec_items is null) as untagged,
--          count(*) filter (where spec_items = '[]'::jsonb) as tagged_empty,
--          count(*) as total
--     from public.section_practice;
--   -- expect untagged = total until packet 12.4 backfills, and tagged_empty = 0 always
