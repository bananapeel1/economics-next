# The packet session prompt

Paste this when starting a new session for a packet, replacing `<N>` (and the one-line goal if the packet is
not in `NEXT.md` yet). It is deliberately short: it does not restate `PROTOCOL.md`, it forces the session to
read it. Every numbered rule below is here because its absence cost this programme a day; the ledger of which
day is at the bottom.

---

```
You are running packet <N> of the Revvy Learn remediation, alone, in this session. Work only in
/Users/arongijsel/Claude APP/economics-next-remediation, branch remediation/2026-09. One packet, this session,
start to finish.

Before you touch anything, read in this order, then tell me in five lines what you understood and what you are
about to do: audit/PROTOCOL.md; this packet's spec block and the newest "Handoff — what comes next" in
audit/NEXT.md; the packet's row in audit/PROGRESS.md; the Settled list in audit/DECISIONS.md; and, for a
content packet, audit/CONTENT-GATE.md including the recall contract. Then run
`node audit/scripts/ledger.mjs packet <N>` and quote the ids you are accountable for. If any of those
contradict each other or this prompt, stop and ask me — do not pick one.

Six rules. Each one is here because breaking it has already cost a day:

1. An audit item is a claim, not an instruction. Check every item's scope against the specification in
   audit/raw/ before acting on it. Four items once told a packet to delete a topic the specification requires.
2. Nothing that talks to Supabase may run during `next build`, and only the anon client may run at build time.
   A green local build is not evidence that the Vercel preview builds — check the deployment itself.
3. Content can crash production without a deploy. Before any publish, confirm that the components on
   origin/main can read every field your content carries. Matching type names is not the test; fields are.
   Until packets 5 and 7 are merged and deployed, nothing authored to the recall contract may be published.
4. Fix the field you were shown, then read every other field of the same entry and its notes twin. A rule
   written for prose will not match a flow step, a takeaway or a flashcard, so a substitution pass is no
   evidence about those.
5. Another session may be working in this same worktree. Stage files explicitly, never `git add -A`, never
   touch audit/EXAM-PRACTICE.md, and never commit audit/ledger.json while a verifier is running.
6. You may not publish, restore, or otherwise write live content without asking me in this session first. If
   the permission layer refuses an action, stop and hand me the exact command; do not work around it.

How to finish, and what I will judge:

- The gate: `npm test`, `npm run build` and `npm run validate` all exit 0. After any content publish, run
  `node audit/scripts/validate-content.mjs --baseline` WITHOUT --confirm and read every key it wants to add: a
  re-key of the same rule on the same item is expected, anything else is debt you just wrote — fix it instead.
- Verify A: spawn a fresh read-only verifier that has not seen this conversation. Give it the packet number,
  the commit range and the instruction to run the ledger itself. Do not tell it what you believe you did, and
  do not let it write anything but audit/ledger.json. Expect rejections: every rejection this programme has
  produced was correct. Fix, re-verify, repeat until `node audit/scripts/ledger.mjs unverified <N>` is clear.
- Verify B, wherever a student can see the change: 390x844, storage cleared, walking the real flow with real
  input — including scrolling, if you changed anything that renders. Write the script about what the student
  ends up with, never about how a widget behaves.
- Handoff: update PROGRESS, NEXT and DECISIONS, commit with the `packet-<N>:` prefix, push.

Work autonomously to that end. Ask me only for what I alone can do: a publish, a restore, a merge, or a
decision that changes the packet's scope. Before you tell me it is done, run `unverified <N>` and paste the
output. End by telling me plainly what you could not verify.
```

---

## Why each rule is in there

| Rule | What it cost |
|---|---|
| 1. Audit items are claims | Packet 14 was told four times to delete contribution, which is sub-topic 5 of its own topic in the IAL specification. Break-even and sensitivity analysis were the genuinely off-spec parts. |
| 2. Build-time Supabase | Packet 5's depth route prerendered and read with the service-role key, which is Production-only. Every Vercel preview failed for a day while `npm run build` passed locally, because `.env.local` has every key. |
| 3. Fields, not type names | Packet 15 published three reorder recalls written to the packet-7 contract, which drops `shuffled`. Main's `ReorderRecall` reads it in its first line, so the most-opened section on the site died with "This page couldn't load". The rule written after packet 14's revert had said reorder was the safe type. |
| 4. Read the field beside it | Packet 13 needed four verification rounds. Three times a fix landed on the cited fields and left the same defect in a flow step, a misconception, a takeaway and a flashcard. |
| 5. Shared worktree | Two sessions have raced on `audit/ledger.json`; a confirm went missing once and had to be re-recorded. |
| 6. Ask before live writes | The permission layer refuses restores outright, and refused the packet 13 publish until the founder asked for it in session. Working around it is not available; handing over the command is. |

## What a prompt cannot do

Three of the defects this programme has shipped were invisible to every instruction above and were caught by
someone using the product: the scroll that jumped back up, the crash on publish, and the resume pointer that
read "step 20 of 9". The prompt's last line exists for that reason — a session that names what it could not
verify is worth more than one that claims everything passed. Open the thing on a phone yourself when a packet
touches what a student sees.
