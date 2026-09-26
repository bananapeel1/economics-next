# Packet 12.5 — Verify A, round 2 (26 September 2026)

Verifier: packet-verifier 12.5 round 2. This is a narrow re-check of the files that changed after round 1
(`verify-a-r1.md`): the guard, the drop SQL, `merge-probe.mjs`/`.json` and the re-dumped `practice-bank.json`.

Method:
- Read-only throughout. The DB was touched only by `select`s through `scripts/_db.mjs`, plus
  `dump-practice-bank.mjs --check`.
- Sabotage and re-runs used an APFS clone of `audit/ lib/ data/` in the scratchpad.
- The SQL was tested on a throwaway Postgres 16.14 (TCP 127.0.0.1:55481, socket off), seeded with all 43
  production rows from a read-only `select *`. The cluster, the clone and the seed were deleted afterwards.

No ledger writes: all four ids still hold, so their round-1 confirmations stand.

## Production state (own read, 11:55Z)

| check | result |
|---|---|
| `select spec_items from section_practice` | `ERROR 42703 column section_practice.spec_items does not exist` |
| `select kind …` | `ERROR 42703 column section_practice.kind does not exist` |
| `select *` columns | `created_at, data, draft, id, published_at, section_id` |
| rows / live / staged / drafts | 43 / 372 / 28 / 4, the same as round 1's 11:42Z read |
| dump vs DB | 0 of 43 sections differ (own comparison). `dump-practice-bank.mjs --check` exits 0 and matches at `taken 11:54:11.703Z`. |

The founder has run the drop SQL. The row data survived: the counts are unchanged and the dump agrees
section by section.

## E086 — HOLDS

The claims are all still true:
- `section_practice` has one row per section: 43 rows, 43 distinct `section_id`. The questions are the jsonb
  arrays in `data`/`draft`.
- The tags live in `audit/practice-spec-items.json`: 322 entries, all keyed `<slug>:practice:<hash>`. The file
  is unchanged since round 1.
- The dump states the columns' actual state. `sectionGrainColumns` is now `{}`, which is correct because the
  columns are gone. `dump-practice-bank.mjs:48` derives it from the live `select *` keys.

Stale clause: the title says the dump "records both columns present and empty". That was true at 11:42Z and
is now superseded by the drop. The substance stands.

## E090 — HOLDS

The column line is derived from the dump: `spec-coverage-check.mjs:282` sets
`grainColumns = BANK?.sectionGrainColumns`, and lines `:318-325` print it. No `columnPresent` is left, and the
real run prints `NOT run` 0 times.

A/B with `--bank` copies of the real dump, changing only `sectionGrainColumns`:

| `sectionGrainColumns` | text output | `--json` `bank2.sectionGrainColumns` |
|---|---|---|
| real dump `{}` (dropped) | no column line | `{}` |
| `{}` copy | no column line | `{}` |
| both `present, nonNull 0` | `note … spec_items, kind: per-section column(s) present and empty at the dump; …sql removes them` | follows the file |
| `spec_items nonNull 2` | `WARN section_practice.spec_items … 2 row(s) hold a value` | follows the file |
| both valued (2, 5) | two WARN lines | follows the file |
| only `spec_items` present, empty | the note, for spec_items only | follows the file |
| field absent (older dump shape) | no column line | `null` |

Round 1's nit is fixed. "Present and empty" now prints a note, and "dropped" prints nothing, which matches
the SQL's own verification comment (`:60`). `examined` is 430 in every variant.

Residual nit: in text, "dropped" (`{}`) and "a dump with no such field" (`null`) look the same. Only
`--json` separates them.

## E091 — HOLDS (the `:172` assertion is now real)

The guard's JSON now emits `untagged` per row (`spec-coverage-check.mjs:295`), from
`lib/spec-coverage.js:229` (`specItems === undefined`). So `spec-coverage.test.mjs:172` compares a real field.

Sabotage, run in the clone:

1. The guard was changed at `:217` to read an id miss as `[]` ("tagged as nothing") whenever an orphan tag
   exists. The only failure was test `:158`, at line `:172`, with `actual: 0, expected: 11`. Line `:171`
   (`examined`) passed, because `[]` examines nothing. So `:172` alone caught it. The suite showed 12 pass,
   1 fail.
2. Control: the same sabotage plus round 1's JSON row shape, with `untagged` removed. Test `:158` passed. The
   assertion was vacuous before and is live now only because of the new field.

With the guard restored, the suite shows 13 of 13 passing, and the clone's guard is byte-equal to the
worktree's.

Own negative control on `poverty-inequality` (`--tags` copy with that section's tags removed): `examined`
went from 12 to 2 and `untagged` from 0 to 10. The real run still reports 7 orphans.

## E093 — HOLDS (the pre-check now enforces)

`scripts/packet-12-5-drop-section-grain-columns.sql:24-40` is a `DO` block that counts non-null values
through `execute`, but only if the column exists. It raises when either count is above 0, inside the
`begin … commit` at `:22/:52`. The data md5 below covers all six columns ordered by id, and it was
`aec65b93…` in every scenario.

| scenario | exit | columns / constraints / GIN after | data |
|---|---|---|---|
| A: after 12.1, run 12.5 | 0 | all gone | md5 unchanged |
| A: 12.5 again | 0 (IF EXISTS NOTICEs) | none | unchanged |
| B: `spec_items` set on 1 row, `ON_ERROR_STOP=1` | 3, `refusing to drop: 1 row(s) hold spec_items and 0 hold kind` | all 5 objects still there | unchanged, value kept |
| B: same, psql default (continue on error) | 0, the RAISE, then "current transaction is aborted"; the commit rolls back | all 5 still there | unchanged, value kept |
| B: same, the whole file as one message (as the SQL editor sends it) | 1, RAISE | columns and GIN still there | value kept |
| C: `kind` set on 1 row | 3, refuses | all still there | unchanged |
| D: `spec_items = '[]'` | 3, refuses | all still there | unchanged |
| E: 12.1 never ran | 0, run twice | none | unchanged |
| F: partial run (GIN and kind constraint already gone) | 0 | the rest removed | unchanged |
| G: `spec_items` already dropped, `kind` valued | 3, refuses (`0 … and 1 hold kind`) | `kind` and its constraint kept | unchanged |
| CONTROL: round-1 shape (lines 24-40 removed), `spec_items` valued | 0 | all gone, value silently lost | — |

The control shows that the harness catches the round-1 defect, and the current file does not have it.

Stale text:
- The title says "NOT run - founder step", and the SQL header at `:3` says "WRITTEN, NOT RUN". Production now
  shows both columns gone.
- The file still cites "DECISIONS, packet 12.5" at `:4`, and `audit/DECISIONS.md` still has no 12.5 entry:
  0 hits for `12.5` or `practice-spec-items`.

## Other checks asked for

- `node --test audit/scripts/spec-coverage.test.mjs` passes 13 of 13 in the worktree.
- `merge-probe.mjs:38` now reads the artefact with `git show 94807d3:…`. `94807d3` is the commit that added
  the artefact, and its content is identical to HEAD's.
- Run in the clone, where the 12.1 file is absent and `GIT_DIR` points at the worktree's git dir, it prints
  `items 410, agreed 282/380, bothEmpty 12, pass1Empty 25, structural 43, substantive 48` and Market Failure
  `same 11, diff 0`.
- It writes `merge-probe.json` with sha256 `d43365d1…1909`, byte-identical to the worktree's copy.
- Re-creating the old read path (`fs.readFileSync` of the file restored from HEAD) also gives a byte-identical
  file. The rows do not depend on the artefact (`:15-32`), so this holds by construction.
- Without a git dir the script fails loudly rather than silently.
- The guard's default run is unchanged from round 1: `examined` 430, 13 tariff failures, exit 1, 7 orphan
  tags. The header now carries no column line.

## Found, not covered by any id

1. **`bank2.tagged` counts both banks** (`spec-coverage-check.mjs:291`). It reports 368, which is 293 tagged
   live practice items plus 75 model-answer items. The key sits under `bank2`, and no test reads it. It is a
   label nit, and no number the gate uses depends on it.
2. `audit/scripts/tag-merge.mjs:17` says "Nothing reads section_practice-tags.json any more".
   `audit/runs/packet-12.2/probe-items.mjs:16` still does, as round 1 noted.
3. Round 1's gate conditions are still open:
   - The deletion of `audit/runs/packet-12.1/section_practice-tags.json` is still an unstaged ` D`.
   - The packet 12.5 DECISIONS entry is still missing, and the founder has now run the SQL that cites it.

## Gate

E086, E090, E091 and E093 all still hold against the current tree, and their confirmations stand. The gate
can pass on round 1's two conditions: the 12.1 artefact deletion goes in the same commit as the guard, and a
DECISIONS entry for packet 12.5 is added. That entry now also needs to record that the founder ran the drop
SQL.
