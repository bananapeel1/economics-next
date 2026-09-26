# The brain — running the remediation with a cheap orchestrator and expensive workers

Written 18 September 2026. Replaces hand-driving `audit/SESSION-PROMPT.md` for the 28 remaining content
packets. `SESSION-PROMPT.md` stays valid and is still the right thing to paste for a one-off or when the
brain escalates.

## The split, and why it is this way round

| | Model | Job |
|---|---|---|
| **Brain** | Fable 5.1 | Picks the packet, invokes the workflow, reads a verdict, decides ship / retry / escalate, keeps the books |
| **Author, Fix** | Opus | Writes the content and the code |
| **Verify A, Verify B** | Opus | Decides whether the work is real |
| **Brief, Handoff** | Sonnet | Reads the ledger and writes the work list; edits one table row and appends the handoff |
| **Gate** | Haiku | Runs four shell commands and reports exit codes |

The rule that makes this safe: **the brain is never the last line of quality defence.** It reads exit
codes and id counts. It does not judge content, and it cannot overrule a verifier. Verification is the
one place this programme has never economised, because every rejection a verifier has produced has been
correct, and Verify A/B stay on Opus for that reason alone.

The brain also never loads content into its own context. It reads a verdict of a few hundred tokens and
a path. That is the whole efficiency story; everything else is a rounding error next to it.

Two sentence rules every agent prompt carries, both learned from a Haiku agent writing a true sentence
with the wrong reach: **a brief contains no results** (packet 37, 19 Sep: the brief pre-wrote "Mobile
legibility confirmed at 390x844" having measured only the inline render, and the enlarge view, where the
defect was, had never been measured) and **no sentence may state a scope it did not measure** (packet 5,
21 Sep: the handoff authored a code fix outside the fix budget and wrote "fixed" before any verifier ran).
Both sentences were true of the thing done and false of the thing claimed, and both read as a yes to a
reader skimming for whether the check happened. Brief and Handoff moved to Sonnet on 21 Sep for the same
reason; Haiku now runs only the Gate, whose output is exit codes. A fix that lands after the loop is
verified with `.claude/workflows/packet-verify.js`, never by resuming `packet-run.js`, whose Verify B
prompt is round-invariant and replays the stale walkthrough from cache.

## Per-packet loop

```
Workflow({ scriptPath: '/Users/arongijsel/Claude APP/economics-next-remediation/.claude/workflows/packet-run.js',
           args: { packet: 32, goal: '<one line>', section: 'economics__market-failure', studentVisible: true } })
```

**Always `scriptPath`, never `name`.** `Workflow({name: 'packet-run'})` resolves the file once and caches
it for the session; edits to the script are not picked up. Packet 37 ran a stale copy that way and lost
its cached phases to a bug already fixed in the source. When resuming a run after editing the source,
`cp` the source over the persisted run script the resume message names, then resume.

**Before claiming a packet, check it is actually free.** `PROGRESS.md` lags reality: on 18 September
packets 32-35 were all live in other sessions while their rows still read "not started". The test is
`git status --short | grep packet-<n>` (artefacts on disk) and `node audit/scripts/ledger.mjs packet <n>
--open`, not the PROGRESS row.

The workflow runs Brief → Author → Gate → Verify A → (Fix → Verify A)* → Verify B → Handoff. **PASSED requires `ledger.mjs packet <n> --open` to be empty**, not only
`unverified` to be clear: on 26 Sep packet 12.75 returned PASSED with E053 open and unclaimed, which
`unverified` (claimed-but-unconfirmed only) cannot see. `ledger.confirmed` is the packet total. It returns:

```
{ verdict, gate:{test,build,validate}, ledger:{confirmed,rejected,unverifiedRemaining},
  fixRoundsUsed, walkthrough, escalate:[], artefacts, nextAction }
```

When `packet-run` returns NOT PASSED on a walkthrough defect and the founder has ruled on it, do not
re-run the whole packet. Use the closer:

```
Workflow({ scriptPath: '/Users/arongijsel/Claude APP/economics-next-remediation/.claude/workflows/packet-close.js',
           args: { packet: 37, section: 'economics__national-income',
                   fix: '<the one packet-specific defect the founder kept in scope>',
                   filedAs: '<ledger id of anything ruled programme-wide>',
                   decision: '<the founder decision, verbatim>' } })
```

It runs one targeted Opus fix at the packet's source of truth, one targeted 390x844 re-walk that
measures rather than eyeballs, then corrects the PROGRESS row and appends the handoff. Three agents,
not seven.

The brain then does exactly one of three things:

- **PASSED, escalate empty** → tell the founder, name the artefacts directory, propose the next packet.
  Do not commit. The founder commits.
- **NOT PASSED, fix rounds left** → re-invoke with `resumeFromRunId` so Author does not re-run.
- **Anything on the escalate list, or two fix rounds spent** → stop and hand it to the founder with the
  exact question.

## Hard stops — the brain may never decide these alone

1. **Publishing, restoring, or any live content write.** Rule 6. Hand over the exact command.
2. **Two handoff documents that disagree**, or a ledger item that contradicts the specification. Rule 1
   exists because four audit items once told a packet to delete a topic the spec requires.
3. **A verifier rejection that survives two fix rounds.** That is a scope or a spec problem, not a bug.
4. **A gate failure it cannot attribute to this packet's own diff.**
5. **A refused permission.** Never route around it, never ask another session to do it. Surface it.
6. **Any change to scope, ordering, or what "done" means.** Those are in `audit/DECISIONS.md` and they
   are the founder's.

## Token discipline, in priority order

1. **Artefacts, not payloads.** Agents write to `audit/runs/packet-<n>/` and return a short verdict. A
   design workflow in an earlier session returned 291KB of JSON into a conversation; that one mistake
   cost more than the run that produced it.
2. **Model tiering.** Reading a ledger and running four npm scripts is not Opus work. Authoring and
   verification are.
3. **Grep before read.** Locate, then read line ranges. Never `cat` a content JSON.
4. **Resume over restart.** A failed Verify A costs one agent, not a whole packet, via
   `resumeFromRunId`.
5. **The brain never reads `audit/runs/**`** unless the founder asks a question that needs it.

## Starting a brain session

Switch the model to Fable 5.1 in the model menu first — a session cannot re-price its own turns, so this
cannot be done from inside the conversation. Then:

```
You are the brain for the Revvy Learn remediation. Read audit/BRAIN.md and follow it.
Working directory: /Users/arongijsel/Claude APP/economics-next-remediation, branch remediation/2026-09.

Do not author content, do not verify content, and do not commit. You invoke the `packet-run` workflow,
read its verdict, and either report a pass, spend a fix round, or escalate to me.

Start by reading audit/PROGRESS.md and audit/NEXT.md, then tell me in five lines: which packet is next,
what it must close, whether anything in the handoff documents contradicts anything else, and what you
are about to invoke. Wait for my go before the first invocation.
```

## What this does not fix

It does not make the content better; it makes the loop cheaper and the bookkeeping honest. The quality
still comes from `audit/CONTENT-GATE.md` and from the verifiers. If the gate is wrong, this runs a wrong
gate 28 times faster, so a brain that reports three clean packets in a row is a reason to hand-audit the
fourth, not a reason to relax.

It also does not remove the founder from the loop by design. Every packet still ends with a human
committing, and the escalation list above is deliberately generous.
