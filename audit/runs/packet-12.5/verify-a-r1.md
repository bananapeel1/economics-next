# Packet 12.5 — Verify A, round 1 (26 September 2026)

Verifier: packet-verifier 12.5 round 1, fresh context. Read-only: no database writes and no source edits. Every
DB access was a `select` through `scripts/_db.mjs`. Sabotage and A/B runs used APFS clones in the scratchpad,
never the worktree. The clones and the local Postgres were deleted afterwards. Recorded in the ledger through
`ledger.mjs confirm`.

Scope: the packet's claimed ids E086–E093. `C-trade-global-economy-topFix-05` and `E030` are open and
unclaimed, so they are not judged here (see the end).

## Re-derived facts the verdicts rest on

| fact | builder | re-derived | how |
|---|---|---|---|
| DB now (11:42Z) | dump: 372 live + 28 staged, 4 drafts | **372 + 28, 4 drafts, 43 rows, 400 distinct ids, 0 without id** | own `select *` of `section_practice` |
| dump == DB | `--check` passes | **0 of 43 sections differ** (id/command/marks/question, both banks) | own comparison, plus `dump-practice-bank.mjs --check` exit 0 |
| census (11:26:22Z) | 362 + 48 = 410 | **consistent with the DB**: the 10-item gap is poverty-inequality and role-state-macroeconomy (5 live + 10 draft each at census, 10 live and no draft now; 20 ids moved from staged to live, 10 old live ids gone, 0 new). Their `published_at` values are 11:31:20Z and 11:30:01Z, both between census and dump. No other section was published after 11:26Z (the next latest is 10:58Z). | own diff plus `published_at` |
| spec_items / kind | present, empty | **present, nonNull 0 and 0** | own `select *` |
| pass 1 ∩ pass 2 | 282 items / 380 tags | **282 / 380**. Pass 1 has 568 tags, pass 2 has 1,228. 12 items are empty in both passes. | own intersection over pass1-tags.json, pass2-tags.json |
| pass 2 reproducible | rule untouched | **410 of 410 items identical** when I re-ran `tag-lexical.mjs` for all 43 sections from the census text. The file has no diff against HEAD, and its last commit is 94807d3. | own re-run |
| pass 1 frozen before pass 2 | yes | pass1/*.json plus the reused set equals pass1-tags.json (0 diffs). Pass 1 was recorded at 11:31:28Z and pass 2 ran at 11:31:46Z. The inputs carry only `{key, question}` and `{id, subtopic, requirement, wording}`. | own check |
| adjudication | 49/52 real, 1/87 controls, 40 items/47 tags | **49/52, 1/87, 40/47**. Each candidate set equals real plus controls. No control was proposed by either pass, and every "real" leaf was pass-1-only. A real leaf came first in 13 of 43 lists, which is chance level (about 37%). | own scoring of verdicts.json against key.json |
| Market Failure vs the 12.1 artefact | 11/11 | **11/11 identical** (artefact read with `git show HEAD:`) | own comparison by text |
| guard, default | 430/1,165 (36.9%), 13 tariff | 430 (36.9%), 13 tariff, exit 1 | `npm run spec-coverage` |
| guard, --t0 | 175, 123 tariff | 175, 123 tariff, exit 1. HEAD's default gives 176 and 123, also exit 1. | `npm run spec-coverage -- --t0`, HEAD guard in a clone |
| tests | 13 pass | 13 pass | `node --test audit/scripts/spec-coverage.test.mjs` |

## E086 — CONFIRMED

`section_practice` has 43 rows, one per section, with the questions held as jsonb arrays in `data` and
`draft` (own select). `spec_items` and `kind` are row-level columns, so each holds one value per section.
`audit/practice-bank.json` `sectionGrainColumns` =
`{spec_items:{present:true,nonNull:0},kind:{present:true,nonNull:0}}`, written by
`audit/scripts/dump-practice-bank.mjs:48`, and my own read gives the same figures. The tags live in
`audit/practice-spec-items.json` keyed by item id: 322 entries, written by `merge.mjs`.

Caveat: the founder's ruling appears only in `built.md` ("in session"). `audit/DECISIONS.md` has no packet
12.5 entry, yet `scripts/packet-12-5-drop-section-grain-columns.sql:5` cites "DECISIONS, packet 12.5". The
gate must add that entry.

## E087 — CONFIRMED

- `review.json` holds 410 distinct ids, the same set as `census.json`'s 410: 0 missing, 0 extra. Every
  item's bank and section match the census.
- For all 410 items, `pass1`, `pass2`, `pass1Only` and `pass2Only` equal my own recomputation.
- Every `agreed` item's `written` set equals the intersection. No item with a non-empty intersection is left
  untagged.
- 322 are tagged (282 agreed + 40 adjudicated), and the tags file matches them exactly (`specItems`, `via`,
  `section`).
- 88 are untagged, and each carries both one-pass sets: 48 disagree on substance, 25 were read by pass 1
  as examining nothing, 12 have neither pass, 1 had a control picked, 2 were confirmed as nothing.
- `merge.mjs:67` refuses to write if the review count differs from the census.
- The census is corroborated against the database above.

## E088 — CONFIRMED

My own check against `audit/raw/spec-items.json` covered 322 items and 427 tags. It found 0 ids missing
from the oracle, 0 that are not `kind: 'leaf'`, and 0 outside the item's own section subject and topic. The
census and `audit/raw/spec-coverage.json` agree on all 43 section topics. There are 0 empty arrays and 0
duplicates, and every tag carries the IAL middle digit 3. The only `[]` in the file is prose inside `note`.

The pin is `audit/scripts/spec-coverage.test.mjs:123`. In a scratch clone, three sabotages of the tags file
(a `[]` value, a cross-topic 1.3.2 leaf on a supply item, an invented id) each failed that test and no other.

## E089 — CONFIRMED

- `spec-coverage-check.mjs:76-77` sets the default tags and bank paths. `:151-159` reads the rows from the
  dump. `:214` looks up `specItems` by `q.id`.
- A/B in a clone: the `--json` output was byte-identical with and without
  `audit/runs/packet-12.1/section_practice-tags.json`.
- Removing `practice-spec-items.json` drops `examined` from 430 to 175, so the file is what feeds the number.
- The 12.1 artefact shows as ` D` in `git status`, deleted and unstaged.

Gate condition: the deletion must be in the same commit as the guard change.

Side effect: `audit/runs/packet-12.5/merge-probe.mjs` and `audit/runs/packet-12.2/probe-items.mjs` still
read the deleted file, so the packet's own Market Failure check can no longer be re-run from the tree
without `git show HEAD:…`.

## E090 — CONFIRMED

`columnPresent` is gone from the guard. "NOT run" survives only in the explanatory comment at `:277`.
`:279` takes `grainColumns` from the dump, and `:317` prints a WARN only when `nonNull > 0`.

A/B with `--bank` copies:

| bank file | column line printed |
|---|---|
| the real dump | none |
| `nonNull: 2` on spec_items | the spec_items WARN |
| `{}` (columns dropped) | none |

`bank2.sectionGrainColumns` in the JSON follows the file each time. The dump's 0/0 matches my read of the DB.

Note: the text output cannot distinguish "present and empty" from "dropped". Only `--json` can. The line
reflects the dump at `taken`, not the live database, and `--check` is the staleness test.

## E091 — CONFIRMED

The tests at `:146` (section cut) and `:158` (orphan) pass. Scratch-clone sabotages:

| sabotage | tests that failed |
|---|---|
| guard ignores tags | only `:146` |
| guard applies a same-section tag when the id misses | only `:158` |
| orphan count hardcoded to 0 | only `:158` |

My own negative controls, run with `--tags` on copies with one section's tags removed:

| section | examined before | examined after |
|---|---|---|
| the-market | 3 | 0 |
| poverty-inequality | 12 | 2 |
| managing-people | 17 | 10 |
| assessing-competitiveness (`--staged`) | 9 | 0 |

The real run reports 7 orphans. That equals my count of the census ids that are tagged but no longer in either
bank (7 of the 10 that disappeared).

Minor: the assertion at `:172` compares `rows[0].untagged`, which the guard's JSON never emits. It compares
undefined with undefined, so it is vacuous. The examined-equality assertion carries the test.

## E092 — CONFIRMED

- None of the packet's paths is under `app/`, `components/` or `lib/`.
- The 28 modified or untracked files there belong to other sessions. Their diffs contain no `spec_items`,
  `practice-spec-items`, `practice-bank` or `12.5`. The two `12.5` hits are CSS `12.5px`.
- `grep -r` over `app components lib data` finds no reader of either new file.
- Every app read of `section_practice` selects only `data` or `draft`, never `spec_items` or `kind`: see
  `app/api/sections/[id]/route.js:57,74`, the topic pages and the written-practice routes.
- `build` is `next build` and does not run the guard. The packet made no DB write.
- I did not run a rendered-page diff. With no app, data or DB change it is empty by construction.

## E093 — CONFIRMED

Tested on a local Postgres 16.14 (TCP 127.0.0.1, socket off), seeded with the real 43 rows from my read-only
select:

1. After `packet-12-1-spec-items.sql`: 2 nullable columns (jsonb and text), 2 NOT VALID constraints, and the
   GIN index.
2. The 12.5 SQL exits 0 and removes all five objects. The data checksum over `section_id`, `data` and
   `draft` is unchanged.
3. A second run is a no-op: IF EXISTS NOTICEs, exit 0, data unchanged.
4. It is also a no-op on a table where 12.1 never ran, and it finishes a partial earlier run where the index
   and one constraint were already gone.
5. Production still has both columns (`select *`), so the SQL has not been run.

Caveat: the pre-check (`expect 0 and 0 … stop`) is a comment only. With `spec_items` set on one row, the
script still exits 0 and silently drops the value. A founder who skips the pre-check gets no stop. A `DO`
block that raises when either count is non-zero would make the check enforce itself.

## Found, not covered by any id

1. **No packet 12.5 entry in DECISIONS.md** (see E086). The SQL header cites one that does not exist.
2. **`--t0` is not "unchanged"**, despite the comment in the `t0SourceFor` block. Against HEAD's default,
   `--t0` loses Market Failure's four text-keyed tags: 65.7% becomes 62.9%, and 176 becomes 175. `built.md`
   discloses this. What it does not disclose: `--t0 --staged` now applies the id-keyed tags to the snapshot
   bundles, which carry ids. That gives 434 leaves where HEAD's `--staged` gave 180. So `--t0 --staged`
   is neither the pre-12.5 view nor the new one. It is a documentation inaccuracy, and the runtime header
   does not mislead.
3. **The guard exits 1 on every mode.** Default gives 13 tariff failures, `--staged` 6, `--t0` 123. There is
   no `audit/spec-coverage-baseline.json`. HEAD also exited 1 (123), so this is not a regression. It does mean
   `npm run spec-coverage` cannot serve as a pass/fail gate for this packet. The 13 are pre-rebuild practice
   in six sections, V024's class, and were invisible before because the guard read t=0.
4. **Vacuous assertion** at `spec-coverage.test.mjs:172` (see E091).
5. **Re-runnability**: `merge-probe.mjs` reads the deleted 12.1 artefact (see E089).
6. **Adjudication independence cannot be verified from the tree.** `key.json` (11:32:40Z) sat in the same
   directory before `verdicts.json` (11:34:11Z) was written. Blindness rests on the reader's prompt, which
   is not recorded. The 1-in-87 control rate and the chance-level position of real leaves are consistent
   with a blind reader.
7. **Pre-existing, not the packet's.** `audit/raw/spec-items.json` carries truncated `subtopicLabel`
   values ("The", "Theories of", "Economic", "Business"), and these reached the pass-1 and adjudication
   inputs. The `requirement` and `wording` fields carry the meaning.
8. **Drift to expect.** Tags are keyed by content hash, and every publish moves the dump. Re-run
   `dump-practice-bank.mjs` after a publish, or the live figure measures a stale bank. `--check` detects it.

## Unclaimed but relevant

- `C-trade-global-economy-topFix-05` and `E030` are open on packet 12.5 and untouched. Both concern the
  model-answer bank, which SPEC.md's non-goals exclude. The diff neither touches nor should touch them, and
  they are left open for reassignment.

## Check-in answers

N/A. This is not a content packet: no check-in, diagram or quiz was changed.

## Gate

All eight claimed ids are confirmed. The gate can pass, on two conditions: the commit must include the
deletion of `audit/runs/packet-12.1/section_practice-tags.json` alongside the guard change, and a packet
12.5 DECISIONS entry must be added for the founder's ruling that the SQL cites.
