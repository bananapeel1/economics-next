-- Packet 12.5 — remove the two per-SECTION columns that scripts/packet-12-1-spec-items.sql added.
--
-- RUN BY THE FOUNDER in the Supabase SQL editor on 26 September 2026 (there is no DDL path from code in
-- this project), and confirmed read-only by packet 12.5: the columns no longer exist. Kept because it is
-- the record, and because it is safe to re-run. Decided by the founder the same day (DECISIONS, packet 12.5).
--
-- WHY. `section_practice` holds ONE ROW PER SECTION (43 rows); a section's questions are the JSON
-- array in `data` (live) and `draft` (staged). The 12.1 script was written as if each row were a
-- question, so `spec_items` and `kind` hold one value per section and cannot say what a question
-- examines or what a student does in it. Per-question tags now live in
-- audit/practice-spec-items.json, keyed by item id, and `npm run spec-coverage` reads them from
-- there. Nothing in the application, the build or the guard reads either column.
--
-- SAFE TO RUN when the pre-check below returns 0 for both counts. Both columns were empty in every
-- row when packet 12.5 dumped the table (audit/practice-bank.json, `sectionGrainColumns`).
-- Dropping a column drops its own constraints and the GIN index built on it; they are named here
-- anyway so a partial earlier run cannot leave one behind.
--
-- THE PRE-CHECK IS ENFORCED, not advisory: the block below aborts the whole transaction if any row
-- holds a value in either column, so nothing is dropped. If it fires, somebody has written to a
-- column this removes; find out who before going further.

begin;

do $$
declare
  n_spec bigint := 0;
  n_kind bigint := 0;
begin
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'section_practice' and column_name = 'spec_items') then
    execute 'select count(*) from public.section_practice where spec_items is not null' into n_spec;
  end if;
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'section_practice' and column_name = 'kind') then
    execute 'select count(*) from public.section_practice where kind is not null' into n_kind;
  end if;
  if n_spec > 0 or n_kind > 0 then
    raise exception 'packet-12-5: refusing to drop: % row(s) hold spec_items and % hold kind', n_spec, n_kind;
  end if;
end $$;

drop index if exists public.section_practice_spec_items_gin;

alter table public.section_practice
  drop constraint if exists section_practice_kind_check,
  drop constraint if exists section_practice_spec_items_is_array;

alter table public.section_practice
  drop column if exists spec_items,
  drop column if exists kind;

commit;

-- Verification, after the transaction:
--   select column_name from information_schema.columns
--    where table_schema = 'public' and table_name = 'section_practice'
--      and column_name in ('spec_items', 'kind');
--   -- expect no rows
--   node audit/scripts/dump-practice-bank.mjs
--   -- then `npm run spec-coverage` no longer prints a section-level column line
