# Packet 12.4 — Verify A, round 3 (E032 only)

E025 was marked wont-fix and replaced by E032, so one id needed judging. The verifier was briefed to
decide specifically whether E032 is a real check or a tautology, and to establish the HEAD
dependency itself rather than take it from a summary.

**E032 CONFIRMED.**

- `audit/scripts/spec-coverage-check.mjs:214-221` fires `zerocov` exactly once on the fixture, with
  `examined = 0`, and `--json` shows no other rule firing.
- The fixture's four `specItems` were checked against `audit/raw/spec-items.json`: all four are real
  leaves of 1.3.2, none belongs to the fixture's declared section 1.3.5.
- The other four fixtures each fire only their own rule and never `zerocov`.
- **Not a tautology, and the verifier established this rather than accepting it**: on a full live run
  all 13 sections reading 0.0% — 11 Business, 2 Economics — were independently counted against
  `data/modelAnswersData.js` and genuinely have zero model answers each, so the rule's silence there
  is correct rather than excluded by construction.
- **The dependency is real and intended**: `git show HEAD:lib/spec-coverage.js:217` confirms that at
  HEAD the fixture's cross-topic-but-real ids would count as examined and the rule would not fire.
  Both files are staged in the same index and both comments describe one coordinated change.
- `npm test` 279/279.

**Ledger gate:** `node audit/scripts/ledger.mjs unverified 12.4` → "gate clear: every claimed item is
confirmed and no scope is left unclaimed", exit 0.

The verifier noted it did not re-run `build`, `validate`, `recalls` or `exposure`, being outside a
single-id judgement. Those were re-run by the main session afterwards and all exit 0.
