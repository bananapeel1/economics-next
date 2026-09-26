# Packet 12.5 spec — backfill `section_practice.spec_items`, both banks (22 September 2026)

**Goal in one line:** make every section's coverage number come from the database instead of a
staged file, by tagging every `section_practice` row — both banks — through the two-pass method that
tagged Market Failure — and delete the artefact that only exists because the column did not.

**Read first, in this order:**
- `audit/EXAM-PRACTICE.md`, "The independence rule" — why a question's author may not tag it.
- `audit/runs/packet-12.1/tagging-diff.md` — the method, its output shape, and its honest limits.
- `audit/scripts/tag-lexical.mjs` header — pass 2's rule, fixed before any output was read.
- `audit/scripts/tag-merge.mjs` — how the two passes are merged and what gets written.
- `scripts/backfill-item-id.mjs` — packet 2's precedent for exactly this shape: nullable column,
  backfill, constrain. Follow it rather than inventing a second pattern.

## The state this packet starts from, measured

| fact | value |
|---|---|
| `section_practice` rows, **live bank** (t=0 dump) | **215** |
| sections | **43**, exactly **5** live rows each — uniform |
| `section_practice` rows, **staged bank** | **more, and uncounted — see below** |
| rows with agreed tags today | **14** (Market Failure: 4 live + 10 staged) |
| rows attempted and left deliberately untagged | **2** (one per bank, no agreed tag) |
| sections reading 0.0% | **13** — 11 Business, 2 Economics |
| `spec_items` column | added by the founder, 22 September |

**215 IS THE LIVE BANK ONLY, AND THE REAL TOTAL IS LARGER.** Market Failure's staged rebuild carries
**11** practice rows against the live bank's 5 — evidenced by the artefact, which holds 10 tagged
staged rows plus 1 untagged. So "215 rows, 5 per section" describes `audit/content-sections/` and
nothing else. `audit/snapshots/` holds 218 files under several naming conventions and is not a
clean per-section staged bank, so **counting the staged side is the packet's first task, not an
assumption it may inherit.** Size the work only after that count exists.

The 13 zeros are not 13 defects. Every section carries 5 untagged practice rows, so a section with
no model answers examines nothing and reads 0.0% **honestly**. That is why E025 was retitled to the
`zerocov` wording rather than satisfied by tagging those 65 rows: tagging 65 of 215 because they
are the ones that trip a check would leave the other 30 sections counting a different bank, and the
percentage would mean different things in different rows. Tag all of them or none.

## Rule 1 — check the claim before acting on it

Three claims in this spec are the author's and may be wrong. Verify each against the tree before
building on it, and record the verdict:

1. **"215 rows, 5 per section."** TRUE OF THE LIVE BANK ONLY, and the author checked this one:
   Market Failure's staged bank has 11 practice rows, not 5. Count the staged side across all 43
   sections before sizing anything. Treating 215 as the total will under-size this packet.
2. **"14 rows already tagged."** From `audit/runs/packet-12.1/section_practice-tags.json` — 4 live
   and 10 staged, plus 2 rows attempted and left untagged because neither pass agreed. The author's
   first draft of this spec said 12 and was wrong; re-derive it rather than quoting this line.
   Packet 12.4 added five more tags to the *model-answer* bank, not to practice rows.
3. **"The column now exists."** The guard cannot see it (below). Confirm with
   `information_schema` before writing a single row. If the column is absent, this packet stops
   and says so; it does not create it — there is no DDL path from code in this project.

## A defect to fix in passing, because this packet is the one that makes it false

`audit/scripts/spec-coverage-check.mjs:258` prints "section_practice has no `spec_items` column:
scripts/packet-12-1-spec-items.sql is written and NOT run" behind `if (!staged.columnPresent)`.
That reads as a condition but **`columnPresent` is hardcoded `false` in both return paths of
`stagedTags()`** (:139 and :142), so it can never be true and the note will keep asserting the SQL
was never run, forever, including now that it has been. It is the same class as the acceptance line
that had no assertion behind it. Make `columnPresent` a real fact, and when it is true, read tags
from the column and stop reading the file.

## Method — unchanged, because its value is that it was fixed in advance

**Pass 1:** a reader takes each question's TEXT ONLY against its topic's rows of
`audit/raw/spec-items.json`, and records `pass1-tags.json` **before pass 2 runs**.

**Pass 2:** `node audit/scripts/tag-lexical.mjs <topic>`, blind to pass 1. **Do not tune its rule.**
Its header says the rule was fixed before any output was looked at; a rule adjusted to raise
agreement is a rule that certifies nothing, and the whole coverage number rests on that.

**Only agreed tags are written.** A tag one pass made alone is a review line, not a tag.

**Where the passes structurally cannot agree, go sideways, not to a third lexical pass.** Packet
12.4's case: in a subtopic about economies of scale, the stems *economy* and *scale* are not
distinctive, and the target leaves ("communication problems", "X-inefficiency") share no word with
the question — so the matcher could not have agreed whatever the truth was. The answer there was a
**blind fourth reader with negative controls** (5 of 5 confirmed, 0 of 4 on the controls). Reach for
that whenever the disagreement is structural rather than substantive, and say which it was.

## EXPECT MOST ROWS TO END UP WITH FEW TAGS, AND DO NOT TREAT THAT AS FAILURE

Market Failure is the calibration: 51 tags proposed by pass 1, 78 by pass 2, **31 agreed**, and of
its 19 questions **several ended with no agreed tag at all** and were left untagged. It examined 19
of 35 leaves — 54.3%. A packet that comes back with every row tagged and coverage near 100% has
almost certainly tuned something. **The unexamined leaf is a finding, not a gap to be closed.**

## The write

Follow `scripts/backfill-item-id.mjs`. Non-negotiable in the write:

- **`NULL` and `[]` must stay distinguishable.** `NULL` = not tagged yet; `[]` = tagged, examines
  nothing, which the guard reports as a failure. The SQL's own comment says the coverage number is
  worthless if these blur — an untagged bank would read as a clean one. **Write `NULL`, never `[]`,
  for a row with no agreed tag.**
- **Match rows by `item_id`**, not by array position and not by question text. Packet 2 minted item
  ids for exactly this reason, and the artefact's `byQuestion` map keys on question text, which is
  a matching key of last resort.
- **Dry-run first**, printing every intended write, and diff that against the artefact for the 14
  rows already agreed. If the script and the artefact disagree about Market Failure, the script is
  wrong — that section has been through the method twice already.
- **Both banks.** `section_practice.live` (the t=0 dump) and `section_practice.staged` (the
  rebuilds) are different rows. Say which was written.
- **After the backfill:** `alter table public.section_practice validate constraint
  section_practice_kind_check;` — the SQL added it `NOT VALID` on purpose. That is a founder step
  in the Supabase editor, not a code step.

## Acceptance checks — mint one ledger id per check

Write these as `add`ed feature ids on packet 12.5, then `claim` them and let a verifier confirm.

1. `information_schema` reports `spec_items` and `kind` on `public.section_practice`, both nullable.
2. Every `section_practice` row IN BOTH BANKS is either tagged with agreed ids **or** appears on the
   review list with its pass-1-only and pass-2-only sets — no row is silently skipped. The count of
   rows considered is stated and matches the staged census this packet takes first.
3. No written id is outside `audit/raw/spec-items.json`; no written value is `[]`.
4. `spec-coverage` reads tags from the column, not from
   `audit/runs/packet-12.1/section_practice-tags.json`, and that file is deleted in the same commit.
5. `columnPresent` reflects the database rather than a literal, and the header note disappears when
   the column is present.
6. A negative control: with the column present but a row's tags removed, that section's `examined`
   falls. Proves the page is reading the column and not a cache.
7. No student-visible change: neither column is read by any component, and a diff of the rendered
   topic page before and after is empty.

**No acceptance check may require a coverage percentage to RISE.** Whether the 13 zeros become
non-zero is an outcome of honest tagging, not a target — a check that demands the number move is an
instruction to tag until it does. That is the exact failure this packet exists to avoid repeating.

## Non-goals

- **Do not run DDL from code.** The column exists; if something else is missing, hand the SQL over.
- **Do not tag the model-answer bank.** It has its own path through `modelAnswersData.js`.
- **Do not rewrite `audit/NEXT.md` wholesale.** Several sessions hold it open; edit by anchor line,
  and link this file rather than pasting it in.
- **Do not touch the 123 `tariff` failures.** That is V024, the UK GCE ladder in
  `PracticeQuestionsTab`, and it is a different packet.

## Sizing

43 topics × 2 passes, plus a blind reader wherever the disagreement is structural. Sections are
independent — no cross-section dependency — so this fans out cleanly one topic per worker. Market
Failure's 19 questions were a meaningful share of packet 12.1, so expect **three or four packets
sequentially, or one orchestrated run** across the harness. Batch by topic, never by row.

**Size it after the staged count, not before.** 215 is a floor: if the staged bank runs at Market
Failure's ratio the true figure is nearer double, and a packet that plans against 215 and then meets
430 will be tempted to rush the second half — which in a tagging packet means agreeing more
readily, which is the one failure that cannot be detected downstream.
