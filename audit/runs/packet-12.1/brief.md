# Packet 12.1 — Exam-practice item contract and the coverage guard

**Goal:** Make "a student is examined on every spec requirement" a number the build can report, and stop the two question banks rehearsing tariffs that do not exist.

**Scope:** Code-only except one section of data. No content publish. No DB write. Closes **E001–E008**.

**Leaves examined denominator:** 1,165 `kind: 'leaf'` rows from `audit/raw/spec-items.json`.

---

## Items in scope

| id | Title | What must become true | Spec reference | Done means |
|---|---|---|---|---|
| **E001** | Exam-practice item contract: specItems, kind, ao, stimulusRef on both banks; SQL written not run | Item shape in code: `specItems: string[]` (ids from `spec-items.json`), `kind: 'mcq'\|'written'\|'quant'\|'draw'`, `ao: string[]` (from `lib/ao-spec.js`), `stimulusRef: string\|null`. Applied to `modelAnswersData.js` as optional fields (22 live pages ignore them). For `section_practice`, SQL adds columns `spec_items jsonb` and `kind text` — script written but not executed; guard tolerates column absence and reports it. | `audit/NEXT.md:33-40` (contract definition); `data/modelAnswersData.js` (model answers shape); `lib/ao-spec.js` (AO source); `audit/raw/spec-items.json` (spec ids source) | `npm run build` green; `data/modelAnswersData.js` carries optional `specItems`, `kind`, `ao`, `stimulusRef` fields; `scripts/packet-12-1-spec-items.sql` written (no execute) |
| **E002** | npm run spec-coverage: leaves examined / 1,165 per section and unit; fails on bad tariff, unknown spec id, no evaluative question | Script `audit/scripts/spec-coverage-check.mjs` exists and runs. Reads both banks read-only. Reports per section and per unit: leaves examined / 1,165 as %; every unexamined leaf id; command-word distribution. Exits non-zero on: (command, marks) pair absent from `lib/ial-marking.js`; specItems id not in `spec-items.json`; section with ≥1 question and no evaluative question (Evaluate 20, or Economics Discuss 14). Flags `--section <id>` and `--baseline` options mirror `validate-content.mjs`. | `audit/NEXT.md:48-54` (spec-coverage requirements); `lib/ial-marking.js` (tariff source of truth); `audit/raw/spec-items.json` (leaf ids) | `npm run spec-coverage` exits 0 and prints 43 section rows with % each; summary line names leaf count as 1,165; `npm run spec-coverage -- --section market-failure` works |
| **E003** | Three spec-coverage failure fixtures under npm test, plus one clean fixture that passes | Three fixtures in `audit/fixtures/spec-coverage/` that trigger the three guard failure modes: invented specItems id; Analyse 8 (invalid); section with only Explain 4 (no evaluative question). One fixture that passes. Each tested in `npm test`. | `audit/NEXT.md:59-61` (fixture requirement); `audit/CONTENT-GATE.md` (test discipline) | `npm test` green; three failing fixtures in `audit/fixtures/spec-coverage/` with test cases; one clean fixture in same location |
| **E004** | The 30 Analyse-8 model answers become Examine 8 (Econ) / Discuss 8 (Bus) with levels-grid mark schemes | All 30 model answers in `data/modelAnswersData.js` carrying `commandWord:'Analyse'` and `marks: 8` are rewritten: `commandWord` → `'Examine'` (Economics, 21 items) or `'Discuss'` (Business, 9 items); `marks` → `8`; `markScheme` rewritten as levels grid for that command using `audit/raw/tariff-census.json` verbatim description; question stem's first word updated to match command. | `audit/raw/tariff-census.json` (levels grid source); `lib/ial-marking.js` (tariffs: Economics Examine 8, Business Discuss 8) | `node -e "…"` counting `commandWord:'Analyse'` with `marks: 8` across both data files prints 0; every rewritten item's markScheme is a levels grid from tariff-census.json for its command word |
| **E005** | All 20 Business model answers carry an IAL sectionNumber 1.3.1-2.3.5 chosen by wording match, with specSource lines | All 20 Business model answers in `data/modelAnswersData.js` carry valid IAL `sectionNumber` matching `/^[1-4]\.3\.[1-6]$/`, chosen by matching the question's wording to `audit/raw/bus_spec.txt`. Each recorded as `specSource: 'bus_spec.txt:<lines>'` (no arithmetic on old UK GCE numbers). | `audit/raw/bus_spec.txt` (IAL Business spec, source of sectionNumber truth); `audit/NEXT.md:65-70` (E005 requirement) | Every Business model answer's `sectionNumber` matches `/^[1-4]\.3\.[1-6]$/`; every `specSource` field cites bus_spec.txt line range matching the question wording |
| **E006** | MARK_FILTERS/MARK_COLORS derive from ial-marking per subject; ial-commands collapsed onto ial-marking | `lib/ial-marking.js` is tariff source of truth (packet 9). `lib/ial-commands.js` restates the same table; collapse it: `ial-commands` exports only visibility helpers, imports tariff table from `ial-marking`. `MARK_FILTERS` and `MARK_COLORS` in `components/PracticeQuestionsTab.jsx` derive from `lib/ial-marking.js` per subject (Economics: 2/4/6/8/14/20; Business: 2/4/6/8/10/12/20). Every hardcoded tariff removed. | `lib/ial-marking.js` (tariff table); `lib/ial-commands.js` (to be collapsed); `components/PracticeQuestionsTab.jsx` (MARK_FILTERS/MARK_COLORS); `audit/DECISIONS.md:settled` (IAL tariffs canonical per subject) | `grep -rn "Analyse" lib components app --include=*.js --include=*.jsx --include=*.mjs \| grep -E "\[?[0-9]"` returns only `lib/ial-marking.js` and `audit/raw/*`; MARK_FILTERS/MARK_COLORS match subject tariffs from ial-marking.js |
| **E007** | Market Failure (Economics 1.3.5) tagged in both banks by two-pass method; diff saved; guard reports a real % | Market Failure fully tagged in **both** `modelAnswersData.js` and `section_practice` by two-pass independent tagging: Pass 1 tags; Pass 2 (separate agent given only question text and 1.3.5 oracle rows, never pass 1's tags) tags independently; only agreed tags written. Diff saved to `audit/runs/packet-12.1/tagging-diff.md`. `npm run spec-coverage -- --section market-failure` reports a real % and names unexamined leaves. | `audit/raw/spec-items.json` (oracle: BUS-4.3.5 / ECON-1.3.5 rows); `audit/NEXT.md:71-76` (two-pass tagging method); `lib/ial-marking.js` (tariffs) | `npm run spec-coverage -- --section market-failure` exits 0 and prints % strictly between 0 and 100; lists at least one unexamined leaf id in `ECON-1.3.5-*` form; `audit/runs/packet-12.1/tagging-diff.md` exists and shows pass 1 vs pass 2 agreement |
| **E008** | spec-overlap.mjs: shared spec-item ids between two sections; exit 0 disjoint, 1 otherwise | Script `audit/scripts/spec-overlap.mjs <sectionA> <sectionB>` prints shared `spec_items` ids between two sections' topics (via spec-coverage.json keys → topic), exits 0 when disjoint, 1 when not. Verified on `globalisation` vs `causes-effects-globalisation` (must be non-disjoint — packet 33 brief shows why) and on `market-failure` vs `national-income` (disjoint). | `audit/raw/spec-items.json` (topic mapping); `audit/NEXT.md:77-79` (spec-overlap requirement); packet 33 brief (globalisation spec overlap context) | `node audit/scripts/spec-overlap.mjs globalisation causes-effects-globalisation` exits 1 and prints shared ids; `… market-failure national-income` exits 0 |

---

## Verification points (from audit/NEXT.md)

1. `npm run spec-coverage` exits non-zero today; prints 43 section rows with % each; summary line names 1,165 leaves.
2. `npm test` includes three spec-coverage fixtures (fail) + one clean (pass), all green.
3. `node -e "…"` counting `commandWord:'Analyse'` with `marks: 8` across both data files prints **0**.
4. Every Business model answer's `sectionNumber` matches `/^[1-4]\.3\.[1-6]$/`.
5. `grep -rn "Analyse" lib components app --include=*.js --include=*.jsx --include=*.mjs | grep -E "\[?[0-9]"` returns only `lib/ial-marking.js` and `audit/raw/*`.
6. `npm run spec-coverage -- --section market-failure` prints % strictly between 0 and 100; lists at least one unexamined leaf id in `ECON-1.3.5-*` form.
7. `node audit/scripts/spec-overlap.mjs globalisation causes-effects-globalisation` exits 1; `… market-failure national-income` exits 0.
8. `npm run build` green; `npm run validate` unchanged from baseline (no content tables touched).

---

## No contradictions found

- **NEXT.md packet 12.1 spec:** All 8 items documented with acceptance criteria and verification steps.
- **Ledger (E001–E008):** All 8 items present and open, matching NEXT.md scope.
- **PROGRESS.md:** Packet 12 listed as "not started"; no prior packet 12.1 row (correct — this is the first session).
- **DECISIONS.md settled list:** No conflicts. Tariff canonicality (2026-09-11) supports E002/E004/E006.
- **CONTENT-GATE.md:** Relevant sections (Layer 1, recall contract) support E003 and E006's test discipline; no contradictions.
- **PROTOCOL.md:** Commit atomically; snapshot first (none needed here — no content tables); ledger is definition of coverage.

---

## Files this packet will create or modify

| File | Purpose | Status |
|---|---|---|
| `audit/scripts/spec-coverage-check.mjs` | Guard: leaves examined / 1,165 per section; fails on bad tariff/id/no-evaluative | **to be written** |
| `audit/scripts/spec-overlap.mjs` | Helper: shared spec-item ids between two sections | **to be written** |
| `audit/fixtures/spec-coverage/*.json` | 4 test fixtures (3 fail, 1 pass) | **to be written** |
| `lib/ial-marking.js` | Tariff source of truth; no changes if already complete from packet 9 | **verify packet 9 coverage** |
| `lib/ial-commands.js` | Collapse onto ial-marking.js exports | **to be refactored** |
| `data/modelAnswersData.js` | Add optional `specItems`, `kind`, `ao`, `stimulusRef` fields; rewrite 30 Analyse 8 → Examine/Discuss 8; add 20 Business sectionNumber + specSource | **to be modified** |
| `components/PracticeQuestionsTab.jsx` | MARK_FILTERS/MARK_COLORS derive from ial-marking.js per subject | **to be modified** |
| `scripts/packet-12-1-spec-items.sql` | Add `spec_items jsonb` and `kind text` to section_practice (not executed) | **to be written** |
| `audit/runs/packet-12.1/tagging-diff.md` | Two-pass tagging diff for Market Failure | **to be generated by agent** |
| `audit/runs/packet-12.1/brief.md` | This work list | **complete** |

---

## Notes for the implementer

- **Rule 4:** Fix the field you were shown, then read every other field of the same entry and its notes twin. When rewriting `Analyse 8` items in `modelAnswersData.js`, check every field: `commandWord`, `marks`, `markScheme`, `question` stem, and verify the item's companion fields (id, section, guidance, etc.) are untouched.

- **Rule 6 / No publish gate:** E007 may require writing sample tagging to `audit/runs/packet-12.1/section_practice-tags.json` and the SQL to `scripts/packet-12-1-spec-items.sql` if the Database state cannot be expressed without a write. Stop and report this case.

- **Verify independently:** The spec-coverage guard is built from two data sources; verify its coverage count using a separate method (e.g., direct iteration over spec-items.json leaves and matching against sections via a different path).

- **Token discipline:** Read `lib/ial-marking.js` and `lib/ial-commands.js` once to understand the tariff structure; grep for hardcoded tariffs instead of reading prose. Use `grep -n "MARK_FILTERS\|MARK_COLORS" components/PracticeQuestionsTab.jsx` to find exactly what needs to be replaced.

