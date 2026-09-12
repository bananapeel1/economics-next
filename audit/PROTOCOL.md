# Packet protocol — how every remediation session runs

Read this after `PROGRESS.md`, `DECISIONS.md` and `NEXT.md`. It is the fourth handoff file. It does not change
between packets; if it needs to, change it in its own commit and say why in `DECISIONS.md`.

## Invariants

- **Work happens in the remediation worktree**: `/Users/arongijsel/Claude APP/economics-next-remediation`, branch
  `remediation/2026-09`. The sibling folder `economics-next` is the SEO/marketing tree on another branch. Never
  do packet work there, and never run `git checkout` of another branch inside either tree.
- **Dev server for verification**: launch config `remediation-dev`, port 3001 (the SEO tree owns 3000).
- **One packet per session.** Finish the lifecycle below, then clear context. Do not start the next packet in
  the same session even if there is budget left; the handoff is the product.
- **The ledger is the definition of coverage.** `audit/ledger.json` holds every audit item with a stable id
  (`F001`–`F117` code findings, `C-<section>-<kind>-<nn>` content items). A finding is closed when a verifier
  confirms it, not when the builder says so. Use `node audit/scripts/ledger.mjs` to change it; never hand-edit.
- **Content writes are snapshot first.** `audit/scripts/snapshot-touched-sections.mjs` before any DB write;
  `audit/content-sections/` is the t=0 restore point. Until packet 2 lands, in-place edits only (see DECISIONS).

## The lifecycle

### 1. Brief (main session, ~5 minutes)

1. Read `PROGRESS.md`, `DECISIONS.md`, `NEXT.md`, then `node audit/scripts/ledger.mjs packet <n> --open`.
2. Read only the audit slices the packet needs (the `NEXT.md` brief names them). Do not read `audit/raw/` wholesale.
3. Write the packet spec at the top of `NEXT.md` under a `## Packet <n> spec` heading: the ledger ids it will
   close, any ids it deliberately leaves for a later packet (with the packet number), and the acceptance checks
   a verifier can run without the conversation. For packets that touch the student-facing step, the acceptance
   check is a 390px walkthrough script (which section, which steps, what must be visible).

### 2. Build

- Snapshot first if content is touched. Then implement. Prefer the main session for packets 2–5 (they need
  judgment across many files); a single implementer agent is fine for narrow packets (6, 9, 10, 11).
- `npm run build` must pass before anything is claimed. There are no tests in this repo; the build is the floor.
- Claim: `node audit/scripts/ledger.mjs claim <n> F0xx F0yy C-...`. Claim only what was actually changed.

### 3. Verify A — finding check (agent `packet-verifier`, read-only, fresh context)

Spawn with the Agent tool, `subagent_type: packet-verifier`. Give it three things and nothing else: the packet
number, the commit range or `git diff` to inspect, and the instruction to run `ledger.mjs packet <n>` itself.
It confirms or rejects each claimed id with `file:line` evidence, using the CLI. It must not see this
conversation, and it must not be told what the builder believes it did.

### 4. Verify B — student walkthrough (agent `student-walkthrough`, or the main session if the agent cannot
reach the Browser pane)

Only for packets that change what a student sees (0, 5, 7, 10, 11, 12, every content packet). Start
`remediation-dev`, set the viewport to 390×844, and replay the acceptance script from the packet spec. Output
is what was seen, step by step, plus console errors. Anything the audit's walkthrough section complained about
that is still visible is a rejection.

### 5. Gate

All of these, in order, or the packet is not done:

1. `npm run build` green.
2. `node audit/scripts/ledger.mjs unverified <n>` exits 0 (every claimed id confirmed or marked wont-fix with a note).
3. Verify B report attached to `NEXT.md` under the packet spec (a few lines is enough), when it applied.
4. Validator green on all 43 sections (from packet 3 onward).
5. `PROGRESS.md` row updated: status, commit, snapshot path, validator result.
6. Commit with `packet-<n>:` at the start of the subject. Then `git push -u origin remediation/2026-09`.

### 6. Handoff

Rewrite `NEXT.md` for the next packet only: what to read, what to do, exit criteria, and anything this packet
discovered that the next one must know. Append irreversible choices to `DECISIONS.md`. Clear context.

## Canonical IAL paper structures

Verified against `audit/raw/econ_spec.txt` and `audit/raw/bus_spec.txt`. Never restate these from memory or
from a summary; a wrong version of this table was propagated to 52 agents on 12 September.

| Paper | Structure |
|---|---|
| Economics Unit 1 (WEC11) and Unit 2 (WEC12), identical | A six multiple choice (6) · B five short answers (20) · C five-part data question (34) · D one 20-mark essay from a choice of two (20) |
| Economics Unit 3 (WEC13) and Unit 4 (WEC14), identical | A six multiple choice (6) · B five-part data question (34) · C two 20-mark essays from a choice of three (40) |
| Business Units 1 and 2 | A source-based short and extended response (30) · B same format, different sources (30) · C one 20-mark essay from sources (20) |
| Business Units 3 and 4 | A short and extended response from sources (40) · B one 20-mark essay (20) · C one 20-mark essay (20) |

## Shipping

A packet that is committed is not shipped. Students see `main`, which Vercel deploys. Ship checkpoints:

- after packet 1 (this is the Day 0 hotfix plus honest measurement; it is overdue),
- after packet 5 (the step-0 change; start the two-week clean-baseline clock here),
- after packet 13,
- after every five content packets.

Shipping is a PR from `remediation/2026-09` into `main`, merged by the founder. Rebase on `main` first if the
SEO branch has merged in between. Do not merge from a session; open the PR and stop.

## Agents and models

**The rule:** the strongest model goes where a mistake propagates silently and no verifier can catch it.
The next tier goes where the build, the ledger or a verifier catches mistakes. Tier is chosen per packet,
never split mid-packet.

| Packet | Model | Why |
|---|---|---|
| **3** Validator v2 | **Fable 5.1** | A rule nobody thinks to write is invisible, is caught by nothing, and governs all 43 content packets. It now also absorbs the examiner's structural job |
| **5** Step 0 | **Fable 5.1** | Product design under interacting constraints: cognitive load, 390px, the measurement baseline, pedagogy. The largest single lever on churn |
| **7** Widget mechanics | **Fable 5.1** | Defines the exercise types 338 recalls get authored into. Wrong here means authoring them twice, as in March |
| **14** First content section | **Fable 5.1** | Sets the template for 42 more and, with no examiner, is where the quality bar is actually set |
| 2, 4, 6, 8, 9, 10, 11, 12, 13, 13.2-13.8 | Opus | Bounded and specified. The ledger says what must become true, a verifier cites the line, the build must pass |
| 15-56 content sections | Opus | Once packet 14's template is proven. Escalate a section to Fable only if its audit grade is D or it carries a rewrite |
| Verify A and Verify B | Sonnet | Mechanical: read the diff, check each id, cite a line |
| Mechanical sweeps, skeptic passes | Sonnet | Grep-shaped work and second opinions |

Honest caveat: this is reasoning about task shape, not a benchmark. On well-specified work inside this
harness the gap between tiers is narrower than the tier names suggest, which is the whole point of the
ledger and the verifier. Where the lower tier proves insufficient, the evidence will be a packet whose
verifier rejects it more than once; move that packet up a tier and record it in `DECISIONS.md`.

Token discipline: the main session reads reports, not files. Verifier reports are short by construction (one
line per id). If a packet needs more than one session, stop at a committed, verified sub-point and hand off; do
not stretch a session to finish. Anything expected to cost more than a few million subagent tokens is checked
with the founder first.

## Definition of done, restated

Build green · every claimed ledger id confirmed · walkthrough clean where applicable · validator green (packet 3+)
· PROGRESS row updated · committed with the packet id · pushed. Shipped at the next checkpoint.
