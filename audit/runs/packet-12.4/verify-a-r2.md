# Packet 12.4 — Verify A, round 2

Re-run after the founder widened the packet: E029 moved in from 12.5, E031 was minted into 12.4.
E026 and E027 were re-judged from scratch because their round-1 evidence was live-curl output from a
component that had since been edited, and that evidence was dead.

| id | verdict | evidence |
|---|---|---|
| E023 | **CONFIRMED** (re-checked) | 46 Economics items recomputed: 45 carry non-empty `specItems`, 1 absent, 0 empty arrays, 0 ids outside the oracle. Full diff scan of both data files: every added or removed line is `specItems:`, `sectionNumber:`, `sectionTitle:` or a comment — zero content-field lines touched across all 66 items |
| E024 | **ACCEPTED** (round-1 evidence stands) | Supplementary check that `rehome/pass2-input-3.3.2.json` uses the identical restricted schema for the two re-homed items |
| E025 | **REJECTED** (again) | `types-sizes-businesses econ 5 5 0 30 0.0%` — an Economics section with 5 questions still at 0.0%. **The cause differs from round 1**: round 1's was two items tagged into a section they do not examine (now fixed); round 2's is that 3.3.1's remaining questions are all `section_practice`, which this packet's scope excludes, so the section cannot clear zero however bank 1 is fixed. The id-validity half holds |
| E026 | **CONFIRMED** (re-derived) | Replicated `writtenFor`/`coverageFor` and curled six live pages: 18.5%, 57.1%, 20.6%, 13.6%, 47.8%, 5.6% — all exact. Floor caveat present only where `untagged > 0` |
| E027 | **CONFIRMED** (re-derived) | Live curl: title and `<h1>` both "Model Answers In Progress"; the dead text is a real `<Link href="/business">`, independently curled 200 |
| E028 | **CONFIRMED** | `topsOutInModelAnswersOwnBand` is the sole choke point via `highestTariffItem`. Panel presence recomputed for all 31 pages from real data; live-curled one suppressed page and one kept page, both matching. 17/17 unit tests |
| E029 | **CONFIRMED** (new) | Against the oracle: 3.3.1 has 0 "scale" leaves of 30, 3.3.2 has them of 34. Both items re-homed with content fields byte-identical, tagged via genuine 2-of-3 agreement plus the blind 4-control adjudication (5/5 against 0/4). The sweep asserting no cross-topic tag anywhere in the real bank passes |
| E031 | **CONFIRMED** (new) | A `coverage.questions === 0` branch; both zero-question pages live-curled and both now serve "No questions on this page yet…" with no percentage |

**Unclaimed but relevant:** none. E030 (4.3.5) is correctly left on 12.5 — it has no model-answer
page and this diff does not touch it.

**Gates re-run fresh by the verifier:** `npm test` 277/277 · `build` 0 · `recalls` 0 · `exposure` 0 ·
`validate` 0 (no new BLOCK; DEBT findings are pre-existing content debt outside this nine-file diff).

**Verifier's gate verdict:** should not pass. `unverified 12.4` exits non-zero on E025, and per
PROTOCOL this is a scope or wording decision for the founder, not something a fix round can close.

## The builder's response

Agreed, and the verifier reached round 2's cause independently of the builder's own write-up — the
two analyses match: a section reads non-zero only when a tagged model answer lifts it off the floor,
and 3.3.1 no longer has one. That is the second independent derivation of the same conclusion and it
is why the correction in `NEXT.md` is stated as strongly as it is: **the end state put to the founder
for round 2, "E025 passes as literally written", was wrong when it was written.**

The gate stays blocked. The choice is unchanged and now cleaner: narrow E025 to sections whose model
answers examine their own specification, and both remaining zeros fall outside it as sections with no
model answers — an exclusion, not a weakening. Or tag the ten `section_practice` rows for 3.3.1 and
4.3.5, which means extending packet 12.1's artefact and taking scope this packet was told not to.
